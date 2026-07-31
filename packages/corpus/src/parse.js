/**
 * Markdown to sections.
 *
 * Deliberately pure and data-in/data-out: this module knows how to slice a
 * research file into titled bodies and nothing else. Facet extraction and
 * merging live downstream, so each stage can be tested without the others.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const RESEARCH_DIR = new URL('../research/', import.meta.url)

export const researchPath = (file) => fileURLToPath(new URL(file, RESEARCH_DIR))

/** Heading line to {level, text}, or null if the line is not a heading. */
const parseHeading = (line) => {
  const match = /^(#{1,6})\s+(.*\S)\s*$/.exec(line)
  return match ? { level: match[1].length, text: match[2] } : null
}

/** "3. Net Revenue Retention" to {ordinal: 3, title: "Net Revenue Retention"}. */
const parseNumberedTitle = (text) => {
  const match = /^(\d+)\.\s+(.*\S)\s*$/.exec(text)
  return match ? { ordinal: Number(match[1]), title: match[2] } : null
}

/**
 * Slug used to identify a card, and to link a forker's your-numbers.json entry
 * to it. Parenthetical asides and the "/ ALTERNATIVE NAME" tails that several
 * titles carry are dropped, because the slug should be the metric's plain name
 * rather than its full disambiguating headline.
 */
export const toSlug = (title) =>
  title
    .replace(/\([^)]*\)/g, ' ')
    .split(/\s+[—–/]\s+/)[0]
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Walk a file once, emitting every heading with its body and its ancestry.
 * Body runs to the next heading at the same level or shallower.
 */
export const readSections = (markdown) => {
  const lines = markdown.split(/\r?\n/)
  const headings = []

  lines.forEach((line, index) => {
    const heading = parseHeading(line)
    if (heading) headings.push({ ...heading, line: index })
  })

  return headings.map((heading, i) => {
    // The body ends where the next heading of equal or shallower level begins.
    const next = headings.slice(i + 1).find((h) => h.level <= heading.level)
    const end = next ? next.line : lines.length
    const body = lines.slice(heading.line + 1, end).join('\n').trim()

    // Ancestry lets us ask "is this section under READ THIS FIRST?" without a
    // second pass over the file.
    const ancestors = []
    for (let j = i - 1; j >= 0; j -= 1) {
      const candidate = headings[j]
      if (candidate.level < (ancestors[0]?.level ?? heading.level)) {
        ancestors.unshift(candidate)
      }
    }

    return { ...heading, body, ancestors: ancestors.map((a) => a.text) }
  })
}

/**
 * Split one configured source into metric sections and essay sections.
 *
 * A metric is a NUMBERED heading at the file's own metric level. Unnumbered
 * headings at that level are structural: PART dividers, SECTION groupings,
 * appendices, and the "metrics I considered and excluded" trailers that several
 * files end with. Treating them as metrics is the failure this guards against.
 */
export const parseSource = (source) => {
  const markdown = readFileSync(researchPath(source.file), 'utf8')
  const sections = readSections(markdown)

  const base = {
    family: source.family,
    source_file: source.file
  }

  // A prose supplement has no metric cards at all. Every section at its level
  // is standalone reading, and the whole file is interrogation content.
  if (source.supplement) {
    const essays = sections
      .filter((s) => s.level === source.metricLevel)
      .map((s, i) => ({
        ...base,
        is_metric: false,
        kind: 'supplement',
        ordinal: i + 1,
        title: parseNumberedTitle(s.text)?.title ?? s.text,
        slug: toSlug(parseNumberedTitle(s.text)?.title ?? s.text),
        body: s.body
      }))
    return { metrics: [], essays }
  }

  const metrics = sections
    .filter((s) => s.level === source.metricLevel)
    .map((s) => ({ section: s, numbered: parseNumberedTitle(s.text) }))
    .filter(({ numbered }) => numbered !== null)
    .map(({ section, numbered }) => ({
      ...base,
      is_metric: true,
      kind: 'metric',
      ordinal: numbered.ordinal,
      title: numbered.title,
      slug: toSlug(numbered.title),
      body: section.body,
      facetHeadings: Boolean(source.facetHeadings)
    }))

  // Essays sit at a different level and under a named parent, so they are
  // numbered without being metrics. File 06 is the only source with these.
  const essays = source.essays
    ? sections
        .filter((s) => s.level === source.essays.level)
        .filter((s) => s.ancestors.some((a) => a.includes(source.essays.under)))
        .map((s) => ({ section: s, numbered: parseNumberedTitle(s.text) }))
        .filter(({ numbered }) => numbered !== null)
        .map(({ section, numbered }) => ({
          ...base,
          is_metric: false,
          kind: 'essay',
          ordinal: numbered.ordinal,
          title: numbered.title,
          slug: toSlug(numbered.title),
          body: section.body
        }))
    : []

  return { metrics, essays }
}
