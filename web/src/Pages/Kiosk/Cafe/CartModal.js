import React from "react";
import "./CartModal.css";

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
                <h2 className="drink-name">{item.name}</h2>
                <div className="drink-price">{item.price}원</div>
                <div className="size-option">
                    <label>
                        <input type="checkbox" />
                        무료 사이즈 업 (+0원)
                    </label>
                </div>
                <div className="c-modal-actions">
                    <button onClick={() => onAddToCart(item)}>주문 담기</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
