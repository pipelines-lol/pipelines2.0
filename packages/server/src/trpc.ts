import { initTRPC } from "@trpc/server";
import { TRPCContext } from "./context";
import superjson from "superjson";
import { TRPCError } from "@trpc/server";

export const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const router = t.router;

// unprotected procedure
export const publicProcedure = t.procedure;

// user is signed-in procedure
export const authenticatedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.isAuthenticated) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next();
});
