# 05 — Typography & layout

The references don't look "designed" — they look **printed**. The goal is institutional,
schematic typography with disciplined vertical rhythm and white space doing organisational
work. This page documents the type system and layout rules the renderer enforces, all defined
in [`templates/styles/`](../templates/styles/).

## Type roles (four jobs, four families)

| Role | CSS var | Default stack | Use for |
| --- | --- | --- | --- |
| Formal print | `--font-serif` | Libre Baskerville → Liberation Serif → Times | titles, document body |
| Office chrome | `--font-sans` | IBM Plex Sans → Liberation Sans → Arial | metadata, labels, table heads |
| Typed inserts | `--font-mono` | Courier Prime → Courier New | occasional typed strings (sparingly) |
| Bilingual Devanagari | `--font-deva` | Noto Serif/Sans Devanagari | Hindi labels (`[lang="hi"]`) |

These are **digital approximations**, not historical matches; what matters is preserving the
*division of labour* between formal print, office metadata and monospaced insertions.

### Vendoring fonts (optional but recommended)

Defaults fall back to widely available system fonts, so the pipeline works out of the box. For
**pixel-stable, offline PDF/PNG**, vendor the real webfonts:

1. Drop `.woff2` files into [`assets/fonts/`](../assets/fonts/).
2. Add an `@font-face` rule in [`templates/styles/fonts.css`](../templates/styles/fonts.css)
   whose `font-family` matches the variable name (e.g. `"Libre Baskerville"`).

That's it — the stacks already list those family names first.

## Hierarchy (feature #1)

- **Masthead** is centred: emblem → authority (bold, letter-spaced serif) → department →
  office (plain grotesque). This is the authority signal.
- **Heading stack** is centred under a double rule: optional `kicker` (spaced caps), a `title`
  (bold, underlined), an optional italic `subtitle`. Keep it short.
- **Ruled separators** (`.rule`, `.rule-double`) divide zones. Rules and white space, not
  boxes or colour, carry the structure.

## Metadata placement (feature #2)

The `.metadata` row splits left/right: **file & diary numbers on the left**, **place & date on
the right**, with italic `references` beneath. Density here is the strongest "official" tell —
don't leave it sparse.

## Body

- Justified serif body at ~14.5px with a 1.5 line-height.
- Paragraphs may carry a bold clause number (`.clause-no`).
- Lists and tables use the grotesque for headers; tables are fully ruled.

## Margins & rhythm

- A4 sheet (`794×1123px @ ~96dpi`), narrowish margins (`64px/72px`), one sheet per page.
- Authentic admin paper has **long vertical rhythm** and sometimes asymmetric cropping. Let
  white space organise; resist filling it.

## Postcards

Landscape sheet split 50/50: **message left, address + stamp + cancellation right** (postal
zoning, feature #6). The "POST CARD" legend sits centred above the divide; the postage box is
pinned upper-right.

## Print & motion

- `@page { size: A4; margin: 0 }` so PDF export is one clean sheet per page.
- Any animation must respect `prefers-reduced-motion` (a global reset is included). This style
  needs essentially no motion anyway.

## Restraint checklist

- One `title`, maybe one `subtitle`. No expressive display type.
- No distressed/grunge fonts anywhere — wear comes from the ink and paper layers, never the type.
- Keep the bilingual balance bureaucratic: Hindi as a quiet second line, not decoration.
