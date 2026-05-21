"use client";

import { PillBadge } from "@/components/arc-ui/PillBadge";

type Props = {
  marker: string;
  title: string;
  lead?: string;
};

export function PlatformSectionHeader({ marker, title, lead }: Props) {
  return (
    <header className="arc-platform-section-header">
      <PillBadge>{marker}</PillBadge>
      <h1 className="arc-heading mt-4 text-2xl md:text-3xl">{title}</h1>
      {lead && (
        <p className="arc-lead mt-3 max-w-2xl text-sm leading-relaxed">{lead}</p>
      )}
    </header>
  );
}
