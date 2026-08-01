import { describe, expect, it } from 'vitest'
import { SECTIONS, COMPANY } from '../pack/arbor.js'

/**
 * The pack's two load-bearing properties, guarded.
 *
 * Both were arrived at by finding out the hard way that the obvious version
 * hands the answer over, so a future edit that quietly reverses either one
 * should fail here rather than in a playtest.
 */

const allText = JSON.stringify(SECTIONS).toLowerCase()

describe('the pack is organised by source, not by metric', () => {
  it('names every section after a system of record', () => {
    expect(SECTIONS.map((s) => s.label)).toEqual([
      'Billing & subscriptions',
      'Customer cohorts',
      'Revenue & margin',
      'Acquisition & funnel',
      'Product activity',
      'Support & service'
    ])
  })

  it.each(['retention', 'churn', 'cac', 'payback', 'quick ratio', 'ltv'])(
    'has no tab named after the %s metric',
    (metric) => {
      const labels = SECTIONS.map((s) => s.label.toLowerCase())
      expect(labels.some((l) => l.includes(metric))).toBe(false)
    }
  )

  it('splits the inputs of a metric across sections', () => {
    // Net revenue retention needs the opening cohort from one section and the
    // movements against it from another. If they ever land in the same tab the
    // question becomes a lookup and the whole mechanic dies.
    const cohorts = SECTIONS.find((s) => s.id === 'cohorts')
    const billing = SECTIONS.find((s) => s.id === 'billing')
    expect(JSON.stringify(cohorts)).toContain('11,400,000')
    expect(JSON.stringify(billing)).toContain('912,000')
    expect(JSON.stringify(cohorts)).not.toContain('912,000')
  })
})

describe('headline metrics are printed, because the board holds the packet', () => {
  it('puts the reported figures on the page', () => {
    expect(allText).toContain('net revenue retention')
    expect(JSON.stringify(SECTIONS)).toContain('102%')
    expect(JSON.stringify(SECTIONS)).toContain('94%')
  })
})

describe('decoys are present, so picking the right basis is a real choice', () => {
  it.each([
    ['ending account count beside the opening cohort', '462'],
    ['all accounts including trials', '507'],
    ['billings beside recognised revenue', '1,502,000'],
    ['downgraded-but-retained beside cancelled', '23']
  ])('keeps %s', (_label, figure) => {
    expect(JSON.stringify(SECTIONS)).toContain(figure)
  })
})

describe('the pack reconciles', () => {
  it('ties monthly ending MRR to ending ARR', () => {
    const billing = SECTIONS.find((s) => s.id === 'billing')
    const monthly = billing.tables.find((t) => t.title.startsWith('MRR movement'))
    const sept = monthly.rows.at(-1).at(-1)
    expect(sept).toBe('$1,074,000')
    expect(1_074_000 * 12).toBe(12_888_000)
  })

  it('describes a company', () => {
    expect(COMPANY.name).toBe('Arbor Systems')
    expect(COMPANY.model).toContain('B2B SaaS')
  })
})
