import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, sittings } from "@/db";
import { patraPageContent } from "@/content/patra-page";
import { currentUser } from "@/lib/auth";
import { isId } from "@/lib/ids";
import { patraView, printableRecord } from "@/lib/patra-view";
import { localePath, SITE_ORIGIN, type FullLang as Lang } from "@/lib/locales";
import { headers } from "next/headers";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PatraGuest } from "@/components/patra/PatraGuest";
import { PatraOwner } from "@/components/patra/PatraOwner";

/* ---------------------------------------------------------------------------
   /p/[id], the sheet somebody was sent.

   Public by default, because the link is the product's whole distribution. The
   identifier is twenty-two characters of base58, so the link is the capability
   and nothing needs a sign-in.

   TWO PAGES, NOT ONE PAGE WITH CONDITIONS. The owner gets the sheet, the send
   button, their own sankalp and the controls; the person it was sent to gets
   the sheet, one line and the invitation. Everything a stranger can reach is
   built from `patraView`, a type that has never held the sankalp.
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

  const view = patraView(sitting, lang);
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
  const view = patraView(sitting, lang);

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
  const imageSrc = localePath(lang, `/p/${view.id}/image`);
  const alt = `${view.names.join(", ")}, ${view.water}, ${view.keptDate}`;
  const line = fill(t.shareText, {
    name: view.names[0] ?? "",
    water: view.water,
    date: view.keptDate,
  });

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/" />

      {isOwner ? (
        <PatraOwner
          lang={lang}
          t={t}
          id={view.id}
          imageSrc={imageSrc}
          alt={alt}
          pageUrl={pageUrl}
          imageUrl={imageUrl}
          shareText={line}
          waterSlug={sitting.waterSlug}
          sankalp={sitting.sankalpText}
          isPublic={sitting.isPublic}
          printable={printableRecord(sitting)}
          auto={query.new === "1"}
        />
      ) : (
        <PatraGuest lang={lang} t={t} imageSrc={imageSrc} alt={alt} line={line} />
      )}

      <Footer lang={lang} />
    </>
  );
}
