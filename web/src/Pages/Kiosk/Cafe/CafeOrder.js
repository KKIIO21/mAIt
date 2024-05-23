import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./CafeOrder.css";
import ShoppingBag from "../ShoppingBag";
import ia from './img/ia.png';

const menu = [
    { id: 1, name: '아메리카노(ICE)', price: '3000', image: ia },
    { id: 2, name: '아메리카노(ICE)', price: '3000', image: ia },
    { id: 3, name: '아메리카노(ICE)', price: '3000', image: ia },
    { id: 4, name: '아메리카노(ICE)', price: '3000', image: ia },
    { id: 5, name: '아메리카노(ICE)', price: '3000', image: ia },
    { id: 6, name: '아메리카노(ICE)', price: '3000', image: ia }
];

export function CafeOrder() {

    const navigate = useNavigate();

    const [menuCounts, setMenuCounts] = useState(menu.map(menuItem => ({ ...menuItem, count: 0 })));

    const handleMenuClick = (id) => {
        setMenuCounts(prevCounts => prevCounts.map(menuItem => {
            if (menuItem.id === id) {
                return { ...menuItem, count: menuItem.count + 1 };
            }
            return menuItem;
        }));
    };

    const handleCountChange = (id, delta) => {
        setMenuCounts(prevCounts => prevCounts.map(menuItem => {
            if (menuItem.id === id) {
                const newCount = menuItem.count + delta;
                return { ...menuItem, count: Math.max(newCount, 0) }; // 음수가 되지 않도록 합니다.
            }
            return menuItem;
        }));
    };

    const totalprice = menuCounts.reduce((acc, menuItem) => {
        const menuInfo = menu.find(item => item.id === menuItem.id);
        return acc + (parseInt(menuInfo.price) * menuItem.count); // 가격을 숫자로 변환합니다.
    }, 0);

    const menuItems = menu.map((item) => (
        <li key={item.id} onClick={() => handleMenuClick(item.id)}>
            <img src={item.image} alt={item.name} style={{width: '150px', height: '150px'}} /> {/* 이미지 표시 */}
            <div>{item.name}</div>
            <div>가격: {item.price}</div>
        </li>
    ));

    return (
        <div className="background">
            <header className="kheader">
            </header>
            <ul className="menu-list">
                {menuItems}
            </ul>
            <ShoppingBag items={menuCounts.filter(menuItem => menuItem.count > 0)} onCountChange={handleCountChange} totalprice={totalprice} />
        </div>
    );
}

export default CafeOrder;