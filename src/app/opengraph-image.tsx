import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBFAF8",
          color: "#16161D",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#6A6875",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "linear-gradient(135deg,#6366F1,#8B5CF6,#EC4899)",
            }}
          />
          {site.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 300, maxWidth: 980 }}>
            {site.headline}
          </div>
          <div style={{ fontSize: 30, color: "#4B4A55" }}>{site.role}</div>
        </div>

        <div style={{ display: "flex", gap: 48, fontSize: 24, color: "#4B4A55" }}>
          {site.proofStrip.slice(0, 3).map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 40, color: "#16161D" }}>{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
