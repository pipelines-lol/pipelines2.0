import type { AppRouter } from "@pipelines/server";
import { createTRPCClient, unstable_httpBatchStreamLink } from "@trpc/client";
import { headers } from "next/headers";
import superjson from "superjson";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    unstable_httpBatchStreamLink({
      transformer: superjson,
      url: "http://localhost:8787/trpc",
      async headers() {
        const nh = headers();
        const h = new Headers(nh);
        h.append("origin", nh.get("x-forwarded-host") ?? "");
        h.append("Authorization", `Bearer`);
        h.append("Access-Control-Allow-Origin", "http://localhost:3000");
        h.append("Access-Control-Allow-Credentials", "true");
        h.append("Access-Control-Allow-Headers", "Content-Type");
        h.append("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
        return h;
      },
    }),
  ],
});
