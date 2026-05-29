// marks.js — LAYER 3 (mark): stamps, seals, daters, cancellations.
//
// Builds the mark layer from spec.stamps[]. Each stamp:
//   - lands in ONE quadrant (local causality; never sprayed across the page)
//   - is tilted by a seeded value within tiltRange (mechanical displacement)
//   - is inked via the #stampInk filter (edge squeeze + broken edges + paper bleed)
//   - is masked by a radial pressure field scaled by pressureDropout (pressure loss)
//   - multiplies into the paper via mix-blend-mode (ink sinks in, not floats on top)
// See docs/04-imperfection-engine.md.

import { primary } from "../../scripts/lib/text.js";
import { stampGeometry } from "../../assets/svg/marks/stamps.js";
import {
  imperfectionDefs,
  pressureMaskGradient,
} from "../../assets/svg/filters/imperfections.js";

const INK = {
  violet: "#46306b",
  black: "#1c1a17",
  red: "#7a201c",
  blue: "#23386b",
};

// Quadrant anchor points as fractions of the sheet (kept off the centre column).
const QUADRANT = {
  "top-left": { x: 0.16, y: 0.2 },
  "top-right": { x: 0.8, y: 0.18 },
  "bottom-left": { x: 0.2, y: 0.82 },
  "bottom-right": { x: 0.78, y: 0.8 },
  center: { x: 0.5, y: 0.5 },
};

export function renderMarks(spec, ctx) {
  const stamps = spec.stamps || [];
  if (!stamps.length) return "";
  const { prng } = ctx;

  const groups = [];

  stamps.forEach((stamp, i) => {
    const family = stamp.family;
    const geom = stampGeometry(family, {
      text: primary(stamp.text, ctx.lang),
      subtext: primary(stamp.subtext, ctx.lang),
    });

    const ink = INK[stamp.ink || "violet"];
    const scale = stamp.scale ?? 1;
    const [tmin, tmax] = stamp.tiltRange || [-3, 3];
    const tilt = prng.between(tmin, tmax);
    const dropout = stamp.pressureDropout ?? 0.3;

    const anchor = QUADRANT[stamp.position || "top-right"] || QUADRANT["top-right"];
    // small seeded jitter around the quadrant anchor
    const jx = prng.between(-0.03, 0.03);
    const jy = prng.between(-0.03, 0.03);
    const cx = ((anchor.x + jx) * 100).toFixed(2);
    const cy = ((anchor.y + jy) * 100).toFixed(2);

    const maskId = `press-${i}`;

    // Each stamp is its own positioned SVG so we can place it in page %.
    groups.push(`
    <svg class="stamp stamp-${family}" viewBox="0 0 240 160"
         style="position:absolute; left:${cx}%; top:${cy}%;
                width:${(150 * scale).toFixed(0)}px; height:auto;
                transform:translate(-50%,-50%) rotate(${tilt.toFixed(2)}deg);
                color:${ink}; mix-blend-mode:multiply; opacity:0.82;"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>${pressureMaskGradient(maskId + "-g", dropout)}</defs>
      <mask id="${maskId}-mask">
        <rect x="0" y="0" width="240" height="160" fill="url(#${maskId}-g)"/>
      </mask>
      <g filter="url(#stampInk)" mask="url(#${maskId}-mask)">
        ${geom}
      </g>
    </svg>`);
  });

  // The shared filter defs live once in a zero-size SVG.
  const defsSvg = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${imperfectionDefs()}</svg>`;

  return `${defsSvg}\n${groups.join("\n")}`;
}
