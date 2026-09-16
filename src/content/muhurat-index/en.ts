/* ---------------------------------------------------------------------------
   The muhurat calendar, /muhurat.

   English is the source edition and defines `MuhuratIndexCopy`; every other
   file in this directory closes with `satisfies MuhuratIndexCopy`, so a key
   added here without its translation is a compile error.

   WHAT LIVES HERE AND WHAT DOES NOT. These are the keys the index page uses,
   plus the few the detail page shares with it (meta, nav, cta, provenance,
   tiers, windows, anchors). The detail-only copy stayed in muhurat.ts. The
   occasion prose itself is in src/content/data/muhurat.json.

   HOW IT IS WRITTEN. Plain sentences, one idea each, in both editions. Titles
   are a noun phrase or one plain sentence. The page used to open every block
   with a caps label, number things that were not a sequence, and close on an
   aphorism; it also carried two sections that existed to answer a critic
   ("what we will not print", "asked for, and refused"). The facts from those
   are stated plainly under "Kumbh, Simhastha and the solar calendars"; the
   arguing is gone.

   THE PROVENANCE COPY IS LOAD BEARING. Every edition says that the timings
   are provisional until a panchang source is named and checked. /faq#how
   commits to that publicly, so no edition may sound more certain than this
   one. `provenance.line` and `provenance.badge` are also read by the panchang
   page and by the occasion pages' structured data.
   --------------------------------------------------------------------------- */

export const en = {
  meta: {
    indexTitle: "Muhurat calendar, Snanify",
    indexDescription:
      "The occasions of the twelve months ahead, the windows of the day they are kept in, and how much is known about when each one falls.",
    detailSuffix: "Muhurat calendar, Snanify",
  },
  nav: { back: "All occasions" },
  hero: {
    title: "The muhurat calendar",
    lede: "The occasions of the twelve months ahead, the windows of the day they are kept in, and how much is known about when each one falls.",
    asOf: "Twelve months from {date}",
  },
  provenance: {
    badge: "Computed here, checked against Drik Panchang",
    badgeShort: "Computed, checked",
    line: "Every date on this page is computed: the tithi at the ghat's own sunrise, the lunar month named by the sankranti it holds, and the sun's entry into each sign under the Lahiri ayanamsa. The tithi, nakshatra, sunrise and windows were checked against Drik Panchang for Haridwar on eight days between September 2026 and March 2027, every one to the minute, and the dates roll forward by themselves each morning.",
    dates: {
      next: "Next dates",
      one: "The date",
      by: "By the sunrise at {ghat}",
      afterSunset: "The sun enters the sign after sunset, so many keep the day that follows.",
    },
    sourceLabel: "Source",
    ayanamsaLabel: "Ayanamsa",
    coordinatesLabel: "Ghat coordinates",
    coordinatesPending: "Survey pending",
    notSet: "To be fixed",
  },
  reading: {
    title: "How to read this calendar",
    items: [
      {
        t: "Months rather than dates",
        d: "Where an exact date cannot yet be defended, the month and the tithi rule are printed instead. The rule is a definition, so it is a fact.",
      },
      {
        t: "Both clocks",
        d: "Times are given at the ghat first, and beside them in your own zone, with any date shift written out.",
      },
      {
        t: "Sunrise to sunrise",
        d: "The Hindu day turns at sunrise. A window at 4:24 in the morning belongs to the panchang day that opened at the previous dawn.",
      },
    ],
  },
  rhythm: {
    title: "Every month",
    lede: "Four occasions come round on their own schedule and run through every month below.",
  },
  spine: {
    title: "The twelve months ahead",
    empty: "The monthly occasions only.",
    observedAt: "Kept at",
    waters: (n: number) => (n === 1 ? "one water" : `${n} waters`),
    columns: { month: "Month", occasion: "Occasion", rule: "Tithi rule", window: "When" },
  },
  windows: {
    title: "The four windows of the day",
    lede: "Each window is a rule rather than a clock time. It is counted in muhurtas from sunrise, from the sun's transit or from sunset, and a muhurta is a fifteenth of the day or of the night, so the windows stretch and shrink with the season and hold at every latitude.",
    formulaLabel: "Definition",
    lengthLabel: "Length",
    basisLabel: "Why this hour",
    minutes: (n: number) => `about ${n} minutes`,
    diagramLabel: "A day, with the four windows marked in their order",
    diagram: { sunrise: "Sunrise", noon: "Solar transit", sunset: "Sunset" },
    alsoTitle: "Also shown on the day",
  },
  clock: {
    title: "Reading the clock",
    lede: "A window at the ghat is one moment in time. The date it carries on your own calendar depends on where you are, and for much of the diaspora it is the previous evening.",
    atTheGhat: "At the ghat",
    elsewhere: "The same moment elsewhere",
    illustration:
      "An illustration, worked from an assumed sunrise of 06:00 IST on a notional day. It is not a panchang date, and no occasion falls on it.",
    assumed: "Assumed sunrise",
    window: "Window",
  },
  elsewhere: {
    title: "Kumbh, Simhastha and the solar calendars",
  },
  cta: {
    title: "Choose your river",
    lede: "Every occasion here is kept at one of the six waters. Start with the one you grew up near.",
    primary: "The six waters",
    secondary: "The occasion list",
  },
  tiers: {
    nitya: "A daily observance",
    punya: "A recurring parva",
    parva: "A major occasion",
    mahaparva: "One of the year's great days",
  },
  anchors: {
    sunrise: "From sunrise",
    "solar-noon": "From the sun's transit",
    sunset: "From sunset",
  },
};

/** The shape every other locale in this directory is checked against. */
export type MuhuratIndexCopy = typeof en;
