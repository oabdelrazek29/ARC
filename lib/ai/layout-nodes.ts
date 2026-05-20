import type { SkillNode } from "@/types/arc";

/** Assign grid positions for React Flow (GPU-friendly, no force simulation). */
export function layoutSkillNodes(nodes: SkillNode[]): SkillNode[] {
  const byDepth = new Map<number, SkillNode[]>();

  const depthOf = (id: string, seen = new Set<string>()): number => {
    if (seen.has(id)) return 0;
    seen.add(id);
    const node = nodes.find((n) => n.id === id);
    if (!node || node.dependencies.length === 0) return 0;
    return 1 + Math.max(...node.dependencies.map((d) => depthOf(d, seen)));
  };

  for (const n of nodes) {
    const d = depthOf(n.id);
    if (!byDepth.has(d)) byDepth.set(d, []);
    byDepth.get(d)!.push(n);
  }

  const colWidth = 220;
  const rowHeight = 140;

  return nodes.map((n) => {
    const depth = depthOf(n.id);
    const row = byDepth.get(depth) ?? [];
    const indexInRow = row.findIndex((x) => x.id === n.id);
    return {
      ...n,
      position: {
        x: depth * colWidth,
        y: indexInRow * rowHeight - ((row.length - 1) * rowHeight) / 2,
      },
    };
  });
}
