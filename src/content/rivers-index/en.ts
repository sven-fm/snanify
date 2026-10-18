import type { WaterForm } from "@/content/rivers";

/* ---------------------------------------------------------------------------
   The waters index, /rivers.

   English is the source edition and defines `RiversIndexCopy`; every other
   file in this directory closes with `satisfies RiversIndexCopy`, so a key
   added here without its translation is a compile error.

   This page is the free daily surface and the one a search for a river name
   should land on. It describes six places and says which to pick. The two
   rules hold: nothing is performed at any of the six, and no outcome is
   promised, and neither is said here, because the page describes places.

   The copy rules are in CLAUDE.md.

   The six waters name themselves through `waterName` in src/content/names.ts.
   --------------------------------------------------------------------------- */

export const en = {
  meta: {
    title: "Six sacred waters, with today's flow | Snanify",
    description:
      "Six sacred waters with today's flow ranked against 1997 to 2025: the Ganga at Haridwar, the Sangam, the Yamuna, the Godavari, the Shipra and the Kaveri.",
  },
  title: "Six sacred waters",
  /** The capitals headline: `{accent}` is set in sindoor. */
  head: {
    title: "Six {accent}.",
    accent: "sacred waters",
    plain: "Read about each one, then choose the river you grew up near.",
  },
  lead: { read: "Read about this water" },
  /** Begin, with the water chosen for a new sheet: a quiet link on each water. */
  here: "Do your snan here",
  index: {
    title: "The other five",
    lede: "Five more waters, each with a page.",
    read: "Read",
  },
  offer: {
    title: "What you find at every water",
    lede: "The same four things at all six.",
    items: [
      {
        key: "state",
        name: "The river's flow",
        body: "Modelled river discharge at the grid cell covering that reach, from the Copernicus global flood model, published once a day. It is a model rather than a gauge, and each value is ranked against that same cell in this week of the year, 1997 to 2025.",
      },
      {
        key: "sunrise",
        name: "The sunrise",
        body: "Sunrise and sunset read at the ghat's own coordinates. Haridwar's and Nashik's are half an hour apart.",
      },
      {
        key: "muhurat",
        name: "The muhurat windows",
        body: "Brahma, pratah, abhijit and godhuli, worked out from that ghat's own sunrise.",
      },
      {
        key: "sitting",
        name: "The snan",
        body: "Three minutes on your own screen with that river at the state it is in, and your own sankalp in your own words.",
      },
    ],
  },
  choosing: {
    title: "Which water to choose",
    lede: "Start with the river you grew up near. Choosing fresh? These four help.",
    rows: [
      {
        key: "first",
        label: "For your first snan",
        body: "The Ganga at Har Ki Pauri, or the Shipra at Ram Ghat. Both are working bathing ghats with a daily evening aarti, and both carry figures that move with the season.",
      },
      {
        key: "pitru",
        label: "For remembrance",
        body: "The Godavari at Ram Kund, or the Sangam at Prayagraj. Ram Kund is Nashik's asthi visarjan tirth. At Prayagraj pind daan is conducted by the Prayagwal purohits, who hold that right by descent.",
      },
      {
        key: "bhakti",
        label: "For Braj",
        body: "The Yamuna at Vishram Ghat. In the Braj tradition the Yamuna is Krishna's own river and is addressed with affection, and that changes the words that are said.",
      },
      {
        key: "source",
        label: "For the source itself",
        body: "Talakaveri, the spring the Kaveri rises from, inside a temple tank on Brahmagiri. Its figure is a few cubic metres a second rather than a few thousand.",
      },
    ],
  },
  closing: {
    title: "Choose your water. Sit with it tomorrow.",
    lede: "Three minutes, at the hour the panchang names, with the river as it runs that morning.",
    cta: "Begin your snan",
  },
  formLabels: {
    "flowing-ghat": "A working bathing ghat",
    confluence: "A confluence, reached by boat",
    "temple-tank": "A temple tank at the river's source",
  } satisfies Record<WaterForm, string>,
};

/** The shape every other locale in this directory is checked against. */
export type RiversIndexCopy = typeof en;
