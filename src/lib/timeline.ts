import type { Lesson } from "../types";
import { replayLesson, type PlayedMove, type ReplayedLine } from "./line";

export const FPS = 30;

export const T = {
  hook: 96,
  intro: 42,
  move: 13, // frames a piece takes to slide
  quickGap: 7, // pause between quickly played moves in one step
  afterMove: 4, // delay before arrows / badge appear
  finale: 78,
  outro: 165,
};

const wordCount = (s: string) => s.replace(/\*/g, "").split(/\s+/).filter(Boolean).length;

/** Frames needed to comfortably read a caption. */
export const readingFrames = (say: string) => Math.round(Math.max(1.9, wordCount(say) / 2.7 + 0.9) * FPS);

export type MoveEvent = PlayedMove & { start: number; end: number };

export type StepEvent = {
  index: number;
  start: number;
  end: number;
  /** Frame at which the step's moves have landed and markup appears. */
  settled: number;
  moves: MoveEvent[];
  /** Number of plies played once this step's moves landed. */
  plyAfter: number;
};

export type Timeline = {
  line: ReplayedLine;
  hook: { start: number; end: number };
  intro: { start: number; end: number };
  steps: StepEvent[];
  moves: MoveEvent[];
  finale: { start: number; end: number };
  outro: { start: number; end: number };
  duration: number;
};

export const buildTimeline = (lesson: Lesson): Timeline => {
  const line = replayLesson(lesson);
  let t = 0;
  const hook = { start: t, end: (t += T.hook) };
  const intro = { start: t, end: (t += T.intro) };
  const steps: StepEvent[] = [];
  const moves: MoveEvent[] = [];
  let ply = 0;
  lesson.steps.forEach((step, index) => {
    const start = t;
    const stepMoves: MoveEvent[] = [];
    (step.moves ?? []).forEach((_, i, arr) => {
      const played = line.moves[ply++];
      const ev = { ...played, start: t, end: t + T.move };
      stepMoves.push(ev);
      moves.push(ev);
      t += T.move + (i < arr.length - 1 ? T.quickGap : 0);
    });
    const settled = t + (stepMoves.length ? T.afterMove : 0);
    t = settled + readingFrames(step.say) + Math.round((step.extraHold ?? 0) * FPS);
    steps.push({ index, start, end: t, settled, moves: stepMoves, plyAfter: ply });
  });
  const finale = { start: t, end: (t += T.finale) };
  const outro = { start: t, end: (t += T.outro) };
  return { line, hook, intro, steps, moves, finale, outro, duration: t };
};

/** Board state at a frame: how many plies are complete, and the move currently sliding (if any). */
export const boardStateAt = (tl: Timeline, frame: number) => {
  if (frame < tl.intro.start) {
    // Hook shows the final position.
    return { ply: tl.line.moves.length, animating: null as MoveEvent | null, progress: 1 };
  }
  let ply = 0;
  for (const m of tl.moves) {
    if (frame >= m.end) {
      ply = m.ply;
      continue;
    }
    if (frame >= m.start) return { ply: m.ply - 1, animating: m, progress: (frame - m.start) / (m.end - m.start) };
    break;
  }
  return { ply, animating: null as MoveEvent | null, progress: 1 };
};

export const stepAt = (tl: Timeline, frame: number) => tl.steps.find((s) => frame >= s.start && frame < s.end) ?? null;
