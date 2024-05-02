import React, { useState } from "react";
import {Switch, Route, Routes, useLocation} from 'react-router-dom';
import { jsPDF } from 'jspdf';
import Navbar from './components/Navbar'
import NavbarHome from './components/NavbarHome'
import Home from './components/Home'
import Patients from './components/Patients'
import Chat from './components/Chat'
import About from './components/About'
import Voice from "./components/Voice";
import Prompt from "./components/Prompt";
import NewPatient from "./components/NewPatient";
import LauraDetails from "./components/LauraDetails";


function App() {
  //remove nav bar from home 
  const location = useLocation();
  const isHomePage = location.pathname.includes('/Home');
  return (
    <div>
      {isHomePage && <Navbar />}
      {!isHomePage && <Navbar />}
      <Routes>
        <Route path="/Home/:uniqueId" Component={Home}/>
        <Route path="/Patients" Component={Patients} />
        <Route path="/Chat/:uniqueId" element={<Chat />} /> {/* goes to chat page based on unqiue id */}
        <Route path="/About" Component={About} />
        <Route path="/Voice" Component={Voice} />
        <Route path="/Prompt" Component={Prompt} />
        <Route path="/NewPatient" Component={NewPatient} />
        <Route path="/LauraDetails" Component={LauraDetails} />
      </Routes>
    </div>
  );
}

export default App;
