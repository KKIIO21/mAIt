import React from 'react';
import './ChatBot.css';
import logoImage from './images/mAIt.png';

function ChatBot() {
  return (
    <div className="app-container">
        <main className="container">
        <div className="content-wrapper">
            <img src={logoImage} alt="" className="image-wrapper" />
            <h1 className="title">메이트에게 뭐든 물어보세요</h1>
            <section className="question-section">
            <div className="question-row">
                <div className="question-column">
                <div className="question-content">
                    <h2 className="question-title">어떤게 궁금하세요?</h2>
                    <div className="question-button">이미지 다르게 만들기</div>
                    <div className="suggestion-button">키오스크 연습하기</div>
                </div>
                </div>
                <div className="question-column">
                <div className="question-content">
                    <h2 className="question-title">이런 질문은 어떠세요?</h2>
                    <div className="question-button">오늘 날씨는 어때?</div>
                    <div className="suggestion-button-alt">오늘 옷차림 추천해줘</div>

                </div>
                </div>
            </div>
            </section>
        </div>
        </main>
    </div>
    );
    }

export default ChatBot;
