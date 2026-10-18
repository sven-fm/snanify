import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   /reminders/off, where the link at the foot of a reminder lands.

   Read in a mail app's own browser, with no session, by somebody who wants
   fewer emails. One line, one button, and once pressed one line saying it is
   done and where to turn it back on. The button is the step that switches
   the email off, so a link scanner opening the page changes nothing.
   --------------------------------------------------------------------------- */

const en = {
  meta: {
    title: "Your morning email | Snanify",
    description: "Switch off the morning email from Snanify.",
  },
  title: "Switch off your morning email",
  body: "Tap below to stop the morning email. Your mornings and your register stay on your account.",
  cta: "Switch off the morning email",
  doneTitle: "Your morning email is off.",
  doneBody: "Turn it back on, or choose another hour, from your account.",
  account: "Open your account",
};

const hi = {
  meta: {
    title: "आपका सुबह का ईमेल | Snanify",
    description: "Snanify का सुबह का ईमेल बंद कीजिए।",
  },
  title: "अपना सुबह का ईमेल बंद कीजिए",
  body: "सुबह का ईमेल रोकने के लिए नीचे दबाइए। आपकी सुबहें और आपकी पंजिका आपके खाते में रहती हैं।",
  cta: "सुबह का ईमेल बंद कीजिए",
  doneTitle: "आपका सुबह का ईमेल बंद है।",
  doneBody: "इसे फिर से चालू करने या दूसरी घड़ी चुनने के लिए अपना खाता खोलिए।",
  account: "अपना खाता खोलिए",
};

export const remindersOffContent = { en, hi } satisfies Record<Lang, typeof en>;
