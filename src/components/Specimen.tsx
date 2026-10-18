import { content } from "@/lib/content";
import { localePath, type Lang } from "@/lib/locales";
import { Phone } from "@/components/kit/Phone";

/* ---------------------------------------------------------------------------
   A Sankalp Patra, shown to somebody who has not paid.

   The sheet is drawn from today's figure by the /specimen route, and it sits
   inside the shared phone (kit/Phone), because that is where it lives: it is
   sent into a family group and opened on one. The phone's content box is the
   sheet's own ratio, nine by sixteen, under a status bar that holds the
   island, so the sheet's top line is never covered.
   --------------------------------------------------------------------------- */

export function Specimen({
  lang,
  className = "",
  caption = true,
  phoneClassName = "max-w-[280px]",
}: {
  lang: Lang;
  className?: string;
  /** The line under the phone. Off where the surrounding copy says it. */
  caption?: boolean;
  /** The phone's width cap; the landing's desktop section shows it larger. */
  phoneClassName?: string;
}) {
  const t = content[lang].specimen;
  const src = localePath(lang, "/specimen");

  return (
    <figure className={`pull ${className}`}>
      <Phone className={phoneClassName} screenClassName="bg-[#faf6ea] text-[#141210]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={t.alt}
          width={1080}
          height={1920}
          loading="lazy"
          className="absolute inset-0 block h-full w-full"
        />
      </Phone>
      {caption && (
        <figcaption className="mt-4 text-center text-sm leading-[1.6] text-ink2">
          <span className="label mr-2 text-sindoor">{t.label}</span>
          {t.caption}
        </figcaption>
      )}
    </figure>
  );
}
