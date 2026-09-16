import { content } from "@/lib/content";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   A Sankalp Patra, shown to somebody who has not paid.

   The sheet is drawn from today's figure by /api/specimen, and it sits inside
   the outline of a phone, because that is where it lives: it is sent into a
   family group and opened on one. The outline is the one rounded shape on the
   site, drawn as SVG so the base layer's square corners do not apply; a
   phone with square corners reads as a television.
   --------------------------------------------------------------------------- */

export function Specimen({
  lang,
  className = "",
  caption = true,
}: {
  lang: Lang;
  className?: string;
  /** The line under the phone. Off where the surrounding copy says it. */
  caption?: boolean;
}) {
  const t = content[lang].specimen;
  const src = `/api/specimen?lang=${lang}`;

  return (
    <figure className={`pull ${className}`}>
      <div className="relative mx-auto aspect-[9/19] w-full max-w-[280px]">
        {/* The phone. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 90 190"
          className="absolute inset-0 h-full w-full text-ink"
          fill="none"
        >
          <rect x="1" y="1" width="88" height="188" rx="11" stroke="currentColor" strokeWidth="1.5" />
          <rect x="28" y="4.5" width="34" height="5" rx="2.5" fill="currentColor" />
        </svg>
        {/* The sheet, inside the bezel. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={t.alt}
          width={1080}
          height={1920}
          loading="lazy"
          className="absolute inset-x-[4.5%] top-[6%] bottom-[2.5%] h-[91.5%] w-[91%] object-cover object-top"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-center text-sm leading-[1.6] text-ink2">
          <span className="label mr-2 text-spot">{t.label}</span>
          {t.caption}
        </figcaption>
      )}
    </figure>
  );
}
