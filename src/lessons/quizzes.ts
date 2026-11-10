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

export const quizFoolsG4: Lesson = {
  id: "quiz-fools-g4",
  kind: "quiz",
  answer: "blunder",
  band: "0-300",
  title: "Brilliant or Blunder #11",
  hero: "w",
  hook: ["Two pawn moves to *attack*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["f3", "e5"], say: "White opens with a *strange* pawn move." },
    { moves: ["g4"], say: "Another pawn up. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizSiberianNd4: Lesson = {
  id: "quiz-siberian-nd4",
  kind: "quiz",
  answer: "brilliant",
  band: "900-1500",
  title: "Brilliant or Blunder #12",
  hero: "b",
  startFen: "r1b1kb1r/ppqp1ppp/2n1pn2/8/2B1P3/2N2N2/PP3PPP/R1BQ1RK1 w kq - 4 8",
  hook: ["Our knight is *attacked*...", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Qe2", "Ng4", "h3"], say: "White kicks our knight with *h3*." },
    { moves: ["Nd4"], say: "Knight to d4 attacks the *queen*. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizPetrovNf6: Lesson = {
  id: "quiz-petrov-nf6",
  kind: "quiz",
  answer: "blunder",
  band: "300-600",
  title: "Brilliant or Blunder #13",
  hero: "b",
  startFen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
  hook: ["Just pull the *knight* back?", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Nxe5", "Nxe4", "Qe2"], say: "Both sides grab a pawn. White's queen *pins* our knight." },
    { moves: ["Nf6"], say: "Knight back to f6. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizMagnusBxf7: Lesson = {
  id: "quiz-magnus-bxf7",
  kind: "quiz",
  answer: "brilliant",
  band: "900-1500",
  title: "Brilliant or Blunder #14",
  hero: "w",
  startFen: "r1bqkb1r/pp2pp1p/2np1np1/8/2BNP3/2N5/PPP2PPP/R1BQK2R w KQkq - 0 7",
  hook: ["A bishop for *one pawn*?", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Nxc6", "bxc6", "e5", "dxe5"], say: "We push e5. Black takes the pawn." },
    { moves: ["Bxf7+"], say: "Bishop takes f7, *check*! *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizFishingHxg4: Lesson = {
  id: "quiz-fishing-hxg4",
  kind: "quiz",
  answer: "blunder",
  band: "900-1500",
  title: "Brilliant or Blunder #15",
  hero: "w",
  startFen: "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
  hook: ["A *free* knight!", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["O-O", "Ng4", "h3", "h5"], say: "Black's knight jumps in. We kick it, and Black plays *h5*." },
    { moves: ["hxg4"], say: "We take the free knight. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizTraxlerBxf2: Lesson = {
  id: "quiz-traxler-bxf2",
  kind: "quiz",
  answer: "brilliant",
  band: "600-900",
  title: "Brilliant or Blunder #16",
  hero: "b",
  startFen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
  hook: ["Ignore the *fork*?!", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Ng5", "Bc5", "Nxf7"], say: "White's knight forks our *queen* and *rook*." },
    { moves: ["Bxf2+"], say: "Bishop takes f2, *check*! *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizStaffordBg5: Lesson = {
  id: "quiz-stafford-bg5",
  kind: "quiz",
  answer: "blunder",
  band: "300-600",
  title: "Brilliant or Blunder #17",
  hero: "w",
  startFen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
  hook: ["Pin the knight to the *queen*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Nxe5", "Nc6", "Nxc6", "dxc6", "d3", "Bc5"], say: "The Stafford Gambit. Black's bishop aims at *f2*." },
    { moves: ["Bg5"], say: "Bishop pins the knight to the *queen*. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizHalosarNb5: Lesson = {
  id: "quiz-halosar-nb5",
  kind: "quiz",
  answer: "brilliant",
  band: "600-900",
  title: "Brilliant or Blunder #18",
  hero: "w",
  startFen: "rnb1kb1r/ppp1pppp/5n2/8/3q4/2N2Q2/PPP3PP/R1B1KBNR w KQkq - 0 6",
  hook: ["Leave the queen *hanging*?", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Be3", "Qb4", "O-O-O", "Bg4"], say: "Black's bishop attacks our *queen*." },
    { moves: ["Nb5"], say: "We ignore it: knight to b5. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizLaskerBxb4: Lesson = {
  id: "quiz-lasker-bxb4",
  kind: "quiz",
  answer: "blunder",
  band: "900-1500",
  title: "Brilliant or Blunder #19",
  hero: "w",
  startFen: "rnbqkbnr/ppp2ppp/8/3pp3/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  hook: ["A *free* bishop.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["dxe5", "d4", "e3", "Bb4+", "Bd2", "dxe3"], say: "Black gambits a pawn and checks with the *bishop*." },
    { moves: ["Bxb4"], say: "We take the bishop. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizKieningerAxb4: Lesson = {
  id: "quiz-kieninger-axb4",
  kind: "quiz",
  answer: "blunder",
  band: "600-900",
  title: "Brilliant or Blunder #20",
  hero: "w",
  startFen: "r1bqkb1r/pppp1ppp/2n5/4P3/2P3n1/5N2/PP2PPPP/RNBQKB1R w KQkq - 3 5",
  hook: ["Black left a bishop *hanging*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Bf4", "Bb4+", "Nbd2", "Qe7", "a3", "Ngxe5"], say: "Black's queen lines up on the *e-file*." },
    { moves: ["axb4"], say: "We grab the bishop. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizCaroSmotheredNgf6: Lesson = {
  id: "quiz-caro-smothered-ngf6",
  kind: "quiz",
  answer: "blunder",
  band: "300-600",
  title: "Brilliant or Blunder #21",
  hero: "b",
  startFen: "r1bqkbnr/pp1npppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5",
  hook: ["Black just *develops*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Qe2"], say: "White's queen goes to *e2*." },
    { moves: ["Ngf6"], say: "Knight to f6, a normal move. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizQgaCxb5: Lesson = {
  id: "quiz-qga-cxb5",
  kind: "quiz",
  answer: "blunder",
  band: "600-900",
  title: "Brilliant or Blunder #22",
  hero: "b",
  startFen: "rnbqkbnr/p3pppp/2p5/1p6/P1pP4/4P3/1P3PPP/RNBQKBNR w KQkq - 0 5",
  hook: ["Black keeps the *extra pawn*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["axb5"], say: "White hits the pawn chain on *b5*." },
    { moves: ["cxb5"], say: "Black takes back. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizFromNc3: Lesson = {
  id: "quiz-from-nc3",
  kind: "quiz",
  answer: "blunder",
  band: "300-600",
  title: "Brilliant or Blunder #23",
  hero: "w",
  startFen: "rnbqkbnr/ppp2ppp/3p4/4P3/8/8/PPPPP1PP/RNBQKBNR w KQkq - 0 3",
  hook: ["White is a *pawn up*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["exd6", "Bxd6"], say: "White grabs a pawn. The bishop eyes the *king*." },
    { moves: ["Nc3"], say: "Knight to c3 develops. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizDamianoNxe5: Lesson = {
  id: "quiz-damiano-nxe5",
  kind: "quiz",
  answer: "brilliant",
  band: "300-600",
  title: "Brilliant or Blunder #24",
  hero: "w",
  startFen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
  hook: ["White gives the *knight* away?", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["f6"], say: "Black defends e5 with the *f-pawn*." },
    { moves: ["Nxe5"], say: "Knight takes e5 anyway. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizStauntonRh6: Lesson = {
  id: "quiz-staunton-rh6",
  kind: "quiz",
  answer: "blunder",
  band: "600-900",
  title: "Brilliant or Blunder #25",
  hero: "b",
  startFen: "rnbqkbnr/ppppp3/8/6pp/3P1p2/4P1B1/PPP2PPP/RN1QKBNR w KQkq - 0 6",
  hook: ["Black's rook joins the *attack*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Bd3"], say: "White's bishop aims at *g6*." },
    { moves: ["Rh6"], say: "Rook to h6, guarding the king side. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizFrenchNxd4: Lesson = {
  id: "quiz-french-nxd4",
  kind: "quiz",
  answer: "blunder",
  band: "600-900",
  title: "Brilliant or Blunder #26",
  hero: "b",
  startFen: "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2PB1N2/PP3PPP/RNBQK2R b KQkq - 4 6",
  hook: ["Black grabs a *free pawn*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["cxd4", "cxd4"], say: "Pawns trade. The pawn on *d4* looks weak." },
    { moves: ["Nxd4"], say: "Knight takes d4. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};

export const quizTarraschQd7: Lesson = {
  id: "quiz-tarrasch-qd7",
  kind: "quiz",
  answer: "blunder",
  band: "900-1500",
  title: "Brilliant or Blunder #27",
  hero: "b",
  startFen: "r2q1rk1/2p1bppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP3PPP/RNBQR1K1 w - - 3 11",
  hook: ["Black guards the *bishop*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["Nd4"], say: "White's knight jumps to *d4*." },
    { moves: ["Qd7"], say: "Queen to d7 guards e6. *Brilliant*... or *blunder*?" },
  ],
  takeaways: [],
};


export const quizPhilidorDxe5: Lesson = {
  id: "quiz-philidor-dxe5",
  kind: "quiz",
  answer: "blunder",
  band: "300-600",
  title: "Brilliant or Blunder #28",
  hero: "b",
  startFen: "r1bqk1nr/pppnbppp/3p4/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 3 5",
  hook: ["Black just takes *back*.", "*Brilliant* or *blunder*?"],
  steps: [
    { moves: ["dxe5"], say: "White trades in the *center*." },
    { moves: ["dxe5"], say: "Pawn takes back. *Brilliant*... or *blunder*?" },
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
  quizFoolsG4,
  quizSiberianNd4,
  quizPetrovNf6,
  quizMagnusBxf7,
  quizFishingHxg4,
  quizTraxlerBxf2,
  quizStaffordBg5,
  quizHalosarNb5,
  quizLaskerBxb4,
  quizKieningerAxb4,
  quizCaroSmotheredNgf6,
  quizQgaCxb5,
  quizFromNc3,
  quizDamianoNxe5,
  quizStauntonRh6,
  quizFrenchNxd4,
  quizTarraschQd7,
  quizPhilidorDxe5,
];
