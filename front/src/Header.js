import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImage from './images/mAIt.png';
import './css/header.css';

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
              onClick={() => navigateTo('/')} // 이미지를 클릭하면 홈으로 이동합니다.
            />
      </div>
      <div className="header-right">
        <Link to="/about" className="nav-item">
          <button>메이트 알아보기</button>
        </Link>
        <Link to="/pages/kiosk" className="nav-item">
          <button>사용 설명서</button>
        </Link>

        <Link to="/pages/chatbot" className='chatbot'>
          <button>🩶여기서 다 물어보세요🩶(챗봇)</button>
        </Link>
      </div>
      
    </div>
  );
}

export default Header;