import React, { useMemo } from "react";
import { AbsoluteFill, Html5Audio, Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Board, type BoardArrow } from "./components/Board";
import { Caption } from "./components/Caption";
import { EvalBar } from "./components/EvalBar";
import { PlayerBar } from "./components/PlayerBar";
import { Header, HOOK_LAYOUT, HookOverlay, IntroCard, Outro, SendNudge } from "./components/Scenes";
import { Watermark } from "./components/Watermark";
import { engineDataFor } from "./lib/analysis";
import { evalBarFill } from "./lib/evals";
import { boardFromFen, isCheck, kingSquare, sideToMove } from "./lib/line";
import { boardStateAt, buildTimeline, FPS, stepAt, type Timeline } from "./lib/timeline";
import { getLesson } from "./lessons";
import { theme } from "./theme";
import type { Band, Color, Lesson } from "./types";

export type TrapVideoProps = { lessonId: string };

/** Layout for a 1080x1920 vertical video (Shorts / Reels / TikTok). */
const L = {
  W: 1080,
  H: 1920,
  side: 60,
  headerY: 64,
  topBarY: 196,
  barH: 78,
  boardY: 286,
  boardSize: 912,
  evalW: 40,
  evalGap: 12,
  captionY: 1310,
};
const boardX = (L.W - L.boardSize - L.evalW - L.evalGap) / 2 + L.evalW + L.evalGap;
const bottomBarY = L.boardY + L.boardSize + 10;

const RATINGS: Record<Band, [number, number]> = {
  "0-300": [250, 235],
  "300-600": [480, 512],
  "600-900": [760, 791],
  "900-1500": [1240, 1206],
};

const START_CLOCK = 10 * 60;

/** Seconds used by each side, ticking in real time while it is their turn. */
const clocksAt = (tl: Timeline, frame: number, firstToMove: Color) => {
  const used = { w: 0, b: 0 };
  const f = frame < tl.intro.start ? tl.outro.end : frame;
  let turn = firstToMove;
  let since = tl.intro.end;
  for (const m of tl.moves) {
    if (m.start > f) break;
    used[turn] += Math.max(0, m.start - since) / FPS;
    since = m.start;
    turn = turn === "w" ? "b" : "w";
  }
  const lastActivity = Math.min(f, tl.outro.start);
  used[turn] += Math.max(0, lastActivity - since) / FPS;
  return { w: START_CLOCK - used.w * 2.2, b: START_CLOCK - used.b * 2.2, turn };
};

export const TrapVideo: React.FC<TrapVideoProps> = ({ lessonId }) => {
  const frame = useCurrentFrame();
  const lesson: Lesson = getLesson(lessonId);
  const tl = useMemo(() => buildTimeline(lesson), [lesson]);
  const engine = useMemo(() => engineDataFor(lesson, tl.line), [lesson, tl]);
  const hero = lesson.hero;
  const villain: Color = hero === "w" ? "b" : "w";
  const lastPly = tl.line.moves.length;
  // Quiz videos ask "brilliant or blunder?" about the last move: nothing may give the answer away,
  // so they show no move badges at all (an opponent "blunder" badge would hint) and no eval bar.
  const quiz = lesson.kind === "quiz";
  const hidden = (ply: number) => quiz && ply > 0;

  // ---- Board state ------------------------------------------------------
  const state = boardStateAt(tl, frame);
  const inHook = frame < tl.hook.end;
  const fen = tl.line.fens[state.ply];
  const anim = state.animating;
  const shownPly = anim && state.progress >= 1 ? anim.ply : state.ply;
  const shownFen = tl.line.fens[shownPly];
  const lastMoveEv = anim ?? (shownPly > 0 ? tl.moves.find((m) => m.ply === shownPly) ?? null : null);
  const classification = lastMoveEv && !hidden(lastMoveEv.ply) ? engine.classes[lastMoveEv.ply - 1] : null;

  // Key moment = first brilliant/great step, else the mating step; the send sticker follows it.
  const keyIndex = (() => {
    const i = lesson.steps.findIndex((st) => st.badge === "brilliant" || st.badge === "great");
    if (i >= 0) return i;
    const m = lesson.steps.findIndex((st) => st.moves?.some((mv) => mv.includes("#")));
    return m >= 0 ? m : lesson.steps.length - 1;
  })();
  const nudge = (() => {
    if (lesson.kind === "defense" || quiz) return null;
    let start = tl.steps[keyIndex].settled + 15;
    // When the key moment is the last step, the outro's own send ask follows right away: show it one step earlier.
    if (start + 60 > tl.outro.start && keyIndex > 0) start = tl.steps[keyIndex - 1].settled + 15;
    const duration = Math.min(105, tl.outro.start - start);
    return duration >= 45 ? { start, duration } : null;
  })();

  // Markup of the current step (arrows etc. appear once its moves have landed).
  const step = inHook ? null : stepAt(tl, frame);
  const stepDef = step ? lesson.steps[step.index] : null;
  const arrows: BoardArrow[] = [];
  const squares: { mark: string; appearAt: number }[] = [];
  const pulse: { square: string; appearAt: number }[] = [];
  if (step && stepDef) {
    (stepDef.arrows ?? []).forEach((mark, i) => arrows.push({ mark, appearAt: step.settled + i * 6 }));
    (stepDef.squares ?? []).forEach((mark, i) => squares.push({ mark, appearAt: step.settled + i * 4 }));
    (stepDef.pulse ?? []).forEach((square) => pulse.push({ square, appearAt: step.settled + 4 }));
  }
  if (inHook && lastPly > 0) {
    const m = tl.moves[lastPly - 1];
    // Fully drawn on frame 0 (cover); neutral yellow for quizzes so the colour doesn't hint at the answer.
    arrows.push({ mark: `${quiz ? "y" : "g"}:${m.move.from}${m.move.to}`, appearAt: -30 });
  }

  const finalIsMate = tl.line.isMate;
  const mateAt = finalIsMate ? (inHook ? -30 : tl.moves[lastPly - 1].end + 4) : null;
  const mateInfo =
    finalIsMate && shownPly === lastPly && mateAt !== null
      ? {
          loserKing: kingSquare(tl.line.finalFen, sideToMove(tl.line.finalFen))!,
          winnerKing: kingSquare(tl.line.finalFen, sideToMove(tl.line.finalFen) === "w" ? "b" : "w")!,
          appearAt: mateAt,
        }
      : null;
  const checkSquare = !mateInfo && isCheck(shownFen) ? kingSquare(shownFen, sideToMove(shownFen)) : null;

  // ---- Eval bar -----------------------------------------------------------
  const evalFrom = engine.evals[Math.max(0, shownPly - 1)];
  const evalTo = engine.evals[shownPly];
  // Animate from the last *completed* move (not the one currently sliding).
  const settledMove = shownPly > 0 ? tl.moves[shownPly - 1] : null;
  const settleStart = settledMove && !inHook ? settledMove.end : -999;
  const k = interpolate(frame - settleStart, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const fill = shownPly === 0 || inHook ? evalBarFill(evalTo) : evalBarFill(evalFrom) + (evalBarFill(evalTo) - evalBarFill(evalFrom)) * k;

  // ---- Players ------------------------------------------------------------
  const boardNow = boardFromFen(shownFen);
  const clocks = clocksAt(tl, frame, sideToMove(tl.line.startFen));
  const [heroRating, villainRating] = RATINGS[lesson.band];
  const gameOver = frame >= tl.outro.start || inHook;

  // ---- Caption ------------------------------------------------------------
  const lastStepMove = step?.moves.at(-1);
  const chipClass = lastStepMove && !hidden(lastStepMove.ply) ? engine.classes[lastStepMove.ply - 1] : null;
  const chip =
    step && lastStepMove && chipClass ? { san: lastStepMove.move.san, classification: chipClass, at: step.settled } : null;

  // During the hook the board block is shrunk between the hook lines, then zooms into place.
  const boardCenterY = L.boardY + L.boardSize / 2;
  const zoom = interpolate(frame, [tl.hook.end - 14, tl.hook.end + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const camScale = HOOK_LAYOUT.boardScale + (1 - HOOK_LAYOUT.boardScale) * zoom;
  const camY = (HOOK_LAYOUT.boardCenterY - boardCenterY) * (1 - zoom);
  const shake = frame > 0 && frame < 12 ? Math.sin(frame * 2.3) * (12 - frame) * 1.4 : 0;
  const outroDim = interpolate(frame, [tl.outro.start, tl.outro.start + 10], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: theme.bg }}>
      {/* subtle vignette like the chess.com dark UI */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.25) 100%)" }} />

      <AbsoluteFill
        style={{
          transform: `translate(${shake}px, ${camY}px) scale(${camScale})`,
          transformOrigin: `${L.W / 2}px ${boardCenterY}px`,
        }}
      >
        {/* Header */}
        {!inHook ? (
          <div style={{ position: "absolute", left: L.side, top: L.headerY }}>
            <Header lesson={lesson} width={L.W - L.side * 2} appearAt={tl.intro.start} />
          </div>
        ) : null}

        {/* Opponent (top) */}
        <div style={{ position: "absolute", left: boardX, top: L.topBarY }}>
          <PlayerBar
            width={L.boardSize}
            height={L.barH}
            name="Opponent"
            rating={villainRating}
            color={villain}
            isHero={false}
            board={boardNow}
            clock={clocks[villain]}
            active={!gameOver && clocks.turn === villain}
          />
        </div>

        {/* Eval bar + board */}
        {!quiz ? (
          <div style={{ position: "absolute", left: boardX - L.evalW - L.evalGap, top: L.boardY }}>
            <EvalBar width={L.evalW} height={L.boardSize} orientation={hero} fill={fill} label={k > 0.5 || inHook ? evalTo : evalFrom} />
          </div>
        ) : null}
        <div style={{ position: "absolute", left: boardX, top: L.boardY, boxShadow: "0 12px 40px rgba(0,0,0,0.45)", borderRadius: 6 }}>
          <Board
            size={L.boardSize}
            orientation={hero}
            fen={fen}
            animating={anim ? { move: anim.move, fenAfter: anim.fenAfter, progress: state.progress } : null}
            lastMove={
              lastMoveEv
                ? {
                    from: lastMoveEv.move.from,
                    to: lastMoveEv.move.to,
                    classification,
                    badgeAt: inHook ? -30 : lastMoveEv.end + 2,
                  }
                : null
            }
            arrows={arrows}
            squares={squares}
            pulse={pulse}
            checkSquare={checkSquare}
            mate={mateInfo}
          />
        </div>

        {/* You (bottom) */}
        <div style={{ position: "absolute", left: boardX, top: bottomBarY }}>
          <PlayerBar
            width={L.boardSize}
            height={L.barH}
            name="You"
            rating={heroRating}
            color={hero}
            isHero
            board={boardNow}
            clock={clocks[hero]}
            active={!gameOver && clocks.turn === hero}
          />
        </div>
      </AbsoluteFill>

      {/* Caption / intro */}
      {frame >= tl.intro.start && frame < tl.intro.end ? (
        <div style={{ position: "absolute", left: L.side, top: L.captionY + 20 }}>
          <IntroCard lesson={lesson} start={tl.intro.start} duration={tl.intro.end - tl.intro.start} width={L.W - L.side * 2} />
        </div>
      ) : null}
      {step && stepDef ? (
        <div style={{ position: "absolute", left: L.side - 10, top: L.captionY }}>
          <Caption
            key={step.index}
            width={L.W - L.side * 2 + 20}
            start={step.start}
            say={stepDef.say}
            chip={chip}
            voice={tl.voice.find((v) => v.key === `step-${step.index}`) ?? null}
          />
        </div>
      ) : null}

      {/* Outro */}
      {frame >= tl.outro.start ? (
        <>
          <AbsoluteFill style={{ background: `rgba(0,0,0,${outroDim})` }} />
          <div style={{ position: "absolute", left: 40, top: 900 }}>
            <Outro lesson={lesson} start={tl.outro.start} cues={tl.outroCues} width={L.W - 80} />
          </div>
        </>
      ) : null}

      {/* Hook */}
      {inHook ? (
        <Sequence durationInFrames={tl.hook.end}>
          <HookOverlay lesson={lesson} duration={tl.hook.end} width={L.W - 80} />
        </Sequence>
      ) : null}

      {/* Trap videos: "send this" sticker right after the key moment, where viewers still are. */}
      {nudge ? <SendNudge start={nudge.start} duration={nudge.duration} y={1588} /> : null}

      {/* Watermark (also visible on the frame-0 cover); the send sticker briefly takes its place. */}
      {nudge && frame >= nudge.start && frame < nudge.start + nudge.duration ? null : <Watermark y={1628} />}

      {/* Progress bar */}
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 10, width: L.W * (frame / tl.duration), background: theme.green }} />

      <Sounds tl={tl} />
    </AbsoluteFill>
  );
};

const Sounds: React.FC<{ tl: Timeline }> = ({ tl }) => {
  const sfx = (name: string) => staticFile(`sfx/${name}.wav`);
  // Sound effects sit under the voiceover when there is one.
  const v = tl.voice.length ? 0.6 : 1;
  return (
    <>
      {tl.voice.map((c) => (
        <Sequence key={c.key} from={c.from} durationInFrames={c.frames + 6}>
          <Html5Audio src={staticFile(c.file)} volume={1} />
        </Sequence>
      ))}
      <Sequence from={0} durationInFrames={30}>
        <Html5Audio src={sfx("impact")} volume={0.9 * v} />
      </Sequence>
      <Sequence from={tl.hook.end - 6} durationInFrames={20}>
        <Html5Audio src={sfx("whoosh")} volume={0.6 * v} />
      </Sequence>
      {tl.moves.map((m) => {
        const name = /[+#]/.test(m.move.san) ? "check" : m.move.captured ? "capture" : "move";
        return (
          <Sequence key={m.ply} from={m.end - 2} durationInFrames={15}>
            <Html5Audio src={sfx(name)} volume={0.9 * v} />
          </Sequence>
        );
      })}
      {tl.steps.map((s) =>
        s.moves.length ? (
          <Sequence key={`pop-${s.index}`} from={s.settled} durationInFrames={8}>
            <Html5Audio src={sfx("pop")} volume={0.35 * v} />
          </Sequence>
        ) : null,
      )}
      <Sequence from={tl.outro.start} durationInFrames={20}>
        <Html5Audio src={sfx("whoosh")} volume={0.5 * v} />
      </Sequence>
    </>
  );
};
