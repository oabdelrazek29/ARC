"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text: "Ask about a topic, a lesson plan, or where to start. I read your goal and suggest the next clear step.",
};

const SUGGESTIONS = [
  "Where should I start?",
  "Break down machine learning",
  "Plan a short study session",
] as const;

const DEMO_REPLIES: Record<string, string> = {
  default:
    "Start with one concept you can explain in your own words. ARC will turn that into lessons, practice, and a path that shifts when you get stuck.",
  "where should i start":
    "Name the outcome you want — not the whole field. ARC builds a first lesson plan from that, then adds video and practice only where you need them.",
  "break down machine learning":
    "Think in layers: what data means, how models learn, how you judge if they work. ARC sequences those as lessons before any heavy math.",
  "plan a short study session":
    "Twenty minutes: one lesson, one practice check, one sentence written in your own words. ARC keeps the plan short so it actually gets done.",
};

function pickReply(input: string): string {
  const key = input.trim().toLowerCase();
  for (const [k, v] of Object.entries(DEMO_REPLIES)) {
    if (k !== "default" && key.includes(k)) return v;
  }
  return DEMO_REPLIES.default;
}

function streamText(
  full: string,
  onChunk: (partial: string) => void,
  onDone: () => void
) {
  let i = 0;
  const step = () => {
    if (i >= full.length) {
      onDone();
      return;
    }
    i += Math.min(3, full.length - i);
    onChunk(full.slice(0, i));
    window.setTimeout(step, 16);
  };
  step();
}

function HomeAdvisorPanelInner() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, typing, scrollToEnd]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        text: trimmed,
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setTyping(true);

      let reply = pickReply(trimmed);

      try {
        const res = await fetch("/api/ai/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
        });
        const data = (await res.json()) as { reply?: string };
        if (data.reply?.trim()) reply = data.reply.trim();
      } catch {
        /* demo reply */
      }

      const assistantId = `a-${Date.now()}`;
      setTyping(false);
      setStreamingId(assistantId);
      setMessages((m) => [
        ...m,
        { id: assistantId, role: "assistant", text: "" },
      ]);

      streamText(
        reply,
        (partial) => {
          setMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId ? { ...msg, text: partial } : msg
            )
          );
        },
        () => setStreamingId(null)
      );
    },
    [typing]
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
      <div ref={listRef} className="arc-advisor-chat__messages flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "arc-advisor-bubble",
              msg.role === "user"
                ? "arc-advisor-bubble--user"
                : "arc-advisor-bubble--assistant"
            )}
          >
            <p className="text-sm leading-relaxed">{msg.text}</p>
          </div>
        ))}
        {typing && (
          <div className="arc-advisor-bubble arc-advisor-bubble--assistant">
            <span className="arc-advisor-typing" aria-label="Typing">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>

      {streamingId === null && !typing && (
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
          placeholder="Ask ARC…"
          className="arc-advisor-input"
          disabled={typing || streamingId !== null}
        />
        <button
          type="submit"
          disabled={!input.trim() || typing || streamingId !== null}
          className="arc-btn arc-btn-primary shrink-0 text-xs"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export const HomeAdvisorPanel = memo(HomeAdvisorPanelInner);
