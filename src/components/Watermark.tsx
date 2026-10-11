import React from "react";
import { Img, staticFile } from "remotion";
import { HANDLE } from "../brand";
import { fontFamily } from "../fonts";

/**
 * Subtle "@handle" watermark under the caption area: small and semi-transparent so it never
 * competes with the board or the captions, but still inside Instagram's 3:4 grid crop (y < 1680).
 */
export const Watermark: React.FC<{ y: number }> = ({ y }) => (
  <div
    style={{
      position: "absolute",
      top: y,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      opacity: 0.42,
      pointerEvents: "none",
    }}
  >
    <Img src={staticFile("pieces/wN.svg")} style={{ width: 34, height: 34 }} />
    <span style={{ fontFamily, fontWeight: 700, fontSize: 30, color: "#ffffff", letterSpacing: 0.5 }}>@{HANDLE}</span>
  </div>
);
