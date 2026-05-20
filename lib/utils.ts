import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import type { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string) => {
  const voiceMap = voices[voice as keyof typeof voices];
  const voiceId =
    voiceMap?.[style as keyof typeof voiceMap] ?? "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "ARC Tutor",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are ARC's voice tutor in a real-time session. Teach {{ topic }} under {{ subject }}. Style: {{ style }}. Keep responses short and conversational.`,
        },
      ],
    },
    clientMessages: undefined,
    serverMessages: undefined,
  };
  return vapiAssistant;
};
