<script>
  import { onMount } from 'svelte'
  import { FAMILY_LABELS, TIER_LABELS } from '$lib/corpus.js'
  import { inlineMarkdown, paragraphs } from '$lib/inline.js'
  import { recordLookup } from '$lib/lookups.js'

  let { data } = $props()
  const { card, related } = data

  // The Phase 1 premise experiment: which cards actually get reached for.
  onMount(() => recordLookup(card.slug))

  const benchmark = card.facets.benchmark
  const variants = card.facets.formula_variants.variants
</script>

<svelte:head>
  <title>{card.title} — The Hot Seat</title>
  {#if card.facets.definition}
    <meta name="description" content={card.facets.definition.slice(0, 180)} />
  {/if}
</svelte:head>

<nav class="crumbs"><a href="/reference">← All metrics</a></nav>

<article>
  <header class="head">
    <p class="eyebrow">
      {card.families.map((f) => FAMILY_LABELS[f] ?? f).join(' · ')}
      {#if !card.is_metric}· Note{/if}
    </p>
    <h1>{card.title}</h1>

    <div class="meta">
      <span class="tag" title={TIER_LABELS[card.verification_tier]}>
        {card.verification_tier === 'untagged' ? 'verification not tagged' : card.verification_tier}
      </span>
      {#if card.facets.applies_to}
        <!-- applies_to is prose in the corpus and runs long. Truncate visually
             with the full text still available on hover and to a screen reader,
             rather than cutting the string and losing it. -->
        <span class="tag applies" title={card.facets.applies_to}>{card.facets.applies_to}</span>
      {/if}
      {#if card.merged_from.length}
        <span class="tag">also in {card.merged_from.length} other family</span>
      {/if}
    </div>
  </header>

  {#if card.facets.definition}
    <section class="facet lead">
      <h2>Definition</h2>
      <p>{card.facets.definition}</p>
    </section>
  {/if}

  {#if variants.length}
    <section class="facet">
      <h2>Formula variants</h2>
      <p class="note">
        Where practitioners genuinely disagree. Name the variant whenever you quote the number.
      </p>
      <div class="scroll">
        <table>
          <thead>
            <tr><th>Variant</th><th>Formula</th><th>When it is right</th></tr>
          </thead>
          <tbody>
            {#each variants as v, i (i)}
              <tr>
                <td>{@html inlineMarkdown(v.variant)}</td>
                <td class="mono">{@html inlineMarkdown(v.formula)}</td>
                <td>{@html inlineMarkdown(v.when)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  {:else if card.facets.formula_variants.text}
    <section class="facet">
      <h2>Formula</h2>
      {#each paragraphs(card.facets.formula_variants.text) as para, i (i)}
        <p>{@html inlineMarkdown(para)}</p>
      {/each}
    </section>
  {/if}

  <section class="facet">
    <h2>Benchmark</h2>
    {#if benchmark.state === 'absent'}
      <!-- An absent benchmark is the answer, not an empty field. Saying so is
           the whole reason this corpus is worth more than a search result. -->
      <div class="callout warn">
        <p class="eyebrow">No sourced benchmark</p>
        <p>
          No primary publisher supplies a figure for this metric. Anything you find quoted for it is
          unsourced until proven otherwise, so derive it from your own data instead.
        </p>
        {#if benchmark.note}
          <p class="detail">{@html inlineMarkdown(benchmark.note)}</p>
        {/if}
      </div>
    {:else}
      <div class="scroll">
        <table>
          <thead>
            <tr><th>Segment</th><th>Figure</th><th>Source</th></tr>
          </thead>
          <tbody>
            {#each benchmark.rows as row, i (i)}
              <tr>
                <td>{@html inlineMarkdown(row.segment)}</td>
                <td class="mono">{@html inlineMarkdown(row.figure)}</td>
                <td class="src">
                  {#if row.source}
                    {@html inlineMarkdown(row.source)}
                  {:else}
                    <span class="unsourced">source in the notes below</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      {#if !benchmark.sourced}
        <p class="note">
          Some rows carry no publisher of their own because their provenance sits in the surrounding
          research rather than in the table. Check before quoting one.
        </p>
      {/if}
      {#if benchmark.note}
        <div class="callout warn">
          <p class="eyebrow">Partly unpublished</p>
          <p>{@html inlineMarkdown(benchmark.note)}</p>
        </div>
      {/if}
    {/if}
  </section>

  {#if card.facets.traps}
    <section class="facet">
      <h2>Traps</h2>
      <ul class="traps">
        {#each card.facets.traps as trap, i (i)}
          <li>{@html inlineMarkdown(trap)}</li>
        {/each}
      </ul>
    </section>
  {/if}

  {#if card.facets.inputs}
    <section class="facet">
      <h2>Inputs</h2>
      <p>{@html inlineMarkdown(card.facets.inputs)}</p>
    </section>
  {/if}

  {#if card.facets.application}
    <section class="facet">
      <h2>Application</h2>
      <p>{@html inlineMarkdown(card.facets.application)}</p>
    </section>
  {/if}

  {#if card.facets.commentary}
    <section class="facet">
      <h2>Notes</h2>
      {#each paragraphs(card.facets.commentary) as para, i (i)}
        <p>{@html inlineMarkdown(para)}</p>
      {/each}
    </section>
  {/if}

  {#if related.length}
    <section class="facet">
      <h2>Related</h2>
      <ul class="related">
        {#each related as r (r.slug)}
          <li><a href="/reference/{r.slug}">{r.title}</a></li>
        {/each}
      </ul>
    </section>
  {/if}

  <footer class="prov">
    From <code>{card.source_files.join(', ')}</code> in the corpus, licensed CC BY-SA 4.0.
    <a href="https://github.com/brandon-sellers13/hot-seat/issues/new?labels=corpus"
      >Something wrong? Send a correction.</a
    >
  </footer>
</article>

<style>
  .crumbs {
    margin-bottom: var(--gap-lg);
    font-size: 0.85rem;
  }
  .crumbs a {
    text-decoration: none;
    color: var(--muted);
  }
  .crumbs a:hover {
    color: var(--accent);
  }

  .head {
    padding-bottom: var(--gap-lg);
    border-bottom: 1px solid var(--border);
    margin-bottom: var(--gap-lg);
  }
  .head h1 {
    margin: var(--gap-xs) 0 var(--gap);
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    max-width: 100%;
  }
  .meta .applies {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .facet {
    margin-bottom: var(--gap-xl);
  }
  .facet h2 {
    font-family: var(--mono);
    font-size: 0.72rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--muted);
    margin-bottom: var(--gap-sm);
  }
  .facet :global(p) {
    color: var(--mid);
    margin-bottom: var(--gap-sm);
  }
  .facet.lead :global(p) {
    color: var(--text);
    font-size: 1.1rem;
    line-height: 1.55;
  }
  .note {
    font-size: 0.85rem;
    color: var(--muted) !important;
  }

  /* Wide tables scroll inside their own box so the page body never does. */
  .scroll {
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--card);
  }
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.85rem;
    min-width: 520px;
  }
  th,
  td {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  th {
    font-family: var(--mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    font-weight: 500;
    white-space: nowrap;
  }
  tbody tr:last-child td {
    border-bottom: none;
  }
  td {
    color: var(--mid);
  }
  td.mono {
    font-family: var(--mono);
    font-size: 0.8rem;
    color: var(--text);
  }
  td.src {
    font-size: 0.78rem;
    color: var(--muted);
  }
  .unsourced {
    font-style: italic;
    color: var(--warn);
  }

  .callout {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: var(--gap);
  }
  .callout.warn {
    background: var(--warn-wash);
    border-color: color-mix(in srgb, var(--warn) 30%, transparent);
    margin-top: var(--gap-sm);
  }
  .callout .eyebrow {
    color: var(--warn);
    margin-bottom: var(--gap-xs);
  }
  .callout :global(p:last-child) {
    margin-bottom: 0;
  }
  .callout .detail {
    font-size: 0.85rem;
    margin-top: var(--gap-sm);
  }

  .traps {
    margin: 0;
    padding-left: 1.15em;
    display: grid;
    gap: var(--gap-sm);
    color: var(--mid);
  }
  .traps :global(strong) {
    color: var(--text);
  }

  .related {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-xs);
  }
  .related a {
    display: inline-block;
    font-size: 0.85rem;
    padding: 5px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    text-decoration: none;
    color: var(--mid);
  }
  .related a:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .prov {
    border-top: 1px solid var(--border);
    padding-top: var(--gap);
    font-size: 0.8rem;
    color: var(--faint);
  }
  .prov code {
    font-family: var(--mono);
    font-size: 0.75rem;
  }
</style>
