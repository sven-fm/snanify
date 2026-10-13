# Snanify audit before the Meta ads

Audit of www.snanify.com, 13 October 2026, as a first-time visitor from an ad on an iPhone.
Covered: the homepage, `/snan`, `/faq`, `/live`, `/rivers` and the path to sign-in, driven
on the live site with Playwright. Sign-in, setup and the pack picker were read in the code,
not clicked through: nothing was signed into, set up or paid for. The run came from Germany,
so prices showed in euros; a New Jersey visitor sees dollars.

**The site works.** Every public page loads. On a slowed-down 4G connection the main content
appears in about 1.4 seconds. Nothing scrolls sideways at phone width, and "Begin" sends a
signed-out visitor to sign-in. One React error showed on `/muhurat`: the hydration flake
already in `plan.md`. It does not touch the ad funnel.

---

## Fix before spending money

### 1. Tracking (built, 13 October 2026; waiting for the pixel ID)

**Built:** the Meta Pixel (PageView per route, ViewContent, InitiateCheckout,
CompleteRegistration) and Purchase from the Stripe webhook through the Conversions API,
hashed and keyed by the session. Off in the EU, the EEA, the UK and Switzerland until a
consent banner exists; the privacy page says so. It switches on when
`NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_TOKEN` are set in Vercel (`plan.md`, item 1).

- The site has no Meta Pixel and no Conversions API. Meta cannot optimise for purchases, and
  nobody can tell which ad sold anything.
- The CSP in `next.config.ts:32-33` would block Meta's script. Adding the pixel means allowing
  `connect.facebook.net` there too.
- The fix: the pixel on the pages, plus a server-side Purchase event sent from the Stripe
  webhook. This is the biggest gap.
- What exists already: Vercel Analytics records the funnel steps (`begin_view`,
  `sign_in_view`, `checkout_start`, `purchase`, `setup_done`). Use them to see where people
  drop off.

### 2. Signing in from inside Instagram and Facebook (open)

- People who tap an ad open the site inside the Instagram or Facebook app, not in Safari.
- Google often refuses sign-in inside those in-app browsers. A spoofed test got through,
  which does not prove a real phone will.
- The email link opens in the phone's normal browser, not back inside Instagram. If Clerk
  requires the same browser for email links, sign-in fails there.
- Test on a real phone: click a Facebook post linking to `/begin`, then try both Google and
  email. If either fails, most of the ad traffic stops at sign-in.

### 3. Copy that states things that are not true yet (done, 13 October 2026)

**Done:** the stillness answer now says Next leaves it early. The other three lines stay
by the owner's call: they are marketing copy.

These break the rule against fabricated claims, and a buyer who asks "who else does this?"
will catch them:

- `src/content/begin.ts:36`: "Most people take this one" on the pack picker.
- `src/content/trust.ts:234`: "Many people sit in the evening."
- `src/content/trust.ts:360`: "Yes, and many people do" about sitting in memory of someone.
- `src/content/trust.ts:227`: the black minute "cannot be skipped". Wrong: Next skips it, and
  `src/lib/sitting-plan.ts` notes the stillness was opened on 16 September 2026.

---

## Clarity and the call to action

### 4. The first screen does not say what is being bought (done, 13 October 2026)

**Done:** headline "A daily snan, wherever you live.", the sentence saying what happens,
the price and the button all inside 390 x 700; the river under them on a phone; the second
link goes to `/snan`.

- "The river comes to you" over a drawing is beautiful but abstract. A 55-year-old in Edison
  scrolling Instagram will not know what this is or what she gets.
- The line that explains it ("Sit three minutes… a sheet with your family's names… you send
  it home") is cut off at the bottom of the first screen.
- The red "Begin your snan" button is also below the first screen; only the sticky bar shows.
- `/snan` explains it far better on its first screen ("You choose a river. Every morning it
  shows you today's flow…"), with the price and the button. Send ad traffic to `/snan`, or
  bring that clarity up on `/`.

### 5. The sheet sits about 60% of the way down the homepage (done, 13 October 2026)

**Done:** the specimen is the second band, straight under the hero, with its own heading.

It comes after the river figures and the list of six waters. The sheet with the family's
names is what makes a buyer want this; it belongs much higher.

### 6. The river figures read as technical to this audience (done, 13 October 2026)

**Done:** one vocabulary in `src/content/flow.ts`. The state leads ("running full") and the
figure proves it, on the landing line and card, the reading, the sheet images, the printable
and `/live`.

"797 m³/s" and "86th percentile since 1997" are true and well made. To this audience they
read like a lab report, and they appear in the first sentence, in the river card and on the
sheet. Lead with feeling ("the Ganga is running high this morning") and keep the number as
the proof underneath.

### 7. "Begin" opens a bare sign-in box (done, 13 October 2026)

**Done:** the box in the site's own look, with the three steps and what comes next above it.
The flow is unchanged. "Secured by Clerk" stays: removing it is a paid Clerk plan.

- The visitor taps Begin and gets a generic "Sign in to Snanify" with nothing about what
  comes next: "two minutes to set up your sheet, then pick your mornings."
- The Clerk box uses a gradient button, rounded corners and a shadow, all banned by
  `DESIGNSYSTEM.md`. It is the one screen that looks borrowed, at the moment trust matters most.
- Asking for an account before a cold visitor has seen their own sheet is the locked order,
  so it stays. Watch the drop from `begin_view` to `setup_done` in the first week.

### 8. "Why eleven?" is answered with card fees (done, 13 October 2026)

**Done:** the answer is shagun: 11, 51, 101, 501.

The Money section of `src/content/trust.ts`. This audience knows 11, 51, 101 and 501 as
shagun amounts, and the rupee prices already use them. Card fees are an insider's reason and
sound defensive.

### 9. Smaller things a buyer will notice (mostly done, 13 October 2026)

**Done:** the sheet and setup name a place ("06:12 in New York"), and the specimen is a New
York family; `/about` shows the two founders. **Kept:** US sales tax at checkout, which
Americans expect. **Open:** more waters (below). New Jersey is only the first market; the ads
can run anywhere, and prices follow the visitor's country.

- **Sales tax at checkout.** US prices show before sales tax, so $11 becomes about $11.73 in
  New Jersey: a small surprise at the moment of paying.
- **The specimen sheet** prints "06:12 America/Toronto", a raw time zone identifier.
  "06:12 in Toronto" or "6:12 am EDT" reads like something for people.
- **Who is behind this.** Apart from the footer line "Prayagraj and Berlin", nothing says who
  makes it. Buyers this age ask "who is this?" before they type in a card number.
- **Rivers and audience.** The New Jersey diaspora is heavily Gujarati, and the Narmada is
  not among the six waters. Aim the first ads at audiences from the Ganga and Yamuna belt, or
  expect weaker results from Gujarati audiences.

### 10. A stale setup note (done, 13 October 2026)

**Done:** the note and the lede are written for a reader who arrives before paying.

The comment in `src/content/setup.ts` says the person filling the form "has already paid and
read /snan". Setup now comes before paying. It is only a comment, but the labels were written
on that assumption and may expect more context than a cold visitor has.

---

## This week, in order

1. The Meta Pixel (with the CSP change) and the server-side Purchase event. Built; set the
   two environment variables to switch it on.
2. Sign-in tested inside Instagram on a real phone. Open.
3. The untrue line removed. Done.
4. The top of `/` rewritten. Done.
5. The specimen sheet moved up the homepage. Done.
6. More waters: make the count derived rather than "six" in the copy, then the Narmada
   (Omkareshwar or Maheshwar), then the Sarayu at Ayodhya. About half a day of mechanical work
   and one to two days of sourcing and checking per river. Waiting for a go.
