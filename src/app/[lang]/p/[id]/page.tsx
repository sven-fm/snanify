import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, sittings } from "@/db";
import { patraPageContent } from "@/content/patra-page";
import { currentUser } from "@/lib/auth";
import { isId } from "@/lib/ids";
import { patraView } from "@/lib/patra-view";
import { seedLine } from "@/lib/seed";
import type { RiverSlice } from "@/lib/patra-record";
import { localePath, SITE_ORIGIN, type FullLang as Lang } from "@/lib/locales";
import { headers } from "next/headers";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow, LinkButton } from "@/components/ui";
import { ShareButton } from "@/components/patra/ShareButton";

/* ---------------------------------------------------------------------------
   /p/[id], the sheet somebody was sent.

   Public by default, because the link is the product's whole distribution. The
   identifier is twenty-two characters of base58, so the link is the capability
   and nothing needs a sign-in.

   THE OWNER SEES ONE THING MORE: their own sankalp. It is on the row and it is
   selected only here, only for them. Everything a stranger can reach is built
   from `patraView`, a type that has never held it.
   --------------------------------------------------------------------------- */

export const dynamic = "force-dynamic";

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

async function load(id: string) {
  if (!isId(id)) return null;
  const rows = await db.select().from(sittings).where(eq(sittings.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const sitting = await load(id);
  if (!sitting || !sitting.isPublic) return { robots: { index: false, follow: false } };

  const view = patraView(sitting);
  const t = patraPageContent[lang];
  const values = {
    name: view.names[0] ?? "",
    water: view.water,
    ghat: view.ghat,
    city: view.city,
    date: view.keptDate,
  };

  return {
    title: fill(t.metaTitle, values),
    description: fill(t.metaDescription, values),
    /* Not indexed. These are somebody's mornings with their family's names on
       them; they are made to be sent, not to be found in a search result. */
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang; id: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  const [{ lang, id }, query] = await Promise.all([params, searchParams]);

  const sitting = await load(id);
  if (!sitting) notFound();

  const t = patraPageContent[lang];
  const view = patraView(sitting);

  const viewer = await currentUser(lang);
  const isOwner = viewer?.id === sitting.userId;

  if (!sitting.isPublic && !isOwner) {
    return (
      <>
        <div className="grain" aria-hidden="true" />
        <Header lang={lang} currentPath="/" />
        <main className="mx-auto max-w-md px-5 py-24 text-center">
          <h1 className="display text-[2rem]">{t.privateTitle}</h1>
          <p className="mt-5 text-ink2">{t.privateBody}</p>
        </main>
        <Footer lang={lang} />
      </>
    );
  }

  /* The absolute origin, so a share carries a link that works from a phone
     that is not this one. Taken from the request in development, where the
     site is on localhost and the canonical origin would send the reader to
     production. */
  const head = await headers();
  const host = head.get("x-forwarded-host") ?? head.get("host");
  const origin =
    host && (host.startsWith("localhost") || host.startsWith("127."))
      ? `http://${host}`
      : SITE_ORIGIN;
  const pageUrl = `${origin}${localePath(lang, `/p/${view.id}`)}`;
  const imageUrl = `${origin}${localePath(lang, `/p/${view.id}/image`)}`;

  const river = sitting.river as RiverSlice;
  const line = seedLine({
    sittingId: view.id,
    waterSlug: sitting.waterSlug,
    modelledFor: river.modelledFor ?? sitting.keptOn,
    discharge: river.cumecs,
  });

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/" />

      <main className="mx-auto max-w-xl px-5 py-8 pb-16 sm:px-8 sm:py-14">
        <Eyebrow>{t.eyebrow}</Eyebrow>

        {/* The sheet itself, at the ratio it is sent in. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={localePath(lang, `/p/${view.id}/image`)}
          alt={`${view.names.join(", ")} · ${view.water} · ${view.keptDate}`}
          width={1080}
          height={1350}
          className="mt-5 w-full border-2 border-rulestrong"
        />

        <div className="mt-6">
          <ShareButton
            url={pageUrl}
            imageUrl={imageUrl}
            text={fill(t.shareText, {
              name: view.names[0] ?? "",
              water: view.water,
              date: view.keptDate,
            })}
            label={t.share}
            copiedLabel={t.shareCopied}
            auto={query.new === "1"}
          />
        </div>

        {isOwner && sitting.sankalpText && (
          <section className="mt-12 border-t-2 border-rulestrong pt-6">
            <h2 className="label text-spot">{t.yours}</h2>
            <p className="display mt-4 text-[1.5rem] leading-[1.45]">{sitting.sankalpText}</p>
            <p className="mt-4 text-sm text-ink2">{t.privateNote}</p>
          </section>
        )}

        {/* The register, as text, so it can be read, searched and copied. */}
        <section className="mt-12">
          <h2 className="label border-b-2 border-rulestrong pb-3 text-ink">
            {t.registerHeading}
          </h2>
          <dl className="mt-1">
            <Row k={t.kept} v={`${view.keptTime} ${view.keptZone} · ${view.keptIst} IST`} />
            <Row k={t.flow} v={view.flow} />
            {view.rank && <Row k={t.ranked} v={`${view.rank}th percentile since 1997`} />}
            <Row k={t.tithi} v={view.tithi} />
            <Row k={t.nakshatra} v={`${view.nakshatra} · ${view.moon}`} />
            <Row
              k={t.source}
              v={
                view.figureKind === "modelled"
                  ? `${view.source}, modelled for ${view.modelledFor}`
                  : `${view.source}, seasonal median 1997 to 2025`
              }
            />
          </dl>
        </section>

        <section className="mt-12 border-t border-rule pt-6">
          <h2 className="label text-spot">{t.seedHeading}</h2>
          <p className="mt-4 text-[0.98rem] leading-[1.7] text-ink2">{t.seedBody}</p>
          <pre className="mt-4 overflow-x-auto border border-rule bg-tint p-4 text-[0.8rem] text-ink">
            {line}
          </pre>
          <p className="mt-3 text-sm text-ink2">
            {t.seedLabel}: <span className="break-all text-ink">{view.seed}</span>
          </p>
        </section>

        <section className="mt-14 border-t-2 border-rulestrong pt-8 text-center">
          <h2 className="display text-[1.7rem] leading-[1.25]">{t.visitTitle}</h2>
          <p className="mt-4 text-ink2">{t.visitBody}</p>
          <div className="mt-6">
            <LinkButton href={localePath(lang, "/begin")}>{t.visitCta}</LinkButton>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
      <dt className="label text-ink2">{k}</dt>
      <dd className="text-right text-[0.98rem] text-ink">{v}</dd>
    </div>
  );
}
