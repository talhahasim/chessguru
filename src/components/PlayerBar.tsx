import React from "react";
import { Img, staticFile } from "remotion";
import type { BoardMap } from "../lib/line";
import { theme } from "../theme";
import type { Color } from "../types";
import { fontFamily } from "../fonts";

const VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 } as const;
const START_COUNT = { p: 8, n: 2, b: 2, r: 2, q: 1 } as const;
const ORDER = ["p", "n", "b", "r", "q"] as const;

/** Pieces of `victim` colour that are missing from the board (i.e. captured by the other side). */
const capturedOf = (board: BoardMap, victim: Color) => {
  const counts: Record<string, number> = { p: 0, n: 0, b: 0, r: 0, q: 0 };
  Object.values(board).forEach((p) => {
    if (p.color === victim && p.type !== "k") counts[p.type]++;
  });
  return ORDER.flatMap((t) => Array(Math.max(0, START_COUNT[t] - counts[t])).fill(t) as string[]);
};

const material = (board: BoardMap, color: Color) =>
  Object.values(board).reduce((s, p) => s + (p.color === color ? VALUES[p.type] : 0), 0);

const fmtClock = (seconds: number) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export const PlayerBar: React.FC<{
  width: number;
  height: number;
  name: string;
  rating: number;
  color: Color;
  isHero: boolean;
  board: BoardMap;
  clock: number;
  active: boolean;
}> = ({ width, height, name, rating, color, isHero, board, clock, active }) => {
  const opp: Color = color === "w" ? "b" : "w";
  const captured = capturedOf(board, opp);
  const adv = material(board, color) - material(board, opp);
  const avatar = height * 0.82;
  const icon = height * 0.36;
  return (
    <div style={{ width, height, display: "flex", alignItems: "center", gap: 16, fontFamily }}>
      <div
        style={{
          width: avatar,
          height: avatar,
          borderRadius: 6,
          background: isHero ? theme.green : "#5c5a57",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Img src={staticFile(`pieces/${isHero ? "w" : "b"}P.svg`)} style={{ width: avatar * 0.8, height: avatar * 0.8 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 4, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ color: theme.text, fontWeight: 800, fontSize: height * 0.34 }}>{name}</span>
          <span style={{ color: theme.textMuted, fontWeight: 600, fontSize: height * 0.3 }}>({rating})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", height: icon }}>
          {captured.map((t, i) => (
            <Img
              key={i}
              src={staticFile(`pieces/${opp}${t.toUpperCase()}.svg`)}
              style={{ width: icon, height: icon, marginLeft: i > 0 && captured[i - 1] === t ? -icon * 0.55 : 0 }}
            />
          ))}
          {adv > 0 ? (
            <span style={{ color: theme.textMuted, fontWeight: 700, fontSize: height * 0.26, marginLeft: 8 }}>+{adv}</span>
          ) : null}
        </div>
      </div>
      <div
        style={{
          minWidth: height * 2.1,
          height: height * 0.78,
          borderRadius: 6,
          background: active ? (color === "w" ? "#ffffff" : "#1b1a18") : color === "w" ? "#989795" : "#2b2926",
          color: active ? (color === "w" ? "#262421" : "#ffffff") : color === "w" ? "#4b4847" : "#878581",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: `0 ${height * 0.2}px`,
          fontWeight: 800,
          fontSize: height * 0.42,
          fontVariantNumeric: "tabular-nums",
          boxSizing: "border-box",
        }}
      >
        {fmtClock(clock)}
      </div>
    </div>
  );
};
