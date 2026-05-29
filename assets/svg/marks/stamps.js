// stamps.js — clean vector stamp/seal/dater geometry by family.
// Each returns SVG markup sized within a ~240x140 viewBox-ish local space; the
// marks partial wraps these with ink filters, pressure mask, tilt and blend mode.
// Text is uppercased and escaped by the caller.

import { escapeHtml } from "../../../scripts/lib/text.js";

function txt(t) {
  return escapeHtml(String(t || "")).toUpperCase();
}

/** Circular office seal: double ring + curved top text + straight subtext. */
export function circularSeal({ text, subtext }) {
  const id = "arc-" + Math.abs(hash(text + subtext));
  return `
  <g>
    <circle cx="70" cy="70" r="62" fill="none" stroke="currentColor" stroke-width="3"/>
    <circle cx="70" cy="70" r="50" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path id="${id}" d="M 22 70 A 48 48 0 0 1 118 70" fill="none"/>
    <text font-family="sans-serif" font-size="11" font-weight="700"
          letter-spacing="1.5" fill="currentColor">
      <textPath href="#${id}" startOffset="50%" text-anchor="middle">${txt(text)}</textPath>
    </text>
    <text x="70" y="78" font-family="sans-serif" font-size="12" font-weight="700"
          text-anchor="middle" fill="currentColor">${txt(subtext)}</text>
    <line x1="40" y1="58" x2="100" y2="58" stroke="currentColor" stroke-width="1"/>
  </g>`;
}

/** Rectangular dater: ruled box, label line, date line. */
export function rectangularDater({ text, subtext }) {
  return `
  <g>
    <rect x="6" y="20" width="200" height="74" fill="none" stroke="currentColor" stroke-width="3"/>
    <line x1="6" y1="58" x2="206" y2="58" stroke="currentColor" stroke-width="1.5"/>
    <text x="106" y="46" font-family="sans-serif" font-size="16" font-weight="700"
          letter-spacing="2" text-anchor="middle" fill="currentColor">${txt(text)}</text>
    <text x="106" y="82" font-family="monospace" font-size="15"
          text-anchor="middle" fill="currentColor">${txt(subtext)}</text>
  </g>`;
}

/** "RECEIVED"-style two-line oval/box hybrid. */
export function received({ text, subtext }) {
  return `
  <g>
    <rect x="6" y="18" width="190" height="78" rx="6" fill="none"
          stroke="currentColor" stroke-width="3"/>
    <text x="101" y="52" font-family="sans-serif" font-size="20" font-weight="800"
          letter-spacing="3" text-anchor="middle" fill="currentColor">${txt(text)}</text>
    <text x="101" y="80" font-family="monospace" font-size="14"
          text-anchor="middle" fill="currentColor">${txt(subtext)}</text>
  </g>`;
}

/** Revenue/service stamp: ornate rectangle with denomination. */
export function revenue({ text, subtext }) {
  return `
  <g>
    <rect x="10" y="8" width="120" height="150" fill="none" stroke="currentColor" stroke-width="3"/>
    <rect x="18" y="16" width="104" height="134" fill="none" stroke="currentColor" stroke-width="1"/>
    <text x="70" y="44" font-family="serif" font-size="11" font-weight="700"
          letter-spacing="1" text-anchor="middle" fill="currentColor">${txt(text)}</text>
    <circle cx="70" cy="86" r="26" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <text x="70" y="138" font-family="serif" font-size="14" font-weight="700"
          text-anchor="middle" fill="currentColor">${txt(subtext)}</text>
  </g>`;
}

/** Postal cancellation: concentric rings + killer bars across. */
export function cancellation({ text, subtext }) {
  const id = "cnc-" + Math.abs(hash(text + subtext));
  return `
  <g>
    <circle cx="70" cy="70" r="56" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <circle cx="70" cy="70" r="44" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <path id="${id}" d="M 26 70 A 44 44 0 0 1 114 70" fill="none"/>
    <text font-family="sans-serif" font-size="9.5" font-weight="700"
          letter-spacing="1" fill="currentColor">
      <textPath href="#${id}" startOffset="50%" text-anchor="middle">${txt(text)}</textPath>
    </text>
    <text x="70" y="76" font-family="monospace" font-size="11" font-weight="700"
          text-anchor="middle" fill="currentColor">${txt(subtext)}</text>
    <g stroke="currentColor" stroke-width="3">
      <line x1="130" y1="52" x2="210" y2="52"/>
      <line x1="130" y1="64" x2="210" y2="64"/>
      <line x1="130" y1="76" x2="210" y2="76"/>
      <line x1="130" y1="88" x2="210" y2="88"/>
    </g>
  </g>`;
}

const FAMILIES = {
  "circular-seal": circularSeal,
  "rectangular-dater": rectangularDater,
  received,
  revenue,
  cancellation,
};

export function stampGeometry(family, opts) {
  const fn = FAMILIES[family] || circularSeal;
  return fn(opts);
}

// Stable id hashing so re-renders are byte-identical.
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
