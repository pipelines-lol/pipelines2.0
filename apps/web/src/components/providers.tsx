"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { TRPCProvider } from "src/trpc";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {<TRPCProvider>{children}</TRPCProvider>}
    </NextThemesProvider>
  );
}
