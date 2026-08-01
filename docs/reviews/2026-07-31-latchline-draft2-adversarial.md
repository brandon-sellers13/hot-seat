# Adversarial review 3 — Latchline draft 2

`gpt-5.6-sol` at high effort, 2026-07-31. Third pass, given both prior reviews.

**Verdict: FIX AGAIN.** Eight more fixes. Notably it found the request economy
is impossible as written (three requests against a path needing seven or eight),
that the records are curated answer packets rather than raw data, and that free
refusals turn the warrant check into an oracle a novice can farm.

---

# 1. Are the eight fixes actually done?

| Fix | Judgment | What remains wrong | Concrete alternative |
|---|---|---|---|
| 1. Replace cash/free-extension mechanism with policy-defined ARR reconciliation | **Substantive but incomplete** | The arithmetic model has been replaced, but the evidence cannot prove all of its required facts. R3 has no paid-term expiration date, and R4–R6 do not prove the dashboard’s implementation logic. “ARR recognition policy” also confuses a non-GAAP operating metric with revenue recognition. | Rename it **ARR measurement policy**. Add contract-term dates and quarter-end as-of fields to the account ledger, plus the dashboard query or semantic-layer definition showing `status = active AND current_arr IS NOT NULL`. State that the policy applies specifically to expired fixed-term contracts awaiting renewal. |
| 2. Make accounts temporally eligible for NRR | **Real** | The 31 accounts are now opening-cohort accounts with Q3 expirations. The remaining defect is evidentiary: none of the listed records necessarily proves those expiration dates. | Put `paid_term_end_date`, opening-cohort membership, bridge start date, and bridge end date in the account-level renewal ledger. |
| 3. Replace exhibit matching with claim + records + warrant | **Mostly cosmetic in its current play loop** | The rubric requires warrants, but the records are pre-shaped around the answer and the dialogue tells the player which metric to invoke. Failed incomplete cases are free, creating an unlimited checklist oracle. The case also lacks actual exhibit contents, so the claimed refusal logic cannot be tested. | Supply full player-facing records containing irrelevant rows, new-logo rows, immature cohorts, alternate date fields, and plausible decoys. Limit each claim to one committed attempt or charge credibility for repeated incomplete attempts. Give only “case unsupported,” not a list of missing warrant elements. |
| 4. Add controlled/source-stratified activation evidence | **Partial** | “Feature-flagged holdout” does not establish random assignment, comparability, or renewal causality. The control and treatment appear to measure different events: migrated accounts must reconnect, while unmigrated accounts retain the old configuration. R7 shows completion, not that migration caused the 31 non-renewals. | Define a common outcome such as “at least one successful production workflow within 14 days of assignment.” Randomize eligible accounts before rollout, report counts and baseline balance, and show Q3 renewal outcomes among renewal-due treatment and control accounts. Alternatively narrow the claim to “the migration caused workflow completion to fall” and stop claiming it caused retention. |
| 5. Separate sourced from influenced attribution | **Substantive but incomplete** | The policy distinction is present, but R9 and R10 cannot reconstruct the CAC-payback calculation, prove the board report consumes the mutated field, or identify who requested the update. The design still overclaims that source attribution proves which channel “works.” | Add the paid-opportunity population, fully loaded acquisition-cost ledger, board-report query, pre-close source snapshot, CRM `changed_by` audit, bulk-job metadata, and change-request ticket. State only that paid fails the board’s approved source-based threshold—not that source attribution proves causal incrementality. |
| 6. Unlock evidence through hypotheses instead of act timing | **Cosmetic** | Ravi introduces the product hypothesis on exchange 7, Camille introduces the attribution issue on exchange 10, and the run proceeds there whether prior cases landed or not. R7 and R9 are still delivered because the script reached their topic. The 31 anomalous account IDs never generate the next query. | Make the player join the 31 account IDs to product telemetry. That result should reveal migration exposure; the controlled comparison should then force Ravi to retreat to source mix; the source analysis should expose Corven as the outlier; only then should R9 become discoverable. Remove the fixed Ravi and Camille topic entrances. |
| 7. Script a complete run with state-dependent behavior and ending resolver | **Not done** | This is an outline of twelve beats, not a complete playable script. Most record contents, valid request phrasings, vague-request outputs, wrong-case responses, branch dialogue, vote rules, and ending states are absent. The ending table has overlaps and uncovered reachable states. | Write every player-facing record, every accepted request family, every response, and a priority-ordered resolver covering all reachable combinations. Script actual replacement exchanges for Elena, Ravi, Camille, and Adrian instead of describing their tactics in a table. |
| 8. Blind-test experts against novices | **Not done** | A protocol is not a blind test. No results exist, and the current materials are not paper-playable enough to run one. | Complete the exhibits and facilitator rules, then run the test and report completion rate, request path, invalid-case rate, warrant accuracy, time to case, and novice-versus-expert separation. Do not represent this fix as complete until those results exist. |

# 2. Is the finance now sound?

## Reconciliation arithmetic

The arithmetic itself ties:

- Reported ending cohort ARR:  
  \(10.0 + 2.4 - 0.4 = 12.0\)
- Reported NRR:  
  \(12.0 / 10.0 = 120\%\)
- Correct ending cohort ARR:  
  \(12.0 - 1.2 = 10.8\)
- Correct NRR:  
  \(10.8 / 10.0 = 108\%\)
- Reported GRR:  
  \((10.0 - 0.4) / 10.0 = 96\%\)
- Correct GRR:  
  \((10.0 - 0.4 - 1.2) / 10.0 = 84\%\)

That only survives FP&A review if the $2.4 million is expansion from the opening cohort rather than expansion plus new-logo ARR. The draft never states that explicitly. Add `opening_cohort_expansion = $2.4M` and show new-logo ARR in a separate excluded row.

## ARR policy mechanism

“Counts only executed paid order forms” is too broad for a professional policy. It could incorrectly exclude auto-renewals, evergreen agreements, contracted uplifts, and other valid recurring commitments. Replace it with:

> For fixed-term subscriptions whose paid term has expired by the measurement date, ARR is zero unless a paid renewal or other enforceable recurring consideration is executed by that date. No-cost bridge service does not preserve ARR.

The records also cannot currently prove the case:

- R3 does not list paid-term expiration.
- R5 proves a bridge exists but not necessarily when the underlying paid term ended.
- R6 proves no booked renewal only if it is represented as a complete controlled population.
- No record proves how the dashboard selects active ARR.

Add a quarter-end renewal-substantiation table with:

- Account ID.
- Opening ARR.
- Paid-term end date.
- Renewal-due date.
- Executed renewal ID.
- Renewal consideration.
- Bridge amendment ID and consideration.
- Quarter-end service status.
- Quarter-end dashboard ARR.
- Policy-compliant ARR.

Add the dashboard logic as a separate record. Otherwise the player is being required to assert implementation behavior that the evidence does not establish.

The certificate also needs exact timing and language. “Adrian signed” and “the draw closes later” are ambiguous. Specify that the certificate has been submitted as a funding condition, funding is pending, NRR is defined by Latchline’s stated ARR policy, and a value below 115% prevents the draw. If the money has already funded, use an inaccurate representation and a defined cure/default mechanism instead of saying the draw is “pulled.”

## GRR treatment

The formulas are coherent. The interpretation is not.

A reported GRR of 96% shows 4% gross loss while expansion drives NRR to 120%; it does not establish a “real retention problem” without a target or benchmark. Replace that sentence with:

> GRR shows that the 120% headline depends on expansion despite $0.4M of reported gross loss. Correcting the bridge treatment reveals the actual severity: GRR falls to 84%.

Also stop saying a player reaching for GRR is “half right.” GRR does not independently detect the bridges; it is corrupted by the same status logic. Require the player to say exactly that.

## Activation holdout

A revenue-ops or experimentation professional would still reject the causal claim.

First, “no staged rollout” conflicts with a 12% feature-flagged holdout. A persistent control is a rollout exception. Rewrite the fact as:

> Ravi launched to 88% at once rather than using the planned gradual ramp, but Priya preserved a pre-randomized 12% control.

Second, “feature-flagged” does not mean randomized. The 12% could be low-risk customers, unsupported integrations, or accounts omitted for operational reasons. Add:

- Randomization unit.
- Eligibility criteria.
- Assignment date.
- Treatment/control counts.
- Baseline completion and renewal propensity.
- Exclusions.
- Intention-to-treat result.

Third, the outcome is not comparable. Treatment accounts must reconnect; controls do not. Replace “migration completion” with a common business outcome measurable in both groups, such as successful production workflow execution within 14 days.

Fourth, R7 does not establish that migration caused non-renewal. It establishes a completion difference. Add renewal outcomes for all Q3 renewal-due treatment and control accounts, with the outcome window ending before each renewal decision. If sample size is inadequate, narrow Case B:

> The migration caused workflow continuity to collapse, and the 31 non-renewing accounts were exposed non-completers. The evidence supports the migration as a material retention risk, not a fully identified causal estimate of churn.

Fifth, “the exposed accounts are the same accounts as Case A” is false. Almost every account was exposed; only 31 are the disputed non-renewers. Replace the warrant with:

> The 31 Case A accounts are identifiable in R7, were assigned to treatment, failed the common workflow outcome, and were renewal-eligible only after the observation window closed.

R7 must therefore be account-level or accompanied by an account-level join. A weekly aggregate cannot establish that identity.

## Attribution and CAC payback

The stated payback calculations are arithmetically correct:

- With Corven:  
  \(1.40 / (1.95 \times 0.78 / 12) = 11.03\) months.
- Without Corven:  
  \(1.40 / (1.11 \times 0.78 / 12) = 19.41\) months.

The term **CAC payback** is unsupported if $1.40 million is only paid-media spend. CAC normally includes the acquisition costs assigned under the company’s policy, potentially agency fees, people, creative, technology, and sales costs. Either provide a channel CAC policy and fully loaded cost ledger or rename the measure “gross-margin-adjusted media-spend payback.”

R9 and R10 cannot produce the corrected calculation. They do not establish:

- Total paid ARR of $1.95 million.
- Remaining paid ARR of $1.11 million.
- Cost of $1.40 million.
- Gross margin of 78%.
- Which field the board report groups by.

Add a paid-channel opportunity extract, cost ledger, margin assumption, and report lineage. R1 can contain the reported inputs, but Case C must then require R1 explicitly.

The governance breach is still missing its human chain. A field-history log may identify the integration or bulk-job user, not the requester. Add:

- Bulk-job ID and executing user.
- Change ticket.
- Requester and approver.
- Before/after report output.
- Evidence of Camille’s sponsorship and agency relationship if her recusal matters.

Do not conclude that partner “works” and paid “does not.” Source attribution is not causal incrementality. Replace that claim with:

> Under the board-approved source policy, the paid program fails the 18-month threshold, so the stated basis for reallocating the budget is unsupported.

# 3. Is the design claim now true?

No.

## Cheapest metrics-illiterate strategy

The cheapest strategy is:

1. Take Priya’s retention roll-forward because the opening explicitly says “ending ARR” and “retention roll-forward.”
2. When Elena says “active contract status,” request documents containing the obvious nouns: ARR policy, amendments, renewals.
3. Copy the opening ARR and ending ARR totals, observe that \(12/10\) produced the displayed 120%, subtract the anomalous $1.2 million, and repeat the same division.
4. When Ravi says weaker leads, request the only productive record, R7.
5. Use the scripted press question that names the missing control: “Was any population excluded from the migration?”
6. Copy “matured,” “within source,” and “holdout” from the answer-shaped chart.
7. When Camille says the largest deal was paid-sourced, request that deal’s field history.
8. Request the attribution policy that becomes available immediately afterward.
9. Copy the two field definitions and the before/after payback numbers into the case.

That strategy works if the request-budget contradiction is repaired. It requires attentive reading and arithmetic imitation, not metric competence.

The records are not raw:

- R3 is already restricted to the opening cohort.
- R7 is already segmented by precisely the two controls needed for the answer.
- R9 is already restricted to the one manipulated opportunity.
- R10 bundles the exact policy and agency pages needed.
- The board dialogue names the disputed metric immediately before each record.
- The run explicitly says which request is “the only productive move.”

Replace those answer packets with data requiring analytical choices:

- R3 should include opening customers, new logos, reactivations, and multiple date/value fields. The player must define and filter the opening cohort.
- Product telemetry should allow immature and mature windows, several event definitions, source mix, treatment assignment, and renewal eligibility. The player must request the correct denominator and observation window.
- The CRM extract should contain multiple changed fields and several large opportunities. The player must reconcile the board report to the opportunity population and isolate Corven.
- Governing policies should be retrieved independently rather than bundled with the suspicious transaction.

The free refusal rule creates an oracle. A novice can submit incomplete cases repeatedly and add whatever the facilitator indicates is missing. Replace it with one of these:

- One committed case attempt per assertion.
- A credibility cost for a second attempt.
- No element-level refusal feedback until after the vote.
- A finite “analysis time” cost for every attempted case.

The current script also supplies the hypotheses on schedule. Case A does not cause Case B, and Case B does not cause Case C. Replace exchanges 7 and 10 with discovery-triggered branches:

1. Case A yields the 31 account IDs.
2. A common-factor request over those IDs exposes migration treatment and workflow failure.
3. Ravi challenges source mix.
4. The player requests the controlled/source-stratified analysis.
5. Camille defends the budget with the paid-source report.
6. Reconciling that report to CRM history exposes Corven.

As written literally, nobody can clear the full case because the request economy is impossible. That is not resistance to pattern matching; it is a broken action budget.

# 4. What still breaks in the paper playtest?

## The request economy makes the intended win impossible

There are three requests for the meeting, but the required path needs at least:

- Case A: R4, R5, R6, and possibly R3.
- Case B: R7 and R8.
- Case C: R9 and R10.
- Certificate: R11.

That is seven or eight requests, excluding dead ends. Fix this by either granting at least eight retrieval actions or defining three larger analysis jobs whose successful results unlock supporting documents for free.

R3 is simultaneously the record taken into the room and a request at exchange 3. Choose one. The cleaner version is that R3 is the opening record, with naming affecting its admissibility rather than its availability.

## Case A cannot land at exchange 5

Even if R3 is held, the player can request at most one record at exchange 3 and one at exchange 4 before Case A must land. The case requires R4, R5, and R6. Move the confrontation later or let one precise request—“substantiate quarter-end ARR for renewal-due opening-cohort accounts”—return the controlled R4–R6 packet.

## Cases B and C lack legal action sequences

R8 is request-only after R7, but exchange 8 is allocated to a press and exchange 9 expects the case to land. R10 is request-only after R9, but exchange 11 expects Case C immediately. Specify whether a player can press, request, and make a case in the same exchange. A usable structure would give each board exchange an opponent statement followed by exactly one player action, then insert explicit analysis intervals for unlocked follow-ups.

## R7 contradicts itself

The record description says it contains a migration-exposure flag, but exchange 8 says the holdout is hidden unless the player presses. An exposure flag necessarily reveals unexposed accounts. Either omit that field until the press unlocks the experimental assignment table or include the holdout and make the press reveal randomization and eligibility instead.

## The exhibits do not exist

A record list is not a paper-playable evidence set. The facilitator still has to invent account rows, policy language, contract entries, release-ticket comments, CRM history, costs, and dates. Produce the actual exhibits and a calculation sheet with independently checkable totals.

## “Exact” request and refusal rules are not exact

There is no list of accepted request phrasings, no definition of “vague,” no output for most bad requests, and no rule for a partly correct warrant. Write facilitator mappings such as:

- Accepted request intents.
- Clarification allowed or denied.
- Record returned.
- Resource cost.
- Whether the response reveals a new query.
- Case result for every missing or contradictory element.

## The post-revelation tactics are not in the run

Elena is said to attack migration evidence, but no replacement Elena exchange exists. Ravi “offers Elena up” without dialogue or consequence. Camille’s recusal is not tracked or applied to the vote. Replace the tactics table with branch-specific exchanges and resulting state changes.

## The promotion branch contradicts itself

The player chooses whether Priya is named before entering the room. The tactics table says naming her causes Adrian to withdraw the public offer, but exchange 1 says he offers it publicly regardless. Exchange 12 then gives the private offer regardless of naming. Branch exchange 1 by `priya_named`, and condition the private offer on the actual prior interaction.

`player certified early` is listed as state, but the run contains no certification action. Add an explicit certification choice with consequences or delete the branch.

## Priya’s naming choice has no implemented mechanical effect

“Carries weight” and “easier to dismiss” never alter case acceptance, credibility, evidence requirements, or the vote. Make named evidence satisfy provenance by itself while anonymous evidence requires an independent system export; make naming her trigger retaliation risk and a later protection decision.

## The vote is undefined

The draft does not say who votes, how Camille’s recusal changes the count, how Adrian’s voting control operates, or what combination of cases changes the budget. Add a deterministic vote table with voter positions, recusal, chair control, player recommendation, and thresholds.

## The ending table is not a resolver

Reachable states without endings include:

- A and C but not B.
- B and C but not A.
- C only.
- All three with budget redirected rather than deferred.
- A with certificate disclosed but Priya blamed.
- Accepted clean.
- Responsibility assigned to Ravi or Adrian.
- Nothing landed but budget deferred for another reason.

Conditions also overlap. `role = accepted conditional` can coexist with several earlier rows, but no priority is stated. Build a priority-ordered resolver or enumerate every reachable terminal state and forbid unsupported combinations.

## The short meeting repeats the rejected mistake

Exchanges 1–6 test only retention, so they cannot test whether activation and attribution require metric knowledge. Remove the short meeting from the validation playtest. If retained as a product mode later, label it a finance-only scenario rather than evidence for the central design claim.

# 5. What is still phoning it in?

## “Records are raw”

They are curated answer packets. R3 preselects the correct cohort, R7 precomputes the correct stratification, and R9 preselects the guilty opportunity. Replace them with broader populations in which the player must choose cohort, window, denominator, join key, and field semantics.

## “Complete twelve-exchange run”

It omits actual answers, most press responses, most invalid branches, record contents, vote logic, and branch dialogue. Replace the outline with a facilitator script that can be run without invention.

## “Behaviour changes with story state. This is scripted.”

The behavior is described, not scripted. Replace every tactics-table row with exact replacement dialogue, available actions, evidence effects, and vote consequences.

## “Resolved from the table”

The table neither covers all reachable states nor defines precedence. Replace it with executable pseudocode or a complete decision table.

## “Blind expert-versus-novice protocol”

Writing a protocol does not complete the required test. Run it only after the materials are playable and report the results before coding.

## “The existing grading spine scores exactly this shape”

A generic number-source-meaning grader does not establish that it can enforce cohort membership, policy applicability, causal controls, or attribution-field semantics. Add case-specific checklist grading with accepted semantic equivalents and adversarial examples, then test false-positive and false-negative rates.

## Adrian’s responsibility

R11 proves that Adrian signed a certificate. It does not prove that he ordered the bridge treatment, directed the source overwrite, coordinated concealment, or drafted a Priya scapegoat story. Add the RevOps ticket, approval chain, update request, and draft incident statement before allowing `responsibility = Adrian` or an ending in which the board removes him for orchestration.

## Camille’s conflict

The prose says her former deputy runs the agency and she sponsored the contract, but no listed record proves either fact. Add the procurement approval, conflict disclosure, and agency ownership record, or remove the recusal mechanic.

## Priya

The draft admits she still has no scene and then leaves the prior fix undone. Give her a pre-meeting decision scene in which she explains the limits of her analysis, chooses whether to sign it, and asks for a concrete protection commitment. Make the player’s promise enforceable in the ending.

# Verdict: FIX AGAIN

Required fixes:

1. Produce the actual raw exhibits and add the missing contract dates, dashboard lineage, report lineage, cost population, and audit trail.
2. Repair the request/action economy so every case has a legal path.
3. Replace the activation evidence with a defined randomized comparison and renewal outcome, or narrow the causal claim.
4. Make discoveries generate subsequent queries instead of advancing through fixed metric episodes.
5. Add decoy rows and analytical choices so copying answer-shaped records no longer clears the warrants.
6. Implement finite case attempts and non-oracular refusal behavior.
7. Write the complete branch dialogue, vote mechanism, and exhaustive priority-ordered ending resolver.
8. Run the blind expert-versus-novice test; do not code before it separates the groups.


---
[in 9260 out 12467 reasoning 7541]
