import type { Lesson } from "../types";

export const englundTrap: Lesson = {
  id: "englund-gambit-trap",
  band: "600-900",
  title: "Englund Gambit Trap",
  hero: "b",
  bookPlies: 8,
  hook: ["White takes a *free pawn*.", "6 moves later: *checkmate*."],
  steps: [
    { moves: ["d4", "e5"], say: "We throw a pawn at them. The *Englund Gambit*." },
    { moves: ["dxe5", "Nc6", "Nf3"], say: "White takes and protects it." },
    { moves: ["Qe7"], say: "Queen to e7. We attack e5 *again*.", arrows: ["e7e5", "c6e5"] },
    { moves: ["Bf4"], say: "White protects it one more time." },
    { moves: ["Qb4+"], say: "Queen to b4. *Check!* And she's eyeing *b2*.", arrows: ["r:b4e1", "b4b2"] },
    { moves: ["Bd2", "Qxb2"], say: "We take b2. Now we attack the *rook* in the corner.", arrows: ["b2a1"] },
    { moves: ["Bc3"], say: "White attacks our queen. *This is the mistake.*", arrows: ["r:c3b2"] },
    { moves: ["Bb4"], say: "Bishop to b4! Their bishop is now *pinned*.", arrows: ["b4c3", "r:c3e1"] },
    { moves: ["Qd2"], say: "White protects with the queen." },
    { moves: ["Bxc3"], say: "We take the bishop. Our queen *doesn't care*." },
    { moves: ["Qxc3"], say: "White takes back... *and walks into it*." },
    { moves: ["Qc1#"], say: "Queen to c1. *Checkmate!*", arrows: ["r:c1e1"] },
  ],
  takeaways: [
    "Gambit = give a pawn to *attack fast*.",
    "Pin pieces to the king with your *bishop*.",
    "Every move, ask: what are their *checks*?",
  ],
};

export const elephantTrap: Lesson = {
  id: "elephant-trap",
  band: "600-900",
  title: "Elephant Trap",
  hero: "b",
  bookPlies: 8,
  hook: ["White thinks they *won a pawn*.", "Really, they just *lost a piece*."],
  steps: [
    { moves: ["d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Nbd7"], say: "White pins our knight. We *quietly* set the trap.", arrows: ["r:g5d8"] },
    { moves: ["cxd5", "exd5", "Nxd5"], say: "White grabs d5. 'Your knight is pinned!'", arrows: ["r:g5d8"], pulse: ["d5"] },
    { moves: ["Nxd5"], say: "Surprise! We take anyway and *give our queen*.", badge: "brilliant", pulse: ["d8"] },
    { moves: ["Bxd8", "Bb4+"], say: "White takes it. Bishop *check*!", arrows: ["r:b4e1"] },
    { moves: ["Qd2", "Bxd2+", "Kxd2"], say: "Only the queen can block. We *take it*." },
    { moves: ["Kxd8"], say: "Then the bishop. We're *a whole piece up*!" },
  ],
  takeaways: [
    "A pinned knight can *still move*.",
    "Lose your queen, take *theirs* + a piece.",
    "Free pawn? Count the *checks* first.",
  ],
};

export const kieningerTrap: Lesson = {
  id: "kieninger-trap",
  band: "600-900",
  title: "Kieninger Trap",
  hero: "b",
  bookPlies: 10,
  hook: ["White takes our *bishop*.", "Next move: *checkmate*."],
  steps: [
    { moves: ["d4", "Nf6", "c4", "e5", "dxe5", "Ng4"], say: "We give a pawn. The *Budapest Gambit*." },
    { moves: ["Nf3", "Nc6", "Bf4", "Bb4+", "Nbd2", "Qe7"], say: "Now *three* pieces hit e5.", arrows: ["e7e5", "g4e5", "c6e5"] },
    { moves: ["a3"], say: "White attacks our bishop.", arrows: ["r:a3b4"] },
    { moves: ["Ngxe5"], say: "We ignore it and take e5! *Leave the bishop.*", badge: "great" },
    { moves: ["axb4"], say: "White takes the free bishop..." },
    { say: "The e2 pawn is *pinned*. The king is *boxed in*.", arrows: ["r:e7e1"], pulse: ["d3"] },
    { moves: ["Nd3#"], say: "Knight to d3. *Smothered checkmate!*" },
  ],
  takeaways: [
    "Pin the *e2 pawn* with your queen.",
    "King boxed in by its own pieces = *knight mate*.",
    "Free bishop? Check for *mate* first.",
  ],
};
