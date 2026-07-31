import { EFFORT, LlmError, interrogate as nextTurn } from './lib/llm.js'
import {
  SCENARIOS,
  TURN_SCHEMA,
  briefCards,
  interrogatorInstructions
} from './lib/scenario.js'
import { checkGlobalCeiling, checkSessionCap, resolveApiKey, userClient } from './lib/budget.js'

/**
 * POST /.netlify/functions/interrogate
 *
 * Returns the next board member's turn.
 *
 * This is the expensive endpoint, so the budget controls bind here rather than
 * only on grading: a max-turn cap bounds one session, and what needs bounding
 * is a thousand of them.
 */

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(body)
})

/** Hard stop inside the function, independent of anything the client sends. */
const MAX_TURNS = 12

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Use POST' })

  let payload
  try {
    payload = JSON.parse(event.body ?? '{}')
  } catch {
    return json(400, { error: 'Body was not valid JSON' })
  }

  const { scenarioId = 'board-meeting', cards = [], history = [], turn = 1, isTrap = false } = payload
  const scenario = SCENARIOS[scenarioId]

  if (!scenario) return json(400, { error: 'Unknown scenario' })
  if (!Array.isArray(cards) || cards.length === 0) {
    return json(400, { error: 'The interrogator must be briefed on at least one card' })
  }
  if (turn > MAX_TURNS) {
    return json(400, { error: 'session_complete', message: 'This meeting has run its course.' })
  }

  const token = (event.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
  if (!token) return json(401, { error: 'Sign-in token required' })

  const supabase = userClient(token)
  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth?.user) return json(401, { error: 'Session is not valid' })

  const { apiKey, bringYourOwn } = resolveApiKey(event.headers)
  if (!apiKey) return json(503, { error: 'No interrogation key is configured' })

  // Caps are checked when a session STARTS, not on every turn, so a player is
  // never cut off mid-meeting. Being abandoned by the board halfway through
  // because of a quota is a worse experience than being told up front.
  if (turn === 1 && !bringYourOwn) {
    const ceiling = await checkGlobalCeiling()
    if (!ceiling.allowed) {
      // A misconfiguration and a tripped ceiling both close this endpoint, but
      // they are different problems and the operator needs to be able to tell
      // them apart from the response alone.
      if (ceiling.misconfigured) {
        console.error(`[budget] ${ceiling.reason}`)
        return json(503, {
          error: 'misconfigured',
          message:
            'This deployment is missing its spend guardrail, so sessions are disabled. The Daily and reference mode still work.'
        })
      }
      return json(503, {
        error: 'resting',
        message: 'The board has gone home for the day. Reference mode is still open.'
      })
    }

    const cap = await checkSessionCap(supabase)
    if (!cap.allowed) {
      return json(429, {
        error: 'session_cap',
        message: `That is ${cap.used} sessions this week. The board will see you next week.`,
        used: cap.used,
        limit: cap.limit
      })
    }
  }

  const conversation = history
    .map((h) => `${h.speaker ?? 'board'}: ${h.line ?? ''} ${h.question ?? ''}\nyou: ${h.answer ?? '(no answer)'}`)
    .join('\n\n')

  let result
  try {
    result = await nextTurn({
      apiKey,
      // The trap is the one turn worth paying more for. It is the peak the whole
      // session builds toward, and it is the entire upgrade over the baseline mix.
      effort: isTrap ? EFFORT.trap : EFFORT.interrogate,
      instructions: interrogatorInstructions({
        scenario,
        briefing: briefCards(cards),
        turn,
        isTrap
      }),
      input: conversation
        ? `The meeting so far:\n\n${conversation}\n\nWrite the next turn.`
        : 'Open the meeting with the first question.',
      schema: TURN_SCHEMA
    })
  } catch (error) {
    const retryable = error instanceof LlmError && error.retryable
    return json(retryable ? 503 : 502, {
      error: 'interrupted',
      message: 'The meeting was interrupted. Nothing you answered has been lost.',
      retryable
    })
  }

  let parsed
  try {
    parsed = JSON.parse(result.text)
  } catch {
    return json(502, { error: 'interrupted', message: 'The board lost its thread. Try again.' })
  }

  // The model was told to ask only about briefed cards. Enforce it rather than
  // trust it: a question about a card we did not brief is unanswerable from the
  // corpus, which punishes the player for the game's own gap.
  const briefed = new Set(cards.map((c) => c.slug))
  if (!briefed.has(parsed.card_slug)) {
    parsed.card_slug = cards[0].slug
  }

  return json(200, { ...parsed, turn, usage: result.usage })
}

export default handler
