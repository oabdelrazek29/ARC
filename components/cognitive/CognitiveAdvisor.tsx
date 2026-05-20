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
    <div className="flex h-full max-h-[calc(100vh-8rem)] flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60">
      <div className="border-b border-zinc-800 p-4">
        <h3 className="font-bricolage text-sm font-semibold text-white">
          AI Advisor
        </h3>
        <p className="text-xs text-zinc-500">
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
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {ADVISOR_MODE_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {session.length === 0 && (
          <p className="text-sm text-zinc-500">
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
                ? "ml-4 bg-cyan-500/10 text-cyan-100"
                : "mr-4 bg-zinc-800/80 text-zinc-300"
            )}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
        )}
      </div>

      <div className="flex gap-2 border-t border-zinc-800 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Reason with ARC…"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
        />
        <Button size="icon" onClick={send} disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
