import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Clerk, dressed as this site.

   Sign-in is the first screen after somebody decides to pay. A default purple
   SaaS card dropped into the middle of a letterpress almanac is the worst
   possible place to break the spell, so the widget takes the paper, the ink,
   the sindoor and the square corners.

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

/* THE TOKENS, AS CSS VARIABLES. Clerk derives its hover and border shades
   with color-mix(), which takes a var() as readily as a hex, so the card reads
   the same --paper, --ink and --sindoor as the page around it. The night edition
   is the .dark class on <html> redefining those tokens, so one appearance
   serves both editions and the card turns with the page, with no re-render.

   THE !important MARKS ARE LOAD-BEARING. Clerk draws its button and input
   edges as box-shadows and its button sheen as a gradient on ::after, from
   selectors that outrank a plain element override. Without the marks the
   button kept its gradient and its drop shadow, and the inputs their soft
   ring. */
const BODY = "var(--font-body)";
const DISPLAY = "var(--font-display)";

/* The `label` utility from globals.css: Martel 700, sentence case, untracked,
   a touch larger in Devanagari. */
const LABEL = {
  fontFamily: BODY,
  fontWeight: 700,
  textTransform: "none" as const,
  letterSpacing: "0",
  fontSize: "0.8125rem",
  lineHeight: 1.4,
  'html:not([data-script="latin"]) &': {
    fontSize: "0.875rem",
  },
};

/* The `impress` press: one pixel down and right, at once, lifting over 120ms. */
const PRESS = {
  transitionProperty: "transform, background-color, color, border-color",
  transitionDuration: "120ms",
  transitionTimingFunction: "ease-out",
  "&:active": { transform: "translate(1px, 1px)", transitionDuration: "0ms" },
};

const FLAT = "none !important";

export const clerkAppearance = {
  variables: {
    colorPrimary: "var(--sindoor)",
    colorPrimaryForeground: "var(--paper)",
    colorBackground: "var(--paper)",
    colorForeground: "var(--ink)",
    colorMutedForeground: "var(--ink-2)",
    colorMuted: "var(--paper-2)",
    colorNeutral: "var(--ink)",
    colorBorder: "var(--rule)",
    colorInput: "var(--paper)",
    colorInputForeground: "var(--ink)",
    colorDanger: "var(--sindoor)",
    colorRing: "var(--sindoor)",
    colorShadow: "transparent",
    borderRadius: "0",
    fontFamily: BODY,
    fontFamilyButtons: BODY,
  },
  elements: {
    rootBox: { width: "100%" },
    cardBox: { width: "100%", borderRadius: "0", border: "0", boxShadow: FLAT },
    /* The `boxed` rule, at the 2px the site uses for a box that holds a form. */
    card: {
      borderRadius: "0",
      boxShadow: FLAT,
      border: "2px solid var(--rule-strong)",
      backgroundColor: "var(--paper)",
    },
    headerTitle: {
      fontFamily: DISPLAY,
      fontWeight: 600,
      fontSynthesis: "none",
      fontSize: "1.5rem",
      color: "var(--ink)",
    },
    headerSubtitle: { color: "var(--ink-2)" },

    /* The site's solid CTA: flat spot, paper type, ink under the thumb. */
    formButtonPrimary: {
      ...LABEL,
      ...PRESS,
      minHeight: "48px",
      borderRadius: "0",
      border: "0",
      boxShadow: FLAT,
      backgroundImage: FLAT,
      backgroundColor: "var(--sindoor)",
      color: "var(--paper)",
      "&::before, &::after": { display: "none !important" },
      "&:hover, &:focus, &:active": {
        backgroundColor: "var(--ink) !important",
        color: "var(--paper)",
        boxShadow: FLAT,
      },
      "&:focus-visible": { outline: "2px solid var(--sindoor)", outlineOffset: "2px" },
    },

    /* The site's ruled secondary button. It tints rather than inverts on
       press, so the four colours of the Google mark stay legible. */
    socialButtonsBlockButton: {
      ...PRESS,
      minHeight: "48px",
      borderRadius: "0",
      boxShadow: FLAT,
      border: "1px solid var(--rule-strong) !important",
      backgroundColor: "transparent",
      "&:hover, &:focus, &:active": { backgroundColor: "var(--paper-2) !important", boxShadow: FLAT },
      "&:focus-visible": { outline: "2px solid var(--sindoor)", outlineOffset: "2px" },
    },
    socialButtonsBlockButtonText: { color: "var(--ink)", fontWeight: 600 },

    dividerLine: { backgroundColor: "var(--rule)" },
    dividerText: { color: "var(--ink-2)" },

    /* The setup form's `field`: a 2px underline that takes the spot on focus. */
    formFieldLabel: { ...LABEL, color: "var(--ink-2)" },
    formFieldInput: {
      minHeight: "48px",
      borderRadius: "0",
      border: "0",
      borderBottom: "2px solid var(--rule) !important",
      boxShadow: FLAT,
      backgroundColor: "transparent",
      paddingLeft: "0",
      paddingRight: "0",
      fontSize: "1rem",
      color: "var(--ink)",
      transition: "border-color 120ms ease-out",
      "&:hover": { boxShadow: FLAT },
      "&:focus, &:focus-visible": {
        borderBottomColor: "var(--sindoor) !important",
        boxShadow: FLAT,
        outline: "none",
      },
      "&::placeholder": { color: "var(--ink-2)", opacity: 0.7 },
    },

    formResendCodeLink: { color: "var(--sindoor)" },
    identityPreviewEditButton: { color: "var(--sindoor)" },
    footerActionLink: {
      color: "var(--ink)",
      textDecoration: "underline",
      textDecorationColor: "var(--sindoor)",
      textDecorationThickness: "2px",
      textUnderlineOffset: "3px",
      "&:hover, &:active": { color: "var(--sindoor)" },
    },
    footerActionText: { color: "var(--ink-2)" },
    /* The band under the card that carries Clerk's own line. It sits on the
       page ground rather than on a tint block of its own. */
    footer: { background: "transparent", backgroundImage: "none", borderRadius: "0", boxShadow: FLAT },
  },
};

const STRINGS = {
  en: {
    signIn: {
      start: {
        title: "Sign in to Snanify",
        subtitle: "Or create your account. Your mornings are where you left them.",
        /* The combined flow reads these two rather than the pair above. */
        titleCombined: "Sign in to Snanify",
        subtitleCombined: "Or create your account. Your mornings are where you left them.",
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
        title: "Snanify में प्रवेश",
        subtitle: "या अपना खाता बनाइए। आपकी सुबहें वहीं हैं जहाँ आपने छोड़ी थीं।",
        titleCombined: "Snanify में प्रवेश",
        subtitleCombined: "या अपना खाता बनाइए। आपकी सुबहें वहीं हैं जहाँ आपने छोड़ी थीं।",
        actionText: "पहली बार आए हैं?",
        actionLink: "खाता बनाइए",
      },
    },
    signUp: {
      start: {
        title: "Snanify पर अपना खाता बनाइए",
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
} satisfies Record<Lang, object>;

/**
 * The strings for one edition. Takes `Lang` rather than `Lang` so
 * RootShell, which serves every locale, can call it without narrowing; the
 * signed-in routes are English and Hindi only in any case.
 */
export function clerkLocalization(lang: Lang) {
  return STRINGS[lang as Lang] ?? STRINGS.en;
}
