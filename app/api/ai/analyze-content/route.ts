import { NextResponse } from "next/server";

import { analyzeEducationalContent } from "@/lib/ai/analyze-content";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      content?: string;
      title?: string;
      kind?: "file" | "lecture" | "note";
    };

    if (!body.content?.trim()) {
      return NextResponse.json({ error: "content required" }, { status: 400 });
    }

    const result = await analyzeEducationalContent(body.content.trim(), {
      title: body.title?.trim() || "Uploaded material",
      kind: body.kind ?? "file",
    });

    return NextResponse.json({
      reply: result.markdown,
      payload: result.payload,
      demo: result.demo,
    });
  } catch (err) {
    console.error("[api/ai/analyze-content]", err);
    return NextResponse.json(
      { error: "Analysis unavailable." },
      { status: 500 }
    );
  }
}
