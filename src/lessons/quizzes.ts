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

export const quizEnglundBc3: Lesson = {
  id: "quiz-englund-bc3",
  kind: "quiz",
  answer: "blunder",
  band: "600-900",
  title: "Brilliant or Blunder #5",
  hero: "w",
  startFen: "r1b1kbnr/ppppqppp/2n5/4P3/5B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 4 4",
  hook: ["White *hunts* the queen.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Qb4+", "Bd2", "Qxb2"], say: "Black checks and grabs the pawn on *b2*." },
    { moves: ["Bc3"], say: "Bishop to c3 attacks the queen. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizLegalNxe5: Lesson = {
  id: "quiz-legal-nxe5",
  kind: "quiz",
  answer: "brilliant",
  band: "300-600",
  title: "Brilliant or Blunder #6",
  hero: "w",
  startFen: "rnbqkbnr/ppp2ppp/3p4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 3",
  hook: ["The knight *ignores* the pin!", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Bg4", "Nc3", "g6"], say: "Black pins the knight to the *queen*." },
    { moves: ["Nxe5"], say: "Knight takes e5 and leaves the *queen*. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizElephantNxd5: Lesson = {
  id: "quiz-elephant-nxd5",
  kind: "quiz",
  answer: "blunder",
  band: "600-900",
  title: "Brilliant or Blunder #7",
  hero: "w",
  startFen: "rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4",
  hook: ["A free *pawn* in the center?", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Nbd7", "cxd5", "exd5"], say: "The pawn on d5 looks *loose*." },
    { moves: ["Nxd5"], say: "Knight grabs it. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizFriedLiverNxf7: Lesson = {
  id: "quiz-fried-liver-nxf7",
  kind: "quiz",
  answer: "brilliant",
  band: "600-900",
  title: "Brilliant or Blunder #8",
  hero: "w",
  startFen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
  hook: ["A *knight* for one pawn?", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Ng5", "d5", "exd5", "Nxd5"], say: "White attacks f7. Black takes back on *d5*." },
    { moves: ["Nxf7"], say: "Knight takes f7 and gives itself up. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizBlackburneNxf7: Lesson = {
  id: "quiz-blackburne-nxf7",
  kind: "quiz",
  answer: "blunder",
  band: "300-600",
  title: "Brilliant or Blunder #9",
  hero: "w",
  startFen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
  hook: ["A fork on *queen* and *rook*!", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Nd4", "Nxe5", "Qg5"], say: "White grabs e5. Black's queen comes *out*." },
    { moves: ["Nxf7"], say: "Knight forks the queen and the rook. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizLaskerUnderpromotion: Lesson = {
  id: "quiz-lasker-fxg1n",
  kind: "quiz",
  answer: "brilliant",
  band: "900-1500",
  title: "Brilliant or Blunder #10",
  hero: "b",
  startFen: "rnbqk1nr/ppp2ppp/8/4P3/1bP5/4p3/PP1B1PPP/RN1QKBNR w KQkq - 0 6",
  hook: ["A pawn becomes a *knight*?!", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Bxb4", "exf2+", "Ke2"], say: "White takes the bishop. The pawn gives *check*." },
    { moves: ["fxg1=N+"], say: "The pawn takes and becomes a *knight*, not a queen. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const QUIZZES: Lesson[] = [
  quizScholarsNf6,
  quizNoahsArkQxd4,
  quizRetiQd8,
  quizEnglundBc3,
  quizLegalNxe5,
  quizElephantNxd5,
  quizFriedLiverNxf7,
  quizBlackburneNxf7,
  quizLaskerUnderpromotion,
];
