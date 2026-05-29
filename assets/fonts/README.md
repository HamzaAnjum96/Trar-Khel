# assets/fonts/

Drop vendored open webfonts (`.woff2`) here for **deterministic, offline** PDF/PNG export.
The pipeline works without them (it falls back to system fonts), but vendoring locks the look.

## What to add (all open-licensed)

| Family | Files (typical) | License |
| --- | --- | --- |
| Libre Baskerville | regular, italic, bold | SIL OFL |
| IBM Plex Sans | regular, medium, condensed | SIL OFL |
| Courier Prime | regular, bold | SIL OFL |
| Noto Serif Devanagari / Noto Sans Devanagari | regular, bold | SIL OFL |

## How to wire them up

After adding a file, declare it in [`../../templates/styles/fonts.css`](../../templates/styles/fonts.css):

```css
@font-face {
  font-family: "Libre Baskerville";
  src: url("../../assets/fonts/LibreBaskerville-Regular.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
}
```

The family name must match the one already listed first in the `--font-*` stacks, so no other
change is needed. See [`docs/05-typography-layout.md`](../../docs/05-typography-layout.md).
