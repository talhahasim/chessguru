/**
 * Generates the English voiceover for every video with Kokoro TTS (free, runs locally)
 * and writes public/voice/<lesson>/*.mp3 + src/data/voice.json (clip durations for the timeline).
 *
 * One-time setup (Python 3.10+):
 *   python3 -m venv .venv && .venv/bin/pip install kokoro-onnx soundfile
 *   mkdir -p models && cd models
 *   curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
 *   curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
 *
 *   npm run voice                          # all lessons, only clips whose text changed
 *   npm run voice -- --voice am_michael    # switch voice (regenerates everything)
 *   npm run voice -- --speed 1.1           # talk faster
 *   npm run voice -- scholars-mate         # one lesson
 */
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LESSONS } from "../src/lessons/index.ts";
import { replayLesson } from "../src/lib/line.ts";
import { narrationSegments, winnerOf } from "../src/lib/narration.ts";
import type { VoiceFile } from "../src/types.ts";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const manifestPath = path.join(root, "src", "data", "voice.json");
const args = process.argv.slice(2);
const opt = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const only = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));

const manifest: VoiceFile = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : { engine: "Kokoro-82M v1.0 (kokoro-onnx)", voice: "af_heart", speed: 1.0, lessons: {} };
const voice = opt("voice") ?? manifest.voice;
const speed = Number(opt("speed") ?? manifest.speed);
manifest.voice = voice;
manifest.speed = speed;

type Job = { lesson: string; key: string; text: string; file: string };
const jobs: Job[] = [];
const keep = new Map<string, Set<string>>();

for (const lesson of LESSONS) {
  const line = replayLesson(lesson);
  const segments = narrationSegments(lesson, winnerOf(lesson, line));
  const clips = (manifest.lessons[lesson.id] ??= {});
  const files = new Set<string>();
  keep.set(lesson.id, files);
  for (const k of Object.keys(clips)) if (!segments.some((s) => s.key === k)) delete clips[k];
  for (const seg of segments) {
    const hash = crypto.createHash("sha1").update(`${voice}|${speed}|${seg.text}`).digest("hex").slice(0, 8);
    const file = `voice/${lesson.id}/${seg.key}-${hash}.mp3`;
    files.add(path.basename(file));
    const existing = clips[seg.key];
    const upToDate = existing && existing.file === file && fs.existsSync(path.join(root, "public", file));
    if (upToDate) continue;
    if (only.length && !only.includes(lesson.id)) continue;
    jobs.push({ lesson: lesson.id, key: seg.key, text: seg.text, file });
  }
}

const python = process.env.PYTHON ?? path.join(root, ".venv", "bin", "python");

const run = () =>
  new Promise<void>((resolve, reject) => {
    if (!jobs.length) return resolve();
    console.log(`Generating ${jobs.length} clips with voice "${voice}" (speed ${speed})…`);
    const proc = spawn(python, [path.join(root, "scripts", "tts.py")], { stdio: ["pipe", "pipe", "inherit"] });
    let buf = "";
    let done = 0;
    proc.stdout.setEncoding("utf8");
    proc.stdout.on("data", (chunk: string) => {
      buf += chunk;
      let i: number;
      while ((i = buf.indexOf("\n")) >= 0) {
        const res = JSON.parse(buf.slice(0, i));
        buf = buf.slice(i + 1);
        const job = jobs[done++];
        manifest.lessons[job.lesson][job.key] = { text: job.text, file: job.file, seconds: res.seconds };
        process.stdout.write(`\r  ${done}/${jobs.length}  ${job.lesson} ${job.key}                    `);
      }
    });
    proc.on("error", reject);
    proc.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`tts.py exited with ${code}`))));
    for (const j of jobs) proc.stdin.write(JSON.stringify({ text: j.text, voice, speed, out: path.join(root, "public", j.file) }) + "\n");
    proc.stdin.end();
  });

run()
  .then(() => {
    // Remove audio files that no longer belong to any clip.
    for (const [id, files] of keep) {
      const dir = path.join(root, "public", "voice", id);
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) if (!files.has(f)) fs.rmSync(path.join(dir, f));
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + "\n");
    console.log(`\nWrote ${path.relative(root, manifestPath)}`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
