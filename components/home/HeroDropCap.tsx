"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";

/** Decorative drop-cap T with amber drips — "he AI Learning System" beside the crossbar */
export function HeroDropCap() {
  return (
    <motion.div
      className="hero-dropcap"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.1 }}
    >
      <svg
        className="hero-dropcap__svg"
        viewBox="0 0 200 260"
        aria-hidden
      >
        <g fill="var(--arc-accent)">
          {/* T crossbar */}
          <rect x="6" y="8" width="188" height="44" rx="3" />
          {/* T stem */}
          <rect x="68" y="52" width="64" height="148" rx="2" />
          {/* Stem drip — main */}
          <path d="M92 198 C86 218 88 238 100 252 C112 242 118 222 108 198 Z" />
          <ellipse cx="100" cy="256" rx="16" ry="8" />
          {/* Stem drip — curl right */}
          <path d="M122 202 C134 216 138 234 128 248 C120 236 118 218 122 202 Z" />
          <ellipse cx="130" cy="252" rx="9" ry="5" />
          {/* Crossbar drip — right end */}
          <path d="M172 52 C184 58 192 74 186 92 C180 80 176 64 172 52 Z" />
          <ellipse cx="188" cy="96" rx="8" ry="5" />
          {/* Crossbar drip — small */}
          <path d="M152 48 C162 52 168 64 164 76 C158 68 154 56 152 48 Z" />
          <ellipse cx="166" cy="80" rx="5" ry="4" />
        </g>
      </svg>

      <div className="hero-dropcap__copy">
        <p className="hero-dropcap__line1">
          <span className="sr-only">T</span>he AI Learning System
        </p>
        <p className="hero-dropcap__line2">Built For Deep Study</p>
      </div>
    </motion.div>
  );
}
