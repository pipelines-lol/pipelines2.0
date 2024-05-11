import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import type { HonoContext } from "../config";
export function createTRPCContext(c: HonoContext) {
  return (opts: FetchCreateContextFnOptions) => {
    /*
     * Here we spawn a new database connection for each request.
     * This is because we can't share a connection between requests in a Cloudflare Worker.
     */

    const db = c.get("db");
    const user = c.get('user-linkedin')
    return {
      ...opts,
      db,
      user,
      env: c.env,
    };
  };
}

export type TRPCContext = inferAsyncReturnType<
  ReturnType<typeof createTRPCContext>
>;
