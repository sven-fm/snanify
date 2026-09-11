/* ---------------------------------------------------------------------------
   The landing edition. English is the source locale: every other file in this
   directory is typed against `LandingCopy` below, so a key added here without a
   translation is a compile error, which is the point.

   HOW THIS COPY IS WRITTEN.

   PLAIN SENTENCES. A noun, a verb, a full stop. The page was once written in
   the rhythm that generated copy falls into: three parallel clauses to a line
   ("its own page, its own days, its own reading this hour"), an aphorism for
   a closing headline, a label on top of every block. Every one of those was
   rewritten as something a person would say to a friend. If a sentence has a
   beat to it, it is probably wrong.

   SAY WHAT THE READER GETS. "Sit three minutes with the river you grew up
   near." "At the end you have a sheet with your family's names on it." Say
   what the thing is, and stop. Nothing here argues for the product, and
   nothing here argues against a critic.

   NO NEGATIVE CONSTRUCTIONS. If a sentence is built on "no", "nobody",
   "nothing" or "there is no", rewrite it until it is built on a noun and a
   verb. This is a rule, not a preference.

   SHORT. The reader is half awake, on a phone, at six in the morning, and for
   many of them English is a third language. One idea per sentence. Common
   words. Full stops over commas.

   THE TWO RULES HOLD: nothing here claims a rite was performed, and nothing
   promises an outcome. Where the numbers come from is on /ethics.

   FIGURES. `hero.record` carries the three figures the owner asked to keep on
   the page, written as a sentence a reader could check: six waters in
   rivers.ts, forty-eight refreshes a day (the page revalidates every thirty
   minutes), and a record that runs back to 1997, which is where the flood
   model's reanalysis starts. The river line and the card are built in
   src/app/[lang]/page.tsx from the same snapshot /live uses; only templates
   live here, and a figure never goes in this file.

   PRICES ARE NOT IN THIS FILE. One price, in the reader's own currency, out of
   src/content/prices.ts; see src/lib/currency.ts for how that currency is
   chosen. `{price}` in hero.offer is filled at render.
   --------------------------------------------------------------------------- */

export const en = {
  htmlLang: "en",
  dir: "ltr" as const,
  meta: {
    title: "Snanify, the river comes to you",
    description:
      "A digital snan. Sit three minutes with the river you grew up near, at the hour the panchang names, and send your family the sheet that comes out of it. Six rivers, live and free to read.",
  },
  /* The one line on the share card a chat app unfurls; see src/lib/site-card.ts. */
  share: "A digital snan. Three minutes with the river you grew up near, and a sheet to send home.",
  themeLabel: "Change theme",
  langLabel: "Language",
  nav: {
    how: "How it works",
    rivers: "Sacred waters",
    muhurat: "Muhurat",
    pricing: "Prices",
    cta: "Begin",
    menu: "Menu",
  },
  edition: "Samvat 2083",
  hero: {
    titleA: "The river",
    titleB: "comes to you.",
    lede: "Sit three minutes with the river you grew up near, at the hour the panchang names. At the end you have a sheet with your family's names on it, and you send it home.",
    ctaPrimary: "Begin your snan",
    ctaSecondary: "See the rivers live",
    offer: "Eleven mornings for {price}. Take them whenever you like.",
    card: {
      /* The one live line above the headline. Two forms, because the feed can
         be quiet, and then the card stands on the seasonal median and says so. */
      lineModelled: "The {river} at {city} is running at {flow}, modelled for {day}.",
      lineMedian: "The {river} at {city} is running near its seasonal median.",
      flow: "Flow",
      ranked: "Ranked",
      modelled: "Modelled for",
      muhurat: "Next muhurat",
      percentile: "{n}th percentile since 1997",
      median: "Seasonal median, 1997 to 2025",
      link: "See all six waters",
    },
    record:
      "Six waters, refreshed forty-eight times a day and ranked against every day since 1997.",
  },
  rivers: {
    title: "Six sacred waters",
    lede: "Pick the one you grew up near. Each has a page of its own, with today's flow and the ghat's calendar.",
  },
  pricing: {
    title: "Eleven mornings for eleven.",
    lede: "The rivers, the panchang and the muhurat calendar are free to read. You pay for the snan and the sheet it leaves behind.",
    free: {
      label: "Free to read",
      items: [
        {
          name: "The rivers, live",
          d: "Today's flow at all six waters, and how it compares with past years.",
          href: "/rivers",
        },
        {
          name: "The panchang",
          d: "Today's tithi and nakshatra, with the muhurat windows in Indian time and in yours.",
          href: "/panchang",
        },
        {
          name: "Muhurat",
          d: "The year's occasions, with the dates and the bathing windows for each.",
          href: "/muhurat",
        },
      ],
    },
    labels: {
      snans: "Mornings",
      each: "Per morning",
      expiry: "Validity",
    },
    tiers: [
      {
        key: "one",
        name: "Ek Dhara",
        alt: "एक धारा",
        sub: "One snan",
        body: "One morning, and the Sankalp Patra that comes out of it.",
        snans: "One",
        expiry: "Forever",
      },
      {
        key: "eleven",
        name: "Gyarah",
        alt: "ग्यारह",
        sub: "Eleven snans",
        body: "Eleven mornings, paid once. Take them on eleven days in a row or spread them through the year.",
        snans: "Eleven",
        expiry: "Forever",
      },
      {
        key: "sixty",
        name: "Varsh Kosh",
        alt: "वर्ष कोष",
        sub: "Sixty snans",
        body: "Sixty mornings, five a month for a year, at the lowest price per morning.",
        snans: "Sixty",
        expiry: "Forever",
      },
    ],
    note: "Prices show before local tax.",
    cta: "How it works",
  },
  notFound: {
    code: "404",
    title: "Page not found",
    lede: "The address may have changed. Start again from the front page.",
    cta: "Go to the front page",
  },
  closing: {
    title: "Begin tomorrow morning.",
    lede: "Set it up tonight and sit with the river before sunrise. The sheet is ready to send the moment you finish.",
    cta: "Begin your snan",
  },
  bar: {
    label: "Eleven mornings",
    cta: "Begin",
  },
  footer: {
    tagline: "A digital snan for Indians everywhere.",
    cols: [
      { h: "Service", links: ["Begin", "The snan", "The river now", "Sacred waters", "Muhurat calendar"] },
      { h: "Company", links: ["Panchang", "Questions", "How it is made"] },
      { h: "Legal", links: ["Privacy", "Terms", "Refunds"] },
    ],
    made: "Prayagraj and Berlin",
    rights: "© 2026 Snanify",
  },
};

/** The shape every other locale in this directory is checked against. */
export type LandingCopy = typeof en;
