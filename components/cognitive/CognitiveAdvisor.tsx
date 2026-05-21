"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";

import { StudyFlashcards } from "@/components/ai/StudyFlashcards";
import { TeachingMarkdown } from "@/components/ai/TeachingMarkdown";
import { ADVISOR_MODE_LABELS } from "@/constants/cognitive";
import { Button } from "@/components/ui/button";
import { useCognitiveSessionMessages } from "@/hooks/use-cognitive";
import type { TeachingPayload } from "@/lib/ai/teaching-format";
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

const QUICK_PROMPTS = [
  "Give me a full lesson on my weakest node",
  "Quizlet-style flashcards for this graph",
  "Resources and a 20-minute study plan",
] as const;

type Props = {
  graph: CognitiveGraph;
};

export function CognitiveAdvisor({ graph }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [extras, setExtras] = useState<Record<string, TeachingPayload>>({});
  const sending = useRef(false);

  const advisorMode = useCognitiveStore((s) => s.advisorMode);
  const realityMode = useCognitiveStore((s) => s.realityMode);
  const setAdvisorMode = useCognitiveStore((s) => s.setAdvisorMode);
  const session = useCognitiveSessionMessages(graph.id);
  const recordSessionMessage = useCognitiveStore((s) => s.recordSessionMessage);
  const applyPatchImmediate = useCognitiveStore((s) => s.applyPatchImmediate);

  const send = useCallback(
    async (textOverride?: string) => {
      const text = (textOverride ?? input).trim();
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
          if (data.teaching) {
            setExtras((e) => ({
              ...e,
              [`${Date.now()}`]: data.teaching as TeachingPayload,
            }));
          }
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
    },
    [
      input,
      graph,
      advisorMode,
      realityMode,
      recordSessionMessage,
      applyPatchImmediate,
    ]
  );

  const teachingByContent = Object.values(extras);
  const lastTeaching = teachingByContent[teachingByContent.length - 1];

  return (
    <div className="flex h-full max-h-[calc(100vh-8rem)] flex-col arc-card">
      <div className="border-b border-[var(--arc-border)] p-4">
        <h3 className="arc-heading text-sm text-[var(--arc-fg)]">
          ARC Professor · Cognitive
        </h3>
        <p className="text-xs leading-relaxed text-[var(--arc-muted)]">
          Reads your graph, teaches with lesson steps, resources, and flashcards.
          Connected to{" "}
          <a href="/companions" className="arc-teaching-link underline">
            voice tutors
          </a>
          .
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
        <div className="mt-2 flex flex-wrap gap-1">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => void send(p)}
              className="arc-advisor-chip text-[10px]"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="arc-cognitive-advisor-messages flex-1 overflow-y-auto p-4">
        {session.length === 0 && (
          <p className="text-sm leading-relaxed text-[var(--arc-muted)]">
            Your mental model is the map — I teach against weak nodes first, then
            suggest tutors and practice.
          </p>
        )}
        {session.map((m, i) => (
          <div
            key={`${m.at}-${i}`}
            className={cn(
              "arc-advisor-bubble mb-3 max-w-full",
              m.role === "user"
                ? "arc-advisor-bubble--user ml-auto"
                : "arc-advisor-bubble--assistant arc-advisor-bubble--teaching mr-0"
            )}
          >
            {m.role === "assistant" ? (
              <TeachingMarkdown text={m.content} />
            ) : (
              <p className="arc-advisor-bubble__text text-sm">{m.content}</p>
            )}
          </div>
        ))}
        {lastTeaching?.flashcards && lastTeaching.flashcards.length > 0 && (
          <StudyFlashcards cards={lastTeaching.flashcards} className="mt-2" />
        )}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-[var(--arc-muted)]">
            <Loader2 className="h-4 w-4 animate-spin text-[var(--arc-accent)]" />
            Building your lesson…
          </div>
        )}
      </div>

      <div className="flex gap-2 border-t border-[var(--arc-border)] p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask for a lesson, resources, or flashcards…"
          className="flex-1 rounded-lg border border-[var(--arc-border)] bg-[var(--arc-bg)] px-3 py-2 text-sm text-[var(--arc-fg)] outline-none focus:border-[var(--arc-fg)]"
        />
        <Button size="icon" onClick={() => send()} disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
