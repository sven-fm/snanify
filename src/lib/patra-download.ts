/* ---------------------------------------------------------------------------
   "Save the image": the sheet's PNG as an attachment.

   The image route usually redirects to the blob store, which is another
   origin, and a browser ignores `download` on a cross-origin link: it opens
   the picture instead of saving it. So `?download=1` streams the bytes from
   our own origin with Content-Disposition set, and the phone saves the file.
   --------------------------------------------------------------------------- */

export const DOWNLOAD_NAME = "sankalp-patra.png";

/** True when the request asks for the sheet as a file to keep. */
export function wantsDownload(request: Request): boolean {
  return new URL(request.url).searchParams.get("download") === "1";
}

/** The PNG as an attachment; a private sheet stays out of every shared cache. */
export function downloadResponse(png: Uint8Array<ArrayBuffer>, owned: boolean): Response {
  return new Response(png, {
    headers: {
      "content-type": "image/png",
      "content-disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
      "cache-control": owned ? "private, no-store" : "public, max-age=31536000, immutable",
    },
  });
}

/** The stored PNG's bytes, or null when the store does not answer. */
export async function storedBytes(url: string): Promise<Uint8Array<ArrayBuffer> | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return new Uint8Array(await res.arrayBuffer());
  } catch {
    return null;
  }
}
