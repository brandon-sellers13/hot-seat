import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  FILTER_DEFAULTS,
  aliasesOf,
  buildIndex,
  filterCards,
  isAmbiguous,
  normalizeContext,
  searchCards
} from '../search.js'

// Run against the real corpus rather than fixtures. A search that works on
// three hand-made cards and fails on 213 real ones has tested nothing.
const data = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('../../../../corpus/data/cards.json', import.meta.url)),
    'utf8'
  )
)
const index = buildIndex(data)
const find = (slug) => index.find((c) => c.slug === slug)

describe('context is classified from prose, not matched as an enum', () => {
  it.each([
    ['both', 'both'],
    ['b2b', 'b2b'],
    ['consumer', 'consumer'],
    ['consumer (mobile)', 'consumer'],
    ['b2b primarily', 'b2b'],
    ['both, dominant in consumer', 'both'],
    ['consumer subscription primarily; B2B for the same shape', 'both'],
    ['consumer (the concept transfers to B2B, rarely used there)', 'both']
  ])('%s becomes %s', (input, expected) => {
    expect(normalizeContext(input)).toBe(expected)
  })

  it('defaults to both when there is nothing to go on', () => {
    // Hiding a metric the reader needs is worse than showing an extra one.
    expect(normalizeContext(null)).toBe('both')
    expect(normalizeContext('')).toBe('both')
  })

  it('classifies every card in the corpus into one of three buckets', () => {
    const buckets = new Set(index.map((c) => c.context))
    expect([...buckets].sort()).toEqual(['b2b', 'both', 'consumer'])
  })
})

describe('aliases make a metric findable by the name people use', () => {
  it('pulls alternative names out of the title', () => {
    const aliases = aliasesOf('Net Revenue Retention (NRR / NDR / Dollar-Based Net Expansion Rate)')
    expect(aliases).toContain('Net Revenue Retention')
    expect(aliases).toContain('NRR')
    expect(aliases).toContain('NDR')
  })

  it('finds NRR by an abbreviation that appears nowhere in the slug', () => {
    const results = searchCards(index, 'NDR')
    expect(results[0].slug).toBe('net-revenue-retention')
  })

  it('finds a metric by its acronym', () => {
    expect(searchCards(index, 'CAC')[0].slug).toMatch(/cac/)
  })
})

describe('ranking puts the metric ahead of things that merely mention it', () => {
  it('leads with the churn metrics when searching churn', () => {
    const results = searchCards(index, 'churn')
    expect(results.length).toBeGreaterThan(3)
    expect(results[0].title.toLowerCase()).toContain('churn')
  })

  it('an exact slug wins outright', () => {
    expect(searchCards(index, 'rule-of-40')[0].slug).toBe('rule-of-40')
  })

  it('returns everything when the query is empty', () => {
    expect(searchCards(index, '')).toHaveLength(index.length)
    expect(searchCards(index, '   ')).toHaveLength(index.length)
  })

  it('returns nothing rather than everything for a miss', () => {
    expect(searchCards(index, 'zzzznotametric')).toEqual([])
  })
})

describe('colliding names disambiguate instead of guessing', () => {
  it('quick ratio is ambiguous and lists more than one card', () => {
    // Three unrelated metrics share this name: the SaaS quick ratio, the
    // engagement growth-accounting one, and the liquidity ratio from finance.
    // Opening whichever ranked first would teach the wrong one.
    const results = searchCards(index, 'quick ratio')
    expect(results.length).toBeGreaterThan(1)
    expect(isAmbiguous(results, 'quick ratio')).toBe(true)
  })

  it('a unique name is not flagged as ambiguous', () => {
    const results = searchCards(index, 'rule of 40')
    expect(isAmbiguous(results, 'rule of 40')).toBe(false)
  })

  it('does not flag ambiguity on a fragment too short to mean anything', () => {
    expect(isAmbiguous(searchCards(index, 'ca'), 'ca')).toBe(false)
  })
})

describe('filters narrow without losing anything', () => {
  it('passes everything through by default', () => {
    expect(filterCards(index, FILTER_DEFAULTS)).toHaveLength(index.length)
  })

  it('filters to a family', () => {
    const filtered = filterCards(index, { ...FILTER_DEFAULTS, family: 'retention-churn' })
    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.every((c) => c.families.includes('retention-churn'))).toBe(true)
  })

  it('combines a context and a tier, as the plan scenario asks', () => {
    const filtered = filterCards(index, { ...FILTER_DEFAULTS, context: 'b2b', tier: 'primary' })
    expect(filtered.every((c) => c.context === 'b2b' && c.verification_tier === 'primary')).toBe(
      true
    )
  })

  it('isolates cards where no primary publisher supplies a benchmark', () => {
    const filtered = filterCards(index, { ...FILTER_DEFAULTS, benchmark: 'absent' })
    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.every((c) => c.facets.benchmark.state === 'absent')).toBe(true)
  })

  it('separates metric cards from narrative notes', () => {
    const metrics = filterCards(index, { ...FILTER_DEFAULTS, kind: 'metric' })
    const notes = filterCards(index, { ...FILTER_DEFAULTS, kind: 'note' })
    expect(metrics.every((c) => c.is_metric)).toBe(true)
    expect(notes.every((c) => !c.is_metric)).toBe(true)
    expect(metrics.length + notes.length).toBe(index.length)
  })

  it('an over-narrow combination returns empty rather than throwing', () => {
    const filtered = filterCards(index, {
      ...FILTER_DEFAULTS,
      family: 'retention-churn',
      context: 'consumer',
      tier: 'none',
      benchmark: 'sourced'
    })
    expect(Array.isArray(filtered)).toBe(true)
  })
})

describe('search and filter compose', () => {
  it('searching within a filtered set keeps both constraints', () => {
    const filtered = filterCards(index, { ...FILTER_DEFAULTS, family: 'unit-economics' })
    const results = searchCards(filtered, 'cac')
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((c) => c.families.includes('unit-economics'))).toBe(true)
  })
})

describe('every card is reachable', () => {
  it('by browsing its family', () => {
    const families = new Set(index.flatMap((c) => c.families))
    const reached = new Set()
    for (const family of families) {
      for (const card of filterCards(index, { ...FILTER_DEFAULTS, family })) {
        reached.add(card.slug)
      }
    }
    expect(reached.size).toBe(index.length)
  })

  it('by searching its own title', () => {
    const unreachable = index.filter((card) => {
      const results = searchCards(index, card.title.replace(/\([^)]*\)/g, '').trim())
      return !results.some((r) => r.slug === card.slug)
    })
    expect(unreachable.map((c) => c.slug)).toEqual([])
  })
})
