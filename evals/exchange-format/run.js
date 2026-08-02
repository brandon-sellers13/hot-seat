/**
 * The generation eval, as a script rather than as something done by hand.
 *
 * The rule the handoff sets is that any change to the generator prompt
 * invalidates the recorded numbers and the eval must be re-run before they are
 * trusted. That rule was unenforceable, because the harness that produced the
 * 2026-07-31 results was never committed. Only the results were. So the first
 * change to the prompt after that could not honour the rule without rebuilding
 * the harness, which is this file.
 *
 * Run it with the environment loaded, the same way the grading gate runs:
 *
 *   set -a && . ./.env && set +a && node evals/exchange-format/run.js
 *
 * It costs money. At the measured rate of about $0.002 a generation plus an
 * audit call each, a twenty-exchange run is a few cents.
 *
 * Every exchange is audited by a separate call that is given the board pack and
 * asked to check the figures itself. Auditing with the same call that generated
 * would be asking the model to mark its own paper.
 */

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { EXCHANGE_SCHEMA, exchangeInstructions, exchangeInput } from '../../packages/functions/src/lib/exchange.js'
import { EFFORT, MODELS, grade } from '../../packages/functions/src/lib/llm.js'
import { SHAPES } from '../../packages/functions/src/lib/meeting.js'
import { ANSWERABLE, SECTIONS } from '../../packages/app/src/lib/pack/arbor.js'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')

const ASK = 'Another $6 million for acquisition next quarter, moved out of partner and into paid.'

/** Five metrics against four shapes: every shape sampled five times. */
const METRICS = [
  'net-revenue-retention',
  'customer-churn-rate',
  'cac-payback-period',
  'activation-rate',
  'gross-margin'
]

const AUDIT_SCHEMA = {
  name: 'audit',
  schema: {
    type: 'object',
    additionalProperties: false,
    required: [
      'fabricated',
      'opens_on_ask',
      'derived_aloud',
      'question_count',
      'half_assist',
      'shape_match',
      'note'
    ],
    properties: {
      fabricated: {
        type: 'array',
        description:
          'Every figure spoken that is not in the board pack and cannot be derived from pack figures by correct arithmetic. Empty if there are none.',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['value', 'why'],
          properties: { value: { type: 'string' }, why: { type: 'string' } }
        }
      },
      opens_on_ask: {
        type: 'boolean',
        description: "True when the first line names what the player is asking the board for."
      },
      derived_aloud: {
        type: 'boolean',
        description:
          'TRUE ONLY IF a director performs arithmetic aloud or states what a figure means for the decision. A director who raises a point and STOPS SHORT of drawing the conclusion is behaving correctly, and this field is FALSE for them. Leaving work for the player is the desired behaviour, never a failure. If in doubt, answer false.'
      },
      question_count: {
        type: 'integer',
        description: 'How many questions are aimed at the player. Should be exactly one.'
      },
      half_assist: {
        type: 'boolean',
        description:
          'True when somebody half-opens a door and leaves it: raises a thread and stops short of finishing it.'
      },
      shape_match: {
        type: 'boolean',
        description: 'True when the exchange is the kind of exchange it was asked to be.'
      },
      note: { type: 'string', description: 'One sentence on the most serious problem, or "clean".' }
    }
  }
}

const SHAPE_EXPECTATION = {
  diagnosis: 'Two directors are both correct and disagree, because their figures measure different things.',
  'director-wrong': 'A director quotes something that does not apply here, and is half-corrected.',
  'director-right': 'The objecting director is right and the pack supports them, not the player.',
  unsettled: 'The question cannot be settled from the board pack, and the exchange does not resolve it.'
}

/**
 * The auditor's own definition of fabrication had to be corrected once already.
 *
 * The first version was given the board pack alone and told that anything not
 * in it was invented. That flagged the player's ask, which hard constraint 2
 * REQUIRES the opening line to name, and it flagged external benchmarks, which
 * come from the metric card the generator is legitimately given and which the
 * second worked example in the format brief is entirely built out of. It scored
 * a 0% pass rate against a generator that was mostly behaving.
 *
 * A grader measuring the wrong source is the same failure this project has had
 * twice in its spend controls, and it is worth naming: the harness looked
 * rigorous and was answering a different question from the one asked.
 */
const auditInstructions = `You are auditing one generated board-meeting exchange. You are strict and literal.

THE THREE LEGITIMATE SOURCES OF A FIGURE, all supplied below:
1. The board pack. Any figure printed there may be quoted as-is.
2. The metric card, including its benchmark. External benchmarks quoted from the card are CORRECT behaviour, not fabrication. A director citing an industry figure with its provenance is the point of one of the four question shapes.
3. The player's ask. The amount the player is asking for is stated in the ask and the first line is required to name it.

A figure is FABRICATED only when it is in none of those three and cannot be reached from figures in them by arithmetic you have performed and verified yourself. Check the arithmetic rather than assuming it.

DERIVED ALOUD means one of two specific things, and neither of them is quoting:
- A director walks a calculation through aloud, for example running a roll-forward to a total, or saying "which leaves X, which puts the ratio at Y".
- A director says what a figure MEANS for the decision, rather than leaving that to the player.
Quoting a headline figure from the pack is correct and is neither of these. Do not report it.

THE MOST COMMON MISTAKE AN AUDITOR MAKES HERE IS TO INVERT THIS. A director who supplies a figure and stops short of calculating with it, or who raises an issue and does not say what it implies for the decision, is doing EXACTLY what the format requires. Naming the implication is the player's job and taking it away from them is the failure. Never report "stopped short of stating the implication" or "left the calculation to the player" as a problem. Those are the format working.

Report what you find. Do not be generous, and do not invent problems either.`

const auditInput = ({ exchange, shape, card }) => `=== BOARD PACK ===
${JSON.stringify(SECTIONS)}

=== METRIC CARD, including any benchmark a director may legitimately cite ===
${JSON.stringify({ title: card.title, benchmark: card.facets.benchmark, traps: card.facets.traps })}

=== THE PLAYER'S ASK, whose figures are legitimate ===
${ASK}

=== THE SHAPE THIS EXCHANGE WAS ASKED FOR ===
${shape ? SHAPE_EXPECTATION[shape] : 'No shape was requested. Judge shape_match as true.'}

=== THE EXCHANGE ===
${JSON.stringify(exchange)}`

const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) {
  console.error('OPENAI_API_KEY is not set. Run: set -a && . ./.env && set +a && node evals/exchange-format/run.js')
  process.exit(1)
}

const cards = JSON.parse(await readFile(join(root, 'packages/corpus/data/cards.json'), 'utf8'))
const byslug = new Map((cards.cards ?? cards).map((c) => [c.slug, c]))

/**
 * Two arms, run against the same auditor.
 *
 * The shaped arm is the change being tested. The control arm generates with no
 * shape at all, which is exactly what the generator did before this change.
 *
 * Without the control the numbers would be uninterpretable: the auditor is new,
 * so a drop against the 2026-07-31 results could equally mean the shapes hurt
 * the generator or that this auditor is stricter than the one that produced
 * those numbers, and that harness was never committed to compare against. Two
 * arms through one auditor answers the question that actually matters, which is
 * whether adding shapes made generation worse.
 */
const jobs = [
  ...METRICS.flatMap((slug) => SHAPES.map((shape) => ({ slug, shape, arm: 'shaped' }))),
  ...METRICS.flatMap((slug) =>
    SHAPES.map((_, i) => ({ slug, shape: null, arm: 'control', rep: i }))
  )
]

const unanswerable = jobs.filter((j) => !ANSWERABLE.has(j.slug))
if (unanswerable.length) {
  console.error('These metrics are not in ANSWERABLE and would make the generator invent inputs:')
  unanswerable.forEach((j) => console.error(`  ${j.slug}`))
  process.exit(1)
}

console.log(`Generating ${jobs.length} exchanges on ${MODELS.interrogate} at ${EFFORT.interrogate} effort...\n`)

const runOne = async ({ slug, shape, arm }) => {
  const card = byslug.get(slug)
  const started = Date.now()
  const exchange = await grade({
    apiKey,
    model: MODELS.interrogate,
    effort: EFFORT.interrogate,
    instructions: exchangeInstructions(),
    input: exchangeInput({ card, pack: SECTIONS, ask: ASK, shape }),
    schema: EXCHANGE_SCHEMA
  })
  const latencyMs = Date.now() - started

  const audit = await grade({
    apiKey,
    model: MODELS.grade,
    // A more careful read than the generation itself, because a lenient audit
    // is worth nothing and this is the only check on fabrication.
    effort: 'medium',
    instructions: auditInstructions,
    input: auditInput({ exchange, shape, card }),
    schema: AUDIT_SCHEMA
  })

  process.stdout.write(audit.fabricated.length ? 'F' : audit.shape_match ? '.' : 's')
  return { slug, shape, arm, latencyMs, exchange, audit }
}

const results = []
// Four at a time. Enough to keep the run short without tripping rate limits.
for (let i = 0; i < jobs.length; i += 4) {
  const batch = await Promise.all(jobs.slice(i, i + 4).map(runOne))
  results.push(...batch)
}

const passes = (r) =>
  r.audit.fabricated.length === 0 &&
  r.audit.opens_on_ask &&
  !r.audit.derived_aloud &&
  r.audit.question_count === 1 &&
  r.audit.half_assist

const summarise = (rows) => {
  const n = rows.length
  const count = (p) => rows.filter(p).length
  const pct = (c) => `${Math.round((c / n) * 100)}%`.padStart(4)
  const latencies = rows.map((r) => r.latencyMs).sort((a, b) => a - b)
  return {
    n,
    fabricated: rows.flatMap((r) => r.audit.fabricated).length,
    opensOnAsk: pct(count((r) => r.audit.opens_on_ask)),
    derivedAloud: `${count((r) => r.audit.derived_aloud)}/${n}`,
    oneQuestion: pct(count((r) => r.audit.question_count === 1)),
    halfAssist: pct(count((r) => r.audit.half_assist)),
    shapeMatch: pct(count((r) => r.audit.shape_match)),
    pass: pct(count(passes)),
    median: `${(latencies[Math.floor(n / 2)] / 1000).toFixed(1)}s`
  }
}

const shaped = summarise(results.filter((r) => r.arm === 'shaped'))
const control = summarise(results.filter((r) => r.arm === 'control'))

const row = (label, key) =>
  console.log(`${label.padEnd(26)}${String(shaped[key]).padStart(8)}${String(control[key]).padStart(10)}`)

console.log('\n')
console.log(`${''.padEnd(26)}${'shaped'.padStart(8)}${'control'.padStart(10)}`)
row('Exchanges', 'n')
row('Fabricated figures', 'fabricated')
row('Opens on the ask', 'opensOnAsk')
row('Derived aloud', 'derivedAloud')
row('Exactly one question', 'oneQuestion')
row('Half-assist present', 'halfAssist')
row('Shape honoured', 'shapeMatch')
row('Overall pass', 'pass')
row('Median latency', 'median')

console.log('\nShaped arm, by shape:')
for (const shape of SHAPES) {
  const rows = results.filter((r) => r.shape === shape)
  const matched = rows.filter((r) => r.audit.shape_match).length
  const clean = rows.filter(passes).length
  console.log(`  ${shape.padEnd(16)} shape ${matched}/${rows.length}   pass ${clean}/${rows.length}`)
}

const anyFabricated = results.filter((r) => r.audit.fabricated.length)
if (anyFabricated.length) {
  console.log('\nFabricated figures, which is the failure that matters:')
  anyFabricated.forEach((r) =>
    r.audit.fabricated.forEach((f) =>
      console.log(`  [${r.arm}/${r.slug}/${r.shape ?? 'none'}] ${f.value} — ${f.why}`)
    )
  )
}

const failures = results.filter((r) => !passes(r) && !r.audit.fabricated.length)
if (failures.length) {
  console.log('\nOther failures, with the auditor’s reason:')
  failures.forEach((r) => console.log(`  [${r.arm}/${r.slug}/${r.shape ?? 'none'}] ${r.audit.note}`))
}

const stamp = new Date().toISOString().slice(0, 10)
const out = join(here, `results-${stamp}.json`)
await (await import('node:fs/promises')).writeFile(out, JSON.stringify(results, null, 2))
console.log(`\nWritten to ${out}`)
