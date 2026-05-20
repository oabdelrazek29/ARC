import type { Metadata } from "next";
import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { ArcWatermark } from "@/components/layout/ArcWatermark";

export const metadata: Metadata = {
  title: "About",
  description:
    "ARC is a learning system built for people who want to actually understand things.",
};

export default function AboutPage() {
  return (
    <div className="arc-page arc-watermark-wrap relative">
      <article className="arc-section-wide py-16 md:py-24">
        <p className="arc-section-marker">
          § — From the desk · About ARC
          <br />
          Edition MMXXVI · Vol. II
        </p>
        <h1 className="arc-display mt-8 max-w-3xl">
          A learning system built for people who actually want to understand
          things.
        </h1>
        <p className="arc-lead mt-8 max-w-2xl text-base">
          ARC started because learning something new shouldn&apos;t feel like
          searching for a needle in a haystack of YouTube videos and
          half-finished courses. We wanted a system that actually structures
          knowledge — not just delivers it. So we built one.
        </p>

        <blockquote className="arc-pull-quote">
          <p>
            Understanding something shouldn&apos;t depend on how much time you
            have. It should depend on how clearly the path has been laid out for
            you.
          </p>
          <cite>— The ARC team</cite>
        </blockquote>

        <div className="mt-16 space-y-10 max-w-2xl">
          <div className="arc-principle">
            <p className="arc-principle__num">I.// Structured</p>
            <p className="arc-principle__title">
              Every path, built around how you think.
            </p>
            <p className="arc-lead text-sm">
              ARC doesn&apos;t give you a list of resources. It maps what you
              need to know and sequences it in a way that actually builds
              understanding.
            </p>
          </div>
          <div className="arc-principle">
            <p className="arc-principle__num">II.// Adaptive</p>
            <p className="arc-principle__title">It changes as you do.</p>
            <p className="arc-lead text-sm">
              If you get stuck, ARC adjusts. If you move fast, it moves with
              you. The system learns your pace, not the other way around.
            </p>
          </div>
          <div className="arc-principle">
            <p className="arc-principle__num">III.// Honest</p>
            <p className="arc-principle__title">
              A tool, not a replacement for thinking.
            </p>
            <p className="arc-lead text-sm">
              ARC won&apos;t think for you. It prepares the path so you can
              actually walk it — and come out the other side having actually
              learned something.
            </p>
          </div>
          <div className="arc-principle">
            <p className="arc-principle__num">IV.// Yours</p>
            <p className="arc-principle__title">Your learning stays yours.</p>
            <p className="arc-lead text-sm">
              Your sessions, your paths, your progress — encrypted, private,
              and never used to train anything. What you build here belongs to
              you.
            </p>
          </div>
        </div>

        <section className="mt-20">
          <p className="arc-section-marker">
            § III — The Chronology
            <br />
            A short history of the system.
          </p>
          <ul className="mt-8 space-y-6 max-w-2xl">
            <li>
              <p className="arc-mono text-xs text-[var(--arc-accent)]">
                MMXXVI · I — Founded
              </p>
              <p className="arc-lead mt-2 text-sm">
                Built by a CS student tired of learning from scattered resources
                with no structure.
              </p>
            </li>
            <li>
              <p className="arc-mono text-xs text-[var(--arc-accent)]">
                MMXXVI · II — Core Engine
              </p>
              <p className="arc-lead mt-2 text-sm">
                The learning path engine ships — adaptive sequencing based on how
                you move through material.
              </p>
            </li>
            <li>
              <p className="arc-mono text-xs text-[var(--arc-accent)]">
                MMXXVI · III — ARC Adviser
              </p>
              <p className="arc-lead mt-2 text-sm">
                An AI adviser joins the system — available inline, never
                intrusive.
              </p>
            </li>
            <li>
              <p className="arc-mono text-xs text-[var(--arc-accent)]">
                MMXXVI · IV — Graph Mode
              </p>
              <p className="arc-lead mt-2 text-sm">
                Knowledge graph view launches — visualize how concepts connect
                across your entire learning path.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-20">
          <p className="arc-section-marker">§ IV — A standing invitation</p>
          <h2 className="arc-heading text-2xl">Come learn with us.</h2>
          <p className="arc-lead mt-4 max-w-xl">
            Whether you&apos;re starting from zero or trying to finally close the
            gaps — ARC is here. Bring a topic. We&apos;ll handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ArcButton href="/cognitive">Enter ARC →</ArcButton>
            <Link href="mailto:hello@arc.local" className="arc-btn arc-btn-ghost">
              Email the team →
            </Link>
          </div>
        </section>
      </article>

      <ArcWatermark />
    </div>
  );
}
