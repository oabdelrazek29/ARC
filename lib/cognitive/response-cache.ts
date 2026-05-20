const cache = new Map<string, { value: unknown; expires: number }>();

export function cacheKey(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join("|");
}

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.value as T;
}

export function setCached<T>(key: string, value: T, ttlMs: number): void {
  cache.set(key, { value, expires: Date.now() + ttlMs });
}

export function clearGraphCache(graphId: string): void {
  for (const key of cache.keys()) {
    if (key.includes(graphId)) cache.delete(key);
  }
}
