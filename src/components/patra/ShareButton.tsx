"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/ui";
import { track } from "@/lib/track";

/* ---------------------------------------------------------------------------
   Sending the sheet.

   THE FILE GOES WITH IT, NOT JUST THE LINK. A WhatsApp message carrying the
   image lands in the thread as the sheet; a message carrying a URL lands as a
   line of text with a small card under it, and the difference is most of why
   anybody shares this. So the image is fetched and handed to the share sheet
   as a File whenever the browser will take one.

   THREE FALLBACKS, IN ORDER, because the first is unavailable more often than
   it looks: file sharing needs a secure context, a user gesture and a browser
   that implements it. Text-and-link sharing is next, and copying the link is
   last. Every path ends with the person able to send the thing.

   IT OPENS ITSELF ONCE, on `?new=1`, straight after a morning. That is the
   one moment somebody is certain to want it, and asking them to find a button
   two seconds after a sixty-second silence is asking them to lose the impulse.
   `navigator.share` needs a gesture in most browsers, so this is attempted and
   allowed to fail quietly rather than promised.

   THE FILE IS FETCHED WHEN THE PRESS IS ABOUT TO BE USED, NEVER ON LOAD: when
   a pointer comes over it, a finger lands on it or it takes focus, and, where
   the page asks for it (`fetchInView`, the owner's sheet), when the press
   scrolls into view. /account carries this press too and must not pull a
   megabyte on every visit. A share sheet opened after a slow fetch has lost
   the gesture that allowed it on iOS, so a press whose file is not in hand
   yet shares the link at once, inside the gesture, and the file is ready for
   the next press.
   --------------------------------------------------------------------------- */

export function ShareButton({
  url,
  imageUrl,
  text,
  label,
  copiedLabel,
  water,
  lang,
  auto = false,
  fetchInView = false,
}: {
  url: string;
  imageUrl: string;
  text: string;
  label: string;
  copiedLabel: string;
  /** A water slug and an edition: the only two things measurement is told. */
  water: string;
  lang: string;
  auto?: boolean;
  /** Start fetching the image once the press is on screen. */
  fetchInView?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const tried = useRef(false);
  const pending = useRef<Promise<File | null> | null>(null);
  const ready = useRef<File | null>(null);
  const button = useRef<HTMLButtonElement>(null);

  /** Start the fetch once; a failed one may start again on the next try. */
  function prepare(): Promise<File | null> {
    pending.current ??= sheetFile(imageUrl).then((file) => {
      ready.current = file;
      if (!file) pending.current = null;
      return file;
    });
    return pending.current;
  }

  /** `gesture`: a press, whose share must open before the gesture expires. */
  async function send(gesture: boolean) {
    if (busy) return;
    setBusy(true);
    track("share_open", { water, lang });

    try {
      let sheet = ready.current;
      if (!sheet) {
        const fetching = prepare();
        if (!gesture) sheet = await fetching;
      }

      if (sheet && navigator.canShare?.({ files: [sheet] })) {
        await navigator.share({ files: [sheet], text, url });
        track("share_done", { water, lang, how: "files" });
        return;
      }

      if (navigator.share) {
        await navigator.share({ text, url });
        track("share_done", { water, lang, how: "link" });
        return;
      }

      await copyLink();
    } catch (error) {
      /* A cancelled share sheet throws AbortError, which is somebody changing
         their mind. A refused one (NotAllowedError) still leaves them the
         link, copied. */
      if (gesture && error instanceof DOMException && error.name === "NotAllowedError") {
        await copyLink().catch(() => {});
      }
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`${text} ${url}`);
    track("share_done", { water, lang, how: "copied" });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  useEffect(() => {
    const el = button.current;
    if (!fetchInView || !el || typeof IntersectionObserver === "undefined") return;
    const seen = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        seen.disconnect();
        void prepare();
      }
    });
    seen.observe(el);
    return () => seen.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInView, imageUrl]);

  useEffect(() => {
    if (!auto || tried.current) return;
    tried.current = true;
    void send(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  return (
    <button
      ref={button}
      type="button"
      onClick={() => void send(true)}
      onPointerEnter={() => void prepare()}
      onPointerDown={() => void prepare()}
      onFocus={() => void prepare()}
      disabled={busy}
      /* The marigold press: the one marigold button in the product. */
      className={buttonClass("share", "w-full")}
    >
      <span>{copied ? copiedLabel : label}</span>
      <span aria-hidden="true" className="shrink-0">
        →
      </span>
    </button>
  );
}

/** The sheet as a File, or null when it cannot be had. */
async function sheetFile(imageUrl: string): Promise<File | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    return new File([blob], "sankalp-patra.png", { type: "image/png" });
  } catch {
    return null;
  }
}
