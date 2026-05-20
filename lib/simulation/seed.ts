/** Deterministic pseudo-random from seed (no Math.random) */
export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function seeded(seed: number, index: number): number {
  const x = Math.sin((seed + index) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function pick<T>(arr: T[], seed: number, index: number): T {
  return arr[Math.floor(seeded(seed, index) * arr.length)]!;
}
