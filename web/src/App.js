import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AboutUs from './Pages/About/AboutUs.js';
import MainContent from './MainContents.js';
import ChatBot from './Pages/ChatBot/ChatBot.js';
import Generator from './Pages/Generator/Generator.js';


import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="divider" />
          <Routes>
            <Route path='/web/src/MainContents.js' element = {<MainContent/>}/>
          </Routes>
      
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Pages/ChatBot" element={<ChatBot/>} />
          <Route path="/Pages/Generator" element={<Generator/>} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;
