// Everything prerenders. There are no server routes: grading and interrogation
// are separate Netlify Functions the client calls directly, which is what makes
// reference mode work with no network at all.
export const prerender = true
export const ssr = true
export const trailingSlash = 'never'
