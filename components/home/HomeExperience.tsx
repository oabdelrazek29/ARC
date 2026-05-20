"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { IntelligenceStream } from "@/components/home/IntelligenceStream";
import { LiveSimulationLayer } from "@/components/home/LiveSimulationLayer";
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
      {/* Hero — Clarity-style split */}
      <section className="arc-split-hero arc-dot-grid">
        <div className="arc-split-editorial">
          <p className="arc-colophon arc-fade-up">
            § — Return · enter the system · Edition MMXXVI
          </p>
          <p className="arc-mono arc-fade-up arc-fade-up-delay-1 mt-10 text-xs uppercase tracking-[0.2em] text-[var(--arc-muted)]">
            Welcome
          </p>
          <h1 className="arc-display arc-fade-up arc-fade-up-delay-1 mt-4 max-w-lg">
            Learn anything.
            <br />
            But actually understand it.
          </h1>
          <p className="arc-lead arc-fade-up arc-fade-up-delay-2 mt-6 max-w-md">
            ARC breaks down what you want to learn and builds a path that adapts
            as you go. Not courses. Not videos. Just structured understanding.
          </p>
          <p className="arc-fade-up arc-fade-up-delay-3 mt-8 text-sm italic text-[var(--arc-muted)]">
            Start with something simple. ARC handles the structure.
          </p>
        </div>

        <div className="arc-split-panel">
          <div className="arc-form-card arc-fade-up arc-fade-up-delay-2">
            <p className="arc-form-card__label">Form A · Begin</p>
            <p className="arc-mono text-[10px] text-[var(--arc-muted)]">1 of 1</p>
            <h2 className="arc-heading mt-4 text-xl">Enter the desk.</h2>
            <p className="arc-lead mt-3 text-sm">
              Your graphs, paths, and understanding maps are waiting. Sign in, or
              step in without an account.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <ArcButton href="/cognitive" className="w-full justify-center">
                Enter system
              </ArcButton>
              <ArcButton
                href="#simulation"
                variant="secondary"
                className="w-full justify-center"
              >
                Observe simulations
              </ArcButton>
            </div>
            <p className="arc-mono mt-8 text-[10px] leading-relaxed text-[var(--arc-muted)]">
              New to ARC?{" "}
              <Link
                href="/cognitive/new"
                className="text-[var(--arc-fg)] underline underline-offset-2"
              >
                Open a new mental model →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <hr className="arc-divider" />

      <section id="simulation" className="arc-section-wide arc-dot-grid py-16">
        <p className="arc-section-label">Core systems · live</p>
        <h2 className="arc-heading text-2xl">Live cognitive systems</h2>
        <p className="arc-lead mt-2 text-sm">
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

      <section className="arc-section arc-dot-grid">
        <p className="arc-section-label">How it works</p>
        <h2 className="arc-heading text-2xl">In real terms</h2>
        <div className="arc-feature-grid mt-10">
          {HOW_IT_WORKS.map((item) => (
            <article key={item.step} className="arc-card !rounded-sm">
              <p className="arc-mono text-xs font-medium text-[var(--arc-accent)]">
                {item.step}
              </p>
              <h3 className="arc-heading mt-3 text-base">{item.title}</h3>
              <p className="arc-lead mt-2 text-sm">{item.sub}</p>
            </article>
          ))}
        </div>
      </section>

      <hr className="arc-divider" />

      <section className="arc-section arc-dot-grid">
        <p className="arc-section-label">What changes</p>
        <h2 className="arc-heading text-2xl">When you use ARC</h2>
        <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-[var(--arc-muted)]">
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
            <p className="arc-section-label">Engine · live</p>
            <p className="arc-lead text-sm">
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

      <section className="arc-section arc-dot-grid pb-12 pt-4 text-center">
        <p className="arc-mono text-xs text-[var(--arc-muted)]">
          Everything updates as you go. Nothing is fixed.
        </p>
        <div className="mt-6 flex justify-center">
          <ArcButton href="/cognitive">Enter ARC →</ArcButton>
        </div>
      </section>
    </div>
  );
}
