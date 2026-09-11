import Link from "next/link";
import { WaterBand } from "@/components/WaterBand";
import { localePath } from "@/lib/i18n";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Section, StatusBadge } from "@/components/ui";
import { ghatNeighbours, riverDetailContent, type Ghat, type WaterForm } from "@/content/rivers";

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

/** A section heading: a title and at most one plain sentence. The caps label
    with a red dash that used to sit above each one is gone. */
function Heading({ title, lede }: { title: string; lede?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{title}</h2>
      {lede && <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{lede}</p>}
    </div>
  );
}

export function RiverDetail({ lang, ghat }: { lang: Lang; ghat: Ghat }) {
  const t = riverDetailContent[lang];

  const riversHref = localePath(lang, "/rivers");
  const beginHref = localePath(lang, "/begin");
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
              className="inline-flex min-h-11 items-center text-sm text-ink2 underline decoration-rule underline-offset-4 transition-colors hover:text-spot hover:decoration-spot"
            >
              {t.back}
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
              <div>
                <p className="text-sm text-ink2">{t.formLabels[ghat.form]}</p>

                <h1
                  className="ink-in display mt-4 text-[3rem] sm:text-6xl lg:text-[4.6rem]"
                  style={{ animationDelay: "80ms" }}
                >
                  {ghat.river[lang]}
                </h1>

                <div className="rule-double mt-7 max-w-xl" />
                <WaterBand seed={ghat.slug} className="mt-5 h-14 w-full max-w-xl sm:h-16" />

                <p
                  className="ink-in mt-6 text-xl text-ink sm:text-2xl"
                  style={{ animationDelay: "160ms" }}
                >
                  {ghat.ghat[lang]}
                  <span className="text-ink2">
                    , {ghat.city[lang]}, {ghat.state[lang]}
                  </span>
                </p>

                <p
                  className="ink-in display mt-8 max-w-2xl text-xl leading-[1.45] text-ink sm:text-2xl"
                  style={{ animationDelay: "240ms" }}
                >
                  {ghat.epithet[lang]}
                </p>

                <p
                  className="ink-in mt-5 max-w-2xl text-[1.05rem] leading-[1.75] text-ink2"
                  style={{ animationDelay: "320ms" }}
                >
                  {ghat.standfirst[lang]}
                </p>
              </div>

              {/* the plate: a printed diagram of what the place physically is */}
              <figure className="boxed self-start bg-paper">
                <WaterMotif form={ghat.form} className="block h-44 w-full text-ink sm:h-52" />
                <figcaption className="border-t border-rulestrong px-4 py-3 text-sm text-ink2">
                  {ghat.ghat[lang]}, {ghat.city[lang]}
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

        {/* ----------------------------------------------- caution ------
            A fact the reader needs before choosing this water. Ruled in the
            spot colour because it matters, headed in display type rather
            than a caps bar. */}
        {ghat.caution && (
          <section className="border-b-2 border-rulestrong">
            <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
              <div className="max-w-3xl border-2 border-spot px-5 py-6 sm:px-7 sm:py-7">
                <h2 className="display text-xl text-ink">{t.caution.label}</h2>
                <p className="mt-3 leading-[1.75] text-ink">{ghat.caution[lang]}</p>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------ sacred ------ */}
        <Section id="water" tinted>
          <Heading title={t.sacred.title} />
          <div className="mt-10 max-w-3xl space-y-6">
            {ghat.sacred[lang].map((para, i) => (
              <p key={i} className="text-[1.02rem] leading-[1.85] text-ink2">
                {para}
              </p>
            ))}
          </div>
        </Section>

        {/* ----------------------------------------------- reading ------ */}
        <Section id="reading">
          <Heading title={t.reading.title} lede={t.reading.lede} />

          <p className="mt-10 max-w-3xl text-[1.05rem] leading-[1.85] text-ink">
            {ghat.reading[lang]}
          </p>

          <div className="mt-9">
            <Link href={liveHref} className="inline-block">
              <CTA>{t.reading.cta}</CTA>
            </Link>
          </div>

          {/* The masthead of a data publication: where the figures come from
              and the licence they carry. */}
          <div className="mt-14 max-w-3xl border-t-2 border-rulestrong pt-6">
            <h3 className="display text-xl text-ink">{t.reading.provenanceLabel}</h3>
            <div className="mt-4 space-y-4">
              {t.reading.provenance.map((para, i) => (
                <p key={i} className="text-sm leading-[1.8] text-ink2">
                  {para}
                </p>
              ))}
            </div>

            <div className="rule-thin mt-7" />
            <h3 className="display mt-6 text-xl text-ink">{t.reading.attributionLabel}</h3>
            <ul className="mt-3 space-y-1.5">
              {t.reading.attribution.map((line) => (
                <li key={line} className="text-sm leading-[1.7] text-ink2">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ------------------------------------------------- offer ------ */}
        <Section id="offer" tinted>
          <Heading title={t.offer.title} lede={t.offer.lede} />

          <ul className="mt-10 border-t-2 border-rulestrong">
            {t.offer.items.map((item) => (
              <li
                key={item.key}
                className="grid gap-y-2 border-b border-rule py-6 md:grid-cols-[14rem_1fr] md:gap-x-8 md:py-7"
              >
                <span className="display text-xl text-ink">{item.name}</span>
                <span className="max-w-2xl text-sm leading-[1.75] text-ink2">{item.body}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={beginHref}>
              <CTA>{t.offer.cta}</CTA>
            </Link>
            <Link href={muhuratHref}>
              <CTA variant="ghost">{t.offer.muhurat}</CTA>
            </Link>
          </div>
        </Section>

        {/* --------------------------------------------- tradition ------ */}
        <Section id="tradition">
          <Heading title={t.tradition.title} lede={t.tradition.lede} />

          <ul className="mt-10 border-t-2 border-rulestrong">
            {ghat.tradition.map((item) => (
              <li
                key={item.key}
                className="grid gap-x-8 gap-y-3 border-b border-rule py-7 md:grid-cols-[1fr_14rem] md:py-8"
              >
                <div>
                  <h3 className="display text-2xl text-ink">{item.name[lang]}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-[1.75] text-ink2">
                    {item.note[lang]}
                  </p>
                </div>
                <p className="text-sm text-ink2 md:text-right">{t.tradition.kindLabels[item.kind]}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* --------------------------------------------- occasions ------ */}
        <Section id="occasions" tinted>
          <Heading title={t.occasions.title} lede={t.occasions.lede} />

          {/* Genuinely provisional, so the badge is earned here. */}
          <div className="mt-8">
            <StatusBadge>{t.occasions.provisional}</StatusBadge>
          </div>

          <ul className="mt-10 border-t-2 border-rulestrong">
            {ghat.occasions.map((o) => (
              <li
                key={o.key}
                className="grid gap-x-8 gap-y-3 border-b border-rule py-7 md:grid-cols-[1fr_17rem] md:py-8"
              >
                <div>
                  <h3 className="display text-2xl text-ink">{o.name[lang]}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-[1.75] text-ink2">{o.note[lang]}</p>
                </div>
                <p className="text-sm text-ink2 md:text-right">{o.reckoning[lang]}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ------------------------------------------------ keeper ------ */}
        <Section id="keeper">
          <Heading title={t.keeper.title} />
          <p className="mt-8 max-w-3xl leading-[1.75] text-ink">{ghat.keeper[lang]}</p>
        </Section>

        {/* ------------------------------------------------ onward ------ */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="display text-3xl sm:text-4xl">{t.onward.title}</h2>

            {neighbours && (
              <div className="mt-10 grid gap-px border-2 border-rulestrong bg-rule sm:grid-cols-2">
                {[neighbours.prev, neighbours.next].map((g) => (
                  <Link
                    key={g.slug}
                    href={localePath(lang, `/rivers/${g.slug}`)}
                    className="bg-paper p-7 transition-colors hover:bg-paper3 sm:p-8"
                  >
                    <span className="display block text-2xl text-ink">{g.river[lang]}</span>
                    <span className="mt-2 block text-sm text-ink2">
                      {g.ghat[lang]}, {g.city[lang]}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link href={beginHref}>
                <CTA>{t.onward.cta}</CTA>
              </Link>
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
