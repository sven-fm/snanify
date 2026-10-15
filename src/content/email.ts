import type { Lang } from "@/lib/locales";
import type { FlowBand } from "@/lib/riverdata";
import type { TierKey } from "@/content/prices";

/* ---------------------------------------------------------------------------
   The two emails.

   A receipt is read once, in three seconds, usually while walking. A reminder
   is read at the hour somebody chose, half awake. Both are four lines and a
   button. The receipt goes to somebody who has already paid, and the reminder
   to somebody with mornings in hand, so neither sells anything.

   The receipt names the pack in its first line, gives one button to /today,
   says which address the account signs in with, and points to /account. It
   says nothing about tomorrow: a buyer often sits within the minute.

   The reminder says what the river is doing this morning, which is the reason
   to open it. It never mentions a streak, a count, or a day missed.
   --------------------------------------------------------------------------- */

const en = {
  receipt: {
    /** Per pack, because Hindi agrees the verb with the count. */
    subject: {
      one: "One morning is on your account",
      eleven: "Eleven mornings are on your account",
      sixty: "Sixty mornings are on your account",
    } satisfies Record<TierKey, string>,
    greeting: {
      one: "One morning is on your account.",
      eleven: "Eleven mornings are on your account.",
      sixty: "Sixty mornings are on your account.",
    } satisfies Record<TierKey, string>,
    line: "Paid once: {amount}. Your mornings stay on your account until you use them.",
    next: "Sit with the river whenever you are ready, one morning a day.",
    cta: "Sit with the river",
    link: "Or open it here:",
    signIn: "You sign in with {email}.",
    account: "Your mornings, your register and your reminder hour:",
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
    stop: "Stop these reminders",
    footer: "Change the hour on your account page. Snanify, snanify.com",
  },
};

const hi = {
  receipt: {
    subject: {
      one: "आपके खाते में एक सुबह जुड़ गई",
      eleven: "आपके खाते में ग्यारह सुबहें जुड़ गईं",
      sixty: "आपके खाते में साठ सुबहें जुड़ गईं",
    } satisfies Record<TierKey, string>,
    greeting: {
      one: "आपके खाते में एक सुबह जुड़ गई।",
      eleven: "आपके खाते में ग्यारह सुबहें जुड़ गईं।",
      sixty: "आपके खाते में साठ सुबहें जुड़ गईं।",
    } satisfies Record<TierKey, string>,
    line: "एक बार का भुगतान: {amount}। सुबहें आपके खाते में तब तक रहती हैं जब तक आप उन्हें लेते हैं।",
    next: "जब तैयार हों, नदी के साथ बैठिए, दिन में एक सुबह।",
    cta: "नदी के साथ बैठिए",
    link: "या यहाँ खोलिए:",
    signIn: "आप {email} से प्रवेश करते हैं।",
    account: "आपकी सुबहें, आपकी पंजिका और आपकी सूचना की घड़ी:",
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
    stop: "ये सूचनाएँ रोकिए",
    footer: "घड़ी अपने खाते के पृष्ठ पर बदलिए। Snanify, snanify.com",
  },
};

export const emailContent = { en, hi } satisfies Record<Lang, typeof en>;
