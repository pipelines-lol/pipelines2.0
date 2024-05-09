import { PrismaClient } from "@pipelines/database";
import { withAccelerate } from "@pipelines/database";
import { Next } from "hono";

import type { HonoContext } from "../../config";

export function db(c: HonoContext, next: Next) {
    const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env.DATABASE_URL
          },
        },
      }).$extends(withAccelerate());
    c.set("db", prisma);
    return next();
}