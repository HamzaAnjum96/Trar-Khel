// wear.js — LAYER 4 (wear): punch holes, fold stress, edge abrasion, tag wear.
//
// All wear is POSITIONAL (local causality): punch holes at the filing corner,
// fold damage along one axis, abrasion concentrated at the tag point. Driven by
// spec.fold / punchHoles / tagWear + seed. See docs/04-imperfection-engine.md.

export function renderWear(spec, ctx) {
  const parts = [];
  const { prng } = ctx;

  // --- Fold stress: a tonal ridge + faint fracture along one axis. ---
  const fold = spec.fold || {};
  if (fold.axis && fold.axis !== "none") {
    const pos = ((fold.position ?? 0.5) * 100).toFixed(1);
    const intensity = fold.intensity ?? 0.3;
    const horizontal = fold.axis === "horizontal";
    const grad = horizontal
      ? `linear-gradient(to bottom, transparent calc(${pos}% - 3px),
           rgba(60,42,18,${(intensity * 0.5).toFixed(2)}) ${pos}%,
           transparent calc(${pos}% + 3px))`
      : `linear-gradient(to right, transparent calc(${pos}% - 3px),
           rgba(60,42,18,${(intensity * 0.5).toFixed(2)}) ${pos}%,
           transparent calc(${pos}% + 3px))`;
    parts.push(
      `<div class="fold" style="position:absolute; inset:0; background:${grad}; mix-blend-mode:multiply;"></div>`,
    );
  }

  // --- Tag/corner wear: a soft dark abrasion at the top-left filing point. ---
  const tagWear = spec.tagWear ?? 0;
  if (tagWear > 0) {
    parts.push(
      `<div class="tag-wear" style="position:absolute; left:0; top:0; width:120px; height:120px;
        background:radial-gradient(circle at 18% 18%,
          rgba(40,28,10,${(tagWear * 0.45).toFixed(2)}) 0%, transparent 70%);
        mix-blend-mode:multiply;"></div>`,
    );
  }

  // --- Punch holes at the filing corner (default top-left). ---
  const ph = spec.punchHoles || {};
  if (ph.show) {
    const count = ph.count ?? 2;
    const place = ph.position || "top-left";
    const holes = [];
    for (let i = 0; i < count; i++) {
      // stack holes down the left margin, near the corner
      let top, left;
      if (place === "top") {
        top = 26;
        left = 120 + i * 90 + prng.between(-2, 2);
      } else if (place === "left-margin") {
        top = 160 + i * 160 + prng.between(-3, 3);
        left = 22;
      } else {
        // top-left
        top = 60 + i * 70 + prng.between(-3, 3);
        left = 28 + prng.between(-2, 2);
      }
      holes.push(
        `<span style="position:absolute; left:${left.toFixed(0)}px; top:${top.toFixed(0)}px;
          width:11px; height:11px; border-radius:50%;
          background:rgba(255,255,255,0.85);
          box-shadow: inset 0 0 0 1px rgba(40,28,10,0.5),
                      1px 1px 2px rgba(40,28,10,0.4);"></span>`,
      );
    }
    parts.push(`<div class="punch-holes">${holes.join("")}</div>`);
  }

  return parts.join("\n");
}
