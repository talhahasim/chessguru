import type { Classification } from "../types";

/** chess.com game-review colours and labels. */
export const CLASS_INFO: Record<Classification, { color: string; label: string; glyph: string }> = {
  brilliant: { color: "#1baca6", label: "brilliant", glyph: "!!" },
  great: { color: "#5c8bb0", label: "a great move", glyph: "!" },
  best: { color: "#81b64c", label: "best", glyph: "★" },
  excellent: { color: "#81b64c", label: "excellent", glyph: "👍" },
  good: { color: "#95b776", label: "good", glyph: "✓" },
  book: { color: "#d5a47d", label: "a book move", glyph: "book" },
  inaccuracy: { color: "#f7c631", label: "an inaccuracy", glyph: "?!" },
  mistake: { color: "#ffa459", label: "a mistake", glyph: "?" },
  blunder: { color: "#fa412d", label: "a blunder", glyph: "??" },
  miss: { color: "#ff7769", label: "a miss", glyph: "✕" },
};
