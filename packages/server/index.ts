import { testRouter } from './src/router/test';
import { router } from './src/trpc';
import { publicProcedure } from './src/trpc';

const appRouter = router({
    hello: publicProcedure.query(() => {
        return "Hello from Hono!";
    }),
    test: testRouter
})

export type AppRouter = typeof appRouter;