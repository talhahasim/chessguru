import type { Lesson } from "../types";
import { replayLesson, type PlayedMove, type ReplayedLine } from "./line";
import { voiceClipsFor } from "./voice";

export const FPS = 30;

export const T = {
  hook: 96,
  move: 11, // frames a piece takes to slide
  quickGap: 4, // pause between quickly played moves in one step
  afterMove: 4, // delay before arrows / badge appear
  outro: 165,
  voiceLead: 3, // frames between a segment starting and its voice starting
  voiceTail: 12, // breathing room after a voice clip before the next segment
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

/** A voice clip placed on the timeline. */
export type VoiceCue = { key: string; file: string; from: number; frames: number };

export type Timeline = {
  line: ReplayedLine;
  hook: { start: number; end: number };
  intro: { start: number; end: number };
  steps: StepEvent[];
  moves: MoveEvent[];
  outro: { start: number; end: number };
  /** When the outro's "REMEMBER" title, each takeaway and the follow button appear. */
  outroCues: { remember: number; takeaways: number[]; cta: number };
  voice: VoiceCue[];
  duration: number;
};

export const buildTimeline = (lesson: Lesson): Timeline => {
  const line = replayLesson(lesson);
  const clips = voiceClipsFor(lesson);
  const voice: VoiceCue[] = [];
  /** Places a clip at `from` and returns the frame where it has finished (+ tail), or `from` if there is none. */
  const say = (key: string, from: number) => {
    const c = clips.get(key);
    if (!c) return from;
    const frames = Math.ceil(c.seconds * FPS);
    voice.push({ key, file: c.file, from, frames });
    return from + frames + T.voiceTail;
  };

  let t = 0;
  const hookEnd = Math.max(T.hook, say("hook", 2));
  const hook = { start: t, end: (t = hookEnd) };
  // No title card: the hook goes straight into the moves (viewers dropped off here).
  const intro = { start: t, end: t };
  const steps: StepEvent[] = [];
  const moves: MoveEvent[] = [];
  let ply = 0;
  lesson.steps.forEach((step, index) => {
    const start = t;
    const voiceDone = say(`step-${index}`, start + T.voiceLead);
    const stepMoves: MoveEvent[] = [];
    (step.moves ?? []).forEach((_, i, arr) => {
      const played = line.moves[ply++];
      const ev = { ...played, start: t, end: t + T.move };
      stepMoves.push(ev);
      moves.push(ev);
      t += T.move + (i < arr.length - 1 ? T.quickGap : 0);
    });
    const settled = t + (stepMoves.length ? T.afterMove : 0);
    const minEnd = settled + (clips.has(`step-${index}`) ? 20 : readingFrames(step.say));
    t = Math.max(minEnd, voiceDone) + Math.round((step.extraHold ?? 0) * FPS);
    steps.push({ index, start, end: t, settled, moves: stepMoves, plyAfter: ply });
  });
  // No end banner: after the last step (e.g. "...Checkmate!") the video goes straight to the recap.
  // Outro: the takeaways pop in quickly (on screen only) while the CTA is spoken, then the follow button.
  // (Speaking every takeaway made the outro ~30% of the video and viewers left.)
  const outroStart = t;
  const remember = outroStart + 6;
  const takeaways = lesson.takeaways.map((_, i) => remember + 8 + i * 8);
  const cta = takeaways[takeaways.length - 1] + 12;
  const ctaDone = say("cta", remember + 10);
  const outro = { start: outroStart, end: (t = Math.max(outroStart + 120, ctaDone + 20, cta + 60)) };
  return { line, hook, intro, steps, moves, outro, outroCues: { remember, takeaways, cta }, voice, duration: t };
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
