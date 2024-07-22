import React from "react";
import { Checkbox } from "@nextui-org/checkbox";

import { Configuration, Speaker } from "@/App.tsx";
import { Button } from "@nextui-org/button";

interface SpeakersConfigurationProps {
  configuration: Configuration;
  setConfiguration: (configuration: Configuration) => void;
}

const SpeakersConfiguration: React.FC<SpeakersConfigurationProps> = ({
  configuration,
  setConfiguration,
}) => {
  const [isSymmetricalTeams, setIsSymmetricalTeam] =
    React.useState<boolean>(true);

  return (
    <div>
      <h1>Speaker Configuration</h1>
      <Checkbox
        isSelected={isSymmetricalTeams}
        onValueChange={setIsSymmetricalTeam}
      >
        Symmetrical Teams
      </Checkbox>
      <>
        {configuration.speakers.map((speaker: Speaker, i: number) => {
          return (
            <div key={i} className="bellTime">
              <p>
                {speaker.position} {speaker.side}
              </p>
              <Button>UP</Button>
              <Button>DOWN</Button>
              <Button>X</Button>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default SpeakersConfiguration;
