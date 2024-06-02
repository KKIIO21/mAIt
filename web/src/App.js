import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AboutUs from './Pages/About/AboutUs.js';
import MainContent from './MainContents.js';
import ChatBot from './Pages/ChatBot/ChatBot.js';
import Generator from './Pages/Generator/Generator.js';
import Output from './Pages/Generator/Output.js';

import KioskMain from "./Pages/Kiosk/KioskMain.js";

import PaymentChoice from "./Pages/Kiosk/paymentChoice/PaymentChoice.js"; 
import BurgerMain from "./Pages/Kiosk/Burger/BurgerMain.js";
import SalesStatistics from "./Pages/Kiosk/SalesStatistics.js";
import BurgerOrder from "./Pages/Kiosk/Burger/BurgerOrder.js";
import ShoppingBag from "./Pages/Kiosk/Burger/ShoppingBag.js"; 
import BurgerPay from "./Pages/Kiosk/Burger/BurgerPay.js"

import CafeMain from "./Pages/Kiosk/Cafe/CafeMain.js";
import CafeOrder from "./Pages/Kiosk/Cafe/CafeOrder.js";

import CinemaMain from "./Pages/Kiosk/Cinema/CinemaMain.js";
import CinemaOrder from "./Pages/Kiosk/Cinema/CinemaOrder.js";
import CinemaSearch from "./Pages/Kiosk/Cinema/CinemaSearch.js";

import Movie1 from "./Pages/Kiosk/Cinema/CinemaMovie1.js";
import Movie2 from "./Pages/Kiosk/Cinema/CinemaMovie2.js";
import Movie3 from "./Pages/Kiosk/Cinema/CinemaMovie3.js";
import Movie4 from "./Pages/Kiosk/Cinema/CinemaMovie4.js";
import Movie5 from "./Pages/Kiosk/Cinema/CinemaMovie5.js";
import Movie6 from "./Pages/Kiosk/Cinema/CinemaMovie6.js";

import Seat1 from "./Pages/Kiosk/Cinema/ChooseSeat1.js";
import Seat2 from "./Pages/Kiosk/Cinema/ChooseSeat2.js";
import Seat3 from "./Pages/Kiosk/Cinema/ChooseSeat3.js";
import Seat4 from "./Pages/Kiosk/Cinema/ChooseSeat4.js";
import Seat5 from "./Pages/Kiosk/Cinema/ChooseSeat5.js";
import Seat6 from "./Pages/Kiosk/Cinema/ChooseSeat6.js";

import './App.css';
import MainContentt from './MainContents2.js';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="hdivider" />
        <Routes>
          <Route path="/" element={<MainContentt />} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Pages/ChatBot" element={<ChatBot/>} />
          <Route path="/Pages/Generator" element={<Generator/>} />
          <Route path="/Pages/Generator/Output" element={<Output/>} />
          <Route path='/web/src/MainContents2.js' element={<MainContent/>}/>


          <Route path="/Pages/Kiosk/" element={<KioskMain/>}/>
          <Route path="/Pages/Kiosk/Burger" element={<BurgerMain/>}/>
          <Route path="/Pages/Kiosk/salesStatistics" element={<SalesStatistics/>}/>
          <Route path="/Pages/Kiosk/Burger/Order" element={<BurgerOrder/>}/>
          <Route path="/Pages/Kiosk/Burger/ShoppingBag" element={<ShoppingBag/>}/>
          <Route path="/Pages/Kiosk/PaymentChoice" element={<PaymentChoice/>}/>

          <Route path="/Pages/Kiosk/Cafe" element={<CafeMain/>}/>
          <Route path="/Pages/Kiosk/Cafe/Order" element={<CafeOrder/>}/>

          <Route path="/Pages/Kiosk/Cinema" element={<CinemaMain/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order" element={<CinemaOrder/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie1" element={<Movie1/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie1/Seat1" element={<Seat1/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie2" element={<Movie2/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie2/Seat2" element={<Seat2/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie3" element={<Movie3/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie3/Seat3" element={<Seat3/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie4" element={<Movie4/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie4/Seat4" element={<Seat4/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie5" element={<Movie5/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie5/Seat5" element={<Seat5/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie6" element={<Movie6/>}/>
          <Route path="/Pages/Kiosk/Cinema/Order/Movie6/Seat6" element={<Seat6/>}/>

          <Route path="/Pages/Kiosk/Cinema/Search" element={<CinemaSearch/>}/>

          <Route path="/Pages/Kiosk/Burger/BurgerPay" element={<BurgerPay/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
