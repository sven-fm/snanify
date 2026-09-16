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

Beyond those two, **sell the thing**. This is a legitimate digital product, nobody is forced
to buy it, and the copy is not apologetic, hedging or padded with disclaimers nobody asked
for. Never argue against the product in its own voice.

That has a mechanic, and it is a hard rule on the landing page and on `/snan`:

> **No negative constructions.** If a sentence is built on "no", "nobody", "nothing" or
> "there is no", rewrite it until it is built on a noun and a verb.

"Nobody stands in the water for you" becomes "the practice is yours". "There is no quick
mode" becomes "the form is the form". The page was once built almost entirely out of denials
and read as an argument with a critic who was not in the room; that was a violation of this
rule, and re-adding one is too. Keep sentences short: this is read at six in the morning, on
a phone, by many readers whose English is a third language.

**Not claiming is not the same as denying.** The two rules above forbid the claim, not the
silence. The commitment stated at length and in the negative belongs on `/ethics`, which
every page links, and nowhere else.

The rules are also the moat. "We never pretended a priest did anything" is what makes the
category defensible when somebody attacks it, and it costs nothing, because the product does
not need the lie.

## What is actually true, and therefore load-bearing

- **The river is real and public.** The flow at each of the six waters is modelled
  discharge from the Copernicus GloFAS global flood model, read through Open-Meteo, one
  value per day, CC BY 4.0. It is a model at a calibrated grid cell, not an instrument at
  the ghat. India's Central Water Commission portal is the register of stations and
  nothing more: four of the six waters have no published level there. The number on the
  page is a published figure anyone can fetch and check, and that is the whole point.
  See `src/lib/riverdata.ts`. **Where that is said**, by the owner's direction of
  16 September 2026: on `/rivers`, `/live`, `/faq` and `/ethics`, and in the structured
  data. The product surfaces (the landing card, the sitting, the sheet and its image,
  the Patra page, `/snan`, the emails) show the figure plainly, with no source line, no
  "modelled for" date and no publisher's name; `tests/unit/copy-guard.test.ts` fails the
  build if one comes back. The figure is still never called "measured".
- **The panchang is real.** Tithi, nakshatra and muhurat are computed, not invented.
- **The sky is real.** The moon's position is computed offline and deterministically with
  `astronomy-engine`. No API, no key. See `src/lib/sky.ts` and `src/content/nakshatra.ts`.
- **The sankalp is real.** The user genuinely states an intention. That is a real practice.
- **The six waters are real places** with real traditions. See `src/content/rivers.ts`.

On the pages that name sources, a number that is not sourced is labelled as unsourced.
Never fabricate a river figure, a panchang timing or a statistic and present it as fact.
The artefact's whole value rests on its numbers being checkable against a public record,
and the checking lives on `/rivers` and `/faq`, not beside the number.

## The product

**The snan**, a three minute form, identical every day. Only the river changes.
Durations live in `src/lib/sitting-plan.ts` and nowhere else; copy reads them from there.

| Part | Length | What happens |
| --- | --- | --- |
| The reading | 15s | The river's flow today, its rank against 29 years, and how far you are from that water |
| The breath | 45s | The waterline rises and falls at the river's own amplitude |
| The sankalp | 11s | Your own words, held under your thumb while the ink fills |
| The stillness | 60s | The screen goes fully black, and it cannot be skipped |
| The mark | 20s | One line writes itself into your register |

The artefact is the **Sankalp Patra**: it carries the sitter's portrait, up to five
household names, one chosen prayer, and a generative engraving seeded by the river's
published modelled flow for that day, so no two days are alike and none can be forged
without forging the public record. (Older code and docs call it the Jal Chihna or the
Watermark; `build-plan.md` retires those names.)

**Pricing is paid-only, and there is exactly one price**, shown in the reader's own currency:
rupees in India, Canadian dollars in Canada, euro in the eurozone, US dollars everywhere
else. The site used to print a world ladder and an India ladder side by side with an essay
explaining why; that is gone.

| | one | eleven, the hero SKU | sixty |
| --- | --- | --- | --- |
| USD | $2 | **$11** | $48 |
| EUR | €2 | **€11** | €45 |
| CAD | C$3 | **C$11** | C$48 |
| INR | ₹101 | **₹501** | ₹2,100 |

**Eleven mornings cost eleven, one for each morning, in every currency.** That is the hook,
and it is the reason eleven exists at all: one charge of a single unit loses about 34% to
card fees, eleven loses 6%.

Prices live in `src/content/prices.ts`, never in a locale file, because a price is not a
translation: a Tamil reader in Toronto pays Canadian dollars and a Tamil reader in Chennai
pays rupees. `src/lib/currency.ts` picks the currency. Change a price and change `PER_SNAN`
in the same commit; nothing recomputes it.

Free forever: `/live`, `/panchang`, `/muhurat`, `/rivers`. That is the SEO and daily-return
surface, not a product tier.

**The routes**, after the cut: `/`, `/snan`, `/rivers`, `/rivers/[river]`, `/live`,
`/muhurat`, `/muhurat/[occasion]`, `/panchang`, `/kumbh`, `/faq`, `/ethics`.
`/how-it-works`, `/patra`, `/patra/sample` and `/verify` were folded into `/snan` and `/faq`
and are 308ed in `src/proxy.ts`. The product routes (`/begin`, `/setup`, `/today`, `/p/[id]`,
`/account`) arrive in phases 3 to 7 of `build-plan.md`.

## Working in this repo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # must be 0 errors
npx tsc --noEmit # must be clean
```

### Two locales, two tiers

`src/lib/locales.ts` is the registry and the only file that knows the locale set. Everything
else (routing, the proxy, hreflang, the sitemap, fonts, the language switch, JSON-LD) derives
from it. **Adding a language is a row in `LOCALES` plus its translations, and nothing else.**

| Type | Locales | What exists in them |
| --- | --- | --- |
| `FullLang` | `en`, `hi` | Every page on the site |
| `Lang` | the same two, today | Kept as a separate type: the surface tier is how a third locale returns |

Launch is English and Hindi. Ten surface locales (`bn mr te ta gu kn ml or pa as`) were
retired from the registry; their forty copy files are **parked in place**, unimported and
without their `satisfies` clause, each carrying a PARKED header saying how to bring it back.
`src/proxy.ts` 308s their URL prefixes to English. Reviving one is a row in `LOCALES`, the
`satisfies` clause restored, and whatever the compiler then reports.

The tiers are enforced by the type system, not by discipline. Deep content (`rivers.ts`,
`muhurat.ts`, `panchang.ts`, `trust.ts`, `kumbh.ts`, `patra.ts`, `sky.ts`, `snan.ts`,
`verify.ts`, `nakshatra.ts`, `live.ts`) is `Record<FullLang, ...>`; those files import
`FullLang as Lang` under a comment saying so, so their bodies read unchanged and every call
site from a surface-tier page fails to compile until it narrows.

Copy that must exist everywhere is `Record<Lang, ...>`, so a missing translation is a
**compile error**, never a silent English fallback:

```ts
export const bn = { ... } satisfies LandingCopy;   // src/content/landing/bn.ts
```

**`pickDeep` is the only fallback in the codebase.** It is confined to proper nouns (river
names, ghat names, occasion names) on surface-tier pages, it is named and typed, and it is
paired with `deepHref`/`deepLang` so the markup admits which language the string is in. Prose
never falls back.

Every locale must be real, idiomatic, respectful-register (आप / আপনি / நீங்கள் / మీరు / ਤੁਸੀਂ …)
copy. Never a literal translation of English marketing idiom.

### Routing

One tree under `src/app/[lang]/`. `src/proxy.ts` keeps the public URLs: English unprefixed,
every other locale under its ISO 639-1 code (`/ta/rivers`), `/en/*` 308s to `/*`. Build every
href with `localePath(lang, path)`; hand-writing `/hi/...` is how a route rename strands a
locale. Every page:

```tsx
export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return <Something lang={lang} />;
}
```

- **Metadata**: call `pageMetadata({ lang, path, title, description })` from `@/lib/seo`. It
  produces the canonical, the whole hreflang cluster and the OG locales from the registry.
  Never hand-roll `alternates.languages` again; that is how `x-default` went missing on nine
  pages.
- **Static params**: `allLangParams()` for a surface-tier route, `fullLangParams()` for a
  full-depth-only one. A page with neither inherits the layout's set and prerenders pages
  whose copy does not exist. The two return the same pair today and will not when a third
  locale lands, so keep calling the right one.
- **`FULL_ONLY`** in `locales.ts` is the single list deciding which routes are full-depth
  only. It matters again the day a third locale lands: the landing page, `/rivers`, `/live`
  and `/muhurat` sit outside it and are the surface set a new locale gets first.
- **Navigation must ask `servesPath(lang, path)`**, never `isFullOnlyPath` alone. The latter
  is true for `/snan` even in English, and filtering on it emptied the English nav once.

Google's hreflang rules and the Search Console runbook live in `docs/seo/search-console.md`.

### Mobile first, not mobile also

Over 90% of users arrive and use this on a phone, at 6am, in bed. Reason at **390 x 844
first** and let desktop be the adaptation. Nothing may scroll horizontally at 390px. Tap
targets at least 44px. Primary actions thumb-reachable near the bottom. Tables become stacked
ruled rows on small screens rather than horizontal scrollers. Keep the SVG cheap enough for a
mid-range Android.

### Never

- **Em dashes.** Not in copy, not in comments. Use a comma, a colon, a full stop or
  parentheses. They were all removed once; do not reintroduce them.
- **Apologetics.** Never explain what the product is not, never answer a critic who is not
  in the room, never apologise for it being digital. The FAQ's "hard questions" and the
  twelve-section manifesto were deleted for this reason. Facts about the data are
  craftsmanship, not disclaimers. If a sentence exists to defend the product, delete it.
- **Coined names.** The practice is "the snan". The artefact is the "Sankalp Patra". Jal
  Sankalp, Jal Chihna, Watermark, Jal Path, Shwas, Maun and Chihn are retired; do not
  reintroduce them into copy.
- Gradients, glows, blurs, rounded corners, soft shadows. See `DESIGNSYSTEM.md`.
- Fabricated statistics presented as fact, except the hero figures noted below.

### Known traps, each of which cost real debugging

- **Round computed SVG coordinates.** Raw floats serialise differently on server and client
  (`56.69872981077808` vs `56.698729810778076`) and React reports a hydration mismatch.
  Anything trigonometric uses `.toFixed(2)` or `.toFixed(3)`.
- **The theme script must be a real `<head>` child.** React refuses to hydrate a sync
  `<script>` placed directly under `<html>`. The `@next/next/no-head-element` lint rule that
  argues otherwise is Pages-Router-only and is disabled at that line in `RootShell.tsx`.
- **`font-synthesis: none` on `.display`.** Eczar ships no italic cut, and neither does any
  Noto Serif here, so browsers fake an oblique, which is exactly the generic-AI tell the
  design exists to avoid.
- **Indic scripts need their own leading.** `line-height: 1.06` collides matras. The type
  layer keys off `html:not([data-script="latin"])`, not `html[lang="hi"]`, because Hindi and
  Marathi share Devanagari and Bengali and Assamese share a script. Same selector drops
  synthetic italics and the uppercase/tracking on `.label`.
- **next/font options must be literal.** A shared constant, a spread or a helper fails the
  build with "Unexpected spread": next/font resolves the call with a static parser. All
  eighteen font calls in `src/lib/fonts.ts` are written out in full for this reason, and each
  family gets its **own** CSS variable, because two classes setting the same custom property
  on `<html>` resolve by stylesheet order.
- **`opengraph-image` must be excluded from the proxy matcher.** It lives at
  `[lang]/opengraph-image`, so Next writes the English one as `/en/opengraph-image`, which the
  `/en/*` redirect would 308 into a non-existent path and mangle the cache-busting query.
  Scrapers do not follow redirects for `og:image`, so the card comes out blank.
- **The hero waterline is anchored, not a fraction.** `RiverFlow` sets its viewBox from the
  element's own pixel box and puts the horizon under `[data-horizon-anchor]`. The old fixed
  `1200x700` viewBox with `preserveAspectRatio="slice"` put the horizon wherever the crop
  happened to land, which cut the headline in half on desktop and flattened the perspective to
  nothing in portrait.
- **Price and theme are both stamped by a sync `<head>` script.** Every currency ships in the
  markup and CSS shows one, keyed off `data-cur` on `<html>`. That is what keeps a page
  carrying prices fully prerendered with no flash of the wrong number. Render a price with
  `<Price prices={PRICE.eleven} />`, never by reading the currency in a component.
- **`npm i <anything>` prunes `--no-save` dev installs.** Playwright, used for screenshots and
  audits, has to be reinstalled after any dependency change.

## Placeholder content

The landing hero figures (`1,20,000+ sankalps`, `48 countries`) and the live badge are
**placeholder marketing figures kept at the owner's explicit direction**. Several analyses
recommended deleting them; that decision has been made and is not to be relitigated. Replace
them with real values before launch.

Everything behind the landing page is held to the stricter rule, because `/ethics` publicly
commits to it. Panchang timings ship labelled provisional until a source is named.

## The plan

**`build-plan.md` at the repo root is the master spec and plan**, and it supersedes
`docs/digital/` wherever the two disagree. It records the decisions taken on 7 September
2026 (Stripe only, the snan is paid, two locales, three minute sitting, one Patra per
morning, Clerk with Google and magic link) and the eight phases from here to a purchasable
product. Section 3.5 of it lists, by name, everything in `docs/` that is deliberately out of
scope. Check there before building anything the older docs describe.

## Where the thinking lives

| Path | What it holds |
| --- | --- |
| `docs/digital/` | The digital-snan design set: experience, artefact, river data, model, positioning, growth |
| `docs/seo/` | Search Console runbook, the hreflang contract, and the pre-launch checklist |
| `docs/product/` | Six web-researched market analyses, each adversarially reviewed |
| `docs/design/` | The earlier offering design set from the officiant-model era, superseded but useful |
| `ARCHITECTURE.md` | Stack, routing, data flow, deployment |
| `DESIGNSYSTEM.md` | Tokens, type, components, the rules |

`docs/design/` and parts of `docs/product/` describe the **cancelled** officiant model. They
are kept for reasoning history. Do not build from them without checking against the two rules.
