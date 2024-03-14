import React from "react";
import './css/kkiosk.css';
import { Link } from 'react-router-dom';

export default function Kiosk() {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    // 여기에서 검색어를 사용하여 검색을 처리하거나 검색어 상태를 업데이트합니다.
  };
  const handleClick = (message) => {
    alert(message);
  };

  return (
    <>
      <div className="div">
        <div className="div-2">
            키오스크 체험하기
            <div>
              <input
                type="search"
                placeholder="“이디야 키오스크”라고 검색해보세요"
                onChange={handleSearch}
              />
            </div>
          
        </div>
        


        <div className="grid-container">
          <Link to="/pages/real_prac" className="grid-item">
            <div className="featuree">
              실전 연습
            </div>
          </Link>

          <Link to="/pages/real_prac" className="grid-item">
            <div className="featuree">
              영화관
            </div>
          </Link>

          <Link to="/pages/real_prac" className="grid-item">
            <div className="featuree">
              ATM
            </div>
          </Link>

          <Link to="/pages/real_prac" className="grid-item">
            <div className="featuree">
              카페
            </div>
          </Link>
          
          <Link to="/pages/real_prac" className="grid-item">
            <div className="featuree">
              식당
            </div>
          </Link>


          <Link to="/pages/real_prac" className="grid-item">
            <div className="featuree">
              KTX
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
