import sharp from "sharp";

/* ---------------------------------------------------------------------------
   A photograph, turned into something that belongs on the sheet.

   The Sankalp Patra is ink on paper: a rule, a serif, one spot colour. A
   phone snapshot dropped into it in full colour looks like a photograph
   pasted onto a certificate, which is exactly the look this design exists to
   avoid. So every portrait is put through the same press: cropped to the
   sheet's window, desaturated, given a little contrast and a fine grain, and
   written at a size that can sit inside a 1080 by 1350 share image without
   dominating its budget.

   FOUR THINGS THIS FILE REFUSES, and each is a real way a photo upload goes
   wrong rather than a hypothetical:

   1. A DECOMPRESSION BOMB. A 16000 by 16000 PNG is a few hundred kilobytes on
      disk and gigabytes in memory. The pixel budget is checked from the header
      before a single pixel is decoded, so the process cannot be killed by a
      file somebody uploaded.
   2. A FILE THAT IS NOT AN IMAGE. sharp raises on nonsense input; that is
      caught and turned into a rejection the form can print, never a 500.
   3. EXIF. A phone photograph carries the GPS fix of the room it was taken in.
      This sheet gets shared into a family group and sometimes onto the open
      web, so everything except the pixels is dropped. The rotation stored in
      EXIF is applied first, then discarded, so an upright photo stays upright.
   4. AN ALPHA CHANNEL. Flattened onto the paper colour, because a transparent
      PNG over a dark sheet renders as a silhouette.

   HEIC. iPhones shoot HEIC by default, and this build of sharp decodes it.
   Where a build does not, the failure is a clean rejection and the form tells
   the person to save as JPEG.
   --------------------------------------------------------------------------- */

export const PORTRAIT = {
  /** The window on the sheet, in pixels, at the size the sheet is rendered. */
  width: 800,
  height: 1000,
  /** What we will accept from a phone. Comfortably above a 48MP HEIC. */
  maxUploadBytes: 12 * 1024 * 1024,
  /** What we will store. A sheet that has to load ten megabytes is not shared. */
  maxBytes: 400 * 1024,
  /** Above this, the file is a bomb rather than a photograph. 100 megapixels. */
  maxPixels: 100_000_000,
  /** The paper an alpha channel is flattened onto. Matches --paper on the sheet. */
  paper: "#faf6ea",
} as const;

export class PortraitRejected extends Error {
  /** A key the form looks up in its own copy, so the message is in their language. */
  readonly reason: "tooLarge" | "notAnImage" | "tooManyPixels" | "badCrop";

  constructor(reason: PortraitRejected["reason"]) {
    super(`portrait rejected: ${reason}`);
    this.name = "PortraitRejected";
    this.reason = reason;
  }
}

export type Crop = { x: number; y: number; width: number; height: number };

export type Processed = {
  buffer: Buffer;
  contentType: "image/jpeg";
  width: number;
  height: number;
};

/**
 * A fine grain, the same one over every portrait, so the sheet reads as one
 * printed surface rather than a photograph sitting on top of a document.
 * Generated once at module load: it is 800 by 1000 of noise and there is no
 * reason to make it per request.
 */
const grain = (async () => {
  const bytes = Buffer.alloc(PORTRAIT.width * PORTRAIT.height);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = 118 + Math.floor(Math.random() * 20);
  }
  return sharp(bytes, {
    raw: { width: PORTRAIT.width, height: PORTRAIT.height, channels: 1 },
  })
    .png()
    .toBuffer();
})();

/**
 * Put one uploaded photograph through the press.
 *
 * `crop` is in the coordinates of the uploaded image, as the browser's cropper
 * reports them. Omitted, the image is cover-fitted to the window, which is
 * what happens when somebody skips the crop step.
 */
export async function processPortrait(input: Buffer, crop?: Crop): Promise<Processed> {
  if (input.byteLength > PORTRAIT.maxUploadBytes) throw new PortraitRejected("tooLarge");

  let pipeline = sharp(input, { failOn: "error" });

  let meta;
  try {
    meta = await pipeline.metadata();
  } catch {
    throw new PortraitRejected("notAnImage");
  }

  const { width, height } = meta;
  if (!width || !height) throw new PortraitRejected("notAnImage");
  if (width * height > PORTRAIT.maxPixels) throw new PortraitRejected("tooManyPixels");

  /* Apply the EXIF rotation before cropping, so the crop the person drew on an
     upright preview lands on an upright image. */
  pipeline = pipeline.rotate();

  if (crop) {
    const { x, y, width: w, height: h } = crop;
    const inside =
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      w > 0 &&
      h > 0 &&
      x >= 0 &&
      y >= 0 &&
      x + w <= width &&
      y + h <= height;
    if (!inside) throw new PortraitRejected("badCrop");
    pipeline = pipeline.extract({ left: x, top: y, width: w, height: h });
  }

  const pressed = pipeline
    .resize(PORTRAIT.width, PORTRAIT.height, { fit: "cover", position: "attention" })
    .flatten({ background: PORTRAIT.paper })
    .grayscale()
    .linear(1.12, -8)
    .sharpen({ sigma: 0.6 });

  const composited = pressed.composite([
    { input: await grain, blend: "soft-light", tile: false },
  ]);

  /* Quality steps down until the file fits. A portrait that pushes the share
     image over its budget stops being shared, which defeats the point of it. */
  for (const quality of [82, 74, 66, 58]) {
    const buffer = await composited
      .clone()
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();

    if (buffer.byteLength <= PORTRAIT.maxBytes || quality === 58) {
      return {
        buffer,
        contentType: "image/jpeg",
        width: PORTRAIT.width,
        height: PORTRAIT.height,
      };
    }
  }

  /* Unreachable: the loop returns on its last iteration. Kept so the function
     has one exit type rather than an assertion. */
  throw new PortraitRejected("notAnImage");
}
