# 01 — The aesthetic grammar

Six features define the look. Each one maps to tokens in the spec and to a rendering layer.
If your output is missing several of these, it will read as a poster, not a state document.

---

## 1. Hierarchy by typography and spacing

Official Indian communication templates are **plain but heavily structured**: centred
headings, stacked lines, serial numbers, department names, dates, `No.` prefixes, subjects,
and disciplined use of rules and white space. The standard formats (letters, office
memoranda, inter-departmental notes, office orders, resolutions) are *schematic, not
expressive*. Even bilingual versions keep the structure rigid. That rigidity is what reads as
authority.

- **Tokens:** `headingStack`, `columnSystem`, `departmentHeader`, `docType`.
- **Layer:** content.
- **Do:** centre the masthead; stack authority → title → subject; rule between zones.
- **Don't:** use expressive/branded display typography.

## 2. Metadata density

Bureaucratic paper carries **codes everywhere**: diary numbers (serial + code letters +
section), file numbers (with slashes and section abbreviations), branch names, dates, page
numbers, references to earlier communications, and case flags. The document must never look
like a poster — it must look **traceable**.

- **Tokens:** `fileNumber`, `diaryNumber`, `references[]`, `dateFormat`, `pageMarks`.
- **Layer:** content.
- **Do:** put a file number top-right, a diary number near the masthead, "ref. to your No. …"
  lines in the body.
- **Don't:** leave large empty zones with no codes; that's the poster tell.

## 3. Physical file behaviour

Procedure manuals say papers are **punched on the top-left corner** and tagged into the file
in chronological order, with notes and correspondence portions inside one cover; covers are
labelled and sometimes colour-coded. That is why archival office paper shows **hole patterns,
edge wear near the tagging point, compressed corners, layered page shadows** and a
"handled-by-clerks" look that generic grunge filters never capture.

- **Tokens:** `punchHoles`, `tagWear`, `coverLabel`.
- **Layer:** wear.
- **Do:** place punch holes at the top-left; concentrate wear there.
- **Don't:** scatter holes randomly or centre them.

## 4. Constrained paper ageing

Cheap wood-pulp paper (short fibres, lignin, alum-rosin acidity) **yellows, darkens, becomes
brittle and fractures along folds**. The authentic tone is **not** a romantic brown wash. It
is an **off-white to buff base with localised darkening, oxidised spots, fold stress**, and
occasional tears/abrasions exactly where handling concentrates.

- **Tokens:** `paperProfile` (tone, foxing density, edge darkening), `fold`.
- **Layers:** paper + wear.
- **Do:** darken margins/folds/edges more than the centre; keep foxing sparse and clustered.
- **Don't:** apply uniform sepia across the whole page.

## 5. Mark-making by stamps and ink, not illustration

The "texture" comes from **impression behaviour**, not distressed fonts. Real rubber-stamp
marks show: darker ink around letter edges, patchy interior fill, uneven outlines, feathering,
bleeding, blur in small type, wear, distortion, dirt and edge breakdown. Forensic sources
treat over-inking, under-inking, partial impressions and surface-texture variation as normal.

- **Tokens:** `stamps[]` (`family`, `count`, `tiltRange`, `pressureDropout`, `position`).
- **Layer:** mark.
- **Do:** model the five failure modes (see [`04-imperfection-engine.md`](04-imperfection-engine.md));
  multiply ink into paper.
- **Don't:** drop a crisp, perfectly opaque logo on top.

## 6. Postal zoning (for postcard-like assets)

Postcard rules reserve the **right-hand half** of the address side for the recipient and
postal markings, with the **postage stamp / machine impression in the upper-right**, plus a
"Post Card" legend (Hindi or English). For postcard UI this zoning is the fastest way to feel
right.

- **Tokens:** `docType: "postcard"`, `postal` block (`zoning`, `stampPosition`, `legend`).
- **Layers:** content + mark.
- **Do:** keep the left half for the message, right half for address + stamp + cancellation.
- **Don't:** centre the address or float the stamp anywhere.

---

## The cross-cutting principle: local causality

Real wear is **caused** and therefore **placed**:

- Stamps land in **one quadrant**, not everywhere.
- Fold damage follows an **axis**.
- Punch holes recur at the **filing point** (top-left).
- Annotations cluster near **margins and headers**.
- Ageing is stronger at **edges** than centres.

Faking history by damaging the whole page equally is the most common way to ruin it.
Authenticity comes from *local causality*, which is why the imperfection engine generates
damage from positional fields, not flat global filters.

## The mistakes that ruin it

- Distressed typefaces across the whole document.
- Universal sepia / full "vintage mode."
- Theatrical skew, tape textures, coffee rings, film grain.
- Symmetric poster composition.
- Random grime everywhere instead of placed wear.

The originals are mostly **plain**. Their force is routine standardisation plus *selective*
evidence of use.
