import Link from "next/link";
import { alternatesFor, localeDef, type Lang } from "@/lib/locales";

/**
 * The language switch, for twelve locales rather than two.
 *
 * A `<details>` element, so it opens and closes with no JavaScript at all: this
 * sits in the masthead of a page whose whole argument is that it is small and
 * honest, and a dropdown is not worth a hydration boundary. It also means the
 * list is in the HTML, which is how a crawler discovers the other editions even
 * before it reads the hreflang set.
 *
 * `currentPath` is the locale-independent route, so the switch lands on the same
 * page rather than dumping the reader at home. Only locales that actually serve
 * that route are listed, which is the same rule the hreflang set follows; see
 * `localesForPath` in src/lib/locales.ts.
 */
export function LangSwitch({
  lang,
  currentPath = "/",
  label,
}: {
  lang: Lang;
  currentPath?: string;
  label: string;
}) {
  const def = localeDef(lang);
  const others = alternatesFor(lang, currentPath);

  return (
    <details className="group relative">
      <summary
        className="label flex cursor-pointer list-none items-center gap-1.5 border border-rulestrong px-2.5 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper [&::-webkit-details-marker]:hidden"
        aria-label={label}
      >
        {def.native}
        <span aria-hidden="true" className="text-[0.6em] leading-none">
          ▼
        </span>
      </summary>

      {/* Right-aligned so a long native name cannot push the panel off a 390px
          screen. max-h with scroll because twelve rows at 44px is taller than
          some phones in landscape. */}
      <div className="absolute right-0 z-50 mt-1 max-h-[70svh] w-52 overflow-y-auto border-2 border-rulestrong bg-paper">
        <ul>
          {others.map(({ def: other, href }) => (
            <li key={other.code} className="border-b border-rule last:border-b-0">
              <Link
                href={href}
                hrefLang={other.tag}
                lang={other.tag}
                className="flex min-h-11 items-center justify-between gap-3 px-3 py-2.5 text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <span className="text-[0.95rem]">{other.native}</span>
                {/* The English name too, because a reader who lands in the
                    wrong locale cannot necessarily read the right one's name. */}
                <span className="label opacity-60">{other.english}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
