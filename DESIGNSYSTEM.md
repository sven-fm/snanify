# Design system

**A morning at the ghat, set in type.** Paper, ink, vermillion and haldi. Warm, quiet and
alive, the way a riverbank is at six. Every screen moves the reader one step: begin, sit,
send home.

The site has two registers, and they never mix:

- **The everyday site**, everything at snanify.com. Morning light, moving water, ritual marks.
  Calm enough for a phone in bed at 5:40.
- **The campaign layer**: ads, the share card, festival posts. Bazaar print, bold and loud,
  built to stop a thumb in a feed. See [Campaigns](#campaigns).

The tokens and utilities live in `src/app/globals.css`. `src/components/Landing.tsx` is the
reference page. When in doubt, do what it does.

This document was rewritten on 15 October 2026 for the haldi, the marks and the campaign
layer. The code catches up in the phases queued in `plan.md`; until a phase lands, its pages
still carry the old rules and labels, and new work follows this document.

---

## What the design is for

Three things, in this order:

1. **Buy mornings.** The pack, the price and the button are the clearest things on the page.
2. **Sit the snan.** Coming back tomorrow should feel like a small, warm habit.
3. **Send it home.** The Sankalp Patra is made to land well in a family WhatsApp group.

A screen earns each element by serving one of those. Decoration that serves none of them
comes out.

## The bans

**No gradients, glows, blurs or soft shadows.** Colour is flat, and depth comes from ink,
tint and paper.

**Boxes are square.** The base layer enforces it:

```css
*, *::before, *::after { border-radius: 0 !important; }
```

Round shapes are drawn as SVG and are always *marks*, never boxes: the bindu, the sun, the
kumkum dots, the price seal. The **phone** around the specimen and the looped sitting is the
one rounded frame, cut with `clip-path: inset(0 round …)` because the base layer zeroes
radius.

## Colour

| Token | Day | Night | Use |
| --- | --- | --- | --- |
| `--paper` | `#f2ead9` | `#12110e` | Page ground |
| `--paper-2` | `#eae0c9` | `#1a1814` | Cool tint block |
| `--paper-3` | `#ded1b4` | `#24211a` | Deeper tint, pressed state |
| `--ink` | `#16130f` | `#ece3cf` | Type |
| `--ink-2` | `#57513f` | `#99917f` | Secondary type, data headings |
| `--spot` | `#b32620` | `#e04a40` | **Vermillion. Action and the bindu** |
| `--haldi` | `#e3962b` | `#f0a83c` | **Marigold. Warmth and light** |
| `--haldi-2` | `#f6dcae` | `#2a2116` | Warm tint block |
| `--rule` | `#c3b697` | `#35302a` | Hairline, data tables only |
| `--rule-strong` | `#16130f` | `#ece3cf` | Full-strength rule, form fields only |

Tailwind: `bg-paper` `bg-paper2` `bg-paper3` `text-ink` `text-ink2` `text-spot` `bg-spot`
`text-haldi` `bg-haldi` `bg-haldi2` `border-rule` `border-rulestrong`.

**The two inks have different jobs.**

- **Vermillion acts.** The primary button, the bindu in the logo, the sun on the river, the
  tilak. **One vermillion button per screen.**
- **Haldi warms.** The glitter on the water, petals, the diya flame, the count of mornings kept,
  the eleven pack's block. The `--haldi-2` block is the ground for anything personal: the
  family's names, today's sheet, a kept morning.

Haldi never sets running text on day paper (it sits near 2:1 contrast). Use it for fills and
marks, and set ink on top of it. By night it is bright enough for a figure.

The night edition is the same palette after dark. Night headings step up one weight, Eczar
700, because light ink on dark paper spreads less.

## Type

Unchanged, and staying that way. Two families that carry **Devanagari and Latin natively**,
so both editions speak in one voice.

- **Eczar** (Vaibhav Singh, Indian Type Foundry) for display. Designed Devanagari-first.
- **Martel Sans** for text and tabular data.

```css
.display  /* Eczar 600, tight leading, headings only */
.wordmark /* the brand lockup only, plus -root -suffix -i -bindu */
```

**Everything is sentence case.** Tracked capitals are retired: they were the commonest tell
of a generated page, and this site had about a hundred of them. A button reads "Sit with the
Ganga". A data heading is small Martel Sans in `ink-2` ("Today", "Next muhurat"), sentence
case, 0.8125rem.

### Script rules, all load-bearing

```css
html[lang="hi"] .display { line-height: 1.3; }   /* 0.98 collides matras */
html[lang="hi"] .italic  { font-style: normal; }  /* no italic form exists */
.display { font-synthesis: none; }                /* Eczar ships no italic cut */
```

Without `font-synthesis: none` the browser fakes an oblique, and a synthesised style is a
tell. The type layer keys off `data-script`, never `lang`, because Indic scripts need their
own leading.

Numerals are Devanagari in the Hindi edition (`०१ ०२ ०३`). Tabular figures wherever numbers
line up in a column.

## Marks

The page used to divide itself with rules: a double rule under the masthead, a heavy rule
over every section, a hairline under every row. Marks from the puja thali replace them. A
mark is small, vermillion or haldi, and **used once where it means something**.

| Mark | Drawn as | Where |
| --- | --- | --- |
| **Tilak** | A vertical vermillion stroke ending in a bindu, set in the gutter beside a headline | The one headline that matters on a page: the hero, the pay step, the Patra page. Once per page. |
| **Kumkum** | Three vermillion dots, the middle one larger | A turn between the big movements of a long page. At most twice per page. |
| **Mauli** | A vermillion thread with a dashed haldi thread twisted along it | The single divider: above the packs, at the foot of the Sankalp Patra, above the footer. |
| **Bindu** | One vermillion dot | The logo, the dot of the `ı`, the selected radio, the current step. |

All four are SVG components in `src/components/marks/`, sized in `em` so they scale with the
type beside them.

**Space is the default divider.** Between sections, reach for vertical space first, then a
tint block, then a mark. A rule is the last resort.

**Rules remain where columns must line up**: the muhurat timings, the panchang, a city's
calendar. There a `border-b border-rule` hairline separates rows, because the eye needs it to
read across. Form fields keep their 2px rule underneath. Nowhere else.

## Blocks

```css
.tint     /* --paper-2, a cool ground for reference data */
.warm     /* --haldi-2, the ground for anything personal */
.plate    /* photographs: the tint by day, the paper by night */
.grain    /* fixed paper grain overlay, multiply by day, screen by night */
```

A block is flat colour with no border. Two blocks never sit edge to edge in the same colour;
alternate paper, tint and warm so the rhythm changes as the reader scrolls.

`.misregister`, the 4px vermillion offset of a two-colour press slipping, stays for exactly
one element per page: the raised pack beside the specimen.

## Layout

**Lists, blocks and space, never card grids.** The river list is the model: the river's name
in Eczar, the ghat in `ink-2`, generous space between, and nothing boxed.

Vary the rhythm. Paper, then a warm block, then the water, then paper. A page where every
section has the same shape reads as a template.

| Thing | Value |
| --- | --- |
| Page container | `max-w-6xl px-5` (`Section`) |
| Section spacing | `py-16`, `sm:py-24` |
| Selling prose | `max-w-2xl` |
| Long reading (`/faq`, `/about`, `/terms`) | `max-w-[38rem]`, `leading-[1.75]` |
| The sitting, setup, the pay step | `max-w-md`, centred |

## Motion

Five motions, named, and nothing else. Each is a utility in `globals.css`, and all of them
stop under `prefers-reduced-motion`.

| Name | What | Where |
| --- | --- | --- |
| `impress` | On `:active` the control moves 1px down and right and its ink darkens at once; it lifts back over 120ms. | Every button, link-button, summary, the hold, the river list |
| `pull` | A stepped entrance, `steps(6, end)`, like an impression being pulled. `ink-in` is the older name. | A part of the sitting, the Sankalp Patra, the specimen |
| `settle` | 240ms on `cubic-bezier(0.2, 0.8, 0.3, 1)` for a state change. `settle-panel` slides a `<details>` panel open. | Menus, the language switch, the account fold, the theme |
| `flow` | Continuous water, and what floats on it. | The hero river, `WaterBand`, the breath, the stillness, the petals |
| `flicker` | A diya flame breathing, `scaleY` from its base, 1.4s. | The flame on the primary button, the flame in the sitting |

**The press matters most.** A phone has no hover, so `:active` is the only feedback a thumb
gets. Every variant in `src/components/ui` carries a pressed colour, and
`-webkit-tap-highlight-color` is transparent so the browser's grey flash never shows.

**Petals.** A few haldi and vermillion petals ride the hero river at the water's own speed,
and they are what makes the water read as the Ganga at a ghat rather than a diagram. At the
end of a sitting, as the mark writes itself, three petals settle onto the water and the count
of mornings kept ticks up by one. That is the moment the snan feels finished. Keep it to
those two places.

Only numerals, bars, petals and pictures reveal on scroll (`.reveal`, `.grow`,
`.ink-picture-lazy` under an `InView`). Text is on the page from the first frame. `LiveHero`
sweeps a needle and counts a figure up. Transform and opacity only.

Controls that wait for the hero's own button to scroll off (the masthead's Begin, the phone's
thumb rail) carry `data-until-scrolled`; `PastHero` stamps `data-past-hero` on `<html>` and
the stylesheet does the showing. Without scripts nothing is ever hidden.

`StatusBadge` leads with a vermillion bindu only when `live` is true, and a faint one
otherwise. A vermillion dot asserts that something is running right now.

## The river

`src/components/RiverFlow.tsx` draws an engraved river in **true perspective**, and it stays
the heart of the landing page: full width, always moving, with the headline set beside the sun.
Points project as `y = horizon + C/d` with the channel's half-width shrinking by the same
`1/d`, so streamlines converge on a real vanishing point.

- **Ripples step in `1/d`, not in `d`.** Stepping in depth cakes them into a black band at the
  horizon; stepping in the reciprocal spaces them evenly on screen.
- **The river runs diagonally**, vanishing right of centre, so the headline keeps clean paper.
- **The sun is vermillion**, because it is the bindu over the water and the logo's one idea.
- **The glitter is haldi**: the same ripple geometry redrawn, clipped to a widening trapezoid,
  which is the shape a real reflection makes. Petals ride the same flow.

**The sun is set into the headline.** The `h1` floats a circular `shape-outside`: the first
line keeps the full measure and every line after wraps around the disc. RiverFlow finds that
float, paints the sun onto exactly that circle and takes its vanishing point from it, so the
type and the water converge on one point. The composition is sized in `em` off the headline,
which is why it holds in both scripts. The float hangs its lower half out of the block with a
negative bottom margin, which puts the waterline through the sun's centre.

**The viewBox is the element, in CSS pixels**, set from the measured box each frame. A fixed
viewBox with `preserveAspectRatio="slice"` put the horizon wherever the crop landed. The
waterline is anchored under `[data-horizon-anchor]`, never a fraction of the box.

At `sm` and below the river gets a band of its own beneath the headline, above the fold, with
nothing set over it, and the vanishing point swings hard right against a hard-left near edge.

**Anything set over the river needs an opaque ground.** The ripples read straight through type.

Performance: geometry is written straight to each path's `d` attribute through a group ref,
so roughly eighty paths animate with zero React re-renders. It pauses off screen and in
background tabs. Round every computed coordinate (`.toFixed(2)`); raw floats hydrate
differently.

## The sitting

`src/components/snan/Sitting.tsx`, on `/today`. The practice takes the whole screen
(`fixed inset-0`), holds a wake lock, and runs on the durations in `src/lib/sitting-plan.ts`
and nowhere else.

- **The water runs behind every part** except the stillness, as a `WaterBand`.
- **The reading** is today's figure, large, in Eczar, with the river's state in a sentence.
- **The breath** is a vermillion `WaterBand` rising four seconds and falling six.
- **The sankalp hold** sits on a `warm` block. The reader's own words fill with vermillion ink
  under their thumb. The diya flickers beside it.
- **The stillness** is near-black (`#0b0a08`) with the seconds left in dim ink and a Next.
- **The mark** writes one line into the register; three petals settle; the count ticks up.

A story bar across the top shows the five parts. A cross in the corner leaves without spending.
The sitting has no marks, no menus and no selling: it is the one screen that only does its job.

## The Sankalp Patra

The artefact people send home. Two renderings of one design:

- `src/components/SankalpPatra.tsx`, HTML, sized in a `u()` unit, for `/p/[id]`, the specimen
  and print. Print CSS swaps to a lighter paper, `#faf6ea`.
- `src/lib/patra-image.ts`, the image sent through the share sheet. Plain SVG, every letter
  turned to outlines by HarfBuzz, rasterised by resvg and sharp, at 1080×1350 (the sheet),
  1200×630 (the link card) and 1080×1920 (a story).

The image renderer cannot read CSS, so it **hard-codes the day tokens as hex** at the top of
the file. Change a token and change it there in the same commit.

On the sheet: the wordmark, the household's names on a `warm` block beside a tilak, the
water and the day's figure and rank, the tithi, the distance, the time in the person's zone
and in IST, the prayer, the optional portrait on a `plate`, and an engraving seeded by that
day's flow. A mauli thread closes the sheet above the colophon. The specimen carries a tiled
"specimen" watermark.

## Forms

A radio or a checkbox is a square that fills with a vermillion bindu, never the platform's
blue circle. Inputs take `.field`: no box, a 2px rule beneath that turns vermillion on focus.
Focus is a 2px vermillion outline at a 2px offset everywhere (`:focus-visible`).

Setup is one column, `max-w-md`, under a three-step line whose current step is a bindu.

## Email

`src/lib/email.ts` sets every email in one shell: a 520px column of `#faf6ea` paper on the
`#f2ead9` page, flat, with no box drawn round it. Georgia sets the type (email clients will
not load Eczar reliably), 16px at 1.7.

- **One button**, vermillion, bold, in **sentence case**, naming the river where the message
  knows it: "Sit with the Ganga".
- **The mauli** sits above the footer, drawn as two borders (3px solid vermillion over 2px
  dashed haldi), so it needs no image and survives every client that keeps a border.
- **The reminder leads with the river's state**, as its subject and its first line ("The
  Ganga is running full this morning"), because that is the reason to open it. One line of
  invitation follows, then the button. It never mentions a streak, a count or a day missed.

## The logo

The **Bindu Ripple**, cut as a printer's colophon. A solid vermillion bindu over flat ink
rules, trimmed by a double-ruled roundel. The rules deliberately run past the roundel and get
clipped by it, the way a printed block is trimmed by its seal.

The wordmark is a **logotype**:

- **Mixed case, two weights.** `Snan` in Eczar 700 at `-0.01em`, `ıfy` in Eczar 400 at
  `0.015em`. The eye reads the Sanskrit root first.
- **The dot of the i is the bindu**, in vermillion, so the seal's one idea recurs inside the
  word.

Three things about that dot are load-bearing:

| | |
| --- | --- |
| `line-height: 1` on `.wordmark` | The bindu sits 0.826em up from the box bottom: the dot's foot above the baseline (0.587em, measured off the live face) plus the baseline's height above the box bottom. That second term holds only while the line box is one em. |
| An SVG `<circle>`, not a styled span | The base layer zeroes radius, so a rounded span prints as a square. |
| The letter is U+0131, the dotless `ı` | Eczar's own tittle would sit above the bindu. The lettering is therefore `aria-hidden` and `select-none`, with the real name in an `sr-only` span. |

Every measurement is in em: 22px in the header (24px at `sm`), 20px in the footer, `u(13)` on
the Patra masthead. The seal is nudged `translateY(0.14em)`. The brand stays Latin in both
editions, so `.wordmark` names Eczar itself and takes none of the script overrides.

- `<Mark />` the seal alone
- `<Wordmark />` the word alone
- `<Logo />` seal and word, baseline aligned
- `<Colophon />` the large version, with a 30-tick dial

### The favicon is three files

All standalone and flat, with day tokens as hex, because a favicon renders without a stylesheet.

| File | Used by | Art |
| --- | --- | --- |
| `public/icon.svg` | modern browsers, the 16px tab | the **small cut**: one 3.2-unit ring, two water rules, bindu at `r 6.6` |
| `public/favicon.ico` | `/favicon.ico` requests, Google | the small cut at 16, 32 and 48 |
| `public/apple-touch-icon.png` | the iOS home screen | the **full mark**, 180px, opaque |

The full seal aliases into a grey smudge at 16px, so the tab icon drops the outer hairline,
thickens the ring and prints two rules. The touch icon keeps the full mark on an opaque ground,
because iOS composites transparency to black. `/favicon.ico` must exist as a file: browsers
and Google's crawler ask for that exact path. Regenerate from `src/components/Logo.tsx` with
`sharp` and PIL; `src/lib/seo.ts` declares all three.

## Components

`@/components/ui`: `Section`, `CTA`, `LinkButton`, `SubmitButton`, `buttonClass`,
`StatusBadge`, `Price`, `PriceText`, `TaxNote`.

`@/components/marks`: `Tilak`, `Kumkum`, `Mauli`, `Bindu`, `Diya`, `Petals`.

`@/components/site`: the `Header` defaults to `primaryNav(lang)` and `ctaHref(lang)`, so pages
cannot drift apart. Only the landing page overrides it, for its on-page anchor.

**Prices are stamped by a sync `<head>` script.** Render one with `<Price>`, never by reading
the currency in a component.

A section is a display heading and at most one plain sentence under it. No label above the
heading, ever.

## Voice

The copy rules in `CLAUDE.md` are the law: the owner's two rules, no negative constructions,
no em dashes, no coined names. This is how the voice sounds inside them.

**Speak to one person, about this morning.** Second person, present tense, today's river first.

| Instead of | Write |
| --- | --- |
| Six sacred waters | Pick your river |
| A sheet to send home, every morning | Send this morning home to the family |
| One price, in your own currency | Eleven mornings for €11. Start tomorrow. |
| Begin | Sit with the Ganga |
| Running full (alone, as a label) | The Ganga is running full this morning |

- **Verbs on every button**, naming the river or the family wherever the page knows them.
- **Headings are invitations**, never category names.
- **Name the family.** Once the sheet is set up, the names are on the page: "For Asha, Ravi
  and Dadi".
- **Mark the morning kept.** After a sitting, say what the person did: "Your fourth morning
  with the Yamuna." Warmth about the habit, never a claim about its effect.
- **Short.** One idea a sentence. This is read at six, on a phone, often in a third language.
- Sanskrit and Hindi terms (snan, sankalp, gotra, muhurat, ghat, tithi, nakshatra) stay
  untranslated in English and are glossed in place.
- The source of the river figure is named on `/rivers`, `/live`, `/faq` and in structured
  data, and shown plainly with no source line on every product surface.

## Campaigns

Ads, the share card, Facebook and Instagram posts, festival takeovers. Built in `ads/`
(`ads/README.md`), rendered to PNG and video. The three styles are one template,
`ads/src/campaign.html`, rendered by `ads/src/render-campaign.mjs` from `CAMPAIGN` and `SEAL`
in `ads/src/copy.mjs`. The site's own link card (`src/lib/site-card.ts`, what a chat app shows
for snanify.com) is a matchbox label; the Sankalp Patra's card stays in the everyday style,
because it is a person's own morning. **Campaign print never appears in setup, the
sitting, the Patra or the account.** It may appear on a festival landing section, framed as
that day's notice.

Campaign print borrows from the Indian bazaar. Three styles:

| Style | Look | Use |
| --- | --- | --- |
| **Matchbox** | A label in a 3px black frame with an inner red rule. One central emblem (the sun over the water, rayed). "SANKALP BRAND" lettering. Prices as small boxed labels, collectable. Matchbox yellow `#f2c230`, red `#c8251d`, black `#1a1410` on `#efe2c2`. | Ads, the share card, stickers, the price story |
| **Signboard** | Hand-painted shop sign. Chrome yellow `#f6c518` ground, red `#d1261c` and black lettering, huge stacked caps ("GANGA / SNAN"), a hazard-stripe border top and bottom, a round red price seal. | Scroll-stopping ads, launch posts |
| **Calendar art** | A devotional wall calendar. Maroon `#7a1a14` ground in a gold `#e2a93b` double frame, a flat painted scene (saffron sky `#f0b648`, the sun `#d9481f`, peacock water `#1d5a6a`), a centred title, the Samvat. | Festival days (Kartik Purnima, Ganga Dussehra, the Kumbh snan dates), daily social posts |

In campaign print:

- **Capitals are allowed** in display lettering, because that is how a signboard and a label
  are painted.
- Colour is saturated, flat and full-bleed. The bans on gradients, glows, blurs and soft
  shadows still hold.
- Eczar and Martel Sans still set every word, so an ad and the site are recognisably one voice.
- The phone may appear, drawn as SVG with rounded corners.
- The owner's two rules hold everywhere. An ad claims nothing the product does not do.

## Mobile first

Over 90% of readers are on a phone. **Reason at 390 x 844 first**; desktop is the adaptation.

- Nothing scrolls horizontally at 390px.
- Tap targets at least 44px.
- Primary actions thumb-reachable, near the bottom of the viewport.
- Tables become stacked rows on small screens, never a horizontal scroller.
- The sticky masthead stays short. Once the page has scrolled (`html[data-scrolled]`) it lifts
  off the page as a sheet, with a 1px `--paper-3` fold beneath it.
- SVG and animation stay cheap enough for a mid-range Android.

## Checklist before shipping a page

- [ ] `npx tsc --noEmit` clean, `npm run lint` zero errors, `npm test` green
- [ ] Renders in English and Hindi, by day and by night
- [ ] One vermillion button on the screen, and it names an action
- [ ] No tracked capitals; no label above a heading
- [ ] Rules only where columns must line up; marks used once where they mean something
- [ ] Anything set over the river has an opaque ground
- [ ] No horizontal scroll at 390px, tap targets 44px
- [ ] No gradient, glow, blur, soft shadow or rounded box
- [ ] Copy speaks to one person about this morning; no negative constructions, no em dashes
- [ ] Headings in order, `aria-label` on icon-only controls, visible focus
- [ ] Added to `src/app/sitemap.ts`, and to `src/lib/nav.ts` if it belongs in the nav
