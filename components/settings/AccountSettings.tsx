"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { ArcCard } from "@/components/arc-ui/ArcCard";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function AccountSettings() {
  if (!hasClerk) {
    return (
      <ArcCard title="Account" description="Clerk is not configured.">
        <p className="arc-settings-hint mt-4">Add Clerk keys to manage sign-in and security.</p>
      </ArcCard>
    );
  }

  return <AccountSettingsClerk />;
}

function AccountSettingsClerk() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <p className="arc-settings-hint">Loading account…</p>;
  }

  if (!isSignedIn) {
    return (
      <>
        <h2 className="arc-heading text-2xl">Account & security</h2>
        <p className="arc-settings-hint mt-2">
          Email, password, connected accounts, and two-factor authentication.
        </p>
        <ArcCard title="Sign in required" className="mt-8">
          <p className="arc-settings-hint">
            Sign in to manage your ARC account credentials.
          </p>
          <ArcButton href="/sign-in" className="mt-4">
            Sign in
          </ArcButton>
        </ArcCard>
      </>
    );
  }

  return (
    <>
      <h2 className="arc-heading text-2xl">Account & security</h2>
      <p className="arc-settings-hint mt-2">
        Update email, password, and security options. Managed securely by Clerk.
      </p>

      <div className="mt-8 overflow-hidden rounded-sm border border-[var(--arc-border)]">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-0 w-full max-w-none",
            },
          }}
        />
      </div>

      <p className="arc-settings-hint mt-6">
        <Link href="/settings/profile" className="underline">
          Back to profile
        </Link>
      </p>
    </>
  );
}
