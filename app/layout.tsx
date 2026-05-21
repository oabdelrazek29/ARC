import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getClerkPublishableKey } from "@/lib/clerk/env";

import "./globals.css";
import "./arc-theme.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://arc-oabdelrazek29s-projects.vercel.app";

/** Bust aggressive browser favicon cache after logo updates */
const iconVersion = "arc-mark-v3";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "ARC",
  title: {
    default: "ARC — Cognitive Learning OS",
    template: "%s | ARC",
  },
  description:
    "Learn with structure, understand with clarity. ARC builds a path that adapts as you go.",
  icons: {
    icon: [{ url: `/icon.svg?${iconVersion}`, type: "image/svg+xml" }],
    apple: [{ url: `/apple-icon.svg?${iconVersion}`, type: "image/svg+xml" }],
    shortcut: [{ url: `/arc-mark.svg?${iconVersion}`, type: "image/svg+xml" }],
  },
  openGraph: {
    siteName: "ARC",
    title: "ARC — Cognitive Learning OS",
    description:
      "Learn with structure, understand with clarity. ARC builds a path that adapts as you go.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC — Cognitive Learning OS",
    description:
      "Learn with structure, understand with clarity. ARC builds a path that adapts as you go.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = getClerkPublishableKey();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider publishableKey={clerkPublishableKey}>
            <Navbar />
            <main className="arc-main">{children}</main>
            <SiteFooter />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
