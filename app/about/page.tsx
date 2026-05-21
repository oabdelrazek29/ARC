import type { Metadata } from "next";
import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { TypewriterLabel } from "@/components/TypewriterLabel";

export const metadata: Metadata = {
  title: "About",
  description:
    "ARC is an AI-powered learning platform for focused, organized study.",
};

export default function AboutPage() {
  return (
    <article className="clarity-container clarity-section">
      <TypewriterLabel
        text="§ From the desk · About ARC · Edition MMXXVI · Vol. II"
        className="arc-section-marker block"
      />

      <h1 className="arc-section-title mt-10">What Is ARC</h1>

      <div className="arc-body mt-10 max-w-2xl space-y-6 text-[17px] leading-relaxed">
        <p>
          ARC is an AI-powered learning platform designed to make studying feel
          focused, organized, and actually useful. Instead of switching between
          ten different apps for notes, lectures, files, coding, and coursework
          — everything works together in one connected system.
        </p>
        <p>
          ARC helps students learn through structured courses, intelligent
          tutoring, immersive reading spaces, and adaptive study tools that
          understand how they learn over time.
        </p>
        <p>
          The goal is simple. Make learning feel less overwhelming and more
          meaningful.
        </p>
      </div>

      <blockquote className="arc-display mt-16 max-w-xl text-2xl italic text-[var(--arc-accent)]">
        Studying should not feel messy, distracting, or disconnected.
      </blockquote>

      <div className="arc-body mt-12 max-w-2xl space-y-6 text-[17px] leading-relaxed">
        <p>
          Most students constantly switch between tabs, notes, videos,
          assignments, PDFs, and random AI tools. ARC brings everything together
          into one calm workspace where courses, notes, lectures, files,
          projects, and tutoring all work together naturally.
        </p>
        <p>
          Instead of acting like another chatbot, ARC becomes part of the
          learning experience itself.
        </p>
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        <ArcButton href="/sign-up">Start Learning</ArcButton>
        <ArcButton href="/courses" variant="ghost">
          Browse courses →
        </ArcButton>
      </div>
    </article>
  );
}
