/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The sitting, in words.

   Almost nothing is said out loud here. The screen does the pacing and the
   instructions are one line each, because a person reading a paragraph is a
   person not breathing. Five names for the five parts, one instruction each,
   and the two words that appear on the breath.

   NOTHING COUNTS DOWN IN NUMBERS. There is no timer, no progress percentage
   and no "2 of 5". The only visible progress is the ink filling under your
   thumb, and that one is a gesture rather than a clock.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "This morning | Snanify",
    description: "Three minutes with your river.",
  },

  begin: {
    ready: "Begin when you are ready.",
    cta: "Begin",
    quiet: "Put the phone on silent. It takes three minutes.",
  },

  reading: {
    label: "The reading",
    flowLabel: "Flow",
    rankLabel: "Ranked",
    modelledLabel: "Modelled for",
    normalLabel: "Seasonal median",
    percentile: "{n}th percentile since 1997",
    source: "{model}, modelled daily.",
  },

  breath: {
    label: "The breath",
    in: "In",
    out: "Out",
  },

  vow: {
    label: "Your sankalp",
    hold: "Hold your thumb on your words.",
    holding: "Keep holding.",
    done: "Held.",
  },

  stillness: {
    label: "The stillness",
    instruction: "Put the phone down.",
  },

  mark: {
    label: "The mark",
    writing: "Your morning is being written into your register.",
    done: "Your morning is kept.",
  },

  already: {
    title: "This morning is kept",
    body: "One morning a day. The next one is tomorrow.",
    cta: "Open this morning's sheet",
  },

  failed: {
    title: "Your morning did not save",
    body: "Your account still has the same number of mornings. Try again.",
    cta: "Try again",
  },

  left: "{n} mornings left",
  leftOne: "One morning left",
};

const hi = {
  meta: {
    title: "आज सुबह | Snanify",
    description: "अपनी नदी के साथ तीन मिनट।",
  },

  begin: {
    ready: "जब तैयार हों, आरंभ कीजिए।",
    cta: "आरंभ",
    quiet: "फ़ोन को मौन पर रखिए। इसमें तीन मिनट लगते हैं।",
  },

  reading: {
    label: "पाठ",
    flowLabel: "प्रवाह",
    rankLabel: "स्थान",
    modelledLabel: "मॉडल दिनांक",
    normalLabel: "ऋतु-मध्यक",
    percentile: "1997 से {n}वाँ प्रतिशतक",
    source: "{model}, प्रतिदिन मॉडल-मान।",
  },

  breath: {
    label: "श्वास",
    in: "लीजिए",
    out: "छोड़िए",
  },

  vow: {
    label: "आपका संकल्प",
    hold: "अपने शब्दों पर अंगूठा रखिए।",
    holding: "थामे रहिए।",
    done: "थाम लिया।",
  },

  stillness: {
    label: "मौन",
    instruction: "फ़ोन नीचे रख दीजिए।",
  },

  mark: {
    label: "चिह्न",
    writing: "आपकी सुबह आपकी पंजिका में लिखी जा रही है।",
    done: "आपकी सुबह रख ली गई।",
  },

  already: {
    title: "यह सुबह रख ली गई",
    body: "दिन में एक सुबह। अगली कल है।",
    cta: "आज का पत्र खोलिए",
  },

  failed: {
    title: "आपकी सुबह सहेजी नहीं गई",
    body: "आपके खाते में सुबहें उतनी ही हैं जितनी पहले थीं। फिर कोशिश कीजिए।",
    cta: "फिर कोशिश कीजिए",
  },

  left: "{n} सुबहें शेष",
  leftOne: "एक सुबह शेष",
};

export const todayContent = { en, hi } satisfies Record<Lang, typeof en>;
