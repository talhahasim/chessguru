import React, { useMemo } from "react";
import { AbsoluteFill, Easing, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Chess } from "chess.js";
import * as THREE from "three";
import { Piece3D, usePieceMaterials, type PieceType } from "./Pieces3D";
import { KindPill } from "../components/Scenes";
import { fontFamily } from "../fonts";
import { theme } from "../theme";
import { HANDLE } from "../brand";

/**
 * 3D preview (experiment): Légal's Mate on a real-looking board with camera moves, slow motion on the key move,
 * glow, a toppling king and a particle burst. Not part of the posting queue.
 */

const LINE = ["e4", "e5", "Nf3", "d6", "Bc4", "Bg4", "Nc3", "g6", "Nxe5", "Bxd1", "Bxf7+", "Ke7", "Nd5#"];
const KEY = 8; // index of Nxe5

// Frames per ply: fast setup, slow key move, dramatic finish.
const PLY_FRAMES = [12, 12, 12, 12, 12, 12, 12, 12, 46, 30, 30, 22, 40];
const HOOK = 70;
const GAP_AFTER = [6, 6, 6, 6, 6, 6, 6, 14, 20, 16, 12, 8, 55]; // last: hold on the mate before the outro
const OUTRO = 75;

type Track = { id: number; type: PieceType; color: "w" | "b" };
type Move = { start: number; end: number; from: string; to: string; id: number; captured?: number; san: string };

const sqPos = (sq: string): [number, number] => ["abcdefgh".indexOf(sq[0]) - 3.5, 3.5 - (Number(sq[1]) - 1)];

const buildGame = () => {
  const c = new Chess();
  const at: Record<string, number> = {};
  const pieces: Track[] = [];
  const start: Record<number, string> = {};
  c.board().forEach((row) =>
    row.forEach((p) => {
      if (!p) return;
      const id = pieces.length;
      pieces.push({ id, type: p.type as PieceType, color: p.color });
      at[p.square] = id;
      start[id] = p.square;
    }),
  );
  const moves: Move[] = [];
  let t = HOOK + 18;
  LINE.forEach((san, i) => {
    const m = c.move(san);
    const id = at[m.from];
    const captured = m.captured ? at[m.to] : undefined;
    delete at[m.from];
    at[m.to] = id;
    moves.push({ start: t, end: t + PLY_FRAMES[i], from: m.from, to: m.to, id, captured, san: m.san });
    t += PLY_FRAMES[i] + GAP_AFTER[i];
  });
  const finalFen = c.fen();
  const finalAt = { ...at };
  return { pieces, start, moves, finalAt, end: t, finalFen };
};

export const GAME = buildGame();
export const TRAP3D_DURATION = GAME.end + OUTRO;

const ease = Easing.bezier(0.45, 0, 0.25, 1);

/** Where every piece is at `frame` (hook = final position). */
const piecePositions = (frame: number) => {
  const out: Record<number, { x: number; y: number; z: number; spin: number; scale: number; tilt: number }> = {};
  if (frame < HOOK + 18) {
    Object.entries(GAME.finalAt).forEach(([sq, id]) => {
      const [x, z] = sqPos(sq);
      out[id] = { x, y: 0, z, spin: 0, scale: 1, tilt: 0 };
    });
  } else {
    const where: Record<number, string> = { ...GAME.start };
    const gone = new Set<number>();
    for (const m of GAME.moves) {
      if (frame < m.start) break;
      const k = Math.min(1, (frame - m.start) / (m.end - m.start));
      if (m.captured !== undefined) {
        if (k >= 0.55) {
          // Captured piece flies up and away, spinning.
          const f = (frame - m.start - 0.55 * (m.end - m.start)) / 18;
          const [x, z] = sqPos(m.to);
          if (f < 1) out[m.captured] = { x: x + f * 2.5, y: f * 3, z: z - f * 1.5, spin: f * 6, scale: 1 - f, tilt: f * 2 };
          gone.add(m.captured);
        }
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
      if (GAME.moves.some((m) => m.captured === n && frame >= m.start + 0.55 * (m.end - m.start))) return;
      const [x, z] = sqPos(sq);
      out[n] = { x, y: 0, z, spin: 0, scale: 1, tilt: 0 };
    });
  }
  return out;
};

const lastMove = (frame: number) => [...GAME.moves].reverse().find((m) => frame >= m.end);
const mateMove = GAME.moves[GAME.moves.length - 1];
const keyMove = GAME.moves[KEY];

/** Camera: orbit (theta), height angle (phi), distance, look-at target, all keyframed. */
type Cam = { theta: number; phi: number; dist: number; tx: number; tz: number };
const CAMS: [number, Cam][] = [
  [0, { theta: -0.3, phi: 1.02, dist: 14.5, tx: 0, tz: -0.2 }],
  [HOOK, { theta: -0.18, phi: 1.02, dist: 14, tx: 0, tz: -0.2 }],
  [HOOK + 18, { theta: 0, phi: 0.9, dist: 14, tx: 0, tz: 0.3 }],
  [keyMove.start - 6, { theta: 0.08, phi: 0.88, dist: 13.5, tx: 0, tz: 0.3 }],
  [keyMove.end, { theta: 0.3, phi: 0.62, dist: 7.5, tx: 0.5, tz: -0.2 }],
  [GAME.moves[KEY + 1].end + 6, { theta: 0.1, phi: 0.8, dist: 10, tx: -0.2, tz: 1.2 }],
  [GAME.moves[KEY + 3].end, { theta: -0.35, phi: 0.75, dist: 9.5, tx: 0.3, tz: -1.6 }],
  [mateMove.end + 10, { theta: -0.75, phi: 0.6, dist: 7.5, tx: 0.5, tz: -2.2 }],
  [GAME.end + OUTRO, { theta: -1.05, phi: 0.7, dist: 9, tx: 0.5, tz: -2 }],
];
const camAt = (frame: number): Cam => {
  let i = CAMS.findIndex(([f]) => f > frame);
  if (i === -1) return CAMS[CAMS.length - 1][1];
  if (i === 0) return CAMS[0][1];
  const [f0, a] = CAMS[i - 1];
  const [f1, b] = CAMS[i];
  // Hard cut from the hook to the start position.
  if (f0 === HOOK) return frame < HOOK + 18 ? a : b;
  const k = ease(Math.min(1, (frame - f0) / Math.max(1, f1 - f0)));
  const mix = (p: number, q: number) => p + (q - p) * k;
  return { theta: mix(a.theta, b.theta), phi: mix(a.phi, b.phi), dist: mix(a.dist, b.dist), tx: mix(a.tx, b.tx), tz: mix(a.tz, b.tz) };
};

const CameraRig: React.FC = () => {
  const frame = useCurrentFrame();
  const { camera } = useThree();
  const c = camAt(frame);
  camera.position.set(c.tx + c.dist * Math.cos(c.phi) * Math.sin(c.theta), c.dist * Math.sin(c.phi), c.tz + c.dist * Math.cos(c.phi) * Math.cos(c.theta));
  camera.lookAt(c.tx, 0, c.tz);
  return null;
};

const Board: React.FC = () => {
  const squares = useMemo(() => {
    const out: { x: number; z: number; light: boolean }[] = [];
    for (let f = 0; f < 8; f++) for (let r = 0; r < 8; r++) out.push({ x: f - 3.5, z: 3.5 - r, light: (f + r) % 2 === 1 });
    return out;
  }, []);
  return (
    <group>
      {squares.map((s, i) => (
        <mesh key={i} position={[s.x, -0.05, s.z]} receiveShadow>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color={s.light ? theme.light : theme.dark} roughness={0.55} />
        </mesh>
      ))}
      <mesh position={[0, -0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[8.9, 0.3, 8.9]} />
        <meshStandardMaterial color="#4a2f1b" roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.36, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#1b1a18" roughness={0.9} />
      </mesh>
    </group>
  );
};

/** Flat glowing square marks (last move, brilliant, check). */
const SquareGlow: React.FC<{ sq: string; color: string; opacity: number; y?: number }> = ({ sq, color, opacity, y = 0.006 }) => {
  const [x, z] = sqPos(sq);
  return (
    <mesh position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

const Ring: React.FC<{ sq: string; color: string; k: number }> = ({ sq, color, k }) => {
  const [x, z] = sqPos(sq);
  return (
    <mesh position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]} scale={0.6 + k * 1.6}>
      <ringGeometry args={[0.4, 0.5, 48]} />
      <meshBasicMaterial color={color} transparent opacity={Math.max(0, 1 - k)} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
};

// Deterministic particle burst for the mate.
const PARTICLES = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => {
    const s = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };
  return { vx: (r(1) - 0.5) * 5, vy: 3 + r(2) * 5, vz: (r(3) - 0.5) * 5, size: 0.05 + r(4) * 0.08, gold: r(5) > 0.35 };
});

const Burst: React.FC<{ origin: [number, number]; t: number }> = ({ origin, t }) => (
  <group position={[origin[0], 0.6, origin[1]]}>
    {PARTICLES.map((p, i) => {
      const y = p.vy * t - 4.9 * t * t;
      if (y < -0.6) return null;
      return (
        <mesh key={i} position={[p.vx * t, y, p.vz * t]} rotation={[t * 8 + i, t * 6, 0]}>
          <boxGeometry args={[p.size, p.size, p.size]} />
          <meshBasicMaterial color={p.gold ? "#ffd54a" : "#ffffff"} />
        </mesh>
      );
    })}
  </group>
);

const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mats = usePieceMaterials();
  const pos = piecePositions(frame);
  const last = frame >= HOOK + 18 ? lastMove(frame) : mateMove;
  const keyK = (frame - keyMove.end) / 30;
  const check = frame >= GAME.moves[KEY + 2].end && frame < GAME.moves[KEY + 3].start;
  const mated = frame >= mateMove.end || frame < HOOK + 18;
  const blackKingId = GAME.finalAt[Object.keys(GAME.finalAt).find((sq) => GAME.pieces[GAME.finalAt[sq]].type === "k" && GAME.pieces[GAME.finalAt[sq]].color === "b")!];
  const kingSq = mated ? "e7" : check ? "e8" : null;
  const topple = frame >= mateMove.end ? interpolate(frame - mateMove.end, [8, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bounce }) : 0;
  const burstT = (frame - mateMove.end - 8) / fps;

  return (
    <>
      <color attach="background" args={["#1f1d1b"]} />
      <fog attach="fog" args={["#1f1d1b", 14, 30]} />
      <CameraRig />
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#fff8e8", "#2a2420", 0.6]} />
      <directionalLight
        position={[-5, 11, 6]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0004}
      />
      <spotLight position={[6, 6, -8]} intensity={40} angle={0.6} penumbra={0.8} color="#9fd4ff" />
      {keyK > -1.5 && keyK < 1.5 && <pointLight position={[0.5, 1.2, -0.5]} intensity={keyK < 0 ? 0 : 25 * (1 - keyK / 1.5)} color="#1baca6" distance={5} />}
      <Board />
      {last && <SquareGlow sq={last.from} color={theme.lightHighlight} opacity={0.55} />}
      {last && <SquareGlow sq={last.to} color={theme.lightHighlight} opacity={0.65} />}
      {keyK >= 0 && keyK < 1.6 && <SquareGlow sq="e5" color="#1baca6" opacity={0.75 * Math.min(1, 1.6 - keyK)} y={0.01} />}
      {keyK >= 0 && keyK < 1 && <Ring sq="e5" color="#3ee6dc" k={keyK} />}
      {keyK >= 0.25 && keyK < 1.25 && <Ring sq="e5" color="#3ee6dc" k={keyK - 0.25} />}
      {kingSq && <SquareGlow sq={kingSq} color={theme.red} opacity={0.75} y={0.012} />}
      {Object.entries(pos).map(([id, p]) => {
        const t = GAME.pieces[Number(id)];
        const isMatedKing = Number(id) === blackKingId && mated && frame >= HOOK + 18;
        return (
          <Piece3D
            key={id}
            type={t.type}
            color={t.color}
            position={[p.x, p.y, p.z]}
            rotation={[p.tilt + (isMatedKing ? topple * 1.45 : 0), p.spin, isMatedKing ? topple * 0.3 : 0]}
            scale={p.scale}
            material={mats[t.color]}
          />
        );
      })}
      {burstT > 0 && burstT < 2.2 && <Burst origin={sqPos("e7")} t={burstT} />}
    </>
  );
};

const Stars: React.FC<{ text: string; size: number }> = ({ text, size }) => (
  <>
    {text.split(/(\*[^*]+\*)/).map((part, i) =>
      part.startsWith("*") ? (
        <span key={i} style={{ color: "#ffd84a" }}>
          {part.slice(1, -1)}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    )}
  </>
);

const pop = (frame: number, at: number) => interpolate(frame - at, [0, 6, 10], [0.4, 1.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const text: React.CSSProperties = { fontFamily, fontWeight: 900, color: "#fff", textAlign: "center", textShadow: "0 6px 24px rgba(0,0,0,0.85)", lineHeight: 1.1 };
  const banner = (label: string, color: string, at: number, until: number, size = 96) =>
    frame >= at && frame < until ? (
      <div style={{ position: "absolute", top: 1240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ ...text, fontSize: size, color, transform: `scale(${pop(frame, at)})`, WebkitTextStroke: "3px rgba(0,0,0,0.35)" }}>{label}</div>
      </div>
    ) : null;
  const caption = (label: string, at: number, until: number) =>
    frame >= at && frame < until ? (
      <div style={{ position: "absolute", top: 1420, left: 60, right: 60, ...text, fontSize: 58 }}>
        <Stars text={label} size={58} />
      </div>
    ) : null;
  const hook = frame < HOOK + 18;
  const outro = frame >= GAME.end;
  return (
    <AbsoluteFill>
      {hook && (
        <>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.8) 100%)" }} />
          <div style={{ position: "absolute", top: 270, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <KindPill kind="trap" scale={1.1} />
          </div>
          <div style={{ position: "absolute", top: 360, left: 50, right: 50, ...text, fontSize: 92, transform: `scale(${interpolate(frame, [0, 10], [1.12, 1], { extrapolateRight: "clamp" })})` }}>
            <Stars text="Give away your *queen*..." size={92} />
          </div>
          <div style={{ position: "absolute", top: 1330, left: 50, right: 50, ...text, fontSize: 80 }}>
            <Stars text="...and *checkmate* 2 moves later." size={80} />
          </div>
        </>
      )}
      {!hook && !outro && (
        <div style={{ position: "absolute", top: 120, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
          <KindPill kind="trap" />
          <div style={{ ...text, fontSize: 56 }}>Légal's Mate</div>
        </div>
      )}
      {caption("Black pins our knight to the *queen*.", GAME.moves[5].start, GAME.moves[KEY].start)}
      {caption("Knight takes e5... and *leaves the queen!*", keyMove.start, keyMove.end + 26)}
      {banner("!! BRILLIANT", "#3ee6dc", keyMove.end, keyMove.end + 26, 104)}
      {caption("Black grabs the queen. *Big mistake.*", GAME.moves[KEY + 1].start, GAME.moves[KEY + 2].start)}
      {banner("CHECK!", "#ff5a4f", GAME.moves[KEY + 2].end, GAME.moves[KEY + 3].start + 4)}
      {caption("Bishop takes f7. The king has *one square*.", GAME.moves[KEY + 2].start, mateMove.start)}
      {banner("CHECKMATE", "#ffd84a", mateMove.end, GAME.end, 120)}
      {caption("Three small pieces *beat a queen.*", mateMove.end + 14, GAME.end)}
      {frame >= mateMove.end && frame < mateMove.end + 6 && <AbsoluteFill style={{ background: "#fff", opacity: 1 - (frame - mateMove.end) / 6 }} />}
      {outro && (
        <>
          <AbsoluteFill style={{ background: "rgba(0,0,0,0.55)" }} />
          <div style={{ position: "absolute", top: 760, left: 60, right: 60, ...text, fontSize: 78, transform: `scale(${pop(frame, GAME.end)})` }}>
            <Stars text="A new trap *every day*" size={78} />
          </div>
          <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <div style={{ fontFamily, fontWeight: 900, fontSize: 60, color: "#fff", background: theme.green, boxShadow: `0 8px 0 ${theme.greenShadow}`, borderRadius: 18, padding: "18px 44px", transform: `scale(${pop(frame, GAME.end + 8)})` }}>
              Follow @{HANDLE}
            </div>
          </div>
        </>
      )}
      <div style={{ position: "absolute", top: 1600, left: 0, right: 0, textAlign: "center", fontFamily, fontWeight: 700, fontSize: 34, color: "rgba(255,255,255,0.4)" }}>@{HANDLE}</div>
    </AbsoluteFill>
  );
};

const sfx = (name: string) => staticFile(`sfx/${name}.wav`);

export const Trap3D: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#1f1d1b" }}>
      <ThreeCanvas width={width} height={height} shadows camera={{ fov: 60, near: 0.1, far: 100 }} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Scene />
      </ThreeCanvas>
      <Overlay />
      <Sequence from={HOOK + 12} durationInFrames={20}>
        <Html5Audio src={sfx("whoosh")} volume={0.6} />
      </Sequence>
      {GAME.moves.map((m, i) => {
        const name = m.san.includes("#") ? "mate" : m.san.includes("+") ? "check" : m.captured !== undefined ? "capture" : "move";
        return (
          <Sequence key={i} from={m.end - 2} durationInFrames={40}>
            <Html5Audio src={sfx(name)} volume={0.9} />
          </Sequence>
        );
      })}
      <Sequence from={keyMove.end} durationInFrames={30}>
        <Html5Audio src={sfx("pop")} volume={0.7} />
      </Sequence>
      <Sequence from={mateMove.end} durationInFrames={40}>
        <Html5Audio src={sfx("impact")} volume={0.9} />
      </Sequence>
      <Sequence from={GAME.end + 8} durationInFrames={30}>
        <Html5Audio src={sfx("pop")} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  );
};
