import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { brief, matchToCorpus, partitionByFreshness, validateYourNumbers } from '../yourNumbers.js'

const example = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../../../../examples/your-numbers.example.json', import.meta.url)), 'utf8')
)
const cards = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../../../corpus/data/cards.json', import.meta.url)), 'utf8')
).cards

describe('the published example is valid against the loader', () => {
  it('passes', () => {
    const result = validateYourNumbers(example)
    expect(result.errors).toEqual([])
    expect(result.valid).toBe(true)
  })
})

describe('errors are reported by path, not as one unhelpful failure', () => {
  it('names the exact fact and field', () => {
    const doc = structuredClone(example)
    delete doc.facts[1].source
    const { errors } = validateYourNumbers(doc)
    expect(errors.some((e) => e.path === '/facts/1/source')).toBe(true)
  })

  it('rejects an undated fact', () => {
    const doc = structuredClone(example)
    doc.facts[0].as_of = 'last quarter'
    expect(validateYourNumbers(doc).errors.some((e) => e.path === '/facts/0/as_of')).toBe(true)
  })

  it('rejects a file with no facts', () => {
    expect(validateYourNumbers({ ...example, facts: [] }).valid).toBe(false)
  })

  it('does not throw on rubbish input', () => {
    expect(validateYourNumbers(null).valid).toBe(false)
    expect(validateYourNumbers('nope').valid).toBe(false)
  })

  it('requires a source, because an unsourced number cannot be defended', () => {
    const doc = structuredClone(example)
    doc.facts[0].source = ''
    const { errors } = validateYourNumbers(doc)
    expect(errors.find((e) => e.path === '/facts/0/source').message).toMatch(/cannot be defended/)
  })
})

describe('stale facts are retired rather than asked about', () => {
  const now = new Date('2026-07-30T00:00:00Z')

  it('keeps figures inside one reporting period', () => {
    const doc = { company: { reporting_cadence: 'monthly' }, facts: [{ as_of: '2026-07-15' }] }
    expect(partitionByFreshness(doc, now).fresh).toHaveLength(1)
  })

  it('retires a figure older than the period', () => {
    // Being drilled on a number you have replaced trains the wrong answer.
    const doc = { company: { reporting_cadence: 'monthly' }, facts: [{ as_of: '2026-01-01' }] }
    const { fresh, stale } = partitionByFreshness(doc, now)
    expect(fresh).toHaveLength(0)
    expect(stale).toHaveLength(1)
  })

  it('gives quarterly reporters a longer window', () => {
    const fact = { as_of: '2026-06-01' }
    expect(partitionByFreshness({ company: { reporting_cadence: 'monthly' }, facts: [fact] }, now).stale).toHaveLength(1)
    expect(partitionByFreshness({ company: { reporting_cadence: 'quarterly' }, facts: [fact] }, now).fresh).toHaveLength(1)
  })

  it('treats an unparseable date as stale rather than trusting it', () => {
    const doc = { company: { reporting_cadence: 'monthly' }, facts: [{ as_of: 'whenever' }] }
    expect(partitionByFreshness(doc, now).stale).toHaveLength(1)
  })
})

describe('facts are matched to real corpus cards', () => {
  it('matches the example against the corpus', () => {
    const { matched } = matchToCorpus(example.facts, cards)
    expect(matched.length).toBeGreaterThan(0)
    expect(matched[0].card.slug).toBe(matched[0].fact.metric)
  })

  it('reports an unknown slug instead of silently dropping it', () => {
    const { unmatched } = matchToCorpus([{ metric: 'not-a-real-metric' }], cards)
    expect(unmatched).toHaveLength(1)
  })
})

describe('the briefing gives the board real stakes', () => {
  const { matched } = matchToCorpus(example.facts, cards)

  it('carries the figure, direction, benchmark position and source', () => {
    const text = brief(example, matched)
    expect(text).toContain('LANTERN LABS')
    expect(text).toContain('Source:')
    expect(text).toMatch(/improving|worsening|flat/)
  })

  it('flags a fact with no stated plan, since that is the half people skip', () => {
    const withoutPlan = matched.filter(({ fact }) => !fact.strategy?.length)
    if (withoutPlan.length > 0) {
      expect(brief(example, withoutPlan)).toContain('NO STATED PLAN')
    }
  })

  it('returns nothing when there is nothing matched, rather than an empty header', () => {
    expect(brief(example, [])).toBe('')
  })
})
