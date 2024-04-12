import React, { useState } from 'react';
import './ChatBot.css';
import logoImage from './mAIt.png';

const ChatBot = () => {
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
  
    const handleVoiceSelection = (voice) => {
      setSelectedVoice(voice);
    };
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        submitMessage();
    };

    const submitMessage = () => {
        const newMessage = {
            content: message,
            timestamp: new Date().toLocaleTimeString(),
        };
        setChatHistory([...chatHistory, newMessage]);
        setMessage(''); // 입력 필드 초기화
    };
    

    

    return (
        <div class="chat-container">
            <div class="chat">
                <div class="new-chat">
                    <button > + 새로운 채팅</button>
                </div>
                <div class="voice-choice">
                    <div class="voice-explain"><span class="highlight">"목소리"</span>를 선택해보세요</div>
                    <button onClick={() => handleVoiceSelection('grandfather')}>할아버지</button>
                    <button onClick={() => handleVoiceSelection('grandson')}>할머니</button>
                    <button onClick={() => handleVoiceSelection('woman')}>여자</button>
                    <button onClick={() => handleVoiceSelection('man')}>남자</button>
                    <button onClick={() => handleVoiceSelection('wkid')}>여자 아이</button>
                    <button onClick={() => handleVoiceSelection('mkid')}>남자 아이</button>
                </div>
                <div class="ch-divider"></div>
                <div className='ex-explain'>이전 채팅 목록</div>

                <div class="last-chat">
                    <button >이전 목록 1</button>
                    <button >이전 목록 2</button>
                    <button >이전 목록 3</button>
                    <button >이전 목록 4</button>
                    <button >이전 목록 5</button>
                    <button >이전 목록 6</button>
                    

                </div>
           
            </div>
            <div class="chat-space">
                <div className='ex-explain'>메이트에게 뭐든 물어보세요</div>
                
                <div className="chat-list">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`message ${msg.sent ? 'message-sent' : 'message-received'}`}>
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
                </form>
                
            </div>
        </div>
    );
  }
  export default ChatBot;