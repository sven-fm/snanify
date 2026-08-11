# Jal Sankalp: the four-and-a-half-minute digital snan

**A digital snan is four and a half minutes long: the river's real reading, six breaths at its rhythm, a vow held under your thumb for eleven seconds, ninety seconds of black screen, and one line in a register; free to do alone, and you pay to bring someone with you.**

## 0. The one-sentence product

Every morning, for four and a half minutes, Snanify reads you a real river's real condition at this hour, breathes you at its rhythm, holds you still while you say your own vow, turns the screen black for ninety seconds, and writes one line into a register you keep for life.

No priest. No ghat. No camera. No performance. The claim is small and completely true, and that is what makes it sellable.

---

## 1. Naming the category

Three candidates.

**1. Jal Sankalp / जल संकल्प, "the water vow." RECOMMENDED.**
It is literally, field-by-field accurate: there is water (real, measured, named), and there is a sankalp (real, stated, the user's own). It claims nothing else. It reuses vocabulary the site already owns (Sankalp Patra, `/patra`, the `sankalp` anchor), so the pivot reads as a sharpening rather than a retreat. It is two ordinary words nobody has claimed as a product category, and it is pronounceable and typeable by a 24-year-old in Toronto and a 58-year-old in Kanpur alike. English gloss for cold audiences: "a sankalp taken to a live river."

**2. Dhara / धारा, "the current."**
The best pun available and the best object-noun: the river's stream is the data stream, and "take a dhara", "your 41st dhara" reads naturally. Keep it, but demote it: धारा is also the everyday Hindi word for a legal clause and a generic stream, so it is a poor SEO and trademark asset. **Use it as the name of one session, not the category.**

**3. Digital Snan / डिजिटल स्नान.**
The descriptive incumbent. Wins search and loses the argument: *snan* means bathing, no bathing occurs, and the phrase hands every critic the headline "app claims you can bathe in the Ganga through your phone." **Keep it only in `<meta>`, the FAQ and one landing subhead as a search synonym. Never as the product's own name for itself.**

**Decision.** The category is **Jal Sankalp**. One session is **a dhara**. The brand stays Snanify. The register is the **Jal Panjika**. The certificate is the **Jal Patra**.

---

## 2. The form: five limbs, 270 seconds, identical every day

Ritual is structure, timing, attention and repetition. The form never changes. The same five limbs, in the same order, at the same lengths, forever. Only the river changes, and it changes on its own.

| Clock | Limb | Length | On screen | Sound |
|---|---|---|---|---|
| 0:00 | (transition) | 4 s | All chrome leaves. Night edition forced. | Silence |
| 0:04 | **जल-पाठ Jal Path**, the reading | 21 s | Five almanac lines ink in, one every 4 s. A hairline waterline sits at the true gauge level. | River fades in over 20 s |
| 0:25 | **श्वास Shwas**, the breath | 60 s | The waterline rises 4 s, falls 6 s. Six cycles. "in"/"out" appear for the first two cycles only, then never again. | River, amplitude modulated by the breath |
| 1:25 | **संकल्प Sankalp**, the vow | 60 s | Water stills. The sankalp formula, pre-filled. A sustained 11-second press fills the text with vermillion. | River drops back; one bell on completion |
| 2:25 | **मौन Maun**, the stillness | 90 s | **Black. Fully black.** Screen brightness dropped, wake lock held. | River only |
| 3:55 | **चिह्न Chihn**, the mark | 35 s | Screen returns at 20%. One register line writes itself. The year-count. | River fades out over 8 s |
| 4:30 | end | | "Tomorrow, 04:41." | Silence |

### 2.1 The Reading (0:04 to 0:25)

Set exactly as a printed almanac entry, in the existing letterpress voice, using `ink-in` with its `steps(6)` timing so each line arrives like an impression rather than a fade.

```
GANGA · HAR KI PAURI · HARIDWAR
LEVEL 293.11 m · RISEN 4 cm SINCE MIDNIGHT
FLOW 1,240 cumec
READ 04:38 IST · CENTRAL WATER COMMISSION
YOU ARE 6,714 km FROM THIS WATER
```

The last line is the emotional payload and it costs one great-circle calculation. For a Gujarati in Leicester it says 6,714 km. For a Telugu nurse in Doha it says 2,590 km. For a student in Delhi it says 204 km, and that is a different feeling and an equally good one.

**The waterline is not decoration.** One hairline rule, positioned at the true reading mapped between that station's low-water datum and its published danger level, onto 8% to 92% of screen height. On a day the Ganga is in spate, the phone at 6am is almost entirely dark water above a thin band of paper. On a low-water February morning it sits near the bottom. Nobody has to explain this. People will notice within a week and it will be the thing they tell someone about.

**If the phone is on silent**, one line appears, once, on the first session only: "This is better with sound." Never shown again.

### 2.2 The Breath (0:25 to 1:25)

The waterline moves: 4 seconds up, 6 seconds down, six times. That is 6 breaths per minute, the resonance-frequency rate, with an exhale-biased ratio. The words "in" and "out" appear on cycles one and two and then stop. **The instruction removes itself once the body has the pattern.** That is the difference between a ritual and an interface.

**The amplitude of the rise and fall is scaled by today's actual flow.** A river in flood breathes bigger. Same 60 seconds, physically different every morning, at zero content cost. This is the repeat mechanic and it is free.

Sixty seconds is deliberately the on-ramp dose, not the therapeutic one. The ninety seconds of unguided stillness that follows carries the physiological work.

### 2.3 The Sankalp (1:25 to 2:25)

The only limb where the user does anything. The water goes still and one line appears:

> Say who you are.

Beneath it, the sankalp formula, already filled in from what the site knows: name, gotra, the city the phone is in, the river chosen, and today's masa, paksha and tithi pulled from the existing panchang engine. The user's own words sit in the last line.

**They type those words once, on first use.** Never again. Every morning after, their own vow is already there, and one tap changes it. Typing forty words at 6am destroys the ritual; re-reading your own forty words at 6am *is* the ritual.

**Then: the hold.** Press and hold anywhere. While held, the sankalp text fills with the spot vermillion from left to right, like ink soaking into paper, over **11.0 seconds**. Release early and the ink drains back; no error, no scold, no red, the ink just retreats and you begin again.

Eleven seconds of holding a thumb still on a screen while reading your own vow is a genuinely long time. It is the single strongest device in this design. It is the digital analogue of standing still in cold water: it cannot be skipped, it cannot be sped up, and it is the reason this is not a form. It costs one pointer-event handler and one CSS clip animation.

On completion: one bell (each of the six waters gets its own), the text sits fully in vermillion, and one word appears beneath it.

> **Spoken.**

Not "recorded." Not "offered." Not "accepted." **Spoken**, because that is the only thing that happened, and it is true.

### 2.4 The Stillness (2:25 to 3:55)

The boldest move in the product. The screen tells you to put the phone down, and then the screen goes away.

> Put the phone down. Face down, if you like.
> The river runs for ninety seconds.

Then: **full black**, brightness reduced, wake lock held, river audio continuing. For ninety of the two hundred and seventy seconds, we show the user nothing at all.

A digital product whose best minute is the minute the screen is off. **That is the line the marketing leads with**, and it is the answer to every "isn't this just an app" objection anyone will ever raise.

If the phone is picked up mid-stillness, nothing happens. No counter, no penalty, no "you moved." Ritual does not police. One bell at ninety seconds.

### 2.5 The Mark (3:55 to 4:30)

The screen returns at 20% brightness, the river fades under, and the day writes itself into the register as a single ruled line, exactly as an almanac sets an entry:

```
११ · श्रावण शु. एकादशी · गंगा २९३·११ मी · ०४:३८ · मौन ९० से.
```

Beneath it, the count, stated as an almanac would state it and never as a game:

> Forty-first consecutive morning.
> The Ganga has risen 1.4 m since your first.

**That second sentence is the retention engine and nobody else has it.** The user's practice is measured against the river's own year. They are not collecting a streak; they are watching a river change while they keep showing up. On day 365: "One year. The Ganga stood at 291.8 m on the morning you began. She stands at 293.1 m today. You have kept 340 mornings."

---

## 3. Why 270 seconds, defended

The wrong analogue is a meditation session. Headspace's ten minutes has notorious weekday drop-off, and twenty minutes at 6am on a Tuesday is a thing people do in January and abandon in February.

The right analogue is **the morning act before you leave the house**: a home aarti at the mandir shelf is three to six minutes. That is the slot this product is competing for, and it is a slot that already exists in tens of millions of households.

The floor is set by physiology and by attention: below about ninety seconds nothing in the body changes and the thing reads as a gimmick, a "tap here to be blessed" novelty that gets one screenshot and no second use. The ceiling is set by the weekday: past about six minutes it stops being something you do before tea and becomes something you schedule, and scheduled things get skipped.

270 seconds sits above the gimmick floor and below the scheduling ceiling, and it decomposes cleanly into five limbs that each do one job. It is also short enough that a user who is late can do it *anyway*, which is the property that actually builds a daily habit. Nothing here should ever be shortenable by the user, because a ritual you can set to "quick mode" is a preference, not a practice.

---

## 4. The seven devices that make it a snan and not a web form

1. **Nothing is a form field except one, once.** Name, gotra and vow are entered on first run and then never again.
2. **The instruction deletes itself.** "in"/"out" appears twice and then trusts you.
3. **A single sustained gesture that cannot be hurried.** Eleven seconds.
4. **The screen going away.** Ninety seconds of black is the product's spine, not its pause.
5. **Darkness as the default.** The night edition is forced regardless of the theme toggle, because it is 6am.
6. **A real clock.** The countdown is to an actual muhurat computed by the existing engine, not to a marketing timer.
7. **The river is genuinely different every day**, and the user can see the number and can go and check it.

Add one restraint: **there is no progress bar anywhere in the flow.** A progress bar is the single most form-like object in software. The waterline is the only indicator of time passing, and it is doing something else.

---

## 5. The data spine: what is true, what to build, what I could not verify

### Verified this session

- The Central Water Commission publishes **River Water Level (Telemetry, Hourly)** on the National Water Data Portal at `nwdp.nwic.gov.in/dataset/river-water-level-telemetry-hourly-central-water-commission-cwc`. Records carry date, station identifier with geographic hierarchy, and water level. Formats offered are **CSV and API**. The dataset page showed data current to **11 August 2026**, so it is live, not an archive.
- CWC runs the **Flood Forecast Dashboard** at `cwc.gov.in/ffm_dashboard` and `ffs.india-water.gov.in`, over a network of **325 forecast stations** plus 128 reservoirs, with basin models running **every three hours** and seven-day advance forecasts.
- CWC also publishes **Rainfall (Telemetry, Hourly)** as a separate dataset on the same portal.

### Could not verify, must be treated as unbuilt

- **Water temperature.** The brief assumes CWC publishes it. CWC telemetry is level, discharge and rainfall. Real-time water temperature on the Ganga sits with **CPCB's real-time water quality network** under Namami Gange, which I believe exists but **could not confirm this session (search budget exhausted)**. **Do not design the experience around temperature.** Level, flow, trend and rainfall are confirmed and are more than enough. Treat temperature as a later stretch and verify before any copy mentions it.
- **Licence and redistribution terms.** The dataset page states **no licence**. NWIC helpdesk is `helpdesk-nwic@gov.in`, CWC is `rdcdte-cwc@nic.in`. This must be settled in writing before launch. Design the fallback now: display-with-attribution-and-link only, no bulk redistribution, and a per-state flood-control feed as backup.
- **A documented public JSON API for the flood dashboard.** At least one published account says CWC does not offer program-accessible format. Assume you are writing an ingest against CSV and possibly a scraper, not against a clean REST API.

### The ingest, which is the entire backend

An hourly Vercel Cron pulls the six mapped stations and writes one row:

```
reading(station_code, ts_ist, level_m, flow_cumec, trend_cm_since_midnight, source_url)
```

Three hard rules, written in the same spirit as the existing `PanchangProvenance` invariant:

1. **Never interpolate.** Serve the last real reading with its true timestamp.
2. **Never fake freshness.** If the newest reading is three hours old, the screen prints "READ 01:38 IST, 3 h 12 min ago." A stale honest number is completely fine. A fabricated fresh one is fatal and would destroy the only asset the pivot has.
3. **Never print a station code that has not been confirmed.** Add to the ghat type:

```ts
readonly gauge:
  | { status: "pending-mapping" }
  | { status: "mapped"; stationCode: string; stationName: Bilingual;
      lowWaterDatum: number; warningLevel: number; dangerLevel: number };
```

This mirrors `coordinatesStatus: "pending-survey" | "surveyed"` exactly, so it will read as native to whoever maintains this file.

**Talakaveri is the special case and the existing rules already handle it.** It is a temple tank at a spring, not a gauged flowing ghat. It gets rainfall at the nearest station plus the Kaveri's flow measured downstream, and the reading prints that honestly: "RAINFALL AT BHAGAMANDALA · KAVERI FLOW MEASURED DOWNSTREAM." This preserves rivers.ts rule 3 without inventing anything.

### Audio

Three loops per water (river close, river wide, distant bells), crossfaded and mixed against the flow value, roughly 4 MB, cached on first run so the flow works on a plane and on a village 2G connection. One licensing purchase or one recording trip buys it permanently. **The audio is never live and no surface may imply it is.**

### The "servers are in the river" line, made defensible

Two sanctioned phrasings, both true:

> "We did not put the river in a computer. We put the computer downstream."

> "The gauge at Har Ki Pauri is our only source of truth."

**Total ops: one cron job, one payments webhook, one support inbox.**

---

## 6. The artefact: the Jal Patra

`SankalpPatra.tsx` survives almost untouched. It is a three-column ruled register with a masthead, a names block, a sankalp block and an attestation foot. Only the fields change, and the component already refuses to print a value it does not truthfully hold (`BlankCell`, the `confidence === "sourced"` gate). That architecture is exactly right for the new model.

**Renamed on the sheet:** the Devanagari title becomes **जल पत्र**, Latin subtitle **JAL PATRA**, and `patraContent.sheet.titleLatin` changes accordingly. `PatraData` is rewritten:

| # | Field | Change |
|---|---|---|
| 1 | `patraId` | Unchanged. 22-char base58. |
| 2 | `names` | Unchanged, including `remembrance`. |
| 3 | `gotra` | Unchanged. "Not stated" stays honest. |
| 4 | `sankalpText` | **Promoted to the centre of the sheet.** It is now the only human act on the document, so it gets the largest non-name type. |
| 5 | `water` | River, ghat, place, plus the **CWC station name and code**. |
| 6 | `reading` | **NEW, and the sheet's whole point.** `{ levelM, flowCumec, trendCm, readAtIst, source }`. Prints as "293.11 m · 1,240 cumec · read 04:38 IST · Central Water Commission." |
| 7 | `distanceKm` | **NEW.** Distance from where the sankalp was taken to the gauge. |
| 8 | `tithi` | Unchanged, still gated on `confidence === "sourced"`. |
| 9 | `hold` | **NEW.** "Sankalp held 11.0 s." |
| 10 | `stillness` | **NEW.** "Screen dark 90 s." |
| 11 | `issuedOn`, seal, `verifyUrl` | Unchanged. |
| DELETED | `ritvik`, `naamKshan`, `performedOn`, `performedIst`, `performedLocal` | Every one of these asserted a rite. All go. |

**The attestation line at the foot, replacing the old one.** This is the most important sentence on the entire site:

> No rite was performed for you. This sheet records a river, a minute, and the words you chose to say into it.

That is not a disclaimer. It is the thesis, and it should be set at the same weight as everything else on the sheet, not shrunk into fine print.

### `/verify` survives, transformed

The old proof chain does not disappear in the pivot. **It relocates from the officiant to the river.** We stopped claiming that we did something and started proving that the river did.

Enter a patra ID and `/verify` returns the water reading, the station, the timestamp, and a deep link to the CWC dataset for that station and that hour. **A stranger can independently confirm that the Ganga stood at 293.11 m at 04:38 IST on that date.** No competitor in devotional software has a single externally auditable fact on any document it issues. Snanify will have one on every sheet, forever, and it will be issued by the Government of India.

The user's own `sankalpText` is still never returned by `/verify`, exactly as the current spec has it.

---

## 7. The register: the Jal Panjika

The second artefact and the real retention object. One ruled line per morning, set as an almanac page, kept for life. Free tier shows the last 30 lines. Paid shows every year and prints.

At year end it renders as a single sheet: 365 lines, your vow at the head, the river's high and low water for the year marked in the spot colour, and your kept mornings counted at the foot. It is the thing people will photograph and post, and it advertises the product better than any ad, because it is unmistakably a record of a year of someone's mornings.

---

## 8. What brings them back tomorrow, and next year

**Tomorrow**, four structural reasons, none of which need content:

1. **The river is measurably different**, and the difference is printed as a number in the notification before they even open the app.
2. **Muhurat.** A real countdown to a real hour is the oldest scheduling technology in existence, and the engine already exists in `muhurat.ts`.
3. **The register.** An unbroken column of ruled lines is very hard to break. Crucially it is framed as a record, not a streak, so breaking it carries no shame, which is precisely why people break it less.
4. **The vow persists.** Coming back means re-reading your own words. Infinite loop, zero content cost.

**Next year: the Jal Varsh, जल वर्ष, the water year.**

On the tithi anniversary of the first sankalp, and on each remembrance tithi entered, the app opens differently. It shows the river as it stood on that morning last year beside the river as it stands now, and it reads back the vow in the user's own words from that day. Then the ordinary form runs.

Nothing else on the market can do this, because nobody else is holding a year of hourly river readings against a year of one person's attention. This is the moat, it accrues automatically, and it gets stronger every single day the cron runs.

---

## 9. Free and paid

### The pricing philosophy, in one line

> **Everything you do alone is free. You pay to bring someone with you.**

That is the answer to "when does paying feel right rather than extractive." Paying is not unlocking features. Paying is adding your mother to your morning.

### Free forever: "The morning"

The **complete** 4:30 flow, every day, uncrippled. One water, chosen at signup, changeable once a month. Every muhurat countdown. Your vow, saved forever. The register, last 30 lines. The Jal Patra, downloadable.

Free must be genuinely complete, because the free tier *is* the marketing and a crippled ritual never becomes a habit.

### Paid: **Snanify Nitya** (नित्य), $4/month or $36/year; ₹149/month or ₹1,299/year

- **All six waters**, switchable any morning. Your family's river as well as your own.
- **Named ones.** Up to twelve people in your sankalp, living and in remembrance. On the anniversary tithi of anyone entered in remembrance, the app opens on their name and the stillness lengthens by sixty seconds. **This is the most valuable feature in the product and it costs nothing to run.**
- **The full Jal Panjika**, all years, print-at-home.
- **Push at your muhurat**, with the river reading in the notification body.
- **Offline**: last reading and full audio cached.

Print-and-post of the Patra is **cut**. Near-zero ops is a hard requirement and postage is the one thing here that scales with humans.

### The moment of the ask

Never inside the flow. You do not interrupt a ritual to sell.

It is at **the end of the seventh morning**, at the Mark, immediately after the register line writes itself. One sentence, once:

> Seven mornings.
> Would you like to bring someone with you?

That lands at the exact moment the user has proved to *themselves* that they will come back, and it offers the one thing they actually want. Remembrance is what people pay for; it is why digital memorials work at all.

### The second revenue line: **Deep Daan**, ₹99 / $3, one-off

On the thirteen named occasions already built in `muhurat.ts`. You light one lamp on your own screen; it burns for the length of the muhurat window and goes into the Panjika as a red line. Not a subscription, not a rite, zero ops, and it converts non-subscribers on the thirteen biggest days of the year.

The old $251 household rite is **dead**. It went with the pivot and it was the ops-heavy item anyway.

### The arithmetic to $20,000/month profit

Assume infra, payment fees, panchang licence and tooling take 25% of revenue at scale, so the target is **$26,700/month revenue**.

Blended ARPU: 60% diaspora at $4 and 40% India at ₹149 (about $1.75) gives $3.10. Deep Daan adds roughly 15%, so call it **$3.56 per paying user per month**.

$26,700 ÷ $3.56 = **7,500 paying subscribers.**

At a 4% free-to-paid conversion that needs about 190,000 free monthly actives. At 8%, which is plausible because the upgrade is remembrance rather than features, it needs about 94,000. So the honest target is **roughly 100,000 to 200,000 free monthly actives and 7,500 payers.**

Against a commonly cited figure of about 32 million overseas Indians (widely quoted, not verified this session), 7,500 payers is **0.02%**. That is the argument for why $20k/month is a small number, and it is why the product should be cheap, self-serve and subscription-shaped rather than bespoke.

---

## 10. Design system compliance

Everything above is buildable inside the existing two-colour letterpress system with no new primitives:

- The waterline is a `border-top: 1px solid var(--rule-strong)`. No gradient, no glow, no blur.
- The vermillion ink-fill on the sankalp hold is a `clip-path` inset animation over `var(--spot)`. That is the misregistration idea from `misregister` used as motion.
- The Reading uses `ink-in` unchanged, with its `steps(6, end)` timing, which is exactly right for type arriving as an impression.
- The Mark uses tabular numerals and Devanagari numerals in the Hindi edition, both already implemented (`DEVA` in `Landing.tsx`).
- `prefers-reduced-motion`: the breath limb becomes a static waterline with the words "in" and "out" alternating on the same 4/6 timing, and the ink-fill becomes an instant state change at 11 s. The form does not shorten.
- Accessibility: the black stillness screen carries `aria-live` off and a visually hidden "Ninety seconds of stillness. The screen is dark on purpose." for screen readers.

---

## 11. What dies

- Every officiant, ritvik, roster, permit and ghat-permission surface across `trust.ts`, `rituals.ts` and `patra.ts`.
- The recording, the stream, the Naam Kshan timestamp, and the entire video proof chain.
- `performedOn` / `performedIst` / `performedLocal` and every sentence containing "performed on your behalf."
- The $51 shared session and the $251 household rite.
- `/ethics` in its current form. It becomes a much shorter and much stronger page whose whole content is the first-run honesty screen, the Patra attestation line, and the CWC source. Honesty stops being a defensive posture and becomes the specification.

`rivers.ts` and `muhurat.ts` survive **entirely intact**. They were written under rules that turn out to be exactly the right rules for the new model, and that is the reason this pivot can ship fast.


---

## Copy

FINISHED ON-SCREEN COPY, EN AND HI, PASTE-READY
Notes: Devanagari numerals in the Hindi edition throughout. No em dashes. Placeholders in {braces}.

════════════════════════════════════════
A. FIRST RUN, THE HONESTY SCREEN (shown once, before the first session ever)
════════════════════════════════════════

EN
  Before the first one.

  No priest does anything for you here. No rite is performed at any ghat in your
  name. There is no camera on the water.

  What is real: the river, its level and its flow this hour, measured by the
  Central Water Commission. The panchang. And your own words.

  That is the whole of it, and it is enough.

  [ Begin ]

HI
  पहली बार से पहले।

  यहाँ कोई पुरोहित आपके लिए कुछ नहीं करता। आपके नाम से किसी घाट पर कोई अनुष्ठान
  नहीं होता। जल पर कोई कैमरा नहीं है।

  जो सत्य है: नदी, इस घंटे उसका जलस्तर और प्रवाह, केंद्रीय जल आयोग द्वारा मापा
  हुआ। पंचांग। और आपके अपने शब्द।

  बस इतना ही है, और इतना पर्याप्त है।

  [ आरंभ करें ]

════════════════════════════════════════
B. FIRST RUN, THE THREE QUESTIONS (asked once, never again)
════════════════════════════════════════

EN
  1/3  What is your name?           [ name ]           [ in Devanagari, if you like ]
  2/3  Your gotra?                  [ gotra ]          Not every family uses one. Leave it.
  3/3  What do you carry?           [ your sankalp ]   Your own words. You will read them
                                                       back every morning.
  Which water?   Ganga, Har Ki Pauri   Triveni, Prayagraj   Yamuna, Mathura
                 Godavari, Nashik      Shipra, Ujjain       Kaveri, Talakaveri

  What time do you wake?   [ 04:45 ]   We will bring you the river then.

HI
  १/३  आपका नाम?                    [ नाम ]            [ देवनागरी में, यदि चाहें ]
  २/३  आपका गोत्र?                  [ गोत्र ]          हर परिवार गोत्र नहीं रखता। छोड़ दें।
  ३/३  आप क्या लेकर चलते हैं?        [ आपका संकल्प ]     अपने शब्दों में। इन्हें आप हर सुबह
                                                       दोहराएँगे।
  कौन-सा जल?   गंगा, हर की पौड़ी   त्रिवेणी, प्रयागराज   यमुना, मथुरा
               गोदावरी, नासिक     शिप्रा, उज्जैन       कावेरी, तालकावेरी

  आप कब उठते हैं?   [ ०४:४५ ]   हम उसी समय नदी आप तक लाएँगे।

════════════════════════════════════════
C. THE MORNING NOTIFICATION
════════════════════════════════════════

EN
  title: Ganga, Har Ki Pauri
  body:  {293.11} m, rising. {04:41} now.

  (variant, high water)  {295.02} m, above warning level. {04:41} now.
  (variant, stale read)  {293.11} m, read {3 h} ago. {04:41} now.

HI
  शीर्षक: गंगा, हर की पौड़ी
  विवरण: {२९३·११} मी, बढ़ती हुई। अभी {०४:४१}।

  (उच्च जल)   {२९५·०२} मी, चेतावनी स्तर से ऊपर। अभी {०४:४१}।
  (पुराना पाठ) {२९३·११} मी, {३ घंटे} पहले मापा गया। अभी {०४:४१}।

════════════════════════════════════════
D. LIMB 1, THE READING (जल-पाठ)  0:04 to 0:25
════════════════════════════════════════

EN  (one line every 4 s, all caps, letterpress)
  GANGA · HAR KI PAURI · HARIDWAR
  LEVEL {293.11} m · RISEN {4} cm SINCE MIDNIGHT
  FLOW {1,240} cumec
  READ {04:38} IST · CENTRAL WATER COMMISSION
  YOU ARE {6,714} km FROM THIS WATER

  (falling)      FALLEN {6} cm SINCE MIDNIGHT
  (unchanged)    UNCHANGED SINCE MIDNIGHT
  (stale)        READ {01:38} IST, {3 h 12 min} AGO
  (Talakaveri)   RAINFALL AT BHAGAMANDALA {12} mm · KAVERI FLOW MEASURED DOWNSTREAM
  (silent phone, first session only)   This is better with sound.

HI
  गंगा · हर की पौड़ी · हरिद्वार
  जलस्तर {२९३·११} मी · आधी रात से {४} सेमी ऊपर
  प्रवाह {१,२४०} क्यूमेक
  पाठ {०४:३८} भा.मा.स. · केंद्रीय जल आयोग
  आप इस जल से {६,७१४} किमी दूर हैं

  (घटता)        आधी रात से {६} सेमी नीचे
  (अपरिवर्तित)   आधी रात से अपरिवर्तित
  (पुराना)       पाठ {०१:३८} भा.मा.स., {३ घंटे १२ मिनट} पहले
  (तालकावेरी)    भागमंडल में वर्षा {१२} मिमी · कावेरी का प्रवाह नीचे की ओर मापा गया
  (मौन फ़ोन)     ध्वनि के साथ यह और अच्छा लगता है।

════════════════════════════════════════
E. LIMB 2, THE BREATH (श्वास)  0:25 to 1:25
════════════════════════════════════════

EN
  (once, at 0:25)   Breathe with the water.
  (cycles 1 and 2 only)   in     out
  (cycles 3 to 6)   nothing at all

HI
  (एक बार, ०:२५ पर)   जल के साथ साँस लें।
  (केवल चक्र १ और २)   भीतर     बाहर
  (चक्र ३ से ६)       कुछ नहीं

════════════════════════════════════════
F. LIMB 3, THE SANKALP (संकल्प)  1:25 to 2:25
════════════════════════════════════════

EN  heading
  Say who you are.

EN  the formula (pre-filled, read, not typed)
  Om Vishnu, Vishnu, Vishnu.
  Today, in the month of {Shravan}, in the {bright} fortnight, on {Ekadashi},
  I, {Ramesh Kumar}, of {Kashyapa} gotra, standing in {Leicester},
  turn toward the {Ganga at Har Ki Pauri},
  and take this sankalp:
  {your own words}

  (no gotra stated)   I, {Ramesh Kumar}, gotra not stated, standing in {Leicester},
  (unsourced tithi)   the tithi line is omitted entirely

EN  the hold
  (prompt)             Hold.
  (during, 11 s)       nothing
  (released early)     Again.
  (on completion)      Spoken.
  (edit affordance, small, corner)   Change these words

HI  शीर्षक
  कहिए, आप कौन हैं।

HI  संकल्प वाक्य (पहले से भरा हुआ, पढ़ने के लिए, लिखने के लिए नहीं)
  ॐ विष्णुर्विष्णुर्विष्णुः।
  अद्य {श्रावण} मास, {शुक्ल} पक्ष, {एकादशी} तिथि,
  मैं {रमेश कुमार}, {काश्यप} गोत्र, {लेस्टर} में स्थित,
  {हर की पौड़ी की गंगा} की ओर उन्मुख होकर,
  यह संकल्प लेता हूँ:
  {आपके अपने शब्द}

  (गोत्र अनुक्त)     मैं {रमेश कुमार}, गोत्र अनुक्त, {लेस्टर} में स्थित,
  (तिथि असंदर्भित)   तिथि की पंक्ति पूर्णतः हटा दी जाती है

HI  थामना
  (संकेत)            थामे रहिए।
  (११ से. तक)        कुछ नहीं
  (जल्दी छोड़ा)       फिर से।
  (पूर्ण होने पर)     उच्चारित।
  (छोटा, कोने में)    ये शब्द बदलें

════════════════════════════════════════
G. LIMB 4, THE STILLNESS (मौन)  2:25 to 3:55
════════════════════════════════════════

EN
  Put the phone down. Face down, if you like.
  The river runs for ninety seconds.

  (screen reader only)  Ninety seconds of stillness. The screen is dark on purpose.

HI
  फ़ोन नीचे रख दीजिए। चाहें तो उल्टा।
  नब्बे सेकंड नदी बहती रहेगी।

  (केवल स्क्रीन रीडर)  नब्बे सेकंड का मौन। स्क्रीन जानबूझकर अंधेरी है।

════════════════════════════════════════
H. LIMB 5, THE MARK (चिह्न)  3:55 to 4:30
════════════════════════════════════════

EN  the register line
  {11 Aug} · {Shravan Shu. Ekadashi} · {Ganga 293.11 m} · {04:38} · {stillness 90 s}

EN  the count
  {Forty-first} consecutive morning.
  The Ganga has risen {1.4} m since your first.

  (day 1)      Your first morning. The Ganga stands at {293.11} m today.
                Come back tomorrow and she will not.
  (broken)     {Fourth} morning this month. The Ganga has fallen {0.3} m since your last.
  (one year)   One year. The Ganga stood at {291.8} m on the morning you began.
                She stands at {293.1} m today. You have kept {340} mornings.

EN  the close
  Tomorrow, {04:41}.

HI  पंजिका पंक्ति
  {११ अग.} · {श्रावण शु. एकादशी} · {गंगा २९३·११ मी} · {०४:३८} · {मौन ९० से.}

HI  गणना
  {इकतालीसवीं} लगातार सुबह।
  आपकी पहली सुबह से गंगा {१·४} मी चढ़ चुकी हैं।

  (पहला दिन)   आपकी पहली सुबह। आज गंगा {२९३·११} मी पर हैं।
                कल लौटिए, तब वे यहाँ नहीं होंगी।
  (टूटा क्रम)   इस माह की {चौथी} सुबह। आपकी पिछली सुबह से गंगा {०·३} मी उतरी हैं।
  (एक वर्ष)     एक वर्ष। जिस सुबह आपने आरंभ किया, गंगा {२९१·८} मी पर थीं।
                आज वे {२९३·१} मी पर हैं। आपने {३४०} सुबहें निभाई हैं।

HI  समापन
  कल, {०४:४१}।

════════════════════════════════════════
I. THE ASK, AT THE END OF THE SEVENTH MORNING ONLY
════════════════════════════════════════

EN
  Seven mornings.
  Would you like to bring someone with you?

  [ Add a name ]     [ Not now ]

  (on the add-a-name sheet)
  Up to twelve names, living or in remembrance.
  A name entered in remembrance returns on its own tithi each year, and the
  stillness that morning is one minute longer.
  {$4} a month. {₹149} in India. Cancel in one tap.

HI
  सात सुबहें।
  क्या किसी को अपने साथ लाना चाहेंगे?

  [ नाम जोड़ें ]     [ अभी नहीं ]

  (नाम जोड़ने के पृष्ठ पर)
  बारह नाम तक, जीवित अथवा स्मरण में।
  स्मरण में जोड़ा गया नाम हर वर्ष अपनी तिथि पर लौटता है, और उस सुबह का मौन
  एक मिनट अधिक होता है।
  {$4} प्रति माह। भारत में {₹१४९}। एक स्पर्श में रद्द।

════════════════════════════════════════
J. THE JAL VARSH, THE ANNIVERSARY OPENING
════════════════════════════════════════

EN
  One year ago this tithi.
  The Ganga stood at {291.8} m that morning.  She stands at {293.11} m now.
  You said:
  {your words from that day}

  [ Say it again ]     [ Say something new ]

HI
  ठीक एक वर्ष पूर्व, इसी तिथि पर।
  उस सुबह गंगा {२९१·८} मी पर थीं।  अब वे {२९३·११} मी पर हैं।
  आपने कहा था:
  {उस दिन के आपके शब्द}

  [ फिर वही कहें ]     [ कुछ नया कहें ]

════════════════════════════════════════
K. REMEMBRANCE TITHI OPENING (paid)
════════════════════════════════════════

EN
  {Sushila Devi}.
  {Amavasya of Bhadrapada}, the tithi you entered.
  The stillness is one minute longer this morning.

HI
  {सुशीला देवी}।
  {भाद्रपद अमावस्या}, वह तिथि जो आपने दर्ज की थी।
  आज की सुबह मौन एक मिनट अधिक है।

════════════════════════════════════════
L. DEEP DAAN (one-off, on the thirteen named occasions)
════════════════════════════════════════

EN
  {Kartik Purnima}. The window opens {17:42} and closes {19:16} IST.
  Light one lamp. It burns until the window closes, and it stays in your register.
  {₹99} · {$3}
  [ Light it ]

  (while burning)  {1 h 04 min} of the window remain.
  (after)          The lamp is out. {Kartik Purnima} is in your register.

HI
  {कार्तिक पूर्णिमा}। मुहूर्त {१७:४२} पर खुलता है और {१९:१६} भा.मा.स. पर बंद होता है।
  एक दीप जलाइए। यह मुहूर्त बंद होने तक जलेगा, और आपकी पंजिका में रहेगा।
  {₹९९} · {$3}
  [ दीप जलाएँ ]

  (जलते हुए)   मुहूर्त का {१ घंटा ०४ मिनट} शेष।
  (बाद में)     दीप बुझ गया। {कार्तिक पूर्णिमा} आपकी पंजिका में है।

════════════════════════════════════════
M. THE JAL PATRA, SHEET LABELS AND THE ATTESTATION
════════════════════════════════════════

EN  labels
  JAL PATRA · THE WATER RECORD
  Folio · The names · Gotra · The sankalp · The water · The reading ·
  Distance · Tithi · The hold · The stillness · Issued · Verify at

EN  the reading cell
  {293.11} m · {1,240} cumec · read {04:38} IST
  Central Water Commission, telemetry, station {XXXX}

EN  the hold cell        Sankalp held {11.0} s
EN  the stillness cell   Screen dark {90} s
EN  distance cell        {6,714} km from this water

EN  attestation, at the foot, full weight
  No rite was performed for you. This sheet records a river, a minute, and the
  words you chose to say into it.

EN  footer line
  The water level printed above can be checked against the Central Water
  Commission's own record for this station and this hour.

HI  शीर्षक और लेबल
  जल पत्र · JAL PATRA
  क्रमांक · नाम · गोत्र · संकल्प · जल · पाठ ·
  दूरी · तिथि · धारण · मौन · निर्गत · सत्यापन

HI  पाठ कक्ष
  {२९३·११} मी · {१,२४०} क्यूमेक · पाठ {०४:३८} भा.मा.स.
  केंद्रीय जल आयोग, दूरमापी, स्टेशन {XXXX}

HI  धारण कक्ष    संकल्प {११·०} से. धारित
HI  मौन कक्ष     स्क्रीन {९०} से. अंधकार में
HI  दूरी कक्ष     इस जल से {६,७१४} किमी

HI  प्रमाणन, पाद पर, पूर्ण भार में
  आपके लिए कोई अनुष्ठान नहीं किया गया। यह पत्र एक नदी, एक क्षण, और वे शब्द अंकित
  करता है जो आपने उसमें कहे।

HI  पादपंक्ति
  ऊपर छपा जलस्तर इसी स्टेशन और इसी घंटे के लिए केंद्रीय जल आयोग के अपने अभिलेख
  से मिलाया जा सकता है।

════════════════════════════════════════
N. /VERIFY
════════════════════════════════════════

EN
  Verify a Jal Patra.
  This patra records a reading, not a rite. Enter its identifier and you will be
  shown the river, the station, the level and the minute it was read. The words
  of somebody's sankalp are never shown here.

  [ 22 characters ]     [ Look it up ]

  (result)
  {Ganga · Har Ki Pauri · station XXXX}
  {293.11} m · {1,240} cumec · read {04:38} IST, {11 August 2026}
  Source: Central Water Commission, River Water Level (Telemetry, Hourly).
  [ See this station's own record ]

HI
  जल पत्र का सत्यापन।
  यह पत्र एक पाठ अंकित करता है, अनुष्ठान नहीं। इसका क्रमांक दर्ज कीजिए और आपको
  नदी, स्टेशन, जलस्तर और पाठ का क्षण दिखाया जाएगा। किसी का संकल्प यहाँ कभी नहीं
  दिखाया जाता।

  [ २२ अक्षर ]     [ खोजें ]

  (परिणाम)
  {गंगा · हर की पौड़ी · स्टेशन XXXX}
  {२९३·११} मी · {१,२४०} क्यूमेक · पाठ {०४:३८} भा.मा.स., {११ अगस्त २०२६}
  स्रोत: केंद्रीय जल आयोग, नदी जलस्तर (दूरमापी, प्रति घंटा)।
  [ इस स्टेशन का अपना अभिलेख देखें ]

════════════════════════════════════════
O. LANDING PAGE, HERO AND PRICING
════════════════════════════════════════

EN
  badge:   GANGA · HAR KI PAURI · {293.11} m · READ {04:38} IST
  title:   The river is / awake.
  lede:    Four and a half minutes every morning with the Ganga as she actually
           stands this hour. No priest. No ghat. No performance. Your own sankalp,
           the real panchang, and a river measured by the Central Water Commission
           at the top of every hour. Free, forever.
  cta:     Take today's sankalp
  cta2:    What actually happens

  the line that leads the marketing:
           The best minute of Snanify is the minute your screen is off.

  the source line:
           We did not put the river in a computer. We put the computer downstream.

  pricing head:
           Everything you do alone is free. You pay to bring someone with you.
  free:    The morning. The whole four and a half minutes, every day, one water,
           your sankalp kept forever. Nothing withheld.
  paid:    Nitya. All six waters. Twelve names, living and in remembrance, each
           returning on its own tithi. Your full register, printable.
           {$4} a month, {$36} a year. {₹149} a month, {₹1,299} a year.

HI
  बैज:     गंगा · हर की पौड़ी · {२९३·११} मी · पाठ {०४:३८}
  शीर्षक:  नदी / जाग रही है।
  भूमिका:  हर सुबह साढ़े चार मिनट, गंगा के साथ, ठीक वैसे जैसे वे इस घंटे बह रही
           हैं। कोई पुरोहित नहीं। कोई घाट नहीं। कोई प्रदर्शन नहीं। आपका अपना
           संकल्प, वास्तविक पंचांग, और हर घंटे केंद्रीय जल आयोग द्वारा मापी गई
           नदी। निःशुल्क, सदा के लिए।
  मुख्य:   आज का संकल्प लें
  गौण:     वास्तव में क्या होता है

  विपणन की प्रमुख पंक्ति:
           स्नानिफ़ाई का सबसे अच्छा मिनट वह है जब आपकी स्क्रीन बंद रहती है।

  स्रोत पंक्ति:
           हमने नदी को कंप्यूटर में नहीं रखा। हमने कंप्यूटर को नदी के नीचे रखा।

  मूल्य शीर्षक:
           जो आप अकेले करते हैं वह निःशुल्क है। किसी को साथ लाने के लिए आप देते हैं।
  निःशुल्क: सुबह। पूरे साढ़े चार मिनट, प्रतिदिन, एक जल, और आपका संकल्प सदा सुरक्षित।
           कुछ भी रोका नहीं गया।
  सशुल्क:  नित्य। छहों जल। बारह नाम, जीवित और स्मरण में, हर एक अपनी तिथि पर लौटता
           हुआ। आपकी पूरी पंजिका, मुद्रण योग्य।
           {$4} प्रति माह, {$36} प्रति वर्ष। {₹१४९} प्रति माह, {₹१,२९९} प्रति वर्ष।


## Open questions

- LICENCE, BLOCKING. The nwdp.nwic.gov.in dataset page states no licence or terms of use at all. Redistribution rights for CWC telemetry must be settled in writing with NWIC (helpdesk-nwic@gov.in) or CWC (rdcdte-cwc@nic.in) before launch, because the entire product rests on displaying these numbers. Design the fallback now: display-with-attribution-and-deep-link only, no bulk redistribution, and state flood-control department feeds as backup.
- NO DOCUMENTED PUBLIC JSON API. CWC's flood dashboard has no published developer API and at least one account says it does not offer program-accessible format. Assume the ingest is CSV plus a scraper against nwdp.nwic.gov.in, and budget for it breaking. Decide the staleness policy before writing a line of it: my recommendation is to print the true age of the reading and never interpolate.
- WATER TEMPERATURE IS NOT VERIFIED. The brief assumes CWC publishes it. CWC telemetry is level, discharge and rainfall. Real-time water temperature sits with CPCB's water quality network under Namami Gange, which I could not confirm (search budget exhausted mid-task). Do not write copy that mentions temperature until someone confirms a live feed exists for at least three of the six waters.
- GAUGE STATION MAPPING FOR SIX GHATS. Each of the six waters needs its nearest CWC telemetry station identified by real name and code, plus its low-water datum, warning level and danger level, which are what the on-screen waterline is mapped against. None of these are known today. Ship the `gauge: {status: 'pending-mapping'}` type first and let the flow degrade honestly for unmapped waters rather than inventing a code.
- TALAKAVERI HAS NO GAUGE. It is a temple tank at a spring, not a flowing gauged ghat. My proposal is rainfall at Bhagamandala plus Kaveri flow measured downstream, printed as exactly that. Somebody needs to confirm a real rainfall station exists there and decide whether Talakaveri stays in the six or is replaced by Paschima Vahini, which is gauged and is already the page's own recommendation for rites that cannot be done at a source.
- IS 11 SECONDS THE RIGHT HOLD? It is the single most important number in the design and I chose it by feel: long enough to be uncomfortable, short enough that a wet thumb at 6am does not fail it. Test 8 s and 15 s against completion rate in week one. Do not let it fall below 8 s; below that it stops being a gesture and becomes a button.
- SHOULD THE 90 SECONDS OF BLACK BE SKIPPABLE? I say no, ever, not even by a settings toggle, because it is the entire differentiator. But it will produce a measurable drop-off in the first week and somebody will propose a 'quick mode.' Decide now, in writing, that there is no quick mode, before the first cohort chart makes it tempting.
- PANCHANG SOURCE IS STILL PLACEHOLDER. The sankalp formula prints masa, paksha and tithi. Under the existing invariant, an unsourced tithi means the line is omitted entirely, which makes the formula noticeably weaker. Contracting a real panchang provider is now on the critical path for the core experience, not just for the muhurat pages.
- AUDIO PROVENANCE. Three loops per water, six waters, plus one bell each. Field-recorded once, or licensed. Licensed river audio recorded somewhere other than that river is a quiet lie the product cannot afford given that its whole pitch is 'the only claims we make are true.' My recommendation: one trip, six waters, record everything, own it forever, and say on /how-it-works exactly where and when each recording was made.
- CONVERSION RATE ASSUMPTION. The $20k/month plan needs 7,500 payers, which needs roughly 100k to 200k free monthly actives at 4 to 8 percent conversion. The 8 percent figure assumes remembrance converts far better than features do. It is the assumption the whole business case turns on and it is testable within six weeks of launch by measuring day-7 add-a-name tap-through before payments even exist.
- INDIA PRICE VS DIASPORA PRICE. I set 149 rupees against 4 dollars, which is a 2.3x real-terms gap and normal for India. The plan carries the profit on the diaspora. Confirm somebody is comfortable with an India tier that is close to break-even and exists mostly for legitimacy and word of mouth.