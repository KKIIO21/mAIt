import React from "react";
import "./Cart.css";

function Cart({ items, onCountChange, totalprice }) {
    return (
        <div className="cart">
            <h2>장바구니</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <span>{item.name}</span>
                        <button onClick={() => onCountChange(item.id, -1)}>-</button>
                        <span>{item.count}</span>
                        <button onClick={() => onCountChange(item.id, 1)}>+</button>
                        <span>{item.price * item.count}원</span>
                    </li>
                ))}
            </ul>
            <div className="total-price">총 가격: {totalprice}원</div>
        </div>
    );
}

export default Cart;
