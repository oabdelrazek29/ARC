"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";

import { ADVISOR_MODE_LABELS } from "@/constants/cognitive";
import { Button } from "@/components/ui/button";
import { useCognitiveSessionMessages } from "@/hooks/use-cognitive";
import { useCognitiveStore } from "@/store/cognitive-store";
import type { AdvisorMode, CognitiveGraph } from "@/types/cognitive";
import { cn } from "@/lib/utils";

const MODES: AdvisorMode[] = [
  "tutor",
  "debug",
  "socratic",
  "builder",
  "analyst",
];

type Props = {
  graph: CognitiveGraph;
};

export function CognitiveAdvisor({ graph }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sending = useRef(false);

  const advisorMode = useCognitiveStore((s) => s.advisorMode);
  const realityMode = useCognitiveStore((s) => s.realityMode);
  const setAdvisorMode = useCognitiveStore((s) => s.setAdvisorMode);
  const session = useCognitiveSessionMessages(graph.id);
  const recordSessionMessage = useCognitiveStore((s) => s.recordSessionMessage);
  const applyPatchImmediate = useCognitiveStore((s) => s.applyPatchImmediate);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || sending.current) return;
    sending.current = true;
    setLoading(true);
    recordSessionMessage(graph.id, "user", text);
    setInput("");

    try {
      const res = await fetch("/api/ai/cognitive/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          graph,
          message: text,
          mode: advisorMode,
          realityMode,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        recordSessionMessage(graph.id, "assistant", data.reply);
      }
      if (data.patch) {
        applyPatchImmediate(data.patch);
      }
    } catch {
      recordSessionMessage(
        graph.id,
        "assistant",
        "Advisor unavailable. Check OPENAI_API_KEY or try again."
      );
    } finally {
      setLoading(false);
      sending.current = false;
    }
  }, [
    input,
    graph,
    advisorMode,
    realityMode,
    recordSessionMessage,
    applyPatchImmediate,
  ]);

  return (
    <div className="flex h-full max-h-[calc(100vh-8rem)] flex-col arc-card">
      <div className="border-b border-[var(--arc-border)] p-4">
        <h3 className="arc-heading text-sm text-[var(--arc-fg)]">
          AI Advisor
        </h3>
        <p className="text-xs text-[var(--arc-muted)]">
          Reads your graph before responding · updates after each turn
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setAdvisorMode(m)}
              className={cn(
                "rounded px-2 py-0.5 text-[10px]",
                advisorMode === m
                  ? "bg-violet-500/25 text-violet-200"
                  : "text-[var(--arc-muted)] hover:text-[var(--arc-fg)]"
              )}
            >
              {ADVISOR_MODE_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {session.length === 0 && (
          <p className="text-sm text-[var(--arc-muted)]">
            Ask about weak nodes, misconceptions, or how to restructure your
            mental model.
          </p>
        )}
        {session.map((m, i) => (
          <div
            key={`${m.at}-${i}`}
            className={cn(
              "rounded-lg px-3 py-2 text-sm",
              m.role === "user"
                ? "ml-4 border border-[var(--arc-border)] bg-[var(--arc-card)]"
                : "mr-4 bg-[var(--arc-card)] text-[var(--arc-fg)]"
            )}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin text-[var(--arc-accent)]" />
        )}
      </div>

      <div className="flex gap-2 border-t border-[var(--arc-border)] p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Reason with ARC…"
          className="flex-1 rounded-lg border border-[var(--arc-border)] bg-[var(--arc-bg)] px-3 py-2 text-sm text-[var(--arc-fg)] outline-none focus:border-[var(--arc-fg)]"
        />
        <Button size="icon" onClick={send} disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
