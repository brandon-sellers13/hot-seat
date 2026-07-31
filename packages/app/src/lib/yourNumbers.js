/**
 * The Your Numbers contract (Unit 9).
 *
 * A forker fills one validated file and the board starts asking about their
 * business. There is no connector here, and there will not be one: the moment
 * this repository contains a Salesforce integration it owes every other stack
 * one too. The published schema is the product boundary.
 *
 * The author's own figures go through this identical path with no special case,
 * which is the only way to know the contract is genuinely sufficient rather
 * than sufficient for everyone except the person who wrote it.
 */

/** One reporting period, in days, used for the staleness gate. */
const PERIOD_DAYS = { monthly: 31, quarterly: 93 }

/**
 * Validate a your-numbers file, reporting problems by path rather than as one
 * unhelpful failure. A forker editing JSON by hand needs to know which entry is
 * wrong, not merely that something is.
 */
export const validateYourNumbers = (doc) => {
  const errors = []
  const at = (path, message) => errors.push({ path, message })

  if (!doc || typeof doc !== 'object') {
    return { valid: false, errors: [{ path: '/', message: 'File is not a JSON object' }] }
  }
  if (!doc.schema_version) at('/schema_version', 'Required. Use "1.0.0".')
  if (!doc.company) at('/company', 'Required.')
  else {
    if (!doc.company.name) at('/company/name', 'Required.')
    if (!['b2b_saas', 'consumer_subscription', 'both'].includes(doc.company.model)) {
      at('/company/model', 'Must be b2b_saas, consumer_subscription or both.')
    }
    if (!['monthly', 'quarterly'].includes(doc.company.reporting_cadence)) {
      at('/company/reporting_cadence', 'Must be monthly or quarterly.')
    }
  }

  if (!Array.isArray(doc.facts) || doc.facts.length === 0) {
    at('/facts', 'At least one fact is required, or there is nothing to be asked about.')
  } else {
    doc.facts.forEach((fact, i) => {
      const p = `/facts/${i}`
      if (!fact.metric || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fact.metric)) {
        at(`${p}/metric`, 'Required, and must be a lower-case slug such as net-revenue-retention.')
      }
      if (!fact.as_of || !/^\d{4}-\d{2}-\d{2}$/.test(fact.as_of)) {
        at(`${p}/as_of`, 'Required, as YYYY-MM-DD. An undated number is what gets you caught out.')
      }
      if (!fact.magnitude) at(`${p}/magnitude`, 'Required.')
      if (!['improving', 'flat', 'worsening', 'unknown'].includes(fact.direction)) {
        at(`${p}/direction`, 'Must be improving, flat, worsening or unknown.')
      }
      if (!['above', 'at', 'below', 'unknown'].includes(fact.vs_benchmark)) {
        at(`${p}/vs_benchmark`, 'Must be above, at, below or unknown.')
      }
      if (!fact.source) {
        at(
          `${p}/source`,
          'Required. The rubric turns on anchoring a number you can source, so a fact with no origin cannot be defended.'
        )
      }
    })
  }

  return { valid: errors.length === 0, errors }
}

/** Facts older than one reporting period are retired from questioning. */
export const partitionByFreshness = (doc, now = new Date()) => {
  const window = PERIOD_DAYS[doc.company?.reporting_cadence] ?? 31
  const cutoff = now.getTime() - window * 86_400_000

  const fresh = []
  const stale = []
  for (const fact of doc.facts ?? []) {
    const at = Date.parse(`${fact.as_of}T00:00:00Z`)
    // Being drilled on a number you have since replaced trains you to say the
    // wrong thing confidently, which is worse than not practising at all.
    if (Number.isNaN(at) || at < cutoff) stale.push(fact)
    else fresh.push(fact)
  }
  return { fresh, stale }
}

/** Which facts have a matching card, so a question can be grounded in both. */
export const matchToCorpus = (facts, cards) => {
  const bySlug = new Map(cards.map((c) => [c.slug, c]))
  const matched = []
  const unmatched = []
  for (const fact of facts) {
    const card = bySlug.get(fact.metric)
    if (card) matched.push({ fact, card })
    else unmatched.push(fact)
  }
  return { matched, unmatched }
}

/**
 * The briefing block added to the interrogator when a forker's file is loaded.
 *
 * The rubric is unchanged, which is the point: anchor your number, bridge to
 * strategy is exactly the skill Side 2 should drill, now with real stakes.
 */
export const brief = (doc, matched) => {
  if (matched.length === 0) return ''
  return `THESE ARE ${doc.company.name.toUpperCase()}'S ACTUAL FIGURES.
Ask about them as a board would: what the number is, which way it is moving,
and what is being done about it. Do not quote them back as the answer.

${matched
  .map(
    ({ fact, card }) =>
      `- ${card.title}${fact.segment ? ` (${fact.segment})` : ''}: ${fact.magnitude}, ${fact.direction}, ${fact.vs_benchmark} benchmark. Source: ${fact.source}. As of ${fact.as_of}.${
        fact.strategy?.length ? `\n  Their stated plan: ${fact.strategy.join('; ')}` : '\n  NO STATED PLAN. Press on this.'
      }`
  )
  .join('\n')}`
}
