import { initTRPC } from "@trpc/server";
import { TRPCContext } from "./context";
import superjson from "superjson";

// middleware
import { isAuthenticated } from "./middlewares";

export const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const router = t.router;

// unprotected procedure
export const publicProcedure = t.procedure;

// user is signed-in procedure
export const authenticatedProcedure = t.procedure.use(isAuthenticated);

export const middleware = t.middleware;
