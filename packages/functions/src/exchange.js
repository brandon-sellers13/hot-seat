import { EXCHANGE_SCHEMA, exchangeInstructions, exchangeInput } from './lib/exchange.js'
import { LlmError, MODELS, EFFORT, grade as callModel } from './lib/llm.js'
import { checkAnswerRate, resolveApiKey, userClient } from './lib/budget.js'

/**
 * POST /.netlify/functions/exchange
 *
 * Generates one board exchange: a short conversation between directors that
 * lands on a single answerable question, built from a corpus card and the
 * company's board pack.
 *
 * The card and pack arrive from the client rather than being loaded here. Both
 * are already public content sitting in the browser, so sending them costs
 * nothing we are not already paying, and it keeps this function stateless — a
 * forker points it at their own pack without touching this file.
 *
 * The rule this file exists to keep: never return a fabricated exchange. A
 * board quoting invented numbers would make the game actively misleading, which
 * is worse than a failed request. On any error the caller is told plainly.
 */

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(body)
})

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Use POST' })

  let payload
  try {
    payload = JSON.parse(event.body ?? '{}')
  } catch {
    return json(400, { error: 'Body was not valid JSON' })
  }

  const { card, pack, ask } = payload
  if (!card?.slug || !card?.facets) return json(400, { error: 'A metric card is required' })
  if (!Array.isArray(pack) || pack.length === 0) {
    return json(400, { error: 'A board pack is required' })
  }

  const token = (event.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
  if (!token) return json(401, { error: 'Sign-in token required' })

  const supabase = userClient(token)
  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth?.user) return json(401, { error: 'Session is not valid' })

  const { apiKey, bringYourOwn } = resolveApiKey(event.headers)
  if (!apiKey) return json(503, { error: 'No provider key is configured' })

  // Generation is the expensive call, so it counts against the same hourly
  // allowance as grading rather than getting a free lane of its own.
  if (!bringYourOwn) {
    const rate = await checkAnswerRate(supabase)
    if (!rate.allowed) {
      return json(429, {
        error: 'rate_limited',
        message: `That is ${rate.used} in an hour. Come back shortly.`,
        retryAfterSeconds: 600
      })
    }
  }

  try {
    const exchange = await callModel({
      apiKey,
      model: MODELS.interrogate,
      effort: EFFORT.interrogate,
      instructions: exchangeInstructions(),
      input: exchangeInput({
        card,
        pack,
        ask: ask ?? 'More budget for acquisition next quarter.'
      }),
      schema: EXCHANGE_SCHEMA
    })

    // The model sometimes emits the closing question as a dialogue line AND as
    // the question, so it renders twice. Seen on the first live generation.
    // Dropped here rather than in the prompt because a structural defect should
    // be impossible rather than discouraged.
    const asked = exchange.question?.text?.trim()
    const lines = (exchange.lines ?? []).filter((l) => l.text?.trim() !== asked)

    return json(200, { ...exchange, lines, card_slug: card.slug })
  } catch (error) {
    const retryable = error instanceof LlmError && error.retryable
    return json(retryable ? 503 : 502, {
      error: 'exchange_failed',
      message: 'The board could not be reached. Nothing has been lost.',
      retryable
    })
  }
}
