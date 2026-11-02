import React, { useMemo } from "react";
import * as THREE from "three";

/** Staunton-style chess pieces built from primitives (lathe profiles + a few extras), 1 unit = 1 square. */

export type PieceType = "p" | "n" | "b" | "r" | "q" | "k";

const lathe = (pts: [number, number][], segments = 48) =>
  new THREE.LatheGeometry(
    pts.map(([r, y]) => new THREE.Vector2(r, y)),
    segments,
  );

// Shared base (foot + collar) for every piece.
const BASE: [number, number][] = [
  [0, 0],
  [0.34, 0],
  [0.35, 0.03],
  [0.34, 0.07],
  [0.3, 0.09],
  [0.31, 0.12],
  [0.27, 0.15],
  [0.24, 0.16],
];

const PROFILES: Record<Exclude<PieceType, "n">, [number, number][]> = {
  p: [...BASE, [0.17, 0.22], [0.13, 0.36], [0.11, 0.44], [0.19, 0.47], [0.19, 0.5], [0.1, 0.53], [0, 0.53]],
  r: [...BASE, [0.21, 0.24], [0.19, 0.5], [0.2, 0.58], [0.27, 0.62], [0.27, 0.78], [0.2, 0.78], [0.2, 0.72], [0, 0.72]],
  b: [...BASE, [0.17, 0.24], [0.12, 0.5], [0.1, 0.62], [0.2, 0.66], [0.2, 0.69], [0.1, 0.72], [0, 0.72]],
  q: [...BASE, [0.19, 0.26], [0.13, 0.6], [0.11, 0.78], [0.22, 0.84], [0.22, 0.88], [0.15, 0.9], [0.25, 1.06], [0, 1.0]],
  k: [...BASE, [0.2, 0.26], [0.14, 0.64], [0.12, 0.84], [0.23, 0.9], [0.23, 0.94], [0.15, 0.96], [0.22, 1.12], [0, 1.12]],
};

// Knight head silhouette (side view, x = forward, y = up), extruded sideways.
const knightShape = () => {
  const s = new THREE.Shape();
  // Smooth horse head: chest, muzzle, nose, forehead, ears, mane.
  const pts: [number, number][] = [
    [-0.2, 0.18], [0.2, 0.18], [0.21, 0.3], [0.15, 0.44], [0.17, 0.5], [0.27, 0.56], [0.36, 0.6], [0.39, 0.66],
    [0.36, 0.72], [0.27, 0.76], [0.17, 0.8], [0.1, 0.88], [0.06, 0.98], [0.0, 0.92], [-0.05, 0.99], [-0.1, 0.9],
    [-0.19, 0.84], [-0.26, 0.72], [-0.29, 0.56], [-0.27, 0.4], [-0.23, 0.28],
  ];
  s.moveTo(pts[0][0], pts[0][1]);
  pts.slice(1).forEach(([x, y]) => s.lineTo(x, y));
  s.closePath();
  return s;
};

const useGeometries = () =>
  useMemo(() => {
    const geo: Record<string, THREE.BufferGeometry> = {};
    (Object.keys(PROFILES) as (keyof typeof PROFILES)[]).forEach((k) => (geo[k] = lathe(PROFILES[k])));
    geo.nBase = lathe([...BASE, [0.2, 0.2], [0, 0.2]]);
    const head = new THREE.ExtrudeGeometry(knightShape(), { depth: 0.16, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.06, bevelSegments: 6, curveSegments: 16 });
    head.translate(0, 0, -0.08);
    geo.nHead = head;
    return geo;
  }, []);

export const usePieceMaterials = () =>
  useMemo(
    () => ({
      w: new THREE.MeshPhysicalMaterial({ color: "#f3eee2", roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.25 }),
      b: new THREE.MeshPhysicalMaterial({ color: "#26231f", roughness: 0.28, clearcoat: 0.8, clearcoatRoughness: 0.2, metalness: 0.05 }),
    }),
    [],
  );

export const Piece3D: React.FC<{
  type: PieceType;
  color: "w" | "b";
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  material: THREE.Material;
}> = ({ type, color, position, rotation = [0, 0, 0], scale = 1, material }) => {
  const geo = useGeometries();
  // Profile towards the camera, head turned a little towards the opponent (+x = where the head looks).
  const facing = color === "w" ? 0.5 : Math.PI - 0.5;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {type === "n" ? (
        <>
          <mesh geometry={geo.nBase} material={material} castShadow receiveShadow />
          <mesh geometry={geo.nHead} material={material} rotation={[0, facing, 0]} castShadow />
        </>
      ) : (
        <mesh geometry={geo[type]} material={material} castShadow receiveShadow />
      )}
      {type === "r" &&
        [0, 1, 2, 3].map((i) => (
          <mesh key={i} material={material} position={[Math.cos((i * Math.PI) / 2) * 0.2, 0.82, Math.sin((i * Math.PI) / 2) * 0.2]} castShadow>
            <boxGeometry args={[0.12, 0.1, 0.12]} />
          </mesh>
        ))}
      {type === "b" && (
        <mesh material={material} position={[0, 0.78, 0]} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
        </mesh>
      )}
      {type === "q" &&
        Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} material={material} position={[Math.cos((i * Math.PI) / 4) * 0.22, 1.08, Math.sin((i * Math.PI) / 4) * 0.22]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
          </mesh>
        ))}
      {type === "q" && (
        <mesh material={material} position={[0, 1.07, 0]} castShadow>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
      )}
      {type === "k" && (
        <>
          <mesh material={material} position={[0, 1.24, 0]} castShadow>
            <boxGeometry args={[0.06, 0.24, 0.06]} />
          </mesh>
          <mesh material={material} position={[0, 1.27, 0]} castShadow>
            <boxGeometry args={[0.18, 0.06, 0.06]} />
          </mesh>
        </>
      )}
    </group>
  );
};
