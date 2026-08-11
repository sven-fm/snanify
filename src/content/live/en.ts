import type { FlowBand, Trend, WaterSlug, WeatherId } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   /live, the copy.

   Rules this file is written under:

   1. NOTHING IS PERFORMED. No priest stands anywhere, no rite is held, nothing
      happens at any ghat on anyone's behalf, and no sentence here may imply
      that it does. The page reports a river. That is the whole of it.
   2. NOTHING IS PROMISED. No outcome, spiritual or otherwise, is attached to
      reading this page or to anything sold elsewhere on the site.
   3. EVERY NUMBER SAYS WHERE IT CAME FROM. The word "modelled" appears beside
      the flow every time the flow appears, because it is a model output and not
      an instrument reading, and the difference is the difference between a
      publication and a liability.
   4. THE ARCHIVE STARTS IN 1997. The Copernicus reanalysis returns nulls before
      that, so 1997 is the honest floor and no string here says 1991.
   5. HINDI IS WRITTEN, NOT CONVERTED. Rivers take the respectful plural, as
      they do in speech.
   --------------------------------------------------------------------------- */

/**
 * Fill a `{token}` template. A token with no value is left standing rather than
 * blanked, so a missing substitution shows up in review instead of shipping as
 * a hole in a sentence.
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

/* ---------------------------------------------------------------------------
   The live river page, /live, in twelve locales.

   English is the source edition and defines `LiveCopy`; every other file in
   this directory closes with `satisfies LiveCopy`, so a key added here without
   its eleven translations is a compile error in eleven places.

   This is the daily-return surface and the most numerate page on the site.
   Two things follow from that and hold in every locale:

   1. EVERY NUMBER STAYS CHECKABLE. Units, years and the {braces} that `fill`
      substitutes are identical across all twelve. A translated placeholder is a
      runtime hole, and a translated unit is a number nobody can verify.
   2. "MODELLED" IS SAID EVERY TIME. The flow is a model output and not a gauge
      reading, and no locale is allowed to quietly upgrade it to a measurement.
   --------------------------------------------------------------------------- */

export const en = {
  meta: {
    title: "The river, now, six waters live | Snanify",
    description:
      "Modelled discharge, sun, weather and the day's muhurat windows at the Ganga in Haridwar, the Sangam at Prayagraj, the Yamuna at Mathura, the Godavari at Nashik, the Shipra at Ujjain and the Kaveri at her source. Read fresh, ranked against 1997 to 2025, free to read.",
  },

  badges: {
    live: "Live from six waters",
    cached: "Six waters, the most recent readings",
    normal: "Six waters, the feed did not answer",
  },
  eyebrow: "The river, now",
  title: "Six waters, as they are running.",
  standfirst:
    "The Ganga at Haridwar, the Sangam at Prayagraj, the Yamuna at Mathura, the Godavari at Nashik, the Shipra at Ujjain, and the Kaveri where she rises. Flow, light, weather and the day's windows, set out here in full, each with the date it carries.",
  subline:
    "Nothing on this page is performed by anyone. It is the river, reported. Reading it costs nothing and always will.",

  assembled: "This edition assembled {time} IST",
  modelledEvery: "The flood model publishes one value per cell per day",

  index: {
    label: "The six, at a glance",
    note: "Each water reads against its own record, never against another water.",
  },

  section: {
    cellLabel: "Grid cell",
    cellNote: "{km} km from the ghat, on the main stem",
    ghatLabel: "Ghat",
  },

  flow: {
    label: "Flow, modelled",
    unit: "m³/s",
    modelledFor: "Modelled for {date}",
    rankLabel: "Where that sits",
    rankSuffix: "against this same week of the year, 1997 to 2025",
    cappedBelow: "at or under the lowest 5 per cent of the record",
    cappedAbove: "at or over the highest 5 per cent of the record",
    normalLabel: "Usual for this week",
    normalBody:
      "Eight of every ten daily values recorded here in this week since 1997 fall between {p10} and {p90} {unit}. The median is {median} {unit}.",
    scaleLabel: "Slack, low, usual, full, spate",
    seriesLabel: "The last eleven model days",
    seriesNote: "One rule per day, oldest at the left. The tallest is the highest of the eleven.",
    trendSince: "against seven days back",
    archiveLine: "{samples} daily values behind every week of the year, {from} to {to}",
  },

  units: {
    mm: "mm",
    kmh: "km/h",
    celsius: "°C",
  },

  bands: {
    slack:
      "{river} is running thin, lower than she runs on nine days out of ten at this turn of the year.",
    low: "{river} is running low, below what this week usually brings her.",
    usual: "{river} is running as she usually runs at this turn of the year.",
    full: "{river} is running full, above what this week usually brings her.",
    spate:
      "{river} is in spate, higher than she runs on nine days out of ten at this turn of the year.",
  } satisfies Record<FlowBand, string>,

  bandWords: {
    slack: "Thin",
    low: "Low",
    usual: "Usual",
    full: "Full",
    spate: "In spate",
  } satisfies Record<FlowBand, string>,

  trends: {
    rising: "Rising {pct} per cent {since}",
    steady: "Steady {since}",
    falling: "Falling {pct} per cent {since}",
  } satisfies Record<Trend, string>,

  trendPlain: {
    rising: "Rising",
    steady: "Steady",
    falling: "Falling",
  } satisfies Record<Trend, string>,

  feed: {
    liveLabel: "Read today",
    staleLabel: "{days} days behind",
    normalLabel: "Not read today",
    liveNote:
      "Published today by the flood model at this cell. The model runs once a day, so this is the newest value that exists.",
    staleNote:
      "The newest value the model has published for this cell is {days} days old. River discharge moves on a scale of days, so it still holds, and the date above is the real one rather than a fresh stamp on an old number.",
    normalNote:
      "We could not reach the flood model. The figure beside this water is what it usually does in this week of the year, taken from 1997 to 2025. It is not a reading, and nothing here pretends it is.",
    normalHeading: "Seasonal normal, not a reading",
  },

  sky: {
    label: "At the ghat",
    sunrise: "Sunrise",
    sunset: "Sunset",
    readAt: "Read {time} IST at the ghat",
    computed: "Computed here from solar geometry. No weather feed reached us this hour.",
    day: "It is day at the ghat",
    night: "It is night at the ghat",
    air: "Air",
    humidity: "Humidity",
    rainHour: "Rain, this hour",
    rainToday: "Rain today",
    cloud: "Cloud",
    wind: "Wind",
    condition: "Sky",
    noWater:
      "No source we can reach publishes water temperature at any of these six places, so none is printed.",
  },

  windows: {
    next: "Next window",
    openNow: "Open now",
    until: "until {time}",
    tomorrow: "tomorrow",
    basis: "Resolved against this ghat's own sunrise, so it differs from the others.",
  },

  weather: {
    clear: "Clear",
    mainlyClear: "Mainly clear",
    partlyCloudy: "Partly cloudy",
    overcast: "Overcast",
    fog: "Fog",
    drizzle: "Drizzle",
    rain: "Rain",
    heavyRain: "Heavy rain",
    showers: "Showers",
    thunder: "Thunderstorm",
    thunderHail: "Thunderstorm with hail",
    snow: "Snow",
    unknown: "Not reported",
  } satisfies Record<WeatherId, string>,

  subjects: {
    "ganga-haridwar": "The Ganga",
    "triveni-prayagraj": "The Ganga below the Sangam",
    "yamuna-mathura": "The Yamuna",
    "godavari-nashik": "The Godavari",
    "shipra-ujjain": "The Shipra",
    "kaveri-talakaveri": "The Kaveri",
  } satisfies Record<WaterSlug, string>,

  reaches: {
    "ganga-haridwar":
      "The Ganga main stem below Har Ki Pauri, where she has finished her descent from the hills.",
    "triveni-prayagraj":
      "The Ganga main stem below the confluence, so this figure carries the Ganga and the Yamuna together.",
    "yamuna-mathura": "The Yamuna main stem below Vishram Ghat.",
    "godavari-nashik": "The Godavari main stem below Ram Kund.",
    "shipra-ujjain": "The Shipra main stem near Ram Ghat.",
    "kaveri-talakaveri": "The Kaveri in her first kilometres below the spring at Talakaveri.",
  } satisfies Record<WaterSlug, string>,

  talakaveri: {
    label: "Read this one differently",
    body: "At Talakaveri the Kaveri is not a river yet. She is a spring in a temple tank, and her figure sits three orders of magnitude under the others because that is the truth of the place and not a fault in the reading. She is compared here only with herself, as every water on this page is.",
  },

  provenance: {
    heading: "How this page knows",
    paras: [
      "Flow is modelled river discharge from the Copernicus Emergency Management Service global flood model, read at the grid cell covering each reach and published once a day. It is a model, not a gauge reading, and this page says modelled every time it prints a number.",
      "The grid cell is not the ghat. Asking the model for a ghat's own coordinates returns whatever hill stream occupies that cell, so each cell here was found by scanning the lattice around the ghat for the trunk river and is then fixed. Every cell is printed above with its distance from the ghat, so you can check where the number was taken.",
      "We rank each value against every daily value that same cell has produced in this same week of the year from 1997 to 2025, six hundred and nine values behind each week. That is what the percentile means. It is a comparison of one water with itself, which is the only honest one: the Kaveri at her source and the Ganga below Haridwar cannot usefully be set side by side.",
      "Sunrise, sunset, air temperature and rainfall are read at the ghat's own coordinates rather than at the grid cell, because weather belongs at the ghat and discharge belongs on the main stem. The muhurat windows are the panchang's rules resolved against that ghat's true sunrise, which is why Haridwar's and Nashik's do not agree.",
      "The Central Water Commission's National Water Data Portal is the register of India's own gauges. We could not obtain a current gauge reading for any of these six reaches from it, so nothing on this page is a CWC measurement, and we would rather write that sentence than let you assume otherwise.",
      "We measure nothing ourselves. We have no camera, no microphone and no device at any ghat, and nobody performs anything for anyone here or anywhere else on this site.",
    ],
    attributionLabel: "Attribution",
    attribution: [
      "River discharge: Copernicus Emergency Management Service, GloFAS, served by Open-Meteo, CC BY 4.0.",
      "Sun and weather: Open-Meteo, CC BY 4.0.",
      "Gauge register: Central Water Commission, National Water Data Portal.",
    ],
  },

  close: {
    eyebrow: "What is free and what is not",
    title: "The reading is free. The snan is not.",
    body: "This page, the panchang, the muhurat calendar and all six waters cost nothing to read and always will. What is sold is a four and a half minute digital snan against this same river data, and nothing else is sold anywhere on this site.",
    links: {
      rivers: "The six waters",
      muhurat: "The muhurat calendar",
      panchang: "The panchang",
    },
  },
};

/** The shape every other locale in this directory is checked against. */
export type LiveCopy = typeof en;
