<script>
  import { onMount } from 'svelte'
  import { drawSprite } from '$lib/sprites.js'

  /**
   * One board member, in close-up.
   *
   * Canvas rather than an image so the art scales to any size with no assets to
   * ship, and so a mood change is a repaint rather than a second file.
   */
  let { who, mood = 'neutral', px = 7, label = '' } = $props()

  let canvas
  const render = () => {
    if (canvas && who) drawSprite(canvas, who, mood, px)
  }

  onMount(render)
  // Repaint whenever the speaker or their expression changes.
  $effect(render)
</script>

<!-- The art is atmosphere. Everything it conveys is also in the dialogue, so a
     screen reader gets the name and loses nothing. role goes on the wrapper
     because canvas is not permitted to carry it. -->
<span role="img" aria-label={label || 'Board member'}>
  <canvas bind:this={canvas} aria-hidden="true"></canvas>
</span>

<style>
  span {
    display: inline-block;
    line-height: 0;
  }
  canvas {
    image-rendering: pixelated;
    display: block;
  }
</style>
