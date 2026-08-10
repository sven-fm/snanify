import Link from "next/link";
import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { Mark } from "@/components/Logo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Eyebrow, Section, SectionHeader, StatusBadge } from "@/components/ui";
import { ghatNeighbours, riverDetailContent, type Ghat, type WaterForm } from "@/content/rivers";

/* ---------------------------------------------------------------------------
   No photographs exist in this repo, so each water gets a drawn motif instead
   of a picture — and the drawing is keyed to what the place physically is:
   steps into a flowing river, two streams meeting, or a walled tank fed by a
   spring. It is atmosphere, never a depiction, and it is aria-hidden.
   --------------------------------------------------------------------------- */
function WaterMotif({ form, className = "" }: { form: WaterForm; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 1200 300",
    preserveAspectRatio: "none" as const,
    fill: "none",
    "aria-hidden": true,
    focusable: "false" as const,
  };

  if (form === "confluence") {
    return (
      <svg {...common}>
        {/* two waters arriving, running side by side, then one */}
        <path d="M-40 60 C 260 60 380 150 640 168 L 1240 176" stroke="var(--teal)" strokeWidth="1.2" opacity="0.6" />
        <path d="M-40 96 C 260 96 380 168 640 182 L 1240 190" stroke="var(--teal)" strokeWidth="1" opacity="0.4" />
        <path d="M-40 290 C 300 290 420 220 640 200 L 1240 192" stroke="var(--sun)" strokeWidth="1.2" opacity="0.5" />
        <path d="M-40 254 C 300 254 420 206 640 194 L 1240 186" stroke="var(--sun)" strokeWidth="1" opacity="0.32" />
        {/* the third, held in faith rather than seen */}
        <path
          d="M-40 174 C 300 150 420 178 640 184 L 1240 184"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 9"
          opacity="0.35"
        />
      </svg>
    );
  }

  if (form === "temple-tank") {
    return (
      <svg {...common}>
        {/* a walled tank, and a spring rising in the middle of it */}
        <rect x="380" y="40" width="440" height="220" stroke="currentColor" strokeWidth="1" opacity="0.28" />
        <rect x="418" y="70" width="364" height="160" stroke="currentColor" strokeWidth="1" opacity="0.18" />
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx="600"
            cy="150"
            rx={26 + i * 34}
            ry={9 + i * 12}
            stroke="var(--teal)"
            strokeWidth="1"
            opacity={0.55 - i * 0.09}
          />
        ))}
        <circle cx="600" cy="150" r="5" fill="var(--sun)" opacity="0.8" />
      </svg>
    );
  }

  /* flowing-ghat: steps on the left, the water widening away to the right */
  return (
    <svg {...common}>
      <path
        d="M-40 300 H 120 V 262 H 210 V 224 H 300 V 186 H 390 V 148 H 480"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.3"
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${480 - i * 22} ${150 + i * 24} Q ${760 + i * 30} ${126 + i * 20} 1240 ${150 + i * 26}`}
          stroke="var(--teal)"
          strokeWidth="1"
          opacity={0.55 - i * 0.06}
        />
      ))}
    </svg>
  );
}

export function RiverDetail({ lang, ghat }: { lang: Lang; ghat: Ghat }) {
  const t = riverDetailContent[lang];
  const nav = content[lang].nav;
  const hi = lang === "hi";
  /* `display` sets line-height 0.98; Devanagari matras need more room. */
  const lead = hi ? { lineHeight: 1.2 } : undefined;

  const home = localePath(lang, "/");
  const anchor = (id: string) => `${home}#${id}`;
  const riversHref = localePath(lang, "/rivers");
  const neighbours = ghatNeighbours(ghat.slug);

  const navLinks = [
    { href: riversHref, label: nav.rivers },
    { href: anchor("how"), label: nav.how },
    { href: anchor("muhurat"), label: nav.muhurat },
    { href: anchor("sankalp"), label: nav.pricing },
  ];

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

      <Header lang={lang} links={navLinks} currentPath={`/rivers/${ghat.slug}`} />

      <main>
        {/* -------------------------------------------------- hero ------ */}
        <section className="relative overflow-hidden">
          <div className="halo" aria-hidden="true" />
          <WaterMotif
            form={ghat.form}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full text-ink opacity-70"
          />

          <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-20 sm:px-8 sm:pt-14 sm:pb-28">
            <Link
              href={riversHref}
              className="inscription inline-flex min-h-11 items-center gap-2 text-[0.62rem] text-ink2 transition-colors hover:text-gold"
            >
              ← {t.back}
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="display text-4xl text-gold/35">{ghat.numeral}</span>
              <StatusBadge>{t.formLabels[ghat.form]}</StatusBadge>
            </div>

            <h1
              className="rise-in display mt-6 text-[3rem] sm:text-7xl lg:text-[5rem]"
              style={{ animationDelay: "80ms", ...lead }}
            >
              {ghat.river[lang]}
            </h1>

            <p
              className="rise-in mt-4 text-xl text-ink sm:text-2xl"
              style={{ animationDelay: "160ms" }}
            >
              {ghat.ghat[lang]}
              <span className="text-ink2">
                {" · "}
                {ghat.city[lang]}, {ghat.state[lang]}
              </span>
            </p>

            <p
              className={`rise-in mt-8 max-w-2xl text-xl text-teal sm:text-2xl ${hi ? "" : "italic"}`}
              style={{ animationDelay: "240ms", ...(hi ? { lineHeight: 1.5 } : {}) }}
            >
              {ghat.epithet[lang]}
            </p>

            <p
              className="rise-in mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink2"
              style={{ animationDelay: "320ms" }}
            >
              {ghat.standfirst[lang]}
            </p>
          </div>
        </section>

        {/* --------------------------------------------- fact strip ----- */}
        <section className="border-t border-line/60 bg-bg2/40">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
              {facts.map((f) => (
                <div key={f.key}>
                  <dt className="inscription text-[0.58rem] text-ink2">{f.label}</dt>
                  <dd className="mt-2 text-sm text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------- caution ------ */}
        {ghat.caution && (
          <section className="border-t border-line/60">
            <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
              <div className="max-w-3xl border-l-2 border-sindoor/60 pl-6 sm:pl-8">
                <h2 className="inscription text-[0.64rem] text-sindoor">{t.caution.label}</h2>
                <p className="mt-4 leading-relaxed text-ink">{ghat.caution[lang]}</p>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------ sacred ------ */}
        <Section id="water" tinted>
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
              <div className="rule-fade mb-8 lg:hidden" />
              <Mark className="h-10 w-10 text-gold/70" />
              <p
                className={`mt-6 text-lg text-teal ${hi ? "" : "italic"}`}
                style={hi ? { lineHeight: 1.6 } : undefined}
              >
                {ghat.epithet[lang]}
              </p>
            </aside>
          </div>
        </Section>

        {/* -------------------------------------------------- rite ------ */}
        <Section id="rite">
          <SectionHeader eyebrow={t.rite.eyebrow} title={t.rite.title} lede={t.rite.lede} />

          <ol className="mt-14 border-t border-line/60">
            {t.rite.steps.map((s, i) => (
              <li
                key={s.key}
                className="grid gap-x-8 gap-y-2 border-b border-line/60 py-6 md:grid-cols-[3rem_13rem_1fr] md:py-7"
              >
                <span className="inscription text-[0.62rem] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-xl text-ink" style={lead}>
                  {s.name}
                </span>
                <span className="max-w-2xl text-sm leading-relaxed text-ink2">{s.body}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <p className="border-t-2 border-teal/50 pt-5 text-sm leading-relaxed text-ink2">
              {t.rite.audioNote}
            </p>
            <p className="border-t-2 border-gold/50 pt-5 text-sm leading-relaxed text-ink2">
              {t.rite.proxyNote}
            </p>
            <p className="border-t-2 border-sindoor/50 pt-5 text-sm leading-relaxed text-ink2">
              {t.rite.digital}
            </p>
          </div>
        </Section>

        {/* ------------------------------------------------- rites ------ */}
        <Section id="rites" tinted>
          <SectionHeader eyebrow={t.rites.eyebrow} title={t.rites.title} lede={t.rites.lede} />

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 sm:grid-cols-2">
            {ghat.rites.map((r) => (
              <li key={r.key} className="bg-bg p-7 sm:p-8">
                <h3 className="display text-xl text-ink" style={lead}>
                  {r.name[lang]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{r.note[lang]}</p>
              </li>
            ))}
            {/* Three of the six waters carry an odd number of rites. Without a
                filler the last grid cell falls through to the container's rule
                colour and renders as a solid block. */}
            {ghat.rites.length % 2 === 1 && (
              <li aria-hidden="true" className="hidden bg-bg sm:block" />
            )}
          </ul>
        </Section>

        {/* --------------------------------------------- occasions ------ */}
        <Section id="occasions">
          <SectionHeader
            eyebrow={t.occasions.eyebrow}
            title={t.occasions.title}
            lede={t.occasions.lede}
          />

          <div className="mt-8">
            <StatusBadge>{t.occasions.provisional}</StatusBadge>
          </div>

          <ul className="mt-10 border-t border-line/60">
            {ghat.occasions.map((o) => (
              <li
                key={o.key}
                className="grid gap-x-8 gap-y-3 border-b border-line/60 py-7 md:grid-cols-[1fr_17rem] md:py-8"
              >
                <div>
                  <h3 className="display text-2xl text-ink" style={lead}>
                    {o.name[lang]}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink2">{o.note[lang]}</p>
                </div>
                <div className="md:text-right">
                  <p className="inscription text-[0.6rem] text-ink2">
                    {t.occasions.reckoningLabel}
                  </p>
                  <p className="mt-1.5 text-sm text-gold">{o.reckoning[lang]}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* -------------------------------------------- permission ------ */}
        <Section id="permission" tinted>
          <SectionHeader eyebrow={t.permission.eyebrow} title={t.permission.title} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <dl className="space-y-8">
              <div>
                <dt className="inscription text-[0.6rem] text-ink2">
                  {t.permission.authorityLabel}
                </dt>
                <dd className="mt-3 leading-relaxed text-ink">{ghat.authority[lang]}</dd>
              </div>
              <div>
                <dt className="inscription text-[0.6rem] text-ink2">{t.permission.statusLabel}</dt>
                <dd className="mt-3">
                  <span
                    className={`inscription inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[0.62rem] ${
                      ghat.permitStatus === "granted"
                        ? "border-teal/60 text-teal"
                        : "border-sindoor/60 text-sindoor"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        ghat.permitStatus === "granted" ? "bg-teal" : "bg-sindoor"
                      }`}
                      aria-hidden="true"
                    />
                    {t.permission.status[ghat.permitStatus]}
                  </span>
                </dd>
              </div>
            </dl>

            <div className="max-w-2xl space-y-6">
              <p className="leading-relaxed text-ink2">{t.permission.body}</p>
              <div className="rule-fade" />
              <p className="leading-relaxed text-ink2">{t.permission.framing}</p>
            </div>
          </div>
        </Section>

        {/* ------------------------------------------------ onward ------ */}
        <section className="relative overflow-hidden border-t border-line/60">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <Eyebrow>{t.onward.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-3xl sm:text-4xl" style={lead}>
              {t.onward.title}
            </h2>

            {neighbours && (
              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 sm:grid-cols-2">
                {[
                  { dir: t.onward.prev, g: neighbours.prev },
                  { dir: t.onward.next, g: neighbours.next },
                ].map(({ dir, g }) => (
                  <Link
                    key={dir}
                    href={localePath(lang, `/rivers/${g.slug}`)}
                    className="group bg-bg p-7 transition-colors duration-500 hover:bg-bg3/50 sm:p-8"
                  >
                    <span className="inscription text-[0.58rem] text-ink2">{dir}</span>
                    <span
                      className="display mt-3 block text-2xl text-ink transition-colors duration-500 group-hover:text-gold"
                      style={lead}
                    >
                      {g.river[lang]}
                    </span>
                    <span className="mt-1.5 block text-sm text-ink2">
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
