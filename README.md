# Snanify

A fully digital snan service — your name, your gotra, your sankalp, offered at
India's most sacred waters.

**Live:** https://www.snanify.com

| Branch | What it is |
| --- | --- |
| `main` | The landing page. Deploys to production on push. |
| `feat/full-product` | The full site — rivers, rituals, muhurat, ethics, patra. Preview per push. |

## Working on it

Vercel is on Hobby, so **the repo is the interface** — there is no team, no
shared dashboard. Push and Vercel builds it.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

- Push to `main` → production at www.snanify.com
- Push any other branch → its own preview URL
- Open a PR → preview URL posted on the PR

## Routes

`/` English · `/hi` Hindi · `/sitemap.xml` · `/robots.txt`

## How the bilingual setup works

Next.js allows **multiple root layouts** via route groups, which is what gives
each locale a real `<html lang>` with no client-side switching:

```
src/app/
  (en)/layout.tsx   -> <html lang="en">  -> /
  (hi)/layout.tsx   -> <html lang="hi">  -> /hi
```

Both render `<Landing lang={...} />`. Copy lives in `src/lib/content.ts` keyed
by locale, so a missing translation is a **type error**, not a silent English
fallback.

> `feat/full-product` replaces this with a single `src/app/[lang]` tree behind
> `src/proxy.ts`. Public URLs are identical. Do that before adding pages here —
> authoring the tree twice means 60 drifting files at 30 routes.

## Design system

Tokens are CSS custom properties in `src/app/globals.css`, flipped by a `.dark`
class and mapped into Tailwind v4 via `@theme inline`.

**Palette** — night-ghat indigo, marigold brass, river teal, sindoor.
Deliberately not flat saffron. `--gold` is the text-safe gold and darkens in
light mode; `--sun` is the decorative disc and stays bright in both themes.

**Type** — **Marcellus** (inscriptional) + **Karla** for Latin; **Tiro
Devanagari Hindi** + **Mukta** for Devanagari, swapped via `html[lang="hi"]`.
`.inscription` drops its uppercase transform under `lang="hi"` because
Devanagari has no case; `.wordmark` deliberately does not, so the logo stays
Latin caps everywhere.

**Theme** — set before first paint by an inline script in `RootShell`, so no
flash. The toggle is stateless; CSS picks the icon from `.dark`.

### Two traps

- **Round computed SVG coordinates.** Raw floats serialise differently on
  server and client (`56.69872981077808` vs `56.698729810778076`) and React
  reports a hydration mismatch. Anything trigonometric uses `.toFixed(3)`.
- **The theme script must be a real `<head>` child.** React refuses to hydrate
  a sync `<script>` directly under `<html>`. The `no-head-element` lint rule
  arguing otherwise is Pages-Router-only and is disabled at that line.

## The logo

The **Bindu Ripple** (`src/components/Logo.tsx`) — a bindu above three widening
ripples in a struck-coin seal. Dawn over a ghat, or the instant a body enters
water. `<Mark />`, `<Logo />`, `<SealAnimated />`. `public/icon.svg` is a
standalone copy for the favicon.

## Analytics

Vercel Web Analytics via `@vercel/analytics`, mounted in `RootShell`. Cookieless.
The script is served from an obfuscated path, not `/_vercel/insights` — don't
grep for that when checking it loads.

## Placeholder content

The landing page is a marketing surface. The hero statistics (`1,20,000+`,
`48 countries`), the "Live now" badge and the `04:24 IST` muhurat card are
**placeholder marketing figures**. Replace before launch.

`feat/full-product` holds itself to a stricter rule, because `/ethics` there
publicly commits to it: no invented panchang timings, no named priests, no
claimed permits. Keep that line where it is.

There is no database, no auth, no payments and no booking flow.
