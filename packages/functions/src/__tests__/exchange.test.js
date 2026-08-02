import { describe, expect, it } from 'vitest'
import { EXCHANGE_SCHEMA, exchangeInstructions, exchangeInput } from '../lib/exchange.js'

/**
 * The generator contract. These guard the constraints that were each added
 * because a measured batch failed without them; the pass rates live in
 * evals/exchange-format/.
 */
describe('the exchange schema forces the shape', () => {
  const props = EXCHANGE_SCHEMA.schema.properties

  it('requires a conversation, not a single prompt', () => {
    expect(props.lines.minItems).toBeGreaterThanOrEqual(3)
  })

  it('only lets the four directors speak', () => {
    expect(props.lines.items.properties.speaker.enum).toEqual(['Elena', 'Ravi', 'Camille', 'Adrian'])
  })

  it('makes the model show its working on every figure', () => {
    // Emitting derivations is what the eval audits against the pack, and it is
    // the reason fabrication is measurable rather than assumed.
    expect(props.figures.items.required).toEqual(['value', 'derivation'])
  })

  it('separates the question from the dialogue', () => {
    expect(EXCHANGE_SCHEMA.schema.required).toContain('question')
    expect(EXCHANGE_SCHEMA.schema.required).toContain('lines')
  })
})

describe('the instructions carry the four constraints in priority order', () => {
  const text = exchangeInstructions()

  it.each([
    ['never invent a number', /NEVER INVENT A NUMBER/],
    ['open on the ask', /OPEN ON WHAT THE PLAYER CAME IN FOR/],
    ['quote, do not derive or interpret', /DO NOT DERIVE, AND THEY DO NOT INTERPRET/],
    ['exactly one question', /EXACTLY ONE QUESTION/]
  ])('states %s', (_label, pattern) => {
    expect(text).toMatch(pattern)
  })

  it('puts fabrication first, because it outranks every other failure', () => {
    expect(text.indexOf('NEVER INVENT A NUMBER')).toBeLessThan(
      text.indexOf('OPEN ON WHAT THE PLAYER CAME IN FOR')
    )
  })

  it('keeps support and CSAT out of scope', () => {
    expect(text).toMatch(/NEVER ask about support tickets/)
  })
})

describe('the input carries the pack and the card', () => {
  const card = {
    title: 'Net Revenue Retention',
    facets: {
      definition: 'what a cohort is worth now versus a year ago',
      formula_variants: { text: 'cohort quotient' },
      inputs: 'billing',
      application: 'board reporting',
      traps: ['new logos must be excluded'],
      benchmark: { state: 'present', rows: [] }
    }
  }
  const built = exchangeInput({ card, pack: [{ id: 'billing', tables: [] }], ask: 'More budget.' })

  it('names the ask, so the exchange has something to be about', () => {
    expect(built).toContain('More budget.')
  })

  it('sends the pack as the only source of numbers', () => {
    expect(built).toMatch(/only source of numbers/)
    expect(built).toContain('billing')
  })

  it('sends the card as ground truth for the metric', () => {
    expect(built).toContain('Net Revenue Retention')
    expect(built).toContain('new logos must be excluded')
  })
})
