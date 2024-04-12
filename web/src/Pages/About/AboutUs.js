import React from 'react';
import './AboutUs.css';
import team1 from './나.png';
import team2 from './석준님.png';
import team3 from './종훈님.png';
import team4 from './현수님.png';


export default function AboutUs() {
    return (
      <div className="container">
        <div className="about">
          mAIt가 무엇일까요?
        </div>
        <div className="about-1">
          메이트는 mate 와 AI의 합성어로,<br/>
          여러분의 AI 친구가 되어준다는 의미를 담고 있습니다.
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