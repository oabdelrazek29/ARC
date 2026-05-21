"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type TypewriterLabelProps = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
};

export function TypewriterLabel({
  text,
  className = "",
  delay = 200,
  speed = 28,
}: TypewriterLabelProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="typewriter-cursor" aria-hidden>
          ▮
        </span>
      )}
    </span>
  );
}
