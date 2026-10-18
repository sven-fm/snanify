import type { Metadata } from "next";
import { headers } from "next/headers";
import { distanceKm } from "@/lib/distance";
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
import { morningsContent } from "@/content/mornings";
import { LANGS, localePath, type Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import Link from "next/link";
import { LinkButton, buttonClass } from "@/components/ui";
import { Sitting } from "@/components/snan/Sitting";
import { flowContent } from "@/content/flow";

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
  return LANGS.map((lang) => ({ lang }));
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
  searchParams: Promise<{ fast?: string }>;
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

  const ghat = getGhat(profile.waterSlug);

  /* `/begin?out=1` opens the pack picker on a line for somebody whose
     mornings are complete, rather than on the first-visit pitch. */
  const outHref = `${localePath(lang, "/begin")}?out=1`;

  if (kept) {
    const out = credits < 1;
    const pic = PICTURES[profile.waterSlug as WaterSlug];
    return (
      <>
        <div className="grain" aria-hidden="true" />
        <Header lang={lang} currentPath={ROUTE} />
        <main className="mx-auto max-w-md px-5 py-8 sm:py-14">
          <div className="plate relative aspect-[3/2] overflow-hidden">
            <div
              role="img"
              aria-label={pic.alt[lang]}
              className="ink-picture absolute inset-0"
              style={{ ["--picture" as string]: `url(${pic.src})` }}
            />
          </div>
          <h1
            className={`display mt-8 text-[2.35rem] ${lang === "hi" ? "" : "uppercase"}`}
            style={{ fontWeight: 800, lineHeight: lang === "hi" ? 1.22 : 0.95, letterSpacing: lang === "hi" ? 0 : "-0.01em" }}
          >
            {t.already.title}
          </h1>
          <p className="mt-4 text-[1.05rem] leading-[1.6] text-ink2">{t.already.body}</p>
          <LinkButton href={localePath(lang, `/p/${kept.id}?new=1`)} variant="share" arrow className="mt-6 w-full">
            {t.already.share}
          </LinkButton>
          <p className="mt-4">
            <Link href={localePath(lang, `/p/${kept.id}`)} className={buttonClass("quiet")}>
              {t.already.cta}
            </Link>
          </p>
          {out ? (
            <p className="mt-8 text-[1.02rem] leading-[1.6] text-ink">
              {t.already.out}{" "}
              <Link href={outHref} className={buttonClass("quiet")}>
                {morningsContent[lang].more}
              </Link>
            </p>
          ) : (
            <p className="mt-8 text-sm text-ink2">{t.already.tomorrow}</p>
          )}
        </main>
        <Footer lang={lang} />
      </>
    );
  }

  if (credits < 1) redirect(outHref);

  const snapshot = await getLiveSnapshot();
  const water = snapshot.waters.find((w) => w.slug === profile.waterSlug);
  if (!water) throw new Error(`no live state for ${profile.waterSlug}`);

  const d = water.discharge;
  const km = distanceKm(await headers(), water.gauge.ghat);

  /* The gauge leads and the figure proves it (src/content/flow.ts), the
     same words the landing prints. A quiet feed draws no dot and says it
     stands on the season's usual level. */
  const words = flowContent[lang];
  const flow = `${NUMBER.format(d.cumecs)} m³/s`;
  const modelled = d.kind === "modelled";

  const reading = {
    water: ghat ? waterName(ghat, "river", lang) : profile.waterSlug,
    ghat: ghat ? waterName(ghat, "ghat", lang) : "",
    city: ghat ? waterName(ghat, "city", lang) : "",
    percentile: modelled ? d.percentile.value : null,
    band: modelled ? d.percentile.band : null,
    figure: modelled
      ? words.proof.replace("{flow}", flow).replace("{n}", ordinal(Math.round(d.percentile.value), lang))
      : `${flow}, ${words.stateMedian}`,
    distance: km === null ? null : t.reading.distance.replace("{km}", NUMBER.format(km)),
  };

  const names = (profile.names as { name: string }[]).map((n) => n.name);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={ROUTE} />

      <main>
        <Sitting
          lang={lang}
          t={t}
          reading={reading}
          sankalp={profile.sankalpText}
          names={names}
          waterSlug={profile.waterSlug}
          outHref={outHref}
          leaveHref={localePath(lang, "/account")}
          /* Never outside development: a fast sitting is a testing affordance,
             not a way to hurry the practice. */
          speed={process.env.NODE_ENV === "production" ? 1 : query.fast === "1" ? 30 : 1}
        />
      </main>

      <Footer lang={lang} />
    </>
  );
}
