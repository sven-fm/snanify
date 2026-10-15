import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The page shown when a page fails to render (src/app/[lang]/error.tsx and,
   when the shell itself fails, src/app/global-error.tsx).

   Short, and in the same voice as the 404: the fault is named as ours, the
   way forward is one press, and the river and the account are a tap away.
   --------------------------------------------------------------------------- */

const en = {
  code: "A slip at the press",
  title: "This page caught on something.",
  lede: "The fault is ours. Press once more and it usually comes through.",
  retry: "Try again",
  home: "Back to the river",
  account: "Your account",
  /* Printed small, so a letter to us can name the exact failure. */
  ref: "Reference",
};

const hi: typeof en = {
  code: "छपाई में एक चूक",
  title: "यह पृष्ठ कहीं अटक गया।",
  lede: "चूक हमारी है। एक बार फिर दबाइए, प्रायः यह खुल जाता है।",
  retry: "फिर प्रयास कीजिए",
  home: "नदी की ओर लौटिए",
  account: "आपका खाता",
  ref: "संदर्भ",
};

export const errorContent = { en, hi } satisfies Record<Lang, typeof en>;
