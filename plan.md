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
| Prices | One morning $2, eleven $11, sixty $48; the same figures in euro, pounds and Canadian dollars (sixty is €45, £42, C$48); ₹101, ₹501, ₹2,100 in India. Every price outside the US is tax-inclusive; US dollars show before sales tax. Eleven mornings cost eleven in every currency: that is the hook. Prices live in `src/content/prices.ts`. |
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

## 5. Out of scope

Everything in `docs/` that is not in this file, including the whole officiant-era
feature set, which `docs/digital/README.md` names so nobody rebuilds it by accident.
Any of it can return as its own item here, argued from revenue.

---

## 6. For you to review

Things that exist and want your eyes, or that only you can do.

1. **The new order, on your phone.** Sign out, press Begin, go through sign-in, set-up,
   the packs with your own names on the specimen, pay, sit. Judge the three-step line
   and the first line on the pack page, "Your sheet is set".
2. **Two production checks.** Pay as a stranger over https and land on Stripe without a
   second press (the intent cookie is Secure, so it could not be tried on plain http).
   Send a HEIC photograph from an iPhone through `/setup`, or the word comes out of the
   portrait copy.
3. **Apple Pay and Google Pay** on in the Stripe dashboard's payment methods.
4. **A Neon branch for development and preview.** `.env.local` and Preview point at the
   production database. Create a branch, pull it into `.env.local`, set it on Preview.
5. **Rate limits.** Vercel WAF rules by IP on `/begin`, `/setup` and `/p/*/image`;
   BotID on the pay form if abuse shows.
6. **Footer tagline.** "A digital snan for Indians everywhere" or "for everyone far from
   their river".
7. **Drik Panchang.** Read the dated occasions off Drik and record each match in
   `docs/panchang-check.md`.

## 7. Waiting for your go

1. **The hydration flake on production. P1, half a day.** On a share of loads of `/`,
   `/snan` and `/begin` React re-renders the whole page on the client (error 418).
   Server HTML and client render are identical in structure and text; ruled out: the
   bundler, analytics, cookies; a plain local build never flakes. Next: previews
   without `<Analytics />`, with the head scripts moved to `next/script`, and without
   the theme-colour viewport export, measured one by one.
2. **Error reporting. P2, an hour.** A Vercel log drain with an alert on
   `patra: could not pre-render` and `fulfilment failed`, or Sentry's free tier.
3. **The sitting, shown before it is bought. P2, half a day.** A ten-second loop of the
   five screens under "The five parts" on `/snan`.
4. **The panchang by city. P2, a day.** `/panchang/[city]` for twenty diaspora cities,
   each with sunrise, Brahma muhurat and today's tithi in that zone.
5. **Small things. P3.** A webhook e2e test in Stripe test mode; a ruled hour picker on
   `/setup`; the 404 page's script-tag warning on client navigation; `sameAs` once a
   social profile exists; the Vercel CLI update.

## 8. After launch, argued from data

Razorpay and UPI when an Indian entity exists; gifting a pack to a parent; parva-day
folios and the email the day before; a third locale chosen from the zone data in
`users`; remembrance sittings, with their own plan.

---

## 9. Done

### 16 September 2026

- Pounds live, tax-inclusive prices outside the US, the tax line per currency.
- The seed gone from every output; the distance to the water on the sheet, the reading and the ready screen.
- The phone's silhouette opens a drawer with the account's rows.
- The sheet says where to get one; the recipient's page leads with the offer; the print version prints only filled cells.
- The memento without the band under the plate, its water a faint guilloche.
- `/muhurat`: a live clock at the ghat and in six cities; today's window and sunrise.
- The sitting: slower water behind the practice, the stillness dark, the breath's water in red.
- Every "free to read" line gone; the flowing bands at one weight.
- `/live`: the water flows downward over the foot of each plate; a new Shipra plate.
- `/panchang`: the calendar first, one measure for the prose.
- The specimen sheet inside a phone on `/`, `/snan` and `/begin`, with the buyer's own names once set up.
- Set up before paying; one combined sign-in screen; one press of Pay across a sign-in.
- The pack picker: eleven first, the count as the name.
- Security: Next 16.3.5, the charge from the geo header, CSP and the other headers, dotted paths 404, deletion order, constant-time cron secret.
- `/p/[id]` and `/begin` out of the Clerk route group: 323 KB and 320 KB of script became 10 KB and 7 KB.
- Press states on every control, the four named motions, photographs on a plate, the masthead's fold, ruled form marks.
- Copy: one figure a day; the `/snan` lede; the FAQ without the critic's question; the 404 in the site's voice; the brand Latin in Hindi; occasion titles with the year; `/llms.txt`.
- Reminders with a one-tap unsubscribe; a manifest, icons, theme colour, a calendar file.
- CI on pushes to `main`; `build-plan.md` and `README.md` folded away; `CLAUDE.md`, `ARCHITECTURE.md` and `DESIGNSYSTEM.md` rewritten to what is true.

### 7 to 16 September 2026, before the review

The build from nothing to the first real morning: the marketing surface cut to two
locales; Clerk, Neon and the ledger; Stripe Checkout with Managed Payments and a webhook
that books once; setup; the sitting with its story bar and vow; the Sankalp Patra and its
memento; the reminder and the register; occasion dates from rules; the first real
purchase, sitting and sheet.
