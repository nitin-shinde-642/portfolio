import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0F14",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Status chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
            padding: "6px 14px",
            background: "rgba(52, 211, 153, 0.15)",
            borderRadius: "100px",
            border: "1px solid rgba(52, 211, 153, 0.3)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#34D399",
            }}
          />
          <span style={{ color: "#34D399", fontSize: "14px", fontWeight: 500 }}>
            {profile.status}
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#E6EAF0",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {profile.name}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "28px",
            color: "#7C8CFF",
            fontWeight: 500,
            marginBottom: "24px",
          }}
        >
          {profile.title}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "48px", marginTop: "16px" }}>
          {[
            { value: profile.yearsOfExperience, label: "Years Experience" },
            { value: profile.projectsDelivered, label: "Client Projects" },
            { value: profile.applicationsMaintained, label: "Apps Maintained" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span
                style={{ fontSize: "36px", fontWeight: 700, color: "#7C8CFF" }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: "14px", color: "#9AA4B2" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(to right, #7C8CFF, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
