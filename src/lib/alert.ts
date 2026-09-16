import { sendAlert } from "@/lib/email";

/* ---------------------------------------------------------------------------
   Error reporting, by mail.

   The site has no log drain and no error service; it has a Resend account.
   The handful of failures that cost somebody something (a payment booked but
   not fulfilled, a sheet not drawn, a reminder not sent) mail the owner from
   the catch block, with the error and its stack. One mail per subject per
   quarter hour per instance, so a loop cannot flood the inbox, and never a
   throw: the alert is beside the failure, never another one.
   --------------------------------------------------------------------------- */

const QUIET_MS = 15 * 60_000;
const last = new Map<string, number>();

export async function alertOwner(subject: string, detail: unknown): Promise<void> {
  try {
    const now = Date.now();
    if (now - (last.get(subject) ?? 0) < QUIET_MS) return;
    last.set(subject, now);
    const body =
      detail instanceof Error ? `${detail.message}\n\n${detail.stack ?? ""}` : typeof detail === "string" ? detail : JSON.stringify(detail, null, 2);
    await sendAlert(subject, `${subject}\n\n${body}\n\n${new Date().toISOString()}`);
  } catch (error) {
    console.error("alert: could not send", error);
  }
}
