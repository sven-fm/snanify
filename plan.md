# Snanify: the queue

What waits on whom. The spec is `CLAUDE.md`, the build `ARCHITECTURE.md`, the design
language `DESIGNSYSTEM.md`. Done items drop to the log at the foot, one line each.

---

## For you to review

1. **The whole order, on your phone.** Sign out, Begin, sign in, set up, the packs with
   your own names on the specimen, pay, sit. Judge the three-step line and "Your sheet
   is set".
2. **A real face through `/setup`.** The portrait now comes out in the five tones of the
   river plates. Send it from an iPhone, so HEIC is tried too.
3. **Pay as a stranger over https.** One press of Pay across the sign-in, landing on
   Stripe.
4. **One firewall rule.** Vercel, the snanify project, Firewall, Configure, Add rule:
   name "sheets", path starts with `/p/` and ends with `/image` or equals `/specimen`,
   action Rate limit 60 per 60 seconds by IP, then Deny. Save, Publish.
5. **The city pages and the loop.** `/panchang/leicester` and nineteen more, linked from
   `/panchang`; the sitting looped in a phone under "The five parts" on `/snan`.
6. **The panchang after the fix.** Every sankranti moved fifteen minutes later and every
   tithi end a minute earlier, to Drik's figures. Read `/panchang` and `/muhurat` once.

## Waiting for your go

1. **The hydration flake. P2.** React error 418 on 13 of 72 loads in the ten minutes
   after a production deploy, 0 of 118 afterwards, HTML byte-identical, none on a cold
   preview. A transient of the deploy, not the markup. `scripts/hydration-probe.mjs`
   measures it. Next step if it matters: a preview with `<Analytics />` swapped for
   `@vercel/analytics/react`, probed in its first ten minutes.
2. **Small things. P3.** A webhook e2e test in Stripe test mode; `sameAs` once a social
   profile exists.

## After launch, argued from data

Razorpay and UPI when an Indian entity exists; gifting a pack to a parent; parva-day
folios and the email the day before; a third locale chosen from the zone data in
`users`; remembrance sittings, with their own plan.

---

## Done

### 16 September 2026

- `/panchang/[city]` for twenty cities; the sitting looped on `/snan`.
- The panchang read off Drik: ayanamsa refitted, sun aberration in the tithi, a sankranti after sunset kept the next morning, a two-sunrise ekadashi on the second. Record in `docs/panchang-check.md`.
- The portrait in the five tones of the river plates.
- BotID on Pay and setup; a rate limit on the sheet image and the specimen; failures that cost somebody something mail the owner.
- A ruled hour picker on `/setup`; the Vercel CLI current; the 404 page's console line is the 404 itself.
- Decided: Apple Pay and Google Pay on; one database; the footer tagline stays.
- The repo without its past: forty parked locale files, the officiant-era docs, the two-tier locale types, the old names.
- Pounds live, tax-inclusive prices outside the US; the seed gone from every output; the distance to the water on the sheet.
- The account drawer on the phone; the sheet says where to get one; the recipient's page leads with the offer.
- The memento's plate and guilloche; a live clock on `/muhurat`; the sitting's water slowed, the stillness dark, the breath in red.
- Every "free to read" line gone; `/live` water flowing downward, a new Shipra plate; `/panchang` calendar first.
- The specimen in a phone on `/`, `/snan` and `/begin`, with the buyer's own names once set up.
- Set up before paying; one sign-in screen; one press of Pay across a sign-in; eleven first, the count as the name.
- Security: Next 16.3.5, the charge from the geo header, CSP, dotted paths 404, deletion order, constant-time cron secret.
- `/p/[id]` and `/begin` out of the Clerk route group: 320 KB of script became 10 KB.
- Press states, the four motions, photographs on a plate, the masthead's fold, ruled form marks.
- Copy: one figure a day; the FAQ without the critic's question; the 404 in the site's voice; the brand Latin in Hindi; `/llms.txt`.
- Reminders with one-tap unsubscribe; manifest, icons, theme colour, a calendar file.
- CI on `main`; `build-plan.md` and `README.md` folded away; `CLAUDE.md`, `ARCHITECTURE.md`, `DESIGNSYSTEM.md` rewritten to what is true.

### 7 to 16 September 2026

The build from nothing to the first real morning: two locales; Clerk, Neon and the ledger;
Stripe Checkout with Managed Payments and a webhook that books once; setup; the sitting;
the Sankalp Patra and its memento; the reminder and the register; occasion dates from
rules; the first real purchase, sitting and sheet.
