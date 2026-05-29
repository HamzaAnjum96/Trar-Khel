# Sprint 2 — Spec schema & token system

**Goal:** define the token contract — the single source of truth for what an AI is allowed to
emit — and a validator, so specs are checkable before rendering.

## Scope
- [ ] `schema/document.schema.json` — JSON Schema (draft 2020-12) covering all tokens:
  - `docType`, `seed`, `language`/bilingual label fields.
  - `columnSystem`, `headingStack`, `departmentHeader`.
  - `fileNumber`, `diaryNumber`, `references[]`, `dateFormat`, `pageMarks`.
  - `writer` / `recipient` blocks.
  - `body` content blocks (paragraphs, tables, lists, signature).
  - `stamps[]` (`family`, `count`, `position`, `tiltRange`, `pressureDropout`).
  - `fold`, `punchHoles`, `tagWear`, `paperProfile` (tone, foxing, edgeDarkening).
  - `postal` block (zoning, stampPosition, legend) for postcards.
- [ ] `scripts/validate-spec.js` — load schema, validate a spec with ajv + ajv-formats, print clear errors.
- [ ] `docs/02-spec-schema.md` — human-readable field reference with examples and ranges.
- [ ] `specs/examples/` — 3 specs: `postal-notification.json`, `office-memo.json`, `postcard.json`.

## Acceptance criteria
- `npm run validate -- specs/examples/postal-notification.json` passes for all three examples.
- Validation fails loudly on a deliberately broken spec (e.g. unknown `docType`).
- Every token in `02-spec-schema.md` exists in the schema and vice versa.

## Out of scope
- Actually rendering the specs (Sprint 3).
