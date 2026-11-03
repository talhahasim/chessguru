import { useEffect, useMemo, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { PieceType } from "./Pieces3D";

/**
 * "A Beautiful Game" chess set (Khronos glTF sample, CC BY 4.0, see public/models/SOURCES.md).
 * The model is 0.0625 units per square with White at -z; we scale it to 1 unit per square and turn it
 * 180° so it matches our board coordinates (a1 at x = -3.5, z = +3.5, White near the camera).
 */

export const SET_SCALE = 16;
const NODE: Record<PieceType, string> = { k: "King", q: "Queen", r: "Castle", n: "Knight", b: "Bishop", p: "Pawn_Body" };

type Loaded = { scene: THREE.Group; surface: number };

export type Quality = "full" | "lite";

/**
 * "lite" swaps the glass pawn tops (KHR_materials_transmission, which makes three.js draw the whole scene a second
 * time every frame) for a glossy see-through material that looks almost the same and renders much faster.
 */
const liteGlass = (m: THREE.MeshPhysicalMaterial) => {
  const g = new THREE.MeshPhysicalMaterial({
    color: m.color,
    roughness: 0.05,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.55,
    envMapIntensity: 1.6,
  });
  g.name = `${m.name}-lite`;
  return g;
};

const cache: Partial<Record<Quality, Promise<Loaded>>> = {};
const load = (quality: Quality) =>
  (cache[quality] ??= new Promise<Loaded>((resolve, reject) =>
    new GLTFLoader().load(
      staticFile("models/a-beautiful-game.glb"),
      (gltf) => {
        gltf.scene.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            const mat = mesh.material as THREE.MeshPhysicalMaterial;
            if (quality === "lite" && mat?.transmission > 0) mesh.material = liteGlass(mat);
          }
        });
        // Board surface height = where the kings stand.
        const king = gltf.scene.getObjectByName("King_W")!;
        resolve({ scene: gltf.scene, surface: king.position.y });
      },
      undefined,
      reject,
    )));

export const useChessSet = (quality: Quality = "lite") => {
  const [set, setSet] = useState<Loaded | null>(null);
  const [handle] = useState(() => delayRender("Loading the 3D chess set"));
  useEffect(() => {
    load(quality)
      .then((s) => {
        setSet(s);
        continueRender(handle);
      })
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  }, [handle, quality]);
  return set;
};

/** A fresh copy of one piece, centred on its square, standing on y = 0. */
export const usePieceClone = (set: Loaded | null, type: PieceType, color: "w" | "b") =>
  useMemo(() => {
    if (!set) return null;
    const src = set.scene.getObjectByName(`${NODE[type]}_${color.toUpperCase()}1`) ?? set.scene.getObjectByName(`${NODE[type]}_${color.toUpperCase()}`);
    if (!src) return null;
    const obj = src.clone(true);
    obj.position.set(0, src.position.y - set.surface, 0);
    const holder = new THREE.Group();
    holder.add(obj);
    holder.rotation.y = Math.PI;
    holder.scale.setScalar(SET_SCALE);
    return holder;
  }, [set, type, color]);

/** The board alone (pieces removed), aligned with our coordinates, surface at y = 0. */
export const useBoardClone = (set: Loaded | null) =>
  useMemo(() => {
    if (!set) return null;
    const board = set.scene.getObjectByName("Chessboard")!.clone(true);
    board.position.y -= set.surface;
    const holder = new THREE.Group();
    holder.add(board);
    holder.rotation.y = Math.PI;
    holder.scale.setScalar(SET_SCALE);
    return holder;
  }, [set]);
