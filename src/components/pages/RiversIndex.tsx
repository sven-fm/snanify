import Link from "next/link";
import { localePath } from "@/lib/i18n";
import { ctaHref } from "@/lib/nav";
import type { Lang } from "@/lib/locales";
import { waterName } from "@/content/names";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { H2, H3, QUIET, RefClose, RefHead, W700 } from "@/components/site/Reference";
import { RIVERS } from "@/content/rivers";
import { riversIndexContent } from "@/content/rivers-index";

/* ---------------------------------------------------------------------------
   /rivers, in v3 (spec 6.6). A register of six places and a page of advice
   on choosing one: the capitals headline, the first water set large with its
   name in sindoor, the other five as ruled rows, the four things found at
   every water, how to choose, and the one press at the end.

   Space divides the sections; hairlines stay between rows. Every link but
   the closing press is a quiet underlined link.
   --------------------------------------------------------------------------- */

export function RiversIndex({ lang }: { lang: Lang }) {
  const t = riversIndexContent[lang];

  const first = RIVERS[0];
  const rest = RIVERS.slice(1);

  /* "Har Ki Pauri, Haridwar, Uttarakhand" */
  const place = (r: (typeof RIVERS)[number]) =>
    `${waterName(r, "ghat", lang)}, ${waterName(r, "city", lang)}, ${waterName(r, "state", lang)}`;

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/rivers" />

      <main>
        <RefHead lang={lang} title={t.head.title} accent={t.head.accent} plain={t.head.plain} />

        {/* ------------------------------------------- the lead water --- */}
        <section>
          <div className="mx-auto max-w-3xl px-5 pb-14 sm:px-8">
            <h2 className="display text-[2rem] leading-[1.05] text-sindoor sm:text-[2.6rem]" style={{ fontWeight: 800 }}>
              {waterName(first, "river", lang)}
            </h2>
            <p className="mt-2 text-sm text-ink2">{place(first)}</p>
            <p className="display mt-6 text-[1.25rem] leading-[1.4] text-ink" style={W700}>
              {first.epithet[lang]}
            </p>
            <p className="mt-4 leading-[1.7] text-ink2">{first.standfirst[lang]}</p>
            <p className="mt-4 text-sm leading-[1.7] text-ink2">{first.sacred[lang][0]}</p>
            <p className="mt-2 text-sm text-ink2">{t.formLabels[first.form]}</p>
            <Link href={localePath(lang, `/rivers/${first.slug}`)} className={`${QUIET} mt-3`}>
              {t.lead.read}
            </Link>
          </div>
        </section>

        {/* -------------------------------------------- the other five -- */}
        <section id="index" className="scroll-mt-16">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
            <h2 className={H2} style={W700}>
              {t.index.title}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2">{t.index.lede}</p>

            {/* A register, unnumbered: five waters are a choice, not a sequence. */}
            <ul className="mt-8 border-t border-rule">
              {rest.map((r) => (
                <li key={r.slug} className="border-b border-rule">
                  <Link href={localePath(lang, `/rivers/${r.slug}`)} className="group block py-6">
                    <h3 className="display text-[1.5rem] leading-[1.15] text-ink group-active:text-sindoor" style={W700}>
                      {waterName(r, "river", lang)}
                    </h3>
                    <p className="mt-1 text-sm text-ink2">{place(r)}</p>
                    <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink">{r.epithet[lang]}</p>
                    <p className="mt-2 text-sm leading-[1.7] text-ink2">{r.standfirst[lang]}</p>
                    <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                      <span className="text-ink2">{t.formLabels[r.form]}</span>
                      <span className="font-bold text-ink underline decoration-ink decoration-2 underline-offset-4">
                        {t.index.read}
                      </span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------- offer ------ */}
        <section id="offer" className="scroll-mt-16">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
            <h2 className={H2} style={W700}>
              {t.offer.title}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2">{t.offer.lede}</p>
            <ul className="mt-6">
              {t.offer.items.map((item) => (
                <li key={item.key} className="py-4">
                  <h3 className={H3} style={W700}>
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.75] text-ink2">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------- choosing ----- */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
            <h2 className={H2} style={W700}>
              {t.choosing.title}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2">{t.choosing.lede}</p>
            <dl className="mt-6">
              {t.choosing.rows.map((row) => (
                <div key={row.key} className="py-4">
                  <dt className={H3} style={W700}>
                    {row.label}
                  </dt>
                  <dd className="mt-2 leading-[1.7] text-ink2">{row.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <RefClose
          title={t.closing.title}
          body={t.closing.lede}
          label={t.closing.cta}
          href={ctaHref(lang)}
        />
      </main>

      <Footer lang={lang} />
    </>
  );
}
