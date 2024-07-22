import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import useSound from "use-sound";

import { DebateContext, useConfiguration } from "@/App.tsx";

import singleBellSound from "/public/single_bell.mp3";

import { useIsInitialRender } from "@/hooks/use-is-initial-render.ts";
import { Side } from "@/types/side.ts";
import TeamDisplay from "@/components/team-display.tsx";
import Timer from "@/components/timer.tsx";
import { Button } from "@nextui-org/button";
import DefaultLayout from "@/layouts/default.tsx";

const DebatePage = () => {
  const isInitialRender: boolean = useIsInitialRender();

  const { debate, setDebate } = useContext(DebateContext);

  const [configuration] = useConfiguration(debate, setDebate);

  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(0);

  const currentSpeaker = useMemo(() => {
    if (currentSpeakerIndex >= configuration.speakers.length) {
      return null;
    }

    return {
      ...configuration.speakers[currentSpeakerIndex],
      time: debate.speechTimes.get(currentSpeakerIndex) ?? 0,
    };
  }, [configuration, currentSpeakerIndex, debate.speechTimes]);

  const [millisecondsElapsed, setMillisecondsElapsed] = useState(0);
  const [start, setStart] = useState(false);

  const toggleStart = () => {
    setStart(!start);
  };

  const restartTimer = () => {
    setMillisecondsElapsed(0);
    setPrevSoundPlayed(-1);
  };

  const [playBell] = useSound(singleBellSound, { interrupt: false });

  const [prevSoundPlayed, setPrevSoundPlayed] = useState<number>(-1);

  useEffect(() => {
    if (isInitialRender || !start) {
      return;
    }

    const maybeNumberOfBells = configuration.bellTimes.get(
      Math.floor(millisecondsElapsed / 1000),
    );

    if (
      maybeNumberOfBells === undefined ||
      prevSoundPlayed === maybeNumberOfBells
    ) {
      return;
    }

    let numberOfBells = maybeNumberOfBells;

    setPrevSoundPlayed(Math.floor(millisecondsElapsed / 1000));

    const playBells = setInterval(() => {
      playBell();

      numberOfBells--;

      if (numberOfBells <= 0) {
        clearInterval(playBells);
      }
    }, 250);
  }, [
    isInitialRender,
    playBell,
    millisecondsElapsed,
    prevSoundPlayed,
    start,
    configuration,
  ]);

  const saveTime = useCallback(() => {
    if (currentSpeaker === null) {
      return;
    }

    const updatedSpeechTimes = new Map<number, number>(debate.speechTimes);

    updatedSpeechTimes.set(currentSpeakerIndex, millisecondsElapsed);

    setDebate({
      ...debate,
      speechTimes: updatedSpeechTimes,
    });

    setCurrentSpeakerIndex((prevState) => prevState + 1);
    restartTimer();
  }, [
    currentSpeaker,
    currentSpeakerIndex,
    debate,
    millisecondsElapsed,
    setDebate,
  ]);

  const restoreTime = useCallback((index: number) => {
    setCurrentSpeakerIndex(index);
  }, []);

  useEffect(() => {
    if (currentSpeaker === null) {
      return;
    }

    setMillisecondsElapsed(
      currentSpeaker.time === null ? 0 : currentSpeaker.time,
    );
  }, [currentSpeaker]);

  return (
    <DefaultLayout>
      <div hidden={currentSpeaker === null}>
        <h1>
          {currentSpeaker?.position} {currentSpeaker?.side}
        </h1>
        <Timer
          millisecondsElapsed={millisecondsElapsed}
          setMillisecondsElapsed={setMillisecondsElapsed}
          start={start}
        />
        {/* Start/Stop button */}
        <div>
          <Button onClick={toggleStart}>{!start ? "START" : "STOP"}</Button>
          <Button
            disabled={start || millisecondsElapsed === 0}
            onClick={restartTimer}
          >
            RESET
          </Button>
        </div>
        <Button
          disabled={start || millisecondsElapsed === 0}
          onClick={saveTime}
        >
          SAVE TIME
        </Button>
      </div>
      <div className="teamTimesContainer">
        <TeamDisplay side={Side.AFFIRMATIVE} speakerClicked={restoreTime} />
        <TeamDisplay side={Side.NEGATIVE} speakerClicked={restoreTime} />
      </div>
    </DefaultLayout>
  );
};

export default DebatePage;
