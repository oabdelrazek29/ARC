import { NextResponse } from "next/server";

import { getOpenAIModel, isOpenAIConfigured } from "@/lib/ai/env";
import { getIntegrationStatus } from "@/lib/integrations/env-status";

export async function GET() {
  const integrations = getIntegrationStatus();
  const openai = isOpenAIConfigured();
  return NextResponse.json({
    configured: openai,
    openai: {
      configured: openai,
      model: getOpenAIModel(),
      hint: openai
        ? null
        : "Set OPENAI_API_KEY in .env.local (dev) or Vercel Environment Variables (production), then restart.",
    },
    integrations: { ...integrations, openai },
  });
}
