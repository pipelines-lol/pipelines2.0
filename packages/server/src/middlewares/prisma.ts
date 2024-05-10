import { PrismaClient } from "@pipelines/database";
import { Next } from "hono";

import type { HonoContext } from "../../config";

export function db(c: HonoContext, next: Next) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });
  c.set("db", prisma);
  return next();
}
