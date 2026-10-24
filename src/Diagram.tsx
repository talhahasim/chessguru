import React from "react";
import { AbsoluteFill } from "remotion";
import { Board } from "./components/Board";
import { isCheck, kingSquare, sideToMove } from "./lib/line";
import type { Classification, Color } from "./types";

/** A single static board for the PDF guide (same look as the videos). */
export type DiagramProps = {
  fen: string;
  orientation: Color;
  /** Arrow marks like "g:e2e4" (drawn fully, no animation). */
  arrows?: string[];
  lastMove?: { from: string; to: string; classification?: Classification | null } | null;
  /** Show the "#" / crown badges when the position is checkmate. */
  mate?: boolean;
};

export const DIAGRAM_SIZE = 900;

export const Diagram: React.FC<DiagramProps> = ({ fen, orientation, arrows = [], lastMove = null, mate = false }) => {
  const loser = sideToMove(fen);
  const mateInfo = mate
    ? { loserKing: kingSquare(fen, loser)!, winnerKing: kingSquare(fen, loser === "w" ? "b" : "w")!, appearAt: -30 }
    : null;
  return (
    <AbsoluteFill style={{ background: "#ffffff" }}>
      <Board
        size={DIAGRAM_SIZE}
        orientation={orientation}
        fen={fen}
        lastMove={lastMove ? { ...lastMove, badgeAt: -30 } : null}
        arrows={arrows.map((mark) => ({ mark, appearAt: -30 }))}
        checkSquare={!mate && isCheck(fen) ? kingSquare(fen, loser) : null}
        mate={mateInfo}
      />
    </AbsoluteFill>
  );
};
