/**
 * The Daily: five prompts, the same five for everyone, chosen from the date.
 *
 * Selection is deterministic and needs no server. Two people comparing results
 * must have answered identical questions or the shared tile means nothing, and
 * a date-seeded generator gives that for free while keeping the choice
 * unpredictable in advance.
 */

/** YYYY-MM-DD in the player's own timezone, because a day is a local thing. */
export const localDay = (date = new Date()) => {
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

/** Stable 32-bit hash of the day string. */
export const dailySeed = (day) => {
  let hash = 2166136261
  for (let i = 0; i < day.length; i += 1) {
    hash ^= day.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Small, fast, seedable PRNG. Identical output for identical seeds. */
export const mulberry32 = (seed) => {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const DAILY_LENGTH = 5

/** Every question the corpus can actually ask, as {slug, facet} pairs. */
export const promptInventory = (cards) =>
  cards.flatMap((card) =>
    (card.supported_prompt_types ?? []).map((facet) => ({
      slug: card.slug,
      title: card.title,
      facet,
      families: card.families,
      hasBenchmark: card.facets.benchmark.state === 'present',
      benchmarkAbsent: card.facets.benchmark.state === 'absent'
    }))
  )

const shuffleInPlace = (items, random) => {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

/**
 * Pick the day's five.
 *
 * Weighted toward prompts that are due, so the scheduler still drives what gets
 * asked, but the weighting is applied to a date-seeded shuffle rather than a
 * strict ordering. Strict due-order would show the same person the same worst
 * cards every day until they got them right, which is demoralising and is how
 * a daily habit dies.
 *
 * Two content rules from the plan hold regardless of the shuffle: at least one
 * benchmark question, and no two questions about the same metric.
 */
export const pickDaily = (cards, { day = localDay(), due = new Set(), count = DAILY_LENGTH } = {}) => {
  const random = mulberry32(dailySeed(day))
  const inventory = promptInventory(cards)
  if (inventory.length === 0) return []

  const key = (p) => `${p.slug}:${p.facet}`
  const pool = shuffleInPlace([...inventory], random)

  // Due prompts sort first, and the shuffle above decides order within each
  // group, so the selection is both scheduled and varied.
  pool.sort((a, b) => Number(due.has(key(b))) - Number(due.has(key(a))))

  const picked = []
  const usedSlugs = new Set()

  const take = (predicate) => {
    for (const prompt of pool) {
      if (picked.length >= count) return
      if (usedSlugs.has(prompt.slug)) continue
      if (!predicate(prompt)) continue
      picked.push(prompt)
      usedSlugs.add(prompt.slug)
      return
    }
  }

  // A benchmark question every day, because a benchmark you cannot produce is
  // the question most likely to be asked in a real room.
  take((p) => p.facet === 'benchmark')

  // Roughly one day in four, ask about a metric nobody publishes a benchmark
  // for. Recognising that is a genuinely useful and rarely held skill.
  if (random() < 0.25) take((p) => p.benchmarkAbsent && p.facet === 'traps')

  while (picked.length < count) {
    const before = picked.length
    take(() => true)
    if (picked.length === before) break
  }

  return picked.slice(0, count)
}

/** The shareable tile: outcomes only, never the questions or the answers. */
export const resultTile = (day, verdicts) => {
  const glyph = { correct: '🟩', partial: '🟨', wrong: '🟥', ungraded: '⬜' }
  const squares = verdicts.map((v) => glyph[v] ?? '⬜').join('')
  const score = verdicts.filter((v) => v === 'correct').length
  return `The Hot Seat ${day}\n${squares} ${score}/${verdicts.length}`
}
