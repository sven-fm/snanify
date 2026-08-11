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

   The six waters name themselves through `waterName` in src/content/names.ts,
   so the prose here never hard-codes "Ganga" in a language that writes it
   otherwise.
   --------------------------------------------------------------------------- */

export const en = {
  meta: {
    title: "Six sacred waters, measured daily | Snanify",
    description:
      "The Ganga at Har Ki Pauri, the Sangam at Prayagraj, the Yamuna at Vishram Ghat, the Godavari at Ram Kund, the Shipra at Ram Ghat and the Kaveri at her source. What each place is, what it is traditionally kept for, and its modelled flow ranked against 1997 to 2025. Nothing is performed at any of them.",
  },
  badge: "Six waters · six ghats",
  eyebrow: "Sacred waters",
  title: "Six waters, and the ghats that keep them.",
  lede: "Six rivers, each measured every day, each with its own sunrise and its own calendar. These pages describe the places: the river, the steps, the history, and what the water has been kept for over a very long time. Snanify performs nothing at any of them, and says so on every page.",
  presence: {
    label: "What Snanify does at these six places",
    body: "Nothing. There is no priest of ours at any ghat, no camera on any water, no device on any step, and no recording of anything happening anywhere. What Snanify has is the measured state of these six rivers, read daily from a public flood model, their sunrises, their muhurat windows, and four and a half minutes in which you make your own sankalp. The river comes to you means exactly that: the river's own numbers arrive on your screen, and you sit with them.",
  },
  lead: { label: "The first water", read: "Read this water" },
  index: {
    label: "The other five",
    title: "Five more, each with its own character.",
    lede: "They are not interchangeable. One is a confluence reached by boat, one is a town's ghat of rest, one is where a city gives its dead to the water, one stands under the city of Mahakal, and one is not a ghat at all.",
    read: "Read",
  },
  offer: {
    eyebrow: "What is here",
    title: "Four things at every water.",
    lede: "The same four at all six, and nothing else. Three of them are free to read, with no account, and they always will be.",
    items: [
      {
        key: "state",
        name: "Her measured state",
        body: "Modelled river discharge in cubic metres a second at the grid cell covering that reach, from the Copernicus Emergency Management Service global flood model through Open-Meteo, published once a day. It is a model, not a gauge reading. Every value is ranked against every daily value that same cell has produced in this same week of the year from 1997 to 2025, which is what the percentile means.",
      },
      {
        key: "sunrise",
        name: "Her sunrise",
        body: "Sunrise and sunset read at the ghat's own coordinates rather than at the grid cell, because weather belongs at the ghat and discharge belongs on the main stem. Haridwar's sunrise and Nashik's are half an hour apart and the site treats them as the different facts they are.",
      },
      {
        key: "muhurat",
        name: "Her muhurat windows",
        body: "Brahma, pratah, abhijit and godhuli, resolved as the panchang's own rules against that ghat's true sunrise. That is why the windows for one water do not agree with the windows for another, and why no single national timing is printed anywhere on this site.",
      },
      {
        key: "sitting",
        name: "A sitting you take yourself",
        body: "Four and a half minutes on your own screen, against the state that river is actually in at the hour you sit. Your sankalp, in your words, made by you. Nobody stands in for you, because there is nobody to stand in.",
      },
    ],
    note: "No priest. No ghat performance. No camera, no stream, no recording. Nothing posted to you: no prasad, no bottled jal, no thread in an envelope.",
  },
  choosing: {
    eyebrow: "Choosing",
    title: "Which water, and why.",
    lede: "There is no better and worse water here. There are waters a particular thing belongs to, and this page would rather tell you which than send you to whichever name you already know.",
    rows: [
      {
        key: "first",
        label: "If you have not sat before",
        body: "Ganga at Har Ki Pauri, or Shipra at Ram Ghat. Both are working bathing ghats with a daily evening aarti, both have long steps that hold water through most of the year, and both are waters whose figures move legibly with the season, so the reading you sit with means something within a fortnight of watching it.",
      },
      {
        key: "pitru",
        label: "For remembrance",
        body: "Godavari at Ram Kund, or the Sangam at Prayagraj. Ram Kund is Nashik's asthi visarjan tirth and is a place of shraddha before it is anything else; at Prayagraj pind daan is conducted by the Prayagwal purohits, who hold that right by descent. Both are kept in person, by families who are there. Snanify does not arrange either and cannot, and neither is what is sold here.",
      },
      {
        key: "bhakti",
        label: "For Braj",
        body: "Yamuna at Vishram Ghat. In the Braj tradition the Yamuna is approached as someone loved rather than as a purifier, and that changes the words that are said. Read the page for the state of that water before you choose it; it is not flattering and it is not hidden.",
      },
      {
        key: "source",
        label: "For the source itself",
        body: "Talakaveri. It is not a ghat, it is the spring the Kaveri rises from, inside a temple tank on Brahmagiri, and her figure is a few cubic metres a second rather than a few thousand. That is the truth of the place and it is the most striking number on the site. If what you want is a Kaveri snan, the page names the waters downstream that it belongs at.",
      },
    ],
  },
  honesty: {
    eyebrow: "Plainly",
    title: "What this is, and what it is not.",
    isLabel: "This is",
    isBody:
      "Four and a half minutes on your own screen, against the state a river is actually in at the hour you sit with her. Her modelled flow, ranked against thirty years of her own history in this same week of the year. Her sunrise. The panchang's windows resolved against it. Your own sankalp, in your own words. One mark drawn from the reading, and one line in a register you keep.",
    isNotLabel: "This is not",
    isNotBody:
      "It is not a rite performed at a ghat. Nobody stands in the water for you, because there is nobody. Nothing is filmed, streamed or recorded at any of these six places, and nothing is posted to you. It is not a substitute for standing in the river yourself, and it makes no claim about your health, your fortune, your examinations or any other outcome.",
  },
  closing: {
    title: "Read a water before you choose one.",
    lede: "Each page says what the place is, what it is traditionally kept for, what cannot be done from a distance, who looks after it, and how its figure is read.",
    cta: "Begin your snan",
  },
  formLabels: {
    "flowing-ghat": "A working bathing ghat",
    confluence: "A confluence, reached by boat",
    "temple-tank": "A temple tank at the river's source",
  } satisfies Record<WaterForm, string>,
  notAGhat: "Not a ghat"
};

/** The shape every other locale in this directory is checked against. */
export type RiversIndexCopy = typeof en;
