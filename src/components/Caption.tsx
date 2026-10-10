import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CLASS_INFO } from "../lib/classes";
import { richWords } from "../lib/rich";
import { theme } from "../theme";
import type { Classification } from "../types";
import { fontFamily } from "../fonts";
import { MoveBadge } from "./MoveBadge";

export const RichText: React.FC<{
  text: string;
  start: number;
  fontSize: number;
  color: string;
  emColor: string;
  perWord?: number;
  align?: "left" | "center";
  emBackground?: string;
  /** Thick outline for text drawn straight over the board. */
  stroke?: boolean;
}> = ({ text, start, fontSize, color, emColor, perWord = 2.2, align = "left", emBackground, stroke }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = richWords(text);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", columnGap: fontSize * 0.26, rowGap: fontSize * 0.08 }}>
      {words.map((w, i) => {
        const s = spring({ frame: frame - start - i * perWord, fps, config: { damping: 12, stiffness: 220, mass: 0.5 } });
        return (
          <span
            key={i}
            style={{
              fontFamily,
              fontWeight: w.em ? 900 : 700,
              fontSize,
              lineHeight: 1.18,
              color: w.em ? emColor : color,
              opacity: s,
              transform: `translateY(${(1 - s) * fontSize * 0.35}px) scale(${0.85 + 0.15 * s})`,
              display: "inline-block",
              WebkitTextStroke: stroke ? `${fontSize * 0.07}px #000` : undefined,
              paintOrder: stroke ? "stroke fill" : undefined,
              background: w.em && emBackground ? emBackground : undefined,
              borderRadius: w.em && emBackground ? 8 : undefined,
              padding: w.em && emBackground ? `0 ${fontSize * 0.12}px` : undefined,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

/** chess.com "coach" style speech bubble. */
export const Caption: React.FC<{
  width: number;
  start: number;
  say: string;
  chip?: { san: string; classification: Classification; at: number } | null;
}> = ({ width, start, say, chip }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 200 } });
  const avatar = 96;
  const chipIn = chip ? spring({ frame: frame - chip.at, fps, config: { damping: 13, stiffness: 200 } }) : 0;
  return (
    <div
      style={{
        width,
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        opacity: interpolate(enter, [0, 1], [0, 1]),
        transform: `translateY(${(1 - enter) * 30}px)`,
      }}
    >
      <div
        style={{
          width: avatar,
          height: avatar,
          borderRadius: "50%",
          background: theme.green,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 6px 0 ${theme.greenShadow}`,
        }}
      >
        <Img src={staticFile("pieces/wN.svg")} style={{ width: avatar * 0.78, height: avatar * 0.78 }} />
      </div>
      <div style={{ position: "relative", flex: 1 }}>
        {/* bubble tail */}
        <div
          style={{
            position: "absolute",
            left: -14,
            top: 30,
            width: 0,
            height: 0,
            borderTop: "14px solid transparent",
            borderBottom: "14px solid transparent",
            borderRight: `16px solid ${theme.bubble}`,
          }}
        />
        <div
          style={{
            background: theme.bubble,
            borderRadius: 18,
            padding: "22px 28px 26px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          {chip ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                opacity: chipIn,
                transform: `scale(${0.9 + 0.1 * chipIn})`,
                transformOrigin: "left center",
              }}
            >
              <MoveBadge classification={chip.classification} size={44} />
              <span style={{ fontFamily, fontWeight: 800, fontSize: 36, color: CLASS_INFO[chip.classification].color }}>
                {chip.san} <span style={{ color: theme.bubbleText, fontWeight: 700 }}>is {CLASS_INFO[chip.classification].label}</span>
              </span>
            </div>
          ) : null}
          <RichText text={say} start={start + 3} fontSize={50} color={theme.bubbleText} emColor="#3d8b2f" />
        </div>
      </div>
    </div>
  );
};
