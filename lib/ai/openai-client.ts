import OpenAI from "openai";

import { getOpenAIApiKey, isOpenAIConfigured } from "@/lib/ai/env";

export function getOpenAIClient(): OpenAI | null {
  const key = getOpenAIApiKey();
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

export function hasOpenAI(): boolean {
  return isOpenAIConfigured();
}
