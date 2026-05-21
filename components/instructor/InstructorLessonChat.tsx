"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { StudyFlashcards } from "@/components/ai/StudyFlashcards";
import { TeachingMarkdown } from "@/components/ai/TeachingMarkdown";
import type { TeachingPayload } from "@/lib/ai/teaching-format";
import { cn } from "@/lib/utils";
import { useInstructorStore } from "@/store/instructor-store";
import type { InstructorMessage } from "@/types/instructor";

const WELCOME: InstructorMessage = {
  id: "welcome",
  role: "assistant",
  text: `I'm your **Instructor Master** — strategist, tutor, and curriculum architect.

Ask for a full lesson, roadmap, quiz, project brief, or say what you want to learn. I adapt to any subject: coding, math, languages, sciences, humanities, and more.`,
};

const SUGGESTIONS = [
  "Teach me integration by parts",
  "12-week roadmap to become an AI engineer",
  "Generate flashcards for organic chemistry",
  "Project: build a REST API in Python",
] as const;

type Props = {
  context?: {
    goal?: string;
    topic?: string;
    nodeTitle?: string;
    nodeDescription?: string;
    graphId?: string;
  };
  onTeaching?: (payload: TeachingPayload) => void;
};

function InstructorLessonChatInner({ context, onTeaching }: Props) {
  const [messages, setMessages] = useState<InstructorMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const recordTopic = useInstructorStore((s) => s.recordTopic);
  const setSession = useInstructorStore((s) => s.setSession);

  useEffect(() => {
    if (context?.goal || context?.topic) {
      setSession({
        goal: context.goal,
        topic: context.topic,
        nodeTitle: context.nodeTitle,
        graphId: context.graphId,
      });
    }
  }, [context, setSession]);

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, loading, scrollToEnd]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setMessages((m) => [
        ...m,
        { id: `u-${Date.now()}`, role: "user", text: trimmed },
      ]);
      setInput("");
      setLoading(true);
      recordTopic(trimmed);

      let reply =
        "Add **OPENAI_API_KEY** in `.env.local` for full Instructor Master lessons, quizzes, and roadmaps.";
      let teaching: TeachingPayload | undefined;

      try {
        const res = await fetch("/api/ai/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            topic: context?.topic,
            goal: context?.goal,
            nodeTitle: context?.nodeTitle,
            nodeDescription: context?.nodeDescription,
            graphId: context?.graphId,
            mode: "instructor",
          }),
        });
        const data = (await res.json()) as {
          reply?: string;
          payload?: TeachingPayload;
        };
        if (data.reply?.trim()) reply = data.reply.trim();
        if (data.payload) {
          teaching = data.payload;
          onTeaching?.(data.payload);
        }
      } catch {
        /* fallback */
      }

      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: reply,
          teaching,
        },
      ]);
      setLoading(false);
    },
    [loading, context, recordTopic, onTeaching]
  );

  return (
    <div className="arc-instructor-chat flex h-full min-h-0 flex-col">
      <div
        ref={listRef}
        className="arc-instructor-chat__messages flex-1 overflow-y-auto"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "arc-advisor-bubble",
              msg.role === "user"
                ? "arc-advisor-bubble--user"
                : "arc-advisor-bubble--assistant arc-advisor-bubble--teaching"
            )}
          >
            {msg.role === "assistant" ? (
              <>
                <TeachingMarkdown text={msg.text} />
                {msg.teaching?.flashcards &&
                  msg.teaching.flashcards.length > 0 && (
                    <StudyFlashcards
                      cards={msg.teaching.flashcards}
                      className="mt-4"
                    />
                  )}
              </>
            ) : (
              <p className="arc-advisor-bubble__text">{msg.text}</p>
            )}
          </div>
        ))}
        {loading && (
          <div className="arc-advisor-bubble arc-advisor-bubble--assistant">
            <span className="arc-advisor-typing" aria-label="Generating">
              <span />
              <span />
              <span />
            </span>
            <p className="mt-2 text-xs text-[var(--arc-muted)]">
              Generating lesson, objectives, practice, and plan…
            </p>
          </div>
        )}
      </div>

      {!loading && (
        <div className="arc-advisor-chips">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => void send(s)}
              className="arc-advisor-chip"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="arc-advisor-chat__input"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What should I teach you?"
          className="arc-advisor-input"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="arc-btn arc-btn-primary shrink-0 text-xs"
        >
          Teach
        </button>
      </form>
    </div>
  );
}

export const InstructorLessonChat = memo(InstructorLessonChatInner);
