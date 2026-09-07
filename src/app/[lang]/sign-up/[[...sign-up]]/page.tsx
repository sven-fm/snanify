import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow } from "@/components/ui";
import { accountContent } from "@/content/account";
import { FULL_LANGS, localePath, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

/* The sign-up screen sits inside the site rather than on a page of its own,
   because it is the first thing somebody sees after deciding to pay and a bare
   Clerk card on a white page reads as a different company.

   `path` must be this route. Clerk mounts its own steps underneath it, and
   when the two disagree the widget renders nothing at all, silently. */
const ROUTE = "/sign-up";

/* The layout sets `dynamicParams = false`, which is right for the marketing
   tree: an unknown locale should 404 rather than render an empty shell. Clerk
   routes its own steps (a verification code, a factor choice) under this
   catch-all, and those cannot be enumerated at build time, so this subtree
   opts back in. */
export const dynamicParams = true;

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang, "sign-up": [] as string[] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = accountContent[lang].signUp;

  return {
    ...(await pageMetadata({ lang, path: ROUTE, title: t.meta, description: t.lede })),
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = accountContent[lang].signUp;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={ROUTE} />

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-md">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="display mt-4 text-[2rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
          <div className="rule-double mt-6" />
          <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink2">{t.lede}</p>

          <div className="mt-9 flex justify-center">
            <SignUp
              routing="path"
              path={localePath(lang, ROUTE)}
              signInUrl={localePath(lang, "/sign-in")}
              fallbackRedirectUrl={localePath(lang, "/begin")}
            />
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}
