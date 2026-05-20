"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { generateMockCognitiveGraph } from "@/lib/cognitive/mock-graph-generator";
import { useCognitiveStore } from "@/store/cognitive-store";

export function CognitiveGoalForm() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setGraph = useCognitiveStore((s) => s.setGraph);
  const router = useRouter();

  const submit = async () => {
    const rawInput = input.trim();
    if (!rawInput || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/cognitive/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawInput }),
      });
      const data = await res.json();

      if (data.graph) {
        setGraph(data.graph, data.scenarios);
        router.push(`/cognitive/${data.graph.id}`);
        return;
      }

      const mock = generateMockCognitiveGraph({ rawInput });
      setGraph(mock.graph, mock.scenarios);
      router.push(`/cognitive/${mock.graph.id}`);
      if (!res.ok) {
        setError(
          data.error
            ? `API: ${data.error}. Loaded demo graph instead.`
            : "Loaded demo cognitive map (offline mode)."
        );
      }
    } catch {
      const mock = generateMockCognitiveGraph({ rawInput });
      setGraph(mock.graph, mock.scenarios);
      router.push(`/cognitive/${mock.graph.id}`);
      setError("Could not reach AI — showing demo graph.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <label className="block text-sm text-[var(--arc-muted)]">
        What do you want to understand or master?
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="e.g. Machine learning fundamentals for product decisions"
        className="w-full rounded-xl border border-[var(--arc-border)] bg-[var(--arc-bg)] px-4 py-3 text-[var(--arc-fg)] outline-none focus:border-[var(--arc-fg)]"
      />
      <Button onClick={submit} disabled={loading || !input.trim()} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating cognitive map…
          </>
        ) : (
          "Generate mental model graph"
        )}
      </Button>
      {error && (
        <p className="text-center text-xs text-amber-400/90" role="status">
          {error}
        </p>
      )}
      <p className="text-center text-xs text-[var(--arc-muted)]">
        One AI call — graph saved locally. Nodes model how you think, not course
        content.
      </p>
    </div>
  );
}
