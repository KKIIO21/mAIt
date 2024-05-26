import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CafeMain.css";
import coffeeCupImage from './img/coffee-cup.png';

function CafeMain() {
    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate('./Order');
    };

    return (
        <div className="background">
            <div className="logo">
                <div className="logo_text">mAIt KIOSK</div>
            </div>
            <h1 className="title">메이트 커피</h1>
            <img src={coffeeCupImage} alt="Coffee Cup" className="coffee-cup"/>
            <div className='option'>
                <div className="option_button" onClick={handleOrderClick}>먹고가기</div>
                <div className="option_button" onClick={handleOrderClick}>포장하기</div>
            </div>
        </div>
    );
}

export default CafeMain;
