/**
 * Voiceover + captions for the 3D preview (Légal's Mate). `ply` = the move the line starts with (index in LINE);
 * the hook plays over the cover, the outro after the last move. Run `npx tsx scripts/voice-3d.ts` after editing.
 */
export type Line3D = { key: string; caption: string; ply?: number };

export const NARRATION_3D: Line3D[] = [
  { key: "hook", caption: "Give away your *queen*... and *checkmate* two moves later." },
  { key: "pin", caption: "Black pins our knight to the *queen*.", ply: 5 },
  { key: "key", caption: "Knight takes e5... and *leaves the queen!*", ply: 8 },
  { key: "grab", caption: "Black grabs the queen. *Big mistake.*", ply: 9 },
  { key: "check", caption: "Bishop takes f7. *Check!* The king has one square.", ply: 10 },
  { key: "mate", caption: "Knight to d5. *Checkmate!* Three small pieces beat a queen.", ply: 12 },
  { key: "outro", caption: "A new trap every day. Follow @checksmatedaily!" },
];
