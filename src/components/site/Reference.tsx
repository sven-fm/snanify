import Link from "next/link";
import type { Lang } from "@/lib/locales";
import { CTA } from "@/components/ui";

/* ---------------------------------------------------------------------------
   The reference pages in v3 (spec 6.6): /live, /rivers, the panchang and the
   muhurat calendar, /kumbh, /faq, /about, the legal pages and the 404.

   Each one is built from the same few pieces, so they read as one family:

   · RefHead: one capitals headline with the river or the occasion in
     sindoor, and one plain sentence under it. Latin is set in Eczar 800
     capitals at 0.95; Devanagari has no case and takes 1.22, set inline
     because the script rule for `.display` sits outside the utility layer.
   · RefClose: the one press, at the end, inviting the snan.
   · Festival: the maroon panel with its haldi double rule, only on /kumbh
     and on an occasion page inside its window, naming the occasion once.
   · H2 and QUIET: the section heading and the quiet ink-underlined link.

   No band, no seal, no label on these pages: those belong to the selling
   pages. The masthead's strip and the footer's full river come from the
   Header and the Footer.
   --------------------------------------------------------------------------- */

/** Section headings: sentence case, Eczar 700. Capitals are for the one headline. */
export const H2 = "display text-[1.75rem] leading-[1.15] sm:text-[2.25rem]";
export const H3 = "display text-[1.25rem] leading-[1.3]";
export const W700 = { fontWeight: 700 } as const;

/** The quiet action: a plain ink-underlined link, 44px tall. */
export const QUIET =
  "inline-flex min-h-[44px] items-center font-bold text-ink underline decoration-ink decoration-2 underline-offset-4 active:text-sindoor";

/** Data tables: hairline rules on the paper-2 tint, where columns line up. */
export const TABLE_GROUND = "bg-paper2 px-4 sm:px-6";

/**
 * Splits "{accent}" out of a headline: the part set in sindoor. A title with
 * no token is set whole in sindoor (an occasion's own name).
 */
function split(title: string, accent: string): [string, string, string] {
  const at = title.indexOf("{accent}");
  if (at < 0) return ["", accent || title, ""];
  return [title.slice(0, at), accent, title.slice(at + "{accent}".length)];
}

export function Capitals({
  lang,
  title,
  accent,
  className = "",
}: {
  lang: Lang;
  /** The headline, with `{accent}` where the river or the occasion goes. */
  title: string;
  accent: string;
  className?: string;
}) {
  const hi = lang === "hi";
  const [lead, word, tail] = split(title, accent);
  return (
    <h1
      className={`display text-ink [overflow-wrap:anywhere] ${
        hi
          ? "text-[2rem] sm:text-[2.5rem] lg:text-[3rem]"
          : "text-[2.125rem] uppercase min-[380px]:text-[2.25rem] sm:text-[2.85rem] lg:text-[3.4rem]"
      } ${className}`}
      style={{ fontWeight: 800, lineHeight: hi ? 1.22 : 0.95, letterSpacing: hi ? 0 : "-0.01em" }}
    >
      {lead}
      <span className="text-sindoor">{word}</span>
      {tail}
    </h1>
  );
}

/** The head of a reference page: the capitals headline and one plain sentence. */
export function RefHead({
  lang,
  title,
  accent,
  plain,
  before,
  children,
  wide = false,
}: {
  lang: Lang;
  title: string;
  accent: string;
  plain: string;
  /** A quiet back link above the headline. */
  before?: React.ReactNode;
  /** Anything that belongs to the head: a status line, a date. */
  children?: React.ReactNode;
  /** The column of the page under it: the reading column or the wide one. */
  wide?: boolean;
}) {
  return (
    <section>
      <div className={`mx-auto px-5 pt-6 pb-10 sm:px-8 sm:pt-12 sm:pb-14 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        {before}
        <div className="max-w-3xl">
          <Capitals lang={lang} title={title} accent={accent} className={before ? "mt-3" : ""} />
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.6] text-ink">{plain}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

/** The one press, at the end of the page, inviting the snan. */
export function RefClose({
  title,
  body,
  label,
  href,
  children,
}: {
  title: string;
  body?: string;
  label: string;
  href: string;
  /** Quiet links or a note under the press. */
  children?: React.ReactNode;
}) {
  return (
    <section>
      <div className="mx-auto max-w-md px-5 py-16 sm:max-w-3xl sm:px-8 sm:py-20">
        <h2 className={H2} style={W700}>
          {title}
        </h2>
        {body ? <p className="mt-4 max-w-xl leading-[1.6] text-ink2">{body}</p> : null}
        <Link href={href} className="mt-7 flex sm:inline-flex">
          <CTA className="w-full sm:w-auto">{label}</CTA>
        </Link>
        {children}
      </div>
    </section>
  );
}

/**
 * The festival panel: maroon ground, a haldi double rule inset, the
 * occasion named once. Only on /kumbh and on an occasion page inside its
 * window (spec 6.6).
 */
export function Festival({ name, children }: { name: string; children?: React.ReactNode }) {
  return (
    <div data-festival className="bg-maroon p-[5px] text-paper dark:text-ink">
      <div className="px-5 py-5 sm:px-7 sm:py-6" style={{ border: "4px double var(--haldi)" }}>
        <p className="display text-[1.5rem] leading-[1.2] text-haldi" style={W700}>
          {name}
        </p>
        {children ? <div className="mt-2 text-[0.9375rem] leading-[1.55]">{children}</div> : null}
      </div>
    </div>
  );
}
