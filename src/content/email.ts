/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";
import type { FlowBand } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   The two emails.

   A receipt is read once, in three seconds, usually while walking. A reminder
   is read at the hour somebody chose, half awake. Both are four lines and a
   button. The receipt goes to somebody who has already paid, and the reminder
   to somebody with mornings in hand, so neither sells anything.

   The reminder says what the river is doing this morning, which is the reason
   to open it. It never mentions a streak, a count, or a day missed.
   --------------------------------------------------------------------------- */

const en = {
  receipt: {
    subject: "Your mornings are ready",
    greeting: "Your mornings are ready.",
    line: "{credits} mornings for {amount}. They stay on your account until you use them.",
    next: "Set up your sheet once. Then sit with the river tomorrow, at the hour you choose.",
    cta: "Set up your sheet",
    link: "Set up your sheet here:",
    footer: "Snanify, a digital snan. snanify.com",
  },
  reminder: {
    subject: "The {water} this morning",
    /* One sentence per flow band, so the mail never prints a raw band word. */
    lines: {
      slack: "The {water} is running thin this morning. Sit whenever you are ready.",
      low: "The {water} is running low this morning. Sit whenever you are ready.",
      usual: "The {water} is running at its usual level this morning. Sit whenever you are ready.",
      full: "The {water} is running full this morning. Sit whenever you are ready.",
      spate: "The {water} is in spate this morning. Sit whenever you are ready.",
    } satisfies Record<FlowBand, string>,
    cta: "Sit this morning",
    link: "Open this morning here:",
    footer: "Change the hour, or stop these reminders, on your account page. Snanify, snanify.com",
  },
};

const hi = {
  receipt: {
    subject: "आपकी सुबहें तैयार हैं",
    greeting: "आपकी सुबहें तैयार हैं।",
    line: "{amount} में {credits} सुबहें। जब तक आप इन्हें लेते हैं, ये आपके खाते में रहती हैं।",
    next: "अपना पत्र एक बार तय कीजिए। फिर कल, अपनी चुनी हुई घड़ी पर, नदी के साथ बैठिए।",
    cta: "अपना पत्र तय कीजिए",
    link: "अपना पत्र यहाँ तय कीजिए:",
    footer: "Snanify, एक डिजिटल स्नान। snanify.com",
  },
  reminder: {
    subject: "आज सुबह {water}",
    lines: {
      slack: "{water} आज सुबह बहुत कम बह रही है। जब तैयार हों, बैठिए।",
      low: "{water} आज सुबह कम बह रही है। जब तैयार हों, बैठिए।",
      usual: "{water} आज सुबह अपने सामान्य स्तर पर बह रही है। जब तैयार हों, बैठिए।",
      full: "{water} आज सुबह भरपूर बह रही है। जब तैयार हों, बैठिए।",
      spate: "{water} आज सुबह उफान पर है। जब तैयार हों, बैठिए।",
    } satisfies Record<FlowBand, string>,
    cta: "आज सुबह बैठिए",
    link: "आज की सुबह यहाँ खोलिए:",
    footer: "घड़ी बदलनी हो या ये सूचनाएँ रोकनी हों, तो अपने खाते के पृष्ठ पर कीजिए। Snanify, snanify.com",
  },
};

export const emailContent = { en, hi } satisfies Record<Lang, typeof en>;
