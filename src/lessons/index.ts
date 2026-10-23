import type { Band, Lesson } from "../types";
import { backRankMate, foolsMate, scholarsMate } from "./band-0-300";
import { blackburneShilling, legalsMate, staffordTrap } from "./band-300-600";
import { elephantTrap, englundTrap, kieningerTrap } from "./band-600-900";
import { fishingPoleTrap, laskerTrap, siberianTrap } from "./band-900-1500";
import {
  avoidFoolsMate,
  beatBlackburneShilling,
  beatEnglund,
  beatStafford,
  dodgeElephantTrap,
  dodgeFishingPole,
  dodgeKieningerTrap,
  dodgeLaskerTrap,
  dodgeSiberianTrap,
  stopBackRankMate,
  stopLegalsMate,
  stopScholarsMate,
} from "./defenses";
import { QUIZZES } from "./quizzes";

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
  // "How to stop it" videos
  stopScholarsMate,
  avoidFoolsMate,
  stopBackRankMate,
  stopLegalsMate,
  beatBlackburneShilling,
  beatStafford,
  beatEnglund,
  dodgeElephantTrap,
  dodgeKieningerTrap,
  dodgeLaskerTrap,
  dodgeFishingPole,
  dodgeSiberianTrap,
  // "Brilliant or blunder?" quizzes
  ...QUIZZES,
];

export const BANDS: Band[] = ["0-300", "300-600", "600-900", "900-1500"];

export const getLesson = (id: string): Lesson => {
  const lesson = LESSONS.find((l) => l.id === id);
  if (!lesson) throw new Error(`Unknown lesson: ${id}`);
  return lesson;
};

/** Composition id, e.g. "elo-0-300-scholars-mate". */
export const compositionId = (lesson: Lesson) => `elo-${lesson.band}-${lesson.id}`;

export const isDefense = (lesson: Lesson) => lesson.kind === "defense";
export const isQuiz = (lesson: Lesson) => lesson.kind === "quiz";

/** The defense video that answers a trap, if there is one. */
export const defenseOf = (trap: Lesson) => LESSONS.find((l) => l.defends === trap.id) ?? null;
