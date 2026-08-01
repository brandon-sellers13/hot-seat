# Adversarial review 2 — the Latchline case

`gpt-5.6-sol` at high effort, 2026-07-31. Same reviewer as review 1, given its own
prior review for continuity, and asked to stress-test the central design claim,
audit the finance for "that is not how that works" errors, and give a verdict.

**Verdict: FIX FIRST.** Eight named fixes. Do not code this version.

---

# 1. It still does not contain a properly investigated secret

This is three metric-themed set-pieces arranged in a fixed sequence.

The attribution manipulation is explicitly “separate” from the activation and retention chain. Nothing discovered in the retention investigation logically leads to the CRM audit. E7 appears because the clock says Act 3 has begun. Likewise, exposing the extensions somehow produces both the annotated renewal list and the activation report, although the latter does not follow from the former.

The revelation order is authored scheduling, not investigation:

- Act 1 automatically supplies the retention evidence.
- Act 2 automatically supplies the product evidence.
- Act 3 automatically supplies the attribution evidence.
- Each specialist announces the subject against which the newly supplied exhibit should be used.

The “short meeting” makes the problem explicit. If Act 1 is supposedly complete and satisfying by itself, then the other two acts are detachable episodes, not later revelations that reinterpret the same secret.

**Concrete alternative:** Make each discovery generate the next investigative query:

1. A renewal ledger identifies the 31 anomalous accounts.
2. The player requests a common-factor analysis on those account IDs.
3. That analysis shows they all encountered the new flow.
4. A source-stratified or controlled comparison disproves lead mix as the cause.
5. That forces the board to defend its proposed acquisition spend using its attribution report.
6. Reconciling “sourced” and “influenced” pipeline reveals the post-close mutation.
7. The mutation’s user audit leads to Adrian’s instruction and the financing condition.

Do not deliver E5 because Act 2 started. Deliver it only because the player formed and tested the product hypothesis.

## The opening gives away the only hypothesis

“Don’t certify the slide” plus “cash doesn’t tie to retention” does not invite hypothesis formation. It announces that retention is false. E5 is titled “Activation by weekly cohort,” E6 identifies Ravi’s release and objection, and E7 literally says the source changed after close. The player is not inferring a hidden explanation; they are waiting for each smoking gun’s matching line of dialogue.

**Concrete alternative:** Begin with anomalies that support several plausible explanations:

- A collections delay.
- A billing-system migration.
- A legitimate contract amendment.
- A cohort-maturity problem.
- A channel-mix change.
- A product regression.

Then require the player to request one of several reconciliations. A hypothesis should determine which rows, denominator, observation window, or audit trail they ask for.

## Nobody meaningfully changes behaviour

A concession is not a behavioural change. Elena says “timing difference,” Ravi defends the rollout, and Camille’s model comes under scrutiny. Their subsequent tactics are not altered by story state. Adrian offers the promotion on schedule regardless of what has been exposed.

The six flags affect endings, not the meeting. That means the characters are still mostly delivery systems for topic blocks.

**Concrete alternative:** Write an explicit post-revelation tactic table:

- If `extensions_exposed`, Elena stops defending the headline and attacks the activation evidence, while Adrian immediately attempts to assign the classification decision to Priya.
- If `activation_identified`, Ravi abandons “lead quality” and argues that the activation definition changed; if that fails, he offers Elena’s extension approvals in exchange for protecting the rollout.
- If `attribution_exposed`, Camille first reframes “sourced” as “influenced,” then recuses only if the contract and user audit are connected correctly.
- If Priya is protected, Adrian withdraws the public promotion offer and makes a private one contingent on calling the issue immaterial.
- If the player certifies early, Elena uses that endorsement against them when they later reverse position.

Those reactions need different dialogue and different available evidence, not facial-expression swaps.

# 2. The central design claim is false as implemented

A player needs no metric knowledge to solve this.

The actual contradiction mechanic checks only whether the player presents the designated exhibit:

- Retention claim → present the document saying cash does not tie.
- Lead-quality claim → present the chart with a collapse and the release note.
- Paid-source claim → present the audit log showing the field changed.

The player is not required to explain an NRR cohort, calculate a numerator, define activation, control for source mix, distinguish sourced from influenced pipeline, or explain a view-through window. The case notes assert that this knowledge is required, but the rules do not require it.

The sample exchange proves the problem. A player can answer the NRR definition incorrectly and still present E3. Nothing says the contradiction fails without a correct metric warrant.

Conversely, the design deliberately allows a player to answer every metric question correctly and lose by not presenting anything. That establishes that metric recall and investigation are mechanically separable. Metric knowledge is still the oral exam; document matching is the investigation.

## Brute force is trivial

In Act 1, E3 is effectively the only actionable exhibit. In later acts, documents arrive immediately before the person whose claim they contradict. Character ownership further gives away the matches: finance document for CFO, release chart for CPO, CRM audit for growth director.

The unspecified credibility penalty does not fix this. With so few exhibits and such strong staging, a novice can guess at near-perfect rates.

**Concrete alternative:** Replace `Present exhibit` with `Make a case`, containing three mandatory elements:

1. **Claim:** What assertion is false or unsupported?
2. **Evidence:** Which records establish it?
3. **Metric warrant:** How does the metric’s construction make those records contradictory?

For example:

> “Reported NRR includes $1.2 million of opening-cohort ARR whose paid terms expired before quarter-end. The dashboard preserved that ARR because the service-end field was extended, but company policy requires an executed paid order form. Correct ending ARR is $10.8 million, so NRR is 108%, not 120%.”

Presenting the ledger without identifying the opening cohort, invalid ARR, policy, and corrected result should not advance the case.

Do the same for the other metrics:

- **Activation:** The player must identify the activation event, observation window, mature cohorts, and a comparison that controls for acquisition source.
- **Attribution:** The player must distinguish original source from campaign influence, identify the applicable window, and explain why the report’s classification violates the company’s stated attribution policy.

The exhibits should be raw enough that the player has to construct the contradiction. “CRM field-history export: source changed after close” is already the conclusion.

## The required stress test

Run the prototype blind with two groups:

- People who understand these metrics professionally.
- People who do not.

Do not explain the available contradictions or tell them which metric is in each act. Record whether they can:

- State a hypothesis before seeing the answer.
- Select the necessary records.
- Supply a valid metric warrant.
- Calculate or reconstruct the disputed result.
- Reject plausible but incorrect explanations.

If novices solve by matching document titles to dialogue at anything close to the expert rate, kill this interaction model. More corpus questions will not rescue it.

# 3. The finance and analytics chain is not sound

## Free extensions do not automatically inflate NRR as described

“NRR counts contract status, not cash” is not a generally valid definition. NRR is normally based on recurring revenue from an opening customer cohort. Whether a free extension retains ARR depends on the company’s ARR policy, contract treatment, and implementation. A live service record generating no contractual recurring revenue does not automatically retain its previous ARR.

Cash receipts also should not ordinarily tie directly to ARR or NRR. Cash differs because of:

- Annual prepayment.
- Invoice timing.
- Payment terms.
- Delinquency.
- Multi-year contracts.
- Credits and refunds.
- Revenue recognition timing.

A professional player is likely to agree with Elena that E3 shows a timing difference, because that is all it shows.

Worse, the affected accounts appear to be new Q3 customers. New logos acquired during Q3 are excluded from the normal opening NRR cohort. Extending them cannot inflate Q3 NRR in the way claimed.

**Concrete alternative:** Define the fraud precisely:

- The 31 accounts are members of the quarter-opening customer cohort.
- Their paid terms expired during Q3.
- They received no-cost bridge amendments.
- Latchline’s written ARR policy excludes bridge periods without an executed paid renewal.
- RevOps changed `service_end_date` by 90 days but left `current_arr` at the prior paid amount.
- The NRR dashboard includes any account marked active and therefore preserves $1.2 million of expired ARR.

Use an actual reconciliation, not cash receipts. For example:

- Opening cohort ARR: $10.0 million.
- Expansion: +$2.4 million.
- Other contraction and churn: −$0.4 million.
- Expired bridge ARR incorrectly retained: $1.2 million.
- Reported NRR: 120%.
- Policy-compliant NRR: 108%.

The evidence should include opening-cohort membership, paid term dates, executed renewal records, bridge amendments, quarter-end ARR fields, and the metric policy.

Cash can remain the initial warning, but it cannot be the contradiction.

## GRR does not expose this mechanism

It is true that expansion cannot rescue GRR. It is false that GRR necessarily exposes these extensions. If the dashboard preserves the old ARR for the bridged accounts, both NRR and GRR are inflated.

E4 is also a logo list, while NRR and GRR are revenue-weighted. Thirty-one logos mean nothing without their ARR values.

**Concrete alternative:** Choose one of these designs:

1. Use renewal-due ARR, paid-renewal coverage, or policy-compliant ending ARR to expose the free bridges; or
2. Make GRR a separate diagnostic: genuine expansion pushes NRR to 120% while correctly calculated GRR is only 84%, showing that “retention is excellent” is misleading even before the bridge fraud is corrected.

Do not claim that GRR automatically catches records that both metrics misclassify.

## The activation chain does not establish causality

“Activation sits upstream of retention” does not disprove lead quality. Low-intent leads can produce lower activation. A chart breaking near a release date shows correlation, not cause.

The statement that “a cohort defined after a product change cannot be compared to one defined before it” is also wrong. Pre/post cohort comparison is standard. The problem is confounding, not that the comparison is inherently invalid.

Weekly activation cohorts introduce another professional objection: later cohorts may not have completed the activation window. A drop can be caused by right-censoring.

There is also a timing mismatch. If these are annual B2B contracts, customers acquired after a week-two Q3 release are unlikely to renew and receive 90-day extensions within the same quarter. If they are new Q3 customers, they are not in the opening NRR cohort anyway.

**Concrete alternative:** Specify all of the following:

- Activation event, such as connecting a production data source and completing the first successful workflow.
- Fixed observation window, such as 14 days.
- Only fully matured cohorts.
- Stable source segmentation.
- A feature-flag holdout or staggered rollout.
- The affected accounts’ membership in the opening NRR cohort.

A defensible exhibit would show that activation fell from 68% to 31% within each major source among exposed accounts, while an unexposed holdout remained near 67%. If existing customers were forced through a migration, call out how “activation” applies to that migration and why those customers were eligible to churn during Q3.

Without that, Ravi’s lead-quality explanation remains viable.

## The attribution mechanism mixes incompatible concepts

A 30-day view-through window does not generally mean that a CRM opportunity source should be overwritten after close. View-through attribution usually assigns influence based on an ad impression before a conversion. It is not a universal rule for primary opportunity source.

“Source is assigned at creation, not at close” is also company policy, not general metric knowledge. Different businesses use first touch, last touch, lead source, opportunity source, campaign influence, or algorithmic models. Post-close recomputation may be legitimate under some models.

“Paid search” is an especially poor match for a view-through scheme; search attribution is normally click-oriented. Display, video, or paid social would be more plausible.

E7 already proves suspicious human intervention without requiring knowledge of view-through attribution. E8 proves a conflict, but not that Camille ordered or knew about the overwrite.

**Concrete alternative:** Define and separate the fields:

- `original_opportunity_source`, frozen at opportunity creation.
- `campaign_influence`, allowed to update through close.
- An agency report using a 30-day impression-through window.
- A frozen pre-close snapshot identifying the deal as partner-sourced.
- A post-close bulk update that improperly copies “influenced by paid display” into the primary-source field.
- A user audit identifying who ran the update.
- A message or ticket showing who requested it.

Then the metric problem becomes meaningful: the player must know that influenced revenue and sourced pipeline are not interchangeable.

## Adrian’s involvement cannot be proven

The case says Adrian promised 120% NRR and plans to scapegoat Priya, but there is no exhibit for the side letter, his instruction, or a coordinated cover-up. The “sacrifice” ending refers to failing to trace the instruction to Adrian even though no trace can be found in the evidence set.

**Concrete alternative:** Add a final evidentiary layer reached only after the metric manipulations are established:

- The side letter or management certificate.
- Elena’s approval trail.
- The RevOps update ticket.
- Adrian’s instruction to preserve the board metric or classification.
- The draft statement blaming Priya.

If this is venture financing, specify the consequence realistically. A growth-debt draw, tranched financing condition, or management representation tied to NRR is more credible than a vague term sheet that somehow determines voting control.

## The business diagnosis is internally muddy

The board believes lead quality is poor, while Camille claims paid acquisition is carrying pipeline and therefore deserves more money. Those claims can coexist, but the case never states how. Changing the largest deal’s source does not alter total bookings or whether the company reached 101% of target; it changes channel economics.

**Concrete alternative:** Define the targets and diagnosis precisely:

- The company reached 101% of net-new ARR target.
- Partner pipeline allegedly weakened.
- Paid media allegedly has acceptable CAC payback because the largest deal was reclassified.
- The proposed $6 million shifts budget from partner to paid acquisition.
- Correct attribution makes paid CAC payback unacceptable.

That connects the overwrite to the board decision.

# 4. Where it is still phoning it in

## A. This is not actually a complete paper-playable case

There is one written exchange, not the requested complete run. There are no exact questions for the remaining nineteen exchanges, no press responses, no wrong-presentation branches, no credibility thresholds, no facilitator rules, and no defined opening exhibits besides E3.

The facilitator would have to invent most of the game. That invalidates the playtest because the facilitator, not the case, supplies pacing and reactivity.

**Concrete alternative:** Write one fixed 10–12 exchange run containing:

- Every board question.
- The expected metric warrants.
- Every available press target and response.
- Every valid and invalid evidence combination.
- State-dependent replacement dialogue.
- Exact evidence-delivery rules.
- A deterministic vote and ending resolver.

Do not test a short version first. It cannot test activation or attribution and therefore cannot test the stated design claim.

## B. The endings are not implemented by the flags

Six booleans create 64 possible states, but only four endings are described. Several described outcomes are not derivable:

- Adrian offers the promotion early, but the corrected ending says he does not offer it.
- There is no exact moment for accepting the promotion.
- There is no scripted invitation to blame Priya.
- There is no route to tracing Adrian’s instruction.
- Attribution may be exposed without affecting any listed ending.
- The board’s budget vote is not itself tracked.

**Concrete alternative:** Track actual decisions rather than abstract revelations:

- Was NRR restated?
- Was the acquisition budget approved, deferred, or redirected?
- Was the rollout reversed?
- Who was assigned responsibility?
- Was the financing representation disclosed?
- Did the player accept the role, and on what conditions?

Define an ending-resolution table for every reachable state. Remove unreachable combinations.

## C. Priya and the promotion are still props

Priya supplies evidence and later becomes a threatened victim. The player has no substantive interaction with her, no reason to feel responsible beyond “you hired her,” and no cost attached to protecting her.

The promotion is also an obvious villain trap. No rational player has been given a reason to accept it except wanting the nominal good ending from the old oral-exam structure.

**Concrete alternative:** Give both choices real trade-offs. For example:

- Priya will release her signed analysis only if the player decides whether to expose her identity or present it anonymously, changing its evidentiary strength and her personal risk.
- Adrian offers the CMO role with actual authority to stop the spend and reverse the rollout, but only if the player calls the retention error immaterial until financing closes.
- Accepting can protect employees and gain control while implicating the player; refusing preserves integrity while leaving Adrian able to appoint someone compliant.

Then acceptance is a compromised decision rather than pressing the visibly evil button.

# 5. Most likely paper-playtest failure

The first contradiction will break the session.

A domain expert will say:

> “Cash not tying to ARR is normal. Show me the opening cohort, contract amendments, renewal bookings, ARR policy, and quarter-end recurring-value fields.”

The prototype has none of that. Elena’s scripted concession to “31 extensions” will feel like the facilitator forcing an invalid inference. If the facilitator refuses to force it, E4 never appears and the authored sequence stalls.

A novice will have the opposite experience. They will present the only finance-looking document when the CFO discusses retention, the release chart when Ravi blames leads, and the CRM audit when Camille claims paid sourced the deal. They can clear the case without constructing any metric.

That is the worst possible test result: professionals reject the logic while novices solve the mystery by genre convention.

**Concrete alternative:** Repair the evidence, then test with a strict facilitator answer key that accepts only evidence-plus-warrant. Give both expert and novice players the same raw records and no act labels. If experts reliably construct the chain and novices cannot advance by matching document titles, the premise survives. If not, stop.

# Verdict: FIX FIRST

Do not build this version.

The required fixes are not polish:

1. Replace the invalid cash/free-extension mechanism with a policy-defined ARR and opening-cohort reconciliation.
2. Make the affected accounts temporally eligible to influence NRR.
3. Replace exhibit matching with evidence plus metric warrant and, where appropriate, calculation.
4. Add controlled or source-stratified activation evidence that actually distinguishes product failure from lead quality.
5. Separate sourced pipeline from influenced revenue and provide a realistic attribution-governance breach.
6. Make discoveries unlock subsequent evidence through player hypotheses rather than act timing.
7. Script a complete playable run with state-dependent character behaviour and a complete ending resolver.
8. Blind-test experts against novices.

As written, the central claim is false: **the fiction and exhibit labels solve the case; metric knowledge merely scores the oral-exam layer.** If that remains true after the rewrite, kill the direction rather than coding it.


---
[in 6330 out 12005 reasoning 7937]
