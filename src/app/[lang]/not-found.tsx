import { headers } from "next/headers";
import { NotFoundPage } from "@/components/NotFoundPage";
import { DEFAULT_LANG, LANG_HEADER, LANGS, type Lang } from "@/lib/locales";

/* A not-found page cannot read route params, so the proxy stamps the locale
   on the request instead and this reads it back. A Hindi URL gets a Hindi 404. */
export default async function NotFound() {
  const got = (await headers()).get(LANG_HEADER);
  const lang = (LANGS as readonly string[]).includes(got ?? "") ? (got as Lang) : DEFAULT_LANG;
  return <NotFoundPage lang={lang} />;
}
