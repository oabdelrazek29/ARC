import { NextResponse } from "next/server";

import { analyzeGoalWithAI } from "@/lib/ai/generate-with-openai";
import type { GoalContext } from "@/types/arc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      goalId: string;
      rawInput: string;
      context?: GoalContext;
    };

    if (!body.goalId || !body.rawInput?.trim()) {
      return NextResponse.json(
        { error: "goalId and rawInput required" },
        { status: 400 }
      );
    }

    const result = await analyzeGoalWithAI(
      body.goalId,
      body.rawInput.trim(),
      body.context ?? {}
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze goal" },
      { status: 500 }
    );
  }
}
