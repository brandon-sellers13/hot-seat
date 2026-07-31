# Contributing

Thank you for looking. This page is short because most of what you need to know is one of three things.

## Corrections to the corpus are the most valuable thing you can send

The research is the part of this project that is expensive to reproduce and the part most worth getting right. If you find any of the following, please open an issue:

- A benchmark with a better source than the one cited, particularly a primary source where we have cited somebody quoting it.
- A figure in the fabrication catalogue that turns out to be real. That catalogue lists numbers that circulate widely and attribute to publishers who never produced them, and a wrong entry there is worse than a missing one, because it accuses a publisher of something backwards. If you have the primary source, that is the single most useful correction available.
- A definition that misstates how the metric is actually used in practice, as opposed to how one vendor happens to construct it. The corpus deliberately teaches the consensus definition and records vendor differences as traps rather than as competing truths, so "my analytics tool calculates it differently" is a note to add rather than a correction to make.
- A benchmark presented without a segment. Retention for enterprise and for self-serve are different businesses, and a benchmark that does not say which one it describes is close to meaningless.

Corpus changes go through the research files in `packages/corpus/research/`, which are the source of record. The structured card data is generated from them, so editing the generated output would be overwritten on the next extraction.

Please include the source, the date it was published, and a link. A correction without a source cannot be verified and cannot be merged, which is the same standard the corpus holds itself to.

## Questions about connecting a data source have a standing answer

The answer is that the contract is published and the integration is yours to build. There are no connectors for Salesforce, Stripe, Snowflake, or anything else, and there will not be.

This is not a brush-off and it is not a gap in the roadmap. The moment this project ships one connector it owes the rest, plus a fix for whichever one breaks when a vendor changes an API, and that obligation would slowly consume the time that should go into the research. The boundary is what keeps the project maintainable by one person.

What is guaranteed is that [`schemas/your-numbers.schema.json`](schemas/your-numbers.schema.json) keeps working, that breaking changes bump the major version, and that the author's own numbers go through the identical file with no special path. That last part is the only way to know the contract is genuinely sufficient. [`docs/YOUR-DATA.md`](docs/YOUR-DATA.md) shows three ways people actually populate it.

If you build a converter for a common source, say so in an issue and it can be linked from the documentation. It just will not live in this repository.

## Code changes

Open an issue before writing anything substantial, so you do not spend an evening on something that conflicts with a decision already made. The plans in `docs/plans/` record the reasoning behind most of the architecture, including the ones that were rejected and why.

```bash
nvm use          # Node 24
npm install
npm test
```

Tests run on pull requests. New behaviour needs a test; a change in behaviour needs its test updated. The one place this is non-negotiable is anything touching data isolation between users, because that is where a bug leaks somebody else's information rather than merely breaking a feature.

## Licensing, so there are no surprises

The repository is licensed in two halves, and a contribution is offered under whichever applies to the files you touched.

Code outside `packages/corpus` is Apache-2.0. The corpus is CC BY-SA 4.0, which means a published improvement to it stays open under the same terms. Your own `your-numbers.json` is not part of the corpus, creates no obligation of any kind, and is gitignored so it cannot be committed by accident.

## Conduct

Be decent. Assume the other person is trying to get it right. Disagreements about a metric definition should be settled with a source rather than with volume, which is more or less the entire thesis of the project.
