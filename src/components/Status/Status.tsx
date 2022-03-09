import React, { useEffect, useState } from "react";
import "../Status/Status.css";
import {allowed} from "../../App"
import Dokument from "./Dokument";
import Axios from "axios";
import NewBlogPostForm from "./NewBlogPostForm";
import NavBar from "../Top/NavBar/NavBar";


interface DokumentInterface {
    name: string;
    downloadLink: string;
}

interface Lehrer {
    Name: string;
    InterviewTermin: string|undefined;
    angefragt: boolean;
    termin_fest: boolean;
    abgedreht: boolean;
}

const good = <svg xmlns="http://www.w3.org/2000/svg" id="notbordered" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>

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
                <RealStatusSeite ></RealStatusSeite>
            </div>}
            {loading && <h1>Loading...</h1>}
        </>
    );
}

const RealStatusSeite:React.FC = ():JSX.Element => {
    const user = localStorage.getItem("user") || "You hacked me! Pls dont crash my Pi!";
    const [tableData, setTableData] = useState<Lehrer[]|undefined>();

    const Dokumente:DokumentInterface[] = [
        {name: "Abghehakte Fragenchecklisten", downloadLink: `https://api.klasse10c.de/:ausgefüllt/${localStorage.getItem("user")}/ausgefüllt`},
        {name: "Abhakblatt für Interviews", downloadLink: `https://api.klasse10c.de/:abhaken/${localStorage.getItem("user")}/Abhaken`},
        {name: "Anmeldeformular (Schüler)", downloadLink: `https://api.klasse10c.de/:lehrer/${localStorage.getItem("user")}/Anmeldeformular (Schüler)`},
        {name: "Anmeldeformular (Lehrer)", downloadLink: `https://api.klasse10c.de/:eltern/${localStorage.getItem("user")}/Anmeldeformular (Lehrer)`},
        {name: "Fragenkatalog - BRD", downloadLink: `https://api.klasse10c.de/:brd/${localStorage.getItem("user")}/Fragenkatalog - BRD`},
        {name: "Fragenkatalog - DDR", downloadLink: `https://api.klasse10c.de/:ddr/${localStorage.getItem("user")}/Fragenkatalog - DDR`},
        {name: "Fragenkatalog - Komplett", downloadLink: `https://api.klasse10c.de/:full/${localStorage.getItem("user")}/Fragenkatalog - Komplett`},
        {name: "Tipps für das Interview", downloadLink: `https://api.klasse10c.de/:tipps/${localStorage.getItem("user")}/Tipps für das Interview`},
        {name: "Checkliste vor Dreh", downloadLink: `https://api.klasse10c.de/:checkliste/${localStorage.getItem("user")}/Interview Checkliste`},
    ]

    useEffect(() => {
        Axios.get("https://api.klasse10c.de/getTableData/"+localStorage.getItem("user")).then(response => {
            setTableData(response.data)
        })
        Axios.get("https://api.klasse10c.de/imon/" + (localStorage.getItem("user") ? localStorage.getItem("user") : "klsjdflaö")+"/true")
    }, [])


    return (
        <div className="StatusSeite">
            <div className="TopBanner moveUp">
                <h1>PDF's</h1>
                <p id="signedinas">Angemeldet als: {user.substr(0,1).toUpperCase()+user.substr(1,user.length)}</p>
            </div>
            <div className="DokumenteWrapper contentArea">
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
                <div className="contentArea">
                    <table className="marginMore">
                        <thead>
                            <tr>
                                <th id="notbordered"></th>
                                <th>Angefragt</th>
                                <th>Termin fest</th>
                                <th>Abgedreht</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableData?.map((i, idx) => {
                                return <tr key={idx}>
                                    <td>{i.Name}</td>
                                    <td>{i.angefragt ? good : ""}</td>
                                    <td>{i.termin_fest ? i.InterviewTermin : ""}</td>
                                    <td>{i.abgedreht ? good : ""}</td>
                                </tr>
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
            <NewBlogPostForm></NewBlogPostForm>
        </div>
    );
}

export default Status;