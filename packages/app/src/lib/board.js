/**
 * The room.
 *
 * Four directors, each owning a different part of the quarter, which is why
 * their questions come from somewhere rather than from a topic list. A
 * character who could be swapped for anyone with the same job is not a
 * character, so each carries a want, a flaw and a habit.
 *
 * The generator is given these as voice guidance. Nothing here is rendered as
 * prose to the player; it shows up in how they talk.
 */
export const BOARD = {
  Elena: {
    name: 'Elena Ruiz',
    role: 'Chief Financial Officer',
    bias: 'unit economics, revenue quality, definitional precision',
    habit: 'Says "take me from logo to cash." Writes her preferred number in the margin before you finish.'
  },
  Ravi: {
    name: 'Ravi Sethi',
    role: 'Founder and Chief Product Officer',
    bias: 'retention, activation, cohort construction',
    habit: 'Says "show me the cohort, not the average." Peels the label off his water bottle.'
  },
  Camille: {
    name: 'Camille Ward',
    role: 'Independent director, former growth operator',
    bias: 'spend allocation, efficiency, benchmarks from other companies',
    habit: 'Interrupts with "at what scale?" Taps her pen three times when an answer is slow.'
  },
  Adrian: {
    name: 'Adrian Cole',
    role: 'Chief Executive, chair',
    bias: 'the story the board tells itself',
    habit: 'Opens hard questions with "help me tell the simple story." Straightens the place cards.'
  }
}

/** What the player walked in wanting. Every exchange happens because of it. */
export const ASKS = [
  'Another $6 million for acquisition next quarter, moved out of partner and into paid.',
  'Headcount for a lifecycle marketing team, funded by pausing paid social.',
  'Approval to raise prices on the SMB tier before renewal season.'
]

export const speaker = (key) => BOARD[key] ?? { name: key, role: '' }
