# Snanify GTM: the Pitru wedge — positioning, channels, seasonality and the Tithi Panji

> Facet: **Go-to-market, positioning & the diaspora wedge**  
> Adversarial review verdict: **needs-work**

## Summary

The wedge is not "Indians abroad who miss the Ganga" — it is first-generation Indians in the US/UK/Canada aged 35–60 who owe an ancestral rite they cannot fly home to perform. Obligation converts where devotion browses: it has a fixed date, a hard deadline, a hard-currency buyer, and enough ritual literacy that "gotra" and "sankalp" are not friction. The positioning that follows is "Be present at your own rite" — we sell attendance and fidelity, never consequence — which draws a bright line against the pitru-dosh fear-selling that dominates this category and is the fastest way to destroy the brand. The genuine gap versus Sri Mandir, VAMA and digitalsnanindia is narrower than it looks and rests on three unglamorous things: diaspora-grade payments and timezones, owning snan as a category rather than puja generally, and making the live moment the product rather than the receipt. Cash flow is brutally seasonal (two lunar months carry ~50% of the year), so the retention mechanic — a free Pitru Tithi Panji that computes each family's death anniversaries and simply tells them the date, with no purchase attached — doubles as the counter-cyclical engine that fills the March–April trough.

## Decisions

**The wedge is first-generation diaspora (US/UK/Canada, 35–60) performing pitru karya — ancestral rites — not general devotional snan.**

*Why:* Obligation has a deadline; devotion does not. This segment has hard currency (price is a rounding error), high ritual literacy (gotra/sankalp are not barriers), a genuinely non-negotiable inability to travel, and one unmissable annual peak (Pitru Paksha) plus a per-family anniversary that spreads demand across all twelve months.

**Urban Indian professionals are explicitly NOT the wedge, and India is not the launch market.**

*Why:* $11 is ~₹950. A local purohit charges ₹500–2,100 and a temple charges nothing. We lose on price to the incumbent and on legitimacy to physical presence, since this buyer can simply go. Entering India first means competing with Sri Mandir on their pricing floor with a worse distribution position.

**Elderly/immobile users in India are a beneficiary segment, not a buyer segment. Design the product so the payer and the person named are different people.**

*Why:* They have the strongest need and the weakest ability to transact. Their children abroad are the buyers. This single distinction changes the product: multi-name entry, no requirement that the named person has an account, gifting flows, and copy addressed to the payer about someone else.

**Positioning: "Be present at your own rite" / "अपने अनुष्ठान में स्वयं उपस्थित रहें।" — we sell attendance and fidelity, never consequence.**

*Why:* It is the one claim competitors structurally cannot make. Online puja marketplaces deliver evidence after the fact — a recording you were never present for and a parcel you did not ask for. Making live, timed, named attendance the product is what justifies premium pricing and is the honest description of what we actually do.

**Position as participatory, never substitutionary. The user speaks their own sankalp; the priest does not perform the rite instead of them.**

*Why:* The strongest theological objection to remote rites is that shraddh must be performed by the descendant's own hand. Claiming substitution invites a legitimacy attack we would lose. Claiming participation is both defensible and true, and it converts the live stream from a nice-to-have into the theological core of the product.

**Add a fourth SKU: Pitru Tarpan at $51, positioned as the occasion product for the wedge. Keep Ekal $11 / Parivar $31 / Varsh $108.**

*Why:* $11 is too cheap for the wedge's emotional weight — a man paying $11 for his father's shraddh may read the price as a signal we are not taking it seriously. 51 is a shagun amount and fits the auspicious-number scheme. Ekal becomes the trial SKU, Parivar the margin SKU, Pitru Tarpan the wedge SKU, Varsh the cash-flow SKU.

**The retention mechanic is the Pitru Tithi Panji (पितृ तिथि पंजी) — a free register that computes each recorded death tithi's Gregorian date and timezone every year and simply tells the user.**

*Why:* Tithi drifts 11–19 days a year against the Gregorian calendar and families genuinely get it wrong. The value is complete without a purchase, which is exactly what makes it non-manipulative: it is the same information a family purohit gives free. It also produces evenly distributed, counter-cyclical bookings, which is the only structural answer to the seasonality problem.

**Ban a specific list of copy patterns at the code level, enforced by a test over content.ts — with "pitru dosh" as the headline prohibition.**

*Why:* Pitru dosh is the primary fear-selling hook in this category and the single fastest route to the money. Prohibiting it in a lint rule rather than a values document is the difference between an ethic and a poster. It also protects against the real failure mode: a growth hire six months from now who has never read the brief.

**Asthi visarjan — the highest willingness-to-pay in the category, plausibly $251–501 — is out of scope permanently, and we say so publicly.**

*Why:* It requires physically receiving human remains, which violates the all-digital constraint and drags us into cross-border remains regulation. We offer the accompanying tarpan and sankalp only, and we state the limit on the site rather than letting a customer discover it after paying.

**Do not chase Pitru Paksha 2026 at scale. Run a hand-operated pilot of 100–300 snans at one ghat, and treat Kartik Purnima 2026 as the first commercial moment.**

*Why:* Pitru Paksha 2026 is weeks away as of 10 Aug 2026 (exact window must be verified). A missed or visibly shoddy muhurat serving 800 grieving families is a brand-ending day, and we have no operational redundancy yet. A deliberately small pilot buys the one asset we cannot buy later: a real, verifiable track record.

**SEO on occasion and rite queries is the #1 channel; paid search is capped to five narrow seasonal windows; diaspora temple associations are a credibility channel, not a volume channel.**

*Why:* Intent is highest and cost lowest at the occasion query, and the asset compounds. Broad paid search puts us in a CPC war with better-funded incumbents. Temple associations close on committee timelines (3–6 months) and deliver trust transfer rather than throughput — miscounting them as a volume channel is how seed-stage religious products die.

**The hero stats currently on the live landing page ("1,20,000+ sankalps offered", "48 countries served") must be removed or verified before any paid traffic runs.**

*Why:* Honesty is stated as a product requirement, the category's core reputational risk is fraud accusation, and an unverifiable counter on the homepage is the exact artifact a skeptical Reddit thread screenshots. This is the highest-priority immediate action in the entire plan.

---

# Snanify — Go-to-market, positioning, and the diaspora wedge

**Status:** strategy spec, handed to engineering and growth verbatim.
**Date of writing:** 10 August 2026.
**Every name, price, statistic and partner marked PLACEHOLDER is unverified and must not ship as fact.**

---

## 1. Market segmentation, honestly

Six segments. Only one is the wedge. The analysis that matters is not "who is Indian and far away" but **who has the money, who has the need, who has the deadline, and who actually holds the credit card.**

### 1.1 Segment A — First-gen diaspora performing ancestral rites (THE WEDGE)

**Who:** Indians who emigrated as adults, now 35–60, in the US, UK, Canada. Engineers, doctors, accountants, small business owners. Their parents have died or are dying. They know their gotra. They remember their father's tithi approximately and their grandfather's not at all.

- **Money:** high. $11–$108 is not a considered purchase. Household income $90k–250k. Price sensitivity effectively zero; *price signalling* sensitivity is high (see §5.4).
- **Need:** genuine and non-substitutable. Pitru Paksha lasts about sixteen days and arrives once. Flying to Gaya or Prayagraj for it costs $1,400 and eight days of leave they do not have.
- **Deadline:** yes, and this is the whole thing. Devotional snan is optional forever. A shraddh has a date.
- **Ritual literacy:** high. They do not need "what is sankalp" explained. They need it *done properly*.
- **Guilt about distance:** substantial. **This is precisely where we walk carefully — see §5.**

**Why this is the wedge:** it is the only segment where all four of money, need, deadline and literacy are simultaneously high. It is also the only segment where "I cannot be there" is objectively, verifiably true rather than a convenience preference — which structurally protects us from the "you are selling laziness" critique that will otherwise define the category.

### 1.2 Segment B — Second-generation diaspora, 20–35

Low ritual literacy (many do not know their gotra and are embarrassed to ask), high identity interest, moderate money. **Not the wedge — they will not buy a rite they do not understand.** But they are the retention frontier and the reason to build the education content and the Family Archive: they inherit a record rather than starting from nothing. Treat them as a 5-year play, funded by segment A.

### 1.3 Segment C — Gulf Indians (UAE, Saudi, Qatar, Oman, Kuwait, Bahrain)

Roughly 9 million people. Genuinely cannot travel — visa cycles, employer-held leave, cost. Already habituated to doing things for family at a distance through remittance. Malayalam, Telugu, Bhojpuri, Tamil, Hindi. $11 is ~AED 40 — affordable even at the lower income bands.

**Real, under-served, and the correct second wave.** Not the wedge because acquisition is structurally hard: this segment is not on English-language Google, it is on WhatsApp forwards and Malayalam/Telugu YouTube, and reaching it requires vernacular product surface we do not have (content.ts is EN + HI only today). Revisit at month 9.

### 1.4 Segment D — Urban Indian professionals (Bengaluru, Mumbai, Gurugram, Pune)

**Explicitly not a target. Do not launch in India.**

$11 = ~₹950. A local purohit does a home tarpan for ₹500–2,100. The temple down the road is free. Sri Mandir starts at ₹51. We lose on price to a cheaper incumbent, on legitimacy to physical presence, and on distribution to an app with tens of millions of installs. The only Indian sub-segment worth anything near term is **Indians in metros whose ancestral ghat is 1,500km away** (a Bengaluru Bengali, a Mumbai Tamilian) — a real but small pocket. Note it; do not build for it.

### 1.5 Segment E — Elderly and immobile in India

**Strongest need, weakest ability to transact.** No international card, low comfort with checkout flows, often no independent income. They are not the buyer. Their children are.

**This distinction is a product requirement, not a marketing note.** It means: the payer and the named person are different people; the named person must never need an account; the Sankalp Patra must be deliverable to a WhatsApp number the payer supplies; and the confirmation copy must be written to the payer *about someone else* ("A snan was offered in your mother's name") not to the beneficiary.

### 1.6 Segment F — NRIs booking on behalf of living aging parents

The brief flags this and it deserves a sharp answer: **it is weaker than it sounds.** A living parent in Haridwar can walk to the ghat. A living parent in Chennai has a family purohit. The version that *does* work is narrower and worth naming:

- parents who are **immobile or ill** (segment E, bought by their children), and
- **the parent and child named together in one sankalp** — which is the actual emotional job: not "I am outsourcing your rite" but "I am on this call with you at 4am your time while it happens."

Design consequence: Parivar's "up to six names, one gotra" is exactly right, and the live-attendance timezone converter should surface **two** timezones — the buyer's and the named family's — because the real product is a family being awake at the same time.

### 1.7 The wedge, stated once

> **First-generation Indians in the US, UK and Canada, aged 35–60, fulfilling an ancestral rite on a fixed date that they cannot fly home for.**

Everything in year one — copy, SEO, pricing, ops staffing, ghat selection — is aimed here.

---

## 2. Positioning

### 2.1 The statement (chosen)

**Internal positioning statement:**

> For first-generation Indians abroad who owe a rite to a river they cannot reach, Snanify performs a named, timed snan at the ghat itself and brings them into it live. Unlike online puja marketplaces, which sell you evidence after the fact, our product is your attendance — not a package.

**External line (EN):** **Be present at your own rite.**
**External line (HI):** **अपने अनुष्ठान में स्वयं उपस्थित रहें।**

**Relationship to existing brand copy:** "The river comes to you" / "नदी आप तक आती है" stays as the hero promise — it is the emotional claim and it is good. "Be present at your own rite" is the **differentiator**, and it belongs as the eyebrow-plus-title of a new section introducing live attendance, placed between `how` and `muhurat` in the page order. The two are complementary: the first says the distance is crossed, the second says who crosses it.

**Supporting proof line (EN):** "The rite is not performed instead of you. It is performed with you on the call."
**(HI):** "यह अनुष्ठान आपके स्थान पर नहीं, आपके साथ संपन्न होता है।"

This carries the participatory-not-substitutionary commitment (§2.4) in one sentence, in the brand's register.

### 2.2 Rejected alternative 1 — the convenience frame

> *"Skip the flight. Skip the queue. Snan in four minutes."*

**Rejected.** It reduces a rite to a transaction and invites the exact contempt that will define us if it lands first — "Zomato for moksha" is a headline someone will write, and convenience framing hands them the pen. Worse, it is commercially fragile: convenience competes only on price and speed, so the moment a cheaper competitor exists we have no argument left. It also fails the approval test that actually governs this purchase — the buyer's mother or elder brother in India will see the Sankalp Patra, and "I skipped the queue" is not a thing anyone forwards to their mother.

### 2.3 Rejected alternative 2 — the obligation/consequence frame

> *"Don't let another Pitru Paksha pass. Your ancestors are waiting."*

**Rejected, and prohibited.** It would work. That is what makes it dangerous. It converts because it manufactures a consequence for inaction, and the moment we imply that skipping a rite invites misfortune we are no longer selling a service, we are selling insurance against divine punishment — the explicit ethical line in this brief. It is also strategically fragile in a way that founders underrate: one screenshot of "your ancestors are waiting" in a diaspora WhatsApp group, or one r/india thread, and the brand is over. Everything downstream of it (retention emails, ad copy, push notifications) inherits the same rot. See §5.2 for the enforced ban list.

### 2.4 Rejected alternative 3 — the novelty/tech frame

> *"The world's first digital tirtha."*

**Rejected.** Novelty positioning wins press and loses customers. It buys one wave of coverage, no repeat purchase, and it files us permanently in the "gimmick" drawer where the religious authority we need — named acharyas, temple associations, family purohits — will never come near us. Nobody performs an ancestral rite at a startup because it is a first.

---

## 3. Competitive and adjacent landscape

### 3.1 The map

| Player | What they actually sell | Their strength | Their structural weakness for our wedge |
|---|---|---|---|
| **digitalsnanindia.com** | Ganga jal + prasad shipped to your door | A physical object on the shelf. Real emotional weight. | Logistics-bound. International shipping of liquids is customs-hostile and slow. Cost scales with distance — exactly the wrong shape for diaspora. |
| **Sri Mandir** | Temple puja booking, chadhava, e-hundi, panchang, audio content. India-first, Hindi-first, mass market, offers from ₹51. Tens of millions of installs. **The real competitor.** | Enormous distribution, low ASP, genuine trust in India, well-funded. | Built for India: Indian phone number, UPI/Razorpay, INR, IST-only slot display, courier address for prasad. A US card and a non-IST timezone break the flow. |
| **VAMA** | Puja booking, similar model | Breadth of temples | Same India-shaped constraints |
| **AstroTalk-adjacent puja funnels** | Astrology consult → remedial puja upsell, per-minute pricing | Very high margin, very high intent | **We must not compete here.** This is the fear-selling business. Sharing a category with it is a brand risk, not an opportunity. |
| **Temple live-streams (TTD, Vaishno Devi, Somnath, YouTube ghat cams)** | Free darshan | Free, authentic, high volume | You are a spectator. No name, no gotra, no sankalp, no record. |
| **e-hundi / online donation** | Money to a temple trust | Trusted, cheap, institutional | No experience, no artifact, no timing. The default "I sent something" option. |
| **The family purohit on WhatsApp video** | A relationship | **The true incumbent.** Free-form, personal, ₹2,100–11,000, already has your family's history | Unscheduled, unrecorded, no artifact, no calendar, cannot scale, and increasingly the purohit's own children have not taken up the practice. |

### 3.2 Where the gap actually is — and be skeptical

**The honest answer: the gap on "ritual performed remotely" is thin.** Sri Mandir already takes your name to a temple. Purohits already do this on video calls. Anyone can stream a river. If our pitch is "Sri Mandir but prettier and in English," we lose, because they will ship international cards in a quarter and they have 10,000× our distribution.

The gap is real and defensible only on three narrower axes, **and we need all three:**

1. **Diaspora-grade product surface.** This is boring and it is the actual moat at seed. International card acceptance without an Indian phone number. USD/GBP/CAD/AUD/AED pricing. Muhurat times converted to the buyer's timezone *and* their family's. No shipping address field, ever. English-primary with Hindi parity. Every one of these is a place an existing competitor currently drops a diaspora buyer, and each one is unglamorous enough that they will fix it late.
2. **Snan as an owned category.** Everybody books temple pujas. Nobody owns *river bathing*. Snan has a cleaner emotional logic than "puja" (water, purification, ancestors, a physical act with an obvious digital analogue), a natural festival calendar of its own, and no incumbent brand. Category ownership is worth more than feature parity — it is why "we do snan" beats "we do 400 pujas."
3. **Attendance over delivery.** Everyone else ships you proof after the fact. Nobody has made the live, timed, two-way moment *the product*. Weak as a technical moat — anyone can stream — but strong as positioning and it is the only thing that justifies charging $51 where a competitor charges ₹501.

**A fourth, softer axis: honesty as differentiation.** This category runs on inflated counters, vague credentials and unattributed panchang dates. A rite that is verifiable — timestamped stream, named priest with consent, published ghat, named panchang source — is a genuine wedge with the *skeptical* member of the household, who is very often the one holding the card (the second-gen child, the non-Hindu spouse, the engineer who checks things).

**What we must not tell ourselves:** that being tasteful is a strategy. Design quality gets us the first thousand customers from the segment that notices design. It will not survive contact with a well-funded incumbent adding a language.

---

## 4. Acquisition channels, ranked

Ranked by **fit = intent × reachability × cost efficiency × trust transfer.**

### Rank 1 — SEO on occasion and rite queries
Highest intent, lowest marginal cost, compounds. Full plan in §4.1. **This is the channel. Everything else supports it.**

### Rank 2 — Diaspora temple associations and samaj organisations
Hindu temples and community associations in New Jersey, Chicago, the Bay Area, Houston, Atlanta, Toronto/GTA, London/Wembley, Leicester, Birmingham, Melbourne, Sydney, Singapore. **All specific organisations are PLACEHOLDER until an agreement is signed. Do not name any organisation on the site as a partner before then.**

**The mechanic — "Association Muhurat":** a temple or community org sponsors one collective snan on an occasion. Members submit names through a co-branded page. Snanify performs the rite carrying the submitted names; the association receives a fixed per-name share (PLACEHOLDER: propose $3 of $11, $8 of $31) and a recording to play at their own event.

**Set expectations correctly: this is a credibility channel, not a volume channel.** Committee decisions take 3–6 months. A single association might deliver 40–200 names. What it actually delivers is the right to say "performed for the community of [org]" — trust transfer that no amount of ad spend buys. Budget it as brand, staff it as sales, do not forecast revenue from it in year one.

### Rank 3 — WhatsApp family networks (the share loop)
This is the actual distribution medium of Indian family life and it does not respond to referral codes. **The mechanic must be a shareable artifact, not an incentive.**

Build two forwardable objects:
- **The Sankalp Patra share card** — 1080×1920 and 1080×1080 PNG, generated server-side, bearing the name, gotra, ghat, date and muhurat, in brand typography. It must look like something a person is proud to send their mother, not like an ad.
- **The 40-second clip** — auto-cut from the recording: the moment the name and gotra are spoken, plus the dip. Under 16MB so WhatsApp does not recompress it into mush.

Default share text, fully editable by the user:
- **EN:** `A snan was offered at {ghat} on {date}, in the name of {name}. {link}`
- **HI:** `{date} को {ghat} पर {name} के नाम से स्नान अर्पित किया गया। {link}`

No "Get $5 off," no "invite 3 friends." The artifact is the referral.

### Rank 4 — YouTube: an owned, always-on ghat stream
A continuous, free, unhyped stream from one ghat (start with Har Ki Pauri). Serves four purposes at once: top-of-funnel discovery on "har ki pauri live" style queries; proof-of-realness for skeptics; the destination for the existing "Watch a snan / एक स्नान देखें" CTA; and it doubles as the recording infrastructure we need anyway. Slow burn, very high proof value, near-zero marginal cost once the camera exists.

### Rank 5 — Paid search, narrowly and seasonally only
**Capped to five windows per year** (Pitru Paksha, Kartik Purnima, Makar Sankranti/Magh, Mahashivratri, Ganga Dussehra), three weeks each, on long-tail occasion + geography queries only. Never on broad "puja online" or "astrology" — that is a CPC war with better-funded incumbents and, in the astrology case, a brand contaminant.

**Compliance constraint:** Meta and Google restrict targeting and retargeting based on bereavement and personal-hardship signals. Assume we cannot retarget visitors to shraddh content, and plan an organic-dominant funnel. (See open questions.)

### Rank 6 — Regional and linguistic associations
An under-exploited targeting handle: **our six rivers map cleanly onto linguistic communities.**

| River | Primary linguistic affinity |
|---|---|
| Ganga (Haridwar) | Hindi belt — UP, Bihar, Rajasthan, Haryana, Delhi |
| Triveni Sangam (Prayagraj) | Pan-North Indian; strongest Bihari/UP |
| Yamuna (Mathura) | Braj, Vaishnav, Gujarati Vaishnav |
| Godavari (Nashik) | Marathi, Telugu |
| Shipra (Ujjain) | Malwi, Marathi, Shaiva |
| Kaveri (Talakaveri) | Kannada, Tamil, Kodava |

Telugu, Tamil, Marathi, Gujarati, Kannada and Malayalam diaspora associations are therefore addressable with *a specific river*, not a generic pitch. This is the highest-leverage step toward the Gulf and South Indian segments and the trigger for extending `Lang` beyond `en | hi`.

### Rank 7 — Diaspora purohit affiliate
Purohits serving diaspora families already perform home rites but cannot perform a river rite. Position Snanify as **the river half of their service**, not a competitor. Named partner link, transparent share (PLACEHOLDER: 20%). Must be disclosed on the site as a paid referral — a kickback dressed as dakshina is exactly the thing that ends this brand.

### Rank 8 — Funeral homes and cremation services serving Hindu families abroad
Highest intent in the entire landscape and the worst possible place to sell. **Deferred until post-PMF and gated on a written policy:** informational listing only, never an approach at the point of grief, never a commission on a bereavement referral. Flagged here because someone will propose it; the answer is prepared.

### Rank 9 — Instagram / TikTok creator content
Low fit at seed. Wrong register — the format pulls toward the "cutesy devotional" failure mode the brief prohibits. Revisit only for segment B (second-gen) with an education-first, non-transactional format.

### Rank 10 — Gulf print and community radio, vernacular YouTube
Correct for segment C, wrong for year one. Month 9+.

### Explicitly rejected channels
Astrology influencer partnerships. Remedial-puja affiliate networks. Retargeting on grief keywords. Cold email or WhatsApp blasts to non-customers on death anniversaries. Any "X people from your city booked this" social-proof widget unless the number is literally true and live.

### 4.1 The SEO plan, concretely

**Route structure**

```
/occasions/{slug}                    EN occasion pages
/hi/parv/{slug}                      HI mirror
/rites/{slug}                        EN rite explainers
/hi/vidhi/{slug}                     HI mirror
/waters/{river-slug}                 6 river hubs (exists conceptually today)
/waters/{river-slug}/live            6 live-stream pages
/{country}/{occasion-slug}           geo × occasion, only where volume is real
```

**Cluster 1 — Occasion + "online" (24 pages, highest commercial intent)**
Target queries: `pitru paksha tarpan online`, `mahalaya amavasya tarpan online usa`, `shraddh puja online for father`, `tarpan online booking from usa`, `ganga snan online booking`, `kartik purnima snan online`, `somvati amavasya snan online`, `makar sankranti ganga snan online`, `magh snan online`, `ganga dussehra snan booking`.

Page template, in order:
1. What the rite is, in four sentences. No fluff.
2. When it falls this year — **rendered from a sourced record only.** If unsourced, the page renders "Dates for {year} open on {date}" and never a guess.
3. Who performs it and where, with the priest named (PLACEHOLDER until consented).
4. What the buyer gets, priced.
5. A timezone converter: IST muhurat → US Eastern, US Pacific, UK, Toronto, Sydney, Dubai, Singapore.
6. FAQ, marked up as `FAQPage`.
7. Honest limits section (see §5.3).

**Cluster 2 — Rite explainers (40 pages, informational, authority-building)**
`what is gotra`, `how to find your gotra if you don't know it`, `what is sankalp`, `difference between tarpan and pind daan`, `can a daughter perform shraddh`, `can shraddh be performed from abroad`, `what to do if you missed pitru paksha`, `what is brahma muhurat`, `why is Gaya significant for pind daan`, `what is kalpvas`.

Two of these deserve special attention. **"How to find your gotra"** is high-volume, high-shame, and unlocks our own checkout — a person who cannot fill the gotra field abandons. Answer it properly and offer "Kashyap" as the accepted convention for those who genuinely do not know, with an explanation of why that is acceptable. **"Can a daughter perform shraddh"** is high-volume, high-emotion and answered badly across the web; answering it honestly and inclusively is both right and differentiating — but see open questions, it is a real theological commitment.

**Cluster 3 — Place pages (12 pages)**
`har ki pauri ganga snan`, `triveni sangam snan prayagraj`, `ram kund nashik godavari`, `talakaveri kaveri`, `vishram ghat mathura`, `ram ghat ujjain`, each paired with a `/live` page. These also carry the ghat streams from channel 4.

**Cluster 4 — Geo × occasion (build 12, not 48)**
`pitru paksha 2027 dates usa time`, `hindu ancestral rites online from uk`, `ganga snan for nri in canada`. **Do not mass-generate doorway pages** — thin geo permutations get the whole domain demoted, and it would be a dishonest page in a product whose position is honesty.

**Cluster 5 — Vernacular**
Full HI mirror of clusters 1–3 at launch. Telugu, Tamil, Marathi, Gujarati, Malayalam, Kannada, Bengali at month 9, gated on `Lang` being widened in `src/lib/content.ts` (currently `"en" | "hi"`).

**Technical requirements**
- `hreflang` for `en`, `hi`, and country variants; `x-default` → `/`.
- Schema: `Article` on explainers, `FAQPage` on all, `Event` on each muhurat (`startDate` in IST with explicit offset, `eventAttendanceMode: OnlineEventAttendanceMode`), `Organization` with a real postal address.
- A canonical `/panchang-source` page naming the almanac or ephemeris used, its licence, and the drik-vs-vakya convention we follow. Link to it from every date on the site.
- Open Graph cards per occasion, reusing `src/lib/og-card.tsx`.

**Cadence and lead time**
6 pages/week from month 1. **Occasion pages must publish 90 days before the occasion** — Google needs the indexing runway and users start searching 2–6 weeks out.

---

## 5. The ethics line, made enforceable

The brief says dignity and honesty are product requirements. Requirements are testable. These are the tests.

### 5.1 The rule
**We sell access and fidelity. We never sell consequence.**
We may say what we do, where, when, by whom, and how faithfully. We may never say what happens to you if you don't.

### 5.2 Prohibited copy — enforced by test

Add `src/lib/content.test.ts` (or the project's test runner equivalent) that walks every string in `content` and every CMS-authored page body and fails the build on these patterns, case-insensitive:

**English:** `pitru dosh`, `dosh will be removed`, `removes dosh`, `your ancestors are waiting`, `unfulfilled souls`, `restless souls`, `misfortune`, `bad luck`, `sin will be washed`, `guaranteed moksha`, `moksha guaranteed`, `100% authentic`, `last chance`, `before it's too late`, `only \d+ slots left`, `hurry`, `blessed by` (unless followed by a named, consented signatory), `certified by` (same), `cures`, `brings wealth`, `brings a child`, `fixes your marriage`.

**Hindi:** `पितृ दोष`, `दोष दूर`, `पाप धुल`, `पूर्वज प्रतीक्षा`, `अतृप्त आत्मा`, `अनिष्ट`, `अंतिम अवसर`, `जल्दी करें`, `मोक्ष की गारंटी`, `गारंटी`, `संतान प्राप्ति`, `धन प्राप्ति`, `विवाह में बाधा`.

**"Pitru dosh" is the headline prohibition.** It is the primary fear-selling hook in this category and the fastest route to revenue. Banning it in a test rather than a values document is the point: the growth hire who joins in month eight and has never read this spec will still hit the failing build.

### 5.3 The honest-limits section — required on every purchase page

**EN:**
> **What this is, and what it is not.**
> The rite is performed at the ghat by a priest who speaks your name and your gotra and reads the sankalp you wrote. You attend live. Nothing is shipped to you — no water, no prasad, no object. This does not replace a snan taken with your own body in the river, and we make no claim about what it earns you. It is a way to be present at a rite on the day it must be performed, when you cannot stand at the water yourself.

**HI:**
> **यह क्या है, और क्या नहीं।**
> अनुष्ठान घाट पर पुरोहित द्वारा संपन्न होता है — वे आपका नाम, आपका गोत्र उच्चारित करते हैं और आपका लिखा संकल्प पढ़ते हैं। आप सजीव सम्मिलित होते हैं। आपको कुछ भी भेजा नहीं जाता — न जल, न प्रसाद, न कोई वस्तु। यह स्वयं जल में की गई डुबकी का स्थान नहीं लेता, और इसके फल के विषय में हम कोई दावा नहीं करते। यह केवल उस दिन उपस्थित रहने का एक मार्ग है, जब आप स्वयं जल तक नहीं पहुँच सकते।

That last paragraph is the most commercially expensive thing in this document and the most valuable. It is also the paragraph a customer screenshots approvingly.

### 5.4 A note on the price/dignity tension
$11 for a father's shraddh reads as *insufficiently serious* to the wedge buyer. This is a real conversion problem in the opposite direction from the usual. Hence the fourth SKU in §6.

---

## 6. Pricing addition

Keep the existing three. **Add one, positioned for the wedge:**

| SKU | Price | Role |
|---|---|---|
| Ekal Snan / एकल स्नान | $11 | Trial SKU. Near break-even. Buys the first experience. |
| Parivar / परिवार | $31 | Margin SKU. |
| **Pitru Tarpan / पितृ तर्पण** | **$51** | **New. The wedge SKU.** Single-ancestor or family tarpan on a specified tithi or during Pitru Paksha, at Prayagraj or Haridwar. Named recitation, extended recording, Sankalp Patra naming the ancestor, entry into the Tithi Panji. |
| Varsh / वार्षिक | $108 | Cash-flow SKU. Prepaid, recognised across twelve performed snans. |

51 is a shagun amount and holds the auspicious-number scheme (11 / 31 / 51 / 108).

**Copy for the new tier**
- **EN name/sub:** `Pitru Tarpan` / `For those who came before`
- **HI name/sub:** `पितृ तर्पण` / `जो पहले आए, उनके लिए`
- **EN features:** `One ancestor, or the whole line`, `Performed on the tithi, in your timezone`, `Name and gotra spoken aloud, on the recording`, `Sankalp Patra in the ancestor's name`, `Their tithi kept in your Panji, free, forever`
- **HI features:** `एक पूर्वज, या पूरी परंपरा`, `तिथि पर संपन्न, आपके समयक्षेत्र में`, `नाम और गोत्र सस्वर उच्चारित, रिकॉर्डिंग में`, `पूर्वज के नाम संकल्प पत्र`, `उनकी तिथि आपकी पंजी में, निःशुल्क, सदैव`

**Blended AOV model (PLANNING ASSUMPTION, not a forecast):** mix 45% Ekal / 25% Parivar / 20% Pitru Tarpan / 10% Varsh → $4.95 + $7.75 + $10.20 + $10.80 = **$33.70 AOV.**

**COGS target ≤ 35%** (priest fee, ghat operator, videographer, streaming, ~5% international payment fees, Patra generation). At $11 that is $3.85 per snan — genuinely tight, which is the honest reason Ekal is an acquisition product and not a business.

**Out of scope, permanently: asthi visarjan.** It is the highest willingness-to-pay in the category (plausibly $251–501) and it requires physically receiving human remains, which violates the all-digital constraint and drags us into cross-border remains regulation. We offer the accompanying tarpan and sankalp only, and **we state this limit on the site** rather than letting a bereaved customer discover it after paying. This is a real strategic cost of the all-digital constraint; accept it consciously.

---

## 7. Seasonality and cash flow

### 7.1 The demand calendar

Lunar occasions, so Gregorian dates move 11–19 days a year. **Months below are approximate windows, not dates. Nothing here may ship as a specific date without a sourced panchang record.**

| Window (approx.) | Occasion | Demand | Note |
|---|---|---|---|
| Sep–Oct, ~16 days | **Pitru Paksha / Mahalaya Amavasya** | **Peak, 30–40% of annual revenue** | The wedge's occasion. Everything is built for this. |
| Oct–Nov | **Kartik Purnima / Dev Deepawali** | **Second peak** | The biggest *snan-specific* occasion — bathing is literally the rite, not an adjunct. Best category-fit moment of the year. |
| Mid-Jan – mid-Feb | **Makar Sankranti → Magh snan / kalpvas** | Sustained mid-volume, ~30 days | A daily-bathing tradition. The natural home of the Varsh tier. |
| Feb–Mar | **Mahashivratri** | Spike | Broad appeal; Shipra/Ujjain and Haridwar. |
| May–Jun | **Ganga Dussehra, Nirjala Ekadashi** | **Third peak** | The Ganga's own festival. |
| Jul | Guru Purnima | Moderate | |
| Jul–Aug | Shravan Mondays, Kanwar season | Moderate | Ganga-jal-coded, Shiva-coded. |
| 1–3× a year, unpredictable | **Somvati Amavasya** | Small spike | Snan-specific, date unpredictable — an excellent newsletter moment precisely because people miss it. |
| Every 3 / 6 / 12 years | **Kumbh, Ardh Kumbh, Simhastha** | **10–100×** | Capacity event and existential ops risk. Years must be verified — see open questions. |
| **Any day** | **Death anniversary (tithi / barsi)** | **Flat, year-round** | **The single most important line in this table.** |

**Troughs: late March–April, and December.** Post-Shivratri to Ganga Dussehra is the long dry stretch.

### 7.2 What it means for cash

- Peak-to-trough monthly revenue ratio of roughly **5:1**. Two lunar months plausibly carry **45–55% of annual revenue.**
- COGS is peaky with revenue, but **fixed cost is flat** — ghat relationships, retainers, streaming infrastructure, salaries. Trough months burn.
- **Working-capital rule: enter March holding four months of fixed cost in reserve.** Not three.

**Mitigations, ranked by effectiveness:**
1. **Sell Varsh hardest at the peak.** $108 collected during Pitru Paksha and Kartik, delivered across twelve months, is peak cash funding trough operations. Merchandise it aggressively in exactly those two windows and lightly the rest of the year.
2. **The anniversary product flattens the curve.** Individual tithis are uniformly distributed across the year by construction. This is why the Tithi Panji (§8) is not a retention nicety — it is the cash-flow engine. Every registered tithi is a booking opportunity in a month that has no festival.
3. **Gift snans** at Diwali, Karwa Chauth, parents' birthdays, and Father's/Mother's Day in the diaspora markets — these land in troughs.
4. **Never put priests or crew on annual contracts.** Per-rite fees only, with a retainer at the two peak ghats.

**Revenue recognition:** Varsh is a twelve-snan obligation. Recognise **1/12 per performed snan**, not on sale. This matters for refunds, for solvency, and for not spending money you owe as service. Ship a `deferredRevenue` ledger with the Varsh SKU or do not ship the SKU.

### 7.3 The launch sequence (calendar-aware, from 10 Aug 2026)

- **Pitru Paksha 2026 (weeks away — verify window).** **Do not chase it at scale.** Run a hand-operated pilot: one ghat (Har Ki Pauri), 100–300 snans, cap enrolment publicly, founder-operated ops, every customer contacted personally. We have no redundancy; a missed muhurat for 800 grieving families is a brand-ending day. The pilot buys the one asset we cannot buy later — a real, verifiable, showable track record.
- **Kartik Purnima 2026 (Oct–Nov).** **First real commercial moment.** Two ghats. Paid search window one. Association Muhurat pilot with 1–2 PLACEHOLDER orgs.
- **Magh / Makar Sankranti 2027 (Jan–Feb).** Varsh push. Kalpvas as a daily-snan offer.
- **Mahashivratri 2027.** Third ghat live.
- **Ganga Dussehra 2027 (May–Jun).** All six rivers live.
- **Pitru Paksha 2027.** Full scale. This is the date the whole first year is built toward — twelve months of SEO maturity, a populated Tithi Panji, and a year of recordings to point at.

---

## 8. Retention: the Pitru Tithi Panji

**Name:** Pitru Tithi Panji / **पितृ तिथि पंजी**. ("Panji" — register, almanac. Dignified, correct, not a product-marketing word.)

### 8.1 What it is
The user records the death tithi of family members once — name, relation, gotra, and either the tithi (paksha, month, tithi) or the Gregorian date of death, from which the tithi is derived. Each year, Snanify computes when that tithi falls on the Gregorian calendar **in the user's timezone**, and tells them.

That is the whole product. It is free. It carries no purchase requirement.

### 8.2 Why it is the strongest mechanic here
- **The value is real and hard.** Tithi drifts 11–19 days a year against the Gregorian calendar; there are adhik-maas complications; families genuinely get this wrong every year and feel bad about it. Solving it is a real service.
- **The value is complete without a purchase.** This is what makes it non-manipulative rather than a dressed-up dunning sequence. It is the same information a family purohit gives free, delivered by software.
- **It creates the switching cost.** Once a family's tithis are recorded, moving to a competitor means re-entering the dates of their dead. That is a genuine, non-coercive moat.
- **It is counter-cyclical.** See §7.2.
- **It recruits the next generation.** A second-gen child who inherits access to the Panji inherits knowledge their parents would otherwise have taken with them. This is the honest answer to the "market ages out" risk in §9.8.

### 8.3 The guardrails (these are requirements, not guidelines)
- **Maximum one email + one optional WhatsApp per registered tithi per year**, sent 14 days before. Plus one Pitru Paksha notice per year. That is the ceiling. Hard-coded.
- **No second reminder. Ever.** If they did not book, that was their answer.
- No countdown timers, no scarcity language, no red, no push notifications, no "you haven't completed your sankalp."
- The date is given **in the message body**. The user gets the value without clicking.
- Unsubscribe turns off reminders and **keeps the register** — losing their family's dates must never be the price of not wanting email.
- Full self-serve edit and delete, and an export.

### 8.4 Reminder copy

**EN — subject:** `{Relation} {Name}'s tithi falls on {date}`
**EN — body:**
> Namaste {firstName},
>
> The tithi you recorded for your {relation}, {name} — {tithiName}, {paksha}, {lunarMonth} — falls this year on **{date}** where you are ({timezone}). It begins {startTime} and ends {endTime}.
>
> That is all this note is for.
>
> If you would like to mark the day with a tarpan at {river}, you can do that here — {link}. If you would rather not have this reminder, you can turn it off and keep the register: {prefsLink}.
>
> — Snanify

**HI — subject:** `{Name} की तिथि {date} को`
**HI — body:**
> नमस्ते {firstName},
>
> आपने अपने {relation} {name} की जो तिथि दर्ज की थी — {tithiName}, {paksha}, {lunarMonth} — इस वर्ष आपके यहाँ **{date}** को पड़ रही है ({timezone})। यह {startTime} पर आरंभ होकर {endTime} पर समाप्त होती है।
>
> इस संदेश का इतना ही प्रयोजन है।
>
> यदि आप इस दिन {river} पर तर्पण करना चाहें, तो यहाँ से — {link}। और यदि आप यह स्मरण नहीं चाहते, तो इसे बंद कर सकते हैं; पंजी सुरक्षित रहेगी: {prefsLink}।
>
> — स्नानिफ़ाई

Note the register: it states the date, states its own purpose, offers once, and offers the exit. No urgency, no consequence, no second ask.

### 8.5 Supporting mechanics
- **The Family Archive** — every recording and Sankalp Patra kept indefinitely and shareable with named family members. Retention through accumulated asset. Already promised in the Parivar tier ("HD recording, kept for good") — make it a real, browsable surface.
- **Varsh** — structural retention through prepayment, honestly delivered.

### 8.6 Explicitly rejected retention mechanics
Streaks. Points. Badges. A "spiritual score." Tiered punya. Leaderboards. "Your sankalp is incomplete." "It has been 11 months since your last snan." Anniversary emails to people who never registered a tithi. Any notification whose value depends on the user clicking it.

---

## 9. Risks that could kill this, ranked

**1. Religious legitimacy collapse.** A prominent acharya, a temple body, or a viral thread declaring digital snan invalid — or worse, adharmic. This is the fastest death available.
*Mitigation:* publish the shastric reasoning for remote sankalp with sources; name the priests and their sampradaya (with consent); position as participatory not substitutionary (§2.4); never claim equivalence to a physical snan; assemble a named advisory panel **before** scale, not after the attack.

**2. The authenticity attack — and its specific form, the batching question.** "Are you actually doing my rite, or reading four hundred names off a list once?"
*Mitigation:* answer it before a critic answers it for us. Publish exactly what is individual (your name and gotra spoken aloud; your sankalp read) and what is shared (the ghat, the priest, the muhurat window), and price accordingly. **Immediate action: the live homepage stats — "1,20,000+ sankalps offered" and "48 countries served" — are unverified in this repo. If they are not real they must come down before any paid traffic runs.** An unverifiable counter on the homepage of an honesty-positioned product is the exact artifact that gets screenshotted.

**3. Thin differentiation → margin compression.** Sri Mandir ships international cards, English UI and USD pricing in one quarter and we have no answer.
*Mitigation:* all three axes from §3.2, plus build the Tithi Panji and Family Archive early — they are the only switching costs available to us.

**4. Operational fragility at the ghat.** Monsoon flooding at Haridwar, crowd control at Prayagraj, police restrictions on filming, no connectivity at Talakaveri at 4am, priest no-shows.
*Mitigation:* two ghats per river wherever possible; a **fallback and refund policy stated in the terms before purchase**, not improvised after; automatic full refund plus reperformance at the next muhurat; dedicated live ops staffing at the two peaks.

**5. Payments and regulatory.** Money crossing into India for a religious service; GST; export-of-service zero-rating; high decline rates on India-acquired transactions from US issuers.
*Mitigation:* likely structure is a non-India billing entity settling to an Indian operating subsidiary for priest payouts. **Needs real counsel — see open questions.**

**6. Platform advertising restrictions on bereavement.** Meta and Google restrict targeting on personal-hardship signals, which is most of our highest-intent audience.
*Mitigation:* the plan is already organic-dominant. Confirm the policy before budgeting.

**7. Seasonal cash-flow failure.** Run out of money in April after a great September.
*Mitigation:* §7.2 — Varsh sold at peak, tithi bookings year-round, four months of reserve entering March.

**8. The market ages out.** The first-gen buyer is 45–65. In twenty years the segment shrinks.
*Mitigation:* the education content and the Family Archive, which hand the second generation an existing record rather than an empty form. Long-horizon, and it is the actual strategic reason to build the Archive.

**9. Brand contamination by association.** Filed alongside astrology-remedy sellers or absorbed into political-religious branding.
*Mitigation:* hold the line already set in the brief — no astrology upsells, no remedial-puja funnel, no political imagery, no maps, no "Sanatan" campaigning, no saffron.

**10. Key-person and priest dependency.** One bad actor at one ghat, or the loss of the one relationship that makes Haridwar work.
*Mitigation:* redundancy at the two peak ghats before Kartik 2026; written agreements; no single priest carrying more than 40% of volume.

---

## 10. Engineering artifacts required

### 10.1 Sourced-data type (enforces the no-invented-dates constraint at compile time)

```ts
// src/lib/sourced.ts
export type Sourced<T> =
  | { status: "sourced"; value: T; source: string; sourceUrl?: string; verifiedAt: string }
  | { status: "unsourced" };

export const isSourced = <T,>(s: Sourced<T>): s is Extract<Sourced<T>, { status: "sourced" }> =>
  s.status === "sourced";
```

Every panchang date, muhurat time, tithi computation and priest credential is typed `Sourced<T>`. UI cannot render a value without narrowing, so an unverified date **cannot** reach the page — it renders the "dates open on…" fallback instead. This turns a policy into a type error.

### 10.2 New content keys in `src/lib/content.ts`
`positioning` (the differentiator line + proof line, EN/HI), `pricing.plans[]` gains the Pitru Tarpan entry, `honestLimits` (§5.3), `panji` (register UI + reminder copy), `occasions` (occasion page template strings), `share` (WhatsApp default text), `trust` (batching disclosure, panchang source, priest listing).

### 10.3 Widen `Lang`
Currently `"en" | "hi"`. Month 9 requires `te | ta | mr | gu | ml | kn | bn`. Ensure `content` is keyed by a `Record<Lang, …>` that tolerates partial locales with EN fallback, and that `globals.css` gets per-script font blocks alongside the existing `html[lang="hi"]` rule (Devanagari is handled; Telugu, Tamil, Malayalam, Kannada, Bengali and Gujarati each need their own display/body pairs — do not let them fall back to Latin serif).

### 10.4 Banned-copy test
`src/lib/content.test.ts` — walks all strings in `content` plus all authored page bodies, fails on the §5.2 pattern list. Run in CI on every commit.

### 10.5 Reminder-frequency invariant
A hard cap enforced in the sending code, not in a config a growth tool can override: **≤1 tithi reminder per registered name per calendar year, +1 Pitru Paksha notice per user per year.** Write it as an assertion with a test, because this is the constraint that will be under the most pressure in month nine.


---

## Open questions for a human

- Panchang sourcing: which almanac or ephemeris is authoritative, and under what licence? Drik Panchang, Kashi Vishwanath Panchang, Mahavir Panchang and Swiss Ephemeris disagree on tithi start/end by minutes to hours, and the drik-vs-vakya split materially changes South Indian dates. We must name one source publicly, license it properly, and never compute a date we cannot attribute. Until this is resolved every occasion date in the product must render as unsourced, not as a guess.
- Priest partnerships: who actually performs the rite at each of the six ghats, under what agreement, with what per-rite fee, and with consent to be named and filmed? Every priest name, sampradaya and credential in this document and on the site is PLACEHOLDER. An advisory panel of named, consenting acharyas should exist before scale, not after the first legitimacy attack.
- Batching policy: how many sankalps does one priest carry in one rite, and are we willing to publish that number? This is the single question that decides whether we survive scrutiny. Recommendation is to state it plainly before a critic states it for us, but the operational and pricing consequences need a founder decision.
- Entity and payment structure: billing entity outside India with an Indian operating subsidiary for priest payouts is the likely shape, but GST treatment, export-of-service zero-rating, FEMA implications of routing money for religious services, and card decline rates on India-acquired transactions from US issuers all need real Indian and US counsel. Do not assume FCRA is irrelevant just because this is commercial — it will be asked.
- Advertising policy compliance: Meta and Google restrict targeting and retargeting on bereavement and personal-hardship signals. Confirm whether occasion pages about shraddh can be retargeted at all before budgeting for it — the plan currently assumes they cannot.
- Verification of the live homepage statistics (1,20,000+ sankalps, 48 countries). If these are aspirational placeholders they must come down this week.
- Kumbh and Simhastha years: the next Nashik and Ujjain Simhastha and Ardh Kumbh years are a 10–100× demand event and a capacity nightmare. The actual years must be verified against a reliable source before any capacity or fundraising plan cites them.
- Whether Snanify will ever state a position on who may perform shraddh (daughters, sons-in-law, adopted children). The SEO plan calls for answering it because it is high-volume and badly answered elsewhere, but it is a genuine theological commitment with community consequences and needs a founder decision, not a content writer's.

---

## Adversarial review

**Verdict:** needs-work

### Credibility risks

- THE CENTRAL CLAIM IS FALSE. 'Be present at your own rite' and 'The rite is not performed instead of you, it is performed with you on the call' will be read by any literate Hindu as marketing overreach. In sankalp you state desha and kala — where you are and when. A man in New Jersey is not at Har Ki Pauri; the priest performs on his behalf, and he watches. That is proxy performance, which has centuries of legitimate precedent (Gaya tirtha-purohits, TTD arjita seva, the entire pratinidhi tradition). The spec has it exactly backwards: substitution is the defensible position with shastric grounding, and 'you were present' is the novel claim with none. You have chosen to lie about the one thing you did not need to lie about.
- SNAN IS NOT SHRADDH, AND TARPAN IS NOT SHRADDH. A 'Pitru Tarpan' SKU sold on a death anniversary invites the buyer to believe he has discharged his varshik shraddh. He has not — that requires pinda-dana, brahmana-bhojana, and the karta's own hands. Selling a man relief from an obligation you do not actually discharge is the deepest exploitation in this document, worse than any banned phrase, and it is entirely unaddressed.
- The wedge is explicitly guilt-indexed. §1.1 lists 'Guilt about distance: substantial' as a qualifying attribute of the target segment, and the summary says 'obligation converts where devotion browses'. You have identified guilt as the conversion engine in the same document that bans guilt language. A word ban does not fix a targeting thesis. Without structural guardrails this is fear-selling with better manners.
- TARPAN ROLE MODEL IS WRONG. In a pitru rite the sankalp names the KARTA — the living descendant, with his gotra — and the pitru is the recipient, named with relationship. The spec's data model ('the named person', 'A snan was offered in your mother's name') inverts this. Ship that UI and every ritually literate buyer knows within thirty seconds that nobody at this company has done a tarpan.
- $51 justified as 'shagun' for a PITRU rite. Shagun +1 amounts (51, 101, 501) belong to mangal karya. In much of North India the convention for death-related giving is the opposite — round amounts, no auspicious increment — and ₹101 at a shraddh is a known faux pas. Applying wedding-gift numerology to an ancestral rite is precisely the tell of an outsider.
- Pricing the ancestral SKU higher because 'the emotional weight is higher' and '$11 may read as not taking it seriously' is grief pricing. It is price discrimination on bereavement, and it will be described that way. The rationale is the problem, not the number.
- Gotra as a required field is a quiet caste filter. Large numbers of Hindus — many Tamil non-brahmin, OBC, Dalit, Lingayat, and matrilineal Nair/Bunt families — have no gotra in the pravara sense and use kula-devata, native place, or lineage instead. 'Up to six names, one gotra' bakes the assumption into the product, and the spec repeats 'gotra is not friction' four times as a virtue of the segment.
- NOBODY HAS ASKED WHETHER THE PRIEST WILL PERFORM FOR ANYONE. If a Dalit family books a Pitru Tarpan and the ghat purohit refuses, performs a lesser vidhi, or asks about jati on a live stream, that is a national news story and a company-ending one. Zero coverage.
- No data protection anywhere in the legal section. The footer says 'Prayagraj & Berlin' — a German controller collecting religion, gotra and family death records from EU and UK residents is processing GDPR Article 9 special-category data, needing explicit consent and almost certainly a DPIA. Add India's DPDP Act 2023 for the operating sub. The spec worries about FEMA and FCRA and misses the exposure that actually bites in month three.
- Delivering a Sankalp Patra to 'a WhatsApp number the payer supplies' is unsolicited third-party messaging — a WhatsApp Business Policy violation, PECR/TCPA exposure, and, worse, an unrequested message to a grieving elderly parent who never consented.
- Filming at the ghats is treated as free. Har Ki Pauri (Ganga Sabha), Vishram Ghat, Ram Kund and Ram Ghat are trust- and municipality-controlled; commercial filming needs permission and repeat unpermitted shooting gets you removed at peak season. Separately, your stream captures other bathers — partially clothed, some performing their own family's shraddh — and the pricing page promises 'HD recording, kept for good'. That is a dignity and DPDP problem with no consent model.
- Priest economics are invisible. A $51 SKU where the ghat purohit receives ₹200 is extractive, will be reported as such by the first journalist who asks, and is genuinely wrong independent of optics. The spec treats priests as supply, not as a party with interests.
- The document commits the sin it polices. '₹51 starting price', 'tens of millions of installs', '9 million Gulf Indians', '$1,400 flight', '₹500–2,100 purohit', 'two lunar months carry ~50% of the year', 'household income $90k–250k' are all asserted as fact and none is sourced — in a spec whose §1 rule is that unsourced numbers must render as unsourced.
- Free-text sankalp uttered aloud at a public ghat, with no moderation policy. Someone will submit a curse, an abusive intention, a political statement, or the name of a living person entered without consent. This is a day-30 incident, not a hypothetical.
- Strategic inconsistency: the entire product surface is built for the pitru wedge, and the first commercial moment is Kartik Purnima — a devotional occasion, not a pitru one. You are launching the wrong segment on the wrong day.
- Missing entirely: what happens when the stream drops, the ghat floods, the priest does not appear, or a timezone bug makes the buyer miss the muhurat. For a rite with a hard deadline this is the highest-frequency and highest-stakes failure, and EU/UK distance-selling rules require an express waiver of the 14-day cancellation right before immediate performance.
- Minor but real: 'Snanify' is the -ify tech register the brand claims to reject. For a 55-year-old booking his father's rite it reads flip. Not fixable now; do not compound it by naming the pitru SKU in the same voice.

### Required fixes

- Rewrite the positioning claim to something true. Kill 'The rite is not performed instead of you.' Replace with: the rite is performed on your behalf, in your name and gotra, at the ghat, at the appointed hour — and you may witness it as it happens. Keep 'Be present at your own rite' only if 'present' is explicitly framed as your presence, not as ritual co-location. The honest version is still the strongest claim in the category, because no competitor offers it either.
- Add a mandatory, prominent, non-legalese disclosure on every pitru SKU: this is a tirtha-snan and tarpan offered in your name; it does not replace your family's shraddh, and we will not tell you that it does. Put it in the flow, not the T&Cs. This single sentence is worth more brand equity than the whole positioning section.
- Fix the ritual data model before any UI is built. Two roles: the KARTA (living, gotra + nama, the person on whose behalf the sankalp is spoken) and the PITRU (deceased, name + relationship + tithi). Copy becomes 'A tarpan was offered by you for your mother', not 'in your mother's name'. Get this right and literate buyers relax; get it wrong and nothing else you do recovers.
- Make gotra optional with dignity. Offer Kashyapa gotra as the standard convention for those without one, plus kula-devata, native place, and mother's line for matrilineal families. Never make the absence of a gotra feel like a failed form validation. Remove 'gotra is not friction' from the wedge rationale — it is a caste-literacy proxy and it reads as one.
- Get a written commitment from every partner purohit that he will perform for any Hindu family regardless of jati, and that Snanify may state this publicly. Make it a supply prerequisite, not a later policy. If a ghat cannot supply this, do not launch that ghat.
- Re-derive the $51 price from cost of delivery, not from emotional weight. The defensible statement is: this rite is performed individually, unbatched, with a dedicated purohit and a longer vidhi, which costs more. Delete the 'a man paying $11 may think we are not serious' argument entirely. Also drop the shagun rationale for the pitru SKU — check with the advisory panel before applying auspicious-number logic to a death rite; $54 (half of 108) or an unrationalised $51 both avoid the trap.
- Publish the batching number before a critic extracts it, and price on it: Ekal $11 is a named sankalp within a group rite; Pitru Tarpan $51 is an individual rite. If $51 does not buy an individual rite, the SKU is a lie and the positioning collapses with it.
- Extend the content.ts lint. It must (a) cover Hindi — 'पितृ दोष', 'श्राप', 'अशुभ', 'कष्ट निवारण' — or it is theatre; (b) live in a shared package applied to email, push and ad creative, since that is where 90% of manipulative copy will actually be written; (c) ban structural patterns, not just words: no countdown timers on pitru occasions, no 'N slots left', no post-tithi 'you missed it' emails, no review counts or star ratings on ancestral rites, and an absolute ban on testimonials implying material outcome ('we got the visa after').
- Write the Panji's no-CTA rule into the same lint. The Panji email may contain the date, the tithi, the aparahna window, and nothing else. No booking button, no offer, no 'while you're here'. If someone wants to book they will come.
- Treat the Panji as a shastra problem, not a date-math problem. Shraddh tithi is determined by the tithi prevailing at APARAHNA KALA, not sunrise; purnimanta vs amanta month reckoning shifts which month a tithi lands in; drik vs vakya shifts South Indian dates; adhik maas breaks naive arithmetic. Show the working, name the source, allow the family's own purohit to override, and say 'confirm with your family purohit' because it is true. Getting a customer's father's shraddh date wrong is the worst failure this product can have.
- Use amavasya as the counter-cyclical engine. Every amavasya is a legitimate pitru tarpan occasion — twelve reliable, evenly-spaced occasions a year, far more dependable than per-family tithis. The spec missed the most obvious answer to its own seasonality problem.
- Change the first commercial moment to a pitru-relevant snan occasion — Mauni Amavasya (Magha, Prayagraj) is the strongest candidate: snan-first, pitru-relevant, high-volume, and it lands near the trough the spec is trying to fill. Keep Kartik Purnima as a general-segment moment, but do not call it the wedge's launch.
- Add South Indian and Kerala pitru occasions. You list Kaveri and Godavari as rivers while ignoring Thai Amavasai, Aadi Amavasai, and especially Karkidaka Vavu Bali — a mass pitru occasion drawing lakhs, serving precisely the Gulf Malayali segment the spec defers. Also sanity-check Talakaveri as an operational site: it is a source kundike with seasonal landslide closures, not a purohit-staffed ghat. The six rivers were chosen for poetry; audit them for operations.
- Add a data protection workstream at the same priority as GST/FEMA: GDPR Art. 9 explicit consent + DPIA for the Berlin entity, DPDP Act 2023 for the Indian sub, per-name opt-in and one-click unsubscribe on the Panji, a retention policy for bereavement records, and consent before any message goes to a third party's WhatsApp.
- Write a ghat consent and framing protocol: filming permissions from each ghat authority in writing, framing rules that keep other bathers out of shot, and no indefinite retention of footage containing third parties. Revise 'HD recording, kept for good' accordingly.
- Commit to a published floor on priest payout as a share of SKU revenue, written filming consent, and the purohit's right to decline a sankalp on conscience grounds without penalty.
- Write the sankalp moderation policy now: prohibited intentions (harm, curses, naming living third parties without consent, political or communal content), a human review step before any sankalp is uttered aloud, and a stated right to decline with full refund.
- Write the failure-mode policy: escrow or charge-on-performance rather than charge-on-booking; automatic full refund if the rite is not performed; a re-performance offer at the next equivalent muhurat; and an explicit distance-selling waiver checkbox for immediate performance in EU/UK.
- Measure live-attendance rate as the pilot's #1 metric, not conversion. Peak pitru muhurats fall around 2–3am in US Eastern time. If real attendance is 20%, you are a recording business with a live pretence and the premium is unjustified — change the product, not the copy. And state plainly that the rite's validity does not depend on the buyer being awake; implying otherwise manufactures a new guilt to replace the one you banned.
- Apply the PLACEHOLDER discipline to this document's own numbers. Every competitor price, install count, income band, flight cost, and seasonality percentage is currently asserted as fact in a spec that forbids exactly that.
- On the daughters/shraddh-eligibility SEO question: publish the range of positions with attribution from named consenting acharyas; do not let Snanify hold a theological position of its own. And tie the content commitment to a supply commitment — if you publish that daughters may perform shraddh, every partner purohit must have agreed in writing to perform for a daughter. Publishing a promise your supply chain will refuse is worse than silence.
- Reconsider the Sankalp Patra. It is issued after the rite but named for the intention taken before — split it: a sankalp record at booking, and a record of performance afterwards. The latter should carry verifiable facts only — karta name and gotra, pitru named, tithi, ghat, purohit's name, timestamp, stream reference — and no seals, crests or blessings that imply institutional authority you do not have. Facts, not a diploma for grief.

### Must survive

- The enforced ban list over content.ts, with 'pitru dosh' as headline prohibition. Encoding the ethic as a failing test rather than a values doc is the single best idea in the document and it is exactly right about why: the growth hire in six months has not read the brief. Preserve this and widen its scope.
- The Pitru Tithi Panji as a free service with no purchase attached. It is real value (families genuinely lose the tithi by the second generation), it is what a family purohit does for free, and it is the only honest answer to seasonality. This is the product's soul — protect it from monetisation pressure permanently.
- Refusing to chase Pitru Paksha 2026 at scale in favour of a 100–300 snan hand-operated pilot. Correct on both the ops and the moral read: a shoddy muhurat serving 800 grieving families is unrecoverable, and a verifiable track record is the one asset that cannot be bought later.
- Ripping down '1,20,000+ sankalps' and '48 countries' before any paid traffic. Confirmed present in src/lib/content.ts (hero.stats, both EN and HI). This is not merely a Reddit risk — it is a straightforward misleading-advertising exposure under the UK CAP Code, FTC Section 5, and India's Consumer Protection Act 2019. Take it down today, not this week.
- Asthi visarjan permanently out of scope AND stated publicly rather than discovered post-payment. Correct on the all-digital constraint, correct on cross-border remains regulation, and the public statement is the part that builds trust.
- Explicitly rejecting the convenience frame ('skip the queue') and the consequence frame ('your ancestors are waiting'). The reasoning on both is sound, and naming the second as 'it would work, that is what makes it dangerous' is the honest read.
- The payer-is-not-the-beneficiary product requirement (§1.5). Multi-name entry, no account for the named person, copy addressed to the payer about someone else. This is a genuine product insight that most competitors get wrong.
- Segment discipline: not launching in India, treating Gulf as wave two rather than pretending it is reachable today, and calling temple associations a trust channel rather than a volume channel. All three are the unglamorous correct answer.
- 'Snan as an owned category' over 'we do 400 pujas'. Real, defensible, and it matches what the site already is.