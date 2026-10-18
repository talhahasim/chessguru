import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { compositionId } from "../src/lessons/index.ts";
import type { Lesson } from "../src/types.ts";

export const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? null;

let serveUrl: string | null = null;
const getServeUrl = async () => {
  if (!serveUrl) {
    console.log("Bundling…");
    serveUrl = await bundle({ entryPoint: path.join(root, "src", "index.ts"), publicDir: path.join(root, "public") });
  }
  return serveUrl;
};

/** Renders out/<band>/<lesson>.mp4 and out/<band>/<lesson>-cover.jpg (frame 0 = the hook cover). */
export const renderLesson = async (lesson: Lesson) => {
  const url = await getServeUrl();
  const id = compositionId(lesson);
  const inputProps = { lessonId: lesson.id };
  const composition = await selectComposition({ serveUrl: url, id, inputProps, browserExecutable });
  const video = path.join(root, "out", lesson.band, `${lesson.id}.mp4`);
  const cover = video.replace(/\.mp4$/, "-cover.jpg");
  fs.mkdirSync(path.dirname(video), { recursive: true });
  let last = -1;
  await renderMedia({
    composition,
    serveUrl: url,
    codec: "h264",
    crf: 18,
    // Standard limited-range yuv420p + BT.709 so iPhones (Photos/Files) and Instagram play it everywhere.
    pixelFormat: "yuv420p",
    colorSpace: "bt709",
    outputLocation: video,
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
  await renderStill({ composition, serveUrl: url, frame: 0, output: cover, imageFormat: "jpeg", jpegQuality: 95, inputProps, browserExecutable });
  console.log(`\r✓ ${path.relative(root, video)} + cover            `);
  return { video, cover };
};
