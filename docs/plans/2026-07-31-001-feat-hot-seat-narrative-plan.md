---
title: "feat: The Hot Seat as a narrative, time-boxed, voice-first game"
type: feat
status: superseded
date: 2026-07-31
supersedes: docs/plans/2026-07-30-001-feat-hot-seat-daily-plan.md
---

> **SUPERSEDED, 2026-07-31**, same day. The length, narrative and voice
> decisions here all hold. What changed is the unit of play: this plan still
> assumed a question was a question. See
> `docs/plans/2026-07-31-002-feat-the-meeting-plan.md`.

# The Hot Seat, rebuilt around the meeting

## What changes, and why

The shipped version is two modes sharing a grading spine, with the Hot Seat
framed as a generic questioning session. Playtesting the deployed build against
the reference made three things obvious.

**One mode, not two.** The Daily was the habit engine, and it was also the part
that felt like homework. It goes. Everything becomes the Hot Seat, played in a
single sitting, as many times as you like.

**A session is a length, not a turn count.** Players pick a short meeting or a
long one before they start, and the game is built to fit that time.

**The meeting needs stakes.** The current build opens on a rules card. It should
open on a situation: which company you run, what kind of year it has been, and
what happens to you personally if this goes well.

Two consequences follow that were not obvious until the decisions were made.
Dropping multi-day play removes the reason for spaced repetition and saved
progress, which deletes a surprising amount of machinery. And moving to voice
input breaks the hesitation measurement unless the thing being measured changes
with it.

### The bet being taken, stated plainly

The Daily existed as the answer to the review's original number-one risk: the
session that never starts. Removing it means nothing brings a player back except
the narrative and the wish to do better than last time. That is a real bet. If
nobody plays twice, the answer is not to re-add a daily streak, it is that the
meeting was not compelling enough, and that is worth learning cleanly.

## Scope

| In | Out |
|---|---|
| One mode: the Hot Seat, short or long | The Daily, streaks, the result tile |
| Narrative setup: company type, situation, stakes | Spaced repetition and Leitner scheduling |
| Generated character art with expressions | Google sign-in, account UI, progress screens |
| Voice-first answering | Any data connector, still and always |
| Anonymous identity, purely for spend control | Cross-device history |

## The session

### Two lengths, chosen up front

| | Short meeting | Long meeting |
|---|---|---|
| Exchanges | 6 | 20 |
| Wall clock | about 8 minutes | about 30 minutes |
| Use | a coffee break, or a first try | the real thing |

Thirty minutes is the ceiling on purpose. Sustained recall under pressure
fatigues quickly, and past roughly half an hour a player is training endurance
rather than fluency. A finished thirty-minute meeting also teaches more than an
abandoned hour, and abandonment rises steeply with length. If longer sessions
are ever wanted, the honest way to get there is to let somebody play twice.

Timing is derived rather than enforced with a clock on screen. A visible
countdown would push players to answer fast rather than well, which inverts the
whole point. The length choice sets the number of exchanges, and the estimate is
stated in minutes because that is how people decide whether they have time.

### The narrative frame

Set before the first question, in this order:

1. **Which company.** Consumer subscription app, or B2B SaaS. This is a real
   choice, not a cosmetic one: it selects which families of the corpus the board
   can draw from, so a consumer player is never asked about pipeline coverage.
2. **The situation.** Two good quarters, then a soft one. This quarter you made
   your numbers, but barely, and everybody in the room knows it. The board is
   not hostile. They are unsettled, and they are doing their job.
3. **What is riding on it.** You are VP of Marketing. The CMO seat is open and
   the board is deciding, partly in this meeting, whether you are ready for it.
4. **How to survive it.** The existing three rules, unchanged, because they are
   the actual skill being trained.

The stakes carry through to the ending. Outcomes stop being "survived, wounded,
burned" in the abstract and become what the board concluded about the promotion,
which is the same five-tier rubric result wearing clothes that mean something.

### Company type drives card selection

| Consumer subscription app | B2B SaaS |
|---|---|
| consumer-subscription | b2b-pipeline-sales |
| engagement-activation | revenue-quality |
| acquisition-paid-media | growth-efficiency |
| retention-churn | retention-churn |
| unit-economics | unit-economics |

Cards already carry an `applies_to` facet, so selection filters on family first
and then excludes any card whose own text says it does not apply. A card marked
`both` is fair game in either meeting.

## Voice-first answering, and what it does to the hesitation timer

Answers are spoken, using whatever dictation tool the player already has: Wispr
Flow, Willow, macOS dictation. **The app implements no speech recognition.**
These tools type into the focused field, so a textarea is all that is required,
and building a second speech stack to compete with the one already on their
machine would be work spent to make the product worse.

But dictation inserts a whole answer in one burst once the speaker stops. The
current mechanic measures time from question to first keystroke, so a
considered twenty-second spoken answer would register as a twenty-second
hesitation. The measurement has to change or it becomes noise.

**What gets measured instead: time from the question appearing to the player
signalling they are ready to answer.** A single, obvious control, hit by keyboard
or by tap. After that the clock is off and they can speak or type for as long as
they like.

This is a better mechanic than the one it replaces, and not only for voice. The
old timer conflated deciding what to say with typing it, so a slow typist looked
like a hedger. What actually matters in a real room is the pause before you
begin, and that is now exactly what is recorded.

Thresholds are set per length, and the in-character callout when a player sits
too long stays as it is.

## Art

Four board members, each with five expressions, generated as portraits in a
consistent style and committed to the repository.

| Seat | Bias | Notes |
|---|---|---|
| CFO | unit economics, revenue quality | the hardest questioner, and the one who plants the trap most often |
| Product | retention, engagement | probing rather than aggressive |
| Growth | acquisition, funnel | fast, numbers-first |
| CEO | chairs | friendly, and the one whose disappointment lands hardest |

Expressions: neutral, pressing, pleased, shock, and sceptical. Consistency across
a character's five images matters more than any single image being good, so each
character is generated from one base portrait with variants derived from it, and
the set is reviewed together before committing.

The pixel sprites are retired. They were a good answer to "no assets and no
budget" and the wrong answer to a game whose whole appeal is the theatre of the
room.

## Identity, and what gets deleted

Anonymous sign-in stays, for exactly one reason: rate limits and spend caps need
something to count against. It is invisible and it is never mentioned in the UI.

Deleted outright: the Google button, the account state in the nav, the progress
screens, the streak table, the Leitner table and every scheduler that reads it.
Without multi-day play, spaced repetition has nothing to space. The auth helpers
stay in the repository, unreferenced by the app, because a forker who wants
accounts should not have to write them from scratch.

Repetition across sessions is handled locally: recently seen cards are held in
browser storage and deprioritised. No account, no server, and it fails harmlessly
if storage is unavailable.

### Schema after

| Table | Kept? | Why |
|---|---|---|
| `profiles` | yes | anonymous rows, created by trigger |
| `sessions` | yes | the unit the budget is enforced in |
| `attempts` | yes | rate limiting counts over it |
| `leitner` | **dropped** | nothing to schedule |
| `streaks` | **dropped** | no daily arc |

## Cost, recomputed

A long meeting is twenty exchanges against the old eight to twelve, so the unit
being capped roughly doubles while the Daily's contribution goes to zero.

**The cap moves from sessions to exchanges.** A weekly allowance of about sixty
exchanges buys three short meetings, or one long meeting plus two short ones, and
it tracks cost directly rather than through a session count that now means two
different things. The global daily ceiling stays as the hard guarantee and the
cut-off switch, and it too is expressed in exchanges.

Measured from production, grading runs about 876 input and 69 output tokens per
answer, roughly $0.00025. Interrogation carries the card facets and the
conversation so far, so it is the larger half. The exact per-exchange figure gets
measured in the first unit that can measure it rather than estimated here, and
the weekly allowance is set from that number.

## Units

- [ ] **N1: Strip.** Remove the Daily, streaks, Leitner, progress screens and the
      sign-in UI. Drop two tables. This lands first and alone, because
      everything after it is easier against a smaller codebase.
- [ ] **N2: Session shape.** Length selection, exchange budget, company type,
      card selection by family, local recently-seen memory.
- [ ] **N3: Narrative.** The setup flow, the situation and stakes, the
      interrogator prompt rewritten around the promotion frame, outcome screens
      that resolve it.
- [ ] **N4: Answer control.** The ready-to-answer affordance, the new timing
      semantics, dictation-friendly input, thresholds per length.
- [ ] **N5: Art.** Generate, review and commit four characters at five
      expressions. Replace the sprite renderer.
- [ ] **N6: Budget.** Exchange-based caps, measured per-exchange cost, ceiling
      restated in exchanges.

N1 first. N2 and N3 together, since the narrative is what the session shape
carries. N4 and N5 are independent and can go in either order. N6 last, because
it needs a real per-exchange number from a working long meeting.

## Verification

- A long meeting completes in twenty exchanges and lands within a few minutes of
  the thirty-minute estimate, timed by playing it.
- A consumer meeting never asks a B2B-only question, checked across ten
  generated sessions.
- An answer given entirely by dictation is graded correctly and is not marked
  hesitated.
- The five expressions of one character read as the same person, reviewed side
  by side.
- Per-exchange cost measured from a real long meeting, and the weekly allowance
  set from it rather than guessed.
