import { describe, expect, it, vi } from "vitest";

/* Deleting an account removes every file of the person's: the current
   portrait, the ones snapshotted on sittings, the rendered sheets, and every
   replaced portrait no row points at any more. */

const h = vi.hoisted(() => {
  const order: string[] = [];
  let selects = 0;
  return {
    order,
    db: {
      select: () => ({
        from: () => ({
          where: () => {
            selects += 1;
            const rows =
              selects % 2 === 1
                ? [{ portraitKey: "portrait/user_1-current.jpg" }]
                : [{ portraitKey: "portrait/user_1-old.jpg", imageKey: "sheet/s1-x.png" }];
            return Object.assign(Promise.resolve(rows), { limit: async () => rows });
          },
        }),
      }),
      delete: () => ({
        where: async () => {
          order.push("rows");
        },
      }),
    },
    remove: vi.fn(async (key: string) => {
      order.push(`remove ${key}`);
    }),
    removePortraits: vi.fn(async () => {
      order.push("removePortraits user_1");
      return 3;
    }),
  };
});

vi.mock("drizzle-orm", () => ({ eq: () => ({}) }));
vi.mock("@/db", () => ({ db: h.db, profiles: {}, sittings: {}, users: {} }));
vi.mock("@/lib/auth", () => ({ requireUser: async () => ({ id: "user_1" }) }));
vi.mock("@/lib/blob", () => ({ remove: h.remove, removePortraits: h.removePortraits }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: (to: string) => {
    throw new Error(`redirect ${to}`);
  },
}));
vi.mock("@clerk/nextjs/server", () => ({
  clerkClient: async () => ({
    users: {
      deleteUser: async () => {
        h.order.push("clerk");
      },
    },
  }),
}));

import { deleteAccount } from "@/app/[lang]/(app)/account/actions";

describe("deleteAccount", () => {
  it("removes every file, replaced portraits included, then the rows, then the sign-in", async () => {
    const form = new FormData();
    form.set("confirm", "delete");
    await expect(deleteAccount("en", form)).rejects.toThrow("redirect /");

    expect(h.order).toEqual([
      "remove portrait/user_1-current.jpg",
      "remove portrait/user_1-old.jpg",
      "remove sheet/s1-x.png",
      "removePortraits user_1",
      "rows",
      "clerk",
    ]);
  });
});
