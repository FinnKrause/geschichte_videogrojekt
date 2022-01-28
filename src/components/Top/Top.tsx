import React from 'react';
import "./Top.css";
import NavBar from './NavBar/NavBar';
import ContentTop from './ContentTop';


interface Props {
    isLogin: boolean;
    setLogin: (newval: boolean) => void
}

const Top: React.FC<Props> = (Props): JSX.Element => {
    return (
        <div id="TOP">
            <NavBar isLogin={Props.isLogin} setLogin={Props.setLogin}></NavBar>
            <ContentTop />
        </div>
    )
}

export default Top;