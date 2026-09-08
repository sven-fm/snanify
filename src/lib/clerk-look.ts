import type { FullLang, Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Clerk, dressed as this site.

   Sign-in is the first screen after somebody decides to pay. A default purple
   SaaS card dropped into the middle of a letterpress almanac is the worst
   possible place to break the spell, so the widget takes the paper, the ink,
   the spot colour and the square corners.

   THE HEADING IS OVERRIDDEN ON PURPOSE. Clerk titles its card with the
   application's name in the Clerk dashboard, which for a marketplace-
   provisioned instance is an auto-generated name like "clerk-bronze-sail".
   Somebody signing in must see the name of the thing they are buying, so the
   strings are set here rather than left to a dashboard field that only one
   person can reach. Renaming the app in the dashboard is still worth doing,
   because that name reaches the magic-link email, which this cannot.

   HINDI. Clerk ships no Hindi bundle, so the handful of strings on the two
   cards are written here in the same respectful register as the rest of the
   site. Everything Clerk says beyond these falls back to English, which is
   the honest state of it: a partly translated card is better than a purple one.
   --------------------------------------------------------------------------- */

const PAPER = "#faf6ea";
const PAPER_2 = "#f2ead9";
const INK = "#16130f";
const INK_2 = "#57513f";
const RULE = "#c3b697";
const SPOT = "#b32620";

export const clerkAppearance = {
  variables: {
    colorPrimary: SPOT,
    colorBackground: PAPER,
    colorText: INK,
    colorTextSecondary: INK_2,
    colorInputBackground: PAPER_2,
    colorInputText: INK,
    colorDanger: SPOT,
    borderRadius: "0",
    fontFamily: "var(--font-martel), ui-sans-serif, system-ui, sans-serif",
    fontFamilyButtons: "var(--font-martel), ui-sans-serif, system-ui, sans-serif",
  },
  elements: {
    rootBox: { width: "100%" },
    cardBox: { boxShadow: "none", borderRadius: "0", width: "100%" },
    card: {
      boxShadow: "none",
      borderRadius: "0",
      border: `2px solid ${INK}`,
      backgroundColor: PAPER,
    },
    headerTitle: {
      fontFamily: "var(--font-eczar), Georgia, serif",
      fontSize: "1.5rem",
    },
    formButtonPrimary: {
      borderRadius: "0",
      boxShadow: "none",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      minHeight: "48px",
    },
    socialButtonsBlockButton: {
      borderRadius: "0",
      border: `1px solid ${RULE}`,
      minHeight: "48px",
    },
    formFieldInput: { borderRadius: "0", border: `1px solid ${RULE}`, minHeight: "48px" },
    footerActionLink: { color: SPOT },
    footer: { background: PAPER_2, borderRadius: "0" },
  },
};

const STRINGS = {
  en: {
    signIn: {
      start: {
        title: "Sign in to Snanify",
        subtitle: "Your mornings are where you left them.",
        actionText: "New here?",
        actionLink: "Create an account",
      },
    },
    signUp: {
      start: {
        title: "Create your Snanify account",
        subtitle: "One step, and then the river.",
        actionText: "Already have an account?",
        actionLink: "Sign in",
      },
    },
    formButtonPrimary: "Continue",
    socialButtonsBlockButton: "Continue with {{provider|titleize}}",
    dividerText: "or",
    formFieldLabel__emailAddress: "Email address",
    formFieldInputPlaceholder__emailAddress: "you@example.com",
    backButton: "Back",
  },
  hi: {
    signIn: {
      start: {
        title: "स्नानिफ़ाई में प्रवेश",
        subtitle: "आपकी सुबहें वहीं हैं जहाँ आपने छोड़ी थीं।",
        actionText: "पहली बार आए हैं?",
        actionLink: "खाता बनाइए",
      },
    },
    signUp: {
      start: {
        title: "स्नानिफ़ाई पर अपना खाता बनाइए",
        subtitle: "एक कदम, फिर नदी।",
        actionText: "खाता पहले से है?",
        actionLink: "प्रवेश कीजिए",
      },
    },
    formButtonPrimary: "आगे बढ़िए",
    socialButtonsBlockButton: "{{provider|titleize}} से आगे बढ़िए",
    dividerText: "अथवा",
    formFieldLabel__emailAddress: "ईमेल पता",
    formFieldInputPlaceholder__emailAddress: "aap@example.com",
    backButton: "वापस",
  },
} satisfies Record<FullLang, object>;

/**
 * The strings for one edition. Takes `Lang` rather than `FullLang` so
 * RootShell, which serves every locale, can call it without narrowing; the
 * signed-in routes are English and Hindi only in any case.
 */
export function clerkLocalization(lang: Lang) {
  return STRINGS[lang as FullLang] ?? STRINGS.en;
}
