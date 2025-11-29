import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Login from "./pages/Login";
import Home from "./pages/Home";
import viteLogo from '/vite.svg';


function App() {

  

  return (
    <Router>
      <Routes>
        <Route path= "/" element={<Login />}/>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App
