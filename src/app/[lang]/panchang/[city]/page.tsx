import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPanchang } from "@/components/pages/CityPanchang";
import { StructuredData, breadcrumbList, organization, webPage, website } from "@/components/StructuredData";
import { CITY_SLUGS, cityBySlug } from "@/content/cities";
import { cityTitle, panchangCityContent } from "@/content/panchang-city";
import { cityDay } from "@/lib/city-day";
import { LANGS, type Lang } from "@/lib/locales";
import { navLabel } from "@/lib/nav";
import { pageMetadata } from "@/lib/seo";

/* One city's morning. Prerendered for every city and refreshed every half
   hour, so the tithi and the day roll over without a deploy. */

export const revalidate = 1800;
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => CITY_SLUGS.map((city) => ({ lang, city })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang; city: string }> }): Promise<Metadata> {
  const { lang, city: slug } = await params;
  const city = cityBySlug(slug);
  if (!city) return {};
  const t = panchangCityContent[lang].meta;
  const name = city.name[lang];
  return pageMetadata({
    lang,
    path: `/panchang/${slug}`,
    title: cityTitle(lang, name),
    description: t.description.replace("{city}", name),
    ogType: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: Lang; city: string }> }) {
  const { lang, city: slug } = await params;
  const city = cityBySlug(slug);
  if (!city) notFound();
  const day = cityDay(city);
  if (!day) notFound();
  const t = panchangCityContent[lang].meta;
  const name = city.name[lang];
  const path = `/panchang/${slug}`;
  return (
    <>
      <StructuredData
        graph={[
          organization(lang),
          website(),
          webPage({
            lang,
            path,
            name: cityTitle(lang, name),
            description: t.description.replace("{city}", name),
            breadcrumb: breadcrumbList(lang, [
              { name: "Snanify", path: "/" },
              { name: navLabel(lang, "panchang"), path: "/panchang" },
              { name, path },
            ]),
          }),
        ]}
      />
      <CityPanchang lang={lang} city={city} day={day} />
    </>
  );
}
