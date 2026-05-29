// imperfections.js — the SVG filter library modelling the FIVE ink/wear failure modes.
// Returns a <defs> block of reusable <filter> and gradient defs, plus per-stamp
// helpers. The numbers are deliberately gentle; the division of labour matters more
// than exact values (see docs/04-imperfection-engine.md).
//
// The five modes:
//   1. pressure loss     — feTurbulence -> mask: under-pressed zones drop out
//   2. edge squeeze      — feMorphology dilate: darker, thicker letter perimeter
//   3. paper interaction — feGaussianBlur: feathering/soft bleed into fibre
//   4. mechanical displ. — feDisplacementMap: broken edges; plus transform tilt
//   5. wear/contamination— feTurbulence speckle composited as dropout

/**
 * Build the shared <defs> with one parameterised ink filter per seed-band.
 * We emit a small fixed set of filters and pick one per stamp by id, so the SVG
 * stays compact and deterministic.
 */
export function imperfectionDefs() {
  return `
  <defs>
    <!-- Ink filter: dilate (edge squeeze) -> displace (broken edges) -> blur (paper bleed). -->
    <filter id="stampInk" x="-30%" y="-30%" width="160%" height="160%"
            color-interpolation-filters="sRGB">
      <feMorphology in="SourceGraphic" operator="dilate" radius="0.4" result="edgeSpread"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.9 0.45" numOctaves="2"
                    seed="17" result="warpNoise"/>
      <feDisplacementMap in="edgeSpread" in2="warpNoise" scale="1.4"
                         xChannelSelector="R" yChannelSelector="G" result="warped"/>
      <feGaussianBlur in="warped" stdDeviation="0.35" result="softInk"/>
      <feComposite in="softInk" in2="softInk" operator="over"/>
    </filter>

    <!-- Pressure dropout texture: low-frequency noise, used as a luminance mask.
         White prints, dark drops out. Multiplied by a radial 'good centre' field. -->
    <filter id="pressureNoise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.06" numOctaves="3"
                    seed="7" result="n"/>
      <feColorMatrix in="n" type="matrix"
        values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.9 0.9 0.9 0 0"/>
    </filter>

    <!-- Speckle/contamination: sparse dark flecks. -->
    <filter id="speckle" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="turbulence" baseFrequency="0.5" numOctaves="2" seed="31" result="s"/>
      <feColorMatrix in="s" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 18 -9"/>
    </filter>
  </defs>`;
}

/**
 * A radial pressure mask: strong centre, weak perimeter, modulated by dropout level.
 * dropout 0 -> nearly solid; dropout 1 -> only a small core prints.
 */
export function pressureMaskGradient(id, dropout) {
  const core = (1 - dropout * 0.6).toFixed(2);
  const mid = (1 - dropout).toFixed(2);
  return `
    <radialGradient id="${id}" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="white" stop-opacity="${core}"/>
      <stop offset="55%" stop-color="white" stop-opacity="${Math.max(0, mid).toFixed(2)}"/>
      <stop offset="100%" stop-color="white" stop-opacity="${Math.max(0, mid * 0.4).toFixed(2)}"/>
    </radialGradient>`;
}
