# Design system

**One family, loud and calm.** The site is the ad, translated into a quieter register. A
person who taps a yellow ad lands on the same red, the same yellow, the same river and the
same press, and knows in the first second they are in the right place. The colours and the
pieces repeat from the ad through the landing, the snan, the Sankalp Patra in the family's
WhatsApp, and the next morning's email.

This is v3, built on the branch `design-v3` from the spec in
`docs/superpowers/specs/2026-10-17-design-system-v3-design.md` (17 October 2026). The
approved mockups are in `docs/design/v3-mockups/`; the `.html` files animate and their
buttons press. Where a mockup and this document disagree, this document wins. The tokens
and utilities live in `src/app/globals.css`; the hex values for renderers with no stylesheet
live in `src/lib/palette.ts`.

---

## What the design is for

Three things, in this order:

1. **Buy mornings.** The pack, the price and the press are the clearest things on a selling
   page.
2. **Sit the snan.** Three calm minutes, the same every morning; only the river changes.
3. **Send it home.** The Sankalp Patra is made to land well in a family WhatsApp group.

A screen earns each element by serving one of those. Decoration that means nothing comes
out: the petals were cut for exactly that.

**One family, three volumes.** The ads shout. The selling pages (the landing, `/snan`,
`/begin`) speak up: bold, warm, one push. The snan, the Patra, the account and the emails
speak softly: short, calm, still active. Every piece below says where it may appear, and the
limits are part of the design.

**It fails if** the site turns into the ad (full yellow fields, stripes, shouting), if the
snan or the Patra feels like a sale (a pack count, "7 of 11", a band on the sheet, a price
inside the sitting), or if a line claims something the data cannot back.

## The bans

**No gradients, glows, blurs or soft shadows.** Colour is flat. The press's walls are hard
ink, stacked one pixel at a time into a solid box; that is a printed block, not a soft
shadow.

**Boxes are square.** The base layer enforces it:

```css
*, *::before, *::after { border-radius: 0 !important; }
```

Round things are SVG: the bindu, the sun, the seal. The **phone** around the specimen and
the looped sitting is the one rounded frame, cut with `clip-path: inset(0 round …)`. It is one
component, `src/components/kit/Phone.tsx`, drawn like a current iPhone: corners 15% of the
width, a thin bezel inside a hairline ink-2 band, a small island in a status bar, and the
content (nine by sixteen) below the status bar, so the island covers nothing.

## Colour

One palette, one job per colour. The site, `src/lib/patra-image.ts`, `src/lib/site-card.ts`,
`src/lib/email.ts` and every template in `ads/src/` use these values and no others.
`tests/unit/palette.test.ts` fails when `globals.css` and `palette.ts` drift.

| Token | Day | Night | Job |
| --- | --- | --- | --- |
| `--paper` | `#f2ead9` | `#12110e` | The ground of every page |
| `--paper-2` | `#eae0c9` | `#1a1814` | Tint ground for reference data (tables) |
| `--paper-3` | `#ded1b4` | `#24211a` | Deeper tint, the masthead's fold |
| `--ink` | `#141210` | `#ece3cf` | Type, the press's border, the horizon |
| `--ink-2` | `#57513f` | `#99917f` | Secondary type |
| `--sindoor` | `#c8251d` | `#e04a40` | **The one red.** The press, the river's name, the sun, the seal, the bindu |
| `--marigold` | `#f2c230` | `#f2c230` | **The one yellow.** Where you pay or share, light on the water, the band's words |
| `--haldi` | `#e3962b` | `#f0a83c` | Warm fills that are neither light nor money. Rare |
| `--teal` | `#1d5a6a` | `#5c9aa5` | **The river.** The waves, the gauge's deep end |
| `--maroon` | `#7a1a14` | `#a8352b` | Festival days only, and the calendar-art ads |
| `--rule` | `#c3b697` | `#35302a` | Hairlines in data tables only |
| `--rule-strong` | `#141210` | `#ece3cf` | The form field's 2px rule |
| `--wall` | `#141210` | `#000000` | The side walls of the press |

Two named aliases keep type right on the faces that do not change at night:
`--on-marigold: #141210` (ink on marigold, both editions) and `--on-sindoor: #ffffff`.

Tailwind: `bg-paper` `bg-paper2` `bg-paper3` `text-ink` `text-ink2` `text-sindoor`
`bg-sindoor` `bg-marigold` `text-teal` `border-rule` `border-rulestrong`.

**The gauge** has five fills of its own, teal stepping out of paper (`GAUGE_FILLS`):

| | thin | low | usual | full | in spate |
| --- | --- | --- | --- | --- | --- |
| Day, `--gauge-1` to `--gauge-5` | `#f2ead9` | `#e8dcc0` | `#c9d7d2` | `#7fa3a6` | `#1d5a6a` |
| Night | `#1a1814` | `#2a2a22` | `#24393c` | `#3d6b72` | `#5c9aa5` |

**The night river** (the stillness): waves `#16404a`, an ember sun `#4a1410`, a dull gold
path `#5a4a1c` (`NIGHT_RIVER`). The stillness's ground is `#0b0a08` (`STILLNESS`), with its
dim inks in `STILLNESS_INK`. The owner's printed copy of the Patra comes out on `#faf6ea`
(`PRINT_PAPER`).

- **Marigold never sets running text on paper** (about 1.5:1). Ink sits on marigold.
- The night edition is the `.dark` class on `<html>`, set by the theme script and
  `ThemeToggle`. Same palette after dark. The press keeps its geometry; its walls go to
  `#000` and its border to the light ink, so the edge still reads.
- `--spot`, `--haldi-2` and `.warm` are retired.

## Type

Two families that carry **Devanagari and Latin natively**, so both editions speak in one
voice. No others.

- **Eczar** (Vaibhav Singh, Indian Type Foundry) for display.
- **Martel Sans** for text, buttons and tabular data.

| Role | Setting |
| --- | --- |
| The display headline (h1), one per screen | Eczar 800, **uppercase**, `line-height 0.95`, `letter-spacing -0.01em`, the river's name in sindoor. Hindi has no case: Eczar 800 at `line-height 1.22`, the river in sindoor |
| Section headings (h2, h3) | Sentence case, Eczar 700 (`H2`, `H3` in `src/components/site/Reference.tsx`) |
| Body | Martel Sans 400, 15px on the landing, 16px for long reading |
| Buttons | Martel Sans 700, sentence case |
| Small labels | Martel Sans 700, sentence case, never letter-spaced (`.label`) |
| The Patra's header | "Sankalp Patra" in Eczar 700, sindoor, sentence case |

**Tracked capitals stay retired.** The one display headline a screen has is set in **tight**
capitals; nothing else is capitalised and nothing is ever tracked. `Capitals` in
`src/components/site/Reference.tsx` is the headline component; the landing, `/snan`,
`/begin`, setup and the sitting set the same cut inline.

### Script rules, all load-bearing

- The type layer keys off `data-script`, never `lang`: Indic scripts need their own leading,
  and Hindi and Marathi share one script. `html:not([data-script="latin"]) .display` takes
  `line-height: 1.3`. The capitals headline sets its Hindi leading inline, because that
  rule sits outside the utility layer.
- `font-synthesis: none` on `.display` and `.wordmark`: Eczar ships no italic and nothing
  above 800, and a faked cut is the tell.
- No italic in Devanagari: `em`, `i` and `.italic` go upright at 600.
- Numerals are Devanagari in the Hindi edition. Tabular figures wherever numbers line up.

## The kit

Pieces lifted from the ads, each with one meaning and a limit on how often it appears. The
press lives with the buttons in `src/components/ui`; the rest is `src/components/kit`.

### The press

Every primary button and every tappable block is the top of a solid box: a 2px ink border,
then six `box-shadow` steps from `1px 1px` to `6px 6px` in `--wall`, so the corners connect.
On `:active` it moves `translate(6px, 6px)` and the walls collapse in 70ms: the button sinks
flush into the page, and rises back in 120ms. A phone has no hover, so this is the feedback a
thumb gets. `-webkit-tap-highlight-color` is transparent.

| Class | Face | Where |
| --- | --- | --- |
| `.press` | Sindoor, white Martel 700, an arrow at the right | The primary action. At least 56px tall |
| `.press.press-share` | Marigold, ink type | "Send it to the family", on the mark and the Patra page. The only marigold button in the product |
| `.press-choice` | Paper on 3px walls; the chosen one stays sunk with a sindoor face | Setup's choices: the water, a prayer, an example sankalp |
| The sankalp hold | Paper; sindoor fills it left to right over 11s while held | The sitting's sankalp |

**One press per screen.** A secondary action is a plain ink-underlined link (`quiet`), never
a second block. Setup's choices are the one exception. Small controls that are not presses
(menu rows, the theme toggle, the language switch, footer links) still carry an `active:`
state, usually ink to paper or ink to sindoor.

### The seal

A round sindoor stamp, marigold Eczar 800 lettering, a dashed marigold ring inset 6px,
turned between -8° and +10°, drawn as SVG. Never smaller than 66px. Two uses only:

- **The price seal**, "11 for €11" in the reader's currency through `<Price>`, on the landing
  and `/begin`.
- **The morning badge**, "7th morning" / "सातवीं सुबह" (`morningWords`), on the Patra, the
  Patra page and the mark. Shown from the second morning on; the count is the person's
  mornings kept across all waters.

### The band

A strip of the day ink with marigold Martel 800 words, turned -2°, running off both edges of
the column. Its section clips it (`overflow-x: clip`), so the page never scrolls sideways.
It says the one thing to do. **At most one per page**, only on the landing, `/snan`, `/begin`
and the snan's ready screen. **Never on the Patra or inside the sitting.** The band text
never drops below 14px. At night it keeps the day ink, with a light ink edge.

### The label

The matchbox label: marigold ground, a 3px ink frame, a 1.5px sindoor rule inset, the words
centred. **Only for the eleven-morning pack**, on the landing and `/begin`. Nowhere else.

### The gauge

How the river is running, without numbers. A strip in the five gauge fills, widths
1 : 2 : 4 : 2 : 1 (the bands' cut points at the 10th, 30th, 70th and 90th percentile). A
dashed ink line at the middle marks "usual"; a sindoor dot ringed in ink marks today, at the
morning's percentile. Under it, "Thin", "Usual", "In spate". Above it, the state word and one
plain sentence. A quiet feed draws no dot and claims nothing about today. Used everywhere a
river figure appears: the landing reading, the snan's reading, the Patra, its page, `/live`,
`/rivers/[river]`, the reminder email. The model is `gaugeModel` in `src/lib/gauge.ts`; the
words are `flowContent` in `src/content/flow.ts`.

### The river

The brand's living element, in three sizes. The geometry is `src/lib/river-geometry.ts`
(`waveRows`, `sunPath`, `horizonSun`), drawn in a 390-wide box and stretched to the column.

- **The strip** (`RiverStrip`): teal waves only, 74px, behind the masthead's logo on every
  page, fading downward into paper by a stepped opacity per line (not a gradient).
- **The full river** (`RiverHorizon`): a thin ink horizon; the sindoor **sun sits on it, cut
  by it**, about a third hidden; teal waves bunch toward the horizon and open toward the
  viewer (rows spaced by `t^1.7`), each line drifting at its own pace; the **sun's path in
  marigold** runs from under the sun toward the bottom centre, widening and broken into
  dashes that shimmer. Below the press on the landing, below the reading on `/live`, above
  the footer on every page, and at the foot of every part of the snan.
- **The night river** (`<RiverHorizon night />`): the same drawing in the night river's
  colours, for the stillness.

Motion is CSS on one clock (`flow`, `breathe`), so the river needs no client script beyond
`InView` (`src/components/live/InView.tsx`, with `live`), which pauses it off screen. It
stops under `prefers-reduced-motion`. SVG polylines, transform-only animation, held to 60fps
on a mid-range Android.

The Patra's closing river is not `<RiverHorizon />`: it is `engrave()` from that day's seed
and percentile, restyled to v3, because the sheet promises an engraving seeded by that day's
flow.

### The bindu and the retired marks

The **bindu** (`Bindu` in `src/components/marks`) is the one mark kept: the logo's sun, the
dot of the wordmark's `ı`, the selected radio, the current step (`Steps`), the live status
dot (`StatusBadge`, sindoor only when `live` is true). `Tilak`, `Kumkum`, `Mauli`, `Diya` and
its `flicker`, and `Petals` are retired: the capitals headline does the tilak's job; space
and the river do the dividers' job. `tests/unit/palette.test.ts` keeps the names out of
`src`.

**Space is the default divider.** Rules remain only where columns must line up (the muhurat
timings, the panchang, a city's calendar: `border-b border-rule` on `--paper-2`), and under a
form field (2px). Nowhere else.

## The logo and the wordmark

Chosen by the owner on 17 October (`docs/design/v3-mockups/logo-final.html`).

**The mark, the horizon sun.** A single ink ring (2.4 units on a 48 grid) on paper; inside,
a sindoor sun cut by an ink horizon through the circle's middle; below it, three teal water
bands widening toward the viewer. No marigold path in the mark. The **small cut** (16 and
32px) has a thicker ring (3.6 units), a larger sun and two thick bands. Every colour is a
token, so the night edition recolours it by itself. Geometry in `src/lib/logo-svg.ts`,
shared with the icon files.

**The wordmark.** "Snanify" in one weight, Eczar 800 at `-0.015em`, mixed case so it stays a
name. The dot of the dotless `ı` (U+0131) is a sindoor SVG circle. Three things are
load-bearing:

| | |
| --- | --- |
| `line-height: 1` on `.wordmark` | The bindu sits 0.789em up from the box bottom: its foot 0.543em above the baseline, measured off Eczar 800, plus the baseline's 0.2455em. The second term holds only while the line box is one em |
| An SVG `<circle>` | The base layer zeroes radius; a rounded span prints as a square |
| U+0131 under it | So the lettering is `aria-hidden` and `select-none`, with the real name in an `sr-only` span |

The brand stays Latin, "Snanify", in both editions; `.wordmark` names Eczar itself.

`src/components/Logo.tsx`: `<Mark />` (and `<Mark small />`), `<Wordmark />`, `<Logo />` (the
masthead lockup, a 30px mark beside a 24px word).

**Where they go.** The header, on the strip; the footer; the Patra (image and HTML), the
specimen and `/p/[id]`; the link cards; every `opengraph-image`; the email header as a
hosted PNG (`public/email/logo-480.png`); every ad template that draws the logo. The icon
files come from `npm run icons` (`scripts/icons.mjs`):

| File | Art |
| --- | --- |
| `public/icon.svg` | The small cut, day and night colours |
| `public/favicon.ico` | The small cut at 16, 32 and 48. It must exist as a file: Google asks for that path |
| `public/apple-touch-icon.png` | 180px, the full mark on an opaque paper square (iOS composites transparency to black) |
| `public/icon-192.png`, `public/icon-512.png` | The manifest's icons, opaque, inside the maskable safe circle |
| `public/brand-1024.png` | For the Facebook Page avatar and the ad account's profile image; the owner swaps those |

`src/lib/seo.ts` declares them.

## The surfaces

Every surface is drawn at 390 wide first. Each lists what it carries; anything else from the
kit stays off it.

### The landing (`/`)

`src/components/Landing.tsx`. Above the fold, in this order:

1. The masthead: the logo over the strip.
2. The capitals headline, "Your {River} snan. From home.", the river in sindoor. The hero
   water is the Ganga at Haridwar.
3. The band: "Takes just 3 minutes. Then share it with your family."
4. The price seal, and beside it: "Breathe with the river as it runs this morning. Make
   your sankalp. **Do your first snan today!**"
5. The press: "Start your snan now →".

Below the fold: the full river with the sun; the reading as a gauge with the small figure
row under it; the specimen sheet in the phone; the six waters as a list; the packs, eleven
on the label, one and sixty as plain rows; the footer. The page opens on the headline: no
live sentence above it, no long lede, no second button. From `lg` up the landing stays one
centred column, scaled up, never two: larger capitals, the band the full width of the window,
the seal and the pitch, the press; then the river as a full-width panorama, the reading, and
the specimen phone centred in its own section.

### `/snan`

`src/components/pages/SnanIntro.tsx`. The landing's sibling: the capitals headline "Three
minutes with your {River}.", the band, one press, the five parts as a list with their
durations, and the sitting looped in a phone (`SittingLoop`).

### `/begin`, sign-in and setup

- **`/begin`** (`src/components/pages/BeginView.tsx`): the three-step line with the bindu on
  the current step; the specimen with the buyer's own names in the phone; the band once; the
  eleven pack on the label, raised, with the price seal; one and sixty as plain rows; one
  press to pay. The masthead's Begin is hidden (`hideCta`).
- **Sign-in** (Clerk, `src/components/ClerkThemed.tsx` and `src/lib/clerk-look.ts`): the
  palette, and the press for its buttons.
- **Setup** (`src/components/setup/SetupForm.tsx`): one column, `max-w-md`; fields on a 2px
  rule that turns sindoor on focus (`.field`); choices are `.press-choice` blocks; the step
  line as above. No band, no seal.

Forms: a radio or a checkbox is a ruled square that fills with sindoor, never the
platform's blue circle. Focus is a 2px sindoor outline at a 2px offset everywhere
(`:focus-visible`).

### The snan (`/today`)

`src/components/snan/Sitting.tsx`, on the durations in `src/lib/sitting-plan.ts` and nowhere
else. Calm, and the same family. The practice takes the whole screen; the full river sits at
the foot of every part except the stillness, which gets the night river.

| Part | Screen |
| --- | --- |
| Ready | Capitals "Your {River}, this morning.", the ghat and the distance in ink-2, the band "Take three minutes. Put your phone on silent.", the river, the press "Begin →". The page footer leaves its river out here, so the ready screen has one river |
| The reading, 15s | The river's name in sindoor capitals, the ghat, the state word, the plain sentence, the gauge with its dot pulsing (`pulse`), so the eye knows where to look, and one small ink-2 row with the exact figure and rank ("797 m³/s · 86th percentile since 1997") |
| The breath, 45s | The river takes half the screen; its waves' vertical scale rises over 4s and falls over 6s, at the river's own amplitude (a thin river barely stirs, one in spate swells). "Breathe in" / "Breathe out" in capitals, Out in teal, with the seconds of that half under it, 4..1 and 6..1, each number fading away across its second (`count`) |
| The sankalp, 11s | The household's names small in ink-2, the person's own words in Eczar 700, the hold filling with sindoor |
| The stillness, 60s | Near black `#0b0a08`, "Be still with the river.", the seconds in dim ink, each cross-fading into the next (`count`), the night river, Next |
| The mark, 20s | "Snan done." in capitals, one line writing itself, the morning badge stamping in from the second morning, the marigold press "Send it to the family →" |

The story bar and the leave cross stay. From Begin on, the sitting sells nothing: no band, no
price, no pack count. The share press goes to `/p/[id]?new=1`, where the share sheet and the
image live; the mark still mints the Patra when it starts and moves on by itself after its
twenty seconds.

### The Sankalp Patra

Two renderings of one design, from the owner's final cut in
`docs/design/v3-mockups/patra-names-v3.html`:

- `src/lib/patra-image.ts`, the image: plain SVG with every letter turned to outlines by
  HarfBuzz, rasterised by resvg and sharp. `mementoSvg` is the **1080 × 1920 memento**, the
  owner's exact layout: the one `/p/[id]/image`, `patra-store.ts`, the blob and `/specimen`
  serve and people share. `patraSvg` and `renderPatraSheet` make the 1080 × 1350 sheet for
  the ad renderer, in the same order with a shorter river. `patraCardSvg` is the 1200 × 630
  link card.
- `src/components/SankalpPatra.tsx`, HTML, for `/p/[id]`, the specimen and print: the same
  layout as the memento, plus the person's own sankalp in Eczar 700 under the names on the
  owner's copy. Print CSS swaps to `#faf6ea`.

From top to foot:

1. "Sankalp Patra" in sindoor, the date and tithi in ink-2 at the right.
2. The ghat engraving, full width.
3. **The person's own photograph**, if uploaded, pinned on the right of the ghat picture,
   vertically centred, tilted about 3°, on a paper mount with a hard 3px ink offset.
4. **The morning badge**, small, at the print's top-right corner and set outward so it clears
   faces (at the picture's corner without a portrait). **From the second morning on**; the
   first sheet has none.
5. The names, one per line, in capitals: 21 units for one or two names, 17 for three, 14 for
   four or five. A long name wraps under itself; two names never share a line.
6. "at the {River}, {ghat}, {city}", the river in sindoor.
7. The prayer in Devanagari.
8. The state word, the plain sentence and the gauge, with the exact figure and rank small at
   the right.
9. **The river at the foot**: the flow-seeded engraving, the sun cut by the horizon and its
   marigold path.
10. The footer: the time in the person's zone and in IST, the distance, `snanify.com`.

**Never on the Patra:** the band, the label, a frame, a pack count, "7 of 11". The shared
image never carries the sankalp. The link card carries **no portrait and no badge**, so a
group chat's unfurl never shows a face.

The image renderer has no stylesheet, so it reads the day hex values from
`src/lib/palette.ts`. **Already-sent Patras stay as they were sent:** each row stores a
renderer version (`IMAGE_VERSION` in `src/lib/patra-version.ts`, 3 for v3), and
`src/lib/patra-image-v2.ts` regenerates a v2 sheet whose PNG is missing.

**`/p/[id]`** (`src/components/patra/`): the sheet; under it the marigold share press
(`ShareButton`); the download as a plain link. For a guest (`PatraGuest`), one sindoor press
to start their own snan.

### Reference pages

`/live`, `/rivers`, `/rivers/[river]`, `/panchang`, `/panchang/[city]`,
`/panchang/shraddha`, `/muhurat`, `/muhurat/[occasion]`, `/kumbh`, `/faq`, `/about`,
`/privacy`, `/terms`, the 404. Built from `src/components/site/Reference.tsx`:

- `RefHead`: the capitals headline with the river or the occasion in sindoor, and one plain
  sentence under it. The strip sits in the masthead, the full river above the footer.
- `/live` and `/rivers/[river]`: each river as its name, state word, plain sentence and
  gauge, with the exact figure and rank in a small row under the gauge and the source line.
- Tables keep hairline rules on `--paper-2` (`TABLE_GROUND`) where columns line up.
- `RefClose`: one press per page, at the end, inviting the snan. No band, no seal, no label.
- Long reading (`/faq`, `/about`, legal) at `max-w-[38rem]`, `leading-[1.75]`.
- `Festival`: on `/kumbh`, and on an occasion page inside its window (`FestivalNow` decides
  by the IST day), the maroon panel with a haldi double rule may name the occasion once. It
  is the calendar art's one home outside the ads.

### `/account`

Your mornings as a register: one row per morning (the date, the water, the badge's ordinal
in small sindoor), newest first; the mornings left in plain words; the reminder settings;
the marigold press to send today's sheet when one exists.

### Email

`src/lib/email.ts`, set in Georgia (mail clients will not load Eczar), on a `#faf6ea` column:

- The mark and wordmark as a hosted PNG in the header (`public/email/logo-480.png`).
- The headline in bold capitals, the river in sindoor.
- The press as a sindoor cell with a 4px `#141210` right and bottom border (box-shadow is
  unreliable in mail), sentence case, naming the river.
- The reminder leads with the river's state and the plain sentence, then the gauge as a
  five-cell table with today's cell marked and the small figure row, then the button.
- The full river as a static PNG (`public/email/river-600x120.png`) above the footer.
  `npm run email-art` renders both images.
- The mail speaks of this morning only: never a streak, a count or a day missed.

### Link cards

`src/lib/site-card.ts` (what a chat app shows for snanify.com) is paper, the capitals
headline and the full river with the sun. When it changes, bump `SITE_CARD_VERSION` in
`src/lib/seo.ts` and `ROUTE_SHA256` in `tests/unit/og-image.test.ts`. `patraCardSvg`
carries the names, the river's state and the gauge, and the river with the sun; no
portrait, no badge.

### Ads

Every template in `ads/src/` (`plain.html`, `loud.html`, `campaign.html`, `post.html`,
`cover.html`, with their words in `copy.mjs`) uses the palette above and the v3 mark and
wordmark. PLAIN is the current direction; the matchbox, signboard and calendar-art sets stay
for festivals. The signboard and plain yellow is marigold `#f2c230`, the red is sindoor
`#c8251d`, the matchbox black is `#141210`, the calendar gold is haldi `#e3962b` on maroon
`#7a1a14`, and the calendar water is teal `#1d5a6a`. See `ads/README.md`.

## The campaign layer

The ads shout in the same family: the same palette, the same Eczar and Martel Sans, the same
mark. In ad print, capitals may run large and stacked, and colour may run full-bleed and
saturated; the bans on gradients, glows, blurs and soft shadows still hold, and the owner's
two rules hold everywhere. The site borrows the ads' pieces at low volume (the press, the
seal, the band, the label, the capitals headline) and keeps its own calm volume. Swapping
the creatives running in Meta is a separate step the owner approves, because it resets
delivery learning.

## Motion

Eight motions, named, and nothing else. Transform and opacity only. All stop under
`prefers-reduced-motion`. `pulse` and `count` came from the owner's notes of 18 October 2026.

| Name | What | Where |
| --- | --- | --- |
| `sink` | The press translates to its walls' depth in 70ms on `:active` and the walls collapse; it rises back in 120ms (`--sink-down`, `--sink-up`) | Every press and choice |
| `pull` | A stepped entrance, `steps(6, end)`, as a sheet is pulled from the press (`ink-in` is the older name) | A part of the snan, the Patra |
| `settle` | 240ms on `cubic-bezier(0.2, 0.8, 0.3, 1)` for a state change; `settle-panel` opens a `<details>` | Menus, the language switch, folds, the theme |
| `flow` | Each wave line drifts sideways by one period at its own pace (`.flow-line`); the sun's path shimmers (`.flow-glint`) | The strip, the full river |
| `breathe` | The waves' vertical scale, 4s up and 6s down, at the river's own amplitude (`.breathe-waves`), scrubbed by the sitting's clock | The breath only |
| `stamp` | The seal lands from scale 1.15 and -14° to its rest in 180ms, stepped (`.stamp`) | The morning badge at the mark |
| `pulse` | A sindoor ring swells from the gauge's dot and fades, once every 1.6s (`.pulse-ring`); the dot itself stays put | The reading's gauge only |
| `count` | A countdown numeral's opacity, scrubbed by the sitting's clock (`src/lib/countdown.ts`): a breath number fades away across its second, a stillness number cross-fades into the next. No timer of its own. Under reduced motion the plain numbers stand at full ink | The breath, the stillness |

`flicker`, the petal drift, the old `impress` plate and the old flowing bands are retired.
Only numerals, bars and pictures reveal on scroll (`.reveal`, `.grow`, `.ink-picture-lazy`
under an `InView`); text is on the page from the first frame. Controls that wait for the
hero's press to scroll off carry `data-until-scrolled`, and `PastHero` stamps
`data-past-hero` on `<html>`; without scripts everything shows. Once the page has scrolled
(`html[data-scrolled]`) the masthead lifts off as a sheet with a `--paper-3` fold.

## Voice

The rules in `CLAUDE.md` hold underneath everything: the two rules, no negative
constructions, no em dashes, short sentences, no coined names. v3's voice is **bold, active
and simple, with reverence kept**.

1. **Lead with the verb.** Every heading, button and line tells the reader what to do or
   what just happened, in the second person, present tense. "Do your first snan today!"
   "Send it to the family." "Snan done."
2. **Be bold about what is true.** The river is the real river, as it runs this morning; the
   timing comes from the sky over that ghat; the sankalp is the person's own; the sheet
   carries the family's names. Say these plainly and with pride.
3. **Simple enough for a third language at 6 a.m.** Everyday words; one idea a sentence;
   most sentences under 12 words; numbers as digits ("3 minutes"). Units and statistics move
   to small print. Snan, sankalp, ghat, tithi and muhurat stay untranslated and are glossed
   where they first appear. Hindi uses everyday words ("शुरू" over "आरंभ", "भेजिए" over
   "प्रेषित कीजिए"), always the respectful "आप", rivers in the honorific plural.
4. **Reverence stays.** The river is a presence, never a feature: its name capitalised and in
   sindoor where the design allows. No jokes, no slang, no emoji in the product. At most one
   exclamation mark per screen, on the selling pages only. The prayer is printed as written.
5. **Three volumes, one voice.** The ads shout; the selling pages speak up; the snan, the
   Patra and the emails speak softly. The sitting sells nothing.

| Bold and true | Off limits, however bold |
| --- | --- |
| "The Ganga, as it runs this morning." | Anything a priest or a person does for them |
| "Your Ganga snan. From home." | A dip, a bath, a ritual performed at the ghat |
| "Your family's names, at the river." | Punya, blessings, sins, karma, the soul |
| "Three minutes. Every morning." | "As good as being there", "holy water" |
| "Fuller than usual for this time of year." | "Live" footage, "measured at the ghat" |
| "Eleven mornings for eleven." | Statistics about other users ("most people…") |

`OFF_LIMITS` in `tests/unit/copy-guard.test.ts` fails the build on the worst of the right
column. "Punya kaal" is the panchang's name for a time window, a timing and a claim of
nothing, and it stays. In rupees eleven mornings cost ₹501, so the "eleven for eleven" line
becomes "Eleven mornings for ₹501." through `CurrencyLine`.

### The river in plain words

The bands are cut against the same week of the year, 1997 to 2025 (`src/content/flow.ts`),
so every plain sentence says "for this time of year", never "of all days".

| Band | State | Plain sentence |
| --- | --- | --- |
| slack | Running thin | Much lower than usual for this time of year. |
| low | Running low | Lower than usual for this time of year. |
| usual | Running as usual | About as usual for this time of year. |
| full | Running full | Fuller than usual for this time of year. |
| spate | In spate | Much fuller than usual for this time of year. |

The figure is modelled discharge at a grid cell, and every surface says only that. A v3
surface never says the water was measured at the ghat or passes the ghat. The exact figure
and rank stay, in small type beside the gauge, on every product surface that carries them,
so the `copy-guard` split holds.

## Mobile first

Over 90% of readers are on a phone, at 6 a.m., in bed. Every surface is designed at **390
wide first**; desktop is the adaptation.

Why 390: what matters is the CSS viewport, not the screen's pixels (a 1170-pixel iPhone lays
out at 390). In the US, StatCounter's August 2026 mobile and tablet data
([gs.statcounter.com](https://gs.statcounter.com/screen-resolution-stats/mobile-tablet/united-states-of-america),
August 2026) puts 414 × 896 first (about 20%), 390 × 844 second (about 11%) and 393 × 852
next (about 5%); nearly all US phone
traffic sits between 360 and 430 wide. The UK, Canada and Australia lean further toward
iPhone. So: **design at 390, nothing breaks at 360, and it still looks right at 430.** Once
v3 is live, the site's own analytics replace these numbers.

- **The fold is a contract, measured where the ads land.** The Instagram and Facebook in-app
  browsers leave about 390 × 660 to 700 of visible page. On the landing, the masthead, the
  headline, the band, the seal with its lines, and the press all sit above **660 at 390
  wide**, in both locales (Hindi runs taller), and above **640 at 360 wide**. If something
  must give, the band shortens first. `tests/e2e/fold.spec.ts` holds it.
- **The press is thumb-sized**: at least 56px for the primary press, 44px for any other tap
  target, full column width on a phone.
- **The kit scales in `em` and `rem`** from the 390 layout. The seal holds at 66px or more,
  the band text at 14px or more.
- **The river is cheap**: SVG polylines, transform-only, paused off screen and in background
  tabs; the strip and the full river share one animation clock.
- **The page holds its width at 360, 390 and 430**, with nothing scrolling sideways. The
  band's overhang is clipped by its section; tables become stacked ruled rows.
  `tests/e2e/smoke.spec.ts` checks every width.
- **Desktop** centres the 390 composition in a wider column and carries only what the phone
  carries.

## Layout

**Lists, blocks and space, never card grids.** The river list is the model: the river's name
in Eczar, the ghat in ink-2, space between, nothing boxed.

| Thing | Value |
| --- | --- |
| Page container | `max-w-6xl px-5` (`Section`) |
| Section spacing | `py-16`, `sm:py-24` |
| The landing, `/snan`, the sitting, setup, `/begin` | `max-w-md`, centred |
| Long reading (`/faq`, `/about`, legal) | `max-w-[38rem]`, `leading-[1.75]` |

Blocks: `.tint` (`--paper-2`, reference data); `.plate` (photographs: the tint by day, the
day's paper by night, so a masked ink picture stays a positive); `.grain` (the fixed paper
grain, multiply by day, screen by night).

## Components

**`@/components/ui`** (`src/components/ui/index.tsx`): `Section`, `CTA`, `SubmitButton`,
`LinkButton`, `buttonClass` with the variants `solid` (the press), `share` (the marigold
press) and `quiet` (the ink-underlined link), `MASTHEAD_PRESS` (the masthead's Begin at
44px), `StatusBadge`, `Price`, `TaxNote`, `CurrencyLine`, `PriceText`. Inside a form, submit
with `SubmitButton`; `CTA` is a skin for a link.

**`@/components/kit`** (`src/components/kit/`): `Seal` and `morningWords`, `Band`, `Label`,
`Gauge`, `RiverHorizon`, `RiverStrip`.

**`@/components/marks`**: `Bindu`.

**`@/components/Logo`**: `Mark`, `Wordmark`, `Logo`.

**`src/components/site/`**: `Header` (on the strip; defaults to `primaryNav(lang)` and
`ctaHref(lang)`, `hideCta` where the page has its own press), `Footer` (the full river above
it), `Steps`, `LangSwitch`, `HeaderCta`, `FestivalNow`, `PastHero`, and `Reference.tsx`
(`Capitals`, `RefHead`, `RefClose`, `Festival`, `H2`, `H3`, `QUIET`, `TABLE_GROUND`).

**Prices are stamped by a sync `<head>` script.** Render one with `<Price>` (or `PriceText`,
`CurrencyLine`), never by reading the currency in a component.

## Known traps, carried over

- **Round computed SVG coordinates** (`.toFixed(2)`); raw floats hydrate differently.
- **`font-synthesis: none`** on `.display` and `.wordmark`; Eczar ships no italic.
- **Indic scripts need their own leading**; key off `data-script`, never `lang`.
- **The wordmark's bindu holds only at `line-height: 1`**; re-measure if the weight, the
  tracking or the face changes.
- **The base layer zeroes radius**; anything round is SVG.
- **The image renderers have no stylesheet**; they import hex from `src/lib/palette.ts`.
  Change a colour in both places in one commit.
- **The band overhangs its column**; its section must clip (`overflow-x: clip`).
- **Marigold stays the same at night**; ink on it is `--on-marigold`, never `--ink`.
- **`/favicon.ico` must exist as a file**, and the touch icon must be opaque.

## Checklist before shipping a page

- [ ] `npx tsc --noEmit` clean, `npm run lint` zero errors, `npm test` green
- [ ] Renders in English and Hindi, by day and by night
- [ ] One press on the screen, and it names an action; every other action a quiet link
- [ ] One display headline, in tight capitals in Latin; no tracked capitals anywhere; no
      label above a heading
- [ ] The band, the seal and the label only where this document allows them, and never on
      the Patra or inside the sitting
- [ ] Every river figure shown as a gauge, with the exact figure and rank in small type
- [ ] Rules only where columns must line up
- [ ] The landing's press above 660 at 390 wide and 640 at 360, in both locales
- [ ] The page holds its width at 360, 390 and 430; tap targets 44px, the press 56px
- [ ] No gradient, glow, blur, soft shadow or rounded box
- [ ] Copy leads with the verb; no negative constructions, no em dashes, nothing off limits
- [ ] Headings in order, `aria-label` on icon-only controls, visible focus
- [ ] Added to `src/app/sitemap.ts`, and to `src/lib/nav.ts` if it belongs in the nav
