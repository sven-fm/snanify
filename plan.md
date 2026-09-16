# Snanify: the plan

This file is the spec and the queue. Read it before building anything. `CLAUDE.md`
holds the rules of the repo, `ARCHITECTURE.md` the stack, `DESIGNSYSTEM.md` the design
language. Everything in `docs/` is reasoning history and yields to this file.

The decisions in section 2 are the owner's and are not reopened inside a task. A task
that discovers it needs one reversed stops and says so.

---

## 1. What this is

A purely digital snan. At an hour the panchang names, you sit for three minutes with
the live published state of a sacred river in India and make your sankalp yourself,
wherever in the world you are. At the end you have a Sankalp Patra with your family's
names on it, to send home.

For Indians and the Hindu diaspora far from their river, thirty and over, in the US,
the UK, Canada, the Gulf, Singapore and Australia. English and Hindi. Over ninety
percent of readers arrive on a phone, at six in the morning, in bed.

## 2. Decisions, locked

| Question | Decision |
| --- | --- |
| Paying entity | Non-Indian. Stripe only, with Managed Payments on: Stripe is the merchant of record and charges and remits VAT and GST itself. Razorpay and UPI are a later phase if an Indian entity appears. |
| What is paid | The snan. One price, three packs (1, 11, 60), the Sankalp Patra included. Free forever: `/live`, `/panchang`, `/muhurat`, `/rivers`. |
| Prices | One morning $2, eleven $11, sixty $48; the same figures in euro and Canadian dollars; ₹101, ₹501, ₹2,100 in India. Eleven mornings cost eleven in every currency: that is the hook. Prices live in `src/content/prices.ts`. |
| Pack names | The count is the name: "One morning", "Eleven mornings", "Sixty mornings". No coined names, no Devanagari beside them. |
| The order | Begin, sign in, set up the sheet, pay, sit. The sheet is made before the packs are shown, and the packs are shown beside a specimen with the buyer's own names on it. |
| Locales | English and Hindi. Ten surface locales are parked in git, out of the registry. The brand stays Latin, "Snanify", in every edition. |
| On the Patra | Portrait (optional), up to five household names, one chosen prayer, the day's river figure and rank, the tithi, the time in the person's zone and in IST, a seed. The sankalp text is on the owner's copy only. |
| Sitting | Three minutes: reading 15s, breath 45s, sankalp hold 11s, stillness 60s, mark 20s. Durations in `src/lib/sitting-plan.ts` and nowhere else. Next leaves the reading, the breath and the stillness early; nothing lengthens. |
| Cadence | One Patra per completed morning, seeded by that day's river. |
| Sign-in | Clerk: Google and email link, on one combined screen. No phone OTP, no password. |
| Setup | All six fields (water, photograph, names, prayer, sankalp, hour), under a three-step line whose third step is the packs, with example sankalps to take as they are. |
| Data | GloFAS modelled discharge through Open-Meteo, one value a day. Named on `/rivers`, `/live`, `/faq` and in the structured data; shown plainly on every product surface. Never called "measured". |
| Names | The practice is **the snan**. The artefact is the **Sankalp Patra**. Jal Sankalp, Jal Chihna, Watermark, Jal Path, Shwas, Maun and Chihn are retired. |

### Why, in one line each

- **Stripe only.** Two processors is two webhooks, two reconciliations and an Indian company. The diaspora is the paying audience on day one.
- **The snan is paid.** One thing to explain, one thing to sell, and the sitting is the value. A paywall inside a three-minute ritual is worse than one before it.
- **Set up before paying.** The buyer pays for a thing already half made, with their family's names on it, rather than for a description.
- **Two locales.** Ten surface locales cost a font call, a copy file and a QA pass per page for pages nobody can buy from. They return when revenue justifies a translator.
- **One Patra per morning.** Eleven shareable moments per pack and a register that fills. The share is the growth channel.
- **Three minutes.** Long enough to be a practice, short enough to keep at 5:40 in bed on morning three.

## 3. The product, as the buyer sees it

1. **Landing.** One live sentence, the headline, the river, one button. The reading. A specimen sheet inside a phone beside the six waters. Eleven mornings for eleven. A colophon.
2. **Begin.** Sign in on one combined screen.
3. **Set up, once.** `/setup`: water, photograph, names, prayer, sankalp, hour, under three steps. About two minutes.
4. **Pay.** `/begin`: the third step. Eleven first and raised, one and sixty as ruled rows, beside the specimen with the buyer's own names. Pay once; Stripe; back with mornings on the account.
5. **Sit, each morning.** `/today`: Begin, and the practice takes the whole screen with the water running behind every part. The breath is the engraved water rising and falling. The vow is held under the thumb. The stillness is black. The mark writes itself. A cross in the corner leaves without spending.
6. **The Sankalp Patra.** `/p/[id]`: the sheet arrives, pulled from the press, and the share sheet opens with the image attached. WhatsApp is the target. The owner sees their own sankalp and the controls; a recipient sees the sheet, one line and the invitation.
7. **Tomorrow.** An email at the chosen hour saying what the river is doing, with a one-tap way out. The register on `/account` gains a line. A calendar file and the home-screen icon are the other ways back.

## 4. Architecture

`ARCHITECTURE.md`, in full. In one line: Next.js 16 on Vercel, one route tree in two
locales, Stripe Checkout and a webhook into an append-only ledger in Neon, Clerk for
identity, Blob for files, Resend for mail, a GitHub Actions cron for the hour.

## 5. Out of scope, by name

Everything in `docs/digital/` and `docs/product/` that is not in this file: Jal Stambha,
Jal Nimantran, Sang, Ghat Bahi, Sankalp Bahi, Pitru Tithi Panji, Founding Patra, Snan
Kosh credits, Nitya or Kul subscriptions, gifting scheduler, co-stewards, succession,
dormancy flows, the fifteen message types, the audio engine, the 54 nakshatra SEO pages,
the `@snanify_jal` account, `/deewar`, `/khandan`, the A3 print file, the SVG Jal Mudra,
WhatsApp Business messaging, Razorpay, phone OTP, the ten surface locales, referral caps,
streak mechanics, the year-end sheet. Any of these can return as its own item here,
argued from revenue.

---

## 6. For you to review

Things that exist and want your eyes, or that only you can do. Each is one look or one
dashboard.

### 6.1 The new order, on your phone

Sign out, press Begin on the landing page, and go through it: sign in, set up, the packs
with your own names on the specimen, pay, sit. Built and verified on the dev server on
16 September; it wants one pass by a person on a real phone. Two things to judge as you
go: whether the three-step line reads, and whether "Your sheet is set" on the pack page
is the right first line.

### 6.2 Production, after the deploys

- `/sign-in` renders the combined card clean under the new Content Security Policy
  (checked headless). Sign in with Google once; a violation shows in the console as
  "Refused to ...".
- Pay as a stranger over https and arrive on Stripe without a second press: the intent
  cookie is Secure and could only be tested on plain http locally.
- HEIC from an iPhone through `/setup`, or the word comes out of the portrait copy.
- Apple Pay and Google Pay: on in the Stripe dashboard's payment methods?

### 6.3 A Neon branch for development and preview

`.env.local` and the Preview environment point at the production database. Create a
branch in Neon, pull it into `.env.local`, set it on Preview, and production stays
`main`'s alone.

### 6.4 Rate limits

Vercel WAF rules by IP on `/begin`, `/setup` and `/p/*/image`, and BotID on the pay form
if abuse ever shows. Nothing in the code limits a signed-in bot from opening Checkout
Sessions all night.

### 6.5 Two lines of copy

- Footer tagline: "A digital snan for Indians everywhere" leaves out the Nepali,
  Mauritian, Trinidadian and Fijian diaspora and children born abroad. Alternative:
  "for everyone far from their river".
- The privacy page says payment records stay with Stripe; account deletion now removes
  the Clerk login before the rows. Read it once against what the code does.

### 6.6 Drik Panchang

Read the dated occasions off Drik and record each match in `docs/panchang-check.md`.

---

## 7. Waiting for your go

Built on your word. Each says what it is and roughly what it costs.

### 7.1 The hydration flake on production. P1, about half a day

On a share of loads of `/`, `/snan` and `/begin` (6 of 18, then 11 of 24, headless
Chromium at 390 px, 16 September) React throws error 418 and re-renders the whole page
on the client: the reader sees the page twice. The body's structure and text are
identical between the server HTML and the client render, so the mismatch is somewhere a
DOM diff does not show. Ruled out: the bundler (production flakes on webpack and
Turbopack alike; a plain local build of either never flakes, even throttled), the
analytics request, cookies. The previous production deployment could not be measured
(deployment protection). Next, in order: a preview without `<Analytics />`; a preview
with the two sync head scripts moved to `next/script` `beforeInteractive`; a preview
with the theme-colour viewport export removed. Whichever removes the error names the
cause.

### 7.2 Error reporting. P2, an hour

A failed `keepThisMorning` or a sheet that would not render is a `console.error` in
the function logs and nothing else. A Vercel log drain with an alert on
`patra: could not pre-render` and `fulfilment failed`, or Sentry's free tier.

### 7.3 The sitting, shown before it is bought. P2, half a day

A ten-second silent loop of the five screens under "The five parts" on `/snan`, the
way the specimen shows the sheet: a CSS-animated miniature of the story bar, the breath
and the black.

### 7.4 The panchang by city. P2, a day

`/panchang/[city]` for twenty diaspora cities (Toronto, London, New Jersey, the Bay
Area, Houston, Leicester, Dubai, Singapore, Sydney and on), each with sunrise, Brahma
muhurat and today's tithi in that zone. Same data, twenty pages, the query people
actually type. The biggest free lever there is.

### 7.5 Small things. P3, an hour each

- The e2e specs cover overflow and the CTA hrefs; put `scripts/deliver-webhook.mjs`
  into a test that books credits in Stripe test mode and asserts the ledger.
- The hour picker on `/setup` is a native `<select>`; a ruled row of hours is the
  letterpress version.
- The 404 page logs "Encountered a script tag while rendering React component" on a
  client navigation.
- `sameAs` on the Organization node once an Instagram or YouTube exists.
- Vercel CLI is behind (59.11.7 against 59.19.0).

## 8. After launch, argued from data

1. **Razorpay and UPI**, when an Indian entity exists.
2. **Gifting**: buy a pack for a parent, the parent sets up with a link.
3. **Parva days**: Kartik Purnima, Makar Sankranti, Ganga Dussehra, Nashik 2027. A special folio and an email the day before.
4. **A third locale**, chosen by the zone and locale data in `users`.
5. **Remembrance sittings**, in the name of someone who has died. High value, high sensitivity, its own plan.

---

## 9. Done

### 16 September 2026

- The memento: the band of water under the ghat's plate is gone, and the water across the page is a faint hairline guilloche, one weight, so the type reads as on a bank note. Sheets rendered before keep their old image.
- `/muhurat`: the worked example became a live clock, ticking from the phone: the ghat's time in IST, the reader's own zone under it, the same moment in six cities with the day shift, today's open or next window and today's sunrise at Har Ki Pauri.
- The sitting: the water behind the practice runs eight times slower; the stillness is dark again, with the words and the count and nothing else.
- Every "free to read" and "the snan is what you pay for" line is gone: the landing's free register, the `/live` closing block, the FAQ question, the ledes on `/snan`, `/rivers`, `/panchang` and the metas. The reference pages are in the nav and the footer; the tariff states the price.
- The flowing water bands draw every line at one weight with the fade on the container, so the loop has no visible period.
- The reading's fourth row, "From you": the distance to the ghat from the request's own coordinates, rounded to ten kilometres; the copy had promised it since the first plan and nothing computed it.
- `/live`: the engraved water over the foot of each plate flows downward only, tiled without a seam, covering the water in the photograph; Kaveri's lines in paper over its dark water; a new Shipra plate with the river in frame (Ram Ghat across the Shipra, Shruti Lata, CC BY-SA 4.0).
- Set up before paying: `/begin` sends a stranger to sign in and then to `/setup`; the packs are the third step, beside the specimen with the buyer's own names; the receipt says "sit tomorrow".
- Next.js 16.3.5; two critical advisories closed.
- The charge follows the geo header, never the cookie the browser can edit.
- Content-Security-Policy, nosniff, Referrer-Policy, Permissions-Policy, HSTS with preload.
- Unknown dotted paths get the site's 404 instead of a 500; `/llms.txt` exists.
- The share page and the pack picker left the Clerk route group: 323 KB and 320 KB of script became 10 KB and 7 KB.
- One press of Pay across a sign-in, via a short-lived intent cookie.
- One combined sign-in-or-up screen, one heading.
- The pack picker: eleven first and raised, one and sixty as ruled rows, a pending label on Pay, the refund line.
- Packs named by their count; the coined names and their Devanagari retired.
- The specimen sheet, drawn from today's Ganga figure and labelled on its face, inside a phone built around the sheet's own ratio with a masked screen, beside the six waters on `/` and beside the sheet's rows on `/snan`, and with the buyer's own names on `/begin`.
- Setup under a three-step line, three example sankalps, the hour defaulting to six with the zone named.
- The sitting takes the whole screen from Begin to done, water behind every part, the breath as the engraved band, a cross to leave, the count on the done screen only, haptics where the browser has them.
- Press states on every control; settle for menus and the theme; the masthead's Begin and the thumb rail wait for the hero's own button; the blanket section reveal gone.
- Photographs on a plate so the night edition prints positives; the masthead's fold; the tint's plate edge; night headings at 700; ruled form marks and fields.
- The Patra arrives pulled from the press; the register rows read as links; deletion under a fold; the `/live` registers fold away; the silhouette in the phone bar once signed in.
- "One figure a day" on the landing; the `/snan` lede a sentence; the FAQ drops the question that argued with a critic; one contact address; the pack paragraph written once per page; the 404 in the site's voice; the brand Latin in Hindi.
- The panchang in the navigation; footer columns Practice, Reference, Legal.
- Occasion titles carry the year and a "When is X in YEAR?" node; `/panchang` and `/kumbh` carry the graph; the rivers description cut to a snippet.
- The reminder carries a one-tap signed unsubscribe and the List-Unsubscribe headers.
- Account deletion removes the Clerk login before the rows; `/begin/done` looks the purchase up for its own user; the cron secret compared in constant time.
- A web app manifest, home-screen icons, theme colour, a calendar file for the hour, the home-screen line after the first morning, `sign_in_view` in the funnel.
- A CI workflow on pushes to `main` and pull requests; the portrait test given a timeout that survives a shared runner.
- `build-plan.md` folded into this file; `README.md` deleted; `CLAUDE.md` cut to the rules; `ARCHITECTURE.md` rewritten to what is true; `DESIGNSYSTEM.md` names the four motions and the paper cues.

### 15 and 16 September 2026, before the review

- The sitting says where you are: story bar, Next, a vow that waits for the hold, a stillness that announces itself.
- `/today` shows a morning already kept before it judges the balance.
- The Patra page for two readers; the native share sheet with the image attached.
- The source said plainly on `/rivers`, `/live`, `/faq` and in the structured data, and nowhere on a product surface; the copy guard enforces it.
- Occasion dates computed from rules, checked against Drik Panchang.
- The sheet as a memento: 1080 by 1920, the water across the whole page.
- Stripe live with Managed Payments; Clerk production with Google and the custom domain; the first real purchase, sitting and sheet.

### 7 to 14 September 2026, the build

Phases 0 to 7 of the original build plan: the marketing surface cut to nine routes and
two locales; the foundations (Clerk, Neon, the ledger); purchase through Stripe Checkout
and a webhook that books once; setup; the sitting; the Sankalp Patra and its image; the
return loop of reminder and register.
