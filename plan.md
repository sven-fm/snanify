# Snanify: the queue

What is being built and what waits on whom. The spec is `CLAUDE.md`, the build is
`ARCHITECTURE.md`, the design language `DESIGNSYSTEM.md`. Done items drop to the log at
the foot as one line each.

---

## For you to review

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

## Waiting for your go

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

## After launch, argued from data

Razorpay and UPI when an Indian entity exists; gifting a pack to a parent; parva-day
folios and the email the day before; a third locale chosen from the zone data in
`users`; remembrance sittings, with their own plan.

---

## Done

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
- The repo without its past: the forty parked locale files, the officiant-era docs, the two-tier locale types and the old names gone.

### 7 to 16 September 2026, before the review

The build from nothing to the first real morning: the marketing surface cut to two
locales; Clerk, Neon and the ledger; Stripe Checkout with Managed Payments and a webhook
that books once; setup; the sitting with its story bar and vow; the Sankalp Patra and its
memento; the reminder and the register; occasion dates from rules; the first real
purchase, sitting and sheet.
