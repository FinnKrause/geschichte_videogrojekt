import React, { useEffect, useState } from "react";
import "../Status/Status.css";
import { allowed } from "../../App"
import Dokument from "./Dokument";
import Axios from "axios";
import NewBlogPostForm from "./NewBlogPostForm";
import NavBar from "../Top/NavBar/NavBar";
import { Footer } from "../Footer/Footer";
import BerlinPage from "./Berlin/BerlinPage";
import StatusSection from "./StatusSection/StatusSection";


interface DokumentInterface {
    name: string;
    downloadLink: string;
}

interface Lehrer {
    Name: string;
    InterviewTermin: string | undefined;
    angefragt: boolean;
    termin_fest: boolean;
    abgedreht: boolean;
}

interface Props {
    isLogin: boolean;
    setLogin: (value: boolean) => void
}

const good = <svg xmlns="http://www.w3.org/2000/svg" id="notbordered" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>

const Status: React.FC<Props> = (Props: Props): JSX.Element => {
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
                <RealStatusSeite isLogin={Props.isLogin} setLogin={Props.setLogin}></RealStatusSeite>
            </div>}
            {loading && <h1>Loading...</h1>}
        </>
    );
}

const RealStatusSeite: React.FC<Props> = (Props: Props): JSX.Element => {
    const [tableData, setTableData] = useState<Lehrer[] | undefined>();
    const [TimeLineEvents, setTimeLineEvents] = useState<Array<{ date: string, header: string, content: string }>>([]);
    const currentUser = localStorage.getItem("user");

    const Dokumente: DokumentInterface[] = [
        { name: "Zugtickets", downloadLink: `https://api.klasse10c.de/:zugtickets/${currentUser}/Zugtickets` },
        { name: "Datenschutz für Berlinreise", downloadLink: `https://api.klasse10c.de/:berlin/${currentUser}/BerlinTour Datenschutz` },
        { name: "Abghehakte Fragenchecklisten", downloadLink: `https://api.klasse10c.de/:ausgefüllt/${currentUser}/ausgefüllt` },
        { name: "Abhakblatt für Interviews", downloadLink: `https://api.klasse10c.de/:abhaken/${currentUser}/Abhaken` },
        { name: "Anmeldeformular (Schüler)", downloadLink: `https://api.klasse10c.de/:lehrer/${currentUser}/Anmeldeformular (Schüler)` },
        { name: "Anmeldeformular (Lehrer)", downloadLink: `https://api.klasse10c.de/:eltern/${currentUser}/Anmeldeformular (Lehrer)` },
        { name: "Fragenkatalog - BRD", downloadLink: `https://api.klasse10c.de/:brd/${currentUser}/Fragenkatalog - BRD` },
        { name: "Fragenkatalog - DDR", downloadLink: `https://api.klasse10c.de/:ddr/${currentUser}/Fragenkatalog - DDR` },
        { name: "Fragenkatalog - Komplett", downloadLink: `https://api.klasse10c.de/:full/${currentUser}/Fragenkatalog - Komplett` },
        { name: "Tipps für das Interview", downloadLink: `https://api.klasse10c.de/:tipps/${currentUser}/Tipps für das Interview` },
        { name: "Checkliste vor Dreh", downloadLink: `https://api.klasse10c.de/:checkliste/${currentUser}/Interview Checkliste` },
    ]

    useEffect(() => {
        Axios.get("https://api.klasse10c.de/getTableData/" + currentUser).then(response => {
            setTableData(response.data.data)
        })
        Axios.get("https://api.klasse10c.de/imon/" + (currentUser ? currentUser : "klsjdflaö") + "/true")
        Axios.get("https://api.klasse10c.de/getBerlinTour/finn").then(res => setTimeLineEvents(res.data.data)).catch(console.log)
    }, [currentUser])


    return (
        <div className="StatusSeite">
            <NavBar isLogin={Props.isLogin} setLogin={Props.setLogin} hasReturnButton></NavBar>

            <StatusSection AdditionalWrapperClasses={["DokumenteWrapper"]} contentClasses={["Dokumente"]} HeaderName="PDF's">
                {Dokumente.map((i, idx) => <Dokument key={idx} name={i.name} downloadLink={i.downloadLink} />)}
            </StatusSection>

            {Array.from(TimeLineEvents).length != 0 && <StatusSection HeaderName="Berlin-Plan">
                <BerlinPage TimeLineEvents={TimeLineEvents}></BerlinPage>
            </StatusSection>}

            <StatusSection AdditionalWrapperClasses={["InterviewTable"]} HeaderName="Interview-Fortschritt">
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
            </StatusSection>

            <StatusSection HeaderName="Neuer BlogPost" contentClasses={["NewBlogWrapper"]} >
                <NewBlogPostForm></NewBlogPostForm>
            </StatusSection>

            <Footer></Footer>
        </div>
    );
}

export default Status;