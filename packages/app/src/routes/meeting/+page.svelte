<script>
  import { onMount } from 'svelte'
  import BoardPack from '$lib/BoardPack.svelte'
  import Typewriter from '$lib/Typewriter.svelte'
  import { COMPANY, SECTIONS } from '$lib/pack/arbor.js'
  import { BOARD, ASKS, speaker } from '$lib/board.js'
  import { loadCards } from '$lib/corpus.js'
  import { accessToken, ensureSession, isConfigured } from '$lib/auth.js'
  import { ANSWERABLE } from '$lib/pack/arbor.js'

  /**
   * The walking skeleton: one exchange, end to end.
   *
   * Generate from a card plus the pack, render it as dialogue, take a spoken or
   * typed answer, grade it, show the result. Everything the full meeting needs
   * is exercised here once.
   */
  let phase = $state('idle')      // idle | loading | asking | grading | done
  let exchange = $state(null)
  let card = $state(null)
  let verdict = $state(null)
  let error = $state(null)
  let answer = $state('')
  let ask = $state(ASKS[0])
  // Carried between exchanges. Without it every exchange would open a new
  // meeting and eat the weekly cap in four turns.
  let sessionId = $state(null)

  // Navigation is the retrieval instrument. Which sources were opened, in what
  // order, and for how long separates someone who knew where to look from
  // someone who read everything.
  let nav = $state([])
  let shownAt = 0
  let readyAt = $state(null)

  const post = async (path, body) => {
    const session = await ensureSession()
    if (!session) throw new Error('no-session')
    const r = await fetch(`/.netlify/functions/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await accessToken()}` },
      body: JSON.stringify(body)
    })
    const payload = await r.json()
    if (!r.ok) throw Object.assign(new Error(payload.error), { payload })
    return payload
  }

  const start = async (fresh = false) => {
    if (!isConfigured()) { error = 'Sign-in is not configured in this build.'; return }
    phase = 'loading'; error = null; verdict = null; answer = ''; nav = []; readyAt = null
    if (fresh) sessionId = null
    try {
      const data = await loadCards()
      // Any card the pack can actually answer. The full meeting will schedule
      // these deliberately; the skeleton just needs one.
      // Only metrics the pack can actually answer. LTV:CAC was dropped after
      // testing: with no LTV inputs on the page the model invented a horizon,
      // which is a pack gap rather than a prompt failure.
      const pool = data.cards.filter((c) => ANSWERABLE.has(c.slug))
      card = pool[Math.floor(Math.random() * pool.length)]
      exchange = await post('exchange', { card, pack: SECTIONS, ask, sessionId })
      sessionId = exchange.session_id ?? sessionId
      shownAt = performance.now()
      phase = 'asking'
    } catch (caught) {
      error = caught.payload?.message ?? 'Could not reach the board.'
      phase = 'idle'
    }
  }

  // Hesitation is time from the question landing to signalling you are ready.
  // Not time to first keystroke: dictation inserts a whole answer at once, so
  // that would read a considered spoken answer as a twenty-second pause.
  const ready = () => { readyAt = performance.now() - shownAt }

  const submit = async () => {
    if (!answer.trim()) return
    phase = 'grading'
    try {
      verdict = await post('grade', {
        card,
        facet: 'definition',
        question: `${exchange.lines.map((l) => `${speaker(l.speaker).name}: ${l.text}`).join('\n')}\n${speaker(exchange.question.speaker).name}: ${exchange.question.text}`,
        answer,
        pack: SECTIONS,
        reference: exchange.strong_answer,
        elapsedMs: readyAt ?? undefined,
        threshold: 12000,
        source: 'hot_seat'
      })
    } catch (caught) {
      verdict = { verdict: 'ungraded', tell: caught.payload?.message ?? 'Could not grade that one.', missed: [], rubric: {} }
    }
    phase = 'done'
  }
</script>

<svelte:head><title>The Meeting</title></svelte:head>

<section class="head">
  <p class="eyebrow">{COMPANY.name} &middot; {COMPANY.period}</p>
  <h1>The meeting</h1>
  {#if phase === 'idle'}
    <p class="body">You are VP of Marketing. You came in asking for something, and the board has read the pack.</p>
    <label class="askpick">
      <span class="eyebrow">What you are asking for</span>
      <select bind:value={ask}>{#each ASKS as a (a)}<option value={a}>{a}</option>{/each}</select>
    </label>
    {#if error}<p class="err">{error}</p>{/if}
    <button class="btn btn-primary" onclick={() => start(true)}>Go in</button>
  {:else}
    <p class="ask"><span class="eyebrow">Your ask</span> {ask}</p>
  {/if}
</section>

{#if phase === 'loading'}
  <p class="status">The board is settling...</p>
{/if}

{#if exchange && phase !== 'idle' && phase !== 'loading'}
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

  {#if phase === 'asking'}
    {#if readyAt === null}
      <!-- One control, hit by keyboard or tap. This is what gets timed. -->
      <button class="btn btn-primary big" onclick={ready}>I'm ready to answer</button>
      <p class="hint">The clock is running until you press this. After that, take as long as you like.</p>
    {:else}
      <p class="hint mono">thought &middot; {(readyAt / 1000).toFixed(1)}s</p>
      <textarea bind:value={answer} rows="5"
        placeholder="Speak it, or type it. Dictation works — this is just a text box."></textarea>
      <button class="btn btn-primary" onclick={submit} disabled={!answer.trim()}>Answer the board</button>
    {/if}
  {:else if phase === 'grading'}
    <p class="status">They are considering it...</p>
  {:else if verdict}
    <section class="verdict v-{verdict.verdict}">
      <p class="eyebrow">{verdict.verdict}</p>
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
    <button class="btn btn-primary" onclick={start}>Another exchange</button>
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
  .askpick { display: block; margin-bottom: var(--gap); }
  .askpick select { display: block; margin-top: 4px; width: 100%; max-width: 52ch; padding: 8px 10px;
    border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--card); color: var(--text); font-family: var(--sans); }
  .ask { color: var(--mid); font-size: .9rem; }
  .ask .eyebrow { margin-right: 6px; }
  .err { color: var(--bad); font-size: .88rem; margin-bottom: var(--gap-sm); }
  .status { color: var(--muted); font-style: italic; margin: var(--gap) 0; }

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
    background: var(--card); color: var(--text); font-family: var(--sans); font-size: 1rem; margin-bottom: var(--gap-sm); }

  .verdict { border-radius: var(--radius); padding: var(--gap); margin-bottom: var(--gap); }
  .v-correct { background: var(--good-wash); }
  .v-partial { background: var(--warn-wash); }
  .v-wrong, .v-ungraded { background: var(--bad-wash); }
  .verdict ul { margin: 4px 0 0; padding-left: 1.1em; color: var(--mid); font-size: .9rem; }

  .strong, .packwrap { margin-bottom: var(--gap); }
  summary { cursor: pointer; font-size: .85rem; color: var(--muted); margin-bottom: var(--gap-sm); }
  .strong p { color: var(--mid); font-size: .92rem; }
</style>
