import { NextResponse } from "next/server";

import { tutorSession } from "@/lib/ai/tutor-session";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      message: string;
      history?: { role: "user" | "assistant"; content: string }[];
      attachments?: {
        name: string;
        type: string;
        text?: string;
        dataUrl?: string;
      }[];
      courseContext?: string;
    };

    if (!body.message?.trim() && !body.attachments?.length) {
      return NextResponse.json(
        { error: "message or attachment required" },
        { status: 400 }
      );
    }

    const result = await tutorSession(
      body.message?.trim() || "Help me understand the attached material.",
      {
        history: body.history,
        attachments: body.attachments,
        courseContext: body.courseContext,
      }
    );

    return NextResponse.json({
      payload: result.payload,
      demo: result.demo,
      configured: result.configured,
      error: result.error,
    });
  } catch (err) {
    console.error("[api/ai/tutor]", err);
    return NextResponse.json(
      { error: "Tutor unavailable. Check server logs." },
      { status: 500 }
    );
  }
}
