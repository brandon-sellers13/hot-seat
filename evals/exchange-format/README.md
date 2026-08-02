# Eval — does the exchange format generate?

The format is only viable if a model can produce it reliably from a corpus card
plus the board pack. Hand-writing exchanges is the scope trap that killed the
authored-case direction, so this had to be measured rather than assumed.

Generator prompt: `packages/functions/src/lib/exchange.js`
Harness: `run.js` in this directory.

## Re-running

Any change to the generator prompt invalidates the recorded numbers.

```bash
set -a && . ./.env && set +a && node evals/exchange-format/run.js
```

Forty generations plus forty audit calls, a few cents at the measured rate. It
runs both arms described below and writes `results-<date>.json`.

---

## Result, 2026-08-02: adding the shape parameter

The change under test is the per-exchange shape, added so that a twenty-exchange
meeting is not twenty benchmark challenges in a row.

**These numbers are not comparable to the 2026-07-31 run below.** The harness
that produced those numbers was never committed, only its results were, so there
was nothing to re-run and `run.js` had to be written from scratch. A different
auditor produces different absolute rates, and the drop from 90% to 35% is
mostly that rather than the generator getting worse.

So this run has two arms through the same auditor. The control arm generates
with no shape at all, which is exactly what the generator did before the change.
That comparison is internally valid even though neither column can be read
against 2026-07-31.

| | Shaped | Control (no shape) |
|---|---|---|
| Exchanges | 20 | 20 |
| **Fabricated figures** | **0** | **0** |
| Opens on the player's ask | 100% | 90% |
| Derived or interpreted aloud | 9/20 | 6/20 |
| Exactly one question | 100% | 100% |
| Half-assist present | 60% | 30% |
| Shape honoured | 100% | n/a |
| Overall pass | 35% | 15% |
| Median latency | 11.3s | 10.6s |

**Zero fabricated figures in both arms.** That is the result that had to stay
clean, and shapes did not disturb it.

Shapes beat no shapes on every criterion except one. They double the half-assist
rate, which is the thing that makes the room read as colleagues rather than
examiners, and they take opening on the ask to twenty out of twenty.

**The exception is real: shaped exchanges interpret aloud more often**, nine of
twenty against six. Giving a director a role to play makes them likelier to say
what their figure means for the decision, which is the player's job and the
constraint that most directly kills an exchange. It is the largest remaining
defect in generation, and it is recorded rather than fixed, because two attempts
at fixing it moved the number by less than the run-to-run noise at twenty
samples.

Per shape, pass rates are `director-wrong` 3/5, `unsettled` 2/5, and `diagnosis`
and `director-right` 1/5 each. Those last two are the shapes that most invite a
director to take a position, which is consistent with the defect above.

### Two things this run got wrong before it got them right

Both are auditor failures, and both are worth keeping, because a grader
measuring the wrong thing is the exact failure this project has already had
twice in its spend controls. It looks rigorous and answers a different question.

**The first auditor scored 0% against a generator that was mostly fine.** It was
given the board pack alone and told that anything absent from it was invented.
That flagged the player's own ask, which hard constraint 2 requires the opening
line to name, and it flagged external benchmarks, which come from the metric
card and which the second worked example in the format brief is built entirely
out of. Thirteen of its twenty-four fabrication reports were the string
`$6 million`.

**The second auditor inverted the interpret-aloud criterion.** It reported
failures like "stops short of stating the decision implication", which is the
format working exactly as designed. The check now says so explicitly in the
prompt, twice, because saying it once was not enough.

---

## Result, 2026-07-31 (superseded, different harness)

Twenty exchanges, two each across ten metrics, audited by an independent call.
Kept for the findings rather than the rates, which cannot be reproduced.

| | Run 1 | Run 2 |
|---|---|---|
| Fabricated figures | 0 | **0** |
| Opens on the player's ask | 20% | **100%** |
| Derived or interpreted aloud | 9/20 | **2/20** |
| Exactly one question | 100% | **100%** |
| Half-assist present | 100% | **100%** |
| Overall pass | 55% | **90%** |

### What run 1 taught

Run 1's "no conclusion" rule was wrong as written. It flagged a director saying
"NRR is 102 percent", which is correct behaviour, because directors hold the
board pack. The real failure is a director *deriving* the figure aloud or saying
what it *implies*. Separating those three things took the leak rate from 9/20 to
2/20 and the pass rate from 55% to 90%.

Making "open on the player's ask" a numbered constraint rather than a line in
the brief took it from 4/20 to 20/20. The model honours the numbered list and
skims the prose.

## A passing example

> **Elena:** You're asking us to approve more acquisition budget. Net revenue retention for the opening cohort was 102% in Q3.
>
> **Ravi:** Gross revenue retention was 94%. 21 of the 420 opening accounts fully cancelled.
>
> **Camille:** Another 23 downgraded but stayed. Expansion was $912,000.
>
> **Adrian:** The pack does not show expansion by customer.
>
> **Camille** *(to you)*: Does the 102% NRR establish broad-based strength in the opening cohort?
