import { SignIn } from "@clerk/nextjs";

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
    <main className="flex min-h-[60vh] items-center justify-center py-12">
      <SignIn />
    </main>
  );
}
