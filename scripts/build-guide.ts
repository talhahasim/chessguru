/**
 * Builds the free lead-magnet PDF "30 Chess Traps for 400–1000 Elo" (guide/30-chess-traps.pdf).
 * One page per trap: THE TRAP (key position, moves explained, result) and THE DEFENSE (where to deviate,
 * wrong move in red / right move in green, the defensive line and tips). Diagrams use the video board.
 * Trap data: src/guide/traps.ts (+ the video lessons); verify with `npx tsx scripts/check-guide.ts`.
 *
 *   npm run guide
 *
 * Needs REMOTION_BROWSER_EXECUTABLE (or CHROME) pointing at a Chromium for the PDF printing step.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { HANDLE } from "../src/brand.ts";
import type { GuideTrap, Level } from "../src/guide/traps.ts";
import { guideTraps, playGuide, type PlayedGuide } from "./guide-lib.ts";
import { renderDiagram, root } from "./render-lib.ts";

const outDir = path.join(root, "out", "guide");
export const GUIDE_PDF = path.join(root, "guide", "30-chess-traps.pdf");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rich = (s: string) => esc(s).replace(/\*(.+?)\*/g, "<b>$1</b>");
const side = (c: "w" | "b") => (c === "w" ? "White" : "Black");

/** "1. e4 e5 2. Nf3" style numbering for moves starting at `fens[from]`. */
const numbered = (fens: string[], sans: string[], from: number) =>
  sans
    .map((san, i) => {
      const [, stm, , , , full] = fens[from + i].split(" ");
      if (stm === "w") return `${full}. ${san}`;
      return i === 0 ? `${full}... ${san}` : san;
    })
    .join(" ");

const LEVEL_COLOR: Record<Level, string> = { "400–600": "#81b64c", "600–800": "#e8a33b", "800–1000": "#d9534f" };

type Page = { g: PlayedGuide; trapImg: string; defenseImg: string };

const diagrams = async (g: PlayedGuide): Promise<Page> => {
  const t = g.trap;
  const victim = t.hero === "w" ? "b" : "w";
  const key = g.moves[t.keyPly - 1];
  const trapImg = path.join(outDir, `${t.id}-trap.png`);
  const defenseImg = path.join(outDir, `${t.id}-defense.png`);
  await renderDiagram({ fen: g.fens[t.keyPly - 1], orientation: t.hero, arrows: [`g:${key.from}${key.to}`] }, trapImg);
  const wrong = g.moves[t.defense.branchPly];
  const right = g.defenseMoves[0];
  await renderDiagram(
    {
      fen: g.fens[t.defense.branchPly],
      orientation: victim,
      arrows: [...(wrong ? [`r:${wrong.from}${wrong.to}`] : []), `g:${right.from}${right.to}`],
    },
    defenseImg,
  );
  return { g, trapImg, defenseImg };
};

const footer = (n: number) => `<footer><span>@${HANDLE}</span><span>Every line checked by Stockfish</span><span>${n}</span></footer>`;
const page = (body: string, cls = "") => `<section class="page ${cls}">${body}</section>`;

const trapPage = ({ g, trapImg, defenseImg }: Page, i: number, pageNo: number) => {
  const t = g.trap;
  const victim = t.hero === "w" ? "b" : "w";
  let ply = 0;
  const steps = t.steps.map((s) => {
    const sans = g.sans.slice(ply, ply + s.plies);
    const mv = sans.length ? `<span class="mv">${esc(numbered(g.fens, sans, ply))}</span> ` : "";
    ply += s.plies;
    return `<li>${mv}${rich(s.text)}</li>`;
  });
  const wrong = g.sans[t.defense.branchPly];
  const fix = numbered(g.fens, [g.defenseMoves[0].san], t.defense.branchPly);
  const dLine = numbered(g.defenseFens, g.defenseMoves.map((m) => m.san), 0);
  return page(`
    <div class="top"><span class="num">TRAP ${i + 1}</span><span class="pill" style="background:${LEVEL_COLOR[t.level]}">${t.level} ELO</span><span class="opening">${esc(t.opening)}</span></div>
    <h2>${esc(t.name)}</h2>
    <p class="hook">${rich(t.hook)}</p>
    <div class="sec trap">
      <div class="sec-h"><span>THE TRAP</span><small>You play ${side(t.hero)}</small></div>
      <div class="grid">
        <figure><img src="${trapImg}"><figcaption><span class="dot g"></span>Winning move: <b>${esc(g.sans[t.keyPly - 1])}</b></figcaption></figure>
        <div>
          <ol class="steps">${steps.join("")}</ol>
          <div class="result">✅ ${esc(t.result)}</div>
        </div>
      </div>
    </div>
    <div class="sec defense">
      <div class="sec-h"><span>🛡 THE DEFENSE</span><small>When they try it on you (${side(victim)})</small></div>
      <div class="grid">
        <figure><img src="${defenseImg}"><figcaption>${wrong ? `<span class="dot r"></span>${esc(wrong)}&nbsp;&nbsp;` : ""}<span class="dot g"></span><b>${esc(g.defenseMoves[0].san)}</b></figcaption></figure>
        <div>
          <p class="instead">${wrong ? `Instead of <span class="bad">${esc(wrong)}</span>, play` : "Play"} <span class="good">${esc(fix)}</span></p>
          <p>${rich(t.defense.text)}</p>
          ${g.defenseMoves.length > 1 ? `<p class="dline">Line: <span class="mv">${esc(dLine)}</span></p>` : ""}
          <ul class="tips">${t.defense.tips.map((x) => `<li>${rich(x)}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
    <div class="remember"><b>Remember:</b> ${t.remember.map((x) => rich(x)).join(" · ")}</div>
    ${footer(pageNo)}`);
};

const css = `
@font-face { font-family: Montserrat; src: url("${path.join(root, "public/fonts/Montserrat-latin.woff2")}") format("woff2"); font-weight: 500 900; }
@font-face { font-family: Montserrat; src: url("${path.join(root, "public/fonts/Montserrat-latin-ext.woff2")}") format("woff2"); font-weight: 500 900; unicode-range: U+0100-02BA, U+1E00-1EFF; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: Montserrat, sans-serif; font-weight: 500; color: #262421; }
.page { width: 210mm; height: 297mm; padding: 13mm 13mm 12mm; position: relative; page-break-after: always; overflow: hidden; }
b { font-weight: 800; }
footer { position: absolute; left: 13mm; right: 13mm; bottom: 7mm; display: flex; justify-content: space-between; font-size: 8.5pt; color: #8b8987; font-weight: 700; }
.top { display: flex; gap: 10px; align-items: center; font-weight: 800; font-size: 9.5pt; }
.num { color: #81b64c; letter-spacing: 2px; }
.pill { color: #fff; padding: 3px 10px; border-radius: 99px; }
.opening { margin-left: auto; color: #8b8987; }
h2 { font-size: 27pt; font-weight: 900; margin: 5px 0 2px; }
.hook { font-size: 13pt; margin: 0 0 9px; color: #4a4744; }
.sec { border-radius: 12px; padding: 10px 12px 12px; margin-bottom: 10px; }
.sec.trap { background: #f3f7ed; } .sec.defense { background: #eaf2fa; }
.sec-h { display: flex; justify-content: space-between; align-items: baseline; font-weight: 900; font-size: 12pt; margin-bottom: 6px; }
.trap .sec-h span { color: #45753c; } .defense .sec-h span { color: #285b88; }
.sec-h small { font-size: 9pt; color: #6d6a67; font-weight: 700; }
.grid { display: grid; grid-template-columns: 84mm 1fr; gap: 11px; align-items: start; }
figure { margin: 0; }
figure img { width: 84mm; display: block; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,.25); }
figcaption { font-size: 9.5pt; margin-top: 5px; display: flex; align-items: center; gap: 5px; }
.dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; } .dot.g { background: #81b64c; } .dot.r { background: #e02828; }
.steps { margin: 0; padding-left: 18px; font-size: 10.2pt; line-height: 1.45; }
.steps li { margin-bottom: 3px; }
.mv { font-weight: 800; background: rgba(255,255,255,.8); color: #45753c; border-radius: 4px; padding: 0 4px; }
.defense .mv { color: #285b88; }
.result { margin-top: 6px; font-weight: 900; font-size: 11pt; color: #45753c; }
.defense p { margin: 0 0 7px; font-size: 10.4pt; line-height: 1.45; }
.instead { font-size: 11.5pt !important; font-weight: 800; }
.bad { color: #e02828; text-decoration: line-through; } .good { color: #2f7d32; }
.tips { margin: 2px 0 0; padding-left: 18px; font-size: 10.2pt; line-height: 1.45; }
.remember { font-size: 10.2pt; color: #4a4744; line-height: 1.45; }
.cover { background: #302e2b; color: #fff; display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: 20mm; }
.cover .brand { font-weight: 900; color: #81b64c; letter-spacing: 3px; font-size: 12pt; }
.cover h1 { font-size: 44pt; font-weight: 900; line-height: 1.05; margin: 9mm 0 4mm; }
.cover h1 em { font-style: normal; color: #ffe14d; }
.cover .sub { font-size: 14pt; color: #c3c2c1; margin: 0 0 9mm; line-height: 1.5; }
.cover img { width: 112mm; border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,.5); }
.cover .by { margin-top: 9mm; font-size: 12pt; font-weight: 800; }
.cover footer, .end footer { color: #8b8987; }
.intro h2 { font-size: 24pt; margin-bottom: 8px; }
.intro p, .intro li { font-size: 11pt; line-height: 1.55; }
.legend { display: flex; gap: 18px; font-weight: 800; font-size: 10.5pt; margin: 6px 0 10px; }
.toc { columns: 2; column-gap: 8mm; padding: 0; margin: 4mm 0 0; list-style: none; }
.toc h4 { margin: 8px 0 4px; font-size: 11pt; break-after: avoid; }
.toc li { display: flex; gap: 6px; padding: 4px 0; border-bottom: 1px solid #e3e1df; font-size: 9.5pt; font-weight: 700; break-inside: avoid; }
.toc .n { color: #81b64c; font-weight: 900; width: 20px; flex-shrink: 0; } .toc .o { display: none; }
.end { background: #302e2b; color: #fff; text-align: center; padding-top: 40mm; }
.end h2 { font-size: 30pt; } .end p { font-size: 13.5pt; color: #c3c2c1; line-height: 1.6; }
.end .cta { display: inline-block; margin-top: 10mm; background: #81b64c; color: #fff; font-weight: 900; font-size: 18pt; padding: 12px 28px; border-radius: 14px; box-shadow: 0 6px 0 #45753c; }
`;

const main = async () => {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(path.dirname(GUIDE_PDF), { recursive: true });
  const traps: GuideTrap[] = guideTraps();
  const pages: Page[] = [];
  for (const t of traps) {
    process.stdout.write(`\rDiagrams: ${pages.length + 1}/${traps.length} ${t.id.padEnd(22)}`);
    pages.push(await diagrams(playGuide(t)));
  }
  console.log();
  const cover = pages.find((p) => p.g.trap.id === "caro-smothered") ?? pages[0];
  const coverImg = path.join(outDir, "cover.png");
  const cg = cover.g;
  await renderDiagram(
    { fen: cg.fens.at(-1)!, orientation: cg.trap.hero, lastMove: { from: cg.moves.at(-1)!.from, to: cg.moves.at(-1)!.to }, mate: true },
    coverImg,
  );
  const levels: Level[] = ["400–600", "600–800", "800–1000"];
  const toc = levels
    .map(
      (lv) =>
        `<h4 style="color:${LEVEL_COLOR[lv]}">${lv} ELO</h4>` +
        traps
          .map((t, i) => (t.level === lv ? `<li><span class="n">${i + 1}</span>${esc(t.name)}<span class="o">${esc(t.opening)}</span></li>` : ""))
          .join(""),
    )
    .join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>30 Chess Traps</title><style>${css}</style></head><body>
${page(
  `<div class="brand">@${HANDLE.toUpperCase()}</div>
   <h1>30 Chess Traps<br>for <em>400–1000</em> Elo</h1>
   <p class="sub">Win fast with them.<br>Know exactly how to stop every one.</p>
   <img src="${coverImg}">
   <div class="by">Every line checked by Stockfish</div>`,
  "cover",
)}
${page(
  `<h2>How to use this guide</h2>
   <p>Each page has two halves: <b>THE TRAP</b> (how to win with it) and <b>THE DEFENSE</b> (what to play when someone tries it on you).</p>
   <div class="legend"><span><span class="dot g"></span> winning / correct move</span><span><span class="dot r"></span> the mistake</span></div>
   <ol>
     <li>Set the trap up on a real board and play it through with both colours.</li>
     <li>Cover the move list and try to find the green-arrow move yourself.</li>
     <li>Learn the defense too: at 400–1000 your opponents know many of these.</li>
     <li>Start with your level, then move up.</li>
   </ol>
   <ul class="toc">${toc}</ul>
   ${footer(2)}`,
  "intro",
)}
${pages.map((p, i) => trapPage(p, i, i + 3)).join("\n")}
${page(
  `<h2>Want more?</h2>
   <p>A new trap every day, plus "Brilliant or Blunder?" puzzles,<br>on Instagram: <b>@${HANDLE}</b></p>
   <p>Send this guide to a friend who keeps falling for traps.</p>
   <div class="cta">Follow @${HANDLE}</div>
   ${footer(pages.length + 3)}`,
  "end",
)}
</body></html>`;
  const htmlPath = path.join(outDir, "guide.html");
  fs.writeFileSync(htmlPath, html);
  const chrome = process.env.CHROME ?? process.env.REMOTION_BROWSER_EXECUTABLE;
  if (!chrome) throw new Error("Set REMOTION_BROWSER_EXECUTABLE (or CHROME) to a Chromium binary to print the PDF");
  execFileSync(
    chrome,
    [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=10000",
      `--print-to-pdf=${GUIDE_PDF}`,
      `file://${htmlPath}`,
    ],
    { stdio: "ignore" },
  );
  console.log(`✓ ${path.relative(root, GUIDE_PDF)} (${(fs.statSync(GUIDE_PDF).size / 1024).toFixed(0)} KB, ${pages.length + 3} pages)`);
};

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
