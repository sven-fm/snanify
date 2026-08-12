# Snanify

A purely digital snan. At an hour the panchang names, you sit with the live measured state
of a sacred river in India and make your sankalp yourself, wherever in the world you are.

**Live:** https://www.snanify.com · **Repo:** https://github.com/sven-fm/snanify

This file is the short orientation. The rules that govern the work are in
[`CLAUDE.md`](CLAUDE.md); the system is in [`ARCHITECTURE.md`](ARCHITECTURE.md) and
[`DESIGNSYSTEM.md`](DESIGNSYSTEM.md).

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint       # must be 0 errors
npx tsc --noEmit   # must be clean
```

## The two rules

1. **Never claim a physical rite happened.** No priest performs anything, nothing is
   witnessed or offered by a person.
2. **Never make a promise that is not true.** No guaranteed outcomes, nothing about anyone's
   karma or soul.

Beyond those, the copy sells the thing. It is never apologetic and never argues against the
product in its own voice, which in practice means **no sentence built on "no", "nobody" or
"there is no"** in selling copy. Honest disclosure has one home, `/ethics`.

## Twelve locales, two tiers

English is unprefixed, every other locale sits under its ISO 639-1 code (`/ta/rivers`). One
route tree under `src/app/[lang]/`; `src/proxy.ts` keeps the public URLs.

| Tier | Locales | Routes |
| --- | --- | --- |
| Everything | `en`, `hi` | all of them |
| Landing and the free daily surface | plus `bn mr te ta gu kn ml or pa as` | `/`, `/rivers`, `/live`, `/muhurat` |

`src/lib/locales.ts` is the registry and the only file that knows the locale set. Adding a
language is a row there plus its translations. `FULL_ONLY` in the same file decides which
routes are English and Hindi only, and the sitemap, the hreflang sets, the nav, the footer
and the language switch all follow from it.

Copy is typed per locale, so a missing translation is a **compile error** rather than a
silent English fallback. Build every href with `localePath(lang, path)`.

## One price

There is one price, in the reader's own currency: rupees in India, Canadian dollars in
Canada, euro in the eurozone, US dollars everywhere else. Eleven mornings cost eleven, one
for each morning, in every currency.

Prices live in `src/content/prices.ts`, never in a locale file. `src/proxy.ts` reads Vercel's
geo header and writes a cookie, a sync `<head>` script stamps `data-cur` on `<html>`, and CSS
shows one price and hides the rest, so pages carrying prices stay fully prerendered with no
flash of the wrong number.

## Routes

Free forever, and the whole SEO and daily-return surface: `/live`, `/panchang`, `/muhurat`,
`/rivers`. `/snan` is the product page. `/sitemap.xml` and `/robots.txt` are generated.
`docs/seo/search-console.md` is the Search Console runbook.

## Deployment

Vercel project `snanify`, connected to the GitHub repo; pushes to `main` deploy
automatically. Set `GOOGLE_SITE_VERIFICATION` in the project if you verify by HTML tag.

## Not real yet

- The hero figures (`1,20,000+`, `48`) and the live badge reading are **placeholder
  marketing figures**, kept at the owner's explicit direction. Replace them with real values
  before launch.
- Muhurat timings ship labelled provisional until a panchang source is named.
- There is no database, no auth, no payments and no booking flow.
