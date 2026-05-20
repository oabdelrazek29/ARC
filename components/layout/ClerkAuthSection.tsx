"use client";

import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

import { buttonVariants } from "@/components/ui/button";

export function ClerkAuthSection() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <span className="h-8 w-8 animate-pulse rounded-full bg-zinc-800" />
    );
  }

  if (isSignedIn) {
    return <UserButton />;
  }

  return (
    <SignInButton mode="modal">
      <button type="button" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        Sign in
      </button>
    </SignInButton>
  );
}
