# Bookings, ACV and TCV: primary-source research

Supplement to the revenue quality family. This one is unusual in the corpus because it is built almost entirely on SEC filings and SEC staff comment letters rather than benchmark blogs. That makes it the most defensible material in the whole project and the hardest for anyone to argue with.

**Verification tags:** `[P]` primary, read directly from the source. `[S]` secondary, credible aggregator citing a named primary. `[W]` weak, no disclosed methodology, do not quote externally.

---

## Part A: "Bookings" is not a GAAP term

### A1. Establishing there is no standard definition

| Source | Tag | What it establishes |
|---|---|---|
| SEC Release No. 33-10751, "Commission Guidance on MD&A," Jan 30 2020 (effective Feb 25 2020). https://www.sec.gov/files/rules/interp/2020/33-10751.pdf | [P] | Places operating metrics outside both GAAP and the non-GAAP regime, and requires company-supplied definitions |
| SEC staff comment letter to Perficient, Inc., Dec 11 2013. https://www.sec.gov/Archives/edgar/data/1085869/000000000013067403/filename1.pdf | [P] | SEC staff restates, without disputing, that there is no industry standard definition of "bookings" |
| Perficient, Inc. response letter, Nov 21 2013. https://www.sec.gov/Archives/edgar/data/1085869/000108586913000040/filename1.htm | [P] | Registrant asserts on the record that bookings has no industry standard |

Release 33-10751 footnote 9 sets the boundary: "we use the term GAAP to refer to the FASB Accounting Standards Codification or other comprehensive bases of accounting used in primary financial statements filed with the Commission." Footnote 10 then places operating metrics outside it, noting that operating and statistical measures such as unit sales, employee counts, subscriber counts and advertiser counts are not non-GAAP financial measures.

Because no framework defines them, the SEC requires each company to supply "A clear definition of the metric and how it is calculated."

**The single best citation is the Perficient exchange.** Perficient told the SEC: "However, bookings are not observed to be an industry standard. Common trends or other forward looking statements are at times disclosed, but no common disclosure regarding bookings, bookings growth, backlog, or other equivalents are consistently disclosed by our peer competitors."

SEC staff replied on Dec 11 2013: "The assertions that there is not an industry standard definition of 'bookings' and that your peers do not disclose their bookings or similar metrics are not dispositive as to whether bookings is a key performance indicator that your management uses to manage the business and whether it would be material to investors."

That is SEC staff, in writing, accepting "there is no industry standard definition of bookings" as a premise and arguing only that the absence of a standard does not excuse non-disclosure.

**Not verified, flagged honestly:** the agent could not query the FASB Accounting Standards Codification Master Glossary first-hand, because asc.fasb.org and fasb.org both return HTTP 403 to automated requests. So there is no first-hand confirmation that the string "bookings" appears nowhere in the ASC. The conclusion rests on SEC primary sources instead, which is arguably stronger for a board setting anyway.

### A2. How real companies actually define bookings

All quotes verbatim from filings, all [P].

| Company / filing | Date | Definition | Basis |
|---|---|---|---|
| **Palo Alto Networks**, S-1 | Apr 6 2012 | "We define bookings as non-cancellable orders received during the fiscal period." | Full order value, new orders |
| **SmartRent**, 10-K FY2024 | Mar 5 2025 | "We define Bookings as the contract value of hardware, professional services, and the first year of ARR for binding orders executed during a stated measurement period, including renewals and upgrades." | Hybrid: full value for hardware and services, year one only for recurring, renewals included |
| **Roblox**, S-1 | Nov 19 2020 | "We define bookings as revenue plus the change in deferred revenue during the period and other non-cash adjustments." | Derived from GAAP revenue plus deferred revenue movement |
| **Leonardo DRS**, 10-Q | May 5 2026 | "We define bookings as the total value of contract awards received from the U.S. government for which it has appropriated funds and legally obligated such funds to the Company through a contract or purchase order, plus the funded value of contract awards and orders received from customers other than the U.S. government." | Funded only, excludes unfunded options |
| **Leidos**, 10-K FY2025 | Feb 17 2026 | "Net bookings represent the estimated amount of revenue to be earned in the future from funded and unfunded contract awards and modifications and unissued task orders on sole source IDIQ contracts... We calculate net bookings as the year's ending backlog, plus the year's revenues, less the prior year's ending backlog..." | Funded AND unfunded, plus unissued task orders, computed as a backlog plug, net of downward revisions |
| **Silvaco**, 10-Q Q3 2025 | Nov 2025 | "We define a booking as a signed contract and related purchase commitment from a customer, based on the value set forth in a purchase order." | Purchase order value |
| **Aspen Technology**, CORRESP to SEC | Mar 9 2023 | "Bookings is the total value of customer term license and perpetual SMS contracts signed in the current period, less the value of such contracts signed in the current period where the initial licenses and SMS agreements are not yet deemed delivered, plus term license contracts and SMS agreements signed in a previous period for which the initial licenses are deemed delivered in the current period." | Signed value gated on delivery timing, so bookings can land in a later period than signature |
| **Perficient**, CORRESP to SEC | Nov 21 2013 | "Bookings are calculated as the total contractual client agreements which have been signed (or sold) within the relevant reporting period, adjusted to eliminate any current period acquisitions so as to reflect organic growth in bookings." | Total contract value, organic-adjusted |

Source URLs:
- Palo Alto Networks: https://www.sec.gov/Archives/edgar/data/1327567/000119312512153764/d318373ds1.htm
- SmartRent: https://www.sec.gov/Archives/edgar/data/1837014/000095017025033086/smrt-20241231.htm
- Roblox: https://www.sec.gov/Archives/edgar/data/1315098/000119312520298230/d87104ds1.htm
- Leonardo DRS: https://www.sec.gov/Archives/edgar/data/1833756/000183375626000025/drs-20260331.htm
- Leidos: https://www.sec.gov/Archives/edgar/data/1336920/000133692026000030/ldos-20260102.htm
- Silvaco: https://www.sec.gov/Archives/edgar/data/1943289/000194328925000019/svco-20250930.htm
- Aspen Technology: https://www.sec.gov/Archives/edgar/data/1897982/000189798223000014/filename1.htm
- Perficient: https://www.sec.gov/Archives/edgar/data/1085869/000108586913000040/filename1.htm

**The sharpest contrast for a board audience:** two defense primes, same sector, same fiscal environment, opposite definitions. Leonardo DRS counts only appropriated and legally obligated funds. Leidos counts funded and unfunded awards and unissued task orders on sole-source vehicles, and derives the number as a backlog roll-forward rather than by summing awards. The same contract award produces materially different bookings at the two companies.

### The four sub-questions, answered

| Question | Verified answer |
|---|---|
| **TCV vs ACV vs first-year basis** | All three are in live use. Palo Alto Networks and Perficient use full contract value. SmartRent uses first-year-of-ARR for the recurring component while using full value for hardware and services within the same metric. |
| **Renewals in or out** | Both. SmartRent explicitly says "including renewals and upgrades." Palo Alto Networks is silent. No filing was found that explicitly excludes renewals, so treat "excludes renewals" as common practitioner practice that could not be documented in a filing. |
| **Optional, unfunded or unexercised option value** | Documented, and the biggest swing factor. Leonardo DRS excludes unfunded. Leidos includes unfunded and unissued task orders. SAIC's award announcements state contract value "if all options are exercised" (8-K, Jun 13 2016). https://www.sec.gov/Archives/edgar/data/1571123/000156459016020510/saic-ex991_6.htm |
| **Net vs gross** | Leidos reports net bookings, explicitly "net of any adjustments to previously awarded backlog amounts," so downward revisions on prior awards reduce current-period bookings. Perficient nets out acquired bookings to isolate organic growth. Uber reports Gross Bookings. Most SaaS filers report a gross figure without saying so. |

### The GAAP contrast worth putting in front of a board

ASC 606's remaining performance obligation disclosure has a defined perimeter that bookings routinely crosses. Planet Labs' 10-Q (filed Jun 6 2024) states it plainly: "Remaining performance obligations do not include unexercised contract options, written orders where funding has not been appropriated and contracts which provide the customer with a right to terminate for convenience without incurring a substantive termination penalty." https://www.sec.gov/Archives/edgar/data/1836833/000183683324000062/pl-20240430.htm [P]

Every one of those three exclusions is something a company is free to include in bookings.

### A3. SEC comment letters questioning bookings

Six found on EDGAR, all fetched and read directly [P].

| Registrant | Date | What staff said |
|---|---|---|
| **Harris Interactive** | Mar 7 2013 | "Please provide us, and enhance your disclosure to include, a more complete definition of bookings... Please clarify whether bookings for each quarter are expected to take place over the succeeding four quarters, if these amounts are expected to take place during that quarter only, or if the bookings are expected to take place over the succeeding quarter." https://www.sec.gov/Archives/edgar/data/1094238/000000000013012437/filename1.pdf |
| **Perficient** | Nov 6 and Dec 11 2013 | The "no industry standard definition" exchange quoted above |
| **Cyxtera / Starboard Value Acquisition** | Jun 25 2021 | "We note your response to comment 18 and it is still unclear how bookings is calculated and what it represents. You disclose that bookings is the increase in MRR divided by the term of the contract (months)... As MRR is measured in months, please explain why the change in MRR would be divided again by the term of the contract in months to arrive at bookings." Staff caught an internally incoherent formula. https://www.sec.gov/Archives/edgar/data/1794905/000000000021007872/filename2.txt |
| **LiveRamp** | Feb 15 2023 | "As bookings appear to be an important metric to investors in assessing your performance, please expand your disclosures to clarify how this metric correlates with or relates to subscription revenues." https://www.sec.gov/Archives/edgar/data/733269/000000000023001558/filename2.txt |
| **Uber Technologies** | Feb 4 2019 | "Where you discuss Gross Bookings information on page 2, please revise to provide revenue on a GAAP basis for the same periods discussed giving greater prominence to the GAAP information." https://www.sec.gov/Archives/edgar/data/1543151/000000000019000784/filename1.pdf |
| **NetSuite** | Oct 20 2009 | NetSuite argued "disclosing total contract value may mislead readers because changes in the terms of contracts would have a significant impact on disclosed total contract value," while management discussed bookings growth on the earnings call. https://www.sec.gov/Archives/edgar/data/1117106/000000000009058964/filename1.pdf |

Perficient and Cyxtera are the two to remember. Perficient is the definitional-standard point. Cyxtera is the "the company's own formula did not compute" point.

---

## Part B: ACV and TCV

### B1. Is there an accounting-standard definition?

No, and the SEC has treated the boundary as contested rather than settled. Two comment letters show that how you build ACV can pull it back into the regulated non-GAAP regime.

**Aspen Technology, SEC staff comment letter, Feb 27 2023** [P]. https://www.sec.gov/Archives/edgar/data/1897982/000000000023001919/filename2.txt

> "Based on your description of Annual Contract Value on page 22, this measure appears to meet the definition of a Non-GAAP measure. Tell us how you considered Reg 10(e) of Regulation S-K."

Staff escalated on Mar 27 2023 with the sharpest line in this entire research file (quoted in Aspen's Apr 4 2023 response, https://www.sec.gov/Archives/edgar/data/1897982/000189798223000016/filename1.htm) [P]:

> "However, in your disclosure you state that 'For term license agreements that contain professional services or other products and services, we have included in ACV the portion of the invoice allocable to the term license under Topic 606 rather than the portion of the invoice attributed to the license in the agreement.' As such, you appear to be comingling metric data with GAAP accounting. Please explain why you believe comingling metric data with GAAP adjustments is appropriate. In other words, tell us why this measure continues to be a metric given the GAAP adjustments."

The exchange is the best available proof that ACV has no standard definition. The SEC could not tell from Aspen's own words whether ACV was an operating metric or a regulated non-GAAP financial measure.

### B2. Six definitions of ACV, mutually incompatible

| Source | Date | Definition | Method |
|---|---|---|---|
| **ServiceNow**, S-1 [P] | Oct 31 2012 | "Annual contract value is equal to the first twelve months of expected subscription revenues under a contract." | Year one |
| **Nutanix**, 10-K FY2025 [P] | Sep 24 2025 | "We define ACV as the total annualized value of a contract, excluding amounts related to professional services and hardware. We calculate the total annualized value for a contract by dividing the total value of the contract by the number of years in the term of such contract." | Straight-line average, services and hardware excluded |
| **Arteris**, S-1 [P] | Oct 1 2021 | "We define Annual Contract Value for an individual customer agreement as the total fixed fees under the agreement divided by the number of years in the agreement term... Total fixed fees includes licensing, support and maintenance and other fixed fees... but excludes variable revenue derived from licensing agreements with customers, particularly royalties." | Straight-line average, maintenance included, variable excluded |
| **Pegasystems**, 10-K FY2018 [P] | Feb 20 2019 | "ACV, as of a given date, is the sum of the following two components: the sum of the annual value of each term and cloud contract in effect on such date, with the annual value of a term or cloud contract being equal to the total value of the contract divided by the total number of years of the contract; and maintenance revenue reported for the quarter ended on such date, multiplied by four." | Hybrid: average for subscriptions, annualized actual revenue for maintenance |
| **Aspen Technology**, CORRESP [P] | Mar 9 2023 | "Annual Contract Value is an estimate of the annual value of the Company's portfolio of term license and software maintenance and support contracts..." | Estimate, with ASC 606 allocation applied inside it |
| **KeyBanc Capital Markets & Sapphire Ventures**, 2024 SaaS Survey, 15th Annual, p.19 [S] | Oct 2024 | "ACV = ARR / Total # of Customers" | Not a contract metric at all: average revenue per customer |

KBCM sourcing note: retrieved from a third-party mirror (https://www.cfodesk.co.il/wp-content/uploads/2024/10/2024_kbcm_sapphire_saas_survey.pdf) because the official key.com URL now 404s. 40 pages, KeyBanc/Sapphire branded, internally consistent, but not confirmed against a first-party host, so tagged [S]. Official landing page: https://info.sapphireventures.com/2024-keybanc-capital-markets-and-sapphire-ventures-saas-survey

### Does ACV include one-time fees, implementation or professional services?

Verified disagreement, all [P].

| Position | Source | Language |
|---|---|---|
| Excludes services and hardware | Nutanix 10-K FY2025 | "excluding amounts related to professional services and hardware" |
| Excludes services and partner revenue | BigCommerce 10-K FY2021 | "we include only subscription plan revenue and exclude partner and services revenue and recurring services revenue" |
| Includes support and maintenance | Arteris S-1 | "Total fixed fees includes licensing, support and maintenance and other fixed fees" |
| Includes maintenance as an annualized run-rate | Pegasystems 10-K FY2018 | "maintenance revenue reported for the quarter ended on such date, multiplied by four" |
| Splits the invoice under ASC 606 | Aspen Technology, quoted by SEC staff | "we have included in ACV the portion of the invoice allocable to the term license under Topic 606" |

BigCommerce: https://www.sec.gov/Archives/edgar/data/1626450/000156459022008093/bigc-10k_20211231.htm

Practitioner-side [W]: FLG Partners SaaS Glossary by Eric Mersch, https://flgpartners.com/saas-glossary-metrics-benchmarks-ratios/ (no publication date on page). ACV is "The annual value of a customer's Subscription Revenue only. It does not include non-recurring activities." Bookings is "The dollar value of the New or Renewal Subscription Bookings amount invoiced on the date defined by the contract terms." Note FLG's bookings definition is invoice-triggered, which conflicts with every signature-triggered definition in the filings above.

### The ramped contract problem

**Verified:** the definitions split into two camps that mechanically produce different answers on a ramped deal. ServiceNow's "first twelve months of expected subscription revenues" returns year one. Nutanix, Arteris and Pegasystems all divide total contract value by the number of years, returning the average. SmartRent uses "the first year of ARR."

On a $100k / $200k / $300k three-year ramp, that is **$100k under ServiceNow and SmartRent versus $200k under Nutanix, Arteris and Pegasystems. A 2x spread on the identical deal.**

**Not verified, flagged clearly:** no filing, SEC letter or benchmark report was found that explicitly names the ramped-deal problem or works a numeric ramp example. EDGAR full-text searches for "ramped contracts", "ARR" + "ramp periods", "annualized value of the first year", and "contractual ramp" + "ARR" returned effectively nothing. The 2x spread above is derived arithmetic applied to published formulas, not a claim any of those companies made. Treat it as a sound derivation from primary definitions, not a quoted finding.

### Does TCV include optional renewal periods?

| Treatment | Source | Language |
|---|---|---|
| Committed term only, but with modeled assumptions | Livongo Health 8-K, Sep 5 2019 | "We define total contract value as contractually committed orders to be invoiced under agreements initially entered into during the relevant period... we assume an average member enrollment rate. While some of our agreements include clauses providing for termination at the convenience of the client, when evaluating total contract value, we assume an agreement will be serviced for the full term." |
| Stated term, no adjustments | Evolv Technologies 8-K, Aug 10 2022 | "We define Total Contract Value, or TCV, of orders booked as the total value of the contract over the specified term. Our calculation of TCV is not adjusted for the impact of any known or projected future events... Our calculation of TCV may differ from similarly titled metrics presented by other companies." |
| All options, assumed exercised | SAIC 8-K, Jun 13 2016 | "a total contract value of approximately $141 million if all options are exercised" |
| Portfolio stock, not a per-deal flow | Aspen Technology CORRESP, Mar 9 2023 | "Total Contract Value is the aggregate value of all payments received or to be received under all active term license and perpetual SMS agreements, including maintenance and escalation." |

Livongo: https://www.sec.gov/Archives/edgar/data/1639225/000162828019011412/lvgoq22019erex991.htm
Evolv: https://www.sec.gov/Archives/edgar/data/1805385/000162828022022221/evlv-20220810exx991.htm

Two flags for a board conversation. Livongo's TCV is an estimate, not a contracted number, because it assumes an enrollment rate and assumes full-term service even where the customer holds a termination-for-convenience right. And Aspen's TCV is a balance rather than a period flow, so it is not additive with anyone else's TCV even in principle.

**Scope note:** the "TCV includes all option years" convention is documented in government services announcements. No commercial SaaS filer was found that explicitly states whether auto-renewal terms are in or out of TCV.

### ACV vs ARR, and why they get conflated

Nutanix's 10-K FY2025 makes the relationship explicit and shows where the conflation starts: "We calculate ARR as the sum of annual contract value ('ACV') for all subscription contracts in effect as of the end of the period."

| | ACV | ARR |
|---|---|---|
| Unit | Per contract | Portfolio total |
| Includes non-recurring? | Sometimes (Arteris includes maintenance; SmartRent's bookings include hardware and services) | Intended to be recurring only |
| Timing anchor | Contract signature or term | Point-in-time run rate |
| KBCM's usage | ARR ÷ customer count | The numerator |

Nutanix's own warning, verbatim: "ARR does not have any standardized meaning and is therefore unlikely to be comparable to similarly titled performance measures presented by other companies."

### The strongest single proof that ACV methodology is a company choice

**Pegasystems changed its ACV formula mid-stream and had to explain it to the SEC.**

Staff comment, Sep 13 2023 [P]: "Tell us and clarify in your disclosure how you changed your ACV calculation methodology for maintenance and all contracts less than 12 months. Explain how the new methodology aligns with other contract types. Quantify how previously disclosed ACV amounts have been updated." https://www.sec.gov/Archives/edgar/data/1013857/000000000023010125/filename2.txt

Pegasystems' response, Sep 27 2023 [P]: "In 2023, the Company revised its ACV methodology for maintenance and all contracts less than 12 months as its overall client renewal rate exceeds 90%. This simplification... ensures that ACV for all contract types and lengths is consistently calculated as the total contract value divided by the duration in years... The Company believes the simplified methodology better represents the current value of its contracts and better aligns its definition with comparable companies." https://www.sec.gov/Archives/edgar/data/1013857/000101385723000193/filename1.htm

Note the phrase "better aligns its definition with comparable companies." A public company restated its ACV methodology partly to look like its peers, and quantified the restatement at under $3 million, or 0.3% of total ACV, across 2022 quarters.

### B3. What the VC benchmark sources actually say

Honest scorecard. Most of this came up empty.

| Source | Result | Tag |
|---|---|---|
| **KeyBanc / Sapphire**, 2024 SaaS Survey, Oct 2024 | Found a definition, and it is idiosyncratic: "ACV = ARR / Total # of Customers". Reports median ACV of $54K (2022), $56K (2023), $62K (2024E), n=62. No definitions appendix or glossary in the deck. | [S] |
| **Bessemer**, State of the Cloud 2024 | Fetched and confirmed: contains no definitions of ACV, TCV, ARR or bookings. Uses "ACV" in analysis without defining it. The 2025 URL returns 404. | [P] for the negative finding |
| **SaaS Capital** blog index | Fetched. No post found defining ACV, TCV or bookings. | [P] for the negative finding |
| **ICONIQ Growth** | Reports page 404s to fetch. Not verified. | Unverified |
| **OpenView Partners** | Not checked, search budget exhausted. | Unverified |
| **Battery Ventures** | Not checked, same reason. | Unverified |
| **FLG Partners** SaaS Glossary | Definitions captured above. No date on page. Vendor advisory content. | [W] |

**Did any of them acknowledge the inconsistency?** Not in the sources verified. Bessemer does not define the terms at all. KeyBanc defines ACV in a way that contradicts every SEC registrant read here, without flagging that it is doing so.

**The explicit acknowledgments of non-comparability all come from issuers, not from VCs**, which is itself a usable finding:

- Nutanix, 10-K FY2025 [P]: "ARR does not have any standardized meaning and is therefore unlikely to be comparable to similarly titled performance measures presented by other companies."
- Evolv Technologies, 8-K Aug 10 2022 [P]: "Our calculation of TCV may differ from similarly titled metrics presented by other companies."
- Silvaco, 10-Q Q3 2025 [P]: key performance indicators "may differ from similarly titled metrics or measures presented by other companies."

---

## Open gaps in this research

Recorded so the card can carry honest uncertainty rather than false confidence.

1. No first-hand confirmation that "bookings" appears nowhere in the FASB ASC Master Glossary. FASB blocks automated requests. Conclusion rests on SEC sources instead.
2. No Big 4 publication stating in terms that bookings is not a GAAP concept. Deloitte and PwC both require authentication.
3. No source explicitly addresses the ramped-contract ACV question. The 2x spread is derived arithmetic, not a quoted position.
4. No commercial SaaS filer found stating whether auto-renewal terms are in or out of TCV. Only government services "if all options are exercised" language.
5. No filing found that explicitly says bookings excludes renewals. SmartRent explicitly includes them; no documented counterpart on the other side.
6. ICONIQ, OpenView and Battery benchmark definitions not retrieved.
7. KeyBanc 2024 survey PDF came from a third-party mirror, not a first-party host.
