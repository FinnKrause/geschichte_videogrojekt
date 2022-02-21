import React from 'react';

interface Props {

}

const ContentTop: React.FC<Props> = (Props): JSX.Element => {
    return (
        <div id="top">
            <div className="content">
                <div className="text">
                    <h1 className="header">Umbruchszeiten</h1>
                    <p className="Beschreibung">Der Wettbewerb <span className="spanBackground">„Umbruchszeiten. Deutschland im Wandel seit der Einheit“</span> möchte 2021/2022 Jugendliche anregen, sich mit der jüngsten Vergangenheit und Fragen rund um das Erwachsenwerden in den Umbruchjahren seit 1989/90 auseinanderzusetzen. Einzelne Geschichten – über Menschen und Orte – stehen dabei im Mittelpunkt. Wir haben für diesen Wettbewerb unsere Lehrer interviewt, die sich für uns in ihre eigene Jugend versetzt haben.</p>
                    <div className="watchVideo" onClick={() =>  {window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ","_self")}}>
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