import { describe, expect, it } from 'vitest'
import { dueDate, nextBox } from '../grade.js'
import { facetContent } from '../lib/rubric.js'

describe('Leitner movement', () => {
  it('advances a fluent correct answer', () => {
    expect(nextBox(1, 'correct', false)).toBe(2)
    expect(nextBox(3, 'correct', false)).toBe(4)
  })

  it('holds a correct answer that took too long', () => {
    // The whole reason latency is measured. Without this, slow-but-right looks
    // identical to fluent, and the deck advances on recall that has not
    // actually consolidated.
    expect(nextBox(3, 'correct', true)).toBe(3)
  })

  it('holds on partial', () => {
    expect(nextBox(4, 'partial', false)).toBe(4)
  })

  it('sends a wrong answer back to the start regardless of how far it got', () => {
    expect(nextBox(6, 'wrong', false)).toBe(1)
    expect(nextBox(2, 'wrong', true)).toBe(1)
  })

  it('never leaves the valid range', () => {
    expect(nextBox(6, 'correct', false)).toBe(6)
    expect(nextBox(1, 'wrong', false)).toBe(1)
  })
})

describe('due dates lengthen as a card is learned', () => {
  const daysFromNow = (iso) => Math.round((Date.parse(iso) - Date.now()) / 86_400_000)

  it('spaces intervals out box by box', () => {
    const intervals = [1, 2, 3, 4, 5, 6].map((box) => daysFromNow(dueDate(box)))
    expect(intervals).toEqual([...intervals].sort((a, b) => a - b))
    expect(intervals[0]).toBeLessThan(intervals[5])
  })

  it('brings box one back almost immediately', () => {
    expect(daysFromNow(dueDate(1))).toBe(0)
  })
})

describe('facet content is what the grader is given as ground truth', () => {
  const card = {
    title: 'Test Metric',
    facets: {
      definition: 'A definition.',
      formula_variants: { text: 'x', variants: [{ variant: 'V', formula: 'a/b', when: 'always' }] },
      inputs: 'Some inputs.',
      application: 'Some application.',
      traps: ['First trap', 'Second trap'],
      benchmark: { state: 'present', rows: [{ segment: 'SMB', figure: '5%', source: 'Somebody 2025' }] }
    }
  }

  it('returns the definition verbatim', () => {
    expect(facetContent(card, 'definition')).toBe('A definition.')
  })

  it('renders formula variants with the condition each is right under', () => {
    expect(facetContent(card, 'formula')).toContain('a/b')
    expect(facetContent(card, 'formula')).toContain('always')
  })

  it('carries the source into benchmark ground truth', () => {
    expect(facetContent(card, 'benchmark')).toContain('Somebody 2025')
  })

  it('makes an absent benchmark the answer rather than an empty string', () => {
    const absent = {
      ...card,
      facets: { ...card.facets, benchmark: { state: 'absent', rows: [], note: null } }
    }
    const text = facetContent(absent, 'benchmark')
    expect(text).toContain('NO PRIMARY PUBLISHER')
    expect(text.length).toBeGreaterThan(40)
  })

  it('returns empty for a facet the card does not have', () => {
    expect(facetContent(card, 'nonsense')).toBe('')
  })
})
