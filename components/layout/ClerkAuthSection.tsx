"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { useClerkEnabled } from "@/components/providers/AuthProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ClerkAuthSectionProps = {
  className?: string;
  mode?: "modal" | "redirect";
};

export function ClerkAuthSection({
  className,
  mode = "redirect",
}: ClerkAuthSectionProps) {
  const clerkEnabled = useClerkEnabled();

  if (!clerkEnabled) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Link
          href="/sign-in"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Sign up
        </Link>
      </div>
    );
  }

  const signInMode = mode === "modal" ? { mode: "modal" as const } : {};
  const signUpMode = mode === "modal" ? { mode: "modal" as const } : {};

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Show when="signed-out">
        <SignInButton {...signInMode} forceRedirectUrl="/learn">
          <button
            type="button"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Sign in
          </button>
        </SignInButton>
        <SignUpButton {...signUpMode} forceRedirectUrl="/learn">
          <button
            type="button"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Sign up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}
