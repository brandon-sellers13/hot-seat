# ENGAGEMENT, ACTIVATION AND PRODUCT: Metric Corpus

**Sourcing rule applied throughout:** every benchmark below is either (a) traceable to a named, dated, linked source, or (b) explicitly marked `NO SOURCED BENCHMARK FOUND`. Nothing is stated from memory. Where I could only reach a secondary aggregator rather than the primary report, I say so.

**Global finding up front:** in this family, roughly 80% of the metrics have **no industry-consensus definition**. That is not a flaw in the corpus, it is the single most important thing a practitioner needs to internalize. Benchmarks across vendors are frequently non-comparable because the vendors are measuring different things under the same word.

---

## SECTION A: THE ACTIVE USER BASE

---

### 1. Active Users (DAU / WAU / MAU)

- **applies_to:** both
- **definition:** The count of unique users who did something that qualifies as "active" inside a rolling or calendar window of one day, seven days, or 28-to-31 days.

**formula_variants** (the window is the easy part, "active" is where the entire argument lives):

| Variant | Formula | When it's right |
|---|---|---|
| Presence-based | Unique users with any app open / session start / page load in window | Media and content products where consumption *is* the value. Weakest and most gameable. |
| Any-event | Unique users firing ≥1 tracked event | Default in most analytics tools. Includes background pings, push receipts, and automated syncs unless explicitly excluded. |
| Authenticated-session | Unique logged-in users with ≥1 session | B2B, where anonymous traffic is noise. Excludes logged-out usage that may be real. |
| Key-action ("meaningful active") | Unique users performing ≥1 event from a defined core-action set | The only defensible definition for most products. Mixpanel's own MAU definition, "performed a meaningful action," explicitly rejects app-open as sufficient. |
| Qualified active | Key action AND minimum threshold (e.g. ≥2 actions, or session >10s) | Products with heavy accidental/bot traffic. |
| Entity-based | Active *accounts*, *devices*, *seats*, or *households* rather than users | B2B and shared-device consumer (TV, tablet). See metric 4. |
| Calendar vs rolling window | MAU = calendar month unique vs trailing-30-day unique | Rolling-30 is correct for operational use; calendar-month is correct for board reporting continuity. They differ, and the gap widens with spiky products. |
| L28 instead of L30 | Trailing 28 days | Holds day-of-week composition constant, so month-over-month comparisons aren't contaminated by "this month had five Mondays." (Facebook growth team convention.) *Inferred rationale, the convention itself is documented.* |

- **inputs:** Raw event stream with a stable user identifier, session boundaries, and an event taxonomy that distinguishes user-initiated from system-initiated events. Sources: Amplitude, Mixpanel, Heap, Pendo, PostHog, or a warehouse events table (Snowflake/BigQuery) fed by Segment/RudderStack.
- **application:** Denominator for nearly everything else in this family. Feeds stickiness, engagement growth accounting, ARPU/ARPDAU, capacity planning, and (in consumer subscription) the free-user base that monetization models draw from.

**benchmark:** There is no benchmark for *absolute* DAU/WAU/MAU, only for their ratios (metric 3) and growth rates. Sourced growth-rate benchmarks:

| Metric | 50th pct | 75th pct | 90th pct | Source |
|---|---|---|---|---|
| Monthly active user growth rate | <1% | ~3% | 7.5% (≈138% annualized) | [Amplitude 2025 Product Benchmark Report](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf), 2,600+ companies, data Sept 2023–Sept 2024, published Dec 2025 |
| Enterprise monthly active user growth | 0.6% | ~2.5% | 6.5% | Same report, enterprise = >2,000 employees Americas / >1,500 international |

Also from that report: **10% of products account for 79% of all user engagement.** Engagement is winner-take-most.

**traps:**
1. **The word "active" is doing all the work and nobody audits it.** Same product, same month, four legitimate definitions: (i) app opened = 1.0M, (ii) any event fired including background sync = 1.4M, (iii) authenticated session = 620K, (iv) performed a core action = 310K. That is a 4.5x spread with zero change in user behavior. Every one of those numbers is defensible in a deck. Ask which one before comparing anything.
2. **Push notifications inflate DAU mechanically.** If your SDK logs an app-open on notification tap, aggressive push campaigns manufacture DAU that has no relationship to value. This is the single most common consumer-app inflation vector.
3. **Background refresh, widget renders, and silent syncs** count as events in most SDKs by default.
4. **Multi-device users double-count** unless identity resolution is working. Same human on phone and web is 2 DAU under device-ID tracking.
5. **Deleted-account and dormant-record inclusion.** "Present in the database" is not active, but a poorly written SQL `COUNT(DISTINCT user_id) FROM users` will report exactly that.
6. **Definition drift is undetectable in a time series.** If someone adds an event to the "active" set in March, your March MAU steps up and everyone credits the marketing campaign. Version-control the active definition and annotate the chart.
7. **MAU is a lagging, slow-moving vanity number in isolation.** A product losing users can hold flat MAU for months because MAU is a 30-day union. Use growth accounting (metric 9) instead.
8. **B2B seasonality.** MAU drops every December and every August in B2B and it means nothing.

- **related:** DAU/MAU stickiness (3), Power user curve (7), Engagement growth accounting (9), Active accounts (4), Retention (cross-family), ARPDAU (monetization family).

---

### 2. Natural Frequency (Expected Usage Interval)

- **applies_to:** both
- **definition:** The cadence at which a user *should* return if the product is working as intended, derived from the underlying job to be done rather than from a target.
- **formula_variants:**
  - **Empirical interval:** median days between consecutive core actions for retained users. Right when you have enough retained-user history.
  - **Percentile-band interval:** the interval that captures 80% of return visits for users who are still active at month 3. Right for setting the retention-window denominator (i.e. deciding whether to measure D1/D7/D30 or W1/W4/W12).
  - **Job-derived interval:** reasoned from the task (payroll = biweekly, tax = annual, food delivery = weekly, messaging = many-times-daily). Right at pre-PMF stage when you have no data.
  - **Bimodal decomposition:** some products have two populations with genuinely different natural frequencies (a daily power segment and a monthly segment). Model them separately rather than averaging.
- **inputs:** Event timestamps per user, restricted to users who survived past the churn cliff. Source: product analytics or warehouse.
- **application:** Determines which retention window to use, which active-user window is the headline (DAU vs WAU vs MAU), whether DAU/MAU is even an appropriate metric, and what the lifecycle messaging cadence should be.
- **benchmark:** `NO SOURCED BENCHMARK FOUND` for natural frequency as a published metric. The closest sourced guidance is Amplitude's instruction to "understand your product usage interval" and their note that products with naturally lower usage, such as real estate platforms, should design content to fill the gap between major transactions ([Amplitude 2025 Product Benchmark Report](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf)).
- **traps:**
  1. **Confusing your target frequency with the user's natural frequency.** Wanting daily use does not create a daily job. Products that push for engagement above natural frequency generate notification fatigue and uninstalls.
  2. **Measuring natural frequency on the full user base** rather than on retained users. Churned users drag the interval to infinity.
  3. **Natural frequency changes across the lifecycle.** Setup week is high-frequency, steady state is lower. Measuring during onboarding gives a false read.
- **related:** DAU/MAU (3), Retention window selection (retention family), Session frequency (13).

---

### 3. Stickiness Ratio (DAU/MAU, and its cousins DAU/WAU, WAU/MAU)

- **applies_to:** both, but only for products with a genuine daily or near-daily use case
- **definition:** The share of the monthly active base that shows up on an average day, used as a proxy for habit strength.
- **formula_variants:**
  - **Classic DAU/MAU:** average DAU over the period ÷ MAU at period end. Right for daily-use consumer products.
  - **Point-in-time DAU/MAU:** single-day DAU ÷ trailing-30 MAU. Noisier, sensitive to day-of-week. Avoid as a headline.
  - **DAU/WAU:** average DAU ÷ WAU. Right for B2B and productivity products where the meaningful unit is the workweek. A five-day-a-week SaaS product has a ceiling of about 71% on DAU/WAU (5/7) and about 23% on DAU/MAU (5/22 workdays over 30 days), which is why DAU/MAU flatters nobody in B2B.
  - **WAU/MAU:** right for weekly-cadence products (fitness, grocery, project management).
  - **Core-action stickiness:** compute on users performing a key action rather than any activity. This is the version that actually tracks habit. Practitioners disagree on whether stickiness should ever be computed on app-opens.
  - **Feature-level stickiness:** feature DAU ÷ feature MAU, to find which surfaces are habit-forming (see metric 18).
  - **Cohort-decomposed stickiness:** compute separately for tenure cohorts, because a blended number hides that new users are at 8% and 12-month users at 45%.

**inputs:** Same event stream as metric 1. Critically, both numerator and denominator must use the *identical* active definition or the ratio is meaningless.

**application:** Habit diagnosis, not quality scoring. Drives whether to invest in frequency-building mechanics (streaks, digests, notifications) or in per-session value depth. Feeds Pendo's Product Engagement Score (metric 22) as one of three components.

**benchmark:** Best current sourced data, from [Mixpanel, "Monthly active users (MAU)", published 9 June 2026](https://mixpanel.com/blog/mau/), drawing on Mixpanel's 2026 State of Digital Analytics report (3.7 trillion events, 12,000+ companies):

| Vertical | North America | EMEA | APAC | LATAM |
|---|---|---|---|---|
| B2B SaaS | 31% | 31% | 33% | 25% |
| AI products | 21% | 23% | 22% | 37% |
| Ecommerce | 20% | 21% | 23% | 25% |
| Fintech: banking | 20% | 24% | 36% | 25% |
| Fintech: wealth management | 31% | 24% | 29% | 38% |
| Fintech: blockchain/crypto | 31% | 32% | 31% | 23% |
| Fintech: insurance | 27% | 16% | 20% | 27% |
| Fintech: alt financing | 18% | 20% | 21% | 32% |

Mixpanel explicitly states that B2B SaaS at 31% **supersedes the long-repeated "40% is good" industry standard**. Separately, [Mixpanel, 18 Nov 2024](https://mixpanel.com/blog/what-is-a-good-stickiness-metric/) notes that 20% is "widely considered to be a strong stickiness value in the industry" while declining to endorse it as a bar, and warns that identical stickiness percentages can represent completely different user behaviors.

For consumer social, the only sourced data point I could verify is [a16z / Li Jin and Andrew Chen, 6 Aug 2018](https://a16z.com/the-power-user-curve-the-best-way-to-understand-your-most-engaged-users/): Facebook had **60%+ of MAU returning daily**.

Category figures circulating for gaming (20–50%), messaging (50%+), and consumer social (20–50%) appear in secondary aggregators but I could not trace them to a primary report. Treat as `UNVERIFIED`.

**traps:**
1. **It is not a universal quality bar and applying it as one is the most common misuse in this family.** A tax-prep product with 3% DAU/MAU is performing exactly as designed, because the job occurs once a year with a compressed filing window. An annual-review HR tool, a mortgage servicer, a will-writing app, a travel-booking product: all of these have low DAU/MAU by construction. Grading them against a 20% bar produces the wrong roadmap (frequency gimmicks) instead of the right one (depth and completion within the natural event).
2. **The ceiling is set by the workweek in B2B.** Judging a five-day product on a seven-day denominator bakes in a 29% penalty.
3. **A single ratio hides bimodality.** 20% stickiness can mean "20% of users come daily and 80% come once" or "every user comes six days a month." Those demand opposite roadmaps. This is exactly why the power user curve (metric 7) exists.
4. **It can rise while the business declines.** Churn out the casual base and DAU/MAU goes up. A rising stickiness ratio with falling MAU is usually bad news being reported as good news.
5. **Numerator/denominator definition mismatch.** DAU on app-open over MAU on key-action is a nonsense ratio, and it happens constantly when two teams own the two numbers.
6. **Averaging DAU across a month that contains a marketing spike** inflates the ratio for a reason unrelated to habit.

- **related:** Natural frequency (2), Power user curve (7), Product Engagement Score (22), Retention (cross-family).

---

### 4. Active Accounts vs Active Users

- **applies_to:** b2b primarily, plus consumer products with shared/household entities
- **definition:** The count of distinct customer organizations (or households, or devices) with qualifying activity in a window, as distinct from the count of individual humans.
- **formula_variants:**
  - **Any-user account activity:** account is active if ≥1 user was active. Most permissive, most common, least informative.
  - **Threshold account activity:** account is active if ≥N distinct users were active, or if activity exceeded X actions. Right when you need a signal that correlates with renewal.
  - **Weighted account activity:** account activity score weighted by seat count or contract value, so a 500-seat account doesn't count the same as a 3-seat account.
  - **Account penetration rate:** active users in the account ÷ provisioned seats in the account. This is the version that predicts renewal and expansion. See metric 24.
  - **Admin-active vs end-user-active:** separating whether the buyer is active from whether the users are. An account where only the admin logs in is a churn candidate wearing an "active" badge.
- **inputs:** Event stream with a reliable account/organization ID joined to CRM (HubSpot/Salesforce) for seat counts, contract value, and renewal date. Requires the analytics identity model to support a group/company dimension, which many implementations bolt on late and badly.
- **application:** Renewal risk, expansion targeting, PQA scoring, and the correct denominator for B2B health reporting. Board-level B2B reporting that leads with user counts instead of account counts is reporting a number the business does not sell.
- **benchmark:** `NO SOURCED BENCHMARK FOUND` for active-account rate as a standalone published benchmark. The adjacent sourced data is license utilization (metric 23).
- **traps:**
  1. **Free-tier and internal accounts pollute the count.** Your own employees, sandbox tenants, and partner accounts are usually in the same events table.
  2. **Aggregating users up to accounts hides concentration.** A 200-seat account with 3 active users looks identical to a 3-seat account with 3 active users on a user-count basis.
  3. **Account ID is frequently missing or wrong** for self-serve signups that later get merged into an enterprise contract, which breaks historical account-level trends.
  4. **"Active account" that counts any activity is nearly always ~100%**, which is why it looks healthy and predicts nothing.
- **related:** Seat utilization (23), Account penetration / multiplayer rate (24), PQA (21), Customer health score (25), NRR (monetization family).

---

## SECTION B: ENGAGEMENT DISTRIBUTION

---

### 5. Power User Curve (L30 / L28 / L7 Engagement Histogram)

- **applies_to:** both
- **definition:** A histogram showing, for a given period, how many users were active on exactly 1 day, 2 days, and so on up to every day in the period, revealing the full distribution of engagement rather than its average.
- **formula_variants:**
  - **L30 (monthly):** bucket users by number of active days in a trailing 30-day window. Right for daily-use consumer products.
  - **L28:** same, over 28 days. Preferred where day-of-week composition would otherwise distort month-to-month comparison.
  - **L7 (weekly):** bucket by active days in trailing 7 days. Right for B2B and productivity, where the meaningful shape peaks at 5.
  - **Core-action L-curve:** built on a key action rather than app-open. This is the version that matters. a16z explicitly notes it can be customized to whatever action defines your product.
  - **Normalized (percent of MAU) vs absolute counts:** percent-of-MAU is right for comparing periods; absolute counts are right for seeing whether the power tail is growing in real terms.
  - **Stacked-by-cohort L-curve:** shows whether new cohorts are landing in the power buckets or only the tail.
- **inputs:** Per-user daily activity flags over the window. Trivially computable in SQL from an events table, natively supported in Amplitude and Mixpanel.
- **application:** Tells you whether you have a hardcore habitual segment or a broad shallow base, which determines whether growth investment should go into deepening (converting 3-day users to 10-day users) or into acquiring more of the segment that already lands in the power buckets.

**benchmark:** From [a16z, Li Jin and Andrew Chen, 6 Aug 2018](https://a16z.com/the-power-user-curve-the-best-way-to-understand-your-most-engaged-users/), the sourced *shapes* rather than numeric bars:

| Shape | Meaning | Appropriate for |
|---|---|---|
| "Smile" (bars high at 1 day AND high at 30 days) | A real habitual core exists alongside a casual base | Ad-supported social, messaging. Facebook exemplifies it with 60%+ of MAU daily |
| Left-weighted (mode at 1 day, steep decline) | Almost everyone uses it once a month | Acceptable for investment platforms and similar low-frequency products |
| Workweek peak (mode at 5 days on an L7) | Users treat it as a work tool | Normal and good for B2B SaaS |

No published percentile bars for "what share of MAU should sit at 30/30." `NO SOURCED NUMERIC BENCHMARK FOUND` beyond the Facebook figure.

**traps:**
1. **Built on app-opens, it flatters push-heavy products.** A notification-driven open registers as an active day.
2. **New-user dilution.** A user who signed up on day 28 can have at most 3 active days, so a fast-growing product will always look left-weighted. Restrict to users with full-window tenure, or split by cohort.
3. **A beautiful smile can coexist with a dying business** if the power segment is small and shrinking while the casual base churns. Read it alongside absolute counts and growth accounting.
4. **The "power user trap"** (Reforge has a piece under this name; I could not fetch the article, so treat the specific argument as `UNVERIFIED SECONDARY`): optimizing the roadmap for the 30/30 segment produces features that make the product worse for the 1-to-5-day majority who represent the growth headroom.
5. **L7 and L30 are not interchangeable.** A product can look healthy on L7 and terrible on L30 if usage is bursty (heavy for one week a month).
- **related:** DAU/MAU (3), Power user ratio (6), Natural frequency (2), Depth of usage (12).

---

### 6. Power User Ratio

- **applies_to:** both
- **definition:** The share of the active base that meets a defined high-engagement threshold, collapsing the power user curve into a single trackable number.
- **formula_variants:**
  - **Days-active threshold:** users active ≥N days in the period ÷ MAU. Common thresholds are ≥20/30 days (consumer daily) or ≥4/5 days (B2B weekly). No industry standard exists for N, and practitioners pick it to suit their curve.
  - **Action-volume threshold:** users above the Nth percentile of core-action volume ÷ active users. Right when frequency matters less than output (creation tools, marketplaces).
  - **Composite threshold:** meets both a frequency and a breadth condition (e.g. active 15+ days AND used 4+ features). Most predictive of retention in practice, hardest to explain to a board.
  - **Revenue-weighted power ratio:** share of revenue or ARR attributable to the power segment. This is the version that survives the "so what" question.
- **inputs:** The L-curve data plus a documented threshold decision. Optionally joined to revenue.
- **application:** Single-number tracking of whether the habitual core is growing. Feeds segmentation for lifecycle marketing, and identifies the lookalike target for acquisition.
- **benchmark:** `NO SOURCED BENCHMARK FOUND`. There is no published cross-industry power user ratio because the threshold is arbitrary and product-specific. Related sourced concentration data: [Amplitude 2025 Product Benchmark Report](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf) finds 10% of products account for 79% of all user engagement (concentration *across* products, not within one).
- **traps:**
  1. **The threshold is chosen after seeing the data**, which invites picking the cut that makes the number look best. Set it once, from the natural frequency, and freeze it.
  2. **It moves for compositional reasons.** Killing a low-quality acquisition channel raises the power user ratio without a single user changing behavior.
  3. **Reported without the absolute count**, a rising ratio on a shrinking base reads as progress.
- **related:** Power user curve (5), DAU/MAU (3), Retention (cross-family), Revenue concentration (monetization family).

---

### 7. Engagement Growth Accounting and the Quick Ratio

- **applies_to:** both
- **definition:** A decomposition of the change in active users into new, retained, resurrected, and churned components, with the Quick Ratio expressing how many active users are gained for every one lost.
- **formula_variants:**
  - **Identity:** `MAU(t) = New(t) + Retained(t) + Resurrected(t)`, and `MAU(t) − MAU(t−1) = New(t) + Resurrected(t) − Churned(t)`.
  - **Quick Ratio (Social Capital / Jonathan Hsu):** `[New(t) + Resurrected(t)] ÷ Churned(t)`. Below 1.0 means the active base is shrinking regardless of how good acquisition looks.
  - **Revenue growth accounting variant:** substitutes expansion and contraction for the binary active flag. Applies to MRR/ARR, not MAU, because MAU is binary (a user is active or not).
  - **DAU-level or WAU-level growth accounting:** same decomposition on a shorter window, right for daily-use products where monthly is too coarse.
  - **Retention-rate variant:** `Retained(t) ÷ MAU(t−1)` reported alongside, so you can see whether the ratio is being propped up by resurrections.
- **inputs:** Per-user active flags by period, going back far enough to distinguish "resurrected" (previously active, then gone, now back) from "new." Sources: warehouse SQL, or native growth-accounting views in Amplitude.
- **application:** The correct replacement for staring at an MAU line. Tells you whether a flat MAU is a healthy steady state or a leaky bucket being refilled by paid acquisition, which is a completely different diagnosis with a completely different fix.
- **benchmark:** From [Amplitude's growth accounting write-up, 3 Dec 2019](https://amplitude.com/blog/growth-accounting), attributing the framework to Jonathan Hsu (Social Capital, later Tribe Capital, previously Facebook): a Quick Ratio below 1.0x means total MAU must be shrinking, and "most consumer applications have weak retention, which results in a quick ratio of just above 1." Primary source: [Diligence at Social Capital Part 1: Accounting for User Growth](https://medium.com/swlh/diligence-at-social-capital-part-1-accounting-for-user-growth-4a8a449fddfc). No published percentile distribution exists, so `NO SOURCED PERCENTILE BENCHMARK FOUND`.
- **traps:**
  1. **Resurrection is often manufactured.** A re-engagement email blast produces a spike of resurrected users who churn again next period, temporarily rescuing the Quick Ratio. Look at resurrected-user *second-period* retention.
  2. **The "churned" definition inherits every problem from the active definition.** A user is only churned relative to the window, so a low-frequency product will show enormous fake churn on a monthly window.
  3. **A Quick Ratio above 1 with declining retained-user count** means you are growing on new and resurrected while the core erodes.
  4. **Very early-stage products have meaningless Quick Ratios** because there is almost no base to churn from.
- **related:** Active users (1), Retention (cross-family), Product Engagement Score (22, uses Quick Ratio as its growth component), Resurrection rate (retention family).

---

## SECTION C: ACTIVATION AND ONBOARDING

---

### 8. Activation Rate

- **applies_to:** both
- **definition:** The share of new signups (or new installs) who reach a defined milestone that indicates they have experienced the product's core value.

**formula_variants.** This metric has **no standard definition and the industry is not close to one**. Every variant below is used by credible practitioners and vendors, and they produce wildly different numbers for the same product:

| Variant | Formula | When it's right | Who uses it |
|---|---|---|---|
| Milestone completion | Users reaching the defined activation event ÷ new signups, within window W | The default for B2B SaaS and PLG. Requires you to have identified the right event first. | Userpilot, OpenView, most PLG teams |
| Return-based | Users who return on day N after first use ÷ new users in cohort | Consumer mobile, where "value" is unobservable but return behavior proxies it | **Amplitude defines activation exactly this way** in its Product Benchmark Report (day-1, day-7, day-14 return) |
| Multi-condition | Completing K of M setup + usage conditions | Products where value requires several prerequisites (connect data source AND invite teammate AND run first report) | Common in data/infra tooling |
| Habit-moment | Performing the core action X times in Y days (Facebook-style "N friends in M days") | Products where repetition, not a single event, signals value | The folklore standard, see traps |
| Setup vs value activation (two-stage) | Stage 1 = configuration complete; Stage 2 = first value received | Products with real setup burden. Separating them stops setup failure from being confused with value failure. | Recommended practice, no single canonical source |
| Account-level activation (B2B) | Accounts reaching the milestone ÷ accounts created | B2B, where individual-user activation is the wrong unit | See PQA (21) |
| Time-bounded vs eventual | Within 7 days vs ever | Time-bounded is correct for cohort comparison; "eventual" inflates and is uncomparable across cohorts of different ages | Practitioners disagree, and the disagreement is usually unstated |

- **inputs:** New-user cohort definition, an activation event definition (the hard part), and a window. Sources: product analytics plus a signup source of truth. In B2B, joined to CRM to exclude test/internal signups.
- **application:** The highest-leverage lever in the funnel because it is upstream of every retention and monetization metric. Activation is also the correct denominator for judging acquisition channel quality (a channel with high signups and low activation is buying junk).

**benchmark:** Segment carefully, because the sources are measuring different things.

*Milestone-completion definition, B2B SaaS:*

| Segment | Activation rate | Source |
|---|---|---|
| All B2B SaaS (average) | 37.5% | [Userpilot User Activation Rate Benchmark Report 2024](https://userpilot.com/blog/user-activation-rate-benchmark-report-2024/), n=62 B2B companies |
| All B2B SaaS (median) | 37% | Same |
| Product-led growth companies | 34.6% | [Userpilot Product Metrics Benchmark Report 2024, published 16 June 2024](https://userpilot.com/blog/product-metrics-benchmark-report/), n=547 SaaS companies |
| Sales-led growth companies | 41.6% | Same |
| Best-in-class PLG (freemium) | 20–40% "normal" | [OpenView 2022 Product Benchmarks, published 15 June 2022](https://openviewpartners.com/blog/your-guide-to-product-led-growth-benchmarks/), 450+ software companies |

*Return-based definition (Amplitude), all industries, [Amplitude 2025 Product Benchmark Report](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf), 2,600+ companies, data Sept 2023–Sept 2024:*

| Window | 50th pct | 75th pct | 90th pct |
|---|---|---|---|
| Day 1 return | ~5% | ~13% | ~21% |
| Day 7 return | 2% | ~6.5% | ~12% |
| Day 14 return | ~1.5% | ~4.7% | ~9% |

Amplitude's stated rule: **getting 7% of the original cohort to return on day 7 puts you in the top 25% for activation** ([Amplitude, 30 Sept 2025](https://amplitude.com/blog/7-percent-retention-rule)). Enterprise day-7 activation is 12.4% at the 90th percentile against a 2.1% median. And 69% of top performers in day-7 activation were also top performers in three-month retention.

**Note the definitional chasm:** 37% (Userpilot, milestone) and 2% (Amplitude, day-7 return) are both "median activation rate" in 2024–2025 data. They are not comparable. Anyone quoting an activation benchmark without naming the definition is quoting noise.

Adoption of the metric itself: 76% of freemium companies and 58% of free-trial companies measure activation at all (OpenView 2022).

**traps:**
1. **Choosing the activation event by assertion rather than analysis is the single most damaging error in this family**, because activation sits upstream of everything. Pick the wrong event and every retention cohort, every onboarding experiment, and every channel-quality judgment downstream is measuring the wrong thing, and you will not find out for two quarters.
2. **Survivorship/selection bias in event selection.** The users who complete *any* action are the users who were going to retain anyway. Correlation between "invited a teammate" and retention does not mean invitations cause retention, it may mean engaged people do both. See metric 9 for the empirical protocol.
3. **Denominator gaming.** Excluding "low-intent" signups from the denominator raises activation without changing anything. Common variants: dropping free-email-domain signups, dropping users who never verified email, dropping bounce traffic.
4. **Window gaming.** Moving from a 7-day to a 30-day activation window mechanically raises the rate.
5. **Bar-lowering.** Redefining activation from "ran first report" to "viewed dashboard" is a legitimate-sounding change that doubles the number and destroys the time series.
6. **Activation improves while retention does not.** If your activation event is not actually the value moment, you can optimize onboarding to 60% activation and see zero movement in month-3 retention. That result is the diagnostic, and it means the event is wrong.
7. **B2B activation measured on the individual user** misses that the account is the buying unit.
- **related:** Aha moment identification (9), Time to value (10), Onboarding funnel completion (12), Retention (cross-family), PQL (20), Free-to-paid conversion (monetization family).

---

### 9. Aha Moment / Activation Event Identification

- **applies_to:** both
- **definition:** Not a metric but the analytical procedure that produces the input to metric 8, identifying which early in-product behavior genuinely causes durable retention rather than merely correlating with it.

**formula_variants** (these are methods, ordered from weakest to strongest, and you should run them in sequence):

1. **Assertion / founder intuition.** No formula. Fast, free, usually wrong. Acceptable only as a hypothesis generator.
2. **Retention lift by behavior (the correlation screen).** For every candidate early behavior *b*, compute `Retention(D30 | performed b in first 7 days) − Retention(D30 | did not perform b)`. Rank by lift. This is what most teams call "finding the aha moment" and it is only step one.
3. **Threshold search / kink detection.** For behaviors with a count (friends added, files uploaded, messages sent), plot D30 retention against the count in the first N days and look for the inflection where the curve flattens. The count at the kink is the candidate magic number. This is the Facebook-style "N actions in M days" construction.
4. **Multivariate control.** Regress retention on the candidate behavior while controlling for acquisition channel, device, geography, tenure, and total early activity volume. Behaviors that lose their lift once you control for total activity were never causal, they were proxies for "this person was engaged."
5. **Causal validation (mandatory before you commit).** Run an experiment that *induces* the behavior in a random subset (onboarding prompt, forced step, incentive) and measure the retention delta in the induced group. If retention does not move, the behavior was a symptom, not a cause. Practitioners routinely skip this step, and it is the reason so many activation programs produce no retention improvement.
6. **Propensity-matched observational check** where an experiment isn't feasible: match users who did and did not perform the behavior on pre-behavior covariates, then compare retention. Weaker than an experiment, far better than raw correlation.

- **inputs:** Event stream with full early-lifecycle behavior per user, retention outcomes at a horizon at least 3x the natural frequency, acquisition metadata for controls, and experimentation infrastructure for step 5.
- **application:** Produces the activation event definition, the onboarding checklist contents, the lifecycle messaging targets, and the PQL scoring criteria. Everything in Sections C and E depends on getting this right.
- **benchmark:** Not applicable, this is a method. Sourced framing: Amplitude instructs teams to "reverse-engineer your best users" by using cohort analysis to uncover common behaviors, paths and milestones that correlate with activation, then encourage those behaviors in other users ([Amplitude 2025 Product Benchmark Report](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf)). Note that even Amplitude's published guidance stops at correlation and does not prescribe the causal validation step.

**traps:**
1. **The famous magic numbers are folklore, not published research.** "Facebook: 7 friends in 10 days" is attributed to Chamath Palihapitiya and repeated across hundreds of secondary blogs, but I could not locate a primary published source, and at least one analysis ([Mode, "Facebook's Aha Moment Was Simpler Than You Think"](https://mode.com/blog/facebook-aha-moment-simpler-than-you-think/)) argues the real story differed from the standard telling. The same applies to the widely repeated Twitter "30 follows," LinkedIn connection thresholds, Slack "2,000 messages," and Dropbox "one file in one folder on one device." Treat all of them as `POORLY SOURCED FOLKLORE`. Do not cite them as evidence, and above all do not copy someone else's magic number into your product.
2. **Reverse causality is the default state of this analysis.** Users who will retain do more of everything. Any behavior you measure will correlate with retention.
3. **Collider bias from conditioning on activity.** If you only analyze users who were active in week one, you have conditioned on a variable downstream of both the behavior and retention.
4. **Optimizing the metric instead of the mechanism.** Once "invite a teammate" is the activation event, teams add aggressive invite prompts. Invites go up, activation goes up, retention does not, because the users being nudged into inviting are not the users for whom invitations created value.
5. **One aha moment for a product with multiple use cases** is usually wrong. Segment by primary use case or persona and expect different activation events per segment.
6. **Re-running the analysis annually is necessary.** The aha moment moves as the product and the user mix change.
- **related:** Activation rate (8), Time to value (10), Retention (cross-family), North Star metric selection.

---

### 10. Time to Value (TTV) and Time to First Value (TTFV)

- **applies_to:** both
- **definition:** The elapsed time from the start of the customer relationship to the moment the user or account first receives the product's core benefit.
- **formula_variants:**
  - **TTFV, signup to first activation event:** median elapsed time. Right for self-serve.
  - **TTV, purchase to first value:** for sales-led B2B, the clock starts at contract signature, not at signup, and includes implementation.
  - **Time to *full* value / time to steady state:** signup to the point where usage stabilizes at the natural frequency. Longer, more meaningful, harder to measure.
  - **Active-time TTV:** total in-product time spent before reaching value, excluding calendar gaps. Right when you want to measure product friction rather than user availability.
  - **Median vs mean:** always report median. Means are destroyed by the long tail of users who activate three months late.
  - **Percentile TTV (p50/p75/p90):** the correct full reporting, because p90 TTV is where your churn risk lives.
  - **Conditional on activation:** TTV computed only over users who eventually activated. Note this is a *survivor* statistic and will improve when your activation rate gets worse.
- **inputs:** Signup or contract timestamp, activation event timestamp, and an agreed definition of value. Sources: product analytics joined to CRM (for the sales-led clock start) and to billing.
- **application:** Onboarding investment prioritization, sales-cycle and implementation SLA design, and in B2B the input to time-to-first-renewal risk. Amplitude frames the entire activation section of its benchmark report around speeding up time to value.
- **benchmark:** From [Userpilot Product Metrics Benchmark Report 2024, published 16 June 2024](https://userpilot.com/blog/product-metrics-benchmark-report/), n=547 SaaS companies: product-led companies **1 day 12 hours**, sales-led companies **1 day 11 hours**. Userpilot separately reports an overall figure of roughly 1 day 12 hours 23 minutes; a second figure of 1 day 1 hour 54 minutes also circulates from the same report family, and the source material is ambiguous about which is the mean and which the median, so treat the precise minutes as `UNCERTAIN` and the order of magnitude (roughly one to one and a half days for self-serve SaaS) as the usable signal. Claims circulating that top-quartile teams reach first value in under five minutes appear in secondary aggregators and I could not verify them against a primary report, so `UNVERIFIED`.

  For consumer mobile, `NO SOURCED TTV BENCHMARK FOUND`.
- **traps:**
  1. **The clock start is undefined and everyone picks a flattering one.** Signup, first login, contract signature, kickoff call, and "first meaningful session" give very different numbers.
  2. **Mean TTV is meaningless.** One user who activates on day 90 moves the mean more than fifty users who activate in an hour.
  3. **Survivorship.** TTV measured only on activated users falls when activation falls, because the slow activators disappear from the calculation. Always report TTV alongside activation rate.
  4. **Optimizing TTV by lowering the value bar.** Redefining "value" as something trivially reachable makes TTV look excellent and means nothing.
  5. **In B2B, TTV is often owned by implementation, not product**, so product-side TTV improvements can be invisible in the customer's lived experience.
  6. **Calendar time versus working time.** A user who signs up Friday evening has a 60-hour TTV floor that has nothing to do with your product.
- **related:** Activation rate (8), Time to first key action (11), Onboarding funnel completion (12), Month-1 retention (retention family), Customer health score (25).

---

### 11. Time to First Key Action

- **applies_to:** both
- **definition:** Elapsed time from first session start to the first instance of a specific named core action, measured for that one action rather than for an abstract notion of value.
- **formula_variants:**
  - **Within-first-session TTFKA:** seconds from session start to the action, for users who complete it in session one. Right for measuring raw product friction.
  - **Cross-session TTFKA:** calendar time to the action regardless of session count. Right for measuring the total onboarding journey.
  - **Sessions-to-first-key-action:** count of sessions rather than time. Often more actionable than time because it maps directly to onboarding-flow design.
  - **Per-action TTFKA panel:** measured separately for each of 3 to 5 core actions, which produces the friction map rather than a single number.
- **inputs:** Session boundaries plus core-action event timestamps. Same systems as metric 10.
- **application:** Pinpoints which specific step in the product is slow, as opposed to TTV which tells you only that the whole thing is slow. Directly drives onboarding UI work, empty-state design, and default/template strategy.
- **benchmark:** `NO SOURCED BENCHMARK FOUND`. This metric is too product-specific for cross-industry benchmarking and no vendor publishes it.
- **traps:**
  1. **Conflating it with TTV.** First key action is not necessarily value received. A user can complete the action and get nothing out of it.
  2. **Ignoring users who never complete it**, which turns the metric into a survivor statistic.
  3. **Session boundary definition** (30 minutes of inactivity by default in most tools, matching GA4) materially changes the within-session version.
- **related:** Time to value (10), Activation rate (8), Onboarding funnel completion (12), Session length (14).

---

### 12. Setup Completion Rate

- **applies_to:** both, heavily weighted to b2b
- **definition:** The share of new users or accounts that finish the configuration prerequisites the product needs before it can deliver value at all.
- **formula_variants:**
  - **Binary all-steps:** accounts completing every required setup step ÷ accounts started. Right when setup is genuinely all-or-nothing (data connection, billing, domain verification).
  - **Weighted partial:** sum of completed steps weighted by necessity ÷ total weight. Right when partial setup delivers partial value.
  - **Critical-path only:** completion of the minimum viable subset. Right for diagnosing whether your "required" steps are actually required.
  - **Time-bounded (within 7/14/30 days):** correct for cohort comparison.
  - **Account-level vs user-level:** in B2B, setup is usually an admin action, so account-level is the correct unit and user-level will badly understate it.
- **inputs:** Instrumented setup steps with a canonical ordering, plus account/user identity. Sources: product analytics, or an onboarding platform (Userpilot, Appcues, Pendo, Chameleon).
- **application:** Isolates configuration friction from value friction. If setup completion is 80% and activation is 25%, your problem is the product, not the onboarding. If setup completion is 30%, you have not yet earned the right to ask about activation.
- **benchmark:** `NO SOURCED BENCHMARK FOUND` for setup completion specifically. The nearest sourced proxy is onboarding checklist completion (metric 13).
- **traps:**
  1. **Steps that are required by the business but not by the user** (sales qualification questions, marketing consent, profile enrichment) are counted as setup and depress the number for reasons unrelated to product value.
  2. **Counting a step as complete when it was skipped.** Skippable steps marked complete on skip make the funnel look healthy.
  3. **Admin-versus-user confusion in B2B.** The admin completes setup, the end users never see it, and user-level setup completion reads as catastrophic.
  4. **Setup completion improves when you delete steps**, which is often the right action but should not be reported as a rate improvement without noting the definition change.
- **related:** Onboarding funnel completion (13), Activation rate (8), Time to value (10).

---

### 13. Onboarding Funnel Completion Rate

- **applies_to:** both
- **definition:** The share of users who traverse the full guided onboarding sequence, along with the step-by-step drop-off that shows where they leave.
- **formula_variants:**
  - **End-to-end completion:** users finishing the last step ÷ users entering the first. The headline.
  - **Step-wise conversion:** completion at step N ÷ entrants to step N. The diagnostic, and the version you actually act on.
  - **Checklist completion:** for products using an explicit onboarding checklist widget, share of users completing all checklist items. This is what Userpilot benchmarks.
  - **Dismissal-adjusted:** excluding users who explicitly dismissed onboarding, on the argument that they opted out rather than failed. Practitioners disagree, and dismissal is often itself a failure signal.
  - **Time-to-complete alongside completion:** a 70% completion rate over 30 days is a different product than 70% in one session.
- **inputs:** Instrumented onboarding steps, entry and exit events, dismissal events. Sources: onboarding platform or product analytics.
- **application:** The most directly actionable metric in this section because step-wise drop-off names the exact screen to fix.
- **benchmark:** From [Userpilot Product Metrics Benchmark Report 2024, published 16 June 2024](https://userpilot.com/blog/product-metrics-benchmark-report/), n=547 SaaS companies:

| Segment | Onboarding checklist completion |
|---|---|
| All SaaS | 19.2% |
| Product-led growth companies | 19% |
| Sales-led growth companies | 22.1% |
| Fintech and insurance vertical | 24.5% |

Userpilot also reports that 80% of companies achieving activation rates above 50% used videos, GIFs or animations in their onboarding flows. That is a correlation from a vendor with a commercial interest in onboarding tooling, so treat it as suggestive, not causal.

- **traps:**
  1. **Completion is not value.** A user can complete every checklist item and never return. Always pair with day-7 or day-30 retention for completers versus non-completers.
  2. **The 19% benchmark is deceptively low-sounding**, and chasing it upward by making onboarding shorter or more trivial improves the metric while doing nothing for retention.
  3. **Selection bias in who enters onboarding.** If onboarding only triggers for users who reach a certain screen, the denominator is already filtered.
  4. **Forced onboarding inflates completion** and increases early churn.
  5. **Onboarding completion and activation are often conflated**, which hides the case where users complete your tour and still fail to reach value.
- **related:** Setup completion (12), Activation rate (8), Time to value (10), Second session rate (14).

---

### 14. Second Session Rate / Day-1 Return Rate

- **applies_to:** both, strongest signal in consumer mobile
- **definition:** The share of new users who come back for at least one more session after their first.
- **formula_variants:**
  - **D1 return:** returned on the calendar day after first use ÷ new users. The mobile industry convention.
  - **Any-second-session within N days:** more forgiving, right for products with a natural frequency longer than a day.
  - **Session-count-based:** users reaching ≥2 sessions ÷ new users, ignoring calendar timing.
  - **Amplitude's day-1 activation:** identical construction, labeled as activation rather than as a return rate. This naming collision is a real source of confusion.
- **inputs:** Session start events with new-user cohort assignment.
- **application:** The fastest available read on whether the first experience worked, available within 48 hours of a change instead of 30 days. Primary early-signal metric for onboarding experiments.
- **benchmark:** From [Amplitude 2025 Product Benchmark Report](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf) (2,600+ companies, data Sept 2023–Sept 2024), day-1 return: 50th percentile ~5%, 75th ~13%, 90th ~21%. The median product loses roughly 95% of new users after day one.
- **traps:**
  1. **Push notifications drive D1 return artificially.** A day-1 push campaign can double this number without any product improvement, and the effect does not persist to day 7.
  2. **Calendar-day versus 24-hour windows** differ substantially for users who sign up late at night.
  3. **Attributing it to onboarding when it is really acquisition quality.** Incentivized installs return at near zero regardless of product.
- **related:** Activation rate (8), Retention curve (retention family), Session count (15).

---

## SECTION D: DEPTH AND BREADTH OF USAGE

---

### 15. Feature Adoption Rate

- **applies_to:** both
- **definition:** The share of the relevant user or account population that uses a given feature within a defined window.
- **formula_variants:**
  - **Breadth (reach):** users who used feature F ÷ active users in window. Pendo's "how many users have used the feature?"
  - **Adoption among eligible:** restricted denominator to users who can actually access the feature (correct plan tier, correct permission, correct platform). This is almost always the right denominator and almost never the one used.
  - **Depth (intensity):** average uses of F per adopter per window. Distinguishes "tried once" from "uses daily."
  - **Feature stickiness:** feature DAU ÷ feature MAU. Identifies which features are habitual versus occasional.
  - **Time to adopt:** median days from feature availability (or from user signup) to first use. Pendo tracks this as a distinct dimension.
  - **Duration of adoption / retained adoption:** share of adopters still using F 30 or 90 days later. Separates a successful launch from a durable feature.
  - **Core Event share (Pendo's method):** the share of tagged features that generate 80% of click volume, which is a portfolio-level measure of how concentrated usage is rather than a per-feature rate.
  - **Account-level adoption (B2B):** accounts with ≥1 user using F ÷ accounts. Right for renewal and expansion analysis.
- **inputs:** A feature taxonomy (tagged features or a curated event set), entitlement data to build the eligible denominator, and plan/permission metadata. Sources: Pendo, Amplitude, Mixpanel, Heap, joined to the entitlements table.
- **application:** Roadmap prioritization, deprecation decisions, in-app guidance targeting, packaging and tiering decisions, and identifying which features to feature in expansion motions.

**benchmark:**

| Measure | Figure | Source |
|---|---|---|
| Core feature adoption rate, product-led SaaS | 24.3% | [Userpilot Product Metrics Benchmark Report 2024, 16 June 2024](https://userpilot.com/blog/product-metrics-benchmark-report/), n=547 |
| Core feature adoption rate, sales-led SaaS | 26.7% | Same |
| Core feature adoption rate, HR vertical | 31% | Same |
| Share of features generating 80% of click volume (average) | 6.4% | [Pendo feature adoption benchmarking, 1 July 2024](https://www.pendo.io/pendo-blog/feature-adoption-benchmarking/) |
| Same, top 10% of companies | 15.6% | Same |
| Same, media vertical | 4.9% | Same |
| Same, companies under 200 employees | 7.4% | Same |

Portfolio concentration, from the primary PDF of the [Pendo 2019 Feature Adoption Report](https://go.pendo.io/rs/185-LQW-370/images/2019%20Feature%20Adoption%20Report%20Digital.pdf) (Suja Thomas, 5 Feb 2019, 615 Pendo subscriptions from customers using Pendo more than a year, three-month window):

- 12% of features generate 80% of average daily usage volume
- **80% of features are rarely or never used**
- Full split: Frequent (top 80% of usage) 12%, Moderate (next 15%) 8%, Rare (last 5%) 56%, **Never used 24%**
- Pendo extrapolated this to $29.5B of public-cloud R&D spent on rarely-or-never-used features ($175.8B 2018 cloud revenue × 21% average R&D × 80%). That extrapolation is a chain of assumptions, treat the $29.5B as a marketing figure and the 80% as the real finding.

**traps:**
1. **The denominator is almost always wrong.** Counting a Enterprise-only feature against all users produces a fake-low adoption rate that gets features killed for the wrong reason.
2. **"Adoption" that means one click.** A user who opened a feature once and never returned is counted identically to a daily user. Always report breadth and depth together.
3. **Feature tagging drift.** Adding tags to sub-elements of an existing feature splits its usage and makes adoption appear to fall.
4. **Pendo's own definitional shift.** The 2019 report says 12% of features drive 80% of usage; the 2024 blog says 6.4%. These are not directly comparable (different populations, different tagging conventions, different years), and reading them as a decline would be wrong.
5. **New-feature launch spikes.** Announcement-driven trial inflates adoption for two weeks. Only retained adoption at day 30 tells you anything.
6. **The Standish Group "64% of features are never used" claim** is widely repeated in this space. I could not locate a verifiable primary source for it in this research. Treat as `UNVERIFIED`, and use the Pendo figure instead, which has a documented methodology.
- **related:** Breadth of usage (16), Depth of usage (17), Feature stickiness, Product Engagement Score (22), Seat utilization (23), Packaging and tiering (monetization family).

---

### 16. Breadth of Usage (Feature Breadth per User or Account)

- **applies_to:** both
- **definition:** How many distinct parts of the product a single user or account uses, measuring whether the customer is using a slice or the whole thing.
- **formula_variants:**
  - **Distinct feature count:** average number of distinct tagged features used per active user per window. Pendo's "Adoption" component of PES is exactly this, using Core Events.
  - **Module or product-line breadth:** distinct modules used ÷ modules entitled. Right for multi-product suites and the correct input to cross-sell targeting.
  - **Breadth index (normalized):** distinct features used ÷ distinct features available to that user. Comparable across plan tiers.
  - **Weighted breadth:** features weighted by strategic importance or by their correlation with retention, so using three trivial features does not score the same as using three sticky ones.
  - **Account breadth:** union of features used across all users in the account. Right for B2B renewal analysis, because breadth of *account* usage is what makes a product hard to rip out.
- **inputs:** Feature taxonomy plus entitlements plus account rollup. Same systems as metric 15.
- **application:** Predicts switching cost and therefore renewal. Drives cross-sell and in-app education targeting. In B2B, breadth is usually a better renewal predictor than raw login frequency, because breadth is what creates the migration cost.
- **benchmark:** `NO SOURCED BENCHMARK FOUND` for distinct-features-per-user as a published cross-industry figure. Pendo publishes the *method* (average Core Events used per active visitor or account, as the Adoption component of PES) but not a benchmark distribution: [Pendo, Product Engagement Score](https://www.pendo.io/glossary/product-engagement-score-pes/).
- **traps:**
  1. **Breadth is only good if the features deliver value.** Users clicking through many features can indicate confusion and navigation failure rather than depth of adoption.
  2. **Feature-count inflation.** Adding tags to your taxonomy raises average breadth with no behavior change. Freeze the taxonomy or restate history.
  3. **Plan tier confounding.** Enterprise customers have more features available, so raw breadth correlates with price paid rather than with engagement.
  4. **Breadth used as a target** produces roadmaps that push users into features they don't need.
- **related:** Feature adoption (15), Depth of usage (17), PES (22), NRR and cross-sell (monetization family).

---

### 17. Depth of Usage (Core Action Frequency / Actions per Active User)

- **applies_to:** both
- **definition:** How intensively an active user uses the product, expressed as volume of core actions per user per period.
- **formula_variants:**
  - **Core actions per active user:** total core-action events ÷ active users in window. The standard.
  - **Core actions per active *day*:** removes the confound between "uses it more days" and "does more each day." Reporting both separates frequency from intensity, and they have different fixes.
  - **Median rather than mean:** essential, because action volume is extremely long-tailed and the mean tracks your top 1%.
  - **Percentile panel (p25/p50/p75/p90):** the honest full picture.
  - **Value-unit depth:** measured in the product's natural output unit (messages sent, rides taken, reports run, dollars processed, files created) rather than in generic events. Always preferable when a natural unit exists.
  - **Depth relative to plan limit:** actions ÷ contractual limit, which is simultaneously a depth metric and an expansion trigger.
- **inputs:** Core-action event definitions, active-user base, and for the plan-limit variant, entitlement data from billing.
- **application:** Distinguishes a product people rely on from one they check. Drives usage-based pricing design, capacity planning, and the expansion motion. Sarah Tavel's Hierarchy of Engagement frames the first level explicitly around growing users who complete the core action ([Sarah Tavel, 23 March 2016](https://sarahtavel.medium.com/the-hierarchy-of-engagement-5803bf4e6cfa)).
- **benchmark:** `NO SOURCED BENCHMARK FOUND`. Core-action volume is definitionally product-specific and no credible cross-industry benchmark exists. Anyone offering one is selling something.
- **traps:**
  1. **Mean actions per user is dominated by outliers**, including bots and API-driven integrations that fire thousands of events.
  2. **More actions is not always better.** In a support tool, more tickets created means the rest of the product is failing. In a search product, more searches per session means search is not working. Know whether your action is a value signal or a friction signal.
  3. **Generic event counts instead of core actions.** Counting all events rewards chatty instrumentation.
  4. **Depth rises when casual users churn**, so a rising depth metric on a shrinking base is compositional, not real.
- **related:** Breadth of usage (16), Session count (18), Power user curve (5), Usage-based pricing (monetization family).

---

### 18. Session Count and Sessions per User

- **applies_to:** both
- **definition:** How many discrete visits occur, in total and per user, within a period.
- **formula_variants:**
  - **Total sessions:** raw count. Useful only for infrastructure planning.
  - **Sessions per active user per period:** total sessions ÷ active users. The standard engagement read.
  - **Sessions per active day:** total sessions ÷ user-days active. Separates "returns often" from "returns many times a day."
  - **Engaged sessions only:** see metric 20.
  - **Timeout-based session definition:** a session ends after N minutes of inactivity. GA4 default is 30 minutes, configurable up to 7 hours 55 minutes ([Google Analytics Help, GA4 Session](https://support.google.com/analytics/answer/12798876)). Mobile SDKs commonly use 5 minutes or 30 seconds of backgrounding. **These are not comparable across tools.**
  - **Explicit-boundary sessions:** session defined by login/logout or by an explicit task boundary. Right for products where the timeout model misrepresents behavior.
- **inputs:** Session start/end events, or raw events with a session-stitching rule. Sources: GA4, Amplitude, Mixpanel, Adjust/AppsFlyer for mobile.
- **application:** Frequency diagnosis, notification and lifecycle campaign design, and for ad-supported consumer products, the direct input to impression inventory.
- **benchmark:** Reported figures for mobile, via [Business of Apps app-sessions data](https://www.businessofapps.com/data/app-sessions-data/) aggregation (the page returned HTTP 403 on direct fetch, so these come from search-result summaries and I could **not verify against the primary page**, mark `UNVERIFIED`): average daily sessions per user drop from about 1.6 on day one to about 0.22 thereafter; the average user has 30+ apps installed per month. For B2B, `NO SOURCED BENCHMARK FOUND`.
- **traps:**
  1. **The session timeout is a configuration choice, so cross-tool session comparisons are invalid.** A 30-minute timeout and a 5-minute timeout produce very different session counts from identical behavior.
  2. **Background and push-triggered sessions** inflate counts on mobile.
  3. **Poor connectivity fragments one visit into many sessions** as the app foregrounds and backgrounds.
  4. **More sessions can mean worse.** Users repeatedly returning because a task failed is a bug, not engagement.
  5. **Sessions per user is a mean over a long-tailed distribution.**
- **related:** Session length (19), Engaged sessions (20), DAU (1), Power user curve (5).

---

### 19. Session Length / Average Session Duration

- **applies_to:** both
- **definition:** The elapsed time a user spends in the product during a single visit.
- **formula_variants:**
  - **Last-event-minus-first-event:** the standard, and it structurally assigns zero duration to single-event sessions.
  - **Heartbeat/engagement-timer based:** duration accrued from periodic pings while the app is in the foreground. More accurate, requires deliberate instrumentation. GA4's `user_engagement` model works this way.
  - **Active-time only:** excludes idle periods within the session. Right for desktop web where tabs sit open for hours.
  - **Median rather than mean:** essential, the distribution is heavily skewed.
  - **Time-in-app per day per user** rather than per session, which removes the session-boundary problem entirely and is usually the better metric.
- **inputs:** Event timestamps or engagement heartbeats. Sources: GA4, mobile analytics SDKs, Adjust, data.ai/Sensor Tower for market-level data.
- **application:** Ad-inventory forecasting for ad-supported consumer, and content strategy for media. For most SaaS and utility products it is a weak metric that should not be a headline.
- **benchmark:** Reported mobile figures via [Business of Apps app-sessions data](https://www.businessofapps.com/data/app-sessions-data/) aggregation, retrieved through search summaries only (`UNVERIFIED`, primary page 403'd, and note the internal inconsistency): games over 30 minutes per session, finance just over 6 minutes, entertainment reported at 7 minutes in one series, ecommerce declining from 10.04 to 9.6 minutes in 2025, and an all-category average of 4.2 minutes. The entertainment and games figures come from different measurement series and contradict each other on ordering, which is itself the lesson. For B2B SaaS, `NO SOURCED BENCHMARK FOUND`.
- **traps:**
  1. **Longer is not better for most products.** A user spending 12 minutes in a banking app is probably lost. Time-on-task should fall for utility products and rise only for entertainment.
  2. **Single-event sessions get zero duration** under the standard formula, which drags the average down and makes the metric respond to instrumentation density rather than behavior.
  3. **Idle tabs on web** inflate duration enormously without a heartbeat model.
  4. **It is the classic vanity metric of this family**, easy to move (autoplay, infinite scroll, slower flows) and disconnected from value.
- **related:** Session count (18), Engaged sessions (20), Time in product, Depth of usage (17).

---

### 20. Engaged Sessions and Engagement Rate

- **applies_to:** both
- **definition:** Sessions that clear a minimum quality bar, and the share of all sessions that clear it, used to strip out bounces and accidental opens.
- **formula_variants:**
  - **GA4 standard:** a session is engaged if it lasts longer than 10 seconds **or** contains a key event **or** contains at least 2 pageviews/screenviews. The 10-second threshold is configurable per web data stream up to 60 seconds. Engagement rate = engaged sessions ÷ total sessions. ([Google Analytics Help, GA4 Session](https://support.google.com/analytics/answer/12798876))
  - **Custom action-based:** session containing ≥1 core action. Stricter and far more meaningful than the GA4 default, and the version worth using in a product context.
  - **Depth-based:** session with ≥N distinct screens or ≥N actions.
  - **Inverse framing:** bounce rate = 1 − engagement rate, which is how GA4 defines bounce rate now (a definitional change from Universal Analytics that broke every historical comparison).
- **inputs:** Session data with event counts and durations. Sources: GA4 natively, or a custom definition in product analytics.
- **application:** Filters accidental and bot traffic out of engagement reporting, and gives a cleaner denominator for conversion-rate analysis.
- **benchmark:** `NO SOURCED CROSS-INDUSTRY BENCHMARK FOUND` for GA4 engagement rate. The definition is sourced and exact, the benchmark is not.
- **traps:**
  1. **The GA4 default bar is extremely low.** Ten seconds or two pageviews is cleared by almost any real visit, so GA4 engagement rate typically runs high and discriminates poorly.
  2. **"Engaged" in GA4 is a web analytics construct and does not mean engaged with your product.** Using it as a product engagement metric is a category error that happens constantly in marketing-owned reporting.
  3. **The threshold is configurable**, so two properties can report different engagement rates from identical traffic.
  4. **The GA4 bounce-rate redefinition** means pre-GA4 and post-GA4 bounce rates are unrelated numbers.
- **related:** Session count (18), Session length (19), Bounce rate (acquisition family), Activation rate (8).

---

### 21. Retention-Adjusted Engagement (Engagement Weighted by Survival)

- **applies_to:** both
- **definition:** Any construct that combines how much users engage with how long they keep engaging, so that a product with intense but short-lived usage is not scored as equal to one with moderate durable usage.
- **formula_variants:**
  - **Engagement-days per cohort over horizon:** total active days delivered by a cohort in its first 90 days ÷ cohort size. Single number, captures both frequency and survival. My recommended default.
  - **Core actions per acquired user over horizon:** same construction on the value unit rather than on days.
  - **Area under the retention curve (AURC) times average intensity:** AURC gives expected active periods per user, multiplied by actions per active period.
  - **Cohort-flattening test (Sarah Tavel):** rather than a single number, the diagnostic is whether the retention curve flattens to a positive asymptote, which is the condition for durable engagement. ([Sarah Tavel, Hierarchy of Engagement, 23 March 2016](https://sarahtavel.medium.com/the-hierarchy-of-engagement-5803bf4e6cfa))
  - **Amplitude Engagement Matrix:** a two-axis plot of feature adoption breadth against usage frequency, used to classify features as core, power, casual, or dead. Framework, not a single metric.
  - **Pendo PES:** a packaged composite, see metric 22.
- **inputs:** Cohorted activity data over a horizon of at least 90 days, ideally 180.
- **application:** The right metric for comparing acquisition channels and for judging whether a product change created durable value or a temporary spike. Also the honest way to compare two products with different natural frequencies.
- **benchmark:** `NO SOURCED BENCHMARK FOUND` for any composite retention-adjusted engagement measure. This is a construct practitioners build, not one vendors benchmark. The relevant sourced finding is that engagement and retention are **not** substitutes: Amplitude found **no strong relationship** between monthly active user growth and three-month retention, with engagement quartiles distributing almost evenly across retention quartiles ([Amplitude 2025 Product Benchmark Report](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf)). That is the empirical case for why you need a combined measure rather than either one alone.
- **traps:**
  1. **Composite metrics hide which input moved.** Always report the components alongside.
  2. **Horizon choice determines the answer.** A 30-day horizon favors intense short-lived products, a 365-day horizon favors slow-burn ones.
  3. **It requires patience.** You cannot run a two-week experiment against a 90-day construct, so you need a validated leading indicator.
- **related:** Retention curve (retention family), Power user curve (5), Depth of usage (17), PES (22), LTV (monetization family).

---

### 22. Product Engagement Score (PES)

- **applies_to:** both, marketed primarily at b2b
- **definition:** Pendo's packaged composite index combining feature adoption, stickiness, and growth into one 0-to-100 number.
- **formula_variants:**
  - **Pendo standard:** `PES = (Adoption + Stickiness + Growth) ÷ 3`, where **Adoption** is the average number of Core Events used by active visitors or accounts, **Stickiness** is DAU/WAU, DAU/MAU or WAU/MAU, and **Growth** is the Quick Ratio, `(new + recovered) ÷ dropped`. ([Pendo, Product Engagement Score](https://www.pendo.io/glossary/product-engagement-score-pes/))
  - **Account-level PES:** computed on accounts rather than visitors. Correct for B2B.
  - **Custom-weighted variants:** teams re-weight the three components. Once you do this, cross-company comparison is dead.
  - **Segment-level PES:** by plan tier, persona, or vertical, which is far more useful than a single company-wide number.
- **inputs:** Pendo instrumentation with tagged features and Core Events designated, plus account mapping. Reproducible outside Pendo from a warehouse if you replicate the three components.
- **application:** A single dashboard number for executive reporting and for customer success prioritization. Pendo positions it as an objective alternative to NPS because it is behavior-based rather than survey-based, which is a legitimate advantage.
- **benchmark:** `NO SOURCED NUMERIC BENCHMARK FOUND`. Pendo publishes the formula and a directional claim that companies with the highest PES were most likely to renew and expand, those slightly lower renewed flat, and the lowest correlated with churn, but I found no published percentile distribution or "good score" threshold from a primary Pendo source.
- **traps:**
  1. **Averaging three metrics on incompatible scales.** Adoption is a count of Core Events, stickiness is a percentage, growth is an unbounded ratio. Averaging them requires normalization choices that Pendo makes internally and that are not transparent to the user.
  2. **The Quick Ratio component is unbounded**, so a small denominator (few dropped accounts) can spike the whole score.
  3. **Core Event tagging is a judgment call**, so PES is only as good as the taxonomy, and it is not comparable across companies with different tagging discipline.
  4. **It moves for compositional reasons** and gives no diagnosis. A falling PES tells you nothing about what to fix without decomposing it, at which point you are back to the three underlying metrics.
  5. **Vendor-defined metrics create lock-in.** If your board metric only exists inside one tool, switching tools breaks your reporting history.
- **related:** Feature adoption (15), Breadth (16), Stickiness (3), Quick Ratio (7), Customer health score (25), NPS (26).

---

## SECTION E: THE B2B ACCOUNT LAYER

---

### 23. Product Qualified Lead (PQL)

- **applies_to:** b2b
- **definition:** An individual user whose in-product behavior indicates they are ready for a sales conversation, replacing or supplementing marketing-content-based qualification.
- **formula_variants:**
  - **Behavioral threshold:** user hits a defined usage milestone (hit a plan limit, used a paid-tier feature, invited teammates, completed N core actions). Simple, explainable, works.
  - **Behavior plus ICP fit:** threshold AND firmographic match. Pocus defines a PQL as a user who demonstrates high product usage, fits your ideal customer profile, and/or has indicated buying intent ([Pocus, 16 Feb 2023](https://www.pocus.com/blog/product-led-growth-metrics-to-measure)).
  - **Scored/model-based:** a fitted propensity model over usage, firmographic and intent features, thresholded at a score. Right at scale, opaque, needs constant retraining.
  - **Intent-signal PQL:** viewed the pricing page, clicked upgrade, requested a limit increase. Highest conversion, lowest volume.
  - **PQL rate:** PQLs ÷ signups, which is the metric you actually track over time.
  - **OpenView's framing:** people taking in-product actions that indicate product use is spreading through the organization ([OpenView, 27 Sept 2022](https://openviewpartners.com/blog/time-to-refine-your-metrics-defining-growth-and-success-at-a-plg-company/)).
- **inputs:** Product events joined to CRM contact and company records, plus firmographic enrichment (Clearbit, ZoomInfo, Apollo). Sources: warehouse or a PLS tool (Pocus, Correlated, Endgame, Calixa).
- **application:** Routes sales capacity to the accounts most likely to convert, replaces content-download MQLs, and defines the handoff contract between growth and sales.
- **benchmark:** From OpenView, leads who qualify themselves in the product convert at roughly **5x the overall conversion rate**, and converting PQLs at a 6% rate is described as "an awesome rate" ([OpenView PLG benchmarks](https://openviewpartners.com/blog/your-guide-to-product-led-growth-benchmarks/) and [OpenView, 27 Sept 2022](https://openviewpartners.com/blog/time-to-refine-your-metrics-defining-growth-and-success-at-a-plg-company/), from a survey of 450+ software companies, 2022). Context for the funnel around it, same 2022 OpenView data: freemium signup-to-paid 5%, free-trial signup-to-paid 17%.

  I could not find a credible published PQL-to-customer conversion distribution more recent than 2022. Treat 2022 PLG benchmarks as dated given how much the category shifted after 2023.
- **traps:**
  1. **The threshold is set to fill sales capacity, not to predict purchase.** When reps are idle, the PQL bar drops. This makes PQL volume a measure of sales headcount, not product health.
  2. **Individual-user PQLs in a multi-stakeholder purchase** route reps to a user with no budget authority. See PQA (24).
  3. **PQL conversion rates look spectacular because of selection.** The users who hit usage thresholds were going to convert anyway. The honest question is incremental lift from sales touch, which requires a holdout.
  4. **Free-tier power users who will never pay** are the classic false positive, especially students, hobbyists, and evaluators.
  5. **No standard definition exists**, so PQL benchmarks across companies are not comparable.
- **related:** PQA (24), Activation rate (8), Seat utilization (25), Free-to-paid conversion (monetization family), MQL and SQL (acquisition family).

---

### 24. Product Qualified Account (PQA)

- **applies_to:** b2b
- **definition:** An organization whose aggregate in-product behavior indicates it is ready to buy or expand, scored at the company level rather than the individual level.
- **formula_variants:**
  - **Aggregate usage threshold:** account exceeds a total usage or seat-count threshold. Pocus defines a PQA as a company qualified on aggregate usage from individual users, ICP fit, buying intent and other signals ([Pocus, 16 Feb 2023](https://www.pocus.com/blog/product-led-growth-metrics-to-measure)).
  - **Multi-user threshold:** N or more distinct users active from the same domain in a window. OpenView describes exactly this signal, notifying a rep when five users from the same account are active.
  - **Breadth-based:** account using K or more distinct core features, indicating embedded usage.
  - **Limit-proximity:** account at or above X% of a plan limit (seats, API calls, storage). The strongest expansion signal because it is a real constraint.
  - **Composite scored PQA:** weighted model over usage, breadth, growth trend, ICP fit and intent.
  - **Growth-trajectory PQA:** week-over-week account usage growth above a threshold, which catches accounts on the way up rather than accounts already large.
- **inputs:** Account-resolved product events (domain matching or explicit org ID), entitlement and plan-limit data, CRM and firmographic enrichment.
- **application:** The correct unit for product-led sales in any product with a team or enterprise motion. Drives expansion targeting, land-and-expand plays, and CS prioritization.
- **benchmark:** Adoption of the metric rather than its performance: **17% of surveyed companies measured PQAs** in 2022, per the 2022 Product-Led Sales Benchmarks Report cited by [Pocus](https://www.pocus.com/blog/product-led-growth-metrics-to-measure). Conversion benchmarks: `NO SOURCED BENCHMARK FOUND`.
- **traps:**
  1. **Domain-based account resolution fails** on free email domains, subsidiaries, contractors, and large conglomerates with many domains. Bad resolution silently destroys PQA quality.
  2. **Large accounts trip every threshold** simply by being large, so absolute thresholds surface your existing biggest customers rather than your best opportunities. Normalize by seats or employee count.
  3. **Aggregating user signals hides concentration.** Fifty accounts each with one active user look identical to one account with fifty, on a raw user count.
  4. **A PQA where the only active users are individual contributors** has no buying path.
- **related:** PQL (23), Active accounts (4), Seat utilization (25), Account penetration (26), NRR (monetization family).

---

### 25. Seat Utilization / License Utilization

- **applies_to:** b2b
- **definition:** The share of purchased or provisioned licenses that are actually being used, measured at the account level.
- **formula_variants:**
  - **Provisioned utilization:** assigned licenses ÷ purchased licenses. Measures the admin's rollout, not user behavior.
  - **Active utilization:** licenses with a qualifying active user in window ÷ purchased licenses. The version that matters. The window choice (30 vs 60 vs 90 days) changes the number substantially, and vendors differ.
  - **Engaged utilization:** licenses with a user meeting a *meaningful* activity bar (core action, not just login) ÷ purchased. Strictest and most predictive.
  - **Utilization trend:** period-over-period change, which predicts downgrade at renewal better than the level does.
  - **Over-utilization / limit proximity:** the inverse, used as an expansion trigger.
- **inputs:** Contracted seat counts from billing or CRM, provisioned seats from the identity/admin system, and active-user data from product analytics, all joined at the account level. In IT-side measurement this comes from SaaS management platforms (Productiv, Zylo, Torii, BetterCloud, Flexera) reading SSO and API data.
- **application:** The single strongest leading indicator of B2B downgrade risk at renewal, and the primary input to expansion targeting. Also, from the buyer side, the number that gets your contract cut.

**benchmark:** This is one of the better-sourced metrics in the family, and the sources disagree because they measure differently.

| Figure | Definition used | Source |
|---|---|---|
| ~45% of company apps used regularly | App-level regular use | [Productiv, via Businesswire, 15 Sept 2021](https://www.businesswire.com/news/home/20210915005244/en/Less-than-Half-of-Company-SaaS-Applications-Are-Regularly-Used-by-Employees) |
| ~47% of SaaS licenses used over a 90-day period (53% unused) | License-level, 90-day active window | Productiv, reported via secondary aggregation. `PRIMARY NOT VERIFIED` |
| 36% of licenses unused against recommended utilization levels | Measured vs recommended thresholds | [Zylo 2025 SaaS Management Index](https://zylo.com/news/2025-saas-management-index) |
| 52.7% of purchased licenses idle, ~$21M average annual waste, up 14.2% YoY | Broader unused-or-underutilized measure | Zylo 2025, reported figure |
| Mid-market (500–2,500 employees): 254 active SaaS apps, 44% of licenses underutilized or idle | App and license level | Productiv 2025 SaaS Benchmark Report, via secondary aggregation. `PRIMARY NOT VERIFIED` |

**Usable takeaway:** across independent SaaS-management vendors, somewhere between roughly a third and a half of purchased B2B SaaS licenses are not meaningfully used. If your own product's engaged utilization is above 60%, you are doing better than the market norm.

**traps:**
1. **Provisioned utilization is the flattering version** and it is the one most vendors report to customers. Assigning a license is not using it.
2. **The activity bar is usually login.** A user who logs in once a quarter counts as a utilized seat, which is exactly the seat that gets cut at renewal.
3. **The window is not standardized.** 30-day and 90-day utilization for the same account can differ by 20 points.
4. **Seasonal and role-based users** (auditors, seasonal staff, contractors) look like waste and are not.
5. **High utilization can mean under-provisioning**, where users share credentials because the account will not buy more seats. That is lost revenue disguised as a healthy metric.
6. **Aggregate utilization across the customer base hides the distribution.** Your renewal risk is concentrated in the bottom decile, and the average tells you nothing about it.
- **related:** Active accounts (4), PQA (24), Account penetration (26), Customer health score (27), NRR and downgrade rate (monetization family).

---

### 26. Account Penetration / Multiplayer Rate

- **applies_to:** b2b
- **definition:** How widely the product has spread inside a customer organization, measured as the share of the account's potential users who are actually active, and as the share of accounts that have more than one active user at all.
- **formula_variants:**
  - **Seat penetration:** active users in account ÷ provisioned seats. Overlaps with seat utilization but framed as growth rather than as waste.
  - **Organizational penetration:** active users in account ÷ total employees at the company (from firmographic data). Right for judging expansion headroom rather than current contract fit.
  - **Multiplayer rate:** accounts with ≥2 active users ÷ total accounts. The single cleanest read on whether the product is collaborative in practice.
  - **Depth-of-team distribution:** histogram of active users per account, which is the account-level analogue of the power user curve.
  - **Department breadth:** distinct departments or roles with active users per account. Right for suites and platforms.
  - **Time to second user:** days from account creation to the second active user, an early leading indicator of expansion.
- **inputs:** Account-resolved activity, seat entitlements, firmographic employee counts, and ideally role/department metadata from SSO or user profiles.
- **application:** Predicts expansion and net revenue retention, and identifies the accounts where a land-and-expand play has room to run. Also identifies single-threaded accounts, which are the highest churn risk in B2B.
- **benchmark:** From [OpenView 2022 Product Benchmarks](https://openviewpartners.com/blog/your-guide-to-product-led-growth-benchmarks/) (450+ software companies, June 2022), the closest sourced proxy: **single-player products see 40–60% paid user retention, while team-based products see roughly 80% retention with 150%+ net revenue retention.** That gap is the business case for multiplayer. A direct multiplayer-rate benchmark: `NO SOURCED BENCHMARK FOUND`.
- **traps:**
  1. **Employee count from enrichment data is frequently wrong**, which makes organizational penetration unreliable at the individual-account level even when it is useful in aggregate.
  2. **Seat penetration near 100% looks great and means there is no expansion headroom** under the current contract.
  3. **Shared logins** make a multi-user account look single-threaded.
  4. **Counting an account as multiplayer on a second admin login** rather than on a second genuine user.
- **related:** Seat utilization (25), PQA (24), Invite rate (29), NRR (monetization family), Logo retention (retention family).

---

### 27. Customer Health Score

- **applies_to:** b2b primarily, occasionally consumer subscription
- **definition:** A composite index combining product usage, support, sentiment, and relationship signals into a single renewal-risk indicator per account.
- **formula_variants:**
  - **Weighted additive:** `Σ (component score × weight)`, normalized to 0–100. The standard. ChurnZero recommends **five to seven factors**, each carrying 10 to 20 points on a 100-point scale so that meaningful moves in any factor register ([ChurnZero, Health Score](https://churnzero.com/churnopedia/health-score/)).
  - **Typical component set:** product usage (login frequency, feature adoption, depth), support (ticket volume, escalations, SLA breaches), service utilization (license consumption, training completion), loyalty and sentiment (NPS, CSAT, CES), relationship (executive sponsor engagement, QBR attendance), and commercial (payment history, contract changes).
  - **Predictive/model-based:** a fitted churn model whose output is the score. Higher accuracy, lower explainability, and CSMs will not act on a number they cannot decompose.
  - **Rules-based tripwires:** discrete risk flags rather than a score (champion departed, usage down 40% month over month, escalation open past SLA). Often more actionable than a score.
  - **Segmented scores:** separate models by segment, because what predicts churn for a 10-seat account differs from a 5,000-seat account.
  - **Grade or traffic-light presentation:** A–D or red/yellow/green instead of a number, which reduces false precision.
- **inputs:** Product analytics, support desk (Zendesk, Intercom, Freshdesk), survey platform, CRM, billing, and CSM-entered qualitative fields. Assembled in Gainsight, ChurnZero, Totango, Vitally, or a warehouse.
- **application:** CSM book prioritization, renewal forecasting, and executive risk reporting.
- **benchmark:** `NO SOURCED BENCHMARK FOUND` for health-score distributions or thresholds. Figures circulating for target portfolio averages (70–75+, under 15% of ARR below 60, and so on) appear only on secondary RevOps content sites with no primary study behind them. Likewise a claim that mature health-scoring programs run 12 to 18 percentage points higher net revenue retention appears in aggregator content attributed to Gainsight and ChurnZero, and I could **not** verify it against either company's own publication. Do not cite it.
- **traps:**
  1. **Weights are almost always set by committee intuition rather than fitted against actual churn outcomes.** A health score that has never been back-tested against who actually churned is a comfort object.
  2. **Green-then-churned is the standard failure mode**, and it usually happens because the score is dominated by lagging or gameable inputs (a CSM sentiment field, a QBR attendance flag).
  3. **NPS as a component imports every NPS problem** including tiny sample sizes at the account level. A single detractor response can swing an account's score.
  4. **Support tickets are directionally ambiguous** (see metric 28), so including raw ticket volume can score engaged customers as unhealthy.
  5. **Score inflation.** When health scores drive CSM compensation or QBR optics, they drift upward.
  6. **Averaging away the signal.** A composite that mixes a collapsing usage trend with a strong payment history reports "yellow" for an account that is actually about to leave.
- **related:** Seat utilization (25), Feature adoption (15), Support ticket rate (28), NPS (29), CSAT (30), PES (22), Churn and NRR (retention and monetization families).

---

### 28. Support Ticket Rate (Contact Rate)

- **applies_to:** both
- **definition:** The volume of support contacts normalized against the active user or account base, used as a product-quality and friction signal rather than as a support-team workload measure.
- **formula_variants:**
  - **Tickets per 100 active users per month:** the standard normalization for consumer.
  - **Tickets per account per month** or per 100 seats, for B2B.
  - **Contact rate:** contacting users ÷ active users, which counts people rather than tickets and is less distorted by one user filing twenty tickets.
  - **Ticket rate by category:** the only version that is genuinely actionable, because "how do I" tickets mean a documentation or UX problem while "it's broken" tickets mean a reliability problem, and they have opposite fixes.
  - **Ticket rate by lifecycle stage:** new-user tickets per 100 new users isolates onboarding friction.
  - **Deflection-adjusted:** including self-service help-center sessions that resolved without a ticket, which prevents a help-center improvement from looking like a product improvement.
  - **Escalation rate and reopen rate:** severity proxies that matter more than raw volume.
- **inputs:** Support desk data (Zendesk, Intercom, Freshdesk, HubSpot Service) joined to the active-user or account base, with consistent ticket categorization.
- **application:** Product quality signal, roadmap input (top ticket categories are a free bug and UX backlog), support capacity planning, and a component of customer health score.
- **benchmark:** Sourced support-operations figures from Zendesk's benchmark material: an average Zendesk-powered help desk handles more than 600 tickets per month, agent productivity averages about 103 tickets per agent per month, average first response time is nearly 24 hours, 37% of tickets resolve within 4 hours, and 43% take longer than 24 hours ([Zendesk Benchmark whitepaper](https://d16cvnquvjw7pr.cloudfront.net/resources/whitepapers/Zendesk_WP_benchmark.pdf), and [Zendesk on benchmarking customer service](https://www.zendesk.com/blog/benchmarking-customer-service/)). I could **not confirm the publication year** of that whitepaper, so treat the figures as undated.

  For the metric as actually specified here, tickets per 100 active users: **NO SOURCED BENCHMARK FOUND.** Zendesk publishes support-operations benchmarks, not product-normalized contact rates.
- **traps:**
  1. **The direction of "good" is genuinely ambiguous.** Low ticket volume can mean a great product or it can mean users have given up and are silently churning. Always read it against churn and against help-center search volume.
  2. **It is heavily supply-constrained.** Hiding the contact button lowers ticket rate and worsens the actual experience. Any ticket-rate improvement should be checked against how easy it is to reach support.
  3. **Normalization by total users instead of active users** makes the rate fall automatically as you accumulate dormant accounts.
  4. **Deflection improvements masquerade as product improvements.**
  5. **Category taxonomies drift**, which is what destroys the one version of this metric that was actually useful.
  6. **B2B ticket volume scales with seat count**, so raw account-level ticket counts flag your largest customers as unhealthy.
- **related:** Customer health score (27), CES (31), CSAT (30), Churn (retention family), Activation rate (8, since new-user tickets diagnose onboarding).

---

## SECTION F: VIRALITY, REFERRAL AND NETWORK

---

### 29. Viral Coefficient (K-Factor)

- **applies_to:** both
- **definition:** The average number of new users each existing user generates through in-product invitations or sharing, within one viral cycle.
- **formula_variants:**
  - **Standard:** `K = i × c`, where `i` = average invitations sent per user and `c` = conversion rate of invitations to activated new users. The universal starting formula.
  - **Cohort K:** computed per acquisition cohort over a fixed window, which is the only version that is comparable over time. A lifetime K keeps rising as cohorts age and is therefore uninterpretable.
  - **Amplification factor:** `1 ÷ (1 − K)` for K < 1, expressing the multiplier that virality applies to your other acquisition channels. For a product with K = 0.4, every 100 paid signups yields about 167 total. **This is the correct framing for essentially every real product**, since sustained K > 1 is close to nonexistent.
  - **Activated-K vs signup-K:** counting invited users who activate, not merely who register. Signup-K overstates by a large factor.
  - **Branch-specific K:** measured separately per viral mechanism (direct invite, shared link, content embed, integration), because they have wildly different economics and cycle times.
  - **Skok's growth model:** `Custs(t) = Custs(0) × K^(t/ct)` where `ct` is viral cycle time, which shows that **shortening cycle time dominates raising K** because K is raised to the power of t/ct ([David Skok, forEntrepreneurs, Lessons Learned: Viral Marketing](https://www.forentrepreneurs.com/lessons-learnt-viral-marketing/)). Skok's worked illustration: at K = 0.2-scale parameters over 20 days, halving cycle time from 2 days to 1 day moves the result from roughly 20,000 users to over 20 million. Skok notes the model ignores churn and saturation, which is why real viral growth is an S-curve.
- **inputs:** Invitation-sent events with sender attribution, invitation-accepted events, and new-user attribution back to the inviter. Requires deliberate instrumentation of the referral graph, which most products do not have by default.
- **application:** Determines whether virality is a real acquisition channel or a rounding error, and sizes the blended CAC benefit. Feeds paid-acquisition bid ceilings, since a K of 0.4 means you can pay up to 1.67x your standalone allowable CAC.
- **benchmark:** `NO SOURCED CROSS-INDUSTRY K-FACTOR BENCHMARK FOUND.` I searched specifically for this and no credible source publishes a K-factor distribution, which is itself informative.
- **traps:**
  1. **K > 1 is not a sustainable state and treating it as a goal is a category error.** Andrew Chen's core argument is that the viral coefficient does not measure network saturation timeline, product satisfaction, stickiness, monetization, or market size, and that treating virality as a magic bullet produces fads and one-hit wonders ([Andrew Chen, "Viral coefficient: what it does and does NOT measure"](https://andrewchen.com/viral-coefficient-what-it-does-and-does-not-measure/)). He argues separately that retention is the actual driver, since more sessions with a user build the viral factor over time, and that high virality with no retention does not produce sustainable growth ([Andrew Chen, "Why the best way to drive viral growth is to increase retention and engagement"](https://andrewchen.com/more-retention-more-viral-growth/)).
  2. **K decays as the network saturates.** Early cohorts invite into a fresh address book, later cohorts invite people who already joined. A K measured at launch is worthless six months in.
  3. **Lifetime K versus cycle K.** Reporting cumulative invites per user without a window makes K look like it is growing when only cohort age is growing.
  4. **Counting signups rather than activated users** inflates K, sometimes by 3x or more, because invited users convert and activate much worse than organic ones.
  5. **Attribution double-counting.** A user reached by both a friend invite and a paid ad gets counted in both channels.
  6. **Spammy invite mechanics manufacture K and destroy retention and deliverability.** Address-book scraping and pre-checked invite-all boxes raise `i` and tank `c` and brand trust.
  7. **Incentivized referral is not virality**, it is a paid channel with a different cost structure, and blending the two hides the real CAC.
- **related:** Viral cycle time (30), Invite rate and acceptance (31), Referral rate (32), CAC and blended CAC (acquisition family), Retention (retention family).

---

### 30. Viral Cycle Time

- **applies_to:** both
- **definition:** The elapsed time from a user joining to that user generating an invitation that converts into a new joined user.
- **formula_variants:**
  - **Median full-cycle time:** signup to first converted invitation. The standard.
  - **Decomposed cycle:** time to first invite sent, plus time from invite to acceptance, plus time from acceptance to activation. Decomposition tells you which segment to attack.
  - **Per-mechanism cycle time:** a shared public link converts in minutes, an email invite in days, a "share your result" flow somewhere between.
  - **Weighted average cycle time** across mechanisms, weighted by volume.
- **inputs:** Timestamped invitation and acceptance events with sender linkage.
- **application:** Usually a higher-leverage optimization target than K itself, because of the exponent relationship in Skok's model. Concretely, this means prioritizing the friction between "user wants to share" and "recipient has value in hand" over increasing invite prompts.
- **benchmark:** `NO SOURCED BENCHMARK FOUND` for cycle time values. The sourced content is the model relationship, not benchmark durations ([David Skok, forEntrepreneurs](https://www.forentrepreneurs.com/lessons-learnt-viral-marketing/)).
- **traps:**
  1. **Optimizing cycle time on a K that is near zero** produces a faster rounding error.
  2. **The exponential model breaks down immediately** in the presence of churn and saturation, which Skok himself flags. Do not use it to forecast.
  3. **Median cycle time hides a bimodal distribution** of instant sharers and slow-burn sharers.
- **related:** Viral coefficient (29), Invite rate (31), Time to value (10, since recipients must reach value fast for the cycle to close).

---

### 31. Invite Rate and Invite Acceptance Rate

- **applies_to:** both
- **definition:** The share of users who send at least one invitation, how many they send, and the share of invitations that convert into activated users.
- **formula_variants:**
  - **Invite participation rate:** users sending ≥1 invite ÷ active users. The behavioral question.
  - **Invites per inviter:** average invitations among those who invite. Combined with participation rate, this gives the `i` in K = i × c, and separating them matters because the fixes differ (participation is a prompt and motivation problem, volume is a UX and address-book problem).
  - **Invite acceptance rate:** invitations accepted ÷ invitations sent. This is `c` if you define acceptance as registration.
  - **Invite activation rate:** invited users who activate ÷ invitations sent. The stricter and more honest `c`.
  - **By channel:** email, SMS, link copy, native share sheet, in-product directory. Acceptance varies enormously by channel and blending them hides the good one.
  - **Time-bounded acceptance:** accepted within 7 days, since late acceptances behave differently.
- **inputs:** Invitation events with channel, recipient hash, sender ID, and downstream acceptance and activation linkage.
- **application:** Decomposes K into the two things you can actually change, and identifies whether the constraint is motivation (few people invite), reach (inviters invite few), or landing experience (invites don't convert).
- **benchmark:** `NO SOURCED BENCHMARK FOUND` for invite rate or invite acceptance rate as published cross-industry figures. The nearest published data is referral-program benchmarks (metric 32), which measure an incentivized program rather than organic in-product invitation, and the two should not be conflated.
- **traps:**
  1. **Address-book upload inflates invites-per-inviter by orders of magnitude** while collapsing acceptance rate, so K barely moves and user trust falls.
  2. **Counting invite prompts shown rather than invites sent.**
  3. **Acceptance measured as registration** rather than activation, which overstates the value of every invite.
  4. **Invited users are a distinct cohort with different retention.** Sometimes better (they came with a friend already in the product), sometimes far worse (they joined out of obligation). Measure them separately, always.
  5. **Multiplayer B2B invites are not virality**, they are account penetration, and mixing them into K makes a seat-expansion motion look like consumer word of mouth.
- **related:** Viral coefficient (29), Account penetration (26), Referral rate (32), Activation rate (8).

---

### 32. Referral Rate (Incentivized Referral Program Participation)

- **applies_to:** both
- **definition:** The share of customers who successfully refer someone through a deliberate, usually incentivized referral program, and the downstream conversion of those referrals.
- **formula_variants:**
  - **Referral rate (participation):** customers who made ≥1 successful referral ÷ total customers in period.
  - **Share rate:** customers who shared their referral link or code ÷ customers, which is upstream of referral rate and diagnoses whether the problem is sharing or converting.
  - **Referral conversion rate:** referred visitors who become customers ÷ referred visitors.
  - **Referral revenue share:** revenue attributable to referrals ÷ total revenue. The version that survives a CFO conversation.
  - **Referrals per referrer** and **referral CAC** (incentive cost + program cost ÷ referred customers acquired).
- **inputs:** Referral platform data (ReferralCandy, Extole, Friendbuy, Mention Me, SaaSquatch) joined to orders or subscriptions.
- **application:** Sizes referral as a channel and sets incentive economics against paid CAC.
- **benchmark:** Vendor-published, so treat with appropriate skepticism given the commercial interest. From [ReferralCandy](https://www.referralcandy.com/blog/referral-rates) and [ReferralCandy referral program benchmarks](https://www.referralcandy.com/blog/referral-program-benchmarks-whats-a-good-conversion-rate-in-2025), 2025–2026 content: global average referral rate about **2.35%** for established retailers, with 5–9% cited as an aspirational range; share rate healthy range **5–15%**; median referral conversion rate **3–5%** with leading ecommerce programs at 8%+; strong programs drive **10–30% of total store revenue**. All ecommerce-weighted. For B2B SaaS referral benchmarks: `NO SOURCED BENCHMARK FOUND`.
- **traps:**
  1. **Referral platform vendors publish the benchmarks for referral platforms.** Selection bias is total, since only companies running programs are in the sample.
  2. **Attribution inflation.** Referral platforms claim credit for purchases that would have happened anyway, particularly self-referrals and last-touch code entry at checkout.
  3. **Incentive fraud** (self-referral, code-sharing sites, coupon aggregators) is a large share of many programs' "referrals."
  4. **Referral is not virality.** A paid incentive program has a CAC and belongs in the paid channel P&L, not in a K-factor.
  5. **Referred-customer quality varies wildly by incentive design.** Cash incentives attract deal-seekers with poor retention, product-credit incentives attract better ones. Always measure referred-cohort retention separately.
- **related:** Viral coefficient (29), Invite rate (31), NPS (33, often wrongly assumed to predict referral behavior), CAC (acquisition family).

---

### 33. Network Density and Connections per User

- **applies_to:** both, only meaningful for products with a genuine user-to-user graph
- **definition:** How interconnected the user graph is, used to assess whether network effects are actually forming.
- **formula_variants:**
  - **Density (graph-theoretic):** ratio of actual links to nodes, or actual links ÷ possible links. NfX defines density as the ratio of links to nodes, with higher ratios meaning denser networks ([NfX, The Network Effects Bible, July 2019, updated 2024](https://www.nfx.com/post/network-effects-bible)).
  - **Connections per user distribution:** median and percentile connection counts, which is more actionable than global density because it tells you where users get stuck.
  - **Share of users above a connection threshold:** users with ≥N connections ÷ active users, the operational version.
  - **Time to Nth connection:** median days for a new user to reach N connections, the activation-flavored version.
  - **Clustering coefficient:** the share of a user's connections who are also connected to each other. NfX notes higher clustering can produce more powerful effects.
  - **Local density within a segment:** density inside a geography, school, company, or interest cluster. NfX's practical advice is to find the "white-hot center," the densest highest-activity segment, and grow from there. **This is almost always more useful than a global density number**, since network effects form locally before they form globally.
  - **Interaction density rather than connection density:** links weighted by actual reciprocal activity, not by a one-time follow or friend action.
- **inputs:** The user-to-user relationship graph plus interaction events. Requires graph queries, so usually a warehouse or graph database rather than a product analytics tool.
- **application:** Tells you whether the network is real, where to concentrate growth spend (dense segments compound, sparse ones do not), and whether "connections" should be an activation criterion.
- **benchmark:** `NO SOURCED BENCHMARK FOUND.` NfX explicitly provides no connections-per-user benchmarks, no density thresholds, and no asymptote formulas, emphasizing qualitative network characteristics instead. This is a genuine gap in the published literature.
- **traps:**
  1. **The famous connection magic numbers are folklore.** Facebook's "7 friends in 10 days," LinkedIn's connection thresholds, and Twitter's "30 follows" are repeated everywhere and I found no primary published source for any of them. Do not import another product's threshold.
  2. **Global density falls as you scale even when the network is healthy**, because possible links grow as n² while actual links grow roughly linearly. Track density within cohorts and clusters, not globally.
  3. **Connections without interaction are dead weight.** A user with 500 dormant follows has a high connection count and no network value. Always weight by interaction.
  4. **One-directional follows are not the same as reciprocal connections** and behave completely differently.
  5. **Density can be gamed by auto-follow and suggested-connection spam**, which raises the metric and lowers the experience.
- **related:** Viral coefficient (29), Invite rate (31), Participation inequality (34), Activation rate (8), Retention (retention family).

---

### 34. Participation Inequality (Creator/Contributor/Consumer Ratio)

- **applies_to:** both, essential for any UGC, community, marketplace, or collaborative product
- **definition:** The distribution of contribution across the user base, measuring what share of users create content or supply versus merely consume.
- **formula_variants:**
  - **90-9-1 framing:** share of users who never contribute, contribute occasionally, and contribute heavily. Jakob Nielsen's original formulation: in most online communities **90% are lurkers who never contribute, 9% contribute a little, and 1% account for almost all the action**, and for wiki-style sites 1% create, 9% edit, 90% view ([Jakob Nielsen, NN/g, 8 Oct 2006](https://www.nngroup.com/articles/participation-inequality/)). Nielsen credits earlier work by Will Hill at Bellcore in the early 1990s and explicitly cautions that **the actual percentages vary by subject**.
  - **Creator rate:** users producing ≥1 unit of content or supply ÷ active users, in window.
  - **Contribution Gini or top-decile share:** share of all content produced by the top 1% or top 10% of creators. More precise than the 90-9-1 buckets.
  - **Supply/demand ratio (marketplaces):** active suppliers ÷ active demanders, plus liquidity measures.
  - **Creator retention:** creators still creating at day 30/90, which matters far more than creator count because supply churn is the killer in UGC products.
  - **Consumption per unit of supply:** how much demand a single creator's output serves, which determines how many creators you actually need.
- **inputs:** Content or supply creation events attributed to users, plus consumption events. Sources: product event stream.
- **application:** Determines whether growth investment should go to supply or demand, sets creator-tooling priority, and sizes the risk concentration if your top 1% leave.
- **benchmark:** Nielsen's 90-9-1 (2006, NN/g) is the canonical published figure and is the one to cite, with his own caveat that it varies by community type. It is nearly 20 years old and predates modern short-form video and AI-assisted creation, so treat it as a structural pattern rather than a current number. No credible modern replacement with comparable methodology surfaced in this research.
- **traps:**
  1. **90-9-1 is quoted as a law and it is not.** Nielsen himself says the percentages vary. Products with low-friction creation (a like, a reaction, a one-tap post) show far higher participation.
  2. **Defining "contribution" too broadly.** Counting likes as contribution makes participation look healthy and tells you nothing about content supply.
  3. **Extreme concentration is a business risk that the average hides.** If 0.1% of users produce 60% of content, you have a small number of relationships to manage, not a network.
  4. **Optimizing for creator count instead of creator retention.** Most UGC products can acquire creators and cannot keep them.
  5. **The ratio differs by content category** inside the same product.
- **related:** Network density (33), Power user curve (5), Depth of usage (17), Marketplace liquidity (cross-family).

---

## SECTION G: SENTIMENT AND PERCEIVED HEALTH

---

### 35. Net Promoter Score (NPS)

- **applies_to:** both
- **definition:** A survey index computed from a single 0-to-10 likelihood-to-recommend question, expressed as the percentage of promoters minus the percentage of detractors.
- **formula_variants:**
  - **Standard NPS:** `%(scores 9–10) − %(scores 0–6)`, on a −100 to +100 scale. Scores of 7 and 8 (passives) are counted in the denominator but not the numerator.
  - **Relationship NPS:** asked periodically about the overall relationship. Right for account health tracking.
  - **Transactional NPS:** asked after a specific interaction. Measures the interaction, not the relationship, and the two are routinely confused in reporting.
  - **In-product vs email survey:** in-product gets far higher response rates and biases toward active users; email reaches churned and dormant users. They produce different scores for the same company.
  - **Mean-score reporting:** reporting the average 0–10 score instead of the NPS calculation, which preserves the variance that NPS throws away. Statistically superior, politically unpopular.
  - **Weighted NPS (B2B):** weighting responses by account ARR, so a 500-seat detractor does not count the same as a trial user. CustomerGauge advocates this class of adjustment.
  - **eNPS:** the employee version, unrelated to customer health despite frequently appearing on the same slide.
- **inputs:** A survey platform (Delighted, Retently, Qualtrics, Pendo, in-app survey tooling), plus response metadata for segmentation and a documented sampling rule.
- **application:** Trend tracking and, more usefully, the free-text follow-up question, which is where the actual information is. As a leading indicator of revenue it is weak (see traps).

**benchmark:** From [Retently, "What is a Good Net Promoter Score? (2026 NPS Benchmark)", published 15 April 2026](https://www.retently.com/blog/good-net-promoter-score/), based on Retently's customer base with 10,000+ surveys per industry, restricted to industries with 10+ clients, not segmented by company size or country:

| B2B industry | NPS | B2C industry | NPS |
|---|---|---|---|
| Financial Services | 68 | Financial Services | 68 |
| Consulting | 68 | Ecommerce & Retail | 61 |
| Technology & Services | 63 | Healthcare | 37 |
| Retail | 61 | Internet Software & Services | 26 |
| Digital Marketing Agencies | 49 | | |
| Property Management | 47 | | |
| Insurance | 46 | | |
| Logistics & Transportation | 42 | | |
| **B2B Software & SaaS** | **41** | | |
| Communication & Media | 39 | | |
| Cloud & Hosting | 30 | | |

Cross-check from [CustomerGauge SaaS NPS benchmarks, 2025](https://customergauge.com/benchmarks/blog/nps-saas-net-promoter-score-benchmarks): SaaS industry average **+36**, with named company scores spanning Nutanix 92, Zoom 72, Snowflake 71, Slack 55, Salesforce 20.

By ARR band, from [Userpilot Product Metrics Benchmark Report 2024](https://userpilot.com/blog/product-metrics-benchmark-report/) (n=547 SaaS companies, June 2024): $1–5M ARR = 34.5, $5–10M = 23.3, $10–50M = 37.5, $50M+ = 39.1. Note this is non-monotonic, which is itself a signal about sample noise at these sample sizes.

**Usable range for B2B SaaS: roughly +30 to +41 depending on source and methodology.** The spread between credible sources is about 11 points, which is larger than most companies' year-over-year movement.

**traps:**
1. **The foundational growth claim failed academic replication.** Keiningham, Cooil, Andreassen and Aksoy, "A Longitudinal Examination of Net Promoter and Firm Revenue Growth," *Journal of Marketing* 71(3), July 2007, used longitudinal data from 21 firms and 15,500+ interviews from the Norwegian Customer Satisfaction Barometer and **failed to replicate Reichheld's assertion of NPS's "clear superiority"** over other loyalty measures, finding NPS correlates highly with customer satisfaction and is sometimes but not always the best predictor. The paper won the 2007 Marketing Science Institute / H. Paul Root Award. ([Journal of Marketing](https://journals.sagepub.com/doi/10.1509/jmkg.71.3.039))
2. **The three-bucket collapse discards most of the information.** Moving a customer from 6 to 8 is real improvement and registers as +1 promoter-side change... actually it registers as removing a detractor, while moving 8 to 9 registers as adding a promoter. The scoring is discontinuous and lumpy, which makes small-sample NPS extremely volatile.
3. **Non-response bias is severe.** Response rates are typically low and skew to the emotional extremes plus the highly engaged. Churning customers rarely answer.
4. **Survey timing is the easiest gaming vector in this entire corpus.** Trigger the survey right after a successful action and NPS jumps. Trigger it after a support escalation and it collapses. Same customers, same product.
5. **Incentivizing staff on NPS corrupts it immediately**, through selective sending, pre-survey coaching, and outright asking for tens.
6. **Cultural and regional response bias** makes cross-geography comparison invalid. Some markets systematically avoid extreme scores.
7. **B2B account-level NPS is usually n=1 or n=2**, which is not a measurement.
8. **It does not predict actual referral behavior.** Saying you would recommend and actually recommending are different acts, and only metric 32 measures the latter.
- **related:** CSAT (36), CES (37), Customer health score (27), Referral rate (32), Churn (retention family).

---

### 36. Customer Satisfaction Score (CSAT)

- **applies_to:** both
- **definition:** A survey measure of how satisfied a customer was with a specific product, feature, or interaction, usually asked immediately after that interaction.
- **formula_variants:**
  - **Top-two-box percentage:** respondents choosing 4 or 5 on a 5-point scale ÷ total respondents, expressed as a percentage. The most common formulation.
  - **Top-box only:** only 5s count. Stricter, more sensitive to change.
  - **Mean score:** the average rating, reported on the 1–5 scale. Preserves variance, harder to communicate.
  - **Binary thumbs up/down:** simplified, higher response rate, less resolution.
  - **7-point or 10-point scale variants:** all exist, all produce different numbers, none are cross-comparable.
  - **Weighted CSAT** by transaction value or account size, for B2B.
- **inputs:** Post-interaction survey triggered from support desk, in-product, or email. Sources: Zendesk, Intercom, Delighted, in-app survey tools.
- **application:** Interaction-level quality measurement, agent and team performance in support, and a component of customer health scores. Better than NPS for measuring a *specific* thing, worse for measuring a relationship.
- **benchmark:** `NO SOURCED BENCHMARK FOUND` within this research session. I attempted to retrieve ACSI (American Customer Satisfaction Index) software-sector scores and Zendesk CX Trends CSAT benchmarks and exhausted the search budget before verifying either. Do not use a CSAT benchmark from memory. The correct sources to pull are the ACSI annual software and internet-services benchmarks, and the Zendesk CX Trends report, both of which publish dated figures.
- **traps:**
  1. **Scale and formula are not standardized**, so a 92% CSAT and a 4.3/5 CSAT cannot be compared and frequently are.
  2. **Response bias toward resolved cases.** Surveys sent after ticket closure miss the customers whose issues were never resolved.
  3. **It measures the interaction, not the product.** Excellent support CSAT can coexist with a product that generates the tickets.
  4. **Ceiling effects.** Most CSAT programs sit in the high 80s to low 90s, leaving almost no dynamic range to detect change.
  5. **Agent-level incentives** produce the same corruption as NPS incentives.
- **related:** NPS (35), CES (37), Support ticket rate (28), Customer health score (27).

---

### 37. Customer Effort Score (CES)

- **applies_to:** both
- **definition:** A survey measure of how much effort the customer had to expend to get something done, built on the finding that reducing effort predicts loyalty better than exceeding expectations does.
- **formula_variants:**
  - **Original CEB version (2010):** "How much effort did you personally have to put forth to handle your request?" on a **1 to 5** scale where lower is better. Reported as a mean.
  - **Revised Gartner version:** "The company made it easy for me to handle my issue," on a **1 to 7 agreement scale** where higher is better, scored as a **top-three-box** percentage (agreement responses of 5, 6, 7 ÷ total respondents). ([MeasuringU, 10 Things to Know about the Customer Effort Score](https://measuringu.com/customer-effort-score/))
  - **Product-flow CES:** asked after completing a specific in-product task (onboarding, setup, checkout) rather than after a support interaction. Increasingly the more useful application, and the one most relevant to this family.
  - **Mean vs top-box reporting:** both are in use, and they are not comparable.
- **inputs:** Post-interaction or post-task survey trigger, plus the flow or ticket context to make it actionable.
- **application:** Pinpoints friction in support interactions and in product flows. Because it is task-scoped, it is far more actionable than NPS for onboarding, setup, and activation work.
- **benchmark:** `NO SOURCED BENCHMARK FOUND.` The originating research is well-sourced and worth citing on its own: Matthew Dixon, Karen Freeman and Nicholas Toman, "Stop Trying to Delight Your Customers," *Harvard Business Review*, July–August 2010, based on CEB research across **75,000+ customer interactions**, finding that delighting customers did not significantly increase loyalty while reducing customer effort strongly mitigated disloyalty. ([HBR](https://hbr.org/2010/07/stop-trying-to-delight-your-customers))
- **traps:**
  1. **Two incompatible scales share one metric name.** A CES of 5 means "high effort, bad" on the original 1–5 scale and "agree it was easy, good" on the 1–7 scale. Direction is inverted between versions. Always state which version and which direction.
  2. **The original CEB loyalty finding was about *disloyalty mitigation*, not loyalty creation.** Low effort prevents churn, it does not create advocacy. Products using CES as a growth metric are misreading the research.
  3. **It is scoped to an interaction**, so it says nothing about whether the product delivers value.
  4. **Same response-bias and timing-manipulation problems as NPS and CSAT.**
- **related:** CSAT (36), NPS (35), Support ticket rate (28), Onboarding funnel completion (13), Time to value (10).

---

## Metrics I considered and excluded, with reasons

| Metric | Why excluded |
|---|---|
| Retention rate, cohort retention curves, churn rate, resurrection rate | Belongs to the **retention family**. Referenced extensively here as a downstream dependency, but the definitions and benchmarks live there. |
| Free-to-paid conversion, trial conversion, ARPU, ARPDAU, LTV, expansion revenue, NRR | **Monetization family.** Activation and PQL feed them directly, but they are priced outcomes, not engagement measures. |
| CAC, blended CAC, channel mix, install-to-signup rate, bounce rate | **Acquisition family.** Engaged sessions and D1 return sit at the boundary and are included here because they diagnose the product experience, not the channel. |
| North Star Metric | Not a metric, it is a *selection framework* for choosing one. It deserves its own treatment as a methodology entry rather than a corpus row. |
| Crash-free session rate, ANR rate, p95 latency, error rate, uptime | Genuine product-health signals but they are **engineering reliability metrics** with their own tooling (Sentry, Firebase Crashlytics, Datadog) and their own benchmark literature. They belong in a technical-health family. Support ticket rate is included here as the customer-visible proxy. |
| App store rating and review volume | Reputation and acquisition signal, heavily confounded by rating-prompt timing, and not a product engagement measure. |
| Screens per session / pageviews per session | Subsumed by depth of usage (17) and session length (19). Adding it separately would be padding, and it is a weak metric in its own right (more screens often means worse navigation). |
| Daily/weekly active *sessions* as a headline | Redundant with session count (18) and structurally more gameable than active users. |
| Time to habit / habit formation index | Attractive concept, but I found no credible standardized definition or published benchmark. It is a narrative frame over natural frequency (2) and the power user curve (5) rather than a distinct measurable. |
| Customer Satisfaction with specific features (feature-level CSAT) | Real practice, but a straightforward application of CSAT (36) rather than a separate metric. |
| Employee NPS (eNPS) | Not a customer or product metric, despite appearing on the same dashboards. |
| Standish Group "45%/64% of features never used" | Excluded as a **benchmark** because I could not verify the original source. The Pendo 2019 finding (metric 15) covers the same ground with documented methodology. |

---

## Cross-family dependencies

**This family feeds:**

| Downstream | Mechanism |
|---|---|
| **Retention family** | Activation rate (8) is the strongest single predictor of long-run retention. Amplitude found 69% of top day-7 activation performers were also top three-month retention performers ([Amplitude 2025 Product Benchmark Report](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf)). The activation *event* definition also determines which cohort you measure retention on, so an error in metric 9 propagates into every retention number you report. |
| **Monetization family** | PQL (23) and PQA (24) are the direct inputs to product-led sales pipeline. Seat utilization (25) and account penetration (26) predict downgrade and expansion, which are the two components of NRR. Depth of usage relative to plan limits (17) is the trigger for usage-based expansion. |
| **Acquisition family** | Viral coefficient (29) sets the amplification multiplier on every paid channel, which changes the allowable CAC. Activation rate (8) segmented by channel is the correct way to judge channel quality, because a channel with cheap signups and low activation is expensive. |
| **Customer success and renewal** | Customer health score (27) is largely assembled from metrics 15, 16, 25, 28 and 35. |

**This family depends on:**

| Upstream | Mechanism |
|---|---|
| **Acquisition family** | New-user cohort definition and volume set the denominator for activation (8), TTV (10) and D1 return (14). Channel mix is a confound on every one of them, since paid-social cohorts activate differently from organic-search cohorts, and a channel-mix shift will move your activation rate with no product change. |
| **Retention family** | Retention outcomes are the *dependent variable* in the aha-moment analysis (9). You cannot identify an activation event without a validated retention horizon, and you cannot set that horizon without knowing natural frequency (2). |
| **Data infrastructure** | Everything here depends on identity resolution, event taxonomy governance, and account resolution. In B2B, if domain-to-account mapping is broken, metrics 4, 23, 24, 25, 26 and 27 are all wrong simultaneously and in a correlated way. |
| **Monetization family** | Entitlement and plan data is required for the correct denominators in feature adoption (15), breadth (16) and seat utilization (25). Without it, feature adoption rates are systematically understated. |

**The three highest-consequence definitional decisions in this family, ranked:**

1. **What counts as "active."** Propagates into DAU, WAU, MAU, stickiness, the power user curve, growth accounting, seat utilization, and every account-level B2B metric. One decision, twelve downstream metrics.
2. **What counts as "activated."** Propagates into activation rate, TTV, onboarding design, PQL scoring, channel quality judgment, and every retention cohort analysis. Getting this wrong is invisible for a quarter and expensive for a year.
3. **What the natural frequency is.** Determines whether DAU/MAU is even a legitimate metric, which retention window is correct, and what the L-curve should look like. A tax product graded on a daily-use bar gets a roadmap built for a product it isn't.

agentId: a3f93fbfa1613528f (use SendMessage with to: 'a3f93fbfa1613528f', summary: '<5-10 word recap>' to continue this agent)
<usage>subagent_tokens: 206923
tool_uses: 67
duration_ms: 1026727</usage>