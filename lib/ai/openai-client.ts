import OpenAI from "openai";

export function getOpenAIClient() {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key || key === "your_key_here") return null;
  return new OpenAI({ apiKey: key });
}

export function hasOpenAI() {
  const key = process.env.OPENAI_API_KEY?.trim();
  return Boolean(key && key !== "your_key_here");
}
