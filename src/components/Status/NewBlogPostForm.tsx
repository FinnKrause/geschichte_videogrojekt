import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./NewBlog.css";

interface Props {

}

const NewBlogPostForm:React.FC<Props> = (Props:Props):JSX.Element => {

    const [isAccepted, setAccepted] = useState<boolean>(false);
    const [bas, setBas] = useState<string>();
    const [error, setError] = useState<string|undefined>();
    const [photoSelected, setPhotoSelected] = useState<boolean>(false); 

    useEffect(() => {
        setTimeout(() => {
            const gottenheader = localStorage.getItem("Überschrift") || "";
            const gottendesc = localStorage.getItem("Beschreibung") || "";
            const gottenFile = localStorage.getItem("File") || "";

            const header = document.getElementById("Überschrift")! as HTMLInputElement;
            const desc = document.getElementById("Beschreibung")! as HTMLInputElement;
            const File = document.getElementById("File")! as HTMLInputElement;

            header.value = gottenheader;
            desc.value = gottendesc;
            File.value = gottenFile;
        }, 200)
    }, [])

    function encodeImageFileAsURL(element:any) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            if (typeof reader.result !== "string") return;
            setBas(reader.result)
            localStorage.setItem("image", reader.result);
        }
        reader.readAsDataURL(file);
    }

    const check = ():boolean => {
        const header = document.getElementById("Überschrift")! as HTMLInputElement;
        const desc = document.getElementById("Beschreibung")! as HTMLInputElement;
        const File = document.getElementById("File")! as HTMLInputElement;

        if (!isAccepted) {setError("Bestätigung nicht erteilt!"); return false;}
        if (!header.value || !desc.value.length || desc.value.length < 20 || !bas) {setError("Keine Vollständigen Angaben oder Beschreibung zu kurz!"); return false;}

        return true;
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
                        if (!e.target.value) { return;}
                        encodeImageFileAsURL(e.target)
                        setPhotoSelected(true);
                    }}></input>
                    <h1 id="STATUS">{photoSelected ? "Foto ausgewählt!" : "Noch kein Foto ausgewählt!"}</h1>
                </div>
                <div style={{display: "flex", justifyContent:"center", placeItems:"center", flexDirection: "column"}}>
                    <div className="Check">
                        <input type="checkbox" checked={isAccepted} onChange={() => {}} onClick={() => setAccepted(!isAccepted)}></input>
                        <p id="consent">Bestätigen: Beitrag posten?</p>
                    </div>
                    <button className="navButton" id="send" onClick={() => {
                        check() && axios.post("https://api.klasse10c.de/createblogpost/"+localStorage.getItem("user"), {
                            "Überschrift": localStorage.getItem("Überschrift"),
                            "Beschreibung": localStorage.getItem("Beschreibung"),
                            "Image": bas,
                            "user": localStorage.getItem("user")
                        }).then(response => {
                            if (response.data === "DONE") {
                                alert("Neuer Eintrag wurde abgeschickt und ist ab jetzt auf der Website verfügbar!")
                                localStorage.setItem("Überschrift", "");
                                localStorage.setItem("Beschreibung", "");
                                localStorage.setItem("File", "");

                                const header = document.getElementById("Überschrift")! as HTMLInputElement;
                                const desc = document.getElementById("Beschreibung")! as HTMLInputElement;
                                const File = document.getElementById("File")! as HTMLInputElement;

                                header.value = "";
                                desc.value = "";
                                File.value = "";
                                setAccepted(false);
                                setPhotoSelected(false);
                                setBas("");
                            }
                        })
                    }}>SEND</button>
                </div>
            </div>
        </>
    );
}

export default NewBlogPostForm;