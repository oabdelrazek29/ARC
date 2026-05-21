/** Read and normalize OpenAI env vars (supports quoted values from .env files). */

function cleanEnvValue(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let v = raw.trim().replace(/^\uFEFF/, "");
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v || undefined;
}

const PLACEHOLDER_KEYS = new Set([
  "",
  "your_key_here",
  "sk-your-key-here",
  "sk-...",
  "changeme",
]);

export function getOpenAIApiKey(): string | undefined {
  const key = cleanEnvValue(
    process.env.OPENAI_API_KEY ?? process.env.OPENAI_KEY
  );
  if (!key || PLACEHOLDER_KEYS.has(key.toLowerCase())) return undefined;
  if (!key.startsWith("sk-")) return undefined;
  return key;
}

export function getOpenAIModel(): string {
  return cleanEnvValue(process.env.OPENAI_MODEL) ?? "gpt-4o-mini";
}

export function isOpenAIConfigured(): boolean {
  return Boolean(getOpenAIApiKey());
}

export function formatOpenAIError(err: unknown): string {
  const status =
    err && typeof err === "object" && "status" in err
      ? Number((err as { status: number }).status)
      : 0;
  const message =
    err && typeof err === "object" && "message" in err
      ? String((err as { message: string }).message)
      : "";

  if (status === 401) {
    return "OpenAI rejected the API key. Check OPENAI_API_KEY in .env.local (local) or Vercel Environment Variables (production), then restart the server.";
  }
  if (status === 429) {
    return "OpenAI rate or quota limit hit. Add billing or credits at platform.openai.com, then try again.";
  }
  if (message.includes("ENOTFOUND") || message.includes("fetch failed")) {
    return "Could not reach OpenAI. Check your network connection and try again.";
  }
  if (message) return message.slice(0, 240);
  return "OpenAI request failed. Check server logs and try again.";
}
