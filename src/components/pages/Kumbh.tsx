import Link from "next/link";

import { localePath } from "@/lib/i18n";
import type { Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/ui";
import { Festival, H2, H3, RefClose, RefHead, TABLE_GROUND, W700 } from "@/components/site/Reference";
import {
  KUMBH_MONTHS,
  KUMBH_ROUTE,
  KUMBH_SCHEDULE,
  KUMBH_SOURCES,
  kumbhContent,
  type ScheduleKind,
} from "@/content/kumbh";

/* ---------------------------------------------------------------------------
   /kumbh, set as an almanac reference page rather than a landing page.

   Rules held in the markup as well as in the copy:

   · Nothing here counts down, fills up or runs out. There is no timer, no seat
     counter and no urgency colour. The only sindoor on a date is the mark
     that says which kind of day it is.
   · Every date renders beside the provisional badge, in the table, on the
     calendar plates and in the standing entry, because a date without its
     provenance is the defect this whole site is built against.
   · Headings are the title and at most one plain sentence. The caps label
     above each heading, the fade-in on each section, the red-boxed note on
     the twelve years and the permit and register blocks were all taken off;
     the first three were template chrome and the last two argued with a
     critic who was not in the room.
   --------------------------------------------------------------------------- */

/* --- numerals -------------------------------------------------------------
   A printed panchang sets its figures in the script it is printed in.        */

const DEVA = "०१२३४५६७८९";

function deva(value: string, lang: Lang): string {
  if (lang !== "hi") return value;
  return [...value]
    .map((ch) => (ch >= "0" && ch <= "9" ? DEVA[Number(ch)] : ch))
    .join("");
}

/* --- dates ----------------------------------------------------------------
   Parsed as UTC so the grid is the same wherever it is rendered. These are
   civil dates at the ghat, never instants, so no zone conversion is wanted. */

function parts(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return { y: y ?? 0, m: m ?? 1, d: d ?? 1 };
}

function weekdayIndex(date: string): number {
  const { y, m, d } = parts(date);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function formatDate(date: string, lang: Lang, months: string[]): string {
  const { y, m, d } = parts(date);
  return `${deva(String(d), lang)} ${months[m - 1]} ${deva(String(y), lang)}`;
}

/** Which marked day, if any, falls on a given calendar square. */
type Marks = Record<string, ScheduleKind>;

/* Built by hand rather than through Object.fromEntries, whose signature widens
   to `any` and would let a bad kind through the type. */
const MARKS: Marks = {};
for (const entry of KUMBH_SCHEDULE) MARKS[entry.date] = entry.kind;

function key(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/* --- the calendar plate ---------------------------------------------------
   A month set as a printed grid: hairline rules, days in tabular figures, and
   one solid vermillion square where a bathing day falls. The table above it
   carries every fact this shows, so the plate is allowed to be quiet.       */

function MonthPlate({
  lang,
  year,
  month,
  weekdays,
  months,
}: {
  lang: Lang;
  year: number;
  month: number;
  weekdays: string[];
  months: string[];
}) {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const length = new Date(Date.UTC(year, month, 0)).getUTCDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: first }, () => null),
    ...Array.from({ length }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <figure className="border border-rule bg-paper">
      <figcaption className="label px-4 pt-4 pb-2 text-ink">
        {months[month - 1]} {deva(String(year), lang)}
      </figcaption>

      <div className="grid grid-cols-7 border-b border-rule">
        {weekdays.map((w) => (
          <span
            key={w}
            className="label px-1 py-2 text-center text-[0.58rem] text-ink2"
          >
            {w}
          </span>
        ))}
      </div>

      <div className="tabular grid grid-cols-7">
        {cells.map((day, i) => {
          const mark = day ? MARKS[key(year, month, day)] : undefined;
          const bathing = mark === "amrit-snan";

          const figure = day ? deva(String(day), lang) : "";

          return (
            <span
              key={i}
              className={[
                "flex aspect-square items-center justify-center border-r border-b border-rule text-sm",
                "[&:nth-child(7n)]:border-r-0 [&:nth-last-child(-n+7)]:border-b-0",
                bathing ? "bg-sindoor font-bold text-paper" : "text-ink2",
              ].join(" ")}
            >
              {/* The opening is ruled rather than filled. Drawn as an inner box
                  so it cannot fight the grid's own hairlines for the border. */}
              {mark && !bathing ? (
                <span className="flex h-7 w-7 items-center justify-center border-2 border-sindoor text-ink">
                  {figure}
                </span>
              ) : (
                figure
              )}
            </span>
          );
        })}
      </div>
    </figure>
  );
}

/* --------------------------------------------------------------------------- */

export function Kumbh({ lang }: { lang: Lang }) {
  const t = kumbhContent[lang];
  const c = t.calendar;

  const onwardHref: Record<string, string> = {
    river: localePath(lang, "/rivers/godavari-nashik"),
    muhurat: localePath(lang, "/muhurat"),
    ethics: localePath(lang, "/faq#how"),
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath={KUMBH_ROUTE} />

      <main>
        {/* ------------------------------------------------- masthead ----
            The capitals headline, the dates as its one plain sentence, and
            the festival panel: the one page outside an occasion's window
            that carries it, because the mela is the occasion. */}
        <RefHead lang={lang} title={t.head.title} accent={t.head.accent} plain={t.hero.standfirst} wide>
          <div className="mt-6 max-w-xl">
            <Festival name={t.hero.title}>{t.hero.kicker}</Festival>
          </div>
          <p className="mt-6 max-w-2xl leading-[1.7] text-ink2">{t.hero.lede}</p>
          <div className="mt-4">
            <ProvisionalMark lang={lang} />
          </div>
        </RefHead>

        {/* -------------------------------------------- standing entry --- */}
        <section>
          <div className="mx-auto max-w-6xl px-5 pb-6 sm:px-8">
            <dl className={`grid gap-x-10 md:grid-cols-2 ${TABLE_GROUND}`}>
              {t.facts.rows.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_1fr] sm:gap-5"
                >
                  <dt className="label pt-1 text-ink2">{row.term}</dt>
                  <dd className="text-[0.95rem] leading-[1.65] text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
            {/* Three of the rows above are dates, so the entry carries its own
                provenance rather than borrowing the masthead's. */}
            <div className="mt-6">
              <ProvisionalMark lang={lang} short />
            </div>
          </div>
        </section>

        {/* --------------------------------------------- the reckoning --- */}
        <Section id="reckoning">
          <h2 className={H2} style={W700}>{t.what.title}</h2>
          <div className="mt-8 max-w-2xl space-y-7">
            {t.what.paras.map((p, i) => (
              <p key={i} className="text-[1.02rem] leading-[1.85] text-ink2">
                {p}
              </p>
            ))}
          </div>
        </Section>

        {/* -------------------------------------------------- the place -- */}
        <Section id="place">
          <h2 className={H2} style={W700}>{t.place.title}</h2>
          <div className="mt-8 max-w-2xl space-y-7">
            {t.place.paras.map((p, i) => (
              <p key={i} className="text-[1.02rem] leading-[1.85] text-ink2">
                {p}
              </p>
            ))}
          </div>
        </Section>

        {/* -------------------------------------------------- the water -- */}
        <Section id="river">
          <h2 className={H2} style={W700}>{t.river.title}</h2>
          <div className="mt-8 max-w-2xl space-y-7">
            {t.river.paras.map((p, i) => (
              <p key={i} className="text-[1.02rem] leading-[1.85] text-ink2">
                {p}
              </p>
            ))}
          </div>
        </Section>

        {/* ----------------------------------------------- the calendar -- */}
        <Section id="calendar">
          <div className="max-w-3xl">
            <h2 className={H2} style={W700}>{c.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{c.lede}</p>
          </div>

          <div className="mt-8">
            <ProvisionalMark lang={lang} />
          </div>

          {/* the register of days */}
          <div className={`mt-8 overflow-x-auto ${TABLE_GROUND}`} tabIndex={0}>
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule">
                  <th scope="col" className="label py-3 pr-6 text-ink2">
                    {c.columns.date}
                  </th>
                  <th scope="col" className="label py-3 pr-6 text-ink2">
                    {c.columns.day}
                  </th>
                  <th scope="col" className="label py-3 pr-6 text-ink2">
                    {c.columns.occasion}
                  </th>
                  <th scope="col" className="label py-3 pr-6 text-ink2">
                    {c.columns.tithi}
                  </th>
                  <th scope="col" className="label py-3 text-ink2">
                    {c.columns.place}
                  </th>
                </tr>
              </thead>
              <tbody>
                {KUMBH_SCHEDULE.map((e) => (
                  <tr key={e.key} className="border-b border-rule align-top last:border-b-0">
                    <td className="py-5 pr-6 whitespace-nowrap">
                      <span className="display text-[1.0625rem] text-ink" style={W700}>
                        {formatDate(e.date, lang, c.months)}
                      </span>
                      <span className="mt-1.5 block text-sm text-sindoor">{c.kinds[e.kind]}</span>
                      {/* Read off the record rather than assumed: a row whose
                          date were ever sourced would stop printing this. */}
                      {e.confidence === "provisional" && (
                        <span className="mt-1 block text-xs text-ink2">
                          {t.provenance.badgeShort}
                        </span>
                      )}
                    </td>
                    <td className="py-5 pr-6 text-sm whitespace-nowrap text-ink2">
                      {c.weekdaysLong[weekdayIndex(e.date)]}
                    </td>
                    <td className="max-w-[18rem] py-5 pr-6">
                      <span className="block text-[0.95rem] text-ink">{e.title[lang]}</span>
                      <span className="mt-2 block text-sm leading-[1.7] text-ink2">
                        {e.note[lang]}
                      </span>
                    </td>
                    <td className="py-5 pr-6 text-sm leading-[1.7] text-ink">
                      {e.tithi[lang]}
                    </td>
                    <td className="py-5 text-sm leading-[1.7] text-ink2">{e.place[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-[1.8] text-ink2">{c.amritNote}</p>

          {/* the plates */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KUMBH_MONTHS.map((m) => (
              <MonthPlate
                key={`${m.year}-${m.month}`}
                lang={lang}
                year={m.year}
                month={m.month}
                weekdays={c.weekdaysShort}
                months={c.months}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink2">
            <span className="inline-flex items-center gap-2.5">
              <span className="h-3 w-3 bg-sindoor" aria-hidden="true" />
              {c.legend.amrit}
            </span>
            <span className="inline-flex items-center gap-2.5">
              <span className="h-3 w-3 border-2 border-sindoor" aria-hidden="true" />
              {c.legend.open}
            </span>
            <span>{c.plateCaption}</span>
          </div>
        </Section>

        {/* ------------------------------------------------- going there -- */}
        <Section id="attending">
          <div className="max-w-3xl">
            <h2 className={H2} style={W700}>{t.attend.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{t.attend.lede}</p>
          </div>

          <dl className="mt-10">
            {t.attend.rows.map((row) => (
              <div
                key={row.key}
                className="grid gap-x-10 gap-y-3 border-b border-rule py-7 md:grid-cols-[18rem_1fr] md:py-8"
              >
                <dt className="display text-[1.125rem] leading-[1.35] text-ink" style={W700}>{row.q}</dt>
                <dd className="max-w-2xl text-[0.98rem] leading-[1.85] text-ink2">{row.a}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* -------------------------------------------------- provenance -- */}
        <Section id="sources">
          <div className="max-w-3xl">
            <h2 className={H2} style={W700}>{t.sources.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{t.sources.lede}</p>
          </div>

          <ul className="mt-10">
            {KUMBH_SOURCES.map((s) => (
              <li
                key={s.key}
                className="grid gap-x-10 gap-y-2 border-b border-rule py-6 md:grid-cols-[22rem_1fr]"
              >
                <a
                  href={s.href}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="text-[0.98rem] leading-[1.6] text-ink underline decoration-sindoor decoration-1 underline-offset-4 active:text-sindoor"
                >
                  {s.label[lang]}
                </a>
                <span className="max-w-2xl text-sm leading-[1.8] text-ink2">{s.note[lang]}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 max-w-3xl">
            <h3 className={H3} style={W700}>{t.sources.unverifiedTitle}</h3>
            <ul className="mt-6 space-y-4">
              {t.sources.unverified.map((item, i) => (
                <li
                  key={i}
                  className="text-[0.95rem] leading-[1.8] text-ink2"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-[1.8] text-ink2">{t.provenance.line}</p>
          </div>
        </Section>

        {/* ------------------------------------------------------ onward -- */}
        <Section>
          <h2 className={H2} style={W700}>
            {t.onward.title}
          </h2>
          <ul className="mt-6 border-t border-rule">
            {t.onward.links.map((l) => (
              <li key={l.key} className="border-b border-rule">
                <Link href={onwardHref[l.key] ?? localePath(lang, "/")} className="group block py-4">
                  <span className="display block text-[1.25rem] text-ink underline decoration-rule decoration-1 underline-offset-4 group-active:text-sindoor" style={W700}>
                    {l.label}
                  </span>
                  <span className="mt-1 block text-sm leading-[1.7] text-ink2">{l.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* The Godavari on this site, and the one press. */}
        <RefClose title={t.here.title} body={t.here.body} label={t.here.cta} href={localePath(lang, "/begin")} />
      </main>

      <Footer lang={lang} />
    </>
  );
}

/**
 * The line that has to sit beside every date on this page. A component rather
 * than a string so that adding a date without its provenance is a conspicuous
 * omission. The square is hollow: it fills only when something is settled, and
 * nothing on this calendar is settled yet. Set in small body type rather than
 * as a boxed caps badge.
 */
function ProvisionalMark({ lang, short = false }: { lang: Lang; short?: boolean }) {
  const p = kumbhContent[lang].provenance;
  return (
    <span className="inline-flex items-center gap-2 text-sm text-sindoor">
      <span className="h-1.5 w-1.5 shrink-0 border border-sindoor" aria-hidden="true" />
      {short ? p.badgeShort : p.badge}
    </span>
  );
}
