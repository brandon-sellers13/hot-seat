import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  DAILY_LENGTH,
  dailySeed,
  localDay,
  mulberry32,
  pickDaily,
  promptInventory,
  resultTile
} from '../daily.js'

const cards = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('../../../../corpus/data/cards.json', import.meta.url)),
    'utf8'
  )
).cards

describe('the same day gives everyone the same five', () => {
  it('is stable across calls', () => {
    const a = pickDaily(cards, { day: '2026-08-01' })
    const b = pickDaily(cards, { day: '2026-08-01' })
    expect(a.map((p) => `${p.slug}:${p.facet}`)).toEqual(b.map((p) => `${p.slug}:${p.facet}`))
  })

  it('differs from one day to the next', () => {
    const a = pickDaily(cards, { day: '2026-08-01' }).map((p) => p.slug)
    const b = pickDaily(cards, { day: '2026-08-02' }).map((p) => p.slug)
    expect(a).not.toEqual(b)
  })

  it('gives five prompts', () => {
    expect(pickDaily(cards, { day: '2026-08-01' })).toHaveLength(DAILY_LENGTH)
  })

  it('holds over a long run of days', () => {
    for (let i = 0; i < 60; i += 1) {
      const day = `2026-09-${String((i % 30) + 1).padStart(2, '0')}`
      expect(pickDaily(cards, { day })).toHaveLength(DAILY_LENGTH)
    }
  })
})

describe('content rules hold every day', () => {
  const days = Array.from({ length: 40 }, (_, i) => `2026-1${i % 2}-${String((i % 28) + 1).padStart(2, '0')}`)

  it('always includes a benchmark question', () => {
    // The question most likely to be asked in a real room, and the one people
    // are least able to produce cold.
    for (const day of days) {
      const picked = pickDaily(cards, { day })
      expect(picked.some((p) => p.facet === 'benchmark')).toBe(true)
    }
  })

  it('never asks about the same metric twice in one day', () => {
    for (const day of days) {
      const slugs = pickDaily(cards, { day }).map((p) => p.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
    }
  })

  it('only ever asks what the corpus can answer', () => {
    const askable = new Set(
      cards.flatMap((c) => (c.supported_prompt_types ?? []).map((f) => `${c.slug}:${f}`))
    )
    for (const day of days) {
      for (const prompt of pickDaily(cards, { day })) {
        expect(askable.has(`${prompt.slug}:${prompt.facet}`)).toBe(true)
      }
    }
  })
})

describe('due cards are favoured without becoming a rut', () => {
  it('puts due prompts in the day when there are enough of them', () => {
    const inventory = promptInventory(cards)
    const due = new Set(inventory.slice(0, 40).map((p) => `${p.slug}:${p.facet}`))
    const picked = pickDaily(cards, { day: '2026-08-05', due })
    const dueCount = picked.filter((p) => due.has(`${p.slug}:${p.facet}`)).length
    expect(dueCount).toBeGreaterThan(0)
  })

  it('still fills the day when nothing is due', () => {
    expect(pickDaily(cards, { day: '2026-08-05', due: new Set() })).toHaveLength(DAILY_LENGTH)
  })

  it('does not show an identical set on consecutive days just because they are due', () => {
    // Strict due-ordering would serve the same worst cards every day until they
    // came right, which is how a daily habit dies.
    const inventory = promptInventory(cards)
    const due = new Set(inventory.slice(0, 40).map((p) => `${p.slug}:${p.facet}`))
    const a = pickDaily(cards, { day: '2026-08-05', due }).map((p) => p.slug)
    const b = pickDaily(cards, { day: '2026-08-06', due }).map((p) => p.slug)
    expect(a).not.toEqual(b)
  })
})

describe('the seed', () => {
  it('is stable for a given day', () => {
    expect(dailySeed('2026-08-01')).toBe(dailySeed('2026-08-01'))
  })

  it('differs between days', () => {
    expect(dailySeed('2026-08-01')).not.toBe(dailySeed('2026-08-02'))
  })

  it('produces a repeatable stream', () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  it('stays within range', () => {
    const random = mulberry32(7)
    for (let i = 0; i < 500; i += 1) {
      const value = random()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })
})

describe('the local day', () => {
  it('is a plain date string', () => {
    expect(localDay(new Date('2026-08-01T12:00:00Z'))).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('uses local time rather than UTC, so a streak matches the player day', () => {
    const lateEvening = new Date('2026-08-01T23:30:00')
    expect(localDay(lateEvening)).toBe('2026-08-01')
  })
})

describe('the shareable tile gives away outcomes and nothing else', () => {
  it('renders a square per answer with the score', () => {
    const tile = resultTile('2026-08-01', ['correct', 'correct', 'partial', 'wrong', 'correct'])
    expect(tile).toContain('🟩🟩🟨🟥🟩')
    expect(tile).toContain('3/5')
  })

  it('leaks neither the questions nor the answers', () => {
    const tile = resultTile('2026-08-01', ['correct', 'wrong', 'wrong', 'wrong', 'wrong'])
    expect(tile).not.toMatch(/retention|churn|definition/i)
  })

  it('shows an ungraded answer as blank rather than as a failure', () => {
    // A provider outage must not read as the player getting it wrong.
    expect(resultTile('2026-08-01', ['ungraded'])).toContain('⬜')
  })
})
