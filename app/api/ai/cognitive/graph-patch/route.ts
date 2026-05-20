import { NextResponse } from "next/server";

import { applyGraphPatch } from "@/lib/cognitive/graph-diff";
import type { CognitiveGraph, GraphPatch } from "@/types/cognitive";

/** Validates and merges a graph patch server-side (optional persistence hook) */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      graph: CognitiveGraph;
      patch: GraphPatch;
    };

    if (!body?.graph || !body?.patch) {
      return NextResponse.json(
        { error: "graph and patch are required" },
        { status: 400 }
      );
    }

    const graph = applyGraphPatch(body.graph, body.patch);
    return NextResponse.json({ graph });
  } catch (e) {
    console.error("[cognitive/graph-patch]", e);
    return NextResponse.json(
      { error: "Patch failed" },
      { status: 500 }
    );
  }
}
