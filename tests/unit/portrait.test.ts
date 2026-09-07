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

  it("is grey, because the sheet is ink on paper", async () => {
    const out = await processPortrait(photo);
    const { data, info } = await sharp(out.buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    /* A grayscale JPEG may still be written with three channels, so compare
       the channels rather than trusting the channel count. */
    if (info.channels >= 3) {
      for (let i = 0; i < data.length; i += info.channels) {
        expect(Math.abs(data[i] - data[i + 1])).toBeLessThanOrEqual(2);
        expect(Math.abs(data[i + 1] - data[i + 2])).toBeLessThanOrEqual(2);
      }
    }
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
});
