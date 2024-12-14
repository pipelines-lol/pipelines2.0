import { linkedinAuth } from "@hono/oauth-providers/linkedin";
import { Next } from "hono";
import axios from "axios";
import type { HonoContext } from "../../config";

export async function validateToken(c: HonoContext, next: Next) {
  const token = c.req.header("Authorization") ?? "";

  try {
    let tokenValidityBody = await axios.post(
      "https://www.linkedin.com/oauth/v2/introspectToken",
      {
        token: token,
        client_id: c.env.LINKEDIN_CLIENT_ID,
        client_secret: c.env.LINKEDIN_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    c.set("isAuthenticated", tokenValidityBody?.data?.active);
  } catch (err) {
    c.set("isAuthenticated", false);
    return next();
  }

  return next();
}
