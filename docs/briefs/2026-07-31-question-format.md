---
title: "The question format"
type: brief
status: agreed
date: 2026-07-31
---

# The question format

Arrived at by writing questions in chat and rejecting them until the shape held.
Four worked examples below; the rules are derived from them, not the reverse.

## What a question is

Not a prompt. **A short conversation between board members that lands on you.**

A board meeting is a discussion. Directors talk to each other, quote different
numbers, half-correct one another, and then turn. A question that arrives as a
bare interrogative has already lost the thing that makes the room feel real.

## The rules

**1. Open on the player's ask.** The player came in wanting something: budget,
headcount, a decision. Every exchange happens because it bears on that. A board
meeting where you want nothing is a status update, and nobody sweats a status
update.

**2. Data arrives in dialogue.** No preamble block, no "here are the numbers."
Elena says the churn figure because she is making a point with it.

**3. Speakers can be right, wrong, or half-right, and often disagree while both
being correct.** Four percent revenue churn and five percent logo churn are both
true and measure different things. Two directors talking past each other with
accurate numbers is the most realistic thing in the room.

**4. Somebody half-opens a door and leaves it.** The chair says "those are public
companies" and does not say what private actually is. The CFO drops gross
retention and connects it to nothing. A strong answer *finishes a thought the
room started*, which is why the room feels like colleagues rather than examiners.

**5. The question lands last, is aimed at the player, and is answerable.**
"What am I missing?" is an invitation, not a question. "Why is paid the right
home for another dollar?" has a determinate space of answers.

**6. The question is about the plan, not the feelings.** "Which should change
your plan" has consequences. "Which worries you" invites a hedge.

**7. Sometimes the right answer concedes.** Sometimes it says the question cannot
be answered from what is in the room. Neither is a fallback.

## Out of scope

Support tickets, CSAT, service levels. Not marketing's domain, and worse, they
are the kind of thing somebody can gesture at knowledgeably without knowing
anything, so they let a weak answer sound engaged. Activation and channel
economics do not: you either know the cohort sizes or you do not.

## The four worked examples

Company is Arbor Systems, Q3. Every figure ties to `prototypes/board-pack/data.js`.

### 1. Diagnosis, no benchmark

> **Elena (CFO):** Your deck asks for more acquisition budget on the back of a
> good retention quarter. Revenue churn was $456,000. Four percent of the opening
> book. I'll grant you that's inside tolerance.
>
> **Ravi (CPO):** It's twenty-one logos, though. Five percent on four hundred and
> twenty accounts. The revenue number looks good because the accounts we lost
> were small — which happens to be the segment your plan wants to buy more of.
>
> **Elena:** That's fair.
>
> **Camille (independent):** Fourteen of the twenty-one were SMB. One Enterprise.
> And there's $228,000 of contraction underneath all of this, from customers who
> didn't leave at all.
>
> **Ravi** *(to you)*: So before we talk about spending more to acquire — the
> logos we lost, or the spend we gave back from the ones we kept. Which one
> should change your plan?

**Strong answer:** the contraction. Cancellations averaged $21.7k against a
$27.1k book, and fourteen of twenty-one were SMB — losing your smallest accounts
is ordinary and cheap. The $228k came from customers who stayed, which is next
quarter's churn showing up early and, unlike the cancellations, still savable.

**Tests:** logo versus revenue churn measuring different things; segment mix;
contraction as a leading indicator. Both directors are correct.

### 2. The director is wrong, the room half-corrects

> **Camille:** I'll be straight, I'm struggling with the ask. I sit on four
> boards and the good ones run net revenue retention north of one-eighteen.
> You're at one-oh-two.
>
> **Adrian (chair):** Those are public companies, Camille.
>
> **Camille:** Some of them. One-oh-two still isn't where I'd want us before we
> spend more.
>
> **Elena:** Gross retention's ninety-four. That's the number I watch.
>
> **Camille** *(to you)*: So convince me. Why fund acquisition when the base
> isn't compounding the way it should?

**Strong answer:** finish both dropped threads. 118% is Meritech's public-software
peak from Q3 2022; private B2B median is 101%, and 102% at our ACV band per SaaS
Capital — we are at it. Then Elena's 94% against ~91% for the band makes gross
retention a strength, so the eight points between GRR and NRR are expansion. If
the base is not compounding, acquisition budget was never the fix.

**Tests:** benchmark provenance, ACV banding, the GRR/NRR decomposition. The
answer may end by conceding the player's own ask.

### 3. The director is right

> **Elena:** Paid media is at sixteen months payback on a gross-margin basis. Our
> guidance is twelve.
>
> **Ravi:** And it's the channel this plan doubles down on.
>
> **Camille:** Sixteen isn't catastrophic if it's enterprise-weighted —
>
> **Elena:** It isn't. Paid brings us eighteen-thousand-dollar accounts.
>
> **Elena** *(to you)*: So make the case. Why is paid the right home for another
> dollar?

**Strong answer:** it is not. Partner runs $12k CAC into $30k accounts, 6.4
months. Paid burns 4,820 leads to close 24; partner closes 18 from 340. Agree
with her and move the ask to a different column.

**Tests:** knowing when not to argue; channel-level versus blended economics.

### 4. The answer is that you cannot tell from this

> **Camille:** Activation was sixty-two percent in September. Seventy-five in
> August.
>
> **Ravi:** So the accounts arriving stopped getting to first value.
>
> **Camille:** Or they were never going to. Twelve points in a month is a lead
> quality problem, and the plan wants to buy more of the same.
>
> **Adrian:** That's a serious charge against the ask.
>
> **Camille** *(to you)*: So which is it — are we selling to the wrong people, or
> failing them after they sign?

**Strong answer:** neither is established. September's cohort is sixteen
accounts, so the entire fall is two accounts, and July was 68%, which makes 75%
the outlier rather than 62% the collapse. Activation is not cut by channel
anywhere in the pack, so the lead-quality claim cannot be tested by anyone in the
room. Name what would settle it: activation by channel, matured cohorts only.

**Tests:** sample-size instinct, and that declining to answer is sometimes
correct rather than a dodge.

## Consequences for the build

**The pack prints the headline metrics.** An earlier rule said never print a
derived metric. That was wrong: the board has the packet, so NRR and GRR are on
the page. What gets computed is the adjustment, the decomposition, or the
channel cut nobody put on a slide.

**Grading is a spine plus a judgment.** The checkable part grades in code: did
they name a defensible alternative figure, did they attribute it, did they
identify the right decomposition. The strategy is judged by the board-answer
rubric already running in production. Deterministic-only does not survive this
format, and should not.

**Conceding has to be a first-class outcome.** The rubric's top tier is anchor
plus bridge. In example 3 the anchor agrees with the challenger. A grader that
treats countering as the winning move will mark a correct answer down.

**Refusing has to score honestly.** Example 4 only works if declining scores well
when the data genuinely is not there and badly when it was. That distinction has
to be real in the grader, not aspirational.
