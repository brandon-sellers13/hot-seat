# 08 — Growth Efficiency, Capital and Board-Level Metrics

Reference corpus section. Audience: growth consultant working consumer subscription + B2B SaaS, sitting in real board meetings.

**Cross-references (covered in depth by other sections, not duplicated here):** burn multiple, magic number, CAC ratio, LTV:CAC, CAC payback, quick ratio.

**Source-quality tags:** [P] primary (publisher's own report/PDF/dataset), [S] secondary (reputable analysis citing a primary), [W] weak (aggregator/blog, unverified chain).

**Market-regime warning:** benchmarks minted in 2020-2021 (ZIRP) reflect a capital regime that ended in 2022. Where a number is regime-bound, it is flagged inline.

---

## Metric index

1. Rule of 40
2. Growth rate (YoY / QoQ / QoQ annualized / CMGR / ARR vs revenue growth)
3. T2D3 and stage-appropriate growth expectations
4. Growth persistence / growth decay
5. Net burn and gross burn
6. Runway
7. Cash conversion score
8. Capital efficiency ratio (ARR per dollar raised)
9. Gross margin composition (software / services / infra-heavy / AI inference)
10. Contribution margin at company level
11. EBITDA and adjusted EBITDA
12. Free cash flow and FCF margin
13. S&M as % of revenue
14. R&D as % of revenue
15. G&A as % of revenue
16. Total marketing spend as % of revenue
17. ARR per employee / revenue per employee
18. The growth-versus-profitability frontier

§13–16 share a preamble on denominators and sample bias — read it before any of the four.

- Appendix A — cross-source reconciliation (SaaS Capital vs Benchmarkit, same metrics, different answers)
- Appendix B — verification log: circulating figures I could **not** confirm against a primary publisher
- Appendix C — sources used, with dates and sample sizes

---

## 1. Rule of 40

**applies_to:** both (built for B2B SaaS; used on consumer subscription only when revenue is genuinely recurring and reported on an ARR basis)

**definition:** The sum of a company's revenue growth rate and its profit margin, in percentage points, used as a single-number test of whether a software business is trading growth for profit at an acceptable rate.

### formula_variants

| Variant | Formula | When it is right | Who uses it |
|---|---|---|---|
| GAAP operating margin base | YoY revenue growth % + GAAP operating margin % | Public-company apples-to-apples; the only base that cannot be gamed by add-backs | Public-market analysts, some crossover funds |
| Non-GAAP operating margin base (ex-SBC) | YoY revenue growth % + (operating income + stock comp) / revenue | Comparing a heavily-SBC company to a low-SBC one; standard in public SaaS IR decks | Public SaaS IR, sell-side |
| EBITDA margin base | YoY revenue growth % + EBITDA margin % | Late-stage private and PE contexts where D&A and capitalized software differ wildly | PE, growth equity, Benchmarkit/Aleph survey standard |
| Adjusted EBITDA margin base | YoY revenue growth % + adj. EBITDA margin % | Company-defined; only right when the add-backs are genuinely non-recurring and disclosed | Sponsors, LBO models, most management decks |
| FCF margin base | YoY revenue growth % + (CFO − capex) / revenue | The strictest and the one that captures deferred-revenue float and capitalized software; increasingly the late-stage preference | Late-stage crossover investors, IPO-track boards |
| ARR-growth base | ARR growth % + margin % | Private company where GAAP revenue lags bookings badly | Early/growth-stage private boards |
| Efficiency-weighted / "Rule of X" | (a × growth %) + margin %, a ≈ 2–3 | When you believe growth is worth more than margin per point (a16z's Rule of X, Bessemer's weighted variants) | Growth VCs arguing for growth over margin |
| Forward Rule of 40 | NTM revenue growth % + NTM FCF margin % | Valuation work; what multiples actually correlate to | Meritech, public comps |

**Practitioners genuinely disagree** on two points: (a) whether the margin base should be EBITDA or FCF, with survey publishers defaulting to EBITDA and late-stage investors drifting to FCF; (b) whether growth should be weighted more than margin. There is no canonical answer. Force the base to be named every time the number is spoken.

### The base-shopping spread — worked example

One company, one fiscal year. $100M revenue, +25% YoY, $130M ARR growing 30%.

| Line | $M | % of revenue |
|---|---|---|
| GAAP operating income | (20.0) | (20%) |
| + Stock-based comp | 12.0 | 12% |
| = Non-GAAP operating income | (8.0) | (8%) |
| + D&A | 4.0 | 4% |
| = EBITDA | (4.0) | (4%) |
| + One-time restructuring | 3.0 | 3% |
| = Adjusted EBITDA | (1.0) | (1%) |
| Cash from operations (incl. +$9M Δ deferred revenue) | 6.0 | 6% |
| − Capex + capitalized software | (4.0) | (4%) |
| = Free cash flow | 2.0 | 2% |

| Rule of 40 stated as | Math | Score |
|---|---|---|
| Rev growth + GAAP operating margin | 25 + (−20) | **5** |
| Rev growth + non-GAAP operating margin | 25 + (−8) | **17** |
| Rev growth + EBITDA margin | 25 + (−4) | **21** |
| Rev growth + adjusted EBITDA margin | 25 + (−1) | **24** |
| Rev growth + FCF margin | 25 + 2 | **27** |
| ARR growth + FCF margin | 30 + 2 | **32** |

**27 points of spread from identical financials, every version defensible.** When a deck says "we're at 32," the entire content of that claim is the base. Ask for it before you react.

**inputs:** revenue or ARR (billing system / ERP: NetSuite, Sage Intacct, Maxio, Chargebee, Stripe); operating income, SBC, D&A (GL / accounting close); CFO and capex (cash flow statement). Never assemble Rule of 40 from a BI dashboard alone — the margin side has to come from the close.

**application:** It is a *screening* heuristic, not a diagnostic. Boards read it as a compression test: is this business allowed to keep burning? Investors read it as a valuation input, because forward Rule of 40 is one of the few operating metrics with a persistent (if noisy) relationship to EV/revenue multiples. Internally its only real use is to force the growth/margin trade into one conversation instead of two.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Private B2B SaaS + AI-native, FY2025 actuals, EBITDA base, n=110 | Median **25%**; top quartile **43%**; bottom quartile **7%** | Post-ZIRP efficiency era | 2026 SaaS & AI Performance Benchmarks (Aleph × Benchmarkit), pub. 2026-06-01 | [P] |
| Same cohort, prior year | Median **15%** (FY2024) → 25% (FY2025) — largest single-year gain in five years of the series | Efficiency recovery | Aleph × Benchmarkit, pub. 2026-06-01 | [P] |
| By growth stage, FY2025 | >50% growers: median **57**; 31–50% growers: median **8**; <10% growers: median **19** | Post-ZIRP | Aleph × Benchmarkit, pub. 2026-06-01 | [P] |
| Decomposition of the FY2025 gain | R&D fell 35% → 27% of revenue (−8pp); S&M fell 37% → 35% (−2pp); median growth *slowed* to ~20% | Post-ZIRP | Aleph × Benchmarkit, pub. 2026-06-01 | [P] |

**Regime flag:** "40 is the bar" is a 2015–2021 artifact. In the FY2025 data the *median* company is at 25 and only the top quartile clears 43. Quoting "40% is table stakes" in a 2026 board meeting misstates the distribution by roughly 15 points. Also note the U-shape: mid-stage (31–50% growth) companies score *worst*, because they are paying full freight for a sales org that has not yet scaled. Punishing a 31–50% grower for a low Rule of 40 is punishing them for being mid-stage.

### traps

- **Base-shopping** (above). The single most common manipulation in a board deck.
- **The margin-side head-fake.** A company that improved from 15 to 25 by cutting R&D 8 points looks identical to one that improved by accelerating retained growth. It is not the same company. Always decompose the delta into growth points vs margin points before you praise the move.
- **Add-back inflation.** "One-time" restructuring in three consecutive years is not one-time. See §11.
- **Deferred-revenue float in the FCF base.** A fast-growing annual-prepay business shows positive FCF from collecting cash it has not earned. Growth deceleration reverses that instantly, so an FCF-based Rule of 40 is most flattering exactly when it is least durable.
- **Applying it below ~$10M ARR.** At $3M ARR growing 120% with −80% margins the score is 40, which tells you nothing. Rule of 40 is roughly meaningless under $20M ARR; use burn multiple and CAC payback instead.
- **Using ARR growth against a GAAP margin.** Mixing a forward-looking numerator with a backward-looking denominator inflates the score by whatever the ARR/revenue gap is (see §2).
- **Consumer subscription mis-fit.** Consumer apps with monthly plans and 4–6% monthly churn have ARR that is not "annual recurring" in any durable sense. Rule of 40 on that base is theater.

**related:** feeds valuation multiples; decomposes into growth rate (§2) and margin (§11, §12); competes with burn multiple and magic number (other sections) as the efficiency summary statistic. Frequently confused with "growth + gross margin," which is not a thing.

---

## 2. Growth rate, stated every way it gets stated

**applies_to:** both

**definition:** The percentage change in revenue or recurring revenue over a stated period, annualized or not, from a stated starting point.

### formula_variants

| Variant | Formula | Period | When it is right |
|---|---|---|---|
| YoY revenue growth | (Rev_t / Rev_t−12mo) − 1 | Trailing 12 months | Board and investor default. Only version that is regime-comparable across companies. |
| YoY ARR growth | (ARR_t / ARR_t−12mo) − 1 | Point-in-time | Private SaaS default; leads GAAP revenue growth by roughly half a year |
| QoQ growth | (ARR_Q / ARR_Q−1) − 1 | One quarter | Detecting inflection; too noisy to state alone |
| QoQ annualized (compounded) | (1 + QoQ)^4 − 1 | One quarter | Only when the quarter is genuinely representative; almost never in a seasonal business |
| QoQ annualized (simple ×4) | QoQ × 4 | One quarter | Conservative shorthand; understates vs compounding. Say which you used. |
| CMGR (compound monthly growth rate) | (ARR_end / ARR_start)^(1/n months) − 1 | Any span | Consumer and PLG, where monthly cadence is the real cadence |
| CMGR annualized | (1 + CMGR)^12 − 1 | Any span | Converting a monthly series to an annual claim |
| MoM growth | (ARR_m / ARR_m−1) − 1 | One month | Operating cadence only. Never annualize a single month. |
| Exit-rate growth | (Dec ARR / prior Dec ARR) − 1 | Point-to-point | Same as YoY ARR growth; the phrasing investors use for the year-end snapshot |
| Growth on a rolling-4-quarter ARR average | (avg ARR last 4Q / avg ARR prior 4Q) − 1 | Smoothed | De-seasonalizing lumpy enterprise; closest ARR analogue to GAAP revenue growth |
| Organic vs total growth | Total growth less growth from acquired revenue | Any | Mandatory disclosure for any company that bought revenue |

**Practitioners disagree** on annualizing a quarter: some VCs treat compounded QoQ as the honest read of current momentum, others treat any single-quarter annualization as malpractice. Both positions are defensible; what is not defensible is switching between them quarter to quarter based on which is higher.

### The arithmetic — identical data, six answers

ARR series, one company, one year:

| Point | ARR |
|---|---|
| Jan 1 | $10.0M |
| Mar 31 (Q1 end) | $11.2M |
| Jun 30 (Q2 end) | $12.3M |
| Sep 30 (Q3 end) | $13.2M |
| Nov 30 | $13.7M |
| Dec 31 (Q4 end) | $14.0M |

| Framing | Math | Answer |
|---|---|---|
| YoY (exit-rate) | 14.0 / 10.0 − 1 | **40.0%** |
| CMGR, annualized | (14.0/10.0)^(1/12) − 1 = 2.844%/mo; (1.02844)^12 − 1 | **40.0%** (must equal YoY — good consistency check) |
| Q1 QoQ, compounded | (11.2/10.0 = 12.0%); (1.12)^4 − 1 | **57.4%** |
| Q4 QoQ, compounded | (14.0/13.2 = 6.06%); (1.0606)^4 − 1 | **26.5%** |
| Q4 QoQ, simple ×4 | 6.06% × 4 | **24.2%** |
| Last month MoM, annualized | (14.0/13.7 = 2.19%); (1.0219)^12 − 1 | **29.7%** |

**Range: 24.2% to 57.4% from one ARR table.** A founder who annualizes Q1 is reporting a company growing 2.4x faster than the one who annualizes Q4. Neither lied. This is why "growth rate" without a stated basis is not a number.

Second consistency check worth running in any board pack: CMGR-annualized must equal YoY. If it doesn't, someone restated ARR mid-year.

### ARR growth vs revenue growth — the two-year gap

The two diverge whenever the growth *rate* changes, because ARR is a point-in-time snapshot and GAAP revenue is an average over the period.

| Case | ARR path | GAAP revenue | ARR growth | Revenue growth | What a board sees |
|---|---|---|---|---|---|
| Accelerating | Flat $10M all of Y1 → $10M to $14M across Y2 | Y1 $10.0M; Y2 ≈ $12.0M (avg) | **40%** | **20%** | Founder quotes 40, auditor's 10-K says 20. Both correct. |
| Decelerating | $5M→$10M in Y1; $10M→$11M in Y2 | Y1 ≈ $7.5M; Y2 ≈ $10.5M | **10%** | **40%** | Revenue growth *flatters* a company that has already stalled. |

The decelerating case is the dangerous one. A business whose ARR growth has collapsed to 10% can report 40% GAAP revenue growth for a full year afterward. If your board only sees the income statement, it will find out roughly four quarters late. Always show ARR growth and revenue growth side by side, and label which is which.

**inputs:** ARR from the billing/subscription system (Stripe, Chargebee, Maxio, RevenueCat for mobile consumer, Recurly); recognized revenue from the GL after the close (NetSuite, Intacct, QuickBooks); acquired-revenue carve-out from the deal model. Consumer mobile: RevenueCat or App Store/Play Console proceeds — note whether the figure is gross bookings or net of the 15–30% store fee, because the growth rate differs if the fee tier changed.

**application:** Sets the pace expectation everything else is judged against. Boards read growth rate first and everything else second; a valuation conversation is fundamentally a growth-rate-and-durability conversation with a margin footnote.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Private B2B SaaS, all respondents, 2025 | Median **22%**, down from 25% in 2024 | Post-ZIRP deceleration | SaaS Capital private B2B SaaS growth-rate benchmarks, n>1,000, 14th annual survey | [P] |
| Bootstrapped private B2B SaaS | Median **20%** (down from 23% prior year) | Post-ZIRP | SaaS Capital, same survey | [P] |
| Equity-backed private B2B SaaS | Median **25%** (unchanged YoY) | Post-ZIRP | SaaS Capital, same survey | [P] |
| Bootstrapped, $3M–$20M ARR | Median **15%**; 90th percentile **42.3%** | Post-ZIRP | SaaS Capital, 2026 bootstrapped benchmarking post | [S] |
| Historical trend, same survey | 30% (2023) → 25% (2024) → 22% (2025) | Full post-ZIRP decay path | SaaS Capital | [P] |
| B2B SaaS + AI-native, FY2025 | Median growth **~20%** | Post-ZIRP | Aleph × Benchmarkit, pub. 2026-06-01 | [P] |
| Highest-NRR cohort | Median growth **173% higher** than population median | Post-ZIRP | SaaS Capital | [P] |

**Regime flag:** the 2021 mental model ("median private SaaS grows 40–50%") is two regimes stale. The same survey series shows the median dropping from 30% to 22% in two years. Any benchmark you are handed without a survey year attached should be assumed to be from 2021 and discounted hard.

### traps

- **Basis switching.** A company that reported QoQ-annualized in a strong quarter and YoY in a weak one is managing the narrative. Lock the basis in the board template.
- **Annualizing seasonality.** Q4-heavy enterprise businesses that annualize Q4 report a fictional company. Q1-heavy consumer (New Year's fitness/finance apps) does the same in reverse.
- **New-logo growth quoted as growth.** In a business with 120% NRR, most growth is expansion. "We grew 40%" with 30 points from expansion and 10 from new logos is a very different company than the reverse.
- **Acquired revenue folded in silently.** Ask for organic every single time.
- **ARR restatements.** Reclassifying services revenue into ARR, or changing the annualization convention on monthly plans, produces growth that came from a spreadsheet.
- **Annualized monthly ARR on high-churn consumer.** Multiplying MRR by 12 for a product with 8% monthly churn implies a customer life the product does not have.
- **Small-base percentages.** $200K to $400K is 100% growth and is not information.

**related:** feeds Rule of 40 (§1), T2D3 (§3), growth persistence (§4); paired with NRR to decompose into new vs expansion; the numerator of nearly every efficiency ratio in this corpus.

---

## 3. T2D3 and stage-appropriate growth expectations

**applies_to:** b2b primarily (the framework was written for enterprise SaaS; the consumer analogue is different and noted below)

**definition:** A prescriptive growth path for venture-scale SaaS — triple, triple, double, double, double — describing the annual ARR multiple a company should hit in each of the five years after it reaches roughly $2M ARR, on the way to a nine-figure outcome.

### formula_variants

| Variant | Path | Starting point | Note |
|---|---|---|---|
| T2D3 (canonical, Neeraj Agrawal / Battery Ventures) | 3x, 3x, 2x, 2x, 2x | ~$2M ARR | $2M → $6M → $18M → $36M → $72M → $144M |
| T3D3 | 3x, 3x, 3x, 2x, 2x, 2x | ~$1M ARR | Occasionally used for faster PLG paths |
| T2D3 from $1M | 3x, 3x, 2x, 2x, 2x | $1M ARR | $1M → $72M. Halves the endpoint; often quoted interchangeably, which is sloppy |
| "Double-double-triple-triple-double" (Y Combinator/Bessemer phrasing) | 2x, 2x, 3x, 3x, 2x | ~$1M | Reordered; front-loads the easier multiples |
| Growth-multiple-by-ARR-band (modern replacement) | Expected growth as a declining function of ARR scale | Any | What actual benchmarking now uses instead of a fixed path |

**Practitioners increasingly disagree** that a fixed multiple path is the right frame at all. The path was published in a regime where capital was cheap and growth was the only thing priced. The stage-appropriate replacement is a growth-by-ARR-band curve plus a persistence assumption (§4).

### The arithmetic

Starting at $2M ARR: Year 1 $6M, Year 2 $18M, Year 3 $36M, Year 4 $72M, Year 5 $144M. Compound annual growth over the five years = (144/2)^(1/5) − 1 = **136% CAGR**. That is the actual bar the framework sets, and it is worth saying out loud, because "triple triple double double double" sounds gentler than "sustain 136% compounded for five years."

**inputs:** ARR by year (billing system), the $2M starting-point date (which the company gets to choose, and will choose flatteringly).

**application:** A pattern-match, not a plan. Investors use it as a shorthand for "is this on a venture-scale trajectory." Boards use it as a stretch narrative. Its honest use is diagnostic: if a company misses the first triple, the exit-value distribution shifts materially and the right response is to re-underwrite the plan, not to demand a catch-up triple.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Canonical T2D3 path | 3x, 3x, 2x, 2x, 2x from ~$2M ARR to ~$100M+ | Written 2015; ZIRP-adjacent | Neeraj Agrawal, Battery Ventures, "The SaaS Adventure" (T2D3) | [P] — framework definition, not a benchmark |
| Realistic modern median, private B2B SaaS | **22%** median growth (all respondents), 25% equity-backed | Post-ZIRP | SaaS Capital, n>1,000 | [P] |
| Bootstrapped $3M–$20M ARR | Median **15%**, 90th pct **42.3%** | Post-ZIRP | SaaS Capital 2026 | [S] |
| Top quartile Rule of 40 cohort | 43% Rule of 40 | Post-ZIRP | Aleph × Benchmarkit 2026-06-01 | [P] |

**Regime flag — this is the most important one in the section.** T2D3 describes the top few percent of outcomes in a capital regime that ended. Against a current median of 22%, a company doing 2x at $20M ARR is in roughly the top decile, not "behind plan." Boards that still hold T2D3 as the bar are, in practice, setting a target that ~95%+ of the funded population misses, and then funding S&M against it. **NO SOURCED BENCHMARK FOUND** for the share of venture-backed SaaS that actually completes the full T2D3 path; treat any percentage you see quoted for that without a named dataset as fabricated.

### traps

- **Starting-point shopping.** Reaching $2M ARR is a date the company picks. Starting the clock a year late makes the path look on-track.
- **Confusing the $1M and $2M variants.** They differ by 2x at the endpoint ($72M vs $144M). People quote them interchangeably.
- **Treating it as a floor.** It was a description of exceptional outcomes, published as an aspiration, now used as a minimum. That inversion drives real capital destruction: companies raise and spend against a triple they were never going to hit.
- **Ignoring the denominator.** Tripling at $2M and tripling at $20M are different physical problems. The framework's own multiples decline for exactly this reason, and it still under-decays.
- **Applying it to consumer subscription.** Consumer apps with 3–6% monthly churn face a ceiling where new-user acquisition equals churn; the growth path is governed by retention curve shape and paid-acquisition efficiency, not by an ARR multiple ladder.

**related:** growth rate (§2), growth persistence (§4), capital efficiency (§8). Confused with the "Bessemer $100M ARR in 5 years" framing, which is a destination, not a path.

---

## 4. Growth persistence / growth decay

**applies_to:** both

**definition:** The rate at which a company's growth rate itself declines year over year — expressed as the ratio of this year's growth rate to last year's — which is the single best predictor of the forward revenue curve.

### formula_variants

| Variant | Formula | Interpretation | When it is right |
|---|---|---|---|
| Growth persistence (Bessemer) | Growth rate_year t ÷ Growth rate_year t−1 | 0.85 = this year's growth is 85% of last year's | Standard; the version investors model with |
| Growth endurance (ICONIQ phrasing) | Same ratio, same idea | Same | Interchangeable in practice; check which the deck means |
| Growth decay rate | 1 − persistence | 0.15 = growth decayed 15% | Same information, inverted sign |
| Absolute decay (percentage points) | Growth_t − Growth_t−1 | "Growth fell 8 points" | Useful late-stage when growth is low; misleading early |
| Multi-year persistence | (Growth_t / Growth_t−n)^(1/n) | Smoothed average persistence | Better than a single year, which is noisy |
| Forward projection | Growth_t+1 = Growth_t × persistence | Building the forward curve | The actual use: forecasting |

**Practitioners disagree** on whether persistence should be computed on ARR growth or revenue growth. ARR growth persistence turns earlier and is the better leading indicator; revenue growth persistence is what public comps are built on. Use ARR internally, revenue for comparables.

### The arithmetic — why persistence dominates

A company at $50M ARR growing 60%, with three different persistence assumptions:

| Year | 0.90 persistence | 0.80 persistence | 0.70 persistence |
|---|---|---|---|
| Growth Y1 | 60% → $80.0M | 60% → $80.0M | 60% → $80.0M |
| Growth Y2 | 54% → $123.2M | 48% → $118.4M | 42% → $113.6M |
| Growth Y3 | 48.6% → $183.1M | 38.4% → $163.9M | 29.4% → $147.0M |
| Growth Y4 | 43.7% → $263.1M | 30.7% → $214.2M | 20.6% → $177.3M |
| Growth Y5 | 39.4% → $366.7M | 24.6% → $266.9M | 14.4% → $202.8M |

Same starting ARR, same starting growth rate. **$367M vs $203M at year five — an 81% difference in terminal ARR driven entirely by a persistence assumption nobody puts on a slide.** This is the argument for making persistence an explicit, tracked, board-level number rather than an artifact buried in a model.

**inputs:** at least three years of clean ARR or revenue history, restated consistently (billing system + GL). Two years gives you one persistence data point, which is noise. M&A must be carved out or persistence is meaningless.

**application:** This is the metric that determines whether a growth-stage company is worth a high multiple. Investors are not buying this year's growth; they are buying the integral of the decay curve. A board that tracks persistence catches deceleration a year before it shows up in revenue growth. It also reframes the S&M conversation correctly: incremental spend that raises this year's growth but lowers persistence (discount-driven deals, poor-fit segments) destroys value.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Best-in-class private SaaS growth persistence | Widely cited as ~**0.80–0.90** for top performers | Framework was popularized pre-2022 | Bessemer Venture Partners, State of the Cloud / Atlas growth-persistence material | [W] — **I could not verify the exact figure against a primary Bessemer PDF within this research budget. Treat as directionally used, numerically unconfirmed.** |
| Public SaaS median decay | **NO SOURCED BENCHMARK FOUND** in this pass | — | — | — |
| Underlying growth deceleration, private B2B SaaS | Median growth 30% (2023) → 25% (2024) → 22% (2025); implied population-level persistence ≈ 0.83 then 0.88 | Post-ZIRP | Computed from SaaS Capital medians, n>1,000 | [S] — derived, not published as persistence |

**Regime flag:** the population-level persistence implied above (0.83, 0.88) is a *cohort* figure across different companies each year, not a same-company measure, and the 2023–2025 window is a macro-driven contraction. Do not use it as a company-level forecasting prior without saying so.

### traps

- **Two data points.** One persistence ratio is not a trend. Requires three-plus years.
- **M&A contamination.** An acquisition resets growth upward and makes persistence look >1.0. Carve it out.
- **Persistence >1.0 on a small base.** Real acceleration exists (a genuine product-market inflection, or an AI-driven expansion cycle), but at small ARR it is usually one large deal.
- **The comp-plan feedback loop.** Sales comp that rewards logo count over retained ARR raises this year's growth and lowers persistence. The metric only works if you look at both.
- **Confusing persistence with retention.** NRR of 110% does not mean persistence of 1.10. Persistence is about the growth *rate*, retention is about the revenue *base*. A company can hold 120% NRR while persistence falls to 0.7 because new-logo acquisition is collapsing.
- **Fitting persistence during a pull-forward.** Any COVID-style or AI-hype demand pull-forward makes the following year's persistence look catastrophic. Normalize or exclude.

**related:** growth rate (§2); the assumption underneath every DCF and every T2D3 conversation (§3); mechanically linked to NRR and new-logo acquisition. Confused with growth rate itself, and with churn.

---
## 5. Net burn and gross burn

**applies_to:** both

**definition:** Gross burn is total cash out the door in a period; net burn is cash out minus cash in, i.e. the actual monthly decline in the bank balance.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| Gross burn (cash operating expenses) | Total cash operating expenses in the period | Sizing the cost base independent of revenue; the number a restructuring conversation runs on | Excludes financing inflows |
| Gross burn (total cash outflows) | All cash out including capex and debt service | Cash-management view for a company near the wall | Some CFOs include debt principal, some do not — ask |
| Net burn (cash-balance delta) | Beginning cash − ending cash, excluding financing | The honest version; ties to the bank statement | The one a board should demand |
| Net burn (P&L proxy) | Cash operating expenses − cash collections | Faster to produce mid-month; approximate | Diverges from the bank when working capital swings |
| Net burn (net loss + adjustments) | Net loss + D&A + SBC + Δworking capital − capex | Ties to the cash flow statement | Effectively negative FCF; see §12 |
| Adjusted / normalized net burn | Net burn excluding one-time items (severance, legal settlement, a large annual prepay) | Forecasting go-forward | Every add-back here is a place to hide something |
| Trailing-3-month average net burn | Mean of last three months' net burn | The right input to runway | Single-month burn is nearly always seasonal |

**Practitioners disagree** on whether financing inflows (a SAFE, a venture debt draw, a tax credit refund) belong in net burn. Correct treatment: they do not — net burn measures operating cash consumption. Including them lets a company report "we burned nothing" in a month they raised. Insist on the operating definition and disclose financing separately.

### The arithmetic

A company collecting $1.4M/month in cash and spending $2.6M/month:

| Metric | Value |
|---|---|
| Gross burn | $2.6M/month |
| Net burn | $1.2M/month |
| Net burn in a month with a $3.0M annual-prepay renewal | $2.6M − $4.4M = **net cash positive $1.8M** |
| Trailing-3-month average net burn | The number that actually matters |

The annual-prepay month is the trap in miniature. One large renewal turns a burning company into a "profitable" one for 30 days. This is why runway must be computed on an average, not on last month (see §6).

**inputs:** bank statements and the cash flow statement (Mercury, Brex, JPM; NetSuite/Intacct for the close). Do not compute net burn from the P&L alone in a business with meaningful prepayments — the P&L and the bank account are on different clocks.

**application:** Gross burn answers "how big is this company." Net burn answers "how long do we have." Boards use gross burn to size a reduction-in-force (it is the number that actually falls when you cut) and net burn to set the fundraise timeline. In a downside case, model gross burn, because revenue is the thing that goes away.

### benchmark

Burn is not benchmarkable in absolute dollars. The benchmarkable forms are burn multiple (covered in another section) and the profitability rate of the population:

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Bootstrapped private B2B SaaS | **83%** are breakeven or profitable | Post-ZIRP | SaaS Capital 2026 spending benchmarks, survey completed March 2026, n>1,000, pub. 2026-06-10 | [P] |
| Equity-backed private B2B SaaS | **52%** are breakeven or profitable | Post-ZIRP | SaaS Capital 2026 spending benchmarks, pub. 2026-06-10 | [P] |
| Total spend as % of ARR, bootstrapped | **96%** median | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |
| Total spend as % of ARR, equity-backed | **101%** median | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |

**Regime flag:** the fact that the *median* equity-backed private SaaS company now spends only 101% of ARR is itself the post-ZIRP story. In 2021 that figure was materially higher across the venture-backed population; a board that remembers 130–150% spend ratios as normal is remembering a different market. **NO SOURCED BENCHMARK FOUND** for the 2021 comparison figure in this pass — do not quote one from memory.

### traps

- **Single-month burn.** Annual prepays, payroll timing (three-payroll months), quarterly tax and insurance payments, and annual software renewals all make one month unrepresentative. Always trailing-3 or trailing-6.
- **Financing in the numerator.** "Net burn was zero in March" because a tranche closed in March.
- **Netting a receivable that has not been collected.** Bookings are not cash.
- **Gross burn understated by capitalized software.** Capitalizing engineering salaries moves cash spend off the P&L but not out of the bank. A company can cut "opex" 12% and burn the identical amount.
- **Excluding one-time items that are structurally recurring.** Severance every year is opex.
- **Ignoring the deferred-revenue unwind on the way down.** A decelerating annual-prepay business sees net burn worsen faster than the P&L implies, because collections fall before the recognized revenue does.

**related:** feeds runway (§6) and burn multiple (other section); the inverse of FCF (§12); confused with net loss, which it is not.

---

## 6. Runway

**applies_to:** both

**definition:** The number of months until the company runs out of cash at the current rate of consumption.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| Naive runway | Cash ÷ last month's net burn | Never, as a decision input | The default in most dashboards, and the trap |
| Trailing-average runway | Cash ÷ trailing-3-month average net burn | Quick read; the minimum acceptable version | Still backward-looking |
| Forecast (plan-case) runway | Months until the cash balance in the operating plan hits zero | The correct default for board reporting | Depends on the plan being credible |
| Downside-case runway | Same, on a plan with new bookings haircut 30–50% and no new financing | What a board should actually govern to | The number that determines when you must act |
| Runway to a milestone | Months until cash zero, vs months to reach the next fundable milestone | Fundraise planning | The only version that answers "do we have enough" |
| Cash-out date | A calendar date, not a month count | Board communication | Harder to fudge than a ratio; prefer it |
| Runway including undrawn facilities | Cash + undrawn venture debt ÷ net burn | Only when covenants are actually met | Undrawn debt with an MRR covenant disappears exactly when you need it |
| Effective runway | Cash-out date minus the time required to close a round (typically 4–6 months) | Deciding when to start raising | The operator's version |

**Practitioners disagree** on whether to include undrawn debt facilities. Include it only with the covenant test disclosed alongside. Venture debt availability is contingent on the company being healthy, which is anti-correlated with needing it.

### The arithmetic — why last month's burn lies

Company with $12.0M cash. Net burn by month: Jan $1.0M, Feb $1.1M, Mar $1.2M, Apr $1.3M, May $1.4M, **Jun $0.4M** (a $1.0M annual renewal landed).

| Method | Math | Answer |
|---|---|---|
| Naive (last month) | 12.0 ÷ 0.4 | **30.0 months** |
| Trailing-3 average (Apr–Jun: 1.3, 1.4, 0.4 → 1.033) | 12.0 ÷ 1.033 | **11.6 months** |
| Trailing-6 average (1.233) | 12.0 ÷ 1.233 | **9.7 months** |
| Forward plan (burn growing $0.1M/mo from a $1.4M base, plus known Q4 renewals) | Cumulative cash exhaustion | **~7.5 months** |

**30 months vs 7.5 months from the same bank account.** The naive number is not conservative-with-error; it is off by a factor of four and points in exactly the wrong direction. Worse, the naive method is *most* wrong in the month a big renewal lands, which is also the month the team feels best about the business.

The second failure mode is burn growth. Runway math assumes a constant burn. Any company that is hiring against a plan has a rising burn, so a static-burn runway systematically overstates. If burn is growing g% per month, the true runway solves a geometric series, not a division.

**inputs:** cash and cash equivalents (bank + treasury/money-market; state whether restricted cash and the payroll float are included), net burn (§5), the board-approved operating plan, and the debt facility term sheet with covenants.

**application:** Runway is the metric that sets the board's decision clock. Below ~12 months, the board's job changes from growth governance to financing governance. Below ~6 months, options collapse to bridge, sale, or cut. The reason to insist on a downside-case cash-out *date* is that it converts an abstract ratio into a deadline people can plan against, including the 4–6 months a raise actually takes.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Conventional guidance | 18–24 months post-round is the widely repeated operating norm | Repeated across regimes; hardened post-2022 | **NO SOURCED BENCHMARK FOUND** — this figure is folklore-grade. I could not verify it against a named dataset within the research budget. Do not present it as data. | [W] |
| Implied by the population | 52% of equity-backed private B2B SaaS are breakeven or profitable, i.e. roughly half have effectively unbounded runway | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |

**Regime flag:** the 18-month norm is a ZIRP-era artifact of an environment where the next round was assumed. In the current regime the operative planning question is not "18 months of runway" but "runway to default-alive," and boards increasingly underwrite to a path where no further primary round happens. Say that explicitly rather than quoting a month count.

### traps

- **Computing on last month's burn.** The headline trap. See the worked example.
- **Static burn against a hiring plan.** Runway falls as you execute the plan you just approved.
- **Counting restricted cash, a security deposit, or a payroll-float balance as available cash.**
- **Counting undrawn debt with covenants you will breach.**
- **Ignoring the raise duration.** 9 months of runway with a 5-month raise is 4 months of real decision time.
- **Ignoring the cost of stopping.** Wind-down, severance, and lease obligations mean you cannot burn to literally zero. Reserve 2–3 months of gross burn.
- **Runway quoted before the collections risk.** A business with a concentrated customer base and 90-day DSO has a runway that is contingent on a small number of payment decisions.
- **Deferred revenue as an asset.** It is an obligation to deliver service, not cash you can spend twice.

**related:** net/gross burn (§5), FCF (§12), cash conversion score (§7). Confused with "months to profitability," which is a different and usually more optimistic number.

---

## 7. Cash conversion score

**applies_to:** b2b primarily; usable on consumer subscription if ARR is a meaningful construct for the business

**definition:** How much ARR a company has produced for each net dollar of outside capital it has consumed — capital raised, less the cash still sitting on the balance sheet.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| Bessemer CCS (canonical) | ARR ÷ (total equity + debt capital raised − current cash) | Standard; the version investors mean | Denominator = capital *consumed*, not raised |
| Gross capital efficiency | ARR ÷ total capital raised | Comparing companies with very different cash positions | Punishes a company that just raised; see §8 |
| CCS excluding debt | ARR ÷ (equity raised − cash) | When debt is a working-capital revolver, not growth funding | Disclose the choice |
| Net-new-ARR CCS | Net new ARR in period ÷ net burn in period | Period-level rather than inception-to-date | This is effectively the inverse of burn multiple (other section) |
| Founder-adjusted CCS | Excludes a founder's own capital or bootstrapped retained earnings | Comparing bootstrapped to funded | Rarely done; matters for mixed-history companies |

**Practitioners disagree** mainly on the debt treatment and on whether to net out cash. Netting cash is what makes CCS an *efficiency* metric rather than a *funding* metric: a company that raised $100M and has $80M in the bank has consumed $20M, and CCS says so. The un-netted version (§8) says something different and is not wrong, just different.

### The arithmetic

| Company | ARR | Capital raised | Cash on hand | Capital consumed | CCS | Gross efficiency (§8) |
|---|---|---|---|---|---|---|
| A | $20M | $60M | $40M | $20M | **1.00x** | 0.33x |
| B | $20M | $60M | $5M | $55M | **0.36x** | 0.33x |

Identical ARR, identical capital raised, identical gross efficiency ratio. CCS separates them by 3x, and correctly: A got to $20M ARR on $20M consumed and still has a war chest; B spent $55M for the same place. The un-netted ratio cannot see the difference. This is the argument for using CCS over raw ARR-per-dollar-raised.

**inputs:** current ARR (billing system); cumulative capital raised across all instruments including SAFEs, converted notes, and venture debt (cap table — Carta, Pulley — plus the debt schedule); current cash (bank/treasury). The cap-table figure is the one people get wrong: unconverted SAFEs and secondary transactions both cause errors.

**application:** Investors use CCS as a screening statistic for how much of the return is likely to survive dilution. It is one of the few metrics that is genuinely inception-to-date, so it cannot be fixed by a good quarter, which is exactly why it is useful. Boards use it in fundraise diligence prep, because an incoming investor will compute it whether or not you present it.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Good | CCS **0.25–0.5x** — associated with ~40% IRR in Bessemer's sample | 2010s / pre-ZIRP-peak vintages | Bessemer Venture Partners, "Cash Conversion Score," Jeff Epstein & Mary D'Onofrio, pub. **2019-11-27** | [P] |
| Better | CCS **0.5–1.0x** — ~80% IRR | Same | Bessemer, 2019-11-27 | [P] |
| Best | CCS **>1.0x** — ~120% IRR, 2x the average IRR of sub-1.0x companies | Same | Bessemer, 2019-11-27 | [P] |
| Named examples in the source | Twilio 1.1x (pre-Series E), Shopify 1.3x (2013 Series C), PagerDuty 1.7x (2016) | 2013–2016 vintages | Bessemer, 2019-11-27 | [P] |

**Regime flag — read this one carefully.** The CCS thresholds are primary-sourced and stable as *definitions*, but the IRR figures attached to them come from a November 2019 publication analyzing 2010s vintages that exited into the 2019–2021 multiple expansion. Those IRRs are not achievable-by-construction in the current multiple environment. Quote the CCS bands; do not quote the IRRs as forward expectations. **NO SOURCED BENCHMARK FOUND** for an updated post-2022 CCS-to-IRR mapping.

### traps

- **Missing capital in the denominator.** Unconverted SAFEs, convertible notes, venture debt drawn and repaid, and any founder capital. Every omission inflates the score.
- **Cash netting on a company that just raised.** A company that closed a round yesterday shows an artificially high CCS because the cash has not been spent yet. CCS is most honest measured a year after a round, least honest a week after.
- **ARR definition drift.** Everything that inflates ARR (services revenue, annualized pilots, non-renewing usage spikes) inflates CCS directly.
- **Comparing a bootstrapped company.** A company that raised $2M and has $10M ARR shows CCS of ~5x. True, and not comparable to a venture-backed peer.
- **Treating it as a forward metric.** CCS is a historical judgment. It says nothing about the efficiency of the *next* dollar, which is what a board is actually deciding on. Pair it with burn multiple.
- **M&A-inflated ARR.** ARR bought with the raised capital appears in the numerator while the purchase price sits in the denominator, which is coherent, but a company that acquired ARR at 3x revenue and shows CCS of 0.4x is not the same business as an organic one at 0.4x.

**related:** capital efficiency ratio (§8) is the un-netted sibling; burn multiple (other section) is the period-level version; feeds dilution and ownership math directly.

---

## 8. Capital efficiency ratio (ARR per dollar of capital raised)

**applies_to:** both

**definition:** ARR divided by total capital raised to date — the simplest inception-to-date measure of how much recurring revenue a company has built per dollar of outside money it has taken.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| ARR per dollar raised | Current ARR ÷ total capital raised | Fast screen; the version a board member computes in their head | Ignores cash on hand |
| Cash conversion score | ARR ÷ (capital raised − cash) | When you want efficiency, not funding history | See §7; usually the better metric |
| Capital consumed per $1 of ARR | (Capital raised − cash) ÷ ARR | Inverted; reads as "we spent $2.80 to build $1 of ARR" | Same information, more intuitive to non-finance boards |
| Equity-only ratio | ARR ÷ equity raised | When debt is short-term working capital | Disclose |
| Enterprise-value efficiency | EV ÷ capital raised | The investor's actual question: did the money make money | Requires a mark |
| Incremental capital efficiency | Net new ARR (period) ÷ capital consumed (period) | Forward-looking; what the *next* dollar buys | Inverse of burn multiple; the more decision-useful version |
| Revenue per dollar raised | Revenue ÷ capital raised | Non-recurring or services-mixed businesses where ARR is not meaningful | Common in consumer |

**Practitioners disagree** about whether the metric should be inception-to-date at all. The inception-to-date version is a scorecard on management history; the incremental version is the only one that informs the next decision. Both belong in a board pack, labeled differently.

### The arithmetic

Three companies, all at $30M ARR:

| Company | Capital raised | Cash | ARR/$ raised | CCS | Capital consumed per $1 ARR |
|---|---|---|---|---|---|
| Lean | $25M | $6M | **1.20x** | 1.58x | $0.63 |
| Typical | $70M | $15M | **0.43x** | 0.55x | $1.83 |
| Overcapitalized | $180M | $20M | **0.17x** | 0.19x | $5.33 |

The third company is not necessarily a worse business, but its ownership math is fixed: it needs a materially larger exit to return capital, and the founders own materially less of it. That is the conversation this metric is for.

**inputs:** cap table including SAFEs, notes, and secondaries (Carta/Pulley); debt schedule; ARR from billing. Reconcile the cap table to the actual bank inflows — the two disagree more often than anyone expects, usually because of a note that converted at a discount.

**application:** Investors use it to judge whether the story ("we're efficient") matches the balance sheet. Boards use it in two places: pre-fundraise, to anticipate how a new investor will frame the company, and in the ownership/dilution conversation, because a low ratio compounds into a returns problem regardless of how good the product is. It is also the honest counterweight to a growth-at-all-costs narrative: a company that outgrew its peers on 4x the capital did not outperform.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| CCS bands (the closest primary-sourced thresholds) | Good 0.25–0.5x, better 0.5–1.0x, best >1.0x | 2019 publication, 2010s vintages | Bessemer, "Cash Conversion Score," pub. 2019-11-27 | [P] |
| ARR per dollar *raised* (un-netted) thresholds | **NO SOURCED BENCHMARK FOUND** — no named dataset publishes thresholds for the un-netted ratio | — | — | — |
| Population context | 83% of bootstrapped vs 52% of equity-backed private B2B SaaS are breakeven or profitable | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |

**Regime flag:** the un-netted ratio has no published benchmark I could verify, and figures circulating for it in 2025–2026 SEO content should be treated as unsourced. If you need a threshold, use the CCS bands and say you are using CCS.

### traps

- **The denominator is always understated.** SAFEs not yet converted, notes, venture debt, and revenue-based financing all get forgotten.
- **Recency blindness.** A company that raised a large round last month looks terrible on this ratio and fine on CCS. Neither reading is complete without the other.
- **It rewards under-investment.** A company that stayed lean and grew 12% has a beautiful ratio and may still be a bad investment. Capital efficiency is only meaningful jointly with growth — this is precisely what Rule of 40 and burn multiple are trying to do.
- **Survivorship in any peer comparison.** The companies with terrible ratios shut down and left the dataset.
- **Acquired ARR.** Buying ARR shows up as efficiency if you only look at the numerator's size.
- **Ignoring the market regime the capital was raised in.** Capital raised in 2021 at a 50x ARR multiple bought a very different amount of runway per dilution point than capital raised in 2024. The ratio treats every dollar as equal; the cap table does not.

**related:** cash conversion score (§7), burn multiple (other section), runway (§6). Directly determines dilution and the required exit value for a given return multiple.

---
## 9. Gross margin composition — software vs services vs infrastructure-heavy (and the AI inference problem)

**applies_to:** both

**definition:** Revenue less the cost of delivering that revenue, expressed as a percentage — and, more usefully, the *composition* of what sits in COGS, which is what actually determines whether an 80% number is real.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| Blended gross margin | (Total revenue − total COGS) ÷ total revenue | Headline reporting | Mixes subscription and services; hides the story |
| Subscription gross margin | (Subscription revenue − subscription COGS) ÷ subscription revenue | The number that matters for valuation | Demand this one |
| Services gross margin | (Services revenue − services COGS) ÷ services revenue | Sizing the drag from implementation | Often near zero or negative by design |
| Cash gross margin | Excludes non-cash items (SBC in COGS, amortization of capitalized software) | Cash-flow-oriented boards | Flatters vs GAAP |
| Contribution-style gross margin | Revenue − *variable* COGS only | Pricing and unit-economics work | Excludes fixed hosting minimums; see §10 |
| Product-line gross margin | Per SKU / per product | AI feature economics | The only way to see an AI margin drag before it hits the blended number |
| Net-of-store-fees margin (consumer) | Revenue net of the 15–30% App Store / Play commission | Consumer subscription apps | Whether the commission is in revenue or COGS changes the margin by ~20 points |

**Practitioners disagree** on where to put: customer success (COGS or S&M — support in COGS, success/upsell in S&M is the defensible split), amortization of capitalized software (COGS under GAAP, frequently excluded in "cash gross margin"), and free-tier / trial inference cost (COGS or S&M — it is a customer-acquisition cost in substance and a delivery cost in form).

### What belongs in COGS, by business type

| Line item | Pure software | Services-heavy | Infra-heavy | AI-native |
|---|---|---|---|---|
| Hosting / cloud compute | Yes | Yes | Yes, dominant | Yes |
| Third-party data / API licenses | Yes | Yes | Yes | Yes |
| Customer support | Yes | Yes | Yes | Yes |
| Implementation / onboarding staff | Only if paid | Yes, dominant | Yes | Yes |
| Model inference (customer-facing) | n/a | n/a | n/a | **Yes, dominant** |
| GPU compute for serving | n/a | n/a | Yes | **Yes** |
| Vector DB, embeddings, orchestration, data movement | n/a | n/a | Yes | **Yes** |
| AI monitoring / eval / hallucination detection in prod | n/a | n/a | n/a | **Yes** |
| Model training and fine-tuning | n/a | n/a | n/a | **No — R&D opex (or capitalized)** |
| Dev/test inference | n/a | n/a | n/a | **No — R&D opex** |
| Payment processing | Sometimes | Sometimes | Sometimes | Sometimes |
| Amortization of capitalized software | Yes (GAAP) | Yes | Yes | Yes |

The training-vs-inference split is the load-bearing distinction. Training is a period investment in the asset; inference is the marginal cost of serving a customer. Putting training in COGS understates gross margin and overstates R&D efficiency; putting *inference* in R&D does the reverse and is the more common manipulation.

**inputs:** GL with a COGS chart of accounts that actually separates hosting, inference, support, and services (most companies' does not, and fixing it is a real project); cloud bills tagged by environment (prod vs dev) and by product; model-provider invoices (OpenAI, Anthropic, Bedrock, Vertex) tagged by API key to product and to customer; services timesheets.

**application:** Gross margin sets the ceiling on every downstream efficiency metric. It is the denominator of LTV, the constraint on how much CAC a business can afford, and the single biggest input into the revenue multiple a public or private buyer will pay. For a board, the specific decision it drives now is AI pricing: if a feature ships at negative incremental gross margin, usage growth makes the P&L worse, and the fix is pricing or model routing, not sales.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Private B2B SaaS, total revenue gross margin | **77%** median | Post-ZIRP | Benchmarkit, 2025 SaaS Performance Metrics | [P] |
| Private B2B SaaS, subscription gross margin | **81%** median | Post-ZIRP | Benchmarkit, 2025 SaaS Performance Metrics | [P] |
| Professional services gross margin | **30%** median | Post-ZIRP | Benchmarkit, 2025 SaaS Performance Metrics | [P] |
| Private B2B SaaS COGS components (% of ARR) | Hosting **5%**, DevOps **4%**, Pro-services COGS **5%**, other COGS **3%** → implied total COGS ~17%, implied gross margin ~**83%** | Post-ZIRP | Derived from SaaS Capital 2026 spending benchmarks, survey March 2026, n>1,000, pub. 2026-06-10 | [S] — derived, not published as a gross margin |
| AI product gross margin, AI-building software companies | **45%** (2025 actual), **53%** projected 2026, **59%** projected 2027 | Current AI regime | ICONIQ, "State of AI: The Builder's Economy," ~300 executives, Q2 2026 survey, pub. **July 2026** | [P] |
| Same, earlier snapshot | **~52%** average projected for 2026 | Current AI regime | ICONIQ, "State of AI: Bi-Annual Snapshot," ~300 executives, Q2 2025 + Q4 2025 waves | [P] |
| AI products as share of total revenue at these companies | **32%** (2025), **42%** projected 2026, **53%** projected 2027 | Current AI regime | ICONIQ, Builder's Economy, pub. July 2026 | [P] |
| Internal AI spend as % of revenue | **11%** (2025), **16%** (2026p), **19%** (2027p) | Current AI regime | ICONIQ, Builder's Economy, pub. July 2026 | [P] |
| Cost-structure direction | Talent remains the largest cost category but declines as products scale, while model inference cost rises; two-thirds of companies report improved per-query unit economics | Current AI regime | ICONIQ, Builder's Economy, pub. July 2026 | [P] |
| Practitioner target bands: AI-native 50–65% at maturity; AI-enabled 72–85% | — | Current AI regime | The SaaS CFO, "What Should Be Included in AI COGS," pub. 2026-05-05 | [W] — practitioner framework, not a survey |

**Verification note — a figure to distrust.** Aggregator content circulating in 2026 attributes to ICONIQ a claim that "inference alone consumes roughly 23% of revenue at scaling-stage AI B2B companies," and a related "model inference rising from 20% to 23% of total spend." **I could not find either figure on ICONIQ's own report pages.** ICONIQ's published material states the *direction* (inference share rising as products scale) without those percentages on the public pages I could reach. Treat the 23% number as unverified and do not put it in a board deck attributed to ICONIQ without pulling the actual PDF.

**Regime flag:** the "80%+ gross margin" mental model is a pre-AI software artifact. It still holds for AI-enabled SaaS bolting a feature onto a seat-priced product; it does not hold for AI-native products, where the primary-sourced figure is 45% actual for 2025. The important structural point is that the two curves move in opposite directions inside the same company: AI product revenue is growing from 32% to a projected 53% of the mix while carrying roughly half the margin of the legacy product, so blended gross margin declines even if every individual product's margin improves. Mix shift, not cost inflation, is the mechanism.

### traps

- **Blended margin hiding a services drag.** A company at 77% blended with 20% services revenue at 30% margin has an 89% software business and a services problem. Both facts matter and the blended number shows neither.
- **Inference booked to R&D.** The single highest-leverage misclassification available to an AI company right now. Check whether prod and dev API keys are separated.
- **Free-tier and trial inference in COGS.** Defensible under GAAP, but it makes gross margin look worse than the paying-customer economics; conversely, moving it to S&M inflates CAC. Show both.
- **Fixed cloud commitments treated as variable.** A three-year committed-use discount is a fixed cost. Gross margin improves with scale not because unit costs fall but because you are amortizing a commitment. That reverses on the way down.
- **Capitalized software.** Capitalizing engineering shifts cost from R&D opex to COGS amortization later. It improves R&D-percent-of-revenue today and degrades gross margin in two years. Check the capitalization policy before comparing companies.
- **Consumer store fees.** A consumer subscription app reporting gross (pre-commission) revenue with the 15–30% fee in COGS shows a ~70–85% gross margin; reporting net proceeds as revenue shows ~95%+. Neither is wrong; they are not comparable.
- **Support cost lagging usage.** Support headcount is added quarters after the customers arrive, so a fast-growing company's gross margin is structurally overstated.
- **"Gross margin improves at scale" as a plan.** For AI-native products it may, via model routing and smaller fine-tuned models, and ICONIQ's data supports improvement. But it is a projection with two forward years in it, not a result.

**related:** the ceiling on LTV:CAC and contribution margin (§10); the denominator of every efficiency ratio; feeds Rule of 40 (§1) via EBITDA and FCF. Confused with contribution margin, which subtracts variable S&M as well.

---

## 10. Contribution margin at company level

**applies_to:** both (much more commonly used and more load-bearing in consumer than in B2B)

**definition:** Revenue less all variable costs — COGS plus the variable portion of sales and marketing — showing what each incremental dollar of revenue actually contributes toward fixed costs and profit.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| Company contribution margin | (Revenue − variable COGS − variable S&M) ÷ revenue | Company-level view of operating leverage | The version in this section |
| Gross-profit-after-marketing (GPAM) | Gross profit − total paid marketing spend | Consumer subscription and e-commerce standard | Blunter, easier to compute, harder to manipulate |
| Contribution margin after CAC (cohort) | Cohort revenue − cohort COGS − cohort acquisition cost, over a defined window | Consumer app economics; "CM1 / CM2 / CM3" ladders | Cohort-level, not company-level |
| CM1 / CM2 / CM3 convention | CM1 = revenue − direct COGS; CM2 = CM1 − variable fulfillment/support; CM3 = CM2 − variable marketing | Marketplaces and consumer commerce, imported into subscription | The numbering is company-specific — always ask what each level contains |
| Segment contribution margin | Same math, run by customer segment, channel, or geography | Deciding where to add or cut spend | The highest-value version operationally |
| Steady-state contribution margin | Contribution margin excluding acquisition spend on *new* customers | Answering "what would margin be if we stopped growing" | The single most useful number for a burning consumer subscription business |

**Practitioners disagree** substantially on what counts as variable S&M. Paid media is unambiguously variable. Sales commissions are variable. Quota-carrying rep base salary is variable over a 12-month horizon and fixed over a quarter. Brand and content marketing are treated as fixed by most and as variable by no one credible. There is no standard; the discipline is to write the definition down once and never change it, because changing it retroactively is how a deteriorating business appears to improve.

### The arithmetic — why steady-state contribution margin is the number

A consumer subscription app, one year:

| Line | $M | % of revenue |
|---|---|---|
| Revenue | 100.0 | 100% |
| COGS (hosting, payment processing, store fees, support) | (28.0) | (28%) |
| Gross profit | 72.0 | 72% |
| Variable marketing — retention/reactivation of existing users | (6.0) | (6%) |
| Variable marketing — new user acquisition | (40.0) | (40%) |
| Variable sales/partnership commissions | (4.0) | (4%) |
| **Contribution margin** | **22.0** | **22%** |
| **Steady-state contribution margin** (excl. new-user acquisition) | **62.0** | **62%** |
| Fixed opex (R&D, G&A, brand, fixed S&M) | (55.0) | (55%) |
| Operating income | (33.0) | (33%) |

The company loses $33M. But it would generate roughly $7M of operating income if it stopped acquiring new users — the acquisition spend is a growth investment, not a structural loss. That distinction is the entire argument in a board meeting about whether to cut marketing, and neither gross margin nor operating margin can make it. **Caveat that matters:** this only holds if the retained base is genuinely stable. Run it against the actual retention curve; if the base decays 30% a year, "steady state" is a slope, not a state.

**inputs:** GL with variable/fixed cost tagging (which almost no chart of accounts has by default — this is a finance project, not a report); ad platform spend by campaign objective, split acquisition vs retargeting/reactivation (Meta, Google, TikTok, Apple Search Ads); commission accruals from the comp plan; cohort revenue from the billing system (RevenueCat, Stripe, Chargebee).

**application:** Contribution margin is what tells a board whether a burning business is burning on *growth* or burning on *structure*. Those require opposite responses: the first is a capital-allocation decision, the second is a restructuring. It is also the correct basis for the "should we cut marketing to extend runway" conversation, because it quantifies exactly how much profit appears and how much growth disappears.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Company-level contribution margin, B2B SaaS | **NO SOURCED BENCHMARK FOUND.** No major SaaS benchmarking publisher (SaaS Capital, Benchmarkit, ICONIQ, KeyBanc) reports company-level contribution margin, because the variable/fixed split is not standardized enough to survey. | — | — | — |
| Consumer subscription contribution margin | **NO SOURCED BENCHMARK FOUND** in this pass | — | — | — |
| Nearest sourced proxies | Gross margin 77% blended / 81% subscription (Benchmarkit 2025); S&M 37% of revenue median (Benchmarkit 2025) → implies a rough gross-profit-after-S&M of ~40% for the median B2B SaaS company | Post-ZIRP | Derived from Benchmarkit 2025 | [S] — derived |

Anyone quoting a "typical contribution margin" for SaaS is quoting their own definition, not a benchmark. Say so.

### traps

- **Definition drift.** Reclassifying a cost from variable to fixed improves contribution margin without changing anything. This is the most common quiet manipulation, and it usually happens during a bad quarter.
- **Confusing it with gross margin.** Contribution margin is always lower. If someone's contribution margin equals gross margin, they excluded variable S&M.
- **Confusing company-level with cohort-level.** "Our contribution margin is 65%" usually means CM on a mature cohort, which says nothing about the company's P&L.
- **Rep base salary treated as fixed.** In a company doing quarterly headcount decisions, it is not.
- **Steady-state margin computed against a decaying base.** Requires a real retention curve, not an assumption.
- **Retargeting counted as acquisition.** Spend that reaches existing users is retention spend; counting it as acquisition inflates CAC and deflates the steady-state number.
- **Applying it where there is no meaningful variable cost.** For pure enterprise SaaS with 85% gross margin and field sales, contribution margin adds little that gross-profit-minus-S&M does not.

**related:** gross margin (§9), S&M % of revenue (§13), total marketing % of revenue (§16), LTV:CAC and CAC payback (other sections). Confused with gross margin, and with unit-level contribution margin.

---
## 11. EBITDA and adjusted EBITDA

**applies_to:** both

**definition:** EBITDA is operating profit before interest, taxes, depreciation and amortization — a proxy for operating cash generation. Adjusted EBITDA is EBITDA plus whatever else management has decided is not representative of the business.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| EBITDA (top-down) | Revenue − COGS − opex + D&A | The clean build | |
| EBITDA (bottom-up) | Net income + interest + taxes + D&A | Ties to the income statement | Reconcile both; they should agree |
| EBITDA excluding SBC | EBITDA + stock-based compensation | The de facto software standard | SBC is a real cost of ownership; excluding it is convention, not truth |
| Adjusted EBITDA | EBITDA + SBC + non-recurring items + other management add-backs | Sponsor and LBO contexts | The definition is whatever the credit agreement says |
| Run-rate / pro-forma adjusted EBITDA | Adjusted EBITDA + "annualized" benefit of actions already taken (a completed RIF, a signed price increase) | Debt sizing | The most aggressive legitimate variant; verify each action actually closed |
| Cash EBITDA | Adjusted EBITDA − change in deferred revenue | When you want to strip the prepay float | Rare; useful when a business is decelerating |
| EBITDA including capitalized software as an expense | EBITDA − capitalized software costs | Comparing companies with different capitalization policies | The correct adjustment when benchmarking, and almost never done |

**Practitioners disagree sharply** on SBC. GAAP treats it as an expense; nearly every software company's non-GAAP reporting adds it back; public-market investors increasingly refuse the add-back because dilution is real and permanent. There is no resolution. The practical rule: for internal cash management, add it back; for valuation and for any dilution-aware conversation, do not.

### The add-back ladder — what actually gets added back, ranked by defensibility

| Add-back | Typical size | Defensible? | What to check |
|---|---|---|---|
| Depreciation & amortization | 2–5% of revenue | Yes, by definition | Whether amortization of capitalized software is doing work that is really R&D |
| Interest and taxes | Varies | Yes, by definition | |
| Stock-based compensation | 8–20% of revenue in software | Conventional, not obviously correct | The dilution rate. 15% of revenue in SBC at a 4x multiple is ~4% annual dilution. |
| Non-cash lease / ASC 842 items | 1–2% | Usually | |
| Severance / restructuring | 1–5% in a cut year | Only if genuinely one-time | Three consecutive years of "one-time" restructuring is a cost structure |
| M&A and financing transaction costs | Lumpy | Usually | Only if the company is not a serial acquirer |
| Legal settlement | Lumpy | Sometimes | Recurring litigation is a cost of the business model |
| Capitalized software | 3–10% of revenue | **No, but universally ignored** | Cash out the door; the biggest quiet gap between EBITDA and reality in software |
| "Growth investments" / "pre-revenue product spend" | Any | **No** | Pure narrative |
| Founder compensation normalization | Varies | Only in a sale process, with a market-rate replacement assumption | |
| "Run-rate synergies" | Any | **No, until realized** | The classic LBO fiction |

A useful board discipline: require a bridge from GAAP operating income to adjusted EBITDA with every line named and sized, every quarter, in the same format. Add-backs are individually arguable and collectively diagnostic. If the bridge has grown from three lines to nine over two years, that is the finding.

**inputs:** GL / close package (NetSuite, Intacct); the SBC schedule from the cap table system (Carta); the capitalized-software schedule; the credit agreement if there is debt, because it defines adjusted EBITDA contractually and that definition may differ from the board deck's.

**application:** EBITDA is the margin base most private-company benchmarking uses (including the Rule of 40 surveys), the base for most debt covenants, and the base for most PE valuation. For a growth-stage board, its main honest use is as a stable, comparable margin line; its main dishonest use is as a place to park costs that are actually recurring.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Implied median EBITDA margin, private B2B SaaS + AI-native, FY2025 | Rule of 40 median 25 less median growth ~20 → implied EBITDA margin ≈ **+5%** | Post-ZIRP | Derived from Aleph × Benchmarkit, pub. 2026-06-01 (n=110 for Rule of 40, 342 total) | [S] — derived, publisher does not state median EBITDA margin directly |
| Implied top-quartile | Rule of 40 top quartile 43 | Post-ZIRP | Aleph × Benchmarkit, pub. 2026-06-01 | [P] |
| Direction of travel | R&D fell from 35% → 27% of revenue and S&M 37% → 35% in FY2025; nearly all Rule of 40 improvement came from the margin side | Post-ZIRP efficiency push | Aleph × Benchmarkit, pub. 2026-06-01 | [P] |
| Profitability incidence, private B2B SaaS | 83% of bootstrapped and 52% of equity-backed are breakeven or profitable | Post-ZIRP | SaaS Capital, survey March 2026, n>1,000, pub. 2026-06-10 | [P] |
| Standalone median EBITDA margin by ARR band | **NO SOURCED BENCHMARK FOUND** in this pass | — | — | — |

**Regime flag:** the swing from a median EBITDA margin around break-even (implied +5%) is genuinely new. In 2021 the median venture-backed SaaS company was deeply EBITDA-negative and that was rewarded. Any benchmark showing negative EBITDA as normal should be dated before you use it.

### traps

- **Add-back creep.** Track the count and total of add-backs over time, not just the resulting number.
- **SBC ambiguity.** "Adjusted EBITDA" that silently includes the SBC add-back, compared against a peer's that does not, is a 10–20 point error.
- **Capitalized software.** Two identical companies, one capitalizing 40% of engineering, show materially different EBITDA and R&D-percent-of-revenue. Always ask the capitalization rate before comparing.
- **Deferred revenue.** EBITDA is a P&L construct; it does not see the prepay float, which is why a company can be EBITDA-negative and cash-positive (or the reverse when growth stops).
- **Covenant EBITDA vs board EBITDA.** If they differ, the covenant one is the one that can trigger a default. Know both.
- **Using EBITDA in a capex-heavy or GPU-heavy business.** Excluding D&A in a business whose whole cost structure is depreciating hardware is a category error. Use FCF.
- **EBITDA as a cash proxy at a growing company.** It ignores working capital, capex, and the cash cost of building the receivable.

**related:** the margin base in most Rule of 40 formulations (§1); reconciles to FCF (§12) via working capital and capex; confused with operating income, net income, and cash flow, all of which it is not.

---

## 12. Free cash flow and FCF margin

**applies_to:** both

**definition:** The cash a business generates after paying for everything required to keep operating and to maintain its asset base — the only profit measure that cannot be produced by an accounting policy.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| Unlevered FCF | Cash from operations + after-tax interest expense − capex | Valuation / DCF | Removes capital structure |
| Levered FCF (the common one) | Cash from operations − capex | Board and public reporting | What "FCF" means unqualified in software |
| FCF including capitalized software | CFO − capex − capitalized software development | The honest software version | Many companies report capitalized software inside investing and quietly exclude it |
| FCF excluding SBC | CFO (which already adds back SBC) − capex | The standard | Note SBC is *inside* the standard number as a positive; FCF is not SBC-neutral |
| Adjusted / non-GAAP FCF | FCF + one-time cash items (litigation payment, restructuring cash cost, an office build-out) | Management reporting | Same add-back discipline as §11 |
| FCF margin | FCF ÷ revenue | Comparability | The Rule of 40 margin base preferred by late-stage investors |
| NTM FCF margin | Forward-12-month FCF ÷ forward-12-month revenue | Public comps and valuation | Meritech's Rule of 40 uses NTM revenue growth + NTM FCF margin |
| FCF conversion | FCF ÷ EBITDA | How much reported profit becomes cash | <70% persistently signals a working-capital or capex problem |

**Practitioners disagree** on whether capitalized software should be deducted. Under GAAP it sits in investing activities and is therefore *inside* capex for most reporting, but some companies present "FCF before capitalized software." Deduct it. It is cash paid to engineers.

### The arithmetic — FCF vs EBITDA at three growth rates

Same $100M-revenue company, same cost structure, three growth scenarios. Deferred revenue balance is roughly 36% of revenue (annual prepay, billed in advance).

| | Growing 40% | Growing 10% | Declining 10% |
|---|---|---|---|
| Adjusted EBITDA | (1.0) | (1.0) | (1.0) |
| Δ deferred revenue | +14.4 | +3.6 | (3.6) |
| Δ AR (drag, grows with revenue) | (5.0) | (1.3) | +1.3 |
| Other working capital | (1.0) | (0.5) | 0.0 |
| Capex + capitalized software | (4.0) | (4.0) | (4.0) |
| **Free cash flow** | **+3.4** | **(3.2)** | **(7.3)** |
| **FCF margin** | **+3.4%** | **(3.2%)** | **(7.3%)** |

Identical EBITDA, an 11-point swing in FCF margin, driven entirely by the direction of growth. Two consequences a board should internalize:

1. **A high-growth prepay business has structurally flattering FCF.** It is collecting a year of cash for service it has not delivered. That is a real, useful, interest-free financing source, and it is not profit.
2. **Deceleration hits FCF before it hits the P&L, and hits it harder.** The deferred-revenue float unwinds. A company that plans runway off an FCF trend built during growth will be surprised by the magnitude, not just the direction.

This is also the specific reason an FCF-based Rule of 40 is the most flattering base for the fastest-growing companies and the most punishing for decelerating ones — which is arguably the correct behavior, and is worth saying out loud when someone objects to the base.

**inputs:** the statement of cash flows from the close (not a BI tool); capex and capitalized software schedules; the deferred revenue rollforward; DSO/AR aging. For a private company, insist that FCF ties to the change in the bank balance excluding financing. If it does not tie, the model is wrong.

**application:** FCF is what actually funds the company and what determines whether the next round is optional. Boards read FCF margin as the credibility test on an EBITDA story: persistent EBITDA-positive/FCF-negative means working capital or capex is eating the profit, and that gap is where problems hide. It is also increasingly the margin base in the Rule of 40 conversation with late-stage and crossover investors.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Public software Rule of 40 definition | NTM revenue growth + NTM FCF margin | Current | Meritech Capital, Software Pulse, data as of 2026-05-01 | [P] |
| Public software valuation context | Median NTM revenue multiple **3.3x**; median implied ARR multiple **3.7x**; top-10 median implied ARR multiple **19.2x** | Post-ZIRP | Meritech Software Pulse, as of 2026-05-01 | [P] |
| Growth vs profitability weighting in public multiples | The market rewards growth roughly **3.1x** more heavily than an equivalent point of profitability | Post-ZIRP | Meritech Software Pulse, as of 2026-05-01 | [P] |
| Public software growth distribution | "Only a few companies growing by more than 30% year-over-year" | Post-ZIRP | Meritech Software Pulse, as of 2026-05-01 | [P] |
| Median public SaaS FCF margin, exact figure | **NO SOURCED BENCHMARK FOUND** — Meritech's public pulse notes FCF margin rising post-ZIRP without publishing the median on the free page. Pull the Meritech comps table directly for the current figure. | Post-ZIRP | — | — |
| Circulating claim: FCF-basis Rule of 40 passers trade at 4.8x EV/Rev vs 2.7x for failers (74% premium) | Unverified | — | Appears in 2026 aggregator content; **I could not trace it to a primary publisher.** Do not cite. | [W] |

**Regime flag:** a median NTM revenue multiple of 3.3x is the whole regime story in one number. Growth-only narratives were financeable at 2021 multiples and are not at 3.3x. At the same time Meritech's own analysis says growth is still weighted ~3.1x profitability, so "profitability at any cost" over-corrects. See §18.

### traps

- **Deferred-revenue float mistaken for profitability.** The central FCF trap in subscription software.
- **Capitalized software excluded.** Check whether "FCF" deducts it.
- **A single strong collections quarter.** Pulling a January renewal into December makes Q4 FCF and ruins Q1's. Look at trailing twelve months.
- **Working capital games.** Stretching payables at year-end improves FCF and nothing else.
- **FCF positive on a shrinking base.** Cutting S&M to zero makes FCF beautiful for about three quarters. FCF margin must always be read next to the growth rate — which is exactly what Rule of 40 is for.
- **Ignoring SBC.** Standard FCF adds SBC back. A company at 5% FCF margin with 18% of revenue in SBC is not generating 5% of shareholder value per year.
- **Comparing an AI-native company's FCF to a classic SaaS company's.** GPU capex and prepaid compute commitments hit FCF and not EBITDA. That gap is real and structural, not a timing artifact.
- **FCF conversion below 70% ignored.** If EBITDA is not becoming cash, one of AR, deferred revenue, or capex is the reason. Name it.

**related:** the strictest Rule of 40 margin base (§1); reconciles from EBITDA (§11); the inverse of net burn (§5); determines runway (§6).

---
## 13–16. Operating expense ratios (S&M, R&D, G&A, total marketing) — shared preamble

These four are one system, not four metrics. They are read together, they sum against gross margin to produce operating margin, and they share the same failure modes. Read this preamble once, then the four metric entries.

### The denominator problem

The single biggest source of error is the denominator. There are three in common use and they are not interchangeable:

| Denominator | What it is | Effect | Who uses it |
|---|---|---|---|
| GAAP revenue (trailing period) | Recognized revenue for the period | The accounting-correct base | Benchmarkit, public comps, KeyBanc |
| ARR (point-in-time, current) | Ending ARR | Deflates every ratio at a growing company, because ARR > period revenue | SaaS Capital, many private boards |
| Forward / NTM revenue | Next twelve months | Deflates ratios most; makes spend look efficient | Management plans |

At a company growing 40%, ending ARR is roughly 17–20% higher than trailing recognized revenue. A 30%-of-revenue S&M line becomes ~25% "of ARR" with zero change in behavior. **When you compare two companies' opex ratios, confirm the denominator first or the comparison is noise.**

### The sample-bias problem — a live example worth memorizing

Two credible primary sources, published within a year of each other, report S&M spend for "private B2B SaaS":

| Source | S&M figure | Sample |
|---|---|---|
| SaaS Capital, survey March 2026, n>1,000, pub. 2026-06-10 | Sales **15%** + Marketing **8%** = **23% of ARR** (Customer Support/Success reported separately at **9%**) | Skews smaller and bootstrapped; 83% of bootstrapped respondents are breakeven or profitable |
| Benchmarkit, 2025 SaaS Performance Metrics | **S&M 37% of revenue** median (VC-backed **47%**, PE-backed **33%**) | Skews larger and institutionally funded |

Both are correct for their populations. The gap is roughly 14 points — larger than almost any operating decision you would make. Neither is "the SaaS benchmark." **Pick the source whose sample matches the company, and name it.** This is the most common way benchmark data misleads a board: not fabrication, sample mismatch.

### The composition problem

"S&M as % of revenue" tells you nothing about efficiency on its own. A company at 50% S&M growing 60% with 12-month payback is healthy. A company at 25% S&M growing 8% is not. Opex ratios are *inputs* to efficiency metrics (CAC payback, magic number, burn multiple — other sections), not substitutes for them. Their honest use at board level is structural: is this company's cost shape normal for its stage, and where did the money move year over year.

---

## 13. S&M as a percent of revenue

**applies_to:** both (in consumer, read alongside §16, since consumer S&M is mostly paid media)

**definition:** Total sales and marketing operating expense divided by revenue for the same period.

### formula_variants

| Variant | Formula | When it is right |
|---|---|---|
| S&M ÷ GAAP revenue | Total S&M opex ÷ period revenue | Public comps, cross-company benchmarking |
| S&M ÷ ARR | Total S&M opex ÷ ending ARR | Private boards; deflates the ratio at high growth |
| Sales and marketing reported separately | Sales ÷ revenue; marketing ÷ revenue | Diagnosing whether the problem is pipeline or conversion |
| S&M excluding customer success | Removes CS/renewals headcount | The purist acquisition view |
| S&M including CS | Adds it back | Defensible when CS carries an expansion quota |
| Growth-adjusted S&M | S&M ÷ net new ARR | This is the CAC ratio / magic number family (other sections) |
| New-business S&M only | Spend attributable to new logos ÷ new-logo ARR | The version that actually informs acquisition decisions; requires allocation |

**Practitioners disagree** on customer success placement. If CS carries a quota, it is S&M; if it is purely retention support, it is COGS. Companies move it in whichever direction improves the metric they are being judged on that year. Lock it.

**inputs:** GL opex by department (NetSuite/Intacct), headcount and fully-loaded cost by function (HRIS — Rippling, Gusto, Workday), ad platform spend (Meta, Google, LinkedIn, TikTok, Apple Search Ads), events and agency spend from AP, commission accruals from the comp plan.

**application:** Boards read S&M-percent as the answer to "how expensive is this company's growth, structurally." The decision it drives is whether a growth plan is fundable: an S&M ratio that has to rise to hold the growth rate is the signal that the acquisition motion is saturating, and it shows up in this ratio a quarter or two before it shows up in CAC payback.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Private B2B SaaS, median | **S&M 37% of revenue** | Post-ZIRP | Benchmarkit, 2025 SaaS Performance Metrics | [P] |
| VC-backed | **47%** | Post-ZIRP | Benchmarkit, 2025 | [P] |
| PE-backed | **33%** | Post-ZIRP | Benchmarkit, 2025 | [P] |
| FY2025 movement | S&M fell **37% → 35%** of revenue | Post-ZIRP efficiency push | Aleph × Benchmarkit, pub. 2026-06-01 | [P] |
| Private B2B SaaS (SaaS Capital sample), as % of ARR | Sales **15%**, Marketing **8%** (Sales +2pp YoY, Marketing flat) | Post-ZIRP | SaaS Capital 2026, survey March 2026, n>1,000, pub. 2026-06-10 | [P] |
| $3M–$5M ARR band (SaaS Capital) | Sales **12%**, Marketing **8%** of ARR | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |
| Equity-backed vs bootstrapped (SaaS Capital) | Equity-backed spend **70% more on sales** and **100% more on marketing** | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |

**Regime flag:** the 2021 norm of 50%+ S&M for venture-backed SaaS is gone as a *median* — the VC-backed median is 47% and the population median is 37% and falling. But note the asymmetry in what fell: in FY2025, S&M fell only 2 points while R&D fell 8. Companies protected go-to-market and cut product. That is a very specific strategic choice and worth naming when a board celebrates the efficiency gain.

### traps

- **Denominator (ARR vs revenue).** See preamble. Worth 5–8 points at growth-stage.
- **CS classification.** Worth 5–10 points.
- **Ratio falling for the wrong reason.** S&M-percent falls when revenue grows faster than spend (good) or when a company stops investing (bad). Look at absolute S&M dollars and net new ARR together.
- **Capitalized commissions (ASC 606).** Amortizing commissions over the customer life smooths S&M and understates current-period cash spend. Compare the cash number for CAC work.
- **Brand/awareness spend buried in S&M with no attribution.** Fine as an investment; not fine when it silently inflates a CAC calculation.
- **Comparing across GTM motions.** PLG, inside sales, field sales, and channel have structurally different S&M ratios. A 20% ratio in field-sales enterprise means undersaturation; in PLG it may mean saturation.
- **Benchmarking against the wrong sample.** The 14-point SaaS Capital / Benchmarkit gap above.

**related:** feeds CAC, CAC payback, magic number, burn multiple (other sections); total marketing spend (§16) is a subset; contribution margin (§10) subtracts the variable portion.

---

## 14. R&D as a percent of revenue

**applies_to:** both

**definition:** Total research and development operating expense divided by revenue for the same period.

### formula_variants

| Variant | Formula | When it is right |
|---|---|---|
| R&D ÷ revenue (GAAP) | Reported R&D opex ÷ revenue | Standard |
| R&D ÷ ARR | R&D opex ÷ ending ARR | Private-board convention |
| R&D including capitalized software | (R&D opex + capitalized software costs) ÷ revenue | **The only version that is comparable across companies.** Use it. |
| R&D excluding AI training and dev inference | Strips model-building cost | Isolating classic product engineering in an AI company |
| R&D including AI training and dev inference | The correct GAAP-side treatment (these are R&D, not COGS) | Standard; see §9 |
| Product + engineering + design combined | Some companies split design into G&A or S&M | Confirm what is in the bucket |

**Practitioners disagree** on capitalization, which is the whole game here. A company capitalizing 40% of engineering payroll can report R&D at 16% of revenue while a peer with identical engineering spend reports 27%. Always ask for the capitalization rate.

**inputs:** GL opex by department; the capitalized-software schedule; engineering headcount and fully-loaded cost (HRIS); model-provider invoices split prod vs dev by API key; cloud spend tagged by environment.

**application:** Boards read R&D-percent as the investment rate in future product. Its most important current use is as the counterweight to an efficiency narrative: R&D is the easiest line to cut without an immediate revenue consequence, which is exactly why cutting it is the most common way to manufacture a Rule of 40 improvement. The consequence shows up 4–8 quarters later in growth persistence (§4).

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Private B2B SaaS, median | **R&D 34% of revenue** | Post-ZIRP | Benchmarkit, 2025 SaaS Performance Metrics | [P] |
| FY2025 movement | R&D fell **35% → 27%** of revenue, an 8-point cut in a single year | Post-ZIRP efficiency push | Aleph × Benchmarkit, pub. 2026-06-01 | [P] |
| Private B2B SaaS (SaaS Capital sample), as % of ARR | **22%**, flat YoY | Post-ZIRP | SaaS Capital 2026, survey March 2026, n>1,000, pub. 2026-06-10 | [P] |
| $3M–$5M ARR band (SaaS Capital) | **24%** of ARR | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |
| Equity-backed vs bootstrapped (SaaS Capital) | Equity-backed spend **56% more on R&D** | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |
| Adjacent: internal AI tooling spend | **11%** of revenue (2025), **16%** projected 2026, **19%** projected 2027 at AI-building software companies | Current AI regime | ICONIQ, "State of AI: The Builder's Economy," ~300 execs, pub. July 2026 | [P] |

**Regime flag — this is the most important single finding in this section.** The FY2025 Rule of 40 improvement (15 → 25) was driven mostly by an 8-point cut in R&D. That is not an efficiency gain; it is a deferred cost. A board that reads a rising Rule of 40 without reading the R&D line is reading a number that will reverse. Also note the tension with the ICONIQ data: R&D spend is falling as a share of revenue at the same time that internal AI tooling spend is rising toward 19% of revenue. Those two lines are pulling in opposite directions and the net is not yet visible in any published benchmark.

### traps

- **Capitalization.** The dominant trap. Two identical companies can differ by 10+ points.
- **The cut that does not hurt yet.** R&D cuts produce immediate margin and delayed growth damage. Always pair the R&D line with growth persistence.
- **Contractors and offshore vendors misclassified.** Frequently sit in COGS or G&A.
- **AI dev/test inference booked to COGS.** Understates R&D and understates gross margin. The reverse of the §9 trap and equally common.
- **Comparing an AI-native company to classic SaaS.** Model training in R&D plus internal AI tooling means the R&D line covers structurally different work.
- **R&D-percent falling purely from revenue growth.** At 40% growth, a flat-headcount engineering org shows a falling ratio and zero change in investment.
- **Benchmarking a platform company against an application company.** Infrastructure businesses carry structurally higher R&D.

**related:** feeds EBITDA (§11) and Rule of 40 (§1); trades directly against growth persistence (§4); interacts with gross margin (§9) through capitalization and through the inference-classification boundary.

---

## 15. G&A as a percent of revenue

**applies_to:** both

**definition:** Total general and administrative operating expense — finance, legal, HR, executive, facilities, corporate IT, insurance, audit — divided by revenue.

### formula_variants

| Variant | Formula | When it is right |
|---|---|---|
| G&A ÷ revenue | Reported G&A opex ÷ revenue | Standard |
| G&A ÷ ARR | G&A opex ÷ ending ARR | Private-board convention |
| G&A excluding public-company costs | Strips D&O insurance, SOX, audit, IR | Comparing a private company to a public comp |
| G&A excluding one-time transaction/legal costs | Strips M&A, financing, litigation | Same discipline as §11 add-backs |
| G&A including or excluding facilities | Some companies split facilities across functions | Confirm; worth 1–3 points |
| Cash G&A | Excludes executive SBC, which concentrates here | Cash management |

**Practitioners disagree** on where the CEO, corporate IT, and facilities sit, and on whether recruiting is G&A or allocated to the hiring function. These choices are worth several points.

**inputs:** GL opex by department; headcount by function (HRIS); the professional-services AP detail (audit, legal, tax); insurance schedule; lease schedule; executive SBC from the cap table system.

**application:** G&A is the purest operating-leverage line — it should decline steadily as a percentage of revenue and it is the first place a board looks for structural inefficiency, because unlike R&D and S&M there is no growth story attached to it. Rising G&A-percent at scale is almost always a finding: an acquisition being integrated badly, a legal overhang, an over-built executive team, or premature public-company readiness spend.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Private B2B SaaS, median | **G&A 24% of revenue** | Post-ZIRP | Benchmarkit, 2025 SaaS Performance Metrics | [P] |
| Private B2B SaaS (SaaS Capital sample), as % of ARR | **15%**, up 1pp YoY | Post-ZIRP | SaaS Capital 2026, survey March 2026, n>1,000, pub. 2026-06-10 | [P] |
| $3M–$5M ARR band (SaaS Capital) | **15%** of ARR | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |
| Equity-backed vs bootstrapped (SaaS Capital) | Equity-backed spend **64% more on G&A** | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |
| FY2025 movement (Rule of 40 cohort) | G&A cuts contributed materially to margin improvement alongside R&D | Post-ZIRP | Aleph × Benchmarkit, pub. 2026-06-01 | [S] |
| G&A by ARR band (declining curve) | **NO SOURCED BENCHMARK FOUND** for a full band-by-band curve in this pass | — | — | — |

Note the 9-point gap between the two sources (24% of revenue vs 15% of ARR) — same denominator and sample-mix issue as §13.

### traps

- **G&A as the dumping ground.** Anything unallocated lands here, so a high G&A number is often an allocation problem rather than a spending problem. Check what is in it before cutting.
- **Rising at scale.** Should fall. If it is rising past $20M ARR, find the reason before accepting it.
- **Public-company readiness spend.** SOX, audit, D&O, and IR can add 2–4 points and are not comparable to a private peer.
- **Executive SBC.** Concentrates in G&A; adjusted-EBITDA presentations remove it and make G&A look lean.
- **Recruiting costs.** Large in a hiring year, and where they sit changes both G&A and the function's ratio.
- **The easiest place to manufacture a Rule of 40 point.** Cheaper politically than cutting R&D or S&M, and it works — for one year.
- **Facilities in a distributed company.** A remote company's G&A is structurally 2–3 points lower. Not a management achievement.

**related:** feeds EBITDA (§11) and Rule of 40 (§1); a component of the fixed-cost base in contribution margin (§10); inversely related to ARR per employee (§17).

---

## 16. Total marketing spend as a percent of revenue

**applies_to:** both (the primary go-to-market efficiency line in consumer; a subset of S&M in B2B)

**definition:** All marketing expense — paid media, marketing headcount, content, events, agencies, tools — divided by revenue, separated from sales expense.

### formula_variants

| Variant | Formula | When it is right |
|---|---|---|
| Total marketing ÷ revenue | All marketing opex ÷ revenue | The full-cost view |
| Paid media only ÷ revenue | Working media spend ÷ revenue | Consumer subscription; the number that scales with growth |
| Working vs non-working split | Media ÷ revenue and (people + agency + tools) ÷ revenue | Diagnosing whether spend is buying reach or overhead |
| Marketing ÷ ARR | Marketing opex ÷ ending ARR | Private B2B convention (this is SaaS Capital's basis) |
| Marketing ÷ new ARR | Marketing opex ÷ net new ARR | Efficiency, not size; overlaps with magic number family |
| Marketing ÷ gross profit | Marketing opex ÷ gross profit | Better for low-gross-margin businesses (AI-native, consumer with store fees) where revenue overstates capacity to spend |
| Blended vs paid-only CAC basis | Whether organic/viral acquisition is in the denominator | Consumer; changes the answer enormously |

**Practitioners disagree** on whether brand and content are marketing expense or investment, and whether marketing-attributable headcount in demand gen belongs with media in an efficiency ratio. In consumer, the working/non-working split is the more useful frame than the total.

**inputs:** ad platforms (Meta Ads Manager, Google Ads, TikTok, Apple Search Ads, Reddit); MMP or attribution layer for consumer (AppsFlyer, Adjust, Branch, or SKAdNetwork/AEM aggregates); agency and tooling AP; marketing headcount from HRIS; revenue from billing (Stripe/RevenueCat/App Store Connect — note gross vs net-of-commission).

**application:** In consumer subscription, this is effectively the growth throttle: paid media as a percent of revenue is the dial a board turns to trade growth for cash. In B2B it is the diagnostic under the S&M number — a company where marketing is 8% and sales is 15% has a fundamentally different motion from one where marketing is 18% and sales is 5%, and the two require different fixes when growth stalls.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Private B2B SaaS, marketing as % of ARR | **8%**, flat YoY | Post-ZIRP | SaaS Capital 2026, survey March 2026, n>1,000, pub. 2026-06-10 | [P] |
| $3M–$5M ARR band | **8%** of ARR | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |
| Equity-backed vs bootstrapped | Equity-backed spend **100% more on marketing** (i.e. roughly 2x the ratio) | Post-ZIRP | SaaS Capital 2026, pub. 2026-06-10 | [P] |
| Implied marketing share of S&M | Marketing 8% vs Sales 15% → marketing is roughly **35%** of combined S&M in this sample | Post-ZIRP | Derived from SaaS Capital 2026 | [S] — derived |
| Consumer subscription app, marketing as % of revenue | **NO SOURCED BENCHMARK FOUND.** No credible published benchmark for consumer subscription paid-media-percent-of-revenue surfaced in this pass. Consumer app economics vary too widely by category (dating, fitness, finance, utility) for a single figure, and app-store commission treatment breaks comparability. | — | — | — |

**Regime flag:** marketing was the *only* major line in the SaaS Capital data that was flat year over year (sales +2pp, CS +1pp, G&A +1pp, R&D flat, marketing flat). Marketing has already absorbed its cut; it is not where the next efficiency point comes from in the median private B2B SaaS company.

### traps

- **Media-only vs fully loaded.** A "marketing is 6% of revenue" claim that excludes 14 marketing salaries is not a cost ratio.
- **Consumer revenue denominator.** Gross bookings vs net-of-store-commission changes the ratio by 15–30%. Say which.
- **Attribution inflation.** Post-ATT, platform-reported conversions overstate paid contribution, which makes paid marketing look more efficient than the P&L says. Reconcile platform-reported revenue to actual billing revenue at least quarterly.
- **Brand spend judged on a performance timeline.** Real, but do not let "brand" become the bucket where unmeasurable spend goes to avoid scrutiny.
- **Marketing-percent falling because revenue grew.** Same trap as §13 and §14. Look at absolute dollars.
- **Comparing PLG to sales-led.** PLG companies carry a high marketing ratio and a low sales ratio by design. The combined S&M number is the comparable one.
- **Retargeting counted as acquisition.** Inflates apparent acquisition efficiency and misstates contribution margin (§10).

**related:** subset of S&M (§13); the variable component of contribution margin (§10); the numerator of blended CAC and the input to CAC payback and magic number (other sections).

---
## 17. ARR per employee / revenue per employee

**applies_to:** both

**definition:** Recurring revenue divided by full-time-equivalent headcount — the simplest available measure of how much revenue the organization produces per person.

### formula_variants

| Variant | Formula | When it is right | Note |
|---|---|---|---|
| ARR per FTE | Current ARR ÷ current FTE count | Private SaaS standard | Point-in-time on both sides; volatile in a hiring or cutting quarter |
| Revenue per employee | Trailing-12-month revenue ÷ average FTE over the period | Public companies; accounting-consistent | The more defensible construction |
| ARR per FTE including contractors | Adds contractor FTE-equivalents | Comparability | Offshore contractor-heavy companies otherwise look 20–40% better |
| Gross profit per employee | Gross profit ÷ FTE | Low-gross-margin businesses (AI-native, services-mixed, consumer with store fees) | The better metric whenever gross margin varies across the comparison set |
| ARR per engineer / per quota-carrier | Function-level | Diagnosing where leverage is or is not | More actionable than the company-level number |
| Net new ARR per FTE | Net new ARR ÷ FTE | Efficiency of the current org rather than the accumulated base | Harsher and more honest at low growth |
| Fully-loaded-cost-adjusted | ARR ÷ total people cost | Removes geographic wage arbitrage from the comparison | Rarely done; the right adjustment for global teams |

**Practitioners disagree** on contractors and on whether to use ending or average headcount. Both choices are worth double-digit percentages. Gross profit per employee is the more rigorous metric and is gaining ground precisely because AI-native gross margins broke the comparability of the revenue version.

**inputs:** ARR from billing; FTE from HRIS (Rippling, Gusto, Workday, Deel) with a stated policy on contractors, part-time, and interns; revenue from the GL for the trailing-12 version.

**application:** Boards use it as the fastest read on organizational efficiency and as the frame for headcount planning: a hiring plan that lowers ARR per employee has to be justified by what it buys. Its current strategic relevance is AI-driven — the claim that AI tooling lets companies grow with smaller teams is testable here, and this is the metric that tests it. ICONIQ's data showing 33% of AI-building companies planning smaller teams and 45% expecting a different role mix is the leading indicator; ARR per employee is where it lands.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Private SaaS, all respondents | Median **$129,724** ARR per FTE (2025), up from **$125,000** in 2024 | Post-ZIRP | SaaS Capital, "Revenue Per Employee Benchmarks for Private SaaS," survey March 2025, n>1,000, pub. **2025-07-23** | [P] |
| $1M–$3M ARR | Median **$99,858** ARR per FTE | Post-ZIRP | SaaS Capital, pub. 2025-07-23 | [P] |
| $1M–$3M ARR, equity-backed | **$94,444** | Post-ZIRP | SaaS Capital, pub. 2025-07-23 | [P] |
| $1M–$3M ARR, bootstrapped | **$110,000** | Post-ZIRP | SaaS Capital, pub. 2025-07-23 | [P] |
| $50M–$100M ARR | **~$200,000** ARR per FTE | Post-ZIRP | Benchmarkit, 2025 SaaS Performance Metrics | [P] |
| >$100M ARR | **~$300,000** ARR per FTE | Post-ZIRP | Benchmarkit, 2025 SaaS Performance Metrics | [P] |
| $20M–$50M ARR | ~$181,905 median, ~$238,000 at the 75th percentile (2025) | Post-ZIRP | Circulating in aggregator content attributed to SaaS Capital; **I could not verify this specific band against SaaS Capital's own page.** Treat as unconfirmed. | [W] |
| Structural pattern | Bootstrapped companies show higher revenue per FTE at every ARR band, consistently across three years | Post-ZIRP | SaaS Capital, pub. 2025-07-23 | [P] |
| AI-era org signal | 78% of AI-building software companies rethinking workforce planning; 45% expect a different role mix; 33% plan smaller teams; 72% of high-revenue AI companies run four or fewer management layers | Current AI regime | ICONIQ, "State of AI: The Builder's Economy," ~300 execs, Q2 2026 survey, pub. July 2026 | [P] |

**Regime flag:** the "$200K per employee is the SaaS bar" heuristic is a scale-band figure, not a company-wide one. At $1M–$3M ARR the verified median is **under $100K**, which is half the number people quote. Applying a late-stage benchmark to an early-stage company is the most common misuse of this metric, and the correction is roughly 2x. Separately, if AI tooling really is producing leaner orgs, this series should inflect upward over the next two survey cycles — it has moved only from $125K to $130K so far, which is inflation, not a revolution. Be skeptical of AI-leverage claims until this number moves.

### traps

- **Wrong band.** The 2x early-vs-late spread above.
- **Contractors and offshore excluded.** Inflates the number without changing the cost structure.
- **Comparing gross-margin-different businesses.** $200K ARR per employee at 80% gross margin is $160K of gross profit per head; at 50% (AI-native) it is $100K. Use gross profit per employee across a mixed set.
- **The metric improves during layoffs.** Denominator falls immediately; numerator falls with a lag. ARR per employee looks best in the two quarters after a cut and before the churn arrives.
- **Services revenue in the numerator.** Services revenue requires people by definition and structurally lowers the ratio. Split it.
- **Optimizing it directly.** A company can maximize ARR per employee by refusing to invest. It is a diagnostic, not a target.
- **Ending vs average headcount.** In a year of 60% headcount growth this is a 20%+ difference.
- **Acquired revenue.** ARR arrives instantly, the acquired headcount arrives too, but integration cost does not show up here at all.

**related:** inversely related to all three opex ratios (§13–§15); feeds EBITDA (§11); the operational expression of capital efficiency (§8). Confused with profit per employee, which it is not.

---

## 18. The growth-versus-profitability frontier and how boards weigh the trade

**applies_to:** both

**definition:** The efficient frontier of achievable combinations of growth rate and margin for a given business, and the exchange rate — how many points of margin the market or the board will pay for one point of growth.

### formula_variants — the exchange rate, stated several ways

| Variant | Formula | Implied exchange rate | When it is right |
|---|---|---|---|
| Rule of 40 | Growth + margin | 1:1 | Default; assumes a point of growth equals a point of margin |
| Rule of X (a16z formulation) | (multiplier × growth) + margin, multiplier ≈ 2–3 | 2–3:1 in favor of growth | When the market is paying for growth; the argument against naive Rule of 40 |
| Empirically-fit weight | (w × growth) + margin, w fit to observed valuation data | Data-determined | The rigorous version; requires current comps |
| Rule of 40 with a growth floor | Rule of 40 ≥ 40 **and** growth ≥ some minimum | Refuses the substitution below a floor | Prevents the "shrink to 40" degenerate solution |
| Growth-adjusted efficiency | Net new ARR ÷ net burn (burn multiple, other section) | Not an exchange rate; a cost of growth | The operational complement |
| Durable growth framing | Growth × persistence, then + margin | Weights growth by whether it lasts | The most defensible frame; see §4 |

**Practitioners disagree** on the exchange rate, and it is genuinely regime-dependent rather than a matter of principle. In 2021 the market weight on growth was extreme; in 2022–2023 it briefly inverted toward profitability; the current published estimate is back to a strong growth tilt.

### The degenerate solutions — why the frontier framing matters

Rule of 40's 1:1 substitution permits two pathological strategies that no board should accept but many implicitly approve:

| Path | Move | Rule of 40 | What actually happened |
|---|---|---|---|
| A. Cut to the number | Growth 30% → 20%, margin −10% → +20% | 20 → 40 | Bought 30 margin points with 10 growth points. Looks like a win at 1:1. |
| B. Buy growth | Growth 20% → 35%, margin +20% → −15% | 40 → 20 | Rule of 40 says this destroyed value. At a 3:1 growth weight it created value. |

At Meritech's observed public-market weighting of roughly **3.1x**, Path A is value-destructive (gained 30 margin points, gave up 10 growth points worth ~31 margin-equivalents) and Path B is roughly neutral-to-positive. The Rule of 40 verdict is exactly backwards in both cases. This is the single strongest argument for never letting a board treat Rule of 40 as an objective function rather than a screen.

### What the board is actually deciding

Three questions, in order. Rule of 40 answers none of them by itself.

1. **Is the growth durable?** Growth persistence (§4) and NRR. A point of growth at 0.9 persistence is worth multiples of a point at 0.6. This is where the exchange rate really comes from.
2. **Is the marginal dollar productive?** Burn multiple and incremental CAC payback (other sections), not the aggregate opex ratios. The aggregate says what the company spends; the marginal says what the next dollar buys.
3. **Is the company financeable at this margin?** Runway (§6), cash conversion (§7), and the current multiple environment. A company that cannot raise has no access to the growth side of the frontier regardless of what the frontier says is optimal.

The correct board framing is not "growth or profit." It is: *what is the cheapest path to default-alive that preserves the option to re-accelerate.* Cuts that are reversible (paid media, contractor spend, discretionary programs) preserve that option. Cuts that are not (senior engineering, category-defining product bets, the enterprise sales motion in a market that consolidates) close it, and they close it while producing the *better-looking* Rule of 40, which is why they get approved.

**inputs:** everything above — growth (§2), persistence (§4), the margin bases (§11, §12), the opex structure (§13–§15), runway (§6), plus current comparable multiples (Meritech, public filings) to estimate the live exchange rate rather than assuming one.

**application:** This is the frame for the annual plan and for any mid-year re-forecast. Practically: build the plan at three growth/margin points on the frontier, show Rule of 40 on the same margin base for all three, show growth persistence and runway for all three, and make the board choose a point rather than approve a number.

### benchmark

| Segment | Figure | Regime | Source | Tag |
|---|---|---|---|---|
| Public-market exchange rate | Market rewards growth roughly **3.1x** more heavily than an equivalent point of profitability | Post-ZIRP, as of 2026-05-01 | Meritech Capital, Software Pulse, 2026-05-01 | [P] |
| Public software valuation level | Median NTM revenue multiple **3.3x**; median implied ARR multiple **3.7x**; top-10 median implied ARR multiple **19.2x** | Post-ZIRP | Meritech Software Pulse, 2026-05-01 | [P] |
| Public growth distribution | "Only a few companies growing by more than 30% year-over-year" | Post-ZIRP | Meritech Software Pulse, 2026-05-01 | [P] |
| Rule of 40 by growth cohort | >50% growers: median **57**; 31–50%: median **8**; <10%: median **19** | Post-ZIRP | Aleph × Benchmarkit, n=110, pub. 2026-06-01 | [P] |
| Rule of 40 by ARR band, medians | $1–5M: **33%**; $5–20M: **20%**; $20–50M: **24%**; >$50M: **30%** | Post-ZIRP (2025 data) | High Alpha, pub. 2026-01-16 (sample size not disclosed) | [S] |
| Rule of 40 by ARR band, upper quartile | $1–5M: **80%**; $5–20M: **35%**; $20–50M: **41%**; >$50M: **38%** | Post-ZIRP (2025 data) | High Alpha, pub. 2026-01-16 | [S] |
| Joint retention + efficiency effect | NRR >106% and CAC payback <10 months: median growth **71%**, median Rule of 40 **47%**. NRR <98% and payback >15 months: median growth **10%**, median Rule of 40 **5%** | Post-ZIRP | High Alpha, pub. 2026-01-16 | [S] |
| Rule of X multiplier (a16z framework) | Growth weighted 2–3x margin | Framework, popularized ~2023 | a16z "Rule of X" — **framework definition; I did not verify a16z's own page in this pass** | [W] |

**Regime flag — the whole section.** The 3.1x growth weight and the 3.3x median multiple are the current regime in two numbers, and they say something more nuanced than either camp wants: multiples are low (so growth-at-any-cost is unfinanceable) *and* growth is still weighted ~3x margin (so profitability-at-any-cost is over-corrected). A board operating on 2021 instincts over-funds growth; a board operating on 2023 instincts under-funds it. The High Alpha cohort data points the same way: the companies that win are not the ones that chose margin, they are the ones with high NRR and short payback, which get both (71% growth *and* a 47 Rule of 40).

Also note the U-shape in both cuts of the data — Rule of 40 is worst in the $5–20M band (20%) and worst in the 31–50% growth cohort (8). That is the same population viewed two ways: mid-stage companies paying full cost for a go-to-market machine that has not scaled yet. Holding a $12M-ARR company to a 40 is holding it to the top quartile of its band.

### traps

- **Treating Rule of 40 as the objective function.** Produces Path A above. The number improves and the company gets worse.
- **Assuming a 1:1 exchange rate when the market says 3:1.** Or assuming 3:1 when the market has moved. Re-estimate it; do not inherit it.
- **Cutting the irreversible things.** Reversibility, not size, should determine cut order.
- **Ignoring persistence.** A point of growth bought with discounting and poor-fit logos lowers persistence and is worth less than a point of retained growth. The exchange rate applies to *durable* growth.
- **Benchmarking against the wrong band.** $5–20M ARR companies score worst on Rule of 40 by a wide margin; judging one against a >$50M benchmark misreads the stage.
- **Using aggregate ratios to make marginal decisions.** "S&M is 40% of revenue, cut it to 32%" is a P&L instruction, not a strategy. The relevant question is which segments and channels have marginal payback under the threshold.
- **Assuming the frontier is fixed.** It moves with retention. Improving NRR shifts the entire frontier out — the High Alpha cohort split shows a 42-point Rule of 40 gap driven by retention and payback, not by a growth-vs-margin choice.
- **Board theater.** A single-number target invites a single-number answer. Require the growth/margin/persistence/runway tuple, not the sum.

**related:** synthesizes §1, §2, §4, §6, §11, §12, §13–§15; the strategic frame that burn multiple, magic number, LTV:CAC, CAC payback, and quick ratio (other sections) all feed into.

---

## Appendix A — cross-source reconciliation table

The same nominal metric, from the two most-cited private-SaaS sources. Use the one whose sample matches your company and say which.

| Metric | SaaS Capital (n>1,000, survey Mar 2026, pub. 2026-06-10, **% of ARR**, skews smaller/bootstrapped) | Benchmarkit / Aleph (n=342, FY2025 actuals, pub. 2026-06-01, **% of revenue**, skews VC/PE-backed) |
|---|---|---|
| Median growth | 22% (bootstrapped 20%, equity-backed 25%) | ~20% |
| Sales | 15% | — |
| Marketing | 8% | — |
| S&M combined | 23% | 37% (VC-backed 47%, PE-backed 33%); fell to 35% in FY2025 |
| Customer support/success | 9% (reported separately) | (inside S&M or COGS depending on company) |
| R&D | 22% | 34%; fell 35% → 27% in FY2025 |
| G&A | 15% | 24% |
| COGS components | Hosting 5%, DevOps 4%, pro-services 5%, other 3% (~17% total) | Implied ~23% (77% blended gross margin) |
| Gross margin | ~83% implied | 77% blended / 81% subscription / 30% professional services |
| Total spend | 96% of ARR bootstrapped, 101% equity-backed | — |
| Rule of 40 | — | Median 25, top quartile 43, bottom quartile 7 (EBITDA base) |
| Profitable or breakeven | 83% bootstrapped, 52% equity-backed | — |

The gaps are real and are explained by sample composition and denominator, not by either source being wrong.

## Appendix B — verification log

Figures I checked and could **not** confirm against a primary publisher, listed so they do not get recycled:

| Claim | Attributed to | Status |
|---|---|---|
| "Inference alone consumes ~23% of revenue at scaling-stage AI B2B companies"; "model inference rising 20% → 23% of total spend" | ICONIQ | **Not found** on ICONIQ's own report pages. ICONIQ publishes the direction (inference share rises as products scale) without these percentages publicly. Do not cite as ICONIQ. |
| "Rule of 40 passers on an FCF basis trade at 4.8x EV/Rev vs 2.7x for failers (74% premium)" | Various 2026 aggregators | **Not traced** to a primary publisher. Do not cite. |
| "$20M–$50M ARR: $181,905 median ARR/FTE, ~$238,000 at 75th pct" | SaaS Capital | **Not found** on SaaS Capital's own revenue-per-employee post, which publishes the overall median and the $1M–$3M band. Unconfirmed. |
| "Best-in-class growth persistence is 0.80–0.90" | Bessemer | **Not verified** against a primary Bessemer PDF in this pass. Directionally standard, numerically unconfirmed. |
| "18–24 months of runway is the norm" | Unattributed | **Folklore.** No named dataset found. Do not present as data. |
| "Rule of X: growth weighted 2–3x" | a16z | Framework is real; **a16z's own page not verified** in this pass. |
| Share of venture-backed SaaS that completes the full T2D3 path | Various | **No sourced figure exists** that I could find. Any percentage quoted for this should be assumed fabricated. |

## Appendix C — sources used

| Source | What it is | Date | Tag |
|---|---|---|---|
| SaaS Capital, 2026 Spending Benchmarks for Private B2B SaaS Companies — https://www.saas-capital.com/blog-posts/spending-benchmarks-for-private-b2b-saas-companies/ | 15th annual survey, n>1,000, completed March 2026 | pub. 2026-06-10 | [P] |
| SaaS Capital, Private B2B SaaS Growth Rate Benchmarks — https://www.saas-capital.com/research/private-saas-company-growth-rate-benchmarks/ | n>1,000 | 2026 | [P] |
| SaaS Capital, Revenue Per Employee Benchmarks — https://www.saas-capital.com/blog-posts/revenue-per-employee-benchmarks-for-private-saas-companies/ | Survey March 2025, n>1,000 | pub. 2025-07-23 | [P] |
| SaaS Capital, 2026 Benchmarking Metrics for Bootstrapped SaaS — https://www.saas-capital.com/blog-posts/benchmarking-metrics-for-bootstrapped-saas-companies/ | $3M–$20M ARR bootstrapped segment | pub. 2026-04-24 | [P] |
| Benchmarkit, 2025 SaaS Performance Metrics — https://www.benchmarkit.ai/2025benchmarks | Sample size not disclosed on the public page | 2025 | [P] |
| Aleph × Benchmarkit, 2026 SaaS & AI Performance Benchmarks (via https://www.getaleph.com/answers/rule-of-40-saas-2026) | 342 B2B SaaS/AI companies; Rule of 40 n=110; FY2025 actuals | pub. 2026-06-01 | [P] |
| ICONIQ, State of AI: The Builder's Economy — https://www.iconiq.com/growth/reports/state-of-ai-2026 | ~300 executives, Q2 2026 survey, 87% NA / 13% EU | pub. July 2026 | [P] |
| ICONIQ, State of AI: Bi-Annual Snapshot — https://www.iconiq.com/growth/reports/2026-state-of-ai-bi-annual-snapshot | ~300 executives, Q2 2025 + Q4 2025 waves | 2026 | [P] |
| Bessemer Venture Partners, Cash Conversion Score — https://www.bvp.com/atlas/cash-conversion-score | Jeff Epstein & Mary D'Onofrio | pub. 2019-11-27 | [P] — regime-dated |
| Meritech Capital, Software Pulse — https://meritech.substack.com/p/meritech-software-pulse-01-may-2026 | Public software index | data as of 2026-05-01 | [P] |
| High Alpha, Mastering the SaaS Tightrope — https://www.highalpha.com/blog/mastering-the-saas-tightrope-between-growth-efficiency-and-ai-costs-in-2026 | 2025 data; sample size not disclosed | pub. 2026-01-16 | [S] |
| The SaaS CFO, What Should Be Included in AI COGS — https://www.thesaascfo.com/what-should-be-included-in-ai-cogs/ | Practitioner framework, not a survey | pub. 2026-05-05 | [W] |
| Neeraj Agrawal / Battery Ventures, T2D3 | Framework definition | 2015 | [P] — as a definition |
