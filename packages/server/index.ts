import { router } from "./src/trpc";
import { profileRouter } from "./src/routers/profile";
import { schoolRouter } from "./src/routers/school";
import { companyRouter } from "./src/routers/company";
import { createTRPCContext } from "./src/context";
import { pfpRouter } from "./src/routers/pfp";

const appRouter = router({
  profile: profileRouter,
  school: schoolRouter,
  company: companyRouter,
  pfp: pfpRouter,
});

export type AppRouter = typeof appRouter;
export type { TRPCContext } from "./src/context";
export { appRouter, createTRPCContext };
