# 00 — Overview & philosophy

## What we are imitating

A very specific visual world: **late-colonial and immediate post-Independence Indian
administrative print culture** (think 1947), not "vintage" in the broad sense. These
documents feel official because they are built from *procedural* signals, not decorative
ones — issue numbers, publishing authority, centred hierarchy, ruled separators, serial
codes, stamps, signatures, and paper that visibly records handling.

The look is really an **artefact of systems**: systems for printing (centralised government
presses producing gazettes, acts, reports, forms), for filing (diary numbers, file numbers,
notes vs correspondence portions, tagging, chronological order), and for routing/marking
paper (daters, cancellations, office marks, overprinted authority). Reproduce the systems and
the aesthetic follows.

## The governing rule

> **Start with a rigid official template. Add clerical metadata. Then let paper, ink and
> handling do a *small* amount of damage — in that order.**

Reverse the order — start with "grunge" — and the result looks *designed*. Keep the order
intact and it looks *found*. Everything in this repo enforces that order:

1. **Template first** — schematic, repetitive, centred, ruled. (layer: content)
2. **Metadata second** — file numbers, diary numbers, dates, references, bilingual labels.
3. **Patina last** — one or two stamps, a fold, top-left punch holes, edge darkening.

## Why "tokens, not pixels"

We separate **semantic content** from **surface patina**:

- The text, headings, labels, tables and form-like structures stay **real HTML text**.
  (Accessibility guidance is explicit: use text, not images of text; build on semantic HTML.)
- The ageing, stamps, rules, seals and "paper" effects sit on top as **CSS and SVG layers**.

So the AI's output is a **structured spec of tokens** (document type, heading stack,
file-number syntax, stamp family, fold position, paper profile, seed…), and a **deterministic
renderer** composes the layers. Benefits:

- **Consistency at scale** — thousands of assets share one grammar; no per-page eyeballing.
- **Determinism** — a `seed` makes randomness reproducible; same spec → same asset.
- **Live information** — zoom, copy, search, localisation, keyboard nav and screen readers all
  keep working, even though the page *looks* archival.
- **No taste drift** — the model improvises wording and microvariation, never the formal grammar.

## The four rendering layers

Every asset is composed of four stacked layers (see
[`docs/03-rendering-pipeline.md`](03-rendering-pipeline.md)):

1. **Paper** — warm off-white/buff base, subtle tonal variation, maybe one soft crease.
2. **Content** — headings, metadata rows, file numbers, bilingual labels, tables, signatures.
3. **Mark** — seals, daters, revenue stamps, circulation notes, docketing, cancellations.
4. **Wear** — edge abrasion, punch holes, fold stress, handling shadows.

## Where the AI helps (and where it must not)

AI has exactly three jobs in this pipeline:

1. Generate the **structured spec**.
2. Generate optional **microcopy / annotations** (wording, names, dates, marginalia).
3. **Score** the rendered result against a fixed rubric (a consistent reviewer, not an aesthete).

Everything else is deterministic. The model is *constrained by a style grammar* — that is the
whole point, and it is what the strongest text-to-graphics research converges on: semantic
composition first, geometric refinement second.

## Read next

- [`01-aesthetic-grammar.md`](01-aesthetic-grammar.md) — the six defining features, in detail.
- [`references.md`](references.md) — the source-backed notes this is distilled from.
