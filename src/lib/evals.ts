import type { Classification, Color, WhiteEval } from "../types";

/** chess.com / lichess style winning chances for White, 0..100. */
export const whiteWinPercent = (e: WhiteEval): number => {
  if (e.type === "mated") return e.loser === "w" ? 0 : 100;
  if (e.type === "mate") return e.value > 0 ? 100 : 0;
  const cp = Math.max(-1500, Math.min(1500, e.value));
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);
};

/** Fill of the eval bar for White, 0..1 (mate = full bar). */
export const evalBarFill = (e: WhiteEval): number => {
  if (e.type !== "cp") return whiteWinPercent(e) / 100;
  // Slightly flattened so +1 / +2 look like chess.com's bar.
  const p = whiteWinPercent(e) / 100;
  return 0.04 + p * 0.92;
};

/** Text shown on the eval bar, e.g. "1.2", "M3", "1-0". */
export const evalText = (e: WhiteEval): string => {
  if (e.type === "mated") return e.loser === "w" ? "0-1" : "1-0";
  if (e.type === "mate") return `M${Math.abs(e.value)}`;
  return (Math.abs(e.value) / 100).toFixed(1);
};

/** Whether White is the side that is better (decides where the text sits). */
export const whiteIsBetter = (e: WhiteEval) => whiteWinPercent(e) >= 50;

export const classify = (opts: {
  before: WhiteEval;
  after: WhiteEval;
  mover: Color;
  playedUci: string;
  bestUci: string | null;
  isBook: boolean;
}): Classification => {
  const { before, after, mover, playedUci, bestUci, isBook } = opts;
  if (isBook) return "book";
  const pov = (e: WhiteEval) => (mover === "w" ? whiteWinPercent(e) : 100 - whiteWinPercent(e));
  // Delivering mate is always best.
  if (after.type === "mated") return "best";
  if (bestUci && playedUci === bestUci) return "best";
  const loss = pov(before) - pov(after);
  // Missing a forced mate while still being completely winning is just "excellent"/"good".
  if (loss < 2) return "excellent";
  if (loss < 5) return "good";
  if (loss < 10) return "inaccuracy";
  if (loss < 20) return "mistake";
  return "blunder";
};
