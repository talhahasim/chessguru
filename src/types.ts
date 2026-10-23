export type Color = "w" | "b";

export type Band = "0-300" | "300-600" | "600-900" | "900-1500";

/** chess.com-style move classifications. */
export type Classification =
  | "brilliant"
  | "great"
  | "best"
  | "excellent"
  | "good"
  | "book"
  | "inaccuracy"
  | "mistake"
  | "blunder"
  | "miss";

/**
 * Arrow / square markup. Optional colour prefix:
 *   "e2e4"   -> orange arrow (chess.com default)
 *   "g:e2e4" -> green, "r:" red, "b:" blue, "y:" yellow
 * Squares use the same prefix: "r:f7".
 */
export type Mark = string;

export type Step = {
  /** Moves (SAN) played at the start of this step. Several moves are played quickly one after another. */
  moves?: string[];
  /** What the narrator says. Wrap words in *stars* to highlight them. Keep it short and simple. */
  say: string;
  /** Arrows drawn after the moves land. */
  arrows?: Mark[];
  /** Coloured squares drawn after the moves land. */
  squares?: Mark[];
  /** Squares that get a pulsing ring to grab attention. */
  pulse?: string[];
  /** Override the Stockfish classification of the last move of this step (e.g. "brilliant"). */
  badge?: Classification;
  /** Optional different text for the voiceover (defaults to `say`). */
  voice?: string;
  /** Extra seconds to hold this step on screen. */
  extraHold?: number;
};

export type Lesson = {
  id: string;
  /**
   * "trap" (default): we set the trap. "defense": we are the target and dodge/punish it.
   * "quiz": "Brilliant or blunder?" – the last move is the question; the video never reveals the answer.
   */
  kind?: "trap" | "defense" | "quiz";
  /** For quiz lessons: the honest (Stockfish-checked) answer for the last move. Never shown in the video. */
  answer?: "brilliant" | "blunder";
  /** For defense lessons: id of the trap lesson it answers. */
  defends?: string;
  band: Band;
  title: string;
  /** Side we are teaching. The board is shown from this side. */
  hero: Color;
  startFen?: string;
  /** Number of opening plies that get a "book" badge. */
  bookPlies?: number;
  /** Two hook lines shown in the first seconds. *stars* highlight words. */
  hook: [string, string];
  steps: Step[];
  /** 2-3 super simple lines shown at the end. */
  takeaways: string[];
};

/** Engine evaluation from White's point of view. */
export type WhiteEval =
  | { type: "cp"; value: number }
  | { type: "mate"; value: number }
  | { type: "mated"; loser: Color };

export type PositionAnalysis = {
  fen: string;
  eval: WhiteEval;
  /** Engine best move in this position (UCI), null if the game is over. */
  best: string | null;
  bestSan: string | null;
  depth: number;
};

export type LessonAnalysis = {
  /** Fingerprint of the analysed line, used to detect stale analysis. */
  line: string;
  positions: PositionAnalysis[];
};

export type AnalysisFile = {
  engine: string;
  depth: number;
  lessons: Record<string, LessonAnalysis>;
};

export type VoiceClip = {
  /** Text that was spoken (used to detect stale audio). */
  text: string;
  /** File inside public/, e.g. "voice/scholars-mate/step-0-1a2b3c4d.mp3". */
  file: string;
  seconds: number;
};

export type VoiceFile = {
  engine: string;
  voice: string;
  speed: number;
  lessons: Record<string, Record<string, VoiceClip>>;
};
