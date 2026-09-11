import { notFound } from "next/navigation";

/* Every path under a locale that no other route claims lands here, and is
   handed to the segment's not-found page with a 404 status. Without this
   catch-all an unknown URL fell through to Next's own "This page could not be
   found", because there is no root layout to hang a not-found on. */
export default function CatchAll() {
  notFound();
}
