import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import { BrandLink } from "@/components/brand/BrandLink";
import { SetupRequired } from "@/components/lms/SetupRequired";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-12">
        <SetupRequired
          title="Sign-in needs Clerk"
          items={[
            "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
            "CLERK_SECRET_KEY",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="arc-split-hero -mx-0 min-h-[calc(100dvh-3.5rem)]">
      <div className="arc-split-editorial">
        <BrandLink className="mb-8" logoSize={36} />
        <p className="arc-colophon">
          § — Return · sign in to your study · Edition MMXXVI
        </p>
        <p className="arc-mono mt-10 text-xs uppercase tracking-[0.2em] text-[var(--arc-muted)]">
          Welcome back
        </p>
        <h1 className="arc-display mt-4 max-w-md">
          Pick up
          <br />
          where you left off.
        </h1>
        <p className="arc-lead mt-6 max-w-md text-base">
          Your graphs, paths, and cognitive maps are exactly as you left them.
          Sign in and the desk is set.
        </p>
        <p className="arc-mono mt-10 text-sm text-[var(--arc-muted)]">
          New to ARC?{" "}
          <Link
            href="/cognitive/new"
            className="text-[var(--arc-fg)] underline underline-offset-2"
          >
            Open a new account →
          </Link>
        </p>
      </div>

      <div className="arc-split-panel">
        <div className="arc-form-card w-full max-w-md">
          <p className="arc-form-card__label">Form A · Sign in</p>
          <p className="arc-mono text-[10px] text-[var(--arc-muted)]">1 of 1</p>
          <h2 className="arc-heading mt-4 text-xl">Sign in.</h2>
          <div className="mt-6 [&_.cl-rootBox]:w-full [&_.cl-card]:shadow-none [&_.cl-card]:border-0 [&_.cl-card]:bg-transparent [&_.cl-card]:p-0">
            <SignIn />
          </div>
          <p className="arc-mono mt-8 text-[10px] leading-relaxed text-[var(--arc-muted)]">
            Sessions persist · Your data stays on your account.
          </p>
        </div>
      </div>
    </div>
  );
}
