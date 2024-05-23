import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ChatBot.css';

let audio = null; // 전역 변수로 Audio 객체 선언

const ChatBot = () => {
    const [chatId, setChatId] = useState(''); // 대화 id를 저장할 상태입니다.
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const chatListRef = useRef(null); // chat-list에 대한 ref 생성

    // 컴포넌트 마운트 시 한 번만 실행되어 대화 id를 생성합니다.
    useEffect(() => {
        const id = uuidv4(); // uuid 라이브러리를 사용해 고유한 id를 생성합니다.
        setChatId(id); // 생성된 id를 상태에 저장합니다.
    }, []);

    // chatHistory가 변경될 때마다 스크롤을 맨 아래로 내리는 useEffect 훅
    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleVoiceSelection = (voice) => {
        setSelectedVoice(voice);
    };

    const sendMessage = (text = message) => {
        const userMessage = {
            content: text,
            timestamp: new Date().toLocaleTimeString(),
            sender: 'user',
        };
        setChatHistory(chatHistory => [...chatHistory, userMessage]);

        // 메시지와 함께 대화 id를 서버에 보내기
        fetch('http://localhost:50/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text, chatId: chatId }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Success:', data);
            const serverResponse = {
                content: data.r_text,
                timestamp: new Date().toLocaleTimeString(),
                sender: 'server',
            };
            setChatHistory(chatHistory => [...chatHistory, serverResponse]);
            
            const audioPath = `http://localhost:50/message/${chatId}_${data.timestamp}`;
            playAudio(audioPath);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setMessage('');
    };

    // voice2text
    const recordAudio = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'ko-KR';
        recognition.start();
        
        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            sendMessage(speechToText);
        };
    };

    // 오디오 파일 재생 함수
    const playAudio = (path) => {
        if (audio) {
            audio.pause(); // 이전에 재생중이던 오디오 중단
        }
        audio = new Audio(path);
        audio.play().catch(error => console.error('Audio play error:', error));
    };

    // 오디오 중단 함수
    const stopAudio = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // 오디오 재생 위치를 처음으로 돌림
        }
    };

    return (
        <div className="chat-container">
            <div className="chat">
                <div className="voice-choice">
                    <div className="voice-explain"><span className="highlight">"목소리"</span>를 선택해보세요</div>
                    <button onClick={() => handleVoiceSelection('grandfather')}>할아버지</button>
                </div>
            </div>
            <div className="chat-space">
                <div className='ex-explain'>메이트에게 뭐든 물어보세요</div>
                
                <div className="chat-list" ref={chatListRef}>
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === 'user' ? 'message-sent' : 'message-received'}`}>
                            <div>{msg.content}</div>
                        </div>
                    ))}
                </div>
                <form className="chat-inputing" onSubmit={(e) => {e.preventDefault(); sendMessage(); }}>
                    <input
                        type="text"
                        className="chat-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" disabled={!message}>전송</button>
                    <button type="button" onClick={recordAudio}>마이크</button>
                    <button type="button" onClick={stopAudio}>오디오 중지</button> {/* 오디오 중지 버튼 추가 */}
                </form>
            </div>
        </div>
    );
}

export default ChatBot;
