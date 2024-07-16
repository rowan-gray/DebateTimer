import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import useSound from "use-sound";
import Timer from "./Timer.tsx";
import TeamTimes from "./TeamTimes.tsx";
import {BellTimesContext, Side, SpeakersContext} from "../App.tsx";
import {useIsInitialRender} from "../helpers/UseIsInitialRender.tsx";


const DebatePage = () => {
    const isInitialRender: boolean = useIsInitialRender();
    const { bellTimes} = useContext(BellTimesContext);

    const { speakers, setSpeakers } = useContext(SpeakersContext);

    const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(0);

    const currentSpeaker = useMemo(() => {
        return speakers.length > currentSpeakerIndex ? speakers[currentSpeakerIndex] : null;
    }, [currentSpeakerIndex, speakers]);


    const [millisecondsElapsed, setMillisecondsElapsed] = useState(0);
    const [start, setStart] = useState(false);

    const toggleStart = () => {
        setStart(!start);
    };

    const restartTimer = () => {
        setMillisecondsElapsed(0);
        setPrevSoundPlayed(-1);
    }

    const [playBell] = useSound("/sounds/single_bell.mp3", {interrupt: false});

    const [prevSoundPlayed, setPrevSoundPlayed] = useState<number>(-1)
    
    useEffect(() => {
        if (isInitialRender || !start) {
            return;
        }

        const maybeNumberOfBells = bellTimes.bellTimes.get(Math.floor(millisecondsElapsed/1000));

        if (maybeNumberOfBells === undefined || prevSoundPlayed === maybeNumberOfBells) {
            return;
        }

        let numberOfBells = maybeNumberOfBells
        setPrevSoundPlayed(numberOfBells);

        const playBells = setInterval(() => {
            playBell()

            numberOfBells--;

            if (numberOfBells <= 0) {
                clearInterval(playBells);
            }
        }, 250);
    }, [bellTimes.bellTimes, isInitialRender, playBell, millisecondsElapsed, prevSoundPlayed, start]);



    const saveTime = useCallback(() => {
        if (currentSpeaker === null) {
            return;
        }

        setSpeakers([...speakers.slice(0, currentSpeakerIndex), {...currentSpeaker, time: millisecondsElapsed},
            ...speakers.slice(currentSpeakerIndex + 1)]);

        setCurrentSpeakerIndex((prevState) => prevState + 1);
        restartTimer();
    }, [currentSpeaker, currentSpeakerIndex, millisecondsElapsed, setSpeakers, speakers])

    const restoreTime = useCallback((index: number) => {
        setCurrentSpeakerIndex(index);
    }, []);

    useEffect(() => {
        if (currentSpeaker === null) {
            return;
        }

        setMillisecondsElapsed(currentSpeaker.time === null ? 0 : currentSpeaker.time);
    }, [currentSpeaker]);

    return (
        <div style={{width: '100%'}}>
            <div hidden={currentSpeaker === null}>
                <h1>
                    {currentSpeaker?.name} {currentSpeaker?.side}
                </h1>
                <Timer millisecondsElapsed={millisecondsElapsed} setMillisecondsElapsed={setMillisecondsElapsed} start={start}/>
                {/* Start/Stop button */}
                <div>
                    <button onClick={toggleStart}>
                        {!start ? "START" : "STOP"}
                    </button>
                    <button onClick={restartTimer} disabled={start || millisecondsElapsed === 0}>
                        RESET
                    </button>
                </div>
                <button onClick={saveTime} disabled={start || millisecondsElapsed === 0}>
                    SAVE TIME
                </button>
            </div>
            <div className="teamTimesContainer">
                <TeamTimes side={Side.AFFIRMATIVE} speakerClicked={restoreTime}/>
                <TeamTimes side={Side.NEGATIVE} speakerClicked={restoreTime}/>
            </div>
        </div>
    )
}

export default DebatePage;