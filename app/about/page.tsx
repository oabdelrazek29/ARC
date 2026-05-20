import type { Metadata } from "next";
import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { ArcWatermark } from "@/components/layout/ArcWatermark";

export const metadata: Metadata = {
  title: "About",
  description:
    "ARC is a learning system built for people who want real understanding, not surface level progress.",
};

export default function AboutPage() {
  return (
    <div className="arc-page arc-watermark-wrap relative">
      <article className="arc-section-wide py-20 md:py-28">
        <p className="arc-section-marker">
          § From the desk · About ARC
          <br />
          Edition MMXXVI · Vol. II
        </p>

        <h1 className="arc-display mt-10 max-w-3xl leading-tight">
          ARC is a learning system built for people who want real understanding,
          not surface level progress
        </h1>

        <div className="arc-prose-loose mt-14 max-w-2xl text-base leading-relaxed text-[var(--arc-muted)]">
          <p>
            ARC exists because learning online has become fragmented, scattered,
            and inefficient. Most people collect information without ever
            building real understanding.
          </p>
          <p>
            We wanted to change that by creating a system that organizes
            knowledge into a clear path that actually makes sense as you move
            through it.
          </p>
          <p>
            Learning should not feel like guessing what comes next. It should
            feel structured, guided, and understandable at every step.
          </p>
        </div>

        <div className="arc-prose-loose mt-20 max-w-2xl">
          <section className="arc-principle">
            <h2 className="arc-heading text-xl">Structured Learning</h2>
            <p className="arc-lead mt-4 text-sm leading-relaxed">
              Every topic is broken into smaller parts that connect logically.
              Instead of random resources, you get a path that builds
              understanding step by step.
            </p>
          </section>

          <section className="arc-principle">
            <h2 className="arc-heading text-xl">Adaptive System</h2>
            <p className="arc-lead mt-4 text-sm leading-relaxed">
              ARC adjusts based on how you learn. If something is difficult, it
              slows down and reshapes the explanation. If you move quickly, it
              keeps pace with you naturally.
            </p>
          </section>

          <section className="arc-principle">
            <h2 className="arc-heading text-xl">Focus on Understanding</h2>
            <p className="arc-lead mt-4 text-sm leading-relaxed">
              The goal is not completion. The goal is clarity. ARC is designed
              to help you actually understand what you are learning, not just
              move through it.
            </p>
          </section>

          <section className="arc-principle">
            <h2 className="arc-heading text-xl">Your Data Stays Yours</h2>
            <p className="arc-lead mt-4 text-sm leading-relaxed">
              Your progress, your sessions, and your learning paths belong to
              you. Nothing is used outside your experience inside the system.
            </p>
          </section>
        </div>

        <div className="arc-prose-loose mt-20 max-w-2xl text-base leading-relaxed text-[var(--arc-muted)]">
          <p>
            ARC is not about replacing effort. It is about removing confusion so
            your effort actually leads somewhere.
          </p>
          <p>If you bring curiosity, ARC gives you structure.</p>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <ArcButton href="/cognitive">Enter ARC →</ArcButton>
          <Link href="mailto:hello@arc.local" className="arc-btn arc-btn-ghost">
            Email the team →
          </Link>
        </div>
      </article>

      <ArcWatermark />
    </div>
  );
}
