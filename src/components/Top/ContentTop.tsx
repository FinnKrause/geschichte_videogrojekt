import React from 'react';

interface Props {

}

const ContentTop: React.FC<Props> = (Props): JSX.Element => {
    return (
        <div id="top">
            <div className="content">
                <div className="text">
                    <h1 className="header">Umbruchszeiten</h1>
                    <p className="Beschreibung">
                        Wenn diese Seite jemals verwendet wird brauchen wir was, was wir hier reinschreiben können! Weiter unten auf der Seite könnte man behind the scenes Bilder posten und dazu ein paar Worte schreiben!
                    </p>
                    <div className="watchVideo">
                        <svg xmlns="http://www.w3.org/2000/svg" className="playSVG" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="none" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4v16l13 -8z" /></svg>
                        <h2>Watch Video</h2>
                    </div>
                </div>
                <div id="logoWrapper">
                    <img id="logo" src={require("../../assets/logo1.png")} alt="asldf"></img>
                </div>
            </div>

        </div>
    )
}

export default ContentTop;