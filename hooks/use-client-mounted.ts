"use client";

import { useEffect, useState } from "react";

/** True only after the client has mounted — use to skip SSR for client-only UI. */
export function useClientMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
