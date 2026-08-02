# Handoff — picking up at M5

Written at the end of the session that built M1 through M3, then extended when
M4 landed. Read this and `docs/plans/2026-07-31-002-feat-the-meeting-plan.md`
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
| Tests | 293 passing |
| Supabase | `uwqmkstcuwfzgkizcdjt`, schema + RLS applied, RLS verified 9/9 |
| Functions live | `grade`, `exchange`, `adjourn` (`interrogate` is dead code, still deployed) |
| Verdict schema | `1.1.0` |

**Verified in production, not assumed:**
- An exchange generates from a card plus the pack and quotes only figures that
  exist in the pack. Latency was recorded as ~9s here; re-measured against
  production on 2026-08-02 it is a 14.3s median. See M4 below.
- The generator's own reference answer scores top tier against the grader. This
  is the check that the two halves of the loop agree; if it ever fails, they have
  drifted apart.
- A hedge scores wrong. A deferral on an answerable question scores wrong.
- Cross-tenant reads are refused at the database.
- The global spend ceiling reads live data and blocks when set to zero.
- **Generation is metered.** Attempting the abuse against production: an
  oversized pack is refused with 413, unanswered generation is cut off after
  exactly 20 with `meeting_over`, and the weekly cap binds after 10 meetings.

**M4 is done and verified in production.** Session `ffd8319d`, a short meeting
played end to end on the live site: credibility drained 5 → 4 → 3 → 2 → 0 across
four exchanges, the last costing two pips for an `accepted` stance. The meeting
stamped `ended_at` with outcome `burned` and decision `deferred`. A further
generation returned 409, and a further grading attempt returned 409 before any
provider call. A second session was walked out of, recorded `abandoned`, and
refused a second adjourn.

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

## M4: the meeting, as built

**The server owns everything that decides when a meeting stops.** `/grade` takes
a `sessionId`, drains credibility off the verdict it just produced, and stamps
`ended_at` at zero or on the last answer. `/exchange` already refuses a session
with `ended_at` set, so the meeting being over is a fact about the database
rather than a state the client agrees to honour. This is the whole shape of M4
and it is why the drain does not live in the client.

Adjourning at zero credibility is drama, not a spend control. The
twenty-generation ceiling is the spend control and it binds either way.

| Where | What |
|---|---|
| `packages/functions/src/lib/meeting.js` | Drain table, outcome, ask decision, lengths. Pure functions |
| `/grade` | Drains, records `session_id` and `stance`, ends the meeting |
| `/adjourn` | Ends a meeting walked out of. Refuses a second adjourn |
| `/exchange` | Reads the length off the session, validates the shape |
| `packages/app/src/lib/meeting.js` | The running order and the ending copy |

**The drain**, starting at 5 and never restored: correct and partial cost
nothing, wrong costs one, an `accepted` stance on anything short of correct
costs two, `ungraded` costs nothing because that is our failure.

**Meeting length rides on `sessions.scenario`** as `board-meeting:short` or
`board-meeting:long`, read back off the session rather than off the request, so
a short meeting cannot be extended by sending `long` on the second call.

**The ending is the ask, not a score.** Approved when they held ground and were
mostly right, redirected when a real share of their correct answers conceded or
refused, deferred otherwise and always when burned. Redirected is a win: the
third worked example is a meeting won by agreeing.

**Question shapes** rotate across a meeting: `diagnosis`, `director-wrong`,
`director-right`, `unsettled`. Validated server-side against those four, and an
unrecognised one is dropped rather than passed to the model. `answerable` is
derived from the shape, so refusing an unsettled question finally scores correct.

**Generation is slower than this document used to say.** Measured in production
on 2026-08-02, four calls: **14.3s median**, 13.4s to 14.9s. The eval measures
10.4s to 11.3s calling the provider directly, so three to four seconds of it is
the serverless hop. Pre-generation is worth more than the old 9s figure implied.

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
- **An eval measuring the wrong sources is worse than no eval.** The 2026-08-02
  harness scored 0% on its first run against a generator that was mostly
  behaving, because it was given the board pack alone and told anything absent
  from it was invented. That flagged the player's own ask, which constraint 2
  requires the first line to name, and card-sourced benchmarks, which the second
  worked example is built out of. Its second version inverted the
  interpret-aloud check and reported the format working as a failure. Both read
  as rigorous. **A new eval needs a control arm**, or a bad number cannot be
  told apart from a strict grader.

### Testing a guard

- **A test asserting a write happened does not test that anything is enforced.**
  The M4 guard tests run `/grade` and `/exchange` against one shared in-memory
  database (`__tests__/helpers/fake-supabase.js`), so credibility written by one
  is read back by the other. A mock returning canned rows would pass even if the
  refusal never fired, which is how this project shipped two controls that read
  as enforced and enforced nothing.

---

## Verify anything with these

```bash
npm test                                              # 293 tests
npm run extract --workspace @hot-seat/corpus          # regenerate cards.json
```

The generation eval, which must be re-run after any change to the generator
prompt, lives in `evals/exchange-format/`. It measured 0 fabricated figures
across 40 exchanges and 90% overall pass.

---

## Open items

- [x] **M4.** Built, deployed, verified in production 2026-08-02.
- [ ] **M5 and M6** per the plan.
- [ ] **The navigation log is collected and thrown away.** The meeting page
      records which pack sections were opened and in what order, and nothing
      persists it. The plan calls this the instrument that shows whether the
      pack is leaking, and it is the most valuable missing measurement in the
      game. Needs a column and a write.
- [ ] **Shaped exchanges interpret aloud more often than unshaped ones**, 9 of
      20 against 6 of 20, measured 2026-08-02. Giving a director a role makes
      them likelier to say what their figure means, which is the player's job.
      Two attempts at fixing it moved the number by less than run-to-run noise.
- [ ] **A closed tab leaves a meeting open forever.** `abandoned` is recorded
      only when the player leaves in a way that reaches `/adjourn`.
- [x] **Reset the weekly cap.** Was 2, now 10, sized against the measured cost
      rather than the old one.
- [ ] **Fix prompt caching** by moving the pack into the cached prefix.
- [ ] **`answerable` is derived from the shape but still relayed by the client**
      on its way to `/grade`. The honest path is now correct, where before every
      unsettled question was graded as though the pack could settle it. A caller
      who wants to mark their own refusals correct still can. Closing it needs
      per-exchange server state.
- [x] **`facet: 'definition'` was hardcoded** in the meeting page's grade call.
      Now `exchange`. M4 turned one wrong Leitner row into twenty a meeting.
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
