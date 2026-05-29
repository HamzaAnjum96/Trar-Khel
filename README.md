# Trar-Khel

**An AI-pointable generator for Indian bureaucratic postal-ephemera assets.**

Point an AI at this repository and ask it for a document — a 1947-style postal
notification, an office memorandum, a postcard. It produces a **live HTML page**, a
**print-ready PDF**, and a **PNG**, all in the look of late-colonial / early-Independence
Government-of-India administrative print culture: ruled headers, file numbers, bilingual
labels, rubber stamps, punch holes, fold stress and constrained paper ageing.

This is **not a website**. It is a *kit*: documentation that teaches the aesthetic and the
pipeline, plus reusable scripts that turn a structured spec into finished assets.

---

## The one idea that makes this work

> **The AI generates tokens, not pixels.**

The model never hand-draws a poster. It emits a structured **document spec** (JSON) —
document type, heading stack, file-number syntax, stamp family, fold position, paper
profile, a random seed, and so on. A **deterministic renderer** turns that spec into
layered HTML/SVG, which is exported to PDF and PNG. The same spec always yields the same
asset; changing the `seed` produces controlled variation. This is how you get scale and
consistency without a human designer eyeballing every page, and how you avoid drift into
generic "grunge/retro."

```
request ──▶ AI writes spec.json ──▶ validate ──▶ render (HTML) ──▶ export (PDF + PNG)
            (tokens, not pixels)     schema       templates+CSS     Playwright/Chromium
```

---

## Where everything is

| You want to… | Go to |
| --- | --- |
| **Understand the philosophy** (template-first, patina-second) | [`docs/00-overview.md`](docs/00-overview.md) |
| **Learn the visual grammar** (the 6 defining features) | [`docs/01-aesthetic-grammar.md`](docs/01-aesthetic-grammar.md) |
| **Look up the spec/token contract** | [`docs/02-spec-schema.md`](docs/02-spec-schema.md) → machine schema in [`schema/document.schema.json`](schema/document.schema.json) |
| **See how spec → HTML → PDF/PNG works** | [`docs/03-rendering-pipeline.md`](docs/03-rendering-pipeline.md) |
| **Build believable ink/wear imperfections** | [`docs/04-imperfection-engine.md`](docs/04-imperfection-engine.md) |
| **Get fonts, layout & restraint rules** | [`docs/05-typography-layout.md`](docs/05-typography-layout.md) |
| **Author a spec for a new request (step-by-step)** | [`docs/06-authoring-guide.md`](docs/06-authoring-guide.md) |
| **Score a rendered asset against a rubric** | [`docs/07-vision-critic-rubric.md`](docs/07-vision-critic-rubric.md) |
| **Read the source-backed research notes** | [`docs/references.md`](docs/references.md) |
| **Copy a starting spec** | [`specs/examples/`](specs/examples/) |
| **See finished sample output** | [`examples/`](examples/) |
| **Operate the repo as an agent** | [`AGENTS.md`](AGENTS.md) |

### Directory layout

```
docs/        the "how" — aesthetic grammar + pipeline + authoring guides
schema/      document.schema.json — the JSON token contract
specs/       example specs you can copy and adapt
templates/   HTML skeleton, partials, and CSS (the deterministic renderer's input)
assets/      vendored fonts + reusable SVG filters and vector marks (stamps/seals/daters)
scripts/     the runnable pipeline (validate / render / generate / trace / optimize)
examples/    committed reference output (HTML + PDF + PNG)
output/      scratch dir for freshly generated assets (git-ignored)
```

---

## Quick start

```bash
npm install
npx playwright install chromium          # one-time; needed for PDF/PNG export

# validate a spec against the schema
npm run validate -- specs/examples/postal-notification.json

# generate HTML + PDF + PNG into output/
npm run generate -- specs/examples/postal-notification.json
```

> **New here and you're an AI?** Start with [`AGENTS.md`](AGENTS.md). It is the operational
> playbook: how to take a plain-language request and turn it into a shipped asset.

---

## How it fits together

```
docs/02 + schema/        ← what you may emit (the token contract)
docs/06 + AGENTS.md      ← how to author a spec for a request
scripts/ (validate →     ← the deterministic pipeline that makes pixels
  render → generate)
docs/01,03,04,05         ← why the output looks the way it does
docs/07                  ← how to check the result
examples/                ← what "good" looks like
```

Start at [`AGENTS.md`](AGENTS.md), reach for [`docs/`](docs/) when you need the *why*, and copy
from [`specs/examples/`](specs/examples/) when you need a head start.
