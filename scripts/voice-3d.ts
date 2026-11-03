/**
 * Voiceover for the 3D preview with the same Kokoro voice as the normal videos (src/data/voice.json):
 * writes public/voice/preview-3d-legal/*.mp3 + src/data/voice-3d.json (clip lengths drive the 3D timeline).
 *
 *   npx tsx scripts/voice-3d.ts
 */
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spokenize } from "../src/lib/narration.ts";
import { NARRATION_3D } from "../src/three/narration3d.ts";
import voiceData from "../src/data/voice.json" with { type: "json" };

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, "src", "data", "voice-3d.json");
const dir = "voice/preview-3d-legal";
const { voice, speed } = voiceData;

const clips: Record<string, { text: string; file: string; seconds: number }> = {};
const jobs = NARRATION_3D.map((l) => {
  const text = spokenize(l.caption.replace("@checksmatedaily", "checks mate daily"));
  const hash = crypto.createHash("sha1").update(`${voice}|${speed}|${text}`).digest("hex").slice(0, 8);
  return { key: l.key, text, file: `${dir}/${l.key}-${hash}.mp3` };
});

fs.rmSync(path.join(root, "public", dir), { recursive: true, force: true });
const proc = spawn(path.join(root, ".venv", "bin", "python"), [path.join(root, "scripts", "tts.py")], { stdio: ["pipe", "pipe", "inherit"] });
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
    clips[job.key] = { text: job.text, file: job.file, seconds: res.seconds };
    console.log(`  ${job.key}: ${res.seconds}s  "${job.text}"`);
  }
});
proc.on("close", (code) => {
  if (code !== 0) process.exit(code ?? 1);
  fs.writeFileSync(out, JSON.stringify({ voice, speed, clips }, null, 1) + "\n");
  console.log(`Wrote ${path.relative(root, out)}`);
});
for (const j of jobs) proc.stdin.write(JSON.stringify({ text: j.text, voice, speed, out: path.join(root, "public", j.file) }) + "\n");
proc.stdin.end();
