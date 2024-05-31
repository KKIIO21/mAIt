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
        cinema: {
            easy: [
                "12시에 시작하는 범죄시티 티켓 1장을 구매해보세요! 좌석은 상관 없습니다.",
                "13시 10분에 시작하는 생갈치1호의 행방불명 티켓 2장을 구매해보세요! 좌석은 상관 없습니다.",
                "15시 20분에 시작하는 저속스캔들 티켓 1장을 구매해보세요! 좌석은 상관 없습니다.",
            ],
            hard: [
                "16시 50분에 시작하는 자동차왕 엄준식 티켓 2장을 구매해보세요! 조건: 경로 2인, 좌석은 H4, H5입니다.",
                "18시 30분에 시작하는 너의 십이지장을 먹고싶어 티켓 3장을 구매해보세요! 조건: 성인 2인, 청소년 1인, 좌석은 G6, G7, G8입니다.",
                "20시 10분에 시작하는 명함정 고난 티켓을 4장 구매해보세요! 조건: 성인 2인, 청소년 2인, 좌석은 F1, F2, F3, F4입니다.",
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
