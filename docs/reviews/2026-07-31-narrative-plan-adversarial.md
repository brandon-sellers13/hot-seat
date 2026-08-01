# Adversarial review of the narrative plan

`gpt-5.6-sol` at high reasoning effort, 2026-07-31. Codex's ChatGPT session token
had been revoked, so this ran against the same model directly through the API.
Prompted to be hostile, to refuse to praise, and to attach a concrete alternative
to every criticism.

Reviewing: `docs/plans/2026-07-31-001-feat-hot-seat-narrative-plan.md`

---

## 1. The narrative is a reskinned oral exam

This is the most generic possible corporate setup. “Recent softness, nervous board, vacant executive role” could introduce a LinkedIn webinar, an interview simulator, or an episode of *The Apprentice*. Nothing specific has happened. Nobody has done anything consequential. “The board is not hostile” removes even the most obvious source of conflict.

The dramatic question is exactly: **“Will I answer well enough to get promoted?”** That is evaluation, not drama. Promotion is also a weak stake without any reason the player needs the job, fears it, or might rationally refuse it.

There is no equivalent to an Ace Attorney secret. More importantly, the random-card architecture makes a secret structurally impossible. A mystery needs:

- An accepted explanation that is wrong.
- Evidence that does not fit it.
- People with reasons to conceal different parts of the truth.
- Revelations in a deliberate order.
- A changed understanding of earlier statements.
- A person who suffers if the lie survives.

Interchangeable questions selected from topical families cannot provide that. If twenty exchanges can occur in any order, they are quiz items, not scenes.

The line about outcomes being “the same five-tier rubric result wearing clothes” is an admission that the narrative changes nothing.

### A concrete replacement premise

Start with one authored B2B case:

> At 8:10 a.m., fifty minutes before Latchline’s Q3 board meeting, CMO Mara Velez resigns. The CEO tells everyone it was for personal reasons. Her final message to you says: **“Do not certify slide 17.”**
>
> Slide 17 claims Latchline reached 101% of its quarterly target and maintained 120% net revenue retention. Priya Shah, the analytics lead you recruited six months ago, sends you an audit showing that 31 failing renewals received free 90-day extensions and were still counted as retained. The largest “marketing-sourced” deal also had its attribution overwritten after close.
>
> The underlying problem is not weak acquisition. Activation collapsed after Product forced through a new onboarding flow. Finance concealed the immediate retention damage to avoid jeopardising a funding term sheet. The CEO intends to blame Priya for a “dashboard reconciliation error” and offers you the CMO job if you present the existing deck without qualification.
>
> The board is about to approve another $6 million of acquisition spending based on the false diagnosis.

Now there is a dramatic question:

**Can you establish what actually broke growth before the board approves the wrong plan, protect Priya from being scapegoated, and decide whether the CMO job is worth endorsing a lie?**

Promotion is no longer the win condition. It is leverage the CEO uses against the player.

The meeting must then let the player investigate rather than merely defend. Each exchange should allow three actions:

1. Answer the board member’s question.
2. Challenge a claim using an exhibit.
3. Ask one return question that can force a disclosure.

The evidence ladder could be:

1. Cash receipts do not match reported retained ARR.
2. The retained-logo list includes free extensions.
3. Those extensions cluster among customers exposed to the new onboarding flow.
4. CRM attribution was manually changed after the quarter closed.
5. A Slack message shows who authorised each change.

Missing a contradiction should alter later questions and endings. Exposing one should make somebody change tactics. Without that causal state, the “meeting” remains a themed assessment.

## 2. These are job titles with facial expressions attached

“Hardest,” “probing,” “fast,” and “friendly” describe difficulty settings, not people. “Neutral, pressing, pleased, shock, sceptical” are UI states, not characterization.

What is missing:

- A private agenda.
- Something each person stands to lose.
- A history with the player and with one another.
- Asymmetric knowledge.
- A characteristic method of applying pressure.
- A blind spot that produces mistakes.
- A recognisable voice.
- Behaviour that changes when cornered.
- A line they will not cross—or think they will not cross.
- Reasons to disagree beyond their departments.

Use actual characters tied to the case:

| Character | Specific want | Specific flaw | Verbal tic or habit | Why this quarter is personal |
|---|---|---|---|---|
| **Elena Ruiz, CFO** | Get the funding term sheet signed without formally restating NRR. She wants a revised cash forecast while preserving the existing board metric. | She treats “technically reconcilable later” as equivalent to truthful now. Under pressure, she retreats into definitions rather than admitting intent. | Says, **“Take me from logo to cash,”** then writes her preferred number in the margin before the answer is finished. | She personally approved the free extensions and classified those customers as active renewals. Correcting the metric could breach a financing condition she negotiated. |
| **Ravi Sethi, founder and CPO** | Prove that low-intent leads caused the quarter and keep his new onboarding flow in production. | He mistakes ownership for expertise and cherry-picks cohorts while accusing everyone else of using anecdotes. | Says, **“Show me the cohort, not the average,”** then rejects any cohort that makes his release look bad. He peels labels from water bottles while listening. | He overrode Priya’s request for a staged rollout. The activation collapse begins within 48 hours of his release. A rollback would publicly invalidate the product strategy he sold to the board. |
| **Camille Ward, independent director and former growth executive** | Move next quarter’s budget into performance media while preventing scrutiny of the agency’s attribution model. | She equates speed with competence and converts uncertainty into borrowed benchmarks. She also refuses to recognise her conflict of interest. | Interrupts with **“At what scale?”** and taps her pen three times when she thinks an answer is too slow. | Her former deputy founded the agency that received the disputed attribution credit. Camille sponsored the contract and defended its 30-day view-through window at the previous board meeting. |
| **Adrian Cole, CEO and chair** | Secure unanimous approval for the forecast and install the player as CMO under the existing narrative. | He uses warmth as coercion and avoids direct lies by getting other people to state them. He sacrifices subordinates while describing it as protecting the company. | Begins hostile questions with **“Help me tell the simple story.”** When cornered, he asks someone else to answer and straightens the place cards. | He promised prospective investors 120% NRR in a side letter. A correction threatens the financing and his voting control. He also authorised the attribution change without putting the instruction in writing. |

These characters cannot be exchanged for generic department heads because each owns a different part of the quarter’s failure. Their questions should expose those agendas:

- Elena attacks definitions and cash timing.
- Ravi attacks lead quality and cohort selection.
- Camille attacks spend allocation while blocking attribution scrutiny.
- Adrian keeps trying to convert a disputed fact into a “leadership judgment.”

Their expressions should follow from those tactics, not substitute for them.

## 3. Where the plan is phoning it in

### A. “Company choice” is merely a content filter

Selecting consumer or B2B and excluding irrelevant cards is not a meaningful narrative choice. It is taxonomy presented as agency. The player has not chosen a company; they have chosen which question bank can be sampled.

**Better version:** Build authored cases with different causal structures.

For example:

- **B2B case:** renewal extensions conceal onboarding-driven churn while attribution is overwritten.
- **Consumer case:** an annual-plan discount makes revenue look healthy while refund latency conceals catastrophic first-week churn; the board wants to scale a creator channel before chargebacks arrive.

Each needs its own people, evidence, false explanation, hidden cause, and consequences. Do not build both first. Build one complete case and prove the format.

### B. The “voice-first” implementation avoids implementing voice

A textarea used with somebody else’s dictation software is not voice-first. It is dictation-compatible. Requiring Wispr, Willow, or OS dictation outsources the central interaction and guarantees inconsistent behaviour across devices.

The ready button also destroys the measurement it claims to preserve. A player can press it immediately, think silently for twenty seconds, and then begin. The system records confidence while observing none. “Answer for as long as you like” also makes the promised meeting length meaningless.

**Better version:** Use push-to-talk recording with actual speech-onset detection and transcription. Measure:

- Time from question to first detected speech.
- Answer duration.
- Long internal pauses.
- Restarts and filler, if those are genuinely part of the skill model.

Cap the initial answer at 60–90 seconds. Let the board interrupt when the player makes an unsupported claim or dodges the requested metric. Keep typing as an accessibility fallback. If actual audio capture is out of scope, stop calling it voice-first and remove hesitation scoring rather than fabricating a proxy.

### C. The endings are cosmetic grading labels

A five-tier score translated into “board confidence” means the fiction has no memory. It does not matter what the player discovered, whom they protected, which falsehood they accepted, or what plan the company adopts.

**Better version:** Track concrete story state independently of performance quality:

- Was the retention manipulation exposed?
- Was the onboarding failure identified?
- Was the attribution conflict uncovered?
- Was Priya protected or scapegoated?
- Was the false forecast certified?
- Did the player accept the CMO role?

That permits endings such as:

- You expose the full chain, force a corrected forecast, and lose the promotion because Adrian cannot control you.
- You identify the product failure but miss the financial manipulation; Ravi is forced to roll back, but the false NRR survives.
- You accept the CMO role and certify the deck; the board approves the acquisition budget and Priya is dismissed.
- You expose Elena’s treatment of renewals but not Adrian’s instruction, allowing him to sacrifice the CFO and preserve the financing.

A promotion can be a compromised ending. Failure to get promoted can be the strategically and ethically correct result. That tension creates an actual decision.

## THE SINGLE HIGHEST-LEVERAGE CHANGE

**Before touching code, write and paper-playtest one complete authored case from opening message to ending.**

Not a prompt template. Not a card family. Not a lore document. A playable case containing:

- One hidden causal chain.
- Four private character agendas.
- Six to eight exhibits.
- Three mandatory contradictions.
- A defined revelation order.
- Branches for missed and discovered evidence.
- At least four materially different endings.
- Exact sample dialogue for an eight-exchange run.

Run it with a human acting as the board and another human as the player. If the player cannot form a hypothesis, change someone’s mind, care about Priya, or feel tempted by the promotion, no amount of portraits, timers, dictation support, or schema deletion will rescue it.

This case should precede N1. Deleting machinery first validates nothing. The authored case will determine what state the engine must track, how questions must branch, what “grading” means, whether random card selection can survive at all, and whether the product is a game rather than an interview practice tool with character art.


---
[tokens: in 2783 out 7875 reasoning 5523]
