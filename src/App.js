import React from "react";
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
import {Switch, Route, Routes, useLocation} from 'react-router-dom';


function App() {
  //remove nav bar from home 
  const location = useLocation();
  const isHomePage = location.pathname === '/Home';
  return (
    <div>
      {isHomePage && <NavbarHome />}
      {!isHomePage && <Navbar />}
      <Routes>
        <Route path="/Home" Component={Home}/>
        <Route path="/Patients" Component={Patients} />
        <Route path="/Chat" Component={Chat}/>
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
