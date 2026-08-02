/**
 * Deciding what the board asks about, and in what shape.
 *
 * The server owns everything that has consequences — how long a meeting runs,
 * what an answer costs in credibility, when the meeting is over. This file owns
 * only the running order, which has no consequences at all and so is safe here.
 *
 * The two rules it exists to keep, both from the handoff:
 *
 * Never draw outside `ANSWERABLE`. Asking about a metric whose inputs are not in
 * the pack is what makes the generator invent them, and a fabricated figure at a
 * board table makes the game actively misleading rather than merely wrong.
 *
 * Vary the shape. Twenty benchmark challenges in a row is one exchange played
 * twenty times, and left to itself the generator picks the benchmark challenge
 * every time because it is the most obvious way to build a board conversation.
 */

/**
 * Kept in step with `packages/functions/src/lib/meeting.js` by a test, because
 * the client cannot import it: that module reaches `budget.js`, which pulls the
 * whole Supabase client into a browser bundle that has no use for it.
 *
 * The drift this guards against is quiet. An unrecognised shape is dropped
 * server-side and the exchange generates without any shape guidance at all, so
 * a rename here would not break anything visibly — it would just stop the
 * variety working while continuing to look like it was working.
 */
export const SHAPES = ['diagnosis', 'director-wrong', 'director-right', 'unsettled']

/** Display only. The server reads the length off the session it created. */
export const MEETING_LENGTHS = { short: 6, long: 20 }

export const CREDIBILITY_START = 5

const shuffled = (items, random) => {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Deal `count` items without replacement, reshuffling when the deck runs out.
 *
 * There are nine answerable metrics and a long meeting is twenty exchanges, so
 * repeats are arithmetic rather than a choice. What is a choice is where they
 * fall: dealing without replacement means every metric is asked once before any
 * is asked twice, and the seam swap stops a reshuffle putting the same metric
 * back-to-back with itself, which is the only repeat a player actually notices.
 */
export const cycle = (items, count, random = Math.random) => {
  if (!items.length) return []
  const out = []
  while (out.length < count) {
    const pass = shuffled(items, random)
    if (out.length && pass.length > 1 && pass[0] === out[out.length - 1]) {
      ;[pass[0], pass[1]] = [pass[1], pass[0]]
    }
    out.push(...pass.slice(0, count - out.length))
  }
  return out
}

/**
 * The running order for a whole meeting, decided up front.
 *
 * Up front rather than per turn so that the pre-generation of exchange N+1 can
 * start while the player is still answering N. Generation takes about nine
 * seconds, measured, and a meeting that decides what to ask only once the
 * previous answer is in has to spend those nine seconds in front of the player
 * twenty times.
 *
 * Cards and shapes are cycled independently, so which shape a metric arrives in
 * changes between meetings.
 */
export const planMeeting = ({ slugs, count, shapes = SHAPES, random = Math.random }) => {
  const cards = cycle(slugs, count, random)
  const forms = cycle(shapes, count, random)
  return cards.map((slug, i) => ({ slug, shape: forms[i] }))
}

/**
 * The ending, which is what the board did with the ask rather than a score.
 *
 * Redirected is written as a good meeting on purpose. The third worked example
 * in the format brief is a meeting the player wins by agreeing: partner runs a
 * better payback than paid, so the strongest answer available concedes the
 * point and moves the ask to a different column. If the ending read that as a
 * defeat it would be telling the player the best answer they gave was a
 * mistake.
 */
export const DECISIONS = {
  approved:
    'The board approved the ask. You sourced your numbers, the room believed them, and the plan you walked in with is funded.',
  deferred:
    'The board deferred the ask. Nothing was decided today, and you will be asked for the same thing again with better answers attached to it.',
  redirected:
    'The board redirected the ask. You conceded the points that were worth conceding, and the money is going somewhere else because of it. That is a better meeting than winning the one you prepared for.'
}

export const OUTCOMES = {
  survived: 'You left with your credibility intact.',
  wounded: 'You left with your credibility scuffed.',
  burned: 'The meeting adjourned early. You ran out of room.',
  abandoned: 'You left before the board was finished.'
}
