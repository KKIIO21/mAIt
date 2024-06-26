import React from "react";
import "./B_CartModal.css";

const CartModal = ({ item, onClose, onAddToCart, message }) => {
    if (message) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>{message}</h2>
                    <button onClick={onClose}>확인</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <img src={item.image} alt={item.name} className="modal-image" />
                <h2 className="item-name">{item.name}</h2>
                <div className="item-price">{item.price}원</div>
                <div className="size-option">
                    <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                        콜라 추가 (+1000원)
                    </label>
                    <br/>
                    <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                        감자튀김 추가 (+1500원)
                    </label>
                </div>
                <div className="modal-actions">
                    <button onClick={() => onAddToCart(item)}>주문 담기</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;