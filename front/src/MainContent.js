import React from 'react';
import './css/MainContent.css';
import { Link } from 'react-router-dom';



export default function MainContent() {
  
    return (
      <div className="container">
        <div className="info">
          mAIt : 메이트와 함께 인공지능과 가까워져요!
        </div>
        <div className="info-1">
          함께 성장하는 친구, 우리의 mAIt🫶
        </div>

        <div className="content">
          <div className="feature">
            <Link to="/kiosk" className="featuree">
              <div className="button">
                키오스크<br/>체험하기
              </div>
            </Link>

            <Link to="/pages/image-generator" className="featuree">
              <div className="button">
                이미지<br/>변환하기
              </div>
            </Link>

            <Link to="/news_recommend" className="featuree">
              <div className="button">
                맞춤형<br/>뉴스
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