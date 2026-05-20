import { NextResponse } from "next/server";

import { adviseWithCognitiveAI } from "@/lib/ai/cognitive-advisor";
import type {
  AdvisorMode,
  CognitiveGraph,
  LearningRealityMode,
} from "@/types/cognitive";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      graph: CognitiveGraph;
      message: string;
      mode?: AdvisorMode;
      realityMode?: LearningRealityMode;
    };

    if (!body?.graph || !body?.message?.trim()) {
      return NextResponse.json(
        { error: "graph and message are required" },
        { status: 400 }
      );
    }

    const result = await adviseWithCognitiveAI(
      body.graph,
      body.message,
      body.mode ?? "tutor",
      body.realityMode ?? "exploration"
    );

    return NextResponse.json(result);
  } catch (e) {
    console.error("[cognitive/advisor]", e);
    return NextResponse.json(
      { error: "Advisor request failed" },
      { status: 500 }
    );
  }
}
