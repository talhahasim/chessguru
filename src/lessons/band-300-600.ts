import type { Lesson } from "../types";

export const legalsMate: Lesson = {
  id: "legals-mate",
  band: "300-600",
  title: "Légal's Mate",
  hero: "w",
  bookPlies: 6,
  hook: ["Give away your *queen*...", "...and *checkmate* 2 moves later."],
  steps: [
    { moves: ["e4", "e5", "Nf3"], say: "Normal start. Our knight *attacks e5*.", arrows: ["f3e5"] },
    { moves: ["d6"], say: "Black protects it with a pawn." },
    { moves: ["Bc4"], say: "Bishop out. Aiming at f7, the *weak spot*.", arrows: ["c4f7"] },
    { moves: ["Bg4"], say: "Black pins our knight. 'If it moves, I *take your queen*!'", arrows: ["r:g4d1"] },
    { moves: ["Nc3", "g6"], say: "We bring out a piece. Black plays a *slow move*. Now the trap is ready." },
    { moves: ["Nxe5"], say: "Knight takes e5! We *leave our queen* to die!", badge: "brilliant", arrows: ["r:g4d1"], pulse: ["d1"] },
    { moves: ["Bxd1"], say: "Black grabs the queen. *Big mistake.*" },
    { moves: ["Bxf7+"], say: "Bishop takes f7. *Check!*", arrows: ["r:f7e8"] },
    { moves: ["Ke7"], say: "The king has only *one square* to go." },
    { moves: ["Nd5#"], say: "Knight to d5. *Checkmate!* Three small pieces beat a queen." },
  ],
  takeaways: [
    "A pin to the *queen* is not a real pin.",
    "Sometimes giving the queen *wins the game*.",
    "Free queen? First check for *checkmate*.",
  ],
};

export const blackburneShilling: Lesson = {
  id: "blackburne-shilling",
  band: "300-600",
  title: "Blackburne Shilling Trap",
  hero: "b",
  bookPlies: 5,
  hook: ["This move looks like a *blunder*...", "...but it ends in *checkmate*."],
  steps: [
    { moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nd4"], say: "Knight to d4. Now e5 looks *free*...", pulse: ["e5"] },
    { moves: ["Nxe5"], say: "White takes it. *Here we go.*" },
    { moves: ["Qg5"], say: "Queen to g5! She hits the knight *and* g2.", arrows: ["g5e5", "g5g2"] },
    { moves: ["Nxf7", "Qxg2"], say: "White grabs f7. We grab g2!", arrows: ["g2h1"] },
    { moves: ["Rf1", "Qxe4+"], say: "The rook runs. Queen takes e4. *Check!*", arrows: ["r:e4e1"] },
    { moves: ["Be2", "Nf3#"], say: "Knight to f3. The bishop is *pinned*. *Checkmate!*", arrows: ["r:e4e1"] },
  ],
  takeaways: [
    "If they grab e5, play *...Qg5!*",
    "Ignore the knight. *Attack g2*.",
    "...Nd4 is risky. It works when they *grab e5*.",
  ],
};

export const staffordTrap: Lesson = {
  id: "stafford-trap",
  band: "300-600",
  title: "Stafford Gambit Trap",
  hero: "b",
  bookPlies: 8,
  hook: ["White takes our *queen*...", "...and gets *checkmated* right away."],
  steps: [
    { moves: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6"], say: "We give a pawn. The *Stafford Gambit*." },
    { moves: ["Nxc6", "dxc6", "d3", "Bc5"], say: "Our bishop aims at *f2*.", arrows: ["c5f2"], pulse: ["f2"] },
    { moves: ["Bg5"], say: "White pins our knight to the queen.", arrows: ["r:g5d8"] },
    { moves: ["Nxe4"], say: "We move it anyway! *Take my queen!*", badge: "brilliant", pulse: ["d8"] },
    { moves: ["Bxd8", "Bxf2+"], say: "White takes it. Bishop takes f2. *Check!*", arrows: ["r:f2e1"] },
    { moves: ["Ke2", "Bg4#"], say: "Bishop to g4. *Checkmate!*" },
  ],
  takeaways: [
    "Bishop on c5 = *pressure on f2*.",
    "Pinned to the queen? You can *still move*.",
    "Before taking a queen, check for *checks*.",
  ],
};
