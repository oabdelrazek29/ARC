"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

const arcClerkAppearance = {
  theme: shadcn,
  variables: {
    colorPrimary: "#c9b99a",
    colorBackground: "#111111",
    colorText: "#f0ede6",
    colorInputBackground: "#0a0a0a",
    borderRadius: "2px",
  },
  elements: {
    card: "shadow-none",
    formButtonPrimary:
      "bg-[var(--arc-btn-primary-bg)] text-[var(--arc-btn-primary-fg)] border-0 rounded-sm",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <ClerkProvider appearance={arcClerkAppearance}>{children}</ClerkProvider>
    );
  }
  return <>{children}</>;
}
