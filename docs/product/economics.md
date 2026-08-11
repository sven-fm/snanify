# Snanify: Unit Economics, Pricing and Monetisation

**The Samuhik batching engine works, but its margin ceiling is ~64% not ~95% — because officiant pay, payment fees and the refund promise are all variable — and the single biggest lever available is not batching harder, it is moving Ekal from $11 to $21.**

> Adversarial review: **needs-work**

## Key numbers

```
FX used throughout: **₹95.24 = $1** (Fed H.10 / market, 10 Aug 2026 — VERIFIED). Note the catalog is built on ₹88; every INR figure in docs/design/catalog.md is ~8% stale.

**SESSION STRUCTURE (derived from your own published rules, not invented)**
- Ethics page: ≥45 seconds of recitation per named sankalp.
- Ethics page: a *segment* carries at most 11 sankalps (privacy cap).
- Catalog: a *session* carries at most 51 sankalps.
- Therefore: segments per session = ceil(n/11). n=5 → 1 segment. n=20 → 2. n=51 → 5.
- Session recitation time = n × 45s + segments × ~3 min overhead (slate, dip, closing).
  n=5 → 6.75 min · n=20 → 21 min · n=51 → **53 min**.

**COST STACK PER SESSION — CURRENT $11 EKAL**

| | n=5 | n=20 | n=51 |
|---|---|---|---|
| Gross | ₹5,238 ($55) | ₹20,953 ($220) | ₹53,430 ($561) |
| Officiant `max(₹1,800, 20% of segment gross)` | ₹1,800 | ₹4,190 | ₹11,016 |
| Ghat operator / camera (₹600/segment) | ₹600 | ₹1,200 | ₹3,000 |
| Streaming + 24-mo storage | ₹400 | ₹900 | ₹1,900 |
| Payment fees (4% + $0.30/order) | ₹352 | ₹1,410 | ₹3,594 |
| Support (₹25/order automated + 3% human) | ₹125 | ₹500 | ₹1,275 |
| Refund/chargeback reserve (4.3%) | ₹225 | ₹901 | ₹2,297 |
| **Total direct cost** | **₹3,502** | **₹9,101** | **₹23,082** |
| **Cost per sankalp** | **₹700 ($7.35)** | **₹455 ($4.78)** | **₹453 ($4.76)** |
| **Contribution** | ₹1,736 | ₹11,852 | ₹30,348 |
| **Contribution margin** | **33.1%** | **56.6%** | **56.8%** |
| Contribution per session | $18 | $124 | **$319** |

**COST STACK PER SESSION — RECOMMENDED $21 EKAL**

| | n=5 | n=20 | n=51 |
|---|---|---|---|
| Gross | ₹9,999 ($105) | ₹39,999 ($420) | ₹101,952 ($1,071) |
| Officiant (20% — floor stops binding at n≥5) | ₹2,000 | ₹8,000 | ₹20,390 |
| Ghat operator / camera | ₹600 | ₹1,200 | ₹3,000 |
| Streaming + storage | ₹400 | ₹900 | ₹1,900 |
| Payment fees | ₹543 | ₹2,171 | ₹5,537 |
| Support | ₹125 | ₹500 | ₹1,275 |
| Refund reserve (4.3%) | ₹430 | ₹1,720 | ₹4,384 |
| **Total direct cost** | **₹4,098** | **₹14,491** | **₹36,486** |
| **Cost per sankalp** | **₹820 ($8.61)** | **₹725 ($7.61)** | **₹715 ($7.51)** |
| **Contribution margin** | **59.0%** | **63.8%** | **64.2%** |
| Contribution per session | $62 | $268 | **$687** |

Doubling the Ekal price **doubles contribution per full session ($319 → $687)** and lifts mature-session margin 56.8% → 64.2%. Cost per sankalp rises only because the officiant's 20% share rises with price — which is the point.

**THE MARGIN CEILING, ITEMISED (at $21, full session)**
Officiant 20.0% · payments 5.4% · refund reserve 4.3% · camera 2.9% · streaming 1.9% · support 1.3% = **35.8% variable**. That is the floor under your COGS. "Marginal cost of an additional sankalp ≈ zero" is false. The marginal cost of the 51st sankalp is **₹715 ($7.51)**, of which ₹400 is the officiant's contracted 20%.

**REVENUE PER OFFICIANT-HOUR (the real engine)**
Full session: ₹101,952 gross ÷ 53 min = **₹115,400/officiant-hour ($1,212)**. Officiant keeps ₹23,080/hour. Against PLFS urban regular-salaried mean of ₹24,434/**month** (VERIFIED), a full session pays an officiant ~7 months of median urban salaried income for 53 minutes. That is the whole business in one number, and it is also your strongest ethical fact.

**BLENDED UNIT ECONOMICS AT RECOMMENDED LADDER**
Mix 40% Ekal $21 / 25% Parivar $51 / 15% Pitru Tarpan $51 / 12% Ekantik $151 / 8% Varsh $251.
AOV = 8.40+12.75+7.65+18.12+20.08 = **$67.00**
Contribution = 5.41+8.35+5.01+9.61+11.65 = **$40.03 (59.7%)**

**FIXED COSTS**
Platform $2,550/mo (hosting $250 · Stream+SaaS $150 · email $50 · multi-jurisdiction tax compliance $800 · legal+officiant insurance $400 · India statutory/CS/audit $300 · panchang licence $100 · third-party rite audit $500). Per-ghat $242/mo (₹8,000 retainer + ₹5,000 connectivity + ₹10,000 assumed permission/samiti fee). Two ghats → **$3,034/mo**.

**BREAK-EVEN**
- Platform only: $3,034 ÷ $40.03 = **76 orders/month**
- + founder comp $4,000: **176 orders/month**
- + marketing at 15% of revenue (contribution net of CAC = $30.98): $7,034 ÷ $30.98 = **227 orders/month ≈ $15,200 revenue/month**
- In sessions, at 14 sankalps/session average: **~16 sessions/month = 4 sessions/week.** Write that number on the wall.

**CAPACITY CEILING (not binding for years)**
2 ghats × 2 sessions/day × 51 = 204 sankalps/day = ~6,100/month = **$409k/month** at $67 AOV. Demand is the constraint, not supply — which means every operational decision should optimise for session *fill*, not session *count*.

**CONTRIBUTION PER OFFICIANT-MINUTE (the scarce input, ranked)**
| SKU | Officiant min | Contribution | $/min |
|---|---|---|---|
| Ekal $21 in a full segment | 0.75 | $13.53 | **$18.04** |
| Parivar $51 | 2.0 | $33.39 | **$16.70** |
| Varsh $251 (12×45s) | 9.0 | $145.62 | **$16.18** |
| Deep Daan $11 attached to an existing order | ~1.0 | $8.23 | **$8.23** |
| Pind Daan $251 | 45 | ~$130 | $2.89 |
| Pitru Tarpan $51 (12 min) | 12 | $33.39 | $2.78 |
| Ekantik $151 | 30 | $80.07 | $2.67 |
| Smaran $81/yr (2 rites) | 24 | $55.32 | $2.31 |
| **Sankalpit Japa $51 (55 min claimed)** | 55 | ~$10 | **$0.18** |
| **Sankalpit Japa $51 (3 hrs actual)** | 180 | **negative** | **−$0.10** |

**12-MONTH PROJECTION** (orders/month, indexed from launch; peaks = Pitru Paksha, Kartik, Makar Sankranti)

| | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 | M11 | M12 | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Conservative | 15 | 25 | 45 | 40 | 35 | 45 | 55 | 60 | 70 | 85 | 95 | 110 | **680** |
| Base | 30 | 60 | 130 | 100 | 90 | 120 | 150 | 180 | 220 | 280 | 340 | 420 | **2,120** |
| Optimistic | 60 | 140 | 380 | 280 | 240 | 320 | 420 | 520 | 650 | 820 | 1,000 | 1,250 | **6,080** |

| | Revenue | Contribution | Fixed | Marketing | EBITDA pre-founder | M12 run-rate |
|---|---|---|---|---|---|---|
| Conservative | $45,560 | $27,220 | $36,408 | $6,834 (15%) | **−$16,022** | $88k ARR |
| Base | $142,040 | $84,864 | $37,376 | $21,306 (15%) | **+$26,182** | $338k ARR |
| Optimistic | $407,360 | $243,194 | $42,000 | $73,325 (18%) | **+$127,869** | $1.005M ARR |

Sanity check against real comparables: AppsForBharat (Sri Mandir) did ₹18.53 crore (~$2.2M) operating revenue in FY24 with 40M downloads and $33M raised; VAMA did ₹20 crore (~$2.4M) in FY25 (both VERIFIED). A bootstrapped, diaspora-only, SEO-led entrant hitting $338k in year one is aggressive but inside the envelope. $1M is the tail, not the plan.

**CASH vs REVENUE (base case)**: 170 Varsh × $251 = $42,670 collected; ~55% unperformed at M12 = **$23,468 deferred liability**, refundable pro-rata with no expiry forfeiture per your own ethics page. Do not read it as profit.
```

## Findings

**The Samuhik batching engine does not drive marginal cost toward zero. Contribution margin plateaus at ~57% (at $11) or ~64% (at $21) from about 20 sankalps and does not improve further.**  
*high confidence.* ARITHMETIC (VERIFIED against your own docs). Variable cost stack at full session: officiant 20.0% (contracted, per docs/design/ethics.md §6 pay formula) + payments 5.4% + refund reserve 4.3% + camera ₹600/segment 2.9% + streaming 1.9% + support 1.3% = 35.8%. Marginal cost of the 51st sankalp at $21 = ₹715 ($7.51), not ~₹0. The gain from batching is entirely in the 5→20 range (33.1% → 56.6% at $11).

**Ekal at $11 is priced ~50% below what the diaspora market demonstrably pays. Raising it to $21 doubles contribution per full session from $319 to $687 and lifts mature margin from 56.8% to 64.2%.**  
*high confidence.* VERIFIED comparables: Sri Mandir's ARPU abroad is ₹7,000/yr (~$81) vs ₹600-800 in India, and ~20% of platform revenue comes from the diaspora (TechCrunch, 30 Jun 2025). Prayag Pandits lists online Prayagraj pind daan at ₹7,100 (~$75), Gaya at ₹11,000 (~$116), Tripindi Shraddh at ₹22,000-31,000 ($231-326). Pew (2023): Indian-headed US household median income $151,200. ARITHMETIC for the margin uplift is in the numbers field.

**Raising Ekal to $21 also fixes the officiant floor problem. Under max(₹1,800, 20% of segment gross), the ₹1,800 floor stops binding at 5 sankalps instead of 9.**  
*high confidence.* ARITHMETIC: floor binds while 0.20 × n × price × 95.24 < 1800. At $11: n < 8.6. At $21: n < 4.5. VERIFIED against the formula published in src/content/trust.ts s6.pay.

**The catalog's premium Ekantik-only recitation SKUs (Sankalpit Japa $51, Path $51) are the worst products in the catalog per unit of the only scarce input, and Japa is loss-making at its true duration.**  
*high confidence.* ARITHMETIC: Japa 1,008 at $51 with 55 min of dedicated officiant time yields ~$10 contribution = $0.18/officiant-minute. Your own adversarial review in docs/design/catalog.md states 1,008 Gayatri ≈ 3 hours; at 180 min the SKU is contribution-negative. Compare Ekal $21 in a full segment at $18.04/officiant-minute — 100x better.

**A foreign-incorporated Snanify cannot practically sell into India. The only compliant route to collect INR from Indian consumers is via an RBI-authorised cross-border payment aggregator, and the foreign entity would additionally be an OIDAR supplier owing 18% IGST with no input credit.**  
*high confidence.* VERIFIED: RBI PA-CB circular 31 Oct 2023 brings all cross-border collection under PSO authorisation (net worth ₹15cr rising to ₹25cr by 31 Mar 2026). Stripe India requires a registered Indian business entity (docs.stripe.com/india-accept-international-payments; invite-only). The Oct 2023 OIDAR amendment deleted the 'minimal human intervention' test, widening scope to human-delivered services supplied over the internet, with mandatory registration regardless of turnover.

**The single biggest tax risk to the Indian-entity structure was repealed on 30 March 2026. Section 13(8)(b) of the IGST Act was omitted by the Finance Act 2026, so intermediary services to foreign recipients now qualify as zero-rated exports.**  
*high confidence.* VERIFIED: Grant Thornton India analysis of Finance Act 2026, following GST Council 56th meeting (Sept 2025). Place of supply for intermediary services moved from supplier location to recipient location, effective on Presidential assent, 30 Mar 2026. Previously this was the provision that could have made all diaspora revenue domestically taxable at 18%.

**Whether domestic Indian sales are GST-exempt turns on a characterisation you have already published the losing argument for. Entry 13(a) of Notification 12/2017-CT(R) exempts 'services by a person by way of conduct of any religious ceremony' with no trust requirement — but your ethics page says Snanify 'is not a temple and is not your purohit'.**  
*medium confidence.* VERIFIED: Entry 13(a) applies to 'services by any person', unlike 13(b) which requires 12AA/12AB registration. But exemption notifications are strictly construed (AAR precedent), and the department's natural argument is that Snanify supplies arrangement, recording and verification services while the officiant conducts the ceremony. src/content/trust.ts s1 body[0] states exactly that separation. Swing is 18% of every Indian order.

**UK and EU sales carry VAT from the first transaction with no threshold, and a live-streamed rite is squarely inside the 2025 EU virtual-events rule. This is a 20%+ margin event if not priced in.**  
*high confidence.* VERIFIED: HMRC treats non-established taxable persons as having a nil VAT registration threshold — the £90,000 threshold does not apply to overseas businesses. From 1 Jan 2025 a subparagraph added to Article 54(1) of the EU VAT Directive places supply of services 'streamed or otherwise made virtually available' at the consumer's residence, requiring non-Union OSS registration and local rates of 19-27%.

**The pass-through Daan SKUs (Annadaan, Gau Seva) are an FCRA trap if structured as donations, but are clean if structured as vendor purchases.**  
*high confidence.* VERIFIED: FCRA 2010 requires any Indian association receiving foreign contribution to hold registration and receive it first in the designated SBI Sansad Marg, New Delhi account. MHA FAQ confirms foreign contribution 'excludes earnings from foreign clients in lieu of goods sold or services rendered, this being a transaction of commercial nature.' Therefore Snanify India purchasing 51 meals from a kitchen on an invoice is an ordinary vendor payment; routing a foreign customer's donation to that kitchen is foreign contribution.

**Paying Indian officiants directly from a foreign entity is legally permissible under FEMA but operationally unworkable, and it manufactures a permanent establishment.**  
*high confidence.* VERIFIED in principle: inward remittance for services rendered is a permissible current account transaction through an AD Category-I bank with a purpose code and eFIRC, no RBI approval. But each officiant then becomes a service exporter with his own FEMA realisation, GST and income-tax obligations. Separately, contracted officiants, cameras, retainers and ghat operations create a business connection under s.9(1)(i) and likely a fixed-place PE, taxed at the foreign-company rate (~35% plus surcharge/cess) versus 25.17% for a resident company under s.115BAA.

**Card-not-present acceptance on Indian cards by overseas merchants is getting harder, not easier, from 1 October 2026.**  
*medium confidence.* VERIFIED: RBI requires card issuers to put mechanisms in place by 1 Oct 2026 to validate additional-factor authentication for non-recurring cross-border CNP transactions when the overseas merchant or acquirer requests it. Combined with the PA-CB regime, this is a second independent reason the Indian market requires an Indian entity.

**UPI is not free to the merchant. Razorpay applies a ~2% platform fee plus 18% GST (2.36% effective) even where MDR is zero, and Parliament amended the PSS Act on 4 August 2026 to permit MDR restoration above a turnover threshold.**  
*high confidence.* VERIFIED: Razorpay's own documentation states MDR ₹0 on bank-account UPI but a 2% platform fee; standard domestic pricing is 2% + 18% GST. The Payment and Settlement Systems Act was amended on 4 Aug 2026 creating the first legal authority since 2020 to restore merchant fees, with small merchants and sub-₹2,000 transactions protected. Model India payments at 2.36%, not 0%.

**Recurring billing is not constrained by Indian regulation at Snanify's price points, but the ₹15,000 e-mandate ceiling caps any future high-value annual plan.**  
*high confidence.* VERIFIED: RBI e-mandate framework requires AFA above ₹15,000 per recurring transaction; the ₹1 lakh exemption granted in Dec 2023 covers only mutual funds, insurance premia and credit-card bills. Kutumb at ₹21,000/yr exceeds the ceiling and cannot be auto-debited without AFA on every renewal; Varsh at ₹5,100 and Nitya at ₹501/mo are fine on UPI Autopay.

**The 100%-of-dakshina-to-the-officiant promise is a real, uncosted leak of roughly 3.5-4% of all dakshina volume.**  
*high confidence.* ARITHMETIC: src/content/trust.ts s6.pay states 'all of it reaches him, none of it reaches us', but Snanify bears the processor fee (Razorpay international cards 3% + 18% GST = 3.54%; Stripe ~4%). On $10 of dakshina Snanify loses ~$0.38 and books $0 revenue. VERIFIED fee rates; ASSUMPTION on dakshina attach rate.

**The India price ladder's constraint is not margin, it is capacity opportunity cost. A ₹251 Indian sankalp is 51% contribution-margin in a mixed segment, but it occupies a slot a $21 diaspora buyer would pay 8x for.**  
*high confidence.* ARITHMETIC: marginal Indian sankalp at ₹251 in a segment already above the officiant floor costs ₹122 (officiant ₹50 + stream ₹30 + payments ₹6 + support ₹25 + refund reserve ₹11), contribution ₹129 = 51.4%. Same sankalp at ₹501 → contribution ₹312 = 62.3%. Diaspora Ekal at $21 → contribution ₹1,289. All three are positive; the slot is worth 10x more to the third.

**An all-India segment is loss-making under the currently published pay formula. Indian sankalps are only viable riding inside diaspora-funded segments.**  
*high confidence.* ARITHMETIC: 11 Indian buyers at ₹251 = ₹2,761 segment gross. Officiant floor ₹1,800 (65% of gross) + camera ₹600 + streaming ₹350 = ₹2,750. Contribution ≈ ₹11. At ₹501 the segment grosses ₹5,511 and clears, but only just. This is a hard operational constraint: mixed segments are mandatory, and the scheduler must enforce it.

## Recommendations

- **[S] Move Ekal from $11 to $21 and keep $11 as Deep Daan, the genuine entry and gift SKU. Do this before the pay formula is frozen for its committed twelve months.**  
  It doubles contribution per full session ($319 → $687), lifts mature-session margin 56.8% → 64.2%, halves the $0.30 fixed-payment-fee drag from 2.7% to 1.4% of ticket, and makes the ₹1,800 officiant floor stop binding at 5 sankalps instead of 9 — so half-empty sessions become viable. Sri Mandir's diaspora ARPU of ~$81/yr says $11 is not where the market is.
- **[M] Incorporate Snanify India Pvt Ltd as the sole operating and contracting entity. Do not start with a foreign company that has Indian operations.**  
  Your COGS is 100% rupee, your officiants and ghat permissions are Indian, your data is meant to sit in India, and the one rule that used to punish this structure — IGST s.13(8)(b) — was repealed on 30 Mar 2026, so diaspora sales are zero-rated exports under an LUT with refundable input credit. A foreign entity instead gets OIDAR registration, 18% IGST on Indian sales with no credit, PA-CB dependency, a permanent establishment anyway, and ~38-44% tax on attributed profits versus 25.17% under s.115BAA.
- **[M] File for a GST advance ruling on whether Snanify's domestic supply falls under Entry 13(a), 'conduct of any religious ceremony'. Until it lands, price the Bharat Dar GST-inclusive and reserve 18%.**  
  It is an 18% swing on every Indian order, and your own ethics page ('we are not a temple and not your purohit') is the department's best argument against you. Also note the exemption is not costless: exempt output means no input tax credit and Rule 42/43 apportionment against your zero-rated exports. Budget for taxable; treat exemption as upside.
- **[S] Raise the Bharat Dar Ekal from ₹251 to ₹501, keep ₹101 Deep Daan and ₹1,100 Parivar, and cap Bharat Dar allocation at 4 of 11 slots per segment during peak muhurats.**  
  ₹251 is contribution-positive (51%) but occupies a slot worth 10x more to a diaspora buyer, and an all-India segment is break-even at best under the officiant floor. ₹501 is a genuine dakshina-ladder number, is still only 25% of the $21 world price — an honest, large, publishable differential — and makes the marginal Indian order 62% margin.
- **[M] Publish both price ladders side by side on one page in both languages, gate the India rate on the payment instrument's issuing country (Indian-issued card or UPI VPA), and never geo-switch on IP.**  
  Dual pricing is correct and defensible on purchasing-power grounds; hiding it is what turns it into a scandal, and your entire brand is the promise not to hide things. IP gating is defeated by a VPN and punishes travellers. Accept the NRI-with-an-Indian-card leakage (assume 8-12% of diaspora orders, costing ~7.5% of diaspora revenue) rather than policing it — and differentiate the ladders by service (timezone-native scheduling, local-language patra, WhatsApp delivery) so the price gap has a product behind it, which your ethics page explicitly permits.
- **[S] Reprice or retire Sankalpit Japa and Path. State the true duration first, then price from it.**  
  1,008 Gayatri is approximately three hours of dedicated officiant time, which your own adversarial review already established. At $51 the SKU is contribution-negative and it consumes the only genuinely scarce input in the business. Either price Japa at $251+ with the real duration published, or delete it. Keeping a loss-making SKU whose selling point is an unbroken recording of a stated repetition count is also the SKU most likely to be caught lying.
- **[M] Make the scheduler pack segments greedily and publish fewer, fuller muhurat windows. Never open segment two until segment one holds eleven.**  
  This is the highest-leverage operational decision in the business and it is disguised as a UX choice. The per-segment ₹1,800 floor only hurts when the scheduler creates sparse segments; greedy packing makes the per-segment and per-session economics converge. Fewer windows concentrate demand — the difference between a 5-sankalp session at 33% margin and a 20-sankalp session at 64%.
- **[S] Sequence the product push by stage: in year one push Ekantik ($151) and Pitru Tarpan ($51) for absolute contribution per order; from the point sessions routinely fill past 20, switch the push to Ekal, Parivar and Varsh.**  
  Early on demand is scarce, so contribution per order rules and Ekantik's $80 beats Ekal's $13.53. Once officiant-minutes become scarce, the ranking inverts hard: Ekal in a full segment returns $18.04 per officiant-minute against Ekantik's $2.67. The catalog currently frames the expensive SKUs as the premium ones; per unit of the scarce input they are the margin destroyers.
- **[M] Build recurring revenue on Smaran (annual, $81) and Varsh (annual prepaid, reprice to $251 for twelve snans), not on Nitya Seva monthly, and do not build prepaid credits.**  
  Smaran is the most defensible: the tithi genuinely drifts against the Gregorian calendar, almost nobody computes it correctly, and the product is the remembering — 68.3% contribution margin, one payment fee per year, near-zero incremental CAC. Monthly devotional subscriptions churn hardest once the occasion that triggered signup passes (assume 8-12%/month). Prepaid credits give you the cash-flow benefit without the breakage benefit, because your ethics page already forbids expiry forfeiture, and they add PPI and deferred-liability complexity for nothing.
- **[S] Restructure the Annadaan and Gau Seva daan SKUs as Snanify India purchasing meals and fodder from partners on an invoice, never as a donation routed from the customer to an Indian NGO.**  
  Money from a foreign customer reaching an Indian NGO as a donation is foreign contribution under FCRA 2010: the NGO needs registration and must receive it first in the designated SBI Sansad Marg account. A vendor purchase is expressly outside FCRA as a commercial transaction. The customer-facing promise (dated photo, receipt, count served) is unchanged; only the flow of funds moves.
- **[M] Register for UK VAT and EU non-Union OSS before the first UK or EU sale, and display VAT-inclusive prices in those markets from day one. Consider geo-limiting year one to the US, Canada, Australia and Singapore.**  
  Non-established businesses get no UK VAT threshold — the first £21 sale triggers registration. From 1 Jan 2025 a live-streamed rite is taxed at the EU consumer's residence at 19-27%. Retrofitting 20% onto a published shagun price is a margin event you cannot undo. A merchant-of-record would absorb this for ~5% + $0.50, but Paddle and Lemon Squeezy serve software and digital products and will likely decline a religious-services merchant — verify before you plan around it.
- **[S] Publish officiant pay as ₹ per hour alongside the percentage, in the quarterly transparency report you have already committed to.**  
  Twenty per cent will be attacked as extractive, and the percentage alone loses that argument. The hourly figure wins it decisively: a full 53-minute session pays the officiant ₹20,390, which against the PLFS urban regular-salaried mean of ₹24,434 per month is roughly ten months of median urban salaried income for under an hour of work. Publish that and the 'you exploit priests' story dies on contact.
- **[S] Restate the dakshina promise as '100% of your dakshina reaches him, net of the payment processor's fee, which we publish', and show the fee.**  
  Today the promise is 'all of it reaches him, none of it reaches us' while Snanify silently eats a 3.5-4% processor fee and books zero revenue on it. Netting it and publishing the number is more honest than the current wording, costs you the customer's goodwill of nothing, and removes a leak that scales linearly with dakshina volume.
- **[S] Treat the 45-second-per-sankalp recitation floor as a constitutional constant and say so internally now, before growth pressure arrives.**  
  Halving it to 22 seconds doubles session capacity and halves officiant cost per sankalp — it is by a wide margin the largest margin lever in the model, and it is the one that destroys the product. Name it before someone proposes it as an optimisation in month nine.

## Risks

- GST characterisation of domestic sales is unresolved and worth 18% of every Indian order. Your ethics page has already published the department's argument for you. Get an advance ruling before the Bharat Dar goes live, and reserve for taxable in the meantime.
- The refund policy is unusually generous — full refund within 14 days, no reason, with the officiant paid in full and the ledger entry retained. A refunded order costs 100% of revenue plus 100% of COGS. Modelled at 4.3%; a single viral 'free rite' thread could spike it. The once-per-account cap is already committed; instrument it from order one and publish the rate monthly as promised.
- Officiant pay share of ~20% will be reported as extractive by the first journalist who asks, exactly as your own adversarial review predicted. The defence is the hourly figure, not the percentage — but you must have real published numbers before the story runs, not after.
- Deferred revenue from Varsh, Kutumb and Smaran will look like profit and is not. In the base case ~$23,468 of prepayments is unperformed at month twelve, refundable pro-rata with no expiry forfeiture per your own commitment. Segregate it in the accounts from day one.
- Concentration risk: one ghat, one officiant, one monsoon closure or water-quality advisory equals a month of zero revenue at that ghat, against a fixed ₹23,000/month per-ghat cost stack that runs regardless. Two ghats minimum at launch, and model a 15% seasonal closure rate at riverine sites.
- The ₹10,000/month per-ghat permission and samiti figure is a pure assumption. Nobody has verified what Shri Ganga Sabha, a mela authority or a municipality actually charges for commercial filming rights, or whether they will grant them at all. If it is ₹100,000/month rather than ₹10,000, per-ghat break-even moves from 76 to roughly 190 orders per month. This is the single largest unpriced input in the model.
- FX is currently a tailwind and will reverse. Revenue is USD, cost is INR, and the rupee has weakened 8.63% over twelve months. Do not let a 64% margin that is partly an FX artefact become the basis for a pricing decision.
- Cross-border acceptance on Indian-issued cards tightens from 1 Oct 2026 under the new AFA requirement, and the 4 Aug 2026 PSS Act amendment opens the door to UPI MDR returning above a turnover threshold. Both move against a foreign-entity structure and both add cost to the India ladder over time.
- If an officiant crosses ₹20 lakh of annual receipts from Snanify he must register for GST and charge 18% on his invoices. Recoverable as input credit against zero-rated exports, but it is a cash-timing and paperwork step-change, and at full-session volumes he crosses it in weeks, not years. Collect PAN from every officiant at signing and plan TDS under s.194C or 194J from the first payment.
- The India market has been anchored by Sri Mandir and VAMA at ₹51-₹501 with physical prasad shipped to the door. Snanify ships nothing, by design. The Bharat Dar must therefore be low and the India segment must be capacity-capped, or you will fill diaspora-funded slots with orders that pay a twelfth of what the slot is worth.
- Smaran's low churn comes from precisely the emotional mechanism your ethics page forbids exploiting — cancelling an annual memorial feels like forgetting. The honest resolution is one-click cancellation, no retention flow, no win-back email, and accepting materially higher churn than the product could achieve. Budget for that, and treat any proposal to 'improve Smaran retention' as an ethics escalation, not a growth experiment.
- Merchant-of-record availability is unverified and load-bearing for the year-one tax plan. Paddle and Lemon Squeezy are oriented to software and digital products and may decline a religious-services merchant outright. Confirm before assuming you can avoid UK VAT and EU OSS registrations.

---

## Snanify: unit economics, pricing and monetisation

Written for the founder. Every number is either VERIFIED with a source, or labelled ASSUMPTION with the arithmetic shown. FX throughout is **₹95.24 = $1** (10 Aug 2026). Your catalog is built on ₹88 — every INR figure in `docs/design/catalog.md` is roughly 8% stale.

---

### 1. The headline, stated plainly

The Samuhik batching engine is real and it works. It is not, however, what you think it is.

You wrote: *"Marginal cost per additional order in a shared session is close to zero. That is the unit economics engine."*

That is false, and it is false because of a decision you already made and published. Your officiant pay formula is `max(₹1,800, 20% of that segment's gross)`. Above roughly nine sankalps at $11, the 20% clause binds and **officiant cost becomes a fixed 20% of every incremental rupee, forever.** Add payment fees (5.4%), the refund reserve your ethics page obliges you to hold (4.3%), the camera operator (2.9%), streaming and storage (1.9%) and automated support (1.3%), and your variable cost stack is **35.8%**. The marginal cost of the fifty-first sankalp is ₹715, not ₹0.

This is not a criticism of the pay formula. A 20% revenue share to the person doing the actual work is defensible, cheap by any comparable standard, and the single most valuable thing on your ethics page. It is a criticism of the mental model. **Batching buys you the floor, not the ceiling.** It takes you from 33% margin at five sankalps to 57% at twenty, and then it stops. Everything above 57% has to come from somewhere else.

There are exactly two places it can come from: **price**, and **mix**.

---

### 2. Cost per session, worked

The session structure falls out of rules you have already published, not from anything I invented:

- ≥45 seconds of recitation per named sankalp (`src/content/trust.ts`, s5.steps[2])
- ≤11 sankalps per segment, for privacy (same file, s5.density)
- ≤51 sankalps per session (`docs/design/catalog.md` §1)

So segments per session = `ceil(n/11)`, and a full session is 51 × 45s + 5 × 3 min overhead ≈ **53 minutes**. Note that this reconciles the apparent contradiction between your "11" and your "51" — a session is five segments. Your officiant pay is per *segment*, so a full session costs five segment-payments, not one. Make sure whoever builds the payout engine knows this.

**At today's $11 Ekal:**

| | n=5 | n=20 | n=51 |
|---|---|---|---|
| Gross | ₹5,238 | ₹20,953 | ₹53,430 |
| Officiant | ₹1,800 | ₹4,190 | ₹11,016 |
| Camera/ghat operator @₹600/seg | ₹600 | ₹1,200 | ₹3,000 |
| Streaming + 24-month storage | ₹400 | ₹900 | ₹1,900 |
| Payment fees @4% + $0.30 | ₹352 | ₹1,410 | ₹3,594 |
| Support @₹25/order | ₹125 | ₹500 | ₹1,275 |
| Refund reserve @4.3% | ₹225 | ₹901 | ₹2,297 |
| **Total** | **₹3,502** | **₹9,101** | **₹23,082** |
| **Cost per sankalp** | **₹700** | **₹455** | **₹453** |
| **Margin** | **33.1%** | **56.6%** | **56.8%** |
| Contribution/session | $18 | $124 | **$319** |

**At a recommended $21 Ekal:**

| | n=5 | n=20 | n=51 |
|---|---|---|---|
| Gross | ₹9,999 | ₹39,999 | ₹101,952 |
| Officiant | ₹2,000 | ₹8,000 | ₹20,390 |
| Camera | ₹600 | ₹1,200 | ₹3,000 |
| Streaming + storage | ₹400 | ₹900 | ₹1,900 |
| Payments | ₹543 | ₹2,171 | ₹5,537 |
| Support | ₹125 | ₹500 | ₹1,275 |
| Refund reserve | ₹430 | ₹1,720 | ₹4,384 |
| **Total** | **₹4,098** | **₹14,491** | **₹36,486** |
| **Cost per sankalp** | **₹820** | **₹725** | **₹715** |
| **Margin** | **59.0%** | **63.8%** | **64.2%** |
| Contribution/session | $62 | $268 | **$687** |

Note what changes and what does not. Cost per sankalp *rises* at $21, because the officiant's 20% rises with price. That is correct and intended. What matters is that contribution per full session **doubles**, and that the low-fill case stops being a disaster: a five-sankalp session goes from 33% margin to 59%.

**Cost line notes.** Officiant and camera rates are yours (`docs/design/catalog.md` §4.4), unverified against market — see §7. Streaming uses Cloudflare Stream at $1/1,000 delivered minutes and $5/1,000 stored minutes/month (VERIFIED); a full session works out to ~$20 over 24 months of retention. Payment fees: Stripe international ~4% blended, Razorpay international cards 3% + 18% GST = 3.54% (VERIFIED), plus a $0.30 fixed leg that costs you 2.7% at $11 and only 1.4% at $21. Support at ₹25/order is an ASSUMPTION: ₹15 of automated comms plus a 3% human-touch rate at ₹300 per touched ticket. Refund reserve of 4.3% is an ASSUMPTION (4% refunds + 0.3% chargebacks) and is a real liability, not a rounding error, because your ethics page grants a no-questions 14-day full refund *while paying the officiant in full* — a refunded order costs you 100% of revenue and 100% of COGS.

---

### 3. The number that should be on your wall

**Revenue per officiant-hour at a full session: ₹115,400 ($1,212).**

Fifty-three minutes of one man's time generates a hundred thousand rupees of gross. He keeps ₹20,390 of it. That is the engine, and it is why this business can work.

It is also your strongest ethical fact, and you are currently under-using it. Against the PLFS 2023-24 mean monthly earnings for an urban regular-salaried worker of **₹24,434** (VERIFIED), a single full session pays an officiant roughly ten months of median urban salaried income for under an hour of work. Your own adversarial review predicted that "a $51 SKU where the ghat purohit receives ₹200 is extractive, will be reported as such by the first journalist who asks." Your formula does not do that — but *20%* as a headline number loses the argument anyway, because 20% sounds like a platform take-rate inversion. Publish **₹ per hour** alongside the percentage in the quarterly transparency report you have already committed to. That kills the story before it runs.

---

### 4. Price ladder: validate or replace

#### The USD ladder

The auspicious-number scheme is fine. The *levels* are wrong, and specifically $11 is wrong.

Three verified market facts:

1. **Sri Mandir's ARPU abroad is ₹7,000/year (~$81)**, against ₹600-800 in India, with roughly 20% of platform revenue coming from the diaspora (TechCrunch, 30 Jun 2025). That is a mass-market app with prasad shipped in a box. It is not premium positioning. If the diaspora is spending $81/year *there*, $11 is not the market's price ceiling.
2. **Prayag Pandits** — an actual, live, unfunded competitor doing exactly your rite category with WhatsApp/Zoom streaming — lists online Prayagraj pind daan at ₹7,100 (~$75), Gaya at ₹11,000 (~$116), Prayagraj Tripindi Shraddh at ₹22,000 (~$231), Narayan Bali at ₹35,000 (~$367). All-inclusive, live video included at no extra charge. (VERIFIED from their pricing page.)
3. **Indian-headed US households had a median income of $151,200 in 2023** (Pew). For immigrant-headed households, $156,000.

You are pricing at a coffee against a market that is transacting at $75-$370 with worse proof, worse ethics and no verification chain.

**Recommended Vishwa Dar:**

| Product | Now | Recommended | Reason |
|---|---|---|---|
| Deep Daan | $11 | **$11** | True entry, gift, and add-on. Unchanged. |
| Ekal Snan | $11 | **$21** | See below. |
| Parivar | $31 | **$51** | 6 names ≈ 2.7 Ekal-slots of recitation time; $51 is proportionate and is already in your ladder. |
| Pitru Tarpan | $51 | **$51** | Correct. Justify it on *individual, unbatched, longer vidhi*, never on emotional weight — your reviewer was right that grief pricing will be described as grief pricing. |
| Ekantik Snan | $151 | **$151** | Correct. Sits below the incumbent premium band. |
| Varsh | $108 | **$251/yr** | 12 Ekal snans at $20.9 each — no discount. The value is the almanac, the archive, the waived premiums, and never having to decide. Keep $108 as a 6-snan Ardh Varsh if you want the number. |
| Kutumb | $1,008 | **$1,008** | Untested hypothesis. Do not build it until ten conversations say yes. |

**Why $21 for Ekal, in four arguments:**

- **Payment fee efficiency.** At $11, the $0.30 fixed leg is 2.7% of the ticket; total payment cost 6.7%. At $21 it is 1.4%; total 5.4%. You recover 130bps for free.
- **It fixes the officiant floor.** The ₹1,800 floor binds while `0.20 × n × price × 95.24 < 1800`. At $11 that is n < 8.6 — so any session under nine sankalps is structurally unprofitable. At $21 it is n < 4.5. Half-empty sessions become viable, which matters enormously in year one when every session is half-empty.
- **Session economics.** Full-session contribution goes from $319 to $687. That is the difference between needing 227 orders/month to break even and needing far fewer.
- **Signalling.** Your own growth doc found that $11 for a father's rite reads as *insufficiently serious*. That is a real, documented conversion problem in the unusual direction.

The counter-argument is that $11 is the frictionless first purchase. Keep that — but let **Deep Daan at $11** be the entry, not Ekal. It is a genuine, short, complete rite, it is one tap from any occasion page, and it does not require you to run a 45-second recitation at a price that cannot carry it.

*(A second option is a stated, permanent, once-per-account "Pehla Snan" price of $11 with a $21 list. It is honest and disclosed. But it sits uncomfortably close to your ethics line that no price "changes because of who you appear to be", and the simple version above achieves nearly the same thing with no interpretive burden. I recommend the simple version.)*

#### The INR ladder

`₹101 · 251 · 501 · 751 · 1,100 · 2,100 · 5,100 · 21,000` is a genuine dakshina ladder and should survive. But two things change.

First, **Ekal must move from ₹251 to ₹501.** At ₹251 the marginal Indian sankalp — riding inside a segment already funded above the officiant floor — costs ₹122 (officiant ₹50, streaming ₹30, payments ₹6, support ₹25, refund reserve ₹11) and contributes ₹129, or 51.4%. That is *positive*, which is the surprise. The problem is not margin, it is **opportunity cost**: that slot is worth ₹1,289 to a $21 diaspora buyer. Ten times more. At ₹501 the Indian order contributes ₹312 (62.3%), which halves the gap.

Second, and this is a hard operational constraint you must design the scheduler around: **an all-India segment loses money.** Eleven Indian buyers at ₹251 gross ₹2,761; the officiant floor alone is ₹1,800 (65% of gross), plus ₹600 camera and ₹350 streaming = ₹2,750. Contribution: eleven rupees. At ₹501 the segment grosses ₹5,511 and clears, but not comfortably. **Indian sankalps are only viable riding inside diaspora-funded segments.** Enforce a mixed-segment rule in the scheduler and cap the Bharat Dar at, say, four of eleven slots during peak muhurats.

Also note: your catalog frames the India price as "20-40% of the world price". Your own reviewer was right that this is the wrong framing — do not anchor India as a discount off a dollar. Publish two real prices for two real markets. ₹501 against $21 happens to be 25%; say ₹501, not "-75%".

---

### 5. Dual geographic pricing: yes, and here is the policy

**Should you do it? Yes.** ₹2,000 for a snan prices out the domestic market that gives the service its legitimacy, and $21 in New Jersey is a sandwich. The empirical case is settled: Sri Mandir's ARPU differential is roughly 10:1 between abroad and India. The market already prices this way. What differs is whether you say so.

**Mechanics. Three options, one right answer.**

- **IP geolocation** — defeated by a VPN in ten seconds, punishes a Bengaluru customer travelling in Frankfurt, and is the specific version that becomes a scandal when discovered. **Reject.**
- **Payment instrument issuing country** — an Indian-issued card BIN or a UPI VPA gets the Bharat Dar. Hard to fake without an actual Indian bank relationship, and it *aligns with your real cost of collection* (UPI at ~2.36% against international cards at 3.5-5%). **This is the honest test, and your catalog already proposes it. Keep it.**
- **Explicit currency choice with both ladders published** — necessary but not sufficient on its own.

**Recommended policy: publish both ladders side by side on one page, in both languages, and gate eligibility on the payment instrument.** One sentence of explanation, no apology, no percentage framing.

**Risks of being caught doing it silently — ranked by what actually kills you.**

1. **Reputational, and it is existential.** "Snanify charges NRIs four times what it charges Indians for the same prayer, and hides it behind your IP address" is a single tweet. Every other business survives that story. You do not, because your entire product is the claim that you do not hide things. The ethics page is a hostage you have voluntarily given.
2. **Consumer-law price transparency.** Displaying one price and charging another after reading the card BIN at checkout risks the EU Price Indication Directive, the UK CPRs and India's Consumer Protection Act 2019 misleading-price provisions. Charging *different market prices* is legal everywhere; *switching the price mid-transaction based on the instrument* is where the exposure sits. Show the eligible price before payment details are entered, or show both.
3. **EU Geo-blocking Regulation 2018/302.** It stops you discriminating between EU customers on nationality or residence. India is outside the EU, so an India/world split is untouched — but you cannot sub-segment *within* the EU. (Medium confidence; worth a lawyer's ten minutes.)
4. **Arbitrage leakage.** NRIs commonly hold NRE/NRO accounts and Indian cards. Assume 8-12% of diaspora orders route through an Indian instrument, costing roughly 7.5% of diaspora revenue at the $21/₹501 gap. **Do not police this.** Publish the rule as "pay with an Indian instrument, pay the India price" and accept it. It is self-limiting — most diaspora buyers reach for the card in their wallet.

**The mitigation that actually works:** make the two ladders differ in *service*, not only in price. Bharat Dar gets Hindi patra, IST-native scheduling, UPI. Vishwa Dar gets timezone-localised muhurat scheduling with calendar invites in local time, bilingual delivery, WhatsApp handoff. Your ethics page explicitly permits this — *"Our offerings differ in what we do for you, never in what a rite is worth."* Give the price gap a product behind it and both the arbitrage and the optics improve.

---

### 6. Gross margin by tier, contribution per session, break-even

**Per-unit contribution at the recommended ladder:**

| SKU | Price | Variable cost | Contribution | Margin |
|---|---|---|---|---|
| Ekal | $21 | $7.47 | **$13.53** | 64.4% |
| Parivar | $51 | $17.61 | **$33.39** | 65.5% |
| Pitru Tarpan | $51 | $17.61 | **$33.39** | 65.5% |
| Ekantik | $151 | $70.93 | **$80.07** | 53.0% |
| Varsh | $251 | $105.38 | **$145.62** | 58.0% |
| Smaran | $81/yr | $25.68 | **$55.32** | 68.3% |
| Deep Daan (attached to an existing order) | $11 | $2.77 | **$8.23** | 74.8% |

Two things to notice. **Ekantik has the *lowest* percentage margin in the catalog** (53%) because ₹4,000 of officiant fee and ₹1,200 of camera on a private session are heavy — but the highest per-order contribution outside the annuals. And **Varsh has a worse margin than Ekal**, because you are selling twelve rites for the price of twelve rites but eating twelve delivery costs against one payment fee, plus a 12% pro-rata refund reserve. Varsh is a cash-flow and retention instrument, not a margin instrument. Do not let anyone tell you otherwise in a board meeting.

**Blended:** mix 40/25/15/12/8 across Ekal/Parivar/Pitru/Ekantik/Varsh gives **AOV $67.00** and **contribution $40.03 (59.7%)**.

**Fixed costs (ASSUMPTION, founder-operated):** $2,550/month platform — hosting $250, Stream and SaaS $150, transactional email $50, multi-jurisdiction tax compliance $800, legal and officiant accident/health cover $400, India statutory audit and company secretarial $300, panchang licence $100, third-party rite audit $500 (you committed to 2% spot-checks; that is a real line item and it is the moat, so do not cut it). Plus $242/ghat/month (₹8,000 retainer + ₹5,000 connectivity + ₹10,000 assumed permission fee). Two ghats: **$3,034/month**.

**Break-even:**

| Scenario | Orders/month | Revenue/month |
|---|---|---|
| Platform fixed only | **76** | $5,092 |
| + founder comp $4,000 | **176** | $11,792 |
| + marketing at 15% of revenue | **227** | **$15,209** |

**In sessions:** at a realistic year-one average of 14 sankalps/session, that is **~16 sessions per month — four sessions a week**, across two ghats. That is the number that matters. It is operationally trivial. Your constraint is demand, not supply, and it will stay that way for years: two ghats running two sessions a day at full load is 6,100 sankalps/month, or **$409,000 of monthly revenue**.

**The corollary is the most important operational insight in this document.** Because capacity is abundant and fill is scarce, every scheduling decision should optimise for *session density*, not session count. Publish **fewer, fuller muhurat windows**. The difference between a 5-sankalp session (59% margin, $62 contribution) and a 20-sankalp session (64%, $268) is entirely a scheduling choice. Make the scheduler pack greedily — never open segment two until segment one holds eleven — and the per-segment officiant floor stops mattering at all.

---

### 7. The highest-margin products, and which to push

Percentage margin is the wrong lens once you are filling sessions. The scarce input is **officiant-minutes**. Ranked by contribution per officiant-minute:

| SKU | Officiant min | Contribution | **$/min** |
|---|---|---|---|
| Ekal $21 in a full segment | 0.75 | $13.53 | **$18.04** |
| Parivar $51 | 2.0 | $33.39 | **$16.70** |
| Varsh $251 (12 × 45s) | 9.0 | $145.62 | **$16.18** |
| Deep Daan $11 attached to an order | 1.0 | $8.23 | **$8.23** |
| Pind Daan $251 | 45 | ~$130 | $2.89 |
| Pitru Tarpan $51 | 12 | $33.39 | $2.78 |
| Ekantik $151 | 30 | $80.07 | $2.67 |
| Smaran $81/yr | 24 | $55.32 | $2.31 |
| **Sankalpit Japa $51 @ 55 min** | 55 | ~$10 | **$0.18** |
| **Sankalpit Japa $51 @ 3 hrs actual** | 180 | negative | **−$0.10** |

**Your catalog has this backwards.** The cheap batched SKUs are the high-margin products per unit of the scarce resource, and the expensive Ekantik-only recitation SKUs are the margin destroyers dressed as premium.

**Kill or reprice Sankalpit Japa and Path.** Your own adversarial review already established that 1,008 Gayatri takes about three hours. At $51 with three hours of dedicated officiant time under an unbroken-recording guarantee, this SKU is contribution-negative *and* it is the SKU most likely to be caught lying about duration. State the true time, price from it ($251+), or delete it.

**Sequence the push by stage:**

- **Year one (demand-constrained):** push **Ekantik $151** and **Pitru Tarpan $51**. Absolute contribution per order rules when you have empty sessions anyway — $80 from one Ekantik beats $13.53 from one Ekal, and Ekantik beats a half-empty Samuhik session outright.
- **From the point sessions routinely fill past twenty:** invert. Push **Ekal, Parivar and Varsh**. Officiant-minutes become the binding constraint and Ekal's $18.04/minute is nearly seven times Ekantik's $2.67.

**The permanently underrated product is the attached add-on.** A Deep Daan added to an existing order carries no incremental payment fixed fee, no incremental support ticket, no incremental acquisition cost, and about one minute of incremental officiant time: 74.8% contribution. Attach rate is the cheapest revenue in the business. Build the add-on step properly — but note your ethics page bans pre-ticked boxes, so it has to earn the tap.

---

### 8. Recurring revenue: what to build, what to avoid

**Build Smaran ($81/yr).** It is the most defensible recurring product in the catalog and it is not close. The tithi genuinely drifts against the Gregorian calendar every year, almost nobody computes it correctly, and the product is literally *"we remember, and we perform."* 68.3% contribution, one payment fee per year, near-zero incremental CAC, and it renews on a date the customer cannot forget.

**One caution you must hold consciously.** Smaran's low churn comes from the same emotional mechanism your ethics page forbids you to exploit — cancelling an annual memorial feels like forgetting. Your page already permits it (*"No message on the anniversary of a death unless you asked us for one"*) so the product is inside the line as long as it is opt-in, one-click cancellable, and never marketed at grief. But the honest position is: **you will have worse retention on Smaran than the mechanics could deliver, deliberately, and that is the cost of the ethics page.** Budget for it, and treat any future proposal to "improve Smaran retention" as an ethics escalation rather than a growth experiment.

**Build Varsh, but understand what it is.** $251 collected upfront, recognised across twelve performed rites. It is *deferred revenue*, not profit — in the base case you will hold ~$23,468 of unperformed prepayments at month twelve, refundable pro-rata with no expiry forfeiture because you committed to that. Segregate it in the accounts from day one. What Varsh actually buys you: peak-season cash funding trough operations (sell it hardest during Pitru Paksha and Kartik), twelve engagement moments a year, and one payment fee instead of twelve. Renewal on annual prepaid devotional products: **ASSUMPTION 35-45%**.

**Be sceptical of Nitya Seva monthly ($21/mo).** Monthly religious subscriptions churn hard once the occasion that triggered signup has passed. **ASSUMPTION 8-12% monthly churn**, implying an 8-12 month average life and $168-252 LTV — barely better than a single Varsh with far more billing surface. Offer it; do not build the business on it.

**Do not build prepaid credits.** Credits give you the cash-flow benefit without the breakage benefit, because your own ethics page forbids expiry forfeiture. You get deferred-liability accounting, potential PPI scrutiny, and customer confusion, in exchange for nothing you cannot get from Varsh — which is a *defined entitlement to twelve rites*, cleaner in every respect.

**Indian regulatory constraint on recurring billing.** RBI's e-mandate framework requires additional-factor authentication above **₹15,000 per recurring transaction**; the ₹1 lakh exemption granted in December 2023 covers only mutual funds, insurance premia and credit-card bills (VERIFIED). Practical consequences: Nitya at ₹501/month and Varsh at ₹5,100/year both sit comfortably inside the limit and work on UPI Autopay or card e-mandate. **Kutumb at ₹21,000/year does not** — it cannot be auto-debited without AFA on every renewal, so it must be an annual manual repurchase, not a subscription. Also note the pre-debit notification requirement (24 hours before each debit, with an opt-out) — which, pleasingly, is exactly the behaviour your ethics page already promises.

---

### 9. Payment rails, tax and corporate structure

This is the section that decides whether the business can bank. Read it twice.

#### 9.1 What a foreign company can actually collect from Indian customers: effectively nothing, cheaply

- A foreign-incorporated entity **cannot get a domestic Razorpay, Cashfree or Stripe India merchant account.** Stripe's own documentation states the account must be a registered Indian business (VERIFIED).
- The only compliant route for a foreign merchant to take INR from Indian consumers is through an **RBI-authorised PA-CB (import)** under the circular of 31 October 2023 — non-bank PA-CBs need ₹15 crore net worth at application rising to ₹25 crore by 31 March 2026 (VERIFIED). You would be a merchant on someone else's licence, on international-card rails, at 3-5%+, with materially higher decline rates and no meaningful UPI access.
- From **1 October 2026**, Indian card issuers must be able to validate AFA on non-recurring cross-border card-not-present transactions when the overseas merchant requests it (VERIFIED). Cross-border acceptance on Indian cards is getting *harder*, not easier.
- On top of that, a foreign entity selling to Indian consumers is almost certainly an **OIDAR** supplier. The October 2023 amendment deleted the "minimal human intervention" test, widening the definition to services with human input delivered over the internet (VERIFIED). OIDAR means **mandatory simplified GST registration regardless of turnover, 18% IGST on every Indian sale, and no input tax credit.**

**Conclusion: to sell in India at ₹501, you need an Indian entity. The payment economics alone decide it** — UPI at ~2.36% against international cards at 3.5-5% on a ₹501 ticket is the difference between a viable price and an unviable one.

#### 9.2 GST on the sell side

**Exports to the diaspora: zero-rated.** An Indian company supplying a foreign consumer qualifies as export of services under s.2(6) IGST if the supplier is in India, the recipient is outside India, place of supply is outside India, **payment is received in convertible foreign exchange**, and the two are not merely establishments of the same person. File an LUT (Form RFD-11) and invoice without IGST while keeping input credit refundable (VERIFIED). The forex-receipt condition is load-bearing — your processor must issue eFIRC/FIRA. Stripe, Razorpay and Skydo all do.

**The intermediary landmine has been defused, and this is recent.** Historically, s.13(8)(b) IGST deemed the place of supply for *intermediary* services to be the supplier's location, which would have made all your diaspora revenue domestically taxable at 18% if the department characterised you as arranging a rite between a purohit and a customer. **Section 13(8)(b) was omitted by the Finance Act 2026, effective 30 March 2026**, following the GST Council's 56th meeting (VERIFIED). Place of supply now follows the recipient, so even an intermediary characterisation yields zero-rated export. This single change removes the largest structural tax risk from the Indian-entity plan. It happened four months ago; make sure your CA knows.

Belt and braces regardless: **contract as principal, not as a marketplace.** Circular 159/15/2021-GST is explicit that a person supplying the main service on a principal-to-principal basis on their own account cannot be an intermediary (VERIFIED). Your ethics page already commits to exactly this — *"Every officiant is engaged directly by Snanify, on a written contract… He is not a gig worker and this is not a marketplace."* That sentence is worth more than it looks. Keep it, and make the contracts match it.

**Domestic Indian sales: unresolved, and worth 18%.** Entry 13(a) of Notification 12/2017-CT(R) exempts *"services by a person by way of conduct of any religious ceremony"* — and unlike 13(b), it carries **no requirement that the supplier be a registered charitable or religious trust** (VERIFIED). If Snanify's supply is characterised that way, the Bharat Dar is GST-free.

The problem is that you have already published the department's counter-argument. `src/content/trust.ts` s1 says *"We are not a temple, and we are not your purohit. We are a service that engages a qualified officiant…"* — i.e. Snanify supplies arrangement, recording and verification; the officiant conducts the ceremony. Exemption notifications are strictly construed. Also note the exemption is not free money: exempt output means **no input tax credit**, so the 18% GST on your streaming, hosting, payment fees and legal becomes a real cost, and you would have to apportion ITC under Rules 42/43 between exempt domestic and zero-rated export supplies. **Recommendation: file for an advance ruling before the Bharat Dar goes live; in the meantime price the India ladder GST-inclusive and reserve 18%.** Treat the exemption as upside, never as the plan.

#### 9.3 The officiant side

- **He is your vendor, not your employee** — that is what your contract structure says, and it should stay that way. If his annual receipts from you stay under **₹20 lakh** he need not register for GST and you pay him gross. At full-session volumes he crosses that threshold in *weeks*: ₹20,390 per full session means eight sessions a month gets him there in ten months, two a day gets him there in a month. Above it he registers and charges 18%, which you reclaim as input credit against zero-rated exports — recoverable, but a cash-timing and paperwork step-change. Plan it, do not discover it.
- **TDS applies.** Deduct under s.194C (1% for an individual) or s.194J (10%, professional services) on every officiant payment; 20% if he has no PAN. Collect PAN at signing, from officiant number one.
- **Do not pay officiants from abroad.** It is *legally* fine — inward remittance for services rendered is a permissible current account transaction through an AD Category-I bank with a purpose code and eFIRC, no RBI approval needed. But it makes each purohit a service *exporter* with his own FEMA realisation, GST and income-tax obligations; banks flag repeated small forex credits to individuals; and no ghat purohit will manage any of it. Worse, it hands the Indian revenue authorities a fixed-place permanent establishment on a plate.

#### 9.4 FCRA — the trap nobody has flagged

Paying officiants for services is **outside FCRA**: the MHA's own FAQ confirms foreign contribution "excludes earnings from foreign clients in lieu of goods sold or services rendered, this being a transaction of commercial nature" (VERIFIED).

But your **Annadaan and Gau Seva pass-through Daan SKUs are squarely inside it** if structured as donations. Money from a foreign customer reaching an Indian NGO, gaushala or temple kitchen as a *donation* is foreign contribution: the recipient must hold FCRA registration and must receive it first in the designated SBI Main Branch, Sansad Marg, New Delhi account (VERIFIED). Almost no small gaushala has that.

**Fix:** Snanify India **purchases** 51 meals or a day's fodder from the partner on an invoice. Ordinary vendor payment, ordinary GST treatment, no FCRA. The customer-facing promise — dated photo, kitchen receipt, count served — is identical. Only the flow of funds moves. This is a small change now and an unfixable problem later.

#### 9.5 The sell side outside India — the underestimated cost

- **UK.** A non-established taxable person gets **no VAT registration threshold**. The £90,000 threshold does not apply to overseas businesses; you register on the first UK consumer sale and charge 20% (VERIFIED). The UK diaspora is large enough that this is not optional.
- **EU.** From **1 January 2025**, a subparagraph added to Article 54(1) of the VAT Directive places B2C services "streamed or otherwise made virtually available" at the **customer's residence** (VERIFIED). Your product is a live-streamed event attended remotely — this is not a grey area. Register for **non-Union OSS** and charge 19-27% by member state.
- **US.** Services are generally outside sales tax; some states tax digital audiovisual works, and economic nexus thresholds (~$100k/state) mean it is not a year-one problem. **Medium confidence** — revisit at scale.
- **Australia** (GST on imported services above A$75k), **Singapore** (OVR above S$1m global / S$100k local), **UAE** (5%, **nil threshold** for non-resident suppliers to unregistered customers).

**Practical year-one plan:** launch **US and Canada first**, which is where the growth doc already points you, and price VAT-inclusive from day one in any market you add. Retrofitting 20% onto a published shagun number is a margin event you cannot undo without breaking a price you promised not to change.

A merchant-of-record (Paddle, Lemon Squeezy, Polar) would absorb every one of these registrations for roughly 5% + $0.50 — on a $67 AOV that is $3.85 against Stripe's ~$2.98, a delta of $0.87/order, or $5,220/year at 500 orders/month, which is *cheaper* than three tax registrations plus filings at $6,000-10,000/year. **But verify availability before planning around it:** Paddle and Lemon Squeezy are oriented to software and digital products and may well decline a religious-services merchant outright. If they do, the fallback is Stripe plus your own UK VAT and EU OSS registrations, and that $800/month compliance line in the fixed costs is real.

#### 9.6 Corporate structure: the recommendation

**Snanify India Private Limited, as the sole operating and contracting entity.**

| | Option 1: India only | Option 2: Foreign holdco + Indian subsidiary | Option 3: Foreign entity only |
|---|---|---|---|
| Diaspora sales | Zero-rated export, LUT, ITC refundable | Zero-rated, but intercompany | Fine, but PE anyway |
| Indian sales | UPI at ~2.36%, GST question open | Same as Option 1 | OIDAR: 18% IGST, no ITC, PA-CB dependency |
| Tax rate | **25.17%** (s.115BAA) | 25.17% on the Indian markup + holdco tax | ~35% + surcharge/cess ≈ **38-44%** on attributed profits |
| Transfer pricing | None | Form 3CEB, annual TP study, ~$5-8k/yr | n/a |
| PE risk | None | Holdco exposed if it bills customers | **Certain** — contracted officiants, cameras, ghat retainers create a business connection under s.9(1)(i) |
| SEP | n/a | n/a | Triggered above ₹2 crore of Indian receipts or 3 lakh Indian users |
| Setup / annual | ~$1,500-3,000 / ~$4-8k | ~$8-15k / ~$20-30k | Deceptively cheap, then ruinous |

**Reason in one line:** your COGS is 100% rupee, your officiants and ghat permissions are Indian, your data is meant to sit in India (which your ethics page already commits to), and the one tax rule that used to punish this structure was repealed on 30 March 2026.

Two footnotes. **The 2% equalisation levy was abolished from 1 August 2024** (VERIFIED), removing a cost that would previously have applied to a foreign-entity structure — but the underlying SEP provisions (₹2 crore of Indian receipts *or* 3 lakh Indian users creating a business connection) remain. And the Berlin footer: an Indian company managed from Germany is still Indian-resident by incorporation, which is fine; you personally become a German tax resident receiving Indian dividends at 10% DTAA withholding. Manageable, but tell your German accountant before, not after.

---

### 10. Twelve-month revenue projection

Orders per month, indexed from launch. Seasonality reflects Pitru Paksha, Kartik Purnima and Makar Sankranti — your own growth doc is right that roughly half the year's volume sits in two lunar months.

| | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 | M11 | M12 | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Conservative | 15 | 25 | 45 | 40 | 35 | 45 | 55 | 60 | 70 | 85 | 95 | 110 | **680** |
| Base | 30 | 60 | 130 | 100 | 90 | 120 | 150 | 180 | 220 | 280 | 340 | 420 | **2,120** |
| Optimistic | 60 | 140 | 380 | 280 | 240 | 320 | 420 | 520 | 650 | 820 | 1,000 | 1,250 | **6,080** |

At AOV $67.00 and contribution $40.03 (59.7%):

| | Revenue | Contribution | Fixed | Marketing | **EBITDA pre-founder** | M12 run-rate |
|---|---|---|---|---|---|---|
| **Conservative** | $45,560 | $27,220 | $36,408 (2 ghats) | $6,834 (15%) | **−$16,022** | $88k ARR |
| **Base** | $142,040 | $84,864 | $37,376 (3 ghats by M9) | $21,306 (15%) | **+$26,182** | $338k ARR |
| **Optimistic** | $407,360 | $243,194 | $42,000 (5 ghats) | $73,325 (18%) | **+$127,869** | $1.005M ARR |

**Session load implied (base case, M12):** 420 orders across, say, 30 sessions = 14 sankalps/session. You are running roughly one session per day across three ghats and using **7% of theoretical capacity.** There is no supply problem in this business for years.

**Sanity check against real companies.** AppsForBharat (Sri Mandir) reported ₹18.53 crore (~$2.2M) of operating revenue in FY24, up 5x from ₹3.53 crore, with 40M downloads and $33M raised before its $20M Series C; VAMA doubled to ₹20 crore (~$2.4M) in FY25 and guides to ₹50 crore (both VERIFIED). Against that, a bootstrapped diaspora-only SEO-led entrant reaching **$338k in year one is ambitious but inside the envelope**. The optimistic case is the tail, not the plan. The conservative case loses $16k — which is the correct thing for a conservative case to do, and is survivable on a bootstrap.

**Cash versus revenue.** In the base case, 170 Varsh orders at $251 collect $42,670 upfront; roughly 55% is unperformed at month twelve, giving **$23,468 of deferred liability** that is refundable pro-rata with no expiry forfeiture. Your cash balance will look better than your P&L all year. Do not confuse the two, and do not spend the float on marketing.

---

### 11. On "as little human interaction as possible"

Your constraint and your ethics page are compatible, and the model above assumes they stay that way. The only human minutes I have costed are: the officiant's ~53 minutes per session, the camera operator's session time, a 3% human-touch support rate, the two-person sankalp break-glass process, the monthly transparency report, and the third-party audit at $500/month. Everything else — muhurat scheduling, patra generation, Naam Kshan forced alignment, verification, refunds (one click, no human, per your own commitment) — automates cleanly.

**Two places the line should not move, and one that should.**

**Do not move the 45-second recitation floor.** Halving it to 22 seconds doubles session capacity and halves officiant cost per sankalp. It is, by a wide margin, the largest single margin lever in the entire model — a ~30% swing in contribution. It is also the lever that converts the product into the thing your ethics page exists to prevent. Someone will propose it in month nine, framed as "optimising session throughput." Name it now, in writing, so that when it arrives you recognise it.

**Do not cut the audit and the transparency report.** They are $500/month and four founder-hours. They are also the entire defensible difference between you and a WhatsApp puja operator charging ₹7,100. Cutting them saves 0.4% of revenue and destroys 100% of the positioning.

**Do move one thing:** restate the dakshina promise. Today it reads *"all of it reaches him, none of it reaches us"* — while you silently absorb a 3.5-4% processor fee and book zero revenue. Change it to *"100% of your dakshina reaches him, net of the payment processor's fee, which we publish."* It is more honest than the current wording, it costs you nothing in goodwill, and it closes a leak that scales linearly with dakshina volume.

---

### 12. The four things to do first

1. **Set Ekal at $21 and Bharat Dar Ekal at ₹501, before you freeze the officiant pay formula for its committed twelve months.** Doubles contribution per session; fixes the officiant floor at n≥5.
2. **Incorporate Snanify India Pvt Ltd.** Everything else — payments, GST, FEMA, officiant contracts, data residency — resolves downstream of this one decision, and the tax rule that used to argue against it was repealed in March.
3. **File the GST advance ruling on Entry 13(a).** It is 18% of the entire India ladder and you have already published the losing argument.
4. **Get a written quote for commercial filming permission at Har Ki Pauri and one other ghat.** The ₹10,000/month in this model is a guess, it is the largest unpriced input in the business, and if it is ₹100,000 the break-even moves from 76 orders a month to about 190.

---

**Sources:**
[TechCrunch — Sri Mandir Series C, ARPU and take-rate](https://techcrunch.com/2025/06/30/sri-mandir-keeps-investors-hooked-as-digital-devotion-grows) · [YourStory — AppsForBharat $20M Series C](https://yourstory.com/2025/07/sri-mandir-appsforbharat-secures-series-c-round-susquehanna-asia-vc) · [Prayag Pandits — NRI puja pricing](https://prayagpandits.com/nri-puja-services/) · [Business Today — OIDAR from 1 Oct 2023](https://www.businesstoday.in/latest/economy/story/foreign-oidar-firms-providing-services-to-unregistered-persons-must-register-pay-gst-in-india-from-october-1-399933-2023-09-27) · [CBIC — Notification 12/2017-CT(R)](https://cbic-gst.gov.in/hindi/pdf/central-tax-rate/Notification12-CGST.pdf) · [CBIC — Circular 159/15/2021-GST on intermediaries](https://cbic-gst.gov.in/pdf/Circular-No-159-14-2021-GST.pdf) · [Grant Thornton — Finance Act 2026 omits IGST s.13(8)(b)](https://www.grantthornton.in/insights/articles/gst-on-intermediary-services/) · [Trilegal — RBI PA-CB circular](https://trilegal.com/knowledge_repository/rbis-circular-on-cross-border-payment-aggregators/) · [Stripe — India, accept international payments](https://docs.stripe.com/india-accept-international-payments) · [Business Standard — RBI e-mandate limits](https://www.business-standard.com/economy/interviews/rbi-raises-limit-of-e-mandates-for-recurring-online-transactions-to-1-lakh-123120801110_1.html) · [Business Standard — AFA for cross-border CNP](https://www.business-standard.com/finance/personal-finance/rbi-introduces-extra-security-for-international-online-payments-with-afa-125020700566_1.html) · [Razorpay — UPI transaction charges](https://razorpay.com/learn/upi-transaction-charges/) · [TechTimes — PSS Act amended, 4 Aug 2026](https://www.techtimes.com/articles/322958/20260804/india-opens-door-upi-merchant-fees-parliament-amends-six-year-zero-mdr-law.htm) · [MHA — FCRA FAQs](https://www.mha.gov.in/sites/default/files/2022-07/ForeigD-ForeigD-FCRA_FAQs_1.pdf) · [India Briefing — equalisation levy abolished](https://www.india-briefing.com/news/india-to-abolish-2-percent-equalisation-levy-on-foreign-digital-companies-from-august-1-2024-33736.html/) · [vatcalc — EU VAT on virtual events from Jan 2025](https://www.vatcalc.com/eu/vat-changes-on-virtual-events-january-2025/) · [FKGB — UK NETP nil VAT threshold](https://www.fkgb.co.uk/uk-vat-registration-foreign-businesses-2026/) · [Pew Research — Indians in the US](https://www.pewresearch.org/race-and-ethnicity/fact-sheet/asian-americans-indians-in-the-u-s/) · [Data For India — PLFS salaried earnings](https://www.dataforindia.com/salaried-jobs/) · [MEA — population of overseas Indians](https://www.mea.gov.in/population-of-overseas-indians) · [Cloudflare Stream pricing](https://flarecalc.com/calculators/stream/) · [Trading Economics — USD/INR](https://tradingeconomics.com/india/currency)

---

## Adversarial review

**Verdict:** needs-work

### Wrong or unverified

- FATAL — THE BLENDED AOV USES THREE WRONG SKU PRICES, AND EVERY REVENUE NUMBER IN THE DOCUMENT IS BUILT ON IT. Per /Users/sven/dev/snanify/docs/design/catalog.md lines 372-377 and 384: Parivar is $31/₹751, not $51. Pitru Tarpan is $21/₹501, not $51 (line 191 and line 384 both). Varsh is $108/₹2,100, not $251 ($251 is Parivar Varsh, a different SKU). Recomputing the stated mix at real catalog prices plus the recommended $21 Ekal: 0.40×21 + 0.25×31 + 0.15×21 + 0.12×151 + 0.08×108 = 8.40+7.75+3.15+18.12+8.64 = $46.06, not $67.00. AOV is overstated 45%. Cascade: base-case year-1 revenue falls from $142,040 to ~$97,600; M12 run-rate from $338k to ~$232k; base-case EBITDA pre-founder from +$26,182 to roughly +$6,000, i.e. the base case is not profitable, it is break-even before the founder is paid at all. The $409k/month capacity ceiling becomes $281k.
- FATAL — THE OFFICIANT-PAY-VS-PLFS CLAIM IS WRONG BY ~10x AND IS RECOMMENDED FOR PUBLICATION. ₹20,390 ÷ ₹24,434/month = 0.83 months, not 'about 7 months' (numbers section) and not 'roughly ten months' (recommendation 12). The document states both figures, which are also inconsistent with each other. Recommendation 12 says to publish this in the committed quarterly transparency report and that it will make 'the you exploit priests story die on contact'. Publishing a 10x-inflated claim into a report the ethics page (src/content/trust.ts:249) promises will be accurate is a direct breach of the trust commitments, and it is the kind of error a hostile reader finds in thirty seconds. The honest number — a 53-minute session pays the officiant slightly less than one month of urban regular-salaried mean earnings — is still a good number. Use that one. (PLFS all-India regular-salaried mean is ~₹20,700-21,100/month per 2023-24 PLFS; the ₹24,434 urban figure is plausible but was not independently confirmed in my search.)
- THE 51-SANKALP FULL SESSION — THE ENTIRE BASIS OF THE HEADLINE — RESTS ON A CONTRADICTION THE ANALYSIS PRESENTS AS SETTLED FACT. It says the session structure is 'derived from your own published rules, not invented'. But trust.ts:145 says 'at least forty-five seconds of recitation for every named sankalp', while catalog.md:18 derives the 51 cap from '51 names at ~6 seconds is ~5 minutes of name-reading'. These are irreconcilable (45s × 51 = 38 min vs 6s × 51 = 5 min), and catalog.md:652 — the project's own adversarial review — states flatly that the arithmetic is unreconciled and that 'if the intention is read, 51 is impossible in a 45-minute session and the honest cap is 15-20'. The analysis silently adopts 45s AND 51 together, which is the one combination the source docs say cannot both be true. If the honest cap is 20, the $687 full-session contribution, the ₹115,400/officiant-hour headline, and the 204-sankalp/day capacity ceiling all collapse by ~60%.
- SESSION DURATION OMITS THE RITE ITSELF. 'Session recitation time = n × 45s + segments × 3 min' counts only the name-reading. catalog.md:435 specifies 'session runtime = base snan (~38 min) + Σ add-on durations' and catalog.md:86 gives Samuhik sessions as 30-45 min before add-ons. A 51-sankalp session is therefore ~71-90 officiant-minutes, not 53. That inflates revenue-per-officiant-hour by ~40% and, more damagingly, distorts the whole contribution-per-officiant-minute ranking table, which allocates only 0.75 min to an Ekal but a full 30 min to an Ekantik. Allocating the shared base rite across sankalps puts Ekal at ~1.4-1.8 min, roughly halving its $18.04/min. The Ekal > Ekantik ranking survives; the '100x better' magnitude does not.
- THE BREAK-EVEN SESSION COUNT IS WRONG BY ~2.5x ON THE ANALYSIS'S OWN MIX. '227 orders ÷ 14 sankalps per session = ~16 sessions/month = 4 sessions/week. Write that number on the wall.' But the mix contains 12% Ekantik, and an Ekantik order IS a dedicated private session, 1:1. At 227 orders: 27 Ekantik sessions plus ~200 Samuhik orders at 14/session = 14 sessions = ~41 sessions/month, not 16. Correcting for the AOV error too, break-even is ~339 orders/month, so ~40 Ekantik sessions + ~21 Samuhik = ~61 sessions/month, roughly 2 per day across two ghats. That is a materially different operating picture and it interacts badly with recommendation 8, which says to push Ekantik hardest in year one.
- ARITHMETIC SLIP IN THE MARKETING-ADJUSTED BREAK-EVEN. 'Contribution net of CAC = $30.98' — $40.03 minus 15% of $67 is $29.98, not $30.98. At $29.98 the answer is 235 orders, not 227. Small on its own, but it is in the one number the document tells you to write on the wall.
- 'THE CATALOG IS BUILT ON ₹88; EVERY INR FIGURE IN CATALOG.MD IS ~8% STALE' IS A MISREADING. catalog.md:343 states in bold 'Two ladders, not one converted number' and :348 says the ladders are 'not conversions of each other' — ₹88 is used only to express that the Bharat Dar lands at 20-40% of the Vishwa Dar. The INR prices are dakshina-ladder shagun numbers (₹101/251/501/751/1100/2100/5100/21000). Nothing is stale. At ₹95.24 the published ratio simply becomes 18-37%. Presenting this as a discovered defect in a numbers section labelled VERIFIED undermines confidence in the rest.
- THE SRI MANDIR ARPU EVIDENCE IS REAL BUT MISAPPLIED. The ₹7,000 (~$81) overseas figure and the ~20% diaspora revenue share are correctly cited from TechCrunch (30 Jun 2025) — I confirmed both. But ₹7,000 is ANNUAL revenue per user accumulated across many small transactions (chadhava, prasad, puja bookings, typically ₹101-₹1,100 each) on a 3.5M-MAU app with $33M+ raised and years of retention. It is not evidence that $21 clears as a single cold first-purchase price. Sri Mandir's per-transaction prices are low; the ARPU comes from frequency. Using annual ARPU as a per-order price benchmark is a category error, and it is the sole external support for the document's central recommendation.
- THE JAPA 'CONTRIBUTION-NEGATIVE AT 180 MIN' CLAIM DOES NOT HOLD ON THE PUBLISHED PAY FORMULA. trust.ts:191 pays the greater of ₹1,800 or 20% of segment gross — per segment, not per hour. At $51 (₹4,857) the officiant is floor-bound at ₹1,800 whether the japa runs 55 minutes or 180. Working it: ₹4,857 gross − 1,800 officiant − 600 camera − 400 streaming − 263 payments − 125 support − 209 refund = ~₹1,460 contribution, positive at both durations. Japa is a disaster on OPPORTUNITY COST, which is the correct and sufficient argument. The analysis states 'negative' with no arithmetic, and finding 4 is graded high confidence.
- REFUND RESERVE OF 4.3% IS ASSERTED, NEVER SOURCED, AND STRUCTURALLY TOO LOW. It appears in every table as a hard cost line with no ASSUMPTION label and no derivation. The ethics page (trust.ts:242, :1185) promises a 14-day no-reason-asked refund, one button, no retention offer, no 'are you sure', on a faith purchase with no returnable good; catalog.md:148 and :152 add proactive full refunds on stream drops and unsafe water offered without the customer asking. Nothing in this business resembles a 4.3% environment. Worse, the model books a refund as 4.3% of gross, but a refunded order also loses the payment processor's fee (usually non-refunded) and the officiant share, which the ethics page says is paid in full regardless (trust.ts:242). True cost per refund exceeds 100% of the order.
- THE 15%-OF-REVENUE MARKETING LINE IS A CAC ASSUMPTION IN DISGUISE AND IS NEVER DEFENDED. 15% of $67 is a $10.05 CAC, and at the corrected $46 AOV it is $6.91. The document contains no conversion rate, no CPC, no channel mix, no LTV/CAC ratio and no payback period anywhere. A cold, high-trust, one-time religious purchase to diaspora, from a brand nobody has heard of, competing against free temple alternatives, does not acquire at $7-10. At a plausible 1% cold-traffic conversion and $1.50 CPC, CAC is ~$150 — fifteen times the modelled figure, and more than three times the corrected AOV. This single unexamined number determines whether the base case is a business or a hobby, and it is the weakest link in the document.
- THE 12-MONTH CURVE IS ASSERTED SHAPE, NOT MODELLED DEMAND. The peaks are labelled Pitru Paksha / Kartik / Makar Sankranti but the table is 'indexed from launch' with no launch month, so the festival labels cannot attach to the months shown. The actual shape is a launch-buzz spike at M3 then a trough — not a festival shape. Base-case growth from M6 to M12 is 120→420 orders, ~23% compounding monthly for six straight months, with no acquisition mechanic behind it. The sanity check calls this 'SEO-led', but SEO does not produce 30 orders in M1 and 130 in M3; that requires paid, which contradicts the 15% marketing line. Fixed costs also rise from $36,408 (conservative) to $37,376 (base) to $42,000 (optimistic) with no explanation, and $42,000/yr of fixed cost at 6,080 orders and two ghats implies zero operational headcount.
- THE COMPARABLE IS CHERRY-PICKED TO THE FAVOURABLE YEAR AND OMITS THE LOSSES. AppsForBharat FY24 at ₹18.5 Cr is correctly cited, but FY25 is ₹69.6 Cr (3.8x) with a net loss of ₹45 Cr — I confirmed both. VAMA FY25 is ₹19.5 Cr, not ₹20 Cr. The relevant fact for a unit-economics memo is that the best-funded company in this exact category burns roughly 65 paise for every rupee of revenue, and that fact is absent. Benchmarking Snanify's year-one plan against a two-year-stale revenue figure from a competitor that is deeply unprofitable is the wrong sanity check.
- THE PSS ACT CLAIM OVERSTATES WHAT HAPPENED AND ITS RELEVANCE. On 4 Aug 2026 the Taxation and Other Laws (Amendment) Bill 2026 was INTRODUCED in the Lok Sabha amending s.10A; the government has since clarified no charges are imposed and NPCI's steering committee will decide if and how. 'Parliament amended the PSS Act' is stronger than the record. More to the point, the protections are explicitly for small merchants and sub-₹2,000 transactions — the Bharat Dar is ₹101-₹751, almost entirely inside that carve-out, so MDR restoration is close to irrelevant to Snanify. The advice to model India payments at 2.36% is right, but for the Razorpay platform-fee reason only.
- THE RBI CROSS-BORDER CNP CLAIM IS ACCURATE BUT INVERTED IN MEANING. The 1 Oct 2026 deadline is real: issuers must be able to validate AFA on cross-border CNP transactions when the overseas merchant or acquirer REQUESTS it. That is an optional capability for the merchant's benefit, not a barrier to acceptance. Calling it 'a second independent reason the Indian market requires an Indian entity' is a stretch — it blocks nothing. Correctly graded medium confidence, but the conclusion drawn from it is not supported.

### Missing

- THE ETHICS COLLISION THE DOCUMENT NEVER NAMES: RECOMMENDATION 8 SEQUENCES THE YEAR-ONE PUSH ONTO GRIEF SKUs. 'In year one push Ekantik ($151) and Pitru Tarpan ($51) for absolute contribution per order.' Pitru Tarpan is the bereavement product. trust.ts:306 commits to 'no advertising placed against grief, funerals, obituaries or illness'; catalog.md:546 forbids upsell, cross-sell and recommendation modules in post-bereavement, Pind Daan, Smaran and health-flagged flows; catalog.md:543 forbids countdown timers on those surfaces. And growth.md:563 — the project's own review — already found that 'the wedge is explicitly guilt-indexed... you have identified guilt as the conversion engine in the same document that bans guilt language.' A margin-driven recommendation to lead with the grief SKUs is exactly the pressure the ethics page exists to resist, and the analysis does not acknowledge the tension once. This needed a paragraph and it got nothing.
- THE GDPR ARTICLE 9 EXPOSURE IS NEITHER COSTED NOR MENTIONED, WHILE THE DOCUMENT RECOMMENDS ENTERING THE EU. catalog.md:611 and :626 identify a structural privacy failure at the core of the Samuhik product: every buyer receives a recording in which 50 other households' names, gotras, dead relatives and freely-typed sankalp intentions are read aloud, and the doc explicitly anticipates users typing cancer diagnoses into that box. Religious belief and health are Art. 9 special categories; DPDP Act 2023 applies domestically. Recommendation 11 says register for EU non-Union OSS and sell into the EU, with a careful 19-27% VAT calculation, while the Art. 9 fine exposure (up to 4% of global turnover) and the mandated fix are absent. The recommended fix — per-household clip windows instead of full-session distribution — also changes the encoding and storage pipeline, so the flat ₹1,900/session streaming line is not costed against the architecture the docs say is required.
- DMRA 1954 AND CONSUMER PROTECTION ACT 2019 ARE ABSENT FROM AN OTHERWISE STRONG REGULATORY SECTION. catalog.md:633 already flags that Sankalpit Japa is marketed on illness ('Illness in the family, surgery, a long recovery' at $251) and that this runs at the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954, which a disclaimer does not cure, plus CPA 2019 misleading-advertisement provisions. Recommendation 6 addresses Japa purely as a margin problem and says 'price it at $251+ with the real duration published' — which raises the price of the SKU with the live advertising-law exposure. The document does GST, FEMA, FCRA, OIDAR, UK/EU VAT and RBI thoroughly and then omits the two India advertising statutes most likely to actually bite a spiritual-services seller.
- PAYMENT PROVIDER RISK CLASSIFICATION AND ROLLING RESERVES. Fees are modelled at a flat 4% + $0.30 (Stripe) and 3.54% (Razorpay international) with no discussion of MCC assignment. Religious/spiritual services with no trading history, live-event delivery, an unconditional no-questions refund and a diaspora card-not-present mix is a profile that commonly attracts a high-risk classification, elevated rates, and a rolling reserve of 5-10% held 90-180 days. That is simultaneously a margin risk and a working-capital risk, and it is the single most common way a business with correct paper unit economics dies in month four. Not mentioned. Related: no payout-timing analysis at all — the officiant is paid per session while Stripe/Razorpay settle on T+2 or later.
- FX IS TREATED AS A CONSTANT, NOT A RISK, IN A BUSINESS THAT IS 100% RUPEE COST AND ~90% DOLLAR REVENUE. The document notices the rupee moved from ₹88 to ₹95.24 and treats it only as a reason to correct the catalog. A move back to ₹88 costs ~7 points of contribution margin at fixed dollar prices; the ladders are shagun numbers ($11/21/31/51/108/151/251/1008) so intermediate repricing is off the table by design. That interaction — an aesthetic pricing commitment that removes the FX hedge of small price adjustments — deserved a paragraph. There is no sensitivity table anywhere in the document, on FX, on refund rate, on CAC, or on session fill.
- SUPPORT AT 3% HUMAN CONTACT IS IMPLAUSIBLE AND NEVER JUSTIFIED. Live-event and ticketing businesses run 15-30% contact rates. This one adds bereavement context, timezone-inverted 2-3am muhurats (growth.md:599), a proactive-refund commitment that says 'never make the user ask' (catalog.md:148), a 30-day mispronunciation remedy (catalog.md:151), and an ethics page that promises real answers. At 3% the model books 7 tickets/month at break-even. If the true rate is 20%, support alone is a multi-point margin item and, more importantly, it breaks the owner's stated goal of minimal human interaction — which is the one constraint the whole exercise is designed around. The analysis never tests the goal against its own cost line.
- THE ₹8,000/MONTH OFFICIANT RETAINER IN FIXED COSTS IS UNRECONCILED WITH THE 20% PAY FORMULA. If the officiant is paid the greater of ₹1,800 or 20% of segment gross, what is the retainer buying, and is it double-counted against the 20%? And ₹8,000/month is not a retainer that secures exclusivity from a person the same document says will earn ₹20,390 in one session. Relatedly, the ₹10,000/month 'assumed permission/samiti fee' is the assumption most likely to break: the document's own headline is that a full session grosses ₹115,400 per officiant-hour at the ghat. Once that number is visible at Har Ki Pauri, ghat rent does not stay at ₹10,000. The analysis publishes the number that destroys its own fixed-cost assumption and does not notice.
- NO ANALYSIS OF DISINTERMEDIATION OR COMPETITIVE RESPONSE. An officiant earning ₹20k/session learns in one quarter that he can take bookings directly, and the barrier to a copycat is a phone, a tripod and a Razorpay account. The only genuine moats here are the verification architecture, the published ethics and the muhurat/scheduling layer — none of which are valued or defended anywhere in a document about monetisation. Nothing on retention or repeat rate either: the whole model is order-count driven with no cohort behaviour, which for a once-a-year occasion purchase is the difference between a business and a treadmill.
- NO STRESS TEST OF THE 'ONLY THE OFFICIANT IS HUMAN' PREMISE. The task set the line explicitly. The cost model quietly assumes automated scheduling, automated Naam Kshan indexing, automated patra issuance, automated verification, automated refunds and 3% human support, with no build cost, no engineering time, and no fixed-cost line for any of it beyond $250/mo hosting. Timecode indexing per name (catalog.md:126) in particular is either a human watching a recording or an ASR pipeline that has to work on Sanskrit recitation of Indian proper nouns at a noisy ghat. That is the hardest technical problem in the business and it carries a cost of zero in this model.

### Must survive

- THE CENTRAL STRUCTURAL FINDING IS CORRECT AND IS THE MOST VALUABLE THING IN THE DOCUMENT. 'Marginal cost of an additional sankalp is approximately zero' is false, and the analysis kills it properly by itemising the variable stack: officiant 20% (contracted, not discretionary), payments, refund reserve, per-segment camera, streaming, support = ~36% variable at $21. The insight that the officiant share being a PERCENTAGE rather than a flat fee is what caps the margin ceiling — and that this is a deliberate ethical choice, not an inefficiency — is exactly right and reframes the whole business. The related finding that all the batching gain lives in the 5→20 range and that the curve is flat from 20 to 51 is the correct operational conclusion and it survives every correction I made above.
- THE PER-SEGMENT ARITHMETIC IN THE COST TABLES IS SOUND. I recomputed the $21 n=51 column line by line: gross ₹101,952 (51 × 21 × 95.24 = ₹102,002, a ₹50 rounding difference), officiant ₹20,390, payments ₹5,537 (4% + 51 × $0.30), support ₹1,275, refund ₹4,384, total ₹36,486, contribution ₹65,466 = $687, margin 64.2%, cost per sankalp ₹715. All correct. The n=20 at $11 officiant figure of ₹4,190 correctly applies the per-segment floor to an 11+9 split. (One outlier: the $11 n=51 officiant figure of ₹11,016 should be ~₹10,764 on the same segment logic — immaterial, but it means the floor was applied inconsistently across the two tables.)
- THE OFFICIANT FLOOR FINDING IS CORRECT AND GENUINELY USEFUL. max(₹1,800, 20% of segment gross) binds while 0.20 × n × price × 95.24 < 1800: at $11 that is n < 8.6, at $21 it is n < 4.5. Verified against trust.ts:191. Framing the price increase as the thing that makes half-empty sessions viable — rather than as pure margin grab — is the strongest argument in the document for the price move, and it is independent of the flawed Sri Mandir evidence.
- THE 'ALL-INDIA SEGMENT IS LOSS-MAKING' FINDING IS THE BEST OPERATIONAL CATCH IN THE DOCUMENT. 11 Indian buyers at ₹251 = ₹2,761 gross against a ₹1,800 officiant floor (65% of gross) plus ₹600 camera plus ₹350 streaming = ₹2,750, leaving ~₹11. That is correct, it is non-obvious, and it converts into a hard scheduler rule — mixed segments are mandatory — that nobody would have discovered from the catalog. The paired recommendation to move Bharat Dar Ekal from ₹251 to ₹501 (both on the published dakshina ladder, so no shagun-number violation) and cap Bharat Dar at 4 of 11 peak slots follows properly from it.
- THE GREEDY-PACKING RECOMMENDATION IS THE HIGHEST-LEVERAGE ITEM AND IT IS CORRECTLY IDENTIFIED AS A DISGUISED UX DECISION. 'Never open segment two until segment one holds eleven' falls directly out of the per-segment floor, costs nothing to implement, and is the difference between a 33% and a 64% margin session. Publishing fewer, fuller muhurat windows to concentrate demand is the right corollary. This is the recommendation I would ship first.
- THE REGULATORY RESEARCH IS THE STRONGEST SECTION AND MOST OF IT CHECKS OUT. I independently verified: s.13(8)(b) IGST was omitted via the Finance Act 2026 following the 56th GST Council meeting of 3 Sept 2025, with Presidential assent on 30 Mar 2026, moving intermediary place of supply to the recipient — so the India-entity recommendation genuinely does rest on a real and recent change. RBI's 1 Oct 2026 cross-border CNP AFA deadline is real. The s.115BAA 25.17% vs foreign-company rate comparison, the OIDAR 'minimal human intervention' deletion, the FCRA vendor-purchase-vs-donation distinction, and the UK nil VAT threshold for non-established persons are all correctly stated as far as I can check. The Annadaan/Gau Seva restructuring recommendation — same customer promise, different fund flow — is precisely the right shape of fix.
- THE ENTRY 13(a) GST FINDING IS THE SHARPEST PIECE OF THINKING IN THE DOCUMENT. Noticing that Snanify's own published ethics language — 'we are not a temple and are not your purohit', trust.ts s1 — is the tax department's best argument against the religious-ceremony exemption is exactly the kind of cross-domain catch this exercise is for. Correctly graded medium confidence. The added point that the exemption is not costless (no input credit, Rule 42/43 apportionment against zero-rated exports) shows real command of the material. Budget for taxable, treat exemption as upside, is the right posture.
- THE DAKSHINA PASS-THROUGH LEAK IS REAL AND WELL-SPOTTED. trust.ts:194 promises 'all of it reaches him, none of it reaches us' while Snanify silently absorbs a 3.5-4% processor fee — so the promise is currently more expensive than stated and slightly untrue in the other direction. The proposed restatement ('100% of your dakshina reaches him, net of the payment processor's fee, which we publish') is more honest than the original and costs nothing. This is exactly the kind of small correction that keeps a published ethics page defensible.
- THE DEFERRED-REVENUE WARNING IS CORRECT AND OFTEN MISSED. 170 Varsh × $251 = $42,670 collected, ~55% unperformed at M12 = $23,468 of refundable liability, with no expiry forfeiture available because catalog.md:154 already commits to pro-rata refunds on unused snans. 'Do not read it as profit' is the right instruction. (The dollar figures move with the AOV correction, but the mechanism and the warning stand.) The related recommendation to avoid prepaid credits — cash-flow benefit without breakage benefit, since breakage is ethically foreclosed — is well reasoned.
- THE CONTRIBUTION-PER-OFFICIANT-MINUTE FRAME IS THE RIGHT ANALYTICAL LENS EVEN THOUGH THE NUMBERS IN THE TABLE ARE OFF. Identifying officiant-minutes as the only genuinely scarce input, and then showing that the catalog's premium SKUs are the worst performers against it, inverts the naive 'sell the expensive thing' instinct and is correct. The staged recommendation — contribution per ORDER while demand is scarce, contribution per MINUTE once sessions fill — is the right way to hold both truths. Fix the minute allocations and re-run it; the conclusion will survive.
- THE DUAL-PRICING RECOMMENDATION IS RIGHT, BUT NOTE IT IS NOT NEW. Publishing both ladders side by side, gating on the payment instrument's issuing country rather than IP, and accepting NRI leakage rather than policing it is already the decided and reasoned position at catalog.md:28, :30, :353 and :691. It should be kept, but it should be presented as confirmation of an existing decision rather than as an M-effort recommendation. The genuinely additive part is the 8-12% leakage estimate and the point that the ladders should be differentiated by service (timezone-native scheduling, local-language patra, WhatsApp delivery) so the gap has a product behind it.