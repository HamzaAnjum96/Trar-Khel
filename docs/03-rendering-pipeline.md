# 03 — The rendering pipeline

How a spec becomes finished assets, and the four-layer model that keeps the look believable
while the text stays live.

```
spec.json
   │  scripts/validate-spec.js  → must pass schema/document.schema.json
   ▼
renderSpec(spec)               (scripts/render.js)
   │  builds 4 layers into templates/base.html
   ▼
HTML  ──┬─ scripts/to-pdf.js  → Chromium page.pdf()      → output/<name>.pdf
        └─ scripts/to-png.js  → Chromium .sheet shot     → output/<name>.png
```

`scripts/generate.js` runs the whole chain: **validate → render → export PDF + PNG**.

```bash
npm run generate -- specs/examples/postal-notification.json
# → output/postal-notification.{html,pdf,png}
```

Use `npm run render` for fast HTML-only iteration; `npm run generate` when you need PDF/PNG.

## The four layers

Every asset is one `.sheet` containing four stacked layers (see
[`templates/base.html`](../templates/base.html) and
[`templates/styles/paper.css`](../templates/styles/paper.css)):

| Layer | Class | Built by | Contents |
| --- | --- | --- | --- |
| 1 Paper | `.layer-paper` | CSS (paper.css) | warm tone, edge darkening, sparse foxing |
| 2 Content | `.layer-content` | `templates/partials/content.js` | masthead, metadata, headings, body, signature — **real text** |
| 3 Mark | `.layer-mark` | `templates/partials/marks.js` | stamps/seals/daters, inked & blended into paper |
| 4 Wear | `.layer-wear` | `templates/partials/wear.js` | punch holes, fold stress, tag abrasion |

`isolation: isolate` on the sheet contains the `mix-blend-mode: multiply` used by the mark and
wear layers so ink **sinks into** the paper rather than floating on top.

## Determinism

Every spec carries a `seed`. `scripts/lib/prng.js` (mulberry32) drives all jitter — stamp
tilt, position jitter, punch-hole offsets. Therefore:

- **Same spec + same seed → byte-identical HTML** (and identical PDF/PNG modulo the renderer).
- **Change the seed → controlled variation** within the same grammar.

This is why you can isolate a single token change: keep the seed fixed, change one field,
re-generate, compare.

## Keeping information live

The content layer is **semantic HTML text** — headings, tables, lists, signatures — never
images of text. Zoom, copy, search, screen readers and localisation all keep working. The
"aged" look is entirely in layers 1, 3 and 4 (CSS + SVG), so the page is *materially* old but
*technically* modern.

## Fonts in export

Chromium loads the page from a `file://` base at the repo root and waits for
`document.fonts.ready`, so any fonts vendored in [`assets/fonts/`](../assets/fonts/) (declared
in `fonts.css`) render deterministically in PDF/PNG. Without vendored fonts the system
fallbacks are used. See [`docs/05-typography-layout.md`](05-typography-layout.md).

## PDF vs PNG

- **PDF** — `preferCSSPageSize` honours `@page { size: A4 }`; postcards export `landscape`.
- **PNG** — a screenshot of the `.sheet` element (tight crop), good for previews and for the
  vision critic.
