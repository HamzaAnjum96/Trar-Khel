# 06 — Authoring guide (request → shipped asset)

This is the end-to-end walkthrough for an AI turning a plain-language request into a finished
asset. Pair it with [`AGENTS.md`](../AGENTS.md) (the short loop) and
[`02-spec-schema.md`](02-spec-schema.md) (the field reference).

## Step 0 — Internalise the grammar

Before writing tokens, hold these in mind (full detail in
[`01-aesthetic-grammar.md`](01-aesthetic-grammar.md)):

- **Template first, patina last.** Official structure + dense metadata, *then* a little wear.
- **Tokens, not pixels.** You choose document structure and wording; the renderer makes pixels.
- **Local causality.** One quadrant per stamp; folds on an axis; holes top-left; edges age most.
- **Keep it traceable.** File/diary numbers, dates, references — sparse metadata is the poster tell.

## Step 1 — Map the request to a `docType`

| The user wants… | `docType` | Base spec to copy |
| --- | --- | --- |
| a gazette/notice/order from a government office | `postal-notification` | `specs/examples/postal-notification.json` |
| an internal memo/circular/O.M. | `office-memo` | `specs/examples/office-memo.json` |
| a postcard (message + address + cancellation) | `postcard` | `specs/examples/postcard.json` |

Copy the closest base spec to a new file (e.g. `specs/my-request.json`) and edit it.

## Step 2 — Fill the structural tokens

Work top-down; this *is* the document hierarchy:

1. **`masthead`** — `authority` (e.g. "GOVERNMENT OF INDIA"), `department`, `office`, `emblem`.
   Provide `{ en, hi }` for bilingual labels.
2. **`headingStack`** — usually one `title` (e.g. "NOTIFICATION", "OFFICE MEMORANDUM") plus an
   optional `subtitle`. Keep it short and schematic.
3. **`metadata`** — `fileNumber` (slashes + section, e.g. `No. F. 7(14)-E.II/48`),
   `diaryNumber`, `date` (`{ value: "1948-03-19", format: "long-en" }`), `place`, and one or two
   `references` lines. **Do not leave this sparse.**
4. **`subject`** — the "Subject:" line (notifications/memos).
5. **`body`** — ordered blocks: `paragraph` (with optional clause `number`), `list`, `table`.
   Improvise period-plausible wording.
6. **`writer` / `recipient`** and **`signature`** — names + designations.

For postcards, fill the **`postal`** block instead of `subject`/`body`: `legend`,
`addressLines`, `message`.

## Step 3 — Add patina tokens (gently)

- **`stamps`** — 1–2 only. Pick a `family`, give it `text`/`subtext`, a `position` quadrant, a
  `tiltRange`, `pressureDropout` (0.2–0.4), and `ink`.
- **`paperProfile`** — `tone`, `foxing` (0.1–0.2), `edgeDarkening` (0.3–0.4).
- **`fold`** — set an `axis` + `position` for a filed document; `none` otherwise.
- **`punchHoles`** — `show: true`, `count: 2`, `position: "top-left"` for filed papers.
- **`tagWear`** — 0.2–0.4.
- **`seed`** — any integer. Fix it so iteration is reproducible.

When in doubt, prefer the gentle end of every range (see the dials table in
[`04-imperfection-engine.md`](04-imperfection-engine.md)).

## Step 4 — Validate

```bash
npm run validate -- specs/my-request.json
```

Fix every error. Unknown fields fail by design — if you reached for a field that doesn't
exist, you're inventing structure; compose existing tokens instead.

## Step 5 — Generate

```bash
npm run generate -- specs/my-request.json
# → output/<title>.{html,pdf,png}
```

Use `npm run render` first if you only want to eyeball the HTML quickly.

## Step 6 — Critique and iterate

Score the PNG against [`07-vision-critic-rubric.md`](07-vision-critic-rubric.md). Common fixes:

| Symptom | Fix |
| --- | --- |
| Reads as a poster | add metadata density; tighten heading stack; add a rule |
| Too clean | nudge `edgeDarkening`/`foxing`/`tagWear` up slightly |
| Looks like a prop / over-damaged | fewer stamps; lower `pressureDropout`; less foxing |
| Stamps everywhere | reduce `stamps` to 1–2; one quadrant each |
| Wear looks sprayed | move damage to edges/folds/top-left; lower global values |

Keep the **same `seed`** while changing one token so you can see exactly what moved. Re-generate
and re-score until it passes.

## Worked example (abridged)

> "Make a 1947 Posts & Telegraphs notification announcing new post-card rates."

1. `docType: "postal-notification"`, copy the base spec.
2. masthead → Government of India / Posts and Telegraphs Department, `emblem: "ashoka"`.
3. headingStack → `title: "NOTIFICATION"`, subtitle about the rate revision.
4. metadata → `No. 12(7)/47-P&T`, diary `D-2389/47`, date `1947-09-01`, place New Delhi, a
   reference to a prior circular.
5. body → numbered paragraphs + a 3-column rate table.
6. stamps → a `circular-seal` bottom-right + a `received` top-right; punch holes top-left;
   horizontal fold; buff paper.
7. validate → generate → score. (This is exactly `specs/examples/postal-notification.json`;
   the rendered result is in [`examples/`](../examples/).)
