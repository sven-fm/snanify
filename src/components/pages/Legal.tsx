import type { FullLang as Lang } from "@/lib/locales";
import { legalContent } from "@/content/legal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/ui";

/* ---------------------------------------------------------------------------
   /privacy and /terms, set as one page with two sets of copy.

   The same shape serves both because they answer the same kind of question and
   are read the same way: somebody scanning for one paragraph. Numbered
   sections, a rule between each, a ruled register where the content is a list
   of who holds what.

   Set in the site's own type rather than a legal template, because a page that
   looks like it was pasted from a generator reads as one nobody meant.
   --------------------------------------------------------------------------- */

type Section = {
  h: string;
  body?: readonly string[];
  rows?: readonly { k: string; v: string }[];
};

export function Legal({ lang, which }: { lang: Lang; which: "privacy" | "terms" }) {
  const t = legalContent[lang][which];
  const sections = t.sections as readonly Section[];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={`/${which}`} />

      <main className="mx-auto max-w-2xl px-5 py-10 pb-20 sm:px-8 sm:py-16">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="display mt-4 text-[2.1rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
        <div className="rule-double mt-6" />
        <p className="mt-6 text-[1.05rem] leading-[1.8] text-ink2">{t.lede}</p>
        <p className="mt-6 border-t border-rule pt-4 text-sm text-ink2">{t.updated}</p>

        {sections.map((section, index) => (
          <section key={section.h} className="mt-14">
            <div className="flex items-baseline gap-4 border-t-2 border-rulestrong pt-4">
              <span className="display text-[1.2rem] leading-none text-spot tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="display mt-3 text-[1.6rem] leading-[1.2] sm:text-[1.9rem]">
              {section.h}
            </h2>

            {section.body?.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">
                {paragraph}
              </p>
            ))}

            {section.rows && (
              <dl className="mt-6 border-t-2 border-rulestrong">
                {section.rows.map((r) => (
                  <div
                    key={r.k}
                    className="grid gap-1.5 border-b border-rule py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="label pt-1 text-spot">{r.k}</dt>
                    <dd className="text-[0.98rem] leading-[1.75] text-ink2">{r.v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}
      </main>

      <Footer lang={lang} />
    </>
  );
}
