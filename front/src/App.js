import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kiosk from './kiosk';
import ImageGenerator from './pages/image-generator';
import ImageComplicate from './pages/image-complicate';
import About from './about';
import News from './pages/news';
import Real from './pages/real_prac';
import MainContent from './MainContent';
import Header from './Header';
import './css/App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="divider" />
          <Routes>
            <Route path='/MainContent' element = {<MainContent/>}/>
          </Routes>
      
        <Routes>
          <Route path="/kiosk" element={<Kiosk />} />
          <Route path="/" element={<MainContent />} />
          <Route path="/pages/image-generator" element={<ImageGenerator />} />
          <Route path="/about" element={<About/>} />
          <Route path="/pages/news" element={<News/>}/>
          <Route path="/pages/real_prac" element={<Real/>}/>
          <Route path="/pages/image-complicate" element={<ImageComplicate/>}/>

        </Routes>
      </div>
    </Router>
  );
}
export default App;
