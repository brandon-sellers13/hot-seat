import { createClient } from '@supabase/supabase-js'

/**
 * Budget and abuse controls.
 *
 * Shared by both functions rather than living in the grader alone, because
 * interrogation is the expensive endpoint and a max-turn cap bounds one session
 * rather than a thousand.
 *
 * The controls are expressed in sessions and answers rather than in dollars.
 * Model choice moves the total by a few hundred a year; engagement moves it by
 * thousands. Success is what breaks this budget, and no amount of model tuning
 * prevents that, so the ceiling has to be enforced rather than estimated.
 */

export const LIMITS = {
  /** Graded answers per hour per identity. Aimed at scripts, not players. */
  answersPerHour: Number(process.env.LIMIT_ANSWERS_PER_HOUR ?? 60),
  /**
   * Hot Seat sessions per week per player. The primary budget lever, because
   * sessions are effectively the entire bill. Set generously enough that
   * ordinary play never touches it.
   */
  sessionsPerWeek: Number(process.env.LIMIT_SESSIONS_PER_WEEK ?? 2),
  /**
   * The circuit breaker and the hard guarantee. Expressed in sessions per day
   * so it reads at a glance. Setting this to 0 is the documented kill switch:
   * the game degrades to reference mode rather than erroring.
   */
  sessionsPerDayGlobal: Number(process.env.LIMIT_SESSIONS_PER_DAY_GLOBAL ?? 400)
}

/** Distinguishes "you have hit a limit" from "something broke". */
export class BudgetError extends Error {
  constructor(message, { kind, retryAfter } = {}) {
    super(message)
    this.name = 'BudgetError'
    this.kind = kind
    this.retryAfter = retryAfter
  }
}

/**
 * A client acting as the signed-in user, so row-level security scopes every
 * query automatically. Per-user counting needs no WHERE clause and cannot leak
 * another player's rows even if one were forgotten.
 */
export const userClient = (accessToken) =>
  createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false }
  })

/** Service-role client. Only for the global ceiling, which spans all users. */
const adminClient = () =>
  createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

const since = (ms) => new Date(Date.now() - ms).toISOString()

const HOUR = 3600_000
const WEEK = 7 * 24 * HOUR
const DAY = 24 * HOUR

/**
 * Rate limit on graded answers, counted from the attempts table rather than a
 * separate counter. One source of truth, and the audit trail is the same data
 * the progress screens read.
 */
export const checkAnswerRate = async (supabase) => {
  const { count, error } = await supabase
    .from('attempts')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', since(HOUR))

  // Failing open on a counting error is the right trade: a player blocked by
  // an infrastructure blip is a worse outcome than an hour of unmetered use,
  // and the global ceiling still stands behind this.
  if (error) return { allowed: true, degraded: true }

  return {
    allowed: (count ?? 0) < LIMITS.answersPerHour,
    used: count ?? 0,
    limit: LIMITS.answersPerHour
  }
}

/** Weekly Hot Seat cap for one player. Checked when a session starts. */
export const checkSessionCap = async (supabase) => {
  const { count, error } = await supabase
    .from('sessions')
    .select('id', { count: 'exact', head: true })
    .gte('started_at', since(WEEK))

  if (error) return { allowed: true, degraded: true }

  return {
    allowed: (count ?? 0) < LIMITS.sessionsPerWeek,
    used: count ?? 0,
    limit: LIMITS.sessionsPerWeek
  }
}

/**
 * The global ceiling. One config value, no code change, no data loss when it
 * trips: the game says the grader is resting and reference mode keeps working.
 */
export const checkGlobalCeiling = async () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return { allowed: true, degraded: true }

  const { count, error } = await adminClient()
    .from('sessions')
    .select('id', { count: 'exact', head: true })
    .gte('started_at', since(DAY))

  if (error) return { allowed: true, degraded: true }

  return {
    allowed: (count ?? 0) < LIMITS.sessionsPerDayGlobal,
    used: count ?? 0,
    limit: LIMITS.sessionsPerDayGlobal
  }
}

/**
 * A player-supplied key bypasses the caps for that request only.
 *
 * Never written to the database, never logged, never persisted anywhere. It
 * exists so a self-hoster or a heavy user can get past the limits without the
 * project having to pay for them, and it is an option rather than a gate.
 */
export const resolveApiKey = (headers) => {
  const byo = headers['x-openai-key'] ?? headers['X-OpenAI-Key']
  if (byo && typeof byo === 'string' && byo.startsWith('sk-')) {
    return { apiKey: byo, bringYourOwn: true }
  }
  return { apiKey: process.env.OPENAI_API_KEY, bringYourOwn: false }
}
