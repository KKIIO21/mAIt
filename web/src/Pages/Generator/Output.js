import React from 'react';
import './Output.css';
import Gimage from './Gimage.jpeg';
import { useLocation } from 'react-router-dom';

export default function Output() {

  const location = useLocation();
  const { imageUrl } = location.state || { imageUrl: '' };

  const downloadImage = async () => {
    try {
      const imageSrc = imageUrl || Gimage;
      const image = await fetch(imageSrc);
      const imageBlob = await image.blob();
      const imageURL = URL.createObjectURL(imageBlob);

      const element = document.createElement('a');
      element.href = imageURL;
      element.download = 'resultImage.jpg';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      URL.revokeObjectURL(imageURL);
    } catch (error) {
      console.error(error);
    }
  };

    return (
      <div className='outmain'>
        <div className='output'>
          <div> ~ 짜잔 이미지가 생성되었어요 ! ~ </div>
          <div className='outimage'>
            {imageUrl ? <img src={imageUrl} alt="Converted" /> 
                      : <img src={Gimage} alt="Default"/>}
          </div>
        </div>
        <div className='outright'>
          <div className='outbutton'>
            <button onClick={downloadImage}>📥  다운로드 하기 </button>
          </div>
        </div>
      </div>
    );
  }