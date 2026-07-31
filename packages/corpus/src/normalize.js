/**
 * Sections to cards: classify, derive what each card can be asked, and merge
 * the same metric appearing in more than one family.
 */
import { bestTier, extractFacets, missingFacets, readTier } from './facets.js'
import { METRIC_SOURCES, SUPPLEMENT_SOURCES } from './sources.js'
import { parseSource } from './parse.js'

/**
 * A prompt type is only supported when the facet behind it actually carries
 * content. This is what stops the interrogator asking a question the corpus
 * cannot answer, which the plan names as the top risk for the Hot Seat.
 */
export const PROMPT_TYPES = [
  'definition',
  'formula',
  'inputs',
  'application',
  'benchmark',
  'traps'
]

/** Prompt types an essay or prose supplement can support. */
const NARRATIVE_PROMPT_TYPES = new Set(['definition', 'application', 'traps'])

export const supportedPromptTypes = (record) => {
  const { facets, is_metric: isMetric } = record
  const available = []

  if (facets.definition) available.push('definition')
  if (facets.formula_variants.text) available.push('formula')
  if (facets.inputs) available.push('inputs')
  if (facets.application) available.push('application')
  // An absent benchmark is still askable, but as a provenance question rather
  // than a recall one, so it is not offered as a benchmark prompt.
  if (facets.benchmark.state === 'present') available.push('benchmark')
  if (facets.traps) available.push('traps')

  return isMetric ? available : available.filter((t) => NARRATIVE_PROMPT_TYPES.has(t))
}

/** Richer of two cards, used to decide which wins when a duplicate merges. */
const richness = (card) =>
  [
    card.facets.definition,
    card.facets.formula_variants.text,
    card.facets.inputs,
    card.facets.application,
    card.facets.traps
  ].filter(Boolean).length + card.facets.benchmark.rows.length

/**
 * Merge two cards for the same metric that appear in different families.
 *
 * The richer entry supplies the facets. The thinner one contributes its family
 * and source file, so the card is reachable by browsing either family and the
 * report can show where it came from.
 */
export const mergeCards = (a, b) => {
  const [primary, secondary] = richness(a) >= richness(b) ? [a, b] : [b, a]
  const union = (x = [], y = []) => [...new Set([...x, ...y])]

  return {
    ...primary,
    families: union(primary.families, secondary.families),
    source_files: union(primary.source_files, secondary.source_files),
    facets: {
      ...primary.facets,
      traps: union(primary.facets.traps ?? [], secondary.facets.traps ?? []).length
        ? union(primary.facets.traps ?? [], secondary.facets.traps ?? [])
        : null,
      related: union(primary.facets.related ?? [], secondary.facets.related ?? []).length
        ? union(primary.facets.related ?? [], secondary.facets.related ?? [])
        : null
    },
    merged_from: union(primary.merged_from ?? [], [
      { family: secondary.families[0], title: secondary.title }
    ].map((m) => `${m.family}: ${m.title}`))
  }
}

const toCard = (record) => {
  const facets = extractFacets(record)
  const card = {
    slug: record.slug,
    title: record.title,
    is_metric: record.is_metric,
    kind: record.kind,
    families: [record.family],
    source_files: [record.source_file],
    ordinal: record.ordinal,
    // Verification tags annotate individual claims throughout a section, most
    // often on bullets in the prose rather than in benchmark table cells. The
    // card's tier is therefore the strongest tag anywhere in its body, which is
    // what the tags were actually written to describe.
    verification_tier: bestTier([
      readTier(record.body),
      ...facets.benchmark.rows.map((r) => r.tier)
    ]),
    facets,
    missing_facets: missingFacets(facets),
    merged_from: []
  }
  return { ...card, supported_prompt_types: supportedPromptTypes(card) }
}

/**
 * Build the full card set.
 *
 * Returns the cards plus the raw counts the extraction report needs. The counts
 * are computed here rather than in the reporter so that a test can assert they
 * reconcile without rendering markdown.
 */
export const buildCorpus = () => {
  const rawMetrics = []
  const rawNarrative = []

  for (const source of METRIC_SOURCES) {
    const { metrics, essays } = parseSource(source)
    rawMetrics.push(...metrics)
    rawNarrative.push(...essays)
  }
  for (const source of SUPPLEMENT_SOURCES) {
    rawNarrative.push(...parseSource(source).essays)
  }

  const bySlug = new Map()
  const duplicates = []

  for (const record of rawMetrics) {
    const card = toCard(record)
    const existing = bySlug.get(card.slug)
    if (existing) {
      duplicates.push({
        slug: card.slug,
        title: card.title,
        families: [...existing.families, ...card.families]
      })
      bySlug.set(card.slug, mergeCards(existing, card))
    } else {
      bySlug.set(card.slug, card)
    }
  }

  // Narrative entries keep their own namespace so an essay can never collide
  // with, or overwrite, a metric card of a similar name.
  const narrative = rawNarrative.map((record) => {
    const card = toCard(record)
    return { ...card, slug: `note-${card.slug}` }
  })

  const cards = [...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug))

  return {
    cards,
    narrative,
    counts: {
      parsed_metric_sections: rawMetrics.length,
      parsed_narrative_sections: rawNarrative.length,
      cards_after_merge: cards.length,
      duplicates_merged: duplicates.length,
      by_family: METRIC_SOURCES.reduce((acc, s) => {
        acc[s.family] = rawMetrics.filter((m) => m.family === s.family).length
        return acc
      }, {}),
      benchmark_present: cards.filter((c) => c.facets.benchmark.state === 'present').length,
      benchmark_absent: cards.filter((c) => c.facets.benchmark.state === 'absent').length,
      incomplete: cards.filter((c) => c.missing_facets.length > 0).length,
      by_tier: cards.reduce((acc, c) => {
        const tier = c.verification_tier
        return { ...acc, [tier]: (acc[tier] ?? 0) + 1 }
      }, {}),
      benchmark_rows: cards.reduce((n, c) => n + c.facets.benchmark.rows.length, 0)
    },
    duplicates
  }
}
