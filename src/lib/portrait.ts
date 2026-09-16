import sharp from "sharp";

/* ---------------------------------------------------------------------------
   A photograph, turned into something that belongs on the sheet.

   The Sankalp Patra is ink on paper: a rule, a serif, one spot colour. A
   phone snapshot dropped into it in full colour looks like a photograph
   pasted onto a certificate, which is exactly the look this design exists to
   avoid. So every portrait is put through the same press: cropped to the
   sheet's window, reduced to the five tones of ink the six river plates
   carry, on the same paper, and written at a size that can sit inside the
   share image without dominating its budget.

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
  /** The plate the picture is printed on: the same paper the ghat plate on the sheet is flattened onto. */
  paper: "#f2ead9",
  /** The ink of the six plates in public/waters. */
  ink: "#171310",
  /** The five tones of ink the plates carry, as alpha over the paper. */
  tones: [0, 64, 128, 191, 255],
} as const;

/** "#f2ead9" as [242, 234, 217]. */
function hex(colour: string): [number, number, number] {
  const n = parseInt(colour.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

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

  /* Pressed the way the six river plates were: the photograph reduced to
     five tones of ink on the paper, so a face and a ghat sit on one sheet as
     one kind of picture. Luminance is read after a light lift and a sharpen,
     then each pixel takes the nearest of the five tones. */
  const { data, info } = await pipeline
    .resize(PORTRAIT.width, PORTRAIT.height, { fit: "cover", position: "attention" })
    .flatten({ background: PORTRAIT.paper })
    .grayscale()
    .linear(1.12, -8)
    .sharpen({ sigma: 0.6 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const paper = hex(PORTRAIT.paper);
  const ink = hex(PORTRAIT.ink);
  const pixels = info.width * info.height;
  const rgb = Buffer.alloc(pixels * 3);
  for (let i = 0; i < pixels; i++) {
    const dark = (255 - data[i * info.channels]) / 255;
    /* The steps sit high, so a face keeps its light: a photograph of a
       person is mostly midtone, and split evenly it comes out as mud. */
    const level = dark < 0.22 ? 0 : dark < 0.42 ? 1 : dark < 0.62 ? 2 : dark < 0.82 ? 3 : 4;
    const alpha = PORTRAIT.tones[level] / 255;
    for (let c = 0; c < 3; c++) rgb[i * 3 + c] = Math.round(paper[c] + (ink[c] - paper[c]) * alpha);
  }
  const composited = sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } });

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
