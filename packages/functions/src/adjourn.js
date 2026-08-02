import { endingFor, lengthFor } from './lib/meeting.js'
import { userClient } from './lib/budget.js'

/**
 * POST /.netlify/functions/adjourn
 *
 * Ends a meeting the player walked out of.
 *
 * The two ordinary endings — running out of credibility, and answering the last
 * exchange — are settled by /grade, because /grade is where the verdict that
 * causes them is produced. This exists only for leaving early, which is the one
 * ending no verdict announces.
 *
 * It makes no provider call and costs nothing, so it is deliberately the one
 * endpoint in the game with no budget check.
 *
 * The honest limit of this: a meeting is only recorded as abandoned if the
 * player leaves in a way that reaches here. Closing the tab does not, and the
 * beacon the client sends is best-effort by definition. Sessions left open by a
 * closed tab keep their null `ended_at` and are indistinguishable from meetings
 * still in progress. That is a real gap and it is not worth a background job to
 * close, because nothing downstream reads `abandoned` today.
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

  const { sessionId } = payload
  if (!sessionId) return json(400, { error: 'A meeting is required' })

  const token = (event.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
  if (!token) return json(401, { error: 'Sign-in token required' })

  const supabase = userClient(token)
  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth?.user) return json(401, { error: 'Session is not valid' })

  // Row-level security scopes this to the caller. Another player's meeting is
  // invisible here rather than forbidden, which is why this reads as a 404 and
  // not a 403.
  const { data: meeting } = await supabase
    .from('sessions')
    .select('id, credibility, scenario, ended_at')
    .eq('id', sessionId)
    .maybeSingle()

  if (!meeting) return json(404, { error: 'no_meeting', message: 'That meeting does not exist' })

  // A second adjourn would overwrite a real outcome — a burned meeting rewritten
  // as abandoned — with a worse one, so it is refused rather than made
  // idempotent.
  if (meeting.ended_at) {
    return json(409, { error: 'meeting_over', message: 'That meeting has already ended.' })
  }

  const { data: history } = await supabase
    .from('attempts')
    .select('verdict, stance')
    .eq('session_id', meeting.id)

  const planned = lengthFor(meeting.scenario)
  const ending = endingFor({
    credibility: meeting.credibility ?? 0,
    attempts: history ?? [],
    planned,
    walkedOut: true
  })

  const { error } = await supabase
    .from('sessions')
    .update({ ended_at: new Date().toISOString(), outcome: ending.outcome })
    .eq('id', meeting.id)

  // Reported honestly rather than swallowed. A meeting that failed to close is
  // still open, and telling the client it ended would leave the two disagreeing
  // about whether more exchanges can be generated.
  if (error) {
    return json(503, { error: 'adjourn_failed', message: 'Could not close the meeting.' })
  }

  return json(200, { meeting: { ...ending, over: true } })
}

export default handler
