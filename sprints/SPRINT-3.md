# Sprint 3 — HTML renderer + templates (layers 1 & 2)

**Goal:** turn a validated spec into **semantic HTML** with the paper + content layers, real
typography and bureaucratic layout. No imperfections yet — get the bones right first.

## Scope
- [ ] `templates/base.html` — the four-layer skeleton (paper / content / mark / wear placeholders).
- [ ] `templates/partials/` — masthead/department header, metadata rows (file/diary numbers),
  writer/recipient blocks, body blocks, signature, postcard address zoning.
- [ ] `templates/styles/` — CSS for typography, vertical rhythm, narrow/asymmetric margins,
  ruled separators, paper tone, and print sizing (`@page`).
- [ ] `assets/fonts/` — vendored open fonts (Libre Baskerville, IBM Plex Sans, Courier Prime,
  Noto Serif/Sans Devanagari) with an `@font-face` stylesheet for offline-deterministic PDF.
- [ ] `scripts/render.js` — spec → HTML string (deterministic; seeded PRNG helper for any jitter).
- [ ] `docs/05-typography-layout.md` — fonts, hierarchy, rhythm, margins, restraint rules.

## Acceptance criteria
- `npm run render -- specs/examples/office-memo.json` writes a valid HTML file whose **text is
  real, selectable text** (not images).
- At least two doc types render correctly (postal notification + office memo).
- Output is byte-stable for a fixed `seed`.

## Out of scope
- Stamps, folds, punch holes, ageing filters (Sprint 4); PDF/PNG export (Sprint 4).
