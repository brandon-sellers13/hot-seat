import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  BOARD,
  briefCards,
  credibilityDelta,
  seatFor,
  sessionOutcome,
  trapCandidates
} from '../lib/scenario.js'

const cards = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../../corpus/data/cards.json', import.meta.url)), 'utf8')
).cards
const bySlug = (slug) => cards.find((c) => c.slug === slug)

describe('questions come from the seat that owns the subject', () => {
  it.each([
    ['cac-payback-period', 'cfo'],
    ['customer-churn-rate', 'product'],
    ['rule-of-40', 'cfo']
  ])('%s goes to %s', (slug, seat) => {
    expect(seatFor(bySlug(slug))).toBe(seat)
  })

  it('routes acquisition metrics to the growth seat', () => {
    const acquisition = cards.find(
      (c) => c.families.length === 1 && c.families[0] === 'acquisition-paid-media'
    )
    expect(seatFor(acquisition)).toBe('growth')
  })

  it('the chair owns no families, so never interrogates', () => {
    // A friendly chair who suddenly starts grilling you is not a chair.
    expect(BOARD.ceo.families).toEqual([])
  })

  it('always returns a real seat, even for an unfamiliar family', () => {
    expect(Object.keys(BOARD)).toContain(seatFor({ families: ['nonexistent'] }))
  })
})

describe('the trap is built from a verified corpus finding', () => {
  const candidates = trapCandidates(cards)

  it('has plenty of material', () => {
    expect(candidates.length).toBeGreaterThan(20)
  })

  it('only ever uses metrics where no publisher supplies a benchmark', () => {
    // The trap is a confident figure quoted for something nobody published.
    // Grounding it in the 132 absent-benchmark cards means the game never has
    // to assert that a named publisher did not publish something.
    expect(candidates.every((c) => c.facets.benchmark.state === 'absent')).toBe(true)
  })

  it('only uses cards with enough substance to argue about', () => {
    expect(candidates.every((c) => c.facets.definition && c.facets.traps.length > 0)).toBe(true)
  })

  it('never uses a narrative note as a trap', () => {
    expect(candidates.every((c) => c.is_metric)).toBe(true)
  })
})

describe('the briefing is the only ground truth the interrogator gets', () => {
  const brief = briefCards([bySlug('net-revenue-retention'), bySlug('account-penetration')])

  it('includes the definition and the askable facets', () => {
    expect(brief).toContain('Net Revenue Retention')
    expect(brief).toContain('ASKABLE FACETS')
  })

  it('states plainly when no benchmark exists, rather than leaving it blank', () => {
    expect(brief).toContain('No primary publisher supplies a figure')
  })

  it('carries sources through so a quoted figure can be attributed', () => {
    expect(brief).toMatch(/SaaS Capital|Benchmarkit/)
  })
})

describe('credibility', () => {
  it('costs nothing for an ordinary right answer', () => {
    expect(credibilityDelta({ verdict: 'correct', isTrap: false })).toBe(0)
  })

  it('costs one for an ordinary wrong answer', () => {
    expect(credibilityDelta({ verdict: 'wrong', isTrap: false })).toBe(-1)
  })

  it('costs two for swallowing the trap', () => {
    // Accepting an unsourced figure and planning against it is worse than not
    // knowing, because it commits the company to a number nobody published.
    expect(credibilityDelta({ verdict: 'wrong', isTrap: true })).toBe(-2)
  })

  it('costs nothing when the trap is countered with an anchor and a plan', () => {
    expect(
      credibilityDelta({
        verdict: 'correct',
        isTrap: true,
        rubric: { anchored: true, bridged: true }
      })
    ).toBe(0)
  })

  it('still costs one for spotting the trap without bringing a plan', () => {
    // Anchoring alone is a counter, not command of the room.
    expect(
      credibilityDelta({
        verdict: 'partial',
        isTrap: true,
        rubric: { anchored: true, bridged: false }
      })
    ).toBe(-1)
  })
})

describe('session outcome', () => {
  it('burns at zero credibility', () => {
    expect(sessionOutcome(0, 6)).toBe('burned')
  })

  it('is wounded when it survives but only just', () => {
    expect(sessionOutcome(2, 10)).toBe('wounded')
  })

  it('survives a full meeting with credibility intact', () => {
    expect(sessionOutcome(5, 10)).toBe('survived')
  })

  it('counts a short meeting as abandoned rather than survived', () => {
    expect(sessionOutcome(5, 3)).toBe('abandoned')
  })
})
