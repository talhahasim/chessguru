/**
 * Runs Stockfish over every position of every lesson and writes
 * src/data/analysis.json (eval bar values, best moves, move classifications).
 *
 *   npm run analyze                 # all lessons, depth 20
 *   npm run analyze -- --depth 24   # deeper
 *   npm run analyze -- scholars-mate fools-mate
 *   npm run analyze -- --force      # re-analyse even if up to date
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Chess } from "chess.js";
import { LESSONS } from "../src/lessons/index.ts";
import { replayLesson } from "../src/lib/line.ts";
import type { AnalysisFile, LessonAnalysis, WhiteEval } from "../src/types.ts";
import { Engine, type Score } from "./engine.ts";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outFile = path.join(root, "src", "data", "analysis.json");

const args = process.argv.slice(2);
const depthArg = args.indexOf("--depth");
const depth = depthArg >= 0 ? Number(args[depthArg + 1]) : 20;
const force = args.includes("--force");
const only = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--depth");

const existing: AnalysisFile = fs.existsSync(outFile)
  ? JSON.parse(fs.readFileSync(outFile, "utf8"))
  : { engine: "", depth, lessons: {} };

const toWhite = (score: Score, stm: "w" | "b"): WhiteEval => {
  const sign = stm === "w" ? 1 : -1;
  return "mate" in score ? { type: "mate", value: score.mate * sign } : { type: "cp", value: score.cp * sign };
};

const uciToSan = (fen: string, uci: string | null) => {
  if (!uci) return null;
  try {
    return new Chess(fen).move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] }).san;
  } catch {
    return null;
  }
};

const main = async () => {
  const engine = new Engine();
  await engine.init({ Hash: 128, Threads: 1, MultiPV: 1 });
  console.log(`Engine: ${engine.name}  depth ${depth}`);

  const result: AnalysisFile = { engine: engine.name, depth, lessons: { ...existing.lessons } };

  for (const lesson of LESSONS) {
    if (only.length && !only.includes(lesson.id)) continue;
    const line = replayLesson(lesson);
    const prev = existing.lessons[lesson.id];
    if (!force && prev && prev.line === line.fingerprint && existing.depth >= depth) {
      console.log(`✓ ${lesson.id} (up to date)`);
      continue;
    }
    await engine.newGame();
    const positions: LessonAnalysis["positions"] = [];
    for (const fen of line.fens) {
      const chess = new Chess(fen);
      const stm = chess.turn();
      if (chess.isCheckmate()) {
        positions.push({ fen, eval: { type: "mated", loser: stm }, best: null, bestSan: null, depth: 0 });
        continue;
      }
      if (chess.isGameOver()) {
        positions.push({ fen, eval: { type: "cp", value: 0 }, best: null, bestSan: null, depth: 0 });
        continue;
      }
      const r = await engine.analyse(fen, { depth });
      positions.push({ fen, eval: toWhite(r.score, stm), best: r.bestMove, bestSan: uciToSan(fen, r.bestMove), depth: r.depth });
    }
    result.lessons[lesson.id] = { line: line.fingerprint, positions };
    const evs = positions.map((p) => (p.eval.type === "cp" ? (p.eval.value / 100).toFixed(1) : p.eval.type === "mate" ? `M${p.eval.value}` : "#"));
    console.log(`✓ ${lesson.id}: ${evs.join(" ")}`);
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(result, null, 1) + "\n");
  console.log(`Wrote ${path.relative(root, outFile)}`);
  engine.quit();
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
