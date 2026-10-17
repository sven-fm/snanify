# Design system v3: one family, loud and calm

Written 17 October 2026 from a design session with the owner. It replaces
`DESIGNSYSTEM.md` (the 15 October "morning at the ghat" edition) and is the brief for
rebuilding every surface of Snanify to it. The approved mockups are in
`docs/design/v3-mockups/` (open the `.html` files in a browser; they animate and the buttons
press). Where this document and a mockup disagree, this document wins.

Calls marked **[my call]** were made by the designer without the owner's explicit say, under
his instruction to "make the remaining calls yourself". Everything unmarked, he chose.

---

## 1. Why

The ads (the B1 calendar art, B2 matchbox and B4 signboard sets, and the PLAIN set live in
Meta since 17 October) are bold, saturated and immediately readable. The site is subdued,
paper and one red button. A person who taps a yellow ad lands somewhere that feels like a
different brand. Two causes:

1. **The colours drifted.** The site and the three ad templates use three reds (`#b32620`,
   `#c8251d`, `#d1261c`) and three yellows (`#e3962b`, `#f2c230`, `#f6c518`, plus the
   calendar's `#e2a93b`), each picked on its own day.
2. **The site borrows nothing from the ads** beyond the typefaces.

v3 makes the site and the ads one family. The site is **the ad, translated into a quieter
register**: recognisably the same at first glance, calm enough for 6 a.m. in bed, with the
snan itself the calmest part. The owner's words: "a great balance between loud and calm, and
unique. The whole experience follows this scheme." Every surface is in scope, the snan
included.

**Success:** someone who taps any ad knows in the first second they are in the right place;
the colours and pieces repeat from the ad through the landing, the snan, the Sankalp Patra in
the family's WhatsApp, and the next morning's email.

## 2. Goals, non-goals, anti-goals

**Goals**

- One palette shared by the site, the Patra image, the emails and every ad template.
- A small kit of pieces lifted from the ads (the press, the seal, the band, the label,
  signboard capitals) used on the site at low volume.
- A river that moves, in the new palette, as the brand's living element.
- The river's state readable by anyone, without units or percentiles.
- Less text. The landing's primary action above the fold at 390 × 844.

**Non-goals**

- No change to the product: the three minutes, the five parts and their durations, the
  prices, packs, the order of the buyer's path, sign-in, the data source. All of that is
  locked in `CLAUDE.md` and stays.
- No new typefaces. Eczar and Martel Sans carry both scripts.
- No new locales.

**Anti-goals** (it fails if this happens, however good it looks)

- The site turns into the ad: full yellow fields, stripes, shouting. Option "C, full
  signboard" was rejected for exactly this.
- The snan or the Patra feels like a sale. No pack counts, no "7 of 11", no band on the
  Patra, no price inside the sitting.
- Decoration that means nothing. The petals were cut for this reason ("they don't make any
  sense anymore").
- A claim the data cannot back (see 7.3).

## 3. The palette

One palette, seven named colours, each with one job. The site, `patra-image.ts`,
`site-card.ts`, `email.ts` and every template in `ads/src/` use these hex values and no
others.

| Token | Day | Night [my call] | Job |
| --- | --- | --- | --- |
| `--paper` | `#f2ead9` | `#12110e` | The ground of every page |
| `--paper-2` | `#eae0c9` | `#1a1814` | Tint ground for reference data (tables) |
| `--paper-3` | `#ded1b4` | `#24211a` | Deeper tint, the masthead's fold |
| `--ink` | `#141210` | `#ece3cf` | Type, the walls of the press, the horizon |
| `--ink-2` | `#57513f` | `#99917f` | Secondary type |
| `--sindoor` | `#c8251d` | `#e04a40` | **The one red.** Primary action, the river's name, the sun, the seal, the bindu |
| `--marigold` | `#f2c230` | `#f2c230` | **The one yellow.** Where you pay or share, light on the water, the band's words |
| `--haldi` | `#e3962b` | `#f0a83c` | Warm fills that are not light or money (rare) |
| `--teal` | `#1d5a6a` | `#5c9aa5` | **The river.** Waves, the gauge's deep end |
| `--maroon` | `#7a1a14` | `#a8352b` | Festival days only, and the calendar-art ad set |
| `--rule` | `#c3b697` | `#35302a` | Hairlines in data tables only |
| `--wall` | `#141210` | `#000000` | The side walls of the ink-block press |

- `--spot` is renamed `--sindoor`; `--haldi-2` and the `.warm` block are retired (the pale
  haldi box under the names was the look the owner moved away from). **[my call]**
- The gauge has five fills of its own, teal stepping from paper: `--gauge-1 #f2ead9`
  (thin), `--gauge-2 #e8dcc0` (low), `--gauge-3 #c9d7d2` (usual), `--gauge-4 #7fa3a6`
  (full), `--gauge-5 #1d5a6a` (in spate). Night [my call]: `#1a1814`, `#2a2a22`,
  `#24393c`, `#3d6b72`, `#5c9aa5`.
- Marigold never sets running text on paper (contrast near 1.5:1). Ink sits on marigold.
- `ads/src/copy.mjs`, `ads/src/plain.html`, `loud.html` and `campaign.html` move to these
  values: signboard and plain `#f6c518 → #f2c230`, `#d1261c → #c8251d`; matchbox black
  `#1a1410 → #141210`; calendar gold `#e2a93b → #e3962b` (haldi), calendar maroon stays
  `#7a1a14`, calendar water `#1d5a6a` already matches. Re-render all sets. **[my call on
  the calendar gold]**

## 4. Type

Same families. What changes is case and weight.

- **Display headline (h1): signboard capitals.** Eczar 800, uppercase, `line-height 0.95`,
  `letter-spacing -0.01em` (tight, never tracked). The river's name in `--sindoor`. Hindi
  has no case: Eczar 800 at `line-height 1.22`, river's name in sindoor, same weight.
- **Section headings (h2, h3): sentence case**, Eczar 700. **[my call]** Capitals are for
  the one headline a screen has.
- Body: Martel Sans 400, 15px on the landing, 16px for long reading. Buttons Martel Sans 700,
  sentence case.
- **Tracked capitals stay retired.** Small labels are sentence case, never letter-spaced.
  The Patra's header "Sankalp Patra" is Eczar 700 in sindoor, sentence case. **[my call:
  the mockup tracked it; this keeps the existing rule]**
- All script rules in the current `DESIGNSYSTEM.md` (`data-script` leading,
  `font-synthesis: none`, Devanagari numerals, tabular figures) carry over unchanged.

## 5. The kit

Pieces lifted from the ads. Each has one meaning and a limit on how often it appears.

### 5.1 The press (ink block)

Every primary button and every tappable block is the top of a solid box. Its side walls are
`--wall`, built from stacked 1px offsets so the corners connect (a box, not a floating
shadow): 2px ink border, then `box-shadow` steps `1px 1px` through `6px 6px` in `--wall`.
On `:active` it moves `translate(6px, 6px)` and the walls collapse to none, in 70ms: the
button sinks flush into the page. **This replaces `impress` everywhere.** It is not a soft
shadow; the gradients/glows/blurs ban still holds.

- Primary button: sindoor face, white Martel 700 text, an arrow at the right.
- Share button (Send it to the family, on the mark and the Patra page): marigold face, ink
  text. The only marigold button in the product.
- The sankalp hold: paper face; while held, sindoor fills it left to right over 11s.
- Secondary actions are plain ink-underlined links, never a second block. One block per
  screen holds, except setup's choices (5.1a).
- **5.1a [my call]** Setup's choices (the water, a prayer, an example sankalp) are smaller
  blocks with 3px walls; the chosen one stays sunk with a sindoor face.
- Night: same geometry, walls `#000`, border `--ink` (light), so the block edge reads.

### 5.2 The seal

A round sindoor stamp, marigold Eczar 800 lettering, a dashed marigold ring inset 6px,
rotated about -8° to +10°, drawn as SVG (the base layer zeroes radius). Two uses only:

- **The price seal**: "11 for €11" (the reader's currency via `<Price>`), on the landing and
  `/begin`.
- **The morning badge**: "7th morning" / "सातवीं सुबह", on the Patra, the Patra page and the
  mark (6.4, 6.7).

### 5.3 The band

A strip of `--ink` with marigold Martel 800 words, rotated -2°, running off both edges of
the column. It says the one thing to do. **At most one per page**, only on selling pages
(the landing, `/snan`, `/begin`) and the ready screen of the snan. **Never on the Patra or
inside the sitting.**

### 5.4 The label

The matchbox label: marigold ground, 3px ink frame, a 1.5px sindoor rule inset, centred
text. **Used sparingly: only for the eleven-morning pack** on the landing and `/begin`.
Nowhere else.

### 5.5 The gauge

How the river is running, without numbers. A horizontal strip in five fills (3) with widths
1 : 2 : 4 : 2 : 1, which are the bands' own cut points (10th, 30th, 70th, 90th percentile).
A dashed ink line at the middle marks "usual"; a sindoor dot with an ink ring marks today, at
the morning's percentile. Under it, three words: "Thin", "Usual", "In spate". Above it, the
state word and one plain sentence (7.3). Used everywhere a river figure appears: the landing
reading, the snan's reading, the Patra, the Patra page, `/live`, `/rivers/[river]`, the
reminder email.

### 5.6 The river

The brand's living element, in three sizes, all in the palette:

- **The strip**: teal waves only, no marigold, about 74px tall, behind the masthead's logo
  on every page. The waves fade out downward into paper (stepped opacity per line, not a
  gradient). **[my call: every page, same component]**
- **The full river**: below the primary action on the landing, below the reading on `/live`,
  above the footer on every page **[my call]**, and at the foot of every part of the snan.
  A thin ink horizon line; the **sun sits on it, cut by it** (its lower part hidden behind
  the water); teal waves bunch toward the horizon and open toward the viewer (rows spaced
  by `t^1.7`), each line drifting sideways at its own slow pace; the **sun's path in
  marigold** runs from directly under the sun diagonally toward the bottom centre, widening
  as it comes closer, broken into dashes that shimmer.
- **The night river** (the stillness): the same drawing in `#16404a` waves, an ember sun
  `#4a1410`, a dull gold path `#5a4a1c`.

`RiverFlow.tsx` keeps its true-perspective engine (the `1/d` projection, the trapezoid
glitter); what changes is its colours, the sun's placement (on the horizon, cut, no longer
set into the headline's float), and that it sits below the button rather than beside the
headline. Petals go. `WaterBand.tsx` becomes the strip. All of it stops under
`prefers-reduced-motion` and pauses off screen.

### 5.7 Retired marks

`Tilak`, `Kumkum`, `Mauli`, `Diya` (and its `flicker`), `Petals`. The capitals headline with
the river in sindoor does the tilak's job; space and the river do the dividers' job. The
**bindu** stays: the logo, the dot of the `ı`, the selected radio, the current step, the live
status dot. **[my call: the owner approved the new pieces and cut petals; retiring the other
marks follows from 5.3 to 5.6 doing their jobs]**

## 6. The surfaces

Every route in `CLAUDE.md`. Approved by the owner: 6.1, 6.4, 6.7. The rest **[my call]**,
applying the kit.

### 6.1 The landing (`/`)

Above the fold at 390 × 844, in this order:

1. Masthead: logo over the strip (5.6).
2. Headline in capitals: **"Your {River} snan. From home."** / "आपका {river} स्नान। घर से।"
   The river is the landing's hero water (today the Ganga at Haridwar).
3. The band: **"Takes just 3 minutes. Then share it with your family."** /
   "बस 3 मिनट। फिर परिवार को भेजिए।"
4. The price seal, and beside it: **"Breathe with the river as it runs this morning. Make
   your sankalp. Do your first snan today!"** (the last sentence bold) / "नदी के साथ साँस
   लीजिए, जैसे वह आज सुबह बह रही है। अपना संकल्प कीजिए। **आज ही पहला स्नान कीजिए!**"
5. The press: **Start your snan now →** / "अभी स्नान शुरू कीजिए →"

Cut: the live line ("The Ganga at Haridwar is running full this morning"), the long lede,
any second button. Below the fold: the full river with the sun; the reading as a gauge with the small figure row under it (6.4); the
specimen sheet in the phone; the six waters as a list; the packs, eleven on the label, one
and sixty as plain rows; the footer. Hindi copy in this document is a first draft for the
owner's Hindi pass. **[my call on the Hindi]**

### 6.2 `/snan`

The landing's sibling: capitals headline "Three minutes with your {river}.", the band, one
press. The five parts as a list with their durations. The second button ("Walk through the
five parts") goes; today it also collides with the river at 390px.

### 6.3 `/begin`, sign-in, setup

- `/begin`: the three-step line (bindu on the current step); the specimen with the buyer's
  own names in the phone; the band once; the eleven pack on the label, raised, with the
  price seal; one and sixty as plain rows; one press to pay.
- Sign-in (Clerk): the Clerk appearance takes the palette and the press for its buttons
  (`ClerkThemed.tsx`).
- Setup: one column, `max-w-md`; fields keep the 2px rule underneath, sindoor on focus;
  choices are small blocks (5.1a); the step line as above. No band, no seal.

### 6.4 The snan (`/today`)

Calm, and the same family. The full river sits at the foot of every part except the
stillness, which gets the night river.

| Part | Screen |
| --- | --- |
| Ready | Capitals "Your {River}, this morning.", the ghat and distance in ink-2, the band "Three minutes. Phone on silent.", the river, the press **Begin →** |
| The reading, 15s | The river's name in sindoor capitals, the ghat, the state word ("Running full."), the plain sentence, the gauge, and under it one small ink-2 row with the exact figure and rank ("797 m³/s · 86th percentile since 1997"), because CLAUDE.md requires the figure shown plainly in the sitting. **[my call]** |
| The breath, 45s | The river takes half the screen and rises over 4s, falls over 6s (vertical scale of the waves); the sun's path swells with it. "In" / "Out" in capitals, Out in teal. |
| The sankalp, 11s | The household's names small in ink-2, the person's own words in Eczar 700, the hold (5.1) filling with sindoor. |
| The stillness, 60s | Near black `#0b0a08`, "Be still with the river.", the seconds in dim ink, the night river, Next. |
| The mark, 20s | "Snan done." in capitals, one line writing itself, the morning badge stamping in (from the second morning), the marigold press **Send it to the family →**. **No pack count.** |

The story bar and the leave cross stay as they are.

**The share press on the mark** leads to `/p/[id]?new=1`, where the share sheet and the
image live today. The mark still mints the Patra when it starts and still moves on by itself
after its 20 seconds; the press only lets the person go sooner. Sharing from inside the
sitting is out of scope. **[my call]**

### 6.5 The Sankalp Patra (image and `/p/[id]`)

The owner's final cut, in `docs/design/v3-mockups/patra-names-v3.html`:

- Header row: "Sankalp Patra" in sindoor (4), the date and tithi in ink-2 at the right.
- The ghat engraving, full width.
- **The portrait**, if uploaded: a small black-and-white print pinned on the **right** of
  the ghat picture, **vertically centred** on it, tilted about 3°, on a paper mount with a
  hard 3px ink offset. Without a portrait, nothing is pinned.
- **The morning badge** (5.2), at the print's **top-right** corner, small (about 38px at the
  1080 sheet's scale of 270), set outward so it only just touches the photo and stays clear
  of faces. Without a portrait it sits at the ghat picture's top-right corner. **Shown from
  the second morning on**; the first sheet has none. The count is the person's mornings kept
  across all waters. **[my call on "all waters" and "from the second"]**
- **Names, one per line**, in capitals, with space above and below: 21 units for one or two
  names, 17 for three, 14 for four or five (units at the 270-wide mock; scale ×4 for the
  1080 sheet). A long name wraps under itself. Never two names on one line.
- "at the {River}, {ghat}, {city}" with the river in sindoor.
- The prayer in Devanagari.
- The state word, the plain sentence, the gauge; the exact figure and rank small at the
  right ("732 m³/s, 86th percentile since 1997"), because the Patra carries the figure and
  rank by locked decision.
- The full river with the sun cut by the horizon and its marigold path, closing the sheet.
- Footer: the time in the person's zone and in IST, the distance, `snanify.com`.
- **Never on the Patra:** the band, the label, a frame, a pack count, "7 of 11".

Formats. **The approved mockup is 9:16, which is the 1080 × 1920 memento** (`mementoSvg`):
the image that `/p/[id]/image`, `patra-store.ts`, the blob and `/specimen` serve, and the
one people share. It gets the owner's exact layout. The 1080 × 1350 sheet
(`renderPatraSheet`, used by the ad renderer) adapts it: same order, the river shorter. The
1200 × 630 link card (`patraCardSvg`) keeps today's privacy rule: **no portrait and no
badge on the card**, so a group chat's unfurl never shows a face; it carries the names, the
river's state and the gauge, and the river with the sun. **[my call]** The river shortens as
names are added; the names block grows; nothing else moves.

**The closing river is the flow-seeded engraving.** CLAUDE.md lists "an engraving seeded by
that day's published flow", and `/faq` and `/snan` promise it. So the river at the foot of
every Patra is drawn by `engrave()` from that day's seed and percentile (a fuller river
draws more, denser lines), restyled to v3: teal lines, the ink horizon, the sun cut by it,
the marigold path. The decorative `RiverFlow` geometry is for the site only. **[my call]**

**The owner's copy keeps the sankalp text** (locked decision). `SankalpPatra.tsx`, the
printable record fed by `printableRecord()`, is rebuilt to v3: the same layout as the
memento, plus the person's sankalp in Eczar 700 under the names, and its print CSS
(lighter paper `#faf6ea`). The register, the double rule and the blank gotra and giver lines
go. The shared image never carries the sankalp. **[my call]**

**Already-sent Patras stay as they were sent.** The memento PNGs cached in the blob store
are records; add a renderer version to the stored row, render v3 for new mornings only, and
keep the old renderer path for regenerating a v2 sheet whose PNG is missing. **[my call]**

`SankalpPatra.tsx` (HTML) and `patra-image.ts` (outlines via HarfBuzz) render the same
design; the image renderer hard-codes the day hex values from 3.

`/p/[id]`: the sheet; under it the marigold share press; download as a plain link. For a
guest (`PatraGuest`), one sindoor press to start their own snan.

### 6.6 Reference pages

`/live`, `/rivers`, `/rivers/[river]`, `/panchang`, `/panchang/[city]`,
`/panchang/shraddha`, `/muhurat`, `/muhurat/[occasion]`, `/kumbh`, `/faq`, `/about`,
`/privacy`, `/terms`, the 404.

- The strip in the masthead; the h1 in capitals with the river or occasion in sindoor; one
  plain sentence under it; the full river above the footer.
- `/live` and `/rivers/[river]`: each river as its name, state word, plain sentence and gauge;
  the exact figure and rank in a small row under the gauge, with the source line, as today.
- Tables keep hairline rules on `--paper-2` where columns line up (muhurat, panchang).
- One press per page, at the end, inviting the snan. No band, no seal, no label on these
  pages. Long reading (`/faq`, `/about`, legal) keeps `max-w-[38rem]` and `leading-[1.75]`.
- Festival days (`/kumbh`, an occasion page during its window): the maroon panel with a
  haldi double rule may name the occasion once. **[my call: the owner cut the calendar frame
  from the Patra and the everyday site; festival pages are its one home outside the ads]**

### 6.7 `/account`

Your mornings as a register: one row per morning (the date, the water, the badge's ordinal
in small sindoor), newest first; mornings left on the pack in plain words; reminder settings;
the marigold press to send today's sheet if one exists. **[my call]**

### 6.8 Email

`src/lib/email.ts`, Georgia (clients will not load Eczar):

- Headline in bold capitals, the river in sindoor.
- The press as a sindoor cell with a 4px `#141210` right and bottom border (box-shadow is
  unreliable in mail), sentence case, naming the river.
- The reminder leads with the river's state and the plain sentence, then the gauge as a
  five-cell table with today's cell marked and the small figure row, then the button.
- The full river as a static PNG (600 × 120, rendered by the image pipeline, hosted on the
  site) above the footer, replacing the mauli border. **[my call]**
- It still never mentions a streak, a count or a day missed.

### 6.9 The logo, the wordmark, and everywhere they go

The owner chose these on 17 October (`docs/design/v3-mockups/logo-final.html`).

**The mark: the horizon sun.** The idea stays (the sun over the water, the bindu over the
river); the drawing becomes the v3 river. A single ink ring (2.4 units on a 48 grid) on
paper; inside it, a sindoor sun whose lower part is cut off by an ink horizon line through
the circle's middle; below it, three teal water bands widening toward the viewer. **No
marigold path in the mark** (the owner: "distracting"). The double ring and the flat ink
rules of the old seal go.

- **Small cut** (16 and 32px, the tab): a thicker ring (3.6 units), a larger sun, two thick
  water bands instead of three.
- **Night:** ring and horizon in `--ink` night `#ece3cf`, paper `#12110e`, water `#5c9aa5`,
  sun `#e04a40`.

**The wordmark: one heavy weight, the bindu kept.** "Snanify" all in Eczar 800 at
`-0.015em`, matching the display capitals' weight but in mixed case so it stays a name. The
dot of the dotless `ı` (U+0131) is the sindoor bindu, an SVG circle, as today; the
load-bearing rules for its placement (`line-height: 1` on `.wordmark`, the 0.826em rise,
`aria-hidden` lettering with an `sr-only` name) carry over, re-measured for weight 800. The
two-weight "Snan" / "ify" split goes.

**The rollout** (every place the logo or its red appears, in the cutover release):

- `src/components/Logo.tsx`: `<Mark />`, `<Wordmark />`, `<Logo />`, `<Colophon />` redrawn.
  The `Colophon`'s 30-tick dial goes; it becomes the large mark with the wordmark under it.
- The header (on the strip, 5.6) and the footer.
- `public/icon.svg` (small cut), `public/favicon.ico` (16, 32, 48 from the small cut),
  `public/apple-touch-icon.png` (180px, full mark on an opaque paper square, because iOS
  composites transparency to black). Regenerate from `Logo.tsx` with `sharp` and PIL;
  `src/lib/seo.ts` keeps declaring all three. Add a 512px PNG and a web manifest entry for
  Android's home screen. **[my call]**
- The Patra (image and HTML), the specimen, `/p/[id]`.
- The link cards: `site-card.ts` leaves the matchbox for paper, the capitals headline and the
  full river with the sun; bump `SITE_CARD_VERSION` and `ROUTE_SHA256` as the og test
  requires. `patraCardSvg` takes the new mark.
- `opengraph-image` routes for every page.
- `email.ts`: the mark and wordmark as a hosted PNG in the header (mail clients will not
  load Eczar). **[my call]**
- Every template in `ads/src/` that draws the logo or the wordmark.
- The Facebook Page avatar and the Meta ad account's profile image are the owner's to swap,
  from a 1024px PNG the build exports. **[my call]**

### 6.10 The ads

Every template in `ads/src/` moves to the palette (3) and is re-rendered. The PLAIN set is
the current direction; the campaign and loud sets stay available for festivals. Their
captions and copy are unchanged by this work. **This work ends at the files in `ads/`.**
Swapping the creatives running in Meta is a separate step the owner approves on its own
(it resets delivery learning). **[my call]**

### 6.11 Mobile first

The owner, again: "very important: mobile-first". Over 90% of readers are on a phone, at 6
a.m., in bed. Every surface in this document is designed at **390 wide first**, and every mockup is
drawn at that size; desktop is the adaptation.

Why 390, by the numbers: what matters is the CSS viewport, not the screen's pixels (a
1170-pixel iPhone lays out at 390). In the US, StatCounter's August 2026 mobile and tablet
data puts 414 × 896 first (about 20%), 390 × 844 second (about 11%) and 393 × 852 next
(about 5%); testing guides put nearly all US phone traffic between 360 and 430 wide. The
UK, Canada and Australia lean further toward iPhone. So: **design at 390, nothing breaks
at 360, and it still looks right at 430.** Once v3 is live, the site's own analytics
replace these tables.

- **The fold is a contract, measured where the ads land.** Readers arrive from Meta ads
  inside the Instagram and Facebook in-app browsers, whose bars leave about 390 × 660 to
  700 of visible page. On the landing, everything in 6.1 items 1 to 5, the press included,
  sits above **660 at 390 wide**, in both locales (Hindi runs taller: check it), and above
  **640 at 360 wide**. If something must give, the band shortens first.
- **The press is thumb-sized**: at least 56px tall for the primary press, 44px for any other
  tap target, full column width on a phone.
- **The kit scales in `em`/`rem`** from the 390 layout; the seal, the band and the label
  never shrink below what reads at arm's length (seal 66px, band text 14px).
- **The river is cheap**: SVG polylines, transform-only animation, paused off screen and in
  background tabs, held to 60fps on a mid-range Android; the strip and the full river share
  one animation clock.
- **Nothing scrolls sideways at 390px.** The band's overhang is clipped by its section.
- **Desktop** centres the 390 composition in a wider column (the landing's hero at
  `max-w-md` beside the specimen phone from `lg` up); it never adds content the phone lacks.

## 7. Motion, copy, data

### 7.1 Motion

| Name | What | Where |
| --- | --- | --- |
| `sink` | The press: translate to the wall's depth in 70ms on `:active`, back in 120ms. Replaces `impress`. | Every press and choice |
| `pull` | Stepped entrance, unchanged | A part of the snan, the Patra |
| `settle` | 240ms state change, unchanged | Menus, the switch, folds |
| `flow` | The river: lines drift at their own pace, the path shimmers | The strip, the full river |
| `breathe` | The waves' vertical scale, 4s up, 6s down | The breath only |
| `stamp` | The seal lands: from scale 1.15 and -14° to its rest in 180ms, stepped | The morning badge at the mark |

All stop under `prefers-reduced-motion`. Transform and opacity only. `flicker` and the petal
motions are retired.

### 7.2 Voice

The owner, on the copy today: "super sacred, boring". v3's voice is **bold, active and
simple, with reverence kept**. The rules in `CLAUDE.md` still hold underneath it: the two
rules, no negative constructions, no em dashes, short sentences.

**1. Lead with the verb.** Every heading, button and line tells the reader what to do or
what just happened, in the second person, present tense. "Do your first snan today!" "Send
it to the family." "Snan done." Instructions and labels go; actions come in.

**2. Be bold about what is true.** The claims Snanify can make loudly are real, and they
are the product: the river is the real river, as it runs this morning; the timing comes from
the sky over that ghat; the sankalp is your own; the sheet carries your family's names. Say
these plainly and with pride, in capitals where a headline allows:

| Bold and true | Off limits, however bold |
| --- | --- |
| "The Ganga, as it runs this morning." | Anything a priest or a person does for them |
| "Your Ganga snan. From home." | A dip, a bath, a ritual performed at the ghat |
| "Your family's names, at the river." | Punya, blessings, sins, karma, the soul |
| "Three minutes. Every morning." | "As good as being there", "holy water" |
| "Fuller than usual for this time of year." | "Live" footage, "measured at the ghat" |
| "Eleven mornings for eleven." | Statistics about other users ("most people…") |

**3. Simple enough for a third language at 6 a.m.** Everyday words; one idea a sentence;
most sentences under 12 words; numbers as digits ("3 minutes"). Units and statistics move to
small print (7.3). Snan, sankalp, ghat, tithi and muhurat stay untranslated and are glossed
where they first appear on a page. Hindi uses everyday Hindi over Sanskritised words
("शुरू", not "आरंभ"; "भेजिए", not "प्रेषित कीजिए"), always in the respectful "आप", rivers in
the honorific plural.

**4. Reverence stays.** The river is a presence, never a feature: its name is always
capitalised and set in sindoor where the design allows; no jokes about the practice, no
slang, no emoji in the product; at most one exclamation mark per screen, on the selling
pages only. The prayer is printed as written.

**5. Three volumes, one voice.** The ads shout (6.10). The selling pages (landing, `/snan`,
`/begin`) speak up: bold, warm, one push. The snan, the Patra and the emails speak softly:
short, calm, still active. Inside the sitting there is no selling at all.

**Before and after** (current strings from the content modules; the rewrites are the
direction, finalised per surface in the build):

| Where | Today | v3 |
| --- | --- | --- |
| Landing h1 | A daily snan, wherever you live. | Your Ganga snan. From home. |
| Landing lede | Three minutes with the Ganga, the Yamuna or another sacred river, as it runs this morning. Breathe with it. Make your sankalp. Then send the family a sheet with their names on it. | Takes just 3 minutes. Then share it with your family. (band) · Breathe with the river as it runs this morning. Make your sankalp. Do your first snan today! |
| `/begin` | Choose your mornings. Pick how many. | Pick your mornings. Eleven for eleven. |
| `/begin` | Pay once, in your own currency. Sit them on any mornings you like. | Pay once. Use them any morning you like. |
| Ready | Begin when you are ready. Put the phone on silent. It takes three minutes. | Your Ganga, this morning. Three minutes. Phone on silent. |
| Stillness | Put the phone down. The river keeps running. | Be still with the river. (kept: The river keeps running.) |
| Mark | Your morning is kept. | Snan done. |
| After | Keep it in your heart. Send it to your family. · Open your Sankalp Patra | Your family will want to see this. · Send it to the family |
| `/snan` | Your Sankalp Patra, ready to send. Every snan ends in one sheet with your family's names on it. | Your family's names, at the river. Every morning, one sheet to send. |
| Hindi ready | जब तैयार हों, आरंभ कीजिए। | आपकी गंगा, आज सुबह। बस 3 मिनट। |

New strings live in the content modules as `Record<Lang, …>`; the English lines in 6.1 are
the owner's; every other v3 line in this document is **[my call]** for his review.

### 7.3 The river in plain words

The bands are cut against the same week of the year, 1997 to 2025 (`src/content/flow.ts`),
so every plain sentence says "for this time of year", never "of all days":

| Band | State (exists) | Plain sentence (new) |
| --- | --- | --- |
| slack | Running thin | Much lower than usual for this time of year. |
| low | Running low | Lower than usual for this time of year. |
| usual | Running as usual | About as usual for this time of year. |
| full | Running full | Fuller than usual for this time of year. |
| spate | In spate | Much fuller than usual for this time of year. |

Hindi drafts for the owner's pass: "इस समय के हिसाब से सामान्य से बहुत कम।", "…सामान्य से
कम।", "…लगभग सामान्य।", "…सामान्य से भरी।", "…सामान्य से बहुत भरी।" **[my call]**

The figure is modelled discharge at a grid cell; nothing on a v3 surface says the water was
measured at the ghat or passes the ghat. The exact figure stays on every product surface
that carries it today (in small type beside the gauge on the Patra and the Patra page), so
the `copy-guard` split holds.

## 8. Rules this changes

These lines in `CLAUDE.md` and `DESIGNSYSTEM.md` change with this work:

- `CLAUDE.md`, "As the buyer sees it": the landing no longer opens with "one live sentence".
- `CLAUDE.md`, "Never": add that the band, the label and pack counts never appear on the
  Patra; replace "Tracked capitals and labels above headings are retired" with "Tracked
  capitals are retired; the one display headline per screen is set in tight capitals."
- `DESIGNSYSTEM.md` is rewritten in full to this document: the two registers ("campaign
  print never appears in setup, the sitting, the Patra or the account") give way to one
  family at two volumes.
- `plan.md` gets the build as its next item.

## 9. How it ships

The owner's decision: **one branch, a Vercel preview, his review, then one cutover.**

- All v3 work lands on a branch (`design-v3`), never on `main` until the cutover. Production
  stays on today's design throughout, with the Meta ads pointing at it.
- Every push builds a Vercel preview. The owner reviews there, on his phone, surface by
  surface; the draft Hindi is reviewed in the same pass.
- If the Preview environment's variables point at the production database (as
  `.env.local` does), a sitting on the preview writes real rows and mints a real v3 Patra.
  Before the review, the preview gets its own database branch (Neon) or the owner sits
  only with a test account. **[my call: the builder raises this before the first preview sitting]**
- The cutover is one merge to `main` once the owner says go, followed by the ad re-renders
  (6.10, files only) and the `DESIGNSYSTEM.md` / `CLAUDE.md` rewrite in the same release.

## 10. What is left to the builder

- Exact pixel values beyond those given; the wave geometry's constants within the rules in
  5.6; how `RiverFlow` is refactored to place the sun on the horizon.
- The Hindi wording, as drafts for the owner (marked above).
- The order of the work. Suggested: tokens and the kit first (one commit), then the landing,
  the snan, the Patra (image and HTML together), `/begin` and setup, reference pages,
  account, email, link card and favicon, ads; `DESIGNSYSTEM.md` and `CLAUDE.md` last, each
  surface checked at 390 × 844 in both locales, day and night.
- The checklist at the end of today's `DESIGNSYSTEM.md` stays, with "one vermillion button"
  read as "one press", and "no tracked capitals" kept.
