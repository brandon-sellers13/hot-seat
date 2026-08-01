---
title: "Case 01 — Latchline, Q3 board meeting"
type: case
status: draft
date: 2026-07-31
for: docs/plans/2026-07-31-001-feat-hot-seat-narrative-plan.md
---

# Latchline, Q3

The first authored case. Written to be paper-playtested before any code, because
it decides things the plan cannot answer on its own: whether random card
selection survives, what state the engine must track, and what grading means
once the board has motives.

## The design claim this case is testing

**Metric knowledge is the investigative tool.**

This is the whole bet, and it is what keeps recall fluency as objective number
one while still producing a mystery. You cannot find the fraud without knowing
how the metrics are constructed:

- You only catch the inflated retention if you know net revenue retention counts
  a customer as retained on contract status, not on cash received, and that a
  free extension is therefore invisible in it.
- You only reject the "lead quality" story if you know activation sits upstream
  of retention, and that a cohort defined after a product change cannot be
  compared to one defined before it.
- You only unpick the attribution claim if you know what a view-through window
  does to marketing-sourced pipeline.

Every question the board asks is still a real question about a real corpus card,
graded against that card's facets exactly as now. What changes is that the
question comes from somebody with a reason to ask it, in an order that matters.

**The corpus supplies the substance. The case supplies the order, the stakes and
the motive.** If a playtest shows the case is carrying the interest and the
metrics are incidental, the design has failed and should be thrown away.

## Cold open

> **8:10 a.m. Fifty minutes before the Q3 board meeting.**
>
> Mara Velez, Latchline's CMO, has resigned. Adrian is telling people it was for
> personal reasons.
>
> Her last message to you, sent at 07:58, reads in full:
>
> > *"Don't certify slide 17. I'm sorry. You'll work out why."*
>
> You are VP of Marketing. Slide 17 says Latchline closed Q3 at 101% of target
> with net revenue retention of 120%. The board is meeting to approve six million
> dollars of additional acquisition spend, on the stated basis that lead quality
> is the constraint on growth.
>
> At 8:31, Priya Shah, the analytics lead you hired six months ago, sends you a
> one-line message: *"Cash doesn't tie to the retention number. I've got the
> reconciliation. Do you want it before you go in?"*

The player takes one exhibit into the room. That is the first decision and it is
made before anybody has spoken.

## What actually happened

The board believes: growth is fine, retention is excellent, marketing is not
generating enough qualified pipeline, so buy more.

The truth, in causal order:

1. In week two of Q3, Ravi forced a new onboarding flow into production with no
   staged rollout, over Priya's written objection.
2. Activation fell from 68% to 31% for every cohort that landed after the
   release. New customers never reached first value.
3. Those accounts were heading for non-renewal inside the quarter.
4. Elena granted 90-day free extensions to 31 of them and left them classified as
   retained, because a renewal that has not formally lapsed is still a live
   contract.
5. Net revenue retention therefore reads 120%. Gross revenue retention, which
   cannot be rescued by expansion, is the number nobody has put on a slide.
6. Separately, the quarter's largest deal had its source field changed from
   `partner referral` to `paid search` eleven days after close, which is what
   makes acquisition look productive enough to deserve six million more.
7. The agency whose attribution model produced that reclassification is run by
   Camille's former deputy. Camille sponsored the contract and defended its
   30-day view-through window at the last board meeting.
8. Adrian promised 120% net revenue retention in a side letter to the incoming
   investor. A restatement breaches a financing condition.
9. Adrian's plan, if pressed, is to attribute the discrepancy to a "dashboard
   reconciliation error" by Priya.

**The board is about to spend six million dollars fixing the wrong problem.**

## The room

Four people. Each owns a different piece of the failure, which is why their
questions come from somewhere rather than from a topic list.

### Elena Ruiz, Chief Financial Officer

**Wants:** the term sheet signed without formally restating retention.
**Flaw:** treats "reconcilable later" as equivalent to true now. Under pressure
she retreats into definitions rather than intent.
**Habit:** says *"Take me from logo to cash"* and writes her preferred number in
the margin before you have finished answering.
**Why it is personal:** she approved the 31 extensions herself and signed off
classifying them as active renewals.
**Attacks:** definitional precision, cash timing, anything where a metric can be
constructed two ways.

### Ravi Sethi, founder and Chief Product Officer

**Wants:** the quarter blamed on lead quality, and his onboarding flow left in
production.
**Flaw:** mistakes ownership for expertise. Demands cohort rigour from everyone
else and cherry-picks his own.
**Habit:** says *"Show me the cohort, not the average"*, then rejects any cohort
that makes his release look bad. Peels the label off his water bottle while
listening.
**Why it is personal:** he overrode a staged rollout. The activation collapse
begins forty-eight hours after his release.
**Attacks:** lead quality, cohort definitions, top-of-funnel intent.

### Camille Ward, independent director, former growth operator

**Wants:** next quarter's budget moved into performance media, without anybody
examining the attribution model.
**Flaw:** equates speed with competence, and fills uncertainty with borrowed
benchmarks from companies that are not this one.
**Habit:** interrupts with *"At what scale?"* and taps her pen three times when
she thinks an answer is too slow.
**Why it is personal:** her former deputy founded the agency that received the
disputed attribution credit. She sponsored the contract.
**Attacks:** spend allocation, efficiency ratios, benchmark comparisons. This is
the seat that quotes a fabricated benchmark as fact.

### Adrian Cole, Chief Executive and chair

**Wants:** unanimous approval, and the player installed as CMO inside the
existing story.
**Flaw:** uses warmth as coercion. Avoids lying directly by arranging for other
people to say the thing.
**Habit:** opens his hardest questions with *"Help me tell the simple story."*
When cornered he asks somebody else to answer, and straightens the place cards.
**Why it is personal:** the side letter, and his voting control.
**Attacks:** nothing, on the surface. He converts disputed facts into
"leadership judgment" and offers the promotion at the exact moment it is most
expensive to refuse.

## Exhibits

The player holds these. Some arrive mid-meeting.

| # | Exhibit | Held from | What it proves |
|---|---|---|---|
| E1 | Slide 17 | start | The claim: 101% of target, 120% NRR |
| E2 | Mara's resignation message | start | Somebody who saw the books refused to certify it |
| E3 | Cash receipts against reported retained ARR | opening choice | The two do not tie |
| E4 | Retained-logo list, annotated | after contradiction 1 | 31 accounts on free 90-day extensions |
| E5 | Activation by weekly cohort | after contradiction 1 | 68% to 31%, breaking at the release |
| E6 | Ravi's release note, with Priya's objection | Act 2 | The rollout was forced, and the objection was written down |
| E7 | CRM field-history export | Act 3 | Source changed 11 days after close |
| E8 | Agency contract, first page | Act 3 | 30-day view-through, sponsor named |

## The loop, per exchange

Three actions. This is the change that makes it a game rather than an oral exam.

1. **Answer.** Respond to the question. Graded against the corpus card exactly as
   today, on the board-answer rubric. This is still the spine and still most of
   what happens.
2. **Press.** One return question, to make somebody disclose. Limited to three
   per meeting. A press aimed at the wrong person wastes it.
3. **Present.** Put an exhibit against a claim just made. This is the Ace
   Attorney move. Correct, and the case advances. Wrong, and it costs
   credibility, because accusing a director with the wrong document in your hand
   is exactly as bad in the fiction as it is in life.

**Answering well is necessary and not sufficient.** A player who answers every
question correctly and never presents anything gets a good performance score and
the worst available ending, because the six million is still approved. That
asymmetry is the whole point and should be felt on the first playthrough.

## The three contradictions

Each is mandatory to advance the causal chain. Each requires knowing a metric
properly, which is the design claim in action.

### Contradiction 1 — retention cannot be both

**Claim (Elena, Act 1):** "Retention is 120%. It is the strongest number on the
page."
**Present:** E3, cash receipts against reported retained ARR.
**Metric you must know:** net revenue retention counts contract status, not cash.
A live contract generating no cash is still retained.
**Forces:** Elena concedes a "timing difference", which produces E4.

### Contradiction 2 — the collapse has a date

**Claim (Ravi, Act 2):** "This is a lead quality problem. The cohorts we bought
in Q3 were weaker."
**Present:** E5 against E6, activation by cohort against the release note.
**Metric you must know:** activation sits upstream of retention, and a cohort
boundary drawn after a product change cannot be compared with one drawn before
it.
**Forces:** Ravi has to defend the rollout rather than the lead source, and the
room's diagnosis moves off marketing.

### Contradiction 3 — the source was changed

**Claim (Camille, Act 3):** "Paid is carrying pipeline. The largest deal of the
quarter is marketing-sourced. That is what the six million buys more of."
**Present:** E7, the CRM field history.
**Metric you must know:** what a view-through window does to sourced pipeline,
and that source is assigned at creation, not at close.
**Forces:** the attribution model itself comes under scrutiny, which surfaces E8
and Camille's conflict.

## Act structure

**Act 1, exchanges 1-7. The number that cannot be true.**
Elena leads. Questions run on retention construction, churn, and cash. Adrian
offers the promotion early and warmly, before the player knows what it costs.
Ends on contradiction 1 or on Elena closing the topic unchallenged.

**Act 2, exchanges 8-14. Where it actually broke.**
Ravi leads, defending lead quality. Questions run on activation, onboarding,
cohort construction and the retention drivers. Ends on contradiction 2, or on the
board accepting the lead-quality diagnosis.

**Act 3, exchanges 15-20. What the money buys.**
Camille leads, on efficiency and spend. This is where the fabricated benchmark is
planted, because it is now in character rather than a mechanic. Adrian applies
the promotion as pressure. Ends on contradiction 3, and on the vote.

**Short meeting (6-7 exchanges):** Act 1 only, ending on the vote to approve or
defer the restatement. Complete and satisfying on its own, and it is the version
somebody plays first.

## Story state, tracked separately from performance

Six flags. These, not the score, determine the ending.

| Flag | Set when |
|---|---|
| `extensions_exposed` | contradiction 1 landed |
| `activation_identified` | contradiction 2 landed |
| `attribution_exposed` | contradiction 3 landed |
| `priya_protected` | player refused to attribute the discrepancy to her when invited to |
| `forecast_certified` | player endorsed slide 17 without qualification |
| `promotion_accepted` | player took the CMO offer |

## Endings

Four, materially different, and none of them is a score.

**The corrected forecast.** All three contradictions landed, Priya protected,
forecast not certified. The board defers the six million and orders a
restatement. Adrian does not offer you the CMO seat, because he cannot control
you. *You were right and it cost you the job.*

**The partial win.** Activation identified, extensions missed. Ravi is forced
into a rollback and the product problem gets fixed, but the retention number
survives on the slide and the financing closes against a figure that is not real.
*You fixed the thing you could see.*

**The promotion.** Forecast certified, promotion accepted. Six million approved.
Priya is dismissed within the month for a reconciliation error she did not make.
You are CMO. *The last screen is Mara's message, again, in full.*

**The sacrifice.** Extensions exposed but the instruction behind them never
traced to Adrian. Elena resigns. The financing closes. Adrian keeps control and
now owes you nothing. *You took down the wrong person.*

## Sample exchange, written out

For the paper playtest. Exchange 3, Act 1.

> **ELENA** *(writing in the margin before you answer)*
> Take me from logo to cash. We closed the quarter at 120% net revenue
> retention. Walk the board through what that number is actually counting.

*The corpus card in play is `net-revenue-retention`, facet `definition`. The
question is real and the grading is unchanged.*

**If the player answers well** — cohort of existing customers, expansion minus
contraction and churn, new logos excluded:

> **ELENA**
> Correct. Which is why I am comfortable with it.

**If the player also presses:** *"Counting on what basis, contract or cash?"*

> **ELENA** *(pause)*
> Contract status. As it has been every quarter.
> **ADRIAN** *(straightening the place cards)*
> Help me tell the simple story here. Is the number right, or is it not?

**If the player presents E3 here:**

> **ELENA**
> That is a timing difference.
> **CAMILLE**
> At what scale?
> **ELENA** *(after a moment)*
> Thirty-one accounts. They are on extensions. They have not lapsed.

*`extensions_exposed` set. E4 arrives. Act 2 unlocks.*

**If the player answers well and presents nothing:** Elena closes the topic,
Adrian thanks them warmly, and the meeting moves on with the number intact. The
player has just scored full marks on the exchange and lost the case.

## What the playtest has to answer

Run with one person as the board and one as the player. Do not explain the case
to the player first.

1. Does the player form a hypothesis before being told one?
2. Does anybody's behaviour visibly change when a contradiction lands?
3. Is the promotion genuinely tempting, or obviously a trap?
4. Does the player care what happens to Priya?
5. **Is the metric knowledge doing the work, or is the story carrying it?** If a
   player who knows nothing about net revenue retention can still find the fraud,
   the central design claim is false and this whole direction should be dropped.
6. Does answering everything correctly and presenting nothing feel like a loss?

Question 5 is the one that decides whether to build this.
