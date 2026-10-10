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
    { moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"], say: "Normal opening. White's bishop eyes *f7*.", arrows: ["c4f7"] },
    { moves: ["Nd4"], say: "Knight to d4. Risky! Now our e5 pawn looks *free*.", pulse: ["e5"] },
    { moves: ["Nxe5"], say: "White takes the free pawn. *Here we go.*" },
    { moves: ["Qg5"], say: "Queen to g5! She attacks the knight *and* the g2 pawn.", arrows: ["g5e5", "g5g2"] },
    { moves: ["Nxf7"], say: "White gets greedy. Knight takes f7, hitting our *rook*.", arrows: ["r:f7h8"] },
    { moves: ["Qxg2"], say: "We don't care! Queen takes g2. Now *their* rook is attacked.", arrows: ["g2h1"] },
    { moves: ["Rf1"], say: "White saves the rook." },
    { moves: ["Qxe4+"], say: "Queen takes e4. *Check!*", arrows: ["r:e4e1"] },
    { moves: ["Be2"], say: "White blocks with the bishop." },
    { moves: ["Nf3#"], say: "Knight to f3. The bishop *can't take*: it's pinned. *Checkmate!*", arrows: ["r:e4e1"] },
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
    { moves: ["e4", "e5", "Nf3", "Nf6", "Nxe5"], say: "White takes our e5 pawn." },
    { moves: ["Nc6"], say: "We *give away* a pawn on purpose. The Stafford Gambit!" },
    { moves: ["Nxc6", "dxc6"], say: "Trade. Now our bishops have *open lines*.", arrows: ["g:c8g4", "g:f8c5"] },
    { moves: ["d3", "Bc5"], say: "Bishop to c5. It's *aiming at f2*.", arrows: ["c5f2"], pulse: ["f2"] },
    { moves: ["Bg5"], say: "White pins our knight to the queen. Looks *scary*.", arrows: ["r:g5d8"] },
    { moves: ["Nxe4"], say: "We move it anyway! Knight takes e4. *Take my queen!*", badge: "brilliant", pulse: ["d8"] },
    { moves: ["Bxd8"], say: "White grabs the queen. *Wrong!*" },
    { moves: ["Bxf2+"], say: "Bishop takes f2. *Check!*", arrows: ["r:f2e1"] },
    { moves: ["Ke2"], say: "The king has only *one square*." },
    { moves: ["Bg4#"], say: "Bishop to g4. *Checkmate!*" },
  ],
  takeaways: [
    "Bishop on c5 = *pressure on f2*.",
    "Pinned to the queen? You can *still move*.",
    "Before taking a queen, check for *checks*.",
  ],
};
