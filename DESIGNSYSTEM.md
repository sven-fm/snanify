# Design system

Snanify is set as a **two-colour letterpress panchang**: ink and one vermillion spot on
newsprint. Everything follows from that.

The whole system lives in `src/app/globals.css`. `src/components/Landing.tsx` is the
reference implementation; when in doubt, copy what it does.

---

## The one rule

**No gradients. No glows. No blurs. No rounded corners. No soft shadows.**

If something needs emphasis it gets a heavier rule, a tint block, or the spot colour. That is
the entire vocabulary. The base layer enforces the corners:

```css
*, *::before, *::after { border-radius: 0 !important; }
```

This is not decoration policy, it is the product's differentiation. The previous iteration
was deep navy with marigold gradients and a glowing orb, and it read as generic AI output.
Every prohibition above exists to make that impossible to drift back into.

## Colour

Two editions of one forme. The night edition is the same press run, overprinted.

| Token | Light (day) | Dark (night) | Use |
| --- | --- | --- | --- |
| `--paper` | `#f2ead9` | `#12110e` | Page ground |
| `--paper-2` | `#eae0c9` | `#1a1814` | Tint block, the only fill |
| `--paper-3` | `#ded1b4` | `#24211a` | Deeper tint, hover |
| `--ink` | `#16130f` | `#ece3cf` | Type |
| `--ink-2` | `#57513f` | `#99917f` | Secondary type |
| `--spot` | `#c1272d` | `#e04a40` | **The only accent** |
| `--rule` | `#c3b697` | `#35302a` | Hairline |
| `--rule-strong` | `#16130f` | `#ece3cf` | Full-strength rule |

Tailwind classes: `bg-paper` `bg-paper2` `bg-paper3` `text-ink` `text-ink2` `text-spot`
`bg-spot` `border-rule` `border-rulestrong`.

**Spend the spot colour sparingly.** Section labels, index numerals, one CTA, a key figure,
the sun. A page with vermillion everywhere has no vermillion.

## Type

Two families, both of which carry **Devanagari and Latin natively**, so the Hindi and English
editions speak in one voice rather than two borrowed ones.

- **Eczar** (Vaibhav Singh, Indian Type Foundry) for display. High contrast, designed
  Devanagari-first.
- **Martel Sans** for text, labels and tabular data.

```css
.display  /* Eczar 600, tight leading, headings only */
.label    /* Martel Sans 700 caps, 0.16em tracking, column heads and eyebrows */
.wordmark /* the brand lockup only, plus -root -suffix -i -bindu */
```

### Script-specific rules, all of which matter

```css
html[lang="hi"] .display { line-height: 1.3; }   /* 0.98 collides matras */
html[lang="hi"] .label   { text-transform: none; }/* Devanagari has no case */
html[lang="hi"] .italic  { font-style: normal; }  /* no italic form exists */
.display { font-synthesis: none; }                /* Eczar ships no italic cut */
```

`font-synthesis: none` is load-bearing. Without it the browser fakes an oblique, and a
synthesised style is exactly the generic tell this design exists to remove.

Numerals are Devanagari in the Hindi edition (`०१ ०२ ०३`). Tabular figures everywhere numbers
line up in a column.

`.wordmark` names its own family (Eczar) rather than reading `--font-display`, and takes none
of the `html:not([data-script="latin"])` overrides, because the brand stays Latin in all
twelve locales: one mark, not twelve.

## Rules

Rules carry the structure. Reach for one before reaching for a box.

```css
.rule-masthead  /* 3px over 1px, the almanac masthead */
.rule-double    /* 1px, gap, 1px, the section divider */
.rule-heavy     /* 2px, opens a block */
.rule-thin      /* 1px hairline, separates rows */
```

`border-t-2 border-rulestrong` opens a section. `border-b border-rule` separates rows.

## Blocks

```css
.tint         /* the only fill */
.boxed        /* 1px full-strength border. No radius, no shadow */
.misregister  /* 4px hard offset in the spot colour, as a two-colour press slips */
.grain        /* fixed paper grain overlay, multiply in light, screen in dark */
```

`.misregister` is the replacement for a drop shadow. It reads as a second impression landing
a few points off, which is a printing artefact rather than a UI effect. Use it rarely.

## Layout

**Tables and ruled registers, not cards.** A row of hairline-separated data beats a grid of
boxes almost every time. The river register and the muhurat table on the landing page are the
models.

Vary the rhythm between sections. If every section is a ruled list the page is as boring as
if every section were a card grid.

Long-form pages (`/ethics`) get a narrow measure (`max-w-[42rem]`) and real leading
(`leading-[1.75]` or more). `/ethics` deliberately has **no scroll animation**: a binding
statement should be legible the instant it loads.

## Motion

Print does not animate. There are exactly two motions.

- `.ink-in`, a stepped entrance, `steps(6, end)`, so content arrives like an impression
  being pulled rather than a web page fading in.
- `<Reveal>`, the same, triggered by `IntersectionObserver` on scroll.

Both collapse under `prefers-reduced-motion`.

The one exception is `RiverFlow`, which is the hero and is genuinely alive.

## The river

`src/components/RiverFlow.tsx` draws an engraved river in **true perspective**, not a stack
of sine waves. Points project as `y = horizon + C/d` with the channel half-width shrinking by
the same `1/d`, so streamlines converge on a real vanishing point.

Two things are worth preserving:

- **Ripples step in `1/d`, not in `d`.** Stepping in depth cakes them into a black band at
  the horizon; stepping in the reciprocal spaces them evenly on screen.
- **The river runs diagonally**, vanishing right of centre, so the headline keeps clean paper.

**The sun is set into the headline, not placed beside it.** The `h1` floats a circular
`shape-outside`: the first line keeps the full measure and every line after it wraps around
the disc. RiverFlow finds that float, paints the sun onto exactly that circle, and takes its
vanishing point from it, so the type and the water converge on one point. The whole
composition is sized in `em` off the headline, which is why it holds in all twelve scripts.
The float hangs its lower half out of the block with a negative bottom margin, which puts the
waterline through the sun's centre and makes it set rather than float.

The glitter path is the same ripple geometry redrawn in the spot colour, clipped to a widening
trapezoid, which is the shape a real reflection makes. The sky above the horizon is empty
paper; it previously carried engraved hatching and read as busy.

**The viewBox is the element, in CSS pixels**, set from the measured box each frame. A fixed
viewBox with `preserveAspectRatio="slice"` put the horizon wherever the crop landed: through
the headline on a desktop, and flattened to a symmetric wedge with no perspective on a phone.

At `sm` and below the river gets a band of its own beneath the headline, above the fold, with
nothing set over it, and the vanishing point swings hard right against a hard-left near edge.
That swing is the only thing that reads as depth in a box that shape.

**Anything set over the river needs an opaque ground.** The ripples read straight through
type. The ghost button carries `bg-paper` for this reason, and so does the hero's offer slip.

Performance: geometry is written straight to each path's `d` attribute through a group ref,
so roughly eighty paths animate with zero React re-renders. It pauses off screen and in
background tabs.

## The logo

The **Bindu Ripple**, cut as a printer's colophon. A solid vermillion bindu over flat ink
rules, trimmed by a double-ruled roundel. The rules deliberately run past the roundel and get
clipped by it, the way a printed block is trimmed by its seal.

The wordmark is set as a **logotype, not a label**, and it does two things at once:

- **Mixed case, two weights.** `Snan` in Eczar 700 at `-0.01em`, `ıfy` in Eczar 400 at
  `0.015em`. The eye reads the Sanskrit root first, and the word has ascenders and a
  descender to be recognised by. It was once 800 caps, which closed the counters of a
  high-contrast face and flattened the name into an even grey.
- **The dot of the i is the bindu**, in the spot colour, so the seal's one idea recurs inside
  the word instead of standing next to it. The hairline that used to separate seal from word
  is gone with it: this is no longer an icon with a label, so nothing has to bind the two.

Three things about that dot are load-bearing, and each one bites if changed:

| | |
| --- | --- |
| `line-height: 1` on `.wordmark` | The bindu is placed 0.826em up from the box bottom, which is the dot's foot above the baseline (0.587em, measured off the live face) plus the baseline's own height above the box bottom. That second term only holds while the line box is exactly one em. Change the leading and the dot drifts off the stem. |
| An SVG `<circle>`, not a styled span | The base layer sets `border-radius: 0 !important`, so a rounded span prints as a square. The seal draws its bindu the same way. |
| The letter is U+0131, the dotless `ı` | Eczar's own tittle would otherwise sit above the bindu. The visible string is therefore not "Snanify", so the lettering is `aria-hidden` and `select-none`, with the real name in an `sr-only` span. Without both, a screen reader says "Snan" plus a stray letter and copying the masthead yields the name twice. |

Every dot measurement is in em, so the lockup works at any size with no per-size tuning:
22px in the header (24px at `sm`), 20px in the footer, `u(13)` on the Jal Chihna masthead. The
seal is nudged `translateY(0.14em)`, down from `0.2em`, because a mixed-case word puts its
optical centre lower than caps do.

- `<Mark />` the seal alone
- `<Wordmark />` the word alone, at whatever size it inherits
- `<Logo />` seal and word, baseline aligned, no separator
- `<Colophon />` the large version, with a 30-tick dial

`public/icon.svg` is a standalone flat copy for the favicon, with the day-edition tokens
resolved and no CSS variables.

## Components

`@/components/ui` exports `Section`, `SectionHeader`, `Eyebrow`, `Card`, `CTA`, `LinkButton`,
`buttonClass`, `StatusBadge`, `DataRow`.

`StatusBadge` only pulses when `live` is true. A pulsing dot asserts that something is running
right now, so it must never decorate a static label.

Site chrome is in `@/components/site/`. The `Header` defaults to `primaryNav(lang)` and
`ctaHref(lang)`, so pages cannot drift apart; only the landing page overrides, and only for
its on-page anchor.

## Mobile first

Over 90% of users are on a phone. **Reason at 390 x 844 first** and treat desktop as the
adaptation.

- Nothing scrolls horizontally at 390px.
- Tap targets at least 44px.
- Primary actions thumb-reachable, near the bottom of the viewport.
- Tables become stacked ruled rows on small screens, never a horizontal scroller, unless the
  table is genuinely a dataset.
- The sticky masthead stays short on small screens.
- SVG and animation stay cheap enough for a mid-range Android.

## Writing

**No em dashes.** Not in copy, not in comments. Use a comma, a colon, a full stop or
parentheses. Roughly 1,950 were removed from this repo in one pass; do not reintroduce them.

**No negative constructions in selling copy.** On the landing page and `/snan`, a sentence
built on "no", "nobody", "nothing" or "there is no" gets rewritten until it is built on a noun
and a verb. "Nobody stands in the water for you" becomes "the practice is yours". Say what the
product **is**; the page is not a defence.

Copy is plain, unhurried and confident. Sentences are short, because this is read at six in
the morning on a phone by many readers whose English is a third language. Sanskrit and Hindi
terms (snan, sankalp, gotra, muhurat, ghat, tithi, nakshatra) stay untranslated in the English
edition and are glossed in place for a reader who does not know them.

Honest disclosure has one home, `/ethics`, where it is stated at length. Everywhere else the
rule is simply never to claim what did not happen.

## Checklist before shipping a page

- [ ] `npx tsc --noEmit` clean, `npm run lint` zero errors
- [ ] Renders correctly in every edition it serves, light and dark
- [ ] Complete copy in every locale of its tier, and no English left in the others
- [ ] No sentence in selling copy built on "no", "nobody" or "there is no"
- [ ] Anything set over the river has an opaque ground
- [ ] No horizontal scroll at 390px, tap targets 44px
- [ ] No gradient, glow, blur, radius or soft shadow
- [ ] No em dashes
- [ ] Headings in order, `aria-label` on icon-only controls, visible focus
- [ ] Added to `src/app/sitemap.ts`, and to `src/lib/nav.ts` if it belongs in the nav
