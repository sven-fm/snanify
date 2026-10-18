import sharp from "sharp";
import { beforeAll, describe, expect, it } from "vitest";
import { PORTRAIT, PortraitRejected, processPortrait } from "@/lib/portrait";

/** A photo-shaped fixture: a colour gradient, so grayscaling is observable. */
async function fixture(width: number, height: number, format: "jpeg" | "png" = "jpeg") {
  const w = width;
  const h = height;
  const raw = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const i = (y * w + x) * 3;
      raw[i] = (x * 255) / w;
      raw[i + 1] = (y * 255) / h;
      raw[i + 2] = 128;
    }
  }
  const img = sharp(raw, { raw: { width: w, height: h, channels: 3 } });
  return format === "jpeg" ? img.jpeg().toBuffer() : img.png().toBuffer();
}

let photo: Buffer;

beforeAll(async () => {
  photo = await fixture(1600, 1200);
});

describe("processPortrait", () => {
  it("returns the exact size the sheet reserves for it", async () => {
    const out = await processPortrait(photo);
    const meta = await sharp(out.buffer).metadata();
    expect(meta.width).toBe(PORTRAIT.width);
    expect(meta.height).toBe(PORTRAIT.height);
  });

  it("comes out as a JPEG small enough to sit in a shared sheet", async () => {
    const out = await processPortrait(photo);
    expect(out.contentType).toBe("image/jpeg");
    expect((await sharp(out.buffer).metadata()).format).toBe("jpeg");
    expect(out.buffer.byteLength).toBeLessThan(PORTRAIT.maxBytes);
  });

  it("is five tones of ink on the paper, like the river plates", async () => {
    const out = await processPortrait(photo);
    const { data, info } = await sharp(out.buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
    const paper = hex(PORTRAIT.paper);
    const ink = hex(PORTRAIT.ink);
    const tones = PORTRAIT.tones.map((a) => paper.map((p, c) => Math.round(p + (ink[c] - p) * (a / 255))));

    /* JPEG blurs the steps a little, so every pixel must sit near one of the
       five tones rather than on it, and more than one tone must be present. */
    const seen = new Set<number>();
    for (let i = 0; i < data.length; i += info.channels) {
      const px = [data[i], data[i + 1], data[i + 2]];
      const near = tones.findIndex((t) => px.every((v, c) => Math.abs(v - t[c]) <= 14));
      if (near >= 0) seen.add(near);
    }
    expect(seen.size).toBeGreaterThanOrEqual(3);
    const inkIsBrown = ink[0] > ink[2] && paper[0] > paper[2];
    expect(inkIsBrown).toBe(true);
  });

  it("takes a crop and uses it", async () => {
    const whole = await processPortrait(photo);
    const corner = await processPortrait(photo, { x: 0, y: 0, width: 400, height: 500 });
    expect(corner.buffer.equals(whole.buffer)).toBe(false);
    const meta = await sharp(corner.buffer).metadata();
    expect(meta.width).toBe(PORTRAIT.width);
  });

  it("accepts a PNG as well as a JPEG", async () => {
    const png = await fixture(900, 900, "png");
    const out = await processPortrait(png);
    expect((await sharp(out.buffer).metadata()).format).toBe("jpeg");
  });

  it("upsizes a small photo rather than leaving a gap in the sheet", async () => {
    const small = await fixture(200, 260);
    const meta = await sharp((await processPortrait(small)).buffer).metadata();
    expect(meta.width).toBe(PORTRAIT.width);
    expect(meta.height).toBe(PORTRAIT.height);
  });

  it("refuses a file that is not an image", async () => {
    await expect(processPortrait(Buffer.from("this is a love letter, not a jpeg"))).rejects
      .toBeInstanceOf(PortraitRejected);
  });

  it("refuses a file too large to have come from a phone camera", async () => {
    const huge = Buffer.alloc(PORTRAIT.maxUploadBytes + 1);
    await expect(processPortrait(huge)).rejects.toBeInstanceOf(PortraitRejected);
  });

  it("refuses a crop that falls outside the photograph", async () => {
    await expect(
      processPortrait(photo, { x: 1500, y: 1100, width: 400, height: 400 }),
    ).rejects.toBeInstanceOf(PortraitRejected);
  });

  it("refuses a decompression bomb rather than trying to resize it", async () => {
    /* A 25000x25000 PNG is a few hundred kilobytes on disk and about two
       gigabytes in memory. The pixel budget is checked from the header,
       before any pixels are read. */
    const bomb = await sharp({
      create: { width: 16000, height: 16000, channels: 3, background: "#888" },
    })
      .png({ compressionLevel: 9 })
      .toBuffer();
    await expect(processPortrait(bomb)).rejects.toBeInstanceOf(PortraitRejected);
  });

  it("strips the metadata, so a shared sheet carries no GPS fix", async () => {
    const withExif = await sharp(photo)
      .withExif({ IFD0: { Copyright: "test", Software: "test" } })
      .toBuffer();
    const out = await processPortrait(withExif);
    const meta = await sharp(out.buffer).metadata();
    expect(meta.exif).toBeUndefined();
  });

  it("keeps the middle of a wide photograph, so a side-lit face stays centred", async () => {
    /* A studio portrait in miniature: a dark ground, a mid-grey head in the
       middle of a wide frame, and its lit cheek, the brightest and busiest
       patch, to the right of centre. The salient patch is what sharp's
       "attention" crop centres on; the window must centre the head instead. */
    const w = 1600;
    const h = 1000;
    const headW = 500;
    const head = await sharp({ create: { width: headW, height: 700, channels: 3, background: "#606060" } })
      .png()
      .toBuffer();
    /* The cheek: a warm checker, all edges and skin, the bait for "attention". */
    const cheek = Buffer.alloc(200 * 400 * 3);
    for (let p = 0; p < 200 * 400; p += 1) {
      const v = ((p % 200) + Math.floor(p / 200)) % 2 ? 255 : 150;
      cheek[p * 3] = v;
      cheek[p * 3 + 1] = (v * 0.75) | 0;
      cheek[p * 3 + 2] = (v * 0.55) | 0;
    }
    const lit = await sharp(cheek, { raw: { width: 200, height: 400, channels: 3 } }).png().toBuffer();
    const left = (w - headW) / 2;
    const wide = await sharp({ create: { width: w, height: h, channels: 3, background: "#050505" } })
      .composite([
        { input: head, left, top: 150 },
        { input: lit, left: left + headW - 210, top: 300 },
      ])
      .png()
      .toBuffer();

    const out = await processPortrait(wide);
    const { data, info } = await sharp(out.buffer).grayscale().raw().toBuffer({ resolveWithObject: true });

    /* The head is every column lighter than the ground, on a row above the
       cheek. Under "attention" it lands 50px left of centre. */
    const row = 250;
    const lighter: number[] = [];
    for (let x = 0; x < info.width; x += 1) {
      if (data[row * info.width + x] > 40) lighter.push(x);
    }
    const centre = (lighter[0] + lighter[lighter.length - 1]) / 2;
    expect(Math.abs(centre - info.width / 2)).toBeLessThanOrEqual(4);
  });
});
