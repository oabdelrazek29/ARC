"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { StudyFlashcards } from "@/components/ai/StudyFlashcards";
import { TeachingMarkdown } from "@/components/ai/TeachingMarkdown";
import type { TeachingPayload } from "@/lib/ai/teaching-format";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  teaching?: TeachingPayload;
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text: `I'm your ARC Professor — not a generic chatbot.

Ask for a **lesson plan**, **resources**, **flashcards** (Quizlet-style), or say what you want to learn. I'll teach step-by-step and point you to Cognitive OS and voice tutors when they help.`,
};

const SUGGESTIONS = [
  "Teach me the basics of calculus",
  "Lesson plan for Python in 2 weeks",
  "Quizlet-style flashcards for biology",
  "Resources to learn data structures",
] as const;

function HomeAdvisorPanelInner() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

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

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        text: trimmed,
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setLoading(true);

      let reply =
        "Add **OPENAI_API_KEY** in `.env.local` for full lessons. Meanwhile: pick one topic, ask for a lesson plan, then open **Cognitive** to map your mental model and **Tutors** for voice practice.";
      let teaching: TeachingPayload | undefined;

      try {
        const topic =
          typeof window !== "undefined"
            ? localStorage.getItem("arc-learning-topic") ?? undefined
            : undefined;
        const res = await fetch("/api/ai/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, topic }),
        });
        const data = (await res.json()) as {
          reply?: string;
          payload?: TeachingPayload;
        };
        if (data.reply?.trim()) reply = data.reply.trim();
        if (data.payload) teaching = data.payload;
        if (typeof window !== "undefined" && trimmed.length > 3) {
          localStorage.setItem("arc-learning-topic", trimmed.slice(0, 120));
        }
      } catch {
        /* fallback reply above */
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
    [loading]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      void send(input);
    },
    [input, send]
  );

  const chips = useMemo(() => SUGGESTIONS, []);

  return (
    <div className="arc-advisor-chat flex h-full min-h-0 flex-col">
      <div
        ref={listRef}
        className="arc-advisor-chat__messages flex-1 overflow-y-auto"
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
                {msg.teaching?.flashcards && msg.teaching.flashcards.length > 0 && (
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
            <span className="arc-advisor-typing" aria-label="Building lesson">
              <span />
              <span />
              <span />
            </span>
            <p className="mt-2 text-xs text-[var(--arc-muted)]">
              Building lesson plan, resources, and practice…
            </p>
          </div>
        )}
      </div>

      {!loading && (
        <div className="arc-advisor-chips">
          {chips.map((s) => (
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

      <form onSubmit={onSubmit} className="arc-advisor-chat__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What should ARC teach you?"
          className="arc-advisor-input"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="arc-btn arc-btn-primary shrink-0 text-xs"
        >
          Teach me
        </button>
      </form>
    </div>
  );
}

export const HomeAdvisorPanel = memo(HomeAdvisorPanelInner);
