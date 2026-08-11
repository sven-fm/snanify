# The Artefact Layer: tariff, share loop and launch

**The snan is free forever. The artefact is the product, the proof and the distribution engine, and the river's own gauge reading is what makes it unfakeable.**

# SNANIFY, THE ARTEFACT LAYER

## 0. The one structural decision everything else hangs off

**The snan is free. Always. No card, no account, unlimited.**
**The artefact is issued free too, as a web page and a share card.**
**What is paid is the file, the permanence and the calendar.**

This is a three-step paywall, not a two-step one, and the third step is the one that makes the loop work. If you paywall the artefact itself, K collapses, because only buyers can share and buyers are 9% of your traffic. If you give away the artefact as a *link* and sell the *file*, everybody shares and you still have something to sell at the exact moment of pride.

| Tier | What the user gets | Price |
|---|---|---|
| **Darshan** | The snan itself. Three minutes, driven by the live gauge. Ends with a full Patra rendered on screen. | Free |
| **Issued Patra (free)** | A permanent-looking public page at `snanify.com/p/<id>`, an OG card, a 1080x1350 share image, the Jal Mudra on screen. Kept 90 days. | Free |
| **The file** | Print-quality PNG, PDF, A3 print file, Jal Mudra as SVG and as a 1:1 avatar, the Gauge Strip (the hydrograph of your hour with your minute marked), the Naam Kshan audio, permanence forever, verifiable forever, and the right to book a future muhurat instead of "now". | Paid |

Two permanent carve-outs, stated loudly, never negotiated:

1. **A Patra taken in remembrance is free, permanent, and never expires.** We do not charge rent on anybody's father's name. This is the single best line in the whole business and it is also correct.
2. **Names are free.** One snan can carry up to eight names at no extra cost. Charging per name would earn maybe 4% more revenue and would cut K roughly in half. Names are the distribution.

### What changes on the Patra itself

`SankalpPatra.tsx` already has the right shape. Repurpose the register cells, do not rebuild the component:

| Existing cell | Becomes |
|---|---|
| River / Ghat / Place | unchanged |
| Performed on / IST | **Taken at** (instant, IST, and local) |
| Tithi (sourced only) | unchanged |
| **Ritvik** | **Gauge station** (station name, CWC station id) |
| **Naam Kshan** | **River state** (level in m, discharge in cumec, reading time) |
| Issued on | unchanged |

And the attestation line, `patraContent[lang].sheet.attestation`, is replaced. It is not fine print, it is the load-bearing sentence of the entire product:

> This records a digital snan. At the minute printed above, the river stood at the level printed above, and that reading is the Central Water Commission's, not ours. No rite was performed at any ghat, and none is claimed.

That sentence satisfies rule 1 permanently, on every artefact, in every share preview, without a single hedge appearing anywhere in the marketing.

---

## 1. The Tariff (`/tariff`, `/hi/shulk-patra`)

Set as a printed price list: numerals in the tabular face, hairline rules, one vermillion spot on the pack. India is priced in rupees at Indian prices and we say so on the page.

| # | EN name | HI name | INR | USD | What unlocks |
|---|---|---|---|---|---|
| 00 | **Darshan** | **दर्शन** | free | free | The snan, the on-screen Patra, the share link, the share card. 90 days. |
| 01 | **One Patra** | **एक पत्र** | ₹449 | $14 | One snan's full file bundle, permanent, verifiable forever. |
| 02 | **Twelve** | **बारह पत्र** | ₹1,499 | $49 | Twelve issuances, no expiry on the credits. ₹125 / $4.08 each. |
| 03 | **The Year** | **वर्ष** | ₹149/mo or ₹1,199/yr | $6/mo or $49/yr | Unlimited issuance, every parva pre-scheduled, the Ufaan alert, Samvatsar included free at year end. |
| 04 | **The Gift** | **भेंट** | ₹599 | $18 | One Patra credit, sent as a dated envelope that opens on a chosen morning. Recipient enters their own name and gotra. |
| 05 | **The Year-Set** | **संवत्सर** | ₹1,299 | $39 | A bound 16-page annual PDF and print file of every snan you took that year, each with its full hydrograph. Free with an annual Varsh. |

**Launch-only, capped, sold once:**

| # | EN name | HI name | INR | USD | What unlocks |
|---|---|---|---|---|---|
| 0 | **The Founding Patra** | **आदि पत्र** | ₹2,999 | $99 | **1,000 seats.** A numbered folio (007/1000) printed on every Patra you ever issue, forever. Varsh for life. Your name in the Founding Register at `/bahi/adi` if you want it there. |

The Founding Patra is real scarcity with zero ops and it is the launch's cash injection. 300 seats sold is roughly $21,000, which funds the first year of everything. 1,000 seats is roughly $60,000. Do not extend it, do not reopen it, do not do a "second edition". The whole value is that it closes.

### Rare states, included free, never sold

Scarcity comes from the river, not from us. A Patra prints in a second impression when the seed lands in a rare state. This costs nothing, cannot be gamed, and is the reason people time their snans, which is the reason they subscribe.

| State | HI | Condition | Impression |
|---|---|---|---|
| **Ufaan** | **उफान** | Station level at or above CWC warning level | Full vermillion flood, level printed at 3x size |
| **Purna** | **पूर्ण** | Purnima, at a station with a named parva that day | Full moon disc struck in ink over the register |
| **Sankraman** | **संक्रमण** | Solar ingress day (Makar, Tula) | Solar mark, solar reckoning printed beside the tithi |
| **Grahan** | **ग्रहण** | Eclipse window | Reverse block, ink ground, paper type |
| **Kumbh** | **कुंभ** | A named bathing date at a Kumbh or Simhastha site | The site's numeral struck at the head |
| **Shanta** | **शांत** | Discharge below the station's 5th percentile for that calendar week | Hairline only, the quietest sheet we print |

Every one of these is checkable against a public source by a stranger. That is the entire moat.

---

## 2. The arithmetic to $20,000/month profit

Steady state, month 6. Blended mix 65% India (INR) / 35% rest of world (USD), because the free loop lives in India and the money lives in the diaspora.

| SKU | Units/mo | INR revenue | USD revenue | Total USD |
|---|---|---|---|---|
| Varsh (2,000 active) | 1,300 INR, 700 USD | ₹1,93,700 | $4,200 | $6,427 |
| Ek Patra | 420 INR, 180 USD | ₹1,88,580 | $2,520 | $4,688 |
| Baarah Patra | 110 INR, 80 USD | ₹1,64,890 | $3,920 | $5,816 |
| Bhent | 60 INR, 60 USD | ₹35,940 | $1,080 | $1,493 |
| Samvatsar | 50 INR, 40 USD | ₹64,950 | $1,560 | $2,307 |
| | | | **Gross** | **$20,731** |

Costs, monthly:

| Item | USD |
|---|---|
| Payment fees, blended 2.4% (UPI is zero MDR, cards ~2% domestic, Stripe ~3.4% + fee international) | 497 |
| Refunds and chargebacks, 2% | 415 |
| Vercel, storage, image rendering | 450 |
| Panchang provider | 99 |
| Voice synthesis and render workers | 120 |
| Email, support desk, misc | 60 |
| **Net** | **$19,090** |

That is 95% of target. The gap closes with roughly 60 extra Baarah packs a month, or a 5% price move on the USD side. Do not close it by raising the INR price.

**Traffic required.** 1,000 transactional buyers a month at 9% conversion means **11,100 free snans a month, roughly 370 a day.** Half of those come from the loop (see section 4), half from the channels in section 6. The 2,000 subscribers are accumulated over six months at roughly 400 net adds a month.

**Month-by-month:** M1 $3k (plus the Founding Patra, which is separate and should be banked, not spent), M2 $6k, M3 $9k, M4 $13k, M5 $16k, M6 $20k.

---

## 3. The share loop, end to end

### 3.1 The link

`snanify.com/p/<22-char base58>` — a top-level route, outside `[lang]`, locale resolved from `Accept-Language` with a switcher in the foot. Short matters: this is pasted into WhatsApp.

The public Patra page shows: names, water, ghat, taken-at, river state, tithi, the Jal Mudra, the rare-state impression if any. It never shows the sankalp text. That separation already exists in `patra.ts` and `verify.ts`; keep it exactly.

Below the sheet, and this is the part that holds a stranger for eleven seconds:

> **The Ganga at Har Ki Pauri stood at 293.71 m when Anita bathed.**
> **It is 293.44 m now.** *(updates live, small hydrograph, last 24h, her minute marked)*

Then one action, and only one:

> **Take yours. It is free.** → the composer, pre-filled with the same water.

### 3.2 The Open Graph card

This is the actual product surface. Everything else is downstream of this image. 1200x630, rendered by `next/og` at `/p/[id]/opengraph-image`. **Load Eczar Devanagari as an ArrayBuffer at build time** so names render in script rather than as tofu, which the current `og-card.tsx` explicitly punts on.

Palette is the letterpress one, not the old navy gradient. Kill the gradient and the radial glow in `src/lib/og-card.tsx`; they are from the previous design and they are the tell.

```
ground        #F2EAD9
outer rule    3px #16130F, inset 24
inner rule    1px #C3B697, inset 38
ink           #16130F     ink-2 #57513F     spot #C1272D
```

Layout, top to bottom:

| Band | Content |
|---|---|
| Masthead, 60px | Mark 40px + SNANIFY, letterspaced 8, 20px, ink-2. Right: folio `पत्र · 7Kq2mAv4nR` tabular 18px. |
| Rule | 3px over 1px, full width |
| Eyebrow, 34px | `SNAN TAKEN` in spot, 20px, letterspacing 4 |
| **Name, 92px** | Eczar 76px, up to two lines, ink. The largest thing on the card by a factor of three. |
| Devanagari name, 40px | 34px, ink-2 |
| Water, 34px | `Ganga · Har Ki Pauri, Haridwar` 28px ink |
| Seal | Jal Mudra, 240x240, right column, ink + spot only, generated from the seed |
| Register band, 76px | Four hairline-separated tabular cells: `LEVEL 293.71 m` / `FLOW 1,842 cumec` / `11 AUG 2026 · 05:14 IST` / `TITHI Shukla Ekadashi` |
| Foot, 30px | `Digital snan. Reading: Central Water Commission, Haridwar station.` 18px ink-2 |

At WhatsApp thumbnail size you read three things: a name, a place, a number. That is the correct number of things.

**Remembrance register** changes the card, not just the text: eyebrow becomes `WATER OFFERED IN THIS NAME` in **ink, not vermillion**; the Jal Mudra is struck in ink only; the register band drops FLOW and keeps date and place; no counters, ever. The card should read as a notice, not a badge.

### 3.3 The share sheet

Fires automatically at the end of the flow, once, as the primary action. Native `navigator.share` on mobile with a WhatsApp button first on Android and India-region iOS. Pre-filled text below in section "Copy".

### 3.4 The invite: Jal Nimantran / जल निमंत्रण

Every shared Patra carries an invite code. `snanify.com/n/<code>`.

- The recipient who takes a snan **within 72 hours at the same water** gets their Patra **issued permanently, free**, not the 90-day one. They do not get the file bundle. That stays paid.
- Both Patras are then cross-printed with a **Sang / संग** line: *"Taken with Anita Sharma, at the same water, 11 Aug 2026."* Both artefacts get better. Neither person paid for that.
- Cap: 5 permanent free issuances per account per month. Beyond that the invite still works, at the 90-day tier.
- **Remembrance Patras carry no invite.** They carry an **Add a name** action instead: a family member can add their own name to the same remembrance, producing one shared sheet with several names on it rather than several competing sheets. That is a joining mechanic, not a growth mechanic, and it should not be measured as one.

### 3.5 The public register: Ghat Bahi / घाट बही

`/bahi`. The last 200 snans as a running ruled register: name, water, gauge reading, time. Opt-in checkbox at issuance. **Default on for celebration, default off and non-overridable for remembrance.** It is a beautiful page, it screenshots well, it proves volume without us claiming a number, and it costs nothing.

---

## 4. K factor, with the arithmetic

Per 100 snanners who reach an issued Patra, ordinary day, no multi-name, no invite:

```
share sheet opened            0.62   →  62
share completed               0.72   →  45 shares
destinations per share        1.6        (0.6 group + 1.0 DM)
viewers per share             6.9        (group 22 × 0.45 seen = 10 ; DM 0.9)
total viewers                        →  310
tap the preview               0.14   →   43 visitors
start a snan                  0.42   →   18
complete it                   0.78   →   14 new snanners
```

**K = 0.14.** Amplification 1.16. Not enough to matter.

Now add the two free levers.

**Lever 1, multi-name.** Average 2.4 names per Patra, each named person gets their own OG card and their own DM. Destinations rise 1.6 → 3.1, and the DM tap rate rises to 0.55 because the preview is literally that person's name.

```
group visitors   45 × 0.6 × 10 × 0.14  =  38
DM visitors      45 × 2.5 × 0.9 × 0.55 =  56
total                                     94  →  ×0.42 ×0.78  =  31
```
**K = 0.31.**

**Lever 2, Jal Nimantran.** A named invite with something real attached lifts start 0.42 → 0.58 and completion 0.78 → 0.85.

```
94 × 0.58 × 0.85 = 46
```
**K = 0.46.** Amplification 1.85. Every paid acquisition brings 0.85 free ones. CAC halves.

**Parva day.** On Kartik Purnima morning the group is already full of ghat photos, so the group tap rate goes 0.14 → 0.38, shares per snanner 0.45 → 0.68, destinations 3.1 → 4.4.

```
shares                                  68
group visitors  68 × 0.8 × 10 × 0.38 = 207
DM visitors     68 × 3.6 × 0.9 × 0.62 = 137
total                                  344  →  ×0.58 ×0.85 = 170
```
**K = 1.70.**

### What it would take to exceed 1 every day

Sustained K > 1 requires the ordinary-day group tap rate to reach roughly 0.35, which only happens once the artefact is a known object inside that group. You cannot buy that.

**So do not chase it.** The correct strategy is stated plainly: **build for six spike days a year and hold the audience between them with Varsh.** Every one of the six is already in `rivers.ts` as an occasion:

Makar Sankranti · Mauni Amavasya · Mahashivratri · Ganga Dussehra · Sarva Pitru Amavasya · Kartik Purnima

Plus the unschedulable ones, which are better: **monsoon peaks.** Five to twelve times a season the CWC dashboard puts a station above warning level. Nobody can plan it, nobody can fake it, and it is the most interesting thing that happens all year.

---

## 5. The two registers: delight and condolence

One question at composition, one field, and it forks everything downstream:

> **Is this for someone living, or in remembrance?**
> **यह किसी जीवित व्यक्ति के लिए है, या स्मरण में?**

| | Celebration | Remembrance |
|---|---|---|
| OG eyebrow | `SNAN TAKEN`, spot | `WATER OFFERED IN THIS NAME`, ink |
| Jal Mudra | ink + vermillion | ink only |
| OG register band | level, flow, time, tithi | place, date only |
| Share button label | **Share** | **Send to family** |
| Share text | first person, present, warm | third person, plain, no verbs of achievement |
| Landing CTA | **Take yours. It is free.** | **Add a name to this remembrance.** |
| Ghat Bahi | opt-in, default on | never, no override |
| Invite | Jal Nimantran, 72h | none |
| Counters, views, streaks | shown | never rendered |
| Price | per the tariff | **free, permanent, forever** |
| Upsell in flow | yes | **none, anywhere, ever** |
| Post-snan email | "your Patra is ready" | "the Patra is at this link when you want it", sent once, no follow-up |

Rule for engineers: `mode === "remembrance"` must be checked in the OG renderer, the share text builder, the landing CTA, the email templates, the notification scheduler and the pricing gate. If it is only checked in the template, the mechanic has failed.

---

## 6. Launch: the first thousand

### Where they actually are, in order

| Rank | Channel | Cost | Fit | First-1,000 contribution |
|---|---|---|---|---|
| 1 | **Founders' own WhatsApp groups**, seeded by hand, 30 to 60 groups | ₹0 | 10/10 | 150 |
| 2 | **@snanify_jal**, the automated gauge account on X and Instagram | ₹0, one cron | 9/10 | compounding, see Campaign 2 |
| 3 | **Reddit**: r/india, r/hinduism, r/ABCDesis, r/nri, r/IndiaSpeaks, r/developersIndia | ₹0 | 7/10 | 250 |
| 4 | **Hacker News, Show HN** | ₹0 | 8/10 for credibility, 4/10 for buyers | 200 visitors, and the press pickup |
| 5 | **Press** (section 8) | ₹0 | 9/10 for legitimacy and diaspora reach | 200 |
| 6 | **Diaspora temple and association mailing lists**, US/UK/Canada/Gulf/Australia | ₹0, manual outreach | 8/10, and these are USD buyers | 150 |
| 7 | **Hindi devotional creators on YouTube and Instagram**, mid-tier not top-tier | free Founding Patras + affiliate | 8/10 | 100 |
| 8 | **The existing muhurat and panchang pages**, which already rank for occasion queries | ₹0, already built | 9/10 over 6 months | slow, large |
| 9 | Google and Meta paid | money you do not have | 3/10 now | 0 |
| 10 | Paid influencer posts | expensive, reads as an ad | 2/10 | 0 |

Nobody searches for this category. So do not buy search. **Buy nothing. Be interesting instead, four times a day, forever, from a cron job.**

### The three campaigns

#### Campaign 1: The Wall (दीवार) — Kartik Purnima, one day, live

A full-screen public page at `/deewar`. Six gauge readings, updating live, set as a printed board. Beneath them, a running register: every snan taken that day appearing as a line, name and water and level, like a departure board crossed with a temple register. Free all day, no card, no account.

Mechanics:
- Pre-register with a phone number in the ten days before. One WhatsApp message at the muhurat opening: *"Har Ki Pauri. The window is open for 46 minutes. The Ganga is at 293.7 m."*
- The board is screenshot-able every hour and gets more impressive as the day goes on. That is the ad, and it makes itself.
- At midnight the board freezes and becomes a permanent page: **the Kartik Purnima 2026 register.** Next year's board links back to it.
- Everyone on it gets the **Purna** impression free.

Cost: zero. Ops: zero after the cron is written.

#### Campaign 2: Ufaan (उफान) — the monsoon-peak drop

The best idea in this document, and it is a cron job.

**@snanify_jal posts the river's state four times a day, forever.** No marketing, no CTA, no emoji. Just: *"Ganga, Har Ki Pauri. 06:00 IST. 293.44 m. 1,610 cumec. Falling."* Six stations, four times a day. It costs nothing and it accretes an audience that has nothing to do with ritual: hydrology people, Haridwar locals, flood watchers, weather accounts, journalists. Over a year that account becomes a small utility, and utilities get quoted.

Then, when a station crosses its CWC warning level, the whole system fires at once:
- The account posts the crossing, no CTA, just the number and the word **above warning**.
- Every Varsh subscriber gets a push: *"Har Ki Pauri is above warning level. Second impression is open for six hours."*
- Every Patra issued in that window prints in **Ufaan**, full vermillion.
- The `/gauge` page pins the hydrograph.

Five to twelve times a monsoon. Unschedulable, unfakeable, and it converts because the scarcity is visibly not ours.

#### Campaign 3: Sixteen (सोलह) — Pitru Paksha, and no upsell in it at all

A sixteen-day sequence. Sign up with one ancestor's name. Each morning, one message: that day's tithi, the Godavari's reading at Ram Kund, and one tap to take the snan. On the sixteenth day, Sarva Pitru Amavasya, you receive **the Solah**: one bound sheet with all sixteen river readings, ranged in a column, the name at the head.

**Free. Entirely. Permanent. No upsell in any of the sixteen messages, no upsell on the sheet, no upsell in the email that delivers it.** If a single "upgrade" button appears anywhere in this campaign, kill the campaign.

It will be the most-forwarded thing you ever make, and it is the reason the "you are exploiting grief" attack will not stick when it comes.

---

## 7. "Our servers are in the river"

**It is not the headline.** The headline is the promise to the buyer, which is already right: *The river comes to you.*

"Our servers are in the river" is the **proof line**, and it belongs in exactly three places:

1. **`/gauge`, as the H1.** The page underneath must earn it: station names, CWC station identifiers, the source URLs (`nwdp.nwic.gov.in`, `cwc.gov.in/ffm_dashboard`), update cadence, last-fetched timestamp, the licence the data is published under, and a link that lets anybody re-check any Patra's reading against the government's own page. Sub-line: **"Not ours. India's. We just read them."**
2. **The Show HN title and the launch tweet.** This is precisely the sentence that makes a technical audience click.
3. **The press subject line.**

Do not put it on the home page. On the home page it reads as a boast; on `/gauge`, with the station table under it, it reads as a fact, and facts travel further.

---

## 8. Press

The story is not "app for online puja". There are dozens of those and no desk wants another. The story is: **two people wired a government hydrology feed into a religious object, and made the object impossible to counterfeit because the river will not repeat itself.**

Three angles, pitch each to the desk that wants it:

| Angle | For |
|---|---|
| Open government data ends up somewhere nobody planned | Rest of World, Scroll.in, The Print, 404 Media |
| A digital collectible whose scarcity is physical, not invented | The Ken, The Morning Context, Entrackr, Mint Lounge |
| The diaspora ritual economy and what it will pay for | Rest of World, The Ken, Economic Times Tech |

Pitch as written in the Copy section. Named outlets above, and I will not invent journalists' names; identify the current tech-and-society, open-data and consumer-internet reporters at each masthead before sending, and pitch the person, not the outlet.

Creators, by category, not by fabricated handle: mid-tier Hindi devotional YouTubers (100k to 800k, where a free Founding Patra is a real gift and a top-tier fee is not payable), Indian tech newsletter writers, Indian data-journalism accounts, and diaspora comedy accounts, who will find this funny and will do more volume than any of the others. Give all of them Founding Patras, numbered, free, and no script.

---

## 9. Backlash: `/khandan` (खंडन-मंडन)

Do not write a FAQ. Write the almanac's correspondence page, in the classical form: **khandan-mandan**, objection and answer, printed side by side. Publish the objections verbatim, with the sender's name if they want it there. Being attacked is distribution. Give the attack somewhere good to land.

Then the line that makes the page itself get shared:

> **The best objection each month gets a free Varsh. We are serious. Send it.**

Full copy in the next section. Ship the page **on day one, before anybody has objected**, seeded with the five objections you already know are coming. A product that has pre-printed the case against itself is very hard to dunk on.

---

## 10. Build order

| Order | Ship | Why |
|---|---|---|
| 1 | Gauge ingestion + `/gauge` + `@snanify_jal` cron | The account needs a year of history to be worth anything. Start it before the product. |
| 2 | Free snan flow, Patra issuance, `/p/[id]`, the OG renderer with Devanagari loaded | This is the loop. Nothing works without it. |
| 3 | The remembrance fork, all six surfaces | Ship it *with* the loop, never after. Getting this wrong once is unrecoverable. |
| 4 | Share sheet, Jal Nimantran, Sang cross-printing | Takes K from 0.14 to 0.46 |
| 5 | Checkout: Razorpay INR, Stripe USD, geo-priced | Founding Patra first, then the tariff |
| 6 | Rare-state impressions | Ufaan first, it is the only one that is unschedulable |
| 7 | `/khandan`, `/bahi`, `/deewar` | Before the launch post, not after |
| 8 | Varsh, Bhent, Samvatsar | Month 2 and 3 |

### Instrumentation, name these events exactly

`snan_started` · `snan_completed{mode, ghat, rare_state}` · `patra_issued{tier}` · `share_sheet_opened` · `share_completed{channel, names_count}` · `patra_viewed{referrer, is_owner}` · `invite_claimed` · `checkout_started{sku}` · `purchase{sku, currency}` · `sub_started` · `sub_churned`

K is computed nightly as `snan_completed` attributed to a `patra_viewed` referrer, divided by `patra_issued` from the prior generation. Put it on a wall. It is the only number that decides whether this works.


---

## Copy

════════════════════════════════════════════
A. THE TARIFF, SKU NAMES AND DESCRIPTIONS
════════════════════════════════════════════

── 00. DARSHAN / दर्शन ── free

EN
Darshan
Free, and it stays free.
Choose a water. Give a name and a gotra. Three minutes later you have your snan and your Patra, on screen, with the river's own reading on it. No card. No account. As many times as you like.

HI
दर्शन
निःशुल्क, और निःशुल्क ही रहेगा।
एक जल चुनिए। एक नाम और गोत्र दीजिए। तीन मिनट बाद आपका स्नान और आपका पत्र सामने होगा, उस पर नदी का अपना पाठ अंकित। न कार्ड, न खाता। जितनी बार चाहें।


── 01. ONE PATRA / एक पत्र ── ₹449 · $14

EN
One Patra
One snan, and the file that comes out of it.
Print-quality PNG, a PDF, an A3 print file, your Jal Mudra as an SVG and as a picture you can set as your display photo, the Gauge Strip, which is the actual hydrograph of that hour with your minute marked on it, and the Naam Kshan audio. Kept forever. Checkable by anyone, forever.

HI
एक पत्र
एक स्नान, और उससे निकली पूरी संचिका।
छपाई-योग्य PNG, एक PDF, A3 प्रिंट फ़ाइल, आपकी जल मुद्रा SVG में और उस रूप में भी जिसे आप अपनी प्रदर्शन-छवि बना सकें, जल-लेख, अर्थात उस घंटे का वास्तविक जल-आलेख जिस पर आपका क्षण अंकित है, और नाम-क्षण की ध्वनि। सदा के लिए सुरक्षित। कोई भी, कभी भी जाँच सकता है।


── 02. TWELVE / बारह पत्र ── ₹1,499 · $49

EN
Twelve
Twelve Patras, at ₹125 each instead of ₹449.
The credits do not expire, so you can spend them the way the year actually runs: one on each amavasya, or all twelve on one morning with twelve names. Most people buy this one, and most people should.

HI
बारह पत्र
बारह पत्र, ₹449 के स्थान पर ₹125 प्रति पत्र।
ये पत्र-अंश समाप्त नहीं होते, इसलिए इन्हें वर्ष जैसे चलता है वैसे ही खर्च कीजिए: प्रत्येक अमावस्या पर एक, अथवा एक ही प्रातः बारह नामों के साथ बारहों। अधिकांश लोग यही लेते हैं, और यही लेना चाहिए।


── 03. THE YEAR / वर्ष ── ₹149/माह, ₹1,199/वर्ष · $6/mo, $49/yr

EN
The Year
Unlimited Patras, and the calendar that tells you when to take them.
Every parva pre-scheduled at your water. The Ufaan alert, which reaches you at whatever hour the river crosses its warning level, because the river does not consult the calendar. The Samvatsar, bound and sent to you in Chaitra, free.

HI
वर्ष
असीमित पत्र, और वह पंचांग जो बताता है कब लेने हैं।
आपके जल पर हर पर्व पहले से नियत। उफान-सूचना, जो उसी घड़ी आती है जिस घड़ी नदी अपनी चेतावनी-रेखा पार करती है, क्योंकि नदी पंचांग से नहीं पूछती। और संवत्सर, बँधा हुआ, चैत्र में आपके पास, निःशुल्क।


── 04. THE GIFT / भेंट ── ₹599 · $18

EN
The Gift
A Patra, sealed, that opens on a morning you choose.
Pick the date and the water. They get an envelope that will not open until that morning. They enter their own name and their own gotra, because a snan taken in somebody else's words is not theirs. Good for a birthday, a first grandchild, a house, a leaving.

HI
भेंट
एक पत्र, मुहरबंद, जो आपके चुने हुए प्रातः खुलता है।
तिथि और जल आप चुनिए। उन्हें एक लिफ़ाफ़ा मिलेगा जो उस प्रातः से पहले खुलेगा नहीं। नाम और गोत्र वे स्वयं भरेंगे, क्योंकि किसी और के शब्दों में लिया गया स्नान उनका नहीं होता। जन्मदिन के लिए, पहले पोते-पोती के लिए, नए घर के लिए, विदा के लिए।


── 05. THE YEAR-SET / संवत्सर ── ₹1,299 · $39

EN
The Year-Set
Every snan you took this year, bound into one almanac.
Sixteen pages. One spread for each water you went to, the full hydrograph of every one of your mornings, the tithis ranged down the margin, and the names in the order you gave them. Print file included, because this one is meant to be on a wall or in a drawer, not in a folder.

HI
संवत्सर
इस वर्ष आपने जितने स्नान लिए, सब एक पंचांग में बँधे हुए।
सोलह पृष्ठ। हर जल के लिए एक खुला पन्ना, आपकी हर प्रातः का पूरा जल-आलेख, हाशिये पर क्रम से तिथियाँ, और नाम उसी क्रम में जिस क्रम में आपने दिए। प्रिंट फ़ाइल साथ है, क्योंकि यह दीवार पर या दराज़ में रहने के लिए बना है, किसी फ़ोल्डर में नहीं।


── 00. THE FOUNDING PATRA / आदि पत्र ── ₹2,999 · $99 · 1,000 seats

EN
The Founding Patra
One thousand of these. Then never again.
A folio number, yours, printed on every Patra you ever issue for the rest of your life. Vars for life, so you never pay us again. Your name in the Founding Register, if you want it there. We are not going to do a second edition, or a special edition, or reopen this in a year when we need money. It closes at a thousand and it stays closed.

HI
आदि पत्र
केवल एक हज़ार। उसके बाद कभी नहीं।
एक फोलियो संख्या, आपकी अपनी, जो जीवन भर आपके निर्गत हर पत्र पर छपेगी। आजीवन वर्ष, अर्थात आपको हमें फिर कभी कुछ नहीं देना। और आदि-बही में आपका नाम, यदि आप चाहें। न कोई दूसरा संस्करण होगा, न विशेष संस्करण, न किसी वर्ष धन की आवश्यकता पड़ने पर यह फिर खुलेगा। एक हज़ार पर बंद, और बंद ही रहेगा।


── THE TWO LINES THAT SIT AT THE FOOT OF THE TARIFF

EN
India is priced in rupees at Indian prices, and the rest of the world is not. Everybody does this and almost nobody says it, so we are saying it.
A Patra taken in remembrance is free, permanent, and has no upgrade attached to it. We are not going to charge you rent on your father's name.

HI
भारत में मूल्य रुपयों में और भारतीय दर पर है, शेष विश्व में नहीं। यह सब करते हैं और कोई कहता नहीं, इसलिए हम कह रहे हैं।
स्मरण में लिया गया पत्र निःशुल्क है, सदा के लिए है, और उसके साथ कोई उन्नयन नहीं जुड़ा। हम आपके पिता के नाम पर आपसे किराया नहीं लेंगे।


════════════════════════════════════════════
B. THE ATTESTATION LINE, PRINTED ON EVERY PATRA
════════════════════════════════════════════

EN
This records a digital snan. At the minute printed above, the river stood at the level printed above, and that reading is the Central Water Commission's, not ours. No rite was performed at any ghat, and none is claimed.

HI
यह एक डिजिटल स्नान का अभिलेख है। ऊपर अंकित मिनट पर नदी उसी स्तर पर थी जो ऊपर अंकित है, और वह पाठ केंद्रीय जल आयोग का है, हमारा नहीं। किसी घाट पर कोई अनुष्ठान नहीं किया गया, और न ही ऐसा कोई दावा है।


════════════════════════════════════════════
C. THE OPEN GRAPH CARD
════════════════════════════════════════════

── CELEBRATION, image text

Eyebrow (spot):        SNAN TAKEN            /  स्नान संपन्न
Name (76px):           Anita Sharma          /  अनीता शर्मा
Water (28px):          Ganga · Har Ki Pauri, Haridwar  /  गंगा · हर की पौड़ी, हरिद्वार
Register band:         LEVEL 293.71 m | FLOW 1,842 cumec | 11 AUG 2026 · 05:14 IST | TITHI Shukla Ekadashi
                       स्तर 293.71 मी | प्रवाह 1,842 क्यूमेक | 11 अगस्त 2026 · 05:14 IST | तिथि शुक्ल एकादशी
Foot (18px):           Digital snan. Reading: Central Water Commission, Haridwar station.
                       डिजिटल स्नान। पाठ: केंद्रीय जल आयोग, हरिद्वार केंद्र।

── CELEBRATION, link title and description

EN
Title:        Anita Sharma · Ganga at Har Ki Pauri
Description:  11 Aug 2026, 05:14 IST. The river stood at 293.71 m and was flowing at 1,842 cumec. A digital snan, with the Central Water Commission's own reading on it. Take yours, free.

HI
Title:        अनीता शर्मा · हर की पौड़ी, गंगा
Description:  11 अगस्त 2026, 05:14 IST। नदी 293.71 मीटर पर थी और 1,842 क्यूमेक बह रही थी। एक डिजिटल स्नान, जिस पर केंद्रीय जल आयोग का अपना पाठ अंकित है। अपना लीजिए, निःशुल्क।

── REMEMBRANCE, image text

Eyebrow (ink):         WATER OFFERED IN THIS NAME   /  इस नाम पर जल अर्पित
Name (76px):           Shri Ram Prasad Sharma       /  श्री रामप्रसाद शर्मा
Water (28px):          Godavari · Ram Kund, Nashik  /  गोदावरी · रामकुंड, नासिक
Register band:         RAM KUND, NASHIK | 11 AUG 2026
Foot (18px):           A digital snan, offered in his name by his son.
                       एक डिजिटल स्नान, उनके पुत्र द्वारा उनके नाम पर अर्पित।

── REMEMBRANCE, link title and description

EN
Title:        In remembrance of Shri Ram Prasad Sharma
Description:  Godavari at Ram Kund, Nashik. 11 August 2026. Water offered in his name by his son. A name can be added to this remembrance.

HI
Title:        श्री रामप्रसाद शर्मा के स्मरण में
Description:  गोदावरी, रामकुंड, नासिक। 11 अगस्त 2026। उनके पुत्र द्वारा उनके नाम पर जल अर्पित। इस स्मरण में एक नाम और जोड़ा जा सकता है।


════════════════════════════════════════════
D. THE SHARE SHEET TEXT
════════════════════════════════════════════

── CELEBRATION, pre-filled

EN
My snan this morning. Ganga at Har Ki Pauri, 05:14. The river was standing at 293.71 m, and that reading is the Central Water Commission's, not mine.
snanify.com/p/7Kq2mAv4nR

HI
आज प्रातः मेरा स्नान। हर की पौड़ी, गंगा, 05:14। नदी 293.71 मीटर पर खड़ी थी, और वह पाठ केंद्रीय जल आयोग का है, मेरा नहीं।
snanify.com/p/7Kq2mAv4nR

── CELEBRATION, when other people are named on it

EN
Ma, Papa, Nani and I took a snan this morning at Har Ki Pauri. All four names are on it. The Ganga was at 293.71 m at 05:14.
snanify.com/p/7Kq2mAv4nR

HI
आज प्रातः माँ, पापा, नानी और मैंने हर की पौड़ी पर स्नान लिया। चारों नाम उस पर हैं। 05:14 पर गंगा 293.71 मीटर पर थीं।
snanify.com/p/7Kq2mAv4nR

── REMEMBRANCE, pre-filled, button reads "Send to family"

EN
Water was offered in Papa's name this morning, at Ram Kund. Sending it to you.
snanify.com/p/9Fh4bQx2wT

HI
आज प्रातः रामकुंड पर पापा के नाम जल अर्पित किया गया। आपको भेज रही हूँ।
snanify.com/p/9Fh4bQx2wT


════════════════════════════════════════════
E. THE LANDING PAGE FOR A SHARED PATRA
════════════════════════════════════════════

── CELEBRATION

EN
[the Patra sheet]
The Ganga at Har Ki Pauri stood at 293.71 m when Anita took this snan.
It is 293.44 m now.
[live hydrograph, 24 hours, her minute marked in vermillion]

Check it yourself. The reading comes from the Central Water Commission's Haridwar station and we do not touch it. Here is their page.

Anita has left one snan open at this water for whoever opens this first. It is free, it takes three minutes, and there is no card and no account.
→ Take yours at the Ganga

HI
[पत्र]
जब अनीता ने यह स्नान लिया, हर की पौड़ी पर गंगा 293.71 मीटर पर थीं।
इस समय 293.44 मीटर हैं।
[सजीव जल-आलेख, 24 घंटे, उनका क्षण सिंदूरी रंग में अंकित]

स्वयं जाँच लीजिए। यह पाठ केंद्रीय जल आयोग के हरिद्वार केंद्र से आता है और हम उसे छूते नहीं। उनका पृष्ठ यह रहा।

जो सबसे पहले इसे खोलेगा, अनीता ने उसके लिए इसी जल पर एक स्नान खुला छोड़ा है। निःशुल्क, तीन मिनट, न कार्ड, न खाता।
→ गंगा पर अपना स्नान लीजिए

── REMEMBRANCE

EN
[the Patra sheet]
Water was offered in this name at Ram Kund, Nashik, on the morning of 11 August 2026. The Godavari was at 561.20 m.
This Patra will not expire, and it did not cost anything.
→ Add a name to this remembrance

HI
[पत्र]
11 अगस्त 2026 की प्रातः रामकुंड, नासिक पर इस नाम पर जल अर्पित किया गया। गोदावरी 561.20 मीटर पर थीं।
यह पत्र कभी समाप्त नहीं होगा, और इसका कोई मूल्य नहीं लिया गया।
→ इस स्मरण में एक नाम जोड़िए


════════════════════════════════════════════
F. THE INVITE, JAL NIMANTRAN / जल निमंत्रण
════════════════════════════════════════════

EN
Jal Nimantran
Anita has left a snan open for you at the Ganga at Har Ki Pauri. Take it in the next 72 hours and your Patra is issued permanently, at no cost. Both sheets will then carry the same line: taken together, at the same water.
→ Open the water

HI
जल निमंत्रण
अनीता ने आपके लिए हर की पौड़ी पर गंगा में एक स्नान खुला रखा है। अगले 72 घंटों में ले लीजिए और आपका पत्र स्थायी रूप से निर्गत होगा, बिना किसी शुल्क के। तब दोनों पत्रों पर एक ही पंक्ति छपेगी: संग, एक ही जल पर।
→ जल खोलिए

── The Sang line, printed on both sheets

EN     Taken with Anita Sharma, at the same water, 11 August 2026.
HI     संग: अनीता शर्मा, एक ही जल पर, 11 अगस्त 2026।


════════════════════════════════════════════
G. LAUNCH POSTS
════════════════════════════════════════════

── G1. HACKER NEWS, Show HN

Title:
Show HN: Our servers are in the river

Body:
India's Central Water Commission publishes live telemetry from hydrological stations on the Ganga, the Yamuna, the Godavari, the Shipra and the Kaveri. Level, discharge, warning thresholds, updated through the day, in public, for free.

We built a ritual product on top of it.

You choose one of six waters, give a name and a gotra, and take a three-minute digital snan. At the end you get a certificate. On the certificate is the river's actual state at the minute you took it: the level in metres, the discharge in cumec, the station, and a link to the government's own page so anyone can check it.

The interesting part is what that does to the artefact. Name plus gotra plus timestamp plus the gauge reading is a seed that cannot repeat. Two certificates can never be identical, and the uniqueness is not a hash we invented, it is a river that will not stand at 293.71 m twice at 05:14. Rare states are genuinely rare: when a station goes above its warning level during the monsoon, which happens maybe eight times a season and cannot be scheduled by anyone, the certificate prints differently.

The snan is free and stays free. We sell the file.

We are also very clear about what it is not. Nobody stands in a river for you. It says so on the certificate, in the same size type as everything else.

Stack: Next 16, App Router, bilingual EN/HI, no client-side JS on the certificate path. The gauge poller is a cron. Data pages: snanify.com/gauge

── G2. X / TWITTER, launch thread

1/
Our servers are in the river.

Not ours, actually. India's. The Central Water Commission has telemetry stations on the Ganga, the Yamuna, the Godavari, the Shipra and the Kaveri, and it publishes the readings in public.

We built a ritual product on top of them.

2/
Take a digital snan at one of six waters. Free. Three minutes. No account.

You get a certificate. On it: the river's actual level and flow at the minute you took it, the station it came from, and a link to the government's page so anybody can check it.

3/
Which makes the certificate hard to fake in an unusual way.

Name + gotra + timestamp + gauge reading is a seed. The Ganga will not stand at 293.71 m at 05:14 twice. Two certificates cannot be identical, and the reason is hydrology, not cryptography.

4/
Rare states are actually rare.

Monsoon peak above warning level. An eclipse. A Kumbh bathing date. Kartik Purnima at full moon.

Nobody can schedule those, including us. When they happen the certificate prints in a second impression.

5/
What it is not: a priest, a ghat, or a rite performed on your behalf. Nobody stood in a river for you.

That sentence is printed on every certificate, at full size, not in fine print.

6/
The snan is free forever. We sell the print file.

A certificate taken in remembrance is free, permanent, and has nothing to sell you. We are not going to charge rent on anybody's father's name.

7/
@snanify_jal will post the six rivers' readings four times a day, forever, starting now. No CTA on those. Just the numbers.

snanify.com

── G3. REDDIT (r/india, r/hinduism, r/ABCDesis, r/nri)

Title:
We wired India's government river gauges into a digital snan. It is free. Ask us anything, including the hostile questions.

Body:
Two of us built this. Here is exactly what it is, before anyone has to guess.

You pick one of six waters: the Ganga at Har Ki Pauri, the Sangam at Prayagraj, the Yamuna at Vishram Ghat, the Godavari at Ram Kund, the Shipra at Ram Ghat, or the Kaveri at Talakaveri. You give a name and a gotra. You take a three-minute digital snan on your phone. It is free, there is no account, and there is no limit.

At the end you get a Sankalp Patra. On it is the river's real state at the minute you took it, pulled from the Central Water Commission's public telemetry: the level, the flow, the station, the reading time. There is a link on the page to the government's own dashboard so you can check the number yourself.

What it is not, and we would rather say this ourselves than have it said at us: nobody goes to a ghat, nobody stands in the water, and no rite is performed on anybody's behalf. That sentence is printed on the certificate itself, at full size.

Why we think it is still worth having: because the record is real. The river was at that level at that minute, that is a matter of public record, and a name set against it is a thing that cannot be duplicated. If you have been away for eleven years and your family is at the ghat and you are not, that is not nothing.

The snan is free. We sell the print file, and a certificate taken in remembrance of someone who has died is free and permanent and has no upgrade attached to it.

Objections are collected at snanify.com/khandan and printed with our answers. If yours is better than the ones already there we will print it and give you a year free. Genuinely, go ahead.

── G4. WHATSAPP, the seed message the founders send by hand

EN
We built something. It is free, it takes three minutes, and you do not have to sign up for anything.

You pick a river, put in a name and a gotra, and you get a certificate with the Ganga's actual water level at the minute you took it, straight from the Central Water Commission. You can check the number on the government's own site.

Nobody goes to a ghat, nobody does a puja for you, and it says that on the certificate. It is a digital thing and it is honest about being one.

Put Ma and Papa's names on it too, up to eight names go on one.
snanify.com

HI
हमने कुछ बनाया है। निःशुल्क है, तीन मिनट लगते हैं, और कहीं खाता बनाने की आवश्यकता नहीं।

एक नदी चुनिए, नाम और गोत्र भरिए, और आपको एक पत्र मिलेगा जिस पर उसी मिनट का गंगा का वास्तविक जल-स्तर अंकित होगा, सीधे केंद्रीय जल आयोग से। वह संख्या आप सरकार की अपनी साइट पर जाँच सकते हैं।

कोई घाट पर नहीं जाता, कोई आपके लिए पूजा नहीं करता, और यह बात पत्र पर लिखी है। यह डिजिटल वस्तु है और इसे छिपाया नहीं गया है।

माँ और पापा का नाम भी डाल दीजिए, एक ही पत्र पर आठ नाम आ जाते हैं।
snanify.com

── G5. INSTAGRAM, Hindi caption for the Ufaan post

HI
हर की पौड़ी। 14:05.
गंगा 294.90 मीटर पर। चेतावनी रेखा से ऊपर।

यह संख्या हमारी नहीं है। केंद्रीय जल आयोग की है, और उनकी साइट पर इसी समय यही लिखा है।

अगले छह घंटे तक जो पत्र निर्गत होगा, वह उफान में छपेगा। यह वर्ष में आठ-दस बार होता है और इसे कोई निश्चित नहीं कर सकता, हम भी नहीं।

स्नान निःशुल्क है। लिंक बायो में।

EN (for the same post, second line of the caption)
Har Ki Pauri. 14:05. The Ganga at 294.90 m, above warning level. That number is the Central Water Commission's, not ours. Every Patra issued for the next six hours prints in Ufaan. This happens eight or ten times a year and nobody can schedule it, including us.

── G6. THE PRESS PITCH

Subject: Our servers are in the river

Hello [name],

Two of us built a product on top of the Central Water Commission's public hydrology feed, and I think the result is odd enough to be worth twenty minutes of your time.

The CWC publishes live telemetry from gauging stations on the Ganga, the Yamuna, the Godavari, the Shipra and the Kaveri: water level, discharge, warning thresholds, updated through the day, free, on the national water data portal and the flood forecasting dashboard. It is used by irrigation departments and district administrations, and by almost nobody else.

We use it to make religious certificates.

A user takes a three-minute digital snan on their phone, free, no account. What they get at the end is a printed-looking Sankalp Patra with the river's actual state at that minute on it: level in metres, discharge in cumec, the station identifier, the reading time, and a link to the government's own page so anyone can verify it.

The consequence is the part I would want to write about. Name plus gotra plus timestamp plus gauge reading is a seed that cannot repeat, so no two certificates can be identical, and the reason is not a cryptographic trick, it is that the Ganga will not stand at 293.71 m twice at 05:14 on a Tuesday. Rarity is also not ours to manufacture: when a station crosses its warning level during the monsoon, roughly eight times a season and schedulable by nobody, the certificate prints differently. A digital collectible whose scarcity is enforced by a river is, as far as I can tell, new.

We are also not pretending. Nobody goes to a ghat, nobody performs a rite on anybody's behalf, and the certificate says so in the same size type as everything else on it. The snan is free and stays free; we sell the print file. A certificate taken in remembrance of someone who has died is free, permanent, and carries nothing to upgrade to.

Three angles, whichever fits your desk:
1. Open government data ends up somewhere the people who published it did not imagine.
2. A digital collectible with physical scarcity, which the entire NFT category spent four years failing to invent.
3. The diaspora ritual economy, thirty-five million people, and what it will actually pay for.

Happy to hand over the raw ingestion logs, the station list, the pricing, and the revenue numbers, including the bad ones.

[founder], Snanify
snanify.com/gauge is the data page, and it is the fastest way to see whether the claim holds up.


════════════════════════════════════════════
H. THE BACKLASH PAGE, /khandan (खंडन-मंडन)
════════════════════════════════════════════

── Header

EN
Objections, and answers
People have things to say about this, and some of them are right. We print them here as they were sent, with our replies beside them, in the old form: the objection, then the defence.
The best objection each month gets a free year. We are serious. Send it.

HI
खंडन-मंडन
लोगों को इस विषय में बहुत कुछ कहना है, और कुछ बातें ठीक भी हैं। हम उन्हें यहाँ ज्यों का त्यों छापते हैं, साथ में अपना उत्तर, उसी पुरानी रीति से: पहले खंडन, फिर मंडन।
हर महीने की सबसे अच्छी आपत्ति को एक वर्ष निःशुल्क। हम गंभीर हैं। भेजिए।

── 01

EN
Objection. This is fake.
Answer. Correct, and we printed it on the certificate before you got here. What is not fake: the Ganga at Har Ki Pauri was at 293.71 m at 05:14 this morning. That number came from the Central Water Commission, who have never heard of us and would not return our calls.

HI
आपत्ति। यह नकली है।
उत्तर। ठीक कहा, और आपके यहाँ पहुँचने से पहले ही हमने वह बात पत्र पर छाप दी थी। नकली जो नहीं है: आज प्रातः 05:14 पर हर की पौड़ी पर गंगा 293.71 मीटर पर थीं। वह संख्या केंद्रीय जल आयोग से आई है, जिसने हमारा नाम तक नहीं सुना और जो हमारा फ़ोन भी नहीं उठाएगा।

── 02

EN
Objection. You are selling religion.
Answer. We are selling a PDF. The snan is free, it has always been free, and it will be free on the day we shut down. If you want to argue about the PDF, we will listen, but bring the actual price list, it is at snanify.com/tariff and it is one page.

HI
आपत्ति। आप धर्म बेच रहे हैं।
उत्तर। हम एक PDF बेच रहे हैं। स्नान निःशुल्क है, सदा निःशुल्क रहा है, और जिस दिन हम बंद होंगे उस दिन भी निःशुल्क रहेगा। PDF पर बहस करनी हो तो हम सुनेंगे, पर असली मूल्य-सूची साथ लाइए, वह snanify.com/shulk-patra पर एक ही पृष्ठ में है।

── 03

EN
Objection. A snan means the body in the water. Anything else is not a snan.
Answer. Yes. Go to Haridwar. Take the train, stand on the step, do the thing properly, it is better and everybody knows it is better. We will still be here on the morning you cannot go, which for most people is most mornings.

HI
आपत्ति। स्नान का अर्थ है शरीर का जल में उतरना। इसके अतिरिक्त कुछ भी स्नान नहीं है।
उत्तर। ठीक है। हरिद्वार जाइए। रेल लीजिए, सीढ़ी पर खड़े होइए, विधिवत कीजिए, वह श्रेष्ठ है और यह सब जानते हैं। जिस प्रातः आप नहीं जा सकेंगे, उस प्रातः हम यहीं मिलेंगे, और अधिकांश लोगों के लिए वह अधिकांश प्रातः होती हैं।

── 04

EN
Objection. This is disrespectful.
Answer. We have never once said a priest stood in a river for you. We printed the opposite on the document, in the largest type on the page, before anybody paid us anything. If a plainly labelled digital thing is disrespectful, the argument you actually want is with the calendar app that tells you when Ekadashi is.

HI
आपत्ति। यह अनादर है।
उत्तर। हमने एक बार भी नहीं कहा कि कोई पुरोहित आपके लिए नदी में उतरा। हमने पत्र पर इसका उल्टा छापा है, पृष्ठ के सबसे बड़े अक्षरों में, और किसी से एक रुपया लेने से पहले छापा है। यदि स्पष्ट रूप से डिजिटल कही गई वस्तु अनादर है, तो असली बहस उस कैलेंडर ऐप से है जो आपको एकादशी बताता है।

── 05

EN
Objection. You are making money out of grief.
Answer. A Patra taken in remembrance is free, permanent, and has nothing attached to it that you can buy. During Pitru Paksha we send sixteen messages and not one of them has a button in it. If you find a single upsell anywhere on the remembrance path, send us the screenshot and we will take it down that day and give you the year free as well.

HI
आपत्ति। आप शोक से कमा रहे हैं।
उत्तर। स्मरण में लिया गया पत्र निःशुल्क है, स्थायी है, और उसके साथ खरीदने योग्य कुछ भी नहीं जुड़ा। पितृ पक्ष में हम सोलह संदेश भेजते हैं और उनमें से एक में भी कोई बटन नहीं है। स्मरण के मार्ग पर कहीं भी एक भी विक्रय-सूचना मिल जाए तो चित्र भेज दीजिए, हम उसी दिन हटा देंगे और वर्ष भी निःशुल्क दे देंगे।

── 06

EN
Objection. You are a couple of people with a website, not a religious authority.
Answer. Entirely true, and it is why the certificate has no temple crest on it, no registry number, no seal we were not given, and no name of anybody who did not agree in writing to be named. We keep a record of a measurement and a name. That is the whole of what we do and the whole of what we claim.

HI
आपत्ति। आप दो व्यक्ति और एक वेबसाइट हैं, कोई धार्मिक प्राधिकरण नहीं।
उत्तर। पूर्णतः सत्य, और इसीलिए पत्र पर किसी मंदिर का चिह्न नहीं है, कोई पंजीकरण संख्या नहीं है, कोई मुहर नहीं है जो हमें दी न गई हो, और किसी ऐसे व्यक्ति का नाम नहीं है जिसने लिखित सहमति न दी हो। हम एक माप और एक नाम का अभिलेख रखते हैं। हमारा काम इतना ही है और हमारा दावा भी इतना ही।


════════════════════════════════════════════
I. /gauge, THE DATA PAGE
════════════════════════════════════════════

EN
Our servers are in the river.
Not ours. India's. We just read them.

The Central Water Commission runs telemetry at gauging stations across the country and publishes what they say. Below is every station we read, the identifier, what we take from it, how often, and when we last got an answer. Every Patra links to the station that produced its reading, so a stranger can check the number without asking us anything.

We do not adjust, smooth, round up, or fill in a gap with the last good value. If a station stops reporting, the Patra prints the gap, in words.

HI
हमारे सर्वर नदी में हैं।
हमारे नहीं। भारत के। हम बस उन्हें पढ़ते हैं।

केंद्रीय जल आयोग देश भर के मापन-केंद्रों पर दूरमापी चलाता है और जो वे बताते हैं उसे प्रकाशित करता है। नीचे हर वह केंद्र है जिसे हम पढ़ते हैं, उसकी पहचान-संख्या, हम उससे क्या लेते हैं, कितनी बार लेते हैं, और अंतिम उत्तर कब मिला। हर पत्र उसी केंद्र से जुड़ा है जिससे उसका पाठ आया, ताकि कोई भी अपरिचित व्यक्ति वह संख्या हमसे पूछे बिना जाँच सके।

हम न संशोधन करते हैं, न समतल करते हैं, न ऊपर पूर्णांक बनाते हैं, न किसी रिक्त स्थान को पिछले पाठ से भरते हैं। यदि कोई केंद्र उत्तर देना बंद कर दे, तो पत्र पर वह रिक्ति शब्दों में छपती है।


## Open questions

- Web search budget was exhausted for this session, so five factual claims used in this design are unverified and must be checked before any of it ships: (a) that nwdp.nwic.gov.in and cwc.gov.in/ffm_dashboard actually expose machine-readable level and discharge for all six of our stations, and at what cadence; (b) the licence those datasets are published under and whether commercial reuse and re-display require attribution or permission; (c) whether Talakaveri and Ram Ghat, Ujjain have CWC gauging stations at all, since Shipra and a temple tank at a river source may simply not be instrumented, which would break the artefact for two of the six waters; (d) the exact 2026 and 2027 dates for Kartik Purnima, Mauni Amavasya and Pitru Paksha, which the campaign calendar depends on; (e) whether Nashik Simhastha 2027 and Ujjain Simhastha 2028 are the correct next Kumbh turns.
- If two of the six waters have no gauge (likely Talakaveri, possibly Shipra), what replaces the reading on those Patras? Options: nearest downstream station named honestly as such, or a different measured quantity (rainfall, reservoir level), or those waters ship without a river-state cell and are priced the same. Decide before launch, because a Patra with an invented number destroys the only thing that makes this defensible.
- Indian GST on digital services to consumers is 18% and OIDAR rules apply to sales into India from a foreign entity. Are the INR prices in this tariff GST-inclusive or exclusive, and which entity sells into India? This moves net revenue by roughly 15% and the $20k model assumes inclusive pricing with the tax absorbed.
- RBI e-mandate rules make small recurring INR card charges painful. The ₹149/month Varsh almost certainly has to run on UPI Autopay rather than cards. Confirm Razorpay's UPI Autopay support, the mandate-creation drop-off rate, and whether an annual-only INR subscription (₹1,199 one-time) is the better product in India.
- Voice: the Naam Kshan audio needs a decision. Synthesised Sanskrit sankalp with the name inserted is cheap and scales to zero-ops, but a bad synthesis of a sankalp is worse than no audio at all, and a good one edges toward implying a person recited it. Recommend recording one non-priest reader saying the invariant portion, with the name spoken by the same voice, credited by name on the Patra, and stated as a recording rather than a rite. Needs the owner's call.
- Founding Patra at 1,000 seats promises Varsh for life. At a 5% take-up of 1,000 lifetime subscribers this is roughly $6k/year of foregone subscription revenue against a $60k one-time inflow. Fine, but it must be modelled as a liability and the promise must never be walked back. Confirm the owner is comfortable being held to it in year five.
- The remembrance carve-out (free, permanent, no upsell) is load-bearing for both the ethics and the backlash defence, and it is also the emotionally strongest use case, which means a meaningful share of demand may route into the free path. Model assumes 20% of snans are remembrance. If it is 45%, transactional revenue drops by roughly a quarter and the subscription becomes the whole business. Worth instrumenting from day one.
- Press outreach names mastheads but not journalists, deliberately, because I could not verify who currently holds which beat. Someone has to spend an afternoon identifying the actual open-data, consumer-internet and tech-and-society reporters at Rest of World, The Ken, The Morning Context, Scroll, 404 Media and Mint Lounge before the pitch goes out. A pitch to a masthead is a pitch to nobody.
- Ghat Bahi, the public register, publishes first names against waters and times. Even opt-in, this is personal data tied to religious practice, which is a special category under India's DPDP Act and under GDPR for the diaspora. Get the consent copy and the retention rule reviewed before the page ships, and consider first-name-plus-initial only.
- The existing hero copy in src/lib/content.ts still sells $11 Deep Daan, $51 named sankalp and $251 household rites, and the hero stats claim 1,20,000+ sankalps offered and 48 countries served. All of that contradicts this pivot and at least the stats look unverifiable. It needs rewriting in the same pass, and someone should decide whether those numbers were ever real.