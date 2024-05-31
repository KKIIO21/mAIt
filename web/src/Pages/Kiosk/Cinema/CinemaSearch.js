import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CinemaSearch.css";
import moviePoster from './img/movie.jpeg';

function CinemaSearch() {
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

    const handleOrderClick = (option) => {
        setOrderOption(option);
        navigate('./Order', { state: { option } });
    };

    const handleReturn = () => {
        navigate("/Pages/Kiosk/");
    };

    return (
        <div className="cinema-background">
            <div className="cinema-header">
                <div className="cinema-logo">
                    <div className="cinema-logo_text">mAIt Cinema</div>
                    <div className="cinema-datetime">
                        <div className="date">{currentDateTime.date} {currentDateTime.time}</div>
                    </div>
                </div>
            </div>
            <img src={moviePoster} alt="Movie Poster" className="cinema-poster" />
            <div className="content">
                <p className="instruction">원하시는 서비스를 선택해주세요.</p>
                <div className='cinema-options'>
                    <button className="cinema-option_button" onClick={() => handleOrderClick('purchase')}>
                        티켓 구매하기
                    </button>
                    <button className="cinema-option_button" onClick={() => handleOrderClick('print')}>
                        예매 티켓출력
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CinemaSearch;
