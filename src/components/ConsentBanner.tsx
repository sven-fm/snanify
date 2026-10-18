"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { consentContent } from "@/content/consent";
import { CONSENT_EVENT, noticeOwed, readAds, readConsent, setConsent } from "@/lib/consent";
import { localePath, type Lang } from "@/lib/locales";
import { buttonClass } from "@/components/ui";
import { META_PIXEL_ID } from "@/lib/meta";

/* ---------------------------------------------------------------------------
   The cookie notice: a ruled bar at the foot of the screen.

   ONLY WHERE THE LAW ASKS FOR IT. The proxy marks readers in the EU, the
   EEA, the UK and Switzerland with `snf-ads=ask` (src/lib/meta.ts); anybody
   else never sees this bar, and it renders nothing on the server either, so
   the HTML is the same for everyone and hydration is untouched.

   NEVER INSIDE THE SITTING. Three minutes on /today are not interrupted by a
   question about cookies; the notice waits for the next page.

   It sits above the landing page's thumb rail (z-40) and goes the moment the
   reader answers. Accept and Decline are the same ruled button, side by side.
   --------------------------------------------------------------------------- */

function inSitting(pathname: string): boolean {
  return /^\/(?:hi\/)?today(?:\/|$)/.test(pathname);
}

export function ConsentBanner({ lang }: { lang: Lang }) {
  const t = consentContent[lang];
  const pathname = usePathname();
  const [owed, setOwed] = useState(false);

  useEffect(() => {
    /* Read after hydration: the cookies are the browser's, and the server
       render stays identical for every reader. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOwed(noticeOwed(readAds(), readConsent()));
    const onAnswer = () => setOwed(false);
    window.addEventListener(CONSENT_EVENT, onAnswer);
    return () => window.removeEventListener(CONSENT_EVENT, onAnswer);
  }, []);

  /* Without a pixel there is no cookie to ask about. */
  if (!META_PIXEL_ID || !owed || inSitting(pathname)) return null;

  return (
    <aside
      aria-label={t.label}
      className="fixed inset-x-0 bottom-0 z-50 bg-paper"
      style={{ paddingBottom: "env(safe-area-inset-bottom)", boxShadow: "0 -1px 0 0 var(--paper-3)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
        <p className="text-sm leading-[1.6] text-ink sm:flex-1">
          {t.text}{" "}
          <a
            href={localePath(lang, "/privacy")}
            className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-sindoor active:text-sindoor"
          >
            {t.more}
          </a>
        </p>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:shrink-0">
          <button
            type="button"
            onClick={() => setConsent("no")}
            className={buttonClass("quiet", "min-h-[48px] sm:min-w-[9rem]")}
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => setConsent("yes")}
            className={buttonClass("quiet", "min-h-[48px] sm:min-w-[9rem]")}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </aside>
  );
}
