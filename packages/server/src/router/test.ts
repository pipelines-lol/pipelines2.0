import { router } from '../trpc';
import { publicProcedure } from '../trpc';

export const testRouter = router({
    hello: publicProcedure.query(async ({ctx}) => {
        return "hello world";
    })
})