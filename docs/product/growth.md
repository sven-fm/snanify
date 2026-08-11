# Snanify Growth: acquisition, the share loop, and why there is no paid channel

**At a $24.70 blended AOV no paid channel in the US clears the CAC ceiling by a factor of 3-20x, so growth must be zero-marginal-cost — and the largest verified opportunity is not Pitru Paksha but the Nashik Simhastha Kumbh, which the Maharashtra government has scheduled to open at Ram Kund on 31 Oct 2026, a ghat Snanify already lists.**

> Adversarial review: **needs-work**

## Key numbers

```
UNIT ECONOMICS (arithmetic shown; input costs are ASSUMPTION, structure is from trust.ts)

Samuhik session, $11 sankalp, officiant paid max(₹1,800, 20% of gross) per trust.ts, FX ₹87/USD, Stripe cross-border 4.1% + $0.30, ops $45/session, streaming $8/session + $0.35/order:

  n=5   gross $55   var $79   contribution -$24.19  (-$4.84/order)
  n=8   gross $88   var $83   contribution  +$4.6   BREAK-EVEN
  n=11  gross $121  var $89   contribution  +$31.69 ($2.88/order)
  n=20  gross $220  var $119  contribution  +$100.98 ($5.05/order)
  n=51  gross $561  var $221  contribution  +$339.65 ($6.66/order)

=> A Samuhik session below 8 sankalps LOSES MONEY. The binding growth job is not "get orders", it is "converge orders onto the same session".

LTV
  Mix ASSUMPTION 70% Samuhik $11 / 20% Parivar $31 / 10% Ekantik $108
  AOV = 0.7(11) + 0.2(31) + 0.1(108) = $7.70 + $6.20 + $10.80 = $24.70
  Blended contribution margin 62.9% => $15.53 contribution per order
  Orders per acquired customer over 3 yrs: 1.3 / 1.5 / 1.8
  LTV = $20.19 / $23.30 / $27.95
  CAC ceiling at 1/3 LTV = $6.73 / $7.77 / $9.32

CAC BY CHANNEL vs a $7.77 ceiling
  US paid search, long-tail  CPC $1.50 / conv 3%  = $50    6.4x over
  US paid search, best case  CPC $1.20 / conv 5%  = $24    3.1x over
  US paid search, worst      CPC $3.00 / conv 2%  = $150   19x over
  Paid social, broad+geo     CPC $1.40 / conv 1%  = $140   18x over
  SEO, 60 pages @$250 + $10k eng = $25,000 sunk
      at 250 orders  = $100/order   (year 1: over ceiling)
      at 900 orders  = $27.78/order (year 2: over ceiling)
      at 3,000 orders= $8.33/order  (year 3: at ceiling)
  WhatsApp share loop        ~$0 media, marginal CAC ≈ $0
  Co-sankalp basket          ~$0 media, marginal CAC ≈ $0
  Temple rev-share @25%      $2.75 cash CAC on an $11 order, but ~20 founder-hours/deal

K FACTOR (share loop)
  K = share rate x impressions per share x impression-to-customer conversion
  Devotional: 0.40 x 22 x 0.5% = 0.044
  Pitru:      0.18 x 6  x 4.0% = 0.043
  Optimistic devotional ceiling: 0.55 x 30 x 0.8% = 0.132
  Blended central K = 0.043 => steady-state amplification 1/(1-K) = 1.045, i.e. +4.5% orders

CO-SANKALP (siblings each buy their own sankalp into one session)
  1.4 sankalps/initiator => +40% orders, effective CAC x0.71
  1.8 sankalps/initiator => +80% orders, effective CAC x0.56
  2.2 sankalps/initiator => +120% orders, effective CAC x0.45
  => 18x the impact of the share loop, and it fills sessions past the 8-sankalp break-even.

CAPACITY (not the constraint)
  5 sessions/day x 51 sankalps = 255 sankalps/officiant/day
  2 officiants x 16 days of Pitru Paksha = 8,160 sankalp capacity at one ghat.
  Demand is the constraint, not supply. Do not pre-buy officiant capacity.

VERIFIED DEMAND SHAPE (English Wikipedia pageviews, Aug 2025 - Jul 2026, Wikimedia REST API)
  Makar Sankranti   peak 302,456 (Jan-26)   trough  6,526 (Mar-26)
  Maha Shivaratri   peak 239,369 (Feb-26)   trough  5,652 (May-26)
  Pitru Paksha      peak  35,548 (Sep-25)   trough    994 (Feb-26)
  Kumbh Mela        peak  26,304 (Jan-26)   trough 10,796 (Apr-26)  <- never collapses
  Ganga Dussehra    peak   4,584 (May-26)   trough    231 (Feb-26)
  Kartik Purnima    peak   2,409 (Nov-25)   trough    890 (May-26)
  Amavasya          peak   5,617 (Oct-25)   trough  2,053 (Apr-26)  <- flat, 12x/yr
  Gotra             158,197 annual, ~13k/month, no seasonality
  Tarpana           peak   2,525 (Sep-25), 6.2x its own baseline

MARKET CEILING MARKER
  Sri Mandir >$12M ARR at start of 2025; ~20% of revenue from diaspora => ~$2.4M/yr is what the
  category leader extracts from the entire global Indian diaspora. Snanify at 5-10% of that in
  year 3 = $120k-$240k. Plan against that number, not against a TAM.
```

## Findings

**The Nashik Simhastha Kumbh Mela opens with Dhwajarohan at Ram Kund, Panchavati, Nashik at 12:02pm on 31 October 2026, runs to 24 July 2028, with Amrit Snan dates of 2 Aug 2027 (Ashadh Somvati Amavasya), 31 Aug 2027 (Shravan Amavasya) and 11 Sep 2027 (Bhadrapada Shukla Ekadashi). Ram Kund on the Godavari is already one of Snanify's six ghats. Ujjain Simhastha follows at Ram Ghat, Shipra, in 2028 — also already a Snanify ghat.**  
*high confidence.* VERIFIED. Maharashtra government schedule release announced in presence of CM Devendra Fadnavis, reported https://www.deccanchronicle.com/nation/nashik-kumbh-mela-2027-to-begin-with-flag-hoisting-on-october-31-2026-1882836 ; corroborated by https://nashikkumbhmela.co.in/dates-and-schedule/ and https://www.tourmyindia.com/kumbhmela/nasik-kumbh.html . Ram Kund/Godavari and Ram Ghat/Shipra confirmed present in src/content/rivers.ts as slugs godavari-nashik and shipra-ujjain. Ujjain 2028 window (27 Mar - 27 May 2028) sourced only to a tour operator, ujjaindarshan.com — treat as LOW confidence pending government notification.

**There is no paid acquisition channel available to Snanify in the US at any plausible price point. Paid search long-tail lands at $24-$150 CAC against a $6.73-$9.32 CAC ceiling; paid social at ~$140. Even if Ekantik at $108 became 40% of mix (AOV $50, LTV $46, ceiling $15), paid search still fails.**  
*high confidence.* ARITHMETIC, shown in numbers field. CAC ceiling derived from AOV $24.70 x 62.9% CM x 1.5 orders/customer / 3. CPC and landing-conversion inputs are ASSUMPTION — no public CPC data exists for these keywords in US geos; I searched and found only generic India benchmarks (₹20-150/click, https://apexinfluence.in/blog/google-ads-benchmarks-india). The conclusion holds across the full plausible input range, which is why I state it flatly.

**Both major ad platforms have removed the targeting handles this product would need. Google Ads classes religious belief as a sensitive interest category and prohibits Customer Match, your-data segments, audience expansion and lookalike segments for it. Meta removed detailed-targeting options referencing religious practices on 19 January 2022. Keyword-targeted Search ads remain permitted.**  
*high confidence.* VERIFIED. https://support.google.com/adspolicy/answer/143465 — 'Advertisers promoting products and services that fall within sensitive interest categories are unable to use advertiser-curated audiences', with 'Religious beliefs' listed. https://support.google.com/adspolicy/answer/16701958 . Meta: https://searchengineland.com/meta-will-remove-targeting-options-for-sensitive-topics-on-january-19-378095 and https://www.facebook.com/government-nonprofits/blog/preparing-for-upcoming-removal-of-certain-ad-targeting-options — examples removed included religious practices and groups. Consequence: no retargeting of visitors to shraddh content, no lookalikes off a buyer list. Confirms growth.md's assumption, which was previously unsourced.

**The query space splits cleanly: tarpan/pind-daan/shraddh online is CONTESTED with at least six transactional operators, while snan booking is EMPTY. A SERP for 'ganga snan online booking kartik purnima 2026' returned only informational panchang sites, a Varanasi taxi company, and a blog post — not one transactional snan page. This validates 'snan as an owned category' with evidence rather than assertion.**  
*high confidence.* VERIFIED by direct SERP inspection. Contested cluster returns smartpuja.com, temple.yatradham.org, prayagpandits.com, dharmikvibes.com, mahatarpan.com, trimbakeshwartemplepujari.com. Snan cluster returns drikpanchang.com, prokerala.com, kashitaxi.in, truevastu.com. Sri Mandir (srimandir.com/epuja) ranks on head terms like 'online puja booking' but did NOT appear on any occasion+geo long-tail SERP I ran.

**The honest K factor of the Sankalp Patra share loop is ~0.04-0.06, giving +4.5% orders. It is not a growth engine. The co-sankalp mechanic — siblings each buying their own sankalp into the same session — is worth +40% to +120% orders at the same zero marginal cost, roughly 18x the impact, and it simultaneously solves the 8-sankalp session break-even problem.**  
*medium confidence.* ARITHMETIC. Share rate 5-15% is the published benchmark (https://getlaunchlist.com/blog/viral-coefficient-k-factor-guide, https://www.saxifrage.xyz/post/k-factor-benchmarks); I used 40% for devotional (above benchmark, justified by WhatsApp forward culture) and 18% for pitru. Impression-to-customer of 0.5% for a group forward is ASSUMPTION — published 3-5% referral conversion applies to direct 1:1 invites, not group forwards, and using it would inflate K by 6-8x. Every input is ASSUMPTION; the ranking of the two mechanics is robust across the range.

**A Samuhik session priced at $11 loses money below 8 sankalps, because ops (~$45) and streaming (~$8) are fixed per session while the officiant floor of ₹1,800 binds below ~9 sankalps. Marketing's actual job is demand concentration onto few published muhurats, not demand generation across many.**  
*high confidence.* ARITHMETIC, table in numbers field. Officiant formula max(₹1,800, 20% of segment gross) is VERIFIED from docs/design/ethics.md line 413 and src/content/trust.ts line 189 (both marked PLACEHOLDER pending market check). Ops and streaming costs are ASSUMPTION. Note the percentage-with-floor formula is what makes a half-full session survivable — a flat per-session officiant fee would push break-even to ~15 sankalps.

**The live site has zero structured data and no hreflang link tags in the HTML head. I fetched /, /faq, /rivers/ganga-haridwar and /muhurat/pitru-paksha-2026 and found 0 occurrences of application/ld+json and 0 hreflang link elements on every one. hreflang exists only in sitemap.xml, and x-default is absent there too.**  
*high confidence.* VERIFIED by curl against https://www.snanify.com. grep -c 'application/ld+json' returned 0 on all four URLs; grep for hreflang= in the HTML returned empty. grep -rn 'ld+json|JsonLd|schema.org' src/ returned no matches. sitemap output shows only en and hi alternates, no x-default.

**Nine of the thirteen occasion slugs carry the year in the URL (pitru-paksha-2026, kartik-purnima-2026, makar-sankranti-2027 ...). Every year the canonical URL changes and accumulated ranking authority is discarded. The page titles are brand-shaped, not query-shaped ('Pitru Paksha, Muhurat calendar · Snanify'), and the meta description shipped to the SERP reads 'Provisional · to be confirmed against the panchang'.**  
*high confidence.* VERIFIED. Slugs from src/content/data/muhurat.json. Title and meta description read from live HTML at https://www.snanify.com/muhurat/pitru-paksha-2026. The four monthly slugs (purnima, amavasya, ekadashi, sankranti) are correctly evergreen.

**'Gotra' is the largest single informational query in this entire space and is entirely unserved by the site: 158,197 English Wikipedia pageviews over the last 12 months, ~13k/month, with no seasonality. It is also the field that will cause checkout abandonment, so the page pays twice.**  
*high confidence.* VERIFIED via Wikimedia REST pageviews API, en.wikipedia/Gotra, monthly 2025-08 to 2026-07: 17759, 19077, 16651, 14917, 13026, 13092, 10730, 10418, 9986, 11515, 10496, 10530. Existing SERP incumbents are low-authority (poojn.in, Quora, harekrishnamarriage.com, instaastro.com gotra 'calculator'). Note the adversarial review in growth.md is right that gotra-as-required-field is a caste filter; the page must offer Kashyapa as the accepted convention, which is itself documented practice.

**Kartik Purnima, which growth.md nominates as 'the first real commercial moment', has the LOWEST verified attention of any occasion in the calendar — peaking at 2,409 monthly pageviews against Makar Sankranti's 302,456 and Maha Shivaratri's 239,369. It is the purest snan occasion and the right category-ownership page, but it cannot carry a commercial launch.**  
*high confidence.* VERIFIED, Wikimedia pageviews API, en.wikipedia, monthly 2025-08 to 2026-07 for Kartik_Purnima, Makar_Sankranti and Maha_Shivaratri. Caveat: English Wikipedia pageviews measure informational attention, not purchase intent, and the ratio between them differs by occasion — Makar Sankranti traffic is largely 'when is it', Pitru Paksha traffic is obligation-driven. The magnitude gap (125x) is too large to be explained by that.

**Monthly Amavasya is the most under-valued page in the calendar. It never drops below 2,053 monthly pageviews, occurs 12 times a year, is a legitimate pitru tarpan occasion in its own right, and two of the three Nashik Simhastha Amrit Snans (2 Aug 2027 and 31 Aug 2027) are amavasyas. It is simultaneously the counter-cyclical revenue page and the page that compounds into the Simhastha peak.**  
*high confidence.* VERIFIED. Amavasya pageviews Aug-25 to Jul-26: 4409, 4947, 5617, 3212, 2611, 3637, 2643, 2636, 2053, 2285, 2761, 2271 — coefficient of variation far lower than any dated occasion. Amrit Snan tithis from the Maharashtra government schedule via Deccan Chronicle. The occasion already exists as an evergreen slug 'amavasya' in muhurat.json with cadence 'monthly'.

**The Indian diaspora is ~35.42 million people (15.85M NRI + 19.57M PIO/OCI), of whom the US component is ~5.2M Indian-origin with 48% identifying as Hindu, giving roughly 2.5M reachable Hindu Indian-Americans. There are between 1,235 and 1,492 Hindu temples in the United States. WhatsApp is used by 98% of Indian internet users (853.8M users) and by ~124M in the US.**  
*medium confidence.* VERIFIED with caveats. Diaspora total: MEA May 2024 figure, https://www.mea.gov.in/overseas-indian-affairs and https://psfresearch.com/population-of-overseas-indians-nris-pios-by-country-mea-2025/. US population 5.2M (2023) and 48% Hindu: Pew Research, https://www.pewresearch.org/religion/2023/10/11/hinduism-among-asian-americans/ and https://www.pewresearch.org/2024/08/06/indian-americans-a-survey-data-snapshot/. Temple counts are commercial POI databases (rentechdigital, poidata.io), not an authoritative registry — treat as an order of magnitude. WhatsApp figures are aggregator stats (demandsage, backlinko), not first-party Meta disclosures.

**The homepage still ships '1,20,000+ Sankalps offered' and '48 Countries served' in both EN and HI, on a site that has never performed a rite. This is a legal exposure, not merely a reputational one, and it is currently the first thing an SEO visitor reads.**  
*high confidence.* VERIFIED in src/lib/content.ts lines 40-44 (EN) and 173-177 (HI). Already flagged as the #1 immediate action in docs/design/growth.md §9.2 and in the adversarial review; still present in the repo as of this analysis.

**The site's own documents disagree on the size of a shared session: src/content/rituals.ts line 212 says Samuhik carries 'Up to 51 sankalps' while src/content/trust.ts lines 173 and 743 say 'A shared segment may carry up to eleven sankalps'. This is not a copy inconsistency — it changes the unit economics, the price a shared sankalp can bear, and therefore the CAC ceiling.**  
*high confidence.* VERIFIED by direct grep of both files. If the sellable unit is 11 rather than 51, session gross falls from $561 to $121, contribution per order falls from $6.66 to $2.88, and the CAC ceiling falls from $7.77 to roughly $3.30 — at which point even the co-sankalp mechanic is the only viable acquisition path.

**Pitru Paksha 2026 runs 26 September to 10 October 2026, with Sarva Pitru Amavasya on Saturday 10 October 2026. As of today that is 46 days away and there is no backend, no payments, no auth and no streaming in the repo.**  
*high confidence.* VERIFIED against multiple panchang sources: https://mahakaldarshan.co.in/blog/pitru-paksha-2026-calendar, https://www.smartpuja.com/blog/pitru-paksha-2026-dates-shradh-rituals-tithi/, https://www.mahatarpan.com/post/sarva-pitru-amavasya-2026. Note these are commercial operators, not an authoritative panchang — the site's own Sourced<T> discipline should apply before any date ships. Repo state confirmed: find src/app -name page.tsx returns 12 marketing routes only.

**Competitor pricing for the equivalent rite is 5-30x Snanify's $11 Samuhik price. Prayag Pandits charges ₹11,000 (~$126) per family for Gaya tarpan and ₹16,500 (~$190) on Sarva Pitru Amavasya 10 Oct 2026 — an explicit 50% peak-date surcharge. SmartPuja charges ₹7,100 (~$82) for a 1-1.5 hour Pitru Paksha e-puja. Neither prices in USD.**  
*high confidence.* VERIFIED by WebFetch of https://prayagpandits.com/product/tarpan-in-gaya/ and https://www.smartpuja.com/puja-services/pitru-paksha-e-puja. The peak-date surcharge is worth noting as a thing Snanify should NOT copy — it is grief pricing and it will be described that way.

**Diaspora search behaviour is transliterated Latin ('pitru paksha tarpan online', 'gotra kaise pata kare'), not Devanagari. Devanagari search is India-resident behaviour. The /hi mirror therefore serves the market growth.md says not to enter, while the queries the wedge actually types must be captured on the English pages.**  
*low confidence.* ASSUMPTION, inferred from the SERPs: every diaspora-intent SERP I ran returned Latin-transliterated pages, and my Devanagari-adjacent probes surfaced India-resident operators. I could not verify this with query-level locale data — no public source exists. The operational instruction it implies is cheap and low-risk regardless: write the English pages in Hinglish vocabulary (tarpan, shraddh, sankalp, gotra, snan, tithi, aparahna, pind daan) rather than English glosses.

## Recommendations

- **[M] Publish /kumbh/nashik-2027 within 30 days, before the 31 Oct 2026 Dhwajarohan at Ram Kund. Cover the government schedule, the three Amrit Snan dates, what a Simhastha snan is, why Ram Kund, and a diaspora timezone converter. Add /kumbh/ujjain-2028 as a stub pending government notification.**  
  This is the largest verified opportunity in the plan and it is dated, government-announced, and sits on two ghats Snanify already lists. The world's press will cover the 31 Oct flag hoisting; being indexed before that date is free authority you cannot buy afterwards. You have 356 days of indexing runway to the first Amrit Snan on 2 Aug 2027. Kumbh Mela pageviews never fall below 10,796/month — this is the only always-on, non-seasonal demand in the category.
- **[S] Delete the '1,20,000+ Sankalps offered' and '48 Countries served' hero stats from src/lib/content.ts today, both locales. Replace with the two facts that are true and better: six rivers, and the number of sankalps in a shared session.**  
  An unverifiable counter on the homepage of an honesty-positioned product is misleading advertising under the UK CAP Code, FTC Section 5 and India's Consumer Protection Act 2019, and it is the exact artefact a sceptical thread screenshots. It is also the first thing every SEO visitor you are about to acquire will read. Zero engineering cost.
- **[M] Ship the technical SEO foundation in one sprint: JSON-LD (Organization, FAQPage on /faq, Event on each muhurat with IST offset and OnlineEventAttendanceMode, Article on guides), hreflang link tags in the HTML head with x-default, and de-year the nine dated occasion slugs to evergreen paths with the year as an optional child (/muhurat/pitru-paksha and /muhurat/pitru-paksha/2026), 301-redirecting the old URLs.**  
  Verified: the live site has zero structured data on every page I fetched and no hreflang in head. Year-stamped slugs discard ranking authority annually, which is fatal for a business whose entire acquisition thesis is compounding organic. This is a one-week job that gates everything else.
- **[M] Build the co-sankalp mechanic before building the share card: after booking, the buyer gets a plain link to their own session that others in the family can add their own sankalp to, each paying separately. No discount, no invite counter, no incentive — one neutral sentence.**  
  K factor on the Patra share loop is 0.043 (+4.5% orders). Co-sankalp at 1.8 sankalps per initiating buyer is +80% orders — 18x the impact at the same zero marginal cost. It is also culturally native (families split ritual cost) and it is the only mechanic that reliably pushes a session past the 8-sankalp break-even. This is the single highest-leverage thing in the growth plan.
- **[S] Rewrite the occasion-page meta descriptions. Keep provenance honesty on the page; get it out of the 155 characters that decide the click. 'Provisional · to be confirmed against the panchang' is currently the SERP snippet for the money page.**  
  Honesty about date provenance belongs in the body, next to the date, where it builds trust. In a SERP snippet it reads as 'this site does not know its own dates' and it will halve CTR against six competitors who assert dates confidently. This costs nothing and violates nothing.
- **[M] Ship /panchang as a free tool within 7 days: every Pitru Paksha 2026 tithi, with the aparahna kala window converted to US Eastern, US Pacific, UK, Toronto, Sydney, Dubai and Singapore, plus the source named. No email gate on the data itself; an optional opt-in below it.**  
  This is the acquisition asset that gets you the first 100 customers with zero media spend, because it is genuinely useful, genuinely absent from the web, and posts honestly to Reddit, Quora and Facebook diaspora groups without being an ad. It is also the front door to the Tithi Panji, and shraddh tithi is determined at aparahna kala not sunrise — getting that right is a differentiator every incumbent gets wrong.
- **[L] Sell exactly one Samuhik session of 51 sankalps on Sarva Pitru Amavasya, 10 October 2026, plus up to five Ekantik rites. Cap enrolment publicly. Do not open more sessions if it sells out.**  
  46 days out with no backend, one session is the only honest scope. It is also exactly the unit the entire business scales on, so the pilot tests the real thing rather than a proxy, and 51 families can be hand-held by one founder. A missed muhurat for 800 grieving families is unrecoverable; for 51 hand-held families it is survivable.
- **[S] Resolve the 51-vs-11 contradiction between rituals.ts ('Up to 51 sankalps') and trust.ts ('up to eleven sankalps') before any price ships, and publish the number.**  
  It is not a copy bug. At 11 sankalps a session grosses $121 not $561, contribution per order falls from $6.66 to $2.88, and the CAC ceiling falls from $7.77 to ~$3.30 — at which point every channel including SEO is uneconomic and the price architecture has to change. Whichever number is true must also be published, because 'are you reading my name off a list of fifty?' is the first question a critic asks.
- **[S] Kill paid search and paid social from the plan entirely for year one. Reallocate the budget to content and to the two artefacts (share card, co-sankalp link).**  
  Verified arithmetic: $24-$150 CAC against a $6.73-$9.32 ceiling. Verified policy: Google prohibits Customer Match, lookalikes and audience expansion for religious belief; Meta removed religious-practice detailed targeting in 2022. So paid channels are both unaffordable and untargetable. growth.md's 'five narrow seasonal windows' is still 3-6x over the ceiling — cut it to zero and revisit only if AOV triples.
- **[L] Expand exactly four of the thirteen occasion pages into full guides now — pitru-paksha, amavasya, magh-snan/makar-sankranti, mahashivratri — and merge kartik-snan into kartik-purnima. Leave ekadashi, sankranti, tula-sankramana and yam-dwitiya as thin indexed pages.**  
  Ranked by verified attention x transactional intent. Pitru Paksha is the money page (35.5k peak, highest intent, six competitors so it must be genuinely better). Amavasya is the counter-cyclical page (never below 2,053/mo, 12x a year, and two of three Simhastha Amrit Snans are amavasyas). Makar Sankranti (302k) and Mahashivratri (239k) are the top-of-funnel pages that feed the Panji. Kartik Purnima peaks at 2,409 and cannot carry the launch growth.md assigns it. Ekadashi is a fasting occasion, not a snan occasion — wrong intent at any volume.
- **[M] Add five occasions that are missing and matter: Mauni Amavasya (Magh, Prayagraj), Somvati Amavasya, Karkidaka Vavu Bali (Kerala, July), Aadi/Thai Amavasai (Tamil), and Mahalaya (Bengali, distinct query from Pitru Paksha).**  
  Mauni Amavasya is the largest single snan day outside Kumbh and is absent. Karkidaka Vavu Bali has literally no English Wikipedia article (0 pageviews) despite drawing lakhs — zero competition on a mass pitru occasion, in July, which is a trough month, serving the Gulf Malayali segment. Aadi/Thai Amavasai is the only thing that gives Talakaveri a commercial reason to exist. Mahalaya peaks separately at 1,656 in September.
- **[L] Split /rituals into /rituals/[rite] for the seven rites already defined in rituals.ts, add /rivers/[river]/live for the six always-on streams, and build a /guide/[topic] cluster starting with gotra.**  
  Seven rites of real informational query space are currently collapsed into one page. Gotra alone is 158k annual pageviews with weak incumbents and it unblocks your own checkout — a buyer who cannot fill the gotra field abandons. The /live pages capture 'har ki pauri live' style queries and double as the proof-of-realness surface and the recording infrastructure you need anyway.
- **[S] Write the English pages in Hinglish vocabulary — tarpan, shraddh, sankalp, gotra, snan, tithi, aparahna, pind daan — rather than English glosses, and keep the Devanagari /hi mirror for India rather than for the diaspora.**  
  The wedge types transliterated Latin, not Devanagari. Every diaspora-intent SERP I ran returned Latin-transliterated pages. This is a copy instruction with no engineering cost that determines whether the pages match the queries at all. Flagged as low confidence — validate against Search Console within 90 days of the first pages ranking.
- **[S] Enforce a share-loop rule in product: a devotional snan may be shared publicly; a pitru rite may only be shared privately. For pitru SKUs the share sheet offers WhatsApp and message only, no social platforms, and the OG image carries no name.**  
  This is where the tasteless line actually falls, and it has to be enforced in code rather than in a guideline. It costs you the most shareable moment in the product, deliberately. It is also the thing that makes the artefact trustworthy enough to be shared at all — a grief certificate that can be posted to Instagram is a grief certificate nobody sends their mother.
- **[M] Run exactly three temple association deals as credibility assets, not as a revenue channel, and negotiate for naming rights and a quote rather than volume.**  
  At ~20 founder-hours per deal for 100 names at $11, contribution is ~$700 — about $35 per founder-hour, before the 3-6 month committee cycle. As a volume channel it is the worst use of the scarcest resource. As trust transfer it is unbuyable, and three is enough to say 'performed for the community of' without the channel eating the year.
- **[S] Instrument two metrics from day one and treat them as the pilot's verdict: sankalps per initiating buyer (the co-sankalp ratio) and live-attendance rate at the muhurat.**  
  The co-sankalp ratio is the number that decides whether growth is affordable — below 1.4 the model does not close. Live attendance decides whether the premium is honest: peak pitru muhurats land at 2-3am US Eastern, and if real attendance is 20% you are a recording business with a live pretence and should change the product rather than the copy.

## Risks

- The single largest risk is that Pitru Paksha 2026 starts in 46 days and there is no backend, no payments, no auth and no streaming in the repo. Attempting more than one hand-operated session is a brand-ending day; attempting nothing costs you a year of track record. The 51-sankalp single session is the only scope that is both achievable and useful.
- My CAC estimates rest on ASSUMPTION CPC and landing-page conversion inputs. No public search-volume or CPC data exists for these queries in US geos — I searched and could not find any. The conclusion (no paid channel clears the ceiling) survives the full plausible input range, but the specific dollar figures should be replaced with a $500 Google Ads test in one narrow window before anyone plans around them.
- English Wikipedia pageviews measure informational attention, not purchase intent, and the ratio differs by occasion. Makar Sankranti's 302k is largely 'when is it'; Pitru Paksha's 35.5k is obligation-driven. I have used the data for demand SHAPE and relative magnitude only, and the 125x gap between Makar Sankranti and Kartik Purnima is too large to be an artefact — but do not convert pageviews into forecast orders.
- The K factor of 0.043 depends on an assumed 0.5% impression-to-customer conversion for a WhatsApp group forward. The published 3-5% referral benchmark applies to direct 1:1 invites; using it would inflate K by 6-8x and produce a plan that does not survive contact with reality. If a growth hire later re-derives K using the 3-5% figure and gets 0.3, that is the error, not a discovery.
- Nashik Simhastha is a 21-month event with government infrastructure works, crowd control and filming restrictions at Ram Kund. Building the growth plan around it means accepting that a single administrative decision — a filming ban, a ghat closure, a rescheduled Amrit Snan — removes the largest line in the forecast. Get written filming permission from the Nashik Kumbh Mela authority before you invest in the content, not after.
- Ujjain Simhastha 2028 dates (27 Mar - 27 May 2028) are sourced only to a tour operator. Do not publish them as fact, and do not let them into a capacity or funding plan, until a Madhya Pradesh government notification exists. They land exactly in the annual demand trough, which makes them strategically valuable and therefore tempting to overstate.
- The share loop and the verification promise conflict at the mechanical level. trust.ts states that a video forwarded through WhatsApp is recompressed and will fail the /verify fingerprint check. If the shared clip is the same artefact as the verifiable one, the sceptical relative the loop exists to convince will get NO MATCH — manufacturing the accusation the verifier was built to pre-empt. The shared clip must be a separately fingerprinted artefact and the share card must carry the rite code and verify URL in the image itself.
- The Panji reminder email, per the ethics constraint, may carry the date and nothing else — no booking button. That is correct and it should stay, but it means the retention mechanic that growth.md calls the cash-flow engine has no measurable attribution and a conversion rate that will look like zero in any dashboard. Say the price out loud now, or a growth hire will 'fix' it in month nine.
- Competitor Prayag Pandits charges a 50% surcharge on Sarva Pitru Amavasya (₹16,500 vs ₹11,000). Peak pricing on a grief date is standard in this category, it is the obvious revenue lever, and it will be proposed. It is grief pricing and it will be described that way by the first journalist who compares the two prices. Decide now, in writing, that peak dates are not surcharged.
- If the shared session turns out to be 11 sankalps rather than 51, the CAC ceiling falls to roughly $3.30 and nothing in this plan except the co-sankalp mechanic and the WhatsApp artefact remains economic. This contradiction is currently live in the repo across two files.

---

## Snanify Growth: acquisition, the share loop, and the demand calendar

**Written 11 August 2026.** Every number below is marked VERIFIED (with a source) or ASSUMPTION (with the arithmetic shown). Where I could not verify something I say so rather than filling the gap.

---

## 0. The three things that decide everything

**One. There is no paid channel.** At a blended AOV of $24.70 and a 62.9% contribution margin, LTV is roughly $23 and a disciplined CAC ceiling is $7.77. US paid search on long-tail occasion queries lands somewhere between $24 and $150. Paid social lands around $140. Both platforms have also removed the targeting handles this product needs — Google prohibits Customer Match, lookalikes and audience expansion for religious belief, and Meta removed religious-practice detailed targeting in January 2022. So paid is simultaneously unaffordable and untargetable. This is not a pessimistic reading; it is the same conclusion at every plausible input. **Cut paid search and paid social from year one entirely.**

This is unusually good news for your stated goal. "As little human interaction as possible" and "no media budget that works" point at the same answer: growth here is an engineering and content problem. Nobody has to be hired to buy ads badly.

**Two. The unit is the session, not the order.** A Samuhik session of $11 sankalps loses money below 8 sankalps, because ops and streaming are fixed per session and the ₹1,800 officiant floor binds until about 9. Above 20 sankalps contribution per order plateaus around $5-6.66. That means the marketing job is not *generate demand* — it is **converge demand onto a small number of published muhurats**. Every acquisition decision in this document follows from that sentence.

**Three. The biggest opportunity is not Pitru Paksha.** It is the Nashik Simhastha Kumbh Mela, and it is on a ghat you already list.

---

## 1. The Simhastha finding

The Maharashtra government has published the schedule, announced in the presence of CM Devendra Fadnavis:

- **Dhwajarohan (flag hoisting): 31 October 2026, 12:02 pm, at Ram Kund, Panchavati, Nashik** — and at Trimbakeshwar.
- **Pratham Amrit Snan: Monday 2 August 2027** (Ashadh Somvati Amavasya)
- **Mahakumbhasnan / Second Amrit Snan: 31 August 2027** (Shravan Amavasya)
- **Tritiya Amrit Snan: 11 September 2027** (Bhadrapada Shukla Ekadashi)
- Concludes 24 July 2028.

*Source: Maharashtra government schedule release, reported by Deccan Chronicle, corroborated by two secondary guides.*

**Ram Kund on the Godavari is `godavari-nashik` in your `src/content/rivers.ts`. You already have it.** Ujjain Simhastha follows at Ram Ghat on the Shipra — `shipra-ujjain`, also already yours. (Ujjain's 2028 window is currently sourced only to a tour operator; do not publish it until there is a government notification.)

Four things make this the centre of the plan rather than a footnote:

1. **It is dated, a year out, and unavoidable.** You have 81 days to the Dhwajarohan and 356 days to the first Amrit Snan. That is more indexing runway than any other opportunity you will get.
2. **Kumbh demand does not collapse.** Every other occasion in your calendar has a peak-to-trough pageview ratio between 5:1 and 300:1. Kumbh Mela's is 2.4:1 and its floor is 10,796 monthly pageviews. It is the only always-on demand in the category.
3. **Two of the three Amrit Snans are amavasyas**, which means the evergreen `/muhurat/amavasya` page compounds directly into the peak instead of being a separate build.
4. **Ujjain Simhastha lands March–May 2028 — exactly in your annual trough.** The verified pageview data shows March and April are the annual minimum for essentially every occasion. Simhastha is the only thing on the horizon that fills them.

**Action: publish `/kumbh/nashik-2027` before 31 October 2026.** The world's press covers the flag hoisting. Being indexed and authoritative before that date is free; being late costs you the whole cycle.

---

## 2. The verified demand calendar

I could not find any public search-volume data for these queries — I looked, and the SEO tools that have it are all gated. So I used something I could actually verify: English Wikipedia pageviews via the Wikimedia REST API, Aug 2025 – Jul 2026. This measures *informational attention*, not purchase intent, and I use it only for shape and relative magnitude.

| Occasion | Peak month | Peak views | Trough | Ratio |
|---|---|---|---|---|
| **Makar Sankranti** | Jan 2026 | **302,456** | 6,526 (Mar) | 46:1 |
| **Maha Shivaratri** | Feb 2026 | **239,369** | 5,652 (May) | 42:1 |
| **Pitru Paksha** | Sep 2025 | **35,548** | 994 (Feb) | 36:1 |
| **Kumbh Mela** | Jan 2026 | 26,304 | **10,796** (Apr) | **2.4:1** |
| Ganga Dussehra | May 2026 | 4,584 | 231 (Feb) | 20:1 |
| **Amavasya** | Oct 2025 | 5,617 | **2,053** (Apr) | **2.7:1** |
| Tarpana | Sep 2025 | 2,525 | 351 (Jun) | 7:1 |
| **Kartik Purnima** | Nov 2025 | **2,409** | 890 (May) | 2.7:1 |
| Mahalaya | Sep 2025 | 1,656 | 65 (Feb) | 25:1 |
| **Gotra** | flat | **158,197/yr** | — | ~1.8:1 |

Three conclusions that contradict the existing plan:

**Kartik Purnima cannot carry a commercial launch.** `growth.md` calls it "the first real commercial moment". It peaks at 2,409 monthly pageviews — 125x smaller than Makar Sankranti. It is the purest snan occasion and the right *category-ownership* page, and I would keep it as that. But launching a company on it is launching into an empty room.

**Amavasya is the most under-valued page you own.** It is already an evergreen slug with `cadence: "monthly"`. It never falls below 2,053 views. It occurs twelve times a year. It is a legitimate pitru tarpan occasion in its own right. And two of the three Simhastha Amrit Snans are amavasyas. It is simultaneously your counter-cyclical revenue page and your Simhastha on-ramp. The adversarial review in `growth.md` flagged this and was right.

**Gotra is the largest single query in the space and you do not serve it.** 158,197 annual pageviews, no seasonality, and the incumbents are Quora threads and an "instaastro gotra calculator". It is also the field that will cause checkout abandonment — a buyer who cannot fill it leaves. The page pays twice. Write it properly, offer Kashyapa as the accepted convention for those without one, and offer kula-devata / native place / mother's line for families where the pravara gotra does not apply. (The review is right that gotra-as-required-field is a quiet caste filter. Fixing that is both correct and commercially better.)

---

## 3. The query space: where the incumbents actually are

I ran the SERPs rather than guessing. The space splits cleanly in two.

**CONTESTED — tarpan / pind daan / shraddh online.** Query `pitru paksha tarpan online` returns six or more transactional operators: smartpuja.com, temple.yatradham.org, prayagpandits.com, dharmikvibes.com, mahatarpan.com, trimbakeshwartemplepujari.com. They are low-authority and their pages are thin, but they exist, they have transaction history ("2,263+ Families Served Since 2019"), and they will outrank a new domain for 12–18 months. Their pricing: **Prayag Pandits ₹11,000 (~$126) for Gaya tarpan, rising to ₹16,500 (~$190) on Sarva Pitru Amavasya. SmartPuja ₹7,100 (~$82).** Neither prices in USD. Neither has a verifiable record.

**EMPTY — snan booking.** Query `ganga snan online booking kartik purnima 2026` returns drikpanchang (informational), prokerala (informational), **a Varanasi taxi company**, and a blog post. Not one transactional snan page. Sri Mandir ranks on head terms like "online puja booking" but appeared on **none** of the occasion+geo long-tail SERPs I ran.

This is the evidence for "snan as an owned category" that the strategy doc asserted but did not demonstrate. **Lead with snan, where you can rank in months. Enter tarpan where you can beat them on the one axis they cannot copy — a verifiable record — and accept that it takes a year.**

### Content architecture, mapped to what exists

```
KEEP AS IS
  /                                        homepage
  /ethics /how-it-works /faq /verify       trust surface
  /patra /patra/sample                     artefact surface

FIX
  /muhurat/[occasion]      de-year the 9 dated slugs. 301 the old URLs.
                           /muhurat/pitru-paksha        evergreen, canonical
                           /muhurat/pitru-paksha/2026    dated child
  /rivers/[river]          retitle to query shape:
                           "Har Ki Pauri, Haridwar: the ghat, the rite,
                            and how a snan is offered there"
  /rituals                 becomes a hub

BUILD
  /rituals/[rite]          x7  from the ids already in rituals.ts:
                           pitru-tarpan, deep-daan, nadi-puja, abhishek,
                           aarti-sankalp, sankalpit-japa, path
  /rivers/[river]/live     x6  always-on stream. Captures "har ki pauri live".
                                Doubles as proof-of-realness and as the recording rig.
  /kumbh/nashik-2027       PRIORITY. Ship before 31 Oct 2026.
  /kumbh/ujjain-2028       stub, pending MP government notification
  /panchang                THE free tool. Tithi -> your timezone, aparahna kala.
  /panchang/source         provenance page. Link every date on the site to it.
  /guide/[topic]           x~20 informational cluster, led by gotra
```

**The `/guide` cluster, in build order:**

1. `gotra` — what it is, how to find yours, what to do if your family does not have one *(158k/yr, weak incumbents, unblocks checkout)*
2. `aparahna-kala` — why shraddh tithi is set at aparahna and not sunrise *(nobody serves this; it is the credibility page for ritually literate buyers)*
3. `tithi-vs-date` — why the anniversary moves 11–19 days a year *(the Panji's rationale, told as a service)*
4. `can-a-rite-be-performed-from-abroad` — the range of positions, attributed to named consenting acharyas, with Snanify holding no theological position of its own
5. `tarpan-vs-pind-daan-vs-shraddh` — the distinction that protects you from selling relief from an obligation you do not discharge
6. `what-is-sankalp`, `purnimanta-vs-amanta`, `drik-vs-vakya`, `what-is-a-ghat`, `kalpvas`
7. `can-a-daughter-perform-shraddh` — **do not publish this until every partner purohit has agreed in writing to perform for a daughter.** Publishing a promise your supply will refuse is worse than silence.

**Which of the 13 occasion pages to expand.**

| Tier | Pages | Treatment |
|---|---|---|
| **1 — full guide now** | `pitru-paksha`, `amavasya`, `makar-sankranti` + `magh-snan`, `mahashivratri` | 1,500+ words, timezone converter, FAQPage + Event schema, honest-limits block |
| **2 — full guide, 90 days ahead** | `kartik-purnima` (merge `kartik-snan` into it), `ganga-dussehra`, `purnima` | Same template, lighter |
| **3 — thin, indexed, no investment** | `ekadashi`, `sankranti`, `tula-sankramana`, `yam-dwitiya` | Ekadashi is a *fasting* occasion, not a snan occasion — high volume, wrong intent. Tula Sankramana is the only commercial reason Talakaveri exists; keep it as the Kaveri page's anchor. |

**Five occasions missing that matter:**

- **Mauni Amavasya** (Magh, Prayagraj) — the largest single snan day outside Kumbh, and it is not in your calendar at all.
- **Somvati Amavasya** — snan-specific, unpredictable, and therefore an occasion people genuinely miss. Also: the first Simhastha Amrit Snan is an Ashadh Somvati Amavasya.
- **Karkidaka Vavu Bali** (Kerala, July) — **there is no English Wikipedia article for it. Zero pageviews, because zero pages exist.** A mass pitru occasion drawing lakhs, in a trough month, serving the Gulf Malayali segment. This is the single cleanest uncontested page available.
- **Aadi / Thai Amavasai** (Tamil) — same logic, and it gives Kaveri a second reason to exist.
- **Mahalaya** — 1,656 in September, a distinct Bengali query from Pitru Paksha.

### Hindi, and what the diaspora actually types

Your `/hi` mirror is Devanagari. Devanagari search is India-resident behaviour — and India is explicitly not your market. The diaspora types **transliterated Latin**: `pitru paksha tarpan online`, `gotra kaise pata kare`, `shraddh from usa`.

**Consequence: the English pages must be written in Hinglish vocabulary** — tarpan, shraddh, sankalp, gotra, snan, tithi, aparahna, pind daan, karta, pitru — not English glosses. This costs nothing and it determines whether your pages match the queries at all. I have marked this **low confidence** because no public source gives query-level locale data; validate it in Search Console within 90 days of your first pages ranking.

Keep the `/hi` mirror. It costs little, it is already built, and it serves the India-resident relatives who will be shown the site by the buyer.

### Technical defects on the live site, verified today

I curled the production site. All of these are real:

- **Zero structured data.** `grep -c 'application/ld+json'` returns **0** on `/`, `/faq`, `/rivers/ganga-haridwar` and `/muhurat/pitru-paksha-2026`. No `schema.org` reference anywhere in `src/`.
- **No hreflang link tags in `<head>`.** hreflang exists only in `sitemap.xml`, and **`x-default` is missing there too**.
- **Nine year-stamped slugs.** `pitru-paksha-2026`, `kartik-purnima-2026`, `makar-sankranti-2027`… Authority resets annually. The four monthly slugs are correctly evergreen.
- **Brand-shaped titles.** `Pitru Paksha, Muhurat calendar · Snanify` matches nothing anyone types.
- **The meta description is doing damage.** It currently reads `The fortnight given to the departed of one's line · September-October 2026. Provisional · to be confirmed against the panchang`. Provenance honesty belongs on the page, next to the date, where it builds trust. In a SERP snippet against six operators who assert dates confidently, it reads as "this site does not know its own dates."

---

## 4. The Sankalp Patra share loop, honestly

### The arithmetic

K = share rate × impressions per share × impression-to-customer conversion.

**Devotional occasions** (Kartik, Makar Sankranti, Ganga Dussehra, Shivratri):
`0.40 share rate × 22 unique impressions × 0.5% conversion = **K = 0.044**`

**Pitru occasions:**
`0.18 share rate × 6 impressions × 4.0% conversion = **K = 0.043**`

**Blended K ≈ 0.043.** Steady-state amplification `1/(1−K) = 1.045`. **The loop returns 4-5 extra customers per hundred.**

The number that matters most here is the 0.5% impression-to-customer conversion for a group forward, and it is where every plan of this kind goes wrong. The published referral benchmark of 3–5% applies to **direct 1:1 invites**. A forwarded image sitting in a 22-person family WhatsApp group is a fundamentally different, much lower-attention impression. Using 3–5% would give K ≈ 0.3 and a plan built on sand. If someone later "recalculates" K upward using the referral benchmark, that is the error, not a discovery.

**Verdict: the Patra share loop is not a growth engine. It is a trust engine.** Its real value is that it survives contact with the sceptical brother-in-law. Build it for that, and stop expecting volume from it.

### The mechanic that IS worth building

**Co-sankalp.** After booking, the buyer receives a plain link to *their own session* that others in the family can add their own sankalp to, each paying separately. No discount. No invite counter. No "invite 3 friends". One neutral sentence: *"If others in your family would like their own sankalp in this rite, this is the link to this session."*

| Sankalps per initiating buyer | Extra orders | Effective CAC multiplier |
|---|---|---|
| 1.4 | +40% | ×0.71 |
| 1.8 | +80% | ×0.56 |
| 2.2 | +120% | ×0.45 |

**At 1.8 this is 18x the impact of the share loop, at the same zero marginal cost.** It is also culturally native — families split ritual cost as a matter of course, and at a shraddh the siblings coordinate anyway. And it is the only mechanic that reliably pushes a session past the 8-sankalp break-even.

Notice the alignment: **the thing that fills sessions to profitability is the same thing that cuts CAC.** That is rare, and it is where the engineering effort should go first.

### Where the tasteless line falls

The honest question is: what makes someone share a certificate of a rite for their late father, and what makes that grotesque?

**People share because it discharges a social obligation, not because they want an audience.** The buyer's real problem is that his mother in Nagpur and his elder brother in Bengaluru need to know the rite was done properly. The artefact is *evidence for the family*, and its natural direction of travel is **up the family tree first** — to the mother, to the elder brother — and only then sideways. That is the design brief. It must be legible to a 70-year-old on a low-end Android reading Devanagari. It must not be designed for Instagram.

**It becomes tasteless the moment the audience is wrong.** A death is not content. The line, as product rules:

1. **A devotional snan may be shared publicly. A pitru rite may only be shared privately.** Enforce in code: for pitru SKUs the share sheet offers WhatsApp and message only — no social platforms — and the OG image for a pitru rite page carries **no name**.
2. **Snanify never shares. The buyer shares.** No public gallery. No "X snans offered" counter. No testimonial naming a deceased person — `ethics.md` line 183 already bans this and it is right.
3. **The artefact states facts, not blessings.** Karta name and gotra, pitru named with relationship, tithi, ghat, officiant's name, timestamp, rite code, verify URL. **No seal, no crest, no "blessed by", no lotus-and-gold.** The adversarial review's phrase — *facts, not a diploma for grief* — is exactly right, and it is also the **more shareable** design, because a factual record reads as dignified and a certificate reads as a purchase receipt.
4. **Offer the share once, quietly, on the rite page. Never in the delivery message.** The message that tells a man his father's rite was performed must not also ask him to market.
5. **No incentive, ever.** No "$5 off", no invite counters, no leaderboards.

### The verification trap

`trust.ts` states plainly that a video forwarded through WhatsApp is recompressed and **will fail** the `/verify` fingerprint check. If the shared clip is the same artefact as the verifiable one, then the sceptical relative the whole loop exists to convince gets **NO MATCH** — manufacturing precisely the accusation the verifier was built to pre-empt.

**Fix: the shared clip must be a separately fingerprinted artefact, and the share card must carry the rite code and the verify URL burned into the image**, so the sceptic can verify from the picture without ever handling a file.

---

## 5. WhatsApp: how this actually travels

WhatsApp is used by 98% of Indian internet users (853.8M), ~124M in the US, 41.4M in the UK. It is not *a* channel for this product; it is the medium the family runs on.

**Two forwardable objects, both files, not links.** Older family groups forward files reliably and treat links with suspicion.
- **Share card**: 1080×1350 PNG, server-rendered, brand typography, carrying the facts above plus the rite code and verify URL.
- **The Naam Kshan clip**: a 30–40 second auto-cut — a few seconds before the name is spoken through the dip. **Under 16MB** so WhatsApp does not recompress it into mush. Contains that family's names and no one else's, per the privacy commitment in `trust.ts`.

**Delivery is to the buyer only.** Never to a third party's number the payer supplies. That is unsolicited third-party messaging — a WhatsApp Business Policy violation, PECR/TCPA exposure, and an unrequested message to a grieving elderly parent who never consented. `ethics.md` already implies this; make it explicit in the code path.

**Use the WhatsApp Business Cloud API with utility templates** for the four transactional moments only: booking confirmed, muhurat starting in 1 hour (in the buyer's timezone), rite performed + Patra ready, Panji tithi notice. I have not verified current per-message pricing and you should before budgeting; India-destination utility messages are among the cheapest tiers and US-destination among the more expensive.

**One hard cap, enforced in the sending code, not in a config a growth tool can override:** ≤1 tithi reminder per registered name per calendar year, +1 Pitru Paksha notice per user per year. Write it as an assertion with a test. This is the constraint that will be under the most pressure in month nine.

---

## 6. Channels ranked, by CAC against a $7.77 ceiling

| Rank | Channel | CAC | Verdict |
|---|---|---|---|
| **1** | **Co-sankalp basket expansion** | ~$0 marginal | Build first. +40–120% orders, and it fills sessions. |
| **2** | **SEO / content** | $100 → $28 → $8/order across yrs 1–3 | A capital investment that goes negative-cost, not a cheap channel. $25k sunk. |
| **3** | **WhatsApp artefact loop** | ~$0 marginal | +4.5% orders. Real value is trust, not volume. |
| **4** | **Always-on YouTube ghat stream** | ~$0 marginal | The camera is infrastructure you need anyway. Captures "har ki pauri live". Highest proof value per dollar in the plan. |
| **5** | **Temple / samaj associations** | $2.75 cash, but ~20 founder-hrs/deal | **Do exactly three.** Take naming rights and a quote, not volume. |
| **6** | **Regional & linguistic associations** | as above | Your six rivers map onto six linguistic communities. Higher fit than generic temple outreach, same cost shape. Wave two. |
| **7** | **Diaspora purohit affiliate** | 20% rev-share | Position as *the river half* of their service. Must be disclosed on-site as a paid referral. |
| **8** | **Facebook diaspora groups / Reddit / Quora** | ~$0 | **Distribute the free `/panchang` tool, never the product.** Works exactly once per community; do not burn it on an ad. |
| **9** | **Puja-app partnerships** | rev-share | Sri Mandir has ~4M MAU and 20% diaspora revenue. You are a snan supplier they lack. Real, but it makes you a commodity. Defer. |
| **10** | **Astrologer / panditji influencers** | varies | **Reject.** This is the fear-selling adjacency. Sharing a category with remedial-puja funnels is a brand contaminant, not an opportunity. |
| **11** | **Paid search** | $24–$150 | **Dead.** 3–19x over ceiling. |
| **12** | **Paid social** | ~$140 | **Dead.** 18x over ceiling, and no religion targeting exists anyway. |
| **13** | **Funeral homes** | n/a | Highest intent, worst possible place to sell. Informational listing only, never a commission on a bereavement referral. |

**On paid, one clarification.** `growth.md` proposes capping paid search to five narrow seasonal windows. Even the best case I can construct — $1.20 CPC, 5% landing conversion — is $24 CAC, **3.1× over the ceiling**. And Google's sensitive-category rules mean you cannot retarget the visitor or build a lookalike off your buyers, so you never earn the second-touch efficiency that normally rescues an expensive first click. **Cut it to zero.** Revisit only if AOV triples.

---

## 7. Seasonality: what it means for cash and staffing

**The shape, from the verified data:**

- **Sep–Oct** — Pitru Paksha (26 Sep – 10 Oct 2026, Sarva Pitru Amavasya 10 Oct). Highest *intent* of the year. **31 Oct: Simhastha Dhwajarohan.**
- **Nov** — Kartik Snan season, Kartik Purnima 24 Nov 2026. Low attention, purest category fit.
- **Dec** — **secondary trough.** Every index at or near annual low.
- **Jan–Feb** — Makar Sankranti (302k), Magh Snan, Mauni Amavasya, Mahashivratri (239k). **Highest attention of the year.**
- **Mar–May** — **the real trough.** March and April are the verified annual minimum for essentially every occasion.
- **May–Jun** — Ganga Dussehra (4.6k). Small but perfectly on-brand.
- **Jul–Aug** — Guru Purnima, Shravan, Karkidaka Vavu Bali. **Aug–Sep 2027: two Simhastha Amrit Snans.**

**Cash.** Peak-to-trough is severe. `growth.md`'s rule — **enter March holding four months of fixed cost** — is right and I would not soften it. The counter-cyclical fillers, ranked by evidence: monthly **Amavasya** (flat, 12x/yr, legitimately a pitru occasion), per-family **tithi** via the Panji (uniformly distributed by construction), and **Ganga Dussehra** in May. March–April genuinely has nothing festival-shaped. **The honest answer is not to invent a March festival — it is that Ujjain Simhastha runs March–May 2028, directly through your worst months.** That is the structural fix, and it is another reason the Simhastha content must be built now.

**Staffing — and a correction.** One officiant running five 45-minute sessions a day at 51 sankalps each is **255 sankalps/officiant/day**. Two officiants across the 16 days of Pitru Paksha is **8,160 sankalps of capacity at one ghat.** You will not come close. **Demand is the constraint, not supply. Do not pre-buy officiant capacity, do not sign annual contracts, pay per rite** with a retainer only at the two peak ghats. Redundancy — a second officiant who can step in — matters far more than throughput.

---

## 8. The launch sequence, and the first 100 customers

Today is 11 August 2026. Pitru Paksha 2026 runs 26 Sep – 10 Oct. **That is 46 days, and the repo contains twelve marketing routes and no backend.**

**Days 0–7 — fix what is broken and ship the free tool**
1. Delete `1,20,000+ Sankalps offered` and `48 Countries served` from `content.ts`, both locales. Today.
2. Resolve the **51-vs-11 contradiction** between `rituals.ts` and `trust.ts`, and publish the number.
3. Ship JSON-LD, hreflang in `<head>` with `x-default`, de-yeared slugs with 301s, query-shaped titles, rewritten meta descriptions.
4. **Ship `/panchang`**: every Pitru Paksha 2026 tithi with the **aparahna kala** window converted to US Eastern, US Pacific, UK, Toronto, Sydney, Dubai, Singapore. Source named. No email gate on the data; an optional opt-in below it.

**Days 7–21 — distribute the tool, not the product.** Target 800 opt-ins.

**Days 21–35 — build checkout for exactly one SKU and one session.** Charge on performance or hold in escrow, not on booking. Ship the distance-selling waiver for EU/UK.

**26 Sep – 10 Oct — the pilot. One Samuhik session of 51 sankalps on Sarva Pitru Amavasya, 10 October 2026,** at Har Ki Pauri. Plus up to five Ekantik rites. Cap enrolment publicly. Do not open a second session if it sells out — that is a good problem and the answer is a waitlist for Kartik. Founder-operated, every customer contacted personally.

**Before 31 Oct — publish `/kumbh/nashik-2027`.**

**24 Nov — Kartik Purnima.** Second session, second ghat. Not a "commercial launch"; a rehearsal with 2,409 monthly pageviews of ambient attention.

**Jan–Feb 2027 — Makar Sankranti, Mauni Amavasya, Magh.** The attention peak. This is where the SEO investment first pays and where you sell the annual tier.

**Aug–Sep 2027 — Simhastha Amrit Snans.** The commercial event the whole year is built toward.

### The first 100 customers, concretely

| # | Source | How |
|---|---|---|
| 10–20 | Founder's own network | Not a channel. They are the ones who forgive a rough first run and tell you the truth. |
| 20–30 | **Reddit** — r/hinduism, r/ABCDesis, r/nri, r/india | Post the **timezone-converted Pitru Paksha tithi calendar with aparahna windows**, as a free tool, with no product pitch. It is genuinely absent from the web. Answer questions in the thread as the person who built it. |
| 15–20 | **Quora & forum answers** | "Can I perform shraddh from abroad", "how do I find my gotra", "when is aparahna kala". Real answers, properly sourced, link at the bottom. |
| 15–20 | **Facebook diaspora groups** — "Indians in Houston/NJ/Toronto/Leicester" | Same tool, same no-pitch rule. Works once per community. Do not burn it on an ad. |
| 10–15 | **Two temples**, not twenty | One named person who will vouch. A co-branded page. Ask for the notice board and the newsletter, not a commission. |
| 10–15 | **The founder's own WhatsApp family groups**, plus ~20 hand-identified community groups reached **through a person** | Never a blast. A blast into a family group is the end of the brand in that family. |
| 5–10 | **Co-sankalp** off the first 40 | The siblings of the first buyers. Zero cost. Also your first measurement of the ratio that decides the whole model. |

**Total media spend: $0.**

---

## 9. On the ethics line, where it should move and where it must not

You asked me to argue explicitly if I think the line should move.

**It should not move on the rite.** Every mechanic above works without touching it. That is not a coincidence — the constraint is doing real work. Paid acquisition is unavailable to you *anyway*, so the honest channels are the only channels, and the honest channels reward exactly the assets the ethics page forces you to build: a verifiable record, a published officiant share, an artefact made of facts. The line is not a tax here. It is the strategy.

**Three places the current documents cost you needlessly, and the fixes are free:**

1. **Provenance honesty has leaked into the SERP snippet.** "Provisional · to be confirmed against the panchang" is the right sentence in the wrong 155 characters. Keep it on the page, next to the date. Get it out of the meta description.
2. **The homepage does the opposite.** `1,20,000+ sankalps` and `48 countries` are a false claim in the most visible slot on a site whose whole position is honesty. This is not a Reddit risk, it is misleading-advertising exposure under the UK CAP Code, FTC Section 5 and India's Consumer Protection Act 2019.
3. **Session fill count is a fact, not scarcity.** `ethics.md` bans "only N slots left" and it should. But `trust.ts` already commits to publishing `sankalpCount` in the public ledger. Showing **"17 of 51 sankalps offered in this session"** is therefore a disclosure you have already promised, not a scarcity widget — provided it never carries a countdown, a colour change, or urgency language. That distinction is worth writing into the lint explicitly, because it will be litigated internally.

**One place the line has a price you should say out loud.** The Panji reminder may carry the date and nothing else — no booking button. That is correct and it should stay. But it means your headline retention mechanic will show a conversion rate indistinguishable from zero in any dashboard. Write down now, in the same document as the rule, that this is the intended behaviour and that the metric is *reminders delivered*, not *bookings attributed*. Otherwise a growth hire in month nine will "fix" it in an afternoon.

**One place I would push back on the existing plan for ethical, not commercial, reasons.** Prayag Pandits charges a **50% surcharge on Sarva Pitru Amavasya** — ₹16,500 against ₹11,000. Peak pricing on a grief date is normal in this category and someone will propose it here. It is grief pricing, it will be described that way by the first journalist who compares the two price points, and it is wrong independent of the optics. **Decide now, in writing, that peak dates are never surcharged.** Then say so on the pricing page. It is the cheapest brand asset available to you.

---

## 10. What I could not verify

- **Search volume and CPC for every target query.** No public source exists; the tools that have the data are gated. My CAC figures use ASSUMPTION CPC and conversion inputs, shown in full. The *conclusion* holds across the plausible range, but replace the specific dollars with a $500 Google Ads test in one narrow window before anyone plans around them.
- **Ujjain Simhastha 2028 dates.** Sourced only to a tour operator. Do not publish.
- **WhatsApp Business Platform per-message pricing** by destination country. Verify before budgeting.
- **Ops, streaming and payment-fee inputs** to the session model. Structure is verified from `trust.ts` and `ethics.md`; the numbers are mine and are marked ASSUMPTION.
- **The transliterated-vs-Devanagari search claim.** Inferred from SERPs, not from locale data. Low confidence. Validate in Search Console within 90 days.
- **Attendance figures for Prayagraj Maha Kumbh 2025**, which I deliberately did not use — the widely quoted ~660 million is an administrative estimate, not a measurement, and this plan does not need it.

---

## Adversarial review

**Verdict:** needs-work

### Wrong or unverified

- THE 62.9% BLENDED CONTRIBUTION MARGIN IS NOT DERIVABLE AND IS ARITHMETICALLY IMPOSSIBLE. The best single-tier margin in the doc's own table is Samuhik at full 51 seats: $339.65/$561 = 60.5%. A blended figure cannot exceed the best component unless another tier beats 62.9%. Ekantik does not: at $108 with the published officiant rate of Rs4,000 flat (docs/design/ethics.md line ~410, 'Ekant Snan (private) | Rs4,000 flat') = $45.98 at the doc's own Rs87/USD, plus its own $45 ops, $8.35 streaming, $4.73 Stripe = $104.06 total, contribution $3.94, margin 3.6%. Add the published Rs600/segment camera line and Ekantik is NEGATIVE $2.96. The 62.9% appears to mix marginal costing for Parivar with fully-loaded costing for Samuhik. Corrected blended, using the doc's own 70/20/10 mix and generously marginal-costing Parivar: 0.7(6.66) + 0.2(22.88) + 0.1(3.94) = $9.63 per order, not $15.53. Overstated by 61%.
- EVERY DOWNSTREAM NUMBER MOVES AND ONE CONCLUSION FLIPS. Corrected LTV at 1.5 orders = $14.45, not $23.30. CAC ceiling at LTV/3 = $4.82, not $7.77. Consequence the doc does not draw: SEO at 3,000 orders/yr ($8.33/order) is no longer 'at ceiling' in year 3, it is 1.7x OVER it. So the analysis kills paid and reallocates $25,000 to a channel that its own corrected model also cannot afford. Recommendations 3, 9 and 10 rest on the overstated margin.
- TWO PUBLISHED COST LINES ARE OMITTED FROM THE MODEL ENTIRELY. ethics.md publishes 'Ghat assistant / camera | Rs600 per segment' and 'Ghat lead availability retainer | Rs8,000 / month | Covers brahma-muhurat scheduling'. Neither appears anywhere in the cost stack. A 51-sankalp session is ~5 segments (segment cap is 11), so camera alone is 5 x Rs600 = Rs3,000 = $34.48, i.e. 10% of the claimed $339.65 session contribution. The retainer across six ghats is Rs48,000/mo = ~$6,624/yr fixed, which at 3,000 orders is $2.21/order, roughly half the corrected CAC ceiling.
- OFFICIANT PAY IS APPLIED PER SESSION WHEN THE PUBLISHED FORMULA IS PER SEGMENT. ethics.md 4.4: 'Per segment: max(Rs1,800 flat, 20% of that segment's gross revenue)' with the worked example explicitly at 11 sankalps. The model applies one floor and one 20% to a 51-sankalp session. At 51 split 11/11/11/11/7 the last segment hits the floor: 4 x Rs2,105 + Rs1,800 = Rs10,220 = $117.47, not $112.20. Small on its own; combined with the omitted per-segment camera it means the doc modelled a five-segment session as a one-segment session.
- THE '51 vs 11 CONTRADICTION' FINDING IS MISDIAGNOSED, AND THE REAL CONTRADICTION SITTING NEXT TO IT WAS MISSED. Session (51) and segment (11) are consistently nested across catalog.md and ethics.md; catalog.md line 611 says 'Samuhik recordings contain 51 households' names' while ethics.md line 674 says 'A segment may carry up to eleven'. The claimed unit-economics bomb ($561 -> $121, ceiling $7.77 -> $3.30) does not follow. What DOES contradict, and is far worse, is the recitation-time guarantee: src/content/rituals.ts line ~252 says 'A name and a gotra take about eight seconds to read. Fifty-one of them is roughly seven minutes... inside a session of forty [minutes]', while src/content/trust.ts line 145 promises 'at least forty-five seconds of recitation for every named sankalp, so a segment carrying eleven sankalps runs about nine minutes, not ninety seconds.' That is a 5.6x gap between two live, customer-facing delivery guarantees on the binding ethics surface. Selling under the 8s copy and delivering under the 45s promise (or vice versa) is exactly what trust.ts exists to prevent.
- THE CAPACITY NUMBER IS WRONG BY ROUGHLY 2-2.5x AND CONTRADICTS THE PRODUCT. '5 sessions/day x 51 = 255/officiant/day' and '2 officiants x 16 days = 8,160' ignores that the product sells a specific auspicious window. Brahma muhurat is ~96 minutes; aparahna kala, which the doc itself correctly names as the determinant for shraddh, is ~2.5 hours. You cannot run 5 sessions inside a 2.5h window. Under the rituals.ts 40-minute session that is ~3/day (153); under the trust.ts 45s/sankalp guarantee a 51-seat session is ~38 min of recitation alone plus liturgy, call it 75 min, so 2/day (102). Honest Pitru Paksha capacity at one ghat with 2 officiants is ~3,300-4,900, not 8,160. The conclusion 'demand is the constraint' survives; the figure should not be presented as settled.
- 'DO NOT PRE-BUY OFFICIANT CAPACITY' IS INCOMPATIBLE WITH THE PUBLISHED OFFICIANT COMMITMENTS. trust.ts section 06: 'Every officiant is engaged directly by Snanify, on a written contract... He is not a gig worker and this is not a marketplace.' ethics.md prices a Rs8,000/month availability retainer precisely because brahma-muhurat slots must be reserved in advance. The recommendation is a marketplace/gig posture the site has already publicly refused.
- THE DOC CITES THE SRI MANDIR DATA POINT THAT UNDERMINES ITS OWN HEADLINE AND DOES NOT ENGAGE IT. Verified: $12M run rate at start of 2025 and ~20% diaspora revenue (TechCrunch, 30 Jun 2025). The same reporting gives overseas ARPU of ~Rs7,000 (~$81) against Rs600-800 (~$7-9) in India, on ~90,000 overseas MAU. That is direct evidence the diaspora pays ~10x, and it is the strongest available signal that Snanify's $24.70 AOV is a pricing choice, not a market constraint. The honest headline may be 'the price architecture is wrong', not 'there is no paid channel'. The doc uses the $12M for a ceiling marker and drops the ARPU figure that contradicts its central premise.
- LTV/3 IS THE WRONG CAC CEILING FOR THIS BUSINESS, AND THE REPEAT RATE IS FABRICATED. 1.3/1.5/1.8 orders per customer over 3 years has no source and cannot have one: nothing has ever been sold. For an unfunded business there is no balance sheet to finance a 3-year payback, so the binding constraint is first-order contribution, i.e. ~$6.66 for Samuhik and ~$3.33 if you still want a 3x margin of safety. LTV/3 is a venture heuristic imported without justification and it is the more generous of the two available ceilings.
- THE CO-SANKALP NUMBERS ARE THE LEAST-EVIDENCED IN THE DOCUMENT AND CARRY THE TOP RECOMMENDATION. 1.4 / 1.8 / 2.2 sankalps per initiator have no benchmark, no analogue, no citation, not even an ASSUMPTION label with reasoning behind the range, while the far less consequential K-factor inputs get a sourced benchmark and an explicit caveat. '+80% orders, the single highest-leverage thing in the growth plan' is asserted on an invented number.
- '18x THE IMPACT OF THE SHARE LOOP' IS A CATEGORY ERROR. K is a self-sustaining coefficient applied to all orders and compounding across cycles; sankalps-per-initiator is a one-shot basket multiplier on initiator orders only. 80/4.5 = 17.8 is arithmetically fine and economically meaningless. Ranking the two mechanics is reasonable; quantifying the ratio is not.
- THE K-FACTOR SHARE RATE IS 2.7-8x ABOVE THE BENCHMARK THE DOC ITSELF CITES. It states 'share rate 5-15% is the published benchmark' and then uses 40% for devotional, justified only by 'WhatsApp forward culture'. That is the same wishful move the doc correctly criticises elsewhere. It happens not to change the conclusion, but it means the stated 'optimistic ceiling' of 0.132 is not an upper bound.
- MISSING FROM THE K MODEL: DATED OCCASIONS HAVE A 12-MONTH LOOP CYCLE TIME. 1/(1-K) assumes a continuously recycling loop. A Pitru Paksha share card reaches someone who cannot act for another year. Even at K=0.13 the within-year contribution is near zero for every dated occasion. This strengthens the doc's conclusion and its absence is a modelling gap, not a rounding one.
- 'NO PUBLIC CPC DATA EXISTS FOR THESE KEYWORDS IN US GEOS' IS NOT TRUE. Google Keyword Planner returns US CPC ranges for any keyword with a free active account, in under an hour. Excusing an assumption on grounds of unavailability, for a number that is trivially checkable, weakens the '3-20x over' precision even though the direction is almost certainly right.
- THE SEO COST AND ORDER MODEL IS UNSUPPORTED. 60 x $250 + $10k = $25,000 is arithmetically correct but $250/page is not a plausible cost for bilingual, devotionally-registered, panchang-accurate pages that must beat six incumbents. The model carries zero ongoing/refresh cost, and the 250 / 900 / 3,000 annual order counts that drive the per-order CAC appear with no traffic model, no CTR assumption and no conversion rate behind them.
- REGULATORY COVERAGE IS ONE-DIMENSIONAL. The only regulation examined is ad-platform targeting policy (correctly verified) plus a passing FTC/CAP/CPA-2019 mention. Unaddressed and each potentially fatal at an $11 price: (a) GST place of supply -- services relating to an event or performed on-site follow the place of performance, so a rite performed at Har Ki Pauri for a foreign recipient may NOT zero-rate as export; 18% on $11 is $1.98 against a $6.66 contribution, i.e. 30% of contribution gone. There is a 'conduct of religious ceremony' exemption, but relying on it as a commercial platform rather than a temple or trust is precisely what gets litigated. (b) FCRA 2010 -- catalog.md sells pass-through Daan (Annadaan, Gau Seva) from foreign customers to Indian recipients for religious purposes; that is a foreign-contribution licensing question, not a payments question. (c) Entity and FX structure -- who contracts the customer, who pays the officiant, and the Rs87/USD rate held as a constant across a 3-year LTV with no hedging note. (d) Recording privacy -- catalog.md line 611 already flags GDPR exposure from distributing 51 households' names, and every mechanic this doc recommends (share cards, session pages, co-sankalp links) enlarges exactly that surface without a mention.

### Missing

- THE HOMEPAGE SHIPS A FAKE LIVE COUNTDOWN, WHICH IS THE SAME CLASS OF PROBLEM AS THE FABRICATED STATS AND ARGUABLY WORSE. src/lib/content.ts hero: label 'Next muhurat', title 'Brahma Muhurat', meta '04:24 IST - Ganga, Haridwar', countdown 'opens in 6h 12m' -- all hardcoded strings, both locales (Hindi mirror at lines ~170-177). The stats are an unverifiable claim; the countdown simulates a live operational system that does not exist. The doc caught '1,20,000+' and '48 Countries' and stopped there rather than asking what else on the live site is fabricated.
- CO-SANKALP IS NEVER TESTED AGAINST THE ETHICS PAGE, AND IT IS THE ONE MECHANIC THAT NEEDS IT MOST. A family WhatsApp group in which one sibling has bought and the others are invited to add their own paid sankalp for a dead parent manufactures precisely the guilt dynamic trust.ts forbids -- the sibling who does not pay becomes visibly the one who did not honour the parent. The pressure is peer-applied rather than company-applied, but the company built the mechanism. The doc's instinct ('no discount, no invite counter, no incentive') shows awareness but never states the rule that follows: the session page must never disclose who has and has not joined, and must never show a seat counter to invitees. Escalating this to the highest-leverage recommendation without an ethics review is the biggest governance gap in the analysis.
- THE PILOT IS SCOPED ONTO THE HIGHEST-STAKES OCCASION IN THE CALENDAR. Selling 51 sankalps of a shraddh rite on Sarva Pitru Amavasya, 46 days out (verified: today 11 Aug 2026, Pitru Paksha opens 26 Sep), with no payments, no auth, no streaming, no verification endpoint and no contracted officiant, is not 'the only honest scope'. The date cannot slip and the customers are bereaved. The doc's own data supplies the better answer it does not take: Amavasya is monthly and evergreen, so an 11-sankalp pilot on a non-shraddh amavasya tests the identical unit -- one officiant, one session, one segment, Patra, Naam Kshan, verify URL -- with a recoverable failure mode and a rerun 29 days later.
- NO SENSITIVITY ANALYSIS ON THE ONE INPUT THAT DECIDES EVERYTHING. $45/session ops is flagged ASSUMPTION and then never varied, yet it is the largest fixed cost and it single-handedly sets the 8-sankalp break-even. At $25/session break-even falls to ~5; at $70 it rises to ~12 and the 'converge orders onto the same session' thesis becomes a much harder operational problem. A one-line tornado on ops cost, officiant floor and FX would have been worth more than the K-factor section.
- NO GEOGRAPHIC VALIDATION OF THE PAGEVIEW PROXY, WHICH IS WHAT THE PAGE RANKING ACTUALLY TURNS ON. The doc raises the informational-vs-purchase-intent caveat and then overrides it on magnitude ('125x is too large'). But the real problem is geography, not intent: English Wikipedia traffic for Makar Sankranti and Mahashivratri is overwhelmingly India-resident, i.e. the market the plan explicitly declines to enter. The Wikimedia API exposes no per-country breakdown per article, so this cannot be tested from the chosen source -- which makes the ranking unsafe rather than verified. Building 302k and 239k top-of-funnel guides may import traffic that will not pay $11 USD. Google Search Console or Keyword Planner with US geo-filtering would settle it.
- NO REFUND, FAILURE OR DISPUTE COST IN THE UNIT ECONOMICS. catalog.md line 148 already commits: stream drops >90s during the sankalp or snan segment triggers a free re-performance or full refund, offered proactively within 3 hours. Live streaming from six Indian ghats at brahma muhurat will breach that threshold at a non-trivial rate, and a re-performance means paying a second officiant segment on zero incremental revenue. At even a 5% failure rate this is a meaningful line against a $6.66 contribution, and it is absent. Stripe fees are also not reversed on refund.
- NO COST FOR THE ONE THING THE OWNER SAID HE WANTS (near-zero human minutes). Support, dispute handling, gotra-field confusion, name transliteration and pronunciation checks, and the officiant-refusal re-routing that trust.ts promises ('we find another officiant at once, at no cost to you') are all human minutes on a $11 order. The doc asserts zero-marginal-cost growth without ever costing the service tail. One 10-minute support contact at any plausible loaded rate consumes the entire Samuhik contribution.
- THE $120k-$240k YEAR-3 CEILING IS DERIVED AND THEN NOT INTERPRETED. At $24.70 AOV, $240k is ~9,700 orders; at the corrected $9.63 contribution that is ~$93k of contribution before any fixed cost, founder time or the Rs8,000/mo/ghat retainers. Against the owner's stated goal ('it should make good money'), the doc's own ceiling marker says this is a lifestyle business at current pricing. That is an honest and highly decision-relevant conclusion and the analysis stops one line short of stating it -- which is also the conclusion that most strongly motivates revisiting price rather than channel.
- THE DELIVERABLE IS TRUNCATED. The final recommendation cuts off mid-sentence at 'Add five occasions that'. Whatever it proposed is unreviewed.

### Must survive

- The Wikimedia pageview work is the strongest thing in the document and I reproduced it to the digit. Gotra monthly Aug-25 to Jul-26 returns exactly 17759, 19077, 16651, 14917, 13026, 13092, 10730, 10418, 9986, 11515, 10496, 10530, summing to 158,197 as claimed. Kartik Purnima peak 2,409 (Nov-25), Makar Sankranti peak 302,456 (Jan-26), Pitru Paksha peak 35,548 (Sep-25), Amavasya trough 2,053 (Apr-26) all verified exactly. Every figure is exactly reproducible from a cited public API. This is the standard the rest of the document should have been held to.
- The Kartik Purnima demolition is correct and valuable. It is the purest snan occasion and the obvious category-ownership page, and it is also 125x smaller than Makar Sankranti in verified attention. Telling the founder his nominated 'first real commercial moment' cannot carry a launch, with data rather than opinion, is exactly the job.
- The Amavasya insight is the best original strategic finding in the document. Never below 2,053/month, twelve occurrences a year, legitimately a pitru tarpan occasion, already an evergreen slug with cadence 'monthly' in muhurat.json, and two of the three Nashik Amrit Snans fall on amavasyas. Counter-cyclical revenue that also compounds into the Simhastha peak is a genuinely non-obvious connection, and it is also the right pilot occasion (see missing).
- The SERP structure finding -- tarpan/pind-daan contested by at least six transactional operators, snan booking empty -- is the most commercially valuable observation here, because it converts 'snan as an owned category' from a positioning assertion into an evidenced gap. Naming the six incumbents and noting Sri Mandir's absence from occasion+geo long-tail is the right level of specificity.
- The Kumbh timing finding is verified and materially valuable. I independently confirmed the 31 Oct 2026 dhwajarohan at Ramkund/Panchavati/Trimbakeshwar at 12:02pm, the close on 24 Jul 2028, and the three 2027 Amrit Snan dates (2 Aug, 31 Aug, 11/12 Sep), with government framing corroborated via newsonair.gov.in. Ram Kund/Godavari and Ram Ghat/Shipra are both already Snanify ghats. Correctly downgrading the Ujjain 2028 window to LOW confidence because it sources only to a tour operator is exactly the right discipline.
- The ad-platform policy verification is correct and correctly bounded. Google's sensitive-interest-category policy does list religious beliefs and does prohibit Customer Match, your-data segments, audience expansion and lookalikes; keyword-targeted Search remains permitted; Meta removed religious-practice detailed targeting on 19 Jan 2022. I confirmed the Google policy language directly. Converting a previously unsourced assumption in growth.md into a cited fact is real work, and the 'unaffordable AND untargetable' framing is the right one-two.
- The technical SEO findings all reproduce against the live site. curl on https://www.snanify.com/ and /muhurat/pitru-paksha-2026 returns 0 occurrences of application/ld+json and no hreflang in head on both. The Pitru Paksha title is exactly 'Pitru Paksha, Muhurat calendar - Snanify' and its meta description does end 'Provisional - to be confirmed against the panchang'. Nine of thirteen slugs do carry the year. The year-stamped-slug argument is the correct call for a business whose entire thesis is compounding organic.
- Deleting '1,20,000+ Sankalps offered' and '48 Countries served' is the right #1 action and correctly framed as legal rather than merely reputational. Verified present in src/lib/content.ts at lines 40-44 (EN) and 173-177 (HI). Zero engineering cost, on the homepage of an honesty-positioned product that has never performed a rite.
- The core structural insight -- that the binding growth job is converging orders onto the SAME session rather than generating orders in aggregate -- is correct, non-obvious, and survives every correction I made to the numbers. It gets stronger under the corrected margin, not weaker. Ranking co-sankalp above the share card follows from it and is right even though the specific multipliers are invented.
- Refusing to copy Prayag Pandits' 50% Sarva Pitru Amavasya surcharge (Rs11,000 -> Rs16,500) and naming it grief pricing is exactly the ethics reasoning the site's published commitments require, applied unprompted to a competitor practice. Same for flagging that gotra-as-required-field is a caste filter and proposing Kashyapa as the documented accepted convention -- that is a real product decision surfaced from a keyword research finding.
- The Gotra page recommendation is well-argued from the data: largest single informational query in the space, no seasonality, low-authority incumbents, and it doubles as the fix for the field most likely to cause checkout abandonment. 'The page pays twice' is correct.
- The honesty discipline in the evidence fields is generally good and should be preserved: labelling the Devanagari-vs-transliteration claim 'low' confidence with an explicit 'no public source exists', flagging the temple counts as commercial POI databases rather than a registry, flagging the WhatsApp figures as aggregator stats, and noting the Pitru Paksha 2026 dates source only to commercial operators and should pass the site's own Sourced<T> discipline before shipping. That is the right instinct; it just needs applying to the unit economics with the same rigour.