import React from "react";
import "./B_Modal.css";

function Modal({ message, onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p>{message}</p>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    );
}

export default Modal;