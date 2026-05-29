#!/usr/bin/env node
// render.js — turn a validated spec into semantic HTML (paper + content layers).
// The mark and wear layers are populated by the imperfection engine (Sprint 4);
// here they are empty placeholders so the page is complete and stable.
//
// Usage:
//   npm run render -- specs/examples/office-memo.json [output/office-memo.html]
//   node scripts/render.js <spec.json> [out.html]
//
// Exposes renderSpec(spec) for use by generate.js.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

import { validateSpec } from "./validate-spec.js";
import { makePrng } from "./lib/prng.js";
import { primary } from "./lib/text.js";
import * as C from "../templates/partials/content.js";
import { renderMarks } from "../templates/partials/marks.js";
import { renderWear } from "../templates/partials/wear.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const TONE_CLASS = {
  "off-white": "tone-off-white",
  buff: "tone-buff",
  grey: "tone-grey",
  manila: "tone-manila",
};

function loadStyles() {
  const files = ["fonts.css", "paper.css", "document.css"];
  return files
    .map((f) => readFileSync(resolve(ROOT, "templates/styles", f), "utf8"))
    .join("\n\n");
}

function paperVars(spec) {
  const p = spec.paperProfile || {};
  const edge = p.edgeDarkening ?? 0.35;
  const foxing = p.foxing ?? 0.2;
  return `--edge-darkening:${edge};--foxing:${foxing};`;
}

/** Assemble the content layer for the standard (letter-like) doc types. */
function letterContent(spec, ctx) {
  return [
    C.masthead(spec, ctx),
    `<hr class="rule-double">`,
    C.metadataRows(spec, ctx),
    C.headingStack(spec, ctx),
    `<hr class="rule">`,
    C.subject(spec, ctx),
    C.salutation(spec, ctx),
    C.body(spec, ctx),
    spec.recipient ? C.party(spec.recipient, "recipient", ctx) : "",
    C.signature(spec, ctx),
    C.pageMark(spec),
  ]
    .filter(Boolean)
    .join("\n");
}

/** Assemble the content layer for postcards (postal zoning). */
function postcardContent(spec, ctx) {
  const post = spec.postal || {};
  const legend = post.legend
    ? `<div class="postcard-legend">${primary(post.legend, ctx.lang)}</div>`
    : "";
  const address = (post.addressLines || []).join("\n");
  const message = post.message ? primary(post.message, ctx.lang) : "";
  return `
    ${C.masthead(spec, ctx)}
    ${legend}
    <div class="postcard-grid">
      <div class="postcard-message">${message}</div>
      <div class="postcard-address">
        <div class="postcard-stamp-box">POSTAGE</div>
        <div class="address-lines">${address}</div>
      </div>
    </div>`;
}

export function renderSpec(spec) {
  const lang = spec.language?.primary || "en";
  const bilingual = spec.language?.bilingual ?? true;
  const prng = makePrng(spec.seed ?? 0);
  const ctx = { lang, bilingual, prng };

  const isPostcard = spec.docType === "postcard";
  const content = isPostcard ? postcardContent(spec, ctx) : letterContent(spec, ctx);

  // Mark + wear layers (Sprint 4 engine; safe no-ops until then).
  const marks = renderMarks(spec, ctx);
  const wear = renderWear(spec, ctx);

  const toneClass = TONE_CLASS[spec.paperProfile?.tone || "buff"] || "tone-buff";
  const sheetClass = `${toneClass}${isPostcard ? " postcard" : ""}`;
  const title = spec.title || spec.docType || "trar-khel";

  const template = readFileSync(resolve(ROOT, "templates/base.html"), "utf8");
  return template
    .replace("{{LANG}}", lang)
    .replace("{{TITLE}}", title)
    .replace("{{STYLES}}", loadStyles())
    .replace("{{BODY_CLASS}}", isPostcard ? "postcard" : "")
    // sheet carries tone + per-spec paper vars inline so a fixed seed is byte-stable.
    .replace(
      `<article class="sheet {{SHEET_CLASS}}">`,
      `<article class="sheet ${sheetClass}" style="${paperVars(spec)}">`,
    )
    .replace("{{CONTENT}}", content)
    .replace("{{MARKS}}", marks)
    .replace("{{WEAR}}", wear);
}

function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error("Usage: node scripts/render.js <spec.json> [out.html]");
    process.exit(1);
  }
  const spec = JSON.parse(readFileSync(resolve(specPath), "utf8"));
  const { valid, errors } = validateSpec(spec);
  if (!valid) {
    console.error("✗ Spec is invalid; fix it before rendering:");
    console.error(JSON.stringify(errors, null, 2));
    process.exit(1);
  }
  const html = renderSpec(spec);
  const outPath =
    process.argv[3] ||
    resolve(ROOT, "output", `${basename(specPath, ".json")}.html`);
  mkdirSync(dirname(resolve(outPath)), { recursive: true });
  writeFileSync(resolve(outPath), html, "utf8");
  console.log(`✓ Rendered HTML → ${outPath}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
