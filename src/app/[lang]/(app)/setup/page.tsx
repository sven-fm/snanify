import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db, profiles } from "@/db";
import { setupContent } from "@/content/setup";
import { PRAYERS } from "@/content/prayers";
import { GHATS } from "@/content/muhurat";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { requireUser } from "@/lib/auth";
import { blobUrl } from "@/lib/blob";
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/ui";
import { SetupForm } from "@/components/setup/SetupForm";
import { TrackView } from "@/components/site/TrackView";

/* Filled in once, behind a sign-in, so it renders per request with whatever
   the person already chose. */
const ROUTE = "/setup";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = setupContent[lang].meta;

  return {
    ...(await pageMetadata({ lang, path: ROUTE, title: t.title, description: t.description })),
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ bought?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const t = setupContent[lang];

  const user = await requireUser(lang, ROUTE);

  const existing = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);

  const profile = existing[0];

  const waters = GHATS.map((g) => {
    const ghat = getGhat(g.id);
    return {
      slug: g.id,
      river: ghat ? waterName(ghat, "river", lang) : g.id,
      ghat: ghat ? waterName(ghat, "ghat", lang) : "",
      city: ghat ? waterName(ghat, "city", lang) : "",
    };
  });

  /* The verse itself is not sent to the browser: the picker shows its name and
     its first line, and the sheet is where the whole thing is set. */
  const prayers = PRAYERS.map((p) => ({
    id: p.id,
    title: p.title[lang],
    line: p.devanagari[0],
    waters: p.waters === "all" ? ("all" as const) : [...p.waters],
  }));

  const names = (profile?.names as { name: string }[] | undefined)?.map((n) => n.name) ?? [
    user.displayName ?? "",
  ];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {query.bought === "1" && <TrackView event="purchase" props={{ lang }} />}
      <Header lang={lang} currentPath={ROUTE} personalised />

      <main className="mx-auto max-w-2xl px-5 py-10 pb-16 sm:px-8 sm:py-16">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="display mt-4 text-[2.1rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
        <div className="rule-double mt-6" />
        <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink2">{t.lede}</p>

        <SetupForm
          lang={lang}
          t={t}
          waters={waters}
          prayers={prayers}
          initial={{
            waterSlug: profile?.waterSlug ?? waters[0].slug,
            names,
            prayerId: profile?.prayerId ?? "",
            sankalpText: profile?.sankalpText ?? "",
            reminderHour: user.reminderHour,
            portraitUrl: profile?.portraitKey ? blobUrl(profile.portraitKey) : null,
          }}
        />
      </main>

      <Footer lang={lang} />
    </>
  );
}
