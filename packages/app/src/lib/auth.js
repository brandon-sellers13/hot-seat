import { createClient } from '@supabase/supabase-js'
import { browser } from '$app/environment'
// Static, not dynamic. $env/dynamic/public is resolved by a server at runtime,
// and this is a fully prerendered site with no server, so the values came back
// empty and isConfigured() silently returned false: no sign-in button, and no
// way for the app to authenticate at all. Static inlines them at build time,
// which is the only thing that works for a static adapter.
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

/**
 * Identity.
 *
 * Anonymous first, Google second, and nothing else ever.
 *
 * Supabase's native anonymous sign-in creates a real user row rather than a
 * client-side device id. That matters more than it sounds: row-level security
 * protects a player from their very first answer, there is one identity model
 * instead of two, and linking a Google account later PRESERVES THE SAME USER
 * ID, so progress carries across with no merge code at all.
 *
 * The account's entire pitch is that a streak survives a new phone. The UI
 * should say exactly that and not imply a richer profile exists.
 */

let client = null

export const supabase = () => {
  if (!browser) return null
  if (!client) {
    if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) return null
    client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  }
  return client
}

export const isConfigured = () => Boolean(supabase())

/**
 * Get a session, creating an anonymous one if needed.
 *
 * Called before the first graded answer rather than on page load, so a visitor
 * who only reads the reference never creates a row. Seventy per cent of traffic
 * is modelled as bouncing, and there is no reason to mint an account for them.
 */
export const ensureSession = async () => {
  const client = supabase()
  if (!client) return null

  const { data } = await client.auth.getSession()
  if (data.session) return data.session

  const { data: created, error } = await client.auth.signInAnonymously()
  if (error) return null
  return created.session
}

export const currentUser = async () => {
  const client = supabase()
  if (!client) return null
  const { data } = await client.auth.getUser()
  return data?.user ?? null
}

/** True when this is a throwaway identity rather than a real account. */
export const isAnonymous = (user) => Boolean(user?.is_anonymous)

/**
 * Sign in with Google, the only provider.
 *
 * An anonymous player LINKS rather than signing in fresh, which keeps their
 * user id and therefore their streak. Linking requires manual linking to be
 * enabled in the Supabase project; it is off by default and ships enabled in
 * supabase/config.toml so a fork inherits it.
 */
export const signInWithGoogle = async (redirectTo) => {
  const client = supabase()
  if (!client) return { error: new Error('Sign-in is not configured') }

  const user = await currentUser()
  const options = {
    redirectTo: redirectTo ?? `${window.location.origin}/daily`,
    // Only the three non-sensitive scopes. Anything more triggers Google's
    // full verification review and an annual re-review, which is not a
    // reasonable commitment for a free practice game.
    scopes: 'openid email profile'
  }

  if (isAnonymous(user)) {
    const { error } = await client.auth.linkIdentity({ provider: 'google', options })
    // A Google account already attached to another user cannot be linked. That
    // is the one genuine collision, and it needs the merge path rather than an
    // error the player cannot act on.
    if (error) return { error, needsMerge: true }
    return {}
  }

  const { error } = await client.auth.signInWithOAuth({ provider: 'google', options })
  return { error }
}

export const signOut = async () => {
  const client = supabase()
  if (client) await client.auth.signOut()
}

/** Bearer token for calling the grading function. */
export const accessToken = async () => {
  const client = supabase()
  if (!client) return null
  const { data } = await client.auth.getSession()
  return data.session?.access_token ?? null
}
