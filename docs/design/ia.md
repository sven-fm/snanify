# Snanify, Information Architecture & Page Map (Phase 2)

> Facet: **Information architecture & page map**  
> Adversarial review verdict: **needs-work**

## Summary

Snanify grows from one bilingual landing page into a 30-route site organised around four surfaces: a static credibility layer (rivers, ethics, muhurat, priests), a five-step booking flow at /begin, a public Sankalp Patra certificate with independent verification, and a live/idle ghat experience. Locale stays exactly as it is publicly, English unprefixed, Hindi at /hi, but the implementation moves from duplicated route groups to a single app/[lang] tree with a proxy.ts rewrite, because the current switchHref constant already breaks the language toggle the moment a second page exists. Slugs are identical in both locales (Latin-script Sanskrit terms), so hreflang pairing is mechanical and WhatsApp-shared links stay readable. The build order is ranked to front-load credibility with zero backend: six static river pages, an ethics page, and a sample Sankalp Patra come before payments; the first thing that genuinely needs a database is Stripe Checkout at rank 7. Two integrity defects in the live MVP, the fabricated "1,20,000+ sankalps / 48 countries" stats and the hardcoded "Live now" badge, are P0 and must be fixed before any of this ships.

## Decisions

**Keep the public URL scheme exactly as-is, English unprefixed at /, Hindi at /hi/…, but replace the duplicated (en)/(hi) route groups with a single src/app/[lang]/ tree plus a proxy.ts rewrite.**

*Why:* The route tree must not be authored twice. At 30 routes the (en)/(hi) duplication means 60 page files that will drift, and the content object becomes one un-code-split 5,000-line module shipped to every page. The proxy rewrite keeps every existing URL and inbound link valid while collapsing the tree to one copy.

**Use identical Latin-script slugs in both locales: /rivers/ganga-haridwar and /hi/rivers/ganga-haridwar. Only the /hi prefix differs.**

*Why:* Devanagari URLs percent-encode into unreadable strings when pasted into WhatsApp, which is the primary diaspora sharing channel. Identical slugs also make hreflang pairing mechanical (path → /hi+path) with no translation table, and 'ganga' is already the Sanskrit word. The proxy is the single place to add a slug map later, so the decision is reversible.

**Booking draft state lives server-side, keyed by an opaque httpOnly cookie (snf_draft), not in localStorage or a client store.**

*Why:* Price and slot availability must be computed on the server at the review step and re-validated at checkout; a client-held draft is a trivially forgeable price. It also survives the locale switch (different route group, same origin) and gives you abandoned-draft recovery for free.

**Never build a card form. Step 4 is a server action that 303-redirects to hosted checkout, Stripe Checkout for non-INR, Razorpay hosted for INR, and the webhook, not the redirect, is the source of truth for booking confirmation.**

*Why:* Zero PCI scope, no card fields anywhere in this repo, and Indian card mandates/UPI async settlement are handled by the provider. UPI in particular can settle seconds after redirect, so a redirect-trusted confirmation would show 'confirmed' for payments that later fail.

**The ghat idle state shows a dated still frame with a visible timestamp caption, never looping footage, and the live pill only illuminates on a real feed state.**

*Why:* A looping video in a player labelled anything ambiguous is indistinguishable from a fake live stream. The entire product rests on the claim that the rite is real and happening now; the empty state is where that claim is either kept or broken.

**No field in the booking flow asks what is wrong. Sankalp presets are neutral (health, study, new home, journey, gratitude, remembrance, peace of mind, and 'let it remain unspoken'), all unchecked, and there is no 'what is troubling you?' prompt.**

*Why:* This is the anti-manipulation constraint expressed in the schema rather than in a policy document. A form that elicits misfortune before showing a price is grief-mining regardless of intent.

**Pitru (ancestor) reminders are user-initiated only, default off, and the reminder email says only 'You asked to be reminded of [name]'s tithi.' There is no automated 'shraddha is approaching, book now' campaign.**

*Why:* Automated death-anniversary marketing is the single most predictable way this product becomes indefensible. Removing the capability from the design is cheaper than governing it later.

**Sankalp Patra IDs are 22-character base58 (~128 bits), certificates default to 'unlisted' with noindex, and third-party verification at /verify/[id] returns a masked name (R••••• S•••••) plus river, ghat and date, never the sankalp text.**

*Why:* The sankalp is a private intention. A verification endpoint that leaks it turns every shared certificate into a disclosure. Unguessable IDs make enumeration of other people's certificates impossible without an auth system existing yet.

**Ranked build order puts six static river pages, /ethics, /how-it-works and a watermarked sample Patra ahead of payments; the first route needing a database is rank 7.**

*Why:* The repo has no DB, no auth and no payments today. The dominant objection to a digital snan is 'is this real', not 'can I pay'. Static pages that show six real ghats in detail and state plainly what is and is not claimed buy more credibility per engineering hour than any transactional feature.

**Auth is email magic link only, no passwords, no OAuth, and no account is ever required to book; the confirmation email carries a one-time claim token.**

*Why:* The audience skews older diaspora, where password reset is the top support cost. Requiring an account before the first purchase is a conversion tax on the revenue path for a product most people buy once.

**All muhurat slots ship with panchang.confidence: 'provisional' and a visible 'Timing to be confirmed against the panchang' label until a real provider is wired.**

*Why:* Hard constraint: no invented astronomical timings may be presented as fact. Modelling confidence as a field forces every surface that renders a time to also render its provenance, and makes 'we have not sourced this yet' a first-class state rather than an omission.

**Fix two integrity defects in the shipped MVP before building anything: delete the '1,20,000+ sankalps / 48 countries' stats, and make the 'Live now · Har Ki Pauri' hero badge data-driven or remove it.**

*Why:* Both are fabricated trust signals in production right now. The stats are invented social proof; the badge asserts a live stream that does not exist. Cost is a content edit measured in minutes and it is the highest credibility-per-minute item on the entire roadmap.

---

> **Scope note.** This repo today has **no database, no authentication, no payments, and no streaming vendor.** Everything below is designed so that ranks 0-5 of the build order ship with none of those. Every placeholder is marked `PLACEHOLDER`. No panchang date, priest name, temple partnership or usage statistic in this document is a factual claim.

---

# 0. P0 integrity fixes (do these before anything else)

Two things are live right now that this document cannot be built on top of.

| # | Location | Problem | Fix |
|---|---|---|---|
| P0-1 | `src/lib/content.ts` → `hero.stats` | `1,20,000+ Sankalps offered`, `48 Countries served` are fabricated trust statistics presented as fact. | Delete both. Keep `6 · Sacred waters`, which is true. Replace the two slots with verifiable non-numeric assurances: EN `Performed at the ghat` / `Recorded, always`, HI `घाट पर ही संपन्न` / `सदैव रिकॉर्ड` |
| P0-2 | `src/lib/content.ts` → `hero.badge` = `"Live now · Har Ki Pauri, Haridwar"` | Asserts a live stream that does not exist. | Make it a server-read of ghat status (§6). Until `/api/ghat/status` exists, change to the honest non-claim: EN `Six ghats · six sacred waters` / HI `छह घाट · छह पवित्र जल` |
| P0-3 | `src/lib/content.ts` → `hero.card` (`04:24 IST`, `opens in 6h 12m`) | A specific muhurat time, hardcoded. | Either read from the muhurat JSON (§4, rank 4) with the provisional label, or restyle the card to name the *window* not the time: EN `Brahma Muhurat · Ganga, Haridwar` with `Timings published with each occasion`. |
| P0-4 | `src/lib/content.ts` → `switchHref: "/hi"` (constant) | The language toggle discards the current path. Correct on the landing page only; wrong on every page added after this. | Replace with `localePath(other, usePathname())`, see §11. |

---

# 1. URL & locale scheme

## 1.1 Public URL shape (unchanged from today)

```
English   https://www.snanify.com/rivers/ganga-haridwar
Hindi     https://www.snanify.com/hi/rivers/ganga-haridwar
```

- English is **unprefixed**. Hindi is **`/hi` prefixed**. This is already true of `/` and `/hi` and does not change.
- **Slugs are identical in both locales.** `rivers`, `muhurat`, `begin`, `patra`, `ghat`, `account`, Latin script, both languages.
- `/en/*` **308-redirects** to `/*` so there is exactly one canonical URL per (page, locale).
- No automatic locale redirect ever. A first-time visitor whose `Accept-Language` starts with `hi` sees a dismissible strip: `हिंदी में पढ़ें →`. Crawlers see stable URLs; humans are not teleported.
- `snf_lang` cookie (`Lax`, 1 year) is set **only** by an explicit toggle click and is used for analytics and email language, never for redirects.

## 1.2 Why identical slugs

Devanagari path segments percent-encode into `%E0%A4%A8%E0%A4%A6%E0%A5%80…` when pasted into WhatsApp, the primary diaspora sharing channel, which reads as spam. Identical slugs also mean hreflang pairing is `path → "/hi" + path` with no lookup table, and one sitemap generator. If localized slugs are ever wanted, `proxy.ts` is the single insertion point for a slug map; the decision is reversible for the cost of one object literal.

## 1.3 hreflang / canonical (every page)

```ts
alternates: {
  canonical: lang === "hi" ? `/hi${path}` : path,
  languages: { "en-IN": path, "hi-IN": `/hi${path}`, "x-default": path },
}
```

---

# 2. Complete route map

**Legend, `Kind`:** `S` = fully static (SSG, no backend). `I` = ISR from checked-in or CMS data, read-only. `A` = needs real application state (DB / session / payment / stream). `H` = route handler, no UI.

## 2.1 Marketing & credibility layer

| Route (EN) | Route (HI) | Kind | Purpose | Primary user question | Key UI |
|---|---|---|---|---|---|
| `/` | `/hi` | S | Landing (exists) | *What is this?* | Hero, six rivers, three steps, muhurat teaser, three tiers, closing |
| `/rivers` | `/hi/rivers` | S | Index of the six sacred waters | *Which river should I choose?* | 6 cards: photograph, ghat name, place, one-line significance, `Next window` line, `Choose this water` CTA → `/begin/sankalp?river=…` |
| `/rivers/[river]` | `/hi/rivers/[river]` | S | One water in depth ×6 | *Is this a real place, and why this one?* | Hero photograph with caption + date, `What this water is for` (200-300 words), `The ghat` (location, a static map still, what is visible on camera), `The rite as performed here` (step list), `Upcoming windows` (3, from muhurat data), `Recordings from this ghat` (3), CTA |
| `/how-it-works` | `/hi/how-it-works` | S | Expanded three steps | *What actually happens, physically?* | Timeline: what you submit → what the priest does → what is streamed → what you receive. Explicit `Nothing is shipped to you` block. A 40-second silent explainer video slot (`PLACEHOLDER`) |
| `/sankalp` | `/hi/sankalp` | S | The three offerings in full | *What am I paying for?* | Full comparison table (not the 3-feature teaser on `/`), what is included/excluded per tier, currency note, `Choose` CTAs carrying `?tier=` |
| `/muhurat` | `/hi/muhurat` | I | Occasion calendar | *When can I do this?* | 12-month list grouped by month; each row: occasion, month, rivers observing it, `Timing to be confirmed against the panchang` badge where provisional. Sourcing note in the footer of the list, always visible |
| `/muhurat/[occasion]` | `/hi/muhurat/[occasion]` | I | One occasion | *What is Kartik Purnima and should I book it?* | What the occasion is (150 words, sourced, cited), which of the six waters observe it, the windows offered, provenance block naming the panchang source, CTA |
| `/priests` | `/hi/priests` | S | Who performs the rite | *Who is doing this in my name?* | Per-ghat cards: photograph, name, affiliation, years at that ghat, tradition. **Every field `PLACEHOLDER` until real people consent in writing.** Ships behind a feature flag; do not publish placeholder humans |
| `/ethics` | `/hi/ethics` | S | Ethics & rites | *Is this legitimate, or is it a scam?* | Plain-language statements of what is and is not claimed (see §12), what happens to your data, what we will refuse to do, who to complain to |
| `/patra` | `/hi/patra` | S | What a Sankalp Patra is | *What do I actually receive?* | Anatomy diagram of the certificate, `See a sample →` `/patra/sample`, verification explainer |
| `/patra/sample` | `/hi/patra/sample` | S | A watermarked example | *Show me.* | Real certificate layout, fictional data, `SAMPLE / नमूना` watermark across it, no verify link |
| `/verify` | `/hi/verify` | S | Verification entry | *Is this certificate genuine?* | Single input (ID or pasted URL), `Verify` button. No account, no cookie, no rate-limit prompt below 10/min |
| `/faq` | `/hi/faq` | S | Objection handling | *…but what about…* | ~24 questions, accordion, anchor-linkable (`/faq#refund`) |
| `/about` | `/hi/about` | S | Who runs this | *Who are you?* | Founding story, where the company is registered (`PLACEHOLDER`), where the team is |
| `/contact` | `/hi/contact` | S | Support | *Something is wrong.* | Email, WhatsApp number (`PLACEHOLDER`), IST support hours, `Have your booking reference (SNF-…) ready` |
| `/press` | `/hi/press` | S | Media | *Can I write about this?* | Logo pack, brand guidelines, factual boilerplate, contact. **No press quotes until real** |
| `/privacy` | `/hi/privacy` | S | Legal | | DPDP Act 2023 + GDPR |
| `/terms` | `/hi/terms` | S | Legal | | |
| `/refunds` | `/hi/refunds` | S | Legal | *What if I change my mind?* | §5.9 verbatim |

## 2.2 Booking flow, the revenue path

| Route (EN) | Route (HI) | Kind | Purpose |
|---|---|---|---|
| `/begin` | `/hi/begin` | H | Creates a draft + cookie, 307 → `/begin/sankalp`. Forwards `?tier=`, `?river=`, `?occasion=`, `?ref=` |
| `/begin/sankalp` | `/hi/begin/sankalp` | A | Step 1, names, gotra, intention |
| `/begin/muhurat` | `/hi/begin/muhurat` | A | Step 2, river, timezone, slot |
| `/begin/review` | `/hi/begin/review` | A | Step 3, confirm, contact, consent |
| `/begin/pay` | `/hi/begin/pay` | A | Step 4, server action → hosted checkout |
| `/begin/confirmed/[ref]` | `/hi/begin/confirmed/[ref]` | A | Step 5 confirmation, .ics, live link |

## 2.3 Ghat (live experience)

| Route (EN) | Route (HI) | Kind | Purpose |
|---|---|---|---|
| `/ghat` | `/hi/ghat` | A | Hub, what is live now, what is next, recent recordings |
| `/ghat/[river]` | `/hi/ghat/[river]` | A | One ghat's stream + its 30-day schedule |
| `/watch/[snanId]` | `/hi/watch/[snanId]` | A | Recording playback. Unlisted by default; `?k=` token for share |

## 2.4 Certificate

| Route (EN) | Route (HI) | Kind | Purpose |
|---|---|---|---|
| `/patra/[patraId]` | `/hi/patra/[patraId]` | A | An issued Sankalp Patra |
| `/verify/[patraId]` | `/hi/verify/[patraId]` | A | Third-party verification result (masked) |

## 2.5 Account

| Route (EN) | Route (HI) | Kind | Purpose |
|---|---|---|---|
| `/enter` | `/hi/enter` | A | Magic-link request |
| `/enter/check` | `/hi/enter/check` | S | "Check your email" |
| `/account` | `/hi/account` | A | Overview, next snan, patra count |
| `/account/upcoming` | `/hi/account/upcoming` | A | Scheduled snans; Varsh remaining-slot scheduler |
| `/account/snans` | `/hi/account/snans` | A | Past snans → recording + patra |
| `/account/parivar` | `/hi/account/parivar` | A | Saved people (autofill for step 1), max 24 |
| `/account/pitru` | `/hi/account/pitru` | A | Ancestors, kept deliberately separate |
| `/account/receipts` | `/hi/account/receipts` | A | Invoices, PDF |
| `/account/settings` | `/hi/account/settings` | A | Email, phone, timezone, language, default patra visibility, notifications |
| `/account/data` | `/hi/account/data` | A | JSON export + account deletion (30-day grace) |

## 2.6 Route handlers & metadata (locale-independent, no `/hi` twin)

| Route | Method | Purpose |
|---|---|---|
| `/api/booking/draft` | `POST` `PATCH` | Create / patch server-side draft. Zod-validated |
| `/api/booking/[ref]/status` | `GET` | Polled by the confirmed page during async settlement |
| `/api/muhurat/slots` | `GET` | `?river=&from=&to=&tz=` → `MuhuratSlot[]`. Cached 60s |
| `/api/muhurat/hold` | `POST` `DELETE` | 15-minute soft hold on a slot |
| `/api/checkout/session` | `POST` | Idempotent checkout session creation |
| `/api/webhooks/stripe` | `POST` | Signature-verified. **Source of truth for `confirmed`** |
| `/api/webhooks/razorpay` | `POST` | Same, INR |
| `/api/auth/magic` | `POST` | Issue magic link, rate-limited 5/hour/email |
| `/api/auth/callback` | `GET` | Consume one-time token → session cookie |
| `/api/ghat/status` | `GET` | `{river, state, playbackId, startsAt, viewers}`. Cache 10s |
| `/api/patra/[id]/pdf` | `GET` | A4 + US Letter PDF/A |
| `/api/verify/[id]` | `GET` | Public JSON, masked. `Access-Control-Allow-Origin: *` |
| `/api/booking/[ref]/ics` | `GET` | Calendar file |
| `/patra/[patraId]/opengraph-image` |, | Dynamic certificate OG card |
| `/sitemap.xml` |, | Both locales with hreflang alternates |
| `/robots.txt` |, | Disallow `/begin/`, `/account/`, `/api/` |
| `/.well-known/snanify-patra.pub` | `GET` | Ed25519 public key for signature verification |

## 2.7 Target file tree

```
src/
  proxy.ts                          ← locale rewrite (Next 16 name; not middleware.ts)
  app/
    [lang]/
      layout.tsx                    ← the single root layout
      page.tsx                      ← landing
      opengraph-image.tsx
      rivers/page.tsx
      rivers/[river]/page.tsx
      muhurat/page.tsx
      muhurat/[occasion]/page.tsx
      sankalp/page.tsx
      how-it-works/page.tsx
      priests/page.tsx
      ethics/page.tsx
      faq/page.tsx
      about/page.tsx
      contact/page.tsx
      press/page.tsx
      (legal)/privacy/page.tsx
      (legal)/terms/page.tsx
      (legal)/refunds/page.tsx
      begin/layout.tsx              ← flow chrome: stepper, no site nav
      begin/page.tsx                ← redirect to step 1
      begin/sankalp/page.tsx
      begin/muhurat/page.tsx
      begin/review/page.tsx
      begin/pay/page.tsx
      begin/confirmed/[ref]/page.tsx
      ghat/page.tsx
      ghat/[river]/page.tsx
      watch/[snanId]/page.tsx
      patra/page.tsx
      patra/sample/page.tsx
      patra/[patraId]/page.tsx
      patra/[patraId]/opengraph-image.tsx
      verify/page.tsx
      verify/[patraId]/page.tsx
      enter/page.tsx
      enter/check/page.tsx
      account/layout.tsx            ← auth gate
      account/page.tsx
      account/{upcoming,snans,parivar,pitru,receipts,settings,data}/page.tsx
      not-found.tsx
      error.tsx
    api/…
    sitemap.ts
    robots.ts
  content/
    en/{common,landing,rivers,muhurat,sankalp,begin,ghat,patra,account,legal}.ts
    hi/{…same…}.ts
    index.ts                        ← typed registry, `satisfies` per namespace
  lib/
    i18n.ts                         ← getDict, localePath, alternates
    catalog.ts                      ← rivers, ghats, tiers (language-keyed entities)
    booking/{schema,draft,pricing,slots}.ts
    patra/{render,sign,verify}.ts
  components/…
```

---

# 3. Catalog (canonical slugs & entity data)

`src/lib/catalog.ts`. This is **data, not copy**, a river's Hindi name is an attribute of the river, so it lives here, keyed by language, not in the page dictionaries.

```ts
export const RIVERS = [
  { slug: "ganga-haridwar",     tz: "Asia/Kolkata", name: { en: "Ganga",          hi: "गंगा" },        ghat: { en: "Har Ki Pauri",  hi: "हर की पौड़ी" }, place: { en: "Haridwar",  hi: "हरिद्वार" },  note: { en: "Moksha · the great purifier", hi: "मोक्ष · महाशोधिनी" } },
  { slug: "triveni-prayagraj",  tz: "Asia/Kolkata", name: { en: "Triveni Sangam", hi: "त्रिवेणी संगम" }, ghat: { en: "Sangam",        hi: "संगम" },        place: { en: "Prayagraj", hi: "प्रयागराज" }, note: { en: "Where three waters meet",     hi: "तीन धाराओं का मिलन" } },
  { slug: "yamuna-mathura",     tz: "Asia/Kolkata", name: { en: "Yamuna",         hi: "यमुना" },        ghat: { en: "Vishram Ghat",  hi: "विश्राम घाट" },  place: { en: "Mathura",   hi: "मथुरा" },     note: { en: "Bhakti · the beloved",        hi: "भक्ति · प्रियतमा" } },
  { slug: "godavari-nashik",    tz: "Asia/Kolkata", name: { en: "Godavari",       hi: "गोदावरी" },      ghat: { en: "Ram Kund",      hi: "रामकुंड" },     place: { en: "Nashik",    hi: "नासिक" },     note: { en: "Dakshin Ganga",               hi: "दक्षिण गंगा" } },
  { slug: "shipra-ujjain",      tz: "Asia/Kolkata", name: { en: "Shipra",         hi: "शिप्रा" },        ghat: { en: "Ram Ghat",      hi: "रामघाट" },      place: { en: "Ujjain",    hi: "उज्जैन" },     note: { en: "Ground of the Kumbh",         hi: "कुंभ की भूमि" } },
  { slug: "kaveri-talakaveri",  tz: "Asia/Kolkata", name: { en: "Kaveri",         hi: "कावेरी" },       ghat: { en: "Talakaveri",    hi: "तलकावेरी" },    place: { en: "Kodagu",    hi: "कोडगु" },     note: { en: "Ganga of the south",          hi: "दक्षिण की गंगा" } },
] as const;

export const TIERS = [
  { slug: "ekal",    usd: 11,  maxNames: 1, snansPerYear: 1,  pitru: false, name: { en: "Ekal Snan", hi: "एकल स्नान" } },
  { slug: "parivar", usd: 31,  maxNames: 6, snansPerYear: 1,  pitru: true,  name: { en: "Parivar",   hi: "परिवार" } },
  { slug: "varsh",   usd: 108, maxNames: 6, snansPerYear: 12, pitru: true,  name: { en: "Varsh",     hi: "वार्षिक" } },
] as const;
```

Occasion slugs are `{occasion}-{gregorian-year}`: `kartik-purnima-2026`, `makar-sankranti-2027`, `mahashivratri-2027`, `ganga-dussehra-2027`. Year in the slug because the tithi moves; a bare `/muhurat/kartik-purnima` would silently become wrong.

---

# 4. Muhurat data & the panchang honesty rule

```ts
export type MuhuratSlot = {
  id: string;                 // "ganga-haridwar-2026-11-24-brahma"
  riverSlug: string;
  occasionSlug?: string;
  startsAtUtc: string;        // ISO 8601, UTC. NEVER store local wall time.
  endsAtUtc: string;
  window: "brahma" | "pratah" | "madhyahna" | "sandhya" | "custom";
  panchang: {
    source: "PLACEHOLDER_PANCHANG_PROVIDER";
    computedAt: string;
    tithi?: string; nakshatra?: string; yoga?: string; karana?: string;
    confidence: "sourced" | "provisional";
  };
  capacityTotal: number;      // policy default 40, CONFIRM WITH OPS
  capacityRemaining: number;
  status: "open" | "filling" | "full" | "closed" | "cancelled";
};
```

**Rules that are not optional:**

1. Every slot ships `confidence: "provisional"` until a named provider is wired. Provisional slots render the badge, EN `Timing to be confirmed against the panchang` / HI `समय पंचांग से पुष्ट किया जाना शेष`, on **every** surface that shows the time (`/muhurat`, `/muhurat/[occasion]`, step 2, review, confirmation, email, the certificate).
2. A provisional slot **is** bookable, but the confirmation copy must state: EN `This timing may shift by up to 30 minutes once confirmed. You will be told the moment it is.` / HI `पुष्टि के बाद यह समय 30 मिनट तक आगे-पीछे हो सकता है। परिवर्तन होते ही आपको सूचित किया जाएगा।`
3. **Provisional tithi/nakshatra values are omitted from the Sankalp Patra entirely.** A certificate never carries an unsourced astronomical claim; it carries the Gregorian date and the ghat, which are facts.
4. `/muhurat` carries a permanently visible provenance line: EN `Panchang timings are sourced from [PROVIDER] and computed for the coordinates of each ghat. Where a timing is not yet confirmed we say so.` / HI `पंचांग के समय [PROVIDER] से लिए जाते हैं और प्रत्येक घाट के अक्षांश-देशांतर पर गणित हैं। जो समय अभी पुष्ट नहीं, वह स्पष्ट रूप से अंकित है।`

Rank-4 implementation is a checked-in `src/content/data/muhurat.2026-2027.json`. No database.

---

# 5. The booking flow (exhaustive)

## 5.0 Shape

- Layout: `app/[lang]/begin/layout.tsx`. **Site nav is replaced** by a 4-dot stepper + wordmark + `Save & leave`. No footer, no pricing links, no language-toggle loss (toggle preserves step and draft).
- Steps are **real routes**, not client-side tabs: back button, refresh, and a WhatsApp-shared step link all work.
- Draft lives server-side; cookie `snf_draft` = 32-byte opaque id, `httpOnly`, `Secure`, `SameSite=Lax`, 7-day TTL. Mirrored to `sessionStorage` for instant field restore on back-nav only, never authoritative.
- Autosave: 800ms debounce → `PATCH /api/booking/draft`. Indicator states: `idle` → `Saving…` → `Saved` (fades after 2s) → `Not saved` (persistent, with retry, exponential backoff 1/2/4/8s).
- Every step re-validates the **entire** draft server-side before rendering. Client validation is UX only.

## 5.1 Entry points and their params

| From | URL |
|---|---|
| Hero / nav CTA | `/begin` |
| Pricing card | `/begin?tier=parivar` |
| River page | `/begin?river=ganga-haridwar` |
| Occasion page | `/begin?occasion=kartik-purnima-2026` (implies river choice narrowed) |
| Ghat page | `/begin?river=…&slot=…` |
| Account rebook | `/begin?repeat=SNF-2K6B-9QX4` (prefills names + gotra, **not** the sankalp text, intentions are not recycled by default) |

Unknown/invalid params are dropped silently, never error.

## 5.2 Step 1, `/begin/sankalp`

**Heading** EN `Take sankalp` / HI `संकल्प लें`
**Lede** EN `The name you give is the name that will be spoken at the ghat.` / HI `आप जो नाम देंगे, वही घाट पर पुकारा जाएगा।`

### Fields

**`tier`**, radio card group, required. `ekal | parivar | varsh`. Prefilled from `?tier=`; otherwise `ekal` preselected with all three visible and priced.

**`sankalpis[]`**, 1 row for Ekal; 1-6 for Parivar and Varsh.

| Field | Type | Req | Rules | Label EN / HI |
|---|---|---|---|---|
| `fullName` | text | ✅ | trim, collapse whitespace, NFC normalize, 2-60 graphemes, `/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u` | `Name as it should be spoken` / `जो नाम पुकारा जाए` |
| `nameScript` | segmented |, | `latin \| devanagari`, auto-set from first keystroke, user-overridable | `Script on the Patra` / `पत्र पर लिपि` |
| `gotra` | combobox (90 entries + free text) |, | ≤40 chars, letters only | `Gotra` / `गोत्र` |
| `nakshatra` | select (27 + `Not known`) |, | | `Nakshatra` / `नक्षत्र` |
| `rashi` | select (12 + `Not known`) |, | | `Rashi` / `राशि` |
| `relation` | select |, | rows 2-6 only: `self, spouse, son, daughter, mother, father, brother, sister, other`. Affects Patra ordering only, nothing ritual | `Relation` / `संबंध` |
| `isPitru` | checkbox |, | Parivar/Varsh only | `This name is offered for someone who has passed` / `यह नाम किसी दिवंगत के लिए अर्पित है` |

`gotra` helper text (this is load-bearing, it removes a real anxiety):
EN `If you do not know your gotra, leave it blank. By long practice, Kashyap gotra is used for those who do not know theirs.`
HI `यदि गोत्र ज्ञात न हो तो रिक्त छोड़ दें। परंपरा में अज्ञात गोत्र के लिए कश्यप गोत्र लिया जाता है।`

`fullName` helper:
EN `The priest speaks this aloud during the sankalp. Use the name you are called by.`
HI `संकल्प के समय पुरोहित यही नाम स्वर में पुकारते हैं। जिस नाम से आप पुकारे जाते हैं, वही लिखें।`

When `isPitru` is checked, the row heading changes to EN `Offered in remembrance of` / HI `स्मरण में अर्पित` and nothing else changes. **No additional prompt, no date-of-passing field at this step, no imagery, no colour change.** Restraint is the design.

**`sankalpText`**, textarea, required, 10-280 characters, live counter.
EN label `Your sankalp` · helper `In your own words. It is read as part of the rite, in the language you write it.`
HI label `आपका संकल्प` · helper `अपने शब्दों में। आप जिस भाषा में लिखेंगे, अनुष्ठान में वही पढ़ा जाएगा।`

Preset chips, **all unselected, tapping one fills the textarea with editable text, never a locked value:**

| EN | HI |
|---|---|
| Health of my family | परिवार का आरोग्य |
| Studies and examinations | विद्या एवं परीक्षा |
| A new home | नया गृह |
| A journey ahead | आगामी यात्रा |
| In gratitude | कृतज्ञता में |
| In remembrance | स्मरण में |
| Peace of mind | मन की शांति |
| Let it remain unspoken | अनकहा रहने दें |

`Let it remain unspoken` writes the neutral line: EN `A sankalp held in the heart.` / HI `हृदय में धारित संकल्प।`

**There is no field anywhere in this flow that asks what is wrong, what is feared, what is owed, or who is ill.** That absence is the specification.

**`sankalpLang`**, select, required, default `sanskrit-hindi`.
EN options: `Sanskrit sankalp, personal intention in Hindi` / `Sanskrit sankalp, personal intention as I wrote it`
Honesty note under the field: EN `The vedic sankalp formula is Sanskrit. Your own words are read exactly as written.` / HI `वैदिक संकल्प सूत्र संस्कृत में है। आपके अपने शब्द जैसे लिखे हैं वैसे ही पढ़े जाते हैं।`

### Validation messages

| Code | EN | HI |
|---|---|---|
| `name.required` | Please enter a name. | कृपया नाम दर्ज करें। |
| `name.chars` | Please enter a name using letters only. | कृपया नाम केवल अक्षरों में दर्ज करें। |
| `name.tooShort` | A name needs at least two letters. | नाम में कम से कम दो अक्षर हों। |
| `name.tooLong` | Please keep the name under 60 characters. | नाम 60 अक्षरों से कम रखें। |
| `name.duplicate` *(warning, not blocking)* | Two names are identical. Continue only if that is intended. | दो नाम एक समान हैं। यदि यही अभीष्ट है तो आगे बढ़ें। |
| `gotra.chars` | Gotra should be letters only. | गोत्र केवल अक्षरों में लिखें। |
| `sankalp.required` | Please write your sankalp. | कृपया अपना संकल्प लिखें। |
| `sankalp.tooShort` | A few more words, please. | कुछ और शब्द लिखें। |
| `sankalp.tooLong` | Please keep it under 280 characters. | कृपया 280 अक्षरों के भीतर रखें। |
| `sankalp.contact` | Please leave out links and contact details. | कृपया लिंक और संपर्क विवरण न लिखें। |
| `names.max` | Parivar carries up to six names. | परिवार में छह नाम तक। |

`sankalp.contact` rejects URLs, emails and phone-shaped digit runs (`\d[\d\s\-()]{7,}`), spam and PII guard only.

**Profanity is NOT auto-blocked.** Flag `needsReview: true` and let it through. False positives on Sanskrit and Hindi terms are common, and blocking a religious intention is a worse failure than reviewing one.

### States

| State | Behaviour |
|---|---|
| Empty | One name row, tier preselected, `Continue` disabled with reason text below, not a dead button |
| Typing | Inline validation on blur, never on keystroke |
| Row added | Slide-in, focus moves to new `fullName` |
| Row removed | If row has content: `Remove [name]?` inline confirm. Empty row removes silently |
| Max rows | `Add name` disabled + `Parivar and Varsh both carry up to six names.` |
| Tier downgrade with data | Modal: EN `Ekal Snan carries one name. Keep Rohan and remove the other three?` `[Keep Rohan]` `[Stay on Parivar]` |
| Tier upgrade | Silent, no modal, rows preserved |
| Autosave failed | Persistent inline `Not saved, check your connection` + `Retry`. Never block the user from continuing to type |
| Draft expired (>7d) | Fresh flow + one-line notice `Your earlier draft has expired.` / `आपका पिछला प्रारूप समाप्त हो गया।` |
| JS disabled | Step 1 is a plain `<form method="post">` posting to a server action. Presets degrade to `<datalist>`. The revenue path must not require JS |

## 5.3 Step 2, `/begin/muhurat`

**Heading** EN `Choose your muhurat` / HI `मुहूर्त चुनें`

### Fields

**`river`**, required, one of six. Card grid; each card shows photograph, ghat, place, note, and a live `Next window` line. Prefilled from `?river=`, rendered as chosen with a `Change` affordance.

**`timezone`**, required. Auto-detected via `Intl.DateTimeFormat().resolvedOptions().timeZone`, editable via searchable IANA select. Persistent header line:
EN `Times shown in India Standard Time and in your time, Europe/Berlin.`
HI `समय भारतीय मानक समय और आपके समय, Europe/Berlin, दोनों में।`

**`slotId`**, required. Grouped by date. Each row:
`04:24, 05:12 IST · 23:54, 00:42 your time · Brahma Muhurat · Kartik Purnima` + provisional badge where applicable.

**Varsh only:** the user picks **slot 1 of 12** here. Copy directly above the list:
EN `Choose the first of your twelve. The remaining eleven you schedule yourself, whenever you wish, from your account.`
HI `बारह में से पहला चुनें। शेष ग्यारह आप जब चाहें, अपने खाते से स्वयं निर्धारित करें।`

### Capacity, holds, and pressure

- Selecting a slot places a **15-minute soft hold** (`POST /api/muhurat/hold`).
- Displayed as one quiet line: EN `Held for you until 14:32.` / HI `14:32 तक आपके लिए सुरक्षित।`, **not** a ticking red countdown.
- `capacityRemaining` is shown **only when ≤ 5**, phrased factually: EN `4 sankalps remain in this window.` / HI `इस मुहूर्त में 4 संकल्प शेष।`
- **Forbidden:** "Only 2 left!", "12 people are viewing", flame icons, red urgency, artificial scarcity of any kind. Capacity is a real operational limit (a priest can read only so many names) and is stated as such, nothing more.
- Booking cutoff: `startsAtUtc − 6h`. The priest needs the sankalp list assembled. `Closes in 3h 12m` appears only inside the last 12 hours, in body colour, not alarm colour.

### States

| State | Behaviour |
|---|---|
| Loading | 6 skeleton rows, no spinner |
| No slots ≤60 days | EN `Ganga at Har Ki Pauri has no open window in the next 60 days.` `[See other waters]` `[Notify me when one opens]` |
| Slot filled while choosing | Row replaces in place: `This window filled. The next is 24 Nov, 04:24 IST.` `[Take that one]`. Never a full-page error |
| Hold lapsed | Banner `Your hold has lapsed. Choose again.` / `आपका आरक्षण समाप्त हो गया। पुनः चुनें।` + auto-refetch |
| Timezone changed since step 1 | `Your device now reports Asia/Dubai. Show times in Dubai?` `[Yes]` `[Keep Berlin]` |
| Occasion fully sold across all rivers | Offer the same tithi at a different water, explicitly: `Kartik Purnima is full at every ghat. The same tithi is observed at Shipra, Ujjain, [see]` |
| DST boundary | Always store UTC; render IST and local from UTC. Never persist local wall time. A slot crossing a local DST change shows both offsets |
| Slot cancelled by ops after selection | Draft flagged; step 2 reopens with `The window you chose has been withdrawn. Nothing was charged.` |

## 5.4 Step 3, `/begin/review`

Server-rendered, read-only, **price computed server-side**. Nothing here is client-derived.

**Blocks:**
1. **Names**, exactly as they will be written. Caption: EN `Shown exactly as it will appear on your Sankalp Patra.` / HI `संकल्प पत्र पर ठीक इसी रूप में अंकित होगा।`
2. **Sankalp**, the intention, verbatim, in the script written.
3. **Muhurat**, river, ghat, place, date, IST **and** local, provisional badge if applicable.
4. **What you receive**, live link, recording (kept indefinitely on Parivar/Varsh, 24 months on Ekal), digital Sankalp Patra. Followed by, always:
   EN `Nothing is posted to you. Snanify is entirely digital, there is no prasad, no parcel, no courier.`
   HI `आपको डाक से कुछ नहीं भेजा जाता। स्नानिफ़ाई पूर्णतः डिजिटल है, न प्रसाद, न पार्सल, न कुरियर।`
5. **Offering**, tier name, price, currency. Currency from geo-IP with a manual override; **USD is the default and the charged amount**. Any local-currency figure is labelled `approx.` and is never the charged number unless you actually charge in it.
6. **Contact**
   - `email`, required. RFC-lite regex + async MX check that **warns but never blocks** (`This domain does not appear to accept mail. Continue anyway?`).
   - `phone`, optional, E.164, with a separate unchecked opt-in `Send my links on WhatsApp` / `मेरे लिंक व्हाट्सएप पर भेजें`. Not collected without that box.
7. **Consents**, all unchecked at render:

| Consent | Required | EN | HI |
|---|---|---|---|
| `rite` | ✅ | I have read how the rite is performed. | अनुष्ठान की विधि मैंने पढ़ ली है। |
| `terms` | ✅ | I accept the terms and the refund policy. | मैं शर्तें एवं वापसी नीति स्वीकार करता/करती हूँ। |
| `publicRoll` |, | Show my first name on the ghat roll during the rite. | अनुष्ठान के समय घाट सूची में मेरा पहला नाम दिखाएँ। |
| `marketing` |, | Write to me about upcoming occasions. | आगामी पर्वों की सूचना मुझे भेजें। |

`publicRoll` and `marketing` default **off**. A pre-checked marketing box on a religious purchase is not acceptable here.

8. **Edit links**, one per block, back to the owning step, draft intact, scroll-restored to the relevant field.

**States:** slot expired between step 2 and 3 → the "filled" treatment above, contact/consent preserved. Price changed since draft creation (tier price edit) → `The offering for Parivar is now $34. Your draft was made at $31; we will honour $31 until 14:00 IST tomorrow.`, or, simpler and preferable, freeze price at draft creation for 7 days.

## 5.5 Step 4, `/begin/pay`

Not a page with a card form. A **server action** that:

1. Re-validates the entire draft server-side.
2. Re-confirms the hold; extends it to 30 minutes.
3. Creates a checkout session with `idempotencyKey = sha256(draftId + tierSlug + slotId + priceMinor)`, so a double-click, a double-submit and a retried request all resolve to one session.
4. `303` redirects to the hosted checkout.

**Provider routing:** `currency === "INR"` → Razorpay hosted (UPI, netbanking, RuPay mandates). Everything else → Stripe Checkout. Both are `PLACEHOLDER` until accounts exist.

| URL | Destination |
|---|---|
| success | `/begin/confirmed/[ref]?s={CHECKOUT_SESSION_ID}` |
| cancel | `/begin/review?payment=cancelled` |

**The webhook is the only thing that sets `confirmed`.** The redirect sets nothing. UPI in particular settles asynchronously.

| State | Copy EN | Copy HI |
|---|---|---|
| Redirecting | Taking you to secure payment… | सुरक्षित भुगतान पर ले जा रहे हैं… |
| Cancelled | Payment was not completed. Your sankalp is saved. | भुगतान पूर्ण नहीं हुआ। आपका संकल्प सुरक्षित है। |
| Declined | Your bank declined the payment. Nothing was charged. | आपके बैंक ने भुगतान अस्वीकार किया। कोई राशि नहीं ली गई। |
| Pending (UPI/mandate) | Your payment is being confirmed. This can take a minute. | भुगतान की पुष्टि हो रही है। इसमें एक मिनट लग सकता है। |
| Provider unreachable | Payment is unavailable right now. Your sankalp is saved, try again in a few minutes. | भुगतान अभी उपलब्ध नहीं। आपका संकल्प सुरक्षित है, कुछ मिनट बाद पुनः प्रयास करें। |
| Hold lapsed mid-checkout | Void the session, refund if captured, return to step 2 with an apology and priority on the next equivalent window. |

## 5.6 Step 5, `/begin/confirmed/[ref]`

**Booking reference:** `SNF-2K6B-9QX4`, Crockford base32, 8 characters, `I O 1 0` excluded. Readable over a phone line to support.

**Shows:** ghat + date + IST + local · `Add to calendar` (`.ics` download **and** a Google Calendar link) · `Watch live at the ghat →` `/ghat/[river]?ref=` · a four-item timeline (`Confirmed` → `Sankalp read at the ghat` → `Recording ready, same day` → `Sankalp Patra issued`) · `A confirmation is on its way to rohan@…` · `Keep this, create an account to find it later` → `/enter`.

**Emails sent immediately:** confirmation (+ `.ics` attachment) in the booking locale. Contains the booking ref, the ghat, both times, the live link, and a **one-time claim token** so the booking can be attached to an account later. No account is ever required to book.

**States:** `ref` unknown → 404 with `Check your email for a reference beginning SNF-`. `ref` valid but `pending` → pending view polling `/api/booking/[ref]/status` every 2s for 90s, then `We will write the moment it clears.` `ref` valid but `failed` → recovery view with a fresh checkout button and the draft intact.

## 5.7 Booking state machine

```
draft ──▶ held ──▶ awaiting_payment ──▶ confirmed ──▶ performed ──▶ patra_issued
  │         │              │                │             │
  │         │              ├─▶ payment_failed              └─▶ recording_ready
  │         ├─▶ hold_expired                │
  │                                          ├─▶ cancelled_by_user  ─▶ refunded
  └─▶ draft_expired (7d)                     ├─▶ cancelled_by_snanify ─▶ refunded
                                             └─▶ rescheduled ─▶ confirmed
```

## 5.8 Data model sketch (rank 7 onward, Neon Postgres)

```
users(id, email citext unique, phone, tz, lang, created_at, deleted_at)
sessions(id, user_id, expires_at, ip_hash, ua_hash)
people(id, user_id, full_name, name_script, gotra, nakshatra, rashi, relation, is_pitru, tithi_of_passing, created_at)
bookings(id, ref unique, user_id null, tier, currency, amount_minor, status,
         slot_id, river_slug, sankalp_text, sankalp_lang, needs_review bool,
         email, phone, consents jsonb, locale, created_at, confirmed_at)
booking_people(booking_id, person_snapshot jsonb, position)   -- snapshot, not FK: the Patra must never change if a saved person is later edited
slots(id, river_slug, occasion_slug, starts_at_utc, ends_at_utc, window,
      panchang jsonb, capacity_total, capacity_remaining, status)
holds(id, slot_id, draft_id, expires_at)                      -- Upstash Redis, TTL-native
payments(id, booking_id, provider, provider_ref, status, amount_minor, currency, raw jsonb)
snans(id, slot_id, river_slug, performed_at, officiant_name, recording_asset_id, status)
patras(id /*base58(22)*/, booking_id, snan_id, issued_at, visibility, signature, revoked_at)
```

`booking_people` stores a **snapshot**, not a foreign key. Editing a saved family member must never retroactively alter an issued certificate.

## 5.9 Refund policy (for `/refunds`, verbatim)

| Window | Outcome |
|---|---|
| More than 24h before the muhurat | Full refund, no reason needed |
| 24h, 6h before | 50% refund, or a free reschedule within 90 days |
| After the 6h booking cutoff | No refund; free reschedule within 90 days, once |
| Snanify cancels (flood, curfew, ghat closure, feed failure at the ghat) | Full automatic refund **and** the offer of the next equivalent window, free |
| You did not watch live | Not a refund reason, and this is stated plainly |

The honest line, which belongs on the page in both languages:
EN `The rite is performed whether or not you are watching. Missing the stream does not mean it did not happen, your recording and your Sankalp Patra are the same either way.`
HI `आप देखें या न देखें, अनुष्ठान संपन्न होता है। सजीव प्रसारण छूट जाने का अर्थ यह नहीं कि वह हुआ ही नहीं, आपकी रिकॉर्डिंग और संकल्प पत्र दोनों स्थितियों में समान हैं।`

**Legal review required before publishing.**

---

# 6. Sankalp Patra, `/patra/[patraId]`

## 6.1 Identifier

22-character base58 (~128 bits), non-sequential, e.g. `pT4mKq9RxB2vLh6nYeW3dU`. Enumeration is infeasible, which is what lets certificates be link-shareable before an auth system exists.

## 6.2 What it shows

| Element | Source | If unavailable |
|---|---|---|
| Seal | `SealAnimated` (existing) |, |
| Name(s), in `nameScript` | booking snapshot |, |
| Gotra | booking snapshot | EN `Gotra not stated` / HI `गोत्र अनुल्लिखित` |
| Sankalp text | booking snapshot |, |
| River, ghat, place | catalog |, |
| Gregorian date + IST time | slot |, |
| Vikram Samvat / Shaka date | computed | omit |
| Tithi / nakshatra | `panchang` | **omitted entirely if `confidence !== "sourced"`** |
| Officiant | `snans.officiant_name` `PLACEHOLDER` | renders `-`, never a fabricated name |
| Issued at + Patra ID | patras |, |
| Recording link | `/watch/[snanId]` | `Recording being prepared` |
| Verification line |, | `Verify at snanify.com/verify/pT4mKq…` |

## 6.3 Formats

| Format | Route | Notes |
|---|---|---|
| HTML (canonical) | `/patra/[id]` | Print stylesheet included, A4 and Letter, `@page { margin: 12mm }`, no nav, no share bar |
| PNG 1200×630 | `/patra/[id]/opengraph-image` | Extends `src/lib/og-card.tsx` |
| PDF/A | `/api/patra/[id]/pdf` | A4 and US Letter variants (`?size=a4\|letter`), vector, embedded fonts |

**Blocking dependency:** `src/lib/og-card.tsx` currently notes that `ImageResponse` has no Devanagari face loaded, so both locales share a Latin card. A certificate PNG carrying a Devanagari name would render tofu. **Bundle a subset of `NotoSerifDevanagari-Regular` and pass it via `fonts:` to `ImageResponse` before shipping certificate OG cards.** Until then, Devanagari certificates fall back to a card showing the seal, the ghat and the date without the name.

## 6.4 Sharing

Default visibility `unlisted`, anyone with the link, `<meta name="robots" content="noindex">`. Owner can move it to `private` (session required) or `public` (indexable; still not listed anywhere automatically).

Share bar: **WhatsApp first** (the diaspora default), then Copy link, Download PNG, Download PDF.

Prefilled share text:
EN `A snan was offered in my name at Har Ki Pauri, Haridwar., {url}`
HI `मेरे नाम से हर की पौड़ी, हरिद्वार पर स्नान अर्पित हुआ।, {url}`

**Pitru privacy rule:** names marked `isPitru` are **excluded from the OG preview card by default** and appear only in the page body. A death is not a preview thumbnail. A per-certificate toggle allows inclusion.

## 6.5 Verification

`/verify` → single input (ID or full URL, both accepted) → `/verify/[patraId]`.

**Issued** response shows: Patra ID · issue date · river + ghat · date of the rite · **masked name** `R••••• S•••••` · officiant (when real).
It does **not** show: the sankalp text, the email, the full name, other names on the same booking, or the price. The sankalp is private; a verifier needs to know a certificate is genuine, not what it says.

**Not found:** EN `No Sankalp Patra with that identifier has been issued.` / HI `इस पहचान से कोई संकल्प पत्र जारी नहीं हुआ।`
**Revoked:** EN `This Sankalp Patra was withdrawn on 12 March 2027.` / HI `यह संकल्प पत्र 12 मार्च 2027 को वापस लिया गया।`

**Cryptographic layer (cheap and real, not a blockchain):** an Ed25519 detached signature over the canonical JSON of the certificate fields, stored on `patras.signature`, with the public key at `/.well-known/snanify-patra.pub` and the algorithm documented on `/patra`. Anyone can verify offline with `openssl`. This is genuine third-party verifiability for roughly 40 lines of code.

`GET /api/verify/[id]` returns the same masked payload as JSON with `Access-Control-Allow-Origin: *`, rate-limited 60/min/IP.

---

# 7. The ghat, live and, more importantly, not-live

## 7.1 `/ghat` (hub)

Three zones, in this order:

1. **Live now**, rendered only when `state === "live"` for at least one river. Player, ghat name, `Sankalps being offered in this window: 34`, and a slow scroll of first names of those who ticked `publicRoll`.
2. **Next**, countdown to the next scheduled snan across all six, in IST and local. `[Remind me]` `[Book this window]`.
3. **Watch a past snan**, a small curated archive of recordings whose owners set them public.

## 7.2 `/ghat/[river]`

Same three zones scoped to one water, plus that ghat's 30-day schedule and the last three recordings from it.

## 7.3 The idle state, the design that matters most

When nothing is live, the player area must not run video.

- It shows **a still frame with a visible timestamp caption**: `Har Ki Pauri · 06:14 IST today`. Sourced either from a periodic camera grab (cron, every 15 minutes, stored in Vercel Blob) or, before cameras exist, a **dated photograph explicitly captioned as such**: `Photograph · 14 March 2026`.
- **Never a looped clip.** A loop in a player is indistinguishable from a fake live stream, and the entire product rests on the claim that the rite is real and happening.
- Status pill: teal pulsing dot **only** when the feed is genuinely live. Otherwise a neutral pill, EN `Not streaming now` / HI `इस समय प्रसारण नहीं`.
- Primary line: EN `The next snan at Har Ki Pauri begins in 6h 12m, 04:24 IST, 23:54 your time.` / HI `हर की पौड़ी पर अगला स्नान 6 घंटे 12 मिनट में, 04:24 IST, आपके समय 23:54।`
- Actions: `[Remind me]` (email, or browser push if granted) · `[Book this window]`.

## 7.4 Feed failure

A separate state from idle, and it must reassure about the **rite**, not the video:
EN `The camera at Ram Ghat is down. The rite is performed as scheduled; your recording will reach you as usual.`
HI `रामघाट का कैमरा अभी बाधित है। अनुष्ठान यथासमय संपन्न होगा; आपकी रिकॉर्डिंग सामान्य रूप से पहुँचेगी।`

If the recording also fails, the booking is refunded automatically and the email says so before the user has to ask.

## 7.5 Streaming technical

- Low-latency HLS via `PLACEHOLDER_STREAM_VENDOR` (Mux or Cloudflare Stream). WebRTC is unnecessary; this is a broadcast, not a call.
- `GET /api/ghat/status` → `{ river, state: "live"|"idle"|"down", playbackId, startsAt, endsAt, viewers }`, cached 10s, client-polled every 15s. SSE is a later optimisation.
- Latency honesty on the player chrome: EN `Live · about 20 seconds behind the ghat` / HI `सजीव · घाट से लगभग 20 सेकंड पीछे`.
- Recordings: `/watch/[snanId]`, unlisted by default, `?k=` share token, retention 24 months on Ekal / indefinite on Parivar and Varsh (state this on `/sankalp`).

---

# 8. Account surfaces

## 8.1 Auth

Email magic link only. No passwords, no OAuth. Rationale: the audience skews older diaspora, password reset is the top support cost, and you already hold their email from the booking.

```
/enter          → email input → POST /api/auth/magic (5/hour/email, 20/hour/IP)
/enter/check    → "We have written to rohan@…, the link works for 15 minutes."
/api/auth/callback?token=… → single-use token → session cookie (httpOnly, Secure, SameSite=Lax, 90d rolling) → 302 to `next` or /account
```

Guest bookings attach via the one-time claim token in the confirmation email. **An account is never required to buy.**

## 8.2 Surfaces

| Route | Shows |
|---|---|
| `/account` | Next snan card (countdown, live link), patra count, `Book another` |
| `/account/upcoming` | Scheduled snans; reschedule/cancel per policy; **Varsh scheduler**: `You have 9 snans remaining this year. Schedule one →` |
| `/account/snans` | Past snans, newest first: ghat, date, `Recording` `Sankalp Patra` `Book this again` |
| `/account/parivar` | Saved people, max 24. Fields as step 1. Used as autofill chips in step 1: `Add from your family` |
| `/account/pitru` | Ancestors: name, relation, tithi of passing (optional). Deliberately a separate page with quieter chrome |
| `/account/receipts` | Invoice list + PDF. GST fields `PLACEHOLDER` pending Indian entity structure |
| `/account/settings` | Email, phone, timezone, language, default patra visibility, notification prefs |
| `/account/data` | JSON export (all bookings, people, patras) + delete account with 30-day grace, export forced first |

## 8.3 The pitru ethics rule (non-negotiable)

- **No automated shraddha marketing.** Snanify never sends `[Name]'s tithi is approaching, book now`.
- A reminder exists **only** if the user creates it themselves on `/account/pitru`, default off.
- If created, the email reads exactly: EN `You asked to be reminded of Shanti Devi's tithi. It falls on 8 September.` / HI `आपने शांति देवी की तिथि का स्मरण कराने को कहा था। वह 8 सितंबर को है।`, with a plain link to `/begin` and no urgency, no countdown, no imagery of grief.
- Deleting an ancestor deletes the reminder immediately, with no retention-flow, no "are you sure you want to forget".

---

# 9. Marketing/static vs. application state, summary

**Static or ISR, ship with zero backend (18 routes):** `/`, `/rivers`, `/rivers/[river]`×6, `/how-it-works`, `/sankalp`, `/muhurat`, `/muhurat/[occasion]`, `/priests`, `/ethics`, `/patra`, `/patra/sample`, `/verify`, `/faq`, `/about`, `/contact`, `/press`, `/privacy`, `/terms`, `/refunds`.

**Requires real application state (needs DB / session / payment / stream):** `/begin/*` (draft + slots + payments), `/ghat`, `/ghat/[river]`, `/watch/[snanId]` (stream vendor + assets), `/patra/[patraId]`, `/verify/[patraId]` (issued records), `/enter`, `/account/*` (auth).

The split is the plan: **more than half the site is credibility, and all of it is static.**

---

# 10. Build order, ranked, with honest backend cost

The repo has **no database, no auth, no payments, no stream**. Ranks 0-5 change none of that.

| # | Ship | Backend needed | Est. | Why here |
|---|---|---|---|---|
| **0** | **P0 integrity fixes (§0)** | none | **2h** | Fabricated stats and a false "Live now" badge are in production. Highest credibility-per-minute item that exists |
| **1** | i18n refactor to `[lang]` + `proxy.ts` (§11) | none | 1d | Do it before route #2 exists. Doing it after 20 routes costs 5× |
| **2** | `/rivers` + `/rivers/[river]`×6 | none | 3d | Six real places, in depth, with photographs. The largest SEO surface and the strongest answer to "is this real" |
| **3** | `/ethics`, `/how-it-works`, `/faq` | none | 2d | The dominant objection is legitimacy, not price. A page that states plainly what is and is not claimed outperforms any feature |
| **4** | `/patra` + `/patra/sample` (watermarked) | none | 2d | Makes the deliverable tangible before anyone pays. Also forces the certificate design to be finished early, where it is cheap |
| **5** | `/muhurat` + `/muhurat/[occasion]` from checked-in JSON, all `provisional` | none | 2d | Converts "when?" from a mystery into a calendar, honestly |
| **6** | `/ghat` in **idle-only** mode: schedule + dated stills + recordings | Blob + a cron | 3d | Proves the operation physically exists. No streaming vendor needed |
| **7** | Booking steps 1-3, **no payment**, ending in `Request a snan` → ops email + confirmation email | Postgres (bookings) or even Resend + a Google Sheet | 5d | Concierge fulfilment. Real revenue-intent data, manual payment links, zero payment integration. **This is where the DB first earns its keep** |
| **8** | Payments: Stripe Checkout + Razorpay + webhooks + steps 4-5 | Neon Postgres, Upstash Redis (holds) | 8d | First hard dependency on a real DB and a real ledger |
| **9** | Patra issuance pipeline + `/patra/[id]` + `/verify` + signing | Postgres + Blob + Devanagari font for `ImageResponse` | 5d | The share loop. Every issued Patra is a distribution channel |
| **10** | Auth + `/account`, `/account/snans`, `/account/upcoming` | Sessions | 5d | Only needed once people have more than one booking |
| **11** | Live streaming + `/ghat` live mode + `/watch` | Mux/Cloudflare Stream | 8d | Expensive, operationally heavy, and unnecessary until there are bookings to stream |
| **12** | Varsh scheduler, `/account/parivar`, `/account/pitru` | Postgres | 5d | Retention features. Meaningless before retention exists |

**Storage progression:** repo JSON (ranks 1-6) → Neon Postgres via Vercel Marketplace (7+) → Vercel Blob for stills, recordings and PDFs (6+) → Upstash Redis for holds and rate limits (8+).

---

# 11. Scaling i18n, concrete replacement

## 11.1 Why the current approach must change

The MVP uses two root layouts (`app/(en)`, `app/(hi)`) plus one `content` object. Three concrete failures at scale:

1. **The route tree is authored twice.** 30 routes → 60 page files. They will drift, and the drift will be silent because nothing type-checks that `(en)/rivers/[river]` and `(hi)/hi/rivers/[river]` render the same structure.
2. **No code splitting.** `content.ts` becomes ~5,000 lines and every route imports the whole object, including the certificate strings on the landing page.
3. **`switchHref` is already broken for page two.** It is a constant (`"/hi"`). On `/rivers/ganga-haridwar` the toggle dumps the user on the Hindi homepage. This is a latent bug today.

## 11.2 The replacement

**Single `app/[lang]/` tree + a `proxy.ts` rewrite.** Public URLs are byte-identical to today; no inbound link breaks.

> Next 16 renamed `middleware.ts` → `proxy.ts` (verified in `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`). File sits at `src/proxy.ts`, exporting `proxy` or a default.

```ts
// src/proxy.ts
import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "hi"] as const;

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];

  // /en/... is never canonical, collapse it to the unprefixed form.
  if (first === "en") {
    const rest = pathname.slice(3) || "/";
    return NextResponse.redirect(new URL(rest + search, req.url), 308);
  }

  // /hi/... already matches [lang]=hi. Pass through.
  if (first === "hi") return NextResponse.next();

  // Everything else is English: rewrite to the [lang] segment, URL unchanged.
  return NextResponse.rewrite(new URL(`/en${pathname}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!api|_next|.well-known|.*\\.[\\w]+$).*)"],
};
```

**No automatic locale redirect.** `Accept-Language: hi*` on a first visit renders a dismissible strip offering `हिंदी में पढ़ें →`; it never navigates on the user's behalf.

## 11.3 The layout

`app/[lang]/layout.tsx` replaces both root layouts. `generateStaticParams` returns `[{lang:"en"},{lang:"hi"}]`.

Font optimisation that the current single `RootShell` cannot do: split the font sets by locale so Hindi visitors do not preload Karla, and English visitors do not preload Tiro + Mukta. Marcellus loads in both, because `wordmark` is Marcellus in every locale by design.

```tsx
// en: marcellus + karla        (+ marcellus for the wordmark, already there)
// hi: marcellus + tiro + mukta
const fontVars = lang === "hi"
  ? `${marcellus.variable} ${tiro.variable} ${mukta.variable}`
  : `${marcellus.variable} ${karla.variable}`;
```

Metadata moves to a shared helper so `alternates`/`openGraph` are generated, not hand-maintained per layout.

## 11.4 Content structure

Split `src/lib/content.ts` into namespaces under `src/content/{en,hi}/`, keeping the `satisfies` discipline, which is the genuinely good part of the current setup, because it type-errors on a missing Hindi key.

```ts
// src/content/index.ts
import type { Lang } from "@/lib/i18n";
export const dicts = {
  en: { common: enCommon, landing: enLanding, begin: enBegin, /* … */ },
  hi: { common: hiCommon, landing: hiLanding, begin: hiBegin, /* … */ },
} satisfies Record<Lang, Record<string, unknown>>;

export type Ns = keyof (typeof dicts)["en"];
export const t = <N extends Ns>(lang: Lang, ns: N) => dicts[lang][ns];
```

Each `hi/*.ts` declares `satisfies typeof enX` so a missing Hindi string is a **build error**, not a runtime `undefined`.

## 11.5 `src/lib/i18n.ts`

```ts
export type Lang = "en" | "hi";
export const other = (l: Lang): Lang => (l === "en" ? "hi" : "en");

/** Public URL for `path` in `lang`. path is always the unprefixed canonical form. */
export const localePath = (lang: Lang, path: string) =>
  lang === "hi" ? `/hi${path === "/" ? "" : path}` : path || "/";

/** Strip the /hi prefix from a pathname to get the canonical form. */
export const canonicalPath = (pathname: string) =>
  pathname.startsWith("/hi") ? pathname.slice(3) || "/" : pathname;

export const alternates = (path: string) => ({
  canonical: path,
  languages: { "en-IN": path, "hi-IN": localePath("hi", path), "x-default": path },
});
```

The language toggle becomes, in a client component:

```tsx
const pathname = usePathname();
<Link href={localePath(other(lang), canonicalPath(pathname))}>{switchLabel}</Link>
```

This is the fix for P0-4 and it is the whole reason to do the refactor before route #2.

## 11.6 Migration steps (half a day, one PR)

1. `git mv src/app/(en)/page.tsx src/app/[lang]/page.tsx`; merge the two layouts into `src/app/[lang]/layout.tsx` with `generateStaticParams`.
2. Add `src/proxy.ts` as above.
3. Add `src/lib/i18n.ts`; delete `switchHref` from `content.ts`; wire the toggle to `usePathname`.
4. Leave `content.ts` intact for now under `src/content/{en,hi}/landing.ts`, split it namespace-by-namespace as each new route lands, not in a big bang.
5. Verify: `/`, `/hi`, `/en` → 308 to `/`, `/opengraph-image`, `/hi/opengraph-image`, and the toggle round-trip on a deep path.

**Rejected alternative:** keeping `(en)`/`(hi)` and making each page file a 3-line re-export of a shared component. It avoids the proxy, but it is 60 files of boilerplate, it still cannot fix `switchHref` without `usePathname` anyway, and it makes route-level `generateStaticParams` and metadata generation duplicative. Not worth it.

---

# 12. `/ethics`, the content that has to be right

This page is the product's spine. Draft statements, both languages, to be reviewed by a practising priest before publication.

**What we claim**
EN `A rite is performed at a real ghat, on a real river, by a real priest, at a stated time. Your name, your gotra and your sankalp are spoken during it. It is streamed and recorded.`
HI `वास्तविक घाट पर, वास्तविक नदी में, वास्तविक पुरोहित द्वारा, निर्धारित समय पर अनुष्ठान संपन्न होता है। उसमें आपका नाम, गोत्र और संकल्प उच्चारित होते हैं। वह सजीव प्रसारित और रिकॉर्ड किया जाता है।`

**What we do not claim**
EN `We do not claim that a digital snan replaces bathing in the river yourself. We do not promise outcomes, not health, not wealth, not a result of any kind. We do not say that not doing this brings harm.`
HI `हम यह नहीं कहते कि डिजिटल स्नान स्वयं नदी में स्नान का स्थान ले लेता है। हम किसी फल का वचन नहीं देते, न आरोग्य, न धन, न कोई परिणाम। हम यह भी नहीं कहते कि ऐसा न करने से कोई हानि होती है।`

**What we will not do**
EN `We will not write to you about a death anniversary unless you have asked us to. We will not tell you an occasion is running out. We will not ask what is troubling you before we ask what you would like.`
HI `जब तक आप स्वयं न कहें, हम किसी पुण्यतिथि की सूचना नहीं भेजेंगे। हम यह नहीं कहेंगे कि कोई पर्व निकला जा रहा है। आप क्या चाहते हैं, यह पूछने से पहले हम यह नहीं पूछेंगे कि आपको क्या कष्ट है।`

**Everything is digital**
EN `Nothing is posted to you. There is no prasad in a parcel, no water in a bottle, no thread in an envelope. What you receive is a stream, a recording, and a Sankalp Patra.`
HI `आपको डाक से कुछ नहीं भेजा जाता। न पार्सल में प्रसाद, न बोतल में जल, न लिफ़ाफ़े में मौली। आपको मिलता है, प्रसारण, रिकॉर्डिंग और संकल्प पत्र।`

---

# 13. Cross-cutting requirements

| Concern | Requirement |
|---|---|
| **Accessibility** | WCAG 2.2 AA. Every step-1 and step-3 form fully keyboard-operable. `lang="hi"` set correctly so screen readers use a Hindi voice. Existing `prefers-reduced-motion` block already covers the ripple/breathe animations; the live pulse dot must respect it too |
| **No-JS** | `/begin/sankalp` and `/begin/review` work as plain form posts to server actions. The revenue path must not require JS |
| **Error boundaries** | `app/[lang]/error.tsx` and `app/[lang]/begin/error.tsx` (separate, so a flow crash preserves the draft ref and shows `Your sankalp is saved, SNF-…`) |
| **404** | `app/[lang]/not-found.tsx`, locale-correct, links to `/rivers` and `/contact` |
| **Rate limits** | `/api/auth/magic` 5/h/email, 20/h/IP · `/api/booking/draft` 60/h/cookie · `/api/verify/*` 60/min/IP · `/api/checkout/session` 10/h/cookie |
| **Analytics** | Vercel Web Analytics only, no third-party pixels on `/begin/*`. Never send `sankalpText`, names, or gotra to any analytics destination, funnel events carry step name and tier slug, nothing else |
| **Email** | Resend (`PLACEHOLDER`). Locale from `bookings.locale`. Templates: confirmation, reminder (24h + 1h), recording ready, patra issued, refund, magic link, user-created pitru reminder |
| **SEO** | `sitemap.ts` emits both locales with hreflang. `robots.ts` disallows `/begin/`, `/account/`, `/api/`. `/patra/[id]` is `noindex` unless visibility is `public` |
| **Security headers** | CSP with the stream vendor and checkout domains allowlisted; `frame-ancestors 'none'` except on the hosted checkout return |


---

## Open questions for a human

- Panchang sourcing: which provider, under what licence, and computed against which coordinates? Options are Drik Panchang (licensing terms unclear for commercial redistribution), ProKerala API, or computing in-house with Swiss Ephemeris + an ayanamsa choice. The ayanamsa choice (Lahiri vs Raman vs KP) materially changes tithi boundaries and MUST be stated publicly on /muhurat. Until this is answered every slot stays confidence: 'provisional'.
- Priest partnerships: are there real, named, consenting officiants at any of the six ghats? /priests must not ship until at least one is real and has signed a written consent covering photograph, name and likeness. Ghats like Har Ki Pauri and Vishram Ghat have their own trusts and committees, is any permission required to perform a paid, streamed rite there?
- Camera and streaming rights at each ghat: filming permission, whether a fixed camera can be installed, whether bystanders in frame create a privacy obligation under DPDP Act 2023, and what happens at Kumbh-scale crowd events.
- Payments entity: is there an Indian entity? Stripe India requires one for INR settlement; Razorpay requires one outright. Without it, INR pricing is impossible and Indian local customers can only pay in USD, which materially changes the 'and locals' half of the positioning. GST applicability to a religious service delivered digitally to a domestic customer needs a CA's opinion.
- Refund policy (§5.9) needs legal review, and the consumer-protection regime differs by market: EU distance-selling rules give a 14-day withdrawal right that may or may not be disapplied for a dated service; Indian Consumer Protection (E-Commerce) Rules 2020 have their own disclosure duties.
- Capacity per slot is set at 40 sankalps as a placeholder. What is the real number a priest can read aloud in one window without the rite becoming perfunctory? This number is both an operational constraint and an honesty constraint and should come from the officiant, not from revenue modelling.
- Recording retention: 24 months on Ekal vs indefinite on Parivar/Varsh is a proposal. 'Kept for good' is already promised in the shipped Parivar copy, that is a permanent storage commitment that needs a cost model and a wind-down clause in the terms.
- Does the Varsh tier's 'twelve snans across the year' mean twelve calendar months, twelve occasions from a published list, or twelve of the buyer's choosing? The scheduler design in /account/upcoming assumes 'any twelve open windows within 12 months of purchase'. Confirm.
- Company registration, jurisdiction and the address that must appear on /about, invoices and legal pages. Footer currently says 'Prayagraj & Berlin', is either a registered address?
- Whether a practising priest or a scholar will review /ethics and the sankalp copy before publication. This document proposes the statements; it should not be the last word on them.
- Devanagari font licensing for ImageResponse and PDF embedding, Noto Serif Devanagari is OFL and fine, but confirm the subsetting pipeline and whether the Patra PDF needs the full glyph set for conjuncts in less common names.

---

## Adversarial review

**Verdict:** needs-work

### Credibility risks

- THEOLOGICAL OVERREACH, the central one: the IA sells a proxy *snan*, 'Take your dip', 'Ekal Snan', 'एक डुबकी', 'The river comes to you'. In practice a bath is not transferable; what IS routinely done by proxy at every major temple and ghat is sankalp-archana, tarpana and puja recited in a yajamana's nama-gotra. A pandit asked 'has my snan been done?' will say no, a sankalp and archana in your name has been done. The whole 30-route map, including /ethics, never states this distinction, and the step is literally named 'Take your dip'. This is the one thing that makes the product either honest or a con, and the spec defers it to an unwritten §12.
- FACTUAL GHAT ERROR: Talakaveri is not a ghat. It is the *source* kundike of the Kaveri at Brahmagiri in Kodagu, inside a temple tank complex administered by a Karnataka state authority, where the theertha is significant chiefly at Tula Sankramana. It is not a flowing-river bathing ghat where a rite can be staged on demand year-round. For Kaveri pitru karya the recognised sites are Paschima Vahini at Srirangapatna, Talakadu, or the Srirangam/Tiruchirappalli stretch. Any South Indian user clocks this in five seconds and correctly concludes the founders picked names off a map.
- NORTH-INDIAN FLATTENING: Godavari is labelled 'Dakshin Ganga' and Kaveri 'Ganga of the south', two southern rivers defined by reference to a northern one, in a list where four of six are Hindi-belt. Kaveri's own name in Tamil is Ponni. Compounding it, the only languages are English and Hindi: you are selling Kaveri and Godavari rites, in Hindi, to a diaspora that is heavily Tamil, Telugu, Kannada, Malayali, Gujarati and Bengali. The catalog hardcodes `name: {en, hi}`, baking the flattening into the type system.
- GOTRA IS TREATED AS A UNIVERSAL FIELD. It is not. Gotra is patrilineal and primarily a dvija institution; enormous numbers of Hindus, most non-dvija jatis, Dalit and OBC communities, many South Indian non-Brahmins, adoptees, converts, have no gotra, or use kula-devata/village/house names instead. The standard ritual fallback is Kashyapa gotra, precisely because the tradition anticipated this. A required gotra field, or worse a gotra dropdown, is a caste-legibility form. It is also caste-adjacent identity data with a GDPR Art. 9 problem (religious/philosophical belief) for the EU/UK diaspora. Step 1 is listed as 'names, gotra, intention' with none of this addressed.
- THE SPEC BANS GRIEF-MINING, THEN REBUILDS IT TWO DECISIONS LATER. Flow order is sankalp → muhurat → review (price) → pay. You collect the intention and your dead mother's name *before* showing a price. Neutral presets do not fix a sunk-cost sequence. And the server-draft rationale explicitly lists 'abandoned-draft recovery for free' as a benefit, i.e. abandoned-cart email on a form containing a deceased relative's name and a stated affliction. That is exactly the capability the pitru decision correctly refused to build.
- MANUFACTURED SCARCITY ON DIVINE ACCESS: `capacityTotal: 40`, `capacityRemaining`, a `filling` status rendered in UI, and a 15-minute soft hold on a muhurat. Nothing is shipped and a priest can carry many names in one sankalp, that is how temple archana works. Unless there is a stated liturgical limit, '3 places left for Kartik Purnima' is a countdown-timer dark pattern with a deity attached.
- SELLING THE BETTER HOUR: 'Priority muhurat slots' ($31) and 'Brahma muhurat priority' ($108) are already live. This is paying more for preferential access to the most auspicious time, the single clearest pay-for-better-divine-outcome mechanic in the product, and the doc scrutinises certificate ID entropy while walking straight past it. It is the screenshot that ends the company's reputation.
- 'Moksha · the great purifier' sits in the same catalog file as `usd: 11`. A soteriological claim adjacent to a price. Same class of problem: 'health' as a sankalp preset, in India, brushes the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 the moment any surrounding copy implies a rite aids recovery, and ASCI/FTC on unsubstantiated claims elsewhere.
- NO CONCEPT OF GHAT PERMISSION ANYWHERE IN 30 ROUTES. Har Ki Pauri is administered by Shri Ganga Sabha; Vishram Ghat by the Mathura panda samaj/municipal body; Ram Kund by Nashik Municipal Corporation; Ram Ghat by the Ujjain administration; Talakaveri by a Karnataka government authority. Commercial filming and livestreaming generally requires permission, and during Kumbh/Simhastha and major parvas access is hard-restricted, while the copy sells Shipra as 'Ground of the Kumbh'. 'Streamed live from Har Ki Pauri' may be a claim the company has no legal right to make.
- BYSTANDER PRIVACY IS ABSENT, AND IT IS THE WORST-CASE FAILURE. A live camera at these ghats films hundreds of non-consenting pilgrims. Ram Kund in Nashik is *the* asthi-visarjan site; Vishram Ghat and Har Ki Pauri carry constant shraddha, mundan and last rites. Broadcasting a stranger's family's cremation-adjacent rites as ambience for a paying overseas customer is a headline. There is no framing rule, no /ethics statement, no takedown route.
- THE SANKALP LEAKS AT THE PHYSICAL LAYER, NOT THE DATABASE LAYER. The spec hardens the sankalp against /verify and against ID enumeration, but if the priest audibly recites 'for Ramesh Sharma, Kashyapa gotra, that his mother recover' on a public stream that is then recorded and kept 'for good', the privacy decision is already broken before any API is called. The doc protects the wrong surface.
- P0-4 ASSERTS A DEFECT THAT DOES NOT EXIST. `Header.tsx:46` already calls `otherLangPath(lang, currentPath)`; `switchHref` in content.ts is dead, unreferenced data. The language toggle is already path-aware. In a document whose entire thesis is 'do not assert untrue things', shipping a false production-defect claim at P0 severity, sitting next to two genuine fabrications, is self-discrediting and dilutes the real P0s.
- 'HD recording, kept for good' / 'सदैव सुरक्षित' is an unbounded retention promise on video of a named religious act, and it directly contradicts /account/data's deletion right, DPDP storage limitation, and GDPR erasure. The spec's own replacement hero stat, 'Recorded, always', re-commits to it.
- 'Made with reverence · Prayagraj & Berlin', if there is no Indian entity, presence in Prayagraj is a fabricated credential under the document's own rules, and the doc does not catch it. Separately, a Berlin-founded, non-Indian-founded company selling Hindu rites is a fact that must be stated plainly on /about or it becomes the story. /about currently has 'founding story' and a PLACEHOLDER registration and nothing about who the ritual authority actually is.
- CRYPTOGRAPHIC THEATRE: Ed25519 signatures, a `.well-known` public key, PDF/A, and third-party verification, for a keepsake nobody's insurer, registrar or temple will ever check. It borrows the visual grammar of credentialing to manufacture gravitas, and it creates a real hazard: a signed, verifiable 'Sankalp Patra' will eventually be presented as evidence that shraddha was performed, in a family dispute or a matrimonial context. Also, one key with no `kid`/rotation invalidates every certificate ever issued the day you rotate.
- THE OG IMAGE DEFEATS THE UNLISTED DEFAULT. `/patra/[patraId]/opengraph-image` is an unauthenticated read of the same record. Paste an 'unlisted' certificate link into a WhatsApp group and the preview renders the full name, river and date to everyone, and Meta/Google cache that image well past any deletion.
- LEGAL SURFACES MISSING FROM A 30-ROUTE MAP THAT FOUND ROOM FOR /press: no named Grievance Officer (required by DPDP 2023 and by India's Consumer Protection e-commerce rules, with ack/resolution timelines); no cancellation policy distinct from refunds; no explicit-consent step for GDPR Art. 9 religious-belief processing; no route for 'someone named me in a rite without asking' takedown; no incident/rescheduling surface for the flood, the closed ghat, the Kumbh restriction, the ill priest, which is the moment trust is actually won or lost.
- 'Most chosen' on the middle tier is the same class of unverifiable social proof as the '1,20,000+' stat the doc is deleting, and the doc does not catch it. Likewise `viewers` in /api/ghat/status: a vanity counter that will be inflated, and a strange thing to render over someone's private rite.
- THE SHIPPED MUHURAT MONTHS VIOLATE THE DOC'S OWN HONESTY RULE AND ARE NOT ON THE P0 LIST. Mahashivratri (Phalguna Krishna Chaturdashi) and Ganga Dussehra (Jyeshtha Shukla Dashami) are tithi-based and can land outside the asserted Feb 2027 / May 2027 months. The doc flags the hardcoded 04:24 IST and misses the four assertions right below it.
- USD-ONLY PRICING AIMED AT 'DIASPORA AND LOCALS'. The TIERS type has `usd` and nothing else, while a Razorpay INR path exists. $11 is roughly ₹950+ for a rite whose customary dakshina at the ghat is ₹101-501. Charging Indians in India a dollar-anchored price for their own neighbourhood ritual is the exploitation optics, and the catalog schema encodes it.
- No statement anywhere of what the officiating priest is paid. A brand taking $108 while the pandit receives ₹200 is the paragraph a journalist writes, and 'no hidden dakshina' makes the omission louder.

### Required fixes

- Write §12 now, not later, and lead with the proxy question: state on /ethics and in the flow that what is performed is a sankalp and archana/tarpana recited in your name and gotra by a ritvik at the ghat, the same thing done for absent yajamanas at temples every day, and that it is not a substitute for your own bodily snan. Rename step 3 from 'Take your dip' to something honest ('Your sankalp is carried' / 'संकल्प अर्पित होता है'). Keep 'Ekal Snan' as a product name only if /sankalp defines it on the page.
- Replace Talakaveri with a real Kaveri bathing ghat and say why on the river page, Paschima Vahini (Srirangapatna) for pitru karya, or the Srirangam stretch. If Talakaveri is kept for the source's significance, the page must say it is a temple tank at the river's origin, not a ghat, and name the governing authority.
- Drop the 'X of the south' framing. Give Godavari and Kaveri their own epithets in their own traditions (Ponni for Kaveri; Godavari's Gautami/Simhastha associations), and add ta/kn/te/mr at least for river, ghat and occasion names. Change the catalog shape from `{en, hi}` to `Record<Lang, string>` so adding a locale is a data edit, not a refactor.
- Make gotra optional, free-text, with helper copy: 'If your family does not use a gotra, leave this blank, the sankalp will use Kashyapa gotra, as tradition provides for.' Never a dropdown. Never required. Never used for segmentation, analytics or pricing. Note on /privacy that it is treated as sensitive belief data.
- Add the missing sankalp fields the rite actually needs, or stop claiming the sankalp is 'carried': a real sankalp vakya names desha and kala (samvatsara, ayana, ritu, maasa, paksha, tithi, vara, nakshatra) alongside nama-gotra. Right now MuhuratSlot has tithi/nakshatra as optional decoration and nothing connects them to the text a priest would recite. Model the vakya, and show the user the exact words that will be spoken in their name before they pay.
- Bind window to rite type in the schema: pitru sankalp and tarpana belong in madhyahna/aparahna (kutapa kala), not brahma muhurat. Today a user can buy a pitru sankalp at the wrong hour and the system takes the money. Refusing to sell the wrong muhurat is the single strongest credibility signal available, and it costs one validation rule.
- Add Sarva Pitru / Mahalaya Amavasya to the occasions, omitting the most important pitru day from a product with a dedicated /account/pitru route reads as unfamiliarity. Handle adhik maas explicitly in the muhurat data model, since it shifts and doubles observances and will silently produce wrong dates.
- Move price to step 0. Land /begin from /sankalp with the tier fixed, show the price persistently in the stepper chrome from the first screen, and never collect a name or an intention before the amount is visible. Otherwise the flow order contradicts the doc's own anti-grief-mining decision.
- Delete 'abandoned-draft recovery for free' from the rationale and from the capability. Drafts containing pitru names or free-text sankalp are never emailed about, are purged at 72 hours, and are excluded from logs and analytics. If any recovery exists, it is a link the user asked for.
- Justify capacity from liturgy or remove it. Publish the actual constraint ('one officiant carries at most N sankalps in a window and we will not exceed it') on the river page, or reduce `status` to open/closed and delete `capacityRemaining` and `filling` from every rendered surface. Keep the soft hold only if it is a genuine ops constraint, and never surface a countdown.
- Remove muhurat priority from the paid tiers. Every muhurat available to anyone is available to everyone; tiers differ on number of snans, number of names, pitru inclusion and archive, never on the hour, the river, or the queue.
- Rewrite 'Moksha · the great purifier' as description of tradition, not product benefit ('in tradition, the river of release'). Add a hard copy rule to /ethics: no rite is ever associated with a health, financial, legal, fertility or exam outcome, in any locale, in any email. Presets must never affect price, ordering, or any downstream message.
- Add `permissions` to the catalog per ghat, governing authority, permit status (PLACEHOLDER | applied | granted), scope, expiry, and surface it on each river page and /ethics. No ghat ships to production with permit status PLACEHOLDER. This is the rank-0 credibility item the build order should have had and doesn't.
- Write the framing rule into the spec: camera stays tight on the officiant, the offering and the water; no crowd pans; no filming of visibly private rites; the operator kills the feed rather than film a family's last rites. Publish it on /ethics with a named takedown contact and a stated response time. This is not a nice-to-have; Ram Kund is Nashik's asthi-visarjan site.
- Bar the sankalp text from the audio. Only nama-gotra is recited aloud, and only if the user opts in; the free-text intention is silent, never captioned, never in the OG image, never in the ics summary. Default the recording to a private link, and state on the booking page exactly what a viewer of the stream can hear.
- Correct P0-4: `otherLangPath` is already wired in Header.tsx. The fix is deleting the dead `switchHref` key from content.ts, a cleanup, not a P0. Demote it, and add as P0-5 the four tithi-based month assertions in `muhurat.items`, which either carry the provisional label or lose the month.
- Bound retention. Replace 'kept for good' / 'सदैव सुरक्षित' with a stated period (e.g. 'your recording is kept for N years, and you can delete it at any time'), and make 'Recorded, always' mean 'every rite is recorded' rather than 'kept forever'. Wire deletion through to the video vendor and to cached OG images.
- Fix the OG leak: no dynamic certificate OG image for unlisted patras, serve a generic brand card unless the user explicitly makes it public, and regenerate/purge on deletion. Apply the same masking to `/api/verify/[id]` responses, rate-limit it despite the 128-bit IDs, and make 404 and 200 indistinguishable in timing.
- Shrink the certificate's claim rather than its cryptography. Print on the Patra itself, and on /verify: 'This confirms that Snanify performed and recorded this rite at this ghat at this time. It attests to nothing else.' If you keep Ed25519, add a `kid` and a rotation story. Seriously consider dropping the signing entirely, a signed record you cannot verify the meaning of is worse than an honest keepsake.
- Add the missing routes: /grievance with a named officer and statutory timelines; a cancellation policy distinct from refunds; a rescheduling/incident surface with real states ('rite could not be performed', 'ghat closed', 'rescheduled, you may take a refund'); and a takedown path for a person named in a rite without their consent. Add explicit Art. 9 consent at /begin/review naming what is being consented to, not a bare 'consent' checkbox.
- Delete 'Most chosen' until it is computed from real orders, it is the same fabrication class as the stats you are removing. Same for `viewers`: truthful and public-stream-only, or gone.
- Add `inr` to TIERS as a first-class price, set for India rather than converted from USD, and state on /sankalp why the two differ. Or drop 'locals' from the positioning. A dollar price for a neighbourhood rite is the thing that makes the whole product look extractive.
- Put a fair-compensation statement on /ethics, what the officiant and the ghat receive, as a share or a floor. It costs one paragraph and it is the strongest available answer to 'who is really profiting here'.
- State the company's actual geography on /about before launch: where it is registered, who the founders are, and who the named Indian ritual advisors are. If there is no Prayagraj presence, 'Prayagraj & Berlin' is a fabricated credential and comes out under the doc's own P0 rule.
- Add a 6-digit code fallback to the magic link, WhatsApp and Instagram in-app browsers are the diaspora's primary channel and routinely break magic-link handoff. This is a support-cost and conversion issue for exactly the audience the auth decision was designed around.
- Repeat 'Nothing is shipped to you' beyond /how-it-works, on /, on /sankalp, on /begin/review, and in the confirmation email. The nearest reference point ships Ganga jal; the expectation of receiving water is strong and will otherwise generate refunds and anger.

### Must survive

- The two P0 integrity fixes are correct and should ship today: the '1,20,000+ sankalps / 48 countries' stats are invented, and the 'Live now · Har Ki Pauri' badge asserts a stream that does not exist. Deleting fabricated trust signals from production before building anything on top of them is the right instinct and the right sequencing.
- The ghat idle-state decision, dated still frame with a visible timestamp caption, never looping footage, live pill illuminated only by real feed state, is the best decision in the document. It correctly identifies the empty state as the place where the product's core claim is kept or broken. Preserve it verbatim and extend it to recordings ('this is your rite' vs 'this is footage of this ghat').
- No field asks what is wrong. Neutral presets, all unchecked, including 'let it remain unspoken'. Expressing the anti-manipulation constraint in the schema rather than a policy doc is the correct engineering instinct, it just has to survive the flow order and the draft-recovery capability.
- Pitru reminders user-initiated, default off, no automated 'shraddha is approaching, book now' campaign, and the capability removed from the design rather than governed later. This is the discipline that separates this from the exploitative category. Add only: reminder emails carry no CTA and no price.
- `panchang.confidence: 'sourced' | 'provisional'` as a first-class field, with a visible 'Timing to be confirmed against the panchang' label. Forcing every surface that renders a time to also render its provenance, and making 'we haven't sourced this' a state rather than an omission, is exactly right.
- Occasion slugs carry the Gregorian year (`kartik-purnima-2026`) because the tithi moves, a bare `/muhurat/kartik-purnima` would silently become wrong. Small, correct, and evidence someone was actually thinking about lunar calendars.
- Build order fronts static credibility with zero backend: six real river pages, /ethics, /how-it-works and a watermarked sample Patra before payments, DB not needed until rank 7. The diagnosis is right, the objection is 'is this real', not 'can I pay'.
- /priests behind a feature flag with every field PLACEHOLDER and the explicit rule 'do not publish placeholder humans'. Exactly right. (Note the shipped footer already lists 'Our priests' / 'हमारे पुरोहित' as a label, point it elsewhere until real people have consented in writing.)
- 'No press quotes until real' on /press. Same discipline, applied consistently.
- The 'Nothing is shipped to you' block on /how-it-works. It preempts the single most likely misunderstanding of this product.
- Never build a card form: server action 303 to hosted checkout, webhook as source of truth, with the UPI async-settlement reasoning spelled out. Zero PCI scope and no false 'confirmed' state. Technically correct and correctly argued.
- Server-side draft behind an httpOnly cookie because a client-held price is a forgeable price. Right for integrity, just bound its retention and strip the remarketing rationale.
- Unguessable 22-char base58 patra IDs, unlisted + noindex by default, and /verify returning masked name plus river/ghat/date and never the sankalp text. The principle 'the sankalp is a private intention' is the right one; close the OG-image and audio leaks and it holds.
- Magic link only, no password, no OAuth, no account required to book, with a one-time claim token in the confirmation email. Correct read of an older diaspora audience and of a buy-once product. Add a code fallback and it's solid.
- Public URL scheme unchanged, identical Latin-script slugs in both locales, hreflang pairing as mechanical `path → /hi+path`, and, most importantly, no automatic locale redirect, only a dismissible 'हिंदी में पढ़ें →' strip. 'Crawlers see stable URLs; humans are not teleported' is the right principle, and the WhatsApp percent-encoding reasoning is a real observation about this audience.
- Collapsing (en)/(hi) into a single `app/[lang]` tree with a proxy rewrite, and splitting the monolithic content object into per-namespace dictionaries. At 30 routes the duplication argument is correct even though the specific switchHref defect cited is not real.
- Treating river/ghat/tier names as language-keyed *entity data* in catalog.ts rather than as page copy. Correct modelling, and it is what makes adding Tamil or Kannada cheap later.
- The explicit scope note that this repo has no DB, no auth, no payments and no streaming vendor, and that no panchang date, priest name, partnership or statistic in the document is a factual claim. Keep that header on every revision.