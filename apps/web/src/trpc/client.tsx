"use client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@pipelines/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_httpBatchStreamLink, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

interface NewSession extends Session {
  accessToken: String;
}

export const trpc = createTRPCReact<AppRouter>({});

export function TRPCProvider(props: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const token = (session as NewSession)?.accessToken;
  const user = session?.user;

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: "http://localhost:8787/trpc",
          headers() {
            const h = new Headers();
            h.append("Authorization", `Bearer ${token}`);
            return h;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
