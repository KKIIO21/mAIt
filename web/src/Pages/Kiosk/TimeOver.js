import React from "react";
import "./TimeOver.css";

function TimeOver({ onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p>시간이 초과되었습니다! 다시 시도해 보세요</p>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    );
}

export default TimeOver;
