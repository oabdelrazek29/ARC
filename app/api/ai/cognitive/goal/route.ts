import { NextResponse } from "next/server";

import { generateCognitiveGraphWithAI } from "@/lib/ai/cognitive-advisor";
import type { CognitiveGoalRequest } from "@/types/cognitive";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CognitiveGoalRequest;
    if (!body?.rawInput?.trim()) {
      return NextResponse.json(
        { error: "rawInput is required" },
        { status: 400 }
      );
    }
    const result = await generateCognitiveGraphWithAI(body);
    return NextResponse.json(result);
  } catch (e) {
    console.error("[cognitive/goal]", e);
    return NextResponse.json(
      { error: "Failed to generate cognitive graph" },
      { status: 500 }
    );
  }
}
