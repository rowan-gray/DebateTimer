import {BellTimesContext} from "../App.tsx";
import {useCallback, useContext, useState} from "react";
import TimeDisplay from "./TimeDisplay.tsx";

const BellTimesConfiguration = () => {
    const { bellTimes,  setBellTimes } = useContext(BellTimesContext);

    const [bells, setBells] = useState<number>(NaN);
    const [seconds, setSeconds] = useState<number>(NaN);
    const [minutes, setMinutes] = useState<number>(NaN);

    const addBellTime = useCallback(() => {
        const updatedBellTimes = new Map<number, number>(bellTimes.bellTimes);

        const minutes_ = isNaN(minutes) ? 7 : minutes;
        const seconds_ = isNaN(seconds) ? 30 : seconds;
        const bells_ = isNaN(bells) ? 7 : bells;

        updatedBellTimes.set(minutes_ * 60 + seconds_, bells_);

        setBellTimes({...bellTimes, bellTimes: updatedBellTimes});

        setBells(NaN);
        setSeconds(NaN);
        setMinutes(NaN);
    }, [bellTimes, bells, minutes, seconds, setBellTimes]);
    
    const removeBell = useCallback((bellTime: number) => {
        const updatedBellTimes = new Map<number, number>(bellTimes.bellTimes);

        updatedBellTimes.delete(bellTime);

        setBellTimes({...bellTimes, bellTimes: updatedBellTimes});
    }, [bellTimes, setBellTimes]);

    const setNumber = (event:  React.ChangeEvent<HTMLInputElement>,  
                       min: number,  max: number, 
                       setFunc: ((value: number) => void)) => {
        let value = Number.parseInt(event.target.value.replace(/\D/g, ''));
        
        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }
        
        setFunc(value);
    }
    
    return (
        <div>
            <h1>Configure Bell Times</h1>
            <div className="timeEntry">
                <h3>Ring <input className="numBellsEntry" placeholder={"1"} onChange={
                    (event) => setNumber(event, 1, 9, setBells)
                }/>{" time at "} 
                    <input className="minutesEntry" placeholder={"7"}  onChange={
                        (event) => setNumber(event, 0, 59, setMinutes)
                    }/>:
                    <input className="secondsEntry" placeholder={"30"}  onChange={
                        (event) => setNumber(event, 0, 59, setSeconds)
                    }/></h3>
                <button onClick={addBellTime} disabled={isNaN(bells) && isNaN(minutes) && isNaN(seconds)}>ADD BELL</button>
            </div>
            <div className="bellTimes">
                {[...bellTimes.bellTimes.entries()]
                    .sort((a, b) => a[0] - b[0])
                    .map(([ringTime, numberOfBells]) => {
                    return (
                        <div className="bellTime" key={ringTime}>
                            <p><span className="focus">{numberOfBells}</span>
                                {" ring" + (numberOfBells > 1 ? "s" : "") + " at "}
                                <TimeDisplay className="focus" millisecondsElapsed={ringTime * 1000} showMilliseconds={false}/>
                            </p>
                            <button onClick={() => removeBell(ringTime)}>X</button>
                        </div>
                    )
                    })}
            </div>
            </div>
            
            )
            }

            export default BellTimesConfiguration;