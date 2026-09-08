import Stripe from "stripe";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/* The route reaches for the real Neon client and the real mailer at import
   time. Both are replaced here: the point of this file is the signature check
   and the dispatch, and fulfilment itself is covered against a real database
   in fulfil.test.ts. */
const fulfilSession = vi.fn(async () => ({ outcome: "ignored", why: "stubbed" }));
const sendReceipt = vi.fn(async () => ({ sent: true }));

vi.mock("@/db", () => ({ db: {} }));
vi.mock("@/lib/fulfil", () => ({ fulfilSession }));
vi.mock("@/lib/email", () => ({ sendReceipt }));

const SECRET = "whsec_testsecret";

/** A real Stripe signature over the exact bytes, as Stripe sends it. */
function signed(body: string, secret = SECRET, at = Math.floor(Date.now() / 1000)) {
  return Stripe.webhooks.generateTestHeaderString({ payload: body, secret, timestamp: at });
}

function event(type: string, session: Record<string, unknown>): string {
  return JSON.stringify({
    id: "evt_1",
    object: "event",
    type,
    data: { object: { object: "checkout.session", ...session } },
  });
}

const PAID = {
  id: "cs_test_1",
  payment_status: "paid",
  currency: "usd",
  amount_total: 1100,
  client_reference_id: "user_1",
  metadata: { pack: "eleven", credits: "11", lang: "en" },
  customer_details: { email: "reader@example.com" },
};

async function post(body: string, signature?: string): Promise<Response> {
  const { POST } = await import("@/app/api/stripe/webhook/route");
  return POST(
    new Request("https://www.snanify.com/api/stripe/webhook", {
      method: "POST",
      headers: signature ? { "stripe-signature": signature } : {},
      body,
    }),
  );
}

beforeEach(() => {
  vi.resetModules();
  fulfilSession.mockClear();
  sendReceipt.mockClear();
  process.env.STRIPE_WEBHOOK_SECRET = SECRET;
  process.env.STRIPE_SECRET_KEY = "sk_test_dummy";
});

afterEach(() => {
  delete process.env.STRIPE_WEBHOOK_SECRET;
});

describe("the Stripe webhook", () => {
  it("fulfils a properly signed completed checkout", async () => {
    const body = event("checkout.session.completed", PAID);
    const response = await post(body, signed(body));

    expect(response.status).toBe(200);
    expect(fulfilSession).toHaveBeenCalledOnce();
  });

  it("refuses a body nobody signed", async () => {
    const body = event("checkout.session.completed", PAID);
    const response = await post(body);

    expect(response.status).toBe(400);
    expect(fulfilSession).not.toHaveBeenCalled();
  });

  it("refuses a signature made with the wrong secret", async () => {
    /* This is the attack the check exists for: anybody can POST here, and
       without it they could grant themselves sixty mornings with curl. */
    const body = event("checkout.session.completed", PAID);
    const response = await post(body, signed(body, "whsec_attacker"));

    expect(response.status).toBe(400);
    expect(fulfilSession).not.toHaveBeenCalled();
  });

  it("refuses a body edited after it was signed", async () => {
    const body = event("checkout.session.completed", PAID);
    const signature = signed(body);
    const tampered = body.replace('"credits":"11"', '"credits":"600"');

    const response = await post(tampered, signature);

    expect(response.status).toBe(400);
    expect(fulfilSession).not.toHaveBeenCalled();
  });

  it("refuses a replay from outside the tolerance window", async () => {
    const body = event("checkout.session.completed", PAID);
    const old = Math.floor(Date.now() / 1000) - 60 * 60;

    const response = await post(body, signed(body, SECRET, old));

    expect(response.status).toBe(400);
  });

  it("accepts an event type it does not act on, and does nothing", async () => {
    const body = event("payment_intent.created", { id: "pi_1" });
    const response = await post(body, signed(body));

    expect(response.status).toBe(200);
    expect(fulfilSession).not.toHaveBeenCalled();
  });

  it("handles the delayed bank payment as well as the instant one", async () => {
    const body = event("checkout.session.async_payment_succeeded", PAID);
    const response = await post(body, signed(body));

    expect(response.status).toBe(200);
    expect(fulfilSession).toHaveBeenCalledOnce();
  });

  it("asks Stripe to retry when fulfilment fails, because the money is already taken", async () => {
    fulfilSession.mockRejectedValueOnce(new Error("database unreachable"));

    const body = event("checkout.session.completed", PAID);
    const response = await post(body, signed(body));

    expect(response.status).toBe(500);
  });

  it("still answers 200 when the receipt cannot be sent", async () => {
    fulfilSession.mockResolvedValueOnce({
      outcome: "booked",
      userId: "user_1",
      tier: "eleven",
      credits: 11,
      email: "reader@example.com",
    } as never);
    sendReceipt.mockRejectedValueOnce(new Error("resend down"));

    const body = event("checkout.session.completed", PAID);
    const response = await post(body, signed(body));

    expect(response.status).toBe(200);
  });

  it("sends no receipt for a redelivery", async () => {
    fulfilSession.mockResolvedValueOnce({ outcome: "already" } as never);

    const body = event("checkout.session.completed", PAID);
    const response = await post(body, signed(body));

    expect(response.status).toBe(200);
    expect(sendReceipt).not.toHaveBeenCalled();
  });

  it("refuses to run at all without a configured secret", async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;

    const body = event("checkout.session.completed", PAID);
    const response = await post(body, "t=1,v1=whatever");

    expect(response.status).toBe(500);
    expect(fulfilSession).not.toHaveBeenCalled();
  });
});
