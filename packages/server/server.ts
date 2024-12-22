import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { jwt } from "hono/jwt";

// middleware
import { trpc } from "./src/middlewares/trpc";
import { db } from "./src/middlewares/prisma";
import { validateToken } from "./src/middlewares/auth";

const app = new Hono();

app
  .get("/", (c) => {
    return c.text(`
      🚀 Welcome to the Pipelines API! 🌟

      Thank you for accessing our API. We're excited to have you on board! If you have any questions or need assistance, feel free to reach out to our support team.

      Happy coding! 🎉
    `);
  })
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000"],
    })
  )
  .use(
    "*",
    csrf({
      origin: ["http://localhost:3000"],
    })
  )
  .use("*", validateToken)
  .use("*", db)
  .use("*")
  .use("/trpc/*", trpc);

export default app;
