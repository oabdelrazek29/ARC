"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useArcStore } from "@/store/arc-store";
import { usePlatformStore } from "@/store/platform-store";
import type {
  AIGenerationResult,
  ClarificationQuestion,
  GoalContext,
} from "@/types/arc";

function inferContextFromAnswers(
  answers: Record<string, string>
): Partial<GoalContext> {
  const joined = Object.values(answers).join(" ").toLowerCase();
  const patch: Partial<GoalContext> = {};

  if (/\bbeginner\b/.test(joined)) patch.level = "beginner";
  else if (/\badvanced\b/.test(joined)) patch.level = "advanced";
  else if (/\bintermediate\b/.test(joined)) patch.level = "intermediate";

  if (/\b(job|career|hire)\b/.test(joined)) patch.objective = "Get a job";
  else if (/\b(project|build)\b/.test(joined)) patch.objective = "Build a project";
  else if (/\b(research|academic|exam|course)\b/.test(joined))
    patch.objective = "Research / academics";

  if (/\bpractical|application|hands-on\b/.test(joined)) patch.preference = "projects";
  else if (/\btheor(y|etical)\b/.test(joined)) patch.preference = "theory";
  else if (/\bboth\b/.test(joined)) patch.preference = "balanced";

  const hours = joined.match(/(\d+)\s*(hours?|hrs?)/i);
  if (hours) patch.hoursPerWeek = Number(hours[1]);

  return patch;
}

export function GoalWizard() {
  const router = useRouter();
  const addGoal = useArcStore((s) => s.addGoal);
  const updateGoal = useArcStore((s) => s.updateGoal);
  const setTree = useArcStore((s) => s.setTree);
  const recordEvent = usePlatformStore((s) => s.recordEvent);

  const [input, setInput] = useState("");
  const [context, setContext] = useState<GoalContext>({});
  const [questions, setQuestions] = useState<ClarificationQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
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

  const runGeneration = useCallback(
    async (id: string, raw: string, ctx: GoalContext) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ai/goal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ goalId: id, rawInput: raw, context: ctx }),
        });

        const result = (await res.json()) as AIGenerationResult & {
          error?: string;
        };

        if (!res.ok) {
          throw new Error(result.error ?? `Request failed (${res.status})`);
        }

        if (result.needsClarification && result.questions?.length) {
          setQuestions(result.questions);
          setAnswers({});
          updateGoal(id, { context: ctx, contextComplete: false });
          return;
        }

        if (result.tree) {
          setQuestions([]);
          setTree(result.tree);
          updateGoal(id, {
            title: result.tree.title,
            context: ctx,
            contextComplete: true,
            treeId: result.tree.id,
          });
          recordEvent(
            "study_session",
            result.tree.title,
            "Course path generated from your goal",
            "courses",
            { goal: raw }
          );
          router.push(`/courses/${result.tree.id}`);
          return;
        }

        throw new Error("No tree returned. Try again.");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [updateGoal, setTree, router, recordEvent]
  );

  const handleSubmitGoal = () => {
    if (!input.trim() || loading) return;
    const id = crypto.randomUUID();
    setGoalId(id);
    setQuestions([]);
    setAnswers({});
    addGoal({
      id,
      rawInput: input.trim(),
      title: input.trim(),
      context: {},
      contextComplete: false,
      createdAt: new Date().toISOString(),
    });
    void runGeneration(id, input.trim(), {});
  };

  const handleContextSubmit = () => {
    if (!goalId || loading) return;

    const missing = questions.filter((q) => !answers[q.id]?.trim());
    if (missing.length > 0) {
      setError(`Please answer all ${questions.length} questions.`);
      return;
    }

    const clarificationAnswers = { ...answers };
    const inferred = inferContextFromAnswers(clarificationAnswers);
    const fullContext: GoalContext = {
      ...context,
      ...inferred,
      clarificationAnswers,
    };

    setContext(fullContext);
    setError(null);
    void runGeneration(goalId, input.trim(), fullContext);
  };

  const setAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null);

    if (questionId === "level") {
      setContext((c) => ({
        ...c,
        level: value as GoalContext["level"],
      }));
    } else if (questionId === "objective") {
      setContext((c) => ({ ...c, objective: value }));
    } else if (questionId === "preference") {
      setContext((c) => ({
        ...c,
        preference: value as GoalContext["preference"],
      }));
    } else if (questionId === "hoursPerWeek") {
      setContext((c) => ({
        ...c,
        hoursPerWeek: value ? Number(value) : undefined,
      }));
    }
  };

  const allAnswered =
    questions.length > 0 &&
    questions.every((q) => answers[q.id]?.trim().length > 0);

  return (
    <div className="arc-card mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="arc-heading text-2xl">What do you want to master?</h1>
        <p className="mt-2 text-sm text-[var(--arc-muted)]">
          ARC analyzes your goal, asks clarifying questions when needed, then
          generates your structured course once.
        </p>
        {aiReady ? (
          <p className="mt-2 text-xs text-[var(--arc-accent)]">
            OpenAI connected — trees, coach, files, and Instructor use your key
            (server-side only).
          </p>
        ) : (
          <p className="mt-2 text-xs text-amber-600">
            OpenAI not detected — add OPENAI_API_KEY to .env.local and restart{" "}
            <code className="text-[10px]">npm run dev</code>.
          </p>
        )}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='e.g. "Master organic chemistry for my university course"'
        rows={3}
        disabled={loading && questions.length > 0}
        className="w-full resize-none rounded-xl border border-[var(--arc-border)] bg-[var(--arc-bg)] px-4 py-3 text-sm text-[var(--arc-fg)] placeholder:text-[var(--arc-muted)] focus:border-[var(--arc-fg)] focus:outline-none"
      />

      {questions.length > 0 && (
        <div className="space-y-4 border-t border-[var(--arc-border)] pt-4">
          <p className="text-sm font-medium text-[var(--arc-fg)]">
            A few questions before we build your course
          </p>
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <label className="text-sm text-[var(--arc-fg)]">{q.question}</label>
              {q.type === "select" && q.options ? (
                <select
                  value={answers[q.id] ?? ""}
                  className="w-full rounded-lg border border-[var(--arc-border)] bg-[var(--arc-bg)] px-3 py-2 text-sm text-[var(--arc-fg)]"
                  onChange={(e) => setAnswer(q.id, e.target.value)}
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
                  value={answers[q.id] ?? ""}
                  className="w-full rounded-lg border border-[var(--arc-border)] bg-[var(--arc-bg)] px-3 py-2 text-sm text-[var(--arc-fg)]"
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder="Your answer…"
                />
              )}
            </div>
          ))}
          <Button
            onClick={handleContextSubmit}
            disabled={loading || !allAnswered}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Building your course…
              </>
            ) : (
              "Generate course"
            )}
          </Button>
          {!allAnswered && (
            <p className="text-xs text-[var(--arc-muted)]">
              Answer every question above to continue.
            </p>
          )}
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
          {loading ? "Analyzing goal…" : "Build my course"}
        </Button>
      )}
    </div>
  );
}
