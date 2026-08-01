---
title: "Case 01 — Latchline, Q3 board meeting"
type: case
status: draft-2
date: 2026-07-31
supersedes_draft: draft-1 (2026-07-31)
reviews: docs/reviews/2026-07-31-latchline-case-adversarial.md
---

# Latchline, Q3

Second draft. The first was reviewed and returned FIX FIRST: the finance chain
did not hold, and the central design claim was asserted rather than built. Both
are addressed below, and the specific corrections are listed at the end so the
next reviewer can check them rather than take my word.

## The design claim, and how it is now enforced

**Metric knowledge is the investigative tool.** Draft 1 asserted this and did not
implement it: the mechanic only checked whether the player produced the right
document, which a novice can do by genre convention. Finance-looking paper when
the CFO speaks, chart when the product lead speaks.

The mechanic is now **make a case**, and it has three mandatory parts:

1. **Claim.** What assertion is false or unsupported.
2. **Records.** Which specific records establish it.
3. **Warrant.** How the metric's construction makes those records contradictory,
   with the corrected figure where one can be computed.

Records without a warrant do not advance the case. This is the difference
between the two drafts, and it is the whole design.

The warrant is not a new system. It is the board-answer rubric already built and
running in production: anchor a number you can source, then say what it means.
The existing grading spine scores exactly this shape.

**Records are raw.** No exhibit is named after its own conclusion. There is no
"export showing the source was changed". There is a field-history table, and the
player has to read it and know what they are looking at.

## The mechanic, per exchange

- **Answer.** Respond to the question. Graded against the corpus card as now.
- **Request.** Ask for a specific record or reconciliation. Requests are driven
  by hypothesis, not by act number. Three per meeting. A vague request returns a
  useless record.
- **Press.** One return question to force a disclosure. Three per meeting.
- **Make a case.** Claim plus records plus warrant. A case with records but no
  warrant is refused and costs nothing. A case with a wrong claim costs
  credibility.

Answering everything correctly and never making a case is a good score and the
worst ending, because the six million is approved anyway.

## Cold open

> **8:10 a.m., fifty minutes before the Q3 board meeting.**
>
> Mara Velez, Latchline's CMO, has resigned. Adrian is telling people it was
> personal.
>
> Her last message to you, 07:58, in full:
>
> > *"I couldn't sign the rep letter. Ask Elena what's in the ending ARR."*
>
> You are VP of Marketing. The board is approving six million dollars to move
> budget out of partner and into paid acquisition, on the basis that partner
> pipeline has weakened and paid is carrying the quarter.
>
> Priya Shah, your analytics lead, at 8:31: *"Something's off in the retention
> roll-forward. I can pull it, but if I put my name on it, it's my name on it."*

The player takes **one** record into the room, and decides whether Priya's
analysis goes in **named** or **anonymous**. Named carries weight with the audit
committee and exposes her. Anonymous is easier for Adrian to dismiss as
unsourced, and keeps her out of it.

### Hypotheses available at the open

The opening deliberately supports several explanations. Only two are live.

| Hypothesis | Live? |
|---|---|
| Collections or invoice timing | no, and the records will say so |
| Billing-system migration artefact | no |
| Contract amendments held at prior value | **yes** |
| Cohort maturity, later cohorts not yet renewed | no |
| Channel mix shifting toward weaker sources | no, and disproving it matters |
| Product regression suppressing renewals | **yes** |

A player who requests a collections ageing report gets one, learns nothing, and
has spent a request. That is the intended cost of an untested hypothesis.

## What actually happened

Latchline sells annual contracts. ARR at 1 July was $10.0M.

1. **Week 2 of Q3, Ravi forces a mandatory workspace migration** into production
   with no staged rollout, over Priya's written objection. Every existing
   customer has to reconnect their production data source and re-run one
   workflow before the old configuration stops working.
2. **Migration completion collapses.** 68% of accounts completed the equivalent
   step before the change; 31% after. A feature-flagged holdout of 12% of
   accounts was never migrated and stayed at 67%.
3. Accounts that never completed lost their integrations and stopped getting
   value. **31 of them had annual terms expiring during Q3 and did not renew.**
   They are members of the opening cohort, so they bear on Q3 retention.
4. **RevOps issued no-cost 90-day bridge amendments**: `service_end_date` pushed
   out ninety days, `current_arr` left at the prior paid amount, status left
   `active`.
5. Latchline's written ARR policy counts only **executed paid order forms**.
   Bridge periods without a paid renewal are excluded. The retention dashboard
   does not implement that rule; it includes any account with `status = active`
   and a non-null `current_arr`.
6. **$1.2M of expired ARR therefore stays in ending ARR.**
7. Separately, the quarter's largest deal, **Corven Logistics at $840k**, had
   `original_opportunity_source` changed from `partner_referral` to
   `paid_display` eleven days after close, by a bulk update that copied the
   agency's `campaign_influence` value into the primary source field.
8. The agency is run by Camille's former deputy. Camille sponsored the contract.
9. **Adrian signed a management certificate** for the growth-debt draw
   representing NRR at or above 115%. A restatement breaches it.
10. If pressed, Adrian's plan is to call it a dashboard reconciliation error by
    Priya.

### The reconciliation

| | $M |
|---|---|
| Opening cohort ARR, 1 July | 10.0 |
| Expansion | +2.4 |
| Genuine contraction and churn | −0.4 |
| **Reported ending cohort ARR** | **12.0** |
| Bridge ARR with no executed paid renewal | −1.2 |
| **Policy-compliant ending cohort ARR** | **10.8** |

**Reported NRR 120%. Policy-compliant NRR 108%.**

Gross revenue retention is a **separate** diagnostic, not the same tell. Reported
GRR is 96%; policy-compliant GRR is 84%. Both are inflated by the bridges,
because the dashboard preserves the ARR in each. What GRR shows independently is
that expansion is masking a real retention problem even before the bridges are
corrected. A player who reaches for GRR expecting it to expose the bridges is
half right and should be told why.

### Why the attribution change matters to the decision

The board's threshold for paid acquisition is an 18-month CAC payback.

| | Paid new ARR | Payback | Verdict |
|---|---|---|---|
| Corven counted as paid | $1.95M | 11.0 months | passes |
| Corven correctly partner-sourced | $1.11M | 19.4 months | fails |

Paid spend $1.40M, gross margin 78%. **The reclassification is the only reason
the six million looks justified.** Without it the board is moving budget out of
the channel that works and into the one that does not.

## The room

### Elena Ruiz, CFO
**Wants** the debt draw closed without a formal restatement.
**Flaw** treats reconcilable-later as true-now; retreats into definitions.
**Habit** *"Take me from logo to cash."* Writes her preferred number in the
margin before you finish.
**Personal** she approved the bridge amendments and the classification.

### Ravi Sethi, founder and CPO
**Wants** the quarter blamed on lead quality; the migration left in production.
**Flaw** demands cohort rigour of others, cherry-picks his own.
**Habit** *"Show me the cohort, not the average."* Peels the label off his water
bottle.
**Personal** he overrode the staged rollout in writing.

### Camille Ward, independent director, ex-growth operator
**Wants** budget into paid; the attribution model unexamined.
**Flaw** fills uncertainty with benchmarks from companies that are not this one.
**Habit** interrupts with *"At what scale?"*, taps her pen three times.
**Personal** her former deputy runs the agency. She sponsored the contract. This
is the seat that states a fabricated benchmark as fact.

### Adrian Cole, CEO and chair
**Wants** unanimous approval and a compliant CMO.
**Flaw** uses warmth as coercion; arranges for others to say the false thing.
**Habit** *"Help me tell the simple story."* Straightens the place cards.
**Personal** the management certificate, and his voting control.

### Post-revelation tactics

Behaviour changes with story state. This is scripted, not an expression swap.

| When | Change |
|---|---|
| `nrr_restated_case_made` | Elena stops defending the headline and attacks the migration evidence instead. Adrian immediately proposes the classification was an operational error at Priya's level. |
| `migration_identified` | Ravi drops lead quality and argues the activation definition changed mid-quarter. If that fails he offers up Elena's bridge approvals to protect the rollout. |
| `attribution_case_made` | Camille reframes sourced as influenced. She recuses only if the contract and the user audit are connected in one case. |
| `priya_named` | Adrian withdraws the public offer and makes a private one, conditional on calling the error immaterial until the draw closes. |
| player certified early | Elena quotes the player's own endorsement back at them on any later reversal. |

## Records

Raw. None is named after its conclusion. Obtained by request unless marked.

| # | Record | How obtained |
|---|---|---|
| R1 | Board deck slide 17 | held |
| R2 | Mara's message | held |
| R3 | Retention roll-forward, opening cohort, account level: opening ARR, expansion, contraction, ending ARR, status | Priya, named or anonymous |
| R4 | ARR recognition policy, clause 4.2 | request |
| R5 | Contract amendment log, Q3: type, effective date, consideration | request |
| R6 | Renewal bookings register: executed paid order forms, Q3 | request |
| R7 | Workflow completion by weekly cohort, segmented by acquisition source, with migration-exposure flag | request, after a product hypothesis |
| R8 | Release ticket LTC-2291 with review comments | request, after R7 |
| R9 | CRM field history, OPP-4471 (Corven) | request |
| R10 | Attribution policy and agency statement of work, pages 1 and 4 | request, after R9 |
| R11 | Management certificate, growth-debt draw, schedule 2 | request, after the NRR case lands |
| R12 | Collections ageing report | request — returns nothing, costs a request |

## The three cases, and their required warrants

A case advances only with all three parts. The facilitator answer key is exact.

### Case A — ending ARR includes unrenewed contracts

**Claim** Reported NRR overstates retention because ending ARR includes accounts
with no executed paid renewal.
**Records** R3 with R4, R5 and R6.
**Warrant, required elements**
- The 31 accounts are in the **opening cohort**, so they bear on Q3 NRR.
- Their paid terms **expired within Q3**.
- The amendments carry **no consideration**, so under policy 4.2 the ARR is not
  recognisable.
- The dashboard retains it because it keys on **status, not on an executed order
  form**.
- **Corrected ending ARR $10.8M, NRR 108%, not 120%.**

**Refused if** the player offers cash-versus-ARR as the contradiction. Elena is
correct that cash and ARR diverge for ordinary reasons, and the facilitator says
so. This is the trap for the player who half-knows the metric.

### Case B — the collapse is the migration, not the leads

**Claim** Retention fell because of the migration, not lead quality, so more
acquisition spend does not address it.
**Records** R7 with R8.
**Warrant, required elements**
- Activation event and **fixed observation window** named.
- **Only matured cohorts** compared, so the drop is not right-censoring.
- The fall holds **within each acquisition source**, which rules out mix.
- The **unmigrated holdout stays at 67%**, which is the controlled comparison.
- The exposed accounts are the same accounts as in Case A.

**Refused if** the player argues only that activation sits upstream of retention.
True and insufficient: low-intent leads also produce low activation. Without the
holdout it is correlation.

### Case C — sourced is not influenced

**Claim** Paid CAC payback passes only because a partner-sourced deal was
reclassified after close.
**Records** R9 with R10.
**Warrant, required elements**
- `original_opportunity_source` is frozen at creation; `campaign_influence` is
  not the same field and is not interchangeable.
- The agency's window is **impression-through on display**, which supports an
  influence claim and not a source claim.
- The change is **post-close**, by bulk update.
- **Payback moves from 11.0 to 19.4 months, through the 18-month threshold.**

**Refused if** the player only shows the field changed. That proves someone
edited a record, not that the metric is wrong.

## The run

Twelve exchanges. Complete script: every question, the card in play, the
expected answer, press targets and responses, and what a case here requires.
Short meeting is exchanges 1-6 and the vote.

**Credibility** starts at 5. Refused case 0. Wrong claim −1. Accepting a false
figure when the records to refute it are in hand −2. At 0 the chair moves on and
the player watches the rest.

---

**1. Adrian opens.** *"Help me tell the simple story. Best quarter we have had.
Where did it come from?"*
Card `net-revenue-retention` / application. No case available.
*Adrian offers the CMO seat here, warmly, before anything is known.*

**2. Elena.** *"Take me from logo to cash. One hundred and twenty percent net
revenue retention. What is that number counting?"*
Card `net-revenue-retention` / definition. Expected: opening cohort, expansion
less contraction and churn, new logos excluded.
**Press** *"On what basis, executed contract or recognised revenue?"* → *"Active
contract status. As every quarter."*
Case A refused here: no records yet.

**3. Elena.** *"And gross revenue retention, since you will ask."* States 96%.
Card `gross-revenue-retention` / definition.
**Request** R3 is the productive move.
*A player who claims GRR exposes the bridges is corrected: both metrics are
inflated. GRR at 96% against expansion-driven NRR at 120% is its own signal.*

**4. Ravi.** *"Show me the cohort, not the average. Churn was concentrated where?"*
Card `customer-churn-rate` / traps. Expected: mix effects, tenure.
**Request** R4, R5 or R6 all productive. R12 is not.

**5. Elena, defensive.** *"Thirty-one accounts is not a story. They have not
lapsed."*
**Case A lands here** if the warrant is complete. Sets `nrr_restated_case_made`.
If it does not land, Adrian closes the topic and the meeting proceeds on 120%.

**6. Adrian, if Case A landed.** *"Then we have an operational error. Who owns
the dashboard?"*
**The invitation to blame Priya.** Accepting sets `priya_blamed`. Refusing costs
nothing here and costs everything later.
*Short meeting ends after this on the vote.*

---

**7. Ravi.** *"Retention is a marketing problem. You bought weaker leads."*
Card `activation-rate` / definition.
**Request** R7 is the only productive move.

**8. Ravi.** *"Completion fell in every recent cohort. That is intake quality."*
**Press** *"Was any population excluded from the migration?"* → the holdout.
Without the press, R7 arrives without the holdout column and Case B cannot close.

**9. Case B lands here** with R7 and R8. Sets `migration_identified`.
If `nrr_restated_case_made` is already set, Ravi offers Elena up.

**10. Camille.** *"At what scale? Paid sourced the largest deal of the quarter.
Payback is eleven months against an eighteen-month bar."*
Card `cac-payback-period` / formula. **She also states a fabricated benchmark
here**, in character, as a real director would.
**Request** R9.

**11. Camille.** *"The model is the model. It has been consistent all year."*
**Case C lands** with R9 and R10. Sets `attribution_case_made`.

**12. Adrian, cornered.** *"Help me tell the simple story."* Straightens the
place cards. Makes the private offer: CMO with real authority to stop the spend
and reverse the rollout, if the retention error is called immaterial until the
draw closes.
**Request** R11 is available only if Case A landed.
**The vote.**

## Story state

Decisions, not revelations.

| Flag | Set when |
|---|---|
| `nrr_restated` | Case A landed and the player pressed for restatement at the vote |
| `migration_reversed` | Case B landed and the player asked for rollback |
| `budget_outcome` | approved / deferred / redirected to partner |
| `responsibility` | none / Priya / Elena / Ravi / Adrian |
| `certificate_disclosed` | R11 obtained and raised |
| `role` | refused / accepted clean / accepted conditional |
| `priya_exposure` | named / anonymous / blamed |

## Endings

Resolved from the table, not from score.

| Condition | Ending |
|---|---|
| A and B and C landed, certificate disclosed, Priya not blamed, budget deferred | **The restatement.** The draw is pulled, the rollout reversed, Adrian loses the board. No promotion: he cannot control you. |
| A and B landed, C missed, budget approved | **Right diagnosis, wrong decision.** Rollout reversed, six million still goes to paid at a 19-month payback. |
| B landed only | **The product fix.** Migration reversed, 120% survives, the draw closes against a figure that is not real. |
| A landed, responsibility = Elena, certificate not disclosed | **The sacrifice.** Elena resigns. Adrian keeps control and owes you nothing. |
| role = accepted conditional | **The compromise.** You are CMO with real authority, and you called it immaterial. You stop the spend yourself in Q4. Whether that was worth it is left standing. |
| Nothing landed, budget approved | **The good soldier.** Full marks on every question. Six million approved. Priya dismissed within the month. Last screen is Mara's message again. |

## What changed from draft 1

Against the eight required fixes:

1. **Cash mechanism replaced** with a policy-defined ARR reconciliation. Cash is
   now a false lead that Elena correctly defeats.
2. **Accounts made temporally eligible**: opening-cohort members whose annual
   terms expired within Q3, not new Q3 logos.
3. **Exhibit matching replaced** by claim plus records plus warrant, with exact
   refusal conditions and a required computed figure.
4. **Controlled activation evidence** added: unmigrated holdout, source
   stratification, matured cohorts only, named window.
5. **Sourced separated from influenced**, with a realistic post-close bulk update
   and a governance breach rather than a vague overwrite.
6. **Evidence unlocked by request**, driven by hypothesis, with a dead-end record
   that costs a request.
7. **Complete twelve-exchange run**, post-revelation tactics table, decision-based
   flags, ending resolver.
8. Blind expert-versus-novice protocol below.

Not fixed, and known: Priya still has no scene of her own. Her only agency is the
named-or-anonymous choice at the open. If the playtest says the player does not
care about her, that choice is not enough.

## Playtest protocol

Two groups, same materials, no act labels and no list of available cases.

**Experts** should be able to state a hypothesis, request the right records,
supply the warrant, and compute 108%.
**Novices** should not be able to advance by matching document titles to whoever
is speaking.

Record for each player: did they form a hypothesis before being told one; did
they spend a request on a dead end; did they attempt Case A with the cash
argument; did they find the holdout without the press; could they state the
corrected NRR.

**The kill condition is unchanged.** If novices clear the cases at anything near
the expert rate, the central claim is false and this direction should be dropped
rather than coded.
