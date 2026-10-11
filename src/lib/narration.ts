import type { Lesson } from "../types";
import { sideToMove, type ReplayedLine } from "./line";

export type NarrationSegment = { key: string; text: string };

const PIECES: Record<string, string> = { K: "king", Q: "queen", R: "rook", B: "bishop", N: "knight" };

/** Names the TTS tends to mispronounce, respelled phonetically. */
const PRONUNCIATION: [RegExp, string][] = [
  [/\bLégal's\b/g, "Lay-gahl's"],
  [/\bKieninger\b/g, "Kee-ning-er"],
  [/\bRuy Lopez\b/g, "Roo-ee Lopez"],
  [/\bElo\b/g, "Ee-low"],
];

/** Turns caption text into something a TTS reads naturally ("...Qe7" -> "queen e7", "*stars*" removed). */
export const spokenize = (text: string): string => {
  let s = text.replace(/\*/g, "");
  // Chess notation with a piece letter, a capture or a "..." prefix.
  s = s.replace(/(\.{3})?\b([KQRBN])?([a-h])?(x)?([a-h][1-8])(=[QRBN])?[+#]?/g, (m, dots, piece, _from, capture, sq, promo) => {
    if (!dots && !piece && !capture) return m;
    const parts = [piece ? PIECES[piece] : null, capture ? "takes" : null, sq, promo ? `promotes to ${PIECES[promo[1]]}` : null];
    return parts.filter(Boolean).join(" ");
  });
  s = s.replace(/\bO-O-O\b/g, "castles long").replace(/\bO-O\b/g, "castles");
  s = s.replace(/ \+ /g, " and ").replace(/ = /g, " means ");
  // ALL-CAPS words get spelled out by some voices; keep them as normal words.
  s = s.replace(/\b[A-Z]{3,}\b/g, (w) => w.toLowerCase());
  s = s.replace(/\bvs\b/g, "versus");
  for (const [re, rep] of PRONUNCIATION) s = s.replace(re, rep);
  s = s.replace(/\.\.\.\s*\.\.\./g, "... ").replace(/\s+/g, " ").trim();
  // Capitalise the start of the text and of each sentence.
  return s.replace(/(^|[.!?:]\s+)([a-z])/g, (_, a, b) => a + b.toUpperCase());
};

export const finaleText = (lesson: Lesson, winner: "White" | "Black") => {
  const banner = lesson.finale?.banner ?? "CHECKMATE!";
  const sub = lesson.finale?.sub ?? `${winner} wins`;
  const b = banner.charAt(0) + banner.slice(1).toLowerCase();
  return `${b} ${sub}.`;
};

/** Every piece of narration in a video, in order. Keys are stable ids used by the timeline. */
export const narrationSegments = (lesson: Lesson, winner: "White" | "Black"): NarrationSegment[] => [
  { key: "hook", text: spokenize(`${lesson.hook[0]} ${lesson.hook[1]}`) },
  { key: "intro", text: spokenize(`${lesson.title}!`) },
  ...lesson.steps.map((step, i) => ({ key: `step-${i}`, text: spokenize(step.voice ?? step.say) })),
  { key: "finale", text: spokenize(finaleText(lesson, winner)) },
  { key: "remember", text: "Remember!" },
  ...lesson.takeaways.map((t, i) => ({ key: `takeaway-${i}`, text: spokenize(t) })),
  { key: "cta", text: "Follow for more traps!" },
];

/** Who wins at the end of the lesson line. */
export const winnerOf = (lesson: Lesson, line: ReplayedLine): "White" | "Black" =>
  line.isMate ? (sideToMove(line.finalFen) === "w" ? "Black" : "White") : lesson.hero === "w" ? "White" : "Black";
