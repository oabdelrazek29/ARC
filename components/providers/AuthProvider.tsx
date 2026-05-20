"use client";

import { ClerkProvider } from "@clerk/nextjs";

const arcClerkAppearance = {
  variables: {
    colorPrimary: "#22d3ee",
    colorBackground: "#09090b",
    colorText: "#fafafa",
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
