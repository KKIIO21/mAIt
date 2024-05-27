//shoppingbag 
import React from "react";
import "./ShoppingBag.css";

function ShoppingBag({ items, onCountChange, totalprice }) {
    return (
        <div className="B_shopping-bag">
            장바구니
            <div className="sdivider" />

            <div className="B_shopping-bag-inner">
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <button onClick={() => onCountChange(item.id, -1)}>-</button>
                            <span> {item.count} </span>
                            <button onClick={() => onCountChange(item.id, 1)}>+</button>
                            <span>{item.price * item.count}원</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="B_total-price">총 가격 : <span>{totalprice}</span>원</div>
        </div>
    );
}

export default ShoppingBag;