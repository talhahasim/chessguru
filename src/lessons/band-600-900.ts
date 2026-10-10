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
  finale: { banner: "PIECE WON!", sub: "Black is a whole piece up" },
  steps: [
    { moves: ["d4", "d5", "c4", "e6", "Nc3", "Nf6"], say: "The Queen's Gambit. Very normal stuff." },
    { moves: ["Bg5"], say: "White pins our knight to the *queen*.", arrows: ["r:g5d8"] },
    { moves: ["Nbd7"], say: "Knight to d7. This quietly *sets the trap*." },
    { moves: ["cxd5", "exd5"], say: "Pawns trade on d5." },
    { moves: ["Nxd5"], say: "White grabs d5. 'Your knight is pinned!' they think.", arrows: ["r:g5d8"], pulse: ["d5"] },
    { moves: ["Nxd5"], say: "Surprise! We take anyway and *give our queen*.", badge: "brilliant", pulse: ["d8"] },
    { moves: ["Bxd8"], say: "White takes the queen." },
    { moves: ["Bb4+"], say: "Bishop check! White must *block*.", arrows: ["r:b4e1"] },
    { moves: ["Qd2"], say: "Only the *queen* can block." },
    { moves: ["Bxd2+", "Kxd2"], say: "We take their queen *with check*." },
    { moves: ["Kxd8"], say: "And we take the bishop. We're *a whole piece up*!" },
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
    { moves: ["d4", "Nf6", "c4", "e5"], say: "We give a pawn. The *Budapest Gambit*." },
    { moves: ["dxe5", "Ng4", "Nf3", "Nc6"], say: "Our knights *attack e5*.", arrows: ["g4e5", "c6e5"] },
    { moves: ["Bf4"], say: "White protects it with the bishop." },
    { moves: ["Bb4+"], say: "Bishop check!", arrows: ["r:b4e1"] },
    { moves: ["Nbd2"], say: "White blocks with the knight." },
    { moves: ["Qe7"], say: "Queen to e7. Now *three* pieces hit e5.", arrows: ["e7e5", "g4e5", "c6e5"] },
    { moves: ["a3"], say: "White attacks our bishop.", arrows: ["r:a3b4"] },
    { moves: ["Ngxe5"], say: "We ignore it and take e5! *Leave the bishop.*", badge: "great" },
    { moves: ["axb4"], say: "White takes the free bishop..." },
    { say: "Look: the e2 pawn is *pinned*. The king is *boxed in*.", arrows: ["r:e7e1"], pulse: ["d3"] },
    { moves: ["Nd3#"], say: "Knight to d3. *Smothered checkmate!*" },
  ],
  takeaways: [
    "Pin the *e2 pawn* with your queen.",
    "King boxed in by its own pieces = *knight mate*.",
    "Free bishop? Check for *mate* first.",
  ],
};
