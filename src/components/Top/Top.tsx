import React from 'react';
import "./Top.css";
import NavBar from './NavBar/NavBar';
import ContentTop from './ContentTop';


interface Props {

}

const Top: React.FC<Props> = (Props): JSX.Element => {
    return (
        <div id="TOP">
            <NavBar></NavBar>
            <ContentTop />
        </div>
    )
}

export default Top;