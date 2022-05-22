import React from "react";
import NavBar from "../Top/NavBar/NavBar";
import "./Impressum.css";

interface Props {
    isLogin: boolean,
    setLogin: (val:boolean) => void
}

const Impressum:React.FC<Props> = (Props:Props):JSX.Element => {
    return (
        <>
            <div id="TOP">
                <NavBar isLogin={Props.isLogin} setLogin={Props.setLogin} hasReturnButton></NavBar>
                <div className="content topImpressum">
                    <div className="ISpalten">
                        <h1 className="infos IHeader">Impressum</h1>
                        <div className="ISpalte">
                            <p className="infos cat">Verantwortlicher (Website): </p>
                            <p className="infos info">Finn Krause</p>
                        </div>
                        <div className="ISpalte">
                            <p className="infos cat">Firma: </p>
                            <p className="infos info">Klasse 10c | MTG-Erlangen</p>
                        </div>
                        <div className="ISpalte">
                            <p className="infos cat">Anschrift: </p>
                            <p className="infos info">Schillerstraße 12 91054 Erlangen</p>
                        </div>
                        <div className="ISpalte">
                            <p className="infos cat">Email: </p>
                            <p className="infos info">mail@finnkrause.com</p>
                        </div>
                        <div className="ISpalte">
                            <p className="infos cat">Tel.: </p>
                            <p className="infos info">017621443001</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Impressum;