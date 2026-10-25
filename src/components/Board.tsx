import React from "react";
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Move } from "chess.js";
import { boardFromFen, type BoardMap } from "../lib/line";
import { MARK_COLORS, SQUARE_MARK_COLORS, parseMark, theme } from "../theme";
import type { Classification, Color } from "../types";
import { MoveBadge, ResultBadge } from "./MoveBadge";
import { fontFamily } from "../fonts";

const FILES = "abcdefgh";

export type BoardArrow = { mark: string; appearAt: number };

export type BoardProps = {
  size: number;
  orientation: Color;
  /** Position shown (before the animating move, if any). */
  fen: string;
  /** Position after the animating move (used once it lands). */
  animating?: { move: Move; fenAfter: string; progress: number } | null;
  lastMove?: { from: string; to: string; classification?: Classification | null; badgeAt?: number } | null;
  arrows?: BoardArrow[];
  squares?: { mark: string; appearAt: number }[];
  pulse?: { square: string; appearAt: number }[];
  checkSquare?: string | null;
  mate?: { loserKing: string; winnerKing: string; appearAt: number } | null;
};

/** Square -> top-left corner in "square units" (0..7). */
const sqXY = (sq: string, orientation: Color) => {
  const f = FILES.indexOf(sq[0]);
  const r = Number(sq[1]);
  return orientation === "w" ? { x: f, y: 8 - r } : { x: 7 - f, y: r - 1 };
};

const isLight = (sq: string) => (FILES.indexOf(sq[0]) + Number(sq[1])) % 2 === 1;

const ALL_SQUARES = Array.from({ length: 64 }, (_, i) => `${FILES[i % 8]}${8 - Math.floor(i / 8)}`);

const PieceImg: React.FC<{ code: string; x: number; y: number; sq: number; opacity?: number; scale?: number; z?: number }> = ({
  code,
  x,
  y,
  sq,
  opacity = 1,
  scale = 1,
  z = 1,
}) => (
  <Img
    src={staticFile(`pieces/${code}.svg`)}
    style={{
      position: "absolute",
      left: x * sq,
      top: y * sq,
      width: sq,
      height: sq,
      opacity,
      transform: `scale(${scale})`,
      zIndex: z,
      filter: scale > 1.01 ? "drop-shadow(0 6px 6px rgba(0,0,0,0.35))" : undefined,
    }}
  />
);

const pieceCode = (p: { color: string; type: string }) => `${p.color}${p.type.toUpperCase()}`;

/** Arrow polygon in square units, chess.com proportions; knight moves get an L-shape. */
const ArrowShape: React.FC<{ from: string; to: string; color: string; grow: number; orientation: Color }> = ({
  from,
  to,
  color,
  grow,
  orientation,
}) => {
  const a = sqXY(from, orientation);
  const b = sqXY(to, orientation);
  const start = { x: a.x + 0.5, y: a.y + 0.5 };
  const end = { x: b.x + 0.5, y: b.y + 0.5 };
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const knight = (Math.abs(dx) === 1 && Math.abs(dy) === 2) || (Math.abs(dx) === 2 && Math.abs(dy) === 1);
  const pts = knight
    ? Math.abs(dy) > Math.abs(dx)
      ? [start, { x: start.x, y: end.y }, end]
      : [start, { x: end.x, y: start.y }, end]
    : [start, end];

  // Total length and partial path for the "draw-in" animation.
  const segs = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
  const total = segs.reduce((s, v) => s + v, 0);
  let remaining = total * grow;
  const drawn = [pts[0]];
  for (let i = 0; i < segs.length && remaining > 0; i++) {
    const t = Math.min(1, remaining / segs[i]);
    drawn.push({ x: pts[i].x + (pts[i + 1].x - pts[i].x) * t, y: pts[i].y + (pts[i + 1].y - pts[i].y) * t });
    remaining -= segs[i];
  }
  if (drawn.length < 2) return null;
  const tip = drawn[drawn.length - 1];
  const prev = drawn[drawn.length - 2];
  const ang = Math.atan2(tip.y - prev.y, tip.x - prev.x);
  const headLen = 0.42;
  const headW = 0.26;
  const shaftW = 0.2;
  // Shaft ends where the head begins.
  const shaftEnd = { x: tip.x - Math.cos(ang) * headLen * 0.9, y: tip.y - Math.sin(ang) * headLen * 0.9 };
  const shaft = [...drawn.slice(0, -1), shaftEnd];
  const left = { x: tip.x - Math.cos(ang) * headLen + Math.cos(ang + Math.PI / 2) * headW, y: tip.y - Math.sin(ang) * headLen + Math.sin(ang + Math.PI / 2) * headW };
  const right = { x: tip.x - Math.cos(ang) * headLen - Math.cos(ang + Math.PI / 2) * headW, y: tip.y - Math.sin(ang) * headLen - Math.sin(ang + Math.PI / 2) * headW };

  return (
    <g opacity={0.82}>
      <polyline
        points={shaft.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={shaftW}
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <polygon points={`${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`} fill={color} />
    </g>
  );
};

export const Board: React.FC<BoardProps> = ({
  size,
  orientation,
  fen,
  animating,
  lastMove,
  arrows = [],
  squares = [],
  pulse = [],
  checkSquare,
  mate,
}) => {
  const frame = useCurrentFrame();
  const sq = size / 8;
  const landed = animating && animating.progress >= 1;
  const board: BoardMap = boardFromFen(landed ? animating.fenAfter : fen);

  // --- Pieces -------------------------------------------------------------
  const pieces: React.ReactNode[] = [];
  const moving: { code: string; from: string; to: string }[] = [];
  let capturedSq: string | null = null;
  if (animating && !landed) {
    const m = animating.move;
    moving.push({ code: `${m.color}${m.piece.toUpperCase()}`, from: m.from, to: m.to });
    if (m.flags.includes("k") || m.flags.includes("q")) {
      const rank = m.color === "w" ? "1" : "8";
      const kingSide = m.flags.includes("k");
      moving.push({ code: `${m.color}R`, from: `${kingSide ? "h" : "a"}${rank}`, to: `${kingSide ? "f" : "d"}${rank}` });
    }
    if (m.captured) capturedSq = m.flags.includes("e") ? `${m.to[0]}${m.from[1]}` : m.to;
  }
  const movingFrom = new Set(moving.map((m) => m.from));
  const eased = animating ? Easing.bezier(0.3, 0.0, 0.2, 1)(Math.min(1, animating.progress)) : 1;

  for (const s of Object.keys(board)) {
    if (movingFrom.has(s)) continue;
    const { x, y } = sqXY(s, orientation);
    const isCaptured = s === capturedSq;
    pieces.push(
      <PieceImg
        key={`static-${s}`}
        code={pieceCode(board[s])}
        x={x}
        y={y}
        sq={sq}
        opacity={isCaptured ? interpolate(eased, [0.75, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1}
      />,
    );
  }
  for (const m of moving) {
    const a = sqXY(m.from, orientation);
    const b = sqXY(m.to, orientation);
    const lift = 1 + 0.1 * Math.sin(Math.PI * eased);
    pieces.push(
      <PieceImg key={`moving-${m.from}`} code={m.code} x={a.x + (b.x - a.x) * eased} y={a.y + (b.y - a.y) * eased} sq={sq} scale={lift} z={5} />,
    );
  }

  // --- Square layers -------------------------------------------------------
  const badgeShown = lastMove?.classification && lastMove.badgeAt !== undefined && frame >= lastMove.badgeAt;
  const classColor = badgeShown ? CLASS_TINT[lastMove!.classification!] : null;
  const highlightSquares = lastMove && (!animating || landed) ? [lastMove.from, lastMove.to] : [];

  const coordStyle = (light: boolean): React.CSSProperties => ({
    position: "absolute",
    fontFamily,
    fontWeight: 700,
    fontSize: sq * 0.2,
    color: light ? theme.dark : theme.light,
    lineHeight: 1,
  });

  return (
    <div style={{ position: "relative", width: size, height: size, borderRadius: 6, overflow: "hidden" }}>
      {/* Squares, highlights and coordinates */}
      {ALL_SQUARES.map((s) => {
        const { x, y } = sqXY(s, orientation);
        const light = isLight(s);
        let bg = light ? theme.light : theme.dark;
        if (highlightSquares.includes(s)) bg = light ? theme.lightHighlight : theme.darkHighlight;
        // Coordinates always sit on White's side (a-file and 1st rank), like on a real board, even when Black is at
        // the bottom: then the letters run along the top edge and the numbers down the right edge.
        const white = orientation === "w";
        const showRank = s[0] === "a";
        const showFile = s[1] === "1";
        return (
          <div key={s} style={{ position: "absolute", left: x * sq, top: y * sq, width: sq, height: sq, background: bg }}>
            {classColor && s === lastMove!.to ? <div style={{ position: "absolute", inset: 0, background: classColor }} /> : null}
            {showRank ? (
              <div style={{ ...coordStyle(light), ...(white ? { left: sq * 0.06, top: sq * 0.06 } : { right: sq * 0.07, bottom: sq * 0.05 }) }}>{s[1]}</div>
            ) : null}
            {showFile ? (
              <div style={{ ...coordStyle(light), ...(white ? { right: sq * 0.07, bottom: sq * 0.05 } : { left: sq * 0.06, top: sq * 0.06 }) }}>{s[0]}</div>
            ) : null}
          </div>
        );
      })}

      {/* Right-click style square marks */}
      {squares.map(({ mark, appearAt }) => {
        const { color, from } = parseMark(mark);
        const { x, y } = sqXY(from, orientation);
        const o = interpolate(frame - appearAt, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={`mark-${mark}`}
            style={{ position: "absolute", left: x * sq, top: y * sq, width: sq, height: sq, background: SQUARE_MARK_COLORS[color], opacity: o }}
          />
        );
      })}

      {/* Check / mate glow */}
      {[checkSquare, mate && frame >= mate.appearAt ? mate.loserKing : null].filter(Boolean).map((s) => {
        const { x, y } = sqXY(s as string, orientation);
        return (
          <div
            key={`check-${s}`}
            style={{
              position: "absolute",
              left: x * sq,
              top: y * sq,
              width: sq,
              height: sq,
              background: "radial-gradient(ellipse at center, rgba(255,0,0,1) 0%, rgba(231,0,0,1) 25%, rgba(169,0,0,0) 89%, rgba(158,0,0,0) 100%)",
            }}
          />
        );
      })}

      {/* Pieces */}
      <div style={{ position: "absolute", inset: 0 }}>{pieces}</div>

      {/* Pulse rings */}
      <svg viewBox="0 0 8 8" style={{ position: "absolute", inset: 0, width: size, height: size, zIndex: 8 }}>
        {pulse.map(({ square, appearAt }) => {
          const t = frame - appearAt;
          if (t < 0) return null;
          const { x, y } = sqXY(square, orientation);
          const cycle = (t % 24) / 24;
          const fadeIn = interpolate(t, [0, 6], [0, 1], { extrapolateRight: "clamp" });
          return (
            <g key={`pulse-${square}`} opacity={fadeIn}>
              <circle cx={x + 0.5} cy={y + 0.5} r={0.44} fill="none" stroke="#ffe14d" strokeWidth={0.07} />
              <circle cx={x + 0.5} cy={y + 0.5} r={0.44 + cycle * 0.35} fill="none" stroke="#ffe14d" strokeWidth={0.06} opacity={1 - cycle} />
            </g>
          );
        })}

        {/* Arrows */}
        {arrows.map(({ mark, appearAt }) => {
          const { color, from, to } = parseMark(mark);
          if (!to) return null;
          const grow = interpolate(frame - appearAt, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          if (grow <= 0) return null;
          return <ArrowShape key={`arrow-${mark}`} from={from} to={to} color={MARK_COLORS[color]} grow={grow} orientation={orientation} />;
        })}
      </svg>

      {/* Badges */}
      {badgeShown ? (
        <BadgeAt square={lastMove!.to} orientation={orientation} sq={sq} appearAt={lastMove!.badgeAt!}>
          <MoveBadge classification={lastMove!.classification!} size={sq * 0.44} />
        </BadgeAt>
      ) : null}
      {mate && frame >= mate.appearAt ? (
        <>
          <BadgeAt square={mate.loserKing} orientation={orientation} sq={sq} appearAt={mate.appearAt}>
            <ResultBadge kind="mated" size={sq * 0.44} />
          </BadgeAt>
          <BadgeAt square={mate.winnerKing} orientation={orientation} sq={sq} appearAt={mate.appearAt + 6}>
            <ResultBadge kind="winner" size={sq * 0.44} />
          </BadgeAt>
        </>
      ) : null}
    </div>
  );
};

const BadgeAt: React.FC<{ square: string; orientation: Color; sq: number; appearAt: number; children: React.ReactNode }> = ({
  square,
  orientation,
  sq,
  appearAt,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { x, y } = sqXY(square, orientation);
  const s = spring({ frame: frame - appearAt, fps, config: { damping: 9, stiffness: 180, mass: 0.6 } });
  // Keep badges inside the board on the right / top edge.
  const cx = Math.min(x * sq + sq * 0.88, 8 * sq - sq * 0.24);
  const cy = Math.max(y * sq + sq * 0.12, sq * 0.24);
  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        transform: `translate(-50%, -50%) scale(${s})`,
        zIndex: 20,
      }}
    >
      {children}
    </div>
  );
};

/** Destination-square tint used by chess.com game review. */
const CLASS_TINT: Record<Classification, string> = {
  brilliant: "rgba(27, 172, 166, 0.5)",
  great: "rgba(92, 139, 176, 0.5)",
  best: "rgba(129, 182, 76, 0.5)",
  excellent: "rgba(129, 182, 76, 0.5)",
  good: "rgba(149, 183, 118, 0.5)",
  book: "rgba(213, 164, 125, 0.5)",
  inaccuracy: "rgba(247, 198, 49, 0.5)",
  mistake: "rgba(255, 164, 89, 0.5)",
  blunder: "rgba(250, 65, 45, 0.5)",
  miss: "rgba(255, 119, 105, 0.5)",
};
