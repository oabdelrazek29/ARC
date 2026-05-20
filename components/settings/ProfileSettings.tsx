"use client";

import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";

import { ArcCard } from "@/components/arc-ui/ArcCard";
import { ArcButton } from "@/components/arc-ui/ArcButton";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function ProfileSettings() {
  if (!hasClerk) {
    return (
      <ArcCard title="Profile" description="Sign-in is not configured in this environment.">
        <p className="arc-settings-hint mt-4">
          Add Clerk keys to enable profile management.
        </p>
      </ArcCard>
    );
  }

  return <ProfileSettingsClerk />;
}

function ProfileSettingsClerk() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return <p className="arc-settings-hint">Loading profile…</p>;
  }

  if (!isSignedIn || !user) {
    return (
      <ArcCard
        title="Profile"
        description="Sign in to view and update your learner profile."
      >
        <ArcButton href="/sign-in" className="mt-4">
          Sign in
        </ArcButton>
      </ArcCard>
    );
  }

  const displayName =
    user.fullName ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    "Learner";

  return (
    <>
      <h2 className="arc-heading text-2xl">Profile</h2>
      <p className="arc-settings-hint mt-2">
        How you appear across ARC. Account email and password live under Account.
      </p>

      <ArcCard title="Public profile" className="mt-8">
        <div className="mt-4 flex items-center gap-4">
          {user.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.imageUrl}
              alt=""
              className="h-14 w-14 rounded-full border border-[var(--arc-border)] object-cover"
            />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--arc-border)] bg-[var(--arc-surface)] arc-heading text-lg">
              {displayName.charAt(0)}
            </span>
          )}
          <div>
            <p className="arc-heading text-lg">{displayName}</p>
            <p className="arc-mono text-xs text-[var(--arc-muted)]">
              {user.primaryEmailAddress?.emailAddress ?? "No email"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="arc-settings-field">
            <label htmlFor="profile-first">First name</label>
            <input
              id="profile-first"
              type="text"
              disabled
              value={user.firstName ?? ""}
              readOnly
            />
          </div>
          <div className="arc-settings-field">
            <label htmlFor="profile-last">Last name</label>
            <input
              id="profile-last"
              type="text"
              disabled
              value={user.lastName ?? ""}
              readOnly
            />
          </div>
        </div>

        <p className="arc-settings-hint mt-4">
          To edit your name or avatar, open{" "}
          <Link href="/settings/account" className="text-[var(--arc-fg)] underline">
            Account & security
          </Link>
          .
        </p>
      </ArcCard>

      <ArcCard
        title="Learning identity"
        description="Optional details for personalization."
        className="mt-6"
      >
        <div className="arc-settings-field">
          <label htmlFor="profile-focus">Current focus</label>
          <input
            id="profile-focus"
            type="text"
            placeholder="e.g. Systems design, Spanish B1"
            disabled
          />
        </div>
        <p className="arc-settings-hint">
          Saved preferences for goals and adviser tone will appear here in a future
          update.
        </p>
      </ArcCard>
    </>
  );
}
