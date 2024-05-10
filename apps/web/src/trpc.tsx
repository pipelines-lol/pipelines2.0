"use client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@pipelines/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>({});

export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `http://localhost:8787/trpc`,
          async headers() {
            return {
              Authorization: `auth`,
            };
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
