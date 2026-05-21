"use client";

import { useEffect, useState } from "react";

import type { IntegrationStatus } from "@/lib/integrations/env-status";
import { INTEGRATION_LABELS } from "@/lib/integrations/env-status";

type ApiStatus = {
  configured?: boolean;
  integrations?: IntegrationStatus;
};

const OPTIONAL: (keyof IntegrationStatus)[] = [
  "stripe",
  "mux",
  "uploadthing",
];

export function IntegrationStatusPanel() {
  const [status, setStatus] = useState<IntegrationStatus | null>(null);

  useEffect(() => {
    fetch("/api/ai/status")
      .then((r) => r.json())
      .then((d: ApiStatus) => setStatus(d.integrations ?? null))
      .catch(() => setStatus(null));
  }, []);

  if (!status) return null;

  const entries = Object.entries(status) as [keyof IntegrationStatus, boolean][];

  return (
    <div className="arc-card mt-6 p-4">
      <p className="arc-mono text-[10px] uppercase tracking-wider text-[var(--arc-muted)]">
        API integrations
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {entries.map(([key, ok]) => (
          <li
            key={key}
            className="flex items-center justify-between text-xs border border-[var(--arc-border)] px-3 py-2"
          >
            <span>
              {INTEGRATION_LABELS[key]}
              {OPTIONAL.includes(key) && (
                <span className="arc-mono ml-1 text-[var(--arc-tertiary)]">
                  optional
                </span>
              )}
            </span>
            <span className={ok ? "text-[var(--arc-accent)]" : "text-[var(--arc-muted)]"}>
              {ok ? "Connected" : "Not set"}
            </span>
          </li>
        ))}
      </ul>
      <p className="arc-mono mt-3 text-[10px] text-[var(--arc-tertiary)]">
        Clerk needs <strong>both</strong> pk_ and sk_ keys. Local: .env.local then restart dev.
        Production: same names in Vercel → Environment Variables → <strong>Redeploy</strong>.
      </p>
    </div>
  );
}
