#!/usr/bin/env node
// generate.js — the orchestrator. spec.json -> HTML + PDF + PNG in output/.
//
// Usage:
//   npm run generate -- specs/examples/postal-notification.json [outDir]
//   node scripts/generate.js <spec.json> [outDir]
//
// Pipeline: validate -> render (HTML) -> export PDF + PNG.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { validateSpec } from "./validate-spec.js";
import { renderSpec } from "./render.js";
import { htmlToPdf } from "./to-pdf.js";
import { htmlToPng } from "./to-png.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export async function generate(specPath, outDir) {
  const spec = JSON.parse(readFileSync(resolve(specPath), "utf8"));

  const { valid, errors } = validateSpec(spec);
  if (!valid) {
    const msg = errors
      .map((e) => `  • ${e.instancePath || "(root)"} ${e.message}`)
      .join("\n");
    throw new Error(`Spec is invalid:\n${msg}`);
  }

  const dir = resolve(outDir || resolve(ROOT, "output"));
  mkdirSync(dir, { recursive: true });
  const name = spec.title || basename(specPath, ".json");

  const html = renderSpec(spec);
  const htmlPath = resolve(dir, `${name}.html`);
  writeFileSync(htmlPath, html, "utf8");

  const landscape = spec.docType === "postcard";
  const pdfPath = resolve(dir, `${name}.pdf`);
  const pngPath = resolve(dir, `${name}.png`);

  await htmlToPdf(html, pdfPath, { landscape });
  await htmlToPng(html, pngPath);

  return { htmlPath, pdfPath, pngPath };
}

async function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error("Usage: node scripts/generate.js <spec.json> [outDir]");
    process.exit(1);
  }
  try {
    const { htmlPath, pdfPath, pngPath } = await generate(specPath, process.argv[3]);
    console.log(`✓ HTML → ${htmlPath}`);
    console.log(`✓ PDF  → ${pdfPath}`);
    console.log(`✓ PNG  → ${pngPath}`);
  } catch (err) {
    console.error(`✗ ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
