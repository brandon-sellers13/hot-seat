<script>
  /** Honest placeholder for a mode that is planned but not built. */
  let { eyebrow, title, body, needs = [] } = $props()
</script>

<section class="card">
  <p class="eyebrow">{eyebrow}</p>
  <h1>{title}</h1>
  <p class="body">{body}</p>
  {#if needs.length}
    <p class="needs-label eyebrow">Waiting on</p>
    <ul>
      {#each needs as need}<li>{need}</li>{/each}
    </ul>
  {/if}
  <a href="/reference" class="btn btn-primary">Use reference in the meantime</a>
</section>

<style>
  h1 { margin: var(--gap-xs) 0 var(--gap); }
  .body { color: var(--mid); max-width: 60ch; margin-bottom: var(--gap-lg); }
  .needs-label { display: block; margin-bottom: var(--gap-xs); }
  ul { color: var(--mid); margin: 0 0 var(--gap-lg); padding-left: 1.2em; display: grid; gap: 4px; }
</style>
