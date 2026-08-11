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
.wordmark /* the brand lockup only */
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

`.wordmark` deliberately does **not** inherit the `lang="hi"` case override, because the logo
stays Latin caps in every locale.

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

- `.ink-in` — a stepped entrance, `steps(6, end)`, so content arrives like an impression
  being pulled rather than a web page fading in.
- `<Reveal>` — the same, triggered by `IntersectionObserver` on scroll.

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

The sun sets into the waterline and its glitter path is the same ripple geometry redrawn in
the spot colour, clipped to a widening trapezoid, which is the shape a real reflection makes.
The sky above the horizon is empty paper; it previously carried engraved hatching and read as
busy.

Below 900px the channel recentres and the river is confined to a band beneath the type,
because the `slice` fit crops most of the viewBox width on a phone and would otherwise put
the sun through the headline.

Performance: geometry is written straight to each path's `d` attribute through a group ref,
so roughly eighty paths animate with zero React re-renders. It pauses off screen and in
background tabs.

## The logo

The **Bindu Ripple**, cut as a printer's colophon. A solid vermillion bindu over flat ink
rules, trimmed by a double-ruled roundel. The rules deliberately run past the roundel and get
clipped by it, the way a printed block is trimmed by its seal.

- `<Mark />` the seal alone
- `<Logo />` seal plus wordmark
- `<Colophon />` the large version, with a 30-tick dial

`public/icon.svg` is a standalone flat copy for the favicon, with no CSS variables.

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

Copy is plain, unhurried, never defensive and never salesy. Where the honest answer is "we
cannot promise that", it says exactly that. Sanskrit and Hindi terms (snan, sankalp, gotra,
muhurat, ghat, tithi, nakshatra) stay untranslated in the English edition and are glossed in
place for a reader who does not know them.

## Checklist before shipping a page

- [ ] `npx tsc --noEmit` clean, `npm run lint` zero errors
- [ ] Renders correctly in **both** editions, light and dark
- [ ] Complete copy in **both** locales
- [ ] No horizontal scroll at 390px, tap targets 44px
- [ ] No gradient, glow, blur, radius or soft shadow
- [ ] No em dashes
- [ ] Headings in order, `aria-label` on icon-only controls, visible focus
- [ ] Added to `src/app/sitemap.ts`, and to `src/lib/nav.ts` if it belongs in the nav
