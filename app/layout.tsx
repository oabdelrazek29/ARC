import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Syne } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

import "./globals.css";
import "./arc-theme.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://arc-oabdelrazek29s-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "ARC",
  title: {
    default: "ARC — Cognitive Learning OS",
    template: "%s | ARC",
  },
  description:
    "Learn anything, but actually understand it. ARC builds a path that adapts as you go.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    siteName: "ARC",
    title: "ARC — Cognitive Learning OS",
    description:
      "Learn anything, but actually understand it. ARC builds a path that adapts as you go.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC — Cognitive Learning OS",
    description:
      "Learn anything, but actually understand it. ARC builds a path that adapts as you go.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="arc-main">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
