import type { Lesson } from "../types";

export const laskerTrap: Lesson = {
  id: "lasker-trap",
  band: "900-1500",
  title: "Lasker Trap",
  hero: "b",
  bookPlies: 6,
  hook: ["Promote a pawn to a *knight*?", "Yes. And it *wins the queen*."],
  steps: [
    { moves: ["d4", "d5", "c4", "e5", "dxe5", "d4", "e3"], say: "We push to d4. White attacks it: *mistake!*", arrows: ["r:e3d4"] },
    { moves: ["Bb4+", "Bd2", "dxe3"], say: "Bishop check, then we take e3.", arrows: ["e3f2", "e3d2"] },
    { moves: ["Bxb4", "exf2+", "Ke2"], say: "White grabs our bishop. Pawn takes f2. *Check!*", arrows: ["r:f2e1"] },
    { moves: ["fxg1=N+"], say: "And it becomes... a *KNIGHT*! With check!", badge: "brilliant", arrows: ["r:g1e2"] },
    { say: "A queen gives *no check*. The knight *does*.", pulse: ["g1"] },
    { moves: ["Rxg1", "Bg4+"], say: "White takes it. Bishop check *hits the queen*.", arrows: ["r:g4e2", "g4d1"], pulse: ["d1"] },
    { moves: ["Ke1", "Qxd1+"], say: "The king steps back... and we *take their queen*!" },
  ],
  takeaways: [
    "Promote to a knight when it gives *check*.",
    "Checks first, captures second.",
    "Against the Albin, avoid *e3*.",
  ],
};

export const fishingPoleTrap: Lesson = {
  id: "fishing-pole-trap",
  band: "900-1500",
  title: "Fishing Pole Trap",
  hero: "b",
  bookPlies: 7,
  hook: ["Throw your knight as *bait*...", "...and catch a *checkmate*."],
  steps: [
    { moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Ng4"], say: "Knight to g4. It's our *fishing pole*!" },
    { moves: ["h3", "h5"], say: "White kicks it. We *leave it there*.", pulse: ["g4"] },
    { moves: ["hxg4", "hxg4"], say: "White bites! Now the h-file is *open*.", arrows: ["g:h8h1"] },
    { moves: ["Ne1", "Qh4"], say: "Queen to h4. *Threat:* mate on h1!", arrows: ["h4h1"], pulse: ["h1"] },
    { moves: ["f3", "g3"], say: "Pawn to g3. Now *nothing* stops mate.", arrows: ["h4h1", "r:g3f2"] },
    { moves: ["Bxc6", "Qh1#"], say: "Queen to h1. *Checkmate!*", arrows: ["g:h8h1"] },
  ],
  takeaways: [
    "Taking the bait *opens the h-file*.",
    "Rook + queen on an open file = *mate*.",
    "Risky trap: it only works if they *take the bait*.",
  ],
};

export const siberianTrap: Lesson = {
  id: "siberian-trap",
  band: "900-1500",
  title: "Siberian Trap",
  hero: "b",
  bookPlies: 15,
  hook: ["Their queen *looks* safe.", "One knight jump: *checkmate*."],
  steps: [
    { moves: ["e4", "c5", "d4", "cxd4", "c3", "dxc3", "Nxc3", "Nc6", "Nf3", "e6", "Bc4", "Qc7"], say: "The Smith-Morra Gambit. Our queen eyes *h2*.", arrows: ["c7h2"], pulse: ["h2"] },
    { moves: ["O-O", "Nf6", "Qe2", "Ng4"], say: "Knight to g4. *Two pieces* hit h2.", arrows: ["g4h2", "c7h2"] },
    { moves: ["h3"], say: "White kicks it. *Natural... but wrong!*" },
    { moves: ["Nd4"], say: "Knight to d4! It attacks the *queen*.", badge: "brilliant", arrows: ["r:d4e2"] },
    { moves: ["Nxd4"], say: "White takes it... now *nobody guards h2*." },
    { moves: ["Qh2#"], say: "Queen takes h2. *Checkmate!*" },
  ],
  takeaways: [
    "Queen + knight vs *h2* = danger.",
    "Kill or distract the *defender*.",
    "Attack two things at once.",
  ],
};
