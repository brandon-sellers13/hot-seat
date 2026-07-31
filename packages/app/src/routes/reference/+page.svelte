<script>
  import { onMount } from 'svelte'
  import { FAMILY_LABELS, TIER_LABELS, corpusStats, loadCards } from '$lib/corpus.js'
  import {
    FILTER_DEFAULTS,
    activeFilterCount,
    buildIndex,
    filterCards,
    isAmbiguous,
    searchCards
  } from '$lib/search.js'

  const stats = corpusStats()

  let index = $state([])
  let loading = $state(true)
  let failed = $state(false)
  let query = $state('')
  let filters = $state({ ...FILTER_DEFAULTS })

  onMount(async () => {
    try {
      index = buildIndex(await loadCards())
    } catch {
      failed = true
    } finally {
      loading = false
    }
  })

  const filtered = $derived(filterCards(index, filters))
  const results = $derived(searchCards(filtered, query))
  const ambiguous = $derived(isAmbiguous(results, query))
  const activeCount = $derived(activeFilterCount(filters))

  const reset = () => {
    filters = { ...FILTER_DEFAULTS }
    query = ''
  }

  const families = Object.entries(FAMILY_LABELS)
  const tiers = ['primary', 'secondary', 'weak', 'none', 'untagged']
</script>

<svelte:head>
  <title>Reference — The Hot Seat</title>
</svelte:head>

<header class="head">
  <p class="eyebrow">Reference</p>
  <h1>{stats.cards} metrics, with their sources</h1>
  <p class="lede">
    No account, no grading, no network. Once you have loaded this page it works on a plane.
  </p>
</header>

<div class="controls">
  <label class="search">
    <span class="sr-only">Search metrics by name or abbreviation</span>
    <input
      type="search"
      bind:value={query}
      placeholder="Search: NRR, quick ratio, CAC payback..."
      autocomplete="off"
    />
  </label>

  <div class="filters">
    <label>
      <span class="sr-only">Family</span>
      <select bind:value={filters.family}>
        <option value="all">All families</option>
        {#each families as [slug, label] (slug)}
          <option value={slug}>{label}</option>
        {/each}
      </select>
    </label>

    <label>
      <span class="sr-only">Applies to</span>
      <select bind:value={filters.context}>
        <option value="all">Consumer and B2B</option>
        <option value="consumer">Consumer only</option>
        <option value="b2b">B2B only</option>
        <option value="both">Applies to both</option>
      </select>
    </label>

    <label>
      <span class="sr-only">Verification tier</span>
      <select bind:value={filters.tier}>
        <option value="all">Any verification</option>
        {#each tiers as tier (tier)}
          <option value={tier}>{TIER_LABELS[tier]}</option>
        {/each}
      </select>
    </label>

    <label>
      <span class="sr-only">Benchmark</span>
      <select bind:value={filters.benchmark}>
        <option value="all">Any benchmark</option>
        <option value="sourced">Has a sourced benchmark</option>
        <option value="absent">Nobody publishes one</option>
      </select>
    </label>

    {#if activeCount > 0 || query}
      <button type="button" class="btn reset" onclick={reset}>Clear</button>
    {/if}
  </div>
</div>

{#if loading}
  <p class="status" role="status">Loading the corpus...</p>
{:else if failed}
  <p class="status bad" role="alert">
    The corpus did not load. If you are offline and have not opened this page before, there is
    nothing cached yet.
  </p>
{:else}
  <p class="count" role="status" aria-live="polite">
    {results.length}
    {results.length === 1 ? 'result' : 'results'}
  </p>

  {#if ambiguous}
    <!-- The quick-ratio case. Unrelated metrics share that name, and opening
         whichever one ranked first would teach the wrong one. -->
    <p class="ambiguous">
      <span class="eyebrow">More than one metric goes by that name</span>
      These are different metrics that happen to share a name. Check which one you mean before you quote
      it.
    </p>
  {/if}

  {#if results.length === 0}
    <p class="status">Nothing matches. Try an abbreviation such as NRR or CAC, or clear the filters.</p>
  {:else}
    <ul class="results">
      {#each results as card (card.slug)}
        <li>
          <a href="/reference/{card.slug}" class="card">
            <span class="row">
              <h2>{card.title}</h2>
              {#if !card.is_metric}<span class="tag note">Note</span>{/if}
            </span>
            {#if card.facets.definition}
              <span class="def">{card.facets.definition}</span>
            {/if}
            <span class="meta">
              {#each card.families as family (family)}
                <span class="tag">{FAMILY_LABELS[family] ?? family}</span>
              {/each}
              <span class="tag">{card.context === 'both' ? 'consumer + b2b' : card.context}</span>
              {#if card.facets.benchmark.state === 'absent'}
                <span class="tag warn">No sourced benchmark</span>
              {:else}
                <span class="tag good">{card.facets.benchmark.rows.length} benchmark rows</span>
              {/if}
            </span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
{/if}

<style>
  .head {
    margin-bottom: var(--gap-lg);
  }
  .head h1 {
    margin: var(--gap-xs) 0 var(--gap-sm);
  }
  .lede {
    color: var(--mid);
    max-width: 56ch;
  }

  .controls {
    position: sticky;
    top: 56px;
    z-index: 3;
    background: var(--bg);
    padding: var(--gap) 0;
    border-bottom: 1px solid var(--border);
    margin-bottom: var(--gap-lg);
  }

  .search input {
    width: 100%;
    font-family: var(--sans);
    font-size: 1rem;
    padding: 12px 14px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text);
  }
  .search input:focus {
    border-color: var(--accent);
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-sm);
    margin-top: var(--gap-sm);
  }
  select {
    font-family: var(--sans);
    font-size: 0.85rem;
    padding: 7px 10px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text);
    max-width: 100%;
  }
  .reset {
    padding: 6px 14px;
    font-size: 0.85rem;
  }

  .count {
    font-family: var(--mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    margin-bottom: var(--gap);
  }

  .ambiguous {
    background: var(--warn-wash);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: var(--gap);
    margin-bottom: var(--gap);
    color: var(--mid);
    font-size: 0.9rem;
  }
  .ambiguous .eyebrow {
    display: block;
    color: var(--warn);
    margin-bottom: 4px;
  }

  .status {
    color: var(--muted);
    padding: var(--gap-lg) 0;
  }
  .status.bad {
    color: var(--bad);
  }

  .results {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--gap-sm);
  }
  .results .card {
    display: grid;
    gap: var(--gap-xs);
    padding: var(--gap);
    text-decoration: none;
    color: inherit;
  }
  .results .card:hover {
    border-color: var(--accent);
    box-shadow: 0 3px 14px var(--accent-shadow);
  }
  .row {
    display: flex;
    align-items: baseline;
    gap: var(--gap-sm);
    flex-wrap: wrap;
  }
  .results h2 {
    font-size: 1rem;
    font-weight: 600;
  }
  .def {
    color: var(--mid);
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 2px;
  }
  .tag.good {
    color: var(--good);
    border-color: color-mix(in srgb, var(--good) 35%, transparent);
  }
  .tag.warn {
    color: var(--warn);
    border-color: color-mix(in srgb, var(--warn) 35%, transparent);
  }
  .tag.note {
    color: var(--accent);
    border-color: color-mix(in srgb, var(--accent) 35%, transparent);
  }
</style>
