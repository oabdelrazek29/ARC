import { generateStreamMessage, nextEventKind } from "@/lib/simulation/stream-events";
import { createBackgroundNodes, createInitialWorlds } from "@/lib/simulation/worlds";
import { seeded } from "@/lib/simulation/seed";
import type {
  BackgroundNode,
  SimNodeState,
  SimStreamEvent,
  SimulationSnapshot,
  SimUserWorld,
} from "@/lib/simulation/types";

const MAX_STREAM = 24;
const STATES: SimNodeState[] = [
  "stable",
  "unstable",
  "strengthening",
  "decaying",
];

function tickWorld(world: SimUserWorld, tick: number, worldIndex: number): SimUserWorld {
  const nodeIndex = Math.floor(seeded(tick, worldIndex + 10) * world.nodes.length);
  const nodes = world.nodes.map((n, i) => {
    if (i !== nodeIndex) return n;
    const state = STATES[Math.floor(seeded(tick, i + 20) * STATES.length)]!;
    const confidence = Math.max(
      0.1,
      Math.min(1, n.confidence + (seeded(tick, i) - 0.5) * 0.15)
    );
    return { ...n, state, confidence };
  });
  const unstableCount = nodes.filter((n) => n.state === "unstable").length;
  const progress = Math.max(
    0.1,
    Math.min(0.98, world.progress + (seeded(tick, 99) - 0.48) * 0.04)
  );
  return { ...world, nodes, unstableCount, progress };
}

function tickBackground(bg: BackgroundNode[], tick: number): BackgroundNode[] {
  return bg.map((n, i) => ({
    ...n,
    opacity: 0.12 + Math.abs(Math.sin(tick * 0.15 + n.pulse * 6)) * 0.4,
    x: n.x + Math.sin(tick * 0.02 + i) * 0.0008,
    y: n.y + Math.cos(tick * 0.02 + i) * 0.0008,
  }));
}

function pushStream(
  stream: SimStreamEvent[],
  world: SimUserWorld,
  tick: number,
  worldIndex: number
): SimStreamEvent[] {
  const kind = nextEventKind(tick, worldIndex);
  const node =
    world.nodes[Math.floor(seeded(tick, worldIndex + 3) * world.nodes.length)]!;
  const entry: SimStreamEvent = {
    id: `ev-${tick}-${world.id}`,
    at: new Date().toISOString(),
    kind,
    message: generateStreamMessage(kind, world, node.label, tick),
    userId: world.id,
  };
  return [entry, ...stream].slice(0, MAX_STREAM);
}

export function createInitialSnapshot(): SimulationSnapshot {
  const worlds = createInitialWorlds();
  const stream: SimStreamEvent[] = worlds.map((w, i) => ({
    id: `init-${w.id}`,
    at: new Date().toISOString(),
    kind: "breakthrough" as const,
    message: `${w.label} — cognitive map online (${w.topic})`,
    userId: w.id,
  }));
  return {
    tick: 0,
    worlds,
    stream,
    background: createBackgroundNodes(),
  };
}

export function advanceSimulation(prev: SimulationSnapshot): SimulationSnapshot {
  const tick = prev.tick + 1;
  const worlds = prev.worlds.map((w, i) => tickWorld(w, tick, i));
  const background = tickBackground(prev.background, tick);
  let stream = prev.stream;
  const activeWorld = Math.floor(seeded(tick, 7) * worlds.length);
  stream = pushStream(stream, worlds[activeWorld]!, tick, activeWorld);
  if (tick % 3 === 0) {
    const second = (activeWorld + 1) % worlds.length;
    stream = pushStream(stream, worlds[second]!, tick, second);
  }
  return { tick, worlds, stream, background };
}
