import { GUIDE_CTA } from "../brand";
import { LESSONS } from "../lessons";
import type { Lesson } from "../types";

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

/** Every piece of narration in a video, in order. Keys are stable ids used by the timeline. */
export const narrationSegments = (lesson: Lesson): NarrationSegment[] => [
  { key: "hook", text: spokenize(`${lesson.hook[0]} ${lesson.hook[1]}`) },
  ...lesson.steps.map((step, i) => ({ key: `step-${i}`, text: spokenize(step.voice ?? step.say) })),
  {
    key: "cta",
    text:
      lesson.kind === "quiz"
        ? "Brilliant or blunder? Comment your answer. I reply to everyone!"
        : GUIDE_CTA
          ? lesson.kind === "defense"
            ? "Comment traps and I'll send you a free PDF with 30 traps and their defenses!"
            : "Comment traps and I'll send you a free PDF with 30 traps. The defense is in the next video!"
          : lesson.kind === "defense"
            ? "Send this to a friend before they fall for it. New trap tomorrow!"
            : LESSONS.some((l) => l.defends === lesson.id)
              ? "Send this to a friend who falls for it. The defense is in the next video. Follow!"
              : "Send this to a friend who falls for it. Follow for more traps!",
  },
];

