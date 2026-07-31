/**
 * The board, and the session shape.
 *
 * Cast and scenario are content rather than code, so a diligence call or a
 * client QBR is a new entry here and not a new module.
 */

/**
 * Board members are bucketed by domain, so the questioning follows a person's
 * actual interests rather than jumping randomly around the corpus. A CFO who
 * suddenly asks about push notification opt-in rates is not a board member,
 * it is a quiz engine wearing a name badge.
 */
export const BOARD = {
  cfo: {
    name: 'Marguerite Okonjo',
    role: 'CFO, lead investor',
    families: ['unit-economics', 'revenue-quality', 'growth-efficiency'],
    voice:
      'Direct and unhurried. Cares about how a number is constructed and whether it can be defended to an LP. Will ask which basis you used. Does not raise their voice and does not need to.'
  },
  product: {
    name: 'Deshawn Whitlock',
    role: 'Independent director, ex-Head of Product',
    families: ['retention-churn', 'engagement-activation', 'consumer-subscription'],
    voice:
      'Curious and slightly sceptical. Interested in what the number means about user behaviour rather than the arithmetic. Follows up on causes, not definitions.'
  },
  growth: {
    name: 'Priya Raghunathan',
    role: 'Board observer, growth-stage fund',
    families: ['acquisition-paid-media', 'b2b-pipeline-sales'],
    voice:
      'Fast, numerate, impatient with vagueness. Quotes figures from other portfolio companies. This is the one who will put a number in front of you that you did not bring.'
  },
  ceo: {
    name: 'Tom Bracewell',
    role: 'Chair',
    families: [],
    voice:
      'Friendly and trying to keep things moving. Steps in to move the meeting on, and occasionally to give you an opening. Not an adversary.'
  }
}

/** Which board member owns a card, by family. */
export const seatFor = (card) => {
  for (const [key, member] of Object.entries(BOARD)) {
    if (member.families.some((f) => card.families?.includes(f))) return key
  }
  return 'cfo'
}

export const SCENARIOS = {
  'board-meeting': {
    id: 'board-meeting',
    title: 'Quarterly board meeting',
    blurb:
      'Four people around a table who have read the deck. Eight to twelve exchanges. One of them will put a number in front of you that nobody actually published.',
    turns: { min: 8, max: 12 },
    credibility: 5,
    hesitationMs: 8000,
    setting:
      'A quarterly board meeting. The deck has been circulated and read. The board is broadly supportive but is doing its job.'
  }
}

export const TURN_SCHEMA = {
  name: 'interrogator_turn',
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['speaker', 'line', 'question', 'card_slug', 'facet', 'is_trap', 'mood'],
    properties: {
      speaker: { type: 'string', enum: ['cfo', 'product', 'growth', 'ceo'] },
      line: {
        type: 'string',
        description:
          'What this person says before the question. One or two sentences, in their voice. May react to the previous answer. Never narrates stage directions.'
      },
      question: {
        type: 'string',
        description: 'The actual question, asked plainly and answerable from the briefed card.'
      },
      card_slug: { type: 'string', description: 'Which briefed card this question is about.' },
      facet: {
        type: 'string',
        enum: ['definition', 'formula', 'inputs', 'application', 'benchmark', 'traps'],
        description: 'Which facet of that card the question tests.'
      },
      is_trap: {
        type: 'boolean',
        description: 'True only when the line quotes a figure that no primary publisher supplies.'
      },
      mood: { type: 'string', enum: ['neutral', 'stern', 'pleased', 'shock', 'pressing'] }
    }
  }
}

/**
 * The trap.
 *
 * Built from the corpus rather than from an invented catalogue: 132 cards
 * record that no primary publisher supplies a benchmark, so the trap is a board
 * member quoting a confident, plausible figure for exactly one of those. The
 * correct answer is that the number has no source, and the winning answer
 * anchors something the player CAN source and then bridges to strategy.
 *
 * This is a better trap than a fabricated-benchmark catalogue would give,
 * because it is grounded in a verified finding rather than in a claim about
 * what somebody did or did not publish.
 */
export const trapCandidates = (cards) =>
  cards.filter(
    (card) =>
      card.facets.benchmark.state === 'absent' &&
      card.is_metric &&
      card.facets.definition &&
      (card.facets.traps?.length ?? 0) > 0
  )

export const interrogatorInstructions = ({ scenario, briefing, turn, isTrap }) => {
  const cast = Object.entries(BOARD)
    .map(([key, m]) => `- ${key} (${m.name}, ${m.role}): ${m.voice}`)
    .join('\n')

  return `You are running a simulated board meeting in a metrics recall game. You write ONE board member's turn at a time.

THE SETTING
${scenario.setting}

THE BOARD
${cast}

Ask from the seat that owns the subject. A CFO does not ask about push
notification opt-in rates, and a product director does not ask how ARR was
constructed. The chair speaks to move things along or to give the player an
opening, not to interrogate.

THE CARDS YOU MAY ASK ABOUT
You may ONLY ask questions answerable from the briefing below. Never ask about a
metric that is not here, and never ask for a figure the card does not contain.
A question the corpus cannot answer is the worst failure available, because the
player is then punished for the game's own gap.

${briefing}

HOW TO PITCH IT
This is exchange ${turn}. Board members are professionals doing their job, not
bullies. They are direct, they follow up when an answer is thin, and they get
noticeably cooler as answers get worse. Nobody sneers. Write speech only, never
stage directions, and never describe the room.

${
  isTrap
    ? `THIS TURN IS THE TRAP. Set is_trap to true.

Have the growth seat state a specific, confident, plausible-sounding benchmark
figure for the briefed metric, and attribute it vaguely to something that sounds
authoritative, such as a banker's deck, a peer company, or an industry report.
The figure must be invented. That is the point: the card records that NO primary
publisher supplies a benchmark for this metric, so any number quoted for it is
unsourced.

Deliver it as an assumption, not as a challenge. "We're using X, which puts you
behind." Do not hint that it is wrong, do not hedge it, and do not invite doubt.
The whole test is whether the player notices unprompted.`
    : 'This is an ordinary exchange. Set is_trap to false.'
}

Return only the structured turn.`
}

export const briefCards = (cards) =>
  cards
    .map((card) => {
      const b = card.facets.benchmark
      const benchmark =
        b.state === 'absent'
          ? 'BENCHMARK: none. No primary publisher supplies a figure for this metric. Any number quoted for it is unsourced.'
          : `BENCHMARK:\n${b.rows
              .slice(0, 6)
              .map((r) => `  - ${r.segment}: ${r.figure}${r.source ? ` [${r.source}]` : ''}`)
              .join('\n')}`

      return `### ${card.title} (slug: ${card.slug})
FAMILIES: ${card.families.join(', ')}
DEFINITION: ${card.facets.definition ?? 'n/a'}
${benchmark}
TRAPS: ${(card.facets.traps ?? []).slice(0, 4).join(' | ') || 'n/a'}
ASKABLE FACETS: ${card.supported_prompt_types.join(', ')}`
    })
    .join('\n\n')

/** Credibility cost of an answer. Zero adjourns the meeting. */
export const credibilityDelta = ({ verdict, isTrap, rubric }) => {
  if (isTrap) {
    // Accepting an unsourced figure and planning against it is the worst
    // outcome in the game, worse than not knowing, because it commits the
    // company to a number nobody published.
    if (verdict === 'wrong') return -2
    if (rubric?.anchored && rubric?.bridged) return 0
    return -1
  }
  if (verdict === 'wrong') return -1
  return 0
}

export const sessionOutcome = (credibility, turns) => {
  if (credibility <= 0) return 'burned'
  if (credibility <= 2) return 'wounded'
  if (turns >= 8) return 'survived'
  return 'abandoned'
}
