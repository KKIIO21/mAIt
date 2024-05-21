import React from 'react';
import './FirstTime.css';
import { Link } from 'react-router-dom';

export default function FirstTime() {
    return (
        <div>
            <div className='firstmain'>
                키오스크가 처음이신가요?
            </div>
            <div className='firstscript'>
                키오스크는 무인으로 주문이 가능한 기계입니다! <br/>
                이 페이지에서는 키오스크의 보편적인 사용법에 대해 배울 수 있어요.<br/>
                화면을 터치해보세요! 다음 설명으로 넘어갈 수 있습니다~.~
            </div>
        </div>
      
    );
  }