"use client";

import { memo, useEffect, useRef } from "react";

import type { BackgroundNode } from "@/lib/simulation/types";

type Props = {
  nodes: BackgroundNode[];
};

function LivingIntelligenceCanvasInner({ nodes }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--arc-accent")
        .trim() || "#22c55e";

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        const x = n.x * w;
        const y = n.y * h;
        ctx.beginPath();
        ctx.arc(x, y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = n.opacity * 0.35;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < nodes.length; i += 4) {
        const a = nodes[i];
        const b = nodes[(i + 7) % nodes.length];
        if (!a || !b) continue;
        ctx.beginPath();
        ctx.moveTo(a.x * w, a.y * h);
        ctx.lineTo(b.x * w, b.y * h);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.04 + a.opacity * 0.06;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [nodes]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export const LivingIntelligenceCanvas = memo(LivingIntelligenceCanvasInner);
