import { testRouter } from "./src/routers/test";
import { router } from "./src/trpc";

const appRouter = router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
export type { TRPCContext } from "./src/context";
export { appRouter };
