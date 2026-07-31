<script>
  import '$lib/styles/base.css'
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import { applyTheme, readTheme } from '$lib/theme.js'
  import SignIn from '$lib/SignIn.svelte'

  let { children } = $props()

  let theme = $state(null)
  let systemDark = $state(false)
  let online = $state(true)

  // What the viewer is actually looking at right now: their explicit choice if
  // they made one, otherwise whatever the system currently says. Tracking the
  // media query rather than reading it once keeps the control honest when
  // someone flips their phone into dark mode with the page already open.
  const current = $derived(theme ?? (systemDark ? 'dark' : 'light'))

  onMount(() => {
    theme = readTheme()
    online = navigator.onLine

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark = media.matches
    const onScheme = (event) => (systemDark = event.matches)
    media.addEventListener('change', onScheme)

    const up = () => (online = true)
    const down = () => (online = false)
    window.addEventListener('online', up)
    window.addEventListener('offline', down)

    return () => {
      media.removeEventListener('change', onScheme)
      window.removeEventListener('online', up)
      window.removeEventListener('offline', down)
    }
  })

  const toggleTheme = () => {
    theme = current === 'dark' ? 'light' : 'dark'
    applyTheme(theme)
  }

  const nav = [
    { href: '/', label: 'Home' },
    { href: '/daily', label: 'Daily' },
    { href: '/hot-seat', label: 'Hot Seat' },
    { href: '/reference', label: 'Reference' },
    { href: '/progress', label: 'Progress' }
  ]

  const isCurrent = (href) =>
    href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href)
</script>

<a href="#main" class="skip">Skip to content</a>

<header>
  <div class="shell bar">
    <a href="/" class="brand">
      <img src="/icons/icon-192.png" alt="" width="26" height="26" />
      <span>The Hot Seat</span>
    </a>

    <nav aria-label="Sections">
      {#each nav as item (item.href)}
        <a
          href={item.href}
          class:current={isCurrent(item.href)}
          aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a
        >
      {/each}
    </nav>

    <SignIn />

    <!-- The icon shows what you will get, not what you have, which is the
         convention people already expect from this control. -->
    <button type="button" onclick={toggleTheme} class="theme">
      <span aria-hidden="true">{current === 'dark' ? '☀' : '☾'}</span>
      <span class="sr-only">Switch to {current === 'dark' ? 'light' : 'dark'} theme</span>
    </button>
  </div>

  {#if !online}
    <!-- Stated plainly rather than left to be discovered when a question
         fails to grade. Reference mode genuinely works here; the graded
         modes genuinely do not. -->
    <p class="offline" role="status">
      <span class="eyebrow">Offline</span>
      Reference works. The Daily and the Hot Seat need a connection to grade an answer.
    </p>
  {/if}
</header>

<main id="main" class="shell">
  {@render children()}
</main>

<footer class="shell">
  <p>
    Open source, <a href="https://github.com/brandon-sellers13/hot-seat">on GitHub</a>. Built by
    <a href="https://brandonsellers.com">Brandon Sellers</a>.
  </p>
</footer>

<style>
  .skip {
    position: absolute;
    left: -9999px;
    top: 0;
    background: var(--card);
    padding: 10px 16px;
    border-radius: var(--radius-sm);
    z-index: 10;
  }
  .skip:focus {
    left: var(--gap);
    top: var(--gap);
  }

  header {
    position: sticky;
    top: 0;
    z-index: 5;
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    backdrop-filter: saturate(180%) blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .bar {
    display: flex;
    align-items: center;
    gap: var(--gap);
    min-height: 56px;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--gap-xs);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text);
    text-decoration: none;
    white-space: nowrap;
  }
  .brand img {
    border-radius: 6px;
  }

  nav {
    display: flex;
    gap: var(--gap);
    margin-left: auto;
    overflow-x: auto;
    scrollbar-width: none;
  }
  nav::-webkit-scrollbar {
    display: none;
  }

  nav a {
    font-size: 0.9rem;
    color: var(--muted);
    text-decoration: none;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
  }
  nav a:hover {
    color: var(--text);
  }
  nav a.current {
    color: var(--text);
    border-bottom-color: var(--accent);
  }

  .theme {
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: var(--mid);
    flex-shrink: 0;
  }
  .theme:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  .offline {
    background: var(--warn-wash);
    border-top: 1px solid var(--border);
    padding: var(--gap-sm) var(--gap);
    font-size: 0.85rem;
    color: var(--mid);
    text-align: center;
  }
  .offline .eyebrow {
    color: var(--warn);
    margin-right: var(--gap-xs);
  }

  main {
    padding-top: var(--gap-xl);
    padding-bottom: var(--gap-xl);
    min-height: 60vh;
  }

  footer {
    border-top: 1px solid var(--border);
    padding-top: var(--gap-lg);
    padding-bottom: var(--gap-xl);
    color: var(--muted);
    font-size: 0.85rem;
  }

  @media (max-width: 560px) {
    .brand span {
      display: none;
    }
  }
</style>
