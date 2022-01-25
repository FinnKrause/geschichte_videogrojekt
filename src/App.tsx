import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Status from './components/Status/Status';

import Top from "./components/Top/Top";

const App: React.FC = (): JSX.Element => {
  useEffect(() => {

  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />}></Route>
        <Route path="/status" element={<Status />}></Route>
        <Route path="*" element={<Navigate to={"/"}></Navigate>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
