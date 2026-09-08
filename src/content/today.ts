/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The sitting, in words.

   Almost nothing is said out loud here. The screen does the pacing and the
   instructions are one line each, because a person reading a paragraph is a
   person not breathing. Five labels, five instructions, and the words that
   appear on the breath.

   NOTHING COUNTS DOWN IN NUMBERS. There is no timer, no progress percentage
   and no "2 of 5". A practice that shows you how much is left is a practice
   you are waiting out. The only visible progress is the ink filling under
   your thumb, and that one is a gesture rather than a clock.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "This morning · Snanify",
    description: "Three minutes with your river.",
  },

  begin: {
    eyebrow: "This morning",
    ready: "Begin when you are ready.",
    cta: "Begin",
    quiet: "Sound off, phone up, three minutes.",
  },

  reading: {
    label: "The reading",
    flowLabel: "Flow",
    rankLabel: "Ranked",
    modelledLabel: "Modelled for",
    normalLabel: "Seasonal median",
    distanceLabel: "You are",
    from: "from this water",
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
    released: "Hold it a little longer.",
    done: "Kept.",
  },

  stillness: {
    label: "The stillness",
    instruction: "Put the phone down.",
  },

  mark: {
    label: "The mark",
    writing: "Your morning is being written.",
    done: "Kept.",
    open: "Your Sankalp Patra",
  },

  already: {
    title: "You kept this morning.",
    body: "One morning a day, and yours is done. The river will be here tomorrow.",
    cta: "See this morning's Patra",
  },

  failed: {
    title: "That did not save.",
    body: "Your morning was not charged. Try once more.",
    cta: "Try again",
  },
};

const hi = {
  meta: {
    title: "आज सुबह · Snanify",
    description: "अपनी नदी के साथ तीन मिनट।",
  },

  begin: {
    eyebrow: "आज सुबह",
    ready: "जब तैयार हों, आरंभ कीजिए।",
    cta: "आरंभ",
    quiet: "ध्वनि बंद, फ़ोन सामने, तीन मिनट।",
  },

  reading: {
    label: "पाठ",
    flowLabel: "प्रवाह",
    rankLabel: "स्थान",
    modelledLabel: "मॉडल दिनांक",
    normalLabel: "ऋतु-मध्यक",
    distanceLabel: "आप हैं",
    from: "इस जल से दूर",
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
    released: "थोड़ा और थामिए।",
    done: "रख लिया।",
  },

  stillness: {
    label: "मौन",
    instruction: "फ़ोन नीचे रख दीजिए।",
  },

  mark: {
    label: "चिह्न",
    writing: "आपकी सुबह लिखी जा रही है।",
    done: "रख लिया।",
    open: "आपका संकल्प पत्र",
  },

  already: {
    title: "यह सुबह आपने रख ली।",
    body: "दिन में एक सुबह, और आपकी हो चुकी। नदी कल भी यहीं होगी।",
    cta: "आज का पत्र देखिए",
  },

  failed: {
    title: "वह सहेजा नहीं गया।",
    body: "आपकी सुबह का शुल्क नहीं लिया गया। एक बार और कीजिए।",
    cta: "फिर कीजिए",
  },
};

export const todayContent = { en, hi } satisfies Record<Lang, typeof en>;
