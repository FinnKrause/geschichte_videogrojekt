import React from "react";
import "./BehindTheScenes.css";

interface Props {
    Header: string;
    Beschreibung: string;
    Bild: Array<string>;
    otherColor: boolean;
    user: string;
}

const BehindTheScenes:React.FC<Props> =(Props:Props):JSX.Element => {

    return (
        <div className="BehindTheScenes" style={{backgroundColor: Props.otherColor ? "#030c2f" : "#FF4A49", flexDirection: Props.otherColor ? "row" : "row-reverse"}}>
            <div className="leftB">
                <div className="leftContent">
                    <h1>{Props.Header}</h1>
                    <p>{Props.Beschreibung}</p>
                    <p className="user">©{Props.user.substr(0,1).toUpperCase()+Props.user.substr(1,Props.user.length)}</p>
                </div>
            </div>
            <div className="rightB">
                {Props.Bild.map((i, idx) => {
                    return <img key={idx} className={`ImageFullScreen ${Props.Bild.length <= 1 ? "OneImage" : ""}`} src={i} alt="Bild" ></img>
                })}
            </div>
        </div>
    )
}

export default BehindTheScenes;