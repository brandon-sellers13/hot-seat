/// <reference types="@sveltejs/kit" />
import { build, files, prerendered, version } from '$service-worker'

/**
 * Offline support.
 *
 * Reference mode has to work with no network, which is the promise made on the
 * home page and in the README. That means the shell, the fonts, and the card
 * set all have to survive a cold start on a plane.
 *
 * Build assets are content-hashed, so they are cached permanently and the whole
 * cache is dropped when the version changes. Everything else is network-first
 * with a cache fallback, so a stale page never outlives a deploy.
 */
const CACHE = `hot-seat-${version}`
const PRECACHE = [...build, ...files, ...prerendered]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Grading and interrogation must never be served from cache. A stale verdict
  // is worse than an honest failure, because it corrupts the scheduler and the
  // player's trust at the same time.
  if (url.pathname.startsWith('/.netlify/functions/')) return

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)

      // Content-hashed assets can never go stale, so serve them from cache and
      // skip the network entirely.
      if (PRECACHE.includes(url.pathname)) {
        const hit = await cache.match(request)
        if (hit) return hit
      }

      try {
        const response = await fetch(request)
        // Opaque and error responses are not worth keeping.
        if (response.ok && response.type === 'basic') {
          cache.put(request, response.clone())
        }
        return response
      } catch (error) {
        const hit = await cache.match(request)
        if (hit) return hit
        // A navigation with nothing cached still needs to render something, so
        // fall back to the app shell and let the client show its offline state.
        if (request.mode === 'navigate') {
          const shell = await cache.match('/')
          if (shell) return shell
        }
        throw error
      }
    })()
  )
})
