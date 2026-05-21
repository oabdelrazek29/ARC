"use client";

import dynamic from "next/dynamic";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { SystemVisualPreview } from "@/components/home/SystemVisualPreview";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { ArcWatermark } from "@/components/layout/ArcWatermark";

import "./home.css";

const InstructorMasterPanel = dynamic(
  () =>
    import("@/components/instructor/InstructorMasterPanel").then(
      (m) => m.InstructorMasterPanel
    ),
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
          <ArcButton href="/learn">Enter Learn OS →</ArcButton>
          <ArcButton href="/cognitive" variant="ghost">
            Cognitive
          </ArcButton>
          <ArcButton href="#how-it-works" variant="ghost">
            See how it works
          </ArcButton>
        </div>
      </section>

      <hr className="arc-divider" />

      <WorkspaceLayout
        mainLabel="Learning command center"
        instructor={<InstructorMasterPanel />}
      >
        <section id="instructor-master" className="arc-section-wide py-20">
          <p className="arc-section-marker">§ Instructor Master</p>
          <h2 className="arc-heading text-3xl md:text-4xl">
            Your AI university, beside your work
          </h2>
          <div className="arc-advisor-explainer arc-prose-block mt-8">
            <p className="arc-lead text-base leading-relaxed">
              The Instructor Master is not a chatbot. It is your strategist,
              tutor, and curriculum architect — for any subject you choose.
            </p>
            <p className="arc-lead mt-4 text-base leading-relaxed">
              Use <strong>Full Focus</strong> for deep work, <strong>Smart Split</strong> for
              a 50/50 command center, or <strong>Teaching Mode</strong> for full-screen
              guided lessons.
            </p>
            <p className="arc-mono mt-6 text-[10px] text-[var(--arc-tertiary)]">
              The instructor actively
            </p>
            <ul>
              <li>generates lessons, quizzes, projects, and roadmaps</li>
              <li>tracks weaknesses and adapts explanations</li>
              <li>connects concepts through your knowledge graph</li>
              <li>structures real coursework with modules and checkpoints</li>
            </ul>
            <p className="arc-lead mt-6 text-sm">
              Switch modes in the bar above. Start in Focus; open Split when you
              want an AI professor teaching beside you.
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
            <ArcButton href="/learn">Enter Learn OS →</ArcButton>
          <ArcButton href="/cognitive" variant="ghost">
            Cognitive
          </ArcButton>
            <a href="mailto:hello@arc.local" className="arc-btn arc-btn-ghost">
              Email the team →
            </a>
          </div>
        </section>

        <section id="pricing" className="arc-section pb-12">
          <p className="arc-section-marker">§ Pricing</p>
          <p className="arc-lead text-sm">Coming soon.</p>
        </section>
      </WorkspaceLayout>

      <ArcWatermark />
    </div>
  );
}
