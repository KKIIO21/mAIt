import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ChatBot.css';

const ChatBot = () => {
    const [chatId, setChatId] = useState(''); // 대화 id를 저장할 상태입니다.
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');

    // 컴포넌트 마운트 시 한 번만 실행되어 대화 id를 생성합니다.
    useEffect(() => {
        const id = uuidv4(); // uuid 라이브러리를 사용해 고유한 id를 생성합니다.
        setChatId(id); // 생성된 id를 상태에 저장합니다.
    }, []);

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
        const audio = new Audio(path);
        audio.play().catch(error => console.error('Audio play error:', error));
    };

    
    return (
        <div className="chat-container">
            <div className="chat">
                <div className="new-chat">
                    <button> + 새로운 채팅</button>
                </div>
                <div className="voice-choice">
                    <div className="voice-explain"><span className="highlight">"목소리"</span>를 선택해보세요</div>
                    <button onClick={() => handleVoiceSelection('grandfather')}>할아버지</button>
                </div>
                <div className="ch-divider"></div>
                <div className='ex-explain'>이전 채팅 목록</div>

                <div className="last-chat">
                    <button>이전 목록 1</button>
                </div>
           
            </div>
            <div className="chat-space">
                <div className='ex-explain'>메이트에게 뭐든 물어보세요</div>
                
                <div className="chat-list">
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
                </form>
            </div>
        </div>
    );
}
export default ChatBot;
