// content.js — LAYER 2 content partials. Pure functions: (spec, ctx) -> HTML string.
// ctx = { lang, bilingual, prng }. All text goes through escape/renderText.

import { renderTextInline, escapeHtml as escape } from "../../scripts/lib/text.js";
import { formatDate } from "../../scripts/lib/date.js";
import { emblemSvg } from "../../assets/svg/marks/emblems.js";

export function masthead(spec, ctx) {
  const m = spec.masthead || {};
  const emblem = m.emblem && m.emblem !== "none" ? emblemSvg(m.emblem) : "";
  return `
    <header class="masthead">
      ${emblem ? `<div class="emblem" aria-hidden="true">${emblem}</div>` : ""}
      <p class="authority">${renderTextInline(m.authority, ctx)}</p>
      ${m.department ? `<p class="department">${renderTextInline(m.department, ctx)}</p>` : ""}
      ${m.office ? `<p class="office">${renderTextInline(m.office, ctx)}</p>` : ""}
    </header>`;
}

export function headingStack(spec, ctx) {
  const items = (spec.headingStack || [])
    .map((h) => `<div class="${h.level}">${renderTextInline(h.text, ctx)}</div>`)
    .join("\n      ");
  return `<div class="heading-stack">\n      ${items}\n    </div>`;
}

export function metadataRows(spec, ctx) {
  const md = spec.metadata || {};
  const left = [];
  if (md.fileNumber) left.push(`<span class="file-number">${escape(md.fileNumber)}</span>`);
  if (md.diaryNumber) left.push(escape(md.diaryNumber));

  const right = [];
  if (md.place) right.push(renderTextInline(md.place, ctx));
  if (md.date) right.push(`Dated ${escape(formatDate(md.date))}`);

  const refs = (md.references || [])
    .map((r) => `<div>${escape(r)}</div>`)
    .join("\n      ");

  return `
    <div class="metadata">
      <div class="meta-left">${left.join("\n      ")}</div>
      <div class="meta-right">${right.join("\n      ")}</div>
    </div>
    ${refs ? `<div class="references">\n      ${refs}\n    </div>` : ""}`;
}

export function subject(spec, ctx) {
  if (!spec.subject) return "";
  return `<p class="subject"><span class="label">Subject:</span> ${renderTextInline(spec.subject, ctx)}</p>`;
}

export function salutation(spec, ctx) {
  if (!spec.salutation) return "";
  return `<p class="salutation">${renderTextInline(spec.salutation, ctx)}</p>`;
}

function paragraph(block, ctx) {
  const no = block.number ? `<span class="clause-no">${escape(block.number)}</span>` : "";
  return `<p class="para">${no}${renderTextInline(block.text, ctx)}</p>`;
}

function list(block, ctx) {
  const tag = block.ordered ? "ol" : "ul";
  const items = (block.items || [])
    .map((it) => `<li>${renderTextInline(it, ctx)}</li>`)
    .join("\n        ");
  return `<${tag}>\n        ${items}\n      </${tag}>`;
}

function table(block, ctx) {
  const head = (block.columns || []).length
    ? `<thead><tr>${block.columns.map((c) => `<th>${renderTextInline(c, ctx)}</th>`).join("")}</tr></thead>`
    : "";
  const body = (block.rows || [])
    .map((row) => `<tr>${row.map((cell) => `<td>${renderTextInline(cell, ctx)}</td>`).join("")}</tr>`)
    .join("\n        ");
  return `<table>${head}<tbody>\n        ${body}\n      </tbody></table>`;
}

export function body(spec, ctx) {
  if (!spec.body || !spec.body.length) return "";
  const blocks = spec.body
    .map((b) => {
      if (b.type === "paragraph") return paragraph(b, ctx);
      if (b.type === "list") return list(b, ctx);
      if (b.type === "table") return table(b, ctx);
      return "";
    })
    .join("\n      ");
  return `<div class="body">\n      ${blocks}\n    </div>`;
}

export function party(p, label, ctx) {
  if (!p) return "";
  const name = p.name ? `<div class="name">${renderTextInline(p.name, ctx)}</div>` : "";
  const desig = p.designation ? `<div class="designation">${renderTextInline(p.designation, ctx)}</div>` : "";
  const addr = (p.address || []).length
    ? `<div class="address">${p.address.map(escape).join("\n")}</div>`
    : "";
  return `<div class="party party-${label}">${name}${desig}${addr}</div>`;
}

export function signature(spec, ctx) {
  const s = spec.signature;
  if (!s) return "";
  return `
    <div class="signature style-${s.style || "ink"}">
      ${s.name ? `<div class="sign-name">${renderTextInline(s.name, ctx)}</div>` : ""}
      ${s.designation ? `<div class="sign-designation">${renderTextInline(s.designation, ctx)}</div>` : ""}
    </div>`;
}

export function pageMark(spec) {
  if (!spec.metadata?.pageMarks?.show) return "";
  return `<div class="page-mark">— 1 —</div>`;
}
