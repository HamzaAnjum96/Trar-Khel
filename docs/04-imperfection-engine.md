# 04 — The imperfection engine

The "texture" of this aesthetic comes from **impression behaviour and handling**, not from
distressed fonts or a global grunge filter. The engine lives in two places:

- **Marks** (layer 3): [`templates/partials/marks.js`](../templates/partials/marks.js) +
  [`assets/svg/marks/stamps.js`](../assets/svg/marks/stamps.js) +
  [`assets/svg/filters/imperfections.js`](../assets/svg/filters/imperfections.js).
- **Wear** (layer 4): [`templates/partials/wear.js`](../templates/partials/wear.js).

## The five failure modes (stamps)

A stamp is never one flat "noise" pass. The engine models **five distinct modes**, matching
how real rubber-stamp impressions behave:

| # | Mode | What it looks like | How it's done |
| --- | --- | --- | --- |
| 1 | **Pressure loss** | under-pressed zones drop out; good centre, weak perimeter | radial pressure-mask gradient scaled by `pressureDropout`, applied as a `<mask>` |
| 2 | **Edge squeeze** | darker, thicker letter perimeter (ink pushed outward) | `feMorphology` `dilate` in `#stampInk` |
| 3 | **Paper interaction** | feathering / soft bleed as ink meets fibre | `feGaussianBlur` in `#stampInk` |
| 4 | **Mechanical displacement** | broken edges, slight tilt/slippage | `feDisplacementMap` (edges) + a seeded `rotate()` within `tiltRange` |
| 5 | **Wear / contamination** | flecks, dirt, edge breakdown | `#speckle` turbulence (available for compositing) |

Then the whole stamp is set to `mix-blend-mode: multiply` so the ink **sinks into the paper**
instead of floating above it.

### The pattern

```svg
<filter id="stampInk" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.4"/>        <!-- 2 edge squeeze -->
  <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2"/>
  <feDisplacementMap scale="1.4" .../>                  <!-- 4 broken edges -->
  <feGaussianBlur stdDeviation="0.35"/>                 <!-- 3 paper bleed -->
</filter>

<g filter="url(#stampInk)" mask="url(#pressure)"        <!-- 1 pressure loss -->
   style="mix-blend-mode:multiply">
  <!-- clean vector stamp -->
</g>
```

The exact numbers matter less than the **division of labour**: morphology + blur make
thickness and soft pressure; displacement breaks perfect edges; a seeded radial pressure mask
creates the under-pressed zones; blend mode sinks it into the paper. For the classic
"good centre, weak edge" look, the mask is a radial field whose opacity falls off with
`pressureDropout` — not a single flat opacity.

## Local causality (the cardinal rule)

Damage is **caused and therefore placed** — never sprayed uniformly:

- **Stamps land in ONE quadrant.** `marks.js` anchors each stamp to its `position` quadrant
  (off the centre column) with only small seeded jitter. Keep `stamps` to **1–2**; more reads
  as a collage.
- **Fold damage follows an axis.** `wear.js` draws a single tonal ridge along `fold.axis` at
  `fold.position`, intensity from `fold.intensity`.
- **Punch holes recur at the filing point.** Default `top-left`, stacked down the corner.
- **Tag/corner abrasion** concentrates at the top-left filing point (`tagWear`).
- **Ageing favours edges.** `paper.css` darkens margins more than the centre and keeps foxing
  sparse and clustered (`paperProfile.foxing`, `edgeDarkening`).

## Stamp families

`assets/svg/marks/stamps.js` provides clean geometry for each `family`:
`circular-seal`, `rectangular-dater`, `received`, `revenue`, `cancellation`. Wording comes
from the stamp's `text` / `subtext`; ink colour from `ink` (violet/black/red/blue).

## Restraint dials (and sane ranges)

| Token | Gentle | Heavy (use sparingly) |
| --- | --- | --- |
| `stamps` count | 1 | 2–3 |
| `pressureDropout` | 0.2–0.35 | 0.5+ |
| `tiltRange` | `[-3,3]` | `[-8,8]` (postal cancellations) |
| `paperProfile.foxing` | 0.1–0.2 | 0.35+ |
| `paperProfile.edgeDarkening` | 0.3–0.4 | 0.5+ |
| `fold.intensity` | 0.2–0.3 | 0.5+ |

If output looks like a prop instead of a document, you almost always need **less**: fewer
stamps, lower dropout, tighter tilt, less foxing.

## Growing the mark library from scans

To turn a real scanned stamp/seal/signature into a reusable vector:

```bash
npm run trace -- path/to/scan.png marks/new-seal.svg   # potrace (mono)
npm run optimize -- marks/new-seal.svg                  # SVGO
```

- **potrace** (`scripts/trace.js`) is best for binarised monochrome marks and signatures.
- For **coloured/noisy** scans, use the standalone `vtracer` CLI, then `npm run optimize`.
- `scripts/optimize.js` keeps ids (our marks reference `textPath`/`mask` ids) and the viewBox.
