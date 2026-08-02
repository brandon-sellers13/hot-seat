import { LlmError, grade as gradeAnswer } from './lib/llm.js'
import {
  VERDICT_SCHEMA,
  VERDICT_SCHEMA_VERSION,
  gradeInstructions,
  gradeInput,
  exchangeGradeInstructions,
  exchangeGradeInput
} from './lib/rubric.js'
import { checkAnswerRate, resolveApiKey, userClient } from './lib/budget.js'
import { CREDIBILITY_START, applyDrain, endingFor, lengthFor } from './lib/meeting.js'

/**
 * POST /.netlify/functions/grade
 *
 * Turns (card, facet, question, typed answer, elapsed ms) into a structured
 * verdict, and records the attempt.
 *
 * The one rule this file exists to keep: an error must never be presented as a
 * verdict. A fabricated verdict corrupts the Leitner scheduler and the player's
 * trust in the same moment, and it is worse than an honest "could not grade".
 */

const json = (status, body, headers = {}) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  body: JSON.stringify(body)
})

const BOX_INTERVALS_DAYS = [0, 1, 3, 7, 16, 35]

/** Leitner move. Right answers advance a box, wrong answers go back to one. */
export const nextBox = (box, verdict, hesitated) => {
  if (verdict === 'wrong') return 1
  // A correct answer that took too long is recall that has not consolidated, so
  // it holds its place rather than advancing. This is the whole reason latency
  // is measured: without it, slow-but-right looks identical to fluent.
  if (verdict === 'partial' || hesitated) return Math.max(1, box)
  return Math.min(6, box + 1)
}

export const dueDate = (box) => {
  const days = BOX_INTERVALS_DAYS[Math.min(box, BOX_INTERVALS_DAYS.length) - 1] ?? 1
  return new Date(Date.now() + days * 86_400_000).toISOString()
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Use POST' })

  let payload
  try {
    payload = JSON.parse(event.body ?? '{}')
  } catch {
    return json(400, { error: 'Body was not valid JSON' })
  }

  const {
    card, facet, question, answer, elapsedMs, source = 'daily',
    pack, answerable = true,
    // Present when this answer is a turn in a meeting. The drain runs here
    // rather than in the client because credibility decides when a meeting
    // stops, and a stopping rule the client computes is a suggestion.
    sessionId,
    // When the caller supplies what a strong answer contains, this is a board
    // exchange rather than a recall prompt, and it grades differently. The facet
    // grader is right for "what is NRR" and wrong for "is this leads or product":
    // the answer to the second is in no facet. Measured 3/9 against 8/9.
    reference
  } = payload

  if (!card?.slug || !facet || typeof answer !== 'string') {
    return json(400, { error: 'card, facet and answer are required' })
  }
  if (!answer.trim()) {
    return json(400, { error: 'An empty answer cannot be graded' })
  }

  const token = (event.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
  if (!token) return json(401, { error: 'Sign-in token required' })

  const supabase = userClient(token)
  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth?.user) return json(401, { error: 'Session is not valid' })

  const { apiKey, bringYourOwn } = resolveApiKey(event.headers)
  if (!apiKey) return json(503, { error: 'No grading key is configured' })

  // Looked up before the provider call, not after. An answer to a meeting that
  // has already adjourned should be refused rather than graded and discarded,
  // and refusing before we spend anything is the cheaper order to do it in.
  //
  // Row-level security scopes this, so another player's meeting reads as
  // missing rather than as forbidden.
  let meeting = null
  if (sessionId) {
    const { data } = await supabase
      .from('sessions')
      .select('id, credibility, scenario, ended_at')
      .eq('id', sessionId)
      .maybeSingle()

    if (!data) return json(404, { error: 'no_meeting', message: 'That meeting does not exist' })
    if (data.ended_at) {
      return json(409, { error: 'meeting_over', message: 'That meeting has already ended.' })
    }
    meeting = data
  }

  // A player supplying their own key is paying for it, so the caps do not apply.
  if (!bringYourOwn) {
    const rate = await checkAnswerRate(supabase)
    if (!rate.allowed) {
      // Distinct from an error, and it must read as a cool-down rather than a
      // malfunction. No provider call is made.
      return json(429, {
        error: 'rate_limited',
        message: `That is ${rate.used} answers in an hour. Come back shortly.`,
        retryAfterSeconds: 600
      })
    }
  }

  let verdict
  try {
    verdict = await gradeAnswer({
      apiKey,
      instructions: reference
        ? exchangeGradeInstructions({ answerable })
        : gradeInstructions({ facet, answerable }),
      input: reference
        ? exchangeGradeInput({ question, referenceAnswer: reference, answer, pack, card })
        : gradeInput({ card, facet, question, answer, elapsedMs, pack }),
      schema: VERDICT_SCHEMA
    })
  } catch (error) {
    const retryable = error instanceof LlmError && error.retryable
    // Honest failure. The prompt is requeued and no Leitner state moves.
    return json(retryable ? 503 : 502, {
      error: 'ungraded',
      message: 'The grader could not be reached, so this one does not count.',
      retryable
    })
  }

  const hesitated = typeof elapsedMs === 'number' && elapsedMs > (payload.threshold ?? 5000)

  // Recorded after a real verdict, never before, so a failed call leaves no
  // trace that could be mistaken for an attempt.
  const userId = auth.user.id
  const { data: existing } = await supabase
    .from('leitner')
    .select('box')
    .eq('card_slug', card.slug)
    .eq('facet', facet)
    .maybeSingle()

  const box = nextBox(existing?.box ?? 1, verdict.verdict, hesitated)

  const [{ error: attemptError }] = await Promise.all([
    supabase.from('attempts').insert({
      user_id: userId,
      card_slug: card.slug,
      facet,
      source,
      verdict: verdict.verdict,
      // Both null outside a meeting. The stance is stored because the ending
      // cannot tell a meeting won by conceding from one won by countering if
      // all it has is the verdict, and those are different meetings.
      session_id: meeting?.id ?? null,
      stance: verdict.stance ?? null,
      rubric: verdict.rubric ?? {},
      missed: verdict.missed ?? [],
      answer_chars: answer.length,
      elapsed_ms: elapsedMs ?? null,
      hesitated
    }),
    supabase.from('leitner').upsert(
      {
        user_id: userId,
        card_slug: card.slug,
        facet,
        box,
        due_at: dueDate(box),
        consecutive_correct:
          verdict.verdict === 'correct' ? (existing?.consecutive_correct ?? 0) + 1 : 0,
        last_verdict: verdict.verdict,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id,card_slug,facet' }
    )
  ])

  // ---------------------------------------------------------------------------
  // The meeting moves here, off the verdict this function just produced.
  //
  // A meeting ends for two reasons and both are settled server-side: the player
  // ran out of credibility, or they answered the last exchange of the length
  // they chose. Either way `ended_at` gets stamped, and /exchange already
  // refuses a session with `ended_at` set — so the meeting being over is a fact
  // about the database rather than a state the client agrees to honour.
  // ---------------------------------------------------------------------------
  let state = null
  if (meeting) {
    const credibility = applyDrain(
      meeting.credibility ?? CREDIBILITY_START,
      verdict.verdict,
      verdict.stance
    )
    const planned = lengthFor(meeting.scenario)

    const { data: history } = await supabase
      .from('attempts')
      .select('verdict, stance')
      .eq('session_id', meeting.id)

    const attempts = history ?? []
    // If the insert above failed then this answer is not in the history, and
    // counting it in memory keeps the meeting the right length rather than
    // silently giving the player a free extra turn.
    if (attemptError) attempts.push({ verdict: verdict.verdict, stance: verdict.stance ?? null })

    const over = credibility <= 0 || attempts.length >= planned
    const ending = over ? endingFor({ credibility, attempts, planned }) : null

    await supabase
      .from('sessions')
      .update({
        credibility,
        ...(ending ? { ended_at: new Date().toISOString(), outcome: ending.outcome } : {})
      })
      .eq('id', meeting.id)

    state = {
      credibility,
      answered: attempts.length,
      planned,
      over,
      // The recorded outcome and the ending the player is shown. Null until the
      // meeting is actually over, so a client cannot render an ending early.
      outcome: ending?.outcome ?? null,
      decision: ending?.decision ?? null
    }
  }

  return json(200, {
    schema_version: VERDICT_SCHEMA_VERSION,
    verdict: verdict.verdict,
    // Explicitly listed, like everything else in this object. That is exactly
    // how `stance` went missing once already.
    meeting: state,
    // The move the player made, separate from whether it worked. Added with the
    // exchange grader; the response was picking fields explicitly, so a new one
    // silently vanished between the model and the client.
    stance: verdict.stance ?? null,
    missed: verdict.missed ?? [],
    tell: verdict.tell,
    rubric: verdict.rubric,
    hesitated,
    elapsedMs: elapsedMs ?? null,
    box,
    // Surfaced so cost is measurable in production rather than modelled.
    usage: verdict.usage
  })
}

export default handler
