import { isOpenAIConfigured } from "@/lib/ai/env";
import { isClerkConfigured } from "@/lib/clerk/env";

export type IntegrationStatus = {
  openai: boolean;
  clerk: boolean;
  supabase: boolean;
  vapi: boolean;
  stripe: boolean;
  mux: boolean;
  uploadthing: boolean;
};

function env(name: string): string | undefined {
  const v = process.env[name];
  return v?.trim() || undefined;
}

/** Server-side integration checks (NextLMS-style services + ARC core). */
export function getIntegrationStatus(): IntegrationStatus {
  return {
    openai: isOpenAIConfigured(),
    clerk: isClerkConfigured(),
    supabase: Boolean(
      env("NEXT_PUBLIC_SUPABASE_URL") && env("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    ),
    vapi: Boolean(env("NEXT_PUBLIC_VAPI_WEB_TOKEN")),
    stripe: Boolean(env("STRIPE_API_KEY") && env("STRIPE_WEBHOOK_SECRET")),
    mux: Boolean(env("MUX_TOKEN_ID") && env("MUX_TOKEN_SECRET")),
    uploadthing: Boolean(env("UPLOADTHING_SECRET") && env("UPLOADTHING_APP_ID")),
  };
}

export const INTEGRATION_LABELS: Record<keyof IntegrationStatus, string> = {
  openai: "OpenAI",
  clerk: "Clerk",
  supabase: "Supabase",
  vapi: "Vapi",
  stripe: "Stripe",
  mux: "Mux",
  uploadthing: "UploadThing",
};
