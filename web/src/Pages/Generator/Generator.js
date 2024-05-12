import React, { useState, useEffect } from 'react';
import './Generator.css';
import { useNavigate } from 'react-router-dom'

export default function Generator() {
  const [image, setImage] = useState(null);
  const [concept, setConcept] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [dots, setDots] = useState('.');

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

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('prompt', concept.toString());
  
    try {
      const response = await fetch('http://localhost:50/ImageConversion', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      navigate('/Pages/Generator/Output', { state: { imageUrl: result.image_url } });
      console.log(result)
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        switch (prevDots) {
          case '.':
            return '..';
          case '..':
            return '...';
          default:
            return '.';
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="containers">
      {isLoading && (
        <div className="loading-modal">
          <div className="loading-text">이미지를 변환중이에요! 잠시만 기다려주세요{dots}</div>
        </div>
      )}
      <div className="image-1">이미지 변환하기 :2 사진을 다양한 그림으로 바꿔봐요!</div>
      <div className="image">Step1. 사진 선택하기</div>
      <div className="image-2">그림으로 바꾸고 싶은 사진을 컴퓨터에서 골라주세요.</div>
      <div className="dividing" />
      <input type="file" className='concept-1' onChange={handleImageChange} />

      <div className="image">Step2. 컨셉 정하기</div>
      <div className="image-2">원하는 컨셉을 선택해주세요.</div>
      <div className="dividing" />
      <div className='concept-2'>
        <label className="radio-label">
          <input type="radio" name="concept" value="젊은시절" onChange={handleConceptChange} /> 
          <span className="radio-custom"></span>
          <span className="radio-text">젊은시절</span>
        </label>
        <label className="radio-label">
          <input type="radio" name="concept" value="디즈니" onChange={handleConceptChange} /> 
          <span className="radio-custom"></span>
          <span className="radio-text">디즈니</span>
        </label>
        <label className="radio-label">
          <input type="radio" name="concept" value="픽사" onChange={handleConceptChange} /> 
          <span className="radio-custom"></span>
          <span className="radio-text">픽사</span>
        </label>
        <label className="radio-label">
          <input type="radio" name="concept" value="사이보그" onChange={handleConceptChange} /> 
          <span className="radio-custom"></span>
          <span className="radio-text">사이보그</span>
        </label>
      </div>

      <div className="image-3">다 선택하셨나요? 이제 한 번 바꿔봐요! 아래의 버튼을 클릭해주세요.</div>
      <div className="last">
          <div className="button" onClick={handleSubmit}>
            바꾸기!
          </div>
      </div>
    </div>
  );
}