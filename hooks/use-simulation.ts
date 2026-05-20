"use client";

import { useCallback, useEffect, useState } from "react";

import {
  advanceSimulation,
  createInitialSnapshot,
} from "@/lib/simulation/engine";
import type { SimulationSnapshot } from "@/lib/simulation/types";

const TICK_MS = 1600;

export function useSimulation(enabled = true) {
  const [snapshot, setSnapshot] = useState<SimulationSnapshot>(() =>
    createInitialSnapshot()
  );
  const tick = useCallback(() => {
    setSnapshot((prev) => advanceSimulation(prev));
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, [enabled, tick]);

  return snapshot;
}
