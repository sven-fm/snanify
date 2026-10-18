import Link from "next/link";
import { localePath, type Lang } from "@/lib/locales";
import { CREDITS_PATH, IMAGE_CREDITS } from "@/content/live/pictures";

/**
 * "Image credits", under any ghat picture: the way to its credit at the end
 * of /terms. The CC licences on the six photographs ask for the credit where
 * the work is used or on a page the reader can reach from it; this link is
 * that reach. Put it under every surface that prints a ghat picture: the
 * river page, /today, the Patra on /p/[id] and the specimen.
 */
export function CreditsLink({ lang, className = "" }: { lang: Lang; className?: string }) {
  return (
    <Link
      href={localePath(lang, CREDITS_PATH)}
      className={`inline-flex min-h-[44px] items-center text-xs text-ink2 underline decoration-rule underline-offset-4 active:text-sindoor ${className}`}
    >
      {IMAGE_CREDITS[lang]}
    </Link>
  );
}
