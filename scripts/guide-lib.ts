import { Chess } from "chess.js";
import { defenseOf, getLesson } from "../src/lessons/index.ts";
import { GUIDE_TRAPS, VIDEO_TRAPS, type GuideTrap, type Level } from "../src/guide/traps.ts";
import { replayLesson } from "../src/lib/line.ts";

const LEVELS: Level[] = ["400–600", "600–800", "800–1000"];

/** A video lesson + its defense video in the guide's format. */
const fromLesson = (id: string): GuideTrap => {
  const meta = VIDEO_TRAPS[id];
  const lesson = getLesson(id);
  const line = replayLesson(lesson).moves.map((m) => m.move.san);
  const defense = defenseOf(lesson);
  if (!defense) throw new Error(`${id} has no defense lesson`);
  const dLine = replayLesson(defense).moves;
  let branch = 0;
  while (branch < line.length && dLine[branch]?.move.san === line[branch]) branch++;
  const keyStep = lesson.steps.findIndex((s) => s.badge === "brilliant" || s.badge === "great");
  const plyAfterStep = (i: number) => lesson.steps.slice(0, i + 1).reduce((n, s) => n + (s.moves?.length ?? 0), 0);
  // The defense video's text for the step where it leaves the trap line.
  const firstDefenseStep = (() => {
    let ply = 0;
    for (const s of defense.steps) {
      ply += s.moves?.length ?? 0;
      if (ply > branch) return s;
    }
    return defense.steps.at(-1)!;
  })();
  return {
    id,
    name: lesson.title,
    opening: meta.opening,
    level: meta.level,
    hero: lesson.hero,
    startFen: lesson.startFen,
    hook: `${lesson.hook[0]} ${lesson.hook[1]}`.replace(/\.\.\.\s*\.\.\./g, "... "),
    line,
    steps: lesson.steps.map((s) => ({ plies: s.moves?.length ?? 0, text: s.say })),
    keyPly: keyStep >= 0 ? plyAfterStep(keyStep) : line.length,
    mistakePly: meta.mistakePly ?? branch + 1,
    result: meta.result,
    remember: lesson.takeaways,
    defense: meta.defense ?? {
      branchPly: branch,
      moves: dLine.slice(branch).map((m) => m.move.san),
      text: firstDefenseStep.say,
      tips: defense.takeaways,
    },
  };
};

/** All 30 guide traps, easiest level first. */
export const guideTraps = (): GuideTrap[] => {
  const all = [...Object.keys(VIDEO_TRAPS).map(fromLesson), ...GUIDE_TRAPS];
  return LEVELS.flatMap((lv) => all.filter((t) => t.level === lv));
};

export type PlayedGuide = {
  trap: GuideTrap;
  /** fens[i] = position after i plies of the trap line. */
  fens: string[];
  sans: string[];
  moves: { from: string; to: string; san: string }[];
  defenseFens: string[];
  defenseMoves: { from: string; to: string; san: string }[];
};

/** Replays a guide trap (throws on illegal moves). */
export const playGuide = (trap: GuideTrap): PlayedGuide => {
  const c = trap.startFen ? new Chess(trap.startFen) : new Chess();
  const fens = [c.fen()];
  const moves: PlayedGuide["moves"] = [];
  for (const san of trap.line) {
    const m = c.move(san);
    moves.push({ from: m.from, to: m.to, san: m.san });
    fens.push(c.fen());
  }
  const d = new Chess(fens[trap.defense.branchPly]);
  const defenseFens = [d.fen()];
  const defenseMoves: PlayedGuide["moves"] = [];
  for (const san of trap.defense.moves) {
    const m = d.move(san);
    defenseMoves.push({ from: m.from, to: m.to, san: m.san });
    defenseFens.push(d.fen());
  }
  return { trap, fens, sans: moves.map((m) => m.san), moves, defenseFens, defenseMoves };
};
