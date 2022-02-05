import Axios from "axios";
import React, { useEffect, useState } from "react";
import BehindTheScenes from "./BehindTheScenes/BehindTheScenes";
import "./SecoundPart.css";

interface Props {

}

interface ResponseType {
    Überschrift: string;
    Beschreibung: string;
    Image: string[];
    user: string;
}

const SecoundPart:React.FC<Props> = (Props: Props):JSX.Element => {

    const [data, setData] = useState<Array<ResponseType>>();
    const [loading, setloading] = useState<boolean>(true);

    useEffect(() => {
        Axios.get("https://api.klasse10c.de/getblogposts/").then(response => {
            setData(response.data);
            setloading(false);
        })
    }, [])
    
    return (
        <div className="SecoundPart">
            {!loading && data && data.map((i, idx) => {
                return <BehindTheScenes key={idx} user={i.user} otherColor={idx%2===0} Beschreibung={i.Beschreibung} Bild={i.Image} Header={i.Überschrift}></BehindTheScenes>
            })}
        </div>
    );
}

export default SecoundPart;