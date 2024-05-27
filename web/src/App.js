import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AboutUs from './Pages/About/AboutUs.js';
import MainContent from './MainContents.js';
import ChatBot from './Pages/ChatBot/ChatBot.js';
import Generator from './Pages/Generator/Generator.js';
import Output from './Pages/Generator/Output.js';

import PaymentChoice from "./Pages/Kiosk/paymentChoice/PaymentChoice.js"; 
import BurgerMain from "./Pages/Kiosk/Burger/BurgerMain.js";
import SalesStatistics from "./Pages/Kiosk/SalesStatistics.js";
import BurgerOrder from "./Pages/Kiosk/Burger/BurgerOrder.js";
import ShoppingBag from "./Pages/Kiosk/Burger/ShoppingBag.js"; 
import BurgerPay from "./Pages/Kiosk/Burger/BurgerPay.js"


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

          <Route path="/Pages/Kiosk/Burger" element={<BurgerMain/>}/>
          <Route path="/Pages/Kiosk/salesStatistics" element={<SalesStatistics/>}/>
          <Route path="/Pages/Kiosk/Burger/BurgerOrder" element={<BurgerOrder/>}/>
          <Route path="/Pages/Kiosk/Burger/ShoppingBag" element={<ShoppingBag/>}/>
          <Route path="/Pages/Kiosk/PaymentChoice" element={<PaymentChoice/>}/>
          <Route path="/Pages/Kiosk/Burger/BurgerPay" element={<BurgerPay/>}>

          </Route>


        </Routes>
      </div>
    </Router>
  );
}
export default App;
