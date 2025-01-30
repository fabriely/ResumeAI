import type { Metadata } from "next";
import NextAuthSessionProvider from "providers/sessionProvider";

import "styles/globals.css";

export const metadata: Metadata = {
  title: "ResumeAI",
  description: "A simple boilerplate for next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
    <html>
      <body>{children}</body>
    </html>
    </NextAuthSessionProvider>
  );
}