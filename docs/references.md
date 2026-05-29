# references.md — source-backed notes

This repo's grammar is distilled from a research report on building an Indian bureaucratic
postal-ephemera aesthetic. The notes below record *why* each design rule exists, grouped by
theme, so future contributors can extend the system without losing the rationale. (The
original report carries inline citations to India Post history, the Central Secretariat Manual
of Office Procedure, the DoPT office-procedure manual, the British Library India Office
catalogue, Library of Congress / conservation sources, forensic stamp-impression standards,
W3C/MDN accessibility guidance, SVG filter specs, and text-to-SVG research.)

## Print & document culture
- Government of India printing was centralised: gazettes, acts, reports, military forms and
  stock documents from government presses. Bureaucratic procedure standardised how files,
  notes, numbering and communications were formatted and routed.
- Official communication formats (letters, office memoranda, inter-departmental notes, office
  orders, resolutions) are **schematic and template-driven**, not expressive — even when
  bilingual. → drives features #1 (hierarchy) and the template-first rule.

## Filing & metadata
- File culture: diary numbers (serial + code letters + section), structured file-number
  systems (slashes + section abbreviations), notes vs correspondence portions, tagging,
  chronological arrangement, case flags. → drives feature #2 (metadata density).
- Papers are punched **top-left** and tagged into the file cover; covers labelled and
  sometimes colour-coded. → drives feature #3 (file behaviour) and top-left punch holes.

## Postal behaviour
- India Post placed postcards in the system from 1879–1880. Postcard rules reserve the
  **right half** of the address side for recipient + postal markings, stamp/machine
  impression **upper-right**, plus a "Post Card" legend. → drives feature #6 (postal zoning).
- Bureaucratic paper overlapped with postage, revenue and service stamps (court-fee, stamp
  supply, security printing). → motivates the revenue/service stamp mark families.

## Paper ageing (conservation)
- Mid-19th-c.-onward wood-pulp papers: short fibres, lignin, alum-rosin acidity → yellowing,
  darkening, brittleness, edge deterioration; folds fracture along the line. Authentic tone is
  **off-white/buff with localised darkening**, not a uniform brown wash. → drives feature #4
  and the "ageing stronger at edges/folds" rule.

## Stamp & ink behaviour (forensics)
- Examined marks are limited by over-inking, inadequate inking, partial impressions and
  surface-texture variation. Rubber-stamp defects: darker ink at letter edges, patchy interior
  fill, uneven outlines, feathering, bleeding, small-type blur, wear, distortion, dirt, edge
  breakdown. → drives feature #5 and the **five failure modes** of the imperfection engine.

## Web implementation & accessibility
- Use **text, not images of text** when the technology can present it (WCAG); build on
  **semantic HTML** (MDN). → the "keep information live" rule.
- Respect **`prefers-reduced-motion`** for any animation. → minimal, optional motion only.

## SVG imperfection primitives
- `feTurbulence` (Perlin/fractal noise), `feDisplacementMap` (displace by another image's
  pixels), `feMorphology` (erode/dilate strokes), `<mask>` (selective fade/removal),
  `feComposite` (compositing), `transform` (tilt/offset), `mix-blend-mode` (sink ink into
  paper). → the building blocks in [`04-imperfection-engine.md`](04-imperfection-engine.md).

## Tracing scans → vectors
- **Potrace** for binarised monochrome marks, signatures, seals. **VTracer** for coloured or
  noisy scans. Then a simplification pass, then **SVGO** to optimise delivery. → the
  `trace` / `optimize` scripts.

## AI architecture
- Language-only generation handles layout/primitives but struggles with geometric detail,
  editability and style consistency; **hybrid** pipelines (LLM layout + deterministic/exemplar
  rendering) win on regularity and coherence. → "tokens, not pixels": LLM emits a spec,
  deterministic templates render it.
- Add a **vision critic** that scores against a *rubric* (official vs poster, plausible
  metadata density, localised stamps, placed wear, bilingual balance, not-too-clean,
  not-too-damaged) rather than free-form preference. → [`07-vision-critic-rubric.md`](07-vision-critic-rubric.md).

## Typography (digital approximations, not historical matches)
- Titles/body: a restrained serif (e.g. **Libre Baskerville** / **Baskervville**).
- Metadata/chrome: a plain grotesque (e.g. **IBM Plex Sans** / condensed).
- Typed inserts: **Courier Prime** (sparingly).
- Bilingual Hindi/English: **Noto Serif Devanagari** / **Noto Sans Devanagari**.
