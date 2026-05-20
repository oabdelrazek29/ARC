import OpenAI from "openai";

export function getOpenAIClient() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

export function hasOpenAI() {
  return Boolean(process.env.OPENAI_API_KEY);
}
