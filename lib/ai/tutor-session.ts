import { ARC_PROFESSOR_SYSTEM } from "@/lib/ai/professor-prompt";
import {
  formatOpenAIError,
  getOpenAIModel,
  isOpenAIConfigured,
} from "@/lib/ai/env";
import { getOpenAIClient } from "@/lib/ai/openai-client";
import type { TutorSessionPayload } from "@/types/tutor-session";

export type TutorAttachmentInput = {
  name: string;
  type: string;
  text?: string;
  dataUrl?: string;
};

export type TutorSessionResult = {
  payload: TutorSessionPayload;
  demo: boolean;
  configured: boolean;
  error?: string;
};

const TUTOR_JSON_SCHEMA = `Return ONLY valid JSON:
{
  "explanation": "2-4 sentences, simple and direct",
  "example": "One concrete example with specifics",
  "practiceQuestion": "One question to check understanding",
  "hint": "A nudge without giving the full answer",
  "followUp": "What to try next or a related question to explore"
}`;

function parsePayload(raw: string): TutorSessionPayload | null {
  try {
    const p = JSON.parse(raw) as TutorSessionPayload;
    if (!p.explanation || !p.example) return null;
    return {
      explanation: String(p.explanation).trim(),
      example: String(p.example).trim(),
      practiceQuestion: String(p.practiceQuestion ?? "").trim(),
      hint: String(p.hint ?? "").trim(),
      followUp: String(p.followUp ?? "").trim(),
    };
  } catch {
    return null;
  }
}

function demoPayload(message: string, reason?: string): TutorSessionPayload {
  const lead =
    reason ??
    "OpenAI is not connected. Add OPENAI_API_KEY to .env.local for local dev, or to Vercel → Project → Settings → Environment Variables for the live site. Restart the dev server after changing env.";

  return {
    explanation: lead,
    example: `You asked about "${message.slice(0, 80)}". Once connected, the tutor explains simply, shows an example, then checks your understanding.`,
    practiceQuestion:
      "After adding the key, ask a short question here to confirm live mode works.",
    hint: "The variable name must be exactly OPENAI_API_KEY (no typos).",
    followUp:
      "Visit /api/ai/status while the app is running — configured should be true.",
  };
}

export async function tutorSession(
  message: string,
  opts: {
    history?: { role: "user" | "assistant"; content: string }[];
    attachments?: TutorAttachmentInput[];
    courseContext?: string;
  } = {}
): Promise<TutorSessionResult> {
  const configured = isOpenAIConfigured();

  if (!configured) {
    return {
      payload: demoPayload(message),
      demo: true,
      configured: false,
    };
  }

  const client = getOpenAIClient();
  if (!client) {
    return {
      payload: demoPayload(message),
      demo: true,
      configured: false,
    };
  }

  const model = getOpenAIModel();

  const attachmentNote =
    opts.attachments?.length ?
      opts.attachments
        .map((a) => {
          if (a.text) return `[File: ${a.name}]\n${a.text.slice(0, 8000)}`;
          if (a.dataUrl) return `[Image attached: ${a.name}]`;
          return `[Attachment: ${a.name}]`;
        })
        .join("\n\n")
    : "";

  const userText = [
    opts.courseContext ? `Context: ${opts.courseContext}` : "",
    attachmentNote,
    message.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  const historyMessages = (opts.history ?? []).slice(-6).map((h) => ({
    role: h.role as "user" | "assistant",
    content: h.content,
  }));

  const hasImages = opts.attachments?.some((a) =>
    a.dataUrl?.startsWith("data:image")
  );

  try {
    if (hasImages) {
      const imageParts: Array<
        | { type: "text"; text: string }
        | { type: "image_url"; image_url: { url: string } }
      > = [
        {
          type: "text",
          text: `${TUTOR_JSON_SCHEMA}\n\nStudent message and files:\n${userText}`,
        },
      ];
      for (const a of opts.attachments ?? []) {
        if (a.dataUrl?.startsWith("data:image")) {
          imageParts.push({
            type: "image_url",
            image_url: { url: a.dataUrl },
          });
        }
      }

      const completion = await client.chat.completions.create({
        model,
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: 1200,
        messages: [
          {
            role: "system",
            content: `${ARC_PROFESSOR_SYSTEM}\n\nYou are in TUTOR SESSION mode. Teach in steps. ${TUTOR_JSON_SCHEMA}`,
          },
          ...historyMessages,
          {
            role: "user",
            content: imageParts,
          },
        ],
      });

      const text = completion.choices[0]?.message?.content;
      const payload = text ? parsePayload(text) : null;
      if (payload) return { payload, demo: false, configured: true };
    }

    const completion = await client.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 1200,
      messages: [
        {
          role: "system",
          content: `${ARC_PROFESSOR_SYSTEM}\n\nYou are in TUTOR SESSION mode. Teach in steps — explain simply, example, practice question, hint, follow-up. Never be a generic chatbot. ${TUTOR_JSON_SCHEMA}`,
        },
        ...historyMessages,
        { role: "user", content: userText },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("Empty tutor response");
    const payload = parsePayload(text);
    if (!payload) throw new Error("Invalid tutor JSON");
    return { payload, demo: false, configured: true };
  } catch (e) {
    console.error("[tutor-session]", e);
    const error = formatOpenAIError(e);
    return {
      payload: demoPayload(message, error),
      demo: true,
      configured: true,
      error,
    };
  }
}
