import SpeakersConfiguration from "./SpeakersConfiguration.tsx";
import BellTimesConfiguration from "./BellTimesConfiguration.tsx";
import {useNavigate} from "react-router-dom";

const ConfigurationPage = () => {

    const navigate = useNavigate();
    
    return (
        <div>
            <BellTimesConfiguration/>
            <SpeakersConfiguration/>
            <button onClick={() => navigate("/debate")}>START DEBATE</button>
        </div>
    )
}

export default ConfigurationPage;
