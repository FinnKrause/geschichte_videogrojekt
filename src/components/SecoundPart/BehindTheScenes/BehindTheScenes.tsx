import React, { useEffect } from "react";
import "./BehindTheScenes.css";

interface Props {
    Header: string;
    Beschreibung: string;
    Bild: Array<string>;
    otherColor: boolean;
    user: string;
}

const BehindTheScenes:React.FC<Props> =(Props:Props):JSX.Element => {
    useEffect(() => {
        console.log(Props.Bild.length)
    })
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
                {Props.Bild.length <= 1 && Props.Bild.map((i, idx) => {
                    return <img key={idx} className="ImageFullScreen" src={i} alt="Bild"></img>
                })}
                {Props.Bild.length > 1 && Props.Bild.map((i, idx) => {
                    return <img key={idx} className="BehindTheScenesPhoto" src={i} alt="Bild"></img>
                })}
            </div>
        </div>
    )
}

export default BehindTheScenes;