# Servers in the River: the live data spine

**Two HTTP requests an hour make "our servers are in the river" literally true: real discharge at six calibrated grid cells, ranked against 35 years of history, driving what you hear and see rather than what you read.**

# Servers in the River

## 0. The verdict up front

I probed every source named in the brief. Here is what survived.

**The spine is Open-Meteo's Flood API, serving Copernicus GloFAS river discharge.** Free of auth, global, forecast plus 35 years of reanalysis, and it accepts all six waters in a single request. I have it returning correct, physically plausible discharge for all six today.

**The Central Water Commission is not the spine.** I got its portal open and its API working, and the data is months stale. Details in section 2. It has a different and still valuable job: provenance and named gauges.

**The whole live layer is two HTTP requests per poll.** One flood call, one weather call, six locations each. At hourly polling that is 48 upstream requests per day. This is not a data engineering problem, it is a config file.

Verified today, 11 August 2026, at the calibrated cells:

| Water | Discharge now | Seasonal median | Percentile | State |
|---|---|---|---|---|
| Ganga, Haridwar | 1,444 m³/s | 1,502 | 41 | as it usually runs |
| Sangam, Prayagraj | 5,688 m³/s | 9,682 | 14 | running low |
| Yamuna, Mathura | 1,027 m³/s | 1,020 | 51 | as it usually runs |
| Godavari, Nashik | 197 m³/s | 80 | **95** | **in spate** |
| Shipra, Ujjain | 105 m³/s | 138 | 34 | running low |
| Kaveri, Talakaveri | 5.8 m³/s | 6.2 | 41 | as it usually runs |

Six waters, six different states, on an ordinary Tuesday. The Godavari is at the 95th percentile of everything it has done in this week of the year since 1991. That is the product: not the number, the fact that Nashik sounds different tonight and Prayagraj does not.

---

## 1. The primary source: Open-Meteo Flood API

**Endpoint** (no key, no registration, verified working):

```
https://flood-api.open-meteo.com/v1/flood
  ?latitude=29.925,25.375,27.475,19.925,23.275,12.375
  &longitude=78.125,81.875,77.675,73.875,75.675,75.475
  &daily=river_discharge,river_discharge_mean,river_discharge_max,river_discharge_min
  &past_days=31&forecast_days=7
```

Returns a JSON array, one object per location, 3.4 KB for the six-site 38-day window. Underlying model is GloFAS from the Copernicus Emergency Management Service, 0.05 degree grid, daily resolution, updated daily.

**Historical, same endpoint:** `start_date=1991-01-01&end_date=2025-12-31` returns 10,450 complete daily values per site, 256 KB. 1984 returns nulls, so **1991 is the safe archive floor**. This one-off pull is what generates the seasonal normal table in section 5.

### 1.1 Coordinate calibration is mandatory and is the only hard engineering step

Querying Har Ki Pauri's actual coordinates (29.9457, 78.1642) returns **0.11 m³/s**. The Ganga at Haridwar in August is roughly fourteen thousand times that. GloFAS snapped the request to a neighbouring cell carrying a hill stream.

The fix is a grid scan: sample a 5 x 5 lattice at 0.05 degree spacing around each ghat and take the cell with the highest discharge, which is the main stem. I ran this for all six. **These coordinates are calibrated and verified. Hard-code them. Never query a ghat's own lat/lon.**

```ts
// src/content/gauges.ts
export type GaugeCell = {
  slug: GhatSlug;              // matches rivers.ts
  label: Bilingual;
  ghat: readonly [number, number];   // display only, never queried
  cell: readonly [number, number];   // GloFAS main-stem cell, queried
  reach: Bilingual;            // what the cell actually represents
};

export const GAUGES = [
  { slug: "ganga-haridwar",    ghat: [29.9457, 78.1642], cell: [29.925, 78.125] },
  { slug: "triveni-prayagraj", ghat: [25.4225, 81.8850], cell: [25.375, 81.875] },
  { slug: "yamuna-mathura",    ghat: [27.5030, 77.6800], cell: [27.475, 77.675] },
  { slug: "godavari-nashik",   ghat: [19.9975, 73.7898], cell: [19.925, 73.875] },
  { slug: "shipra-ujjain",     ghat: [23.1828, 75.7683], cell: [23.275, 75.675] },
  { slug: "kaveri-talakaveri", ghat: [12.3873, 75.4940], cell: [12.375, 75.475] },
] as const;
```

Ship a unit test that fails if any cell's 30-day mean drops below a floor (Haridwar 200, Prayagraj 400, Mathura 100, Nashik 5, Ujjain 2, Talakaveri 0.3). If Copernicus re-grids, the test catches it instead of the site quietly serving a hill stream.

### 1.2 The Kaveri decision

`rivers.ts` correctly says Talakaveri is a spring in a temple tank, not a ghat. Its cell returns **5.8 m³/s**, three orders of magnitude below the others. That is not a bug, that is the truth, and it is the most beautiful number on the page. The Kaveri at her source is a trickle you could step across.

Keep Talakaveri as the canonical cell. Its scale is its meaning, and the copy says so. Add Paschima Vahini at Srirangapatna (cell 12.425, 76.675, currently 176 m³/s) as a **second panel on the Kaveri page only**, since `rivers.ts` already points readers there for rites a source cannot host. Two panels, one page, source and reach.

**Never compare rivers by absolute discharge across the six.** Everything user-facing is percentile against that water's own history. That is also the only honest comparison.

---

## 2. Central Water Commission: what is actually there

I tested every CWC surface named in the brief.

| Host | Result |
|---|---|
| `nwdp.nwic.gov.in` | **200, open CKAN API, works** |
| `cwc.gov.in` | 401 |
| `indiawris.gov.in` | no route from outside India |
| `arc.indiawris.gov.in` | no route |
| `ffs.india-water.gov.in` | no route |
| `aff.india-water.gov.in` | no route |

The National Water Data Portal is a **CKAN instance**. Standard open API, no key, no data request form:

```
https://nwdp.nwic.gov.in/api/3/action/package_search?q=river+water+level&rows=25
https://nwdp.nwic.gov.in/api/3/action/package_show?id=river-water-level-telemetry-hourly-central-water-commission-cwc
https://nwdp.nwic.gov.in/api/3/action/datastore_search?resource_id=<uuid>&filters={"State":"Maharashtra"}&limit=1000
```

`datastore_active: true` on every resource, so `datastore_search` returns live JSON with filters, sort and paging. Record schema is rich: Station, Agency, State, District, Tehsil, Village, River, Basin, Tributary, Latitude, Longitude, RL_of_zeroGauge, MeanSeaLevel, Data Acquisition Time, and the level in metres.

`datastore_search_sql` is **disabled** on this instance. Use `filters` and `sort`, not SQL.

### 2.1 Why it is not the spine

Three disqualifying facts, all measured, not assumed.

**It is months stale.** The 2026-2030 Godavari resource had `last_modified` of today, 06:34 UTC, which looks live and is not. Sorting the datastore by `_id desc` returns a newest record of **20-02-2026 11:00**. Nearly six months of lag. The file is rewritten; the data inside it is not current.

**Coverage is sparse and irregular.** Across the whole 2026-2030 Godavari resource, Maharashtra has four stations, all in Chandrapur, Wardha and Hingoli, far downstream in the Wardha and Penganga sub-basins. Record counts per station range from 2 to 924. **There is no CWC telemetry station at Nashik in this dataset.**

**Ganga basin is absent.** The resource list covers basin codes 003 through 015 and 26, 27: Subernarekha, Brahmani-Baitarni, Mahanadi, Godavari, Krishna, Pennar, Cauvery, Tapi, Narmada, Mahi, Sabarmati, Kutch-Saurashtra, Tapi-to-Tadri, and two east-coast groups. **No Ganga. No Indus.** Four of the six waters, Haridwar, Prayagraj, Mathura and Ujjain, have no CWC river level telemetry on this portal at all.

The live CWC flood forecast dashboard almost certainly does carry Ganga stations. It is also unreachable from outside India, and building a paid product on a host you cannot reach from your own infrastructure is not a plan.

### 2.2 The job CWC does get

Not the live number. **Provenance and place.**

Do a **one-off build-time pull** of the CWC station registry for the two basins that do exist, Godavari and Cauvery, extracting station name, agency, lat/lon, RL of zero gauge and mean sea level. Freeze it into `src/content/gauges.ts`. It lets the Nashik and Kaveri pages name a real government gauge, cite its coordinates and its datum, and link to the dataset. It is the difference between "a model says" and "the Central Water Commission maintains a station at Kanhargaon on the Penganga at 19.9617 N, 77.1483 E, and here is the file".

Zero runtime dependency, zero staleness risk, real institutional weight. Refresh it manually once a year.

**And be exact in the copy.** Discharge is modelled, not gauged. The copy in section 8 says "modelled" every single time. That costs nothing and it is the difference between a product and a liability.

---

## 3. Everything else that is real and pullable

### 3.1 Sun and weather: one request, six ghats

Verified working, no key:

```
https://api.open-meteo.com/v1/forecast
  ?latitude=29.9457,25.4225,27.5030,19.9975,23.1828,12.3873
  &longitude=78.1642,81.8850,77.6800,73.7898,75.7683,75.4940
  &current=temperature_2m,relative_humidity_2m,precipitation,weather_code,cloud_cover,wind_speed_10m,is_day
  &daily=sunrise,sunset,daylight_duration,precipitation_sum
  &timezone=Asia/Kolkata&forecast_days=3
```

5.6 KB. Returned this hour, in IST: Haridwar sunrise 05:42 and sunset 19:02; Ujjain sitting under weather code 95, an active thunderstorm, 1.2 mm falling, 100 percent cloud. **It is storming at Ram Ghat right now and the product can know that.**

Note this uses the **ghat's own coordinates**, not the GloFAS cell. Weather belongs at the ghat; discharge belongs on the main stem. Two coordinate sets, two purposes.

### 3.2 Sunrise and sunset: use Open-Meteo, delete the alternative

`api.sunrise-sunset.org` works and returns civil, nautical and astronomical twilight. It is also a second dependency for data Open-Meteo already returns in the call you are making anyway. **Do not add it.** If you later want astronomical twilight for Brahma muhurat, compute it locally from the NOAA solar equations, about forty lines, zero network.

### 3.3 Moon phase and tithi: already in the repo, add nothing

`src/content/muhurat.ts` has the tithi model, the paksha and masa schemes, timezone conversion, and `WINDOWS` for brahma, pratah, abhijit and godhuli anchored to sunrise, solar noon and sunset. Moon phase is a pure function of tithi. **Do not add a lunar API.**

What is new and worth doing: those windows were anchored to computed or approximate sunrise. Now feed them the **real per-ghat sunrise and sunset** from the same weather call. Brahma muhurat at Har Ki Pauri becomes 04:06 to 04:54 IST tonight, derived from an actual 05:42 sunrise at 29.9457 N, and it is genuinely different from Nashik's, whose sunrise is 06:13. Six ghats, six sets of windows, all correct. That is a real accuracy upgrade that costs one field in an existing response.

### 3.4 Water temperature: not available. Do not claim it.

The brief asks about it. NWDP has `temperature-telemetry-hourly-central-water-commission-cwc`, and it is **air temperature at gauge sites**, archival, and does not cover four of the six waters. There is no live water temperature at any of these six ghats from any source I could reach.

Nothing on the site may state a water temperature. Air temperature at the ghat is real and is enough.

### 3.5 Live YouTube aarti feeds: design as if they do not exist

I could not verify any specific persistent live stream from these six ghats (my web search budget ran out before I could confirm channel IDs, so treat this as **UNVERIFIED**). Independent of availability, three reasons not to build on them:

1. Embedding a third party's ghat stream is a rights question nobody has answered.
2. A dead embed is worse than no embed, and channels go dark without notice.
3. **It breaks rule 1.** A live aarti feed on a page selling a digital snan invites exactly the inference that something is being performed for the buyer. Nothing is.

**Decision: no video, anywhere.** This is not caution, it is the stronger product. The whole design language is a printed almanac with no gradients, no glows and no blurs. A YouTube rectangle would be the ugliest thing on the site. Sound and ink, nothing else.

### 3.6 Google Flood Hub: real, keep in the drawer

`https://floodforecasting.googleapis.com/v1/gauges:searchGaugesByArea` is live and returns a clean `PERMISSION_DENIED` for unregistered callers, so the API exists and needs a Google Cloud key. It has strong India coverage and returns **gauge readings**, not just model output.

Do not integrate it now. It is the escape hatch if Open-Meteo's terms change or GloFAS coverage degrades. One day of work, held in reserve.

---

## 4. The data spine

### 4.1 Shape

```
Vercel Cron, hourly (0 * * * *)
  └─ /api/cron/river
       ├─ GET flood-api  (6 sites, 1 request)   ~3.4 KB
       ├─ GET forecast   (6 sites, 1 request)   ~5.6 KB
       ├─ derive RiverState[] using the static normals table
       └─ write one JSON blob to Vercel Edge Config

Pages (ISR, revalidate 1800)
  └─ read Edge Config at the edge, no upstream call, no cold path
```

Two upstream requests per hour. **48 per day, about 1,460 per month.**

### 4.2 The derived object

Everything downstream reads this and only this. It is the contract.

```ts
export type FlowBand = "slack" | "low" | "usual" | "full" | "spate";
export type Trend    = "rising" | "steady" | "falling";
export type Source   = "live" | "cached" | "normal";

export type RiverState = {
  slug: GhatSlug;
  observedAt: string;        // ISO, upstream stamp, never our clock
  source: Source;

  discharge: number | null;  // m³/s, null only when source === "normal"
  percentile: number;        // 0..100 against 1991-2025, same week of year
  band: FlowBand;
  trend: Trend;
  deltaPct: number;          // change vs 7 days ago

  sunrise: string;           // ISO local, per ghat
  sunset: string;
  isDay: boolean;
  airTempC: number | null;
  precipMm: number;
  weatherCode: number;
  cloudPct: number;

  tithi: TithiRef;           // from muhurat.ts
  nextWindow: { id: MuhuratWindowId; startsAt: string; endsAt: string };
};
```

### 4.3 Percentile, which is the only number that matters

Absolute discharge is meaningless to a reader. 197 m³/s at Nashik and 5,688 at Prayagraj tell you nothing about whether either river is behaving oddly. **Percentile against that same water in that same week of the year, 1991 to 2025, tells you everything.**

Method, verified end to end: take every daily value within plus or minus 7 days of today's day of year across all 35 archive years, giving n = 435 samples per site. Percentile is the share of that sample below today's value.

Bands:

| Percentile | Band |
|---|---|
| 0 to 10 | `slack` |
| 10 to 30 | `low` |
| 30 to 70 | `usual` |
| 70 to 90 | `full` |
| 90 to 100 | `spate` |

Trend is signed change against 7 days ago: above +8 percent `rising`, below -8 percent `falling`, otherwise `steady`.

### 4.4 The fallback chain, and why it can never fail

Four rungs, each with an explicit user-facing consequence.

**1. Live.** Edge Config blob under 6 hours old. Serve it. `source: "live"`.

**2. Cached.** Blob between 6 and 72 hours old. Serve it unchanged, stamp the page with the real observation time. River discharge moves on a scale of days; a 40-hour-old value is still true. `source: "cached"`. No apology in the copy, just the timestamp.

**3. Seasonal normal.** Beyond 72 hours, or Edge Config unreadable, or a site missing from the response. **Serve the 35-year median for today's date from a static table compiled into the bundle.** Band is derived from the median, so it is `usual` by construction. Trend is `steady`. `source: "normal"`, and the copy says what it is.

**4. There is no rung four.** The normals table is a build artifact, not a network call. 6 sites x 366 days x 3 quantiles is 6,588 numbers, roughly 46 KB of JSON, 15 KB gzipped, generated once by the script in section 1 and committed. If it is missing the build fails. **The experience therefore cannot degrade below "this is what this river usually does today", which is a true and evocative statement.**

The audio and the visuals read `band` and `trend`. They never read `source`. **A gauge going offline is inaudible and invisible in the experience.** It changes one line of provenance text on the Now page and nothing else. That is the whole point.

### 4.5 Cron and failure handling

- The cron handler is idempotent and never partially writes. Build the full blob in memory, validate all six sites, then write once.
- If the flood call succeeds and weather fails, merge the fresh flood data over the previous blob's weather fields. Per-field freshness, not all-or-nothing.
- One retry after 20 seconds, then give up. The next run is an hour away and rung 2 covers it.
- Alert only on three consecutive failures. Anything less is noise, because rung 2 already absorbed it.

---

## 5. How the river becomes felt

This is the product. A number on a dashboard is worthless; the brief is right about that.

The design constraint is `globals.css`, which forbids gradients, glows, blurs, rounded corners and soft shadows, and permits exactly four things: rules, tint blocks, the spot vermillion, and `steps()` motion. **The river must be rendered in that vocabulary or the site stops being itself.** Every mapping below stays inside it.

### 5.1 Sound is 80 percent of it

Four seamless loops, mono, Opus at 96 kbps, 90 seconds each, roughly 1.1 MB apiece, decoded through the Web Audio API into four gain nodes on a shared master. Loaded lazily on first user gesture, never on page load.

| Stem | Character |
|---|---|
| A `body` | Deep, wide, slow. The river at rest. |
| B `current` | Mid-band moving water, the working river. |
| C `spate` | Broken water, gravel turnover, urgency. |
| D `rain` | Rain falling onto a water surface. |

Gains, with `f = percentile / 100`:

```
gainBody    = 1 - 0.35 * f
gainCurrent = 0.25 + 0.75 * Math.sin(Math.PI * f)
gainSpate   = Math.pow(clamp((f - 0.55) / 0.45, 0, 1), 1.5)
gainRain    = clamp(precipMm / 4, 0, 1) * 0.8
```

At Prayagraj tonight, percentile 14: body near full, current at 0.57, spate silent. Wide, low, slow. At Nashik, percentile 95: body down to 0.67, current at 0.42, **spate at 0.85**. The Godavari is loud tonight and the Sangam is not, and the difference is audible within two seconds of pressing play.

Crossfade gain changes over 8 seconds with an equal-power curve so a poll boundary is never a click.

A single **ghat layer** sits above the four: bells, distant voices, birds at that specific place, one loop per water, gain fixed at 0.3 and ducked to 0.12 when `gainSpate` exceeds 0.5. This is what makes Ujjain not sound like Haridwar.

Total payload with six ghat layers is about 11 MB, so **fetch the four hydro stems plus only the ghat layer for the water being viewed**, roughly 5.5 MB per session.

### 5.2 Ink

`RiverFlow` already exists as a component. Drive it from CSS custom properties written once per render from `RiverState`.

| Property | Formula | Effect |
|---|---|---|
| `--river-lines` | `round(6 + 16 * f)` | 6 engraved lines at slack, 22 in spate. Density is the river's volume. |
| `--river-weight` | `0.5 + 1.1 * f` px | Stroke weight. A full river is a heavier impression. |
| `--river-drift` | `40 - 31 * f` s | Cycle duration. 40s slack, 9s spate. |
| `--river-steps` | `round(14 - 8 * f)` | `steps()` count. Low water steps coarsely and slowly; high water is nearly continuous. |
| `--river-skew` | `trend === "rising" ? -2 : trend === "falling" ? 2 : 0` deg | The engraved lines lean upstream when the river is rising. |

**The second impression.** When `precipMm > 0`, `RiverFlow` renders a second copy of the woodcut offset by 1px in `--spot`, using the existing `misregister` vocabulary, and `--grain` goes up by 0.02. Rain at the ghat looks like a press running slightly out of register. It is the one gesture the design system already had and never used for meaning.

**The edition.** `isDay` selects the light or dark forme. This is not a user preference toggle; at 21:30 IST in Haridwar the page is the night edition because it is night in Haridwar. The user's own local time is irrelevant and that is exactly the point of buying distance.

**The spot colour is spent on one thing only:** the trend caret next to the band word. Vermillion is the site's scarcest resource. It marks the single fact that changed since yesterday.

### 5.3 Time

The sankalp is where the river stops being scenery. The held moment is not a fixed 60 seconds. Its length is `round(45 + 30 * f)` seconds, from 45 at slack to 75 in spate, and the ambient bed underneath it is that water's live mix.

**The river sets the length of the pause.** Nobody is told this. It is felt on the second visit.

### 5.4 What is deliberately not mapped

Air temperature drives nothing sensory. Cloud cover drives nothing. Wind drives nothing. They appear as text on the Now page and stop there.

Three inputs drive the senses: **percentile, trend, precipitation.** More mappings would be noise, and noise is indistinguishable from randomness. A user must be able to notice, unprompted, that the site sounds different tonight. That only survives if the number of moving parts is small.

---

## 6. The River, Now

Route `/[lang]/now`, plus `/[lang]/now/[slug]` for each of the six. ISR, `revalidate: 1800`.

### 6.1 Index

Masthead rule, then a single letterpress table, one row per water, in the numeral order `rivers.ts` already uses. Columns: numeral, river and ghat, band word with trend caret in spot, discharge in m³/s set in tabular numerals, percentile, and the next muhurat window with a live countdown.

Below the table, a six-cell grid of `RiverFlow` marks, each already driven by its own live state, so the visual difference between a river in spate and a river running low is legible at a glance without reading a single number.

Then a rule, then the provenance block from section 8.

**No hero. No video. No map.** A table, six woodcuts, and a source note. That is the almanac.

### 6.2 Per-river page

The band sentence set large in Eczar, the woodcut at full width, the ghat's own weather and sun times, the tithi, the four muhurat windows for today with the current one marked, a 30-day sparkline of discharge as a hard-ruled step chart with no curve smoothing, and the named CWC station with its coordinates and datum where one exists.

One audio control: a rule-bordered box reading **Listen to the Ganga as she is running now**. Pressing it starts the live mix. That control is the conversion surface, and it converts because it delivers before it asks.

### 6.3 Why this is the SEO asset

Seven pages whose content genuinely changes daily, carrying real numbers nobody else assembles in one place, answering queries people actually type: Ganga water level Haridwar today, Shipra river level Ujjain, Godavari flow Nashik, Sangam water level Prayagraj, plus the Hindi equivalents, which are close to uncontested.

- `Dataset` JSON-LD on each page with `temporalCoverage`, `spatialCoverage` and `creator` credited to Copernicus EMS.
- `dateModified` set to the real `observedAt`, never build time.
- `<lastmod>` in `sitemap.ts` from the same field.
- Full EN and HI, as the rest of the site already is.

And the reason to return without buying: **the river is different tonight.** A meditation app has no reason to be opened on a Tuesday. A river does.

---

## 7. A physical node at a ghat

Costed, since the brief asks.

| Item | Cost |
|---|---|
| Raspberry Pi Zero 2 W, enclosure, SD | $60 |
| Aquarian H2a hydrophone, cabling | $200 |
| Solar panel, battery, charge controller | $120 |
| 4G modem, SIM | $60 |
| Weatherproofing, mounting, install labour | $150 |
| **Hardware per site** | **$590** |
| Data, per site per month | $8 |
| Six sites, capital | $3,540 |
| Six sites, recurring | $48/mo |

The $48 is not the cost. The cost is: written permission from six ghat authorities, which the pivot just deleted as a requirement and which `rivers.ts` records as held at zero; a person who can reach the device when it floods, is stolen, or is unplugged; and an availability guarantee on a page that currently cannot fail. **A physical node reintroduces exactly the operational burden the pivot removed, in exchange for a sensory improvement the four-stem mix already delivers.**

**Do not build it. Not at $20k a month, not at $50k.**

The 90 percent alternative at 8 percent of the cost: **hire a location recordist for one day per ghat.** Six days of work across six cities, roughly $300 to $500 per site including travel, and you own perpetual multitrack recordings of that specific water at that specific place: the bells at Har Ki Pauri, the Shipra at Ram Ghat, the tank at Talakaveri. Recorded once, mixed live against the real telemetry forever, with zero devices, zero permissions and zero ops.

**Budget $2,500 for six recording sessions. That is the entire physical-world spend, and it is one-off.**

The only condition that flips this: a competitor ships a genuine live hydrophone feed and it demonstrably moves conversion. That is a rebuild-in-a-quarter problem, not a build-it-now problem.

---

## 8. Provenance copy

This block appears on every Now page, in the small `label` voice under a hairline rule. It is not a disclaimer. It is the masthead of a data publication, and it is the thing that makes the claim in the headline defensible.

Full text in EN and HI is in the copy field.

---

## 9. Cost

| Line | Monthly |
|---|---|
| Open-Meteo API Standard, commercial licence, 1M calls | see note |
| Vercel Pro, existing | $20 |
| Edge Config reads and Cron | included |
| Audio hosting, roughly 5.5 MB per session at 20k sessions | ~$11 |
| **Total incremental** | **under $70** |

Open-Meteo's free tier permits 10,000 calls per day and we would use 48. **But the free tier forbids commercial use, and a paid subscription product is unambiguously commercial.** Buy API Standard. The tier structure is confirmed on their terms page; the euro figure is only shown at Stripe checkout, so treat any number I could give as **UNVERIFIED**. Budget under €50 per month and confirm at checkout. Data is CC-BY 4.0, so **attribution to Copernicus EMS and Open-Meteo is mandatory** and is written into the provenance block.

Against a $20,000 per month profit target, the live data spine costs under half of one percent of one founder's draw and requires no human being to touch it on any day.

---

## 10. Build order

1. `scripts/calibrate-gauges.ts`, the grid scan, writes `src/content/gauges.ts`. Half a day.
2. `scripts/build-normals.ts`, one archive pull per site, writes `src/content/normals.json`. Half a day.
3. `src/lib/river.ts`, the `RiverState` derivation and the four-rung fallback. One day.
4. `/api/cron/river` plus the Edge Config write, plus `vercel.json` cron. Half a day.
5. `/[lang]/now` and `/[lang]/now/[slug]`, EN and HI, JSON-LD, sitemap. Two days.
6. `RiverFlow` driven by the CSS custom properties. One day.
7. Audio engine and the four-stem mix, placeholder CC0 stems. Two days.
8. Recording sessions commissioned, stems replaced. Runs in parallel, lands later.

**About eight working days to a live, self-updating, zero-ops data spine and the SEO asset on top of it.**


---

## Copy

================================================================
THE RIVER, NOW — index page
================================================================

EN
---
Eyebrow:  LIVE FROM SIX WATERS
Title:    The river, now
Standfirst:
  Six waters, as they are running at this moment. The Ganga at Haridwar,
  the Sangam at Prayagraj, the Yamuna at Mathura, the Godavari at Nashik,
  the Shipra at Ujjain, the Kaveri at her source. Flow, light, weather and
  tithi, read fresh every hour and set here in full.

Sub-line under the table:
  Nothing on this page is performed by anyone. It is the river, reported.

CTA under the woodcuts:
  Listen to them →

HI
---
Eyebrow:  छह जलों से, इसी क्षण
Title:    नदी, इस समय
Standfirst:
  छह जल, जैसे वे इस क्षण बह रहे हैं। हरिद्वार में गंगा, प्रयागराज में संगम,
  मथुरा में यमुना, नासिक में गोदावरी, उज्जैन में शिप्रा, और अपने उद्गम पर
  कावेरी। बहाव, प्रकाश, मौसम और तिथि, हर घंटे नए सिरे से पढ़े गए और यहाँ
  पूरे दर्ज किए गए।

Sub-line:
  इस पृष्ठ पर कुछ भी किसी के द्वारा नहीं किया जा रहा है। यह नदी है, जैसी है।

CTA:
  इन्हें सुनिए →


================================================================
THE FIVE BAND SENTENCES
Substitute the river's name. These are the whole vocabulary.
================================================================

EN
---
slack   The Ganga is running thin tonight, lower than she is on nine days
        out of ten at this turn of the year.

low     The Ganga is running low tonight, below what this week usually
        brings her.

usual   The Ganga is running as she usually runs at this turn of the year.

full    The Ganga is running full tonight, above what this week usually
        brings her.

spate   The Ganga is in spate tonight, higher than she has been on
        ninety-five days out of a hundred at this turn of the year.

HI
---
slack   आज रात गंगा पतली धार में बह रही हैं, वर्ष के इस मोड़ पर दस में से नौ
        दिनों से भी कम।

low     आज रात गंगा कम पानी में हैं, इस सप्ताह जो सामान्यतः आता है उससे नीचे।

usual   गंगा वर्ष के इस मोड़ पर अपने सामान्य बहाव में बह रही हैं।

full    आज रात गंगा भरी हुई बह रही हैं, इस सप्ताह जो सामान्यतः आता है उससे ऊपर।

spate   आज रात गंगा उफान पर हैं, वर्ष के इस मोड़ पर सौ में से पंचानबे दिनों से
        भी ऊँची।


================================================================
TREND (renders beside the band word, caret in spot vermillion)
================================================================

EN      ▲ rising since Tuesday   ·   ▬ steady   ·   ▼ falling since Tuesday
HI      ▲ मंगलवार से चढ़ रही हैं  ·  ▬ स्थिर  ·  ▼ मंगलवार से उतर रही हैं


================================================================
TALAKAVERI — the one water that needs its own sentence
================================================================

EN
---
  At Talakaveri the Kaveri is 5.8 cubic metres a second. She is not a river
  here yet. She is a spring in a temple tank, and you could step across her.
  Four hundred kilometres downstream at Paschima Vahini she is 176, and
  turning north.

HI
---
  तलकावेरी में कावेरी 5.8 घन मीटर प्रति सेकंड हैं। यहाँ वे अभी नदी नहीं हैं।
  वे एक मंदिर-कुंड में उद्गम हैं, और आप उन्हें एक कदम में पार कर लें। चार सौ
  किलोमीटर आगे पश्चिम वाहिनी पर वे 176 हैं, और उत्तर की ओर मुड़ रही हैं।


================================================================
THE PROVENANCE BLOCK — under a hairline rule, small label voice.
Appears on every Now page. Load-bearing. Do not shorten.
================================================================

EN
---
  HOW THIS PAGE KNOWS

  Flow is modelled river discharge from the Copernicus Emergency Management
  Service global flood model, read at the grid cell covering this reach and
  updated daily. It is a model, not a gauge reading. We rank it against every
  daily value that cell has produced in this same week of the year from 1991
  to 2025, which is what the percentile means.

  Sunrise, sunset, air temperature and rainfall are read at the ghat's own
  coordinates. Tithi and the muhurat windows are computed from the panchang
  against that ghat's true sunrise.

  We measure nothing ourselves. We have no camera, no microphone and no
  device at any ghat. Nothing on this page is performed by anyone on anyone's
  behalf.

  River data by Copernicus EMS via Open-Meteo, CC BY 4.0.
  Station registry: Central Water Commission, National Water Data Portal.

HI
---
  यह पृष्ठ कैसे जानता है

  बहाव कोपरनिकस आपातकालीन प्रबंधन सेवा के वैश्विक बाढ़ मॉडल से लिया गया
  प्रतिरूपित नदी-प्रवाह है, जो इस धारा को ढकने वाले ग्रिड-खंड पर पढ़ा जाता है
  और प्रतिदिन नवीनीकृत होता है। यह एक मॉडल है, गेज का पाठ नहीं। हम इसकी तुलना
  1991 से 2025 तक वर्ष के इसी सप्ताह में उसी खंड के हर दैनिक मान से करते हैं,
  प्रतिशतक का यही अर्थ है।

  सूर्योदय, सूर्यास्त, वायु का तापमान और वर्षा घाट के अपने निर्देशांक पर पढ़े
  जाते हैं। तिथि और मुहूर्त उसी घाट के वास्तविक सूर्योदय के आधार पर पंचांग से
  गणना किए जाते हैं।

  हम स्वयं कुछ नहीं मापते। किसी भी घाट पर हमारा कोई कैमरा, कोई माइक्रोफ़ोन और
  कोई यंत्र नहीं है। इस पृष्ठ पर कुछ भी किसी के लिए किसी के द्वारा नहीं किया
  जा रहा है।

  नदी-आँकड़े: Copernicus EMS, Open-Meteo के माध्यम से, CC BY 4.0.
  स्टेशन सूची: केंद्रीय जल आयोग, राष्ट्रीय जल आँकड़ा पोर्टल।


================================================================
DEGRADED STATES — the only three lines the user ever sees
================================================================

EN
---
cached  Read at 04:00 IST today. The river moves slowly; this still holds.
normal  We could not reach the river this morning. This is what the Ganga
        usually does on the eleventh of August, taken from thirty-five
        years of Augusts.

HI
---
cached  आज 04:00 IST पर पढ़ा गया। नदी धीरे बदलती है; यह अब भी सही है।
normal  आज सुबह हम नदी तक नहीं पहुँच सके। यह वह है जो गंगा सामान्यतः
        ग्यारह अगस्त को करती हैं, पैंतीस वर्षों के अगस्त से लिया गया।


================================================================
THE AUDIO CONTROL
================================================================

EN      Listen to the Ganga as she is running now
        Four minutes. Headphones, if you have them.
HI      गंगा को सुनिए, जैसी वे इस समय बह रही हैं
        चार मिनट। हो सके तो हेडफ़ोन लगाइए।


================================================================
THE LINE ITSELF — for the home page, above the fold
================================================================

EN
---
  Our servers are in the river.

  Not as a figure of speech. The Ganga's discharge this hour, the Shipra's
  rise since Tuesday, the minute the sun cleared the Sangam this morning:
  all of it flows into this page and changes what you hear. Tonight the
  Godavari at Nashik is higher than she has been on ninety-five days out of
  a hundred at this turn of the year, and she sounds like it.

  The river is the input.

HI
---
  हमारे सर्वर नदी में हैं।

  यह कोई अलंकार नहीं है। इस घंटे गंगा का प्रवाह, मंगलवार से शिप्रा की चढ़ाई,
  आज सुबह जिस मिनट सूर्य संगम से ऊपर उठा: यह सब इस पृष्ठ में बहकर आता है और
  बदल देता है कि आप क्या सुनते हैं। आज रात नासिक में गोदावरी वर्ष के इस मोड़
  पर सौ में से पंचानबे दिनों से ऊँची हैं, और वे वैसी ही सुनाई देती हैं।

  नदी ही निवेश है।


## Open questions

- Audio stems are the single largest sensory lever and I could not verify licensing for any specific recording. Decision needed: ship v1 on CC0 hydro loops from Freesound (free, generic, no ghat identity) and commission the six ghat-specific layers later, or hold the audio feature until the $2,500 of recording sessions is done? My recommendation is ship on CC0 and commission in parallel, because the four-stem live mix works before the ghat layers exist.
- Open-Meteo API Standard: tier structure and the commercial-use requirement are confirmed, but the euro price is only visible at Stripe checkout and I could not reach it. Someone needs to click through and confirm it is under €50/month before this is committed to. If it is materially more, Google Flood Hub with a Cloud key becomes the cheaper spine and is one day of work.
- Do we show raw m3/s at all, or only the percentile band? Showing 5,688 next to 5.8 invites the wrong comparison between the Sangam and Talakaveri. I have designed the table with both, band first, but I would defend hiding the absolute number on the index and keeping it only on the per-river page.
- Kaveri canonical cell: I have Talakaveri as primary (5.8 m3/s, honest and striking) with Paschima Vahini as a second panel. If the product ever sells a Kaveri sankalp, is the source or the reach the thing the buyer is oriented toward? That is a content decision, not a data one.
- Live YouTube aarti feeds are UNVERIFIED. I ran out of web search budget before confirming any channel. I have recommended no video at all on both rights and design grounds, but if the owner wants it, the rights question about embedding a third party's ghat stream needs a real answer first.
- The CWC station registry pull covers only Godavari and Cauvery, because Ganga basin is absent from the National Water Data Portal. That means Haridwar, Prayagraj, Mathura and Ujjain get no named government gauge on their pages while Nashik and Talakaveri do. Accept the asymmetry, or drop the station credit everywhere for consistency?