import { describe, expect, it } from 'vitest'
import {
  CREDIBILITY_START,
  MEETING_LENGTHS,
  SHAPES,
  answerableFor,
  applyDrain,
  decideAsk,
  drain,
  endingFor,
  isShape,
  lengthFor,
  outcomeFor,
  scenarioFor
} from '../lib/meeting.js'
import { LIMITS } from '../lib/budget.js'

/** Shorthand for a meeting's worth of answers. */
const answers = (spec) =>
  spec.map(([verdict, stance = 'countered']) => ({ verdict, stance }))

describe('what an answer costs', () => {
  it('costs nothing when it was right', () => {
    expect(drain('correct', 'countered')).toBe(0)
    expect(drain('correct', 'conceded')).toBe(0)
    expect(drain('correct', 'refused')).toBe(0)
  })

  it('costs nothing when it was merely partial', () => {
    // Deliberate. Credibility is about being caught out, not about being
    // mediocre, and a meeting that ends because six answers were adequate
    // would be charging the player for turning up.
    expect(drain('partial', 'countered')).toBe(0)
    expect(drain('partial', 'conceded')).toBe(0)
  })

  it('costs a pip when it was wrong', () => {
    expect(drain('wrong', 'countered')).toBe(1)
    expect(drain('wrong', 'conceded')).toBe(1)
    expect(drain('wrong', 'refused')).toBe(1)
    expect(drain('wrong', 'none')).toBe(1)
  })

  it('costs double for taking a figure that should have been tested', () => {
    expect(drain('wrong', 'accepted')).toBe(2)
    expect(drain('partial', 'accepted')).toBe(2)
  })

  it('still costs nothing when accepting turned out to be right', () => {
    // A correct answer is never charged for, whatever move it made. Charging
    // one would be telling the player their right answer was a mistake.
    expect(drain('correct', 'accepted')).toBe(0)
  })

  it('costs nothing when the grader failed', () => {
    expect(drain('ungraded', 'none')).toBe(0)
    expect(drain('ungraded', 'accepted')).toBe(0)
  })

  it('never goes below zero and never goes back up', () => {
    expect(applyDrain(1, 'wrong', 'accepted')).toBe(0)
    expect(applyDrain(0, 'wrong', 'countered')).toBe(0)
    expect(applyDrain(3, 'correct', 'countered')).toBe(3)
  })

  it('empties a full bar in three accepted premises', () => {
    let c = CREDIBILITY_START
    for (let i = 0; i < 3; i += 1) c = applyDrain(c, 'wrong', 'accepted')
    expect(c).toBe(0)
  })
})

describe('the recorded outcome', () => {
  it('is burned when credibility ran out, even mid-meeting', () => {
    expect(outcomeFor({ credibility: 0, answered: 3, planned: 20 })).toBe('burned')
    // Burned beats abandoned: the meeting adjourned, the player did not leave.
    expect(outcomeFor({ credibility: 0, answered: 3, planned: 20, walkedOut: true })).toBe('burned')
  })

  it('is abandoned when the player left early with credibility to spare', () => {
    expect(outcomeFor({ credibility: 4, answered: 2, planned: 6, walkedOut: true })).toBe(
      'abandoned'
    )
  })

  it('is not abandoned when they walked out of a meeting that was already done', () => {
    expect(outcomeFor({ credibility: 4, answered: 6, planned: 6, walkedOut: true })).toBe('survived')
  })

  it('separates surviving from being wounded', () => {
    expect(outcomeFor({ credibility: 3, answered: 6, planned: 6 })).toBe('survived')
    expect(outcomeFor({ credibility: 2, answered: 6, planned: 6 })).toBe('wounded')
    expect(outcomeFor({ credibility: 1, answered: 6, planned: 6 })).toBe('wounded')
  })
})

describe('what the board does with the ask', () => {
  it('defers when the player burned out, whatever they got right first', () => {
    const attempts = answers([['correct'], ['correct'], ['correct'], ['wrong']])
    expect(decideAsk({ credibility: 0, attempts })).toBe('deferred')
  })

  it('defers when nothing was answered', () => {
    expect(decideAsk({ credibility: 5, attempts: [] })).toBe('deferred')
  })

  it('defers when fewer than half the answers landed', () => {
    const attempts = answers([['correct'], ['wrong'], ['wrong'], ['partial']])
    expect(decideAsk({ credibility: 4, attempts })).toBe('deferred')
  })

  it('approves a meeting won by holding ground', () => {
    const attempts = answers([['correct'], ['correct'], ['correct'], ['wrong']])
    expect(decideAsk({ credibility: 4, attempts })).toBe('approved')
  })

  it('redirects when a real share of the right answers conceded or refused', () => {
    const attempts = answers([
      ['correct', 'conceded'],
      ['correct', 'refused'],
      ['correct', 'countered'],
      ['wrong', 'countered']
    ])
    expect(decideAsk({ credibility: 4, attempts })).toBe('redirected')
  })

  it('does not redirect on a single concession inside a combative meeting', () => {
    // One agreement is a moment. Two is a position, and only a position moves
    // where the money goes.
    const attempts = answers([
      ['correct', 'conceded'],
      ['correct', 'countered'],
      ['correct', 'countered'],
      ['correct', 'countered'],
      ['correct', 'countered'],
      ['correct', 'countered']
    ])
    expect(decideAsk({ credibility: 5, attempts })).toBe('approved')
  })

  it('treats a well-judged refusal as worth the same as a concession', () => {
    const attempts = answers([
      ['correct', 'refused'],
      ['correct', 'refused'],
      ['correct', 'countered']
    ])
    expect(decideAsk({ credibility: 5, attempts })).toBe('redirected')
  })

  it('reports both endings together', () => {
    const attempts = answers([['correct', 'conceded'], ['correct', 'refused'], ['correct']])
    expect(endingFor({ credibility: 5, attempts, planned: 6, walkedOut: true })).toEqual({
      outcome: 'abandoned',
      decision: 'redirected',
      credibility: 5,
      answered: 3,
      planned: 6
    })
  })
})

describe('meeting length', () => {
  it('encodes the choice on the scenario and reads it back', () => {
    expect(lengthFor(scenarioFor('short'))).toBe(MEETING_LENGTHS.short)
    expect(lengthFor(scenarioFor('long'))).toBe(MEETING_LENGTHS.long)
  })

  it('gives a session created before lengths existed the full ceiling', () => {
    expect(lengthFor('board-meeting')).toBe(MEETING_LENGTHS.long)
  })

  it('does not grant a longer meeting than any mode offers when it cannot parse', () => {
    expect(lengthFor('nonsense')).toBeLessThanOrEqual(LIMITS.exchangesPerSession)
    expect(lengthFor(undefined)).toBeLessThanOrEqual(LIMITS.exchangesPerSession)
  })

  it('never configures a length above the spend ceiling', () => {
    expect(MEETING_LENGTHS.short).toBeLessThanOrEqual(LIMITS.exchangesPerSession)
    expect(MEETING_LENGTHS.long).toBeLessThanOrEqual(LIMITS.exchangesPerSession)
  })
})

describe('question shapes', () => {
  it('accepts only the four known shapes', () => {
    SHAPES.forEach((shape) => expect(isShape(shape)).toBe(true))
    expect(isShape('benchmark-challenge')).toBe(false)
    expect(isShape(undefined)).toBe(false)
    expect(isShape('__proto__')).toBe(false)
  })

  it('marks only the unsettled shape as beyond what the pack can settle', () => {
    expect(answerableFor('unsettled')).toBe(false)
    expect(answerableFor('diagnosis')).toBe(true)
    expect(answerableFor('director-right')).toBe(true)
    // An exchange generated without a shape is answerable, which is what every
    // exchange before shapes existed was assumed to be.
    expect(answerableFor(null)).toBe(true)
  })
})
