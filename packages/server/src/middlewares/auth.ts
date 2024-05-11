import { linkedinAuth } from '@hono/oauth-providers/linkedin'
import { Next } from "hono";

import { TRPCError } from '@trpc/server';
import type { HonoContext } from "../../config";

import { middleware } from '../trpc';

export async function auth(c: HonoContext, next: Next) {
  return linkedinAuth({
    client_id: c.env.LINKEDIN_ID,
    client_secret: c.env.LINKEDIN_SECRET,
    scope: ['email', 'openid', 'profile'],
  })(c, next)
}


export const isAuthenticated = middleware((opts) => {
    const user = opts.ctx.user;
  
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
  
    return opts.next({
      ctx: {
        ...opts.ctx,
        user: {
          ...user,
          isAdmin: user.email?.endsWith("@knighthacks.org"),
        },
      },
    });
});
