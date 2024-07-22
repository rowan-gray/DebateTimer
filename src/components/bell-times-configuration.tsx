import React, { useCallback, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import TimeDisplay from "@/components/time-display.tsx";
import { Configuration } from "@/App.tsx";
import { Card } from "@nextui-org/react";

interface BellTimesConfigurationProps {
  configuration: Configuration;
  setConfiguration: (configuration: Configuration) => void;
}

const BellTimesConfiguration: React.FC<BellTimesConfigurationProps> = ({
  configuration,
  setConfiguration,
}) => {
  const [bells, setBells] = useState<number>(NaN);
  const [seconds, setSeconds] = useState<number>(NaN);
  const [minutes, setMinutes] = useState<number>(NaN);

  const addBellTime = useCallback(() => {
    if (configuration === null) {
      return;
    }

    const updatedBellTimes = new Map<number, number>(configuration.bellTimes);

    const minutes_ = isNaN(minutes) ? 7 : minutes;
    const seconds_ = isNaN(seconds) ? 30 : seconds;
    const bells_ = isNaN(bells) ? 1 : bells;

    updatedBellTimes.set(minutes_ * 60 + seconds_, bells_);

    setConfiguration({
      ...configuration,
      bellTimes: updatedBellTimes,
    });

    setBells(NaN);
    setSeconds(NaN);
    setMinutes(NaN);
  }, [bells, configuration, minutes, seconds, setConfiguration]);

  const removeBell = useCallback(
    (bellTime: number) => {
      if (configuration === null) {
        return;
      }

      const updatedBellTimes = new Map<number, number>(configuration.bellTimes);

      updatedBellTimes.delete(bellTime);

      setConfiguration({
        ...configuration,
        bellTimes: updatedBellTimes,
      });
    },
    [configuration, setConfiguration],
  );

  const setNumber = (
    value: string,
    min: number,
    max: number,
    setFunc: (value: number) => void,
  ) => {
    let number = Number.parseInt(value.replace(/\D/g, ""));

    if (number < min) {
      number = min;
    } else if (number > max) {
      number = max;
    }

    setFunc(number);
  };

  return (
    <section className="flex flex-col justify-start gap">
      <div>
        <h1>Bell Times</h1>
        <div className="flex justify-center items-center gap">
          <h3 className="flex justify-center items-center gap-2">
            Ring{" "}
            <Input
              className="max-w-8 text-center"
              placeholder={"1"}
              value={isNaN(bells) ? "" : bells.toString()}
              onValueChange={(value) => setNumber(value, 1, 9, setBells)}
            />
            {" bell at "}
            <span className="flex justify-center items-center gap-1">
              <Input
                className="max-w-8 text-center"
                placeholder={"7"}
                value={isNaN(minutes) ? "" : minutes.toString()}
                onValueChange={(value) => setNumber(value, 0, 59, setMinutes)}
              />
              :
              <Input
                className="max-w-10 text-center"
                placeholder={"30"}
                value={
                  isNaN(seconds) ? "" : seconds.toString().padStart(2, "0")
                }
                onValueChange={(value) => setNumber(value, 0, 59, setSeconds)}
              />
            </span>
          </h3>
          <Button
            isIconOnly
            color="primary"
            isDisabled={isNaN(bells) || isNaN(minutes) || isNaN(seconds)}
            onClick={addBellTime}
          >
            <AddRoundedIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap">
        {configuration === null
          ? []
          : [...configuration.bellTimes.entries()]
              .sort((a, b) => a[0] - b[0])
              .map(([ringTime, numberOfBells]) => {
                return (
                  <Card
                    key={ringTime}
                    className="flex flex-row gap justify-center items-center gap-2"
                  >
                    <p className="flex-grow w-max h-min mx-2.5">
                      <span className="font-bold">{numberOfBells}</span>
                      {" ring" + (numberOfBells > 1 ? "s" : "") + " at "}
                      <TimeDisplay
                        className="font-bold"
                        millisecondsElapsed={ringTime * 1000}
                        showMilliseconds={false}
                      />
                    </p>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onClick={() => removeBell(ringTime)}
                    >
                      <CloseRoundedIcon />
                    </Button>
                  </Card>
                );
              })}
      </div>
    </section>
  );
};

export default BellTimesConfiguration;
