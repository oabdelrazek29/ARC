"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArcButton } from "@/components/arc-ui/ArcButton";
import { HomeAdvisorSection } from "@/components/layout/HomeAdvisorSection";
import { ArcWatermark } from "@/components/layout/ArcWatermark";
import { cn } from "@/lib/utils";

import "./home.css";

const HomeAdvisorPanel = dynamic(
  () =>
    import("@/components/home/HomeAdvisorPanel").then((m) => m.HomeAdvisorPanel),
  { ssr: false }
);

const FIGURES = [
  {
    src: "https://placehold.co/800x480/111111/f0ede6?text=Learning+path",
    caption: "Fig. I — Learning path breakdown",
    wide: true,
  },
  {
    src: "https://placehold.co/800x480/111111/f0ede6?text=Adaptive+session",
    caption: "Fig. II — Adaptive session in progress",
    wide: false,
  },
  {
    src: "https://placehold.co/800x480/111111/f0ede6?text=Knowledge+graph",
    caption: "Fig. III — Knowledge graph view",
    wide: false,
  },
] as const;

export function HomeExperience() {
  return (
    <div className="arc-home arc-watermark-wrap -mx-0 w-full">
      {/* § I — Hero */}
      <section className="arc-section-wide pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="arc-section-marker arc-fade-up">
          § — The System · Begin your learning
          <br />
          Edition MMXXVI · Vol. I
        </p>
        <h1 className="arc-display arc-fade-up arc-fade-up-delay-1 mt-6 max-w-3xl">
          <span className="arc-display-line">Learn anything.</span>
          <span className="arc-display-line">
            But actually understand it.
            <span className="arc-cursor" aria-hidden>
              |
            </span>
          </span>
        </h1>
        <p className="arc-lead arc-fade-up arc-fade-up-delay-2 mt-8 max-w-xl">
          ARC breaks down what you want to learn and builds a path that adapts
          as you go. Not courses. Not videos. Just structured understanding.
        </p>
        <p className="arc-italic-bridge arc-fade-up arc-fade-up-delay-2 mt-6">
          Start with something simple. ARC handles the structure.
        </p>
        <div className="arc-fade-up arc-fade-up-delay-3 mt-10 flex flex-wrap gap-3">
          <ArcButton href="/cognitive">Enter ARC →</ArcButton>
          <ArcButton href="#how-it-works" variant="ghost">
            See how it works
          </ArcButton>
        </div>
      </section>

      <hr className="arc-divider" />

      {/* Adviser + remaining sections */}
      <HomeAdvisorSection advisor={<HomeAdvisorPanel />}>
        {/* § II — How it works */}
        <section id="how-it-works" className="arc-section-wide py-16">
          <p className="arc-section-marker">
            § II — The Method
            <br />
            pp. 1 – 3
          </p>
          <h2 className="arc-heading text-3xl md:text-4xl">
            Three steps.
            <br />
            That&apos;s the whole system.
          </h2>
          <div className="mt-12 space-y-10 max-w-2xl">
            <div className="arc-principle">
              <p className="arc-principle__num">I.//</p>
              <p className="arc-principle__title">
                Tell it what you want to learn.
              </p>
              <p className="arc-lead text-sm">
                No syllabus required. No prior structure. Just a topic, a goal,
                or a question.
              </p>
            </div>
            <div className="arc-principle">
              <p className="arc-principle__num">II.//</p>
              <p className="arc-principle__title">
                ARC breaks it down for you.
              </p>
              <p className="arc-lead text-sm">
                It maps the knowledge into parts you can actually move through —
                not a list of links, not a playlist.
              </p>
            </div>
            <div className="arc-principle">
              <p className="arc-principle__num">III.//</p>
              <p className="arc-principle__title">It adapts as you go.</p>
              <p className="arc-lead text-sm">
                When you get stuck, ARC adjusts. When you move fast, it moves
                with you. Nothing is fixed.
              </p>
            </div>
          </div>
        </section>

        <hr className="arc-divider" />

        {/* § III — What changes */}
        <section className="arc-section py-16">
          <p className="arc-section-marker">§ III — The Shift</p>
          <h2 className="arc-heading text-3xl md:text-4xl">
            What changes
            <br />
            when you use ARC.
          </h2>
          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-[var(--arc-muted)]">
            <p>You stop following someone else&apos;s course structure.</p>
            <p>
              You start building understanding that actually belongs to you.
            </p>
            <p>
              ARC adapts when you get stuck — not after you finish.
            </p>
            <p>Everything updates as you go. Nothing is fixed.</p>
          </div>
          <p className="mt-10 text-sm text-[var(--arc-muted)]">
            Try it. Just type what you want to learn.
          </p>
        </section>

        <hr className="arc-divider" />

        {/* § IV — Interface */}
        <section className="arc-section-wide py-16">
          <p className="arc-section-marker">§ IV — The Interface</p>
          <h2 className="arc-heading text-3xl">Built to think with you.</h2>
          <div className="arc-figure-grid">
            {FIGURES.map((fig) => (
              <figure
                key={fig.caption}
                className={cn(
                  "arc-figure",
                  fig.wide && "arc-figure-grid__full"
                )}
              >
                <Image
                  src={fig.src}
                  alt=""
                  width={800}
                  height={480}
                  className="h-auto w-full"
                  unoptimized
                />
                <figcaption>{fig.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <hr className="arc-divider" />

        {/* § V — CTA */}
        <section className="arc-section py-16">
          <p className="arc-section-marker">§ V — A standing invitation</p>
          <h2 className="arc-heading text-3xl">Come learn with us.</h2>
          <p className="arc-lead mt-6 max-w-xl">
            Whether you&apos;re trying to understand a concept from scratch, prep
            for an exam, or finally get through that topic you&apos;ve been
            avoiding — ARC is here. Just start. We&apos;ll handle the rest.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ArcButton href="/cognitive">Enter ARC →</ArcButton>
            <a
              href="mailto:hello@arc.local"
              className="arc-btn arc-btn-ghost"
            >
              Email the team →
            </a>
          </div>
        </section>

        {/* Pricing placeholder */}
        <section id="pricing" className="arc-section pb-8">
          <p className="arc-section-marker">§ — Pricing</p>
          <p className="arc-lead text-sm">Coming soon.</p>
        </section>
      </HomeAdvisorSection>

      <ArcWatermark />
    </div>
  );
}
