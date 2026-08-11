# The Sky Slice: the Moon, the 27 nakshatras, and their join to the river

**A snan moment now has two coordinates: the water below and the moon above, both public, both checkable, both computed offline. Three files ship today and typecheck clean: 27 nakshatras with real stars whose positions are computed rather than quoted, a sky engine whose error bar is the ayanamsa and says so, and a seed that pairs GloFAS discharge with lunar position to give a return period of 32 to 286 years.**

# THE SKY

Three files are written, on disk, and typecheck clean against the repo as it stands:

- `/Users/sven/dev/snanify/src/content/nakshatra.ts` — the 27, typed, with load-time invariants
- `/Users/sven/dev/snanify/src/lib/sky.ts` — the computation layer
- `/Users/sven/dev/snanify/src/content/sky.ts` — full bilingual copy for the new surface

Everything below is either in those files or is a spec for what is not yet written (`SkyChart.tsx`, `seed.ts`, the routes).

---

## 0. WHAT WAS VERIFIED BEFORE ANYTHING WAS WRITTEN

Not asserted. Measured, with `astronomy-engine` already in the tree.

**The anchor check.** The Lahiri ayanamsa is *defined* by Spica sitting at sidereal 180°00'00". Run through our pipeline (astronomy-engine geocentric apparent ecliptic longitude, minus our ayanamsa polynomial), Spica lands at **179.993**. So the whole chain, ephemeris plus ayanamsa approximation, is inside **0.007°, about 25 arcseconds**, which the Moon crosses in 31 seconds of clock time. This is the one accuracy claim the product makes, and it is the strongest kind: a definitional quantity recovered by an independent route.

**All 27 junction stars verified.** Every `siderealLon` and `eclipticLat` in the data file was computed from the star's J2000 RA/Dec by `DefineStar` + `GeoVector` + `Ecliptic`, not copied from a table. A checker script re-derives all 59 objects (27 junction stars + 32 companions) from their own recorded RA/Dec and finds **0 mismatches beyond 0.06°**.

**Kartik Purnima 2026, the founding fact, sharpened.** Exact full moon (elongation 180°) is **2026-11-24T14:54:04Z = 20:24 IST**. At that instant the Moon is at sidereal **38.114°**, ecliptic latitude **+4.958°**, in **Krittika pada 4**, disc **99.81%** lit. Alcyone (η Tau, the Pleiades) is at sidereal **36.145°**, latitude +4.054°. So the full moon stands **1.97° from the Pleiades in longitude, 2.16° true separation, about four moon-widths**, on the night the month named after that cluster reaches its full moon. That is a better, more checkable claim than "in Krittika", and it is the one to print.

A second fact falls out and is worth having: the phase angle at that instant is **4.95°**, not zero, because the Moon is 5° off the antisolar point. That is exactly why there is no lunar eclipse that night, and it is why the terminator on the artefact is drawn as a real ellipse rather than a straight line.

**A live boundary case, for testing the honesty machinery.** At `2026-08-11T04:24:00Z` the Moon is in Punarvasu pada 4 with only **0.152°** to the edge; it leaves 15 minutes later; and under the Raman ayanamsa it is **already in Pushya**. The engine returns `boundary: "contested"` and both names.

---

## 1. THE NAKSHATRA MODEL

File: `src/content/nakshatra.ts`. Full contents in `nakshatraData`.

Per record: `index`, `id` (route slug), `name` (bilingual), `devanagari`, `meaning`, `deity`, `symbol`, `graha`, `star: SkyObject`, `companions: SkyObject[]`, `identification`, `segment: SegmentFit`, `signifies`.

`SkyObject` carries `designation`, `bayer` (set in Greek), `proper` (bilingual, nullable), `catalogue` (Messier/NGC where the marker is a cluster), `kind`, `magnitude`, `variable?`, `raJ2000Deg`, `decJ2000Deg`, and the two computed fields.

### The two decisions that make this file worth having

**(a) The scheme and the sky do not coincide, and the data says so.**

The 27 segments are equal 13°20' arcs. The stars are where they are. `SegmentFit.starInsideSegment` records the collision. **Seven junction stars fall outside the segment that bears their name:**

| Nakshatra | Star | Star at | Its segment | Short by |
|---|---|---|---|---|
| Uttara Ashadha | σ Sgr, Nunki | 258.54 | 266.67 to 280.00 | **8.13°** |
| Swati | α Boo, Arcturus | 180.39 | 186.67 to 200.00 | **6.28°** |
| Purva Ashadha | δ Sgr, Kaus Media | 250.73 | 253.33 to 266.67 | 2.60° |
| Shravana | α Aql, Altair | 277.93 | 280.00 to 293.33 | 2.07° |
| Ardra | α Ori, Betelgeuse | 64.91 | 66.67 to 80.00 | 1.76° |
| Dhanishta | β Del, Rotanev | 292.49 | 293.33 to 306.67 | 0.84° |
| Jyeshtha | α Sco, Antares | 225.91 | 226.67 to 240.00 | 0.75° |

Arcturus misses because it sits **+30.73°** north of the ecliptic; Altair **+29.30°**; Rotanev **+31.92°**. A star that far off the Moon's road has a longitude that means very little. Publishing this is not a caveat, it is the single most interesting thing on the page and nobody else prints it. `MISFIT_NAKSHATRAS` is exported so a surface can render the table directly.

**(b) Where sources disagree, both are named.** `identification.status` is `"contested"` for **eleven** of the 27, each with the rival designation and a bilingual note. Contested: Ashwini (β vs α Ari), Ardra (Betelgeuse vs Sirius, 20° apart), Ashlesha (ε Hya vs Alphard), Purva Phalguni (δ vs θ Leo), Hasta (δ vs γ Crv), Vishakha (α² vs ι Lib), Mula (λ vs ε Sco), Purva Ashadha (δ vs ε Sgr), Uttara Ashadha (σ vs ζ Sgr), Shatabhisha (γ vs λ Aqr), Uttara Bhadrapada (γ Peg vs Alpheratz).

Where the rival choice moves the marker across a segment boundary, the note says so with the number: Hamal computes to 13.81, inside Bharani; Alphard to 123.43, inside Magha; ε Sco to 231.49, inside Jyeshtha; Alpheratz to 350.46, inside Revati. `CONTESTED_NAKSHATRAS` is exported.

### Guardrails

- `graha` is documented in the file header as the **Vimshottari dasha lord**, a scheme of the later astrological literature, not a Vedic-era attribution. The copy repeats this.
- `signifies` is one accurate line about what a tradition associates with the station. Never a claim about a reader. This is stated as RULE 4 in the file header so the next person to touch it cannot miss it.
- **Load-time invariants throw at import**: not 27 records, out-of-order index, duplicate id, segment start disagreeing with index, longitude out of range, or `status: "contested"` with an empty `alternatives` array. Same discipline as `muhurat.ts`'s `assertProvenance`.

### Abhijit

Exported separately as `ABHIJIT`, deliberately not in the array, because `muhurat.ts` already ships an `abhijit` daily window and a reader meeting that name deserves an answer. Vega computes to sidereal **261.47°, ecliptic latitude +61.73°** — which lands in Purva Ashadha, nowhere near the slot tradition gives Abhijit (end of Uttara Ashadha into Shravana). The note explains why: Abhijit's place was always fixed by meridian transit, not by ecliptic longitude, which is precisely why the 28-fold scheme could not survive regularisation into 27 equal arcs of the ecliptic. That is a real explanation, not a hand-wave.

---

## 2. THE COMPUTATION LAYER

File: `src/lib/sky.ts`. Deterministic, server-side, offline. No API, no key, nothing to fail on a festival night.

```ts
readSky({ instant, coordinates?, ayanamsa? }): SkyReading
```

returns `{ instant, ayanamsa, ayanamsaDeg, tithi, nakshatra, phase, events, panchang, anchorCheck }`.

### Reuse of muhurat.ts, not duplication

- Imports and returns `Instant`, `Bilingual`, `PanchangProvenance` from `muhurat.ts`. Uses `asInstant` so every timestamp is validated UTC-with-Z.
- `TithiReading.numberInPaksha` is typed to match `OccasionRule.tithi` exactly, and `matchesOccasionRule(tithi, rule)` **consumes `muhurat.ts`'s `OccasionRule` unchanged**. There is no second scheduling model.
- `matchesOccasionRule` deliberately ignores `dayResolution`. Resolving an occasion onto a civil day needs a sunrise; `muhurat.ts` already refuses to fake that; this module does not sneak around it.
- Every `SkyReading` carries `panchang: { confidence: "provisional", source: "snanify-sky-1 (astronomy-engine)", computedAt, ayanamsa: "lahiri" }`. In this codebase `provisional` means *computed but not checked against a named almanac by a named human*. Computing a thing exactly is not the same as having it checked, and the type system will not let us blur that. The strong claim we are entitled to lives in a different field, `anchorCheck`, not in `confidence`.

### The accuracy statement, and where it actually bites

Stated in the module header and rendered in copy:

1. **Ephemeris.** We do not restate upstream's accuracy claims. We publish the one number we measured end to end: Spica at 179.993 against a definitional 180.000, so ≤25". Half a minute of lunar motion.
2. **Ayanamsa. This is the real error bar.** Lahiri (23.8531° at J2000), Krishnamurti (23.7642), Raman (22.4806) span **1.3725°**, which is **150 minutes** at the Moon's mean rate. `AYANAMSA_SPREAD_DEG` and `AYANAMSA_SPREAD_MINUTES` are computed from the table, not hard-coded.
3. **Per-instant, not mean.** `ayanamsaUncertaintyMinutes` is computed from the Moon's *instantaneous* rate via a one-hour central difference. Measured range across test instants: **131 min at 15.04°/day (near perigee) to 149 min at 13.22°/day**. Using the mean rate would misstate the window by up to a fifth.
4. **Rise and set need a survey.** `moonEvents(from, coordinates: Coordinates | null)` returns `{ status: "no-coordinates", rise: null, set: null, note }` when coordinates are null, which is the normal path for `muhurat.ts` ghats. There is no default lat/lon anywhere in the file.

### Boundary handling, concretely

`BoundaryState` is `"settled" | "near-edge" | "contested"`:

- **contested** — Lahiri, KP and Raman do not all name the same nakshatra. `alsoNamed[]` carries the dissenters. Two traditions in live use would report this moment differently.
- **near-edge** — the panel agrees but the Moon is within `AYANAMSA_SPREAD_DEG` (1.3725°) of an edge.
- **settled** — otherwise.

`nakshatraLine(reading, lang)` **cannot print a bare nakshatra name near a boundary**. Settled gives `"Krittika कृत्तिका pada 4"`. Near-edge appends `", close to the edge, 0° 47′ 12″ from it"`. Contested appends `", but on the boundary: by Raman this is Pushya"`. The formatting function is where the honesty is enforced, so a careless page component cannot bypass it.

### Ingress and tithi boundary search

`searchCrossing()` brackets in fixed 2 to 3 hour steps then hands the bracket to `Astro.Search` with 1-second tolerance. Fixed stepping rather than a linear guess, because the Moon's rate varies ~15% over an anomalistic month and a linear extrapolation steps past a root near perigee. Verified working: Purnima on 2026-11-24 resolves to start `2026-11-23T18:13:25Z`, end `2026-11-24T14:54:04Z`, **length 1241 minutes**. Tested tithi lengths ranged 1241 to 1422 minutes, i.e. 20h41m to 23h42m, which is the correct spread and a good line of copy on its own: *a tithi is not a day.*

One detail worth surfacing on the page, because most people have it backwards: **the tithi named Purnima ENDS at the instant of the astronomical full moon.** It spans elongation 168° to 180°. The full moon is its close, not its middle.

### Exports

`moonSiderealLon`, `readTithi`, `readNakshatra`, `readPhase`, `moonEvents`, `readSky`, `matchesOccasionRule`, `nakshatraSequence`, `formatDegrees` (Devanagari numerals in the Hindi edition), `nakshatraLine`, `tithiLine`, plus `AYANAMSAS`, `PHASE_NAMES`, `PAKSHA_NAMES`.

---

## 3. THE JOIN: RIVER PLUS SKY

**A correction that has to be made first.** The brief's "Ganga at 293.4m" is not a river stage. Checking `src/lib/riverdata.ts` (built in parallel), Haridwar's `elevationM` is **294** — that is the *ground elevation at the ghat*, used by the sun fallback. **There is no stage or water-level field anywhere in the product.** What actually exists is:

- `Discharge` in cumecs, from **GloFAS via Open-Meteo, modelled, one value per grid cell per day**, with `kind`, `modelledFor`, `ageDays`, `stale`, `percentile`, `trend`, `deltaPct`, `normal`, `series`
- an archive of **1997 to 2025, 29 years**, sampled in a 21-day window per ISO week (**609 samples per week**), at quantile knots **[5, 10, 30, 50, 70, 90, 95]**
- `bandFor(percentile)`: slack <10, low 10–30, usual 30–70, full 70–90, spate ≥90

So the seed must record a **modelled daily discharge**, never an instantaneous measured flow, and it must carry `modelledFor`, `ageDays` and `stale` so the record cannot be read as something it is not. This is rule one of the pivot doing its job.

### 3.1 The seed

The seed is a **canonical UTF-8 LF-joined key=value pre-image, hashed with SHA-256**. The printed record IS the pre-image. That is the whole design: anyone holding the artefact can retype the fields, hash them, and get the same digest. No trust required.

```
snanify/seed/1
ghat=ganga-haridwar
instant=2026-11-24T14:54:04Z
water.source=glofas-open-meteo
water.cell=29.925,78.125
water.kind=modelled
water.modelled_for=2026-11-24
water.age_days=0
water.cumecs=255.0
water.percentile=92.5
water.band=full
water.trend=rising
water.archive=1997-2025
moon.sidereal_deg=38.114
moon.ecliptic_lat_deg=4.958
moon.nakshatra=krittika
moon.pada=4
moon.tithi=shukla-15
moon.illumination=0.9981
moon.phase_angle_deg=4.95
ayanamsa=lahiri
engine=snanify-sky-1
```

**484 bytes.** Field order is fixed and normative. Numeric formatting is fixed: `sidereal_deg` and `ecliptic_lat_deg` to 3dp, `illumination` to 4dp, `phase_angle_deg` and `percentile` to 2dp, `cumecs` to 1dp. `water.kind=normal` replaces `modelled_for`/`age_days` with `for_date` and drops `trend`, so a seasonal median can never be dressed as a reading — the discriminated union in `riverdata.ts` is preserved into the seed.

```
sha256 = 736e94fca29415e848b19f6c40c37702068dec4e1d68d903aea07c243992b156
```

**The Mudra** is the top 60 bits of the digest in Crockford base32, grouped 4-4-4:

```
YAGJ-25Z9-9QDE
```

Twelve characters, no ambiguous glyphs, readable off paper and over a phone. It is a checksum of the world at that instant, not an identifier of a person.

**The seed contains no personal data at all.** Not a name, not a gotra, not an email. This is deliberate and it is what makes the seed safely public: it can be printed on the artefact, shared, and recomputed by strangers without touching the `/verify` privacy contract in `src/content/verify.ts`. Two people buying the same moment at the same ghat get the **same seed**, correctly, because the seed records the world and not the buyer. Uniqueness is carried separately by the **impression number** — printer's language, and exactly true: *Impression 3 of the Krittika/Purnima forme, 24 November 2026.*

### 3.2 What the seed drives on the plate

Direct mappings, so the print is legible as a record rather than as noise. Anything with a real referent is driven by the referent:

| Plate feature | Driven by | Not by the digest |
|---|---|---|
| Waterline height in the frame | `water.percentile` against the week's knots | ✓ real |
| Ripple density and channel amplitude | `log(water.cumecs)` | ✓ real |
| Streamline convergence | `water.trend` | ✓ real |
| Moon x, y on the chart | `moon.sidereal_deg`, `moon.ecliptic_lat_deg` | ✓ real |
| Terminator ellipse semi-minor axis | `r · cos(phase_angle_deg)` | ✓ real |
| Which object takes the vermillion | tithi: the moon disc on purnima/amavasya, otherwise the junction star | ✓ real |
| Nakshatra sector highlighted | `moon.nakshatra` | ✓ real |

Only the things with **no** real referent are read off the digest, and the artefact says so in its colophon:

- `digest[8] % 5` → engraving hatch angle, one of 15/30/45/60/75°
- `digest[9] / 255` → meander phase of the river bend
- `digest[10] % 6` → border ornament
- `digest[11] % 4` → deckle-edge variant

For the worked example: hatch 45°, meander 0.694, ornament 3, deckle 0.

### 3.3 Rarity, computed

**A 200-year census was actually run**, not estimated. Sampling the Moon once per day at 04:24 IST (the Brahma Muhurat opening) for **73,049 days**:

- possible (nakshatra, pada, tithi) states: 27 × 4 × 30 = **3,240**
- states that actually occur in 200 years: **3,240. All of them.**
- occurrences per state: **min 14, median 22, mean 22.55, max 31**
- so the **sky alone** has a return period of **6.45 to 14.29 years**, median **9.09**

Nakshatra shares came out 3.681% to 3.724% against a uniform 3.7037%, tithi shares 3.196% to 3.410% against 3.333% — so the near-uniformity is measured, not assumed, and the small departures are real (they come from the anomalistic variation in lunar speed).

**Water classes** are the intervals the archive can actually resolve, i.e. the knots that exist:

| Class | p |
|---|---|
| below p5 | 0.05 |
| p5–p10 | 0.05 |
| p10–p30 | 0.20 |
| p30–p50 | 0.20 |
| p50–p70 | 0.20 |
| p70–p90 | 0.20 |
| p90–p95 | 0.05 |
| above p95 | 0.05 |

We do **not** invent finer tail classes. A 29-year archive published at knots capped at the 5th and 95th percentiles cannot resolve a once-in-500-year flow, and pretending otherwise would be exactly the false precision this product exists to refuse. The consequence is stated openly: **the water term contributes at most a factor of 20.**

`trend` is recorded on the seed because it is real, but is **not** a rarity factor, because trend is not independent of level (a spate is usually rising) and `riverdata.ts` ships weekly quantile knots rather than the daily archive, so the joint cannot be measured. Multiplying it in anyway would be inventing a bigger number.

**The formula:**

```
R  =  1 / ( 365.2425 × p_sky × p_water )      years
p_sky   = census_count(nakshatra, pada, tithi) / 73049
p_water = the class probability above
```

**Measured range: 32.3 years to 286 years.** Worked example: Krittika/pada 4/shukla-15 occurs 22 times in 200 years, p_sky = 3.0117e-4; with discharge in p90–p95 (p_water = 0.05), **R = 182 years**. Sky alone would have given 9.1.

**Three impression marks**, thresholds published on the page, with the share of snan moments each covers computed from the same census:

| Mark | R | Share |
|---|---|---|
| छाप I / Impression I | under 80 years | **80.0%** |
| छाप II / Impression II | 80 to 180 years | **10.8%** |
| छाप III / Impression III | 180 years and above | **9.2%** |

Three, not five, because the distribution is genuinely bimodal (four water classes at p=0.20 carry 80% of days) and a five-band ladder forced onto it would have had one band holding 0.4% of the mass. The bands follow the data.

**Two assumptions, printed, not buried:** (i) `p_sky` and `p_water` are treated as independent; they are near-independent over long spans because the lunar and solar cycles only re-align every 19 years, but they are correlated within any single 19-year window. (ii) `p_sky` is measured over a 200-year forward census, not the historical record. When the daily GloFAS archive is ingested, **replace the multiplicative estimate with the empirical joint** cross-tabulated over the record's full length, and print that instead.

**And the sentence that must appear next to every R:** this is a fact about the world on that day. It is not a claim that the day is more auspicious. Rarity prices a print run; it does not price merit.

---

## 4. THE CROSS-TRADITION SURFACE

Routes:

- `/sky`, `/hi/sky` — tonight's moon, the star, the join, the six reckonings
- `/sky/[nakshatra]`, `/hi/sky/[nakshatra]` — 27 × 2 = **54 reference pages**, slugs are the search terms (`/sky/rohini`, `/sky/krittika`)
- add `nav.ts` key `sky` → `{ en: "The sky", hi: "आकाश" }` at `/sky`, inserted into `primaryNav` after `muhurat`
- redirect `/nakshatra` → `/sky` and `/nakshatra/[id]` → `/sky/[id]` in `next.config.ts`, because that is the phrase people type

Copy is complete in `src/content/sky.ts` (delivered in `copy`). Page order:

1. Masthead, hero. `"The river comes to you. So does the sky above it."` Badge: *Computed now, offline.*
2. **This moment** — the ruled data block: nakshatra, pada, marker star, tithi, paksha, disc lit, phase, sidereal longitude, ecliptic latitude, ingress and egress instants, tithi end, ayanamsa. Renders via `nakshatraLine()` / `tithiLine()`, so a near-edge or contested reading self-labels.
3. **The marker** — the real star, its designation, Bayer, magnitude, deity, symbol, graha (with the Vimshottari note), and the engraved chart.
4. **Where the scheme and the sky part company** — the seven-star table from `MISFIT_NAKSHATRAS`, plus the eleven contested identifications.
5. **The same moon, six reckonings** — the cross-tradition register.
6. **Where they do not agree, said plainly** — four paragraphs, deliberately longer than most of the individual entries.
7. **Water and sky, one instant** — the join panel: discharge, percentile, band, trend on one side; nakshatra, pada, tithi, illumination on the other; seed, Mudra, return period, impression mark below.
8. **How this is computed** — four numbered items, ending with provenance.
9. **What this is not** — four refusals.
10. **The whole circle** — the 27 as a register, linking to detail pages.
11. Abhijit.
12. CTA.

### The six reckonings, and the anti-syncretism rule

The register carries `tradition / turns on / the rule / at this moment / what we will not do`. Seven entries. The rule the file is written under, stated in its own header: *several traditions in India reckon by the moon; they do not reckon by it in the same way, and two of them do not use the astronomical moon at all.*

- **Hindu** — tithi and nakshatra together. Tithi is 12° of elongation, so it is not a day and runs 19 to 26 hours. Janmashtami named as the case where Ashtami must fall with Rohini. Purnimanta vs amanta named. Refusal: we do not rule which civil day an observance falls on, because that needs a sunrise, which needs a survey.
- **Buddhist** — the four quarters. Uposatha on new, full and both quarter days. Vesak on Vaisakha Purnima, gazetted in India. Ashadha Purnima as Dhamma Chakra Pravartana Day and the opening of Vassa. The Ambedkarite tradition named, including that its Deekshabhoomi anniversary is *not* lunar. Refusal: Indian, Sri Lankan, Thai and Tibetan reckonings do not always agree on Vesak; we announce none.
- **Jain** — tithi, and four parva tithis a month (both Ashtamis, both Chaturdashis). Mahavir Janma Kalyanak on Chaitra Shukla Trayodashi. Diwali as Mahavira's nirvana on Kartik amavasya. Shvetambara Samvatsari and Digambara Ananta Chaturdashi named as **not** coinciding. Refusal: we report the tithi and name the difference, we do not resolve it.
- **Sikh** — Puranmashi, for part of the calendar. Guru Nanak Dev Ji's Prakash Purab on Kattak di Puranmashi. Bandi Chhor Divas with Diwali. And the honest part: the **Nanakshahi calendar of 1999 moved most gurpurabs to fixed solar dates, and its revisions are disputed between the SGPC and other bodies**, so which gurpurabs are lunar today depends on which calendar a gurdwara keeps. Refusal: we state the disagreement exists, take no side, print no gurpurab date.
- **Muslim in India** — the first *sighting* of the crescent, not the conjunction. Earliest possible sighting is roughly 15 to 30 hours after conjunction depending on elongation, altitude at sunset and sky. Announced by local Ruet-e-Hilal committees; the date can differ city to city and from Saudi Arabia. **We print the Moon's age since conjunction and its elongation. That is astronomy. It is an input a committee may consider; it is not a date.** Refusal, in full: we will not predict a sighting, announce a month, or print a date for Ramadan, Eid, Muharram or Shab-e-Barat.
- **Christian in India** — a **tabular** moon, not this one. The ecclesiastical full moon comes from the epact table on a 19-year cycle and can differ from the astronomical full moon by up to about two days. Gregorian and Julian computus give different Sundays, so the Syriac and Orthodox churches in Kerala keep Easter on a different day from the Latin and Protestant churches in most years. Refusal: presenting the astronomical full moon as the paschal one is the commonest error made about this calendar, and we do not make it.
- **Parsi Zoroastrian** — nothing on this page. The Shahenshahi calendar is 365 days with no intercalation at all, so it drifts a day every four years; neither lunar nor astronomically solar; Fasli and Qadimi differ again. It is included because *a page about the moon in India that quietly left out a community for whom the moon does nothing would be making a claim by omission.*

Then the disagreement section, which does the real work:

- A full moon is not one thing. Four different observances landing on one night are not four versions of one thing.
- **Kartik Purnima is the clearest case.** Hindus, Sikhs and Jains all keep that night and the reasons have nothing to do with one another. Printing them under one heading would be the flattening the page exists to avoid, so they are printed as separate entries with separate reasons.
- Two of the six do not use the moon we compute.
- Even inside a tradition the calendar is contested: purnimanta vs amanta, Shvetambara vs Digambara, the Nanakshahi revisions. We name it and stop.

### SEO

`/sky/[nakshatra]` is the asset. 54 pages, each a genuine reference: name in both scripts, meaning, deity, symbol, graha, the real star with Bayer designation and magnitude, computed sidereal longitude and ecliptic latitude, the companions, the identification dispute where there is one, the segment span, and whether the star is inside it. Nobody else publishes the segment-fit gap. Structured data via the existing `StructuredData` component: `DefinedTerm` inside a `DefinedTermSet` for the 27, and `WebPage` per detail page.

---

## 5. THE VISUAL

New component: `src/components/SkyChart.tsx`. Two-colour letterpress. No gradients, no glows, no blurs, no rounded corners, no soft shadows. Enforced already by `globals.css` (`border-radius: 0 !important`), and nothing here needs an exception.

### Projection

**Sidereal ecliptic.** x = sidereal longitude, y = ecliptic latitude. Two modes from one geometry module.

**Band mode** (the landing page, and the head of `/sky`). A 60° window of the ecliptic centred on the Moon, drawn on a **large-radius circular arc** so the band bows across the frame — the ecliptic is literally a **ruled arc**, as the brief asks, not a straight rule. Longitude maps to arc angle at R = 2400 in a 1200-wide viewBox; latitude maps radially, 1° = 9.4 units.

**Critical constraint, from the data:** the latitude range must be **−17° to +34°**, not the ±16° that looks reasonable. Betelgeuse is at −16.02, Rotanev at +31.92, Arcturus at +30.73, Altair at +29.30. A ±16° crop silently drops three junction stars, which would make the chart quietly wrong in exactly the way the rest of this work refuses.

**Wheel mode** (the `/sky` hero and the artefact plate). Full 360° as an annulus. 27 radial hairlines at every 13°20'; every ninth heavier, marking the three groups of nine. Sector labels set on the arc: Devanagari in the Hindi edition, Latin caps in the English one.

### Marks

- **Star glyph.** Filled disc, radius a step function of magnitude: `mag ≤ 0 → 5.5; ≤1 → 4.5; ≤2 → 3.5; ≤3 → 2.6; ≤4 → 1.9; else 1.3`. Four radiating hairlines only for `mag ≤ 1.5`. No halo, no blur. Junction stars carry a 1px ruled tick down to the ecliptic arc, which is the engraver's way of saying *this one names the segment*.
- **Clusters.** Krittika (M45) and Pushya (M44) get a ruled open circle enclosing their member discs, drawn from the `companions` array. Not a fuzzy blob.
- **The Moon.** True circle, r = 14. The terminator is a **real half-ellipse of semi-minor axis `r · cos(phase_angle)`** using the seed's `phase_angle_deg` — which is why the worked example's 4.95° phase angle produces a visibly non-flat terminator on a "full" moon, and why the plate is honest about there being no eclipse. The dark limb is **not filled**; it is hatched at the digest's hatch angle, 1px lines at 3px pitch. Engraver's shade, not a fill.
- **The vermillion.** Exactly one object per plate takes `var(--spot)`: the Moon disc on purnima or amavasya, otherwise the junction star of the Moon's nakshatra. Decided by tithi, never for composition.
- **Two arcs, not one.** The ecliptic as a 1.5px solid ruled arc, and the **lunar path as a second dashed arc (2-2)** at ±5.145°. This is what makes the Moon's latitude legible as a fact rather than a drawing error, and it is what lets the page explain why Arcturus cannot be where its name says.
- **Boundary rendering.** When `boundary !== "settled"`, the segment edge nearest the Moon is drawn **doubled** — Lahiri's edge solid, the dissenting ayanamsa's edge as a hairline offset by its own degree difference, with a ruled bracket between them and the gap dimensioned in the margin like a drawing. The uncertainty becomes a piece of engraving rather than a footnote.

### Sitting beside the engraved river

`RiverFlow.tsx` runs a 1200 × 700 viewBox with `HORIZON = 232`, and currently fills `y ∈ [0, 232]` with `SKY_LINES = 15` horizontal hatch lines inside `clipPath #sky-{uid}`, plus the sun bindu at the vanishing point.

**The change is small and surgical.** Give `RiverFlow` an optional `sky?: React.ReactNode` prop. When present, render it inside the existing `<g clipPath={url(#skyClip)}>` in place of the hatch lines; keep the sun bindu. `SkyChart` in band mode renders into the same 1200-wide coordinate space at `height = 232`, so the ecliptic arc rises out of the far bank and the two engravings share one horizon and one register. No new SVG, no second viewBox, no changes to the animation loop or the `d`-attribute write path.

**On the Moon's placement above the water, an honest limit.** Putting the Moon at its true azimuth relative to the river's downstream bearing would be the right thing, and it needs a surveyed channel bearing at each ghat, which does not exist. So `SkyChart` accepts `bearingDeg: number | null`. While it is null the Moon is placed by **altitude only** (y), centred in x, and the caption says so. When a bearing is surveyed, x becomes real and the caption changes. Same discipline as `coordinates: null` in `muhurat.ts`.

Note that `riverdata.ts` *does* carry ghat coordinates (`ganga-haridwar: [29.9457, 78.1642], elevationM: 294`), map-derived rather than surveyed. So moonrise **is** computable — pass them to `moonEvents` and label them "mapped coordinates, not a survey". Verified for Kartik Purnima 2026 at Haridwar: **moonrise 11:19:12Z = 16:49 IST, moonset 00:51:47Z = 06:21 IST**. The full moon rising just before sunset is the correct signature.

Static render: no `requestAnimationFrame`. The chart is markup, computed server-side and shipped as a plain SVG. Print does not animate, and the sky does not move at 60fps.

### The artefact plate

Three registers on one forme, portrait:

1. **Sky**, top two-thirds: wheel-mode chart, Moon marked, ecliptic ruled, the nakshatra sector opened out.
2. **The horizon rule**, carrying the Mudra in letterpress caps and the impression number.
3. **Water**, bottom third: `RiverFlow`'s geometry frozen to a single still engraving, waterline set by percentile, ripple density by discharge.

Colophon block at the foot, `boxed`, `tint`: the full seed pre-image in 6pt tabular, the SHA-256, the return period with its two factors, the impression mark with its published thresholds, and one line naming which plate features came from the digest rather than from the world.

---

## FILES TO WRITE NEXT

| Path | What |
|---|---|
| `src/lib/seed.ts` | pre-image builder, SHA-256, Crockford base32 Mudra, rarity |
| `src/lib/skycensus.json` | the 3,240-entry census table, generated, checked in |
| `src/components/SkyChart.tsx` | band + wheel modes |
| `src/components/RiverFlow.tsx` | add the `sky?` slot (about 6 lines) |
| `src/app/[lang]/sky/page.tsx` | + `[nakshatra]/page.tsx` |
| `src/components/pages/Sky.tsx` | + `NakshatraDetail.tsx` |
| `src/lib/nav.ts` | the `sky` key |


---

## Copy

// FILE: /Users/sven/dev/snanify/src/content/sky.ts
// Status: written, on disk, typechecks clean. hi is checked against the shape of
// en via `satisfies Record<Lang, typeof en>`, so a missing translation is a
// compile error rather than an English string in a Hindi page.

import type { Lang } from "@/lib/content";

/* ---------------------------------------------------------------------------
   Copy for /sky and /sky/[nakshatra].

   THE RULE THIS FILE IS WRITTEN UNDER. Several traditions in India reckon by
   the moon. They do not reckon by it in the same way, they do not agree about
   what a full moon is for, and two of them do not use the astronomical moon at
   all. This page states each tradition in its own terms and then states, in a
   section of its own, exactly where they part company. It never says "all
   faiths celebrate the moon". They do not. Some of them keep the same date for
   entirely different reasons, and that is a more interesting fact than the
   flattened one.

   The page also never predicts a religious date. It reports an astronomical
   position and names the rules that other people apply to it. The crescent
   sighting that opens a Hijri month is decided by a sighting committee, not by
   an ephemeris, and the moon that fixes Easter is a tabular fiction that is
   deliberately not the real one. Both are said so, in both languages.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "The moon tonight, and the star it stands in",
    description:
      "Where the moon is right now, computed offline: its nakshatra, the real star that marks it, its tithi and phase. And what that lunar moment means in the Hindu, Buddhist, Jain, Sikh, Muslim and Christian calendars kept in India, stated separately, because they do not agree.",
    listTitle: "The 27 nakshatras, and the stars that mark them",
    listDescription:
      "All 27 nakshatras with their deity, symbol, presiding graha and, for each, the real star or cluster that marks it, with its Bayer designation and computed sidereal position.",
  },

  nav: { back: "All 27 nakshatras", river: "The river now", muhurat: "The calendar" },

  hero: {
    eyebrow: "The sky",
    title: "The river comes to you.",
    titleB: "So does the sky above it.",
    lede: "Two public, checkable things meet at a single instant: the water level and flow of a real river, and the position of the moon against the fixed stars. Neither is ours. Both can be verified by anyone. Everything on this page is computed on our own server from an ephemeris, with no network call and no astrology service, and the arithmetic is published.",
    liveBadge: "Computed now, offline",
  },

  tonight: {
    eyebrow: "This moment",
    title: "Where the moon is.",
    labels: {
      nakshatra: "Nakshatra",
      pada: "Pada",
      star: "Marked by",
      tithi: "Tithi",
      paksha: "Paksha",
      illumination: "Disc lit",
      phase: "Phase",
      sidereal: "Sidereal longitude",
      latitude: "Ecliptic latitude",
      moonrise: "Moonrise",
      moonset: "Moonset",
      ayanamsa: "Ayanamsa",
      entered: "Entered this nakshatra",
      leaves: "Leaves it",
      tithiEnds: "This tithi ends",
    },
    boundaryHeading: "This reading is near a boundary",
    boundaryBody:
      "The moon is close to the edge of its segment. Panchangs in ordinary use disagree about where that edge is by up to 1.37 degrees, which the moon crosses in about two and a half hours, so a reading this close to an edge is a reading two traditions would report differently. Both names are printed above. Neither is wrong.",
    contestedHeading: "Two traditions would name this moment differently",
  },

  star: {
    eyebrow: "The marker",
    title: "A real star, not a symbol.",
    lede: "Each of the 27 divisions is named after a star or cluster that a person can go outside and find. Rohini is Aldebaran, the red eye of Taurus. Chitra is Spica. Jyeshtha is Antares. Krittika is the Pleiades. Positions here are computed from catalogue coordinates, not copied from a table.",
    labels: {
      designation: "Designation",
      bayer: "Bayer",
      magnitude: "Magnitude",
      kind: "Kind",
      catalogue: "Catalogue",
      deity: "Deity",
      symbol: "Symbol",
      graha: "Presiding graha",
      meaning: "The name means",
      segment: "Segment",
    },
    grahaNote:
      "The presiding graha comes from the Vimshottari dasha scheme of the later astrological literature. It is recorded here because it is part of how the station is named and taught, not as a claim about anybody.",
  },

  drift: {
    eyebrow: "Where the scheme and the sky part company",
    title: "Seven stars are not in their own segment.",
    lede: "The 27 divisions are equal arcs of 13 degrees 20 minutes. The stars are where they are. These two things were close when the scheme was fixed and they are not identical now, and seven junction stars fall outside the segment that carries their name. Nunki misses by more than eight degrees; Arcturus, which sits 31 degrees north of the moon's road, misses by six. We publish the gap instead of quietly rounding it away.",
    columns: { nakshatra: "Nakshatra", star: "Star", starAt: "Star at", segment: "Its segment", gap: "Short by" },
    contestedHeading: "Eleven where the sources disagree about the star",
    contestedLede:
      "For eleven of the 27, lists in ordinary use name different junction stars. Where that happens the rival is named in the data with its designation, and where the choice moves the marker across a segment boundary that is said too. We do not pick the brighter star and hope nobody checks.",
  },

  calendars: {
    eyebrow: "The same moon, six reckonings",
    title: "What this lunar moment is, in the calendars kept in India.",
    lede: "Every tradition below turns on the moon, but not on the same feature of it, and not by the same rule. Read them separately. Two of them are on this page precisely because their moon is not the one we just computed.",
    usesLabel: "Turns on",
    ruleLabel: "The rule",
    thisMomentLabel: "At this moment",
    cautionLabel: "What we will not do",

    entries: [
      {
        id: "hindu",
        tradition: "Hindu",
        uses: "Tithi and nakshatra together",
        rule: "A tithi is 12 degrees of the moon's elongation from the sun, so it is not a day and its length runs from about 19 to about 26 hours. Most festivals are fixed by tithi. Some are fixed by nakshatra instead, and a few by both, Janmashtami being the well-known case of Ashtami falling with Rohini. The muhurat traditions add the nakshatra on top of the tithi. Purnimanta and amanta reckoning name the same lunar month differently in the north and the south; the ghat pages carry which scheme each place keeps.",
        moment:
          "The tithi and the nakshatra are both printed above, with the instant each one turns.",
        caution:
          "We compute the position. We do not rule on which civil day an observance falls on, because that needs a sunrise, a sunrise needs surveyed coordinates for the place, and we do not have them.",
      },
      {
        id: "buddhist",
        tradition: "Buddhist",
        uses: "The four lunar quarters",
        rule: "Uposatha is observed on the new moon, the full moon and the two quarter days. Vesak, Buddha Purnima, falls on the full moon of Vaisakha and is a gazetted holiday in India. Ashadha Purnima is Dhamma Chakra Pravartana Day, kept as the anniversary of the first sermon at Sarnath, and opens Vassa, the rains retreat. The Ambedkarite tradition in Maharashtra keeps these days alongside the Theravada lineages, and adds days of its own that are not lunar at all, the Deekshabhoomi anniversary being fixed to Ashoka Vijayadashami.",
        moment: "The phase and the days to the next full and new moon are printed above.",
        caution:
          "Different Buddhist countries settle the calendar differently and the Indian, Sri Lankan, Thai and Tibetan reckonings do not always give the same date for Vesak. We do not announce one.",
      },
      {
        id: "jain",
        tradition: "Jain",
        uses: "Tithi, and four parva days each month",
        rule: "The two Ashtamis and the two Chaturdashis of each month are parva tithis and are widely kept as days of fasting and pratikraman. Mahavir Janma Kalyanak falls on Chaitra Shukla Trayodashi. Diwali is kept as the nirvana of Mahavira and falls on the Kartik amavasya. Paryushan in the Shvetambara tradition ends on Samvatsari; Das Lakshana in the Digambara tradition ends on Ananta Chaturdashi, and the two do not coincide.",
        moment: "Whether this tithi is one of the four parva tithis is stated in the panel above.",
        caution:
          "Shvetambara and Digambara calendars differ, including on the date of Paryushan and on Mahavir Jayanti in some years. We report the tithi and name the difference, we do not resolve it.",
      },
      {
        id: "sikh",
        tradition: "Sikh",
        uses: "Puranmashi, the full moon, for part of the calendar",
        rule: "Guru Nanak Dev Ji's Prakash Purab is kept on Kattak di Puranmashi, the full moon of Kartik. Bandi Chhor Divas falls with Diwali on the Kartik amavasya. Hola Mohalla follows Holi. Most other gurpurabs were moved to fixed solar dates by the Nanakshahi calendar adopted in 1999, and the later revisions to that calendar are themselves disputed between the SGPC and other bodies, so which gurpurabs are lunar today depends on which calendar a gurdwara keeps.",
        moment: "Whether this is Puranmashi or the amavasya is printed above.",
        caution:
          "The Nanakshahi calendar is a live disagreement inside the Panth. We state that it exists. We do not take a side in it and we do not print a gurpurab date.",
      },
      {
        id: "muslim",
        tradition: "Muslim, in India",
        uses: "The first sighting of the crescent",
        rule: "A Hijri month begins when the new crescent is actually seen, not when the astronomical conjunction happens. The conjunction is the moment the moon and sun share a longitude, and the earliest possible sighting is roughly fifteen to thirty hours after it, depending on elongation, the moon's altitude at sunset and the sky. In India the decision is announced by local Ruet-e-Hilal committees, and the announced date can differ between cities and from the date kept in Saudi Arabia.",
        moment:
          "We print the moon's age since conjunction and its elongation from the sun. That is astronomy. It is an input a committee may consider; it is not a date.",
        caution:
          "We will not predict a sighting, announce the start of a month, or print a date for Ramadan, Eid, Muharram or Shab-e-Barat. That decision belongs to the committees that make it and we have no standing in it.",
      },
      {
        id: "christian",
        tradition: "Christian, in India",
        uses: "A tabular moon, not this one",
        rule: "Easter is the first Sunday after the ecclesiastical full moon that falls on or after 21 March. The ecclesiastical full moon is computed from a table, the epact, built on a 19-year cycle, and it is deliberately not the astronomical full moon; the two can differ by up to about two days. The Gregorian computus gives one date and the Julian computus another, so the Syriac and Orthodox churches in Kerala and elsewhere keep Easter on a different Sunday from the Latin and Protestant churches in most years.",
        moment:
          "Nothing on this page feeds the computus. The moon we compute is the real one, and the moon that fixes Easter is not.",
        caution:
          "We do not print an Easter date and we do not present the astronomical full moon as the paschal one. Saying they are the same thing is the commonest error made about this calendar.",
      },
      {
        id: "parsi",
        tradition: "Parsi Zoroastrian",
        uses: "Nothing on this page",
        rule: "The Shahenshahi calendar in general use among Parsis in India is a 365-day calendar with no intercalation at all, so it drifts against the seasons by about a day every four years. It is neither lunar nor astronomically solar. The Fasli and Qadimi calendars in use by smaller communities differ again.",
        moment: "No reading on this page has any bearing on it.",
        caution:
          "This entry is here because a page about the moon in India that quietly left out a community for whom the moon does nothing would be making a claim by omission.",
      },
    ],

    disagreementHeading: "Where they do not agree, said plainly",
    disagreements: [
      "A full moon is not one thing. For a Hindu it closes the bright half of a month; for a Theravada Buddhist it is an uposatha day; for a Sikh, Kattak di Puranmashi is the Prakash Purab of Guru Nanak Dev Ji; for a Jain, Kartik Purnima is a day of pilgrimage to Shatrunjaya. These are four different observances that happen to land on the same night. They are not four versions of one thing.",
      "Kartik Purnima is the clearest case. Hindus, Sikhs and Jains all keep that night, and the reasons have nothing to do with one another. Printing them under a single heading would be the flattening this page exists to avoid, so they are printed as separate entries with separate reasons.",
      "Two of the six do not use the moon we compute. The Hijri month waits on a human sighting, and Easter uses a tabular moon that is deliberately not the astronomical one. Presenting either as an output of an ephemeris would be wrong on the astronomy as well as disrespectful of the practice.",
      "Even inside a single tradition the calendar is contested. Purnimanta against amanta among Hindus, Shvetambara against Digambara among Jains, and the Nanakshahi revisions among Sikhs are all live. We name the disagreement and stop there.",
    ],
  },

  join: {
    eyebrow: "Water and sky, one instant",
    title: "A snan moment has two coordinates.",
    lede: "The river gives a level and a flow. The sky gives a nakshatra, a pada, a tithi and a lit fraction. Together they name a moment far more tightly than either does alone, and both halves are public data that anybody can go and check against the source.",
    riverLabel: "The water",
    skyLabel: "The sky",
    seedLabel: "Seed",
    mudraLabel: "Mudra",
    rarityLabel: "Return period",
    rarityNote:
      "How often this pairing of water and sky recurs at this ghat, computed from a 200-year ephemeris census and the gauge station's own record. It is a fact about the world on that day. It is not a claim that the day is more auspicious, and nothing here should be read as one.",
  },

  method: {
    eyebrow: "How this is computed",
    title: "The arithmetic, and its limits.",
    items: [
      {
        n: "01",
        t: "Offline and deterministic",
        d: "Positions come from an ephemeris that runs on our own server. There is no astrology API, no key and nothing to fail on a festival night. The same instant produces the same reading on any machine, and it will still produce it in ten years.",
      },
      {
        n: "02",
        t: "One measurable check",
        d: "The Lahiri ayanamsa is defined by Spica sitting at sidereal 180 degrees exactly. Run through our pipeline, Spica comes out at 179.993. So the whole chain, ephemeris and ayanamsa together, is inside about 25 arcseconds, which the moon crosses in half a minute.",
      },
      {
        n: "03",
        t: "The ayanamsa is the real error bar",
        d: "Those 25 arcseconds are not what limits us. Lahiri, Krishnamurti and Raman, all in ordinary Indian use, span 1.37 degrees, about two and a half hours of lunar motion. A nakshatra ingress is knowable to a second within one tradition and to two and a half hours across them. When the moon is inside that margin we say so and print both names.",
      },
      {
        n: "04",
        t: "No moonrise without a survey",
        d: "Moonrise and moonset need the exact position of the ghat. None of the six has been surveyed, so no rise time is printed for them. An approximate lat and lon would give an answer that looks precise and is not, which is the one thing this site is built not to do.",
      },
    ],
    provenanceHeading: "Provenance",
    provenanceBody:
      "Every reading here is labelled provisional. In this codebase provisional means computed but not checked against a named almanac by a named person, and computing a thing exactly is not the same as having it checked. When a panchang provider is contracted and a sample of days has been reconciled, the label changes and this paragraph changes with it.",
  },

  notClaimed: {
    eyebrow: "What this is not",
    title: "Four things this page does not do.",
    items: [
      "It does not tell you anything about your life. The line under each nakshatra says what a tradition associates with that station. It is not a reading, a prediction, or a statement about anyone's character, health, marriage or money, and it never will be.",
      "It does not perform anything. Nothing on this page is a rite and nobody has stood in any water on your behalf. Snanify is a digital experience and says so.",
      "It does not announce religious dates. It reports where the moon is and names the rules other people apply to it. Deciding a date is the business of the committees, the panchang makers and the priests who do that work.",
      "It does not claim the traditions agree. Six reckonings are set out separately above, and the section on where they part company is longer than most of them.",
    ],
  },

  list: {
    eyebrow: "The whole circle",
    title: "Twenty-seven stations, twenty-seven stars.",
    lede: "The moon crosses one of these roughly every day, taking about 24 hours and 20 minutes over each, and returns to the first in 27.3 days. Each entry gives the deity, the symbol, the presiding graha and the real star that marks it, with its designation and its computed position.",
    columns: {
      n: "No.",
      name: "Nakshatra",
      span: "Span",
      star: "Star",
      magnitude: "Mag.",
      deity: "Deity",
    },
    misfitFlag: "Star outside its segment",
    contestedFlag: "Star identification contested",
  },

  detail: {
    signifiesTitle: "What tradition associates with it",
    starTitle: "The star that marks it",
    companionsTitle: "The others in the group",
    identificationTitle: "Which star, and who disagrees",
    segmentTitle: "The segment, and where the star actually is",
    insideSegment: "The junction star falls inside the segment named after it.",
    outsideSegment:
      "The junction star does not fall inside the segment named after it. The gap is printed above and is not an error in the data.",
    prev: "Previous station",
    next: "Next station",
  },

  abhijit: {
    eyebrow: "The twenty-eighth",
    title: "Abhijit, and why it is not here.",
  },

  cta: {
    title: "The water, and the star above it.",
    lede: "Pick a river. The sky is computed for whichever one you pick, at whichever moment you pick.",
    primary: "The six waters",
    secondary: "The calendar",
  },
};

const hi: typeof en = {
  meta: {
    title: "आज रात का चंद्रमा, और वह तारा जिसमें वह खड़ा है",
    description:
      "इस क्षण चंद्रमा कहाँ है, बिना नेटवर्क के गणना किया हुआ: उसका नक्षत्र, उसे चिह्नित करने वाला वास्तविक तारा, तिथि और कला। और भारत में रखे जाने वाले हिंदू, बौद्ध, जैन, सिख, मुस्लिम तथा ईसाई पंचांगों में उस चांद्र क्षण का क्या अर्थ है, अलग-अलग बताया गया, क्योंकि उनमें सहमति नहीं है।",
    listTitle: "सत्ताईस नक्षत्र, और उन्हें चिह्नित करने वाले तारे",
    listDescription:
      "सभी 27 नक्षत्र, उनके देवता, प्रतीक, अधिपति ग्रह, और प्रत्येक के लिए वह वास्तविक तारा या तारागुच्छ जो उसे चिह्नित करता है, बायर पदनाम तथा गणना की गई निरयन स्थिति सहित।",
  },

  nav: { back: "सभी 27 नक्षत्र", river: "अभी की नदी", muhurat: "पंचांग" },

  hero: {
    eyebrow: "आकाश",
    title: "नदी आप तक आती है।",
    titleB: "उसके ऊपर का आकाश भी।",
    lede: "दो सार्वजनिक, जाँची जा सकने वाली वस्तुएँ एक ही क्षण पर मिलती हैं: एक वास्तविक नदी का जलस्तर तथा प्रवाह, और स्थिर तारों के सापेक्ष चंद्रमा की स्थिति। दोनों में से कोई हमारी नहीं। दोनों कोई भी जाँच सकता है। इस पृष्ठ की हर बात हमारे अपने सर्वर पर एक ephemeris से गणना की जाती है, बिना किसी नेटवर्क अनुरोध और बिना किसी ज्योतिष सेवा के, और गणित प्रकाशित है।",
    liveBadge: "अभी गणना किया गया, बिना नेटवर्क",
  },

  tonight: {
    eyebrow: "यह क्षण",
    title: "चंद्रमा कहाँ है।",
    labels: {
      nakshatra: "नक्षत्र",
      pada: "चरण",
      star: "चिह्नक तारा",
      tithi: "तिथि",
      paksha: "पक्ष",
      illumination: "प्रकाशित भाग",
      phase: "कला",
      sidereal: "निरयन देशांतर",
      latitude: "क्रांतिवृत्तीय अक्षांश",
      moonrise: "चंद्रोदय",
      moonset: "चंद्रास्त",
      ayanamsa: "अयनांश",
      entered: "इस नक्षत्र में प्रवेश",
      leaves: "निर्गम",
      tithiEnds: "यह तिथि समाप्त",
    },
    boundaryHeading: "यह गणना सीमा के निकट है",
    boundaryBody:
      "चंद्रमा अपने खंड के किनारे के पास है। प्रचलित पंचांग उस किनारे की स्थिति पर 1.37 अंश तक असहमत हैं, जिसे चंद्रमा लगभग ढाई घंटे में पार करता है, अतः किनारे के इतने निकट की गणना वह है जिसे दो परंपराएँ भिन्न रूप से बताएँगी। ऊपर दोनों नाम छापे गए हैं। दोनों में से कोई ग़लत नहीं।",
    contestedHeading: "इस क्षण को दो परंपराएँ भिन्न नाम देंगी",
  },

  star: {
    eyebrow: "चिह्नक",
    title: "एक वास्तविक तारा, प्रतीक नहीं।",
    lede: "सत्ताईस विभागों में से प्रत्येक का नाम उस तारे या तारागुच्छ पर है जिसे कोई भी बाहर निकलकर ढूँढ सकता है। रोहिणी अल्देबरान है, वृषभ की रक्तिम आँख। चित्रा स्पाइका है। ज्येष्ठा अंतारेस। कृत्तिका कृत्तिका-गुच्छ, प्लीएडीज़। यहाँ की स्थितियाँ सूची-निर्देशांकों से गणना की गई हैं, किसी तालिका से उतारी नहीं गईं।",
    labels: {
      designation: "पदनाम",
      bayer: "बायर",
      magnitude: "कांतिमान",
      kind: "प्रकार",
      catalogue: "सूची",
      deity: "देवता",
      symbol: "प्रतीक",
      graha: "अधिपति ग्रह",
      meaning: "नाम का अर्थ",
      segment: "खंड",
    },
    grahaNote:
      "अधिपति ग्रह परवर्ती ज्योतिष साहित्य की विंशोत्तरी दशा पद्धति से आता है। यह यहाँ इसलिए दर्ज है कि नक्षत्र का नामकरण और शिक्षण इसी के साथ होता है, किसी व्यक्ति के विषय में कोई दावा करने के लिए नहीं।",
  },

  drift: {
    eyebrow: "जहाँ योजना और आकाश अलग हो जाते हैं",
    title: "सात तारे अपने ही खंड में नहीं हैं।",
    lede: "सत्ताईस विभाग 13 अंश 20 कला के समान चाप हैं। तारे जहाँ हैं वहीं हैं। योजना जब निश्चित हुई तब ये दोनों निकट थे, आज समरूप नहीं, और सात योगतारे उस खंड के बाहर पड़ते हैं जो उनका नाम धारण करता है। नुंकी आठ अंश से अधिक चूकता है; आर्कटुरस, जो चंद्रपथ से 31 अंश उत्तर बैठता है, छह अंश से। हम इस अंतर को चुपचाप गोल करने के बजाय प्रकाशित करते हैं।",
    columns: { nakshatra: "नक्षत्र", star: "तारा", starAt: "तारा यहाँ", segment: "उसका खंड", gap: "इतना पीछे" },
    contestedHeading: "ग्यारह, जहाँ तारे को लेकर स्रोत असहमत हैं",
    contestedLede:
      "सत्ताईस में से ग्यारह के लिए प्रचलित सूचियाँ भिन्न योगतारे बताती हैं। जहाँ ऐसा है, प्रतिद्वंद्वी तारा अपने पदनाम सहित आँकड़ों में नामित है, और जहाँ यह चुनाव चिह्नक को खंड-सीमा के पार ले जाता है, वह भी लिखा है। हम अधिक चमकीला तारा चुनकर यह आशा नहीं करते कि कोई जाँचेगा नहीं।",
  },

  calendars: {
    eyebrow: "वही चंद्रमा, छह गणनाएँ",
    title: "भारत में रखे जाने वाले पंचांगों में इस चांद्र क्षण का क्या अर्थ है।",
    lede: "नीचे की हर परंपरा चंद्रमा पर चलती है, किंतु उसके एक ही लक्षण पर नहीं, और एक ही नियम से नहीं। इन्हें अलग-अलग पढ़िए। इनमें से दो इस पृष्ठ पर ठीक इसलिए हैं कि उनका चंद्रमा वह नहीं है जिसकी हमने अभी गणना की।",
    usesLabel: "किस पर चलता है",
    ruleLabel: "नियम",
    thisMomentLabel: "इस क्षण",
    cautionLabel: "जो हम नहीं करेंगे",

    entries: [
      {
        id: "hindu",
        tradition: "हिंदू",
        uses: "तिथि और नक्षत्र, दोनों साथ",
        rule: "तिथि सूर्य से चंद्रमा की 12 अंश की दूरी है, अतः वह दिन नहीं है और उसकी अवधि लगभग 19 से 26 घंटे तक चलती है। अधिकांश पर्व तिथि से निश्चित होते हैं। कुछ नक्षत्र से, और कुछ दोनों से, जन्माष्टमी वह प्रसिद्ध स्थिति है जहाँ अष्टमी रोहिणी के साथ पड़ती है। मुहूर्त परंपरा तिथि के ऊपर नक्षत्र भी जोड़ती है। पूर्णिमांत और अमांत गणना उत्तर और दक्षिण में एक ही चांद्र मास को भिन्न नाम देती है; कौन-सा स्थान कौन-सी पद्धति रखता है, यह घाट के पृष्ठों पर अंकित है।",
        moment: "तिथि और नक्षत्र दोनों ऊपर छपे हैं, उनके बदलने के क्षण सहित।",
        caution:
          "हम स्थिति की गणना करते हैं। कौन-सा पर्व किस सिविल दिन पड़ेगा, इसका निर्णय हम नहीं देते, क्योंकि उसके लिए सूर्योदय चाहिए, सूर्योदय के लिए स्थान के सर्वेक्षित निर्देशांक चाहिए, और वे हमारे पास नहीं हैं।",
      },
      {
        id: "buddhist",
        tradition: "बौद्ध",
        uses: "चंद्रमा के चार चरण",
        rule: "उपोसथ अमावस्या, पूर्णिमा तथा दोनों अष्टमियों को रखा जाता है। वेसाक, बुद्ध पूर्णिमा, वैशाख की पूर्णिमा को पड़ती है और भारत में राजपत्रित अवकाश है। आषाढ़ पूर्णिमा धम्मचक्र प्रवर्तन दिवस है, सारनाथ के प्रथम उपदेश की स्मृति में, और वर्षावास का आरंभ। महाराष्ट्र की आंबेडकरवादी परंपरा इन दिनों को थेरवाद परंपराओं के साथ रखती है, और अपने कुछ दिन जोड़ती है जो चांद्र हैं ही नहीं, जैसे दीक्षाभूमि की वर्षगाँठ, जो अशोक विजयादशमी से बँधी है।",
        moment: "कला तथा अगली पूर्णिमा और अमावस्या तक के दिन ऊपर छपे हैं।",
        caution:
          "भिन्न बौद्ध देश पंचांग भिन्न रूप से निश्चित करते हैं और भारतीय, श्रीलंकाई, थाई तथा तिब्बती गणनाएँ वेसाक की एक ही तिथि सदा नहीं देतीं। हम कोई एक घोषित नहीं करते।",
      },
      {
        id: "jain",
        tradition: "जैन",
        uses: "तिथि, और प्रत्येक मास के चार पर्व दिन",
        rule: "प्रत्येक मास की दोनों अष्टमियाँ तथा दोनों चतुर्दशियाँ पर्व तिथियाँ हैं और व्यापक रूप से उपवास तथा प्रतिक्रमण के दिन के रूप में रखी जाती हैं। महावीर जन्म कल्याणक चैत्र शुक्ल त्रयोदशी को पड़ता है। दीपावली महावीर के निर्वाण के रूप में रखी जाती है और कार्तिक अमावस्या को पड़ती है। श्वेतांबर परंपरा में पर्युषण संवत्सरी पर समाप्त होता है; दिगंबर परंपरा में दस लक्षण अनंत चतुर्दशी पर, और दोनों एक साथ नहीं पड़ते।",
        moment: "यह तिथि चार पर्व तिथियों में से है या नहीं, यह ऊपर के पटल में लिखा है।",
        caution:
          "श्वेतांबर और दिगंबर पंचांग भिन्न हैं, पर्युषण की तिथि सहित और कुछ वर्षों में महावीर जयंती पर भी। हम तिथि बताते हैं और अंतर नामित करते हैं, उसका निपटारा नहीं करते।",
      },
      {
        id: "sikh",
        tradition: "सिख",
        uses: "पूरनमाशी, पूर्णिमा, पंचांग के एक भाग के लिए",
        rule: "गुरु नानक देव जी का प्रकाश पुरब कत्तक दी पूरनमाशी को, कार्तिक की पूर्णिमा को रखा जाता है। बंदी छोड़ दिवस दीपावली के साथ कार्तिक अमावस्या को पड़ता है। होला मोहल्ला होली के पश्चात्। शेष अधिकांश गुरपुरब 1999 में स्वीकृत नानकशाही पंचांग द्वारा स्थिर सौर तिथियों पर ले जाए गए, और उस पंचांग के बाद के संशोधन स्वयं शिरोमणि गुरुद्वारा प्रबंधक कमेटी तथा अन्य संस्थाओं के बीच विवादित हैं, अतः आज कौन-से गुरपुरब चांद्र हैं, यह इस पर निर्भर है कि कोई गुरुद्वारा कौन-सा पंचांग रखता है।",
        moment: "यह पूरनमाशी है या अमावस्या, ऊपर छपा है।",
        caution:
          "नानकशाही पंचांग पंथ के भीतर एक जीवंत असहमति है। हम इतना कहते हैं कि वह है। हम उसमें पक्ष नहीं लेते और कोई गुरपुरब तिथि नहीं छापते।",
      },
      {
        id: "muslim",
        tradition: "मुस्लिम, भारत में",
        uses: "नए चाँद का पहला दीदार",
        rule: "हिजरी मास तब आरंभ होता है जब नया चाँद वास्तव में देखा जाता है, तब नहीं जब खगोलीय युति होती है। युति वह क्षण है जब चंद्र और सूर्य का देशांतर एक होता है, और सबसे पहला संभव दीदार उसके लगभग पंद्रह से तीस घंटे बाद होता है, जो दूरी, सूर्यास्त के समय चंद्रमा की ऊँचाई तथा आकाश पर निर्भर है। भारत में यह निर्णय स्थानीय रूयत-ए-हिलाल कमेटियाँ घोषित करती हैं, और घोषित तिथि नगर-नगर में तथा सऊदी अरब की तिथि से भिन्न हो सकती है।",
        moment:
          "हम युति के बाद से चंद्रमा की आयु और सूर्य से उसकी दूरी छापते हैं। यह खगोल है। यह वह सामग्री है जिस पर कोई कमेटी विचार कर सकती है; यह तिथि नहीं है।",
        caution:
          "हम दीदार का पूर्वानुमान नहीं देंगे, मास का आरंभ घोषित नहीं करेंगे, और रमज़ान, ईद, मुहर्रम या शब-ए-बरात की कोई तिथि नहीं छापेंगे। वह निर्णय उन कमेटियों का है जो उसे करती हैं और उसमें हमारा कोई स्थान नहीं।",
      },
      {
        id: "christian",
        tradition: "ईसाई, भारत में",
        uses: "एक तालिका का चंद्रमा, यह नहीं",
        rule: "ईस्टर उस पहले रविवार को है जो 21 मार्च को अथवा उसके बाद पड़ने वाली कलीसियाई पूर्णिमा के पश्चात् आता है। कलीसियाई पूर्णिमा एक तालिका से, एपैक्ट से, 19 वर्ष के चक्र पर गणना होती है, और वह जानबूझकर खगोलीय पूर्णिमा नहीं है; दोनों में लगभग दो दिन तक का अंतर हो सकता है। ग्रेगोरियन गणना एक तिथि देती है और जूलियन दूसरी, अतः केरल तथा अन्यत्र की सिरियाई एवं ऑर्थोडॉक्स कलीसियाएँ अधिकांश वर्षों में लैटिन तथा प्रोटेस्टेंट कलीसियाओं से भिन्न रविवार को ईस्टर रखती हैं।",
        moment:
          "इस पृष्ठ की कोई वस्तु उस गणना में नहीं जाती। हम जिस चंद्रमा की गणना करते हैं वह वास्तविक है, और जो चंद्रमा ईस्टर तय करता है वह नहीं।",
        caution:
          "हम ईस्टर की तिथि नहीं छापते और खगोलीय पूर्णिमा को पास्का की पूर्णिमा के रूप में प्रस्तुत नहीं करते। इन दोनों को एक बता देना इस पंचांग के विषय में की जाने वाली सबसे आम भूल है।",
      },
      {
        id: "parsi",
        tradition: "पारसी ज़रथुष्ट्री",
        uses: "इस पृष्ठ की कोई वस्तु नहीं",
        rule: "भारत के पारसियों में सामान्यतः प्रचलित शहंशाही पंचांग 365 दिन का है और उसमें कोई अधिमास नहीं, अतः वह ऋतुओं के सापेक्ष प्रति चार वर्ष में लगभग एक दिन खिसकता है। वह न चांद्र है न खगोलीय रूप से सौर। छोटे समुदायों में प्रचलित फ़सली तथा क़दीमी पंचांग पुनः भिन्न हैं।",
        moment: "इस पृष्ठ की किसी गणना का इससे कोई संबंध नहीं।",
        caution:
          "यह प्रविष्टि इसलिए है कि भारत में चंद्रमा पर बना ऐसा पृष्ठ जो चुपचाप उस समुदाय को छोड़ दे जिसके लिए चंद्रमा कुछ नहीं करता, वह छोड़ने से ही एक दावा कर रहा होगा।",
      },
    ],

    disagreementHeading: "जहाँ वे सहमत नहीं, स्पष्ट शब्दों में",
    disagreements: [
      "पूर्णिमा एक वस्तु नहीं है। हिंदू के लिए वह मास के शुक्ल पक्ष को पूर्ण करती है; थेरवाद बौद्ध के लिए वह उपोसथ दिवस है; सिख के लिए कत्तक दी पूरनमाशी गुरु नानक देव जी का प्रकाश पुरब है; जैन के लिए कार्तिक पूर्णिमा शत्रुंजय की यात्रा का दिन है। ये चार भिन्न अनुष्ठान हैं जो संयोग से एक ही रात पड़ते हैं। ये एक ही वस्तु के चार रूप नहीं हैं।",
      "कार्तिक पूर्णिमा सबसे स्पष्ट उदाहरण है। हिंदू, सिख और जैन तीनों वह रात रखते हैं, और कारणों का एक-दूसरे से कोई संबंध नहीं। उन्हें एक शीर्षक के नीचे छापना वही सपाटीकरण होगा जिससे बचने के लिए यह पृष्ठ बना है, अतः वे अलग-अलग प्रविष्टियों में, अलग-अलग कारणों सहित छपे हैं।",
      "छह में से दो उस चंद्रमा का प्रयोग नहीं करतीं जिसकी हम गणना करते हैं। हिजरी मास मानवीय दीदार की प्रतीक्षा करता है, और ईस्टर एक तालिका के चंद्रमा का प्रयोग करता है जो जानबूझकर खगोलीय नहीं है। इनमें से किसी को ephemeris का परिणाम बताना खगोल की दृष्टि से भी ग़लत होगा और व्यवहार के प्रति अनादर भी।",
      "एक ही परंपरा के भीतर भी पंचांग विवादित है। हिंदुओं में पूर्णिमांत बनाम अमांत, जैनों में श्वेतांबर बनाम दिगंबर, और सिखों में नानकशाही संशोधन, तीनों जीवंत हैं। हम असहमति को नामित करते हैं और वहीं रुक जाते हैं।",
    ],
  },

  join: {
    eyebrow: "जल और आकाश, एक क्षण",
    title: "स्नान के क्षण के दो निर्देशांक होते हैं।",
    lede: "नदी एक स्तर और एक प्रवाह देती है। आकाश एक नक्षत्र, एक चरण, एक तिथि और प्रकाशित अंश देता है। दोनों मिलकर उस क्षण को अकेले किसी एक से कहीं अधिक कसकर नामित करते हैं, और दोनों भाग सार्वजनिक आँकड़े हैं जिन्हें कोई भी स्रोत पर जाकर जाँच सकता है।",
    riverLabel: "जल",
    skyLabel: "आकाश",
    seedLabel: "बीज",
    mudraLabel: "मुद्रा",
    rarityLabel: "पुनरावृत्ति काल",
    rarityNote:
      "जल और आकाश का यह संयोग इस घाट पर कितने अंतराल पर लौटता है, 200 वर्ष की ephemeris गणना तथा गेज स्टेशन के अपने अभिलेख से निकाला गया। यह उस दिन के संसार के विषय में एक तथ्य है। यह दावा नहीं है कि वह दिन अधिक शुभ है, और यहाँ की किसी बात को वैसा नहीं पढ़ा जाना चाहिए।",
  },

  method: {
    eyebrow: "यह कैसे गणना होती है",
    title: "गणित, और उसकी सीमाएँ।",
    items: [
      {
        n: "०१",
        t: "बिना नेटवर्क, और नियत",
        d: "स्थितियाँ हमारे अपने सर्वर पर चलने वाले ephemeris से आती हैं। कोई ज्योतिष API नहीं, कोई कुंजी नहीं, और पर्व की रात विफल होने को कुछ नहीं। एक ही क्षण किसी भी मशीन पर वही गणना देता है, और दस वर्ष बाद भी वही देगा।",
      },
      {
        n: "०२",
        t: "एक नापी जा सकने वाली जाँच",
        d: "लाहिड़ी अयनांश की परिभाषा ही यह है कि चित्रा ठीक 180 अंश निरयन पर पड़े। हमारी शृंखला से निकलकर चित्रा 179.993 पर आती है। अतः पूरी शृंखला, ephemeris और अयनांश दोनों मिलकर, लगभग 25 विकला के भीतर है, जिसे चंद्रमा आधे मिनट में पार करता है।",
      },
      {
        n: "०३",
        t: "असली त्रुटि-सीमा अयनांश है",
        d: "वे 25 विकला हमारी सीमा नहीं हैं। लाहिड़ी, कृष्णमूर्ति और रमन, तीनों भारत में प्रचलित, 1.37 अंश तक फैले हैं, अर्थात् लगभग ढाई घंटे की चंद्र गति। नक्षत्र प्रवेश एक परंपरा के भीतर सेकंड तक ज्ञात है और परंपराओं के बीच ढाई घंटे तक। जब चंद्रमा इस सीमा के भीतर होता है, हम यह कहते हैं और दोनों नाम छापते हैं।",
      },
      {
        n: "०४",
        t: "सर्वेक्षण के बिना चंद्रोदय नहीं",
        d: "चंद्रोदय तथा चंद्रास्त के लिए घाट की ठीक स्थिति चाहिए। छह में से किसी का सर्वेक्षण नहीं हुआ, इसलिए उनके लिए कोई उदय समय नहीं छापा जाता। अनुमानित अक्षांश-देशांतर ऐसा उत्तर देता जो सटीक दिखता और होता नहीं, और यही एक बात है जो न करने के लिए यह स्थल बना है।",
      },
    ],
    provenanceHeading: "स्रोत",
    provenanceBody:
      "यहाँ की हर गणना अनुमानित अंकित है। इस कोडबेस में अनुमानित का अर्थ है गणना की गई किंतु किसी नामित पंचांग से किसी नामित व्यक्ति द्वारा जाँची नहीं गई, और किसी वस्तु की ठीक गणना कर लेना उसे जँचवा लेने के समान नहीं है। जब कोई पंचांग स्रोत नियुक्त होगा और कुछ तिथियों का मिलान हो चुका होगा, तब यह अंकन बदलेगा और यह अनुच्छेद भी।",
  },

  notClaimed: {
    eyebrow: "यह क्या नहीं है",
    title: "चार बातें, जो यह पृष्ठ नहीं करता।",
    items: [
      "यह आपके जीवन के विषय में कुछ नहीं बताता। हर नक्षत्र के नीचे की पंक्ति यह बताती है कि परंपरा उस नक्षत्र से क्या जोड़ती है। वह भविष्यवाणी नहीं है, फलादेश नहीं है, और किसी के स्वभाव, स्वास्थ्य, विवाह या धन के विषय में कोई कथन नहीं है, और कभी नहीं होगी।",
      "यह कुछ संपन्न नहीं करता। इस पृष्ठ पर कुछ भी अनुष्ठान नहीं है और आपकी ओर से कोई किसी जल में नहीं उतरा है। स्नानिफ़ाई एक डिजिटल अनुभव है और यही कहता है।",
      "यह धार्मिक तिथियाँ घोषित नहीं करता। यह बताता है कि चंद्रमा कहाँ है और उन नियमों को नामित करता है जो अन्य लोग उस पर लगाते हैं। तिथि का निर्णय उन कमेटियों, पंचांगकारों तथा पुरोहितों का काम है जो वह काम करते हैं।",
      "यह दावा नहीं करता कि परंपराएँ सहमत हैं। ऊपर छह गणनाएँ अलग-अलग रखी गई हैं, और वे कहाँ अलग होती हैं, उस भाग की लंबाई उनमें से अधिकांश से अधिक है।",
    ],
  },

  list: {
    eyebrow: "पूरा चक्र",
    title: "सत्ताईस स्थान, सत्ताईस तारे।",
    lede: "चंद्रमा लगभग प्रतिदिन इनमें से एक पार करता है, प्रत्येक पर लगभग 24 घंटे 20 मिनट लगाकर, और 27.3 दिन में पहले पर लौट आता है। हर प्रविष्टि में देवता, प्रतीक, अधिपति ग्रह और वह वास्तविक तारा है जो उसे चिह्नित करता है, उसके पदनाम तथा गणना की गई स्थिति सहित।",
    columns: {
      n: "क्रम",
      name: "नक्षत्र",
      span: "विस्तार",
      star: "तारा",
      magnitude: "कांति",
      deity: "देवता",
    },
    misfitFlag: "तारा अपने खंड के बाहर",
    contestedFlag: "तारे की पहचान विवादित",
  },

  detail: {
    signifiesTitle: "परंपरा इससे क्या जोड़ती है",
    starTitle: "वह तारा जो इसे चिह्नित करता है",
    companionsTitle: "समूह के शेष तारे",
    identificationTitle: "कौन-सा तारा, और कौन असहमत है",
    segmentTitle: "खंड, और तारा वास्तव में कहाँ है",
    insideSegment: "योगतारा उसी खंड के भीतर पड़ता है जो उसका नाम धारण करता है।",
    outsideSegment:
      "योगतारा उस खंड के भीतर नहीं पड़ता जो उसका नाम धारण करता है। अंतर ऊपर छपा है और यह आँकड़ों की त्रुटि नहीं है।",
    prev: "पिछला नक्षत्र",
    next: "अगला नक्षत्र",
  },

  abhijit: {
    eyebrow: "अट्ठाईसवाँ",
    title: "अभिजित्, और वह यहाँ क्यों नहीं है।",
  },

  cta: {
    title: "जल, और उसके ऊपर का तारा।",
    lede: "एक नदी चुनिए। आकाश की गणना उसी के लिए होगी जो आप चुनें, उसी क्षण के लिए जो आप चुनें।",
    primary: "छह पवित्र जल",
    secondary: "पंचांग",
  },
};

export const skyContent = { en, hi } satisfies Record<Lang, typeof en>;
export type SkyCopy = typeof en;

/* ---------------------------------------------------------------------------
   ADDITIONAL COPY, for the join panel and the artefact colophon. Add to both
   locale objects when the seed module lands.

   en.join.rarityMethod:
     "The sky half is measured, not estimated. The moon's position was computed
      once a day for 200 years, 73,049 days, and every one of the 3,240 possible
      combinations of nakshatra, pada and tithi occurred, between 14 and 31 times
      each. So the sky alone repeats itself every 6.5 to 14.3 years. The water
      half comes from the gauge cell's own 1997 to 2025 record, which is
      published at the 5th, 10th, 30th, 50th, 70th, 90th and 95th percentiles
      and cannot resolve anything finer than the outer twentieth. We do not
      pretend it can. The two are multiplied, which assumes they are independent;
      over long spans they nearly are, because the lunar and solar cycles only
      re-align every 19 years, and within any one of those 19 years they are not.
      That assumption is printed here rather than buried."

   hi.join.rarityMethod:
     "आकाश वाला भाग मापा गया है, अनुमानित नहीं। चंद्रमा की स्थिति 200 वर्ष तक
      प्रतिदिन एक बार गणना की गई, 73,049 दिन, और नक्षत्र, चरण तथा तिथि के 3,240
      संभव संयोगों में से प्रत्येक घटित हुआ, 14 से 31 बार। अतः अकेला आकाश हर
      6.5 से 14.3 वर्ष में स्वयं को दोहराता है। जल वाला भाग गेज कोष्ठ के अपने
      1997 से 2025 के अभिलेख से आता है, जो 5, 10, 30, 50, 70, 90 तथा 95
      प्रतिशतक पर प्रकाशित है और बाहरी बीसवें भाग से महीन कुछ नहीं बता सकता।
      हम यह दिखावा नहीं करते कि बता सकता है। दोनों का गुणा किया जाता है, जो यह
      मानकर चलता है कि वे स्वतंत्र हैं; लंबी अवधि में वे लगभग हैं, क्योंकि चांद्र
      और सौर चक्र हर 19 वर्ष में ही पुनः मिलते हैं, और उन 19 वर्षों के भीतर वे
      नहीं हैं। यह मान्यता यहाँ छापी गई है, छिपाई नहीं गई।"

   en.join.impressionNote:
     "Two people who choose the same instant at the same ghat receive the same
      seed. That is correct: the seed records the world, not the buyer, and it
      contains no name, no gotra and no contact detail, which is why it can be
      printed and shared safely. What separates one sheet from another is the
      impression number, the count of sheets pulled from that forme."

   hi.join.impressionNote:
     "जो दो लोग एक ही घाट पर एक ही क्षण चुनते हैं, उन्हें वही बीज मिलता है। यह
      ठीक है: बीज संसार को दर्ज करता है, क्रेता को नहीं, और उसमें कोई नाम, कोई
      गोत्र और कोई संपर्क विवरण नहीं, इसीलिए उसे छापा और साझा किया जा सकता है।
      एक पत्र को दूसरे से अलग छाप-संख्या करती है, उस फ़र्मे से खींचे गए पत्रों
      की गिनती।"
   --------------------------------------------------------------------------- */


## Open questions

- The brief's 'Ganga at 293.4m' does not exist as data. riverdata.ts has no stage or water-level field at all; 294 is Haridwar's ground elevation. Confirm the water axis is discharge in cumecs plus its percentile band, and that no marketing copy anywhere says 'water level' or prints a metre figure.
- GloFAS discharge is MODELLED and DAILY, and can be stale by days. The seed records kind, modelled_for, age_days and stale for that reason. Confirm the owner is content that the artefact's water half says 'modelled' on its face, because saying otherwise would break rule two.
- muhurat.ts ships every ghat with coordinates: null and coordinatesStatus 'pending-survey', but riverdata.ts carries usable ghat coordinates for all six. These two files now contradict each other. Decide: either backfill muhurat.ts with map-derived coordinates and a new coordinatesStatus value ('map-derived'), or keep them null and have the sky page pass riverdata's coordinates explicitly with a visible label. Moonrise for Haridwar on Kartik Purnima 2026 computes to 16:49 IST either way; the question is what we are willing to call it.
- The Moon's azimuth over the river needs each ghat's downstream channel bearing, which nobody has surveyed. SkyChart takes bearingDeg: number | null and places the Moon by altitude alone while it is null. Is a six-ghat bearing survey worth commissioning, or does the centred-with-a-caption version ship indefinitely?
- Rarity currently uses a 200-year FORWARD ephemeris census for the sky and the published weekly quantile knots for the water. The stronger version cross-tabulates the actual daily GloFAS archive against computed sky states over the record's full length and reports the empirical joint. That needs the daily archive ingested, which riverdata.ts does not ship. Worth doing, or is the multiplicative estimate with its assumption printed good enough for v1?
- Three impression marks were chosen over five because the R distribution is genuinely bimodal (80.0% / 10.8% / 9.2%). A five-band ladder would have had a band holding 0.4% of the mass. Confirm three is acceptable commercially, or accept a lumpy five.
- Should /sky ship a per-tradition JSON-LD Event or DefinedTerm graph? It would help the reference pages rank, but any Event node implies a date, and the page's whole position is that it does not announce dates. Current plan is DefinedTerm and DefinedTermSet only, no Event anywhere.
- Ardra is recorded as Betelgeuse with Sirius named as the contested alternative. They are twenty degrees apart, which is the largest disagreement in the catalogue by an order of magnitude. Should the detail page for Ardra render BOTH stars on its chart rather than one with a footnote?
- The Muslim entry deliberately prints only moon age and elongation and refuses to state a date. Before publishing, this entry specifically should be read by someone who actually sits on or near a Ruet-e-Hilal committee. Getting the astronomy right is not the same as getting the standing right.
- The Sikh entry states that the Nanakshahi calendar revisions are disputed between the SGPC and other bodies. That is accurate and it is also a live communal argument. Confirm the owner wants it named rather than omitted; omitting it would make the rest of the entry misleading, which is the trade.