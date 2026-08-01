# Design review — how the player sees the company's numbers

`gpt-5.6-sol` at high effort, 2026-07-31. Fourth review in this sequence, and
the first that ends in a buildable next step rather than a rewrite.

**Verdict: sound enough for a falsification prototype, not for content
production.** With a predeclared pass bar: experts must beat fast novices by
20 percentage points on accuracy AND 25% on time-to-correct, or stop.

---

## 1. The core mechanic

**The claim is false as written. If keyword search is available, the mechanic is dead.**

A fast reader with no metric knowledge will beat a slow expert on retrieval questions and remain competitive overall. The design currently conflates four different advantages:

- Metric knowledge
- Familiarity with the pack’s information architecture
- Visual scanning and reading speed
- Search/query proficiency

Only the first is intended.

The cheapest winning strategy for someone who knows nothing is:

1. Use the two-minute preview to map tabs, headings, and headline KPI locations.
2. Search the acronym or exact phrase from the question.
3. Copy any prominently displayed derived metric.
4. For computations, search the metric and use the adjacent bridge rows or formula labels.
5. For judgment, give a reusable answer: “segment by cohort and customer type, validate the driver, assign an owner, intervene on the weakest segment, and report progress next meeting.”
6. If uncertain, defer rather than risk a wrong answer—especially if deferral receives partial credit.

That strategy farms retrieval, judgment, and integrity points without demonstrating metric knowledge.

Removing search is necessary but insufficient. Without search, repeated play will reward memorized page locations and motor speed. The alternative is:

- Disable full-text search.
- Organize data by **source**, not by metric.
- Do not place formulas, metric definitions, derived values, and their inputs together.
- Vary row order and exact layout between companies while preserving source semantics.
- Score retrieval, formula knowledge, arithmetic, and judgment separately.
- Measure whether experts outperform fast-reading novices on first exposure.

The assertion that “only two question types use the pack” does not rescue the mechanic. It merely makes the supposed core mechanic irrelevant to half the game. Definition and judgment cannot compensate for a broken retrieval design.

Judgment should also not be pack-independent. “What are you doing about it?” without evidence produces generic management language. Require the player to cite a specific driver from the pack and connect it to an action, owner, and review point.

---

## 2. Board-pack structure

Use **a source-oriented operating evidence pack**, not a realistic board appendix, searchable table, metric tabs, or query interface.

| Structure | What it rewards | Verdict |
|---|---|---|
| Realistic board appendix | Pre-reading, familiarity with board conventions, and copying reported KPIs | Derived metrics make retrieval trivial. Use only as visual inspiration. |
| Searchable table | Keyword matching, scanning, and query speed | Fatal to the mechanic. |
| Metric-labelled tabs | Memorizing the UI taxonomy: “Retention,” “CAC,” “LTV” | Telegraphs where the answer is and becomes spatial memory after one run. |
| Ask-for-what-you-want interface | Vocabulary, prompt construction, and learning what the query system accepts | Becomes prompt engineering. It may also infer the formula for the player. |
| Source-oriented evidence pack | Mapping a metric to the business records that contain its inputs | Closest to the intended skill. |

Use sections such as:

1. Billing and subscription movements
2. Customer cohorts
3. Revenue and gross-margin records
4. Acquisition spend and funnel volumes
5. Product activity
6. Service and support operations

The navigation may use tabs, but the tabs must be source-labelled—“Billing,” “Cohorts,” “Acquisition”—rather than answer-labelled—“NRR,” “CAC,” “Retention.”

Do not reproduce a raw warehouse or spreadsheet. Each section should contain normalized operating records with explicit period, segment, unit, and scope. Otherwise the player is fighting fictional data hygiene rather than demonstrating metric fluency.

This still tests some company-specific information architecture. Reduce that contamination by varying where rows appear between scenarios while keeping the semantic source model stable. An expert should know that retention inputs belong in cohort and subscription-movement records, not that NRR is always on page seven.

---

## 3. Size and treatment of derived metrics

Do not define size by page count alone. Define it by navigation depth and distractor density.

For one scenario, use approximately:

- **6 source sections**
- **8 screen-length pages**
- **60–90 labelled rows**
- **2–4 periods where relevant**
- **150–250 numeric cells**
- No required input more than two navigation decisions from the index
- At least two plausible distractors for each tested input: wrong period, wrong segment, wrong basis, or wrong cohort

Anything substantially smaller becomes visual recognition. Anything substantially larger turns thirty seconds into arbitrary hunting.

Do not choose “derived metrics” or “raw inputs only” globally. Choose per question type.

### Definition questions

Close the pack. Definitions, boundaries, and traps are cold recall.

### Retrieval questions

If “NRR: 94%” is printed and the question is “What is our NRR?”, this tests copying, not metric knowledge.

Either:

- Treat it as a separate **command-of-company-numbers** score, not metric mastery; or
- Present several scoped values and ask which one answers the chair’s question—for example reported NRR versus logo retention, monthly versus annual cohorts, or enterprise versus company-wide.

Do not award substantial metric-mastery credit for copying an exact printed figure.

### Standard computation questions

Provide the required inputs but not the answer. For NRR, that could be:

- Opening cohort ARR
- Expansion
- Contraction
- Churn

Do not print the NRR formula in the pack. Provide a calculator. The player’s task is choosing the correct inputs and operation, not performing error-prone mental arithmetic.

### Adjustment questions

Print the canonical reported metric and expose the components needed for one adjustment. Ask for one bounded alteration, such as excluding a specified account group or using a different cohort boundary.

Do not force the player to reconstruct an entire metric and then make several adjustments. That tests transcription endurance.

### Judgment questions

Show the derived trend and enough diagnostic evidence to support action. Require:

1. The conclusion
2. A cited company fact
3. The proposed action
4. An owner or next decision point

Judgment without evidence access will collapse into canned language.

The governing rule should be: **one principal difficulty per question**. Do not simultaneously make navigation, formula recall, multi-step arithmetic, ambiguity resolution, and board communication binding under the same short clock.

---

## 4. Timings

The proposed timings are not defensible.

Two minutes with the full pack is neither realistic preparation nor a clean game mechanic. In a real board process, the pack is pre-read hours or days earlier. In the game, two minutes becomes a speed-reading and page-memorization round.

Thirty seconds for every lookup also ignores task complexity. Finding one reported value and recomputing NRR from four components are not equivalent.

“Answer spoken, no clock” is worse. The player can capture the numbers, let the pack close, think indefinitely, and dictate a polished answer. That removes the meeting pressure and directly encourages hedging and rambling.

Use:

- **Untimed UI tutorial**, with a different company from the scored scenario.
- **45 seconds of scenario orientation**, showing company, period, and agenda—not unrestricted appendix browsing.
- **Definition:** pack closed; 5 seconds preparation; 30 seconds or 60 spoken words.
- **Retrieval:** 20 seconds pack access; 10 seconds preparation; 30 seconds or 60 words.
- **Single-step computation:** 40 seconds pack/calculator access; 10 seconds preparation; 35 seconds or 75 words.
- **Judgment:** 20 seconds evidence review; 10 seconds preparation; 45 seconds or 90 words.

These numbers allow an expert roughly:

- 2–3 seconds to recognize the metric
- 5–10 seconds to navigate
- 5–10 seconds to verify period and scope
- Additional time for calculation where the question actually requires it

Instrument all timings before enforcing them. If knowledgeable players routinely fail the lookup window, the window is testing interface speed. If novices routinely succeed, the pack is leaking the answer.

Do not use one aggregate timer score. Report accuracy first and speed second. Otherwise reading speed, disability, and dictation latency become metric-mastery penalties.

---

## 5. Running out of time

“I’ll come back to you” is legitimate only when the answer is unavailable, ambiguous, or unsafe to state confidently. It is a cop-out when the requested figure is clearly present and the player simply failed to retrieve it.

Score it on two separate dimensions:

- **Metric command:** zero if the answer was available and the player failed to provide it.
- **Executive calibration/integrity:** credit for refusing to invent a number.

A bare deferral should receive no credit. A valid deferral must identify:

1. What cannot be answered reliably
2. What data or definition is missing
3. Any safe directional statement
4. Who will resolve it
5. A specific follow-up time or channel

For example:

> “I don’t have enterprise gross-logo churn separated from downgrades in this pack, so I won’t give you a false figure. Finance and CS can reconcile it and I’ll circulate the answer by 3 p.m.”

Include a small number—roughly **10% of questions**—that are intentionally unanswerable from the available evidence. Otherwise deferral is never genuine calibration; it is merely failure insurance.

For answerable questions, deferral should cap the total question score at roughly 20–25%, representing integrity but not competence. This prevents “defer whenever uncertain” from becoming an optimal strategy.

---

## 6. Predicted failure mode

The first playtest will break in the following order.

### 1. Novices search and copy

They will search “NRR,” read the displayed number, and perform nearly as well as experts on retrieval.

**Alternative:** disable search, remove metric-labelled pages, and organize by source records.

### 2. Arithmetic and transcription dominate computation

Experts will identify the right inputs but lose points by mistyping one value or running out of time. Fast spreadsheet users will outperform metric experts.

**Alternative:** provide a built-in calculator, log which source values were selected, and score input selection separately from arithmetic output.

### 3. Players learn pack coordinates

After one scenario, performance will improve because players remember that retention is in the second tab and CAC is near the bottom of the acquisition page.

**Alternative:** use multiple isomorphic layouts with stable source semantics but different row order, density, and placement. Evaluate the core mechanic primarily on first exposure.

### 4. Generic judgment language will score too well

Players will discover a reusable answer involving segmentation, root-cause analysis, ownership, and monitoring. The LLM will reward fluency even when no company evidence is used.

**Alternative:** require one correctly cited fact from the scenario and deterministically verify the number or trend before allowing full judgment credit.

### 5. The LLM will become the source of scoring variance

The corpus can ground definitions and traps, but it does not by itself provide deterministic grading for fictional company figures, adjusted calculations, period scope, and rounding.

**Alternative:** grade numeric values, units, period, segment, and tolerance deterministically. Use the LLM only for explanation, caveats, and action quality.

### 6. Ambiguous questions will create fake difficulty

Questions such as “What is it excluding the bridge accounts?” can have multiple defensible denominators, cohort treatments, and period interpretations.

**Alternative:** state the period, population, exclusion rule, and required rounding unless ambiguity recognition is explicitly the tested skill.

### 7. The overall score will hide that the mechanic failed

Definition recall may separate experts from novices while retrieval does not, allowing the total score to look acceptable.

**Alternative:** maintain separate subscores and predeclare the core-mechanic success criterion. Retrieval/computation must independently show a knowledge advantage.

### 8. “Bring your own numbers” will expose schema and definition conflicts

Companies use the same labels for different scopes, omit required cohort fields, and calculate metrics differently. Familiarity with one’s own dashboard may also overwhelm metric knowledge as the main advantage.

**Alternative:** treat company-data ingestion as a later schema-mapping product with explicit definition reconciliation, required-field validation, and provenance review. Do not use it to justify the present mechanic.

## Build decision

**As written, no. A search-disabled, source-oriented version is sound enough only for a falsification prototype—not for content production.**

Build first:

- One static HTML pack
- Six source sections and roughly 150–200 cells
- Twelve questions: six retrieval and six computation
- No definitions, judgment prompts, narrative, voice integration, or LLM grading
- Deterministic numeric grading
- Logging of every click, selected input, answer, and elapsed time
- A built-in calculator
- Twelve test players selected specifically as fast metric novices and slower metric experts

The prototype passes only if the slower experts achieve both:

- At least a **20 percentage-point accuracy advantage**, and
- At least a **25% advantage in median time-to-correct-answer**

If fast novices match or beat them, stop. The mechanic is testing information retrieval rather than metric knowledge, and no additional writing will repair it.


---
[in 1301 out 9471 reasoning 6724]
