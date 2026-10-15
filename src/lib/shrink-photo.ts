/* ---------------------------------------------------------------------------
   A phone photograph, made small enough to send.

   Vercel Functions take a request body of 4.5 MB at most, and a photograph
   straight from a phone camera is five to eight. Sent as it is, the save
   failed before the server read a byte. So the form redraws the photograph
   here, at 1600 pixels on its longest side as a JPEG, which lands well
   under two megabytes and still covers the sheet's 800 by 1000 window with
   room to crop. The press itself, the crop, the five tones of ink and the
   EXIF stripping, stays on the server (src/lib/portrait.ts).

   UPRIGHT. A phone stores a photograph sideways and writes the turn into
   EXIF. `createImageBitmap` is asked to apply it, and an <img> applies it by
   default, so the redrawn pixels are already upright and carry no EXIF.

   ON PAPER. A transparent PNG is drawn over the sheet's paper colour, because
   a JPEG has no alpha and a canvas fills the gap with black.

   THE ORIGINAL, WHERE THE BROWSER CANNOT READ IT. Chrome and Firefox on a
   desktop decode no HEIC. The file then goes as it is, and the server, which
   does decode HEIC, takes it from there. Every failure here falls back the
   same way, so this step can only ever help.

   THIS FILE HAS NO IMPORTS, ON PURPOSE, for the reason src/lib/limits.ts
   gives: the setup form imports it, and a heavy import there broke hydration.
   --------------------------------------------------------------------------- */

const LONGEST = 1600;
const QUALITY = 0.85;
/** PORTRAIT.paper in src/lib/portrait.ts. */
const PAPER = "#f2ead9";

type Decoded = { source: CanvasImageSource; width: number; height: number; done: () => void };

async function decode(file: File): Promise<Decoded | null> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return { source: bitmap, width: bitmap.width, height: bitmap.height, done: () => bitmap.close() };
    } catch {
      /* Safari before 17 refuses the option, and some builds refuse a Blob; an <img> follows. */
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return {
      source: img,
      width: img.naturalWidth,
      height: img.naturalHeight,
      done: () => URL.revokeObjectURL(url),
    };
  } catch {
    URL.revokeObjectURL(url);
    return null;
  }
}

/** The photograph at 1600 pixels at most, as a JPEG; the original wherever that fails. */
export async function shrinkPhoto(file: File): Promise<File> {
  try {
    const decoded = await decode(file);
    if (!decoded) return file;

    try {
      const { width, height } = decoded;
      if (!width || !height) return file;

      const scale = Math.min(1, LONGEST / Math.max(width, height));
      const w = Math.max(1, Math.round(width * scale));
      const h = Math.max(1, Math.round(height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return file;
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, w, h);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(decoded.source, 0, 0, w, h);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", QUALITY),
      );
      /* A small JPEG can come back larger after a redraw; the smaller one goes. */
      if (!blob || blob.size >= file.size) return file;

      const name = `${file.name.replace(/\.[^.]*$/, "") || "portrait"}.jpg`;
      return new File([blob], name, { type: "image/jpeg" });
    } finally {
      decoded.done();
    }
  } catch {
    return file;
  }
}
