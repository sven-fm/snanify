# Snanify brand kit

One page to build from. Ads, social posts, a deck, a designer outside the repo: start here.
The app's own sources stay the truth; everything below is either generated from them or
points at them.

**Snanify** is a digital snan. At an hour the panchang names, a person sits for three
minutes with a sacred river in India as it runs this morning, makes their own sankalp, and
sends the family a Sankalp Patra with their names on it. For Indians and the Hindu diaspora,
thirty and over, mostly on a phone at six in the morning. English and Hindi.

| In this folder | What |
| --- | --- |
| [`tokens.json`](tokens.json) | Every colour (day and night) and the type roles, generated from `src/lib/palette.ts` |
| [`logo/`](logo/) | The mark, the wordmark and the lockup, as SVG and PNG, light, dark and on marigold |
| [`examples/`](examples/) | Approved references: the landing at 390, a Patra, a link card, the four ad styles |

Regenerate the tokens and the logos after a palette, type or logo change, and commit what it
writes. `tests/unit/brand.test.ts` fails when `tokens.json` and `palette.ts` disagree.

```bash
npm run brand
```

---

## The two rules

Every line, in every medium, is written under these. They come from the owner.

1. **Never claim a physical rite happened.** No priest performs anything, no ceremony takes
   place at a ghat for anyone, nothing is recorded, witnessed or offered by a person.
2. **Never make a promise that is not true.** Nothing about karma, sins, blessings or the
   soul.

Beyond those, **sell the thing**: proud, plain, active. The full version is in
[`CLAUDE.md`](../CLAUDE.md).

## The voice

- **Lead with the verb.** Second person, present tense. "Do your first snan today!" "Send it
  to the family."
- **Build on a noun and a verb, never on "no".** "Nobody stands in the water for you"
  becomes "The practice is yours." The one exception removes a buyer's fear in two words:
  "No subscription."
- **Short.** One idea a sentence, most under 12 words, numbers as digits ("3 minutes"). Many
  readers meet English as a third language.
- **Reverence stays.** The river is a presence, its name capitalised and in sindoor. No
  jokes, no slang, no emoji in the product. One exclamation mark per screen at most.
- **Snan, sankalp, ghat, tithi, muhurat** stay untranslated. Hindi uses everyday words and
  the respectful "आप".
- **Names.** The practice is "the snan", the sheet is the "Sankalp Patra", a pack is its count
  ("One morning", "Eleven mornings", "Sixty mornings"). The brand is "Snanify" in Latin
  letters in both languages.

| Say it boldly | Never say it |
| --- | --- |
| "The Ganga, as it runs this morning." | Anything a priest or a person does for them |
| "Your Ganga snan. From home." | A dip, a bath, a ritual performed at the ghat |
| "Your family's names, at the river." | Punya, blessings, sins, karma, the soul |
| "Three minutes. Every morning." | "As good as being there", "holy water" |
| "Eleven mornings for eleven." | "Live" footage, "measured at the ghat", statistics about other users |

**What is true, and therefore safe to be loud about:** the river figure is real, public,
modelled discharge (Copernicus GloFAS through Open-Meteo, one value a day, never called
"measured"); the tithi and the muhurat come from the sky over that ghat; the sankalp is the
person's own; the six waters are real places.

**The price**, in the reader's currency. Eleven mornings cost eleven: that is the hook.

| | One morning | Eleven mornings | Sixty mornings |
| --- | --- | --- | --- |
| USD | $2 | **$11** | $48 |
| EUR | €2 | **€11** | €45 |
| GBP | £2 | **£11** | £42 |
| CAD | C$3 | **C$11** | C$48 |
| INR | ₹101 | **₹501** | ₹2,100 |

In rupees the line becomes "Eleven mornings for ₹501." The source is `src/content/prices.ts`.

## The palette

One palette, one job per colour. Flat colour only. Night values are for the night edition
of the site; ads use the day column.

| Name | Day | Night | Job |
| --- | --- | --- | --- |
| Paper | `#f2ead9` | `#12110e` | The ground of every page |
| Paper 2 | `#eae0c9` | `#1a1814` | Tint ground for tables |
| Paper 3 | `#ded1b4` | `#24211a` | Deeper tint, the masthead's fold |
| Ink | `#141210` | `#ece3cf` | Type, the press's border, the horizon |
| Ink 2 | `#57513f` | `#99917f` | Secondary type |
| **Sindoor** | `#c8251d` | `#e04a40` | **The one red.** The press, the river's name, the sun, the seal, the bindu |
| **Marigold** | `#f2c230` | `#f2c230` | **The one yellow.** Paying or sharing, light on the water, the band's words |
| Haldi | `#e3962b` | `#f0a83c` | Warm fills, rare. The calendar-art gold |
| **Teal** | `#1d5a6a` | `#5c9aa5` | **The river.** The waves, the gauge's deep end |
| Maroon | `#7a1a14` | `#a8352b` | Festival days and the calendar-art ads only |
| Rule | `#c3b697` | `#35302a` | Hairlines in data tables only |
| Wall | `#141210` | `#000000` | The side walls of the press |

- Type on marigold is ink `#141210`, day and night. Type on sindoor is white `#ffffff`.
- **Marigold never sets text on paper** (about 1.5:1). Ink sits on marigold.
- The gauge's five fills, thin to in spate, and the night river's colours are in
  [`tokens.json`](tokens.json).

## Type

Two families that set Latin and Devanagari natively, so both languages speak in one voice.

| Family | Weights | Job |
| --- | --- | --- |
| [Eczar](https://fonts.google.com/specimen/Eczar) | 400, 600, 700, 800 | Display: the headline, headings, the wordmark, the seal, the label |
| [Martel Sans](https://fonts.google.com/specimen/Martel+Sans) | 400, 600, 700 (800 for the band) | Text: body, buttons, labels, tabular data |
| [Noto Serif Devanagari](https://fonts.google.com/noto/specimen/Noto+Serif+Devanagari) | 400, 600 | Hindi on drawn images (the Patra, link cards), so conjuncts stack |

- **The headline**: Eczar 800, **tight capitals**, line height 0.95, tracking -0.01em, the
  river's name in sindoor. One per screen. Hindi has no case: Eczar 800 at line height 1.22.
- **Headings**: Eczar 700, sentence case. **Body**: Martel Sans 400, 15 to 16px.
  **Buttons and labels**: Martel Sans 700, sentence case.
- Tracked (letter-spaced) capitals are retired. No italics, and never a faked bold or
  italic: Eczar has no italic cut.
- Hindi numerals are Devanagari. Figures line up in tables.

## The logo

| File | Use |
| --- | --- |
| `logo/lockup-light` | The default: the mark beside the wordmark, on paper or any light ground |
| `logo/lockup-dark` | On the night paper or any dark ground |
| `logo/lockup-on-marigold` | On a marigold field: the PLAIN ads, the signboard |
| `logo/mark-*` | The horizon sun alone: avatars, small spaces, beside a headline |
| `logo/wordmark-*` | "Snanify" alone |

Each comes as SVG (outlined, no font needed) and PNG at twice size. The mark is an ink ring
on paper, a sindoor sun cut by an ink horizon, three teal water bands. The wordmark is
Eczar 800, its i dotless under a sindoor bindu. Recolour neither, redraw neither, add no
marigold to the mark. The Facebook Page avatar is `public/brand-1024.png`.

## The kit

Pieces from the ads, each with one meaning and a limit. On the site they appear at low
volume; in ads they may run large.

| Piece | What it is | When |
| --- | --- | --- |
| **The press** | The button: a sindoor block with a 2px ink border on a hard ink wall 6px deep, white Martel 700 and an arrow. It sinks flush when pressed | The one primary action. One per screen. The marigold version is only "Send it to the family" |
| **The seal** | A round sindoor stamp, marigold Eczar 800, a dashed marigold ring, turned a few degrees | The price ("11 for €11") and the morning badge ("7th morning"). Never under 66px |
| **The band** | A strip of ink with marigold words, turned -2°, running off both edges | The one thing to do. One per page, selling surfaces only |
| **The label** | The matchbox label: marigold, a 3px ink frame, a thin sindoor rule inside | The eleven-morning pack only |
| **The gauge** | How the river runs, without numbers: five teal-to-paper fills (1:2:4:2:1), a dashed line at "usual", a sindoor dot for today | Wherever a river figure appears, the exact figure small beside it |
| **The river** | Teal wave lines, an ink horizon, the sindoor sun sitting on it and cut by it, a marigold path of light on the water | The brand's living element: under the press, at the foot of every screen, on the Patra |

## Loud and calm

**One family, three volumes.** The person who taps a yellow ad lands on the same red, the
same yellow, the same river and the same press.

| The campaign layer (loud) | The site (calm) |
| --- | --- |
| Ads, social posts, covers | The landing, the snan, the Patra, the emails |
| Full-bleed marigold or sindoor, saturated | Paper ground, colour in its one job |
| Capitals large and stacked, filling the frame | One capitals headline per screen, then sentence case |
| Hard offsets (a press slipping), starburst seals, tilted labels, sashes | The press, the seal, the band and the label, each within its limit |
| PLAIN is the current direction; matchbox, signboard and calendar art for festivals | Selling pages speak up; the snan, the Patra and emails speak softly and sell nothing |

The bans and the two rules hold in both.

**For a Meta ad**, on top of everything above: no sentence tells the reader who they are
(religion, origin), nothing is engagement bait, the only urgency is a real date (Kartik
starts 27 October), and Advantage+ creative enhancements stay off so Meta's generated words
never run. The current campaign, its copy and its renderers are in
[`ads/README.md`](../ads/README.md).

## The bans

- **Gradients, glows, blurs, soft shadows.** Colour is flat. The press's wall is a hard ink
  block.
- **Rounded boxes.** Corners are square. Round things (the sun, the seal, the bindu) are
  drawn circles. The phone frame around a screenshot is the one rounded frame.
- **Em dashes.** A comma, a colon, a full stop or parentheses.
- **Tracked capitals, italics, labels above headings.**
- **Coined names** for the practice, the sheet or the packs.
- **Priests, officiants, rites performed for anyone, subscriptions, gifting, tiers.**
- **Selling on the Patra or inside the sitting**: no band, label, price or pack count there.
- **A second press on a screen.** A secondary action is an underlined link.
- **Fabricated statistics**, timings or river figures presented as fact.

## Examples

Copies of approved work, so a reference travels with the kit.

| File | What it shows |
| --- | --- |
| `examples/landing-en-390.png`, `landing-hi-390.png` | The landing above the fold at 390 wide: headline, band, seal, press |
| `examples/patra.png` | A Sankalp Patra: names, the river, the gauge, the times, the morning badge |
| `examples/link-card-en.png` | The link card a shared URL unfurls into |
| `examples/ad-plain-45.png` | PLAIN, the current ad direction: solid marigold, one idea, one red press |
| `examples/ad-matchbox-45.png` | Matchbox print: the price story |
| `examples/ad-signboard-45.png` | Signboard print: a scroll-stopper |
| `examples/ad-calendar-45.png` | Calendar art: Kartik and festival days |

The ads are the 4:5 feed cut; the 9:16 cuts and the Hindi and India editions are in
`ads/out/`.

## Deeper sources

| Source | What it holds |
| --- | --- |
| [`DESIGNSYSTEM.md`](../DESIGNSYSTEM.md) | The canonical design system: every surface, the motions, the logo's geometry |
| [`CLAUDE.md`](../CLAUDE.md) | The two rules, the voice, the locked decisions, the prices |
| [`ads/README.md`](../ads/README.md) | The Meta campaign: structure, copy in English and Hindi, how each set is rendered |
| [`ads/src/`](../ads/src/) | The ad templates and renderers; their words are in `copy.mjs` |
| [`docs/design/v3-mockups/`](../docs/design/v3-mockups/) | The approved v3 mockups and surface checks (the `.html` files animate) |
| [`docs/superpowers/specs/2026-10-17-design-system-v3-design.md`](../docs/superpowers/specs/2026-10-17-design-system-v3-design.md) | The approved v3 spec, with the owner's choices |
