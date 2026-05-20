"use client";

import dynamic from "next/dynamic";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { SystemVisualPreview } from "@/components/home/SystemVisualPreview";
import { HomeAdvisorSection } from "@/components/layout/HomeAdvisorSection";
import { ArcWatermark } from "@/components/layout/ArcWatermark";

import "./home.css";

const HomeAdvisorPanel = dynamic(
  () =>
    import("@/components/home/HomeAdvisorPanel").then((m) => m.HomeAdvisorPanel),
  { ssr: false }
);

export function HomeExperience() {
  return (
    <div className="arc-home arc-watermark-wrap -mx-0 w-full">
      <section className="arc-section-wide pt-20 pb-24 md:pt-28 md:pb-32">
        <p className="arc-section-marker arc-fade-up">
          § The System · Begin your learning
          <br />
          Edition MMXXVI · Vol. I
          <span className="arc-cursor" aria-hidden>
            |
          </span>
        </p>
        <h1 className="arc-display arc-fade-up arc-fade-up-delay-1 mt-10 max-w-3xl">
          Turn what you want to learn into something you can build on.
        </h1>
        <p className="arc-lead arc-fade-up arc-fade-up-delay-2 mt-10 max-w-xl leading-relaxed">
          ARC breaks down what you want to learn and builds a path that adapts
          as you go. Not courses. Not videos. Just structured understanding.
        </p>
        <p className="arc-italic-bridge arc-fade-up arc-fade-up-delay-2 mt-8">
          Start with something simple. ARC handles the structure.
        </p>
        <div className="arc-fade-up arc-fade-up-delay-3 mt-12 flex flex-wrap gap-3">
          <ArcButton href="/cognitive">Enter ARC →</ArcButton>
          <ArcButton href="#how-it-works" variant="ghost">
            See how it works
          </ArcButton>
        </div>
      </section>

      <hr className="arc-divider" />

      <HomeAdvisorSection advisor={<HomeAdvisorPanel />}>
        <section id="ai-advisor-mode" className="arc-section-wide py-20">
          <p className="arc-section-marker">§ AI Adviser Mode</p>
          <h2 className="arc-heading text-3xl md:text-4xl">AI adviser</h2>
          <div className="arc-advisor-explainer arc-prose-block mt-8">
            <p className="arc-lead text-base leading-relaxed">
              ARC includes an optional side view assistant that can be opened at
              any time.
            </p>
            <p className="arc-lead mt-4 text-base leading-relaxed">
              When enabled, the interface splits into two parts. Left side,
              your learning space. Right side, your AI adviser.
            </p>
            <p className="arc-mono mt-6 text-[10px] text-[var(--arc-tertiary)]">
              The adviser helps by
            </p>
            <ul>
              <li>explaining concepts in context</li>
              <li>guiding what to do next</li>
              <li>answering questions as you learn</li>
              <li>adjusting based on your progress</li>
            </ul>
            <p className="arc-lead mt-6 text-sm">
              It does not interrupt your flow unless you open it. Use the
              control below to open or close the adviser. Default is off.
            </p>
          </div>
        </section>

        <hr className="arc-divider" />

        <section id="how-it-works" className="arc-section-wide py-20">
          <p className="arc-section-marker">
            § II The Method
            <br />
            pp. 1 to 3
          </p>
          <h2 className="arc-heading text-3xl md:text-4xl mt-4">
            Three steps.
            <br />
            That is the whole system.
          </h2>
          <div className="arc-prose-loose mt-14 max-w-2xl">
            <div className="arc-principle">
              <p className="arc-principle__num">I.//</p>
              <p className="arc-principle__title">
                Tell it what you want to learn.
              </p>
              <p className="arc-lead text-sm leading-relaxed">
                No syllabus required. No prior structure. Just a topic, a goal,
                or a question.
              </p>
            </div>
            <div className="arc-principle">
              <p className="arc-principle__num">II.//</p>
              <p className="arc-principle__title">
                ARC breaks it down for you.
              </p>
              <p className="arc-lead text-sm leading-relaxed">
                It maps the knowledge into parts you can actually move through.
                Not a list of links. Not a playlist.
              </p>
            </div>
            <div className="arc-principle">
              <p className="arc-principle__num">III.//</p>
              <p className="arc-principle__title">It adapts as you go.</p>
              <p className="arc-lead text-sm leading-relaxed">
                When you get stuck, ARC adjusts. When you move fast, it moves
                with you. Nothing is fixed.
              </p>
            </div>
          </div>
        </section>

        <hr className="arc-divider" />

        <section className="arc-section py-20">
          <p className="arc-section-marker">§ III The Shift</p>
          <h2 className="arc-heading text-3xl md:text-4xl mt-4">
            What changes
            <br />
            when you use ARC.
          </h2>
          <div className="arc-prose-loose mt-12 max-w-xl text-base leading-relaxed text-[var(--arc-muted)]">
            <p>You stop following someone else&apos;s course structure.</p>
            <p>
              You start building understanding that actually belongs to you.
            </p>
            <p>ARC adapts when you get stuck, not after you finish.</p>
            <p>Everything updates as you go. Nothing is fixed.</p>
          </div>
          <p className="mt-12 text-sm text-[var(--arc-muted)]">
            Try it. Just type what you want to learn.
          </p>
        </section>

        <hr className="arc-divider" />

        <section className="arc-section-wide py-20">
          <p className="arc-section-marker">§ IV In use</p>
          <h2 className="arc-heading text-3xl mt-4">How ARC feels in use</h2>
          <p className="arc-lead mt-6 max-w-2xl text-sm leading-relaxed">
            A quiet look at the system before you sign in. Paths, explanations,
            progress, and the adviser working beside your work.
          </p>
          <SystemVisualPreview />
        </section>

        <hr className="arc-divider" />

        <section className="arc-section py-20">
          <p className="arc-section-marker">§ V A standing invitation</p>
          <h2 className="arc-heading text-3xl mt-4">Come learn with us.</h2>
          <p className="arc-lead mt-8 max-w-xl leading-relaxed">
            Whether you are trying to understand a concept from scratch, prep
            for an exam, or finally get through that topic you have been
            avoiding, ARC is here. Just start. We will handle the rest.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <ArcButton href="/cognitive">Enter ARC →</ArcButton>
            <a href="mailto:hello@arc.local" className="arc-btn arc-btn-ghost">
              Email the team →
            </a>
          </div>
        </section>

        <section id="pricing" className="arc-section pb-12">
          <p className="arc-section-marker">§ Pricing</p>
          <p className="arc-lead text-sm">Coming soon.</p>
        </section>
      </HomeAdvisorSection>

      <ArcWatermark />
    </div>
  );
}
