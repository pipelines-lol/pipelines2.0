import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider, NextAuthProvider } from "src/components/providers";
import { AuthProvider } from "./Providers";
import "./globals.css";
import { NavbarWrapper } from "~/components/NavbarWrapper";
import Footer from "~/components/Footer";
import type { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pipelines.lol",
  description: "Track, visualize, and explore your career path.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    session: Session; // Optional session object
    [key: string]: any; // Any additional props
  };
}

export default function RootLayout({
  children,
  params: { session, ...params },
}: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavbarWrapper />
              {children}
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
