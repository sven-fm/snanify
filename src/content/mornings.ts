import type { Lang } from "@/lib/locales";
import type { TierKey } from "@/content/prices";
import type { Count } from "@/lib/mornings";

/* ---------------------------------------------------------------------------
   Mornings, counted, in words.

   The count of mornings appears on /today, the owner's sheet, /account and
   the receipt, and each of them used to phrase it alone. One of them told a
   person spending their last morning that one was left. The words live here
   once, keyed by the shape of the number (zero, one, many) that
   src/lib/mornings.ts picks, so every surface says the same thing.

   A pack is named by its count and nothing else.
   --------------------------------------------------------------------------- */

const en = {
  pack: {
    one: "One morning",
    eleven: "Eleven mornings",
    sixty: "Sixty mornings",
  } satisfies Record<TierKey, string>,

  /** What is left once this morning is spent. */
  left: {
    zero: "You kept every morning",
    one: "One morning left",
    many: "{n} mornings left",
  } satisfies Record<Count, string>,

  /** The way on, once the count reaches zero. Leads to /begin?out=1. */
  more: "Pick your next mornings",
};

const hi = {
  pack: {
    one: "एक सुबह",
    eleven: "ग्यारह सुबहें",
    sixty: "साठ सुबहें",
  } satisfies Record<TierKey, string>,

  left: {
    zero: "आपने हर सुबह निभाई",
    one: "एक सुबह बाकी",
    many: "{n} सुबहें बाकी",
  } satisfies Record<Count, string>,

  more: "अपनी अगली सुबहें चुनिए",
};

export const morningsContent = { en, hi } satisfies Record<Lang, typeof en>;
