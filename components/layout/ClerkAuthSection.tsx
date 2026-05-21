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
        <SignInButton {...signInMode} forceRedirectUrl="/dashboard">
          <button
            type="button"
            className="arc-nav-link !text-[var(--arc-fg)]"
          >
            Login
          </button>
        </SignInButton>
        <span className="arc-mono text-[10px] text-[var(--arc-tertiary)]">/</span>
        <SignUpButton {...signUpMode} forceRedirectUrl="/dashboard">
          <button type="button" className="arc-btn arc-btn-primary !py-1.5 !text-xs">
            Signup
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}
