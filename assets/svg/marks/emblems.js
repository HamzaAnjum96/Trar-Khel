// emblems.js — small inline SVG emblems for the masthead.
// Stylised, not official reproductions: enough to read as a state emblem at ~46px.

const ASHOKA = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="emblem">
  <g fill="none" stroke="currentColor" stroke-width="3">
    <circle cx="50" cy="50" r="30"/>
    <circle cx="50" cy="50" r="6" fill="currentColor"/>
  </g>
  <g stroke="currentColor" stroke-width="2">
    ${Array.from({ length: 24 }, (_, i) => {
      const a = (i * Math.PI) / 12;
      const x1 = 50 + 8 * Math.cos(a);
      const y1 = 50 + 8 * Math.sin(a);
      const x2 = 50 + 28 * Math.cos(a);
      const y2 = 50 + 28 * Math.sin(a);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    }).join("")}
  </g>
</svg>`;

const CROWN = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="emblem">
  <g fill="none" stroke="currentColor" stroke-width="3">
    <path d="M20 70 L20 40 L35 55 L50 32 L65 55 L80 40 L80 70 Z"/>
    <line x1="20" y1="78" x2="80" y2="78"/>
    <circle cx="50" cy="26" r="4" fill="currentColor"/>
  </g>
</svg>`;

const STAR = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="emblem">
  <path fill="currentColor" d="M50 12 L61 40 L91 40 L67 58 L76 88 L50 70 L24 88 L33 58 L9 40 L39 40 Z"/>
</svg>`;

const EMBLEMS = { ashoka: ASHOKA, crown: CROWN, star: STAR };

export function emblemSvg(name) {
  return (EMBLEMS[name] || "").trim();
}
