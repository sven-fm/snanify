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
   promises an outcome. Where the numbers come from is on /faq#how.

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
      "A digital snan. Sit three minutes with the river you grew up near, at the hour the panchang names, and send your family the sheet that comes out of it. Six rivers, live.",
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
    account: "Your mornings",
    accountShort: "Mornings",
    profile: "Your account",
    snanSettings: "Your snan",
    buy: "Buy mornings",
    signOut: "Sign out",
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
      lineModelled: "The {river} at {city} is running at {flow} this morning.",
      lineMedian: "The {river} at {city} is running near its seasonal median.",
      flow: "Flow",
      ranked: "Ranked",
      muhurat: "Next muhurat",
      percentile: "{n} percentile since 1997",
      median: "Seasonal median, 1997 to 2025",
      link: "See all six waters",
    },
    record: "Six waters, one figure a day, each ranked against every day since 1997.",
  },
  rivers: {
    title: "Six sacred waters",
    lede: "Pick the one you grew up near. Each has a page of its own, with today's flow and the ghat's calendar.",
  },
  pricing: {
    title: "Eleven mornings for eleven.",
    lede: "One price, in your own currency. Take the mornings whenever you like.",
    labels: {
      each: "Per morning",
    },
    /* The count is the name. The packs once carried coined names with
       Devanagari beside them, three words to learn on the one table where a
       reader decides to pay. */
    tiers: [
      {
        key: "one",
        name: "One morning",
        body: "One morning and the sheet it leaves behind.",
      },
      {
        key: "eleven",
        name: "Eleven mornings",
        body: "One for each morning, paid once. Any eleven days you like. They keep.",
      },
      {
        key: "sixty",
        name: "Sixty mornings",
        body: "Five a month for a year, at the lowest price a morning gets.",
      },
    ],
    /* Read by <TaxNote>: one line for US dollars, one for every other currency. */
    tax: {
      exclusive: "Prices show before US sales tax.",
      inclusive: "Tax included.",
    },
    cta: "How it works",
  },
  /* The sheet a stranger sees before paying: drawn from today's figure, for
     a family that does not exist, and labelled as a specimen on its face. */
  specimen: {
    label: "Specimen",
    alt: "A Sankalp Patra, as it arrives on a phone: two names, the Ganga at Haridwar, today's flow and rank.",
    caption: "A sheet as it arrives in a family group, drawn from the Ganga's own figure today.",
  },
  notFound: {
    code: "404",
    title: "No ghat at this address.",
    lede: "The river moved, or the link did. The six waters are still where they were.",
    cta: "Back to the river",
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
      { h: "Practice", links: ["Begin", "The snan"] },
      { h: "Reference", links: ["Panchang", "The rivers now", "Sacred waters", "Muhurat", "Questions"] },
      { h: "Legal", links: ["Privacy", "Terms", "Refunds"] },
    ],
    made: "Prayagraj and Berlin",
    rights: "© 2026 Snanify",
  },
};

/** The shape every other locale in this directory is checked against. */
export type LandingCopy = typeof en;
