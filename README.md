# Snanify

A fully digital snan service — your name, your gotra, your sankalp, offered at India's
most sacred waters and streamed to wherever you stand.

**Live:** https://snanify.vercel.app · **Repo:** https://github.com/sven-fm/snanify

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Routes

| Route            | Locale  | Notes                                  |
| ---------------- | ------- | -------------------------------------- |
| `/`              | English | Landing page                           |
| `/hi`            | Hindi   | Landing page                           |
| `/sitemap.xml`   | —       | Generated, with reciprocal `hreflang`  |
| `/robots.txt`    | —       | Static                                 |

## How the bilingual setup works

Next.js allows **multiple root layouts** via route groups, and that is what gives each
locale a real `<html lang>` without any client-side switching:

```
src/app/
  (en)/layout.tsx     -> <html lang="en">, English metadata     -> /
  (en)/page.tsx
  (hi)/layout.tsx     -> <html lang="hi">, Hindi metadata       -> /hi
  (hi)/hi/page.tsx
```

Both render the same `<Landing lang={...} />`. All copy lives in `src/lib/content.ts`
as one object keyed by locale, so a missing translation is a **type error**, not a
silent English fallback.

Build hrefs with `localePath(lang, "/path")` from `src/lib/i18n.ts` — never hand-write
`/hi/...`, or renaming a route will strand one locale.

### Adding a page

1. Add its copy to both `en` and `hi` in `src/lib/content.ts`.
2. Create `src/app/(en)/<route>/page.tsx` and `src/app/(hi)/hi/<route>/page.tsx`, each a
   thin wrapper around one shared component that takes `lang`.
3. Add the route to `src/app/(en)/sitemap.ts`.

## Design system

Tokens live in `src/app/globals.css` as CSS custom properties, flipped by a `.dark`
class on `<html>` and mapped into Tailwind v4 via `@theme inline`.

**Palette** — night-ghat indigo, marigold brass, river teal, sindoor. Deliberately not
flat saffron. `--gold` is the *text-safe* gold and darkens in light mode for contrast;
`--sun` is the decorative disc colour and stays bright marigold in both themes.

**Type** — Latin display is **Marcellus** (inscriptional, carved-stone), body is
**Karla**. Devanagari has its own real pair: **Tiro Devanagari Hindi** for display and
**Mukta** for body, swapped in via `html[lang="hi"]`. The `.inscription` utility drops
its uppercase transform under `lang="hi"` because Devanagari has no case; `.wordmark`
deliberately does not, so the logo stays Latin caps in every locale.

**Theme** — set before first paint by an inline script in `RootShell`, so there is no
flash. The toggle is stateless: the icon is chosen by CSS from the `.dark` class, so
there is nothing to hydrate.

Shared primitives are in `src/components/ui/index.tsx`; site chrome in
`src/components/site/`.

### Two traps worth remembering

- **Computed SVG coordinates must be rounded.** Raw floats serialise differently on
  server and client (`56.69872981077808` vs `56.698729810778076`) and React reports it
  as a hydration mismatch. Anything trigonometric uses `.toFixed(3)`.
- **The theme script must be a real `<head>` child.** React refuses to hydrate a sync
  `<script>` placed directly under `<html>`. The `@next/next/no-head-element` lint rule
  that argues otherwise is Pages-Router-only and is disabled at that line.

## The logo

The **Bindu Ripple** (`src/components/Logo.tsx`) — a bindu (sun / drop / point of
intention) above three widening ripples, clipped into a struck-coin seal. Read one way
it is dawn over a ghat; read the other it is the instant a body enters water.

- `<Mark />` — the seal alone
- `<Logo />` — seal + wordmark lockup
- `<SealAnimated />` — hero treatment with travelling ripples and a 24-ray chakra

`public/icon.svg` is a standalone copy for the favicon (no CSS variables).

## Deployment

Vercel project `snanify`, connected to the GitHub repo — pushes to `main` deploy
automatically.

### Custom domain — action required

`snanify.com` is registered at **Porkbun** and still uses Porkbun nameservers, so
Vercel cannot issue a certificate yet. Pick one:

- **A record** (keeps DNS at Porkbun): point `snanify.com` to `76.76.21.21`, and add a
  `CNAME` for `www` to `cname.vercel-dns.com`.
- **Nameservers** (moves DNS to Vercel): set `ns1.vercel-dns.com` and
  `ns2.vercel-dns.com` at Porkbun.

Vercel re-verifies automatically and emails when it completes.

## Not real yet

The landing page is a marketing surface. Treat the following as **placeholder**:

- The hero statistics (`1,20,000+` sankalps, `48` countries) are invented.
- Muhurat dates are given at month precision only and are **not** panchang-verified.
  Do not publish exact timings without a real panchang source.
- There is no database, no auth, no payments, and no booking flow.
