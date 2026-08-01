---
title: "feat: The Meeting — generated board exchanges over a company pack"
type: feat
status: active
date: 2026-07-31
supersedes: docs/plans/2026-07-31-001-feat-hot-seat-narrative-plan.md
---

# The Meeting

## What this is now

You are VP of Marketing. You walk into a board meeting having asked for
something. Four directors work through your numbers, disagree with each other,
and turn to you. You answer out loud. The board pack is on the table.

The unit of play is an **exchange**: a short conversation between directors that
lands on one answerable question. Exchanges are generated from a corpus card
plus the company's pack, not authored, which is what makes it replayable.

## What was tried and rejected, so it is not retried

**An authored mystery** (Latchline). Two drafts, three adversarial reviews. The
finance was eventually made sound, but every path has to be hand-written because
a secret cannot be generated, so one week of authoring bought one playthrough.
Killed on scope.

**Compute-the-metric questions.** "What was our NRR?" is not a board question.
The board has the packet; they already know. Killed after one playtest of
question one.

**Retrieval as its own question type.** "How many customers did we have?" is a
lookup exercise wearing a metric's clothes. Nobody asks it. Retrieval is
measured from the navigation log instead, which is a better instrument.

## The decisions that hold

| | |
|---|---|
| Unit of play | The exchange. Conversation, then one question |
| Question format | `docs/briefs/2026-07-31-question-format.md`, validated at 90% |
| Generation | `packages/functions/src/lib/exchange.js`, eval in `evals/` |
| Data | A source-organised pack. Sections named for records, never metrics |
| Search | None, and only the open section renders, so browser find cannot cross tabs |
| Headline metrics | **Printed.** The board has the packet |
| What is computed | Adjustments, decompositions, the cut nobody put on a slide |
| Answering | Spoken, via the player's own dictation tool. No speech code here |
| Grading | Checkable spine in code, judgment by the board-answer rubric |
| Modes | One. Short meeting or long meeting |
| Progress | None. Single sitting, nothing to save |
| Identity | Anonymous only, purely so spend caps can count |

## The risk being accepted, knowingly

The core claim is that metric knowledge converts into lookup speed. A
falsification prototype exists (`prototypes/board-pack/`) with a declared pass
bar of experts beating fast novices by 20 points on accuracy and 25% on time.

**We are not gating on it.** Coordinating a controlled test costs more than
shipping something playable, and live play produces the same signal continuously.

What we keep: the navigation instrument. Every session records which sections
were opened, in what order, and how long before the answer. If experts and
novices do not separate on that in real play, the pack is leaking and the
mechanic is wrong. The prototype stays runnable for when a controlled read is
wanted.

## Grading, which is where this gets specific

The board-answer rubric already runs in production: **anchor a number you can
source, then bridge to strategy.** This format needs three amendments.

**Conceding must be a top-tier outcome.** When a director is right, agreeing and
redirecting is the strongest available answer. A grader that rewards countering
will mark the best answer down.

**Refusing must score honestly.** When the pack cannot settle a question, saying
so and naming the cut that would is correct. Saying so when the answer was
available is a failure. That distinction has to be real in code, not aspirational.

**The spine grades deterministically.** Did they name a defensible figure, did
they attribute it, did they identify the right decomposition. Only the strategy
goes to the model, which keeps scoring variance out of the checkable part.

## Units

- [ ] **M1: The pack, in the app.** Port the prototype's source-organised pack
      into the SvelteKit app as a component: tabbed by source, only the open
      section rendered, navigation logged. No questions yet.
- [ ] **M2: One exchange, end to end.** Generate an exchange from a card plus the
      pack, render it as dialogue, take a typed or dictated answer, grade it,
      show the result. One exchange, one screen. This is the walking skeleton.
- [ ] **M3: Grading amendments.** Concede-and-redirect as a top tier; honest
      refusal; the deterministic spine split from the judged part. Fixture set
      extended with concede and refuse cases before the code changes.
- [ ] **M4: The meeting.** Six or twenty exchanges, the opening ask, credibility,
      an outcome that reflects what happened rather than a score.
- [ ] **M5: Narrative frame.** Company choice, the situation, the stakes, and an
      ending that resolves the ask.
- [ ] **M6: Art.** Four directors, generated portraits, expressions driven by the
      exchange rather than decorating it.

M1 and M2 together are the first thing worth looking at. M3 before M4, because
building a meeting on a grader that punishes the best answer would bake the
error in.

## Verification

- An exchange generated live in the app quotes only figures that exist in the
  pack, checked by the same audit used in the eval.
- A dictated answer grades identically to the same text typed.
- Conceding to a correct director scores top tier.
- Refusing when the pack cannot settle it scores well; refusing when it could
  scores badly.
- The navigation log distinguishes going straight to a source from hunting.
