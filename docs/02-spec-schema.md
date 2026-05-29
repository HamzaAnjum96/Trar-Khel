# 02 — The spec schema (token reference)

The machine-readable contract is [`schema/document.schema.json`](../schema/document.schema.json)
(JSON Schema draft 2020-12). This page is the human-readable companion. **Improvise wording
inside fields; never add fields the schema does not define** — `additionalProperties` is
`false` throughout, so unknown keys fail validation (that is the "never invent structure"
rule, enforced).

Validate any spec with:

```bash
npm run validate -- path/to/spec.json
```

## Localised text (`$defs.text`)

Anywhere a label or sentence appears, you may write **either**:

- a plain string — `"NOTIFICATION"` (treated as the primary language), or
- an object — `{ "en": "NOTIFICATION", "hi": "अधिसूचना" }`.

When `language.bilingual` is `true`, the renderer shows the Hindi line beneath the English
where a Hindi value exists. Keep the bilingual balance *bureaucratic, not ornamental*.

## Top-level fields

| Field | Req? | Type | Notes |
| --- | --- | --- | --- |
| `docType` | ✓ | enum | `postal-notification` \| `office-memo` \| `postcard`. Picks the template. |
| `seed` | ✓ | int ≥0 | Drives all placement jitter. Same spec+seed → identical asset. |
| `title` | | string | Output filename only; not rendered. |
| `language` | | object | `{ primary: "en"\|"hi", bilingual: bool }`. |
| `masthead` | ✓ | object | Centred authority block. |
| `headingStack` | ✓ | array | Stacked headings, in order. |
| `metadata` | ✓ | object | Clerical codes (file/diary number, date, references). |
| `writer` / `recipient` | | party | Name / designation / address lines. |
| `subject` | | text | The "Subject:" line. |
| `salutation` | | text | e.g. "Sir,". |
| `body` | | array | Ordered content blocks (paragraph / list / table). |
| `signature` | | object | `{ name, designation, style: "ink"\|"typed" }`. |
| `stamps` | | array | 0–4 marks. **2 or fewer reads best.** |
| `paperProfile` | | object | Paper tone + ageing. |
| `fold` | | object | Fold axis/position/intensity. |
| `punchHoles` | | object | Filing holes (default top-left). |
| `tagWear` | | 0–1 | Corner/edge wear at the filing point. |
| `postal` | postcard | object | Required when `docType: "postcard"`. |

## `masthead`

| Field | Type | Notes |
| --- | --- | --- |
| `authority` | text ✓ | e.g. "GOVERNMENT OF INDIA". |
| `department` | text | e.g. "Posts and Telegraphs Department". |
| `office` | text | e.g. "Office of the Director General". |
| `emblem` | enum | `ashoka` \| `crown` \| `star` \| `none`. |

## `headingStack[]`

`{ text, level }` where `level` is `kicker` \| `title` \| `subtitle`. Keep it short and
schematic — usually a `title` plus an optional `subtitle`.

## `metadata`

| Field | Type | Notes |
| --- | --- | --- |
| `fileNumber` | string | e.g. `No. 12(7)/47-P&T`. Slashes + section abbreviations. |
| `diaryNumber` | string | e.g. `D-2389/47`. |
| `date` | object ✓ | `{ value, format: long-en\|short-en\|as-written }`. |
| `place` | text | e.g. "New Delhi". |
| `references[]` | string[] | "with reference to your No. … dated …" lines. |
| `pageMarks.show` | bool | Show page number marks. |

## `body[]` blocks (`$defs.block`)

- **paragraph** — `{ type: "paragraph", number?, text }`. `number` is an optional clause label (`"2."`).
- **list** — `{ type: "list", ordered?, items: text[] }`.
- **table** — `{ type: "table", columns?: text[], rows: text[][] }`.

## `stamps[]`

| Field | Type | Notes |
| --- | --- | --- |
| `family` | enum ✓ | `circular-seal` \| `rectangular-dater` \| `revenue` \| `received` \| `cancellation`. |
| `text` / `subtext` | text | Stamp wording (e.g. office name / date). |
| `position` | quadrant | `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` \| `center`. One quadrant each. |
| `tiltRange` | [min,max] | Degrees, e.g. `[-4, 4]`. The seed picks a value in range. |
| `pressureDropout` | 0–1 | How much ink fails to print. Higher = patchier. |
| `scale` | 0.3–3 | Size multiplier. |
| `ink` | enum | `violet` \| `black` \| `red` \| `blue`. |

See [`04-imperfection-engine.md`](04-imperfection-engine.md) for how these become believable ink.

## `paperProfile`, `fold`, `punchHoles`, `tagWear`

- `paperProfile`: `tone` (`off-white`\|`buff`\|`grey`\|`manila`), `foxing` 0–1 (keep low & clustered),
  `edgeDarkening` 0–1 (favour margins/edges).
- `fold`: `axis` (`horizontal`\|`vertical`\|`none`), `position` 0–1, `intensity` 0–1.
- `punchHoles`: `show`, `count` 1–4, `position` (`top-left` default).
- `tagWear`: 0–1 corner/edge wear at the filing point.

> **Restraint reminder:** defaults are deliberately gentle. Push `foxing`, `edgeDarkening`,
> `pressureDropout` and stamp `count` *up* only a little. Over-damage is the #1 way to make it
> look like a prop instead of a document.

## `postal` (postcard only)

| Field | Type | Notes |
| --- | --- | --- |
| `zoning` | enum | `right-half` (recipient + markings on the right). |
| `stampPosition` | enum | `upper-right`. |
| `legend` | text | The "POST CARD" legend. |
| `addressLines[]` | string[] | Recipient address (right side). |
| `message` | text | The left-half message. |

## Example specs

Copy and adapt from [`specs/examples/`](../specs/examples/):
`postal-notification.json`, `office-memo.json`, `postcard.json`.
