import { NextResponse } from "next/server";

import { coachWithAI } from "@/lib/ai/generate-with-openai";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      message: string;
      goal?: string;
      nodeTitle?: string;
      nodeDescription?: string;
    };

    if (!body.message?.trim()) {
      return NextResponse.json({ error: "message required" }, { status: 400 });
    }

    const reply = await coachWithAI(body.message.trim(), {
      goal: body.goal,
      nodeTitle: body.nodeTitle,
      nodeDescription: body.nodeDescription,
    });

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[api/ai/coach]", err);
    return NextResponse.json(
      { error: "Coach unavailable. Check server logs." },
      { status: 500 }
    );
  }
}
