# Snanify

A purely digital snan. At an hour the panchang names, you sit with the live published state
of a sacred river in India and make your sankalp yourself, wherever in the world you are.

**Live:** https://www.snanify.com · **Repo:** https://github.com/sven-fm/snanify

This file is the spec: what the product is, the decisions behind it and the rules every
line of copy and code is written under. `ARCHITECTURE.md` holds how it is built,
`DESIGNSYSTEM.md` the design language, `plan.md` only the work queue.

## Who it is for

Indians and the Hindu diaspora far from their river, thirty and over, in the US, the UK,
Canada, the Gulf, Singapore and Australia. English and Hindi. Over ninety percent of readers
arrive on a phone, at six in the morning, in bed.

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

## Decisions, locked

The owner's, and not reopened inside a task. A task that discovers it needs one reversed
stops and says so.

| Question | Decision |
| --- | --- |
| Paying entity | Non-Indian. Stripe only, with Managed Payments on: Stripe is the merchant of record and charges and remits VAT and GST itself. Razorpay and UPI only if an Indian entity appears. |
| What is paid | The snan. One price, three packs (1, 11, 60), the Sankalp Patra included. Free forever: `/live`, `/panchang`, `/muhurat`, `/rivers`. |
| Prices | The table below. Every price outside the US is tax-inclusive; US dollars show before sales tax. Eleven mornings cost eleven in every currency: that is the hook. |
| Pack names | The count is the name: "One morning", "Eleven mornings", "Sixty mornings". No coined names, no Devanagari beside them. |
| The order | Begin, sign in, set up the sheet, pay, sit. The sheet is made before the packs are shown, and the packs are shown beside a specimen with the buyer's own names on it. |
| Locales | English and Hindi. The brand stays Latin, "Snanify", in every edition. |
| On the Patra | Portrait (optional), up to five household names, one chosen prayer, the day's river figure and rank, the tithi, the distance to the water, the time in the person's zone and in IST. The sankalp text is on the owner's copy only. |
| Sitting | Three minutes: reading 15s, breath 45s, sankalp hold 11s, stillness 60s, mark 20s. Next leaves the reading, the breath and the stillness early; nothing lengthens. |
| Cadence | One Patra per completed morning. |
| Sign-in | Clerk: Google and email link, on one combined screen. No phone OTP, no password. |
| Setup | All six fields (water, photograph, names, prayer, sankalp, hour), under a three-step line whose third step is the packs, with example sankalps to take as they are. |
| Data | GloFAS modelled discharge through Open-Meteo, one value a day. Named on `/rivers`, `/live`, `/faq` and in the structured data; shown plainly on every product surface. Never called "measured". |

Why, in one line each: two processors is two webhooks, two reconciliations and an Indian
company, and the diaspora is the paying audience on day one. The sitting is the value, and a
paywall inside a three-minute ritual is worse than one before it. The buyer pays for a thing
already half made, with their family's names on it, rather than for a description. Ten more
locales cost a font call, a copy file and a QA pass per page for pages nobody could buy from.
One Patra per morning is eleven shareable moments per pack, and the share is the growth
channel. Three minutes is long enough to be a practice and short enough to keep at 5:40 in
bed on morning three.

## The product

**The snan**, three minutes, identical every day; only the river changes. Durations live in
`src/lib/sitting-plan.ts` and nowhere else.

| Part | Length | What happens |
| --- | --- | --- |
| The reading | 15s | The river's flow today and its rank against every day since 1997 |
| The breath | 45s | The river rises for four seconds and falls for six, at its own amplitude |
| The sankalp | 11s | Your own words, held under your thumb while the ink fills |
| The stillness | 60s | The screen goes near black over the night river, with the seconds left in dim ink and a Next |
| The mark | 20s | One line writes itself into your register, and the sheet is ready to send |

The artefact is the **Sankalp Patra**: the names, one per line, the water, the day's figure
and rank beside the gauge, the tithi, the distance, the time in the person's zone and in IST,
a prayer, the person's own photograph pinned on the ghat picture when they gave one, the
morning badge ("7th morning") from the second morning on, and the river at the foot,
engraved from that day's published flow.

**As the buyer sees it.** Landing, above the fold: the headline in capitals ("Your Ganga
snan. From home."), the band, the price seal with three short lines, one press. Below it:
the river with the sun, the reading as a gauge, a specimen sheet inside a phone, the six
waters, eleven mornings for eleven on the label. Begin: sign in on one combined screen. Set
up, once, about two minutes. Pay on `/begin`, the third step, eleven first and raised beside
the specimen with their own names. Sit each morning on `/today`: the practice takes the
whole screen with the river at the foot of every part, the stillness is near black, the mark
writes itself and ends on the marigold press to send it, a cross in the corner leaves
without spending. The sheet arrives on `/p/[id]` pulled from the press and the share sheet
opens with the image attached; WhatsApp is the target. Tomorrow: an email at the chosen hour
with a one-tap way out, a line in the register on `/account`, a calendar file and the
home-screen icon.

**One price, in the reader's own currency**, from `src/content/prices.ts`. Eleven mornings
cost eleven in every currency: that is the hook. The packs are named by their count.

| | one | eleven | sixty |
| --- | --- | --- | --- |
| USD | $2 | **$11** | $48 |
| EUR | €2 | **€11** | €45 |
| GBP | £2 | **£11** | £42 |
| CAD | C$3 | **C$11** | C$48 |
| INR | ₹101 | **₹501** | ₹2,100 |

Change a price and change `PER_SNAN` in the same commit. The charge follows the geo header
on the server (`src/app/[lang]/begin/actions.ts`); the cookie is for display only.

Free forever: `/live`, `/panchang`, `/muhurat`, `/rivers`. That is the search and daily-return
surface, not a tier.

**Routes.** Marketing: `/`, `/snan`, `/rivers`, `/rivers/[river]`, `/live`, `/muhurat`,
`/muhurat/[occasion]`, `/panchang`, `/panchang/[city]`, `/panchang/shraddha`, `/kumbh`, `/faq`, `/about`, `/privacy`, `/terms`. Product: `/begin`,
`/setup`, `/today`, `/p/[id]`, `/account`, `/sign-in`, `/specimen`. Folded routes (`/ethics`,
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
it holds the production database today, so a local sitting writes real rows.

### Two locales

`src/lib/locales.ts` is the registry and the only file that knows the locale set; routing,
the proxy, hreflang, the sitemap, fonts, the switch and JSON-LD all derive from it. Every page
exists in both. Copy is `Record<Lang, ...>` with `satisfies`, so a missing translation is a
compile error, never a silent English fallback. A third locale is a row in `LOCALES` and
whatever the compiler then reports. Every locale is real, idiomatic, respectful-register
copy, never a literal translation of English marketing idiom.

### Routing and metadata

One tree under `src/app/[lang]/`. `src/proxy.ts` keeps the public URLs (English unprefixed,
Hindi under `/hi`) and skips only the files that exist in `public/`, so an unknown dotted path
gets the site's own 404. Build every href with `localePath(lang, path)`. Every page calls
`pageMetadata({ lang, path, title, description })` from `@/lib/seo` for the canonical, the
hreflang cluster and the OG locales, and `langParams()` for its static params.

`/p/[id]`, `/begin` and `/specimen` sit outside the `(app)` route group on purpose: the group
adds the Clerk provider, and none of them needs it. `auth()` on the server still works there
because the proxy runs Clerk's middleware for every product path (`APP_PATH`).

### Mobile first, not mobile also

Reason at **390 x 844 first** and let desktop be the adaptation. Nothing scrolls horizontally
at 390px. Tap targets 44px. Primary actions thumb-reachable. Every control has a press state
(the press, or an `active:` state on a small control), because a phone has no hover. The
fold is a contract: the landing's press sits above 660 at 390 wide and 640 at 360, in both
locales (`tests/e2e/fold.spec.ts`). Tables become stacked ruled rows.

### Never

- **Em dashes.** Not in copy, not in comments. A comma, a colon, a full stop or parentheses.
- **Apologetics.** Never explain what the product is not, never answer a critic who is not in
  the room. Facts about the data are craftsmanship, not disclaimers.
- **Coined names.** The practice is "the snan", the artefact the "Sankalp Patra", a pack is
  its count. `tests/unit/copy-guard.test.ts` fails the build on the old ones.
- **Officiants, priests, rites performed for anyone, subscriptions, gifting, tiers of
  service.** The product is the three minutes and the sheet. Anything else is an item in
  `plan.md` argued from revenue, never a quiet addition.
- Gradients, glows, blurs, soft shadows, rounded boxes. The press's hard ink walls are a
  solid box, not a soft shadow. Round things (the bindu, the sun, the seal) are SVG; the one
  rounded frame is the phone around the specimen. Tracked capitals are retired; the one
  display headline per screen is set in tight capitals. Labels above headings stay retired.
  See `DESIGNSYSTEM.md`.
- The band, the label or a pack count on the Patra, and anything that sells inside the
  sitting. One press per screen.
- Fabricated statistics presented as fact.

### Known traps, each of which cost real debugging

- **Round computed SVG coordinates** (`.toFixed(2)`); raw floats hydrate differently.
- **The theme and currency scripts are real `<head>` children**; React refuses to hydrate a
  sync script directly under `<html>`.
- **`font-synthesis: none` on `.display`**; Eczar ships no italic, and a faked one is the tell.
- **Indic scripts need their own leading**; the type layer keys off `data-script`, not `lang`.
- **next/font options must be literal**; a spread fails the build.
- **`opengraph-image` is excluded from the proxy matcher**; the link cards live at
  `/opengraph-image/<lang>/...`, outside `/en/` (robots.txt disallows it), the old
  `/en/opengraph-image` is a rewrite, and scrapers do not follow redirects.
- **The band overhangs its column**; its section clips it (`overflow-x: clip`), or the page
  scrolls sideways at 390.
- **Marigold stays the same at night**; ink on it is `--on-marigold`, never `--ink`.
- **The image renderers have no stylesheet**; colours come from `src/lib/palette.ts`, and
  `tests/unit/palette.test.ts` fails when it drifts from `globals.css`.
- **Prices and the theme are stamped by a sync `<head>` script**; render a price with
  `<Price>`, never by reading the currency in a component.
- **The pay intent cookie is Secure only over https**, so the sign-in continuation on
  `/begin?go=1` cannot be tested on a plain-http local production build.
- **A hydration flake on production** (React error 418 on a share of loads, body identical
  between server and client) is open in `plan.md` with its measurements. Read that before
  touching the bundler or the head scripts.
- **`npm i <anything>` prunes `--no-save` installs.**

## The other files

| Path | What it holds |
| --- | --- |
| `ARCHITECTURE.md` | Stack, routing, data flow, deployment |
| `DESIGNSYSTEM.md` | Design system v3: the palette, type, the kit (press, seal, band, label, gauge, river), the logo, every surface, the eight motions, voice, mobile first, the campaign layer |
| `docs/superpowers/specs/2026-10-17-design-system-v3-design.md` | The v3 spec, with the owner's choices and the designer's calls |
| `docs/design/v3-mockups/` | The approved v3 mockups and the surface checks |
| `plan.md` | The work queue: what waits for the owner's eyes, what waits for a go, what is done |
| `docs/seo/search-console.md` | The Search Console runbook and the hreflang contract |
| `docs/panchang-check.md` | The occasion dates checked against Drik Panchang |
