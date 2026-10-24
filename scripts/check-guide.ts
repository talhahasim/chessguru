/**
 * Checks every trap of the PDF guide with Stockfish: legal lines, the victim's mistake really loses,
 * the trap ends clearly winning, and the defensive move is (close to) the engine's best.
 *
 *   npx tsx scripts/check-guide.ts
 */
import { Chess } from "chess.js";
import { Engine } from "./engine.ts";
import { guideTraps, playGuide } from "./guide-lib.ts";

const DEPTH = 18;
const e = new Engine();
await e.init({ Hash: 128 });
/** Score for `color` in pawns (mate = ±100). */
const scoreFor = async (fen: string, color: "w" | "b") => {
  const r = (await e.analyseMulti(fen, 1, { depth: DEPTH }))[0];
  if (!r) return new Chess(fen).isCheckmate() ? (fen.split(" ")[1] === color ? -100 : 100) : 0;
  const s = "mate" in r.score ? (r.score.mate > 0 ? 100 : -100) : r.score.cp / 100;
  return { s: fen.split(" ")[1] === color ? s : -s, best: r.pv[0] };
};
const val = (x: number | { s: number }) => (typeof x === "number" ? x : x.s);

let errors = 0;
const traps = guideTraps();
for (const [i, t] of traps.entries()) {
  const problems: string[] = [];
  let g;
  try {
    g = playGuide(t);
  } catch (err) {
    console.log(`✗ ${t.id}: ${(err as Error).message}`);
    errors++;
    continue;
  }
  const plies = t.steps.reduce((n, s) => n + s.plies, 0);
  if (plies !== t.line.length) problems.push(`steps cover ${plies} plies, line has ${t.line.length}`);
  const victim = t.hero === "w" ? "b" : "w";
  const mover = (ply: number) => g.fens[ply - 1].split(" ")[1];
  if (mover(t.keyPly) !== t.hero) problems.push(`key ply ${t.keyPly} is not a ${t.hero} move`);
  if (mover(t.mistakePly) !== victim) problems.push(`mistake ply ${t.mistakePly} is not a ${victim} move`);
  if (t.line[t.defense.branchPly] && mover(t.defense.branchPly + 1) !== victim) problems.push("defense branch is not the victim's move");
  const before = val(await scoreFor(g.fens[t.mistakePly - 1], victim));
  const after = val(await scoreFor(g.fens[t.mistakePly], victim));
  const final = val(await scoreFor(g.fens.at(-1)!, t.hero));
  const dBest = await scoreFor(g.fens[t.defense.branchPly], victim);
  const dAfter = val(await scoreFor(g.defenseFens[1], victim));
  if (before - after < 0.6) problems.push(`mistake ${t.line[t.mistakePly - 1]} only costs ${(before - after).toFixed(1)}`);
  if (final < 1) problems.push(`trap ends only ${final.toFixed(1)} for the trapper`);
  if (val(dBest) - dAfter > 0.6) problems.push(`defense ${t.defense.moves[0]} is ${(val(dBest) - dAfter).toFixed(1)} worse than best`);
  if (problems.length) errors++;
  console.log(
    `${problems.length ? "✗" : "✓"} ${String(i + 1).padStart(2)} ${t.level} ${t.id.padEnd(20)} mistake ${t.line[t.mistakePly - 1]} ${before.toFixed(1)}→${after.toFixed(1)}  end ${final.toFixed(1)}  defense ${t.defense.moves[0]} ${dAfter.toFixed(1)} (best ${val(dBest).toFixed(1)})` +
      (problems.length ? `\n     ${problems.join("; ")}` : ""),
  );
}
e.quit();
console.log(`\n${traps.length} traps, ${errors} with problems`);
process.exit(errors ? 1 : 0);
