import { browser } from '$app/environment'

/**
 * Local progress: today's chain and the streak.
 *
 * Written locally first and synced when signed in, so the Daily is playable
 * with the network off and nothing is lost by a dropped connection mid-chain.
 */
const DAY_KEY = 'hot-seat:day'
const STREAK_KEY = 'hot-seat:streak'

const read = (key, fallback) => {
  if (!browser) return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  if (!browser) return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private browsing. Play continues; only persistence is lost.
  }
}

export const loadDay = (day) => {
  const saved = read(DAY_KEY, null)
  return saved && saved.day === day ? saved : null
}

export const saveDay = (day, state) => write(DAY_KEY, { day, ...state })

export const loadStreak = () => read(STREAK_KEY, { current: 0, longest: 0, lastPlayedOn: null })

/**
 * Advance the streak for a completed day.
 *
 * Idempotent: completing the same day twice does not double-count, which is
 * what stops a reload inflating the only number the habit is measured by.
 */
export const completeDay = (day) => {
  const streak = loadStreak()
  if (streak.lastPlayedOn === day) return streak

  const yesterday = new Date(`${day}T00:00:00`)
  yesterday.setDate(yesterday.getDate() - 1)
  const wasYesterday = streak.lastPlayedOn === yesterday.toISOString().slice(0, 10)

  const current = wasYesterday ? streak.current + 1 : 1
  const next = {
    current,
    longest: Math.max(streak.longest, current),
    lastPlayedOn: day
  }
  write(STREAK_KEY, next)
  return next
}
