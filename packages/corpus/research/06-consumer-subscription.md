I have enough sourced material. Writing the corpus now.

---

# CONSUMER SUBSCRIPTION AND APP STORE METRICS
### Authoritative corpus, compiled 2026-07-28

**Primary sources used and their dates**

| Source | Published | Sample | What it's good for |
|---|---|---|---|
| RevenueCat *State of Subscription Apps 2026* | Mar 19, 2026 (upd. Apr 22, 2026); data primarily calendar 2025 | 115,000+ apps, $16B+ revenue, 1B+ transactions | The single best benchmark source for this family. Category, geo, price-tier, and plan-duration cuts with medians and quartiles |
| Adapty *State of In-App Subscriptions 2026* | Mar 13, 2026; category posts Mar 27, 2026 | 16,000+ apps, $3B revenue, 10,000+ paywalls | Paywall-level and trial-model-level cuts RevenueCat doesn't publish |
| AppTweak conversion benchmarks | Published May 18, 2026; data = calendar 2025, US market | AppTweak panel | Store page conversion by category |
| Apple Developer / App Store Connect docs | Live as of Jul 2026 | n/a | Commission mechanics, grace period mechanics |
| Google Play developer support + AppleInsider (Jun 24, 2026), Coda (2026) | Jun 2026 | n/a | Post-Epic fee restructure |
| Ninth Circuit *Epic v. Apple* opinion | Dec 11, 2025; SCOTUS activity Apr–Jun 2026 | n/a | External purchase link status |
| Adjust *Mobile App Trends 2026* / AppsFlyer *State of App Marketing 2025* | Feb 2026 / Q1 2026 | 100K+ apps / 28B+ installs | Install retention. **Reached via aggregator, not verified against the primary PDF in this session. Treat as second-hand.** |

---

## READ THIS FIRST: the three things that break this family

### 1. App store take rate changes every downstream number, and it is in flux right now

**Apple, current and verified (July 2026):**

| Situation | Developer receives | Source |
|---|---|---|
| Standard, subscriber's first year | 70% (30% commission) | developer.apple.com/app-store/subscriptions/ |
| Standard, after one year of paid service | 85% (15% commission) | same |
| Small Business Program (≤$1M proceeds prior calendar year) | 85% from day one, regardless of subscriber tenure | developer.apple.com/app-store/small-business-program/ |
| EU alternative terms, post-year-one | 10% commission | Apple SBP page |
| US external purchase link | **0% right now**, unresolved | See below |

The one-year rule has teeth that most models ignore. Apple's exact wording: days of paid service "include all subscription offer types (introductory, promotional, and offer codes) with paid pricing options." **Free trials and renewal extensions are excluded.** Days of paid service are **specific to each subscription group**. Upgrades, downgrades, and crossgrades inside a group do not reset it. If a subscription lapses from cancellation or a billing failure, accumulation stops, and if it is recovered within 60 days it "resumes from the recovery date." So a subscriber with a 30-day trial plus 12 monthly renewals does **not** hit 15% at month 12, they hit it at month 13, and a subscriber who lapses for 61 days and comes back restarts at 30%.

**The US external-link situation, precisely:**
- Apr 30, 2025: district court contempt ruling in *Epic v. Apple* barred Apple from commissioning external-link purchases. Apple had been charging 27%.
- Dec 11, 2025: Ninth Circuit partially reversed, holding the permanent zero-commission ban was "more like a punitive criminal contempt sanction than a civil contempt sanction," and that Apple may charge "a reasonable commission" covering coordination costs and IP, **explicitly excluding security and privacy costs**. It set no rate and remanded.
- May 6, 2026: Supreme Court denied Apple's application to stay the mandate.
- Jun 30, 2026: Supreme Court granted cert; argument expected Oct–Dec 2026.
- Jul 6, 2026: Apple was due to file its implementation proposal, including a proposed fee, with the district court.

**Operative state as of today: 0% commission on US external purchase link traffic.** This is temporary and the rate is actively being litigated on two tracks at once. Any LTV model that hard-codes 0% web take rate is making a bet on pending litigation. Model it as a variable.

**Google Play restructured on June 30, 2026** following the Epic settlement, and this is the bigger structural change of the two: Google **separated the service fee from the billing fee** for the first time.

| Transaction | Service fee | Billing fee (Play Billing only) | Total |
|---|---|---|---|
| Under $1M annual earnings, Play Billing | 10% | 5% | 15% |
| Under $1M, external payment/link | 10% | 0% | 10% |
| Auto-renewing subscriptions | 10% | 5% | 15% |
| Over $1M, new installs, Play Billing | 20% | 5% | 25% |
| Over $1M, existing installs, Play Billing | 25% | 5% | 30% |
| Over $1M, external payment/link | 20% | 0% | 20% |
| Apps Experience Program, new installs | 15% | 5% | 20% |

Rollout: US/UK/EU Jun 30, 2026; Australia Sept 2026; Japan/Korea Dec 2026; rest of world through 2027.

**Sources conflict on the "existing installs" tier.** AppleInsider (Jun 24, 2026) describes over-$1M existing installs as 30% total but decomposes it as "5% billing + 20% service," which sums to 25%, an internal inconsistency. Coda's writeup gives 25% service on existing installs. I could not resolve this against Google's own fee table in this session. **Verify your specific tier in Play Console before modeling it.** Also note: the *old* Epic injunction (zero platform fee on alternative billing in the US) and the *new* settlement framework were both in play during 2026, and Judge Donato publicly questioned whether the settlement was a "sweetheart deal." Confirm which regime your account is actually on.

The practical consequence: "existing installs" being charged more than "new installs" is a genuinely new mechanic with no precedent. It means your blended Google take rate now depends on your **install vintage mix**, which decays over time in a way no existing LTV model accounts for.

**Why this ruins LTV models:** a $39.99 annual plan is not $39.99 of revenue. At Apple's standard 30% it is $27.99 of proceeds, a 43% overstatement if you model on gross. Then subtract VAT (in VAT jurisdictions the customer price is tax-inclusive, so realized revenue falls further), refunds, currency conversion, and foreign withholding. A CAC that appears to pay back inside month one on a gross basis frequently does not pay back at all on a net basis.

### 2. Trial-to-paid conversion has no standard denominator, and the spread is roughly 30x

Take a 10,000-install Health & Fitness cohort at RevenueCat 2026 medians (download-to-trial D30 = 6.9%, trial-to-paid = 37.7%). That is 690 trial starts and ~260 paying conversions. The *same 260 subscribers* can be honestly reported as:

| Denominator | Value | Reported rate | Who reports it this way |
|---|---|---|---|
| Installs | 10,000 | **2.6%** | Growth/UA teams reporting install-to-paid |
| Registrations (assume 40% install-to-reg) | 4,000 | **6.5%** | Lifecycle teams |
| Trial starts | 690 | **37.7%** | RevenueCat's definition, the defensible default |
| Trials *ended* in window (assume 500 resolved) | 500 | **52.0%** | Anyone measuring before the cohort matures |
| Trials that *reached the renewal attempt* (assume 310) | 310 | **83.9%** | Vendors and decks |

That is a 2.6% to 83.9% range, roughly 32x, with zero fabrication at any step. The last row is the one to watch: **excluding people who cancelled during the trial removes the entire population the metric exists to measure.** It converts trial-to-paid into a payment-success rate. RevenueCat's published definition is unambiguous and should be your default: "the share of free trial starts that convert into a paid subscription."

The second-order trap is **cohort immaturity**. A 7-day trial billed on day 8 with a 3-day billing retry window is not resolved for ~11 days. Any trial-to-paid figure computed on a window shorter than trial length + retry window is biased upward, because unresolved trials sit outside the denominator while early cancels are already excluded.

### 3. Consumer subscription churn is structurally different from B2B, and comparing them is a category error

RevenueCat 2026: annual subscriptions lose **~72% of subscribers in year one** (worsened from ~56% in the 2025 edition). Stated the other way, one-year retention of yearly subscribers is 27–28% for both hard-paywall and freemium apps. Adapty 2026 puts Day-380 retention at 19.9% for annual-with-trial, 14.2% for monthly, and 5.5% for weekly.

A healthy B2B SaaS business runs 85–90%+ annual gross logo retention. A healthy consumer app runs 20–30%. These are not the same metric on the same scale, they are different businesses with different unit economics. Consumer subscription is a **replenishment business**: it survives on continuous acquisition against a short, steep decay curve, not on expansion against a durable base. Three specific consequences:

- **Net revenue retention above 100% is not a consumer benchmark.** There is no seat expansion. NRR in consumer is capped near the renewal rate plus reactivation, and reactivation is small.
- **"Good churn" cannot be borrowed across.** A 5% monthly churn figure is a crisis in B2B and roughly the *floor* of what a good consumer monthly plan achieves.
- **Payback windows must be shorter.** With 72% year-one annual churn, a 12-month CAC payback assumption is only valid if you have modeled the churn out of it, which most spreadsheets do not.

---

# THE METRICS

---

## 1. Store Impression-to-Product-Page-View Rate (Tap-Through Rate)

**applies_to:** consumer (mobile-specific; B2B apps distributed through app stores share the mechanic but rarely optimize it)

**definition:** The share of people who saw your app in store search or browse results and tapped through to your product page.

**formula_variants:**
- `Product page views ÷ Impressions` — the standard. Right when diagnosing icon, title, subtitle, and first-screenshot performance, since those are the only assets visible in the results list.
- `Product page views ÷ Unique impressions` — Apple reports both. Unique deduplicates repeat exposure to the same account. Right when you want a per-person read rather than a per-exposure read; the unique-based number is always higher.
- Split by traffic source (Search, Browse, App Referrer, Web Referrer) — right in almost all cases, because browse and search impressions behave nothing alike and blending them produces a number that moves for reasons you cannot act on.

**inputs:** App Store Connect App Analytics (impressions, unique impressions, product page views by source); Google Play Console Store Listing Acquisition report (store listing acquisitions, though Google's funnel naming differs).

**application:** Drives creative-asset decisions on the store listing (icon, name, subtitle, screenshot 1) and is the first place to look when installs fall without a ranking change. Feeds store conversion rate and ultimately blended organic install volume.

**benchmark:** NO SOURCED BENCHMARK FOUND for tap-through rate specifically. Related and sourced: AppTweak (published May 18, 2026, data 2025, US market) reports an **App Store "install rate" of 3.8%**, defined as users downloading directly from search or browse results *without* clicking through to the product page, with Medical highest at 7.8% and Games–Board lowest at 0.6%.

**traps:** Apple's "impressions" include appearances in Today/Games/Apps tabs and Search Ads placements, so a Search Ads campaign inflates impressions and depresses this rate without anything getting worse. Google Play does not expose an equivalent impression count in the same shape, so cross-platform comparison of this specific metric is invalid. Branded search impressions convert far higher than category search, so an SEM or influencer push that drives branded search makes this metric jump for reasons unrelated to your assets.

**related:** Store Conversion Rate, Install Rate, Keyword and ASO Visibility.

---

## 2. Store Conversion Rate (Product Page View to Install)

**applies_to:** consumer (transfers to any store-distributed B2B app)

**definition:** The share of people who viewed your app's store product page and then downloaded the app.

**formula_variants:**
- `Installs ÷ Product page views` — the common definition, and what AppTweak and most ASO tools mean. Right for evaluating product page assets.
- `Total downloads ÷ Total impressions` — the "full-funnel" or "conversion-to-install" version, which folds in tap-through. Apple's App Analytics "conversion rate" is computed this way against unique devices. Right for measuring total store efficiency, wrong for isolating page assets. **This is the single most common source of two people quoting different "app store conversion rates" for the same app.**
- `First-time downloads ÷ Product page views` — excludes redownloads and updates. Right for UA reporting, because redownloads are not new users.
- `Installs ÷ Product page views`, split by source — right always. Paid traffic to a custom product page and organic category browse are different populations.

**inputs:** App Store Connect App Analytics; Google Play Console Store Performance; AppTweak, Sensor Tower, Appfigures, data.ai for competitive/category benchmarking.

**application:** Governs whether ASO creative work (screenshots, preview video, custom product pages) is the highest-leverage growth lever versus paid spend. A low store CVR silently taxes every paid channel simultaneously, because every ad dollar routes through the same page.

**benchmark (AppTweak, published May 18, 2026, data year 2025, US market):**

| Market | Average conversion rate |
|---|---|
| App Store (iOS) overall | **8.56%** |
| Google Play overall | **16.15%** |
| App Store, Food & Drink (highest) | **52.8%** |
| App Store, Games–Trivia (lowest) | **5.2%** |
| Google Play, Auto & Vehicles (highest) | **62.3%** |
| Google Play, Games–Strategy (lowest) | **6.6%** |

Also relevant: since the **March 2026 App Store Connect update**, Apple shows each metric widget against your peer group's 25th, 50th, and 75th percentiles, bucketed by category, business model, and download-volume tier. That in-console peer benchmark is more useful than any published average and should be the primary reference.

**traps:** The iOS 8.56% and Play 16.15% figures **are not comparable**, because Apple and Google define the denominator differently and Play counts store listing acquisitions on a different basis. Do not put them in the same chart. Category averages are dominated by branded search intent, so an app with strong brand awareness posts a high store CVR that reflects demand, not creative quality. Custom Product Pages and Product Page Optimization tests split traffic in ways that make the account-level average meaningless during a test. Finally, a rising store CVR alongside falling installs almost always means impression volume shifted from browse (low intent) to branded search (high intent), which is a demand story, not an ASO win.

**related:** Impression-to-Page-View Rate, Install Rate, Keyword and ASO Visibility, Install-to-Registration.

---

## 3. Keyword and ASO Visibility Metrics

**applies_to:** consumer (transfers weakly to B2B)

**definition:** The set of metrics tracking how discoverable an app is in store search, including keyword rankings, category rank, and estimated search-driven install volume.

**formula_variants:**
- **Keyword rank:** ordinal position for a query. Right for tracking specific target terms.
- **Visibility score / Share of voice:** `Σ (traffic score of ranked keyword × position weight)` across the tracked set. Every vendor (AppTweak, Sensor Tower, Appfigures, MobileAction) uses a different proprietary weighting, so **these scores are not comparable between tools and are only valid as a within-tool time series.**
- **Search-driven install share:** `Installs from Search ÷ Total organic installs`, from App Store Connect source data. Right for sizing whether ASO deserves investment at all.
- **Branded vs non-branded split:** `Non-branded search installs ÷ Total search installs`. This is the only ASO metric that isolates *acquired* discoverability from demand you generated elsewhere.
- **Category rank:** ordinal position in Top Free/Top Grossing for a category. Right as a competitive signal, wrong as a KPI, because it is a function of download velocity and cannot be optimized directly.

**inputs:** App Store Connect (Search source installs); Google Play Console (Search acquisitions); AppTweak / Sensor Tower / Appfigures / MobileAction for keyword rank and volume estimates. Note that keyword search-volume figures on iOS are **modeled estimates**, not Apple-reported data.

**application:** Determines metadata and localization priorities and sizes the organic ceiling. Feeds blended CAC by lowering the paid share of installs.

**benchmark:** NO SOURCED BENCHMARK FOUND. Keyword rank benchmarks are not meaningfully generalizable across categories or query sets, and vendor visibility scores are proprietary and non-comparable.

**traps:** The most common failure is optimizing for keywords with high estimated volume and no purchase intent, which lifts installs and destroys install-to-paid. Vendor keyword volume on iOS is inferred, and different vendors disagree substantially on the same term. Apple Search Ads spend on a keyword can lift *organic* rank for that keyword, so an "ASO win" often disappears when the campaign pauses. Ranking for your competitor's brand name looks great and converts poorly. And ASO metrics are almost always reported without a downstream revenue tie, which is exactly the vanity trap: **keyword rank with no path to paid conversion is not a growth metric.**

**related:** Store Conversion Rate, Install Rate, Rating and Review Volume, Download-to-Paid.

---

## 4. Rating and Review Volume / Average Star Rating

**applies_to:** consumer (transfers to B2B mobile apps, though B2B buying rarely routes through store ratings)

**definition:** The count of user ratings and written reviews and the resulting average star score displayed on the store listing.

**formula_variants:**
- **Displayed average:** Apple shows a rolling average per storefront that can be reset on a new version. Google Play since 2021 uses a **recency-weighted** average, so recent ratings count for more. **The two platforms compute the displayed number differently and their averages are not comparable.**
- **Rating volume rate:** `New ratings ÷ New installs` in a period. Right for judging whether your rating prompt strategy is working, independent of sentiment.
- **Rating velocity:** new ratings per week. Right as a leading indicator, since store algorithms weight recency.
- **Net sentiment:** `(4–5 star) ÷ Total ratings` or `(4–5 star) − (1–2 star)`. Right for product diagnostics, because the mean hides a bimodal distribution.
- **Review response rate and time to response** (Play, and Apple since 2018). Right as an operational metric; Google has stated responses correlate with rating improvement.

**application:** Ratings feed store ranking algorithms and directly move store conversion rate. This is the legitimate path from ratings to pipeline: rating lifts store CVR, store CVR lifts organic installs, organic installs lower blended CAC. **Absent that chain, review volume is vanity.**

**inputs:** App Store Connect Ratings and Reviews; Google Play Console; Appbot, AppFollow, or Sensor Tower for tagged sentiment analysis.

**benchmark:** NO SOURCED BENCHMARK FOUND for a credible, dated, category-segmented rating benchmark. The widely repeated "4.5+ is good" figure did not trace to a citable dated source in this session.

**traps:** The single biggest trap is that **rating prompts are usually fired after a success event**, which makes the average a measure of your prompt targeting rather than of product quality. Apple's version-reset option lets a team "improve" its rating by discarding history. A paywall change that increases revenue frequently tanks the rating within days, and the rating damage shows up in store CVR weeks later, so the revenue win and the acquisition cost land in different reporting periods and get attributed to different causes. Review *volume* scales with install volume, so it rises during any UA push and tells you nothing.

**related:** Store Conversion Rate, Keyword and ASO Visibility, Refund Rate (1-star reviews and refund requests correlate).

---

## 5. D1 / D7 / D30 Install Retention

**applies_to:** consumer (the concept transfers to B2B, but the benchmarks absolutely do not)

**definition:** The share of a install cohort that opens the app again on, or by, a given day after install.

**formula_variants:**
- **Classic / "N-day" retention:** `Users active exactly on day N ÷ Cohort size`. This is what Adjust, AppsFlyer, and most MMPs report. Right for cross-app benchmarking, because it is the industry default.
- **Rolling / "unbounded" retention:** `Users active on day N or any day after ÷ Cohort size`. Right for apps with intentionally low frequency (travel, tax, event apps), where classic retention badly understates health.
- **Range / "bracket" retention:** `Users active at any point between day N and day M ÷ Cohort size`. Right for weekly-cadence apps. Amplitude and Mixpanel both offer this.
- **Return retention:** `Users active on day N ÷ Users active on day N-1`. Right for measuring day-over-day stickiness, wrong for cohort health.

**These variants produce materially different numbers from identical data.** Rolling retention is always ≥ classic. Any retention figure quoted without naming the variant is unusable.

**inputs:** AppsFlyer, Adjust, Branch, Singular (MMP-side); Amplitude, Mixpanel, Firebase (product-side). MMP and product-analytics retention almost never match, because MMPs cohort on attributed install and product tools cohort on first session.

**application:** Gates UA scaling. Retention is the leading indicator for LTV that resolves in days rather than months, so it is the primary early kill/scale signal on a channel or creative. Feeds LTV, payback period, and the LTV:CAC ratio.

**benchmark (Adjust *Mobile App Trends 2026*, published Feb 2026, and AppsFlyer *State of App Marketing 2025*, published Q1 2026 covering FY2025. **Retrieved via aggregator, not verified against the primary reports in this session, treat as second-hand**):**

| Segment | D1 | D7 | D30 |
|---|---|---|---|
| Cross-vertical aggregate | 25–26% | 11–13% | 5–7% |
| Top quartile threshold | 30%+ | 15%+ | 8%+ |
| Messaging / banking / habit apps | 50–70% | 30–50% | 25–50% |
| Gaming | 29–33% | ~16% | ~8.7% |
| Fintech | 22–30% | ~17.6% | ~11.6% |
| E-commerce | 18–24.5% | ~10.7% | 4.8–5% |
| Health & Fitness | 20–27% | ~7% | ~3% |

A separate and much lower set of figures comes from the **Pushwoosh Benchmarks Study 2025**: iOS D7 6.89% and D30 3.10%, Android D7 5.15% and D30 2.82%. The gap versus Adjust is large enough that the two studies are almost certainly using different retention variants and different panel compositions. **Do not average them.**

**traps:** The variant problem above is the dominant one. Beyond it: iOS ATT means MMP-attributed cohorts are a non-random subset of installs (consented users retain better), so post-ATT iOS retention is biased upward relative to the true population. Reinstalls counted as new installs depress the metric; reinstalls counted as returning users inflate it, and MMPs differ on this. Push-notification-driven opens count as retention, so a team can manufacture D7 with a notification blast without improving anything. Most damaging for this family: **install retention and subscription retention are different metrics with different denominators, and a healthy D30 does not imply a healthy month-1 renewal.** Non-paying retained users cost money.

**related:** Download-to-Paid, Trial Start Rate, Subscription Renewal Rate (distinct from this), ARPDAU.

---

## 6. Install-to-Registration Rate

**applies_to:** consumer (transfers directly to B2B mobile and to any product with an account wall)

**definition:** The share of installs that complete account creation.

**formula_variants:**
- `Registrations ÷ Installs` in a fixed window (D1 or D7 are standard). Right for a clean cohort read.
- `Registrations ÷ First app opens`, sometimes called activation-to-registration. Right when install-to-open leakage is material, which it is on Android where install-to-open loss of 10–20% is routine. Using installs as the denominator blames the signup flow for a download that never launched.
- `Registrations ÷ Users who reached the signup screen`. Right for isolating form friction from everything upstream of it.
- Split by auth method (Apple/Google SSO vs email vs phone). Right always, since Sign in with Apple's private relay materially changes downstream identity resolution and lifecycle reachability.

**inputs:** Amplitude, Mixpanel, or Firebase for the event funnel; MMP for the install denominator. Requires that install and first-open events resolve to the same identity, which is the usual failure point.

**application:** Decides whether to gate the paywall behind registration, and whether registration should precede or follow the first value moment. Directly determines how many users you can reach with lifecycle messaging, which is the primary lever on trial start rate and win-back.

**benchmark:** NO SOURCED BENCHMARK FOUND. I could not locate a credible, dated, category-segmented install-to-registration benchmark. Related and sourced: Adapty (Mar 13, 2026) reports **global install-to-trial of 10.9%**, and RevenueCat (Mar 2026) reports **download-to-trial D30 medians of 9.1% Business, 6.9% Health & Fitness, 6.5% Education, 6.5% Utilities, 4.4% Gaming, 4.1% Travel, 4.0% Media & Entertainment**, which bounds registration from below since trial generally requires an account.

**traps:** Anonymous or deferred-account flows make this metric look terrible while the business performs fine, and make it look great if you auto-create an anonymous ID and count it as a registration (this is common and dishonest). Sign in with Apple's hide-my-email produces registrations you cannot email, so registration count overstates addressable audience. Registration placed *after* the paywall inverts the funnel entirely and makes this metric non-comparable to apps that gate first. Attribution windows differ between the MMP counting installs and the product tool counting registrations, so the ratio drifts for purely technical reasons.

**related:** Paywall View Rate, Trial Start Rate, Download-to-Paid, Trial-to-Paid (as a denominator candidate).

---

## 7. Paywall View Rate

**applies_to:** consumer

**definition:** The share of users who are actually shown a paywall.

**formula_variants:**
- `Users who viewed a paywall ÷ Installs` — right for full-funnel accounting.
- `Users who viewed a paywall ÷ Registered users` — right when the paywall sits behind the account wall.
- `Paywall impressions ÷ Sessions` — a frequency measure, not a reach measure. Right for judging paywall aggressiveness and its interaction with rating damage.
- `Users who viewed a paywall ÷ Users who reached the gated feature` — right for soft-paywall / freemium apps, where paywall exposure is triggered by intent rather than by onboarding position.

**inputs:** RevenueCat Paywalls, Adapty, Superwall (paywall-level events); Amplitude or Mixpanel if paywalls are instrumented in-house.

**application:** This is the reach half of paywall math. A high paywall conversion rate on a paywall almost nobody sees is worth less than a mediocre rate at full reach. Determines paywall placement strategy (onboarding vs value-moment vs feature-gate).

**benchmark:** NO SOURCED BENCHMARK FOUND for paywall view rate as a standalone figure. Sourced and adjacent: Adapty (Mar 13, 2026) reports that **apps triggering paywalls after a measurable value moment see trial start rates 2.1x higher than those using immediate hard paywalls**, and RevenueCat (Mar 2026) reports **hard-paywall apps convert at 10.7% download-to-paid D35 versus 2.1% freemium**, an approximately 5x gap that is substantially a paywall-reach effect. RevenueCat's 2025 edition put hard paywall at 12.1%, so **hard-paywall conversion declined roughly 1.4 points year over year while freemium held flat at 2.1%.**

**traps:** Hard-paywall apps trivially post ~100% paywall view rate, which makes cross-model comparison of this metric meaningless. Counting a paywall impression on every app open inflates the denominator of paywall conversion rate and deflates the rate for no real reason, so **the choice between unique-user and impression counting silently determines your paywall conversion number.** Onboarding paywalls shown before any value delivery produce high view rates and low conversion; the metric cannot distinguish reach from timing on its own.

**related:** Paywall Conversion Rate, Trial Start Rate, Download-to-Paid, Rating and Review Volume.

---

## 8. Paywall Conversion Rate

**applies_to:** consumer

**definition:** The share of paywall views that result in a purchase or trial start.

**formula_variants:**
- `Purchases ÷ Paywall views (unique users)` — the defensible default.
- `Purchases ÷ Paywall impressions` — right for evaluating a specific placement's per-exposure efficiency, always lower than the unique-user version, often by a lot in apps that re-show paywalls.
- `Trial starts ÷ Paywall views` — right for trial-led apps, and it is a **different metric** from purchase conversion. Conflating them is the most common paywall reporting error.
- `(Trial starts + direct purchases) ÷ Paywall views` — the blended "paywall action rate." Right for comparing paywalls that offer different offer structures, since a trial-only paywall and a no-trial paywall are otherwise not comparable.
- Per-paywall-variant conversion in an A/B test — right for optimization, and the only variant where statistical significance is meaningful.

**inputs:** RevenueCat, Adapty, Superwall, Purchasely (paywall platforms); Amplitude or Mixpanel for custom instrumentation.

**application:** The primary optimization surface in consumer subscription. Adapty reports that apps running experiments earn up to **40x more revenue** than non-experimenters, with top performers averaging **14.7 experiments annually** (Adapty, Mar 13, 2026). Feeds trial start rate and download-to-paid.

**benchmark (Adapty *State of In-App Subscriptions 2026*, published Mar 13, 2026, 16,000+ apps / $3B revenue / 10,000+ paywalls):**

| Paywall configuration | Conversion rate |
|---|---|
| Onboarding paywall **with** trial | **1.35%** |
| In-app paywall **with** trial | **0.89%** |
| Onboarding paywall **without** trial | **0.82%** |
| In-app paywall **without** trial | **0.76%** |
| In-app paywall (all) | **1.60%** |
| Web paywall (all) | **1.10%** |

In-app paywalls convert **45% better than web paywalls** (1.60% vs 1.10%), a critical counterweight to the web-billing take-rate argument (see metric 30).

On paywall structure, RevenueCat (Mar 2026) reports **41–60% of apps show 2 plans** (Health & Fitness highest at 60%), 20–40% show a single plan (Shopping highest at 40%), and 6–27% show 3+ (Travel highest).

**traps:** Adapty's figures are install-normalized, not paywall-view-normalized, which is why they read as ~1% rather than the double-digit rates practitioners quote from their own dashboards. **Check the denominator before comparing your number to any published paywall benchmark, this is the most misquoted benchmark in the family.** Beyond that: paywall conversion and revenue frequently move in opposite directions, because a cheap weekly plan lifts conversion and destroys LTV. Adapty found **hard paywalls carry 21% higher LTV ($41.90 median vs $20.00) while soft paywalls convert nearly 50% better on raw rate**, which is the same trade in one dataset. Test winners chosen on conversion rate alone routinely lose money. Finally, paywall tests are usually run without a trial-to-paid holdout, so a variant that lifts trial starts by weakening intent shows a false win for weeks.

**related:** Paywall View Rate, Trial Start Rate, Trial-to-Paid, Realized LTV, Plan Mix.

---

## 9. Trial Start Rate (Install-to-Trial)

**applies_to:** consumer

**definition:** The share of installs (or registrations, or paywall views) that begin a free trial.

**formula_variants:**
- `Trial starts ÷ Installs` within a fixed window. **RevenueCat uses a D30 window and calls this download-to-trial.** Right for UA and cohort work.
- `Trial starts ÷ Registrations` — right when the paywall is account-gated.
- `Trial starts ÷ Paywall views` — right for paywall optimization specifically.
- `Trial starts ÷ Users reaching the trial offer` — right for apps that mix trial and no-trial paywalls, since it excludes users who were never offered one.

**inputs:** RevenueCat, Adapty, App Store Connect Subscriptions report, Google Play Console; MMP for the install denominator.

**application:** Determines top-of-funnel volume into the trial economy and is the metric most sensitive to paywall placement and trial length. Feeds trial-to-paid and download-to-paid.

**benchmark:**

*RevenueCat (Mar 2026), download-to-trial D30, median (Q3 where given):*

| Segment | Median |
|---|---|
| Business | **9.1%** (Q3 >16.2%) |
| Health & Fitness | **6.9%** |
| Education | **6.5%** |
| Utilities | **6.5%** |
| Gaming | **4.4%** |
| Travel | **4.1%** |
| Media & Entertainment | **4.0%** |
| North America | **7.1%** (Q3 >15.0%) |
| Asia-Pacific | **5.7%** (Q3 >13.5%) |
| Western Europe | **5.0%** |
| IN/SEA | **3.0–3.7%** |
| High-priced apps | **8.9%** (Q3 >16.5%, P90 27.0%) |
| Mid-priced | **5.4%** |
| Low-priced | **4.4%** |

*Adapty (Mar 2026):* global install-to-trial **10.9%**; **AI apps only 5.31%**; Health & Fitness **9.5% globally, 14.5% in North America** (Adapty, Mar 27, 2026).

**Note the conflict:** RevenueCat's category medians (4–9%) sit below Adapty's 10.9% global average. Likely causes are median-vs-mean, a D30 window vs unbounded, and different panel composition. Use RevenueCat's medians for category comparison and Adapty's for paywall-model comparison; do not mix them in one model.

*Timing (RevenueCat, Mar 2026):* trial starts concentrate hard on install day. **Business 89.9% on Day 0, Health & Fitness 82.1%, Gaming 81.5%, Productivity 78.0%** (lowest). Adapty reports **71–95% on Day 0 across categories** and states "90% of trial starts happen on Day 0."

**traps:** High-priced apps post nearly double the trial start rate of low-priced apps (8.9% vs 4.4%), which is counterintuitive and reflects selection, not causation: high-priced apps tend to be hard-paywall, high-intent categories. Do not conclude that raising price lifts trial starts. The Day-0 concentration means **any trial start rate measured on a window shorter than a few days captures nearly the whole population, so extending the window looks like improvement and is not.** Auto-enrolling users into a trial without an affirmative action inflates this metric enormously and craters trial-to-paid, which is why the two must always be read together.

**related:** Paywall Conversion Rate, Trial-to-Paid, Download-to-Paid, Opt-in vs Opt-out Trial Model.

---

## 10. Trial-to-Paid Conversion Rate

**applies_to:** consumer (the metric name transfers to B2B, the benchmarks do not, and B2B usually means opt-in no-card trials which is a different animal entirely)

**definition:** The share of free trials that convert into a paid subscription when the trial ends.

**formula_variants (this is the metric with no standard, see the worked example above):**
- `Paid conversions ÷ Trial starts` — **RevenueCat's published definition** and the defensible default: "the share of free trial starts that convert into a paid subscription."
- `Paid conversions ÷ Trials ended in the period` — right *only* if the cohort is fully mature. Biased upward whenever unresolved trials are excluded from the denominator but early cancels are already reflected.
- `Paid conversions ÷ Trials that reached the renewal attempt` — this is a **payment success rate, not a trial conversion rate.** It excludes everyone who cancelled during the trial. Legitimate only when explicitly labeled as billing success; used as "trial-to-paid" it inflates the number by 2x or more.
- `Paid conversions ÷ Installs` — properly called install-to-paid or download-to-paid, and covered separately as metric 12. Right for UA economics, wrong as "trial conversion."
- `Paid conversions ÷ Registrations` — right when registration is the meaningful commitment step, common in apps with an account wall before the paywall.
- **Second-payment-anchored:** `Subscribers who complete their first *renewal* ÷ Trial starts`. Right when refund abuse or immediate-cancel-after-conversion is material, because the first billing event alone overstates durable conversion.

**Practitioners genuinely disagree here.** Subscription platforms (RevenueCat, Adapty) anchor on trial starts. Finance teams often anchor on trials ended. UA teams anchor on installs. Vendor marketing anchors on whatever is highest. **When someone quotes a trial-to-paid number, the first question is always "over what denominator, and is the cohort mature?"**

**inputs:** RevenueCat, Adapty, Qonversion, or Superwall; App Store Connect Subscription Events; Google Play Console; server-side receipt validation if computed in-house.

**application:** The core economic ratio of a trial-led consumer app. Combined with trial start rate it yields install-to-paid, which combined with RPI yields whether a UA channel is buyable.

**benchmark (RevenueCat, Mar 2026, median with Q3):**

*By category:*

| Category | Median | Q3 |
|---|---|---|
| Travel | **43.5%** | >62.4% |
| Health & Fitness | **37.7%** | >51.4% |
| Shopping | ~35% | |
| Utilities | ~33% | |
| Social & Lifestyle | ~32% | |
| Education | ~30% | |
| Gaming | **25.0%** | >39.8% |
| Photo & Video | **22.2%** | >33.1% |

*By trial length (the strongest single lever in the dataset):*

| Trial length | Median trial-to-paid |
|---|---|
| 17–32 days | **42.5%** (Q3 >59.4%) |
| 5–9 days | **37.4%** (Q3 >52.8%) |
| 10–16 days | **35.4%** |
| ≤4 days | **25.5%** (Q3 >38.5%) |

Longer trials convert **~70% better**. Yet adoption moved the wrong way: **≤4 day trials rose to 46.5% of apps from 42.1%, while 17–32 day trials fell to 5.0% from 6.1%** (RevenueCat, Mar 2026). Gaming runs 73.3% short trials, Photo & Video 68.2%, Health & Fitness lowest at ~40%.

*By geography:* North America **34.2%** (Q3 >47.9%, P90 60%+), Asia-Pacific **31.9%**, Western Europe **29.7%**, LatAm/MEA/ROW ~20–23%, IN/SEA **15.2%** (Q3 >25.0%).

*Adapty (Mar 2026)* reports a global trial-to-paid average of **25.6%**, with Health & Fitness **35.0%** and Entertainment **19.1%**, plus a weekly-subscription Health & Fitness figure of **42.2%**.

*Trial cancellation timing (RevenueCat, Mar 2026):* **3-day trials, 55.4% of all cancellations happen on Day 0** (up from ~51% in the 2025 edition); 7-day **39.8%**; 14-day **35.7%**; 30-day **31.1%**. For 3-day trials, **84% of cancellations land by Day 1.**

**traps:** Beyond the denominator problem: (a) the trial-length effect is **partly selection**, since apps confident enough to run 30-day trials differ systematically from apps that do not, so do not expect to capture the full 70% lift by lengthening your trial; (b) shortening the trial mechanically raises trial *starts* and lowers trial-to-paid, so a team optimizing one metric can look good on it while total paid conversions fall; (c) **Day-0 cancellation is not churn, it is a purchase decision**, and apps that treat it as a retention problem build the wrong intervention; (d) a trial that requires a card and a trial that does not produce numbers that differ by roughly 3x and must never be blended (see metric 11); (e) trial extensions, promotional offers, and win-back offers applied at trial end are frequently counted as conversions, which is a real revenue event but a different one.

**related:** Trial Start Rate, Opt-in vs Opt-out Trial Model, Download-to-Paid, Introductory Offer Conversion, Refund Rate, Subscription Renewal Rate.

---

## 11. Opt-in vs Opt-out Trial Economics

**applies_to:** consumer (highly relevant to B2B as the PLG "credit card required" debate, with the same structure and different magnitudes)

**definition:** The comparison between trials that require payment credentials up front and auto-convert (opt-out) versus trials that do not require a card and require an affirmative purchase to continue (opt-in).

**formula_variants:**
- **Per-model trial-to-paid:** compute metric 10 separately for each model. Never blend, the mixture is not interpretable.
- **Model-normalized comparison:** `Paid conversions ÷ Installs` per model. This is the only apples-to-apples comparison, because opt-out inflates trial-to-paid and suppresses trial starts while opt-in does the reverse. **Comparing the two on trial-to-paid alone is meaningless.**
- **Refund-adjusted conversion:** `(Paid conversions − Refunds in first billing period) ÷ Trial starts`, per model. Right because opt-out trials generate structurally higher refund and chargeback rates from users who forgot they enrolled.
- **Net-of-churn conversion:** `Subscribers surviving to first renewal ÷ Trial starts`, per model. Right for LTV modeling; the opt-in/opt-out gap narrows substantially at this measurement point.

**inputs:** RevenueCat or Adapty with paywall configuration metadata; App Store Connect Subscription Events for refund timing; Play Console.

**application:** This is one of the highest-leverage single decisions in a consumer subscription app, and it changes the shape of every downstream metric simultaneously. It also has regulatory exposure (see traps).

**benchmark (Adapty *State of In-App Subscriptions 2026*, published Mar 2026):**

| Trial model | Trial-to-paid conversion |
|---|---|
| Freemium (no trial) | **2.6%** |
| Opt-in, no card required | **18.2%** |
| Opt-out, card-gated | **48.8%** |

That is a **~2.7x gap between opt-in and opt-out**, and it is almost entirely a selection effect: card entry filters the population before the trial starts rather than converting more of it. Corroborating: Adapty reports **trial subscribers retain 1.4–1.7x better than direct buyers**, and Day-380 retention of **19.9% for annual-with-trial versus 14.2% monthly and 5.5% weekly**.

Note that on iOS and Android the platform default *is* opt-out, since StoreKit and Play Billing free trials attach to an existing store payment method and auto-renew. **True opt-in trials on mobile generally require web billing or a custom no-payment-method flow**, which is precisely why the external purchase link ruling (metric 29) matters to trial design and not only to margin.

**traps:** The 48.8% figure is the number most often quoted as "our trial-to-paid" without disclosing the model, and it is roughly double the RevenueCat all-app median of ~30%. Opt-out trials import three costs that never appear in the conversion metric: elevated refund rate, elevated chargebacks, and 1-star reviews complaining about surprise charges (which then depress store conversion rate weeks later). There is real regulatory exposure: negative-option and auto-renewal disclosure rules in the US (FTC), and EU consumer law, both constrain opt-out design, and enforcement here has been active. Finally, opt-out trials make **trial starts a near-useless intent signal**, so cohort quality scoring built on trial starts breaks entirely under an opt-out model.

**related:** Trial-to-Paid, Trial Start Rate, Refund Rate, Involuntary Churn, Web Billing Economics.

---

## 12. Download-to-Paid Conversion (Install-to-Paid)

**applies_to:** consumer

**definition:** The share of installs that produce at least one paid subscription within a defined window.

**formula_variants:**
- `Installs with ≥1 paid subscription ÷ Installs`, in a fixed window. **RevenueCat uses D35**, defined as "the share of installs that result in at least one paid subscription within 35 days of the install date." The 35-day window is deliberate: it clears a monthly cycle plus a 7-day trial plus retry.
- `First-time payers ÷ Installs` at D7 / D14 / D30 / D60 — right for matching your UA feedback loop; shorter windows are more actionable and systematically understate.
- `Paid conversions ÷ Installs` (counting all conversions, not unique payers) — right for revenue attribution, wrong for conversion measurement, since it double-counts users who buy twice.
- **Composed form:** `Trial start rate × Trial-to-paid + Direct purchase rate`. Right for diagnosis, because it tells you which of the two halves is broken.
- `Paid conversions ÷ First opens` — right when install-to-open loss is material (Android).

**inputs:** RevenueCat, Adapty; MMP for the install denominator; App Store Connect and Play Console for the purchase side.

**application:** The single number that determines whether paid UA is viable, since combined with RPI and CAC it produces payback. This is the metric to hand a media buyer.

**benchmark (RevenueCat, Mar 2026, download-to-paid D35, median with Q3):**

| Segment | Median | Q3 |
|---|---|---|
| **Hard paywall** | **10.7%** | >20.0% (P90 38.7%) |
| **Freemium** | **2.1%** | >4.5% |
| Health & Fitness | **2.9%** | >6.2% |
| Business | **2.6%** | >5.0% |
| Education | **2.4%** | |
| Shopping | **1.3%** | |
| Gaming | **1.0%** | >2.3% |
| North America | **2.8%** | >6.0% (P90 10.9%) |
| Asia-Pacific | **2.4%** | >5.1% |
| Western Europe | **2.0%** | |
| Global | **2.0%** | |
| IN/SEA | **0.7%** | >1.9% |
| High-priced | **2.8%** | >6.1% (P90 13.5%) |
| Mid-priced | **2.0%** | >4.4% |
| Low-priced | **1.4%** | >3.7% |

Year over year, hard paywall fell from **12.1% (2025) to 10.7% (2026)** while freemium held at **2.1%**.

*Adapty (Mar 2026):* onboarding paywalls with trials produce the highest install-to-paid at **1.78% average**.

**traps:** The **hard paywall 5x advantage is the most over-read finding in this family.** RevenueCat's own data shows one-year retention is *nearly identical* between models (27% hard paywall vs 28% freemium), and hard paywall collapses install volume, so the correct comparison is revenue per install, not conversion rate. On that basis the gap is real but different in character: **D60 RPI $3.09 hard paywall vs $0.38 freemium**, an 8x gap. Second trap: the window matters enormously and D35 is not a standard, so a D7 install-to-paid and a D60 install-to-paid are not comparable and both get called "install-to-paid." Third: this metric is computed on *gross* purchase events, so it says nothing about net revenue after take rate and refunds. Fourth: paid-UA cohorts and organic cohorts have wildly different install-to-paid, and a blended figure moves with channel mix rather than with performance.

**related:** Trial Start Rate, Trial-to-Paid, Paywall Conversion Rate, Revenue Per Install, Realized LTV.

---

## 13. Introductory Offer Conversion Rate

**applies_to:** consumer

**definition:** The share of users taking a discounted or paid introductory offer (pay-as-you-go or pay-up-front at a reduced price) who continue at full price when the offer period ends.

**formula_variants:**
- `Full-price renewals ÷ Introductory offer starts` — the default.
- `Full-price renewals ÷ Introductory periods completed` — right only on a mature cohort; same immaturity bias as trial-to-paid.
- **Segmented by offer type:** free trial vs pay-up-front vs pay-as-you-go. Apple treats all three as introductory offers but they behave completely differently, and **only the paid variants accrue days of paid service toward Apple's 15% post-year-one rate.** Free trials do not.
- `Full-price renewals ÷ Introductory offer starts`, net of refunds in the first full-price period. Right because sticker shock at the first full charge produces a refund spike.
- **Offer-uplift form:** `(Conversion with offer − Conversion without offer) ÷ Conversion without offer`, run as a holdout. Right because the only question that matters is whether the discount bought incremental subscribers or discounted ones you would have gotten anyway.

**inputs:** App Store Connect Subscription Events (offer type is on the transaction); Google Play Console; RevenueCat or Adapty offer reporting.

**application:** Governs discounting strategy and directly interacts with Apple's commission tier timing. Feeds realized LTV and blended take rate.

**benchmark:** NO SOURCED BENCHMARK FOUND for introductory offer conversion specifically. Adjacent and sourced: Adapty (Mar 2026) reports **"9 in 10 subscriptions sell at full price"** across categories, with **Education highest on discount adoption at 14.3%** and **Utilities lowest at 1.2%**. So introductory discounting is a minority strategy, which is itself the useful finding.

**traps:** The overwhelming trap is **failing to run a holdout**, which makes every intro offer look successful because it is measured against nothing. Intro offers cannibalize full-price purchasers who were going to convert anyway, and the cannibalization is invisible in the conversion metric. Apple's eligibility rules are strict (one introductory offer per subscription group per account, ever), so repeated-offer strategies silently fail for returning users. Pay-up-front intro offers inflate month-1 revenue and depress month-2 through month-N, which makes cohort revenue curves look front-loaded and misleads payback modeling. And because free trials do not accrue days of paid service, an app that switches from a paid intro to a free trial pushes its 15% commission date out by the length of the intro period.

**related:** Trial-to-Paid, Subscription Renewal Rate, App Store Take Rate, Realized LTV, Refund Rate.

---

## 14. Subscription Renewal Rate by Period (R1, R2, R3, R12)

**applies_to:** consumer (the concept transfers to B2B, the benchmarks are a category error to transfer, see the callout above)

**definition:** The share of subscribers who renew at each successive billing cycle.

**formula_variants:**
- **Period-over-period renewal:** `Subscribers renewing at period N ÷ Subscribers active at period N-1`. The standard. Right for reading the shape of the decay curve.
- **Cumulative cohort retention:** `Subscribers still active at period N ÷ Original cohort`. Right for LTV integration; this is the number to multiply by price.
- **Active renewal rate (RevenueCat's definition):** "the share of renewals that are done by subscribers that were **active in the second half of the previous subscription period**." Right for separating engaged renewals from zombie renewals (people who forgot to cancel). **This is a meaningfully different and more honest number than raw renewal rate, and RevenueCat is the only major source publishing it.** Zombie renewals are real revenue but they predict refunds and one-star reviews, not durable LTV.
- **Voluntary-only renewal rate:** `Renewals ÷ (Subscribers at N-1 − Involuntary churn at N)`. Right for isolating product/value problems from billing problems.
- **Retention by plan duration, computed separately** for weekly, monthly, and annual. Mandatory. A blended renewal rate across plan durations is arithmetic nonsense because the periods are different lengths.

**inputs:** RevenueCat, Adapty, Baremetrics; App Store Connect Subscriptions report (Apple reports retention by cohort natively); Google Play Console subscription retention.

**application:** The core input to LTV, payback, and how aggressively you can spend on acquisition. Also the metric that determines whether an annual-plan push is accretive.

**benchmark:**

*RevenueCat (Mar 2026), annual plans:*
- **Year-1 total churn ~72%**, worsened from ~56% in the 2025 edition. One-year retention of yearly subscribers is **28% freemium, 27% hard paywall** (statistically indistinguishable).
- **35% of all annual cancellations occur in Month 1.**
- Mid-year monthly cancellation runs **3–10%**, with a spike in **Month 12** immediately before renewal.

*Adapty (Mar 2026), Day-380 retention by plan type:*

| Plan type | Day-380 retention |
|---|---|
| Annual with trial | **19.9%** |
| Monthly | **14.2%** |
| Weekly | **5.5%** |

*Adapty (Mar 27, 2026), Health & Fitness renewal ladder:*

| Renewal | Retention |
|---|---|
| 1st renewal | **59.2%** |
| 2nd renewal | **45.1%** |
| 3rd renewal | **37.1%** |

*Adapty first-renewal rate by category (Mar 2026):* **Utilities 58.1%**, **Health & Fitness 30.3%**. Health & Fitness weekly-with-trial first renewal is **67.7%**.

**Note the apparent conflict** in Adapty's own Health & Fitness numbers (30.3% first renewal in the cross-category cut, 59.2% in the category deep-dive). These are almost certainly different plan-duration mixes. **Always ask which plan duration a renewal rate refers to.**

*AI apps (RevenueCat, Mar 2026):* AI app monthly-plan 12-month retention is **36% worse** than traditional apps, and AI apps churn **30% faster** overall, despite **41% higher year-1 realized LTV per payer ($30.16 vs $21.37)**.

**traps:** (a) **Blending plan durations** produces a meaningless number; a 5% weekly churn and a 5% annual churn are 40x apart in annualized terms. (b) Month-12 renewal for an annual plan is a single decision point where the entire year's value is re-litigated, and RevenueCat's data shows a pre-renewal cancellation spike, so annual plans do not have "low churn," they have **deferred, concentrated churn.** (c) Involuntary churn is bundled into most renewal rate reports, so a renewal decline can be a payments problem masquerading as a product problem. (d) Cohort immaturity: a 12-month retention figure requires 12 months of data, and teams routinely extrapolate from month 3. (e) The year-over-year deterioration in RevenueCat's annual churn (56% to 72%) is large enough that **2025-vintage benchmarks are actively misleading for 2026 planning.**

**related:** Involuntary Churn, Dunning Recovery, Plan Mix, Realized LTV, Cohort Revenue Curve, Reactivation Rate.

---

## 15. Monthly vs Annual vs Weekly Plan Mix

**applies_to:** consumer (transfers to B2B as the annual-contract mix question, with far less weekly relevance)

**definition:** The distribution of subscriptions sold across billing periods, and its downstream effect on churn, cash, and LTV.

**formula_variants:**
- **Unit mix:** `Subscriptions sold in duration D ÷ Total subscriptions sold`. Right for understanding user preference and paywall design.
- **Revenue mix:** `Revenue from duration D ÷ Total revenue`. Right for financial planning, and it diverges sharply from unit mix because annual plans carry far more revenue per unit.
- **Active-subscriber mix:** `Active subscribers on duration D ÷ Total active`. Right for churn forecasting; annual plans accumulate in this measure because they survive longer.
- **Duration-weighted LTV contribution:** `Σ (mix share × duration LTV)`. Right for deciding which plan to promote on the paywall.
- **Cash-vs-recognized split:** annual plans collect 12 months of cash immediately but recognize monthly. Right for anyone modeling CAC payback, because **annual plans can make payback look instant on a cash basis and unchanged on a recognized basis.**

**inputs:** RevenueCat, Adapty; App Store Connect and Play Console product-level reporting; Baremetrics for MRR normalization.

**application:** The most consequential paywall design decision after price. Determines cash conversion cycle, refund exposure, blended churn, and (critically) how quickly subscribers cross Apple's one-year threshold for the 15% rate.

**benchmark (RevenueCat, Mar 2026, subscriptions sold):**

*Overall:* Monthly **42%**, Yearly **34%**, Weekly the remainder.

*By category (dominant duration):*

| Category | Mix |
|---|---|
| Gaming | **82% weekly**, 13% yearly |
| Productivity | **77% monthly** |
| Health & Fitness | **68% monthly** (but see revenue note below) |
| Shopping | **66% yearly** |
| Travel | **66% yearly**, 18% weekly |
| Utilities | 45% monthly, 33% yearly |

*By geography:* North America 40% yearly / 36% monthly; Western Europe 41% monthly / 35% yearly; MEA **55% monthly** (highest); IN/SEA **19% yearly** (lowest); LatAm **29% weekly** (highest).

*Revenue mix (Adapty, Mar 2026):* **Weekly subscriptions now account for 56% of total app revenue, up from 43.3% in 2023.** In Health & Fitness specifically, **annual plans are 61% of revenue in 2025, up from 51% in 2023** (Adapty, Mar 27, 2026).

*RPI by plan duration (RevenueCat, Mar 2026):*

| Dominant duration | D14 RPI | D60 RPI |
|---|---|---|
| Yearly | **$0.36** | **$0.46** |
| Weekly | **$0.19** | **$0.32** |
| Monthly | **$0.18** | **$0.29** |
| Lifetime | **$0.19** | **$0.24** |

*Adapty:* weekly plans **convert 1.7–7.4x better than annual** across price tiers, and **weekly + 3-day trial is the highest-LTV configuration at $49.27 over 12 months**, a **636% increase over annual without trial**.

**traps:** This is where the biggest self-deception in consumer subscription lives. **Weekly plans convert best, produce the most revenue in aggregate, and have the worst retention (5.5% at Day 380).** They are a high-velocity, high-churn machine that requires continuous acquisition to stand still. A team that shifts mix toward weekly will see conversion, RPI, and revenue all improve while the business becomes structurally more fragile, and no single metric will flag it. Second trap: **annual plans defer churn rather than reducing it**, so an annual push improves reported churn for 11 months and then produces a cliff. Third: the "68% monthly" Health & Fitness unit mix versus "61% of revenue from annual" in the same category is not a contradiction, it is the unit-vs-revenue divergence, and quoting one as if it were the other is a common error. Fourth: annual plans carry far larger refund exposure per unit and a longer refund window in some jurisdictions.

**related:** Subscription Renewal Rate, Realized LTV, Refund Rate, App Store Take Rate (the one-year threshold), Cohort Revenue Curve.

---

## 16. Involuntary Churn Rate (Billing Failure Churn)

**applies_to:** consumer (transfers directly to B2B, where it is typically a smaller share of total churn)

**definition:** The share of subscription cancellations caused by a failed payment rather than by a deliberate user decision.

**formula_variants:**
- `Involuntary cancellations ÷ Total cancellations` — the share form. Right for sizing the opportunity against voluntary churn.
- `Involuntary cancellations ÷ Subscribers at period start` — the rate form. Right for forecasting and for comparing across apps of different churn levels.
- `Failed renewal attempts ÷ Total renewal attempts` — the **billing failure rate**, which is upstream of churn and includes failures that later recover. Right for diagnosing payment health.
- `(Failed renewals − Recovered renewals) ÷ Total renewal attempts` — **net involuntary churn.** Right for the number that actually hits revenue, and the one most often conflated with the gross figure.
- Split by platform, card network, and geography. Mandatory, because the drivers (expired cards, insufficient funds, issuer declines, regional payment method failure) are completely different populations.

**inputs:** RevenueCat, Adapty; App Store Connect Subscription Events (`DID_FAIL_TO_RENEW`, `GRACE_PERIOD_EXPIRED`); Google Play Real-time Developer Notifications (`SUBSCRIPTION_IN_GRACE_PERIOD`, `SUBSCRIPTION_ON_HOLD`, `SUBSCRIPTION_RECOVERED`); Stripe or Paddle for web billing.

**application:** Involuntary churn is the cheapest churn to fix because the user has not decided to leave. It is almost pure recoverable revenue, and on Android it is enormous.

**benchmark (RevenueCat, Mar 2026):**

| Platform | Billing failures as share of cancellations | 2025 comparison |
|---|---|---|
| **Google Play** | **31%** | 28.2% (worsening) |
| **App Store** | **14%** | 15.1% (improving) |

RevenueCat labels this "Google Play's billion-dollar leak." **Roughly a third of all Google Play subscription cancellations are payment failures, not decisions.** The platform gap is more than 2x and is widening.

**traps:** The dominant trap is **attributing involuntary churn to product**. A team seeing Android retention 15 points below iOS often rebuilds the Android onboarding when the actual problem is payment instrument failure. Second: gross versus net. Many apps report every failed renewal as involuntary churn without netting out grace-period recoveries, which overstates the problem, while others report only unrecovered failures and understate the opportunity. Third: the platforms handle retries themselves, so **you cannot run your own dunning on IAP subscriptions**, which means the standard B2B playbook (email sequences, card updater, retry logic) is unavailable and the only levers are grace period configuration, in-app messaging, and Google's `showInAppMessages`. Fourth: involuntary churn is heavily geo-correlated, so a shift in acquisition geography changes it without anything else changing.

**related:** Dunning and Grace Period Recovery Rate, Subscription Renewal Rate, Reactivation Rate, Web Billing Economics.

---

## 17. Grace Period and Billing Retry Recovery Rate (Dunning Recovery)

**applies_to:** consumer (transfers to B2B, though B2B typically controls its own dunning and consumer IAP does not)

**definition:** The share of failed subscription renewals that are successfully collected during the platform's retry or grace window.

**formula_variants:**
- `Recovered subscriptions ÷ Subscriptions entering billing retry` — the headline recovery rate.
- `Recovered ÷ Entered grace period` versus `Recovered ÷ Entered account hold` — must be computed separately. Recovery during grace (user retains access) is far higher than recovery during account hold (access revoked), and blending them hides the entire mechanism.
- **Time-to-recovery distribution** rather than a single rate. Right for choosing grace period length, since the marginal recovery from extending grace from 16 to 28 days is what the decision actually hinges on.
- `Revenue recovered ÷ Revenue at risk` — the revenue-weighted version. Right because annual plans in retry are worth ~12x a monthly plan and should be prioritized accordingly.
- **Grace-on vs grace-off holdout:** the only clean measurement, and rarely run.

**inputs:** App Store Connect Subscription Events and the App Store Server API; Google Play RTDN (`SUBSCRIPTION_RECOVERED`); RevenueCat and Adapty both surface grace/hold states.

**application:** Directly recovers revenue at effectively zero marginal CAC. The configuration decision (grace period length) is a one-time setting with a permanent revenue effect, which makes it one of the highest-ROI actions available in this family.

**Platform mechanics, verified:**

*Apple (App Store Connect help, live Jul 2026):* Billing Grace Period options are **3, 16, or 28 days for monthly and yearly** subscriptions; **weekly subscriptions cap at 3 or 6 days** so grace cannot exceed the subscription period. Apple's wording: grace period "lets subscribers whose auto-renewal failed due to a payment issue continue accessing your app's paid content for a period of time while Apple continues to attempt to collect payment," and "there won't be any interruption to the subscriber's days of paid service or to your revenue if Apple recovers the subscription within the grace period." Without grace enabled, "the subscriber's days of paid service pause until Apple is able to collect payment," **which also delays the 15% post-year-one commission tier.**

*Google (Play Billing docs, live Jul 2026):* two sequential phases. **Grace period** (configurable per base plan, user **retains** entitlement), then **account hold** (configurable, user **loses** entitlement). Google warns explicitly that "specifying lengths less than default values may reduce recovery rates." Google also offers `showInAppMessages` with `InAppMessageCategoryId.TRANSACTIONAL` to surface payment-fix prompts in-app, plus Restore (pre-expiration, same purchase token) and Resubscribe (up to one year post-expiration, new purchase token).

**benchmark:** NO SOURCED BENCHMARK FOUND. Neither Apple nor Google publishes recovery rate figures, and I could not locate a credible dated third-party benchmark for grace-period or retry recovery rates in this session. RevenueCat's platform involuntary-churn shares (31% Play / 14% App Store, Mar 2026) bound the *size of the pool* but not the recovery rate from it.

**traps:** Enabling grace period **inflates your active subscriber count** with users who have not paid, so MRR and active-subscriber metrics both overstate during the grace window and correct later. Teams that enable grace often see a one-time apparent retention improvement that is partly accounting. Second: entitlement during grace means you are serving content you may never be paid for, which for high-COGS apps (AI inference, streaming, licensed content) is a real cost that the recovery rate ignores. Third: setting grace shorter than default to reduce that cost measurably lowers recovery, per Google's own warning, and the trade is rarely quantified. Fourth: **recovery is often counted as a new subscription** in analytics tools, which inflates new-subscriber counts and corrupts cohort attribution.

**related:** Involuntary Churn, Subscription Renewal Rate, Reactivation Rate, Realized LTV.

---

## 18. Refund Rate

**applies_to:** consumer (transfers to B2B but at far lower magnitudes)

**definition:** The share of purchases or revenue that is refunded.

**formula_variants:**
- **RevenueCat's definition:** "the share of paid subscriptions that are **refunded during their first billing period**." Right as the standard, and deliberately scoped to the first period because that is where refund risk concentrates.
- `Refunded transactions ÷ Total transactions` — unit basis. Right for measuring user experience problems.
- `Refunded revenue ÷ Gross revenue` — **revenue basis, and the one that matters financially.** Diverges sharply from the unit basis because annual plans refund at higher dollar values.
- `Refunds ÷ Transactions`, lagged to the refund window. Right because refunds arrive weeks after the purchase, so an un-lagged current-month refund rate is structurally understated.
- **Net revenue realization:** `(Gross − Refunds − Chargebacks) ÷ Gross`. Right for LTV inputs.
- Split by acquisition source. Right because refund rate is one of the sharpest fraud and low-intent-traffic signals available.

**inputs:** App Store Connect (Sales and Trends, and the App Store Server API refund endpoints); Google Play Console (Order Management, Voided Purchases API); RevenueCat and Adapty; Baremetrics for web.

**application:** Directly reduces net revenue and therefore LTV. Also a leading indicator of paywall deception, since a paywall that converts by confusing people generates refunds. High refund rate on a UA source is a reliable fraud signal.

**benchmark:** NO SOURCED BENCHMARK FOUND. RevenueCat's 2026 report **defines** refund rate as a headline metric but I could not extract a published median or category breakdown from the accessible pages, and I found no other credible dated source with category-segmented refund benchmarks. **Do not accept a remembered "2–5% is normal" figure, including from me.** Pull your own from App Store Connect Sales and Trends and Play Console Order Management, and segment by plan duration and acquisition source.

**Mechanics worth knowing:** Apple's Refund Declined and **Consumption API** let a developer send usage data to Apple to inform refund decisions, and Apple sends `REFUND` and `REFUND_DECLINED` notifications. Google exposes the **Voided Purchases API**. In both cases **the developer eats the refund against proceeds**, and on Apple the commission is reversed proportionally, so a refund does not cost you the gross price, it costs you the proceeds.

**traps:** The lag problem is severe: refunds for a January cohort land in February and March, so a month-to-date refund rate always looks better than reality, and teams routinely report it that way. Apple grants refunds directly to users without developer involvement, so you learn about them after the fact. Opt-out trials and weekly plans both elevate refund rate structurally (surprise charges), so a mix shift changes it without any deterioration in product. Refund rate on a unit basis and on a revenue basis can move in opposite directions. And **refunds are frequently omitted entirely from LTV models**, which combined with the take-rate omission (metric 29) means many published consumer LTV figures overstate net contribution by 35–45%.

**related:** App Store Take Rate, Net vs Gross Proceeds, Realized LTV, Trial-to-Paid, Opt-out Trial Economics.

---

## 19. Reactivation / Win-Back / Resurrection Rate

**applies_to:** consumer (transfers to B2B as logo win-back, with very different mechanics)

**definition:** The share of churned subscribers who return to a paid subscription.

**formula_variants:**
- **RevenueCat's definition:** "the share of churned subscribers that become active in the **12 months following a churn event**." Right as a standard; note the fixed 12-month window.
- `Reactivated subscribers ÷ Churned subscribers` over an arbitrary window (30/90/180 days). Right for campaign measurement, and shorter windows produce dramatically lower numbers.
- `Reactivated ÷ Churned base at period start` — a rate against the standing lapsed pool rather than a cohort. Right for forecasting reactivation revenue as a line item.
- **Offer-attributed reactivation:** `Reactivations attributable to a win-back offer ÷ Offer recipients`, run against a holdout. Right because a meaningful share of reactivation is organic and would happen without any campaign.
- **Distinguish resurrection (returned to *usage*) from reactivation (returned to *paid*).** These get conflated constantly and only the second one is revenue.

**inputs:** RevenueCat, Adapty (both track reactivation natively); App Store Connect Win-Back Offers (Apple added dedicated win-back offer support with iOS 18); Google Play Resubscribe; Braze, Iterable, or OneSignal for the campaign layer.

**application:** Reactivation is the cheapest paid conversion available, because there is no acquisition cost and the user has already demonstrated willingness to pay. It is also the most under-instrumented metric in this family.

**benchmark:** NO SOURCED BENCHMARK FOUND. RevenueCat's 2026 report **defines** reactivation rate as a headline metric but I could not locate a published aggregate figure or category breakdown on the accessible pages, and no other dated source provided a credible benchmark.

**traps:** The largest is **counting reactivations as new subscribers**, which simultaneously inflates new-subscriber counts, corrupts install-to-paid, and hides the reactivation channel's real contribution. Second: on iOS, a reactivated subscriber's days of paid service resume from the recovery date **only if they return within 60 days**, otherwise the clock restarts and you pay 30% again, so reactivation timing has a direct margin consequence that no reactivation metric captures. Third: win-back offers are usually discounted, so reactivation revenue is worth less per subscriber and blending it into LTV inflates the average. Fourth: reactivation is heavily confounded with involuntary churn, since a "reactivated" subscriber is often just someone whose card finally worked, which is a payments recovery, not a marketing win. Segment those apart or the channel gets credit it did not earn.

**related:** Involuntary Churn, Dunning Recovery, Subscription Renewal Rate, Realized LTV, App Store Take Rate.

---

## 20. ARPPU (Average Revenue Per Paying User)

**applies_to:** consumer (transfers to B2B, where it is usually called ACV or ARPA)

**definition:** Average revenue generated per paying user over a period.

**formula_variants:**
- `Revenue in period ÷ Paying users in period` — the standard. Right for period-over-period monetization tracking.
- `Net proceeds ÷ Paying users` — **the version that should be used in this family and usually is not.** Right whenever the number feeds a CAC or margin decision, because the gross version overstates by the take rate.
- `Revenue ÷ Unique payers`, cohort-anchored rather than period-anchored. Right for comparing acquisition cohorts.
- **Lifetime form:** cumulative revenue per payer over N months, which is realized LTV per payer (metric 22). ARPPU and LTV per payer are frequently used interchangeably and should not be.
- Split by plan duration, geography, and platform. Mandatory; ARPPU is dominated by plan mix, so a blended figure moves with mix rather than monetization.

**inputs:** RevenueCat, Adapty, Baremetrics; App Store Connect and Play Console for proceeds; Amplitude or Mixpanel if computed on product data.

**application:** Combined with paying user share it produces ARPU, and combined with retention it produces LTV. Used to size the impact of price changes and plan-mix shifts.

**benchmark:** RevenueCat reports **realized LTV per payer** rather than a period ARPPU, so use metric 22 for sourced figures. RevenueCat's Month-1 RLTV per payer medians (Mar 2026) are the closest sourced proxy: **Health & Fitness $24.23, Business $18.76, Productivity $16.63, Travel $15.59, Utilities $15.47, Education $14.56, Media & Entertainment $12.17, Shopping $10.35, Social & Lifestyle $9.95, Photo & Video $9.48, Gaming $8.41.**

Sourced price anchors that bound ARPPU (RevenueCat, Mar 2026, median prices): **Weekly $5.99** (most common $5), **Monthly $10** (most common $10), **Yearly $34.80**, up from $31.60 the prior year. By category, yearly medians: **Education $44.99** (highest), Shopping $39.99, Health & Fitness $39.94, Business $38.99, Gaming $24.99, **Travel $20** (lowest). By geography: North America $39.99, Western Europe $39.44, IN/SEA $18.32. Adapty's global medians (Mar 2026) run higher: Weekly $5.71–$8.94, Monthly $12.99, Annual $38.42.

**traps:** ARPPU is the metric most often reported gross when it should be net, which is a 15–30% error before you start. It rises mechanically when low-value users churn, so **a deteriorating business can post improving ARPPU**, and this is common in weekly-plan apps. It is dominated by geographic mix, so expanding into IN/SEA (RevenueCat: $18.32 yearly median vs $39.99 North America) drops ARPPU by more than half without any monetization change. Period-based ARPPU on annual plans is distorted by whether you recognize the cash on purchase or amortize it.

**related:** ARPU/ARPDAU, Paying User Share, Realized LTV, Plan Mix, Net vs Gross Proceeds.

---

## 21. ARPU and ARPDAU

**applies_to:** consumer (ARPDAU is essentially gaming/consumer-only; ARPU transfers to B2B)

**definition:** Average revenue per user (all users, not just payers) over a period; ARPDAU is the daily-active version.

**formula_variants:**
- `Revenue in period ÷ Active users in period` — ARPU. The definition of "active" (DAU, WAU, MAU, or installs) changes the number by an order of magnitude, and **there is no convention, so it must always be stated.**
- `Daily revenue ÷ DAU` — ARPDAU. The standard in gaming and ad-supported apps. Right for apps with daily engagement and continuous monetization.
- `ARPPU × Paying user share` — the decomposed form. Right for diagnosis, because it separates "how many pay" from "how much they pay."
- `Revenue ÷ Installs` — Revenue Per Install (metric 23), often mislabeled ARPU. Different metric, different denominator.
- **Blended ARPDAU** including IAP and ad revenue versus **IAP-only ARPDAU.** Right to compute both for hybrid-monetization apps; blending them hides which engine is working.

**inputs:** Amplitude, Mixpanel, or Firebase for DAU; RevenueCat or Adapty for subscription revenue; AppLovin MAX, AdMob, or ironSource for ad revenue; Sensor Tower and data.ai for competitive estimates (**modeled, not actual**).

**application:** The primary monetization-efficiency metric for apps with a large non-paying base, and the standard currency in hybrid-monetization and gaming. Feeds LTV via `LTV ≈ ARPDAU × average lifetime in days`.

**benchmark:** NO SOURCED BENCHMARK FOUND for ARPDAU. I could not retrieve a credible dated ARPDAU benchmark within this session's search budget. Sourced substitute: RevenueCat's **Revenue Per Install** figures (metric 23) are install-denominated rather than DAU-denominated but are properly sourced and category-segmented, and for subscription apps they are the more decision-relevant number.

**traps:** ARPDAU is the easiest metric in this family to improve by making the product worse: aggressive ad placement and paywall frequency both raise it while damaging retention and store rating, and because ARPDAU is a *ratio to DAU*, **losing your least monetizing users raises it.** A declining DAU with flat revenue produces a rising ARPDAU that reads as a win on every dashboard. Competitive ARPDAU from Sensor Tower or data.ai is modeled from a panel and is unreliable at the individual-app level. For subscription apps specifically, ARPDAU is a poor primary metric because subscription revenue is lumpy and period-based while DAU is daily, so the ratio is noisy without smoothing.

**related:** ARPPU, Paying User Share, Revenue Per Install, D1/D7/D30 Retention, Realized LTV.

---

## 22. Realized LTV per Payer (and LTV by Acquisition Cohort)

**applies_to:** consumer (transfers to B2B conceptually; the "realized versus projected" distinction is universal and universally abused)

**definition:** The cumulative revenue an average paying user has actually generated over a defined period since first purchase.

**formula_variants:**
- **RevenueCat's definition:** "the net value of an average paying user over a specific period of time, **including initial subscriptions, renewals, reactivations, expansion, and one-time purchases**." Note that this is a *realized* (backward-looking, actuals-only) figure at a fixed horizon, not a projection.
- **Projected LTV:** `ARPPU ÷ Churn rate`, or `ARPPU × Average lifetime`. Right only for early-stage estimation, and it is the single most abused formula in consumer subscription because it assumes a constant churn rate, which consumer subscription churn is emphatically not (it is steep early, flattening later). **Constant-churn LTV systematically understates the value of surviving cohorts and overstates the value of new ones.**
- **Cohort-summed realized LTV:** `Σ (net revenue from cohort C through month N) ÷ Payers in cohort C`. Right for anything financial, and the only version that survives audit.
- **Survival-curve LTV:** `Σ over periods of (price × cumulative retention at period × (1 − take rate) × (1 − refund rate))`. Right for forecasting, and the only projection form that respects the actual shape of consumer decay.
- **Per-install LTV** versus **per-payer LTV.** Different denominators, both called LTV. Per-install is what you compare to CAC; per-payer is what you compare to price.
- **Gross versus net of take rate.** See traps; this is the load-bearing distinction in this entire family.

**inputs:** RevenueCat, Adapty (both compute realized LTV natively); Baremetrics; MMP cohort revenue for acquisition-source splits; App Store Connect and Play Console for the proceeds basis.

**application:** The denominator of every acquisition decision. Sets maximum allowable CAC, channel ceilings, and payback targets.

**benchmark (RevenueCat, Mar 2026, realized LTV per payer, median):**

*Year 1 by category:*

| Category | Median | Q3 |
|---|---|---|
| Health & Fitness | **$35.64** | |
| Business | **$35.48** | >$69.19 |
| Productivity | **$24.95** | |
| Education | **$22.82** | |
| Travel | **$22.55** | |
| Utilities | **$22.25** | |
| Media & Entertainment | **$16.08** | |
| Social & Lifestyle | **$15.34** | |
| Photo & Video | **$14.78** | |
| Shopping | **$13.78** | |
| Gaming | **$11.22** | |

*Year 1 by geography:* Western Europe **$26.64**, North America **$26.07** (Q3 >$46), Asia-Pacific **$24.11**, MEA **$21.33**, LatAm **$20.49**, IN/SEA **$19.32**, ROW **$18.35**. Global median **$23**. By developer HQ: North America **$32**, Western Europe **$25**, IN/SEA **$14** (a 2.3x spread).

*Year 1 by price tier:* High-priced **$62.19** (Q3 >$109.64), Mid **$28.75**, Low **$10.69**.

*Month 1 by price tier:* High **$35.89** (Q3 >$56), Mid **$15.78**, Low **$6.67**.

*Adapty (Mar 2026):* hard paywall LTV median **$41.90** (P90 $89.90) versus soft paywall **$20.00**; in-app **$40.10** versus web **$35.80**; AI apps on annual-plus-trial **$66.70** one-year LTV; weekly-plus-trial configuration **$49.27** over 12 months. Health & Fitness **install** LTV **$1.21**, the highest of any App Store category, with high-priced annual apps at **$70** versus low-priced at **$17**.

*AI apps (RevenueCat, Mar 2026):* year-1 realized LTV per payer **$30.16 vs $21.37** for non-AI, a **41% premium**, alongside 30% faster churn.

**traps:** The dominant trap and the one this brief was commissioned to fix: **it is frequently unstated whether a published LTV figure is gross customer price or net proceeds after the store commission.** I could not confirm which basis RevenueCat uses for realized LTV from the accessible pages, despite their definition saying "net value." **Verify the basis before using any of these figures in a CAC model.** If a $35.64 Health & Fitness year-1 LTV is gross, the net at 30% is $24.95 and at 15% is $30.29, and a CAC of $30 is either profitable or a disaster depending entirely on which one it is.

Other traps: (a) **realized LTV at month 1 is not a forecast**, and teams extrapolate it linearly, which is badly wrong given a 72% year-one annual churn curve; (b) projected LTV using constant churn is invalid in this family, full stop; (c) LTV per payer and LTV per install differ by the install-to-paid rate (roughly 40x at a 2.5% conversion), and both get called "LTV"; (d) survivorship: cohorts that have completed 12 months are older cohorts, acquired under different conditions, so a "year-1 LTV" is always at least a year stale; (e) the price-tier spread (high $62.19 vs low $10.69) is mostly selection, not a price-elasticity finding, so raising price does not move you up that table.

**related:** ARPPU, Revenue Per Install, Subscription Renewal Rate, App Store Take Rate, Refund Rate, Cohort Revenue Curve, CAC and Payback (cross-family).

---

## 23. Revenue Per Install (RPI)

**applies_to:** consumer

**definition:** Total revenue divided by total installs, measured at a fixed number of days post-install.

**formula_variants:**
- **RevenueCat's definition:** "total revenue earned divided by total installs," reported at **D14 and D60**. Right for UA decisions because both the numerator and denominator are UA-native.
- `Net proceeds ÷ Installs` — the version to use against CAC. See the take-rate warning.
- `Revenue ÷ Installs` at D7 for fast-feedback UA loops. Right when you need to make bid decisions before D60 data exists, and systematically understates.
- **Predicted RPI (pRPI/pLTV):** a model extrapolating early RPI to a longer horizon. Right for channels requiring rapid optimization; wrong to report as actuals, which happens constantly.
- Split by paid source, campaign, and creative. This is the operational form; a blended RPI is only useful as a company-level number.

**inputs:** RevenueCat, Adapty; MMP (AppsFlyer, Adjust, Singular) for source-level installs and revenue; SKAdNetwork / AdAttributionKit postbacks on iOS, with all their coarseness.

**application:** The direct input to `RPI vs CAC` channel decisions. This, not LTV, is what a media buyer optimizes against day to day.

**benchmark (RevenueCat, Mar 2026, median):**

| Segment | D14 | D60 |
|---|---|---|
| **Hard paywall** | **$2.32** | **$3.09** |
| **Freemium** | **$0.27** | **$0.38** |
| Health & Fitness | **$0.48** | **$0.66** |
| Business | **$0.31** | **$0.50** |
| Education | **$0.30** | **$0.39** |
| All categories | **$0.23** | **$0.34** |
| Gaming | **$0.08** | **$0.14** |
| North America | **$0.38** | **$0.55** (Q3 >$1.39, P90 $3.19) |
| Asia-Pacific | **$0.28** | **$0.42** |
| Western Europe | **$0.25** | **$0.33** |
| IN/SEA | **$0.08** | **$0.11** |
| High-priced | **$0.61** | **$0.94** |
| Mid-priced | **$0.18** | **$0.29** |
| Low-priced | **$0.08** | **$0.11** |

Note the shape: the all-category median only rises from **$0.23 at D14 to $0.34 at D60**, meaning **roughly two-thirds of 60-day revenue arrives in the first 14 days.** That is the empirical justification for short-window UA optimization in this family, and it is also why annual plans distort the curve (they front-load cash).

**traps:** RPI is almost universally reported gross, so a $0.34 D60 RPI is roughly **$0.24 net at 30%** and **$0.29 net at 15%**, before refunds. Bidding to a gross RPI target is the most common way consumer apps lose money at scale. Second: SKAdNetwork and AdAttributionKit conversion-value encoding means iOS source-level revenue is coarse and delayed, so source-split RPI on iOS is directionally useful and numerically unreliable. Third: organic installs in the denominator crush blended RPI and make paid look worse than it is, or the reverse if organic is excluded inconsistently. Fourth: D14 RPI is highly sensitive to plan mix, since a yearly-dominant app books the full year's cash immediately (**yearly-dominant D14 RPI $0.36 vs monthly-dominant $0.18**), which makes annual-heavy apps look twice as efficient at D14 on a cash basis and roughly equal on a recognized basis.

**related:** Realized LTV, Download-to-Paid, ARPPU, Plan Mix, CAC and Payback (cross-family).

---

## 24. Paying User Share (Conversion to Paid)

**applies_to:** consumer (transfers to B2B freemium and PLG directly)

**definition:** The share of your active user base that is currently paying.

**formula_variants:**
- `Paying users ÷ MAU` — the standard freemium penetration metric.
- `Paying users ÷ DAU` — right for high-frequency apps, and always higher than the MAU version because payers are more engaged.
- `Paying users ÷ Registered users` — right for apps where a large registered base is dormant; always the lowest of the three.
- `Cumulative payers ÷ Cumulative installs` — a lifetime penetration measure. Right for board-level reporting, wrong for operations, because it never goes down.
- **Net paid-user growth:** `New payers − Churned payers`, which is the operationally meaningful version and the one that reveals whether the subscriber base is actually growing.

**inputs:** Amplitude, Mixpanel, or Firebase for the active-user denominator; RevenueCat, Adapty, or Baremetrics for the payer count.

**application:** Determines whether the growth constraint is acquisition (too few users) or monetization (too few of them pay). Feeds ARPU via `ARPU = ARPPU × Paying user share`.

**benchmark:** NO SOURCED BENCHMARK FOUND for paying user share as a share of MAU. The nearest sourced figures are install-denominated rather than MAU-denominated: RevenueCat's **download-to-paid D35 medians (2.0% global, 10.7% hard paywall, 2.1% freemium)** and the category table in metric 12.

**traps:** The denominator choice moves this metric by 3–5x and there is no convention, so cross-company comparison is nearly always invalid. It rises when free users churn, so **a shrinking free base produces a rising paying share that reads as a monetization win.** In apps with strong free retention (utilities, tools), a low paying user share can be perfectly healthy, and in apps with weak free retention a high share can be a symptom of a collapsed funnel. Cumulative-basis versions are monotonically increasing by construction and should never be used as a KPI.

**related:** ARPU, ARPPU, Download-to-Paid, Paywall View Rate, D1/D7/D30 Retention.

---

## 25. Subscription Cohort Revenue Curve

**applies_to:** consumer (transfers to B2B directly, and is the standard there)

**definition:** Cumulative revenue from an acquisition cohort plotted against months since acquisition.

**formula_variants:**
- **Cumulative net revenue per cohort member by month N.** Right for payback analysis; the payback point is where the curve crosses CAC.
- **Cumulative revenue per *payer* by month N** — realized LTV (metric 22). Different denominator, different question.
- **Revenue retention curve:** `Cohort revenue in month N ÷ Cohort revenue in month 1`. Right for reading whether the cohort is decaying or expanding; in consumer it always decays, so this is really a decay-rate measure.
- **Cash-basis versus recognized-basis curves.** Right to build both. Annual plans make the cash curve a step function and the recognized curve smooth, and payback conclusions differ substantially between them.
- **Take-rate-adjusted curve.** Right always, and the version that reflects the Apple 30%-to-15% step at month 13, which produces a **visible inflection in the net curve that does not exist in the gross curve.** Almost nobody models this and it is worth roughly 21% more net revenue per dollar of gross from month 13 onward.

**inputs:** RevenueCat or Adapty cohort views; Baremetrics; MMP cohort revenue for source splits; a data warehouse for anything custom.

**application:** The definitive answer to "can we afford this CAC," and the only honest way to compare acquisition sources with different plan mixes.

**benchmark:** NO SOURCED BENCHMARK FOUND for full published cohort revenue curves. Constructible from sourced components: RevenueCat's **D14 RPI $0.23 → D60 RPI $0.34** (all categories, Mar 2026) gives the early curve shape, and **year-1 realized LTV per payer of $23 global median** gives the twelve-month endpoint. RevenueCat's annual-plan churn structure (**35% of annual cancellations in month 1, 3–10% monthly mid-year, spike at month 12, ~72% cumulative year-one churn**) gives the decay shape.

**traps:** The near-universal failure is **fitting a curve to immature cohorts and extrapolating**. With 35% of annual cancellations landing in month 1 and a spike at month 12, the curve has two knees, and a fit through months 2–6 misses both. Second: mixing plan durations in one cohort produces a curve that is an artifact of mix. Third: cash-basis curves for annual-heavy apps show payback in month 1 and are used to justify CAC that the recognized curve does not support. Fourth: the take-rate step at month 13 and the involuntary-churn drag are both omitted from most curves, and they push in opposite directions.

**related:** Realized LTV, Revenue Per Install, Subscription Renewal Rate, App Store Take Rate, Plan Mix.

---

## 26. LTV by Acquisition Cohort / Channel

**applies_to:** consumer (transfers to B2B)

**definition:** Realized LTV segmented by the source, campaign, and time period of acquisition.

**formula_variants:**
- `Cohort net revenue through month N ÷ Cohort installs`, by source. Right for channel allocation.
- `... ÷ Cohort payers`, by source. Right for understanding whether a channel delivers fewer payers or worse payers, which demands different fixes.
- **LTV:CAC by channel** at a fixed horizon. Right for allocation, and the horizon must be stated; a 3:1 at 12 months and a 3:1 at 24 months are not the same business.
- **Payback period by channel:** months until cumulative net revenue exceeds CAC. Right as the primary constraint in a cash-limited business, and generally more useful than LTV:CAC in consumer because of the steep decay.
- **Organic-adjusted / incrementality-adjusted channel LTV**, using geo holdouts or PSA tests. Right because last-touch attribution over-credits retargeting and branded search, and this is the largest source of misallocation in consumer UA.

**inputs:** AppsFlyer, Adjust, Singular, or Branch cohorted to revenue; RevenueCat or Adapty for the revenue side; SKAdNetwork / AdAttributionKit on iOS; Google Play Install Referrer on Android.

**application:** The allocation decision. This is the metric that turns the entire corpus into a budget.

**benchmark:** NO SOURCED BENCHMARK FOUND for channel-level LTV benchmarks; these are too app-specific to benchmark meaningfully and I found no credible dated source attempting it. Use RevenueCat's geographic realized-LTV splits (metric 22) as the closest sourced proxy, since geography is the strongest published cohort dimension: **North America $26.07 year-1 vs IN/SEA $19.32 per payer**, and by developer HQ **North America $32 vs IN/SEA $14**.

**traps:** iOS post-ATT attribution is the dominant problem. SKAdNetwork's coarse conversion values, the crowd-anonymity thresholds that suppress low-volume postbacks, and the limited measurement window mean channel-level LTV on iOS is a modeled estimate presented as a fact. Second: **organic installs are not a channel**, and treating them as one with an implied zero CAC systematically over-rewards whatever drove them. Third: cohorts must be size-matched, since a channel with 200 installs and a great LTV is noise. Fourth: seasonality confounds cohort comparison badly in this family (January fitness, holiday shopping), so month-over-month cohort LTV comparisons in seasonal categories are close to meaningless without a year-over-year control.

**related:** Realized LTV, Revenue Per Install, Cohort Revenue Curve, Download-to-Paid, CAC and Payback (cross-family).

---

## 27. App Store Take Rate / Effective Commission Rate

**applies_to:** consumer (and any B2B app monetizing through an app store, where it is routinely and expensively forgotten)

**definition:** The blended percentage of gross customer payments retained by Apple and Google.

**formula_variants:**
- **Nominal rate:** the headline 30% / 15% / 10%. Right for nothing except a starting point.
- **Effective take rate:** `1 − (Net proceeds ÷ Gross customer payments)` over a period. **The only number that should enter a financial model.** It captures tier mix, tenure mix, geography, and program participation in one figure.
- **Blended take rate across billing channels:** `Σ (channel revenue share × channel take rate)` across IAP, web, and external link. Right now that external links exist and carry a different (currently 0% US) rate.
- **Marginal take rate on new revenue:** relevant when you are near the $1M Small Business Program threshold or the Google $1M tier, where the *next* dollar is taxed differently than the average dollar.
- **Tenure-weighted rate for Apple:** `(Subscribers under 1yr × 30% + Subscribers over 1yr × 15%) ÷ Total subscribers`. Right for forecasting, and it improves as your base ages, which is a real and under-modeled tailwind.
- **Install-vintage-weighted rate for Google (new since Jun 30, 2026):** Google now charges different service fees on new versus existing installs, so the blended Play rate depends on install vintage mix and shifts over time on its own.

**inputs:** App Store Connect Sales and Trends (proceeds) alongside gross; Google Play Console financial reports; RevenueCat and Adapty both compute proceeds; your own billing system for web.

**application:** Sets the ceiling on every acquisition decision and determines whether web billing or external links are worth building. **This is the single most consequential input in the family and the most commonly omitted.**

**benchmark (Apple, verified from developer.apple.com, live Jul 2026):**

| Situation | Developer keeps | Commission |
|---|---|---|
| Standard, subscriber year 1 | 70% | 30% |
| Standard, after one year of paid service | 85% | 15% |
| Small Business Program | 85% from day 1 | 15% |
| EU alternative terms, post-year-one | 90% | 10% |
| US external purchase link | 100% (currently) | 0%, litigated |

Apple SBP mechanics, exact: qualification is **≤$1M USD in proceeds** ("sales net of Apple's commission and certain taxes and adjustments") in the **prior calendar year across all apps**, aggregated across **all Associated Developer Accounts** (defined as >50% ownership or ultimate decision-making authority in either direction) and transferred apps. Crossing $1M mid-year moves you to standard rates on **future sales**; falling back below re-qualifies you **the following year**. Proceeds adjust **15 days after the end of the fiscal month in which enrollment is approved.**

**benchmark (Google Play, effective Jun 30, 2026 in US/UK/EEA):** see the table in the opening callout. Old structure (still live outside the rollout markets): **15% on first $1M/year, 30% above, 15% on auto-renewing subscriptions regardless of revenue.** New structure separates a **10% base service fee** from a **5% billing fee**, with tiers up to 20% (new installs) or 25% (existing installs) service fee above $1M. **Sources conflict on the existing-install tier; verify in Play Console.**

**traps:** (1) **Modeling LTV on gross customer price.** A $39.99 annual plan is $27.99 of proceeds at 30%. A model built on gross overstates contribution margin by 43%. (2) **Assuming the 15% post-year-one rate arrives at month 12.** It arrives after one year of *paid service*, and free trial days do not count, so a 30-day trial pushes it to month 13. A 61-day lapse resets it entirely. (3) **Assuming Small Business Program is automatic.** It requires enrollment, and it is forfeited the moment you cross $1M, which for a fast-growing app means the effective rate doubles mid-year in a way that is not in the plan. (4) **Ignoring VAT and sales tax.** In tax-inclusive markets the commission is computed on the tax-exclusive price but the customer paid the tax-inclusive one, so realized developer revenue as a share of what the customer paid is lower than 70% or 85%. (5) **Ignoring foreign withholding and currency conversion**, which Apple applies before proceeds. (6) **Treating the current 0% US external link rate as permanent.** It is a temporary state pending a district court remand and a Supreme Court argument expected Oct–Dec 2026. (7) **Applying one rate across a mixed base.** With tenure mix, program status, geography, install vintage, and billing channel all in play, the nominal rate and the effective rate can differ by more than 10 points.

**related:** Net vs Gross Proceeds, Realized LTV, Web Billing Economics, Refund Rate, Introductory Offer Conversion.

---

## 28. Net vs Gross Proceeds (Net Revenue Realization)

**applies_to:** consumer (transfers to B2B store-distributed apps)

**definition:** The relationship between what the customer paid and what actually lands in the developer's bank account.

**formula_variants:**
- `Net proceeds ÷ Gross customer payments` — **net revenue realization.** The clean summary metric.
- **Full waterfall:** `Gross customer price → less sales tax/VAT → less store commission → less refunds and chargebacks → less currency conversion spread → less foreign withholding tax → Net proceeds.` Right for any financial model; each step is 1–30%.
- **Recognized versus collected.** Right to track separately; annual plans collect once and recognize over twelve months, and the gap is the deferred revenue balance.
- `Net proceeds ÷ Bookings` — right for finance reporting.

**inputs:** App Store Connect Sales and Trends (which reports both "proceeds" and customer price) and Payments and Financial Reports (which reports actual remittance and is the authoritative one); Google Play Console earnings reports; your payment processor for web.

**application:** The bridge between product metrics and the P&L, and the input that converts every gross metric in this corpus into something you can bid against.

**benchmark:** NO SOURCED BENCHMARK FOUND for a published net revenue realization benchmark. It is fully computable from your own App Store Connect and Play Console reports and should be, since it is app-specific by construction. Apple's own definitional anchor: proceeds are "your sales net of Apple's commission and certain taxes and adjustments."

**traps:** App Store Connect's **Sales and Trends** and **Payments and Financial Reports** do not match, because Sales and Trends is a near-real-time estimate and Financial Reports is the actual remittance after adjustments, refunds, and currency conversion. Teams build models on Sales and Trends and then cannot reconcile to the bank. Second: **currency.** Apple reports in multiple currencies and converts at its own rates on its own schedule, so a "flat" revenue month can be an FX month. Third: **the reporting lag.** Apple remits on roughly a 30-45 day cycle, so the cash and the metric are always in different periods. Fourth: refunds hit proceeds in the period they are processed, not the period of the original sale, which makes month-level net realization noisy and mean-reverting.

**related:** App Store Take Rate, Refund Rate, Realized LTV, Revenue Per Install.

---

## 29. Web Billing vs In-App Purchase Economics

**applies_to:** consumer (increasingly the central strategic question in this family)

**definition:** The comparison of unit economics between selling through platform in-app purchase and selling through your own web checkout, including via external purchase links.

**formula_variants:**
- **Net margin per channel:** `1 − (take rate + payment processing + tax handling + chargebacks + support cost)`. Right for the strategic decision. Web is not free: Stripe or Paddle processing runs roughly 2.9%+30c to 5%+ for merchant-of-record services that handle global tax, and a merchant-of-record arrangement (Paddle, FastSpring, Lemon Squeezy) trades a higher rate for removing your global VAT/sales-tax obligation.
- **Web revenue share:** `Web-billed revenue ÷ Total revenue`. Right for tracking channel migration.
- **Link-out funnel:** `External link clicks ÷ Paywall views`, then `Web checkout starts ÷ Link clicks`, then `Purchases ÷ Checkout starts`. Right for diagnosing where the leaving-the-app friction lives, which is the whole ballgame.
- **Effective blended take rate:** `Σ (channel share × channel all-in cost)`. Right for the number that goes in the LTV model.
- **Retention-adjusted comparison:** web-billed subscribers churn differently (you control dunning, which helps; users have no store-managed subscription center, which hurts discoverability of cancellation and raises chargebacks). Right because a margin comparison that ignores retention differences is incomplete.

**inputs:** RevenueCat Web Billing, Stripe, Paddle; App Store Connect External Purchase Link reporting; your own checkout analytics.

**application:** Potentially the largest single margin lever available (15–30 points), and the reason the *Epic v. Apple* outcome matters commercially and not just legally.

**benchmark:**

*Adoption (RevenueCat, Mar 2026), share of apps generating web revenue by revenue tier:*

| Tier | Web revenue adoption |
|---|---|
| Tier 5 (top performers) | **41%** |
| Tier 4 | **28%** |
| Tier 1 (hobby apps) | **1.3%** |

*Conversion (Adapty, Mar 2026):* **in-app paywalls convert 1.60% vs web paywalls 1.10%**, so in-app converts **45% better**. LTV: **in-app $40.10 vs web $35.80.**

**This is the trade in two numbers.** Web keeps 15–30 more points of margin but converts roughly 31% worse and produces about 11% lower LTV per subscriber. At a 30% Apple rate the math still favors web (0.70 × 1.60 = 1.12 versus ~1.00 × 1.10 = 1.10 in relative revenue terms, roughly a wash on conversion-weighted revenue before processing costs), which means **web billing is not a free win, it is a margin-for-conversion trade that is close to break-even at typical rates and only clearly wins if you can close the conversion gap.** Anyone telling you web billing is obviously 30% more profitable has not netted the conversion loss.

I found **no data** on external purchase link click-through rates or link-out checkout conversion specifically. RevenueCat's own May 2025 piece on the anti-steering ruling explicitly presents this as a future experiment rather than a measured result, stating only that developers can retain "an extra 15–30% of revenue that would have gone to Apple" and urging teams to "let data (conversion, revenue, churn) decide." As of this writing that data is still not public.

**traps:** (1) **Modeling web as 100% margin.** Processing, tax compliance, chargebacks, fraud, and support are real, and merchant-of-record services charge 5%+ precisely because global tax is hard. (2) **Ignoring the conversion gap**, which the Adapty data quantifies at ~31% and which is enough to erase the margin advantage. (3) **Treating the current US 0% external link rate as durable** (see metric 27). (4) **Support cost.** Store-billed subscribers self-serve refunds and cancellations through Apple and Google; web-billed subscribers email you, and that cost scales with subscriber count. (5) **Chargebacks.** Card chargebacks on web carry fees and thresholds that store IAP does not expose you to at all. (6) **Cross-platform entitlement complexity**, where a web purchase must unlock the app, is a real engineering cost and a real support-ticket generator. (7) **Apple's rules for external link presentation** have been repeatedly revised and remain subject to the pending remand, so a link-out UX that is compliant today may not be next quarter.

**related:** App Store Take Rate, Net vs Gross Proceeds, Paywall Conversion Rate, Realized LTV, Involuntary Churn, Opt-in Trial Economics.

---

## 30. Trial Cancellation Timing (Day-0 Cancel Share)

**applies_to:** consumer

**definition:** The distribution of when, within a free trial, users cancel.

**formula_variants:**
- `Cancellations on day N ÷ Total trial cancellations` — the share form, which is what RevenueCat publishes.
- `Cancellations on day N ÷ Trial starts` — the rate form, right for sizing the absolute leak.
- **Cumulative cancellation curve** by day, right for choosing intervention timing.
- **Segmented by trial length**, mandatory, since a Day-0 cancel on a 3-day trial and on a 30-day trial mean completely different things.

**inputs:** RevenueCat, Adapty; App Store Connect Subscription Events (`DID_CHANGE_RENEWAL_STATUS` with auto-renew off during trial); Play Console RTDN.

**application:** Determines whether trial-conversion work should target the paywall (Day-0 cancels) or the product experience (later cancels). This is the sharpest available diagnostic for distinguishing a purchase-intent problem from a value-delivery problem.

**benchmark (RevenueCat, Mar 2026):**

| Trial length | Share of cancellations on Day 0 |
|---|---|
| 3 days | **55.4%** (up from ~51% in 2025) |
| 7 days | **39.8%** |
| 14 days | **35.7%** |
| 30 days | **31.1%** |

For 3-day trials, **84% of all cancellations occur by Day 1.**

Conversion timing runs the same way: **~50.6% of first paid conversions happen on Day 0** overall, with Productivity most concentrated at **71.9%** and Travel showing the longest tail at **28.2% converting after Week 6** (RevenueCat, Mar 2026).

**traps:** The critical misread is treating Day-0 cancellation as churn. It is a **purchase decision made at the paywall**, usually by someone turning off auto-renew immediately while intending to use the free period. Building win-back and re-engagement campaigns against it is aimed at the wrong problem; the fix is at the paywall (price, offer clarity, value framing) or upstream in traffic quality. Second trap: turning off auto-renew is not the same as terminating the trial, so these users still consume the trial and still appear as active, which means active-user metrics and cancellation metrics tell contradictory stories about the same person. Third: the Day-0 share rises as trials shorten, so the industry-wide shift to ≤4-day trials (now 46.5% of apps) mechanically raises everyone's Day-0 share without any behavior change.

**related:** Trial-to-Paid, Trial Start Rate, Paywall Conversion Rate, Opt-out Trial Economics.

---

# Metrics I considered and excluded, with reasons

| Metric | Why excluded |
|---|---|
| **MRR / ARR** | Real and essential, but not consumer-app-specific. Belongs in the core SaaS/revenue family. The consumer-specific wrinkle (weekly plans requiring 4.33x normalization to monthly, and annual cash-vs-recognized) is captured inside Plan Mix and Cohort Revenue Curve. |
| **CAC and blended CAC** | Cross-family. It is a paid-acquisition metric, not a consumer-subscription one. Named as a dependency instead. |
| **LTV:CAC ratio and payback period** | Same. Covered as formula variants inside LTV by Acquisition Cohort rather than as standalone entries, since the consumer-specific content is entirely in the LTV side. |
| **Net Revenue Retention / Net Dollar Retention** | Deliberately excluded, and this is a judgment call worth stating. NRR is a B2B construct that depends on expansion revenue. Consumer subscription has essentially no expansion (no seats, minimal upsell), so NRR collapses to renewal rate plus reactivation and is capped below 100%. Importing it invites exactly the category error flagged in the opening. |
| **DAU/MAU stickiness ratio** | An engagement metric, not a subscription-economics metric, and it belongs in a product-analytics family. It correlates weakly with subscription retention in this category. |
| **Session length and sessions per user** | Same reason. Engagement, and easily gamed. |
| **eCPM, fill rate, ad ARPDAU** | Ad monetization is a genuinely separate family. Included only as a variant note under ARPDAU for hybrid-monetization apps. |
| **SKAdNetwork conversion value and ATT opt-in rate** | Attribution-infrastructure metrics rather than growth metrics. They corrupt several metrics here (flagged in traps) but are measurement plumbing, not decisions. |
| **Uninstall rate** | Considered seriously. Excluded because it is unreliable on iOS (Apple does not report it; MMPs infer it from silent push failures), it is largely redundant with D7/D30 retention, and it drives no decision that retention does not drive better. |
| **Crash-free session rate / ANR rate** | Engineering quality metrics. They affect ratings and retention but are not growth metrics. |
| **Price elasticity coefficient** | It is a derived analytical output, not a tracked metric, and the underlying decisions are covered by price-tier segmentation within Download-to-Paid, Trial Start Rate, and Realized LTV. RevenueCat's price-tier cuts are selection effects, not elasticity, and I did not want to imply otherwise by giving elasticity its own entry. |
| **Chargeback rate** | Folded into Refund Rate and Web Billing Economics. It is only material for web billing, since store IAP does not expose the developer to card chargebacks. |
| **Downgrade / plan-switch rate** | Real but minor in consumer, where plan ladders are shallow. Covered as a note under Apple's subscription-group rules in App Store Take Rate (crossgrades do not reset days of paid service). |
| **Family Sharing rate** | Apple-specific and material for some categories, but I found no sourced benchmark and it drives few decisions outside pricing edge cases. |
| **Offer code redemption rate** | Folded into Introductory Offer Conversion. Not enough independent decision value to justify a separate entry. |

---

# Cross-family dependencies

**This family consumes from other families:**

| Input | From | Why it matters here |
|---|---|---|
| **CAC, blended and paid** | Paid acquisition family | Meaningless without RPI and LTV from this family; equally, every LTV figure here is decision-useless without it. The join is `net RPI vs CAC`, and it must be net. |
| **Attribution model and incrementality** | Measurement family | Determines whether channel-level LTV (metric 26) is a fact or a model. Post-ATT iOS makes this the weakest link in the chain. |
| **MRR, ARR, deferred revenue** | Core revenue family | This family produces the drivers; that family produces the reported financials. The reconciliation point is net proceeds (metric 28). |
| **Engagement and activation metrics** | Product analytics family | Feed trial start rate and renewal rate but are not economics. Keep the wall up, since engagement improvements that do not move renewal are not growth. |
| **Lifecycle and CRM performance** | Lifecycle family | Push and email deliverability and opt-in rates cap what reactivation and win-back (metric 19) can achieve. On iOS, push opt-in is the binding constraint. |

**This family produces for other families:**

| Output | Feeds | Note |
|---|---|---|
| **Net RPI and net realized LTV** | Paid acquisition | The bid ceiling. Must be net of take rate and refunds or the whole downstream model is wrong. |
| **Effective take rate** | Finance, pricing | The single number that converts every gross metric in the corpus into a P&L input. |
| **Renewal curves by plan duration** | Financial forecasting | Drives deferred revenue and cash forecasting. Blended curves are unusable here. |
| **Store conversion rate and ASO visibility** | Organic/SEO family | The app store is a search engine, and store CVR is structurally the same metric as landing page conversion rate. Cross-reference deliberately. |
| **Refund rate by source** | Fraud and traffic quality | One of the highest-signal fraud detectors available, and it lives in this family. |

**The two joins most often broken in practice:** first, **CAC is compared to gross LTV**, which overstates by 15–30 points before refunds. Second, **B2B churn benchmarks are applied to consumer renewal rates**, which makes a structurally normal 72% year-one annual churn look like an emergency and leads teams to over-invest in retention when the actual constraint is acquisition efficiency against a short, steep, and normal decay curve.

---

**Sources:**
- [RevenueCat State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps)
- [RevenueCat, subscription app trends and benchmarks 2026](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026/)
- [RevenueCat State of Subscription Apps 2026, Business](https://www.revenuecat.com/state-of-subscription-apps-2026-business/)
- [RevenueCat State of Subscription Apps 2026, Productivity](https://www.revenuecat.com/state-of-subscription-apps-2026-productivity/)
- [RevenueCat, Apple anti-steering ruling and monetization strategy](https://www.revenuecat.com/blog/growth/apple-anti-steering-ruling-monetization-strategy)
- [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/)
- [Adapty, what a high-performing paywall looks like in 2026](https://adapty.io/blog/high-performing-paywall-2026/)
- [Adapty, Health & Fitness app subscription benchmarks 2026](https://adapty.io/blog/health-fitness-app-subscription-benchmarks/)
- [AppTweak, average app conversion rate per category](https://www.apptweak.com/en/aso-blog/average-app-conversion-rate-per-category)
- [Apple, App Store Small Business Program](https://developer.apple.com/app-store/small-business-program/)
- [Apple, auto-renewable subscriptions](https://developer.apple.com/app-store/subscriptions/)
- [Apple, enable Billing Grace Period](https://developer.apple.com/help/app-store-connect/manage-subscriptions/enable-billing-grace-period-for-auto-renewable-subscriptions/)
- [Google Play, service fees](https://support.google.com/googleplay/android-developer/answer/112622)
- [Google Play Billing, subscriptions](https://developer.android.com/google/play/billing/subscriptions)
- [MacRumors, Ninth Circuit modifies Epic injunction, Dec 11 2025](https://www.macrumors.com/2025/12/11/apple-app-store-fees-external-payment-links/)
- [Ninth Circuit opinion, Epic Games v. Apple](https://cdn.ca9.uscourts.gov/datastore/opinions/2025/12/11/25-2935.pdf)
- [9to5Mac, Apple to halt Epic proceedings pending SCOTUS, Jul 1 2026](https://9to5mac.com/2026/07/01/apple-to-ask-court-to-halt-epic-games-proceedings-pending-supreme-court-ruling/)
- [AppleInsider, Google's new payment policies, Jun 24 2026](https://appleinsider.com/articles/26/06/25/googles-new-payment-policies-are-a-preview-of-what-could-come-to-apple-platforms)
- [Coda, Google Play policy update 2026 and Epic settlement](https://www.coda.co/blog/epic-v-google-policy-update-2026/)
- [Core-MBA, mobile app retention benchmarks 2026 (aggregating Adjust and AppsFlyer)](https://www.core-mba.pro/tool-hub/mobile-app-retention)

agentId: a5df29de4a24ff857 (use SendMessage with to: 'a5df29de4a24ff857', summary: '<5-10 word recap>' to continue this agent)
<usage>subagent_tokens: 146424
tool_uses: 35
duration_ms: 990164</usage>