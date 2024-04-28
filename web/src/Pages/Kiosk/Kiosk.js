import React from 'react';
import './Kiosk.css';
import { Link } from 'react-router-dom';




export default function Kiosk() {
    return (
      <div class='mkiosk'>
        <div class='kiosk-discript'>
          키오스크 연습하기
        </div>

        <div className='buttons'>
            <Link to="/Pages/Kiosk/Cafe" className="kiosk-button">
                ☕️<br/>카페
            </Link>
            <Link to="/Pages/Kiosk/Cafe" className="kiosk-button">
                🍴<br/>음식점
            </Link>
            <Link to="/Pages/Kiosk/Cafe" className="kiosk-button">
                🎬<br/>영화관
            </Link>
            <Link to="/Pages/Kiosk/Cafe" className="kiosk-button">
                🍔<br/>패스트푸드
            </Link>
        </div>
        <div className='buttons'>
            <Link to="/Pages/Kiosk/Cafe" className="kiosk-button">
                ☕️<br/>카페
            </Link>
            <Link to="/Pages/Kiosk/Cafe" className="kiosk-button">
                🍴<br/>음식점
            </Link>
            <Link to="/Pages/Kiosk/Cafe" className="kiosk-button">
                🎬<br/>영화관
            </Link>
            <Link to="/Pages/Kiosk/Cafe" className="kiosk-button">
                🍔<br/>패스트푸드
            </Link>

        </div>



      </div>

    );
  }