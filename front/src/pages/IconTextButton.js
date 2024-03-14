import React from 'react';

const IconTextButton = ({ icon, text, bgColor, onClick }) => (
  <button style={{ backgroundColor: bgColor }} className="iconText" onClick={onClick}>
    <div className="icon">{icon}</div>
    <div className="text">{text}</div>
  </button>
);

export default IconTextButton;
