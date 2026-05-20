import { ImageResponse } from "next/og";

export const alt = "ARC — Cognitive Learning System";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 28 Q20 8 32 28"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="8" cy="28" r="3.5" fill="#22c55e" />
          <circle cx="20" cy="12" r="4" fill="#4ade80" />
          <circle cx="32" cy="28" r="3.5" fill="#22c55e" />
          <circle cx="14" cy="22" r="2" fill="#86efac" />
          <circle cx="26" cy="22" r="2" fill="#86efac" />
        </svg>
        <div
          style={{
            marginTop: 32,
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          ARC
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 24,
            color: "#a3a3a3",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Cognitive Learning System
        </div>
      </div>
    ),
    { ...size }
  );
}
