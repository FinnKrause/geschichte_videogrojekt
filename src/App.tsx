import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Status from './components/Status/Status';

import Top from "./components/Top/Top";

type Namen = "alena" | "arda" | "carla" | "christian" | "christoph" | "dulce" | "elena" | "finn" | "marthinus" | "hendrik" | "leopold" | "lucas" | "marleen" | "marlene" | "moritz" | "sanna" | "sophia | florian"
const allowed:Array<any> = ["alena" , "arda" , "carla" , "christian" , "christoph" , "dulce" , "elena" , "finn" , "marthinus" , "hendrik" , "leopold" , "lucas" , "marleen" , "marlene" , "moritz" , "sanna" , "sophia", "florian"]

const App: React.FC = (): JSX.Element => {
  const [login, setLogin] = useState<boolean>(false);
  
  useEffect(() => {
    const local = localStorage.getItem("user");
    if (!local) return;
    if (!allowed.includes(local)) {
      localStorage.setItem("loginerror", "error")
      console.log("wrong user name")
      return;
    }

    setLogin(true);
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top isLogin={login} setLogin={setLogin}/>}></Route>
        <Route path="/status" element={<Status />}></Route>
        <Route path="*" element={<Navigate to={"/"}></Navigate>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
export type {Namen};
export {allowed};
