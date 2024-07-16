import {useContext, useMemo} from "react";
import {Side, SpeakersContext} from "../App.tsx";
import TimeDisplay from "./TimeDisplay.tsx";


interface TeamTimesProps {
    side: Side;
    speakerClicked: (index: number) => void;
}

const TeamTimes: React.FC<TeamTimesProps> = ({side, speakerClicked}) => {
    const {speakers} = useContext(SpeakersContext);

    const teamSpeakers = useMemo(() => {
        return speakers.map((speaker, index) => {
            return {...speaker, index: index}
        })
            .filter(speaker => speaker.side === side);
    }, [side, speakers]);

    return (<div style={{width: '100%'}}>
        <h1>{side === Side.AFFIRMATIVE ? "Affirmative" : "Negative"}</h1>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {[...Array(teamSpeakers.length).keys()].map(value => {
                const speaker = teamSpeakers[value];
                
                return <h2 className="speaker" key={speaker.side + speaker.name} onClick={() => speakerClicked(speaker.index)}>
                    {speaker.name} Speaker: {speaker.time === null ? <></> : <TimeDisplay millisecondsElapsed={speaker.time} showMilliseconds={true}/>}
                </h2>
            })}
        </div>
    </div>)
}

export default TeamTimes;