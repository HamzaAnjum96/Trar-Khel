# Sprint 5 — Authoring guide, vision critic, polish + remove sprint docs

**Goal:** make the repo genuinely self-serve for an AI, prove it with committed samples, and
clean up the temporary scaffolding.

## Scope
- [ ] `docs/06-authoring-guide.md` — end-to-end walkthrough: plain-language request → choose a
  base spec → fill tokens → validate → generate → critique → iterate. Includes worked example.
- [ ] `docs/07-vision-critic-rubric.md` — rubric-based scoring (official vs poster, plausible
  metadata density, localised stamps, placed wear, bilingual balance, not-too-clean /
  not-too-damaged), with pass thresholds and "what to change" guidance.
- [ ] `examples/` — generated sample set (HTML + PDF + PNG) committed as proof and reference.
- [ ] Final polish of `README.md` and `AGENTS.md` so the map matches the finished repo.
- [ ] **Remove this `sprints/` directory** (`git rm -r sprints/`).

## Acceptance criteria
- A fresh AI can follow `AGENTS.md` + `docs/06` to ship an asset with no extra help.
- `examples/` contains at least one full set (HTML + PDF + PNG) and is referenced from README.
- `sprints/` no longer exists; no permanent doc links to it.
- Final commit pushed to `claude/ai-pipeline-docs-repo-WloGZ`.

## Out of scope
- Anything new; this sprint finishes and cleans up.
