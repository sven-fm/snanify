import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db, profiles } from "@/db";
import { setupContent } from "@/content/setup";
import { PRAYERS } from "@/content/prayers";
import { GHATS } from "@/content/muhurat";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { requireUser } from "@/lib/auth";
import { isTier } from "@/lib/packs";
import { carryQuery, initialWater, withQuery } from "@/lib/begin-path";
import { autosaveAllowed } from "@/lib/autosave";
import { blobUrl } from "@/lib/blob";
import { LANGS, type Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SetupForm } from "@/components/setup/SetupForm";
import { Steps } from "@/components/site/Steps";
import { TrackView } from "@/components/site/TrackView";

/* Filled in once, behind a sign-in, so it renders per request with whatever
   the person already chose. */
const ROUTE = "/setup";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
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
  searchParams: Promise<{ bought?: string; pack?: string; water?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const t = setupContent[lang];

  /* A pack or a water chosen before the sign-in comes back with it. */
  const carried = carryQuery(query);
  const user = await requireUser(lang, withQuery(ROUTE, carried));

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
      <Header lang={lang} currentPath={ROUTE} hideCta />

      {/* One column at max-w-md (spec 6.3): the step line, the headline in
          capitals, then the six fields. No lede, no band, no seal. */}
      <main className="mx-auto max-w-md px-5 pt-6 pb-16 sm:pt-10">
        {/* The three steps: this page is the water and the sheet. */}
        <Steps steps={t.steps} here={[0, 1]} label={t.title} className="mb-5" />

        <h1
          className={`display text-ink ${lang === "hi" ? "text-[2.1rem]" : "text-[2.2rem] uppercase min-[380px]:text-[2.35rem]"}`}
          style={{ fontWeight: 800, lineHeight: lang === "hi" ? 1.22 : 0.95, letterSpacing: lang === "hi" ? 0 : "-0.01em" }}
        >
          {t.title}
        </h1>

        <SetupForm
          lang={lang}
          pack={query.pack && isTier(query.pack) ? query.pack : undefined}
          t={t}
          waters={waters}
          prayers={prayers}
          /* A completed sheet saves each change; a first setup saves on the press. */
          autosave={autosaveAllowed(profile?.completedAt)}
          initial={{
            /* A water chosen on /rivers ("Do your snan here") is the first
               choice on a new sheet; a saved sheet keeps its own. */
            waterSlug: initialWater(profile?.waterSlug, carried.get("water"), waters[0].slug),
            names,
            prayerId: profile?.prayerId ?? "",
            sankalpText: profile?.sankalpText ?? "",
            /* Six, the first time. The row's default is five, which is the
               hour a printed panchang names and an hour later than most
               people in Toronto or Leicester will get up for. */
            reminderHour: profile ? user.reminderHour : 6,
            portraitUrl: profile?.portraitKey ? blobUrl(profile.portraitKey) : null,
          }}
        />
      </main>

      <Footer lang={lang} />
    </>
  );
}
