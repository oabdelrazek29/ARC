"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { ImagePlus, Paperclip, Send, X } from "lucide-react";

import { TutorLearningBlock } from "@/components/tutor/TutorLearningBlock";
import type { TutorAttachment, TutorChatMessage } from "@/types/tutor-session";
import { useArcStore } from "@/store/arc-store";
import { cn } from "@/lib/utils";

const WELCOME: TutorChatMessage = {
  id: "welcome",
  role: "assistant",
  payload: {
    explanation:
      "This is your study space. Ask a question, paste a problem, or attach notes or a photo — I will explain it simply, show an example, and check your understanding.",
    example:
      "Try: \"Explain the chain rule like I'm seeing it for the first time\" or attach a screenshot of a homework question.",
    practiceQuestion: "What topic are you working on right now?",
    hint: "One specific question works better than \"help me study everything.\"",
    followUp: "Upload a file or image with the + button below, same as ChatGPT or Claude.",
  },
};

const STARTERS = [
  "Explain this concept simply",
  "Give me a practice question",
  "I'm stuck on my homework",
  "Help me prep for an exam",
] as const;

const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ACCEPT = "image/*,.txt,.md,.csv,text/plain";

async function fileToAttachment(file: File): Promise<TutorAttachment | null> {
  if (file.size > MAX_FILE_BYTES) return null;

  const id = `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  if (file.type.startsWith("image/")) {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    return { id, name: file.name, type: file.type, dataUrl };
  }

  if (
    file.type.startsWith("text/") ||
    file.name.endsWith(".md") ||
    file.name.endsWith(".txt") ||
    file.name.endsWith(".csv")
  ) {
    const text = await file.text();
    return { id, name: file.name, type: file.type || "text/plain", text };
  }

  return null;
}

type Props = {
  className?: string;
};

export function AiTutorPanel({ className }: Props) {
  const [messages, setMessages] = useState<TutorChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState<TutorAttachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [aiConfigured, setAiConfigured] = useState<boolean | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const goals = useArcStore((s) => s.goals);
  const courseContext =
    goals.find((g) => g.treeId)?.title ?? undefined;

  const scrollEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollEnd();
  }, [messages, loading, scrollEnd]);

  useEffect(() => {
    fetch("/api/ai/status")
      .then((r) => r.json())
      .then((data: { configured?: boolean }) => {
        setAiConfigured(Boolean(data.configured));
      })
      .catch(() => setAiConfigured(false));
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if ((!trimmed && pending.length === 0) || loading) return;

      const userMsg: TutorChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        text: trimmed || "(attached files)",
        attachments: pending.map((p) => ({ name: p.name, type: p.type })),
      };

      setMessages((m) => [...m, userMsg]);
      setInput("");
      const attachments = [...pending];
      setPending([]);
      setLoading(true);

      const history: { role: "user" | "assistant"; content: string }[] = [];
      for (const m of messages.filter((x) => x.id !== "welcome").slice(-8)) {
        if (m.role === "user" && m.text) {
          history.push({ role: "user", content: m.text });
        } else if (m.role === "assistant" && m.payload) {
          history.push({
            role: "assistant",
            content: `${m.payload.explanation}\n${m.payload.example}`,
          });
        }
      }

      try {
        const res = await fetch("/api/ai/tutor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed || "Help me with the attached material.",
            history,
            attachments: attachments.map((a) => ({
              name: a.name,
              type: a.type,
              text: a.text,
              dataUrl: a.dataUrl,
            })),
            courseContext,
          }),
        });

        const data = (await res.json()) as {
          payload?: TutorChatMessage["payload"];
          demo?: boolean;
          configured?: boolean;
          error?: string;
        };

        if (!data.payload) {
          throw new Error(data.error ?? "No response");
        }

        if (typeof data.configured === "boolean") {
          setAiConfigured(data.configured);
        }

        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            payload: data.payload,
            demo: data.demo,
            configured: data.configured,
          },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            payload: {
              explanation: "Something went wrong reaching the tutor. Check your connection and try again.",
              example: "If this keeps happening, confirm OPENAI_API_KEY is set in .env.local and restart the dev server.",
              practiceQuestion: "Would you like to rephrase your question?",
              hint: "Keep questions focused on one concept at a time.",
              followUp: "Try sending your message again in a moment.",
            },
            demo: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, pending, messages, courseContext]
  );

  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files?.length) return;
    const next: TutorAttachment[] = [];
    for (const file of Array.from(files).slice(0, 4)) {
      const att = await fileToAttachment(file);
      if (att) next.push(att);
    }
    setPending((p) => [...p, ...next].slice(0, 5));
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  return (
    <div className={cn("tutor-panel", className)}>
      <div className="tutor-panel__glow" aria-hidden />

      {aiConfigured !== null && (
        <p
          className={cn(
            "tutor-panel__ai-status arc-mono",
            aiConfigured ? "tutor-panel__ai-status--on" : "tutor-panel__ai-status--off"
          )}
        >
          {aiConfigured ? "● OpenAI connected" : "○ OpenAI not configured — add OPENAI_API_KEY"}
        </p>
      )}

      <div ref={listRef} className="tutor-panel__messages">
        {messages.map((m) =>
          m.role === "user" ? (
            <motion.div
              key={m.id}
              className="tutor-panel__user"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {m.attachments?.length ? (
                <div className="tutor-panel__user-files arc-mono">
                  {m.attachments.map((a) => (
                    <span key={a.name}>{a.name}</span>
                  ))}
                </div>
              ) : null}
              <p>{m.text}</p>
            </motion.div>
          ) : m.payload ? (
            <TutorLearningBlock
              key={m.id}
              payload={m.payload}
              demo={m.demo}
              configured={m.configured ?? aiConfigured ?? undefined}
            />
          ) : null
        )}

        {loading && (
          <div className="tutor-typing" aria-live="polite">
            <span className="tutor-typing__dot" />
            <span className="tutor-typing__dot" />
            <span className="tutor-typing__dot" />
            <span className="tutor-typing__label arc-mono">Tutor is thinking…</span>
          </div>
        )}
      </div>

      <div className="tutor-panel__starters">
        {STARTERS.map((s) => (
          <button
            key={s}
            type="button"
            className="tutor-panel__starter"
            disabled={loading}
            onClick={() => send(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {pending.length > 0 && (
        <div className="tutor-panel__attachments">
          {pending.map((a) => (
            <span key={a.id} className="tutor-panel__chip">
              {a.dataUrl ? (
                <ImagePlus className="h-3 w-3 shrink-0" aria-hidden />
              ) : (
                <Paperclip className="h-3 w-3 shrink-0" aria-hidden />
              )}
              <span className="truncate max-w-[140px]">{a.name}</span>
              <button
                type="button"
                onClick={() => setPending((p) => p.filter((x) => x.id !== a.id))}
                aria-label={`Remove ${a.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className={cn("tutor-panel__composer", focused && "tutor-panel__composer--focus")}>
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          onChange={(e) => onFiles(e.target.files)}
        />
        <button
          type="button"
          className="tutor-panel__attach"
          onClick={() => fileRef.current?.click()}
          disabled={loading}
          title="Attach image or text file"
        >
          <Paperclip className="h-5 w-5" aria-hidden />
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask anything — attach notes or a photo with +"
          rows={2}
          disabled={loading}
          className="tutor-panel__input"
        />
        <button
          type="button"
          className="tutor-panel__send"
          disabled={loading || (!input.trim() && pending.length === 0)}
          onClick={() => send(input)}
          aria-label="Send"
        >
          <Send className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
