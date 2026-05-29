// date.js — format a metadata.date value per its `format` token.
// Kept tiny and deterministic (no locale dependence).

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/** date = { value, format }. value is ISO (YYYY-MM-DD) or free text. */
export function formatDate(date) {
  if (!date || !date.value) return "";
  const { value, format = "long-en" } = date;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m || format === "as-written") return value;
  const [, y, mo, d] = m.map(Number);
  const day = Number(d);
  if (format === "short-en") {
    return `${String(day).padStart(2, "0")} ${MONTHS[mo - 1].slice(0, 3)} ${y}`;
  }
  // long-en: "the 1st October 1947"
  return `the ${ordinal(day)} ${MONTHS[mo - 1]} ${y}`;
}
