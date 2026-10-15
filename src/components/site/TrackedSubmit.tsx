"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { track, type Event, type Props } from "@/lib/track";
import { SubmitButton } from "@/components/ui";
import type { ButtonVariant } from "@/components/ui";

/* A submit button that reports the intent before the form takes over. It fires
   on click rather than on the action's result, because the point of the event
   is how many people started, and the ones who abandon at Stripe are exactly
   the number worth knowing.

   WHILE THE ACTION RUNS IT SAYS SO. Opening a Checkout Session takes a second
   or two on a phone, and a button that sits unchanged for that long is a
   button that gets pressed twice. `useFormStatus` reads the enclosing form's
   state, so the label changes and the control disables from the first frame
   after the press.

   AND IT SAYS SO ONLY WHILE IT IS TRUE. Swiping back from Stripe restores this
   page from the back-forward cache exactly as it was left, mid-press, with the
   label still "Opening" and the button still disabled. A pending button that
   comes back from that cache reloads the page, so the buyer meets a fresh one. */
export function TrackedSubmit({
  children,
  pending: pendingLabel,
  event,
  props,
  variant,
  className,
}: {
  children: React.ReactNode;
  /** What the button says while the action is in flight. */
  pending?: React.ReactNode;
  event: Event;
  props?: Props;
  variant?: ButtonVariant;
  className?: string;
}) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending) return;
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, [pending]);

  return (
    <SubmitButton
      variant={variant}
      className={className}
      onClick={() => track(event, props)}
      disabled={pending}
      aria-busy={pending || undefined}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </SubmitButton>
  );
}
