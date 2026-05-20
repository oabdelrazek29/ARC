"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useArcStore } from "@/store/arc-store";
import type {
  AIGenerationResult,
  ClarificationQuestion,
  GoalContext,
} from "@/types/arc";

export function GoalWizard() {
  const router = useRouter();
  const addGoal = useArcStore((s) => s.addGoal);
  const updateGoal = useArcStore((s) => s.updateGoal);
  const setTree = useArcStore((s) => s.setTree);

  const [input, setInput] = useState("");
  const [context, setContext] = useState<GoalContext>({});
  const [questions, setQuestions] = useState<ClarificationQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [goalId, setGoalId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiReady, setAiReady] = useState(false);

  useEffect(() => {
    fetch("/api/ai/status")
      .then((r) => r.json())
      .then((d: { configured?: boolean }) => setAiReady(Boolean(d.configured)))
      .catch(() => setAiReady(false));
  }, []);

  const runGeneration = useDebouncedCallback(
    async (id: string, raw: string, ctx: GoalContext) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ai/goal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ goalId: id, rawInput: raw, context: ctx }),
        });
        if (!res.ok) throw new Error("API error");
        const result = (await res.json()) as AIGenerationResult;
        if (result.needsClarification && result.questions) {
          setQuestions(result.questions);
          updateGoal(id, { context: ctx, contextComplete: false });
        } else if (result.tree) {
          setTree(result.tree);
          router.push(`/trees/${result.tree.id}`);
        }
      } catch {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
    400
  );

  const handleSubmitGoal = () => {
    if (!input.trim()) return;
    const id = crypto.randomUUID();
    setGoalId(id);
    addGoal({
      id,
      rawInput: input.trim(),
      title: input.trim(),
      context: {},
      contextComplete: false,
      createdAt: new Date().toISOString(),
    });
    runGeneration(id, input.trim(), {});
  };

  const handleContextSubmit = () => {
    if (!goalId) return;
    setQuestions([]);
    runGeneration(goalId, input.trim(), context);
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div>
        <h1 className="font-bricolage text-2xl font-bold text-white">
          What do you want to master?
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          ARC analyzes your goal, asks clarifying questions when needed, then
          generates your skill tree once — no repeated AI calls.
        </p>
        {aiReady && (
          <p className="mt-2 text-xs text-emerald-400/90">
            OpenAI connected — trees & coach use your key (server-side only).
          </p>
        )}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='e.g. "I want to learn machine learning for a data science job"'
        rows={3}
        className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
      />

      {questions.length > 0 && (
        <div className="space-y-4 border-t border-zinc-800 pt-4">
          <p className="text-sm font-medium text-cyan-300">
            A few questions before we build your tree
          </p>
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <label className="text-sm text-zinc-300">{q.question}</label>
              {q.type === "select" && q.options ? (
                <select
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) return;
                    setContext((c) => ({
                      ...c,
                      ...(q.id === "level" && {
                        level: val as GoalContext["level"],
                      }),
                      ...(q.id === "objective" && { objective: val }),
                      ...(q.id === "preference" && {
                        preference: val as GoalContext["preference"],
                      }),
                    }));
                  }}
                >
                  <option value="">Select…</option>
                  {q.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={q.type === "number" ? "number" : "text"}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (q.id === "hoursPerWeek") {
                      setContext((c) => ({
                        ...c,
                        hoursPerWeek: val ? Number(val) : undefined,
                      }));
                    }
                  }}
                />
              )}
            </div>
          ))}
          <Button onClick={handleContextSubmit} disabled={loading}>
            Generate skill tree
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      {questions.length === 0 && (
        <Button
          onClick={handleSubmitGoal}
          disabled={loading || !input.trim()}
          className="w-full gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {loading ? "Analyzing goal…" : "Build my skill tree"}
        </Button>
      )}
    </div>
  );
}
