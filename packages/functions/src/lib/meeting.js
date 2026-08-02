import { LIMITS } from './budget.js'

/**
 * The meeting: what turns a sequence of exchanges into a session with an ending.
 *
 * Everything here is a pure function over values the server already has. That
 * is deliberate. Credibility decides when a meeting stops, and a stopping rule
 * the client computes is not a stopping rule — it is a suggestion the client is
 * free to ignore. Twice now a control in this codebase has read as enforced and
 * enforced nothing, both times because the honest-looking helper was measuring
 * something nobody was actually gated on. So the drain runs in `/grade` off the
 * verdict `/grade` itself produced, and hitting zero writes `ended_at`, which
 * `/exchange` already refuses on.
 *
 * Worth saying plainly: adjourning at zero credibility is drama, not a spend
 * control. The twenty-generation ceiling in LIMITS is the spend control and it
 * binds whether or not any of this works.
 */

/** Pips on the bar at the start of a meeting. Matches the column default. */
export const CREDIBILITY_START = 5

/**
 * Meeting lengths, in exchanges the player answers.
 *
 * Capped at the server ceiling so a length can never be configured above the
 * limit that bounds spend. If the two ever disagree, the ceiling wins.
 */
export const MEETING_LENGTHS = {
  short: Math.min(6, LIMITS.exchangesPerSession),
  long: Math.min(20, LIMITS.exchangesPerSession)
}

const SCENARIO_BASE = 'board-meeting'

/** The chosen length rides on `sessions.scenario`, which is free text already. */
export const scenarioFor = (length) =>
  length === 'short' ? `${SCENARIO_BASE}:short` : `${SCENARIO_BASE}:long`

/**
 * How many exchanges this meeting gets.
 *
 * A bare `board-meeting` is a session created before lengths existed, and gets
 * the ceiling. Anything unrecognised gets the ceiling too, because failing to
 * parse a scenario should not silently grant a longer meeting than any mode
 * offers, and the ceiling is the longest a meeting can be regardless.
 */
export const lengthFor = (scenario) =>
  scenario === `${SCENARIO_BASE}:short` ? MEETING_LENGTHS.short : MEETING_LENGTHS.long

/**
 * The four question shapes, taken from the four worked examples in the format
 * brief rather than invented here.
 *
 * Rotated across a meeting so twenty exchanges are not twenty benchmark
 * challenges. `unsettled` is the one that changes how the answer grades: the
 * pack cannot settle it, so refusing and naming the missing cut is the correct
 * answer rather than a dodge.
 */
export const SHAPES = ['diagnosis', 'director-wrong', 'director-right', 'unsettled']

/** A shape arrives from the client, so it is checked rather than trusted. */
export const isShape = (shape) => SHAPES.includes(shape)

/**
 * Whether the board pack can settle this exchange.
 *
 * Derived from the shape the exchange was generated with, so the grader is told
 * the truth about the question it is grading rather than being asked to guess.
 *
 * NOT a guarantee. `/exchange` returns this and the client hands it back to
 * `/grade`, so a caller who wants to mark their own refusals correct still can.
 * Closing that needs per-exchange server state, which is its own change; this
 * only makes the honest path correct, and the honest path was previously wrong
 * for every unsettled question.
 */
export const answerableFor = (shape) => shape !== 'unsettled'

/**
 * What one answer costs in credibility.
 *
 * Partial costs nothing on purpose. Credibility is about being caught out, not
 * about being mediocre: an answer heading the right way and missing something
 * is a normal board answer, and a meeting that ends because six answers were
 * merely adequate would be punishing participation. Mediocrity shows up in the
 * outcome instead, which is what the outcome is for.
 *
 * `accepted` costs double because it is the specific failure this game exists
 * to drill: taking a figure you were meant to test and building a plan on top
 * of it. A good plan against an unverified number is the most expensive answer
 * in the room, and a drain equal to an ordinary wrong answer would say it was
 * merely as bad.
 *
 * `ungraded` costs nothing. That is our failure, not the player's, and charging
 * for it would make an outage indistinguishable from incompetence.
 */
export const drain = (verdict, stance) => {
  if (verdict === 'correct' || verdict === 'ungraded') return 0
  if (stance === 'accepted') return 2
  if (verdict === 'wrong') return 1
  return 0
}

/** Credibility never goes back up. A board that forgets is not a board. */
export const applyDrain = (credibility, verdict, stance) =>
  Math.max(0, credibility - drain(verdict, stance))

/**
 * The recorded outcome, on the existing `session_outcome` enum.
 *
 * `burned` is checked first: running out of credibility adjourns the meeting,
 * so it is never also an abandonment even though the player did not finish.
 */
export const outcomeFor = ({ credibility, answered, planned, walkedOut = false }) => {
  if (credibility <= 0) return 'burned'
  if (walkedOut && answered < planned) return 'abandoned'
  if (credibility <= 2) return 'wounded'
  return 'survived'
}

/**
 * What the board does with the ask, which is the actual ending.
 *
 * Not a rename of credibility. Surviving the room and moving the room are
 * different endings, and the third worked example in the format brief is a
 * meeting the player wins by conceding: partner runs a better payback than
 * paid, so the strong answer agrees with the CFO and moves the ask to a
 * different column. A grader that treats that as a loss would mark the best
 * available answer down, and an ending that treats it as a loss does the same
 * thing one level up.
 *
 * So:
 * - REDIRECTED when the player was right often enough to be believed AND a real
 *   share of being right came from conceding or from refusing an unsettled
 *   question. The ask moves. This is a win.
 * - APPROVED when they were right often enough and mostly held their ground.
 * - DEFERRED otherwise, and always when they burned out.
 *
 * Two yields rather than one, because one concession is a moment and two is a
 * position. A single well-judged agreement inside an otherwise combative
 * meeting has not changed anybody's mind about where the money goes.
 */
export const decideAsk = ({ credibility, attempts }) => {
  if (credibility <= 0) return 'deferred'

  const answered = attempts.length
  if (answered === 0) return 'deferred'

  const correct = attempts.filter((a) => a.verdict === 'correct')
  // Below half right, the room is not taking direction from you either way.
  if (correct.length * 2 < answered) return 'deferred'

  const yielded = correct.filter((a) => a.stance === 'conceded' || a.stance === 'refused')
  if (yielded.length >= 2 && yielded.length * 3 >= correct.length) return 'redirected'

  return 'approved'
}

/**
 * Both endings together, so a caller cannot compute one and forget the other.
 */
export const endingFor = ({ credibility, attempts, planned, walkedOut = false }) => ({
  outcome: outcomeFor({ credibility, answered: attempts.length, planned, walkedOut }),
  decision: decideAsk({ credibility, attempts }),
  credibility,
  answered: attempts.length,
  planned
})
