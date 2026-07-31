# The Hot Seat

A turn-based board meeting where you have to defend your metrics under questioning.

You sit across from a board that asks you what net revenue retention actually measures, what the benchmark is for your segment, and what you are doing about the number being where it is. You type your answers. The game measures how long you hesitate before you start typing, because in a real room the pause is the tell.

> **Status: in development.** The repository is public from the first commit and the build is happening in the open. Nothing is deployed yet. This notice comes down when there is a link to put here.

## Why this exists

Most people who work with these metrics can recognise a correct definition and cannot produce one. That is a comfortable gap right up until somebody asks you across a table, and then it is not.

Recognition and recall are different skills, and only one of them is any use in a board meeting. Flashcards mostly train the first one, because you grade yourself and you are a generous marker. This trains the second, by making you produce the answer in writing before you see anything, and by scoring what you produced rather than what you claim you knew.

## The two modes

**The Daily** is five typed questions, the same five for everyone, taking about ninety seconds. It exists so that the practice actually happens, which is the failure mode that kills every study tool.

**The Hot Seat** is a full session. Eight to twelve exchanges with board members who have different specialisms and who escalate when an answer is thin. Somewhere in the session one of them will quote a benchmark that is not real, taken from a catalogue of figures that circulate widely and trace back to nobody. What happens next is the whole point of the game.

## The scoring rubric, because it is unusual

When a board member puts a wrong number in front of you, telling them they are wrong is not the winning move. It is barely even a move. In a real room you cannot correct a director's number, you can only put a better-founded one next to it and then say what you are doing about it.

So answers are scored on two things, in this order:

1. **Did you anchor your own number, and could you source it?** A figure you cannot attribute is not an anchor.
2. **Did you bridge to strategy?** Point back at the driver metrics and say what is being done. This is worth more than the anchor, and it is the half most people fumble.

Doing both commands the room. Anchoring without a plan counters but leaves you exposed. A plan built on a number you never verified is a good plan against the wrong map. Bare contradiction with no alternative scores fourth, because if the figure is not 118 then what is it, and without your own anchor the other number stands. Accepting the false figure and planning against it is the worst outcome available.

## The corpus

Underneath the game is a source-verified corpus of consumer subscription and B2B SaaS metrics. Every card carries its definition, the ways it is calculated in practice, the inputs, how it is applied, a benchmark, and the traps.

Benchmarks carry provenance, and where a benchmark does not exist the card says so rather than inventing one. The corpus also catalogues fabricated benchmarks, which are figures widely repeated and attributed to research firms that never published them. Those became game content rather than a footnote, because being able to spot one is a genuinely useful skill.

The corpus is the part of this project that is hard to reproduce and the part most worth forking.

## Playing against your own numbers

Fill in one file in your fork and the board starts asking about your business instead of a generic one. The schema is published at [`schemas/your-numbers.schema.json`](schemas/your-numbers.schema.json) and the guide is [`docs/YOUR-DATA.md`](docs/YOUR-DATA.md).

The file records the shape of each number rather than the number itself, so you write "around 105 to 110 percent" instead of a precise figure. That is enough for the game to question you properly and much less to lose if the file ends up somewhere it should not.

**There are no data connectors, and there will not be any.** Not for Salesforce, not for Stripe, not for your warehouse, and not for the author, whose own numbers go through this same file with no special path. The contract is published and guaranteed to keep working. Getting your figures into that shape is your side of the line. The reasoning is in [`docs/YOUR-DATA.md`](docs/YOUR-DATA.md) and it is a deliberate boundary rather than a gap in the roadmap.

## Running it yourself

Fork it, create a Supabase project, set four environment variables, deploy to Netlify. The literal checklist is in [`docs/SELF-HOSTING.md`](docs/SELF-HOSTING.md).

Supabase was chosen because it is itself open source and self-hostable, so a fork points at its own project and owns every row. Isolation between users is enforced by row-level security in the database rather than by application code, which means a fork inherits it without having to trust that every handler remembered.

## Licensing

The code and the corpus are licensed differently, on purpose.

| What | Licence | What it means in practice |
|---|---|---|
| Everything except `packages/corpus` | [Apache-2.0](LICENSE) | Fork it, sell it, build on it. Includes an explicit patent grant. No obligation to publish your changes. |
| `packages/corpus` | [CC BY-SA 4.0](packages/corpus/LICENSE) | Use it commercially if you want, but keep the attribution, and if you publish an improved version of the corpus, publish it under the same terms so the corrections come back. |
| Third-party figures cited within the corpus | Their owners' | Citations and benchmarks belong to whoever published them. Attribution is recorded in [`packages/corpus/ATTRIBUTION.md`](packages/corpus/ATTRIBUTION.md). |
| Your `your-numbers.json` | Yours entirely | Not part of the corpus and not covered by any licence here. See below. |

**Your own data creates no obligation whatsoever.** ShareAlike is triggered by distributing or publicly displaying an adapted corpus. Keeping a private, gitignored `your-numbers.json` in your fork distributes nothing and therefore owes nothing. Forking the Apache-licensed application, or writing your own implementation of the JSON contract, creates no corpus obligation at all. You would have to publish a modified corpus to trigger anything, and at that point sharing it back is the entire point.

The corpus is CC BY-SA rather than plain CC BY for one reason. Under plain attribution, somebody can improve the research privately and the corrections never return, which defeats the thing that makes a shared corpus worth having.

## Contributing

Corrections to the corpus are the most valuable contribution, particularly a benchmark with a better source or a figure that turns out to be fabricated. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Questions about connecting a specific data source have a standing answer, which is that the contract is published and integrations are yours to build. This is not a brush-off, it is the boundary that keeps the project maintainable by one person.

## Credits

Built by [Brandon Sellers](https://brandonsellers.com).
