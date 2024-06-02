import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CinemaSearch.css';
import ResultModal from '../ResultModal';

const correctNumbers = [
    '232421',
    '150919',
    '035369',
    '233430',
    '190472',
    '021003'
];

function CinemaSearch() {
    const navigate = useNavigate();
    const [reservationNumber, setReservationNumber] = useState('');
    const [showResultModal, setShowResultModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleNumberClick = (number) => {
        if (reservationNumber.length < 6) {
            setReservationNumber(reservationNumber + number);
        }
    };

    const handleDelete = () => {
        setReservationNumber(reservationNumber.slice(0, -1));
    };

    const handleReset = () => {
        setReservationNumber('');
    };

    const handleSubmit = () => {
        if (correctNumbers.includes(reservationNumber)) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setShowResultModal(true);
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
        if (isCorrect) {
            navigate('/Pages/Kiosk');
        }
    };

    return (
        <div className="cinemaSearch-background">
            <div className="Search-header">예매 번호를 입력해주세요.</div>
            <div className="Search-input-container">
                {Array.from({ length: 6 }).map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        value={reservationNumber[index] || ''}
                        readOnly
                        maxLength="1"
                    />
                ))}
            </div>
            <div className="Search-keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '초기화', 0, '⌫'].map((key) => (
                    <button
                        key={key}
                        onClick={() => {
                            if (key === '⌫') handleDelete();
                            else if (key === '초기화') handleReset();
                            else handleNumberClick(key.toString());
                        }}
                    >
                        {key}
                    </button>
                ))}
            </div>
            <div className="Search-actions">
                <button className="Search-action-button" onClick={handleSubmit}>확인</button>
                <button className="Search-action-button" onClick={() => navigate('/Pages/Kiosk/')}>취소</button>
            </div>
            {showResultModal && (
                <ResultModal
                    correct={isCorrect}
                    onClose={handleCloseResultModal}
                    navigate={navigate}
                />
            )}
        </div>
    );
}

export default CinemaSearch;
