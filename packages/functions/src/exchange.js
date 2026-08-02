import { EXCHANGE_SCHEMA, exchangeInstructions, exchangeInput } from './lib/exchange.js'
import { LlmError, MODELS, EFFORT, grade as callModel } from './lib/llm.js'
import {
  LIMITS,
  checkGlobalCeiling,
  checkSessionCap,
  resolveApiKey,
  userClient
} from './lib/budget.js'

/**
 * POST /.netlify/functions/exchange
 *
 * Generates one board exchange: a short conversation between directors that
 * lands on a single answerable question, built from a corpus card and the
 * company's board pack.
 *
 * SPEND IS BOUNDED HERE, and it was not before.
 *
 * Generation is the expensive call, roughly eight times the cost of grading an
 * answer. The first version of this function checked the hourly answer limiter,
 * which counts rows in `attempts` — a table only /grade writes. A caller who
 * generated exchanges and never submitted an answer incremented nothing and was
 * never metered. The global ceiling was not checked at all, and the pack came
 * from the client with no size limit, so the per-call cost was set by the caller.
 *
 * A meeting is now a row in `sessions`, which is what the two existing budget
 * controls have always counted and never saw. That gives a real ceiling:
 * sessions per player per week, multiplied by exchanges per session, with a
 * global daily ceiling behind both as the kill switch.
 *
 * The other rule this file keeps: never return a fabricated exchange. A board
 * quoting invented numbers would make the game actively misleading, which is
 * worse than a failed request.
 */

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(body)
})

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Use POST' })

  let payload
  try {
    payload = JSON.parse(event.body ?? '{}')
  } catch {
    return json(400, { error: 'Body was not valid JSON' })
  }

  const { card, pack, ask, sessionId } = payload
  if (!card?.slug || !card?.facets) return json(400, { error: 'A metric card is required' })
  if (!Array.isArray(pack) || pack.length === 0) {
    return json(400, { error: 'A board pack is required' })
  }

  // The pack goes straight into the prompt, so its size is its cost. Without
  // this the caller decides how much each request costs us.
  const packBytes = JSON.stringify(pack).length
  if (packBytes > LIMITS.packBytes) {
    return json(413, {
      error: 'pack_too_large',
      message: `That board pack is ${Math.round(packBytes / 1024)}KB. The limit is ${Math.round(LIMITS.packBytes / 1024)}KB.`
    })
  }

  const token = (event.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
  if (!token) return json(401, { error: 'Sign-in token required' })

  const supabase = userClient(token)
  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth?.user) return json(401, { error: 'Session is not valid' })

  const { apiKey, bringYourOwn } = resolveApiKey(event.headers)
  if (!apiKey) return json(503, { error: 'No provider key is configured' })

  // A player paying with their own key is not spending ours, so the caps do not
  // apply to them. Everyone else gets a session, and the session is the meter.
  let meeting = null
  if (!bringYourOwn) {
    if (sessionId) {
      // Row-level security scopes this to the caller, so another player's
      // session is invisible rather than merely forbidden.
      const { data: existing } = await supabase
        .from('sessions')
        .select('id, turn_count, ended_at')
        .eq('id', sessionId)
        .maybeSingle()

      if (!existing) return json(404, { error: 'That meeting does not exist' })
      if (existing.ended_at) return json(409, { error: 'That meeting has ended' })
      if (existing.turn_count >= LIMITS.exchangesPerSession) {
        return json(429, {
          error: 'meeting_over',
          message: 'That is the last exchange of the meeting.'
        })
      }
      meeting = existing
    } else {
      const ceiling = await checkGlobalCeiling()
      if (!ceiling.allowed) {
        return json(503, {
          error: 'ceiling_reached',
          message: ceiling.misconfigured
            ? 'Meetings are disabled until the service is configured.'
            : 'The board is done for today. Reference mode still works.'
        })
      }

      const cap = await checkSessionCap(supabase)
      if (!cap.allowed) {
        return json(429, {
          error: 'session_cap',
          message: `That is ${cap.used} meetings this week. Come back next week.`
        })
      }

      const { data: created, error: createError } = await supabase
        .from('sessions')
        .insert({ user_id: auth.user.id, scenario: 'board-meeting', cards: [card.slug] })
        .select('id, turn_count')
        .single()

      // If the meeting cannot be recorded then it cannot be metered, and an
      // unmeterable meeting is exactly what this function exists to prevent.
      if (createError || !created) {
        return json(503, { error: 'session_failed', message: 'Could not start the meeting.' })
      }
      meeting = created
    }
  }

  try {
    const exchange = await callModel({
      apiKey,
      model: MODELS.interrogate,
      effort: EFFORT.interrogate,
      instructions: exchangeInstructions(),
      input: exchangeInput({
        card,
        pack,
        ask: ask ?? 'More budget for acquisition next quarter.'
      }),
      schema: EXCHANGE_SCHEMA
    })

    // Counted after a real generation, never before, so a provider failure does
    // not consume a player's allowance.
    if (meeting) {
      await supabase
        .from('sessions')
        .update({ turn_count: (meeting.turn_count ?? 0) + 1 })
        .eq('id', meeting.id)
    }

    // The model sometimes emits the closing question as a dialogue line AND as
    // the question, so it renders twice. Seen on the first live generation.
    // Dropped here rather than in the prompt because a structural defect should
    // be impossible rather than discouraged.
    const asked = exchange.question?.text?.trim()
    const lines = (exchange.lines ?? []).filter((l) => l.text?.trim() !== asked)

    return json(200, {
      ...exchange,
      lines,
      card_slug: card.slug,
      session_id: meeting?.id ?? null,
      turn: (meeting?.turn_count ?? 0) + 1,
      turns_remaining: meeting ? LIMITS.exchangesPerSession - (meeting.turn_count + 1) : null
    })
  } catch (error) {
    const retryable = error instanceof LlmError && error.retryable
    return json(retryable ? 503 : 502, {
      error: 'exchange_failed',
      message: 'The board could not be reached. Nothing has been lost.',
      retryable
    })
  }
}
