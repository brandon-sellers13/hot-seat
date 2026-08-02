/**
 * The board-answer rubric, and the verdict contract.
 *
 * These rules came out of playtesting and they are the product, not an
 * implementation detail. They go into the grader prompt close to verbatim.
 */

/**
 * Verdict schema. Versioned from the first commit because once the repository
 * is public this is a contract with forkers, and a silent shape change breaks
 * their fork rather than ours.
 *
 * 1.1.0 adds `stance`, which is required. Anything parsing a 1.0.0 verdict still
 * works, because every field it knew about is still there and still means the
 * same thing.
 */
export const VERDICT_SCHEMA_VERSION = '1.1.0'

export const VERDICT_SCHEMA = {
  name: 'verdict',
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['verdict', 'stance', 'missed', 'tell', 'rubric'],
    properties: {
      verdict: {
        type: 'string',
        enum: ['correct', 'partial', 'wrong'],
        description:
          'correct when the answer contains the substance of the facet, even if worded differently. partial when it is heading the right way but omits something the facet treats as essential. wrong when it states something the facet contradicts, or says nothing usable.'
      },
      stance: {
        type: 'string',
        enum: ['countered', 'conceded', 'refused', 'accepted', 'none'],
        description:
          'The move the answer made, independent of whether it worked. countered: put a different figure against the director. conceded: agreed the director was right. refused: said the question cannot be settled from what is available. accepted: took the premise and planned against it without testing it. none: a plain recall answer with no board challenge in play.'
      },
      missed: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Specific things the supplied facet contains that the answer did not. Drawn from the facet, never invented. Empty when the verdict is correct.'
      },
      tell: {
        type: 'string',
        minLength: 1,
        description:
          'One sentence, addressed to the player. When the answer fell short, name the gap against the facet. When it was right, state what the facet says, so the player sees the canonical phrasing straight after producing their own. Never empty. Plain and direct, no praise, no encouragement, no filler.'
      },
      rubric: {
        type: 'object',
        additionalProperties: false,
        required: ['anchored', 'sourced', 'bridged'],
        properties: {
          anchored: {
            type: ['boolean', 'null'],
            description:
              'Did the answer put forward its own figure or definition rather than only reacting? null when the question is not a board-style challenge.'
          },
          sourced: {
            type: ['boolean', 'null'],
            description:
              'Did the answer say where its figure comes from, or otherwise show it could be attributed? null when not applicable.'
          },
          bridged: {
            type: ['boolean', 'null'],
            description:
              'Did the answer connect to driver metrics and what is being done about them? This is the highest-value move. null when not applicable.'
          }
        }
      }
    }
  }
}

/** Prompt types that are graded as a plain recall check. */
const RECALL_FACETS = new Set(['definition', 'formula', 'inputs', 'application', 'traps'])

/**
 * The grading instructions.
 *
 * Deliberately stated as rules about what NOT to reward, because a generous
 * grader is the failure mode that makes the whole thing worthless. If the game
 * awards credit that was not earned, it is a flashcard on the honour system
 * again, only slower and more expensive.
 */
export const gradeInstructions = ({ facet, answerable = true }) => {
  const boardStyle = !RECALL_FACETS.has(facet)

  return `You are grading a typed answer in a metrics recall game. You are strict, fair and brief.

THE ONLY GROUND TRUTH IS THE FACET SUPPLIED IN THE MESSAGE.
Never grade against your own knowledge of the metric. If the supplied facet does
not contain something, the player cannot be marked down for omitting it, and if
the facet says something you believe is wrong, the facet still wins. You are
comparing an answer to a specific card, not examining the player.

HOW TO JUDGE SUBSTANCE
Mark on meaning, never on wording. A player who conveys the idea in their own
words is correct. Synonyms, informal phrasing, abbreviations, missing articles
and typing errors are all irrelevant. This is a person typing fast under time
pressure, not writing a definition for publication.

WHAT MUST NOT EARN CREDIT
- Hedging. "Something like", "I think it might be", "roughly the idea that" with
  no actual content is not a partial answer, it is a wrong one. Hedged answers
  are the single most important case to get right, because a lenient grader here
  teaches the player that vagueness passes, which is the exact habit the game
  exists to break.
- Restating the question in other words.
- Naming the metric without saying what it measures.
- A correct-sounding sentence that omits the part the facet treats as the point.

${
  boardStyle
    ? `THE BOARD-ANSWER RUBRIC (this question is a board-style challenge)
In a real room you cannot tell a director their number is wrong. You can only
put a better-founded number next to it and then say what you are doing about it.
So score three things independently in the rubric object:

- anchored: did they put forward their own figure rather than only objecting?
  Bare contradiction with no alternative is not an anchor. "That is not right"
  scores false here.
- sourced: did they indicate where their figure comes from, or that it can be
  attributed? A number with no provenance cannot be defended.
- bridged: did they point back to driver metrics and what is being done? This is
  the highest-value move and the one most players miss entirely.

SCORING THE STANCE. There are four moves and countering is only one of them.
Reward the move that is right for the situation, not the move that sounds
combative.

- COUNTERED, when the director's figure is wrong or misapplied. Anchored and
  bridged together is correct. Either alone is partial. Bare contradiction with
  no alternative is wrong: if it is not 118, then what?
- CONCEDED, when the director is RIGHT. Agreeing is not a loss, it is the only
  honest opening, and fighting a correct director is the failure. Conceded plus a
  redirect built on a second sourced figure is correct, and is the best answer
  available in that situation. Conceded with nothing after it is partial: honest
  and useless. Fighting a director who is right is WRONG however fluent it reads.
- REFUSED, when the question cannot be settled from what is available. Whether
  that is true is stated in the message, and you must not second-guess it.
  Refusing a question marked unanswerable, AND naming the cut that would settle
  it, is correct. Refusing without naming what is missing is partial. Refusing a
  question marked answerable is WRONG: that is deferral used as failure
  insurance, and if it scored well the optimal strategy would be to defer
  whenever uncertain.
- ACCEPTED, taking a figure you were meant to test and planning against it. Wrong
  regardless of how good the plan is. A good plan against an unverified number is
  the most expensive answer in the room.

Confidently inventing a diagnosis the evidence does not support is wrong, and is
the single most dangerous answer in this set. It is more damaging than a hedge,
because it sounds like command of the material.`
    : `This question is a straight recall check, not a board challenge. Set every
field in the rubric object to null.`
}

ALWAYS WRITE A TELL, INCLUDING WHEN THE ANSWER IS CORRECT.
When they got it right, state what the facet says in one sentence. Seeing the
canonical phrasing immediately after producing their own is most of how the
wording gets learned, so an empty tell throws away the moment the answer was
actually worth reinforcing. Do not congratulate them; just state the card.

${
  boardStyle
    ? answerable
      ? `THIS QUESTION IS ANSWERABLE from what the player has in front of them. A refusal here is a dodge, not calibration.`
      : `THIS QUESTION CANNOT BE SETTLED from what the player has in front of them. Recognising that is the correct answer, and producing a confident diagnosis anyway is the failure.`
    : ''
}

Return only the structured verdict.`
}

/**
 * The graded turn, as sent to the model.
 *
 * Two ground truths, and conflating them was why the first stance gate scored
 * 3/9. The card knows what a metric IS. The pack knows what THIS COMPANY'S
 * numbers are, including the targets its own board has set. A director can be
 * right against a company target that no corpus card has ever heard of, and a
 * grader holding only the card will read the player's pushback as reasonable.
 */
export const gradeInput = ({ card, facet, question, answer, elapsedMs, pack }) => {
  const facetText = facetContent(card, facet)

  return `METRIC: ${card.title}
FACET UNDER TEST: ${facet}

WHAT THE METRIC IS. Ground truth for the metric itself, its construction and its
published benchmarks:
${facetText}
${
  pack
    ? `
THIS COMPANY'S NUMBERS. Ground truth for any figure about this business,
including the targets its own board has agreed. When a director quotes a company
figure or a company target, THIS is what decides whether they are right, not the
published benchmarks above:
${JSON.stringify(pack)}
`
    : ''
}

QUESTION ASKED:
${question}

THE PLAYER'S TYPED ANSWER:
"""
${answer}
"""

${
  elapsedMs != null
    ? `They took ${(elapsedMs / 1000).toFixed(1)} seconds to begin typing. This is recorded separately and must not affect the verdict.`
    : ''
}`
}

/** Pull the text of one facet out of a card, in a form worth grading against. */
export const facetContent = (card, facet) => {
  const f = card.facets

  switch (facet) {
    case 'definition':
      return f.definition ?? ''
    case 'formula':
      return (
        f.formula_variants.variants
          .map((v) => `- ${v.variant}: ${v.formula} (right when: ${v.when})`)
          .join('\n') || (f.formula_variants.text ?? '')
      )
    case 'inputs':
      return f.inputs ?? ''
    case 'application':
      return f.application ?? ''
    case 'traps':
      return (f.traps ?? []).map((t) => `- ${t}`).join('\n')
    case 'benchmark':
      if (f.benchmark.state === 'absent') {
        return `NO PRIMARY PUBLISHER SUPPLIES A BENCHMARK FOR THIS METRIC.
The correct answer is that there is no sourced benchmark, and that any figure
quoted for it should be treated as unsourced until proven otherwise.
${f.benchmark.note ?? ''}`
      }
      return f.benchmark.rows
        .map((r) => `- ${r.segment}: ${r.figure}${r.source ? ` [source: ${r.source}]` : ''}`)
        .join('\n')
    default:
      return ''
  }
}

/** Which facets a given card can actually be asked about. */
export const askableFacets = (card) => card.supported_prompt_types ?? []


/**
 * Grading an exchange, which is not grading a recall answer.
 *
 * The facet grader above is correct for "what is net revenue retention" and
 * wrong for "is this lead quality or the product". The answer to the second is
 * in no facet: it is reasoning over the company's numbers. A grader holding only
 * the facet marks against the facet, which is why the first two stance gates
 * scored 3/9 with every failing tell opening by reciting the card.
 *
 * The generator already states what a good answer contains, constrained to the
 * pack. That is the target. The trade accepted here: the grader inherits any
 * error in the generator's reference answer. Fabrication is audited separately,
 * which is what makes that tolerable rather than circular.
 */
export const exchangeGradeInstructions = ({ answerable }) =>
  `You are grading a spoken answer to a board question. You are strict, fair and brief.

WHAT YOU ARE COMPARING AGAINST is the reference answer supplied in the message,
plus the company's numbers. Not a textbook definition. The player is being judged
on whether they made the right move in this room, not on whether they can recite
a metric.

${
  answerable
    ? 'THIS QUESTION IS ANSWERABLE from the pack. A refusal is a dodge, not calibration.'
    : 'THIS QUESTION CANNOT BE SETTLED from the pack. Recognising that is the correct answer, and producing a confident diagnosis anyway is the failure.'
}

SCORING THE STANCE. Four moves, and countering is only one of them. Reward the
move that fits the situation, not the one that sounds combative.

- COUNTERED, when the director's figure is wrong or misapplied. Anchored and
  bridged is correct; either alone is partial; bare contradiction with no
  alternative is wrong.
- CONCEDED, when the director is RIGHT. Agreeing is the only honest opening, and
  fighting a correct director is the failure however fluent it reads. Conceded
  plus a redirect built on a second sourced figure is correct and is the best
  answer available. Conceded with nothing after it is partial: honest and useless.
- REFUSED, when the pack cannot settle it. Refusing AND naming the cut that would
  settle it is correct. Refusing without naming what is missing is partial.
  Refusing an answerable question is wrong: deferral as failure insurance.
- ACCEPTED, taking a figure you were meant to test. Wrong however good the plan.

Confidently inventing a diagnosis the evidence does not support is WRONG, and is
the most dangerous answer here because it sounds like command of the material.
Hedging with no content is wrong, never partial.

Mark on substance, never on wording. This is somebody speaking under pressure.

Return only the structured verdict.`

export const exchangeGradeInput = ({ question, referenceAnswer, answer, pack, card }) =>
  `THE QUESTION PUT TO THE PLAYER:
${question}

WHAT A STRONG ANSWER CONTAINS, which is your reference:
${referenceAnswer}

THE COMPANY'S NUMBERS, ground truth for any figure about this business including
the targets its own board has agreed:
${JSON.stringify(pack)}

HOW THE METRIC IS CONSTRUCTED, for judging whether a figure was used correctly:
${card ? facetContent(card, 'definition') : '(not supplied)'}

THE PLAYER'S SPOKEN ANSWER:
"""
${answer}
"""`
