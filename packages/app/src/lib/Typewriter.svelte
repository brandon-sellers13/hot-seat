<script>
  /**
   * Typewriter reveal for dialogue.
   *
   * Motion is decoration here, never information: the full text is always in
   * the DOM for assistive technology, and anyone who has asked for reduced
   * motion gets the whole line at once. Clicking or pressing a key also skips
   * to the end, because waiting for an animation you have already read is the
   * fastest way to make a game feel slow.
   */
  let { text = '', speed = 18, onDone } = $props()

  let shown = $state('')
  let done = $state(false)

  const finish = () => {
    shown = text
    done = true
    onDone?.()
  }

  $effect(() => {
    const full = text
    if (!full) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      finish()
      return
    }

    shown = ''
    done = false
    let i = 0
    const timer = setInterval(() => {
      i += 1
      shown = full.slice(0, i)
      if (i >= full.length) {
        clearInterval(timer)
        done = true
        onDone?.()
      }
    }, speed)

    return () => clearInterval(timer)
  })
</script>

<svelte:window onkeydown={() => !done && finish()} />

<p class="line" onclick={() => !done && finish()} aria-hidden="true">
  {shown}{#if !done}<span class="caret"></span>{/if}
</p>
<!-- The complete line, always, regardless of animation state. -->
<p class="sr-only">{text}</p>

<style>
  .line {
    min-height: 1.5em;
    cursor: default;
  }
  .caret {
    display: inline-block;
    width: 0.5em;
    height: 1.05em;
    margin-left: 1px;
    background: var(--accent);
    vertical-align: text-bottom;
    animation: blink 1s steps(2, start) infinite;
  }
  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .caret {
      display: none;
    }
  }
</style>
