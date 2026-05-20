"use client";

import dynamic from "next/dynamic";
import { Brain, GitBranch, Sparkles } from "lucide-react";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { ArcCard } from "@/components/arc-ui/ArcCard";
import { PillBadge } from "@/components/arc-ui/PillBadge";
import { IntelligenceStream } from "@/components/home/IntelligenceStream";
import { LiveSimulationLayer } from "@/components/home/LiveSimulationLayer";
import { DustParticles } from "@/components/home/DustParticles";
import { MiniGraphPreview } from "@/components/home/MiniGraphPreview";
import { SystemExplanationPanel } from "@/components/home/SystemExplanationPanel";
import { TryArcSandbox } from "@/components/home/TryArcSandbox";
import { useSimulation } from "@/hooks/use-simulation";

import "./home.css";

const SimulationEngine = dynamic(
  () =>
    import("@/components/home/SimulationShell").then((m) => m.SimulationShell),
  { ssr: false }
);

export function HomeExperience() {
  const snapshot = useSimulation(true);

  return (
    <div className="arc-home -mx-0 w-full">
      {/* Hero — living intelligence canvas + dot grid */}
      <section className="arc-home-hero arc-dot-grid relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
        <DustParticles />
        <div className="arc-home-hero-overlay pointer-events-none absolute inset-0" />

        {/* Floating preview cards */}
        <div className="pointer-events-none absolute right-4 top-28 hidden w-48 lg:block xl:right-[max(1rem,calc(50%-520px))]">
          <div className="arc-card arc-card-float mb-4 p-3 opacity-90">
            <p className="arc-mono text-[10px] text-[var(--arc-muted)]">Live</p>
            <p className="arc-heading mt-1 text-sm">Graph evolving</p>
          </div>
          <div className="arc-card arc-card-float p-3 opacity-80" style={{ animationDelay: "1s" }}>
            <p className="arc-mono text-[10px] text-[var(--arc-accent)]">+ mastery</p>
            <p className="mt-1 text-xs text-[var(--arc-muted)]">Node stabilized</p>
          </div>
        </div>

        <div className="relative z-10 arc-section pb-16 pt-28 md:pb-24">
          <PillBadge live className="arc-fade-up">
            Intelligence simulation
          </PillBadge>
          <h1 className="arc-heading arc-fade-up arc-fade-up-delay-1 mt-6 max-w-2xl text-4xl leading-[1.05] md:text-5xl">
            ARC is learning systems for thinking.
          </h1>
          <p className="arc-fade-up arc-fade-up-delay-2 mt-4 max-w-lg text-base text-[var(--arc-muted)] md:text-lg">
            Watch intelligence evolve in real time.
          </p>
          <div className="arc-fade-up arc-fade-up-delay-3 pointer-events-auto mt-8 flex flex-wrap gap-3">
            <ArcButton href="/cognitive">Enter the system</ArcButton>
            <ArcButton href="#simulation" variant="secondary">
              Observe simulations
            </ArcButton>
          </div>
        </div>
      </section>

      <hr className="arc-divider" />

      {/* Live simulation */}
      <section id="simulation" className="arc-section-wide arc-dot-grid py-16">
        <PillBadge className="mb-4">Core Systems</PillBadge>
        <h2 className="arc-heading text-2xl">Live cognitive systems</h2>
        <p className="mt-2 text-sm text-[var(--arc-muted)]">
          Simulated learners · deterministic · no API
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <LiveSimulationLayer worlds={snapshot.worlds} />
            <MiniGraphPreview worlds={snapshot.worlds} />
          </div>
          <IntelligenceStream events={snapshot.stream} />
        </div>
      </section>

      <hr className="arc-divider" />

      {/* Features — 3 column */}
      <section className="arc-section arc-dot-grid">
        <PillBadge>New Release</PillBadge>
        <h2 className="arc-heading mt-4 text-2xl">How ARC thinks</h2>
        <div className="arc-feature-grid mt-10">
          <ArcCard
            title="Graph-based learning"
            description="Mental models as living nodes — weaknesses, mastery, and drift."
            icon={<GitBranch className="h-5 w-5 text-[var(--arc-accent)]" />}
          />
          <ArcCard
            title="AI advisor"
            description="Reads your graph before responding. Targets unstable nodes first."
            icon={<Brain className="h-5 w-5 text-[var(--arc-accent)]" />}
          />
          <ArcCard
            title="Adaptive modeling"
            description="Understanding evolves — stable, decaying, strengthening over time."
            icon={<Sparkles className="h-5 w-5 text-[var(--arc-accent)]" />}
          />
        </div>
      </section>

      <hr className="arc-divider" />

      <section className="arc-section-wide py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <TryArcSandbox />
          <div className="flex flex-col justify-center gap-4">
            <PillBadge live>Engine</PillBadge>
            <p className="text-sm leading-relaxed text-[var(--arc-muted)]">
              Multiple cognitive worlds run in parallel. Each graph updates every
              ~1.6s — entirely in memory.
            </p>
            <SimulationEngine worlds={snapshot.worlds} tick={snapshot.tick} />
          </div>
        </div>
        <div className="mt-16">
          <SystemExplanationPanel />
        </div>
      </section>
    </div>
  );
}
