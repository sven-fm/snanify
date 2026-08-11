# Snanify

A purely digital snan. At an hour the panchang names, you sit with the live measured state
of a sacred river in India and make your sankalp yourself, wherever in the world you are.

**Live:** https://www.snanify.com · **Repo:** https://github.com/sven-fm/snanify

---

## The two rules

Everything in this repo is written under exactly two constraints. They come from the owner.
They are not editorial caution and they are not up for softening.

1. **Never claim a physical rite happened.** No priest performs anything. No ceremony takes
   place at a ghat on anyone's behalf. Nothing is recorded, witnessed or offered by a person.
2. **Never make a promise that is not true.** No guaranteed spiritual outcomes. Nothing about
   what this does to anyone's karma, sins or soul.

Beyond those two, be confident. This is a legitimate digital product, nobody is forced to buy
it, and the copy should not be apologetic, hedging or padded with disclaimers nobody asked
for. Do not add caveats to be safe. Do not argue against the product in its own voice.

The rules are also the moat. "We never pretended a priest did anything" is what makes the
category defensible when somebody attacks it, and it costs nothing, because the product does
not need the lie.

## What is actually true, and therefore load-bearing

- **The river is real and public.** India's Central Water Commission publishes river gauge
  telemetry. Level and flow at real stations drive the product. This is what makes
  "our servers are in the river" a literal statement rather than a metaphor.
- **The panchang is real.** Tithi, nakshatra and muhurat are computed, not invented.
- **The sky is real.** The moon's position is computed offline and deterministically with
  `astronomy-engine`. No API, no key. See `src/lib/sky.ts` and `src/content/nakshatra.ts`.
- **The sankalp is real.** The user genuinely states an intention. That is a real practice.
- **The six waters are real places** with real traditions. See `src/content/rivers.ts`.

If a number is not sourced, it is labelled as unsourced, everywhere it appears. Never
fabricate a gauge reading, a panchang timing or a statistic and present it as fact. The
artefact's whole value rests on its numbers being checkable against a government record.

## The product

**Jal Sankalp**, a four and a half minute form, identical every day. Only the river changes.

| Limb | Length | What happens |
| --- | --- | --- |
| Jal Path, the reading | 21s | The river's actual level and flow, and how far you are from that water |
| Shwas, the breath | 60s | The waterline rises and falls at the river's own amplitude |
| Sankalp, the vow | 60s | Your own words, held under your thumb for 11 seconds while the ink fills |
| Maun, the stillness | 90s | The screen goes fully black |
| Chihn, the mark | 35s | One line writes itself into your register |

The artefact is the **Jal Chihna**, the Watermark: a generative engraving seeded by the
river's published gauge reading at that instant, so no two are alike and none can be forged
without forging the agency's record.

**Pricing is paid-only.** Content is free, the snan is paid.
`$2 / Rs 101` single · `$11 / Rs 501` for eleven (the hero SKU, exactly $1 a snan) ·
`$48 / Rs 2,100` for sixty. Eleven-in-one-charge exists because $1 per transaction loses 34%
to card fees while eleven loses 6%.

Free forever: `/live`, `/panchang`, `/muhurat`, `/rivers`. That is the SEO and daily-return
surface, not a product tier.

## Working in this repo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # must be 0 errors
npx tsc --noEmit # must be clean
```

### Bilingual, always

Copy lives in typed objects keyed by locale so a missing translation is a **compile error**,
never a silent English fallback:

```ts
export const xContent = { en: {...}, hi: {...} } satisfies Record<Lang, unknown>;
```

Hindi must be real, idiomatic, respectful-register (आप) Hindi. Never a literal translation of
English marketing idiom. Build every href with `localePath(lang, path)` from `@/lib/i18n`;
hand-writing `/hi/...` is how a route rename strands one locale.

### Routing

One tree under `src/app/[lang]/`. `src/proxy.ts` keeps the public URLs: English unprefixed,
Hindi at `/hi`, `/en/*` 308s to `/*`. Every page:

```tsx
export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Something lang={lang} />;
}
```

Export `generateMetadata` with the canonical in the **public** URL shape and reciprocal
`alternates.languages`. Dynamic segments need `generateStaticParams` over every
`(lang, slug)` combination.

### Mobile first, not mobile also

Over 90% of users arrive and use this on a phone, at 6am, in bed. Reason at **390 x 844
first** and let desktop be the adaptation. Nothing may scroll horizontally at 390px. Tap
targets at least 44px. Primary actions thumb-reachable near the bottom. Tables become stacked
ruled rows on small screens rather than horizontal scrollers. Keep the SVG cheap enough for a
mid-range Android.

### Never

- **Em dashes.** Not in copy, not in comments. Use a comma, a colon, a full stop or
  parentheses. They were all removed once; do not reintroduce them.
- Gradients, glows, blurs, rounded corners, soft shadows. See `DESIGNSYSTEM.md`.
- Fabricated statistics presented as fact, except the hero figures noted below.

### Known traps, each of which cost real debugging

- **Round computed SVG coordinates.** Raw floats serialise differently on server and client
  (`56.69872981077808` vs `56.698729810778076`) and React reports a hydration mismatch.
  Anything trigonometric uses `.toFixed(2)` or `.toFixed(3)`.
- **The theme script must be a real `<head>` child.** React refuses to hydrate a sync
  `<script>` placed directly under `<html>`. The `@next/next/no-head-element` lint rule that
  argues otherwise is Pages-Router-only and is disabled at that line in `RootShell.tsx`.
- **`font-synthesis: none` on `.display`.** Eczar ships no italic cut, so browsers fake an
  oblique, which is exactly the generic-AI tell the design exists to avoid.
- **Devanagari needs its own leading.** `line-height: 0.98` collides matras. `html[lang="hi"]`
  raises display leading to 1.18 and drops synthetic italics entirely.
- **`npm i <anything>` prunes `--no-save` dev installs.** Playwright, used for screenshots and
  audits, has to be reinstalled after any dependency change.

## Placeholder content

The landing hero figures (`1,20,000+ sankalps`, `48 countries`) and the live badge are
**placeholder marketing figures kept at the owner's explicit direction**. Several analyses
recommended deleting them; that decision has been made and is not to be relitigated. Replace
them with real values before launch.

Everything behind the landing page is held to the stricter rule, because `/ethics` publicly
commits to it. Panchang timings ship labelled provisional until a source is named.

## Where the thinking lives

| Path | What it holds |
| --- | --- |
| `docs/digital/` | The digital-snan design set: experience, artefact, river data, model, positioning, growth |
| `docs/product/` | Six web-researched market analyses, each adversarially reviewed |
| `docs/design/` | The earlier offering design set from the officiant-model era, superseded but useful |
| `ARCHITECTURE.md` | Stack, routing, data flow, deployment |
| `DESIGNSYSTEM.md` | Tokens, type, components, the rules |

`docs/design/` and parts of `docs/product/` describe the **cancelled** officiant model. They
are kept for reasoning history. Do not build from them without checking against the two rules.
