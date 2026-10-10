import React from "react";
import { CLASS_INFO } from "../lib/classes";
import type { Classification } from "../types";
import { fontFamily } from "../fonts";

// Icons: Material Design Icons (Apache 2.0).
const ICON_PATHS: Partial<Record<Classification, string>> = {
  best: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  excellent:
    "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z",
  good: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  book: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z",
  miss: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
};

const CROWN = "M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z";

const Circle: React.FC<{ size: number; color: string; children: React.ReactNode }> = ({ size, color, children }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 ${size * 0.06}px ${size * 0.12}px rgba(0,0,0,0.45)`,
      border: `${Math.max(2, size * 0.05)}px solid rgba(255,255,255,0.9)`,
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);

export const Glyph: React.FC<{ classification: Classification; size: number }> = ({ classification, size }) => {
  const info = CLASS_INFO[classification];
  const path = ICON_PATHS[classification];
  if (path) {
    return (
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62}>
        <path d={path} fill="#fff" />
      </svg>
    );
  }
  return (
    <span
      style={{
        fontFamily,
        fontWeight: 900,
        color: "#fff",
        fontSize: size * (info.glyph.length > 1 ? 0.54 : 0.64),
        letterSpacing: info.glyph.length > 1 ? -size * 0.015 : 0,
        lineHeight: 1,
        marginTop: size * 0.02,
      }}
    >
      {info.glyph}
    </span>
  );
};

export const MoveBadge: React.FC<{ classification: Classification; size: number }> = ({ classification, size }) => (
  <Circle size={size} color={CLASS_INFO[classification].color}>
    <Glyph classification={classification} size={size} />
  </Circle>
);

export const ResultBadge: React.FC<{ kind: "mated" | "winner"; size: number }> = ({ kind, size }) =>
  kind === "mated" ? (
    <Circle size={size} color="#c33a3a">
      <span style={{ fontFamily, fontWeight: 900, color: "#fff", fontSize: size * 0.6, lineHeight: 1 }}>#</span>
    </Circle>
  ) : (
    <Circle size={size} color="#81b64c">
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62}>
        <path d={CROWN} fill="#fff" />
      </svg>
    </Circle>
  );
