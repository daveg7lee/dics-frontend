import React from 'react';

const Button = ({ text, onClick, width }) => {
  return (
    <button
      onClick={onClick}
      style={{ width }}
      className="allCenter blueButton"
    >
      {text}
    </button>
  );
};

export default Button;
