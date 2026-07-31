/**
 * Section body to the six-facet card.
 *
 * Two notations appear in the corpus and both are supported: bold labels
 * (`**definition:**`) in seven files, and h3 headings (`### benchmark`) in file
 * 08, which mixes the two within a single section. Rather than branch on the
 * file, both notations are recognised everywhere, so a future file written
 * either way needs no configuration.
 */
import { ABSENT_BENCHMARK_MARKER, FACET_KEYS } from './sources.js'

const FACET_SET = new Set(FACET_KEYS)

/**
 * A facet label at the start of a line, in any of the forms the corpus actually
 * uses. All four appear in the research and the differences are not meaningful:
 *
 *   **definition:** text          seven files
 *   - **applies_to:** text        file 05, which bullets its facets
 *   **formula_variants.** text    a period rather than a colon, several files
 *   **formula_variants** (aside)  no punctuation, followed by a parenthetical
 *
 * The label must be a single lower-case token and must be a known facet, so
 * ordinary bold emphasis in the prose cannot be mistaken for a label.
 */
const BOLD_LABEL = /^\s*(?:[-*]\s+)?\*\*([a-z_]+)[:.]?\*\*\s*/
const HEADING_LABEL = /^#{2,4}\s+([a-z_]+)\s*$/

/**
 * Split a body into labelled blocks. Anything before the first recognised label
 * is kept as `_preamble`, which is where the "practitioners genuinely disagree"
 * commentary tends to live.
 */
export const splitFacets = (body) => {
  const lines = body.split('\n')
  const blocks = { _preamble: [] }
  let current = '_preamble'

  for (const line of lines) {
    const bold = BOLD_LABEL.exec(line)
    const headed = HEADING_LABEL.exec(line)

    if (bold && FACET_SET.has(bold[1])) {
      current = bold[1]
      blocks[current] = blocks[current] ?? []
      const rest = line.slice(bold[0].length).trim()
      if (rest) blocks[current].push(rest)
      continue
    }

    if (headed && FACET_SET.has(headed[1])) {
      current = headed[1]
      blocks[current] = blocks[current] ?? []
      continue
    }

    blocks[current] = blocks[current] ?? []
    blocks[current].push(line)
  }

  return Object.fromEntries(
    Object.entries(blocks).map(([key, value]) => [key, value.join('\n').trim()])
  )
}

/**
 * Verification tags, unified.
 *
 * Three vocabularies are in use across the corpus because the files were
 * written at different times: `[P]/[S]/[W]`, `[V]/[V-2nd]/[S]/[NONE]`, and a
 * variant where `[S]` means "credible aggregator citing a named primary"
 * rather than plain secondary. They tag individual figures rather than whole
 * sections, which is the more useful granularity and worth preserving.
 *
 * Anything untagged stays `untagged`. Inferring a tier from the look of a
 * source would manufacture exactly the false confidence the corpus is built to
 * argue against.
 */
const TIER_TAGS = [
  ['[V-2nd]', 'secondary'],
  ['[NONE]', 'none'],
  ['[P]', 'primary'],
  ['[V]', 'primary'],
  ['[S]', 'secondary'],
  ['[W]', 'weak']
]

/** Strongest first, so a card's tier is the best evidence it actually has. */
const TIER_RANK = ['primary', 'secondary', 'weak', 'none', 'untagged']

export const readTier = (text) => {
  if (!text) return 'untagged'
  const found = TIER_TAGS.filter(([tag]) => text.includes(tag)).map(([, tier]) => tier)
  if (found.length === 0) return 'untagged'
  return TIER_RANK.find((tier) => found.includes(tier)) ?? 'untagged'
}

/** Best tier across a set, used to summarise a card from its benchmark rows. */
export const bestTier = (tiers) =>
  TIER_RANK.find((tier) => tiers.includes(tier)) ?? 'untagged'

const splitCells = (line) =>
  line
    .split('|')
    .slice(1, -1)
    .map((c) => c.trim())

/**
 * Parse a markdown table into headers and rows.
 *
 * Headers matter more than they look. Benchmark tables in this corpus are not
 * a fixed shape: some are `Segment | Figure | Source`, some are
 * `Cut | Median | Quartiles | Source`, and some are two-column breakdowns with
 * no source column at all. Reading the source by column position rather than
 * by header name silently mislabels one column as another, which in a corpus
 * built on provenance is the worst available failure.
 */
export const parseTable = (text) => {
  const lines = text.split('\n').map((l) => l.trim())
  const tables = []
  let pending = null

  for (const line of lines) {
    if (!line.startsWith('|')) {
      pending = null
      continue
    }
    if (/^\|[\s|:-]+\|$/.test(line)) {
      if (pending) tables.push({ headers: pending, rows: [] })
      pending = null
      continue
    }
    const cells = splitCells(line)
    const table = tables[tables.length - 1]
    if (table && table.rows) {
      if (cells.some(Boolean)) table.rows.push(cells)
    } else {
      // Not yet past a separator, so this is a candidate header row.
      pending = cells
    }
  }

  const headers = tables[0]?.headers ?? []
  const rows = tables.flatMap((t) => t.rows)
  return { headers, rows }
}

/** Rows of a markdown table, excluding the header and the separator line. */
export const tableRows = (text) => parseTable(text).rows

/**
 * The benchmark facet is three-state rather than a string, because "we looked
 * and no primary publisher supplies this" is a real answer that a card must be
 * able to give. Inventing a plausible number instead is the specific failure
 * this whole corpus exists to argue against.
 */
export const readBenchmark = (text) => {
  if (!text) {
    return { state: 'absent', rows: [], note: null, sourced: false, tier: 'untagged' }
  }

  const { headers, rows: rawRows } = parseTable(text)

  // Locate the source column by name. When there is no such column the figures
  // are still real, but their provenance lives in the surrounding prose, and
  // the card has to say so rather than presenting an empty string as a source.
  const sourceIndex = headers.findIndex((h) => /source|publisher|citation/i.test(h))

  const rows = rawRows.map((cells) => {
    const segment = cells[0] ?? ''
    const source = sourceIndex > 0 ? (cells[sourceIndex] ?? '') : ''
    // Everything between the segment and the source is the figure. Keeping all
    // of it preserves cuts like "Median" plus "Quartiles" that would otherwise
    // be silently dropped.
    const figureCells = cells
      .slice(1, sourceIndex > 0 ? sourceIndex : undefined)
      .filter(Boolean)

    return {
      segment,
      figure: figureCells.join(' · '),
      source,
      // The tag can sit in either the figure or the source cell depending on
      // which file the row came from.
      tier: readTier(`${figureCells.join(' ')} ${source}`)
    }
  })

  const hasAbsentMarker = text.includes(ABSENT_BENCHMARK_MARKER)

  // A card can legitimately carry both: a table of what IS published, plus a
  // note that one particular segmentation is not. Losing that note would turn
  // "nobody publishes segmented logo churn" into silence, which is how the
  // unsourced tables in circulation get believed in the first place.
  const note = hasAbsentMarker
    ? text
        .split('\n')
        .filter((line) => line.includes(ABSENT_BENCHMARK_MARKER))
        .join(' ')
        .trim()
    : null

  if (rows.length === 0) {
    return { state: 'absent', rows: [], note, sourced: false, tier: 'untagged' }
  }

  return {
    state: 'present',
    rows,
    note,
    sourced: rows.every((r) => r.source.length > 0),
    tier: bestTier(rows.map((r) => r.tier))
  }
}

/** Leading bullet list items, used for traps and related metrics. */
export const bulletItems = (text) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^[-*]\s+/.test(l))
    .map((l) => l.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean)

/** Extract the full facet set from a parsed section. */
export const extractFacets = (section) => {
  const blocks = splitFacets(section.body)

  const traps = bulletItems(blocks.traps ?? '')
  const related = (blocks.related ?? '')
    .split(/[,.]\s+|\n/)
    .map((s) => s.trim().replace(/\.$/, ''))
    .filter(Boolean)

  return {
    applies_to: blocks.applies_to?.trim() || null,
    definition: blocks.definition?.trim() || null,
    formula_variants: {
      text: blocks.formula_variants?.trim() || null,
      variants: tableRows(blocks.formula_variants ?? '').map((cells) => ({
        variant: cells[0] ?? '',
        formula: cells[1] ?? '',
        when: cells[2] ?? '',
        who: cells[3] ?? null
      }))
    },
    inputs: blocks.inputs?.trim() || null,
    application: blocks.application?.trim() || null,
    benchmark: readBenchmark(blocks.benchmark ?? ''),
    traps: traps.length > 0 ? traps : null,
    related: related.length > 0 ? related : null,
    commentary: blocks._preamble?.trim() || null
  }
}

/**
 * Which facets are genuinely missing, so the report can name them rather than
 * guess.
 *
 * The benchmark facet is deliberately excluded. "We looked and no primary
 * publisher supplies this" is a finding the corpus went to real trouble to
 * establish, and counting it as an extraction gap would bury 132 deliberate
 * results in a list of things to go and fix. Its three-state value carries that
 * information already.
 */
export const missingFacets = (facets) =>
  FACET_KEYS.filter((key) => {
    if (key === 'benchmark') return false
    if (key === 'formula_variants') return !facets.formula_variants.text
    return facets[key] === null
  })
