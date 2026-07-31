/**
 * The completeness invariant.
 *
 * The plan's execution note for this unit asks for this test before any
 * adapters exist, and the reason is worth stating: an extraction that silently
 * drops sections is indistinguishable from one that works, right up until a
 * metric you expected to be quizzed on never appears. Counts have to reconcile
 * against the source files, not against a number somebody wrote down once.
 *
 * Every expectation here is derived from the markdown at run time. Nothing is
 * hardcoded except the one total that the corpus review independently
 * established, which is the whole point of having it.
 */
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { METRIC_SOURCES, SOURCES, SUPPLEMENT_SOURCES } from '../sources.js'
import { researchPath, parseSource } from '../parse.js'

/** Count numbered headings at a given level, straight from the raw markdown. */
const countNumberedHeadings = (file, level) => {
  const md = readFileSync(researchPath(file), 'utf8')
  const pattern = new RegExp(`^#{${level}} \\d+\\. `, 'gm')
  return (md.match(pattern) ?? []).length
}

describe('every numbered section in the source becomes a record', () => {
  it.each(METRIC_SOURCES.map((s) => [s.file, s]))(
    '%s loses nothing',
    (_file, source) => {
      const expected = countNumberedHeadings(source.file, source.metricLevel)
      const { metrics, essays } = parseSource(source)

      expect(expected).toBeGreaterThan(0)
      // Essays are numbered too, but at a different level, so they must not be
      // counted against the metric total in either direction.
      expect(metrics).toHaveLength(expected)
      expect(metrics.every((m) => m.title.length > 0)).toBe(true)
      expect(essays.every((e) => e.is_metric === false)).toBe(true)
    }
  )

  it('reconciles to the 226 sections the corpus review found', () => {
    const total = METRIC_SOURCES.reduce(
      (n, source) => n + parseSource(source).metrics.length,
      0
    )
    expect(total).toBe(226)
  })

  it('per-family counts sum to the total, so nothing is double counted', () => {
    const byFamily = new Map()
    let total = 0
    for (const source of METRIC_SOURCES) {
      const { metrics } = parseSource(source)
      byFamily.set(source.family, (byFamily.get(source.family) ?? 0) + metrics.length)
      total += metrics.length
    }
    const summed = [...byFamily.values()].reduce((a, b) => a + b, 0)
    expect(summed).toBe(total)
  })
})

describe('structural headings are not mistaken for metrics', () => {
  it('excludes PART dividers, SECTION groupings and trailing essays', () => {
    const all = METRIC_SOURCES.flatMap((s) => parseSource(s).metrics.map((m) => m.title))
    const structural = [
      'PART 1: COST PRIMITIVES',
      'Metrics I considered and excluded, with reasons',
      'Cross-family dependencies',
      'Contents',
      'Metric index',
      'READ THIS FIRST: the three things that break this family'
    ]
    for (const heading of structural) {
      expect(all).not.toContain(heading)
    }
  })

  it('keeps the number out of the title', () => {
    const { metrics } = parseSource(METRIC_SOURCES[0])
    expect(metrics[0].title).toBe('Customer (Logo) Churn Rate')
    expect(metrics[0].ordinal).toBe(1)
  })
})

describe('the three consumer-subscription essays are found and marked', () => {
  it('yields exactly three, none of them metrics', () => {
    const source = METRIC_SOURCES.find((s) => s.family === 'consumer-subscription')
    const { essays } = parseSource(source)

    expect(essays).toHaveLength(3)
    expect(essays.map((e) => e.is_metric)).toEqual([false, false, false])
    expect(essays[0].title).toMatch(/App store take rate/)
  })
})

describe('prose supplements are parsed as supplements, not as metrics', () => {
  it.each(SUPPLEMENT_SOURCES.map((s) => [s.file, s]))('%s', (_file, source) => {
    const { metrics, essays } = parseSource(source)
    expect(metrics).toHaveLength(0)
    expect(essays.length).toBeGreaterThan(0)
    expect(essays.every((e) => e.is_metric === false)).toBe(true)
  })
})

describe('every configured source file actually exists', () => {
  it.each(SOURCES.map((s) => [s.file]))('%s is readable', (file) => {
    expect(() => readFileSync(researchPath(file), 'utf8')).not.toThrow()
  })
})
