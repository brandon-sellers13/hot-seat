<script>
  import { onMount, onDestroy } from 'svelte'

  /**
   * Typed answer with a latency measurement.
   *
   * The timer runs from the moment the question is on screen to the first
   * keystroke, NOT to submission. That distinction is the whole point: it
   * measures thinking, not typing speed, so a fast typist and a slow one are
   * judged on the same thing.
   *
   * Past the threshold the answer is marked hesitated whatever the verdict. An
   * answer you had to reach for is not one you can give in a board meeting.
   */
  let {
    question,
    threshold = 5000,
    disabled = false,
    placeholder = 'Type your answer. No notes.',
    onsubmit
  } = $props()

  let value = $state('')
  let firstKeyAt = $state(null)
  let elapsed = $state(0)
  let startedAt = 0
  let frame

  const tick = () => {
    if (firstKeyAt === null) {
      elapsed = performance.now() - startedAt
      frame = requestAnimationFrame(tick)
    }
  }

  onMount(() => {
    startedAt = performance.now()
    frame = requestAnimationFrame(tick)
  })

  onDestroy(() => cancelAnimationFrame(frame))

  const onInput = () => {
    if (firstKeyAt === null && value.trim()) {
      firstKeyAt = performance.now()
      elapsed = firstKeyAt - startedAt
      cancelAnimationFrame(frame)
    }
  }

  const submit = (event) => {
    event?.preventDefault()
    if (!value.trim() || disabled) return
    onsubmit?.({ answer: value.trim(), elapsedMs: Math.round(elapsed) })
  }

  const onKeydown = (event) => {
    // Submitting with the keyboard keeps the whole loop on the keys, which is
    // what makes ninety seconds achievable.
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') submit(event)
  }

  const seconds = $derived((elapsed / 1000).toFixed(1))
  const late = $derived(elapsed > threshold)
  const stopped = $derived(firstKeyAt !== null)
</script>

<form onsubmit={submit}>
  <p class="question">{question}</p>

  <!-- The timer carries a text value, not only a colour, because drain
       communicated by colour alone fails for the commonest form of colour
       blindness and this number is doing real work. -->
  <p class="timer" class:late class:stopped aria-live="off">
    <span class="mono">{seconds}s</span>
    <span class="label">
      {#if stopped}
        thinking time
      {:else if late}
        still thinking
      {:else}
        counting
      {/if}
    </span>
  </p>

  <label>
    <span class="sr-only">Your answer</span>
    <textarea
      bind:value
      oninput={onInput}
      onkeydown={onKeydown}
      {placeholder}
      {disabled}
      rows="4"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
    ></textarea>
  </label>

  <div class="actions">
    <button type="submit" class="btn btn-primary" disabled={disabled || !value.trim()}>
      Answer
    </button>
    <span class="hint mono">⌘↵</span>
  </div>
</form>

<style>
  .question {
    font-size: 1.15rem;
    line-height: 1.5;
    margin-bottom: var(--gap);
  }

  .timer {
    display: flex;
    align-items: baseline;
    gap: var(--gap-xs);
    margin-bottom: var(--gap-sm);
  }
  .timer .mono {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }
  .timer .label {
    font-family: var(--mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--faint);
  }
  .timer.late .mono {
    color: var(--warn);
  }
  .timer.stopped .mono {
    color: var(--good);
  }

  textarea {
    width: 100%;
    font-family: var(--sans);
    font-size: 1rem;
    line-height: 1.5;
    padding: 12px 14px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text);
    resize: vertical;
  }
  textarea:focus {
    border-color: var(--accent);
  }
  textarea:disabled {
    opacity: 0.6;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
    margin-top: var(--gap-sm);
  }
  .hint {
    font-size: 0.7rem;
    color: var(--faint);
  }
  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
</style>
