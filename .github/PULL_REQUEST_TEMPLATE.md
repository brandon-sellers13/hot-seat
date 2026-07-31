## What this changes

<!-- One or two sentences. What is different after this merges? -->

## Why

<!-- If there is a related issue, link it. If this implements part of a plan in
     docs/plans/, name the unit. -->

## Corpus changes

<!-- Delete this section if you did not touch packages/corpus.

     Edits belong in research/, which is the source of record. The structured
     card data is generated from it and would be overwritten.

     Every changed benchmark needs a publisher, a publication date, and a link.
     Name the segment the figure describes. -->

- [ ] Sources cited with publisher and date
- [ ] Segment named for any benchmark
- [ ] Edited `research/`, not the generated output

## Testing

<!-- What did you add or change, and what did you verify by hand? -->

- [ ] New behaviour has tests, or there is a stated reason it does not need them
- [ ] `npm test` passes

## Checks

- [ ] No API keys, service role keys, or real company figures in the diff
- [ ] No `your-numbers.json` committed
