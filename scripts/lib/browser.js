// browser.js — shared Playwright Chromium helper for PDF/PNG export.
// Loads HTML via setContent so vendored fonts (file:// relative to ROOT) resolve.

import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/** Run a callback with a loaded page; always closes the browser. */
export async function withPage(html, fn) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    // baseURL so relative url(...) to assets/fonts resolve from the repo root.
    await page.goto(pathToFileURL(ROOT + "/").href);
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluateHandle("document.fonts.ready");
    return await fn(page);
  } finally {
    await browser.close();
  }
}
