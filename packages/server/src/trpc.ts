import { initTRPC } from '@trpc/server';
import { TRPCContext } from './context';
import superjson from 'superjson'
 
export const t = initTRPC.context<TRPCContext>().create({
    transformer: superjson
});

export const router = t.router;
export const publicProcedure = t.procedure; // unprotected procedure

