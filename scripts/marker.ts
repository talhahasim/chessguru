import { BAND_LABEL } from "../src/theme.ts";
import type { Lesson } from "../src/types.ts";

/**
 * Line that identifies a lesson in a caption; also used to detect what is already posted and which
 * Reels are quizzes. Don't change its format or old posts get reposted.
 */
export const marker = (lesson: Lesson) => `♟ ${lesson.title} | ${BAND_LABEL[lesson.band]} Elo`;
