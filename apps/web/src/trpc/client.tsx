"use client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@pipelines/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_httpBatchStreamLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>({});

export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        unstable_httpBatchStreamLink({
          transformer: superjson,
          url: "http://localhost:8787/trpc",
          async headers() {
            const h = new Headers();
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
