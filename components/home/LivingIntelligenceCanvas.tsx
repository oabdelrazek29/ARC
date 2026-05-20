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
        ctx.fillStyle = `rgba(34, 211, 238, ${n.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i += 4) {
        const a = nodes[i];
        const b = nodes[(i + 7) % nodes.length];
        if (!a || !b) continue;
        ctx.beginPath();
        ctx.moveTo(a.x * w, a.y * h);
        ctx.lineTo(b.x * w, b.y * h);
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.04 + a.opacity * 0.08})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}

export const LivingIntelligenceCanvas = memo(LivingIntelligenceCanvasInner);
