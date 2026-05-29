# AGENTS.md — operational playbook

You are an AI that has been pointed at **Trar-Khel** and asked to produce a document in the
Indian bureaucratic postal-ephemera aesthetic. This file tells you exactly how to do that.
Read it top to bottom before generating anything.

## Your job, in one sentence

Turn a plain-language request into a **validated JSON spec**, then run the pipeline to emit
**HTML + PDF + PNG**. You write tokens; the renderer makes pixels.

## The loop

1. **Read the grammar.** Skim [`docs/00-overview.md`](docs/00-overview.md) and
   [`docs/01-aesthetic-grammar.md`](docs/01-aesthetic-grammar.md) so your tokens respect the
   aesthetic (template-first, metadata-dense, wear placed by *local causality*, not sprayed).
2. **Pick a starting spec.** Copy the closest match from
   [`specs/examples/`](specs/examples/) (e.g. `postal-notification.json`).
3. **Author the spec.** Fill the tokens for the request, following
   [`docs/06-authoring-guide.md`](docs/06-authoring-guide.md) and the field reference in
   [`docs/02-spec-schema.md`](docs/02-spec-schema.md). Improvise wording, dates, names,
   annotations — **never** invent new structure the schema does not define.
4. **Validate.** `npm run validate -- path/to/your-spec.json`. Fix every error before rendering.
5. **Generate.** `npm run generate -- path/to/your-spec.json`. Outputs land in `output/`.
6. **Critique.** Score the PNG against [`docs/07-vision-critic-rubric.md`](docs/07-vision-critic-rubric.md).
   If it reads as a poster, is too clean, or has sprayed/uniform damage, adjust tokens
   (usually: lower stamp count, tighten `tiltRange`, move wear to edges/folds, raise metadata
   density) and re-generate. Re-run with the **same `seed`** to isolate a single token change.

## Hard rules

- **Keep information live.** All text is real HTML text — never bake words into an image.
- **One or two marks per page**, not a collage. Stamps land in *one* quadrant.
- **Wear is positional:** punch holes top-left, fold damage on an axis, darkening at edges.
- **Restraint beats grunge.** No universal sepia, no theatrical skew, no coffee rings.
- **Determinism:** every spec carries a `seed`. Same spec → same asset.

## Commands

| Command | What it does |
| --- | --- |
| `npm run validate -- <spec>` | Validate a spec against `schema/document.schema.json` |
| `npm run render -- <spec>` | Spec → HTML only (fast iteration) |
| `npm run generate -- <spec>` | Spec → HTML + PDF + PNG in `output/` |
| `npm run trace -- <image>` | Scan/bitmap → SVG (for new stamp/seal marks) |
| `npm run optimize -- <svg>` | SVGO pass on an SVG |

## If something is missing

If the request needs a document type, stamp family, or token that does not exist yet, prefer
**composing existing tokens** over inventing structure. If you genuinely must extend the
system, extend the schema and a template together, document it in `docs/`, and keep the change
small and consistent with the existing grammar.
