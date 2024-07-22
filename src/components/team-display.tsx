import React, { useContext, useMemo } from "react";

import { DebateContext } from "@/App.tsx";
import { Side } from "@/types/side.ts";
import TimeDisplay from "@/components/time-display.tsx";

interface TeamTimesProps {
  side: Side;
  speakerClicked: (index: number) => void;
}

const TeamDisplay: React.FC<TeamTimesProps> = ({ side, speakerClicked }) => {
  const { debate } = useContext(DebateContext);

  const teamSpeakers = useMemo(() => {
    return debate.configuration === null
      ? []
      : debate.configuration.speakers
          .map((speaker, index) => {
            return { ...speaker, index: index };
          })
          .filter((speaker) => speaker.side === side);
  }, [side, debate]);

  return (
    <div style={{ width: "100%" }}>
      <h1>{side === Side.AFFIRMATIVE ? "Affirmative" : "Negative"}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {[...Array(teamSpeakers.length).keys()].map((value) => {
          const speaker = teamSpeakers[value];
          const time = debate.speechTimes.get(speaker.index) ?? 0;

          return (
            <h2
              key={speaker.side + speaker.position}
              className="speaker"
              onClick={() => speakerClicked(speaker.index)}
            >
              {speaker.position} Speaker:{" "}
              {speaker.time === null ? (
                <></>
              ) : (
                <TimeDisplay
                  millisecondsElapsed={time}
                  showMilliseconds={true}
                />
              )}
            </h2>
          );
        })}
      </div>
    </div>
  );
};

export default TeamDisplay;
