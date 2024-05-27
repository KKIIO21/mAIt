import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./BurgerMain.css";
import logo from "./img/logo.png";
import bim from "./img/버거메인이미지.png";


function BurgerMain() {
    const navigate = useNavigate();

    const movePage = () => {
        navigate('./BurgerOrder');
    }
    return (
        <div className='BurgerMain'>
            <div className="background">
            <div className="first_page_container">
                <img className="Icon" alt="logo" src={logo} ></img>
                <br/>
                <img className="burger_image_main" alt="bim" src={bim} ></img>

                <div className="button_container">
                    <button className="order_button" onClick={movePage}>매장 주문</button>
                    <button className="order_button" onClick={movePage}>포장 주문</button>
                </div>
            </div>
            </div>


        </div>
    );
}

export default BurgerMain;