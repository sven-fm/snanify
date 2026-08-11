# Google Search Console, and the international setup behind it

Everything Google needs from this site is generated, not hand-maintained. This
file is the runbook for the parts that happen in a browser rather than in the
repo, and the reasoning for the parts that happen in the repo.

---

## What the site already emits

| Thing | Where it comes from | Check it at |
| --- | --- | --- |
| `robots.txt` | `src/app/robots.ts` | `/robots.txt` |
| `sitemap.xml`, with per-URL hreflang | `src/app/sitemap.ts` | `/sitemap.xml` |
| `<link rel="alternate" hreflang>` on every page | `pageMetadata` in `src/lib/seo.ts` | view source |
| Self-referential canonical | same | view source |
| `<html lang>` and `dir` | `src/components/RootShell.tsx` | view source |
| JSON-LD, per locale | `src/components/StructuredData.tsx` | Rich Results Test |
| Open Graph locale and alternates | `pageMetadata` | any share preview |

All of it derives from one file, `src/lib/locales.ts`. Adding a language is a
row in `LOCALES` plus its translations; nothing in this document changes.

---

## 1. Create the property

Use a **Domain property** (`snanify.com`), not a URL-prefix one. A domain
property covers `http`, `https`, `www`, the apex and every subdomain in one
place, which matters here because the canonical host is `www.snanify.com` and
the apex must redirect into it.

Verification is a DNS TXT record at the registrar. That is the preferred method
and needs no code.

If you must use a URL-prefix property instead, HTML-tag verification is wired
up already: set `GOOGLE_SITE_VERIFICATION` in the Vercel project (Production
and Preview) to the token Google gives you, redeploy, and the meta tag appears.
Unset, the tag is simply absent, which is correct for a local build. See
`siteMetadata` in `src/lib/seo.ts`.

## 2. Submit the sitemap

Sitemaps → add `https://www.snanify.com/sitemap.xml`.

One sitemap covers every locale. Each `<url>` carries the full `xhtml:link`
alternates set for its route, which is the same set the page itself emits in
`<head>`. Google treats a disagreement between the two as a reason to trust
neither, so they are generated from one function, `localesForPath`, and cannot
drift.

Expect roughly 74 URLs today: 12 landing pages, 12 routes that exist in English
and Hindi only, 6 waters and 13 occasions in two locales each.

## 3. Do NOT set international targeting

Legacy "International Targeting" is retired, and country targeting would be
actively wrong here. This product is for **Indians everywhere**, so the
hreflang tags are bare language codes (`ta`, `bn`, `gu`) and never
language-region pairs (`ta-IN`). A `ta-IN` tag would tell Google the Tamil
edition is for readers in India, and exclude the Tamil reader in Singapore,
Toronto or Colombo who is a large part of the point.

The one exception is Open Graph's `locale`, which does want a region
(`ta_IN`). That field is Facebook's, not Google's, and it does not affect
search.

## 4. Watch these reports, in this order

1. **Pages** → confirm the count indexed climbs toward the sitemap count.
   "Alternate page with proper canonical" against `/en/*` URLs is expected and
   healthy: `src/proxy.ts` 308s them and `robots.ts` disallows the prefix.
2. **Sitemaps** → "Discovered URLs" should match the sitemap's own count.
3. **Enhancements / Unparsable structured data** → should stay empty.
4. **Core Web Vitals** → the river SVG is the only animated thing on the page;
   it pauses off-screen and in background tabs and paints a single static frame
   under `prefers-reduced-motion`.

hreflang problems no longer surface in Search Console at all. Validate them
externally, or by reading two pages' `<head>` and confirming they point at each
other.

---

## The hreflang contract, and why it is generated

Google discards an entire hreflang cluster, not just the offending row, when
any of these is violated. `src/lib/seo.ts` enforces all four structurally.

1. **Self-referential.** Every page lists itself. `hreflangMap` iterates every
   locale serving the route, current one included.
2. **Reciprocal.** If `/ta/rivers` points at `/rivers`, `/rivers` must point
   back. Every page in a set is built from the same `localesForPath(path)`, so
   the sets are identical by construction.
3. **No dead alternates.** A locale is only listed for routes it serves.
   `/panchang` offers `en`, `hi` and `x-default`; `/` offers twelve and an
   `x-default`. That asymmetry is the whole point of the route manifest.
4. **Absolute URLs.** hreflang is ignored when relative. Everything comes out
   of `localeUrl`.

`x-default` points at the English edition: the fallback for a reader whose
language is not in the set, and the only edition in which the whole site
exists.

### The two tiers

`FULL_ONLY` in `src/lib/locales.ts` is the single list that decides which
routes are English-and-Hindi-only. Moving a route out of that list is the only
change needed to publish it in all twelve languages, and the sitemap, the
hreflang sets, the header nav, the footer and the language switch all follow
automatically.

Currently full-depth-only: `/snan`, `/panchang`, `/ethics`, `/how-it-works`,
`/faq`, `/patra`, `/verify`, `/kumbh`, `/live`, `/rivers`, `/muhurat`, and the
`/rivers/*` and `/muhurat/*` detail pages.

Twelve locales: the landing page.

---

## Before launch

- [ ] Replace the placeholder hero figures (`1,20,000+`, `48 countries`) and
      the placeholder gauge reading in the badge. See the note in
      `src/content/landing/en.ts`; they are the owner's decision to keep for
      now, but they must be real before this is submitted for indexing.
- [ ] Export a raster logo to `/logo-512.png`. Google's logo rich result
      ignores SVG, which is what `organization()` currently points at.
- [ ] Confirm `www.snanify.com` is the canonical host and the apex 301s to it.
- [ ] Name a panchang source, or keep the "provisional" labels. `/ethics`
      publicly commits to the stricter rule.
