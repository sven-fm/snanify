import type { Lang } from "@/lib/locales";
import { legalContent } from "@/content/legal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ConsentChoice } from "@/components/ConsentChoice";
import { RefClose, RefHead } from "@/components/site/Reference";
import { ctaHref } from "@/lib/nav";

/* ---------------------------------------------------------------------------
   /privacy and /terms, set as one page with two sets of copy.

   The same shape serves both because they answer the same kind of question and
   are read the same way: somebody scanning for one paragraph. Numbered
   sections set apart by space, and a register with a hairline between rows
   where the content is a list of who holds what.

   Set in the site's own type rather than a legal template, because a page that
   looks like it was pasted from a generator reads as one nobody meant.
   --------------------------------------------------------------------------- */

type Section = {
  h: string;
  body?: readonly string[];
  rows?: readonly { k: string; v: string }[];
  /** Where the reader's answer to the cookie notice is shown and changed. */
  consent?: boolean;
};

export function Legal({ lang, which }: { lang: Lang; which: "privacy" | "terms" }) {
  const t = legalContent[lang][which];
  const close = legalContent[lang].close;
  const sections = t.sections as readonly Section[];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={`/${which}`} />

      <main>
        <RefHead lang={lang} title={t.head.title} accent={t.head.accent} plain={t.lede}>
          <p className="mt-4 text-sm text-ink2">{t.updated}</p>
        </RefHead>

        <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
          <div className="max-w-[38rem]">

        {sections.map((section, index) => (
          <section key={section.h} className="mt-14 first:mt-4">
            <div className="flex items-baseline gap-4">
              <span className="display text-[1.2rem] leading-none text-sindoor tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="display mt-3 text-[1.5rem] leading-[1.2] sm:text-[1.8rem]" style={{ fontWeight: 700 }}>
              {section.h}
            </h2>

            {section.body?.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-[1rem] leading-[1.75] text-ink2">
                {paragraph}
              </p>
            ))}

            {section.rows && (
              <dl className="mt-6">
                {section.rows.map((r) => (
                  <div
                    key={r.k}
                    className="grid gap-1.5 border-b border-rule py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="label pt-1 text-ink2">{r.k}</dt>
                    <dd className="text-[0.98rem] leading-[1.75] text-ink2">{r.v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {section.consent && <ConsentChoice lang={lang} />}
          </section>
        ))}
          </div>
        </div>

        <RefClose title={close.title} label={close.cta} href={ctaHref(lang)} />
      </main>

      <Footer lang={lang} />
    </>
  );
}
