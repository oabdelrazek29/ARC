import { ImageResponse } from "next/og";

export const alt = "ARC — Cognitive Learning OS";
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
          color: "#f0ede6",
        }}
      >
        <svg
          width="112"
          height="112"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 30 C11 12 17 8 20 8 C23 8 29 12 33 30"
            stroke="#c9b99a"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <circle cx="7" cy="30" r="3.25" fill="#c9b99a" />
          <circle cx="20" cy="8" r="4" fill="#a89878" />
          <circle cx="33" cy="30" r="3.25" fill="#c9b99a" />
          <circle cx="13" cy="20" r="2" fill="#c9b99a" opacity="0.55" />
          <circle cx="27" cy="20" r="2" fill="#c9b99a" opacity="0.55" />
        </svg>
        <div
          style={{
            marginTop: 32,
            fontSize: 56,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          ARC
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 20,
            color: "#888880",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Cognitive Learning OS
        </div>
      </div>
    ),
    { ...size }
  );
}
