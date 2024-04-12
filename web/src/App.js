import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AboutUs from './Pages/About/AboutUs.js';
import MainContent from './Pages/Main/MainContents.js';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="divider" />
          <Routes>
            <Route path='/web/src/Pages/Main/MainContents.js' element = {<MainContent/>}/>
          </Routes>
      
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/AboutUs" element={<AboutUs/>} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;
