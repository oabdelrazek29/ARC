"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, MessageCircle, PenLine, Sparkles } from "lucide-react";

import type { TutorSessionPayload } from "@/types/tutor-session";
import { cn } from "@/lib/utils";

type Props = {
  payload: TutorSessionPayload;
  demo?: boolean;
};

export function TutorLearningBlock({ payload, demo }: Props) {
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <motion.article
      className="tutor-block"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      {demo && (
        <p className="tutor-block__demo-badge arc-mono">
          Demo mode — add OPENAI_API_KEY for live tutoring
        </p>
      )}

      <section className="tutor-block__section">
        <p className="tutor-block__label">
          <Sparkles className="h-3 w-3" aria-hidden />
          Explanation
        </p>
        <p className="tutor-block__body">{payload.explanation}</p>
      </section>

      <section className="tutor-block__section tutor-block__section--example">
        <p className="tutor-block__label">
          <PenLine className="h-3 w-3" aria-hidden />
          Example
        </p>
        <p className="tutor-block__body">{payload.example}</p>
      </section>

      {payload.practiceQuestion && (
        <section className="tutor-block__section tutor-block__section--practice">
          <p className="tutor-block__label">Practice</p>
          <p className="tutor-block__practice">{payload.practiceQuestion}</p>
        </section>
      )}

      {payload.hint && (
        <div className="tutor-block__hint-wrap">
          <button
            type="button"
            onClick={() => setHintOpen((o) => !o)}
            className={cn("tutor-block__hint-btn", hintOpen && "tutor-block__hint-btn--open")}
          >
            <Lightbulb className="h-3.5 w-3.5" aria-hidden />
            {hintOpen ? "Hide hint" : "Show hint"}
          </button>
          {hintOpen && (
            <motion.p
              className="tutor-block__hint-text"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {payload.hint}
            </motion.p>
          )}
        </div>
      )}

      {payload.followUp && (
        <section className="tutor-block__section tutor-block__section--follow">
          <p className="tutor-block__label">
            <MessageCircle className="h-3 w-3" aria-hidden />
            Next step
          </p>
          <p className="tutor-block__body">{payload.followUp}</p>
        </section>
      )}
    </motion.article>
  );
}
