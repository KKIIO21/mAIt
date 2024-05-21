import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "./FirstPage.css";
import logo from "./img/logo.png";
import takeout from "./img/takeout.png";
import eathere from "./img/eathere.png"

function FirstPage() {
    const [longPress, setLongPress] = useState(false);
    const timeout = useRef(null);
    const navigate = useNavigate();

    const movePage = () => {
        navigate('./SecondPage');
    }


    const handleMouseDown = () => {
        timeout.current = setTimeout(() => {
            setLongPress(true);
            alert("관리자 화면으로 이동합니다!");
            navigate('/SalesStatistics');
        }, 5000);
    };

    const handleMouseUp = () => {
        clearTimeout(timeout.current);
        if (!longPress) {
            // 여기서 클릭된 상황을 처리할 수 있습니다.
            // 예를 들어, 클릭 시에 특정 화면으로 이동하는 등의 작업을 수행할 수 있습니다.
        }
        setLongPress(false);
    };

    return (
        <div className="background">
        <div className="first_page_container">
            <img className="Icon" alt="logo" src={logo} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></img>
            <h1 className="erica_burger">메이트 버거</h1>
            <div className="button_container">
                <button className="order_button" onClick={movePage}><img className="eathere" src={eathere}></img><br />매장 주문</button>
                <button className="order_button_takeout" onClick={movePage}> <img className="takeout" src={takeout}></img><br />포장 주문</button>
            </div>
        </div>
        </div>
    );
}

export default FirstPage;