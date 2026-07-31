<script>
  import { onMount } from 'svelte'
  import { currentUser, isAnonymous, isConfigured, signInWithGoogle, signOut } from '$lib/auth.js'

  /**
   * The account control.
   *
   * The entire pitch is that a streak survives a new phone. The copy says
   * exactly that rather than implying a profile exists, because there isn't
   * one: Google sign-in moves progress off the device and does nothing else.
   */
  let user = $state(null)
  let busy = $state(false)
  let message = $state(null)

  const refresh = async () => {
    user = await currentUser()
  }

  onMount(refresh)

  const signIn = async () => {
    busy = true
    message = null
    const { error, needsMerge } = await signInWithGoogle(window.location.href)
    if (error) {
      message = needsMerge
        ? 'That Google account already has progress here. Sign out first to switch to it.'
        : 'Google sign-in did not complete.'
      busy = false
    }
  }

  const out = async () => {
    busy = true
    await signOut()
    await refresh()
    busy = false
  }
</script>

{#if isConfigured()}
  {#if user && !isAnonymous(user)}
    <button type="button" class="acct" onclick={out} disabled={busy} title={user.email}>
      <span class="dot signed"></span>
      <span class="who">{user.email?.split('@')[0] ?? 'Signed in'}</span>
    </button>
  {:else}
    <button type="button" class="acct" onclick={signIn} disabled={busy}>
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z"/>
        <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 21.4 7.6 24 12 24z"/>
        <path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3z"/>
        <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.6 0 3.7 2.6 1.8 6.1l3.8 3C6.5 6.7 9 4.8 12 4.8z"/>
      </svg>
      <span class="who">{busy ? 'Opening...' : 'Keep my streak'}</span>
    </button>
  {/if}
  {#if message}<p class="msg" role="alert">{message}</p>{/if}
{/if}

<style>
  .acct {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    padding: 5px 12px;
    font-family: var(--sans);
    font-size: 0.78rem;
    color: var(--mid);
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .acct:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--text);
  }
  .acct:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--good);
  }
  .msg {
    font-size: 0.75rem;
    color: var(--warn);
    margin-top: 4px;
  }
  @media (max-width: 620px) {
    .who {
      display: none;
    }
    .acct {
      padding: 6px 8px;
    }
  }
</style>
