# Snanify: Retention, Lifecycle and the Recurring Engine

**The recurring engine is one free utility (a tithi register that never sells) plus one subscription (Smaran, ~1.6× the contribution of a repeat one-off buyer and the only demand you can schedule twelve months ahead) — and the biggest thing standing in its way is Varsh's 12-snan entitlement, which is the one dark pattern your ethics page does not already ban.**

> Adversarial review: **needs-work**

## Key numbers

```
## Unit economics per rite (Segment A, diaspora pitru buyer)

AOV = $51 (Pitru Tarpan) + 20% attach of $31 Annadaan = **$57.20**

Variable cost per order:
- Officiant, 20% of segment gross (binds above ~2 orders/segment): $11.44
- Payments, Stripe intl 2.9% + $0.30 + ~1.5% FX: $2.85
- Media (200 MB clip, 24 mo storage + 3 egresses + WebRTC stream): $0.60
- Support (ASSUMPTION 8% of orders × $2.50 human touch): $0.20
- Refunds/chargebacks at 4% of gross: $2.28
- Session fixed cost amortised (₹600 assistant + ₹8,000/mo/ghat retainer at 11 seats/session, 1,000 orders/mo): $1.20

**Total $18.57 → contribution $38.63 = 67.5%**

## 5-year LTV by segment (ASSUMPTIONS on retention; arithmetic shown)

**A. Diaspora pitru buyer** (45% of households)
- Register registration rate 55%; year-2 repeat 40% if registered, 15% if not → blended 0.55(0.40) + 0.45(0.15) = **28.75%**
- Conditional retention thereafter: 55%, 65%, 70%
- Orders per active year 1.6 → $91.52
- Y1 1.25 × 57.20 = $71.50 · Y2 0.2875 × 91.52 = $26.31 · Y3 0.158 × 91.52 = $14.47 · Y4 0.103 × 91.52 = $9.40 · Y5 0.072 × 91.52 = $6.58
- **5-yr revenue $128.26 · contribution $86.58**

**B. Devotional, no bereavement anchor** (25%)
- AOV $24, year-2 repeat 18%, 1.4 orders/active year
- **5-yr revenue ≈ $43 · contribution ≈ $29.** A trial funnel, not an LTV segment.

**C. Gift buyer** (15%)
- AOV $31, year-2 repeat 22%, exempt from all reminders by policy
- **5-yr revenue ≈ $51.** Its real value is the recipient account: ASSUMPTION 8% recipient→buyer conversion.

**D. India resident** (15%)
- AOV ₹500 (~$5.75), year-2 repeat 30%, 2.2 orders/active year
- **5-yr revenue ≈ ₹2,600 (~$30) · contribution ≈ $23.** Session fill, not profit.

**Blended year-2 household repeat rate:**
0.45(0.2875) + 0.25(0.18) + 0.15(0.22) + 0.15(0.30) = 0.129 + 0.045 + 0.033 + 0.045 = **25.2%**

## Smaran subscription (the flagship)

Price $81/yr, delivering 2 rites (tithi tarpan + Pitru Paksha tarpan). À la carte those cost $102 → a **21% honest discount**, statable in copy.

Cost to serve per year: officiant 20% × $81 = $16.20 · payments $2.90 · media 2 rites $1.20 · memorial page $0.10 = $20.40 → **contribution $60.60 (74.8%)**

Renewal, benchmarked against RevenueCat's VERIFIED 44.1% median 12-month annual-plan retention, adjusted upward because this is a calendar obligation not an attention product, and downward because you send a cancellable renewal notice at T-30 and T-14 with no retention offer:
- Y1 renewal 52%, Y2+ 68% (ASSUMPTION)
- Involuntary churn: 10% payment failure × 60% unrecovered = 6% net loss → effective 0.489 and 0.639
- Expected life = 1 + 0.489/(1 − 0.639) = 1 + 1.355 = **2.355 years**
- **Revenue LTV $190.76 · contribution LTV $142.71**

Plus ASSUMPTION 0.5 extra parva rites/yr at $30 → +$15 × 2.13 years = +$32 revenue.
**Smaran household 5-yr ≈ $204 vs à-la-carte $128 → +59%.**

## Sensitivity: what actually moves the number (Segment A, 5-yr revenue)

| Lever | Change | 5-yr LTV | Δ |
|---|---|---|---|
| Baseline | — | $128.26 | — |
| Register registration | 25% → 55% | $113.51 → $128.26 | **+13.0%** |
| Names per register | 1.0 → 2.0 (orders/yr 1.6 → 2.0) | $142.83 | **+11.4%** |
| Year-2 retention | 29% → 40% | $150.53 | **+17.4%** |
| Convert to Smaran | — | ~$204 | **+59%** |

Order of leverage: **Smaran conversion > retention > names-per-register > registration rate.** And retention is moved by delivery quality, not by messages.

## Notification cost and volume ceiling

Per household per year, hard-capped:
- 1 tithi notice × registered names (avg 1.8)
- 1 Pitru Paksha notice
- 2 per Smaran subscription (scheduled + performed) + 2 renewal notices
- 4 broadcast almanacs (opt-in)
- 1 dormancy/steward notice per 24 months

**Engaged household with 2 names and 1 Smaran: ≤14 non-transactional messages/year.** Publish that number.

Cost at 10,000 households: 28,000 solicited messages × ₹0.145 (WhatsApp India utility, VERIFIED) = **₹4,060 ≈ $47/yr**. By email, ~$11/yr. The cap is free.

## Varsh breakage, quantified

ASSUMPTION: median Varsh buyer uses 4 of 12 snans.
Unearned revenue retained = 8/12 × $108 = $72/buyer.
At 8% attach on 12,000 households = 960 buyers × $72 = **$69,120/yr ≈ 9% of modelled revenue.**
Converting Varsh to a refundable credit surrenders that. It is the correct trade and it should be made explicitly, not discovered.

## Year-3 scale sketch (12,000 active households)

Rites: A 5,400 × 1.6 = 8,640 · B 3,000 × 1.4 = 4,200 · C 1,800 × 1.2 = 2,160 · D 1,800 × 2.2 = 3,960 → **18,960 rites**
Plus Smaran (18% of A = 972 subs × 2 rites) = 1,944 → **20,904 rites/yr**
Revenue: $492k + $101k + $67k + $23k + $79k Smaran ≈ **$762k/yr**
Sessions at 18 seats avg = 1,161/yr = **3.3 sessions/day across the whole company.**
Human minutes added by the retention engine: annual panchang authority sign-off (~2 days, external, paid), reckoning disputes (ASSUMPTION 3% of registrations × 15 min = ~75 hrs/yr at 10,000 registrations), sankalp moderation flags. **≈ 0.15 FTE.**
```

## Findings

**The strongest recurring hook is real and boring: annual shraddha tithi drifts ~11 days a year against the Gregorian calendar, and families genuinely cannot compute it. Multiple standalone 'Shraddha Tithi Calculators' already exist (Drik Panchang, Padagaya, Online Jyotish, Rudra Astro), which proves demand — and proves the computation alone is not defensible as a paid product.**  
*high confidence.* VERIFIED. drikpanchang.com/utilities/tithi/hindu-shraddha-tithi-calculator.html; padagaya.in/shraddha-tithi-calculator; onlinejyotish.com/astrology-tools/shraddha-tithi-finder.php. Drift arithmetic: 12 lunar months = 354.37 days vs 365.24 solar = 10.87 days/yr, corrected by an adhik maas roughly every 32.5 months. VERIFIED astronomy; ASSUMPTION that families get it wrong at scale.

**Diaspora willingness-to-pay in this exact category is ~10x India's. Sri Mandir reports international ARPU of ₹7,000 (~$81/yr) vs India ₹600–800 ($7–9/yr), with ~20% of revenue from the diaspora off a much smaller user base. This validates the two-ladder pricing and validates $81/yr as a diaspora annual price point.**  
*high confidence.* VERIFIED. TechCrunch, 30 Jun 2025, 'Sri Mandir keeps investors hooked as digital devotion grows'. Same source: ~3.5M MAU, 40M downloads, ~$12M run rate at start of 2025, six-month retention ~55%, take rate 20–25%, 700k international registered users.

**AppsForBharat (Sri Mandir) raised $20M Series C in Jun/Jul 2025 at ~$50M total raised, and FY24 operating revenue was ₹18.53 crore (~$2.2M). The category is funded but small: this is not a market where a well-capitalised incumbent will out-spend you on the tithi register.**  
*high confidence.* VERIFIED. Business Standard 30 Jun 2025; Entrackr; YourStory 2025. Susquehanna Asia VC led.

**Smaran at $81/yr is worth ~$191 revenue / ~$141 contribution over its life, versus ~$129 / ~$87 for the same household buying à la carte. It wins not by extracting more per year (it is actually a 21% discount on two $51 tarpans) but by surviving the years the household would otherwise have been inactive.**  
*medium confidence.* ARITHMETIC, built on ASSUMPTION renewal rates benchmarked to VERIFIED RevenueCat 2025 (annual-plan 12-month retention median 44.1%, down from 47.1%). Full working in the numbers field.

**Subscription demand is the only demand you can schedule. A Smaran subscriber's rite date is known 12 months in advance; a one-off buyer's is known 3–14 days in advance. Since your entire unit economics rest on filling a 51-seat Samuhik session, forecastable seats are worth more than their revenue suggests.**  
*high confidence.* ARITHMETIC on your own model. Marginal contribution on an incremental filled seat ≈ 78% of price (20% officiant share of gross, ~2% processing, near-zero media). Fixed cost per session (₹1,800 officiant floor + ₹600 assistant ≈ $27.60) falls from $5.52/order at 5 seats to $0.79/order at 35 seats.

**Varsh ($108 for 12 snans) is a breakage product. A household's honest annual rhythm is 2–4 rites, not 12. At an assumed median usage of 4 of 12, Snanify keeps 67% of the prepayment as unearned revenue — roughly $69k/yr at 12,000 households. That is gym-membership economics inside a service whose ethics page bans everything else.**  
*medium confidence.* ARITHMETIC. ASSUMPTION on median usage (4/12). 8% attach × 12,000 households × $72 retained = $69,120. Your own docs already concede pro-rata refunds within 12 months, so most of this is ethically surrendered already but only on request.

**Your two internal specs contradict each other on whether the tithi reminder may contain a booking link. growth.md §8.4 includes one; catalog.md's adversarial note demands 'no booking button, no offer'. This must be resolved before the sending code is written, because it is the single message the whole retention engine runs on.**  
*high confidence.* VERIFIED in repo: /Users/sven/dev/snanify/docs/design/growth.md line ~450 vs line 589.

**If the tithi notice carries a booking link, Meta will almost certainly classify the WhatsApp template as Marketing, not Utility — ₹1.09 vs ₹0.145 per message in India, a ~7.5× cost difference, and marketing templates require separate marketing opt-in. The ethical design is also the cheap design.**  
*medium confidence.* Rates VERIFIED (Medianama Jul 2025, AiSensy, GreenAds Global: India utility ₹0.145, marketing ₹0.78–₹1.09 depending on billing period; per-message pricing effective 1 Jul 2025). Category classification is my inference from Meta's utility-template definition — ASSUMPTION, verify with your BSP before building.

**Smaran's core promise is wrong for a large minority of your buyers. Annual shraddha tithi is fixed by the tithi prevailing at aparahna kala, not sunrise; amanta and purnimanta reckoning disagree on the month; Tamil and Malayali families commonly observe by solar month/nakshatra, not tithi. Selling 'we remember the correct date' and then sending the wrong date about someone's dead parent, annually, forever, is the worst failure this product can have.**  
*high confidence.* VERIFIED as a real reckoning divergence (Drik Panchang and Online Jyotish both expose separate amanta/purnimanta and regional settings; hindu-blog.com 'How to find Shradh Tithi' documents the aparahna rule). Already flagged in your own catalog.md line 629 and left unaddressed.

**Retention dominates every other lever. Raising Segment A year-2 repeat from 29% to 40% is worth +17% on 5-year LTV; raising names-per-register from 1.0 to 2.0 is worth +11%; raising register-registration from 25% to 55% is worth +13.5%. Since you are forbidden from nagging, the only retention lever you have left is delivery quality: did the Naam Kshan arrive, did the recording verify, did the Patra look like something you would show your uncle.**  
*high confidence.* ARITHMETIC, sensitivity analysis in the numbers field. This is a conclusion about relative magnitudes and is robust to the absolute assumptions.

**Involuntary churn will be 20–40% of your total subscription churn, and your dunning email is the single most dangerous piece of copy in the company. B2C consumer cards fail at 8–15%; median recovery with retries is 30–45%. A failed-payment email that names a dead parent would be the screenshot that ends the brand.**  
*high confidence.* VERIFIED. Recurly benchmark data ($13B+ annual subscription revenue) via churnkey.co/blog/involuntary-churn-benchmarks and finsi.ai; insufficient funds = 40.5% of failures. The template-design conclusion is mine.

**Honouring your notification cap is nearly free. At 10,000 households averaging 1.8 registered names, the entire annual solicited-message volume is ~28,000 messages, costing ~₹4,060 (~$47/yr) at Indian WhatsApp utility rates and effectively nothing by email. The cap costs you nothing except the revenue you would have got from spamming — which is the point, and is worth publishing.**  
*high confidence.* ARITHMETIC on VERIFIED WhatsApp India utility rate ₹0.145/message. 10,000 × 1.8 = 18,000 tithi notices + 10,000 Pitru Paksha notices = 28,000 × ₹0.145 = ₹4,060.

**Ancestry charges $229/yr (or $19.99/mo) for essentially one thing: an accumulating family record you cannot rebuild elsewhere. That is the ceiling your family archive is walking toward, and it is a real one — but only once the archive has three or more years of content in it. Do not launch a family membership in year one.**  
*medium confidence.* VERIFIED pricing: ancestry.com corporate blog and Family Tree Magazine — $24.99/mo, $19.99/mo on annual, $229 upfront for one year, World Explorer renews $169/6mo. The year-one conclusion is mine.

**India-resident orders (Bharat Dar, ~₹500) are not a revenue segment and should not be modelled as one. They are session fill. Because the officiant is paid 20% of segment gross, an incremental ₹500 seat in an already-scheduled session contributes ~₹390 at essentially zero marginal cost and improves everyone's margin.**  
*medium confidence.* ARITHMETIC on your published officiant formula max(₹1,800, 20% of segment gross). Cross-checked against Sri Mandir's VERIFIED India ARPU of ₹600–800/yr, which implies Indian devotional users spend roughly one Bharat Dar rite per year.

**At the year-3 volume I model (~21,000 rites/yr), six ghats running daily muhurats would average ~3.5 sankalps per session at three sessions a day. Six rivers is a marketing asset and a margin liability. Publish six, schedule two, and let a published per-river schedule (not the customer) decide which ghat runs on which day.**  
*medium confidence.* ARITHMETIC: 20,900 rites/yr ÷ (6 ghats × 1 session/day × 350 days) = 9.95 seats/session, falling to 3.3 at three sessions/day. Versus 2 ghats × 2 sessions/day × 350 = 1,400 sessions → 14.9 seats/session.

## Recommendations

- **[S] Resolve the Panji-CTA contradiction in favour of: one plain text link, below the sign-off, preceded by the sentence 'If you observe the day yourself, or with your own purohit, that is the better thing.' No button, no colour, never in the subject or preheader. Write it into the copy-lint as a structural rule, not a word list.**  
  growth.md and catalog.md contradict each other and the sending code cannot be written until this is settled. A total CTA ban is over-correction — a person told their father's tithi is on the 14th should not have to go hunting. Putting the non-commercial option first is what makes the commercial one non-predatory, and it is the cheapest trust asset in the product.
- **[M] Ship the six gates as an assertSendable() function that every outbound message passes or throws: (1) value-without-click, (2) declared user-action origin — never INFERRED/PREDICTED/LAPSED triggers, (3) no consequence language, EN and HI, (4) per-recipient annual cap as a const not config, (5) one-tap exit that does not delete data, (6) marketing bodies byte-identical across all recipients.**  
  Gate 6 is the important one and it is new: it makes the marketing list personally empty by construction, exactly mirroring the Rite Ledger. Segmentation is precisely what turns a reminder into grief-targeting, so make it structurally impossible rather than carefully governed.
- **[L] Capture a reckoning profile at register registration — amanta vs purnimanta, tithi vs solar-nakshatra, region — compute at aparahna kala, show the working, ask the family to confirm it against what they did last year, and let their answer override ours permanently. Launch Smaran for amanta and purnimanta tithi reckoning only. Publish the exclusions.**  
  'We remember the correct date' is the entire product promise. Getting a Tamil, Malayali or Bengali family's date wrong, annually, forever, about their dead parent is the worst failure available to this business. A published 'we do not serve your tradition yet' is a trust asset; a confidently wrong date is unrecoverable.
- **[M] Kill Varsh as a 12-snan entitlement. Replace with Snan Kosh: $108 buys $130 of rite credit, valid 24 months, unused portion auto-refunded at expiry without the user asking. Recognise revenue per performed rite.**  
  A household's honest rhythm is 2–4 rites/year, not 12. As an entitlement, Varsh keeps ~67% of the prepayment as breakage — roughly $69k/yr at scale, and the only dark pattern your ethics page does not already ban. As a credit it preserves the entire cash-flow-at-peak benefit and surrenders only the unearned part.
- **[S] Make the register prompt a screen on the rite page immediately after the Patra is issued — never an email, never twice — and ask for the second name in that same screen ('anyone else?').**  
  This one form is both the retention mechanic and the second-purchase mechanic, and it drives repeat without sending a single message. Names-per-register is worth +11% on 5-year LTV and is moved by a field, not a campaign.
- **[S] Set a conversion CEILING on the tithi notice as an ethics tripwire: if notice→booking within 21 days exceeds ~45%, the copy goes to review automatically. Instrument it and alert on it.**  
  A purely informational message should not convert like an offer. If it does, something in the copy has started applying pressure. This is the only mechanism I know of that catches ethical drift in month nine, when the notification cap will be under maximum commercial pressure — and it inverts the usual incentive, which is the point.
- **[S] Send the tithi notice and Pitru Paksha notice by email, not WhatsApp. Reserve WhatsApp templates for genuinely transactional delivery (rite performed, Patra ready, stream link).**  
  A message about a registered date carrying a booking link will almost certainly be classified Marketing by Meta — ₹1.09 vs ₹0.145 in India, ~7.5×, plus a separate marketing opt-in requirement. Verify with your BSP, but the ethical channel and the cheap channel coincide here, and email is uncategorised and cannot be reclassified underneath you.
- **[M] Design the dunning flow so the template physically cannot reach the person record: two silent card retries over seven days, then exactly one email that names no departed person, states 'nothing is owed and nothing is lost', and does not retry again.**  
  Involuntary churn is 20–40% of subscription churn and consumer cards fail at 8–15%, so this email will be sent thousands of times. Silent retries are not manipulative — the user consented to the charge. A dunning sequence that invokes a dead parent is the screenshot that ends the company. Make it impossible in the data model, not in the copy review.
- **[M] Build succession into the family account from day one: a nominated successor steward, up to 8 co-stewards, a dormancy protocol at 18 months (archive-safety notice, not win-back), and a full export that works whether or not the user ever returns.**  
  You are promising a memorial page that 'stays up, free, for as long as we exist' against a card held by a person who will also die. Without a successor and a funded reserve, that sentence is unhonourable. Separately, an archive you cannot leave is a trap; an archive you can leave and don't is a moat — and only the second survives a public argument.
- **[S] Do not launch a family membership (Kul) in year one. Launch Smaran plus Snan Kosh. Revisit a paid membership in year three, when archives have three years of content and permanence is worth paying for.**  
  A membership whose value is 'we keep your files' is weak until there are files. Ancestry can charge $229/yr for accumulated records; you cannot, yet. Launching it early produces a product with no reason to renew and forces you back toward the entitlement-and-breakage structure you just removed from Varsh.
- **[S] Publish the message cap as a number on the site: 'The most we will ever send you, not counting messages your own bookings require, is fourteen a year.' Enforce it in the sending path with a test.**  
  Publishing your own blocklist is already the strongest trust signal you have. A published, enforceable, costly numeric cap is the same move applied to the channel users most fear you on. It is also the constraint that will be under most pressure in month nine, and a published number is much harder to quietly raise than a config value.
- **[M] Publish six rivers; schedule two. Give each river a published running schedule (Ganga daily, Triveni several times a week, the rest weekly and on their own parvas) and let the muhurat calendar, not the customer, determine which ghat runs on which day. Free river choice belongs in Ekantik.**  
  At year-3 volume, six ghats running daily averages ~10 seats in a 51-seat session and falls to ~3 at three sessions a day. Fill rate is what makes the Samuhik model work at all. A published honest schedule costs nothing in trust; an empty session costs the margin engine.

## Risks

- Getting a family's shraddha tithi wrong. This is the single unrecoverable failure in the retention product. Amanta vs purnimanta shifts the month; aparahna-kala vs sunrise shifts the day; adhik maas breaks naive arithmetic; Tamil, Malayali, Bengali and Odia conventions do not use tithi the way the North does. Mitigation: reckoning profile, show the working, family override always wins, named panchang source, an annual human panchang authority sign-off, and refuse to sell Smaran where you cannot compute confidently.
- The notification cap will be attacked from inside, in roughly month nine, by someone with a growth target and a good argument. It will not present as 'let us be predatory'; it will present as 'a second reminder, purely as a courtesy'. Mitigation: cap as a const with a test, the six gates as an assertion that throws, the conversion ceiling as a tripwire, and the cap published on the public site so raising it becomes an announcement.
- The dunning email. A payment-failure message that reaches into the person record and names a dead parent is a brand-ending screenshot. Mitigation must be structural: the billing service must not be able to join to the pitru table.
- Smaran's 'perpetual memorial' promise outlives the card, and eventually outlives the subscriber. Without a nominated successor and a funded reserve for orphaned memorial pages, you have published a promise you cannot keep. Retire the word 'perpetual' unless the reserve exists.
- Reckoning coverage gaps alienate a large and wealthy slice of the diaspora. Excluding Tamil, Malayali, Bengali and Odia reckonings at launch is the right call, but it is a real revenue cost (ASSUMPTION: 20–25% of the Indian-American population) and it will read as exclusion unless the reason is published prominently and the roadmap is dated.
- Breakage removal is a real ~9% revenue hit that will be felt immediately and whose benefit is invisible. Expect internal pressure to reinstate the entitlement structure under a new name. The counter is that the ethics page's credibility is a single-point-of-failure asset: it is worth more than $69k/yr and it does not survive one screenshot of a forfeited prepayment.
- Auto-renewal law is moving and jurisdiction-specific — California ARL, EU consumer-rights rules, and the FTC's click-to-cancel rulemaking (status contested; I did not verify current standing and you should not assume it). Your 30/14-day cancellable-in-the-email design is likely more than compliant everywhere, which is the right place to be, but get it confirmed by counsel rather than inferred from a design doc.
- You are forbidden from nagging, which means delivery quality is the entire retention program. A Naam Kshan pointing at the wrong second, a recording that fails the verifier after a transcoding change, or a Patra that arrives three days late will cost more retention than any message could win back. Budget engineering accordingly.
- Instrumenting retention without surveillance is genuinely constrained by your own data posture: no session replay, no third-party analytics, no form-field capture. You can measure cohort repeat, registration rate, notice-to-booking via opaque per-message tokens, renewal and unsubscribe rates. You cannot A/B test persuasion. Recommended hard rule: A/B testing is permitted on transactional clarity and on the broadcast almanac, and banned on any message that mentions a named person, living or dead.
- WhatsApp template categorisation is Meta's decision, not yours, and can be reclassified retroactively. Building the retention engine on a channel whose cost can move 7.5× and whose consent basis can change underneath you is avoidable. Email is boring, cheap, uncategorised and sufficient.

---

# Snanify: Retention, Lifecycle and the Recurring Engine

Written for the founder. Everything labelled VERIFIED has a source; everything labelled ASSUMPTION has arithmetic you can argue with.

---

## 0. The short version

This category looks like it is once a year. It is not, but the reason it is not is boring, and the boringness is the whole asset.

Three genuine recurring hooks exist, in descending order of honesty and strength:

1. **The tithi register.** Annual shraddha tithi drifts about eleven days a year against the Gregorian calendar. Families genuinely do not know when their father's shraddha falls. Computing it, remembering it, and telling them is real utility that owes nothing to grief. It is free, it must stay free, and it never sells anything.
2. **The observance subscription (Smaran).** The register tells you the date. Smaran performs the rite on it, without being asked, every year. This is the flagship and it should be treated as such.
3. **The archive.** Accumulated recordings, Patras, gotras, relations and dates. This is the moat, but it is a three-year moat, not a year-one one.

Everything else — Varsh, Nitya Seva, memberships — is either a cash-flow instrument or, in Varsh's case, a breakage product wearing a devotional coat.

The uncomfortable finding, which I will keep returning to: **because you have banned yourself from nagging, delivery quality is your entire retention program.** Raising year-2 repeat from 29% to 40% is worth more than every messaging optimisation available to you combined, and the only thing that raises it is that the Naam Kshan pointed at the right second and the Patra looked like something you would show your uncle in Kanpur.

---

## 1. The tithi register (Pitru Tithi Panji), designed fully

Your growth.md already names it and gets the guardrails right. What is missing is the data model, the reckoning problem, and the moment it is offered.

### 1.1 What is actually hard about this

The naive version — "take the Gregorian death date, find the tithi, project it forward" — is wrong for a large minority of your customers, and being wrong here is the worst failure this business can have. Four real complications, all VERIFIED as live divergences across the panchang tools that already exist (Drik Panchang, Padagaya, Online Jyotish, Shubh Panchang all expose different settings for them):

- **Aparahna kala, not sunrise.** Annual shraddha is fixed by the tithi prevailing during the fourth of the five daytime divisions, not by the tithi at sunrise. A naive sunrise rule will be off by a day for a meaningful fraction of cases every year.
- **Amanta vs purnimanta.** These two month-naming conventions disagree about which month a krishna-paksha tithi belongs to. Get it backwards and you are a full month out.
- **Solar and nakshatra reckonings.** Tamil and Malayali families commonly observe by solar month and nakshatra, not by tithi at all. Bengali and Odia conventions differ again. For these families the entire premise of the product does not apply in the form you built it.
- **Adhik maas.** The intercalary month breaks naive arithmetic and conventions for handling it differ by community.

### 1.2 The registration record

```
PitruRecord {
  id
  displayName            // as the family says it
  relation               // to the karta, not to "the user"
  gotra?                 // per-person, optional, Kashyapa default
  deathDateGregorian     // + time if known, + place if known
  deathTimeKnown: bool   // affects the post-sunset convention
  reckoning: {
    system: "tithi" | "solar_nakshatra"      // launch: tithi only
    monthConvention: "amanta" | "purnimanta"
    community?: string                        // free text, for coverage analysis
    adhikMaasRule: "as_source" | "family_override"
  }
  computed: { tithiName, paksha, lunarMonth, sourceId, method, ayanamsa }
  familyOverride?: { date, statedBy, statedAt }   // ALWAYS wins
  confirmedByFamily: bool
  stewardVisibility: "karta_only" | "co_stewards"
}
```

Two fields carry the whole design. `familyOverride` always beats our computation, permanently, with no argument. `confirmedByFamily` gates whether we will sell Smaran against this record at all.

### 1.3 Show the working

The register's computation page must render, for every record: the tithi name, paksha and lunar month; the reckoning used; the aparahna window in the user's timezone; the panchang source by name with its method and ayanamsa and the ghat coordinates; and, where two licensed sources disagree by more than a few minutes, both, as a range.

Then one sentence: *"If your family observed a different day last year, that is the day. Tell us and we will use yours from now on."*

This is not humility theatre. It is the only structure under which being wrong is survivable, because the family has already been invited to correct you before the failure happens.

Note on the ephemeris: Swiss Ephemeris is CHF 750 one-time for the professional licence, or AGPL if you are willing to open the whole codebase (VERIFIED, astro.com/swisseph/swephprice_e.htm). Pay the CHF 750. But an ephemeris settles astronomy, not convention — you still need a named human panchang authority to sign off tithi-boundary and adhik-maas conventions annually. That is ~2 days a year of an external, paid advisor and it is the one recurring human cost in this whole engine that you should not try to remove.

### 1.4 Launch coverage, published

Ship: amanta and purnimanta tithi reckoning. Do not ship: Tamil solar-month/nakshatra, Malayalam nakshatra (Karkidaka Vavu), Bengali and Odia conventions. Publish this as a table with a dated roadmap, on the register page, before anyone registers. ASSUMPTION: this excludes 20–25% of the Indian-American population, which is a real cost. Pay it. A published "we do not serve your tradition yet" is a trust asset; a confidently wrong date about someone's dead father is not recoverable at any price.

### 1.5 Where the register is offered — the single most important screen in the business

**On the rite page, immediately after the Patra is issued. Once. Ever. Never in an email.**

The moment the product has just demonstrably worked — the recording opens at the second the name is spoken, the Patra verifies — is the only moment at which asking a person to hand you their dead parent's date is not an intrusion. Ask then, or do not ask.

And on that same screen, in the same form, ask for the second name. Not later, not in a follow-up. Names-per-register is worth +11% on five-year LTV (working in §6) and it is moved by a field, not a campaign.

**Copy, EN:**
> **Keep this date?**
>
> The tithi you observed today falls on a different Gregorian date every year. If you tell us whose it is, we will work it out each year and write to you once, about two weeks before.
>
> It is free, it stays free, and it does not require you to book anything with us. You can export it or delete it whenever you like.
>
> [ Keep this date ]   [ No, thank you ]
>
> *Anyone else whose date you would like kept?*

**HI:**
> **यह तिथि सहेज लें?**
>
> जिस तिथि का आपने आज पालन किया, वह हर वर्ष अंग्रेज़ी कैलेंडर की भिन्न तारीख़ पर पड़ती है। यदि आप बता दें कि यह किसकी है, तो हम हर वर्ष उसकी गणना करके, लगभग दो सप्ताह पहले, एक बार आपको लिख देंगे।
>
> यह नि:शुल्क है, नि:शुल्क ही रहेगा, और इसके लिए हमसे कुछ बुक करना आवश्यक नहीं। आप इसे जब चाहें निर्यात कर सकते हैं या मिटा सकते हैं।
>
> [ तिथि सहेजें ]   [ नहीं, धन्यवाद ]
>
> *क्या किसी और की तिथि भी सहेजनी है?*

---

## 2. The lifecycle

### 2.1 The eight states

| # | State | Human minutes | Notes |
|---|---|---|---|
| 0 | Occasion page → checkout | 0 | No account required to buy. The account is created from the receipt. |
| 1 | Sankalp entry | 0 | Names, per-person gotra (optional), relation, sankalp (silent by default), optional voice recording of the names |
| 2 | Payment → **Sankalp Mudra shown immediately** | 0 | The first proof moment, and it happens *before* delivery. Retention-relevant: the product starts working at second zero. |
| 3 | T-15 min stream link | 0 | Only if live attendance was chosen |
| 4 | **The rite** | the only human minutes in the business | |
| 5 | Delivery: recording + Naam Kshan + Patra + verify link | 0 | Target p50 under 6 hours |
| 6 | **Register prompt** | 0 | Once. Ever. See §1.5. |
| 7 | Archive | 0 | |
| 8 | Next occasion | 0 | Driven by the register, the calendar, or nothing |

### 2.2 What is the natural second purchase?

Not the same rite again. Two candidates, and the data points the same way:

**The strongest is the same rite for a second person** — the other parent, a grandparent, the uncle whose tithi nobody else in the family keeps. This is the second purchase because the register *asks for it*, on the same screen as the first registration, for the buyer's own benefit, with no message sent. The retention engine and the acquisition engine turn out to be the same form field.

**The second strongest is the gift** — a child in Toronto booking for a mother in Lucknow. Sri Mandir's data supports diaspora depth here: roughly 50% of their US user base engages in both prayers and offerings versus 20–25% in India (VERIFIED, TechCrunch Jun 2025). The gift also creates a second account, which is a referral coefficient rather than an LTV term. Your catalog correctly exempts gift flows from all reminder cadence; keep that absolutely.

### 2.3 The natural annual rhythm

Three anchors, and only three:

1. **The family's own tithis** — uniformly distributed across the year by construction, which is exactly what your Pitru-Paksha-heavy demand curve needs.
2. **Pitru Paksha** — one fortnight, September/October. (For 2026, sources differ between 26/27 September and 10 October — this is itself an illustration of the reckoning problem, and you must name one source publicly rather than average them.)
3. **One or two parvas the family already keeps** — Kartik Purnima, Makar Sankranti, Ganga Dussehra, Mahashivratri.

**An engaged household's honest rhythm is 2–4 rites a year. Not twelve.** This single sentence is why Varsh is wrong (§5).

---

## 3. Family accounts: the Kul

### 3.1 Entities

- **Karta** — the living account holder, on whose behalf the sankalp is spoken. Gotra, nama.
- **Members** — living named people, each with their own gotra (households are not uniform; your ethics page already gets this right).
- **Pitru** — the deceased, as §1.2.
- **Co-stewards** — up to 8 family members with read access to the archive and register, no payment authority.
- **Successor** — one nominated person who inherits stewardship.

Your growth.md's own reviewer flagged the karta/pitru distinction as the thing literate buyers check first. It is: copy must read *"a tarpan was offered by you for your mother"*, never *"in your mother's name"*.

### 3.2 What accumulates

Recordings (clipped to the household's own portion), Patras, Naam Kshan timestamps, ledger links, the register with its computed dates and shown workings, gotras and relations. After three years this is a genealogical record the family cannot rebuild anywhere else — the dates in particular, because the person who knew them is the person the record is about.

That is a real moat, and Ancestry proves its ceiling: $229/yr, or $19.99/mo on annual billing (VERIFIED), for essentially nothing but accumulated records you cannot reconstruct.

### 3.3 Why they do not leave — and why they must be able to

**Full export must exist**: JSON, the media files, the PDFs, and the register with its workings. It must work whether or not they ever come back, and it must be one click.

This is not a concession. An archive you cannot leave is a trap, and a trap is exactly the thing your ethics page spends 950 lines promising not to be. An archive you *can* leave and don't is a moat that survives a public argument. Offer the export in the dormancy notice, before you offer anything else (§4, message 14).

### 3.4 Succession — currently missing, and load-bearing

You are promising a memorial page that "stays up, free, for as long as we exist", charged to a card held by a person who will also die. Three things must exist or the sentence is unhonourable:

- **A nominated successor**, invited and accepted in advance, who inherits stewardship on a documented event.
- **A dormancy protocol**: after 18 months of no activity, no card is charged, the archive stays, one archive-safety notice is sent, and nothing else.
- **A funded reserve** for orphaned memorial pages. Storage for a memorial page is a few cents a year; the honest thing is to compute the number and ring-fence it. Until it exists, retire the word "perpetual".

---

## 4. Notification policy, and the actual copy

### 4.1 The line, stated precisely

Your ethics page bans automated death-anniversary campaigns and guilt messaging. Here is the general rule that those bans are instances of:

> **A message may be personalised by a fact the user gave us only if the fact itself is the message. Personalisation is permitted as delivery of a datum. It is never permitted as targeting of an offer.**

Corollary, and this is the operational one: **if a marketing message differs between two recipients because of something we know about their dead, it is not marketing. It is the register, and it must obey register rules.**

Which means marketing email is broadcast-only and **personally empty by construction** — the same invariant you already applied to the Rite Ledger. Segmentation is precisely the mechanism that turns a reminder into grief-targeting, so make it structurally impossible rather than carefully governed.

### 4.2 The test, for a given message

The one-sentence version: **would we send this if we had nothing to sell?**

The operational version — six gates, implemented as an assertion in the sending path, not a checklist in a doc:

```ts
// src/lib/messaging/gates.ts
// Every outbound message passes all six or throws in production.

export function assertSendable(m: OutboundMessage) {

  // GATE 1 — VALUE WITHOUT CLICK
  // Strip every href, button and price. The remainder must still deliver
  // the message's entire stated purpose. Enforced by a required field
  // m.valueWithoutLink, asserted non-empty, which IS the plain-text part.

  // GATE 2 — DECLARED ORIGIN
  // m.trigger ∈ { USER_REGISTERED_TITHI, USER_BOOKED_RITE,
  //               USER_SUBSCRIBED, USER_ASKED, SYSTEM_OWES_DELIVERY }
  // Never INFERRED_*, PREDICTED_*, LAPSED_*, SCORED_*.
  // If a model chose the recipient, the message does not send.

  // GATE 3 — NO CONSEQUENCE
  // Bilingual copy-lint: no conditional harm, no scarcity, no countdown,
  // no "still", "yet", "before it is too late", "last chance",
  // "अभी तक", "समय बीत रहा", "अन्यथा", "रह जाएगा".

  // GATE 4 — CAP
  // sentThisYear(recipient, m.class, m.subjectPersonId) < CAP[m.class]
  // CAP is a const in this file. Raising it is a code review, not a setting.

  // GATE 5 — SYMMETRIC EXIT
  // Unless class === TRANSACTIONAL, m carries a one-tap stop that
  // turns off messages and does not delete data.

  // GATE 6 — PERSONAL EMPTINESS
  // if (m.class === MARKETING) assert body is byte-identical
  // across every recipient in the send.
}
```

And one tripwire that is not a gate: **a conversion ceiling.** If notice-to-booking within 21 days exceeds ~45%, the copy goes to review automatically. A purely informational message should not convert like an offer; if it starts to, something has begun applying pressure. This inverts the usual incentive on purpose, and it is the only mechanism I know of that catches ethical drift in month nine when the cap is under maximum commercial pressure.

Related rule: **A/B testing is permitted on transactional clarity and on the broadcast almanac. It is banned on any message that names a person, living or dead.** Optimising the phrasing of a message about someone's dead father for click-through is the thing.

### 4.3 The message inventory

| # | Message | Class | Cap | Channel |
|---|---|---|---|---|
| 1 | Register invitation (in-product) | Service | 1 ever | in-app |
| 2 | Reckoning confirmation | Service | 1 per record, ever | email |
| 3 | Tithi notice, T-14 | Solicited | 1 per name per year | email |
| 4 | Pitru Paksha notice, T-7 | Solicited | 1 per user per year | email |
| 5 | Booking confirmation + Sankalp Mudra | Transactional | 1:1 | email + WhatsApp |
| 6 | Stream link, T-15 min | Transactional | 1:1 | WhatsApp |
| 7 | Rite performed + Patra + Naam Kshan | Transactional | 1:1 | email + WhatsApp |
| 8 | Failure / refund notice | Transactional | as needed | email |
| 9 | Smaran scheduled, T-3 | Solicited | 1 per observance | email |
| 10 | Smaran renewal, T-30 and T-14 | Account | 2 per subscription/yr | email |
| 11 | Smaran payment failed | Account | 1 per failure event | email |
| 12 | Smaran cancellation confirmation | Transactional | 1:1 | email |
| 13 | Bereavement hold acknowledgement | Service | 1 | email |
| 14 | Dormancy / steward notice | Service | 1 per 24 months | email |
| 15 | Seasonal almanac | Marketing | 4/yr, opt-in, broadcast | email |

**Engaged household, two registered names, one Smaran: ≤14 non-transactional messages a year.** Publish that number on the site. It costs about $47 a year in WhatsApp utility fees at 10,000 households to honour (working in the numbers section) — the cap costs you nothing except the revenue you would have got from spamming, which is exactly why publishing it is credible.

### 4.4 The copy

**Note on channel:** send #3 and #4 by email. A message about a registered date carrying a booking link will almost certainly be classified Marketing rather than Utility by Meta — ₹1.09 vs ₹0.145 per message in India, roughly 7.5×, plus a separate marketing opt-in requirement (rates VERIFIED; classification is my read — confirm with your BSP). The ethical channel and the cheap channel are the same one.

---

**#2 — Reckoning confirmation** (sent once, a few days after registration)

*EN, subject:* `Please check this date against what your family did last year`
> Namaste Anil,
>
> We compute your father's tithi as falling on **14 October 2026**, reckoned purnimanta, using the tithi prevailing at aparahna. The full working, including the source we used, is here: [link]
>
> Different families reckon differently, and we would rather be corrected than be confidently wrong about your father. If your family observed a different day last year, tell us here and we will use yours from now on: [link]
>
> — Snanify

*HI, subject:* `कृपया इस तिथि को उससे मिलाइए जो आपके परिवार ने पिछले वर्ष किया`
> नमस्ते अनिल,
>
> हमारी गणना के अनुसार आपके पिता की तिथि **14 अक्टूबर 2026** को पड़ती है, पूर्णिमांत गणना से, अपराह्न काल में विद्यमान तिथि के आधार पर। पूरी गणना, और जो स्रोत हमने लिया, यहाँ है: [लिंक]
>
> भिन्न परिवार भिन्न रीति से गणना करते हैं, और हम चाहेंगे कि आप हमें सुधार दें, बजाय इसके कि हम आपके पिता के विषय में आत्मविश्वास से ग़लत रहें। यदि आपके परिवार ने पिछले वर्ष कोई और दिन माना था, तो यहाँ बता दीजिए, और आगे से हम आपका ही मानेंगे: [लिंक]
>
> — स्नानिफ़ाई

---

**#3 — Tithi notice, T-14.** The most important message in the company.

*EN, subject:* `Your father Ramesh Kumar Sharma's tithi falls on 14 October`
*preheader:* `Bhadrapada, Krishna Paksha, Dashami. That is all this note says.`
> Namaste Anil,
>
> The tithi you recorded for your father, Ramesh Kumar Sharma — Dashami, Krishna Paksha, Bhadrapada — falls this year on **Wednesday, 14 October 2026** where you are (America/Chicago). It begins 13 October at 21:42 and ends 14 October at 19:08. The aparahna window on 14 October runs 13:31 to 16:04, local time.
>
> We compute this from [source], reckoned purnimanta, from the date you gave us. The working is here: [link]
>
> That is all this note is for.
>
> If you observe the day yourself, or with your own purohit, that is the better thing, and we would say so to your face. If you would like a tarpan offered at Prayagraj that morning, it can be arranged here: snanify.com/…
>
> To stop this note and keep the register: [link]. To correct the date: [link].
>
> — Snanify

*HI, subject:* `आपके पिता रमेश कुमार शर्मा की तिथि 14 अक्टूबर को`
> नमस्ते अनिल,
>
> आपने अपने पिता रमेश कुमार शर्मा की जो तिथि दर्ज की थी — दशमी, कृष्ण पक्ष, भाद्रपद — इस वर्ष आपके यहाँ (America/Chicago) **बुधवार, 14 अक्टूबर 2026** को पड़ रही है। यह 13 अक्टूबर को 21:42 पर आरंभ होकर 14 अक्टूबर को 19:08 पर समाप्त होती है। 14 अक्टूबर को अपराह्न काल स्थानीय समयानुसार 13:31 से 16:04 तक है।
>
> यह गणना [स्रोत] से, पूर्णिमांत रीति से, आपके दिए गए दिनांक के आधार पर की गई है। पूरी गणना यहाँ है: [लिंक]
>
> इस संदेश का इतना ही प्रयोजन है।
>
> यदि आप यह दिन स्वयं, या अपने पुरोहित के साथ मनाते हैं, तो वही उत्तम है, और यह हम आपके सामने भी कहेंगे। यदि आप चाहें कि उस प्रातः प्रयागराज में तर्पण अर्पित हो, तो व्यवस्था यहाँ से हो सकती है: snanify.com/…
>
> यह स्मरण बंद करने और पंजी सुरक्षित रखने के लिए: [लिंक]। तिथि में सुधार के लिए: [लिंक]।
>
> — स्नानिफ़ाई

Note the structure: the date is in the body (Gate 1); the self-perform option precedes the commercial one; the link is plain text below the sign-off, never a button, never in the subject or preheader; there is no second reminder, ever.

---

**#4 — Pitru Paksha notice, one per user per year**

*EN, subject:* `Pitru Paksha this year: 27 September to 10 October`
> Namaste Anil,
>
> Pitru Paksha falls this year from Sunday 27 September to Saturday 10 October. Sarva Pitru Amavasya, the day kept for those whose tithi is not known, is Saturday 10 October.
>
> The two dates in your register fall on: your father, 2 October. Your father's mother, 6 October.
>
> That is the calendar. What you do with it is yours.
>
> [snanify.com/…] · [stop these notices, keep the register]
>
> — Snanify

*HI, subject:* `इस वर्ष पितृ पक्ष: 27 सितम्बर से 10 अक्टूबर`
> नमस्ते अनिल,
>
> इस वर्ष पितृ पक्ष रविवार 27 सितम्बर से शनिवार 10 अक्टूबर तक है। सर्वपितृ अमावस्या, जो उनके लिए रखी जाती है जिनकी तिथि ज्ञात नहीं, शनिवार 10 अक्टूबर को है।
>
> आपकी पंजी की दो तिथियाँ इस प्रकार पड़ रही हैं: आपके पिता, 2 अक्टूबर। आपके पिता की माता, 6 अक्टूबर।
>
> पंचांग इतना ही कहता है। इसका क्या करना है, यह आपका है।
>
> [snanify.com/…] · [यह स्मरण बंद करें, पंजी सुरक्षित रहेगी]
>
> — स्नानिफ़ाई

---

**#7 — Rite performed**

*EN, subject:* `Your snan was performed this morning at Har Ki Pauri`
> Namaste Anil,
>
> The rite was performed at 04:52 IST on 14 October at Har Ki Pauri, Haridwar. Your father's name is spoken at 03:18 in the recording.
>
> Open at that second: [link]
> Sankalp Patra: [link]
> Check it yourself, or send it to someone who should check it: [link]
>
> Rite code 7F3A22C1. Ten sankalps shared this session.
>
> — Snanify

*HI, subject:* `आज प्रातः हर की पौड़ी पर आपका स्नान संपन्न हुआ`
> नमस्ते अनिल,
>
> अनुष्ठान 14 अक्टूबर को प्रातः 04:52 IST पर, हर की पौड़ी, हरिद्वार में संपन्न हुआ। रिकॉर्डिंग में आपके पिता का नाम 03:18 पर लिया गया है।
>
> उसी क्षण से खोलें: [लिंक]
> संकल्प पत्र: [लिंक]
> स्वयं जाँचें, या किसी ऐसे को भेजें जिसे जाँचना चाहिए: [लिंक]
>
> अनुष्ठान कोड 7F3A22C1। इस सत्र में दस संकल्प थे।
>
> — स्नानिफ़ाई

No exclamation marks. No "Congratulations". Nothing sold in the follow-up.

---

**#9 — Smaran scheduled, T-3**

*EN, subject:* `Ramesh Kumar Sharma's tarpan is on Wednesday`
> The tithi falls on Wednesday 14 October. The tarpan is scheduled for 06:10 IST at Triveni Sangam, Prayagraj. You will have the recording the same day.
>
> Nothing is needed from you.
>
> [change the muhurat] · [pause this year's observance]

*HI, subject:* `रमेश कुमार शर्मा का तर्पण बुधवार को`
> तिथि बुधवार 14 अक्टूबर को है। तर्पण प्रातः 06:10 IST पर, त्रिवेणी संगम, प्रयागराज में नियत है। रिकॉर्डिंग उसी दिन आपको मिल जाएगी।
>
> आपसे कुछ अपेक्षित नहीं।
>
> [मुहूर्त बदलें] · [इस वर्ष का अनुष्ठान रोकें]

---

**#10 — Smaran renewal, T-30 and T-14**

*EN, subject:* `Smaran renews on 3 March, $81`
> Your Smaran for Ramesh Kumar Sharma renews on 3 March for $81, on the card ending 4412. It covers the tarpan on his tithi and one during Pitru Paksha.
>
> If you would rather not, one tap here ends it and nothing is charged: [ Cancel ]
>
> Cancelling changes nothing for him. The memorial page stays up, free, for as long as we exist.
>
> — Snanify

*HI, subject:* `स्मरण 3 मार्च को नवीनीकृत होगा, $81`
> रमेश कुमार शर्मा के लिए आपका स्मरण 3 मार्च को $81 में नवीनीकृत होगा, 4412 पर समाप्त होने वाले कार्ड से। इसमें उनकी तिथि पर तर्पण और पितृ पक्ष में एक तर्पण सम्मिलित है।
>
> यदि आप नहीं चाहते, तो यहाँ एक स्पर्श से यह समाप्त हो जाएगा और कोई राशि नहीं ली जाएगी: [ रद्द करें ]
>
> रद्द करने से उनके लिए कुछ नहीं बदलता। स्मृति पृष्ठ जब तक हम हैं, नि:शुल्क बना रहेगा।
>
> — स्नानिफ़ाई

---

**#11 — Payment failed. This template must not have access to the person record.**

*EN, subject:* `A payment to Snanify did not go through`
> The card ending 4412 was declined for an $81 annual subscription. We tried twice over a week and have stopped.
>
> Nothing is owed and nothing is lost. If you want to continue, you can start it again here: [link]. If you do nothing, the subscription simply ends and your records stay exactly where they are.
>
> — Snanify

*HI, subject:* `स्नानिफ़ाई का एक भुगतान नहीं हो सका`
> $81 की वार्षिक सदस्यता के लिए 4412 पर समाप्त होने वाला कार्ड अस्वीकृत हो गया। हमने एक सप्ताह में दो बार प्रयास किया और अब रोक दिया है।
>
> न कुछ बकाया है, न कुछ खोया। यदि आप जारी रखना चाहें, तो यहाँ से पुनः आरंभ कर सकते हैं: [लिंक]। यदि आप कुछ न करें, तो सदस्यता स्वयं समाप्त हो जाएगी और आपके अभिलेख यथावत रहेंगे।
>
> — स्नानिफ़ाई

Silent retries are legitimate — the user consented to the charge. What is illegitimate is a dunning *sequence*, and above all a dunning sequence that reaches for the dead person's name to increase recovery. Enforce that in the data model: the billing service must not be able to join to the pitru table.

---

**#13 — Bereavement hold**

*EN:* "We have paused everything. For the next ninety days you will hear nothing from us that your booking does not require. Your register is untouched. If you want something from us, we are here: [link]."

*HI:* "हमने सब कुछ रोक दिया है। अगले नब्बे दिन तक हमसे आपको वही मिलेगा जो आपकी बुकिंग के लिए आवश्यक है। आपकी पंजी अछूती है। यदि आपको हमसे कुछ चाहिए, हम यहाँ हैं: [लिंक]।"

---

**#14 — Dormancy notice, once every 24 months. This is archive safety, not win-back.**

*EN, subject:* `Your Snanify archive, and who else can reach it`
> You have seven recordings and seven Sankalp Patras with us, and three dates in your register. Nobody else can currently open them.
>
> If you would like someone in your family to be able to, you can name them here: [link]. If you would like to take everything and go, the export is here: [link], and it works whether or not you ever come back.
>
> This is the only note of this kind we send, and we send it once every two years.
>
> — Snanify

*HI, subject:* `आपका स्नानिफ़ाई संग्रह, और उस तक कौन पहुँच सकता है`
> हमारे पास आपकी सात रिकॉर्डिंग और सात संकल्प पत्र हैं, और पंजी में तीन तिथियाँ। अभी इन्हें कोई और नहीं खोल सकता।
>
> यदि आप चाहें कि परिवार में कोई और इन तक पहुँच सके, तो उन्हें यहाँ नामित कर सकते हैं: [लिंक]। और यदि आप सब कुछ लेकर जाना चाहें, तो निर्यात यहाँ है: [लिंक], और वह चाहे आप लौटें या न लौटें, काम करता रहेगा।
>
> इस प्रकार का यही एक संदेश हम भेजते हैं, और दो वर्ष में एक बार।
>
> — स्नानिफ़ाई

Strip the links and it still says something true and useful, so it passes Gate 1. It offers the exit before the stay, so it passes the spirit of the ethics page. It will in practice reactivate people, precisely because it does not ask.

---

**#15 — The seasonal almanac. The only marketing email. Broadcast, personally empty, byte-identical.**

*EN, subject:* `The calendar, October to December`
> Kartik Purnima falls on 24 November. Dev Deepawali is the same evening. Somvati Amavasya, 8 December. Makar Sankranti, 14 January.
>
> Which ghats will be running those days, and which will not: [link]
>
> Last quarter we performed 1,842 rites: 1,791 as scheduled, 44 degraded, 7 not performed. All of it, including the reasons: [link]
>
> [unsubscribe] — Snanify

*HI, subject:* `पंचांग, अक्टूबर से दिसम्बर`
> कार्तिक पूर्णिमा 24 नवम्बर को। उसी संध्या देव दीपावली। सोमवती अमावस्या, 8 दिसम्बर। मकर संक्रांति, 14 जनवरी।
>
> उन दिनों कौन से घाट चलेंगे और कौन से नहीं: [लिंक]
>
> पिछली तिमाही में हमने 1,842 अनुष्ठान किए: 1,791 यथानियत, 44 बाधित, 7 नहीं हो सके। पूरा विवरण, कारणों सहित: [लिंक]
>
> [सूची से हटें] — स्नानिफ़ाई

Carrying the transparency numbers inside the only marketing email you send is not a flourish. It is what makes the channel defensible.

---

## 5. What a membership must and must not contain

### 5.1 Kill Varsh as an entitlement

$108 for twelve snans, sold against an honest annual rhythm of two to four, is a breakage product. At an assumed median usage of four, you keep 67% of the prepayment as unearned revenue — roughly $69,000 a year at 12,000 households, about 9% of modelled revenue. Your docs already concede pro-rata refunds within twelve months, so most of this is ethically surrendered already, but only for customers who think to ask, which is the definition of the pattern.

**Replace with Snan Kosh (स्नान कोष).** $108 buys $130 of rite credit, valid 24 months, unused portion **automatically refunded at expiry without the user asking**. Revenue recognised per performed rite, as growth.md already requires. You keep the whole cash-flow-at-peak benefit — sell hard during Pitru Paksha and Kartik, deliver across twelve months — and you surrender only the part you never earned. The change is purely about who keeps the unused value, and it removes the one thing on your price list that a hostile screenshot could land on.

### 5.2 Smaran is the membership

$81/yr, one departed person. Two rites: the tarpan on the correct tithi, and one during Pitru Paksha. À la carte those two cost $102, so Smaran is a **21% discount for prepaying** — an honest, statable reason to buy that does not touch merit, and therefore does not brush your never-claim #4. Copy: *"Two rites a year, for less than two rites cost."*

Everything else about Smaran is already correct in your catalog: one notification per observance, one-click cancel with no retention offer, the confirmation that says cancelling changes nothing for them, and a memorial page that genuinely stays free. Add: a successor, a funded reserve, and the removal of the word "perpetual" until the reserve exists.

### 5.3 What a family membership must contain — and why not yet

If you eventually ship a Kul membership, the free/paid line has to be drawn here:

- **Free forever:** the register, the annual computation, one notice per name per year with the date in the body, full export, the memorial page after cancellation.
- **Paid:** performance of rites, permanence of media at full resolution, the annual household almanac PDF (the year's dates with the workings and the source named), co-stewardship at scale.

**What it must never contain:** any spiritual differentiator of any kind; streaks, badges, levels or status; "member-only muhurats" that manufacture scarcity; priority that degrades non-members' service rather than merely ordering members first; auto-renewal without the 30- and 14-day cancellable notices; any entitlement likely to go unused; and — critically — the reminders. The moment reminders sit behind a paywall, the register stops being a service and becomes a hostage.

**Do not launch it in year one.** A membership whose value is "we keep your files" is weak until there are three years of files. Ancestry can charge $229 for accumulated records; you cannot yet. Launching it early produces a product with no reason to renew, and the pressure to fix that will push you straight back toward the entitlement structure you just removed from Varsh.

---

## 6. Churn, repeat rate and LTV

Full arithmetic is in the `numbers` field. The summary and, more usefully, the ranking:

- **Blended year-2 household repeat rate: ~25%.** That is the number to hold yourself to. It is not high, and there is no honest lever that makes it high.
- **Segment A (diaspora pitru buyer): 5-year revenue $128, contribution $87.** Everything else is materially worse: Segment B (devotional, $43) is a trial funnel; Segment C (gift, $51) is really a referral mechanism; Segment D (India, ~$30) is session fill.
- **Smaran subscriber: 5-year revenue ~$204, contribution ~$143.** Roughly 1.6× the contribution of the same household buying à la carte, on 2.36 expected years, benchmarked against RevenueCat's VERIFIED 44.1% median 12-month annual-plan retention and adjusted for the fact that you send a cancellable renewal notice with no retention offer, which will cost you real renewal points and should.

**Sensitivity ranking, which is the actionable part:**

| Lever | Δ 5-yr LTV |
|---|---|
| Convert household to Smaran | **+59%** |
| Year-2 retention 29% → 40% | +17% |
| Register registration 25% → 55% | +13% |
| Names per register 1.0 → 2.0 | +11% |

Two conclusions follow, and neither is what a growth deck would say.

**First: the register is not a revenue rocket.** Taking registration from 25% to 55% is worth about $15 per household over five years. It is worth building anyway, for three reasons that are not LTV: it is a genuine switching cost (moving to a competitor means re-entering the dates of your dead); it is counter-cyclical (individual tithis are uniformly distributed, which is the only structural answer to a demand curve with a September spike); and it is forecastable, which matters more than it looks (§7).

**Second: retention dominates, and retention is not a messaging problem.** You have banned yourself from every lever that would normally move it. What is left is whether the product worked: whether the Naam Kshan pointed at the right second, whether the recording verified in the uncle's browser, whether the Patra arrived in six hours and looked like a document rather than a receipt. **Delivery quality is the retention program.** Budget engineering accordingly, and stop looking for a lifecycle campaign that will substitute for it, because there isn't one and the search for one is how companies like this go bad.

**Involuntary churn** will be 20–40% of your total subscription churn (VERIFIED, Recurly network data via Churnkey), with consumer-card failure at 8–15% and median recovery of 30–45%. Two silent retries plus one personally-empty email is the right design; it recovers most of the 40.5% of failures that are insufficient-funds, and it makes the catastrophic email structurally impossible.

---

## 7. The thing that actually makes this scale: schedulable demand

This is the argument I would lead with internally, and it is not an LTV argument.

Your unit economics rest on filling a 51-seat Samuhik session. Fixed cost per session is about $27.60 (₹1,800 officiant floor + ₹600 assistant), which is $5.52 per order at five seats and $0.79 at thirty-five. More importantly, one officiant can run only one or two sessions inside a given auspicious window, so **fill rate, not demand, is what determines how much revenue a muhurat can absorb.**

A one-off buyer's rite date is known three to fourteen days ahead. **A Smaran subscriber's rite date is known twelve months ahead.** So is every registered tithi in the Panji. That means the recurring engine's real product is not retention revenue — it is a **twelve-month-forward seat map**, which lets you:

- place uniformly-distributed annual tithis into off-peak sessions and flatten the Pitru Paksha spike;
- run fewer, fuller sessions and therefore carry fewer officiant retainers;
- know in January how many officiants you need in October.

Which leads to the conclusion that falls out of the arithmetic and that nobody will like: **at year-3 volume (~21,000 rites), six ghats running daily muhurats average about ten seats in a fifty-one seat session, and about three if you run three sessions a day.** Publish six rivers; schedule two. Give each river a published running schedule — Ganga daily, Triveni several times a week, the others weekly and on their own parvas — and let the calendar, not the customer, decide which ghat runs on which day. River choice at will belongs in Ekantik, where the customer is paying for the session.

---

## 8. Where I would move the ethical line, and what it costs

You invited this. Five candidates, with the trust cost priced.

**1. Allow one plain-text booking link in the tithi notice. MOVE IT — the line is already effectively there.** Trust cost: low, *provided* the self-perform sentence comes first. "If you observe the day yourself, or with your own purohit, that is the better thing" is the cheapest and strongest trust asset in the entire product, because offering the non-commercial option before the commercial one is a costly signal nobody predatory would send. Your two internal docs contradict each other here and this must be settled before the sending code exists.

**2. A second, morning-of notice. MOVE IT for Smaran subscribers only; do not move it for the free register.** For a subscriber it is a delivery notice about a rite they have already paid for. For a non-buyer it is a nudge dressed as a service, and it is the exact shape of the thing your ethics page bans. Trust cost of getting this backwards: high.

**3. "We notice you have not confirmed your reckoning." MOVE IT.** This is a data-quality message, not marketing, and the failure it prevents is the worst one available. Trust cost: none. Gate 2 passes because the trigger is the user's own registration.

**4. Mobile push. DO NOT MOVE — go further and ban it entirely in year one.** Your ethics page permits push on a death anniversary with explicit per-person opt-in. I would not take that permission. Push is the channel where the cap is hardest to defend, where an accidental send has the largest blast radius, and where the eventual mistake will be least forgivable. Cost: ASSUMPTION 2–4% of bookings foregone. Pay it.

**5. Win-back campaigns. DO NOT MOVE, even though it costs money.** A lapsed household is not a problem to be solved; it is a family that did not need you this year. Cost: ASSUMPTION 3–5% of revenue foregone. The dormancy notice in §4.4 does the useful part of a win-back — it reminds people what they have — without asking for anything, and it offers the export first, which is what makes it honest rather than clever.

---

## 9. What this costs in human minutes

The whole retention engine, at 10,000 households:

- Annual panchang authority sign-off on tithi and parva dates: ~2 days a year, external, paid honorarium. Unavoidable, and an ephemeris cannot replace it because the disagreements are conventional, not astronomical.
- Reckoning disputes and corrections: ASSUMPTION 3% of registrations × 15 minutes ≈ 75 hours a year.
- Sankalp moderation flags: small, 2-hour SLA, already specced.
- Everything else — computation, notices, scheduling, Patra generation, verification, renewal, cancellation, dunning, export — is cron and solver.

**≈0.15 FTE.** The only human minutes that scale with volume are the officiant's, at the ghat, doing the thing customers are paying for. That is the line the brief asked you to design to, and the recurring engine sits comfortably inside it.

---

## 10. The six numbers to run this on

1. **Register Registration Rate** — % of pitru-rite buyers who register ≥1 tithi. Target 55%.
2. **Names Per Register** — target 1.8 at launch, 2.6 by year three.
3. **Notice→Rite Conversion** — target 25–35%, **ceiling 45%** as an ethics tripwire.
4. **Household Active Rate** — % performing ≥1 rite in trailing 12 months. Target 25%.
5. **Smaran renewal rate** — target 52% first renewal, 68% thereafter.
6. **Archive depth** — rites per household. This is the moat, measured.

All six are computable from your own orders and register tables. None requires a third-party analytics script, a session recorder, or a form-field capture — which is fortunate, because your ethics page bans all three.

---

## Sources

- [Sri Mandir keeps investors hooked as digital devotion grows — TechCrunch, 30 Jun 2025](https://techcrunch.com/2025/06/30/sri-mandir-keeps-investors-hooked-as-digital-devotion-grows)
- [AppsForBharat raises ₹175 crore Series C — Business Standard](https://www.business-standard.com/companies/start-ups/appsforbharat-raises-rs-175-crore-series-c-to-expand-devotion-platform-125063001067_1.html)
- [State of Subscription Apps 2025 — RevenueCat](https://www.revenuecat.com/state-of-subscription-apps-2025)
- [Involuntary Churn Benchmarks — Churnkey](https://churnkey.co/blog/involuntary-churn-benchmarks/)
- [Churn rate benchmarks — Recurly](https://recurly.com/research/churn-rate-benchmarks/)
- [WhatsApp Business switches to per-message pricing in India — Medianama, Jul 2025](https://www.medianama.com/2025/07/223-whatsapp-business-per-message-pricing-india/)
- [WhatsApp Business API pricing India — AiSensy](https://aisensy.com/pricing)
- [Hindu Shraddha Tithi Calculator — Drik Panchang](https://www.drikpanchang.com/utilities/tithi/hindu-shraddha-tithi-calculator.html)
- [Shraddha Tithi Finder — Online Jyotish](https://www.onlinejyotish.com/astrology-tools/shraddha-tithi-finder.php)
- [How to find Shradh Tithi — Hindu Blog](https://www.hindu-blog.com/2012/09/how-to-find-shradh-tithi.html)
- [Swiss Ephemeris price list — Astrodienst](https://www.astro.com/swisseph/swephprice_e.htm)
- [Population of Overseas Indians — MEA, Government of India](https://www.mea.gov.in/population-of-overseas-indians)
- [Ancestry subscription plans — Family Tree Magazine](https://familytreemagazine.com/websites/ancestry-help/subscription-plans-explained/)
- [DPDP Rules 2025 notified — PIB, 13 Nov 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014)
- [Online Shradh at Gaya, ₹10,999 — Prayag Pandits](https://prayagpandits.com/product/online-shradh-at-gaya/)
- [Gaya Pind Daan, ₹6,999 online — YatraDham](https://temple.yatradham.org/puja/gaya-pind-daan)

Internal documents read: `/Users/sven/dev/snanify/docs/design/ethics.md`, `/Users/sven/dev/snanify/docs/design/growth.md`, `/Users/sven/dev/snanify/docs/design/catalog.md`, `/Users/sven/dev/snanify/src/content/trust.ts`.

---

## Adversarial review

**Verdict:** needs-work

### Wrong or unverified

- HEADLINE IS FALSE ON ITS OWN REPO. The claim that Varsh's 12-snan entitlement is 'the one dark pattern your ethics page does not already ban' is contradicted by two files the analysis says it read. /Users/sven/dev/snanify/docs/design/ethics.md:449 already grants 'Pro-rata refund at $9/snan, any time within 12 months. No expiry forfeiture inside the year', ethics.md:456 requires cancellation in <=2 clicks, and /Users/sven/dev/snanify/docs/design/growth.md:403 already mandates 'Recognise 1/12 per performed snan, not on sale. Ship a deferredRevenue ledger with the Varsh SKU or do not ship the SKU.' The breakage is already banned in-year and already banned in revenue recognition. What actually remains unbanned is the narrow case of forfeiture at month 13 for a user who never asks. That is a real but much smaller point, and it does not carry a headline.
- THE $69,120 BREAKAGE NUMBER IS BUILT ON A 0% REFUND-REQUEST RATE THAT IS NEVER STATED. 960 x $72 arithmetic is correct, but it silently assumes not one of 960 buyers uses the two-click pro-rata refund the spec already promises. Change that assumption to a plausible 30-40% and the number drops to ~$41-48k. The analysis concedes 'most of this is ethically surrendered already but only on request' in the evidence field and then models as if none of it is.
- THE $69,120 IS COMPARED TO A REVENUE BASE THAT EXCLUDES THE PRODUCT PRODUCING IT. '9% of modelled revenue' divides by $762k, but Varsh appears nowhere in the year-3 revenue build (A $492k + B $101k + C $67k + D $23k + Smaran $79k). 960 Varsh buyers are $103,680 of revenue and ~3,840 rites that are missing from both the revenue line and the 20,904 rite count. The model omits a product from the top line and then expresses that product's breakage as a share of the top line.
- NOTIFICATION COST IS UNDERSTATED BY ROUGHLY 20x, AND THE SECTION CONTRADICTS ITSELF INTERNALLY. The same paragraph states a cap of '<=14 non-transactional messages/year' per engaged household and then costs 28,000 messages across 10,000 households = 2.8 per household. The itemised cap (1 x 1.8 names + 1 Pitru Paksha + 2 Smaran + 2 renewal + 4 almanacs) is ~11.5/household = ~115,000 messages, not 28,000. Separately, the whole calc applies the India utility rate to a base the analysis itself says is 85% non-India (A 45% + B 25% + C 15% diaspora vs D 15% India). US/UK utility is ~$0.004-0.006 Meta plus $0.003-0.010 BSP markup, i.e. ~7-11x the India rate. Correct order is $1,000-2,500/yr, not $47. The conclusion 'the cap is free' survives; the number does not, and publishing it would be publishing a wrong number.
- WHATSAPP RATES ARE STALE AND THE MARKETING RATE LOOKS WRONG EVEN FOR 2025. India moved to local-currency billing on 1 Jan 2026: utility ~Rs 0.115, marketing ~Rs 0.8631. The cited Rs 1.09 marketing rate does not match Meta's India card in either period (the 2025 figure was Rs 0.7846); the analysis's own evidence field admits a Rs 0.78-1.09 range and the finding then quotes the top of it to manufacture '~7.5x'. The ratio happens to survive at current rates (0.8631/0.115 = 7.5x), so the conclusion holds by luck. Also unmodelled: 18% GST on both Meta's charge and BSP fees, and Meta's 1 Oct 2026 change making in-window utility/service messages chargeable.
- SMARAN'S '~1.6x a repeat one-off buyer' MIXES TIME HORIZONS. Smaran contribution LTV $142.71 is an unbounded-horizon geometric sum (expected life 2.355 yr); Segment A's $86.58 is explicitly 5-year-capped. Cap Smaran at 5 years the same way (life 2.128 yr) and contribution is $128.97, i.e. 1.49x, not 1.6x. The headline number is inflated by the horizon mismatch alone.
- SMARAN'S 74.8% MARGIN IS AN ARTIFACT OF DROPPED COST LINES, NOT A BETTER PRODUCT. The per-rite stack charges refunds/chargebacks (4% = $2.28), support ($0.20) and amortised session fixed cost ($1.20). The Smaran stack charges none of them. Add them back at 2 rites/yr (~$3.24 refunds + $0.20 support + $2.40 session fixed) and cost/yr goes $20.40 -> ~$26.24, contribution $60.60 -> ~$54.76, margin 74.8% -> 67.6% -- i.e. identical to the a-la-carte 67.5%. Smaran does not have a margin advantage; it has a frequency advantage. Combined with the horizon fix, the real multiple is ~1.35x, not 1.6x.
- THE SMARAN RENEWAL ASSUMPTION IS ADJUSTED IN THE WRONG DIRECTION. RevenueCat's 44.1% median 12-month annual retention is verified, but that median comes from apps that run win-back campaigns, retention offers and paywall interstitials -- every one of which this product has banned (catalog.md:550 'no retention offer on Smaran'; trust.ts s9 'Cancelling costs no more clicks than starting, with no interstitial and no offer'). The analysis then adjusts UP to 52% and invents 68% for Y2+ with no benchmark at all. A T-30 and T-14 'cancellable in the email' notice sent to a bereavement subscriber is functionally a cancellation prompt delivered twice a year. Below-median is the defensible prior. At Y1 40% / Y2+ 55% the 5-yr-capped life falls to 1.72 and Smaran revenue LTV drops ~27%, which erases most of the '+59%' headline.
- THE SENSITIVITY TABLE TREATS NON-ORTHOGONAL LEVERS AS INDEPENDENT AND MIS-SIGNS ONE OF THEM. 'Register registration 25% -> 55%' is not upside: the baseline $128.26 already assumes 55%, so that row is the cost of failing, not a lever to pull. And 'year-2 retention 29% -> 40%' is arithmetically the same thing as 'every household behaves like a registered household' -- the two rows move the same underlying parameter and cannot be added. Findings text also disagrees with the table it cites (+13.5% vs +13.0%, +11% vs +11.4%).
- YEAR-3 REVENUE DOUBLE-COUNTS SMARAN SUBSCRIBERS. 972 subs are 18% of Segment A's 5,400 households, so they are already inside the 5,400 x 1.6 orders x $57.20 = $494k line, and their $79k subscription is then added on top. That models a subscriber at $172.52/yr while the Smaran LTV section models the same household at $81 + 0.5 parva rites x $30 = $96/yr. Overstatement 972 x $76.52 = $74,377, ~10% of the $762k, plus ~1,069 phantom rites. Note this cuts against the six-ghats conclusion's favour -- fewer real rites means fill rate is worse than modelled, so the 'publish six, schedule two' recommendation is if anything understated.
- THE FILL-RATE ARITHMETIC DIVIDES ANNUAL VOLUME BY 350 DAYS, WHICH THE COMPANY'S OWN GTM DOC FORBIDS. growth.md:1 states 'Cash flow is brutally seasonal (two lunar months carry ~50% of the year's volume)'. Under flat-demand division you get 9.95 seats/session at six ghats. Under the company's own seasonality, Pitru Paksha's 16 days carry ~10,000 rites = ~625 seats/day = 12+ full 51-seat sessions/day company-wide, while March runs near-empty. The conclusion (publish six, schedule two) is probably right, but the arithmetic offered as support is the wrong model, and the real problem is peak capacity, not average fill. Three mutually inconsistent fill assumptions also appear in one document: 11 seats/session (unit economics), 18 seats/session (year-3 sketch), 9.95 seats/session (six-ghats finding).
- SNAN KOSH IS PROBABLY A REGULATED STORED-VALUE INSTRUMENT, AND IT IS ON STRIPE'S RESTRICTED LIST. The flagship recommendation -- '$108 buys $130 of rite credit, valid 24 months' -- is a bonus-loaded prepaid credit. Stripe's Prohibited and Restricted Businesses list explicitly covers 'sale of prepaid cards or credits' and 'reloaded payment cards, gift cards, virtual credits or other products where monetary value is stored'. The US CARD Act (15 U.S.C. 1693l-1) sets a five-year floor on gift-certificate expiry, so a 24-month expiry is on its face non-compliant for US buyers; California bans expiration of gift certificates entirely; several states impose escheat/unclaimed-property obligations on unredeemed balances. The auto-refund-at-expiry design mitigates the consumer harm but does not remove the characterisation. This is presented as an 'M'-effort ethical cleanup with zero regulatory discussion, and it is the single largest hand-wave in the document. Also note ethics.md:893 already flags prepaid-obligation treatment as an open India legal question, and Stripe lists 'religious organizations' as prohibited in India -- so the assumed 'Stripe intl 2.9% + $0.30' cost line is itself unverified for this vertical.
- THE ANCESTRY COMPARISON IS BOTH MIS-CITED AND A FALSE ANALOGY. Current Ancestry US 12-month pricing is $229 (US Discovery), $319 (World Explorer), $479 (All Access) -- so $229/yr is the cheapest tier, not the premium anchor implied, and $19.99/mo x 12 = $239.88 does not equal $229. The finding also mixes tiers by pairing '$229/yr' with 'World Explorer renews $169/6mo'. More important, the analogy is structurally backwards: Ancestry's moat is a licensed records corpus a user cannot rebuild, whereas Snanify's archive is the user's own recordings, which the analysis itself recommends be fully exportable. It then calls the exportable archive 'a moat'. An archive of your own files that you can export is a courtesy, not a switching cost, and it will not support $229/yr in year three either.
- MISATTRIBUTED SOURCE ON THE ONE FINDING THAT DRIVES A BUILD DECISION. The claim states 'growth.md 8.4 includes one; catalog.md's adversarial note demands no booking button, no offer'. Both cited lines are in growth.md -- the template with '{link}' is at growth.md:449 and the no-CTA ruling is at growth.md:589. The contradiction is internal to one file, which materially changes how it gets resolved (one author, one doc, later section overrides earlier draft). The evidence field gets this right; the claim text does not.
- THE DRIK PANCHANG EVIDENCE IS OVERSTATED. The finding asserts 'Drik Panchang and Online Jyotish both expose separate amanta/purnimanta and regional settings'. The actual Drik Panchang shraddha calculator takes name, gender, death date/time and location only -- it exposes no amanta/purnimanta toggle and no regional reckoning selector. The underlying reckoning divergence is real (and correctly flagged), but this specific sentence is not supported by the page cited, and it undercuts the 'proves demand' inference too: those calculators demonstrate a search-traffic surface, not willingness to pay.
- THE CONVERSION-CEILING TRIPWIRE CONTRADICTS THE SIX GATES IT SITS BESIDE. Measuring 'notice -> booking within 21 days' requires per-recipient attribution from a specific message to a specific purchase -- exactly the individual-level linkage that gate 6 ('marketing bodies byte-identical across all recipients') and trust.ts s8 ('No analytics script, no advertising script, and no session-replay script runs anywhere on this site, ever') are designed to make impossible. It is buildable as an aggregate cohort ratio, but the recommendation does not say that, and the ~45% threshold is invented with no stated basis.
- THE ANALYSIS USES 'SHRADDHA' AS ITS CENTRAL FRAME, WHICH THE REPO EXPLICITLY BANS. ethics.md:161 requires the field 'rite_kind: tarpan_smaran, never shraddh' and scopes obligatory life-cycle rites out. growth.md:562 calls the conflation 'the deepest exploitation in this document, worse than any banned phrase'. This analysis repeatedly sells 'annual shraddha tithi', 'automatic tithi-accurate annual shraddha tarpan' and 'we remember the correct date' as the product promise. If the register computes and announces a shraddha date and then offers a tarpan on it, the buyer will reasonably believe the varshik shraddh is discharged. That is the exact failure the repo names, and the analysis does not address it once.
- SEVERAL ITEMS PRESENTED AS NOVEL ARE ALREADY PUBLISHED COMMITMENTS. trust.ts s9 already publishes 'no invoking of anyone you have lost in order to keep your money' (covers the dunning finding), 'No message on the anniversary of a death unless you asked us for one, and one tap in that message stops it forever' (covers gates 2 and 5), and 'No box ticked for you, not an add-on, not dakshina, not a renewal, not a mailing list'. The structural framings (make it impossible in the data model, not the copy review) are a genuine upgrade and should be kept -- but they are hardening of live promises, not discoveries, and the analysis should not price them as new.

### Missing

- NO CAC. ANYWHERE. This is an LTV document with no acquisition cost in it, which makes its central claim -- 'retention dominates every other lever' -- unsupported. Segment A year-1 contribution is 1.25 x $57.20 x 0.675 = $48.26, so CAC must clear ~$48 for first-year payback on a considered, $51, once-a-year, grief-adjacent purchase sold to Indian-Americans aged 35-60. A 2x move in CAC swings the business harder than the +17% retention row, and the sensitivity table has no CAC line. Add one before any of the ordering conclusions can be trusted.
- NO ACQUISITION VOLUME MODEL BEHIND 12,000 ACTIVE HOUSEHOLDS. With a 25.2% blended year-2 repeat rate, reaching 12,000 active households in year three requires roughly 9,000+ new households acquired in year three alone. The entire year-3 revenue sketch depends on a number that is never stated, never costed, and never checked against Sri Mandir's funded presence in the same channel.
- THE 20% ATTACH ON $31 ANNADAAN IS FORBIDDEN ON THE SURFACE WHERE IT IS MODELLED. AOV of $57.20 depends on a $6.20 attach, but catalog.md:546 bans any 'upsell, cross-sell, or recommendation module in: post-bereavement, Pind Daan, Smaran, or health-flagged Japa flows' and trust.ts s9 bans pre-ticked add-ons. Pitru Tarpan is precisely a post-bereavement surface. At AOV $51 the Segment A 5-year LTV falls to ~$114 (-11%) and the payback bar tightens to ~$43. The same ban also kills the '+0.5 extra parva rites/yr' cross-sell assumed in the Smaran LTV.
- THE 4% REFUND ASSUMPTION IS NOT TESTED AGAINST THE PUBLISHED REFUND POLICY. ethics.md:100 and trust.ts commit to a full no-questions refund within 14 days AFTER delivery, one per account, one button, no reason required, no retention flow. On a digital-only good in a grief category with a self-serve button, 4% is optimistic and it is the third-largest cost line. It is also the line most likely to be gamed once the product is known. Model 8-12% as a downside case.
- THE OFFICIANT COST FORMULA BREAKS AT THE FILL RATES THE MODEL DEPENDS ON, AND THE BREAK IS PUBLICLY VISIBLE. At the modelled 18 seats x $57.20, a session grosses $1,030 and 20% is $205.92 = ~Rs 17,900 to one officiant for one session -- about 10x the Rs 1,800 floor, and at 3.3 sessions/day company-wide that is ~$152k/yr flowing to a handful of ghat purohits. Either the margin engine is real as modelled, or the 20% gets renegotiated. If it gets renegotiated, trust.ts:249 commits to publishing 'what share of revenue reached the officiants' on the fifth of every month -- so the cut is a public, dated, monthly-visible event. The analysis treats 20% as a stable cost line and never notices that the cheapest available margin lever is the one the company has promised to publish.
- THE NAAM KSHAN IS NEVER COSTED, DESPITE BEING NAMED AS THE ENTIRE RETENTION PROGRAM. The analysis concludes 'retention is moved by delivery quality, not by messages' and then never models the hardest delivery mechanism in the product: locating the exact second a specific name and gotra are spoken in a noisy live ghat recording, 21,000 times a year. Either it is ASR/forced-alignment on Hindi/Sanskrit proper nouns against ambient river and crowd noise -- unmodelled engineering with a nonzero error rate on the exact field that must never be wrong -- or it is manual marking, which at 30 seconds per name is ~175 hrs/yr and breaks the 0.15 FTE claim. Pick one and cost it.
- THE PUBLISHED '14 MESSAGES A YEAR' CAP BREAKS AT ~5 REGISTERED NAMES, AND COLLIDES WITH THE DOCUMENT'S OWN TOP GROWTH LEVER. The cap is derived for 2 names + 1 Smaran (~11.5). At 4 names it is 13; at 6 names it is 15+. Meanwhile the recommended lever is to push names-per-register from 1.0 to 2.0 and beyond. Either large families get silently truncated -- a family with six ancestors is not told about all six, which is the one thing the register exists to do -- or the published number is wrong. Publish a per-name formula, not a scalar, or state the truncation rule.
- ROSCA IS THE ACTUAL BINDING US LAW AND IT IS NOT MENTIONED. The click-to-cancel rule was vacated by the Eighth Circuit in July 2025; the FTC opened a new ANPRM on 11 March 2026 with comments due 13 April 2026. But ROSCA and FTC Act Sec. 5 enforcement never stopped, and California's ARL plus roughly a dozen other state auto-renewal statutes impose affirmative-consent, post-purchase-acknowledgment and annual-reminder duties on an $81/yr auto-renewing US consumer subscription right now. 'Status contested; I did not verify' is honest but the status is knowable in one search, and the affirmative-consent and acknowledgment duties are design constraints on Smaran's checkout, not counsel questions.
- DATA PROTECTION IS ABSENT FROM AN ANALYSIS WHOSE ENTIRE THESIS IS A DATABASE. The recurring engine is a permanent register of religious affiliation, gotra, bereavement and named deceased relatives, held by a Berlin entity, for EU/UK/US/Indian data subjects. growth.md:594 already flags GDPR Art. 9 explicit consent plus a DPIA and the DPDP Act 2023 at the same priority as GST/FEMA. This analysis proposes storing more of exactly that data, for longer, with successor stewards and up to 8 co-stewards -- i.e. disclosing special-category data about a subscriber to third parties -- and never mentions consent, DPIA, retention limits, or cross-border transfer once.
- NO OFFICIANT SUPPLY MODEL AND NO CHECK THAT 51 SEATS IS PHYSICALLY PERFORMABLE. muhurat.md:68 states 'seats measure recitation time, not headcount'. 51 sankalps at name + gotra + stated intention is plausibly 20-30 seconds each, i.e. 17-25 minutes of continuous recitation before the rite itself, and the Naam Kshan must be individually resolvable within it. The 51-cap is the entire unit-economics engine and its feasibility is assumed, not checked. Nor is there any roster, illness backup, or officiant-churn model for the two-to-six ghats the analysis wants running daily.
- PEAK CAPACITY, WHICH IS THE REAL CONSTRAINT, IS NEVER SIZED. Pitru Paksha is 16 days and, on the repo's own seasonality, carries a large share of annual volume. That is the operational question -- how many officiants, how many parallel sessions, how many streams -- and the analysis instead reports a company-wide average of 3.3 sessions/day. Size the peak.
- RENEWAL CURRENCY. RevenueCat's 44.1% is from the 2025 report; a 2026 edition exists and TechCrunch reported in March 2026 that long-term retention is deteriorating further. If the benchmark is going to carry the flagship LTV, use the current one.
- THE COUNTERFACTUAL ON RECOMMENDATION 1 IS NEVER STATED. The analysis argues for allowing a plain-text booking link in the tithi notice, then invents a conversion-ceiling tripwire to catch the harm that link creates. The circularity should be named: the tripwire only exists because the CTA was reintroduced. growth.md:607 says the register is 'the product's soul, protect it from monetisation pressure permanently'. Overriding that is a defensible call, but it must be argued as an override with a stated trust cost, not presented as neutral contradiction-resolution.

### Must survive

- THE TITHI-DRIFT WEDGE IS THE BEST IDEA IN THE DOCUMENT AND IT CHECKS OUT. 12 lunar months = 354.37 days vs 365.24 solar = 10.87 days/yr drift, corrected by adhik maas roughly every 32.5 months, is correct astronomy. The Drik Panchang, Padagaya and Online Jyotish calculators all exist and are correctly cited. The double-edged reading -- proves demand, disproves defensibility of the computation itself -- is exactly the right conclusion, and the corollary (the moat is the register plus the delivery, never the maths) should survive every other revision to this document.
- THE SRI MANDIR EVIDENCE IS REAL, CORRECTLY CITED, AND THE INFERENCE FROM IT IS SOUND. Verified against TechCrunch 30 Jun 2025 and the Series C coverage: international ARPU ~Rs 7,000 (~$81) vs Rs 600-800 (~$7-9) in India, ~20% of demand from US/UK/UAE/Canada/Australia/NZ, ~$12M run rate entering 2025, $20M Series C (Rs 175 crore) led by Susquehanna Asia VC, ~$50M total raised. The reading -- 'the category is funded but small, and nobody will outspend you on the tithi register' -- is the correct strategic inference, and the ~10x diaspora WTP gap is the strongest single external datapoint supporting the two-ladder pricing.
- THE RECKONING-DIVERGENCE FINDING IS THE MOST VALUABLE THING HERE AND THE RECOMMENDATION IS RIGHT. Aparahna kala rather than sunrise, amanta vs purnimanta disagreeing on the month, adhik maas breaking naive arithmetic, and Tamil/Malayali/Bengali/Odia families observing by solar month and nakshatra rather than tithi -- all real, and it converts a nice-sounding subscription into a promise that fails silently, annually, forever, about someone's dead parent. Capture a reckoning profile at registration, compute at aparahna kala, show the working, let the family's answer override permanently, name the panchang source, and refuse to sell where you cannot compute confidently. Publishing 'we do not serve your tradition yet' as a dated roadmap item is genuinely the right trade. This was already flagged at catalog.md:629 and left unaddressed; this analysis is right to make it a launch gate.
- THE STRUCTURAL-NOT-GOVERNED PRINCIPLE IS THE BEST ENGINEERING INSTINCT IN THE DOCUMENT. assertSendable() that throws rather than a policy that gets reviewed; the cap as a const with a test rather than a config value; the billing service physically unable to join to the pitru table; marketing bodies byte-identical by construction so the list is personally empty. Gate 6 in particular is a real contribution -- segmentation is precisely the mechanism that turns a reminder into grief-targeting, and making it impossible rather than forbidden is correct. Keep all of this verbatim.
- THE MONTH-NINE PREDICTION IS THE MOST USEFUL SENTENCE IN THE RISK SECTION. 'It will not present as let us be predatory; it will present as a second reminder, purely as a courtesy.' That is how these constraints actually die, and pairing it with a published numeric cap so that raising it becomes a public announcement is the right defence.
- THE FORECASTABILITY INSIGHT IS NON-OBVIOUS AND CORRECT. A Smaran seat is known 12 months ahead; a one-off seat is known 3-14 days ahead. In a business whose entire margin structure is filling a 51-seat session, a forecastable seat is worth more than its revenue, because it lets you commit an officiant and a muhurat with confidence. This reframes the subscription as a capacity-planning instrument rather than an ARPU instrument, and it is the strongest strategic argument for Smaran in the document -- stronger, and more robust, than the LTV multiple the headline actually leads with.
- SUCCESSION AND THE 'PERPETUAL' PROBLEM ARE CORRECTLY DIAGNOSED. A perpetual memorial promise held against a card belonging to a person who will also die is an unfunded liability, and the nominated-steward plus dormancy-as-archive-safety-notice plus full-export design is the right shape. 'Retire the word perpetual unless the reserve exists' is exactly right and matches catalog.md:609.
- THE INDIA-RESIDENT REFRAME IS RIGHT AND UNDER-SOLD. Treating Bharat Dar orders as session fill rather than a revenue segment is correct: an incremental Rs 500 seat in an already-scheduled session contributes at near-zero marginal cost and improves everyone's fill. It also cross-checks sensibly against Sri Mandir's verified Rs 600-800 India ARPU. The strategic implication -- India volume is what makes the diaspora margin work, not a separate business -- deserves more prominence than it gets.
- THE DUNNING ANALYSIS IS RIGHT EVEN THOUGH THE UNDERLYING BAN IS ALREADY PUBLISHED. Consumer card failure at 8-15% with 30-45% recovery means this template will be sent thousands of times, and 'nothing is owed and nothing is lost' with no retry after is the correct copy. The upgrade -- enforce it in the data model rather than in copy review -- is real and should ship.
- 'PUBLISH SIX, SCHEDULE TWO' IS THE RIGHT CALL DESPITE THE FLAWED ARITHMETIC. The insight that six rivers is a marketing asset and a margin liability, and that a published per-river running schedule rather than free customer choice is what protects fill rate, is correct and honest. Redo it against peak-season demand rather than a 350-day average and the conclusion gets stronger, not weaker.