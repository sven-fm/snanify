import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Copy for the pages behind a sign-in: the two Clerk screens, and /account.

   These are the plainest pages on the site. Somebody here has already
   decided; the writing confirms what they have and what happens next, and
   stops. Short lines, and every button says what it does.

   The masthead's signed-in label lives in the landing copy as `nav.account`,
   because the header exists in every locale and this file does not.
   --------------------------------------------------------------------------- */

const en = {
  signIn: {
    meta: "Sign in | Snanify",
    title: "Sign in",
    description:
      "Sign in to Snanify with Google or a link to your email. Then set up your sheet with your family's names in about two minutes, and choose your mornings.",
    /* Above the card, for somebody who arrived from an ad and needs to know
       where they are: what this is, and what follows it. */
    next: "Sign in first. Then set up your sheet with your family's names, in about 2 minutes, and pick your mornings.",
    stepsLabel: "What comes next",
    steps: ["Your water", "Your sheet", "Your mornings"],
    lede: "Google, or a link sent to your email. This one screen signs you in, and on your first visit it opens your account.",
  },
  signUp: {
    meta: "Create your account | Snanify",
    title: "Create your account",
    lede: "Use Google, or a link sent to your email. It takes a moment.",
  },
  account: {
    meta: {
      title: "Your mornings | Snanify",
      description: "Your mornings, your register, and the hour of your reminder.",
    },
    eyebrow: "Your mornings",
    title: "Your mornings",
    creditsLine: "You have {n} mornings left.",
    creditsOne: "You have one morning left.",
    creditsZero: "You have used all your mornings.",
    buyCta: "Buy more mornings",
    registerHeading: "Your register",
    registerEmpty: "Sit your first morning and it will be listed here.",
    profileHeading: "On your sheet",
    profileEmpty: "Set up your sheet before your first morning.",
    profileCta: "Edit",
    reminderHeading: "Reminder",
    reminderToggle: "Send me a reminder at this hour",
    calendar: "Put the hour in your calendar",
    signOut: "Sign out",
    todayCta: "Sit this morning",
    setupCta: "Set up your sheet",
    save: "Save",
    accountHeading: "Your account",
    remindersOff: "Your reminders are off.",
    deleteHeading: "Delete your account",
    deleteBody:
      "This removes your account, your register, your sheets and your photograph. Links you have already sent stop working. Type delete to confirm.",
    deletePlaceholder: "delete",
    deleteCta: "Delete my account",
    deleteMisstyped: "Type the word delete to confirm.",
    /** Above the delete form while mornings remain. Refunds are on request, per /terms. */
    deleteCreditsOne: "One morning is still on your account. Ask for its refund first, at hello@snanify.com.",
    deleteCredits: "{n} mornings are still on your account. Ask for their refund first, at hello@snanify.com.",
    keptToday: "Kept today",
    keptOpen: "Open today's sheet",
    purchasesHeading: "What you bought",
  },
};

const hi = {
  signIn: {
    meta: "प्रवेश कीजिए | Snanify",
    title: "प्रवेश कीजिए",
    description:
      "गूगल से या ईमेल पर भेजी गई कड़ी से Snanify में प्रवेश कीजिए। फिर लगभग दो मिनट में परिवार के नामों के साथ अपना पत्र तैयार कीजिए, और अपनी सुबहें चुनिए।",
    next: "पहले प्रवेश कीजिए। फिर लगभग 2 मिनट में परिवार के नामों के साथ अपना पत्र तैयार कीजिए, और अपनी सुबहें चुनिए।",
    stepsLabel: "आगे क्या है",
    steps: ["आपका जल", "आपका पत्र", "आपकी सुबहें"],
    lede: "गूगल से, या आपके ईमेल पर भेजी गई कड़ी से। यही स्क्रीन आपको प्रवेश कराती है, और पहली बार आने पर आपका खाता भी खोल देती है।",
  },
  signUp: {
    meta: "अपना खाता बनाइए | Snanify",
    title: "अपना खाता बनाइए",
    lede: "गूगल से, या आपके ईमेल पर भेजी गई कड़ी से। एक क्षण लगता है।",
  },
  account: {
    meta: {
      title: "आपकी सुबहें | Snanify",
      description: "आपकी सुबहें, आपकी पंजिका, और आपकी सूचना की घड़ी।",
    },
    eyebrow: "आपकी सुबहें",
    title: "आपकी सुबहें",
    creditsLine: "आपके पास {n} सुबहें शेष हैं।",
    creditsOne: "आपके पास एक सुबह शेष है।",
    creditsZero: "आपकी सभी सुबहें ली जा चुकी हैं।",
    buyCta: "और सुबहें लीजिए",
    registerHeading: "आपकी पंजिका",
    registerEmpty: "अपनी पहली सुबह बैठिए, और वह यहाँ दर्ज हो जाएगी।",
    profileHeading: "आपके पत्र पर",
    profileEmpty: "पहली सुबह से पहले अपना पत्र तय कीजिए।",
    profileCta: "बदलिए",
    reminderHeading: "सूचना",
    reminderToggle: "इस घड़ी पर मुझे सूचना भेजिए",
    calendar: "यह घड़ी अपने कैलेंडर में रखिए",
    signOut: "बाहर निकलिए",
    todayCta: "आज सुबह बैठिए",
    setupCta: "अपना पत्र तय कीजिए",
    save: "सहेजिए",
    accountHeading: "आपका खाता",
    remindersOff: "आपकी सूचनाएँ बंद हैं।",
    deleteHeading: "अपना खाता मिटाइए",
    deleteBody:
      "इससे आपका खाता, आपकी पंजिका, आपके पत्र और आपका चित्र हट जाते हैं। जो कड़ियाँ आपने भेजी हैं, वे काम करना बंद कर देंगी। पुष्टि के लिए delete लिखिए।",
    deletePlaceholder: "delete",
    deleteCta: "मेरा खाता मिटाइए",
    deleteMisstyped: "पुष्टि के लिए delete शब्द लिखिए।",
    deleteCreditsOne: "आपके खाते में अभी एक सुबह है। पहले hello@snanify.com पर लिखकर उसका धन वापस माँग लीजिए।",
    deleteCredits: "आपके खाते में अभी {n} सुबहें हैं। पहले hello@snanify.com पर लिखकर उनका धन वापस माँग लीजिए।",
    keptToday: "आज की सुबह रख ली गई",
    keptOpen: "आज का पत्र खोलिए",
    purchasesHeading: "आपकी ख़रीद",
  },
};

export const accountContent = { en, hi } satisfies Record<Lang, typeof en>;
