"use client";

import { createContext, useContext } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import { shadcn } from "@clerk/ui/themes";

const ClerkEnabledContext = createContext(false);

export function useClerkEnabled() {
  return useContext(ClerkEnabledContext);
}

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

type Props = {
  children: React.ReactNode;
  /** Passed from server layout so keys work at runtime on Vercel */
  publishableKey?: string | null;
};

export function AuthProvider({ children, publishableKey }: Props) {
  const key = publishableKey?.trim();
  const enabled = Boolean(key?.startsWith("pk_"));

  if (!enabled) {
    return (
      <ClerkEnabledContext.Provider value={false}>
        {children}
      </ClerkEnabledContext.Provider>
    );
  }

  return (
    <ClerkEnabledContext.Provider value={true}>
      <ClerkProvider
        publishableKey={key}
        ui={ui}
        appearance={arcClerkAppearance}
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
        afterSignOutUrl="/"
      >
        {children}
      </ClerkProvider>
    </ClerkEnabledContext.Provider>
  );
}
