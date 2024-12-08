import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import type { HonoContext } from "../config";
export function createTRPCContext(
  opts: FetchCreateContextFnOptions,
  c: HonoContext
) {
  const db = c.get("db");
  const user = c.get("user-linkedin");
  const s3 = c.get("s3");
  const BUCKET_NAME = c.get("BUCKET_NAME");
  return {
    ...opts,
    db,
    user,
    s3,
    BUCKET_NAME,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
