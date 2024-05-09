import { router } from '../trpc';
import { publicProcedure } from '../trpc';

export const testRouter = router({
    hello: publicProcedure.query(async ({ctx}) => {
        const users = await ctx.db.profiles.findMany()
        return users;
    })
})