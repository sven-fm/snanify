# Architecture

How Snanify is put together, as it stands. `CLAUDE.md` holds the spec and the rules;
`DESIGNSYSTEM.md` the design language; `plan.md` the work queue.

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16, App Router, Turbopack | Static marketing pages, server components for data, server actions for every write |
| Language | TypeScript, strict | Copy is typed per locale, so a missing translation fails the build |
| Styling | Tailwind CSS v4 | Tokens declared once as CSS custom properties in `globals.css` |
| Fonts | `next/font/google`, Eczar and Martel Sans | Self-hosted at build; Devanagari cuts attached only on Hindi pages |
| Identity | Clerk (Vercel Marketplace) | Google and email link, one combined sign-in-or-up screen; the Clerk user id is our primary key |
| Money | Stripe Checkout, Managed Payments on | One session per pack; Stripe is merchant of record and remits tax |
| Database | Neon Postgres over WebSocket, Drizzle | The WebSocket driver, because the credit ledger needs `SELECT ... FOR UPDATE` in a transaction |
| Files | Vercel Blob, public store, random suffixes | Portraits and rendered sheets; the URL is the capability |
| Email | Resend, the owner's own account | The receipt and the daily reminder, one Georgia column in the v3 kit with the logo and the river as hosted PNGs from `public/email` (the proxy lets them through) |
| Clock | GitHub Actions, hourly | Vercel Hobby allows one cron a day; the reminder needs one an hour |
| Astronomy | `astronomy-engine` | Offline, deterministic moon and sun. No API, no key |
| Images | `@resvg/resvg-js`, `harfbuzzjs`, `sharp` | The Sankalp Patra and every link card are SVG with every glyph shaped to outlines by HarfBuzz, rasterised by resvg; sharp presses portraits (a centred crop) and shrinks the specimen. The renderers have no stylesheet: colours come from `src/lib/palette.ts`, which a test holds to `globals.css` |
| Analytics | `@vercel/analytics` | Cookieless; nine funnel events, no personal data in a property |
| Ads measurement | Meta Pixel + Conversions API | `src/lib/meta.ts`: from the first visit outside the EU, EEA, UK and Switzerland; inside them only after a yes to the cookie notice (`src/lib/consent.ts`, `ConsentBanner`, the choice on `/privacy`), which appears only there and only once a pixel ID is set. PageView per route, ViewContent / InitiateCheckout / CompleteRegistration from `track()`, Purchase from the Stripe webhook (`src/lib/meta-capi.ts`), hashed, keyed by the session. Inert without `NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_TOKEN`; `META_TEST_EVENT_CODE` for Events Manager's test tab |
| Abuse | Vercel BotID, `src/lib/limiter.ts` | The Pay and setup forms check for a script; the two routes that draw a sheet are rate-limited per instance. The setup beacon skips BotID (a beacon carries no headers) and stands on the session and a same-origin check instead |
| Alerts | `src/lib/alert.ts` over Resend | A failure that costs somebody something mails the owner from its catch block |
| Tests | Vitest, Playwright | About 490 unit tests offline (pglite for the ledger; golden hashes pin the v2 Patra and the link cards); four e2e specs against the dev server: the fold, the smoke pass at 360, 390 and 430, the presses, and the Patra printing to one A4 and one Letter page |
| Hosting | Vercel | Push to `main` deploys production; other branches get previews |

## Repository shape

```
src/
  app/
    [lang]/                    one route tree, two locales, every page in both
      page.tsx                 /            ISR every 30 minutes, the live card
      snan/ rivers/ live/ muhurat/ panchang/ kumbh/ faq/ privacy/ terms/
                               static, prerendered per locale
      begin/                   the pack picker: sign in first, set up second, pay third
      p/[id]/                  the Sankalp Patra page, its image, its OG card
      p/specimen/              a dev-only owner page on a fixture, for the print check; 404 in production
      specimen/                the specimen sheet as WebP, with the signed-in person's own names
      (app)/                   the pages that need Clerk in the browser:
        setup/ today/ account/ sign-in/ sign-up/ sign-out/ begin/done/
        setup/autosave/        the beacon that saves what is unsaved when the tab closes
      layout.tsx               root layout, per-locale metadata, theme colour
    opengraph-image/[lang]/[[...page]]/  every major page's link card, the homepage's included (src/lib/page-cards.ts)
    api/
      stripe/webhook/          the only place credits are bought
      cron/reminders/          the hourly tick, bearer secret
      reminders/off/           one-tap unsubscribe, signed
    sitemap.ts  robots.ts  manifest.ts  globals.css
  proxy.ts                     the URL scheme, the currency cookie, Clerk's middleware
  components/
    Landing.tsx  Logo.tsx  Specimen.tsx  SankalpPatra.tsx  ClerkThemed.tsx
    kit/                       the v3 kit: Seal, Band, Label, Gauge, River, Phone (the one
                               phone frame around every specimen)
    snan/Sitting.tsx           the three minutes
    live/                      the six at a glance, a river's full entry, the credits link
    patra/                     owner and guest views of a sheet, the share button
    setup/SetupForm.tsx
    site/                      Header, Footer, HeaderCta, LangSwitch, PastHero, tracking
    pages/                     one component per marketing route
    ui/                        buttons, price, rows
  content/                     typed per-locale copy, one module per domain; prices.ts and
                               names.ts are locale-independent
  lib/
    locales.ts  seo.ts  nav.ts  currency.ts  sitting-plan.ts  countdown.ts
    auth.ts  credits.ts  fulfil.ts  stripe.ts  sitting.ts  patra-store.ts  begin-path.ts
    patra-view.ts  patra-image.ts  patra-image-v2.ts  patra-version.ts  patra-record.ts
    patra-print.ts  seed.ts  engraving.ts  typeset.ts
    palette.ts  gauge.ts  river-geometry.ts  logo-svg.ts  wordmark-svg.ts  hero-water.ts
    site-card.ts  page-cards.ts
    portrait.ts  blob.ts  email.ts  reminders.ts  unsubscribe.ts  specimen.ts
    autosave.ts  save-sheet.ts  same-origin.ts
    riverdata.ts  sky.ts  occasions.ts  track.ts
  db/                          schema.ts, index.ts, migrations/
tests/  unit/  e2e/
scripts/                       stripe-catalogue, grant, drive, deliver-webhook
```

## The URL scheme

English is unprefixed, Hindi lives under `/hi`, and the route tree is authored once.

```
/rivers      -> rewrite  /en/rivers    the URL bar still reads /rivers
/hi/rivers   -> pass through, matches [lang]=hi
/en/rivers   -> 308 redirect to /rivers
```

`src/proxy.ts` does this, deriving the prefix set from `src/lib/locales.ts`. It skips only
Next internals, `/api`, the files that exist in `public/` and the generated images, so an
unknown dotted path (`/foo.png`) reaches the catch-all and gets the site's own 404. It 308s
locale prefixes and routes that were once public. It writes the currency cookie from
`x-vercel-ip-country` on every response, and runs Clerk's middleware only for the product
paths (`APP_PATH`), so the marketing pages never pay for a session read.

One exception: the landing (`/` and `/hi`) runs Clerk's middleware when a Clerk cookie is
present, and only then. A signed-in visitor gets a 307 to `/account`, query string kept;
`/account` forwards somebody with nothing set up to `/setup`. Strangers and crawlers carry
no cookie, so they reach the static landing without a session read, and a Clerk failure
falls back to the landing rather than a 500. In production the proxy also answers
`/p/specimen` with the site's 404 before Clerk runs.

The link cards live at `/opengraph-image/<lang>/<page>` (the homepage at
`/opengraph-image/<lang>`), one route for every major page, prerendered at build. The
matcher skips any path containing `opengraph-image`, so scrapers get a 200 with no
redirect; `/<lang>/opengraph-image`, the homepage card's old address, is a rewrite in
`next.config.ts`. Each URL carries `?v=` a hash of its text and the drawing, so a changed
headline is a new URL that chat apps fetch again.

`/begin`, `/p/[id]` and `/specimen` sit outside the `(app)` route group: they need `auth()`
on the server, which the middleware provides, but not Clerk's client bundle, which the
group's `ClerkProvider` adds. Keeping them out cut the share page from 323 KB of script to
10 KB.

## Data model

Five tables, `src/db/schema.ts`; migrations in `src/db/migrations`. `users.id` is Clerk's id. `profiles` is what somebody set
up once. `purchases` is one row per Stripe session. `credit_ledger` is append-only, the
balance is `SUM(delta)`, and a unique index on `(reason, ref_id)` makes every write
idempotent: a redelivered webhook or a retried sitting books once. `sittings` snapshots
everything the Patra prints at the moment it is minted (river, sky, names, prayer,
portrait, seed), so a sheet renders in five years exactly as it did that morning. It also
carries `morning_no`, counted under the user lock when the morning is booked (the badge's
"7th morning"), and `image_version`, so a sheet minted under v2 keeps rendering through the
v2 renderer while new ones use v3 (`IMAGE_VERSION` in `patra-version.ts`). A replaced
portrait is never deleted: old sittings still point at it. The
sankalp text is on the sitting row and is never selected by anything that serves a
stranger.

## The money path

1. `/begin` needs a signed-in person with a finished sheet; anyone else is sent to sign in
   and then to `/setup`. Where it goes from there is one pure function, `beginRoute` in
   `src/lib/begin-path.ts`:
   - somebody with mornings in hand and no `?buy` goes to `/account`, unless a purchase is
     in flight (`?pack=`, `error=pay`, `cancelled=1`);
   - a first purchase shows the packs beside the specimen with the buyer's own names;
   - a top-up (`?buy=1` from the menu's "Buy mornings", or a buyer back at zero) shows the
     three packs alone, eleven preselected.

   `?water=<slug>`, from "Do your snan here" on the river pages, rides through sign-in to
   `/setup`, where it is checked against the waters and preselects the water of a new sheet
   only; a saved sheet's water wins.
2. Pay is a form. `startCheckout` prices from the geo header, never from the cookie, opens a
   Checkout Session with the pack and its credit count in metadata, and redirects. If the
   person is somehow not signed in, a short-lived intent cookie lets `/begin?go=1` open the
   session after sign-in without a second press.
3. Stripe redirects to `/begin/done`, which polls for the purchase row and moves on; the
   webhook, verified against the raw body, is the only thing that books credits.
4. The receipt is sent after the booking and its failure is swallowed; the mornings are
   already on the account.

## The morning path

`/today` gates in order: signed in, sheet finished, morning not already kept today, a
credit in hand. It fetches the live reading on the server and hands it to `Sitting`, a
client component that runs a frame-loop clock through a pure state machine
(`sitting-machine.ts`). At the start of the mark it calls `keepThisMorning`, which mints the
sitting row and spends the credit in one transaction, idempotent on the sitting id, then
renders and stores the memento. The page moves on to `/p/[id]?new=1`, where the share sheet
opens itself with the image attached. `/p/[id]` is public by default; the owner can make it
private from the page.

The countdowns in the breath (4 to 1, 6 to 1) and the stillness are derived from that same
clock (`countdown.ts`), never from a second timer. The owner sees one sheet on `/p/[id]`,
drawn in HTML, with the sankalp under it; a guest sees the PNG and never receives the
sankalp. The share button fetches the PNG only when the press is near (pointer, focus, or
in view on the owner's page) and shares the link if the file is not ready. Print fits the
sheet and the sankalp on one A4 or Letter page: the column is sized on `beforeprint`, with
a plain-CSS fallback that holds the tallest sheet the form allows.

## Data flow

**The sky is computed, not fetched.** `astronomy-engine` gives the moon's longitude; minus
the Lahiri ayanamsa; divided into twenty-seven parts. Sunrise and the windows are computed
at each ghat's coordinates. Checked against Drik Panchang on eight days.

**The river is fetched, and therefore fallible.** GloFAS modelled discharge through
Open-Meteo, one value per grid cell per day, cached for thirty minutes in memory and through
Next's fetch cache. The chain: a fresh model day; a stale one, labelled; the 1997 to 2025
seasonal normal, labelled. A river number is never synthesised.

**The setup autosave.** Once a sheet exists, each choice on `/setup` saves through the
same server action as the press, and names and the sankalp save on blur, debounced. Saves
run one at a time, so the newest lands. When the tab hides or closes, what is unsaved goes
to `/setup/autosave` by `sendBeacon`; that route takes the session's user only, checks the
origin, refuses bodies over 64 KB and any photo, and shares `save-sheet.ts` with the
action. A first setup saves once, on the press. Autosave never creates a half-filled row.

**The reminder** runs hourly from GitHub Actions against `/api/cron/reminders` with a
bearer secret compared in constant time; it claims each person's day in the database
before it sends, so two overlapping ticks cannot double-send, and every mail carries a
signed one-tap unsubscribe.

## Rendering

Marketing pages are prerendered per locale (`generateStaticParams`). The landing page is
ISR every thirty minutes for the live card. The product pages render per request. Prices
and the theme are stamped by two sync `<head>` scripts before first paint: every currency
is in the markup and CSS shows one, keyed off `data-cur` on `<html>`.

Client components exist for the sitting, the river's off-screen pause (`InView`; the
river's motion itself is CSS), the setup form, the share button, the theme
toggle, the two observers (`ScrollReveal`, `PastHero`) and the masthead's signed-in state,
which reads Clerk's cookie through `useSyncExternalStore` rather than loading Clerk.

## Security

Content-Security-Policy (Clerk, Cloudflare's bot check, Vercel Analytics, the blob store
and the Meta Pixel allowlisted; `form-action` includes `checkout.stripe.com` because the Pay form ends in a
redirect there), `nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS with preload, all
from `next.config.ts`. The webhook checks Stripe's signature against the raw body. Server
actions validate every field; the portrait pipeline checks the pixel budget before decoding,
strips EXIF and stores a pressed grayscale JPEG only. Account deletion lists and removes
every portrait under the person's own prefix, then the rows, then the Clerk login, and
leaves through `/sign-out` so the landing's redirect never meets a deleted user. If a step
fails, what is left is never personal data behind a login nobody can use.

## Deployment and environments

Vercel, connected to GitHub: push to `main` deploys production, other branches get
previews. CI on GitHub Actions runs lint, types and unit tests on pushes to `main` and on
pull requests. Providers are Vercel Marketplace resources except Resend. `.env.local`
comes from `vercel env pull` and, as of 16 September 2026, still carries the production
database with the Clerk development instance and Stripe test keys, so a local sitting
writes real rows. That is the owner's decision of 16 September 2026: one database.
