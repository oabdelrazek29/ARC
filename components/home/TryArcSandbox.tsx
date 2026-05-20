"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { MiniGraphSvg } from "@/components/home/MiniGraphSvg";
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
    <section className="arc-card border-[var(--arc-accent)]/20">
      <h2 className="arc-heading text-lg">Try ARC</h2>
      <p className="mt-1 text-xs text-[var(--arc-muted)]">
        Preview sandbox · no sign-in · no API
      </p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && runPreview()}
        className="mt-4 w-full rounded-lg border border-[var(--arc-border)] bg-[var(--arc-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--arc-accent)]"
        placeholder="I want to learn…"
      />
      <ArcButton className="mt-3 w-full" onClick={runPreview}>
        Simulate preview
      </ArcButton>

      {preview && (
        <div className="mt-6 space-y-4">
          <MiniGraphSvg
            nodes={preview.nodes}
            edges={preview.edges}
            className="h-44 w-full rounded-xl border border-[var(--arc-border)]"
            heatmap
          />
          <div className="rounded-xl border border-[var(--arc-accent)]/20 bg-[var(--arc-accent)]/5 px-3 py-2 text-xs">
            <span className="arc-mono text-[10px] uppercase text-[var(--arc-accent)]">
              Advisor (simulated)
            </span>
            <p className="mt-1 leading-relaxed text-[var(--arc-muted)]">
              {preview.advisorLine}
            </p>
          </div>
          <ArcButton href="/cognitive/new" variant="secondary" className="w-full">
            Enter full cognitive system →
          </ArcButton>
        </div>
      )}
    </section>
  );
}

export const TryArcSandbox = memo(TryArcSandboxInner);
