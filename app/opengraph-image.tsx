import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "ARC — Cognitive Learning OS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoPath = join(process.cwd(), "public/images/logo-nav.png");
  const logoBuffer = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

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
          color: "#faf9f6",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={96}
          height={96}
          style={{
            borderRadius: 8,
            objectFit: "contain",
          }}
        />
        <div
          style={{
            marginTop: 28,
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
            fontSize: 22,
            color: "#a8a29e",
            letterSpacing: "0.14em",
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
