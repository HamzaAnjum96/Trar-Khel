#!/usr/bin/env node
// to-pdf.js — render an HTML string/file to a print-ready PDF via Chromium.
//
// Usage:
//   node scripts/to-pdf.js output/office-memo.html output/office-memo.pdf
// Or import htmlToPdf(html, outPath) from generate.js.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { withPage } from "./lib/browser.js";

export async function htmlToPdf(html, outPath, { landscape = false } = {}) {
  await withPage(html, async (page) => {
    await page.pdf({
      path: resolve(outPath),
      printBackground: true,
      preferCSSPageSize: true,
      landscape,
    });
  });
  return outPath;
}

async function main() {
  const [htmlPath, outPath] = process.argv.slice(2);
  if (!htmlPath || !outPath) {
    console.error("Usage: node scripts/to-pdf.js <in.html> <out.pdf>");
    process.exit(1);
  }
  const html = readFileSync(resolve(htmlPath), "utf8");
  await htmlToPdf(html, outPath);
  console.log(`✓ PDF → ${outPath}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
