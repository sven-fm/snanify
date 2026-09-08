# Architecture

How Snanify is put together, and why each choice was made.

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16, App Router | Static generation for every marketing surface, server components for the data pages |
| Language | TypeScript, strict | Copy is typed per locale, so a missing translation fails the build |
| Styling | Tailwind CSS v4 | Tokens declared once in CSS custom properties and mapped in with `@theme inline` |
| Bundler | Turbopack | Next 16 default |
| Fonts | `next/font/google` | Eczar and Martel Sans, self-hosted at build, no runtime font request |
| Astronomy | `astronomy-engine` | Offline, deterministic moon position. No API, no key, no vendor |
| Analytics | `@vercel/analytics` | Cookieless. Named explicitly on `/ethics`, because the page makes a promise about scripts |
| Hosting | Vercel | Git-push deploys; `main` is production |

There is **no database, no auth and no payments yet.** Every route is statically generated.
The live river data layer (`src/lib/riverdata.ts`) is the first thing that will need a cache
and a scheduled fetch.

## Repository shape

```
src/
  app/
    [lang]/              one route tree, two locales
      (app)/             everything behind a sign-in, and the only subtree that
                         loads Clerk in the browser. A route group, so no URL
                         changes: /begin is still /begin
      page.tsx           /            and /hi, /ta, /bn, ...
      live/              /live        the six waters right now, free
      snan/              /snan        the product page, five parts and the tariff
      rivers/[river]/    six waters
      muhurat/[occasion] the calendar
      panchang/          the free timing tool
      kumbh/             Nashik Simhastha 2027
      ethics/ faq/
      layout.tsx         root layout, per-locale metadata
      not-found.tsx
    sitemap.ts           every route x the locales that serve it, reciprocal hreflang
    globals.css          the entire design system
  proxy.ts               URL scheme (Next 16 renamed middleware.ts to proxy.ts)
  components/
    Landing.tsx          reference implementation of the design language
    RiverFlow.tsx        the engraved river in perspective
    SankalpPatra.tsx     the artefact sheet
    StructuredData.tsx   JSON-LD
    Logo.tsx  Reveal.tsx  RootShell.tsx  ThemeToggle.tsx  NotFoundPage.tsx
    site/                Header, Footer
    ui/                  shared primitives
    pages/               one component per route
  content/               typed per-locale content, one directory or module per domain
                         prices.ts, names.ts and months.ts are locale-independent
  lib/
    locales.ts           the locale registry, the tier split, hreflang and route manifest
    sitting-plan.ts      the five parts and their lengths, read by copy and by the machine
    i18n.ts              short re-exports of the URL helpers
    seo.ts               pageMetadata: canonical, hreflang cluster, OG locales
    currency.ts          one price, picked from Vercel geo, stamped before first paint
    nav.ts               single source of truth for navigation
    content.ts           shared copy and the Lang type
    sky.ts               moon, tithi, nakshatra
    riverdata.ts         gauge stations, readings, cache, fallback
docs/                    design and research, see CLAUDE.md
```

## The URL scheme

English is unprefixed, every other locale lives under its ISO 639-1 code, and the route tree
is authored **once**.

```
/rivers      -> rewrite  /en/rivers    the URL bar still reads /rivers
/hi/rivers   -> pass through, matches [lang]=hi
/en/rivers   -> 308 redirect to /rivers
```

`src/proxy.ts` does this, deriving the prefix set from `src/lib/locales.ts`, and stamps the
currency cookie on the way through. It also 308s the ten retired locale prefixes and the
four folded routes (`/how-it-works`, `/patra`, `/patra/sample`, `/verify`), so no indexed URL
lands on a 404. Slugs are identical in every locale and Latin-script,
because
Devanagari URLs percent-encode into unreadable strings when pasted into WhatsApp, which is
the primary diaspora sharing channel.

This replaced an earlier design that used two route groups, `(en)` and `(hi)`, each with its
own root layout. That worked for two pages and would have meant sixty drifting page files at
thirty routes. The refactor happened at two routes deliberately, because doing it later costs
roughly five times as much.

### Adding a page

1. Decide its tier. A surface-tier page is `satisfies Record<Lang, ...>`; a
   full-depth page is `Record<FullLang, ...>` and its route goes in `FULL_ONLY`.
2. Add its copy, one file per locale under `src/content/<domain>/`, English defining the shape.
3. Create `src/app/[lang]/<route>/page.tsx` as a thin wrapper around one component that takes
   `lang`, calling `pageMetadata()` from `@/lib/seo` and `allLangParams()` or
   `fullLangParams()`. Never hand-roll `alternates.languages`.
4. Add the route to `src/app/sitemap.ts`.
5. If it belongs in the nav, add it to `src/lib/nav.ts` and filter with `servesPath`. Never
   hand-write nav links in a page.

## Content model

All user-facing copy is data, not JSX. Each domain owns a module in `src/content/`:

```ts
export const riversIndexContent = { en, hi, bn, ... } satisfies Record<Lang, RiversIndexCopy>;
```

Typing every locale against `typeof en` means adding an English key without its eleven
counterparts is a **compile error**. This is the single most useful invariant in the codebase.
`pickDeep` is the only fallback anywhere, it is confined to proper nouns, and prose can never
reach it.

**Prices are not content.** They live in `src/content/prices.ts` in four currencies, because a
price is not a translation. Proper nouns (rivers, ghats, cities,
occasions, muhurat windows) live in `src/content/names.ts`, and month names in
`src/content/months.ts`, which is a separate module only to avoid a require cycle with
`muhurat.ts`.

Entity data (`rivers.ts`, `muhurat.ts`, `nakshatra.ts`) is separate from page copy, because
the same six waters appear on the landing page, the index, six detail pages, the calendar and
the artefact. One source, many surfaces.

## Data flow

### Deterministic, no network

The sky is computed, not fetched. `astronomy-engine` gives the moon's apparent geocentric
ecliptic longitude; subtracting the Lahiri ayanamsa gives sidereal longitude; dividing by
360/27 gives the nakshatra and by 360/108 the pada. Verified: 24 Nov 2026, Kartik Purnima,
returns the moon in Krittika at 99.2% illumination, and Krittika is the Pleiades that the
month Kartik is named for.

Because it is deterministic it runs at build time or request time with no key, no rate limit
and no failure mode. Values near a nakshatra boundary are presented as near a boundary, since
ayanamsa choice shifts the edges slightly.

### Fetched, and therefore fallible

River discharge is modelled by the Copernicus GloFAS global flood model and read through
Open-Meteo, one value per grid cell per day. That path needs a cache, a staleness policy and
an honest degradation chain:

1. A fresh model day, shown with its date and source.
2. A stale model day, **labelled stale** with its age.
3. No model day, and the page falls to the 1997 to 2025 seasonal normals, labelled as such.

The rule that matters: **never synthesise a river number.** The artefact's unforgeability
rests on that number being checkable against a public record, so a fabricated placeholder
presented as live would quietly destroy the only genuinely defensible asset in the product.

Every raw agency response is stored with its fetch time and a hash, because agency endpoints
rotate and expire while the artefact has to outlive them.

## What loads where

Two rules decide it, and both were learned by measuring rather than by design.

**Clerk only wraps the `(app)` group.** `ClerkProvider` sat in the root shell,
so Clerk's client bundle loaded on the landing page, the six waters, the
calendar and the panchang: pages with no account on them, which are the free
crawlable surface and are supposed to be cheap to open. Server-side `auth()`
needs only `clerkMiddleware` in `src/proxy.ts`, so the provider is now scoped
to the routes with client-side Clerk widgets. The masthead's personalised
button is opt-in per page (`<Header personalised />`) for the same reason.

**Fonts are split by script and the Devanagari cuts are not preloaded.** Both
families were loaded at five weights covering Latin and Devanagari, ten faces,
and `next/font` preloads everything it declares: an English reader downloaded
about a hundred and ninety kilobytes of Devanagari they would never paint. The
design uses three weights, so three are loaded, and the Devanagari faces carry
`preload: false` and are attached to `<html>` only where they are read. An
English page went from 285kB of fonts to 122kB.

Anything imported by a client component is in the browser bundle, including
whatever that module imports in turn. Two hydration failures came from exactly
that: a validator that pulls the muhurat dataset, and the analytics library at
module scope. Both are documented where they happened.

## Rendering

Every route is statically generated for the locales it serves via `generateStaticParams` returning the
`(lang, slug)` product. `dynamicParams = false`, so an unknown locale 404s rather than
rendering an empty shell.

Two components are client components, for good reasons:

- `RiverFlow.tsx` runs an animation loop. Geometry is recomputed each frame and written
  straight to each path's `d` attribute through a group ref, bypassing React reconciliation,
  so roughly eighty paths animate with zero re-renders. It pauses via `IntersectionObserver`
  when off screen and on `visibilitychange` in a background tab, and paints one static frame
  under `prefers-reduced-motion`.
- `Reveal.tsx` and `ThemeToggle.tsx` need browser APIs. `ThemeToggle` holds no state at all;
  the glyph is chosen by CSS from the `.dark` class, so there is nothing to hydrate.

Theme **and currency** are both set before first paint by inline scripts in `RootShell`, so
there is no flash of either. Every currency is in the markup and CSS shows one, keyed off
`data-cur`; that is what lets pages carrying prices stay static. See `src/lib/currency.ts`.

## SEO

`StructuredData.tsx` emits JSON-LD under one rule: **nothing is asserted to a crawler that is
not asserted on the page.** No prices, no officiants, no ratings, no coordinates, and no
`SearchAction`, because there is no site search and declaring one against a URL that does not
exist is a lie that gets caught. Provisional dates ship as reduced-precision ISO (`2026-09`)
rather than invented precision.

`sitemap.ts` emits every locale that serves a route, with a reciprocal `hreflang` set built
from the same `localesForPath` the pages use, so the two can never disagree. Google's rules
and the Search Console runbook are in `docs/seo/search-console.md`.

## Deployment

Vercel, connected to GitHub. Push to `main` deploys production; any other branch gets a
preview URL. `www.snanify.com` and the apex both resolve; DNS stays at Porkbun with an A
record to Vercel.

Vercel is on the Hobby plan, so **the repository is the interface**. There is no team
dashboard to share, which is why branch discipline matters more than usual.

### Branches

Work happens on a feature branch, merges to `main`, and every stage stays rewindable:

| Branch | What it holds |
| --- | --- |
| `feat/digital-only` | The purely digital pivot |
| `feat/product-v2` | Repricing, Kumbh, panchang, structured data |
| `feat/full-product` | The letterpress redesign and the content routes |

## What does not exist yet

No database, no auth, no payments, no scheduled jobs, no email. The first three arrive
together when the snan becomes purchasable: a payments provider, a record of what someone
bought, and a way to send them their Jal Chihna. Until then every route is static and the
whole site costs nothing to run.
