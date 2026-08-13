import type { WaterForm } from "@/content/rivers";

/* ---------------------------------------------------------------------------
   The waters index, /rivers, in twelve locales.

   English is the source edition and defines `RiversIndexCopy`; every other file
   in this directory closes with `satisfies RiversIndexCopy`, so a key added
   here without its eleven translations is a compile error in eleven places.

   This page is the free daily surface and the one a search for a river name
   should land on, which is why it is written out in full in every locale rather
   than falling back. The two rules hold in all of them: nothing is performed at
   any of the six, and no outcome is promised.

   HOW THIS PAGE STOPPED ARGUING WITH ITSELF, August 2026.

   It used to be built out of denials. `presence.body` opened with the single
   word "Nothing." and ran through no priest, no camera, no device, no
   recording; `offer.note` was five more of them, down to no thread in an
   envelope; the choosing lede opened "There is no better and worse water
   here". CLAUDE.md is explicit that the commitment stated at length and in the
   negative belongs on /ethics "and nowhere else", so all of that was the wrong
   page carrying it, at roughly twice the length the page needed.

   The blocks stayed, because the layout is built on them, and each one now
   states the positive fact instead: what Snanify carries, what the four things
   are, which water a thing belongs to. `honesty.isNotBody` keeps only the two
   disclosures that are load-bearing, the rite and the outcome, and points at
   /ethics for the rest.

   The six waters name themselves through `waterName` in src/content/names.ts,
   so the prose here never hard-codes "Ganga" in a language that writes it
   otherwise.
   --------------------------------------------------------------------------- */

export const en = {
  meta: {
    title: "Six sacred waters, measured daily | Snanify",
    description:
      "The Ganga at Har Ki Pauri, the Sangam at Prayagraj, the Yamuna at Vishram Ghat, the Godavari at Ram Kund, the Shipra at Ram Ghat and the Kaveri at her source. What each place is, what it is kept for, and its modelled flow ranked against 1997 to 2025.",
  },
  badge: "Six waters · six ghats",
  eyebrow: "Sacred waters",
  title: "Six waters, and the ghats that keep them.",
  lede: "Six rivers, each measured every day, each with its own sunrise and its own calendar. These pages describe the places.",
  presence: {
    label: "What Snanify does at these six places",
    body: "Snanify carries their measured state, read daily from a public flood model, their sunrises, their muhurat windows, and the four and a half minutes in which you make your own sankalp.",
  },
  lead: { label: "The first water", read: "Read this water" },
  index: {
    label: "The other five",
    title: "Five more, each with its own character.",
    lede: "One is a confluence reached by boat, one is a town's ghat of rest, one is where a city gives its dead to the water, one stands under the city of Mahakal, and one is a spring in a temple tank.",
    read: "Read",
  },
  offer: {
    eyebrow: "What is here",
    title: "Four things at every water.",
    lede: "The same four at all six. Three of them are free to read, and they always will be.",
    items: [
      {
        key: "state",
        name: "Her measured state",
        body: "Modelled river discharge at the grid cell covering that reach, from the Copernicus global flood model, published once a day. A model rather than a gauge reading, ranked against that same cell in this week of the year, 1997 to 2025.",
      },
      {
        key: "sunrise",
        name: "Her sunrise",
        body: "Sunrise and sunset read at the ghat's own coordinates. Haridwar's and Nashik's are half an hour apart, and the site treats them as the different facts they are.",
      },
      {
        key: "muhurat",
        name: "Her muhurat windows",
        body: "Brahma, pratah, abhijit and godhuli, resolved against that ghat's true sunrise. One water's windows differ from another's.",
      },
      {
        key: "sitting",
        name: "A sitting you take yourself",
        body: "Four and a half minutes on your own screen, against the state that river is in at the hour you sit.",
      },
    ],
    note: "The ethics page states the commitment behind these four in full.",
  },
  choosing: {
    eyebrow: "Choosing",
    title: "Which water, and why.",
    lede: "Each water holds its own things, and this page would rather tell you which than send you to the name you already know.",
    rows: [
      {
        key: "first",
        label: "If you have not sat before",
        body: "Ganga at Har Ki Pauri, or Shipra at Ram Ghat. Both are working bathing ghats with a daily evening aarti, and both carry figures that move legibly with the season.",
      },
      {
        key: "pitru",
        label: "For remembrance",
        body: "Godavari at Ram Kund, or the Sangam at Prayagraj. Ram Kund is Nashik's asthi visarjan tirth; at Prayagraj pind daan is conducted by the Prayagwal purohits, who hold that right by descent.",
      },
      {
        key: "bhakti",
        label: "For Braj",
        body: "Yamuna at Vishram Ghat. In the Braj tradition the Yamuna is approached as someone loved rather than as a purifier, and that changes the words that are said.",
      },
      {
        key: "source",
        label: "For the source itself",
        body: "Talakaveri, the spring the Kaveri rises from, inside a temple tank on Brahmagiri. Her figure is a few cubic metres a second rather than a few thousand.",
      },
    ],
  },
  honesty: {
    eyebrow: "Plainly",
    title: "What this is, and what it is not.",
    isLabel: "This is",
    isBody:
      "Four and a half minutes on your own screen, against the state a river is in at the hour you sit with her. Her modelled flow ranked against twenty-nine years of her own history, her sunrise, and your own sankalp in your own words.",
    isNotLabel: "This is not",
    isNotBody:
      "A rite performed at a ghat, a recording made at one, or a claim about your health, your fortune or any other outcome. The ethics page states the commitment in full.",
  },
  closing: {
    title: "Read a water before you choose one.",
    lede: "Each page says what the place is, what it is kept for, who looks after it, and how its figure is read.",
    cta: "Begin your snan",
  },
  formLabels: {
    "flowing-ghat": "A working bathing ghat",
    confluence: "A confluence, reached by boat",
    "temple-tank": "A temple tank at the river's source",
  } satisfies Record<WaterForm, string>,
  notAGhat: "Not a ghat",
};

/** The shape every other locale in this directory is checked against. */
export type RiversIndexCopy = typeof en;
