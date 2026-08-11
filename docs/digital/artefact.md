# Jal Chihna: the artefact, the collection, and the register

**One generative engraving per snan, seeded by the river's actual published gauge reading, free to hold as a link and paid to own as a file.**

> Source note. I verified that the National Water Data Portal (nwdp.nwic.gov.in) publishes CWC river discharge datasets and exposes an APIs section and bulk download. I could not verify per-station coverage for all six waters (the CWC flood dashboard returned 401 to an unauthenticated fetch, and my search budget was exhausted). Everything below is written so that a water with no public gauge degrades honestly rather than fabricating a number. Station confirmation is open question 1.

---

# 1. The artefact

## 1.1 The name

**Retire "Sankalp Patra" for this product.** It was a certificate of a rite performed by a person. No rite is performed. Reusing the name is the one move that would break rule 1 without a single false sentence being written, because the name itself is the claim.

**New name: जल चिह्न · Jal Chihna. In English: the Watermark.**

This is the right name for three reasons that all happen to be true at once:

1. *Chihna* is a mark, a trace, a sign. The artefact is the mark the river left on a moment.
2. In printing, a watermark is a mark made in the paper by the mould itself, not printed on top of it. That is exactly the design system this thing lives in.
3. In English, a high-water mark is the line the river actually reached. The artefact prints the river's level. The pun is not a pun, it is the product.

Keep `SankalpPatra.tsx` as the component and repurpose it as the **printable A4 sheet form** of the Jal Chihna. The sheet furniture (double rule, folio line, ruled register of facts, colophon at the foot, the `u()` unit system, the print CSS) is already correct and should not be rebuilt. Change the title block, the field list and the foot line. Rename the file to `ChihnaSheet.tsx`, keep `PatraData` as `ChihnaRecord`.

The word *sankalp* survives as the name of the user's own written line, which is what it actually means. The word *snan* survives in marketing. The artefact itself never says a snan happened. It says **"taken in the name of"**, which is precisely, defensibly true.

## 1.2 The generative system

### The seed

```ts
// src/lib/chihna/seed.ts
export type ChihnaInputs = {
  v: 1;
  waterId: GhatId;
  stationId: string;         // agency station id, or "NONE"
  observedAtUtc: string;     // instant of the reading the agency published
  stageM: number | null;     // metres above datum, as published
  dischargeCumecs: number | null;
  keptAtUtc: string;         // instant the user's window closed
  nameNorm: string;          // NFC, trimmed, whitespace collapsed, lowercased
  gotraNorm: string;         // same, or ""
};

const fmt = (n: number | null) => (n === null ? "-" : n.toFixed(3));

export const canonical = (i: ChihnaInputs) =>
  ["snanify.chihna", i.v, i.waterId, i.stationId, i.observedAtUtc,
   fmt(i.stageM), fmt(i.dischargeCumecs), i.keptAtUtc,
   i.nameNorm, i.gotraNorm].join("|");

// digest = sha256(canonical)
// seedShort = digest.slice(0, 12)      printed on the artefact
// rng = xoshiro128** seeded from digest bytes 0..15
```

Two properties this buys, and they are the whole commercial argument:

- **Unfakeable.** You cannot mint a chihna claiming a monsoon peak, because the peak number is inside the string that produced the hash, and the number is checkable against the agency. Forging the picture means forging the government's gauge record.
- **Recomputable by a stranger.** The verify page prints the full canonical string. Anyone can run `sha256` on it, get our seed, and re-render the identical image. Publish the algorithm and the 24 corner devices at `/chihna/how`.

Store the raw agency response body for every reading, with its fetch timestamp and a hash, in our own table. Agency pages rotate and expire. The record has to outlive them.

### What stays constant, in every single chihna, forever

This is the list that makes ten thousand of these read as one press rather than ten thousand posters:

- Two colours only, `--ink` and `--spot`, plus paper. No third value, no gradient, no glow, no radius, no shadow, no fill except the disc and the level block.
- The pinhole projection itself: `y = horizon + C/d`, half-width `∝ 1/d`. Every plate is the same camera.
- The vanishing point at `x = 0.62W`, always right of centre, so type keeps clean paper on the left.
- The disc sits at the vanishing point's x. Always.
- Plate framing: one 1px rule, a 3px gap, one 2px rule. Same on all five formats.
- Type: Eczar for the title and the numerals, Martel Sans for the labels. The title is Devanagari in both editions.
- The register is ruled, three columns, hairlines between rows, opening on a 2px rule.
- The colophon mark bottom right, the verify URL bottom left.
- Stroke linecap butt. No round joins anywhere.

### What varies, and from what

Derived first:

```
level01   = clamp01((stageM - stationP01) / (stationP99 - stationP01))
flow01    = clamp01(log1p(dischargeCumecs) / log1p(stationP99Discharge))   // log, rivers are log
moonFrac  = illuminated fraction, 0..1
waxing    = boolean
altDeg    = altitude of the ruling body (sun by day, moon by night) at the ghat, at keptAt
tempC     = published water temperature, or null
```

| Visual | Driven by | Range |
| --- | --- | --- |
| Horizon y | `level01` | `0.30H` (low water) to `0.40H` (high water). Higher river, higher horizon, more of the sheet is ink. |
| Bank half-width at near plane | `level01` | `0.52W` to `0.78W` |
| Ripple count | `flow01` | 18 to 64 |
| Ripple amplitude coefficient | `flow01` | 6 to 22 |
| Second-harmonic weight (chop) | `flow01` | 0.15 to 0.75 |
| Interior streamline count | `flow01` | 3 to 9 |
| Stroke width | `tempC`, else 1.15 | 0.85 at 10C or below, 1.45 at 30C or above |
| Sky hatch line count | `altDeg` | 26 lines (night, dense) to 6 (noon, open paper) |
| Disc y | `altDeg` | above horizon by `(altDeg/90) * 0.30H`; below the horizon the disc is drawn as outline only and clipped by the waterline |
| Disc form | `waxing`, `moonFrac`, day/night | day: solid spot disc. night: engraved phase, hard terminator, lit limb solid spot, dark limb 0.5px hatch at 60 degrees, 6 units apart. Amavasya is an outlined empty circle. Purnima is a full spot disc. |
| Glitter path near width | `flow01 * level01` | 90 to 260 |
| Meander phase and amplitude | `rng()` | phase 0 to 2pi, amplitude 40 to 96 |
| Corner device | `rng() % 24` | one of 24 authored engraved devices: lotus, kusha, conch, diya, step fret, wave fret, and so on |
| Misregistration | `rng()` | spot layer offset dx, dy in -3..3, applied only to the spot plate |

The first six rows are the data. The last three are the fingerprint, so two people who keep the same instant at the same water still get different sheets.

**The immediate consequence, and it is the marketing hook:** a monsoon-peak chihna is a visibly *dark, crowded, high-horizon* sheet. A January low-flow chihna is a *pale, open, wide-margined* one. You can tell what the river was doing from ten feet away, and you did not have to be told.

### The six water plates

A `foreground` layer, authored once per water, drawn in the near field over the ripples. Never generated, never varied. This is where the family resemblance meets the honesty rule.

- **ganga-haridwar**: the Har Ki Pauri step run entering from the left, five steps, chain rail posts.
- **triveni-prayagraj**: two channels. Two converging bank pairs meeting at the vanishing point, and the join line drawn as one heavier streamline that stops 40 percent up the frame, which is what the visible line actually does. No steps. A boat outline near right.
- **yamuna-mathura**: a low ghat wall across the bottom third with Vishram Ghat's arched cell openings.
- **godavari-nashik**: not an open bank. A rectangular stone kund in perspective, closed on all four sides, water inside it, the river beyond the far lip.
- **shipra-ujjain**: a long shallow step run across the whole bottom edge, nine steps, very low rise.
- **kaveri-talakaveri**: **no river at all.** A square tank in one-point perspective, one circle of spring water in it, the Brahmagiri ridge as the horizon instead of a waterline, no banks, no ripples. The register prints "Source, not a ghat. There is no bathing here." `rivers.ts` already commits us to this and the artefact must hold the line.

### Adapting RiverFlow

`RiverFlow.tsx` stays exactly as it is on the landing page. The plate is a separate, still, pure module.

1. Extract `project`, `halfWidth`, `centre`, `ripplePath`, `streamPath` into `src/lib/chihna/geometry.ts` verbatim, but lift every module constant (`HORIZON`, `HALF_W`, `MEANDER`, `RIPPLES`, `STREAMS`, `SKY_LINES`, `D_NEAR`, `D_FAR`) into a `PlateParams` object.
2. Delete `t` from every signature and replace it with a fixed `phase` from the seed. One frozen frame.
3. New: the phase-cut disc, the per-water foreground, the corner devices, the level block.
4. `plateSvg(params: PlateParams): string` is a **pure function returning an SVG string, with no React**. The React component wraps it with `dangerouslySetInnerHTML`; the raster route feeds the same string to `@resvg/resvg-js`.
5. **Do not use `next/og` ImageResponse for the plate.** `src/lib/og-card.tsx` already documents that it has no Devanagari face loaded, and satori will not honour arbitrary path geometry the way we need. resvg with Eczar and Martel Sans registered gives correct Devanagari and exact paths.
6. Formats do not crop. Each format re-runs the geometry with its own canvas height, so the 9:16 story is a *taller river*, not a cropped one. That is how one system yields five formats that all look designed.

## 1.3 What is printed on it

In order down the A4 sheet:

1. Masthead: mark, wordmark, and the folio, `Chihna No. 004 217`
2. Title: जल चिह्न, then `JAL CHIHNA` in inscriptional caps, then the subtitle line
3. **The plate.** Largest element on the sheet, roughly 45 percent of the height.
4. Taken in the name of, in Latin and Devanagari. Gotra beneath.
5. Given by, when it is a gift. Both names, always.
6. The sankalp, the user's own words, only if the user toggled show.
7. **The register**, ruled, three columns:
   - Water and ghat: `Ganga · Har Ki Pauri, Haridwar`
   - Kept at: date, IST clock, and the same instant in the user's own zone
   - Tithi and paksha, printed only when `confidence === "sourced"`, otherwise the cell is a blank rule, exactly as `SankalpPatra` already does
   - Window: `Brahma Muhurat · 04:24 to 05:12 IST`
   - Gauge station: name and the agency's own station id
   - Level: `294.13 m · 0.87 m below warning level`
   - Flow: `412 cumecs`
   - Water temperature, omitted entirely when not published
   - Sunrise and sunset at the ghat
   - Moon: `Waxing, 62% lit`
   - Reading taken: the instant the *agency* observed, separate from the instant the user kept
8. **The Jal Stambha**, the rarity glyph. See 2.2.
9. The state line, one sentence.
10. Sequence: `Chihna No. 004 217` globally, and `the 1,412th chihna at Har Ki Pauri`. Both are honest, both are collectible, and low numbers are genuinely scarce forever.
11. `Seed d41f2a9b7c03` and `snanify.com/c/{22-char-base58}`
12. The attestation line, then the foot line.

## 1.4 Formats, ranked

**1. WhatsApp, 1080 x 1350 (4:5), JPEG q82, under 200 KB. This is the one that matters.**

4:5 is the tallest aspect WhatsApp renders in-chat without cropping, which makes it the largest object that can appear in a family group. The diaspora does not post to Instagram to reach their mother, they forward to a group of eleven people, and eight of them forward it again. Design constraint that falls out of this: **the top 320 pixels must carry the name, the water and the date**, because that is what is legible in a chat list preview before anyone taps.

**2. Story, 1080 x 1920.** WhatsApp Status and Instagram Stories, one tap, broadcast to everyone in the contact list. Second largest free distribution channel, and it costs one extra render.

**3. Printable A4, 210 x 297 at 300 dpi, plus a PDF with Eczar and Martel Sans embedded.** Fourth in volume, first in emotional weight. This is what gets printed in Ludhiana and put in the puja room, and it is the only format where the whole register is legible. It is also what makes the product feel like a thing rather than a download, which is what justifies the price.

**4. Square, 1080 x 1080.** Instagram feed. Real but smaller for this audience than status.

**5. Wallpaper.** 1179 x 2556 (iPhone), 1440 x 3120 (Android), 2560 x 1440 (desktop). Keep the top 420 px of the phone sizes clear of type for the lock-screen clock; the register goes in the bottom third. Lowest volume, highest daily impression count, and it costs nothing to add.

Delivery is one page with a Web Share API button that attaches the 4:5 file directly, then a grid of the other four. Not a zip.

---

# 2. The collection

## 2.1 The sets

A set is a list, not a loot table. Completing one issues **a new sheet**, not a badge: one A4 page carrying all the member chihna with the river's state on each of those days. That is a genuinely new artefact and it is why someone buys six times.

| Set | Members | Note |
| --- | --- | --- |
| **षट् तीर्थ · Shat Tirtha** | All six waters, any order, any time | The core repeat purchase. Sold as a pass. |
| **द्वादश पूर्णिमा · Dwadash Purnima** | The twelve Purnimas of one Samvat year | The best gift product in the company, see 2.5. |
| **सोलह श्राद्ध · Solah Shraddha** | The sixteen days of Pitru Paksha | Remembrance treatment: no corner device, plain double rule, never in an OG preview. |
| **ब्रह्म सप्तक · Brahma Saptak** | Seven consecutive days in the Brahma Muhurat window | The streak set. It is a discipline, and it is described as one, not as a bonus. |
| **द्वादश संक्रांति · Dwadash Sankranti** | The sun's twelve ingresses in a year | Solar reckoning, so it never collides with the tithi sets. |
| **कुंभ पर्व · Kumbh Parva** | The principal bathing days of a running Kumbh or Simhastha | Only exists in a Kumbh year. Real scarcity by definition, nothing invented. |

Set sheets print, honestly, how many people have completed that set and on what date this one was completed. No cap, no cutoff, no "only 500 will exist."

## 2.2 Rarity, computed from real physics

**Every rarity statement is a percentile against that station's own published record, and it names the window it was measured over.** Never a grade, never a gem, never a probability, never a roll.

Five bands, and they are descriptions of the water rather than tiers:

| Band | Rule |
| --- | --- |
| **स्थिर · Steady** | Between the 20th and 80th percentile of that station's readings over the baseline window |
| **न्यून जल · Low water** | Below the 5th percentile |
| **पूर्ण जल · High water** | Above the 95th percentile |
| **चेतावनी · Above warning level** | At or above the level the agency itself publishes as its warning level |
| **संकट रेखा · Above danger level** | Above the level the agency publishes as its danger level |

The last two are not our thresholds. They are the agency's, published, named on the sheet. That is what makes them uncontestable.

**On flood days the artefact does not celebrate.** The state line reads, factually and without a lecture: "Above the level the agency publishes as its danger level. That is a flood, and people downstream are being moved." One line. This is not moralising, it is the single thing that separates this from a gacha, and it is the reason the whole system reads as real.

Calendrical rarity is stated separately and as a **count**, never as a grade: "Purnima. One of twelve in this Samvat year." "Somvati Amavasya. It last fell seven months ago and next falls in fourteen."

### Display: the Jal Stambha

Rarity is never a coloured bar. It is an engraved **staff gauge**, the numbered post that stands in every Indian river:

- A vertical 1px rule, 100 units tall, with numbered ticks every 10 units.
- Two heavy horizontal rules across it, labelled `W` and `D` in the English edition and `चे` and `सं` in Hindi: warning level and danger level, at their published heights.
- Your reading is a solid spot-colour block filled from the bottom, with a heavy tick and the number set beside it.
- One line beneath: `0.87 m below warning · higher than 61% of readings here since 2016`.

That is the entire rarity UI. Real object, flat ink, honest, legible at thumbnail size.

## 2.3 The Bahi

The archive is **बही · the Bahi**, "Your Register" in English. The name is already earned inside the product: `rivers.ts` describes the Prayagwal purohits keeping pilgrim registers going back generations. The archive is drawn as exactly that, a ledger page.

- Folio number at the head, entries in date order, hairline column rules.
- Columns: `No. · Date and tithi · Water and ghat · Window · Level · Flow · State · Chihna`
- Gift entries get a spot-colour rule in the left margin and name the giver in the row.
- At the foot, the sets as **completion grids**: six boxes for Shat Tirtha, twelve for the Purnimas, sixteen for Solah Shraddha. Each box is either an empty hairline square or struck through in spot colour with its date set inside.
- A "carried forward" line at the very bottom, as a real bahi has.
- The whole page prints to A4 with the existing print CSS pattern.

## 2.4 Free and paid

**Recommendation: the river is free, the experience is free, the file is paid.**

**Free, no account:**
- A live page per water, showing level, flow, temperature, sunrise, moon phase, tithi and the muhurat window, updating. This is the SEO engine, the daily-return habit, and the proof that "the river comes to you" is literally true before anyone pays.

**Free, email only, capped at one per water per day:**
- The full snan. Choose a water, enter a name and gotra, write a sankalp, sit through the paced three-minute screen while the live gauge ticks. At the end you receive a **permanent page** at `snanify.com/c/{id}` with the full plate rendered in the browser, the full register, the Jal Stambha, the sequence number, and the seed.

The free artefact is **not crippled, not watermarked, not a preview**. It is the whole thing. It is shareable as a link, and the link's OG image is the 4:5 plate, so the family group sees the artefact whether or not anyone paid.

**Paid: the file.** ₹199 / $4.
- All five raster formats, the A4 PDF with Devanagari embedded, the wallpapers, and the sheet.

Why this split and not the other one:

1. A watermarked free artefact travels badly and makes the paid one look like the same thing minus a fee. A free artefact that is genuinely complete travels *well*, and every share is a free acquisition.
2. "The page is ours, the file is yours" is a distinction a buyer understands in under a second and does not resent. It is also true: we could go out of business and the file survives.
3. It keeps rarity honest. Everyone can keep the great day. The monsoon peak is not paywalled, which is exactly why the monsoon peak is worth having.
4. Zero human operations. Everything is a cron, a fetch and a render.

The per-water-per-day cap exists to protect the sequence number. If free chihna are unlimited, "the 1,412th at Har Ki Pauri" means nothing. Six a day is generous and it keeps the ledger meaningful.

**The rest of the tariff:**

| SKU | Price | What |
| --- | --- | --- |
| One Chihna | ₹199 / $4 | Every file, forever |
| Shat Tirtha pass | ₹899 / $18 | Six files, redeemable over any period |
| The Bahi, one year | ₹1,499 / $30 | Every file for a year, the printed register, and the year-end **Samvat Patra**: one sheet, every snan of the year, the river's state on each |
| Gift, one | ₹499 / $10 | Delivered on WhatsApp, see 2.5 |
| **Barah, twelve Purnimas** | ₹2,499 / $49 | One purchase, twelve deliveries |

**The arithmetic, honestly.** At a blended $9 net per paying customer after payment fees and tax, $20,000 monthly profit needs roughly 2,200 paying customers a month, which at a 2.5 percent conversion off a free snan means about 89,000 free snans a month, roughly 3,000 a day. That is the real target, and it is the number the shareability of the 4:5 image has to produce. The infrastructure cost of 3,000 renders a day is negligible. The gift SKUs carry the average order value and the Barah is the one that makes the model work, because it is one checkout and twelve distribution events.

## 2.5 Gifting

The highest-intent purchase in the product. Design it as the primary flow, not a checkbox.

**The buyer:** 34, Toronto. **The recipient:** his mother, 71, Jalandhar, reads Hindi, uses WhatsApp, cannot travel to Haridwar.

**The flow, end to end:**

1. He picks the water, and the day. The day picker surfaces the occasions that actually matter: her father's tithi, Ganga Dussehra, a Purnima, her birthday. He enters **her** name and gotra. He writes a one-line dedication that will be printed on the sheet.
2. He chooses delivery: the morning of that day, at the muhurat, on WhatsApp, in Hindi. He gives her number.
3. At 05:40 IST on the day, she receives a message from our WhatsApp Business number, in Hindi: the 4:5 image with her name and the plate on it, one line of text, and a link.
4. She taps. The page opens in Hindi by default, one column, large type, no signup, no app. The plate. Her name. The river as it was forty minutes earlier. A recorded recitation of the sankalp verse, ninety seconds, a real human voice recorded once per water. **Her name is shown on screen, never synthesised into the audio.** A mangled TTS name would be the exact tell that kills the whole thing.
5. She taps "Save" and gets the file. The gift already paid for it.
6. He gets a notification when she opens it. The chihna appears in **both** bahis: in hers as her own, in his marked *given*.

**The sheet prints both names.** "Taken in the name of Sushila Devi", and beneath it, "Given by Rohit Kumar." A gift artefact with only one name on it fails as a gift, every time.

**Remembrance gifts.** For a parent who has passed: the label changes to "Taken in remembrance of", the plate omits the corner device and uses a plain double rule, and the chihna is **never** placed in an OG preview image. `patra.ts` already states the rule and the reason: a death is not a thumbnail. Keep it word for word.

**The line that keeps rule 1.** No gift copy, on any surface, says she bathed, was blessed, or had anything performed for her. It says her name was kept at a moment when the river was in a stated condition, and it shows the condition. That is enough, and it is what people actually want, which is to be thought of on a day that matters.

**Push the Barah as the hero gift.** Twelve Purnimas, one purchase, auto-issued at the Purnima muhurat and delivered to her phone every month for a year. Twelve occasions on which a mother messages her son. Twelve shares into a family group. Near-zero operations after checkout. Nothing else in the product has that ratio.

---

# 3. Build order

1. `src/lib/chihna/geometry.ts`, lifted from `RiverFlow.tsx`, constants parameterised, time removed.
2. `src/lib/chihna/seed.ts`, canonical string, sha256, xoshiro128**.
3. `src/lib/chihna/plate.ts`, `plateSvg(params): string`, pure, no React. The six foreground plates and the 24 corner devices as authored path data.
4. `src/components/chihna/Plate.tsx`, a thin wrapper.
5. `ChihnaSheet.tsx`, forked from `SankalpPatra.tsx`, new field list, new foot line, plate slotted above the register.
6. `src/app/api/chihna/[id]/render/route.ts`, resvg, five canvases, Eczar and Martel Sans registered.
7. `/c/[id]` page, `/bahi`, `/chihna/how`, and the `/verify` extension that returns the canonical string.
8. The gauge poller: a cron per station, raw response stored, percentile baseline rebuilt nightly.

`RiverFlow.tsx` is untouched. `og-card.tsx` needs replacing anyway; it is still on the old gradient palette that `globals.css` explicitly outlaws.


---

## Copy

All copy below is final and paste-ready. No em dashes. Hindi is not a translation of the English; both are written natively and say the same thing.

═══════════════════════════════════════════════
A. ON THE ARTEFACT
═══════════════════════════════════════════════

--- Sheet chrome ---

Title (Devanagari in both editions):  जल चिह्न
Latin subtitle (caps, both editions): JAL CHIHNA

Subtitle line
EN  The river's own condition, at the moment you kept.
HI  उस क्षण नदी की अपनी स्थिति, जो क्षण आपने रखा।

Folio label
EN  Chihna
HI  चिह्न

Sequence lines
EN  Chihna No. 004 217  ·  the 1,412th chihna kept at Har Ki Pauri
HI  चिह्न क्रमांक ००४ २१७  ·  हर की पौड़ी पर रखा गया १,४१२वाँ चिह्न

--- Name block ---

EN  Taken in the name of
HI  जिनके नाम से लिया गया

EN  Taken in remembrance of
HI  जिनके स्मरण में लिया गया

EN  Given by
HI  भेंटकर्ता

EN  Gotra   /   Not stated
HI  गोत्र   /   अनुल्लिखित

EN  The sankalp, as it was written
HI  संकल्प, जैसा लिखा गया

--- Register labels ---

EN  Water and ghat            HI  जल और घाट
EN  Kept at                   HI  जो क्षण रखा गया
EN  In your own time          HI  आपके अपने समय में
EN  Tithi                     HI  तिथि
EN  Window                    HI  बेला
EN  Gauge station             HI  गेज स्थल
EN  Level                     HI  जलस्तर
EN  Flow                      HI  प्रवाह
EN  Water temperature         HI  जल का ताप
EN  Sunrise                   HI  सूर्योदय
EN  Sunset                    HI  सूर्यास्त
EN  Moon                      HI  चंद्रमा
EN  Reading taken             HI  पाठ लिया गया
EN  Source                    HI  स्रोत
EN  Seed                      HI  बीज

EN  Anyone may check this chihna at
HI  इस चिह्न की जाँच कोई भी यहाँ कर सकता है

--- Value formats ---

Level
EN  294.13 m  ·  0.87 m below warning level
HI  294.13 मी  ·  चेतावनी स्तर से 0.87 मी नीचे

Flow
EN  412 cumecs  ·  higher than 61% of readings here since 2016
HI  412 क्यूमेक  ·  2016 से यहाँ लिए गए 61% पाठों से अधिक

Moon
EN  Waxing, 62% lit  ·  Shukla Ashtami
HI  शुक्ल पक्ष, 62% प्रकाशित  ·  शुक्ल अष्टमी

Nothing published for a field
EN  Not published by the agency
HI  एजेंसी द्वारा प्रकाशित नहीं

No gauge at this site
EN  No public gauge at this site. The nearest published station is named above.
HI  इस स्थल पर कोई सार्वजनिक गेज नहीं। निकटतम प्रकाशित स्थल ऊपर अंकित है।

Talakaveri, always
EN  Source, not a ghat. There is no bathing here.
HI  उद्गम, घाट नहीं। यहाँ स्नान होता ही नहीं।

--- The state line (one of five) ---

स्थिर · Steady
EN  Between the 20th and 80th of a decade of readings at this station.
HI  इस स्थल के दस वर्षों के पाठों में बीच का भाग।

न्यून जल · Low water
EN  Below the 5th percentile of a decade of readings at this station.
HI  इस स्थल के दस वर्षों के पाठों में नीचे के पाँच प्रतिशत में।

पूर्ण जल · High water
EN  Above the 95th percentile of a decade of readings at this station.
HI  इस स्थल के दस वर्षों के पाठों में ऊपर के पाँच प्रतिशत में।

चेतावनी · Above warning level
EN  At or above the level the agency publishes as its warning level.
HI  एजेंसी जिसे चेतावनी स्तर कहती है, जल उस पर या उससे ऊपर है।

संकट रेखा · Above danger level
EN  Above the level the agency publishes as its danger level. That is a flood, and people downstream are being moved.
HI  एजेंसी जिसे संकट स्तर कहती है, जल उससे ऊपर है। यह बाढ़ है, और नीचे के गाँव खाली कराए जा रहे हैं।

--- The attestation (heavier weight, above the foot line) ---

EN  The numbers on this sheet are the river's, not ours. They were published by the agency named above and they can be checked against it.
HI  इस पत्र पर अंकित संख्याएँ नदी की हैं, हमारी नहीं। वे ऊपर अंकित एजेंसी द्वारा प्रकाशित हुईं और उन्हीं से मिलाई जा सकती हैं।

--- The foot line (the most important string in the product) ---

EN  No rite was performed at the ghat. This is a record of the river's own condition at the moment you kept, taken from the public gauge named above, together with the name and the words you gave. It is a record of what the water was doing. It is not a promise of what will follow.
HI  घाट पर कोई अनुष्ठान नहीं किया गया। यह उस क्षण नदी की अपनी स्थिति का अभिलेख है जो क्षण आपने रखा, जो ऊपर अंकित सार्वजनिक गेज से लिया गया, और उसके साथ वह नाम तथा वे शब्द जो आपने दिए। यह इस बात का अभिलेख है कि जल क्या कर रहा था। आगे क्या होगा, इसका वचन नहीं।

═══════════════════════════════════════════════
B. THE CHIHNA PAGE, /c/{id}
═══════════════════════════════════════════════

Hero
EN  Here is the river.
    This is the Ganga at Har Ki Pauri as she was at 04:52 this morning, and this is what that hour looked like.
HI  यह रहीं नदी।
    यह हर की पौड़ी पर गंगा हैं, आज प्रातः 04:52 पर जैसी थीं, और उस बेला का रूप यही था।

Uniqueness block
EN  No two are the same, and that is not a boast.
    Your chihna was drawn from the gauge reading at Har Ki Pauri at 04:52, your name, your gotra and the second you kept. Change any one of them and it is a different picture. The reading is public. Anyone can go and check it.
HI  दो चिह्न कभी एक जैसे नहीं होते, और यह डींग नहीं है।
    आपका चिह्न 04:52 पर हर की पौड़ी के गेज पाठ से, आपके नाम से, आपके गोत्र से और उस क्षण से बना जो आपने रखा। इनमें से कोई एक बदल दीजिए, चित्र दूसरा हो जाएगा। पाठ सार्वजनिक है। कोई भी जाकर मिला सकता है।

Rarity heading, uncommon reading
EN  Why this reading is uncommon
HI  यह पाठ असामान्य क्यों है

Rarity heading, ordinary reading, and the copy under it
EN  An ordinary day at Har Ki Pauri
    The river was doing what she does through most of the year, which is the reason people go there on most days of the year.
HI  हर की पौड़ी का एक साधारण दिन
    नदी वही कर रही थीं जो वे वर्ष के अधिकांश दिनों में करती हैं, और इसीलिए लोग वर्ष के अधिकांश दिनों में वहाँ जाते हैं।

The Jal Stambha caption
EN  The staff gauge at this station, with the agency's own warning and danger lines, and where your reading stood on it.
HI  इस स्थल का गेज स्तंभ, उस पर एजेंसी की अपनी चेतावनी और संकट रेखाएँ, और उन पर आपके पाठ का स्थान।

Paywall
EN  This page is yours and it stays. The file is the part you own.
    Save the Chihna  ·  ₹199
      Five sizes, cut for where you will actually send it.
      A printable sheet at A4, and a PDF that keeps the Devanagari.
      The wallpaper.
      Yours whatever happens to us.
HI  यह पृष्ठ आपका है और बना रहेगा। फ़ाइल वह भाग है जो आपकी अपनी हो जाती है।
    चिह्न सहेजें  ·  ₹199
      पाँच नाप, ठीक वहाँ के लिए जहाँ आप इसे भेजेंगे।
      A4 पर छपने योग्य पत्र, और PDF जिसमें देवनागरी अपनी ही रहती है।
      वॉलपेपर।
      हमारा जो हो, यह आपकी रहेगी।

Share button
EN  Send it       HI  भेजिए
EN  Save it       HI  सहेजिए
EN  Print it      HI  छापिए

═══════════════════════════════════════════════
C. THE BAHI, /bahi
═══════════════════════════════════════════════

EN  eyebrow  Your register
    title    The Bahi.
    lede     Every water you have kept, in the order you kept them, with the river's condition on each day. Set as a register, because that is what it is.
HI  eyebrow  आपकी बही
    title    बही।
    lede     आपने जो-जो जल रखे, उसी क्रम में, और प्रत्येक दिन नदी की स्थिति के साथ। बही की तरह छपी, क्योंकि है वही।

Column heads
EN  No.  ·  Date and tithi  ·  Water and ghat  ·  Window  ·  Level  ·  Flow  ·  State  ·  Chihna
HI  क्रम  ·  दिनांक व तिथि  ·  जल और घाट  ·  बेला  ·  जलस्तर  ·  प्रवाह  ·  स्थिति  ·  चिह्न

Gift row marker
EN  Given by Rohit Kumar
HI  भेंटकर्ता: रोहित कुमार

Empty register
EN  Nothing entered yet. The register begins at the first water you keep.
HI  अभी कोई प्रविष्टि नहीं। बही उसी जल से आरंभ होती है जो आप पहला रखते हैं।

Carried forward line
EN  Carried forward: 7 chihna, 4 waters, 1 set complete.
HI  आगे लाया गया: 7 चिह्न, 4 जल, 1 समुच्चय पूर्ण।

Sets block
EN  Sets
    Six waters, twelve moons, sixteen days.
    A set is not a reward. It is a list of waters you have kept, and when the list is finished you get a sheet with the whole of it on one page.
HI  समुच्चय
    छह जल, बारह चंद्र, सोलह दिन।
    समुच्चय कोई पुरस्कार नहीं। यह उन जलों की सूची है जो आपने रखे, और सूची पूरी होने पर सब कुछ एक ही पन्ने पर छपकर आपको मिल जाता है।

Set names and lines
EN  Shat Tirtha        All six waters, in any order, over any length of time.
    Dwadash Purnima    The twelve Purnimas of one Samvat year.
    Solah Shraddha     The sixteen days of Pitru Paksha.
    Brahma Saptak      Seven days running, each in the Brahma Muhurat window.
    Dwadash Sankranti  The sun's twelve entries into a sign, across one year.
    Kumbh Parva        The principal bathing days of a Kumbh, in a year that has one.
HI  षट् तीर्थ          छहों जल, किसी भी क्रम में, कितने भी समय में।
    द्वादश पूर्णिमा      एक संवत् वर्ष की बारह पूर्णिमाएँ।
    सोलह श्राद्ध        पितृ पक्ष के सोलह दिन।
    ब्रह्म सप्तक        लगातार सात दिन, प्रत्येक ब्रह्म मुहूर्त की बेला में।
    द्वादश संक्रांति     एक वर्ष में सूर्य के बारह राशि-प्रवेश।
    कुंभ पर्व           जिस वर्ष कुंभ हो, उस वर्ष के प्रमुख स्नान-दिवस।

Set completion
EN  Complete. The Shat Tirtha Patra has been issued to you.
HI  पूर्ण। षट् तीर्थ पत्र आपको जारी कर दिया गया है।

═══════════════════════════════════════════════
D. GIFTING, /bhent
═══════════════════════════════════════════════

EN  eyebrow  For someone who cannot travel
    title    Send the river to your mother's phone.
    lede     You choose the water, the day and the hour. On that morning, at that hour, a message reaches her in Hindi with her name on it and the Ganga exactly as she was. She needs no account, no app, and no understanding of any of this. She taps once.
HI  eyebrow  उनके लिए, जो यात्रा नहीं कर सकते
    title    नदी को माँ के फ़ोन तक भेजिए।
    lede     जल, दिन और बेला आप चुनते हैं। उसी सुबह, उसी बेला पर, उनके पास हिंदी में एक संदेश पहुँचता है, उस पर उनका नाम होता है और गंगा ठीक वैसी जैसी वे उस क्षण थीं। उन्हें न खाता चाहिए, न ऐप, न इस सबको समझना। वे एक बार छूती हैं, बस।

Steps
EN  1  Choose the water and the day.  Her father's tithi. Ganga Dussehra. A Purnima. Her birthday.
    2  Write it in your own words.     One line, printed on the sheet under her name.
    3  We send it at the hour.          On WhatsApp, in Hindi, from a number that stays the same.
    4  You are told when she opens it.  And it enters both registers, hers and yours.
HI  1  जल और दिन चुनिए।                 उनके पिता की तिथि। गंगा दशहरा। कोई पूर्णिमा। उनका जन्मदिन।
    2  अपने शब्दों में लिखिए।            एक पंक्ति, जो उनके नाम के नीचे पत्र पर छपेगी।
    3  हम उसी बेला पर भेजते हैं।         व्हाट्सएप पर, हिंदी में, उसी नंबर से जो बदलता नहीं।
    4  खुलते ही आपको बता दिया जाता है।   और वह दोनों बहियों में दर्ज हो जाता है, उनकी भी, आपकी भी।

What she is not asked to do
EN  She is not asked to sign up, install anything, or reply. If she never taps, the chihna waits for her, and it does not expire.
HI  उनसे न पंजीकरण कराया जाता है, न कुछ इंस्टॉल, न उत्तर देने को कहा जाता है। यदि वे कभी न छुएँ, चिह्न उनकी प्रतीक्षा में रहता है, और वह समाप्त नहीं होता।

The Barah
EN  The Barah, twelve Purnimas.
    One purchase. Twelve mornings across a year, each at the Purnima muhurat, each with the river as she was. Twelve reasons she picks up the phone and tells you she has seen it.
    ₹2,499
HI  बारह, बारह पूर्णिमाएँ।
    एक बार लीजिए। वर्ष भर बारह सुबहें, प्रत्येक पूर्णिमा के मुहूर्त पर, प्रत्येक में नदी ठीक वैसी जैसी वे उस क्षण थीं। बारह अवसर, जब वे फ़ोन उठाकर आपको बताएँगी कि उन्होंने देख लिया।
    ₹2,499

The remembrance option
EN  In remembrance
    If the name is of someone who has passed, the sheet says so, the ornament comes off, and the chihna is never put into a link preview. A death is not a thumbnail.
HI  स्मरण में
    यदि नाम किसी दिवंगत का है, तो पत्र पर वही लिखा जाता है, अलंकरण हटा दिया जाता है, और वह चिह्न कभी किसी लिंक की झलक में नहीं रखा जाता। मृत्यु किसी की झलक-तस्वीर नहीं होती।

The honesty line on the gift page
EN  What she receives is the river's condition at an hour kept in her name. Nobody bathed for her, nothing was performed at the ghat, and we do not say otherwise anywhere on the sheet.
HI  उन्हें जो मिलता है, वह उस बेला में नदी की स्थिति है जो उनके नाम से रखी गई। उनके लिए किसी ने स्नान नहीं किया, घाट पर कुछ संपन्न नहीं हुआ, और पत्र पर हम कहीं इससे भिन्न कुछ नहीं कहते।

--- The WhatsApp message she actually gets (template) ---

HI  {{name}} जी, आज {{tithi}} पर, {{ghat}} पर {{river}} का जल प्रातः {{time}} बजे जैसा था, वह आपके नाम से रखा गया है। भेजने वाले: {{giver}}। यहाँ देखिए: {{link}}
EN  {{name}}, the {{river}} at {{ghat}} stood at {{level}} at {{time}} this morning, and that moment has been kept in your name by {{giver}}. See it here: {{link}}

═══════════════════════════════════════════════
E. THE EXPLAINER, /chihna
═══════════════════════════════════════════════

EN  eyebrow  Jal Chihna
    title    The mark the water left.
    lede     Every snan happens at a moment when the river was in a particular state, and that state is on the public record. Your name, your gotra, the second you kept, and the gauge reading at that second are the whole of what draws the picture. Two chihna have never been alike and cannot be.
HI  eyebrow  जल चिह्न
    title    जो चिह्न जल छोड़ गया।
    lede     हर स्नान उस क्षण होता है जब नदी किसी एक विशेष स्थिति में थी, और वह स्थिति सार्वजनिक अभिलेख में है। आपका नाम, आपका गोत्र, वह क्षण जो आपने रखा, और उसी क्षण का गेज पाठ, चित्र इन्हीं से बनता है। दो चिह्न आज तक एक जैसे नहीं हुए, और हो भी नहीं सकते।

How to read the picture
EN  How to read it
    The higher the water, the higher the horizon and the more of the sheet is ink. The stronger the flow, the more ripples and the rougher they run. The disc is the sun by day and the moon at night, cut to its actual phase. The channel bends where your own seed sends it, and no reading on earth changes that bend.
HI  इसे कैसे पढ़ें
    जल जितना ऊँचा, क्षितिज उतना ऊँचा, और पन्ने पर स्याही उतनी अधिक। प्रवाह जितना तेज़, तरंगें उतनी अधिक और उतनी ही खुरदरी। बिंब दिन में सूर्य है और रात्रि में चंद्र, ठीक उसी कला में कटा हुआ। धारा वहीं मुड़ती है जहाँ आपका अपना बीज उसे मोड़ता है, और उस मोड़ को दुनिया का कोई पाठ नहीं बदल सकता।

Verification
EN  Check it yourself
    The full line the picture was made from is printed on the verification page. Run sha256 on it, and you get the seed printed on the sheet. Take the reading to the agency's own record, and you get the same number. We are not asking to be believed.
HI  स्वयं जाँच लीजिए
    जिस पूरी पंक्ति से यह चित्र बना, वह सत्यापन पृष्ठ पर छपी है। उस पर sha256 चलाइए, वही बीज मिलेगा जो पत्र पर छपा है। पाठ लेकर एजेंसी के अपने अभिलेख में जाइए, वही संख्या मिलेगी। हम विश्वास करने को नहीं कह रहे।

═══════════════════════════════════════════════
F. STRINGS THAT MUST NEVER APPEAR
═══════════════════════════════════════════════

Never: certified, blessed, purified, sin, moksha, guaranteed, on your behalf,
performed for you, your snan was completed at the ghat, sacred water sent to you,
limited edition, only N will ever exist, rare drop, legendary, chance of, odds.

Never in Hindi: प्रमाणित, पाप, मुक्ति प्राप्त, आपकी ओर से संपन्न,
घाट पर आपका स्नान पूर्ण हुआ, सीमित संस्करण, दुर्लभ पुरस्कार।


## Open questions

- Station coverage. Which of the six waters actually has a published gauge, and at what cadence and latency? Ganga at Haridwar and Yamuna at Mathura are near certain; the Shipra at Ujjain and the Kaveri at Talakaveri very likely have no CWC telemetry at all. My design degrades honestly (name the nearest published station and its distance, print 'No public gauge at this site'), but somebody needs to open the FFS station list and confirm each of the six before the six water plates are built.
- Licensing. What are the terms of use on NWDP and CWC data for commercial redistribution? We are printing government readings on a paid artefact. Confirm attribution requirements and whether a per-artefact source line satisfies them.
- The percentile baseline. Is a decade of historical readings per station actually downloadable, or must we build the baseline by polling ourselves? If the latter, every percentile line at launch has to name a short window ('since March 2026') and that weakens the rarity story for the first year. This is the single biggest risk to the honest-rarity design.
- Reading cadence versus the muhurat window. If the agency publishes hourly at best, the 'reading taken' timestamp will often sit 20 to 50 minutes before the moment the user kept. I have designed for two separate timestamps on the sheet. Confirm that is acceptable rather than papering over it.
- Pricing and currency. Should the INR price be materially lower than the USD price, and if so does the free tier stay identical in both markets? My numbers assume a diaspora-weighted mix; India-domestic volume would change the whole model.
- WhatsApp delivery. Business Cloud API sender approval, template approval for the gift message, and whether a third party may collect a recipient's number for a scheduled non-transactional message under current WhatsApp policy. This is the only part of the gift flow that is not fully under our control.
- Recurring versus one-time on the Barah. Twelve deliveries off one payment is cleanest, but confirm whether an Indian recurring mandate would be a better fit for retention, and what the RBI e-mandate friction actually costs in conversion.
- Does the Sankalp Patra name get retired outright, or held back for a future in-person product? If it is being kept in reserve, the routes at /patra and /patra/sample need a decision: redirect to /chihna, or stay and be clearly marked as a different product.