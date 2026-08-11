import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RiverDetail } from "@/components/pages/RiverDetail";
import {
  StructuredData,
  bodyOfWater,
  breadcrumbList,
  ghatPlace,
  organization,
  publicUrl,
  webPage,
  website,
} from "@/components/StructuredData";
import { getGhat, RIVERS } from "@/content/rivers";
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. `Lang` here is
   therefore the full-depth pair and not the twelve locales the site serves, and
   `FULL_LANGS` is what narrows the prerender set away from the layout default. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { otherLang } from "@/lib/i18n";
import { navLabel } from "@/lib/nav";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

/** Every (lang, river) combination, six waters × two locales. */
export function generateStaticParams() {
  return FULL_LANGS.flatMap((lang) => RIVERS.map((r) => ({ lang, river: r.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; river: string }>;
}): Promise<Metadata> {
  const { lang, river } = await params;
  const ghat = getGhat(river);
  if (!ghat) return {};

  /* The canonical, the hreflang set and the OG locales are all derived from
     this route by pageMetadata; nothing here writes a "/hi" by hand. */
  const route = `/rivers/${ghat.slug}`;

  /* Titles are noun lists rather than sentences, so neither locale ends up
     with a grammatically wrong interpolation. */
  const title =
    lang === "hi"
      ? `${ghat.river.hi} · ${ghat.ghat.hi}, ${ghat.city.hi} | स्नानिफ़ाई`
      : `${ghat.river.en} at ${ghat.ghat.en}, ${ghat.city.en} | Snanify`;

  const description = `${ghat.epithet[lang]}, ${ghat.standfirst[lang]}`;

  return pageMetadata({ lang, path: route, title, description, ogType: "article" });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang; river: string }>;
}) {
  const { lang, river } = await params;
  const ghat = getGhat(river);
  if (!ghat) notFound();

  const route = `/rivers/${ghat.slug}`;
  const alt = otherLang(lang);

  /* Two entities on this page: the water, and the place on it where a rite
     would be performed. The ghat is the main entity, the river is what the
     page is about. Neither node carries coordinates, because none of the six
     has been surveyed, and neither carries anything about permission, because
     we hold none. */
  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: route,
      name: `${ghat.river[lang]}, ${ghat.ghat[lang]}, ${ghat.city[lang]}`,
      description: `${ghat.epithet[lang]}, ${ghat.standfirst[lang]}`,
      mainEntity: { "@id": `${publicUrl(lang, route)}#place` },
      about: { "@id": `${publicUrl(lang, route)}#river` },
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: navLabel(lang, "rivers"), path: "/rivers" },
        { name: `${ghat.river[lang]}, ${ghat.ghat[lang]}`, path: route },
      ]),
    }),
    ghatPlace({
      lang,
      path: route,
      name: ghat.ghat[lang],
      alternateName: ghat.ghat[alt],
      description: `${ghat.epithet[lang]}, ${ghat.standfirst[lang]}`,
      note: ghat.caution?.[lang],
      locality: ghat.city[lang],
      region: ghat.state[lang],
    }),
    /* Only the river's name in the other locale goes in as an alternate name.
       `riverAlso` is written as prose ("Gautami, in her own invocation") and
       reads as a sentence rather than a name, so it stays on the page where a
       person reads it and out of a field a machine reads as a name. */
    bodyOfWater(lang, route, ghat.river[lang], [ghat.river[alt]]),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <RiverDetail lang={lang} ghat={ghat} />
    </>
  );
}
