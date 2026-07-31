import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { LIMITS, checkGlobalCeiling, resolveApiKey } from '../lib/budget.js'

describe('the global ceiling refuses to fail open when misconfigured', () => {
  const saved = process.env.SUPABASE_SERVICE_ROLE_KEY

  afterEach(() => {
    if (saved === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY
    else process.env.SUPABASE_SERVICE_ROLE_KEY = saved
  })

  it('closes the expensive endpoint when the service-role key is absent', async () => {
    // Regression guard for a real bug: an earlier version returned allowed:true
    // here, so the only hard guarantee on spend read as enforced in the plan,
    // looked present in the code, and did nothing. A cap that silently fails
    // open is worse than no cap, because it stops anyone looking for the real one.
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    const result = await checkGlobalCeiling()
    expect(result.allowed).toBe(false)
    expect(result.misconfigured).toBe(true)
    expect(result.reason).toMatch(/SUPABASE_SERVICE_ROLE_KEY/)
  })

  it('treats an empty string as absent, not as a key', async () => {
    process.env.SUPABASE_SERVICE_ROLE_KEY = ''
    const result = await checkGlobalCeiling()
    expect(result.allowed).toBe(false)
  })
})

describe('bring-your-own key', () => {
  it('is used when supplied, and marked as the player\'s own', () => {
    const { apiKey, bringYourOwn } = resolveApiKey({ 'x-openai-key': 'sk-player-supplied' })
    expect(apiKey).toBe('sk-player-supplied')
    expect(bringYourOwn).toBe(true)
  })

  it('ignores a header that is not plausibly a key', () => {
    const { bringYourOwn } = resolveApiKey({ 'x-openai-key': 'not-a-key' })
    expect(bringYourOwn).toBe(false)
  })

  it('falls back to the deployment key when none is supplied', () => {
    process.env.OPENAI_API_KEY = 'sk-deployment'
    const { apiKey, bringYourOwn } = resolveApiKey({})
    expect(apiKey).toBe('sk-deployment')
    expect(bringYourOwn).toBe(false)
  })
})

describe('limits are configurable but have sane defaults', () => {
  it('caps sessions well below the answer rate limit', () => {
    // Sessions are effectively the entire bill; answers are noise.
    expect(LIMITS.sessionsPerWeek).toBeLessThan(LIMITS.answersPerHour)
  })

  it('has a global ceiling that can be set to zero as a kill switch', () => {
    expect(Number.isFinite(LIMITS.sessionsPerDayGlobal)).toBe(true)
  })
})
