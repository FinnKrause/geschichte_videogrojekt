import React from "react";
import "./Footer.css";


export const Footer:React.FC = ():JSX.Element => {
    return (
        <div className="FooterWrapper">
            <p className="Credits">©2022 Finn Krause</p>
            <a className="Impressum" href="/impressum">Impressum</a>
        </div>
    );
}
