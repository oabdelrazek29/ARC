import { PricingTable } from "@clerk/nextjs";

import { SetupRequired } from "@/components/lms/SetupRequired";
import { isClerkConfigured } from "@/lib/clerk/env";

export const dynamic = "force-dynamic";

export default function SubscriptionPage() {
  if (!isClerkConfigured()) {
    return (
      <div className="arc-page flex min-h-[50vh] items-center justify-center px-4">
        <SetupRequired
          title="Plans need Clerk"
          items={[
            "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
            "CLERK_SECRET_KEY",
            "Enable Billing in Clerk dashboard (optional)",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="arc-page arc-section">
      <h1 className="arc-heading text-3xl">ARC plans</h1>
      <p className="arc-lead mt-2 text-sm">Managed by Clerk Billing.</p>
      <div className="mt-8">
        <PricingTable />
      </div>
    </div>
  );
}
