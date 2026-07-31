<script>
  import { onMount } from 'svelte'
  import AnswerBox from '$lib/AnswerBox.svelte'
  import { loadCards } from '$lib/corpus.js'
  import { accessToken, ensureSession, isConfigured } from '$lib/auth.js'
  import { BOARD, SESSION, pickSessionCards, applyDelta, outcomeCopy } from '$lib/session.js'
  import Sprite from '$lib/Sprite.svelte'
  import Typewriter from '$lib/Typewriter.svelte'

  // The mock's sprite keys differ from the seat names used server-side.
  const SPRITE_FOR = { cfo: 'cfo', product: 'pro', growth: 'gro', ceo: 'ceo' }

  // Expression follows the moment: the model returns a mood per turn, and the
  // trap gets a hard cut to shock so the beat lands visually as well as in text.
  const MOOD_FOR = {
    neutral: 'neutral', stern: 'stern', pleased: 'pleased',
    shock: 'shock', pressing: 'stern'
  }

  let lineDone = $state(false)

  let phase = $state('intro') // intro | playing | over
  let cards = $state([])
  let byslug = $state(new Map())
  let turn = $state(null)
  let turnNo = $state(0)
  let history = $state([])
  let credibility = $state(SESSION.credibility)
  let verdict = $state(null)
  let busy = $state(false)
  let error = $state(null)
  let outcome = $state(null)

  // The trap lands once, somewhere in the middle, so it is neither the opener
  // nor predictable from the turn count.
  let trapTurn = $state(0)

  onMount(async () => {
    const data = await loadCards()
    byslug = new Map(data.cards.map((c) => [c.slug, c]))
  })

  const post = async (path, body) => {
    const session = await ensureSession()
    if (!session) throw new Error('no-session')
    const response = await fetch(`/.netlify/functions/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await accessToken()}`
      },
      body: JSON.stringify(body)
    })
    const payload = await response.json()
    if (!response.ok) throw Object.assign(new Error(payload.error), { payload })
    return payload
  }

  const nextTurn = async () => {
    busy = true
    error = null
    try {
      const next = turnNo + 1
      turn = await post('interrogate', {
        scenarioId: 'board-meeting',
        cards,
        history,
        turn: next,
        isTrap: next === trapTurn
      })
      turnNo = next
      verdict = null
      lineDone = false
    } catch (caught) {
      error =
        caught.payload?.message ??
        'The board could not be reached. Nothing you answered has been lost.'
    } finally {
      busy = false
    }
  }

  const start = async () => {
    if (!isConfigured()) {
      error = 'Sign-in is not configured in this build, so a session cannot start.'
      return
    }
    const data = await loadCards()
    cards = pickSessionCards(data.cards)
    trapTurn = 3 + Math.floor(Math.random() * 3)
    credibility = SESSION.credibility
    history = []
    turnNo = 0
    phase = 'playing'
    await nextTurn()
  }

  const answer = async ({ answer: text, elapsedMs }) => {
    busy = true
    const card = byslug.get(turn.card_slug)
    try {
      const graded = await post('grade', {
        card,
        facet: turn.facet,
        question: `${turn.line} ${turn.question}`,
        answer: text,
        elapsedMs,
        threshold: SESSION.hesitationMs,
        source: 'hot_seat'
      })
      verdict = graded
      credibility = applyDelta(credibility, {
        verdict: graded.verdict,
        isTrap: turn.is_trap,
        rubric: graded.rubric
      })
    } catch (caught) {
      verdict = {
        verdict: 'ungraded',
        tell:
          caught.payload?.message ??
          'That answer could not be graded, so it does not count against you.',
        missed: [],
        rubric: {}
      }
    } finally {
      history = [...history, { ...turn, answer: text }]
      busy = false
    }
  }

  const proceed = async () => {
    if (credibility <= 0 || turnNo >= SESSION.turns.max) {
      outcome = credibility <= 0 ? 'burned' : credibility <= 2 ? 'wounded' : 'survived'
      phase = 'over'
      return
    }
    await nextTurn()
  }

  const speaker = $derived(turn ? BOARD[turn.speaker] : null)
</script>

<svelte:head><title>The Hot Seat</title></svelte:head>

{#if phase === 'intro'}
  <section class="card intro">
    <p class="eyebrow">The Hot Seat</p>
    <h1>Quarterly board meeting</h1>
    <p class="body">
      Four people who have read the deck. Eight to twelve exchanges. They are supportive, and they
      are doing their job.
    </p>
    <p class="body">
      Somewhere in the meeting one of them will state a benchmark figure as fact. It will sound
      authoritative and it will not be real. Nobody will hint that it is wrong.
    </p>

    <p class="eyebrow">How to survive it</p>
    <ol class="rules">
      <li>Answer before you look anything up. The pause is what gets noticed.</li>
      <li>
        When a number is put to you, do not simply disagree. Put your own sourced figure next to it.
      </li>
      <li>
        Then say what you are doing about it. That is worth more than the number, and it is the part
        most people skip.
      </li>
    </ol>

    {#if error}<p class="error">{error}</p>{/if}
    <button type="button" class="btn btn-primary" onclick={start} disabled={busy}>
      {busy ? 'The board is sitting down...' : 'Take the seat'}
    </button>
  </section>
{:else if phase === 'over'}
  <section class="card over">
    <p class="eyebrow outcome-{outcome}">{outcome}</p>
    <h1>{outcomeCopy[outcome].title}</h1>
    <p class="body">{outcomeCopy[outcome].body}</p>

    <p class="eyebrow">What they asked</p>
    <ul class="recap">
      {#each history as item, i (i)}
        <li>
          <span class="who">{BOARD[item.speaker]?.name.split(' ')[0] ?? 'Board'}</span>
          <a href="/reference/{item.card_slug}">{byslug.get(item.card_slug)?.title ?? item.card_slug}</a>
          {#if item.is_trap}<span class="tag trap">trap</span>{/if}
        </li>
      {/each}
    </ul>

    <div class="actions">
      <a href="/reference" class="btn btn-primary">Read the cards they hit</a>
      <a href="/daily" class="btn">Today's five</a>
    </div>
  </section>
{:else}
  <div class="bar">
    <span class="eyebrow">Credibility</span>
    <span class="pips" role="img" aria-label="{credibility} of {SESSION.credibility} credibility remaining">
      {#each Array(SESSION.credibility) as _, i (i)}
        <span class="pip" class:gone={i >= credibility}></span>
      {/each}
    </span>
    <!-- Text as well as pips: drain communicated by colour alone fails for the
         commonest form of colour blindness, and this number is doing real work. -->
    <span class="count mono">{credibility}/{SESSION.credibility}</span>
    <span class="turn mono">turn {turnNo}</span>
  </div>

  {#if error}
    <p class="error">{error}</p>
    <button type="button" class="btn" onclick={nextTurn}>Try again</button>
  {:else if busy && !turn}
    <p class="status">The board is conferring...</p>
  {:else if turn}
    <!-- One speaker in close-up, the way the format calls for. The other seats
         are present but dimmed, so the room exists without competing with the
         person actually talking. -->
    <div class="stage">
      <div class="bench" aria-hidden="true">
        {#each Object.keys(BOARD) as seat (seat)}
          <span class="seat" class:active={seat === turn.speaker}>
            <Sprite who={SPRITE_FOR[seat]} mood={seat === turn.speaker ? MOOD_FOR[turn.mood] ?? 'neutral' : 'neutral'} px={seat === turn.speaker ? 5 : 3} />
          </span>
        {/each}
      </div>

      <div class="closeup" class:trap={turn.is_trap}>
        <Sprite
          who={SPRITE_FOR[turn.speaker]}
          mood={MOOD_FOR[turn.mood] ?? 'neutral'}
          px={9}
          label={speaker?.name}
        />
      </div>
    </div>

    <article class="dialogue" class:trap={turn.is_trap}>
      <header>
        <strong>{speaker?.name}</strong>
        <span class="role">{speaker?.role}</span>
      </header>
      <Typewriter text={turn.line} onDone={() => (lineDone = true)} />
      {#if lineDone}
        <p class="ask">{turn.question}</p>
      {/if}
    </article>

    {#if verdict}
      <section class="card reveal">
        <p class="eyebrow verdict-{verdict.verdict}">
          {verdict.verdict === 'ungraded' ? 'Not scored' : verdict.verdict}
        </p>
        <p class="tell">{verdict.tell}</p>

        {#if turn.is_trap}
          <div class="rubric">
            <p class="eyebrow">The board answer</p>
            <ul>
              <li class:hit={verdict.rubric?.anchored}>
                {verdict.rubric?.anchored ? '✓' : '✗'} Anchored your own number
              </li>
              <li class:hit={verdict.rubric?.sourced}>
                {verdict.rubric?.sourced ? '✓' : '✗'} Could source it
              </li>
              <li class:hit={verdict.rubric?.bridged}>
                {verdict.rubric?.bridged ? '✓' : '✗'} Bridged to strategy
              </li>
            </ul>
            <p class="trap-truth">
              There is no published benchmark for
              {byslug.get(turn.card_slug)?.title}. The figure quoted at you had no source.
            </p>
          </div>
        {/if}

        {#if verdict.missed?.length}
          <ul class="missed">
            {#each verdict.missed as item (item)}<li>{item}</li>{/each}
          </ul>
        {/if}

        <button type="button" class="btn btn-primary" onclick={proceed} disabled={busy}>
          {credibility <= 0 ? 'See the damage' : turnNo >= SESSION.turns.max ? 'Close the meeting' : 'Take the next question'}
        </button>
      </section>
    {:else}
      {#if lineDone}
        <!-- The timer starts when the question appears, not when the turn is
             requested, so waiting for the board to speak is never counted as
             the player hesitating. -->
        <AnswerBox
          question=""
          threshold={SESSION.hesitationMs}
          placeholder="Answer them."
          disabled={busy}
          onsubmit={answer}
        />
      {/if}
    {/if}
  {/if}
{/if}

<style>
  .intro h1,
  .over h1 {
    margin: var(--gap-xs) 0 var(--gap);
  }
  .body {
    color: var(--mid);
    margin-bottom: var(--gap);
    max-width: 60ch;
  }
  .rules {
    color: var(--mid);
    margin: 0 0 var(--gap-lg);
    padding-left: 1.2em;
    display: grid;
    gap: var(--gap-xs);
  }
  .error {
    color: var(--bad);
    margin-bottom: var(--gap);
  }
  .status {
    color: var(--muted);
    padding: var(--gap-lg) 0;
  }

  .bar {
    display: flex;
    align-items: center;
    gap: var(--gap-sm);
    margin-bottom: var(--gap-lg);
    flex-wrap: wrap;
  }
  .pips {
    display: flex;
    gap: 4px;
  }
  .pip {
    width: 22px;
    height: 5px;
    border-radius: 3px;
    background: var(--accent);
  }
  .pip.gone {
    background: var(--border);
  }
  .count,
  .turn {
    font-size: 0.7rem;
    color: var(--faint);
    letter-spacing: 0.08em;
  }
  .turn {
    margin-left: auto;
  }

  /* The stage: the room, with the speaker pulled forward. */
  .stage {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-height: 172px;
    margin-bottom: -14px;
  }
  .bench {
    position: absolute;
    bottom: 6px;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 var(--gap-xs);
    opacity: 0.28;
    filter: grayscale(0.6);
  }
  .seat.active {
    visibility: hidden;
  }
  .closeup {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 6px 0 var(--accent-shadow));
  }
  .closeup.trap {
    animation: jolt 0.34s steps(3, end) 1;
  }
  @keyframes jolt {
    0% { transform: translateX(0); }
    30% { transform: translateX(-5px); }
    60% { transform: translateX(5px); }
    100% { transform: translateX(0); }
  }

  /* The dialogue box, sitting under the speaker the way the format wants. */
  .dialogue {
    position: relative;
    background: var(--card);
    border: 2px solid var(--text);
    border-radius: var(--radius);
    padding: var(--gap);
    box-shadow: 4px 4px 0 var(--text);
  }
  .dialogue.trap {
    border-color: var(--bad);
    box-shadow: 4px 4px 0 var(--bad);
  }
  .dialogue header {
    display: flex;
    align-items: baseline;
    gap: var(--gap-sm);
    margin-bottom: var(--gap-xs);
    flex-wrap: wrap;
  }
  .dialogue .role {
    font-size: 0.72rem;
    color: var(--muted);
  }
  .dialogue :global(.line) {
    color: var(--mid);
    margin-bottom: var(--gap-sm);
  }
  .ask {
    font-size: 1.08rem;
    line-height: 1.5;
    font-weight: 500;
    margin-top: var(--gap-sm);
    padding-top: var(--gap-sm);
    border-top: 1px dashed var(--border);
  }

  .reveal {
    margin-top: var(--gap);
  }
  .tell {
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

  .rubric {
    background: var(--accent-wash);
    border-radius: var(--radius-sm);
    padding: var(--gap);
    margin-bottom: var(--gap);
  }
  .rubric ul {
    list-style: none;
    margin: 0 0 var(--gap-sm);
    padding: 0;
    display: grid;
    gap: 4px;
    font-size: 0.9rem;
    color: var(--muted);
  }
  .rubric li.hit {
    color: var(--good);
  }
  .trap-truth {
    font-size: 0.85rem;
    color: var(--mid);
  }

  .missed {
    color: var(--mid);
    margin: 0 0 var(--gap);
    padding-left: 1.2em;
  }

  .outcome-survived {
    color: var(--good);
  }
  .outcome-wounded {
    color: var(--warn);
  }
  .outcome-burned {
    color: var(--bad);
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
  .who {
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--faint);
    min-width: 72px;
  }
  .recap a {
    color: var(--text);
    text-decoration: none;
  }
  .recap a:hover {
    color: var(--accent);
  }
  .tag.trap {
    color: var(--bad);
    border-color: color-mix(in srgb, var(--bad) 35%, transparent);
  }

  .actions {
    display: flex;
    gap: var(--gap-sm);
    flex-wrap: wrap;
  }
</style>
