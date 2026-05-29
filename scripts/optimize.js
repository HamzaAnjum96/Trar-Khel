#!/usr/bin/env node
// optimize.js — SVGO pass to shrink/clean an SVG (traced marks or hand SVG).
//
// Usage:
//   npm run optimize -- path/to/mark.svg [out.svg]   (defaults to in-place)
//   node scripts/optimize.js mark.svg

import { readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

const CONFIG = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // keep ids: our marks reference textPath/mask ids internally
          cleanupIds: false,
          removeViewBox: false,
        },
      },
    },
  ],
};

export function optimizeSvg(svg) {
  return optimize(svg, CONFIG).data;
}

function main() {
  const [inputPath, outArg] = process.argv.slice(2);
  if (!inputPath) {
    console.error("Usage: node scripts/optimize.js <in.svg> [out.svg]");
    process.exit(1);
  }
  const before = statSync(resolve(inputPath)).size;
  const out = optimizeSvg(readFileSync(resolve(inputPath), "utf8"));
  const outPath = outArg || inputPath;
  writeFileSync(resolve(outPath), out, "utf8");
  const after = Buffer.byteLength(out);
  const pct = before ? Math.round((1 - after / before) * 100) : 0;
  console.log(`✓ Optimised ${inputPath} → ${outPath}  (${before} → ${after} bytes, -${pct}%)`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
