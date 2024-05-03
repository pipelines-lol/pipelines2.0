import { testRouter } from './src/router/test';
import { router } from './src/trpc';

const appRouter = router({
    test: testRouter
})

export type AppRouter = typeof appRouter;