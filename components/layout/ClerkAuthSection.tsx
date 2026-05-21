"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

type ClerkAuthSectionProps = {
  className?: string;
  /** Use modal flows instead of dedicated /sign-in and /sign-up pages */
  mode?: "modal" | "redirect";
};

export function ClerkAuthSection({
  className,
  mode = "redirect",
}: ClerkAuthSectionProps) {
  if (!hasClerk) {
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
        <SignInButton {...signInMode}>
          <button
            type="button"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Sign in
          </button>
        </SignInButton>
        <SignUpButton {...signUpMode}>
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
