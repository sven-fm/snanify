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

  /** "Part 2 of 5", read by screen readers over the bar; sighted readers see the bar. */
  partOf: "Part {n} of {total}",
  next: "Next",

  reading: {
    label: "The reading",
    flowLabel: "Flow",
    rankLabel: "Ranked",
    normalLabel: "Seasonal median",
    percentile: "{n} percentile since 1997",
  },

  breath: {
    label: "The breath",
    in: "In",
    out: "Out",
  },

  vow: {
    label: "Your sankalp",
    hold: "Press and hold until the ink fills",
    holding: "Keep holding",
    done: "Held",
  },

  stillness: {
    label: "The stillness",
    instruction: "Put the phone down.",
    line: "The river keeps running.",
  },

  mark: {
    label: "The mark",
    writing: "Your morning is being written into your register.",
    done: "Your morning is kept.",
    open: "Open your Sankalp Patra",
  },

  already: {
    title: "Your morning is kept",
    body: "Keep it in your heart. Send it to your family.",
    cta: "Open your Sankalp Patra",
    share: "Send it to family",
    tomorrow: "One morning a day. The next one is tomorrow.",
  },

  failed: {
    title: "Your morning did not save",
    body: "Your account still has the same number of mornings. Try again.",
    cta: "Try again",
  },

  left: "{n} mornings left",
  leftOne: "One morning left",

  /** The small cross at the corner of the practice. Leaving before the mark spends nothing. */
  leave: "Leave this morning",
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

  partOf: "{total} में से भाग {n}",
  next: "आगे",

  reading: {
    label: "पाठ",
    flowLabel: "प्रवाह",
    rankLabel: "स्थान",
    normalLabel: "ऋतु-मध्यक",
    percentile: "1997 से {n}वाँ प्रतिशतक",
  },

  breath: {
    label: "श्वास",
    in: "लीजिए",
    out: "छोड़िए",
  },

  vow: {
    label: "आपका संकल्प",
    hold: "स्याही भरने तक दबाए रखिए",
    holding: "थामे रहिए",
    done: "थाम लिया",
  },

  stillness: {
    label: "मौन",
    instruction: "फ़ोन नीचे रख दीजिए।",
    line: "नदी बहती रहती है।",
  },

  mark: {
    label: "चिह्न",
    writing: "आपकी सुबह आपकी पंजिका में लिखी जा रही है।",
    done: "आपकी सुबह रख ली गई।",
    open: "अपना संकल्प पत्र खोलिए",
  },

  already: {
    title: "आपकी सुबह रख ली गई",
    body: "इसे अपने हृदय में रखिए। अपने परिवार को भेजिए।",
    cta: "अपना संकल्प पत्र खोलिए",
    share: "परिवार को भेजिए",
    tomorrow: "दिन में एक सुबह। अगली कल है।",
  },

  failed: {
    title: "आपकी सुबह सहेजी नहीं गई",
    body: "आपके खाते में सुबहें उतनी ही हैं जितनी पहले थीं। फिर कोशिश कीजिए।",
    cta: "फिर कोशिश कीजिए",
  },

  left: "{n} सुबहें शेष",
  leftOne: "एक सुबह शेष",

  leave: "यह सुबह छोड़िए",
};

export const todayContent = { en, hi } satisfies Record<Lang, typeof en>;
