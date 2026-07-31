# Quick Ratio: the three-metrics-one-name problem

Supplement to the revenue quality family. "Quick ratio" refers to at least three genuinely different metrics, and the corpus should own this card because it is the cleanest example in the whole project of a name collision that makes people look foolish in a meeting.

The three:

1. **Accounting / liquidity quick ratio** (also called the acid-test ratio). A balance sheet solvency test.
2. **SaaS growth quick ratio.** `(New MRR + Expansion MRR) ÷ (Churned MRR + Contraction MRR)`. A growth efficiency measure. Covered in the retention family.
3. **Engagement growth-accounting quick ratio.** The same ratio logic applied to active users rather than revenue. Covered in the engagement family.

This file documents number one, because it is the one a marketer is least likely to know and most likely to be caught by.

**Verification tags:** `[P]` primary, read directly. `[S]` secondary. `[W]` weak.

---

## 1. The liquidity quick ratio has no single formula either

Two competing constructions are in live use across finance-education publishers.

**Variant (b), build-up:** `(Cash + Cash Equivalents + Marketable Securities + Net Accounts Receivable) ÷ Current Liabilities`

**Variant (a), subtraction:** `(Total Current Assets − Inventory − Prepaid Expenses) ÷ Current Liabilities`

| Source | Build-up | Subtraction | Prepaid expenses | Tag |
|---|---|---|---|---|
| Investopedia, "Understanding the Quick Ratio" | Yes | Yes | Explicitly subtracted | [P] |
| Investopedia, "Understanding the Acid-Test Ratio" | Yes | Mentioned as "another way" | Listed among items to subtract | [P] |
| Corporate Finance Institute, "Quick Ratio" | Yes | Yes | Explicitly subtracted, with a reason | [P] |
| Corporate Finance Institute, "Acid-Test Ratio" | Yes | Yes | Not mentioned | [P] |
| OpenStax, *Introduction to Business* 14.7 | No | Only | Not mentioned | [P] |
| OpenStax, *Principles of Finance* 6.4 | Only | No | Excluded by definition | [P]/[S] |
| Lumen / SUNY Clinton, *Financial Accounting* | Yes | No | Explicitly excluded | [P] |
| Open University (OpenLearn) | No | Only | Not mentioned | [P] |
| Wikipedia, "Quick ratio" | Yes | Yes | States both are equal | [S] |
| **34 CFR § 668.176 / § 668.15** (US Dept of Education) | Yes, narrowest of all | No | Excluded, and marketable securities excluded too | [P] |
| CFA Institute, "Financial Analysis Techniques" (2026 curriculum) | Names the ratio, no formula on the free page | — | — | [P] |

Verbatim, and worth quoting because it settles the argument:

- Investopedia: "There are a few different ways to calculate the quick ratio."
- Investopedia (acid-test page): "Not everyone calculates this ratio in the same way. There's no single, hard-and-fast method for determining a company's acid-test ratio."
- Corporate Finance Institute, on why prepaid expenses come out: "Prepaid expenses, because they can not be used to pay other liabilities."
- OpenStax *Principles of Finance*: "current assets are more narrowly defined as the most liquid assets, which exclude inventory and prepaid expenses."

### When the two variants diverge, and by how much

They agree only if current assets contain nothing except cash, cash equivalents, marketable securities, receivables, inventory and prepaid expenses. They diverge as soon as a real "other current assets" line exists: deferred tax assets, advances to suppliers, vendor non-trade receivables, contract assets, short-term restricted cash, derivative assets.

Ordering, generally: subtract-inventory-only ≥ subtract-inventory-and-prepaid ≥ named-items build-up. The subtraction method sweeps every unnamed current asset into the numerator; the build-up admits only what it names.

Investopedia's own Apple worked example demonstrates the judgment call. It adds a fourth item, vendor non-trade receivables of $35,040M, to the standard three, which lifts the result to 1.04. That inclusion is a choice, not a rule. (Note: that same published example contains a transcription error, showing accounts payable of $74,362M in the table but using $74,632M in the calculation.)

**No source found declares one variant superior.** The closest thing to an authority is the Department of Education, which does not argue a preference but *mandates* the narrowest build-up for regulatory compliance: cash plus cash equivalents plus current accounts receivable, with no marketable securities.

34 CFR § 668.176(d)(1)(i)(D), verbatim: "The acid test ratio must be calculated by adding cash and cash equivalents to current accounts receivable and dividing the sum by total current liabilities."

---

## 2. The healthy threshold

The "at or above 1.0" rule of thumb is confirmed across sources, with variation.

| Source | Language |
|---|---|
| Investopedia (quick ratio) | "The ideal quick ratio is 1 or higher, although it can vary by industry." |
| Investopedia (acid-test) | "A healthy acid-test ratio is considered to be between 1 and 2, but this can vary by industry and specific circumstances." |
| Corporate Finance Institute | "A ratio above 1 indicates that a business has enough cash or cash equivalents to cover its short-term financial obligations." |
| OpenStax, *Introduction to Business* | "An acid-test ratio of at least 1 is preferred. But again, what is an acceptable value varies by industry." |
| Lumen / SUNY Clinton | "Most industries should have acid test ratios that exceed 1:1" |
| Open University | "As a rule of thumb this ratio should ideally be above one." |
| **34 CFR § 668.15 and § 668.176** | "an acid test ratio of at least 1:1" — a **binding federal requirement**, not a rule of thumb |
| OpenStax, *Principles of Finance* | Declines to set a benchmark: "a single ratio shouldn't be used out of context" |
| Corporate Finance Institute (acid-test page) | Uses 2.0 as its illustrative "good" figure, not 1.0 |

**Below 1.0:** Investopedia, "A company that has a quick ratio of less than one may not be able to fully pay off its current liabilities in the short term." Open University, "A figure below one indicates that a business may run into difficulties when paying its current liabilities."

**Very high is also a signal, not a win.** Investopedia: "a very high quick ratio may not be better. For example, a company may be sitting on a very large cash balance. This capital could be used to generate company growth or invest in new markets." And: "Some tech companies generate massive cash flows and therefore have acid-test ratios as high as 7 or 8... these companies have drawn criticism from activist investors." CFI calls a ratio of 10 unfavorable, attributing it to idle cash or receivables with collection problems.

**Industry dependence, confirmed by five sources.** Investopedia: "Retail stores might have very low acid-test ratios without necessarily being in danger... comparisons are most meaningful when you're analyzing peer companies in the same industry." The SEC's Beginners' Guide: "As a general rule, desirable ratios vary by industry."

**Negative finding worth knowing:** the SEC's own Beginners' Guide to Financial Statements (last reviewed Feb 5 2007) does **not** define the quick ratio or acid-test ratio at all. Do not cite the SEC for a quick-ratio formula. The only US federal source that defines it is the Department of Education regulation above.

---

## 3. Name and etymology

"Quick ratio" and "acid-test ratio" are treated as fully synonymous by every source fetched. Investopedia, CFI, OpenStax, Open University and Wikipedia all say some form of "also known as."

The hypothesis that some texts reserve "acid-test" for the stricter version is **not stated as a rule anywhere**, but it is weakly visible in editorial practice. Investopedia's acid-test page leads with only the build-up variant while its quick-ratio page presents both, and the federal regulation using the phrase "acid test ratio" specifies the narrowest construction of all. Treat that as an inferred pattern in usage, not a verified rule.

**Etymology, and why to hedge it.** Investopedia: "The term 'acid-test' is rumored to have originated from testing precious metals like gold with acid to make sure they were real." Note "rumored." Wiktionary corroborates the underlying phrase as "the use of nitric acid to test if a metal is gold; true gold is not affected by the acid" [S]. Wikipedia's "Acid test (gold)" article describes the assay and notes analysts use the nickname, but does not itself assert the causal link [S]. CFI, OpenStax, Open University and Lumen give no etymology at all.

The gold-assay origin is plausible and lexically supported, but the one finance publisher that mentions it calls it a rumor. Do not state it as established fact.

---

## 4. Who actually acknowledges the collision

**Corporate Finance Institute, "SaaS Quick Ratio,"** published Nov 6 2019, is the one clean source that names the problem outright [P]:

> "The metric can be confusing for people acquainted with some finance metrics. SaaS quick ratio and finance quick ratio (acid test ratio) are two different metrics that share a common name. Recall that, in finance, the quick ratio is a metric that evaluates a company's ability to meet its short-term liabilities."

> "On the other hand, SaaS quick ratio is not related to the company's liquidity position, as the metric is only concerned with its growth. However, both quick ratios provide investors with snapshots of the risk associated with a company."

Wall Street Prep also carries a SaaS quick ratio page defining it as `(New MRR + Expansion MRR) ÷ (Churned MRR + Contraction MRR)` and framing it as an industry-specific KPI, but its distinction is implicit rather than a stated warning [S].

**Where the collision is NOT acknowledged:** Investopedia (neither page), OpenStax (both books), the Open University, Lumen/SUNY, CFA Institute, the SEC, and Wikipedia's "Quick ratio" article all define the liquidity metric with no mention of a SaaS homonym. Klipfolio's KPI page, despite sitting in a SaaS metrics library, defines only the liquidity version and never flags the ambiguity.

That gap is the point. Someone reading a SaaS metrics glossary can land on the liquidity definition with nothing warning them, and vice versa.

---

## Source table

| # | Publisher | Page | Date | Tag |
|---|---|---|---|---|
| 1 | Investopedia | Understanding the Quick Ratio | Updated Jan 23 2026 | [P] |
| 2 | Investopedia | Understanding the Acid-Test Ratio | Updated Apr 6 2026 | [P] |
| 3 | Corporate Finance Institute | Quick Ratio | Mar 23 2020 | [P] |
| 4 | Corporate Finance Institute | Acid-Test Ratio | Mar 30 2020 | [P] |
| 5 | Corporate Finance Institute | **SaaS Quick Ratio** (the collision source) | Nov 6 2019 | [P] |
| 6 | CFA Institute | Financial Analysis Techniques | 2026 curriculum | [P] |
| 7 | eCFR | 34 CFR § 668.176, change in ownership | Effective Jul 1 2024 | [P] |
| 8 | eCFR | 34 CFR § 668.15, factors of financial responsibility | As of Jan 1 2023 | [P] |
| 9 | US SEC | Beginners' Guide to Financial Statements | Reviewed Feb 5 2007 | [P] negative finding |
| 10 | OpenStax | *Introduction to Business* 14.7 | Sep 19 2018 | [P] |
| 11 | OpenStax via LibreTexts | *Principles of Finance* 6.4 | Mar 9 2024 | [P]/[S] |
| 12 | Lumen / SUNY Clinton | Financial Accounting ch. 15 | No date | [P] |
| 13 | Open University | Financial statement analysis 5.2.3 | No date | [P] |
| 14 | Wikipedia | Quick ratio | Last edited Jul 20 2026 | [S] |
| 15 | Wikipedia | Acid test (gold) | Last edited Sep 5 2025 | [S] |
| 16 | Wiktionary | acid test | Last edited May 3 2026 | [S] |
| 17 | Wall Street Prep | SaaS Quick Ratio | Updated Sep 17 2024 | [S] |
| 18 | Klipfolio | Quick Ratio KPI | No date | [W] negative finding |

**Not obtained:** no CFA Institute page publishing the actual formula (free refresher names the ratio, formulas sit behind the paid curriculum). No FASB or AICPA definition, which is expected since US GAAP defines financial statement elements rather than analyst ratios.

---

## Why this card matters for the game

This is a natural high-difficulty item. A player who knows the SaaS quick ratio cold and gets asked "what's a healthy quick ratio" without qualification has a 50/50 chance of answering about the wrong metric. The correct answer is to ask which one. That is exactly the kind of judgment the game should reward over recall.
