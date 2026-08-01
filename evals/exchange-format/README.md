# Eval — does the exchange format generate?

The format is only viable if a model can produce it reliably from a corpus card
plus the board pack. Hand-writing exchanges is the scope trap that killed the
authored-case direction, so this had to be measured rather than assumed.

Generator prompt: `packages/functions/src/lib/exchange.js`

## Result, 2026-07-31

Twenty exchanges, two each across ten metrics, audited by an independent call
that was given the pack and told to check the arithmetic itself.

| | Run 1 | Run 2 |
|---|---|---|
| Fabricated figures | 0 | **0** |
| Opens on the player's ask | 20% | **100%** |
| Derived or interpreted aloud | 9/20 | **2/20** |
| Exactly one question | 100% | **100%** |
| Half-assist present | 100% | **100%** |
| Overall pass | 55% | **90%** |

**Zero fabricated figures across forty generated exchanges.** That was the
result that had to be clean: a director quoting a number that is not real would
make the game actively misleading, and it is the failure mode a model is most
prone to.

## What run 1 taught

Run 1's "no conclusion" rule was wrong as written. It flagged a director saying
"NRR is 102 percent", which is correct behaviour, because directors hold the
board pack. The real failure is a director *deriving* the figure aloud or saying
what it *implies*. Separating those three things took the leak rate from 9/20 to
2/20 and the pass rate from 55% to 90%.

Making "open on the player's ask" a numbered constraint rather than a line in
the brief took it from 4/20 to 20/20. The model honours the numbered list and
skims the prose.

## Re-running

Any change to the generator prompt invalidates these numbers. Re-run before
trusting it.

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
