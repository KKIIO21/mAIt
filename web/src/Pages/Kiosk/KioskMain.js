import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KioskModal from './KioskModal';
import "./KioskMain.css";

function KioskMain() {
    const [situation, setSituation] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const startSimulation = () => {
        if (situation && difficulty) {
            setShowModal(true);
        }
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        if (situation === 'cafe') {
            navigate('./cafe');
        }
        else if (situation === 'fastfood') {
            navigate('./burger');
        }
        else if (situation === 'cinema') {
            navigate('./cinema');
        }
    };

    return (
        <div className="kiosk-main">
            <div className="hd">키오스크 연습하기 : AI 음성인식 키오스크로 실전감각을 길러보아요!</div>
            <div className="options">
                <p>Step1. 원하는 상황을 설정해주세요</p>
                <button onClick={() => setSituation('cafe')} className={situation === 'cafe' ? 'selected' : ''}>카페</button>
                <button onClick={() => setSituation('cinema')} className={situation === 'cinema' ? 'selected' : ''}>영화관</button>
                <button onClick={() => setSituation('fastfood')} className={situation === 'fastfood' ? 'selected' : ''}>패스트푸드</button>
            </div>
            <div className="options2">
                <p>Step2. 난이도를 설정해주세요</p>
                <button onClick={() => setDifficulty('easy')} className={difficulty === 'easy' ? 'selected' : ''}>쉬움</button>
                <button onClick={() => setDifficulty('hard')} className={difficulty === 'hard' ? 'selected' : ''}>어려움</button>
            </div>
            <button className="start-button" onClick={startSimulation} disabled={!situation || !difficulty}>시작하기</button>
            {showModal && <KioskModal situation={situation} difficulty={difficulty} onConfirm={handleModalConfirm} />}
        </div>
    );
}

export default KioskMain;