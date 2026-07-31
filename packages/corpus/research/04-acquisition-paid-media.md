Agent 2 hasn't returned; I'll deliver with the mobile cost gaps flagged honestly rather than delay further.

# ACQUISITION, FUNNEL AND PAID MEDIA — Metric Corpus

## Read this before you trust any benchmark below

Everything in this family degrades fast, and the benchmark literature is now actively polluted. Four things I verified during this research that change how you should use every number:

| Finding | Evidence |
|---|---|
| **Benchmark pages get "last updated" stamps without being re-measured.** | `wordstream.com/blog/facebook-advertising-benchmarks` displays **"Last Updated June 30, 2026"** on a table whose stated data period is **November 2016 to January 2017**, from 256 accounts and $553K spend. Verified by direct fetch. A decade-old dataset wearing a 2026 date. |
| **Panels disagree by 5x on the same metric in the same quarter.** | Q1 2026 paid search CPC: Skai reports **$1.10 (+11% YoY)**; Tinuiti reports **flat to +1%**; WordStream/LocaliQ reports a **$5.42 median**. Different advertiser mixes (Skai skews enterprise/retail, WordStream skews SMB lead-gen). Never blend them. |
| **Citations are being fabricated at scale.** | `digitalapplied.com` "Display Advertising Benchmarks 2026" attributes GDN CPM $3.12 and CTR 0.46% to "WordStream Display Industry Benchmarks Q1 2026." WordStream's own benchmark hub publishes **only** Search and Facebook reports. No such display report exists. |
| **The most-quoted B2B numbers contain propagation errors.** | HubSpot's "2025 CPL and CAC Benchmarks" cites First Page Sage as its source, then **reverses the paid and organic columns on every row** (publishes B2B SaaS as Organic $310 / Paid $164; source says Paid $310 / Organic $164). It also republishes a "$239 average B2B SaaS CAC" that contradicts the same publisher's own funnel math by roughly 27x. |

**Verification tiers used below:** `[V]` fetched and read directly. `[V-2nd]` fetched a secondary summary of a gated primary. `[S]` search snippet only. `[NONE]` no credible source found.

---

# PART 1: COST PRIMITIVES

## 1. CPM (Cost Per Mille)

**applies_to:** both

**definition:** What you pay for one thousand ad impressions, which is the price of attention before any behavioral response.

**formula_variants:**

| Variant | Formula | When it is right |
|---|---|---|
| Standard CPM | `(Spend / Impressions) × 1000` | Default. What every platform reports. |
| eCPM (effective CPM) | `(Spend / Impressions) × 1000` computed on a CPC or CPA-bought buy | The only way to compare a CPM buy against a CPC or oCPM buy on a like-for-like attention basis. |
| vCPM (viewable CPM) | `(Spend / Viewable Impressions) × 1000` | Display and programmatic, where MRC viewability (50% of pixels for 1 second, 2 seconds for video) materially differs from served impressions. Google Display bids on vCPM. |
| Cost per completed view / CPCV | `Spend / Completed Views` | Video and CTV, where an impression counted at 2 seconds is not the same product as one counted at 100%. |
| Unique CPM / cost per reach point | `(Spend / Unique Reach) × 1000` | Reach-and-frequency buys. Separates price-of-audience from price-of-repetition. |

**Practitioner disagreement:** whether "impression" means *served* or *viewable*. Meta and TikTok count served. Programmatic increasingly transacts on viewable. A 60% viewability rate makes a $5.00 served CPM an $8.33 viewable CPM, and the two are quoted interchangeably in the same deck constantly.

**inputs:** spend and impressions from the ad platform. Viewable impressions require a verification vendor (IAS, DoubleVerify, Moat). Unique reach requires platform reach reporting or an MMP.

**application:** Diagnoses whether an efficiency change came from media price or from response. CPM is the denominator-side driver in the identity `CPA = CPM / (1000 × CTR × CVR)`. Feeds spend-response and saturation analysis.

**benchmark:**

*Social CPM, 2025 annual averages, Gupta Media CPM Tracker (last updated October 2025, "tens of billions of ad impressions," 14-day trailing average)* `[V]`:

| Platform | 2025 avg CPM |
|---|---|
| Snapchat | $8.60 |
| Meta (FB + IG) | $8.19 |
| YouTube | $4.99 |
| TikTok | $4.82 |
| Pinterest | $4.67 |

*Competing panel, Right Side Up using Varos (6,000+ companies, $4B annual spend; page updated May 27, 2025)* `[V via agent]`: **Meta Q1 2025 CPM $10.88, up 19.2% YoY**, the highest Q1 since at least 2021. **TikTok Q1 2025 CPM $6.59, down 22.2% YoY.**

The Gupta vs Varos Meta gap ($8.19 vs $10.88) is a panel-composition artifact. **Cite the range, never a point estimate.**

*YoY direction, Tinuiti Digital Ads Benchmark (Q1 2026 via Karooya summary published April 22, 2026; Q2 2026 via Digital Applied published July 16, 2026)* `[V-2nd]`:

| Platform | Q1 2026 CPM YoY | Q2 2026 CPM YoY |
|---|---|---|
| Facebook | −4% | **+13%** |
| Instagram | −3% | flat |
| YouTube | −21% | −3% |
| Amazon DSP | +24% | not disclosed |
| Reddit | **+71%** | not disclosed |
| Pinterest | −8% | not disclosed |

*Seasonality:* Gupta Media reports Black Friday / Cyber Monday CPM running **66% above baseline**, with Facebook's most expensive ISO week 48 at **$13.42** (October 2025) `[V]`. AdRoll's Q4 2024 State of Digital Marketing reported **display CPM up 39% YoY in Q3 2024** amid US election crowding `[S]`.

**Google Display, LinkedIn, CTV/streaming, Reddit, and Amazon absolute CPMs: NO SOURCED BENCHMARK FOUND.** Every result traced to unsourced or fabricated-citation SEO content. To fill: register for Tinuiti's and Skai's full quarterly PDFs and Varos's benchmark pages, all free with registration and all with disclosed methodology.

**traps:**
- **CPM inflation is the most-misdiagnosed number in paid media.** A rising CPM has three separable causes and they demand opposite responses. Decompose before acting (see Metric 33).
- **CPM falls when you buy worse attention.** Broadening placements (Audience Network, Reels, low-quality supply) mechanically cuts CPM while cutting conversion rate more. A "CPM win" is often a quality loss.
- **CPM is not comparable across objectives.** A reach-objective CPM and a conversion-objective CPM on the same platform price different inventory to different people. Meta's conversion optimization deliberately bids up for high-propensity users.
- **Served vs viewable, above.**
- **Frequency hides inside CPM.** Two campaigns at identical CPM can have wildly different unique reach. Cost per reach point is the honest comparison.
- **YoY CPM comparisons in a US election year are structurally broken.** Political money crowds the same auctions, most severely in swing-state geos and on Meta (the only major social platform accepting political ads among Meta/TikTok/Pinterest).

**related:** CPC, CTR, Reach, Frequency, Impression Share, Cost per Reach Point, CPA.

---

## 2. CTR (Click-Through Rate)

**applies_to:** both

**definition:** The share of impressions that produced a click, which is the cheapest early read on whether creative and targeting match.

**formula_variants:**

| Variant | Formula | When it is right |
|---|---|---|
| All CTR | `All Clicks / Impressions` | Rarely useful on Meta. Includes likes, comments, shares, profile taps, photo expands. |
| Link CTR / outbound CTR | `Link Clicks / Impressions` | The correct default for performance. Meta reports both, and the gap is often 2x or more. |
| Unique CTR | `Unique Clickers / Reach` | Strips repeat-clicker distortion in high-frequency retargeting. |
| Expected CTR | Platform-modeled, not observed | An input to Google Quality Score and Meta's auction ranking, not a reporting metric. |
| Engaged-view rate (video) | `Views ≥ threshold / Impressions` | Video, where a click is the wrong action. |

**Practitioner disagreement:** whether "CTR" without qualification means all-clicks or link-clicks. Meta defaults dashboards to a CTR that includes engagement clicks. Agencies routinely report the flattering one.

**inputs:** impressions and clicks from the ad platform. Reconcile against landing-page sessions in analytics, and expect a gap.

**application:** Fast creative-testing signal (reads in hours, not days). Feeds Ad Rank and Quality Score on Google, which feeds CPC. Diagnoses whether a CPA problem sits above or below the click.

**benchmark:**

*Google Search + Microsoft Ads, WordStream by LocaliQ 2026 Search Advertising Benchmarks (published June 1, 2026; data April 1, 2025 to March 31, 2026; 13,474 US campaigns, 23 industries, medians)* `[V]`:

**All-industry CTR 6.64%** (versus 6.66% in the prior edition, effectively flat).

| Industry | CTR | CPC | CVR | CPL |
|---|---|---|---|---|
| Arts & Entertainment | 12.75% | $1.63 | 5.91% | $26.84 |
| Finance & Insurance | 9.83% | $3.39 | 2.64% | $74.44 |
| Travel | 9.32% | $2.14 | 5.83% | $44.70 |
| Sports & Recreation | 8.75% | $2.77 | 7.69% | $44.26 |
| Business Services | 6.10% | $5.87 | 4.85% | $93.69 |
| Health & Fitness | 5.81% | $6.17 | 6.94% | $67.36 |
| Attorneys & Legal | 5.87% | $9.87 | 5.55% | $131.63 |
| **All industries** | **6.64%** | **$5.42** | **8.18%** | **$66.69** |

*Meta, LocaliQ Facebook Advertising Benchmarks (last updated October 24, 2025; underlying data period not disclosed, which is a real methodology weakness)* `[V via agent]`:
- **Traffic campaigns, all industries: CTR 1.71%** (up from 1.57%), CPC $0.70 (down from $0.77)
- **Lead campaigns, all industries: CTR 2.59%**, CPC $1.92, CVR 7.72%, CPL $27.66 (up 20% from $22.87)

There is **no 2026 edition** of the Meta report; `wordstream.com/blog/facebook-ads-benchmarks-2026` returns 404.

*B2B SaaS Google Ads, PipeRocket (last updated July 2026; 19 B2B SaaS accounts, first-party Google Ads API, trailing 12 months July 2025 to June 2026, median account)* `[V via agent]`: **non-brand CTR 3.60%, brand CTR 22.21%.**

**traps:**
- **CTR and conversion rate are frequently inversely related.** Clickbait creative and broad-match traffic buy clicks that do not convert. Optimizing to CTR alone reliably degrades CPA.
- **The all-CTR vs link-CTR swap** is the single most common reporting sleight of hand on Meta.
- **Placement mix drives CTR more than creative does.** Reels, Stories, and Audience Network have structurally different CTRs. A CTR change is often a delivery-mix change.
- **Search CTR is position-determined.** A CTR increase can be pure Ad Rank movement with no creative improvement.
- **Brand CTR is not a performance signal.** PipeRocket's 22.21% brand CTR reflects people typing your name, not persuasion.
- **CTR benchmarks are unusable across objectives and industries.** A 12.75% Arts & Entertainment search CTR and a 1.71% Meta traffic CTR are not on the same scale.

**related:** CPM, CPC, Quality Score, Landing Page Conversion Rate, Frequency.

---

## 3. CPC (Cost Per Click)

**applies_to:** both

**definition:** What you pay for one click, which is the price of a visit rather than the price of attention.

**formula_variants:**

| Variant | Formula | When it is right |
|---|---|---|
| Average CPC | `Spend / Clicks` | Default reporting. |
| Derived CPC | `CPM / (CTR × 1000)` | Shows algebraically that CPC is a *function* of CPM and CTR. Use it when diagnosing which one moved. |
| Cost per link click (CPLC) | `Spend / Link Clicks` | Meta. The only version that maps to landing-page traffic. |
| Cost per outbound click | `Spend / Outbound Clicks` | Strips in-platform clicks entirely. |
| Max CPC / bid | The cap, not the price | A control input, not a result. Confusing the two is a beginner tell. |
| Cost per session / cost per visit | `Spend / Analytics Sessions` | The honest denominator when click-to-session loss is material (often 10 to 30%). |

**inputs:** platform spend and clicks. For cost per session, GA4 or an equivalent, which will not reconcile to platform clicks and should not be expected to.

**application:** Sets the ceiling on what a funnel can afford. `Max affordable CPC = Target CPA × Landing-page CVR`. Feeds keyword and placement pruning, and match-type strategy.

**benchmark:**

*Google + Microsoft Search, WordStream/LocaliQ 2026 (see table in Metric 2)* `[V]`: **all-industry median CPC $5.42**, up 3.0% from $5.26 in the prior edition. Range $1.63 (Arts & Entertainment) to $9.87 (Attorneys & Legal).

Headline finding, quoted from the report: **"For the first time in five years, overall average cost per lead in Google and Microsoft Ads has actually gone down"** (CPL $66.69 vs $70.11, down 4.9%).

*Meta, LocaliQ (October 2025)* `[V via agent]`: traffic **$0.70**, lead campaigns **$1.92**. Gupta Media cost per link click October 2025: **Meta $0.37, TikTok $0.49, Snapchat $0.51** `[V]`.

*B2B SaaS, PipeRocket (July 2026, 19 accounts)* `[V via agent]`: **non-brand $13.75, brand $3.12, blended $6.81.**

*Enterprise/retail panel, Skai Q1 2026 Quarterly Digital Trends (published April 28-29, 2026)* `[V via agent]`: paid search **CPC $1.10, up 11% YoY, an all-time high** roughly double its level two years prior. Paid social CPC **down 22%**, CPM stable in a $5 to $6 band. Retail media CPC **down 8%**, ROAS steady at $6.00 for a fifth consecutive quarter. Amazon DSP CPC $0.83 to $0.86 now sits **below** Sponsored Products at $0.96, a pricing inversion from a year prior.

**Note the direct conflict:** Skai's $1.10 and WordStream's $5.42 both describe "paid search CPC" in overlapping periods. Different panels. Present separately.

*B2B SaaS agency data disagreement:* 42 Agency (B2B client data 2022 to 2026) reports search CPC $6.29 with a **0.31% conversion rate** and $606 cost per conversion, versus PipeRocket's 2.57% blended conversion rate `[V via agent]`. An 8x gap between two agencies both reporting real client data, almost certainly a conversion-definition difference (42 Agency's $606 implies they are counting SQLs or opportunities, not form fills). This is the cleanest illustration available of why agency benchmarks do not stack.

**traps:**
- **CPC is a composite, not a lever.** It falls when CPM falls or CTR rises. Reporting CPC without decomposing tells you nothing about which.
- **Brand keywords crush the blended average.** Any account-level CPC that mixes brand and non-brand is close to meaningless. Tinuiti reported Google **brand keyword CPC down 9% YoY in Q1 2026** while text-ad CPC overall rose 1%.
- **Click-to-session loss** (bot filtering, bounce-before-load, tracking blocks) means platform clicks systematically exceed analytics sessions. Budgeting off platform clicks overstates traffic.
- **Automated bidding makes CPC an output you no longer control.** Under tCPA/tROAS/Advantage+, CPC is a residual. Reading it as a decision variable is a category error.
- **Match type dominates CPC in B2B.** 42 Agency reports cost per MQL of **$1,200 exact / $2,800 phrase / $4,000+ broad** `[V via agent]`.

**related:** CPM, CTR, Quality Score, Landing Page Conversion Rate, CPA.

---

## 4. Quality Score and Ad Relevance Diagnostics

**applies_to:** both

**definition:** Platform-assigned scores estimating how well your ad matches the query or user, which act as a direct multiplier on what you pay per click.

**formula_variants:**
- **Google Quality Score:** 1 to 10, composed of expected CTR, ad relevance, and landing page experience, each rated Below Average / Average / Above Average. Diagnostic only, not the live auction input.
- **Ad Rank:** `Bid × Ad Quality × Expected impact of assets/formats × Context × Auction-time quality thresholds`. This is what actually runs, and it is not the reported Quality Score.
- **Meta quality/engagement/conversion rate rankings:** percentile buckets versus ads competing for the same audience.
- **Effective CPC on Google:** roughly `(Ad Rank of competitor below / your Ad Quality) + $0.01`. The practical consequence is that higher quality lowers your realized CPC at constant bid.

**inputs:** Google Ads keyword-level Quality Score columns; Meta ad-level ranking diagnostics.

**application:** Diagnoses whether a CPC problem is a bid problem, a creative problem, or a landing page problem. Also determines *which* lever fixes lost impression share due to rank.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** Google does not publish Quality Score distributions. "Aim for 7+" is agency convention, not published guidance. Meta's rankings are explicitly relative to competing ads, so they have no absolute benchmark by construction.

**traps:**
- **Quality Score is reported at the keyword level and is historical.** It reflects exact-match history and can be null or stale for low-volume keywords. It is not the auction-time number.
- **Chasing Quality Score is not a strategy.** The score is downstream of the same things that improve CPA. Optimizing the proxy instead of the outcome wastes cycles.
- **Meta's rankings are zero-sum.** If everyone in your auction improves, your percentile can fall while your absolute performance improves.
- **Landing page experience is scored on the page, not the offer.** Fast, relevant pages score well and still convert badly.

**related:** CPC, Impression Share, CTR, Landing Page Conversion Rate.

---

## 5. Reach and Unique Reach

**applies_to:** both

**definition:** The count of distinct people who saw at least one impression, as opposed to the count of impressions themselves.

**formula_variants:**
- **Platform reach:** distinct users within one platform's identity graph, over a stated period.
- **Deduplicated cross-platform reach:** requires a panel, an MMP, or a clean room. Summing platform reach across channels always overstates, because the same person is counted once per platform.
- **Reach %:** `Reach / Addressable Audience Size`. The only version that supports a saturation argument.
- **Incremental reach:** `Reach(A ∪ B) − Reach(A)`. The correct question when adding a channel.
- **Effective reach:** reach at or above a minimum frequency threshold.

**inputs:** platform reach reporting; addressable audience size from platform audience estimators, census/TAM data, or an MMP.

**application:** The denominator for frequency. Determines whether a CPM rise is audience exhaustion or auction competition. Gates whether "spend more" is even physically available.

**benchmark:** **NO SOURCED BENCHMARK FOUND for a "good" reach figure**, and correctly so, since reach targets are entirely a function of addressable market size. Platform-wide addressable ceilings are published (DataReportal/Kepios, January 2025: Facebook ad reach 2.28 billion, Instagram 1.74 billion) `[S, via aggregator]` but these are ceilings, not benchmarks.

**traps:**
- **Reach is deduplicated within a platform and never across platforms.** Adding Meta reach to TikTok reach produces a number that describes no real population.
- **Platform reach counts accounts, not humans.** Multi-account and shared-device users inflate it.
- **Reach % requires an honest denominator.** Marketers pick a TAM that makes saturation look far away. The relevant denominator is the *targetable, in-market* audience, which is a small fraction of TAM.
- **Reach reporting windows are not additive.** Weekly reach summed across four weeks is not monthly reach.

**related:** Frequency, CPM, Impression Share, Marginal CAC.

---

## 6. Frequency (and Effective Frequency)

**applies_to:** both

**definition:** Average impressions delivered per reached person, which is the repetition dial that trades incremental reach against incremental persuasion.

**formula_variants:**
- **Average frequency:** `Impressions / Reach`
- **Frequency distribution:** the share of reached users at 1x, 2x, 3x+ exposures. Far more decision-useful than the mean, because averages hide a long tail of over-exposed users.
- **Effective frequency:** the minimum exposure count at which response materializes. Estimated, never observed directly.
- **Frequency cap:** a delivery control, not a metric.
- **Frequency per creative** vs **per campaign** vs **per account.** A user at 2.0 campaign frequency may be at 8.0 account frequency across your six campaigns. Account-level is what the human experiences.

**inputs:** impressions and reach from the platform. Note that Meta's Ads Insights API restricted **frequency breakdowns to 6 months of historical data effective January 12, 2026** `[V, Meta developers blog, published October 16, 2025]`.

**application:** Diagnoses creative fatigue and audience exhaustion. Feeds the decision between raising budget in an existing audience versus expanding the audience.

**benchmark:** **NO SOURCED BENCHMARK FOUND.**

This deserves emphasis because the circulating numbers are confidently stated and unsourced. **Meta does not publish frequency thresholds.** The widely repeated conventions (keep prospecting below 3.0, retargeting 4.0 to 6.0, "2.5 yellow / 3.5 red," "conversion likelihood drops 45% by the fourth exposure," "CTR drops 40 to 55% at 5+ exposures") appear only on low-authority agency and AI-generated pages with no traceable methodology. I could not verify a single one, and multiple attempts to reach Meta's official reach and frequency documentation returned 404. **Do not cite these as benchmarks.** The defensible practice is to measure the frequency-response curve in your own account.

**traps:**
- **The average is the wrong statistic.** A 2.5 average frequency routinely contains a decile at 10x+. Always pull the distribution.
- **Frequency is computed per campaign, not per person.** Running six campaigns against overlapping audiences produces a real-world frequency that appears nowhere in your reporting.
- **Frequency and audience size are mechanically linked.** Holding budget constant, narrowing the audience raises frequency. A frequency spike is often a targeting change, not a fatigue problem.
- **Rising frequency with flat CPA is not fine.** It usually means you are re-converting people who would have converted anyway, which is an incrementality problem that CPA cannot see.
- **View-through attribution rewards high frequency mechanically.** More impressions means more chances to claim a view-through conversion, independent of any causal effect.

**related:** Reach, CPM, CTR, View-Through Conversions, Marginal CAC, Incrementality.

---

## 7. Impression Share and Lost Impression Share

**applies_to:** both, primarily search and retail media

**definition:** The share of auctions you were eligible for that you actually won, split by whether you lost on budget or on rank.

**formula_variants (Google's official definitions, verified at support.google.com)** `[V]`:
- **Search impression share** = `Impressions / Eligible Impressions`
- **Search top IS** = `Impressions on top / Eligible impressions` (top means above organic results)
- **Search absolute top IS** = `Impressions in position 1 / Eligible impressions`
- **Search lost IS (budget):** "how often your ad didn't show anywhere among top ads due to a low budget"
- **Search lost IS (rank):** "how often your ad didn't show anywhere among top ads due to poor Ad Rank"
- Identity: `IS + Lost IS (budget) + Lost IS (rank) = 100%`
- **Share of voice** in paid social has no equivalent published metric. Vendor "SOV" figures are modeled estimates.

**inputs:** Google Ads and Microsoft Ads reporting. Amazon publishes an analogous impression share. Meta publishes nothing equivalent.

**application:** The single cleanest read on headroom. Lost IS (budget) means the money is the constraint and more budget buys more volume at roughly current efficiency. Lost IS (rank) means bid, Quality Score, or relevance is the constraint and more budget buys nothing.

**benchmark:** **NO SOURCED BENCHMARK FOUND, and Google explicitly does not publish targets.** Google's own documentation warns these metrics "sometimes may decrease as bids increase." Every circulating figure ("90%+ on brand, 60 to 80% competitive, below 50% is a problem") is agency convention `[S]`, not published research.

The defensible sourced statement is structural rather than numeric: **budget-constrained loss is fixed with budget; rank-constrained loss is fixed with bid, Quality Score, or ad relevance. Confusing the two guarantees wasted spend.**

**traps:**
- **"Eligible impressions" is Google's estimate, not a count.** It is modeled from targeting, approval status, and quality, and Google does not disclose the model.
- **100% impression share is almost always a mistake.** It means you outbid everyone on every auction including the unprofitable tail.
- **Impression share is not share of market.** It is share of *your own* eligible auctions. Narrow your keywords and your IS rises while your actual market coverage falls.
- **PMax and Advantage+ break it.** Tinuiti reports PMax at **67% of Google Shopping spend and 68% of sales in Q1 2026** `[V-2nd]`, and PMax does not report impression share in a comparable way.
- **Brand IS is a vanity metric.** You will win most brand auctions regardless. High brand IS says nothing about growth and, per the incrementality evidence in Metric 32, may be pure cannibalization.

**related:** CPC, Quality Score, Marginal CAC, Brand vs Non-Brand Split.

---

## 8. CPI (Cost Per Install)

**applies_to:** consumer (mobile)

**definition:** Paid media cost divided by attributed app installs, which is the entry price into a mobile funnel and almost never the price of a customer.

**formula_variants:**

| Variant | Formula | When it is right |
|---|---|---|
| Platform CPI | `Spend / Platform-reported installs` | Self-attributed, inflated. Use only within a single platform's optimization loop. |
| MMP CPI | `Spend / MMP-attributed installs` | The deduplicated version. The correct cross-channel comparison. |
| Blended CPI | `Total UA spend / Total installs (all sources)` | Includes organic. Falls automatically as organic grows, which makes it a bad efficiency metric and a fine business metric. |
| Paid-only CPI | `Paid spend / Paid-attributed installs` | The efficiency metric. |
| Loaded CPI | `(Media + creative + agency + tooling) / Installs` | The version a CFO recognizes. |
| SKAN CPI (iOS) | `Spend / SKAN postback installs` | Undercounts due to crowd anonymity thresholds and null postbacks. Not comparable to MMP CPI. |
| Cost per *first-open* | `Spend / First opens` | Installs and opens diverge by roughly 10 to 20%. The gap is pure waste and worth watching. |

**Industry has NO consensus definition** on whether CPI means paid-only or blended. Vendor CPI benchmark tables almost never say which, which makes most of them unusable.

**inputs:** spend from ad platforms; installs from an MMP (AppsFlyer, Adjust, Branch, Singular) for the deduplicated number; App Store Connect and Google Play Console for store-side truth.

**application:** Gates the entire mobile unit economic. Combined with revenue per install, it produces the payback answer directly.

**benchmark:** **NO SOURCED BENCHMARK FOUND in this research pass.** Business of Apps, Adjust, and multiple AppsFlyer report URLs blocked or rate-limited automated retrieval, and the session search budget was exhausted before alternatives could be found.

**Do not substitute a remembered number.** To fill this, pull: AppsFlyer Performance Index and its cost benchmark dashboards, Adjust's Mobile App Trends report, Liftoff's category reports, Sensor Tower, and Tenjin. Note that CPI moves so fast by geo and quarter that anything older than two quarters is decorative.

**The more decision-useful benchmark you can act on today** is the revenue side, which I did verify. *RevenueCat State of Subscription Apps 2026 (115,000+ apps, $16B revenue, 1B+ transactions, data primarily 2025)* `[V]`:

| Metric | Value |
|---|---|
| Revenue per download, D14, Health & Fitness | $0.48 (highest category) |
| Revenue per download, D14, Gaming | $0.08 (lowest) |
| Revenue per download, D60, Health & Fitness | $0.66 |
| Revenue per download, D60, Gaming | $0.14 |
| Revenue per download, D60, North America | $0.55 |
| Revenue per download, D60, India/SEA | $0.11 |

That 5x geographic gap in D60 revenue per download is why a "global CPI benchmark" is a meaningless object. **A $1.50 CPI is excellent in one geo-category cell and fatal in another.**

**traps:**
- **CPI optimizes for the cheapest install, which correlates negatively with quality.** Incentivized traffic, low-tier geos, and emulator fraud all produce beautiful CPI and no revenue.
- **Blended CPI falls when organic grows and rises when you scale paid**, so it moves for reasons unrelated to media efficiency. Never use it to judge a channel.
- **iOS and Android CPI are not comparable**, and after ATT, iOS CPI is measured through a different system entirely.
- **CPI benchmark tables rarely disclose whether the figure is paid-only or blended, which geo mix, or which measurement source.** Treat any undisclosed one as unusable.
- **Install is not an outcome.** It is the top of a funnel where, per RevenueCat 2026, the median app converts **5.6% of downloads to a trial by D30** and **2.1% to paid by D35 on freemium**.

**related:** Click-to-Install, Cost per Registration, Cost per Trial, Cost per Paying Customer, ROAS by day window, ATT Opt-In Rate, SKAN Coverage.

---

## 9. Click-to-Install Rate, Impression-to-Install, and Store Conversion Rate

**applies_to:** consumer (mobile)

**definition:** The conversion steps between the ad click and a completed install, which is where the app store, not your media, controls the outcome.

**formula_variants:**
- **Click-to-install (CTI):** `Installs / Clicks`
- **Impression-to-install (IPM, installs per mille):** `(Installs / Impressions) × 1000`. The standard optimization target in mobile gaming and increasingly in subscription UA, because it collapses CTR and CTI into one number the algorithm can bid against.
- **Store product page conversion rate:** `Downloads / Product Page Views`
- **Impression-to-download (store):** `Downloads / Store Impressions`. Apple and Google report these differently, and they are not comparable.
- **Click-to-first-open:** `First Opens / Clicks`. Catches install-abandonment and failed opens.

**inputs:** clicks and impressions from ad platforms; installs from an MMP; store-side impressions, product page views, and downloads from App Store Connect and Google Play Console.

**application:** Isolates whether a CPI problem is a media problem or a store-listing problem. If CTR is healthy and CTI is poor, the fix is creative-to-listing continuity, screenshots, ratings, and app size, not bidding.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** ASO vendor pages (AppTweak, StoreMaven, Phiture) that publish store conversion benchmarks were not retrievable in this pass. To fill: AppTweak and Sensor Tower ASO benchmark reports, plus Apple's own App Store Connect category comparison feature, which gives you a benchmark against your actual peer set and is better than any published table.

**traps:**
- **Attribution windows silently inflate CTI.** A 7-day click window credits installs to clicks that had no causal role, especially on high-frequency retargeting.
- **Click-injection and click-flooding fraud manufacture clicks that "convert."** Fraud makes CTI look bad (flooding) or suspiciously good (injection). Check the click-to-install time distribution; a spike under 10 seconds is injection.
- **iOS SKAN has no click-level join,** so CTI on iOS is either modeled or unavailable. Comparing iOS and Android CTI is comparing two different measurement systems.
- **Store CVR is heavily driven by organic search traffic you did not buy,** so blended store CVR moves when your organic mix moves.
- **Custom Product Pages and Google Play custom store listings** mean "the store page" is not one page. Blended store CVR averages across variants.

**related:** CPI, CTR, Cost per Registration, ATT Opt-In Rate.

---

## 10. Cost per Registration / Cost per Signup

**applies_to:** both

**definition:** Paid cost per completed account creation, the first step where you own an identity you can market to.

**formula_variants:**
- `Paid spend / Attributed registrations`
- **Blended:** `Total marketing spend / Total registrations` including organic
- **Verified-registration cost:** `Spend / Email-or-phone-verified registrations`. The version that survives contact with a bot attack.
- **Cost per *qualified* registration:** restricted to registrations matching ICP or geo criteria. Essential in B2B, where free-email and student signups can be most of the volume.
- Derived: `Cost per registration = CPI / Install-to-registration rate` (mobile) or `CPC / (LP CVR × Registration completion rate)` (web)

**inputs:** ad platform spend; registration events from your product database (the only trustworthy source), cross-referenced with MMP or analytics for attribution.

**application:** The first metric in the chain that is a *company* metric rather than a media metric. Feeds activation and trial economics. In B2B PLG, it is the practical CPL equivalent.

**benchmark:** **NO SOURCED BENCHMARK FOUND as a standalone cost figure.** The closest defensible construction is derived. From OpenView's PLG benchmarks (published June 15, 2022; 450+ software companies surveyed with Amplitude) `[V via agent]`:

| Model | Visitor-to-signup | Signup-to-paid |
|---|---|---|
| Freemium | ~6% (≈60 per 1,000 visitors) | 5% |
| Free trial | 3 to 4% (30 to 40 per 1,000) | 17% |

Combine with a channel CPC to derive cost per registration. **Caveat this heavily: OpenView shut down in 2024, the data is from mid-2022, and no successor dataset exists.** Claims of "OpenView 2024 PLG benchmarks" circulating on aggregator sites could not be verified and appear to be fabricated.

**traps:**
- **Registration is the easiest step to fake and the easiest to game.** Bot signups, incentivized signups, and duplicate accounts inflate volume and destroy downstream rates.
- **Lowering registration friction lowers cost per registration and usually raises cost per paying customer.** The metric improves while the business worsens. This is the single most common self-deception in the funnel.
- **Social login versus email changes the number without changing the business.** So does mandatory-vs-optional account creation.
- **In B2B, registration volume is dominated by non-ICP traffic.** Unqualified cost per registration is close to a vanity metric.
- **Platform-attributed registrations double-count across networks** (see Metric 26).

**related:** CPI, Install-to-Registration Rate, Cost per Activation, Cost per Trial, CPL.

---

## 11. Cost per Activation (and Activation Rate)

**applies_to:** both

**definition:** Paid cost per user who reached the product moment that predicts retention, which is the first metric in this family that correlates with money.

**formula_variants:**
- `Paid spend / Activated users`
- **Activation rate:** `Activated users / Registrations` (or `/ Installs`)
- **Time-boxed activation:** activation within N days of signup (D1, D7). Without a time box the metric drifts upward forever and cannot be compared across cohorts.
- **Multi-criteria activation:** e.g. "connected an account AND completed one core action within 7 days." More predictive, less comparable.

**Industry has NO consensus definition of activation whatsoever.** Every company defines its own aha moment. This makes cost per activation the least benchmarkable and most internally valuable metric in the family. Treat any published "activation benchmark" as describing a different metric than yours.

**inputs:** product event data (Amplitude, Mixpanel, your own warehouse). Ad spend from platforms. Requires a working join between ad attribution and product events, which is where most implementations fail.

**application:** The best available early proxy for LTV that reads inside a week. Should be the optimization target for paid campaigns wherever event volume supports it, because it is far more correlated with revenue than install or registration and far faster than purchase.

**benchmark:** OpenView's PLG survey gives an activation **target range of 20 to 40%** (published June 2022, 450+ companies) `[V via agent]`. This is the only sourced activation figure I could verify, and given the definitional chaos above, it should be read as a rough shape rather than a standard.

Everything else: **NO SOURCED BENCHMARK FOUND**, and I would argue none can meaningfully exist.

**traps:**
- **Redefining activation is the easiest way to make a dashboard improve.** Loosening the criterion raises activation rate and lowers cost per activation with zero business change. Lock the definition and version it.
- **Activation without a time box is not a rate.** It is a cumulative count that only goes up.
- **Selection effects.** Cheap channels bring users who activate less. Activation rate falls when you scale, and that is expected, not a failure.
- **Optimizing paid to an activation event requires enough weekly events for the algorithm to learn.** Below roughly 50 per week per ad set, you are training on noise, and this pushes teams back to a worse but higher-volume proxy event.
- **On iOS, activation events must be encoded into SKAN conversion values,** which forces a lossy compression choice.

**related:** Cost per Registration, Cost per Trial, Cost per Paying Customer, ROAS by day window. Cross-family: Retention, LTV.

---

## 12. Cost per Trial Start (and Trial Start Rate)

**applies_to:** both, central to consumer subscription

**definition:** Paid cost per initiated free trial, which is the last cheap step before the money question.

**formula_variants:**
- `Paid spend / Trial starts`
- **Trial start rate:** `Trial starts / Downloads` (mobile) or `/ Visitors` (web)
- **Opt-in vs opt-out trials** are different products and must never be blended. Opt-out (payment method required up front) produces far fewer, far better trials.
- Derived: `Cost per paying customer = Cost per trial / Trial-to-paid rate`
- **Cost per trial net of trial cost:** if the trial consumes real COGS (compute, API calls, physical goods), the loaded figure is the honest one.

**inputs:** spend from ad platforms; trial start events from the billing system (RevenueCat, Stripe, App Store Server Notifications), never from analytics.

**application:** The proximate optimization target for most subscription apps, because it is high-volume enough to train bidding algorithms and close enough to revenue to be honest. Feeds directly into cost per paying customer.

**benchmark:**

*Consumer subscription apps, RevenueCat State of Subscription Apps 2026 (115,000+ apps, $16B revenue, 1B+ transactions, data primarily 2025)* `[V]`:

| Metric | Value |
|---|---|
| **Download-to-trial, D30, overall median** | **5.6%** |
| Business category | 9.1% (highest) |
| Gaming | 4.4% (lowest) |
| North America | 7.1% |
| India / SEA | 3.0 to 3.7% |

Prior edition for trend (RevenueCat 2025, 75,000 apps, 2024 data) `[V]`: download-to-trial median **6.2%**, P90 **20.3%**, and **82% of trial starts occur the same day as install.** The year-over-year move from 6.2% to 5.6% is worth noting, though sample composition changed substantially between editions.

*B2B SaaS, First Page Sage (published Feb 29, 2024, updated Dec 23, 2025, "2025 benchmarks," agency client data)* `[V via agent]`: free trial signup rate by vertical from **12.6% (IoT)** and **12.3% (Healthcare/Medtech)** down to **5.5% (Enterprise)**. Freemium signup 15.5% (IoT) to 15.3% (Healthcare).

*The opt-in vs opt-out tradeoff, same source* `[V via agent]`:

| Trial type | Visitor-to-trial (organic / paid) | Trial-to-paid (organic / paid) |
|---|---|---|
| Opt-in (no card) | 8.5% / 7.1% | 18.2% / 17.4% |
| Opt-out (card required) | 2.5% / 2.2% | **48.8% / 51%** |

Opt-out cuts trial volume by roughly 70% and roughly triples trial-to-paid. The product of the two is similar, so **the choice is about cost per trial versus cost per customer, and reporting only cost per trial makes opt-in look strictly better when it usually is not.**

**traps:**
- **Cost per trial is the single easiest metric in this family to game**, by removing the card requirement, shortening the paywall, or making the trial one tap. All three cut cost per trial and raise cost per paying customer.
- **Opt-in and opt-out trials in one blended number is a reporting error, not a simplification.**
- **Trial length changes the metric's meaning.** Per RevenueCat 2026, trial-to-paid runs **25.5% for trials of 4 days or fewer, 37.4% for 5 to 9 days, and 42.5% for 17 to 32 days.** A cost-per-trial comparison across different trial lengths is comparing different assets.
- **Trial fraud and trial recycling** (repeat trials via new accounts) inflate volume, particularly on Android.
- **Platform-reported trial events lag and are modeled,** especially on iOS via SKAN, where a trial start may land in a coarse conversion value bucket days later or not at all.

**related:** Cost per Registration, Cost per Paying Customer, CPI, ROAS by day window. Cross-family: Trial-to-Paid Conversion, Subscription Retention.

---

## 13. Cost per Paying Customer (Paid CAC)

**applies_to:** both

**definition:** Paid media cost divided by new paying customers acquired, which is the first number in this family that a CFO recognizes as real.

**formula_variants:**

| Variant | Formula | When it is right |
|---|---|---|
| Paid CAC | `Paid media spend / New paying customers from paid` | Channel efficiency. |
| Blended CAC | `Total S&M spend / All new customers` | Business-level truth. Includes organic in the denominator, so it is always lower and always flattering. |
| Fully loaded CAC | `(Media + creative + tools + salaries + agency) / New customers` | The version a board should see. |
| New CAC ratio | `S&M spend / New ARR` | The B2B SaaS standard. Self-normalizes for ACV, which dollar CAC does not. |
| Marginal CAC | `ΔSpend / ΔNew customers` | The only version that answers "should I spend more." See Metric 30. |
| Incremental CAC | `Spend / Incrementally-measured new customers` | The only version that is causally honest. See Metric 27. |

**Industry has NO consensus** on whether CAC includes salaries, whether it counts new logos or new revenue, or whether it is paid-only or blended. Norwest's 2025 survey found **45% of B2B respondents could not state their CAC at all**, rising to 70% among firms with sales cycles over six months, and attributes the spread to "inconsistent measurement practices, with some over- or under-allocating expenses to CAC" `[V via agent]`.

**inputs:** billing system for paying customers (Stripe, RevenueCat, the CRM's closed-won). Spend from platforms plus finance. Attribution from an MMP, a warehouse model, or an MMM.

**application:** Paired with LTV and gross margin, it is the go/no-go on a channel. Paired with payback period, it is the go/no-go on the growth plan.

**benchmark:**

*B2B SaaS, Norwest 2025 B2B Sales & Marketing Benchmark Report (3rd annual, fielded August 2025, n=177: 77 Norwest portfolio + 100 third-party; VC-backed 55%, PE-backed 29%)* `[V via agent]`:

| Average ACV | Average CAC |
|---|---|
| <$25,000 | $1,547 |
| $25,000 to $50,000 | $4,750 |
| $50,000 to $100,000 | $10,517 |
| $100,000 to $500,000 | $5,206 |
| >$500,000 | $32,268 |

The $100K to $500K band breaking monotonicity is a small-cell artifact, not a finding.

*The more robust framing, Benchmarkit 2025 B2B SaaS Performance Metrics (2024 data)* `[V via agent]`:
- **New CAC Ratio median $2.00 of S&M spend per $1 of new ARR, up 14% in 2024**
- Blended CAC ratio median fell 12% YoY but remains 10% above 2022
- CAC payback up 12.5% at median since 2022
- The **$10K to $50K ACV band is more expensive to acquire than $50K to $100K**, the same non-monotonicity Norwest shows
- S&M spend 47% of revenue (VC-backed) vs 33% (PE-backed)

**Recommend leading with CAC ratio over dollar CAC in B2B.** It travels across ACV tiers; dollar CAC does not.

*Consumer subscription:* **NO SOURCED CAC BENCHMARK FOUND.** The usable substitute is RevenueCat 2026 revenue per download (D60 North America $0.55, Health & Fitness $0.66, Gaming $0.14) `[V]`, against which you set your own CPI ceiling.

**A warning on a widely-circulated figure:** the **"$239 average B2B SaaS CAC"** attributed to First Page Sage and republished by HubSpot is internally inconsistent with the same publisher's own data. First Page Sage's funnel implies roughly 27 leads per closed-won customer; at their own $237 blended B2B SaaS CPL, CAC would be roughly **$6,400**. Their own CAC-by-channel report puts B2B PPC at $802 and organic average at $942. **A CAC one dollar above a CPL means a lead and a customer cost the same. Do not use $239.**

**traps:**
- **Blended CAC falls when organic grows,** so it improves for reasons that have nothing to do with your media. It is the right number for a board and the wrong number for a channel decision.
- **Paid CAC uses platform-attributed customers,** which are over-claimed. Your real paid CAC is worse than reported, often by a lot (Metric 27).
- **CAC is a lagging metric with a lag that scales with sales cycle.** At >$500K ACV with a 9 to 12 month cycle (Norwest), this quarter's CAC reflects spend from three quarters ago. Reading it as current efficiency is a timing error.
- **Averaging across cohorts hides mix.** A stable CAC can conceal a collapsing new-customer CAC offset by cheap reactivations.
- **Excluding creative, agency, and tooling costs** understates CAC by a margin that grows as you professionalize.

**related:** CPL, Cost per Trial, MER, aMER, Marginal CAC, ROAS. Cross-family: LTV, CAC Payback, Gross Margin.

---

## 14. CPL (Cost Per Lead) and Cost per MQL / SQL / Opportunity

**applies_to:** b2b primarily

**definition:** Paid cost per contact captured, and per contact surviving each qualification gate.

**formula_variants:**
- `Spend / Leads` where "lead" is any form fill
- `Spend / MQLs`, `Spend / SQLs`, `Spend / Opportunities`, `Spend / Closed-won`
- **Derived stage cost:** `Cost per SQL = CPL / (Lead→MQL × MQL→SQL)`. Given the state of the benchmark literature, this derivation from your own rates is more defensible than any published stage-cost figure.
- **Net-new vs total leads:** duplicates and existing customers filling out forms should be excluded, and usually are not.
- **Cost per *qualified* lead:** filtered to ICP fit before any scoring.

**Industry has NO consensus definition of MQL.** Norwest's 2025 survey asked directly: **16% define it as "any lead who fills out a form," 55% as "engages and matches target persona," 25% as "scoring model," 24% as "only high-intent," and 21% do not track MQLs at all** `[V via agent]`. Cross-company MQL comparisons are therefore close to meaningless.

**inputs:** spend from ad platforms; lead and stage counts from the CRM (Salesforce, HubSpot). Requires the CRM to hold the source, which is where most B2B attribution breaks.

**application:** The primary paid-media efficiency metric in B2B demand gen. Feeds pipeline coverage and the marketing-sourced pipeline number.

**benchmark:**

*Google + Microsoft Search, WordStream/LocaliQ 2026 (published June 1, 2026; 13,474 US campaigns, April 2025 to March 2026)* `[V]`: **all-industry median CPL $66.69**, down 4.9% YoY. Business Services **$93.69**. Attorneys & Legal $131.63 (highest). Arts & Entertainment $26.84 (lowest). **There is no Technology, Software, SaaS, or B2B row.** Anyone citing "WordStream says B2B SaaS CPL is X" is inventing it.

*Meta lead campaigns, LocaliQ (October 2025)* `[V via agent]`: **all-industry CPL $27.66, up 20% from $22.87.** Note the divergence: Meta lead CPL rose 20% while search CPL fell 5%.

*B2B by industry, First Page Sage (published May 8, 2025, updated Dec 23, 2025; data January 2022 to June 2025; agency client base)* `[V via agent]`:

| Industry | Paid CPL | Organic CPL | Blended |
|---|---|---|---|
| B2B SaaS | $310 | $164 | $237 |
| Cybersecurity | $411 | $404 | $406 |
| Fintech | $490 | $413 | $452 |
| IT & Managed Services | $617 | $385 | $503 |
| Industrial IoT | $590 | $404 | $497 |
| Software Development | $680 | $510 | $591 |

**HubSpot's republication of this table reverses the paid and organic columns on every row.** Use First Page Sage's direction.

*CPL by ACV, Norwest 2025 (fielded August 2025, n=177)* `[V via agent]`:

| ACV band | Average CPL |
|---|---|
| <$50K | $387 |
| $50K to $100K | $1,365 |
| >$100K | $4,129 |

Leads for >$100K ACV deals cost **more than 10x** those for <$50K. Caveat: 41% of respondents could not report CPL, rising to 53% among sub-$5M-revenue firms.

*B2B SaaS Google Ads, brand vs non-brand, PipeRocket (July 2026, 19 accounts, July 2025 to June 2026 medians)* `[V via agent]`: **non-brand CPL $207, brand CPL $34, blended $84.**

*LinkedIn:* Clever Zebo reports a **$125.00 median** B2B SaaS LinkedIn CPL (June 2026), and to its credit labels its own figure **"low confidence, directional only"** (single agency, ~$1M spend over six months, N undisclosed) `[V via agent]`.

**Cost per MQL, cost per SQL, cost per opportunity, and review-site (G2/Capterra) CPL: NO SOURCED BENCHMARK FOUND.** Every result claiming these traces to unsourced, AI-generated SEO content with fabricated precision. Derive from your own CPL and stage rates instead.

**traps:**
- **A lead is whatever you say it is,** so CPL is trivially gameable by loosening the form or counting content downloads as leads.
- **Cheap leads at the top produce expensive customers at the bottom.** Content-syndication and gated-ebook CPL looks excellent and converts to pipeline at a fraction of demo-request rates. CPL alone will systematically misallocate budget toward the worst channels.
- **Brand search CPL will always be the best line in your account, and it is largely cannibalized organic.** See Metric 32.
- **Duplicate leads inflate volume.** Existing customers and repeat downloaders are counted as new leads in most instrumentations.
- **CPL is measured today; the revenue lands 2 to 12 months later.** At >$500K ACV, Norwest reports 9 to 12 month cycles, so this quarter's CPL cannot be validated this quarter.
- **The published B2B benchmark ecosystem is largely one agency's client base wearing several hats.** HubSpot's CPL table cites First Page Sage; Sopro blends First Page Sage figures with its own without labeling which is which. Citing all three is citing one dataset three times.

**related:** Cost per Registration, Visit-to-Lead Rate, Funnel Cascade Rates, CAC, Landing Page CVR.

---

# PART 2: FUNNEL CONVERSION

## 15. Landing Page Conversion Rate

**applies_to:** both

**definition:** The share of landing page visitors who complete the page's primary action, which is the highest-leverage number you fully control.

**formula_variants:**
- `Conversions / Sessions` (session-based, the default)
- `Conversions / Unique Visitors` (visitor-based, always higher)
- **By traffic source**, which is mandatory, since blended LP CVR mostly measures traffic mix
- **Micro vs macro conversion:** scroll depth and video plays versus form submits. Not comparable.
- **Click conversions vs form conversions:** Unbounce reports click conversions consistently outperform form conversions, which is a definition difference masquerading as a performance difference.

**inputs:** analytics (GA4, Amplitude) or the landing-page platform. Reconcile conversions against the CRM or billing system, because analytics and CRM will disagree.

**application:** The multiplier that turns a CPC into a CPL. `CPL = CPC / LP CVR`. A doubling of LP CVR is worth exactly as much as halving CPC and is usually far cheaper to achieve.

**benchmark:**

*Unbounce Conversion Benchmark Report, 2024 edition (41,000+ landing pages, 464M visitors, 57M conversions; page updated July 25, 2025; data described only as "the past year")* `[V]`.

**This is the only source in this entire corpus that publishes median and 75th percentile side by side, which makes it disproportionately valuable.**

| Industry | Median | 75th percentile |
|---|---|---|
| **SaaS** | **3.8%** | **11.6%** |
| Ecommerce | 4.2% | 11.4% |
| Travel & hospitality | 4.8% | 15.6% |
| Professional services | 6.1% | 14.1% |
| Legal | 6.3% | 13.1% |
| Financial services | 8.3% | 26.1% |
| Education | 8.4% | 20.0% |
| Entertainment | 12.3% | 40.8% |
| **All industries** | **6.6%** | — |

By traffic source (all industries): Email 19.3%, Instagram 17.9%, Facebook 13%, Paid social 12%, Google Search 11.3%, Paid search 10.9%, Bing 8%, YouTube 6 to 9%, TikTok 6 to 9%, **LinkedIn ~2.5%**.

SaaS by traffic source: Email 16.9%, Instagram paid 9.2%, Google paid 5.1%, Facebook paid 3.5%, Bing paid 1.9%, Display 0.3%.

Copy readability finding: 5th to 7th grade reading level converts at **12.9%** versus **2.1%** for professional-level copy; optimal length 250 to 725 words. Difficult multi-syllable words show a −24.3% correlation with conversion.

**The 3x median-to-75th-percentile spread is the most important number here.** Any "average landing page converts at X" claim without a distribution is close to useless.

**traps:**
- **Blended LP CVR mostly measures traffic mix.** Email at 19.3% and LinkedIn at 2.5% means a blended number moves when your channel mix moves, with no page change.
- **Unbounce's panel self-selects toward teams already running CRO,** which likely inflates every band.
- **Session vs visitor denominators differ by 20 to 40%** and are quoted interchangeably.
- **Bot traffic inflates the denominator and deflates CVR,** particularly on display and on programmatic.
- **Consent banners and tracking prevention cut measured conversions without cutting real ones.** A CVR decline can be pure measurement loss.
- **A CVR gain from removing form fields is often a quality loss downstream.** Measure to the stage that matters, not the form.

**related:** CPC, CPL, Visit-to-Lead Rate, Cost per Registration, CTR.

---

## 16. Visit-to-Lead Rate

**applies_to:** b2b primarily

**definition:** The share of website visitors who become identified leads, measured across the whole site rather than a single page.

**formula_variants:**
- `Leads / Unique Visitors` or `/ Sessions`
- **By channel**, which is mandatory
- **By first-touch channel vs last-touch channel**, which produce materially different pictures
- **Including or excluding phone calls**, which is a bigger deal than it sounds (see the source conflict below)

**inputs:** analytics plus CRM. Call tracking if phone is a real channel.

**application:** The bridge between traffic investment and pipeline. Determines whether a traffic problem or a conversion problem is capping lead volume.

**benchmark:**

**Two credible sources disagree by 4 to 10x, and it is a definitional problem, not a data problem.** Both are worth knowing.

*First Page Sage, B2B SaaS Funnel Conversion Benchmarks (published and updated June 11, 2025; "50+ B2B SaaS clients over the last decade," mostly $10M to $100M revenue)* `[V via agent]`:

| Channel | Visitor→Lead |
|---|---|
| LinkedIn | 2.2% |
| SEO | 2.1% |
| Email | 1.3% |
| Webinar | 0.9% |
| PPC | 0.7% |

By target customer size: Small ($1M-$10M) 2.3%, SMB ($10M-$100M) 1.4%, Mid-market ($100M-$1B) 1.2%, **Enterprise ($1B+) 0.7%.**

*Ruler Analytics Conversion Rate Benchmarks 2026 (published May 26, 2026; 110M+ sessions, 5M+ conversions, £33.8M tracked spend, 13 industries)* `[V]`:

Overall average **5.13%**. Software vertical **7.6%**. By channel (all industries): AI referral 5.8%, Paid search 5.4%, Email 4.9%, Organic search 4.9%, Referral 4.8%, Direct 4.7%, Social organic 2.23%, **Social paid 2.11%**.

Software vertical by channel: Paid search 8.2%, Organic search 7.9%, AI referral 7.9%, Direct 6.4%, Email 4.0%, Social paid 1.7%.

**How to reconcile:** Ruler counts *any tracked conversion event including inbound phone calls* (its product exists to track calls) over sessions, across a **UK-weighted** book skewing to local lead-gen verticals. First Page Sage counts marketing-qualifiable *leads* over visitors for US B2B SaaS. **Use First Page Sage's shape for B2B SaaS. Use Ruler's channel rank order as directional, not its levels.** Note also that Ruler's paid search outranking organic contradicts every other source here.

A widely-repeated "B2B SaaS converts at 1.1%, per Ruler Analytics" could not be verified on any Ruler page; their current report contains no 1.1% and no B2B SaaS row. **Treat it as a misattribution.**

**traps:**
- **Counting phone calls or not changes the number by several multiples.** Always ask what counts as a conversion before comparing.
- **Site-wide visit-to-lead is dominated by non-converting page types.** Blog traffic drags it down and tells you nothing about your demo page.
- **Enterprise-targeted sites convert worse by design** (0.7% vs 2.3% per First Page Sage), and that is a healthy sign, not a problem.
- **First Page Sage explicitly notes its figures assume "a high level of competence from the team or agency conducting the activity,"** which makes them best-case, not median.
- **Bot and scraper traffic in the denominator** has grown materially with AI crawlers.

**related:** Landing Page CVR, CPL, Funnel Cascade Rates, Organic vs Paid Split.

---

## 17. Funnel Cascade Rates (Lead → MQL → SQL → Opportunity → Closed-Won)

**applies_to:** b2b

**definition:** The stage-to-stage survival rates through the qualification funnel, whose product determines how many leads a customer costs.

**formula_variants:**
- Each stage: `Stage N+1 count / Stage N count`
- **Cohort-based** (track a lead cohort forward through time) versus **period-based** (this month's SQLs over this month's MQLs). Period-based is what most CRMs report by default and it is **wrong whenever volume is changing or the cycle is long**, because numerator and denominator come from different cohorts.
- **Compounded lead-to-close:** the product of all stages
- **Velocity-adjusted:** stage rate paired with median days-in-stage

**The stage definitions themselves are not standardized**, which is the deeper problem. Norwest measures **Lead→SQL directly, skipping MQL**, then **SQL→Opportunity→Proposal→Win**. First Page Sage uses **Lead→MQL→SQL→Opportunity→Close**. "Opportunity" sits at a different point in each. These are not comparable stages.

**inputs:** CRM stage history. Requires stage timestamps, not just current stage.

**application:** Converts CPL into cost per customer. Identifies which single stage is capping pipeline, which is almost always more actionable than the aggregate.

**benchmark:**

*First Page Sage by channel (published June 11, 2025; 50+ B2B SaaS clients)* `[V via agent]`:

| Stage | SEO | PPC | LinkedIn | Email | Webinar |
|---|---|---|---|---|---|
| Visitor→Lead | 2.1% | 0.7% | 2.2% | 1.3% | 0.9% |
| Lead→MQL | 41% | 36% | 38% | 43% | 44% |
| MQL→SQL | 51% | 26% | 30% | 46% | 39% |
| SQL→Opportunity | 49% | 38% | 41% | 48% | 42% |
| Opportunity→Close | 36% | 35% | 39% | 32% | 40% |

By target company size:

| Stage | Small $1-10M | SMB $10-100M | Mid-market $100M-1B | Enterprise $1B+ |
|---|---|---|---|---|
| Visitor→Lead | 2.3% | 1.4% | 1.2% | 0.7% |
| Lead→MQL | 37% | 41% | 40% | 34% |
| MQL→SQL | 32% | 39% | 39% | 40% |
| SQL→Opp | 40% | 42% | 46% | 36% |
| Opp→Close | 46% | 39% | 35% | 31% |

Compounded, the SEO path implies **3.7% lead-to-closed-won**, or roughly **27 leads per customer**.

*Norwest 2025 (independent survey, n=177, fielded August 2025)* `[V via agent]`:

| Stage | Mean | Median |
|---|---|---|
| Lead → SQL | ~37% | ~36% |
| SQL → Opportunity | ~41% | ~40% |
| Opportunity → Proposal | ~43% | ~42% |
| Proposal → Win | ~47% | ~45% |

Self-reported, and the report undermines its own precision: **41% could not state CPL and 45% could not state CAC.** Companies that *can* report clean stage conversion are systematically better instrumented, biasing these upward. A 47% proposal-to-win rate is far above CRM-derived datasets.

*Direction of travel, Ebsta x Pavilion 2024 B2B Sales Benchmarks (published February 2024; 4.2M opportunities, 530 companies, $54B revenue, 2023 data)* `[V via agent]`: win rates **−18% YoY (−27% vs 2021)**; sales cycles **+16% in H1 2023 (+38% vs 2021)** then −23% in H2; average deal values −21%; 69% of reps missed quota; 44% of deals slipped, and when they slipped, win rates fell 67%. This is Ebsta's own customer base, so use it for direction only, never absolute levels.

*Win rates for context, Ebsta/Pavilion 2025 GTM Benchmarks:* ~19 to 21% average B2B win rate; 76% of sellers missed quota in H1 2025 `[V via agent]`.

**traps:**
- **Period-based stage rates are wrong whenever volume changes.** This month's SQL/MQL ratio divides two different cohorts. With a 6-month cycle and growing spend, it understates conversion badly.
- **MQL definitions are not comparable across companies** (21% of Norwest respondents do not track MQLs at all).
- **Stage rates are gameable in both directions.** Tighten the MQL bar and MQL→SQL improves while lead→close is unchanged. Sales can also disqualify aggressively to protect their own conversion stats.
- **Compounding published stage rates from different sources produces nonsense**, because the stage boundaries do not line up.
- **First Page Sage's rates assume best-practice execution**, so they are a ceiling.

**related:** CPL, Cost per MQL/SQL/Opportunity, CAC, Visit-to-Lead, Attribution Window.

---

## 18. Install-to-Registration and the Mobile Funnel Cascade

**applies_to:** consumer (mobile)

**definition:** Stage-to-stage survival from install through registration, activation, trial, and paid, which converts a CPI into a cost per customer.

**formula_variants:**
- `Registrations / Installs`, `Trials / Registrations`, `Paid / Trials`
- **Time-boxed** (D1, D7, D30), which is mandatory; RevenueCat reports download-to-trial at D30 and download-to-paid at D35 specifically because untimed rates are not comparable
- **Cohort-based by install date**, not by event date
- **By paywall type** (hard paywall vs freemium), which changes everything
- Compounded: `Install → paid = Π(stage rates)`, and `Cost per paying customer = CPI / (install → paid)`

**inputs:** product analytics joined to install attribution. Billing system for the paid step.

**application:** Tells you whether a bad CPI is actually a bad funnel. Determines the maximum affordable CPI.

**benchmark:**

*RevenueCat State of Subscription Apps 2026 (115,000+ apps, $16B revenue, 1B+ transactions, data primarily 2025)* `[V]`:

| Metric | Median |
|---|---|
| Download → trial, D30 | **5.6%** (Business 9.1%, Gaming 4.4%; NA 7.1%, IN/SEA 3.0-3.7%) |
| Trial → paid, ≤4 day trial | 25.5% |
| Trial → paid, 5-9 day trial | 37.4% |
| Trial → paid, 17-32 day trial | 42.5% |
| Download → paid, D35, hard paywall | **10.7%** |
| Download → paid, D35, freemium | **2.1%** |

Hard paywalls convert roughly **5x better** download-to-paid than freemium.

*Prior edition for trend, RevenueCat 2025 (75,000 apps, 2024 data)* `[V]`: download-to-trial 6.2% median / 20.3% P90; **82% of trial starts occur the same day as install**; download-to-paid D35 hard paywall 12.11% / freemium 2.18%; trial-to-paid 45.7% median for 17-32 day trials.

**Install-to-registration specifically: NO SOURCED BENCHMARK FOUND.** RevenueCat measures download-to-trial and download-to-paid, not the registration step. To fill: AppsFlyer and Adjust funnel benchmark reports.

**The load-bearing implication:** at the 2026 median (5.6% download-to-trial, ~37% trial-to-paid on a mid-length trial), roughly **2.1% of downloads become payers**, so a paying customer costs about **48 installs**. At a $2.00 CPI that is a **$96 cost per paying customer** against a D60 revenue per download of $0.55 in North America. **Run this arithmetic before accepting any CPI benchmark as good or bad.**

**traps:**
- **The 82% same-day trial start finding means late-funnel events are nearly all early.** If your D30 trial rate materially exceeds your D1 rate, suspect a measurement or attribution artifact rather than a slow-burn funnel.
- **Untimed rates only go up** and cannot be compared across cohorts or against benchmarks.
- **Hard paywall and freemium blended into one number is a reporting error.** They are different products with a 5x gap.
- **Paid-acquired cohorts convert worse than organic cohorts** at every stage. Blending them makes paid look better than it is and makes organic look worse.
- **iOS post-ATT, the join between install source and downstream events is broken for non-consenting users,** so paid-cohort funnel rates on iOS are partially modeled.

**related:** CPI, Cost per Registration, Cost per Trial, Cost per Paying Customer, ROAS by day window, SKAN Coverage.

---

## 19. Demo Request Rate and Meeting-Booked Rate

**applies_to:** b2b

**definition:** The share of visitors who request a demo, and the share of demo requests that become a held meeting.

**formula_variants:**
- **Visitor → demo request:** `Demo requests / Visitors`
- **Form submit → meeting booked:** `Meetings scheduled / Qualified form submits`. A different metric with a different denominator.
- **Booked → held (show rate):** `Meetings held / Meetings booked`. The step most often omitted, and often a 20 to 30% loss.
- **Cost per held meeting:** `Spend / Meetings held`. The only version that maps to sales capacity.

**inputs:** form platform, scheduling tool (Chili Piper, RevenueHero, Calendly), CRM activity records.

**application:** The direct input to sales capacity planning. Determines whether a pipeline gap is a demand problem or a routing/qualification problem.

**benchmark:**

*RevenueHero, Demo Form Conversion Benchmarks (published April 8, 2026; "over one million inbound form submissions from B2B SaaS companies")* `[V via agent]`. This measures **qualified-to-booked**, not visitor-to-demo:

| Segment | Meeting rate | Disqualified |
|---|---|---|
| Median (all) | 62% | — |
| Top 10% | 78%+ | — |
| Best in class | 88% | — |
| SMB-focused | 63.2% | 21.8% |
| Mid-market | 61.2% | 28.1% |
| Enterprise | 70.1% | **71.2%** |

Seasonality: Q2 peak 61.0%, Q3 trough 55.9% (August 53.4%, September 53.7%).

**Caveat: this is RevenueHero's own platform data.** Companies buying inbound scheduling software have already invested in this step, so these are a ceiling, not a market median. No date range disclosed.

**Visitor-to-demo-request rate: NO SOURCED BENCHMARK FOUND.** Every result claiming "1.5 to 4% average, 8 to 15% top quartile" traces to unsourced AI-generated SEO pages. **The defensible substitute is Unbounce's SaaS landing page median of 3.8% with a 75th percentile of 11.6%**, which is a real distribution measuring approximately the same action.

**traps:**
- **The enterprise 71.2% disqualification rate is the finding**, not the 70.1% meeting rate. Most enterprise inbound is not enterprise.
- **Booked is not held.** Reporting booked meetings as a pipeline metric overstates by the no-show rate.
- **Instant routing and scheduling mechanically raise the booked rate** without raising demand. A tooling change reads as a demand-gen win.
- **Demo request rate is inversely related to qualification strictness.** Adding qualifying questions cuts requests and raises quality; reporting only the rate makes this look like a loss.

**related:** Landing Page CVR, Visit-to-Lead, CPL, Funnel Cascade Rates.

---

# PART 3: RETURN AND EFFICIENCY

## 20. ROAS (Platform-Reported) and Its Time Windows

**applies_to:** both, dominant in consumer

**definition:** Revenue attributed to ad spend divided by that spend, measured within a stated window, which is the most quoted and least trustworthy number in this family.

**formula_variants:**

| Variant | Formula | When it is right |
|---|---|---|
| Platform ROAS | `Platform-attributed revenue / Spend` | Within-platform optimization only. Self-graded. |
| D0 / D1 / D7 / D30 / D90 / D180 ROAS | `Revenue from a spend cohort by day N / Spend` | The correct framing for subscription and any delayed-revenue model. Anchored to *cohort acquisition date*, not calendar date. |
| Blended ROAS | `Total revenue / Total ad spend` | Business level. Same object as MER. |
| Net revenue ROAS | Deducts returns, refunds, chargebacks, store commission | Mandatory for app subscriptions, where Apple/Google take 15 to 30%. |
| Contribution ROAS | `Contribution margin / Spend` | The only version tied to profit. See Metric 24. |
| iROAS | `Incremental revenue / Spend` | The only causally honest version. See Metric 27. |
| Predicted ROAS (pROAS) | Modeled LTV / Spend | Needed when payback exceeds your decision cycle. Only as good as the model. |

**Industry has NO consensus** on whether ROAS is gross or net of refunds and store fees, or on the window. A D7 ROAS and a D30 ROAS on the same campaign differ by multiples, and both get quoted as "ROAS."

**inputs:** platform-attributed revenue (for platform ROAS), your billing system (for blended and net), MMP (for mobile cohorts), an experiment or MMM (for iROAS).

**application:** In-platform bidding target. At the D-window level, it is the readout on whether a cohort will pay back. The *shape* of the ROAS curve across D0 to D180 is more informative than any single point.

**benchmark:**

*Ecommerce, Skai Q1 2026 (published April 2026)*: **retail media ROAS $6.00, steady for a fifth consecutive quarter** `[V via agent]`.

*Meta ecommerce, Triple Whale (~35,000 brands, 2025 data)*: median **ROAS 1.86x**, CTR 2.19%, CPM $14.19 `[S, via aggregator]`. **Flagged: the aggregator that surfaced this (paceads.com) was independently assessed as low-quality. Verify against Triple Whale directly before use.**

*B2B SaaS Google Ads, 42 Agency (B2B client data 2022-2026)*: Search ROAS **553%**, Performance Max **436%** `[V via agent]`.

**The critical benchmark for this metric is not a ROAS level, it is the gap between platform ROAS and incremental ROAS.** See Metrics 26 and 27. Common Thread Collective's July 2, 2026 analysis shows a worked case where **Meta platform ROAS of 3.2x normalized to 3.7x iROAS while Google platform ROAS of 12.5x normalized to 3.1x iROAS** `[V]`. Ranking channels on platform ROAS would have produced exactly the wrong budget decision.

**traps:**
- **Platform ROAS is self-attributed and self-serving.** Meta grades Meta. See Metric 26 for the mechanism and Metric 27 for the magnitude.
- **The window is a hidden variable.** Meta's Ads Insights API **removed the 7-day-view and 28-day-view windows effective January 12, 2026** (announced October 16, 2025), keeping 1-day click, 7-day click, 28-day click, 1-day engaged view, and 1-day view `[V, Meta developers blog]`. Any ROAS series spanning that date has a structural break that is a measurement change, not a performance change.
- **Calendar-period ROAS and cohort ROAS are different objects.** "March ROAS" using March revenue over March spend attributes revenue from February cohorts to March spend. In a growing account this overstates; in a shrinking one it understates.
- **Gross ROAS ignores store commission and refunds.** A 2.0x gross ROAS on an iOS subscription with a 30% Apple cut and 10% refunds is a 1.26x net ROAS.
- **ROAS is not profit.** A 3.0x ROAS at 25% contribution margin loses money.
- **ROAS improves when you shrink to your best audience,** which is why a rising ROAS with falling spend is not a win.
- **pROAS models trained on pre-ATT data are stale.** The relationship between early signals and realized LTV shifted.

**related:** MER, aMER, Contribution ROAS, iROAS, CAC, Marginal ROAS, Attribution Window.

---

## 21. MER (Marketing Efficiency Ratio)

**applies_to:** both, dominant in consumer/DTC

**definition:** Total business revenue divided by total marketing spend in the same period, which deliberately ignores attribution entirely.

**formula_variants:**
- **MER** = `Total Revenue / Total Marketing Spend` `[V, Common Thread Collective, March 29, 2022]`
- **Inverse form (blended ACoS / marketing cost ratio)** = `Total Marketing Spend / Total Revenue`. Same information, and the form most finance teams prefer.
- **Scope disagreement, and it is real:** Common Thread Collective's definition includes "Facebook, Google, agency fees, influencers, podcasts," so working media plus agency plus creator costs. Others use paid media only. **A MER computed on media-only and one computed on all-in marketing are not comparable and are both called MER.**
- **Breakeven MER** = `1 / Contribution Margin %`. At 30% CM, breakeven MER is 3.3x; at 40%, 2.5x `[V, Eightx, June 1, 2026]`.

**inputs:** total revenue from the commerce or billing system; total spend from ad platforms plus finance. **No attribution system required, which is the entire point.**

**application:** The board-level efficiency number. Immune to attribution error by construction, which makes it the right control metric when platform numbers are in dispute. Its counterpart weakness is that it cannot allocate.

**benchmark:**

*DTC by revenue band, Eightx (published June 1, 2026, by Matt Putra; attributed to "Eightx 2026 DTC ad-spend index plus Ad Library DTC Guide 2026," i.e. the firm's own proprietary index)* `[V]`:

| Revenue band | MER |
|---|---|
| $1M to $5M | 1.5 to 2.5x |
| $5M to $10M | 2.5 to 3.5x |
| $10M to $25M | 3.0 to 4.5x |
| $25M to $100M | 3.5 to 6.0x+ |
| Subscription / high-LTV | 1.5 to 2.5x (defended via LTV cohorts) |
| General 2026 | 3x to 5x most verticals; mature subscription above 6x |

**Note the structural point hiding in that table:** MER rises with revenue scale not because larger brands buy media better, but because a larger share of their revenue is repeat and organic, which sits in the numerator without corresponding spend in the denominator. **MER improvement can be entirely a base-effect and say nothing about media efficiency.** That is precisely why aMER exists.

*Common Thread Collective (March 29, 2022)* `[V]`: at 70% gross margins, identifies a **1.5 marginal aMER and 2.0 blended aMER** as breakeven targets, and explicitly frames these as situational rather than universal.

**traps:**
- **MER cannot allocate.** It tells you total efficiency and nothing about which channel to cut. Using it as a channel decision tool is the most common misuse.
- **MER improves when organic and repeat revenue grow,** which is not a media result. In a mature business most of the numerator is not media-driven at all.
- **Scope ambiguity (media-only vs all-in) makes cross-company MER comparison unreliable.** Always state the scope.
- **MER lags spend changes** by the length of your purchase cycle, so a spend increase looks bad before it looks good.
- **MER without contribution margin is meaningless.** A 3.0x MER is excellent at 70% CM and insolvent at 20%.
- **Seasonality wrecks period-over-period MER.** Q4 revenue and Q4 CPM both spike; the ratio moves for reasons unrelated to management action.

**related:** aMER, Contribution ROAS, Blended ROAS, Blended CAC, Marginal aMER.

---

## 22. aMER (Acquisition Marketing Efficiency Ratio)

**applies_to:** both

**definition:** New-customer revenue divided by total marketing spend, which strips repeat revenue out of MER's numerator so the ratio actually measures acquisition.

**formula_variants:**
- **aMER** = `New Customer Revenue / Total Ad Spend` `[V, Common Thread Collective, March 29, 2022]`
- **Blended aMER:** the mean across total spend
- **Marginal aMER** = `Marginal Acquired Revenue / Marginal Ad Spend`. CTC's stated formula, and the version that answers scaling questions.
- **Full-cohort aMER:** new-customer revenue over a defined LTV horizon (D90, D365) divided by acquisition spend. Different from first-order aMER by the repeat rate.

**Industry has NO consensus definition of aMER.** CTC's is the canonical one, but competing versions define it as new-customer revenue over *acquisition-only* spend rather than total spend, which produces a materially higher number. Some use first-order revenue only, some use cohort LTV. **Always state which.**

**inputs:** new-vs-returning customer flag from the commerce/billing system (this is the hard part and most teams get it wrong across guest checkout, multiple emails, and app-vs-web accounts). Total spend from platforms plus finance.

**application:** The honest scaling metric at the business level. Because it uses total spend in the denominator and new-customer revenue in the numerator, it charges retention spend against acquisition results, which is deliberately conservative and prevents the base-effect flattery in MER.

**benchmark:** *Common Thread Collective (March 29, 2022)* `[V]`: at 70% gross margins, **1.5 marginal aMER and 2.0 blended aMER** as breakeven, explicitly situational.

Beyond that: **NO SOURCED BENCHMARK FOUND.** aMER is a practitioner construct without a benchmark literature, largely because the new-customer definition is not standardized.

**traps:**
- **"New customer" is definitionally slippery.** Guest checkout, multiple emails, and a customer who bought two years ago all create classification ambiguity that moves aMER by several points.
- **Charging retention spend against acquisition revenue** (CTC's version) makes aMER structurally worse as your retention program grows, which is correct as a conservatism but wrong if read as declining acquisition efficiency.
- **Blended aMER cannot answer "should I spend more."** Only marginal aMER can, and marginal aMER requires either a spend change to observe or an experiment to estimate.
- **aMER is still attribution-free, so it inherits MER's inability to allocate.** It tells you whether the whole machine is efficient, not which part.

**related:** MER, Contribution ROAS, Marginal CAC, New vs Returning Customer Split, Blended CAC.

---

## 23. Blended ROAS

**applies_to:** both

**definition:** Total revenue over total ad spend, computed at the business level rather than per channel.

**formula_variants:**
- `Total Revenue / Total Ad Spend`. **Arithmetically identical to MER** when MER's scope is media-only.
- **Blended paid ROAS:** total revenue over paid media spend only, excluding agency and tooling.
- **Channel-blended ROAS:** revenue attributed across all paid channels over total paid spend. Different object, and this one *does* depend on attribution.

**The term is used for at least three different calculations.** When someone says "blended ROAS," ask whether the numerator is total revenue or attributed revenue, and whether the denominator is media-only or all-in.

**inputs:** billing system for revenue, platforms plus finance for spend.

**application:** A sanity check against the sum of platform-reported ROAS. **When the sum of platform-claimed revenue exceeds total actual revenue, blended ROAS is what proves it.** This diagnostic is the fastest way to size your attribution over-claim without running an experiment.

**benchmark:** See MER (Metric 21). The figures are the same object under a different name.

**traps:**
- **Blended ROAS and MER get quoted as if they are different metrics that corroborate each other.** They are the same calculation.
- **It falls when organic falls,** with no media change.
- **It cannot distinguish a channel that is working from one that is being credited for organic demand.**
- **The most common error is comparing blended ROAS to a platform ROAS target.** A 5.0x Meta ROAS target and a 2.5x blended ROAS are not in conflict; they are measuring different denominators against different numerators.

**related:** MER, aMER, ROAS, Attribution Gap Ratio.

---

## 24. Contribution ROAS / Contribution-Margin-Adjusted Efficiency

**applies_to:** both

**definition:** Efficiency measured against contribution margin rather than revenue, which is the only version that answers whether the spend made money.

**formula_variants:**
- **Contribution ROAS** = `Contribution Margin / Ad Spend` where CM = revenue minus COGS, payment processing, shipping/fulfillment, store commission, and refunds
- **Contribution margin after marketing (CMAM / CM3)** = `Contribution Margin − Ad Spend`. A dollar figure, not a ratio, and the one that actually funds the business.
- **Breakeven ROAS** = `1 / Contribution Margin %`
- **Breakeven MER** = `1 / Contribution Margin %` `[V, Eightx, June 1, 2026]`
- **Marginal contribution:** CTC's framing is that when **marginal contribution margin falls below $0, spend stops being profit-producing**, which is the actual stopping rule `[V, CTC, March 29, 2022]`

**Industry has NO consensus on what belongs in "contribution."** Some include fulfillment and returns, some do not. Some include variable marketing tooling. App businesses may or may not net out the 15 to 30% store commission. **A contribution ROAS is uninterpretable without its cost stack stated.**

**inputs:** unit economics from finance (COGS, fulfillment, processing, refund rate, store fees) joined to revenue and spend. This is the metric most often blocked by finance not having per-order margin available.

**application:** The stopping rule for spend. Sets the true breakeven that ROAS targets should be derived from rather than guessed at.

**benchmark:** **NO SOURCED BENCHMARK FOUND for contribution ROAS levels**, and correctly so, since the target is a direct function of your own margin structure. The sourced *rule* is the useful output:

| Contribution margin | Breakeven MER / ROAS |
|---|---|
| 20% | 5.0x |
| 30% | 3.3x |
| 40% | 2.5x |
| 70% | ~1.43x |

Source: Eightx (June 1, 2026) `[V]` for the 30% and 40% cases; CTC (March 29, 2022) `[V]` for the 70% gross margin case landing near a 1.5 marginal aMER breakeven.

**traps:**
- **Using gross margin as a proxy for contribution margin overstates profitability**, sometimes badly, because it omits fulfillment, processing, and returns.
- **App businesses that forget the store commission** are running a 15 to 30% error in their breakeven.
- **Contribution margin varies by product mix,** so a blended CM applied to a campaign selling only the low-margin SKU produces a wrong breakeven.
- **First-order contribution ignores repeat purchase,** which is correct for a cash-constrained business and wrong for a subscription business. State the horizon.
- **A positive contribution ROAS at the average can coexist with a negative marginal contribution.** The average tells you the portfolio is profitable; only the marginal tells you whether the *next* dollar is.

**related:** MER, aMER, ROAS, Marginal CAC. Cross-family: Gross Margin, LTV, Payback Period.

---

# PART 4: ATTRIBUTION AND CAUSALITY

## 25. Attribution Model (Last Click, First Touch, Linear, Time Decay, Position-Based, Data-Driven)

**applies_to:** both

**definition:** The rule that assigns credit for a conversion across the touchpoints that preceded it, which is a modeling choice rather than a measurement.

**formula_variants:**

| Model | Rule | When it is defensible |
|---|---|---|
| Last click / last non-direct | 100% to the final click | Short cycles, single-touch purchases. Systematically over-credits capture channels (brand search, retargeting, email). |
| First touch / first click | 100% to the first interaction | Demand-creation questions. Over-credits top-of-funnel and ignores everything that closed the deal. |
| Linear | Equal split across all touches | When you have no information about relative influence, which is an admission, not an insight. |
| Time decay | Exponentially more credit to recent touches | Long cycles where recency genuinely predicts influence. The half-life is an arbitrary parameter. |
| Position-based (U-shaped) | Typically 40/20/40 first/middle/last | Convention. The weights are chosen, not estimated. |
| W-shaped / full-path | Adds lead-creation and opportunity-creation milestones | B2B with defined CRM stages. Still arbitrary weights. |
| Data-driven (DDA) | Algorithmic credit from observed path differences between converters and non-converters | The best of the rules-based family, but proprietary and unauditable. |

**The critical framing: every one of these is a bookkeeping convention for splitting a fixed total, not a causal estimate.** None of them can tell you what would have happened without the ad. That is what Part 4's later metrics are for.

**Platform state as of this research:**
- **Google retired first click, linear, time decay, and position-based** from Google Ads and GA4. New conversion actions lost them in GA4 in **May 2023** and Google Ads in **June 2023**; existing actions were auto-switched to DDA from **September 2023**; full retirement across both products in **mid-October 2023** `[S, multiple sources including Search Engine Land]`. **Only last click and data-driven remain**, with DDA the default.
- **Google DDA eligibility:** "All conversion actions are eligible for data-driven attribution (DDA), regardless of conversion or interaction volume." Google recommends **at least 200 conversions and 2,000 ad interactions in supported networks within a 30-day period** for good performance, and states DDA "will still function with less data" `[V, Google Ads Help]`.

**inputs:** touchpoint-level path data. Requires either the platform's own graph or a warehouse-level identity join.

**application:** Determines the reported credit split that drives budget allocation. **Its real application should be narrower: as a sensitivity analysis.** Running the same period under first-touch and last-touch and observing the spread tells you how much of your allocation is a modeling artifact.

**benchmark:** **NO SOURCED BENCHMARK FOUND, and the concept does not apply.** There is no "good" attribution model. The relevant evidence is that all of them are biased relative to experiments (Metric 27).

**traps:**
- **Model choice is a budget decision disguised as a reporting decision.** Switching last-click to first-touch can move 30%+ of credit between channels with zero change in reality. Whoever picks the model picks the winner.
- **DDA is unauditable.** Google will not disclose the model, so you cannot validate it, and it is trained on Google's own data with Google's own incentives.
- **DDA below the recommended volume is fitting noise,** and Google will still run it because all actions are "eligible."
- **Every model splits a total that is itself wrong.** If platform-claimed conversions exceed actual conversions (Metric 26), redistributing that inflated total more cleverly does not help.
- **Cross-device and cross-platform paths are invisible to any single platform's model,** so "full path" is never full.
- **A model change mid-series produces a fake trend.** Google's October 2023 retirement created exactly this for anyone who had been on position-based.

**related:** Attribution Window, View-Through Conversions, Attribution Gap Ratio, MMM, iROAS.

---

## 26. Attribution Window (Lookback) and the Self-Attribution Problem

**applies_to:** both

**definition:** The elapsed time after an ad interaction during which a conversion is credited to it, and, because each platform sets its own, the mechanism by which the same conversion gets sold to you several times.

**formula_variants:**
- **Click-through window:** 1-day, 7-day, 28-day click
- **View-through window:** 1-day view (see Metric 28)
- **Engaged-view:** a view meeting a duration threshold, treated as an intermediate between view and click
- **Combined setting:** e.g. Meta's default 7-day click and 1-day view
- **Attribution setting vs reporting window:** the setting determines optimization; the reporting window determines what appears in a date-range pull. Confusing the two is endemic.

**Current platform state, verified:**
- **Meta Ads Insights API removed the 7-day view (`7d_view`) and 28-day view (`28d_view`) attribution windows effective January 12, 2026.** Remaining: "1-day click, 7-day click, 28-day click, 1-day engaged view, and 1-day view will continue to be available (in addition to default values based on advertisers' attribution settings)." Announced October 16, 2025 `[V, Meta developers blog]`. The same update limited **frequency breakdowns to 6 months** and **unique-count and hourly breakdowns to 13 months** of history, while total values remain available for 37 months.
- Meta's 28-day click window was removed for standard advertisers in **April 2021** following iOS 14.5 and ATT enforcement `[S]`.

**The self-attribution mechanism, which is the core concept here:**

Meta, Google, TikTok, Snap, and Apple Search Ads are **self-attributing networks (SANs)**. Each one measures conversions using its own first-party data, applies its own window, and **does not coordinate with any other network.** The consequence is arithmetic, not conspiratorial: a user who sees a Meta ad Monday, clicks a Google ad Thursday, and buys Sunday is claimed by Meta under 7-day-click/1-day-view and by Google under its own window. **Both report one conversion. One conversion happened.**

The practical signature: platform-claimed conversions summed across networks routinely exceed the total your billing system recorded. An MMP or a warehouse model applies one consistent logic across networks and deduplicates, which is why MMP-attributed installs are always fewer than the sum of SAN-attributed installs `[S, multiple MMP and attribution vendor sources]`.

**inputs:** platform reporting at each window (pull the same period at 1d-click, 7d-click, and default to see the spread), MMP or warehouse for the deduplicated view, billing system for the true total.

**application:** **The single fastest attribution diagnostic available: sum platform-claimed conversions, divide by actual conversions from your billing system. Anything materially above 1.0 is your over-claim ratio, and it costs nothing to compute.**

**benchmark:** **NO SOURCED BENCHMARK FOUND for a typical over-claim magnitude across platforms.** I could not locate a published, methodologically transparent study quantifying aggregate SAN over-claim, which is a genuine gap in the literature rather than an oversight in this research.

What is sourced is the *impact of window changes*: one industry analysis of the January 2026 Meta change reports that **advertisers using the 7-day view window saw a 15 to 30% drop in attributed conversions overnight, and those on 28-day view lost 30 to 40%** `[S, Dataslayer, January 19, 2026 — the author's own observation, not a Meta statement]`. Treat as directional.

**traps:**
- **Longer windows always report better performance,** because they capture more coincidental conversions. An agency that quietly moves you from 1-day-click to 7-day-click delivers an instant "improvement."
- **Window changes create structural breaks that look like performance changes.** Any Meta series crossing January 12, 2026 or April 2021 has one.
- **Attribution setting drives optimization, not just reporting.** Changing it changes who the algorithm targets, so it is not a reporting-only decision.
- **B2B windows are catastrophically short relative to B2B cycles.** Norwest reports 9 to 12 month average cycles above $500K ACV. **A 90-day lookback captures roughly a quarter of an enterprise buying cycle.** I found **no published benchmark on appropriate B2B attribution lookback windows**, which appears to be genuinely unaddressed in the literature.
- **Retargeting is the primary beneficiary of generous windows,** since it deliberately touches people already on a purchase path.

**related:** Attribution Model, View-Through Conversions, Attribution Gap Ratio, iROAS, Modeled Conversions.

---

## 27. Attribution Gap Ratio (Incrementality Multiplier)

**applies_to:** both

**definition:** Platform-reported conversions or revenue divided by incrementally measured conversions or revenue, which quantifies exactly how much of your reported performance is causal and how much is bookkeeping.

**formula_variants:**
- **Gap ratio** = `Platform-reported conversions / Incrementally-measured conversions`
- **Incrementality rate** = `Incremental conversions / Platform-reported conversions` (the inverse; a "40% incrementality rate" means 60% of claimed conversions would have happened anyway)
- **Scaling factor / normalization coefficient** = the multiplier applied to platform numbers to bring them onto a common causal basis, used to make cross-channel platform ROAS comparable
- **Over-claim ratio** = `Σ(platform-claimed conversions across all networks) / Actual conversions`. Distinct from the gap ratio: this one measures double-counting, the gap ratio measures non-causality. **Both are happening simultaneously.**

**inputs:** platform reporting for the numerator; a geo holdout, conversion lift study, ghost-ad experiment, or calibrated MMM for the denominator.

**application:** **This is the metric that fixes channel allocation.** Applying channel-specific gap ratios to platform ROAS before comparing channels is the difference between a correct and an inverted budget decision.

**benchmark:**

**The strongest evidence available is academic, and it is devastating for platform-reported numbers.**

*Gordon, Moakler & Zettelmeyer, "Close Enough? A Large-Scale Exploration of Non-Experimental Approaches to Advertising Measurement," September 21, 2022 (arXiv 2201.07055v2; published Marketing Science 42(4):768-793, 2023). 663 ad experiments at Facebook, November 2019 to March 2020, ~7.9 billion user-experiment observations, 38+ billion ad impressions, with access to over 5,000 user-level features* `[V, read directly from the paper]`:

| Funnel stage | Median RCT lift (truth) | Median lift, DML | Median lift, SPSM |
|---|---|---|---|
| Upper funnel | 29% | 83% | 173% |
| Middle funnel | 18% | 58% | 176% |
| Lower funnel | **5%** | **24%** | **64%** |

**Read the bottom row twice.** At the lower funnel, which is where you optimize and where the money is, the best non-experimental method overstated lift by roughly **4.8x** and the weaker one by roughly **12.8x**. The authors' own conclusion: "despite having access to large-scale experiments and rich user-level data, we are unable to reliably estimate an ad campaign's causal effect." **These researchers had better data than you will ever have, including 5,000+ user-level features from inside Meta, and still could not recover the experimental answer.**

*Gordon, Zettelmeyer, Bhargava & Chapsky, "A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook," Marketing Science 38(2):193-225, 2019. 15 US experiments, 500 million user-experiment observations, 1.6 billion impressions* `[V, read directly]`: "Generally, the observational methods overestimate ad effectiveness relative to the RCT, although in some cases they significantly underestimate effectiveness. The bias can be large: **in half of our studies, the estimated percentage increase in purchase outcomes is off by a factor of three across all methods.**"

*Blake, Nosko & Tadelis, "Consumer Heterogeneity and Paid Search Effectiveness: A Large Scale Field Experiment," NBER WP 20171 (May 2014), published Econometrica 83(1), 2015. Randomized field experiment at eBay* `[V via agent]`: **brand-keyword ads showed no measurable short-term benefit.** For non-brand, new and infrequent users responded, but frequent users who would have converted anyway accounted for most of the spend, producing **negative average returns**. "Returns from paid search are a fraction of conventional non-experimental estimates."

*Practitioner-side, DTC. Stella, "2025 DTC Digital Advertising Incrementality Benchmarks" (published May 26, 2026; 225 geo-based incrementality tests, August 2024 to December 2025; DTC brands, 90% Shopify, US markets; 88.4% of tests significant at 90%+ confidence)* `[V]`:

| Channel | Median iROAS | N | IQR |
|---|---|---|---|
| Tatari CTV | 3.30x | 18 | 2.18x - 4.21x |
| Google Performance Max | 2.98x | — | — |
| Pinterest | 2.96x | 3 | — |
| Meta | 2.92x | 63 | 2.25x - 3.30x |
| Google YouTube | 2.17x | — | — |
| Google Shopping | 1.86x | — | — |
| Google Search non-brand | 1.46x | — | — |
| TikTok | 0.94x | 10 | 0.56x - 1.31x |
| **Google Search branded** | **0.70x** | — | — |
| **All 225 tests** | **2.31x** (mean 2.52x) | 225 | 1.36x - 3.24x |

83.1% of tests came in above 1.0x iROAS. Stella states the platform-to-incremental gap "often reaches 2-3x, with some channels (particularly branded search and retargeting) showing 5-10x inflation."

*Second practitioner dataset, Common Thread Collective, "The Measurement Gap" (published July 2, 2026; CTC proprietary database)* `[V]`:

| Channel | Median iROAS |
|---|---|
| Facebook acquisition | 1.14x |
| YouTube | 1.10x |
| Google Ads non-brand | 0.67x |
| Facebook non-acquisition | 0.60x |
| **Google branded search** | **0.27x** |

Worked normalization example from the same source: **Meta platform ROAS 3.2x → 3.7x iROAS; Google platform ROAS 12.5x → 3.1x iROAS.** Google's reported performance overstated its incremental value by roughly 4x relative to Meta. On platform numbers Google looks nearly 4x better than Meta; on incremental numbers Meta is slightly better.

**Two independent DTC datasets, with different methodologies and non-overlapping samples, both place branded search below 1.0x iROAS.** Stella at 0.70x, CTC at 0.27x. The levels differ substantially (CTC's whole scale runs lower, suggesting a stricter counterfactual), but the rank order and the sub-breakeven finding agree, and both agree with the eBay experiment from a decade earlier.

**traps:**
- **Gap ratios are channel-specific, account-specific, and time-varying.** Applying Stella's 2.92x Meta median to your account is a planning heuristic, not a measurement. Run your own test.
- **Both vendor datasets are self-selected.** Stella's are Stella's platform users; CTC's are CTC's clients. Brands that buy incrementality testing suspect they have a problem.
- **Over-claim (double counting) and non-incrementality are different failures** and both are present. Fixing attribution dedup does not fix incrementality, and vice versa.
- **The gap is largest exactly where the money is.** Gordon 2022 shows bias worsens as you move down funnel. The conversions you optimize to are the least reliable ones.
- **A gap ratio measured once decays.** Creative, audience, competitive intensity, and saturation all move it.
- **Do not conclude "branded search is always waste" from these figures.** INCRMNTAL's customer cases show branded search incremental in some markets and not in others, driven by competitive intensity and brand maturity `[V]`. In a category where competitors bid on your name, defensive brand spend can be incremental. **The point is that you cannot know without testing, and platform reporting will always say it is your best channel.**

**related:** iROAS, Incremental Lift, Geo Holdout, MMM, ROAS, Attribution Window, Brand vs Non-Brand Split.

---

## 28. Incremental Lift and iROAS (Experimentally Measured)

**applies_to:** both

**definition:** The difference in outcomes between an exposed group and a valid control group, which is the only definition of advertising effect that survives scrutiny.

**formula_variants:**
- **Absolute lift** = `Conversions(treatment) − Conversions(control)`, scaled for group size
- **Relative lift %** = `(Rate_treatment − Rate_control) / Rate_control`
- **iROAS** = `Incremental revenue / Incremental spend`
- **CPIC (cost per incremental conversion)** = `Incremental spend / Incremental conversions`. Meta's GeoLift uses CPIC as a power-analysis input to size the budget a well-powered test requires `[V]`.
- **Incremental lift on a lift study:** platform-run (Meta Conversion Lift, Google Brand Lift/Search Lift) versus advertiser-run (geo holdout). **Platform-run lift studies are graded by the platform being tested**, which is a weaker design than an advertiser-controlled geo test even when the underlying method is sound.

**Control group construction, ordered by methodological quality:**

| Design | How it works | Weakness |
|---|---|---|
| **Ghost ads** | Log which control users *would have* won the auction for; compare against matched exposed users | Requires platform cooperation. Not available to advertisers directly. |
| **Geo holdout / synthetic control** | Withhold spend in matched markets, compare against a synthetic counterfactual | Geo-level noise; needs meaningful budget and duration |
| **Intent-based holdout** | Withhold ads from a share of branded queries or a user segment | Only works where you can partition delivery |
| **PSA / placebo ads** | Serve control users an unrelated public-service ad | **Selection bias: the users who would have seen your ad are not the users who saw the PSA**, because the auction and delivery algorithm select differently for different creatives. Also costs real money to serve control impressions. |

**Ghost ads are methodologically superior to PSA tests** precisely because they identify the counterfactual-exposed population without serving them anything, which removes both the selection problem and the cost of control media. (Johnson, Lewis & Nubbemeyer's ghost-ads paper is the standard reference; I was unable to retrieve it directly, so I am not citing quantitative claims from it.)

**inputs:** a holdout design, sufficient spend and duration for power, clean geo or segment revenue data, and a pre-period long enough to fit the counterfactual.

**application:** The ground truth that calibrates everything else, including MMM priors and platform-number normalization.

**benchmark:** See Metric 27 for the Stella and CTC iROAS tables by channel, which are the best available.

*Test-design quality, Recast open-source geo-experiment simulation study (published June 2026; 32,000 model runs across 4 tools, 4 scenarios, 7.5% true lift and null conditions, 1,000 iterations per cell)* `[V]`:

| Tool | Coverage (95% target) | False positive rate | False negative rate | Bias |
|---|---|---|---|---|
| **Meta GeoLift** | **92-95%** | **3-5%** | 89-96% | +0.22 to +3.22 pp |
| Google Matched Markets | 76-86% | 14-19% | 47-66% | +1.03 to +3.30 pp |
| CausalPy (standardized) | 76-82% | 18-25% | 63-66% | −0.57 to −1.05 pp |
| Causal Impact | 70-72% | **28-30%** | 34-48% | +1.87 to +4.21 pp |

**The tradeoff is stark and worth internalizing.** Meta GeoLift is the most trustworthy when it declares a win (3-5% false positives) and the most likely to declare nothing at all (89-96% false negatives at a 7.5% true effect). Causal Impact will find an effect for you almost every time, and roughly three in ten of those are noise. With only a 30-day pre-period, GeoLift maintained 95.7% coverage but returned inconclusive results in 95.7% of runs.

Note the study tested 15-day post-periods only and offers **no minimum test duration recommendation.**

**traps:**
- **Underpowered tests are worse than no test,** because a null result reads as "the channel does not work" when it actually means "the test could not have detected it." Run the power analysis first and refuse to run tests that cannot detect an effect you would act on.
- **PSA tests are systematically biased upward** by delivery selection. Prefer ghost ads or geo.
- **Geo tests leak.** Media spills across DMA lines, especially on CTV and national platforms, which biases the estimate toward zero.
- **Contamination from other campaigns** running in holdout geos destroys the design. Holdouts must hold out *all* of the channel, not one campaign.
- **Short tests miss delayed conversion.** A 2-week geo test on a product with a 6-week consideration cycle measures a fraction of the effect.
- **One test is a point estimate at one spend level, one season, and one creative.** iROAS is not a constant; it declines with spend (Metric 30).
- **Choosing your tool after seeing the result** is p-hacking. The Recast study shows tool choice alone can flip a conclusion.
- **Platform-run lift studies test the platform's own hypothesis with the platform's own data.** Useful, but not independent.

**related:** Attribution Gap Ratio, iROAS, Geo Holdout, MMM, Marginal ROAS.

---

## 29. MMM (Media Mix Modeling) Channel Contribution

**applies_to:** both, viable only above meaningful spend

**definition:** A regression-based estimate of each channel's contribution to a business outcome, built from aggregate time-series data rather than user-level tracking.

**formula_variants:**
- **Core form:** `Revenue_t = Base_t + Σ_channels f(Spend_c,t) + Controls_t + ε`
- **Adstock / carryover:** geometric or Weibull decay applied to spend before it enters the model, capturing delayed effect
- **Saturation transform:** Hill function, logistic, or power (`y = a·x^B`, 0 < B ≤ 1) applied to capture diminishing returns `[V, Recast, May 10, 2023]`
- **Bayesian MMM with experiment calibration:** experimental lift results enter as priors or constraints on channel coefficients. **This is the current state of the art and the only version I would trust for budget decisions.**
- **Geo-hierarchical MMM:** uses geographic variation as additional identifying variation, which materially improves identification over national-only time series

**Current tooling:**
- **Google Meridian** (successor to LightweightMMM): Bayesian, supports reach and frequency modeling, geo-level analysis, organic media and non-media variables like pricing, and **calibration with incrementality experiments** `[S, Search Engine Land and vendor documentation]`
- **Meta Robyn:** open-source, supports calibration by feeding geo-holdout or Conversion Lift results as constraints on channel contribution estimates `[S]`
- Commercial: Recast, Prescient AI, Measured, and others

**inputs:** 2 to 3 years of weekly spend and outcome data by channel, ideally by geo. Plus price, promotion, distribution, seasonality, and competitive controls. **Insufficient historical variation in spend is the most common reason an MMM cannot be identified.**

**application:** Allocates budget across channels including ones with no click path (CTV, radio, OOH, podcast). Produces response curves that answer marginal questions. Immune to cookie loss and ATT by construction, which is why it returned.

**benchmark:** **NO SOURCED BENCHMARK FOUND for MMM output levels**, and none should exist, since MMM produces business-specific coefficients. Model *quality* metrics (MAPE, R², out-of-sample error) are the right things to benchmark, and Stella's incrementality data offers a useful adjacent finding: tests with **MAPE below 0.15 and R² between 0.85 and 0.94 (N=39, 17.3% of tests) achieved a 100% statistical significance rate** `[V]`, which is a reasonable fit-quality bar to carry into geo-based modeling generally.

**traps:**
- **Collinearity between channels that are always scaled together** makes their individual contributions unidentifiable. The model will still report a split, confidently, and it will be arbitrary.
- **Insufficient spend variation means nothing is identified.** If you have spent $50K/week on Meta for two years, no model can tell you what $75K/week would do.
- **Adstock and saturation misspecification silently changes the answer.** These are assumptions, not estimates, in most implementations.
- **An uncalibrated MMM is an opinion with a confidence interval.** Calibrating against geo experiments is what converts it into a measurement. Meridian and Robyn both support this and most implementations skip it.
- **MMM cannot resolve within-channel questions.** It will not tell you which Meta campaign to cut.
- **MMM latency (weeks to rebuild) makes it unsuitable for tactical decisions,** which is why it complements rather than replaces experiments.
- **Vendor MMMs are validated by the vendor.** Ask for out-of-sample holdout performance and experiment calibration results, not in-sample fit.

**related:** iROAS, Incremental Lift, Geo Holdout, Marginal ROAS, Attribution Gap Ratio.

---

## 30. Marginal CAC / Marginal ROAS and the Spend-Response Curve

**applies_to:** both

**definition:** The efficiency of the *next* dollar rather than the average across all dollars, which is the only number that can answer "should I spend more."

**formula_variants:**
- **Marginal CAC** = `ΔSpend / ΔNew customers` between two spend levels
- **Marginal ROAS** = `ΔRevenue / ΔSpend`
- **Marginal aMER** = `Marginal acquired revenue / Marginal ad spend` `[V, CTC, March 29, 2022]`
- **Derived from a response curve:** if `Conversions = a·Spend^B` with 0 < B < 1, then marginal conversions = `a·B·Spend^(B−1)`, and **marginal CAC = average CAC / B**. At B = 0.5, marginal CAC is exactly twice average CAC.
- **Empirical step-test:** raise spend by a set increment, hold everything else, measure the delta. Crude, cheap, and honest.
- **Curve-fit from MMM or geo tests:** the rigorous version.

**Why average cannot answer the scaling question, stated plainly:** average efficiency is the mean over all dollars including the cheap early ones that would have converted anyway. **The next dollar is always the most expensive dollar you have ever spent in that channel.** A channel showing a 3.0x average ROAS can have a 1.2x marginal ROAS, and if your breakeven is 2.5x, the average says scale and the marginal says stop. Both are computed from the same data.

**Response curve shapes** `[V, Recast, May 10, 2023]`:

| Shape | Behavior | Typical context |
|---|---|---|
| **Concave** | Steep initial impact, rapid drop-off | Most commonly observed empirically; one-time purchase |
| **S-curve** | Slow, fast, slow, flat | Most likely true in reality, but empirically hard to observe because you rarely have data at the low end |
| **Linear** | Proportional | Rare; usually means too little data or spend far below saturation |
| **Convex** | Increasing returns | Rarest; economies of scale, more typical of organic channels like SEO |

Recast's worked example: a fitted coefficient of 1,163 meaning **every additional $1,163 of spend raised cost per acquisition by $1.**

**inputs:** spend variation over time (which requires you to have actually varied spend), plus outcome data. Or a deliberate step-test. Or an MMM response curve.

**application:** The budget-setting metric. Sets the stopping point: **spend up to where marginal contribution equals zero**, which per CTC is the point at which "marginal CM falls below $0" and "spend stops being profit-producing" `[V]`.

**benchmark:** **NO SOURCED BENCHMARK FOUND**, and none is meaningful, since marginal efficiency is entirely a function of your saturation level in your audience. The *rule* is the transferable output: at a fitted power-curve exponent B, marginal CAC = average CAC / B, so a channel at B = 0.6 has a marginal CAC roughly 1.7x its average.

**traps:**
- **The single most expensive error in paid media is scaling on average efficiency.** Every "our ROAS is 4x so let's double spend" decision is this error.
- **Marginal estimates require spend variation you may not have.** Flat spend produces no identification, and a model will still hand you a curve.
- **Marginal efficiency is confounded with everything else that changed.** A spend increase coinciding with a creative refresh, a seasonal shift, or a competitor pullback produces a marginal estimate that measures all four.
- **Automated bidding actively hides the curve.** tCPA/tROAS holds efficiency roughly constant and lets volume absorb the change, so you observe a flat CPA and a volume ceiling rather than a rising CPA. **The saturation shows up as unspent budget, not as worse efficiency**, which is why "we cannot spend the budget" is a marginal-efficiency signal.
- **Marginal ROAS is not stable across weeks.** Measured once at Q3 spend, it does not describe Q4.
- **Saturation is audience-specific, not channel-specific.** You can be saturated in one audience and unsaturated in another on the same platform, and the blended curve hides both.

**related:** CPM Inflation Decomposition, iROAS, MMM, MER, aMER, Impression Share, Frequency.

---

# PART 5: MEASUREMENT INTEGRITY

## 31. View-Through Conversions and View-Through Share

**applies_to:** both, dominant in consumer

**definition:** Conversions credited to an ad impression that was never clicked, which is the single most inflationary construct in platform reporting.

**formula_variants:**
- **VTC count:** conversions within the view window from users who saw but did not click
- **View-through share** = `VTC / (VTC + Click-through conversions)`. The diagnostic. A high share means most of your reported performance rests on the weakest evidence.
- **VTC:CTC ratio**
- **Engaged-view conversions:** Meta's `1d_engaged_view` and Google's engaged-view metric apply a minimum view duration before crediting, which is a strictly better construct than a raw impression-based view-through
- **View-through-adjusted CPA** = `Spend / Click conversions only`. The conservative bound. **Reporting both bounds is better practice than picking one.**

**Current state:** Meta removed the 7-day and 28-day view windows from the Ads Insights API effective **January 12, 2026**, retaining **1-day view and 1-day engaged view** `[V, Meta developers blog, October 16, 2025]`. This is a meaningful tightening, and it is why any Meta VTC series spanning that date breaks.

**inputs:** platform reporting split by click vs view. Not all platforms expose it cleanly; some require an API pull rather than the UI.

**application:** Should be used as a **diagnostic on report quality**, not as a performance metric. The right question is "how much of my reported ROAS survives if I count clicks only."

**benchmark:** **NO SOURCED BENCHMARK FOUND for a normal view-through share.** The one sourced figure on magnitude is the January 2026 change impact: advertisers on the 7-day view window reportedly lost **15 to 30%** of attributed conversions and those on 28-day view lost **30 to 40%** `[S, Dataslayer, January 19, 2026, author's observation not a Meta statement]`. If those figures are even directionally right, view-through was carrying a third of reported Meta performance for a large group of advertisers.

**traps:**
- **View-through credit is mechanically proportional to impression volume.** Buy more impressions, get more view-through conversions, with no causal effect required. **This makes VTC the single easiest metric to manufacture.**
- **Retargeting plus view-through is the worst combination in paid media.** You are showing impressions to people already on a purchase path and then claiming their purchases. Both Stella (retargeting flagged at 5-10x inflation) and CTC (Facebook non-acquisition at 0.60x iROAS) point at this.
- **A served impression is not a seen impression.** Below-the-fold and sub-second impressions generate view-through credit.
- **View-through windows differ by platform,** so the VTC share is not comparable across channels.
- **Removing view-through does not make the remaining numbers causal.** Click-through conversions are also substantially non-incremental (Gordon 2022 measured the total effect, not the view-through portion).
- **The temptation after the January 2026 change is to widen elsewhere to "recover" the lost conversions.** That recovers the reported number, not the revenue.

**related:** Attribution Window, Attribution Gap Ratio, Frequency, ROAS, Modeled Conversions.

---

## 32. Modeled Conversions and Signal Quality (Match Rate / EMQ)

**applies_to:** both

**definition:** The share of reported conversions that were statistically inferred rather than observed, and the quality of the first-party signal feeding that inference.

**formula_variants:**
- **Modeled conversion share** = `Modeled conversions / Total reported conversions`. Platforms report this inconsistently and often not at all.
- **Event match quality (EMQ):** Meta's 1-10 score on how well server-side events match to users, driven by which parameters you send (email, phone, external ID, click ID, IP, user agent)
- **Match rate:** the share of sent events successfully matched to a platform user
- **Server-side (CAPI) vs browser event coverage:** the share of conversions arriving by each path, and the dedup rate between them
- **Consent rate:** the share of sessions where tracking consent was granted, which caps observable conversions

**inputs:** Meta Events Manager (EMQ, match rate, dedup), Google Ads conversion diagnostics, consent management platform.

**application:** Determines how much of your reported performance is observation versus inference. Low EMQ degrades both reporting and, more importantly, **algorithmic optimization**, since the bidding model learns from matched events.

**benchmark:** **NO SOURCED BENCHMARK FOUND.** Meta does not publish EMQ distributions. "Aim for 8+" is agency convention. Consent rates vary enormously by jurisdiction and banner design and no representative benchmark exists.

**traps:**
- **Modeled conversions are not labeled as such in most reporting surfaces.** You are looking at a blend of observed and inferred and cannot separate them.
- **Improving EMQ raises reported conversions without raising real ones.** A signal-quality project produces a performance-looking lift that is pure measurement recovery. **Teams take credit for this constantly.**
- **Server-side events without proper deduplication double-count** against browser events.
- **Sending more PII raises EMQ and raises privacy risk.** This is a real tradeoff, not a free win.
- **Consent-mode modeling fills gaps with a model trained on consenting users,** who differ systematically from non-consenting users.
- **A modeling change on the platform side moves your numbers with no action from you.** These changes are rarely announced with enough specificity to adjust for.

**related:** Attribution Model, ATT Opt-In Rate, SKAN Coverage, View-Through Conversions.

---

## 33. ATT Opt-In Rate and SKAN / AdAttributionKit Coverage

**applies_to:** consumer (mobile, iOS)

**definition:** The share of iOS users granting tracking permission, and the completeness of the privacy-preserving attribution system that measures everyone else.

**formula_variants:**
- **ATT opt-in rate** = `Users granting ATT / Users shown the prompt`
- **ATT prompt display rate** = `Users shown the prompt / Eligible users`. **Distinct and frequently conflated.** An app that shows the prompt to 60% of users and gets 50% consent has a 30% effective opt-in, and vendors quote whichever is higher.
- **SKAN coverage** = `SKAN-attributed installs / Total iOS installs`
- **Null conversion value rate** = share of postbacks arriving with no conversion value, which happens when crowd anonymity thresholds are not met
- **Effective iOS measurement rate** = `(Consented users + usable SKAN postbacks) / Total iOS users`

**Mechanics that shape the metric:** SKAdNetwork and its successor AdAttributionKit deliberately degrade granularity. **Crowd anonymity** suppresses conversion-value detail below a privacy threshold, so low-volume campaigns receive postbacks with null or coarse values. **Conversion value encoding** forces you to compress your entire post-install funnel into a small integer (fine-grained) or a coarse bucket, which is a lossy, one-time design decision. Postbacks arrive on delayed, randomized timers, which breaks same-day optimization.

**inputs:** ATT rates from your own prompt instrumentation (the only trustworthy source) or an MMP dashboard. SKAN postbacks via MMP.

**benchmark:** **NO SOURCED BENCHMARK FOUND in this research pass.** The mobile research thread did not return before delivery, and the primary sources (AppsFlyer's ATT dashboard, Adjust, Business of Apps, Singular) either 404'd or blocked automated retrieval.

**Do not use a remembered ATT figure.** Published rates have moved substantially since 2021 and vary by category and geo by more than they vary over time. To fill: AppsFlyer's ATT dashboard and its annual privacy reports, Adjust's Mobile App Trends, Singular's ROI Index, and Apple's own AdAttributionKit documentation for current version state. Also confirm the current status of Google's Privacy Sandbox for Android, which is the Android-side equivalent and has had a shifting timeline.

**traps:**
- **Your own opt-in rate is the only one that matters,** and it is heavily driven by your pre-prompt design, timing, and value proposition. Benchmarks here are close to useless for planning.
- **Prompt display rate vs opt-in rate conflation** inflates reported figures.
- **SKAN and MMP numbers are not comparable and must never be summed.** Consented users are measured one way, everyone else another, and adding them double-counts.
- **Crowd anonymity means small campaigns are structurally unmeasurable.** Splitting budget across many small ad sets destroys your own measurement, which creates a real tension with granular optimization.
- **Conversion value schema changes reset your history.** You cannot compare cohorts across a schema change, and teams change schemas without versioning them.
- **Postback timers make same-day iOS optimization impossible.** Any iOS dashboard showing today's ROAS is showing modeled numbers.
- **The consented population is not representative.** Users who opt in differ systematically, so extrapolating their behavior to the full base is biased.

**related:** CPI, Attribution Model, Modeled Conversions, ROAS by day window, Install-to-Registration.

---

# PART 6: MIX AND DIAGNOSTICS

## 34. CPM Inflation Decomposition (Market-Driven vs Self-Inflicted)

**applies_to:** both

**definition:** A diagnostic that separates a CPM increase caused by the auction from one you caused yourself by scaling into a finite audience.

**formula_variants:**

There is no standard formula, which is itself worth flagging. The defensible decomposition is:

`ΔCPM_total = ΔCPM_market + ΔCPM_self-inflicted + ΔCPM_mix`

Estimated as:

1. **Market component:** your CPM change versus a same-period, same-platform, same-geo external index. **Gupta Media's 14-day trailing CPM tracker and Tinuiti's quarterly YoY CPM figures are the two usable public indices.** If Facebook CPM rose 13% YoY industry-wide in Q2 2026 and yours rose 15%, roughly 13 points are market.
2. **Self-inflicted component:** correlate your CPM against your own spend at constant audience definition. Rising frequency plus rising CPM plus flat reach is the signature of audience exhaustion, and it is your doing.
3. **Mix component:** hold placement, objective, geo, and audience mix constant and recompute. A CPM change that disappears under constant mix was never a price change.

**The three-question diagnostic, in order:**

| Question | If yes | Response |
|---|---|---|
| Did the external index move by a similar amount? | Market-driven | Accept it, or shift budget to a less inflated channel |
| Is frequency rising while reach is flat or falling? | Self-inflicted saturation | Expand audience, refresh creative, or accept lower marginal efficiency |
| Did placement, objective, geo, or audience mix change? | Mix artifact | Not a price change at all; recompute at constant mix |

**inputs:** your CPM by segment; an external index (Gupta Media, Tinuiti, Skai, Varos); your reach and frequency series; your delivery mix breakdown.

**application:** Determines whether a CPM increase is something to manage around, something to fix, or something that is not real. These have completely different responses and teams routinely apply the wrong one.

**benchmark:** The external indices themselves are the benchmark:

| Source | Coverage | Latest verified |
|---|---|---|
| Gupta Media CPM Tracker `[V]` | Meta, TikTok, YouTube, Snap, Pinterest; 14-day trailing | October 2025 update; 2025 averages; BFCM +66% over baseline |
| Tinuiti Digital Ads Benchmark `[V-2nd]` | Google, Meta, Amazon, YouTube, Pinterest, Reddit, Microsoft, Walmart; quarterly YoY | Q2 2026 (Facebook CPM **+13% YoY**, a reversal from −4% in Q1); Q1 2026 (Reddit CPM +71%, Amazon DSP +24%, YouTube −21%) |
| Skai Quarterly Digital Trends `[V via agent]` | Paid search, paid social, retail media | Q1 2026 (paid search CPC $1.10, +11% YoY, all-time high; paid social CPM stable $5-$6) |
| Right Side Up / Varos `[V via agent]` | Meta, TikTok; 6,000+ companies, $4B spend | Q1 2025 (Meta CPM $10.88, +19.2%; TikTok $6.59, −22.2%) |

*Seasonal and structural drivers, sourced:* BFCM CPM **66% above baseline**, December the most expensive month, Facebook's peak ISO week 48 at **$13.42** (Gupta Media, October 2025) `[V]`. Election-year crowding: **display CPM up 39% YoY in Q3 2024** (AdRoll Q4 2024 State of Digital Marketing) `[S]`, with the Q4 ramp arriving earlier than normal and concentrating in swing-state geos and on Meta, the only major social platform among Meta/TikTok/Pinterest accepting political ads.

**traps:**
- **Attributing a self-inflicted CPM rise to "the market" is the most common excuse in paid media,** and it is the excuse that prevents the actual fix (audience expansion or creative refresh).
- **Conversely, attributing a genuine market move to your own execution** leads to pointless account churn.
- **Indices are panel-specific.** Gupta and Varos disagree on Meta 2025 CPM by roughly 33% ($8.19 vs $10.88). Use one index consistently for *change*, and never treat any of them as your expected absolute price.
- **YoY CPM comparisons across a US election cycle are structurally broken** and cannot be cleaned with a single adjustment factor.
- **A CPM drop is not automatically good.** It often means you broadened into cheaper, worse inventory.
- **Mix shifts masquerade as price shifts constantly.** Reels versus feed, Advantage+ versus manual, and geo expansion all move blended CPM with no auction change.

**related:** CPM, Reach, Frequency, Marginal CAC, Impression Share.

---

## 35. Organic vs Paid Split (Paid Mix Ratio)

**applies_to:** both

**definition:** The share of new users, leads, or revenue arriving through paid versus unpaid channels, which sets how exposed the business is to media price.

**formula_variants:**
- `Paid-attributed new customers / Total new customers`
- **Paid share of revenue** = `Paid-attributed revenue / Total revenue`
- **Organic uplift multiplier** = `Total installs / Paid installs`. The mobile convention. A k-factor-adjacent measure of how much free volume paid drags along.
- **Paid dependency** = `1 − (Revenue that would persist with zero paid spend)`. Only estimable via a full-channel holdout, and almost never measured.

**inputs:** attribution system for the split, billing system for totals. **The split is only as good as the attribution behind it, which is the central problem.**

**application:** A risk metric more than an efficiency metric. High paid dependency means the business is a leveraged bet on auction prices you do not control.

**benchmark:**

*B2B SaaS acquisition mix, OpenView PLG benchmarks (June 2022, 450+ companies)* `[V via agent]`: **organic (SEO and direct) 53%, product-driven 13%, paid 10%, outbound sales 8%.** Four years stale and the firm is defunct, so cite with the date attached.

*Marketing spend as share of revenue, Benchmarkit 2025 (2024 data)* `[V via agent]`: S&M spend **47% of revenue for VC-backed, 33% for PE-backed** B2B SaaS.

*Channel conversion mix, Ruler Analytics 2026 (110M+ sessions)* `[V]`: organic search 4.9% and direct 4.7% conversion rates versus paid social 2.11%, indicating unpaid channels convert roughly 2x better on their tracked base.

Beyond these: **NO SOURCED BENCHMARK FOUND for a target paid/organic ratio**, and the concept is stage-dependent enough that a universal target would be misleading.

**traps:**
- **The split is an attribution artifact as much as a real division.** Direct and organic-search traffic is routinely paid-influenced (someone saw the ad, searched the brand, and arrived "organically"). **Last-click reporting will show organic growing when paid is actually driving it.**
- **Paid search cannibalizes organic search,** which shows up in this metric as a healthy paid share and is partly an accounting transfer. See Metric 36.
- **"Organic uplift" in mobile is often mis-measured** because unattributed installs default to organic. A tracking failure reads as organic growth.
- **A falling paid share can mean paid is working** (brand demand rising) or that paid is broken. The metric alone cannot distinguish them.
- **The only rigorous read on paid dependency is a full-channel holdout,** which almost nobody runs because the downside is real.

**related:** Brand vs Non-Brand Split, MER, aMER, Attribution Model, iROAS.

---

## 36. Brand vs Non-Brand Search Split

**applies_to:** both

**definition:** The division of paid search spend and results between queries containing your brand name and queries that do not, which is the sharpest incrementality question in the family.

**formula_variants:**
- `Brand spend / Total search spend`, and the same for clicks, conversions, and revenue
- **Brand/non-brand CPL, CPC, CVR, and ROAS reported separately.** Blending them is the core error.
- **Non-brand-only efficiency:** the honest read on whether paid search is acquiring anyone new
- **Cannibalization rate** = `1 − (Total brand conversions with paid on / Total brand conversions with paid off)`, from a holdout. The only number that settles the argument.

**inputs:** keyword-level segmentation in Google Ads and Microsoft Ads. Requires a maintained brand-term list, and PMax/Advantage+ makes clean segmentation increasingly difficult.

**application:** Determines whether "paid search is our best channel" is a real finding or an accounting artifact.

**benchmark:**

*B2B SaaS, PipeRocket (last updated July 2026; 19 B2B SaaS accounts, first-party Google Ads API, trailing 12 months July 2025 to June 2026, median account to avoid large-spender skew)* `[V via agent]`:

| Metric | Non-brand | Brand | Blended |
|---|---|---|---|
| CPC | $13.75 | $3.12 | $6.81 |
| CTR | 3.60% | **22.21%** | 3.60% |
| Conversion rate | 3.94% | 3.73% | 2.57% |
| **Cost per lead** | **$207** | **$34** | **$84** |

**Brand CPL is roughly 6x cheaper, and conversion rates are nearly identical (3.73% vs 3.94%). That near-parity is the tell.** Brand's entire advantage is CPC and CTR, which means it is buying clicks from people who already knew your name.

*Market-level brand CPC movement, Tinuiti* `[V-2nd]`: Google **brand keyword CPC down 9% YoY in Q1 2026** while text-ad CPC overall rose 1%; brand keyword CPC **up 2% in Q4 2025**.

*Incrementality, and this is the part that matters:*

| Source | Branded search finding |
|---|---|
| **Blake, Nosko & Tadelis** (eBay RCT, NBER WP 20171 May 2014, Econometrica 2015) `[V via agent]` | **Brand-keyword ads showed no measurable short-term benefit.** Non-brand produced negative average returns because frequent users who would have converted anyway absorbed most of the spend. |
| **Stella** (225 geo tests, Aug 2024 to Dec 2025, pub May 26, 2026) `[V]` | **Google Search branded median iROAS 0.70x**, the lowest of any channel tested and below breakeven, against a full-portfolio median of 2.31x |
| **Common Thread Collective** (pub July 2, 2026) `[V]` | **Google branded search median iROAS 0.27x** |
| **The Feed case study** (via Polar Analytics) `[S]` | Organic traffic **down 14%** when branded paid search was on; total traffic up only **2%** at a highly inefficient CPA |
| **INCRMNTAL** (customer cases, updated May 21, 2025) `[V]` | Branded campaigns incremental in some markets and not others; in one Apple Search Ads case, incremental in a developing market and not in the mature one. Conclusion: "They can be, but they can also not be incremental." |

**Three independent sources, spanning twelve years and different methodologies, place branded search below breakeven on an incremental basis.** The counterweight is INCRMNTAL's finding that it varies by competitive intensity and brand maturity, which is the honest caveat: in a category where competitors bid on your name, defensive brand spend can be genuinely incremental.

I found **no published B2B SaaS branded-search holdout experiment with disclosed results.** That is a real gap. The DTC evidence should not be assumed to transfer to a B2B SaaS company with low unaided brand awareness.

**traps:**
- **Blended paid search efficiency is a weighted average dominated by brand,** so any account-level search ROAS or CPL is close to meaningless without the split.
- **Brand search will always look like your best channel in platform reporting, and it is the channel most likely to be worthless.** This is the cleanest example in the family of platform reporting and causal reality pointing in opposite directions.
- **The cannibalization is not zero and not 100%.** The Feed's test found 14% organic loss against a 2% total traffic gain, which is heavy but not total substitution.
- **PMax and broad match blur the brand/non-brand line deliberately.** Increasingly you cannot cleanly segment, which conveniently makes brand spend harder to isolate and cut.
- **Turning brand off entirely to test is a real risk if competitors are bidding on you.** The correct test is a geo holdout or a partial query holdout, not a full pause.
- **Brand search volume is an outcome of your other marketing,** so brand campaign performance improves when your upper-funnel works, and the brand campaign takes the credit.

**related:** Attribution Gap Ratio, iROAS, Organic vs Paid Split, Impression Share, CPL.

---

## 37. New vs Returning Customer Share of Paid Conversions

**applies_to:** both

**definition:** The share of paid-attributed conversions coming from people who were already customers, which determines whether "acquisition" spend is acquiring anyone.

**formula_variants:**
- `New customer conversions / Total paid-attributed conversions`
- **New customer ROAS** = `New customer revenue / Acquisition-campaign spend`
- **Prospecting vs retargeting split**, by spend and by result
- **Reactivation share:** lapsed customers returning, which is neither acquisition nor retention and is usually miscounted as acquisition

**inputs:** new/returning flag from the billing or commerce system joined to ad attribution. Same identity-resolution problem as aMER.

**application:** Separates genuine acquisition from re-conversion of existing demand. Directly feeds aMER. Determines whether a campaign labeled "prospecting" is actually prospecting.

**benchmark:** **NO SOURCED BENCHMARK FOUND for a target split.** The closest sourced signal is CTC's iROAS split by campaign intent: **Facebook acquisition 1.14x versus Facebook non-acquisition 0.60x** `[V]`. Non-acquisition Meta spend was, at the median in CTC's book, destroying value on an incremental basis.

One figure worth flagging with heavy caveats: Wicked Reports (55,661 campaigns) reportedly measured Advantage+ new-customer acquisition cost at **$528 in May 2025 versus $257 in May 2024** `[S, via a low-quality aggregator]`. **Unverified and from a source flagged as unreliable. Do not cite without going to Wicked Reports directly.** If directionally true, it would be a significant finding about automated campaign types and new-customer cost.

**traps:**
- **Platform "new customer acquisition" optimization relies on the customer list you uploaded,** which is stale the moment you upload it and never covers guest checkout or multi-email customers.
- **Retargeting conversions counted as acquisition** is the most common version of this error, and it is what makes prospecting budgets look efficient.
- **Reactivation is usually bucketed as new,** which overstates acquisition.
- **A rising new-customer share can mean retention is failing,** not that acquisition improved.
- **The new/returning flag depends on identity resolution across guest checkout, multiple emails, and app-versus-web accounts,** and it is wrong more often than teams believe.

**related:** aMER, Blended CAC, Cost per Paying Customer, iROAS.

---

# Metrics I considered and excluded, with reasons

| Metric | Reason for exclusion |
|---|---|
| **LTV, LTV:CAC, CAC payback period** | Belongs to the monetization and unit-economics family. Referenced throughout as the constraint that gives acquisition metrics meaning, but the definitional work (cohort vs predicted, gross vs contribution-margin LTV, discounting) belongs there. |
| **Retention curves (D1/D7/D30), churn, NRR/GRR** | Retention family. Included only where it directly gates a paid decision (RevenueCat's year-1 retention by plan duration, which caps ROAS). |
| **Trial-to-paid conversion rate** | Sits on the boundary. **Cost per trial** is unambiguously acquisition, so it is included here, but trial-to-paid itself is a monetization and paywall metric. Included in Metric 18 only because you cannot convert cost-per-trial into cost-per-customer without it. |
| **Viewability, IVT/fraud rate, brand safety, ad verification** | A media-quality family of its own. Real and consequential, but it is a supply-chain integrity question rather than an acquisition-efficiency question. Referenced inside CPM (served vs viewable) and CPI (click injection). |
| **Share of search, brand awareness, aided/unaided recall, brand lift** | Brand-measurement family. Brand lift studies are methodologically adjacent to conversion lift, but the outcome variable is attitudinal rather than transactional. |
| **Email and lifecycle metrics (open, click, deliverability)** | Lifecycle and CRM family. They influence blended efficiency but are owned by a different discipline and a different system. |
| **SEO metrics (rankings, organic sessions, domain rating, AI-referral visibility)** | Organic acquisition family. The **paid/organic interaction** (Metric 35) and **brand search cannibalization** (Metric 36) are included here because they are paid decisions; the organic metrics themselves are not. |
| **Referral, virality, k-factor, invite rate** | Growth-loop family. Affects blended CPI meaningfully in consumer apps, and I would flag it as the most defensible candidate for inclusion if you want to expand this family later. |
| **Sales activity metrics (calls, emails, connect rate, meetings per rep)** | Sales-productivity family. **Cost per held meeting** is included (Metric 19) because it is the handoff point; rep activity is not. |
| **Pipeline coverage ratio, win rate, sales cycle length** | Revenue-operations family. Sales cycle length is cited inside Attribution Window (Metric 26) because it determines the correct lookback, not as a metric in its own right. |
| **Marketing-sourced vs marketing-influenced pipeline** | Deliberately excluded. It is an **attribution model applied to pipeline**, not a distinct metric, and Metric 25 already covers the modeling choice. Including it separately would imply it carries independent information, which it does not. |
| **NPS, CSAT, review volume and ratings** | Product and customer-experience family. App Store rating materially affects store conversion rate, and I would route that dependency through Metric 9 rather than adding a metric here. |
| **Creative-level metrics (hook rate, hold rate, thumbstop ratio, 3-second video views)** | Genuinely close to inclusion. They are real diagnostics and heavily used. Excluded because they are **platform-specific creative diagnostics with no cross-platform definition and no published benchmarks**, so a corpus entry would be mostly caveats. Better handled as a creative-testing sub-module. |
| **Auction win rate, bid landscape, first-price vs second-price dynamics** | Programmatic-buying family. Impression Share (Metric 7) covers the advertiser-visible version of the same concept for search and retail media. |
| **Cost per point (CPP), GRPs, TRPs** | Traditional-media planning family. Relevant if the practice expands into linear TV or radio, and would enter through MMM (Metric 29) rather than as standalone entries. |
| **Incrementality test statistical machinery (MDE, power, coverage, false-positive rate)** | Folded into Metric 28 rather than split out. They are properties of a test design, not metrics of business performance, and separating them would fragment the one section a practitioner actually needs to read end to end. |

---

# Cross-family dependencies

**Metrics this family hands off to other families:**

| From this family | To | Dependency |
|---|---|---|
| Cost per Paying Customer, CAC | Unit economics | CAC is one half of LTV:CAC and the numerator of payback period. Every acquisition decision is ultimately adjudicated there. |
| Cost per Activation | Retention | Activation is the strongest early predictor of retention, so its definition is jointly owned. If retention redefines the aha moment, cost per activation changes with no media change. |
| Cost per Trial | Monetization | Only convertible into cost per customer through trial-to-paid, which is owned by paywall and pricing. |
| CPL, Cost per MQL/SQL | Revenue operations | Stage costs are only interpretable against stage rates and cycle length, both owned by RevOps. |
| Attribution Gap Ratio | Finance and planning | The normalization coefficient that should be applied before any channel budget is set. If finance plans on platform-reported ROAS, the plan is wrong by the gap ratio. |
| MER, aMER, Contribution ROAS | Finance | These are the metrics a CFO recognizes, and they require contribution margin from finance to be interpretable at all. |

**Metrics this family depends on from elsewhere:**

| From | Needed for | Consequence if missing |
|---|---|---|
| **Contribution margin** (finance) | Breakeven ROAS and MER, Contribution ROAS, the spend stopping rule | Without it, every efficiency target is a guess. `Breakeven MER = 1 / CM%` is not computable. This is the single most common missing input. |
| **LTV by cohort and channel** (monetization) | Whether a CAC is acceptable, pROAS models, payback | Without it, you can only optimize to short-window ROAS, which systematically underweights slow-payback channels. |
| **Retention curves** (retention) | The shape of the D0-to-D180 ROAS curve; whether a D7 ROAS will mature | RevenueCat 2026 year-1 retention by plan duration (yearly 44.1%, monthly 17.0%, weekly 3.4% in the 2025 edition) is what determines whether a given CPI ever pays back. |
| **Trial-to-paid rate** (monetization) | Converting cost per trial into cost per customer | Cost per trial alone is uninterpretable, and optimizing to it in isolation actively harms the business. |
| **Sales cycle length by ACV** (RevOps) | The correct attribution lookback window; when CAC can be validated | Norwest's 9-to-12-month cycles above $500K ACV mean a 90-day window is structurally wrong, and nobody in the attribution literature has published guidance on this. |
| **Stage conversion rates** (RevOps) | Deriving cost per MQL/SQL/opportunity, since no credible published benchmarks exist | Without your own rates, you cannot construct these at all. |
| **New vs returning customer flag** (data/identity) | aMER, new-customer CAC, prospecting-vs-retargeting truth | Identity resolution failures across guest checkout, multiple emails, and app-vs-web quietly corrupt several metrics at once. |
| **Product event instrumentation** (product analytics) | Cost per activation, funnel cascade rates, SKAN conversion-value schema | Without a working join between ad attribution and product events, everything below the install or registration is unmeasurable by channel. |
| **Store commission and refund rates** (finance) | Net ROAS, contribution ROAS | A 30% Apple cut plus 10% refunds turns a 2.0x gross ROAS into 1.26x net. Omitting this is a systematic 35%+ error. |

**The two dependencies most often broken in practice:** contribution margin never reaching the media team, and the ad-attribution-to-product-event join never being built. Every metric from Metric 11 onward degrades to guesswork without them.

---

## Delivery notes

**What is verified versus not.** Every benchmark carries a source, URL-traceable publisher, data period, and publication date, with a verification tag. Twelve metrics carry **NO SOURCED BENCHMARK FOUND** rather than an invented number: Google Display/LinkedIn/CTV/Reddit absolute CPMs, Quality Score distributions, frequency thresholds, impression share targets, **CPI**, click-to-install and store conversion rates, install-to-registration, cost per MQL/SQL/opportunity, review-site CPL, visitor-to-demo-request, **ATT opt-in and SKAN coverage**, and marginal-efficiency levels.

**The one substantive gap.** The mobile research thread (CPI, ATT opt-in, SKAN/AdAttributionKit mechanics, MMP-versus-SAN discrepancy) did not return before delivery, and the primary sources for it (Business of Apps, Adjust, several AppsFlyer report URLs) blocked or rate-limited automated retrieval. Consumer subscription is otherwise well covered through RevenueCat's 2026 report, which I verified directly and which gives you the revenue side of the CPI equation (revenue per download by category and geo, D14 and D60), the full download-to-trial-to-paid cascade, and the trial-length and paywall-type splits. **To close the gap, the specific pulls are: AppsFlyer Performance Index and ATT dashboard, Adjust Mobile App Trends, Liftoff category reports, and Apple's AdAttributionKit documentation.** The session's web-search budget (200 calls) was exhausted, which is also why several secondary avenues went unexplored.

**Three findings I would act on before anything else.** First, the Gordon 2022 result that non-experimental measurement error is *worst at the lower funnel* (median RCT lift 5% versus 24% and 64% from the two observational methods) means the conversions you optimize to are the least reliable ones you have. Second, three independent sources spanning twelve years put branded search below breakeven on an incremental basis, and it will always look like the best line in your account. Third, the benchmark literature itself now requires verification as a routine step, since I found a decade-old dataset served under a 2026 date stamp, a fabricated WordStream citation, and a column reversal in HubSpot's most-quoted B2B table.

agentId: a7b0f5daf1824a362 (use SendMessage with to: 'a7b0f5daf1824a362', summary: '<5-10 word recap>' to continue this agent)
<usage>subagent_tokens: 226228
tool_uses: 94
duration_ms: 1601713</usage>