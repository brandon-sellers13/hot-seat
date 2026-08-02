import { describe, expect, it, vi, beforeEach } from 'vitest'
import { LIMITS } from '../lib/budget.js'

/**
 * The spend guard on generation.
 *
 * Written after review found that the first version of /exchange was unmetered:
 * it checked an hourly limiter that counts rows in `attempts`, a table only
 * /grade writes, so generating exchanges without ever answering incremented
 * nothing. Generation is roughly eight times the cost of grading, so the cheap
 * call was carefully guarded and the expensive one was open.
 *
 * These tests exercise the handler rather than the helpers, because the helpers
 * were correct the whole time. Nothing called them.
 */

const ok = (body) => ({
  httpMethod: 'POST',
  headers: { authorization: 'Bearer test-token' },
  body: JSON.stringify(body)
})

const pack = [{ id: 'billing', label: 'Billing', tables: [] }]
const card = { slug: 'net-revenue-retention', facets: { definition: 'x', formula_variants: {} } }

let state

vi.mock('../lib/budget.js', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    userClient: () => state.client,
    resolveApiKey: () => ({ apiKey: 'k', bringYourOwn: state.byok }),
    checkGlobalCeiling: async () => state.ceiling,
    checkSessionCap: async () => state.cap
  }
})

vi.mock('../lib/llm.js', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    grade: async () => {
      state.generated += 1
      return { metric: 'x', lines: [{ speaker: 'Elena', text: 'a' }], question: { speaker: 'Ravi', text: 'b?' }, strong_answer: 's', tests: 't', figures: [] }
    }
  }
})

const { handler } = await import('../exchange.js')

const sessionRow = (turn_count = 0, ended_at = null) => ({ id: 's1', turn_count, ended_at })

beforeEach(() => {
  state = {
    byok: false,
    generated: 0,
    ceiling: { allowed: true },
    cap: { allowed: true, used: 0 },
    existing: sessionRow(),
    inserted: sessionRow(),
    updates: []
  }
  state.client = {
    auth: { getUser: async () => ({ data: { user: { id: 'u1' } } }) },
    from: () => ({
      select: () => ({
        eq: () => ({ maybeSingle: async () => ({ data: state.existing }) })
      }),
      insert: () => ({ select: () => ({ single: async () => ({ data: state.inserted }) }) }),
      update: (patch) => ({
        eq: async () => {
          state.updates.push(patch)
          return {}
        }
      })
    })
  }
})

const body = (r) => JSON.parse(r.body)

describe('a meeting is the meter', () => {
  it('opens a session on the first exchange and returns its id', async () => {
    const r = await handler(ok({ card, pack }))
    expect(r.statusCode).toBe(200)
    expect(body(r).session_id).toBe('s1')
    expect(body(r).turn).toBe(1)
  })

  it('counts the exchange only after the model actually returned one', async () => {
    await handler(ok({ card, pack }))
    // The dealt card rides along in the same write, so the session records what
    // the meeting asked about rather than only the card it opened with.
    expect(state.updates).toEqual([{ turn_count: 1, cards: ['net-revenue-retention'] }])
    expect(state.generated).toBe(1)
  })

  it('refuses once the meeting has run its exchanges', async () => {
    state.existing = sessionRow(LIMITS.exchangesPerSession)
    const r = await handler(ok({ card, pack, sessionId: 's1' }))
    expect(r.statusCode).toBe(429)
    expect(body(r).error).toBe('meeting_over')
    // The point of the whole fix: no provider call on a refused request.
    expect(state.generated).toBe(0)
  })

  it('refuses an ended meeting', async () => {
    state.existing = sessionRow(2, '2026-08-01T00:00:00Z')
    const r = await handler(ok({ card, pack, sessionId: 's1' }))
    expect(r.statusCode).toBe(409)
    expect(state.generated).toBe(0)
  })

  it('refuses a session that is not the callers, which RLS hides entirely', async () => {
    state.existing = null
    const r = await handler(ok({ card, pack, sessionId: 'someone-elses' }))
    expect(r.statusCode).toBe(404)
    expect(state.generated).toBe(0)
  })
})

describe('the caps now actually fire on generation', () => {
  it('stops at the weekly meeting cap without calling the provider', async () => {
    state.cap = { allowed: false, used: LIMITS.sessionsPerWeek }
    const r = await handler(ok({ card, pack }))
    expect(r.statusCode).toBe(429)
    expect(body(r).error).toBe('session_cap')
    expect(state.generated).toBe(0)
  })

  it('honours the global ceiling, which is the documented kill switch', async () => {
    state.ceiling = { allowed: false }
    const r = await handler(ok({ card, pack }))
    expect(r.statusCode).toBe(503)
    expect(body(r).error).toBe('ceiling_reached')
    expect(state.generated).toBe(0)
  })

  it('refuses to generate when a meeting cannot be recorded', async () => {
    // An unmeterable meeting is the exact thing this function exists to prevent,
    // so a failed insert must close the endpoint rather than wave it through.
    state.inserted = null
    const r = await handler(ok({ card, pack }))
    expect(r.statusCode).toBe(503)
    expect(state.generated).toBe(0)
  })

  it('lets a player using their own key past the caps', async () => {
    state.byok = true
    state.cap = { allowed: false, used: 99 }
    state.ceiling = { allowed: false }
    const r = await handler(ok({ card, pack }))
    expect(r.statusCode).toBe(200)
    expect(body(r).session_id).toBeNull()
  })
})

describe('the caller does not get to decide what a request costs', () => {
  it('rejects an oversized board pack before any provider call', async () => {
    const huge = [{ id: 'x', label: 'x', tables: [{ note: 'y'.repeat(LIMITS.packBytes + 1) }] }]
    const r = await handler(ok({ card, pack: huge }))
    expect(r.statusCode).toBe(413)
    expect(state.generated).toBe(0)
  })

  it('accepts a pack the size of the real one', async () => {
    const real = [{ id: 'x', label: 'x', tables: [{ note: 'y'.repeat(20_000) }] }]
    expect((await handler(ok({ card, pack: real }))).statusCode).toBe(200)
  })
})

describe('the basics still hold', () => {
  it.each([
    ['no card', { pack }],
    ['no pack', { card }],
    ['empty pack', { card, pack: [] }]
  ])('rejects %s', async (_label, payload) => {
    expect((await handler(ok(payload))).statusCode).toBe(400)
  })

  it('requires a token', async () => {
    const r = await handler({ httpMethod: 'POST', headers: {}, body: JSON.stringify({ card, pack }) })
    expect(r.statusCode).toBe(401)
    expect(state.generated).toBe(0)
  })

  it('never emits the question twice', async () => {
    const r = await handler(ok({ card, pack }))
    const { lines, question } = body(r)
    expect(lines.some((l) => l.text === question.text)).toBe(false)
  })
})
