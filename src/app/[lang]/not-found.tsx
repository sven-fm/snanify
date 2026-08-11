import { NotFoundPage } from "@/components/NotFoundPage";

/* not-found cannot read route params, so this renders the English copy.
   The Hindi 404 arrives with the localised error boundary in a later pass. */
export default function NotFound() {
  return <NotFoundPage lang="en" />;
}
