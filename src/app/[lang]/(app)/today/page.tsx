import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { todayContent } from "@/content/today";
import { getGhat } from "@/content/rivers";
import { PICTURES } from "@/content/live/pictures";
import type { WaterSlug } from "@/lib/riverdata";
import { waterName } from "@/content/names";
import { balance } from "@/lib/credits";
import { requireUser } from "@/lib/auth";
import { getLiveSnapshot } from "@/lib/riverdata";
import { ordinal } from "@/lib/ordinal";
import { sittingToday } from "@/lib/sitting";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FULL_LANGS, localePath, type FullLang as Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LinkButton } from "@/components/ui";
import { Sitting } from "@/components/snan/Sitting";
import { TrackView } from "@/components/site/TrackView";

/* ---------------------------------------------------------------------------
   /today, the morning itself.

   Three gates, in the order that gives the most useful answer: signed in, has
   a morning to spend, has decided what goes on the sheet. Somebody who kept a
   morning already is shown it rather than being allowed to keep a second.

   The live reading is fetched here, on the server, and handed down. The
   sitting never fetches: a screen that can fail to load a number halfway
   through a practice is a screen that interrupts it.
   --------------------------------------------------------------------------- */

const ROUTE = "/today";

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
  return {
    title: todayContent[lang].meta.title,
    description: todayContent[lang].meta.description,
    robots: { index: false, follow: false },
  };
}

const NUMBER = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ fast?: string; bought?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const t = todayContent[lang];

  /* The query survives the sign-in round trip. `requireUser` sends people to
     Clerk and back, and a redirect target of just "/today" would drop whatever
     they arrived with. */
  const back = query.fast === "1" ? `${ROUTE}?fast=1` : ROUTE;
  const user = await requireUser(lang, back);

  const [credits, profileRows] = await Promise.all([
    balance(db, user.id),
    db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1),
  ]);

  const profile = profileRows[0];
  if (!profile?.completedAt) redirect(localePath(lang, "/setup"));

  /* A morning already kept today is answered before the balance is looked
     at. The first production sitting spent its owner's last credit, the page
     was re-requested during the mark, and the balance gate sent them to the
     pack picker instead of to the sheet they had just made. */
  const kept = await sittingToday(user.id, profile.waterSlug, user.tz);

  const pic = PICTURES[profile.waterSlug as WaterSlug];
  const picture = { src: pic.src, alt: pic.alt[lang] };
  const ghat = getGhat(profile.waterSlug);

  if (kept) {
    return (
      <>
        <div className="grain" aria-hidden="true" />
        <Header lang={lang} currentPath={ROUTE} />
        <main className="mx-auto max-w-md px-5 py-8 sm:py-14">
          <div className="boxed relative aspect-[3/2] overflow-hidden bg-paper2">
            <div
              role="img"
              aria-label={picture.alt}
              className="ink-picture absolute inset-0"
              style={{ ["--picture" as string]: `url(${picture.src})` }}
            />
          </div>
          <h1 className="display mt-8 text-center text-[2rem] leading-[1.2]">{t.already.title}</h1>
          <p className="mt-4 text-center text-[1.05rem] leading-[1.7] text-ink2">{t.already.body}</p>
          <div className="mt-8 flex flex-col gap-3">
            <LinkButton href={localePath(lang, `/p/${kept.id}?new=1`)}>{t.already.share}</LinkButton>
            <LinkButton href={localePath(lang, `/p/${kept.id}`)} variant="ghost">
              {t.already.cta}
            </LinkButton>
          </div>
          <p className="mt-8 text-center text-sm text-ink2">{t.already.tomorrow}</p>
        </main>
        <Footer lang={lang} />
      </>
    );
  }

  if (credits < 1) redirect(localePath(lang, "/begin"));

  const snapshot = await getLiveSnapshot();
  const water = snapshot.waters.find((w) => w.slug === profile.waterSlug);
  if (!water) throw new Error(`no live state for ${profile.waterSlug}`);

  const d = water.discharge;

  const reading = {
    water: ghat ? waterName(ghat, "river", lang) : profile.waterSlug,
    ghat: ghat ? waterName(ghat, "ghat", lang) : "",
    city: ghat ? waterName(ghat, "city", lang) : "",
    flow: `${NUMBER.format(d.cumecs)} m³/s`,
    rank:
      d.kind === "modelled"
        ? t.reading.percentile.replace("{n}", ordinal(Math.round(d.percentile.value), lang))
        : null,
    normal: `${NUMBER.format(d.normal.median)} m³/s`,
  };

  const names = (profile.names as { name: string }[]).map((n) => n.name);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {query.bought === "1" && <TrackView event="purchase" props={{ lang }} />}
      <Header lang={lang} currentPath={ROUTE} />

      <main className="pb-16">
        <Sitting
          lang={lang}
          t={t}
          reading={reading}
          sankalp={profile.sankalpText}
          names={names}
          waterSlug={profile.waterSlug}
          picture={picture}
          /* Never outside development: a fast sitting is a testing affordance,
             not a way to hurry the practice. */
          speed={process.env.NODE_ENV === "production" ? 1 : query.fast === "1" ? 30 : 1}
        />
      </main>

      <div className="mx-auto max-w-md px-5 pb-10 text-center">
        <Link
          href={localePath(lang, "/account")}
          className="text-sm text-ink2 underline decoration-rule underline-offset-4"
        >
          {credits === 1 ? t.leftOne : t.left.replace("{n}", String(credits))}
        </Link>
      </div>

      <Footer lang={lang} />
    </>
  );
}
