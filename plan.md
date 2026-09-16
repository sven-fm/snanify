# The queue, from the first full review

Written 16 September 2026, the evening after a full review of the site and the
product: the stack and its security, the copy and its search surface, the path
from the landing page to a paid morning, and the design as it feels under a
thumb. `build-plan.md` is still the master spec; this file is the queue of
work it does not yet cover, in the order it should be done. Each item says
what is wrong, what done looks like, and what it must not break. The two
rules in `CLAUDE.md` apply to every line of copy touched here.

How the review was done: every route read in the code; `npm audit`, lint,
`tsc`, 173 unit tests and a production build run; every public page
screenshotted at 390 by 844 and 1440 by 900 with Playwright, in the day and
night editions; the signed-in pages and one whole sitting driven in Chrome on
the test account at phone width; production probed for headers, redirects,
robots, sitemap and unknown paths.

Priorities: **P0** blocks sending anyone the link, **P1** costs money or
readers now, **P2** makes it better, **P3** housekeeping. Items marked
**your call** change a rule in `DESIGNSYSTEM.md` or a product decision and
wait for a yes.

---

## A. Fix before anyone is sent the link

### A1. Next.js 16.3.0 carries two critical advisories. P0

**What is wrong.** `npm audit` reports GHSA-2xp9-vwfh-vxw4 (unauthenticated
remote code execution in the image optimisation API with AVIF input) and
GHSA-p293-qw3h-jr36 against `next` 16.0.0 to 16.3.2. The site runs 16.3.0.

**Done looks like.** `next` and `eslint-config-next` at 16.3.5 or later,
`npm audit --omit=dev` clean, the build green, both e2e specs passing.

**Must not break.** The proxy matcher, `serverExternalPackages`, the
12 MB action body limit, the `opengraph-image` exclusion.

### A2. Anyone can pay the rupee price from anywhere. P0

**What is wrong.** `src/proxy.ts` writes the currency to a cookie the browser
can read, and `startCheckout` in `src/app/[lang]/(app)/begin/actions.ts`
trusts that cookie before it looks at the geo header. The comment there says
a hidden form field would let somebody buy at the rupee price, and then reads
a value the same somebody controls. Set `snf-cur=INR` in devtools and eleven
mornings cost ₹501, about six dollars, and sixty cost ₹2,100, about twenty-five,
against $48.

**Done looks like.** The action derives the currency from
`x-vercel-ip-country` alone, or from a cookie the server signed (HMAC over
the value with a secret, checked before use). The cookie stays for display.
A unit test sends a forged cookie and gets the geo currency. Local
development, which has no geo header, keeps USD.

**Must not break.** The prerendered price in the markup, the `data-cur`
stamp, the `Price` component.

### A3. Any unknown path with a dot in it is a 500. P0

**What is wrong.** `/llms.txt`, `/ads.txt`, `/foo.png`, `/wp-login.php`:
every one answers 500 on production, and a local production build reproduces
it. The proxy matcher skips paths with a dot, so the segment lands in
`[lang]` unvalidated, the layout's metadata resolves the segment's
`opengraph-image`, and `src/lib/site-card.ts` reads `content["llms.txt"].hero`
and throws. Bots probe these paths all day; each one is a function
invocation and an error in the log, and monitors read a 500 as the site
being down.

**Done looks like.** `siteCard` and `[lang]/opengraph-image.tsx` narrow the
segment with `parseLang` and answer 404 for anything else; an unknown dotted
path returns the site's own 404 like `/foo` does. A real `/llms.txt` exists
(see C3). `curl -o /dev/null -w "%{http_code}" https://www.snanify.com/llms.txt`
prints 200 and `/foo.png` prints 404.

**Must not break.** The English `opengraph-image` at `/en/opengraph-image`,
which scrapers fetch unprefixed.

### A4. The shared sheet loads the sign-in bundle for strangers. P1

**What is wrong.** `/p/[id]` sits inside the `(app)` route group, so
`ClerkProvider` wraps the page a recipient opens from a family group. On a
local production build at 390 px the guest page transfers 323 KB of
JavaScript and paints first content at 3.6 seconds; the landing page moves
151 KB and paints at 80 ms. This is the page every new person sees first.

**Done looks like.** `/p/[id]` moves out of the `(app)` group. The owner check
is `currentUser()` on the server, the make-private form is a server action
and `ShareButton` needs no Clerk, so nothing on the page needs the provider.
Guest JS under 60 KB, first paint under a second on a throttled phone.

**Must not break.** The owner view, the `?new=1` auto-share, `setPatraPublic`.

### A5. Pay, sign in, land on the pack picker, pay again. P0

**What is wrong.** Pressing "Pay $11" as a stranger goes to `/sign-in` with a
return URL of `/begin?pack=eleven`. After Google or the emailed link the
buyer is back on the pack picker with the eleven card flagged and has to
find and press "Pay $11" a second time. Two presses of the same button, with
a sign-in between them, on a phone, is where a purchase is lost.

**Done looks like.** The Pay press records the intent (a short-lived cookie
or a nonce in the return URL), sign-in returns to `/begin?pack=eleven&go=1`,
and `/begin` with a signed-in user and a live intent creates the Checkout
Session on the server and redirects to Stripe without a second press. The
intent is single-use so a crawler or a stale link opens nothing.

**Must not break.** Currency read on the server (A2), the `checkout_start`
event, the cancelled return to `/begin?cancelled=1`.

### A6. Sign-in and sign-up are two screens and the first is the wrong one. P1

**What is wrong.** A first-time buyer lands on "Sign in" and has to notice
"New here? Create an account" under the card. Clerk 7 supports a combined
sign-in-or-sign-up flow that takes an email and does the right thing. The
page also has two headings and two ledes: ours ("Sign in", "Use Google, or a
link sent to your email...") and Clerk's ("Sign in to Snanify", "Your
mornings are where you left them").

**Done looks like.** One combined screen, one heading, one lede, Google
first, the email field second, "Continue" as the only button. The emailed
link path is tested on iPhone Safari with the Gmail app, where the link opens
in a new tab: the original tab must complete on its own.

---

## B. Tech stack, security, efficiency

### B1. Security headers. P1

Production sends HSTS and nothing else. Add in `next.config.ts` `headers()`:
`Content-Security-Policy` with `frame-ancestors 'none'` and an allowlist for
Clerk, Stripe and Vercel Analytics; `X-Content-Type-Options: nosniff`;
`Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy`
denying camera, microphone, geolocation, payment except for Stripe frames;
HSTS with `includeSubDomains; preload`. Test the CSP on `/sign-in`, `/begin`
and the Stripe return before shipping; a wrong CSP is a blank checkout.

### B2. Stripe Tax is not on. P1, your call

`createCheckout` sets no `automatic_tax`, so nothing is computed or added,
and the copy says "Prices show before local tax". The catalogue script gives
each product the SaaS tax code, which is the preparation for it. A seller
based in the EU owes VAT on digital services to EU consumers from the first
euro (OSS), and US states have thresholds. Decide: enable
`automatic_tax: { enabled: true }` with `billing_address_collection` and
the registrations in Stripe Tax, and either make the prices tax-inclusive so
€11 is €11 (recommended for a product whose hook is "eleven for eleven"),
or keep them exclusive and let Checkout add the line. Then fix the copy.

### B3. Deleting an account. P1

`deleteAccount` deletes our rows before the Clerk user, and cascades the
purchases and the ledger. If the Clerk delete fails the person can sign in
again and gets a fresh empty row; and a chargeback six months later is
answered from Stripe alone. Done: delete Clerk first, then rows; keep one
anonymised purchase record (session id, amount, currency, date, no user id)
or state plainly in `/privacy` that Stripe keeps the payment record; `remove`
in `src/lib/blob.ts` swallows errors, so a failed blob delete should be
retried or listed for a sweep.

### B4. Reminder emails have no one-click unsubscribe. P2

The reminder says "stop these reminders on your account page". Gmail and
Yahoo discount senders without `List-Unsubscribe` and
`List-Unsubscribe-Post` headers, and a daily message with no link out is what
gets marked spam. Done: a signed link (`/account/reminders?off=<token>`)
in the footer and both headers on the Resend call.

### B5. Local development writes to the production database. P2

`.env.local` carries the production `DATABASE_URL` with the Clerk development
instance, which is why one email holds two `users` rows and why
`scripts/grant.mjs` has to ask which. This review's test sitting wrote real
rows. Done: a Neon branch for development and one for Preview, pulled into
`.env.local`; production only from `main`.

### B6. Rate limits. P2

None on `startCheckout` (a signed-in bot can open Checkout Sessions all
night), on `saveProfile` (12 MB through sharp per request), or on the image
route for unstored sheets. Done: Vercel WAF rate-limit rules on `/begin`,
`/setup` and `/p/*/image` by IP, and a `last_checkout_at` guard of a few
seconds per user in the action. BotID on the pay form if abuse ever shows.

### B7. Small hygiene, one line each. P2 and P3

- `/begin/done` finds the purchase by session id alone; add `user_id` to the
  where clause.
- `startCheckout` builds `success_url` from the Host header; use
  `SITE_ORIGIN` in production, as `/p/[id]` already does.
- `authorised()` in the cron route compares secrets with `===`; use
  `crypto.timingSafeEqual`.
- The reminder loop sends one Resend call per person in series; fine to a
  few hundred people, then batch.
- HEIC: the portrait copy promises "JPEG, PNG or HEIC"; confirm on production
  that the sharp build Vercel installs decodes HEIC from an iPhone, or drop
  the word.
- No error reporting beyond `console.error` in function logs: a failed
  `keepThisMorning` is invisible. Add Sentry's free tier or a Vercel log drain
  with an alert on `patra: could not pre-render` and `fulfilment failed`.
- No CI: only `reminders.yml` exists. Add `ci.yml` running lint, `tsc`, unit
  tests and the two e2e specs on every push.
- e2e covers overflow and CTA hrefs only. Put `scripts/deliver-webhook.mjs`
  into a test that books credits in Stripe test mode and asserts the ledger.
- The 404 page logs "Encountered a script tag while rendering React
  component" on client navigation: a `<script>` inside a component; move it
  to metadata or `next/script`.
- Vercel CLI is behind (59.11.7 against 59.19.0).
- `CLAUDE.md` still says the landing hero carries placeholder figures
  (`1,20,000+ sankalps`, `48 countries`). The English and Hindi landing no
  longer print them; only the parked locale files do. Update the note.
- Consolidte build-plan.md into plan.md and update claude.md to reflect that plan.md is the "planning file" for every future work step. deprecate and delete build-plan.md afterwards, clean up claude.md after this whole plan.md has been worked off and no task remains open. simplify the claude.md so that it becomes an efficient master file.

### B8. Efficiency, what the numbers say. P2

Local production build, 390 px, first load:

| Page | JS | Fonts | All | First paint |
| --- | --- | --- | --- | --- |
| `/` | 151 KB | 122 KB | 321 KB | 80 ms |
| `/snan` | 0 | 86 KB | 118 KB | 56 ms |
| `/live` | 0 | 0 | 68 KB | 68 ms |
| `/p/[id]` guest | 323 KB | 0 | 344 KB | 3,588 ms |

The marketing pages are cheap and mostly static. The fonts are the largest
item on the landing: eight files. Consider two weights per family rather
than three, and `font-display: optional` for the body face so a slow phone
never swaps mid-read. `/live` is 19,773 px tall on a phone, about
twenty-three screens; see C6.

---

## C. Search, generative engines, copy

The structure is right: self-referential canonicals, a full hreflang cluster
with `x-default`, a 58-URL sitemap that agrees with it, robots, an Open Graph
image per page, and JSON-LD with Organization, WebSite, WebPage,
CollectionPage, FAQPage, Place, BodyOfWater and Dataset. No em dash anywhere
on the rendered pages. What follows is what is missing.

### C1. The freshness claim on the landing page. P1

**What is wrong.** `hero.record` prints "Six waters, refreshed forty-eight
times a day and ranked against every day since 1997." The page revalidates
forty-eight times a day; the model publishes one figure a day. A reader who
checks sees the same number all day, and the sentence has promised otherwise.
This is the second rule.

**Done looks like.** "Six waters, one figure a day, each ranked against every
day since 1997." Same shape, true.

### C2. The pack names. P1, your call

"Ek Dhara", "Gyarah", "Varsh Kosh" with Devanagari beside them are three
coined names the reader has to learn on the one table where they are
deciding to pay, and they take the top line of every card from the thing
being bought. `CLAUDE.md` retires coined names for exactly this reason.
Recommended: the count is the name. "One morning", "Eleven mornings", "Sixty
mornings", no Devanagari. Then the "Validity: Forever" row and the "Mornings: One" row go too, since the name
already says it. The tier `sub` field ("One snan", "Eleven snans") drops
with them: "snan" is the practice, "morning" is the unit, and the site
should use one word for the unit everywhere (labels, account, emails all
already say mornings).

### C3. `llms.txt` and the generative surface. P1

Answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude) read the
page text and, where present, `/llms.txt`. Done: `/llms.txt` written by hand
in the site's voice: what Snanify is in two sentences, the six waters with
their ghats, where the figures come from, the five parts with durations from
`SITTING`, the three prices in four currencies, the free pages, and links.
`/llms-full.txt` with `/faq` and `/snan` in full. Both static, in `public/`.
Add `sameAs` to the Organization once an Instagram or YouTube exists; entity
graphs are how these engines decide a brand is real.

### C4. Titles and the search intent of the diaspora. P1

Nobody searches "digital snan" yet. People search "kartik purnima 2026
date", "brahma muhurat time toronto", "pitru paksha 2026 dates usa", "ganga
snan online". The free surface has the pages for this and the titles do not
say so. Done:

- Occasion pages: "Kartik Purnima 2026: date, snan muhurat, and the Ganga
  that morning | Snanify", with the year, FAQ JSON-LD for "When is Kartik
  Purnima in 2026?" and BreadcrumbList. Today the title is the name plus a
  suffix.
- `/panchang`: title carries "today" and the year; the page gets WebPage and
  BreadcrumbList JSON-LD (it has none now, nor does `/kumbh`).
- `/rivers` meta description is 250 characters; cut to 155.
- Later, the biggest free lever: `/panchang/[city]` for twenty diaspora
  cities (Toronto, London, New Jersey, Bay Area, Houston, Leicester, Dubai,
  Singapore, Sydney...), each with sunrise, Brahma muhurat and today's tithi
  in that zone. Same data, twenty pages, the query people actually type.

### C5. Navigation and the footer. P2

`/panchang` and `/live` are the daily-return pages and `/panchang` is
reachable only from the footer, under "Company". Done: nav row becomes
The snan, Today (panchang), The rivers now, Sacred waters, Muhurat,
Questions; footer columns become "Practice", "Reference", "Legal".

### C6. Copy, page by page. P2

The writing is plain and free of generated rhythm; these are the places it
repeats itself or slips.

- **Three Begins on one phone screen.** Header BEGIN, hero BEGIN YOUR SNAN,
  sticky bar BEGIN. Keep the hero button and the bar; show the header CTA
  only once the hero has scrolled off, and let the bar appear at the same
  moment rather than from the first pixel.
- **The same pack paragraph on three pages.** "Eleven mornings, paid once.
  Take them on eleven days in a row or spread them through the year." is on
  `/`, `/snan` and `/begin` word for word, as is "Prices show before local
  tax." Each page has one job: the landing sells the hook, `/snan` explains
  the form, `/begin` shows prices and a button. Write each once for its job.
- **`/snan` hero lede** opens with a fragment: "Today's flow of the river you
  choose." Rewrite: "You choose a river. Every morning it shows you today's
  flow, and you sit with it for three minutes."
- **"Begin your snan"** appears four times on the landing page. The closing
  ("Begin tomorrow morning. Set it up tonight...") is the best line on the
  page and earns its button; the tariff's can go.
- **`/faq`** still answers "Why is the price different in India?". The two
  ladders are gone, a US reader never sees the rupee price, and the answer
  argues with a critic who is not in the room. Delete it. The contact address
  on `/faq` is `ethics@snanify.com`; everywhere else it is `hello@`. One
  address.
- **`/live`** is twenty-three screens on a phone. Six waters, each with a
  picture, a figure, eleven bars and a paragraph, then more. Cut to the six
  rows with picture, figure and rank, and put the eleven-day bars behind a
  tap on each.
- **Sitting copy.** "3 mornings left" is printed on every screen of the
  practice. It belongs on the done screen only.
- **Footer tagline** "A digital snan for Indians everywhere" leaves out the
  Nepali, Mauritian, Trinidadian and Fijian Hindu diaspora and children born
  abroad. Your call: "for everyone far from their river."
- **Brand in Hindi.** The Hindi title and Clerk strings transliterate the
  name as स्नानिफ़ाई while `DESIGNSYSTEM.md` keeps the wordmark Latin. Pick one;
  Latin "Snanify" inside Hindi sentences is the usual choice for a brand.
- **Sign-in page** doubled heading and lede (A6).

---

## D. Sign-up and conversion

The path today: landing, `/begin` (visible signed out), Pay, sign-in, back to
`/begin`, Pay again, Stripe, `/begin/done` polling, `/setup` (six fieldsets),
`/today`, Begin, three minutes, `/p/[id]?new=1` with the share sheet opening
on its own. A5 and A6 fix the sign-in loop. The rest:

### D1. Nobody can see the product before paying. P1

**What is wrong.** The Sankalp Patra is the artefact and the reason to pay,
and no page shows one. `/snan` describes it in seven ruled rows of words.

**Done looks like.** A real sheet for an Indian "John Doe" and "Jane Doe" (pick a real common name), phone-shaped with an iphone silhouette, on `/`, `/snan` and `/begin`:
one rendered from `specimenChihna` in `src/content/patra.ts` with a fictional
family and a real river day, labelled as a specimen. On the landing it
replaces the second paragraph of the "Six sacred waters" section; on `/snan`
it sits beside "The Sankalp Patra". A ten-second silent loop of the five
screens of the sitting under "The five parts" does the same for the form.

### D2. The pack picker on a phone. P1

**What is wrong.** Three equal cards stacked; the $2 pack is what the fold
shows and the eleven, the hero SKU, is the second card below it. The only
mark of the hero is a red border.

**Done looks like.** Eleven first and large, with the `misregister` second
impression that the design system reserves for emphasis, price in the
display face, one Pay button thumb-reachable in the first screen. One and
sixty as two ruled rows beneath, each with its price and a smaller Pay. On
desktop the three stay side by side with eleven raised.

### D3. Setup asks for everything before the first morning. P1, your call

**What is wrong.** Six fieldsets, about three phone screens: water,
photograph, up to five names, prayer, sankalp, hour. It comes after payment,
so most will finish it, but it stands between the receipt and the thing they
paid for, and a person who does not know what to write for a sankalp stops
there.

**Done looks like.** Two options => I WANT OPTION B. (a) Ask only what the first morning needs:
the water, one name, the sankalp; say "Enough to sit. Add a photograph, more
names and a prayer from your account page." (b) Keep all six and add a
three-step line at the top. Either way, three example sankalps under the
field, in English and Hindi, tap to use; and the hour picker defaults to
06:00 in the browser's zone with the zone named beside it.

FOOD FOR THOUGHT: one could even put the payment AFTER people entered the data for the first sit, because then they will already have invested time and energy. best practice for conversion...you tell me...

### D4. Pressing Pay shows nothing for two seconds. P2

`TrackedSubmit` has no pending state; creating a Checkout Session takes one
to two seconds on a phone and the button sits there. Done: `useFormStatus`,
the label becomes "Opening Stripe" and the button takes the pressed state
from E1. Same for "Send to family", which already disables but changes
nothing visible.

### D5. The return loop. P2

One daily email is the only way back. Done: a web app manifest with the
seal, `theme-color` for both editions, and after the first Patra a one-line
prompt to add the site to the home screen (this is opened at six in the
morning; the icon is how). An `.ics` for the chosen hour on `/account`.
Wallets: confirm Apple Pay and Google Pay are enabled in the Stripe
dashboard; on a phone they are most of the difference between a sale and a
card number typed in bed.

### D6. The rest, one line each. P2

- Header label for a signed-in phone reads "MORNINGS" alone; use the
  silhouette, or "Your mornings" if it fits.
- The sticky bar on the landing page has no `env(safe-area-inset-bottom)`
  padding (`Landing.tsx`); `/snan`'s bar has it.
- Add `sign_in_start` and `sign_in_done` events; the sign-in is the likeliest
  leak and today it is invisible between `checkout_start` and `purchase`.
- `/account`: the register rows do not read as links (no underline, no
  arrow); a chevron or the date in the spot colour on hover and press.
- The delete section is as prominent as the reminder; move it under a
  "Your account" details fold.
- The `?new=1` auto-share fires without a gesture and fails silently on
  iOS; keep it, and make the button itself the loud thing (E7).

---

## E. Design: from flat to pressed

The language is fixed and it is good: two colours, rules, tint, one serif,
one sans. It reads flat because nothing on it responds. Print is a physical
process, and the screen can borrow from the press rather than from software:
an impression under the thumb, ink that spreads, a plate that registers.
Every proposal below stays inside that idea. Where one touches a rule in
`DESIGNSYSTEM.md` it says so and waits.

### E1. The impression: press states everywhere. P0

**What is wrong.** There is no `:active` rule in the codebase and no
`active:` class. Every button has a hover colour, and a phone has no hover,
so on the device 90% of readers use, every button is a dead rectangle until
the next page arrives. This is most of "not premium yet".

**Done looks like.** One press vocabulary in `globals.css`, applied to every
button, link-button, summary, radio label and the vow box:

- On press, the surface moves 1 px down and 1 px right, as a plate landing
  on paper, and the ink darkens: solid buttons go to `--ink`, ghost buttons
  fill with ink at once (no transition in, 120 ms out), quiet links take the
  spot colour on the underline.
- A `.misregister` element on press collapses its 4 px offset to 1 px: the
  two impressions register under the thumb.
- `-webkit-tap-highlight-color: transparent` on everything, then our state;
  `touch-action: manipulation` on buttons and links.
- `navigator.vibrate(8)` when the vow hold starts and when the mark completes,
  where the browser has it (Android). Nothing on iOS, which has none.

**Must not break.** `prefers-reduced-motion`, keyboard focus rings, the
`CTA` span inside links (it needs the press too, via `:active` on the parent).

### E2. Four named motions and nothing else. P0

**What is wrong.** State changes are instant or absent: the phone menu pops
open, the theme swaps in one frame, the pack card's flag is a static border,
the Patra appears all at once after a three-minute practice. The sitting's
`Tick` counter is the one thing that arrives with grace.

**Done looks like.** Four motions defined once and named in
`DESIGNSYSTEM.md`, replacing "print does not animate":

| Name | What | Where |
| --- | --- | --- |
| `impress` | 80 ms press and release (E1) | every control |
| `pull` | the existing stepped `ink-in` entrance | sections, the Patra |
| `settle` | 240 ms, `cubic-bezier(0.2, 0.8, 0.3, 1)`, for a state change | menu, theme, tabs, selection |
| `flow` | continuous water | hero river, breath, stillness |

The phone menu slides down under the masthead rule with `settle`; the
profile menu the same. The theme toggle cross-fades the page over 200 ms.
The selected pack draws its spot border in from the left. The language
switch and the details folds open with `settle`.

**Your call.** This edits the Motion section of `DESIGNSYSTEM.md`, which
currently allows two motions.

### E3. The breath is a rectangle. P0

**What is wrong.** The emotional centre of the practice is a flat spot-colour
rectangle at 14% opacity growing and shrinking, with a countdown under it.

**Done looks like.** The waterline is the engraved `WaterBand` that already
carries the stillness and the Patra: the band's top edge rises for four
seconds and falls for six, its lines compress as it rises and open as it
falls, drawn as SVG paths with rounded coordinates, amplitude from the
percentile as now. "In" and "Out" set in the display face and cross-faded
with `settle` rather than swapped. The count moves to a small tabular figure
at the foot. Reduced motion keeps the words and a still band.

### E4. The practice owns the screen. P1

**What is wrong.** During the sitting the masthead stays, with the language
menu, BEGIN or MORNINGS, and the hamburger; "3 mornings left" is a link on
every screen; and on the reading, the vow and the mark the page is short
enough that the footer with twelve links shows under the practice.

**Done looks like.** From the press of Begin to the done screen, header and
footer are gone and the story bar is the only chrome; there is a fade animation and some swirls or river waves so that the users realizes something's "happening.
the stillness already does this, now we put it everywhere alon the snan. The morning count returns on the done screen. The done screen
holds the Patra's arrival (E7). There is an "x" to close and get back to the real world and "end" of the session. 

### E5. Photographs in the night edition print as negatives. P1

**What is wrong.** `.ink-picture` masks the ghat photograph over `--ink`. In
the day edition that is ink on paper. In the night edition the ink is
cream, so the picture renders as a photographic negative: seen on `/today`
and the account page.

**Done looks like.** In the night edition the picture is a positive on a
paper-coloured plate (a printed photograph pasted onto the dark page), or the
mask polarity is inverted so highlights stay light. Check all six pictures
in both editions.

### E6. Reveal on scroll shows grey blocks catching up. P1

**What is wrong.** Every section below the fold sits at opacity 0 until an
IntersectionObserver fires, then steps in with a stagger. Scrolled at phone
speed, headings and rows arrive dimmed a beat late (seen in Chrome on the
landing page), and any screenshot tool or preview captures the sections
blank.

**Done looks like.** Reveal only numerals, bars and pictures; text is always
there. Where the browser supports `animation-timeline: view()` use it with
no observer; elsewhere nothing moves. Full-page screenshots show the whole
page.

### E7. The sheet arrives. P2

After sixty seconds of black and the mark, `/p/[id]` appears complete in one
frame. Done: the sheet is pulled (`pull`) from its top edge down as if
drawn from the press, the send button rises after it with `settle`, and the
button carries the impression (E1). Same entrance for the guest.

### E8. Depth with paper, not shadows. P2, your call

Three small physical cues that stay inside the rules:

- The sticky masthead gets a fold: a 1 px `--paper-3` line under the rule
  that appears once the page has scrolled, so the header reads as a sheet
  over the page.
- Tint blocks get a 1 px `--paper-3` inner hairline inset 4 px, a plate edge.
- Night edition headings step up one weight (Eczar 700 exists), because
  light ink on dark paper spreads less; the day edition keeps 600.

### E9. Forms in the letterpress voice. P2

Native radios, a native `<select>` for the hour and a native checkbox with
`accent-color` sit inside a ruled page and look borrowed. Done: a square
ruled mark that fills with the spot colour when chosen, for radios and
checkboxes; the hour as a ruled row of twenty-four boxes that scrolls
horizontally on a phone (or a two-column list of the six morning hours
first); inputs with a 2 px ink underline instead of a full box, the rule
turning spot on focus. The water picker's chosen row takes the tint and a
2 px spot rule at its left edge.

### E10. The phone fold. P2

At 390 px the fold is the headline, the sun, the river band and two
full-width buttons; the sentence saying what this is sits below them. Done:
lede above the buttons; one solid button; "See the rivers live" as a quiet
underlined link; the sticky bar appears only after the hero button leaves
the screen (C6). The tap target of the theme toggle is 22 px wide; make it
44.

### E11. Small design items. P3

- `theme-color` meta for both editions so the browser chrome matches paper
  and night.
- The "N" of the Next dev badge overlaps the sticky bar in development only;
  ignore.
- The 404 page: add some quirky India / Snan-relevant language there...like "No snan here, so let's go back to snanify.com" or so.
- Desktop: the hero at 86svh with the lede over the river reads well; the
  nav row of caps labels is right. Desktop is the adaptation and it holds.

---

## F. Still open from before

- The recipient line's water name and date come out in English on the Hindi
  Patra page, because the view carries them once; set per edition.
- Read the dated occasions off Drik Panchang and record each match in
  `docs/panchang-check.md`
---

## Done, 15 and 16 September 2026

- The sitting says where you are: story bar, Next on the reading and the
  breath, a vow that waits for the hold, a stillness that announces itself.
- `/today` shows a morning already kept before it judges the balance.
- The Patra page for two readers: owner with send, sankalp and controls;
  guest with the sheet, one line and the invitation.
- Sending on a phone: the native share sheet with the image attached is
  enough for now.
- The source said plainly on `/rivers`, `/live`, `/faq` and in the structured
  data, and nowhere on a product surface; the copy guard enforces it.
- The calendar says the day: occasion dates computed from rules, checked
  against Drik Panchang.
- The sheet as a memento: 1080 by 1920, phone-shaped, the water across the
  whole page.
- Small things: the reading's source line, the masthead's "Your mornings"
  link, the owner's `one` purchase refunded.
