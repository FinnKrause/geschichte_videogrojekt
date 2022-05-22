import React from "react";

interface Props {
    name: string;
    downloadLink: string;
}

const Dokument: React.FC<Props> = (Props): JSX.Element => {

    return (
        <div className="Dokument">
            <div className="left">
                <img className="Vorschaubild" src={require("../../assets/file.png")} alt="FileImage"></img>
            </div>
            <div className="middle">
                <h1>{Props.name}</h1>
                <button onClick={() => {
                    window.open(Props.downloadLink, '_blank');
                }}>Download</button>
            </div>
        </div>
    );
}

export default Dokument;