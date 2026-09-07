/* This module carries deep content, which exists in English and Hindi only.
   `Lang` here is therefore the full-depth pair; see the tier note at the top
   of src/lib/locales.ts. */
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Copy for the pages behind a sign-in: the two Clerk screens, and /account.

   These are the least ceremonial pages on the site and they should read that
   way. Somebody here has already decided; the writing's whole job is to get
   out of the way and confirm what happens next. Short lines, no selling, and
   no explaining what an account is for.
   --------------------------------------------------------------------------- */

const en = {
  signIn: {
    meta: "Sign in · Snanify",
    eyebrow: "Your mornings",
    title: "Sign in.",
    lede: "Google, or a link sent to your email. Your mornings and your Sankalp Patras are waiting where you left them.",
  },
  signUp: {
    meta: "Create your account · Snanify",
    eyebrow: "Your mornings",
    title: "Start here.",
    lede: "Google, or a link sent to your email. It takes a moment, and then the river.",
  },
  account: {
    meta: {
      title: "Your mornings · Snanify",
      description: "Your register, your snans, and the hour the river reaches you.",
    },
    eyebrow: "Your mornings",
    title: "Your mornings.",
    creditsLabel: "Snans in hand",
    creditsNone: "None left.",
    buyCta: "Take more mornings",
    registerHeading: "Your register",
    registerEmpty: "Your first morning will write itself here.",
    profileHeading: "What goes on the sheet",
    profileCta: "Change it",
    reminderHeading: "The river reaches you at",
    reminderOff: "No reminder.",
    signOut: "Sign out",
    todayCta: "Sit this morning",
  },
};

const hi = {
  signIn: {
    meta: "प्रवेश करें · Snanify",
    eyebrow: "आपकी सुबहें",
    title: "प्रवेश कीजिए।",
    lede: "गूगल से, या आपके ईमेल पर भेजी गई कड़ी से। आपकी सुबहें और आपके संकल्प पत्र वहीं हैं जहाँ आपने छोड़े थे।",
  },
  signUp: {
    meta: "अपना खाता बनाइए · Snanify",
    eyebrow: "आपकी सुबहें",
    title: "यहाँ से आरंभ।",
    lede: "गूगल से, या आपके ईमेल पर भेजी गई कड़ी से। एक क्षण लगेगा, फिर नदी।",
  },
  account: {
    meta: {
      title: "आपकी सुबहें · Snanify",
      description: "आपकी पंजिका, आपके स्नान, और वह घड़ी जब नदी आप तक पहुँचती है।",
    },
    eyebrow: "आपकी सुबहें",
    title: "आपकी सुबहें।",
    creditsLabel: "शेष स्नान",
    creditsNone: "कोई शेष नहीं।",
    buyCta: "और सुबहें लीजिए",
    registerHeading: "आपकी पंजिका",
    registerEmpty: "आपकी पहली सुबह यहीं स्वयं लिख जाएगी।",
    profileHeading: "पत्र पर क्या जाता है",
    profileCta: "बदलिए",
    reminderHeading: "नदी आप तक पहुँचती है",
    reminderOff: "कोई सूचना नहीं।",
    signOut: "बाहर निकलें",
    todayCta: "आज सुबह बैठिए",
  },
};

export const accountContent = { en, hi } satisfies Record<Lang, typeof en>;
