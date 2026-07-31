I have a solid evidence base. Writing the corpus now.

---

# B2B PIPELINE, SALES AND DEMAND GEN EFFICIENCY
## Authoritative metric corpus

**Source-quality tiering used throughout.** Because benchmark quality varies wildly in this family, every benchmark below is tagged:

- **[P] Primary** — I pulled the number from the publisher's own report or official documentation.
- **[S] Secondary** — a credible aggregator attributes it to a named primary source I could not reach directly. Treat as directionally right, not quotable to a board.
- **[W] Weak** — SEO content-marketing sites publishing "benchmarks" with no disclosed methodology. Included only where nothing better exists, and always labeled. Do not cite these externally.

**Research constraint disclosure:** the session's web-search quota was exhausted partway through, so later metrics rely more on WebFetch of known publisher URLs. Several publisher URLs returned 404 (First Page Sage report pages, Gong Labs index, ICONIQ reports index, Bridge Group SDR report). Where that happened I say **NO SOURCED BENCHMARK FOUND** rather than filling the gap from memory.

**The single most important framing for this whole family:** almost every metric here is a *ratio computed on top of a CRM object model that the company itself configured*. There is no external standards body. Two companies reporting "42% win rate" may not be measuring anything comparable. Cross-company benchmarking in this family is far weaker than in consumer subscription metrics, and the benchmarks below should be used to size gaps in your own trend line, not to grade a company against peers.

---

# 1. Open Pipeline (Unweighted Pipeline)

**applies_to:** b2b

**definition:** The total dollar value of all open, not-yet-closed opportunities in the CRM at a point in time.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Point-in-time open pipeline | Σ(Amount) for all opportunities where Stage ∉ {Closed Won, Closed Lost} | The default board-deck number. Right for "how much is in play today." |
| Close-date-bounded pipeline | Σ(Amount) where Close Date falls inside the target period | The only version that legitimately pairs with a period quota. This is what coverage ratio should use. |
| Qualified pipeline | Σ(Amount) where Stage ≥ a defined qualification gate (e.g. SQO or Stage 2+) | Right when early stages are junk-heavy. Most rigorous RevOps teams use this. |
| ARR pipeline vs TCV pipeline vs bookings pipeline | Σ(annualized recurring value) vs Σ(total contract value incl. multi-year and services) | ARR basis for SaaS efficiency math; TCV basis for cash/bookings planning. Mixing them is the single most common pipeline reporting error. |
| Net-new pipeline vs total pipeline | Excludes renewal opportunities and sometimes expansion | Right for measuring demand gen. Including auto-created renewal opps inflates pipeline enormously in a large installed base. |

**Practitioner disagreement:** whether to include renewal opportunities in "pipeline" is genuinely unsettled. Companies with a large base and CRM-auto-generated renewal opps can show 3x the pipeline of a peer purely from this convention.

**inputs:** Opportunity object (Amount, Stage, Close Date, Type, Forecast Category, Record Type). Salesforce or HubSpot. Clari and BoostUp sit on top and recompute it.

**application:** Feeds coverage ratio, forecast, capacity planning, and the pipeline-gen target that demand gen is held to. Downstream of it: everything.

**benchmark:** There is no such thing as a benchmark for absolute pipeline dollars. The meaningful benchmark is coverage ratio (metric 4). **NO SOURCED BENCHMARK FOUND** for absolute pipeline, correctly so.

**traps:**
- **Amount is often blank or defaulted.** Reps who don't fill Amount get a default or a list-price estimate; pipeline is then a sum of guesses.
- **Close Date hygiene destroys it.** Reps push close dates to the end of quarter or to a far-future date to avoid manager scrutiny. Pipeline "in the quarter" is then a function of rep avoidance behavior, not buyer behavior.
- **Stale opportunities.** Deals nobody has touched in 90 days still count. See metric 33.
- **Duplicate/split opportunities** for the same buying process inflate both count and value.
- **Currency and multi-year.** A 3-year TCV deal booked as Amount makes pipeline look 3x healthier against an ARR quota.

**related:** Weighted Pipeline (2), Pipeline Coverage (4), Pipeline Created (5), Forecast Accuracy (34).

---

# 2. Weighted Pipeline (Expected-Value Pipeline)

**applies_to:** b2b

**definition:** Open pipeline with each opportunity discounted by an assumed probability of closing, so the total represents expected rather than potential revenue.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| **Stage-probability weighted (CRM default)** | Σ(Amount × Stage Probability) | The out-of-the-box calculation in both Salesforce (Expected Revenue) and HubSpot (weighted amount). Right almost never as-shipped, see traps. |
| **Rep-adjusted probability** | Σ(Amount × Rep-entered Probability), overriding stage default | Right only if you have evidence reps are calibrated. They are systematically not. |
| **Historically calibrated stage weighting** | Σ(Amount × Empirical P(win \| reached stage S)), where the probability is derived from your own closed-opportunity history | The only defensible version. Requires 12+ months of closed opportunities and enough volume per stage. |
| **Cohort-decayed weighting** | Σ(Amount × P(win \| stage S, age in stage, segment)) | Right for enterprise motions where a deal sitting 120 days in Negotiation is not the same as one that arrived yesterday. |
| **Forecast-category weighting** | Σ(Commit × w₁ + Best Case × w₂ + Pipeline × w₃) with weights set from history | Right when you trust rep/manager judgment more than stage mechanics. Common in enterprise. |
| **Coverage-implied weighting** | Weighted pipeline = Qualified pipeline × blended historical win rate | The crudest version; a single scalar instead of per-stage. Often more accurate than a badly configured stage ladder because it can't be gamed stage by stage. |

**How stage probabilities actually get set (the part that matters):**

HubSpot ships a default Sales Pipeline with these deal stages and probabilities: Appointment scheduled 20%, Qualified to buy 40%, Presentation scheduled 60%, Decision maker bought-in 80%, Contract sent 90%, Closed won 100%, Closed lost 0%. HubSpot then multiplies deal amount by stage probability to produce the weighted amount shown in board view. **[P]** — [HubSpot Knowledge Base, "Set up and manage object pipelines"](https://knowledge.hubspot.com/object-settings/set-up-and-customize-pipelines) (current documentation, retrieved July 2026).

Salesforce ships a standard Opportunity Stage picklist (Prospecting, Qualification, Needs Analysis, Value Proposition, Id. Decision Makers, Perception Analysis, Proposal/Price Quote, Negotiation/Review, Closed Won, Closed Lost), and each stage value carries a Type, a Probability (0-100%), and a Forecast Category (Pipeline / Best Case / Commit / Closed / Omitted). Expected Revenue is Amount × Probability. **[P]** — [Salesforce Ben, "Complete Guide to Salesforce Opportunity Stages"](https://www.salesforceben.com/complete-guide-tutorial-to-salesforce-opportunity-stages/); [ScienceSoft](https://www.scnsoft.com/blog/salesforce-opportunity-stages).

**I could not locate an authoritative published table of Salesforce's exact shipped default percentages** (Salesforce Help returned an unloadable page, and secondary sources show illustrative tables they explicitly disclaim as "an implementation pattern, not a Salesforce default list"). **NO AUTHORITATIVE SOURCE FOUND for the exact Salesforce default probability values.** Do not quote a number for these. What *is* documented is the critique: "Most orgs leave default probabilities untouched. Those numbers are arbitrary, Salesforce picked them to look reasonable, not to reflect your win rates" **[W]** — [Prospeo, "Salesforce Pipeline Stages"](https://prospeo.io/s/salesforce-pipeline-stages) (2026). ScienceSoft makes the same point: defaults "don't represent the level of confidence and the actual state of things in a particular company."

**So: stage probabilities are set by whoever configured the CRM.** In practice that is (a) nobody, leaving vendor defaults, (b) a RevOps analyst who picked round numbers that increase monotonically, or (c) rarely, a calibrated regression on closed-won history. Because of this, **weighted pipeline is not comparable across companies at all.** A 40% "Qualified to buy" in one HubSpot instance and a 40% "Qualification" in another Salesforce instance are unrelated quantities. Treat any cross-company weighted-pipeline comparison as meaningless.

**Why weighted pipeline is systematically optimistic in most CRMs.** Four independent mechanisms, all pushing the same direction:

1. **Defaults are set to look plausible, not to match win rates.** A vendor default ladder that runs 20/40/60/80/90 implies a blended probability across open pipeline far above any real B2B SaaS win rate. If your true opportunity win rate is 19-21% (see metric 8), a pipeline whose average stage weight is ~50% overstates expected revenue by roughly 2.5x.
2. **Probability is conditioned on stage, not on stage *and* survival.** P(win | currently in Proposal) is not the same as P(win | ever reached Proposal). The historical rate people compute is usually the second, applied as if it were the first, which double-counts deals that reached the stage and then died there.
3. **Losses are recorded late or never.** Deals that quietly die often sit open for months before someone marks Closed Lost. Open pipeline therefore contains a persistent inventory of already-dead deals carrying nonzero probability. Weighted pipeline picks up the full weight of every zombie.
4. **The weights don't sum against a denominator.** Nothing in the CRM forces Σ(probabilities) to reconcile to actual closed-won. Unlike a forecast that a human has to defend, weighted pipeline is never falsified by anyone; it's just recomputed each night.

Add a fifth in rep-adjusted variants: reps who manually set probability are optimistic and asymmetrically so, because raising probability reduces manager pressure and lowering it invites inspection.

**The judgment alternative.** Salesforce's Forecast Categories (Commit / Best Case / Pipeline / Omitted) are a judgment-based rather than probability-based mechanism, and enterprise sales orgs generally trust a manager-adjudicated Commit number over a machine-weighted pipeline number. **NO SOURCED HEAD-TO-HEAD ACCURACY STUDY FOUND** comparing the two methods; this is practitioner consensus, not published evidence, and should be labeled as such.

**inputs:** Opportunity Amount, Stage, Stage Probability field, Forecast Category, close date, and (for calibrated variants) 12+ months of closed-opportunity history. Salesforce/HubSpot for raw, Clari/BoostUp/Mediafly for recomputation.

**application:** Drives the forecast submitted to the board, drives whether sales leadership calls for more pipeline, and drives comp accrual and hiring decisions. When it's optimistic, the downstream cost is that demand gen is told to stand down at exactly the moment it should be spending.

**benchmark:** **NO SOURCED BENCHMARK FOUND**, and correctly so. There is no benchmark for weighted pipeline because it is not a comparable quantity. The only defensible internal test is: does Σ(weighted pipeline for period P, measured at start of P) approximate actual closed-won in P? Run that reconciliation for eight quarters. If weighted pipeline consistently exceeds actual, your probability ladder is miscalibrated and you can back into the multiplier.

**traps:**
- Everything in the "systematically optimistic" section above.
- **Weighted pipeline hides mix.** $10M weighted could be one $10M deal at 100% or a hundred $1M deals at 10%. The variance is completely different; the number is identical.
- **Stage inflation.** Reps advance stage to look productive. If stage advancement is a comp or activity metric, weighted pipeline inflates mechanically without any change in buyer behavior.
- **Re-weighting mid-year breaks the trend line.** Changing the probability ladder silently restates every prior period's weighted pipeline in most BI tools.
- **Using weighted pipeline in the coverage ratio numerator while using an unweighted-derived target.** See metric 4.

**related:** Open Pipeline (1), Stage Probability Calibration (3), Pipeline Coverage (4), Forecast Accuracy (34), Win Rate (8).

---

# 3. Stage Win Probability (Conversion-Calibrated)

**applies_to:** b2b

**definition:** The empirically measured probability that an opportunity which has reached a given stage will eventually be won.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Ever-reached (survivor) probability | Won opps that ever reached stage S ÷ All closed opps that ever reached stage S | The correct basis for calibrating a stage ladder. Requires stage-history tracking (Salesforce OpportunityHistory / HubSpot deal stage timestamps). |
| Currently-in-stage probability | Won opps that were in S at time T ÷ All opps that were in S at time T, cohorted forward | More accurate for real-time weighting but needs snapshotting; most orgs don't have it. |
| Stage-and-age conditioned | P(win \| stage S, days in stage bucket) | Right for long-cycle enterprise. Materially different from the flat version. |
| Segment-conditioned | P(win \| stage S, segment/ACV band/source) | Necessary whenever you sell to more than one segment; a single blended ladder is wrong for both. |

**inputs:** Opportunity stage-change history (Salesforce OpportunityFieldHistory or OpportunityHistory; HubSpot deal stage property history), close outcome, close date, segment fields. Gong and Clari both compute variants of this from the same underlying data.

**application:** The input to any honest weighted pipeline. Also the honest basis for stage-gate exit criteria: a stage whose empirical probability isn't meaningfully higher than the prior stage's is not a real stage and should be deleted.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** By construction these are company-specific. The closest thing to a benchmark is the general funnel-shape data in metric 9. What *is* worth stating: if your ladder's implied blended probability across open pipeline exceeds your actual blended win rate, the ladder is wrong by definition.

**traps:**
- **Backward stage movement is usually not recorded**, so ever-reached probabilities are computed on a forward-only path and overstate.
- **Small base.** Below roughly 30-40 closed opportunities per stage per segment, the estimate has enormous confidence intervals. A stage with 12 closed deals producing "58% win rate" has a 95% CI of roughly ±28 points. Do not build a weighted forecast on it.
- **Recency.** Probabilities calibrated on 2021 deal flow are wrong for 2025-2026 buying conditions. Ebsta x Pavilion data shows win rates moved materially year over year, so a stale ladder is stale in a known direction.
- **Reverse causality.** Deals that were always going to win pass through stages faster; conditioning on stage partly conditions on deal quality you already knew.

**related:** Weighted Pipeline (2), Stage Conversion Rate (9), Win Rate (8).

---

# 4. Pipeline Coverage Ratio

**applies_to:** b2b

**definition:** How many dollars of open pipeline exist for every dollar of the revenue target in the same period.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| **Unweighted coverage** | Open pipeline closing in period ÷ Quota for period | The standard board metric. Compare only against a target derived from your own win rate. |
| **Weighted coverage** | Weighted pipeline closing in period ÷ Quota | Should be ~1.0x if your weights are calibrated. Anything above 1.0x on a calibrated ladder means either surplus or miscalibration. |
| **Qualified coverage** | Pipeline at ≥ Stage N ÷ Quota | The most defensible unweighted version, because it strips early-stage junk. |
| **Gap-to-goal coverage** | (Quota − Closed-won-to-date − Commit) ÷ remaining pipeline | Right mid-quarter. The naive version double-counts already-closed revenue. |
| **Win-rate-implied required coverage** | Required coverage = 1 ÷ Win Rate | The correct way to *set* the target rather than importing "3x." |
| **Creation-cohort coverage** (forward-looking) | Pipeline needed = Quota ÷ (win rate) ÷ (share of pipeline created in period that closes in period) | Right for planning next quarter's pipegen when sales cycle exceeds one quarter. Most teams get this wrong by ignoring the second term. |

**inputs:** Open pipeline by close date, period quota/target, historical win rate by segment, sales cycle length. Salesforce/HubSpot plus a planning source (Anaplan, Pigment, or a spreadsheet) for quota.

**application:** The single most-used trigger for "marketing needs to generate more pipeline." Also drives sales hiring and territory decisions.

**benchmark:**

- **Most B2B teams target 3x-5x.** Clari explicitly frames 3x as "a starting point, not a standard." **[P]** — [Clari, "Pipeline Coverage Ratio: What Your Number Actually Means"](https://www.clari.com/blog/pipeline-coverage-best-practices/), article dated June 19, 2026.
- **Win-rate-derived requirements (Clari, same source):** 50% win rate → 2x; 25% win rate → 4x; 20% win rate → 5x. **[P]**
- **Enterprise motions with 15-25% win rates need 4x-7x coverage to forecast reliably.** Clari's specific warning: "Applying 3x to an enterprise motion with a 15% win rate is how teams end up missing the number by 40%." **[P]** — same source.
- **By segment (weaker sourcing):** SMB 2.5-3x, mid-market 3-4x, enterprise 4-5x. **[W]** — aggregated across vendor blogs with no disclosed methodology.
- **Marketing-specific coverage:** marketing should source 2-3x its own revenue quota in pipeline. **[S]** — [ZoomInfo, "Marketing-Sourced Pipeline"](https://pipeline.zoominfo.com/marketing/marketing-sourced-pipeline-trending-down), updated July 2, 2026.

**PLG vs sales-led:** **NO SOURCED BENCHMARK FOUND** for PLG-specific coverage ratios. This is a real gap; in a PLG motion much of the "pipeline" never appears as an opportunity, so the metric partially doesn't apply.

**traps:**
- **The 3x rule is arithmetic, not wisdom.** 3x is exactly right only at a 33% win rate. Importing it at 15% guarantees a miss. This is the most common and most expensive error in the family.
- **Numerator/denominator basis mismatch.** Weighted pipeline over quota, or TCV pipeline over an ARR quota, or all-open pipeline over a single-quarter quota. Each inflates coverage without any real improvement.
- **Coverage is a stock against a flow.** Measuring it once at quarter start is nearly useless in a long-cycle business; pipeline created *during* the quarter that closes in the quarter isn't counted. Enterprise teams should measure entering coverage and separately track in-quarter creation.
- **Coverage improves when reps push close dates forward.** Pulling deals into the quarter raises coverage without adding a dollar of demand. Always cross-check coverage against pipeline created.
- **Coverage can be gamed by lowering quota.** It's a ratio with a controllable denominator.
- **Small-base fragility:** in an enterprise motion where quota is 8 deals, coverage of "4x" can be four large deals. The distribution matters far more than the ratio. Report deal count alongside coverage always.

**related:** Open Pipeline (1), Weighted Pipeline (2), Win Rate (8), Pipeline Created (5), Sales Cycle (7).

---

# 5. Pipeline Created (Pipeline Generation, "Pipegen")

**applies_to:** b2b

**definition:** The dollar value of new opportunities created in a period, regardless of when they will close.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Gross pipeline created | Σ(Amount) of opps with Created Date in period | The standard demand gen scorecard number. |
| Net pipeline created | Gross created − Amount of opps created in period that were disqualified/closed-lost within N days | Right when opportunity creation is loosely policed. Strips the "create-and-kill" pattern. |
| Qualified pipeline created (SQO-based) | Only opps that reached the qualification gate | The version sales will accept. Removes the marketing-inflates-opp-count fight. |
| Pipeline created by source | Segmented by lead source / channel / self-sourced | The version that actually informs budget. |
| Net-new-logo pipeline created | Excludes expansion and renewal opportunity types | Necessary to hold demand gen accountable to the right thing. |

**inputs:** Opportunity Created Date, Amount, Type, Lead Source, Stage history. Salesforce/HubSpot.

**application:** The primary marketing accountability metric in most B2B SaaS orgs, and the leading indicator for coverage two to three quarters out. Feeds cost-per-pipeline-dollar (metric 18).

**benchmark:** **NO SOURCED BENCHMARK FOUND** for absolute pipeline created (it scales with company size). The usable derived target: Pipeline created per quarter should equal (next-period quota ÷ win rate) adjusted for the share of pipeline that closes outside the period, which follows from sales cycle length.

**traps:**
- **Amount at creation is a guess.** Opportunity amount entered at creation is typically anchored on list price or a rep's optimism, and is revised down later. Pipeline created is therefore reported in inflated dollars while closed-won is reported in real dollars, which makes source-level win rates look worse than they are.
- **Creation-date manipulation.** Backdating or holding deals to create them in a period where the number is short.
- **Create-and-kill.** Teams comped on pipeline created will create opportunities that die in 10 days. Always pair with a 30/60/90-day survival rate.
- **Double-counting split deals.**
- **The timing mismatch is structural.** Pipeline created this quarter mostly does not close this quarter in mid-market and enterprise. Reporting them side by side in the same board slide invites the wrong conclusion.

**related:** Pipeline Coverage (4), Marketing-Sourced Pipeline (15), Cost per Pipeline Dollar (18), Lead-to-Opportunity (13).

---

# 6. Pipeline Velocity (Sales Velocity)

**applies_to:** b2b (a PLG analogue exists but is rarely computed this way)

**definition:** A composite estimating how much revenue the pipeline produces per unit of time.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| **Standard four-factor** | (# Qualified Opportunities × Avg Deal Value × Win Rate) ÷ Sales Cycle Length in days | The near-universal formula. Output is dollars per day. |
| Segment-decomposed | Compute separately per segment, then sum | Mandatory if you sell SMB and enterprise; the blended version is a meaningless average of two different businesses. |
| Rep-level velocity | Same formula, rep's own inputs | Useful for coaching; extremely fragile at rep-level sample sizes. |
| Stage-level velocity | Time-in-stage × stage conversion, chained | More diagnostic; tells you *which* stage is the constraint rather than producing one number. |
| ARR-basis vs TCV-basis | Substitute ARR for deal value | Use ARR for anything feeding efficiency math. |

The formula is stated consistently across vendor sources as (Number of Opportunities × Average Deal Size × Win Rate) ÷ Sales Cycle Length. **[W]** — [Outreach](https://www.outreach.ai/resources/blog/pipeline-velocity), [Factors.ai](https://www.factors.ai/blog/pipeline-velocity), and others. **NO AUTHORITATIVE ORIGIN FOUND** for who first published it; it is folk-standard rather than a cited framework.

**inputs:** Opportunity count, average deal size, win rate, sales cycle days, all from the same period and the same population. Salesforce/HubSpot; Clari and Gong compute it natively.

**application:** Diagnostic, not a target. Its value is decomposition: it tells you whether a revenue shortfall is a volume, size, conversion, or speed problem.

**benchmark:** **NO CREDIBLE SOURCED BENCHMARK FOUND.** I found industry "daily revenue" velocity figures (e.g. SaaS & Technology $1,847/day) circulating on aggregator sites **[W]**, but they have no disclosed methodology and are not comparable across company sizes, since velocity scales with headcount. Velocity should only ever be benchmarked against your own prior periods.

**traps:**
- **The four inputs are not independent.** Pushing for larger deals lengthens cycle and lowers win rate. Tightening qualification raises win rate and cuts opportunity count. The formula silently assumes you can move one factor without moving the others, which is false.
- **You can "improve" velocity by getting worse.** Disqualifying hard raises win rate and drops opportunity count; the product can rise while total revenue falls.
- **Denominator/numerator population mismatch.** Win rate computed on closed deals, opportunity count on open deals, deal size on won deals only. Three different populations in one formula.
- **Sales cycle length in the denominator is a mean and is right-skewed.** See metric 7. A few long enterprise deals drag the mean and depress velocity artificially.
- **Blending segments** produces a number that describes no actual business.

**related:** Win Rate (8), Sales Cycle (7), Average Deal Size (10), Opportunity Count (12).

---

# 7. Sales Cycle Length

**applies_to:** b2b

**definition:** The elapsed time from a defined pipeline start event to the deal closing.

**formula_variants:**

| Variant | Clock starts at | When it's right |
|---|---|---|
| **Opportunity-created to closed-won** | Opportunity Created Date | The most common. Right for sales-team accountability. Excludes all marketing-side time. |
| **Lead-created to closed-won** | Lead/Contact creation | The full go-to-market cycle. Much longer. Right for marketing planning and payback math. |
| **First-meeting to closed-won** | First meeting held | Right for AE productivity; strips SDR and marketing latency. |
| **SQL/SQO to closed-won** | Qualification gate reached | The cleanest comparable across companies, and still not truly comparable because gates differ. |
| **Won-only vs all-closed** | Restrict to Closed Won, or include Closed Lost | Won-only is standard but understates: losses often take longer than wins (deals die slowly). Including losses gives "time to resolution," which is the right input for capacity planning. |
| **Median vs mean** | — | See below. This is the trap. |

**Median vs mean.** Sales cycle distributions are right-skewed: a floor near zero, a long tail of deals that take a year. The mean is pulled upward by the tail; the median describes the typical deal. **Report both, always.** Use median for "how long does a deal take," and mean when the number feeds a division (like pipeline velocity) where total time actually matters. A team whose mean is 120 days and median is 62 days has two businesses inside it, and reporting either number alone conceals that.

**inputs:** Opportunity Created Date, Close Date, stage timestamps, lead created date, first meeting date. Salesforce/HubSpot; Gong and Clari compute stage-level durations.

**application:** Sets coverage lead time (how far ahead demand gen must generate), sets CAC payback expectations, and is the denominator of pipeline velocity.

**benchmark:**

- **Average B2B sales cycle 6.5 months, up from 4.9 months in 2019; 38% longer than 2021; 16% longer in H1 2023 vs prior year.** **[S]** — Ebsta B2B Sales Benchmarks 2024, as reported by [Gradient Works, "2025 B2B sales performance benchmarks"](https://www.gradient.works/blog/2025-b2b-sales-performance-benchmarks).
- **By ACV (Norwest, 2024):** deals under $25K ACV close in ~90 days; deals over $100K take 6-9+ months. **[S]** — same aggregator.
- **By segment (B2B SaaS):** SMB (<$15K ACV) 14-30 days; mid-market ($15K-$100K) 30-90 days; enterprise (>$100K) 90-180+ days. **[S]** — Gradient Works aggregation, 2025.
- **Alternative segment cut:** SMB 30-90 days (median 40), mid-market 60-120 days, enterprise 170+ days; overall B2B SaaS average 84 days. **[W]** — [The Digital Bloom, 2025 B2B SaaS Funnel Benchmarks](https://thedigitalbloom.com/learn/pipeline-performance-benchmarks-2025/), citing Monetizely.
- **Speed correlates with winning:** deals closed within 50 days win at roughly 47%, versus roughly 20% for deals that stretch beyond. Delayed deals reduce win rates by 113%. **[S]** — Ebsta x Pavilion 2025 GTM Benchmarks, via Gradient Works.

Note the two segment tables above disagree materially at the SMB end (14-30 days vs 30-90 days). That disagreement is real and reflects definitional differences in where the clock starts. Use it as a reason to define your own clock explicitly rather than to pick a number.

**PLG:** **NO SOURCED BENCHMARK FOUND** for sales-assisted PLG cycle length specifically.

**traps:**
- **The clock start is undefined industry-wide.** This is the single biggest reason cross-company sales cycle comparisons fail. Always state the start event.
- **Won-only measurement understates.** Excluding losses removes the slowest deals, since losses often linger.
- **Survivorship in the denominator of velocity.** Deals still open aren't counted, so a period where long deals haven't closed yet reports an artificially short cycle.
- **Mean vs median (above).**
- **Backdated close dates.** A deal marked closed on the day the contract was countersigned versus the day the verbal came in can differ by weeks.
- **Cohort vs period.** Averaging cycle length of deals *closed* in Q3 mixes deals created across many quarters and lags real changes badly. Cohort by creation date to see actual movement.

**related:** Pipeline Velocity (6), Pipeline Coverage (4), CAC Payback (cross-family), Deal Slippage (33).

---

# 8. Win Rate

**applies_to:** b2b

**definition:** The share of opportunities that end in a closed-won outcome.

**This metric has at least five distinct denominators in common use, and the reported number moves enormously between them.** Worked example, one company, one quarter, same underlying reality:

Assume: 1,000 opportunities created in the quarter; 400 opportunities closed in the quarter (from all creation cohorts); of those closed, 100 won and 300 lost; 250 of the 1,000 created ever reached "Proposal"; of the 1,000 created, at the time of measurement 100 won, 300 lost, 600 still open.

| # | Denominator | Formula | Reported win rate |
|---|---|---|---|
| 1 | **All opportunities created in period** | Won ÷ All created | 100 ÷ 1,000 = **10%** |
| 2 | **Opportunities closed in period** | Won ÷ (Won + Lost) closed in period | 100 ÷ 400 = **25%** |
| 3 | **Qualified opportunities only** | Won ÷ Closed opps that passed the qualification gate | if 300 of the 400 closed were qualified: 100 ÷ 300 = **33%** |
| 4 | **Opportunities that reached stage N** | Won ÷ Closed opps that ever reached Proposal | if 200 of 250 have closed: 100 ÷ 200 = **50%** |
| 5 | **Creation cohort (fully matured)** | Won ÷ All opps created in period, measured only after all have resolved | 100 ÷ (1,000 − still open at maturity); if all 1,000 eventually resolve to 220 won: **22%** |

**Same company. 10%, 25%, 33%, 50%, 22%.** A 5x spread. This is why "our win rate is X" is close to information-free without the denominator stated.

**formula_variants (which to use when):**

| Variant | Use when |
|---|---|
| Closed-in-period (#2) | The default operating metric. Fast to compute, but contaminated by which cohorts happen to be resolving. |
| Creation-cohort (#5) | The only version that cleanly attributes performance to a period's demand. Mandatory for comparing channels or campaigns. Requires waiting one full sales cycle plus a tail, so it's always lagging. |
| Qualified-only (#3) | The right AE-accountability version, because it excludes deals the AE never should have received. |
| Stage-conditional (#4) | Diagnostic. "Post-proposal win rate" is the common one. |
| Created-basis (#1) | Rarely correct as a headline; useful only as a top-of-funnel efficiency signal, and only if compared like-for-like. |
| **Value-weighted vs count-based** | Won $ ÷ Closed $ vs Won count ÷ Closed count. These diverge sharply when deal sizes are heterogeneous. A team can win 40% of deals and 15% of dollars (winning the small ones). **Report both.** |
| Logo win rate vs revenue win rate | Same distinction, framed for the board. |

**inputs:** Opportunity outcome, close date, created date, stage history, qualification flag, Amount. Salesforce/HubSpot; Clari, Gong, Ebsta.

**application:** Sets required pipeline coverage (1 ÷ win rate), feeds pipeline velocity, drives qualification-criteria decisions and channel investment.

**benchmark:**

- **Average B2B win rate 19-21%, top performers 30%+.** Based on 655,000+ opportunities and $48B of pipeline. **[P/S]** — [Ebsta, "Ebsta Unveils 2025 GTM Benchmarks Report"](https://www.ebsta.com/news-updates/ebsta-unveils-2025-gtm-benchmarks-report/) for the sample size and directional finding; the 19-21% absolute figures via [Gradient Works](https://www.gradient.works/blog/2025-b2b-sales-performance-benchmarks) citing Ebsta x Pavilion 2025.
- **Direction of travel:** Ebsta's own release states win rates fell 10% in 2025 after falling 18% in 2024 (YoY percentage change, not absolute levels). **[P]** Derivative coverage reports this as "19%, down from 29%." **These two framings are not reconcilable as stated, and I flag the discrepancy rather than resolving it.** A 10% relative decline from 29% would be 26%, not 19%. Treat the absolute levels as approximate.
- **Post-proposal win rates 31-50%** (Norwest, 2024). **[S]** — via Gradient Works.
- **By company size:** SMB (<100 employees) 30-40%, mid-market (100-999) 25-35%, enterprise (1,000+) 20-25%. **[W]** — Development Corporate, "Win/Loss Rates for Enterprise SaaS: The 2025 Reality Check."
- **By deal size:** under $50K 35-45%; $50K-$100K 25-35%; over $100K 15-25%. **[W]** — Forecastio, via The Digital Bloom aggregation.
- **Enterprise practical range for coverage math:** Clari uses 15-25% for enterprise motions. **[P]** — [Clari](https://www.clari.com/blog/pipeline-coverage-best-practices/), 2026.
- **Multi-threading lifts win rate:** winning deals had 2x more buyer contacts than lost deals; multi-threading raised win rates 130% on deals over $50K; early decision-maker involvement raised win rate 55%. **[S]** — Ebsta x Pavilion 2025, via Gradient Works.

**PLG:** **NO SOURCED WIN-RATE BENCHMARK FOUND** for PLG motions. Structurally, PLG "win rate" is usually reframed as free-to-paid conversion and belongs in the consumer/PLG family.

**traps:**
- **The five denominators above.** Most reporting disputes in B2B RevOps trace to this.
- **Closed-lost hygiene.** Companies that don't force a Closed Lost disposition park dead deals open forever, which inflates closed-in-period win rate (denominator shrinks) while inflating open pipeline. Both errors point the same way: too optimistic.
- **"No decision" losses.** Whether a stalled/no-decision deal is Closed Lost or purged determines win rate. There is no industry convention. Competitive-loss-only win rate is much higher than all-loss win rate and is sometimes quietly substituted.
- **Value-weighted vs count.** Reporting the more flattering one.
- **Small-base fragility.** This is severe. At 40 closed opportunities a quarter, a 25% win rate has a 95% confidence interval of roughly ±13 points. At 12 closed deals (a real enterprise AE's quarter), a single deal moves win rate by 8 points. **Do not manage rep performance on quarterly win rate below ~50 closed opportunities, and do not report win-rate "trends" quarter over quarter on small bases at all.** Roll to trailing four quarters.
- **Mix shift masquerading as performance.** Win rate falling because you moved upmarket is a strategy outcome, not a sales-execution failure. Always decompose by segment before drawing a conclusion.
- **Selection into the denominator.** Tightening opportunity-creation criteria raises win rate mechanically. A rising win rate alongside falling opportunity count is usually a definitional change, not an improvement.

**related:** Close Rate (14), Stage Conversion (9), Pipeline Coverage (4), Pipeline Velocity (6), Quota Attainment (19).

---

# 9. Stage Conversion Rate

**applies_to:** b2b

**definition:** The share of opportunities in one pipeline stage that advance to the next.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Simple stage-to-stage | Opps that entered stage N+1 ÷ Opps that entered stage N | The default. Needs stage-history data, not current-stage data. |
| Cohort stage-to-stage | Same, restricted to a creation cohort, measured after maturity | The only version that isn't distorted by period timing. |
| Cumulative-to-close | Opps that closed won ÷ Opps that entered stage N | Directly usable as the calibrated stage probability (metric 3). |
| Value-weighted stage conversion | $ advanced ÷ $ entered | Reveals whether big deals stall at a particular stage. |
| Time-adjusted | Conversion within X days of entering the stage | Right for long-cycle motions where "eventually converted" hides a stall. |

**inputs:** Opportunity stage history with timestamps. Salesforce OpportunityHistory / HubSpot deal stage timestamps. Gong, Clari, Ebsta all compute this.

**application:** The diagnostic that turns "we have a pipeline problem" into "we have a proposal-stage problem." Feeds stage probability calibration and coaching priorities.

**benchmark:**

- **SQL-to-opportunity:** 42% (SMB), 36% (Enterprise). **Opportunity-to-close:** 39% (SMB), 31% (Enterprise). **Lead-to-MQL:** 41% (SMB), 39% (Enterprise). **[W]** — [The Digital Bloom](https://thedigitalbloom.com/learn/pipeline-performance-benchmarks-2025/) 2025 aggregation citing First Page Sage and Powered By Search. I could not reach the First Page Sage primary pages (404), so treat these as unverified secondhand.
- **SQL-to-opportunity conversion 30-59%** depending on source; **sales-accepted-lead to SQL 52.7%**. **[S/W]** — Gradient Works aggregation, 2025, sources listed as "various."

Beyond that, **NO SOURCED STAGE-LEVEL BENCHMARK FOUND**, and this is the correct answer: stage names and gates are company-defined, so stage conversion is structurally not benchmarkable across companies. Flag this to any client asking for one.

**traps:**
- **Stages aren't comparable across companies. At all.** A company with 4 stages and one with 9 stages will show completely different per-stage conversion for identical performance. This is the clearest "no industry consensus" case in the family.
- **Current-stage snapshots instead of stage history.** Computing conversion from a snapshot of where deals sit today undercounts everything that already passed through.
- **Skipped stages.** Reps jumping from Qualification straight to Negotiation makes intermediate stages look like they have near-zero volume and inflates the skipped-to stage's conversion.
- **Backward movement unrecorded.** Most orgs don't track regressions, so conversion is computed forward-only.
- **The conversion chain multiplied out rarely equals the actual win rate.** When it doesn't, at least one stage's data is wrong. Reconcile them; it's the fastest pipeline-data audit there is.

**related:** Stage Probability (3), Win Rate (8), Weighted Pipeline (2), Pipeline Velocity (6).

---

# 10. Average Deal Size / ASP / ACV

**applies_to:** b2b (consumer analogue is ARPU, different family)

**definition:** The typical revenue value of a closed-won deal.

**formula_variants:** These are four genuinely different quantities that get used interchangeably, which is the core problem.

| Term | Formula | What it means |
|---|---|---|
| **ACV (Annual Contract Value)** | Contract value normalized to 12 months, recurring only | The right basis for SaaS efficiency math (CAC ratio, magic number). |
| **TCV (Total Contract Value)** | Full contract value across all years, often including services and one-time fees | Right for cash/bookings planning. Inflates deal size 2-3x on multi-year contracts. |
| **ASP (Average Selling Price)** | Σ(deal value) ÷ deal count | Ambiguous by itself; must be qualified as ASP-on-ACV or ASP-on-TCV. |
| **New ACV vs total ACV** | Excludes or includes the pre-existing ARR on an expansion deal | An expansion "deal" of $50K on an account already at $200K should count as $50K new ACV. Many CRMs record $250K. |

Further legitimate variants:

| Variant | Formula | When |
|---|---|---|
| Mean deal size | Σ(Amount won) ÷ count won | Right when you need total revenue implied by a deal count. |
| **Median deal size** | 50th percentile of won deals | Right for "what does a typical deal look like." Almost always the more honest number. |
| Segment-specific ASP | Computed within a segment | Mandatory. See metric 11. |
| Blended (new + expansion) vs new-logo-only | — | New-logo-only for demand gen accountability; blended for revenue planning. |
| Won-only vs pipeline ASP | Amount on won deals vs Amount on open deals | Pipeline ASP is systematically higher, because open-deal amounts are aspirational. |

**inputs:** Opportunity Amount, contract term, Type (New/Expansion/Renewal), product line, segment. Salesforce/HubSpot; the ACV normalization usually lives in CPQ or a finance system, not the CRM, which is why CRM Amount is so often TCV.

**application:** Drives segmentation, quota setting, coverage math, comp design, and CAC ratio interpretation. ACV is the single strongest correlate of nearly every other benchmark in this family.

**benchmark:**

- **ACV drives everything else.** Benchmarkit and Pavilion state explicitly that CAC ratio, CAC payback, GRR, and NRR benchmarks should all be evaluated in the context of ACV, because ACV is the attribute most correlated with each. **[P]** — [Benchmarkit x Pavilion, 2025 B2B SaaS Performance Metrics Benchmarks](https://www.benchmarkit.ai/2025benchmarks), published May 2025, FY2024 data, n=583.
- **Private B2B SaaS median deal size $26,265;** SMB-focused $4,800-$15,000; mid-market ~$40,000; private enterprise ($10-20M ARR) $56,101; public enterprise ~$220,000. **[S]** — SaaS Capital data as reported by [The Digital Bloom](https://thedigitalbloom.com/learn/pipeline-performance-benchmarks-2025/), 2025. I could not reach the SaaS Capital primary page (404).
- **A notable non-obvious finding:** the $10K-$50K ACV range is consistently *more* expensive to acquire than the $50K-$100K range, and this is not a one-year anomaly. **[P]** — Benchmarkit x Pavilion 2025. This kills the naive assumption that CAC rises monotonically with ACV.
- **Deal sizes rose sharply in 2025:** average deal size up 54% year over year. **[P]** — [Ebsta 2025 GTM Benchmarks](https://www.ebsta.com/news-updates/ebsta-unveils-2025-gtm-benchmarks-report/).

**traps:**
- **ACV/TCV substitution.** The most common and most consequential. Check whether multi-year deals are annualized before comparing anything to a benchmark.
- **Mean on a skewed distribution.** See metric 11.
- **Won-only bias.** ASP computed on won deals only understates what you're chasing, because you lose the big ones more often.
- **Including services revenue** in a "deal size" that then feeds an ARR-based efficiency ratio.
- **Expansion deals recorded at full account value.**
- **Currency conversion at deal date vs report date.**

**related:** Deal Size Distribution (11), Pipeline Velocity (6), CAC Ratio (23), Win Rate (8), Quota (19).

---

# 11. Deal Size Distribution (and the mean-vs-median trap)

**applies_to:** b2b (the same skew logic transfers to consumer LTV, so partially consumer-relevant)

**definition:** The shape of the distribution of closed-won deal values, not just its center.

**formula_variants:**

| Variant | What it shows |
|---|---|
| Median and quartiles (P25 / P50 / P75 / P90) | The honest summary. |
| Mean ÷ median ratio | A one-number skew indicator. Above ~1.4 means the mean is being driven by a tail and should not be used alone. |
| Top-decile revenue concentration | % of closed-won dollars from the top 10% of deals. |
| Coefficient of variation | Std dev ÷ mean. Above ~1.0 means deal-count-based forecasting is unreliable. |
| Multi-modality check | Histogram or KDE by segment | Reveals whether "one business" is actually two or three. |

**inputs:** Full list of closed-won Amounts (not the aggregate), segment, product. Any CRM export; needs a BI tool or spreadsheet, since neither Salesforce nor HubSpot surfaces distribution by default.

**application:** Determines whether *any* count-based metric in this family is trustworthy. Determines segmentation. Determines whether the sales comp plan is aligned to the deals that actually produce revenue.

**benchmark:** **NO SOURCED BENCHMARK FOUND** for deal-size distribution shape in B2B SaaS. This is a genuine research gap; publishers report medians and occasionally quartiles but almost never skew or concentration. The indirect evidence that concentration is extreme: **14% of sellers drive 80% of revenue**, and the top-to-bottom quartile performance gap is 11x. **[S]** — Ebsta x Pavilion 2025 GTM Benchmarks, via Gradient Works. That is rep-level rather than deal-level concentration, but it implies deal-level skew.

**traps:**
- **The mean-vs-median trap is the core one.** In a portfolio of 100 deals at $20K and 3 deals at $2M, the mean is $77K and the median is $20K. Every downstream calculation using the mean (pipeline velocity, capacity planning, quota setting) describes a deal that does not exist. Sales capacity models built on mean deal size systematically under-hire, because most reps will never see a mean-sized deal.
- **Reporting mean because it's higher.** The mean flatters. It is chosen for that reason more often than for a statistical one.
- **One whale restates the quarter.** In an enterprise motion, a single deal can move ASP, win rate on a value basis, magic number, and CAC ratio simultaneously, all in the same direction, making a single lucky deal look like systemic improvement across five metrics.
- **Trimmed means without disclosure.** Removing "outliers" from deal size is defensible for capacity planning and indefensible when reporting revenue efficiency; the whales are real revenue.
- **Averaging across segments.** An SMB + enterprise blended ASP is nearly always bimodal and the mean sits in the empty valley between the two modes.

**related:** Average Deal Size (10), Pipeline Velocity (6), Quota Attainment (19), Win Rate (8), Small-base fragility (see metric 30 and the closing note).

---

# 12. Funnel Stage Volume (MQL, SAL, SQL, SQO, Opportunity)

**applies_to:** b2b

**definition:** Counts of records at each defined stage of the demand funnel, from marketing qualification through opportunity creation.

**FLAG: this is where the industry has the least consensus of anywhere in the family.** There is no authoritative definition of MQL, SAL, SQL, or SQO. Every company defines them locally. Two B2B SaaS companies in the same category will report MQL-to-SQL rates of 13% and 42% and both be "correct," because they are counting different objects.

**formula_variants (the definitional stack, with where each is contested):**

| Stage | Common definition | Where it's contested |
|---|---|---|
| **Inquiry / Lead** | Any known contact record created | Whether to count re-engagements of existing contacts. |
| **MQL (Marketing Qualified Lead)** | A lead meeting a marketing-owned score or behavior threshold | Entirely arbitrary. Score thresholds are set by marketing, and marketing is measured on MQL volume. Structural conflict of interest. |
| **SAL (Sales Accepted Lead)** | Sales has accepted the lead as worth working | Requires an explicit accept/reject action most orgs never implement. Frequently a phantom stage that exists in the report and not in the workflow. |
| **SQL (Sales Qualified Lead)** | Sales has qualified the lead against criteria (BANT, MEDDIC, etc.) | Some companies use "SQL" to mean what others call SAL. Genuinely bimodal usage. |
| **SQO (Sales Qualified Opportunity)** | An opportunity that passed a qualification gate | Sometimes identical to "opportunity created," sometimes a later gate. |
| **Opportunity** | An Opportunity record exists in the CRM | The only object with a hard technical definition, which is why it's the only reliable funnel anchor. |

**Historical framework context:** SiriusDecisions published the original Demand Waterfall in 2006 and a "Rearchitected" version in 2012; Forrester (which acquired SiriusDecisions) later moved to a buying-group-centric revenue waterfall on the argument that individual-lead measurement misrepresents B2B buying, where 6-10 stakeholders (17+ in enterprise) participate. **[S]** — Gartner stakeholder counts as cited in [Gradient Works](https://www.gradient.works/blog/2025-b2b-sales-performance-benchmarks). I was unable to reach Forrester's own page (404), so **the specific Forrester waterfall stage definitions are NOT SOURCED here.** Do not quote them.

**inputs:** Marketing automation platform (Marketo, HubSpot, Pardot) for MQL; CRM Lead/Contact object for SAL/SQL; Opportunity object for SQO. The handoff between MAP and CRM is where most of the counting errors live.

**application:** Capacity planning for SDRs, marketing target setting, and the whole lead-to-opportunity conversion chain.

**benchmark:** Only usable if you accept the definitional caveat. See metric 13 for conversion rates. For volume, **NO SOURCED BENCHMARK FOUND**, correctly, because volume scales with company size.

**traps:**
- **Definitions drift silently.** Changing an MQL score threshold restates the entire funnel. Always version-control funnel definitions and annotate the date of any change on every trend chart.
- **MQL volume is a vanity metric by construction.** It is set by the team measured on it. Pipeline-sourced and opportunity-sourced counts are the only funnel volumes with a natural check on them.
- **Person-level counting in a buying-group world.** Five people from one account downloading a whitepaper produce five MQLs and one buying opportunity. Account-level deduplication changes the funnel by multiples.
- **Recycled leads counted repeatedly** inflate MQL counts and deflate MQL-to-SQL rates simultaneously.
- **SAL exists in the report but not in life.** If nobody clicks accept/reject, SAL is computed as a time-based inference and is fiction.
- **Stage skipping.** Inbound demo requests often go straight to opportunity, bypassing MQL, so the "MQL to opportunity" rate is computed on a population that excludes your best leads.

**related:** Lead-to-Opportunity (13), Marketing-Sourced Pipeline (15), Cost per Stage (18), ICP Fit Score (28).

---

# 13. Lead-to-Opportunity Conversion Rate

**applies_to:** b2b

**definition:** The share of leads at a given funnel stage that become opportunities.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| MQL → Opportunity | Opps created from MQLs ÷ MQLs, cohorted by MQL date | The standard marketing conversion metric. |
| MQL → SQL | SQLs ÷ MQLs | Measures lead quality as judged by sales. |
| SQL → Opportunity | Opps ÷ SQLs | Measures SDR/AE qualification throughput. |
| **Cohort-based** | Restricted to leads created in period, measured after full lag | The only correct version. Period-based ratios (this month's opps ÷ this month's MQLs) mix cohorts and are wrong whenever volume is changing. |
| Account-level | Accounts with an opportunity ÷ Accounts with an MQL | The right version in an ABM or buying-group model. |
| By source | Segmented by channel | The version that drives budget. |

**Practitioner disagreement:** whether to use cohort or period ratios. Period ratios are what most dashboards show by default and are wrong during growth or decline; cohort ratios are correct and lag by a full sales cycle. Most teams knowingly use the wrong one because it's timely.

**inputs:** MAP lead records with created date and stage timestamps, CRM Lead/Contact/Opportunity linkage, lead source. HubSpot handles this natively; Salesforce + Marketo requires careful lead-to-opportunity attribution plumbing.

**application:** Lead-quality diagnosis, channel budget allocation, SDR capacity planning, and the input to cost-per-opportunity.

**benchmark:**

- **MQL-to-SQL, cross-industry average 13%.** **[S/W]** — First Page Sage data as reported across aggregators; I could not reach the primary report page (404).
- **MQL-to-SQL, B2B SaaS 18-22%, top performers 25-35%; enterprise B2B SaaS 40%.** **[W]** — aggregator sources with no disclosed methodology.
- **MQL-to-SQL by lead source:** Website/inbound 31.3%, Referrals 24.7%, Webinars 17.8%, Events 4.2%, Email/purchased lists <1%. **[S/W]** — attributed to First Page Sage lead-source benchmarks via [The Digital Bloom](https://thedigitalbloom.com/learn/pipeline-performance-benchmarks-2025/), 2025. **The 30x+ spread between inbound and purchased lists is the durable insight here, not the exact figures.**
- **Lead-to-MQL: 31% cross-industry, 39-41% B2B SaaS.** **[S/W]** — same sources.
- **SQL-to-opportunity 6%** (First Page Sage) versus **30-59%** (Gradient Works aggregation) versus **36-42%** (Digital Bloom). **[S/W]** — these are irreconcilable and prove the definitional point: they are not measuring the same object. **Do not use any single one of these as a target.**
- **Lead-to-close for B2B SaaS: 2.35%.** **[S]** — First Page Sage 2024 data via aggregators.

**PLG:** **NO SOURCED BENCHMARK FOUND.** In PLG the equivalent (signup-to-paid) sits in the consumer/PLG family.

**traps:**
- **The denominator is set by the team being measured.** Marketing controls the MQL bar; raising it raises conversion rate and lowers volume, with no change in business outcome.
- **Cohort vs period (above).** During fast growth, period-based conversion understates badly; during decline it overstates.
- **Lead-to-opportunity linkage is technically fragile.** In Salesforce, if a lead is converted, the attribution to the resulting opportunity depends on conversion hygiene. Unconverted leads that later show up as contacts on an opportunity are usually lost entirely.
- **Benchmark shopping.** The published range for "MQL to SQL" spans 6% to 51%. Anyone can find a source that makes their number look good. Treat any client citing a single external number as a red flag.
- **Channel comparison across different definitions of "lead."** A webinar registration and a demo request are not the same object; comparing their conversion rates is comparing intent levels, not channel performance.

**related:** Funnel Stage Volume (12), Cost per Opportunity (18), Marketing-Sourced Pipeline (15), Meeting Held to Opportunity (26).

---

# 14. Close Rate (Opportunity-to-Close)

**applies_to:** b2b

**definition:** The share of opportunities that convert to revenue. Frequently used as a synonym for win rate; it is not always the same thing.

**Where the two differ (this is a real and common confusion):**

| Term | Typical meaning | Denominator |
|---|---|---|
| Win rate | Won ÷ (Won + Lost) | Resolved opportunities only |
| Close rate | Won ÷ All opportunities entering the stage/period | Includes still-open and sometimes disqualified |

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Close rate on created cohort | Won ÷ All opps created in cohort | Right for measuring end-to-end demand efficiency. Structurally lower than win rate. |
| Close rate on qualified opps | Won ÷ SQOs | The AE-accountability version. |
| Value close rate | Won $ ÷ Created $ | Reveals whether pipeline dollars are real. |
| Time-boxed close rate | Won within N days of creation ÷ Created | Right when you need to know how much of a cohort converts inside a planning horizon. |

**inputs:** Same as win rate.

**application:** The multiplier that converts pipeline created into expected revenue, and therefore the key input to demand gen target setting.

**benchmark:**

- **Opportunity-to-close: 39% (SMB), 31% (Enterprise).** **[W]** — Digital Bloom 2025 aggregation.
- See all win rate benchmarks in metric 8; the 19-21% Ebsta x Pavilion figure is a closed-basis win rate, not a created-basis close rate, and the two should not be compared.

**traps:**
- **Used interchangeably with win rate without stating which.** If your coverage model uses win rate but your demand-gen target uses close rate, you will systematically under-generate pipeline.
- **Open opportunities in the denominator** make close rate look terrible for recent cohorts. Only mature cohorts are interpretable.
- All win rate traps apply.

**related:** Win Rate (8), Pipeline Created (5), Pipeline Coverage (4).

---

# 15. Marketing-Sourced Pipeline

**applies_to:** b2b

**definition:** The share of pipeline (in dollars or opportunity count) where marketing originated the relationship that became the opportunity.

**formula_variants:**

| Variant | Formula | When it's right / who argues for it |
|---|---|---|
| **First-touch on the contact** | Opps where the primary contact's original lead source is a marketing channel ÷ All opps | The most common implementation. Lead Source is locked at lead creation and inherited by the opportunity. |
| **First-touch on the account** | Opps where any contact at the account was first touched by marketing | The account-centric version. Materially higher than contact-level in an ABM motion. |
| **Opportunity-source field** | A manually-set or rules-set field on the opportunity itself | Right when you want sales to adjudicate. Introduces rep judgment and therefore bias. |
| **Campaign-membership-at-creation** | Opps whose contacts had campaign membership within N days before creation | A hybrid; blurs into influenced. |
| **Self-reported attribution** | "How did you hear about us?" captured on the form or by the SDR, used as the source of record | Chris Walker (Refine Labs, now Passetto) has argued publicly for this over CRM-tracked attribution, on the grounds that tracked attribution misses most of the real journey. **[S]** — [Chris Walker's public commentary](https://www.linkedin.com/posts/chriswalker171_attribution-revenue-b2b-activity-7021126918821347328-R5CQ); the "attribution software misses roughly 70% of the real journey" framing is attributed to him via secondary reporting and I could not verify the exact figure at source. **Treat the 70% as unverified.** |
| **Count-based vs value-based** | Opp count sourced ÷ total, vs sourced $ ÷ total $ | These diverge sharply. Marketing typically sources more small deals; sales sources more large ones. Reporting count when value is unflattering is a standard move. |

**inputs:** Lead Source field, campaign membership, opportunity contact roles, self-reported attribution field, account-level first-touch date. HubSpot, Salesforce + Marketo, and increasingly Dreamdata / HockeyStack / Demandbase for multi-touch versions.

**application:** Marketing budget allocation and marketing's own accountability number. Feeds cost per pipeline dollar.

**benchmark:**

- **By GTM motion (Forrester-informed):** Inbound-led SaaS 50-60%; PLG 50-60%; mid-market mixed 30-50%; enterprise outbound 20-35%; ABM/strategic accounts 5-20%. **[S]** — [ZoomInfo, "Marketing-Sourced Pipeline"](https://pipeline.zoominfo.com/marketing/marketing-sourced-pipeline-trending-down), updated July 2, 2026, citing Forrester for the ABM band.
- **Alternative cut:** Inbound-led 40-70%; outbound-led 20-40%; PLG 25-50%; partner/channel-led 15-30%; hybrid 30-55%. **[W]** — [ReWork resources](https://resources.rework.com/libraries/marketing-sales-alignment/marketing-sourced-vs-influenced-pipeline).
- **General:** marketing typically sources 20-40% of pipeline directly. **[W]** — [Metadata.io](https://metadata.io/resources/blog/sourced-vs-influenced-pipeline/), June 16, 2026.
- **The metric is being abandoned.** Forrester research shows B2B marketing organizations tracking marketing-sourced pipeline as a KPI fell from 70% in 2015 to 47% in 2020, with a projection of 14% by 2025. **[S]** — ZoomInfo citing Forrester, July 2026. **This is the most important benchmark in this entry:** the trendline says the metric is losing legitimacy as a primary KPI, and you should know that before recommending a client build a comp plan on it.

**traps:**
- **It's zero-sum with sales, which makes it political rather than analytical.** Every dollar marketing sources is a dollar sales didn't. The metric structurally guarantees a fight.
- **First-touch is arbitrary in a 6-10 stakeholder buying process.** Crediting the whole opportunity to whoever filled out a form first is not a measurement, it's a convention.
- **Lead Source hygiene is usually terrible.** ReWork's practical rule: if "unknown" or blank exceeds 10% of records, the data isn't usable. **[W]**
- **Outbound-to-a-known-MQL.** An SDR calls someone who downloaded an ebook last year. Marketing claims the source; sales claims the work. Both are partly right and the field can only hold one value.
- **Dark social and word-of-mouth are invisible to tracked attribution**, which is the core of the Walker critique and is directionally correct regardless of whether the 70% figure is verifiable.
- **Definitional gaming.** Broadening what counts as a marketing channel (adding SDR outbound email to "marketing") can move the number 20 points in a quarter with no change in reality.
- **Count vs value substitution.**

**related:** Marketing-Influenced Pipeline (16), Self-Sourced Pipeline (17), Pipeline Created (5), Cost per Pipeline Dollar (18).

---

# 16. Marketing-Influenced Pipeline

**applies_to:** b2b

**definition:** The share of pipeline where any marketing touchpoint occurred anywhere in the buying process, regardless of who originated it.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Any-touch influenced | Opps where ≥1 associated contact had ≥1 campaign touch ÷ All opps | The default. Produces very high numbers by construction. |
| Windowed influenced | Restricted to touches within N days before opportunity creation or close. **Standard convention is a 90-day pre-creation window.** **[W]** — ReWork | The only version with any discipline. The window choice dominates the result. |
| Threshold influenced | Requires ≥N touches, or ≥N distinct contacts touched | Reduces the trivial-touch problem. |
| Multi-touch weighted (linear / U-shaped / W-shaped / time-decay / algorithmic) | Fractional credit distributed across touches | Right when you need a per-channel contribution number rather than a binary flag. Every weighting scheme is a modeling assumption, not a measurement. |
| Influenced revenue vs influenced pipeline | Same logic applied to closed-won | Closer to the money; still subject to every trap below. |

**inputs:** Campaign member records for every contact on every opportunity, timestamps, opportunity contact roles. Requires MAP-to-CRM campaign sync. Dreamdata, HockeyStack, Bizible/Adobe, Demandbase, Terminus all productize versions of this.

**application:** Content and campaign ROI evaluation, and the argument marketing makes when sourced pipeline is low.

**benchmark:**

- **Marketing typically influences 60-80% of deals.** **[W]** — [Metadata.io](https://metadata.io/resources/blog/sourced-vs-influenced-pipeline/), 2026.
- **74% of high-growth companies use multi-touch attribution.** **[W]** — same source, no primary study named.
- **The honest answer: influenced-pipeline benchmarks are not meaningful comparison points**, because the attribution window choice dominates the output. ReWork states this directly and recommends internal quarter-over-quarter trend tracking instead of external comparison. **[W]** but analytically correct. I would treat "**NO USABLE CROSS-COMPANY BENCHMARK EXISTS**" as the right answer to give a client.

**traps (this is a first-class trap category, per the brief):**
- **The number trends toward 100% as you do more marketing, regardless of effectiveness.** Send more emails, influence more deals. There is no ceiling and no falsification condition.
- **It cannot be used for budget decisions.** Chris Walker's specific charge is that influenced-revenue reports are used to justify the worst-performing programs, because every program shows as "working." **[S]** — via secondary reporting of his public commentary. This is the sharpest version of the critique and it is correct: a metric where every input scores positive cannot rank inputs.
- **A single trivial touch counts the same as a decisive one.** An unopened nurture email registers identically to the webinar that created the deal.
- **The window is the whole ballgame.** A 30-day window and a 365-day window on the same data produce influenced-pipeline numbers that can differ by 40+ points.
- **Sourced + influenced are reported as if additive.** They overlap almost entirely (sourced deals are also influenced). Presenting "we sourced 30% and influenced 70%" implies 100% coverage and is double-counting.
- **The marketing/sales credibility problem.** When marketing reports 68% influenced and sales reports 15% of closed-won came from marketing, leadership stops trusting both numbers. The failure mode isn't a wrong number, it's a lost seat at the table.
- **My recommendation for this corpus:** teach influenced pipeline as a *diagnostic for coverage of the buying committee*, never as an ROI or budget metric. The defensible reframe is "what share of our open opportunities have zero marketing engagement" (which is actionable) rather than "what share have some" (which is not).

**related:** Marketing-Sourced Pipeline (15), Multi-Threading (35), Pipeline Created (5).

---

# 17. Self-Sourced / Rep-Sourced Pipeline (Source Mix)

**applies_to:** b2b

**definition:** The share of pipeline originated by sellers' own prospecting rather than by marketing, partners, or product.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| AE self-sourced | Opps with source = AE outbound ÷ Total opps | Right for full-cycle motions. Ebsta reports 46% of SaaS/tech companies adopted full-cycle sales in 2025 **[P]**, which makes this metric increasingly load-bearing. |
| SDR-sourced | Opps from SDR outbound | Should be separated from AE self-sourced; they're different cost structures. |
| Full source mix | % from marketing / SDR outbound / AE outbound / partner / product-led / customer referral | The only version that supports budget decisions. |
| Value-weighted mix | Same, on dollars | Outbound typically skews to larger deals; count-based mix understates it. |
| Win rate by source | Win rate computed within each source | The decision-relevant version. Source mix alone tells you nothing about which source is better. |

**inputs:** Lead Source, Opportunity Source, SDR/AE ownership at creation, partner referral fields. Salesforce/HubSpot, with the caveat that a single-select source field cannot represent a co-sourced deal.

**application:** Determines whether to invest in demand gen, SDR headcount, partner programs, or PLG. The single most consequential resource-allocation input in B2B GTM.

**benchmark:**

- **Enterprise outbound motions:** sales originates 65-80% of pipeline (implied by marketing-sourced at 20-35%). **[S]** — ZoomInfo/Forrester, 2026.
- **ABM/strategic:** sales originates 80-95%. **[S]** — same.
- **Inbound-led SaaS:** sales originates 40-50%. **[S]** — same.
- **Expansion is now the dominant source of new revenue:** 52% of new revenue came from customer expansion. **[S]** — Ebsta x Pavilion 2025, via Gradient Works. Corroborated independently: expansion ARR contributed 40% of total new ARR at median in 2024, up 5 points YoY, rising to 58% for $50-100M ARR companies and 67% for >$100M (n=6, small base, treat cautiously). **[P]** — [Benchmarkit x Pavilion 2025](https://www.benchmarkit.ai/2025benchmarks).

**traps:**
- **A single-select source field forces a false choice** on co-sourced deals, which are the majority in mature motions.
- **Reps claim self-sourced credit** when comp plans pay more for it. If self-sourced carries a comp premium, the reported mix is a comp artifact.
- **Marketing claims the same deals.** Sourced-pipeline percentages from marketing and self-sourced percentages from sales frequently sum to more than 100%. When they do, neither is trustworthy.
- **Mix shift confounds efficiency metrics.** A shift toward outbound raises CAC ratio and lengthens cycles; reading that as "marketing got worse" is a common misattribution.
- **Partner-sourced is chronically under-tracked**, so it usually gets absorbed into whichever source field was easiest to set.

**related:** Marketing-Sourced (15), Pipeline Created (5), CAC Ratio (23), Expansion vs New Business Pipeline (31).

---

# 18. Cost per Stage (CPL, Cost per MQL / SQL / Opportunity / Pipeline Dollar)

**applies_to:** b2b (consumer analogue is CPI/CPA, different family)

**definition:** Marketing and sales spend divided by the volume or value produced at a given funnel stage.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Cost per lead | Spend ÷ Leads | Weakest. Optimizing it usually degrades everything downstream. |
| Cost per MQL | Spend ÷ MQLs | Only comparable within a fixed MQL definition. |
| Cost per SQL / SQO | Spend ÷ qualified records | Better; still definition-dependent. |
| **Cost per opportunity** | Spend ÷ Opportunities created | The first genuinely comparable one, because Opportunity is a hard object. |
| **Cost per pipeline dollar** | Spend ÷ Pipeline $ created | The best demand-gen efficiency metric. Directly relatable to CAC ratio via win rate. |
| Cost per closed-won dollar | Spend ÷ New ARR | This is CAC ratio (metric 23). |
| Fully-loaded vs program-only spend | Include or exclude headcount, tools, agency | The most common source of non-comparability. Program-only cost per opportunity can be 3-4x lower than fully-loaded. |

**inputs:** Marketing spend by channel (ad platforms, finance/GL), headcount cost, funnel counts by source, pipeline $ by source. Reconciling ad-platform spend to GL is where most of the error lives.

**application:** Channel budget allocation, and the bridge between demand gen activity and CAC.

**benchmark:** **NO SOURCED BENCHMARK FOUND** for cost per opportunity or cost per pipeline dollar in B2B SaaS with a credible methodology. I found B2B cost-per-lead compilations **[W]** with no disclosed sample. The defensible substitute: derive your own target from CAC ratio and win rate. If a defensible New CAC Ratio is $2.00 of S&M per $1 of new ARR **[P]** (Benchmarkit x Pavilion 2025, FY2024, median, n=73) and your win rate is 20%, then cost per pipeline dollar should be roughly $0.40, and cost per opportunity should be roughly 0.40 × your ASP.

**traps:**
- **Optimizing the earliest stage.** Cheap MQLs from paid social that never convert lower cost per MQL and raise cost per opportunity. Any cost metric above the opportunity line can be improved by buying worse traffic.
- **Spend attribution lag.** Spend is booked in month M; the opportunity appears in month M+2. Dividing same-month spend by same-month opportunities is wrong whenever spend is changing.
- **Program-only vs fully-loaded.** Always state which. Marketing reports program-only; finance computes fully-loaded; the ratio between them is often 3x.
- **Brand and demand-capture spend attributed to demand-gen output.** Search-brand clicks convert well and cost little, which flatters blended cost per opportunity while creating nothing.
- **Denominator inflation.** Opportunity count is easier to manufacture than pipeline dollars, which are easier than closed-won dollars. Cost metrics get less gameable the further down the funnel you go.

**related:** Marketing-Sourced Pipeline (15), CAC Ratio (23), Lead-to-Opportunity (13), Pipeline Created (5).

---

# 19. Quota Attainment

**applies_to:** b2b

**definition:** Bookings achieved as a percentage of assigned quota.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Individual attainment | Rep bookings ÷ Rep quota | The comp-plan number. |
| **% of reps at or above 100%** | Count(reps ≥ 100%) ÷ Count(reps) | The health metric. Very different from the next one. |
| **Median attainment** | 50th percentile of rep attainment | The honest central tendency. |
| Mean attainment | Σ(bookings) ÷ Σ(quota) | Equals team attainment; dominated by top performers. Almost always higher than median. |
| Ramped-rep-only attainment | Excludes reps inside ramp period | The only fair version for comparing periods with different hiring rates. |
| Attainment on ramped-rep-equivalents | Bookings ÷ (Σ quota weighted by ramp fraction) | The right capacity-planning version. |
| Annual vs quarterly | — | Quarterly attainment is far more volatile; annual smooths out deal timing. |

**inputs:** Bookings by rep, quota by rep, hire date, ramp schedule, territory. CRM plus a comp system (CaptivateIQ, Xactly, Spiff) or a spreadsheet.

**application:** Comp accrual, hiring plan validation, quota-setting for next year, and the honest test of whether the coverage model works.

**benchmark:**

- **78% of sellers missed quota in 2025, up from 69% in 2024.** **[P]** — [Ebsta 2025 GTM Benchmarks](https://www.ebsta.com/news-updates/ebsta-unveils-2025-gtm-benchmarks-report/) ($48B pipeline, 2,000 CROs surveyed).
- **76% of sellers missed quota in H1 2025** (a mid-year cut of the same research). **[S]** — via Gradient Works.
- **28% of reps met quota in 2023.** **[S]** — Ebsta x Pavilion 2024, via Gradient Works.
- **67% of reps don't expect to hit annual quota; average quota attainment 43% in late 2024.** **[S]** — Salesforce State of Sales 2024, via Gradient Works.
- **51% of AEs meeting quota, down from 66% in 2022.** **[S]** — Bridge Group SaaS AE report (2023 edition), via secondary sources. I could not verify at source; the [2024 Bridge Group page](https://blog.bridgegroupinc.com/2024-ae-metrics-compensation-benchmark) I did reach did not display the attainment figure.
- **Quota levels:** median annual ACV quota $800K (up from $740K in 2022), roughly 2% CAGR since 2012; median OTE $190K (up from $167K in 2022); base:variable 53:47; sellers carrying $250K+ ACV deals have quotas nearly 2.5x those carrying <$25K ACV. Sample: 170+ B2B SaaS companies, published March 2024. **[P]** — Bridge Group, 2024 SaaS AE Metrics & Compensation.

**Note the tension:** "51% of AEs meeting quota" and "78% of sellers missed quota" cannot both describe the same population in the same year. They are different samples, different years, and possibly different definitions of "seller" (AE-only vs all quota-carriers). Flag this rather than averaging them.

**traps:**
- **Quota is a decision, not an observation.** Attainment measures the quota-setting process as much as rep performance. A company with 90% attainment may simply have set easy quotas.
- **Mean vs "% at 100%".** With 11x top-to-bottom quartile spread **[S]** (Ebsta x Pavilion 2025) and 14% of sellers driving 80% of revenue, mean attainment can be 95% while only 25% of reps hit their number. Both are true; they tell opposite stories. **Always report both.**
- **Ramping reps in the denominator** depress attainment during hiring; excluding them entirely overstates the team's real capacity.
- **Attrition survivorship.** Reps who missed and left aren't in the year-end calculation. Cohort-based attainment (all reps who started the year) is materially lower than end-of-year attainment.
- **Quota relief, territory changes, and mid-year re-quoting** silently restate the metric.
- **Small base:** for a 6-person sales team, "% of reps hitting quota" moves 17 points per rep. It is not a trend line, it is a headcount.

**related:** Pipeline Coverage (4), Rep Productivity (21), Ramp Time (20), Win Rate (8).

---

# 20. Ramp Time (and Ramped Rep Equivalents)

**applies_to:** b2b

**definition:** How long a newly hired seller takes to reach full expected productivity.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Time to full quota | Months from start date until the rep carries and achieves 100% quota | The strictest. |
| Time to first deal | Months to first closed-won | Easiest to measure; understates true ramp. |
| Time to steady-state attainment | Months until a cohort's median attainment plateaus | The most analytically sound. Requires cohort tracking. |
| **Ramped Rep Equivalent (RRE)** | Σ over reps of (fraction of ramp completed) | The capacity-planning unit. 10 reps at various ramp stages might be 6.5 RREs. Using headcount instead of RRE in a capacity model is the classic hiring-plan error. |
| Ramp-adjusted quota | Quota × ramp fraction by month (e.g. 0/25/50/75/100%) | Standard comp practice; the schedule itself is an assumption that should be validated against cohort data. |

**inputs:** Hire dates, quota schedules, bookings by rep by month, cohort tracking. HR system plus CRM plus comp system.

**application:** Hiring plan timing (you must hire ramp-time ahead of when you need capacity), capacity models, and the sales-efficiency denominator.

**benchmark:**

- **Average AE ramp 5.7 months, up 9% year over year.** **[S]** — Bridge Group SaaS AE data via secondary sources; I could not verify at the primary page.
- **Earlier Bridge Group data:** average new AE has 2.6 years of experience at hire and needs 4.5 months to ramp; ramp time rises with ACV. **[S]** — same caveat.
- **NO SOURCED SDR RAMP BENCHMARK FOUND** (Bridge Group SDR report URL returned 404).
- **Directional rule with sourcing:** ramp time increases with ACV, since higher-ACV motions require more experienced reps and longer cycles. **[S]** — Bridge Group.

**traps:**
- **Ramp is often measured to first deal, which is not productivity.** In a 9-month enterprise cycle, first deal at month 7 says nothing about steady-state output.
- **Ramp time and sales cycle are confounded.** A rep in a 6-month-cycle business cannot possibly ramp in under 6 months by any bookings-based definition. Ramp measured in bookings always exceeds sales cycle length; treating them as independent is an error in capacity models.
- **Survivorship.** Reps who never ramp get terminated and drop out of the ramp-time calculation, biasing it short.
- **Ramp assumptions in the hiring plan are rarely back-tested.** Companies use the same 3-month ramp assumption for years while actual ramp lengthens.
- **Territory quality dominates ramp.** A rep given a strong territory "ramps" fast for reasons unrelated to onboarding.
- **Small base:** ramp measured on 4 hires is noise.

**related:** Quota Attainment (19), Rep Productivity (21), Sales Cycle (7), Capacity planning.

---

# 21. Rep Productivity / Net New ARR per Sales Rep

**applies_to:** b2b

**definition:** New recurring revenue produced per quota-carrying seller.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| New ARR per AE | New ARR ÷ Quota-carrying AEs | The standard. |
| New ARR per RRE | New ARR ÷ Ramped Rep Equivalents | The correct version during hiring. Understates nothing. |
| New ARR per S&M FTE | New ARR ÷ all sales and marketing headcount | Broader; closer to CAC ratio. |
| ARR per employee (company-wide) | Ending ARR ÷ total FTE | A capital-efficiency metric, not a sales metric. Reported by Benchmarkit. |
| Net new ARR per rep | (New + expansion − churn − downsell) ÷ reps | Right when reps own the full account. Wrong when they only own new logo. |
| Bookings per rep vs ARR per rep | TCV vs ARR basis | Same ACV/TCV trap as metric 10. |

**inputs:** New ARR by rep, headcount with hire/term dates, ramp status, role definitions. CRM + HR + finance.

**application:** Determines whether adding reps adds revenue (the core scaling question), and whether the problem is rep count, rep quality, or lead supply.

**benchmark:**

- **Median AE quota of $800K ACV** sets the productivity expectation; actual productivity is quota × attainment. **[P]** — Bridge Group 2024, n=170+.
- **ARR per FTE is rising at every stage above $20M ARR**, attributed to headcount control and AI-driven automation, with a prediction that AI-native companies run at 2x-3x the ARR per FTE of legacy SaaS. **[P]** — [Benchmarkit x Pavilion 2025](https://www.benchmarkit.ai/2025benchmarks), n=174 for that cut. **The specific dollar values are in chart images I could not extract; NO EXACT ARR-PER-FTE FIGURE SOURCED.**
- **14% of sellers drive 80% of revenue; 11x spread between top and bottom quartile.** **[S]** — Ebsta x Pavilion 2025.
- **$3M median annual pipeline per SDR; ~15 meetings booked per SDR per month.** **[W]** — Gradient Works aggregation, sources listed as "various, 2025."

**traps:**
- **Headcount denominator definition.** Include or exclude ramping reps, sales managers, SDRs, solutions engineers, and the number moves 30-50%. There is no convention.
- **Averaging over an 11x performance spread** produces a number that describes almost nobody. Report the distribution.
- **Rising productivity from cutting the bottom quartile** is real but non-repeatable, and it looks identical to genuine improvement in the metric.
- **Productivity is mostly a function of territory and lead supply,** not rep skill. Firing low performers when the real constraint is pipeline supply is the most expensive misread in this metric.
- **Mix shift to expansion** raises ARR per rep without any improvement in new-logo capability.

**related:** Quota Attainment (19), Ramp Time (20), Magic Number (22), CAC Ratio (23), Burn Multiple (24).

---

# 22. SaaS Magic Number

**applies_to:** b2b

**definition:** How much new recurring revenue a dollar of sales and marketing spend produced.

**formula_variants:** This metric has more legitimate variants than any other in the family, and they are not interchangeable.

| Variant | Formula | When it's right |
|---|---|---|
| **Original (GAAP revenue, annualized)** | [(Revenue Qₙ − Revenue Qₙ₋₁) × 4] ÷ S&M Spend Qₙ₋₁ | The Scale Venture Partners 2006 formulation. Uses recognized revenue and lags S&M by a quarter. **[S]** — attribution to Scale Venture Partners 2006 is consistent across secondary sources; I could not reach a primary Scale VP page. |
| **Benchmarkit / Pavilion formulation** | (Current Qtr Revenue − Previous Qtr Revenue) ÷ Previous Qtr S&M Expenses | Note: **no ×4 annualization.** This is the formula published in the Benchmarkit glossary. **[P]** — [Benchmarkit x Pavilion 2025](https://www.benchmarkit.ai/2025benchmarks), glossary. **The absence of the ×4 makes their reported values a quarter of the annualized version. This is a real, documented inconsistency between two widely-cited definitions of the same metric.** |
| **ARR-based** | (ARR Qₙ − ARR Qₙ₋₁) ÷ S&M Spend Qₙ₋₁ | Cleaner for subscription businesses; avoids revenue-recognition noise. |
| **Same-quarter S&M** | Net New ARR Qₙ ÷ S&M Spend Qₙ | Simpler, but wrong in principle: this quarter's spend produces next quarter's revenue in most motions. |
| **Gross magic number** | New Customer ARR only ÷ S&M | Isolates new-logo efficiency. Higher than net. |
| **Net magic number** | (New + Expansion − Churn − Downsell) ÷ S&M | The version most consistent with "magic number" as an efficiency measure, and the one that Benchmarkit warns conceals four moving parts. |
| **Annual** | Annual Net New ARR ÷ Annual S&M | Smooths quarterly noise. Preferred for anything under ~$20M ARR. |

**inputs:** Quarterly revenue or ARR, quarterly S&M expense (fully loaded, from the GL). Finance system, not CRM.

**application:** The classic "should we spend more on sales and marketing" gate. Above threshold, invest; below, fix the motion first.

**benchmark:**

- **0.75 is the low water mark for increasing S&M investment; greater than 1.0 is ideal.** **[P]** — [Benchmarkit x Pavilion 2025](https://www.benchmarkit.ai/2025benchmarks), FY2024 data, n=101.
- **Median magic number increased ~4% in 2024.** **[P]** — same source. Benchmarkit explicitly notes they cannot explain why, because the survey doesn't decompose New / Expansion / Churn / Downsell ARR.
- **Benchmarkit's own recommendation: use CAC Ratio instead.** Their stated position is that magic number's four hidden components make it uninterpretable, and that CAC Ratio provides the granularity magic number lacks. **[P]** — same source. **This is the strongest available expert argument against the metric and worth teaching alongside it.**
- **Magic number varies materially by financing source:** PE-controlled companies run higher (profitability focus), VC-backed run lower (growth focus), bootstrapped run highest. **[P]** — same source, n=101. Exact values are in chart images I could not extract.
- **Below 0.5:** the engine isn't working. **0.5-0.75:** working but not optimized. **Above 1.5:** likely underinvesting. **[W]** — aggregator consensus, no primary source.

**traps:**
- **The ×4 discrepancy above is real and will produce a 4x error** if you compare a Benchmarkit-formula magic number to a Scale-VP-formula benchmark. Always confirm whether annualization is applied.
- **Net new ARR conflates four things.** A magic number of 1.0 could be great new-logo efficiency with heavy churn, or mediocre new-logo efficiency with strong expansion. Benchmarkit's core criticism.
- **It punishes companies with high churn for a sales efficiency problem they may not have**, and rewards expansion-heavy companies for something S&M didn't do.
- **S&M expense definition.** Fully loaded vs program-only, with or without stock comp, with or without customer success. Benchmarkit's survey did not ask participants to break out stock-based compensation **[P]**, which means published benchmarks include it inconsistently.
- **Quarterly volatility at small scale.** Below ~$10M ARR, a single large deal swings magic number by more than a full point.
- **The lag assumption.** One quarter of lag is right for a 45-day cycle and badly wrong for a 9-month enterprise cycle, where the productive spend was 3 quarters ago.

**related:** CAC Ratio (23), Burn Multiple (24), CAC Payback (cross-family), Rep Productivity (21).

---

# 23. CAC Ratio (New / Blended / Expansion)

**applies_to:** b2b

**definition:** Sales and marketing dollars spent per dollar of new annual recurring revenue acquired.

**formula_variants:** Benchmarkit publishes three distinct ratios with explicit formulas, and the distinction between them is the most useful thing in this metric.

| Variant | Formula | When it's right |
|---|---|---|
| **New CAC Ratio** | Total S&M Expenses ÷ New Customer ARR | Measures new-logo acquisition efficiency only. The number to use for demand gen accountability. **[P]** |
| **Blended CAC Ratio** | Total S&M Expenses ÷ (New Customer ARR + Expansion ARR) | Measures total ARR-adding efficiency. Systematically flattering, because expansion is cheap. **[P]** |
| **Expansion CAC Ratio** | S&M and CS expenses allocated to expansion ARR ÷ Expansion ARR | The most under-measured metric in SaaS. **[P]** |
| Inverse (CAC per customer) | S&M ÷ new customers acquired | A dollar amount rather than a ratio. Right when ACV is uniform. |
| Paid-only CAC ratio | Paid media spend ÷ New ARR from paid | Channel-level. Not comparable to fully-loaded. |
| Gross-margin-adjusted | S&M ÷ (New ARR × gross margin) | Converts to the payback basis. Benchmarkit uses this construction for CAC Payback. **[P]** |

All formulas above quoted from the [Benchmarkit x Pavilion 2025 glossary](https://www.benchmarkit.ai/2025benchmarks). **[P]**

**inputs:** Fully loaded S&M expense (GL), New Customer ARR and Expansion ARR (finance/CRM), gross margin. Note the allocation of CS cost to expansion is a judgment call with no standard.

**application:** The most decision-useful efficiency metric in B2B SaaS. Directly answers "should we grow through new logos or through the base."

**benchmark:** All from [Benchmarkit x Pavilion, 2025 B2B SaaS Performance Metrics Benchmarks](https://www.benchmarkit.ai/2025benchmarks), published May 2025, FY2024 data, n=583 total participants. **[P]**

| Metric | FY2024 median | Trend | n |
|---|---|---|---|
| **New CAC Ratio** | **$2.00** of S&M per $1 of new ARR | **up 14% YoY** | 73 |
| New CAC Ratio, 4th quartile | $2.82 | — | 73 |
| **Blended CAC Ratio** | **~$1.40** | down $0.19 (12%) YoY, but ~10% higher than 2022 | 43 |
| **Expansion CAC Ratio** | **$1.00** | up sharply from $0.61 (2020) and $0.69 (2021 and 2022) | 21 |

Additional sourced findings, same report:

- **Less than 20% of companies calculate Expansion CAC Ratio at all**, and less than 50% of the companies that use CAC Ratio calculate the expansion version. **[P]** That measurement gap is itself the finding.
- **CAC Ratio generally rises with ACV, with one persistent anomaly:** the $10K-$50K ACV band is more expensive to acquire than the $50K-$100K band, and this has held for multiple years. **[P]**
- **Deals above $100K ACV show *lower* CAC Ratio** than the $10K-$100K range, suggesting enterprise solutions requiring more time and resources to win may be more profitable over time. **[P]** This directly contradicts the common assumption that enterprise is inherently less efficient.
- **S&M as % of revenue: 37% median** overall; VC-backed 45% median vs PE-backed 33%; private companies >$100M ARR at 33%, identical to public SaaS companies. **[P]** n=157.
- **PLG is *more* expensive on S&M-to-revenue over time, not less.** Benchmarkit states this is "antithetical to popular belief." **[P]** **This is the most commercially useful counterintuitive finding in the report and worth flagging hard to any client assuming PLG is a cost-reduction strategy.**

**traps:**
- **Blended vs New substitution.** With New at $2.00 and Blended at $1.40, reporting Blended and calling it "CAC ratio" understates new-logo cost by 30%. Expansion is subsidizing the number.
- **Expansion CAC allocation is unstandardized.** How much CS headcount counts as expansion cost is a judgment with no convention, which is partly why so few companies compute it.
- **Timing mismatch.** S&M spent in period P produces ARR in P+1 or later. Same-period ratios understate cost during growth and overstate during contraction.
- **Stock-based compensation inclusion is inconsistent** across the benchmark population itself. **[P]** Benchmarkit did not ask participants to break it out.
- **Small n on the segment cuts.** Expansion CAC Ratio is n=21. Blended is n=43. These are small samples for a "benchmark" and the quartiles are correspondingly noisy. Treat as directional.
- **Multi-year and TCV contamination** in the ARR denominator.

**related:** Magic Number (22), CAC Payback (cross-family), Burn Multiple (24), Expansion Pipeline (31), Cost per Pipeline Dollar (18).

---

# 24. Burn Multiple

**applies_to:** b2b (and applies to consumer subscription businesses equally, one of the few genuinely portable metrics here)

**definition:** How many dollars of net cash burn were consumed to add each dollar of net new annual recurring revenue.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| **Sacks original** | Net Burn ÷ Net New ARR | The canonical definition. **[P]** — [David Sacks, "The Burn Multiple," April 23, 2020](https://sacks.substack.com/p/the-burn-multiple-51a7e43cb200). |
| **Trailing-twelve-month** | TTM Net Burn ÷ TTM Net New ARR | The version Benchmarkit surveys. **[P]** — Benchmarkit x Pavilion 2025 glossary. |
| Quarterly | Same, one quarter | Noisy below $20M ARR. |
| Revenue-basis | Net Burn ÷ Net New Revenue (GAAP) | Right for businesses without clean ARR. |
| Gross-burn variant | Gross Burn ÷ Net New ARR | Rare; ignores revenue offset. Not recommended. |

**inputs:** Net cash burn (finance), net new ARR (finance/CRM). Purely a finance metric; no CRM dependency.

**application:** The primary VC diligence efficiency metric since ~2021. Determines fundability and runway strategy.

**benchmark:**

- **Sacks' own framing:** a 2x burn multiple is "reasonable for an early-stage startup"; 5x is "terrible." **[P]** — [Sacks, April 23, 2020](https://sacks.substack.com/p/the-burn-multiple-51a7e43cb200). The post includes a benchmark table as an image; **I could not extract the exact tier thresholds, so NO EXACT SOURCED TIER TABLE.** Do not quote specific band boundaries.
- **Under 2x is "good" for a venture-stage SaaS company.** **[S]** — Sacks, via secondary reporting.
- **For $0-$10M ARR companies, ~1.1x.** **[S]** — attributed to a16z via secondary sources; I could not verify at source. **Treat as unverified.**
- **Sacks' rationale (worth quoting to clients):** any serious problem will eventually show up in the burn multiple by increasing burn, decreasing net new ARR, or both. That comprehensiveness is the argument for it over magic number. **[P]**

**traps:**
- **Net new ARR near zero makes it explode.** A company adding $100K of net new ARR while burning $5M has a burn multiple of 50, which is technically correct and analytically useless. Below a floor of net new ARR, the metric is undefined in practice.
- **Negative net new ARR makes it negative,** which is not a good burn multiple, it's a broken company. Always check the sign of the denominator before interpreting.
- **It rewards cutting growth investment.** A company that stops hiring improves burn multiple immediately and damages next year's growth. Never read it without the growth rate alongside it.
- **Net burn is manipulable** through working capital timing, prepaid annual contracts, and expense deferral. A company collecting more annual-prepay contracts improves burn multiple without improving economics.
- **It is a company-level metric being used in a sales-efficiency conversation.** R&D and G&A sit in the numerator. A high burn multiple may be an engineering-spend story, not a GTM story. Decompose before assigning it to sales.

**related:** Magic Number (22), CAC Ratio (23), Rule of 40 (cross-family), Growth rate.

---

# 25. Meeting Set to Meeting Held (and No-Show Rate)

**applies_to:** b2b

**definition:** The share of scheduled first meetings that actually take place, and its inverse.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Show rate | Meetings held ÷ Meetings scheduled | The standard. |
| No-show rate | 1 − show rate | Same information, framed for accountability. |
| Held-or-rescheduled rate | (Held + rescheduled-and-later-held) ÷ Scheduled | The fairer version; a reschedule is not a lost meeting. |
| Net show rate | Held ÷ (Scheduled − cancelled in advance) | Separates genuine no-shows from courteous cancellations. Different root causes, different fixes. |
| Time-to-meeting-conditioned | Show rate by days between booking and meeting date | The single most actionable cut; show rate degrades sharply with booking lead time. |
| By source | Inbound demo request vs SDR-booked vs AE-booked | Inbound requests show far better than outbound-booked. Blending them hides the real problem. |

**inputs:** Calendar/scheduling system (Chili Piper, Calendly, RevenueHero), CRM meeting/activity object, Gong for whether a call actually occurred. **This is the single hardest metric in the family to get clean data on**, because "held" is often inferred rather than recorded.

**application:** SDR compensation design (paying on meetings set vs meetings held changes behavior dramatically), and diagnosing whether a pipeline shortfall is a booking problem or a showing problem.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** I was unable to reach a credible published show-rate or no-show-rate benchmark for B2B sales meetings. Aggregator sites publish figures with no methodology. Do not state a number.

What *is* sourced and adjacent: **35-50% of sales go to the vendor that responds first** **[S]** (SPOTIO 2024, via Gradient Works), and responding within 60 seconds produces roughly a 400% conversion boost, with 7x higher qualification rates within one hour **[S]** (Lead Forensics 2024, via Gradient Works). These bear on booking speed, not show rate, but they are the closest sourced evidence.

**traps:**
- **Comping SDRs on meetings set rather than held** guarantees a high no-show rate. This is the most common structural cause and it is a comp design problem, not an SDR performance problem.
- **"Held" is often self-reported by the person who booked it.** If the SDR marks it held, the metric is unauditable. Use calendar-plus-recording evidence.
- **Reschedules counted as no-shows** overstate the problem and misdirect the fix.
- **Blending inbound and outbound** hides that outbound-booked meetings show at a much lower rate.
- **Denominator timing.** Meetings scheduled this month may be held next month. Cohort by booking date.
- **Fake meetings.** In outbound orgs with meeting quotas, low-intent "meetings" get booked to hit a number. Show rate then falls for a reason that is about the quota, not the prospect.

**related:** Meeting Held to Opportunity (26), Speed to Lead (27), Lead-to-Opportunity (13), SDR productivity (21).

---

# 26. Meeting Held to Opportunity Created

**applies_to:** b2b

**definition:** The share of first meetings that produce a qualified opportunity.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Simple | Opportunities created ÷ Meetings held | The standard. |
| Within-N-days | Opportunities created within 30 days of the meeting ÷ Meetings held | Right when opportunity creation is delayed; prevents crediting an unrelated later deal. |
| Qualified-opportunity basis | SQOs ÷ Meetings held | Stricter and more meaningful; a created opportunity is not necessarily a real one. |
| By meeting source | Segmented by inbound/outbound/partner | Essential. Inbound meetings convert at multiples of cold-outbound meetings. |
| By SDR and by AE | Same meetings, two owners | Diagnoses whether bad meetings are being booked or good meetings are being wasted. |

**inputs:** Meeting/activity records with held status, opportunity created date and linkage, meeting source. CRM plus Gong or a conversation-intelligence tool for whether a real discovery conversation happened.

**application:** The single cleanest test of SDR lead quality, and the handoff-quality metric between SDR and AE. Feeds SDR-to-AE ratio decisions.

**benchmark:** **NO SOURCED BENCHMARK FOUND** with credible methodology. The nearest sourced adjacency is the SAL-to-SQL rate of 52.7% **[S/W]** (Gradient Works aggregation, source listed as "various, 2025"), which is a different object.

**traps:**
- **This metric is the battlefield of SDR-AE conflict.** SDRs argue AEs waste meetings; AEs argue SDRs book garbage. The metric alone cannot adjudicate; you need meeting recordings.
- **Opportunity creation is discretionary.** An AE who doesn't want scrutiny doesn't create the opportunity. The metric measures AE CRM behavior as much as meeting quality.
- **Auto-created opportunities** in some configurations make the rate approach 100% and destroy the signal.
- **Attribution window.** A meeting in January and an opportunity in June may or may not be causally linked.
- **Small base at the individual level.** An SDR holding 15 meetings a month cannot be evaluated on a monthly conversion rate.

**related:** Meeting Set to Held (25), Lead-to-Opportunity (13), Win Rate (8), ICP Fit (28).

---

# 27. Speed to Lead (Lead Response Time)

**applies_to:** b2b (a consumer analogue exists in high-touch consumer sales)

**definition:** Elapsed time between a prospect's inbound request and the first genuine outreach attempt.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Median time to first touch | Median(first outreach timestamp − lead created timestamp) | Use median, not mean; the distribution is extremely right-skewed by weekend and overnight leads. |
| % responded within N minutes | Share of leads touched inside 5 / 60 minutes | The operationally useful version, since the relationship is a step function not a line. |
| Business-hours-adjusted | Excludes nights and weekends | Fairer for evaluating the team; unfair for evaluating buyer experience. Compute both. |
| Time to *connect* vs time to *attempt* | First dial vs first conversation | Attempt measures process; connect measures outcome. |
| By lead type | Demo requests vs content downloads | Only high-intent leads justify sub-5-minute response. Applying it to ebook downloads wastes SDR capacity. |

**inputs:** Lead created timestamp (MAP/web form), first activity timestamp (CRM/dialer), routing system logs. Chili Piper, LeanData, Salesloft/Outreach.

**application:** SDR staffing and routing design, and one of the highest-ROI, lowest-cost fixes available in most B2B funnels.

**benchmark:**

- **Responding within 60 seconds produces roughly a 400% conversion boost; 7x higher qualification rates within one hour.** **[S]** — Lead Forensics 2024, via [Gradient Works](https://www.gradient.works/blog/2025-b2b-sales-performance-benchmarks).
- **35-50% of sales go to the vendor that responds first.** **[S]** — SPOTIO 2024, via Gradient Works.
- **48% of reps never attempt a second follow-up; 92% give up by the fourth attempt.** **[S]** — Lead Forensics 2024 and SPOTIO 2024, via Gradient Works.
- **18+ dials typically needed to connect by phone.** **[S/W]** — Gradient Works, source "various, 2025."

**traps:**
- **The famous response-time research is old and heavily recycled.** The underlying studies behind most cited figures date to the early 2010s and predate the current buying environment. Treat the direction as robust and the magnitudes as unverified.
- **Speed applied to low-intent leads burns SDR capacity** for no return. Segment by intent before setting an SLA.
- **Automated instant email counted as "response"** makes the metric look excellent while nothing real happened. Measure human attempts.
- **Mean instead of median.** A handful of leads touched 3 days later destroys the mean.
- **Timestamp integrity.** Lead created timestamp is often the CRM sync time, not the form submission time, which can add 15-30 minutes of phantom delay or hide real delay.

**related:** Meeting Set to Held (25), Lead-to-Opportunity (13), Funnel Stage Volume (12).

---

# 28. ICP Fit Score / Lead Scoring Accuracy

**applies_to:** b2b

**definition:** A composite score estimating how well an account or lead matches the ideal customer profile, and the measurement of whether that score actually predicts outcomes.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Rules-based fit score | Weighted sum of firmographic attributes (employee count, industry, tech stack, geography) | Transparent and explainable. Weights are set by judgment. |
| Behavioral/engagement score | Weighted sum of activities | Measures intent, not fit. Should be scored on a separate axis, not blended. |
| **Two-axis (fit × intent)** | Fit score and engagement score plotted separately | The correct structure. Blending them into one number is the standard mistake. |
| Predictive/model-based | Fitted probability of conversion from historical closed-won attributes | Right at volume. Requires enough closed-won to train on. |
| **Score validation (the real metric)** | Win rate, ACV, and retention by score band | The only way to know if the score works. Most companies never compute this. |
| Lift over random | Conversion rate of top decile ÷ overall conversion rate | The single cleanest scorecard for a scoring model. |

**inputs:** Firmographic enrichment (Clearbit, ZoomInfo, Apollo), product usage, engagement data from MAP, and closed-won outcomes for validation. Scoring lives in HubSpot, Marketo, or a dedicated tool (MadKudu, Common Room).

**application:** Routing, SDR prioritization, ad targeting exclusions, and territory design. Also the correct answer to "we need more leads" when the real problem is lead quality.

**benchmark:**

- **Companies using behavioral ICP scoring achieve 39-40% MQL-to-SQL conversion**, versus B2B SaaS averages of 18-22%. **[W]** — aggregator sources without disclosed methodology. **Directionally consistent with the lead-source spread in metric 13, but do not quote this figure.**
- Otherwise **NO SOURCED BENCHMARK FOUND.** Scoring model performance is inherently company-specific, so this is the correct answer.

**traps:**
- **Fit and intent blended into one score.** A perfect-fit account with zero engagement and a poor-fit account with heavy engagement can produce identical scores and require completely opposite actions.
- **The model is trained on who you sold to, not who you should sell to.** Historical closed-won reflects past targeting, sales coverage, and pricing. A model fitted on it will faithfully reproduce your existing bias and will never surface an underserved segment. This is the deepest problem with predictive scoring and it is rarely acknowledged.
- **Nobody validates the score.** Scoring models are built, deployed, and never back-tested against win rate by band. Ask any client to show win rate by score decile; most cannot.
- **Score inflation over time.** As thresholds get tuned to hit MQL volume targets, the score drifts and stops discriminating.
- **Enrichment data decay.** Firmographic data ages; employee counts and tech stacks are often 12-24 months stale.
- **Scoring at person level in a buying-group world** (see metric 12).

**related:** Funnel Stage Volume (12), Lead-to-Opportunity (13), Win Rate (8), Account Penetration (29).

---

# 29. Account Penetration / Account Coverage

**applies_to:** b2b

**definition:** The share of target accounts you have meaningfully engaged, and the depth of revenue captured within accounts you've won.

**formula_variants:** Two distinct concepts share this name; keep them separate.

| Variant | Formula | Which concept |
|---|---|---|
| **Account coverage (breadth)** | Target accounts with ≥1 opportunity ÷ Total target accounts | Market coverage. |
| Engaged account coverage | Accounts with any qualified engagement ÷ Target accounts | Softer, earlier version. |
| **Logo penetration** | Won accounts ÷ Total addressable accounts in segment | Market share on a logo basis. |
| **Share of wallet (depth)** | Your ARR at the account ÷ estimated total addressable spend at the account | Revenue penetration. Requires an estimate you usually don't have. |
| **Product attach / cross-sell rate** | Accounts with ≥2 products ÷ Total accounts, or average products per account | The measurable proxy for depth. |
| Seat penetration | Licensed seats ÷ eligible employees at the account | The cleanest depth metric when you sell per-seat. |
| Buying-group coverage | Contacts engaged at the account ÷ known buying committee size | See metric 35. |

**inputs:** Target account list (which is itself a judgment), account hierarchy, opportunity and ARR by account, enrichment for employee/seat counts. Salesforce account hierarchy, Demandbase or 6sense for coverage views.

**application:** Territory design, ABM program measurement, expansion planning, and the answer to whether growth should come from new logos or from the base.

**benchmark:**

- **75-125 accounts per SDR and 400-500 contacts per rep** as coverage capacity guidance. **[S]** — TOPO/Gartner, via [Gradient Works](https://www.gradient.works/blog/2025-b2b-sales-performance-benchmarks).
- **Expansion now contributes 40% of total new ARR at median**, rising to 58% at $50-100M ARR and 67% above $100M (n=6, treat cautiously). **[P]** — [Benchmarkit x Pavilion 2025](https://www.benchmarkit.ai/2025benchmarks), n=81. This is the strongest available evidence that depth is where growth is coming from.
- Otherwise **NO SOURCED BENCHMARK FOUND** for penetration or share-of-wallet percentages.

**traps:**
- **The denominator is a marketing artifact.** "Target accounts" is a list somebody built. Penetration improves instantly if you shrink the list, and this happens constantly.
- **Share of wallet requires estimating competitor spend**, which is almost never knowable. Most reported share-of-wallet numbers are guesses dressed as metrics.
- **Account hierarchy errors.** Subsidiaries counted as separate accounts inflate the denominator and understate penetration; consolidating them does the reverse.
- **Coverage measured by activity, not by outcome.** "We touched 80% of target accounts" counts emails sent.
- **Penetration and TAM are circular.** Both come from the same account list; a company can report high penetration of a TAM it defined to be small.

**related:** Expansion Pipeline (31), Multi-Threading (35), ICP Fit (28), Logo Count vs ARR Growth (30).

---

# 30. Logo Count Growth vs ARR Growth

**applies_to:** b2b

**definition:** The comparison between customer-count growth and revenue growth, which reveals whether growth is coming from more customers or bigger customers.

**formula_variants:**

| Variant | Formula | What it reveals |
|---|---|---|
| Logo growth rate | (Ending logos − Starting logos) ÷ Starting logos | Customer count trajectory. |
| ARR growth rate | (Ending ARR − Starting ARR) ÷ Starting ARR | Revenue trajectory. |
| **Growth decomposition** | ARR growth = logo growth + ARPA growth + cross-term | The honest decomposition. |
| ARPA / average ARR per account | Total ARR ÷ Total accounts | The bridge between the two. |
| New logo count vs new ARR | Separates acquisition from base | Right for demand gen accountability. |
| Net logo growth | New logos − churned logos | Catches the "adding and losing equally" pattern. |

**inputs:** Customer count with a consistent definition of "customer," ARR by period. Finance system; the customer-count definition (parent vs subsidiary, paying vs free) is the entire game.

**application:** Diagnoses whether a growth slowdown is an acquisition problem or a pricing/packaging problem. Also the earliest warning of the "moving upmarket by accident" pattern.

**benchmark:**

- **Median ARR growth 26% in 2024 for private B2B SaaS**, with top-quartile growth falling from 60% in 2023. Companies planned 35% median growth for 2025, the same plan they made for 2024, against 26% actual. **[P]** — [Benchmarkit x Pavilion 2025](https://www.benchmarkit.ai/2025benchmarks), n=583. **The plan-versus-actual gap of 9 points is itself the most useful number here for calibrating client forecasts.**
- **AI-native companies grew at 44% median versus 25% for traditional SaaS.** **[P]** — same source.
- **VC-backed 30% median vs PE-backed 13% median.** **[P]** — same source.
- **Private company median growth 26% vs public SaaS >$500M at 13%.** **[P]** — same source.
- **NO SOURCED BENCHMARK FOUND for logo growth rate specifically**, which is a genuine gap in the published research; nearly all publishers report revenue growth only.

**traps:**
- **ARR growing while logo count is flat or falling is the classic late-stage pattern**, and it usually gets reported as success. It means you are extracting more from a shrinking base, which is not durable.
- **"Customer" definitions shift.** Consolidating subsidiaries into a parent account cuts logo count with zero business change.
- **Free-to-paid and trial accounts** included or excluded change logo count dramatically in PLG.
- **Small-base fragility at the enterprise end.** A company with 40 customers reports 5% logo growth when it adds two. Logo growth rate is not a meaningful metric below roughly 100 customers; report absolute counts.
- **ARPA growth from price increases** looks identical to ARPA growth from moving upmarket, and they have completely different implications for demand gen strategy.

**related:** Average Deal Size (10), Expansion vs New Business (31), Renewal Rate (32), Account Penetration (29).

---

# 31. Expansion Pipeline vs New Business Pipeline

**applies_to:** b2b

**definition:** The split of pipeline between opportunities at existing customers and opportunities at net-new accounts.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Expansion pipeline share (count) | Expansion opps ÷ All opps | Simple, understates value skew. |
| Expansion pipeline share (value) | Expansion $ ÷ Total pipeline $ | The version that matters. |
| Net-new-ARR-only basis | Expansion opportunities valued at incremental ARR only | Prevents counting the whole account value as pipeline. |
| Expansion ARR contribution | Expansion ARR ÷ (New Customer ARR + Expansion ARR) | The Benchmarkit definition, applied to closed rather than pipeline. **[P]** |
| Upsell vs cross-sell split | Same product more seats vs new product | Different motions, different owners, different cost. Blending them hides which one works. |
| Renewal opportunities included or excluded | — | Contested. Including auto-renewal opps makes expansion pipeline look enormous and is almost always wrong. |

**inputs:** Opportunity Type field (New Business / Expansion / Renewal), account ARR at time of opportunity, product line. Salesforce/HubSpot with disciplined Type usage, which is rare.

**application:** Determines the split of sales capacity between AEs and account managers, and determines whether marketing should be running acquisition or lifecycle programs. Given the CAC ratio gap below, this is arguably the highest-leverage resource decision in B2B SaaS right now.

**benchmark:**

- **Expansion ARR is 40% of total new ARR at median in 2024, up 5 points YoY.** By ARR size: $50-100M companies at 58%; >$100M at 67% (n=6, small base). **[P]** — [Benchmarkit x Pavilion 2025](https://www.benchmarkit.ai/2025benchmarks), n=81.
- **52% of new revenue came from customer expansion.** **[S]** — Ebsta x Pavilion 2025, via Gradient Works. Two independent sources converging near half is a strong signal.
- **The economics are stark:** Expansion CAC Ratio $1.00 versus New CAC Ratio $2.00. **[P]** — Benchmarkit x Pavilion 2025. **Expansion ARR costs half what new-logo ARR costs.** Benchmarkit's own framing: given a need to add $10M of ARR, this ratio should drive the new-logo versus expansion prioritization decision.
- **Engaged C-suite raises upsell potential 189%.** **[S]** — Ebsta x Pavilion 2025, via Gradient Works.

**traps:**
- **Expansion opportunities recorded at total account value** rather than incremental ARR inflate pipeline by multiples. The most common data error in this metric.
- **Renewal opportunities counted as expansion pipeline.** A renewal is not new pipeline; including it makes coverage look healthy while new-logo pipeline is starving.
- **The Expansion CAC Ratio advantage is partly an allocation artifact.** Less than 20% of companies even calculate expansion CAC **[P]**, and those that do must make a judgment call on how much CS cost to allocate. Under-allocating CS cost makes expansion look cheaper than it is. Treat the 2:1 advantage as real but probably overstated.
- **Expansion has a ceiling that new logos don't.** A strategy of shifting entirely to expansion works until the base is fully penetrated, then growth stops abruptly. The metric gives no warning of the ceiling.
- **Small base:** the >$100M expansion figure of 67% comes from six companies. Benchmarkit flags this themselves. Do not quote it as a benchmark.

**related:** CAC Ratio (23), NRR/GRR (32), Account Penetration (29), Pipeline Created (5).

---

# 32. Renewal Rate and Gross Renewal Rate (Contract Basis)

**applies_to:** b2b

**definition:** The share of contract value or contracts up for renewal in a period that actually renewed. Distinct from GRR/NRR measured on a whole-base basis.

**formula_variants:** The contract-basis versus base-basis distinction is genuinely important and frequently confused.

| Variant | Formula | When it's right |
|---|---|---|
| **Gross Dollar Renewal Rate (contract basis)** | Renewed ARR from contracts up for renewal ÷ Total ARR up for renewal in the period | Right when renewals are event-driven and lumpy. Only counts contracts actually facing a decision. |
| **Logo Renewal Rate (contract basis)** | Contracts renewed ÷ Contracts up for renewal | The count version. Diverges sharply from the dollar version when contract sizes vary. |
| **Net Dollar Renewal Rate (contract basis)** | (Renewed + expansion at renewal) ÷ ARR up for renewal | Can exceed 100%. |
| **GRR (base/cohort basis)** | ARR from a starting cohort at end of period ÷ ARR from that cohort at start, excluding all expansion, including churn and downsell | The Benchmarkit-recommended cohort method. **[P]** |
| **NRR (base/cohort basis)** | Same cohort, including all expansion, cross-sell, upsell, downsell and churn | **[P]** |
| Annualized vs period rate | Converting a monthly or quarterly rate to annual | Compounding errors here are common and large. |

Both Benchmarkit definitions quoted from the [2025 glossary](https://www.benchmarkit.ai/2025benchmarks). **[P]**

**inputs:** Contract renewal dates, contract ARR, renewal outcomes, downsell amounts. Finance/billing system (Zuora, Maxio, Stripe Billing) plus CRM renewal opportunities.

**application:** Renewal forecasting, CS capacity planning, and the input to the retention side of the growth equation. Contract-basis rates are what a CS team is actually managed to; base-basis rates are what investors underwrite.

**benchmark:**

- **GRR median 88% in 2024**, having declined from 90% over three years. **[P]** — [Benchmarkit x Pavilion 2025](https://www.benchmarkit.ai/2025benchmarks), n=225.
- **GRR rises with ACV**, consistently across four years of the study. **[P]** — same source.
- **GRR by pricing model:** usage-based 92% median; subscription and hybrid both 88%. Usage-based also had the highest bottom quartile (88%) and highest top quartile (96%). **[P]** — same source, first year this cut was published.
- **GRR declines as companies scale past $5M ARR**, typically after the first one or two renewal cycles. **[P]** — same source.
- **NRR median 101% in 2024**, down from 103% (CY-22) and 105% (CY-21), and holding above 100%. **[P]** — same source, n=228.
- **NRR rises with ACV.** Hybrid subscription-plus-usage pricing shows the highest NRR at 110% median, above pure usage or pure subscription. **[P]** — same source.
- **NRR by ACV band:** $25K-$50K ACV median 102%, 75th percentile 111%, 25th percentile 97%. **[S]** — [SaaS Capital 2025 retention research](https://www.saas-capital.com/blog-posts/what-is-a-good-retention-rate-for-a-saas-company/); sample size not disclosed in the article.
- **NO SOURCED BENCHMARK FOUND** for contract-basis gross renewal rate specifically, as distinct from base-basis GRR. This is a real gap; the published research reports base-basis almost exclusively.

**traps:**
- **Contract basis and base basis are not comparable and are routinely swapped.** In a quarter with few renewals up, contract-basis renewal rate can be 100% while base-basis GRR is deteriorating.
- **Denominator timing.** Whether a contract is "up for renewal" on its end date, its notice date, or the date it was scheduled to be worked changes the period it lands in.
- **Auto-renewals** with no customer action counted as renewal wins overstate CS performance.
- **Downsell treatment.** GRR should include downsell; some companies exclude it and report an inflated figure.
- **Multi-year contracts** disappear from the renewal denominator for years, then arrive as a lumpy cohort. Contract-basis rates in a multi-year business are extremely volatile.
- **Small-base fragility is severe here.** With 15 renewals up in a quarter, one lost logo moves logo renewal rate by 6.7 points, and if that logo is 20% of the renewing ARR, dollar renewal rate moves 20 points. **In enterprise, quarterly renewal rates are not a trend line.** Use trailing twelve months, and report the number of renewal events alongside the rate, always.
- **Cohort selection.** Excluding the newest customers (who churn most) from the cohort inflates retention. Benchmarkit's cohort method is the right discipline.

**related:** Expansion Pipeline (31), NRR (cross-family), Logo Count vs ARR Growth (30), Account Penetration (29).

---

# 33. Deal Slippage / Push Rate / Pipeline Aging

**applies_to:** b2b

**definition:** The share of deals that fail to close in their forecast period and move to a later one, and the accumulation of pipeline that isn't moving.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Push rate (count) | Opps whose close date moved out of the period ÷ Opps forecast to close in the period | The standard. |
| Push rate (value) | Same, on dollars | Better; large deals push more often. |
| Repeat-push rate | Opps that have pushed ≥2 times ÷ Open opps | The most predictive. A twice-pushed deal is far more likely to be lost than won. |
| Slip-to-win conversion | Won ÷ Pushed opportunities | Answers "do pushed deals eventually close." Usually a much lower rate than reps assume. |
| **Pipeline aging** | Distribution of days-in-current-stage across open pipeline | The stock version of the same problem. |
| **Stalled pipeline** | Open pipeline with no activity in N days ÷ Total open pipeline | The clean-out trigger. N=30 for SMB, N=60-90 for enterprise. |
| Close-date churn | Average number of close-date changes per opportunity | A pure data-hygiene diagnostic. |

**inputs:** Opportunity close-date change history (Salesforce field history, HubSpot property history), last activity date, stage entry timestamps. Clari, BoostUp, and Gong all productize slippage tracking; native CRM reporting on this is poor.

**application:** Forecast credibility, pipeline hygiene programs, and the correction factor on coverage ratio. A pipeline with 40% stalled dollars does not have the coverage it reports.

**benchmark:**

- **Delayed deals reduce win rates by 113%; deals closing within 50 days win at roughly 47% versus roughly 20% beyond.** **[S]** — Ebsta x Pavilion 2025 GTM Benchmarks, via [Gradient Works](https://www.gradient.works/blog/2025-b2b-sales-performance-benchmarks). The "113% reduction" phrasing is mathematically odd (a reduction cannot exceed 100%) and is likely a relative-odds statement reported loosely. **Flag the wording; use the 47% vs 20% figures instead, which are internally coherent.**
- **89% of B2B buyers report a purchase deal stalled.** **[S]** — MarketSource 2024, via Gradient Works.
- **75% of B2B buyers taking longer to decide than in 2023.** **[S]** — SPOTIO 2024, via Gradient Works.
- **NO SOURCED BENCHMARK FOUND** for push rate or stalled-pipeline percentage specifically.

**traps:**
- **Close date is the least-governed field in the CRM.** Push rate measures rep close-date behavior first and buyer behavior second.
- **Mass close-date updates** at quarter end (a rep bulk-updating 20 deals to next quarter) register as 20 pushes in one action.
- **Pushed deals are systematically over-valued in forecast.** Reps rarely reduce amount when they push date, so a deal that has slipped three quarters still carries its original optimistic amount.
- **Aging is not always bad.** In a 9-month enterprise cycle, a deal 120 days in Evaluation is normal. Aging thresholds must be set per segment against actual stage-duration distributions, not imported.
- **Cleaning stalled pipeline drops coverage sharply**, which creates a political disincentive to clean. This is why stalled pipeline accumulates: the metric that would trigger cleanup is the one cleanup damages.

**related:** Sales Cycle (7), Forecast Accuracy (34), Pipeline Coverage (4), Weighted Pipeline (2).

---

# 34. Forecast Accuracy

**applies_to:** b2b

**definition:** How close the submitted revenue forecast came to actual results.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Absolute percentage error | \|Actual − Forecast\| ÷ Actual | The standard. Symmetric. |
| Signed error / bias | (Actual − Forecast) ÷ Actual | Reveals systematic optimism or sandbagging. **More useful than absolute error**, because direction is the actionable part. |
| Hit rate within band | Share of periods where error was within ±5% or ±10% | The version boards care about. |
| Forecast-category accuracy | Actual ÷ Commit, computed separately for Commit / Best Case / Pipeline | Diagnoses whether the judgment layer is calibrated. |
| Forecast accuracy by lock date | Error measured from week 1, week 4, week 8 forecasts | Reveals when the forecast becomes informative. |
| **Weighted-pipeline reconciliation** | Actual closed-won ÷ Weighted pipeline at period start | The specific test for whether your probability ladder is calibrated. Should equal 1.0. |

**inputs:** Snapshotted forecast submissions by date (this is the hard part; most CRMs overwrite rather than snapshot), actuals. Clari, BoostUp, and Salesforce Collaborative Forecasts snapshot natively; raw CRM reporting usually cannot reconstruct a historical forecast.

**application:** The credibility of the entire revenue function. Also the only honest audit of weighted pipeline.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** I attempted Clari, Forecastio, and Gartner-adjacent sources; all returned 404 or lacked disclosed methodology. Widely circulated figures on forecast accuracy in B2B sales (commonly quoted around "less than half of forecast deals close as forecast") trace to CSO Insights research from the 2010s that I could not verify at source. **Do not state a forecast-accuracy benchmark.**

One sourced adjacency: Ebsta advertises a forecast accuracy target of ±10% within six months as a product guarantee, not an industry benchmark. **[P]** — [Ebsta](https://www.ebsta.com/news-updates/ebsta-unveils-2025-gtm-benchmarks-report/). Cite it as a vendor claim only.

**traps:**
- **Absolute error hides bias.** A team that is 15% over one quarter and 15% under the next has 15% average error and zero bias. A team consistently 15% over has a structural problem. Report signed error.
- **Forecast accuracy is easy to fake by sandbagging.** A team that forecasts low and beats every quarter has excellent "accuracy" against a forecast that carries no information.
- **The forecast that gets measured is usually the last one**, submitted in the final week when the answer is nearly known. Measure the week-1 forecast to learn anything.
- **No snapshot, no metric.** If forecasts aren't stored immutably, accuracy cannot be computed retrospectively and every claim about it is unfalsifiable.
- **Small base:** in an enterprise motion where quarterly bookings are 10 deals, forecast error is dominated by whether one deal landed. Forecast accuracy below roughly 30 deals per period measures luck.

**related:** Weighted Pipeline (2), Deal Slippage (33), Pipeline Coverage (4), Stage Probability (3).

---

# 35. Multi-Threading / Contacts per Opportunity

**applies_to:** b2b

**definition:** The number of distinct stakeholders at the buying account engaged in a deal.

**formula_variants:**

| Variant | Formula | When |
|---|---|---|
| Contact roles per opportunity | Count of contact roles on the opportunity | Easiest, but depends on reps filling in contact roles, which they often don't. |
| Engaged contacts per opportunity | Distinct contacts with ≥1 two-way interaction | Far more reliable. Gong and Ebsta derive this from email and calendar data rather than CRM fields. |
| Single-threaded rate | Opps with exactly 1 engaged contact ÷ Open opps | The actionable version. A risk flag, not a vanity number. |
| Seniority coverage | Whether a C-level or economic buyer is engaged | Distinct from raw count and separately predictive. |
| Buying-group coverage | Engaged contacts ÷ estimated buying committee size | The Forrester-aligned version. |
| Bilateral engagement | Contacts who initiated contact, not just received it | The strongest signal; distinguishes real engagement from spray. |

**inputs:** Email and calendar activity capture (Gong, Ebsta, Salesloft, Salesforce Einstein Activity Capture), opportunity contact roles, enrichment for seniority. **CRM contact-role fields alone are not sufficient**; activity-derived data is materially better.

**application:** Deal risk scoring, forecast adjustment, and coaching. Also the honest reframe of marketing-influenced pipeline (metric 16): "how much of the buying committee have we reached" is actionable in a way that "did marketing touch this deal" is not.

**benchmark:**

- **Winning deals had 2x more buyer contacts than lost deals.** **[S]** — Ebsta x Pavilion 2025 GTM Benchmarks, via [Gradient Works](https://www.gradient.works/blog/2025-b2b-sales-performance-benchmarks).
- **Multi-threading raised win rates 130% on deals over $50K.** **[S]** — same source.
- **Winning deals had 67% larger internal teams involved.** **[S]** — same source.
- **Early decision-maker involvement raised win rate 55%.** **[S]** — same source.
- **Engaged C-suite raised upsell potential 189%.** **[S]** — same source.
- **6-10 stakeholders in an average B2B deal; 17+ in enterprise.** **[S]** — Gartner, as cited by Gradient Works.
- **78% of accounts remain single-threaded.** **[S/W]** — widely cited figure with no verifiable primary source found; treat as unverified.
- **42% higher close rates with multiple engaged contacts.** **[S/W]** — same caveat.

**traps:**
- **Reverse causality is severe.** Deals that were always going to win get more people involved because the buyer is serious. Multi-threading correlates with winning partly because winning causes multi-threading. Coaching reps to CC more people will not reproduce the 130% lift. **This is the most-misused correlation in B2B sales analytics.**
- **Contact-role data quality is poor.** Reps add contact roles retroactively on deals they won, which manufactures the correlation.
- **Counting CCs as engagement.** A recipient on a thread is not a stakeholder.
- **Threshold effects.** Going from 1 to 3 contacts matters enormously; 8 to 11 probably does not. The linear-lift framing overstates the value of marginal contacts.
- **Small base at the deal level:** a rep with 12 deals a quarter cannot be evaluated on average contacts per opportunity.

**related:** Win Rate (8), Marketing-Influenced Pipeline (16), Account Penetration (29), Stage Conversion (9).

---

# Cross-cutting: small-base fragility (read this before using any metric above)

The brief asked for this explicitly, and it deserves its own treatment because it invalidates more B2B pipeline reporting than any other single issue.

**The rule of thumb.** For a proportion metric like win rate or conversion rate, the standard error is roughly √(p(1−p)/n). At p=0.25:

| Closed opportunities (n) | 95% confidence interval on a 25% win rate |
|---|---|
| 10 | ±27 points (roughly 0% to 52%) |
| 25 | ±17 points |
| 50 | ±12 points |
| 100 | ±8.5 points |
| 400 | ±4 points |
| 1,000 | ±2.7 points |

**What this means operationally:**

- **Below ~50 closed opportunities in the period, a win rate is not a number, it's a range.** Quarter-over-quarter "win rate improved from 22% to 28%" on 40 deals is noise. Do not let a client act on it.
- **Below ~100 opportunities, do not report win-rate trends at all.** Roll to trailing twelve months, or report the raw counts.
- **For revenue-weighted metrics the problem is worse**, because deal size is right-skewed. One large deal moves value-weighted win rate, ASP, magic number, CAC ratio, and NRR simultaneously and in the same direction, which reads as five independent confirmations of improvement when it is one lucky deal.
- **NRR and GRR at the enterprise end are the most fragile.** A company with 40 customers averaging $250K sees one churned logo move GRR by 2.5 points and one large downsell move it further. Quarterly retention reporting in enterprise is close to meaningless; annual cohort reporting is the minimum.
- **Rep-level metrics are almost always statistically empty.** An enterprise AE closing 12 deals a year cannot be evaluated on win rate, conversion rate, or ASP with any confidence. Rep-level evaluation should use activity and process compliance (which has high n) plus qualitative call review, not outcome ratios.
- **The practical test to give any client:** before reporting a ratio, state the denominator count next to it. If the denominator is under 30, report the counts instead of the ratio. This one habit eliminates most of the false signal in B2B pipeline reporting.

---

# Metrics I considered and excluded, with reasons

| Metric | Why excluded |
|---|---|
| **CAC Payback Period** | Genuinely belongs to the unit-economics / SaaS finance family, not pipeline and demand gen. It's referenced here (Benchmarkit formula: S&M ÷ (New Customer ARR × Gross Subscription Margin) × 12, **[P]**) because CAC Ratio is its sibling, but the full treatment including the private-vs-public definitional mismatch belongs elsewhere. Note for the corpus owner: Benchmarkit documents that private companies compute CPP on new-customer ARR while public companies compute it on net-new-implied ARR including churn and expansion, which makes private-to-public CPP comparison invalid. **[P]** That trap should live wherever CAC payback lands. |
| **LTV:CAC** | Unit-economics family. Benchmarkit's formula and their finding that CLTV:CAC *declines* above $20M ARR **[P]** is worth capturing there. |
| **Rule of 40** | Company-level capital efficiency, not sales efficiency. Sourced data available if wanted: US median 9% vs Canada/EMEA 23-25% in 2024 **[P]**, and Rule of 40 decreasing above $50M ARR, which Benchmarkit flags as counterintuitive and unexplained. |
| **NRR and GRR as standalone metrics** | Retention family. Covered here only in their contract-basis renewal form (metric 32), since that's the sales-and-CS-operating version. |
| **Churn rate** | Retention family. |
| **ARR per FTE, ARR:Capital Raised** | Capital efficiency family. |
| **Gross margin** | Finance family. |
| **Rep activity metrics (dials, emails sent, sequence touches)** | Genuinely a management-and-coaching layer beneath this family. Included partially inside Speed to Lead (27) where the outcome link is sourced. Full treatment of dial counts and email reply rates is an SDR-operations topic, and the data quality on published benchmarks is uniformly poor. |
| **Cost per click, MQL by campaign, channel-level media metrics** | Paid-acquisition family. Cost per opportunity (18) is the boundary object and I've kept that one. |
| **Win/loss reason analysis and competitive win rate** | Qualitative research discipline rather than a metric with formula variants, though competitive-only win rate is flagged as a trap inside metric 8. |
| **Territory and quota capacity models** | Planning methodology, not a metric. Ramped Rep Equivalents (20) is the metric that comes out of it. |
| **Sales Accepted Opportunity (SAO)** | Folded into Funnel Stage Volume (12). It's a fourth name for the SQL/SQO gate and adding it as a separate entry would reinforce exactly the definitional sprawl the corpus should be warning against. |
| **Bookings vs Billings vs Revenue vs ARR** | Not a metric, a definitional prerequisite. It's flagged as a trap inside metrics 1, 10, and 21. Worth a standalone glossary entry in the app rather than a metric card. |
| **Free-to-paid conversion, PQL (product qualified lead)** | PLG/consumer family. PQL arguably straddles, but its formula variants and benchmarks live with product analytics, not CRM pipeline. |
| **Net Promoter Score, CSAT** | Not pipeline metrics. |

---

# Cross-family dependencies

**This family consumes from:**

| Upstream family | What this family needs from it | Where it lands |
|---|---|---|
| **Paid acquisition / channel performance** | Spend by channel, reconciled to the GL | Cost per Stage (18), CAC Ratio (23), Magic Number (22) |
| **Web and content analytics** | Sessions, form fills, source attribution | Funnel Stage Volume (12), Lead-to-Opportunity (13) |
| **Unit economics** | Gross margin, LTV, CAC payback | CAC Ratio (23), the interpretation of Magic Number (22) |
| **Retention and expansion** | NRR, GRR, churn, downsell | Expansion Pipeline (31), Renewal Rate (32), Burn Multiple (24) |
| **Finance** | Net burn, S&M expense (fully loaded), revenue recognition | Magic Number (22), Burn Multiple (24), CAC Ratio (23) |
| **Product analytics (PLG motions)** | PQL definitions, activation, usage signals | ICP Fit Score (28), Funnel Stage Volume (12) |

**This family produces for:**

| Downstream family | What it hands over |
|---|---|
| **Unit economics** | New ARR, expansion ARR, ACV, win rate (the inputs to CAC payback and LTV:CAC) |
| **Financial planning** | Forecast, pipeline coverage, quota attainment, ramp-adjusted capacity |
| **Retention** | Expansion pipeline and renewal-opportunity volume |
| **Paid acquisition** | Cost per pipeline dollar and win rate by source, which is the only defensible basis for channel budget allocation |
| **Executive / board reporting** | Magic number, burn multiple, CAC ratio, growth rate |

**The three hard boundaries worth encoding in the app:**

1. **ACV is the master variable.** Benchmarkit states explicitly that CAC Ratio, CAC Payback, GRR, and NRR should each be evaluated in the context of ACV because ACV is the attribute most correlated with each. **[P]** Any benchmark presented in the app without an ACV cut should carry a warning.
2. **Sales cycle length is the clock that governs every timing relationship** across families. It determines the lag between paid-acquisition spend and pipeline, between pipeline and revenue, and therefore how far off a same-period CAC calculation will be. Nothing in this family or the acquisition family can be interpreted period-over-period without it.
3. **The CRM object model is the substrate.** Unlike consumer metrics, which sit on event streams with reasonably standard semantics, every metric in this family sits on Opportunity, Stage, Lead Source, and Close Date, four fields that each company configures independently and that reps fill in under incentive pressure. **Teach the corpus user to ask "who configured this field and what are they measured on" before interpreting any number in this family.** That question resolves more B2B metric disputes than any formula.

agentId: a7d78e19c62cfc53d (use SendMessage with to: 'a7d78e19c62cfc53d', summary: '<5-10 word recap>' to continue this agent)
<usage>subagent_tokens: 181141
tool_uses: 68
duration_ms: 1122436</usage>