import { Chess, type Move } from "chess.js";
import type { Lesson } from "../types";

export const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export type PlayedMove = {
  ply: number;
  stepIndex: number;
  move: Move;
  fenBefore: string;
  fenAfter: string;
};

export type ReplayedLine = {
  startFen: string;
  moves: PlayedMove[];
  /** fens[i] = position after i plies (fens[0] = start). */
  fens: string[];
  /** Fingerprint of the line used to detect stale engine analysis. */
  fingerprint: string;
  finalFen: string;
  isMate: boolean;
};

export const replayLesson = (lesson: Lesson): ReplayedLine => {
  const startFen = lesson.startFen ?? START_FEN;
  const chess = new Chess(startFen);
  const moves: PlayedMove[] = [];
  const fens = [chess.fen()];
  lesson.steps.forEach((step, stepIndex) => {
    for (const san of step.moves ?? []) {
      const fenBefore = chess.fen();
      let move: Move;
      try {
        move = chess.move(san);
      } catch {
        throw new Error(`[${lesson.id}] illegal move "${san}" in step ${stepIndex + 1} (fen: ${fenBefore})`);
      }
      fens.push(chess.fen());
      moves.push({ ply: moves.length + 1, stepIndex, move, fenBefore, fenAfter: chess.fen() });
    }
  });
  return {
    startFen,
    moves,
    fens,
    fingerprint: `${startFen}|${moves.map((m) => m.move.lan).join(" ")}`,
    finalFen: chess.fen(),
    isMate: chess.isCheckmate(),
  };
};

export type Piece = { type: "p" | "n" | "b" | "r" | "q" | "k"; color: "w" | "b" };
export type BoardMap = Record<string, Piece>;

export const boardFromFen = (fen: string): BoardMap => {
  const map: BoardMap = {};
  const rows = fen.split(" ")[0].split("/");
  rows.forEach((row, r) => {
    let file = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) {
        file += Number(ch);
        continue;
      }
      const sq = `${"abcdefgh"[file]}${8 - r}`;
      map[sq] = {
        type: ch.toLowerCase() as Piece["type"],
        color: ch === ch.toUpperCase() ? "w" : "b",
      };
      file++;
    }
  });
  return map;
};

export const sideToMove = (fen: string) => fen.split(" ")[1] as "w" | "b";

/** Square of the king of `color` in `fen`. */
export const kingSquare = (fen: string, color: "w" | "b") => {
  const board = boardFromFen(fen);
  return Object.keys(board).find((sq) => board[sq].type === "k" && board[sq].color === color) ?? null;
};

export const isCheck = (fen: string) => new Chess(fen).inCheck();
export const isCheckmate = (fen: string) => new Chess(fen).isCheckmate();
