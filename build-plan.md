# Snanify build plan

> **For agentic workers:** this is the master plan. Each phase below becomes its own
> line-level TDD plan under `docs/superpowers/plans/` on the day it starts, written with
> `superpowers:writing-plans` and executed with `superpowers:subagent-driven-development`.
> Do not start a phase from this file alone; start it from its own plan, which argues from
> this one. Phase 0 is the exception: its steps are already line-level and it runs from
> here. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a purchasable digital snan with a shareable Sankalp Patra, in English and
Hindi, for Indians aged thirty and above, on top of the existing site, and cut everything
that does not serve that.

**Architecture:** Next.js 16 App Router on Vercel, one route tree under `src/app/[lang]/`,
two locales. Stripe Checkout sells credit packs, a webhook books credits into Postgres,
Clerk owns identity, Vercel Blob holds portraits and rendered sheets, Resend sends the
receipt and the morning reminder. The daily sitting is a client component that ends in one
server action, which mints a sitting row, renders a 1080 by 1350 image, and returns a public
link.

**Tech stack:** Next.js 16.3, React 19, TypeScript strict, Tailwind v4, `astronomy-engine`,
Stripe (Vercel Marketplace), Neon Postgres + Drizzle (Marketplace), Clerk (Marketplace),
Vercel Blob, Resend (Marketplace), `sharp`, `next/og` `ImageResponse`, Vitest, Playwright.

**Spec:** this document, sections 1 to 4. Sections 5 onward are the plan.

Decisions recorded here were made by the owner on 2026-09-07 and are not reopened inside a
phase. A phase that discovers it needs a decision reversed stops and says so.

---

## Global constraints

Copied from `CLAUDE.md` and `DESIGNSYSTEM.md`; every task inherits them.

- **Rule 1.** Never claim a physical rite happened. No priest, no ghat, no offering by a person.
- **Rule 2.** Never make a promise that is not true. Nothing about karma, sins, or outcomes.
- **No negative constructions** on the landing page and on `/snan`. Noun and verb.
- **No em dashes** anywhere, copy or comments. Comma, colon, full stop, parentheses.
- **No fabricated numbers.** Every river figure carries its source and its cadence. The
  data is Copernicus GloFAS modelled discharge served by Open-Meteo, one value per day. The
  word is "modelled", everywhere it appears, including JSON-LD.
- **Mobile first at 390 by 844.** Nothing scrolls horizontally. Tap targets 44px. Primary
  action thumb-reachable.
- **No gradients, glows, blurs, rounded corners, soft shadows.**
- **Prices live in `src/content/prices.ts`** and render through `<Price>`. Change a price and
  change `PER_SNAN` in the same commit.
- **Every href through `localePath(lang, path)`.** Metadata through `pageMetadata()`. Static
  params through `fullLangParams()`.
- **Round every computed SVG coordinate** (`toFixed(2)` or `toFixed(3)`).
- **`npm run lint` is 0 errors and `npx tsc --noEmit` is clean** before every commit.
- **Respectful register in Hindi** (आप). Idiomatic, never a literal translation.
- **Placeholder hero figures stay** until replaced with real values at launch (owner's call).
- **Voice: proud, warm, unapologetic.** The promise is closeness to home and something to
  share with your family, every morning. Copy states what the product is and does. It never
  explains what it is not, never answers a critic who is not in the room, never apologises
  for being digital. Facts about the data are stated as craftsmanship ("modelled daily by
  Copernicus, checkable by anyone"), never as disclaimers. If a sentence exists to defend the
  product, delete it. We are proud to build this and proud to sell it.

---

## 1. Decisions, locked

| Question | Decision |
| --- | --- |
| Paying entity | Non-Indian. Stripe only. Razorpay and UPI are a later phase if an Indian entity appears. |
| What is paid | The snan. One price, three packs (1, 11, 60), the Sankalp Patra included. Free forever: `/live`, `/panchang`, `/muhurat`, `/rivers`. |
| Locales at launch | English and Hindi. The other ten locale files stay in git, out of the registry. |
| On the Patra | Portrait photo, up to five household names, one chosen prayer, the person's own sankalp text (own copy only). |
| Sitting length | About three minutes: reading 15s, breath 45s, sankalp hold 11s, stillness 60s, mark 20s. Stillness cannot be skipped. |
| Patra cadence | One Patra per completed morning, seeded by that day's river. |
| Sign-in | Clerk. Google plus email magic link. No phone OTP. |
| Names | The practice is **the snan**. The artefact is the **Sankalp Patra**. "Jal Sankalp", "Jal Chihna", "Watermark", "Jal Path", "Shwas", "Maun", "Chihn" leave the marketing copy. |
| Data source | GloFAS modelled discharge via Open-Meteo, daily. The CWC hourly telemetry claim is removed from `CLAUDE.md` and from the `/snan` JSON-LD. |

### Why these, in one line each

- **Stripe only.** Two processors is two webhooks, two reconciliations and an Indian company. The diaspora in the US, Canada and Europe is the paying audience on day one.
- **The snan is paid.** One thing to explain, one thing to sell, and the sitting is the value. A paywall inside a three-minute ritual is worse than a paywall before it.
- **Two locales.** Ten surface locales cost a font call, a copy file and a QA pass per page for pages nobody can buy from. They return when there is revenue to justify a translator.
- **One Patra per morning.** Eleven shareable moments per pack and a register that fills up. The share is the growth channel, and one share per pack is one eleventh of the channel.
- **Three minutes.** Long enough to be a practice, short enough to keep at 5:40 in bed on morning three.

---

## 2. The product, as the buyer sees it

1. **Landing.** Headline, one paragraph, the live river card, three packs with real buttons, six waters, a colophon. Under 450 words.
2. **Begin.** Pick a pack. Sign in with Google or an emailed link. Stripe Checkout in the reader's currency. Back on the site with credits.
3. **Set up, once.** Choose a water. Upload a portrait (optional). Add up to five names of the household. Pick one prayer from a short list for that water. Write the sankalp. Set the reminder hour. About two minutes.
4. **Sit, each morning.** Open `/today`. Five parts, three minutes, the screen does the pacing. The vow is held under the thumb for eleven seconds. The stillness is a black screen. The mark writes itself.
5. **The Sankalp Patra.** A public page with a 4:5 image: portrait, names, the prayer, the water, the day's modelled reading, the tithi, the date in the person's own zone and in IST, and the seed anyone can recompute. The share sheet opens on its own with the image attached. WhatsApp is the target. The sankalp text is on the owner's copy and nowhere else.
6. **Tomorrow.** An email at the chosen hour with one line about today's water and a link to `/today`. The register on `/account` gains a ruled line per morning.

The promise, in the buyer's words: a few minutes with the river you grew up near, in your own name and your family's, and something beautiful to send to the family group. Every page sells that. The Patra records the names, the date, the water and the source.

---

## 3. Architecture

### 3.1 Providers, provisioned through the Vercel Marketplace

Install order, each with `npx vercel@latest integration add <slug> --yes --no-claim` after
`vercel link` (the project is already linked as `snanify`). Any provider that hands off to a
browser step stops and waits for the owner.

| Need | Provider | Slug | Notes |
| --- | --- | --- | --- |
| Payments | Stripe | `stripe` | Checkout Sessions, one-time payments, INR/USD/EUR/CAD presentment. Owner must complete Stripe identity and enable the currencies. |
| Database | Neon Postgres | `neon` | Drizzle ORM on top. |
| Identity | Clerk | `clerk` | Google OAuth and email magic link. Custom `appearance` to match paper and ink. |
| Email | Resend | `resend/resend-email` | Sending domain `snanify.com` verified by the owner at DNS (Porkbun). |
| Files | Vercel Blob | built in | Private store for raw portraits, public store for processed portraits and rendered sheets. |
| Cron | Vercel Cron | built in | One hourly job for reminders. |

The Vercel CLI installed globally is 54.11.1 and does not know `integration discover`. Use
`npx vercel@latest` for every marketplace command until the global install is upgraded.

### 3.2 Data model (Drizzle, `src/db/schema.ts`)

```ts
users            id text pk (Clerk user id), email text, display_name text,
                 locale text ('en'|'hi'), tz text (IANA), reminder_hour int (0-23, local),
                 reminder_on boolean default true, created_at timestamptz

profiles         user_id text pk -> users, water_slug text, portrait_key text | null,
                 names jsonb (Array<{ name: string }>, max 5), prayer_id text | null,
                 sankalp_text text, completed_at timestamptz | null, updated_at timestamptz

purchases        id text pk, user_id -> users, stripe_session_id text unique,
                 stripe_payment_intent text, pack text ('one'|'eleven'|'sixty'),
                 currency text, amount_minor int, credits int, created_at timestamptz

credit_ledger    id serial pk, user_id -> users, delta int,
                 reason text ('purchase'|'sitting'|'grant'|'refund'), ref_id text,
                 created_at timestamptz
                 -- balance is SUM(delta); never a mutable counter on users

sittings         id text pk (22-char base58), user_id -> users, water_slug text,
                 kept_at timestamptz, kept_tz text, locale text,
                 river jsonb (RiverSlice), sky jsonb (SkySlice), seed text,
                 names jsonb, prayer_id text | null, portrait_key text | null,
                 sankalp_text text (private), image_key text | null,
                 is_public boolean default true, created_at timestamptz
```

`RiverSlice` is the one water's slice of `LiveSnapshot` from `src/lib/riverdata.ts`: discharge,
percentile, band, trend, `modelledFor`, source name, cell coordinates, and the staleness
rung. `SkySlice` is tithi, paksha, nakshatra, moon illumination, sunrise and sunset from
`src/lib/sky.ts`. Both are stored as fetched at the instant of the sitting so the Patra
never changes after the fact.

`seed = sha256(sittingId + waterSlug + river.modelledFor + river.discharge)`, hex, first 16
characters printed. Anyone with the page and the Open-Meteo archive can recompute it.

### 3.3 Routes

Existing routes after the cut, all English and Hindi unless marked:

| Route | Purpose |
| --- | --- |
| `/` | Landing. Sells. |
| `/snan` | The practice, the five parts, the packs. Absorbs `/how-it-works`. |
| `/rivers`, `/rivers/[river]` | The six waters. |
| `/live` | The rivers now. Free. |
| `/muhurat`, `/muhurat/[occasion]` | The calendar. Free. |
| `/panchang` | Free timing tool. |
| `/kumbh` | SEO page for Nashik 2027. Not in nav. |
| `/faq` | Questions, including the hard ones. |
| `/ethics` | The commitment, cut to under 600 words. Linked from the footer. |

New routes:

| Route | Auth | Purpose |
| --- | --- | --- |
| `/begin` | public | Pack picker. Buttons post a server action that creates a Stripe Checkout Session. Unauthenticated users are sent to sign in first, then back. |
| `/begin/done` | signed in | Return URL from Stripe. Polls for the purchase row, then sends to `/setup` or `/today`. |
| `/setup` | signed in | Profile form: water, portrait, names, prayer, sankalp, reminder hour. Editable later from `/account`. |
| `/today` | signed in, credits ≥ 1, profile complete | The sitting. |
| `/p/[id]` | public | The Sankalp Patra page. Owner sees the sankalp text and a print view; everyone else sees the public sheet. |
| `/p/[id]/opengraph-image` | public | The share card, 1200 by 630. |
| `/p/[id]/image` | public | The 4:5 sheet, 1080 by 1350 PNG, served from Blob. |
| `/account` | signed in | Register of sittings, credits, reminder, profile link, sign out, delete account. |
| `/sign-in`, `/sign-up` | public | Clerk pages, styled. |
| `/api/stripe/webhook` | Stripe signature | `checkout.session.completed` → purchase + ledger. Idempotent on `stripe_session_id`. |
| `/api/cron/reminders` | `CRON_SECRET` | Hourly. |

Deleted routes: `/how-it-works`, `/patra`, `/patra/sample`, `/verify`. Their URLs get 308
redirects in `src/proxy.ts` to `/snan`, `/snan`, `/snan`, `/faq#verify`.

### 3.4 File map

```
src/
  db/
    index.ts                 drizzle client from DATABASE_URL
    schema.ts                the five tables above
    migrations/              drizzle-kit output, committed
  lib/
    auth.ts                  currentUser(): { id, email } | null, requireUser()
    credits.ts               balance(userId), book(userId, delta, reason, refId)
    stripe.ts                stripe client, packToPrice(pack, currency), createCheckout()
    blob.ts                  putPortrait(), putSheet(), publicUrl(key)
    portrait.ts              sharp pipeline: crop, grayscale, contrast, grain, 800x1000
    seed.ts                  seedFor(sitting): string
    sitting.ts               mintSitting(userId, at): { id }  (transaction: credit + row + image)
    ids.ts                   base58 22-char id
    email.ts                 sendReceipt(), sendReminder()
    reminders.ts             usersDueAt(hourUtc): User[]
  content/
    prayers.ts               curated prayers per water, Devanagari + transliteration + meaning
    begin.ts, setup.ts, today.ts, patra-page.ts, account.ts   copy, Record<FullLang, ...>
  components/
    snan/
      Sitting.tsx            client: the five-part state machine
      Reading.tsx Breath.tsx Vow.tsx Stillness.tsx Mark.tsx
    patra/
      Sheet.tsx              the 4:5 layout, shared by ImageResponse and the page
      ShareButton.tsx        Web Share API with file, WhatsApp fallback link
    account/
      Register.tsx           one ruled line per sitting
  app/[lang]/
    begin/page.tsx  begin/done/page.tsx  setup/page.tsx  today/page.tsx
    p/[id]/page.tsx  p/[id]/opengraph-image.tsx  p/[id]/image/route.ts
    account/page.tsx  sign-in/[[...sign-in]]/page.tsx  sign-up/[[...sign-up]]/page.tsx
  app/api/
    stripe/webhook/route.ts
    cron/reminders/route.ts
tests/
    unit/                    vitest: seed, credits, currency, ids, portrait, reminders
    e2e/                     playwright: buy (Stripe test mode), setup, sit, share page
```

### 3.5 What is explicitly out of scope

Everything in `docs/digital/` and `docs/product/` that is not in this document. Named, so
nobody rebuilds it by accident: Jal Stambha, Jal Nimantran, Sang, Ghat Bahi, Sankalp Bahi,
Pitru Tithi Panji, Founding Patra, Snan Kosh credits, Nitya or Kul subscriptions, gifting
scheduler, co-stewards, succession, dormancy flows, the fifteen message types, the audio
engine, the 54 nakshatra SEO pages, the `@snanify_jal` account, `/deewar`, `/khandan`, the
A3 print file, the SVG Jal Mudra, WhatsApp Business messaging, Razorpay, phone OTP, the
ten surface locales, referral caps, streak mechanics, the year-end sheet.

Any of these can return as its own plan after launch, argued from revenue.

---

## 4. Open items only the owner can close

Tracked here so a phase never blocks silently on them.

- [ ] **Stripe account** activated for the non-Indian entity, with INR, EUR, CAD, USD presentment enabled. Check in the Stripe dashboard that INR is presentable from this account's country; if it is not, India is shown USD until it is.
- [ ] **Indian cards.** Many Indian debit cards have international transactions switched off by default. The `/faq` gets one entry telling Indian buyers how to switch it on in their bank app. This is friction, not a blocker, and it is the reason a Razorpay phase exists later.
- [ ] **GST on digital services to Indian consumers (OIDAR).** A non-Indian entity selling to Indian consumers is expected to register. Legal item, not a build item. Decide before India marketing starts.
- [ ] **Privacy policy and terms.** Portraits and names of family members are personal data under GDPR and India's DPDP Act. A page each, plain language. Needed before Phase 4 ships to production.
- [ ] **Sending domain** for Resend verified at Porkbun.
- [ ] **Prayer list** reviewed by the owner or someone the owner trusts for text accuracy. Draft is written in Phase 4.
- [ ] **Real hero figures** to replace the placeholders at launch.
- [ ] **Clerk dashboard, three settings.** Rename the application from
  `clerk-bronze-sail` to Snanify, so the magic-link email and the device
  verification screen say it (the sign-in card itself is already overridden in
  `src/lib/clerk-look.ts`). Turn off password sign-in and turn on email link, so
  the offer matches what /snan promises. Add Google OAuth credentials for the
  production instance.
- [ ] **Claim the Stripe sandbox.** It provisioned as `stripe-violet-kite`, an
  unclaimed sandbox in test mode, and Checkout says so on the payment page.
  Claiming it and naming the business Snanify is what turns test payments into
  real ones.
- [ ] **Clerk dashboard**: Google OAuth credentials, production instance, custom domain `clerk.snanify.com` or the Clerk default.

---

## 5. Phases

Each phase ends with a deployed preview, `npm run lint` at 0, `npx tsc --noEmit` clean,
`npm test` green, and one merge to `main`. Phases 1 and 2 are independent and can run in
parallel on two worktrees. Phases 3 to 7 are sequential. Estimated effort is for one person
working with an agent; treat it as a shape, not a promise.

| Phase | Name | Effort | Ships |
| --- | --- | --- | --- |
| 0 | Ground truth and tooling | done | Honest data claims, a test runner, a branch |
| 1 | Cut the marketing surface | done | Two locales, nine routes, one name, a landing that sells |
| 2 | Foundations | 2 days | Providers, schema, auth, env |
| 3 | Purchase | 2 days | Stripe Checkout to credits |
| 4 | Set up once | 3 days | Portrait, names, prayer, sankalp, reminder |
| 5 | The sitting | 4 days | The five parts, minted sitting |
| 6 | The Sankalp Patra | 4 days | Public page, image, share |
| 7 | Return loop | 2 days | Reminder email, register, account |
| 8 | Launch | 3 days | Legal, analytics events, Search Console, real figures |

---

### Phase 0: Ground truth and tooling

**Why first.** The site currently asserts a data source it does not use, and the repo has
no test runner. Both are cheap now and expensive under a product.

- [x] **0.1 Branch.** `git checkout -b feat/product main`. All product phases merge here, `feat/product` merges to `main` per phase.
- [x] **0.2 Fix the data claim.** In `src/app/[lang]/snan/page.tsx` replace the `isBasedOn` Dataset (CWC hourly telemetry) with the GloFAS Dataset already emitted on `/live` (name `SOURCES.discharge.model`, url `SOURCES.discharge.modelHref`). In `CLAUDE.md`, rewrite the "The river is real and public" bullet: modelled discharge from Copernicus GloFAS via Open-Meteo, daily, labelled modelled, with the CWC portal named as the registry the ghats are checked against and nothing more. Grep `src/content` for "telemetry", "gauge reading at that instant", "Central Water Commission" and fix every sentence that claims an instrument reading.
- [x] **0.3 Test runner.** `npm i -D vitest @vitest/coverage-v8`. Add `"test": "vitest run"` and `"test:watch": "vitest"`. `vitest.config.ts` with `@` alias matching `tsconfig.json`. First test: `tests/unit/currency.test.ts` covering `currencyForCountry("IN") === "INR"`, `"CA"`, `"DE"`, `undefined`.
- [x] **0.4 Playwright.** `npm i -D @playwright/test` and `npx playwright install chromium`. `playwright.config.ts` pointing at `http://localhost:3000`, one smoke test that loads `/` at 390 by 844 and asserts no horizontal overflow (`document.documentElement.scrollWidth <= 390`).
- [x] **0.5 Upgrade the Vercel CLI** globally: `npm i -g vercel@latest`. Re-run `vercel link` to confirm the project.
- [x] **0.6 Commit** each of the above separately. Lint 0, tsc clean, `npm test` green.

**Done when:** `/snan` JSON-LD names GloFAS, `CLAUDE.md` tells the truth, `npm test` runs one passing unit test and one passing e2e test.

---

### Phase 1: Cut the marketing surface

**Why.** Halve what has to be maintained before the product doubles it. Every step here is
subtractive except the landing rewrite.

- [x] **1.1 Two locales in the registry.** In `src/lib/locales.ts`: `export type Lang = FullLang;`, remove the ten surface rows from `LOCALES`, narrow `Script` to `"latin" | "devanagari"`. Leave `FullLang`, `FULL_LANGS`, `FULL_ONLY`, `servesPath`, `allLangParams`, `fullLangParams` in place so no call site changes. Run `npx tsc --noEmit`; every error is a `Record<Lang, ...>` with ten extra keys.
- [x] **1.2 Trim the aggregators.** `src/content/landing/index.ts` (or wherever `{ en, hi, bn, ... }` is assembled), `src/content/live/index.ts`, `src/content/muhurat-index/index.ts`, `src/content/rivers-index/index.ts`: import and export `en` and `hi` only. Leave the other ten files on disk, untouched, unimported. `src/lib/nav.ts` `LABELS` and `src/content/names.ts`: delete the ten keys per entry (a script with `sed` per language code is fine; check the diff by eye). `src/lib/fonts.ts`: delete the font calls for the ten scripts, keep Eczar, Martel Sans and the two Devanagari faces. `src/app/globals.css`: delete the per-script font stacks that no longer have a variable. `src/components/site/LangSwitch.tsx`: derives from `LOCALES`, should need nothing.
- [x] **1.3 Redirect the ten prefixes.** In `src/proxy.ts`, the derived prefix set now has one entry (`hi`). Add an explicit 308 for `/(bn|mr|te|ta|gu|kn|ml|or|pa|as)(/.*)?` to the English path, so indexed URLs land somewhere. Update `src/app/sitemap.ts` (derives from the registry, verify the output has no `/ta/`).
- [x] **1.4 Delete four routes.** Remove `src/app/[lang]/how-it-works`, `patra`, `patra/sample`, `verify`, and their page components `HowItWorks.tsx`, `PatraExplainer.tsx`, `Verify.tsx`. Remove `src/content/verify.ts`. In `src/content/trust.ts` delete the how-it-works copy. In `src/content/patra.ts` keep `ChihnaRecord`, `specimenChihna` and the sheet copy that `SankalpPatra.tsx` needs (renamed in 1.6), delete the eight-section explainer. Add the four 308s to `src/proxy.ts` (3.3 above). Remove `patra`, `how`, `verify` from `nav.ts` `LABELS` and `PATHS`; add `begin` and `account` labels (en, hi) for Phase 3. Remove the four from `FULL_ONLY` and from `sitemap.ts`.
- [x] **1.5 Cut the apologetics.** Delete the "hard questions" category from `/faq` outright; it argues with a critic who is not in the room. What stays in `/faq` is practical: how to pay, Indian cards and international transactions, what is on the Patra, adding parents' names, printing, changing the water, refunds. Rewrite `/ethics` as "How it is made" at the same URL (the footer links it): under 400 words per language, in the voice of a maker showing the workshop. The data and its cadence, the sky maths, what the Patra records, who processes what. The two rules are stated once, as a craft standard, in one sentence each. Merge the one useful part of `/how-it-works` (the five parts at length) into `/snan` if `/snan` does not already say it; it already renders the same table, so this is likely a deletion.
- [x] **1.6 One name.** Grep `src/content` and `src/components` for `Jal Chihna`, `जल चिह्न`, `Watermark`, `Jal Sankalp`, `Jal Path`, `Shwas`, `Maun`, `Chihn`. Replace in marketing copy with "the snan" / "स्नान" and "Sankalp Patra" / "संकल्प पत्र". Limb labels become Reading, Breath, Sankalp, Stillness, Mark (पाठ, श्वास, संकल्प, मौन, चिह्न) and appear on `/snan` once and in the sitting UI. Rename `chihnaContent` to `patraContent`, `ChihnaRecord` to `PatraRecord`, `SankalpPatra.tsx` stays. Update `ChihnaSheetViewer` to `PatraSheetViewer`.
- [x] **1.7 Landing rewrite.** New `src/content/landing/en.ts` and `hi.ts` with these sections only, in order: hero (headline, one paragraph, two buttons: Begin → `/begin`, The rivers now → `/live`), the live card, three packs with buttons to `/begin?pack=one|eleven|sixty`, the six waters, the colophon. The headline and paragraph sell closeness to home and the family group: the river you grew up near, your name and theirs on one sheet, a morning you can send. Warm, proud, plain. Delete the `#how`, `#form`, `#muhurat` sections and the stats band; the hero keeps the placeholder figures. The mobile thumb rail's button goes to `/begin`. `ctaHref()` in `nav.ts` returns `localePath(lang, "/begin")`. Target: under 450 English words of visible prose. Every sentence built on a noun and a verb.
- [x] **1.8 Snan page.** Cut `/snan` to: what it is (three sentences), the five parts with durations (15, 45, 11, 60, 20), what the Patra shows, the three packs with buttons, one link to `/ethics`. Durations in `src/content/snan.ts` and on the landing page come from a single `SITTING` constant in `src/lib/sitting-plan.ts` (`{ reading: 15, breath: 45, hold: 11, stillness: 60, mark: 20 }`), which Phase 5 also reads, so copy and code cannot drift.
- [x] **1.9 Docs.** `CLAUDE.md`: locale table becomes two rows, the product table gets the new durations, the route list is updated, the "Never" list gains "Do not re-add a coined name". `ARCHITECTURE.md`: route tree, deleted routes, the redirect list. Delete `docs/design/` entirely (it documents the cancelled officiant model; git remembers it). Add a one-paragraph `docs/digital/README.md` saying the set is superseded by `build-plan.md` and which parts are out of scope (3.5 above).
- [x] **1.10 Verify.** `npm run build` lists only `en` and `hi` pages. Playwright smoke at 390px on `/`, `/snan`, `/hi`, `/hi/snan`: no horizontal overflow, every "Begin" resolves to `/begin` (which 404s until Phase 3; assert the href, not the navigation). Sitemap has no deleted route and no surface locale. Merge to `feat/product`.

**Done when:** the build emits two locales and nine marketing routes, the landing page is under 450 words and every CTA points at `/begin`.

---

### Phase 2: Foundations

**Why.** Providers first, then code against real env vars. Nothing here is user-visible.

- [ ] **2.1 Install providers.** `npx vercel@latest integration add neon --yes --no-claim`, then `clerk`, then `stripe`, then `resend/resend-email`. Any that opens a browser step: stop, tell the owner what to complete, continue after. Then `vercel env pull .env.local --yes`. Confirm `.env.local` is in `.gitignore`. Vercel Blob: enable in the project's Storage tab, pull again for `BLOB_READ_WRITE_TOKEN`.
- [ ] **2.2 Drizzle.** `npm i drizzle-orm @neondatabase/serverless` and `npm i -D drizzle-kit`. `drizzle.config.ts` pointing at `src/db/schema.ts` and `DATABASE_URL`. Write `src/db/schema.ts` exactly as 3.2. `npx drizzle-kit generate` then `npx drizzle-kit migrate`. Commit the migration. Reinstall Playwright after (`npm i` prunes it, see `CLAUDE.md`).
- [ ] **2.3 Clerk.** `npm i @clerk/nextjs`. Wrap `RootShell.tsx` in `<ClerkProvider>` with `appearance` variables: `colorBackground` paper, `colorText` ink, `borderRadius: "0"`, font family from the existing CSS variables, no shadows. Enable Google and email magic link in the Clerk dashboard; disable password. In `src/proxy.ts` wrap the existing handler in `clerkMiddleware()` and keep the existing matcher (it already excludes `api/`, so the Stripe webhook stays public). Protect nothing yet; pages call `requireUser()` themselves.
- [ ] **2.4 `src/lib/auth.ts`.** `currentUser()` reads Clerk's `auth()` and upserts a `users` row on first sight (id, email, locale from the route, tz from a cookie the client sets in Phase 4, default `Asia/Kolkata`). `requireUser(lang)` redirects to `localePath(lang, "/sign-in")` with `redirect_url`. Sign-in and sign-up pages under `src/app/[lang]/sign-in/[[...sign-in]]/page.tsx` rendering `<SignIn>` inside the site shell.
- [ ] **2.5 `src/lib/credits.ts`.** `balance(userId)` is `SUM(delta)`. `book(userId, delta, reason, refId)` inserts a ledger row inside the caller's transaction and refuses to take the balance below zero. Unit tests against a Neon branch database (`DATABASE_URL_TEST`), or against `pglite` if faster; pick one in the phase plan and stick with it.
- [ ] **2.6 `src/lib/ids.ts`.** `newId()`: 22 characters, base58, from `crypto.getRandomValues`. Test: length, alphabet, 10,000 draws unique.
- [ ] **2.7 Header.** `src/components/site/Header.tsx` shows "Begin" when signed out and "Today" plus "Account" when signed in, via `currentUser()`. Both labels exist in en and hi in `nav.ts`.
- [ ] **2.8 Verify.** A signed-out visit to `/account` lands on the styled sign-in; Google sign-in returns to `/account`, which renders "no sittings yet" and a balance of 0. Merge.

**Done when:** a user can sign in and out, a `users` row exists, and `balance()` returns 0.

---

### Phase 3: Purchase

- [ ] **3.1 Stripe prices.** Create three Products in the Stripe dashboard (one, eleven, sixty) with four Prices each (USD, EUR, CAD, INR) matching `src/content/prices.ts` exactly. Store the twelve price ids in `src/content/prices.ts` as `STRIPE_PRICE: Record<TierKey, Record<Currency, string>>` read from env (`STRIPE_PRICE_ELEVEN_INR` etc.) so test and live differ by env only. A unit test asserts every tier and currency has an id in `.env.example`.
- [ ] **3.2 `src/lib/stripe.ts`.** `createCheckout({ userId, email, pack, currency, lang })` creates a Checkout Session, mode `payment`, `line_items` one price, `client_reference_id = userId`, `metadata { pack, credits }`, `success_url = /begin/done?session_id={CHECKOUT_SESSION_ID}`, `cancel_url = /begin`, `locale` `hi` or `en`, `allow_promotion_codes: true`. Credits per pack: one 1, eleven 11, sixty 60.
- [ ] **3.3 `/begin`.** Page reads `?pack=`, shows the three packs with the reader's currency (existing `<Price>`), the selected one marked. Each button is a form posting a server action: `requireUser`, read currency from the `snf-cur` cookie, `createCheckout`, `redirect(session.url)`. Signed-out users go through sign-in and come back to the same URL.
- [ ] **3.4 Webhook.** `src/app/api/stripe/webhook/route.ts`: verify signature with `STRIPE_WEBHOOK_SECRET`, handle `checkout.session.completed` only, insert `purchases` (unique on `stripe_session_id`, on conflict do nothing) and `book(userId, credits, "purchase", sessionId)` in one transaction, send `sendReceipt()`. Return 200 on duplicates. Register the endpoint in Stripe; for local, `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
- [ ] **3.5 `/begin/done`.** Server page: `requireUser`, look up the purchase by `session_id`; if absent, render a page that refreshes itself every two seconds for up to thirty seconds ("Stripe is confirming"), then falls back to a line saying the credits will appear shortly and an email will confirm. If present: profile complete → `/today`, else → `/setup`.
- [ ] **3.6 Receipt email.** `src/lib/email.ts` `sendReceipt({ to, lang, pack, amount, currency })` via Resend, plain text plus a minimal HTML in the site's type, from `snan@snanify.com`. Copy in `src/content/email.ts`, en and hi.
- [ ] **3.7 JSON-LD.** Now that a checkout exists, add `Offer` nodes to `/snan` (the comment in `snan/page.tsx` asks for exactly this) in the edition's currency via `currencyForLang`.
- [ ] **3.8 Tests.** Unit: `packToPrice`, credits per pack, webhook idempotency (call the handler twice with the same session, one ledger row). E2E in Stripe test mode: buy eleven with card `4242 4242 4242 4242`, land on `/setup`, `/account` shows 11.
- [ ] **3.9 Verify on a preview deployment** with Stripe test keys, then merge.

**Done when:** a real test-mode purchase books credits and sends a receipt, twice-delivered webhooks book once.

---

### Phase 4: Set up once

**Known issue carried forward.** `/setup` logs React error #418, a hydration
mismatch, on some first loads. The form saves correctly; the cost is that React
rebuilds the tree on the client. Everything ruled out so far is written at the
head of `src/components/setup/SetupForm.tsx`. Worth an hour before launch.

- [ ] **4.1 Prayers.** `src/content/prayers.ts`: for each of the six waters, three to five short prayers in the public domain (for example: Ganga: गङ्गे च यमुने चैव (the sapta-nadi shloka), नमामि गङ्गे; Yamuna: a verse from Yamunashtakam; Godavari, Shipra, Kaveri: the sapta-nadi shloka and a regional verse; plus universal: Gayatri, Mahamrityunjaya, ॐ नमः शिवाय). Each entry: `id`, `title: Record<FullLang, string>`, `devanagari`, `roman` (IAST-lite, readable), `meaning: Record<FullLang, string>`, `waters: WaterSlug[] | "all"`. Text accuracy is on the owner's open-items list. No prayer text is generated; every one is a known verse, cited by source name in a comment.
- [ ] **4.2 Portrait pipeline.** `npm i sharp @vercel/blob`. `src/lib/portrait.ts` `processPortrait(buffer, crop: { x, y, w, h })`: rotate by EXIF, extract crop, resize to 800 by 1000 cover, grayscale, `linear(1.15, -10)` for contrast, `sharpen`, a subtle noise overlay for grain, output JPEG quality 82. Test: a fixture image in, dimensions and grayscale out, under 200 KB. Raw upload goes to the private Blob store under `raw/{userId}/{id}.jpg`, processed to the public store under `portrait/{userId}/{id}.jpg`. Max upload 8 MB, JPEG/PNG/HEIC (convert HEIC via sharp; if the build lacks HEIF support, reject with a message to save as JPEG). The user sees the processed version before saving and can re-crop.
- [ ] **4.3 `/setup` page.** One column, in order: choose water (six cards with the live band), portrait (file input styled as a ruled box, crop with a simple pan-and-zoom square, client side canvas for preview, server action for processing), names (five text inputs, first one prefilled from Clerk name, label "kept in the name of"), prayer (radio list filtered by water, each shows Devanagari and one line of meaning; "none" allowed), sankalp (textarea, 280 characters, one hint: "one sentence, in your own words"), reminder (hour picker, default 05:30 local, the browser's time zone written to a cookie and to `users.tz`). Save writes `profiles`, sets `completed_at`, redirects to `/today` when credits exist, else `/begin`.
- [ ] **4.4 Validation** in a server action with a small hand-written validator (no schema library): names 1 to 5, each 1 to 60 characters; sankalp 1 to 280; prayer id in the list or null; water in the six; hour 0 to 23. Errors render next to the field, in the reader's language, from `src/content/setup.ts`.
- [ ] **4.5 Privacy.** `/privacy` and `/terms` pages, en and hi, in `FULL_ONLY`, linked from the footer and from the portrait field. Content from the owner; the plan ships a plain draft that names Clerk, Stripe, Neon, Vercel, Resend as processors and states portraits and names are deleted on account deletion.
- [ ] **4.6 Tests.** Unit: validator, portrait pipeline. E2E: complete setup with a fixture portrait, `/account` shows the profile.
- [ ] **4.7 Verify at 390px**: the crop control works with a thumb, the save button is reachable. Merge.

**Done when:** a paid user can complete setup in under two minutes on a phone and the processed portrait looks like it belongs on the paper.

---

### Phase 5: The sitting

**Why this design.** A state machine with five states, each a component, each with a fixed
duration from `SITTING`. No audio at launch. The vow hold uses pointer events with a
progress fill; releasing early resets the fill. Stillness is a black screen with a single
faint line at the end; the screen wake lock is requested so the phone does not sleep.

- [ ] **5.1 `/today` server page.** `requireUser`, `balance() >= 1` else redirect `/begin`, `profiles.completed_at` else redirect `/setup`. Fetch `getLiveSnapshot()` and pick the user's water, compute the sky slice for now at the ghat, pass both plus the profile into `<Sitting>`. One sitting per water per calendar day in the user's zone: if one exists today, show it (`/p/[id]`) instead of a second.
- [ ] **5.2 `src/lib/sitting-plan.ts`** already holds `SITTING` from 1.8. Add `TOTAL_SECONDS` and a unit test that it is 151.
- [ ] **5.3 `<Sitting>`** client component: `useReducer` over `reading → breath → vow → stillness → mark → done`, timers via `requestAnimationFrame` deltas (not `setInterval`, which drifts in background tabs). `visibilitychange` pauses the clock; the sitting resumes where it stopped, it never restarts. `navigator.wakeLock.request("screen")` on start, released on done, ignored where unsupported.
- [ ] **5.4 `<Reading>`** 15s: water name, the modelled discharge with its band word, the percentile against the 29-year archive, the date in the user's zone and IST, the tithi if sourced, and the source line ("modelled, Copernicus GloFAS, for {modelledFor}"). Reuses the figures and labels from `LiveRivers.tsx`; extract the shared pieces into `src/components/river/Figures.tsx` rather than copying.
- [ ] **5.5 `<Breath>`** 45s: the existing `RiverFlow` with its horizon driven by a 6-second sine (in for 3, out for 3), amplitude from the water's band. One word at each turn: "in", "out" (श्वास लें, छोड़ें). Reduced motion: a static line and the words only.
- [ ] **5.6 `<Vow>`**: the sankalp text from the profile, the names under it, a thumb-sized region at the bottom. Pointer down starts an 11-second fill (ink rising behind the text, `toFixed(2)` on every coordinate); pointer up before 11 resets; at 11 the state advances. A line explains it once: "Hold your thumb on your words."
- [ ] **5.7 `<Stillness>`** 60s: `background: #000`, nothing else, no timer shown. At 60 a single rule appears and the state advances on its own.
- [ ] **5.8 `<Mark>`** 20s: calls the `completeSitting` server action at 0s (so the row exists even if the tab dies), then animates one line writing into a register while the image renders. At 20s or when the action returns, whichever is later, navigate to `/p/[id]?new=1`.
- [ ] **5.9 `src/lib/sitting.ts` `mintSitting({ userId, at })`**: in one transaction: re-check balance, `book(userId, -1, "sitting", id)`, insert `sittings` with the river and sky slices as fetched now, names, prayer, portrait key and sankalp text snapshotted from the profile, `seed = seedFor(...)`. Then render the sheet (Phase 6, `renderSheet(id)`) and store `image_key`. Rendering failure does not roll back the sitting; the page renders the sheet live until the image exists. Idempotent on `(userId, waterSlug, local date)`.
- [ ] **5.10 Tests.** Unit: reducer transitions, hold reset, `mintSitting` idempotency, balance never negative. E2E with a `?fast=1` query that scales durations by 0.05 in non-production only: complete a sitting, land on `/p/[id]`.
- [ ] **5.11 Verify on a real phone**, in the dark, at 390px: nothing scrolls, the hold works, the black screen stays black, the wake lock holds. Merge.

**Done when:** a paid, set-up user can complete a sitting on a phone and a row with a seed exists.

---

### Phase 6: The Sankalp Patra

**Why one renderer.** `src/components/patra/Sheet.tsx` is written in the subset of CSS that
satori supports (flex, absolute, no grid, no `cqw`), takes a `PatraRecord`, and is rendered
three ways: by `ImageResponse` at 1080 by 1350 for the share file, by `ImageResponse` at
1200 by 630 for the OG card (a cropped composition of the same parts), and as React on the
page. The existing A4 `SankalpPatra.tsx` stays as the owner's print view.

- [ ] **6.1 `PatraRecord`** (renamed in 1.6) gains `portraitUrl?`, `prayer?: { devanagari, roman }`, `names` already exists. `recordFromSitting(sitting, lang)` in `src/lib/patra.ts` formats dates, figures and labels for the locale. Unit test on a fixture sitting.
- [ ] **6.2 Layout, 1080 by 1350.** Top 320 pixels carry the name(s), the water and the date, because that is what WhatsApp shows in the preview. Then the portrait (if any) in a ruled frame at left, the engraved water band at right (deterministic hatching from the seed: line count and amplitude from the percentile, phase from the seed, drawn as `<svg>` paths satori can render, coordinates rounded). Then the prayer in Devanagari with the roman line under it. Then the register: modelled flow and band, percentile, tithi if sourced, kept at (local and IST), source. Foot: "Sankalp Patra · snanify.com/p/{id} · seed {seed16}". Spot colour on the folio only. The sankalp text is never in the image.
- [ ] **6.3 Fonts for satori.** Load Eczar and Noto Serif Devanagari as `ArrayBuffer` from `node_modules` at module scope, the way `src/lib/og-card.tsx` already does or should; verify that file and reuse its loader.
- [ ] **6.4 `renderSheet(id)`** in `src/lib/patra-render.ts`: `ImageResponse` → `arrayBuffer` → `putSheet(`sheet/${id}.png`)` public → update `sittings.image_key`. `/p/[id]/image/route.ts` redirects to the Blob URL, or renders live if the key is missing.
- [ ] **6.5 `/p/[id]` page.** Public, `FULL_ONLY`, rendered in the sitting's locale regardless of the URL locale (the link is shared, the reader may be anyone). Layout: the sheet image at full width, a share button under it (thumb zone), then the register as text (for search and for copy-paste), the seed with one sentence on how to recompute it, and "Kept in the name of" with the names. For the owner (signed in and `user_id` matches): the sankalp text above the sheet, a "print A4" link that opens the existing `PatraSheetViewer`, and a toggle for `is_public`. A private sitting renders a 404 for everyone else. `?new=1` auto-opens the share sheet once.
- [ ] **6.6 `<ShareButton>`**: `navigator.canShare({ files })` → `navigator.share({ files: [png], text, url })`. Fallback: `https://wa.me/?text=` with the text and the URL, and a download link for the PNG. Text, en and hi: "{name} kept a sankalp with the {water} this morning. {url}". Never a claim beyond that.
- [ ] **6.7 OG card** `/p/[id]/opengraph-image.tsx`: 1200 by 630, names, water, date, the water band, no portrait (a face in a link preview is a choice the sharer has not made). `generateMetadata` on the page sets title "{name} · {water} · {date}" and the description to the register's first line.
- [ ] **6.8 `/faq#verify`** entry: what a Patra shows, how the seed is recomputed, what is never shown (the sankalp text, email, payment). This replaces `/verify`.
- [ ] **6.9 Tests.** Unit: `recordFromSitting`, seed determinism, hatching determinism (same seed, same path string). E2E: share page renders for a public sitting, 404 for private, image route returns a PNG of 1080 by 1350.
- [ ] **6.10 Verify** by sending one real Patra to WhatsApp on a phone and looking at the preview. Merge.

**Done when:** a completed sitting produces a link whose WhatsApp preview shows the name, the water and the date, and whose image opens at 1080 by 1350.

---

### Phase 7: Return loop

- [ ] **7.1 Reminder cron.** `vercel.json` (or `vercel.ts`) cron: `/api/cron/reminders` every hour at minute 0. The route checks `Authorization: Bearer ${CRON_SECRET}`. `usersDueAt(nowUtc)`: users with `reminder_on`, balance ≥ 1, no sitting today in their zone, and whose `reminder_hour` in `tz` equals the current local hour. Unit test with fixture zones (Kolkata, Toronto, Berlin) across a DST boundary.
- [ ] **7.2 Reminder email.** `sendReminder({ to, lang, water, band, url })`: subject "The {water} this morning", one line with the band word, one link to `/today`, one line to change the hour. Rate: one per user per day, recorded by a `reminders_sent` column on `users` (`last_reminded_on date`) so a cron retry cannot double-send.
- [ ] **7.3 `/account`.** The register: one ruled line per sitting (date, water, band, a link), newest first. Credits balance and a button to `/begin`. Reminder hour and toggle. Edit profile → `/setup`. Sign out. Delete account: Clerk user, `users` row cascade, Blob keys removed, sittings deleted (their public links 404). Confirmation is a typed word, not a modal dialog.
- [ ] **7.4 Low credits.** When balance hits 1, the Patra page's share block gains one line: "One morning left" with a link to `/begin`. When 0, `/today` sends to `/begin` with the packs and the register visible. No email nag beyond the daily reminder.
- [ ] **7.5 Tests and merge.**

**Done when:** a user with credits gets one email at their hour, and `/account` shows their mornings.

---

### Phase 8: Launch

- [ ] **8.1 Real figures.** Replace the hero placeholders with real counts (sittings, countries from `users.tz`) or with a true statement that needs no number. Owner's call, recorded in `CLAUDE.md`.
- [ ] **8.2 Analytics events** via `@vercel/analytics` `track()`: `begin_view`, `checkout_start`, `purchase`, `setup_done`, `sitting_start`, `sitting_done`, `share_open`, `share_done`. No personal data in properties.
- [ ] **8.3 Legal.** Privacy, terms, the Indian-card FAQ entry, OIDAR decision recorded in section 4 above. `/ethics` names every processor.
- [ ] **8.4 Stripe live.** Live keys in Vercel production env, webhook endpoint registered for production, one real purchase of `one` by the owner, refunded.
- [ ] **8.5 Search Console.** Follow `docs/seo/search-console.md`: resubmit the sitemap, confirm the ten surface-locale URLs report as redirected, confirm the four deleted routes redirect.
- [ ] **8.6 Performance.** Lighthouse on a throttled mid-range Android profile for `/`, `/today`, `/p/[id]`: LCP under 2.5s on 4G, the sitting's JS under 120 KB gzipped. `RiverFlow` stays cheap.
- [ ] **8.7 Rollout.** Merge `feat/product` to `main`. Watch the Vercel runtime logs and the Stripe dashboard for the first day.

**Done when:** a stranger can find the site, pay, sit, share, and come back tomorrow, and nothing on the site claims something that did not happen.

---

## 6. After launch, argued from data, not from the docs

In rough order of expected value for a thirty-plus Indian audience:

1. **Razorpay and UPI**, when an Indian entity exists. This is the single largest unlock for in-India revenue.
2. **Gifting**: buy a pack for a parent, the parent sets up with a link. Names on the Patra already make this natural.
3. **Parva days**: Kartik Purnima, Makar Sankranti, Ganga Dussehra, Nashik 2027. A special folio treatment and an email the day before. Six spike days a year, as `docs/digital/growth.md` correctly concluded.
4. **A third locale**, chosen by the tz and locale data in `users`, not by guess. The ten files are waiting in git.
5. **Remembrance sittings** (in the name of someone who has died), with a plain treatment and no thumbnail. High value for this audience, high sensitivity, its own plan.

---

## 7. Self-review notes

- Every route in 3.3 has a phase step that creates it: `/begin` 3.3, `/begin/done` 3.5, `/setup` 4.3, `/today` 5.1, `/p/[id]` 6.5, image 6.4, OG 6.7, `/account` 7.3, sign-in 2.4, webhook 3.4, cron 7.1, privacy and terms 4.5.
- Every table in 3.2 has an owner: `users` 2.4, `profiles` 4.3, `purchases` and `credit_ledger` 3.4, `sittings` 5.9, `last_reminded_on` 7.2.
- Names used across phases: `SITTING` (1.8, 5.2, 5.3), `PatraRecord` (1.6, 6.1), `mintSitting` (5.9, 5.8), `renderSheet` (6.4, 5.9), `book` and `balance` (2.5, 3.4, 5.9, 7.1), `requireUser` (2.4, everywhere), `currentUser` (2.4, 2.7), `seedFor` (3.2 formula, 5.9).
- The two rules: the strongest claim on any surface is "kept in the name of" plus a date, a water and a modelled figure with its source. Checked in 1.6, 1.7, 5.4, 6.2, 6.6.
