import { Hono } from "hono";
import { cors } from "hono/cors";

// middleware
import { trpc } from "./src/middlewares/trpc";
import { db } from "./src/middlewares/prisma";
import { auth } from "./src/middlewares/auth";

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
  .use("*", auth)
  .use("/trpc/*", trpc);

export default app;
