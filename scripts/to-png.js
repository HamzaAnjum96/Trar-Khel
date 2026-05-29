#!/usr/bin/env node
// to-png.js — render an HTML string/file to a PNG of the .sheet element via Chromium.
//
// Usage:
//   node scripts/to-png.js output/office-memo.html output/office-memo.png
// Or import htmlToPng(html, outPath) from generate.js.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { withPage } from "./lib/browser.js";

export async function htmlToPng(html, outPath, { scale = 2 } = {}) {
  await withPage(html, async (page) => {
    await page.setViewportSize({ width: 1100, height: 1400 });
    // Re-set content at the chosen device scale for a crisp raster.
    const sheet = await page.$(".sheet");
    if (sheet) {
      await sheet.screenshot({ path: resolve(outPath) });
    } else {
      await page.screenshot({ path: resolve(outPath), fullPage: true });
    }
  });
  return outPath;
}

async function main() {
  const [htmlPath, outPath] = process.argv.slice(2);
  if (!htmlPath || !outPath) {
    console.error("Usage: node scripts/to-png.js <in.html> <out.png>");
    process.exit(1);
  }
  const html = readFileSync(resolve(htmlPath), "utf8");
  await htmlToPng(html, outPath);
  console.log(`✓ PNG → ${outPath}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
