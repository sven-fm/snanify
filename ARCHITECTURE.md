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
    [lang]/              one route tree, both locales
      page.tsx           /            and /hi
      live/              /live        the six waters right now, free
      snan/              /snan        the product page
      rivers/[river]/    six waters
      muhurat/[occasion] the calendar
      panchang/          the free timing tool
      kumbh/             Nashik Simhastha 2027
      patra/             the artefact, plus /patra/sample
      ethics/ faq/ how-it-works/ verify/ rituals/
      layout.tsx         root layout, per-locale metadata
      not-found.tsx
    sitemap.ts           every route x both locales, reciprocal hreflang
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
  content/               typed bilingual content, one module per domain
  lib/
    i18n.ts              localePath, otherLangPath
    nav.ts               single source of truth for navigation
    content.ts           shared copy and the Lang type
    sky.ts               moon, tithi, nakshatra
    riverdata.ts         gauge stations, readings, cache, fallback
docs/                    design and research, see CLAUDE.md
```

## The bilingual URL scheme

English is unprefixed, Hindi lives under `/hi`, and the route tree is authored **once**.

```
/rivers      -> rewrite  /en/rivers    the URL bar still reads /rivers
/hi/rivers   -> pass through, matches [lang]=hi
/en/rivers   -> 308 redirect to /rivers
```

`src/proxy.ts` does this. Slugs are identical in both locales and Latin-script, because
Devanagari URLs percent-encode into unreadable strings when pasted into WhatsApp, which is
the primary diaspora sharing channel.

This replaced an earlier design that used two route groups, `(en)` and `(hi)`, each with its
own root layout. That worked for two pages and would have meant sixty drifting page files at
thirty routes. The refactor happened at two routes deliberately, because doing it later costs
roughly five times as much.

### Adding a page

1. Add its copy to `src/content/<domain>.ts`, both locales, `satisfies Record<Lang, ...>`.
2. Create `src/app/[lang]/<route>/page.tsx` as a thin wrapper around one component that takes
   `lang`, exporting `generateMetadata` with a public-shape canonical.
3. Add the route to `src/app/sitemap.ts`.
4. If it belongs in the nav, add it to `src/lib/nav.ts`. Never hand-write nav links in a page.

## Content model

All user-facing copy is data, not JSX. Each domain owns a module in `src/content/`:

```ts
export const riversIndexContent = { en, hi } satisfies Record<Lang, typeof en>;
```

Typing the Hindi object against `typeof en` means adding an English key without its Hindi
counterpart is a **compile error**. This is the single most useful invariant in the codebase.

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

River gauge readings come from the Central Water Commission. That path needs a cache, a
staleness policy and an honest degradation chain:

1. A fresh reading, shown with its timestamp and source agency.
2. A stale reading, **labelled stale** with its age.
3. No reading, and the UI says the feed is not connected.

The rule that matters: **never synthesise a gauge number.** The artefact's unforgeability
rests on that number being checkable against a government record, so a fabricated placeholder
presented as live would quietly destroy the only genuinely defensible asset in the product.

Every raw agency response is stored with its fetch time and a hash, because agency endpoints
rotate and expire while the artefact has to outlive them.

## Rendering

Every route is statically generated for both locales via `generateStaticParams` returning the
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

Theme is set before first paint by an inline script in `RootShell`, so there is no flash.

## SEO

`StructuredData.tsx` emits JSON-LD under one rule: **nothing is asserted to a crawler that is
not asserted on the page.** No prices, no officiants, no ratings, no coordinates, and no
`SearchAction`, because there is no site search and declaring one against a URL that does not
exist is a lie that gets caught. Provisional dates ship as reduced-precision ISO (`2026-09`)
rather than invented precision.

`sitemap.ts` emits both locales of every route with reciprocal `hreflang`.

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
