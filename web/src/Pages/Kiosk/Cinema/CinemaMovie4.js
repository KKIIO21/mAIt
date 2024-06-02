import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CinemaMovie4.css";
import bumImage from './img/ja.jpeg';
import ResultModal from '../ResultModal';

function CinemaMovie4() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const movie = {
        title: "자동차왕 엄준식",
        poster: bumImage,
        rating: "15",
        format: "2D 디지털 더빙",
        times: [
            { time: "12:00 - 14:00", seats: "48/120석", theater: "1관" },
            { time: "16:50 - 18:30", seats: "48/120석", theater: "3관" },
            { time: "17:30 - 19:30", seats: "108/120석", theater: "4관" },
            { time: "20:10 - 22:10", seats: "48/120석", theater: "1관" },
        ]
    };

    const handleTimeSelect = () => {
        navigate('./Seat4');
    };

    const handleWrongSelection = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="cinemaMovie4-background">
            <div className="movie-detail-container">
                <img src={movie.poster} alt={`${movie.title} Poster`} className="movie-poster-large" />
                <div className="movie-info">
                    <div className="movie-title">
                        <span className="movie-rating">{movie.rating}</span> {movie.title}
                    </div>
                    <div className="movie-format">{movie.format}</div>
                    <div className="showtimes-container">
                        {movie.times.map((timeSlot, index) => (
                            <button 
                                key={index} 
                                className="showtime-box"
                                onClick={index === 1 ? handleTimeSelect : handleWrongSelection}
                            >
                                <div className="showtime">{timeSlot.time}</div>
                                <div className="seats">{timeSlot.seats}</div>
                                <div className="theater">{timeSlot.theater}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {showModal && (
                <ResultModal 
                    correct={false} 
                    onClose={closeModal} 
                    navigate={navigate}
                />
            )}
        </div>
    );
}

export default CinemaMovie4;
