"use client";

import Link from "next/link";
import { memo } from "react";

import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

function renderInline(text: string, key: string) {
  const parts: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(text.slice(last, m.index));
    }
    if (m[1]) {
      parts.push(
        <strong key={`${key}-b-${i}`} className="font-semibold text-[var(--arc-fg)]">
          {m[1]}
        </strong>
      );
    } else if (m[2] && m[3]) {
      const href = m[3];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        parts.push(
          <Link
            key={`${key}-l-${i}`}
            href={href}
            className="arc-teaching-link underline decoration-[var(--arc-accent)] underline-offset-2"
          >
            {m[2]}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={`${key}-a-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="arc-teaching-link underline decoration-[var(--arc-accent)] underline-offset-2"
          >
            {m[2]}
          </a>
        );
      }
    }
    last = m.index + m[0].length;
    i += 1;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

function TeachingMarkdownInner({ text, className }: Props) {
  const blocks = text.split(/\n\n+/).filter(Boolean);

  return (
    <div className={cn("arc-teaching-markdown space-y-3", className)}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const first = lines[0] ?? "";

        if (first.startsWith("### ")) {
          return (
            <h4
              key={bi}
              className="arc-teaching-h4 font-[family-name:var(--font-fraunces)] text-sm font-semibold text-[var(--arc-fg)]"
            >
              {first.slice(4)}
            </h4>
          );
        }

        if (first.startsWith("## ")) {
          return (
            <h3
              key={bi}
              className="arc-teaching-h3 mt-1 border-t border-[var(--arc-border)] pt-3 font-[family-name:var(--font-fraunces)] text-base font-semibold text-[var(--arc-fg)] first:mt-0 first:border-0 first:pt-0"
            >
              {first.slice(3)}
            </h3>
          );
        }

        if (lines.every((l) => l.startsWith("- ") || l.startsWith("* "))) {
          return (
            <ul key={bi} className="arc-teaching-list list-disc space-y-1.5 pl-5 text-sm">
              {lines.map((l, li) => (
                <li key={li} className="leading-relaxed">
                  {renderInline(l.replace(/^[-*]\s+/, ""), `${bi}-${li}`)}
                </li>
              ))}
            </ul>
          );
        }

        if (first.startsWith("_") && first.endsWith("_")) {
          return (
            <p key={bi} className="text-xs italic text-[var(--arc-muted)]">
              {first.slice(1, -1)}
            </p>
          );
        }

        return (
          <p key={bi} className="text-sm leading-relaxed text-[var(--arc-fg)]">
            {renderInline(lines.join(" "), `${bi}-p`)}
          </p>
        );
      })}
    </div>
  );
}

export const TeachingMarkdown = memo(TeachingMarkdownInner);
