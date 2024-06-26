import { LinkedInUser, linkedinAuth } from '@hono/oauth-providers/linkedin'
import { Next } from "hono";

import { TRPCError } from '@trpc/server';
import type { HonoContext } from "../../config";
import { BaseMiddlewareFunction } from '../types/middleware';

export async function auth(c: HonoContext, next: Next) {
  return linkedinAuth({
    client_id: c.env.LINKEDIN_ID,
    client_secret: c.env.LINKEDIN_SECRET,
    scope: ['email', 'openid', 'profile'],
  })(c, next)
}


export const isAuthenticated: BaseMiddlewareFunction<
  {
    user?: Partial<LinkedInUser> | undefined
  }
> = async ({ ctx, next }) => {
  const user = ctx.user;

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  return next({
    ctx: {
      ...ctx,
      user: {
        ...user,
        // isAdmin: user.email?.endsWith("@pipelines.lol"), - Possible way to have admins
      },
    },
  });
};
