"use client";

import dynamic from "next/dynamic";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { ConceptSnapshotCards } from "@/components/home/ConceptSnapshotCards";
import { HeroVisualCards } from "@/components/home/HeroVisualCards";
import { LearningJourneyDemo } from "@/components/home/LearningJourneyDemo";
import { HomeSplitLayout } from "@/components/layout/HomeSplitLayout";

import "./home.css";

const HomeAdvisorPanel = dynamic(
  () =>
    import("@/components/home/HomeAdvisorPanel").then((m) => m.HomeAdvisorPanel),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center p-6 text-sm text-[var(--arc-muted)]">
        Loading advisor…
      </div>
    ),
  }
);

export function HomeExperience() {
  return (
    <HomeSplitLayout advisor={<HomeAdvisorPanel />}>
      <div className="arc-home -mx-0 w-full">
        {/* Hero */}
        <section className="arc-split-hero">
          <div className="arc-split-editorial">
            <p className="arc-colophon arc-fade-up">
              § — Desk open · cognitive learning · Edition MMXXVI
            </p>
            <h1 className="arc-display arc-fade-up arc-fade-up-delay-1 mt-10 max-w-lg">
              A better way to understand complex things.
            </h1>
            <p className="arc-lead arc-fade-up arc-fade-up-delay-2 mt-6 max-w-md">
              ARC helps you break ideas into something you can actually work
              with. Learning becomes structured instead of overwhelming.
            </p>
            <p className="arc-lead arc-fade-up arc-fade-up-delay-2 mt-4 max-w-md text-sm">
              You bring the goal. ARC builds the structure around it — lessons,
              plans, and video when you need them.
            </p>
            <div className="arc-fade-up arc-fade-up-delay-3 pointer-events-auto mt-10 flex flex-wrap gap-3">
              <ArcButton href="/cognitive">Start learning</ArcButton>
              <ArcButton href="/cognitive/new" variant="secondary">
                Try a concept
              </ArcButton>
            </div>
          </div>
          <div className="arc-split-panel">
            <HeroVisualCards />
          </div>
        </section>

        <hr className="arc-divider" />

        {/* Understanding snapshots */}
        <section className="arc-section-wide py-16">
          <p className="arc-section-label">Understanding · now</p>
          <h2 className="arc-heading text-2xl">What you are working on</h2>
          <p className="arc-lead mt-3 max-w-2xl text-sm">
            A calm read on your topics — where clarity is forming and where ARC
            will slow down.
          </p>
          <div className="mt-10">
            <ConceptSnapshotCards />
          </div>
        </section>

        <hr className="arc-divider" />

        {/* How ARC works — narrative */}
        <section className="arc-section arc-dot-grid py-16">
          <p className="arc-section-label">How ARC works</p>
          <div className="mt-6 max-w-2xl space-y-6 text-base leading-relaxed text-[var(--arc-muted)]">
            <p>
              ARC takes what you want to learn and breaks it into structured
              steps — lessons, practice, and video only where they earn their
              place.
            </p>
            <p>
              It adapts as you understand more, not just when you finish
              content. When something feels fuzzy, the path bends back toward
              foundations.
            </p>
            <p>
              Your skill tree, lesson plans, and advisor share one map of how
              you think. Nothing is bolted on at the end.
            </p>
          </div>
        </section>

        <hr className="arc-divider" />

        {/* Demo journeys */}
        <section className="arc-section-wide py-16">
          <p className="arc-section-label">Examples</p>
          <h2 className="arc-heading text-2xl">Learning journeys</h2>
          <p className="arc-lead mt-3 max-w-xl text-sm">
            From confusion to structure to clarity — without graphs, without
            noise.
          </p>
          <div className="mt-10">
            <LearningJourneyDemo />
          </div>
        </section>

        <hr className="arc-divider" />

        <section className="arc-section arc-dot-grid pb-16 pt-8 text-center">
          <p className="arc-lead text-sm">
            Everything updates as you go. Nothing is fixed.
          </p>
          <div className="mt-6 flex justify-center">
            <ArcButton href="/cognitive">Enter ARC →</ArcButton>
          </div>
        </section>
      </div>
    </HomeSplitLayout>
  );
}
