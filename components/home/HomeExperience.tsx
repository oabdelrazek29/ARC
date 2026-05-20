"use client";

import dynamic from "next/dynamic";

import { ArcButton } from "@/components/arc-ui/ArcButton";
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

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "You tell ARC what you want to learn.",
    sub: "No need to know where to start. Just say what you're after.",
  },
  {
    step: "02",
    title: "It breaks it into parts you can actually understand.",
    sub: "Structured into pieces — not overwhelming, not surface level.",
  },
  {
    step: "03",
    title: "As you go, it adjusts based on how you think.",
    sub: "ARC adapts when you get stuck — not after you finish.",
  },
] as const;

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
          <p className="arc-mono arc-fade-up text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--arc-muted)]">
            ARC // Cognitive Learning System
          </p>
          <h1 className="arc-heading arc-fade-up arc-fade-up-delay-1 mt-5 max-w-2xl text-4xl leading-[1.05] md:text-5xl">
            Learn anything. But actually understand it.
          </h1>
          <p className="arc-fade-up arc-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-[var(--arc-muted)] md:text-lg">
            ARC breaks down what you want to learn and builds a path that adapts
            as you go. Not courses. Not videos. Just structured understanding.
          </p>
          <div className="arc-fade-up arc-fade-up-delay-3 pointer-events-auto mt-8 flex flex-wrap gap-3">
            <ArcButton href="/cognitive">Enter system</ArcButton>
            <ArcButton href="#simulation" variant="secondary">
              Observe simulations
            </ArcButton>
          </div>
          <p className="arc-fade-up arc-fade-up-delay-3 mt-8 max-w-lg text-sm italic text-[var(--arc-muted)]">
            Start with something simple. ARC handles the structure.
          </p>
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

      {/* How it works */}
      <section className="arc-section arc-dot-grid">
        <h2 className="arc-heading text-2xl">How it works</h2>
        <div className="arc-feature-grid mt-10">
          {HOW_IT_WORKS.map((item) => (
            <article key={item.step} className="arc-card">
              <p className="arc-mono text-xs font-medium text-[var(--arc-accent)]">
                {item.step}
              </p>
              <h3 className="arc-heading mt-3 text-base text-[var(--arc-fg)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--arc-muted)]">
                {item.sub}
              </p>
            </article>
          ))}
        </div>
      </section>

      <hr className="arc-divider" />

      {/* What changes */}
      <section className="arc-section arc-dot-grid">
        <h2 className="arc-heading text-2xl">What changes</h2>
        <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-[var(--arc-muted)]">
          <p>You stop following courses.</p>
          <p>You start building understanding that evolves with you.</p>
          <p>ARC adapts when you get stuck, not after you finish.</p>
        </div>
        <p className="mt-10 text-sm text-[var(--arc-muted)]">
          Try it. Just type what you want to learn.
        </p>
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

      <hr className="arc-divider" />

      {/* Bottom CTA */}
      <section className="arc-section arc-dot-grid pb-20 pt-4 text-center">
        <p className="text-sm text-[var(--arc-muted)]">
          Everything updates as you go. Nothing is fixed.
        </p>
        <div className="mt-6 flex justify-center">
          <ArcButton href="/cognitive">Enter ARC →</ArcButton>
        </div>
      </section>
    </div>
  );
}
