import React from "react";
import { AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Chess } from "chess.js";
import { type PieceType } from "./Pieces3D";
import { useChessSet, type Quality } from "./ChessSet";
import { Board, ease, Environment, PieceModel, pop, type SetData, SquareGlow, sqPos, Stars } from "./Trap3D";
import { KindPill } from "../components/Scenes";
import { CLASS_INFO } from "../lib/classes";
import { fontFamily } from "../fonts";
import { theme } from "../theme";
import { HANDLE } from "../brand";
import { getLesson } from "../lessons";
import type { Lesson } from "../types";
import voiceData from "../data/voice.json";

/**
 * "Brilliant or blunder?" quiz on the 3D board, built from any quiz lesson (moves, hook, captions and the lesson's
 * own voice clips from src/data/voice.json). Like the 2D quiz it never reveals the answer: neutral yellow marks,
 * no badges, quiz outro. Frame 0 = the finished cover (position after the question move).
 */

type Clip = { text: string; file: string; seconds: number };
const FPS = 30;
const QUESTION = "#ffd84a";

type Track = { type: PieceType; color: "w" | "b" };
type Move = { start: number; end: number; from: string; to: string; id: number; captured?: number; san: string };
type Cue = { key: string; from: number; frames: number; caption?: string };

export const buildQuiz3D = (lesson: Lesson) => {
  const clips = ((voiceData.lessons as Record<string, Record<string, Clip>>)[lesson.id] ?? {}) as Record<string, Clip>;
  const frames = (key: string) => Math.ceil((clips[key]?.seconds ?? 1.5) * FPS);
  const c = new Chess(lesson.startFen);
  const at: Record<string, number> = {};
  const pieces: Track[] = [];
  const start: Record<number, string> = {};
  c.board().forEach((row) =>
    row.forEach((p) => {
      if (!p) return;
      at[p.square] = pieces.length;
      start[pieces.length] = p.square;
      pieces.push({ type: p.type as PieceType, color: p.color });
    }),
  );

  const hook = Math.max(75, 2 + frames("hook") + 10);
  const movesStart = hook + 14;
  const cues: Cue[] = [{ key: "hook", from: 2, frames: frames("hook") }];
  const moves: Move[] = [];
  let t = movesStart;
  let busy = 0;
  const lastStep = lesson.steps.length - 1;
  lesson.steps.forEach((step, si) => {
    t = Math.max(t, busy);
    const key = `step-${si}`;
    cues.push({ key, from: t, frames: frames(key), caption: step.say });
    busy = t + frames(key) + 6;
    const sans = step.moves ?? [];
    sans.forEach((san, mi) => {
      const question = si === lastStep && mi === sans.length - 1;
      const len = question ? 42 : 13;
      const m = c.move(san);
      const id = at[m.from];
      const captured = m.captured ? at[m.to] : undefined;
      delete at[m.from];
      at[m.to] = id;
      moves.push({ start: t, end: t + len, from: m.from, to: m.to, id, captured, san: m.san });
      t += len + (question ? 0 : 6);
    });
  });
  const question = moves[moves.length - 1];
  const end = Math.max(t + 30, busy + 12);
  const outro = Math.max(105, frames("cta") + 36);
  cues.push({ key: "cta", from: end + 8, frames: frames("cta") });
  return { lesson, clips, pieces, start, moves, question, finalAt: { ...at }, hook, movesStart, end, outro, cues, duration: end + outro };
};

type Quiz = ReturnType<typeof buildQuiz3D>;

const piecePositions = (q: Quiz, frame: number) => {
  const out: Record<number, { x: number; y: number; z: number; spin: number; scale: number; tilt: number }> = {};
  if (frame < q.movesStart) {
    Object.entries(q.finalAt).forEach(([sq, id]) => {
      const [x, z] = sqPos(sq);
      out[id] = { x, y: 0, z, spin: 0, scale: 1, tilt: 0 };
    });
    return out;
  }
  const where: Record<number, string> = { ...q.start };
  const gone = new Set<number>();
  for (const m of q.moves) {
    if (frame < m.start) break;
    const k = Math.min(1, (frame - m.start) / (m.end - m.start));
    if (m.captured !== undefined && k >= 0.55) {
      const f = (frame - m.start - 0.55 * (m.end - m.start)) / 18;
      const [x, z] = sqPos(m.to);
      if (f < 1) out[m.captured] = { x: x + f * 2.5, y: f * 3, z: z - f * 1.5, spin: f * 6, scale: 1 - f, tilt: f * 2 };
      gone.add(m.captured);
    }
    if (k < 1) {
      const [x0, z0] = sqPos(m.from);
      const [x1, z1] = sqPos(m.to);
      const e = ease(k);
      const hop = Math.sin(Math.PI * k) * (m.san.startsWith("N") ? 0.9 : 0.35);
      out[m.id] = { x: x0 + (x1 - x0) * e, y: hop, z: z0 + (z1 - z0) * e, spin: 0, scale: 1, tilt: 0 };
      where[m.id] = "moving";
    } else where[m.id] = m.to;
  }
  Object.entries(where).forEach(([id, sq]) => {
    const n = Number(id);
    if (sq === "moving" || gone.has(n) || out[n]) return;
    const [x, z] = sqPos(sq);
    out[n] = { x, y: 0, z, spin: 0, scale: 1, tilt: 0 };
  });
  return out;
};

type Cam = { theta: number; phi: number; dist: number; tx: number; tz: number };
const camAt = (q: Quiz, frame: number): Cam => {
  const base = q.lesson.hero === "b" ? Math.PI : 0;
  const [qx, qz] = sqPos(q.question.to);
  const keys: [number, Cam][] = [
    [0, { theta: base - 0.22, phi: 1.12, dist: 16.5, tx: 0, tz: 0 }],
    [q.hook, { theta: base - 0.12, phi: 1.12, dist: 16, tx: 0, tz: 0 }],
    [q.movesStart, { theta: base, phi: 0.92, dist: 14, tx: 0, tz: 0 }],
    [q.question.start, { theta: base + 0.1, phi: 0.88, dist: 13, tx: 0, tz: 0 }],
    [q.question.end + 6, { theta: base + 0.35, phi: 0.8, dist: 9.5, tx: qx * 0.6, tz: qz * 0.6 }],
    [q.end, { theta: base + 0.55, phi: 0.78, dist: 9.8, tx: qx * 0.6, tz: qz * 0.6 }],
    [q.duration, { theta: base + 0.9, phi: 0.85, dist: 12, tx: 0, tz: 0 }],
  ];
  const i = keys.findIndex(([f]) => f > frame);
  if (i === -1) return keys[keys.length - 1][1];
  if (i === 0) return keys[0][1];
  const [f0, a] = keys[i - 1];
  const [f1, b] = keys[i];
  if (f0 === q.hook) return frame < q.movesStart ? a : b; // hard cut from the cover to the start position
  const k = ease(Math.min(1, (frame - f0) / Math.max(1, f1 - f0)));
  const mix = (p: number, r: number) => p + (r - p) * k;
  return { theta: mix(a.theta, b.theta), phi: mix(a.phi, b.phi), dist: mix(a.dist, b.dist), tx: mix(a.tx, b.tx), tz: mix(a.tz, b.tz) };
};

const CameraRig: React.FC<{ q: Quiz }> = ({ q }) => {
  const frame = useCurrentFrame();
  const { camera } = useThree();
  const c = camAt(q, frame);
  camera.position.set(c.tx + c.dist * Math.cos(c.phi) * Math.sin(c.theta), c.dist * Math.sin(c.phi), c.tz + c.dist * Math.cos(c.phi) * Math.cos(c.theta));
  camera.lookAt(c.tx, 0, c.tz);
  return null;
};

const Scene: React.FC<{ q: Quiz; set: SetData; shadowSize: number }> = ({ q, set, shadowSize }) => {
  const frame = useCurrentFrame();
  const pos = piecePositions(q, frame);
  const cover = frame < q.movesStart;
  const last = cover ? q.question : [...q.moves].reverse().find((m) => frame >= m.end);
  const isQuestion = last === q.question;
  const pulse = isQuestion ? 0.55 + 0.25 * Math.sin((frame - q.question.end) / 6) : 0;
  return (
    <>
      <color attach="background" args={["#1f1d1b"]} />
      <fog attach="fog" args={["#1f1d1b", 14, 30]} />
      <CameraRig q={q} />
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#fff8e8", "#2a2420", 0.6]} />
      <directionalLight
        position={[-5, 11, 6]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0004}
      />
      <spotLight position={[6, 6, -8]} intensity={40} angle={0.6} penumbra={0.8} color="#9fd4ff" />
      <Environment />
      <Board set={set} />
      {last && !isQuestion && <SquareGlow sq={last.from} color={theme.lightHighlight} opacity={0.55} />}
      {last && !isQuestion && <SquareGlow sq={last.to} color={theme.lightHighlight} opacity={0.65} />}
      {isQuestion && <SquareGlow sq={q.question.from} color={QUESTION} opacity={cover ? 0.6 : pulse * 0.8} y={0.01} />}
      {isQuestion && <SquareGlow sq={q.question.to} color={QUESTION} opacity={cover ? 0.8 : pulse} y={0.01} />}
      {Object.entries(pos).map(([id, p]) => {
        const t = q.pieces[Number(id)];
        return <PieceModel key={id} set={set} type={t.type} color={t.color} position={[p.x, p.y, p.z]} rotation={[p.tilt, p.spin, 0]} scale={p.scale} />;
      })}
    </>
  );
};

const Overlay: React.FC<{ q: Quiz }> = ({ q }) => {
  const frame = useCurrentFrame();
  const text: React.CSSProperties = { fontFamily, fontWeight: 900, color: "#fff", textAlign: "center", textShadow: "0 6px 24px rgba(0,0,0,0.85)", lineHeight: 1.1 };
  const cover = frame < q.movesStart;
  const outro = frame >= q.end;
  const steps = q.cues.filter((c) => c.caption);
  const option = (label: string, glyph: string, color: string, at: number) => (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, background: color, borderRadius: 20, padding: "22px 0", fontFamily, fontWeight: 900, fontSize: 52, color: "#fff", transform: `scale(${pop(frame, q.end + at)})`, boxShadow: "0 8px 0 rgba(0,0,0,0.3)" }}>
      <span style={{ fontSize: 58 }}>{glyph}</span>
      {label}
    </div>
  );
  return (
    <AbsoluteFill>
      {cover && (
        <>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.8) 100%)" }} />
          <div style={{ position: "absolute", top: 270, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <KindPill kind="quiz" scale={1.1} />
          </div>
          <div style={{ position: "absolute", top: 360, left: 50, right: 50, ...text, fontSize: 90, transform: `scale(${interpolate(frame, [0, 10], [1.12, 1], { extrapolateRight: "clamp" })})` }}>
            <Stars text={q.lesson.hook[0]} size={90} />
          </div>
          <div style={{ position: "absolute", top: 1380, left: 40, right: 40, ...text, fontSize: 84 }}>
            <Stars text={q.lesson.hook[1]} size={84} />
          </div>
        </>
      )}
      {!cover && !outro && (
        <div style={{ position: "absolute", top: 120, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <KindPill kind="quiz" />
        </div>
      )}
      {!outro &&
        steps.map((c, i) =>
          frame >= c.from && frame < (steps[i + 1]?.from ?? q.end) ? (
            <div key={c.key} style={{ position: "absolute", top: 1400, left: 60, right: 60, ...text, fontSize: 60 }}>
              <Stars text={c.caption!} size={60} />
            </div>
          ) : null,
        )}
      {outro && (
        <>
          <AbsoluteFill style={{ background: "rgba(0,0,0,0.55)" }} />
          <div style={{ position: "absolute", top: 640, left: 70, right: 70, display: "flex", flexDirection: "column", gap: 34, alignItems: "stretch" }}>
            <div style={{ ...text, fontSize: 64, letterSpacing: 2, transform: `scale(${pop(frame, q.end)})` }}>WHAT DO YOU THINK?</div>
            <div style={{ display: "flex", gap: 26 }}>
              {option("Brilliant", "!!", CLASS_INFO.brilliant.color, 4)}
              {option("Blunder", "??", CLASS_INFO.blunder.color, 10)}
            </div>
            <div style={{ ...text, fontSize: 52, color: "#ffe14d", opacity: interpolate(frame - q.end, [16, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>Comment your answer!</div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
              <div style={{ fontFamily, fontWeight: 900, fontSize: 54, color: "#fff", background: theme.green, boxShadow: `0 8px 0 ${theme.greenShadow}`, borderRadius: 18, padding: "16px 40px", transform: `scale(${pop(frame, q.end + 30)})` }}>
                Follow @{HANDLE}
              </div>
            </div>
          </div>
        </>
      )}
      <div style={{ position: "absolute", top: 1600, left: 0, right: 0, textAlign: "center", fontFamily, fontWeight: 700, fontSize: 34, color: "rgba(255,255,255,0.4)" }}>@{HANDLE}</div>
    </AbsoluteFill>
  );
};

const sfx = (name: string) => staticFile(`sfx/${name}.wav`);

export type Quiz3DProps = { lessonId: string; quality?: Quality };

export const quiz3DDuration = (lessonId: string) => buildQuiz3D(getLesson(lessonId)).duration;

export const Quiz3D: React.FC<Quiz3DProps> = ({ lessonId, quality = "lite" }) => {
  const { width, height } = useVideoConfig();
  const q = React.useMemo(() => buildQuiz3D(getLesson(lessonId)), [lessonId]);
  const set = useChessSet(quality); // load the model before the canvas exists
  return (
    <AbsoluteFill style={{ background: "#1f1d1b" }}>
      {set && (
        <ThreeCanvas width={width} height={height} shadows camera={{ fov: 60, near: 0.1, far: 100 }} gl={{ antialias: true, preserveDrawingBuffer: true }}>
          <Scene q={q} set={set} shadowSize={quality === "full" ? 2048 : 1024} />
        </ThreeCanvas>
      )}
      <Overlay q={q} />
      {q.cues.map((c) =>
        q.clips[c.key] ? (
          <Sequence key={c.key} from={c.from} durationInFrames={c.frames + 10}>
            <Html5Audio src={staticFile(q.clips[c.key].file)} volume={1} />
          </Sequence>
        ) : null,
      )}
      <Sequence from={q.hook + 8} durationInFrames={20}>
        <Html5Audio src={sfx("whoosh")} volume={0.6} />
      </Sequence>
      {q.moves.map((m, i) => (
        <Sequence key={i} from={m.end - 2} durationInFrames={40}>
          <Html5Audio src={sfx(m.san.includes("#") ? "mate" : m.san.includes("+") ? "check" : m.captured !== undefined ? "capture" : "move")} volume={0.9} />
        </Sequence>
      ))}
      <Sequence from={q.end + 4} durationInFrames={30}>
        <Html5Audio src={sfx("pop")} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  );
};
