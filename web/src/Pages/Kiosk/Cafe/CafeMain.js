import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CafeMain.css";
import coffeeCupImage from './img/coffee-cup.png';

function CafeMain() {
    const navigate = useNavigate();
    const [orderOption, setOrderOption] = useState(null);

    const handleOrderClick = (option) => {
        setOrderOption(option);
        navigate('./Order', { state: { option } });
    };

    const handleReturn = () => {
        navigate("/Pages/Kiosk/");
    };

    return (
        <div className="background">
            <div className="logo">
                <div className="logo_text">mAIt KIOSK</div>
                <button className="return-button" onClick={handleReturn}>돌아가기</button>
            </div>
            <h1 className="title">메이트 커피</h1>
            <img src={coffeeCupImage} alt="Coffee Cup" className="coffee-cup"/>
            <div className='option'>
                <div className="option_button" onClick={() => handleOrderClick('eatIn')}>먹고가기</div>
                <div className="option_button" onClick={() => handleOrderClick('takeAway')}>포장하기</div>
            </div>
        </div>
    );
}

export default CafeMain;
