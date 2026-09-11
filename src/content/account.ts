/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Copy for the pages behind a sign-in: the two Clerk screens, and /account.

   These are the plainest pages on the site. Somebody here has already
   decided; the writing confirms what they have and what happens next, and
   stops. Short lines, and every button says what it does.

   `account.eyebrow` is read by src/components/site/Header.tsx as the label
   of the signed-in link in the masthead. It is a name, not a heading.
   --------------------------------------------------------------------------- */

const en = {
  signIn: {
    meta: "Sign in | Snanify",
    title: "Sign in",
    lede: "Use Google, or a link sent to your email. Your mornings and your Sankalp Patras are where you left them.",
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
    signOut: "Sign out",
    todayCta: "Sit this morning",
    setupCta: "Set up your sheet",
    save: "Save",
    deleteHeading: "Delete your account",
    deleteBody:
      "This removes your account, your register, your sheets and your photograph. Links you have already sent stop working. Type delete to confirm.",
    deletePlaceholder: "delete",
    deleteCta: "Delete my account",
    deleteMisstyped: "Type the word delete to confirm.",
  },
};

const hi = {
  signIn: {
    meta: "प्रवेश कीजिए | Snanify",
    title: "प्रवेश कीजिए",
    lede: "गूगल से, या आपके ईमेल पर भेजी गई कड़ी से। आपकी सुबहें और आपके संकल्प पत्र वहीं हैं जहाँ आपने छोड़े थे।",
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
    signOut: "बाहर निकलिए",
    todayCta: "आज सुबह बैठिए",
    setupCta: "अपना पत्र तय कीजिए",
    save: "सहेजिए",
    deleteHeading: "अपना खाता मिटाइए",
    deleteBody:
      "इससे आपका खाता, आपकी पंजिका, आपके पत्र और आपका चित्र हट जाते हैं। जो कड़ियाँ आपने भेजी हैं, वे काम करना बंद कर देंगी। पुष्टि के लिए delete लिखिए।",
    deletePlaceholder: "delete",
    deleteCta: "मेरा खाता मिटाइए",
    deleteMisstyped: "पुष्टि के लिए delete शब्द लिखिए।",
  },
};

export const accountContent = { en, hi } satisfies Record<Lang, typeof en>;
