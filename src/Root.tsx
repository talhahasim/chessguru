import React from "react";
import { Composition, Folder } from "remotion";
import { BANDS, LESSONS, compositionId } from "./lessons";
import { buildTimeline, FPS } from "./lib/timeline";
import { getLesson } from "./lessons";
import { TrapVideo, type TrapVideoProps } from "./TrapVideo";
import { ProfilePic, type ProfilePicProps } from "./ProfilePic";

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
