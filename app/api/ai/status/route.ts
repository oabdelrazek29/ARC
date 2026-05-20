import { NextResponse } from "next/server";

import { hasOpenAI } from "@/lib/ai/openai-client";

export async function GET() {
  return NextResponse.json({ configured: hasOpenAI() });
}
