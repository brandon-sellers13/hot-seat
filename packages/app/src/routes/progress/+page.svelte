<script>
  import { onMount } from 'svelte'
  import { FAMILY_LABELS, corpusStats, loadCards } from '$lib/corpus.js'
  import { loadStreak } from '$lib/progress.js'
  import { mostLookedUp } from '$lib/lookups.js'

  const stats = corpusStats()
  let streak = $state({ current: 0, longest: 0, lastPlayedOn: null })
  let looked = $state([])
  let titles = $state(new Map())
  let ready = $state(false)

  onMount(async () => {
    streak = loadStreak()
    looked = mostLookedUp(8)
    const data = await loadCards()
    titles = new Map([...data.cards, ...data.narrative].map((c) => [c.slug, c.title]))
    ready = true
  })

  const started = $derived(streak.lastPlayedOn !== null)
</script>

<svelte:head><title>Progress — The Hot Seat</title></svelte:head>

<header class="head">
  <p class="eyebrow">Progress</p>
  <h1>What you have actually done</h1>
</header>

{#if !started}
  <!-- Honest empty state. Inventing encouraging numbers before there is
       anything to report is how a progress screen loses its meaning. -->
  <section class="card empty">
    <p class="body">
      Nothing yet. The numbers here come from answers you have typed, so they stay empty until you
      have played, rather than showing a zero dressed up as progress.
    </p>
    <a href="/daily" class="btn btn-primary">Start today's five</a>
  </section>
{:else}
  <section class="figures">
    <div>
      <strong class="mono">{streak.current}</strong>
      <span>day streak</span>
    </div>
    <div>
      <strong class="mono">{streak.longest}</strong>
      <span>longest run</span>
    </div>
    <div>
      <strong class="mono">{stats.cards}</strong>
      <span>metrics in the corpus</span>
    </div>
  </section>
{/if}

<section class="block">
  <h2>What you look up</h2>
  <p class="note">
    Recorded locally and never sent anywhere. The metrics you reach for are the honest answer to
    what is worth drilling, which is more useful than what you say you want to learn.
  </p>
  {#if !ready}
    <p class="note">Loading...</p>
  {:else if looked.length === 0}
    <p class="note">Nothing looked up yet. Open a few cards in reference and this fills in.</p>
  {:else}
    <ol class="looked">
      {#each looked as entry (entry.slug)}
        <li>
          <a href="/reference/{entry.slug}">{titles.get(entry.slug) ?? entry.slug}</a>
          <span class="mono count">{entry.count}</span>
        </li>
      {/each}
    </ol>
  {/if}
</section>

<section class="block">
  <h2>Coverage</h2>
  <p class="note">
    How the corpus is distributed. Per-family mastery lands when answers sync to an account rather
    than living on one device.
  </p>
  <ul class="families">
    {#each Object.entries(stats.byFamily) as [family, count] (family)}
      <li>
        <span>{FAMILY_LABELS[family] ?? family}</span>
        <span class="bar"><span class="fill" style="width:{(count / 40) * 100}%"></span></span>
        <span class="mono count">{count}</span>
      </li>
    {/each}
  </ul>
</section>

<style>
  .head { margin-bottom: var(--gap-lg); }
  .head h1 { margin-top: var(--gap-xs); }
  .body { color: var(--mid); margin-bottom: var(--gap); max-width: 58ch; }
  .note { color: var(--muted); font-size: 0.88rem; margin-bottom: var(--gap); max-width: 62ch; }

  .figures {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--gap);
    padding: var(--gap-lg) 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin-bottom: var(--gap-xl);
  }
  .figures div { display: flex; flex-direction: column; gap: 2px; }
  .figures strong {
    font-size: 1.7rem; font-weight: 700; letter-spacing: -0.03em;
    background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .figures span { font-size: 0.8rem; color: var(--muted); }

  .block { margin-bottom: var(--gap-xl); }
  .block h2 { font-size: 1.1rem; margin-bottom: var(--gap-xs); }

  .looked { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--gap-xs); }
  .looked li { display: flex; align-items: center; gap: var(--gap-sm); font-size: 0.92rem; }
  .looked a { color: var(--text); text-decoration: none; }
  .looked a:hover { color: var(--accent); }
  .count { margin-left: auto; font-size: 0.75rem; color: var(--faint); }

  .families { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--gap-sm); }
  .families li { display: flex; align-items: center; gap: var(--gap-sm); font-size: 0.88rem; color: var(--mid); }
  .families li > span:first-child { min-width: 150px; }
  .bar { flex: 1; height: 5px; background: var(--border); border-radius: 3px; overflow: hidden; }
  .fill { display: block; height: 100%; background: var(--gradient); }
</style>
