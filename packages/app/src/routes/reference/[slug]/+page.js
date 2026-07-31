import { error } from '@sveltejs/kit'
import cards from '$corpus/cards.json'

/**
 * Every card is prerendered to its own page. That costs build time and buys
 * three things worth having: deep links that survive being pasted into Slack,
 * pages the service worker can cache individually for offline use, and content
 * a search engine can actually read.
 */
export const entries = () =>
  [...cards.cards, ...cards.narrative].map(({ slug }) => ({ slug }))

export const load = ({ params }) => {
  const all = [...cards.cards, ...cards.narrative]
  const card = all.find((c) => c.slug === params.slug)
  if (!card) error(404, 'No metric with that name')

  // Related cards are stored as free-text names, so resolve the ones that match
  // a real card and quietly drop the rest rather than rendering dead links.
  const byTitle = new Map(all.map((c) => [c.title.toLowerCase().replace(/\([^)]*\)/g, '').trim(), c]))
  const related = (card.facets.related ?? [])
    .map((name) => byTitle.get(name.toLowerCase().trim()))
    .filter(Boolean)
    .filter((c) => c.slug !== card.slug)
    .map(({ slug, title }) => ({ slug, title }))

  return { card, related }
}
