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
   portrait copy. The portrait now comes out in the five tones of the river plates; judge
   it on a real face.
3. **One WAF rule, five clicks.** The code now carries Vercel BotID on the Pay and setup
   forms and a per-instance limit on the two routes that draw a sheet. The floor under
   that is a rate limit at the edge, which only the dashboard can set: Vercel, the
   snanify project, Firewall, Configure, Add rule. Name it "sheets"; condition Request
   Path starts with `/p/` and ends with `/image`, or equals `/specimen`; action Rate
   limit, 60 requests per 60 seconds by IP, then Deny. Save and Publish. BotID Deep
   Analysis is a paid switch on the same page if abuse ever shows.
4. **The branch `feat/queue`.** Everything since the repo clean-up is on it and deployed
   to a preview, nothing on `main`. Say the word and it fast-forwards to production.

## Waiting for your go

1. **The hydration flake on production. P2.** Now measured: React error 418 on 10 of 36
   loads in the ten minutes after a production deploy, 0 of 94 loads afterwards, with
   byte-identical HTML, and 0 of 24 loads of a cold preview. So it is a transient of the
   first minutes after a deploy, not a fault in the markup. `scripts/hydration-probe.mjs`
   reproduces the measurement; run it right after the next deploy. Next step if it
   matters: a preview with `<Analytics />` swapped for the framework-free
   `@vercel/analytics/react`, probed in its first ten minutes.
2. **The panchang by city. P2, a day.** `/panchang/[city]` for twenty diaspora cities,
   each with sunrise, Brahma muhurat and today's tithi in that zone.
3. **The sitting, shown before it is bought. P2, half a day.** A ten-second loop of the
   five screens under "The five parts" on `/snan`.
4. **Small things. P3.** A webhook e2e test in Stripe test mode (the nine unit tests
   already sign real payloads); `sameAs` once a social profile exists.

## After launch, argued from data

Razorpay and UPI when an Indian entity exists; gifting a pack to a parent; parva-day
folios and the email the day before; a third locale chosen from the zone data in
`users`; remembrance sittings, with their own plan.

---

## Done

### 16 September 2026

- The panchang read off Drik: the ayanamsa refitted (every sankranti was fifteen minutes early), sun aberration in the tithi, a sankranti after sunset kept the next morning, a two-sunrise ekadashi kept on the second; the record in `docs/panchang-check.md`.
- The portrait pressed to the five tones of the river plates, on the same paper.
- BotID on Pay and setup; a per-instance rate limit on the sheet image and the specimen.
- Failures that cost somebody something mail the owner: fulfilment, a sheet not drawn, a reminder not sent, a plate missing.
- A ruled hour picker on `/setup`; the Vercel CLI at 59.19.1; the 404 page's console line is the 404 status itself, nothing to fix.
- Decided: Apple Pay and Google Pay on; the production database stays for development; the footer tagline stays.
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
