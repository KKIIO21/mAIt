import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CinemaMain.css";
import moviePoster from './img/movie.jpeg';

function CinemaMain() {
    const navigate = useNavigate();
    const [orderOption, setOrderOption] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState({
        date: '',
        time: ''
    });

    useEffect(() => {
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

        const formattedDate = now.toLocaleDateString('ko-KR', dateOptions);
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

        setCurrentDateTime({
            date: formattedDate,
            time: formattedTime
        });
    }, []);

    // 티켓 구매 버튼 클릭 이벤트
    const handlePurchaseClick = () => {
        navigate('/Pages/Kiosk/Cinema/Order');
    };

    // 티켓 출력 버튼 클릭 이벤트
    const handlePrintClick = () => {
        navigate('/Pages/Kiosk/Cinema/Search');
    };

    return (
        <div className="cinemaMain-background">
            <div className="cinemaMain-header">
                <div className="cinemaMain-logo">
                    <div className="cinemaMain-logo_text">mAIt Cinema</div>
                    <div className="cinemaMain-datetime">
                        <div className="date">{currentDateTime.date} {currentDateTime.time}</div>
                    </div>
                </div>
            </div>
            <img src={moviePoster} alt="Movie Poster" className="cinemaMain-poster" />
            <div className="cinemaMain-content">
                <p className="cinemaMain-instruction">원하시는 서비스를 선택해주세요.</p>
                <div className='cinemaMain-options'>
                    <button className="cinemaMain-option_button" onClick={handlePurchaseClick}>
                        티켓 구매하기
                    </button>
                    <button className="cinemaMain-option_button" onClick={handlePrintClick}>
                        예매 티켓출력
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CinemaMain;
