import summary from '$corpus/summary.json'

/**
 * Corpus access.
 *
 * The summary is small and imported eagerly so the shell can show real counts
 * instead of placeholders. The card set is 1.2MB and is loaded on demand, so it
 * only costs anything for someone who actually opens reference mode. The
 * service worker caches it after the first load, which is what makes the corpus
 * available with the network off.
 */

export const corpusStats = () => ({
  cards: summary.cards,
  narrative: summary.narrative,
  questions: summary.questions,
  sourced: summary.benchmark_present,
  absent: summary.benchmark_absent,
  byFamily: summary.by_family,
  byTier: summary.by_tier,
  promptTypes: summary.prompt_types
})

let cache = null

/** Load the full card set once, then serve it from memory. */
export const loadCards = async () => {
  if (!cache) {
    const data = await import('$corpus/cards.json')
    cache = data.default ?? data
  }
  return cache
}

export const FAMILY_LABELS = {
  'retention-churn': 'Retention and churn',
  'unit-economics': 'Unit economics',
  'revenue-quality': 'Revenue quality',
  'acquisition-paid-media': 'Acquisition and paid media',
  'engagement-activation': 'Engagement and activation',
  'consumer-subscription': 'Consumer subscription',
  'b2b-pipeline-sales': 'B2B pipeline and sales',
  'growth-efficiency': 'Growth efficiency'
}

export const TIER_LABELS = {
  primary: 'Primary source, read directly',
  secondary: 'Secondary source',
  weak: 'Weak, no disclosed methodology',
  none: 'No credible source found',
  untagged: 'Not tagged'
}
