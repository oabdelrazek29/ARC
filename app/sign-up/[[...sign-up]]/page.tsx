import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import { ClarityAuthShell } from "@/components/auth/ClarityAuthShell";
import { SetupRequired } from "@/components/lms/SetupRequired";
import { clerkAuthAppearance } from "@/lib/clerk/auth-appearance";
import {
  getClerkAfterAuthUrl,
  isClerkConfigured,
} from "@/lib/clerk/env";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  if (!isClerkConfigured()) {
    return (
      <div className="clarity-auth-wrap">
        <SetupRequired
          title="Sign-up needs Clerk"
          items={[
            "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (starts with pk_)",
            "CLERK_SECRET_KEY (starts with sk_)",
          ]}
        />
      </div>
    );
  }

  const afterAuth = getClerkAfterAuthUrl();

  return (
    <ClarityAuthShell
      title="Create Your ARC Workspace"
      lead="Start learning with a connected AI-powered study system."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[var(--arc-accent)] hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl={afterAuth}
        fallbackRedirectUrl={afterAuth}
        appearance={clerkAuthAppearance}
      />
    </ClarityAuthShell>
  );
}
