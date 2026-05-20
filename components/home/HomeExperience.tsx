"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { IntelligenceStream } from "@/components/home/IntelligenceStream";
import { LiveSimulationLayer } from "@/components/home/LiveSimulationLayer";
import { LivingIntelligenceCanvas } from "@/components/home/LivingIntelligenceCanvas";
import { MiniGraphPreview } from "@/components/home/MiniGraphPreview";
import { SystemExplanationPanel } from "@/components/home/SystemExplanationPanel";
import { TryArcSandbox } from "@/components/home/TryArcSandbox";
import { buttonVariants } from "@/components/ui/button";
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
    <div className="arc-home -mx-4 w-[calc(100%+2rem)] max-w-none sm:-mx-0 sm:w-full">
      {/* 1. Hero — living intelligence canvas */}
      <section className="arc-home-hero relative flex flex-col justify-end overflow-hidden">
        <LivingIntelligenceCanvas nodes={snapshot.background} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:pb-24 md:pt-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400/80">
            ARC · cognitive learning OS
          </p>
          <h1 className="mt-4 max-w-2xl font-bricolage text-3xl font-bold leading-tight text-white md:text-5xl">
            ARC is learning systems for thinking.
          </h1>
          <p className="mt-4 max-w-lg text-base text-zinc-400 md:text-lg">
            Watch intelligence evolve in real time.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <Link href="/cognitive" className={buttonVariants({ size: "lg" })}>
              Enter the system
            </Link>
            <a
              href="#simulation"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Observe simulations
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        {/* 2–3. Live simulation + intelligence stream */}
        <div id="simulation" className="arc-home-grid">
          <div className="space-y-8">
            <LiveSimulationLayer worlds={snapshot.worlds} />
            <MiniGraphPreview worlds={snapshot.worlds} />
          </div>
          <IntelligenceStream events={snapshot.stream} />
        </div>

        {/* 5–6. Try ARC + explanation */}
        <div className="grid gap-8 lg:grid-cols-2">
          <TryArcSandbox />
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-sm text-zinc-500">
              Multiple cognitive worlds run in parallel — each graph updates on
              its own rhythm. This is a local simulation: no accounts, no API,
              no lag.
            </p>
            <SimulationEngine worlds={snapshot.worlds} tick={snapshot.tick} />
          </div>
        </div>

        <SystemExplanationPanel />
      </div>
    </div>
  );
}
