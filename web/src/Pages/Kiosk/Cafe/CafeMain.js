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
            <header className="kheader">
                <div className="header-title">Easy KIOSK</div>
            </header>
            <h1 className="title">메이트 커피</h1>
            <img src={coffeeCupImage} alt="Coffee Cup" className="coffee-cup"/>
            <button className="option_button" onClick={handleOrderClick}>주문하기</button>
        </div>
    );
}

export default CafeMain;
