import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { LayoutChrome } from "@/components/layout/LayoutChrome";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getClerkPublishableKey } from "@/lib/clerk/env";

import "./globals.css";
import "./arc-theme.css";
import "./arc-clarity.css";

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://arc-oabdelrazek29s-projects.vercel.app";

/** Bust aggressive browser favicon cache after logo updates */
const iconVersion = "arc-logo-v4";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "ARC",
  title: {
    default: "ARC — AI Learning System",
    template: "%s | ARC",
  },
  description:
    "The AI learning system built for deep study — structured courses, intelligent tutoring, and adaptive learning in one calm workspace.",
  icons: {
    icon: [
      {
        url: `/images/logo-icon.png?${iconVersion}`,
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: `/images/logo-apple.png?${iconVersion}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: `/images/logo-nav.png?${iconVersion}`,
        type: "image/png",
      },
    ],
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
        className={`${fraunces.variable} ${jetbrainsMono.variable} ${inter.variable} arc-root antialiased`}
      >
        <ThemeProvider>
          <AuthProvider publishableKey={clerkPublishableKey}>
            <LayoutChrome>{children}</LayoutChrome>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
