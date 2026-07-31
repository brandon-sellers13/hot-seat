/**
 * Provider adapter.
 *
 * Two methods, one narrow interface, so the model is a configuration value
 * rather than an architectural commitment. A forker points at whatever they
 * already pay for by changing environment variables, and a price change at
 * either vendor is an edit rather than a refactor.
 *
 * Reasoning effort is set explicitly on every single call. Model defaults
 * differ (Luna defaults to medium, Sol to low) and leaving it unstated would
 * silently double the bill and, worse, slow the first token. The Hot Seat
 * measures how long a player hesitates before typing, so a slow response
 * corrupts the measurement the whole design rests on. Latency is a correctness
 * concern here, not a comfort one.
 */

const OPENAI_URL = 'https://api.openai.com/v1/responses'

export const MODELS = {
  grade: process.env.GRADE_MODEL ?? 'gpt-5.6-luna',
  interrogate: process.env.INTERROGATE_MODEL ?? 'gpt-5.6-sol'
}

export const EFFORT = {
  grade: process.env.GRADE_EFFORT ?? 'low',
  interrogate: process.env.INTERROGATE_EFFORT ?? 'low',
  // The single exception in the shipped mix. The trap is the dramatic peak the
  // session builds toward, and it is the one turn worth paying more for.
  trap: process.env.TRAP_EFFORT ?? 'medium'
}

/** Thrown for anything the caller must not present as a verdict. */
export class LlmError extends Error {
  constructor(message, { status, retryable = false, detail } = {}) {
    // The provider's own explanation is the only thing that makes a 400
    // diagnosable, so it belongs in the message rather than in a field that
    // stack traces drop.
    super(detail ? `${message}: ${detail}` : message)
    this.name = 'LlmError'
    this.status = status
    this.retryable = retryable
    this.detail = detail
  }
}

const collectText = (payload) =>
  (payload.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((part) => part.type === 'output_text')
    .map((part) => part.text)
    .join('')

const collectRefusal = (payload) =>
  (payload.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((part) => part.type === 'refusal')
    .map((part) => part.refusal)
    .join(' ')

/**
 * Cost accounting per call. Reasoning tokens bill as output, and omitting them
 * is exactly the error that made an earlier version of the cost model wrong by
 * roughly 70 per cent, so they are surfaced rather than folded in silently.
 */
export const readUsage = (payload) => {
  const usage = payload.usage ?? {}
  return {
    input: usage.input_tokens ?? 0,
    output: usage.output_tokens ?? 0,
    reasoning: usage.output_tokens_details?.reasoning_tokens ?? 0,
    cached: usage.input_tokens_details?.cached_tokens ?? 0,
    cacheWrites: usage.input_tokens_details?.cache_write_tokens ?? 0
  }
}

const callOpenAi = async ({ apiKey, model, effort, instructions, input, schema, signal }) => {
  const body = {
    model,
    instructions,
    input,
    reasoning: { effort },
    max_output_tokens: schema ? 3000 : 1200,
    // Deterministic-ish grading. The interrogator gets its character from the
    // prompt rather than from sampling, which is steadier across turns.
    store: false
  }

  if (schema) {
    body.text = {
      format: {
        type: 'json_schema',
        name: schema.name,
        schema: schema.schema,
        strict: true
      }
    }
  }

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    signal
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new LlmError(`Provider returned ${response.status}`, {
      status: response.status,
      // 429 and 5xx are worth retrying; a 400 means we sent something wrong and
      // retrying it would just spend money to fail again.
      retryable: response.status === 429 || response.status >= 500,
      detail: detail.slice(0, 400)
    })
  }

  const payload = await response.json()

  const refusal = collectRefusal(payload)
  if (refusal) throw new LlmError(`Provider refused: ${refusal}`)

  if (payload.status === 'incomplete') {
    throw new LlmError(
      `Response incomplete: ${payload.incomplete_details?.reason ?? 'unknown'}`
    )
  }

  return { text: collectText(payload), usage: readUsage(payload), raw: payload }
}

/**
 * Grade one typed answer against the facets supplied in the prompt.
 *
 * Structured output is enforced at the API layer, so the caller never parses
 * free text and a malformed verdict is impossible rather than merely unlikely.
 */
export const grade = async ({ apiKey, instructions, input, schema, effort, model, signal }) => {
  const result = await callOpenAi({
    apiKey,
    model: model ?? MODELS.grade,
    effort: effort ?? EFFORT.grade,
    instructions,
    input,
    schema,
    signal
  })

  let parsed
  try {
    parsed = JSON.parse(result.text)
  } catch {
    // Should be unreachable with strict schemas, but a fabricated verdict is
    // worse than an honest failure: it corrupts the scheduler and the player's
    // trust at the same time.
    throw new LlmError('Verdict was not valid JSON')
  }

  return { ...parsed, usage: result.usage }
}

/** One interrogator turn. Character, escalation and trap placement. */
export const interrogate = async ({
  apiKey,
  instructions,
  input,
  schema,
  effort,
  model,
  signal
}) =>
  callOpenAi({
    apiKey,
    model: model ?? MODELS.interrogate,
    effort: effort ?? EFFORT.interrogate,
    instructions,
    input,
    schema,
    signal
  })
