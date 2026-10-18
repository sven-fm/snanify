import { beforeEach, describe, expect, it, vi } from "vitest";

/* The beacon a closing /setup page sends: same origin, small, well formed,
   signed in, and always an autosave without a photograph. */

const h = vi.hoisted(() => ({
  currentUser: vi.fn(),
  saveSheet: vi.fn(async () => ({ ok: true, first: false })),
}));

vi.mock("@/lib/auth", () => ({ currentUser: h.currentUser }));
vi.mock("@/lib/save-sheet", () => ({ saveSheet: h.saveSheet }));

import { POST } from "@/app/[lang]/(app)/setup/autosave/route";

const URL_ = "https://www.snanify.com/hi/setup/autosave";
const ctx = { params: Promise.resolve({ lang: "hi" }) };

function sheet(): FormData {
  const f = new FormData();
  f.set("sankalpText", "For my mother.");
  f.set("portrait", new File([new Uint8Array([1])], "me.jpg", { type: "image/jpeg" }));
  return f;
}

/** A request as a browser sends it: the multipart body with its length. */
async function beacon(body: BodyInit, headers: Record<string, string> = {}): Promise<Request> {
  const probe = new Request(URL_, { method: "POST", body });
  const bytes = await probe.arrayBuffer();
  return new Request(URL_, {
    method: "POST",
    body: bytes,
    headers: {
      origin: "https://www.snanify.com",
      "content-type": probe.headers.get("content-type") ?? "",
      "content-length": String(bytes.byteLength),
      ...headers,
    },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  h.currentUser.mockResolvedValue({ id: "user_1" });
});

describe("POST /setup/autosave", () => {
  it("refuses another site", async () => {
    const res = await POST(await beacon(sheet(), { origin: "https://evil.example" }), ctx);
    expect(res.status).toBe(403);
    expect(h.saveSheet).not.toHaveBeenCalled();
  });

  it("refuses a signed-out reader", async () => {
    h.currentUser.mockResolvedValueOnce(null);
    const res = await POST(await beacon(sheet()), ctx);
    expect(res.status).toBe(401);
  });

  it("refuses a body over 64 KB unread, and one without a length", async () => {
    const big = await POST(await beacon(sheet(), { "content-length": String(64 * 1024 + 1) }), ctx);
    expect(big.status).toBe(413);
    const req = new Request(URL_, { method: "POST", headers: { origin: "https://www.snanify.com" } });
    expect((await POST(req, ctx)).status).toBe(411);
    expect(h.saveSheet).not.toHaveBeenCalled();
  });

  it("answers a malformed body with 400", async () => {
    const notForm = await POST(await beacon("hello", { "content-type": "text/plain" }), ctx);
    expect(notForm.status).toBe(400);
    const broken = await POST(
      await beacon("--x\r\nnonsense", { "content-type": "multipart/form-data; boundary=zzz" }),
      ctx,
    );
    expect(broken.status).toBe(400);
    expect(h.saveSheet).not.toHaveBeenCalled();
  });

  it("saves as an autosave, in the page's edition, without the photograph", async () => {
    const res = await POST(await beacon(sheet()), ctx);
    expect(res.status).toBe(200);
    const [user, lang, form, opts] = h.saveSheet.mock.calls[0] as unknown as [string, string, FormData, object];
    expect(user).toBe("user_1");
    expect(lang).toBe("hi");
    expect(form.has("portrait")).toBe(false);
    expect(form.get("sankalpText")).toBe("For my mother.");
    expect(opts).toEqual({ autosave: true });
  });
});
