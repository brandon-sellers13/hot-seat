All four research agents are back. Here is the corpus.

---

# RETENTION AND CHURN: Metric Corpus

**Sourcing note.** Every benchmark below carries its publisher, publication date, and the year of the underlying data. Where I could not verify a figure against a primary source, the field reads NO SOURCED BENCHMARK FOUND. Three widely-circulated numbers were checked and found to be fabricated by content aggregators; they are flagged inline so you can refuse them when a client cites them.

**Corrections worth carrying into every client conversation:**
1. The triplet "Enterprise >$100K ACV = 118% NRR / mid-market = 108% / SMB = 97%," attributed variously to SaaS Capital, Benchmarkit, and ICONIQ, appears in **none** of those primary sources. SaaS Capital's actual >$250K ACV median is 106%; Benchmarkit's is 107%. No primary source has any ACV tier at a 118% median.
2. "Public SaaS NDR peaked at 125% in Q2 2022, troughed 107% in Q4 2024" is wrong on all four values. Meritech's actual chart: peak **118% in Q3'22**, trough **106% in Q3'25**.
3. Circulating mobile retention tables ("iOS D1 23.9%, D7 6.89%") are internally contradictory across sources and none trace to a primary publisher page.

---

## 1. Customer (Logo) Churn Rate

**applies_to:** both

**definition:** The share of customer accounts that stop being customers during a period, counted as accounts rather than dollars.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Simple / start-of-period | `Churned customers in period ÷ Customers at start of period` | Default for slow-growth or steady-state books. Used by Baremetrics and a16z. |
| Adjusted denominator | `Churned ÷ (Start + 0.5 × New)` or `Churned ÷ average(Start, End)` | Corrects the growth artifact for a fixed period length, but breaks when period length changes or churn is unevenly distributed within the period. |
| Weighted daily churn (the "Shopify formula") | Weighted average of daily churn rates across the period | The only variant that produces comparable results across different period lengths and where an increase reflects an actual behavior change. Shopify Engineering's recommended answer. |
| Cohort / tenure-gated | Same as simple, but restricted to customers with tenure >90 days | Removes the new-customer mix effect that otherwise dominates the aggregate rate. |
| Annualized from monthly | `1 − (1 − m)^12` | Any time you convert. Never multiply by 12. |

**Practitioners genuinely disagree here.** Baremetrics and a16z ship start-of-period. ChartMogul ships both and named its second option after the Shopify post. Shopify Engineering's position is that start-of-period is actively misleading for a growing company. Direction of the bias is opposite for the two fixes: start-of-period **overstates** churn for a fast grower (new customers can churn but were never in the denominator); average-of-start-and-end **understates** it (dilutes the denominator with customers who had only partial exposure to risk).

**inputs:** Subscription start/end dates per account, account status transitions. Source: billing system (Stripe, Recurly, Chargebee, RevenueCat) or CRM (HubSpot, Salesforce). Not analytics.

**application:** Drives CS headcount and coverage ratios, renewal forecasting, and the denominator of customer lifetime. Feeds LTV, payback, and the quick ratio.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| All subscription (monthly, blended) | 3.27% total, of which voluntary 2.41% / involuntary 0.86% | Recurly, Churn Rate Benchmarks research page (undated, references 2024; no N stated) |
| B2B verticals (monthly) | 3.8% average | Recurly, same page |
| B2C / DTC verticals (monthly) | 6.5% average | Recurly, same page |
| Subscription apps and SaaS (monthly, total) | ~10% total, ~7% voluntary, ~1% involuntary | Churnkey, State of Retention 2025 (pub. 2025, data 2024, 1,000+ companies, 15M subscriptions) |
| B2B SaaS customer retention by ARPA, 75th percentile | <$10/mo: 63%; $50-100/mo: 79%; >$500/mo: 86% (annual) | ChartMogul SaaS Retention Report 2023 (data 2022, N=2,500+). **Four years stale, label it.** |
| 6-month user retention, good vs great | Consumer social 25/45; consumer transactional 30/50; consumer SaaS 40/70; SMB-midmarket SaaS 60/80; enterprise SaaS 70/90 | Lenny Rachitsky, "What is good retention?", 9 June 2020, N=20 practitioners. **Six years stale.** |

Segmented monthly logo churn by SMB / mid-market / enterprise: **NO SOURCED BENCHMARK FOUND.** No primary publisher in the 2024-2026 window publishes it. SaaS Capital says explicitly it focuses on dollars, not accounts; Benchmarkit's 2025 report contains zero logo metrics; High Alpha's scorecard has no logo row. Every "3-5% SMB / 1-2% enterprise" table circulating is unsourced. Do not use one.

**traps:**
- **Monthly to annual is not multiplication.** 5% monthly is 46.0% annual, not 60%. 8% monthly is 63.1% annual, not 96%. At 10% monthly, the naive method returns 120%, which is impossible. (Churnkey, 18 Aug 2024; RetentionCheck, updated 31 Mar 2026.)
- **Simpson's paradox in the mix.** New customers churn harder than mature ones. Your blended rate rises whenever the new-to-mature ratio rises, even if both segments are improving. This is the deepest problem and it is upstream of the denominator argument.
- **Growth flatters the number.** Shopify's worked example: identical churn behavior in two consecutive months reads 6.25% then 5.87%, a 38bp phantom improvement, purely from acquisition timing.
- **Calendar length contaminates.** February's 28 days versus March's 31 is enough to manufacture a trend.
- **Logo churn ignores revenue concentration.** Losing 20 of 100 customers is 80% logo retention and could be 50% GRR if the 20 were your largest.
- **A "churned" account that downgrades to free is not counted**, so freemium ladders hide churn in the logo number that shows up in the revenue number.

**related:** Customer retention rate, gross revenue churn, survival rate, hazard rate, average customer lifetime, quick ratio.

---

## 2. Customer (Logo) Retention Rate

**applies_to:** both

**definition:** The share of customer accounts still active at the end of a period, out of those active at the start.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Complement of churn | `1 − customer churn rate` | Only valid when numerator components and denominator base match exactly. |
| Direct cohort | `Customers from cohort still active at t ÷ Customers in cohort at t=0` | The honest version. Required whenever reactivations exist. |
| Including reactivations | `(Retained + Reactivated) ÷ Starting customers` | Rare, and it breaks the complement relationship with churn. Say so if you use it. |
| Net logo retention (customer-count NRR) | `(Start + Reactivated − Churned) ÷ Start` | Useful only for seat-based or multi-entity accounts. Not standard. |

**inputs:** Same as churn. Billing system.

**application:** Board reporting, CS compensation design, renewal capacity planning.

**benchmark:** See metric 1. The Lenny/Casey 2020 table is the most cited practitioner benchmark and it is six years old.

**traps:**
- **Retention rate and `1 − churn rate` are not complements in at least six documented cases:** reactivations sit in one numerator and not the other; cohort denominators differ from period-active denominators; intra-period signup-then-cancel appears in the churn numerator but never in the retention denominator; gross versus net component sets differ by vendor; logo and revenue versions get conflated; and period-length nonlinearity means `(1 − monthly)^12 ≠ 1 − annual` under heterogeneity.
- **Choosing retention framing versus churn framing changes perceived magnitude.** Going from 90% to 92% retention sounds like a 2-point move; it is a 20% reduction in churn and roughly a 25% increase in lifetime. Executives systematically under-react to the retention framing.

**related:** Customer churn, GRR, survival rate.

---

## 3. Gross Revenue Churn Rate (Gross MRR / ARR Churn)

**applies_to:** both

**definition:** The share of starting recurring revenue lost to cancellations and, under most conventions, downgrades, ignoring any expansion.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Including contraction (Camp A, majority) | `(Churn MRR + Contraction MRR) ÷ Starting MRR` | ChartMogul's default and Baremetrics' definition. The right default when downgrades are a real leak. |
| Cancellations only (Camp B) | `Churn MRR ÷ Starting MRR` | ChartMogul ships this as an explicit toggle and warns it "will lower your churn numbers." Use when you report contraction separately. |
| Ambiguous | a16z's "MRR lost in a given month ÷ MRR at beginning of month" | a16z never says whether "lost" includes downgrades. Do not assume. |

**This is a genuine, unresolved industry split, and the delta is not small.** In ChartMogul's own worked example, including contraction doubles the reported figure from 10% to 20%. "Gross revenue churn" is not a well-defined term without a stated contraction policy.

**inputs:** MRR/ARR by customer at period start and end, decomposed into churn, contraction, expansion. Source: billing system with revenue-movement tagging.

**application:** The leak-rate input to GRR. Determines how much new ARR you must sell just to stand still.

**benchmark:** Read off GRR (metric 4) as `1 − GRR`, but only if the source's GRR ceiling is enforced at 100%, which it is at SaaS Capital, Benchmarkit, and ChartMogul.

**traps:**
- **The contraction question changes the number by up to 2x.** Always ask which camp a quoted figure is in.
- **Plan-switch handling is a third, orthogonal degree of freedom.** ChartMogul offers three treatments for a subscriber leaving a filtered segment: 100% revenue churn (full MRR to churn), proportional retention (only the difference on a downgrade), or excluded entirely. Segment-level churn is therefore not comparable across tools, or even across settings within one tool.
- **Failed payments may or may not be in here** depending on whether your system writes them to churn immediately or after the dunning window closes.

**related:** GRR, contraction rate, net revenue churn, involuntary churn.

---

## 4. Gross Revenue Retention (GRR / Gross Dollar Retention)

**applies_to:** both, but it is a B2B-native metric

**definition:** The share of a starting cohort's recurring revenue you still have a year later, with every customer's revenue capped at its starting level so upsell cannot mask losses.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Capped-cohort (SaaS Capital) | Same cohort quotient as NRR, but "set each customer's 2024 MRR to be less than or equal to their 2023 MRR" | The cleanest construction. Mathematically cannot exceed 100%. |
| Component subtraction | `(Starting ARR − Churn − Contraction) ÷ Starting ARR` | Equivalent when done correctly, and easier to compute from a movement report. |
| Exclude-expansion (Benchmarkit) | Cohort ARR excluding cross-sell, up-sell, and price increases | Same result, different bookkeeping. |
| Period-based, non-cohort | `1 − gross revenue churn` for the period | Faster, but drifts from the cohort answer whenever the customer base is changing shape. |

**inputs:** Customer-level ARR at t and t−12, with revenue movements classified. Billing system plus a revenue-movement taxonomy.

**application:** The single best measure of product stickiness net of sales motion. Investors weight it heavily because, unlike NRR, it cannot be bought with a pricing lever.

**benchmark:**

| Cut | Median GRR | Source |
|---|---|---|
| Private B2B SaaS by ACV: <$12k / $12-25k / $25-50k / $50-100k / $100-250k / >$250k | 90% / 91% / 91% / 90% / 91% / **95%** | SaaS Capital, pub. 18 Sept 2025, data Dec 2023-Dec 2024, private B2B SaaS >$1M ARR |
| Private B2B SaaS, all (CY-22 / CY-23 / CY-24) | 90% / 89% / **88%** | Benchmarkit, 2025 B2B SaaS Performance Metrics, pub. May 2025, N=225 |
| By ARR band: <$1M / $1-5M / $5-20M / $20-50M / $50-100M / >$100M | 90% / 90% / 88% / 85% / 89% / 89% | Benchmarkit 2025, N=225 |
| By pricing model: subscription / usage-based / subscription+usage | 88% / **92%** / 88% | Benchmarkit 2025, N=225, first year published |
| By ARR band (median "good" / upper-quartile "great") | <$1M 92/100; $1-5M 92/95; $5-20M 88/95; $20-50M 90/95; >$50M 88/90 | High Alpha, 2025 SaaS Benchmarks (9th annual, the OpenView lineage successor), pub. 11 Nov 2025, N=800+ |
| Private SaaS, KeyBanc | 86% in 2023, expected to "approach the 90% threshold" | KBCM 16th annual SaaS survey press release, 13 Nov 2025 |
| Bootstrapped $3M-$20M ARR | 91% median, 100% at 90th percentile | SaaS Capital, pub. 24 Apr 2026, N=1,000+ |
| AI-native by price band: >$250/mo / $50-249 / <$50 | 70% / 45% / 23% | ChartMogul, "The AI churn wave," pub. 2025, data through Sept 2025, N~200 AI-native |

High Alpha's summary line is the one to remember: retaining nine out of ten customers is the norm across every ARR band.

**traps:**
- **The 100% ceiling is enforced by construction, so GRR can never flatter you the way NRR can.** That is the point, and it is why a company with 130% NRR and 82% GRR is a different business from one with 110% NRR and 96% GRR.
- **Sub-$5M ARR GRR reads artificially high** because most of the base has not hit a first or second renewal yet. Benchmarkit flags this directly.
- **GRR is not customer retention.** Concentration breaks the equivalence completely.
- **Self-reported survey versus computed-from-billing is the largest single source of divergence in this whole family.** SaaS Capital, Benchmarkit, KeyBanc, and High Alpha are self-reported surveys of companies that opted in. ChartMogul computes centrally from actual billing data across its customer base. That is why ChartMogul's B2B median NRR is 82% while everyone else's is 101-104%. Neither is wrong. They measure different populations with different instruments. Never put them in the same table.

**related:** Gross revenue churn, NRR, NRR-GRR gap, logo retention.

---

## 5. Net Revenue Retention (NRR / NDR / Dollar-Based Net Expansion Rate)

**applies_to:** both, though the >100% version is structurally B2B

**definition:** What a fixed cohort of existing customers is worth today versus a year ago, after expansion, contraction, and churn, excluding anyone new.

**formula_variants.** This is the metric with the most degrees of freedom in the entire family. I verified four public-company definitions directly from their SEC filings; all four differ.

| Variant | Formula / construction | When it's right |
|---|---|---|
| Cohort quotient, single-month anchor (SaaS Capital) | `MRR in Dec 2024 only from customers who were customers in Dec 2023 ÷ Total MRR in Dec 2023` | The tightest private-company construction because one formula is imposed on all respondents. |
| Component build-up (ChartMogul default) | `(Starting MRR + Expansion + Reactivation − Contraction − Churn) ÷ Starting MRR` | Note **reactivation is in the numerator by default** and is a toggle. This is a real trap. |
| Weighted TTM average of monthly point-in-time rates (Datadog) | ARR-based, current vs 12 months prior, excludes new customers, then weighted average of trailing 12 monthly rates | Smooths month-level noise in usage-based businesses. |
| Simple TTM average of monthly rates (Zoom) | Same ARR construction, but a **simple** (unweighted) average, restricted to Enterprise customers | Different number from Datadog's on identical data. |
| Two-year cohort quotient on recognized revenue (Snowflake) | Cohort = customers under capacity contracts active in the **first month of year 1** of a trailing two-year window; product revenue year 2 ÷ year 1; churned customers stay in at $0 | Right for consumption businesses with long ramps. Snowflake discloses it structurally decays as the base matures. |
| Quarterly year-over-year, averaged (Twilio) | Revenue from year-ago-quarter Active Customer Accounts, this quarter vs same quarter prior year; averaged across quarters for longer periods | Handles seasonality; not comparable to ARR-based versions. |

Twilio states the problem in its own 10-K: its metrics are "not based on any standardized industry methodology and are not necessarily calculated in the same manner or comparable to similarly titled measures presented by other companies."

**Zoom is the cleanest documented case of a definition silently changing under a constant metric name.** Through FY2021 the cohort was "customers with more than 10 employees"; it is now "Enterprise customers." Anyone charting Zoom's NDR across that boundary is plotting two different metrics on one line.

**Where everyone agrees:** new logos are excluded, in all six variants and all four filings. An "NRR" that includes new customers is a growth rate, not NRR.

**inputs:** Customer-level ARR or MRR at two points, movement classification, and a documented cohort-anchoring rule. Billing plus finance.

**application:** The highest-leverage single number in B2B SaaS valuation. It also determines how much of next year's growth you get for free.

**benchmark:**

| Cut | Median | Quartiles | Source |
|---|---|---|---|
| Private B2B by ACV: <$12k / $12-25k / $25-50k / $50-100k / $100-250k / >$250k | 98 / 103 / 102 / 104 / 102 / **106%** | e.g. <$12k: 90 (p25) to 106 (p75); >$250k: 102 to 110 | SaaS Capital, pub. 18 Sept 2025, data 2024, private B2B >$1M ARR |
| Private B2B by ACV: <$1K / $1-5K / $5-10K / $10-25K / $25-50K / $50-100K / $100-250K / >$250K | 100 / 99 / 100 / 101 / 105 / 104 / 102 / **107%** | >$250K: 96 to 115 | Benchmarkit, pub. May 2025, data CY-2024, N=228 |
| Private B2B, all | **101%** (CY-24), down from 105% in CY-21 | p75 held at 110-111% throughout | Benchmarkit 2025 |
| By ARR band (median / upper quartile) | <$1M 100/116; $1-5M 104/110; $5-20M 103/115; $20-50M 103/110; >$50M 101/108 | | High Alpha, pub. 11 Nov 2025, N=800+, data 2025 |
| By pricing model | Hybrid subscription+usage **110%**, above usage-only and subscription-only | | Benchmarkit 2025, N=228 |
| Public software | Peak **118% (Q3'22)**, seven-quarter plateau at 110%, trough **106% (Q3'25)**, rebound **109% (Q4'25)** | | Meritech Software Pulse, pub. 9-10 Apr 2026, 100+ public software companies, from company filings |
| Private SaaS, KeyBanc | ~101% (15th annual, data 2023); "remained above 100%" (16th, Nov 2025) | | KBCM press releases, 23 Oct 2024 and 13 Nov 2025 |
| Bootstrapped $3M-$20M ARR | 103% median, 117.9% at p90 | | SaaS Capital, 24 Apr 2026, N=1,000+ |
| Computed from billing (not self-reported): B2B / B2C / AI-native | **82%** / 49% / 48%; B2B upper quartile 97% | | ChartMogul, "The AI churn wave," 2025 data through Sept, N~2,700 / 600 / 200, $250K ARR floor |
| 12-month NRR, good vs great | Consumer SaaS 55/80; bottom-up SaaS 100/120; land-and-expand VSB 80/100; SMB-midmarket 90/110; enterprise 110/130 | | Lenny Rachitsky, 9 June 2020, N=20 practitioners. **Six years stale.** |
| Aspirational range | "~110-120%" | | ICONIQ Growth, State of Software 2025. No segmentation, N, or quartiles published. |

**The public-private gap is roughly 6 to 8 points**, and SaaS Capital says benchmarking private against public "is of limited usefulness" because of scale.

**Why it matters (the pipeline link).** SaaS Capital's 2024 data, median growth rate by NRR band: below 90% NRR grows 15%; 100-110% grows 21%; 110-120% grows 30%; 120-130% grows 38%; above 130% grows 50%. Population median growth was 24%.

**traps:**
- **Cross-company NRR comparison is not like-for-like.** Four public companies, four revenue bases, four aggregation methods, at least two cohort-anchoring rules.
- **Reactivations may be in your numerator without your knowing.** ChartMogul includes them by default. That means customers who left and came back inflate a metric that is supposed to measure a fixed cohort.
- **A single large expansion can carry the whole number.** NRR is dollar-weighted, so a 130% NRR built on one account expanding while 40% of logos churn is a concentration risk dressed as strength. Always read NRR alongside GRR and logo retention.
- **Population floor drives the median hard.** ChartMogul's floor is $250K ARR, SaaS Capital's is $1M, KeyBanc's respondents median ~$26M. Lower floors pull medians down sharply.
- **Consumption businesses see NRR decay structurally as cohorts mature**, which Snowflake discloses as an expectation, not a failure.
- **Averaging monthly rates and taking one 12-month quotient give different answers** on identical data. Datadog weights, Zoom does not.

**related:** GRR, NRR-GRR gap, expansion rate, contraction rate, net revenue churn, quick ratio.

---

## 6. NRR minus GRR Gap (Expansion Spread)

**applies_to:** b2b

**definition:** The number of points of net retention that come from expanding existing customers rather than from keeping them.

**formula_variants:**
- `NRR − GRR`, in percentage points. Only one construction, but it is only meaningful when both sides use the same cohort and the same period.

**inputs:** Both metrics computed identically. Billing plus finance.

**application:** Separates "customers love us" from "we have a good pricing lever." A gap that is too narrow means no expansion motion; too wide usually means the retention story is being carried by a handful of accounts.

**benchmark:** Average gap "a bit more than twelve percentage points"; normal range 8 to 20 points; under 5 points is unhealthy and reported by fewer than 10% of companies; over 20 is abnormal and over 30 is rare. SaaS Capital, pub. 1 Aug 2023. Sample size and data year not stated on the page, and this is older than the rest of the corpus.

**traps:**
- **A widening gap can mean expansion is working or that GRR is collapsing underneath it.** The gap alone cannot tell you which. Always show both levels.
- **Pricing changes inflate the gap without any behavior change.** A 7% list-price increase applied at renewal lands entirely in expansion.

**related:** NRR, GRR, expansion rate, contraction rate.

---

## 7. Expansion Rate / Expansion Revenue Share

**applies_to:** b2b primarily; consumer analogue is upgrade and cross-sell rate

**definition:** How much additional recurring revenue existing customers add, either as a rate on the starting base or as a share of all new revenue.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Expansion rate | `Expansion MRR ÷ Starting MRR` | Comparable to churn rate; use when modeling NRR components. |
| Expansion share of new ARR | `Expansion ARR ÷ (New + Expansion ARR)` | The GTM-planning version. Tells you how much of growth the CS motion owns. |
| Expansion share of net new ARR | `Expansion ÷ (New + Expansion − Churn − Contraction)` | Rarer; can exceed 100% when churn is high. |
| Seat versus price versus product decomposition | Split expansion into volume, rate, and cross-sell | The version that actually drives action. Most companies never build it. |

**inputs:** Movement-tagged ARR changes plus a reason code. Billing plus CRM.

**application:** Determines the split of growth investment between new-logo acquisition and customer success or account management. Feeds NRR and quick ratio.

**benchmark:**

| Cut | Median | Source |
|---|---|---|
| Expansion ARR as % of total new ARR: CY-22 / CY-23 / CY-24 | 25% / 35% / **40%** (p25 21%, p75 60% in CY-24) | Benchmarkit, pub. May 2025, N=81 |
| Expansion as % of growth ARR by ARR band: <$1M / $1-5M / $5-20M / $20-50M / $50-100M / >$100M | 13 / 21 / 37 / 38 / 58 / 67% | Benchmarkit 2025, N=81. The >$100M cohort is **only six companies**. |
| Expansion share of net new ARR by ARR band: <$1M / $1-5M / $5-20M / $20-50M / >$50M | 15 / 23 / 34 / 40 / **60%** | High Alpha, pub. 11 Nov 2025, N=800+ |

Two independent sources converge on the same structural fact: expansion crosses 50% of new ARR somewhere past $50M ARR.

**traps:**
- **Price increases are not expansion in any product sense**, but every system books them there. Decompose or the metric tells you nothing about product value.
- **Expansion measured on a shrinking base looks better than it is.** If churn removed the weakest accounts, the survivors expand more, which is composition, not performance.
- **Usage-based expansion is not durable the way seat expansion is.** It reverses on the next usage dip, which shows up as contraction rather than churn.

**related:** NRR, contraction rate, quick ratio, NRR-GRR gap.

---

## 8. Contraction (Downgrade) Rate

**applies_to:** both

**definition:** Recurring revenue lost from customers who stayed but pay less, through seat reductions, plan downgrades, or usage declines.

**formula_variants:**
- `Contraction MRR ÷ Starting MRR`, the standard.
- Embedded inside gross revenue churn (ChartMogul default, Baremetrics) rather than reported separately.
- Inferred as `GRR_cancellations_only − GRR_including_contraction` when the vendor only ships one of the two.

**inputs:** Movement-tagged MRR decreases that are not cancellations. Billing.

**application:** Early warning. Contraction usually precedes churn by one to three renewal cycles, so it is the leading indicator that gross churn is a lagging one.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** No primary publisher in this set reports contraction as a standalone metric. It is always embedded in the NRR-minus-GRR relationship. The only legitimate proxy is SaaS Capital's gap analysis (metric 6), which is a 2023 article with no segmentation.

**traps:**
- **It hides inside gross churn under the majority convention**, so companies that report "gross churn" without a contraction policy are reporting an unknown blend.
- **Seat-based contraction at a healthy account (a customer's own layoffs) is macro, not product**, and pooling it with dissatisfaction-driven downgrades destroys the signal.
- **In usage-based pricing, contraction and normal seasonality are indistinguishable** without a same-customer year-over-year view.

**related:** Gross revenue churn, NRR, expansion rate, net revenue churn.

---

## 9. Net Revenue Churn Rate

**applies_to:** both

**definition:** Revenue lost to cancellations and downgrades, net of what existing customers added, as a share of the starting base. It can go below zero.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| ChartMogul standard | `(Churn + Contraction − Expansion − Reactivation) ÷ Starting MRR` | Default in ChartMogul. **Includes reactivation**, which a16z's version does not. |
| a16z | `(MRR lost − MRR from upsells) ÷ Starting MRR` | No reactivation term at all. Different metric on the same data whenever anyone reactivates. |
| Complement of NRR | `1 − NRR` | Only when both use identical component sets and base. Frequently false. |

**inputs:** Full movement decomposition. Billing.

**application:** The compact expression of whether your installed base is self-funding. Negative net revenue churn is David Skok's "negative churn," where expansion exceeds losses and the base grows without a single new logo.

**benchmark:** Read from NRR. Negative net churn corresponds to NRR above 100%, which per SaaS Capital's 2024 data is roughly the median for ACVs above $12k and is not the median for the smallest ACV band.

**traps:**
- **a16z's own warning is the one to carry:** "Gross churn estimates the actual loss to the business, while net revenue churn understates the losses, as it blends upsells with absolute churn." Never lead with net churn alone.
- **The reactivation term differs by vendor**, and ChartMogul documents that removing it "will raise your churn numbers." Two tools, same data, different answer.

**related:** NRR, gross revenue churn, expansion, contraction.

---

## 10. Cohort Retention Curve and the Retention Triangle

**applies_to:** both

**definition:** The retention rate of a fixed acquisition cohort plotted against time since acquisition, usually rendered as a triangular heatmap with cohorts as rows and age as columns.

**formula_variants:**
- **Cell value:** `Cohort members meeting the retention criterion at age t ÷ Cohort size at t=0`. The denominator is constant across the row; that is what makes it a cohort curve rather than a period metric.
- **Aggregate / "All Users" row:** uses a *variable* denominator (only cohorts that have actually reached age t). Amplitude documents this explicitly, and it means the aggregate row is not the sum of the cohort rows.
- **Revenue-weighted variant:** replace user counts with cohort MRR. This is the cohort form of NRR/GRR.
- **Kaplan-Meier variant:** see metric 15. Uses partial observation instead of discarding immature cohorts.

**inputs:** Event stream with a stable user or account identifier, a defined start event, and a defined return event. Amplitude, Mixpanel, or a warehouse.

**application:** The primary product-market-fit instrument. Feeds LTV via area under the curve, and sets the ceiling on steady-state actives.

**benchmark:** Curve *shape* has no benchmark; endpoint benchmarks are in metrics 12 and 17.

**traps:**
- **Reading the immature diagonal as a trend is the single most common error.** The newest cohorts have not had time to complete later intervals. Amplitude warns that while an analysis is in progress "the graph can curve up and appear to increase over time," which is the opposite of the true shape, and marks incomplete cells with an asterisk.
- **Row sums will not reconcile to the "All Users" row**, because incomplete cells are excluded from the aggregate. Anyone reconciling by hand concludes the tool is broken.
- **The denominator driving the headline number is not displayed in the breakdown table.** Amplitude says so directly.
- **Changing the return event silently changes the whole curve.** "Opened app" and "completed key action" produce different asymptotes and different conclusions about PMF.
- **The denominator changes by business model, and nobody labels it.** Lenny's benchmark study uses registered users for consumer social and users-with-at-least-one-transaction for consumer transactional. Those two categories were never comparable.

**related:** Retention asymptote, N-day retention, survival rate, hazard rate, LTV.

---

## 11. Retention Curve Asymptote (Terminal / Plateau Retention)

**applies_to:** both, primarily consumer

**definition:** The level at which a cohort's retention curve stops falling, representing the fraction of any acquired cohort you keep indefinitely.

**formula_variants:**
- **Empirical:** the value of the curve where period-over-period decay falls below a chosen threshold (commonly <1 point per period for three consecutive periods). No standard threshold exists.
- **Fitted (shifted-beta-geometric):** fit a beta-geometric survival model to observed cohort retention and read the projected limit. Fader and Hardie's method, and the only one that gives you an asymptote before you have observed it.
- **Steady-state implication:** stable retained base ≈ `new users per period × area under the retention curve`. This is the version that matters commercially.

**This metric has NO consensus definition.** There is no agreed threshold for "flat," no agreed number of periods, and no agreed fitting method. It is the highest-value card in this family precisely because everyone invokes it and nobody defines it.

**inputs:** Multiple mature cohorts, ideally 12+ periods observed. Analytics or warehouse.

**application:** Determines whether acquisition spend compounds or leaks. Casey Winters' framing: "a flattened retention curve of your key action at the designated frequency plus month over month growth in new customers is the best way I have found to measure true product/market fit."

**benchmark:** No published asymptote benchmark exists. The best available quantitative evidence of flattening is RevenueCat's renewal-cycle data, not a VC essay: annual plans run 23-40% at first renewal, 44-64% at second, 56-70% at third; weekly plans run 35-58%, then 67-75%, then 74-91%. (RevenueCat State of Subscription Apps 2026, pub. March 2026, data 2025, N=115,000+ apps.)

Casey Winters' threshold framing, from "Casey's Guide to Finding Product/Market Fit": "Some companies can scale with 10% retained users, and some may need 40%, all depending on the strength of the acquisition loop." There is no universal number.

**traps:**
- **This is the highest-value trap in the family.** Fader, Hardie, Liu, Davin and Steenburgh (January 2018) show that flattening is what you get *automatically* from a heterogeneous population with **constant** individual churn probabilities: "the phenomenon of increasing cohort-level retention rates is purely due to cross-sectional heterogeneity; an individual customer's propensity to churn does not change over time." High-churn customers leave first, leaving an ever-larger share of low-propensity customers. A flattening curve is therefore evidence about the **variance of your acquisition mix**, not proof that anything you did made the product stickier. "Our curve is flattening" is not evidence that an intervention worked.
- **Curves do not smile on usage.** Andrew Chen, September 2025: "What you never see is a curve that starts high, then goes low, then becomes high again. That's not possible." He names only two exceptions: extremely hardcore products, and genuine network effects that reactivate old users. The smile you see in the wild is almost always a *revenue* curve, because "revenue retention expands, while usage retention shrinks." A usage curve that smiles should be treated as a measurement artifact until proven otherwise.
- **The golden-cohort effect caps you.** Chen: "Retention gets worse as users expand and grow. The best users are early and organic." The asymptote measured on early cohorts is an upper bound on later, broader ones.
- **You cannot A/B test your way there.** Chen: "You can't fix bad retention. No, adding more notifications will not fix your retention curve." The asymptote is mostly set by category.
- **Bracket-width artifacts fake a flat curve.** Amplitude's own example shows Day 4-6 bracket retention at 99.7% sitting *above* Day 1-3 at 75.1%, which is impossible for a true decay curve.

**related:** Cohort retention curve, survival rate, hazard rate, LTV, N-day retention.

---

## 12. N-Day Retention (D1 / D7 / D30 / D90)

**applies_to:** consumer primarily; B2B for daily-use tools

**definition:** The share of a cohort that performs the return event on exactly day N after acquisition.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| N-day / "Return On" (Amplitude) | `Users returning on exactly day N ÷ Cohort size` | Products with a genuinely daily cadence (fitness trackers, games, social feeds). |
| Rolling 24-hour windows | Day 1 = 24 to 48 hours after the user's own start time | Mixpanel's default ("birthday" mode). Stricter. |
| Calendar-day windows | Day 1 = the next calendar date | Produces a **higher** number. Mixpanel's own example: activity at 8pm Monday then 6am Tuesday counts as Day 1 retained despite a 10-hour gap. |
| Bracket / "Return On (Custom)" | `Users returning anywhere within a defined window ÷ Cohort size` | Weekly or irregular cadence products. Not a third philosophy; it is N-day with user-chosen bucket widths. |

**inputs:** Event stream with install or signup timestamp and a defined return event. Amplitude, Mixpanel, Adjust, AppsFlyer, Firebase.

**application:** Onboarding and activation diagnosis, UA channel quality scoring, paid-media bid optimization.

**benchmark:** **NO SOURCED BENCHMARK FOUND for D1/D7/D30 by category.** This is a real gap and I want to be blunt about it. Every table circulating (UXCam, Business of Apps derivatives, "iOS D1 23.9% / D7 6.89%") either failed to trace to a primary publisher or was internally contradictory (one widely-copied set reports overall D7 at 17.86% while simultaneously reporting iOS D7 at 6.89% and Android at 5.15%, which cannot both be true). Adjust returned HTTP 429 on three paths, Business of Apps returned 403, and the AppsFlyer and Amplitude retention tables are behind gated download forms.

What is verifiable: AppsFlyer's State of Subscriptions for Marketers 2026 (pub. 31 March 2026, data Oct 2024 to Feb 2026, N=2,900 subscription apps, 1.7B paid installs, $2.1B UA spend) publishes trial-start and trial-conversion rates but not D1/D7/D30 on its public page. If D1/D7/D30 is load-bearing for a client, download the Adjust and AppsFlyer PDFs directly rather than sourcing from blogs.

Amplitude's Product Benchmarks Report dates to 2019 with a ~2021 follow-up. Even if retrieved it should be labeled five-plus years stale.

**traps:**
- **N-day is not monotonic and can rise.** Amplitude: "A user can trigger the return event on multiple days and Amplitude counts them on each day. This can drive retention percentage up over time." An unbounded curve cannot do this. If your N-day curve rises, that is the metric, not the product.
- **Day-of-week seasonality dominates short horizons.** A D7 that lands on a Sunday for a B2B tool reads catastrophically low for no product reason.
- **Calendar mode inflates D1 relative to rolling mode**, systematically, not randomly.
- **Wider brackets mechanically raise the number.** A "D7 retention" computed on a Day 5-7 bracket is not comparable to one computed on exactly Day 7.
- **Subscription retention and app-usage retention are different constructs and must never share a chart.** RevenueCat measures a contractual state; AppsFlyer measures whether someone opened the app. A 28% annual subscription retention and a 5% D30 are not on the same axis.
- **The aggregate row uses a different denominator than the cohort rows**, even within one tool.

**related:** Unbounded retention, bracket retention, cohort curve, retention asymptote, stickiness (excluded, see below).

---

## 13. Unbounded / Rolling Retention

**applies_to:** consumer primarily

**definition:** The share of a cohort that performs the return event on day N **or any day after**, which is the survival function of the cohort.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| "Return On or After" (Amplitude, default) | `Users returning on day N or later ÷ Cohort size` | Sporadic-cadence products. Amplitude's default view. |
| "On or After" (Mixpanel, default) | Same construction | Mixpanel: "We think 'On or After' retention is a better fit for most businesses, and it is the default calculation." |
| "Rolling retention" (mobile analytics convention) | Same as unbounded | **Terminology collision, see traps.** |
| "Rolling interval" (Mixpanel) | A birthday-anchored 24-hour window, which is a completely different concept | The same word means two different things depending on who is speaking. |

**inputs:** Same as N-day.

**application:** The honest "have we lost them for good?" question. The right input to LTV, because it is a true survival function.

**benchmark:** Same gap as metric 12. **NO SOURCED BENCHMARK FOUND by category.**

**traps:**
- **Unbounded is always greater than or equal to N-day at every horizon**, by construction: same denominator, superset numerator. Amplitude's own worked example on one cohort: Day 3 unbounded 68.8%, Day 3 N-day 68.4%. The gap widens sharply for infrequent-use products, where Day 8 N-day can be near zero while Day 8 unbounded is high.
- **"Rolling retention" is the worst-defined term in this family.** In mobile analytics it conventionally means "returned on day N or later." In Mixpanel it means "birthday-anchored 24-hour windows," and the unbounded concept is called "On or After." Two practitioners saying "rolling retention" to each other are very likely describing different metrics. Always ask for the formula.
- **Unbounded is monotonically non-increasing by construction**, so it *cannot* show you the day-level engagement pattern that N-day can. It is not strictly better, it answers a different question.
- **Any benchmark quoted without naming the method is uninterpretable.** The difference between unbounded and N-day D30 is not a fudge factor.

**related:** N-day retention, survival rate, Kaplan-Meier, cohort curve.

---

## 14. Month-1 (First-Period) Churn

**applies_to:** consumer subscription primarily; B2B for month-to-month SMB products

**definition:** The share of new subscribers who cancel before or at their first renewal, which is almost always the largest single block of churn in a subscription business.

**formula_variants:**
- `Subscribers cancelling in period 1 ÷ New subscribers in the cohort`. The cohort version, and the right default.
- `Month-1 cancellations ÷ total cancellations`. The *share-of-churn* version, which is what RevenueCat reports and which answers a different question.
- **Trial-inclusive versus post-trial:** whether a trial cancellation counts as month-1 churn changes the number enormously and there is no convention.
- `1 − first renewal rate`. Equivalent only when everyone renews on the same cycle.

**inputs:** Subscription start and cancellation timestamps, trial flags. RevenueCat, Stripe, Recurly, App Store or Play Store server notifications.

**application:** The highest-ROI retention intervention point in consumer subscription. Directs onboarding, paywall, and first-value work.

**benchmark:**

| Cut | Figure | Source |
|---|---|---|
| Share of all annual cancellations occurring in month 1 | **35%** (worst: Shopping ~50%; best: Education ~30%) | RevenueCat SoSA 2026, pub. March 2026, data 2025, N=115,000+ apps, $16B revenue |
| Annual subscriptions cancelled in first month | ~30% | RevenueCat SoSA 2025, pub. March 2025, data 2024, N=75,000 apps |
| Trial cancellation timing (3-day trials) | 55.4% on Day 0; 84% by Day 1 | RevenueCat SoSA 2026 |
| Trial cancellation on Day 0 by trial length: 3d / 7d / 14d / 30d | 55.4% / 39.8% / 35.7% / 31.1% | RevenueCat SoSA 2026 |
| Consumer cancellations occurring within first 12 months | 66% | Recurly, "What Subscribers Want" 2025 |

**traps:**
- **Month-1 churn share and month-1 churn rate are different metrics** and RevenueCat reports the share. "35% of annual cancellations happen in month 1" is not "35% of annual subscribers churn in month 1."
- **Trial handling has no convention.** Whether a trial cancel counts moves the number by tens of points.
- **Weekly plans make month-1 churn nearly meaningless** because month 1 contains four renewal events, not one.
- **Fixing month-1 churn can lower blended retention.** If you save the marginal subscriber who was going to leave, they persist into months 2 and 3 at below-average rates and drag the curve.

**related:** Renewal rate, survival rate, trial-to-paid conversion (cross-family), hazard rate.

---

## 15. Renewal Rate (per Billing Cycle)

**applies_to:** consumer subscription primarily; B2B for annual contracts

**definition:** The share of subscriptions reaching a given billing event that actually renew at that event, which is a conditional (per-event) rate rather than a cumulative one.

**formula_variants:**
- `Renewals at cycle N ÷ Subscriptions reaching cycle N`. Conditional, and the correct construction.
- **Active renewal rate:** RevenueCat's variant, "the share of renewals done by subscribers active in ~15 days prior to renewal." Separates engaged renewals from autopay inertia. Very useful and rarely computed.
- **Volume-weighted across all renewal events:** heavily survivorship-biased toward long-tenured cohorts, and produces dramatically higher numbers.
- **Cumulative survival:** the product of conditional renewal rates. This is retention, not renewal rate, and conflating them is the most common error here.

**inputs:** Billing events with cycle index. Billing system or app store server notifications.

**application:** Pricing and plan-duration strategy. The per-cycle view tells you exactly where the leak is, which the cumulative view hides.

**benchmark:** All from RevenueCat SoSA 2026 (pub. March 2026, data 2025, N=115,000+ apps), median ranges across categories:

| Plan | 1st renewal | 2nd renewal | 3rd renewal |
|---|---|---|---|
| Annual | 23-40% | 44-64% | 56-70% |
| Weekly | 35-58% | 67-75% | 74-91% |

Annual first-renewal median by category: Travel 40%, Business 40%, Media and Entertainment 37%, Utilities 35%, Shopping 30%, Gaming 26%, Social and Lifestyle 25%, Health and Fitness 25%, Education 24%, Photo and Video 23%, Productivity 23%.

Monthly first-renewal median by category: Business 61%, Media and Entertainment 58%, Shopping 58%, Health and Fitness 57%, Utilities 57%, Education 56%, Productivity 54%, Travel 53%, Gaming 53%, Photo and Video 48%, Social and Lifestyle 42%.

**Do not use the widely-repeated "83.4% yearly renewal rate."** It is irreconcilable with RevenueCat's own category tables (23-40% median first annual renewal). The most likely explanation is that 83.4% is a volume-weighted rate across all renewal events, heavily survivorship-biased, while 23-40% is the unweighted median across apps at first renewal. That reconciliation is inference, not verified.

**traps:**
- **Renewal rate is not retention.** RevenueCat separates them explicitly. Conflating them produces the 83.4%-versus-23-40% contradiction above.
- **Volume-weighting across all renewal events is survivorship bias in its purest form.** Long-tenured subscribers generate most of the renewal events and renew at much higher rates.
- **Category comparisons are confounded by plan mix, not loyalty.** Gaming sells 82% weekly, Productivity 77% monthly, Health and Fitness 68% annual. Comparing Gaming to Health and Fitness retention is largely comparing weekly to annual plans.

**related:** Month-1 churn, survival rate, cohort curve, hazard rate.

---

## 16. Survival Rate / Kaplan-Meier Survival Function

**applies_to:** both

**definition:** The estimated probability that a subscriber is still active at tenure t, computed from all subscribers using each one for exactly as long as they were observed.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Naive cohort survival | `Cohort members active at t ÷ Cohort size` | Simple, but discards everyone acquired more recently than t and can only report as far as your oldest cohort reaches. |
| Kaplan-Meier | `S(t) = Π over event times ≤ t of (1 − dᵢ/nᵢ)`, where dᵢ is churns and nᵢ is the at-risk set | The correct estimator whenever you have right-censored data, which is always. Uses partial observation instead of discarding it, and yields a curve longer than any single cohort has been observed. |
| Shifted-beta-geometric (Fader-Hardie) | Fit a beta-distributed churn propensity across a geometric process | Projects beyond observed data and correctly attributes flattening to heterogeneity. |
| Cox proportional hazards | Model survival as a function of covariates | When you need to know *which* attributes drive survival, not just the curve. |

**inputs:** Per-subscriber start date, end date or censoring date, and a censoring flag. Warehouse plus a survival library (`lifelines`).

**application:** The correct input to LTV. Also the only defensible way to compute average subscriber lifetime.

**benchmark:** Survival endpoints for consumer subscription, all RevenueCat:

| Cut | Figure | Source |
|---|---|---|
| Year-1 retention by plan (2024 data) | Annual **44.1%**, monthly **17.0%**, weekly **3.4%** (down from 47.1 / 18.8 / 4.2) | SoSA 2025, pub. March 2025, N=75,000 apps, $10B+ revenue |
| Year-1 retention, annual plans (2025 data) | **28%**, down from 31% | SoSA 2026, pub. March 2026, N=115,000+ apps |
| Year-1 retention median by plan (evergreen) | Weekly 3% (p25 1, p75 4), monthly 11% (5, 19), annual 28% (17, 43) | RevenueCat, updated June 2024, N=10,000+ apps |
| Annual Year-1 retention by price point | Low-priced 36%, mid 26%, high 23% | SoSA 2026 |
| Hard paywall vs freemium, Year-1 annual retention | 27% vs 28%, essentially identical, despite hard paywalls converting 5x better at D35 (10.7% vs 2.1%) | SoSA 2026 |

**Flag the discontinuity.** The 2025 edition reports annual Year-1 retention at 44.1%; the 2026 edition reports 28%, and describes the prior year as ~44%. RevenueCat presents this as a real year-over-year decline. A 16-point single-year swing warrants scrutiny before you plot it as a trend. Cite one edition and stay in it.

**traps:**
- **Ignoring right-censored subscribers is the classic error.** The `lifelines` docs are blunt: "A common mistake data analysts make is choosing to ignore the right-censored individuals," and doing so means "severely underestimating the true average lifespan." Taking the mean of all observed lifespans including current tenures still underestimates.
- **Naive cohort survival under-reports on the recent right edge** because immature cohorts are truncated.
- **Rising cohort-level retention does not mean individual churn propensity is falling.** Fader and Hardie (2018): "even when aggregate retention rates are monotonically increasing, the individual-level churn probabilities are unlikely to be declining over time." Accounting for cross-sectional heterogeneity matters more than modeling individual dynamics.
- **U-shaped curves exist** (an initial dip before retention rates rise) and the standard beta-geometric model cannot capture them.

**related:** Cohort retention curve, hazard rate, retention asymptote, average lifetime, LTV.

---

## 17. Hazard Rate / Churn by Tenure

**applies_to:** both

**definition:** The probability of churning in period t given survival to period t, which is the shape of *when* churn happens rather than how much.

**formula_variants:**
- `Churns in period t ÷ Subscribers surviving to start of period t`. The conditional rate.
- `1 − renewal rate at cycle t` for contractual businesses.
- **Smoothed hazard** via kernel methods when cohorts are small.
- **Cumulative hazard** `H(t) = −ln S(t)`, useful when you want an additive quantity.

**inputs:** Same as survival. Warehouse.

**application:** Tells you where to intervene. A hazard spike at the renewal date is a pricing or notification problem; a hazard spike at day 3 is an onboarding problem. Completely different fixes.

**benchmark:**

| Cut | Figure | Source |
|---|---|---|
| Annual plans, mid-year monthly churn | 3-10% monthly range, with a Month-12 pre-renewal spike of 9-14% of all annual cancellations | RevenueCat SoSA 2026, pub. March 2026 |
| Trial hazard | Daily churn drops below 10% after Day 2 for 14- and 30-day trials | RevenueCat SoSA 2026 |
| Conditional renewal hazard, weekly plans | Falls from 42-65% at cycle 1 to 9-26% by cycle 3 | Derived from RevenueCat SoSA 2026 renewal rates |

**traps:**
- **Hazard is conditional and cumulative retention is not.** A rising hazard with a flattening retention curve is arithmetically possible and frequently misread.
- **Contractual businesses have spiky hazard concentrated at renewal dates**, so a monthly average hazard describes nothing real.
- **Tenure-mix shifts move blended churn without any hazard changing.** This is the Simpson's paradox trap from metric 1, expressed properly.

**related:** Survival rate, renewal rate, month-1 churn, cohort curve.

---

## 18. Involuntary (Passive) Churn Rate

**applies_to:** both, and far larger in consumer

**definition:** Subscribers lost because a payment failed rather than because they chose to leave.

**formula_variants.** This metric has **NO consensus definition**, and the disagreement is definitional rather than empirical. Every published figure needs three fields attached: numerator basis, denominator, and recovery window.

| Variant | Formula | When it's right |
|---|---|---|
| At the decline event | `Subscriptions with a declined renewal ÷ Starting subscriptions` | Butter Payments' definition. Counts subscriptions later recovered, so it overstates loss. |
| Post-retry terminal failure | `Subscriptions never recovered after the full retry sequence ÷ Starting subscriptions` | Baremetrics' definition ("payments fail and never get recovered"). The economically correct one. |
| Post-grace-period lapse | Counted only after platform grace period plus account hold expire | The app-store convention. Window length is a platform setting, so this is not stable across platforms or years. |
| Share-of-churn | `Involuntary churn ÷ total churn` | The most-quoted framing and the least stable. |
| Hard declines only | Excludes soft declines (insufficient funds, temporary) | Produces a fraction of the "all failed invoices" number. Soft declines are 80-90% of all declines. |

**Evidence the field is incoherent:** Recurly publishes 53%, 26% (derived from its own 0.86%/3.27% split), and "20-40%" across three live pages. Churnkey publishes 22-24% in its benchmark post and "can easily comprise 40%" in its flagship report, while its own monthly rates (1% involuntary against 10% total) imply ~10%. RevenueCat's own series switched denominators between editions, from "over 23% of **churn**" (2024) to 15.1% of **cancellations** (2025).

**inputs:** Payment attempt outcomes with decline codes, retry sequences, recovery events, and cancellation reason codes. Billing plus payment processor plus app-store server notifications.

**application:** The cheapest retention win available, because these subscribers did not want to leave. Directs dunning, retry logic, card updater, and grace-period configuration.

**benchmark:**

| Cut | Involuntary as % of total churn | Absolute annual involuntary rate | Source |
|---|---|---|---|
| B2C / B2B | 24% / 16% | 9% / 6% | Churnkey, Involuntary Churn Benchmarks, pub. 14 Nov 2025, data 2024, N=5.4M failed payments across 25M subscriptions |
| Digital goods / SaaS / insurance | 29% / 22% / 9% | 11% / -- / 3% | Churnkey, same |
| By price: <$10 / $10-30 / $30-100 / $100-1,000 / $1,000-10,000 / >$10,000 | 35 / 23 / 26 / 19 / 15 / 24% | 14 / 9 / 9 / 6 / 4 / 4% | Churnkey, same. "The lower the price, the higher the proportion of involuntary churn." |
| SaaS sub-verticals | Marketing 22%, dev tools 22%, productivity 21%, operations 17%, AI tools 16%, creative 13% | | Churnkey, same |
| All subscription (monthly rate) | 0.86% of 3.27% total = 26% share | | Recurly Churn Rate Benchmarks (undated, no N) |
| Mobile: Google Play / App Store, share of cancellations | **~31%** / **14%** | | RevenueCat SoSA 2026, data 2025, N=115,000+ apps |
| Mobile: Google Play / App Store (prior year) | 28.2% / 15.1% | | RevenueCat SoSA 2025, data 2024, N=75,000 apps |
| Lapsed subscriptions attributable purely to payment failure | 25% | | Stripe, "How we built it: Smart Retries," 23 Jan 2024, no N disclosed |

The Google-versus-Apple gap is the most decision-relevant number in this whole family: involuntary churn on Android runs more than double iOS across two consecutive report years, which means dunning and grace-period configuration is worth roughly 2x more on Android.

**traps:**
- **Platform policy changes mechanically reclassify churn.** Google Play changed the default account hold from 30 days to "60 days minus any grace period duration," effective 1 December 2025, explicitly to lower involuntary churn rates. Apple offers 3, 16, or 28 day grace periods. A subscription that counts as involuntary churn under a 3-day grace period may not under a 28-day one, so Apple-versus-Google and year-over-year comparisons are partly artifacts of window length.
- **Involuntary churn is often invisible in the ledger**, because a failed payment and a cancellation look identical downstream. Both get written off, which overstates true voluntary churn and hides recoverable revenue.
- **Some "involuntary" churn is voluntary in disguise.** A customer who deliberately lets a card lapse to avoid a cancel flow is choosing to leave. Nobody separates this.
- **The share-of-churn framing moves when total churn moves**, so a falling share can mean voluntary churn got worse.

**related:** Voluntary churn, dunning recovery rate, gross revenue churn, reactivation rate.

---

## 19. Voluntary Churn Rate

**applies_to:** both

**definition:** Subscribers who actively chose to cancel.

**formula_variants:**
- `Active cancellations ÷ Starting subscribers`, the standard.
- `Total churn − involuntary churn`, the residual method, which inherits every ambiguity from metric 18.
- Reason-coded decomposition, which is the only version that drives action.

**inputs:** Cancellation events with reason codes from a cancel flow. Billing plus cancel-flow tool.

**application:** Directs product, pricing, and positioning work. Reason codes are the input to save-offer design.

**benchmark:**

| Cut | Figure | Source |
|---|---|---|
| Monthly voluntary churn | 2.41% (of 3.27% total) | Recurly Churn Rate Benchmarks (undated, no N) |
| Monthly voluntary churn | ~7% (of ~10% total) | Churnkey State of Retention 2025, data 2024, 1,000+ companies |
| Cancellation reasons | Budget limitations 32.97%, infrequent usage 30.60%, other 17.85%, expectations not met 8.63%, technical issues 4.69%, alternative solution 4.28%, usability 0.98% | Churnkey State of Retention 2025, N=3M cancellation sessions |
| Cancellation reasons | Pricing 31%, not enough time 16%, missing features 15%, no longer needed 15%, integration issues 8% | Chargebee, "Navigating Retention," Q1 2024 data, N not stated |
| Consumer self-report | 51% canceled "simply because they weren't using it enough"; 52% canceled at least one subscription in the past year | Recurly 2026 State of Subscriptions |
| App-store cancellation reason "unsubscribed" | App Store 74.5%, Google Play 67.2% | RevenueCat SoSA 2025, data 2024 |

The two vendor datasets rhyme: price or budget is the top reason at 31-33%, and usage or time is second. The gap on usage is likely a taxonomy difference.

**traps:**
- **Self-reported cancel reasons are the least reliable data in this family.** Users pick whichever option ends the flow fastest, and "price" is the socially easy answer for "I did not get value."
- **The reason menu determines the distribution.** Chargebee and Churnkey get different splits partly because they offer different options.
- **Reason codes only exist for users who go through your cancel flow.** App-store cancellations bypass it entirely, which means for mobile you are blind on the majority of cancellations.

**related:** Involuntary churn, save rate, reactivation rate.

---

## 20. Failed-Payment Recovery Rate (Dunning Recovery)

**applies_to:** both

**definition:** The share of failed payments eventually collected through retries, dunning messages, and card updater.

**formula_variants:**
- `Recovered invoices ÷ Failed invoices`, within a stated window. The window is mandatory and usually omitted.
- `Recovered revenue ÷ Failed revenue`, which differs from the invoice-count version whenever failure correlates with plan size.
- Per-method attribution (retries, email, SMS, card updater), which rarely sums to the headline because denominators differ.

**inputs:** Payment attempts, retry schedule, recovery events, decline codes. Payment processor plus dunning tool.

**application:** Directly sizes the involuntary-churn opportunity. This is usually the highest-ROI retention project available to a growth consultant.

**benchmark:**

| Cut | Figure | Source |
|---|---|---|
| Stripe Smart Retries alone | 51% of failed payments recovered | Churnkey benchmarks, pub. 14 Nov 2025, data 2024 |
| Failed **monthly** payments recovered | 53% | Recurly 2026 State of Subscriptions, N=76M subscribers, 2,200 merchants |
| Failed **annual** payments recovered | ~23% | Recurly 2026 |
| Dunning email plus SMS campaigns | 42% average recovery | Churnkey State of Retention 2025, data 2024 |
| Renewal invoice paid rate (post-retry, final state) | 96% | Recurly 2024 State of Subscriptions press release, 23 Jan 2024 |
| Decline code mix | Insufficient funds 40.6%, transaction not allowed 8.8%, highest risk 8.0%, do not honor 7.6% | Churnkey, N=5.4M failed payments, 2024 data |
| Soft declines as share of all declines | 80-90% | Churnkey, 26 July 2024, citing Checkout.com |
| Post-recovery survival | Recovered subscriptions continue on average seven more months | Stripe, 23 Jan 2024 |
| Card Account Updater attribution | 2.76 of a 4% total authorization uplift ($2M of $3M) | Stripe, Zapier case study (date not stated on page) |
| Grace period vs none (Google, via RevenueCat) | 57% higher recovery from renewal declines; grace plus account hold "tripled the decline recovery rate from roughly 10% to 33%" | RevenueCat, 2 Apr 2026, attributed to Google. **Second-hand; not verifiable on a Google-owned page.** |

Apple and Google publish **no** grace-period recovery percentages of their own. Apple attempts recovery for 60 days after a failed renewal; Google's account hold plus grace must total 30 days or more.

**traps:**
- **Recovery rate is meaningless without a window.** A 30-day and a 60-day recovery rate are different metrics.
- **Per-method attribution does not sum to the headline.** Churnkey's method breakdown sums to 50.6% against a headline 70%, because the denominators differ. Flag this if you cite it.
- **Vendor-published recovery rates are marketing numbers measured on their own customers**, who by definition opted into recovery tooling.
- **Annual plans recover at roughly half the rate of monthly** (23% vs 53%), because the amount is larger and the failure is more likely to be a genuine limit rather than a timing issue.

**related:** Involuntary churn, gross revenue churn, reactivation rate.

---

## 21. Reactivation / Resurrection / Win-Back Rate

**applies_to:** both

**definition:** The share of churned customers who return as paying customers within a defined window.

**formula_variants:**
- `Churned customers who return within N months ÷ Churned customers in the cohort`. RevenueCat's definition uses N=12: "the share of churned subscribers that become active in the 12 months following a churn event." The window is mandatory and there is no standard.
- `Reactivated MRR ÷ Starting MRR`, the revenue version, which feeds NRR at ChartMogul by default.
- **Resurrection** in product analytics: a dormant user becoming active again, which does not require a churn event at all and is a different metric.
- **Returning-subscribers share of new acquisitions:** `Reactivations ÷ (New + Reactivations)`. Recurly's framing, useful for acquisition planning.

**inputs:** Churn events, subsequent subscription starts, matched on a stable identity. Billing plus identity resolution.

**application:** Sizes the win-back campaign opportunity, and tells you whether to spend on prevention or resurrection.

**benchmark:**

| Cut | Figure | Source |
|---|---|---|
| Reactivation within 12 months: annual / monthly plans | **5%** / **~20%** (monthly is roughly 4x annual) | RevenueCat SoSA 2026 Part 2, pub. May 2026, data 2025, N=115,000+ apps |
| Annual reactivation across every geography / every price tier / by category | 4.9-5.9% / 4.4-5.6% / 3-8% | RevenueCat SoSA 2026 |
| Monthly reactivation by category / by region | 6-36% / 18-24% | RevenueCat SoSA 2026 |
| Reactivation by plan (prior year) | Monthly 13.11%, weekly 9.37%, annual 4.58% | RevenueCat SoSA 2025, data 2024, N=75,000 apps |
| Returning subscribers as share of new acquisitions | 20% (2024 data), "nearly 1 in 4" (2025 data) | Recurly, 2025 and 2026 State of Subscriptions, N=67M then 76M subscribers |
| Pause-to-return rate | ~75% of pausing customers return to active billing | Recurly, 3 Dec 2025 and 2026 report |
| Pause adoption | 25% of subscribers pause instead of canceling where offered; pause usage +337% YoY | Recurly 2025 and 2026 reports |

**The operational read on the annual number is the strongest finding in the consumer research.** Annual reactivation is 5% and it is 5% *everywhere*, flat across every geography and every price tier. That flatness suggests it is structural rather than addressable, so for annual plans the spend should go to preventing the month-1 cancellation (35% of all annual churn) rather than to win-back. Monthly plans are the opposite: a 6-36% category spread implies real addressable variance.

**traps:**
- **Reactivation may already be inflating your NRR.** ChartMogul includes reactivation MRR in the NRR numerator by default. A cohort-based NRR should not contain customers who left the cohort and returned.
- **Identity resolution silently caps the measured rate.** A user who resubscribes with a different email or a new device ID reads as a new customer, so measured reactivation is a floor.
- **Reactivated customers are not equivalent to retained ones.** They churn faster on the second run in most datasets, and treating a reactivation as a full new acquisition in LTV overstates value.
- **Window choice dominates the number.** 30-day, 90-day, and 12-month reactivation rates are not comparable, and vendors rarely state the window.
- **Circulating "15-30% win-back" figures trace only to SEO aggregator blogs.** Do not use them.

**related:** NRR, churn rate, save rate, involuntary churn.

---

## 22. Cancel-Flow Save Rate / Deflection Rate

**applies_to:** both

**definition:** The share of users who enter a cancellation flow and do not end up cancelling.

**formula_variants.** **The denominator is genuinely disputed and the two published figures are not comparable.**
- Chargebee Retention: `Saved subscribers ÷ total cancel-page sessions`. Deflect rate: `Deflected subscribers ÷ total sessions`.
- Churnkey: reports "~54% saved" on a different construction that it does not fully document.
- Offer-level acceptance: `Accepted offers ÷ offers presented`, which is a per-offer rate, not a flow-level save rate.

**inputs:** Cancel-flow session events, offer impressions and acceptances, final subscription state. Cancel-flow tool.

**application:** Sizes the offboarding-offer opportunity and directs which save offer to build.

**benchmark:**

| Cut | Figure | Source |
|---|---|---|
| In-app cancel flow save rate | ~54% of customers saved, "nearly two million subscriptions" | Churnkey State of Retention 2025, data 2024, N=3M cancellation sessions, 1,000+ companies |
| Accepted-offer mix (share of accepted offers) | Discounts 53.9%, other 20.2%, pauses 19.2%, plan changes 6.7% | Churnkey, same |
| Discount offer acceptance rate | 17% overall, 21% in B2C | Chargebee (Brightback), Q1 2024 |
| Gift and credit offers / extensions (SaaS) / pauses (B2C) | 13% / 14% / 15% | Chargebee, Q1 2024 |

**Do not put 54% and 17% in the same column.** Chargebee's denominator is total cancel-page sessions; Churnkey's is not computed the same way.

**traps:**
- **A high save rate driven by discounts is deferred churn plus margin destruction.** Measure saved-customer survival at 6 and 12 months and their post-save ARPU, or the metric actively misleads.
- **Cancel flows only capture users who go through your flow.** App-store cancellations bypass it, which for mobile means most cancellations.
- **Adding friction raises the save rate and invites regulatory exposure** (the FTC click-to-cancel rulemaking and equivalent EU rules). This one fails the board-review test if the "save" is actually an obstruction.

**related:** Voluntary churn, reactivation rate, involuntary churn.

---

## 23. SaaS Quick Ratio

**applies_to:** both

**definition:** How many dollars of new and expansion revenue you add for every dollar you lose to churn and contraction.

**formula_variants:**
- `(New MRR + Expansion MRR) ÷ (Churned MRR + Contraction MRR)`. The canonical formula, universally agreed.
- ARR-based rather than MRR-based.
- Customer-count rather than revenue.
- **Reactivation treatment is a real ambiguity.** Some implementations put reactivation MRR in the numerator; others exclude it. I found no authoritative ruling. Amplitude's product-analytics version is `(New + Resurrected) ÷ Churned`, which explicitly includes resurrection.

**Attribution:** Mamoon Hamid (Social Capital), unveiled at SaaStr 2015. The original deck or Medium post could not be located; attribution rests on three secondary sources (ChartMogul, InsightSquared, Wall Street Prep) that agree on author, year, venue, and formula.

**inputs:** Full MRR movement decomposition. Billing.

**application:** A single-number growth-efficiency screen used in diligence.

**benchmark:** **4.0** is the threshold, traced to Hamid personally: he "won't invest in a SaaS company with a Quick Ratio below 4." Wall Street Prep confirms 4.0 as "the most frequently cited target benchmark."

**No 2024-2026 benchmark publisher reports a quick ratio.** I searched the full text of the Benchmarkit 2025 PDF (zero occurrences), High Alpha's 2025 scorecard, and SaaS Capital's retention research. None report it. The related efficiency metrics they do publish are Burn Multiple, CAC Ratio, and Rule of 40. Treat 4.0 as an eleven-year-old VC heuristic, not a current benchmark.

**traps:**
- **Undefined or infinite at zero churn**, which makes it useless in the first several months of a company's life. InsightSquared: "The Quick Ratio is irrelevant during these months."
- **Artificially high early**, because the pool of customers who *can* churn is still small.
- **It cannot distinguish new from expansion.** ChartMogul's worked example: Company 1 at $10,000/$2,000 scores 5, Company 2 at $16,000/$8,000 scores 2, yet both have identical net MRR of $8K. A company can raise its quick ratio purely by outrunning retention with new logos.
- **Name collision with the accounting quick ratio** (current assets over current liabilities, the "acid test"). They share a name and nothing else, which is a live trap in mixed finance and growth conversations.
- **Period-sensitive.** Defined monthly; quarterly or annual computation yields different results.

**related:** NRR, expansion rate, churn rate, burn multiple (unit economics family).

---

## 24. Average Customer / Subscriber Lifetime

**applies_to:** both

**definition:** The expected duration a customer remains a paying customer.

**formula_variants:**

| Variant | Formula | When it's right |
|---|---|---|
| Naive reciprocal | `1 ÷ monthly churn rate` | Only valid under constant, homogeneous churn. Essentially never true. |
| Area under the survival curve | `Σ S(t)` over the horizon | The correct construction. Requires a survival curve. |
| Kaplan-Meier restricted mean survival time | Integral of `S(t)` to a chosen horizon | The rigorous version, and it handles censoring correctly. |
| Fitted sBG expectation | Expectation under the fitted beta-geometric | Best when you need to project beyond observed tenure. |

**inputs:** Per-subscriber tenure with censoring flags. Warehouse.

**application:** The denominator of LTV, and therefore of every payback and CAC-ratio decision.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** No publisher I reached reports an average consumer-subscription lifetime in months. It is derivable from RevenueCat's survival endpoints, but any such figure is your calculation, not a published benchmark, and must be labeled that way.

Adjacent published figure: median realized Year-1 LTV of $30.16 for AI apps versus $21.37 for non-AI (RevenueCat SoSA 2026, data 2025).

**traps:**
- **`1 ÷ churn` badly overstates lifetime precisely because the curve flattens.** The reciprocal assumes a constant hazard; heterogeneity means the surviving base is progressively lower-risk, so the true expectation is different and the naive formula is not a conservative approximation.
- **Conversely, the geometric annualization `1 − (1 − m)^12` is an upper bound on true annual cohort churn** whenever the base is heterogeneous, which is always. So `m × 12` is wrong, the geometric fix is better, and the geometric fix is still biased.
- **Ignoring censored subscribers underestimates lifetime**, and so does averaging observed tenures including current ones.
- **A lifetime computed on an unbounded retention curve and one computed on N-day are different numbers.**

**related:** Survival rate, hazard rate, retention asymptote, LTV (unit economics family), churn rate.

---

## 25. Churn by Segment / Cohort / Tenure (Segmented Churn Decomposition)

**applies_to:** both

**definition:** Churn computed within a defined slice (acquisition channel, plan, price band, geography, tenure band, ICP fit) rather than blended.

**formula_variants:**
- Any of the metric-1 variants, applied within the slice.
- **Tenure-gated blended churn:** restrict to customers past a tenure threshold (Shopify's suggestion is 90 days) to strip the new-customer mix effect.
- **Mix-adjusted churn:** hold the segment mix constant at a base period and recompute, isolating true rate change from mix change. This is the version almost nobody builds and the one that answers "did churn actually get worse?"

**inputs:** Churn events joined to acquisition and firmographic attributes. Billing plus CRM plus attribution.

**application:** The only version of churn that drives action, because it tells you which acquisition to stop buying rather than which customers to save.

**benchmark:**

| Cut | Figure | Source |
|---|---|---|
| Involuntary churn share by price band: <$10 / >$10,000 | 35% / 24% of total churn; 14% / 4% absolute annual | Churnkey, pub. 14 Nov 2025, data 2024 |
| NRR by price band, AI-native: >$250/mo / $50-249 / <$50 | 85% / 61% / 32% | ChartMogul, "AI churn wave," 2025 data |
| GRR by same bands | 70% / 45% / 23% | ChartMogul, same |
| B2B SaaS customer retention by ARPA (75th pct): <$10/mo / >$500/mo | 63% / 86% | ChartMogul SaaS Retention Report 2023, data 2022. **Stale.** |
| Retention by ACV | GRR flat at 90-91% until $250K ACV, then jumps to 95% | SaaS Capital, pub. Sept 2025, data 2024 |
| Trial-to-paid by region | North America 34.2%, APAC 31.9%, Western Europe 29.7%, India and SE Asia 15.2% | RevenueCat SoSA 2026 |

The structural finding that repeats across every source: **price level is the strongest single predictor of retention**, stronger than category, geography, or company stage.

**traps:**
- **Segment sample sizes collapse fast.** Benchmarkit's >$100M ARR expansion cohort is six companies, and ChartMogul's AI-native cuts are ~50 companies per bucket and explicitly labeled directional.
- **Post-hoc segment discovery is overfitting.** Slicing until you find a bad segment guarantees you find one.
- **Category comparisons are confounded by plan mix**, not just by category. Gaming sells 82% weekly, Health and Fitness 68% annual.
- **Segment-level churn is not comparable across tools** because plan-switch handling differs (100% churn, proportional, or excluded), as ChartMogul documents.

**related:** Customer churn, GRR, NRR, hazard rate, cohort curve.

---

# Metrics I considered and excluded, with reasons

| Metric | Why excluded |
|---|---|
| **DAU/MAU (stickiness ratio)** | Belongs to the engagement family. It is a ratio of two overlapping point-in-time aggregates, neither cohort-anchored, and it cannot distinguish "the same people came back 15 of 30 days" from "30 different groups each came once." A product churning its entire base monthly can hold DAU/MAU flat while cohort retention goes to zero. Andrew Chen documents that pushing notifications to raise it actually *lowers* it, because MAU grows faster than DAU. Amplitude implements stickiness as a separate chart from retention. Worth a card in engagement, with a hard cross-reference here. |
| **Trial-to-paid conversion** | Activation and monetization family. It determines who enters the retention cohort but is not itself retention. Cross-referenced under month-1 churn. |
| **NPS / CSAT / customer health score** | Predictive inputs to churn, not churn measures. Belongs in a customer-experience or predictive family. |
| **Product qualified retention / feature adoption depth** | Engagement family. Leading indicator only. |
| **LTV and LTV:CAC** | Unit economics family. Retention is an input; the ratio is not a retention metric. |
| **Payback period** | Unit economics. |
| **Rule of 40, Burn Multiple, Magic Number** | Growth efficiency family. The quick ratio is included here only because its numerator and denominator are entirely churn and expansion components. |
| **Refund rate** | Payments and monetization. RevenueCat publishes it (Education 4.86%, Health and Fitness 4.71%, Travel 1.51%, 2025 edition), and it correlates with early churn, but a refund is a transaction reversal, not a retention event. |
| **Time to first value / activation rate** | Onboarding family. The strongest lever on month-1 churn, but a different metric. |
| **Churn prediction model AUC / precision-recall** | Data science operations, not a business metric. |
| **Contract value retention on multi-year deals** | Considered as separate from GRR; it collapses into GRR under any standard construction. |
| **Seat utilization / license utilization** | Leading indicator of contraction, belongs in engagement. Cross-referenced under contraction rate. |
| **Customer effort score at cancellation** | Too rare in practice to warrant a card. |

---

# Cross-family dependencies

These metrics in my family are uninterpretable, or actively misleading, without a metric from another family.

| Retention metric | Requires from | Why |
|---|---|---|
| **Average customer lifetime, survival rate** | Unit economics (ARPA, gross margin) | Lifetime alone is a duration. It only becomes a decision when multiplied by margin-adjusted ARPA to produce LTV, and then compared to CAC. |
| **NRR** | Unit economics (CAC, payback) and sales (new ARR) | NRR above 100% means the base self-funds, which changes the required CAC payback tolerance. NRR read without CAC tells you nothing about whether growth is affordable. |
| **NRR, expansion rate** | Pricing and packaging | Expansion is mostly a function of whether the pricing model has a usage or seat axis. Benchmarkit's finding that hybrid subscription-plus-usage pricing carries a 110% median NRR against lower medians for pure models is a pricing result, not a retention result. |
| **Retention curve asymptote** | Acquisition (channel volume, viral or organic loop strength) | Casey Winters' argument is that the required asymptote depends entirely on acquisition-loop strength: "Some companies can scale with 10% retained users, and some may need 40%." The asymptote is only good or bad relative to an acquisition number. |
| **Cohort retention curve** | Engagement (definition of the key action and the natural frequency) | The curve does not exist until you fix a return event and a cadence. Change either and the asymptote changes. This is an engagement-family decision that determines a retention-family answer. |
| **Month-1 churn** | Activation and onboarding (time to first value, activation rate) | Month-1 churn is almost entirely an activation failure expressed as a retention number. Fixing it is onboarding work. |
| **Involuntary churn, dunning recovery** | Payments infrastructure (authorization rate, decline codes, retry configuration, card updater coverage) | The entire metric is a payments artifact. You cannot move it from within product or marketing. |
| **Churn by segment** | Acquisition (channel and campaign attribution) and ICP definition | Segmented churn only drives action when joined to how the customer was acquired. Otherwise you learn that bad customers churn without learning where they came from. |
| **Reactivation rate** | Lifecycle marketing (win-back campaign reach and deliverability) and identity resolution | Measured reactivation is a floor bounded by your ability to match a returning user to their prior identity. |
| **Quick ratio** | Sales (new MRR) | Two of the four components are acquisition, not retention. The ratio can be raised entirely by selling harder while retention deteriorates. |
| **Logo versus revenue retention divergence** | Unit economics (revenue concentration, ARPA distribution) | The gap between logo and revenue retention is a concentration statement. Without the ARPA distribution you cannot tell whether 80% logo retention plus 50% GRR means you lost your whales or your minnows. |

---

# The three highest-value cards, if you build nothing else

1. **Retention curve asymptote.** No consensus definition, no consensus threshold, and the practitioner reading (flattening proves stickiness) directly contradicts the modeling reading (Fader and Hardie: flattening is automatic under constant individual churn plus heterogeneity). Anyone who says "our curve is flattening, retention is working" is making a causal claim the data does not support.
2. **Involuntary churn.** No consensus definition at three separate boundaries (decline event versus terminal failure versus post-grace lapse), and one vendor publishes three mutually inconsistent numbers on three live pages. Also the largest cheap win in most consumer subscription businesses, with a 2x platform gap between Android and iOS.
3. **N-day versus unbounded versus rolling retention.** "Rolling retention" means two entirely different things depending on whether you are talking to a mobile analytics person or a Mixpanel user. Every mobile retention benchmark in circulation is uninterpretable without naming the method, and most of the tables circulating are unsourced or internally contradictory.

agentId: aebc703848bad5d13 (use SendMessage with to: 'aebc703848bad5d13', summary: '<5-10 word recap>' to continue this agent)
<usage>subagent_tokens: 187549
tool_uses: 40
duration_ms: 1942787</usage>