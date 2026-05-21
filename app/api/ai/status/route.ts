import { NextResponse } from "next/server";

import { getIntegrationStatus } from "@/lib/integrations/env-status";

export async function GET() {
  const integrations = getIntegrationStatus();
  return NextResponse.json({
    configured: integrations.openai,
    integrations,
  });
}
