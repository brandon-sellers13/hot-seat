/**
 * Minimal inline markdown, escaped first.
 *
 * The corpus prose uses bold, italic and code spans and nothing more exotic.
 * Structured content (benchmark rows, formula variants) is already parsed into
 * data by the extraction, so nothing here has to handle tables or links, and a
 * full markdown dependency would be weight for no gain.
 *
 * HTML is escaped before any markup is introduced, so corpus text can never
 * inject an element. That matters because a forker's own notes flow through
 * this same path.
 */
const escapeHtml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const inlineMarkdown = (text) => {
  if (!text) return ''
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:]|$)/g, '$1<em>$2</em>')
}

/**
 * Split prose into paragraphs, dropping any leftover table rows.
 *
 * Tables that survived into a prose facet are already represented as structured
 * data elsewhere on the card, so rendering their pipe syntax as text would show
 * the same figures twice, once unreadably.
 */
export const paragraphs = (text) => {
  if (!text) return []
  return text
    .split(/\n{2,}/)
    .map((block) =>
      block
        .split('\n')
        .filter((line) => !line.trim().startsWith('|'))
        .join(' ')
        .trim()
    )
    .filter(Boolean)
}
