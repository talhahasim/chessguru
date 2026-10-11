import voiceJson from "../data/voice.json";
import type { Lesson, VoiceFile } from "../types";
import type { ReplayedLine } from "./line";
import { narrationSegments, winnerOf } from "./narration";

const voiceData = voiceJson as unknown as VoiceFile;

export const VOICE_NAME = voiceData.voice;

export type Clip = { file: string; seconds: number };

/**
 * Voice clips of a lesson, keyed by narration segment ("hook", "step-3", …).
 * Clips whose text no longer matches the lesson are left out (run `npm run voice`).
 */
export const voiceClipsFor = (lesson: Lesson, line: ReplayedLine): Map<string, Clip> => {
  const clips = voiceData.lessons[lesson.id] ?? {};
  const map = new Map<string, Clip>();
  for (const seg of narrationSegments(lesson, winnerOf(lesson, line))) {
    const c = clips[seg.key];
    if (c && c.text === seg.text) map.set(seg.key, { file: c.file, seconds: c.seconds });
  }
  return map;
};
