"use client";

import { useEffect, useState } from "react";

import {
  advanceSimulation,
  createInitialSnapshot,
} from "@/lib/simulation/engine";
import type { SimulationSnapshot } from "@/lib/simulation/types";

const TICK_MS = 1600;

const EMPTY_SNAPSHOT: SimulationSnapshot = {
  tick: 0,
  worlds: [],
  stream: [],
  background: [],
};

export function useSimulation(enabled = true) {
  const [snapshot, setSnapshot] = useState<SimulationSnapshot | null>(null);

  useEffect(() => {
    setSnapshot(createInitialSnapshot());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      setSnapshot((prev) => (prev ? advanceSimulation(prev) : prev));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [enabled]);

  return snapshot ?? EMPTY_SNAPSHOT;
}
