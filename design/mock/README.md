# Hot Seat — interactive design mock

`hot-seat-mock.html` is a single self-contained file. Open it in a browser; no build, no server, no network.

Published copy: https://claude.ai/code/artifact/161247a7-f92b-404a-86bd-fd2bdd63d7be

## What it is

The design reference the real build implements. Five rounds of playtesting are baked into it, and every design decision it embodies is recorded in `docs/plans/2026-07-30-001-feat-hot-seat-daily-plan.md`. When the plan and the mock disagree, **the plan wins** — it was updated after the last mock revision.

## What is real vs faked

| Real, and worth trusting | Faked, and not worth trusting |
|---|---|
| The interaction shape of every screen | Grading — keyword matching stands in for the LLM |
| The Ace Attorney turn structure, dialogue box, interjection cards | The corpus — 8 hand-written cards, not the extracted 214 |
| The credibility bar and its penalties | Progress numbers, streaks, coverage bars — all hardcoded |
| The board-answer rubric and its five outcome tiers | Persistence — nothing survives a reload |
| The hesitation timer (thinking time, not typing time) | The board members' dialogue — scripted, not generated |
| Brand system: colors, type, hard-shadow components, dot grid | |

The scripted grader is the main thing to keep in mind while playing: a well-worded answer using unexpected synonyms may under-grade, which the real LLM grader will not. Judge the *feel*, not the verdicts.

## Things to look at specifically

1. **The trap turn** (Hot Seat, board meeting, turn 3). Five distinct outcomes depending on whether you counter with your own benchmark, bridge to strategy, both, merely challenge, or accept the number. This is the rubric that generalizes to every question in the real build.
2. **Hesitating past 8 seconds** in the Hot Seat. Sweat drop, and the room notices in character. The latency measurement this depends on is why the plan specifies low reasoning effort — a slow first token corrupts it.
3. **The worked-formula reveal** on the churn question. Compute answers show the formula, then the formula applied.
4. **Reference mode** — the only part that needs no network and no account, and the part that ships first.

## Assets

`avatar-pixel-braids-122.png` — Brandon's character from BrandonSellers.com, nearest-neighbour downscaled to 122×129 and palette-quantized to ~2KB so it can be inlined as a data URI. Source: `~/Personal/Brandon_Sellers_Website/img/avatar-pixel-braids.png`.

The three board members are hand-authored pixel matrices drawn to canvas at runtime (see `SPRITES` in the file). They cost nothing, scale to any size, and new characters for future scenarios are a few lines of data each.
