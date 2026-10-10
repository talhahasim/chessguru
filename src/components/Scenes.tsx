import React from "react";
import { AbsoluteFill, Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, BAND_LABEL } from "../theme";
import type { Lesson } from "../types";
import { fontFamily } from "../fonts";
import { RichText } from "./Caption";

export const BandPill: React.FC<{ band: string; scale?: number }> = ({ band, scale = 1 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10 * scale,
      background: theme.green,
      boxShadow: `0 ${6 * scale}px 0 ${theme.greenShadow}`,
      borderRadius: 12 * scale,
      padding: `${8 * scale}px ${20 * scale}px`,
      fontFamily,
      fontWeight: 900,
      color: "#fff",
      fontSize: 34 * scale,
      letterSpacing: 1,
      whiteSpace: "nowrap",
    }}
  >
    <Img src={staticFile("pieces/wK.svg")} style={{ width: 40 * scale, height: 40 * scale }} />
    {BAND_LABEL[band]} ELO
  </div>
);

export const Header: React.FC<{ lesson: Lesson; width: number; appearAt: number }> = ({ lesson, width, appearAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appearAt, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        width,
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: s,
        transform: `translateY(${(1 - s) * -40}px)`,
      }}
    >
      <BandPill band={lesson.band} />
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          color: theme.text,
          fontSize: lesson.title.length > 20 ? 46 : 54,
          lineHeight: 1.05,
          flex: 1,
        }}
      >
        {lesson.title}
      </div>
    </div>
  );
};

/** First seconds: big hook text over the final (winning) position. */
export const HookOverlay: React.FC<{ lesson: Lesson; duration: number; topY: number; bottomY: number; width: number }> = ({
  lesson,
  duration,
  topY,
  bottomY,
  width,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s1 = spring({ frame, fps, config: { damping: 10, stiffness: 160, mass: 0.7 } });
  const s2 = spring({ frame: frame - 26, fps, config: { damping: 11, stiffness: 160, mass: 0.7 } });
  const out = interpolate(frame, [duration - 8, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flash = interpolate(frame, [0, 6], [0.7, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.82) 100%)" }} />
      <div
        style={{
          position: "absolute",
          top: topY,
          left: (1080 - width) / 2,
          width,
          transform: `scale(${interpolate(s1, [0, 1], [1.8, 1])})`,
          opacity: s1,
          textShadow: "0 6px 0 rgba(0,0,0,0.55)",
        }}
      >
        <RichText text={lesson.hook[0]} start={0} perWord={0} fontSize={84} color="#ffffff" emColor="#ffe14d" align="center" stroke />
      </div>
      <div
        style={{
          position: "absolute",
          top: bottomY,
          left: (1080 - width) / 2,
          width,
          opacity: s2,
          transform: `translateY(${(1 - s2) * 60}px)`,
          textShadow: "0 6px 0 rgba(0,0,0,0.55)",
        }}
      >
        <RichText text={lesson.hook[1]} start={26} perWord={0} fontSize={80} color="#ffffff" emColor="#ffe14d" align="center" stroke />
      </div>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};

/** Title card shown while the board resets to the start position. */
export const IntroCard: React.FC<{ lesson: Lesson; start: number; duration: number; width: number }> = ({ lesson, start, duration, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 12 } });
  const out = interpolate(frame, [start + duration - 8, start + duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ width, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, opacity: out, transform: `scale(${0.7 + 0.3 * s})` }}>
      <div style={{ fontFamily, fontWeight: 800, color: theme.textMuted, fontSize: 40, letterSpacing: 6 }}>THE TRAP</div>
      <div style={{ fontFamily, fontWeight: 900, color: "#fff", fontSize: 88, textAlign: "center", lineHeight: 1.05 }}>{lesson.title}</div>
      <div style={{ fontFamily, fontWeight: 700, color: theme.green, fontSize: 42 }}>Let's set it up, step by step</div>
    </div>
  );
};

const CONFETTI_COLORS = ["#81b64c", "#ffe14d", "#ffffff", "#1baca6", "#f7c631", "#fa412d"];

export const Confetti: React.FC<{ start: number; width: number; height: number; count?: number }> = ({ start, width, height, count = 90 }) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  if (t < 0) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }, (_, i) => {
        const x0 = random(`x${i}`) * width;
        const vx = (random(`vx${i}`) - 0.5) * 14;
        const vy = -18 - random(`vy${i}`) * 22;
        const g = 1.1;
        const x = x0 + vx * t;
        const y = height * 0.55 + vy * t + 0.5 * g * t * t;
        const rot = random(`r${i}`) * 360 + t * (random(`rs${i}`) * 20 - 10);
        const w = 14 + random(`w${i}`) * 14;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: w * 0.45,
              background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
              transform: `rotate(${rot}deg)`,
              opacity: interpolate(t, [50, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const FinaleBanner: React.FC<{ banner: string; sub: string; start: number }> = ({ banner, sub, start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 9, stiffness: 140 } });
  return (
    <div
      style={{
        background: "rgba(38, 36, 33, 0.94)",
        borderRadius: 24,
        padding: "34px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        transform: `scale(${s}) rotate(${(1 - s) * -8}deg)`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        border: `4px solid ${theme.green}`,
      }}
    >
      <div style={{ fontFamily, fontWeight: 900, fontSize: 104, color: "#fff", letterSpacing: 2, lineHeight: 1 }}>{banner}</div>
      <div style={{ fontFamily, fontWeight: 700, fontSize: 44, color: theme.green }}>{sub}</div>
    </div>
  );
};

export const Outro: React.FC<{ lesson: Lesson; start: number; width: number }> = ({ lesson, start, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 15 } });
  const ctaAt = start + 18 + lesson.takeaways.length * 22;
  const cta = spring({ frame: frame - ctaAt, fps, config: { damping: 10 } });
  const pulse = 1 + 0.04 * Math.sin(((frame - ctaAt) / fps) * Math.PI * 3);
  return (
    <div
      style={{
        width,
        background: "rgba(33, 32, 29, 0.97)",
        borderRadius: 26,
        padding: "36px 40px 40px",
        boxShadow: "0 -10px 50px rgba(0,0,0,0.5)",
        transform: `translateY(${(1 - s) * 500}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div style={{ fontFamily, fontWeight: 900, fontSize: 52, color: theme.green, letterSpacing: 4 }}>REMEMBER</div>
      {lesson.takeaways.map((t, i) => {
        const at = start + 14 + i * 22;
        const si = spring({ frame: frame - at, fps, config: { damping: 13 } });
        return (
          <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", opacity: si, transform: `translateX(${(1 - si) * -40}px)` }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: theme.green,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <svg viewBox="0 0 24 24" width={34} height={34}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#fff" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <RichText text={t} start={at} perWord={0} fontSize={46} color="#fff" emColor="#ffe14d" />
            </div>
          </div>
        );
      })}
      <div
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          opacity: cta,
          transform: `scale(${0.8 + 0.2 * cta})`,
        }}
      >
        <div style={{ fontFamily, fontWeight: 800, fontSize: 38, color: theme.textMuted, flex: 1 }}>
          More traps for {BAND_LABEL[lesson.band]} Elo
        </div>
        <div
          style={{
            background: theme.green,
            boxShadow: `0 8px 0 ${theme.greenShadow}`,
            borderRadius: 16,
            padding: "18px 40px",
            fontFamily,
            fontWeight: 900,
            fontSize: 44,
            color: "#fff",
            transform: `scale(${pulse})`,
          }}
        >
          FOLLOW
        </div>
      </div>
    </div>
  );
};
