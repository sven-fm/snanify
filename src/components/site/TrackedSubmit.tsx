"use client";

import { track, type Event, type Props } from "@/lib/track";
import { SubmitButton } from "@/components/ui";
import type { ButtonVariant } from "@/components/ui";

/* A submit button that reports the intent before the form takes over. It fires
   on click rather than on the action's result, because the point of the event
   is how many people started, and the ones who abandon at Stripe are exactly
   the number worth knowing. */
export function TrackedSubmit({
  children,
  event,
  props,
  variant,
  className,
}: {
  children: React.ReactNode;
  event: Event;
  props?: Props;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <SubmitButton variant={variant} className={className} onClick={() => track(event, props)}>
      {children}
    </SubmitButton>
  );
}
