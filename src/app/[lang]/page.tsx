import { ordinal } from "@/lib/ordinal";
import { Landing, type LiveCard } from "@/components/Landing";
import { notFound } from "next/navigation";
import { content, type Lang } from "@/lib/content";
import { parseLang } from "@/lib/locales";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { getLiveSnapshot, REVALIDATE_SECONDS, type WaterState } from "@/lib/riverdata";
import { liveContent } from "@/content/live";

/* ---------------------------------------------------------------------------
   The landing page, with a real river on it.

   THE CARD USED TO BE FOUR HARDCODED STRINGS under a heading reading "The
   river, now": a flow, a percentile and an hour, none of them true. That is
   the one thing this repo forbids outright, and it was the first thing most
   visitors read. The figures come from the same snapshot /live uses now.

   STILL PRERENDERED. The page is regenerated on a schedule rather than
   rendered per request, so it is served as static HTML from the edge and
   costs nothing to open, which is the whole reason the marketing surface was
   pulled back out of dynamic rendering. The flood model publishes once a day,
   so half an hour is already finer than the data.

   WHY THE CARD NOW SAYS "MODELLED FOR" AND NOT AN HOUR. The old copy read
   "read 06:00 IST", which implies an instrument taking a reading at six in the
   morning. There is no instrument. There is a model publishing one value per
   grid cell per day, and the card names that day.
   --------------------------------------------------------------------------- */

export const revalidate = 1800;

if (revalidate !== REVALIDATE_SECONDS) {
  throw new Error(
    `landing: revalidate is ${revalidate} but riverdata caches for ${REVALIDATE_SECONDS}`,
  );
}

const NUMBER = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** "04:24", a muhurat window's opening, in India Standard Time. */
function windowOpens(at: string): string {
  return at.slice(11, 16);
}

function buildCard(lang: Lang, water: WaterState): LiveCard {
  const t = content[lang].hero.card;
  const ghat = getGhat(water.slug);
  const river = ghat ? waterName(ghat, "river", lang) : water.slug;
  const city = ghat ? waterName(ghat, "city", lang) : "";
  const place = ghat ? waterName(ghat, "ghat", lang) : "";

  const d = water.discharge;
  /* The unit follows the locale and the numerals do not, which is the rule
     /live already renders under: a figure has to stay checkable against the
     model's own published value, so its digits are Latin in both editions. */
  const flow = `${NUMBER.format(d.cumecs)} ${liveContent[lang].flow.unit}`;

  const rows: { k: string; v: string }[] = [{ k: t.flow, v: flow }];

  if (d.kind === "modelled") {
    rows.push({
      k: t.ranked,
      v: t.percentile.replace("{n}", ordinal(Math.round(d.percentile.value), lang)),
    });
  } else {
    /* The feed was quiet, so the card stands on the seasonal median and says
       so rather than implying a reading nobody published. */
    rows.push({ k: t.ranked, v: t.median });
  }

  const next = water.next ?? water.current;
  if (next) rows.push({ k: t.muhurat, v: `${windowOpens(next.startsAt)} IST` });

  /* One plain sentence above the headline, in place of the boxed badge that
     used to join the same facts with middle dots. */
  const line = (d.kind === "modelled" ? t.lineModelled : t.lineMedian)
    .replace("{river}", river)
    .replace("{city}", city)
    .replace("{flow}", flow);

  return {
    line,
    title: place ? `${river}, ${place}` : river,
    rows,
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  /* The layout throws notFound() for a stray segment, but a page renders in
     parallel with its layout, so this one checks for itself before it reads
     any copy. */
  const lang = parseLang((await params).lang);
  if (!lang) notFound();

  const snapshot = await getLiveSnapshot();
  /* The Ganga at Har Ki Pauri is the water on the card, because it is the one
     a first visitor is likeliest to recognise. */
  const water =
    snapshot.waters.find((w) => w.slug === "ganga-haridwar") ?? snapshot.waters[0];

  return <Landing lang={lang} live={buildCard(lang, water)} />;
}
