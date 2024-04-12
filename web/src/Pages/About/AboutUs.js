import React from 'react';
import './AboutUs.css';
import team1 from './나.png';
import team2 from './석준님.png';
import team3 from './종훈님.png';
import team4 from './현수님.png';


export default function AboutUs() {
    return (
      <div className="container">
        <div className="info">
          mAIt가 무엇일까요?
        </div>
        <div className="info-1">
          mAIt, 메이트는 여러분의 AI 친구가 되어준다는 의미를 담고 있습니다.
          사실 캡스톤 디자인 때문에 하는건데 여튼 하는거니까 글킨한데 갑자기 또 무슨 캡스톤 문서를 내라고 하는데 아니 도대체 똑같은 서류를 오ㅜㅐㅗ 학기 마다 여러번 내라고 하는지 진짜 개짜으나ㅣ얼
        </div>

        <div className="teams">
            <img
              src={team1}
              alt="Logo" />
            <img
              src={team2}
              className="logo"
              alt="Logo" />
             <img
              src={team3}
              className="logo"
              alt="Logo" />
             <img
              src={team4}
              className="logo"
              alt="Logo" />
      </div>


      </div>
    );
  }