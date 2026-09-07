import "server-only";
import { del, put } from "@vercel/blob";

/* ---------------------------------------------------------------------------
   Where a portrait and a rendered sheet live.

   ONE STORE, PUBLIC, WITH UNGUESSABLE NAMES. Vercel Blob appends a random
   suffix to every pathname, so a URL cannot be guessed from a user id or a
   date. That is what a public store buys: a Sankalp Patra is meant to be
   shared into a family group, and an image that needs a signed URL is an image
   that breaks the moment it is forwarded.

   THE ORIGINAL PHOTOGRAPH IS NEVER STORED. The build plan had a private store
   for raw uploads alongside the public one. It is gone: the only thing kept is
   the pressed, grayscaled, EXIF-stripped portrait that goes on the sheet.
   Somebody who wants a different crop uploads again, which costs them ten
   seconds and saves this product from holding a folder of people's original
   photographs it has no use for. It is also one fewer thing to find and delete
   when somebody asks to be forgotten.

   `addRandomSuffix` is on for exactly that reason and must stay on. With it
   off, the pathname is the URL, and portrait/<user>/current.jpg would be
   guessable from a user id.
   --------------------------------------------------------------------------- */

export type Stored = { key: string; url: string };

/** The pressed portrait. Returns the pathname to store and the URL to render. */
export async function putPortrait(userId: string, jpeg: Buffer): Promise<Stored> {
  const blob = await put(`portrait/${userId}.jpg`, jpeg, {
    access: "public",
    contentType: "image/jpeg",
    addRandomSuffix: true,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });

  return { key: blob.pathname, url: blob.url };
}

/** A rendered Sankalp Patra, 1080 by 1350. */
export async function putSheet(sittingId: string, png: Buffer): Promise<Stored> {
  const blob = await put(`sheet/${sittingId}.png`, png, {
    access: "public",
    contentType: "image/png",
    addRandomSuffix: true,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });

  return { key: blob.pathname, url: blob.url };
}

/**
 * The public URL for a stored key.
 *
 * The store's host is stamped into BLOB_READ_WRITE_TOKEN, so it is derived
 * rather than configured: one fewer environment variable to get wrong, and it
 * cannot point at a different store than the one being written to.
 */
export function blobUrl(key: string): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is missing");

  /* vercel_blob_rw_<storeId>_<secret> */
  const storeId = token.split("_")[3];
  if (!storeId) throw new Error("BLOB_READ_WRITE_TOKEN is not shaped as expected");

  return `https://${storeId.toLowerCase()}.public.blob.vercel-storage.com/${key}`;
}

/** Remove a file. Used when a portrait is replaced and when an account is deleted. */
export async function remove(keyOrUrl: string): Promise<void> {
  try {
    await del(keyOrUrl.startsWith("http") ? keyOrUrl : blobUrl(keyOrUrl));
  } catch (error) {
    /* A file that is already gone is the state we wanted. Anything else is
       worth knowing about but never worth failing the request for. */
    console.warn("blob: could not delete", keyOrUrl, error);
  }
}
