/** Colours taken from chess.com's default "Green" board and dark UI. */
export const theme = {
  bg: "#302e2b",
  bgDeep: "#262421",
  panel: "#21201d",
  text: "#ffffff",
  textMuted: "#c3c2c1",
  textDim: "#8b8987",

  light: "#ebecd0",
  dark: "#739552",
  lightHighlight: "#f5f682",
  darkHighlight: "#b9ca43",

  green: "#81b64c",
  greenShadow: "#45753c",
  blue: "#3f86c4",
  blueShadow: "#285b88",
  red: "#e02828",

  evalWhite: "#ffffff",
  evalBlack: "#403d39",

  bubble: "#ffffff",
  bubbleText: "#312e2b",
};

/** chess.com right-click arrow / square colours. */
export const MARK_COLORS: Record<string, string> = {
  o: "#ffaa00",
  g: "#9fcf3f",
  r: "#f8553f",
  b: "#48c1f9",
  y: "#ffe600",
};

export const SQUARE_MARK_COLORS: Record<string, string> = {
  o: "rgba(255, 170, 0, 0.75)",
  g: "rgba(172, 206, 89, 0.8)",
  r: "rgba(235, 97, 80, 0.8)",
  b: "rgba(82, 176, 220, 0.8)",
  y: "rgba(255, 230, 0, 0.75)",
};

export const parseMark = (mark: string) => {
  const m = /^(?:([ogrby]):)?([a-h][1-8])([a-h][1-8])?$/.exec(mark);
  if (!m) throw new Error(`Bad mark "${mark}"`);
  return { color: m[1] ?? "o", from: m[2], to: m[3] ?? null };
};

export const BAND_LABEL: Record<string, string> = {
  "0-300": "0–300",
  "300-600": "300–600",
  "600-900": "600–900",
  "900-1500": "900–1500",
};
