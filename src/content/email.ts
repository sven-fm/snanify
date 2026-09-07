/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The two emails.

   A receipt is read once, in three seconds, usually while walking. A reminder
   is read at the hour somebody chose to be reminded, half awake. Both are
   therefore four lines and a button, and neither sells anything: the receipt
   goes to somebody who has already paid, and the reminder to somebody with
   mornings in hand.

   The reminder never mentions a streak, a count, or a day missed. It says what
   the river is doing this morning, which is the only true reason to open it.
   --------------------------------------------------------------------------- */

const en = {
  receipt: {
    subject: "Your mornings are ready",
    greeting: "Your mornings are ready.",
    line: "{credits} mornings, {amount}. They sit on your account until you use them.",
    next: "Set up what goes on your sheet once, and then the river, tomorrow at the hour you choose.",
    cta: "Begin",
    link: "Begin here:",
    footer: "Snanify · a digital snan · snanify.com",
  },
  reminder: {
    subject: "The {water} this morning",
    line: "The {water} is running {band} this morning. Three minutes, whenever you are ready.",
    cta: "Sit this morning",
    link: "Sit here:",
    footer: "Change the hour, or stop these, on your account page. Snanify · snanify.com",
  },
};

const hi = {
  receipt: {
    subject: "आपकी सुबहें तैयार हैं",
    greeting: "आपकी सुबहें तैयार हैं।",
    line: "{credits} सुबहें, {amount}। जब तक आप उन्हें लेते नहीं, वे आपके खाते में रहती हैं।",
    next: "पत्र पर क्या जाएगा, यह एक बार तय कीजिए। फिर कल, अपनी चुनी हुई घड़ी पर, नदी।",
    cta: "आरंभ कीजिए",
    link: "यहाँ से आरंभ कीजिए:",
    footer: "स्नानिफ़ाई · एक डिजिटल स्नान · snanify.com",
  },
  reminder: {
    subject: "आज सुबह {water}",
    line: "{water} आज सुबह {band} बह रही है। तीन मिनट, जब आप तैयार हों।",
    cta: "आज सुबह बैठिए",
    link: "यहाँ बैठिए:",
    footer: "घड़ी बदलनी हो या ये सूचनाएँ रोकनी हों, अपने खाते के पृष्ठ पर कीजिए। स्नानिफ़ाई · snanify.com",
  },
};

export const emailContent = { en, hi } satisfies Record<Lang, typeof en>;
