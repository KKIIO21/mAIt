import React from 'react';
import './KioskModal.css';

function KioskModal({ situation, difficulty, onConfirm }) {
    const messages = {
        cafe: {
            easy: [
                "아이스 아메리카노 한잔을 포장해보세요!"
            ],
            hard: [
                "아이스 아메리카노 한잔을 포장해보세요!"
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
