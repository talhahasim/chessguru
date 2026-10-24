import React from "react";
import { Composition, Folder } from "remotion";
import { BANDS, LESSONS, compositionId } from "./lessons";
import { buildTimeline, FPS } from "./lib/timeline";
import { getLesson } from "./lessons";
import { TrapVideo, type TrapVideoProps } from "./TrapVideo";
import { ProfilePic, type ProfilePicProps } from "./ProfilePic";
import { Diagram, DIAGRAM_SIZE, type DiagramProps } from "./Diagram";

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="branding">
      <Composition
        id="profile-pic"
        component={ProfilePic}
        width={1080}
        height={1080}
        fps={30}
        durationInFrames={1}
        defaultProps={{ variant: "king" } satisfies ProfilePicProps}
      />
      {/* Board diagrams for the PDF guide (scripts/build-guide.ts). */}
      <Composition
        id="diagram"
        component={Diagram}
        width={DIAGRAM_SIZE}
        height={DIAGRAM_SIZE}
        fps={30}
        durationInFrames={1}
        defaultProps={{ fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1", orientation: "w" } satisfies DiagramProps}
      />
    </Folder>
    {BANDS.map((band) => (
      <Folder key={band} name={`elo-${band}`}>
        {LESSONS.filter((l) => l.band === band).map((lesson) => (
          <Composition
            key={lesson.id}
            id={compositionId(lesson)}
            component={TrapVideo}
            width={1080}
            height={1920}
            fps={FPS}
            durationInFrames={buildTimeline(lesson).duration}
            defaultProps={{ lessonId: lesson.id } satisfies TrapVideoProps}
            calculateMetadata={({ props }) => ({ durationInFrames: buildTimeline(getLesson((props as TrapVideoProps).lessonId)).duration })}
          />
        ))}
      </Folder>
    ))}
  </>
);
