/**
 * Builds the free lead-magnet PDF "10 Chess Traps Every Beginner Must Know" from the lesson data:
 * one page per trap with a "find the key move" diagram, the final position, the moves explained step by step,
 * the takeaways and how to stop it (from the matching defense video). Diagrams use the video board.
 *
 *   npx tsx scripts/build-guide.ts     → guide/10-chess-traps.pdf
 *
 * Needs REMOTION_BROWSER_EXECUTABLE (or CHROME) pointing at a Chromium for the PDF printing step.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { HANDLE } from "../src/brand.ts";
import { defenseOf, getLesson } from "../src/lessons/index.ts";
import { engineDataFor } from "../src/lib/analysis.ts";
import { CLASS_INFO } from "../src/lib/classes.ts";
import { replayLesson } from "../src/lib/line.ts";
import { BAND_LABEL } from "../src/theme.ts";
import type { Lesson } from "../src/types.ts";
import { renderDiagram, root } from "./render-lib.ts";

/** Beginner-friendly traps, easiest band first. Lasker / Siberian are kept for the paid guide. */
const TRAPS = [
  "fools-mate",
  "scholars-mate",
  "back-rank-mate",
  "legals-mate",
  "blackburne-shilling",
  "stafford-trap",
  "englund-gambit-trap",
  "elephant-trap",
  "kieninger-trap",
  "fishing-pole-trap",
];
const TITLE = "10 Chess Traps Every Beginner Must Know";

const outDir = path.join(root, "out", "guide");
const pdfPath = path.join(root, "guide", "10-chess-traps.pdf");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rich = (s: string) => esc(s).replace(/\*(.+?)\*/g, "<b>$1</b>");

/** "1. e4 e5 2. Nf3" style numbering for a run of moves. */
const numbered = (moves: { san: string; fenBefore: string }[]) =>
  moves
    .map((m, i) => {
      const [, side, , , , full] = m.fenBefore.split(" ");
      if (side === "w") return `${full}. ${m.san}`;
      return i === 0 ? `${full}... ${m.san}` : m.san;
    })
    .join(" ");

type TrapPage = { lesson: Lesson; keyImg: string; finalImg: string; keyCaption: string; finalCaption: string; steps: string[] };

const buildTrap = async (lesson: Lesson): Promise<TrapPage> => {
  const line = replayLesson(lesson);
  const engine = engineDataFor(lesson, line);
  // Key move: the brilliant/great step, else the final (mating) move.
  const badgeStep = lesson.steps.findIndex((s) => s.badge === "brilliant" || s.badge === "great");
  const keyMove = badgeStep >= 0 ? line.moves.filter((m) => m.stepIndex === badgeStep).at(-1)! : line.moves.at(-1)!;
  const last = line.moves.at(-1)!;
  const keyImg = path.join(outDir, `${lesson.id}-key.png`);
  const finalImg = path.join(outDir, `${lesson.id}-final.png`);
  await renderDiagram(
    { fen: keyMove.fenBefore, orientation: lesson.hero, arrows: [`g:${keyMove.move.from}${keyMove.move.to}`] },
    keyImg,
  );
  await renderDiagram(
    {
      fen: line.finalFen,
      orientation: lesson.hero,
      lastMove: { from: last.move.from, to: last.move.to, classification: engine.classes[last.ply - 1] },
      mate: line.isMate,
    },
    finalImg,
  );
  const keyClass = lesson.steps[keyMove.stepIndex].badge ?? engine.classes[keyMove.ply - 1];
  const keyCaption =
    keyMove === last && line.isMate
      ? `<b>Find the mate:</b> ${esc(keyMove.move.san)}`
      : `<b>Key move:</b> ${esc(keyMove.move.san)}${keyClass ? ` <span class="cls" style="background:${CLASS_INFO[keyClass].color}">${esc(CLASS_INFO[keyClass].glyph)}</span>` : ""}`;
  const finalCaption = line.isMate ? "<b>Final position:</b> checkmate" : `<b>Final position:</b> ${esc(last.move.san)}`;
  const steps = lesson.steps.map((step, i) => {
    const moves = line.moves.filter((m) => m.stepIndex === i).map((m) => ({ san: m.move.san, fenBefore: m.fenBefore }));
    return `${moves.length ? `<span class="mv">${esc(numbered(moves))}</span> ` : ""}${rich(step.say)}`;
  });
  return { lesson, keyImg, finalImg, keyCaption, finalCaption, steps };
};

const page = (body: string, cls = "") => `<section class="page ${cls}">${body}</section>`;
const footer = (n: number) => `<footer><span>@${HANDLE}</span><span>Every line checked by Stockfish</span><span>${n}</span></footer>`;

const trapPage = (p: TrapPage, i: number, pageNo: number) => {
  const { lesson } = p;
  const defense = defenseOf(lesson);
  const side = lesson.hero === "w" ? "White" : "Black";
  return page(`
    <div class="top"><span class="num">TRAP ${i + 1}</span><span class="pill">${BAND_LABEL[lesson.band]} ELO</span><span class="side">You play ${side}</span></div>
    <h2>${esc(lesson.title)}</h2>
    <p class="hook">${rich(`${lesson.hook[0]} ${lesson.hook[1]}`.replace(/\.\.\.\s*\.\.\./g, "... "))}</p>
    <div class="boards">
      <figure><img src="${p.keyImg}"><figcaption>${p.keyCaption}</figcaption></figure>
      <figure><img src="${p.finalImg}"><figcaption>${p.finalCaption}</figcaption></figure>
    </div>
    <h3>How it works</h3>
    <ol class="steps${p.steps.length > 8 ? " dense" : ""}">${p.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
    <div class="boxes">
      <div class="box remember"><h4>Remember</h4><ul>${lesson.takeaways.map((t) => `<li>${rich(t)}</li>`).join("")}</ul></div>
      ${defense ? `<div class="box defense"><h4>🛡 How to stop it</h4><ul>${defense.takeaways.map((t) => `<li>${rich(t)}</li>`).join("")}</ul></div>` : ""}
    </div>
    ${footer(pageNo)}`);
};

const css = `
@font-face { font-family: Montserrat; src: url("${path.join(root, "public/fonts/Montserrat-latin.woff2")}") format("woff2"); font-weight: 500 900; }
@font-face { font-family: Montserrat; src: url("${path.join(root, "public/fonts/Montserrat-latin-ext.woff2")}") format("woff2"); font-weight: 500 900; unicode-range: U+0100-02BA, U+1E00-1EFF; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: Montserrat, sans-serif; font-weight: 500; color: #262421; }
.page { width: 210mm; height: 297mm; padding: 16mm 15mm 14mm; position: relative; page-break-after: always; overflow: hidden; }
b { font-weight: 800; }
footer { position: absolute; left: 15mm; right: 15mm; bottom: 8mm; display: flex; justify-content: space-between; font-size: 9pt; color: #8b8987; font-weight: 700; }
.top { display: flex; gap: 10px; align-items: center; font-weight: 800; font-size: 10pt; }
.num { color: #81b64c; letter-spacing: 2px; }
.pill { background: #81b64c; color: #fff; padding: 3px 10px; border-radius: 99px; }
.side { margin-left: auto; color: #8b8987; }
h2 { font-size: 32pt; font-weight: 900; margin: 8px 0 4px; }
.hook { font-size: 14pt; margin: 0 0 14px; color: #4a4744; }
.boards { display: flex; gap: 8mm; }
figure { margin: 0; flex: 1; }
figure img { width: 100%; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,.25); }
figcaption { font-size: 11.5pt; margin-top: 7px; display: flex; align-items: center; gap: 6px; }
.cls { color: #fff; font-weight: 900; border-radius: 99px; padding: 0 7px; font-size: 9.5pt; }
h3 { font-size: 15pt; font-weight: 900; margin: 18px 0 8px; }
.steps { margin: 0; padding-left: 22px; font-size: 12pt; line-height: 1.5; }
.steps li { margin-bottom: 5px; }
.steps.dense { font-size: 11pt; line-height: 1.4; } .steps.dense li { margin-bottom: 2px; }
.mv { font-weight: 800; background: #eef3e6; color: #45753c; border-radius: 4px; padding: 0 4px; }
.boxes { display: flex; gap: 6mm; margin-top: 16px; }
.box { flex: 1; border-radius: 12px; padding: 10px 16px; font-size: 12pt; }
.box h4 { margin: 2px 0 6px; font-size: 13pt; font-weight: 900; }
.box ul { margin: 0; padding-left: 18px; line-height: 1.5; }
.remember { background: #eef3e6; } .remember h4 { color: #45753c; }
.defense { background: #e6eff8; } .defense h4 { color: #285b88; }
.cover { background: #302e2b; color: #fff; display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: 24mm; }
.cover .brand { font-weight: 900; color: #81b64c; letter-spacing: 3px; font-size: 12pt; }
.cover h1 { font-size: 40pt; font-weight: 900; line-height: 1.08; margin: 10mm 0 5mm; }
.cover h1 em { font-style: normal; color: #ffe14d; }
.cover .sub { font-size: 14pt; color: #c3c2c1; margin: 0 0 10mm; }
.cover img { width: 120mm; border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,.5); }
.cover .by { margin-top: 10mm; font-size: 13pt; font-weight: 800; }
.cover footer { color: #8b8987; }
.intro h2 { font-size: 26pt; }
.intro p, .intro li { font-size: 12pt; line-height: 1.6; }
.toc { list-style: none; padding: 0; margin: 8mm 0 0; }
.toc li { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid #e3e1df; font-weight: 700; }
.toc .n { color: #81b64c; font-weight: 900; width: 26px; }
.toc .pill { margin-left: auto; font-size: 9pt; }
.end { background: #302e2b; color: #fff; text-align: center; padding-top: 40mm; }
.end h2 { font-size: 30pt; } .end p { font-size: 14pt; color: #c3c2c1; line-height: 1.6; }
.end .cta { display: inline-block; margin-top: 10mm; background: #81b64c; color: #fff; font-weight: 900; font-size: 18pt; padding: 12px 28px; border-radius: 14px; box-shadow: 0 6px 0 #45753c; }
.end footer { color: #8b8987; }
`;

const main = async () => {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  const lessons = TRAPS.map(getLesson);
  const pages: TrapPage[] = [];
  for (const l of lessons) {
    console.log(`Diagrams: ${l.id}`);
    pages.push(await buildTrap(l));
  }
  const coverImg = pages.find((p) => p.lesson.id === "legals-mate")!.finalImg;
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${TITLE}</title><style>${css}</style></head><body>
${page(
  `<div class="brand">@${HANDLE.toUpperCase()}</div>
   <h1>10 Chess Traps<br>Every Beginner<br><em>Must Know</em></h1>
   <p class="sub">Win fast. Never fall for them yourself.<br>For players rated 0–1500.</p>
   <img src="${coverImg}">
   <div class="by">Every move checked by Stockfish</div>`,
  "cover",
)}
${page(
  `<h2>How to use this guide</h2>
   <ol>
     <li><b>Set up each trap on a real board</b> and play it through once with both colours.</li>
     <li><b>Cover the arrow</b> on the left diagram and try to find the key move yourself.</li>
     <li><b>Read "How to stop it"</b>: your opponents know some of these too.</li>
     <li><b>Watch the animated version</b> on Instagram: @${HANDLE}.</li>
   </ol>
   <ul class="toc">${lessons
     .map((l, i) => `<li><span class="n">${i + 1}</span>${esc(l.title)}<span class="pill">${BAND_LABEL[l.band]} ELO</span></li>`)
     .join("")}</ul>
   ${footer(2)}`,
  "intro",
)}
${pages.map((p, i) => trapPage(p, i, i + 3)).join("\n")}
${page(
  `<h2>Want more traps?</h2>
   <p>A bigger guide with <b>40+ traps</b> and <b>how to stop every one of them</b> is coming soon.</p>
   <p>Follow <b>@${HANDLE}</b> for a new chess trap every day<br>and "Brilliant or Blunder?" puzzles.</p>
   <div class="cta">Follow @${HANDLE}</div>
   ${footer(pages.length + 3)}`,
  "end",
)}
</body></html>`;
  const htmlPath = path.join(outDir, "guide.html");
  fs.writeFileSync(htmlPath, html);
  const chrome = process.env.CHROME ?? process.env.REMOTION_BROWSER_EXECUTABLE;
  if (!chrome) throw new Error("Set REMOTION_BROWSER_EXECUTABLE (or CHROME) to a Chromium binary to print the PDF");
  execFileSync(chrome, [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=10000",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ]);
  console.log(`✓ ${path.relative(root, pdfPath)} (${(fs.statSync(pdfPath).size / 1024).toFixed(0)} KB, ${pages.length + 3} pages)`);
};

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
