import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { accountContent } from "@/content/account";
import { FULL_LANGS, localePath, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

/* The sign-in screen sits inside the site rather than on a page of its own,
   because it is the first thing somebody sees after deciding to pay and a bare
   Clerk card on a white page reads as a different company. */
const ROUTE = "/sign-in";


export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang, "sign-in": [] as string[] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = accountContent[lang].signIn;

  return {
    ...(await pageMetadata({ lang, path: ROUTE, title: t.meta, description: t.lede })),
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = accountContent[lang].signIn;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={ROUTE} />

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-md">
          <h1 className="display text-[2rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
          <div className="rule-double mt-6" />
          <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink2">{t.lede}</p>

          <div className="mt-9 flex justify-center">
            <SignIn
              routing="path"
              path={localePath(lang, ROUTE)}
              signUpUrl={localePath(lang, "/sign-up")}
              fallbackRedirectUrl={localePath(lang, "/begin")}
            />
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}
