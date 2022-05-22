import React, { useEffect } from 'react';
import NavBar from './NavBar/NavBar';
import ContentTop from './ContentTop';
import SecoundPart from '../SecoundPart/SecoundPart';
import Axios from 'axios';
import {Footer} from "../Footer/Footer";


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
        <div id="TOP">
            <NavBar isLogin={Props.isLogin} setLogin={Props.setLogin} hasLoginOrStatusButtom/>
            <ContentTop/>
            <SecoundPart joke={Props.joke}/>
            <Footer></Footer>
        </div>
    )
}

export default Top;