/**
 * Fabricated-benchmark detection.
 *
 * A deliberate limitation, stated up front: this module finds CANDIDATES, not
 * the catalogue. The corpus flags fabrications in running prose rather than
 * with a structured marker, and a catalogue entry asserts that a named
 * publisher did not publish a figure attributed to them. That claim is too
 * consequential to derive from a keyword match, and a false positive there is
 * worse than a miss, because it accuses a publisher of something backwards.
 *
 * So the pipeline surfaces every passage worth reading, the report lists them,
 * and the real catalogue is curated by hand from that list. The corpus review
 * put the true count at roughly twenty to twenty-five, which is small enough to
 * read properly and too important not to.
 */
import { readFileSync } from 'node:fs'
import { researchPath } from './parse.js'
import { SOURCES } from './sources.js'

/**
 * Terms that reliably indicate a passage is discussing a fabricated or
 * misattributed figure. Kept narrow on purpose: "unsourced" alone appears in
 * ordinary methodology commentary, so it must co-occur with an attribution
 * word to count.
 */
const STRONG_TERMS = [
  'fabricated',
  'fabrication',
  'misattribution',
  'misattributed',
  'does not appear in the source',
  'no such report exists',
  'could not be verified'
]

const MAX_EXCERPT = 260

const excerpt = (line) => {
  const clean = line.replace(/\s+/g, ' ').trim()
  return clean.length > MAX_EXCERPT ? `${clean.slice(0, MAX_EXCERPT)}...` : clean
}

export const findFabricationCandidates = () => {
  const candidates = []

  for (const source of SOURCES) {
    const lines = readFileSync(researchPath(source.file), 'utf8').split(/\r?\n/)

    lines.forEach((line, index) => {
      const lower = line.toLowerCase()
      const hit = STRONG_TERMS.find((term) => lower.includes(term))
      if (!hit) return

      candidates.push({
        file: source.file,
        family: source.family,
        line: index + 1,
        matched: hit,
        excerpt: excerpt(line),
        status: 'candidate'
      })
    })
  }

  return candidates
}
