import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@pipelines/database";
import LinkedInProvider from "next-auth/providers/linkedin";
import type { LinkedInProfile } from "next-auth/providers/linkedin";

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
      client: { token_endpoint_auth_method: "client_secret_post" },
      issuer: "https://www.linkedin.com",
      profile: (profile: LinkedInProfile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: process.env.LINKEDIN_SCOPES || "",
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
