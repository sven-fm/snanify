import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
import { Colophon, Mark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Eyebrow, Section, SectionHeader, StatusBadge } from "@/components/ui";
import { RIVERS, riversIndexContent } from "@/content/rivers";

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/* Six strands of water, cut as an engraving: solid ink, no fade, the front
   strand pulled heaviest the way a block cutter deepens the nearest line.
   Every coordinate is an integer literal so the server and the client
   serialise the same string. */
function Waterlines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 180"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable={false}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 18 + i * 26;
        const dip = 10 + i * 6;
        /* Literal widths, no arithmetic: a float that serialises differently on
           the server and the client is reported as a hydration mismatch. */
        const width = ["1", "1.4", "1.8", "2.2", "2.6", "3"][i];
        return (
          <path
            key={i}
            d={`M0 ${y} Q 300 ${y + dip} 600 ${y} T 1200 ${y}`}
            stroke="currentColor"
            strokeWidth={width}
          />
        );
      })}
    </svg>
  );
}

/** A single strand, the register's row flourish. One solid stroke, nothing else. */
function Strand({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable={false}
    >
      <path d="M0 10 Q 100 2 200 10 T 400 10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function RiversIndex({ lang }: { lang: Lang }) {
  const t = riversIndexContent[lang];

  const home = localePath(lang, "/");

  /* `home` is "/" or "/hi", so appending the fragment gives /#how and /hi#how. */
  const anchor = (id: string) => `${home}#${id}`;

  const first = RIVERS[0];
  const rest = RIVERS.slice(1);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/rivers" />

      <main>
        {/* ------------------------------------------------ front page --- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20">
            <div className="ink-in">
              <StatusBadge>{t.badge}</StatusBadge>
            </div>

            <h1
              className="ink-in display mt-7 max-w-4xl text-[2.7rem] sm:text-6xl lg:text-[4.6rem]"
              style={{ animationDelay: "80ms" }}
            >
              {t.title}
            </h1>

            <div className="rule-double mt-8 max-w-xl" />

            <p
              className="ink-in mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-ink2"
              style={{ animationDelay: "160ms" }}
            >
              {t.lede}
            </p>

            {/* the water itself, set as a ruled plate across the page */}
            <div className="mt-12 border-y-2 border-rulestrong py-5">
              <Waterlines className="h-20 w-full text-ink sm:h-24" />
            </div>

            {/* Said once, above the fold, as a printed notice in the spot
                colour rather than a whisper at the bottom of the page. */}
            <div
              className="ink-in mt-12 max-w-3xl border-2 border-spot"
              style={{ animationDelay: "240ms" }}
            >
              <h2 className="label bg-spot px-4 py-2.5 text-paper sm:px-6">
                {t.presence.label}
              </h2>
              <p className="px-4 py-5 text-sm leading-[1.75] text-ink sm:px-6 sm:py-6">
                {t.presence.body}
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- the lead water --- */}
        <section className="tint border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
                <div>
                  <Eyebrow>{t.lead.label}</Eyebrow>

                  <div className="mt-8 grid grid-cols-[3rem_1fr] items-baseline gap-x-5 border-t-2 border-rulestrong pt-6 sm:grid-cols-[4.5rem_1fr] sm:gap-x-8">
                    <span className="display text-3xl text-spot sm:text-5xl">
                      {numeral(1, lang)}
                    </span>
                    <div>
                      <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
                        {first.river[lang]}
                      </h2>
                      <p className="label mt-4 text-ink2">
                        {first.ghat[lang]} · {first.city[lang]}, {first.state[lang]}
                      </p>
                    </div>
                  </div>

                  {/* the epithet, marked with a spot rule rather than a
                      synthesised italic: Eczar has no italic cut. */}
                  <div className="mt-8 max-w-xl">
                    <span className="block h-[3px] w-10 bg-spot" aria-hidden="true" />
                    <p className="display mt-5 text-xl leading-[1.45] text-ink sm:text-2xl">
                      {first.epithet[lang]}
                    </p>
                  </div>

                  <div className="rule-thin mt-8 max-w-xl" />

                  <p className="mt-6 max-w-xl leading-[1.75] text-ink2">
                    {first.standfirst[lang]}
                  </p>

                  <p className="mt-5 max-w-xl text-sm leading-[1.75] text-ink2">
                    {first.sacred[lang][0]}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-5">
                    <Link href={localePath(lang, `/rivers/${first.slug}`)}>
                      <CTA>{t.lead.read}</CTA>
                    </Link>
                    <span className="label text-ink2">{t.formLabels[first.form]}</span>
                  </div>
                </div>

                <div className="mx-auto w-full max-w-xs lg:max-w-none">
                  <Colophon className="mx-auto w-full max-w-[18rem] text-ink" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------- the other five -- */}
        <Section id="index">
          <Reveal>
            <SectionHeader eyebrow={t.index.label} title={t.index.title} lede={t.index.lede} />

            <ul className="mt-12 border-t-2 border-rulestrong">
              {rest.map((r, i) => (
                <li key={r.slug}>
                  <Link
                    href={localePath(lang, `/rivers/${r.slug}`)}
                    className="group grid grid-cols-[3rem_1fr] items-start gap-x-5 gap-y-4 border-b border-rule py-8 transition-colors hover:bg-paper3 md:grid-cols-[4.5rem_1fr_13rem] md:gap-x-8 md:py-10"
                  >
                    <span className="display text-2xl text-spot sm:text-3xl">
                      {numeral(i + 2, lang)}
                    </span>

                    <div>
                      <h3 className="display text-3xl text-ink sm:text-4xl">{r.river[lang]}</h3>
                      <p className="label mt-3 text-ink2">
                        {r.ghat[lang]} · {r.city[lang]}, {r.state[lang]}
                      </p>
                      <p className="display mt-5 max-w-xl text-lg leading-[1.45] text-ink">
                        {r.epithet[lang]}
                      </p>
                      <p className="mt-3 max-w-xl text-sm leading-[1.75] text-ink2">
                        {r.standfirst[lang]}
                      </p>
                      <Strand className="mt-6 h-3 w-32 text-rule transition-colors group-hover:text-spot" />
                    </div>

                    <div className="col-start-2 flex flex-col items-start gap-3 md:col-start-3 md:items-end md:text-right">
                      {r.form === "temple-tank" && (
                        <span className="label border border-spot px-2.5 py-1.5 text-spot">
                          {t.notAGhat}
                        </span>
                      )}
                      <span className="label max-w-[11rem] text-ink2">
                        {t.formLabels[r.form]}
                      </span>
                      <span className="label text-ink underline decoration-spot decoration-2 md:mt-1">
                        {t.index.read}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ------------------------------------------------- offer ------
            What is actually on offer at every one of the six. A numbered
            register: at 390px the number and the name share the first line
            and the body runs full width underneath, so nothing is ever set
            in a column narrower than the text needs.                     */}
        <Section id="offer" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.offer.eyebrow}
              title={t.offer.title}
              lede={t.offer.lede}
            />

            <ol className="mt-12 border-t-2 border-rulestrong">
              {t.offer.items.map((item, i) => (
                <li
                  key={item.key}
                  className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-5 gap-y-3 border-b border-rule py-7 md:grid-cols-[3.5rem_15rem_1fr] md:gap-x-8 md:py-8"
                >
                  <span className="display text-xl text-spot">{numeral(i + 1, lang)}</span>
                  <span className="display text-xl text-ink sm:text-2xl">{item.name}</span>
                  <span className="col-start-2 max-w-2xl text-sm leading-[1.75] text-ink2 md:col-start-auto">
                    {item.body}
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-2xl border-t-2 border-spot pt-5 text-sm leading-[1.75] text-ink2">
              {t.offer.note}
            </p>
          </Reveal>
        </Section>

        {/* ----------------------------------------------- choosing ----- */}
        <Section>
          <Reveal>
            <SectionHeader
              eyebrow={t.choosing.eyebrow}
              title={t.choosing.title}
              lede={t.choosing.lede}
            />

            <dl className="mt-12 border-t-2 border-rulestrong">
              {t.choosing.rows.map((row) => (
                <div
                  key={row.key}
                  className="grid gap-3 border-b border-rule py-7 md:grid-cols-[15rem_1fr] md:gap-10 md:py-9"
                >
                  <dt className="label pt-1 text-spot">{row.label}</dt>
                  <dd className="max-w-2xl leading-[1.75] text-ink2">{row.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ honesty ----- */}
        <Section tinted>
          <Reveal>
            <SectionHeader eyebrow={t.honesty.eyebrow} title={t.honesty.title} />

            <div className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-2">
              <div className="bg-paper p-7 sm:p-9">
                <h3 className="label text-ink">{t.honesty.isLabel}</h3>
                <div className="rule-thin mt-4" />
                <p className="mt-5 leading-[1.75] text-ink2">{t.honesty.isBody}</p>
              </div>
              <div className="bg-paper3 p-7 sm:p-9">
                <h3 className="label text-spot">{t.honesty.isNotLabel}</h3>
                <div className="rule-thin mt-4" />
                <p className="mt-5 leading-[1.75] text-ink2">{t.honesty.isNotBody}</p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ closing ----- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[2.2rem] leading-tight sm:text-[3.2rem]">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-[1.75] text-ink2">{t.closing.lede}</p>
            <a href={anchor("sankalp")} className="mt-9 inline-block">
              <CTA className="!px-10 !py-4">{t.closing.cta}</CTA>
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
