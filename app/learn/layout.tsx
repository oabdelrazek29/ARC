"use client";

import { PlatformShell } from "@/components/platform/PlatformShell";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PlatformShell>{children}</PlatformShell>;
}
