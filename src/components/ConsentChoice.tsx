"use client";

import { useEffect, useState } from "react";
import { consentContent } from "@/content/consent";
import { CONSENT_EVENT, readAds, readConsent, setConsent, type Consent } from "@/lib/consent";
import { buttonClass } from "@/components/ui";
import { META_PIXEL_ID } from "@/lib/meta";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The reader's answer to the cookie notice, shown and changeable on /privacy.

   Only where the notice applies (`snf-ads=ask`, see src/lib/consent.ts):
   elsewhere there is nothing to choose, so nothing renders. A change takes
   effect from the next page; a yes loads the pixel at once.
   --------------------------------------------------------------------------- */

export function ConsentChoice({ lang }: { lang: Lang }) {
  const t = consentContent[lang].choice;
  const [state, setState] = useState<{ asks: boolean; answer: Consent | undefined }>({
    asks: false,
    answer: undefined,
  });

  useEffect(() => {
    const read = () => setState({ asks: readAds() === "ask", answer: readConsent() });
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  if (!META_PIXEL_ID || !state.asks) return null;

  return (
    <div className="mt-8">
      <p className="label text-ink2">{t.title}</p>
      <p className="mt-2 text-[1.02rem] leading-[1.8] text-ink" aria-live="polite">
        {state.answer === "yes" ? t.yes : state.answer === "no" ? t.no : t.unset}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:flex">
        <button
          type="button"
          onClick={() => setConsent("no")}
          aria-pressed={state.answer === "no"}
          className={buttonClass("ghost", "min-h-[48px] sm:min-w-[9rem]")}
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={() => setConsent("yes")}
          aria-pressed={state.answer === "yes"}
          className={buttonClass("ghost", "min-h-[48px] sm:min-w-[9rem]")}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
