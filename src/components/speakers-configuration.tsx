import React, { useCallback } from "react";
import { Checkbox } from "@nextui-org/checkbox";

import { Configuration, Speaker } from "@/App.tsx";
import { Button } from "@nextui-org/button";
import OrderedList from "@/components/ordered-list.tsx";

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

  const getSpeakerId = (speaker: Speaker): string => {
    return `${speaker.position} ${speaker.side}`;
  };

  const setSpeakers = useCallback((Speakers: Speaker[]) => {
    setConfiguration({ ...configuration, speakers: Speakers });
  }, []);

  return (
    <div>
      <h1>Speaker Configuration</h1>
      <Checkbox
        isSelected={isSymmetricalTeams}
        onValueChange={setIsSymmetricalTeam}
      >
        Symmetrical Teams
      </Checkbox>
      <OrderedList
        id="speakers"
        canManuallyOrder={true}
        displayElement={(speaker) => <p>{getSpeakerId(speaker)}</p>}
        elements={configuration.speakers}
        getKey={getSpeakerId}
        setElements={setSpeakers}
      />
    </div>
  );
};

export default SpeakersConfiguration;
