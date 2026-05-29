# 07 — Vision-critic rubric

After rendering, score the PNG against a **fixed rubric** — not free-form preference. The
critic's job is to be a *consistent reviewer against fixed rules*, which is where AI replaces a
human designer most reliably. Ask specific questions, assign points, and act on the total.

## How to use

1. Open the generated PNG (e.g. `output/<name>.png`).
2. Score each criterion 0–2 using the anchors below.
3. Sum (max 20). Apply the verdict. If it fails, apply the linked fix and re-generate with the
   **same `seed`** so you can see what changed.

> Be concrete. Don't ask "do I like it?" Ask "is the metadata density plausible?", "are the
> stamps localised rather than decorative?", "is it too clean?", "is it too damaged?".

## The rubric (10 criteria, 0–2 each)

| # | Criterion | 0 | 1 | 2 |
| --- | --- | --- | --- | --- |
| 1 | **Official, not poster** | reads as a designed poster | mixed signals | unmistakably an official document |
| 2 | **Hierarchy & rules** | flat / no structure | some structure | centred masthead + ruled zones + clear heading stack |
| 3 | **Metadata density** | almost none | a couple of codes | file no. + diary no. + date + references present and plausible |
| 4 | **Bilingual balance** | absent or ornamental | uneven | Hindi as a quiet, bureaucratic second line |
| 5 | **Stamps localised** | sprayed / decorative | one slightly off | 1–2 stamps, each in one quadrant, reading as marks |
| 6 | **Ink realism** | crisp opaque logo | partly inked | edge squeeze + pressure dropout + multiplied into paper |
| 7 | **Wear is positional** | uniform/sprayed grime | partly placed | holes top-left, fold on an axis, abrasion at tag point |
| 8 | **Paper ageing constrained** | uniform sepia/brown wash | uneven | off-white/buff, darker at edges, sparse clustered foxing |
| 9 | **Not too clean** | pristine, no evidence of use | slight | believable, lived-in but legible |
| 10 | **Not too damaged** | prop-like, hard to read | borderline | restrained; damage never overwhelms content |

## Verdict

| Total | Verdict | Action |
| --- | --- | --- |
| **17–20** | Ship | done |
| **12–16** | Revise | fix the lowest-scoring criteria, re-generate |
| **0–11** | Reject | likely wrong altitude (poster, or over-damaged) — rework tokens |

Two single-point failures are decisive regardless of total: **criterion 1** (poster, not
document) and **criterion 7/8** (sprayed/uniform damage). Those are the signatures of the
aesthetic going wrong.

## Fix map

| Low criterion | Token moves |
| --- | --- |
| 1, 2 | add a rule; tighten `headingStack`; centre masthead; raise metadata |
| 3 | add `fileNumber`/`diaryNumber`/`references` |
| 4 | provide `{ en, hi }` for masthead/heading labels |
| 5 | reduce `stamps` to 1–2; set distinct `position` quadrants |
| 6 | raise `pressureDropout` toward 0.35; confirm `mix-blend-mode` (it's automatic) |
| 7 | enable `punchHoles` top-left; set `fold.axis`; raise `tagWear` slightly |
| 8 | pick `off-white`/`buff`; keep `foxing` 0.1–0.2; `edgeDarkening` 0.3–0.4 |
| 9 | nudge `edgeDarkening`/`foxing`/`tagWear` **up** a little |
| 10 | fewer stamps; lower `pressureDropout`, `foxing`, `fold.intensity` |

See [`04-imperfection-engine.md`](04-imperfection-engine.md) for the dials and sane ranges.
