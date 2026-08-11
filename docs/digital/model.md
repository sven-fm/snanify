# Snanify Business Model: 7,400 Subscribers at $48 a Year

**$20,000 a month in profit is 7,400 people paying $48 a year, so price this as a $4-a-month daily habit billed annually, not as a rare event, and let a permanently free live-river tier do the selling.**

# The machine that nets $20,000 a month

## 1. The one number

**7,400 paying subscribers at a blended $4.05 per month.** That is the whole business. Everything below is the arithmetic that gets there and the design decisions that fall out of it.

---

## 2. Cost base

This is cheap. It is not free. Two columns: launch, and month 12 at ~7,400 subscribers.

| Line | Launch (M1) | Scale (M12) | Note |
|---|---|---|---|
| Vercel Pro, 2 seats plus usage | $40 | $140 | Next 16 already deployed here |
| Postgres (Neon) | $19 | $69 | Accounts, sankalp records, streaks |
| Object storage plus CDN (Cloudflare R2) | $10 | $15 | Zero egress fee. This is why audio is not a cost problem |
| CDN failover (Bunny.net) | $0 | $20 | Second origin for audio |
| Auth (Clerk, free under 10k MAU) | $0 | $50 | Or self-host magic links on the same DB |
| Transactional email (Resend) | $20 | $90 | Renewal notices, occasion reminders |
| CWC data polling | $0 | $0 | Public data, one cron every 15 minutes, inside Vercel |
| Error tracking plus analytics | $26 | $60 | Sentry plus Vercel Analytics |
| Google Workspace, 2 seats | $14 | $14 | |
| Domain, DNS, registered agent, filings | $52 | $50 | Amortised |
| Accounting, India GST/OIDAR, VAT | $250 | $400 | The single largest fixed line. See section 9 |
| Audio licensing, amortised over 24 months | $250 | $250 | $6,000 one-time commission |
| Support VA, 10 hrs/week, from M8 | $0 | $400 | 150 to 250 tickets a month at 7,400 subs |
| Legal review retainer, copy and claims | $0 | $100 | |
| Buffer | $220 | $42 | |
| **Total fixed** | **~$900** | **~$1,700** | |

**Marginal cost per subscriber per month: about $0.20.** A session is one gauge read (cached, shared across all users), one panchang computation (deterministic, precomputed), and audio that is already in the browser cache. Storage is 24 recordings. That is it. This is a near-zero-marginal-cost product and every pricing decision below assumes that.

**Founders' time.** Two founders. The model pays them nothing in months 1 to 5, roughly $2,000 a month combined in months 6 to 8, and $10,000 each from month 12. Cumulative year-one net is $58,463, which is about $2,050 per founder per month averaged across the year. Say that out loud before starting.

**Capital required up front:**

| | |
|---|---|
| Audio commission, 24 field recordings | $6,000 |
| Legal, terms, claims review, India entity | $3,000 |
| Deepest operating cash hole (month 4) | $3,424 |
| **Total** | **$12,424** |

Twelve and a half thousand dollars to reach profitability. That is fundable out of pocket.

---

## 3. Therefore, what revenue

Net to founders = Gross, less payment fees (5.0% blended), less refunds and chargebacks (2.0%), less marketing ($4,200 at steady state), less fixed ($1,700).

```
20,000 = G x 0.93 - 4,200 - 1,700
G = 25,900 / 0.93 = $27,849 per month gross
```

**$27,849 a month. $334,194 a year gross. That is the target.** Not a million.

**Break-even points:**
- Keep the lights on, no founder pay, no marketing: **477 subscribers.**
- Full $20,000 a month with 15% of revenue on marketing: **7,334 subscribers.**

Four hundred and seventy seven people cover every fixed cost in the business. That is the number to reach in month five, and it is the number that makes this survivable regardless of what happens next.

---

## 4. Routes to it: (a), (b) or (c)

### (a) One-time purchases only. Rejected.

At an $18 ticket ($16.80 net after international card fees), $27,849 a month requires **1,658 purchases every single month**, forever, with nothing carried over. At a 1.2% visitor-to-buyer rate that is **138,000 sessions every month**, and any month the marketing stops, revenue goes to zero. Worse, the demand is seasonal: Kartik Purnima, Magha, Pitru Paksha, Ganga Dussehra. Six good weeks and forty six bad ones. This is the old model's revenue shape and it is why the old model needed $51.

### (b) Subscription only, no free tier. Rejected.

Cold traffic converts to paid at roughly 0.5%. With a free tier feeding it, blended visitor-to-paid is about 1.05%. Subscription-only needs **370,000 sessions a month at month 12** against 176,000 for the mixed route, and it forfeits the email list, which is the asset that monetises the festival calendar every year at zero acquisition cost.

### (c) Free tier feeding an annual-first subscription, plus one one-time product. **Chosen.**

Three products, no more:

1. **Darshan**, free forever. The live reading from all six waters, today's tithi, the next muhurat, one sankalp a week, a three minute session. No card, ever.
2. **Nitya**, $48 a year. The daily practice.
3. **Kul**, $96 a year. Six named people on one payment.

Plus **Sankalp Patra**, $18, one-time, two included free per year on Nitya.

The free tier is not a trial. It never expires and the live river never goes behind a wall. This is deliberate: the river reading is the marketing, it is the SEO surface, it is the thing people screenshot and send to a WhatsApp family group, and it costs $0.001 to serve. Putting it behind a paywall would be the single most expensive mistake available.

---

## 5. Price

The old $51 existed to cover an officiant's floor. There is no floor now. The new price is set by three things, in this order:

**Fee floor.** Stripe takes 2.9% + $0.30 in the US, and roughly 3.9% + $0.30 + 1% currency conversion on international cards. That fixed 30 cents is brutal on small tickets:

| Ticket | US fee | International fee |
|---|---|---|
| $4.99 | 8.9% | 10.9% |
| $6.00 | 7.9% | 9.9% |
| $9.00 | 6.2% | 8.2% |
| $18.00 | 4.6% | 6.6% |
| **$48.00** | **3.5%** | **5.5%** |
| $96.00 | 3.2% | 5.2% |

**A $6 monthly plan billed twelve times gives up 9.9% to the card networks. A $48 annual plan billed once gives up 5.5%.** At 7,000 subscribers that difference is **$14,700 a year**, which is nearly nine months of the entire fixed cost base. Annual billing is not a preference. It is the second largest cost decision in the business after hosting.

**Habit price, not event price.** The comparison set for a daily-practice subscription is meditation and devotional apps in the $60 to $70 a year band (unverified, check current Calm, Headspace, Insight Timer and Hallow list prices before launch). $48 sits just under that band. $4 a month is beneath the line where a diaspora buyer consults a spouse.

**Cheap and repeatable beats expensive and rare.** $51 once was one decision and no second act. $48 a year is the same money in year one and $48 again in year two at zero acquisition cost. The whole business is year two.

### USD ladder

| | Price | |
|---|---|---|
| Darshan | Free forever | No card |
| Nitya, monthly | $6 / month | Deliberately worse value |
| **Nitya, annual** | **$48 / year** | The default. Save $24 |
| Kul, annual | $96 / year | Up to 6 named people |
| Sankalp Patra | $18 one-time | 2 free per year on Nitya |
| Founding year offer | $36 first year | First 1,000 only, renews at $48 |

The $6 monthly plan exists only to make $48 look correct. Twelve months at $6 is $72. Expect 75% of buyers to take the year. That anchoring is the highest-ROI pricing decision in the plan.

### INR ladder

| | Price |
|---|---|
| Darshan | Free forever |
| **Nitya** | **₹999 / year, annual only** |
| Kul | ₹1,999 / year |
| Sankalp Patra | ₹299 |

### Should India be priced differently? Yes. Four reasons, all structural.

1. **PPP.** ₹4,000 a year (the straight conversion of $48) sits above Netflix and Spotify India. ₹999 sits inside the band Indian consumers already pay for annual media subscriptions.
2. **Fee floor.** A ₹99 monthly ticket is about $1.19. A $0.30 fixed fee on that is 25%. India must be annual only, on Razorpay's 2% domestic rate, which has no fixed component. Never route Indian cards through Stripe.
3. **Rails.** RBI recurring e-mandates require additional factor authentication on setup plus a pre-debit notification before each charge (verify current thresholds and exemptions before build; the limits have moved). One annual UPI or card charge sidesteps all of it.
4. **Contribution.** ₹999 a year yields about $17 of lifetime contribution. That will not fund paid acquisition at any CAC. **Therefore: never buy Indian traffic.** India is organic only, via SEO on panchang and muhurat queries in Hindi, and via WhatsApp sharing. This is a rule, not a preference.

### Other markets

- **Tier A, $48**: US, Canada, UK, EU, Australia, New Zealand, Singapore, UAE, Hong Kong, Switzerland, Norway.
- **Tier B, $29**: Malaysia, South Africa, Mauritius, Fiji, Trinidad and Tobago, Guyana, Suriname. These are large, old, and completely unserved Hindu diasporas.
- **Tier C, ₹999 equivalent**: India, Nepal, Sri Lanka, Bangladesh, Indonesia, Philippines, Vietnam.

Enforce by billing country and card BIN. Use Stripe Adaptive Pricing for display currency.

---

## 6. The subscription, designed properly

### Names

| | English | हिन्दी |
|---|---|---|
| Free | Darshan | दर्शन |
| Paid, individual | Nitya | नित्य |
| Paid, household | Kul | कुल |
| The record | Sankalp Bahi | संकल्प बही |
| The streak | Your unbroken count | अखंड गणना |
| The certificate | Sankalp Patra | संकल्प पत्र |

### What is in each

**Darshan (free forever).** Live reading from all six waters, refreshed hourly from the CWC gauge nearest each ghat. Today's tithi, paksha and nakshatra. Countdown to the next muhurat in the user's timezone. One sankalp a week. A three minute ambient session at one water. Fully bilingual.

**Nitya ($48 / ₹999 a year).**
- Sankalp as often as you like, at any of the six waters.
- Twenty four recordings: each water at dawn, noon, dusk and night.
- Sessions of eleven, twenty one or thirty one minutes.
- Your unbroken count.
- Your Sankalp Bahi: every intention you have stated, with the river's measured reading at that minute, exportable as PDF and CSV.
- Every occasion in the year on your calendar, in your timezone, with reminders. This is the existing 13-occasion muhurat content, activated.
- Offline audio.
- Two Sankalp Patra a year.

**Kul ($96 / ₹1,999 a year).**
- Everything in Nitya for up to six named people, one payment.
- A shared household observance calendar all six see.
- A lineage register: the names you speak at Pitru Paksha and Tarpan, written by you, kept by you, brought forward each year. Nothing is performed. It is your list, held well.
- Unlimited Sankalp Patra.

### Why someone still pays in month nine

This is the question the whole business turns on. Six answers, in order of strength:

1. **Annual billing means month nine has no decision point at all.** The decision is month twelve. By then, four to six of the items below are worth more than $48.
2. **The count.** The number of days kept. It is honest, it counts only what the user actually did, and it is the strongest retention mechanic that exists in daily-practice products. Nine months in, a 200-day count is not something anyone throws away in a moment of tidying up subscriptions.
3. **The Bahi.** Nine months is roughly 250 dated entries, each with a real gauge reading. That is a diary that cannot be rebuilt anywhere else. It is real accumulated value, not a hostage: it is downloadable on cancellation, which is exactly why people trust it enough to keep filling it.
4. **The year turns whether you subscribe or not.** Kartik Purnima, Magha, Ganga Dussehra, Pitru Paksha, Makar Sankranti. Nobody cancels a calendar in month nine when month ten has Diwali in it.
5. **The household.** On Kul, your mother in Kanpur is on your plan. You do not cancel that.
6. **The page is never the same twice.** The Ganga at Haridwar in monsoon at 3.2 metres is a visibly different page from February at 0.9 metres. A static product goes stale in six weeks. A product driven by live telemetry does not.

---

## 7. The single highest-leverage upsell, and what must never be sold

### Highest leverage: Kul.

It doubles ARPU from $48 to $96 with zero marginal cost, and it is simultaneously the strongest retention mechanic in the product. Modelled annual retention on Kul is 65% against 55% on Nitya, which takes lifetime contribution from $94 to $248, a **2.6x**. It is also the only upsell whose value grows with the family rather than with the price.

Trigger it at day 90, in-app, once, never by email blast:

> Add your household. Six people, one payment, $96 for the year.

Runner-up: gifting Nitya at Kartik Purnima and Diwali. It is an acquisition channel wearing an upsell's clothes and it is why month 11 in the plan below has a spike.

### Never sold, ever

1. **Outcomes.** No tier claims to do more spiritually than a cheaper tier. Tiers differ by features and by number of people. Never by efficacy. No "sins washed", no karma, no moksha plan.
2. **Intercession.** No priest add-on, no "we will say your name", no "a pandit will read this". That is the dead model and reintroducing it reintroduces every cost the pivot removed.
3. **Ashes, remains, or the immersion of any physical object.** Never.
4. **Donations to temples as a pass-through.** Stripe's jurisdiction-specific prohibited list names religious organizations in India. A pass-through donation flow is the fastest available way to get the account reclassified and frozen.
5. **Astrology, kundli matching, dosha remedies, gemstones.** Paddle's acceptable use policy explicitly prohibits digital services associated with pseudo-science including clairvoyance, horoscopes and fortune-telling, and Stripe prohibits spiritualist mediums and fortune tellers in Japan, Mexico, Thailand and the UAE. One astrology feature reclassifies the entire merchant account. The panchang stays what it is: an astronomical calendar of tithi and muhurat timing. It never becomes a reading.
6. **Urgency in a grief flow.** No upsell, no countdown, no scarcity anywhere in Tarpan or Pitru Paksha. This one is commercial as well as decent: chargeback rates on grief-triggered impulse purchases are catastrophic.
7. **Lifetime plans.** A lifetime tier converts recurring revenue into a permanent serving obligation, and it is the single most reliable way to kill an annual subscription business.

---

## 8. Churn, LTV, payback, break-even

| | Global Nitya $48 | India Nitya ₹999 | Kul $96 |
|---|---|---|---|
| Annual retention (assumed) | 55% | 50% | 65% |
| Expected life | 2.22 yr | 2.00 yr | 2.86 yr |
| Lifetime contribution | **$94** | **$17** | **$248** |
| Max CAC at 3:1 | $31 | $6 | $83 |

**Payback is day zero.** Annual billing means the first $48 arrives before any of it is earned, and it covers a $31 CAC on the spot. There is no payback period to finance. This is the reason the whole thing runs on $12,424 of capital instead of a funding round.

**Blended monthly churn: 5.0%** (54% annual retention).

**Break-even subscriber counts:**
- Lights on, no founder pay: **477**
- $20,000 a month net, 15% of revenue on marketing: **7,334**

**Churn sensitivity at month 12, same acquisition curve:**

| Monthly churn | Annual retention | M12 subs | M12 net |
|---|---|---|---|
| 3% | 69% | 7,753 | $23,302 |
| 4% | 61% | 7,561 | $22,578 |
| 5% | 54% | 7,377 | $21,885 |
| 6% | 48% | 7,200 | $21,220 |
| 8% | 37% | 6,868 | $19,970 |

**Read this carefully: churn barely moves year one.** The base is too young. Even at 37% annual retention the plan still clears $20,000 at month 12. **The binding constraint in year one is acquisition, not retention.** Churn becomes the binding constraint in year two, when renewals start arriving. Build the streak and the Bahi in year one anyway, because year two is where they pay.

**Price ladder sensitivity, subscribers required for $20,000 a month net:**

| Annual price | Subscribers needed |
|---|---|
| $24 | 13,925 |
| $36 | 9,283 |
| **$48** | **6,962** |
| $60 | 5,570 |
| $72 | 4,642 |
| $96 | 3,481 |

$96 needs half the subscribers. It is tempting and it is wrong, because it moves the product from habit pricing to considered-purchase pricing, which halves conversion and roughly doubles CAC. $48 is where the volume is.

---

## 9. Payment rails

### What the research says

**Stripe.** Its restricted businesses list carries jurisdiction-specific prohibitions including **religious organizations in India** and **spiritualist mediums and fortune tellers in Japan, Mexico, Thailand and the UAE**. (Fetched from stripe.com/legal/restricted-businesses; the fetch returned localised Swedish strings, so re-read the English page before relying on the exact wording.) Snanify is neither of those things. The risk is entirely in how the account is described.

**Paddle.** Its acceptable use policy prohibits digital services associated with pseudo-science including clairvoyance, horoscopes and fortune-telling. A merchant of record that could read the panchang as a horoscope is not a rail to depend on. Do not build on Paddle.

**India OIDAR.** A foreign entity supplying digital services to Indian consumers must register for GST **with no turnover threshold**, remit **18% IGST**, and file **GSTR-5A monthly**. One paid Indian user triggers it. This is the single reason the accounting line is $400 a month and not $100.

**Razorpay.** Its public terms page does not enumerate prohibited merchant categories. Request the merchant policy document from their onboarding team before committing. **Unverified.**

### The recommendation

**Rest of world: Stripe Billing, direct.**
- MCC **5817, Digital Goods: Applications**. Not 8661 (religious organizations), not 7999, not 5968. This is the highest-stakes single decision on this page.
- Describe the business at onboarding as: *a bilingual subscription app delivering ambient audio, live public river telemetry and calendar content*. Every word of that is true and none of it triggers a restricted category.
- Stripe Tax on, for VAT, GST and US sales tax.
- Cost: 2.9% + $0.30 domestic US, roughly 3.9% + $0.30 + 1% conversion international, plus Stripe Tax.

**India: an Indian private limited entity on Razorpay.**
- 2% domestic, no fixed component, which is the only way ₹999 works.
- Annual charge only. No recurring mandate.
- The Indian entity solves OIDAR by making the supply domestic instead of cross-border.
- UPI, cards, netbanking, wallets all in one integration.

**Second button for the diaspora over 55: PayPal.** Non-trivial share of the target market will not put a card into a new site. Note that PayPal's acceptable use policy restricts occult services; classify carefully and identically to Stripe. **Unverified, check current PayPal AUP wording.**

**Fallback if Stripe declines: FastSpring or Lemon Squeezy** as merchant of record, roughly 5% plus a fixed fee. More expensive, but it removes all global VAT and GST work in one move. Lemon Squeezy is Stripe-owned, so it will not solve an underwriting rejection, only a tax-compliance burden.

**Never:** crypto, a donation button, a temple pass-through, or a high-risk processor. Taking a high-risk merchant account is how a legitimate digital subscription accidentally becomes an occult-category merchant at 8% and permanent reserve.

### Chargeback discipline (this is a survival item)

- Descriptor: `SNANIFY.COM SUBSCRIPTION`
- Renewal email seven days before every charge, with a one-click cancel in it.
- Cancel in one click, no retention maze, no phone call.
- Instant refund, no questions, for 14 days after any charge.
- Target below 0.4%. Stripe's dispute thresholds start biting around 0.65% to 0.9% depending on the network.

---

## 10. Twelve months to $20,000

**Assumptions, stated:**
- Blended visitor-to-paid conversion **1.05%** (free signup ~6% of sessions, free to paid ~7% within 60 days, plus direct paid conversion).
- Blended monthly churn **5.0%**.
- Blended ARPU rises from $3.70 to $4.05 as Kul and Patra mix in.
- Payment fees **5.0%**, refunds and chargebacks **2.0%**.
- Month 5 is a festival month (Magha, Makar Sankranti): 1.55x acquisition.
- Month 11 is the gifting month (Kartik Purnima, Diwali): 1.50x acquisition, with marketing spend raised to match.
- Underlying acquisition grows 31% a month off a base of 95 paid conversions in month 1. **This growth rate is the plan's single load-bearing assumption.** It comes from SEO on the existing 20-plus evergreen bilingual pages (panchang, muhurat, 13 occasions, kumbh, six rivers) plus paid social to diaspora audiences. Current snanify.com traffic is **unverified**; if the site starts above 9,000 sessions a month, months 1 to 4 pull forward.

| Month | Sessions | New paid | Churned | Subs | Gross | Marketing | Fixed | **Net** |
|---|---|---|---|---|---|---|---|---|
| M1 | 9,048 | 95 | 0 | 95 | $352 | $900 | $900 | **-$1,473** |
| M2 | 11,852 | 124 | 5 | 215 | $799 | $900 | $900 | **-$1,057** |
| M3 | 15,527 | 163 | 11 | 367 | $1,376 | $1,000 | $950 | **-$670** |
| M4 | 20,340 | 214 | 18 | 562 | $2,125 | $1,200 | $1,000 | **-$224** |
| M5 | 41,300 | 434 | 28 | 968 | $3,697 | $2,200 | $1,100 | **+$138** |
| M6 | 34,905 | 367 | 48 | 1,286 | $4,963 | $1,800 | $1,400 | **+$1,416** |
| M7 | 45,726 | 480 | 64 | 1,702 | $6,637 | $2,200 | $1,450 | **+$2,522** |
| M8 | 59,901 | 629 | 85 | 2,246 | $8,848 | $2,600 | $1,500 | **+$4,128** |
| M9 | 78,470 | 824 | 112 | 2,957 | $11,770 | $3,000 | $1,550 | **+$6,396** |
| M10 | 102,796 | 1,079 | 148 | 3,889 | $15,633 | $3,400 | $1,600 | **+$9,538** |
| M11 | 201,994 | 2,121 | 194 | 5,815 | $24,424 | $5,200 | $1,650 | **+$15,864** |
| M12 | 176,408 | 1,852 | 291 | **7,377** | **$29,876** | $4,200 | $1,700 | **+$21,885** |

**Cumulative year-one net: $58,463. Deepest cash hole: $3,424, in month 4. Month 12 gross run rate: $358,510.**

**Milestones:**
- **M4:** break even on fixed costs (477 subscribers). The business is now permanently self-funding.
- **M5:** first profitable month.
- **M8:** hire the support VA. This is the only human in the loop, ever.
- **M11:** first renewal cohort arrives. Watch renewal rate. Everything about year two is decided here.
- **M12:** $10,000 each.

**What to build, in order:**
- **M1 to M2:** rip out every officiant, ghat, recording and proof-chain claim from `src/content/trust.ts`, `rituals.ts` and `patra.ts`. Ship the CWC gauge poller, the live reading component, accounts, Darshan, Nitya, Stripe. Nothing else.
- **M3 to M4:** the Sankalp Bahi, the unbroken count, occasion reminders, Razorpay and the Indian entity.
- **M5 to M6:** the full 24-recording audio library, offline audio, the Patra generator.
- **M7 to M9:** Kul, the household calendar, the lineage register.
- **M10 to M12:** gifting, the festival campaign, renewal flow, referral.

### Downside case

Half the acquisition, 7% monthly churn, ARPU $3.60: month 12 lands at 3,173 subscribers and $4,725 net, and **$20,000 arrives at month 16**. The business is still viable, still self-funding from month 6, and still never needs outside money. That is what a $1,700 fixed cost base buys.

---

## 11. The line that holds it all together

"Our servers are in the river" becomes literally defensible by making **the reading** a first-class object in the product, present in every session, every Patra and every email:

> **Ganga, Har Ki Pauri, Haridwar.** 1.38 m. 14 °C. 212 cumecs. Read 09:00 IST. Kartik, Shukla Paksha, Dwadashi.

That is a true statement about a real river at a real minute, pulled from public Central Water Commission telemetry. It is the only thing in this category that nobody else has, it costs one cron job to maintain, and it is what makes the product feel alive in month nine.

---

## Copy

═══════════════════════════════════════════
PRICING PAGE
═══════════════════════════════════════════

HEADER
EN: Three ways to keep the river.
HI: नदी को पास रखने के तीन तरीके।

SUB
EN: Start free. Pay when the river is already part of your day.
HI: निःशुल्क आरंभ करें। तब भुगतान करें जब नदी आपके दिन का हिस्सा बन चुकी हो।

───────────────────────────────────────────
CARD 1

EN: DARSHAN / Free forever
The live reading from all six waters. Today's tithi and the next muhurat, in your timezone. One sankalp a week. A three minute session. No card. Not a trial, not a countdown. The river never goes behind a wall.
[Open Darshan]

HI: दर्शन / सदा निःशुल्क
छहों जलों का सजीव पाठ। आज की तिथि और अगला मुहूर्त, आपके समय क्षेत्र में। सप्ताह में एक संकल्प। तीन मिनट का सत्र। कार्ड की आवश्यकता नहीं। न परीक्षण अवधि, न कोई उलटी गिनती। नदी कभी दीवार के पीछे नहीं जाएगी।
[दर्शन खोलें]

───────────────────────────────────────────
CARD 2 (recommended)

EN: NITYA / $48 a year
Sankalp as often as you like, at any of the six waters.
Twenty four recordings. Each water at dawn, noon, dusk and night.
Sessions of eleven, twenty one or thirty one minutes.
Your unbroken count.
Your Sankalp Bahi. Every intention you have stated, with the river's measured reading at that minute. Yours to keep, yours to export.
Every occasion in the year, on your calendar, in your time.
Two Sankalp Patra a year.
$6 a month, or $48 for the year. The year is four months free.
[Begin Nitya]

HI: नित्य / ₹999 प्रति वर्ष
जितनी बार चाहें संकल्प, छहों जलों में से किसी पर भी।
चौबीस ध्वनि-अभिलेख। हर जल का प्रातः, मध्याह्न, संध्या और रात्रि।
ग्यारह, इक्कीस या इकतीस मिनट के सत्र।
आपकी अखंड गणना।
आपकी संकल्प बही। हर संकल्प, उस क्षण के नदी-पाठ के साथ। सहेजने योग्य, निर्यात करने योग्य।
वर्ष का हर पर्व, आपके पंचांग पर, आपके समय पर।
वर्ष में दो संकल्प पत्र।
भारत में नित्य केवल वार्षिक है। ₹999, एक ही बार। हर महीने की अनुमति और सूचना का झंझट नहीं।
[नित्य आरंभ करें]

───────────────────────────────────────────
CARD 3

EN: KUL / $96 a year
Everything in Nitya, for six named people, on one payment.
A household calendar all six see.
A lineage register. The names you speak at Pitru Paksha and at Tarpan, written by you, kept by you, brought forward every year.
Unlimited Sankalp Patra.
[Begin Kul]

HI: कुल / ₹1,999 प्रति वर्ष
नित्य का सब कुछ, छह नामित सदस्यों के लिए, एक ही भुगतान में।
एक साझा गृह-पंचांग, जो सबको दिखता है।
वंश-सूची। पितृ पक्ष और तर्पण में जिन नामों का स्मरण करते हैं, आपके द्वारा लिखी, आपके पास रखी, हर वर्ष आगे बढ़ती।
असीमित संकल्प पत्र।
[कुल आरंभ करें]

───────────────────────────────────────────
FOOT OF PRICING PAGE

EN: What you are buying, exactly. A digital practice. No priest. No ghat. Nothing performed anywhere on your behalf. The river is real, its reading is real, the sankalp is yours. That is the whole product. It is enough.

HI: आप वास्तव में क्या खरीद रहे हैं। एक डिजिटल साधना। कोई पंडित नहीं। कोई घाट नहीं। आपकी ओर से कहीं कुछ नहीं किया जाता। नदी वास्तविक है, उसका पाठ वास्तविक है, संकल्प आपका है। यही पूरा उत्पाद है। यही पर्याप्त है।


═══════════════════════════════════════════
HERO, HOME PAGE
═══════════════════════════════════════════

EN: The Ganga at Har Ki Pauri is 1.38 metres this minute. Fourteen degrees. Running at 212 cumecs. Sit with it for eleven minutes.
HI: इस समय हर की पौड़ी पर गंगा 1.38 मीटर है। चौदह डिग्री। 212 क्यूमेक बहाव। ग्यारह मिनट इसके साथ बैठिए।

EN (subline): Read from the Central Water Commission gauge nearest the ghat, every hour.
HI (subline): घाट के निकटतम केंद्रीय जल आयोग मापक से, हर घंटे।


═══════════════════════════════════════════
KUL UPSELL, IN APP, DAY 90, SHOWN ONCE
═══════════════════════════════════════════

EN: Add your household.
Six people. One payment. $96 for the year, which is $48 more than you already pay.
Your mother in Kanpur sees the same calendar you see, in Hindi, at her time of day. When Pitru Paksha comes, the names are already written and nobody has to remember them at six in the morning.
[Add my household] [Not now]

HI: अपने परिवार को जोड़ें।
छह सदस्य। एक भुगतान। ₹1,999 पूरे वर्ष, अर्थात जो आप पहले से दे रहे हैं उससे ₹1,000 अधिक।
कानपुर में आपकी माँ वही पंचांग देखेंगी जो आप देखते हैं, हिंदी में, उनके समय पर। पितृ पक्ष आने पर नाम पहले से लिखे होंगे, सुबह छह बजे किसी को याद नहीं करना पड़ेगा।
[परिवार जोड़ें] [अभी नहीं]


═══════════════════════════════════════════
SANKALP PATRA, ONE TIME
═══════════════════════════════════════════

EN: Sankalp Patra. $18.
One intention, named and dated, set in the printed panchang face, with the river's measured reading at the minute you stated it. Station, level, temperature, flow, tithi. A PDF that prints at any size.
Two a year come with Nitya.

HI: संकल्प पत्र। ₹299।
एक संकल्प, नाम और तिथि सहित, मुद्रित पंचांग की छपाई में, उस मिनट के नदी-पाठ के साथ जब आपने उसे कहा। मापक स्थल, जलस्तर, तापमान, प्रवाह, तिथि। किसी भी आकार में छपने योग्य PDF।
नित्य के साथ वर्ष में दो निःशुल्क।


═══════════════════════════════════════════
RENEWAL EMAIL, SEVEN DAYS BEFORE THE CHARGE
═══════════════════════════════════════════

EN SUBJECT: Your year on the river ends on 14 March
EN BODY:
You have kept 247 sankalp since 14 March last year. Your longest unbroken run was 61 days.
The Ganga at Haridwar was 0.94 metres the day you started. It is 1.38 metres today.
Nitya renews on 14 March for $48. Nothing changes and you do not need to do anything.
If you would rather not, cancel in one click and keep your Sankalp Bahi. We will not write to you about it again.
[Keep going] [Cancel] [Download my Bahi]

HI SUBJECT: नदी पर आपका वर्ष 14 मार्च को पूरा हो रहा है
HI BODY:
पिछले 14 मार्च से आपने 247 संकल्प किए हैं। आपकी सबसे लंबी अखंड शृंखला 61 दिन की रही।
जिस दिन आपने आरंभ किया था, हरिद्वार में गंगा 0.94 मीटर थी। आज 1.38 मीटर है।
नित्य 14 मार्च को ₹999 में नवीनीकृत होगा। कुछ नहीं बदलेगा और आपको कुछ करने की आवश्यकता नहीं।
यदि आप न चाहें, तो एक क्लिक में रद्द करें और अपनी संकल्प बही अपने पास रखें। हम इस विषय में दोबारा नहीं लिखेंगे।
[जारी रखें] [रद्द करें] [बही डाउनलोड करें]


═══════════════════════════════════════════
CANCEL FLOW, ONE SCREEN, NO MAZE
═══════════════════════════════════════════

EN: Cancelling Nitya.
Your Sankalp Bahi stays yours. Download it any time, in full, as PDF or CSV. We do not hold it hostage.
Darshan stays free and the live reading never goes behind a wall.
If you come back, your count picks up where it stopped.
[Cancel Nitya] [Stay]

HI: नित्य रद्द किया जा रहा है।
आपकी संकल्प बही आपकी ही रहेगी। कभी भी, पूरी तरह, PDF या CSV में डाउनलोड करें। हम उसे रोकेंगे नहीं।
दर्शन निःशुल्क रहेगा और सजीव पाठ कभी दीवार के पीछे नहीं जाएगा।
यदि आप लौटें, तो आपकी गणना वहीं से आगे बढ़ेगी जहाँ रुकी थी।
[नित्य रद्द करें] [बने रहें]


═══════════════════════════════════════════
FOUNDING YEAR OFFER, FIRST 1,000 ONLY
═══════════════════════════════════════════

EN: Founding year. $36 instead of $48, for the first thousand people. It renews at $48 and we will tell you before it does.
HI: संस्थापक वर्ष। पहले एक हज़ार लोगों के लिए ₹48 के स्थान पर $36। नवीनीकरण $48 पर होगा और उससे पहले हम आपको बता देंगे।


═══════════════════════════════════════════
STRIPE / RAZORPAY ACCOUNT DESCRIPTION
(underwriting copy, not customer facing)
═══════════════════════════════════════════

Snanify is a bilingual English and Hindi consumer subscription application. Subscribers receive ambient audio recordings, live public river telemetry sourced from India's Central Water Commission open data portal, an astronomical calendar of tithi and muhurat timing, and a personal journalling tool. There is no in-person service, no consultation, no reading, no prediction, and no third party performs anything on a customer's behalf. Delivery is entirely digital and automatic. MCC 5817, Digital Goods: Applications.

## Open questions

- What is snanify.com's current monthly session count and its top ten organic queries? The whole 12-month plan hangs off a month-1 base of ~9,000 sessions. If the site already does 30,000, months 1 to 4 pull forward by a full quarter. If it does 800, the curve needs paid acquisition from day one and the cash hole triples.
- Will Stripe underwrite this under MCC 5817? Their restricted list names religious organizations in India and spiritualist mediums in four other jurisdictions. Submit the underwriting description in the copy block to Stripe support for pre-approval BEFORE building the checkout, not after. If they decline, FastSpring at 5% is the fallback and the model still clears $20k, just at month 13 instead of 12.
- Razorpay's prohibited merchant category list is not public. Request the merchant policy document from their onboarding team and confirm a devotional calendar and audio app is acceptable. Unverified.
- Does the plan need an Indian private limited entity, or can OIDAR registration alone cover it? An Indian entity solves the 18% IGST and GSTR-5A burden and unlocks Razorpay's 2% domestic rate, but it costs roughly $1,500 to incorporate plus ongoing compliance. Get an Indian CA to price both paths before month 3.
- What does the 24-recording audio library actually cost? $6,000 is a budget figure. Commissioning a field recordist for six locations at four times of day, with full buyout rights and no ongoing licence, is the single largest capital line. Get three real quotes.
- Confirm current RBI e-mandate rules for recurring UPI and card payments, including the AFA threshold and pre-debit notification requirements. The plan routes around them entirely by selling India annual-only, but confirm that a single annual charge is genuinely exempt.
- What is the real free-to-paid conversion rate? 7% within 60 days is a reasonable assumption for a habit product with a genuinely useful free tier, but it is an assumption. Instrument it from week one and revisit the entire plan at month 3 with real data.
- Should Kul launch earlier than month 7? It carries 2.6x the lifetime contribution of Nitya. The counter-argument is that it needs the streak and the Bahi to exist first or there is nothing to share. Worth testing a manual, waitlist version at month 4.