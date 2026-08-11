import Link from "next/link";

import { localePath, type Lang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section, SectionHeader } from "@/components/ui";
import {
  KUMBH_MAIL,
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
     counter and no urgency colour. The only spot colour on a date is the mark
     that says which kind of day it is.
   · Every date renders beside the provisional badge, in the table, on the
     calendar plates and in the standing entry, because a date without its
     provenance is the defect this whole site is built against.
   · The permit block prints "None held" as plain type, not as a warning. It is
     a fact about us, not an alert about the reader.
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
    <figure className="boxed bg-paper">
      <figcaption className="label border-b border-rulestrong px-4 py-3 text-ink">
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
                "[&:nth-child(7n)]:border-r-0",
                bathing ? "bg-spot font-bold text-paper" : "text-ink2",
              ].join(" ")}
            >
              {/* The opening is ruled rather than filled. Drawn as an inner box
                  so it cannot fight the grid's own hairlines for the border. */}
              {mark && !bathing ? (
                <span className="flex h-7 w-7 items-center justify-center border-2 border-spot text-ink">
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
    ethics: localePath(lang, "/ethics"),
  };

  const mailto = `mailto:${KUMBH_MAIL}?subject=${encodeURIComponent(t.register.mailSubject)}`;

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath={KUMBH_ROUTE} />

      <main>
        {/* ------------------------------------------------- masthead ---- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20">
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>

            <h1
              className="ink-in display mt-6 text-[3.2rem] sm:text-6xl lg:text-[5.2rem]"
              style={{ animationDelay: "60ms" }}
            >
              {t.hero.title}
            </h1>

            <p
              className="ink-in display mt-4 text-2xl text-spot sm:text-3xl"
              style={{ animationDelay: "120ms" }}
            >
              {t.hero.kicker}
            </p>

            <div className="rule-double mt-8 max-w-2xl" />

            <p
              className="ink-in mt-7 max-w-2xl text-xl leading-[1.5] text-ink sm:text-2xl"
              style={{ animationDelay: "200ms" }}
            >
              {t.hero.standfirst}
            </p>

            <p
              className="ink-in mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-ink2"
              style={{ animationDelay: "260ms" }}
            >
              {t.hero.lede}
            </p>

            <div className="mt-9">
              <ProvisionalMark lang={lang} />
            </div>
          </div>
        </section>

        {/* -------------------------------------------- standing entry --- */}
        <section className="tint border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
            {/* Three of the rows below are dates, so the entry carries its own
                provenance rather than borrowing the masthead's. */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="label text-spot">{t.facts.label}</p>
              <ProvisionalMark lang={lang} short />
            </div>

            <dl className="mt-6 grid gap-x-10 border-t-2 border-rulestrong md:grid-cols-2">
              {t.facts.rows.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_1fr] sm:gap-5"
                >
                  <dt className="label pt-1 text-ink2">{row.term}</dt>
                  <dd className="text-[0.95rem] leading-[1.65] text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------- the reckoning --- */}
        <Section id="reckoning">
          <Reveal>
            <SectionHeader eyebrow={t.what.eyebrow} title={t.what.title} />

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div className="max-w-2xl space-y-7">
                {t.what.paras.map((p, i) => (
                  <p
                    key={i}
                    className="text-[1.02rem] leading-[1.85] text-ink2"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <aside className="lg:w-64">
                <div className="rule-thin mb-8 lg:hidden" />
                <Mark className="h-10 w-10 text-ink" />
                <p className="display mt-6 text-lg leading-[1.5] text-ink">
                  {t.hero.kicker}
                </p>
              </aside>
            </div>

            {/* The twelve years, stated as astronomy and disarmed in the same
                block. This is the sentence a Kumbh page usually gets wrong. */}
            <div className="mt-14 max-w-3xl border-2 border-spot">
              <h3 className="label bg-spot px-4 py-2.5 text-paper sm:px-6">
                {t.what.noteLabel}
              </h3>
              <p className="px-4 py-5 leading-[1.8] text-ink sm:px-6 sm:py-6">
                {t.what.note}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* -------------------------------------------------- the place -- */}
        <Section id="place" tinted>
          <Reveal>
            <SectionHeader eyebrow={t.place.eyebrow} title={t.place.title} />
            <div className="mt-12 max-w-2xl space-y-7">
              {t.place.paras.map((p, i) => (
                <p key={i} className="text-[1.02rem] leading-[1.85] text-ink2">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* -------------------------------------------------- the water -- */}
        <Section id="river">
          <Reveal>
            <SectionHeader eyebrow={t.river.eyebrow} title={t.river.title} />
            <div className="mt-12 max-w-2xl space-y-7">
              {t.river.paras.map((p, i) => (
                <p key={i} className="text-[1.02rem] leading-[1.85] text-ink2">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ----------------------------------------------- the calendar -- */}
        <Section id="calendar" tinted>
          <Reveal>
            <SectionHeader eyebrow={c.eyebrow} title={c.title} lede={c.lede} />

            <div className="mt-8">
              <ProvisionalMark lang={lang} />
            </div>

            {/* the register of days */}
            <div className="mt-10 overflow-x-auto border-t-2 border-rulestrong">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-rulestrong">
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
                    <tr key={e.key} className="border-b border-rule align-top">
                      <td className="py-5 pr-6 whitespace-nowrap">
                        <span className="display text-lg text-ink">
                          {formatDate(e.date, lang, c.months)}
                        </span>
                        <span className="label mt-2 block text-spot">
                          {c.kinds[e.kind]}
                        </span>
                        {/* Read off the record rather than assumed: a row whose
                            date were ever sourced would stop printing this. */}
                        {e.confidence === "provisional" && (
                          <span className="label mt-1.5 block text-ink2">
                            {t.provenance.badgeShort}
                          </span>
                        )}
                      </td>
                      <td className="py-5 pr-6 text-sm whitespace-nowrap text-ink2">
                        {c.weekdaysLong[weekdayIndex(e.date)]}
                      </td>
                      <td className="max-w-[18rem] py-5 pr-6">
                        <span className="block text-[0.95rem] text-ink">
                          {e.title[lang]}
                        </span>
                        <span className="mt-2 block text-sm leading-[1.7] text-ink2">
                          {e.note[lang]}
                        </span>
                      </td>
                      <td className="py-5 pr-6 text-sm leading-[1.7] text-ink">
                        {e.tithi[lang]}
                      </td>
                      <td className="py-5 text-sm leading-[1.7] text-ink2">
                        {e.place[lang]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-[1.8] text-ink2">
              {c.amritNote}
            </p>

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

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="label inline-flex items-center gap-2.5 text-ink2">
                <span className="h-3 w-3 bg-spot" aria-hidden="true" />
                {c.legend.amrit}
              </span>
              <span className="label inline-flex items-center gap-2.5 text-ink2">
                <span
                  className="h-3 w-3 border-2 border-spot"
                  aria-hidden="true"
                />
                {c.legend.open}
              </span>
              <span className="label text-ink2">{c.plateCaption}</span>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ the position -- */}
        <Section id="position">
          <Reveal>
            <SectionHeader
              eyebrow={t.offer.eyebrow}
              title={t.offer.title}
              lede={t.offer.lede}
            />

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <dl className="border-t-2 border-rulestrong">
                <div className="border-b border-rule py-6">
                  <dt className="label text-ink2">{t.offer.permitLabel}</dt>
                  <dd className="mt-3">
                    <span className="label inline-flex items-center gap-2.5 border border-spot px-3 py-2 text-spot">
                      <span className="h-2 w-2 bg-spot" aria-hidden="true" />
                      {t.offer.permitStatus}
                    </span>
                  </dd>
                </div>
                <div className="border-b border-rule py-6">
                  <dt className="label text-ink2">{t.offer.authorityLabel}</dt>
                  <dd className="mt-3 leading-[1.8] text-ink">
                    {t.offer.authority}
                  </dd>
                </div>
              </dl>

              <p className="max-w-2xl leading-[1.85] text-ink2">
                {t.offer.permitBody}
              </p>
            </div>

            <div className="mt-16 grid gap-px border-2 border-rulestrong bg-rule lg:grid-cols-2">
              <div className="bg-paper p-7 sm:p-9">
                <h3 className="display text-2xl text-ink">
                  {t.offer.cannotTitle}
                </h3>
                <div className="rule-thin mt-5" />
                <ul className="mt-6 space-y-5">
                  {t.offer.cannot.map((item, i) => (
                    <li key={i} className="grid grid-cols-[1.4rem_1fr] gap-4">
                      <span
                        className="mt-2.5 h-[2px] w-4 bg-spot"
                        aria-hidden="true"
                      />
                      <span className="text-[0.95rem] leading-[1.8] text-ink2">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tint p-7 sm:p-9">
                <h3 className="display text-2xl text-ink">
                  {t.offer.canTitle}
                </h3>
                <div className="rule-thin mt-5" />
                <ul className="mt-6 space-y-5">
                  {t.offer.can.map((item, i) => (
                    <li key={i} className="grid grid-cols-[1.4rem_1fr] gap-4">
                      <span
                        className="mt-2.5 h-[2px] w-4 bg-ink2"
                        aria-hidden="true"
                      />
                      <span className="text-[0.95rem] leading-[1.8] text-ink2">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-10 max-w-3xl border-t-2 border-rulestrong pt-6 leading-[1.8] text-ink">
              {t.offer.closing}
            </p>
          </Reveal>
        </Section>

        {/* ------------------------------------------------- going there -- */}
        <Section id="attending" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.attend.eyebrow}
              title={t.attend.title}
              lede={t.attend.lede}
            />

            <dl className="mt-12 border-t-2 border-rulestrong">
              {t.attend.rows.map((row) => (
                <div
                  key={row.key}
                  className="grid gap-x-10 gap-y-3 border-b border-rule py-7 md:grid-cols-[18rem_1fr] md:py-8"
                >
                  <dt className="display text-xl leading-[1.35] text-ink">
                    {row.q}
                  </dt>
                  <dd className="max-w-2xl text-[0.98rem] leading-[1.85] text-ink2">
                    {row.a}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="display mt-10 max-w-2xl text-xl leading-[1.5] text-ink">
              {t.attend.closing}
            </p>
          </Reveal>
        </Section>

        {/* ---------------------------------------------- the register ---- */}
        <Section id="register">
          <Reveal>
            <SectionHeader
              eyebrow={t.register.eyebrow}
              title={t.register.title}
            />

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div className="max-w-2xl">
                <p className="leading-[1.85] text-ink2">{t.register.body}</p>

                <p className="mt-10">
                  <a
                    href={mailto}
                    className="inline-flex min-h-11 flex-wrap items-center gap-3 border-b-2 border-spot pb-1 text-[1.05rem] text-spot transition-colors hover:border-rulestrong hover:text-ink"
                  >
                    <span>{t.register.mailLabel}</span>
                    <span className="text-ink2">{KUMBH_MAIL}</span>
                  </a>
                </p>
              </div>

              <div className="boxed misregister bg-paper p-7 sm:p-8">
                <h3 className="label text-spot">{t.register.doesTitle}</h3>
                <ul className="mt-5 border-t border-rule">
                  {t.register.does.map((item, i) => (
                    <li
                      key={i}
                      className="border-b border-rule py-3.5 text-sm leading-[1.75] text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="label mt-9 text-ink2">{t.register.notTitle}</h3>
                <ul className="mt-5 border-t border-rule">
                  {t.register.not.map((item, i) => (
                    <li
                      key={i}
                      className="border-b border-rule py-3.5 text-sm leading-[1.75] text-ink2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* -------------------------------------------------- provenance -- */}
        <Section id="sources" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.sources.eyebrow}
              title={t.sources.title}
              lede={t.sources.lede}
            />

            <ul className="mt-12 border-t-2 border-rulestrong">
              {KUMBH_SOURCES.map((s) => (
                <li
                  key={s.key}
                  className="grid gap-x-10 gap-y-2 border-b border-rule py-6 md:grid-cols-[22rem_1fr]"
                >
                  <a
                    href={s.href}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    className="text-[0.98rem] leading-[1.6] text-ink underline decoration-spot decoration-1 transition-colors hover:text-spot"
                  >
                    {s.label[lang]}
                  </a>
                  <span className="max-w-2xl text-sm leading-[1.8] text-ink2">
                    {s.note[lang]}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-14 max-w-3xl">
              <h3 className="display text-2xl text-ink">
                {t.sources.unverifiedTitle}
              </h3>
              <div className="rule-heavy mt-5" />
              <ul>
                {t.sources.unverified.map((item, i) => (
                  <li
                    key={i}
                    className="border-b border-rule py-4 text-[0.95rem] leading-[1.8] text-ink2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-[1.8] text-ink2">
                {t.provenance.line}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------------ onward -- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <Eyebrow>{t.onward.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-3xl sm:text-4xl">
              {t.onward.title}
            </h2>

            <div className="mt-10 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-3">
              {t.onward.links.map((l) => (
                <Link
                  key={l.key}
                  href={onwardHref[l.key] ?? localePath(lang, "/")}
                  className="bg-paper p-7 transition-colors hover:bg-paper3 sm:p-8"
                >
                  <span className="display block text-xl text-ink">
                    {l.label}
                  </span>
                  <span className="mt-3 block text-sm leading-[1.75] text-ink2">
                    {l.note}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

/**
 * The label that has to sit beside every date on this page. A component rather
 * than a string so that adding a date without its provenance is a conspicuous
 * omission. The square is hollow: it fills only when something is settled, and
 * nothing on this calendar is settled yet.
 */
function ProvisionalMark({
  lang,
  short = false,
}: {
  lang: Lang;
  short?: boolean;
}) {
  const p = kumbhContent[lang].provenance;
  return (
    <span className="label inline-flex items-center gap-2 border border-spot px-2.5 py-1.5 text-spot">
      <span
        className="h-1.5 w-1.5 shrink-0 border border-spot"
        aria-hidden="true"
      />
      {short ? p.badgeShort : p.badge}
    </span>
  );
}
