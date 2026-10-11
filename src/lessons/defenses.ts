import type { Lesson } from "../types";

// "How to stop it" videos: one per trap, shown from the side the trap is aimed at.

// --- 0-300 -------------------------------------------------------------------

export const stopScholarsMate: Lesson = {
  id: "stop-scholars-mate",
  kind: "defense",
  defends: "scholars-mate",
  band: "0-300",
  title: "Stop the Scholar's Mate",
  hero: "b",
  bookPlies: 6,
  hook: ["They want *mate in 4*.", "Here's how to *stop it*."],
  steps: [
    { moves: ["e4", "e5", "Bc4", "Nc6"], say: "Normal start. But watch that bishop on *c4*.", arrows: ["r:c4f7"] },
    { moves: ["Qh5"], say: "Queen out! *Threat:* queen takes f7, checkmate!", arrows: ["r:h5f7", "r:c4f7"], pulse: ["f7"] },
    { moves: ["g6"], say: "Pawn to g6! It *kicks the queen* away.", arrows: ["g:g6h5"] },
    { moves: ["Qf3"], say: "The queen comes back. *Same threat* on f7!", arrows: ["r:f3f7", "r:c4f7"], pulse: ["f7"] },
    { moves: ["Nf6"], say: "Knight to f6 *blocks it*. f7 is safe!", squares: ["g:f7"] },
    { moves: ["Ne2", "Na5"], say: "Now *we* attack the bishop. Their queen came out *too early*.", arrows: ["a5c4"] },
  ],
  takeaways: ["Queen on h5? Play *...g6*.", "Queen on f3? Block with *...Nf6*.", "Early queen = *easy target*."],
};

export const avoidFoolsMate: Lesson = {
  id: "avoid-fools-mate",
  kind: "defense",
  defends: "fools-mate",
  band: "0-300",
  title: "Avoid Fool's Mate",
  hero: "w",
  hook: ["Never lose to the *fastest mate*.", "Just follow *one rule*."],
  steps: [
    { moves: ["f3"], say: "We pushed the f-pawn. *Not great*, but not lost." },
    { moves: ["e5"], say: "Black's queen now *eyes h4*. Our king is open.", arrows: ["r:d8h4", "r:h4e1"] },
    { say: "Pushing the g-pawn now is *checkmate*. Don't do it!", arrows: ["r:g2g4"] },
    { moves: ["e4"], say: "Play e4 instead. If the queen checks, *g3 blocks*.", arrows: ["g:g2g3"] },
    { moves: ["Bc5", "Nc3"], say: "Bring out pieces. Keep the king *safe*." },
  ],
  takeaways: ["Keep your *f and g pawns* home early.", "Start with *e4 or d4*, then knights.", "Open line to your king? *Close it*."],
};

export const stopBackRankMate: Lesson = {
  id: "stop-back-rank-mate",
  kind: "defense",
  defends: "back-rank-mate",
  band: "0-300",
  title: "Stop Back Rank Mate",
  hero: "b",
  startFen: "6k1/5ppp/8/8/1q6/8/1P3PPP/3R2K1 b - - 0 1",
  hook: ["Winning? Don't lose to *one rook*.", "One tiny move *saves you*."],
  steps: [
    { say: "We have a *queen*. We're winning!", pulse: ["b4"] },
    { say: "But our king has *no exit*. Its own pawns block it.", squares: ["r:f7", "r:g7", "r:h7"], pulse: ["g8"] },
    { say: "Rook to d8 would be *checkmate*.", arrows: ["r:d1d8"] },
    { moves: ["h6"], say: "So first: pawn to h6. Now the king *can breathe*.", squares: ["g:h7"] },
    { moves: ["Rd8+"], say: "Rook check on the back row...", arrows: ["r:d8g8"] },
    { moves: ["Kh7"], say: "No problem. The king *escapes* to h7!" },
  ],
  takeaways: ["King stuck on the back row = *danger*.", "Make *one escape square* (h6 or g6).", "Then grab material *safely*."],
};

// --- 300-600 -----------------------------------------------------------------

export const stopLegalsMate: Lesson = {
  id: "stop-legals-mate",
  kind: "defense",
  defends: "legals-mate",
  band: "300-600",
  title: "Stop Légal's Mate",
  hero: "b",
  bookPlies: 6,
  hook: ["They try *Légal's Mate*...", "...and just *lose their queen*."],
  steps: [
    { moves: ["e4", "e5", "Nf3", "d6", "Bc4", "Bg4"], say: "We pin their knight to the queen.", arrows: ["g4d1"] },
    { moves: ["Nc3"], say: "Here, *don't* play ...g6. That's when the trap works." },
    { moves: ["Nf6"], say: "Knight to f6! It guards *d5* and *g4*.", arrows: ["g:f6d5", "g:f6g4"] },
    { moves: ["Nxe5"], say: "White tries the trick anyway: *knight takes e5*!" },
    { moves: ["Bxd1"], say: "This time, *take the queen*!" },
    { moves: ["Bxf7+", "Ke7"], say: "Bishop check. King to e7, *like before*..." },
    { moves: ["Nd5+"], say: "Knight check... but that square is *covered*!", arrows: ["g:f6d5"] },
    { moves: ["Nxd5"], say: "Our knight takes it. *No mate.* We're a queen up!" },
  ],
  takeaways: ["Pinned their knight? Play *...Nf6* next.", "Guard *d5* and the trap dies.", "Never play *...g6* there."],
};

export const beatBlackburneShilling: Lesson = {
  id: "beat-blackburne-shilling",
  kind: "defense",
  defends: "blackburne-shilling",
  band: "300-600",
  title: "Beat the Blackburne Trap",
  hero: "w",
  bookPlies: 5,
  hook: ["That free pawn is *poison*.", "Do *this* instead."],
  steps: [
    { moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"], say: "Normal opening." },
    { moves: ["Nd4"], say: "Black plays Nd4. Now e5 looks *free*...", pulse: ["e5"] },
    { say: "If we take it, *...Qg5* starts a deadly attack.", arrows: ["r:f3e5", "r:d8g5"] },
    { moves: ["Nxd4"], say: "Instead, *take the knight*!" },
    { moves: ["exd4", "O-O"], say: "Then castle. We're *safe* and better." },
  ],
  takeaways: ["Knight on d4? *Take it*, not e5.", "Free pawns can be *poison*.", "Castle early, stay *safe*."],
};

export const beatStafford: Lesson = {
  id: "beat-stafford-gambit",
  kind: "defense",
  defends: "stafford-trap",
  band: "300-600",
  title: "Beat the Stafford Gambit",
  hero: "w",
  bookPlies: 8,
  hook: ["Beat the *Stafford Gambit*.", "Just *don't* play this move."],
  steps: [
    { moves: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6"], say: "Black gives a pawn: the *Stafford Gambit*." },
    { moves: ["Nxc6", "dxc6", "d3", "Bc5"], say: "Their bishop now aims at *f2*.", arrows: ["r:c5f2"] },
    { say: "Don't pin with *Bg5*. That's exactly the trap!", arrows: ["r:c1g5"] },
    { moves: ["Be2"], say: "Bishop to e2. It guards *g4* and our king.", arrows: ["g:e2g4"] },
    { moves: ["Ng4"], say: "Black attacks f2 anyway...", arrows: ["r:g4f2", "r:c5f2"] },
    { moves: ["Bxg4"], say: "Just *take the knight*. We're a piece up!" },
  ],
  takeaways: ["Against the Stafford: *Be2*, not Bg5.", "Guard *f2* and g4.", "Then castle and *stay calm*."],
};

// --- 600-900 -----------------------------------------------------------------

export const beatEnglund: Lesson = {
  id: "beat-englund-gambit",
  kind: "defense",
  defends: "englund-gambit-trap",
  band: "600-900",
  title: "Beat the Englund Gambit",
  hero: "w",
  bookPlies: 8,
  hook: ["Took the Englund pawn?", "One knight move *wins*."],
  steps: [
    { moves: ["d4", "e5", "dxe5", "Nc6", "Nf3", "Qe7"], say: "The *Englund Gambit*. We grabbed a pawn." },
    { moves: ["Bf4", "Qb4+", "Bd2", "Qxb2"], say: "Black's queen grabs b2 and hits our *rook*.", arrows: ["r:b2a1"] },
    { say: "*Bc3* loses here! It gets pinned, then mate.", arrows: ["r:d2c3"] },
    { moves: ["Nc3"], say: "Knight to c3! Next, our rook *hunts the queen*." },
    { moves: ["Bb4", "Rb1"], say: "Rook attacks the queen. She must *run*.", arrows: ["r:b1b2"] },
    { moves: ["Qa3", "Nd5"], say: "Our knight jumps in. *Black is in trouble*.", arrows: ["d5b4", "d5c7"] },
  ],
  takeaways: ["Queen on b2? Play *Nc3*, then Rb1.", "Never *Bc3* there: it gets pinned.", "Chase the *greedy queen*!"],
};

export const dodgeElephantTrap: Lesson = {
  id: "dodge-elephant-trap",
  kind: "defense",
  defends: "elephant-trap",
  band: "600-900",
  title: "Dodge the Elephant Trap",
  hero: "w",
  bookPlies: 10,
  hook: ["d5 looks *free*. It's not.", "Here's the *safe* move."],
  steps: [
    { moves: ["d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Nbd7"], say: "The Queen's Gambit. We pin their knight." },
    { moves: ["cxd5", "exd5"], say: "Pawns trade. Now d5 looks *free*.", pulse: ["d5"] },
    { say: "But Nxd5 *loses a piece*! Their knight isn't really pinned.", arrows: ["r:c3d5"] },
    { moves: ["e3"], say: "Play *e3*. Calm and solid." },
    { moves: ["c6", "Bd3"], say: "Develop and castle. *Trap dodged*." },
  ],
  takeaways: ["Pinned to the queen = *not* fully pinned.", "Free pawn? Check what *they* get.", "Solid moves win *at your level*."],
};

export const dodgeKieningerTrap: Lesson = {
  id: "dodge-kieninger-trap",
  kind: "defense",
  defends: "kieninger-trap",
  band: "600-900",
  title: "Dodge the Kieninger Trap",
  hero: "w",
  bookPlies: 12,
  hook: ["Avoid a *smothered mate*...", "...with *one pawn move*."],
  steps: [
    { moves: ["d4", "Nf6", "c4", "e5", "dxe5", "Ng4"], say: "The *Budapest Gambit*." },
    { moves: ["Nf3", "Nc6", "Bf4", "Bb4+", "Nbd2", "Qe7"], say: "Black hits e5 *three times*.", arrows: ["e7e5", "g4e5", "c6e5"] },
    { say: "If we play *a3*, a smothered mate is coming!", arrows: ["r:a2a3"] },
    { moves: ["e3"], say: "Play *e3* instead. Our king gets *air*.", squares: ["g:e2"] },
    { moves: ["Ngxe5", "Nxe5", "Nxe5"], say: "Black wins the pawn back. That's fine." },
    { moves: ["Be2"], say: "Develop and castle. *No mate* here!" },
  ],
  takeaways: ["Budapest Gambit? Play *e3* early.", "Don't let your king get *boxed in*.", "*a3* there is a trap!"],
};

// --- 900-1500 ----------------------------------------------------------------

export const dodgeLaskerTrap: Lesson = {
  id: "dodge-lasker-trap",
  kind: "defense",
  defends: "lasker-trap",
  band: "900-1500",
  title: "Dodge the Lasker Trap",
  hero: "w",
  bookPlies: 6,
  hook: ["The Albin hides a *nasty trap*.", "Here's how to *dodge it*."],
  steps: [
    { moves: ["d4", "d5", "c4", "e5"], say: "The *Albin Countergambit*." },
    { moves: ["dxe5", "d4"], say: "Their pawn pushes to d4. *Annoying*." },
    { say: "Attacking it with *e3* falls into the trap!", arrows: ["r:e2e3"] },
    { moves: ["Nf3"], say: "Play *Nf3*. Just develop." },
    { moves: ["Nc6", "Nbd2"], say: "Knights out. Next one goes to *b3*." },
    { moves: ["Nge7", "Nb3"], say: "Now we attack d4 and *win it back*.", arrows: ["b3d4", "f3d4"] },
  ],
  takeaways: ["Against the Albin: *Nf3*, not e3.", "Win the d4 pawn *later*.", "Knights before pawns."],
};

export const dodgeFishingPole: Lesson = {
  id: "dodge-fishing-pole",
  kind: "defense",
  defends: "fishing-pole-trap",
  band: "900-1500",
  title: "Dodge the Fishing Pole",
  hero: "w",
  bookPlies: 7,
  hook: ["A free knight? It's *bait*.", "Don't bite. Do *this*."],
  steps: [
    { moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O"], say: "The Ruy Lopez. We castle." },
    { moves: ["Ng4", "h3", "h5"], say: "Black leaves the knight *hanging*...", pulse: ["g4"] },
    { say: "It's *bait*! Taking opens the h-file for their rook.", arrows: ["r:h3g4", "r:h8h1"] },
    { moves: ["c3"], say: "Don't take! Play *c3*, then d4." },
    { moves: ["d6", "d4"], say: "We grab the *center*. Their knight is still stuck." },
  ],
  takeaways: ["Free knight next to your king? *Bait*.", "Don't open the *h-file*.", "Play the *center* instead."],
};

export const dodgeSiberianTrap: Lesson = {
  id: "dodge-siberian-trap",
  kind: "defense",
  defends: "siberian-trap",
  band: "900-1500",
  title: "Dodge the Siberian Trap",
  hero: "w",
  bookPlies: 15,
  hook: ["Don't kick that knight!", "Here's the *safe* move."],
  steps: [
    { moves: ["e4", "c5", "d4", "cxd4", "c3"], say: "We play the *Smith-Morra Gambit*." },
    { moves: ["dxc3", "Nxc3", "Nc6", "Nf3", "e6", "Bc4", "Qc7", "O-O", "Nf6", "Qe2"], say: "Everyone develops." },
    { moves: ["Ng4"], say: "Knight to g4. Two pieces hit *h2*.", arrows: ["r:g4h2", "r:c7h2"] },
    { say: "Kicking it with *h3* loses! Nd4 is coming.", arrows: ["r:h2h3"] },
    { moves: ["Rd1"], say: "Rook to d1. Now our queen has *f1* to escape.", squares: ["g:f1"] },
    { moves: ["Bc5", "Nb5"], say: "Knight to b5 *kicks their queen*.", arrows: ["b5c7"] },
  ],
  takeaways: ["Knight g4 + queen c7? *No h3*.", "Give your queen an *escape square*.", "Attack their queen *first*."],
};
