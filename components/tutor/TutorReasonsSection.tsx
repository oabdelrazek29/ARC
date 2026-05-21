"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import {
  IllustAdaptiveFeedback,
  IllustConceptViz,
  IllustDoubtSolving,
  IllustExamPrep,
  IllustLearningPath,
} from "@/components/tutor/TutorIllustrations";
import { TypewriterLabel } from "@/components/TypewriterLabel";
import { cn } from "@/lib/utils";

const REASONS = [
  {
    id: "path",
    title: "Personalized learning path",
    line: "Routes that branch to match your level, pace, and goals.",
    Illust: IllustLearningPath,
    scenario:
      "You are strong in algebra but weak in trigonometry. ARC branches your path so you do not repeat what you already know.",
    tutorApply:
      "The tutor reads your progress and suggests the next lesson on the branch you actually need — not a generic syllabus.",
  },
  {
    id: "doubt",
    title: "Instant doubt solving",
    line: "A question becomes a clear explanation in one calm session.",
    Illust: IllustDoubtSolving,
    scenario:
      "You are stuck on why the chain rule multiplies derivatives at 11pm before a quiz.",
    tutorApply:
      "You ask in plain language. The tutor explains simply, shows an example, then gives a practice question with a hint if you need it.",
  },
  {
    id: "exam",
    title: "Exam preparation mode",
    line: "Focused blocks, timers, and practice aligned to test day.",
    Illust: IllustExamPrep,
    scenario:
      "Your midterm is in five days and you have three chapters left.",
    tutorApply:
      "The tutor prioritizes high-yield topics, drills you with questions, and suggests what to skip when time is short.",
  },
  {
    id: "viz",
    title: "Concept visualization",
    line: "Abstract ideas shaped into examples you can picture.",
    Illust: IllustConceptViz,
    scenario:
      "Gradient descent feels like a formula with no meaning.",
    tutorApply:
      "The tutor uses analogies and step-by-step examples so the concept lands before you touch notation.",
  },
  {
    id: "adaptive",
    title: "Adaptive feedback",
    line: "Difficulty rises when you are ready — not before.",
    Illust: IllustAdaptiveFeedback,
    scenario:
      "Practice feels too easy, then suddenly too hard.",
    tutorApply:
      "The tutor adjusts follow-up questions and hints based on whether you answered the last check correctly.",
  },
] as const;

type Props = {
  showHeader?: boolean;
  className?: string;
};

export function TutorReasonsSection({ showHeader = true, className }: Props) {
  const [active, setActive] = useState<(typeof REASONS)[number] | null>(null);

  return (
    <section className={cn("tutor-reasons", className)}>
      {showHeader && (
        <div className="tutor-reasons__header">
          <TypewriterLabel
            text="§ Why students use the tutor · Edition MMXXVI"
            className="arc-section-marker block"
          />
          <h2 className="arc-section-title mt-4">
            Five ways ARC
            <br />
            meets real study problems.
          </h2>
        </div>
      )}

      <div className="tutor-reasons__grid">
        {REASONS.map((r, i) => (
          <motion.button
            key={r.id}
            type="button"
            className="tutor-reason-card"
            onClick={() => setActive(r)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 25 } }}
          >
            <div className="tutor-reason-card__glow" aria-hidden />
            <r.Illust />
            <h3 className="tutor-reason-card__title">{r.title}</h3>
            <p className="tutor-reason-card__line">{r.line}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="tutor-reason-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="tutor-reason-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="tutor-reason-modal__close"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <active.Illust />
              <h3 className="tutor-reason-modal__title">{active.title}</h3>
              <p className="tutor-reason-modal__section-label arc-mono">Example scenario</p>
              <p className="tutor-reason-modal__body">{active.scenario}</p>
              <p className="tutor-reason-modal__section-label arc-mono">How the tutor applies it</p>
              <p className="tutor-reason-modal__body">{active.tutorApply}</p>
              <a href="/tutor" className="arc-btn arc-btn-primary mt-6 inline-flex">
                Try it in the tutor →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
