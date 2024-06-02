import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CinemaOrder.css";
import bumImage from './img/bum.jpeg'; // 이미지 경로를 정확하게 설정하세요.
import sangImage from './img/sang.jpeg';
import jeoImage from './img/jeo.jpeg';
import jaImage from './img/ja.jpeg';
import shipImage from './img/ship.jpeg';
import myeongImage from './img/myeong.jpeg';

function CinemaOrder() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([
        { id: 1, title: "범죄시티", poster: bumImage },
        { id: 2, title: "생갈치1호의 행방불명", poster: sangImage },
        { id: 3, title: "저속스캔들", poster: jeoImage },
        { id: 4, title: "자동차왕 엄준식", poster: jaImage },
        { id: 5, title: "너의 십이지장을 먹고싶어", poster: shipImage },
        { id: 6, title: "명함정 고난", poster: myeongImage }
    ]);

    const handleMovieSelect = (id) => {
        navigate(`./Movie${id}`);
    };

    return (
        <div className="cinemaOrder-background">
            <div className="cinemaOrder-header">
                <div className="cinemaOrder-logo">
                    <div className="cinemaOrder-logo_text">mAIt Cinema</div>
                </div>
            </div>
            <div className="movies-container">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card" onClick={() => handleMovieSelect(movie.id)}>
                        <img src={movie.poster} alt={`${movie.title} Poster`} className="movie-poster" />
                        <button className="book-button">예매</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CinemaOrder;
