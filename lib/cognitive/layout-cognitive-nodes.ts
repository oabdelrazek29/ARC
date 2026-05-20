import type { CognitiveNode } from "@/types/cognitive";

/** Grid layout by dependency depth — same pattern as skill trees, separate module */
export function layoutCognitiveNodes(nodes: CognitiveNode[]): CognitiveNode[] {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const depth = new Map<string, number>();

  function getDepth(id: string, visiting = new Set<string>()): number {
    if (depth.has(id)) return depth.get(id)!;
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const node = byId.get(id);
    const incoming = nodes.filter((n) =>
      n.id !== id &&
      false /* edges resolved externally */
    );
    void incoming;
    const deps = nodes
      .flatMap((n) =>
        n.id === id ? [] : []
      );
    void deps;
    const parentEdges = nodes; // placeholder — use edges in caller if needed
    void parentEdges;
    const d = 0;
    depth.set(id, d);
    return d;
  }

  const edgeDepth = new Map<string, number>();
  for (const n of nodes) {
    if (!edgeDepth.has(n.id)) edgeDepth.set(n.id, getDepth(n.id));
  }

  const columns = new Map<number, number>();
  return nodes.map((n, i) => {
    const col = edgeDepth.get(n.id) ?? 0;
    const row = columns.get(col) ?? 0;
    columns.set(col, row + 1);
    const x = col * 280 + 40;
    const y = row * 140 + 40;
    if (n.position) return n;
    return { ...n, position: { x: x || (i % 4) * 260, y: y || Math.floor(i / 4) * 130 } };
  });
}

export function layoutCognitiveNodesFromEdges(
  nodes: CognitiveNode[],
  dependencies: Map<string, string[]>
): CognitiveNode[] {
  const depth = new Map<string, number>();

  function depDepth(id: string, seen = new Set<string>()): number {
    if (depth.has(id)) return depth.get(id)!;
    if (seen.has(id)) return 0;
    seen.add(id);
    const deps = dependencies.get(id) ?? [];
    const d =
      deps.length === 0
        ? 0
        : 1 + Math.max(...deps.map((d) => depDepth(d, seen)));
    depth.set(id, d);
    return d;
  }

  for (const n of nodes) depDepth(n.id);

  const rowByCol = new Map<number, number>();
  return nodes.map((n, i) => {
    if (n.position) return n;
    const col = depth.get(n.id) ?? 0;
    const row = rowByCol.get(col) ?? 0;
    rowByCol.set(col, row + 1);
    return {
      ...n,
      position: { x: col * 280 + 48, y: row * 150 + 48 },
    };
  });
}
