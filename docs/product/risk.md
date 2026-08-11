# Snanify: Kill-Risk Analysis — What Actually Ends This Business

**The business is killed not by ethics or regulation but by arithmetic and access: shared sessions break even at ~9 of 51 seats while paid acquisition costs roughly 4x the first order value, and the one asset that would make it defensible — written permission at a named ghat — is the one thing that cannot be automated and that you currently hold at zero of six sites.**

> Adversarial review: **needs-work**

## Key numbers

```
## 1. Session economics: the cap is not the constraint, the floor is

Prices are from `src/content/rituals.ts` (entry rite "Sankalp": $21 Vishwa Dar / ₹501 Bharat Dar). FX ₹88/USD — ASSUMPTION.

**Blended revenue per sankalp** (ASSUMPTION: 30% diaspora / 70% India mix)
- 0.30 × $21 × 88 = ₹554
- 0.70 × ₹501 = ₹351
- **Blended = ₹905 per sankalp**

**Variable cost per sankalp** (ASSUMPTION)
- Payment processing 3.5% (Razorpay international ~3% + GST; domestic ~2%)
- Refunds/disputes/support reserve 2.0%
- **Total 5.5% → net contribution ₹855 per sankalp**

**Fixed cost per session** (ASSUMPTION, no verified officiant or ghat rates exist yet — the catalog itself says so at line 340)
- Officiant/ritvik honorarium ₹3,000
- Camera operator + bonded connectivity ₹2,000
- Ghat / samiti / purohit-family fee ₹2,500
- Streaming, storage, CDN, permanent retention ₹300
- **Total ₹7,800 per session, whether 1 seat sells or 51**

**Break-even fill = 7,800 ÷ 855 = 9.1 sankalps of 51.**

| Fill | Gross | Contribution | Margin |
|---|---|---|---|
| 3 | ₹2,715 | **−₹5,235** | −193% |
| 9 | ₹8,145 | −₹105 | −1% |
| 10 | ₹9,050 | +₹750 | 8% |
| 20 | ₹18,100 | +₹9,300 | 51% |
| 51 (full) | ₹46,155 | +₹35,805 | **78%** |

The 78% number is real and it is the thing the deck will show. The −193% number is the thing that actually happens in month one. **Every session below 9 paying sankalps destroys cash, and the SKU design guarantees most sessions will be below 9.**

**SKU fan-out:** 6 ghats × 8 rites × 2 tiers (Samuhik/Ekantik) = 96 session types before muhurat premiums. If you run only 4 core rites at 6 ghats, daily, Samuhik only, that is 24 sessions/day. To average even 10 of 51 you need **240 paid orders per day = 87,600/year**. That is a company already at ~₹8 cr gross. You need the destination scale to survive the launch.

## 2. Paid acquisition arithmetic: the entry price cannot carry a customer

ASSUMPTION, standard Meta/Google benchmarks for Indian-diaspora targeting in US/UK:
- CPM $18, CTR 1.0%, landing-page conversion 2.0%
- CAC = $18 ÷ (1,000 × 0.01 × 0.02) = **$90 per acquired customer**

Against a $21 first order with 78% contribution at full session = **$16.40 contribution**.

**You need 5.5 repeat purchases to pay back one acquisition.** For a product bought at Pitru Paksha and a death anniversary — 1–2 occasions a year — that is a 3–5 year payback, and your own ethics rules explicitly ban the automated death-anniversary campaign that would be the only mechanism to drive the repeat.

Corollaries, and pick one:
- Diaspora entry price must be **$51–$108**, not $21 (CAC/contribution ratio then falls to ~2.2 orders), or
- Acquisition must be **100% organic/SEO/referral**, which is a 24–36 month build against an incumbent with 40M app downloads, or
- The business is a **high-AOV Ekantik-first** business and Samuhik is a loss-leading top of funnel, not the unit-economics engine.

The current design says Samuhik is the engine. At $21 with $90 CAC, it is the drain.

## 3. Competitive price reference (VERIFIED)

Sri Mandir / AppsForBharat, FY25: **>₹100 crore revenue on 5.2 million online pujas** → implied **~₹192 average revenue per puja**.

- Snanify Bharat Dar entry (₹501) = **2.6× the market-clearing price**
- Snanify Vishwa Dar entry ($21 ≈ ₹1,848) = **9.6× the market-clearing price**

That premium has to be paid for entirely by the proof mechanism, because nothing else differs. 20% of Sri Mandir's demand is already diaspora → roughly **1.04 million diaspora pujas/year already being served at ₹192**.

## 4. Chargeback exposure

At 90,000 orders/year and ₹905 AOV:
- 1.0% dispute rate = 900 disputes/year = **75/month**
- Mastercard ECM triggers at **100 chargebacks/month AND 1.5% ratio**; VAMP "excessive" merchant threshold is **1.5% (150bps) in US/CA/EU from 1 April 2026**, with an **$8 per-dispute fee**
- Grief-adjacent, intangible, no physical shipment, card-not-present, cross-border: a 1–2% dispute rate is a realistic band (ASSUMPTION). At 1.8% and 10,000 monthly orders you breach both programmes simultaneously.

A no-questions refund policy is not generosity here; it is the only structural defence, and it costs the 2% already modelled above.

## 5. Tax scenarios (see details for the law)

On ₹10 cr of gross revenue, 60% of it export:
- **Scenario A — you "conduct a religious ceremony"** (GST Notification 12/2017-CT(R) Entry 13(a)): domestic supply exempt. But exempt means **no input tax credit**. On ~₹2 cr of taxable inputs (streaming, cloud, agency, payment fees) that is **~₹36 lakh of unrecoverable GST/year**.
- **Scenario B — you are an "intermediary"** under IGST s.2(13): s.13(8)(b) deems place of supply = India. Your ₹6 cr of export revenue is **no longer zero-rated** → **₹1.08 cr of IGST**, plus interest at 18% and penalty, assessed retrospectively.

Scenario B is the tail risk that removes three years of profit in one order. It is not exotic — it is the single most litigated place-of-supply question in Indian GST.
```

## Findings

**Stripe explicitly prohibits "Religious organisations" and "Charities" as businesses in India, on its published jurisdiction-specific prohibited list.**  
*high confidence.* VERIFIED. https://stripe.com/en-in/legal/restricted-businesses — India section of "Jurisdiction-specific prohibited businesses" lists, verbatim: Airbags, Alcohol, Captive insurance companies, Cash couriers, Charities, Chit funds, Cross-border jewellery sales, Currency exchange, ... Non-profit organisations (NPO), Personal investment vehicles/companies, Religious organisations, ...

**Razorpay's Schedule II of prohibited products and services bars "Merchants who deal in intangible goods/services" and "miracle cures ... unsubstantiated cures, remedies or other items marketed as quick health fixes", with a clause reserving the right to add categories without notice.**  
*high confidence.* VERIFIED. https://razorpay.com/s/terms/partners/ Schedule II. Note: astrology/spirituality/religion are NOT named — the exposure is via the intangible-goods clause and acquirer discretion, not an express religious ban.

**Collecting foreign-currency payments into an Indian entity for services now requires a partner holding an RBI Payment Aggregator – Cross Border (PA-CB) licence; the old OPGSP workaround is closed.**  
*high confidence.* VERIFIED. RBI circular of 31 October 2023 regulating PA-CB entities; categories PA-CB-E / PA-CB-I / PA-CB-E&I; minimum net worth ₹15 crore at application rising to ₹25 crore by 31 March 2026; existing OPGSPs had to apply by 30 April 2024; per-unit transaction cap ₹25 lakh. Cashfree received a PA-CB licence in July 2024. Sources: trilegal.com, khaitanco.com, business-standard.com.

**"Conduct of any religious ceremony" is GST-exempt in India under Entry 13(a) of Notification 12/2017-Central Tax (Rate) — and the exemption is NOT conditioned on 12AA charitable registration (that condition attaches only to Entry 13(b), renting of religious precincts).**  
*high confidence.* VERIFIED. cbic-gst.gov.in Notification 12/2017-CGST; corroborated by taxmanagementindia.com Entry 13 manual. Consequence: exempt supply = no input tax credit.

**If the GST department characterises Snanify as an "intermediary" rather than the performer of the rite, s.13(8)(b) IGST deems place of supply to be India and the export revenue loses zero-rating, attracting 18% IGST retrospectively.**  
*medium confidence.* VERIFIED as law. Dharmendra M. Jani v. Union of India — Bombay High Court split verdict (2021), third judge (April 2023) upheld s.13(8)(b) and s.8(2) as constitutionally valid, confined in operation to the IGST Act. ELP, EY India, Khaitan & Co alerts. Whether Snanify is an intermediary is UNTESTED — that is the ASSUMPTION.

**A near-identical product — "Nama and Gotra Sankalpa" sold online for ₹801 — has already drawn a police reference and temple-administration action in India.**  
*high confidence.* VERIFIED. Singhadwar Police wrote to Shree Jagannath Temple Administration seeking a report on alleged cheating of devotees by the online platform Utsav (odishatv.in, article 207810). SJTA separately filed a cyber complaint over paid-darshan scam sites and issued a public advisory that it "never accepts any donation/offerings from the Devotees for Online Puja" (odishatv.in 271144; pragativadi.com). Charges cited: ₹4,500 chariot bhoga, ₹2,401 special puja, ₹2,151 dhwaja bandha, ₹801 nama-and-gotra sankalpa.

**Har Ki Pauri is not governed by the municipality. Shri Ganga Sabha, founded 1914 by Pt. Madan Mohan Malviya, controls the Brahmakund sanctum and the Har Ki Pauri ghats, and has demonstrated it will retaliate against filmmakers after the fact.**  
*high confidence.* VERIFIED. shrigangasabha.org; Hindustan Times (July 2021) — Ganga Sabha objected to alcohol/non-veg scenes in 'Haseen Dillruba' shot near the Haridwar ghats; Akhil Bharatiya Yuva Teerth Purohit Mahasabha warned filmmakers would not be allowed to shoot in Haridwar again absent an apology. Shri Ganga Sabha also successfully forced revocation of an invitation over a non-Hindu-entry rule, showing independent enforcement power.

**Commercial filming in India requires a national India Cine Hub permit (~USD 225 application fee, ~3 weeks) PLUS separate state, municipal and location permits for every site — six ghats across five states means six independent permission stacks.**  
*high confidence.* VERIFIED. indiacinehub.gov.in (single-window portal that replaced the Film Facilitation Office, run by Ministry of Information & Broadcasting); mib.gov.in general guidelines for grant of permission for film shooting; Karnataka single-window ₹15,000 departmental fee as a state example. The national permit is explicitly described as "an umbrella" that does not replace local permits.

**The best-funded incumbent is already moving into two of your six ghat towns with capital raised specifically for that purpose.**  
*high confidence.* VERIFIED. AppsForBharat (Sri Mandir) raised ₹175 crore / ~USD 20M Series C led by Susquehanna Asia VC (June–July 2025), with Fundamentum, Elevation Capital and Peak XV participating. FY25 revenue >₹100 crore; 5.2 million online pujas across 70+ temples; 40M+ downloads; ~3.5M MAU; 20% of demand from diaspora. Capital earmarked to scale to 20+ temple towns including Varanasi, Ayodhya, **Ujjain and Haridwar**, and grow to 500 temple partnerships. Sources: business-standard.com, yourstory.com, entrepreneur.com.

**The live site www.snanify.com currently publishes three fabricated trust signals. This is, today, an actionable misleading commercial practice in the UK and India, and it is the best evidence any hostile journalist could be handed.**  
*high confidence.* VERIFIED by direct fetch of https://www.snanify.com on 2026-08-11: "1,20,000+ Sankalps offered", "48 Countries served", "Live now · Har Ki Pauri, Haridwar", "04:24 IST · Ganga, Haridwar · opens in 6h 12m". Source in repo at /Users/sven/dev/snanify/src/lib/content.ts lines 28, 37, 41, 170, 174. Your own docs/design/ethics.md flags these as an "urgent finding" that "must be removed before this architecture means anything" — and they are still live.

**UK advertising rules forbid efficacy claims for spiritual services outright; the CAP/ASA position is that such claims cannot be substantiated in principle, so no amount of evidence-gathering rescues them.**  
*high confidence.* VERIFIED. ASA/CAP advice, "Psychics, spiritualists, fortune tellers, astrologers and clairvoyants" and the non-broadcast Advertising Guidance on Spiritual and Psychic Services; BCAP Section 15 (Faith, religion and equivalent systems of belief). Key rule: marketers "must neither make promises they cannot keep ... nor exploit the credulity of naive or susceptible people"; testimonials do not substantiate efficacy.

**India's Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 makes a "mantra, kavacha, talisman" a statutory "magic remedy" and criminalises advertising it as efficacious for a scheduled list of 54 conditions, plus conception, miscarriage, menstrual disorders and sexual capacity.**  
*high confidence.* VERIFIED. indiacode.nic.in/bitstream/123456789/1412/1/195421.pdf, s.2(c) definition and s.3 prohibition. Snanify's published refusal list already blocks the obvious triggers (dosha remedies, cures, guaranteed pregnancy) — the residual risk is SEO/growth copy, not the catalog.

**Sankalp text, gotra and ancestor names collected from EU/UK customers are Article 9 special-category data (religious beliefs) and India has no EU adequacy decision, so every transfer needs explicit consent plus SCCs plus a transfer impact assessment.**  
*medium confidence.* VERIFIED that no adequacy decision exists as of early 2026 (orfonline.org; saikrishnaassociates.com on the EDPS refusal of the EIB's Feb 2024 India transfer request). ASSUMPTION that gotra + sankalp qualifies as Art. 9 data — it plainly reveals religious belief, so this is a low-risk assumption.

**The premium days you price highest are the days ghat access is hardest and most dangerous, not easiest.**  
*high confidence.* VERIFIED. Maha Kumbh 2025, Mauni Amavasya (29 Jan 2025): at least 30 dead in a crowd crush at Sangam; Supreme Court PIL on pilgrim safety; anti-drone systems deployed at Mahakumbh Nagar that intercepted and shot down two unauthorised UAVs; documented mobile-network failure on peak days despite 328 new towers, 575 new BTS and 78 cells-on-wheels. Sources: BBC, Tribune India, PIB, India TV, ETV Bharat, deshgujarat.com.

**Anti-superstition legislation (Maharashtra 2013, Karnataka 2017) is a much smaller risk than it looks — both statutes target inhuman and coercive practices, not ordinary puja.**  
*high confidence.* VERIFIED. Maharashtra Act targets human sacrifice, black magic, claims of supernatural surgical powers, sex-change of a foetus. Karnataka Act targets fire-walking, jaw-piercing, made-snana rolling over leftover food, betthale seve. Sources: drishtiias.com, thefederal.com, thequint.com. Relevant to Snanify only in Nashik (Maharashtra) and Talakaveri (Karnataka), and only if the catalog ever adds a remedial/dosha rite — which it explicitly refuses to.

**US enforcement precedent for deceptive spiritual services is severe and old, and it turns on billing and promise mechanics rather than on theology.**  
*high confidence.* VERIFIED. FTC v. Access Resource Services / Psychic Readers Network ("Miss Cleo"), settled November 2002: ~$500 million in consumer charges forgiven plus $5 million paid to the FTC; ~6 million callers, ~$60 average charge; the deception was "free reading" advertising that routed to a $4.99/min 900 line. ftc.gov press release, Nov 2002.

## Recommendations

- **[S] Delete the three fabricated trust signals from the live site today, before anything else on this list. They are in /Users/sven/dev/snanify/src/lib/content.ts lines 28, 37, 41, 170, 174. Replace with a dated, honest line: "Not yet open. No rite has been performed. No permission is held."**  
  They are live right now on a public site with no product behind them. Under the UK's Digital Markets, Competition and Consumers Act 2024 the CMA has had direct fining power for unfair commercial practices since April 2025, and India's CCPA covers the same conduct. More practically: your entire strategy is "we never say anything we cannot prove", and the homepage currently says three things you cannot prove. One screenshot of that page next to your own ethics.md ends the trust story permanently. Your own design doc already flagged this as urgent and it was not done.
- **[M] Collapse to one ghat, one rite, one daily Samuhik session before writing a line of backend. Har Ki Pauri, Sankalp only. Do not build six ghats and eight rites.**  
  Break-even is 9.1 of 51 seats. Twenty-four sessions a day across six ghats at a realistic launch fill of 3 loses ₹5,235 per session, ~₹1.25 lakh per day, ~₹4.6 crore a year in ritual COGS alone before a rupee of salary. One session a day at one ghat has one fixed cost of ₹7,800/day and needs 9 orders to survive. That is a target you can actually hit, and it makes the permission problem a single negotiation instead of six.
- **[L] Get one written, signed, dated, renewable permission from Shri Ganga Sabha (or, if they refuse, from whichever body will), naming Snanify, covering paid rites and filming, before spending anything on product. Budget 9–18 months and a named human in Haridwar. Treat a refusal as a kill signal, not a delay.**  
  This is the only defensible asset in the business, and the site already tells the world you have zero of them at all six sites (src/content/rivers.ts:775, :1047). Sri Mandir's actual moat is 70+ temple partnerships, not software. Har Ki Pauri is governed by a 1914 sabha and hereditary teerth purohit families, not by the municipality; the Haseen Dillruba episode shows they retaliate retrospectively against filmmakers who embarrass them. Note the uncomfortable implication: your one moat is pure, slow, in-person human relationship work — the exact opposite of "as little human interaction as possible". If you are not willing to do that work, there is no business here.
- **[M] Resolve payments before product. Incorporate an Indian private limited entity, apply to Razorpay or Cashfree with a written, honest business description ("paid ritual services and video documentation", not "religious organisation"), request MCC 7299/7922 rather than 8661, and confirm in writing that your cross-border partner holds an RBI PA-CB-E licence. Get pre-approval in writing before launch, and stand up a second processor before you need it.**  
  Stripe's published India list prohibits "Religious organisations" and "Charities" outright. Razorpay's Schedule II prohibits merchants dealing in intangible goods/services and reserves the right to add categories without notice. Both are discretionary levers that get pulled after negative press, not before. Getting frozen at ₹40 lakh of collected-but-undelivered sankalps, on Kartik Purnima, with no second rail, is the single most likely way this dies quietly. The OPGSP workaround is closed — since the RBI's 31 Oct 2023 circular the cross-border rail must be licensed.
- **[S] Reprice the diaspora ladder upward or abandon paid acquisition entirely. $21 with a modelled $90 CAC needs 5.5 repeat purchases to pay back; your own ethics rules ban the death-anniversary automation that would drive repeat. Either the diaspora entry rite is $51–$108, or Vishwa Dar growth is organic-only for 24 months.**  
  This is the quietest killer in the model and the one nobody has priced. It is not a marketing problem you can optimise away — it is a structural mismatch between a $21 AOV, a once-or-twice-yearly occasion, and a self-imposed ban on the retention mechanic. Raising the price is also strategically coherent: at $21 you are competing on price with a company at ₹192 per puja and 40M downloads, which you lose. At $108 you are selling a different thing — proof — to a much smaller, much better audience.
- **[M] Get a written GST opinion, and file for an Advance Ruling, on the single question: does Snanify "conduct a religious ceremony" (exempt, Entry 13(a), Notif. 12/2017) or does it "facilitate" one (intermediary, IGST s.13(8)(b), 18% on export revenue, no zero-rating)? Structure the officiant contract to support the answer you want before you have revenue.**  
  The exposure is 18% of gross export revenue, retrospective, with 18% interest and penalty. On ₹6 crore of export revenue that is ₹1.08 crore plus interest — three years of profit removed by one assessment order. This is cheap to fix now (₹2–5 lakh of counsel and an Advance Ruling) and impossible to fix later. Structure matters: if the officiant is your contractor performing under your name, you conduct; if he is an independent purohit you introduce and take a cut from, you are an intermediary.
- **[S] Publish a standing, no-questions, no-timer refund policy on the ethics page, and honour it including after delivery. Add a per-order dispute reserve of 2% to the P&L permanently.**  
  You will never win a chargeback where the customer says "the rite did not feel real" — the deliverable is unfalsifiable in your favour. Mastercard ECM triggers at 100 chargebacks/month AND a 1.5% ratio; Visa's VAMP excessive merchant threshold drops to 1.5% for US/CA/EU on 1 April 2026 with an $8 per-dispute fee. Refunding on request keeps the ratio under the programme thresholds, and it is also the single strongest line in the reputational defence: "anyone who was unhappy got their money back, without being asked why."
- **[S] Drop Pitru Tarpan and Deva-Rishi-Pitru Tarpan from the launch catalog. Launch with Deep Daan, Nadi Puja and Sankalp only. Add tarpan back later, if at all, with a named traditional authority publicly endorsing the proxy form.**  
  Tarpan is the most culturally exposed item you sell. It carries adhikara rules — who may perform it, on which tithi, whether the karta must be present, fasting and in a state of ritual purity. A paid stranger doing tarpan for a living son who could have done it himself is precisely the thing a traditionalist calls a sham, and it is the quotable example in the hostile essay. Deep Daan at ₹101/$11 carries none of that: lighting a lamp on someone's behalf is uncontroversial in every sampradaya. Launching with the safe items costs you almost nothing and removes the sharpest attack surface during the period when you have the least credibility to defend it.
- **[M] Before building anything, sell 500 pre-orders at full price for one rite at one ghat, with a stated delivery date 90 days out and a full refund if it does not happen. Treat under 500 as a kill signal.**  
  Every risk in this document is survivable except the absence of demand at your price. 500 pre-orders proves the ₹905 blended AOV is real, proves the diaspora will pay 9.6x the Sri Mandir rate for proof, funds the first officiant and the permission work, and does it before you have a database, a payment integration or a Rite Ledger. If you cannot sell 500 pre-orders on a promise, you cannot sell 87,600 sankalps on a delivery.
- **[S] Cap the video retention promise. Change "kept permanently above the entry rate" to "kept for seven years, then downloadable on request for 30 days before deletion, with 90 days' notice by email."**  
  Permanent hosting is an unbounded liability against a single ₹501 payment. At 90,000 sankalps a year and even 300MB per recording that is 27TB a year, forever, compounding, against revenue that was recognised once. It is also a promise a small company cannot honour through an acquisition, a wind-down or a storage-provider failure — and breaking it is exactly the kind of quiet betrayal that produces the viral thread. Seven years is longer than any customer will need and is a promise you can actually keep.

## Risks

- The homepage is publishing fabricated statistics right now — "1,20,000+ Sankalps offered", "48 Countries served", a hardcoded "Live now" badge — while zero rites have been performed and zero permissions held. This is the most urgent item in this document and it is a fifteen-minute fix that has already been flagged once in your own ethics.md and not done.
- Break-even on a Samuhik session is 9.1 of 51 seats. Below that, every session loses money — ₹5,235 at a fill of 3. The 51-cap is a ceiling story; the 9-seat floor is the business.
- Modelled CAC of ~$90 against a $21 first order requires 5.5 repeat purchases to pay back, and your own ethics rules ban the automated death-anniversary campaign that is the only plausible repeat driver. Paid acquisition does not work at the current price ladder.
- Zero written permissions at six ghats, stated publicly on your own site. The governing bodies are trusts, sabhas, mela authorities, a Muzrai department and hereditary purohit families across five states — not one municipal counter. Realistically 9–18 months per site, and any one of them can say no.
- Stripe's published India list prohibits "Religious organisations" and "Charities" outright; Razorpay's Schedule II prohibits merchants dealing in intangible goods/services. Both are discretionary and both get invoked after bad press, not before. A payment freeze mid-Kartik with collected, undelivered sankalps is an extinction event.
- GST characterisation is binary and unresolved: exempt as "conduct of a religious ceremony" (no input credit), or intermediary under IGST s.13(8)(b) (18% on export revenue, retrospective, with interest). The second scenario removes roughly three years of profit in one assessment order.
- An FIR or temple-body complaint for cheating. The precedent is exact: Singhadwar Police wrote to the Puri temple administration over the Utsav app, which sold a ₹801 "Nama and Gotra Sankalpa" online. A single aggrieved samiti in Haridwar can produce the same outcome, and the news reaches your acquirer before it reaches you.
- Sri Mandir raised ₹175 crore in mid-2025 specifically to expand into Haridwar and Ujjain among 20+ temple towns. Two of your six ghats. They have 40M downloads, 3.5M MAU, 70+ existing temple relationships and can ship a name-timestamp feature in one sprint. The proof mechanism is a feature, not a moat.
- The only genuinely defensible asset — signed permission from a named ghat authority, plus the relationship with the officiant families that makes it renewable — is pure, slow, in-person human work. It is the direct opposite of the stated goal of minimal human interaction, and it cannot be automated at any price.
- The peak-revenue days are the least operable days. Maha Kumbh 2025 saw 30+ dead in a crowd crush on Mauni Amavasya, anti-drone systems shooting down UAVs, and documented mobile-network collapse on peak days despite 328 new towers. Charging a Kartik Purnima premium is charging more for the day you are least able to deliver.
- Pitru Tarpan is the catalog item most likely to be called a sham by a practising Hindu, because tarpan carries adhikara rules about who may perform it and whether a proxy is valid at all. It is also the item most likely to be bought by a grieving customer, which is exactly the combination that produces both the chargeback and the essay.
- EU/UK sankalp, gotra and ancestor-name data is Article 9 special-category data being transferred to a country with no adequacy decision. Compliance is achievable but not free, and getting it wrong turns a privacy footnote into the second paragraph of the hostile article.
- Officiant disintermediation and key-man risk. Har Ki Pauri purohit families already sell online puja bookings directly. Once you have proven the demand and built the funnel, the person actually holding the rite has every incentive and every relationship needed to cut you out.

---

## Snanify — what actually kills this

I was asked to be the person who says no. Here is the honest version.

Nothing in this document is a moral objection. The ethics architecture in `docs/design/ethics.md` is genuinely better than anything else in this category, and the refusal list in `src/content/rituals.ts` — no dosha remedies, no tripindi shraddha, no guaranteed outcomes, no urgency or guilt, no shipped prasad — closes off most of the legal exposure that has historically destroyed spiritual-services companies. That discipline is an asset. It is also not what kills you.

What kills you is arithmetic, access and acquisition cost. In that order.

---

## 0. The thing to fix today, before anything else

`https://www.snanify.com` is live right now displaying:

- **"1,20,000+ Sankalps offered"**
- **"48 Countries served"**
- **"Live now · Har Ki Pauri, Haridwar"**
- **"04:24 IST · Ganga, Haridwar · opens in 6h 12m"**

Source: `/Users/sven/dev/snanify/src/lib/content.ts` lines 28, 37, 41, 170, 174. I verified this by fetching the live site on 2026-08-11.

No rite has been performed. No permission is held at any ghat — your own `src/content/rivers.ts:775` says so in plain language. Your own `docs/design/ethics.md` already flagged these as an "urgent finding" that "must be removed before this architecture means anything," and they are still there.

This is not a rounding error in the messaging. It is:

1. A misleading commercial practice under the UK's Consumer Protection from Unfair Trading regime, now enforced by the CMA with direct fining power under the Digital Markets, Competition and Consumers Act 2024 since April 2025 — no court order required.
2. The same under India's Consumer Protection Act 2019 and the CCPA's misleading-advertisement guidelines.
3. And most damagingly: the perfect screenshot. Any journalist writing the hostile piece opens with your homepage claiming 120,000 sankalps next to your ethics page promising you will never say anything you cannot prove. That contrast is the whole article. It writes itself, and no amount of cryptographic proof-of-performance recovers from it, because the accusation is not "your rites are fake," it is "you lie when it's convenient."

Fifteen minutes of work. Do it first.

---

## 1. Ranked risk register

Probability is over the next 24 months assuming you proceed as currently designed. Severity is 1–5 where 5 = business ends.

| # | Risk | P | S | Score |
|---|---|---|---|---|
| 1 | No written ghat permission is ever granted at any named site | 0.75 | 5 | **3.75** |
| 2 | Shared sessions never reach the 9-seat break-even floor | 0.80 | 4 | **3.20** |
| 3 | Payment rails refuse onboarding or withdraw mid-operation | 0.60 | 5 | **3.00** |
| 4 | Paid acquisition mathematically cannot work at $21 AOV | 0.85 | 3 | **2.55** |
| 5 | Sri Mandir occupies Haridwar and Ujjain first, with proof feature | 0.60 | 3.5 | **2.10** |
| 6 | Live fabricated stats trigger regulator, journalist or acquirer | 0.45 | 4 | 1.80 |
| 7 | FIR / temple-body cheating complaint (Utsav precedent) | 0.30 | 5 | 1.50 |
| 8 | GST reassessed as intermediary: 18% on export revenue, retro | 0.35 | 4 | 1.40 |
| 9 | Officiant disintermediation / key-man loss | 0.50 | 2.5 | 1.25 |
| 10 | Peak-day operational failure with hundreds of paid sankalps | 0.35 | 3.5 | 1.23 |
| 11 | Chargeback programme breach (Visa VAMP / Mastercard ECM) | 0.30 | 4 | 1.20 |
| 12 | Cultural backlash concentrated on Pitru Tarpan | 0.35 | 2 | 0.70 |
| 13 | Recording lost / proof chain publicly broken | 0.20 | 3.5 | 0.70 |
| 14 | GDPR Art. 9 + India-transfer exposure | 0.25 | 3 | 0.75 |
| 15 | Advertising-claim enforcement (ASA / CCPA / FTC / DMR Act) | 0.25 | 3 | 0.75 |
| 16 | Anti-superstition acts (Maharashtra 2013, Karnataka 2017) | 0.05 | 2 | 0.10 |

Note what is at the bottom. The risks the founder is most likely to worry about — anti-superstition law, advertising regulators, GDPR — are the least dangerous. The risks at the top are boring: permission, fill rate, payments, CAC.

---

## 2. The top five, and what to do about them

### 2.1 Permission (score 3.75) — the only thing that is actually defensible, and the only thing you cannot automate

Your own site says it clearly at `src/content/rivers.ts:1047`: *"We do not hold written permission to perform or film a paid rite at this ghat. Nothing has been agreed, nothing applied for, nothing granted."* That honesty is admirable and it is also a statement that you have no business yet.

Who actually grants permission, by site:

- **Har Ki Pauri, Haridwar** — Shri Ganga Sabha, founded 1914 by Pt. Madan Mohan Malviya, controls the Brahmakund sanctum and the ghats. Not the municipality. It has demonstrated retrospective enforcement power: after *Haseen Dillruba* was shot near the Haridwar ghats, the Ganga Sabha objected to alcohol and non-vegetarian scenes and the Akhil Bharatiya Yuva Teerth Purohit Mahasabha warned that filmmakers would not be permitted to shoot in Haridwar again. It has also successfully forced the revocation of a government invitation on its own authority. This is a body that grants slowly and revokes fast.
- **Triveni Sangam, Prayagraj** — district administration plus, in mela years, the Prayagraj Mela Pradhikaran, which supersedes normal authority entirely.
- **Vishram Ghat, Mathura** — Mathura-Vrindavan Development Authority and the Braj Teerth Vikas Parishad, plus the Vishram Ghat purohit families.
- **Ram Kund, Nashik** — Nashik Municipal Corporation plus the Panchavati purohit sangh; Simhastha authority in mela years.
- **Ram Ghat, Ujjain** — Ujjain Municipal Corporation, the Mahakaleshwar temple committee's writ over adjacent ritual space, and the Simhastha Mela authority.
- **Talakaveri** — Karnataka's Muzrai department (Hindu Religious Institutions and Charitable Endowments), a state government department with its own procedure.

On top of every one of those, commercial filming requires a national permit through India Cine Hub (the Ministry of I&B single-window portal that replaced the Film Facilitation Office), roughly USD 225 to apply and around three weeks to process — and the portal itself states the national approval is "an umbrella" that does not replace state, municipal and location permits. Karnataka's single-window example carries a ₹15,000 departmental fee. Assume ₹50,000–₹3,00,000 per site in fees, facilitation and legal, and 9–18 months of elapsed time per site, most of it spent building a relationship rather than filing a form.

**The uncomfortable implication.** The founder's stated goal is "as little human interaction as possible." But the only asset in this business that a competitor cannot replicate is a signed agreement with a 1914 sabha and a working relationship with hereditary purohit families. Sri Mandir's real moat is not software — it is 70+ temple partnerships, and it just raised ₹175 crore explicitly to get to 500. Software is copyable in a sprint. A relationship with the Ganga Sabha is not.

So: **the only defensible thing about Snanify is the most human-intensive, least automatable, slowest part of it.** That is the central strategic contradiction of the whole plan, and no amount of clever architecture resolves it. Either someone spends a year in Haridwar drinking tea, or there is no company.

*Mitigation:* One ghat. One relationship. One signed, dated, renewable written permission naming Snanify and covering paid rites and filming. Budget 12 months and a named person on the ground. Treat a refusal from Shri Ganga Sabha as a kill signal for the Ganga product, not as a reason to try a different ghat first — if the most institutionally organised body says no, the others will too, and you will have learned it cheaply.

### 2.2 Fill rate (score 3.20) — the 51-cap is a ceiling story, the 9-seat floor is the business

Full arithmetic is in the numbers field. The short version:

- Full Samuhik session (51 seats): **78% contribution margin**. The engine works.
- Break-even: **9.1 of 51 seats**.
- At a launch-realistic fill of 3: **−₹5,235 per session**.

The design as it stands fans out to 6 ghats × 8 rites × 2 tiers = 96 session types before muhurat premiums. Even a restrained launch of 4 rites at 6 ghats, Samuhik only, daily, is 24 sessions a day. To average 10 seats you need **240 paid orders every single day**, which is 87,600 orders a year — the volume of a company already doing ~₹8 crore. **You need destination scale to survive the launch.** That is the definition of a business that cannot start.

This is not a marketing problem. It is a structural consequence of offering choice. Every axis of choice you add — another ghat, another rite, another tier, another muhurat slot — divides the same demand into more sessions, and each session carries the same ₹7,800 fixed cost. Choice is the enemy of the pooling mechanic that makes the model work.

*Mitigation:* Launch with **one ghat, one rite, one session per day**. Har Ki Pauri, Sankalp at ₹501/$21. One fixed cost of ₹7,800 a day. Nine orders a day to survive. Add a second rite only when the first session is reliably above 30 of 51. Publish the fill count live — "38 of 51 sankalps in tomorrow's session" is honest scarcity, it is not the fake scarcity your ethics page bans, and it is the single best conversion mechanic you have.

### 2.3 Payments (score 3.00) — you can be shut off by a policy you did not know applied to you

The verified facts:

- **Stripe's published India list prohibits "Religious organisations" and "Charities"** outright, in the jurisdiction-specific prohibited section. Snanify is a for-profit services company, not a religious organisation — but that distinction is made by an onboarding analyst reading your homepage, which currently says "Live now · Har Ki Pauri" above a Ganga aarti.
- **Razorpay's Schedule II** prohibits "Merchants who deal in intangible goods/services" and reserves the right to add categories "without any prior intimation to you." Note what Razorpay does *not* prohibit: astrology, spirituality and religion are absent. Astrotalk does ₹1,176 crore of revenue in India on ordinary rails. So the category is workable — the exposure is the intangible-goods clause plus pure acquirer discretion.
- **Cross-border collection now requires a licensed partner.** The RBI's 31 October 2023 circular created the PA-CB category (export-only, import-only, or both), with ₹15 crore net worth at application rising to ₹25 crore by 31 March 2026, a ₹25 lakh per-unit transaction cap, and an April 2024 deadline for legacy OPGSPs to apply. Cashfree obtained a PA-CB licence in July 2024. The old informal routes are closed.

The realistic failure mode is not rejection at signup. It is **withdrawal at the worst moment**: you have collected 400 sankalps for Kartik Purnima, a local news story runs about "app sells punya to NRIs," your acquirer's risk team reads it, and your settlement is held for 180 days while you owe 400 people a rite you cannot now fund.

*Mitigation:* Indian private limited entity. Apply with an honest, unromantic business description — "paid ritual services and video documentation" — and request MCC 7299 or 7922, not 8661. Get the acquirer's written acknowledgement of what you do, so a later journalist cannot be the first time they hear it. Stand up a second processor before you need one. Keep 90 days of delivery obligation in cash outside the processor.

### 2.4 Acquisition cost (score 2.55) — the quietest killer

Modelled CAC of **~$90** (CPM $18, CTR 1%, LP conversion 2% — ASSUMPTION, but standard benchmarks) against a **$21** first order yielding **$16.40** of contribution at full session. That is **5.5 repeat purchases to pay back one acquisition**.

And you have banned the retention mechanic. Your ethics page — correctly — forbids automated death-anniversary campaigns, which is the one thing that would reliably drive repeat purchase in this category. You have made the honest choice and it has a price, and the price is that paid acquisition does not close.

I am not asking you to reverse that ban. I am pointing out that it forces one of three things:

1. **Reprice.** Diaspora entry at $51–$108 rather than $21. CAC/contribution falls to ~2.2 orders. This is also strategically correct: at $21 you are fighting a price war against a company at ~₹192 per puja with 40 million downloads, which you lose. At $108 you are selling something else — proof, permanence, a verifiable record — to a smaller and better-qualified audience who will pay for exactly that.
2. **Organic only.** SEO, referral, community. 24–36 months, no paid budget, and you are competing for the same queries as an incumbent with a four-year head start.
3. **Ekantik-first.** Sell the household session at high AOV, and treat Samuhik as an honest, cheap entry that loses money on purpose.

The current plan implicitly assumes Samuhik is both the volume engine and the profit engine. It cannot be both at $21.

### 2.5 Competition (score 2.10) — the proof mechanism is a feature, not a moat

Verified: AppsForBharat (Sri Mandir) raised **₹175 crore / ~USD 20M Series C** led by Susquehanna Asia VC in mid-2025, with Fundamentum, Elevation Capital and Peak XV participating. FY25 revenue **over ₹100 crore** on **5.2 million online pujas** across **70+ temples**, **40M+ downloads**, **~3.5M MAU**, and **20% of demand from the diaspora**. The stated use of the capital: scale to 20+ temple towns including Varanasi, Ayodhya, **Ujjain and Haridwar**, and grow to 500 temple partnerships.

They are coming to two of your six ghats, with capital raised for exactly that, while you hold zero permissions.

Now be honest about what is copyable:

| Snanify asset | Time for Sri Mandir to copy |
|---|---|
| Deep link to the second your name is spoken | one sprint |
| Sankalp commitment hash | one sprint |
| On-camera slate with a daily public anchor | one sprint |
| Public append-only Rite Ledger | one quarter |
| Unedited continuous take policy | a policy memo |
| Two published price ladders | an afternoon |
| **Written permission at Har Ki Pauri** | **not copyable — but they may get their own** |
| **The refusal list** | **copyable, but they won't — it costs them revenue** |

Two things are genuinely defensible, and only two.

**The refusals.** Sri Mandir at ₹100 crore of revenue will not stop selling kaal sarp dosh nivaran, tripindi shraddha and shipped prasad, because those are the high-margin items. Your refusal list is a real differentiator precisely because it is expensive. It is a positioning moat, not a technical one, and it only works if you are loud about it.

**The relationship.** Not the permission document — the renewable, human relationship behind it. Which brings us back to 2.1.

Everything else in the architecture is craft. Craft is worth building, it is just not worth defending in a strategy memo.

---

## 3. Legal and regulatory, in detail

### Can a company sell religious services across borders?

Yes. There is no prohibition anywhere relevant on selling a ritual service internationally. The friction is entirely in the plumbing: payment acceptance, tax characterisation, and advertising claims. Nobody is going to stop you on the grounds that the thing you are selling is religious.

### GST — the two-sided trap

**Entry 13(a) of Notification 12/2017-Central Tax (Rate)** exempts *"services by a person by way of conduct of any religious ceremony."* Critically, the 12AA charitable-registration condition attaches only to Entry 13(b) (renting of religious precincts), not to 13(a). So a for-profit company conducting a religious ceremony has a genuine argument for exemption.

That is not straightforwardly good news:

- **If exempt:** no input tax credit. On ~₹2 crore of taxable inputs (cloud, streaming, agency, payment fees) that is **~₹36 lakh a year of unrecoverable GST** — a permanent 3.6% haircut on ₹10 crore of revenue.
- **If you are an intermediary:** IGST s.2(13) defines an intermediary as one who arranges or facilitates supply between two other persons. s.13(8)(b) then deems the place of supply to be the supplier's location — India — so your export revenue is **not zero-rated** and attracts 18% IGST. The Bombay High Court split on the constitutional validity of s.13(8)(b) in *Dharmendra M. Jani v. Union of India* (2021); the third judge, in April 2023, upheld it, confining its operation to the IGST Act. It is live law.

On ₹6 crore of export revenue that is **₹1.08 crore of IGST plus 18% interest plus penalty**, assessed retrospectively. Three years of profit in one order.

Which side you land on turns on contract structure, and you can choose it now. If the officiant is engaged by Snanify to perform under Snanify's direction and Snanify bears the performance risk, you conduct. If the officiant is an independent purohit whom you introduce and from whom you take a share, you facilitate — and you are an intermediary. **Draft the officiant agreement to support the answer you want before you have any revenue,** and get an Advance Ruling. This costs ₹2–5 lakh now and is unfixable later.

### FEMA and remittance

Straightforward, but with a hard edge. Export of services is zero-rated only if all five conditions hold together: supplier in India, recipient outside India, place of supply outside India, **payment received in convertible foreign exchange**, and the parties not establishments of one person. Requires GST registration and a valid LUT (Form RFD-11), refiled every financial year before 1 April. FIRC/BRC evidence per transaction. **If forex is not received within the 9-month FEMA window, you owe IGST plus 18% interest even with a valid LUT.**

At 50,000 small-ticket international orders a year this is a reconciliation burden, not a legal risk. Choose a PA-CB partner that issues consolidated FIRCs and files EDPMS automatically, and make it a selection criterion, not an afterthought.

### Consumer protection when the deliverable is spiritual

The asymmetry is the problem. The customer's complaint — "it did not feel real," "the priest mispronounced my father's name," "I did not feel anything" — is unfalsifiable in your favour and completely persuasive to an issuing bank, a small claims adjudicator, or a consumer forum.

- **India:** Consumer Protection Act 2019 plus the E-Commerce Rules 2020 require a named grievance officer, acknowledgement within 48 hours and resolution within one month. Deficiency-in-service claims are cheap for the complainant and slow for you. District consumer commissions have jurisdiction and are not sympathetic to platforms.
- **US:** FTC Act s.5 deception. The governing precedent is *FTC v. Access Resource Services / Psychic Readers Network* ("Miss Cleo"), settled November 2002 — approximately **$500 million in consumer charges forgiven plus $5 million to the FTC**, across roughly 6 million callers at ~$60 each. Note what the FTC actually attacked: not the psychic claims, but the *billing and promise mechanics* ("free reading" routing to a $4.99/min line). Your equivalent exposure is not theology — it is any gap between what the page promises and what the recording shows.
- **UK:** Consumer Protection from Unfair Trading Regulations 2008 (which replaced the Fraudulent Mediums Act 1951), now backstopped by the Digital Markets, Competition and Consumers Act 2024 — since April 2025 the CMA can fine directly for unfair commercial practices without going to court, up to 10% of global turnover. Note also that a "for entertainment purposes only" disclaimer is *not* a legal requirement and would not help you; what matters is whether the advertising is misleading.

*Mitigation:* a standing, no-questions, no-timer refund policy, honoured after delivery. It is cheaper than defending anything, it keeps you under the card-network thresholds, and it is the strongest possible line in the reputational defence: *anyone who was unhappy got their money back, and was never asked why.*

### Advertising rules on religious claims

- **UK:** CAP/ASA guidance on spiritual and psychic services is explicit — no efficacy claims, at all. The ASA's position is that efficacy of spiritual services cannot be substantiated in principle, so no evidence-gathering exercise rescues the claim. Testimonials do not substantiate. Marketers must not "exploit the credulity of naive or susceptible people." BCAP Section 15 governs faith and equivalent belief systems in broadcast. **Your published position — "we describe acts, we do not describe effects" — is already fully CAP-compliant.** This is a genuine strength; you should say so to counsel and stop worrying about it.
- **India:** the **Drugs and Magic Remedies (Objectionable Advertisements) Act 1954** defines a "magic remedy" to include *"a talisman, mantra, kavacha and any other charm of any kind which is alleged to possess miraculous powers"* and criminalises advertising one as efficacious for 54 scheduled conditions, plus conception, miscarriage, menstrual disorders and sexual capacity. This is a criminal statute, not a regulatory one. Your catalog's refusal list already blocks every trigger — no dosha remedies, no guaranteed pregnancy, no cure. **The residual risk is not the catalog; it is growth.** The moment someone writes an SEO page targeting "santan prapti puja online" or "shani sade sati remedy," you are inside the Act. Put the DMR Act's schedule into your copy-lint blocklist alongside the grief and guilt words. Same enforcement mechanism, same CI gate.
- **US:** FTC deception standard. Same conclusion — your published position is already compliant, provided the homepage stops claiming 120,000 sankalps.

### Anti-superstition statutes — smaller than it looks

The Maharashtra Act 2013 targets human sacrifice, black magic, claims of finger-surgery, and claims to change the sex of a foetus. The Karnataka Act 2017 targets fire-walking, jaw-piercing, *made-snana* (rolling over leftover food), and *betthale seve*. Both explicitly leave ordinary religious practice — puja, yatra, keertan, pradakshina — untouched. Relevant to you only at Ram Kund (Maharashtra) and Talakaveri (Karnataka), and only if the catalog ever adds a remedial rite. It will not, because you have banned them. **This is a 0.10 risk. Stop thinking about it.**

### Data protection

Sankalp text, gotra and ancestor names from EU/UK customers are **Article 9 special-category data** — they reveal religious belief directly. India has **no EU adequacy decision** as of early 2026; the EDPS declined a European Investment Bank request to transfer contact data to India in February 2024, and while that turned on the EIB's inadequate justification rather than a formal adequacy assessment, the practical position is unchanged. You need explicit Art. 9(2)(a) consent, Standard Contractual Clauses, and a transfer impact assessment for every EU/UK customer.

Secondary and under-appreciated: you will be **recording bystanders at a public ghat**. Indian law is permissive about filming in public. But you are then publishing that footage to European viewers via a deep link. Get written protocols on framing, and a documented takedown route for any identifiable person who objects. India's DPDP Act 2023 has no special category for religious data, so your Indian obligations are lighter than your European ones — build to the European standard and the Indian one is covered.

---

## 4. Reputational: the attack, who writes it, and the one incident that ends it

### How the attack starts

Not with a journalist. It starts with a customer, in a thread. Someone posts the Naam Kshan deep link and says *"my father's name is at 4:12, this is either beautiful or the saddest thing I've ever paid for and I genuinely cannot tell which."* It gets 4,000 upvotes. Then the pile-on arrives from two directions at once:

- **From the traditionalist right:** "This is commercialisation of dharma. A firm registered in Delhi is selling tarpan to people who cannot be bothered to come home. The purohits at Har Ki Pauri did not consent to being a content vertical." This is the more dangerous flank, because it can escalate to a physical objection at the ghat and to a complaint by a named samiti.
- **From the rationalist left:** "A startup is monetising diaspora guilt. ₹501 to have a stranger say your dead father's name into a phone." This one gets the mainstream pickup — The Ken, Newslaundry, Scroll, an FT or Rest of World feature.

You will be attacked simultaneously for taking religion too seriously and not seriously enough. There is no message that satisfies both, and attempting one produces mush.

### Why the ethics page does *not* protect you here

It protects you legally. It does not protect you narratively, because **nobody reads the ethics page in the article; they read the price next to the word "tarpan."** The screenshot that circulates is the checkout, not the disclaimer. Plan your defence around what a screenshot can carry.

### What makes it stick

One thing only: **a provable gap between a claim and reality.** Not a philosophical objection — objections are survivable and even good for traffic. What is fatal is a technical forensics thread:

- Two customers' recordings from different dates showing identical footage.
- A slate timestamp that does not match the file metadata.
- A "live" session that a viewer proves was pre-recorded.
- Anyone finding that the officiant read 51 names in 90 seconds from a phone.

Any one of those and it is over, permanently, because your entire positioning is "we can prove everything we claim."

**And this is exactly why the homepage stats are the highest-severity item in this document.** The forensics thread does not need a stream failure. It already has "1,20,000+ Sankalps offered" on a site where nothing has ever been sold. That is the provable gap, and it is live today.

### The single incident that ends this

**A named ghat authority publicly disowns you, and someone files an FIR for cheating.**

This is not hypothetical. The precedent is exact and recent: Singhadwar Police wrote to the Shree Jagannath Temple Administration seeking a report on alleged cheating of devotees by the online platform **Utsav** — a platform that sold, among other items, a **₹801 "Nama and Gotra Sankalpa."** That is your product, at a lower price, and it produced a police reference. SJTA separately filed a cyber complaint over paid-darshan sites and issued a public advisory that it "never accepts any donation/offerings from the Devotees for Online Puja." Jagannath Sena demonstrated at the Gundicha temple.

Now run that in Haridwar with the Ganga Sabha. Local press picks it up within a day. Your acquirer's risk team reads it before your legal counsel does. Settlement freezes. You owe 400 people a rite you can no longer fund. Refunds cannot be issued because the money is held. That is the death spiral, and it takes about eleven days.

The only prophylaxis is the written permission — because with it, the accusation dies in one sentence: *"Shri Ganga Sabha granted written permission on [date]; here it is."* Without it, you have nothing to say and the story runs for a week.

---

## 5. Operational failures

**Officiant does not show.** Fixed cost is already sunk (ghat fee, operator, connectivity). Your published promise — "we find another officiant at once, at no cost to you" — is an unbounded operational commitment made in writing. Fix it structurally, not heroically: contract **two** officiants per ghat with a retainer for the standby, and set a **single, published rescheduling policy** with an automatic full refund if the rite does not happen within 24 hours of the stated muhurat. Automatic, no request needed. Costs less than the support load of handling it case by case, and it converts a promise you might break into one you cannot.

**Stream fails on Kartik Purnima with 400 paid sankalps.** Separate three things that are currently conflated:

1. The **rite** — happened or did not.
2. The **live stream** — a convenience.
3. The **recording** — the actual deliverable, since Naam Kshan is a deep link into a recording, not a live moment.

If (1) and (3) hold and only (2) fails, you owe an apology and a partial credit, not a refund. If (3) fails, you owe a full refund on all 400 and a fresh rite at your cost. **Record locally to two cards on-site, independent of connectivity, always.** The stream is best-effort; the recording is the product. Say this in the terms before it happens, not after.

**Ghat authority objects mid-session.** Stop. Do not argue on camera. Do not stream the objection. Publish what happened within 24 hours, refund everyone affected in full, and do not resume at that site until it is resolved in writing. The one thing that turns a local objection into a national story is a video of a Snanify operator arguing with a purohit at Har Ki Pauri.

**Recording lost.** This is the reputational nuclear failure, not merely an operational one. Two cards on site, immediate upload to two providers in two jurisdictions, checksums published to the Rite Ledger before the customer is notified. And cap the retention promise — see below.

**The peak-day trap, which is the one most founders miss.** Your premium pricing (+$81/₹2,100 for Kumbh, +$31/₹751 for parva days) charges the most for the days you are *least* able to deliver. Verified from Maha Kumbh 2025: **30+ dead in a crowd crush on Mauni Amavasya**; a Supreme Court PIL on pilgrim safety; **anti-drone systems that intercepted and shot down two UAVs**; documented mobile-network failure on peak days despite 328 new towers, 575 new BTS and 78 cells-on-wheels deployed specifically for the event. On those days the ghat is a security zone, cameras attract police attention, and your uplink is competing with ten million phones.

Two honest options: cap peak-day volume hard at what one officiant can genuinely perform, or **decline to sell those days at all** and say publicly why — *"we do not sell Mauni Amavasya at the Sangam, because we cannot guarantee we can film it."* That refusal would be the single most credible thing on your website, and it would cost you your highest-margin day. That is the trade.

---

## 6. Cultural exposure, ranked by catalog item

Where a practising Hindu finds this offensive rather than useful:

| Rite | Exposure | Why |
|---|---|---|
| **Pitru Tarpan** (₹751 / $31) | **Highest** | Tarpan carries *adhikara* rules: who may perform it, on which tithi, whether the karta must be present, fasting, and ritually pure. Whether a paid proxy is valid at all is genuinely contested. A living son paying a stranger to do it is the quotable example in the hostile essay, and the buyer is grieving, which is also the highest chargeback profile. |
| **Deva-Rishi-Pitru Tarpan** | High | Same, compounded. |
| **Sankalpit Japa 10,008** ($251) | Medium-high | Japa is understood as accruing to the japakarta. Purchased japa on another's behalf is the closest thing in your catalog to selling merit — the exact thing your ethics page says you do not sell. The price makes it conspicuous. |
| **Abhishek** (₹751 / $31) | Medium | Depends heavily on whether it is to a murti and, if so, whose. |
| **Path** ($51) | Medium | Recitation on behalf of another is well-precedented and widely accepted. Low theological heat. |
| **Aarti Sankalp** (₹501 / $21) | Medium | Depends entirely on the arrangement with the aarti samiti, which your own catalog at line 476 admits is undocumented. |
| **Pratinidhi Snan** | Medium | Proxy bathing is the conceptual core of the product. Well-precedented, but it is the thing a sceptic will centre on. |
| **Nadi Puja** (₹751 / $31) | Low | River worship on behalf of another is uncontroversial. |
| **Deep Daan** (₹101 / $11) | **Lowest** | Lighting a lamp on someone's behalf is unobjectionable across every sampradaya. |

**Recommendation: launch with Deep Daan, Nadi Puja and Sankalp only.** Hold Pitru Tarpan back. Add it later, if at all, with a named traditional authority publicly endorsing the proxy form. You lose very little revenue in month one and you remove your sharpest attack surface during precisely the period when you have the least credibility to defend it.

There is also a structural cultural exposure worth naming: **the diaspora customer is the one who most wants this and the one whose family will most object to it.** The person buying a tarpan from New Jersey has a mother in Pune who will find out, and her opinion of it is not something you control. That dynamic caps word-of-mouth in exactly the segment where your CAC problem requires word-of-mouth to be strong.

---

## 7. Where I think the ethics line should move — and where it should not

You asked me to argue explicitly if I think the line should move.

**It should not move on the rite.** Every proposal to relax it — pre-recorded loops, batching without disclosure, a "representative" officiant — converts the single defensible asset into fraud. Not a slippery slope; a cliff. Hold it.

**Three promises should be tightened, and they are operational, not ethical:**

1. **"Kept permanently above the entry rate."** Unbounded storage liability against a one-time payment. At 90,000 sankalps a year and 300MB each that is 27TB a year, compounding, forever, against revenue recognised once. Worse: it is a promise a small company cannot honour through an acquisition, a wind-down or a provider failure — and breaking it quietly is exactly the kind of betrayal that produces the viral thread. **Change to seven years, then downloadable on request for 30 days before deletion, with 90 days' email notice.** Longer than any customer needs. Keepable.

2. **"We find another officiant at once, at no cost to you."** Replace the heroic promise with a structural one: two contracted officiants per ghat, plus an automatic full refund if the rite does not occur within 24 hours of the stated muhurat. Automatic beats heroic.

3. **Peak days.** Either cap volume at what one officiant can honestly perform, or refuse to sell the highest-risk days and say why.

**And one thing you should keep despite the cost:** the refusal list. No dosha remedies, no tripindi shraddha, no shipped prasad, no forwarded charity. It is the only positioning moat you have, and every rupee it costs you is a rupee that makes it harder to copy. Sri Mandir at ₹100 crore will not give up kaal sarp dosh. That is your differentiation and it is worth more than the revenue.

---

## 8. Should this be built?

**Not as designed. Yes as something one-tenth the size.**

The current plan — six ghats, eight rites, two price ladders, two languages, global launch, a public cryptographic ledger, permanent video retention — is a series-A company's surface area attached to a business with zero permissions, zero revenue, zero rites performed, and a homepage claiming 120,000 of them. The surface area is what kills it: it fragments the demand that the 51-cap needs to pool, it multiplies the permission problem by six, and it demands a scale you cannot reach from a standing start.

The version that could work is small and boring:

**One ghat. One rite. One session a day. One written permission. One officiant plus a standby. Diaspora-priced. Refund anyone who asks.**

That version needs ~9 orders a day to break even and ~30 a day to be a real business. It is achievable. It is also almost entirely a business-development problem in Haridwar rather than a software problem — which is the part the founder will like least, and which is exactly why it is defensible.

### What would have to be true

Six things, in order. Each is a gate. Fail one, stop.

1. **Shri Ganga Sabha (or an equivalent body at one ghat) signs a written, dated, renewable permission naming Snanify, covering paid rites and filming.** No permission, no business. Nothing else on this list matters until this is true, and it is the slowest item, so start it this month.
2. **500 pre-orders at full price for one rite at one ghat**, on a promise, with a 90-day delivery date and a full refund if it does not happen. If you cannot sell 500 on a promise you cannot sell 87,600 on a delivery.
3. **A payment path in writing before launch**: Indian entity, an acquirer that has seen an honest description of the business and said yes, a PA-CB-licensed cross-border partner, an MCC that is not 8661, and a second processor on standby.
4. **A GST position in writing**, ideally an Advance Ruling, on conduct-versus-facilitate — and an officiant contract drafted to support it.
5. **Unit economics that survive an honest fill assumption.** Model at 12 seats of 51, not 51. If it does not work at 12, it does not work.
6. **Willingness to be attacked from both flanks and change nothing.** The traditionalist and the rationalist will both come. If the response to either is to soften the copy, the positioning collapses and with it the only thing that made the premium defensible.

### And the honest summary

You have built the best ethical architecture in this category and attached it to a business whose only moat requires exactly the human, slow, in-person work you said you wanted to avoid. The automation goal is achievable for ordering, scheduling, payment, delivery, verification and support — genuinely, and the design already gets most of the way there. It is not achievable for the two things that determine whether the company exists: **getting permission, and keeping it.**

If you are willing to spend a year on those two things, build it small. If you are not, do not build it at all — and take the fabricated statistics down either way, today.

---

## Adversarial review

**Verdict:** needs-work

### Wrong or unverified

- DEAD LAW — the headline tax tail risk is based on a repealed provision. §5 Scenario B and recommendation #6 rest on IGST s.13(8)(b) deeming intermediary place of supply to be India. That clause was OMITTED by the Finance Act 2026 (s.157), which received Presidential assent on 30 March 2026 and, absent a separate commencement date, took effect immediately under the General Clauses Act 1897. Place of supply for intermediary services is now the recipient's location under s.13(2), so export benefits apply. Today is 11 August 2026. Dharmendra M. Jani is now of historical interest only; the omission is prospective, and Snanify has zero revenue history, so its retrospective exposure is literally nil. The '₹1.08 cr, three years of profit removed by one assessment order' is a phantom. Sources: grantthornton.in/insights/articles/gst-on-intermediary-services/, lakshmisri.com, thetaxtalk.com, a2ztaxcorp.net. The finding is graded 'confidence: medium' on the wrong axis — the law was checked as of the wrong year, not the characterisation.
- WRONG SKU — every number in §1 is built on a price that does not exist. The analysis states the entry rite is 'Sankalp' at $21/₹501. There is no SKU named Sankalp in src/content/rituals.ts. $21/₹501 belongs to Pitru Tarpan (rite 01, line 351-354) and Aarti Sankalp (rite 05, line 461-462). 'Sankalp' at line 266 is an inclusion in every rite, not a purchasable item. The actual entry price is Deep Daan at $11/₹101 (lines 387-390). Rerun the blended AOV on the real entry SKU: 0.30 × $11 × 88 + 0.70 × ₹101 = ₹290 + ₹71 = ₹361; contribution ₹341; break-even = 7,800 ÷ 341 = 22.9 of 51 seats, not 9.1. The headline break-even is off by 2.5x in the direction that flatters the business, and it is presented as the single fact that kills it.
- SELF-CONTRADICTORY RECOMMENDATIONS — #8 destroys #2. Recommendation #8 says drop Pitru Tarpan (₹501) and launch with Deep Daan (₹101), Nadi Puja (₹751) and 'Sankalp' (not a SKU). Recommendation #2 says break-even is 9 of 51 seats. Centring the ₹101 SKU raises break-even fill to ~23 of 51 — 45% occupancy — which §1 itself argues is unreachable at launch. The two recommendations were never run against each other. Pick one: the safe catalog or the survivable one.
- SEQUENCING CONTRADICTION THAT BREACHES THE ETHICS PAGE — #3 says get written ghat permission before spending anything and treat refusal as a kill signal. #9 says sell 500 pre-orders at full price with a 90-day delivery date before building anything. Run in the order written, that is collecting ~₹4.5 lakh for rites at a ghat where src/content/rivers.ts:1047 says on the live site 'nothing has been agreed, nothing applied for, nothing granted.' That is not a validation test; it is exactly the conduct behind the Singhadwar Police reference the document itself cites as a cautionary case. Either the pre-order gate comes after a signed permission, or it must be sold explicitly as a refundable deposit against a rite that may never be permitted — and the analysis says neither.
- STORAGE LIABILITY OVERSTATED ~20x — recommendation #10 computes '90,000 sankalps a year at 300MB per recording = 27TB a year, forever.' Wrong denominator. Samuhik produces ONE recording per session, not one per sankalp; the Naam Kshan is a deep link into a shared file. At the analysis's own average fill of 20, 90,000 sankalps = ~4,500 sessions. Even at 1GB per session that is 4.5TB/year, roughly $50–$100/year in S3 Glacier Deep Archive for that vintage. 'Unbounded liability against a single ₹501 payment' is rhetoric, not arithmetic. Worse, the fix is already in the repo: docs/design/ethics.md:272 already specifies WORM Object Lock with 7-year retention. The recommendation reinvents an existing design decision on a false cost basis.
- COMPETITOR BENCHMARK IS A RUN-RATE, NOT A REVENUE, AND THE DENOMINATOR IS MIXED — '>₹100 crore revenue on 5.2 million online pujas → ₹192 per puja' is graded VERIFIED. The ₹100 cr is a founder-quoted revenue RATE. Inc42, reading the RoC filings, puts FY25 audited operating revenue at ₹69.6 cr (up 3.8x from ₹18.5 cr) with a net loss of ₹45 cr. The 5.2M figure is 'pujas AND offerings' (chadhava), and revenue also includes prasad delivery. So the numerator is inflated and the denominator is padded, and the derived '₹192 market-clearing price' is not a price of anything. Every multiple built on it — '2.6x', '9.6x' — is unsound. Sri Mandir's actual individual puja SKUs are laddered, and the analysis never fetched a single one.
- THE OMITTED FACT THAT INVERTS §3 — AppsForBharat lost ₹45 crore on ₹69.6 crore of FY25 revenue (Inc42, from RoC filings). The best-funded incumbent is burning ~65% of revenue at the very price point the analysis calls 'market-clearing' and tells Snanify it cannot beat. That is not a price floor you must undercut; it is evidence that nobody has yet found a profitable price in this category. Presenting the incumbent's price as a constraint while suppressing its loss is the single most misleading omission in the document.
- '5.5 REPEAT PURCHASES' IS 4.5 — $90 ÷ $16.40 = 5.49 TOTAL purchases to pay back, of which 4.5 are repeats. Stated as '5.5 repeat purchases' twice, in §2 and in recommendation #5.
- MARGIN CONFLATION IN THE CAC MODEL — §2 applies 78% contribution to a single $21 order. 78% is the AVERAGE margin at a full 51-seat session, i.e. it already absorbs allocated fixed cost. The correct figure for an incremental order into a session that is running anyway is the 94.5% variable margin ($19.85). Using the average understates contribution by ~17%. It happens to be conservative, but it is the wrong number and it is used as the basis of a repricing recommendation.
- THE REPRICE HOLDS CONVERSION CONSTANT ACROSS A 5x PRICE INCREASE — recommendation #5 moves the diaspora entry rite from $21 to $51–$108 and recomputes the payback ratio while leaving the 2.0% landing-page conversion untouched. Price elasticity on a cold-traffic, first-purchase, unknown-brand devotional service is not zero. If CVR halves at $108, CAC doubles to $180 and the ratio is unchanged. The recommendation is arithmetic performed on one variable of a two-variable system. Also, the '~2.2 orders' figure corresponds only to the $51 end of the stated range; at $108 it is 1.07.
- 'THE ONLY MECHANISM TO DRIVE REPEAT IS BANNED' IS FALSE — the ethics commitment bans automated death-anniversary campaigns. It does not ban user-initiated annual recurrence. rituals.ts:604 already references an 'annual vessel' with the brahma-muhurat premium waived on it, i.e. a subscription product is already in the catalog. An opt-in annual sankalp that the customer sets themselves is fully compliant with the published ethics and is a standard retention mechanic. §2's claim that the ban structurally forecloses repeat purchase is wrong, and it is load-bearing for the whole 'quietest killer' framing.
- LEGAL OVERREACH ON THE FABRICATED STATS — 'this is, today, an actionable misleading commercial practice in the UK and India.' The DMCC Act 2024 unfair-commercial-practices regime and the CMA's direct fining power did commence 6 April 2025 (verified: Baker Botts, Cooley, Reed Smith), and fines reach 10% of global turnover. But the site sells nothing, transacts with nobody, and has no UK entity or UK nexus; 10% of zero turnover is zero. India's CCPA misleading-advertisement powers likewise attach to goods or services actually offered. The reputational argument for deleting the stats is unanswerable and the recommendation is correct — the enforcement framing is inflated and weakens it.
- LINE REFERENCES ARE PARTLY WRONG IN AN INSTRUCTION THE OWNER IS TOLD TO EXECUTE TODAY — cited as src/lib/content.ts lines 28, 37, 41, 170, 174. Actual: line 28 (EN 'Live now' badge), 33-38 (EN hardcoded muhurat card, '04:24 IST', 'opens in 6h 12m'), 41 ('1,20,000+'), 43 ('48'), 161 (HI badge), 166-171 (HI muhurat card), 174 ('1,20,000+'), 176 ('48'). Lines 37 and 170 as cited do not hold what is claimed, and the Hindi 48-countries string at 176 is missing from the list entirely. Someone deleting exactly the cited lines leaves fabricated content live in Hindi.
- STRIPE FINDING IS ACCURATE BUT THE INFERENCE IS NOT — verified by direct fetch: Stripe's India jurisdiction-specific list does name 'Charities', 'Non-profit organisations (NPO)' and 'Religious organisations'. Snanify is none of those. It is a for-profit private limited company selling a documented service. The real exposure is underwriter discretion and MCC assignment, which the finding itself concedes. Recommendation #4 then reasserts 'Stripe's published India list prohibits Religious organisations outright' as though it were a determination about Snanify. It is not.
- 'THE ONLY DEFENSIBLE ASSET' ASSUMES EXCLUSIVITY THAT IS NEVER ESTABLISHED — nothing in the Shri Ganga Sabha evidence suggests a permission would be exclusive, and Sri Mandir's 70+ temple partnerships are not exclusive either. A non-exclusive permission at a public ghat is a licence to operate, not a moat. The word 'moat' is doing work the evidence does not support.

### Missing

- THE CATALOG HAS NO EKANTIK PRICE, AND THE ANALYSIS NEVER NOTICED. The brief's core structural claim is that the price axis is HOW the rite is held, Samuhik vs Ekantik. src/content/rituals.ts publishes ONE price per rite with a `vessel` field reading 'Samuhik or Ekantik' (lines 356, 392, 417, 438). There is no Ekantik premium anywhere in the price table — the premiums block (lines 597-625) prices brahma muhurat, parva days, Kumbh and extra names, and nothing else. So a published Ekantik Pitru Tarpan costs ₹501 and consumes an entire dedicated session at the analysis's own ₹7,800 fixed cost: a ₹7,300 loss per order. This is a live, published, catastrophic pricing defect in the exact axis the business model is built on. The analysis models Samuhik only, asserts 'the current design says Samuhik is the engine', and then recommends an 'Ekantik-first high-AOV' pivot — without ever checking that there is no Ekantik price to pivot to.
- THE 51-SEAT CAP IS BOUNDED BY READING TIME, NOT BY THE CAP, WHICH MEANS MARGINAL COST IS NOT NEAR ZERO. Pitru Tarpan is published at 'about 12 minutes' (line 355). A premium at line 620 sells 'each name beyond your tier's count, to a maximum of 21 in a shared session' at +₹251. At full fill that is 51 sankalps carrying up to 1,071 individual named ancestors, each read with relationship and year, inside a 12-minute rite. At a generous 10 seconds per name that is nearly three hours. The entire unit-economics engine — 'marginal cost per additional order in a shared session is close to zero' — is false: officiant time scales close to linearly with fill, so fixed cost is not fixed and the 78%-at-51 figure is unreachable at the published durations. Your own docs/design/ethics.md:862 already assumes 'sankalp density of 11 per segment', not 51. The analysis took the 51 cap at face value and built its entire model on it.
- SANKALPIT JAPA IS UNSALVAGEABLE AND UNEXAMINED. $51/₹1,100 buys '1,008 repetitions, about 3 hours', Ekantik only, with an unbroken recording. The 10,008 variant is $251/₹5,100 for 'about 30 hours of recitation, across several days'. That is ₹170 per officiant-hour on the variant, before streaming, storage and the ghat fee, for a rite that by construction cannot share a session. Every unit sold loses money at any volume. The analysis reviewed session fill and never once checked labour intensity per SKU.
- SEASONALITY IS THE REAL FILL PROBLEM AND IT IS ABSENT. Demand for tarpan, deep daan and snan is violently concentrated: Pitru Paksha, Kartik Purnima, amavasyas, Ganga Dussehra, Makar Sankranti. The analysis models daily sessions at a flat average fill of 3 or 10, which is the wrong shape entirely. The real problem is that you need officiant and bandwidth capacity sized for the peak day and idle for ~340 days, and that the days you can actually fill 51 seats are precisely the days ghat access is contested and priced at +₹751. Averages hide this completely.
- MINIMUM-QUORUM SCHEDULING DISSOLVES THE HEADLINE RISK AND IS NEVER CONSIDERED. 'Every session below 9 paying sankalps destroys cash, and the SKU design guarantees most sessions will be below 9' treats the schedule as an obligation. It is not. Confirm-at-quorum — the session runs only when N seats sell, otherwise seats roll to the next muhurat or refund automatically — makes the loss-making session structurally impossible, is fully automatable, and fits the owner's low-human-interaction goal. It costs some conversion and needs honest copy about it. The document's #1 quantified kill risk has a well-known operational answer that goes unmentioned.
- AARTI SANKALP IS THE ONLY SKU WITH NEAR-ZERO MARGINAL COST AND IT IS NEVER IDENTIFIED. Line 470: 'an aarti that would have happened whether or not you booked.' No dedicated officiant session, no dedicated ghat booking, the ₹7,800 fixed-cost model simply does not apply. It is a ₹501/$21 SKU riding an event that occurs nightly at every one of the six ghats. It is also the lowest-permission-friction item because you are not staging anything. The analysis applies one uniform session cost across a catalog where the cost structures differ by an order of magnitude.
- OFFICIANT SUPPLY, VETTING AND QA — the single largest human cost in the loop, entirely unpriced. The ethics architecture mandates published pay formulas, itemised 'what we verified / what we did not' credentials, and an officiant's right to refuse a sankalp without penalty (docs/design/ethics.md). Recruiting, verifying, contracting, paying and covering absence for ritviks across six ghats in five states is recurring human work that scales with sites, not with orders. It is also the direct contradiction of 'as little human interaction as possible' — and it is a bigger one than the permission negotiation the analysis does flag.
- WHO VERIFIES THAT THE NAME WAS ACTUALLY SPOKEN? The Naam Kshan is THE product — a deep link to the exact second a specific name is uttered. Producing that index at scale requires either a human listening to every session or ASR on Sanskritised proper nouns and gotra names in accented Hindi, which is where speech recognition is weakest. A wrong or empty Naam Kshan is a falsifiable failure of the one claim the ethics page stakes everything on, and it is the most likely source of both refunds and the viral thread. The catalog already promises free re-issue 'after a mispronunciation' (line ~636), so the failure mode is anticipated in the copy and costed nowhere. Zero mentions in the analysis.
- BASE-RATE OPERATIONAL FAILURE, NOT GRIEF, WILL DRIVE THE DISPUTE RATE. §4 attributes a 1–2% dispute band to the product being grief-adjacent and intangible. The likelier driver is ordinary non-delivery: monsoon flooding at Har Ki Pauri and Ram Kund, ghat closure, police restriction, officiant illness, and mobile-network failure — the last of which the analysis itself documents at Maha Kumbh but only in the crowd-safety context. You need a published degraded/not-performed state (ethics.md already defines one for the Rite Ledger), an automatic refund trigger, and a modelled non-delivery rate. None of that reaches the P&L.
- PUBLIC VERIFICATION vs PRIVACY. There is a /verify page and a permanent public Rite Ledger. The design solves this well — the ledger holds fingerprints only, no name, gotra or sankalp (trust.ts:149, 282) — but the Sankalp Patra itself carries the name, and a permanent deep link into a recording where a name and gotra are spoken aloud is a durable public disclosure of religious affiliation and family lineage. The analysis raises GDPR Art. 9 for the transfer of data to India and misses the far larger exposure, which is the deliberate publication of it. Worth noting the repo already handles this better than the analysis credits (trust.ts:267, ethics.md:892).
- FCRA. Not mentioned once. If any part of the offering is ever characterised as a donation or offering to a religious institution rather than a fee for a documented service — and the cited Jagannath advisory shows administrations reaching for exactly that framing — foreign receipts move toward Foreign Contribution (Regulation) Act 2010 territory. A for-profit selling services is very likely outside it, but the mischaracterisation risk sits next to the intermediary-vs-performer question and should be answered by the same contract structure and the same advance ruling.
- STREAMING PLATFORM AND IT RULES 2021. The whole product is a live stream. Platform terms (YouTube/Vimeo), takedowns, and India's IT (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021 obligations for streamed content are unaddressed. A platform strike on a Kartik Purnima stream is a same-day total outage of the deliverable.
- NO SENSITIVITY ANALYSIS ON THE ONE NUMBER EVERYTHING DEPENDS ON. ₹7,800 fixed cost per session is entirely assumed — rituals.ts:340 says on the live site that nothing has been costed against ritvik rates, ghat fees, streaming or payment charges. At ₹4,000 break-even is 4.7 seats; at ₹12,000 it is 14. The document's headline number swings by 3x across a plausible range and no range is ever shown.
- MASTERCARD ECM REQUIRES TWO CONSECUTIVE MONTHS ABOVE BOTH TRIGGERS, AND VAMP COUNTS TC40 FRAUD REPORTS, NOT JUST DISPUTES. Both verified. The 100-chargebacks-and-1.5% ECM threshold is correct as stated (the old 100-and-1.0% CMM tier was retired in April 2020), and the VAMP figures are correct — 1.5% merchant Excessive from 1 April 2026, $8 per transaction, no warning tier — but the analysis omits that it also applies to APAC (CEMEA stays 2.2%) and that the VAMP ratio blends TC40 fraud reports with TC15 disputes. That last point matters for recommendation #7: proactive refunds suppress TC15 chargebacks but do not erase TC40 fraud reports, so 'refunding on request keeps the ratio under the programme thresholds' is only two-thirds true.

### Must survive

- THE FABRICATED TRUST SIGNALS FINDING. Verified independently in the repo: src/lib/content.ts line 28 ('Live now · Har Ki Pauri, Haridwar'), lines 33-38 (hardcoded '04:24 IST' muhurat and 'opens in 6h 12m' countdown), line 41 ('1,20,000+ Sankalps offered'), line 43 ('48 Countries served'), and the Hindi mirrors at 161, 166-171, 174, 176. docs/design/ethics.md:8 flags these verbatim as an 'urgent finding' that 'must be removed before this architecture means anything', and they are still there. Making this recommendation #1 with effort S is correct, and the reasoning — one screenshot of the homepage next to your own ethics.md ends the trust story — is the right argument even after the legal framing is stripped out. This alone justifies the review.
- THE OBSERVATION THAT THE ONE MOAT IS PURE HUMAN RELATIONSHIP WORK. 'Your one moat is slow, in-person human relationship work — the exact opposite of "as little human interaction as possible". If you are not willing to do that work, there is no business here.' That is the sharpest sentence in the document and it is correct. It names the actual contradiction between the owner's stated goal and the shape of the business, which no amount of automation resolves.
- COLLAPSE TO ONE GHAT, ONE RITE, ONE SESSION BEFORE BUILDING BACKEND (rec #2). Right conclusion, and it survives all the arithmetic corrections above — indeed the corrected break-even of ~23 seats on the entry SKU makes it more urgent, not less. It also turns the permission problem from six negotiations into one.
- GET WRITTEN PERMISSION FIRST, TREAT REFUSAL AS A KILL SIGNAL (rec #3). Correct sequencing and correctly identifies Shri Ganga Sabha rather than the municipality as the counterparty. The Haseen Dillruba precedent is apposite: it shows retrospective retaliation, which is the failure mode that matters for a business that will have collected money before it discovers the problem. The site already says it holds nothing at any of the six sites (rivers.ts:775, :1047), which is both admirable and a public statement that a competitor or journalist can quote.
- RESOLVE PAYMENTS BEFORE PRODUCT (rec #4). The specific mechanics are right and well-researched: request MCC 7299/7922 rather than 8661, get written pre-approval, stand up a second processor before you need it. The RBI PA-CB regime is correctly stated — the 31 Oct 2023 circular, PA-CB-E/I/E&I categories, ₹15 cr net worth rising to ₹25 cr by 31 March 2026, OPGSP applications due 30 April 2024, ₹25 lakh per-transaction cap. 'Frozen at ₹40 lakh of collected-but-undelivered sankalps, on Kartik Purnima, with no second rail' is a precise and plausible failure narrative.
- THE JAGANNATH / UTSAV PRECEDENT. A near-identical ₹801 'Nama and Gotra Sankalpa' SKU drawing a police reference and a temple-administration advisory is the single most relevant real-world datapoint in the document — a competitor already got in trouble for the exact thing being built. It should be promoted from a finding to a design input.
- THE CARD-SCHEME MONITORING NUMBERS. Both verified against current programme rules. Mastercard ECM at 100 chargebacks and 1.5% is correct post-2020; Visa VAMP at a 1.5% merchant Excessive threshold from 1 April 2026 with an $8 per-transaction fee and no warning tier is correct. Treating a no-questions refund policy as a structural defence rather than as generosity is exactly the right frame. Note that trust.ts:1185 already publishes a fourteen-day, no-reason, one-button refund with no retention offer — so the real delta is removing the timer, not creating the policy.
- THE ANTI-SUPERSTITION LAW DE-ESCALATION. Correctly reads the Maharashtra 2013 and Karnataka 2017 statutes as targeting inhuman and coercive practices rather than ordinary puja, and correctly scopes the residual exposure to Nashik and Talakaveri and only if a remedial/dosha rite is ever added. Not overstating a risk is as valuable as finding one, and this section shows the author actually read the statutes.
- DMRA 1954 SCOPED TO GROWTH COPY, NOT THE CATALOG. Right call. s.2(c) does make a mantra or kavacha a statutory 'magic remedy' and s.3 does criminalise advertising efficacy against the scheduled conditions, and the published refusal list (rituals.ts:642 onward — dosha diagnosis, kaal sarp, manglik, pitru dosh, tripindi shraddha) already blocks the triggers. Identifying SEO and growth copy as the residual leak is the correct place to point, because that is where the copy is written fastest and reviewed least.
- DROP PITRU TARPAN AT LAUNCH — right instinct, wrong economics. The cultural reasoning is sound and specific: adhikara rules, the tithi constraint, the tradition that tarpan is not performed while one's father lives (which the catalog itself concedes at rituals.ts:376), and the fact that it is the quotable example in any hostile essay. Keep the reasoning, but recognise it removes the ₹501 SKU the whole model is built on, and resolve that conflict rather than shipping both recommendations.
- THE PRE-ORDER GATE AS A DEMAND TEST (rec #9). Correct in principle — demand at price is the only unsurvivable risk, and it is testable before a database exists. It needs restructuring as a refundable deposit taken after permission is secured, but the instinct to falsify demand before building is the right one, and 'if you cannot sell 500 pre-orders on a promise, you cannot sell 87,600 sankalps on a delivery' is the correct standard.
- THE COMPETITIVE THREAT ITSELF. The AppsForBharat Series C is real and well-sourced — ₹175 crore / ~$20M led by Susquehanna Asia VC, closed June–July 2025, with capital explicitly earmarked for 20+ temple towns including Ujjain and Haridwar. Two of six named ghat towns are on a funded incumbent's expansion roadmap. That finding stands entirely; only the revenue-per-puja arithmetic derived alongside it needs to be thrown out.
- SEPARATING FILMING PERMISSION FROM RITUAL PERMISSION. The India Cine Hub national permit being explicitly an umbrella that does not replace state, municipal and location permits — six ghats across five states meaning six independent stacks — is a real and commonly underestimated cost, and it correctly separates the right to film from the right to perform. These are two different consents from two different bodies and conflating them is how the schedule slips a year.
- THE PREMIUM-DAY INVERSION. 'The premium days you price highest are the days ghat access is hardest and most dangerous' is a genuine structural insight, well evidenced by the Mauni Amavasya crush, the anti-drone deployments, and the documented network failures at Mahakumbh despite 328 new towers. Note that the catalog already half-admits it — the +₹751 parva premium is justified at rituals.ts:611 on the grounds that 'ghat access is contested and ritvik hours are scarce on these days', which prices scarcity but not the elevated probability of total non-delivery.