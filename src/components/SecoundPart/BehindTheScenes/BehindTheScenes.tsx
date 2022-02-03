import React from "react";
import "./BehindTheScenes.css";

interface Props {
    Header: string;
    Beschreibung: string;
    Bild: any;
    otherColor: boolean;
}

const BehindTheScenes:React.FC<Props> =(Props:Props):JSX.Element => {
    return (
        <div className="BehindTheScenes" style={{backgroundColor: Props.otherColor ? "#030c2f" : "#FF4A49"}}>
            <div className="leftB">
                <div className="leftContent">
                    <h1>{Props.Header}</h1>
                    <p>{Props.Beschreibung}</p>
                </div>
            </div>
            <div className="rightB">
                <img className="BehindTheScenesPhoto" src={Props.Bild} alt="Bild"></img>
            </div>
        </div>
    )
}

export default BehindTheScenes;