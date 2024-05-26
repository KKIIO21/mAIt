import React from 'react';
import './ResultModal.css';

function ResultModal({ correct, onClose, navigate }) {
    const handleClose = () => {
        onClose();
        if (correct) {
            navigate('/Pages/Kiosk');
        }
    };

    return (
        <div className="result-modal-backdrop">
            <div className="result-modal">
                <p>{correct ? "맞았습니다! 다른 상황도 연습해 보세요" : "틀렸습니다! 다시 시도해보세요"}</p>
                <button onClick={handleClose}>확인</button>
            </div>
        </div>
    );
}

export default ResultModal;
