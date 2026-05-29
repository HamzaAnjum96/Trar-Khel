#!/usr/bin/env node
// trace.js — turn a scanned bitmap mark (stamp/seal/signature) into an SVG.
//
// Uses potrace for binarised monochrome source (the common case for stamps and
// signatures). For coloured/noisy scans, prefer the standalone `vtracer` CLI
// (https://github.com/visioncortex/vtracer) and then run scripts/optimize.js.
//
// Usage:
//   npm run trace -- path/to/scan.png [out.svg]
//   node scripts/trace.js scan.png marks/new-seal.svg

import { writeFileSync } from "node:fs";
import { resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import potrace from "potrace";

export function traceToSvg(inputPath, options = {}) {
  return new Promise((res, rej) => {
    potrace.trace(
      resolve(inputPath),
      {
        threshold: 128,
        turdSize: 2,
        optTolerance: 0.4,
        color: options.color || "#2b2722",
        background: "transparent",
        ...options,
      },
      (err, svg) => (err ? rej(err) : res(svg)),
    );
  });
}

async function main() {
  const [inputPath, outArg] = process.argv.slice(2);
  if (!inputPath) {
    console.error("Usage: node scripts/trace.js <scan.png> [out.svg]");
    console.error("For colour/noisy scans use the vtracer CLI instead, then `npm run optimize`.");
    process.exit(1);
  }
  try {
    const svg = await traceToSvg(inputPath);
    const out = outArg || resolve(dirname(resolve(inputPath)), basename(inputPath).replace(/\.\w+$/, ".svg"));
    writeFileSync(resolve(out), svg, "utf8");
    console.log(`✓ Traced → ${out}  (next: npm run optimize -- ${out})`);
  } catch (err) {
    console.error(`✗ trace failed: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
