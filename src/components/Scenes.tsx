import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, BAND_LABEL } from "../theme";
import type { Lesson } from "../types";
import { LESSONS } from "../lessons";
import { GUIDE_CTA, GUIDE_NAME } from "../brand";
import { fontFamily } from "../fonts";
import { RichText } from "./Caption";
import { CLASS_INFO } from "../lib/classes";

// Material Design "send" icon (Apache 2.0).
const SEND_ICON = "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z";
// Material Design "comment" icon (Apache 2.0).
const COMMENT_ICON = "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z";

// Material Design "shield" icon (Apache 2.0).
const SHIELD = "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z";

/** Elo badge. Trap videos: green with a king. Defense videos: blue with a shield. */
export const BandPill: React.FC<{ band: string; scale?: number; defense?: boolean }> = ({ band, scale = 1, defense }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10 * scale,
      background: defense ? theme.blue : theme.green,
      boxShadow: `0 ${6 * scale}px 0 ${defense ? theme.blueShadow : theme.greenShadow}`,
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
    {defense ? (
      <svg viewBox="0 0 24 24" width={36 * scale} height={36 * scale}>
        <path d={SHIELD} fill="#fff" />
      </svg>
    ) : (
      <Img src={staticFile("pieces/wK.svg")} style={{ width: 40 * scale, height: 40 * scale }} />
    )}
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
      <BandPill band={lesson.band} defense={lesson.kind === "defense"} />
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

/**
 * First seconds: big hook text over the final (winning) position.
 * Frame 0 is fully composed so it works as the Reels/TikTok cover, and all text
 * stays inside the centre 3:4 area that Instagram shows in the profile grid.
 */
export const HookOverlay: React.FC<{ lesson: Lesson; duration: number; width: number }> = ({ lesson, duration, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Text is already on screen at frame 0 and "punches" in place, so the first frame is a clean thumbnail.
  const punch = spring({ frame, fps, config: { damping: 9, stiffness: 170, mass: 0.6 } });
  const punch2 = spring({ frame: frame - 18, fps, config: { damping: 9, stiffness: 170, mass: 0.6 } });
  const out = interpolate(frame, [duration - 10, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const left = (1080 - width) / 2;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.12) 62%, rgba(0,0,0,0.6) 72%, rgba(0,0,0,0.9) 100%)" }}
      />
      <div style={{ position: "absolute", top: HOOK_LAYOUT.pillY, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BandPill band={lesson.band} scale={1.1} defense={lesson.kind === "defense"} />
      </div>
      <div
        style={{
          position: "absolute",
          top: HOOK_LAYOUT.line1Y,
          left,
          width,
          transform: `scale(${1.12 - 0.12 * punch})`,
          textShadow: "0 6px 0 rgba(0,0,0,0.55)",
        }}
      >
        <RichText text={lesson.hook[0]} start={0} fontSize={84} color="#ffffff" emColor="#ffe14d" align="center" stroke instant />
      </div>
      <div
        style={{
          position: "absolute",
          top: HOOK_LAYOUT.line2Y,
          left,
          width,
          transform: `scale(${frame < 18 ? 1 : 1.08 - 0.08 * punch2})`,
          textShadow: "0 6px 0 rgba(0,0,0,0.55)",
        }}
      >
        <RichText text={lesson.hook[1]} start={0} fontSize={80} color="#ffffff" emColor="#ffe14d" align="center" stroke instant />
      </div>
    </AbsoluteFill>
  );
};

/** Hook layout (1080x1920). Instagram's grid shows y 240..1680, so everything lives in there. */
export const HOOK_LAYOUT = {
  pillY: 262,
  line1Y: 345,
  line2Y: 1278,
  /** Board block is scaled down and moved so it sits between the two text lines. */
  boardScale: 0.65,
  boardCenterY: 912,
};

/** Title card shown while the board resets to the start position. */
export const IntroCard: React.FC<{ lesson: Lesson; start: number; duration: number; width: number }> = ({ lesson, start, duration, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 12 } });
  const out = interpolate(frame, [start + duration - 8, start + duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ width, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, opacity: out, transform: `scale(${0.7 + 0.3 * s})` }}>
      <div style={{ fontFamily, fontWeight: 800, color: theme.textMuted, fontSize: 40, letterSpacing: 6 }}>
        {lesson.kind === "defense" ? "THE DEFENSE" : "THE TRAP"}
      </div>
      <div style={{ fontFamily, fontWeight: 900, color: "#fff", fontSize: 88, textAlign: "center", lineHeight: 1.05 }}>{lesson.title}</div>
      <div style={{ fontFamily, fontWeight: 700, color: theme.green, fontSize: 42 }}>Let's set it up, step by step</div>
    </div>
  );
};

export const Outro: React.FC<{
  lesson: Lesson;
  start: number;
  cues: { remember: number; takeaways: number[]; cta: number };
  width: number;
}> = ({ lesson, start, cues, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 15 } });
  const ctaAt = cues.cta;
  const cta = spring({ frame: frame - ctaAt, fps, config: { damping: 10 } });
  const pulse = 1 + 0.04 * Math.sin(((frame - ctaAt) / fps) * Math.PI * 3);
  if (lesson.kind === "quiz") return <QuizOutro start={start} ctaAt={ctaAt} width={width} />;
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
        const at = cues.takeaways[i];
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
      {/* "Send to a friend" ask: DM shares are one of Instagram's strongest reach signals. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: cta,
          transform: `translateY(${(1 - cta) * 20}px)`,
          fontFamily,
          fontWeight: 800,
          fontSize: 40,
          color: "#ffe14d",
        }}
      >
        <svg viewBox="0 0 24 24" width={46} height={46} style={{ flexShrink: 0 }}>
          <path d={GUIDE_CTA ? COMMENT_ICON : SEND_ICON} fill="#ffe14d" />
        </svg>
        {GUIDE_CTA ? (
          <span>
            Comment <span style={{ background: "#ffe14d", color: "#1d1d1b", borderRadius: 10, padding: "2px 12px" }}>TRAPS</span>{" "}
            → free PDF: {GUIDE_NAME}
          </span>
        ) : lesson.kind === "defense" ? (
          "Send this to a friend before they fall for it"
        ) : (
          "Send this to a friend who falls for it"
        )}
      </div>
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
          {lesson.kind === "defense"
            ? "New trap tomorrow"
            : LESSONS.some((l) => l.defends === lesson.id)
              ? "How to defend it? Next video!"
              : `More traps for ${BAND_LABEL[lesson.band]} Elo`}
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

/**
 * Mid-video "send" sticker shown right after a trap's key moment. Viewers leave at ~10-15 s on average,
 * so most never reach the outro's send ask; this puts the same ask where they still are (screen only, no voice).
 */
export const SendNudge: React.FC<{ start: number; duration: number; y: number }> = ({ start, duration, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;
  if (local < 0 || local >= duration) return null;
  const pop = spring({ frame: local, fps, config: { damping: 10, stiffness: 170, mass: 0.6 } });
  const out = interpolate(local, [duration - 10, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: out,
        transform: `scale(${0.6 + 0.4 * pop})`,
        zIndex: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 28px",
          borderRadius: 999,
          background: "#ffe14d",
          boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
          fontFamily,
          fontWeight: 800,
          fontSize: 36,
          color: "#1d1d1b",
        }}
      >
        <svg viewBox="0 0 24 24" width={38} height={38}>
          <path d={SEND_ICON} fill="#1d1d1b" />
        </svg>
        Send this to a friend who falls for it
      </div>
    </div>
  );
};

/** Quiz outro: the question again as two big options, then "comment your answer". The answer is never shown. */
const QuizOutro: React.FC<{ start: number; ctaAt: number; width: number }> = ({ start, ctaAt, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 15 } });
  const cta = spring({ frame: frame - ctaAt, fps, config: { damping: 10 } });
  const pulse = 1 + 0.04 * Math.sin(((frame - ctaAt) / fps) * Math.PI * 3);
  const option = (label: string, glyph: string, color: string, delay: number) => {
    const o = spring({ frame: frame - start - delay, fps, config: { damping: 9, stiffness: 160 } });
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          padding: "26px 0",
          borderRadius: 20,
          background: color,
          boxShadow: "0 8px 0 rgba(0,0,0,0.35)",
          transform: `scale(${0.5 + 0.5 * o})`,
          fontFamily,
          fontWeight: 900,
          fontSize: 50,
          color: "#fff",
        }}
      >
        <span style={{ fontSize: 56 }}>{glyph}</span>
        {label}
      </div>
    );
  };
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
        gap: 28,
      }}
    >
      <div style={{ fontFamily, fontWeight: 900, fontSize: 52, color: "#fff", letterSpacing: 2, textAlign: "center" }}>WHAT DO YOU THINK?</div>
      <div style={{ display: "flex", gap: 24 }}>
        {option("Brilliant", "!!", CLASS_INFO.brilliant.color, 4)}
        {option("Blunder", "??", CLASS_INFO.blunder.color, 10)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          opacity: cta,
          transform: `translateY(${(1 - cta) * 20}px)`,
          fontFamily,
          fontWeight: 800,
          fontSize: 42,
          color: "#ffe14d",
        }}
      >
        <svg viewBox="0 0 24 24" width={48} height={48}>
          <path d={COMMENT_ICON} fill="#ffe14d" />
        </svg>
        Comment your answer!
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          opacity: cta,
          transform: `scale(${0.8 + 0.2 * cta})`,
        }}
      >
        <div style={{ fontFamily, fontWeight: 800, fontSize: 38, color: theme.textMuted, flex: 1 }}>I reply to every answer</div>
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
