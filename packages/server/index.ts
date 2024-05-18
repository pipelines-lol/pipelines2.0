import { router } from "./src/trpc";
import { profileRouter } from "./src/routers/profile";

const appRouter = router({
  profile: profileRouter
});

export type AppRouter = typeof appRouter;
export type { TRPCContext } from "./src/context";
export { appRouter };
