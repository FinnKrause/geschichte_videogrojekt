import React, { useEffect, useState } from "react";
import "../Status/Status.css";
import {allowed} from "../../App"
import Dokument from "./Dokument";


interface DokumentInterface {
    name: string;
    downloadLink: string;
}

const Status: React.FC = (): JSX.Element => {
    const [loading, setLoding] = useState<boolean>(true);

    useEffect(() => {
        const local = localStorage.getItem("user");
        if (allowed.includes(local)) {
            setLoding(false);
        }
        else window.location.href = "/";
    }, [])

    return (
        <>
            {!loading && <div>
                <RealStatusSeite key={1}></RealStatusSeite>
            </div>}
            {loading && <h1>Loading...</h1>}
        </>
    );
}

const RealStatusSeite:React.FC = ():JSX.Element => {
    const user = localStorage.getItem("user") || "You hacked me! Pls dont crash my Pi!";
    const Dokumente:DokumentInterface[] = [
        {name: "Abhakblatt für Interviews", downloadLink: "https://api.klasse10c.de/:abhaken/Abhaken"},
        {name: "Anmeldeformular (Schüler)", downloadLink: "https://api.klasse10c.de/:lehrer/Anmeldeformular (Schüler)"},
        {name: "Anmeldeformular (Lehrer)", downloadLink: "https://api.klasse10c.de/:eltern/Anmeldeformular (Lehrer)"},
        {name: "Fragenkatalog - BRD", downloadLink: "https://api.klasse10c.de/:brd/Fragenkatalog - BRD"},
        {name: "Fragenkatalog - DDR", downloadLink: "https://api.klasse10c.de/:ddr/Fragenkatalog - DDR"},
        {name: "Fragenkatalog - Komplett", downloadLink: "https://api.klasse10c.de/:full/Fragenkatalog - Komplett"},
        {name: "Tipps für das Interview", downloadLink: "https://api.klasse10c.de/:tipps/Tipps für das Interview"},
    ]

    return (
        <div className="StatusSeite">
            <div className="TopBanner moveUp">
                <h1>PDF's</h1>
                <p id="signedinas">Angemeldet als: {user.substr(0,1).toUpperCase()+user.substr(1,user.length)}</p>
            </div>
            <div className="DokumenteWrapper">
                <div className="Dokumente">
                    {Dokumente.map((i, idx) => {
                        return <Dokument key={idx} name={i.name} downloadLink={i.downloadLink}></Dokument>
                    })}
                </div>
            </div>
            <div className="InterviewTable">
                <div className="TopBanner">
                    <h1 className="FortschrittLabel">Interview-Fortschritt</h1>
                </div>
                <div className="Tabelle"></div>
            </div>
        </div>
    );
}

export default Status;