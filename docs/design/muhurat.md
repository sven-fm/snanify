# Snanify — Muhurat Engine & Scheduling Model

> Facet: **Muhurat engine & scheduling model**  
> Adversarial review verdict: **needs-work**

## Summary

Snanify computes its own panchang in-house on Swiss Ephemeris (Lahiri ayanamsa) rather than depending on a third-party astrology API at runtime, because we need *instants* (to schedule streams, capacity and calendar invites 18 months out) rather than display strings, and because the reference almanac users actually trust — Drik Panchang — has no public API. Third-party APIs (ProKerala, DivineAPI, Vedika) are relegated to a nightly three-way verification harness: a muhurat that our engine and two independent sources do not agree on within tolerance is quarantined and never sold. The domain is modelled in four layers — Occasion (a recurring rule), Muhurat (a resolved window at one ghat on one panchang day, with provenance), Slot (a bookable ceremony station with capacity), Ritual (the rite that is actually performed) — so that "when is it auspicious" and "can we staff it" stay separable. Every time is stored as a UTC instant and rendered as a mandatory dual clock: ghat-primary in IST, with the user's local time and an explicit date-shift sentence beneath it, because the single largest UX failure mode here is a diaspora user showing up a day late. Rahu Kaal is a hard veto on slot generation, Kumbh/Shahi Snan dates are admin-entered with a cited source and never asserted by the engine, and the anti-manipulation rules (no grief copy, no fake scarcity, no countdown on payment) are written into the spec as product requirements, not guidelines.

## Decisions

**Compute the panchang in-house with Swiss Ephemeris (npm `sweph`, native binding), not a third-party panchang API.**

*Why:* We need UTC instants for tithi/nakshatra boundaries and window edges 18 months ahead, in bulk, for six locations — to generate slots, price capacity, schedule streams, build ICS files and time reminder emails. Panchang APIs return formatted display strings for one date at a time, are credit-metered (ProKerala: 100 credits for an Advanced Panchang call — 6 ghats × 550 days = 3,300 calls per full recompute), rate-limited, and if they go down we cannot sell. Drik Panchang, the almanac Indian users actually trust, publishes no developer API at all, so 'just use Drik' is not an available option.

**Buy the Swiss Ephemeris Professional License from Astrodienst (CHF 750 first license; CHF 1550 unlimited) before shipping.**

*Why:* `sweph` ≥2.10.1 is AGPL-3.0. Snanify is a network service, so the AGPL network clause would compel us to publish our entire booking stack. The professional license relicenses our use under LGPL-3.0, is a one-time fee valid 99 years, and is cheaper than one week of engineering spent architecting an AGPL isolation boundary. Buy it in week one; do not write a line of swisseph code before the contract is signed.

**Lahiri (Chitrapaksha) ayanamsa, `SE_SIDM_LAHIRI`, pinned as a versioned constant.**

*Why:* It is the Government of India Calendar Reform Committee standard and the default of every almanac our users cross-check us against. Any other choice moves every nakshatra boundary by minutes and every festival date occasionally by a full day. It is stamped into every stored record, because changing it later is a data migration, not a config change.

**Run astronomy-engine (MIT, pure TS, ±1 arcminute) as a second, independent implementation in CI — not in production.**

*Why:* ±1 arcminute of lunar longitude is ~2 minutes of tithi time, which is well inside our 2-minute agreement tolerance and plenty to catch a real bug (wrong ayanamsa, wrong ΔT, wrong sunrise definition, an off-by-one in the tithi index). It has no native build and no license encumbrance, so it can run in CI on every commit. Two independent codebases agreeing is the cheapest correctness evidence available.

**Third-party APIs (ProKerala Advanced Panchang + one of DivineAPI/Vedika) are used only as a nightly verification oracle, never on the request path.**

*Why:* Their value is as an independent witness, not as a dependency. A Muhurat record cannot reach `verified` status — and therefore cannot be sold — unless at least two external sources agree with our computation within tolerance. This is the concrete mechanism that enforces 'do not invent dates': unverified muhurats simply do not exist in the UI.

**Compute masa in BOTH Amanta and Purnimanta and store both; display the scheme matching the ghat's region. Explicitly scope out Tamil, Bengali, Malayalam and Oriya solar calendars for v1.**

*Why:* The two lunar schemes differ only in month *naming*, not in the tithi arithmetic, so supporting both is a labelling concern and costs almost nothing. The regional solar calendars are a genuinely different calendrical system and pretending to support them badly is worse than saying we don't. Haridwar/Prayagraj/Mathura/Ujjain render Purnimanta; Nashik/Kodagu render Amanta.

**v1 scheduling logic reads tithi, paksha, masa, vara and sunrise/sunset. Nakshatra gates exactly four occasion rules. Yoga and karana are computed and displayed but never gate a slot.**

*Why:* Tithi defines every parva snan we sell. Vara positions Rahu Kaal. Nakshatra matters for Ganga Dussehra (Hasta), Kartik Purnima (Krittika) and two others. Yoga and karana are almanac furniture for a snan — showing them is authentic, letting them block bookings would be arbitrary complexity with no doctrinal backing our priest council would defend.

**Rahu Kaal is a hard veto: no slot may overlap it. Configurable per ghat as `veto | warn`, defaulting to `veto`.**

*Why:* 'We never sell an inauspicious hour' is a defensible, statable product stance, and it is the kind of restraint the brand is built on. The flag exists because some traditions hold Rahu Kaal binds new ventures rather than nitya karma such as snan — that is a call for the priest council, not for engineering, so the code exposes the lever and the default is the conservative one.

**Occasion→day resolution is explicit per occasion (`udaya | madhyahna | aparahna | pradosha | nishita`), never a single global rule.**

*Why:* A tithi routinely spans two sunrises or dies between them. Most parvas use udaya-vyapini (the tithi running at sunrise). But Sarva Pitru Amavasya is decided at aparahna, Mahashivratri at nishita kaal, and Ekadashi carries the dashami-viddha rule. Hardcoding one rule produces dates that are wrong on exactly the days that matter most commercially.

**Kumbh, Ardh Kumbh and all Shahi/Amrit Snan dates are admin-entered records with a mandatory citation URL and a named human approver. The engine refuses to derive them.**

*Why:* Shahi Snan dates are fixed by akhara councils and district administration, not by a closed-form Jupiter-Sun-Moon formula. Any engine that outputs them is guessing. `OccasionRule.kind: 'manual'` makes the guess structurally impossible.

**Mandatory dual clock: ghat time in IST is primary, user-local is secondary, and a date-shift sentence is rendered whenever the local calendar date differs from the ghat's.**

*Why:* The rite happens at a real place at a real hour; the ghat clock is the truth and demoting it to a parenthetical is dishonest. But a Toronto user reading '4:24 am IST, Tue 24 Nov' and setting a Tuesday alarm has missed it by eleven hours. Both clocks, always, plus an explicit sentence — never a bare converted time and never a bare IST time.

**Store UTC instants + IANA zone ids only. Never store wall-clock time. Never store `+05:30`. Use `Temporal` (native, `@js-temporal/polyfill` fallback) for arithmetic and `Intl.DateTimeFormat` for rendering.**

*Why:* Every timezone bug in a booking system traces to a stored local time. `Asia/Kolkata` rather than a fixed offset costs nothing today and survives India's periodically-revived two-timezone proposal. Temporal's ZonedDateTime is the only JS API that makes 'add one panchang day' expressible without hand-rolled DST arithmetic.

**The Hindu day runs sunrise→sunrise, so `panchangDate` is a separate stored field from the IST Gregorian date.**

*Why:* A Brahma Muhurat at 04:24 IST falls before sunrise and therefore belongs to the *previous* panchang day. Conflating the two silently mislabels every pre-dawn muhurat — which is our flagship product — with the wrong tithi and the wrong festival name.

**Capacity is derived, never hand-entered: `seats = floor(windowMinutes / (ceremonyMin + bufferMin)) × stations × sankalpsPerCeremony`. Stations: Haridwar 3, Prayagraj 2, the other four 1.**

*Why:* Hand-entered capacity drifts from operational reality and causes oversell at exactly the wrong moment. Deriving it means a change to ceremony length or an extra purohit automatically reprices the whole calendar. It also yields a true fact worth stating publicly: one Brahma Muhurat across all six ghats seats 108 sankalps.

**Tier cost in seats: Ekal 1, Parivar 3, Varsh 1 per redemption. Seats measure recitation time, not headcount.**

*Why:* A seat is a unit of the purohit's voice. Charging Parivar six seats for six names would make it economically absurd at $31; charging one would let it silently blow the ceremony's timebox. Three is the honest cost of one gotra, up to six names and a pitru sankalp.

**Booking closes at T−6h IST. Regular days open 90 days ahead, major parvas 180 days ahead, calendar computed 18 months ahead.**

*Why:* Six hours is what it takes to freeze the sankalp roll, transliterate names into Devanagari, have them checked by a human, and brief the purohit. For a 04:24 muhurat that is a 22:24 IST cutoff the previous evening — late enough to be generous, early enough that nobody is transliterating names at 3am.

**Slot capacity is enforced by a Postgres CHECK constraint plus row-level lock, with 10-minute TTL holds created at checkout start.**

*Why:* Kartik Purnima at Har Ki Pauri will sell out in minutes. Application-level capacity checks race; a database constraint cannot. Holds prevent the checkout-abandonment leak from either overselling or phantom-blocking inventory.

**Scarcity is shown only when real and only below 25% remaining. No countdown timers on payment pages, no 'N people viewing', no grief, guilt or divine-consequence copy anywhere — enforced as a lint rule over the content file.**

*Why:* This serves real religious practice. The standard conversion-optimisation toolkit is manipulation applied to grief, and using it here would be both wrong and brand suicide. Making it a lint rule rather than a guideline means it survives the first growth hire.

---

> **Status of this document.** Everything marked `PLACEHOLDER` is unverified and must be confirmed by a human before it ships. No date in this document is asserted as a real panchang date; all worked examples are arithmetic illustrations and are labelled as such. Ghat coordinates and elevations are approximate and marked for survey verification.

---

# Part 1 — The domain model

## 1.1 The five angas (limbs) of the panchang

"Panchang" = *pañca* (five) + *aṅga* (limb). Five quantities define a Hindu day. Two of them (tithi, nakshatra) are the ones that actually decide when a snan happens.

| Anga | What it is | How it's computed | Matters for scheduling a snan? |
|---|---|---|---|
| **Tithi** | Lunar day. The Moon gaining 12° of ecliptic longitude on the Sun. 30 per lunation, ~19–26 h each. Numbered 1–15 in each paksha. | `floor(((moonLon − sunLon) mod 360) / 12) + 1` | **Primary.** Every parva snan we sell is tithi-defined: Purnima (15), Amavasya (30), Ekadashi (11), Chaturdashi (14). |
| **Nakshatra** | Lunar mansion. 27 divisions of 13°20′ of the sidereal zodiac, indexed by the Moon's sidereal longitude. | `floor(siderealMoonLon / (360/27)) + 1` | **Secondary, gates 4 occasions.** Ganga Dussehra wants Hasta (13). Kartik Purnima wants Krittika (3). Also the input to future per-user personalisation (janma nakshatra). |
| **Yoga** | 27 divisions of the *sum* of Sun and Moon sidereal longitudes, in 13°20′ steps. | `floor(((sunLon + moonLon) mod 360) / (360/27)) + 1` | **Display only in v1.** Vyatipata (17) and Vaidhriti (27) are classically inauspicious; we surface them as a note, never as a block. |
| **Karana** | Half-tithi. 11 karana types cycling across 60 half-tithis per lunation. | `floor(((moonLon − sunLon) mod 360) / 6)` → karana table lookup | **Display only.** Vishti/Bhadra karana is avoided for new undertakings; a snan is not a new undertaking. Show it, never block on it. |
| **Vara** | Solar weekday, sunrise-to-sunrise (not midnight-to-midnight). | Weekday of the sunrise that opens the panchang day | **Required.** Positions Rahu Kaal (see §3.4) and identifies Somvati Amavasya (Amavasya falling on a Monday), a significant snan occasion. |

## 1.2 The three calendrical wrappers (not angas, but required)

| Concept | What it is | Matters? |
|---|---|---|
| **Paksha** | Fortnight. **Shukla** (waxing, tithi 1–15, ends at Purnima) and **Krishna** (waning, tithi 16–30, ends at Amavasya). | **Required.** Tithi 1–15 is ambiguous without it. Pitru Paksha is by definition a Krishna paksha. |
| **Masa** | Lunar month. Twelve names: Chaitra, Vaishakha, Jyeshtha, Ashadha, Shravana, Bhadrapada, Ashwin, Kartika, Margashirsha, Pausha, Magha, Phalguna. Plus intercalary **Adhika masa** (~every 32.5 months) and rare **Kshaya masa**. | **Required for naming.** "Purnima" is a monthly event; "Kartik Purnima" is the one people fly home for. The masa is what makes an occasion sellable. |
| **Vikram Samvat / Shaka year** | Era years. VS ≈ Gregorian + 57; Shaka ≈ Gregorian − 78. | **Display only**, on the Sankalp Patra, where it is expected. |

## 1.3 Amanta vs Purnimanta — the regional split

Two conventions for where a lunar month *begins*:

- **Amanta** (month ends at Amavasya) — Maharashtra, Gujarat, Karnataka, Andhra, Telangana, Tamil Nadu.
- **Purnimanta** (month ends at Purnima) — Uttar Pradesh, Uttarakhand, Bihar, Madhya Pradesh, Rajasthan, Punjab.

**The tithi arithmetic is identical in both.** Only the month *label* differs, and only for Krishna paksha, where Purnimanta runs one month ahead. Worked example: the Krishna Chaturdashi of Mahashivratri is **Magha Krishna Chaturdashi** in Amanta and **Phalguna Krishna Chaturdashi** in Purnimanta — the same instant, two names.

**Decision.** Compute and store both. Render the one matching the ghat's region:

| Ghat | Region | Scheme rendered |
|---|---|---|
| Har Ki Pauri, Haridwar | Uttarakhand | Purnimanta |
| Triveni Sangam, Prayagraj | Uttar Pradesh | Purnimanta |
| Vishram Ghat, Mathura | Uttar Pradesh | Purnimanta |
| Ram Ghat, Ujjain | Madhya Pradesh | Purnimanta |
| Ram Kund, Nashik | Maharashtra | Amanta |
| Talakaveri, Kodagu | Karnataka | Amanta |

**Explicitly out of scope for v1:** Tamil, Bengali, Malayalam (Kollam) and Oriya solar calendars. These are a different calendrical system (solar months keyed to sidereal ingress, with their own new-year and their own festival set), not a naming variant. Supporting them badly is worse than not supporting them. The UI carries an honest line: *"Snanify follows the Amanta / Purnimanta lunar reckoning. Tamil, Bengali and Malayalam solar calendars are not yet supported."*

**Also out of scope for v1:** the Vaishnava Ekadashi variant. Smarta and Vaishnava traditions observe Ekadashi on different days when the tithi is *viddha* (contaminated by Dashami at sunrise). v1 computes and labels **Smarta Ekadashi**. The label says so.

## 1.4 The Hindu day boundary — the bug that will bite you

**The Hindu day runs sunrise → next sunrise, not midnight → midnight.**

A Brahma Muhurat at 04:24 IST is *before* sunrise. It therefore belongs to the panchang day that began at the **previous** morning's sunrise. If you key it to the Gregorian IST date you will label our flagship product with the wrong tithi and the wrong festival name.

Therefore `Muhurat` stores `panchangDate` (the civil date of the *opening sunrise* of the Hindu day) separately from `ghatCivilDate` (the civil date in `Asia/Kolkata` at which the window starts). For Brahma Muhurat these differ by one day. This is not an edge case; it is the common case for our highest-value slots.

## 1.5 Tithi is global; the panchang day is local

Tithi, nakshatra, yoga and karana are functions of geocentric Sun/Moon longitude only — **they do not depend on observer location.** What depends on location is *which sunrise* a given tithi is running at, and therefore which panchang day the occasion falls on.

Consequence: within India the six ghats will almost always agree, but not always — Talakaveri (west coast, southern latitude) and Haridwar (northern) can differ by a day on a borderline tithi. The engine must compute per-ghat and never assume "one date for India."

---

# Part 2 — Occasions

## 2.1 The recurring occasions we sell

| Occasion | Rule | Resolution | Frequency | Commercial weight |
|---|---|---|---|---|
| **Purnima** | Tithi 15 (Shukla) | udaya | ~12/yr | Baseline monthly parva |
| **Amavasya** | Tithi 30 | udaya | ~12/yr | Pitru tarpana |
| **Somvati Amavasya** | Tithi 30 **and** vara = Monday | udaya | 1–3/yr | **High.** Rare, well known |
| **Ekadashi** | Tithi 11, both pakshas | udaya + dashami-viddha | ~24–26/yr | Steady; the Varsh tier's spine |
| **Sankranti** | Sun's sidereal ingress into a rashi | instant-based | 12/yr | Moderate |
| **Makar Sankranti** | Sun ingress → Makara (Capricorn) | instant-based | 1/yr, mid-Jan | **Very high.** Mass snan day |
| **Pitru Paksha** | Bhadrapada Krishna (Purnimanta) / Ashwin Krishna (Amanta), tithi 16→30 | udaya, day by day | 16 days/yr | **Highest for Parivar tier** |
| **Sarva Pitru Amavasya** | Final day of Pitru Paksha, tithi 30 | **aparahna** | 1/yr | Peak of the season |
| **Ganga Dussehra** | Jyeshtha Shukla Dashami (tithi 10); classical Dashahara yoga also wants Hasta nakshatra | udaya | 1/yr, May–Jun | **High at Haridwar/Prayagraj** |
| **Kartik Purnima** | Kartika Shukla Purnima; Krittika nakshatra strengthens it | udaya | 1/yr, Nov | **Very high.** Dev Deepawali |
| **Mahashivratri** | Krishna Chaturdashi of Phalguna (Purnimanta) / Magha (Amanta) | **nishita** | 1/yr, Feb–Mar | **Very high at Ujjain** |
| **Kartik Snan** | Entire Kartika masa | month-long | 30 days/yr | Daily-snan season |
| **Magh Snan / Kalpvas** | Entire Magha masa, Prayagraj | month-long | 30 days/yr | **Prayagraj-specific season** |
| **Kumbh / Ardh Kumbh / Magh Mela** | **NOT COMPUTED** | manual | irregular | Largest possible |

## 2.2 Resolution rules — read this before writing the resolver

A tithi that spans two sunrises, or begins and ends between two sunrises (kshaya tithi), must be assigned to exactly one panchang day. There is no single correct rule; each occasion has its own.

| Resolution | Reference instant | Used by |
|---|---|---|
| `udaya` | Sunrise | Default. Purnima, Amavasya, Ekadashi, Ganga Dussehra, Kartik Purnima |
| `madhyahna` | Midpoint of sunrise→sunset | Some Krishna-paksha vratas (not v1) |
| `aparahna` | 4th of 5 equal day-parts (0.6→0.8 of the day) | **Sarva Pitru Amavasya**, all shraddha rites |
| `pradosha` | Sunset → sunset + 2 muhurtas (96 min) | Pradosh vrat (not v1) |
| `nishita` | The 8th of 15 night-muhurtas (true midnight ± ~24 min) | **Mahashivratri** |

If the occasion's tithi is not running at the resolution instant on any day of a lunation, fall back to the day on which that tithi is running for the longest duration, and set `MuhuratRecord.resolutionNote` so the fact is visible to the verifier and, if material, to the user.

## 2.3 Kumbh: the engine must refuse to guess

Kumbh site and year are governed by Jupiter/Sun/Moon rashi combinations, but **the Shahi Snan / Amrit Snan dates themselves are fixed by the akhara councils and the district administration** — a human, political process, announced typically 6–12 months ahead. No formula outputs them.

**Rule.** `OccasionRule.kind: "manual"`. A Kumbh occasion instance requires:
- `sourceUrl` — a citation to the official announcement
- `approvedBy` — a named human on staff
- `approvedAt` — timestamp

Without all three, the record cannot leave `draft` and cannot generate slots. Marketing copy may not name a Kumbh date until the record is `manual`-approved.

---

# Part 3 — Daily windows

All formulas below use **true local sunrise/sunset at the ghat's coordinates**, defined as the moment the Sun's **upper limb** crosses the horizon with standard refraction — geometric altitude **−0°50′** (34′ refraction + 16′ semidiameter) — plus a horizon-dip correction for elevation:

```
dip(arcminutes) ≈ 1.76 × sqrt(elevation_metres)
```

This matters. Talakaveri sits at roughly 1,276 m `PLACEHOLDER — verify elevation` in the Western Ghats; the dip correction moves sunrise by several minutes there and is not optional if we print sunrise on the Sankalp Patra.

We do **not** apply terrain-horizon correction (actual ridgeline occlusion). We state this in the methodology page.

## 3.1 Brahma Muhurat — the flagship

The 14th muhurta of the night: **two muhurtas (96 min) before sunrise, ending one muhurta (48 min) before sunrise.**

```
brahmaStart = sunrise − 96 min
brahmaEnd   = sunrise − 48 min
```

48 minutes long. Belongs to the **previous** panchang day (§1.4). This is the window the Varsh tier gets priority on.

## 3.2 Abhijit Muhurat

The 8th of 15 equal day-muhurtas, centred on **local apparent noon** (solar transit, not clock noon):

```
dayLength = sunset − sunrise
muhurta   = dayLength / 15
abhijitStart = solarNoon − muhurta/2
abhijitEnd   = solarNoon + muhurta/2
```

~48 min, ~24 min either side of transit. **Classically not observed on Wednesday.** Set `MuhuratWindow.advisory = "abhijit-wednesday"` and suppress the slot rather than sell a window the tradition itself declines.

## 3.3 Godhuli Muhurat

Cow-dust hour — the sunset window.

```
godhuliStart = sunset − 24 min
godhuliEnd   = sunset + 24 min
```

Commercially valuable: it is the only window that is a civilised evening hour for North America (sunset ~18:00 IST = ~07:30 EST, ~04:30 PST).

## 3.4 Rahu Kaal — hard veto

Divide sunrise→sunset into 8 equal parts. The inauspicious octant is indexed by weekday:

```ts
// 1-based octant of the day (sunrise→sunset divided into 8)
export const RAHU_KAAL_OCTANT: Record<VaraIndex, 1|2|3|4|5|6|7|8> = {
  0: 8, // Sunday
  1: 2, // Monday
  2: 7, // Tuesday
  3: 5, // Wednesday
  4: 6, // Thursday
  5: 4, // Friday
  6: 3, // Saturday
};
```

Sanity check against the classical mnemonic for a 06:00–18:00 day: Mon 07:30–09:00, Sat 09:00–10:30, Fri 10:30–12:00, Wed 12:00–13:30, Thu 13:30–15:00, Tue 15:00–16:30, Sun 16:30–18:00. ✓

**Policy: no slot may overlap Rahu Kaal.** `GhatConfig.rahuKaalPolicy: "veto" | "warn"`, default `"veto"`. Also computed and displayed but **never** blocking: **Yamaganda**, **Gulika Kaal**, **Dur Muhurtam**, **Varjyam**.

Public copy: *"No snan is offered during Rahu Kaal."* This is a statable stance and a differentiator.

---

# Part 4 — Sourcing the data

## 4.1 Options compared

| Option | What it gives | Licence / cost | Verdict |
|---|---|---|---|
| **Swiss Ephemeris** (`sweph` npm, native binding to Astrodienst's C library) | JPL-derived planetary positions, all sidereal ayanamsas incl. Lahiri, rise/set with custom horizon, ΔT handling. Sub-arcsecond. | AGPL-3.0 free, **or** Professional Licence: **CHF 750** first / **CHF 1550** unlimited, one-time, 99 years, permits closed source. | ✅ **CHOSEN.** Buy the professional licence. |
| **astronomy-engine** (`astronomy-engine` npm) | Sun/Moon/planet positions to **±1 arcminute**, VSOP87 + NOVAS C 3.1 derived. Pure TypeScript, no native build. | **MIT** | ✅ **Second implementation in CI.** ±1′ of lunar longitude ≈ 2 min of tithi — inside tolerance, ample to catch a real bug. |
| **ProKerala Astrology API** | Formatted daily panchang, auspicious/inauspicious periods, choghadiya. | Credit-metered. **Advanced Panchang (English) = 100 credits/call**; Basic = 10. `PLACEHOLDER — confirm credit→currency rate and rate limits with sales.` | ✅ **Verification oracle only.** ❌ Not a runtime dependency. |
| **DivineAPI / Vedika API / Panchang.Click** | Similar REST panchang. Vedika lists wallet plans from ~$12/mo. `PLACEHOLDER — verify pricing and terms.` | Commercial | ✅ Second verification oracle. Pick **one**. |
| **Drik Panchang** | The de-facto reference almanac for Indian users. | **No public developer API.** DrikPanchang® is a trademark of Adarsh Mobile Applications LLP. | ⚠️ Use as the **human** spot-check reference. Do **not** scrape — see Open Questions. |
| **`mhah-panchang` npm** | JS tithi/nakshatra/karana/yoga/masa. | Open source | ❌ No published accuracy validation. Fine for a prototype, not for a product where a wrong date is a broken religious commitment. |

## 4.2 Why not just call a panchang API at request time

1. **We need instants, not strings.** Slot generation, stream scheduling, ICS files, reminder emails and capacity all require UTC timestamps. APIs return `"05:23 AM"` in a locale.
2. **We need bulk.** 6 ghats × 550 days × ~4 windows = ~13,200 window computations per full recompute. At 100 credits per Advanced Panchang call this is an ongoing tax on a nightly job.
3. **Availability is revenue.** If the vendor is down, we cannot render a calendar or take a booking.
4. **The trusted source has no API anyway.** Users cross-check against Drik Panchang. Since we cannot call it, we must be independently correct and *demonstrate* it — which is exactly what the verification harness does.

## 4.3 The verification harness — the mechanism that enforces honesty

Nightly job at **20:00 UTC (01:30 IST)**, rolling 18-month horizon:

1. **Compute** with `sweph` @ Lahiri → `draft` records.
2. **Diff** against the previous run. Any change to an already-`verified` record raises a P1 alert; it means either an ephemeris upgrade or a bug.
3. **Verify** against ≥2 external sources (ProKerala + one other) for every occasion day in the next 120 days.
4. **Promote or quarantine:**

| Check | Tolerance |
|---|---|
| Tithi start/end instant | ≤ **120 s** |
| Nakshatra start/end instant | ≤ **120 s** |
| Sunrise / sunset | ≤ **60 s** |
| Window start/end (Brahma, Abhijit, Godhuli, Rahu Kaal) | ≤ **60 s** |
| Occasion → panchang-day assignment | **exact — zero tolerance** |

Any breach → `status: "quarantined"`. **Quarantined muhurats generate no slots and are invisible in the UI.** They are not shown with a warning; they do not exist. A human resolves them.

5. **Human spot-check.** Weekly, a named person compares 10 sampled days against Drik Panchang by eye and signs off. The signature is stored.

Only `verified` and `manual` records are sellable. This is what makes "we do not invent dates" a property of the system rather than a promise.

---

# Part 5 — Timezone presentation

## 5.1 Rules

1. **Store instants only.** UTC ISO-8601 with `Z`. Never a wall-clock string, never `+05:30`.
2. **`Asia/Kolkata`**, never a fixed offset.
3. **The ghat clock is primary.** The rite happens at a real place at a real hour.
4. **Both clocks, always.** Never a bare IST time. Never a bare converted time.
5. **Name the date shift explicitly** in prose whenever the user's local calendar date ≠ the ghat's.
6. **Detect the zone, let them change it.** `Intl.DateTimeFormat().resolvedOptions().timeZone`, stored on the account, with a picker in the header. Never guess from IP alone.
7. **12-hour clock in EN, and in HI use prahar words** (प्रातः / दोपहर / सायं / रात्रि) — Hindi speakers do not read "16:24" naturally.
8. **ICS files use UTC `DTSTART`** with a `VTIMEZONE` block. Reminders at T−24h and T−1h are computed from the instant.

## 5.2 The dual clock component

```
┌──────────────────────────────────────────────┐
│  BRAHMA MUHURAT            (inscription)     │
│                                              │
│  Tue 24 Nov · 4:24 am      (display, 2xl)    │
│  Har Ki Pauri, Haridwar    (ink2, xs)        │
│  ──────────────────────────                  │
│  Where you are (Toronto)   (inscription, xs) │
│  Mon 23 Nov · 5:54 pm      (ink, sm)         │
│  ↳ the evening before      (gold, xs)        │
│  ──────────────────────────                  │
│  ◈ opens in 6h 12m         (gold, xs)        │
└──────────────────────────────────────────────┘
```

**Worked arithmetic (illustration only — this is not asserted as a real Kartik Purnima):**

```
Ghat window start  04:24 IST, 24 Nov
                 = 22:54 UTC, 23 Nov
Toronto (EST, UTC−5)   → 17:54, Mon 23 Nov   ← previous day
Auckland (NZDT, UTC+13) → 11:54, Tue 24 Nov   ← same day
London (GMT, UTC+0)     → 22:54, Mon 23 Nov   ← previous day
Dubai (UTC+4)           → 02:54, Tue 24 Nov   ← same day
```

Toronto and London see the previous evening. This is the failure mode the design exists to prevent.

## 5.3 Copy — bilingual

| Key | EN | HI |
|---|---|---|
| `atTheGhat` | At the ghat | घाट पर |
| `whereYouAre` | Where you are | आपके यहाँ |
| `shiftPrevDay` | This is the evening before, where you are. | आपके यहाँ यह एक दिन पहले की शाम होगी। |
| `shiftPrevDayEarly` | This is the previous day, where you are. | आपके यहाँ यह पिछला दिन होगा। |
| `shiftNextDay` | This is the next morning, where you are. | आपके यहाँ यह अगली सुबह होगी। |
| `sameDay` | The same day, where you are. | आपके यहाँ भी यही दिन। |
| `opensIn` | Opens in {d} | {d} में आरंभ |
| `liveNow` | Live now | अभी सजीव |
| `windowLength` | A {n}-minute window | {n} मिनट की अवधि |
| `changeZone` | Not your timezone? Change it. | यह आपका समयक्षेत्र नहीं? बदलें। |
| `rahuKaalNote` | No snan is offered during Rahu Kaal. | राहु काल में कोई स्नान नहीं कराया जाता। |
| `provenance` | Timings computed from the Lahiri panchang for {ghat} ({lat}, {lon}) and checked against two independent almanacs. | समय लाहिड़ी पंचांग के अनुसार {ghat} ({lat}, {lon}) हेतु गणना कर, दो स्वतंत्र पंचांगों से मिलान किया गया। |
| `sunriseAt` | Sunrise at the ghat: {t} IST | घाट पर सूर्योदय: {t} IST |
| `panchangDay` | Panchang day: {tithi}, {paksha} {masa} | पंचांग दिवस: {tithi}, {paksha} {masa} |
| `masaSchemeNote` | Month named by the {scheme} reckoning, as followed at this ghat. | मास का नाम {scheme} गणना के अनुसार, जैसा इस घाट पर माना जाता है। |
| `notSupportedCalendars` | Snanify follows the Amanta and Purnimanta lunar reckonings. Tamil, Bengali and Malayalam solar calendars are not yet supported. | स्नानिफ़ाई अमांत एवं पूर्णिमांत गणना का अनुसरण करता है। तमिल, बंगाली एवं मलयालम सौर पंचांग अभी समर्थित नहीं हैं। |
| `seatsLeft` | {n} sankalps remain in this muhurat. | इस मुहूर्त में {n} संकल्प शेष। |
| `full` | This muhurat is full. | यह मुहूर्त पूर्ण हो चुका है। |
| `nextOpen` | The next open muhurat at this ghat is {date}. | इस घाट पर अगला उपलब्ध मुहूर्त {date} है। |
| `closesAt` | Bookings close {t}, six hours before the rite. | अनुष्ठान से छह घंटे पूर्व, {t} पर बुकिंग बंद हो जाती है। |

---

# Part 6 — TypeScript data model

> Path: `src/lib/muhurat/types.ts`. Complete and intended to compile as-is under `strict`.

```ts
// ---------------------------------------------------------------------------
// Snanify — muhurat & scheduling domain model
//
// INVARIANT 1: every point in time in this file is a UTC ISO-8601 instant
//              ending in "Z". Wall-clock time is NEVER stored — it is derived
//              at render time from (instant, IANA zone). No exceptions.
// INVARIANT 2: no Muhurat may generate a Slot unless status is "verified"
//              or "manual".
// INVARIANT 3: panchangDate !== ghatCivilDate for any window that starts
//              before sunrise. Do not conflate them.
// ---------------------------------------------------------------------------

/** ISO-8601 UTC instant, e.g. "2026-11-23T22:54:00.000Z". Always ends in "Z". */
export type Instant = string & { readonly __brand: "Instant" };

/** IANA zone id, e.g. "Asia/Kolkata". Never a raw offset like "+05:30". */
export type IanaZone = string & { readonly __brand: "IanaZone" };

/** Civil date "YYYY-MM-DD" in some named zone. Not an instant. */
export type CivilDate = string & { readonly __brand: "CivilDate" };

export type Minutes = number;
export type Seconds = number;

// --- Panchang primitives ---------------------------------------------------

/** 1–15 Shukla, 16–30 Krishna. 15 = Purnima, 30 = Amavasya. */
export type TithiIndex =
  | 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15
  | 16|17|18|19|20|21|22|23|24|25|26|27|28|29|30;

/** 1 = Ashwini … 27 = Revati. 3 = Krittika, 13 = Hasta. */
export type NakshatraIndex =
  | 1|2|3|4|5|6|7|8|9|10|11|12|13|14
  | 15|16|17|18|19|20|21|22|23|24|25|26|27;

/** 1 = Vishkambha … 27 = Vaidhriti. 17 = Vyatipata. */
export type YogaIndex = NakshatraIndex;

/** 1 = Bava … 11 = Kimstughna. 7 = Vishti (Bhadra). */
export type KaranaIndex = 1|2|3|4|5|6|7|8|9|10|11;

/** JS convention: 0 = Sunday … 6 = Saturday. Sunrise-to-sunrise, not midnight. */
export type VaraIndex = 0|1|2|3|4|5|6;

/** 1 = Chaitra … 12 = Phalguna. */
export type MasaIndex = 1|2|3|4|5|6|7|8|9|10|11|12;

/** 1 = Mesha (Aries) … 10 = Makara (Capricorn) … 12 = Meena. Sidereal. */
export type RashiIndex = 1|2|3|4|5|6|7|8|9|10|11|12;

export type Paksha = "shukla" | "krishna";
export type MasaScheme = "amanta" | "purnimanta";

export interface MasaLabel {
  readonly index: MasaIndex;
  readonly scheme: MasaScheme;
  /** True for an intercalary Adhika masa. */
  readonly isAdhika: boolean;
  /** True for the rare omitted Kshaya masa. */
  readonly isKshaya: boolean;
  readonly nameEn: string;   // "Kartika"
  readonly nameHi: string;   // "कार्तिक"
}

/** An anga with the instant it ends. Start is the previous anga's end. */
export interface AngaSpan<T extends number> {
  readonly index: T;
  readonly nameEn: string;
  readonly nameHi: string;
  /** Instant this anga began. */
  readonly startsAt: Instant;
  /** Instant this anga ends. */
  readonly endsAt: Instant;
}

// --- Ghat ------------------------------------------------------------------

export type GhatId =
  | "ganga-haridwar"
  | "sangam-prayagraj"
  | "yamuna-mathura"
  | "godavari-nashik"
  | "shipra-ujjain"
  | "kaveri-kodagu";

export interface Ghat {
  readonly id: GhatId;

  readonly riverEn: string;      // "Ganga"
  readonly riverHi: string;      // "गंगा"
  readonly ghatEn: string;       // "Har Ki Pauri"
  readonly ghatHi: string;       // "हर की पौड़ी"
  readonly cityEn: string;       // "Haridwar"
  readonly cityHi: string;       // "हरिद्वार"
  readonly stateEn: string;      // "Uttarakhand"
  readonly stateHi: string;      // "उत्तराखंड"
  /** Short editorial line, e.g. "Moksha · the great purifier". */
  readonly noteEn: string;
  readonly noteHi: string;

  /**
   * PLACEHOLDER — approximate. Verify on site to 5 decimal places before
   * printing sunrise on a Sankalp Patra.
   */
  readonly lat: number;
  readonly lon: number;
  /** Metres above sea level. PLACEHOLDER — verify. Drives the horizon dip. */
  readonly elevationM: number;

  /** Always "Asia/Kolkata" today; kept explicit for future non-Indian ghats. */
  readonly zone: IanaZone;

  /** Which lunar-month reckoning is displayed for this ghat. */
  readonly masaScheme: MasaScheme;

  readonly capacity: CapacityProfile;
  readonly rahuKaalPolicy: "veto" | "warn";

  /** Which daily windows we operate here. */
  readonly windows: readonly MuhuratWindowKind[];

  /**
   * PLACEHOLDER — no priest partnership is asserted. Populate only with
   * signed agreements; the UI must not render an unpopulated roster.
   */
  readonly purohitRoster: readonly PurohitId[];

  readonly streamProfile: StreamProfile;
  readonly active: boolean;
}

export interface StreamProfile {
  /** Bearer of the camera. PLACEHOLDER until an operator is contracted. */
  readonly operatorRef: string | null;
  readonly maxConcurrentStreams: number;
  /** Fallback when connectivity fails: record locally, publish after. */
  readonly offlineCaptureSupported: boolean;
}

export type PurohitId = string & { readonly __brand: "PurohitId" };

// --- Sunrise / sunset / solar geometry -------------------------------------

export interface SolarDay {
  readonly ghatId: GhatId;
  /** Civil date in the ghat's zone of this sunrise. */
  readonly civilDate: CivilDate;
  readonly sunrise: Instant;
  readonly sunset: Instant;
  /** Local apparent noon (solar transit), not clock noon. */
  readonly solarNoon: Instant;
  /** Sunrise of the following day — closes the Hindu day. */
  readonly nextSunrise: Instant;
  /** True midnight between sunset and next sunrise; anchors nishita. */
  readonly trueMidnight: Instant;
  readonly dayLengthMin: Minutes;
  readonly nightLengthMin: Minutes;
  /** Horizon dip applied, in arcminutes. */
  readonly horizonDipArcmin: number;
}

// --- PanchangDay -----------------------------------------------------------

/**
 * One Hindu day at one ghat: sunrise → next sunrise.
 * Angas may change mid-day; each array is ordered and covers the whole span.
 */
export interface PanchangDay {
  readonly ghatId: GhatId;
  /** Civil date of the OPENING sunrise. This is the panchang day's identity. */
  readonly panchangDate: CivilDate;
  readonly solar: SolarDay;

  readonly vara: VaraIndex;
  readonly tithis: readonly AngaSpan<TithiIndex>[];
  readonly nakshatras: readonly AngaSpan<NakshatraIndex>[];
  readonly yogas: readonly AngaSpan<YogaIndex>[];
  readonly karanas: readonly AngaSpan<KaranaIndex>[];

  /** Tithi running at sunrise — the udaya-vyapini tithi. */
  readonly tithiAtSunrise: TithiIndex;
  readonly paksha: Paksha;
  /** Both schemes always populated; render per Ghat.masaScheme. */
  readonly masaAmanta: MasaLabel;
  readonly masaPurnimanta: MasaLabel;

  readonly vikramSamvat: number;
  readonly shakaSamvat: number;

  /** Sidereal rashi the Sun occupies at sunrise. */
  readonly sunRashi: RashiIndex;

  /** True when a tithi begins and ends without touching a sunrise. */
  readonly hasKshayaTithi: boolean;
  /** True when one tithi spans two sunrises. */
  readonly hasAdhikaTithi: boolean;

  readonly provenance: Provenance;
}

// --- Provenance ------------------------------------------------------------

export type MuhuratStatus =
  | "draft"        // computed, unverified — never sellable
  | "verified"     // agreed by >=2 independent sources — sellable
  | "quarantined"  // disagreement beyond tolerance — invisible in UI
  | "manual"       // human-entered with citation (Kumbh) — sellable
  | "superseded";  // replaced by a later recomputation

export interface Provenance {
  readonly engineVersion: string;      // "snanify-panchang@1.4.2"
  readonly ephemeris: "swisseph";
  readonly ephemerisVersion: string;   // "2.10.3"
  readonly ayanamsa: "lahiri";
  readonly deltaTModel: string;        // "espenak-meeus-2006"
  readonly computedAt: Instant;
  readonly status: MuhuratStatus;
  readonly checks: readonly VerificationCheck[];
  /** Required when status === "manual". */
  readonly sourceUrl?: string;
  readonly approvedBy?: string;
  readonly approvedAt?: Instant;
  /** Set when a resolution fallback was used (§2.2). */
  readonly resolutionNote?: string;
}

export interface VerificationCheck {
  readonly source: "prokerala" | "divineapi" | "vedika" | "astronomy-engine" | "human";
  readonly checkedAt: Instant;
  readonly field: "tithiEnd" | "nakshatraEnd" | "sunrise" | "sunset" | "windowStart" | "windowEnd" | "occasionDay";
  readonly ours: string;
  readonly theirs: string;
  readonly deltaSeconds: Seconds | null; // null for occasionDay (exact match)
  readonly withinTolerance: boolean;
}

// --- Occasion --------------------------------------------------------------

export type OccasionId =
  | "purnima" | "amavasya" | "somvati-amavasya" | "ekadashi"
  | "sankranti" | "makar-sankranti"
  | "pitru-paksha" | "sarva-pitru-amavasya"
  | "ganga-dussehra" | "kartik-purnima" | "mahashivratri"
  | "kartik-snan" | "magh-snan"
  | `kumbh-${string}`;

export type OccasionTier = "nitya" | "punya" | "parva" | "mahaparva";

export type DayResolution =
  | "udaya" | "madhyahna" | "aparahna" | "pradosha" | "nishita";

export type OccasionRule =
  | {
      readonly kind: "tithi";
      readonly tithi: TithiIndex;
      readonly masa?: MasaIndex;
      readonly masaScheme?: MasaScheme;
      readonly requiresNakshatra?: readonly NakshatraIndex[];
      readonly requiresVara?: readonly VaraIndex[];
      /** Ekadashi only: skip the day if Dashami runs at sunrise. */
      readonly avoidViddha?: boolean;
    }
  | {
      readonly kind: "solarIngress";
      readonly rashi: RashiIndex;
    }
  | {
      readonly kind: "tithiRange";
      readonly masa: MasaIndex;
      readonly masaScheme: MasaScheme;
      readonly paksha: Paksha;
      readonly fromTithi: TithiIndex;
      readonly toTithi: TithiIndex;
    }
  | {
      readonly kind: "lunarMonth";
      readonly masa: MasaIndex;
      readonly masaScheme: MasaScheme;
      /** Restrict to certain ghats, e.g. Magh Snan → Prayagraj only. */
      readonly ghats?: readonly GhatId[];
    }
  | {
      /** Kumbh, Shahi Snan. The engine never derives these. */
      readonly kind: "manual";
    };

export interface Occasion {
  readonly id: OccasionId;
  readonly nameEn: string;    // "Kartik Purnima"
  readonly nameHi: string;    // "कार्तिक पूर्णिमा"
  /** One honest line. States what the occasion IS, never what happens if missed. */
  readonly lineEn: string;    // "Dev Deepawali at the ghats"
  readonly lineHi: string;    // "घाटों पर देव दीपावली"
  /** Longer explainer, 2–4 sentences, with a citation. */
  readonly aboutEn: string;
  readonly aboutHi: string;
  readonly citation: string;

  readonly rule: OccasionRule;
  readonly resolution: DayResolution;
  readonly tier: OccasionTier;

  /** Ghats where this occasion is offered. Empty = all active ghats. */
  readonly ghats: readonly GhatId[];
  /** Windows opened on this occasion, overriding the ghat default. */
  readonly windowsOverride?: readonly MuhuratWindowKind[];
  /** Days before the event that booking opens. */
  readonly bookingOpensDaysAhead: number; // 90 nitya/punya, 180 parva/mahaparva
}

/** A rule resolved to a specific panchang day at a specific ghat. */
export interface OccasionInstance {
  readonly id: string;                 // "kartik-purnima:ganga-haridwar:<panchangDate>"
  readonly occasionId: OccasionId;
  readonly ghatId: GhatId;
  readonly panchangDate: CivilDate;
  /** For multi-day occasions: 1-based day index and total. */
  readonly dayOfOccasion: number;
  readonly totalDays: number;
  /** Instant the defining tithi/ingress actually occurs. */
  readonly definingInstant: Instant;
  readonly resolution: DayResolution;
  readonly provenance: Provenance;
}

// --- Muhurat ---------------------------------------------------------------

export type MuhuratWindowKind =
  | "brahma"        // sunrise − 96m → sunrise − 48m
  | "pratah-snan"   // sunrise → sunrise + 96m
  | "abhijit"       // solar noon ± dayLength/30
  | "godhuli"       // sunset ± 24m
  | "nishita"       // Mahashivratri only
  | "parva-day";    // whole-day window on a mahaparva

/**
 * A concrete auspicious window: one ghat, one panchang day, one window kind.
 * This is the unit the user picks. Slots hang off it.
 */
export interface Muhurat {
  readonly id: string;  // "brahma:ganga-haridwar:2026-11-23"
  readonly ghatId: GhatId;
  readonly kind: MuhuratWindowKind;

  /** Hindu day this window belongs to (sunrise-to-sunrise). See §1.4. */
  readonly panchangDate: CivilDate;
  /** Civil date in Asia/Kolkata at which startsAt falls. May differ by one. */
  readonly ghatCivilDate: CivilDate;

  readonly startsAt: Instant;
  readonly endsAt: Instant;
  readonly durationMin: Minutes;

  /** Angas prevailing at startsAt — what the Sankalp Patra will record. */
  readonly tithi: TithiIndex;
  readonly paksha: Paksha;
  readonly nakshatra: NakshatraIndex;
  readonly yoga: YogaIndex;
  readonly karana: KaranaIndex;
  readonly vara: VaraIndex;
  readonly masa: MasaLabel;   // already resolved to the ghat's scheme

  /** Occasions landing on this panchang day at this ghat. May be empty. */
  readonly occasions: readonly OccasionInstance[];
  /** Highest tier among occasions; "nitya" if none. Drives priority + copy. */
  readonly tier: OccasionTier;

  /** Excluded periods overlapping this ghat-day; used to validate slots. */
  readonly inauspicious: readonly InauspiciousPeriod[];

  /** Non-blocking notes, e.g. "abhijit-wednesday", "vishti-karana". */
  readonly advisories: readonly string[];

  readonly bookingOpensAt: Instant;
  /** startsAt − 6h. */
  readonly bookingClosesAt: Instant;

  readonly provenance: Provenance;
}

export interface InauspiciousPeriod {
  readonly kind: "rahu-kaal" | "yamaganda" | "gulika" | "dur-muhurtam" | "varjyam";
  readonly startsAt: Instant;
  readonly endsAt: Instant;
  /** Only rahu-kaal is blocking, and only when the ghat policy is "veto". */
  readonly blocking: boolean;
}

// --- Capacity & Slot -------------------------------------------------------

export interface CapacityProfile {
  /** Simultaneous purohit stations we operate at this ghat. */
  readonly stations: number;
  /** Sankalp seats one purohit can carry in one ceremony. */
  readonly seatsPerCeremony: number;
  /** Recitation + immersion, minutes. */
  readonly ceremonyMin: Minutes;
  /** Reset between ceremonies, minutes. */
  readonly bufferMin: Minutes;
}

/**
 * seatsFor(window, profile):
 *   ceremonies = floor(windowMin / (ceremonyMin + bufferMin))   // >= 1 required
 *   slots      = ceremonies * stations
 *   seats      = slots * seatsPerCeremony
 * A ceremony must fit ENTIRELY inside the window. If it does not, the window
 * produces no slots and must not be offered.
 */
export function seatsFor(windowMin: Minutes, p: CapacityProfile): number {
  const per = p.ceremonyMin + p.bufferMin;
  const ceremonies = Math.floor(windowMin / per);
  return ceremonies * p.stations * p.seatsPerCeremony;
}

export type SlotStatus = "scheduled" | "open" | "closed" | "full" | "cancelled";

/** One purohit station running one ceremony inside one Muhurat. */
export interface Slot {
  readonly id: string;  // "brahma:ganga-haridwar:2026-11-23:s1:c1"
  readonly muhuratId: string;
  readonly ghatId: GhatId;

  /** 1-based station and ceremony index within the window. */
  readonly station: number;
  readonly ceremony: number;

  readonly startsAt: Instant;
  readonly endsAt: Instant;

  readonly seatsTotal: number;
  readonly seatsBooked: number;
  readonly seatsHeld: number;

  readonly status: SlotStatus;

  /** Assigned at T−24h. PLACEHOLDER until a roster exists. */
  readonly purohitId: PurohitId | null;

  /** Set when a closure or an operational failure cancels the slot. */
  readonly cancellationReason: CancellationReason | null;
}

export type CancellationReason =
  | "flood-or-water-level"
  | "administrative-closure"
  | "crowd-control"
  | "filming-restriction"
  | "purohit-unavailable"
  | "connectivity-failure"
  | "muhurat-quarantined"
  | "other";

export interface GhatClosure {
  readonly id: string;
  readonly ghatId: GhatId;
  readonly startsAt: Instant;
  readonly endsAt: Instant;
  readonly reason: CancellationReason;
  readonly noteEn: string;
  readonly noteHi: string;
  readonly enteredBy: string;
  readonly enteredAt: Instant;
}

export interface SeatHold {
  readonly id: string;
  readonly slotId: string;
  readonly seats: number;
  readonly createdAt: Instant;
  /** createdAt + 10 minutes. */
  readonly expiresAt: Instant;
  readonly checkoutSessionId: string;
}

// --- Sankalp, Booking, Ritual ---------------------------------------------

export type Tier = "ekal" | "parivar" | "varsh";

/** Seat cost per tier. Seats measure recitation time, not headcount. */
export const SEAT_COST: Record<Tier, number> = {
  ekal: 1,
  parivar: 3,
  varsh: 1, // per redemption
};

export const TIER_PRICE_USD: Record<Tier, number> = {
  ekal: 11,
  parivar: 31,
  varsh: 108,
};

export interface SankalpName {
  /** As typed by the user, any script. */
  readonly asEntered: string;
  /** Devanagari for recitation. Machine-transliterated, human-confirmed. */
  readonly devanagari: string;
  readonly transliterationConfirmed: boolean;
  /** Relationship, for pitru sankalp phrasing. */
  readonly relation?: "self" | "spouse" | "child" | "parent" | "ancestor" | "other";
  /** True for a departed person — changes the recitation, never the price. */
  readonly isPitru: boolean;
}

export interface Sankalp {
  readonly names: readonly SankalpName[];
  /** Free text; "unknown" is accepted and must never be penalised in the UI. */
  readonly gotra: string;
  readonly gotraUnknown: boolean;
  /** The user's stated intention. Max 280 chars. Never shown publicly. */
  readonly intention: string;
  readonly intentionLang: "en" | "hi";
  /** True if the user asked that the intention be read aloud. */
  readonly readAloud: boolean;
  readonly includesPitruSankalp: boolean;
}

export type BookingStatus =
  | "held" | "paid" | "confirmed" | "performed"
  | "refunded" | "cancelled-by-user" | "cancelled-by-snanify";

export interface Booking {
  readonly id: string;
  readonly userId: string;
  readonly slotId: string;
  readonly muhuratId: string;
  readonly ghatId: GhatId;

  readonly tier: Tier;
  readonly seats: number;               // SEAT_COST[tier], stored at purchase
  readonly amountUsdCents: number;
  readonly currencyCharged: string;     // ISO-4217 actually charged
  readonly amountChargedMinor: number;

  readonly sankalp: Sankalp;

  /** Zone at booking time — used for every notification and render. */
  readonly userZone: IanaZone;
  readonly userLang: "en" | "hi";

  readonly status: BookingStatus;
  readonly createdAt: Instant;
  readonly paidAt: Instant | null;
  readonly confirmedAt: Instant | null;

  /** Varsh only: which annual redemption this is. */
  readonly varshRedemption: { readonly index: number; readonly of: 12 } | null;

  readonly ritualId: string | null;
  readonly sankalpPatraUrl: string | null;

  readonly remindersSentAt: readonly Instant[];  // T−24h, T−1h
}

export type RitualStatus =
  | "scheduled" | "roll-frozen" | "streaming"
  | "completed" | "deferred" | "cancelled";

/** The rite that is actually performed. 1:1 with a Slot. */
export interface Ritual {
  readonly id: string;
  readonly slotId: string;
  readonly muhuratId: string;
  readonly ghatId: GhatId;

  readonly scheduledStart: Instant;
  readonly actualStart: Instant | null;
  readonly actualEnd: Instant | null;

  readonly purohitId: PurohitId | null;
  readonly status: RitualStatus;

  /** Frozen at bookingClosesAt. Ordered as recited. */
  readonly sankalpRoll: readonly {
    readonly bookingId: string;
    readonly names: readonly SankalpName[];
    readonly gotra: string;
    readonly includesPitruSankalp: boolean;
  }[];

  readonly streamUrl: string | null;
  readonly recordingUrl: string | null;
  /** Sunrise/sunset actually observed, printed on the Sankalp Patra. */
  readonly observedSunrise: Instant | null;

  readonly cancellationReason: CancellationReason | null;
  /** Where the rite moved to, when deferred. */
  readonly deferredToSlotId: string | null;

  readonly notesEn: string | null;
  readonly notesHi: string | null;
}
```

## 6.1 Entity relationships

```
Occasion (rule)  1 ──< OccasionInstance (rule × ghat × panchangDate)
Ghat             1 ──< PanchangDay        (one per Hindu day)
PanchangDay      1 ──< Muhurat            (one per window kind)
Muhurat          1 ──< Slot               (stations × ceremonies)
Slot             1 ──< Booking            (seats-limited)
Slot             1 ──1 Ritual
Booking          n ──1 Ritual             (via sankalpRoll)
```

---

# Part 7 — Capacity, concretely

## 7.1 Station allocation

| Ghat | Stations | Seats/ceremony | Ceremony | Buffer | Rationale |
|---|---|---|---|---|---|
| Har Ki Pauri, Haridwar | 3 | 12 | 20 min | 10 min | Flagship, highest demand |
| Triveni Sangam, Prayagraj | 2 | 12 | 20 min | 10 min | Second-highest; Magh Snan season |
| Vishram Ghat, Mathura | 1 | 12 | 20 min | 10 min | |
| Ram Kund, Nashik | 1 | 12 | 20 min | 10 min | |
| Ram Ghat, Ujjain | 1 | 12 | 20 min | 10 min | |
| Talakaveri, Kodagu | 1 | 12 | 20 min | 10 min | Remote; connectivity risk |

## 7.2 Derived capacity

Brahma Muhurat is 48 min. One ceremony (20 + 10 = 30 min) fits; two do not.

```
Haridwar   1 ceremony × 3 stations × 12 seats = 36
Prayagraj  1 ceremony × 2 stations × 12 seats = 24
Mathura    1 × 1 × 12 = 12
Nashik     1 × 1 × 12 = 12
Ujjain     1 × 1 × 12 = 12
Kodagu     1 × 1 × 12 = 12
                                        TOTAL = 108
```

**One Brahma Muhurat across all six waters seats 108 sankalps.** This is a derived operational fact, not a marketing invention, and it lands on the number the Varsh tier is priced at. It is worth saying publicly — with the arithmetic shown.

Longer windows scale: a `parva-day` window of 6 hours (360 min) yields `floor(360/30) = 12` ceremonies per station → Haridwar 432 seats, all six ghats 1,296.

## 7.3 Oversell protection

```sql
CREATE TABLE slot (
  id              text PRIMARY KEY,
  muhurat_id      text NOT NULL REFERENCES muhurat(id),
  seats_total     int  NOT NULL CHECK (seats_total > 0),
  seats_booked    int  NOT NULL DEFAULT 0 CHECK (seats_booked >= 0),
  seats_held      int  NOT NULL DEFAULT 0 CHECK (seats_held   >= 0),
  status          text NOT NULL,
  CONSTRAINT slot_no_oversell
    CHECK (seats_booked + seats_held <= seats_total)
);
```

Booking path:
1. `BEGIN; SELECT … FROM slot WHERE id = $1 FOR UPDATE;`
2. `UPDATE slot SET seats_held = seats_held + $seats WHERE id = $1;`
   → the CHECK constraint rejects the transaction on overflow. **Never** branch on a prior read.
3. Insert `SeatHold` with `expiresAt = now + 10 min`.
4. On payment success: `seats_held -= n; seats_booked += n`.
5. Sweeper every 60 s releases expired holds.

Deliberate: the database, not the application, is the authority on capacity. Kartik Purnima at Haridwar will see concurrent checkouts on 36 seats.

## 7.4 Scarcity display — honest only

- Show remaining seats **only** when `remaining / total < 0.25` **and** the number is the true value.
- Never show "N people are viewing this".
- Never show a countdown timer on a payment page. The muhurat countdown on the *calendar* is fine — it is a fact about the sky.
- When full, show the next open muhurat at the same ghat **and** the same occasion at another ghat. Two real alternatives, no pressure copy.

---

# Part 8 — Pipeline & API

## 8.1 Nightly job

`cron: 0 20 * * *` (20:00 UTC = 01:30 IST — after the Indian day's bookings, before the morning)

```
1. horizon      = today .. today + 18 months
2. for each ghat × day:
     solar      = sunriseSunset(lat, lon, elev)        // sweph
     panchang   = angas(solar.sunrise .. solar.nextSunrise)
     occasions  = resolveOccasions(panchang, RULES)
     muhurats   = windows(solar, panchang, ghat.windows)
     inausp     = rahuKaal(solar, vara) + yamaganda + gulika + durMuhurtam
     muhurats   = muhurats.filter(m => !overlapsBlocking(m, inausp))
3. diff vs previous run
     - new draft            → enqueue for verification
     - changed & verified   → P1 ALERT, do not auto-publish
     - unchanged            → no-op
4. verify next 120 days against 2 external sources
5. promote verified / quarantine failures
6. generate slots for verified muhurats within bookingOpensDaysAhead
7. emit metrics: drafts, verified, quarantined, seats published
```

Full recompute is idempotent. Slot ids are deterministic, so regeneration never orphans bookings.

## 8.2 Public API

```
GET /api/muhurat/calendar
    ?ghat=ganga-haridwar          (optional; omit = all)
    &from=2026-11-01&to=2027-01-31
    &tz=America/Toronto
    &tier=parva                   (optional filter)
    &lang=en
→ { muhurats: MuhuratView[] }     // verified + manual only

GET /api/muhurat/:id?tz=…&lang=…
→ { muhurat: MuhuratView, slots: SlotView[], provenance: ProvenanceView }

GET /api/muhurat/next?ghat=…&tz=…
→ { muhurat: MuhuratView }        // powers the hero card

POST /api/booking/hold
    { slotId, tier, seats }
→ { holdId, expiresAt }           // 409 on capacity exhaustion

GET /api/muhurat/:id/ics?tz=…
→ text/calendar                   // UTC DTSTART + VTIMEZONE
```

`MuhuratView` is the render-ready projection: instants plus **both** pre-formatted clocks and the date-shift flag, so the client cannot get the conversion wrong.

```ts
export interface MuhuratView {
  readonly id: string;
  readonly kind: MuhuratWindowKind;
  readonly titleEn: string;         // "Brahma Muhurat"
  readonly titleHi: string;         // "ब्रह्म मुहूर्त"
  readonly ghat: { id: GhatId; labelEn: string; labelHi: string };

  readonly startsAt: Instant;
  readonly endsAt: Instant;
  readonly durationMin: Minutes;

  readonly ghatClock: FormattedTime;   // Asia/Kolkata
  readonly userClock: FormattedTime;   // requested tz
  readonly dateShift: -1 | 0 | 1;      // user date relative to ghat date

  readonly panchangLineEn: string;     // "Shukla Purnima · Kartika · Krittika"
  readonly panchangLineHi: string;     // "शुक्ल पूर्णिमा · कार्तिक · कृत्तिका"
  readonly occasionsEn: readonly string[];
  readonly occasionsHi: readonly string[];
  readonly tier: OccasionTier;

  readonly seatsRemaining: number;
  /** Only when seatsRemaining/total < 0.25. */
  readonly showScarcity: boolean;
  readonly bookingClosesAt: Instant;
}

export interface FormattedTime {
  readonly zone: IanaZone;
  readonly weekday: string;    // "Tue" / "मंगल"
  readonly date: string;       // "24 Nov" / "24 नव"
  readonly time: string;       // "4:24 am" / "प्रातः 4:24"
  readonly zoneLabel: string;  // "IST" / "Toronto"
}
```

## 8.3 Test suite — non-negotiable

1. **Cross-implementation.** `sweph` vs `astronomy-engine` over 3,650 days × 6 ghats. All tithi/nakshatra boundaries within 120 s; all sunrise/sunset within 60 s; all occasion→day assignments **exact**. CI-blocking.
2. **Golden fixtures.** 200 human-verified days checked against Drik Panchang by eye, committed as a fixture file with the verifier's name and date. Any drift fails the build.
3. **Kshaya/adhika tithi.** Every kshaya and adhika tithi in the 10-year window must resolve to exactly one panchang day.
4. **Adhika masa.** At least one intercalary month in the window; occasion naming must be correct across it.
5. **Timezone property test.** For every muhurat × 40 zones (incl. Chatham +12:45, Kathmandu +05:45, Newfoundland −03:30, and both sides of every 2026–2028 DST transition): rendering then re-parsing must return the original instant, and `dateShift` must match an independent computation.
6. **Pre-sunrise day boundary.** Every `brahma` muhurat must satisfy `panchangDate === previousDay(ghatCivilDate)`.
7. **Rahu Kaal veto.** No generated slot overlaps a blocking `InauspiciousPeriod`. Property test over the full horizon.
8. **Capacity.** Concurrent booking fuzz on a 12-seat slot: 200 parallel holds must yield exactly 12 booked seats, zero oversell.
9. **Copy lint.** A rule over `content.ts` and all occasion `aboutEn`/`aboutHi` rejecting a denylist: *dosh, punishment, suffer, ancestors are waiting, last chance, don't miss, before it's too late, guaranteed, cure, and their Hindi equivalents* (दोष, दंड, अंतिम अवसर, चूक न जाएँ, गारंटी). CI-blocking.

---

# Part 9 — Ethics constraints, as engineering requirements

These are enforced, not aspirational.

1. **No manipulation of grief, guilt or fear.** Copy may state what an occasion *is*. It may never state what happens if you miss it. Pitru Paksha marketing describes the season; it never implies unrest, dosh or consequence. Enforced by the copy lint (§8.3.9).
2. **No fabricated trust signals.** Priest names, temple partnerships, counts of sankalps offered and countries served are `PLACEHOLDER` until real. *The current landing-page figures — "1,20,000+ sankalps offered" and "48 countries served" — are placeholders and must be replaced with true counts or removed before launch.*
3. **No manufactured urgency.** Real remaining-seat counts only, only below 25%. No countdown on payment. No "N viewing".
4. **No claimed outcomes.** We never say a snan cures, guarantees, removes or grants. We say what is performed, where, when, and by whom.
5. **A quarantined date is never shown.** Not with a warning, not greyed out. It does not exist in the API response.
6. **Failure is refunded, honestly.** Ghat closure, flood, purohit unavailability or a quarantine → full refund **or** a free re-book at the same tier on the next equivalent muhurat, **user's choice**, offered in one email with both buttons equally weighted. If the rite was performed but the stream failed → recording delivered plus a **50% credit**, offered unprompted.
7. **Substitution requires consent.** We never silently move a booking to another ghat, another muhurat or another occasion.
8. **The methodology is public.** A `/panchang` page states: Lahiri ayanamsa, Swiss Ephemeris, the sunrise definition, the horizon-dip formula, the resolution rule per occasion, the calendars we do not support, and the verification tolerances. Written in the same editorial voice as the rest of the site.
9. **"Gotra unknown" is a first-class answer.** No asterisk, no upsell, no implication of deficiency. Recitation falls back to *Kashyapa gotra* per common practice, and the UI says so plainly.
10. **The intention is private.** Never rendered publicly, never used in marketing, never in a testimonial, encrypted at rest, and deleted on account deletion.

---

## Open questions for a human

- Swiss Ephemeris Professional Licence: confirm current price (search indicates CHF 750 first / CHF 1550 unlimited, one-time, 99 years) and confirm the contract terms cover a hosted SaaS with an unlimited number of end users. Sign this before any swisseph code is written — the AGPL fallback would compel publishing the entire booking stack.
- Drik Panchang usage: we must not scrape it, but it is the reference our users check. Ask Adarsh Mobile Applications LLP directly whether a data or verification licence exists, or whether manual weekly spot-checking by a staff member is acceptable under their terms of use.
- Choose the second verification API. ProKerala is confirmed to have Advanced Panchang (100 credits) and an inauspicious-period endpoint; DivineAPI and Vedika both claim panchang coverage. Get trial keys for all three, run a 90-day agreement test against our engine, and pick the two that agree most closely with Drik Panchang.
- Rahu Kaal policy needs a doctrinal ruling from the priest council: does Rahu Kaal bind nitya karma such as snan, or only new undertakings? The code defaults to a hard veto; a ruling either way must be documented and citable, because we intend to state the policy publicly.
- Ekadashi tradition: v1 ships Smarta Ekadashi only. Confirm with the priest council whether the Vaishnava variant must ship for launch, since a meaningful share of diaspora users are Vaishnava and would see a date we call wrong.
- Ghat coordinates and elevations must be surveyed on site to 5 decimal places, particularly Talakaveri (elevation drives the horizon-dip correction and therefore the printed sunrise). Also confirm the exact stone or step at each ghat where the rite is performed — that is what goes on the Sankalp Patra.
- Purohit partnerships: no priest name, lineage, temple affiliation or roster may appear in the product until a signed agreement exists. Determine how many purohits are needed per ghat to staff the station counts in §7.1, including festival surge at Haridwar and Prayagraj.
- Filming and access permissions: Har Ki Pauri, Vishram Ghat and Triveni Sangam have periodic administrative restrictions on filming and on crowd access, and Kumbh periods impose additional control. Establish written permissions per ghat and encode the known restricted periods as GhatClosure records.
- Kumbh, Ardh Kumbh and Magh Mela: establish a monitoring process for official akhara and district announcements, and name the staff member who approves each Shahi Snan date with a citation. The engine will not derive these, so a human process is load-bearing.
- The landing page currently states '1,20,000+ sankalps offered' and '48 countries served'. These must be replaced with true counts or removed before launch. Decide what the honest replacements are — the derived '108 sankalps per Brahma Muhurat across six waters' figure is a candidate that is both true and on-brand.
- Payments: choose a processor that handles India (UPI, RuPay) and global cards in one account, plus INR/USD/GBP/AUD/CAD/AED presentment. Decide whether pricing is USD-anchored worldwide or locally priced — $11 reads very differently in Haridwar than in Toronto, and 11/31/108 are the auspicious numbers, not the dollar amounts.
- Legal and tax: whether Snanify is selling a religious service, a digital media service, or a live-event ticket determines GST treatment in India, VAT/OSS treatment in the EU and UK, and consumer cancellation-right obligations. Get an opinion before pricing is finalised.
- Refund policy on the Varsh tier: what happens to unredeemed snans at year end? Rolling them over is generous; expiring them is standard; neither is obviously right for a religious commitment. Decide, and state it in plain language on the pricing page.
- Data retention for sankalp intentions and ancestors' names: this is sensitive personal and religious data, likely special-category under GDPR and under India's DPDP Act. Decide the retention period, the encryption approach, and whether the Sankalp Patra archive can survive account deletion.

---

## Adversarial review

**Verdict:** needs-work

### Credibility risks

- **Rahu Kaal as a hard veto, marketed as a stance, is manufactured piety and any pandit will say so.** Rahu Kaal governs *shubha karya* — new undertakings, journeys, marriages, business openings. Snan is nitya/naimittika karma. Nobody at Har Ki Pauri climbs out of the water at 07:30 on Monday. Publishing 'No snan is offered during Rahu Kaal' as a differentiator advertises a rule that does not exist in the practice you are serving, which is precisely the tell of an exploitative spiritual-tech startup: inventing a restriction to perform rigour. It also self-harms commercially — Monday's Rahu Kaal is octant 2 (≈07:30–09:00), which deletes prime morning inventory on **Somvati Amavasya**, your own 'high, rare, well known' occasion.
- **Godhuli's rationale is the most damaging paragraph in the document.** 'Commercially valuable: the only window that is a civilised evening hour for North America (~07:30 EST, ~04:30 PST)' selects a ritual window by conversion rate. Godhuli is classically a *vivaha* muhurta; evening is sandhyavandana time, not a prescribed snan window. If this document ever leaks, that sentence is the headline. The offering may still be defensible (sayam snan exists) — but the stated reason must be doctrinal, with the timezone convenience as a consequence, never the cause.
- **Pitru Paksha is modelled as the highest-margin inventory of the year and the anti-manipulation rules do not reach it.** The lint rule covers *copy*; it does not cover *scheduling pressure*. Scarcity badges, reminder emails, and a 16-day countdown funnel aimed at people who feel obligation to dead parents is the grief funnel, executed entirely through mechanisms this spec permits. 'Commercial weight: Highest for Parivar tier' next to Sarva Pitru Amavasya is a sentence written by someone optimising a season, not serving one.
- **The spec never confronts whether a proxy can discharge shraddha.** The strong traditional position is that shraddha/tarpana is performed by the descendant as karta; a purohit officiates, he does not substitute. Selling 'pitru sankalp' as a schedulable SKU without stating what is and is not being claimed is the theological overreach that will get you written about. This is answerable honestly — tarpana offered *on your behalf, in your name and gotra*, not a substitute for shraddha you are obliged to perform — but the spec must say it.
- **The 'priest council' is referenced four times as an existing authority and is never marked PLACEHOLDER.** 'No doctrinal backing our priest council would defend', 'that is a call for the priest council' — the project's own constraints forbid fabricating credentials or partnerships. Right now the document quietly asserts a religious governance body exists.
- **Station counts (Haridwar 3, Prayagraj 2, four ghats 1) are asserted as operational fact.** These imply purohits, permissions and a physical presence at six sites, including Talakaveri, a mountain spring in Kodagu. Unmarked, they read as real relationships. Same category of violation as the priest council.
- **The occasion calendar is generic North-Indian parva boilerplate applied uniformly to six sites that each have their own actual festival.** A practising reader notices instantly: Vishram Ghat's signature occasion is **Yam Dwitiya / Bhai Dooj** (the sibling bathing at Mathura) — absent. Talakaveri's single mass event is **Tula Sankramana / Kaveri Sankramana** and the theerthodbhava — absent, and it is *solar-reckoned*, on the very calendar system you scoped out. Nashik and Ujjain have **Simhastha** — absent. Meanwhile Ekadashi, which nobody travels for, is listed as 'the Varsh tier's spine'. The calendar was designed from a generic panchang, not from the six places.
- **Nashik/Ram Kund is the pre-eminent site for asthi visarjan, and 'everything is digital' collides with that head-on.** Users *will* ask. There is no line in the spec refusing the category, and an ambiguous non-answer here is far worse than a clear refusal.
- **Mahashivratri at nishita kaal conflates day-resolution with window placement.** `resolution` decides *which day* the occasion falls on; it must not decide *when the ceremony runs*. Nishita correctly picks the Mahashivratri date — but the Mahashivratri **snan** is a pre-dawn/morning snan, not a midnight one. As modelled, the engine will generate and sell a midnight snan slot at Ujjain. That is a doctrinal error produced by a data-model shortcut, and it is the kind of error a knowledgeable customer screenshots.
- **Makar Sankranti is reduced to 'instant-based' in one word.** Punya kaal is not the ingress instant; it is a window derived from it, with tradition-specific rules (and a next-morning shift when the ingress falls after sunset). This is a rule as complex as tithi resolution, applied to your self-declared 'very high, mass snan day'. As written, the engine will produce wrong Makar Sankranti windows.
- **Adhika masa is named and then never handled.** Festivals are generally observed in the *nija* masa, not the adhika one. Without a suppression rule the engine will happily generate and sell 'Kartik Purnima' twice, or place a parva in Purushottama masa. Simultaneously you miss the fact that **Adhik/Purushottama masa snan-daan is itself a major, genuinely sellable observance** at Prayagraj and Haridwar. This is the single most likely path to shipping a wrong festival date to paying customers.
- **The 2-minute verification tolerance guarantees the safety mechanism becomes theatre.** Your own arithmetic says astronomy-engine's ±1 arcminute is ≈2 minutes of tithi time — so the checker's expected error *equals* the tolerance, and CI will flap. Against third-party APIs it is worse: Drik-lineage sources differ on sunrise convention, ΔT and refraction by minutes routinely. Quarantine-everything becomes disable-the-check, which is how every integrity mechanism dies.
- **Requiring two commercial APIs to agree before a muhurat is sellable makes your revenue a function of ProKerala's uptime and response format.** You removed them from the request path and reinstalled them on the *availability* path. One vendor lapse silently deletes inventory, with no documented human-override path — so the override will be built in an emergency, undocumented, by whoever is on call.
- **The dip correction at Talakaveri makes the answer worse, not better, and the spec advertises it as rigour.** Horizon dip (1.76′·√h) assumes a distant sea-level horizon. Talakaveri sits in the Western Ghats surrounded by higher terrain; applying ~63′ of dip there introduces a ~4–5 minute error *away* from reality, while the document explicitly declines the terrain correction that would justify it. Worse, it moves you away from the reference almanac — and your entire trust proposition is 'we agree with the almanac you already check'.
- **The ayanamsa rationale is overstated for exactly the quantity that matters most.** Tithi is a *difference* of longitudes; ayanamsa cancels entirely. Lahiri matters for nakshatra, yoga and sidereal ingress — not for the tithi arithmetic that defines 'every parva snan we sell'. A knowledgeable reader spots this and starts doubting the rest of the technical claims.
- **Tithi is numbered two different ways in one document** — '1–15 in each paksha' in §1.1, then 'Amavasya = tithi 30' and 'Krishna paksha tithi 16→30' in §2.1. Trivial to fix, but it is the kind of internal inconsistency that suggests the model was written faster than it was checked.
- **Swiss Ephemeris licence terms and prices (CHF 750 / CHF 1550, 'relicenses under LGPL-3.0', 'valid 99 years') are asserted as settled fact.** The project's own rule says mark placeholders. These are legal terms of a third-party contract, restated from memory, in a document that instructs an engineer not to write code until the contract is signed.
- **Nobody evaluated shipping the MIT library in production.** If the decision that actually matters is *day assignment*, then ±2 minutes of boundary error almost never changes the day, and astronomy-engine may be sufficient — making the AGPL analysis, the CHF spend, and a native addon in a Vercel Next.js deployment all avoidable. The spec assumes Swiss Ephemeris and reasons brilliantly from there without testing the premise.
- **'One Brahma Muhurat across all six ghats seats 108 sankalps' is a reverse-fitted number dressed as a derived fact.** 9 stations × 12 = 108 requires the ceremony length and sankalps-per-ceremony to be chosen to land on an auspicious number. The formula is not deriving capacity; it is decorating it. And the moment ceremony length changes by one minute the public 'true fact' becomes false while the marketing copy persists — which is how `1,20,000+ Sankalps offered` and `48 Countries served`, both currently live in `src/lib/content.ts`, came to exist.
- **The spec bans countdown timers while the shipped homepage runs one.** `src/lib/content.ts` hero card: `countdown: "opens in 6h 12m"` / `"6 घंटे 12 मिनट में"`, on a hardcoded `04:24 IST` muhurat, under a `Live now · Har Ki Pauri` badge. The lint rule must be pointed at the code that already exists, or the policy is aspirational on day one.
- **A Postgres `CHECK` constraint cannot express a cross-row aggregate.** As written ('CHECK constraint plus row-level lock'), a naive implementer writes a CHECK over a subquery, which Postgres does not support, and ships the race the decision was meant to prevent.
- **Sensitive-category data with no retention model.** Name + gotra + ancestors' names is religious-belief data: GDPR Art. 9 special category for EU diaspora users, and sensitive under India's DPDP Act 2023. `content.ts` already promises `HD recording, kept for good` — indefinite retention of religious data, in a recording that also contains *other people's* names spoken aloud, with no erasure path. That promise and the right to erasure cannot both survive.
- **A live camera at a public ghat films third parties, including people bathing.** Scheduling decides when the camera rolls, so this belongs in this spec. Filming is restricted at several ghats, and dignity/consent of bystanders is both a legal and a brand exposure. Nothing in the document acknowledges it.
- **No force-majeure or non-performance model.** Floods, monsoon at Talakaveri, district-administration closures, Kumbh crowd control, stream failure. For a service sold as 'a real place at a real hour' with a fixed non-transferable instant, what happens when the rite cannot be performed is the largest trust and legal gap in the entire document, and it is absent.
- **India's CCPA Dark Patterns Guidelines (2023) are directly on point and uncited.** False urgency, confirm-shaming, drip pricing and basket sneaking are named prohibitions, not brand preferences. The spec's ethics are already broadly compliant — but framing them as taste rather than obligation means the first growth hire argues about taste.
- **Scarcity below 25% is still pressure on a religious obligation day.** On a 12-seat slot, 'below 25%' means 3 seats — i.e. most of the sell-through window shows a scarcity badge. True scarcity is still coercion when the trigger is a duty to one's dead.

### Required fixes

- Flip the Rahu Kaal default to `warn`, and delete 'No snan is offered during Rahu Kaal' from public copy until a named, real authority endorses it. Replace the display with a neutral, factual note: 'Rahu Kaal at this ghat today: 07:34–09:02 IST.' Show the fact, decline the doctrine. If you keep any veto, scope it to muhurta-sensitive occasions rather than nitya snan — and never let it delete Somvati Amavasya morning inventory.
- Split `resolution` into two fields: `dayResolution` (udaya | madhyahna | aparahna | pradosha | nishita — decides *which panchang day*) and `windowPolicy` (which daily window the ceremony actually occupies). Mahashivratri becomes `dayResolution: nishita, windowPolicy: brahma`. Sarva Pitru Amavasya stays `aparahna` for both, which is correct and now explicit rather than accidental. Without this split the engine sells a midnight Shivratri snan.
- Rewrite the Godhuli rationale doctrine-first. State the traditional basis for an evening snan window, then note the timezone consequence as a fact rather than a motive. Apply the same test to every window: if the stated reason for offering it is a conversion rate, do not offer it.
- Make occasions **per-ghat, not global**. Add: Yam Dwitiya at Vishram Ghat; Tula Sankramana / theerthodbhava at Talakaveri; Simhastha at Ram Ghat and Ram Kund; Harihar Milan / Vaikuntha Chaturdashi at Ujjain; Kalpvas already correctly scoped to Prayagraj. Drop or demote Ekadashi as a headline occasion — it is a fasting vrat, not a destination snan, and 24–26 Ekadashis do not map onto a twelve-snan Varsh tier anyway.
- Note that Tula Sankramana forces a decision on the solar-calendar scope-out. Either add sidereal solar ingress as a computed occasion type (it is only an ingress instant, cheap given you already need Sankranti) or drop Talakaveri from v1. Shipping a Kaveri ghat without its one mass occasion is worse than shipping five ghats.
- Add an explicit adhika/kshaya masa rule: occasions are suppressed in an adhika masa and observed in the nija masa, with a hard assertion in CI that no named occasion resolves twice in one samvatsara. Then add **Purushottama masa snan** as a first-class occasion — it is a genuine observance you are currently missing while risking a duplicate-festival bug in the same code path.
- Replace 'Makar Sankranti — instant-based' with a punya kaal rule: derive the window from the ingress instant, including the post-sunset next-morning shift, and label which tradition's rule you followed. This is your highest-volume day; it cannot be one word.
- Make the verification tolerance two-tier. **Day assignment must match exactly** — any disagreement on which panchang day an occasion falls on is a hard block. **Boundary instants** get a generous tolerance (5–10 min) and only warn, because sunrise conventions and ΔT legitimately differ between sources. Log the systematic offset per oracle so drift is visible instead of noisy.
- Reframe the whole methodology from 'physically most accurate' to 'agrees with the reference almanac, deviations documented'. Your trust claim is that users can cross-check you against Drik. Every place you optimise for physics over agreement, you manufacture a discrepancy that reads as a bug. Concretely: drop the dip correction at Talakaveri unless you also model terrain occlusion — half a correction is worse than none — and state the sunrise convention each oracle uses so systematic offsets are expected, not alarming.
- Document the human-override path for `verified` now, with the same shape as the Kumbh rule: `overrideBy` + `overrideReason` + `sourceUrl` + timestamp, surfaced in an audit log. Otherwise it gets built at 2am by whoever is on call and never reviewed.
- Never surface the word `verified` in user-facing UI. To a devotee it reads as 'verified by a religious authority', not 'three ephemeris implementations agreed'. Use language about the computation, or say nothing.
- Correct the ayanamsa rationale: state that ayanamsa cancels in tithi (a longitude *difference*) and matters for nakshatra, yoga, and sidereal ingress. Pin Lahiri for those reasons. Keeping the overstated version costs you credibility with exactly the reader you most need to convince.
- Normalise tithi numbering to one convention throughout (1–30 continuous, with paksha derived) and fix §1.1's '1–15 in each paksha'.
- Mark as PLACEHOLDER, unambiguously: the priest council (no such body has been constituted), all station counts, Talakaveri elevation, and every Swiss Ephemeris price and licence term. Add a standing rule to the document: any noun implying a person, body, partnership or contract is PLACEHOLDER until a named human signs off.
- Add a decision record evaluating **astronomy-engine in production**. If day assignment is what matters and ±2 minutes of boundary error changes the day approximately never, the MIT library may be sufficient and the AGPL analysis, the CHF spend, and a native addon in a Vercel deployment all disappear. Test this before signing anything. Separately, note that `sweph` is a native addon and cannot live on the request path in a Next.js serverless deployment — the 18-month precompute job is the right home, so say so explicitly.
- Delete '108 sankalps' from public copy, or state the parameters that produce it inline. And extend the lint rule to the two fabricated statistics already shipping in `src/lib/content.ts` — `1,20,000+ Sankalps offered` and `48 Countries served` — plus the hardcoded hero countdown (`opens in 6h 12m` / `6 घंटे 12 मिनट में`) and the static `Live now · Har Ki Pauri` badge. A policy that does not fail on the code already in the repo is not a policy.
- Widen the anti-manipulation lint from copy to **mechanism**, and cite the CCPA Dark Patterns Guidelines 2023 as the compliance floor. Specific rules: no scarcity display of any kind on pitru, Kumbh or manual occasions — sold-out is binary; no reminder or re-engagement email timed to Pitru Paksha; no confirm-shaming decline copy ('No thanks, I'll skip my ancestors this year'); no drip pricing on dakshina.
- Write the pitru claim explicitly, in both languages, and put it in the booking flow rather than the terms: what is offered is tarpana performed on your behalf, in your name and gotra, by a purohit at the ghat — and it does not discharge shraddha that tradition places on you as karta. Have the (real, once constituted) priest council sign the exact wording. This is the single highest-integrity move available and it is also good marketing.
- Add an explicit refusal for asthi visarjan and any other rite that requires physical presence or physical objects, named on the Nashik page where users will actually ask.
- Connect the engine to the sankalp. The sankalp vakya requires desha and kala — samvatsara, ayana, ritu, masa, paksha, tithi, vara, nakshatra — which is precisely what this engine computes. Say so in the summary. It reframes in-house computation from 'the API is credit-metered' to 'the sankalp is only correct if these five angas are correct', which is a vastly stronger and more honest justification, and it makes the Sankalp Patra a real artifact rather than a certificate.
- On the Sankalp Patra, render the masa name in the **user's** tradition, not the ghat's, with the ghat's scheme shown alongside if they differ. A Marathi family reading 'Phalguna' where they say 'Magha' will conclude the certificate is wrong. Operations keep the ghat's scheme; the artifact carries the user's.
- Specify the capacity constraint concretely: a `seats_taken` counter column on the slot row with `CHECK (seats_taken <= seats_total)`, incremented under `SELECT … FOR UPDATE`, or a Postgres exclusion constraint. 'CHECK constraint' alone will be implemented as a subquery, which Postgres rejects, and the race ships.
- Restate the T−6h cutoff in the user's clock as well as IST. For a 04:24 IST muhurat, a Toronto user's deadline is roughly midday the previous day — the 'late enough to be generous' framing is IST-parochial and contradicts the dual-clock principle the spec otherwise gets right.
- Write the force-majeure and non-performance policy into this spec, since scheduling owns it: what happens on stream failure, ghat closure, flood, monsoon or administrative order; whether the rite is re-performed at the next equivalent muhurat, refunded, or both; who decides; and how the user is told. Publish it before taking a rupee.
- Add a retention model for sankalp data and recordings. Religious-belief data under GDPR Art. 9 and DPDP 2023 needs a stated purpose, retention period and deletion path — which is incompatible with the shipped promise `HD recording, kept for good`. Change that copy, and handle the fact that recordings contain third parties' names and faces.
- State the on-site filming policy: what the camera frames, how bystanders are handled, and what permission exists at each ghat. Scheduling determines when the camera rolls, so it belongs here.
- Answer the two questions the spec leaves open. Is the rite performed when no one books — i.e. is 'the rite happens at a real place at a real hour' contingent on sales? And does Varsh 'Brahma muhurat priority' ever displace a booked person (it must not)? Both are honesty questions about claims already being made in `content.ts`. Also define Varsh redemption: expiry, rollover, and what happens to unredeemed snans — that is prepaid credit, and it is regulated.

### Must survive

- The sunrise→sunrise Hindu day with `panchangDate` stored separately from `ghatCivilDate`. This is the single best technical insight in the document and almost every competitor gets it wrong. A 04:24 Brahma Muhurat belongs to the previous panchang day — keep this verbatim, including the note that it is the common case for the flagship product, not an edge case.
- §1.5: tithi/nakshatra/yoga/karana are location-independent, but *which sunrise the tithi is running at* is local, therefore compute per-ghat and never assume 'one date for India'. Correct, subtle, and the reason Talakaveri and Haridwar will occasionally differ. Preserve.
- Per-occasion day resolution (`udaya | madhyahna | aparahna | pradosha | nishita`) instead of one global rule, with the explicit note that hardcoding one rule breaks exactly the commercially important days. This is the correct model and the correct reason.
- Kumbh / Ardh Kumbh / Shahi Snan as `kind: 'manual'` requiring `sourceUrl` + `approvedBy` + `approvedAt`, with the engine structurally unable to derive them, and marketing barred from naming a date before approval. This is the strongest integrity mechanism in the spec. Keep it word for word and extend the same shape elsewhere.
- Storing both Amanta and Purnimanta, with the correct observation that the tithi arithmetic is identical and only the Krishna-paksha month label differs. The Mahashivratri worked example (Magha Krishna Chaturdashi vs Phalguna Krishna Chaturdashi, same instant) is right and is exactly the kind of thing that earns credibility with a practising reader.
- Explicitly scoping OUT the Tamil/Bengali/Malayalam/Oriya solar calendars with an honest UI line, rather than faking them. 'Supporting them badly is worse than not supporting them' is the correct instinct and should be the house rule for every future scope decision.
- Labelling v1 Ekadashi as **Smarta** and saying so in the UI. Most Indian apps silently pick one and infuriate the other half. This costs nothing and signals to a knowledgeable user that you know what you don't know.
- Yoga and karana computed and displayed but never gating a slot, with the reasoning that a snan is not a new undertaking so Vishti/Bhadra does not apply. This is doctrinally correct restraint, correctly argued. It is the one place the spec resists the temptation to add fake piety.
- UTC instants + IANA zone ids only, never wall-clock, never `+05:30`, Temporal for arithmetic. Non-negotiable and correctly justified.
- The mandatory dual clock — ghat time in IST primary, user-local secondary, plus an explicit date-shift sentence whenever the calendar date differs. 'The ghat clock is the truth and demoting it to a parenthetical is dishonest' is the best sentence in the document and is a genuine brand differentiator, not just a UX rule.
- Derived capacity rather than hand-entered, so that a change in ceremony length or purohit count automatically reprices the calendar. Correct engineering. (The '108 sankalps' claim built on top of it is not — see risks.)
- 'A seat is a unit of the purohit's voice, not a headcount', and Parivar at 3 seats. Honest, legible, and it explains a pricing decision in terms of the rite rather than in terms of willingness to pay.
- Anti-manipulation encoded as a lint rule over the content file rather than a guideline, explicitly so it survives the first growth hire. Keep, and widen its scope (see fixes).
- The Rahu Kaal *mechanism* — a per-ghat `veto | warn` lever with the doctrinal question named as a priest-council call rather than an engineering one. The mechanism is right even though the default is wrong.
- Running astronomy-engine as a second independent implementation in CI. Two codebases agreeing is genuinely the cheapest correctness evidence available. (Fix the tolerance, keep the idea.)
- The dip-correction awareness and the commitment to publish a methodology page stating that terrain-horizon correction is not applied. The transparency instinct is right even where the physics is wrong.