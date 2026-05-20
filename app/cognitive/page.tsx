"use client";

import Link from "next/link";

import { PillBadge } from "@/components/arc-ui/PillBadge";
import { CognitiveGoalForm } from "@/components/cognitive/CognitiveGoalForm";
import { useCognitiveGraphList } from "@/hooks/use-cognitive";

export default function CognitiveHubPage() {
  const graphs = useCognitiveGraphList();

  return (
    <div className="space-y-12">
      <header>
        <PillBadge live>Cognitive OS</PillBadge>
        <h1 className="arc-heading mt-4 text-3xl md:text-4xl">
          Cognitive Learning OS
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--arc-muted)]">
          Adaptive mental models, behavioral drift, and contextual AI reasoning.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="arc-heading mb-4 text-lg">New mental model</h2>
          <CognitiveGoalForm />
        </div>
        <div className="arc-card">
          <h2 className="arc-heading text-lg">Five subsystems</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--arc-muted)]">
            <li>Cognitive Graph Engine</li>
            <li>AI Advisor</li>
            <li>Learning Reality Modes</li>
            <li>Workspace</li>
            <li>Cognitive Drift</li>
          </ul>
        </div>
      </section>

      {graphs.length > 0 && (
        <section>
          <h2 className="arc-heading mb-4 text-lg">Your graphs</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {graphs.map((g) => (
              <li key={g.id}>
                <Link
                  href={`/cognitive/${g.id}`}
                  className="arc-card block !p-4 transition-colors hover:border-[var(--arc-accent)]/40"
                >
                  <p className="font-medium">{g.title}</p>
                  <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
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
