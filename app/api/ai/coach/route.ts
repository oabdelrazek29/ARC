import { NextResponse } from "next/server";

import { professorTeach } from "@/lib/ai/professor-teach";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      message: string;
      goal?: string;
      topic?: string;
      nodeTitle?: string;
      nodeDescription?: string;
      graphSummary?: string;
      weakNodes?: string[];
      graphId?: string;
      mode?: string;
    };

    if (!body.message?.trim()) {
      return NextResponse.json({ error: "message required" }, { status: 400 });
    }

    const channel =
      body.mode === "instructor" ? "instructor" : ("home" as const);

    const result = await professorTeach(body.message.trim(), {
      goal: body.goal,
      topic: body.topic ?? body.nodeTitle,
      graphSummary: body.graphSummary,
      weakNodes: body.weakNodes,
      mode: channel,
    });

    return NextResponse.json({
      reply: result.markdown,
      payload: result.payload,
      demo: result.demo,
    });
  } catch (err) {
    console.error("[api/ai/coach]", err);
    return NextResponse.json(
      { error: "Coach unavailable. Check server logs." },
      { status: 500 }
    );
  }
}
