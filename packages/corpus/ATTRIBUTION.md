# Attribution

The corpus in this directory is licensed under [CC BY-SA 4.0](LICENSE). This page records what that attribution means in practice, and what parts of the corpus are not ours to license.

## Attributing this corpus

If you reuse the corpus, in whole or in part, credit it as:

> The Hot Seat metrics corpus by Brandon Sellers, licensed under CC BY-SA 4.0.
> https://github.com/brandon-sellers13/hot-seat

If you publish a modified version, say that it has been modified, and license the modified corpus under the same terms.

## What the corpus is

Research files in `research/` are the source of record, written as prose with citations. The extraction pipeline reads them and produces the structured card data the application consumes. Both the prose and the extracted data are covered by the corpus licence, which is why they live together in this package rather than at the root of the repository, where the Apache licence applies.

## Third-party figures are not ours to license

Benchmarks, survey results, and published figures cited in the corpus belong to whoever produced them. The CC BY-SA licence on this corpus covers the writing, the organisation, the verification work, and the collection as a database. It does not and cannot relicense a number that a research firm published, nor the report it came from.

In practice this distinction matters less than it sounds, because individual factual figures are not themselves copyrightable in most jurisdictions. What is protected is the expression around them and the selection and arrangement of the collection, which is the part this licence is doing work on. The corpus quotes figures and attributes them; it does not reproduce anybody's report.

The corpus is built on published sources including, among others, SaaS Capital, Benchmarkit, ICONIQ Growth, OpenView, and vendor documentation from analytics and subscription platforms. Each card names its own sources with dates, which is the attribution that actually matters when you are deciding whether to trust a benchmark.

## Database rights

CC BY-SA 4.0 was chosen partly because version 4.0 expressly covers the European Union's sui generis database right, which is relevant to a collection assembled through substantial verification effort. Earlier versions of the Creative Commons licences did not address this, and the Open Database License was considered and set aside because it separates rights in the database from rights in the contents, which adds complexity without helping here.

## Fabricated benchmarks

The corpus catalogues figures that circulate widely and attribute to publishers who never produced them. These entries name both the false attribution and, where one exists, the real figure with its actual source.

They are recorded as a service and used as game content. Nothing in that catalogue is an accusation against the publisher named, because the whole point is that the publisher did not say it. If you find an entry that is wrong, meaning the figure is real and the attribution holds, that is the single most valuable correction you can send. Open an issue with the primary source.

## Corrections

A benchmark with a better source, a figure with a corrected attribution, or a definition that misstates common practice are all welcome. See [CONTRIBUTING.md](../../CONTRIBUTING.md) in the repository root.
