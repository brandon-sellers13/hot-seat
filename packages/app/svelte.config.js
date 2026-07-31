import adapter from '@sveltejs/adapter-static'

/**
 * Fully prerendered, with a SPA fallback.
 *
 * adapter-static rather than adapter-netlify because SvelteKit has no server
 * routes in this project: grading and interrogation are separate Netlify
 * Functions that the client calls directly. A static build is simpler, and it
 * is what lets reference mode work with the network off, which is the one part
 * of the game that has to survive a plane.
 */
export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: false
    }),
    serviceWorker: {
      register: true
    },
    alias: {
      $corpus: '../corpus/data'
    }
  }
}
