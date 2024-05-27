//BurgerOrder
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BurgerOrder.css";
import ShoppingBag from "./ShoppingBag";
import TimeOver from "../TimeOver";
import CartModal from "./B_CartModal";
import Blogo from "./img/logo.png";
import ResultModal from "../ResultModal";

import B_1 from './img/001.png';
import B_2 from './img/002.png';
import B_3 from './img/003.png';
import B_4 from './img/004.png';
import B_5 from './img/005.png';
import B_6 from './img/006.png';
import B_7 from './img/007.png';
import B_8 from './img/008.png';
import B_9 from './img/009.png';
import B_10 from './img/010.png';
import B_11 from './img/011.png';
import B_12 from './img/012.png';
import B_13 from './img/13.jpg';
import B_14 from './img/14.jpg';
import B_15 from './img/15.jpg';
import B_16 from './img/16.jpg';








const menu = [
    { id: 1, name: '새우 버거', price: 5000, image: B_1, category: '단품' },
    { id: 2, name: '소고기 버거', price: 5100, image: B_2, category: '단품' },
    { id: 3, name: '베이컨 토마토 버거', price: 6000, image: B_3, category: '단품' },
    { id: 4, name: '기본 버거', price: 4000, image: B_4, category: '단품' },
    { id: 5, name: '삼겹 버거', price: 6700, image: B_5, category: '단품' },
    { id: 6, name: '베새 버거', price: 700, image: B_6, category: '단품' },
    { id: 7, name: '양파 버거 세트', price: 9100, image: B_7, category: '세트' },
    { id: 8, name: '완전 치킨 버거 세트', price: 12500, image: B_8, category: '세트' },
    { id: 9, name: '직화고기 버거 세트', price: 11400, image: B_9, category: '세트' },
    { id: 10, name: '버거가 2개 세트', price: 12400, image: B_10, category: '세트' },
    { id: 11, name: '완전 매콤 치킨 세트', price: 11400, image: B_11, category: '세트' },
    { id: 12, name: '불고기 버거 세트', price: 11400, image: B_12, category: '세트' },
    { id: 13, name: '코카가 콜라', price: 1400, image: B_13, category: '사이드' },
    { id: 14, name: '환타타', price: 1400, image: B_14, category: '사이드' },
    { id: 15, name: '감자튀김', price: 3400, image: B_15, category: '사이드' },
    { id: 16, name: '치즈스틱 2개', price: 2400, image: B_16, category: '사이드' }

];

export function BurgerOrder() {
    const navigate = useNavigate();
    const [menuCounts, setMenuCounts] = useState(menu.map(menuItem => ({ ...menuItem, count: 0 })));
    const [timeLeft, setTimeLeft] = useState(60000000);
    const [selectedCategory, setSelectedCategory] = useState('단품');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showResultModal, setShowResultModal] = useState(false);
    const [orderCorrect, setOrderCorrect] = useState(false);
    const location = useLocation();
    const option = location?.state?.option || 'eatIn';

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime > 1) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    setShowModal(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const ReturnPage = () => {
        navigate("/Pages/Kiosk/Burger");
    }


    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/Pages/Kiosk/");
    };

    const handleMenuClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleAddToCart = (item) => {
        setMenuCounts(prevCounts => {
            const existingItem = prevCounts.find(menuItem => menuItem.id === item.id && menuItem.price === item.price);
            if (existingItem) {
                return prevCounts.map(menuItem => {
                    if (menuItem.id === item.id && menuItem.price === item.price) {
                        return { ...menuItem, count: menuItem.count + 1 };
                    }
                    return menuItem;
                });
            } else {
                return [...prevCounts, { ...item, count: 1 }];
            }
        });
        setShowModal(false);
    };

    const handleCountChange = (id, delta) => {
        setMenuCounts(prevCounts => prevCounts.map(menuItem => {
            if (menuItem.id === id) {
                const newCount = menuItem.count + delta;
                return { ...menuItem, count: Math.max(newCount, 0) };
            }
            return menuItem;
        }));
    };
    const [selectedMethod, setSelectedMethod] = useState('');
      // 결제 버튼 비활성화 여부
     const isPayButtonDisabled = selectedMethod === '';

    const totalprice = menuCounts.reduce((acc, menuItem) => acc + (menuItem.price * menuItem.count), 0);

    const filteredMenuItems = menu.filter(item => item.category === selectedCategory);

    const menuItems = filteredMenuItems.map((item) => (
        <li key={item.id} onClick={() => handleMenuClick(item)} className="B_menu-item">
            <img src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div>{item.price}원</div>
        </li>
    ));

    /*const handleOrderClick = () => {
        navigate('../Pages/Kiosk/Burger/BurgerPay');
    };*/

    const handleOrderClick = () => {
        const correctOrdersForOption = option === 'takeAway' ? [
            [
                { name: '새우 버거', count: 1 },
            ],
            [
                { name: '삼겹 버거', count: 1 },
            ],
            [
                { name: '소고기 버거', count: 1 },
                { name: '치즈스틱 2개', count: 1 },
                { name: '코카가 콜라', count: 1 }
            ],
            [
                { name: '완전 치킨 버거 세트', count: 1 },
                { name: '감자튀김', count: 2 },
                { name: '코카가 콜라', count: 1 },
            ]
        ] : [
            [
                { name: '불고기 버거 세트', count: 1 }
            ],
            [
                { name: '양파 버거 세트', count: 1 },
                { name: '코카가 콜라', count: 1 },
                { name: '환타타', count: 1 },
            ],
        ];
    
        const isOrderCorrect = correctOrdersForOption.some(correctOrder => {
            return correctOrder.every(correctItem => {
                const foundItem = menuCounts.find(item => item.name === correctItem.name);
                return foundItem && foundItem.count === correctItem.count;
            });
        });
    
        setOrderCorrect(isOrderCorrect);
        setShowResultModal(true);
    };

    // voice2text
    const recordAudio = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'ko-KR';
        recognition.start();
        
        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            console.log("인식된 텍스트:", speechToText); // 디버깅을 위해 인식된 텍스트를 콘솔에 출력
    
            // 메뉴에서 인식된 텍스트와 일치하는 항목 찾기
            const foundItem = menu.find(item => item.name === speechToText);
            if (foundItem) {
                // 찾은 항목을 장바구니에 추가하는 함수 호출
                handleAddToCart(foundItem);
            } else {
                // 메뉴를 찾지 못한 경우의 처리
                console.log("메뉴를 찾을 수 없습니다.");
            }
        };
    };
    

    return (
        <div className="B_main_order">
          <div className="B_background">
            <header className="kheader">
            <button className="back-button" onClick={ReturnPage}>뒤로 가기</button>
                <img className="OrderIcon" alt="logo" src={Blogo} ></img>
              <div className="B_header-title">메뉴를 골라주세요</div>
            </header>
            <div className="B_category-tabs">
              <button onClick={() => setSelectedCategory('단품')} className={selectedCategory === '단품' ? 'active' : ''}>단품</button>
              <button onClick={() => setSelectedCategory('세트')} className={selectedCategory === '세트' ? 'active' : ''}>세트</button>
              <button onClick={() => setSelectedCategory('사이드')} className={selectedCategory === '사이드' ? 'active' : ''}>사이드</button>
            </div>
            <ul className="B_menu-list">
              {menuItems}
            </ul>
            <div className="right-section">
                <div className="B_bottom-section">
                    <div className="B_bottom-content">
                        <div className="B_time">
                            <div className="B_time-head">남은시간</div> 
                            <div className="time-body"><span>{timeLeft}</span>초</div>
                        </div>
                        <div className="Mic">
                            <button type="button" onClick={recordAudio}></button>
                            음성으로도<br/>주문해보세요
                        </div>
                    </div>
                </div>
                {showModal && selectedItem && (
                    <CartModal
                        item={selectedItem}
                        onClose={() => setShowModal(false)}
                        onAddToCart={handleAddToCart}
                    />
                )} 
                {timeLeft === 0 && <TimeOver onClose={handleCloseModal} />}
                <ShoppingBag items={menuCounts.filter(menuItem => menuItem.count > 0)} onCountChange={handleCountChange} totalprice={totalprice} />
                <div className="B_checkout-button-container">
                    <button className="B_checkout-button" onClick={handleOrderClick}>결제하기</button>
                </div>
                {showResultModal && (
                    <ResultModal 
                        correct={orderCorrect} 
                        onClose={() => setShowResultModal(false)} 
                        navigate={navigate}
                    />
                )}
            </div>
          </div>
        </div>
      );
}

export default BurgerOrder;