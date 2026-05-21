import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import { ClarityAuthShell } from "@/components/auth/ClarityAuthShell";
import { SetupRequired } from "@/components/lms/SetupRequired";
import { clerkAuthAppearance } from "@/lib/clerk/auth-appearance";
import {
  getClerkAfterAuthUrl,
  isClerkConfigured,
} from "@/lib/clerk/env";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  if (!isClerkConfigured()) {
    return (
      <div className="clarity-auth-wrap">
        <SetupRequired
          title="Sign-in needs Clerk"
          items={[
            "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (starts with pk_)",
            "CLERK_SECRET_KEY (starts with sk_)",
          ]}
          hint="On Vercel: add both keys in Project → Settings → Environment Variables, then redeploy."
        />
      </div>
    );
  }

  const afterAuth = getClerkAfterAuthUrl();

  return (
    <ClarityAuthShell
      title="Welcome Back"
      lead="Continue your learning journey."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-[var(--arc-accent)] hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl={afterAuth}
        fallbackRedirectUrl={afterAuth}
        appearance={clerkAuthAppearance}
      />
    </ClarityAuthShell>
  );
}
