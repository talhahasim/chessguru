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
import { classify } from "../src/lib/evals.ts";
import { replayLesson } from "../src/lib/line.ts";
import { buildTimeline, FPS } from "../src/lib/timeline.ts";
import { parseMark } from "../src/theme.ts";
import { narrationSegments } from "../src/lib/narration.ts";
import { voiceClipsFor } from "../src/lib/voice.ts";
import analysis from "../src/data/analysis.json" with { type: "json" };
import type { AnalysisFile } from "../src/types.ts";

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
  if (lesson.kind === "quiz") {
    const last = line.moves.at(-1);
    if (!lesson.answer) err(lesson.id, "quiz without an answer");
    else if (last && data.fresh) {
      const cls = data.classes[last.ply - 1];
      const best = a.lessons[lesson.id].positions[last.ply - 1].best;
      if (lesson.answer === "blunder" && cls !== "blunder")
        err(lesson.id, `answer is blunder but Stockfish calls ${last.move.san} ${cls}`);
      if (lesson.answer === "brilliant") {
        const after = new Chess(line.fens[last.ply]);
        const canTake = after.moves({ verbose: true }).some((mv) => mv.to === last.move.to && mv.captured);
        if (best !== last.move.lan) err(lesson.id, `answer is brilliant but ${last.move.san} is not Stockfish's best move (${best})`);
        if (!canTake) err(lesson.id, `answer is brilliant but ${last.move.san} sacrifices nothing (the piece can't be taken)`);
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
