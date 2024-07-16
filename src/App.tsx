import React, {useEffect, useState} from 'react'

import './App.css'
import {Outlet, useLocation, useNavigate} from "react-router-dom";

export type BellTimesContext = {
    bellTimes: BellTimes,
    setBellTimes: (bellTimes: BellTimes) => void
}
export const BellTimesContext = React.createContext<BellTimesContext>({
        bellTimes: {name: "QDU Seniors", bellTimes: new Map([[60, 1], [60 * 7, 1], [60 * 8, 2], [60 * 8 + 30, 3]])},
        setBellTimes: () => {
        }
    }
);

export interface BellTimes {
    name: string
    bellTimes: Map<number, number>;
}

export const SpeakersContext = React.createContext<SpeakersContext>({
        speakers: new Array<Speaker>(),
        setSpeakers: () => {
        }
    }
);

export type SpeakersContext = {
    speakers: Array<Speaker>,
    setSpeakers: (speakers: Array<Speaker>) => void
}

export interface Speaker {
    side: Side;
    time: number | null;
    name: string;
}

export enum Side {
    AFFIRMATIVE = "Affirmative",
    NEGATIVE = "Negative"
}

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [bellTimes, setBellTimes] = useState<BellTimes>(
        {name: "QDU Seniors", bellTimes: new Map([[60, 1], [60 * 7, 1], [60 * 8, 2], [60 * 8 + 30, 3]])});

    const [speakers, setSpeakers] = useState<Array<Speaker>>([
        {
            name: "1st",
            side: Side.AFFIRMATIVE,
            time: null
        }, {
            name: "1st",
            side: Side.NEGATIVE,
            time: null
        }, {
            name: "2nd",
            side: Side.AFFIRMATIVE,
            time: null
        }, {
            name: "2nd",
            side: Side.NEGATIVE,
            time: null
        }, {
            name: "3rd",
            side: Side.AFFIRMATIVE,
            time: null
        }, {
            name: "3rd",
            side: Side.NEGATIVE,
            time: null
        }
    ]);

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("configuration")
        }
    }, [location, navigate]);
    
    return (
        <>
            <SpeakersContext.Provider value={{speakers: speakers, setSpeakers: setSpeakers}}>
                <BellTimesContext.Provider value={{bellTimes: bellTimes, setBellTimes: setBellTimes}}>
                    <Outlet/>
                </BellTimesContext.Provider>
            </SpeakersContext.Provider>
        </>
    )
}

export default App
