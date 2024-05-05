import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';

export async function createContext(opts: CreateNextContextOptions) {
    const session = await getSession({ req: opts.req });
   
    return {
      ...opts
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;