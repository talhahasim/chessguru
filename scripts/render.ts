/**
 * Renders the videos to out/<band>/<lesson>.mp4 plus a cover image
 * out/<band>/<lesson>-cover.jpg (frame 0 = the hook, laid out for Instagram's 3:4 grid crop).
 *
 *   npm run render                      # everything
 *   npm run render -- 0-300             # one Elo band
 *   npm run render -- scholars-mate     # one lesson
 *
 * Set REMOTION_BROWSER_EXECUTABLE to use an existing Chrome/Chromium.
 */
import { LESSONS } from "../src/lessons/index.ts";
import { renderLesson } from "./render-lib.ts";

const filters = process.argv.slice(2);
const lessons = LESSONS.filter((l) => !filters.length || filters.includes(l.band) || filters.includes(l.id));
if (!lessons.length) {
  console.error(`Nothing matches ${filters.join(", ")}`);
  process.exit(1);
}

const main = async () => {
  for (const lesson of lessons) await renderLesson(lesson);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
