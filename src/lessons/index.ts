import type { Band, Lesson } from "../types";
import { backRankMate, foolsMate, scholarsMate } from "./band-0-300";
import { blackburneShilling, legalsMate, staffordTrap } from "./band-300-600";
import { elephantTrap, englundTrap, kieningerTrap } from "./band-600-900";
import { fishingPoleTrap, laskerTrap, siberianTrap } from "./band-900-1500";

export const LESSONS: Lesson[] = [
  scholarsMate,
  foolsMate,
  backRankMate,
  legalsMate,
  blackburneShilling,
  staffordTrap,
  englundTrap,
  elephantTrap,
  kieningerTrap,
  laskerTrap,
  fishingPoleTrap,
  siberianTrap,
];

export const BANDS: Band[] = ["0-300", "300-600", "600-900", "900-1500"];

export const getLesson = (id: string): Lesson => {
  const lesson = LESSONS.find((l) => l.id === id);
  if (!lesson) throw new Error(`Unknown lesson: ${id}`);
  return lesson;
};

/** Composition id, e.g. "elo-0-300-scholars-mate". */
export const compositionId = (lesson: Lesson) => `elo-${lesson.band}-${lesson.id}`;
