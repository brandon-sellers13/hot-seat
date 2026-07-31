import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
// Draft 2020-12 build specifically. Ajv's default export is Draft-07 and will
// refuse this schema with a confusing "no schema with key or ref" error.
import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const read = (relative) =>
  JSON.parse(readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8'))

const schema = read('./your-numbers.schema.json')
const example = read('../examples/your-numbers.example.json')

const compile = () => {
  const ajv = new Ajv({ allErrors: true, strict: false })
  addFormats(ajv)
  return ajv.compile(schema)
}

/** A minimal file that satisfies every required field and nothing more. */
const minimal = () => ({
  schema_version: '1.0.0',
  company: { name: 'Lantern Labs', model: 'b2b_saas', reporting_cadence: 'monthly' },
  facts: [
    {
      metric: 'net-revenue-retention',
      as_of: '2026-06-30',
      magnitude: 'around 105 to 110 percent',
      direction: 'improving',
      vs_benchmark: 'at',
      source: 'finance close pack, produced monthly'
    }
  ]
})

describe('your-numbers schema', () => {
  it('is a compilable JSON Schema', () => {
    expect(() => compile()).not.toThrow()
  })

  it('accepts the published example', () => {
    const validate = compile()
    const ok = validate(example)
    // Surface the actual failures rather than a bare "expected true".
    expect(validate.errors ?? []).toEqual([])
    expect(ok).toBe(true)
  })

  it('accepts a minimal file with only required fields', () => {
    const validate = compile()
    expect(validate(minimal())).toBe(true)
  })
})

describe('the fields that make an answer defensible are mandatory', () => {
  // The scoring rubric turns on anchoring a number you can source and bridging
  // to strategy. A fact with no source cannot be defended in a real room, so
  // the contract refuses it rather than letting the game ask an unfair question.
  it.each(['metric', 'as_of', 'magnitude', 'direction', 'vs_benchmark', 'source'])(
    'rejects a fact missing %s',
    (field) => {
      const validate = compile()
      const doc = minimal()
      delete doc.facts[0][field]
      expect(validate(doc)).toBe(false)
    }
  )

  it('allows strategy to be absent, since it is scored rather than required', () => {
    const validate = compile()
    const doc = minimal()
    expect(doc.facts[0].strategy).toBeUndefined()
    expect(validate(doc)).toBe(true)
  })
})

describe('staleness handling depends on dates being real', () => {
  it('rejects an as_of that is not a date', () => {
    const validate = compile()
    const doc = minimal()
    doc.facts[0].as_of = 'last quarter'
    expect(validate(doc)).toBe(false)
  })

  it('rejects an as_of in the wrong format', () => {
    const validate = compile()
    const doc = minimal()
    doc.facts[0].as_of = '06/30/2026'
    expect(validate(doc)).toBe(false)
  })
})

describe('closed vocabularies stay closed', () => {
  it('rejects an unknown direction', () => {
    const validate = compile()
    const doc = minimal()
    doc.facts[0].direction = 'up a bit'
    expect(validate(doc)).toBe(false)
  })

  it('rejects an unknown company model', () => {
    const validate = compile()
    const doc = minimal()
    doc.company.model = 'marketplace'
    expect(validate(doc)).toBe(false)
  })

  it('accepts unknown as an honest answer for vs_benchmark', () => {
    const validate = compile()
    const doc = minimal()
    doc.facts[0].vs_benchmark = 'unknown'
    expect(validate(doc)).toBe(true)
  })
})

describe('typos are caught rather than silently ignored', () => {
  it('rejects an unexpected property on a fact', () => {
    const validate = compile()
    const doc = minimal()
    doc.facts[0].stratgey = ['typo that would otherwise vanish']
    expect(validate(doc)).toBe(false)
  })

  it('rejects a metric slug that is not kebab-case', () => {
    const validate = compile()
    const doc = minimal()
    doc.facts[0].metric = 'Net Revenue Retention'
    expect(validate(doc)).toBe(false)
  })

  it('requires at least one fact, since an empty file means an empty game', () => {
    const validate = compile()
    const doc = minimal()
    doc.facts = []
    expect(validate(doc)).toBe(false)
  })
})
