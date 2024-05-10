import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpc } from "./src/middlewares/trpc";
import { db } from "./src/middlewares/prisma";

const app = new Hono();

app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000"],
    }),
  )
  .use("*", db)
  .use("/trpc/*", trpc);

export default app;
