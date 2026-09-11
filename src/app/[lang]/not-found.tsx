import { lang as rootLang } from "next/root-params";
import { NotFoundPage } from "@/components/NotFoundPage";
import { DEFAULT_LANG, parseLang } from "@/lib/locales";

/* A not-found page gets no `params`, but the locale is a root parameter and
   `next/root-params` hands it over without touching request headers, which
   would have made every route under [lang] dynamic. A Hindi URL gets a Hindi
   404, and the marketing pages stay prerendered. */
export default async function NotFound() {
  const lang = parseLang((await rootLang()) ?? "") ?? DEFAULT_LANG;
  return <NotFoundPage lang={lang} />;
}
