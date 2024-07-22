import React from "react";

interface TimeDisplayProps {
  className?: string;
  millisecondsElapsed: number;
  showMilliseconds: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  className,
  millisecondsElapsed,
  showMilliseconds = false,
}) => {
  const dispSecondsAsMins = (milliseconds: number) => {
    const mins = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds / 1000) % 60);

    return mins.toString() + ":" + seconds.toString().padStart(2, "0");
  };

  const dispMiliseconds = (milliseconds: number) => {
    const millisecondsStr = Math.floor((milliseconds % 1000) / 10);

    return "." + millisecondsStr.toString().padStart(2, "0");
  };

  return (
    <>
      <span
        className={
          "timeDisplay" + (className !== undefined ? " " + className : "")
        }
      >
        {dispSecondsAsMins(millisecondsElapsed)}
        <span hidden={!showMilliseconds}>
          {dispMiliseconds(millisecondsElapsed)}
        </span>
      </span>
    </>
  );
};

export default TimeDisplay;
