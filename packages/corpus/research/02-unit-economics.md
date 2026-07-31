Agent B is still running, but I've independently gathered the B2B benchmark set it was assigned. Composing now.

# UNIT ECONOMICS: Metric Corpus

**Research basis:** All benchmarks below were pulled from live sources during this session and are dated. Where I could not verify a segmented benchmark from a credible publisher, the field reads **NO SOURCED BENCHMARK FOUND**. Two research agents independently flagged that the 2025 to 2026 SEO layer around these metrics contains fabricated benchmarks attributed to real publishers (for example "iOS CPI $4.70 / Android $3.70" attributed to Business of Apps, and "$8.41 average mobile subscription ARPU" attributed to RevenueCat, which is actually RevenueCat's Gaming-category month-one realized LTV per payer). Nothing from those sources is included.

---

## 1. Customer Lifetime Value (LTV / CLV)

**applies_to:** both

**definition:** The expected total value a customer generates over the whole relationship, expressed either as revenue, gross profit, or discounted cash flow depending on which question you are answering.

**formula_variants:**

| # | Variant | Formula | When it is the right one |
|---|---|---|---|
| 1 | Naive ARPU/churn | `LTV = ARPU / churn rate` | Never defensible for a decision. Acceptable only as a back-of-envelope sanity bound on a business with genuinely flat cohort retention. |
| 2 | Gross-margin-adjusted | `LTV = (ARPU × gross margin %) / churn rate` | The minimum acceptable version if you are comparing LTV to CAC. Revenue LTV against CAC is an apples-to-oranges comparison. |
| 3 | Contribution-margin-adjusted | `LTV = (ARPU × contribution margin %) / churn rate` | When variable cost to serve (support, payment processing, platform fee, inference cost) is material and varies by cohort. |
| 4 | Discounted, cash booked at period start, as-yet-to-be-acquired customer | `E(CLV) = m(1+d) / (1+d−r)` | Setting the **upper bound on acquisition spend**. This is the only correct form for that question. (Fader & Hardie, *Reconciling and Clarifying CLV Formulas*, March 2012) |
| 5 | Discounted, cash booked at period end, as-yet-to-be-acquired | `E(CLV) = m / (1+d−r)` | Same question as #4 but where the first cash arrives at the end of period one rather than at signup. |
| 6 | Discounted **residual** value of an existing customer | `E(CLV) = mr / (1+d−r)` | Valuing your existing book, or deciding retention spend on a customer who has already paid. **Not** for setting acquisition budgets. |
| 7 | Cohort-observed / realized LTV | `RLTV(T) = cumulative revenue from cohort through period T / cohort size at acquisition (including churned)` | The default for any real decision. Jonathan Hsu: "We strongly prefer to look at empirically realized cohort LTV as opposed to imputed LTV based on a formula." |
| 8 | Non-constant retention | Replace `r^t` with `∏(i=0→t) r_i` | Whenever you have cohort data, which is always. Cohort retention rates rise with tenure; the flat aggregate rate is an aggregation artifact. |
| 9 | Probabilistic / "Buy Til You Die" | BG/NBD or Pareto/NBD for transaction flow, Gamma-Gamma for monetary value | Non-contractual settings (ecommerce, marketplaces, usage-based) where you cannot observe churn at all. |
| 10 | ML / pLTV | Gradient-boosted or neural prediction of individual customer value from early signals | Bidding to predicted value in paid acquisition; segmenting acquisition targets. Needs constant recalibration against realized cohorts. |
| 11 | Fixed-horizon truncated | `LTV(12mo)` or `LTV(24mo)` = cumulative realized value through that horizon | The board-defensible version. Fader & Hardie: "there is nothing wrong with cutting off the calculation at T; just don't call it *lifetime* value." |

**Explicit disagreement:** Fader & Hardie document that mainstream textbooks give three *different* formulas for the same inputs. Blattberg et al. (2008) and Steenburgh & Avery (2011) use `m(1+d)/(1+d−r)`; Capon (2007), Kotler & Keller (2012) and Lehmann & Winer (2008) use `mr/(1+d−r)`; Ofek (2002) and Davis (2007) use `m/(1+d−r)`. Fader & Hardie note Capon proposes using the residual formula to set an upper bound on acquisition spend "when clearly it should be based off equation (1)." Their conclusion: **"The bottom line is that there is no 'one formula' that can be used to compute customer lifetime value."**

**Second disagreement, and a strong signal:** The SaaS Metrics Standards Board has published standardized definitions for ARR, CARR, GRR, NRR, Logo Retention, Rule of 40, CAC, CAC Payback Period, and three CAC Ratio variants. It has published **no standard for LTV or LTV:CAC**. The industry's own standardization body declined to define it.

**inputs:** Cohort-level revenue by period (billing system: Stripe, RevenueCat, Chargebee, Zuora); cohort survival curves (same); gross margin and cost-to-serve (accounting system / GL); platform commission (App Store Connect, Play Console); discount rate (finance, not marketing).

**application:** Sets the ceiling on acquisition spend, prices retention investment, feeds LTV:CAC and payback, drives pLTV bidding, and is the numerator in any customer-equity valuation.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Consumer app, realized LTV per payer, Year 1, global median | **$23** (North America $32, Western Europe $25, India/SEA $14; top quartile $44+) | RevenueCat, *State of Subscription Apps 2026*, published March 19 2026, 115,000+ apps / $16B revenue, primarily 2025 data |
| Consumer app, realized LTV per payer, Year 1, by category median | Health & Fitness $35.64; Business $35.48; Productivity $24.95; Education $22.82; Gaming $11.22 | Same |
| Consumer app, realized LTV per payer, Month 1, median | Health & Fitness $24.23; Business $18.76; Gaming $8.41 | Same |
| Consumer app, high vs low price tier, Year 1 | $62.19 vs $10.69 | Same |
| B2B SaaS | **NO SOURCED BENCHMARK FOUND** for LTV as a dollar figure. It is not published by any credible benchmark source, because it is not comparable across ACV bands. |

**traps:**

- **The gross-vs-net error, quantified.** Take a $10/month consumer subscription with 10% monthly churn. Naive LTV = $10/0.10 = **$100**. Now apply reality: Apple takes 30% in year one, and at 10% monthly churn essentially the entire cohort dies inside year one, so almost no revenue reaches the 15% rate. That is $70. Apply the North America median refund rate of 3.4% (RevenueCat 2026): $67.62. Apply 20% cost to serve: **$54.10**. The headline number is **1.85x the real one**. At a $40 CAC, headline LTV:CAC is 2.5:1 and actual is 1.35:1. One number says "scale it," the other says "you are barely covering acquisition."
- **Three textbook-correct formulas, 37% spread.** With m=$100, r=0.8, d=0.1: variant #4 gives $366.67, variant #5 gives $333.33, variant #6 gives $266.67. Identical inputs, all defensible, **37.5% spread between highest and lowest.** Nobody in the meeting will ask which one you used.
- **Truncation error cuts both ways.** Fader & Hardie's own example (r=0.8, d=0.1): truncating at the average customer lifetime of 5 years yields 2.92m, versus the true infinite-horizon 3.67m, a **20% understatement**, because 0.8^5 = 32.8% of customers outlive the average. Assuming instead that all customers survive exactly 5 years yields 4.17m, a **13.6% overstatement**.
- **Flat retention is an artifact.** Fader & Hardie: company-reported flat retention "are in fact the result of aggregation across different cohorts." New customers with low retention are averaged in with tenured customers with high retention. Using the blended rate as `r` understates the value of surviving customers and overstates the value of new ones.
- **Subtracting CAC inside LTV.** Some authors write LTV as `... − AC`. Fader & Hardie: "If we are computing CLV in order to estimate an upper bound for spending on customer acquisition, the −AC term should clearly be excluded." Otherwise you build a circular LTV:CAC.
- **Repeat rate is not retention.** In non-contractual settings Fader & Hardie call using a repeat rate in the retention formula "completely wrong," because it measures consecutive-period purchasing, not survival.
- **LTV degrades as you scale.** Hsu: "as the business attracts larger cohorts of customers it's often the case that LTV degrades." Your LTV was measured on the cheap, high-intent cohort you already harvested.
- **Survivorship in the payer denominator.** RevenueCat's realized-LTV-per-payer is per *payer*, not per install. Dividing by payers hides the acquisition funnel entirely.

**related:** CAC, LTV:CAC, CAC Payback, Contribution Margin per Customer, Platform Take Rate, ARPU/ARPPU, Net Revenue Retention, Cohort Payback Curve.

---

## 2. Customer Acquisition Cost (CAC)

**applies_to:** both

**definition:** The cost of acquiring one new paying customer over a defined period.

**formula_variants:**

| # | Variant | Formula | When it is the right one |
|---|---|---|---|
| 1 | Blended CAC | `all S&M spend / all new customers (paid + organic + referral)` | Reporting overall efficiency to a board. **Cannot answer "should we spend more."** |
| 2 | Paid-only CAC | `paid media spend / customers attributed to paid` | Channel-level media evaluation. Contaminated by attribution error. |
| 3 | Fully-loaded CAC | `(media + S&M salaries + commissions + tools + allocated overhead + agency fees) / new customers` | Investor diligence, board reporting, any real profitability claim. |
| 4 | Media-only CAC | `media spend / new customers` | Day-to-day bid and budget decisions where headcount is fixed in the short run. |
| 5 | Marginal CAC | `Δ spend / Δ new customers` | The **only** variant that answers "should we spend more." See metric #3. |
| 6 | Incremental CAC | `spend / incremental customers measured by holdout` | The only causally honest version. See metric #21. |
| 7 | New-logo-only CAC | Excludes resurrected and reactivated customers from the denominator | The conservative and generally correct treatment. |
| 8 | CAC including resurrected | Counts win-backs in the denominator | Flatters CAC. Legitimate only if reactivation spend is in the numerator too. |
| 9 | Sales-cycle-lagged CAC | `S&M spend in period t−1 / new customers in period t` | B2B with a sales cycle over ~45 days. The Standards Board mandates this. |
| 10 | Segment CAC | Same formula, computed per ICP tier / geo / plan | Any business where segments have 3x-plus different CAC and LTV. |

**Explicit disagreement on what goes in the numerator.** The SaaS Metrics Standards Board (© 2023) splits Customer Success cost by *purpose*: its **New CAC Ratio** numerator is "fully loaded Sales and Marketing expenses" with no CS; its **Expansion CAC Ratio** numerator is "fully burdened Sales and Marketing expenses, **including Customer Success expenses**." So the standard's answer to "does CAC include customer success" is: not for new acquisition, yes for expansion. Most operators do not make this split. SaaS Capital (October 3 2024) applies a parallel split on the COGS side, including retention-focused CS in COGS but excluding "customer success costs focused on cross-selling or upselling," which they place in S&M. Ben Murray (The SaaS CFO, updated April 2025) agrees on the axis: "If they sell and receive compensation for ARR/MRR expansion, then I would code them to OpEx as part of the sales team." There is agreement on the *principle* and no standard on the *execution*, and the classification choice moves reported gross margin by several points and reported CAC by more.

**inputs:** Ad platform spend (Meta, Google, TikTok, Apple Search Ads); payroll and commissions (GL / HRIS); tool and agency cost (AP); new customer counts by source (CRM for B2B, billing system for consumer). Note that platform-reported conversions are **not** an acceptable denominator without an incrementality adjustment.

**application:** Denominator of LTV:CAC, numerator of payback, the budget-setting input, and the number every board deck gets wrong.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| B2B SaaS, New CAC Ratio (cost per $1 of new customer ARR) | **$2.00 median** | Benchmarkit, *2025 B2B SaaS Performance Metrics*, 2025 |
| B2B SaaS, Expansion CAC Ratio | **$1.00 median** | Same |
| B2B SaaS, Blended CAC Ratio | **$1.30 median** (2026), down from 2025 which itself fell $0.19 / 12% during 2024 | Benchmarkit, *2026 B2B SaaS & AI-Native Metrics*, 2026 |
| B2B SaaS, S&M as % of revenue | **37% median**; 47% VC-backed vs 33% PE-backed | Benchmarkit 2025 |
| B2B SaaS, S&M as % of ARR | Sales 15% + Marketing 8% = **23%** overall; at $3M-$5M ARR, 12% + 8% = 20% | SaaS Capital, *2026 Spending Benchmarks for Private B2B SaaS Companies*, published June 10 2026, 1,000+ companies, surveyed March 2026 |
| Consumer subscription apps, CAC / cost per paying user | **NO SOURCED BENCHMARK FOUND.** RevenueCat's 2025 edition had a CPPU section but published only qualitative regional commentary outside the gated PDF; the 2026 edition dropped CPPU entirely. The widely circulated claim that "CPPU runs 4-5x CPI" could not be traced to any primary source. |

**traps:**

- **Blended CAC is a lagging indicator that hides a dying channel.** Organic growth in the denominator subsidizes deteriorating paid performance. A company whose paid CAC has doubled can show flat blended CAC purely because word-of-mouth grew.
- **The denominator is usually platform-attributed conversions, which are not real.** Gordon, Zettelmeyer, Bhargava & Chapsky (*Marketing Science* 38(2), 193-225, published online April 4 2019) ran 15 US Facebook campaigns as RCTs covering 500 million user-experiment observations and 1.6 billion impressions, then compared observational methods against them: "Generally, the observational methods overestimate ad effectiveness relative to the RCT... **in half of our studies, the estimated percentage increase in purchase outcomes is off by a factor of three across all methods.**" If your CAC denominator is off by 3x, your CAC is off by 3x.
- **Timing mismatch.** Spending in Q1 to close in Q3 and dividing Q1 spend by Q1 closes understates CAC during growth and overstates it during a slowdown. The Standards Board requires lagging spend by the sales cycle.
- **Resurrected customers laundering the number.** A win-back campaign that reactivates 200 lapsed users at $5 each, counted as "new customers," drags reported CAC down without acquiring anyone.
- **Fully-loaded vs media-only is a 2x to 3x difference**, and which one is quoted usually depends on whether the speaker is raising money.
- **Free trials are not customers.** Counting trial starts in the denominator produces a number with no relationship to anything.

**related:** Marginal CAC, Incremental CAC, CAC Ratio, CAC Payback, LTV:CAC, CPI, Cost per Trial, Cost per Paying Customer.

---

## 3. Marginal CAC (Incremental-Spend CAC)

**applies_to:** both

**definition:** The cost of the *next* customer at the current spend level, rather than the average cost of all customers acquired so far.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Simple marginal | `Δ spend / Δ new customers` between two adjacent periods or budget levels | The working definition. Requires that nothing else changed. |
| 2 | Test-and-learn marginal | Deliberately step budget +20% / +40% and read the response | Cleanest practical method. Confounded by seasonality unless you also run a control geo. |
| 3 | Response-curve marginal | First derivative of a fitted saturation curve (Hill, Adstock, or diminishing-returns power form) at current spend | When you have enough spend variation, typically from MMM (Meta Robyn, Google Meridian). |
| 4 | Marginal on incremental conversions | `Δ spend / Δ incremental conversions from a geo holdout` | The honest version. Combines saturation and incrementality. |
| 5 | Marginal contribution CAC | `Δ spend / Δ new customers`, compared against marginal contribution margin rather than LTV | When you need a spend-stop rule rather than a spend-more rule. |

**No consensus:** There is no standard-body definition of marginal CAC and no published benchmark for it anywhere. It is a first-principles calculation, not a reported metric.

**inputs:** Spend and acquisition counts at multiple distinct spend levels (ad platforms + billing system); ideally a geo control; for variant 3, 2+ years of weekly spend and outcome data by channel.

**application:** This is the metric that actually answers the budget question. It sets the stop-loss on scaling a channel and identifies the point where reallocating to a second channel beats adding dollars to the first.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** No publisher issues marginal CAC benchmarks. The relevant published evidence is directional: Andrew Chen's "The Law of Shitty Clickthroughs" documents banner CTR falling from 78% on HotWired in 1994 to 0.05% on Facebook ads in 2011, a 1500x decline, and warns that a "30% increase in CAC and 30% decrease in LTV" can "double the time it takes to get to profitability."

**traps:**

- **The core arithmetic, which is the entire case against blended CAC.** You spend $100k and acquire 1,000 customers. Blended CAC = $100. You raise spend to $150k and acquire 1,300. Blended CAC is now $115, comfortably under a $150 target, so the dashboard says keep going. But marginal CAC on that increment is $50,000 / 300 = **$167**, already over target. Blended understates the true cost of the next customer by 45%. Push to $200k and get only 150 more: marginal CAC = **$333**, while blended still reads a reassuring $138. You are buying customers at 2.2x your target while every dashboard says you are fine.
- **Two periods is not a curve.** A single Δ can be entirely seasonality, a competitor pausing, or a creative refresh. Marginal CAC computed from two adjacent months without a control is noise.
- **Marginal CAC is not stable.** It moves with auction density, creative fatigue, and seasonality. A number measured in Q4 does not hold in Q1.
- **Channel-level marginal CAC ignores cross-channel cannibalization.** Scaling prospecting inflates retargeting volume, which then claims credit for conversions prospecting created.
- **Confusing marginal with incremental.** Marginal CAC handles *saturation* (the next dollar buys less). Incremental CAC handles *causality* (some of what you already bought would have happened anyway). You need both. A channel can have healthy marginal economics on attributed conversions and zero incrementality.

**related:** CAC, Incremental CAC / iROAS, MMM, CAC Payback, ROAS.

---

## 4. LTV:CAC Ratio

**applies_to:** both

**definition:** How many dollars of customer lifetime value each dollar of acquisition cost buys.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Revenue LTV : blended CAC | `revenue LTV / blended CAC` | The most-quoted and least-defensible version. |
| 2 | Gross-profit LTV : fully-loaded CAC | `(LTV × gross margin) / fully-loaded CAC` | The version to standardize on. Both sides on a comparable basis. |
| 3 | Contribution-margin LTV : fully-loaded CAC | `(LTV × contribution margin) / fully-loaded CAC` | Consumer subscription, where platform fee and payment processing are large and variable. |
| 4 | Fixed-horizon | `24-month realized gross-profit LTV / CAC` | Board-defensible. Removes the infinite-horizon argument entirely. |
| 5 | Marginal LTV:CAC | `LTV of the marginal cohort / marginal CAC` | The scaling decision. Both numerator and denominator degrade as you scale, so this falls much faster than the blended ratio. |
| 6 | Cohort LTV:CAC | Realized cohort value at month N over that cohort's actual acquisition cost | The only version that avoids mixing a forward-looking numerator with a backward-looking denominator. |

**Origin and status of the 3:1 rule:** David Skok (For Entrepreneurs, *SaaS Metrics 2.0*): "The best SaaS businesses have a LTV to CAC ratio that is higher than 3, sometimes as high as 7 or 8." It was framed as a viability floor, not a target. Ben Murray (The SaaS CFO, May 19 2021) treats it as a rule of thumb rather than an empirical finding and flags its central defect: the standard LTV formula "is a point in time calculation. Meaning, if you expand that customer later, it is not factored into your initial LTV calculation." As noted above, the SaaS Metrics Standards Board publishes no LTV:CAC standard at all.

**inputs:** Everything feeding LTV and CAC. No independent inputs.

**application:** Go/no-go on a channel or segment, board-level efficiency reporting, and (misguidedly) fundraising narrative.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| SaaS, general | "Higher than 3, sometimes as high as 7 or 8" for the best businesses | David Skok, For Entrepreneurs, *SaaS Metrics 2.0* (no page date shown; the 3x guidance originates in his 2010s SaaS metrics work) |
| B2B SaaS, by ACV band | **NO SOURCED BENCHMARK FOUND.** Neither Benchmarkit 2025/2026, SaaS Capital 2026, nor ChartMogul publishes a segmented LTV:CAC. This is a real absence, not a search failure. |
| Consumer subscription apps | **NO SOURCED BENCHMARK FOUND.** RevenueCat publishes neither LTV:CAC nor payback. |

**traps:**

- **It is two unstandardized metrics stacked, so error compounds multiplicatively.** If LTV is overstated 1.85x by the gross-revenue error (see metric #1) and CAC is understated 1.4x by using media-only spend, the reported ratio is **2.6x** the truth. A reported 3.9:1 is really 1.5:1.
- **The ratio is scale-blind.** 3:1 at $50k/month of spend and 3:1 at $5M/month are completely different businesses. The ratio tells you nothing about whether the next dollar clears the bar, which is the only decision it gets used for.
- **A very high ratio is a signal to spend more, not a trophy.** An 8:1 ratio usually means underinvestment in acquisition, not excellence.
- **Infinite-horizon LTV makes the ratio unfalsifiable.** Any ratio can be achieved by extending the horizon. Pin it to 12 or 24 months.
- **Mixing time frames.** Forward-looking modeled LTV over trailing-quarter CAC is not a ratio of anything.
- **It cannot be a spending rule.** A 3:1 blended ratio is consistent with marginal spend at 0.8:1.

**related:** LTV, CAC, CAC Payback (which is strictly more useful for decisions), CAC Ratio, Magic Number.

---

## 5. CAC Payback Period

**applies_to:** both

**definition:** How many months of a new customer's revenue (or margin) it takes to repay what you spent acquiring them.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Gross revenue basis | `CAC / MRR per new customer` | Fastest, most flattering, and the version most often quoted without a label. |
| 2 | Gross margin basis | `CAC / (MRR per new customer × gross margin %)` | The Standards Board definition and the correct default. |
| 3 | Contribution margin basis | `CAC / (MRR × contribution margin %)` | When cost to serve is material and variable (consumer subscription, usage-heavy, AI-native). |
| 4 | Standards Board form | `Fully Loaded S&M Expenses / (CARR from New Customers × Subscription Gross Margin %) × 12` | The one to cite in a diligence conversation. Uses new-customer CARR, not net new ARR, and applies gross margin. |
| 5 | Sales-cycle-lagged | Same as #4 with S&M taken from the period preceding new ARR by the sales cycle length | Any B2B business with a cycle over ~45 days. |
| 6 | Expansion-inclusive | Denominator uses net new ARR including expansion | Common at enterprise companies. Flatters payback substantially. **Not** the Standards Board definition. |
| 7 | Cohort-observed payback | Month at which cumulative realized cohort gross profit crosses cohort acquisition cost | The only version immune to formula argument. See metric #6. |
| 8 | Discounted payback | Same as #7 with cash flows discounted at WACC | When payback exceeds ~18 months and the time value is no longer negligible. |

**Explicit disagreement:** The Standards Board applies gross margin and uses new-customer CARR only. Bessemer's segmented targets are stated on a simpler basis. Many operators quote #1. **The same company can honestly report 12, 15, or 18.5 months** depending only on basis choice. See traps.

**inputs:** Fully loaded S&M by period (GL); new customer count and their contracted ARR/MRR (CRM or billing); subscription gross margin (GL); sales cycle length (CRM).

**application:** The single best unit-economics metric for a decision, because it is denominated in time (which is cash) rather than in an unfalsifiable ratio. Drives burn planning, working-capital needs, and how aggressively you can bid.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| B2B SaaS, all | **11 months median** | Benchmarkit, *2026 B2B SaaS & AI-Native Metrics*, 2026 |
| SMB-focused SaaS | Target **under 12 months** | Bessemer Venture Partners, *Scaling to $100 Million*, published Sept 21 2021, updated 2024; ~200 cloud investments 2010 to H1 2021 |
| Mid-market-focused SaaS | Target **under 18 months** | Same |
| Enterprise-focused SaaS | Target **under 24 months** | Same |
| SaaS at $1M-$10M ARR | **15 months average**, rising gradually with maturity as early adopters get costlier | Same |
| Best-in-class SaaS | "Many of the best SaaS businesses are able to recover their CAC in **5-7 months**"; profitability becomes "anemic if the time to recover CAC extends beyond 12 months" | David Skok, For Entrepreneurs, *SaaS Metrics 2.0* |
| Consumer subscription apps | **NO SOURCED BENCHMARK FOUND.** The closest published analogue is gaming breakeven ROAS timing (AppsFlyer, *State of App Monetization, 2024 Edition*, Q3 2024 data): iOS mid-core on in-app-purchase models breaks even between Days 7 and 14; casual Android hybrid closer to Day 30. |

**traps:**

- **Basis choice decides pass/fail, quantified.** CAC $1,200, ARPA $100/month. On gross revenue: **12.0 months**. On 80% gross margin: **15.0 months**. On 65% contribution margin: **18.5 months**. Against Bessemer's SMB bar of under 12 months, the same business passes on basis #1 and fails by more than 50% on basis #3. Nothing about the business changed.
- **Expansion in the denominator is the most common manipulation.** Including expansion ARR converts a new-customer acquisition metric into a blended growth-efficiency metric and shortens reported payback materially at any company with NRR above 100%.
- **Payback ignores everything after payback.** Two businesses with identical 12-month payback, one with 90% annual retention and one with 40%, are not comparable. Payback must be read alongside retention, never alone.
- **Consumer annual plans hide the real risk.** An annual plan collects 12 months of cash on day one, so payback looks instant, but RevenueCat 2026 reports that **Month 1 accounts for 35% of all annual-plan cancellations** (range 23% to 50% by category), and refunds run 2.5% to 4.7% median by category. Cash-basis payback of "day 0" is fiction until the refund window closes.
- **Free trials are excluded from Apple's paid-service clock**, so a 30-day trial delays both revenue *and* the start of the 12-month countdown to the 15% commission rate.
- **Averaging across segments.** A blended 11-month payback covering a 4-month self-serve motion and a 30-month enterprise motion describes neither.

**related:** CAC, Gross Margin, Contribution Margin, Cohort Payback Curve, CAC Ratio, Magic Number, Burn Multiple.

---

## 6. Cohort Payback Curve (Cohort-Basis Payback)

**applies_to:** both

**definition:** The realized cumulative margin per acquired cohort plotted against time, read against that cohort's actual acquisition cost, rather than a modeled single-point payback figure.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Cumulative gross profit curve | For cohort c: `Σ(t=0→T) (revenue_c,t × GM) / cohort size`, plotted vs `CAC_c` | The default. Crossing point is the honest payback. |
| 2 | Cumulative net revenue curve | Same with platform fees and refunds netted out, before COGS | Consumer subscription, where platform take is the dominant cost. |
| 3 | Cash-basis curve | Actual cash collected, timed to payout schedules and refund windows | Runway and working-capital planning. Apple and Google pay on a lag. |
| 4 | Indexed multiple-of-CAC curve | `cumulative margin / CAC`, so every cohort is plotted on the same axis with 1.0x as breakeven | Comparing cohorts of different vintages and different CAC. The best visualization. |
| 5 | Cohort-over-cohort overlay | Same curve for each acquisition month, overlaid | Detecting cohort quality degradation as spend scales. This is the point of the exercise. |
| 6 | Partial-cohort projection | Fit surviving-cohort curve shape to project immature cohorts | Necessary for recent cohorts. The step where most people introduce optimism. |

**inputs:** Transaction-level revenue tagged to acquisition cohort (billing system); cohort-level acquisition spend (ad platforms plus GL, joined on acquisition date); refunds and chargebacks; platform fee by transaction (App Store Connect / Play Console financial reports).

**application:** Detects whether unit economics are degrading as you scale, which no single-point metric can. Hsu's framing is that the Cohort Statement is the startup-stage equivalent of a balance sheet, and that it and the Growth Accounting Statement "fact check" each other.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Consumer app, revenue per install D14 to D60 multiplier | **1.5x is typical** | RevenueCat, *State of Subscription Apps 2026*, March 19 2026 |
| Consumer app, revenue per install, all categories median | **$0.23 at D14, $0.34 at D60** (2025 edition: $0.31 at D60) | Same |
| Consumer app, RPI D60 by store | App Store $0.42 vs Google Play $0.16 (2.6x); North America iOS $0.65 / Android $0.26; top-tier iOS North America reaches $1.47 | Same |
| Consumer app, RPI D60 by access method | Hard paywall **$3.09** vs freemium **$0.38** | Same |
| Consumer app, subscription revenue shape | "reaching at least 50% of Day 90 revenue" by Days 3-7 as trial users convert, with renewals at Day 30+ and 60+ continuing to drive growth | AppsFlyer, *State of App Monetization, 2024 Edition*, Q3 2024 |
| B2B SaaS cohort payback curves | **NO SOURCED BENCHMARK FOUND.** Not published in curve form by any benchmark source. |

**traps:**

- **Projecting immature cohorts off mature-cohort shape.** The whole reason to build cohort curves is that cohort shape changes as you scale. Borrowing the shape of a 2023 cohort to project a 2026 cohort assumes away the finding.
- **Survivorship in the curve.** Dividing by *surviving* customers rather than original cohort size makes every curve slope upward forever. Hsu's definition is explicit: divide by "the total number of customers in the cohort **including customers who may have churned out**."
- **Not joining spend to cohort.** Most companies can produce revenue cohorts and cannot produce the matching acquisition cost, so they compare cohort revenue to a blended company-wide CAC. That defeats the purpose.
- **Ignoring the platform payout lag and refund window.** Cash-basis and accrual-basis curves diverge for the first 60 to 90 days, exactly the window where payback decisions get made.
- **Reading D30 as destiny for annual plans.** With an annual plan the curve is a step function, and the interesting question is the month-12 renewal, where RevenueCat 2026 reports a universal pre-renewal cancellation uptick of 9% to 14%.

**related:** LTV (cohort-observed variant), CAC Payback, Retention, ROAS curves.

---

## 7. Gross Margin

**applies_to:** both

**definition:** Revenue minus cost of revenue, as a percentage, where cost of revenue is what it costs to deliver the product to a customer who already exists.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Blended / total | `(total revenue − total COGS) / total revenue` | GAAP reporting. Diluted by services. |
| 2 | Subscription-only / recurring | `(subscription revenue − subscription COGS) / subscription revenue` | The number that belongs in LTV and payback. |
| 3 | Services gross margin | `(services revenue − services COGS) / services revenue` | Isolating implementation drag. |
| 4 | Net-of-platform-fee | `(gross billings − platform commission − payment processing − refunds − COGS) / gross billings` | Consumer subscription apps. Without this, every downstream metric is wrong. |
| 5 | Marginal / incremental | `Δ gross profit / Δ revenue` | Usage-based and AI-native products where COGS scales with consumption. |
| 6 | Cohort gross margin | Gross margin computed per acquisition cohort | When cost to serve differs by cohort (heavy users, enterprise support tiers). |

**Explicit disagreement on COGS composition:**

| Cost line | SaaS Capital (Oct 3 2024) | Ben Murray / The SaaS CFO (upd. Apr 2025) | Status |
|---|---|---|---|
| Hosting / cloud | Include | Include | Agreed |
| DevOps / production engineering | Include | Include | Agreed |
| Technical support | Include | Include | Agreed |
| Third-party data/API in the product | Include | Include | Agreed |
| Customer success | Include if retention-focused; **exclude** if cross-sell/upsell focused; exclude account management | Code to OpEx "if they sell and receive compensation for ARR/MRR expansion" | Same axis, no standard, swings GM by several points |
| Professional services / implementation | **Report separately** from core SaaS, citing ASC 606/340 | **Include in COGS** | Direct disagreement |
| Amortized capitalized software dev | **Exclude** | Not addressed | Contested |
| Sales commissions | Exclude | Exclude | Agreed |
| **App store commission** | Not addressed | Not addressed | **Neither authority contemplates it at all** |

**inputs:** GL cost-of-revenue accounts; cloud bills; platform financial reports; support and CS payroll with an allocation rule you write down and keep.

**application:** Converts revenue LTV to profit LTV, sets the payback denominator, and is the single largest driver of the gap between headline and real unit economics in consumer subscription.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| B2B SaaS, software gross margin median | **80%+**, "stable through 4 years"; report notes "Industry-wide AI infrastructure costs have not yet compressed software margin at the median" | Benchmarkit, *2026 B2B SaaS & AI-Native Metrics*, 2026 |
| B2B SaaS, total revenue / subscription / services | **77% / 81% / 30%** median | Benchmarkit, *2025 B2B SaaS Performance Metrics*, 2025 |
| B2B SaaS, license revenue | **80% to 85%** | SaaS Capital, *What Should Be Included in COGS for My SaaS Business?*, Oct 3 2024 |
| Cloud portfolio, all stages | **65% to 70%**, middle 50% within 60-80% | Bessemer, *Scaling to $100 Million*, Sept 21 2021 / upd. 2024 |
| AI product lines | **45% in 2025**, projected 53% in 2026 and 59% in 2027; inference cost roughly 23% of revenue | ICONIQ Growth, *2026 State of AI: The Builder's Economy*, July 2026, ~300 executives surveyed Q2 2026 |
| Consumer subscription apps | **NO SOURCED BENCHMARK FOUND.** No publisher issues one. Public-company proxies from SEC filings: Duolingo FY2025 **72.2%** (72.8% FY2024, 73.2% FY2023) and Match Group FY2025 **72.8%** (71.5% FY2024). Two companies is not a benchmark. |

**traps:**

- **The B2B 80% benchmark does not contemplate a platform take.** Neither SaaS Capital nor The SaaS CFO addresses app store commissions in their COGS guidance. Comparing a consumer subscription app to an 80% SaaS gross margin benchmark is a category error unless you first net the 15% to 30% platform fee.
- **Benchmarkit and ICONIQ appear to contradict each other and do not.** Benchmarkit says the median software gross margin is unmoved at 80%; ICONIQ says AI products run 45%. Benchmarkit measures the median B2B SaaS company, most of which bolted AI onto an existing high-margin business. ICONIQ measures AI product lines at companies building AI natively. The correct read is that AI has not moved the SaaS median, and AI-native products carry structurally different economics.
- **ICONIQ's improvement curve is self-reported operator projection, not audited results.** Weight the 2025 actual (45%) far above the 2027 projection (59%).
- **Blended gross margin hides services drag.** At Benchmarkit's 2025 medians, a company at 81% subscription and 30% services reports 77% blended. Using 77% in an LTV calculation understates the value of a pure-software customer.
- **CS classification is a lever, not a fact.** Moving customer success between COGS and OpEx moves gross margin by several points and moves CAC in the opposite direction, improving both metrics is impossible but improving the one being examined is easy.
- **Gross margin by ARR band does not exist in verifiable published form.** Every specific figure found for that cut came from unattributed content sites.

**related:** Contribution Margin, Cost to Serve, Platform Take Rate, LTV, CAC Payback, Rule of 40.

---

## 8. Contribution Margin per Customer (Unit Contribution)

**applies_to:** both

**definition:** What one customer contributes to fixed costs and profit after every variable cost of serving them, including the ones that sit below the gross margin line.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Per-period contribution | `ARPU − variable cost to serve per user` | Steady-state operating decisions. |
| 2 | Lifetime contribution | `LTV − lifetime cost to serve` | The correct number to compare against CAC. |
| 3 | Contribution after CAC (CM2/CM3 style) | `lifetime contribution − CAC` | True per-customer profit. Negative here means growth destroys value. |
| 4 | First-order contribution (marketplace / commerce) | `net revenue − COGS − payment processing − fulfilment − refunds` | Any business with per-transaction variable costs. |
| 5 | Consumer subscription contribution | `gross billings − platform commission − refunds − payment processing − support − infrastructure` | Consumer apps. Platform commission is the largest single line. |
| 6 | Marginal contribution | `Δ contribution / Δ customers` | Deciding whether the next cohort is worth acquiring. |

**No consensus:** There is no standard definition of contribution margin for subscription software. Ecommerce practitioners use a numbered ladder (CM1, CM2, CM3) with no agreement on what each level contains. SaaS has no equivalent convention at all.

**inputs:** ARPU by cohort (billing); platform fees and processing (platform reports, Stripe); support cost per ticket and tickets per user (Zendesk / Intercom plus payroll); infrastructure cost per active user (cloud billing with tagging); refund and chargeback rate (billing).

**application:** The correct denominator for payback in any business with material cost to serve, and the number that determines whether scaling is value-creating or value-destroying.

**benchmark:** **NO SOURCED BENCHMARK FOUND** for contribution margin per customer in either consumer subscription or B2B SaaS. No benchmark publisher reports it. The nearest sourced inputs are SaaS Capital's *2026 Spending Benchmarks* (June 10 2026, 1,000+ private B2B SaaS companies, surveyed March 2026), which reports hosting at **5% of ARR**, DevOps at **4% of ARR**, and Customer Support/Success at **9% of ARR**, and ICONIQ's inference cost at roughly **23% of revenue** for AI products.

**traps:**

- **Support cost is not uniform and the average lies.** If 10% of users generate 60% of tickets, average support cost per user makes your heavy segment look profitable when it is not.
- **AI inference is a variable cost masquerading as a fixed one.** At ICONIQ's ~23% of revenue, an AI feature can invert contribution margin for heavy users while the company average looks acceptable.
- **Ignoring involuntary churn recovery cost.** RevenueCat 2026 reports failed billing accounts for **32.2% of all cancellations on Google Play and 15.2% on the App Store**. Dunning and recovery infrastructure is a real per-customer cost.
- **Excluding refunds.** RevenueCat 2026 puts median refund rates at 2.5% to 4.7% by category, 7.7% in India/SEA, with outlier apps at 9% to 18%. That comes straight off contribution.
- **Treating discounts as marketing rather than negative revenue.** In B2B, a 20% discount is a 20% cut to contribution, not a marketing expense.

**related:** Gross Margin, Cost to Serve, CAC Payback (contribution basis), LTV, Refund Rate.

---

## 9. Cost to Serve (COGS per Customer)

**applies_to:** both

**definition:** The variable cost of keeping one existing customer running for a period.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Simple average | `total COGS / average active customers` | Reporting. Hides all segment variance. |
| 2 | Component build-up | `infrastructure + support + CS + third-party data + processing`, each per customer | Planning and pricing. |
| 3 | Usage-weighted | Allocate infrastructure by actual consumption (API calls, storage, tokens) | Usage-based and AI-native products. The only defensible method there. |
| 4 | Segment cost to serve | Same, computed per plan tier or ICP | When enterprise customers consume 10x the support of self-serve. |
| 5 | Marginal cost to serve | `Δ COGS / Δ customers` | Testing whether you actually have operating leverage. |

**inputs:** Cloud billing with per-tenant tagging (the hard part, and most companies cannot do it); support ticket volume by account; CS headcount allocation; third-party API and data contracts; payment processing.

**application:** Sets contribution margin, determines minimum viable price, identifies unprofitable segments, and is the input most companies simply do not have.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| B2B SaaS, hosting | **5% of ARR** | SaaS Capital, *2026 Spending Benchmarks for Private B2B SaaS Companies*, June 10 2026, 1,000+ companies |
| B2B SaaS, DevOps | **4% of ARR** | Same |
| B2B SaaS, Customer Support / Success | **9% of ARR** | Same |
| AI products, inference cost | **~23% of revenue** average, wide vendor variance; 66% of respondents cut cost per query by 10%+ and 19% by 30%+ | ICONIQ Growth via SaaStr (Jan 28 2026) and SaaSletter (Jul 16 2026), both citing ICONIQ *State of AI* |
| Consumer subscription apps | **NO SOURCED BENCHMARK FOUND** for cost to serve excluding platform fees. |

**traps:**

- **Untagged cloud spend makes per-customer cost unknowable.** Most companies allocate by headcount or revenue share, which is circular and guarantees the answer confirms the assumption.
- **Support cost lags acquisition.** A cohort acquired this month generates its ticket load over the following 90 days, so current-period COGS over current-period customers understates cost during growth.
- **AI cost per query falls over time**, so a cost-to-serve figure measured today may be materially wrong in six months in either direction depending on usage growth versus unit cost decline.
- **CS classification.** See Gross Margin. Whether CS sits in COGS or S&M is unstandardized and moves this number by roughly the full 9% of ARR SaaS Capital measures.

**related:** Gross Margin, Contribution Margin, Platform Take Rate, LTV.

---

## 10. Platform Take Rate / Net Revenue Ratio

**applies_to:** consumer (primarily); b2b where sold through a marketplace (AWS Marketplace, Salesforce AppExchange)

**definition:** The share of gross billings the distribution platform keeps, and by extension the fraction of headline revenue that ever reaches your P&L.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Nominal take rate | Published commission % | Never sufficient on its own. |
| 2 | Effective blended take rate | `1 − (net proceeds / gross billings)` across all transactions | The number that actually belongs in your model. |
| 3 | Tenure-weighted take rate | Weight 30% year-one and 15% post-year-one by the share of billings in each state | Apple subscriptions at any scale. |
| 4 | Channel-mix take rate | Weight iOS / Android / web by revenue share | Any app with a web billing option. |
| 5 | All-in cost of monetization | Platform commission + payment processing + billing infrastructure + tax handling | Comparing in-app purchase against a web checkout. |
| 6 | Net revenue ratio | `net proceeds / gross billings` (the complement) | Cleaner to multiply through a model. |

**Current rates, verified from primary sources (July 2026):**

| Platform | Rate | Source |
|---|---|---|
| Apple standard (paid apps + IAP) | **30%** | Apple Developer |
| Apple subscriptions, year one | 30% (you receive 70%) | developer.apple.com/app-store/subscriptions/ |
| Apple subscriptions, after one year of **paid service** | 15% (you receive 85%) | Same |
| Apple Small Business Program | **15%** at all billing cycles; threshold **$1M USD in proceeds** in the prior calendar year and under $1M in the current year, across all Associated Developer Accounts | developer.apple.com/app-store/small-business-program/ |
| Apple, China mainland only, effective **March 15 2026** | Standard 30% → **25%**; SBP and post-year-one subscriptions 15% → **12%** | Apple Developer News, Mar 12 2026 |
| Apple, US external purchase links | **0% currently.** App Review Guidelines 3.1.1(a): entitlements "are not required for developers to include buttons, external links, or other calls to action in their United States storefront apps," and the anti-steering prohibition applies "In all other storefronts, except for the United States storefront, where this prohibition does not apply." | Apple App Review Guidelines |
| Apple EU (DMA), stacked | Initial Acquisition Fee 2% + Store Services Tier 1 5% (mandatory) or Tier 2 13% (optional) + Core Technology Commission 5%. Standard Tier 2 ≈ **20%**; standard Tier 1 ≈ **12%**; SBP Tier 2 ≈ **15%**; SBP Tier 1 ≈ **10%**. Core Technology Fee €0.50 per first annual install above 1M/year. | developer.apple.com EU DMA support pages |
| Google Play, legacy markets | 15% on first $1M annual earnings, 30% above; **15% on auto-renewing subscriptions regardless of earnings** | support.google.com/googleplay/android-developer/answer/112622 |
| Google Play, **new structure effective June 30 2026** (US, UK, EEA) | Service fee **decoupled from billing fee**. New installs: 20% + 5% billing (non-recurring), **10% + 5% billing (subscriptions)**, 10% + 5% on first $1M. Existing installs: 25% + 5%, 20% base for subscriptions, **20% for external web links**. "For transactions processed via alternative billing or external web links, the billing fee does not apply." Rollout: US/UK/EEA Jun 30 2026, Australia/Japan Sep 30 2026, South Korea Dec 31 2026, rest of world Sep 30 2027. | Android Developers Blog, Jun 24 2026; Play Console Help |
| Google Play user-choice billing | Service fee reduced by **4 percentage points** (India, South Korea, EEA, US). Largely superseded in rolled-out markets by the decoupled model. Do not stack. | support.google.com/googleplay/android-developer/answer/10281818 |
| Stripe | 2.9% + $0.30 per transaction; +1.5% international cards; +1% currency conversion. Stripe Billing 0.7% of billing volume pay-as-you-go. | stripe.com/pricing |
| Paddle (merchant of record) | **5% + $0.50** per checkout, all-inclusive | paddle.com/pricing |
| RevenueCat | Free to $2,500 monthly tracked revenue, then **1% of MTR** | revenuecat.com/pricing |

**Legal volatility, flagged:** The US 0% link-out rate is a court-imposed interim state. Judge Gonzalez Rogers held Apple in civil contempt April 30 2025 and barred any commission on US external-link purchases. The Ninth Circuit affirmed the contempt finding on December 11 2025 but **vacated the total commission ban** as "not an appropriately cabined civil contempt sanction," permitting Apple to charge a fee reflecting "costs that are genuinely and reasonably necessary for its coordination of external links." Justice Kagan denied Apple's stay application May 6 2026. The Supreme Court **granted certiorari June 30 2026** (*Apple Inc. v. Epic Games*, No. 25-1311). As of July 7 2026 the remand is still open. **Do not model 0% as permanent.**

**inputs:** App Store Connect and Play Console financial reports (gross billings and proceeds by transaction); subscriber tenure distribution; channel revenue mix; payment processor statements.

**application:** Multiplies through every downstream metric. Sets the true LTV ceiling, the real payback denominator, and the economic case for a web billing funnel.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Consumer app web revenue as share of total | **3.2% global**, 4.9% North America, 0.8% India/SEA. Adoption concentrated at the top: 41% of top-tier apps take web revenue vs 1.3% of hobby-tier apps | RevenueCat, *State of Subscription Apps 2026*, March 19 2026 |
| Published blended effective platform take rate | **NO SOURCED BENCHMARK FOUND.** No publisher issues one. You must compute it from your own App Store Connect and Play Console proceeds. |

**traps:**

- **Assuming 15% because you read about the second-year rate.** Apple's clock runs on **days of paid service**, not calendar tenure. Free trials and renewal extensions are **excluded**. Days stop accumulating on lapse and resume only if recovered within 60 days. Days are specific to each subscription group. At RevenueCat's 2026 medians, monthly-plan year-one retention is 8% and yearly-plan year-one retention is 28%, meaning **the overwhelming majority of consumer subscription revenue never reaches the 15% rate.** Modeling a blended 15% take rate is one of the most expensive errors in this family.
- **The $1M SBP threshold is measured in proceeds, not gross.** At a 30% commission that is roughly $1.43M in gross billings, so the practical ceiling is higher than most write-ups state.
- **Google Play comparisons written before March 2026 are obsolete.** The "15% / 30% / 15% subs" framing is now legacy-market-only. Most content still ranking in search is wrong.
- **The Epic-Google settlement caps (9% / 20%) are not operative.** Judge Donato has not approved the settlement; as of April 2026 the October 2024 injunction remains in full effect and Google and Epic withdrew their joint modification motion on July 15 2026. Use Google's published rate card.
- **Arithmetic of the US link-out arbitrage.** Apple IAP standard is 30%. US external link today is roughly 0% Apple plus ~3.6% Stripe plus ~0.7% Stripe Billing, about **4.3% all-in**. That is a ~26 point swing, which is precisely why it is at the Supreme Court. A model that banks on it should carry an explicit scenario for a court-set fee.

**related:** Gross Margin, Contribution Margin, LTV, ARPU, Refund Rate, Cost per Paying Customer.

---

## 11. ARPU (Average Revenue Per User)

**applies_to:** both

**definition:** Average revenue generated per user over a period, where "user" includes non-payers.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Period ARPU | `revenue in period / average active users in period` | Standard reporting. |
| 2 | ARPU per install / RPI | `cumulative revenue / installs` at day N | Mobile UA. The number that pairs with CPI. |
| 3 | Gross vs net ARPU | Before vs after platform commission and refunds | **Always specify.** The 30% gap is the whole ballgame. |
| 4 | New-user ARPU | Revenue from the acquisition cohort only | Evaluating incoming cohort quality. |
| 5 | Blended ARPU (subscription + ads + IAP) | All revenue streams over all users | Hybrid monetization apps. |

**No consensus:** "Active user" is undefined across the industry. MAU, DAU, registered, and installed all produce different ARPU from identical revenue. RevenueCat does not publish "ARPU" by that name at all, using Revenue Per Install and Realized LTV per Payer instead.

**inputs:** Revenue (billing system, net of platform fee if you want the honest number); active user counts (product analytics: Amplitude, Mixpanel, Firebase).

**application:** Numerator of the naive LTV formula, denominator basis for payback, and the primary comparator against CPI and CAC.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Consumer app, RPI D14 / D60, all categories median | **$0.23 / $0.34** | RevenueCat, *State of Subscription Apps 2026*, Mar 19 2026 |
| By category, D14 / D60 median | Health & Fitness $0.48 / $0.66; Business $0.31 / $0.50; Gaming $0.08 / $0.14 | Same |
| By geography, D14 / D60 median | North America $0.38 / $0.55; Western Europe $0.25 / n.s.; India/SEA $0.08 / $0.11 | Same |
| By price tier, D14 / D60 | High-priced $0.61 / $0.94; low-priced $0.08 / $0.11 | Same |
| Non-gaming subscription apps, **Day 90 ARPU** | **$8.39 iOS vs $1.54 Android** (high income markets: North America and Western Europe) | AppsFlyer, *The State of App Monetization, 2024 Edition*, Q3 2024 data |
| B2B SaaS ARPU | Not a standard B2B metric. See ARPA (#13). |

**traps:**

- **Gross ARPU against net CAC.** If ARPU is pre-commission and CAC is a real cash outflow, the comparison is meaningless. A $0.34 D60 RPI is roughly **$0.24 net** of Apple's year-one 30%.
- **RPI vs revenue per payer are off by an order of magnitude and get confused constantly.** RevenueCat's D60 RPI median is $0.34; its month-one realized LTV *per payer* for Health & Fitness is $24.23. Both are legitimate; quoting one as the other is a 70x error.
- **Denominator drift.** ARPU rises automatically when a churn purge shrinks the user base. It is not a monetization improvement.
- **Mixing subscription and ad revenue** without saying so makes ARPU incomparable across periods when the mix shifts.

**related:** ARPPU, ARPA, ARPDAU, LTV, CPI, Platform Take Rate.

---

## 12. ARPPU (Average Revenue Per Paying User)

**applies_to:** consumer (primarily)

**definition:** Average revenue per user who actually paid, excluding non-payers from the denominator.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Period ARPPU | `revenue in period / paying users in period` | Standard. |
| 2 | Realized LTV per payer | `cumulative net value per average paying user through period T` including renewals, reactivations, expansion, one-time purchases | RevenueCat's definition and the more useful form. |
| 3 | Net ARPPU | Same, after platform commission and refunds | The version that belongs in a margin calculation. |
| 4 | ARPPU by plan duration | Computed separately for weekly / monthly / annual | Essential. The three have completely different economics. |
| 5 | Relationship form | `ARPU = ARPPU × payer conversion rate` | Decomposing whether a change came from monetization or conversion. |

**inputs:** Revenue and paying-user counts by cohort and plan (billing system).

**application:** Isolates monetization depth from conversion rate. Drives pricing and packaging decisions and is the right input for pLTV models scoped to payers.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Consumer app, realized LTV per payer, Year 1, global median | **$23**; North America $32, Western Europe $25, India/SEA $14; top quartile $44+ | RevenueCat, *State of Subscription Apps 2026*, Mar 19 2026 |
| By category, Year 1 median | Health & Fitness $35.64; Business $35.48 (top quartile $69.19+, best over $120); Productivity $24.95; Education $22.82; Gaming $11.22 | Same |
| Month 1 median | Health & Fitness $24.23 (top quartile $39+, top performers $60+); Business $18.76; Gaming $8.41 | Same |
| By store, Year 1 median | App Store $23.38 vs Google Play $21.62 (~8% gap). Western Europe leads both. | Same |
| AI vs non-AI apps | AI monetizes better early ($18.92 vs $13.59 month one; $30.16 vs $21.37 Year 1, a 41% premium) but retains materially worse (Year 1: 6.1% vs 9.5% monthly, 21.1% vs 30.7% annual) | Same |

**traps:**

- **ARPPU rising while the business shrinks.** Killing a cheap entry plan raises ARPPU and can cut total revenue. ARPPU must always be read with payer conversion.
- **Weekly plans inflate ARPPU per period and destroy it per lifetime.** RevenueCat 2026 puts weekly-plan 12-month retention at 1% to 2%.
- **The $8.41 misattribution.** A search-result claim that "average mobile subscription ARPU is $8.41" is a misattribution of RevenueCat's Gaming-category month-one realized LTV per payer. This specific fabrication is circulating widely.
- **Gross vs net again.** Every RevenueCat figure above is gross of platform fees.

**related:** ARPU, ARPDAU, LTV, Trial Conversion Rate, Cost per Paying Customer.

---

## 13. ARPA (Average Revenue Per Account)

**applies_to:** b2b

**definition:** Average recurring revenue per customer account, where an account contains many seats or users.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | ARPA (monthly) | `MRR / active accounts` | Standard SaaS reporting. |
| 2 | ARR per account / ACV | `ARR / active accounts` | Annual contracting. Usually called ACV. |
| 3 | New-account ARPA | ARPA of accounts acquired this period | Detecting whether you are moving up or down market. |
| 4 | Expansion-inclusive ARPA | Includes upsell and cross-sell on existing accounts | Measuring land-and-expand. Rises without any new-customer improvement. |
| 5 | Net ARPA | After discounts, credits, and contra-revenue | The number finance recognizes; often 10-20% below list-based ARPA. |
| 6 | Segment ARPA | Computed per ICP tier | Mandatory when SMB and enterprise coexist. |

**No consensus:** ARPA, ARPU, ACV, and ASP are used interchangeably in B2B and mean different things. The SaaS Metrics Standards Board publishes no ARPA standard.

**inputs:** MRR/ARR by account (billing: Chargebee, Zuora, Stripe Billing); account counts (CRM); contra-revenue and credits (GL).

**application:** Sets the payback denominator, determines which GTM motion is affordable (an ARPA of $500/year cannot support field sales), and is the primary segmentation axis for every other unit-economics metric.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| ARPA dollar benchmarks | **NO SOURCED BENCHMARK FOUND.** No publisher issues ARPA medians, because they are meaningless across ACV bands. |
| Retention by ARPA band (the useful cut) | NRR top quartile: <$25/month **70%**, $25-$1K/month ~85-90%, >$1K/month **110%+**. GRR top quartile: <$25/month ~55%, $25-$1K ~75%, >$1K ~85-90%. Monthly customer churn top quartile: <$25/month ~5-7%, >$1K/month ~1-2%. **Only 2% of companies with ARPA under $25/month achieve NRR above 100%**, versus nearly 50% of high-ARPA B2B. | ChartMogul, *SaaS Benchmarks Report 2023*, 2,100+ SaaS businesses, 12 months ending March 2023 |
| B2B SaaS NRR / GRR, current | NRR **98% seat-based, 108% usage-based**; GRR **84% median, 91% top quartile** (down from 88% / 95%) | Benchmarkit, *2026 B2B SaaS & AI-Native Metrics*, 2026 |
| B2B SaaS NRR / GRR, prior year | NRR **101%**, GRR **88%** (down from 90%) | Benchmarkit, *2025 B2B SaaS Performance Metrics*, 2025 |
| NRR by ARR scale | $1M-$10M: 105-145% (avg 140%); $10M-$100M+: 105-125% (avg 120%) | Bessemer, *Scaling to $100 Million*, Sept 2021 / upd. 2024 |

**traps:**

- **Blended ARPA across a bimodal book describes no customer.** A $2,000 ARPA that is actually 400 SMB accounts at $600 and 20 enterprise accounts at $30,000 will produce a CAC payback figure that is wrong for both.
- **Expansion-inclusive ARPA rising while new-customer ARPA falls** is the classic pattern of a company quietly moving down market while the headline metric improves.
- **Discounting leakage.** List-based ARPA overstates real ARPA and therefore understates payback.
- **The ARPA band determines whether LTV is even computable.** At ChartMogul's medians, sub-$25/month businesses have GRR around 55% top-quartile, meaning short lifetimes and low expansion, so the infinite-horizon LTV formula is far more sensitive to the churn input than in a high-ARPA business.

**related:** ARPU, ACV, CAC Payback, NRR, GRR, LTV, CAC Ratio.

---

## 14. ARPDAU (Average Revenue Per Daily Active User)

**applies_to:** consumer

**definition:** Revenue generated per daily active user on a given day.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Standard ARPDAU | `total daily revenue / daily active users` | Daily monetization health. AppsFlyer's definition includes "in-app purchases (IAP), subscriptions, and ads." |
| 2 | Ad-only ARPDAU | `daily ad revenue / DAU` | Ad-monetized apps; decomposes into impressions per DAU × eCPM. |
| 3 | IAP-only ARPDAU | `daily IAP revenue / DAU` | Separating monetization mechanics in hybrid apps. |
| 4 | Cohort ARPDAU by day-since-install | ARPDAU for a cohort at day N | Building the LTV curve for UA bidding. |
| 5 | Net ARPDAU | After platform commission and ad network fees | The version that belongs in a margin model. |

**No consensus:** Whether ad revenue is included varies by source. AppsFlyer includes it. Some analytics vendors report IAP-only. Always ask.

**inputs:** Daily revenue by source (billing plus ad network dashboards: AppLovin, ironSource, AdMob); DAU (product analytics).

**application:** The operating metric for ad-monetized and hybrid apps, and the input to D-day ROAS curves used for UA bidding.

**benchmark:** **NO SOURCED BENCHMARK FOUND** for ARPDAU in consumer subscription apps. RevenueCat does not report it. The closest sourced adjacent data is AppsFlyer's Day 90 ROAS by monetization model (*State of App Monetization, 2024 Edition*, Q3 2024): Android mid-core hybrid 146%, Android mid-core IAP 93%, Android mid-core in-app advertising 58%, iOS mid-core IAP 215%, non-gaming in-app-advertising apps 95% Android / 80% iOS, hypercasual ads peaking "just shy of 100% breakeven ROAS around Day 60."

**traps:**

- **ARPDAU is mostly an engagement metric wearing a revenue costume.** It rises when low-engagement users churn out of the DAU denominator, with no monetization change.
- **Ad ARPDAU is not comparable to subscription ARPDAU.** Ad revenue arrives daily; subscription revenue arrives in lumps and is smeared across days by the DAU denominator.
- **Seasonality and day-of-week swamp trend.** Single-day ARPDAU is noise; use a 7-day trailing average.
- **Gross of network fees.** Ad network reported revenue is typically gross of the network's take.

**related:** ARPU, ARPPU, ROAS, CPI, LTV.

---

## 15. Cost Per Install (CPI)

**applies_to:** consumer

**definition:** Paid media cost to generate one app install.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Paid CPI | `paid media spend / paid installs` | Channel management. |
| 2 | Blended / effective CPI | `paid spend / total installs (paid + organic)` | The honest number when paid drives store-ranking lift. |
| 3 | Organic uplift-adjusted CPI (eCPI) | `paid spend / (paid installs + attributable organic lift)` | Requires a holdout to estimate the lift. |
| 4 | Incremental CPI | `paid spend / incremental installs from a geo holdout` | The causally honest version. |
| 5 | CPI by network / geo / creative | Same formula, segmented | Day-to-day optimization. |
| 6 | Loaded CPI | Includes creative production and UA headcount | True cost of the acquisition machine. |

**inputs:** Ad platform spend; MMP install attribution (AppsFlyer, Adjust, Singular, Branch); store console installs; SKAdNetwork/AdAttributionKit postbacks on iOS.

**application:** The top of the mobile funnel. Multiplied through install→trial→paid conversion to derive cost per paying customer, and compared against RPI curves for bidding.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| iOS global | **$1.50 to $3.50** (published as a range, not a median) | Business of Apps, *Cost Per Install (CPI) Rates (2025)*, Artem Dogtiev, dated Feb 27 2025, citing AppsFlyer, Adjust, Sensor Tower and Singular |
| Android / Google Play global | **$1.50 to $4.00** | Same |
| North America | $2.50 to $5.00; EMEA $2.00 to $4.00; APAC $1.50 to $3.00; LATAM $0.50 to $2.00 | Same |
| By network | Facebook Ads $1.00-$3.00; TikTok Ads $0.50-$2.50; Google Ads $0.50-$2.50; ad networks $1.75-$4.50 | Same |
| Games by genre (iOS / Android) | Casual $2.5/$1.5; Puzzle $3/$2; Mid-core $4.5/$3.25; Strategy $5.5/$4; Hardcore $6/$4.5 | Same |
| Photo & Video, iOS top quartile | CPIs **above $14** | RevenueCat, *State of Subscription Apps 2025*, sourced from AppsFlyer |
| iOS vs Play CPI gap, North America | iOS "reaching nearly **3x** those of Play Store in some categories" | Same |

**Important caveat verified during research:** although the Business of Apps page is titled 2025 and dated February 2025, the ad-platform charts inside are labeled 2019-2024 with 2024 projections. The per-platform figures are not 2025 data. Also, the widely circulated "iOS CPI $4.70 / Android $3.70" attributed to Business of Apps **does not appear in the source and appears to be fabricated.**

**traps:**

- **CPI is a vanity metric on its own.** A $0.50 CPI in a market with $0.04 D60 RPI (RevenueCat's India/SEA Android figure) is worse than a $5 CPI in North America iOS at $0.65 D60 RPI. Optimizing to CPI systematically buys the wrong users.
- **iOS post-ATT attribution.** SKAdNetwork postbacks are delayed, aggregated, and privacy-thresholded, so iOS install counts are estimates. CPI computed from them inherits that error.
- **Organic cannibalization runs both ways.** Paid installs can both cannibalize organic (overstating true cost) and lift store ranking to generate organic (understating it). Only a holdout distinguishes them.
- **Install ≠ open.** A meaningful share of installs never launch the app.
- **Ranges are not benchmarks.** Every CPI figure available publicly is a range with no stated methodology, sample, or central tendency. Treat them as orientation, not as a target.

**related:** Cost per Registration, Cost per Trial, Cost per Paying Customer, ROAS, ARPU/RPI, CAC.

---

## 16. Cost Per Registration (Cost Per Signup / Lead)

**applies_to:** both

**definition:** Paid media cost to generate one registered account or captured lead.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Cost per registration | `spend / registrations` | Consumer and PLG top-of-funnel. |
| 2 | Cost per MQL | `spend / marketing qualified leads` | B2B demand gen. Definition of MQL is company-specific and gameable. |
| 3 | Cost per SQL / SAL | `spend / sales-accepted leads` | Removes most MQL gaming. |
| 4 | Cost per qualified account (ABM) | `spend / in-ICP accounts engaged` | Account-based motions where the lead is the wrong unit. |
| 5 | Incremental cost per registration | `spend / incremental registrations from holdout` | The honest version. |
| 6 | Loaded cost per registration | Includes content, tooling, and demand-gen headcount | Full-cost planning. |

**No consensus:** MQL has no standard definition. It is defined per company, frequently redefined mid-year, and is the most manipulated metric in B2B marketing.

**inputs:** Ad spend by campaign; registration events (product analytics or CRM); lead-stage definitions (CRM: HubSpot, Salesforce); form and identity resolution.

**application:** Intermediate funnel efficiency, and the bridge from media cost to CAC via stage conversion rates.

**benchmark:** **NO SOURCED BENCHMARK FOUND** for cost per registration or cost per MQL from any credible benchmark publisher, in either consumer or B2B. This is one of the most-searched and least-sourced numbers in marketing. Every figure in circulation traces to agency blog posts with undisclosed samples.

**traps:**

- **Optimizing to cost per registration buys junk registrations.** Ad platforms will find people who complete forms, which is a different population from people who buy.
- **MQL redefinition breaks the time series.** Loosening the MQL bar cuts cost per MQL instantly with zero real improvement.
- **Registration is the wrong unit in ABM**, where one account matters and ten leads from it do not.
- **Bot and fraud contamination** on lead-gen forms is material and rarely subtracted.

**related:** CPI, Cost per Activation, Cost per Trial, CAC, Funnel conversion rates.

---

## 17. Cost Per Activation

**applies_to:** both

**definition:** Paid media cost to produce one user who reaches the product's activation event, meaning the action correlated with retention.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Cost per activation | `spend / users hitting the activation event` | The most decision-useful mid-funnel cost metric. |
| 2 | Cost per aha-moment | `spend / users completing the defined value milestone` | When activation and the value milestone differ. |
| 3 | Cost per week-1-retained user | `spend / users active on day 7` | When no clean activation event exists. |
| 4 | Cost per qualified activation | `spend / activated users who also match ICP` | B2B PLG, where the activated user may not be a buyer. |
| 5 | Incremental cost per activation | Holdout-based | The honest version. |

**No consensus:** There is no standard activation event. It is defined per product and is not comparable across companies. That is a feature, not a bug, but it means no benchmark can exist.

**inputs:** Ad spend; activation event instrumentation (product analytics); the activation definition itself, which should be derived from a retention correlation analysis rather than chosen by opinion.

**application:** The earliest cost metric that actually predicts revenue. Catches "we bought installs that never opened the app" months before CAC does.

**benchmark:** **NO SOURCED BENCHMARK FOUND**, and none is possible, because activation is defined per product. Any published "cost per activation benchmark" is meaningless by construction.

**traps:**

- **Choosing an activation event by opinion rather than by retention correlation** produces a metric that optimizes toward nothing.
- **Redefining activation invalidates every prior cost-per-activation figure**, and it gets redefined constantly.
- **Activation ≠ willingness to pay.** In B2B PLG the activated user is often an individual contributor with no budget.
- **Cross-company comparison is invalid.** There is no shared unit.

**related:** Cost per Registration, Cost per Trial, CAC, Retention.

---

## 18. Cost Per Trial Start

**applies_to:** both

**definition:** Paid media cost to generate one free-trial start.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Cost per trial | `spend / trial starts` | Standard. |
| 2 | Derived from CPI | `CPI / (install→trial conversion rate)` | When you have CPI and funnel rates but not direct trial attribution. |
| 3 | Cost per **qualified** trial | `spend / trials that survive the Day 0-1 cancellation window` | Materially more useful. See traps. |
| 4 | Cost per trial by trial length | Segmented by 3 / 7 / 14 / 30-day trial | Because conversion differs sharply by length. |
| 5 | Incremental cost per trial | Holdout-based | The honest version. |

**inputs:** Ad spend; trial-start events (RevenueCat, Adapty, Superwall, or the billing system); MMP attribution; trial length configuration.

**application:** Bridges CPI to cost per paying customer. The most actionable intermediate metric in consumer subscription because trial start is the last event before money.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Cost per trial, dollar figure | **NO SOURCED BENCHMARK FOUND.** No publisher in the target set publishes a cost-per-trial or cost-per-trial-start benchmark. RevenueCat publishes download-to-trial conversion but not the cost side. |
| Download-to-trial conversion (D30), by category median | Business **9.1%** (top quartile 16.2%+); Health & Fitness 6.9%; Education 6.5%; Utilities 6.5%; Gaming 4.4%; Travel 4.1%; Media & Entertainment 4.0%. Health & Fitness top performers exceed 23%. | RevenueCat, *State of Subscription Apps 2026*, Mar 19 2026 |
| Download-to-trial by price point (2025 edition) | High-priced **9.8%** vs low-priced **4.3%** median | RevenueCat, *State of Subscription Apps 2025*, Mar 2025 |

**Derived, and labeled as derived:** at a $2.50 iOS CPI (midpoint of the Business of Apps range) and a 6.9% Health & Fitness download-to-trial rate, implied cost per trial is roughly **$36**. That is arithmetic, not a benchmark.

**traps:**

- **Most trial starts are dead on arrival, and the shorter the trial the worse it is.** RevenueCat 2026: on 3-day trials, **55.4% cancel on Day 0** and 84% of all cancellations occur on Days 0-1. On 7-day trials, 39.8% cancel on Day 0. Cost per trial computed on raw starts is therefore roughly half-fictional on short trials. Use cost per *surviving* trial.
- **The industry is moving toward the worse-converting option.** RevenueCat 2026 reports trials of 4 days or fewer rose to 46.5% of apps from 42.1%, while 17-32 day trials fell to 5.0% from 6.1%. Yet longer trials convert far better: 17-32 day trials convert at **42.5%** median versus **25.5%** for 4 days or fewer, roughly 1.7x. Cost per trial gets cheaper as trials get shorter while cost per *paying customer* gets worse.
- **Trial requires a payment method or not**, and the two produce trial-start numbers that differ by an order of magnitude and are routinely compared.
- **Apple excludes free trial days from paid service**, so a long trial delays the 15% commission rate.

**related:** CPI, Cost per Paying Customer, Trial Conversion Rate, CAC, Platform Take Rate.

---

## 19. Cost Per Paying Customer (CPPU / Cost Per Subscriber)

**applies_to:** consumer (the consumer-app formulation of CAC)

**definition:** Paid media cost to acquire one customer who actually pays.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Direct CPPU | `paid spend / new paying customers attributed to paid` | Standard. |
| 2 | Funnel-derived | `CPI / (install→trial × trial→paid)` | When attribution to purchase is unreliable (iOS post-ATT). |
| 3 | Net-of-refund CPPU | `spend / (paying customers − refunded customers)` | The honest version. Refunds run 2.5%-4.7% median. |
| 4 | Blended CPPU | `all spend / all new payers including organic` | Board reporting. |
| 5 | Fully-loaded CPPU | Adds creative, tooling, UA headcount | True cost. |
| 6 | Incremental CPPU | Holdout-based | The only version that supports a scale decision. |

**inputs:** Ad spend; purchase events (RevenueCat / billing); MMP attribution or SKAdNetwork conversion values; refund data (App Store Connect / Play Console).

**application:** The consumer-subscription equivalent of CAC. Compared directly against realized LTV per payer to get consumer LTV:CAC.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| CPPU dollar figures | **NO SOURCED BENCHMARK FOUND.** RevenueCat's 2025 edition had a CPPU section but published only qualitative regional commentary outside the gated PDF ("Japan & Korea and North America see elevated CPPUs in Generative AI and Lifestyle apps, whilst emerging markets like Eastern Europe and LATAM maintain lower CPPUs"). The 2026 edition dropped CPPU entirely. The circulating claim that "CPPU is typically 4-5x CPI" could not be traced to a primary source and is not reported here. |
| Download-to-paid (D35) by access method, median | Hard paywall **10.7%** (top quartile 20.0%+, top 10% 38.7%) vs freemium **2.1%** (range 0.3%-8.2%). RevenueCat: "apps that show a hard paywall upfront convert downloads to paying users at roughly 5x the rate of freemium apps. Same ad spend. Dramatically different revenue on day one." | RevenueCat, *State of Subscription Apps 2026*, Mar 19 2026 |
| Download-to-paid (D35) by store, median | App Store **2.6%** vs Google Play **0.9%** (~2.9x) | Same |
| Download-to-paid (D35) by geography, median | Global 2.0%; North America 2.8% (top quartile 6.0%+); Asia-Pacific 2.4%; India/SEA 0.7% | Same |
| Trial-to-paid by geography, median | North America **34.2%**; Asia-Pacific 31.9%; Western Europe 29.7%; LATAM/MEA/ROW ~20-23%; India/SEA **15.2%** | Same |

**traps:**

- **The funnel-derived version compounds every upstream error.** CPI error × install-to-trial error × trial-to-paid error. Three noisy estimates multiplied.
- **This is where the paywall decision shows up.** At RevenueCat's medians, the same $10,000 of spend at a $2.50 CPI buys 4,000 downloads. At hard-paywall 10.7% that is 428 payers, a **$23 CPPU**. At freemium 2.1% that is 84 payers, a **$119 CPPU**. Same spend, 5x difference in acquisition cost, driven entirely by paywall design rather than media.
- **Store matters as much as channel.** App Store converts downloads to paid at 2.9x Google Play's rate, so a blended CPPU across both stores describes neither.
- **Refunds are not netted by default.** At a 4.5% high-price-tier refund rate, reported CPPU understates true cost by about 4.7%.
- **Involuntary churn on Android.** With 32.2% of Google Play cancellations from failed billing, a "paying customer" acquired on Android has a meaningfully higher probability of never producing a second payment.

**related:** CPI, Cost per Trial, CAC, LTV per payer, Refund Rate, Platform Take Rate.

---

## 20. ROAS (Return on Ad Spend) and D-Day ROAS Curves

**applies_to:** both (dominant in consumer mobile)

**definition:** Revenue attributed to advertising divided by the advertising spend that produced it.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Platform ROAS | `platform-attributed revenue / spend` | Bid optimization inside a channel. Not a business metric. |
| 2 | D-day ROAS | `cumulative cohort revenue through day N / cohort acquisition spend` | Mobile UA. D7/D30/D90 are the working horizons. |
| 3 | Net ROAS | Same, after platform commission and refunds | The version that maps to cash. |
| 4 | Gross-profit ROAS | `cohort gross profit / spend` | Comparable to LTV:CAC. Breakeven is 1.0x. |
| 5 | Blended ROAS / MER | `total revenue / total ad spend` | See metric #22. |
| 6 | Incremental ROAS (iROAS) | `incremental revenue from holdout / spend` | See metric #21. |
| 7 | Breakeven ROAS | `1 / contribution margin` | The target, not a measurement. At 60% CM, breakeven ROAS is 1.67x. |
| 8 | Predicted ROAS (pROAS) | Modeled D180/D365 ROAS from early signals | UA bidding, because you cannot wait 180 days to decide. |

**inputs:** Ad spend by cohort; cohort revenue (billing/MMP); platform fee and refund data; gross margin.

**application:** The primary bidding and budget signal in mobile UA. The D-day curve shape determines how long you can front-load spend before cash runs out.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Android mid-core, hybrid monetization, Day 90 | **146%** | AppsFlyer, *The State of App Monetization, 2024 Edition*, Q3 2024 data, high income markets. Dataset: $130M verified IAP revenue, $40M verified subscription revenue, $900M verified in-app advertising revenue. |
| Android mid-core, IAP, Day 90 | 93% | Same |
| Android mid-core, in-app advertising, Day 90 | 58% | Same |
| iOS mid-core, IAP, Day 90 | **215%** | Same |
| iOS mid-core, hybrid, Day 90 | 73% | Same |
| Non-gaming in-app-advertising apps, Day 90 | 95% Android, 80% iOS | Same |
| Hypercasual, ads | Peaks "just shy of 100% breakeven ROAS around Day 60" | Same |
| Breakeven timing | iOS mid-core on IAP models between Days 7 and 14; casual Android hybrid closer to Day 30 | Same |
| **D180 ROAS** | **NO SOURCED BENCHMARK FOUND.** No publisher in the target set publishes a 180-day ROAS benchmark. |
| Consumer subscription ROAS | **NO SOURCED BENCHMARK FOUND.** All published ROAS benchmarks located are gaming or ad-monetized, not subscription. |

**traps:**

- **Platform-reported ROAS is not a return.** It uses the platform's own attribution window and view-through rules. Meta and Google both count conversions the other also counts; summing platform-reported revenue routinely exceeds actual revenue.
- **Gross-revenue ROAS of 1.0x is not breakeven, it is a large loss.** After a 30% platform fee, 3.5% refunds, and 20% COGS, a 1.0x gross ROAS is roughly **0.54x on contribution**. Breakeven requires 1/CM, so at 54% contribution margin you need **1.85x gross ROAS** to break even.
- **The 100% subscription-ROAS trap.** The AppsFlyer figures above show mid-core iOS IAP at 215% Day 90 while non-gaming ad-monetized apps sit at 80-95%. Applying a gaming ROAS benchmark to a subscription app is invalid; the revenue shapes are completely different, because subscription revenue is back-loaded behind trials.
- **pROAS models trained on old cohorts break when you scale.** The model learned the shape of a cohort you can no longer buy.
- **D7 ROAS is nearly meaningless for subscription apps.** With trial lengths of 3 to 30 days and Apple excluding trials from paid service, D7 revenue is close to zero by design.

**related:** iROAS, MER, CPI, CAC Payback, Cohort Payback Curve, Contribution Margin.

---

## 21. Incremental CAC / Incremental ROAS (iROAS)

**applies_to:** both

**definition:** The acquisition cost or return computed only against customers who would not have converted without the advertising.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Incremental CAC | `spend / (treated conversions − control conversions, scaled)` | The causally correct CAC. |
| 2 | iROAS | `(treated revenue − control revenue) / spend` | The causally correct ROAS. |
| 3 | Incrementality multiplier | `incremental conversions / platform-attributed conversions` | The correction factor to apply to attributed CAC. |
| 4 | Geo holdout | Synthetic control across matched markets (Meta GeoLift, Google Geo Experiments) | Channels that cannot be user-split (CTV, radio, OOH, most upper funnel). GeoLift is "an end-to-end solution to measure Lift at a Geo-level using the latest developments in Synthetic Control Methods," using augmented synthetic control via `augsynth`. |
| 5 | User-level randomized holdout | Randomize at user level, suppress ads to control | Highest precision where the platform supports it. |
| 6 | PSA / ghost-ad design | Control group sees a public service announcement, or the winning ad is logged but not served | Removes selection bias from the control group, since control users are the ones who *would have* been served. |
| 7 | Switchback | Alternate on/off over time in one market | When no clean geo or user split exists. Vulnerable to carryover. |
| 8 | MMM-derived incremental | Bayesian media mix model calibrated on experiment priors (Google Meridian, Meta Robyn, PyMC-Marketing, Recast) | Cross-channel allocation and channels you cannot experiment on. |

**inputs:** Randomization infrastructure or matched geo sets; conversion data at the unit of randomization; sufficient sample (see traps); for MMM, 2+ years of weekly spend and outcome data by channel plus control variables.

**application:** The only honest basis for a scale decision. Converts attributed CAC into real CAC via the incrementality multiplier, and calibrates MMM priors.

**benchmark:**

| Finding | Figure | Source |
|---|---|---|
| Observational vs RCT gap | "the observational methods overestimate ad effectiveness relative to the RCT, although in some cases they significantly underestimate effectiveness. The bias can be large: **in half of our studies, the estimated percentage increase in purchase outcomes is off by a factor of three across all methods.**" 15 US Facebook campaigns run as RCTs, 500M user-experiment observations, 1.6B impressions. | Gordon, Zettelmeyer, Bhargava & Chapsky, *A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook*, **Marketing Science 38(2): 193-225**, published online April 4 2019 |
| Branded paid search | Brand keyword ads showed **no measurable short-term benefit**. For non-brand keywords, new and infrequent users responded positively but frequent users (who accounted for most of the ad spend) did not, producing **negative average returns**. Returns from paid search were "a fraction of non-experimental estimates." | Blake, Nosko & Tadelis, *Consumer Heterogeneity and Paid Search Effectiveness: A Large-Scale Field Experiment*, **Econometrica 83(1): 155-174, 2015**, large-scale field experiments at eBay |
| Statistical power required | Median sample sizes needed: **3.3 million exposed users** to reliably reject a 100% ROI difference, and **1.3 billion exposed users** for 5% ROI. Across 25 large field experiments with major US retailers and brokerages, the **median confidence interval on ROI was over 100 percentage points wide.** Individual-level sales have a coefficient of variation "of 10 being common," so informative experiments "can easily require more than 10 million person-weeks." | Lewis & Rao, *The Unfavorable Economics of Measuring the Returns to Advertising*, **Quarterly Journal of Economics 130(4): 1941-1973**, 2015 |
| Incrementality multipliers by channel | **NO SOURCED BENCHMARK FOUND**, and I would treat any published table of per-channel incrementality multipliers as unreliable. Incrementality is business-specific and time-varying; it is measured, not looked up. |

**Tooling status, verified:** Google Meridian is "an open-source MMM built by Google," free to use, supporting custom ROI priors set from past experiments; its documentation page was last updated July 9 2026. Meta Robyn treats calibration against incrementality results as a crucial modeling step. Meta GeoLift is open-source and includes power calculators for data-driven market selection.

**traps:**

- **The arithmetic that should change your budget.** You spend $100,000 and the platform reports 1,000 conversions, so attributed CAC is $100. A geo holdout shows 60% incrementality, meaning 600 real conversions, so **true CAC is $167**. At Gordon et al.'s "factor of three," 1,000 reported conversions are 333 real ones and true CAC is **$300**. Your LTV:CAC of 3:1 is actually 1:1.
- **Branded search is the single most common place this hides.** Blake, Nosko & Tadelis found no measurable short-term benefit from brand keyword ads at eBay. Most companies still count branded search conversions in blended CAC at face value.
- **Underpowered tests produce confident nonsense.** Lewis & Rao's finding is that most advertisers cannot run an adequately powered ROI experiment at all. A test that returns "no significant lift" at n=50,000 has told you nothing.
- **PSA tests have their own selection problem.** The users who see the PSA are selected by the ad system to see *the PSA*, not your ad. Ghost-ad designs exist specifically to fix this by logging the ad that would have won without serving it.
- **Geo tests are contaminated by spillover** (media bleeding across DMA lines) and by geo heterogeneity that synthetic control may not fully absorb.
- **MMM without experiment calibration is unidentified.** Correlated channel spend means the model cannot separate contributions. Both Meridian and Robyn are explicitly built to take experiment results as priors, which is an admission that MMM alone does not answer the question.
- **Incrementality decays as you scale.** The first dollar in a channel is often highly incremental and the hundredth is often not, so incrementality and marginal CAC must be measured together, not separately.

**related:** Marginal CAC, CAC, ROAS, MER, MMM.

---

## 22. Marketing Efficiency Ratio (MER) / Blended ROAS

**applies_to:** both

**definition:** Total business revenue divided by total advertising spend, ignoring attribution entirely.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | MER | `total revenue / total ad spend` | Attribution-free efficiency check. Rises and falls with the truth. |
| 2 | aMER / new-customer MER | `new customer revenue / total ad spend` | Removes returning-customer revenue, which ads did not buy. |
| 3 | Contribution MER | `total contribution margin / total ad spend` | The version with a real breakeven point (1.0x). |
| 4 | Fully-loaded MER | `total revenue / (ad spend + marketing payroll + tools + agency)` | True marketing efficiency. |
| 5 | Inverse MER (marketing cost ratio) | `total ad spend / total revenue` | Easier to compare against a target percentage. |

**No consensus:** MER has no standard-body definition and no authoritative published benchmark. It is widely used in DTC ecommerce and has drifted into subscription. Whether the numerator is gross revenue, net revenue, or new-customer revenue varies by practitioner with no convention.

**inputs:** Total revenue (billing or GL, not platform-reported); total ad spend across all channels (ad platforms plus AP). That is the entire appeal, since neither input requires attribution.

**application:** The sanity check on attributed metrics. When platform-reported ROAS improves and MER does not, the improvement is attribution, not reality.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** No credible publisher issues MER benchmarks, and any that appear should be treated with suspicion, since MER depends entirely on the ratio of returning to new revenue, which varies enormously by business age and model.

**traps:**

- **MER improves automatically as a subscription base ages**, because the numerator includes renewals from cohorts acquired years ago. A subscription business with flat acquisition and good retention shows rising MER while new-customer economics deteriorate. Use aMER.
- **MER cannot allocate.** It tells you whether total spend is working and nothing about which channel to fund.
- **MER is not a return.** A MER of 3.0x on gross revenue at a 54% contribution margin is 1.62x on contribution, healthy, while a MER of 1.5x on the same margin is a loss.
- **It moves for non-marketing reasons.** Price changes, product launches, and seasonality all move MER with no change in marketing.
- **MER and platform ROAS diverging is the signal, not the problem.** That divergence is the incrementality gap becoming visible.

**related:** ROAS, iROAS, Blended CAC, Contribution Margin, MMM.

---

## 23. CAC Ratio (B2B)

**applies_to:** b2b

**definition:** Sales and marketing spend required to generate one dollar of new annual recurring revenue. **The name is used for two inverted metrics and you must always ask which.**

**formula_variants:**

| # | Variant | Formula | Direction | When |
|---|---|---|---|---|
| 1 | New CAC Ratio (Standards Board) | `Fully loaded S&M expenses (lagged by sales cycle) / New Name ARR (new customer CARR)` | **Lower is better** | The current de facto standard. Benchmarkit reports on this basis. |
| 2 | Blended CAC Ratio (Standards Board) | `Fully loaded S&M (CQ-1) / (New CARR + Expansion CARR)` | Lower is better | Overall GTM efficiency including expansion. |
| 3 | Expansion CAC Ratio (Standards Board) | `(S&M + Customer Success expenses allocated to expansion) / Expansion CARR` | Lower is better | Isolating land-and-expand return. Note this is the one variant that explicitly includes CS. |
| 4 | Bessemer CAC Ratio (original) | `Annualized incremental gross margin in the quarter / total S&M expense in the prior quarter` | **Higher is better** | The original 2008-era definition. Inverted relative to #1 and uses gross margin, not ARR. |
| 5 | Magic Number (Scale Venture Partners form) | `(Current quarter subscription revenue − prior quarter) × 4 / prior quarter S&M` | Higher is better | See metric #24. |

**Explicit disagreement, and it is a genuine trap.** Dave Kellogg (Kellblog, December 1 2013) documents it precisely: "Bessemer defined the 3Q08 CAC as the annualized amount of incremental gross margin in 3Q08 divided by total S&M expense in 2Q08 (the prior quarter)." Kellogg calls Bessemer's version "conceptually backwards, treats it as revenue per S&M dollar rather than S&M cost per revenue dollar," and prefers the inverted subscription-revenue form. His broader objection: "One metric should be focused on measuring one specific item," arguing against conflating acquisition efficiency and operational profitability in one number.

**inputs:** Fully loaded S&M by quarter, lagged by sales cycle (GL); new-customer CARR and expansion CARR (CRM plus billing); subscription gross margin for the Bessemer form.

**application:** The B2B efficiency metric that scales cleanly across ACV bands, unlike a CAC dollar figure. Directly convertible to payback: `payback months ≈ New CAC Ratio / gross margin × 12`.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| New CAC Ratio, B2B SaaS | **$2.00 median** to acquire $1.00 of new customer ARR | Benchmarkit, *2025 B2B SaaS Performance Metrics*, 2025 |
| Expansion CAC Ratio | **$1.00 median** | Same |
| Blended CAC Ratio | Fell $0.19 (12%) during 2024 | Same |
| Blended CAC Ratio, current | **$1.30 median** | Benchmarkit, *2026 B2B SaaS & AI-Native Metrics*, 2026 |

**traps:**

- **The inversion is a real-money error.** A "CAC ratio of 1.5" is excellent under Bessemer's definition (higher is better) and mediocre-to-poor under the Standards Board definition (lower is better). Two people can agree on the number and disagree on whether the company is healthy.
- **New versus blended is the most common quiet substitution.** At Benchmarkit's 2025 medians, New CAC Ratio is $2.00 and Expansion CAC Ratio is $1.00. Blending them halves the apparent cost of growth, because expanding an existing customer is roughly twice as efficient as acquiring a new one. A company reporting "CAC ratio of $1.30" without specifying blended has said very little.
- **Not lagging the spend.** The Standards Board requires expenses "measured for the time period preceding the new ARR by the length of the sales cycle." Companies with a 6-month cycle that do not lag will report improving CAC ratios during a slowdown, because spend falls before bookings do.
- **Cross-check the payback conversion.** At a $2.00 New CAC Ratio and 81% subscription gross margin (Benchmarkit 2025), implied payback is 2.00 / 0.81 × 12 ≈ **29.6 months**, which is far above Benchmarkit's separately reported 11-month median payback. That gap is a definitional artifact (different cohorts, different bases, different years) and is exactly the kind of inconsistency to interrogate before quoting either number.

**related:** CAC, CAC Payback, Magic Number, Burn Multiple, LTV:CAC.

---

## 24. Magic Number (Sales Efficiency)

**applies_to:** b2b

**definition:** Annualized new recurring revenue produced per dollar of prior-period sales and marketing spend.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Standard | `(Current quarter ARR − prior quarter ARR) × 4 / prior quarter S&M spend` | The common form. |
| 2 | Revenue-based | Same with subscription revenue instead of ARR | Public-company analysis where ARR is not disclosed. |
| 3 | Gross-margin adjusted | `Δ ARR × 4 × gross margin / prior quarter S&M` | Comparable across companies with different margins. |
| 4 | New-business-only | Excludes expansion from the numerator | Isolates new-logo efficiency. |
| 5 | Trailing four-quarter | Same over a rolling year | Removes quarterly noise, which is substantial. |

**No consensus:** ARR vs revenue in the numerator, whether to annualize, whether to lag S&M by one or two quarters, and whether to include expansion, all vary. There is no standards-body definition.

**inputs:** Quarterly ARR or subscription revenue (billing / finance); quarterly S&M expense (GL).

**application:** A quick read on whether to add sales capacity. Ben Murray's thresholds: **above 1.25** signals an opportunity to scale S&M; **1.0 to 1.25** is a healthy efficiency range; **0.75 to 1.0** means validate before increasing spend; **below 0.75** means optimize or reduce allocation.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| B2B SaaS | **Median above 1.0** | Benchmarkit, *2026 B2B SaaS & AI-Native Metrics*, 2026 |
| Interpretation thresholds | >1.25 scale; 1.0-1.25 healthy; 0.75-1.0 validate; <0.75 optimize | Ben Murray, The SaaS CFO, *How to Calculate the SaaS Magic Number*, published Nov 15 2024, updated Sept 3 2025 |

**traps:**

- **It is quarterly and quarters are noisy.** One large deal slipping across a quarter boundary swings Magic Number materially. Use the trailing four-quarter form for any decision.
- **Expansion inflates it.** A company with 108% usage-based NRR (Benchmarkit 2026) generates ARR growth with no new acquisition at all, producing a healthy Magic Number from a stalled acquisition engine.
- **It is a rate, not a profit measure.** A Magic Number of 1.5 with 40% gross margin is worse than 1.0 with 85% gross margin. Use variant 3 for cross-company comparison.
- **The one-quarter lag is arbitrary** and wrong for enterprise sales cycles of 9 to 12 months.
- **It shares the CAC-ratio inversion confusion**, being roughly the reciprocal of the Standards Board CAC ratio.

**related:** CAC Ratio, CAC Payback, Burn Multiple, Rule of 40.

---

## 25. Burn Multiple

**applies_to:** both (VC-backed)

**definition:** Net cash burned per dollar of net new ARR added.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Standard | `net burn / net new ARR` | Company-level capital efficiency. |
| 2 | Revenue-based | `net burn / net new revenue` | When ARR is not the right revenue unit. |
| 3 | Gross burn variant | `gross burn / net new ARR` | Ignores revenue offset. Harsher and less standard. |
| 4 | Cash Conversion Score (Bessemer) | `ARR / (total capital raised − cash on hand)` | Lifetime capital efficiency rather than period efficiency. |
| 5 | Efficiency Score (Bessemer) | `FCF margin + YoY ARR growth` | Bessemer's preferred framing; not a burn multiple. |

**inputs:** Net cash burn (cash flow statement); net new ARR (billing / finance).

**application:** The investor-facing summary of whether growth is being bought efficiently. Sits above the whole unit-economics stack: bad CAC payback and weak retention both surface here.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Bessemer portfolio framing | Bessemer does not use "burn multiple" terminology; it uses **Efficiency Score** (FCF margin + YoY ARR growth) and **Cash Conversion Score** (ARR ÷ total capital invested minus cash). No burn multiple benchmarks by segment are provided. | Bessemer, *Scaling to $100 Million*, Sept 21 2021 / upd. 2024, ~200 cloud investments 2010-H1 2021 |
| Rule of 40 (adjacent efficiency measure) | **25% median, 43% top quartile**, up from a 15% median the prior year | Benchmarkit, *2026 B2B SaaS & AI-Native Metrics*, 2026 |
| Burn multiple thresholds (the widely cited "amazing/great/good/suspect/bad" scale attributed to David Sacks) | **NO SOURCED BENCHMARK FOUND.** I could not retrieve the primary post during this session (the expected URL 404'd) and will not restate the threshold table from memory. |

**traps:**

- **Net new ARR includes expansion**, so a high-NRR company can post a good burn multiple with a broken acquisition motion.
- **It is trivially improved by cutting growth spend**, which improves the ratio and damages the business. Read alongside growth rate, which is what Rule of 40 attempts.
- **One-time items distort it.** A large prepayment or a restructuring charge moves burn multiple with no change in efficiency.
- **It is a company-level metric being used to justify channel-level decisions**, which it cannot support.
- **Denominator can go negative** during contraction, producing a meaningless figure.

**related:** CAC Payback, Magic Number, Rule of 40, CAC Ratio, Gross Margin.

---

## 26. Refund Rate and Involuntary Churn (Net Revenue Leakage)

**applies_to:** consumer (primarily); b2b for failed payments

**definition:** The share of billed revenue that never becomes collected revenue, through refunds, chargebacks, or failed payments.

**formula_variants:**

| # | Variant | Formula | When |
|---|---|---|---|
| 1 | Refund rate (RevenueCat definition) | `share of paid subscriptions refunded during their first billing period` | Consumer subscription. |
| 2 | Refund rate (dollar basis) | `refunded revenue / gross billings` | Financial modeling. Differs from #1 when refunds skew to high-price plans. |
| 3 | Chargeback rate | `disputed transactions / total transactions` | Payment risk; card network thresholds apply. |
| 4 | Involuntary churn rate | `cancellations from failed billing / total cancellations` | Recovery infrastructure ROI. |
| 5 | Net revenue leakage | `1 − (collected revenue / gross billings)` | The all-in number for a margin model. |
| 6 | Recovery rate | `involuntary churners recovered by dunning / involuntary churners` | Sizing dunning investment. |

**inputs:** App Store Connect and Play Console financial reports; payment processor dispute data; billing system cancellation reason codes; dunning tool (Churnkey, Baremetrics Recover, Stripe Smart Retries).

**application:** Converts gross billings to net revenue, which is the first step in every honest LTV. Also the cheapest available margin improvement in most consumer subscription businesses.

**benchmark:**

| Segment | Figure | Source |
|---|---|---|
| Refund rate by category, median | Productivity **4.7%** (highest), Travel **2.5%** (lowest). "Most categories cluster between 3-4%. Outlier apps can reach 9-18%." | RevenueCat, *State of Subscription Apps 2026*, Mar 19 2026 |
| Refund rate by geography, median | India/SEA **7.7%**, North America **3.4%** (max 14.2%). P25-P75 is 2-8% across all geographies; outliers in APAC, India/SEA, LATAM and MEA "reach the 30s." | Same |
| Refund rate by price tier, median | Low-priced 2.7%, mid 3.9%, high **4.5%** | Same |
| Refund rate, AI vs non-AI apps | AI **4.2%** vs non-AI 3.5% (~20% higher); upper bound 15.6% vs 12.5% | Same |
| Involuntary churn share of all cancellations | **Google Play 32.2%, App Store 15.2%** (2x+ gap). Voluntary unsubscribes 66.3% Play / 82.9% App Store. Prior year: Play 28.2%, App Store 15.1%, so Play involuntary churn worsened ~4 points. | Same |
| Reactivation within 1 year | Monthly-plan churners **20%**, weekly 9%, annual 5%. Productivity reaches 36% monthly reactivation. | Same |
| B2B SaaS involuntary churn | **NO SOURCED BENCHMARK FOUND.** |

**traps:**

- **Refunds are almost never in the LTV model.** A 4.5% high-price-tier refund rate cuts LTV by 4.5% before anything else. Combined with a 30% platform fee, gross LTV overstates net LTV by roughly 39% on that basis alone.
- **Android's involuntary churn changes the platform comparison materially.** With 32.2% of Play cancellations from failed billing versus 15.2% on iOS, a Play subscriber acquired at the same CPPU is worth measurably less, and part of that gap is recoverable with dunning while none of the voluntary gap is.
- **India/SEA at 7.7% refund and 0.7% download-to-paid** means the market with the cheapest CPI is also the one with the worst leakage on both ends. Optimizing to CPI walks straight into it.
- **The refund window is longer than the payback calculation.** Declaring an annual plan "paid back on day 0" ignores that Month 1 accounts for 35% of all annual cancellations (RevenueCat 2026).
- **Reactivation is double-counted.** A 20% monthly reactivation rate looks like a win, but if those users also appear in the new-customer denominator for CAC, the same person is improving two metrics at once.

**related:** Platform Take Rate, Contribution Margin, LTV, CAC Payback, Cost per Paying Customer.

---

# Metrics I considered and excluded, with reasons

| Metric | Why excluded |
|---|---|
| **Rule of 40** | Growth-plus-profitability composite. Company-level financial health, not unit economics. Referenced under Burn Multiple for cross-check. Benchmark captured there (25% median, 43% top quartile, Benchmarkit 2026). |
| **Net Revenue Retention / Gross Revenue Retention** | Belongs to the retention family. It is the single largest driver of LTV, so I captured its benchmarks under ARPA and flagged the dependency, but the metric card belongs elsewhere. |
| **Churn rate (logo, revenue, net)** | Retention family. Appears here only as an input to LTV. |
| **Trial-to-paid conversion rate** | Conversion family. Captured as an input under Cost per Trial and Cost per Paying Customer because it is load-bearing there. |
| **eCPM / fill rate / impressions per DAU** | Ad monetization mechanics. Decomposes ARPDAU but is a monetization-family metric. |
| **Average Selling Price (ASP) / ACV** | Revenue and pricing family. Overlaps ARPA almost entirely; including both would be padding. |
| **Payback on a fully-loaded basis** | Not a distinct metric, it is variant 4 of CAC Payback. |
| **"LTV per install"** | Same quantity as revenue per install (RPI), which is covered as ARPU variant 2. The name causes confusion and does not deserve its own card. |
| **Customer Equity / CLV-based valuation** | Corporate finance application of LTV, not an operating metric. |
| **Quick Ratio (SaaS)** | Growth-quality metric (new + expansion over churned + contracted). Growth family. |
| **Sales capacity / quota attainment / ramp time** | Sales operations family. Feeds CAC but is not itself unit economics. |
| **Lead velocity rate** | Pipeline family, and a leading indicator rather than an economic one. |
| **Payback on marketing-only spend** | A CAC variant, not a distinct metric. |
| **Contribution margin ladder (CM1/CM2/CM3)** | Ecommerce convention with no agreed definitions across sources. Folded into Contribution Margin per Customer, where I noted the absence of a standard. |
| **Take rate for marketplaces** | Different economic object (you are the platform, not the developer). Genuinely a different metric family. |
| **Discount rate / WACC** | A finance input, not a growth metric. Captured as an input to LTV variants 4-6. Worth repeating Fader & Hardie's note: "This is something that should be discussed with the finance department of the firm in which the resulting numbers will be used." |

---

# Cross-family dependencies

| This family needs | From which family | Why it is load-bearing |
|---|---|---|
| **Churn / retention curves by cohort** | Retention | Every LTV variant is a function of the survival curve. Fader & Hardie's Issue #4 is that using a blended flat retention rate instead of cohort-level `∏r_i` is wrong in a way that systematically distorts both new-customer and existing-customer value. |
| **Net Revenue Retention** | Retention | NRR above 100% makes the infinite-horizon LTV formula diverge and makes expansion-inclusive payback structurally different from new-customer payback. Benchmarkit 2026 splits this: **98% seat-based vs 108% usage-based**, which means the two pricing models require different LTV formulations entirely. |
| **Trial-to-paid and download-to-paid conversion** | Conversion / activation | Converts CPI into cost per paying customer. The hard-paywall vs freemium gap (10.7% vs 2.1% at D35, RevenueCat 2026) moves CPPU by 5x with zero change in media cost. |
| **Attribution model and incrementality** | Measurement | The CAC denominator. Gordon et al. (2019) put the observational-vs-RCT error at a factor of three in half of 15 Facebook campaigns. Nothing in this family is trustworthy without it. |
| **Pricing and packaging** | Monetization | Price tier drives refund rate (2.7% low vs 4.5% high), retention (low-priced annual 36% vs high-priced 23% year-one), and RLTV per payer ($10.69 vs $62.19 at Year 1). Unit economics cannot be optimized independently of price architecture. |
| **Gross margin and COGS classification** | Finance / accounting | Determines whether payback is 12, 15, or 18.5 months on identical operations. The CS-in-COGS question has no standard and moves gross margin by several points. |
| **Platform and legal environment** | External / regulatory | Google Play restructured fees effective June 30 2026; Apple's US external-link commission is at 0% under a court order now before the Supreme Court (cert granted June 30 2026). Any unit-economics model with a hardcoded take rate has a shelf life measured in months. |
| **Product engagement / activation definition** | Product analytics | Cost per activation is undefined without a retention-correlated activation event. This family cannot supply that definition. |
| **Cash flow timing and working capital** | Finance | Payback is an accrual concept; runway is a cash concept. Platform payout lags, annual prepayments, and refund windows separate the two by 30 to 90 days. |
| **Sales cycle length** | Sales ops | Required to lag S&M spend correctly in every CAC ratio and payback calculation. The Standards Board makes this mandatory and most companies skip it. |

---

**Highest-value cards, by the criterion you set (no industry consensus):** LTV (#1), CAC (#2), CAC Payback (#5), Contribution Margin per Customer (#8), CAC Ratio (#23), and MER (#22). Of these, the LTV and CAC Ratio cards are the most dangerous in practice, because in both cases two people can quote the same number, both be correct by a published definition, and disagree by more than 35% on what the business is worth.

agentId: a01bb75c5f1c587c0 (use SendMessage with to: 'a01bb75c5f1c587c0', summary: '<5-10 word recap>' to continue this agent)
<usage>subagent_tokens: 216242
tool_uses: 82
duration_ms: 1424984</usage>