import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ResultBadge } from "./components/MoveBadge";
import { theme } from "./theme";

export type ProfilePicProps = { variant: "king" | "board" };

/**
 * Instagram profile picture for @checksmatedaily (1080x1080, shown as a circle).
 * Same visual language as the videos: chess.com green, cburnett pieces, the red "#" checkmate badge.
 */
export const ProfilePic: React.FC<ProfilePicProps> = ({ variant }) => {
  const king = (
    <div style={{ position: "relative", width: 640, height: 640 }}>
      <Img
        src={staticFile("pieces/wK.svg")}
        style={{ width: 640, height: 640, filter: "drop-shadow(0 26px 30px rgba(0,0,0,0.45))" }}
      />
      <div style={{ position: "absolute", right: 20, top: 40 }}>
        <ResultBadge kind="mated" size={230} />
      </div>
    </div>
  );

  if (variant === "board") {
    const sq = 1080 / 4;
    return (
      <AbsoluteFill>
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: (i % 4) * sq,
              top: Math.floor(i / 4) * sq,
              width: sq,
              height: sq,
              background: ((i % 4) + Math.floor(i / 4)) % 2 === 0 ? theme.light : theme.dark,
            }}
          />
        ))}
        <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 75%)" }} />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>{king}</AbsoluteFill>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 38%, #95c75b 0%, ${theme.green} 45%, #4e7d2c 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {king}
    </AbsoluteFill>
  );
};
