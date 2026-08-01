<script>
  import { SECTIONS } from '$lib/pack/arbor.js'

  /**
   * The board pack.
   *
   * Two properties are load-bearing and neither is cosmetic.
   *
   * SOURCE-ORGANISED. Tabs are named for the systems a company keeps records in
   * — Billing, Cohorts, Acquisition — never for the metrics derived from them.
   * A tab called "Retention" would hand over the answer, because knowing that
   * retention inputs live in subscription movements is the knowledge being
   * tested.
   *
   * ONLY THE OPEN SECTION IS IN THE DOM. There is no in-app search, and
   * rendering one section at a time means the browser's own find cannot cross
   * tabs either. Navigating by source is the skill; a text search replaces it.
   */
  let { onnavigate } = $props()

  let open = $state(SECTIONS[0].id)
  let openedAt = Date.now()

  const show = (id) => {
    if (id === open) return
    // Report the section being left and how long it was held. Time on a section
    // separates someone who knew where to look from someone reading everything.
    onnavigate?.({ section: open, heldMs: Date.now() - openedAt, next: id })
    open = id
    openedAt = Date.now()
  }

  const section = $derived(SECTIONS.find((s) => s.id === open))
</script>

<div class="pack">
  <div class="tabs" role="tablist">
    {#each SECTIONS as s (s.id)}
      <button
        type="button"
        role="tab"
        aria-selected={s.id === open}
        onclick={() => show(s.id)}>{s.label}</button
      >
    {/each}
  </div>

  <p class="blurb">{section.blurb}</p>

  {#each section.tables as t (t.title)}
    <div class="tbl">
      <h3>{t.title}</h3>
      {#if t.note}<p class="note">{t.note}</p>{/if}
      <div class="scroll">
        <table>
          <thead>
            <tr>{#each t.head as h (h)}<th>{h}</th>{/each}</tr>
          </thead>
          <tbody>
            {#each t.rows as r, i (i)}
              <tr>{#each r as c, j (j)}<td>{c}</td>{/each}</tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/each}
</div>

<style>
  .pack {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--card);
    padding: var(--gap);
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: var(--gap-sm);
  }
  .tabs button {
    font-family: var(--sans);
    font-size: 0.8rem;
    padding: 6px 11px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--mid);
    cursor: pointer;
    white-space: nowrap;
  }
  .tabs button:hover {
    color: var(--text);
    border-color: var(--accent);
  }
  .tabs button[aria-selected='true'] {
    background: var(--text);
    border-color: var(--text);
    color: var(--card);
  }

  .blurb {
    font-size: 0.8rem;
    color: var(--muted);
    margin-bottom: var(--gap);
  }

  .tbl {
    margin-bottom: var(--gap-lg);
  }
  .tbl:last-child {
    margin-bottom: 0;
  }
  h3 {
    font-size: 0.92rem;
    font-weight: 600;
    margin: 0;
  }
  .note {
    font-size: 0.75rem;
    color: var(--muted);
    margin: 2px 0 0;
  }

  /* Wide tables scroll inside their own box so the page never does. */
  .scroll {
    overflow-x: auto;
    margin-top: 6px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.82rem;
  }
  th,
  td {
    text-align: left;
    padding: 5px 9px;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }
  th {
    font-family: var(--mono);
    font-size: 0.63rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    font-weight: 500;
  }
  td:not(:first-child) {
    font-family: var(--mono);
    font-variant-numeric: tabular-nums;
  }
</style>
