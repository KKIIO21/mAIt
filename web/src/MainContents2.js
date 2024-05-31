import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';

export default function MainContent() {
  const [news, setNews] = useState([]);
  const [recommended, setRecommended] = useState(null);
  const [clicks, setClicks] = useState({정치: 0, 경제: 0, 사회: 0, 문화: 0});
  const categoryNames = ["정치", "경제", "사회", "문화"];
  const categoryMap = { '정치': 'poli', '경제': 'econo', '사회': 'soci', '문화': 'cul' };

  useEffect(() => {
    const fetchNews = async () => {
      const res = await axios.get('http://localhost:50/get_news');
      if (res.status === 200) {
        setNews(res.data.news);
        setRecommended(res.data.recommended);
      } else {
        console.error('Failed to fetch news:', res.status);
      }
    };

    fetchNews();
    const intervalId = setInterval(fetchNews, 10000);  // 10초마다 뉴스 업데이트
    return () => clearInterval(intervalId);
  }, []);

  const updateClicks = async (category) => {
    const categoryKey = categoryMap[category];
    await axios.post(`http://localhost:50/update_clicks/${categoryKey}`);
  };

  const handleNewsClick = (category, url) => {
    updateClicks(category);
    const newClicks = {...clicks, [category]: clicks[category] + 1};
    setClicks(newClicks);
    window.open(url, '_blank');
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="main_cons">
      <img src={require('./mAIt.png')} className="mlogo" alt="MLogo"/>
      <div className="main-word">
        : 디지털 소외계층을 위한 AI 체험존, <br/>
        <span>mAIt</span>와 함께 성장하세요
      </div>
      <div className="contents">
        <div className="mcon">
          <a href="/Pages/Kiosk" className="mcon1 main-button" rel="noopener noreferrer">
            키오스크<br/>체험하기
          </a>
          <a href="/Pages/Generator" className="mcon1 main-button" rel="noopener noreferrer">
            이미지<br/>변환하기
          </a>
        </div>
        <div className="news">
          <div className="news-title">맞춤형 뉴스🗞️</div>
          <div className="news-description">
            오늘은 어떤 소식이 있을까요?
          </div>
          <div className='news-inner'>
            {news.map((item, index) => (
              <a href={item.link} key={index} className="button" target="_blank" rel="noopener noreferrer" onClick={(e) => {
                e.preventDefault();  // <a> 태그의 기본 동작을 방지
                e.stopPropagation();  // 이벤트 전파를 방지
                handleNewsClick(categoryNames[index % 4], item.link);
              }}>
                {categoryNames[index % 4]}: {truncateText(item.title, 32)}
              </a>
            ))}
          </div>

          <div className='Main-divider'></div>

          <div className='recommended-news'>
            {recommended && (
              <div>
                <div className='recommended-news-inner'>추천 뉴스</div>
                <a href={recommended.link} className="button" target="_blank" rel="noopener noreferrer">
                  {truncateText(recommended.title, 32)}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}