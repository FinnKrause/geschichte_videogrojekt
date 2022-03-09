import React, { useState } from "react";
import "./NavBar.css";
import {allowed} from "../../../App";

interface Props {
    isLogin: boolean;
    setLogin: (newval: boolean) => void
    hasReturnButton?: boolean
    hasLoginOrStatusButtom?: boolean
}

const NavBar: React.FC<Props> = (Props): JSX.Element => {
    const [clicked, setClicked] = useState<boolean>(false);

    const checkUser = (user:string) => {
        if (allowed.includes(user)) {
            Props.setLogin(true);
            localStorage.setItem("user", user)
            setClicked(false)
        }
    }

    return (
        <div id="navbar">
            {Props.hasReturnButton && <div style={{marginRight: "auto", paddingLeft: 20}}>
                <div className="navButton login_button" onClick={() => window.location.href="/"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /></svg>
                </div>
            </div>}
            {Props.hasLoginOrStatusButtom && <div>
                {clicked && <div className="LoginForm">
                    <h1>Login</h1>
                    <input type="text" id="NamenInput" onChange={e => checkUser(e.target.value.toLowerCase())} placeholder="Vorname" />
                </div>}

                {Props.isLogin && <button onClick={() => window.location.href = "/status"} className="navButton status_button">STATUS</button>}
                
                {!Props.isLogin && <div className="navButton login_button" onClick={() => setClicked(!clicked)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="white" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="8" cy="15" r="4" /><line x1="10.85" y1="12.15" x2="19" y2="4" /><line x1="18" y1="5" x2="20" y2="7" /><line x1="15" y1="8" x2="17" y2="10" /></svg>
                </div>}
            </div>}

        </div>
    )
}

export default NavBar;