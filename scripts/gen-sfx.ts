/**
 * Generates the UI sound effects in public/sfx procedurally (whoosh, pop, impact).
 * The chess move sounds are recordings (public/sfx/SOURCES.md) and are not touched here.  npx tsx scripts/gen-sfx.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "sfx");
const SR = 44100;

let seed = 1;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;

const writeWav = (name: string, samples: Float32Array) => {
  const peak = samples.reduce((m, v) => Math.max(m, Math.abs(v)), 0) || 1;
  const data = Buffer.alloc(samples.length * 2);
  samples.forEach((v, i) => data.writeInt16LE(Math.round((v / peak) * 0.85 * 32767), i * 2));
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SR, 24);
  header.writeUInt32LE(SR * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);
  fs.writeFileSync(path.join(outDir, name), Buffer.concat([header, data]));
};

const make = (seconds: number, fn: (t: number, i: number) => number) => {
  const out = new Float32Array(Math.round(seconds * SR));
  for (let i = 0; i < out.length; i++) out[i] = fn(i / SR, i);
  return out;
};

fs.mkdirSync(outDir, { recursive: true });

// move / capture / check / castle / mate are real recordings, not generated: see public/sfx/SOURCES.md.

// Whoosh: noise with a moving band-pass.
{
  let a = 0, b = 0;
  writeWav("whoosh.wav", make(0.5, (t) => {
    const f = 0.02 + 0.25 * Math.sin(Math.PI * Math.min(1, t / 0.5));
    a += f * (rand() - a);
    b += f * (a - b);
    return (a - b) * Math.sin(Math.PI * Math.min(1, t / 0.5));
  }));
}

writeWav("pop.wav", make(0.14, (t) => Math.sin(2 * Math.PI * (500 + 1400 * Math.exp(-t * 40)) * t) * Math.exp(-t * 30)));

// Impact for the hook: low thump + noise burst.
{
  let lp = 0;
  writeWav("impact.wav", make(0.7, (t) => {
    lp += 0.08 * (rand() - lp);
    return 1.2 * Math.sin(2 * Math.PI * (55 + 90 * Math.exp(-t * 18)) * t) * Math.exp(-t * 5) + 2.5 * lp * Math.exp(-t * 12);
  }));
}

console.log("Wrote", fs.readdirSync(outDir).join(", "));
