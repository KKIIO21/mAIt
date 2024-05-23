import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeOrder.css";
import ShoppingBag from "./ShoppingBag";
import Modal from "./Modal";
import CartModal from "./CartModal";
import menu_1 from './img/1.png';
import menu_2 from './img/2.png';
import menu_3 from './img/3.png';
import menu_4 from './img/4.png';
import menu_5 from './img/5.png';
import menu_6 from './img/6.png';
import menu_7 from './img/7.png';
import menu_8 from './img/8.png';
import menu_9 from './img/9.png';

const menu = [
    { id: 1, name: '수박 주스', price: 4000, image: menu_1, category: '시즌 메뉴' },
    { id: 2, name: '골드망고 스무디', price: 4800, image: menu_2, category: '시즌 메뉴' },
    { id: 3, name: '오이 라임 모히또', price: 4800, image: menu_3, category: '시즌 메뉴' },
    { id: 4, name: '아메리카노(ICE)', price: 3000, image: menu_4, category: '커피(ICE)' },
    { id: 5, name: '콜드브루', price: 3500, image: menu_5, category: '커피(ICE)' },
    { id: 6, name: '카페라떼(ICE)', price: 3500, image: menu_6, category: '커피(ICE)' },
    { id: 7, name: '아메리카노(HOT)', price: 3000, image: menu_7, category: '커피(HOT)' },
    { id: 8, name: '카페라떼(HOT)', price: 3500, image: menu_8, category: '커피(HOT)' },
    { id: 9, name: '에스프레소', price: 2500, image: menu_9, category: '커피(HOT)' }
];

export function CafeOrder() {
    const navigate = useNavigate();
    const [menuCounts, setMenuCounts] = useState(menu.map(menuItem => ({ ...menuItem, count: 0 })));
    const [timeLeft, setTimeLeft] = useState(60000000);
    const [selectedCategory, setSelectedCategory] = useState('시즌 메뉴');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

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

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/Pages/Kiosk/cafe/");
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

    const totalprice = menuCounts.reduce((acc, menuItem) => acc + (menuItem.price * menuItem.count), 0);

    const filteredMenuItems = menu.filter(item => item.category === selectedCategory);

    const menuItems = filteredMenuItems.map((item) => (
        <li key={item.id} onClick={() => handleMenuClick(item)} className="menu-item">
            <img src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div>{item.price}원</div>
        </li>
    ));

    const handleOrderClick = () => {
        navigate('../Pages/Kiosk/Cafe/Payment');
    };

    return (
        <div className="background">
            <header className="kheader">
                <div className="header-title">Easy KIOSK</div>
            </header>
            <div className="category-tabs">
                <button onClick={() => setSelectedCategory('시즌 메뉴')} className={selectedCategory === '시즌 메뉴' ? 'active' : ''}>시즌 메뉴</button>
                <button onClick={() => setSelectedCategory('커피(HOT)')} className={selectedCategory === '커피(HOT)' ? 'active' : ''}>커피(HOT)</button>
                <button onClick={() => setSelectedCategory('커피(ICE)')} className={selectedCategory === '커피(ICE)' ? 'active' : ''}>커피(ICE)</button>
            </div>
            <ul className="menu-list">
                {menuItems}
            </ul>
            <div className="bottom-section">
                <ShoppingBag items={menuCounts.filter(menuItem => menuItem.count > 0)} onCountChange={handleCountChange} totalprice={totalprice} />
                <div className="bottom-content">
                    <div className="time">
                        <div className="time-head">남은시간</div> 
                        <div className="time-body"><span>{timeLeft}</span>초</div>
                    </div>
                    <button className="checkout-button" onClick={handleOrderClick}>결제하기</button>
                </div>
            </div>
            {showModal && selectedItem && (
                <CartModal
                    item={selectedItem}
                    onClose={() => setShowModal(false)}
                    onAddToCart={handleAddToCart}
                />
            )}
            {timeLeft === 0 && <Modal message="시간이 초과되었습니다!" onClose={handleCloseModal} />}
        </div>
    );
}

export default CafeOrder;
