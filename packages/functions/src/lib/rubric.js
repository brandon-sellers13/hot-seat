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
 */
export const VERDICT_SCHEMA_VERSION = '1.0.0'

export const VERDICT_SCHEMA = {
  name: 'verdict',
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['verdict', 'missed', 'tell', 'rubric'],
    properties: {
      verdict: {
        type: 'string',
        enum: ['correct', 'partial', 'wrong'],
        description:
          'correct when the answer contains the substance of the facet, even if worded differently. partial when it is heading the right way but omits something the facet treats as essential. wrong when it states something the facet contradicts, or says nothing usable.'
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
export const gradeInstructions = ({ facet }) => {
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

The overall verdict follows from these: anchored and bridged together is
correct. Either one alone is partial. Neither is wrong, and accepting a figure
you were meant to challenge is wrong regardless of how fluent the answer reads.`
    : `This question is a straight recall check, not a board challenge. Set every
field in the rubric object to null.`
}

ALWAYS WRITE A TELL, INCLUDING WHEN THE ANSWER IS CORRECT.
When they got it right, state what the facet says in one sentence. Seeing the
canonical phrasing immediately after producing their own is most of how the
wording gets learned, so an empty tell throws away the moment the answer was
actually worth reinforcing. Do not congratulate them; just state the card.

Return only the structured verdict.`
}

/** The graded turn, as sent to the model. */
export const gradeInput = ({ card, facet, question, answer, elapsedMs }) => {
  const facetText = facetContent(card, facet)

  return `METRIC: ${card.title}
FACET UNDER TEST: ${facet}

THE FACET, WHICH IS THE ONLY GROUND TRUTH:
${facetText}

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
