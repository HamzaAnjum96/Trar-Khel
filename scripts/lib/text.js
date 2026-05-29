// text.js — helpers for localised text ($defs.text in the schema) and HTML escaping.
//
// A "text" value is either a plain string (primary language) or an { en, hi } object.

const ESCAPE = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(str) {
  return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ESCAPE[c]);
}

/** Resolve the primary-language string for a text value. */
export function primary(text, lang = "en") {
  if (text == null) return "";
  if (typeof text === "string") return text;
  return text[lang] ?? text.en ?? text.hi ?? "";
}

/** Resolve the secondary (Hindi) string, if present and distinct. */
export function secondary(text, lang = "en") {
  if (text == null || typeof text === "string") return "";
  const other = lang === "en" ? text.hi : text.en;
  return other ?? "";
}

/**
 * Render a localised text value as escaped HTML. When bilingual and a secondary
 * string exists, the secondary is wrapped in a <span class="lang-alt"> beneath.
 */
export function renderText(text, { lang = "en", bilingual = true } = {}) {
  const main = escapeHtml(primary(text, lang));
  if (!bilingual) return main;
  const alt = secondary(text, lang);
  if (!alt) return main;
  return `${main}<span class="lang-alt" lang="${lang === "en" ? "hi" : "en"}">${escapeHtml(alt)}</span>`;
}

/** Inline variant: secondary shown in parentheses on the same line. */
export function renderTextInline(text, { lang = "en", bilingual = true } = {}) {
  const main = escapeHtml(primary(text, lang));
  if (!bilingual) return main;
  const alt = secondary(text, lang);
  if (!alt) return main;
  return `${main} <span class="lang-alt-inline" lang="${lang === "en" ? "hi" : "en"}">${escapeHtml(alt)}</span>`;
}
