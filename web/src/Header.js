import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImage from './mAIt.png';
import chatImage from './강아지.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="header">
      <div className="header-left">
            <img
              loading="lazy"
              src={logoImage}
              className="logo"
              alt="Logo"
              onClick={() => navigateTo('/')} 
            />
      </div>
      <div className="header-right">
        <Link to="/AboutUs" className="nav-item">
          <button>메이트 알아보기</button>
        </Link>
        <Link to="/pages/kiosk" className="nav-item2">
          <button>사용 설명서</button>
        </Link>

        <Link to="/pages/ChatBot" className='chatbot'>
          <button>
            챗봇
            <img
              src={chatImage}
              className="chatdog"
              alt="DOG"
            />
            </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;