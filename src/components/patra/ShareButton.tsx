"use client";

import { useEffect, useRef, useState } from "react";

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
   --------------------------------------------------------------------------- */

export function ShareButton({
  url,
  imageUrl,
  text,
  label,
  copiedLabel,
  auto = false,
}: {
  url: string;
  imageUrl: string;
  text: string;
  label: string;
  copiedLabel: string;
  auto?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const tried = useRef(false);

  async function send() {
    if (busy) return;
    setBusy(true);

    try {
      const file = await sheetFile(imageUrl);

      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, url });
        return;
      }

      if (navigator.share) {
        await navigator.share({ text, url });
        return;
      }

      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* A cancelled share sheet throws AbortError, which is somebody changing
         their mind and not an error worth showing them. */
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!auto || tried.current) return;
    tried.current = true;
    void send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  return (
    <button
      type="button"
      onClick={send}
      disabled={busy}
      className="label min-h-[56px] w-full bg-spot px-8 text-paper transition-colors hover:bg-ink disabled:opacity-60"
    >
      {copied ? copiedLabel : label}
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
