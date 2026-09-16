# Snanify: the plan

This file is the spec and the queue. Read it before building anything. `CLAUDE.md`
holds the rules of the repo; `ARCHITECTURE.md` the stack; `DESIGNSYSTEM.md` the
design language. Everything in `docs/` is reasoning history and yields to this file
where the two disagree.

The decisions below were taken by the owner on 7 September 2026 and are not reopened
inside a task. A task that discovers it needs one reversed stops and says so.

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
| Locales | English and Hindi. Ten surface locales are parked in git, out of the registry. The brand stays Latin, "Snanify", in every edition. |
| On the Patra | Portrait (optional), up to five household names, one chosen prayer, the day's river figure and rank, the tithi, the time in the person's zone and in IST, a seed. The sankalp text is on the owner's copy only. |
| Sitting | Three minutes: reading 15s, breath 45s, sankalp hold 11s, stillness 60s, mark 20s. Durations in `src/lib/sitting-plan.ts` and nowhere else. Next leaves the reading, the breath and the stillness early; nothing lengthens. |
| Cadence | One Patra per completed morning, seeded by that day's river. |
| Sign-in | Clerk: Google and email link, on one combined screen. No phone OTP, no password. |
| Setup | All six fields before the first morning (water, photograph, names, prayer, sankalp, hour), under a three-step line, with example sankalps to take as they are. |
| Data | GloFAS modelled discharge through Open-Meteo, one value a day. Named on `/rivers`, `/live`, `/faq` and in the structured data; shown plainly on every product surface. Never called "measured". |
| Names | The practice is **the snan**. The artefact is the **Sankalp Patra**. Jal Sankalp, Jal Chihna, Watermark, Jal Path, Shwas, Maun and Chihn are retired. |

### Why, in one line each

- **Stripe only.** Two processors is two webhooks, two reconciliations and an Indian company. The diaspora is the paying audience on day one.
- **The snan is paid.** One thing to explain, one thing to sell, and the sitting is the value. A paywall inside a three-minute ritual is worse than one before it.
- **Two locales.** Ten surface locales cost a font call, a copy file and a QA pass per page for pages nobody can buy from. They return when revenue justifies a translator.
- **One Patra per morning.** Eleven shareable moments per pack and a register that fills. The share is the growth channel.
- **Three minutes.** Long enough to be a practice, short enough to keep at 5:40 in bed on morning three.

## 3. The product, as the buyer sees it

1. **Landing.** One live sentence, the headline, the river, one button. The reading. A specimen sheet inside a phone beside the six waters. Eleven mornings for eleven. A colophon.
2. **Begin.** `/begin`: eleven first and raised, one and sixty as ruled rows. Pay once; a stranger signs in on one combined screen and is sent on to Stripe without pressing Pay again. Back on the site with mornings on the account.
3. **Set up, once.** `/setup`: water, photograph, names, prayer, sankalp, hour. Three steps on a line at the top. About two minutes.
4. **Sit, each morning.** `/today`: Begin, and the practice takes the whole screen with the water running behind every part. The breath is the engraved water rising and falling. The vow is held under the thumb. The stillness is black. The mark writes itself. A cross in the corner leaves without spending.
5. **The Sankalp Patra.** `/p/[id]`: the sheet arrives, pulled from the press, and the share sheet opens with the image attached. WhatsApp is the target. The owner sees their own sankalp and the controls; a recipient sees the sheet, one line and the invitation.
6. **Tomorrow.** An email at the chosen hour saying what the river is doing, with a one-tap way out. The register on `/account` gains a line. A calendar file and the home-screen icon are the other ways back.

## 4. Architecture, in one paragraph

Next.js 16 App Router on Vercel, one route tree under `src/app/[lang]/`, two locales
through `src/proxy.ts`. Stripe Checkout sells packs; the webhook books credits into an
append-only ledger in Neon Postgres through Drizzle; Clerk owns identity; Vercel Blob
holds portraits and rendered sheets; Resend sends the receipt and the reminder; a
GitHub Actions cron ticks the reminders hourly. The sitting is a client component that
ends in one server action, which mints the sitting row inside the same transaction as
the credit, renders the memento, and returns a public link. Full detail in
`ARCHITECTURE.md`. Providers are Vercel Marketplace resources except Resend, which is
the owner's own account.

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

## 6. The queue

Open work, in the order it should be done. **P1** costs money or readers now, **P2**
makes it better, **P3** housekeeping. Items marked **owner** need a dashboard, an
account or a decision only the owner has.

### 6.1 Payment before or after setup. Owner decision

The question raised on 16 September: should the buyer set up the sheet before paying,
so the time already invested carries them through checkout?

Recommendation: **yes, and it is a bigger change than it looks, so it is its own item.**
The order becomes Begin, sign in, set up, pay, sit. The evidence from paid consumer
products with a first-use ritual is consistent: activation before the paywall lifts
conversion, because the buyer is paying for a thing they have already half made and
can see (their own names on the specimen). It costs nothing here, since the setup form
is behind a sign-in anyway and a saved profile with zero mornings is harmless. What it
needs: `/setup` reachable with no credits, the setup form's last step becoming the pack
picker with the buyer's own names printed on the specimen, `/today` gating on credits
as it already does, and the receipt's "set up your sheet" line becoming "sit tomorrow".
About a day. Say yes and it goes first.

### 6.2 The hydration flake on production. P1

**What is wrong.** On a share of loads of `/`, `/snan` and `/begin` (6 of 18, then 11 of
24, measured with headless Chromium at 390 px on 16 September) React throws error 418
and re-renders the whole page on the client. The reader sees the page twice: once as
HTML, then again after the scripts arrive. The body's structure and text are identical
between the server HTML and the client render, so the mismatch is somewhere React
checks that a DOM diff does not show: the head, the body's child list at the moment of
hydration, or a hoistable.

**What is known.** A plain local production build does not flake, with either bundler,
even under a throttled network; a local Turbopack build did flake a little, a local
webpack build not at all, and production flakes on both, so the bundler is not the
cause and `next build` stays as it was. Blocking the analytics request and hiding
cookies made no difference. The previous production deployment could not be measured
(deployment protection).

**Next experiments, in order.** The local build with `VERCEL=1 VERCEL_ENV=production`
was also clean (0 of 14), though the analytics script tag did not render locally, so it
is not excluded. Deploy a preview without `<Analytics />` and measure it. Deploy a preview with the two sync head
scripts moved to `next/script` `beforeInteractive` and measure it. Whichever removes the
error names the cause.

### 6.3 Verify on production. P1

Everything below was verified on a local production build; each needs one look at
www.snanify.com after the deploy.

- The Content Security Policy with the production Clerk domain: `/sign-in` renders the
  card, Google sign-in completes, the Pay press lands on Stripe. A violation shows in
  the browser console as "Refused to ...".
- The stranger path over https: Pay as a stranger, sign in, and arrive on Stripe
  without a second press. The intent cookie is Secure and could not be tested locally.
- HEIC from an iPhone through `/setup`, or the word comes out of the portrait copy.
- Apple Pay and Google Pay on in the Stripe dashboard's payment methods.

### 6.4 A Neon branch for development and preview. P1, owner

`.env.local` and the Preview environment point at the production database. Create a
branch, pull it into `.env.local`, set it on Preview, and production stays `main`'s
alone. `scripts/grant.mjs` stops needing to ask which of two rows an email means.

### 6.5 Rate limits. P2, owner

Vercel WAF rules by IP on `/begin`, `/setup` and `/p/*/image`, and BotID on the pay
form if abuse ever shows. Nothing in the code limits a signed-in bot from opening
Checkout Sessions all night.

### 6.6 Error reporting. P2

A failed `keepThisMorning` or a sheet that would not render is a `console.error` in
the function logs and nothing else. Add a Vercel log drain with an alert on
`patra: could not pre-render` and `fulfilment failed`, or Sentry's free tier.

### 6.7 The sitting, shown before it is bought. P2

A ten-second silent loop of the five screens under "The five parts" on `/snan`, the
way the specimen shows the sheet. A CSS-animated miniature of the story bar, the
breath and the black, rather than a video.

### 6.8 The panchang by city. P2

`/panchang/[city]` for twenty diaspora cities (Toronto, London, New Jersey, the Bay
Area, Houston, Leicester, Dubai, Singapore, Sydney and on), each with sunrise, Brahma
muhurat and today's tithi in that zone. Same data, twenty pages, the query people
actually type. The biggest free lever there is.

### 6.9 Small things. P3

- The e2e specs cover overflow and the CTA hrefs; put `scripts/deliver-webhook.mjs`
  into a test that books credits in Stripe test mode and asserts the ledger.
- The hour picker on `/setup` is still a native `<select>`; a ruled row of hours is
  the letterpress version.
- The 404 page logs "Encountered a script tag while rendering React component" on a
  client navigation.
- Vercel CLI is behind (59.11.7 against 59.19.0).
- Footer tagline: "A digital snan for Indians everywhere" leaves out the Nepali,
  Mauritian, Trinidadian and Fijian diaspora and children born abroad. **Owner:**
  "for everyone far from their river", or keep.
- Read the dated occasions off Drik Panchang and record each match in
  `docs/panchang-check.md`.
- `sameAs` on the Organization node once an Instagram or YouTube exists.

## 7. After launch, argued from data

1. **Razorpay and UPI**, when an Indian entity exists.
2. **Gifting**: buy a pack for a parent, the parent sets up with a link.
3. **Parva days**: Kartik Purnima, Makar Sankranti, Ganga Dussehra, Nashik 2027. A special folio and an email the day before.
4. **A third locale**, chosen by the zone and locale data in `users`.
5. **Remembrance sittings**, in the name of someone who has died. High value, high sensitivity, its own plan.

---

## 8. Done

### 16 September 2026, the review and its cut

The full review of the site and the product (stack, copy and search, the path from the
landing page to a paid morning, the design under a thumb), and everything it found, in
one day:

- **Security.** Next.js 16.3.5 (two critical advisories closed). The charge follows the
  geo header and never the cookie the browser can edit. Content-Security-Policy, nosniff,
  Referrer-Policy, Permissions-Policy and HSTS with preload. The cron secret is compared
  in constant time. `/begin/done` looks the purchase up for its own user. Account
  deletion removes the Clerk login before the rows.
- **Correctness.** Unknown dotted paths (`/llms.txt`, `/foo.png`) get the site's 404
  instead of a 500: the proxy skips only the files that exist in `public/`, and the root
  page checks its own locale.
- **Weight.** `/p/[id]` and `/begin` left the Clerk-wrapped route group: the guest sheet
  page went from 323 KB of JavaScript and a 3.6 s first paint to 10 KB.
- **Conversion.** One press of Pay: a stranger signs in and is sent on to Stripe by the
  intent cookie. One combined sign-in-or-up screen. Eleven first and raised on `/begin`,
  one and sixty as ruled rows, a pending label on Pay, the refund line. The specimen
  sheet, drawn from today's figure, inside a phone on `/`, `/snan` and `/begin`. Setup
  under a three-step line with example sankalps, the hour defaulting to six with the
  zone named. A web app manifest, home-screen icons, theme colour, a calendar file for
  the hour, the home-screen line after the first morning. `sign_in_view` in the funnel.
- **Copy.** Packs named by their count. "One figure a day" on the landing. The `/snan`
  lede is a sentence. The FAQ drops the question that argued with a critic; one contact
  address. The pack paragraph written once per page. Navigation gains the panchang;
  footer columns are Practice, Reference, Legal. The 404 in the site's voice. The brand
  stays Latin in Hindi. Occasion titles carry the year and a "When is X in YEAR?"
  FAQ node; `/panchang` and `/kumbh` carry the graph; `/llms.txt`.
- **The practice.** The sitting takes the whole screen from Begin to done, water
  running behind every part, a cross to leave, the count of mornings on the done screen
  only. The breath is the engraved band rising and falling. Haptics where the browser
  has them. The Patra arrives pulled from the press.
- **Design.** Press states on every control (the impression), settle for menus and the
  theme, the masthead's Begin and the thumb rail waiting for the hero's own button, the
  blanket section reveal gone, photographs on a plate so the night edition prints them as
  positives, the masthead's fold, the tint's plate edge, night headings at 700, ruled
  form marks and fields, the silhouette in the phone bar once signed in, the register
  rows reading as links, deletion under a fold. The `/live` registers fold away.
- **Email.** The reminder carries a one-tap signed unsubscribe and the List-Unsubscribe
  headers.
- **Repo.** A CI workflow. `build-plan.md` folded into this file. `CLAUDE.md` cut to the
  rules. `DESIGNSYSTEM.md` names the four motions and the paper cues.
### 15 and 16 September 2026, before the review

- The sitting says where you are: story bar, Next, a vow that waits for the hold, a
  stillness that announces itself.
- `/today` shows a morning already kept before it judges the balance.
- The Patra page for two readers; the native share sheet with the image attached.
- The source said plainly on `/rivers`, `/live`, `/faq` and in the structured data, and
  nowhere on a product surface; the copy guard enforces it.
- Occasion dates computed from rules, checked against Drik Panchang.
- The sheet as a memento: 1080 by 1920, the water across the whole page.
- Stripe live with Managed Payments; Clerk production with Google and the custom domain;
  the first real purchase, sitting and sheet.

### 7 to 14 September 2026, the build

Phases 0 to 7 of the original build plan: the marketing surface cut to nine routes and
two locales; the foundations (Clerk, Neon, the ledger); purchase through Stripe Checkout
and a webhook that books once; setup; the sitting; the Sankalp Patra and its image; the
return loop of reminder and register.
