import { getLesson } from "../src/lessons/index.ts";
import { buildTimeline } from "../src/lib/timeline.ts";
// Prints the frame timeline of a lesson (handy for `remotion still --frame=…`).
//   npx tsx scripts/timeline.ts scholars-mate
const tl = buildTimeline(getLesson(process.argv[2] ?? "scholars-mate"));
console.log(JSON.stringify({ hook: tl.hook, intro: tl.intro, steps: tl.steps.map((s) => [s.start, s.settled, s.end]), finale: tl.finale, outro: tl.outro }));
