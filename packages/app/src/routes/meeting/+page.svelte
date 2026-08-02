<script>
  import BoardPack from '$lib/BoardPack.svelte'
  import Typewriter from '$lib/Typewriter.svelte'
  import { COMPANY, SECTIONS, ANSWERABLE } from '$lib/pack/arbor.js'
  import { ASKS, speaker } from '$lib/board.js'
  import { loadCards } from '$lib/corpus.js'
  import { accessToken, ensureSession, isConfigured } from '$lib/auth.js'
  import {
    CREDIBILITY_START,
    DECISIONS,
    MEETING_LENGTHS,
    OUTCOMES,
    planMeeting
  } from '$lib/meeting.js'

  /**
   * The meeting.
   *
   * Six exchanges or twenty, one ask threaded through all of them, credibility
   * draining as the board catches you out, and an ending that says what
   * happened to the ask.
   *
   * Two things this file deliberately does not do.
   *
   * It does not decide when the meeting is over. The server drains credibility
   * off the verdict it produced and stamps `ended_at`, and /exchange refuses a
   * session that has one. Everything here reads `meeting.over` off the grade
   * response rather than working it out, because a stopping rule computed in a
   * browser is a stopping rule anyone can decline.
   *
   * It does not manage the session. /exchange creates it and returns the id,
   * which is passed back on every call. Starting a second meeting by accident
   * is how the weekly cap gets eaten in four turns.
   */

  const PHASES = /** @type {const} */ ({
    setup: 'setup',
    opening: 'opening',
    asking: 'asking',
    grading: 'grading',
    verdict: 'verdict',
    ended: 'ended'
  })

  let phase = $state(PHASES.setup)
  let error = $state(null)

  // Chosen before you walk in, and fixed for the meeting.
  let ask = $state(ASKS[0])
  let length = $state('short')

  let sessionId = $state(null)
  let plan = $state([])
  let index = $state(0)
  let credibility = $state(CREDIBILITY_START)
  let ending = $state(null)

  let cards = $state([])
  let exchange = $state(null)
  let card = $state(null)
  let verdict = $state(null)
  let answer = $state('')

  /**
   * The next exchange, generated while the player is still answering this one.
   *
   * Generation was measured at about nine seconds. A meeting that waits until
   * the current answer is graded before it starts the next one spends those
   * nine seconds in front of the player up to twenty times, which is most of a
   * long meeting spent watching a spinner.
   *
   * Always a promise that resolves rather than rejects. The meeting can end
   * while a generation is in flight, and that generation then lands on a closed
   * session and is refused. That is expected, not an error, and it must not
   * surface as an unhandled rejection.
   */
  let pending = null

  // Navigation is the retrieval instrument. Which sources were opened, in what
  // order, and for how long separates someone who knew where to look from
  // someone who read everything.
  let nav = $state([])
  let shownAt = 0
  let readyAt = $state(null)

  const answered = $derived(index)
  const planned = $derived(plan.length)

  const post = async (path, body) => {
    const session = await ensureSession()
    if (!session) throw new Error('no-session')
    const r = await fetch(`/.netlify/functions/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await accessToken()}`
      },
      body: JSON.stringify(body)
    })
    const payload = await r.json()
    if (!r.ok) throw Object.assign(new Error(payload.error), { payload })
    return payload
  }

  const generate = (entry) =>
    post('exchange', {
      card: cards.find((c) => c.slug === entry.slug),
      pack: SECTIONS,
      ask,
      shape: entry.shape,
      length,
      sessionId
    })

  /** Settled either way, so awaiting it never throws. See `pending`. */
  const prefetch = (i) => {
    if (i >= plan.length) return (pending = null)
    pending = generate(plan[i]).then(
      (value) => ({ ok: true, value }),
      (caught) => ({ ok: false, caught })
    )
  }

  const show = (data) => {
    exchange = data
    card = cards.find((c) => c.slug === data.card_slug)
    answer = ''
    verdict = null
    readyAt = null
    nav = []
    shownAt = performance.now()
    phase = PHASES.asking
  }

  const start = async () => {
    if (!isConfigured()) {
      error = 'Sign-in is not configured in this build.'
      return
    }
    phase = PHASES.opening
    error = null
    sessionId = null
    ending = null
    index = 0
    credibility = CREDIBILITY_START

    try {
      const data = await loadCards()
      // Only metrics the pack can actually answer. Asking about one whose
      // inputs are absent is what makes the generator invent them, which is a
      // pack gap wearing a hallucination's clothes.
      cards = data.cards.filter((c) => ANSWERABLE.has(c.slug))
      plan = planMeeting({
        slugs: cards.map((c) => c.slug),
        count: MEETING_LENGTHS[length]
      })

      const first = await generate(plan[0])
      sessionId = first.session_id ?? sessionId
      show(first)
      prefetch(1)
    } catch (caught) {
      error = caught.payload?.message ?? 'Could not reach the board.'
      phase = PHASES.setup
    }
  }

  // Hesitation is time from the question landing to signalling you are ready.
  // Not time to first keystroke: dictation inserts a whole answer at once, so
  // that would read a considered spoken answer as a twenty-second pause.
  const ready = () => (readyAt = performance.now() - shownAt)

  const submit = async () => {
    if (!answer.trim()) return
    phase = PHASES.grading
    try {
      const graded = await post('grade', {
        card,
        // Labelled as a board exchange rather than as a definition. The exchange
        // grader marks against the reference answer, so this only names the row
        // it writes, but naming twenty board exchanges a session as definition
        // recall put every one of them in the wrong bucket.
        facet: 'exchange',
        question: `${exchange.lines.map((l) => `${speaker(l.speaker).name}: ${l.text}`).join('\n')}\n${speaker(exchange.question.speaker).name}: ${exchange.question.text}`,
        answer,
        pack: SECTIONS,
        reference: exchange.strong_answer,
        // Derived server-side from the shape this exchange was generated with,
        // then handed back. A refusal is correct only when the pack genuinely
        // cannot settle the question, and before this every unsettled question
        // was graded as though it could be.
        answerable: exchange.answerable ?? true,
        elapsedMs: readyAt ?? undefined,
        threshold: 12000,
        source: 'hot_seat',
        sessionId
      })

      verdict = graded
      if (graded.meeting) {
        credibility = graded.meeting.credibility
        index = graded.meeting.answered
        if (graded.meeting.over) {
          ending = graded.meeting
          phase = PHASES.ended
          return
        }
      } else {
        index += 1
      }
      phase = PHASES.verdict
    } catch (caught) {
      // An ungraded answer costs no credibility and does not advance the
      // meeting, because it is our failure and not the player's.
      verdict = {
        verdict: 'ungraded',
        tell: caught.payload?.message ?? 'Could not grade that one.',
        missed: [],
        rubric: {}
      }
      phase = PHASES.verdict
    }
  }

  const next = async () => {
    // The server ends the meeting on the last answer, so this should be
    // unreachable. It is here because the failure if it ever is reachable is
    // generating from `plan[undefined]` and throwing mid-meeting, and a guard
    // is cheaper than that.
    if (index >= plan.length) return walkOut()

    phase = PHASES.opening
    const settled = pending ? await pending : null
    if (settled?.ok) {
      show(settled.value)
      prefetch(index + 1)
      return
    }
    // The pre-generation failed or was refused. Retry once in the open rather
    // than silently, since by now the player is watching.
    try {
      const data = await generate(plan[index])
      show(data)
      prefetch(index + 1)
    } catch (caught) {
      error = caught.payload?.message ?? 'The board could not be reached.'
      phase = PHASES.verdict
    }
  }

  const walkOut = async () => {
    try {
      const closed = await post('adjourn', { sessionId })
      ending = closed.meeting
      phase = PHASES.ended
    } catch (caught) {
      // The meeting was not closed on the server, so it is not reported as
      // closed here either. Showing an ending we invented would have the
      // client and the database disagreeing about whether it is finished, and
      // the database is the one /exchange asks.
      error = caught.payload?.message ?? 'Could not close the meeting. It is still open.'
    }
  }

  const again = () => {
    phase = PHASES.setup
    exchange = null
    verdict = null
    ending = null
    pending = null
  }
</script>

<svelte:head><title>The Meeting</title></svelte:head>

<section class="head">
  <p class="eyebrow">{COMPANY.name} &middot; {COMPANY.period}</p>
  <h1>The meeting</h1>

  {#if phase === PHASES.setup}
    <p class="body">
      You are VP of Marketing. You came in asking for something, and the board has read the pack.
    </p>
    <label class="pick">
      <span class="eyebrow">What you are asking for</span>
      <select bind:value={ask}>{#each ASKS as a (a)}<option value={a}>{a}</option>{/each}</select>
    </label>
    <label class="pick">
      <span class="eyebrow">How long you have</span>
      <select bind:value={length}>
        <option value="short">Short meeting &middot; {MEETING_LENGTHS.short} exchanges</option>
        <option value="long">Long meeting &middot; {MEETING_LENGTHS.long} exchanges</option>
      </select>
    </label>
    {#if error}<p class="err">{error}</p>{/if}
    <button class="btn btn-primary" onclick={start}>Go in</button>
  {:else}
    <p class="ask"><span class="eyebrow">Your ask</span> {ask}</p>
    <div class="meter">
      <span class="eyebrow">Credibility</span>
      <span class="pips" aria-label="{credibility} of {CREDIBILITY_START} credibility remaining">
        {#each Array.from({ length: CREDIBILITY_START }, (_, i) => i) as i (i)}
          <span class="pip" class:spent={i >= credibility}></span>
        {/each}
      </span>
      {#if phase !== PHASES.ended}
        <span class="count">Exchange {Math.min(answered + 1, planned)} of {planned}</span>
      {/if}
    </div>
  {/if}
</section>

{#if phase === PHASES.opening}
  <p class="status">{answered === 0 ? 'The board is settling...' : 'They are moving on...'}</p>
{/if}

{#if phase === PHASES.ended && ending}
  <section class="ending">
    <p class="eyebrow">{ending.decision}</p>
    <p class="decision">{DECISIONS[ending.decision]}</p>
    <p class="outcome">{OUTCOMES[ending.outcome]}</p>
    <p class="tally">
      {ending.answered} of {ending.planned} exchanges answered &middot; {ending.credibility} of {CREDIBILITY_START}
      credibility left
    </p>
  </section>
  <button class="btn btn-primary" onclick={again}>Another meeting</button>
{/if}

{#if exchange && phase !== PHASES.setup && phase !== PHASES.opening && phase !== PHASES.ended}
  <section class="room">
    {#each exchange.lines as line, i (i)}
      <p class="line">
        <strong>{speaker(line.speaker).name}</strong>
        <span class="role">{speaker(line.speaker).role}</span><br />
        {line.text}
      </p>
    {/each}
    <div class="q">
      <strong>{speaker(exchange.question.speaker).name}</strong>
      <Typewriter text={exchange.question.text} />
    </div>
  </section>

  {#if phase === PHASES.asking}
    {#if readyAt === null}
      <!-- One control, hit by keyboard or tap. This is what gets timed. -->
      <button class="btn btn-primary big" onclick={ready}>I'm ready to answer</button>
      <p class="hint">
        The clock is running until you press this. After that, take as long as you like.
      </p>
    {:else}
      <p class="hint mono">thought &middot; {(readyAt / 1000).toFixed(1)}s</p>
      <textarea
        bind:value={answer}
        rows="5"
        placeholder="Speak it, or type it. Dictation works — this is just a text box."
      ></textarea>
      <button class="btn btn-primary" onclick={submit} disabled={!answer.trim()}>
        Answer the board
      </button>
    {/if}
  {:else if phase === PHASES.grading}
    <p class="status">They are considering it...</p>
  {:else if verdict}
    <section class="verdict v-{verdict.verdict}">
      <p class="eyebrow">{verdict.verdict}{verdict.stance ? ` · ${verdict.stance}` : ''}</p>
      <p>{verdict.tell}</p>
      {#if verdict.missed?.length}
        <p class="eyebrow" style="margin-top:12px">Not said</p>
        <ul>{#each verdict.missed as m (m)}<li>{m}</li>{/each}</ul>
      {/if}
    </section>
    <details class="strong">
      <summary>What a strong answer contained</summary>
      <p>{exchange.strong_answer}</p>
    </details>
    {#if error}<p class="err">{error}</p>{/if}
    <div class="onward">
      <button class="btn btn-primary" onclick={next}>Next exchange</button>
      <button class="btn" onclick={walkOut}>Leave the meeting</button>
    </div>
  {/if}

  <details class="packwrap" open>
    <summary>Board pack</summary>
    <BoardPack onnavigate={(e) => (nav = [...nav, e])} />
  </details>
{/if}

<style>
  .head { margin-bottom: var(--gap-lg); }
  h1 { margin: var(--gap-xs) 0 var(--gap-sm); }
  .body { color: var(--mid); max-width: 58ch; margin-bottom: var(--gap); }
  .pick { display: block; margin-bottom: var(--gap-sm); }
  .pick select { display: block; margin-top: 4px; width: 100%; max-width: 52ch; padding: 8px 10px;
    border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--card);
    color: var(--text); font-family: var(--sans); }
  .ask { color: var(--mid); font-size: .9rem; }
  .ask .eyebrow { margin-right: 6px; }
  .err { color: var(--bad); font-size: .88rem; margin-bottom: var(--gap-sm); }
  .status { color: var(--muted); font-style: italic; margin: var(--gap) 0; }

  .meter { display: flex; align-items: center; gap: 10px; margin-top: var(--gap-xs); flex-wrap: wrap; }
  .pips { display: inline-flex; gap: 4px; }
  .pip { width: 22px; height: 6px; border-radius: 3px; background: var(--good, #4a8); }
  .pip.spent { background: var(--border); }
  .count { font-size: .78rem; color: var(--muted); }

  .room { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: var(--gap-lg); margin-bottom: var(--gap); }
  .line { color: var(--mid); margin-bottom: var(--gap); }
  .line strong { color: var(--text); }
  .role { font-size: .72rem; color: var(--muted); margin-left: 6px; }
  .q { border-top: 1px solid var(--border); padding-top: var(--gap); font-size: 1.05rem; }
  .q strong { display: block; margin-bottom: 4px; }

  .big { font-size: 1rem; padding: 12px 24px; }
  .hint { font-size: .8rem; color: var(--muted); margin: var(--gap-xs) 0 var(--gap); }
  textarea { width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: var(--radius-sm);
    background: var(--card); color: var(--text); font-family: var(--sans); font-size: 1rem;
    margin-bottom: var(--gap-sm); }

  .verdict { border-radius: var(--radius); padding: var(--gap); margin-bottom: var(--gap); }
  .v-correct { background: var(--good-wash); }
  .v-partial { background: var(--warn-wash); }
  .v-wrong, .v-ungraded { background: var(--bad-wash); }
  .verdict ul { margin: 4px 0 0; padding-left: 1.1em; color: var(--mid); font-size: .9rem; }

  .onward { display: flex; gap: var(--gap-sm); flex-wrap: wrap; margin-bottom: var(--gap); }

  .ending { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: var(--gap-lg); margin-bottom: var(--gap); }
  .decision { font-size: 1.05rem; margin-bottom: var(--gap-sm); }
  .outcome { color: var(--mid); margin-bottom: var(--gap-sm); }
  .tally { font-size: .8rem; color: var(--muted); }

  .strong, .packwrap { margin-bottom: var(--gap); }
  summary { cursor: pointer; font-size: .85rem; color: var(--muted); margin-bottom: var(--gap-sm); }
  .strong p { color: var(--mid); font-size: .92rem; }
</style>
