/**
 * The plan's named test scenarios for Unit 1, plus the facet-notation cases
 * that were found by running the extraction against the real corpus rather
 * than by reading the plan.
 */
import { describe, expect, it } from 'vitest'
import { buildCorpus } from '../normalize.js'
import { readBenchmark, readTier, splitFacets, tableRows } from '../facets.js'
import { toSlug } from '../parse.js'

const corpus = buildCorpus()
const card = (slug) => corpus.cards.find((c) => c.slug === slug)

describe('a known h2-schema metric extracts every facet', () => {
  const nrr = card('net-revenue-retention')

  it('is found', () => {
    expect(nrr).toBeDefined()
    expect(nrr.title).toMatch(/Net Revenue Retention/)
  })

  it('carries all six substantive facets', () => {
    expect(nrr.facets.definition).toMatch(/fixed cohort/i)
    expect(nrr.facets.formula_variants.text).toBeTruthy()
    expect(nrr.facets.inputs).toBeTruthy()
    expect(nrr.facets.application).toBeTruthy()
    expect(nrr.facets.benchmark.state).toBe('present')
    expect(nrr.facets.traps).toBeTruthy()
  })

  it('keeps the formula variants as structured rows, not just prose', () => {
    expect(nrr.facets.formula_variants.variants.length).toBeGreaterThan(3)
    expect(nrr.facets.formula_variants.variants[0].formula).toBeTruthy()
  })

  it('reads the source column by name, not by position', () => {
    // NRR's table is `Cut | Median | Quartiles | Source`, so position 2 is the
    // quartile spread rather than the publisher. Reading by position labelled
    // the quartiles as provenance, which is the worst failure available in a
    // corpus built on sourcing.
    expect(nrr.facets.benchmark.rows.length).toBeGreaterThan(0)
    expect(nrr.facets.benchmark.rows[0].source).toMatch(/SaaS Capital/)
    expect(nrr.facets.benchmark.rows[0].source).not.toMatch(/^\d|p25|p75/)
  })

  it('keeps the extra figure columns rather than dropping them', () => {
    expect(nrr.facets.benchmark.rows[0].figure).toBeTruthy()
  })
})

describe('every source schema yields complete cards', () => {
  // Regression guard for the two notations found only by running this against
  // the corpus: file 05 bullets its facet labels, and several files write
  // `**formula_variants.**` with a period or with no punctuation at all.
  it('no card anywhere is missing a definition', () => {
    const undefined_ = corpus.cards.filter((c) => !c.facets.definition)
    expect(undefined_.map((c) => c.slug)).toEqual([])
  })

  it('extracts an h3-nested metric from the engagement file', () => {
    const active = card('active-users')
    expect(active.families).toContain('engagement-activation')
    expect(active.facets.definition).toMatch(/unique users/i)
    expect(active.facets.formula_variants.variants.length).toBeGreaterThan(3)
  })

  it('extracts an h1 metric from the pipeline file', () => {
    const pipeline = corpus.cards.find((c) => c.families.includes('b2b-pipeline-sales'))
    expect(pipeline.facets.definition).toBeTruthy()
  })

  it('extracts a metric whose facets are h3 headings, in file 08', () => {
    const rule40 = card('rule-of-40')
    expect(rule40.families).toContain('growth-efficiency')
    expect(rule40.facets.formula_variants.text).toBeTruthy()
    expect(rule40.facets.traps).toBeTruthy()
  })
})

describe('benchmarks are three-state and never invented', () => {
  it('treats the absent marker as a real answer with zero rows', () => {
    const absent = corpus.cards.filter((c) => c.facets.benchmark.state === 'absent')
    expect(absent.length).toBeGreaterThan(0)
    expect(absent.every((c) => c.facets.benchmark.rows.length === 0)).toBe(true)
  })

  it('keeps an absent-segment note alongside a present benchmark table', () => {
    // Logo churn publishes blended figures but nothing segmented, and the card
    // has to be able to say so rather than going quiet.
    const churn = card('customer-churn-rate')
    expect(churn.facets.benchmark.state).toBe('present')
    expect(churn.facets.benchmark.note).toContain('NO SOURCED BENCHMARK FOUND')
  })

  it('flags cards whose rows are not all sourced rather than hiding it', () => {
    // Some benchmark tables are two-column breakdowns whose provenance lives in
    // the surrounding prose. That is legitimate, but the card must not present
    // an empty string as if it were a citation, so `sourced` has to be honest.
    for (const card of corpus.cards.filter((c) => c.facets.benchmark.state === 'present')) {
      const allRowsSourced = card.facets.benchmark.rows.every((r) => r.source.length > 0)
      expect(card.facets.benchmark.sourced).toBe(allRowsSourced)
    }
  })

  it('finds sourced benchmarks for a substantial share of cards', () => {
    const present = corpus.cards.filter((c) => c.facets.benchmark.state === 'present')
    const sourced = present.filter((c) => c.facets.benchmark.sourced)
    expect(sourced.length).toBeGreaterThan(present.length / 3)
  })
})

describe('verification tiers unify three vocabularies without inventing any', () => {
  it.each([
    ['[P] primary read directly', 'primary'],
    ['[V] fetched and read', 'primary'],
    ['[S] search snippet', 'secondary'],
    ['[V-2nd] secondary summary', 'secondary'],
    ['[W] no disclosed methodology', 'weak'],
    ['[NONE] nothing credible', 'none'],
    ['SaaS Capital, 2025 survey', 'untagged']
  ])('%s maps to %s', (text, expected) => {
    expect(readTier(text)).toBe(expected)
  })

  it('prefers the strongest tag when a row carries more than one', () => {
    expect(readTier('[W] weak but also [P] primary')).toBe('primary')
  })

  it('leaves untagged material untagged rather than guessing', () => {
    expect(readTier('Benchmarkit 2025')).toBe('untagged')
    expect(corpus.counts.by_tier.untagged).toBeGreaterThan(0)
  })

  it('gives every card a defined tier', () => {
    // A card with no benchmark text at all once fell through a branch that
    // omitted the field, which surfaced as an "undefined" row in the report.
    const undefinedTier = corpus.cards.filter((c) => c.verification_tier === undefined)
    expect(undefinedTier.map((c) => c.slug)).toEqual([])
    expect(corpus.cards.every((c) => c.facets.benchmark.tier !== undefined)).toBe(true)
  })

  it('reads tags from the prose, where the corpus actually puts them', () => {
    // The tags annotate claims on bullets ("- **[P]** ...") far more often than
    // they annotate benchmark table cells, so a tier derived only from tables
    // finds almost nothing and misrepresents the corpus as unverified.
    expect(corpus.counts.by_tier.primary).toBeGreaterThan(20)
  })

  it('tier counts partition the card set', () => {
    const summed = Object.values(corpus.counts.by_tier).reduce((a, b) => a + b, 0)
    expect(summed).toBe(corpus.cards.length)
  })
})

describe('cross-family duplicates collapse to one card', () => {
  it('burn multiple is a single card in two families', () => {
    const burn = card('burn-multiple')
    expect(burn).toBeDefined()
    expect(burn.families.length).toBe(2)
    expect(burn.source_files.length).toBe(2)
  })

  it('no slug appears twice', () => {
    const slugs = corpus.cards.map((c) => c.slug)
    expect(slugs.length).toBe(new Set(slugs).size)
  })

  it('merging preserves the richer facets', () => {
    const burn = card('burn-multiple')
    expect(burn.facets.definition).toBeTruthy()
    expect(burn.merged_from.length).toBeGreaterThan(0)
  })
})

describe('narrative entries cannot be asked metric questions', () => {
  it('the three consumer-subscription essays are not metrics', () => {
    const essays = corpus.narrative.filter((n) => n.kind === 'essay')
    expect(essays).toHaveLength(3)
    expect(essays.every((e) => e.is_metric === false)).toBe(true)
  })

  it('excludes formula and benchmark prompts from narrative entries', () => {
    for (const entry of corpus.narrative) {
      expect(entry.supported_prompt_types).not.toContain('formula')
      expect(entry.supported_prompt_types).not.toContain('benchmark')
      expect(entry.supported_prompt_types).not.toContain('inputs')
    }
  })

  it('namespaces narrative slugs so they cannot collide with metric cards', () => {
    expect(corpus.narrative.every((n) => n.slug.startsWith('note-'))).toBe(true)
    const metricSlugs = new Set(corpus.cards.map((c) => c.slug))
    expect(corpus.narrative.every((n) => !metricSlugs.has(n.slug))).toBe(true)
  })
})

describe('prompt types are only offered when the facet has content', () => {
  it('never offers a benchmark prompt for a card with no benchmark', () => {
    const wrong = corpus.cards.filter(
      (c) =>
        c.supported_prompt_types.includes('benchmark') &&
        c.facets.benchmark.state !== 'present'
    )
    expect(wrong.map((c) => c.slug)).toEqual([])
  })

  it('never offers a formula prompt for a card with no formula', () => {
    const wrong = corpus.cards.filter(
      (c) => c.supported_prompt_types.includes('formula') && !c.facets.formula_variants.text
    )
    expect(wrong.map((c) => c.slug)).toEqual([])
  })

  it('every card can be asked at least one question', () => {
    const mute = corpus.cards.filter((c) => c.supported_prompt_types.length === 0)
    expect(mute.map((c) => c.slug)).toEqual([])
  })
})

describe('slugs are stable and usable as your-numbers.json keys', () => {
  it.each([
    ['Net Revenue Retention (NRR / NDR / Dollar-Based Net Expansion Rate)', 'net-revenue-retention'],
    ['CAC Payback Period', 'cac-payback-period'],
    ['ARR — committed vs annualized run-rate', 'arr']
  ])('%s becomes %s', (title, slug) => {
    expect(toSlug(title)).toBe(slug)
  })

  it('every slug matches the pattern the data contract accepts', () => {
    const pattern = /^[a-z0-9]+(-[a-z0-9]+)*$/
    const bad = corpus.cards.filter((c) => !pattern.test(c.slug))
    expect(bad.map((c) => c.slug)).toEqual([])
  })
})

describe('facet parsing handles the notations the corpus actually uses', () => {
  it.each([
    ['**definition:** plain bold label', 'definition'],
    ['- **applies_to:** bulleted, as file 05 writes them', 'applies_to'],
    ['**formula_variants.** a period rather than a colon', 'formula_variants'],
    ['**traps** no punctuation at all', 'traps']
  ])('recognises %s', (line, key) => {
    const blocks = splitFacets(line)
    expect(Object.keys(blocks)).toContain(key)
  })

  it('does not mistake ordinary bold emphasis for a facet label', () => {
    const blocks = splitFacets('**Practitioners genuinely disagree** about the base.')
    expect(Object.keys(blocks)).toEqual(['_preamble'])
  })

  it('reads table rows while skipping the header and separator', () => {
    const rows = tableRows('| A | B |\n|---|---|\n| 1 | 2 |\n| 3 | 4 |')
    expect(rows).toEqual([
      ['1', '2'],
      ['3', '4']
    ])
  })

  it('reports an empty benchmark as absent rather than throwing', () => {
    expect(readBenchmark('').state).toBe('absent')
    expect(readBenchmark('').rows).toEqual([])
  })
})

describe('counts reconcile', () => {
  it('sections minus merges equals cards', () => {
    const { parsed_metric_sections, duplicates_merged, cards_after_merge } = corpus.counts
    expect(parsed_metric_sections - duplicates_merged).toBe(cards_after_merge)
  })

  it('benchmark states partition the card set', () => {
    const { benchmark_present, benchmark_absent, cards_after_merge } = corpus.counts
    expect(benchmark_present + benchmark_absent).toBe(cards_after_merge)
  })
})
