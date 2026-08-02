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
  sessionsPerWeek: Number(process.env.LIMIT_SESSIONS_PER_WEEK ?? 10),
  /**
   * The circuit breaker and the hard guarantee. Expressed in sessions per day
   * so it reads at a glance. Setting this to 0 is the documented kill switch:
   * the game degrades to reference mode rather than erroring.
   */
  sessionsPerDayGlobal: Number(process.env.LIMIT_SESSIONS_PER_DAY_GLOBAL ?? 400),
  /**
   * Exchanges per meeting, enforced server-side.
   *
   * This is what actually bounds spend, and it was missing. Generation is the
   * expensive call and nothing counted it: the hourly limiter counts rows in
   * `attempts`, which only /grade writes, so a caller who generated exchanges
   * and never answered was never metered at all.
   *
   * Total generations per player per week is now sessionsPerWeek x this, which
   * is the ceiling the plan always described and never enforced.
   */
  exchangesPerSession: Number(process.env.LIMIT_EXCHANGES_PER_SESSION ?? 20),
  /**
   * Largest board pack accepted, in bytes of JSON. The pack is sent by the
   * client and goes straight into the prompt, so without this the per-call cost
   * is set by the caller rather than by us. The demo pack is about 15KB.
   */
  packBytes: Number(process.env.LIMIT_PACK_BYTES ?? 65_536)
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

/**
 * Count rows across all users, for the global ceiling only.
 *
 * A plain fetch rather than the Supabase client on purpose. This is the spend
 * guardrail, and it should depend on as little as possible: the client library
 * initialises a realtime WebSocket stack that this never uses and that needs a
 * polyfill below Node 22. One HTTP request with a count header has no such
 * failure modes and is easier to reason about when it is the thing standing
 * between a bug and an unbounded bill.
 */
const countAll = async (table, sinceIso) => {
  const url = `${process.env.PUBLIC_SUPABASE_URL}/rest/v1/${table}?select=id&started_at=gte.${sinceIso}`
  const response = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: 'count=exact',
      Range: '0-0'
    }
  })
  if (!response.ok) throw new Error(`count failed: ${response.status}`)
  // content-range comes back as "0-0/123"; the total is what we want.
  const total = Number((response.headers.get('content-range') ?? '').split('/')[1])
  return Number.isFinite(total) ? total : 0
}

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
  // A MISSING KEY IS NOT A TRANSIENT ERROR, AND MUST NOT FAIL OPEN.
  //
  // This ceiling is the only hard guarantee on spend and the documented kill
  // switch. Without the service-role key it cannot count anything, and an
  // earlier version returned "allowed" in that case, which meant the control
  // looked present in the code, read as enforced in the plan, and did nothing
  // at all. A cap that silently fails open is worse than no cap, because it
  // stops anyone looking for the real one.
  //
  // So a misconfiguration closes the expensive endpoint rather than opening it.
  // The Daily is uncapped by design and keeps working, as does reference mode,
  // so the failure is loud without taking the whole product down.
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return {
      allowed: false,
      misconfigured: true,
      reason:
        'SUPABASE_SERVICE_ROLE_KEY is not set, so the daily session ceiling cannot be enforced. Hot Seat sessions are disabled until it is.'
    }
  }

  try {
    const used = await countAll('sessions', since(DAY))
    return {
      allowed: used < LIMITS.sessionsPerDayGlobal,
      used,
      limit: LIMITS.sessionsPerDayGlobal
    }
  } catch {
    // A query failure IS transient, and blocking every player over a momentary
    // database blip is the wrong trade. The per-user weekly cap still stands.
    return { allowed: true, degraded: true }
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
