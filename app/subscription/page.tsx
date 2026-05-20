import { PricingTable } from "@clerk/nextjs";

import { SetupRequired } from "@/components/lms/SetupRequired";

const Subscription = () => {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="arc-lms-page flex min-h-[50vh] items-center justify-center">
        <SetupRequired
          title="Plans need Clerk Billing"
          items={[
            "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
            "CLERK_SECRET_KEY",
            "Enable Billing in Clerk dashboard",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="arc-lms-page">
      <h1 className="font-bricolage mb-8 text-3xl font-bold text-white">
        ARC plans
      </h1>
      <PricingTable />
    </div>
  );
};

export default Subscription;
