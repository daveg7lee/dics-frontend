import React from "react";

const CustomButton = ({ text, onClick, width }) => {
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

export default CustomButton;
