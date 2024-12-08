import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@pipelines/database";
import LinkedInProvider from "next-auth/providers/linkedin";

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      authorization: { params: { scope: process.env.LINKEDIN_SCOPES } },
    }),
  ],
});

export { handler as GET, handler as POST };
