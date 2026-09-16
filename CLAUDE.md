# Snanify

A purely digital snan. At an hour the panchang names, you sit with the live published state
of a sacred river in India and make your sankalp yourself, wherever in the world you are.

**Live:** https://www.snanify.com · **Repo:** https://github.com/sven-fm/snanify

**`plan.md` is the spec and the queue.** Read it before building anything; every future
work step starts from there. `ARCHITECTURE.md` holds the stack, `DESIGNSYSTEM.md` the design
language. `docs/` is reasoning history and yields to `plan.md` where they disagree.

---

## The two rules

Everything in this repo is written under exactly two constraints. They come from the owner
and are not up for softening.

1. **Never claim a physical rite happened.** No priest performs anything. No ceremony takes
   place at a ghat on anyone's behalf. Nothing is recorded, witnessed or offered by a person.
2. **Never make a promise that is not true.** No guaranteed spiritual outcomes. Nothing about
   what this does to anyone's karma, sins or soul.

Beyond those two, **sell the thing**. The copy is never apologetic, hedging or padded with
disclaimers nobody asked for, and never argues against the product in its own voice. The
mechanic, a hard rule on every page:

> **No negative constructions.** If a sentence is built on "no", "nobody", "nothing" or
> "there is no", rewrite it until it is built on a noun and a verb. Active voice.

"Nobody stands in the water for you" becomes "the practice is yours". Keep sentences short:
this is read at six in the morning, on a phone, by many readers whose English is a third
language.

## What is true, and therefore load-bearing

- **The river is real and public.** Modelled discharge from the Copernicus GloFAS flood model,
  read through Open-Meteo, one value a day, CC BY 4.0: a model at a grid cell, not a gauge at
  the ghat. Named on `/rivers`, `/live`, `/faq` and in the structured data; shown plainly,
  with no source line, on every product surface (the landing card, the sitting, the sheet, the
  Patra page, `/snan`, the emails). `tests/unit/copy-guard.test.ts` enforces that split. The
  figure is never called "measured". See `src/lib/riverdata.ts`.
- **The sky is real.** Tithi, nakshatra, the moon and the muhurat windows are computed offline
  with `astronomy-engine` at each ghat's coordinates and checked against Drik Panchang. See
  `src/lib/sky.ts`, `src/lib/occasions.ts`.
- **The sankalp is real.** The person states an intention. That is a real practice.
- **The six waters are real places** with real traditions. See `src/content/rivers.ts`.

Never fabricate a river figure, a panchang timing or a statistic and present it as fact.

## The product

**The snan**, three minutes, identical every day; only the river changes. Durations live in
`src/lib/sitting-plan.ts` and nowhere else.

| Part | Length | What happens |
| --- | --- | --- |
| The reading | 15s | The river's flow today and its rank against every day since 1997 |
| The breath | 45s | The engraved water rises for four seconds and falls for six, at the river's own amplitude |
| The sankalp | 11s | Your own words, held under your thumb while the ink fills |
| The stillness | 60s | The screen goes black, with the seconds left in dim ink and a Next |
| The mark | 20s | One line writes itself into your register |

The artefact is the **Sankalp Patra**: the names, the water, the day's figure and rank, the
tithi, the time in the person's zone and in IST, a prayer, an optional portrait, and an
engraving seeded by that day's published flow. Older docs call it the Jal Chihna or the
Watermark; those names are retired.

**One price, in the reader's own currency**, from `src/content/prices.ts`. Eleven mornings
cost eleven in every currency: that is the hook. The packs are named by their count.

| | one | eleven | sixty |
| --- | --- | --- | --- |
| USD | $2 | **$11** | $48 |
| EUR | €2 | **€11** | €45 |
| CAD | C$3 | **C$11** | C$48 |
| INR | ₹101 | **₹501** | ₹2,100 |

Change a price and change `PER_SNAN` in the same commit. The charge follows the geo header
on the server (`src/app/[lang]/begin/actions.ts`); the cookie is for display only.

Free forever: `/live`, `/panchang`, `/muhurat`, `/rivers`. That is the search and daily-return
surface, not a tier.

**Routes.** Marketing: `/`, `/snan`, `/rivers`, `/rivers/[river]`, `/live`, `/muhurat`,
`/muhurat/[occasion]`, `/panchang`, `/kumbh`, `/faq`, `/privacy`, `/terms`. Product: `/begin`,
`/setup`, `/today`, `/p/[id]`, `/account`, `/sign-in`. Folded routes (`/ethics`,
`/how-it-works`, `/patra`, `/verify`) are 308ed in `src/proxy.ts`.

## Working in this repo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # 0 errors
npx tsc --noEmit # clean
npm test         # vitest, offline
npx playwright test   # needs the dev server
```

CI runs lint, types and unit tests on every push. `.env.local` comes from `vercel env pull`;
it holds the production database today (see `plan.md`, the Neon branch item).

### Two locales, two tiers

`src/lib/locales.ts` is the registry and the only file that knows the locale set; routing,
the proxy, hreflang, the sitemap, fonts, the switch and JSON-LD all derive from it. Launch is
English and Hindi (`FullLang`). Ten surface locales are parked in place, unimported, each with
a PARKED header; reviving one is a row in `LOCALES` and whatever the compiler then reports.

Copy is `Record<Lang, ...>` with `satisfies`, so a missing translation is a compile error,
never a silent English fallback. `pickDeep` is the only fallback and it is confined to proper
nouns. Every locale is real, idiomatic, respectful-register copy, never a literal translation
of English marketing idiom. The brand stays Latin, "Snanify", in every edition.

### Routing and metadata

One tree under `src/app/[lang]/`. `src/proxy.ts` keeps the public URLs (English unprefixed,
Hindi under `/hi`) and skips only the files that exist in `public/`, so an unknown dotted path
gets the site's own 404. Build every href with `localePath(lang, path)`. Every page calls
`pageMetadata({ lang, path, title, description })` from `@/lib/seo` for the canonical, the
hreflang cluster and the OG locales, and `allLangParams()` or `fullLangParams()` for its
static params. Navigation asks `servesPath(lang, path)`.

`/p/[id]` and `/begin` sit outside the `(app)` route group on purpose: the group adds the
Clerk provider, and neither page needs it. `auth()` on the server still works there because
the proxy runs Clerk's middleware for every product path.

### Mobile first, not mobile also

Reason at **390 x 844 first** and let desktop be the adaptation. Nothing scrolls horizontally
at 390px. Tap targets 44px. Primary actions thumb-reachable. Every control has a press state
(`impress`), because a phone has no hover. Tables become stacked ruled rows.

### Never

- **Em dashes.** Not in copy, not in comments. A comma, a colon, a full stop or parentheses.
- **Apologetics.** Never explain what the product is not, never answer a critic who is not in
  the room. Facts about the data are craftsmanship, not disclaimers.
- **Coined names.** The practice is "the snan", the artefact the "Sankalp Patra", a pack is
  its count. Jal Sankalp, Jal Chihna, Watermark, Jal Path, Shwas, Maun, Chihn, Ek Dhara,
  Gyarah and Varsh Kosh are retired.
- Gradients, glows, blurs, rounded corners, soft shadows. The one rounded shape is the phone
  around the specimen, drawn as SVG. See `DESIGNSYSTEM.md`.
- Fabricated statistics presented as fact.

### Known traps, each of which cost real debugging

- **Round computed SVG coordinates** (`.toFixed(2)`); raw floats hydrate differently.
- **The theme and currency scripts are real `<head>` children**; React refuses to hydrate a
  sync script directly under `<html>`.
- **`font-synthesis: none` on `.display`**; Eczar ships no italic, and a faked one is the tell.
- **Indic scripts need their own leading**; the type layer keys off `data-script`, not `lang`.
- **next/font options must be literal**; a spread fails the build.
- **`opengraph-image` is excluded from the proxy matcher**; the English one lives at
  `/en/opengraph-image` and scrapers do not follow redirects.
- **The hero waterline is anchored** under `[data-horizon-anchor]`, never a fraction of the box.
- **Prices and the theme are stamped by a sync `<head>` script**; render a price with
  `<Price>`, never by reading the currency in a component.
- **The pay intent cookie is Secure only over https**, so the sign-in continuation on
  `/begin?go=1` cannot be tested on a plain-http local production build.
- **Production builds use webpack, not Turbopack** (`next build --webpack`). The Turbopack
  build of this app hydrates with a mismatch on about a quarter of slow loads (React error
  418, the whole page re-rendered on the client); the webpack build of the same commit does
  not. Measured on 16 September 2026 with a throttled Playwright loop against both.
- **`npm i <anything>` prunes `--no-save` installs.**

## Where the thinking lives

| Path | What it holds |
| --- | --- |
| `plan.md` | The spec, the queue, the done log |
| `ARCHITECTURE.md` | Stack, routing, data flow, deployment |
| `DESIGNSYSTEM.md` | Tokens, type, the four motions, the rules |
| `docs/seo/` | Search Console runbook, the hreflang contract |
| `docs/digital/`, `docs/product/`, `docs/design/` | Reasoning history, including the cancelled officiant model; never build from them without checking `plan.md` |
