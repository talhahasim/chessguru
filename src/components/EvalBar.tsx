import React from "react";
import { evalBarFill, evalText, whiteIsBetter } from "../lib/evals";
import { theme } from "../theme";
import type { Color, WhiteEval } from "../types";
import { fontFamily } from "../fonts";

export const EvalBar: React.FC<{ width: number; height: number; orientation: Color; fill: number; label: WhiteEval }> = ({
  width,
  height,
  orientation,
  fill,
  label,
}) => {
  const whiteH = height * fill;
  const whiteBetter = whiteIsBetter(label);
  // White fills from the bottom when we look from White's side.
  const whiteAtBottom = orientation === "w";
  const textAtBottom = whiteBetter === whiteAtBottom;
  return (
    <div style={{ position: "relative", width, height, background: theme.evalBlack, borderRadius: 4, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: whiteH,
          [whiteAtBottom ? "bottom" : "top"]: 0,
          background: theme.evalWhite,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 2,
          background: "rgba(214, 79, 0, 0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          [textAtBottom ? "bottom" : "top"]: 8,
          textAlign: "center",
          fontFamily,
          fontWeight: 800,
          fontSize: width * 0.38,
          color: whiteBetter ? theme.evalBlack : theme.evalWhite,
        }}
      >
        {evalText(label)}
      </div>
    </div>
  );
};

export const fillOf = evalBarFill;
