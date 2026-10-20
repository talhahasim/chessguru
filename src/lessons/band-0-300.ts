import type { Lesson } from "../types";

export const scholarsMate: Lesson = {
  id: "scholars-mate",
  band: "0-300",
  title: "Scholar's Mate",
  hero: "w",
  bookPlies: 4,
  hook: ["Checkmate in *4 moves*.", "Beginners fall for this *all the time*."],
  steps: [
    { moves: ["e4"], say: "Pawn to e4. This opens the door for our *queen* and *bishop*.", arrows: ["g:d1h5", "g:f1c4"] },
    { moves: ["e5"], say: "Black copies us. Totally normal." },
    { moves: ["Bc4"], say: "Bishop out. It's *aiming at f7*.", arrows: ["c4f7"], pulse: ["f7"] },
    { say: "Look at f7. Only the *king* protects it. That's the *weak spot*!", squares: ["r:f7"], arrows: ["r:e8f7"] },
    { moves: ["Nc6"], say: "Black brings out a knight. Looks fine..." },
    { moves: ["Qh5"], say: "Queen out! Now *two pieces* attack f7.", arrows: ["h5f7", "c4f7"], pulse: ["f7"] },
    { moves: ["Nf6"], say: "Black attacks our queen... but *forgets about f7*!", arrows: ["r:f6h5"], pulse: ["f7"] },
    { moves: ["Qxf7#"], say: "Queen takes f7. The bishop protects her. *Checkmate!*", arrows: ["g:c4f7"] },
  ],
  takeaways: [
    "Queen + bishop attack *f7*.",
    "If they forget to defend it: *game over*.",
    "Playing Black? Stop it with *...g6* or *...Qe7*.",
  ],
};

export const foolsMate: Lesson = {
  id: "fools-mate",
  band: "0-300",
  title: "Fool's Mate",
  hero: "b",
  hook: ["The *fastest* checkmate in chess.", "Only *2 moves*. Seriously."],
  steps: [
    { moves: ["f3"], say: "White pushes the f-pawn. The king gets *weaker*.", squares: ["r:e1"] },
    { moves: ["e5"], say: "We open a path for our *queen*.", arrows: ["g:d8h4"] },
    { moves: ["g4"], say: "Another pawn push. *Huge mistake!*", arrows: ["d8h4", "r:h4e1"], pulse: ["e1"] },
    { moves: ["Qh4#"], say: "Queen to h4. The king is *trapped*. *Checkmate!*" },
  ],
  takeaways: [
    "Don't push your *f and g pawns* early.",
    "They are your king's *bodyguards*.",
    "Open line to the king = *danger*.",
  ],
};

export const backRankMate: Lesson = {
  id: "back-rank-mate",
  band: "0-300",
  title: "Back Rank Mate",
  hero: "w",
  startFen: "6k1/5ppp/8/8/1q6/8/1P3PPP/3R2K1 b - - 0 1",
  hook: ["They have a *queen*. We have a rook.", "We still win in *1 move*."],
  steps: [
    { say: "Black has a *queen*. Black is winning... right?", pulse: ["b4"] },
    { say: "Look at their king. It's stuck *behind its own pawns*. No exit!", squares: ["r:f7", "r:g7", "r:h7"], pulse: ["g8"] },
    { moves: ["Qxb2"], say: "Black gets greedy and grabs a pawn." },
    { moves: ["Rd8#"], say: "Rook to the back row. The king *can't escape*. *Checkmate!*", arrows: ["g:d1d8"] },
  ],
  takeaways: [
    "King with *no exit* squares? Look at the back row.",
    "One rook can *end the game*.",
    "Protect yourself: give your king *one free square* (like h6).",
  ],
};
