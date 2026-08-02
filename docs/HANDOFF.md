# Handoff — picking up at M4

Written at the end of the session that built M1 through M3 and fixed what review
found in them. Read this and `docs/plans/2026-07-31-002-feat-the-meeting-plan.md`
and you have everything. PR #1 is open and contains all of it.

---

## What the game is, in one paragraph

You are VP of Marketing. You walk into a board meeting having asked for
something. Four directors work through your numbers, disagree with each other,
and turn to you. You answer out loud, using your own dictation tool. The board
pack is on the table. The unit of play is an **exchange**: a short conversation
between directors that lands on one answerable question, generated from a corpus
card plus the company's pack.

---

## State: what is built, live and verified

| | |
|---|---|
| Repo | https://github.com/brandon-sellers13/hot-seat, branch `feat/the-meeting` |
| Live | https://hotseat-brandonsellers.netlify.app |
| Tests | 233 passing |
| Supabase | `uwqmkstcuwfzgkizcdjt`, schema + RLS applied, RLS verified 9/9 |
| Functions live | `grade`, `exchange` (`interrogate` is dead code, still deployed) |
| Verdict schema | `1.1.0` |

**Verified in production, not assumed:**
- An exchange generates from a card plus the pack in ~9s and quotes only figures
  that exist in the pack.
- The generator's own reference answer scores top tier against the grader. This
  is the check that the two halves of the loop agree; if it ever fails, they have
  drifted apart.
- A hedge scores wrong. A deferral on an answerable question scores wrong.
- Cross-tenant reads are refused at the database.
- The global spend ceiling reads live data and blocks when set to zero.
- **Generation is metered.** Attempting the abuse against production: an
  oversized pack is refused with 413, unanswered generation is cut off after
  exactly 20 with `meeting_over`, and the weekly cap binds after 10 meetings.

**Built, not yet assembled into a meeting:** `/meeting` runs exactly one
exchange, then offers another. That is M4's job.

---

## The decisions that hold, with the evidence

### Generation runs on `gpt-5.6-luna` at `low` effort

Measured across a model and effort matrix, ten metrics per configuration:

| | $/exchange | 20-exchange meeting | Median latency |
|---|---|---|---|
| Sol, low | $0.0605 | $1.21 | 21.5s |
| Terra, low | $0.0217 | $0.43 | 10.1s |
| Luna, medium | $0.0033 | $0.066 | 16.9s |
| **Luna, low** | **$0.0020** | **$0.040** | **9.1s** |

Same format compliance across all of them (10/10 on exactly-one-question). Luna
low is 29x cheaper and 2.4x faster than Sol, which was the original default and
had never been tested against anything.

**Cost is no longer the binding constraint.** $172-296 per 1,000 users per year
against $1,207 previously confirmed. $1,500 now buys ~32,000 long meetings where
it used to buy ~9,000 shorter sessions. **The ~2 meetings/week cap should be
reset**: it existed because sessions were effectively the entire bill, and that
is no longer true. Set it to whatever stops scripts.

### The pack is organised by source, never by metric

Sections are named for systems of record — Billing, Cohorts, Acquisition — not
for the metrics derived from them. There is no "Retention" tab, because knowing
that retention inputs live in subscription movements **is** the knowledge under
test. Only the open section is written to the DOM, so the browser's own find
cannot cross tabs.

Both properties are guarded by tests in `packages/app/src/lib/__tests__/pack.test.js`.
If a future change puts NRR's opening cohort and its movements in the same tab,
that test fails rather than a playtest.

### Headline metrics ARE printed

The board holds the packet and already knows NRR. What gets worked out in the
room is the adjustment, the decomposition, or the cut nobody put on a slide.
This reverses an earlier rule and it came directly from playtesting.

### Grading is two graders, not one

- **Recall** ("what is net revenue retention") grades against the corpus facet.
  Unchanged, and correct.
- **Exchanges** ("is this lead quality or the product") grade against the
  reference answer the generator emits, plus the pack. The facet is useless here
  because the answer is in no facet.

Measured: facet grader 3/9 on stance fixtures, exchange grader 8/9.

### Verdicts carry a stance

`countered | conceded | refused | accepted | none`, separate from whether the
move worked.

- **Conceded** to a director who is right, then redirected on a second sourced
  figure, is **top tier**. Fighting a correct director is wrong however fluent.
- **Refused** on a question the pack cannot settle, naming the cut that would,
  is **correct**. Refusing an answerable one is deferral as failure insurance and
  scores wrong.

The caller tells the grader whether a question is answerable. The grader must not
guess.

---

## M4: the meeting

Assemble exchanges into a session. Mostly assembly rather than discovery, which
is why it was left for a fresh start.

**Half of it already exists.** `/exchange` owns the session lifecycle, because
that is what meters spend. It creates a `sessions` row on the first exchange and
returns `session_id`, `turn`, and `turns_remaining`; pass `sessionId` back on
every subsequent call or you start a new meeting and burn the weekly cap. Do not
re-create session handling in the client.

**What M4 actually has to build:**

1. **Loop the exchanges** using `turns_remaining` to know when the meeting is
   over. Short meeting is 6, long is 20; `LIMITS.exchangesPerSession` is the
   server-side ceiling at 20.
2. **The ask persists.** Every exchange opens on what the player came in for, so
   one ask threads through the whole meeting. `ASKS` in `packages/app/src/lib/board.js`.
3. **Card selection.** `ANSWERABLE` in `packages/app/src/lib/pack/arbor.js` lists
   what the pack can support. Do not draw outside it: asking about a metric whose
   inputs are absent is what makes the generator invent them. Avoid repeats within
   a meeting, and vary the stance — not twenty benchmark challenges in a row.
4. **Credibility.** The `sessions` table already has a `credibility` column,
   default 5, unused. Drain on wrong, drain harder on `stance: accepted`, which
   is taking a figure you should have tested. Zero adjourns.
5. **End the meeting properly:** set `ended_at` and `outcome` on the session.
   `session_outcome` is an existing enum: `survived | wounded | burned | abandoned`.
6. **The outcome reflects the ask.** Did the board approve, defer, or redirect
   it? That is the ending, not a percentage.
7. **Generation takes ~9 seconds.** Pre-generate the next exchange while the
   player answers the current one, or the meeting stalls twenty times.

**Not in M4:** narrative frame and company choice (M5), character art (M6).


---

## Traps, all found the hard way

### Netlify

- **`--filter @hot-seat/app` rebases `--functions`** to
  `packages/app/packages/functions/src`, which does not exist. Use
  `--filter @hot-seat/functions` with absolute paths.
- **`--no-build` skips the netlify.toml step that finds functions.** A deploy
  with a bad functions path and `--no-build` shipped **zero functions** and
  replaced a working deploy. Production was down until it was noticed.
- **Functions deploy from cache by default.** A code change can appear deployed
  and not be. Use `--skip-functions-cache` when function code changed.
- **A deploy reporting "0 functions" does not mean they are missing.**
- **`netlify env:import` PRINTS every value to the terminal.** Use `env:set`.
- **`env:set --secret` requires an explicit `--context`**; it refuses `dev`.
- **`NODE_VERSION` in `[build.environment]` sets the BUILD version only.** The
  serverless runtime needs `AWS_LAMBDA_JS_RUNTIME`. Left unset, functions ran on
  end-of-life Node 20 and every grading call 502'd while the site looked healthy.

The working deploy command:

```bash
netlify deploy --prod --no-build --skip-functions-cache \
  --dir "$(pwd)/packages/app/build" \
  --functions "$(pwd)/packages/functions/src" \
  --site 389e4a6f-92fb-4fdb-b1b7-d618a4732287 \
  --filter @hot-seat/functions
```

### SvelteKit

- **`$env/dynamic/public` does not work with a static adapter.** It is resolved
  by a server at runtime and there is no server, so the values came back empty,
  `isConfigured()` returned false, and the app could not authenticate at all.
  Use `$env/static/public`, which inlines at build time.
- That means **the build fails without the public env set**, including in CI. CI
  gets placeholders in `.github/workflows/ci.yml`.

### Supabase

- **`supabase config push` writes the WHOLE auth config**, filling anything
  unspecified from local dev defaults. The first push enabled email signup and
  disabled confirmations.
- Anonymous sign-ins and manual linking are both **off by default** and the game
  needs both.

### Spend

- **A rate limiter that counts the wrong table is not a rate limiter.**
  `/exchange` originally checked `checkAnswerRate`, which counts rows in
  `attempts` — a table only `/grade` writes. Generating exchanges and never
  answering incremented nothing, so the expensive call was the unmetered one.
  Fixed by making a meeting a row in `sessions`, which the two existing budget
  controls have always counted and never saw.
- **Anything the client sends that reaches the prompt is a cost the client
  controls.** The pack had no size limit. Capped at 64KB.
- **Count after the provider returns, never before**, or a failed call consumes
  a player's allowance.
- **If the meter cannot be written, refuse the request.** An unmeterable meeting
  is the thing the meter exists to prevent, so a failed insert closes the
  endpoint rather than waving it through.

### Grading and generation

- **`grade.js` builds its response by picking fields explicitly.** A new field
  added to the verdict schema silently never reaches the client. This is how
  `stance` went missing.
- **A pack gap looks exactly like a model failure.** Luna invented a "12-month
  payback guidance" in 4 of 10 exchanges, which reads as hallucination. The real
  cause was that the pack carried no board-approved targets, so it imported a
  real-world convention. Adding a targets table took fabrications 4 → 1.
  **Before blaming the generator, check whether the pack can answer the question.**
- **Prompt caching is not working.** `cached: 0` on every call despite a stable
  prefix, because the pack sits in `input` rather than the cached `instructions`
  prefix. Worth fixing; not urgent while a meeting costs four cents.
- **The model sometimes emits the closing question as a dialogue line as well.**
  Stripped server-side in `exchange.js` rather than discouraged in the prompt.

---

## Verify anything with these

```bash
npm test                                              # 217 tests
npm run extract --workspace @hot-seat/corpus          # regenerate cards.json
```

The generation eval, which must be re-run after any change to the generator
prompt, lives in `evals/exchange-format/`. It measured 0 fabricated figures
across 40 exchanges and 90% overall pass.

---

## Open items

- [ ] **M4, M5, M6** per the plan.
- [x] **Reset the weekly cap.** Was 2, now 10, sized against the measured cost
      rather than the old one.
- [ ] **Fix prompt caching** by moving the pack into the cached prefix.
- [ ] **`answerable` is client-controlled** and changes the grade: sending
      `false` makes any refusal score correct. Single-player so cheating is
      self-harm, but it makes the attempt log untrustworthy for the leak
      analysis. Derive it server-side from `ANSWERABLE` instead.
- [ ] **`facet: 'definition'` is hardcoded** in the meeting page's grade call
      regardless of the metric in play, so Leitner rows accrue against the wrong
      facet. Low impact while Leitner is being retired, but it is silently wrong.
- [ ] **Delete `interrogate.js`.** Superseded by `exchange.js`, still deployed.
- [ ] **Google OAuth client secret rotation.** Exposed in a chat transcript,
      deferred by choice. No spend attached, but the secret plus the client ID
      would let somebody stand up a sign-in page that looks like yours.
- [ ] **Google sign-in is the one untested path.** Needs a browser and the
      consent screen. Anonymous is fully verified.
- [ ] **Custom domain.** Still on the netlify.app URL; `hotseat.brandonsellers.com`
      needs a DNS record.
- [ ] **The falsification prototype** in `prototypes/board-pack/` was never run
      with real players. The risk was accepted knowingly: live play produces the
      same signal through the navigation log. If experts and novices do not
      separate on it, the pack is leaking.
- [ ] **One stance fixture is failing on purpose**, with both readings
      defensible. See the comment in `stance-fixtures.js`.
- [ ] **The old routes still exist** — `/daily`, `/hot-seat`, `/progress`. The
      plan retires them; they have not been removed yet.

---

## What was tried and rejected, so it is not retried

**An authored mystery** (`docs/cases/latchline-q3.md`). Two drafts, three
adversarial reviews in `docs/reviews/`. The finance was eventually made sound,
but every path has to be hand-written, because a secret cannot be generated. One
week of authoring bought one playthrough. Killed on scope.

**Compute-the-metric questions.** "What was our NRR?" is not a board question:
the board has the packet and already knows. Killed after one playtest of question
one.

**Retrieval as its own question type.** "How many customers did we have?" is a
lookup exercise wearing a metric's clothes. Retrieval is measured from the
navigation log instead, which is a better instrument.

**The Daily, streaks, and spaced repetition.** No multi-day arc means nothing to
schedule. Removing them also removed the answer to "what brings someone back",
which is a real bet and is named as one in the plan.
