import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AboutUs from './Pages/About/AboutUs.js';
import MainContent from './MainContents.js';
import ChatBot from './Pages/ChatBot/ChatBot.js';
import Generator from './Pages/Generator/Generator.js';
import Output from './Pages/Generator/Output.js';
import Kiosk from './Pages/Kiosk/Kiosk.js';
import FirstTime from './Pages/Kiosk/FirstTime.js';


import './App.css';
import MainContentt from './MainContents2.js';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="hdivider" />
          <Routes>
            <Route path='/web/src/MainContents2.js' element = {<MainContent/>}/>
          </Routes>
      
        <Routes>
          <Route path="/" element={<MainContentt />} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Pages/ChatBot" element={<ChatBot/>} />
          <Route path="/Pages/Generator" element={<Generator/>} />
          <Route path="/Pages/Generator/Output" element={<Output/>} />
          <Route path="/Pages/Kiosk" element={<Kiosk/>} />
          <Route path="/Pages/Kiosk/FirstTime" element={<FirstTime/>} />



        </Routes>
      </div>
    </Router>
  );
}
export default App;
