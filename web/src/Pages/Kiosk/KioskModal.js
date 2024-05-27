import React from 'react';
import './KioskModal.css';

function KioskModal({ situation, difficulty, onConfirm }) {
    const messages = {
        cafe: {
            easy: [
                "아이스 아메리카노 1잔을 포장해 보세요!",
                "수박 주스 1잔을 매장에서 먹고 가세요!",
                "에스프레소 1잔을 매장에서 먹고 가세요!"
            ],
            hard: [
                "따뜻한 카페라떼 2잔과 콜드브루 1을 포장해 보세요!",
                "망고 스무디 1잔과 따뜻한 아메리카노 2잔을 포장해 보세요!",
                "아이스 카페라떼 1잔과 라임 모히또 1잔을 매장에서 먹고 가세요!",
            ]
        },
        burger: {
            easy: [
                "새우 버거 단품 1개를 포장해 보세요!",
                "불고기 버거 세트 1개를 매장에서 먹고 가세요!",
                "삼겹 버거 단품 1개를 포장해 보세요!",
            ],
            hard: [
                "소고기 버거 1개, 치즈스틱 2개, 콜라 1개를 포장해 보세요!",
                "완전 치킨 버거 세트 1개, 감자튀김 2개, 콜라 1개를 포장해 보세요!",
                "양파 버거 세트 1 개, 콜라 1개, 환타 1개를 매장에서 먹고 가세요!",
            ]
        },
    };

    const situationMessages = messages[situation]?.[difficulty] || [];
    const randomMessage = situationMessages[Math.floor(Math.random() * situationMessages.length)] || "아메리카노 한잔을 포장해보세요!";

    const handleConfirm = () => {
        onConfirm(randomMessage);
    };

    return (
        <div className="kmodal-backdrop">
            <div className="kmodal">
                <p>{randomMessage}</p>
                <button onClick={handleConfirm}>확인</button>
            </div>
        </div>
    );
}

export default KioskModal;
