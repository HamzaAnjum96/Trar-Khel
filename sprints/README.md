# Sprint roadmap (temporary)

> ⚠️ **This directory is temporary scaffolding.** It tracks the build-out of Trar-Khel and is
> **deleted in Sprint 5**. Do not link to it from permanent docs. The canonical map is the
> top-level [`README.md`](../README.md).

The repo is built in five sprints, each ending with a commit on
`claude/ai-pipeline-docs-repo-WloGZ`.

| Sprint | Theme | Delivers |
| --- | --- | --- |
| [1](SPRINT-1.md) | Scaffold + aesthetic codification | repo skeleton, README, AGENTS, overview/grammar/references docs |
| [2](SPRINT-2.md) | Spec schema & token system | `document.schema.json`, `validate-spec.js`, example specs |
| [3](SPRINT-3.md) | HTML renderer + templates (layers 1–2) | `render.js`, templates, CSS, fonts, working HTML |
| [4](SPRINT-4.md) | Imperfection engine + PDF/PNG + tracing (layers 3–4) | SVG filters/marks, `generate.js`, `to-pdf/png`, `trace`, `optimize` |
| [5](SPRINT-5.md) | Authoring guide, vision critic, polish + **remove this dir** | authoring/critic docs, committed samples, final polish |

## Principles carried across every sprint
- Template-first, patina-second.
- Wear by local causality, never sprayed.
- Tokens, not pixels; deterministic via `seed`.
- Keep information live (real HTML text, semantic structure).
