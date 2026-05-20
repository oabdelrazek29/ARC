"use client";

import { useEffect, useState } from "react";

import { useCognitiveStore } from "@/store/cognitive-store";

/**
 * Waits for persisted cognitive state to hydrate before rendering children.
 * Prevents useSyncExternalStore / getServerSnapshot loops with Zustand persist.
 */
export function CognitiveStoreHydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(() => {
    if (typeof window === "undefined") return false;
    return useCognitiveStore.persist.hasHydrated();
  });

  useEffect(() => {
    const unsub = useCognitiveStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    if (!useCognitiveStore.persist.hasHydrated()) {
      void useCognitiveStore.persist.rehydrate();
    } else {
      setHydrated(true);
    }
    return unsub;
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
        Loading cognitive memory…
      </div>
    );
  }

  return <>{children}</>;
}
