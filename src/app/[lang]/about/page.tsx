import type { Metadata } from "next";
import { About } from "@/components/pages/About";
import {
  StructuredData,
  breadcrumbList,
  organization,
  organizationRef,
  person,
  personId,
  webPage,
  website,
} from "@/components/StructuredData";
import { ABOUT_ROUTE, aboutContent, FOUNDERS } from "@/content/about";
import { langParams, type Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return langParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = aboutContent[lang];

  return pageMetadata({
    lang,
    path: ABOUT_ROUTE,
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = aboutContent[lang];

  /* The page is an AboutPage about the organisation, and the Organization node
     names its two founders here, where both are on the page, and nowhere else. */
  const people = t.founders.people.map((f) => {
    const facts = FOUNDERS[f.id];
    return person({
      id: f.id,
      name: facts.name,
      alternateName: f.name === facts.name ? undefined : f.name,
      jobTitle: facts.jobTitle,
      city: facts.city,
      description: f.bio.join(" "),
      sameAs: facts.profiles,
      image: facts.portrait,
    });
  });

  const graph = [
    { ...organization(lang), founder: t.founders.people.map((f) => ({ "@id": personId(f.id) })) },
    website(),
    ...people,
    webPage({
      lang,
      path: ABOUT_ROUTE,
      type: "AboutPage",
      name: t.title,
      description: t.meta.description,
      about: organizationRef(),
      mentions: t.founders.people.map((f) => ({ "@id": personId(f.id) })),
      breadcrumb: breadcrumbList(lang, [
        { name: "Snanify", path: "/" },
        { name: t.crumb, path: ABOUT_ROUTE },
      ]),
    }),
  ];

  return (
    <>
      <StructuredData graph={graph} />
      <About lang={lang} />
    </>
  );
}
