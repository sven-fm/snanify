import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/i18n";
import { Mark } from "@/components/Logo";
import { LinkButton } from "@/components/ui";
import { WaterBand } from "@/components/WaterBand";

export function NotFoundPage({ lang }: { lang: Lang }) {
  const t = content[lang].notFound;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <main className="relative grid min-h-screen place-items-center overflow-hidden px-5">
                <div className="relative max-w-md text-center">
          <Mark className="mx-auto h-16 w-16 text-ink" />
          <p className="mt-10 text-sm text-ink2">{t.code}</p>
          <h1 className="display mt-4 text-4xl leading-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-5 text-sm leading-relaxed text-ink2">{t.lede}</p>
          <WaterBand seed="404" className="mx-auto mt-6 h-12 w-full max-w-xs" />
          <LinkButton href={localePath(lang, "/")} className="mt-9">
            {t.cta}
          </LinkButton>
        </div>
      </main>
    </>
  );
}
