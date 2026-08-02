import { describe, expect, it } from 'vitest'
import {
  DECISIONS,
  MEETING_LENGTHS,
  OUTCOMES,
  SHAPES,
  cycle,
  planMeeting
} from '../meeting.js'
import { SHAPES as SERVER_SHAPES } from '../../../../functions/src/lib/meeting.js'
import { ANSWERABLE } from '../pack/arbor.js'

/** Deterministic stand-in for Math.random, cycling through fixed draws. */
const sequence = (draws) => {
  let i = 0
  return () => draws[i++ % draws.length]
}

describe('the running order', () => {
  it('asks every metric once before it asks any of them twice', () => {
    const slugs = ['a', 'b', 'c', 'd']
    const dealt = cycle(slugs, 4, sequence([0]))
    expect([...dealt].sort()).toEqual(slugs)
  })

  it('deals as many as the meeting is long, past the size of the deck', () => {
    expect(cycle(['a', 'b', 'c'], 20, Math.random)).toHaveLength(20)
  })

  it('never repeats a metric back-to-back across a reshuffle', () => {
    // The only repeat a player actually notices is the same metric twice in a
    // row, and a reshuffle is exactly where that would happen.
    for (let run = 0; run < 200; run += 1) {
      const dealt = cycle(['a', 'b', 'c', 'd'], 20, Math.random)
      for (let i = 1; i < dealt.length; i += 1) {
        expect(dealt[i]).not.toBe(dealt[i - 1])
      }
    }
  })

  it('returns nothing rather than looping forever on an empty deck', () => {
    expect(cycle([], 6, Math.random)).toEqual([])
  })

  it('pairs every exchange with a shape', () => {
    const plan = planMeeting({ slugs: ['a', 'b'], count: MEETING_LENGTHS.long })
    expect(plan).toHaveLength(MEETING_LENGTHS.long)
    plan.forEach((entry) => {
      expect(SHAPES).toContain(entry.shape)
      expect(['a', 'b']).toContain(entry.slug)
    })
  })

  it('uses all four shapes in a short meeting rather than one of them six times', () => {
    const plan = planMeeting({ slugs: [...ANSWERABLE], count: MEETING_LENGTHS.short })
    expect(new Set(plan.map((p) => p.shape)).size).toBe(SHAPES.length)
  })

  it('varies which shape a metric arrives in between meetings', () => {
    // Cards and shapes are cycled independently, so the same metric does not
    // always turn up as the same kind of question.
    const pairings = new Set()
    for (let run = 0; run < 50; run += 1) {
      planMeeting({ slugs: [...ANSWERABLE], count: MEETING_LENGTHS.short }).forEach((p) =>
        pairings.add(`${p.slug}:${p.shape}`)
      )
    }
    expect(pairings.size).toBeGreaterThan(ANSWERABLE.size)
  })
})

describe('the shape list is duplicated, so it is checked', () => {
  it('matches the server, which is the one that validates it', () => {
    // The client cannot import the server module directly: it reaches budget.js
    // and pulls the Supabase client into a browser bundle. So the two lists are
    // written twice and compared here.
    //
    // This drift is quiet without the check. An unrecognised shape is dropped
    // server-side and the exchange generates with no shape guidance at all, so
    // a rename would not break anything visible. It would just stop the variety
    // working while continuing to look like it was working.
    expect(SHAPES).toEqual(SERVER_SHAPES)
  })
})

describe('the ending copy', () => {
  it('covers every decision and every outcome the server can return', () => {
    expect(Object.keys(DECISIONS).sort()).toEqual(['approved', 'deferred', 'redirected'])
    expect(Object.keys(OUTCOMES).sort()).toEqual([
      'abandoned',
      'burned',
      'survived',
      'wounded'
    ])
  })

  it('says the ask was moved rather than lost when the board redirected it', () => {
    // Conceding a point that deserved conceding is the strongest answer
    // available in one of the four worked examples. An ending that read it as a
    // defeat would be telling the player their best answer was a mistake.
    expect(DECISIONS.redirected).toMatch(/better meeting/)
  })
})
