"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { MiniGraphSvg } from "@/components/home/MiniGraphSvg";
import { Button } from "@/components/ui/button";
import {
  buildPreviewGraph,
  tickPreviewGraph,
  type PreviewGraph,
} from "@/lib/simulation/preview-graph";

function TryArcSandboxInner() {
  const [input, setInput] = useState("I want to learn machine learning");
  const [preview, setPreview] = useState<PreviewGraph | null>(null);
  const runPreview = useCallback(() => {
    const goal = input.trim() || "I want to learn something new";
    setPreview(buildPreviewGraph(goal));
  }, [input]);

  useEffect(() => {
    if (!preview) return;
    let tick = 0;
    const id = window.setInterval(() => {
      tick += 1;
      setPreview((p) => (p ? tickPreviewGraph(p, tick) : p));
    }, 1800);
    return () => window.clearInterval(id);
  }, [preview?.goal]);

  return (
    <section className="rounded-2xl border border-cyan-500/20 bg-zinc-950/70 p-6">
      <h2 className="font-bricolage text-lg font-semibold text-white">
        Try ARC
      </h2>
      <p className="mt-1 text-xs text-zinc-500">
        Preview sandbox · no sign-in · no API
      </p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && runPreview()}
        className="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/40"
        placeholder="I want to learn…"
      />
      <Button className="mt-3 w-full" onClick={runPreview}>
        Simulate preview
      </Button>

      {preview && (
        <div className="mt-6 space-y-4">
          <MiniGraphSvg
            nodes={preview.nodes}
            edges={preview.edges}
            className="h-44 w-full rounded-lg border border-zinc-800/60 bg-zinc-900/50"
            heatmap
          />
          <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-2 text-xs text-violet-200/90">
            <span className="text-[10px] uppercase text-violet-400/80">
              Advisor (simulated)
            </span>
            <p className="mt-1 leading-relaxed">{preview.advisorLine}</p>
          </div>
          <Link href="/cognitive/new">
            <Button variant="outline" className="w-full">
              Enter full cognitive system →
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}

export const TryArcSandbox = memo(TryArcSandboxInner);
