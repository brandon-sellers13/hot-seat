/**
 * The exchange generator.
 *
 * Turns a corpus card plus the company's board pack into a short conversation
 * between directors that lands on the player. This is the unit of play.
 *
 * The four constraints below are not stylistic. Each one was added because a
 * measured batch failed without it, and the pass rate is recorded in
 * `evals/exchange-format/`. Changing this prompt without re-running that eval
 * is how the format quietly stops working.
 *
 * Measured over 40 generated exchanges across 10 metrics:
 *   fabricated figures      0 / 40      the result that had to be zero
 *   opens on the ask       20 / 20      was 4/20 before constraint 2 existed
 *   derived or interpreted  2 / 20      was 9/20 before constraint 3 was sharpened
 *   exactly one question   20 / 20
 *   overall pass           18 / 20
 */

export const EXCHANGE_SCHEMA = {
  name: 'exchange',
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['metric', 'lines', 'question', 'strong_answer', 'tests', 'figures'],
    properties: {
      metric: { type: 'string' },
      lines: {
        type: 'array',
        minItems: 3,
        maxItems: 6,
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['speaker', 'text'],
          properties: {
            speaker: { type: 'string', enum: ['Elena', 'Ravi', 'Camille', 'Adrian'] },
            text: { type: 'string' }
          }
        }
      },
      question: {
        type: 'object',
        additionalProperties: false,
        required: ['speaker', 'text'],
        properties: {
          speaker: { type: 'string', enum: ['Elena', 'Ravi', 'Camille', 'Adrian'] },
          text: { type: 'string' }
        }
      },
      strong_answer: { type: 'string' },
      tests: { type: 'string' },
      figures: {
        type: 'array',
        description:
          'Every figure spoken, with where it came from. Emitting this makes the model show its work, and it is what the eval audits against the pack.',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['value', 'derivation'],
          properties: { value: { type: 'string' }, derivation: { type: 'string' } }
        }
      }
    }
  }
}

/**
 * The four constraints, in priority order.
 *
 * Order matters: the model honours earlier constraints when they conflict with
 * later ones, and a fabricated number is worse than a flat opening line.
 */
export const exchangeInstructions = () => `You write board-meeting exchanges for a game that drills SaaS metrics.

An exchange is not a question. It is a short conversation between directors that lands on the player. Directors talk to each other, quote different figures, half-correct one another, and then turn. A question arriving as a bare interrogative has already lost the thing that makes a room feel real.

FOUR HARD CONSTRAINTS, in priority order.

1. NEVER INVENT A NUMBER.
Every figure a director speaks is copied verbatim from the board pack, or derived from pack figures by arithmetic you have performed correctly. If a figure you want is not in the pack and cannot be derived, the director speaks without a number. This outranks everything else here.

2. OPEN ON WHAT THE PLAYER CAME IN FOR.
The player is asking the board for something: budget, headcount, a decision. The FIRST line names that ask, and the whole exchange happens because it bears on it. A board meeting where the player wants nothing is a status update, and nobody sweats a status update.

3. DIRECTORS QUOTE. THEY DO NOT DERIVE, AND THEY DO NOT INTERPRET.
- They MAY state any headline figure. They are holding the board pack, so quoting net revenue retention or gross margin is exactly what a real director does.
- They MUST NOT perform arithmetic aloud. No walking a roll-forward through to a total, no "which leaves us at X, which puts the ratio at Y". Nobody recites a calculation at a board table.
- They MUST NOT say what a number means for the decision. Naming the implication is the player's job, and the moment a director does it the question is dead.
Supply facts, objections and half-thoughts. Open a door; do not walk through it.

4. EXACTLY ONE QUESTION, as the final line, aimed at the player.
One interrogative sentence. Not two joined by "and". It must be answerable in a way that is right or wrong.

THINGS THAT MAKE AN EXCHANGE GOOD

Two directors can both be correct and still disagree, because they are quoting metrics that measure different things. Four percent revenue churn and five percent logo churn are both true. Directors talking past each other with accurate numbers is the most realistic thing in the room.

Somebody should half-open a door and leave it. The chair says "those are public companies" without saying what private actually is. The strong answer finishes a thought the room started, which is what makes the board feel like colleagues rather than examiners.

A director is sometimes right, and the strong answer concedes and redirects. A director is sometimes wrong. Sometimes the honest answer is that the pack cannot settle it, and the strong answer names the cut that would.

NEVER ask about support tickets, CSAT or service levels. Not this player's domain, and they let a weak answer sound engaged.`

/** The per-call payload: the metric under test and the numbers that are real. */
export const exchangeInput = ({ card, pack, ask }) =>
  `THE PLAYER'S ASK THIS MEETING: ${ask}

=== BOARD PACK, the only source of numbers ===
${JSON.stringify(pack)}

=== METRIC CARD, the ground truth for the metric ===
${JSON.stringify({
  title: card.title,
  definition: card.facets.definition,
  formula: card.facets.formula_variants?.text?.slice(0, 800) ?? null,
  inputs: card.facets.inputs,
  application: card.facets.application,
  traps: (card.facets.traps ?? []).slice(0, 6),
  benchmark: card.facets.benchmark
})}`
