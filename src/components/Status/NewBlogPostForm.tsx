import axios from "axios";
import React, { useEffect, useState } from "react";
import "./NewBlog.css";

interface Props {

}

const NewBlogPostForm:React.FC<Props> = (Props:Props):JSX.Element => {

    const [isAccepted, setAccepted] = useState<boolean>(false);
    const [bas, setBas] = useState<string[]>([]);
    const [error, setError] = useState<string|undefined>();
    const [photoSelected, setPhotoSelected] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(async () => {
            const gottenheader = localStorage.getItem("Überschrift") || "";
            const gottendesc = localStorage.getItem("Beschreibung") || "";

            const header = document.getElementById("Überschrift")! as HTMLInputElement;
            const desc = document.getElementById("Beschreibung")! as HTMLInputElement;

            header.value = gottenheader;
            desc.value = gottendesc;
        }, 200)
    }, [])

    const checkIfImageAlreadyIn = (elementString: string):boolean => {
        const tempBas = [...bas];
        return tempBas.includes(elementString);
    }

    function encodeImageFileAsURL(element:any) {
        console.log("Received files: "  + [element.files].toString())
        console.log("BAS: " + bas.length.toString())
        const tempBas = [...bas];

        for (const elem of element.files) {
            console.log(elem)
            var reader = new FileReader();
            reader.readAsDataURL(elem);
            // eslint-disable-next-line no-loop-func
            reader.onloadend = () => {
                if (typeof reader.result !== "string") return;
                if(checkIfImageAlreadyIn(reader.result)) return;

                tempBas.push(reader.result);
                setBas(tempBas)
            }
        }

        return tempBas;
    }

    const check = ():boolean => {
        const header = document.getElementById("Überschrift")! as HTMLInputElement;
        const desc = document.getElementById("Beschreibung")! as HTMLInputElement;

        if (!isAccepted) {setError("Bestätigung nicht erteilt!"); return false;}
        if (sending) {setError("Sendet bereits eine Anfrage! Bitte hab einen Moment gedult!"); return false;}
        if (!header.value || !desc.value.length || desc.value.length < 20 || bas.length<1) {setError("Keine Vollständigen Angaben oder Beschreibung zu kurz!"); return false;}

        return true;
    }

    const removeIndex = (idx:number) => {
        const newArr = []
        for (let i = 0; i < bas.length; i++) {
            if (i===idx) continue;
            newArr.push(bas[i])
        }
        setBas(newArr);
    }

    return (
        <>
            <div className="TopBanner">
                <h1 className="FortschrittLabel">Neuer BlogPost</h1>
            </div>
            <div className="NewBlogWrapper contentArea">
                {error && <h1 id="ERROR">{error}</h1>}
                <div className="Inputs">
                    <input type="text" className="new" placeholder="Überschrift" id="Überschrift" onChange={e => localStorage.setItem("Überschrift", e.target.value)}></input>
                    <textarea className="new" cols={40} rows={5} placeholder="Beschreibung" id="Beschreibung" onChange={e => localStorage.setItem("Beschreibung", e.target.value)}></textarea>
                    <input name="pic" type="file" className="new" placeholder="Beschreibung" id="File" accept="image/png, image/gif, image/jpeg" onChange={e => {
                        if (!e.target.files) { return;}
                        encodeImageFileAsURL(e.target);
                        setPhotoSelected(true);
                    }}></input>
                    {!photoSelected && <h1 id="STATUS">Noch kein Foto ausgewählt!</h1>}
                     <div className="Vorschaubilder">
                        {bas.map((i, idx) => {
                            return <div style={{position: "relative", marginRight: 30}} key={idx+"a"}>
                                    <img className="Vorschaubild2" src={i} key={idx} alt={"image"+idx}/>
                                    <div style={{position: "absolute", top: 10, right: 0, backgroundColor: "rgba(0,0,0,0.5)"}} onClick={() => removeIndex(idx)}>
                                        <svg className="fade-in" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </div>
                                </div>
                        })}
                    </div>
                </div>
                <div style={{display: "flex", justifyContent:"center", placeItems:"center", flexDirection: "column", paddingBottom: 30}}>
                    <div className="Check">
                        <input type="checkbox" checked={isAccepted} onChange={() => {}} onClick={() => setAccepted(!isAccepted)}></input>
                        <p id="consent">Bestätigen: Beitrag posten?</p>
                    </div>
                    <button className={`navButton${sending ? " notClickable" : ""}`} id="send" onClick={() => {
                        check() && setSending(true);
                        check() && axios.post("https://api.klasse10c.de/createblogpost/"+localStorage.getItem("user"), {
                            "Überschrift": localStorage.getItem("Überschrift"),
                            "Beschreibung": localStorage.getItem("Beschreibung"),
                            "Image": bas,
                            "user": localStorage.getItem("user")
                        }).then(response => {
                            if (response.data === "DONE") {
                                alert("Neuer Eintrag wurde abgeschickt und wird jetzt demnächst von Leopold oder Finn gecheckt! Sobald einer drüber geschaut hat, sind sie dann öffentlich auf der Website zu finden!")
                                setSending(false);
                                localStorage.setItem("Überschrift", "");
                                localStorage.setItem("Beschreibung", "");

                                const header = document.getElementById("Überschrift")! as HTMLInputElement;
                                const desc = document.getElementById("Beschreibung")! as HTMLInputElement;
                                const File = document.getElementById("File")! as HTMLInputElement;

                                header.value = "";
                                desc.value = "";
                                File.value = "";
                                setAccepted(false);
                                setPhotoSelected(false);
                                setBas([]);
                            }
                        })
                    }}>{!sending ? "SEND" : "Sending..."}</button>
                </div>
            </div>
        </>
    );
}

export default NewBlogPostForm;