import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { useIsInitialRender } from "@/hooks/use-is-initial-render.ts";
import TimeDisplay from "@/components/time-display.tsx";

interface TimerProps {
  millisecondsElapsed: number;
  setMillisecondsElapsed: Dispatch<SetStateAction<number>>;
  start: boolean;
}

const Timer: React.FC<TimerProps> = ({
  millisecondsElapsed,
  setMillisecondsElapsed,
  start,
}) => {
  const isInitialRender: boolean = useIsInitialRender();

  const tick = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isInitialRender) {
      return;
    }

    clearInterval(tick.current);

    if (start) {
      const startTime = Date.now() - millisecondsElapsed;

      tick.current = setInterval(() => {
        setMillisecondsElapsed(Date.now() - startTime);
      }, 10);
    }
  }, [isInitialRender, millisecondsElapsed, setMillisecondsElapsed, start]);

  return (
    <div className="timer">
      {/* Display timer */}
      <h1>
        <TimeDisplay
          showMilliseconds
          millisecondsElapsed={millisecondsElapsed}
        />
      </h1>
    </div>
  );
};

export default Timer;
