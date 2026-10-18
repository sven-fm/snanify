import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The snan, in words (spec 6.4 and 7.2).

   The snan speaks softly: short, calm, active. The screen does the pacing
   and every line is one idea, because a person reading a paragraph is a
   person not breathing. Inside the sitting there is no selling and no count
   of mornings; the morning seal at the mark is the only number of that kind.

   `{river}` in `begin.ready` is filled at render and set in sindoor.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "This morning | Snanify",
    description: "Three minutes with your river.",
  },

  begin: {
    ready: "Your {river}, this morning.",
    band: "Take three minutes. Put your phone on silent.",
    cta: "Begin",
  },

  /** "Part 2 of 5", read by screen readers over the bar; sighted readers see the bar. */
  partOf: "Part {n} of {total}",
  next: "Next",

  reading: {
    label: "The reading",
    /** "3,880 km from you", from the request's own coordinates. Absent when there are none. */
    distance: "{km} km from you",
  },

  breath: {
    label: "The breath",
    /** Over the river, with the seconds of that half of the breath counting down under it. */
    in: "Breathe in",
    out: "Breathe out",
  },

  vow: {
    label: "Your sankalp",
    hold: "Press and hold until the ink fills",
    holding: "Keep holding",
    done: "Held",
  },

  stillness: {
    label: "The stillness",
    line: "Be still with the river.",
    note: "The river keeps running.",
  },

  mark: {
    label: "The mark",
    done: "Snan done.",
    after: "Your family will want to see this.",
    cta: "Send it to the family",
  },

  already: {
    title: "Snan done.",
    body: "Your family will want to see this.",
    cta: "Open your Sankalp Patra",
    share: "Send it to the family",
    tomorrow: "One snan a day. The next one is tomorrow.",
    /** In place of `tomorrow` when this was the last morning on the account. */
    out: "You kept every morning. Pick your next ones for tomorrow.",
  },

  failed: {
    title: "Your morning is waiting",
    body: "Your account keeps the same number of mornings. Try once more.",
    cta: "Try once more",
  },

  /** The small cross at the corner of the practice. Leaving before the mark spends nothing. */
  leave: "Leave this morning",
};

const hi = {
  meta: {
    title: "आज सुबह | Snanify",
    description: "अपनी नदी के साथ तीन मिनट।",
  },

  begin: {
    ready: "{river} के साथ, आज सुबह।",
    band: "तीन मिनट दीजिए। फ़ोन साइलेंट पर रखिए।",
    cta: "शुरू कीजिए",
  },

  partOf: "{total} में से भाग {n}",
  next: "आगे",

  reading: {
    label: "पाठ",
    distance: "आपसे {km} कि.मी. दूर",
  },

  breath: {
    label: "श्वास",
    in: "साँस लीजिए",
    out: "साँस छोड़िए",
  },

  vow: {
    label: "आपका संकल्प",
    hold: "स्याही भरने तक दबाए रखिए",
    holding: "थामे रहिए",
    done: "थाम लिया",
  },

  stillness: {
    label: "मौन",
    line: "नदी के साथ शांत रहिए।",
    note: "नदी बहती रहती है।",
  },

  mark: {
    label: "चिह्न",
    done: "स्नान हो गया।",
    after: "आपका परिवार इसे देखना चाहेगा।",
    cta: "परिवार को भेजिए",
  },

  already: {
    title: "स्नान हो गया।",
    body: "आपका परिवार इसे देखना चाहेगा।",
    cta: "अपना संकल्प पत्र खोलिए",
    share: "परिवार को भेजिए",
    tomorrow: "दिन में एक स्नान। अगला कल है।",
    out: "आपने हर सुबह निभाई। कल के लिए अपनी अगली सुबहें चुनिए।",
  },

  failed: {
    title: "आपकी सुबह प्रतीक्षा में है",
    body: "आपके खाते में सुबहें उतनी ही हैं जितनी पहले थीं। एक बार फिर कोशिश कीजिए।",
    cta: "एक बार फिर कोशिश कीजिए",
  },

  leave: "यह सुबह छोड़िए",
};

export const todayContent = { en, hi } satisfies Record<Lang, typeof en>;
