# Sprint 1 — Scaffold + aesthetic codification

**Goal:** stand up the repo skeleton and codify the aesthetic so every later sprint has a
fixed grammar to render against.

## Scope
- [x] `package.json` (Node ESM, npm scripts: validate/render/generate/trace/optimize), `.gitignore`, `output/.gitkeep`.
- [x] Top-level `README.md` — the AI map with a pointer table to everything.
- [x] `AGENTS.md` — the operational playbook (request → spec → validate → generate → critique).
- [x] `docs/00-overview.md` — philosophy: template-first, patina-second; tokens-not-pixels; four layers.
- [x] `docs/01-aesthetic-grammar.md` — the six defining features + local causality + mistakes.
- [x] `docs/references.md` — source-backed rationale distilled from the research report.
- [x] `sprints/` — roadmap + per-sprint plans (this directory).

## Acceptance criteria
- A newcomer (human or AI) can open `README.md` and find every part of the system.
- The grammar docs are concrete enough that later tokens/templates map directly to them.
- `npm install` succeeds (dependency manifest is valid).

## Out of scope (later sprints)
- The JSON schema (Sprint 2), the renderer/templates (Sprint 3), imperfection engine and
  PDF/PNG export (Sprint 4), authoring guide + vision critic (Sprint 5).
