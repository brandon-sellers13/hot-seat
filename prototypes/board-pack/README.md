# Falsification prototype — the board pack

This is not the game. It is a test designed to kill an idea cheaply.

## The one question

Does metric knowledge make you **faster**, or does fast reading beat it?

The design under test says: knowing that net revenue retention needs an opening
cohort and the movements against it means you open two sections and pull four
numbers. Not knowing that means you open everything and hunt. Ignorance is not
blocked, it is too slow.

If that is wrong, everything built on top of it is wrong, and no amount of
narrative, character art or voice input repairs it.

## Running it

```bash
cd prototypes/board-pack && python3 -m http.server 8099
```

Then open http://localhost:8099. Nothing to install. Twelve questions, about ten
minutes.

## What makes it a fair test

**Sections are named after sources, not metrics.** Billing, Cohorts, Revenue,
Acquisition, Product, Support. There is no tab called "Retention" or "CAC",
because a tab named after the metric hands over the answer.

**There is no search, and the browser's own find cannot cheat.** Only the open
section is written to the DOM, so Ctrl+F sees one tab at a time.

**No derived metric is printed for anything a question asks you to compute.**
The four NRR inputs are there. NRR is not.

**Every retrieval question has plausible wrong neighbours.** Ending customer
count next to opening. Billings next to recognised revenue. Downgraded-but-
retained next to fully cancelled. Picking correctly requires knowing which basis
the question wants.

**A calculator is provided.** Arithmetic speed is not the skill being measured;
knowing which numbers to put in is.

**Every question is one a director would actually ask.** An earlier draft split
questions into "retrieval" and "computation" and produced things like "how many
customers did we have at the start of the quarter" — a lookup exercise wearing a
metric's clothes, and the least interesting thing in the game sitting at
question one. Nobody in a board meeting asks you to retrieve a number in
isolation; they ask about the business and the lookup is a step inside the
answer. Retrieval is still measured, from the navigation log, which is a better
instrument anyway.

**Nobody is cut off.** Timings are recorded, not enforced. Enforcing a window
before knowing what a knowledgeable player actually needs would measure
interface speed.

## Reading the result

Three numbers matter, and they are on the results screen:

| | What it means |
|---|---|
| Single-source accuracy and time | Everything needed sits in one section |
| Across-source accuracy and time | Inputs are split, so you must know where they live |
| Navigation split | Answered cold, went straight to the right source, or hunted |

The across-source half is where the signal is. Crossing sections is the thing
you cannot do without knowing what a metric is built from, so that is where an
expert should pull away from a fast reader. If the two groups separate on
single-source questions but not across-source ones, the pack is leaking.

The navigation split is the sharpest signal. Someone who knows the metrics opens
one or two sections. Someone who does not opens five and reads.

## The pass bar, declared before any data was collected

Metric-literate players must beat fast metric-illiterate readers by:

- **20 percentage points** on accuracy, **and**
- **25%** on median time to a correct answer.

Both, not either.

If a fast reader with no metric knowledge matches an expert, **the mechanic is
dead** and this direction should be dropped rather than built on. That is the
point of running it now, while it costs an afternoon.

## Honest limits

The original review asked for twelve players. That is not happening this week.
The realistic version is a handful of people, and the failure mode to watch for
is the pack **leaking**: if someone can score well by scanning alone, the test
has already told you what you need to know regardless of sample size.

Every run downloads a JSON log with every tab opened, every calculator
expression, every answer and every timing, so a small sample can still be
examined properly rather than summarised into a single score.

## Answer key

In `data.js`, alongside each question. Do not read it before playing.
