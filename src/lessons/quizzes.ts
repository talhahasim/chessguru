import type { Lesson } from "../types";

/**
 * "Brilliant or blunder?" quizzes. The last move is the question; the video never shows the answer
 * (no badge, no eval swing). Viewers answer in the comments and scripts/reply-comments.ts replies.
 * `answer` must match Stockfish (checked by npm run validate).
 */

export const quizScholarsNf6: Lesson = {
  id: "quiz-scholars-nf6",
  kind: "quiz",
  answer: "blunder",
  band: "0-300",
  title: "Brilliant or Blunder #1",
  hero: "b",
  bookPlies: 4,
  hook: ["Black attacks the *queen*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["e4", "e5", "Bc4", "Nc6", "Qh5"], say: "White's queen comes out *early*." },
    { moves: ["Nf6"], say: "Knight to f6 hits the queen. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizNoahsArkQxd4: Lesson = {
  id: "quiz-noahs-ark-qxd4",
  kind: "quiz",
  answer: "blunder",
  band: "900-1500",
  title: "Brilliant or Blunder #3",
  hero: "w",
  startFen: "r1bqkbnr/2p2ppp/p1np4/1p2p3/3PP3/1B3N2/PPP2PPP/RNBQK2R b KQkq - 1 6",
  hook: ["White wins the pawn *back*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Nxd4", "Nxd4", "exd4"], say: "Black trades knights and grabs *d4*." },
    { moves: ["Qxd4"], say: "Queen takes it back. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizRetiQd8: Lesson = {
  id: "quiz-reti-qd8",
  kind: "quiz",
  answer: "brilliant",
  band: "600-900",
  title: "Brilliant or Blunder #4",
  hero: "w",
  startFen: "rnb1kb1r/pp3ppp/2p2n2/4q3/4N3/3Q4/PPPB1PPP/R3KBNR w KQkq - 0 8",
  hook: ["Queen check... into the *king*?", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["O-O-O", "Nxe4"], say: "White castles. Black grabs a *knight*." },
    { moves: ["Qd8+"], say: "Queen to d8, *check*! *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const QUIZZES: Lesson[] = [quizScholarsNf6, quizNoahsArkQxd4, quizRetiQd8];
