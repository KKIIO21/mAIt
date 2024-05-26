import React from 'react';
import './KioskModal.css';

function KioskModal({ situation, difficulty, onConfirm }) {
    const messages = {
        cafe: {
            easy: [
                "아이스 아메리카노 한 잔을 포장해보세요!",
                "수박 주스 한 잔을 매장에서 먹고 가세요!",
                "에스프레소 한 잔을 매장에서 먹고 가세요!"
            ],
            hard: [
                "따뜻한 카페라떼 두 잔과 콜드브루 한잔을 포장해보세요!",
                "골드망고 스무디 한 잔과 따뜻한 아메리카노 두 잔을 포장해보세요!",
            ]
        },
        burger: {
            easy: [
                
            ],
            hard: [

            ]
        },
    };

    const situationMessages = messages[situation]?.[difficulty] || [];
    const randomMessage = situationMessages[Math.floor(Math.random() * situationMessages.length)] || "아메리카노 한잔을 포장해보세요!";

    return (
        <div className="kmodal-backdrop">
            <div className="kmodal">
                <p>{randomMessage}</p>
                <button onClick={onConfirm}>확인</button>
            </div>
        </div>
    );
}

export default KioskModal;
