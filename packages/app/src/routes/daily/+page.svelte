<script>
  import { onMount } from 'svelte'
  import AnswerBox from '$lib/AnswerBox.svelte'
  import { loadCards } from '$lib/corpus.js'
  import { DAILY_LENGTH, localDay, pickDaily, resultTile } from '$lib/daily.js'
  import { QUESTIONS } from '$lib/questions.js'
  import { accessToken, ensureSession, isConfigured } from '$lib/auth.js'
  import { completeDay, loadDay, loadStreak, saveDay } from '$lib/progress.js'

  const day = localDay()

  let prompts = $state([])
  let cards = $state(new Map())
  let step = $state(0)
  let results = $state([])
  let verdict = $state(null)
  let grading = $state(false)
  let loadState = $state('loading')
  let streak = $state({ current: 0, longest: 0 })
  let copied = $state(false)

  const current = $derived(prompts[step] ?? null)
  const card = $derived(current ? cards.get(current.slug) : null)
  const done = $derived(prompts.length > 0 && step >= prompts.length)
  const tile = $derived(done ? resultTile(day, results.map((r) => r.verdict)) : '')

  onMount(async () => {
    try {
      const data = await loadCards()
      cards = new Map(data.cards.map((c) => [c.slug, c]))
      prompts = pickDaily(data.cards, { day })

      // Resume rather than restart. Abandoning mid-chain and coming back the
      // same day should continue, or a dropped connection costs the whole run.
      const saved = loadDay(day)
      if (saved) {
        results = saved.results
        step = saved.results.length
      }
      streak = loadStreak()
      loadState = 'ready'
    } catch {
      loadState = 'failed'
    }
  })

  const questionFor = (prompt, forCard) => QUESTIONS[prompt.facet](forCard)

  const submit = async ({ answer, elapsedMs }) => {
    grading = true
    try {
      if (!isConfigured()) throw new Error('unconfigured')
      const session = await ensureSession()
      if (!session) throw new Error('no-session')

      const response = await fetch('/.netlify/functions/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await accessToken()}`
        },
        body: JSON.stringify({
          card,
          facet: current.facet,
          question: questionFor(current, card),
          answer,
          elapsedMs,
          source: 'daily'
        })
      })

      const body = await response.json()

      if (!response.ok) {
        // A budget refusal reads as a cool-down and an outage reads as an
        // outage. Neither is ever dressed up as a verdict.
        verdict = {
          verdict: 'ungraded',
          missed: [],
          rubric: {},
          answer,
          tell:
            body.error === 'rate_limited'
              ? body.message
              : 'The grader could not be reached, so this one does not count.'
        }
      } else {
        verdict = { ...body, answer }
      }
    } catch {
      verdict = {
        verdict: 'ungraded',
        missed: [],
        rubric: {},
        answer,
        tell:
          'Grading is not connected in this build, so this was not scored. Your answer is below, next to what the card says, so you can mark it yourself.'
      }
    } finally {
      grading = false
    }
  }

  const advance = () => {
    results = [...results, { slug: current.slug, facet: current.facet, verdict: verdict.verdict }]
    saveDay(day, { results })
    verdict = null
    step += 1
    if (step >= prompts.length) streak = completeDay(day)
  }

  const copyTile = async () => {
    try {
      await navigator.clipboard.writeText(tile)
      copied = true
      setTimeout(() => (copied = false), 2000)
    } catch {
      copied = false
    }
  }
</script>

<svelte:head><title>The Daily — The Hot Seat</title></svelte:head>

{#if loadState === 'loading'}
  <p class="status">Loading today's five...</p>
{:else if loadState === 'failed'}
  <p class="status bad">The corpus did not load. Reference mode may still work offline.</p>
{:else if done}
  <section class="done card">
    <p class="eyebrow">{day}</p>
    <h1>Done for today</h1>
    <p class="squares">{tile.split('\n')[1]}</p>

    {#if streak.current > 0}
      <p class="streak">
        <span class="mono">{streak.current}</span>
        {streak.current === 1 ? 'day' : 'days'} in a row
      </p>
    {/if}

    <ul class="recap">
      {#each results as result (result.slug)}
        <li>
          <span class="dot {result.verdict}"></span>
          <a href="/reference/{result.slug}">{cards.get(result.slug)?.title ?? result.slug}</a>
          <span class="tag">{result.facet}</span>
        </li>
      {/each}
    </ul>

    <div class="actions">
      <button type="button" class="btn btn-primary" onclick={copyTile}>
        {copied ? 'Copied' : 'Copy result'}
      </button>
      <a href="/reference" class="btn">Read the cards</a>
    </div>
    <p class="back">Five more tomorrow. That is the whole design.</p>
  </section>
{:else}
  <div class="progress">
    {#each prompts as _, i (i)}
      <span class="pip" class:filled={i < step} class:now={i === step}></span>
    {/each}
    <span class="counter mono">{step + 1} / {DAILY_LENGTH}</span>
  </div>

  {#if current && card}
    {#if verdict}
      <section class="reveal card">
        <p class="eyebrow verdict-{verdict.verdict}">
          {verdict.verdict === 'ungraded' ? 'Not scored' : verdict.verdict}
        </p>
        <p class="tell">{verdict.tell}</p>

        {#if verdict.hesitated}
          <p class="hesitated">
            You had it, but you had to reach for it. That pause is what gets noticed in a room.
          </p>
        {/if}

        {#if verdict.missed?.length}
          <p class="eyebrow">Missed</p>
          <ul class="missed">
            {#each verdict.missed as item (item)}<li>{item}</li>{/each}
          </ul>
        {/if}

        {#if verdict.verdict === 'ungraded' && verdict.answer}
          <p class="eyebrow">You wrote</p>
          <p class="canon">{verdict.answer}</p>
        {/if}

        <p class="eyebrow">The card says</p>
        <p class="canon">{card.facets.definition}</p>

        <div class="actions">
          <button type="button" class="btn btn-primary" onclick={advance}>
            {step + 1 === prompts.length ? 'Finish' : 'Next'}
          </button>
          <a href="/reference/{card.slug}" class="btn">Full card</a>
        </div>
      </section>
    {:else}
      <AnswerBox question={questionFor(current, card)} disabled={grading} onsubmit={submit} />
      {#if grading}<p class="status" role="status">Grading...</p>{/if}
    {/if}
  {/if}
{/if}

<style>
  .status {
    color: var(--muted);
    padding: var(--gap-lg) 0;
  }
  .status.bad {
    color: var(--bad);
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: var(--gap-lg);
  }
  .pip {
    width: 26px;
    height: 4px;
    border-radius: 2px;
    background: var(--border);
  }
  .pip.filled {
    background: var(--accent);
  }
  .pip.now {
    background: var(--accent-2);
  }
  .counter {
    margin-left: auto;
    font-size: 0.7rem;
    color: var(--faint);
    letter-spacing: 0.1em;
  }

  .reveal .tell {
    font-size: 1.05rem;
    margin-bottom: var(--gap);
  }
  .verdict-correct {
    color: var(--good);
  }
  .verdict-partial {
    color: var(--warn);
  }
  .verdict-wrong {
    color: var(--bad);
  }
  .verdict-ungraded {
    color: var(--muted);
  }

  .hesitated {
    background: var(--warn-wash);
    border-radius: var(--radius-sm);
    padding: var(--gap-sm) var(--gap);
    color: var(--mid);
    font-size: 0.9rem;
    margin-bottom: var(--gap);
  }

  .missed {
    color: var(--mid);
    margin: 0 0 var(--gap);
    padding-left: 1.2em;
  }
  .canon {
    color: var(--mid);
    padding: var(--gap-sm) var(--gap);
    border-left: 2px solid var(--border);
    margin-bottom: var(--gap-lg);
  }

  .actions {
    display: flex;
    gap: var(--gap-sm);
    flex-wrap: wrap;
  }

  .done h1 {
    margin: var(--gap-xs) 0 var(--gap);
  }
  .squares {
    font-size: 1.6rem;
    letter-spacing: 3px;
    margin-bottom: var(--gap-sm);
  }
  .streak {
    color: var(--mid);
    margin-bottom: var(--gap-lg);
  }
  .streak .mono {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--accent);
  }
  .recap {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--gap-lg);
    display: grid;
    gap: var(--gap-xs);
  }
  .recap li {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
    font-size: 0.9rem;
  }
  .recap a {
    color: var(--text);
    text-decoration: none;
  }
  .recap a:hover {
    color: var(--accent);
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot.correct {
    background: var(--good);
  }
  .dot.partial {
    background: var(--warn);
  }
  .dot.wrong {
    background: var(--bad);
  }
  .dot.ungraded {
    background: var(--faint);
  }
  .back {
    margin-top: var(--gap-lg);
    color: var(--muted);
    font-size: 0.85rem;
  }
</style>
