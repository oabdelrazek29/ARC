"use client";

import { motion } from "framer-motion";

import { TypewriterLabel } from "@/components/TypewriterLabel";
import { ArcButton } from "@/components/arc-ui/ArcButton";
import { HeroDropCap } from "@/components/home/HeroDropCap";
import { FigureOne } from "@/components/home/figures/ArcFigures";
import { TutorReasonsSection } from "@/components/tutor/TutorReasonsSection";
import { fadeIn, fadeUp, scaleUp, viewportOnce } from "@/lib/motion";

import "./home.css";

const STEPS = [
  {
    label: "01  Mvt. I",
    title: "Drop in your course material.",
    body: "No syllabus required. Just a topic, a goal, or a reading.",
  },
  {
    label: "02  Mvt. II",
    title: "Watch ARC break it down.",
    body: "Lessons, summaries, quizzes, and structure — built for you.",
  },
  {
    label: "03  Mvt. III",
    title: "Study how you study best.",
    body: "Ask questions. Take notes. ARC adapts when you get stuck.",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "I uploaded a full lecture PDF the night before the midterm. Got the summary, a glossary, and flashcards in under two minutes. I actually slept.",
    name: "Elena Rodriguez",
    meta: "Pre-med Sophomore, UCLA · Los Angeles, CA",
  },
  {
    quote:
      "ARC turned my lecture slides into practice questions with explanations. It feels like a TA that never goes to office hours.",
    name: "Marcus Chen",
    meta: "Computer Science, University of Washington · Seattle, WA",
  },
] as const;

export function HomeExperience() {
  return (
    <div className="arc-home w-full">
      <div className="clarity-edition-bar">
        <div className="clarity-edition-bar__inner clarity-container">
          <TypewriterLabel
            text="№ I · Edition MMXXVI · Vol. I"
            className="arc-mono text-[11px] text-[var(--arc-tertiary)]"
            delay={0}
            speed={22}
          />
          <TypewriterLabel
            text="Built for students · Est. 2026"
            className="arc-mono text-[11px] text-[var(--arc-tertiary)]"
            delay={400}
            speed={22}
          />
        </div>
      </div>

      <section className="clarity-container clarity-hero">
        <motion.div {...fadeUp}>
          <TypewriterLabel
            text="§ The Learning System · Begin your journey · Edition MMXXVI"
            className="arc-section-marker block"
            delay={300}
          />
        </motion.div>
        <motion.div
          className="clarity-hero__terminal mt-6"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
        >
          <TypewriterLabel
            text="$ ./arc --learn --since=MMXXVI"
            className="arc-mono text-[12px] text-[var(--arc-tertiary)]"
            speed={35}
          />
        </motion.div>

        <HeroDropCap />

        <motion.p
          className="arc-lead mt-10 max-w-xl text-lg"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
        >
          ARC combines immersive reading, structured coursework, intelligent
          tutoring, and adaptive learning into one calm and powerful workspace
          designed to help students actually understand what they study.
        </motion.p>
        <motion.div
          className="mt-12 flex flex-wrap gap-3"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
        >
          <ArcButton href="/dashboard">Start Learning</ArcButton>
          <ArcButton href="/courses" variant="ghost">
            Explore ARC →
          </ArcButton>
        </motion.div>
        <motion.p
          className="arc-mono mt-8 text-[11px] text-[var(--arc-tertiary)]"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Built for students, developers, researchers, and lifelong learners who
          want a calmer, more intelligent way to learn.
        </motion.p>
        <motion.div
          className="clarity-hero__image"
          initial={scaleUp.initial}
          animate={scaleUp.animate}
          transition={scaleUp.transition}
        >
          <FigureOne />
        </motion.div>
      </section>

      <section className="clarity-container clarity-section">
        <TutorReasonsSection />
      </section>

      <section className="clarity-container clarity-section border-t border-[var(--arc-border)]">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          <TypewriterLabel
            text="§ III — The method"
            className="arc-section-marker block"
          />
          <h2 className="arc-section-title mt-4">
            Three steps,
            <br />
            one study session saved.
          </h2>
          <div className="mt-10 max-w-2xl">
            {STEPS.map((s) => (
              <div key={s.label} className="clarity-step">
                <p className="clarity-step__label">{s.label}</p>
                <h3 className="clarity-step__title">{s.title}</h3>
                <p className="clarity-faculty-item__body">{s.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="clarity-container clarity-section border-t border-[var(--arc-border)]">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          <TypewriterLabel
            text="§ IV — Correspondence · received from the field"
            className="arc-section-marker block"
          />
          <h2 className="arc-section-title mt-4">
            Notes from
            <br />
            the library.
          </h2>
          <div className="mt-10 max-w-2xl">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="clarity-quote">
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <cite>
                  {t.name}
                  <br />
                  {t.meta}
                </cite>
              </figure>
            ))}
          </div>
        </motion.div>
      </section>

      <section
        id="pricing"
        className="clarity-container clarity-section border-t border-[var(--arc-border)]"
      >
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          <TypewriterLabel
            text="§ V — The invitation · Ready when you are"
            className="arc-section-marker block"
          />
          <h2 className="arc-section-title mt-4">
            Stop studying harder.
            <br />
            Start understanding deeper.
          </h2>
          <p className="arc-lead mt-8 max-w-xl">
            Upload your reading, start a course, or ask the AI tutor anything.
            Free to start. No credit card.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <ArcButton href="/sign-up">Start Learning</ArcButton>
            <ArcButton href="/subscription" variant="ghost">
              See pricing →
            </ArcButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
