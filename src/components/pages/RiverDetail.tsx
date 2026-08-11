import Link from "next/link";
import { localePath } from "@/lib/i18n";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { Mark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Eyebrow, Section, SectionHeader, StatusBadge } from "@/components/ui";
import { ghatNeighbours, riverDetailContent, type Ghat, type WaterForm } from "@/content/rivers";

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/* ---------------------------------------------------------------------------
   No photographs exist in this repo, so each water gets a drawn plate instead
   of a picture, and the drawing is keyed to what the place physically is:
   steps down into a flowing river, two lines meeting, or a walled tank with a
   spring rising in it. Engraved, not rendered: solid ink strokes at printed
   weights, one vermillion mark, no fades. It is a diagram, never a depiction,
   and it is aria-hidden.
   --------------------------------------------------------------------------- */
function WaterMotif({ form, className = "" }: { form: WaterForm; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 320 200",
    preserveAspectRatio: "xMidYMid meet" as const,
    fill: "none",
    stroke: "currentColor",
    "aria-hidden": true,
    focusable: "false" as const,
  };

  if (form === "confluence") {
    return (
      <svg {...common}>
        {/* two waters arriving, running together, then one channel onward */}
        <path d="M8 44 H112 L196 96 H312" strokeWidth="2" />
        <path d="M8 66 H108 L192 104" strokeWidth="1" />
        <path d="M8 164 H112 L196 116 H312" strokeWidth="2" />
        <path d="M8 142 H108 L192 108" strokeWidth="1" />
        {/* the third, held in faith rather than seen */}
        <path d="M8 104 H188" strokeWidth="1" strokeDasharray="3 9" />
        {/* the meeting itself */}
        <rect x="190" y="100" width="12" height="12" fill="var(--spot)" stroke="none" />
      </svg>
    );
  }

  if (form === "temple-tank") {
    return (
      <svg {...common}>
        {/* a walled tank, stepped down, with the river leaving it eastward */}
        <rect x="76" y="24" width="168" height="152" strokeWidth="2" />
        <rect x="94" y="42" width="132" height="116" strokeWidth="1" />
        <rect x="112" y="60" width="96" height="80" strokeWidth="1" />
        <rect x="136" y="76" width="48" height="48" strokeWidth="1" />
        <path d="M244 100 H312" strokeWidth="2" />
        {/* the spring */}
        <circle cx="160" cy="100" r="9" fill="var(--spot)" stroke="none" />
      </svg>
    );
  }

  /* flowing-ghat: steps down on the left, the water running away to the right */
  return (
    <svg {...common}>
      <path d="M16 34 H56 V60 H96 V86 H136 V112 H176 V138 H216" strokeWidth="2" />
      <path d="M216 138 H304" strokeWidth="2" />
      <path d="M180 158 H304" strokeWidth="1" />
      <path d="M150 176 H304" strokeWidth="1" />
      {/* the waterline, where the lowest step meets the river */}
      <rect x="204" y="126" width="12" height="12" fill="var(--spot)" stroke="none" />
    </svg>
  );
}

export function RiverDetail({ lang, ghat }: { lang: Lang; ghat: Ghat }) {
  const t = riverDetailContent[lang];

  const home = localePath(lang, "/");
  const anchor = (id: string) => `${home}#${id}`;
  const riversHref = localePath(lang, "/rivers");
  const muhuratHref = localePath(lang, "/muhurat");
  /* /live lists all six and anchors each row on its slug, so this lands the
     reader on this water's own block rather than at the top of the page. */
  const liveHref = `${localePath(lang, "/live")}#${ghat.slug}`;
  const neighbours = ghatNeighbours(ghat.slug);

  const facts: { key: string; label: string; value: string }[] = [
    { key: "river", label: t.facts.river, value: ghat.river[lang] },
    { key: "ghat", label: t.facts.ghat, value: ghat.ghat[lang] },
    { key: "place", label: t.facts.place, value: `${ghat.city[lang]}, ${ghat.state[lang]}` },
    { key: "form", label: t.facts.form, value: t.formLabels[ghat.form] },
    ...(ghat.riverAlso
      ? [{ key: "also", label: t.facts.alsoKnown, value: ghat.riverAlso[lang] }]
      : []),
    { key: "tz", label: t.facts.timezone, value: ghat.tz },
  ];

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath={`/rivers/${ghat.slug}`} />

      <main>
        {/* -------------------------------------------------- hero ------ */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-6 pb-16 sm:px-8 sm:pt-8 sm:pb-20">
            <Link
              href={riversHref}
              className="label inline-flex min-h-11 items-center gap-2 text-ink2 transition-colors hover:text-spot"
            >
              ← {t.back}
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
              <div>
                <div className="flex flex-wrap items-center gap-5">
                  <span className="display text-4xl text-spot">
                    {numeral(Number(ghat.numeral), lang)}
                  </span>
                  <StatusBadge>{t.formLabels[ghat.form]}</StatusBadge>
                </div>

                <h1
                  className="ink-in display mt-7 text-[3rem] sm:text-6xl lg:text-[4.6rem]"
                  style={{ animationDelay: "80ms" }}
                >
                  {ghat.river[lang]}
                </h1>

                <div className="rule-double mt-7 max-w-xl" />

                <p
                  className="ink-in mt-6 text-xl text-ink sm:text-2xl"
                  style={{ animationDelay: "160ms" }}
                >
                  {ghat.ghat[lang]}
                  <span className="text-ink2">
                    {" · "}
                    {ghat.city[lang]}, {ghat.state[lang]}
                  </span>
                </p>

                {/* the epithet, marked with a spot rule rather than a
                    synthesised italic: Eczar has no italic cut. */}
                <div className="ink-in mt-8 max-w-2xl" style={{ animationDelay: "240ms" }}>
                  <span className="block h-[3px] w-10 bg-spot" aria-hidden="true" />
                  <p className="display mt-5 text-xl leading-[1.45] text-ink sm:text-2xl">
                    {ghat.epithet[lang]}
                  </p>
                </div>

                <p
                  className="ink-in mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-ink2"
                  style={{ animationDelay: "320ms" }}
                >
                  {ghat.standfirst[lang]}
                </p>
              </div>

              {/* the plate: a printed diagram of what the place physically is */}
              <figure className="boxed self-start bg-paper">
                <WaterMotif form={ghat.form} className="block h-44 w-full text-ink sm:h-52" />
                <figcaption className="label border-t border-rulestrong px-4 py-3 text-ink2">
                  {ghat.ghat[lang]} · {ghat.city[lang]}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* --------------------------------------------- fact strip ----- */}
        <section className="tint border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
            <dl className="flex flex-wrap border-y-2 border-rulestrong">
              {facts.map((f) => (
                <div
                  key={f.key}
                  className="min-w-[8.5rem] flex-1 border-r border-rule px-4 py-5 first:pl-0 last:border-r-0"
                >
                  <dt className="label text-ink2">{f.label}</dt>
                  <dd className="mt-2 text-sm text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------- caution ------ */}
        {ghat.caution && (
          <section className="border-b-2 border-rulestrong">
            <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
              <div className="max-w-3xl border-2 border-spot">
                <h2 className="label bg-spot px-4 py-2.5 text-paper sm:px-6">
                  {t.caution.label}
                </h2>
                <p className="px-4 py-5 leading-[1.75] text-ink sm:px-6 sm:py-6">
                  {ghat.caution[lang]}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------ sacred ------ */}
        <Section id="water" tinted>
          <Reveal>
            <SectionHeader eyebrow={t.sacred.eyebrow} title={t.sacred.title} />

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div className="max-w-2xl space-y-7">
                {ghat.sacred[lang].map((para, i) => (
                  <p key={i} className="text-[1.02rem] leading-[1.85] text-ink2">
                    {para}
                  </p>
                ))}
              </div>

              <aside className="lg:w-56">
                <div className="rule-thin mb-8 lg:hidden" />
                <Mark className="h-10 w-10 text-ink" />
                <p className="display mt-6 text-lg leading-[1.5] text-ink">
                  {ghat.epithet[lang]}
                </p>
              </aside>
            </div>
          </Reveal>
        </Section>

        {/* ----------------------------------------------- reading ------ */}
        <Section id="reading">
          <Reveal>
            <SectionHeader
              eyebrow={t.reading.eyebrow}
              title={t.reading.title}
              lede={t.reading.lede}
            />

            <p className="mt-10 max-w-3xl text-[1.05rem] leading-[1.85] text-ink">
              {ghat.reading[lang]}
            </p>

            <div className="mt-9">
              <Link href={liveHref} className="inline-block">
                <CTA>{t.reading.cta}</CTA>
              </Link>
            </div>

            {/* The masthead of a data publication, not a disclaimer. It is set
                small and under a hairline, and it carries the licence. */}
            <div className="mt-14 max-w-3xl border-t-2 border-rulestrong pt-6">
              <h3 className="label text-ink2">{t.reading.provenanceLabel}</h3>
              <div className="mt-5 space-y-4">
                {t.reading.provenance.map((para, i) => (
                  <p key={i} className="text-sm leading-[1.8] text-ink2">
                    {para}
                  </p>
                ))}
              </div>

              <div className="rule-thin mt-7" />
              <h3 className="label mt-6 text-ink2">{t.reading.attributionLabel}</h3>
              <ul className="mt-3 space-y-1.5">
                {t.reading.attribution.map((line) => (
                  <li key={line} className="text-sm leading-[1.7] text-ink2">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------- offer ------ */}
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
                  className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-5 gap-y-3 border-b border-rule py-6 md:grid-cols-[3.5rem_14rem_1fr] md:gap-x-8 md:py-7"
                >
                  <span className="display text-xl text-spot">{numeral(i + 1, lang)}</span>
                  <span className="display text-xl text-ink">{item.name}</span>
                  <span className="col-start-2 max-w-2xl text-sm leading-[1.75] text-ink2 md:col-start-auto">
                    {item.body}
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-2xl border-t-2 border-spot pt-5 text-sm leading-[1.75] text-ink2">
              {t.offer.note}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={anchor("sankalp")}>
                <CTA>{t.offer.cta}</CTA>
              </a>
              <Link href={muhuratHref}>
                <CTA variant="ghost">{t.offer.muhurat}</CTA>
              </Link>
            </div>
          </Reveal>
        </Section>

        {/* --------------------------------------------- tradition ------ */}
        <Section id="tradition">
          <Reveal>
            <SectionHeader
              eyebrow={t.tradition.eyebrow}
              title={t.tradition.title}
              lede={t.tradition.lede}
            />

            {/* The standing sentence sits above the register, so nothing in it
                can be read as a menu even by somebody skimming. */}
            <p className="mt-8 max-w-3xl border-l-2 border-spot pl-5 text-sm leading-[1.8] text-ink">
              {t.tradition.standing}
            </p>

            <ul className="mt-10 border-t-2 border-rulestrong">
              {ghat.tradition.map((item) => (
                <li
                  key={item.key}
                  className="grid gap-x-8 gap-y-4 border-b border-rule py-7 md:grid-cols-[1fr_16rem] md:py-8"
                >
                  <div>
                    <h3 className="display text-2xl text-ink">{item.name[lang]}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-[1.75] text-ink2">
                      {item.note[lang]}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <span
                      className={`label inline-flex items-center gap-2.5 border px-3 py-2 ${
                        item.kind === "personal"
                          ? "border-spot text-spot"
                          : "border-rulestrong text-ink"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 ${
                          item.kind === "personal" ? "bg-spot" : "border border-ink2"
                        }`}
                        aria-hidden="true"
                      />
                      {t.tradition.kindLabels[item.kind]}
                    </span>
                    <p className="mt-3 text-sm leading-[1.7] text-ink2">
                      {item.kind === "personal"
                        ? t.tradition.personalNote
                        : t.tradition.placeNote}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* --------------------------------------------- occasions ------ */}
        <Section id="occasions" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.occasions.eyebrow}
              title={t.occasions.title}
              lede={t.occasions.lede}
            />

            <div className="mt-8">
              <StatusBadge>{t.occasions.provisional}</StatusBadge>
            </div>

            <ul className="mt-10 border-t-2 border-rulestrong">
              {ghat.occasions.map((o) => (
                <li
                  key={o.key}
                  className="grid gap-x-8 gap-y-4 border-b border-rule py-7 md:grid-cols-[1fr_17rem] md:py-8"
                >
                  <div>
                    <h3 className="display text-2xl text-ink">{o.name[lang]}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-[1.75] text-ink2">
                      {o.note[lang]}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="label text-ink2">{t.occasions.reckoningLabel}</p>
                    <p className="mt-2 text-sm text-spot">{o.reckoning[lang]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ keeper ------ */}
        <Section id="keeper">
          <Reveal>
            <SectionHeader eyebrow={t.keeper.eyebrow} title={t.keeper.title} />

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <dl className="border-t-2 border-rulestrong">
                <div className="border-b border-rule py-6">
                  <dt className="label text-ink2">{t.keeper.label}</dt>
                  <dd className="mt-3 leading-[1.75] text-ink">{ghat.keeper[lang]}</dd>
                </div>
              </dl>

              <p className="max-w-2xl leading-[1.75] text-ink2">{t.keeper.body}</p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ onward ------ */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <Eyebrow>{t.onward.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-3xl sm:text-4xl">{t.onward.title}</h2>

            {neighbours && (
              <div className="mt-10 grid gap-px border-2 border-rulestrong bg-rule sm:grid-cols-2">
                {[
                  { dir: t.onward.prev, g: neighbours.prev },
                  { dir: t.onward.next, g: neighbours.next },
                ].map(({ dir, g }) => (
                  <Link
                    key={dir}
                    href={localePath(lang, `/rivers/${g.slug}`)}
                    className="group bg-paper p-7 transition-colors hover:bg-paper3 sm:p-8"
                  >
                    <span className="label text-spot">{dir}</span>
                    <span className="display mt-3 block text-2xl text-ink">{g.river[lang]}</span>
                    <span className="mt-2 block text-sm text-ink2">
                      {g.ghat[lang]} · {g.city[lang]}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <a href={anchor("sankalp")}>
                <CTA>{t.onward.cta}</CTA>
              </a>
              <Link href={riversHref}>
                <CTA variant="ghost">{t.onward.all}</CTA>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
