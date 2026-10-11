import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

/**
 * Minimal UCI wrapper around Stockfish.
 *
 * By default it runs the free Stockfish 19 build shipped in the `stockfish`
 * npm package (full-strength NNUE, WASM). Set STOCKFISH_PATH to a native
 * Stockfish binary (e.g. downloaded from stockfishchess.org) for more speed.
 */

export type Score = { cp: number } | { mate: number };

export type EngineResult = {
  /** Score from the side-to-move's point of view. */
  score: Score;
  bestMove: string | null;
  pv: string[];
  depth: number;
};

const require = createRequire(import.meta.url);

const resolveCommand = (): { cmd: string; args: string[]; name: string } => {
  if (process.env.STOCKFISH_PATH) {
    return { cmd: process.env.STOCKFISH_PATH, args: [], name: process.env.STOCKFISH_PATH };
  }
  const pkgDir = path.dirname(require.resolve("stockfish/package.json"));
  const flavour = process.env.STOCKFISH_FLAVOUR ?? "stockfish-19-single.js";
  return { cmd: process.execPath, args: [path.join(pkgDir, "bin", flavour)], name: flavour };
};

export class Engine {
  private proc: ChildProcessWithoutNullStreams;
  private buffer = "";
  private listeners: ((line: string) => void)[] = [];
  public name = "";

  constructor() {
    const { cmd, args } = resolveCommand();
    this.proc = spawn(cmd, args, { stdio: "pipe" });
    this.proc.stdout.setEncoding("utf8");
    this.proc.stdout.on("data", (chunk: string) => {
      this.buffer += chunk;
      let idx: number;
      while ((idx = this.buffer.indexOf("\n")) >= 0) {
        const line = this.buffer.slice(0, idx).trim();
        this.buffer = this.buffer.slice(idx + 1);
        for (const l of [...this.listeners]) l(line);
      }
    });
  }

  private send(cmd: string) {
    this.proc.stdin.write(cmd + "\n");
  }

  private waitFor(predicate: (line: string) => boolean, onLine?: (line: string) => void): Promise<string> {
    return new Promise((resolve) => {
      const listener = (line: string) => {
        onLine?.(line);
        if (predicate(line)) {
          this.listeners = this.listeners.filter((l) => l !== listener);
          resolve(line);
        }
      };
      this.listeners.push(listener);
    });
  }

  async init(options: Record<string, string | number> = {}) {
    const idLine = this.waitFor((l) => l === "uciok", (l) => {
      if (l.startsWith("id name ")) this.name = l.slice("id name ".length);
    });
    this.send("uci");
    await idLine;
    for (const [k, v] of Object.entries(options)) this.send(`setoption name ${k} value ${v}`);
    await this.ready();
  }

  async ready() {
    const p = this.waitFor((l) => l === "readyok");
    this.send("isready");
    await p;
  }

  async newGame() {
    this.send("ucinewgame");
    await this.ready();
  }

  /** Analyse a FEN and return the score from the side-to-move's perspective. */
  async analyse(fen: string, opts: { depth?: number; movetime?: number } = {}): Promise<EngineResult> {
    let last: EngineResult = { score: { cp: 0 }, bestMove: null, pv: [], depth: 0 };
    const done = this.waitFor(
      (l) => l.startsWith("bestmove"),
      (l) => {
        if (!l.startsWith("info") || !l.includes(" score ") || l.includes(" lowerbound") || l.includes(" upperbound")) return;
        const multipv = /\bmultipv (\d+)/.exec(l);
        if (multipv && multipv[1] !== "1") return;
        const depth = Number(/\bdepth (\d+)/.exec(l)?.[1] ?? 0);
        const cp = /\bscore cp (-?\d+)/.exec(l);
        const mate = /\bscore mate (-?\d+)/.exec(l);
        const pv = /\bpv (.+)$/.exec(l)?.[1].split(" ") ?? [];
        const score: Score = mate ? { mate: Number(mate[1]) } : { cp: Number(cp?.[1] ?? 0) };
        last = { score, bestMove: pv[0] ?? null, pv, depth };
      },
    );
    this.send(`position fen ${fen}`);
    this.send(opts.movetime ? `go movetime ${opts.movetime}` : `go depth ${opts.depth ?? 20}`);
    const line = await done;
    const best = line.split(" ")[1];
    if (best && best !== "(none)") last.bestMove = best;
    return last;
  }

  /** Top `n` lines (MultiPV) for a FEN. Scores are from the side-to-move's point of view. */
  async analyseMulti(fen: string, n: number, opts: { depth?: number } = {}): Promise<EngineResult[]> {
    this.send(`setoption name MultiPV value ${n}`);
    const lines = new Map<number, EngineResult>();
    const done = this.waitFor(
      (l) => l.startsWith("bestmove"),
      (l) => {
        if (!l.startsWith("info") || !l.includes(" score ") || l.includes(" lowerbound") || l.includes(" upperbound")) return;
        const k = Number(/\bmultipv (\d+)/.exec(l)?.[1] ?? 1);
        const depth = Number(/\bdepth (\d+)/.exec(l)?.[1] ?? 0);
        const cp = /\bscore cp (-?\d+)/.exec(l);
        const mate = /\bscore mate (-?\d+)/.exec(l);
        const pv = /\bpv (.+)$/.exec(l)?.[1].split(" ") ?? [];
        lines.set(k, { score: mate ? { mate: Number(mate[1]) } : { cp: Number(cp?.[1] ?? 0) }, bestMove: pv[0] ?? null, pv, depth });
      },
    );
    this.send(`position fen ${fen}`);
    this.send(`go depth ${opts.depth ?? 20}`);
    await done;
    this.send("setoption name MultiPV value 1");
    await this.ready();
    return [...lines.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => v);
  }

  quit() {
    this.send("quit");
    setTimeout(() => this.proc.kill(), 500).unref();
  }
}
