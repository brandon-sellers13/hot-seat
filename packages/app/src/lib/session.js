/**
 * Client-side session rules for the Hot Seat.
 *
 * Mirrors the server's scenario module so the UI can render credibility and
 * outcomes without a round trip. The server remains the authority on turn
 * count, budget and trap placement.
 */

export const SESSION = {
  credibility: 5,
  turns: { min: 8, max: 12 },
  // Longer than the Daily's five seconds. A board question is heavier and
  // deserves a beat of thought; the threshold marks reaching, not thinking.
  hesitationMs: 8000
}

export const BOARD = {
  cfo: { name: 'Marguerite Okonjo', role: 'CFO, lead investor' },
  product: { name: 'Deshawn Whitlock', role: 'Independent director' },
  growth: { name: 'Priya Raghunathan', role: 'Board observer' },
  ceo: { name: 'Tom Bracewell', role: 'Chair' }
}

/**
 * Brief the board on three to five cards.
 *
 * One must be a metric with no published benchmark, because that is what the
 * trap is built from. Grounding the trap in a verified corpus finding means the
 * game never has to assert that a named publisher did not publish something.
 */
export const pickSessionCards = (cards, count = 4) => {
  const trappable = cards.filter(
    (c) => c.is_metric && c.facets.benchmark.state === 'absent' && (c.facets.traps?.length ?? 0) > 0
  )
  const solid = cards.filter(
    (c) => c.is_metric && c.facets.benchmark.state === 'present' && c.facets.definition
  )

  const draw = (pool, n) => {
    const copy = [...pool]
    const out = []
    while (out.length < n && copy.length) {
      out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0])
    }
    return out
  }

  return [...draw(trappable, 1), ...draw(solid, count - 1)].filter(Boolean)
}

export const applyDelta = (credibility, { verdict, isTrap, rubric }) => {
  let delta = 0
  if (isTrap) {
    if (verdict === 'wrong') delta = -2
    else if (rubric?.anchored && rubric?.bridged) delta = 0
    else delta = -1
  } else if (verdict === 'wrong') {
    delta = -1
  }
  return Math.max(0, credibility + delta)
}

export const outcomeCopy = {
  survived: {
    title: 'You held the room',
    body: 'You answered without reaching, and when a number was put to you, you brought your own and said what you were doing about it. That is the whole skill.'
  },
  wounded: {
    title: 'You got through it',
    body: 'You stayed in the room, but there were answers you had to reach for and at least one you could not source. Those are the ones to go and read.'
  },
  burned: {
    title: 'The meeting was adjourned',
    body: 'Credibility ran out. The usual cause is accepting a figure you could not verify and then planning against it, which commits the company to a number nobody published.'
  }
}
