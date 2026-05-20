"use client";

import Link from "next/link";

import { CognitiveGoalForm } from "@/components/cognitive/CognitiveGoalForm";
import { useCognitiveGraphList } from "@/hooks/use-cognitive";

export default function CognitiveHubPage() {
  const graphs = useCognitiveGraphList();

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-bricolage text-3xl font-bold text-white md:text-4xl">
          Cognitive Learning OS
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          A real-time adaptive system that models how you think, learn, and
          evolve — knowledge graphs, behavioral drift, and contextual AI
          reasoning.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">New mental model</h2>
          <CognitiveGoalForm />
        </div>
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6">
          <h2 className="text-lg font-semibold text-white">Five subsystems</h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-400">
            <li>🧬 Cognitive Graph Engine — evolving memory</li>
            <li>🤖 AI Advisor — graph-aware reasoning</li>
            <li>🧭 Learning Reality Modes — cognitive states</li>
            <li>🧩 Workspace — co-edit with AI</li>
            <li>🔥 Cognitive Drift — stable / unstable / decay</li>
          </ul>
        </div>
      </section>

      {graphs.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-white">Your graphs</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {graphs.map((g) => (
              <li key={g.id}>
                <Link
                  href={`/cognitive/${g.id}`}
                  className="block rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-cyan-500/40"
                >
                  <p className="font-medium text-white">{g.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {g.nodes.length} nodes · v{g.version}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
