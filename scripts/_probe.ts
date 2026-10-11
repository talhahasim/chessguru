import { Chess } from "chess.js";
import { Engine } from "./engine.ts";

const probes: [string, string][] = [
  ["scholars: after Qh5 (black)", "e4 e5 Bc4 Nc6 Qh5"],
  ["scholars: after g6 Qf3 (black)", "e4 e5 Bc4 Nc6 Qh5 g6 Qf3"],
  ["fools: after f3 e5 (white)", "f3 e5"],
  ["backrank start (black)", "FEN:6k1/5ppp/8/8/1q6/8/1P3PPP/3R2K1 b - - 0 1"],
  ["legal: after Bg4 Nc3 (black)", "e4 e5 Nf3 d6 Bc4 Bg4 Nc3"],
  ["legal: Nf6 then Nxe5 (black)", "e4 e5 Nf3 d6 Bc4 Bg4 Nc3 Nf6 Nxe5"],
  ["blackburne: after Nd4 (white)", "e4 e5 Nf3 Nc6 Bc4 Nd4"],
  ["stafford: after Bc5 (white)", "e4 e5 Nf3 Nf6 Nxe5 Nc6 Nxc6 dxc6 d3 Bc5"],
  ["englund: after Qxb2 (white)", "d4 e5 dxe5 Nc6 Nf3 Qe7 Bf4 Qb4+ Bd2 Qxb2"],
  ["elephant: after exd5 (white)", "d4 d5 c4 e6 Nc3 Nf6 Bg5 Nbd7 cxd5 exd5"],
  ["kieninger: after Qe7 (white)", "d4 Nf6 c4 e5 dxe5 Ng4 Nf3 Nc6 Bf4 Bb4+ Nbd2 Qe7"],
  ["lasker: after d4 (white)", "d4 d5 c4 e5 dxe5 d4"],
  ["fishing: after h5 (white)", "e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Ng4 h3 h5"],
  ["siberian: after Ng4 (white)", "e4 c5 d4 cxd4 c3 dxc3 Nxc3 Nc6 Nf3 e6 Bc4 Qc7 O-O Nf6 Qe2 Ng4"],
];

const e = new Engine();
await e.init({ Hash: 128 });
for (const [name, line] of probes) {
  const c = line.startsWith("FEN:") ? new Chess(line.slice(4)) : new Chess();
  if (!line.startsWith("FEN:")) for (const m of line.split(" ")) c.move(m);
  const res = await e.analyseMulti(c.fen(), 3, { depth: 18 });
  const out = res.map((r) => {
    const t = new Chess(c.fen());
    const san = r.pv.slice(0, 7).map((u) => { try { return t.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] }).san; } catch { return "?"; } });
    const sc = "mate" in r.score ? `M${r.score.mate}` : (r.score.cp / 100).toFixed(2);
    return `   ${sc.padStart(6)}  ${san.join(" ")}`;
  });
  console.log(`${name}\n${out.join("\n")}`);
}
e.quit();
