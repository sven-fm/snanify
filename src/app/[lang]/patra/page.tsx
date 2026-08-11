import type { Metadata } from "next";
import { ChihnaExplainer } from "@/components/pages/PatraExplainer";
import {
  StructuredData,
  breadcrumbList,
  organization,
  organizationRef,
  publicUrl,
  webPage,
  website,
} from "@/components/StructuredData";
import { chihnaContent } from "@/content/patra";
/* This route exists in English and Hindi only, because the deep content behind
   it does; see the tier note at the top of src/lib/locales.ts. `Lang` here is
   therefore the full-depth pair and not the twelve locales the site serves, and
   `FULL_LANGS` is what narrows the prerender set away from the layout default. */
import { FULL_LANGS, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

/* Public URL shape: English unprefixed, Hindi under /hi. Built through
   localePath so a route rename cannot strand one locale.

   The route keeps the /patra path because it is indexed and linked, but the
   artefact it describes is the Jal Chihna. The Sankalp Patra was a certificate
   of a rite a person performed, and no rite is performed, so the name went
   with the product. The crumb and the JSON-LD therefore name the artefact
   directly rather than borrowing the retired label from the nav table. */
const ROUTE = "/patra";

const CHIHNA_NAME = { en: "Jal Chihna", hi: "जल चिह्न" } as const;
const CHIHNA_ALT = { en: "जल चिह्न", hi: "Jal Chihna" } as const;

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = chihnaContent[lang].meta;

  return pageMetadata({
    lang,
    path: ROUTE,
    title: t.title,
    description: t.description,
    ogType: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = chihnaContent[lang];

  /* The page is about a document type, so the document is described as a
     CreativeWork and the page is `about` it. Nothing here says any chihna has
     been issued, because none has: no dateCreated, no identifier, no example. */
  const graph = [
    organization(lang),
    website(),
    webPage({
      lang,
      path: ROUTE,
      name: t.hero.title,
      description: t.meta.description,
      about: {
        "@type": "CreativeWork",
        "@id": `${publicUrl(lang, ROUTE)}#jal-chihna`,
        name: CHIHNA_NAME[lang],
        alternateName: CHIHNA_ALT[lang],
        description: t.meta.description,
        inLanguage: lang,
        publisher: organizationRef(),
        creator: organizationRef(),
      },
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: CHIHNA_NAME[lang], path: ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <ChihnaExplainer lang={lang} />
    </>
  );
}
