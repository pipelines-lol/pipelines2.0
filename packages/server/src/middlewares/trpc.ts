import type { Next } from "hono";
import { trpcServer } from "@hono/trpc-server";

import type { HonoContext } from "../../config";
import { createTRPCContextFromHonoContext } from "../context";
import { appRouter } from "../../index";

export async function trpc(c: HonoContext, next: Next) {
  return trpcServer({
    router: appRouter,
    onError({ error }) {
      console.error(error);
    },
    createContext: createTRPCContextFromHonoContext(c),
  })(c, next);
}
