import React from "react";

const buttonStyle = {
  backgroundColor: "#fff",
  border: "2px solid #ccc",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  margin: "0 5px",
  cursor: "pointer",
};

const PaginationButtons = ({ onPrevClick, onNextClick }) => {
  return (
    <div>
      <button onClick={onPrevClick} style={buttonStyle}>
        &lt;
      </button>
      <button onClick={onNextClick} style={buttonStyle}>
        &gt;
      </button>
    </div>
  );
};

export default PaginationButtons;
