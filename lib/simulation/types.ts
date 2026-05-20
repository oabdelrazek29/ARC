export type SimNodeState = "stable" | "unstable" | "strengthening" | "decaying";

export type SimEventKind =
  | "breakthrough"
  | "confusion"
  | "restructure"
  | "mastery"
  | "intervention";

export interface SimNode {
  id: string;
  label: string;
  x: number;
  y: number;
  state: SimNodeState;
  confidence: number;
}

export interface SimEdge {
  id: string;
  from: string;
  to: string;
}

export interface SimUserWorld {
  id: string;
  label: string;
  topic: string;
  nodes: SimNode[];
  edges: SimEdge[];
  progress: number;
  unstableCount: number;
}

export interface SimStreamEvent {
  id: string;
  at: string;
  kind: SimEventKind;
  message: string;
  userId?: string;
}

export interface BackgroundNode {
  id: string;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  pulse: number;
}

export interface SimulationSnapshot {
  tick: number;
  worlds: SimUserWorld[];
  stream: SimStreamEvent[];
  background: BackgroundNode[];
}
