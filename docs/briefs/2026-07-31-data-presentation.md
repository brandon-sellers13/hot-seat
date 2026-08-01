---
title: "Design brief — how the player sees the company's numbers"
type: brief
status: for-review
date: 2026-07-31
---

# The question

The board asks about a metric. The player has to answer. How do they get at the
company's numbers, and how does that stay a test of metric knowledge rather than
a spreadsheet search?

## What we now think the skill actually is

Not "recall a definition." The thing a person does in a real board meeting is a
chain:

1. Know what the metric is.
2. Know where its inputs live.
3. Pull them.
4. Do the arithmetic.
5. Say what it means and what you are doing about it.

An earlier draft tested only step 4 by handing the player fictional spreadsheets
to audit. A pure recall quiz tests only step 1. Both are narrower than the job.

## The mechanic, proposed

**Metric knowledge converts into lookup speed, not lookup access.**

The data is there for everyone. Someone who knows that net revenue retention
needs opening-cohort ARR, expansion, contraction and churn pulls four figures in
fifteen seconds. Someone who does not know that spends the whole allowance
scrolling and answers late or wrong. Ignorance is not blocked, it is too slow.

That makes the timer meaningful again, which the earlier "press when ready"
design failed to do.

### Proposed timings, to be pressure-tested

- **Two minutes up front** with the board pack, before the meeting starts.
- **Thirty seconds of lookup per question**, on top of thinking time.
- Answer spoken, no clock, once the lookup closes.

### Question types, mapping to corpus facets

| Type | Example | Does lookup help? |
|---|---|---|
| Definition | "What is NRR counting?" | No. Pure recall. |
| Retrieval | "What is our NRR?" | Yes, if you know where it lives. |
| Computation | "What is it excluding the bridge accounts?" | Yes, if you know the formula. |
| Judgment | "So what are you doing about it?" | No. This is the bridge half of the rubric. |

A meeting mixes all four. Only two are helped by the pack, which is what stops it
becoming a search game.

## The open questions, which is what this brief is for

1. **Does a timed lookup reward metric knowledge, or does it reward fast reading
   and keyword search?** If a player can win by searching for "NRR" and copying
   a cell, the mechanic is dead.
2. **How should the pack be structured?** A real board appendix, a searchable
   table, a set of tabs, an ask-for-what-you-want interface? Each rewards a
   different skill.
3. **How big?** Enough that finding things requires knowing where to look, small
   enough that thirty seconds is genuinely workable.
4. **Should the pack contain derived metrics, or only inputs?** If NRR is printed
   on a page, the retrieval question becomes trivial and the computation question
   becomes the only real one. If only inputs are present, every question becomes
   arithmetic under time pressure, which may be exhausting.
5. **What happens when the allowance runs out?** Answer anyway, hedge, or say you
   will follow up? A real board answer includes knowing when to say "I will come
   back to you on that," and that might be a legitimate move worth scoring rather
   than a failure.

## The wrinkle worth preserving

This design makes the "plug in your own numbers" contract far more natural than
it was. Today it is a separate mode bolted on. Under this design, your own
figures simply become the board pack, and the lookup allowance becomes real
pressure, because these are numbers you are supposed to already know. The
generic company is the tutorial; your own company is the game.

Nothing needs building for that now. It should just not be designed out.
