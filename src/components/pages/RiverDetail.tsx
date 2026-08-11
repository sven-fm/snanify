import Link from "next/link";
import { localePath, type Lang } from "@/lib/i18n";
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
      {/* where the ritvik stands, at the waterline */}
      <rect x="204" y="126" width="12" height="12" fill="var(--spot)" stroke="none" />
    </svg>
  );
}

export function RiverDetail({ lang, ghat }: { lang: Lang; ghat: Ghat }) {
  const t = riverDetailContent[lang];
  const granted = ghat.permitStatus === "granted";

  const home = localePath(lang, "/");
  const anchor = (id: string) => `${home}#${id}`;
  const riversHref = localePath(lang, "/rivers");
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

        {/* -------------------------------------------------- rite ------ */}
        <Section id="rite">
          <Reveal>
            <SectionHeader eyebrow={t.rite.eyebrow} title={t.rite.title} lede={t.rite.lede} />

            <ol className="mt-12 border-t-2 border-rulestrong">
              {t.rite.steps.map((s, i) => (
                <li
                  key={s.key}
                  className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-5 gap-y-2 border-b border-rule py-6 md:grid-cols-[3.5rem_13rem_1fr] md:gap-x-8 md:py-7"
                >
                  <span className="display text-xl text-spot">{numeral(i + 1, lang)}</span>
                  <span className="display text-xl text-ink">{s.name}</span>
                  <span className="col-start-2 max-w-2xl text-sm leading-[1.75] text-ink2 md:col-start-auto">
                    {s.body}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-7 md:grid-cols-3">
              <p className="border-t-2 border-rulestrong pt-5 text-sm leading-[1.75] text-ink2">
                {t.rite.audioNote}
              </p>
              <p className="border-t-2 border-rulestrong pt-5 text-sm leading-[1.75] text-ink2">
                {t.rite.proxyNote}
              </p>
              <p className="border-t-2 border-spot pt-5 text-sm leading-[1.75] text-ink2">
                {t.rite.digital}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------- rites ------ */}
        <Section id="rites" tinted>
          <Reveal>
            <SectionHeader eyebrow={t.rites.eyebrow} title={t.rites.title} lede={t.rites.lede} />

            <ul className="mt-12 grid gap-px border-2 border-rulestrong bg-rule sm:grid-cols-2">
              {ghat.rites.map((r) => (
                <li key={r.key} className="tint p-7 sm:p-8">
                  <h3 className="display text-xl text-ink">{r.name[lang]}</h3>
                  <div className="rule-thin mt-4" />
                  <p className="mt-4 text-sm leading-[1.75] text-ink2">{r.note[lang]}</p>
                </li>
              ))}
              {/* Three of the six waters carry an odd number of rites. Without a
                  filler the last grid cell falls through to the container's rule
                  colour and renders as a solid block. */}
              {ghat.rites.length % 2 === 1 && (
                <li aria-hidden="true" className="tint hidden sm:block" />
              )}
            </ul>
          </Reveal>
        </Section>

        {/* --------------------------------------------- occasions ------ */}
        <Section id="occasions">
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

        {/* -------------------------------------------- permission ------ */}
        <Section id="permission" tinted>
          <Reveal>
            <SectionHeader eyebrow={t.permission.eyebrow} title={t.permission.title} />

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <dl className="border-t-2 border-rulestrong">
                <div className="border-b border-rule py-6">
                  <dt className="label text-ink2">{t.permission.authorityLabel}</dt>
                  <dd className="mt-3 leading-[1.75] text-ink">{ghat.authority[lang]}</dd>
                </div>
                <div className="border-b border-rule py-6">
                  <dt className="label text-ink2">{t.permission.statusLabel}</dt>
                  <dd className="mt-3">
                    <span
                      className={`label inline-flex items-center gap-2.5 border px-3 py-2 ${
                        granted ? "border-rulestrong text-ink" : "border-spot text-spot"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 ${granted ? "bg-ink" : "bg-spot"}`}
                        aria-hidden="true"
                      />
                      {t.permission.status[ghat.permitStatus]}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="max-w-2xl space-y-6">
                <p className="leading-[1.75] text-ink2">{t.permission.body}</p>
                <div className="rule-thin" />
                <p className="leading-[1.75] text-ink2">{t.permission.framing}</p>
              </div>
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
