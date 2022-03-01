import React, { useEffect } from 'react';
import "./Top.css";
import NavBar from './NavBar/NavBar';
import ContentTop from './ContentTop';
import SecoundPart from '../SecoundPart/SecoundPart';
import Axios from 'axios';


interface Props {
    isLogin: boolean;
    setLogin: (newval: boolean) => void
    joke: boolean;
}

const Top: React.FC<Props> = (Props): JSX.Element => {

    useEffect(() => {
        Axios.get("https://api.klasse10c.de/imon/" + (localStorage.getItem("user") ? localStorage.getItem("user") : "klsjdflaö")+"/false")
    }, [])

    return (
        <div id="TOP" onScroll={() => console.log("MOVED")}>
            <NavBar isLogin={Props.isLogin} setLogin={Props.setLogin}/>
            <ContentTop/>
            <SecoundPart joke={Props.joke}/>
        </div>
    )
}

export default Top;