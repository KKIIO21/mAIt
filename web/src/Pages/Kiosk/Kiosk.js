import React from 'react';
import './Kiosk.css';
import './learn.css';
import { Link } from 'react-router-dom';




export default function Kiosk() {
    return (
      <div class='mkiosk'>

        <div className="title wrapper">
            <div className="maintitle">키오스크 배우기!</div>
            <div className="subtitle">우리 함께 키오스크를 연습해봐요<br /></div>
        </div>

        <div className="menu wrapper">
            <div className="menus container" id="menubtn">
            {/* React에서는 a 태그를 사용할 수 있지만, SPA를 위해서는 React Router의 Link 컴포넌트를 권장합니다. */}
              <Link to="/Pages/Kiosk/FirstTime" className="mcon1">
                  <div className="main-button">
                    키오스크가 처음이라면
                  </div>
                </Link>
            <a href="l_first_time.html"><div id="키오스크가처음이라면"></div></a>
            <a href="l_order_americano.html"><div id="아메리카노주문하기"></div></a>
            <a href="l_order_latte.html"><div id="카페라떼주문하기"></div></a>
            </div>
        </div>

        <div className="recommendation"></div>



      </div>

    );
  }