/**
 * Renders the videos to out/<band>/<lesson>.mp4
 *
 *   npm run render                      # everything
 *   npm run render -- 0-300             # one Elo band
 *   npm run render -- scholars-mate     # one lesson
 *
 * Set REMOTION_BROWSER_EXECUTABLE to use an existing Chrome/Chromium.
 */
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { LESSONS, compositionId } from "../src/lessons/index.ts";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const filters = process.argv.slice(2);
const lessons = LESSONS.filter((l) => !filters.length || filters.includes(l.band) || filters.includes(l.id));
if (!lessons.length) {
  console.error(`Nothing matches ${filters.join(", ")}`);
  process.exit(1);
}

const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? null;

const main = async () => {
  console.log("Bundling…");
  const serveUrl = await bundle({ entryPoint: path.join(root, "src", "index.ts"), publicDir: path.join(root, "public") });
  for (const lesson of lessons) {
    const id = compositionId(lesson);
    const inputProps = { lessonId: lesson.id };
    const composition = await selectComposition({ serveUrl, id, inputProps, browserExecutable });
    const outputLocation = path.join(root, "out", lesson.band, `${lesson.id}.mp4`);
    fs.mkdirSync(path.dirname(outputLocation), { recursive: true });
    let last = -1;
    await renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      crf: 18,
      outputLocation,
      inputProps,
      browserExecutable,
      onProgress: ({ progress }) => {
        const pct = Math.floor(progress * 10) * 10;
        if (pct !== last) {
          last = pct;
          process.stdout.write(`\r${id}: ${pct}%   `);
        }
      },
    });
    console.log(`\r✓ ${path.relative(root, outputLocation)}            `);
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
