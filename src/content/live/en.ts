import type { FlowBand, Trend, WaterSlug, WeatherId } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   /live, the copy.

   Rules this file is written under:

   1. NOTHING IS PERFORMED, and this page does not say so. It reports a river,
      and reporting it is the whole of the job. The commitment in the negative
      lives on /ethics.
   2. NOTHING IS PROMISED. No outcome is attached to reading this page or to
      anything sold elsewhere on the site.
   3. EVERY NUMBER SAYS WHERE IT CAME FROM. "Modelled" stands beside the flow
      every time the flow appears, because it is a model output and not a
      gauge reading. Cutting the page never cuts a provenance label.
   4. THE ARCHIVE STARTS IN 1997. The Copernicus reanalysis returns nulls
      before that, so 1997 is the floor and no string here says 1991.
   5. PLAIN SENTENCES. A noun, a verb, a full stop. The page once opened with
      "The river, reported. Free to read, and it stays free." and closed on
      "The reading is free. You pay for the morning.", and the rivers were
      "she" throughout. Fragments used as beats, two-fragment headlines and a
      river personified in a data report are the rhythm generated copy falls
      into, and every one was rewritten as something a person would say.
   6. HINDI IS WRITTEN, NOT CONVERTED. Rivers take the respectful plural
      there, as they do in speech.
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
   English is the source edition and defines `LiveCopy`; every other file in
   this directory closes with `satisfies LiveCopy`, so a key added here without
   its translation is a compile error.

   This is the daily-return surface and the most numerate page on the site.
   Two things follow from that and hold in every locale:

   1. EVERY NUMBER STAYS CHECKABLE. Units, years and the {braces} that `fill`
      substitutes are identical across locales. A translated placeholder is a
      runtime hole, and a translated unit is a number nobody can verify.
   2. "MODELLED" IS SAID EVERY TIME. The flow is a model output and not a gauge
      reading, and no locale is allowed to quietly upgrade it to a measurement.
   --------------------------------------------------------------------------- */

export const en = {
  meta: {
    title: "Six sacred waters, live | Snanify",
    description:
      "Modelled flow, sunrise, weather and today's muhurat windows at six sacred waters, from the Ganga at Haridwar to the Kaveri at Talakaveri. Ranked against 1997 to 2025. Free to read.",
  },

  badges: {
    live: "Live from six waters",
    cached: "Six waters, the latest readings",
    normal: "Six waters, seasonal normals",
  },
  /* The breadcrumb name, read by src/app/[lang]/live/page.tsx. */
  crumb: "The rivers, live",
  title: "How the rivers are running today.",
  standfirst:
    "Six waters, one page. The modelled flow, sunrise and sunset, the weather and today's muhurat windows at each, with the date every figure carries. Free to read.",
  assembled: "This page was assembled at {time} IST.",
  modelledEvery: "The flood model publishes one value per cell per day.",

  index: {
    title: "The six at a glance",
    note: "Each water is ranked against its own record.",
  },

  section: {
    cellLabel: "Grid cell",
    cellNote: "{km} km from the ghat, on the main stem",
    ghatLabel: "Ghat",
  },

  flow: {
    label: "Modelled flow",
    unit: "m³/s",
    modelledFor: "Modelled for {date}",
    rankLabel: "Rank",
    rankSuffix: "against the same week of the year, 1997 to 2025",
    cappedBelow: "in the lowest 5 per cent of the record",
    cappedAbove: "in the highest 5 per cent of the record",
    normalLabel: "Usual for this week",
    normalBody:
      "Since 1997, eight of every ten daily values for this week fell between {p10} and {p90} {unit}. The median is {median} {unit}.",
    scaleLabel: "Thin, low, usual, full, in spate",
    seriesLabel: "The last eleven model days",
    seriesNote: "One bar per day, oldest on the left.",
    trendSince: "over seven days",
    archiveLine: "Every week of the year has {samples} daily values behind it, {from} to {to}.",
  },

  units: {
    mm: "mm",
    kmh: "km/h",
    celsius: "°C",
  },

  bands: {
    slack: "{river} is running thin, lower than on nine days in ten at this time of year.",
    low: "{river} is running low for this week of the year.",
    usual: "{river} is running as it usually does at this time of year.",
    full: "{river} is running full for this week of the year.",
    spate: "{river} is in spate, higher than on nine days in ten at this time of year.",
  } satisfies Record<FlowBand, string>,

  bandWords: {
    slack: "Thin",
    low: "Low",
    usual: "Usual",
    full: "Full",
    spate: "In spate",
  } satisfies Record<FlowBand, string>,

  trends: {
    rising: "Up {pct} per cent {since}",
    steady: "Steady {since}",
    falling: "Down {pct} per cent {since}",
  } satisfies Record<Trend, string>,

  trendPlain: {
    rising: "Rising",
    steady: "Steady",
    falling: "Falling",
  } satisfies Record<Trend, string>,

  feed: {
    liveLabel: "Read today",
    staleLabel: "{days} days old",
    normalLabel: "Seasonal normal",
    liveNote: "The flood model published this value today. It runs once a day.",
    staleNote:
      "The newest value for this cell is {days} days old. River flow changes slowly, so the figure still stands. The date above is the day it was published for.",
    normalNote:
      "The flood model published nothing for this cell today. The figure shown is the usual flow for this week of the year, taken from 1997 to 2025.",
    normalHeading: "Seasonal normal",
  },

  sky: {
    label: "At the ghat",
    sunrise: "Sunrise",
    sunset: "Sunset",
    readAt: "Read at {time} IST.",
    computed: "Computed from the sun's position.",
    day: "Daylight at the ghat.",
    night: "Night at the ghat.",
    air: "Air",
    humidity: "Humidity",
    rainHour: "Rain, this hour",
    rainToday: "Rain today",
    cloud: "Cloud",
    wind: "Wind",
    condition: "Sky",
    noWater: "Open-Meteo gives no water temperature for these places.",
  },

  windows: {
    next: "Next window",
    openNow: "Open now",
    until: "until {time}",
    tomorrow: "tomorrow",
    basis: "Worked out from this ghat's own sunrise, so it differs from the other five.",
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
    "ganga-haridwar": "The Ganga's main stem below Har Ki Pauri, where it leaves the hills.",
    "triveni-prayagraj":
      "The Ganga's main stem below the confluence, so this figure carries the Ganga and the Yamuna together.",
    "yamuna-mathura": "The Yamuna's main stem below Vishram Ghat.",
    "godavari-nashik": "The Godavari's main stem below Ram Kund.",
    "shipra-ujjain": "The Shipra's main stem near Ram Ghat.",
    "kaveri-talakaveri": "The Kaveri in its first kilometres below the spring at Talakaveri.",
  } satisfies Record<WaterSlug, string>,

  talakaveri:
    "At Talakaveri the Kaveri is a spring in a temple tank, so its flow is about a thousandth of the others. It is compared only with its own record.",

  provenance: {
    heading: "Where the numbers come from",
    paras: [
      "Flow is modelled river discharge from the Copernicus Emergency Management Service global flood model, GloFAS. It is read at the grid cell covering each reach and published once a day. It is a model output, and this page says modelled beside every figure.",
      "The grid cell sits near the ghat, and each one is printed above with its distance from it. Each cell was chosen by finding the trunk river in the lattice around the ghat, and it stays fixed.",
      "Each value is ranked against every daily value the same cell produced in the same week of the year, 1997 to 2025. That is 609 values behind each week, and each water is compared only with itself.",
      "Sunrise, sunset, air temperature and rainfall are read at the ghat's own coordinates. The muhurat windows are the panchang's rules applied to that ghat's sunrise, which is why Haridwar and Nashik differ.",
      "The Central Water Commission's National Water Data Portal lists India's own gauges. It publishes no current reading for these six reaches, so every figure here comes from the flood model.",
    ],
    attributionLabel: "Attribution",
    attribution: [
      "River discharge: Copernicus Emergency Management Service, GloFAS, served by Open-Meteo, CC BY 4.0.",
      "Sun and weather: Open-Meteo, CC BY 4.0.",
      "Gauge register: Central Water Commission, National Water Data Portal.",
    ],
  },

  /* The picker and the gauge at the head of the page; see
     src/components/live/LiveHero.tsx. */
  hero: {
    pick: "Choose a water",
    flow: "Flow today",
    rank: "Rank since 1997",
    of: "of 100",
    next: "Next window",
    sunrise: "Sunrise",
    open: "Read the full entry",
    eleven: "Eleven model days",
    dialLabel: "{river}: {band}, {rank} of 100 since 1997",
  },

  pictures: {
    heading: "The pictures",
    credit: "{subject}. Photograph by {author}, {license}, printed here as ink.",
  },

  close: {
    title: "Free to read",
    body: "This page, the panchang, the muhurat calendar and the six water pages cost nothing to read. The three minute snan, sat with this same river data, is what you pay for.",
    links: {
      rivers: "The six waters",
      muhurat: "The muhurat calendar",
      panchang: "The panchang",
    },
  },
};

/** The shape every other locale in this directory is checked against. */
export type LiveCopy = typeof en;
