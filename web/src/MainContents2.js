import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import logoImage from './mAIt.png';



export default function MainContentt() {
    return (
      <div className="main_cons">
        <img
              loading="lazy"
              src={logoImage}
              className="mlogo"
              alt="MLogo"
            />
        <div className="main-word">
          : 함께 성장하는 친구, 우리의 mAIt🫶
        </div>

        <div className="contents">
          <div className="mcon">
            <Link to="/kiosk" className="mcon1">
              <div className="main-button">
                키오스크<br/>체험하기
              </div>
            </Link>

            <Link to="/Pages/Generator" className="mcon1">
              <div className="main-button">
                이미지<br/>변환하기
              </div>
            </Link>

          </div>


          <div className="news">
            <div className="news-title">[ 오늘의 소식 ]</div>
            <div className="news-description">
              오늘은 어떤 소식이 있을까요?
            </div>
            <div className="divider" />
            <div className='news-inner'>
              <Link to="/pages/news" className="newss">
                <div className="button">
                  1. 오늘은 우선 이런 소식이 있어요.
                </div>
              </Link>
              <br/>
              <Link to="/pages/news" className="newss">
                <div className="button">
                  2. 그리고 이런 소식도 있어요.
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }