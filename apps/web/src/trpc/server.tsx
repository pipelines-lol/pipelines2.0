import type { AppRouter } from "@pipelines/server";
import { createTRPCClient, unstable_httpBatchStreamLink } from "@trpc/client";
import { headers } from "next/headers";
import superjson from "superjson";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import type { Session } from "next-auth";

interface NewSession extends Session {
  accessToken: String;
}

export const trpc = createTRPCClient<AppRouter>({
  links: [
    unstable_httpBatchStreamLink({
      transformer: superjson,
      url: "http://localhost:8787/trpc",
      async headers() {
        const session = await getServerSession(authOptions);
        const token = (session as NewSession)?.accessToken;
        console.log("Token: ", token);
        const h = new Headers();
        h.append("Authorization", `${token}`);
        return h;
      },
    }),
  ],
});
