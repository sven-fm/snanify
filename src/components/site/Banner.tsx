import { bannerContent, SHOW_BANNER } from "@/content/banner";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   A ruled line above the masthead, not a floating pill.

   It reads as part of the printed page rather than as a notification, which is
   the only way a permanent bar is bearable. Spot colour on paper, one line,
   centred, and the short form on a phone so it never wraps to two lines or
   pushes the headline below the fold.
   --------------------------------------------------------------------------- */

export function Banner({ lang }: { lang: Lang }) {
  if (!SHOW_BANNER) return null;

  const t = bannerContent[lang as "en" | "hi"] ?? bannerContent.en;

  return (
    <aside className="border-b-2 border-rulestrong bg-spot text-paper">
      <p className="mx-auto max-w-6xl px-5 py-2 text-center text-[0.78rem] leading-snug tracking-wide sm:px-8">
        <span className="sm:hidden">{t.short}</span>
        <span className="hidden sm:inline">{t.text}</span>
      </p>
    </aside>
  );
}
