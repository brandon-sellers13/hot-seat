import { browser } from '$app/environment'

/**
 * Lookup log.
 *
 * Which cards get opened during real use is the Phase 1 premise experiment: if
 * reference mode is genuinely useful on its own, this log fills up with the
 * metrics actually reached for, and that list is the honest answer to what the
 * study loop should prioritise.
 *
 * Local only. It never leaves the device, never syncs, and is not telemetry.
 */
const KEY = 'hot-seat:lookups'
const LIMIT = 500

const read = () => {
  if (!browser) return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const write = (entries) => {
  if (!browser) return
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(-LIMIT)))
  } catch {
    // Storage full or unavailable. The log is diagnostic, so losing it must
    // never interrupt someone looking a metric up.
  }
}

export const recordLookup = (slug) => {
  if (!browser || !slug) return
  write([...read(), { slug, at: new Date().toISOString() }])
}

export const lookupLog = () => read()

/** Most-opened cards, which is the number the experiment actually asks for. */
export const mostLookedUp = (limit = 10) => {
  const counts = new Map()
  for (const entry of read()) {
    counts.set(entry.slug, (counts.get(entry.slug) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug, count]) => ({ slug, count }))
}

export const clearLookups = () => {
  if (!browser) return
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Nothing to do; the log is best-effort by design.
  }
}
