import React from 'react';
import './Output.css';
import Gimage from './Gimage.jpeg';




export default function Output() {
    return (
      <div class='outmain'>
        <div class='output'>
          <div> ~ 짜잔 이미지가 생성되었어요 ! ~ </div>
          <div class='outimage'>
            <img src={Gimage} alt="Logo" />
          </div>

        </div>

        <div class='outright'>
          <div class='outbutton'>
            <button>📥  다운로드 하기 </button>
          </div>


        </div>
      </div>

    );
  }