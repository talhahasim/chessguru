/**
 * Sanity checks for every lesson:
 *  - all moves are legal (chess.js)
 *  - arrows / squares / pulses use valid squares
 *  - Stockfish analysis exists and matches the current move list
 *  - lines advertised as checkmate really end in checkmate
 *  - "brilliant"/"great" overrides are not on moves the engine considers bad
 *
 *   npm run validate
 */
import { Chess } from "chess.js";
import { LESSONS, compositionId } from "../src/lessons/index.ts";
import { engineDataFor } from "../src/lib/analysis.ts";
import { classify, whiteWinPercent } from "../src/lib/evals.ts";
import { replayLesson } from "../src/lib/line.ts";
import { buildTimeline, FPS } from "../src/lib/timeline.ts";
import { parseMark } from "../src/theme.ts";
import { narrationSegments } from "../src/lib/narration.ts";
import { voiceClipsFor } from "../src/lib/voice.ts";
import analysis from "../src/data/analysis.json" with { type: "json" };
import type { AnalysisFile, WhiteEval } from "../src/types.ts";

const VALUE: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
/** Most material the side to move can win with one capture, minus the capturer when it can be taken back. */
const sacrificeGain = (fen: string) => {
  const c = new Chess(fen);
  let gain = 0;
  for (const mv of c.moves({ verbose: true })) {
    if (!mv.captured) continue;
    const t = new Chess(fen);
    t.move(mv);
    const retake = t.moves({ verbose: true }).some((r) => r.to === mv.to && r.captured);
    gain = Math.max(gain, VALUE[mv.captured] - (retake ? VALUE[mv.piece] : 0));
  }
  return gain;
};

const a = analysis as unknown as AnalysisFile;
let errors = 0;
let warnings = 0;
const err = (id: string, msg: string) => {
  errors++;
  console.log(`  ✗ [${id}] ${msg}`);
};
const warn = (id: string, msg: string) => {
  warnings++;
  console.log(`  ! [${id}] ${msg}`);
};

const ids = new Set<string>();
for (const lesson of LESSONS) {
  if (ids.has(lesson.id)) err(lesson.id, "duplicate id");
  ids.add(lesson.id);
  let line;
  try {
    line = replayLesson(lesson);
  } catch (e) {
    err(lesson.id, (e as Error).message);
    continue;
  }
  for (const [i, step] of lesson.steps.entries()) {
    for (const m of [...(step.arrows ?? []), ...(step.squares ?? [])]) {
      try {
        parseMark(m);
      } catch (e) {
        err(lesson.id, `step ${i + 1}: ${(e as Error).message}`);
      }
    }
    for (const sq of step.pulse ?? []) if (!/^[a-h][1-8]$/.test(sq)) err(lesson.id, `step ${i + 1}: bad pulse square ${sq}`);
    if (step.badge && !step.moves?.length) err(lesson.id, `step ${i + 1}: badge without a move`);
  }
  // Frame 0 is the cover (see CLAUDE.md): each hook line must fit in 2 rows to stay inside Instagram's 3:4 grid crop.
  lesson.hook.forEach((h, i) => {
    const chars = h.replace(/\*/g, "").length;
    if (chars > 44) err(lesson.id, `hook line ${i + 1} is ${chars} chars; keep it ≤ 44 so the cover stays inside the 3:4 safe area`);
  });

  const data = engineDataFor(lesson, line);
  if (!data.fresh) err(lesson.id, "Stockfish analysis missing or stale. Run: npm run analyze");
  else {
    const pos = a.lessons[lesson.id].positions;
    for (const m of line.moves) {
      const badge = lesson.steps[m.stepIndex].badge;
      if (badge !== "brilliant" && badge !== "great") continue;
      const engineClass = classify({
        before: data.evals[m.ply - 1],
        after: data.evals[m.ply],
        mover: m.move.color,
        playedUci: m.move.lan,
        bestUci: pos[m.ply - 1].best,
        isBook: false,
      });
      if (!["best", "excellent", "good"].includes(engineClass))
        warn(lesson.id, `${m.move.san} is marked ${badge} but Stockfish calls it ${engineClass}`);
    }
  }
  // Quizzes: the hidden answer must be honest, or the comment replies would tell people the wrong thing.
  // A quiz move must be clearly one or the other, never just a "best" or "mistake" move.
  if (lesson.kind === "quiz") {
    const last = line.moves.at(-1);
    if (!lesson.answer) err(lesson.id, "quiz without an answer");
    else if (last && data.fresh) {
      const cls = data.classes[last.ply - 1];
      const pos = a.lessons[lesson.id].positions;
      const mover = last.move.color;
      const pov = (e: WhiteEval) => (mover === "w" ? whiteWinPercent(e) : 100 - whiteWinPercent(e));
      const cpFor = (e: WhiteEval) => (e.type === "cp" ? (mover === "w" ? e.value : -e.value) : null);
      if (lesson.answer === "blunder") {
        const after = pos[last.ply].eval;
        if (cls !== "blunder") err(lesson.id, `answer is blunder but Stockfish calls ${last.move.san} ${cls}`);
        // Losing at least ~2 pawns (or getting mated), so nobody can argue it is "only a mistake".
        else if (pov(after) > 25) err(lesson.id, `answer is blunder but ${last.move.san} still leaves the mover ok (${(pov(after)).toFixed(0)}% win chance)`);
      }
      if (lesson.answer === "brilliant") {
        const best = pos[last.ply - 1].best;
        const alt = a.lessons[lesson.id].quizAlt;
        if (best !== last.move.lan) err(lesson.id, `answer is brilliant but ${last.move.san} is not Stockfish's best move (${best})`);
        if (sacrificeGain(line.fens[last.ply]) < 2)
          err(lesson.id, `answer is brilliant but ${last.move.san} sacrifices nothing (no piece can be won by capturing)`);
        // chess.com-style rule: not brilliant if another move also wins clearly (+2 or a forced mate).
        if (!alt) err(lesson.id, "no second-best eval for the brilliant check. Run: npm run analyze");
        else if (alt.type !== "cp" || (cpFor(alt) ?? 0) >= 200)
          err(lesson.id, `answer is brilliant but ${last.move.san} is not the only way to win (best other move: ${alt.type === "cp" ? (cpFor(alt)! / 100).toFixed(2) : alt.type === "mate" ? `M${alt.value}` : "mate"})`);
      }
    }
  }
  const clips = voiceClipsFor(lesson);
  const missingVoice = narrationSegments(lesson).filter((seg) => !clips.has(seg.key));
  if (missingVoice.length) err(lesson.id, `voiceover missing or stale for ${missingVoice.map((m) => m.key).join(", ")}. Run: npm run voice`);
  const tl = buildTimeline(lesson);
  const secs = tl.duration / FPS;
  if (secs > 90) warn(lesson.id, `video is ${secs.toFixed(0)}s long (Shorts work best under 60-90s)`);
  const review = line.moves
    .map((m, i) => (data.classes[i] === "book" ? null : `${m.move.san}:${data.classes[i] ?? "?"}`))
    .filter(Boolean)
    .join(" ");
  console.log(`✓ ${compositionId(lesson)}  ${line.moves.length} plies  ${secs.toFixed(1)}s\n    ${review}`);
}
console.log(`\n${LESSONS.length} lessons, ${errors} errors, ${warnings} warnings (engine: ${a.engine}, depth ${a.depth})`);
process.exit(errors ? 1 : 0);
