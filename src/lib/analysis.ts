import analysisJson from "../data/analysis.json";
import type { AnalysisFile, Classification, Lesson, WhiteEval } from "../types";
import { classify } from "./evals";
import type { ReplayedLine } from "./line";

const analysis = analysisJson as unknown as AnalysisFile;

export const ENGINE_NAME = analysis.engine;

export type LessonEngineData = {
  /** evals[i] = evaluation after i plies. */
  evals: WhiteEval[];
  /** classes[i] = classification of ply i+1. */
  classes: (Classification | null)[];
  bestSan: (string | null)[];
  fresh: boolean;
};

export const engineDataFor = (lesson: Lesson, line: ReplayedLine): LessonEngineData => {
  const a = analysis.lessons[lesson.id];
  const fresh = !!a && a.line === line.fingerprint && a.positions.length === line.fens.length;
  const evals: WhiteEval[] = line.fens.map((_, i) => (fresh ? a.positions[i].eval : { type: "cp", value: 0 }));

  // Badge overrides apply to the last move of a step.
  const overrides = new Map<number, Classification>();
  for (const m of line.moves) {
    const step = lesson.steps[m.stepIndex];
    const lastOfStep = line.moves.filter((x) => x.stepIndex === m.stepIndex).at(-1);
    if (step.badge && lastOfStep?.ply === m.ply) overrides.set(m.ply, step.badge);
  }

  const classes = line.moves.map((m) => {
    if (overrides.has(m.ply)) return overrides.get(m.ply)!;
    if (!fresh) return m.ply <= (lesson.bookPlies ?? 0) ? "book" : null;
    return classify({
      before: evals[m.ply - 1],
      after: evals[m.ply],
      mover: m.move.color,
      playedUci: m.move.lan,
      bestUci: a.positions[m.ply - 1].best,
      isBook: m.ply <= (lesson.bookPlies ?? 0),
    });
  });
  return { evals, classes, bestSan: fresh ? a.positions.map((p) => p.bestSan) : [], fresh };
};
