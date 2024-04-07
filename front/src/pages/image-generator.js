import React, { useState } from 'react';
import './image-generator.css';
import { Link } from 'react-router-dom';

export default function ImageGenerator() {
  const [image, setImage] = useState(null);
  const [concept, setConcept] = useState([]);


  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };


  const handleConceptChange = (event) => {
    const { value } = event.target;
    if (event.target.checked) {
      setConcept([...concept, value]);
    } else {
      setConcept(concept.filter((item) => item !== value));
    }
  };

  const convertImage = () => {
    console.log("이미지 변환 함수 호출");
    console.log("선택된 이미지:", image);
    console.log("선택된 컨셉:", concept);
  };

  return (
    <div className="containers">
      <div className="image-1">이미지 변환하기 : 사진을 다양한 그림으로 바꿔봐요!</div>
      <div className="image">Step1. 사진 선택하기</div>
      <div className="image-2">그림으로 바꾸고 싶은 사진을 컴퓨터에서 골라주세요.</div>
      <div className="dividing" />
      <input type="file" className='concept-1' onChange={handleImageChange} />

      <div className="image">Step2. 컨셉 정하기</div>
      <div className="image-2">원하는 컨셉을 선택해주세요.</div>
      <div className="dividing" />
      <div className='concept-2'>
        <label className="radio-label">
          <input type="radio" name="concept" value="디즈니" onChange={handleConceptChange} /> 
          <span className="radio-custom"></span>
          <span className="radio-text">디즈니</span>
        </label>
        <label className="radio-label">
          <input type="radio" name="concept" value="젊은시절" onChange={handleConceptChange} /> 
          <span className="radio-custom"></span>
          <span className="radio-text">젊은시절</span>
        </label>
        <label className="radio-label">
          <input type="radio" name="concept" value="손그림" onChange={handleConceptChange} /> 
          <span className="radio-custom"></span>
          <span className="radio-text">손그림</span>
        </label>
      </div>

      <div className="image-3">다 선택하셨나요? 이제 한 번 바꿔봐요! 아래의 버튼을 클릭해주세요.</div>
      <div className="last">
        <Link to="/pages/image-complicate" className="go">
          <div className="button">
            바꾸기!
          </div>
        </Link>
      </div>
    </div>
  );
}
