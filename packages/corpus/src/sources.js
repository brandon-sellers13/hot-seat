/**
 * Per-file configuration for the corpus extraction.
 *
 * The ten research files were written at different times and do not share a
 * schema. Rather than pretend they do, each one declares how it is shaped and
 * the parser adapts. The rule that holds across all of them is that a metric is
 * a NUMBERED heading at that file's own metric level; unnumbered headings at the
 * same level are structural (PART dividers, SECTION groupings, appendices, the
 * "metrics I considered and excluded" trailers) and are not metrics.
 *
 * Verified against the corpus on 2026-07-30: this configuration yields exactly
 * 226 numbered metric sections, which reconciles with the corpus review.
 */

/** Facet labels the corpus uses, in the order they should appear on a card. */
export const FACET_KEYS = [
  'applies_to',
  'definition',
  'formula_variants',
  'inputs',
  'application',
  'benchmark',
  'traps',
  'related'
]

/** Facets a card cannot be considered complete without. */
export const REQUIRED_FACETS = ['definition']

/** Marker the corpus uses when no primary publisher supplies a benchmark. */
export const ABSENT_BENCHMARK_MARKER = 'NO SOURCED BENCHMARK FOUND'

export const SOURCES = [
  {
    file: '01-retention-churn.md',
    family: 'retention-churn',
    title: 'Retention and churn',
    metricLevel: 2
  },
  {
    file: '02-unit-economics.md',
    family: 'unit-economics',
    title: 'Unit economics',
    metricLevel: 2
  },
  {
    file: '03-revenue-quality.md',
    family: 'revenue-quality',
    title: 'Revenue and revenue quality',
    metricLevel: 2
  },
  {
    // Prose supplement. Primary-source research on why "bookings" has no
    // standard definition. Interrogation content rather than metric cards.
    file: '03a-bookings-acv-tcv-primary-sources.md',
    family: 'revenue-quality',
    title: 'Bookings, ACV and TCV: primary sources',
    metricLevel: 3,
    supplement: true
  },
  {
    // Prose supplement. Three unrelated metrics share the name "quick ratio",
    // which is the single most useful confusion pair in the corpus.
    file: '03b-quick-ratio-name-collision.md',
    family: 'revenue-quality',
    title: 'Quick ratio: the name collision',
    metricLevel: 2,
    supplement: true
  },
  {
    // h1 headings here are PART dividers, not metrics.
    file: '04-acquisition-paid-media.md',
    family: 'acquisition-paid-media',
    title: 'Acquisition, funnel and paid media',
    metricLevel: 2
  },
  {
    // h2 headings here are SECTION groupings; metrics sit one level deeper.
    file: '05-engagement-activation.md',
    family: 'engagement-activation',
    title: 'Engagement, activation and product',
    metricLevel: 3
  },
  {
    file: '06-consumer-subscription.md',
    family: 'consumer-subscription',
    title: 'Consumer subscription and app store',
    metricLevel: 2,
    // Numbered h3 sections under "READ THIS FIRST" are essays about what breaks
    // this family. They are real content and worth questioning on, but they are
    // not metrics and cannot support a formula or benchmark prompt.
    essays: { level: 3, under: 'READ THIS FIRST' }
  },
  {
    // The only file where metrics are h1.
    file: '07-b2b-pipeline-sales.md',
    family: 'b2b-pipeline-sales',
    title: 'B2B pipeline, sales and demand generation',
    metricLevel: 1
  },
  {
    // Uses h3 headings for some facets instead of bold labels.
    file: '08-growth-efficiency.md',
    family: 'growth-efficiency',
    title: 'Growth efficiency, capital and board-level',
    metricLevel: 2,
    facetHeadings: true
  }
]

/** Sources that yield metric cards. */
export const METRIC_SOURCES = SOURCES.filter((s) => !s.supplement)

/** Sources that yield prose supplement entries. */
export const SUPPLEMENT_SOURCES = SOURCES.filter((s) => s.supplement)
