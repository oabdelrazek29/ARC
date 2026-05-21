import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { SetupRequired } from "@/components/lms/SetupRequired";
import {
  getClerkAfterAuthUrl,
  isClerkConfigured,
} from "@/lib/clerk/env";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  if (!isClerkConfigured()) {
    return (
      <div className="arc-auth-page arc-auth-page--setup">
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
    <AuthPageShell
      colophon="§ — Return · sign in to your study · Edition MMXXVI"
      eyebrow="Welcome back"
      headline={
        <>
          Pick up
          <br />
          where you left off.
        </>
      }
      lead="Your graphs, paths, and cognitive maps are exactly as you left them. Sign in and the desk is set."
      formLabel="Sign in"
      formTitle="Welcome back"
      footer={
        <>
          New to ARC?{" "}
          <Link href="/sign-up" className="arc-auth-inline-link">
            Create an account →
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
      />
    </AuthPageShell>
  );
}
