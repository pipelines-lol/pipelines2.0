import { router } from "./src/trpc";
import { profileRouter } from "./src/routers/profile";
import { schoolRouter } from "./src/routers/school";
import { companyRouter } from "./src/routers/company";

const appRouter = router({
  profile: profileRouter,
  school: schoolRouter,
  company: companyRouter
});

export type AppRouter = typeof appRouter;
export type { TRPCContext } from "./src/context";
export { appRouter };
