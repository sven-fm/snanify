# Snanify: the queue

What waits on whom. The spec is `CLAUDE.md`, the build `ARCHITECTURE.md`, the design
language `DESIGNSYSTEM.md`. Done items drop to the log at the foot, one line each.

---

## For you to review

1. **Bing and the index, your steps. P1.** In Bing Webmaster Tools: add
   `https://www.snanify.com/` (or the domain by DNS), submit its sitemap, remove the old
   non-www sitemap; submit the top ten URLs by hand. Win five to ten real referring
   domains. Re-check coverage on 9 and 23 October 2026.

## Waiting for your go

1. **The hydration flake. P2.** React error 418 on 13 of 72 loads in the ten minutes
   after a production deploy, 0 of 118 afterwards, HTML byte-identical, none on a cold
   preview. A transient of the deploy, not the markup. `scripts/hydration-probe.mjs`
   measures it. Next step if it matters: a preview with `<Analytics />` swapped for
   `@vercel/analytics/react`, probed in its first ten minutes.
2. **A voice of its own for each indexed city. P1.** A "Snan in <City>" section for the
   thirty cities in `INDEXABLE_CITIES`, en and hi, 150 to 250 words each: local mandirs
   and community centres (name and neighbourhood), the water people use, the DST shift
   against IST, the festivals kept there. Only facts that can be sourced. Gate:
   `npm run seo:similarity` at or below 0.5 on every pair (twelve pairs are above it
   today; Brampton and Mississauga at 0.78). Then, once more than sixty of the seventy
   routes are indexed, the next twenty cities, each with its content first.
3. **Small things. P3.** A webhook e2e test in Stripe test mode; `sameAs` once a social
   profile exists.

## After launch, argued from data

Razorpay and UPI when an Indian entity exists; gifting a pack to a parent; parva-day
folios and the email the day before; a third locale chosen from the zone data in
`users`; remembrance sittings, with their own plan.

---

## Done

### 25 September 2026

- The index cut to seventy routes a locale (`src/lib/indexable.ts`): thirty cities, the
  dated occasions within 180 days plus Ganga Dussehra 2027, which already earns
  impressions; the rest `noindex, follow`, out of the sitemap, still live. IndexNow by hand
  only, at most 100 changed URLs a run; the deploy workflow gone. Eight nearest cities on
  a city page, not the whole country. A shorter homepage description; no `Host:` in
  robots.txt. `npm run seo:check` and `npm run seo:similarity`.

### 16 September 2026

- Reviewed and approved on the phone: the whole order, a real face through `/setup`, Pay as a stranger, the firewall rule, the city pages and the loop, the panchang after the fix.
- Twenty-two more dated occasion pages, Sharad Purnima 2026 to Janmashtami 2027, each read against Drik; Kaveri Sankramana by its own name; snippets that open with the day.
- The calendar to September 2028: thirty-two dated pages, five read against Drik; the Samvat computed; every page remade daily.
- `/panchang` split: the directory of 301 cities in 48 countries behind a filter, the shraddha guide on `/panchang/shraddha`, the occasion register and the clock table folded into `/muhurat`; the sitting looped on `/snan`.
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
