import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { SetupRequired } from "@/components/lms/SetupRequired";
import {
  getClerkAfterAuthUrl,
  isClerkConfigured,
} from "@/lib/clerk/env";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  if (!isClerkConfigured()) {
    return (
      <div className="arc-auth-page arc-auth-page--setup">
        <SetupRequired
          title="Sign-up needs Clerk"
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
      colophon="§ — Begin · create your study account · Edition MMXXVI"
      eyebrow="Welcome"
      headline={
        <>
          Start your
          <br />
          learning desk.
        </>
      }
      lead="One account for paths, graphs, and cognitive maps. Sign up and your workspace is ready."
      formLabel="Sign up"
      formTitle="Create your account"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="arc-auth-inline-link">
            Sign in →
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
      />
    </AuthPageShell>
  );
}
