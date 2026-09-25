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
neither, so they are generated from one function, `hreflangMap`, and cannot
drift.

### The index is a short list, on purpose

`src/lib/indexable.ts` decides which pages ask to be indexed, and the sitemap,
every page's robots tag and hreflang, and the IndexNow script all read it:

| Page | Indexed |
| --- | --- |
| The core pages, the six waters, `/panchang/shraddha` | always |
| `/muhurat/{purnima,amavasya,ekadashi,sankranti}` | always |
| A dated occasion (`/muhurat/kartik-purnima-2026`) | while it falls within the next 180 days |
| A city (`/panchang/edison`) | when its slug is in `INDEXABLE_CITIES` (thirty today) |
| `/privacy`, `/terms` | never |

Everything else stays live, returns 200 and is linked as before, with
`noindex, follow`, no hreflang set and no sitemap entry. Both locales follow
the same rule. In September 2026 Bing had indexed 1 of 770 URLs and flagged
the templated city pages as a quality problem, which held back the whole
domain; the index grows again in batches of about twenty cities, each with its
own content first, once most of the current list is indexed.

`npm run seo:check` reads production and fails on any sitemap URL that is not
200, carries `noindex`, has a foreign canonical or an hreflang target outside
the sitemap, on a sampled non-indexed page without `noindex`, and on an apex
redirect that is not one hop.

### There is no `lastmod`, on purpose

Search Console will not complain about its absence, and you should not add one
to make a report look tidier. The reasoning is written out at the top of
`src/app/sitemap.ts`; the short version is that Google uses `lastmod` only while
it stays verifiably accurate and discounts it once it does not, and none of the
three implementations open to this repo stays accurate:

| Approach | Fails because |
| --- | --- |
| Build time on every entry | claims every URL changed on every deploy |
| `git log -1` per route | Vercel clones shallow, so it returns empty in CI |
| Committed manifest | correct the day it is generated, wrong from the next content commit, and looks maintained |

`changefreq` and `priority` already carry which routes move.

If you ever see a recrawl-latency problem that you can actually attribute to
this, the fix is a build step with full git history, not a stamped date.

### IndexNow, for the engines that are not Google

Bing, Yandex, Naver, Seznam and Yep take a push instead of waiting for a crawl.
The key is verified by the file at `public/8b6cc2fb2f124d6a8955bba929f94f10.txt`,
which `src/proxy.ts` serves as a static file. Submit a page when what it says
changed, by hand, after the deploy that changed it:

```bash
npm run indexnow -- --since <ref> --dry-run   # the pages the diff since <ref> touched
npm run indexnow -- --since <ref>             # submit them
npm run indexnow -- /live /kumbh              # these routes, both locales
```

Only URLs in the live sitemap go out, at most 100 a run, in one POST. Nothing
submits on a schedule or on every deploy: until 25 September 2026 a workflow
posted the whole sitemap on each deploy, about seven times per URL on a busy
day, and Bing reads a repeated unchanged URL as noise. A city page's new
sunrise is the page working, not a change to submit.

Google does not read IndexNow; the sitemap above is still its route in.

### Titles stay within sixty characters

Bing's site scan flags a title over 70 characters. Google sets no count but
cuts the result line at about 600 pixels, roughly 55 to 60 Latin characters,
and rewrites titles it finds long or padded. `TITLE_MAX` in `src/lib/seo.ts`
is 60, which satisfies both. The two templates that take a name, the city
panchang and the occasion pages, are written in more than one length and
`fitTitle` takes the fullest that fits. `tests/unit/titles.test.ts` checks
every city and occasion in both editions.

### Second names

An occasion searched by another name (Yam Dwitiya is Bhai Dooj, Kaveri
Sankramana is Tula Sankramana) carries it as `aka` in
`src/content/data/muhurat.json`. It goes in the title in brackets, the
description, a line under the heading and the Event's `alternateName`. Every
Hindi title carries a Latin name, because the Hindi edition is searched in
Latin script. Add an `aka` only where the second name is in common use for
the same day; Search Console's Queries report is where the need shows up.

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
2. **Reciprocal.** If `/hi/rivers` points at `/rivers`, `/rivers` must point
   back. Every page in a set is built from the same `hreflangMap(path)`, so
   the sets are identical by construction.
3. **No dead alternates.** Every route exists in both locales, so every set is
   `en`, `hi` and `x-default`.
4. **Absolute URLs.** hreflang is ignored when relative. Everything comes out
   of `localeUrl`.

`x-default` points at the English edition: the fallback for a reader whose
language is not in the set, and the only edition in which the whole site
exists.


---

## Before launch

- [ ] Replace the placeholder hero figures (`1,20,000+`, `48 countries`) and
      the placeholder gauge reading in the badge. See the note in
      `src/content/landing/en.ts`; they are the owner's decision to keep for
      now, but they must be real before this is submitted for indexing.
- [ ] Export a raster logo to `/logo-512.png`. Google's logo rich result
      ignores SVG, which is what `organization()` currently points at.
- [ ] Confirm `www.snanify.com` is the canonical host and the apex 301s to it.
- [ ] Name a panchang source, or keep the "provisional" labels. `/faq#how`
      publicly commits to the stricter rule.
