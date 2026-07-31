# Family 03 — Revenue and Revenue Quality

Reference corpus for a growth consultant working consumer subscription apps and B2B SaaS, sitting in board meetings.

**Scope note.** Quick ratio, burn multiple, magic number, CAC ratio, ARPU/ARPPU/ARPDAU, NRR/GRR, and bookings/ACV/TCV are covered in other files. This file covers the revenue-stock, revenue-quality, and revenue-recognition layer.

**Source tags:** `[P]` primary (SEC filing, publisher PDF, named benchmark report, standard-setter text) · `[S]` secondary (vendor blog citing its own dataset) · `[W]` weak (aggregator, undated, or unverifiable).

---

## Contents

1. [MRR](#1-mrr)
2. [ARR — committed vs annualized run-rate](#2-arr--committed-vs-annualized-run-rate)
3. [MRR/ARR movement decomposition (the waterfall)](#3-mrrarr-movement-decomposition-the-waterfall)
4. [Net New MRR / Net New ARR](#4-net-new-mrr--net-new-arr)
5. [Deferred revenue](#5-deferred-revenue)
6. [RPO and cRPO](#6-rpo-and-crpo)
7. [Backlog](#7-backlog)
8. [Billings (and calculated billings)](#8-billings-and-calculated-billings)
9. [Revenue concentration](#9-revenue-concentration)
10. [ARPA](#10-arpa)
11. [ARR per employee / revenue per employee](#11-arr-per-employee--revenue-per-employee)
12. [Recurring vs non-recurring vs services revenue mix](#12-recurring-vs-non-recurring-vs-services-revenue-mix)
13. [Gross margin by revenue stream](#13-gross-margin-by-revenue-stream)
14. [Annual vs monthly plan mix](#14-annual-vs-monthly-plan-mix)
15. [Price realization / discount depth / net price](#15-price-realization--discount-depth--net-price)
16. [GAAP revenue recognition vs run-rate reporting (ASC 606)](#16-gaap-revenue-recognition-vs-run-rate-reporting-asc-606)
17. [Revenue restatement and settlement lag](#17-revenue-restatement-and-settlement-lag)
18. [Committed vs uncommitted revenue](#18-committed-vs-uncommitted-revenue)

Appendices:
- [A. The worked example — bookings vs billings vs revenue vs cash](#appendix-a--bookings-vs-billings-vs-revenue-vs-cash-worked)
- [B. Committed ARR vs annualized run-rate — same business, two numbers](#appendix-b--committed-arr-vs-annualized-run-rate-same-company-two-answers)
- [C. Source ledger](#appendix-c--source-ledger)

---

## 1. MRR

**applies_to:** both (native to consumer subscription; used in B2B below ~$50k ACV and by any company with month-to-month plans)

**definition.** The normalized, recurring, contractually-expected subscription revenue a company holds in a single month, stated at the rate in effect on a chosen point in time.

**formula_variants**

| Variant | Formula | When it is right | Notes / disagreement |
|---|---|---|---|
| Point-in-time MRR (standard) | Σ over active subscriptions of (normalized monthly rate in effect on the snapshot date) | Default for board reporting and for building a waterfall. | Snapshot date must be identical every month (last calendar day is standard). |
| Annual plan normalization | Annual contract price ÷ 12 | Any prepaid annual plan. $1,200/yr → $100 MRR. | Not $1,200 in the billing month and $0 for eleven months. That is billings, not MRR. |
| Multi-year normalization, flat | TCV ÷ contract months | Flat multi-year contract. $300k / 36 mo → $8,333 MRR. | Only correct when the annual price is flat. |
| Multi-year normalization, ramped | Current contract-year ACV ÷ 12 | Ramped deals (yr1 $50k, yr2 $100k, yr3 $150k). Year 1 MRR = $4,167. | **Practitioners disagree.** The averaging method (TCV ÷ 36 = $8,333) inflates early-period MRR and is the single most common way an early-stage company overstates ARR. Use current-year; disclose the ramp separately. |
| ARPU-derived MRR | Paying subscribers × ARPU | Consumer apps where the subscription table is not the system of record. | Circular if ARPU is itself derived from MRR. Reconcile to the billing system at least quarterly. |
| Committed MRR (CMRR) | Point-in-time MRR + signed-but-not-yet-started MRR − known future churn (notice given) | Forward-looking planning, PE/lender reporting. | A forecast, not an actual. Never mix into the same trendline as point-in-time MRR. |
| Recurring-only vs all-revenue | Excludes one-time fees, implementation, overages, hardware | Always. | The "all-revenue MRR" variant is not MRR. If someone shows you MRR that matches total revenue exactly, ask what is in it. |
| Usage/overage treatment | (a) exclude entirely; (b) include trailing-3-month average of usage above commitment | (a) for contract-based reporting; (b) for consumption businesses (Snowflake-shaped). | **Practitioners disagree sharply.** Consumption businesses often report "ARR" that is really annualized recent consumption. Label it. |

**inputs.** Subscription/price records from the billing system (Stripe, RevenueCat, Chargebee, Recurly, Zuora, Maxio), or CRM contract line items (Salesforce CPQ line items with start/end dates) for B2B. Requires: plan price, currency, billing interval, start date, end date, quantity, discount, and active/canceled status with effective dates.

**application.** The base unit for the growth waterfall, the input to run-rate ARR, the denominator for churn rates, and the number the whole board deck is built on. Drives hiring plans and pacing decisions monthly rather than quarterly.

**benchmark.** MRR is a level, not a ratio, so there is no benchmark for the number itself. Growth-rate context: median 2024 growth for B2B SaaS was 26%, top quartile 50% (down from 60% in 2023), with 35% median planned for 2025 — Benchmarkit, *2025 SaaS Performance Metrics* [P]. For smaller companies, ChartMogul's *SaaS Benchmarks Report* (2,100+ SaaS businesses, 12 months ending March 2023) reported top-quartile growth of 139.1% below $1M ARR, 70% for $1–8M, and 45% for $8–30M [P].

**traps.**
- **FX.** Non-USD subscriptions revalued at spot every month make MRR move without a single customer action. Fix: hold subscriptions at a budgeted rate for the year and report FX as its own waterfall bucket.
- **Proration.** A mid-month upgrade creates a partial charge. If MRR is derived from invoices, that partial charge shows up as a phantom contraction next month. MRR must come from the subscription rate, not the invoice.
- **Trials and $0 subscriptions.** Active-but-unpaid subscriptions count as customers but $0 MRR, which silently drops ARPA.
- **Discounts and credits.** MRR should be net of contractual discount but not net of one-off account credits. Mixing the two makes discount depth invisible.
- **Taxes.** MRR is net of sales tax/VAT. Consumer apps pulling from App Store/Play data must strip the platform commission decision explicitly: gross-of-store-fee MRR and net-of-store-fee MRR differ by ~15–30% and both are used in the wild.
- **Annual plans reported as billings.** The classic startup error: $12,000 annual prepay shows as a $12,000 MRR spike, then an $12,000 "churn" next month.

**related.** Feeds ARR, the movement waterfall, ARPA, and every churn rate. Confused with: billings, cash collected, and GAAP revenue — see §16 and Appendix A.

---

## 2. ARR — committed vs annualized run-rate

**applies_to:** both (dominant in B2B; used in consumer at the fund/board level)

**definition.** The annualized value of recurring revenue — either the current monthly rate multiplied by twelve, or the annualized value of contracts actually committed. These are different numbers and the gap between them is the single most useful thing to ask about in a board meeting.

**formula_variants**

| Variant | Formula | When it is right | Notes / disagreement |
|---|---|---|---|
| **Annualized run-rate ARR** | Point-in-time MRR × 12 | Month-to-month businesses, consumer subscription, PLG self-serve. | Assumes the current month persists for twelve months. Says nothing about contractual commitment. A month-to-month book can be 100% cancelable tomorrow and still show identical ARR to a fully-contracted book. |
| **Committed ARR (CARR)** | Σ annualized contract value of all signed contracts, including signed-but-not-yet-live | Enterprise B2B, PE/lender diligence, anything with implementation lag. | Higher than run-rate ARR when there is a backlog of signed-not-launched deals. The delta is the "CARR-to-ARR conversion gap" and long conversion lag is a real red flag. |
| Contracted ARR (in-period, strict) | Σ annualized value of contracts *currently in their term*, excluding cancelable-at-will | The strictest quality view; what a credit committee wants. | Excludes month-to-month entirely. Many SaaS companies discover 30–50% of "ARR" is cancelable on 30 days' notice. |
| Quarterly-revenue run-rate | Most recent quarter's revenue × 4 | Public/late-stage companies that are ≥95% subscription. | Contaminated the moment services or perpetual license is in the mix. |
| Last-month-revenue run-rate | Last month GAAP revenue × 12 | Almost never. | Pulls in one-time fees, overages, setup, and any timing artifact. The weakest variant; treat as a warning sign. |
| Exit ARR / ending ARR | ARR on the last day of the period | Board reporting, valuation. | Differs from average ARR across the period. A company that closed a big deal on Dec 30 has a great exit ARR and a mediocre calendar-year revenue. Both are true. |
| ARR net of known churn | ARR − contracts with notice of non-renewal already given | Forecasting; buy-side diligence. | Not comparable to any headline ARR. Label as "risk-adjusted." |

> **The critical distinction.** Annualizing a monthly number is a *projection*. Committed ARR is a *stock of contracts*. Two companies with $12M ARR — one on annual contracts with a 24-month average term, one on month-to-month — hold radically different assets, and the ARR line alone cannot tell them apart. Always ask: what share of ARR is under contract for the next 12 months, and what is the weighted average remaining term? See **Appendix B** for the same business reported five ways.

**inputs.** CRM contract records (start/end date, auto-renew flag, notice period, cancelation terms, ramp schedule) plus billing-system subscription state. CARR additionally needs the signed-but-not-provisioned pipeline stage, which usually lives only in the CRM.

**application.** Valuation (ARR multiples), fundraise narrative, debt capacity (venture debt and ARR-based lending price off *contracted* ARR, not run-rate), quota and headcount planning, and the denominator for NRR/GRR.

**benchmark.** No published benchmark for the CARR-to-ARR ratio itself — **NO SOURCED BENCHMARK FOUND**. Growth-rate benchmarks by ARR band: see §1 (Benchmarkit 2025 [P]; ChartMogul [P]).

**traps.**
- **The label is unregulated.** ARR is a non-GAAP operating metric with no authoritative definition. Every public company that reports it defines it in its own filing, and the definitions genuinely differ.
- **Consumption businesses annualizing a good month.** Annualizing December usage in a seasonal business manufactures ARR that will not repeat.
- **Signed-not-live counted as ARR, not CARR.** Inflates the number and breaks the tie between ARR and revenue by the length of the implementation cycle.
- **Multi-year TCV divided by 12.** A $300k three-year deal is $100k of ARR, not $300k. This mistake still happens in real board decks.
- **Pilots and POCs.** Paid pilots are non-recurring by construction. Counting them as ARR guarantees a churn cliff.
- **"ARR" at a company with 40% services revenue.** Services is not recurring. See §12.

**related.** Built from MRR (§1). Confused with bookings, TCV, and revenue. Feeds NRR/GRR, ARR per employee (§11), and revenue multiples.

---

## 3. MRR/ARR movement decomposition (the waterfall)

**applies_to:** both

**definition.** The bridge that explains every dollar of change between opening and closing recurring revenue, split into new, expansion, reactivation, contraction, and churn.

**The identity (must hold exactly):**

```
Ending MRR = Beginning MRR
           + New MRR            (first-ever paying subscriptions)
           + Expansion MRR      (upgrades, seat adds, price increases, cross-sell)
           + Reactivation MRR   (previously churned accounts returning)
           − Contraction MRR    (downgrades, seat reductions, discount grants)
           − Churned MRR        (subscriptions going to zero)
```

**formula_variants**

| Decision | Option A | Option B | Guidance |
|---|---|---|---|
| Reactivation bucket | Separate fifth bucket | Folded into New | Keep it separate. Folding it in overstates acquisition efficiency and corrupts CAC-per-new-logo. **Practitioners disagree** — ChartMogul and Baremetrics separate it; many CFO models do not. |
| Reactivation window | Any prior churn ever = reactivation | Only within N days (30/60/90) | Pick a window and freeze it. Consumer apps with heavy win-back need a window; B2B usually does not. |
| Downgrade to $0 | Churn | Contraction | Churn. Contraction requires a surviving paying subscription. |
| Price increase on existing customer | Expansion | Its own "price/uplift" bucket | Split it out if you run pricing actions. Otherwise CS gets credit for finance's price rise. |
| Plan migration (old plan off, new plan on) | Two events: churn + new | One net event: expansion or contraction | Net it. Two events double-counts gross churn and destroys GRR. |
| FX movement | Buried in expansion/contraction | Its own bucket | Own bucket, always, if >5% of revenue is non-USD. |
| Refunds and credits | Contraction | Excluded from the waterfall, shown below the line | Below the line. Refunds are a revenue-quality item, not a customer-behavior item. |
| Gross vs net presentation | Show 5 gross buckets | Show net expansion and net churn only | Gross. The netted version hides simultaneous large expansion and large churn, which is a very different business than a stable one. |

**inputs.** A month-over-month subscription-level diff: subscription ID, customer ID, MRR at t-1, MRR at t, status at each. Built in the billing system's own reporting (ChartMogul, Baremetrics, Maxio) or in the warehouse from a subscription snapshot table. Requires a customer-level rollup, not subscription-level, or a customer who swaps one product for another shows as churn + new.

**application.** Diagnoses *which* growth engine is working. Same net new number can come from heavy acquisition against heavy churn (fragile, expensive) or modest acquisition against negative net churn (durable). Determines whether the next dollar goes to acquisition, onboarding, or retention.

**benchmark.** Expansion ARR as a share of total new ARR: 40% median across the population, rising to 58% at $50–100M ARR and 67% above $100M — Benchmarkit, *2025 SaaS Performance Metrics* [P]. Composition of ARR gained: new business ~57.9%, expansion ~32.3%, reactivation ~10%; for companies above $1M ARR, ARR lost splits roughly 70% churn / 30% contraction, moving toward 40/40 expansion/contraction at ARPA above $25/month — ChartMogul, *SaaS Benchmarks Report*, 12 months ending March 2023, 2,100+ businesses [P].

**traps.**
- **It does not reconcile.** If Beginning + gains − losses ≠ Ending, there is a plug somewhere. The most common causes: customers created and churned inside the same month (invisible to a month-end diff), mid-month plan changes counted twice, and currency revaluation.
- **Same-month churn-and-return nets to zero** and vanishes from both churn and reactivation, understating both.
- **Cohort leakage.** A customer who churns in month 3 and returns in month 9 as "new" makes the new-logo cohort look better than it is and hides the retention problem.
- **Account hierarchy.** In B2B, a parent company that moves spend from one subsidiary to another produces churn at one node and new at another. Roll up to the ultimate parent.
- **Backdating.** Retroactive cancelation effective dates rewrite prior months. See §17.
- **Seat-based contraction lag.** Contracts that only true up at renewal hide seat decay for up to twelve months. The waterfall looks clean and the renewal is a cliff.

**related.** Produces Net New MRR (§4). Feeds NRR/GRR (other file). Confused with the ARR "bridge" in a financial model, which is often quarterly and annualized and therefore not the same series.

---

## 4. Net New MRR / Net New ARR

**applies_to:** both

**definition.** The change in recurring revenue over a period after all gains and losses — the bottom line of the waterfall.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Waterfall net (standard) | New + Expansion + Reactivation − Contraction − Churn | Default. | Should equal Ending ARR − Beginning ARR exactly. If it doesn't, §3 is broken. |
| Balance delta | Ending ARR − Beginning ARR | Sanity check on the waterfall. | Same number, different derivation. Compute both; the difference is your data-quality error bar. |
| Net new *logo* ARR | New only (first-time customers) | Sales-capacity and CAC analysis. | **Beware:** some board decks say "net new ARR" and mean only this. Ask which. |
| Net new excluding reactivation | New + Expansion − Contraction − Churn | Where reactivation is large and cheap (consumer win-back). | Makes the number comparable to peers who fold reactivation into new. |
| Net new ARR added, gross of churn | New + Expansion + Reactivation | Denominator for expansion-share metrics; "Total New ARR" in Benchmarkit's framing. | Not a growth number. Do not present alone. |

**inputs.** The §3 waterfall. Nothing else.

**application.** The single number that answers "did we grow this month." Feeds burn multiple and net-new-ARR-per-rep. The composition (§3) determines whether the number is repeatable.

**benchmark.** Expansion should be a rising share of Total New ARR with scale — 40% median, 58% at $50–100M, 67% above $100M ARR — Benchmarkit, *2025 SaaS Performance Metrics* [P]. Absolute net new ARR has no cross-company benchmark; convert to growth rate (§1) to compare.

**traps.**
- **Seasonality.** Q4-heavy B2B and January-heavy consumer make month-over-month net new meaningless without a trailing-12 view or a same-month-last-year comparison.
- **One deal.** At sub-$20M ARR, a single enterprise deal can be the entire quarter's net new. Show net new with and without the largest deal.
- **Netting hides the engine.** Flat net new can mean nothing happened or that $2M of new offset $2M of churn.
- **Annualizing a monthly net new figure.** Net new MRR × 12 is not net new ARR for the year; it assumes twelve identical months.

---

## 5. Deferred revenue

**applies_to:** both (material in B2B and in any consumer app selling annual plans)

**definition.** A liability on the balance sheet — money already invoiced or collected for a service not yet delivered. Under ASC 606 the technical term is *contract liability*.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Roll-forward (the identity) | Ending DR = Beginning DR + Billings − Revenue recognized | Always. This is the definition. | Rearranged, it gives calculated billings (§8). |
| Current vs non-current split | DR expected to be recognized ≤12 months vs >12 months | Balance-sheet presentation; required for classified balance sheets. | Long-term DR is the tell for multi-year prepay. Most SaaS has almost none. |
| Contract liability, net | Contract liabilities − contract assets, presented net per contract | GAAP presentation for a single contract. | Netting is required at the contract level, not the entity level. |
| Deferred revenue including unbilled | (wrong) | Never. | Unbilled contracted amounts are *backlog* (§7), not deferred revenue. This is the most common conceptual error. |
| Cash-basis "deferred" | Collections received − revenue recognized | Small companies invoicing on receipt. | Diverges from GAAP DR by the AR balance. |

**inputs.** GL contract-liability account, reconciled to a revenue-schedule subledger from the billing/rev-rec system (Zuora RevPro, Maxio, Chargebee RevRec, Stripe Revenue Recognition, NetSuite ARM).

**application.** Working-capital and cash forecasting; the bridge between billings and revenue; the input to calculated billings; a lender's view of prepaid obligation. In diligence, a shrinking DR balance against flat ARR means billing terms shortened — a real cash-quality deterioration invisible in the ARR line.

**benchmark.** **NO SOURCED BENCHMARK FOUND** for deferred-revenue-to-revenue ratios. The mechanical driver is billing frequency: in the KeyBanc Capital Markets *2022 Private SaaS Company Survey* (13th Annual, published Oct 20 2022, n=104 on billing frequency), 58% of respondents billed annually, 9% quarterly, 3% quarterly-to-under-a-year, 28% monthly, 2% other [P]. A book that is 58% annual-prepay carries roughly half a year of billings in deferred revenue; a monthly-billed book carries almost none.

**traps.**
- **DR is not a growth metric.** It moves with *billing terms*, not with demand. Shifting a customer from annual prepay to monthly cuts DR by ~92% of that customer's ACV with zero change to ARR or revenue.
- **Acquired deferred revenue is written down** in purchase accounting, which suppresses post-close reported revenue and makes organic growth look worse than it was. Always ask for the DR haircut.
- **Cancelable prepayments.** DR can include money that must be refunded. Consumer apps with refund-heavy policies carry a real liability inside the "revenue" line.
- **Seasonality.** A January-renewal-heavy book makes Q1 DR spike and Q4 DR trough every single year. Compare to the same quarter last year, never sequentially.
- **DR understates the book.** It only reflects what has been invoiced. A three-year contract billed annually shows one year in DR and two years nowhere on the balance sheet. That is what RPO exists to fix.

**related.** Roll-forward links billings (§8) and revenue (§16). Component of RPO (§6). Confused with backlog (§7) and with revenue.

---

## 6. RPO and cRPO

**applies_to:** b2b primarily (public-company disclosure); rarely meaningful in consumer

**definition.** RPO is the total transaction price allocated to performance obligations that are unsatisfied or partially unsatisfied at period end — that is, contracted revenue not yet recognized, whether or not it has been invoiced. cRPO ("current RPO") is the portion expected to be recognized within the next twelve months.

**The composition identity:**

```
RPO = Deferred revenue (billed, unrecognized)
    + Unbilled contracted backlog (contracted, not yet invoiced)

cRPO = the slice of RPO management expects to recognize in the next 12 months
```

**formula_variants**

| Variant | Formula / basis | When it is right | Notes |
|---|---|---|---|
| ASC 606 RPO (as disclosed) | Transaction price of unsatisfied POs, per ASC 606-10-50-13 | Public filings; the only comparable definition. | Time-banded disclosure ("expect to recognize X% within 12 months") is required in qualitative or quantitative form. |
| cRPO | RPO expected to be recognized within 12 months | The number analysts model. | Company-defined boundary; almost always "next twelve months," but read the footnote. |
| RPO including cancelable amounts | Adds contracts terminable for convenience | Some companies' internal view. | **Practitioners disagree, and the disagreement is material.** Enforceable rights are what ASC 606 measures; a contract cancelable without penalty may be excluded entirely. Two companies with identical books can report wildly different RPO purely on termination-clause drafting. |
| Non-GAAP "total backlog" | RPO + amounts excluded by practical expedient | Management commentary. | Not comparable to anyone. Treat as color. |
| cRPO growth rate | YoY % change in cRPO | Leading indicator for public SaaS revenue. | Frequently a better forward signal than revenue growth, because revenue is the past and cRPO is contracted future. |

**The practical expedients — why RPO lies by omission.** ASC 606-10-50-14 and 50-14A let an entity exclude from RPO: (a) contracts with an original expected duration of one year or less; (b) amounts recognized under the right-to-invoice ("as-invoiced") practical expedient; and (c) sales-based or usage-based royalties and certain variable consideration allocated to a wholly unsatisfied performance obligation. ASC 606-10-50-15 requires disclosure of which expedients were elected. Consequences:

- A company whose book is entirely one-year contracts can legitimately report an RPO that omits most of it.
- A consumption business (usage-based pricing) can have enormous contracted commitments and a small RPO, or the reverse, depending on whether commitments are enforceable minimums.
- **RPO is not comparable across companies without reading each one's expedient elections.** This is the single most abused number in public SaaS commentary.

**inputs.** Rev-rec subledger (transaction price by performance obligation, with expected satisfaction timing), contract metadata for termination rights, and legal review of enforceability. Not derivable from a billing system alone.

**application.** Forward revenue visibility and quality of the quarter. When revenue beats but cRPO decelerates, the beat came from the past book, not new demand. Used in valuation as EV/cRPO for consumption-heavy names where revenue is volatile.

**benchmark.** **NO SOURCED BENCHMARK FOUND** for RPO-to-revenue or cRPO-to-revenue ratios across private SaaS. The mechanical driver is contract length: in the KeyBanc Capital Markets & Sapphire Ventures *2024 SaaS Survey* (15th Annual, n=66), contract lengths were month-to-month 6%, one year 46%, two years 21%, three years or greater 27% [P]. A book that is 48% multi-year carries meaningful non-current RPO; a one-year book carries almost none and may disclose none at all under the expedient.

**traps.**
- **Comparing RPO across companies.** Different expedient elections, different cancelability treatment. Invalid without the footnotes.
- **Lumpiness.** One large multi-year renewal moves total RPO by a double-digit percentage. Use cRPO for trend, total RPO for backlog depth.
- **Early renewals inflate RPO and cRPO** without any incremental demand. Ask how much of the sequential increase came from renewals pulled forward.
- **RPO growth without ARR growth** means the company lengthened contract terms, not that it sold more.
- **Private companies rarely compute RPO correctly** because it requires a rev-rec subledger. If a private company quotes RPO, ask whether it is really "sum of remaining TCV," which is a different and looser number.

**related.** Contains deferred revenue (§5) and backlog (§7). Confused with bookings and with ARR. Feeds forward-revenue models.

---

## 7. Backlog

**applies_to:** both (b2b-dominant; in consumer, the closest analogue is unrecognized prepaid subscription term)

**definition.** Signed, contracted revenue that has neither been invoiced nor recognized — the unbilled remainder of the contract book.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| SaaS backlog (unbilled) | RPO − Deferred revenue | The clean definition in a subscription business. | Equivalently, remaining TCV of signed contracts minus amounts already invoiced. |
| Total remaining TCV | Σ (contract TCV − amounts recognized) | Quick internal view. | Includes billed-unrecognized, so it double-counts against DR unless netted. |
| 12-month backlog | Portion invoiceable/deliverable within 12 months | Capacity planning; services businesses. | Analogue of cRPO. |
| Funded vs unfunded | Split by whether a purchase order/appropriation exists | Government and enterprise contracting. | Unfunded backlog is a pipeline number wearing a backlog costume. |
| Cancelable vs non-cancelable | Split by termination rights | Diligence; lending. | The only split a credit committee cares about. |

**inputs.** CRM contract records (TCV, billing schedule, term dates) reconciled against the AR subledger for what has actually been invoiced.

**application.** Revenue-visibility narrative, delivery-capacity planning in services-attached businesses, and lender/PE assessment of contracted coverage of the next twelve months.

**benchmark.** **NO SOURCED BENCHMARK FOUND.** Backlog is not a GAAP measure and has no standard cross-company definition, which is precisely why comparisons are unavailable.

**traps.**
- **No standard definition.** The SEC has repeatedly pushed issuers to define such metrics. In a comment letter to Harris Interactive Inc. (March 7 2013, SEC Division of Corporation Finance, re Form 10-K FYE June 30 2012), the staff asked the company to "provide a more complete definition of bookings" and separately to explain what its "secured revenue" metric represented, how management used it, and how it differed from bookings [P]. If the SEC has to ask a public filer, assume your board deck is worse.
- **Backlog with cancelation rights is not revenue visibility.** Enterprise contracts with termination-for-convenience convert backlog into a courtesy.
- **Services backlog is capacity-constrained.** $5M of implementation backlog with a team that can deliver $2M/year is a two-and-a-half-year revenue tail, not next year's revenue.
- **Double-counting with deferred revenue.** The most common modeling error: adding total remaining TCV to DR.

**related.** RPO (§6) = backlog + deferred revenue. Confused with pipeline (not contracted) and bookings (a flow, not a stock).

---

## 8. Billings (and calculated billings)

**applies_to:** both

**definition.** The amount invoiced to customers in a period — the bridge between what was sold (bookings) and what was earned (revenue), and the closest of the four to cash.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Actual billings | Σ invoices issued in the period (net of credit memos) | Internal reporting; you own the AR subledger. | The ground truth. Always available internally, never disclosed publicly. |
| **Calculated billings** (the analyst formula) | Revenue + Δ Total deferred revenue | External analysis of a public company from its financials. | Uses **total** DR (current + non-current). Using only current DR is a common and wrong shortcut. |
| Calculated billings, extended | Revenue + Δ Total DR + Δ Unbilled receivables/contract assets | Companies with significant unbilled AR. | Closer to true billings where invoicing lags recognition. |
| Adjusted calculated billings | Above, then − acquired DR from M&A ± FX translation on DR | Any period with an acquisition or large FX move. | Without these adjustments the metric is noise in an acquisitive company. |
| Cash collections | Cash received from customers in the period | Cash forecasting; runway. | Billings minus the change in AR. Not billings. |
| Annualized billings | Trailing-12-month billings | Smoothing seasonality. | The only defensible way to trend a quarterly billings series in a Q4-heavy business. |

**inputs.** Actual billings: AR subledger / invoice table. Calculated billings: income statement (revenue) plus balance sheet (current + long-term deferred revenue), plus the cash flow statement or footnotes for acquired DR and FX.

**application.** Leading indicator of revenue and the honesty check on a revenue beat. Determines cash-collection timing and therefore runway. In diligence, billings growth persistently below ARR growth means terms are shortening.

**benchmark.** **NO SOURCED BENCHMARK FOUND** for a billings-growth-to-revenue-growth ratio. The structural driver is billing frequency (see §5 benchmark: 58% annual, 28% monthly, KeyBanc 2022, n=104 [P]).

**traps.**
- **Billing-duration mix shift is the number one distortion.** Move a cohort from annual-upfront to quarterly and reported billings fall roughly 75% for that cohort in the transition period, with ARR and revenue completely unchanged. Any billings deceleration must be tested against duration mix before it is called a demand problem.
- **Early renewals pull billings into the current quarter** and leave a hole in the next one.
- **Acquired deferred revenue** inflates the ΔDR term. Strip it.
- **Calculated billings with current-DR only** understates billings for any company with multi-year prepay.
- **Credit memos and refunds.** Gross billings without netting credits overstates the number; reconcile to cash collections at least quarterly.
- **Billings is not bookings.** A $300k three-year deal billed annually produces $100k of billings and $300k of bookings in the same quarter. See Appendix A.

**related.** Bridges bookings and revenue. Feeds deferred revenue (§5) and cash. Confused with bookings, revenue, and collections — Appendix A separates all four.

---

## 9. Revenue concentration

**applies_to:** both (acute in B2B; also relevant in consumer apps with a small number of distribution or partner-billing relationships)

**definition.** The share of revenue or ARR that depends on a small number of customers — a direct measure of how much of the business one phone call can destroy.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Top-1 share | Largest customer ARR ÷ total ARR | Fastest read; the headline in diligence. | The 10% line is the conventional trigger (see benchmark). |
| Top-N share | Σ ARR of N largest ÷ total ARR | N = 5 and N = 10 are the standard cuts. | Report both; a business can be fine on top-1 and terrible on top-10. |
| **Herfindahl–Hirschman Index (HHI)** | HHI = Σ sᵢ² where sᵢ = customer i's revenue share | Single-number summary that weights large customers quadratically. | Reported either as a decimal (0 to 1) or ×10,000 (0 to 10,000). State which. |
| **Effective number of customers** | 1 ÷ HHI (decimal form) | The most intuitive framing for a board. | If HHI = 0.05, you effectively have 20 customers regardless of your logo count. This is the number to put on the slide. |
| Gini coefficient / Lorenz curve | Standard inequality measure over the revenue distribution | Consumer or long-tail books where top-N is uninformative. | Better than top-N when you have 50,000 customers. |
| Concentration by non-customer axis | Share by industry, geography, channel, payment processor, ad platform | Consumer subscription and marketplace businesses. | A consumer app with 90% of installs from one ad network has concentration risk that no customer-level metric will show. |

> **HHI caution.** The DOJ/FTC merger-guideline HHI thresholds (the familiar 1,500 and 2,500 lines) measure *market* concentration among competitors, not customer concentration. Borrowing the framing is fine; borrowing the thresholds as a benchmark is not.

**inputs.** ARR or trailing-12-month revenue by customer, rolled up to the ultimate parent entity (not the billing account). CRM parent-child hierarchy plus billing data.

**application.** Valuation haircut, debt capacity, insurance and covenant terms, and account-coverage staffing. Also drives the decision on whether to keep chasing a whale segment.

**benchmark.**
- **The 10% line is a real accounting threshold, not folklore.** ASC 280-10-50-42 requires a public entity to disclose the extent of its reliance on major customers: if revenues from transactions with a single external customer are 10% or more of the entity's revenues, the entity must disclose that fact, the total revenue from each such customer, and the segment(s) reporting it. The entity need not name the customer. Critically, **a group of entities known to be under common control is treated as a single customer**, and each of the federal government, a state government, a local government, and a foreign government is treated as a single customer. The entity-wide disclosures are required only in annual financial statements [P]. This is why "does any customer exceed 10%?" is the first concentration question in every diligence, and why the parent-rollup rule below is not optional.
- **Rules of thumb circulating in the market** — top-10 customers under 10–15% of revenue for SMB/mid-market SaaS, under 40–50% for enterprise-focused SaaS; top-5 above 30–40% of ARR treated as elevated — appear only in vendor and consulting blog posts with no underlying dataset, no sample size, and no publication methodology [W]. Do not put these in a board deck as benchmarks. Use them as conversation starters and go get the actual distribution from your own book.
- Claims that high concentration produces "20–30% lower valuations" trace to unsourced aggregator content [W]. **NO SOURCED BENCHMARK FOUND** for a quantified valuation impact.

**traps.**
- **Billing account vs ultimate parent.** Six subsidiaries of the same holding company look like six customers and are one renewal decision. Roll up.
- **Concentration on the buying committee, not the logo.** One champion controlling five accounts is one point of failure.
- **Concentration in the growth, not the base.** A diversified base where 60% of *net new* ARR came from one logo has a forward concentration problem the current-period metric will not show. Compute concentration on net new ARR separately.
- **Non-customer concentration.** Single payment processor, single app store, single ad channel, single cloud region, single integration partner. Consumer subscription apps routinely have 100% platform concentration and zero customer concentration.
- **Averaging away the tail.** HHI on a long-tail book is dominated by the top few; report both HHI and top-N.
- **The 10% threshold is on revenue, not ARR.** A customer can be under 10% of GAAP revenue and over 10% of ARR if they signed late in the year.

**related.** Modifies the read on NRR (a single whale can carry it), ARPA (§10), and any valuation multiple.

---

## 10. ARPA

**applies_to:** both (B2B calls it ARPA or ACV-per-customer; consumer usually says ARPU, covered elsewhere)

**definition.** Average recurring revenue per paying account, over a period or at a point in time.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Monthly ARPA | MRR ÷ active paying accounts | Monthly-billed and consumer-adjacent books. | Point-in-time; use the same snapshot date as MRR. |
| Annual ARPA | ARR ÷ active paying accounts | B2B board reporting. | KeyBanc reports this and calls it median ACV: "ACV = ARR / Total # of Customers." Be aware the same label is used for contract-level ACV elsewhere. |
| Median ARPA | Median of per-account ARR | Any book with a long tail or whales. | **Use this alongside the mean, always.** Mean ARPA in a book with one $2M customer and 500 $5k customers is a fiction. |
| New-customer ARPA | New ARR in period ÷ new logos in period | Measuring whether you are actually moving upmarket. | The only ARPA that reflects current pricing and current ICP. |
| Cohort ARPA | ARR of a signup cohort ÷ surviving accounts, by age | Separating upsell from survivorship. | Rising blended ARPA with flat cohort ARPA means small customers churned, not that you upsold. |
| ARPA by segment | Same, cut by plan / size / channel | Pricing and packaging work. | Blended ARPA across self-serve and enterprise is meaningless. |
| Revenue-per-account (all revenue) | Total revenue ÷ accounts | Businesses with large services attach. | Not ARPA. Label it. |

**inputs.** MRR/ARR by customer (billing system) and an account count on a consistent definition — paying accounts only, parent-rolled-up, excluding trials, $0 plans, internal, and test accounts.

**application.** Segmentation and pricing decisions, sales-motion design (self-serve vs inside vs field, which is an ARPA question before it is a preference), CAC affordability, and the upmarket/downmarket narrative.

**benchmark.**
- Median ACV, defined as ARR divided by total customers, for private B2B SaaS: **$54K (2022), $56K (2023), $62K (2024E)** — KeyBanc Capital Markets & Sapphire Ventures, *2024 SaaS Survey* (15th Annual), n=62 [P]. Median sales cycle held at ~6 months across all three years.
- Efficiency varies sharply by ACV band: top-quartile net magic number 1.7x at <$10K ACV, 1.5x at $10–50K, 1.1x at $50–150K and 1.1x at $150K+; top-quartile CAC payback 9.7 months at <$10K ACV rising to 17 months at $150K+ — ICONIQ Capital, *State of Software 2025: Rethinking the Playbook* (September 2025), public + portfolio dataset 2013–Q2 2025, n≈320–410 per band [P]. Higher ARPA is not free.
- Retention is strongly ARPA-dependent: best-in-class customer retention runs ~75% at ARPA under $25/month versus ~92% at ARPA over $1,000/month, and NRR above 100% is achieved by only ~2% of businesses at consumer-level ARPA versus nearly 50% at ARPA above $1,000/month — ChartMogul, *SaaS Retention Report 2023*, 2,100+ SaaS businesses [P].

**traps.**
- **ARPA rising is not automatically good.** The most common cause is SMB churn, not enterprise upsell. Decompose: hold the cohort fixed and recompute.
- **Denominator drift.** Adding free/trial accounts, or switching from billing accounts to logos mid-year, moves ARPA more than any pricing change you will ever ship.
- **Mean vs median gap is the metric.** If mean ARPA is 3x median ARPA, the mean is describing your top decile and nothing else.
- **Mixing self-serve and enterprise** produces a number that describes no customer you have.
- **Blended ARPA as a pricing input.** Price off the new-customer and segment ARPA distributions, never the blended average.

**related.** Feeds LTV, CAC payback, and sales-motion design. Numerator shared with MRR/ARR (§1, §2). Distinct from ARPU/ARPPU (consumer, other file) and from contract-level ACV (other file).

---

## 11. ARR per employee / revenue per employee

**applies_to:** both

**definition.** Recurring revenue divided by headcount — the single simplest measure of whether the company converts people into revenue efficiently.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| ARR per FTE (standard) | Ending ARR ÷ ending FTE count | Board reporting, the version most benchmarks use. | Ending-over-ending. Fast, slightly flattering after a hiring pause. |
| Revenue per employee | Trailing-12-month GAAP revenue ÷ average FTE | Comparing against public companies and non-SaaS. | Lower than ARR/FTE for a growing company, because TTM revenue trails exit ARR. **Practitioners use these two interchangeably and they are not the same number.** |
| ARR per total headcount | Includes contractors, PEO, offshore agencies | The honest version. | Excluding contractors is the standard way this metric gets gamed. |
| Net new ARR per employee | Net new ARR ÷ FTE | Productivity of the current period rather than the accumulated base. | Harsher and more diagnostic. A company can have great ARR/FTE and terrible marginal productivity. |
| ARR per quota-carrying rep | ARR ÷ AEs | Sales capacity planning. | Different metric; do not substitute. |
| Gross-profit per employee | Gross profit ÷ FTE | Services-heavy or infra-heavy businesses. | The right version when gross margin varies a lot across peers. |

**benchmark.** This metric has the best benchmark coverage in the whole family.

| Source | Population | Figure | Tag |
|---|---|---|---|
| KeyBanc Capital Markets & Sapphire Ventures, *2024 SaaS Survey* (15th Annual) | Private SaaS, overall survey group median | ARR per employee **$133K (2022), $154K (2023), $173K (2024E)** | [P] |
| Same | Private SaaS, **top quartile** | **$195K (2022), $225K (2023), $235K (2024E)** | [P] |
| SaaS Capital, *2025 Revenue Per Employee Benchmarks for Private SaaS Companies* (published July 23 2025; survey fielded through March 2025; 1,000+ companies) | All private SaaS, median | **$129,724**, up from $125,000 prior year | [P] |
| Same | $1–3M ARR band | **$99,858** median; equity-backed $94,444 vs bootstrapped $110,000 | [P] |
| Benchmarkit, *2025 SaaS Performance Metrics* | $50–100M ARR | **~$200,000 per FTE** | [P] |
| Same | >$100M ARR | **~$300,000 per FTE** | [P] |
| OpenView, *2023 SaaS Benchmarks Report* | By ARR band, median (2023 vs 2022) | <$1M: **$42K** (vs $20K); $1–5M: **$90K** (vs $83K); $5–20M: **$167K** (vs $106K); $20–50M: **$212K** (vs $145K); >$50M: **$250K** (vs $200K) | [P] |
| Same, top quartile | By ARR band (2023 vs 2022) | <$1M: **$80K**; $1–5M: **$150K**; $5–20M: **$268K**; $20–50M: **$292K**; >$50M: **$353K** | [P] |

Read across the sources: the metric scales steeply with ARR, roughly $40–100K at sub-$5M, $150–200K at $5–50M, and $200–350K above $50M, and the whole distribution shifted up materially between 2022 and 2024 as the efficiency regime took hold. OpenView's own commentary sets the at-scale target at $200–250K [P].

**application.** Hiring-plan sanity check, efficiency narrative for investors, and the fastest way to detect that a "software" company is actually a services company (§12). Combined with growth rate it is the operating half of the Rule of 40 conversation.

**traps.**
- **Headcount definition.** Excluding contractors, offshore delivery teams, and PEO staff is the standard manipulation. Ask for total people paid, not W-2 FTE.
- **Numerator/denominator period mismatch.** Exit ARR over ending headcount flatters a company that just did a layoff; the ratio jumps with no revenue change. Trend both series separately.
- **Comparing ARR/FTE against revenue/employee benchmarks.** For a company growing 40%, exit ARR exceeds TTM revenue by roughly 20%, so the two metrics differ by that much before anything else.
- **Services-heavy businesses look artificially bad**, infra-resale businesses artificially good. Use gross-profit per employee when comparing across mixes.
- **A high number can mean underinvestment.** It is an efficiency metric, not a quality metric. Pair with growth and NRR.
- **Acquisitions** break the series in both directions on day one.

**related.** Rule of 40, burn multiple (other file), gross margin by stream (§13). Confused with revenue per quota-carrying rep.

---

## 12. Recurring vs non-recurring vs services revenue mix

**applies_to:** both (B2B-dominant; in consumer the analogue is subscription vs IAP vs ads)

**definition.** The split of total revenue into contractually recurring subscription, repeatable-but-not-contracted (usage, overage), and genuinely one-time (implementation, training, custom development, hardware, perpetual license).

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Recurring revenue % | Subscription revenue ÷ total GAAP revenue | Valuation and quality-of-revenue. | The number that decides whether you get a revenue multiple or an EBITDA multiple. |
| Services attach rate (ARR basis) | Professional services revenue ÷ ARR | Operating view; the KeyBanc framing. | Split upfront (implementation) from post-implementation (ongoing consulting). They behave differently. |
| Services attach rate (deal basis) | PS bookings ÷ new subscription ACV, on new deals | Sales-motion and delivery-capacity design. | The forward-looking version. |
| Three-bucket quality split | Contracted recurring / repeatable non-contracted / one-time | Consumption businesses and anything with overage. | **Practitioners disagree** on whether usage above a minimum commitment is "recurring." Disclose it as its own bucket rather than arguing. |
| Net revenue retention on services | (wrong) | Never. | Services revenue does not renew. Including it in NRR inflates the number. |
| ARR-eligible revenue % | Revenue that would appear in ARR ÷ total revenue | Reconciling ARR to the income statement. | If this is below ~85%, "ARR" is describing a minority of the business. |

**inputs.** Revenue by product/SKU from the GL, mapped to a recurring/non-recurring taxonomy that is documented and frozen. Requires a deliberate policy on overage, setup fees, and minimum commitments.

**application.** Valuation multiple, forecast confidence, hiring mix (delivery vs engineering), and whether the company can honestly call itself SaaS.

**benchmark.**
- **Professional services attach distribution.** Among private SaaS companies above $5M ARR, KeyBanc's *2022 Private SaaS Company Survey* (n=79) found 24 respondents with **no professional services at all**, 27 at **1–10%** attach, 17 at **11–25%**, 3 at **26–50%**, and 8 at **over 50%** [P]. Median annual gross dollar churn for the group was 14%.
- **Services attach correlates with retention, up to a point, then reverses.** In the KeyBanc/Sapphire *2024 SaaS Survey* (n=52, 2023 ARR basis), churn by upfront professional services as a share of ARR ran **10% at 0% PS, 8% at 1–5%, 5% at 5–15%, and back up to 12% above 15%**; for post-implementation services the pattern was **12%, 7%, 4%, 5%** [P]. The survey's own reading: more high-touch services correlates with lower churn "up to a certain point," with the trend reversing above 15% [P]. Heavy services attach beyond that band signals a product that cannot be self-delivered.
- **Professional services carry ~30% gross margin** versus ~81% for subscription — Benchmarkit, *2025 SaaS Performance Metrics* [P]. See §13.

**traps.**
- **Overage counted as recurring.** Usage above commitment is real revenue and it is not contracted. It belongs in its own bucket, and annualizing a strong usage month into "ARR" is the single most common consumption-business overstatement.
- **Setup fees amortized to look recurring.** Recognizing a one-time implementation fee ratably over the contract term is often correct under ASC 606 and still does not make it recurring revenue.
- **Services used to fill a soft quarter.** Services revenue can be pulled forward by staffing up. Watch for services growth outpacing subscription growth in exactly the quarters subscription missed.
- **Perpetual license plus maintenance is not SaaS.** Maintenance renews and is genuinely recurring, but at a fraction of the license value, and the license portion is recognized at a point in time.
- **Reseller/pass-through revenue** (hardware, third-party licenses, cloud resale) inflates the top line at near-zero margin and destroys ARR-per-employee comparability. Report gross and net.
- **Trap in the other direction:** a company with zero services often has an onboarding problem it is not paying for, which shows up later as churn. The KeyBanc data shows 0% attach has *worse* churn than 5–15% attach.

**related.** Drives gross margin by stream (§13), ARR per employee (§11), and the valuation multiple. Confused with "total revenue growth," which blends all three.

---

## 13. Gross margin by revenue stream

**applies_to:** both

**definition.** Margin computed separately for each revenue line — subscription, professional services, and pass-through/infrastructure — rather than blended, because the blend hides everything that matters.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Blended gross margin | (Total revenue − total COGS) ÷ total revenue | Headline reporting. | Almost useless for diagnosis in a mixed-revenue company. |
| Subscription gross margin | (Subscription revenue − subscription COGS) ÷ subscription revenue | The number that determines SaaS-ness. | Subscription COGS = hosting/cloud, third-party data and licenses, DevOps/SRE, payment processing, amortization of capitalized software, and some portion of support. |
| Services gross margin | (PS revenue − delivery cost) ÷ PS revenue | Delivery-org management. | Often negative in early-stage companies running services as a land motion. That is a strategy, not an accident, but say so out loud. |
| Contribution margin after platform fees | (Gross revenue − app-store commission − processing) ÷ gross revenue | **Consumer subscription apps.** | App-store commission is 15–30% off the top. A consumer app's "gross margin" is meaningless without stating whether revenue is gross or net of store fees. |
| Marginal gross margin | Δ COGS ÷ Δ revenue for the incremental cohort | Pricing and packaging decisions; AI-cost analysis. | Diverges sharply from average margin when infrastructure is on reserved/committed pricing or when inference cost scales with usage. |
| Gross margin excluding amortization | Excludes capitalized-software amortization from COGS | Comparing against peers who do not capitalize. | **Practitioners disagree.** Capitalization policy varies widely; always ask. |

**Where practitioners genuinely disagree:** (a) whether customer success sits in COGS or in S&M — it materially changes subscription gross margin and there is no single right answer; (b) whether amortization of internally developed software belongs in COGS; (c) whether consumer app revenue is reported gross or net of app-store commission. All three should be stated explicitly before any peer comparison.

**benchmark.**

| Source | Cut | Figure | Tag |
|---|---|---|---|
| KeyBanc / Sapphire, *2024 SaaS Survey* (n=52) | Private SaaS, overall median **total** gross margin | **67% (2022), 71% (2023), 72% (2024E)** | [P] |
| Same | Top quartile total gross margin | **79% (2022), 81% (2023), 81% (2024E)** | [P] |
| Same | Subscription vs total, 2023 | Median **subscription ~78%** vs **total ~71%** — a ~7-point spread attributable to revenue mix | [P] |
| Benchmarkit, *2025 SaaS Performance Metrics* | Median by stream | **Total 77%, subscription 81%, professional services 30%** | [P] |
| ICONIQ, *State of Software 2025* (Sept 2025) | **Top-quartile** annual gross profit margin by ARR band | <$10M **86%**, $10–25M **84%**, $25–50M **78%**, $50–100M **80%**, $100–250M **84%**, $250–500M **86%**, $500M+ **85%** (n=141–459 per band) | [P] |

ICONIQ's own read is that top-quartile companies maintain >80% gross margin and that margin stabilizes with scale [P]. Note the dip at $25–50M ARR, which is the band where services attach and infrastructure spend typically peak before leverage arrives.

**inputs.** GL with COGS mapped by revenue stream, plus a documented allocation policy for shared costs (support, hosting, SRE). Cloud cost allocation by product requires tagging discipline that most companies do not have; if the allocation is a guess, say so.

**application.** Valuation, pricing floors, decisions on whether to keep a services line, and the cost-to-serve analysis behind segment strategy.

**traps.**
- **App-store commission in consumer.** Reporting revenue gross of a 30% commission and calling the margin 85% is a fantasy. Decide gross or net, disclose it, and never switch mid-series.
- **AI inference cost sits in COGS.** For AI-native and AI-feature-heavy products, variable inference cost scales with usage and structurally compresses subscription gross margin relative to the classic 80% SaaS benchmark. Model the *marginal* margin on the heaviest-usage decile, not the average.
- **Free tier COGS.** Hosting a large free tier is a real subscription COGS charged against a small paying base. It belongs in S&M only if you can defend it; most companies leave it in COGS and quietly depress the margin.
- **Reserved-instance commitments** make average margin look good while marginal margin on growth is worse, or vice versa after a commitment reset.
- **Blended margin hides a services problem.** A 72% blend can be 80% subscription and negative services.
- **Support allocation.** Moving support from COGS to opex adds several points of subscription gross margin with no operational change. Check the policy before celebrating an improvement.

**related.** Drives Rule of 40, CAC payback (which is gross-margin-adjusted in the KeyBanc definition: Fully-Loaded CAC = S&M ÷ (New Logo ARR + Expansion ARR) × Gross Margin ÷ 12 [P]), LTV, and revenue mix (§12).

---

## 14. Annual vs monthly plan mix

**applies_to:** both — and this is the most under-examined structural variable in both

**definition.** The share of customers, and of ARR, on annual or longer commitments versus month-to-month, and the payment terms attached to each.

**Two variables, not one.** Contract *length* (how long they are committed) and billing *frequency* (how often you invoice) are independent. A three-year contract billed monthly and a one-year contract billed annually have opposite cash profiles and opposite churn profiles. Track both.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Annual mix by ARR | ARR on ≥12-month terms ÷ total ARR | Board reporting. | The dollar-weighted view. Always lead with this. |
| Annual mix by account | Accounts on ≥12-month terms ÷ total accounts | Consumer and self-serve. | Diverges hugely from the ARR view because annual buyers are bigger. |
| Weighted average contract term (WACT) | Σ (ARR × remaining months) ÷ Σ ARR | Contract-coverage analysis; lending. | The number that turns "we have annual contracts" into an actual duration. |
| Billing frequency mix | Share of ARR invoiced annually / quarterly / monthly | Cash forecasting, deferred revenue. | Independent of contract length. |
| Prepay penetration | ARR billed 12+ months in advance ÷ total ARR | Cash-efficiency analysis. | Drives the cash CAC payback story. |

**inputs.** Subscription records with term start/end, billing interval, auto-renew flag, and notice period. Available in the billing system; contract length usually requires the CRM.

**benchmark.**

| Source | Cut | Figure | Tag |
|---|---|---|---|
| KeyBanc / Sapphire, *2024 SaaS Survey* (n=66) | Contract length distribution, private SaaS | Month-to-month **6%**, 1 year **46%**, 2 years **21%**, 3 years or greater **27%** | [P] |
| KeyBanc, *2022 Private SaaS Survey* (n=108 contract length, n=104 billing frequency; published Oct 20 2022) | Contract length | Month-to-month **6%**, less than a year **5%**, 1 year **47%**, 1–2 years **10%**, 2–3 years **18%**, 3 years or more **14%**; **median = 1 year** | [P] |
| Same | **Billing frequency** | 1 year **58%**, quarterly-to-under-a-year **3%**, quarterly **9%**, monthly **28%**, other **2%**; **median = 1 year** | [P] |
| KeyBanc / Sapphire, *2024 SaaS Survey* (n=52) | **ARR churn rate by contract length** | Month-to-month **14%**, 1 year **10%**, 2 years **6%**, 3 years or greater **3%**; overall **7%** | [P] |

The 2024 churn-by-contract-length series is the load-bearing benchmark in this section: **moving from month-to-month to three-year terms is associated with roughly a 4.7x reduction in annual ARR churn** in that dataset [P]. KeyBanc's own framing: "Increased contract lengths significantly reduce churn" [P].

**The four things annual mix changes at once**

| Dimension | What happens when annual mix rises | Why it is easy to misread |
|---|---|---|
| **Churn** | Measured churn falls sharply (14% → 10% → 6% → 3% per the KeyBanc series). | Part of this is genuine commitment and part is a **measurement artifact**: an all-annual book can only churn on ~1/12 of accounts in any given month, so *monthly* churn looks excellent and the risk is concentrated in renewal months. Always compute annual cohort retention, not monthly-annualized. |
| **Cash** | Prepay pulls ~11 months of cash forward. Cash CAC payback can go to near zero. Burn multiple improves. | This is a **one-time pull-forward**, not a permanent improvement. Once the whole base is converted, the benefit stops and the growth rate of the improvement goes to zero. A burn multiple that improved on an annual-plan push will regress. |
| **Reported metrics** | Deferred revenue balloons; billings become lumpy and seasonal; MRR/ARR are unchanged. | Billings growth accelerates during the conversion and then decelerates, with no change in demand. See §8. |
| **NRR / expansion** | Expansion and contraction only register at renewal, so NRR becomes a renewal-cohort metric rather than a continuous one. | NRR measured monthly on an annual book is mostly renewal-timing noise. Measure it on the renewal cohort. |
| **LTV and price** | Retention up, so LTV up — but annual plans are almost always discounted (§15), so ARR per account is down. | Net LTV effect is ambiguous and must be computed, not assumed. |

**traps.**
- **The churn improvement is partly free and partly bought.** You paid for it with a discount and with refund/cancelation exposure. Net it out.
- **Renewal cliffs.** An annual-plan push creates a synchronized renewal cohort twelve months later. Model the cliff before you run the campaign.
- **Consumer refund exposure.** Annual prepay in consumer apps sits against platform refund policies and chargeback risk that monthly plans do not carry at the same magnitude.
- **Comparing your churn to a peer with a different mix is invalid.** Always ask for the peer's contract-length distribution before accepting a churn comparison.
- **Auto-renew vs opt-in renewal.** Two "annual" books with different auto-renew defaults have completely different retention. This is not visible in the mix metric.
- **Cash flattery in a fundraise.** An annual-plan push in the two quarters before a raise produces a cash-efficiency chart that will not repeat.

**related.** Directly drives churn/retention (other file), deferred revenue (§5), billings (§8), RPO (§6), burn multiple (other file), and discount depth (§15).

---

## 15. Price realization / discount depth / net price

**applies_to:** both (B2B negotiated pricing; consumer promo and win-back pricing)

**definition.** The share of list price the company actually collects, and the size and distribution of the gap.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Discount depth (per deal) | 1 − (net price ÷ list price) | Deal-desk governance. | Compute on the *effective* price including free months and waived fees, not the line-item discount field. |
| **Price realization (dollar-weighted)** | Σ net ARR ÷ Σ list-price ARR | The only version worth reporting. | Weighting by deal count instead of dollars understates discounting badly, because the largest deals carry the deepest discounts. |
| Net effective price | (Total contract value − free periods − credits − waived services) ÷ billable units × periods | Deals with ramps, free months, or bundled services. | Three months free on a twelve-month deal is a **25% year-one discount**, however the paperwork describes it. |
| Realized price index | Current period net price per unit ÷ base period net price per unit, same mix | Tracking pricing power over time. | Must hold mix constant or it measures mix, not price. |
| Price/volume/mix bridge | ΔARR = volume effect + price effect + mix effect | Explaining ARR growth to a board. | The only way to answer "did we grow because we sold more or because we charged more." |
| Renewal price realization | Renewal ARR ÷ (prior ARR × contractual uplift) | Measuring whether uplift clauses are actually collected | Contracted CPI/uplift clauses are frequently negotiated away at renewal. Measure the collected uplift, not the contracted one. |
| Net revenue per unit | Net revenue ÷ seats (or API calls, GB, transactions) | Usage and seat-based models. | The cleanest longitudinal price signal because it needs no list price. |

**inputs.** CPQ / quote data (list price, discount, term concessions), signed contract terms, and the billing system for what was actually invoiced. The gap between the CPQ discount field and the invoice is where the real discounting hides.

**application.** Deal-desk policy and approval thresholds, packaging redesign, sales-comp design (comp on net price or reps will discount), and the decision on whether a price increase is achievable.

**benchmark.**
- **Discounts on multi-year commitments.** KeyBanc's *2022 Private SaaS Company Survey* (n=50, excluding companies below $5M 2021 ending ARR) reported multi-year discount distributions segmented by the respondent's average contract length. Across the three segments the reported values span roughly **3% to 17%**, with medians clustering in the **5–10%** range and 75th-percentile depth reaching **17%** for companies whose average contract length is two years or more [P]. *Methodology caveat: these values are read from a chart in the published PDF; treat the range and the central tendency as reliable and the exact per-segment percentile assignment as approximate.*
- **NO SOURCED BENCHMARK FOUND** for overall price realization, average discount depth on new business, or renewal uplift capture across SaaS. This is a genuine gap in the public benchmark literature — every serious dataset on it is proprietary to pricing consultancies.

**traps.**
- **Deal-count weighting.** Ten small deals at 5% and one large deal at 40% is not "an average discount of 8%."
- **Fictional list price.** If nothing sells at list, realization measures your list-price hygiene, not your pricing power. Rebase list to the 90th-percentile realized price.
- **Discounts that are not in the discount field.** Free months, extended payment terms, extra seats at no charge, waived implementation, uncapped overage forgiveness, and MFN clauses. All of these are price. None of them show up in the CPQ discount percentage.
- **Ramp deals as concealed discount.** Year-one at 50% of steady-state price is a 50% year-one discount that shows up as "ramp" in the contract and as low ARR in the metrics.
- **Renewal uplift caps.** Agreeing to a 3% annual cap gives away pricing power for the whole contract term. Track the weighted-average uplift cap across the book as its own metric.
- **Grandfathering.** Price increases applied only to new logos leave the installed base decaying in real terms. Report realized price separately for the base and for new business.
- **Discount depth as an early ICP-drift signal.** Rising discounts on new business almost always means the company is selling outside its ICP before it means the market got harder.

**related.** Drives ARPA (§10), ARR (§2), gross margin (§13), and annual-plan economics (§14). Confused with net revenue retention, which nets price against volume and hides both.

---

## 16. GAAP revenue recognition vs run-rate reporting (ASC 606)

**applies_to:** both

**definition.** GAAP revenue is what was *earned* in a closed accounting period under ASC 606. Run-rate reporting (MRR/ARR) is a forward projection of the current rate. They measure different things over different time frames and will never tie exactly.

**The five-step ASC 606 model, in the terms a marketer needs**

| Step | What it is | Where SaaS gets tripped |
|---|---|---|
| 1. Identify the contract | Enforceable rights and obligations; collectibility probable | Month-to-month terms mean the "contract" may be one month long, not one year |
| 2. Identify the performance obligations | Distinct goods/services promised | Is implementation distinct from the subscription? If it cannot be performed by anyone else and has no standalone utility, it is **not** distinct and gets recognized over the subscription term |
| 3. Determine the transaction price | Including variable consideration, constrained | Usage, overages, tiered pricing, service credits, and refund rights all live here |
| 4. Allocate to performance obligations | Relative standalone selling price (SSP) | Discounts get spread across obligations by SSP, not by how the quote was written. This is why the revenue line does not match the order form |
| 5. Recognize when/as satisfied | Over time for a series of distinct services | A term SaaS subscription is normally a single performance obligation satisfied ratably over the term |

**Adjacent rules a growth operator actually hits**
- **ASC 340-40 (contract costs).** Incremental costs of obtaining a contract — sales commissions — are capitalized and amortized over the *expected period of benefit*, which is often longer than the contract term. Consequence: the commission expense on the P&L is not what you paid the reps this period, so **P&L S&M is the wrong input for a cash CAC calculation.**
- **Principal vs agent (gross vs net).** Determines whether marketplace, reseller, and app-store revenue is reported gross or net. This single election can change reported revenue by 30% with no change in the business.
- **Non-refundable upfront fees.** Usually not a separate performance obligation; recognized over the expected customer relationship, which may exceed the contract term.
- **Material rights.** A discounted renewal option or a converting free trial can create a separate performance obligation that defers revenue.

**Why ARR and GAAP revenue diverge — the five structural reasons**

| Reason | Effect |
|---|---|
| **Direction of time** | ARR is forward-looking from a point in time; revenue is backward-looking over a period. For a company growing 40%, exit ARR exceeds trailing-12-month revenue by roughly 20%. |
| **Scope** | ARR excludes services, one-time fees, and (usually) overage. GAAP revenue includes all of it. |
| **Ramped contracts** | ARR uses the current contract-year rate. GAAP frequently straight-lines total consideration across the term when the service delivered does not change. Result: **GAAP revenue > ARR in year 1 of a ramp, and < ARR in year 3.** |
| **Allocation** | SSP re-allocation moves revenue between periods and obligations in ways ARR never sees. |
| **Timing of start** | ARR often starts at signature or provisioning; revenue starts when the service transfers. |

**The SEC's position on operating metrics.** In *Commission Guidance on Management's Discussion and Analysis of Financial Condition and Results of Operations* (Release Nos. 33-10751; 34-88094; FR-87, effective February 25 2020), the Commission stated that when a company presents a key performance indicator it would generally expect the disclosure to include "a clear definition of the metric and how it is calculated," a statement of why it is useful to investors, and a statement of how management uses it; that the company should consider whether estimates or assumptions underlying the metric need disclosure "for the metric not to be materially misleading"; and that if the calculation method changes, the company should disclose the differences, the reasons, the effects on amounts previously reported, and consider recasting prior periods. It also reminded companies to maintain effective disclosure controls over material KPIs [P]. Separately, the Commission has stated that operating and statistical measures such as numbers of subscribers or average revenue per user are *not* non-GAAP financial measures (Release No. 33-8176) [P] — which is precisely why ARR is unregulated and why definitions vary so wildly.

> **The operator takeaway.** ARR is not a non-GAAP measure and therefore carries no reconciliation requirement. Nobody is going to make you tie it out. Build the ARR-to-revenue reconciliation anyway, because it is the first thing a diligence team will ask for and the first place a made-up number surfaces.

**inputs.** Revenue subledger by performance obligation, contract terms, SSP analysis, and the ARR model. The reconciliation lives in a schedule that nobody owns unless you assign it.

**application.** Determines what you can say in a fundraise, what auditors will sign, and whether the growth narrative survives diligence.

**benchmark.** Not applicable — this is a standard, not a metric. **NO SOURCED BENCHMARK FOUND** (and none should exist).

**traps.**
- **Presenting ARR growth and revenue growth as if they are the same series.** They diverge by construction in any company that is growing, ramping, or selling services.
- **Using P&L commission expense for CAC.** ASC 340-40 capitalization makes it the wrong number. Use cash commissions paid.
- **Assuming gross revenue in a marketplace or app-store model.** Check the principal/agent conclusion before building any ARPU or margin analysis.
- **Recognizing an annual prepay on receipt.** Still happens in early-stage companies and destroys every downstream metric.
- **Changing the ARR definition mid-year without recasting.** The SEC guidance above is the standard even for private companies; a board will apply it whether or not the SEC does.

**related.** Deferred revenue (§5), RPO (§6), billings (§8), and the entire ARR discussion (§2).

---

## 17. Revenue restatement and settlement lag

**applies_to:** both — acute in consumer subscription (app stores, card networks) and in usage-based B2B

**definition.** The systematic tendency for a reported revenue figure to change after the period closes, because the underlying transactions had not finished settling when the number was first published.

**Why this month's revenue moves after close — the ten causes**

| # | Cause | Typical lag | Direction |
|---|---|---|---|
| 1 | **App-store reporting and remittance.** Apple and Google report on their own fiscal calendars and remit weeks later. | 30–45+ days | Both |
| 2 | **Card settlement.** Authorization, capture, and settlement occur on different days; month-end transactions settle next month. | 1–5 days | Usually up |
| 3 | **Refunds** issued after close, reversing prior-period revenue. Store-initiated refunds arrive latest. | 30–90 days | Down |
| 4 | **Chargebacks and disputes** | 60–120 days | Down |
| 5 | **Failed payments and dunning recovery.** A card declining on day 28 books as churn; recovery on day 35 reverses it. | 7–30 days | Up |
| 6 | **Usage/meter true-ups.** Usage revenue accrued on estimated volume, corrected when the meter closes. | 5–15 days | Both |
| 7 | **Backdated cancelations and support credits** applied with a retroactive effective date | Any | Down |
| 8 | **FX revaluation** at final month-end rates | 1–5 days | Both |
| 9 | **Late contract paperwork** — deals signed in the period but booked after close | 5–20 days | Up |
| 10 | **Warehouse reprocessing.** Late-arriving events reprocessed by the pipeline change the dashboard number silently, with no announcement. | Any | Both |

**formula_variants**

| Variant | Definition | Use |
|---|---|---|
| Flash revenue (day 1–2) | Live system-of-record read, unsettled | Operating pace. Label it FLASH. |
| Preliminary (day 5–7) | Post-settlement, pre-accrual-true-up | Management reporting |
| Final / closed (day 10–15) | Post-close, post-accrual | The number that goes in the board deck |
| Fully matured | After the refund and chargeback window (typically 90–120 days in consumer) | Cohort LTV and channel ROAS |
| **Restatement delta** | (Final − Flash) ÷ Final | Track this as its own KPI. If it exceeds ~2%, the flash number should not be circulated. |

**inputs.** Billing system, payment processor settlement reports, app-store financial reports, GL close calendar. Requires an explicit close calendar with a named number for each stage.

**application.** Prevents the recurring, expensive argument between growth and finance about whose number is right. Sets the rule for when a number may be circulated and under what label.

**benchmark.** **NO SOURCED BENCHMARK FOUND** for typical restatement magnitude. Measure your own and publish it.

**traps.**
- **Comparing an unsettled current month to fully settled prior months.** The current month will always look worse. Compare at equal maturity — for example, day-10 versus day-10 — or wait.
- **Cohort LTV on immature cohorts is biased upward** because the refund and chargeback window has not closed. Consumer LTV curves computed at day 30 systematically overstate.
- **Paid-channel ROAS overstated in consumer**, systematically, because refunds concentrate in newly acquired cohorts and attribution reports read pre-refund revenue.
- **Two dashboards, two truths.** Marketing reads the live table, finance reads the closed period. Neither is wrong. Assign each report a stage label and stop arguing.
- **Silent restatement of history.** If the pipeline reprocesses, last month's chart changes without anyone noticing. Snapshot the closed period into an immutable table.
- **Board decks built on flash numbers** get corrected at the next meeting, which costs more credibility than the delay would have.

**related.** Corrupts MRR (§1), the waterfall (§3, especially churn and reactivation), ARPA (§10), and every consumer LTV/CAC calculation. The SEC KPI guidance in §16 on disclosure controls over metrics is the formal version of this discipline.

---

## 18. Committed vs uncommitted revenue

**applies_to:** both

**definition.** The split between revenue backed by an enforceable obligation to pay and revenue that continues only at the customer's discretion.

**formula_variants**

| Variant | Formula | When it is right | Notes |
|---|---|---|---|
| Committed ARR % | Contractually committed ARR ÷ total ARR | The headline quality metric. | "Committed" means in-term and not cancelable without penalty. Auto-renew is not commitment. |
| Contracted minimum ARR | Σ contractual minimum commitments, annualized | Consumption businesses. | For a usage business the committed floor can be a small fraction of actual revenue. Report both. |
| Next-12-month coverage ratio | Committed revenue recognizable in next 12 months ÷ next-12-month revenue plan | Planning and lender conversations. | Above 1.0 means the plan is already contracted. Most SaaS runs 0.6–0.9 and has to sell the rest. |
| Weighted average remaining committed term | Σ (committed ARR × remaining months) ÷ Σ committed ARR | Duration of the asset. | The number that separates a real contract book from a monthly one. |
| ASC 606 enforceable-rights view | The RPO basis (§6) | Audited/public reporting. | The strictest definition; excludes cancelable amounts. |
| "Committed" including auto-renew | Adds evergreen contracts | Some management presentations. | **Practitioners disagree, and this variant is usually advocacy.** An evergreen contract cancelable on 30 days' notice is month-to-month with paperwork. |

**inputs.** Contract-level legal terms — term dates, auto-renew, notice period, termination-for-convenience, minimum commitments, non-appropriation clauses. This requires reading contracts; it cannot be derived from the billing system.

**application.** Debt capacity (ARR-based lenders and venture-debt providers underwrite against committed, non-cancelable ARR, not run-rate), forecast confidence, valuation multiple, and the decision whether to invest in converting the base to longer terms.

**benchmark.** **NO SOURCED BENCHMARK FOUND** for committed-ARR share. The best available proxy is contract-length distribution: month-to-month 6%, one year 46%, two years 21%, three years or greater 27% — KeyBanc / Sapphire *2024 SaaS Survey*, n=66 [P]. That implies roughly 94% of private-SaaS ARR sits on some term commitment and roughly half sits on multi-year, though it says nothing about cancelability within those terms.

**traps.**
- **Auto-renewal counted as commitment.** The single most common overstatement in this metric.
- **Termination for convenience.** One clause converts a three-year contract into a month-to-month one. Enterprise and government contracts routinely carry it.
- **Non-appropriation clauses.** Government contracts that terminate if funding is not appropriated are not committed revenue regardless of term.
- **Minimum commitments far below actual usage.** A customer spending $500k against a $50k minimum is 90% uncommitted.
- **Committed is not collectible.** Credit quality is a separate axis. A committed contract with a distressed counterparty is worth less than an uncommitted one with a healthy one.
- **Signature entity.** A subsidiary signature without a parent guarantee limits enforceability to that subsidiary's balance sheet.
- **Notice periods that have already run.** A contract in its notice window is functionally uncommitted.

**related.** RPO (§6), backlog (§7), committed ARR (§2), annual/monthly mix (§14). Confused with "contracted ARR," which different practitioners use for both concepts.

---

# Appendix A — Bookings vs billings vs revenue vs cash, worked

**The setup.** A three-year, $300,000 total contract value contract at a flat $100,000 per year, billed annually in advance, net-45 payment terms.

- **Signed:** February 15, Year 1 (mid-Q1)
- **Service term:** March 1, Year 1 through February 28, Year 4
- **Invoices issued:** March 1 Y1, March 1 Y2, March 1 Y3 — $100,000 each
- **Cash received (net 45):** April 15 Y1, April 15 Y2, April 15 Y3 — all in Q2
- **Monthly GAAP revenue:** $100,000 ÷ 12 = **$8,333/month**, ratable from March 1

**The four numbers, by quarter** (all figures in dollars; DR = deferred revenue; backlog = unbilled contracted)

| Period | Bookings (TCV) | Bookings (ACV) | Billings | GAAP revenue | Cash collected | End DR | End RPO | End cRPO | End backlog | ARR |
|---|---|---|---|---|---|---|---|---|---|---|
| **Q1 Y1** | **300,000** | 100,000 | **100,000** | **8,333** | **0** | 91,667 | 291,667 | 100,000 | 200,000 | 100,000 |
| Q2 Y1 | 0 | 0 | 0 | 25,000 | **100,000** | 66,667 | 266,667 | 100,000 | 200,000 | 100,000 |
| Q3 Y1 | 0 | 0 | 0 | 25,000 | 0 | 41,667 | 241,667 | 100,000 | 200,000 | 100,000 |
| Q4 Y1 | 0 | 0 | 0 | 25,000 | 0 | 16,667 | 216,667 | 100,000 | 200,000 | 100,000 |
| **FY1 total** | **300,000** | 100,000 | **100,000** | **83,333** | **100,000** | 16,667 | 216,667 | 100,000 | 200,000 | 100,000 |
| Q1 Y2 | 0 | 0 | 100,000 | 25,000 | 0 | 91,667 | 191,667 | 100,000 | 100,000 | 100,000 |
| Q2 Y2 | 0 | 0 | 0 | 25,000 | 100,000 | 66,667 | 166,667 | 100,000 | 100,000 | 100,000 |
| Q3 Y2 | 0 | 0 | 0 | 25,000 | 0 | 41,667 | 141,667 | 100,000 | 100,000 | 100,000 |
| Q4 Y2 | 0 | 0 | 0 | 25,000 | 0 | 16,667 | 116,667 | 100,000 | 100,000 | 100,000 |
| **FY2 total** | 0 | 0 | **100,000** | **100,000** | **100,000** | 16,667 | 116,667 | 100,000 | 100,000 | 100,000 |
| Q1 Y3 | 0 | 0 | 100,000 | 25,000 | 0 | 91,667 | 91,667 | 91,667 | 0 | 100,000 |
| Q2 Y3 | 0 | 0 | 0 | 25,000 | 100,000 | 66,667 | 66,667 | 66,667 | 0 | 100,000 |
| Q3 Y3 | 0 | 0 | 0 | 25,000 | 0 | 41,667 | 41,667 | 41,667 | 0 | 100,000 |
| Q4 Y3 | 0 | 0 | 0 | 25,000 | 0 | 16,667 | 16,667 | 16,667 | 0 | 100,000 |
| **FY3 total** | 0 | 0 | **100,000** | **100,000** | **100,000** | 16,667 | 16,667 | 16,667 | 0 | 100,000 |
| Q1 Y4 (Jan–Feb) | 0 | 0 | 0 | 16,667 | 0 | 0 | 0 | 0 | 0 | 0 |
| **Life of contract** | **300,000** | — | **300,000** | **300,000** | **300,000** | 0 | 0 | 0 | 0 | — |

**Calculated-billings check** (Revenue + Δ total deferred revenue, §8):
- Q1 Y1: $8,333 + ($91,667 − $0) = **$100,000** ✓ matches actual billings
- Q2 Y1: $25,000 + ($66,667 − $91,667) = **$0** ✓
- Q1 Y2: $25,000 + ($91,667 − $16,667) = **$100,000** ✓

**What this proves**

1. **In the signature quarter there are five defensible answers to "how big was that deal":** $300,000 (bookings TCV), $100,000 (bookings ACV, and also ARR, and also billings), $8,333 (GAAP revenue), and $0 (cash). A board deck that shows "bookings" next to "revenue" without labels is putting $300,000 next to $8,333.
2. **Year 1 in full: bookings $300,000, billings $100,000, revenue $83,333, cash $100,000.** Four numbers, no two of them equal, all four correct.
3. **The four converge only over the full 36-month term,** where every one of them equals $300,000. Any shorter window guarantees divergence.
4. **ARR is flat at $100,000 for the entire life of the contract.** The deal never "grows." Anyone describing this deal as $300,000 of ARR is wrong by 3x.
5. **Cash lands in Q2** — neither the quarter of signature nor, in a stricter payment-terms scenario, the quarter of billing. Runway models built on billings will be wrong by one quarter.
6. **cRPO is pinned at $100,000 until year 3, then decays.** cRPO falling while ARR is flat is the signal that the contract is running out and has not been renewed. This is exactly what analysts watch for in public SaaS.
7. **Backlog steps down $100,000 per year as each annual invoice converts unbilled backlog into deferred revenue.** RPO is the sum of the two and declines smoothly.

---

# Appendix B — Committed ARR vs annualized run-rate: same company, five answers

**The company.** One month's snapshot. All figures are real and simultaneously true.

| Component | Detail | Monthly | Annualized |
|---|---|---|---|
| Segment A — SMB, month-to-month, cancelable any time | 60 customers × $500 | $30,000 | $360,000 |
| Segment B — mid-market, annual contracts, avg 7 months remaining | 30 customers × $2,000 | $60,000 | $720,000 |
| Segment C — enterprise, 3-year contracts, avg 20 months remaining | 8 customers × $5,000 | $40,000 | $480,000 |
| **Live recurring subtotal** | 98 customers | **$130,000** | **$1,560,000** |
| Signed, not yet live (in implementation) | 2 enterprise contracts | $12,500 | $150,000 |
| Usage/overage above commitment | trailing-3-month avg $10,000; **last month $15,000** | $15,000 | $180,000 |
| Professional services (implementation projects) | last month | $25,000 | $300,000 |
| Written notice of non-renewal received | 3 mid-market customers | ($6,000) | ($72,000) |

**The same business, reported five ways**

| # | Label | Calculation | Reported ARR |
|---|---|---|---|
| 1 | **Annualized run-rate ARR** | $130,000 MRR × 12 | **$1,560,000** |
| 2 | **Committed ARR (CARR)** | Run-rate + signed-not-live ($150,000) | **$1,710,000** |
| 3 | **Contracted ARR (strict, in-term, non-cancelable)** | Segments B + C only; excludes all month-to-month | **$1,200,000** |
| 4 | **Risk-adjusted ARR** | Run-rate − noticed non-renewals ($72,000) | **$1,488,000** |
| 5 | **Last-month-revenue run-rate** | ($130,000 + $15,000 usage + $25,000 services) × 12 | **$2,040,000** |

**The spread is $1,200,000 to $2,040,000 — a 70% range, in the same month, on the same book, with every version defensible in a sentence.** Version 5 is the one that shows up in pitch decks. Version 3 is the one a lender will underwrite.

**The two questions that collapse the ambiguity**

1. **What share of ARR is contractually committed for the next twelve months, and what is the weighted average remaining term?**
   - Segment A: $0 committed (cancelable)
   - Segment B: $720,000 × 7/12 = **$420,000** remaining contracted value
   - Segment C: $480,000 × 20/12 = **$800,000** remaining contracted value
   - **Total remaining contracted value = $1,220,000**, or **0.78x** run-rate ARR
   - Weighted average remaining term across committed ARR = ($720,000×7 + $480,000×20) ÷ $1,200,000 = **12.2 months**
   - Committed share of run-rate ARR = $1,200,000 ÷ $1,560,000 = **77%**

2. **What is in the number that is not a recurring subscription?** In version 5, the $2,040,000 headline contains $180,000 of annualized usage that is not contracted and $300,000 of annualized professional services that does not renew. That is **$480,000, or 24% of the biggest version of "ARR," that is not recurring subscription revenue at all.** Version 2 adds a different contaminant: $150,000 of CARR that has not started delivering and will not convert to revenue until implementation completes.

**Contract-coverage reference points.** A business on three-year contracts with an average of 20 months remaining across the whole book would show remaining contracted value near 1.7x run-rate ARR. A pure month-to-month consumer book shows 0.0x. This ratio, not the ARR number, is what distinguishes the two businesses — and it is almost never on the slide.

---

# Appendix C — Source ledger

| # | Source | Publication / period | Used for | Tag |
|---|---|---|---|---|
| 1 | KeyBanc Capital Markets & Sapphire Ventures, *2024 SaaS Survey* (15th Annual) | 2024; 2022/2023 actuals and 2024E; n=47–66 by question | ARR per employee, gross margin, contract length distribution, churn by contract length, churn by services attach, median ACV, CAC formulas | [P] |
| 2 | KeyBanc Capital Markets, *2022 Private SaaS Company Survey* (13th Annual) | Published Oct 20 2022; n=50–109 by question | Contract length, billing frequency, professional services attach distribution, multi-year discount depth, gross dollar churn | [P] |
| 3 | SaaS Capital, *2025 Revenue Per Employee Benchmarks for Private SaaS Companies* | Published July 23 2025; survey fielded through March 2025; 1,000+ companies | Revenue per employee median and by ARR band, bootstrapped vs equity-backed | [P] |
| 4 | Benchmarkit, *2025 SaaS Performance Metrics* | 2025 | ARR per FTE at scale, gross margin by stream, expansion share of new ARR, growth rates, NRR/GRR | [P] |
| 5 | OpenView, *2023 SaaS Benchmarks Report* | 2023 (with 2022 comparison) | Revenue per employee by ARR band, median and top quartile | [P] |
| 6 | ICONIQ Capital, *State of Software 2025: Rethinking the Playbook* | September 2025; public + portfolio data 2013–Q2 2025 | Gross margin by ARR band (top quartile), magic number and CAC payback by ACV band | [P] |
| 7 | ChartMogul, *SaaS Retention Report 2023* | 2023; 12 months ending March 2023; 2,100+ SaaS businesses | MRR movement composition, growth by ARR band, retention and NRR by ARPA band | [P] |
| 8 | FASB ASC 606-10-50-13 / 50-14 / 50-14A / 50-15 | Codification | RPO disclosure requirement and practical expedients | [P] |
| 9 | FASB ASC 280-10-50-42 | Codification | Major-customer 10% disclosure threshold and common-control aggregation | [P] |
| 10 | SEC, *Commission Guidance on MD&A*, Release Nos. 33-10751; 34-88094; FR-87 | Effective February 25 2020 | KPI/metric disclosure expectations, change-in-methodology recasting, disclosure controls over metrics | [P] |
| 11 | SEC Division of Corporation Finance comment letter to Harris Interactive Inc. | March 7 2013 | Staff demand for a complete definition of "bookings" and "secured revenue" | [P] |
| 12 | SEC, Release No. 33-8176, *Conditions for Use of Non-GAAP Financial Measures* | Jan 22 2003 (cited within Release 33-10751) | Operating/statistical measures (subscribers, ARPU) are not non-GAAP measures | [P] |
| 13 | RevenueHub, *Disclosures in ASC 606* | Undated article | Corroboration of ASC 606 disclosure references | [S] |
| 14 | Vendor and consulting blog posts on revenue concentration (Monetizely, Umbrex, MetricHQ, L40, Saber) | Undated | Circulating top-N concentration rules of thumb — **cited only as folklore, not as benchmark** | [W] |

**Explicit gaps — no sourced benchmark found**
- Deferred revenue as a ratio to revenue or ARR
- RPO or cRPO as a ratio to revenue, for private SaaS
- Backlog, any cross-company measure
- Billings growth relative to revenue growth
- Revenue concentration, any dataset-backed distribution (only [W] folklore exists)
- Price realization, average new-business discount depth, renewal uplift capture
- Committed-ARR share of total ARR
- Revenue restatement magnitude between flash and final close


