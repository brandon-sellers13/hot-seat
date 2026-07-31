# Playing against your own numbers

By default The Hot Seat questions you about a shared corpus of published metrics. That teaches you the definitions and the benchmarks, which is most of the value. What it cannot do is ask you the question you will actually be asked, which is what *your* net revenue retention is and what you are doing about it.

This page explains how to close that gap in your own fork.

## The short version

You write one file called `your-numbers.json`, you put it in the root of your fork, and the board starts asking you about your business instead of a generic one. The file is validated when the app starts and the game tells you precisely what is wrong if it cannot read it.

There is no integration to set up, no account to connect, and no credentials to hand over. That is a deliberate design decision rather than a missing feature, and the reasoning is in the next section.

## Why there is no connector, and why there never will be

The moment this project ships a Salesforce connector, it owes you a Stripe connector, and then a HubSpot connector, and then a Snowflake connector, and then a fix for whichever one broke when a vendor changed an API. That is a maintenance obligation nobody is funding, and it would slowly consume the time that should go into the corpus, which is the part that is actually hard to reproduce.

So the boundary is drawn at the file. The project publishes a schema and a validator and guarantees they will keep working. Getting your numbers into that shape is your side of the line, and the same rule applies to the author, whose own figures go through this identical file with no special path. That is the only way to know the contract is genuinely sufficient rather than merely sufficient for everyone except the person who wrote it.

## What goes in the file, and what deliberately does not

The schema records the shape of a number rather than the number itself. For each metric you record roughly how big it is, which way it is moving, whether it sits above or below the benchmark, where it came from, and what you are doing about it.

You will notice there is nowhere to put an exact figure, and that is on purpose. A band like "around 105 to 110 percent" is everything the game needs in order to question you properly, and a copy of the file that ends up somewhere it should not discloses far less than a spreadsheet would. It also happens to be how you would answer out loud in a real room, because nobody recites a number to four decimal places at a board table.

Two fields deserve particular attention because they are what makes this worth doing.

**`source`** is where the number comes from. This is not bookkeeping. The entire scoring rubric turns on anchoring a number you can actually source, because in a real meeting you cannot tell a board member they are wrong, you can only put a better-founded number next to theirs. A fact with no credible origin cannot be defended, and the game will press you on exactly that.

**`strategy`** is what you would say next, after the number. List the driver metrics you would point to and what is being done about them. This is the second and higher-scoring half of the rubric, and it is the half most people fumble. A fact with no strategy can only ever earn a partial result, no matter how perfectly you recall the figure.

## Three ways people actually fill it in

**By hand.** Genuinely the right answer to start with. Open the example, copy five metrics you would really be asked about, and write the bands from memory or from your last board deck. Ten minutes. Because you are writing bands rather than exact figures, you do not need to go and look most of them up, and the ones you cannot write down are themselves a useful finding.

**A script against your warehouse.** If your numbers already live in a warehouse, a short query per metric that emits the bands is straightforward, and you can rerun it each reporting period. Keep the mapping from query result to band in the script rather than in your head, so the file regenerates the same way every time.

**An export from your business intelligence tool.** Most tools will export a small table to CSV or JSON, and a short transform turns that into this shape. This tends to be the least effort if you already have a metrics dashboard somebody maintains.

Whichever route you take, the file is regenerated rather than edited in place, so refreshing it each period is a rerun rather than an audit.

## Staleness is handled for you

Every fact carries a mandatory `as_of` date, and the loader compares it against your `reporting_cadence`. A fact older than one reporting period is retired from questioning and reported in a staleness notice rather than asked about.

This matters more than it sounds. Being drilled on a number you have since replaced trains you to say the wrong thing confidently, which is worse than not practising at all.

## Your file never leaves your fork

`your-numbers.json` is listed in `.gitignore`, so an accidental `git add .` will not commit it. It is never uploaded to the hosted game, never included in telemetry, and never sent anywhere except to the model that grades the specific answer you just typed, in the same way the shared corpus is.

If you would rather it never reached a model provider at all, run the project with your own API key, or self-host the whole thing. See [SELF-HOSTING.md](SELF-HOSTING.md).

## Getting started

1. Copy [`examples/your-numbers.example.json`](../examples/your-numbers.example.json) to `your-numbers.json` in the root of your fork.
2. Replace the contents with five metrics you would genuinely be asked about.
3. Start the app. If the file has a problem, the error names the exact position in the file rather than making you hunt for it.

The example is a fictional company called Lantern Labs and includes one fact deliberately marked `"vs_benchmark": "unknown"`, because answering honestly that you have never checked is treated as a gap worth closing rather than as a wrong answer. Guessing is the thing the game is trying to train out of you.
