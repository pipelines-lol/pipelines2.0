import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@pipelines/database";
import LinkedInProvider from "next-auth/providers/linkedin";
import type { LinkedInProfile } from "next-auth/providers/linkedin";
import type { Session, Account, Profile, User, AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

interface SessionProps {
  session: any;
  token: any;
  user: any;
}

interface JWTProps {
  token: JWT;
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: "update" | "signIn" | "signUp" | undefined;
  isNewUser?: boolean | undefined;
  session?: any;
}

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const authOptions: AuthOptions = {
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
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile, session }: JWTProps): Promise<JWT> {
      // Persist the OAuth access_token and user ID to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.email = profile.email;
        token.name = profile.name;
        token.sub = profile.sub;
      }

      return token;
    },
    async session({ session, token, user }: SessionProps): Promise<any> {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
