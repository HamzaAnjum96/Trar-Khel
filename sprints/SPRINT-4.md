# Sprint 4 — Imperfection engine + PDF/PNG export + tracing (layers 3 & 4)

**Goal:** add believable ink/wear (the mark + wear layers) and complete the pipeline to
PDF + PNG. Add the scan→vector utilities for growing the mark library.

## Scope
- [ ] `assets/svg/filters/` — reusable `<filter>` defs modelling the **five failure modes**:
  pressure loss, edge squeeze, paper interaction, mechanical displacement, wear/contamination
  (via `feTurbulence` / `feDisplacementMap` / `feMorphology` / `<mask>` / `mix-blend-mode`).
- [ ] `assets/svg/marks/` — clean vector stamps, seals, daters, revenue/service marks.
- [ ] Wear primitives placed by **local causality**: top-left punch holes, axis fold stress,
  edge darkening, sparse clustered foxing.
- [ ] `scripts/to-pdf.js`, `scripts/to-png.js` — HTML → PDF / PNG via Playwright Chromium.
- [ ] `scripts/generate.js` — orchestrator: validate → render → export PDF + PNG into `output/`.
- [ ] `scripts/trace.js` (potrace for mono, vtracer optional for colour) + `scripts/optimize.js` (SVGO).
- [ ] `docs/03-rendering-pipeline.md`, `docs/04-imperfection-engine.md`.

## Acceptance criteria
- `npm run generate -- specs/examples/postal-notification.json` produces `*.html`, `*.pdf`, `*.png`.
- Stamps are localised to one quadrant; wear is positional, not sprayed.
- Same `seed` → identical output; changed `seed` → controlled variation.
- `npm run trace -- <image>` emits an SVG; `npm run optimize -- <svg>` shrinks it.

## Out of scope
- Authoring guide, vision-critic rubric, committed samples (Sprint 5).
