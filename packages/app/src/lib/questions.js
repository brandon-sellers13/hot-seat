/**
 * Question phrasing, one per facet.
 *
 * Wording varies within a facet so the prompt cannot be memorised as a string,
 * which would let a player pattern-match the question instead of recalling the
 * metric. The variant is chosen from the card slug, so it is stable for a given
 * card rather than jumping around between renders.
 */
const pick = (slug, options) => {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  return options[hash % options.length]
}

export const QUESTIONS = {
  definition: (card) =>
    pick(card.slug, [
      `What does ${card.title} actually measure?`,
      `Define ${card.title}, in your own words.`,
      `Somebody asks you what ${card.title} means. What do you say?`
    ]),

  formula: (card) =>
    pick(card.slug, [
      `How is ${card.title} calculated?`,
      `Give the formula for ${card.title}, and say which construction you are using.`,
      `Write out ${card.title}. Name the variant.`
    ]),

  inputs: (card) =>
    pick(card.slug, [
      `What data do you need to compute ${card.title}, and where does it come from?`,
      `Which systems would you pull from to build ${card.title}?`
    ]),

  application: (card) =>
    pick(card.slug, [
      `What decision does ${card.title} actually drive?`,
      `Why does ${card.title} matter? What would you do differently based on it?`
    ]),

  benchmark: (card) =>
    pick(card.slug, [
      `What is a good ${card.title}? Name the segment, and say where the figure comes from.`,
      `A director asks what good looks like for ${card.title}. Answer, and source it.`
    ]),

  traps: (card) =>
    pick(card.slug, [
      `What is the most common way ${card.title} misleads people?`,
      `Where does ${card.title} go wrong? Give the trap, not the definition.`
    ])
}
